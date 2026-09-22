import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';

process.env.LOCAL_SIMULATION = 'true';
process.env.NODE_ENV = 'test';
delete process.env.VERCEL;
process.env.OPENAI_API_KEY = '';
process.env.SUPABASE_URL = '';
process.env.SUPABASE_SERVICE_ROLE_KEY = '';

test('stream, session ownership, contact confirmation, validation, and deletion', async () => {
  const app = express();
  app.use(express.json({ limit: '32kb' }));
  for (const route of ['session', 'agents/concierge', 'agents/approvals']) {
    const { default: handler } = await import(`../api/${route}.js`);
    app.all(`/api/${route}`, handler);
  }
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}/api/`;
  const headers = { Origin: 'http://127.0.0.1:5173', 'Content-Type': 'application/json' };
  try {
    assert.equal((await fetch(base + 'session')).status, 401);
    const forbidden = await fetch(base + 'agents/concierge', { method: 'POST', headers: { ...headers, Origin: 'https://untrusted.example' }, body: JSON.stringify({ message: 'Hola' }) });
    assert.equal(forbidden.status, 403);
    const invalid = await fetch(base + 'agents/concierge', { method: 'POST', headers, body: JSON.stringify({ message: 'x'.repeat(4001) }) });
    assert.equal(invalid.status, 400);
    const invalidLevel = await fetch(base + 'agents/concierge', { method: 'POST', headers, body: JSON.stringify({ message: 'Hola', level: 'invalid' }) });
    assert.equal(invalidLevel.status, 400);
    for (const level of ['beginner', 'medium', 'academic']) {
      const levelResponse = await fetch(base + 'agents/concierge', { method: 'POST', headers, body: JSON.stringify({ message: 'Conservación', level }) });
      assert.equal(levelResponse.status, 200);
      const text = await levelResponse.text();
      if (level === 'academic') assert.match(text, /diseño del estudio/);
      if (level === 'medium') assert.match(text, /términos técnicos/);
      if (level === 'beginner') assert.doesNotMatch(text, /diseño del estudio|términos técnicos/);
    }
    const response = await fetch(base + 'agents/concierge', { method: 'POST', headers, body: JSON.stringify({ message: 'Contact Ana ana@example.com', language: 'es' }) });
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /text\/plain/);
    assert.ok(Number(response.headers.get('x-session-expires')) > Date.now());
    assert.match(response.headers.get('set-cookie'), /HttpOnly/);
    assert.match(await response.text(), /solicitud de prueba/);
    const cookie = response.headers.get('set-cookie').split(';')[0];
    const owner = { ...headers, Cookie: cookie };
    assert.equal((await fetch(base + 'session', { headers: owner })).status, 200);
    const pending = await (await fetch(base + 'agents/approvals', { headers: owner })).json();
    assert.equal(pending.pending.length, 1);
    const decision = { approvalId: pending.pending[0].id, decision: 'approve', turnstileToken: 'local-simulation' };
    assert.equal((await fetch(base + 'agents/approvals', { method: 'POST', headers, body: JSON.stringify(decision) })).status, 401);
    assert.equal((await fetch(base + 'agents/approvals', { method: 'POST', headers: owner, body: JSON.stringify({ ...decision, turnstileToken: 'bad' }) })).status, 400);
    const confirmed = await (await fetch(base + 'agents/approvals', { method: 'POST', headers: owner, body: JSON.stringify(decision) })).json();
    assert.equal(confirmed.status, 'approved');
    assert.equal(confirmed.simulated, true);
    assert.equal((await fetch(base + 'session', { method: 'DELETE', headers: owner })).status, 200);
    assert.equal((await fetch(base + 'session', { headers: owner })).status, 401);
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});

test('consultation validates service and medical fields without sending in preview', async () => {
  const app = express(); app.use(express.json());
  const { default: handler } = await import('../api/consultation.js');
  app.all('/api/consultation', handler);
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/consultation`;
  const headers = { Origin: 'http://127.0.0.1:5173', 'Content-Type': 'application/json' };
  const base = { nombre: 'Prueba', email: 'preview@example.com', turnstileToken: 'local-simulation' };
  const post = data => fetch(url, { method: 'POST', headers, body: JSON.stringify({ ...base, ...data }) });
  try {
    for (const origen of ['Criopreservación', 'Terapia Celular', 'Pruebas Genéticas']) {
      const response = await post({ origen });
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { ok: true, simulated: true });
    }
    assert.equal((await post({ origen: 'Unknown' })).status, 400);
    assert.equal((await post({ origen: 'Criopreservación', semana_de_embarazo: '43' })).status, 400);
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});
