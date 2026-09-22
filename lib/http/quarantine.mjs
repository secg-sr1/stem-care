// Explicit temporary storage for the loopback development server only.
export const quarantine = () => process.env.STEMCARE_SUPABASE_QUARANTINE === 'true' && ['development', 'test'].includes(process.env.NODE_ENV) && !process.env.VERCEL;
export const localSessions = new Map();
export function activeLocalSession(id) {
  const row = localSessions.get(id);
  if (row && Date.now() - new Date(row.created_at).getTime() < 86400000) return row;
  localSessions.delete(id);
  return null;
}
const cleanup = setInterval(() => { for (const id of localSessions.keys()) activeLocalSession(id); }, 60000);
cleanup.unref();
