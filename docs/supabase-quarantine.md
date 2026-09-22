# Temporary Supabase quarantine

Run `npm run dev:quarantine` to use real OpenAI replies without contacting Supabase. The existing Supabase credentials and schema are preserved. Use `npm run dev:real` to restore Supabase-backed operation after the project is available.

This mode is restricted to development/test and is disabled on Vercel and in production. The development API binds to 127.0.0.1. Do not expose this temporary single-process setup as a production service.

- Default model: GPT-5.6 Luna (`STEMCARE_AI_MODEL` optional server-only override; use a compatible GPT-5.6 model).
- Reuses the existing OpenAI key; signed HttpOnly session cookies and local request limits remain active.
- Sessions are held in RAM, isolated by signed cookie, capped at 100, expire after 24 hours and are swept every minute. Restarting the server clears server-side conversations.
- Keeps eight recent messages, with a 12,000-character aggregate prompt-history budget; output caps are 1,000 tokens for beginner/intermediate and 1,800 for academic, per model call. At most three model/tool iterations; no automatic API retries; reasoning set to none; OpenAI request storage disabled.
- Knowledge search uses bundled institutional facts, not the unavailable Supabase document library. The assistant must acknowledge missing evidence and never invent citations.
- Supabase-backed action proposals/approvals cannot be stored and are disabled. Existing external contact links remain available; no automatic contact submission is performed by the assistant.
- Local RAM limits reset on server restart. These are operational bounds, not a guaranteed dollar spending cap; configure a project budget in OpenAI for account-level monitoring.

Validation: local ownership, tampered cookie rejection, memory bounds, expiration, deletion, request limits and production gate tested. A real GPT-5.6 Luna answer was successfully received through the HTTP streaming endpoint.
