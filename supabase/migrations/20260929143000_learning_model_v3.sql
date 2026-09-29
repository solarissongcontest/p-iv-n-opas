-- Learning Model v3: richer practice evidence, derived topic state and idempotent offline sync.

alter table public.user_preferences
  add column if not exists learning_schema_version smallint not null default 3;

alter table public.practice_attempts
  add column if not exists schema_version smallint not null default 3,
  add column if not exists outcome text,
  add column if not exists hints_used integer not null default 0,
  add column if not exists response_time_ms integer,
  add column if not exists source text not null default 'practice',
  add column if not exists evidence_quality real not null default 0,
  add column if not exists skills text[] not null default '{}'::text[],
  add column if not exists expected_concepts text[] not null default '{}'::text[],
  add column if not exists question_payload jsonb not null default '{}'::jsonb,
  add column if not exists operation_id uuid;

alter table public.practice_attempts
  drop constraint if exists practice_attempts_type_check,
  add constraint practice_attempts_type_check
    check (attempt_type in (
      'free_recall','short_answer','calculation','application','multiple_choice',
      'explanation','ordering','error_detection','simulation','recognition'
    )),
  drop constraint if exists practice_attempts_outcome_check,
  add constraint practice_attempts_outcome_check
    check (outcome is null or outcome in ('correct','partial','incorrect')),
  drop constraint if exists practice_attempts_source_check,
  add constraint practice_attempts_source_check
    check (source in ('practice','review','study_session','exam','mistake_repair')),
  drop constraint if exists practice_attempts_hints_used_check,
  add constraint practice_attempts_hints_used_check
    check (hints_used between 0 and 10),
  drop constraint if exists practice_attempts_response_time_check,
  add constraint practice_attempts_response_time_check
    check (response_time_ms is null or response_time_ms between 0 and 86400000),
  drop constraint if exists practice_attempts_evidence_quality_check,
  add constraint practice_attempts_evidence_quality_check
    check (evidence_quality between 0 and 1);

create unique index if not exists practice_attempts_owner_operation_idx
  on public.practice_attempts(owner_id, operation_id)
  where operation_id is not null;

update public.practice_attempts
set
  schema_version = 3,
  outcome = coalesce(
    outcome,
    case result
      when 'independent' then 'correct'
      when 'hinted' then 'partial'
      else 'incorrect'
    end
  ),
  hints_used = greatest(hints_used, case when hint_used then 1 else 0 end),
  evidence_quality = greatest(
    evidence_quality,
    greatest(
      0.05,
      least(
        1.0,
        (
          case result when 'independent' then 0.78 when 'hinted' then 0.43 else 0.12 end
          + least(0.12, greatest(0,difficulty-1) * 0.03)
          + least(0.12, coalesce(delay_days,0) * 0.01)
          - case when hint_used then 0.15 else 0 end
        )::real
      )
    )
  )
where schema_version < 3
   or outcome is null
   or evidence_quality = 0;

alter table public.topics
  add column if not exists mastery_confidence real not null default 0,
  add column if not exists evidence_count integer not null default 0,
  add column if not exists strong_evidence_count integer not null default 0,
  add column if not exists recall_strength real not null default 0,
  add column if not exists application_strength real not null default 0,
  add column if not exists retention_strength real not null default 0,
  add column if not exists forgetting_risk real not null default 1,
  add column if not exists exam_relevance real not null default 0,
  add column if not exists learning_state_updated_at timestamptz;

alter table public.topics
  drop constraint if exists topics_mastery_confidence_check,
  add constraint topics_mastery_confidence_check check (mastery_confidence between 0 and 1),
  drop constraint if exists topics_recall_strength_check,
  add constraint topics_recall_strength_check check (recall_strength between 0 and 1),
  drop constraint if exists topics_application_strength_check,
  add constraint topics_application_strength_check check (application_strength between 0 and 1),
  drop constraint if exists topics_retention_strength_check,
  add constraint topics_retention_strength_check check (retention_strength between 0 and 1),
  drop constraint if exists topics_forgetting_risk_check,
  add constraint topics_forgetting_risk_check check (forgetting_risk between 0 and 1),
  drop constraint if exists topics_exam_relevance_check,
  add constraint topics_exam_relevance_check check (exam_relevance between 0 and 1);

update public.user_preferences
set learning_schema_version = 3
where learning_schema_version <> 3;

-- Seed derived state conservatively from legacy evidence. Missing evidence stays uncertain.
update public.topics
set
  evidence_count = greatest(evidence_count, retrieval_attempts),
  strong_evidence_count = greatest(
    strong_evidence_count,
    basic_successes + exam_successes + delayed_successes
  ),
  mastery_confidence = greatest(
    mastery_confidence,
    least(
      0.92,
      greatest(
        0.0,
        1.0 - coalesce(mastery_uncertainty,1.0)
      )
    )
  ),
  recall_strength = greatest(
    recall_strength,
    least(1.0, (basic_successes + delayed_successes * 1.5) / greatest(1.0, retrieval_attempts::real))
  ),
  application_strength = greatest(
    application_strength,
    least(1.0, exam_successes / greatest(1.0, retrieval_attempts::real))
  ),
  retention_strength = greatest(
    retention_strength,
    least(1.0, delayed_successes / greatest(1.0, retrieval_attempts::real))
  ),
  learning_state_updated_at = coalesce(learning_state_updated_at, now())
