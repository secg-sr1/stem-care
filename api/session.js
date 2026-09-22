import { endpoint } from '../lib/http/security.mjs';
import { getSession, deleteSession } from '../lib/http/session.mjs';
export default endpoint(['GET', 'DELETE'], async (req, res) => {
  if (req.method === 'DELETE') { await deleteSession(req, res); return res.json({ ok: true }); }
  const session = await getSession(req, res);
  res.json({ expires: session.expires });
}, { bucket: 'session', limit: 60 });
