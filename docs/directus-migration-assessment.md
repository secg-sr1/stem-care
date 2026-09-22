# Directus migration assessment — StemCare AI

Status: assessment only; no remote schema, permission or data changes made.

Recommendation: retain Supabase for the quickest recovery if its outage is temporary. Directus is viable for consolidating infrastructure, but requires a storage adapter and replacements for SQL functions, not merely an API URL change.

## Existing model and behavior to preserve

- `documents`: knowledge text, metadata/source distinction and 1536-dimension embeddings; `match_documents` supports semantic retrieval with metadata filtering.
- `agent_sessions`: UUID, language and creation time; signed HttpOnly cookie establishes ownership; 24-hour expiration.
- `agent_messages`: session-linked conversation history, removed with the session.
- `agent_tool_calls`: session-linked tool audit records.
- `agent_approvals`: pending/executing/approved/rejected/error workflow, session ownership and atomic claim before side effects. Preserve stale-execution handling to avoid duplicate sends.
- `rate_limits`: atomic shared fixed-window counter. The active HTTP boundary (`lib/http/security.mjs`) fails closed on storage errors; do not rely on the older fail-open helper comment.
- Hourly deletion of sessions older than 24 hours and old rate-limit rows. Directus audit/revision logs and backups also need a retention policy so deleted chat content is not silently retained forever.

## Required deployment information

1. Directus version, database engine/version, available extensions and ability to deploy a private endpoint extension or server-side database adapter.
2. If PostgreSQL: permission to install/use pgvector and create a matching indexed 1536-dimension embedding column and search function. Otherwise choose a separate vector database; ordinary Directus text filters are not equivalent to semantic search.
3. Staging database/project, schema snapshot, backup/restore owner and deployment access. Confirm isolation from existing Directus business collections.
4. A dedicated non-admin service account restricted to the AI collections; configure its token only in server secrets (`DIRECTUS_URL`, `DIRECTUS_TOKEN`), never `VITE_*`, browser storage, source control or chat messages. Disable public-role access to chats, approvals and tool records.
5. A scheduled cleanup mechanism; atomic database transactions/endpoint for rate-limit increments and approval claims; TLS, monitoring, backups and restoration tests.
6. Approved knowledge sources plus recoverable document/embedding export or source files for re-ingestion. Existing expired conversations need not be migrated.

## Safe implementation sequence

- Export schema and approved knowledge, take a backup, provision isolated staging collections with matching keys and cascading relationships.
- Implement a server-only repository adapter; retain the existing API endpoints and cookie checks. OpenAI configuration remains separate and unchanged.
- Implement semantic retrieval, atomic rate limits and approval claims using a private backend endpoint/database function. A REST read followed by update is not an atomic claim.
- Test cross-session denial, tampered/expired cookies, deletion cascade, rate-limit concurrency, repeated approval requests, knowledge source filtering, storage outage, cleanup and absence of browser credentials.
- Test against staging, then switch providers with rollback available. Do not disable existing controls to make unavailable storage appear healthy.

Directus supports policy-based collection/field permissions and server-to-server tokens; these do not replace application-level session isolation when all requests use one service account.

References: https://docs.directus.io/reference/system/permissions ; https://docs.directus.io/reference/authentication ; https://docs.directus.io/getting-started/architecture
