// Loads local env for scripts. MUST be imported FIRST — before any module that
// reads process.env at import time (e.g. the supabase/openai clients). ES module
// imports evaluate in source order, so importing this first guarantees env is
// populated before the clients initialize.
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local', quiet: true });
dotenv.config({ path: '.env', quiet: true });
// Optional local reference to the existing agent's env file. Never overrides
// the current environment or loads through a browser-facing Vite import.
if (process.env.STEMCARE_AGENT_ENV && !process.env.VERCEL && process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: process.env.STEMCARE_AGENT_ENV, quiet: true });
}
