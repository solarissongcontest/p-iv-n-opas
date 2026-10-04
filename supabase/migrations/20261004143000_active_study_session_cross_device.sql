-- Keep one unfinished study session available across every Arthur device.
-- The database is the authority for running/paused state and elapsed time.
-- Browser clients only render the canonical server-backed session.

create table if not exists public.active_study_sessions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  plan_item_id uuid references public.plan_items(id) on delete set null,
  course_id uuid not null references public.courses(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete set null,
  target_minutes integer not null default 30 check (target_minutes between 1 and 240),
  phase smallint not null default 1 check (phase between 0 and 4),
  objective text not null default '',
  recall text not null default '',
  did text not null default '',
  retrieval_check text not null default '',
  retrieval_result text check (retrieval_result is null or retrieval_result in ('independent','hinted','not_yet')),
  retrieval_confidence smallint check (retrieval_confidence is null or retrieval_confidence between 1 and 3),
  unclear text not null default '',
  note text not null default '',
  method text not null default 'tehtävät',
  tasks text not null default '',
  status text not null default 'running' check (status in ('running','paused')),
  elapsed_seconds integer not null default 0 check (elapsed_seconds >= 0),
  running_since timestamptz,
  created_at timestamptz not null default clock_timestamp(),
  updated_at timestamptz not null default clock_timestamp(),
  constraint active_study_sessions_one_per_owner unique (owner_id)
);

alter table public.active_study_sessions enable row level security;

drop policy if exists "active study sessions select own" on public.active_study_sessions;
create policy "active study sessions select own"
on public.active_study_sessions
for select
to authenticated
using ((select auth.uid()) = owner_id);

drop policy if exists "active study sessions insert own" on public.active_study_sessions;
create policy "active study sessions insert own"
on public.active_study_sessions
for insert
to authenticated
with check ((select auth.uid()) = owner_id);

drop policy if exists "active study sessions update own" on public.active_study_sessions;
create policy "active study sessions update own"
on public.active_study_sessions
for update
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

drop policy if exists "active study sessions delete own" on public.active_study_sessions;
create policy "active study sessions delete own"
on public.active_study_sessions
for delete
to authenticated
using ((select auth.uid()) = owner_id);

revoke all on table public.active_study_sessions from public, anon;
grant select, insert, update, delete on table public.active_study_sessions to authenticated, service_role;

create or replace function public.touch_active_study_session_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := clock_timestamp();
  return new;
end;
$$;

revoke all on function public.touch_active_study_session_updated_at() from public, anon, authenticated;

drop trigger if exists active_study_sessions_touch_updated_at on public.active_study_sessions;
create trigger active_study_sessions_touch_updated_at
before update on public.active_study_sessions
for each row
execute function public.touch_active_study_session_updated_at();

create or replace function public.active_study_session_snapshot()
returns jsonb
language sql
security invoker
set search_path = ''
as $$
  select to_jsonb(s) || jsonb_build_object(
    'effective_elapsed_seconds',
      s.elapsed_seconds
      + case
          when s.status = 'running' and s.running_since is not null
            then greatest(0, floor(extract(epoch from clock_timestamp() - s.running_since))::integer)
          else 0
        end,
    'server_now', clock_timestamp()
  )
  from public.active_study_sessions s
  where s.owner_id = (select auth.uid())
  limit 1
$$;

revoke all on function public.active_study_session_snapshot() from public, anon;
grant execute on function public.active_study_session_snapshot() to authenticated, service_role;

create or replace function public.start_active_study_session(
  p_plan_item_id uuid,
  p_course_id uuid,
  p_topic_id uuid,
  p_target_minutes integer,
  p_objective text
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_session_id uuid;
begin
  if v_owner is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  if p_target_minutes is null or p_target_minutes < 1 or p_target_minutes > 240 then
    raise exception 'target_minutes must be between 1 and 240' using errcode = '22023';
  end if;

  perform 1
  from public.courses
  where id = p_course_id and owner_id = v_owner;
  if not found then
    raise exception 'Course not found' using errcode = 'P0002';
  end if;

  if p_topic_id is not null then
    perform 1
    from public.topics
    where id = p_topic_id
      and course_id = p_course_id
      and owner_id = v_owner;
    if not found then
      raise exception 'Topic not found for course' using errcode = 'P0002';
    end if;
  end if;

  if p_plan_item_id is not null then
    perform 1
    from public.plan_items
    where id = p_plan_item_id
      and course_id = p_course_id
      and owner_id = v_owner;
    if not found then
      raise exception 'Plan item not found for course' using errcode = 'P0002';
    end if;
  end if;

  -- A second device must resume the existing session, never create a duplicate.
  select id
  into v_session_id
  from public.active_study_sessions
  where owner_id = v_owner
  for update;

  if found then
    return v_session_id;
  end if;

  insert into public.active_study_sessions (
    owner_id,
    plan_item_id,
    course_id,
    topic_id,
    target_minutes,
    phase,
    objective,
    status,
    elapsed_seconds,
    running_since
  )
  values (
    v_owner,
    p_plan_item_id,
    p_course_id,
    p_topic_id,
    p_target_minutes,
    1,
    coalesce(p_objective, ''),
    'running',
    0,
    clock_timestamp()
  )
  on conflict (owner_id) do nothing
  returning id into v_session_id;

  if v_session_id is null then
    select id
    into v_session_id
    from public.active_study_sessions
    where owner_id = v_owner;
  end if;

  return v_session_id;
end;
$$;

revoke all on function public.start_active_study_session(uuid, uuid, uuid, integer, text) from public, anon;
grant execute on function public.start_active_study_session(uuid, uuid, uuid, integer, text) to authenticated, service_role;

create or replace function public.set_active_study_session_running(
  p_session_id uuid,
  p_running boolean
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
begin
  if v_owner is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  if p_running then
    update public.active_study_sessions
    set
      status = 'running',
      running_since = case
        when status = 'running' and running_since is not null then running_since
        else clock_timestamp()
      end
    where id = p_session_id
      and owner_id = v_owner;
  else
    update public.active_study_sessions
    set
      elapsed_seconds = elapsed_seconds
        + case
            when status = 'running' and running_since is not null
              then greatest(0, floor(extract(epoch from clock_timestamp() - running_since))::integer)
            else 0
          end,
      status = 'paused',
      running_since = null
    where id = p_session_id
      and owner_id = v_owner;
  end if;

  if not found then
    raise exception 'Active study session not found' using errcode = 'P0002';
  end if;
end;
$$;

revoke all on function public.set_active_study_session_running(uuid, boolean) from public, anon;
grant execute on function public.set_active_study_session_running(uuid, boolean) to authenticated, service_role;

-- Completing or skipping the linked Planner item clears the shared active session
-- in the same transaction as the plan status change.
create or replace function public.clear_active_study_session_after_plan_finish()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.status in ('completed', 'skipped')
     and old.status is distinct from new.status then
    delete from public.active_study_sessions
    where owner_id = new.owner_id
      and plan_item_id = new.id;
  end if;
  return new;
end;
$$;

revoke all on function public.clear_active_study_session_after_plan_finish() from public, anon, authenticated;

drop trigger if exists plan_items_clear_active_study_session on public.plan_items;
create trigger plan_items_clear_active_study_session
after update of status on public.plan_items
for each row
execute function public.clear_active_study_session_after_plan_finish();
