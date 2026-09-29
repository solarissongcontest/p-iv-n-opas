-- Separate self-assessment from demonstrated retrieval evidence.
-- Manual study logs remain useful for time, coverage and calibration, but
-- they no longer increase mastery evidence counters by themselves.

alter table public.study_sessions
  add column if not exists objective text,
  add column if not exists recall text,
  add column if not exists retrieval_check text,
  add column if not exists retrieval_result text,
  add column if not exists retrieval_confidence smallint;

alter table public.topics
  add column if not exists last_retrieval_result text,
  add column if not exists last_retrieval_confidence smallint;

alter table public.study_sessions
  drop constraint if exists study_sessions_retrieval_result_check,
  add constraint study_sessions_retrieval_result_check
    check (retrieval_result is null or retrieval_result in ('independent','hinted','not_yet')),
  drop constraint if exists study_sessions_retrieval_confidence_check,
  add constraint study_sessions_retrieval_confidence_check
    check (retrieval_confidence is null or retrieval_confidence between 1 and 3);

alter table public.topics
  drop constraint if exists topics_last_retrieval_result_check,
  add constraint topics_last_retrieval_result_check
    check (last_retrieval_result is null or last_retrieval_result in ('independent','hinted','not_yet')),
  drop constraint if exists topics_last_retrieval_confidence_check,
  add constraint topics_last_retrieval_confidence_check
    check (last_retrieval_confidence is null or last_retrieval_confidence between 1 and 3);

create or replace function public.adapt_topic_review_schedule()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_gap integer;
  v_elapsed integer := 0;
begin
  if new.last_review is null
     or new.last_review is not distinct from old.last_review then
    return new;
  end if;

  v_gap := case greatest(0, least(5, new.verified_level))
    when 0 then 1
    when 1 then 2
    when 2 then 4
    when 3 then 7
    when 4 then 14
    else 28
  end;

  if new.last_retrieval_result = 'not_yet' then
    v_gap := 1;
  elsif new.last_retrieval_result = 'hinted' then
    v_gap := least(v_gap, 2);
  else
    if new.last_retrieval_confidence = 1 then
      v_gap := least(v_gap, 2);
    elsif new.last_retrieval_confidence = 2 then
      v_gap := least(v_gap, 4);
    elsif new.last_retrieval_confidence is null then
      -- Legacy retrievals fall back to the old self-rating signal.
      if new.self_level = 1 then
        v_gap := least(v_gap, 2);
      elsif new.self_level = 2 then
        v_gap := least(v_gap, 4);
      end if;
    end if;

    if old.last_review is not null then
      v_elapsed := greatest(1, new.last_review - old.last_review);
    end if;

    if new.delayed_successes > old.delayed_successes
       and new.verified_level >= 3 then
      v_gap := greatest(
        v_gap,
        round(greatest(v_gap, v_elapsed) * 1.6)::integer
      );
    elsif new.exam_successes > old.exam_successes
          and new.verified_level >= 3 then
      v_gap := greatest(v_gap, round(v_gap * 1.25)::integer);
    end if;
  end if;

  v_gap := greatest(1, least(60, v_gap));
  new.next_review := new.last_review + v_gap;
  return new;
end;
$$;

drop trigger if exists topics_adaptive_review_schedule on public.topics;

create trigger topics_adaptive_review_schedule
before update of
  last_review,
  verified_level,
  self_level,
  delayed_successes,
  exam_successes,
  last_retrieval_result,
  last_retrieval_confidence
on public.topics
for each row
execute function public.adapt_topic_review_schedule();

revoke all on function public.adapt_topic_review_schedule() from public, anon;
grant execute on function public.adapt_topic_review_schedule() to authenticated, service_role;

