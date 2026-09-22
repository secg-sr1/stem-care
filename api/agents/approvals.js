import { quarantine } from '../../lib/http/quarantine.mjs';
import { stateless } from '../../lib/http/storage-mode.mjs';
import { endpoint, readJson, verifyBot, simulation, HttpError } from '../../lib/http/security.mjs';
import { getSession, simulatedSessions } from '../../lib/http/session.mjs';
export default endpoint(['GET', 'POST'], async (req, res) => {
  const session = await getSession(req, res);
  if (quarantine() || stateless()) { if (req.method === 'GET') return res.json({pending: []}); throw new HttpError(503, 'Approvals are unavailable while storage is quarantined.'); }
  if (req.method === 'GET') {
    const pending = simulation() ? simulatedSessions.get(session.id).pending : await (await import('../../lib/agent/approvals.mjs')).listPending(session.id);
    return res.json({ pending: pending.filter(p => p.proposed_action?.tool === 'createLead') });
  }
  const body = await readJson(req);
  if (!Number.isSafeInteger(Number(body.approvalId)) || Number(body.approvalId) < 1 || !['approve', 'reject'].includes(body.decision)) throw new HttpError(400, 'Invalid decision.');
  if (body.decision === 'approve') await verifyBot(body.turnstileToken);
  if (simulation()) {
    const state = simulatedSessions.get(session.id);
    const approval = state.pending.find(p => p.id === Number(body.approvalId));
    if (!approval) throw new HttpError(403, 'Request not available.');
    state.pending = state.pending.filter(p => p !== approval);
    return res.json({ status: body.decision === 'approve' ? 'approved' : 'rejected', simulated: true });
  }
  const { decide } = await import('../../lib/agent/approvals.mjs');
  const result = await decide(body.approvalId, body.decision, 'visitor', session.id);
  if (result.status === 'forbidden') throw new HttpError(403, 'Request not available.');
  res.json({ status: result.status });
}, { bucket: 'approvals', limit: 30 });
