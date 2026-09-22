import { quarantine } from '../http/quarantine.mjs';
import { stateless } from '../http/storage-mode.mjs';
// Server-only Supabase client for the agent runtime + knowledge layer.
//
// Uses the service_role key, which BYPASSES Row Level Security. This must
// NEVER be imported into frontend (src/) code or exposed via a VITE_* env var.
// It is only for Vercel serverless functions (api/) and local scripts.
//
// Production defaults to Supabase-backed sessions and request limits.
// Explicit stateless mode uses signed cookies and Vercel edge protection instead.

import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True when configured and enabled. Does NOT mean the project is reachable. */
export const supabaseConfigured = Boolean(url && serviceKey) && !quarantine() && !stateless();

if (!supabaseConfigured) {
  console.warn(
    stateless() ? '[supabase] Stateless mode: database disabled; using static knowledge.' : '[supabase] Storage is not configured. Public requests require an explicitly configured session and rate-limit mode.'
  );
}

export const supabase = supabaseConfigured ? createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: { fetch: (input, init = {}) => fetch(input, { ...init, signal: init.signal ? AbortSignal.any([init.signal, AbortSignal.timeout(10000)]) : AbortSignal.timeout(10000) }) },
}) : null;

// A deleted or paused project fails as a thrown TypeError ("fetch failed"), not
// as a returned { error }, so every call site needs both paths covered.
export async function trySupabase(label, fn, fallback) {
  if (!supabaseConfigured) return fallback;
  try {
    const { data, error } = await fn();
    if (error) {
      console.error(`[supabase] ${label}: operation failed`);
      return fallback;
    }
    return data ?? fallback;
  } catch {
    console.error(`[supabase] ${label}: unavailable`);
    return fallback;
  }
}
