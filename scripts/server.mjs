import './_env.mjs';
import express from 'express';
import { randomBytes } from 'node:crypto';

// Local sessions can end on server restart. Production requires a stable secret.
if (!process.env.SESSION_SECRET && process.env.NODE_ENV === 'development' && !process.env.VERCEL) {
  process.env.SESSION_SECRET = randomBytes(32).toString('hex');
}

const app = express();
app.use(express.json({ limit: '32kb' }));
for (const route of ['session', 'agents/concierge', 'agents/approvals', 'consultation']) {
  const { default: handler } = await import(`../api/${route}.js`);
  app.all(`/api/${route}`, handler);
}
app.use((error, req, res, next) => {
  res.status(error.status === 413 ? 413 : 400).json({ error: 'Invalid request.' });
});
app.listen(5174, '127.0.0.1', error => {
  if (error) { console.error(`Cannot start StemCare API: ${error.code}`); process.exit(1); }
  console.info(`StemCare API on 5174 (${process.env.LOCAL_SIMULATION === 'true' ? 'simulation' : 'real integrations'})`);
});
