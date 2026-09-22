import './_env.mjs';
import { spawn } from 'node:child_process';
if (process.argv.includes('--quarantine')) process.env.STEMCARE_SUPABASE_QUARANTINE = 'true';
process.env.LOCAL_SIMULATION = (process.argv.includes('--real') || process.argv.includes('--quarantine')) ? 'false' : 'true';
process.env.NODE_ENV = 'development';
const api = spawn(process.execPath, ['scripts/server.mjs'], { stdio: 'inherit', env: process.env });
const web = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '5173', '--strictPort'], { stdio: 'inherit', env: { ...process.env, VITE_SIMULATION: process.env.LOCAL_SIMULATION } });
function stop() { api.kill(); web.kill(); }
process.on('SIGINT', stop); process.on('SIGTERM', stop);
api.on('exit', () => web.kill()); web.on('exit', () => api.kill());
