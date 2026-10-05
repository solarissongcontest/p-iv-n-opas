-- Creating/opening a shared study session must not start the timer.
-- Time starts only after the client explicitly calls
-- set_active_study_session_running(..., true).

alter table public.active_study_sessions
  alter column status set default 'paused';

create or replace function public.start_active_study_session(
  p_plan_item_id uuid,
  p_course_id uuid,
  p_topic_id uuid,
  p_target_minutes integer,
  p_kind text,
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
  if p_kind not in ('study','review','test') then
    raise exception 'invalid study session kind' using errcode = '22023';
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

  -- A second device resumes the same draft/session; it never starts a new timer.
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
    kind,
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
    p_kind,
    1,
    coalesce(p_objective, ''),
    'paused',
    0,
    null
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

revoke all on function public.start_active_study_session(uuid, uuid, uuid, integer, text, text) from public, anon;
grant execute on function public.start_active_study_session(uuid, uuid, uuid, integer, text, text) to authenticated, service_role;