-- Backward-compatible quick/manual logging.
-- p_competence is stored as self-assessment only. It does not create evidence.
create or replace function public.log_study_session(
  p_request_id uuid,
  p_course_id uuid,
  p_topic_id uuid,
  p_date date,
  p_minutes integer,
  p_planned_minutes integer,
  p_kind text,
  p_competence integer,
  p_unclear text,
  p_did text,
  p_focus integer,
  p_method text,
  p_energy integer,
  p_tasks text,
  p_note text,
  p_plan_item_id uuid
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_session_id uuid;
  v_topic public.topics%rowtype;
  v_progress integer;
  v_verified integer;
  v_step integer;
begin
  if v_owner is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if p_request_id is null then
    raise exception 'request_id is required' using errcode = '22023';
  end if;
  if p_minutes < 0 or p_minutes > 1440 then
    raise exception 'minutes must be between 0 and 1440' using errcode = '22023';
  end if;
  if p_competence is not null and (p_competence < 0 or p_competence > 5) then
    raise exception 'competence must be between 0 and 5' using errcode = '22023';
  end if;

  perform 1
  from public.courses
  where id = p_course_id and owner_id = v_owner;
  if not found then
    raise exception 'Course not found' using errcode = 'P0002';
  end if;

  select id into v_session_id
  from public.study_sessions
  where owner_id = v_owner and request_id = p_request_id;
  if found then return v_session_id; end if;

  insert into public.study_sessions (
    owner_id, request_id, course_id, topic_id, date, minutes,
    planned_minutes, kind, competence, unclear, did, focus,
    method, energy, tasks, note
  )
  values (
    v_owner, p_request_id, p_course_id, p_topic_id, p_date, p_minutes,
    p_planned_minutes, p_kind, p_competence, p_unclear, p_did, p_focus,
    p_method, p_energy, p_tasks, p_note
  )
  on conflict (owner_id, request_id) do nothing
  returning id into v_session_id;

  if v_session_id is null then
    select id into v_session_id
    from public.study_sessions
    where owner_id = v_owner and request_id = p_request_id;
    return v_session_id;
  end if;

  if p_topic_id is not null then
    select * into v_topic
    from public.topics
    where id = p_topic_id
      and course_id = p_course_id
      and owner_id = v_owner
    for update;
    if not found then
      raise exception 'Topic not found for course' using errcode = 'P0002';
    end if;

    v_step := case
      when p_kind = 'study' then least(30, round(p_minutes / 3.0)::integer)
      else 5
    end;
    v_progress := least(100, v_topic.progress + v_step);

    v_verified := 0;
    if v_progress >= 25 then v_verified := 1; end if;
    if v_progress >= 60 and v_topic.basic_successes >= 1 then v_verified := 2; end if;
    if v_topic.basic_successes >= 2 then v_verified := 3; end if;
    if v_topic.exam_successes >= 1 and v_topic.basic_successes >= 2 then v_verified := 4; end if;
    if v_topic.exam_successes >= 2 and v_topic.delayed_successes >= 1 then v_verified := 5; end if;

    update public.topics
    set
      progress = v_progress,
      self_level = coalesce(p_competence, v_topic.self_level),
      verified_level = v_verified,
      study_minutes = v_topic.study_minutes + p_minutes
    where id = v_topic.id and owner_id = v_owner;

    if v_verified <> v_topic.verified_level then
      insert into public.progress_events (
        owner_id, course_id, topic_id, kind, from_value, to_value, detail
      )
      values (
        v_owner, p_course_id, v_topic.id, 'mastery',
        v_topic.verified_level, v_verified, v_topic.name
      );
    end if;
  end if;

  if p_plan_item_id is not null then
    update public.plan_items
    set status = 'completed', session_id = v_session_id
    where id = p_plan_item_id
      and course_id = p_course_id
      and owner_id = v_owner;
    if not found then
      raise exception 'Plan item not found for course' using errcode = 'P0002';
    end if;
  end if;

  return v_session_id;
end;
$$;

revoke all on function public.log_study_session(
  uuid, uuid, uuid, date, integer, integer, text, integer,
  text, text, integer, text, integer, text, text, uuid
) from public;
grant execute on function public.log_study_session(
  uuid, uuid, uuid, date, integer, integer, text, integer,
  text, text, integer, text, integer, text, text, uuid
) to authenticated;

-- Guided sessions create evidence only from the retrieval check result.
create or replace function public.log_guided_study_session(
  p_request_id uuid,
  p_course_id uuid,
  p_topic_id uuid,
  p_date date,
  p_minutes integer,
  p_planned_minutes integer,
  p_kind text,
  p_competence integer,
  p_unclear text,
  p_did text,
  p_focus integer,
  p_method text,
  p_energy integer,
  p_tasks text,
  p_note text,
  p_plan_item_id uuid,
  p_objective text,
  p_recall text,
  p_retrieval_check text,
  p_retrieval_result text,
  p_retrieval_confidence integer
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_session_id uuid;
  v_topic public.topics%rowtype;
  v_progress integer;
  v_basic integer;
  v_exam integer;
  v_delayed integer;
  v_verified integer;
  v_step integer;
begin
  if v_owner is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if p_request_id is null then
    raise exception 'request_id is required' using errcode = '22023';
  end if;
  if p_minutes < 0 or p_minutes > 1440 then
    raise exception 'minutes must be between 0 and 1440' using errcode = '22023';
  end if;
  if p_competence is not null and (p_competence < 0 or p_competence > 5) then
    raise exception 'competence must be between 0 and 5' using errcode = '22023';
  end if;
  if p_retrieval_result not in ('independent','hinted','not_yet') then
    raise exception 'invalid retrieval_result' using errcode = '22023';
  end if;
  if p_retrieval_confidence is not null
     and (p_retrieval_confidence < 1 or p_retrieval_confidence > 3) then
    raise exception 'retrieval_confidence must be between 1 and 3' using errcode = '22023';
  end if;

  perform 1
  from public.courses
  where id = p_course_id and owner_id = v_owner;
  if not found then
    raise exception 'Course not found' using errcode = 'P0002';
  end if;

  select id into v_session_id
  from public.study_sessions
  where owner_id = v_owner and request_id = p_request_id;
  if found then return v_session_id; end if;

  insert into public.study_sessions (
    owner_id, request_id, course_id, topic_id, date, minutes,
    planned_minutes, kind, competence, unclear, did, focus,
    method, energy, tasks, note, objective, recall, retrieval_check,
    retrieval_result, retrieval_confidence
  )
  values (
    v_owner, p_request_id, p_course_id, p_topic_id, p_date, p_minutes,
    p_planned_minutes, p_kind, p_competence, p_unclear, p_did, p_focus,
    p_method, p_energy, p_tasks, p_note, p_objective, p_recall, p_retrieval_check,
    p_retrieval_result, p_retrieval_confidence
  )
  on conflict (owner_id, request_id) do nothing
  returning id into v_session_id;

  if v_session_id is null then
    select id into v_session_id
    from public.study_sessions
    where owner_id = v_owner and request_id = p_request_id;
    return v_session_id;
  end if;

  if p_topic_id is not null then
    select * into v_topic
    from public.topics
    where id = p_topic_id
      and course_id = p_course_id
      and owner_id = v_owner
    for update;
    if not found then
      raise exception 'Topic not found for course' using errcode = 'P0002';
    end if;

    v_step := case
      when p_kind = 'study' then least(30, round(p_minutes / 3.0)::integer)
      else 5
    end;
    v_progress := least(100, v_topic.progress + v_step);
    v_basic := v_topic.basic_successes
      + case when p_retrieval_result = 'independent' and p_kind <> 'review' then 1 else 0 end;
    v_exam := v_topic.exam_successes;
    v_delayed := v_topic.delayed_successes
      + case when p_retrieval_result = 'independent' and p_kind = 'review' then 1 else 0 end;

    v_verified := 0;
    if v_progress >= 25 then v_verified := 1; end if;
    if v_progress >= 60 and v_basic >= 1 then v_verified := 2; end if;
    if v_basic >= 2 then v_verified := 3; end if;
    if v_exam >= 1 and v_basic >= 2 then v_verified := 4; end if;
    if v_exam >= 2 and v_delayed >= 1 then v_verified := 5; end if;

    update public.topics
    set
      progress = v_progress,
      basic_successes = v_basic,
      exam_successes = v_exam,
      delayed_successes = v_delayed,
      self_level = coalesce(p_competence, v_topic.self_level),
      verified_level = v_verified,
      study_minutes = v_topic.study_minutes + p_minutes,
      last_review = p_date,
      last_retrieval_result = p_retrieval_result,
      last_retrieval_confidence = p_retrieval_confidence,
      next_review = p_date + 1
    where id = v_topic.id and owner_id = v_owner;

    if v_verified <> v_topic.verified_level then
      insert into public.progress_events (
        owner_id, course_id, topic_id, kind, from_value, to_value, detail
      )
      values (
        v_owner, p_course_id, v_topic.id, 'mastery',
        v_topic.verified_level, v_verified, v_topic.name
      );
    end if;
  end if;

  if p_plan_item_id is not null then
    update public.plan_items
    set status = 'completed', session_id = v_session_id
    where id = p_plan_item_id
      and course_id = p_course_id
      and owner_id = v_owner;
    if not found then
      raise exception 'Plan item not found for course' using errcode = 'P0002';
    end if;
  end if;

  return v_session_id;
end;
$$;

revoke all on function public.log_guided_study_session(
  uuid, uuid, uuid, date, integer, integer, text, integer,
  text, text, integer, text, integer, text, text, uuid,
  text, text, text, text, integer
) from public;
grant execute on function public.log_guided_study_session(
  uuid, uuid, uuid, date, integer, integer, text, integer,
  text, text, integer, text, integer, text, text, uuid,
  text, text, text, text, integer
) to authenticated;
