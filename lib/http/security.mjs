import { quarantine } from './quarantine.mjs';
import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { supabase } from '../supabase/client.mjs';

export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
export const simulation = () => process.env.LOCAL_SIMULATION === 'true' && process.env.NODE_ENV !== 'production' && !process.env.VERCEL;
export function allowedOrigins() {
  return (process.env.APP_ORIGINS || 'https://teravida.vercel.app,https://teravida.org,https://stem-care.com,https://www.stem-care.com').split(',').map(s => s.trim()).concat(process.env.NODE_ENV !== 'production' && !process.env.VERCEL ? ['http://localhost:5173', 'http://127.0.0.1:5173'] : []);
}
export function verifyOrigin(req) {
  if (!allowedOrigins().includes(req.headers.origin)) throw new HttpError(403, 'Request origin not allowed.');
}
export async function readJson(req) {
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) throw new HttpError(415, 'JSON required.');
  let value = req.body;
  if (value === undefined) {
    const chunks = []; let size = 0;
    for await (const chunk of req) {
      size += Buffer.byteLength(chunk);
      if (size > 32768) throw new HttpError(413, 'Request too large.');
      chunks.push(Buffer.from(chunk));
    }
    value = Buffer.concat(chunks).toString('utf8');
  }
  if (Buffer.byteLength(typeof value === 'string' ? value : JSON.stringify(value)) > 32768) throw new HttpError(413, 'Request too large.');
  try { if (typeof value === 'string') value = JSON.parse(value); } catch { throw new HttpError(400, 'Invalid JSON.'); }
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new HttpError(400, 'Object required.');
  return value;
}
export function textField(value, name, max = 200, required = false) {
  if (value == null && !required) return '';
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new HttpError(400, `Invalid ${name}.`);
  return value.trim();
}
export function languageOf(value = 'es') {
  if (!['es', 'en'].includes(value)) throw new HttpError(400, 'Invalid language.');
  return value;
}
export function validateMessages(messages) {
  if (!Array.isArray(messages) || !messages.length || messages.length > 20) throw new HttpError(400, 'Invalid messages.');
  return messages.map(m => {
    if (!m || !['user', 'assistant'].includes(m.role)) throw new HttpError(400, 'Invalid message role.');
    return { role: m.role, content: textField(m.content, 'message', 4000, true) };
  });
}
export function validateContact(body) {
  const data = {};
  for (const key of ['nombre', 'apellidos', 'email', 'telefono', 'telefonos_de_contacto', 'semana_de_embarazo', 'nombre_de_ginecologo', 'hospital_donde_se_atendera', 'mensaje', 'origen']) {
    data[key] = textField(body[key], key, key === 'mensaje' ? 2000 : 200, ['nombre', 'email'].includes(key));
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || /[\r\n]/.test(data.email)) throw new HttpError(400, 'Invalid email.');
  return data;
}
const windows = new Map();
export async function limitRequest(req, bucket, limit = 15) {
  const ip = process.env.VERCEL ? String(req.headers['x-forwarded-for'] || '').split(',')[0] : req.socket?.remoteAddress || 'local';
  const key = `${bucket}:${createHash('sha256').update(ip).digest('hex').slice(0, 24)}`;
  if (simulation() || quarantine()) {
    const now = Date.now();
    for (const [k, v] of windows) if (v.until < now) windows.delete(k);
    const entry = windows.get(key) || { count: 0, until: now + 60000 };
    entry.count++; windows.set(key, entry);
    if (entry.count > limit) throw new HttpError(429, 'Please wait a minute and try again.');
    return;
  }
  if (!supabase) throw new HttpError(503, 'Service temporarily unavailable.');
  let result;
  try { result = await supabase.rpc('rate_limit_hit', { p_bucket: key, p_limit: limit, p_window: 60 }); } catch { throw new HttpError(503, 'Service temporarily unavailable.'); }
  if (result.error) throw new HttpError(503, 'Service temporarily unavailable.');
  if (result.data !== true) throw new HttpError(429, 'Please wait a minute and try again.');
}
export async function verifyBot(token) {
  if (simulation()) { if (token !== 'local-simulation') throw new HttpError(400, 'Verification required.'); return; }
  textField(token, 'verification', 2048, true);
  if (!process.env.TURNSTILE_SECRET_KEY) throw new HttpError(503, 'Verification unavailable.');
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(10000),
    body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }),
  });
  const result = await response.json();
  const hosts = allowedOrigins().map(o => new URL(o).hostname);
  if (!result.success || (!hosts.includes(result.hostname) && process.env.NODE_ENV === 'production')) throw new HttpError(400, 'Verification expired. Please try again.');
}
export function endpoint(methods, run, { bucket = 'api', limit = 15 } = {}) {
  return async (req, res) => {
    const started = Date.now();
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (allowedOrigins().includes(req.headers.origin)) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', [...methods, 'OPTIONS'].join(', '));
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    try {
      if (req.method === 'OPTIONS') { verifyOrigin(req); return res.status(204).end(); }
      if (!methods.includes(req.method)) throw new HttpError(405, 'Method not allowed.');
      if (req.method !== 'GET') verifyOrigin(req);
      await limitRequest(req, bucket, limit);
      return await run(req, res);
    } catch (error) {
      const status = error.status || 503;
      if (status === 429) res.setHeader('Retry-After', '60');
      if (!res.headersSent) res.status(status).json({ ok: false, error: error.status ? error.message : 'Service temporarily unavailable. Please try again.' });
      else res.destroy(); // interrupted streams must not look successfully completed
    } finally {
      console.info(JSON.stringify({ route: bucket, status: res.statusCode, durationMs: Date.now() - started }));
    }
  };
}
