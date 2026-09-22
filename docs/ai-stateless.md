# Temporary production chat without Supabase

Set `STEMCARE_STORAGE_MODE=stateless`, a random server-only `SESSION_SECRET`
(at least 32 characters), and the existing `OPENAI_API_KEY` in Vercel Production.
Keep all Supabase credentials for later restoration. Never prefix secrets with VITE_.

Before setting `STEMCARE_EDGE_RATE_LIMIT=true`, publish and enable a Vercel WAF
rule covering request paths starting with `/api/`, every deployment hostname,
30 requests per 60 seconds per IP, fixed window, action HTTP 429. The flag is an
operator assertion that this external protection is active, not a limiter itself.
Do not disable this rule while stateless mode is active. Deploy after env changes.

Sessions use signed, Secure, HttpOnly, SameSite=Strict cookies expiring in 24 hours.
No database or process-local session storage is used. Recent conversation context
comes from sessionStorage in the browser (up to 8 messages and 12,000 characters
per request); it is untrusted and cannot authorize actions. The OpenAI request
uses store=false. Knowledge search falls back to the curated institutional facts.
Database knowledge retrieval, chat archives and agent write approvals are disabled.
Visitors receive direct contact links for consultations; no request is claimed saved.
Deleting the conversation clears browser state and its cookie. A copied cookie
cannot be individually revoked before expiry in this mode; no server records or
write actions can be accessed with it. Rotating SESSION_SECRET invalidates all cookies.

Verify a fresh chat, follow-up question, page reload, and clear-conversation in
production. A fresh GET /api/session returns 401 until the first message creates a
session; this is expected. 503 is not expected. Verify the edge returns 429 after
the configured request count without generating paid AI requests.

To restore Supabase, resume the project, verify its schema and rate_limit_hit RPC,
set STEMCARE_STORAGE_MODE=supabase, and redeploy. Existing browser-only history
is not migrated. Supabase session ownership and rate limits resume automatically.
