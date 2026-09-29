-- Capacity model, retrieval attempts and richer adaptive review evidence.

alter table public.user_preferences
  add column if not exists weekday_capacity_minutes smallint not null default 60,
  add column if not exists weekend_capacity_minutes smallint not null default 90,
  add column if not exists busy_dates date[] not null default '{}'::date[];

alter table public.user_preferences
  drop constraint if exists user_preferences_weekday_capacity_check,
  add constraint user_preferences_weekday_capacity_check
    check (weekday_capacity_minutes between 15 and 360),
  drop constraint if exists user_preferences_weekend_capacity_check,
  add constraint user_preferences_weekend_capacity_check
    check (weekend_capacity_minutes between 15 and 480);

alter table public.topics
  add column if not exists retrieval_attempts integer not null default 0,
  add column if not exists retrieval_failures integer not null default 0,
  add column if not exists mastery_uncertainty real not null default 1,
  add column if not exists last_retrieval_at date,
  add column if not exists last_retrieval_difficulty smallint;

alter table public.topics
  drop constraint if exists topics_mastery_uncertainty_check,
  add constraint topics_mastery_uncertainty_check
    check (mastery_uncertainty between 0 and 1),
  drop constraint if exists topics_last_retrieval_difficulty_check,
  add constraint topics_last_retrieval_difficulty_check
    check (last_retrieval_difficulty is null or last_retrieval_difficulty between 1 and 5);

update public.topics
set
  retrieval_attempts = greatest(
    retrieval_attempts,
    basic_successes + exam_successes + delayed_successes
  ),
  mastery_uncertainty = greatest(
    0.15,
    least(
      1.0,
      (1.0 / sqrt(greatest(1, basic_successes + exam_successes + delayed_successes + 1)))::real
    )
  )
where retrieval_attempts = 0;

create table if not exists public.practice_attempts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  date date not null default current_date,
  attempt_type text not null default 'free_recall',
  prompt text not null,
  response text,
  difficulty smallint not null default 2,
  result text not null,
  confidence smallint,
  hint_used boolean not null default false,
  delay_days integer,
  created_at timestamptz not null default now(),
  constraint practice_attempts_type_check
    check (attempt_type in ('free_recall','short_answer','calculation','application','recognition')),
  constraint practice_attempts_result_check
    check (result in ('independent','hinted','not_yet')),
  constraint practice_attempts_difficulty_check
    check (difficulty between 1 and 5),
  constraint practice_attempts_confidence_check
    check (confidence is null or confidence between 1 and 3),
  constraint practice_attempts_delay_check
    check (delay_days is null or delay_days >= 0)
);

alter table public.practice_attempts enable row level security;

drop policy if exists "personal practice attempts" on public.practice_attempts;
create policy "personal practice attempts" on public.practice_attempts
  for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

grant select, insert, update, delete on public.practice_attempts to authenticated;
grant all on public.practice_attempts to service_role;

create index if not exists practice_attempts_owner_created_idx
  on public.practice_attempts(owner_id, created_at desc);
create index if not exists practice_attempts_topic_date_idx
  on public.practice_attempts(topic_id, date desc);

