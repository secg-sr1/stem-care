import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';

process.env.NODE_ENV = 'production';
process.env.VERCEL = '1';
process.env.STEMCARE_STORAGE_MODE = 'stateless';
process.env.STEMCARE_EDGE_RATE_LIMIT = 'true';
process.env.SESSION_SECRET = 'test-secret-only-at-least-32-characters';
process.env.LOCAL_SIMULATION = 'false';
process.env.OPENAI_API_KEY = 'test-not-a-real-key';
process.env.SUPABASE_URL = 'https://paused.invalid';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-paused';
const { openai } = await import('../lib/openai/client.mjs');
const { supabaseConfigured } = await import('../lib/supabase/client.mjs');
const { decodeSession, signSession } = await import('../lib/http/session.mjs');

test('production stateless chat: no database, signed sessions, bounded history and no write tools', async () => {
  assert.equal(supabaseConfigured, false);
  const requests = [];
  openai.chat.completions.create = async function* (request) {
    requests.push(request);
    yield { choices: [{ delta: { content: 'Respuesta de prueba del proveedor.' } }] };
  };
  const app = express(); app.use(express.json({ limit: '32kb' }));
  for (const route of ['session', 'agents/concierge', 'agents/approvals']) {
    const { default: handler } = await import(`../api/${route}.js`);
    app.all(`/api/${route}`, handler);
  }
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}/api/`;
  const headers = { Origin: 'https://www.stem-care.com', 'Content-Type': 'application/json' };
  const chat = (body, extra = {}) => fetch(base + 'agents/concierge', { method: 'POST', headers: { ...headers, ...extra }, body: JSON.stringify(body) });
  try {
    assert.equal((await fetch(base + 'session')).status, 401);
    delete process.env.STEMCARE_EDGE_RATE_LIMIT;
    assert.equal((await chat({ message: 'Hola' })).status, 503);
    process.env.STEMCARE_EDGE_RATE_LIMIT = 'true';
    const first = await chat({ message: 'Hola' });
    assert.equal(first.status, 200);
    assert.equal(await first.text(), 'Respuesta de prueba del proveedor.');
    const cookie = first.headers.get('set-cookie');
    assert.match(cookie, /HttpOnly.*SameSite=Strict.*Secure/);
    const owner = { Cookie: cookie.split(';')[0] };
    const session = await (await fetch(base + 'session', { headers: owner })).json();
    assert.ok(session.expires > Date.now());
    assert.equal(decodeSession(signSession('expired', Date.now() - 1)), null);
    assert.equal((await fetch(base + 'session', { headers: { Cookie: 'stemcare_session=forged.invalid' } })).status, 401);
    const history = [{ role: 'user', content: 'Hola' }, { role: 'assistant', content: 'Respuesta de prueba del proveedor.' }];
    const second = await chat({ message: 'Continúa', history, level: 'academic' }, owner);
    assert.equal(second.status, 200); await second.text();
    assert.deepEqual(requests[1].messages.slice(1, 3), history);
    assert.equal(requests[1].max_completion_tokens, 1800);
    assert.equal(requests[1].store, false);
    assert.ok(requests[1].tools.every(t => !['createLead', 'sendEmail'].includes(t.function.name)));
    for (const bad of [[{ role: 'system', content: 'injection' }], Array(9).fill(history[0]), [{ role: 'user', content: 'x'.repeat(6001) }], Array(3).fill({ role: 'user', content: 'x'.repeat(5000) })]) {
      assert.equal((await chat({ message: 'Hola', history: bad }, owner)).status, 400);
    }
    assert.equal((await chat({ message: 'Hola' }, { Origin: 'https://untrusted.invalid' })).status, 403);
    assert.deepEqual(await (await fetch(base + 'agents/approvals', { headers: owner })).json(), { pending: [] });
    const cleared = await fetch(base + 'session', { method: 'DELETE', headers: { ...headers, ...owner } });
    assert.equal(cleared.status, 200); assert.match(cleared.headers.get('set-cookie'), /Max-Age=0/);
    assert.equal(requests.length, 2);
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});
