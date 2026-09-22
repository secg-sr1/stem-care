import { quarantine, localSessions } from './quarantine.mjs';
import { stateless } from './storage-mode.mjs';
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { supabase } from '../supabase/client.mjs';
import { HttpError, simulation } from './security.mjs';

const COOKIE = 'stemcare_session';
export const TTL = 24 * 60 * 60 * 1000;
export const simulatedSessions = new Map();
function secret() {
  if (simulation()) return 'local-only-simulation-cookie-secret';
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) throw new HttpError(503, 'Session service unavailable.');
  return process.env.SESSION_SECRET;
}
export function signSession(id, expires) {
  const payload = Buffer.from(JSON.stringify({ id, expires })).toString('base64url');
  return `${payload}.${createHmac('sha256', secret()).update(payload).digest('base64url')}`;
}
export function decodeSession(token, now = Date.now()) {
  if (!token) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expected = createHmac('sha256', secret()).update(payload).digest('base64url');
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof parsed.id === 'string' && parsed.expires > now && parsed.expires <= now + TTL ? parsed : null;
  } catch { return null; }
}
function cookie(res, token, age) {
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${age}${!simulation() && (process.env.NODE_ENV === 'production' || process.env.VERCEL) ? '; Secure' : ''}`);
}
export async function getSession(req, res, create = false, language = 'es') {
  const sessions = quarantine() ? localSessions : simulatedSessions;
  const raw = String(req.headers.cookie || '').split('; ').find(c => c.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  const claim = decodeSession(raw);
  if (stateless()) {
    if (claim) return claim;
    if (!create) throw new HttpError(401, 'Session expired. Start a new conversation.');
    const session = { id: randomUUID(), expires: Date.now() + TTL };
    cookie(res, signSession(session.id, session.expires), TTL / 1000);
    return session;
  }
  if (claim) {
    let session;
    if (simulation() || quarantine()) session = sessions.get(claim.id);
    else {
      const result = await supabase.from('agent_sessions').select('id, created_at').eq('id', claim.id).single();
      session = result.data;
    }
    if (session && new Date(session.created_at).getTime() + TTL > Date.now()) return { ...session, expires: claim.expires };
  }
  if (!create) throw new HttpError(401, 'Session expired. Start a new conversation.');
  const id = randomUUID(); const now = Date.now();
  const session = { id, created_at: new Date(now).toISOString() };
  if (simulation() || quarantine()) {
    for (const [k, v] of sessions) if (new Date(v.created_at).getTime() + TTL <= now) sessions.delete(k);
    if (sessions.size >= 100) throw new HttpError(503, 'Local session capacity reached.');
    sessions.set(id, { ...session, messages: [], pending: [] });
  } else {
    const { error } = await supabase.from('agent_sessions').insert({ ...session, language });
    if (error) throw new HttpError(503, 'Session service unavailable.');
  }
  cookie(res, signSession(id, now + TTL), TTL / 1000);
  return { ...session, expires: now + TTL };
}
export async function deleteSession(req, res) {
  if (stateless()) { cookie(res, '', 0); return; }
  let session;
  try { session = await getSession(req, res); } catch (e) { if (e.status !== 401) throw e; }
  if (session) {
    if (simulation() || quarantine()) (quarantine() ? localSessions : simulatedSessions).delete(session.id);
    else {
      const { error } = await supabase.from('agent_sessions').delete().eq('id', session.id);
      if (error) throw new HttpError(503, 'Could not clear conversation. Please try again.');
    }
  }
  cookie(res, '', 0);
}
