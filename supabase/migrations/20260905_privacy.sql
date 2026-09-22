-- Apply after schema.sql and rate_limit.sql. Service role remains server-only.
alter table public.documents enable row level security;
alter table public.agent_sessions enable row level security;
alter table public.agent_messages enable row level security;
alter table public.agent_tool_calls enable row level security;
alter table public.agent_approvals enable row level security;
revoke all on public.documents, public.agent_sessions, public.agent_messages, public.agent_tool_calls, public.agent_approvals from anon, authenticated;
revoke execute on function public.match_documents(vector, integer, jsonb) from public, anon, authenticated;
revoke execute on function public.rate_limit_hit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.match_documents(vector, integer, jsonb) to service_role;
grant execute on function public.rate_limit_hit(text, integer, integer) to service_role;
create index if not exists agent_sessions_created_idx on public.agent_sessions(created_at);
create or replace function public.cleanup_agent_sessions() returns void language sql security definer set search_path = public as $$
  delete from agent_sessions where created_at <= now() - interval '24 hours';
  delete from rate_limits where window_start < floor(extract(epoch from now()) / 60) - 2;
$$;
revoke all on function public.cleanup_agent_sessions() from public, anon, authenticated;
grant execute on function public.cleanup_agent_sessions() to service_role;
create extension if not exists pg_cron;
select cron.unschedule(jobid) from cron.job where jobname = 'teravida-session-cleanup';
select cron.schedule('teravida-session-cleanup', '0 * * * *', 'select public.cleanup_agent_sessions()');
