-- Allow one study session to cover multiple textbook topics without double-counting time.
-- study_sessions remains the canonical single duration row; this table records the
-- topic allocation for analytics and preserves the legacy primary topic_id column.

create table if not exists public.study_session_topics (
  session_id uuid not null references public.study_sessions(id) on delete cascade,
  owner_id uuid not null default auth.uid(),
  topic_id uuid not null references public.topics(id) on delete cascade,
  allocated_minutes integer not null default 0 check (allocated_minutes >= 0 and allocated_minutes <= 1440),
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (session_id, topic_id)
);

create index if not exists study_session_topics_owner_topic_idx
  on public.study_session_topics(owner_id, topic_id);

alter table public.study_session_topics enable row level security;

drop policy if exists "personal study session topics" on public.study_session_topics;
create policy "personal study session topics"
on public.study_session_topics
for all
to authenticated
using (
  owner_id = (select auth.uid())
  and exists (
    select 1 from public.study_sessions s
    where s.id = study_session_topics.session_id
      and s.owner_id = (select auth.uid())
  )
  and exists (
    select 1 from public.topics t
    where t.id = study_session_topics.topic_id
      and t.owner_id = (select auth.uid())
  )
)
with check (
  owner_id = (select auth.uid())
  and exists (
    select 1 from public.study_sessions s
    where s.id = study_session_topics.session_id
      and s.owner_id = (select auth.uid())
      and s.course_id = (
        select t.course_id from public.topics t
        where t.id = study_session_topics.topic_id
          and t.owner_id = (select auth.uid())
      )
  )
);

revoke all on table public.study_session_topics from anon;
grant select, insert, update, delete on table public.study_session_topics to authenticated;
grant all on table public.study_session_topics to service_role;

-- Existing sessions remain semantically identical: their legacy primary topic is
-- represented as the sole association and receives the full session duration.
insert into public.study_session_topics(session_id, owner_id, topic_id, allocated_minutes, is_primary)
select s.id, s.owner_id, s.topic_id, s.minutes, true
from public.study_sessions s
where s.topic_id is not null
on conflict (session_id, topic_id) do nothing;

create or replace function public.log_multi_topic_study_session(
  p_request_id uuid,
  p_course_id uuid,
  p_topic_ids uuid[],
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
set search_path to ''
as $function$
declare
  v_owner uuid := auth.uid();
  v_session_id uuid;
  v_topic_ids uuid[] := '{}'::uuid[];
  v_topic_count integer := 0;
  v_valid_count integer := 0;
  v_primary_topic_id uuid;
  v_topic public.topics%rowtype;
  v_topic_id uuid;
  v_ordinal integer;
  v_allocated integer;
  v_base_minutes integer;
  v_remainder integer;
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

  perform 1 from public.courses
  where id = p_course_id and owner_id = v_owner;
  if not found then
    raise exception 'Course not found' using errcode = 'P0002';
  end if;

  -- Preserve the caller's selection order while dropping nulls and duplicates.
  select coalesce(array_agg(x.topic_id order by x.first_ordinal), '{}'::uuid[])
  into v_topic_ids
  from (
    select u.topic_id, min(u.ordinality)::bigint as first_ordinal
    from unnest(coalesce(p_topic_ids, '{}'::uuid[])) with ordinality as u(topic_id, ordinality)
    where u.topic_id is not null
    group by u.topic_id
  ) x;

  v_topic_count := cardinality(v_topic_ids);
  if v_topic_count < 1 then
    raise exception 'Select at least one topic for multi-topic logging' using errcode = '22023';
  end if;
  if v_topic_count > 63 then
    raise exception 'Too many topics selected' using errcode = '22023';
  end if;

  select count(*) into v_valid_count
  from public.topics t
  where t.id = any(v_topic_ids)
    and t.course_id = p_course_id
    and t.owner_id = v_owner;
  if v_valid_count <> v_topic_count then
    raise exception 'Every selected topic must belong to the selected course' using errcode = '22023';
  end if;

  select id into v_session_id
  from public.study_sessions
  where owner_id = v_owner and request_id = p_request_id;
  if found then return v_session_id; end if;

  v_primary_topic_id := v_topic_ids[1];

  insert into public.study_sessions (
    owner_id, request_id, course_id, topic_id, date, minutes,
    planned_minutes, kind, competence, unclear, did, focus,
    method, energy, tasks, note
  )
  values (
    v_owner, p_request_id, p_course_id, v_primary_topic_id, p_date, p_minutes,
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

  v_base_minutes := p_minutes / v_topic_count;
  v_remainder := p_minutes % v_topic_count;

  for v_topic_id, v_ordinal in
    select u.topic_id, u.ordinality::integer
    from unnest(v_topic_ids) with ordinality as u(topic_id, ordinality)
    order by u.ordinality
  loop
    v_allocated := v_base_minutes + case when v_ordinal <= v_remainder then 1 else 0 end;

    insert into public.study_session_topics(session_id, owner_id, topic_id, allocated_minutes, is_primary)
    values (v_session_id, v_owner, v_topic_id, v_allocated, v_ordinal = 1)
    on conflict (session_id, topic_id) do update set
      allocated_minutes = excluded.allocated_minutes,
      is_primary = excluded.is_primary;

    select * into v_topic
    from public.topics
    where id = v_topic_id
      and course_id = p_course_id
      and owner_id = v_owner
    for update;

    v_step := case
      when p_kind = 'study' then least(30, round(v_allocated / 3.0)::integer)
      else case when v_allocated > 0 then 5 else 0 end
    end;
    v_progress := least(100, v_topic.progress + v_step);

    -- Manual study time is engagement evidence, not retrieval/mastery evidence.
    -- Keep the legacy verified-level rules, but never invent basic/exam successes.
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
      study_minutes = v_topic.study_minutes + v_allocated
    where id = v_topic.id and owner_id = v_owner;

    if v_verified <> v_topic.verified_level then
      insert into public.progress_events (
        owner_id, course_id, topic_id, kind, from_value, to_value, detail
      ) values (
        v_owner, p_course_id, v_topic.id, 'mastery',
        v_topic.verified_level, v_verified, v_topic.name
      );
    end if;
  end loop;

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
$function$;

revoke all on function public.log_multi_topic_study_session(uuid,uuid,uuid[],date,integer,integer,text,integer,text,text,integer,text,integer,text,text,uuid) from public;
grant execute on function public.log_multi_topic_study_session(uuid,uuid,uuid[],date,integer,integer,text,integer,text,text,integer,text,integer,text,text,uuid) to authenticated;