create or replace function public.record_practice_attempt(
  p_course_id uuid,
  p_topic_id uuid,
  p_date date,
  p_attempt_type text,
  p_prompt text,
  p_response text,
  p_difficulty integer,
  p_result text,
  p_confidence integer,
  p_hint_used boolean
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_attempt_id uuid;
  v_topic public.topics%rowtype;
  v_attempts integer;
  v_failures integer;
  v_basic integer;
  v_exam integer;
  v_delayed integer;
  v_verified integer;
  v_delay integer := null;
  v_uncertainty real;
begin
  if v_owner is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if p_result not in ('independent','hinted','not_yet') then
    raise exception 'Invalid result' using errcode = '22023';
  end if;
  if p_attempt_type not in ('free_recall','short_answer','calculation','application','recognition') then
    raise exception 'Invalid attempt type' using errcode = '22023';
  end if;
  if p_difficulty < 1 or p_difficulty > 5 then
    raise exception 'Invalid difficulty' using errcode = '22023';
  end if;
  if p_confidence is not null and (p_confidence < 1 or p_confidence > 3) then
    raise exception 'Invalid confidence' using errcode = '22023';
  end if;
  if char_length(trim(coalesce(p_prompt,''))) < 3 then
    raise exception 'Prompt is required' using errcode = '22023';
  end if;

  select * into v_topic
  from public.topics
  where id = p_topic_id
    and course_id = p_course_id
    and owner_id = v_owner
  for update;

  if not found then
    raise exception 'Topic not found' using errcode = 'P0002';
  end if;

  if v_topic.last_retrieval_at is not null then
    v_delay := greatest(0, coalesce(p_date, current_date) - v_topic.last_retrieval_at);
  elsif v_topic.last_review is not null then
    v_delay := greatest(0, coalesce(p_date, current_date) - v_topic.last_review);
  end if;

  insert into public.practice_attempts (
    owner_id, course_id, topic_id, date, attempt_type, prompt, response,
    difficulty, result, confidence, hint_used, delay_days
  ) values (
    v_owner, p_course_id, p_topic_id, coalesce(p_date,current_date),
    p_attempt_type, trim(p_prompt), nullif(trim(coalesce(p_response,'')),''),
    p_difficulty, p_result, p_confidence, coalesce(p_hint_used,false), v_delay
  )
  returning id into v_attempt_id;

  v_attempts := v_topic.retrieval_attempts + 1;
  v_failures := v_topic.retrieval_failures
    + case when p_result = 'not_yet' then 1 else 0 end;

  v_basic := v_topic.basic_successes
    + case
        when p_result = 'independent' and p_difficulty <= 3 then 1
        else 0
      end;

  v_exam := v_topic.exam_successes
    + case
        when p_result = 'independent' and p_difficulty >= 4 then 1
        else 0
      end;

  v_delayed := v_topic.delayed_successes
    + case
        when p_result = 'independent' and coalesce(v_delay,0) >= 3 then 1
        else 0
      end;

  v_verified := 0;
  if v_topic.progress >= 25 then v_verified := 1; end if;
  if v_topic.progress >= 60 and v_basic >= 1 then v_verified := 2; end if;
  if v_basic >= 2 then v_verified := 3; end if;
  if v_exam >= 1 and v_basic >= 2 then v_verified := 4; end if;
  if v_exam >= 2 and v_delayed >= 1 then v_verified := 5; end if;

  v_uncertainty := greatest(
    0.15,
    least(
      1.0,
      (
        1.0 / sqrt(greatest(1, v_attempts + v_exam + v_delayed))
        + case when p_result = 'not_yet' then 0.15 else 0 end
        + case when p_result = 'hinted' then 0.08 else 0 end
      )::real
    )
  );

  update public.topics
  set
    basic_successes = v_basic,
    exam_successes = v_exam,
    delayed_successes = v_delayed,
    retrieval_attempts = v_attempts,
    retrieval_failures = v_failures,
    verified_level = v_verified,
    mastery_uncertainty = v_uncertainty,
    last_review = coalesce(p_date,current_date),
    last_retrieval_at = coalesce(p_date,current_date),
    last_retrieval_result = p_result,
    last_retrieval_confidence = p_confidence,
    last_retrieval_difficulty = p_difficulty,
    next_review = coalesce(p_date,current_date) + 1
  where id = v_topic.id and owner_id = v_owner;

  if v_verified <> v_topic.verified_level then
    insert into public.progress_events (
      owner_id, course_id, topic_id, kind, from_value, to_value, detail
    ) values (
      v_owner, p_course_id, v_topic.id, 'mastery',
      v_topic.verified_level, v_verified,
      v_topic.name || ' · Practice Mode'
    );
  end if;

  return v_attempt_id;
end;
$$;

revoke all on function public.record_practice_attempt(
  uuid, uuid, date, text, text, text, integer, text, integer, boolean
) from public;
grant execute on function public.record_practice_attempt(
  uuid, uuid, date, text, text, text, integer, text, integer, boolean
) to authenticated, service_role;

create or replace function public.adapt_topic_review_schedule()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_gap integer;
  v_elapsed integer := 0;
  v_exam_date date;
  v_days_to_exam integer;
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
    end if;

    if new.mastery_uncertainty >= 0.65 then
      v_gap := least(v_gap, 2);
    elsif new.mastery_uncertainty >= 0.40 then
      v_gap := least(v_gap, 4);
    end if;

    if new.last_retrieval_difficulty >= 4
       and new.last_retrieval_confidence = 3 then
      v_gap := greatest(v_gap, round(v_gap * 1.15)::integer);
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

  select c.exam_date into v_exam_date
  from public.courses c
  where c.id = new.course_id
    and c.owner_id = new.owner_id;

  if v_exam_date is not null then
    v_days_to_exam := v_exam_date - new.last_review;
    if v_days_to_exam between 0 and 7 then
      v_gap := least(v_gap, 3);
    elsif v_days_to_exam between 8 and 14 then
      v_gap := least(v_gap, 5);
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
  last_retrieval_confidence,
  last_retrieval_difficulty,
  mastery_uncertainty
on public.topics
for each row
execute function public.adapt_topic_review_schedule();

revoke all on function public.adapt_topic_review_schedule() from public, anon;
grant execute on function public.adapt_topic_review_schedule() to authenticated, service_role;


-- Practice tests feed the same retrieval evidence model as Practice Mode.
create or replace function public.record_practice_test(
  p_course_id uuid,
  p_date date,
  p_score numeric,
  p_max_score numeric,
  p_duration_minutes integer,
  p_error_count integer,
  p_topic_results jsonb
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_test_id uuid;
  v_item jsonb;
  v_topic public.topics%rowtype;
  v_ratio numeric;
  v_result text;
  v_attempts integer;
  v_failures integer;
  v_exam integer;
  v_delayed integer;
  v_verified integer;
  v_delay integer := null;
  v_uncertainty real;
begin
  if v_owner is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  perform 1 from public.courses
  where id = p_course_id and owner_id = v_owner;
  if not found then
    raise exception 'Course not found' using errcode = 'P0002';
  end if;

  if p_max_score is null or p_max_score <= 0 or p_score < 0 or p_score > p_max_score then
    raise exception 'Invalid practice test score' using errcode = '22023';
  end if;

  insert into public.practice_tests (
    owner_id, course_id, date, score, max_score, duration_minutes, error_count, topic_results
  )
  values (
    v_owner, p_course_id, coalesce(p_date,current_date), p_score, p_max_score,
    p_duration_minutes, p_error_count, coalesce(p_topic_results,'[]'::jsonb)
  )
  returning id into v_test_id;

  for v_item in select * from jsonb_array_elements(coalesce(p_topic_results,'[]'::jsonb))
  loop
    if coalesce((v_item->>'max_score')::numeric,0) <= 0 then continue; end if;

    select * into v_topic
    from public.topics
    where id = (v_item->>'topic_id')::uuid
      and course_id = p_course_id
      and owner_id = v_owner
    for update;

    if not found then continue; end if;

    v_ratio := coalesce((v_item->>'score')::numeric,0) /
      nullif((v_item->>'max_score')::numeric,0);
    v_result := case
      when v_ratio >= 0.70 then 'independent'
      when v_ratio >= 0.50 then 'hinted'
      else 'not_yet'
    end;

    if v_topic.last_retrieval_at is not null then
      v_delay := greatest(0, coalesce(p_date,current_date) - v_topic.last_retrieval_at);
    elsif v_topic.last_review is not null then
      v_delay := greatest(0, coalesce(p_date,current_date) - v_topic.last_review);
    else
      v_delay := null;
    end if;

    v_attempts := v_topic.retrieval_attempts + 1;
    v_failures := v_topic.retrieval_failures
      + case when v_result = 'not_yet' then 1 else 0 end;
    v_exam := v_topic.exam_successes
      + case when v_result = 'independent' then 1 else 0 end;
    v_delayed := v_topic.delayed_successes
      + case when v_result = 'independent' and coalesce(v_delay,0) >= 3 then 1 else 0 end;

    v_verified := 0;
    if v_topic.progress >= 25 then v_verified := 1; end if;
    if v_topic.progress >= 60 and v_topic.basic_successes >= 1 then v_verified := 2; end if;
    if v_topic.basic_successes >= 2 then v_verified := 3; end if;
    if v_exam >= 1 and v_topic.basic_successes >= 2 then v_verified := 4; end if;
    if v_exam >= 2 and v_delayed >= 1 then v_verified := 5; end if;

    v_uncertainty := greatest(
      0.15,
      least(
        1.0,
        (
          1.0 / sqrt(greatest(1, v_attempts + v_exam + v_delayed))
          + case when v_result = 'not_yet' then 0.15 else 0 end
          + case when v_result = 'hinted' then 0.08 else 0 end
        )::real
      )
    );

    update public.topics
    set
      exam_successes = v_exam,
      delayed_successes = v_delayed,
      retrieval_attempts = v_attempts,
      retrieval_failures = v_failures,
      verified_level = v_verified,
      mastery_uncertainty = v_uncertainty,
      last_review = coalesce(p_date,current_date),
      last_retrieval_at = coalesce(p_date,current_date),
      last_retrieval_result = v_result,
      last_retrieval_confidence = null,
      last_retrieval_difficulty = 5,
      next_review = coalesce(p_date,current_date) + 1
    where id = v_topic.id and owner_id = v_owner;

    if v_verified <> v_topic.verified_level then
      insert into public.progress_events (
        owner_id, course_id, topic_id, kind, from_value, to_value, detail
      ) values (
        v_owner, p_course_id, v_topic.id, 'mastery',
        v_topic.verified_level, v_verified,
        v_topic.name || ' · harjoituskoe'
      );
    end if;
  end loop;

  return v_test_id;
end;
$$;

revoke all on function public.record_practice_test(
  uuid, date, numeric, numeric, integer, integer, jsonb
) from public;
grant execute on function public.record_practice_test(
  uuid, date, numeric, numeric, integer, integer, jsonb
) to authenticated, service_role;
