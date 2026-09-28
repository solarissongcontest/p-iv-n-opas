-- Persistent, atomic AI rate limits shared by all serverless instances.
-- No prompts, student answers or conversation content are stored here.

create table if not exists public.coach_budget (
  owner_id uuid primary key,
  window_start timestamptz not null default now(),
  window_count integer not null default 0,
  day_start date not null default (now() at time zone 'UTC')::date,
  day_count integer not null default 0
);

alter table public.coach_budget enable row level security;

revoke all on table public.coach_budget from public, anon, authenticated;
grant select, insert, update on table public.coach_budget to service_role;

create or replace function public.consume_coach_budget(p_owner uuid)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  accepted uuid;
begin
  insert into public.coach_budget as b (
    owner_id,
    window_start,
    window_count,
    day_start,
    day_count
  )
  values (
    p_owner,
    now(),
    1,
    (now() at time zone 'UTC')::date,
    1
  )
  on conflict (owner_id) do update set
    window_start = case
      when b.window_start <= now() - interval '10 minutes' then now()
      else b.window_start
    end,
    window_count = case
      when b.window_start <= now() - interval '10 minutes' then 1
      else b.window_count + 1
    end,
    day_start = (now() at time zone 'UTC')::date,
    day_count = case
      when b.day_start < (now() at time zone 'UTC')::date then 1
      else b.day_count + 1
    end
  where
    (b.window_start <= now() - interval '10 minutes' or b.window_count < 20)
    and
    (b.day_start < (now() at time zone 'UTC')::date or b.day_count < 100)
  returning owner_id into accepted;

  return accepted is not null;
end;
$$;

revoke all on function public.consume_coach_budget(uuid) from public, anon, authenticated;
grant execute on function public.consume_coach_budget(uuid) to service_role;