where retrieval_attempts > 0
   or basic_successes > 0
   or exam_successes > 0
   or delayed_successes > 0;

drop function if exists public.record_practice_attempt(
  uuid, uuid, date, text, text, text, integer, text, integer, boolean
);

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
  p_hint_used boolean,
  p_hints_used integer default 0,
  p_response_time_ms integer default null,
  p_source text default 'practice',
  p_skills text[] default '{}'::text[],
  p_expected_concepts text[] default '{}'::text[],
  p_question_payload jsonb default '{}'::jsonb,
  p_operation_id uuid default null
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
  v_course_exam date;
  v_delay integer := null;
  v_outcome text;
  v_quality real;
  v_hints integer;
  v_evidence_count integer;
  v_strong_count integer;
  v_recall real;
  v_application real;
  v_retention real;
  v_uncertainty real;
  v_confidence real;
  v_mastery integer := 0;
  v_gap integer := 1;
  v_forgetting real;
  v_exam_relevance real := 0;
  v_days_to_exam integer := null;
begin
  if v_owner is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  if p_operation_id is not null then
    select id into v_attempt_id
    from public.practice_attempts
    where owner_id = v_owner and operation_id = p_operation_id;
    if found then return v_attempt_id; end if;
  end if;

  if p_result not in ('independent','hinted','not_yet') then
    raise exception 'Invalid result' using errcode = '22023';
  end if;
  if p_attempt_type not in (
    'free_recall','short_answer','calculation','application','multiple_choice',
    'explanation','ordering','error_detection','simulation','recognition'
  ) then
    raise exception 'Invalid attempt type' using errcode = '22023';
  end if;
  if p_source not in ('practice','review','study_session','exam','mistake_repair') then
    raise exception 'Invalid source' using errcode = '22023';
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

  select exam_date into v_course_exam
  from public.courses
  where id = p_course_id and owner_id = v_owner;

  if v_topic.last_retrieval_at is not null then
    v_delay := greatest(0, coalesce(p_date,current_date) - v_topic.last_retrieval_at);
  elsif v_topic.last_review is not null then
    v_delay := greatest(0, coalesce(p_date,current_date) - v_topic.last_review);
  end if;

  v_outcome := case p_result
    when 'independent' then 'correct'
    when 'hinted' then 'partial'
    else 'incorrect'
  end;
  v_hints := greatest(coalesce(p_hints_used,0), case when coalesce(p_hint_used,false) then 1 else 0 end);

  v_quality := greatest(
    0.05,
    least(
      1.0,
      (
        case v_outcome when 'correct' then 0.76 when 'partial' then 0.43 else 0.12 end
        + least(0.15, greatest(0,p_difficulty-1) * 0.035)
        + least(0.16, coalesce(v_delay,0) * 0.012)
        - least(0.45, v_hints * 0.15)
        - case
            when v_outcome = 'correct' and p_confidence = 1 then 0.06
            when v_outcome = 'incorrect' and p_confidence = 3 then 0.04
            else 0
          end
      )::real
    )
  );

  insert into public.practice_attempts (
    owner_id, course_id, topic_id, date, attempt_type, prompt, response,
    difficulty, result, confidence, hint_used, delay_days,
    schema_version, outcome, hints_used, response_time_ms, source,
    evidence_quality, skills, expected_concepts, question_payload, operation_id
  ) values (
    v_owner, p_course_id, p_topic_id, coalesce(p_date,current_date),
    p_attempt_type, trim(p_prompt), nullif(trim(coalesce(p_response,'')),''),
    p_difficulty, p_result, p_confidence, v_hints > 0, v_delay,
    3, v_outcome, v_hints, p_response_time_ms, p_source,
    v_quality, coalesce(p_skills,'{}'::text[]),
    coalesce(p_expected_concepts,'{}'::text[]),
    coalesce(p_question_payload,'{}'::jsonb), p_operation_id
  )
  returning id into v_attempt_id;

  select
    count(*)::integer,
    count(*) filter (where evidence_quality >= 0.68)::integer,
    coalesce(avg(evidence_quality) filter (
      where attempt_type in ('free_recall','short_answer','explanation','recognition')
    ),0)::real,
    coalesce(avg(evidence_quality) filter (
      where attempt_type in ('application','calculation','simulation','error_detection')
    ),0)::real,
    coalesce(avg(evidence_quality) filter (where coalesce(delay_days,0) >= 3),0)::real
  into
    v_evidence_count, v_strong_count, v_recall, v_application, v_retention
  from public.practice_attempts
  where owner_id = v_owner and topic_id = p_topic_id;

  v_uncertainty := greatest(
    0.08,
    least(
      1.0,
      1.0 / sqrt(greatest(1,v_evidence_count + v_strong_count))
      + case when v_outcome = 'incorrect' then 0.12 when v_outcome = 'partial' then 0.05 else 0 end
    )
  )::real;
  v_confidence := greatest(0.0, least(1.0, 1.0 - v_uncertainty));

  if v_evidence_count > 0 or v_topic.progress >= 20 then v_mastery := 1; end if;
  if v_evidence_count >= 1 and greatest(v_recall,v_application) >= 0.38 then v_mastery := 2; end if;
  if v_strong_count >= 2 and (v_recall * 0.45 + v_application * 0.30 + v_retention * 0.25) >= 0.52 then v_mastery := 3; end if;
  if v_strong_count >= 3 and v_application >= 0.58 and (v_recall * 0.4 + v_application * 0.35 + v_retention * 0.25) >= 0.64 then v_mastery := 4; end if;
  if v_strong_count >= 5 and v_retention >= 0.65 and v_application >= 0.67 and (v_recall * 0.35 + v_application * 0.35 + v_retention * 0.30) >= 0.74 then v_mastery := 5; end if;

  v_gap := case v_mastery
    when 0 then 1 when 1 then 2 when 2 then 3 when 3 then 6 when 4 then 12 else 24
  end;

  if v_outcome = 'incorrect' then
    v_gap := 1;
  elsif v_outcome = 'partial' then
    v_gap := least(v_gap,2);
  else
    if v_quality >= 0.80 then v_gap := round(v_gap * 1.6)::integer;
    elsif v_quality >= 0.65 then v_gap := round(v_gap * 1.25)::integer;
    end if;
    if coalesce(v_delay,0) >= 7 then v_gap := round(v_gap * 1.35)::integer; end if;
    if v_hints >= 2 then v_gap := least(v_gap,2);
    elsif v_hints = 1 then v_gap := least(v_gap,4);
    end if;
    if p_confidence = 1 then v_gap := least(v_gap,3); end if;
  end if;

  if v_uncertainty >= 0.65 then v_gap := least(v_gap,2);
  elsif v_uncertainty >= 0.45 then v_gap := least(v_gap,4);
  end if;

  if v_topic.importance >= 5 then
    v_gap := least(v_gap, greatest(2,round(v_gap * 0.85)::integer));
  end if;

  if v_course_exam is not null then
    v_days_to_exam := v_course_exam - coalesce(p_date,current_date);
    if v_days_to_exam between 0 and 7 then v_gap := least(v_gap,2);
    elsif v_days_to_exam between 8 and 14 then v_gap := least(v_gap,4);
    end if;
    if v_days_to_exam >= 0 then
      v_exam_relevance := greatest(0.0, least(1.0, 1.0 - least(45,v_days_to_exam)::real / 45.0));
    end if;
  end if;

  v_forgetting := case v_outcome
    when 'incorrect' then 1.0
    when 'partial' then 0.72
    else greatest(0.08, least(0.55, 0.22 + v_uncertainty * 0.30))
  end;

  update public.topics
  set
    retrieval_attempts = v_evidence_count,
    retrieval_failures = (
      select count(*)::integer from public.practice_attempts
      where owner_id = v_owner and topic_id = p_topic_id and outcome = 'incorrect'
    ),
    evidence_count = v_evidence_count,
    strong_evidence_count = v_strong_count,
    mastery_confidence = v_confidence,
    mastery_uncertainty = v_uncertainty,
    recall_strength = v_recall,
    application_strength = v_application,
    retention_strength = v_retention,
    forgetting_risk = v_forgetting,
    exam_relevance = v_exam_relevance,
    verified_level = v_mastery,
    last_review = coalesce(p_date,current_date),
    last_retrieval_at = coalesce(p_date,current_date),
    last_retrieval_result = p_result,
    last_retrieval_confidence = p_confidence,
    last_retrieval_difficulty = p_difficulty,
    next_review = coalesce(p_date,current_date) + greatest(1,least(60,v_gap)),
    learning_state_updated_at = now()
  where id = p_topic_id and owner_id = v_owner;

  if v_mastery <> v_topic.verified_level then
    insert into public.progress_events (
      owner_id, course_id, topic_id, kind, from_value, to_value, detail
    ) values (
      v_owner, p_course_id, p_topic_id, 'mastery',
      v_topic.verified_level, v_mastery,
      v_topic.name || ' · Learning Model v3'
    );
  end if;

  return v_attempt_id;
end;
$$;

revoke all on function public.record_practice_attempt(
  uuid, uuid, date, text, text, text, integer, text, integer, boolean,
  integer, integer, text, text[], text[], jsonb, uuid
) from public;
grant execute on function public.record_practice_attempt(
  uuid, uuid, date, text, text, text, integer, text, integer, boolean,
  integer, integer, text, text[], text[], jsonb, uuid
) to authenticated, service_role;
