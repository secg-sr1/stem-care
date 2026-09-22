# Embedded StemCare agent

The homepage CTA opens a nonmodal, translucent panel without navigating away. The panel is loaded on first use and remains mounted when minimized, preserving the draft and ongoing response. Escape closes it and restores focus. Reduced-motion preferences disable panel animation and incremental text reveal. Messages are saved in tab session storage until the server session expires or the visitor clears the conversation.

The server runtime and its knowledge, tool, session and approval modules were ported from the supplied Teravida project. The same-origin endpoints are `POST /api/agents/concierge` (streamed text), `GET/DELETE /api/session`, and `GET/POST /api/agents/approvals`. Website cookies and browser storage use distinct StemCare names. Existing website email handling is unchanged.

## Run locally

Use Node 22 or later and `npm install`. `npm run dev` starts both Vite (5173) and the API (5174) in explicitly labeled simulation mode, with deterministic example answers and no provider calls or contact writes. `npm run dev:real` starts the same servers with real integrations. Server credentials are read from the environment first, then ignored `.env.local` and `.env` files. The existing environment OpenAI key is reused without copying it into browser code or a file.

## Real configuration

The OpenAI key alone is insufficient: the existing agent requires `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and a `SESSION_SECRET` of at least 32 characters for shared rate limits and signed session ownership. Configure these in the server environment. Local scripts optionally read the existing agent env file through `STEMCARE_AGENT_ENV`; the ignored local configuration points to the supplied Teravida project's `.env`. No secrets are copied. Local development generates a temporary session signing secret in memory if absent; these sessions end on API restart. Production never uses this fallback and requires a stable configured secret.

Configure the existing Supabase schema, rate-limit function and privacy migration in `supabase/` if they have not already been installed. These files are included for parity with Teravida, but no database migrations were executed. Follow the SQL files' prerequisites before applying to a new database.

For contact confirmations, configure `TURNSTILE_SECRET_KEY`, its matching public `VITE_TURNSTILE_SITE_KEY`, and `UPSTREAM_TOKEN`/`UPSTREAM_BASE`. Keep `APP_ORIGINS` restricted to actual website origins. Confirmation stays disabled when bot verification is unavailable. The existing agent prepares contact requests and only executes them after the visitor confirms.

## Deployment

Deploy the website and `api/` functions together on Vercel; a static-only host cannot run the agent. Configure server secrets on the deployment and the public Turnstile site key at build time. Do not enable simulation in production (the server also rejects it there). Match the host's streaming function duration to the agent's 90-second upper bound. Preserve the existing SPA rewrite. No deployment is performed by this change.

## Verification

`npm run build` builds the frontend. `npm run lint` checks the repository. `node --test tests/agent-api.test.mjs` exercises the real HTTP handlers locally in simulation, without credentials or external calls. Live OpenAI/database/Directus behavior must be verified with the real server configuration before release.

