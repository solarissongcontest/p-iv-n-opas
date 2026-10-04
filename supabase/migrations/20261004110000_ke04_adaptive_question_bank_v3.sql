-- KE04 Adaptive Question Bank V3.
-- Adds curated seed metadata, matching questions, question-level history and
-- an adaptive-attempt wrapper without replacing the proven Learning Model v3 RPC.

alter table public.question_bank
  add column if not exists content_id text,
  add column if not exists prerequisites text[] not null default '{}'::text[],
  add column if not exists common_errors text[] not null default '{}'::text[],
  add column if not exists scoring_guide text,
  add column if not exists exam_eligible boolean not null default true,
  add column if not exists reserve_for_exam boolean not null default false,
  add column if not exists validated boolean not null default false,
  add column if not exists matching_pairs jsonb not null default '[]'::jsonb,
  add column if not exists seed_version text;

alter table public.question_bank
  drop constraint if exists question_bank_question_type_check,
  add constraint question_bank_question_type_check
    check (question_type in (
      'free_recall','short_answer','calculation','application','multiple_choice',
      'matching','explanation','ordering','error_detection','simulation','recognition'
    )),
  drop constraint if exists question_bank_answer_mode_check,
  add constraint question_bank_answer_mode_check
    check (answer_mode in ('text','formula','diagram','graph','mixed','matching')),
  drop constraint if exists question_bank_matching_pairs_check,
  add constraint question_bank_matching_pairs_check
    check (jsonb_typeof(matching_pairs) = 'array');

create unique index if not exists question_bank_owner_source_ref_uidx
  on public.question_bank(owner_id, source_ref);
create index if not exists question_bank_ke04_seed_idx
  on public.question_bank(owner_id, module_code, seed_version, status);
create index if not exists question_bank_exam_pool_idx
  on public.question_bank(owner_id, course_id, reserve_for_exam, exam_eligible, difficulty);

alter table public.practice_attempts
  add column if not exists question_bank_id uuid references public.question_bank(id) on delete set null;

alter table public.practice_attempts
  drop constraint if exists practice_attempts_type_check,
  add constraint practice_attempts_type_check
    check (attempt_type in (
      'free_recall','short_answer','calculation','application','multiple_choice',
      'matching','explanation','ordering','error_detection','simulation','recognition'
    ));

create index if not exists practice_attempts_question_bank_idx
  on public.practice_attempts(owner_id, question_bank_id, created_at desc);

create table if not exists public.question_user_state (
  owner_id uuid not null default auth.uid(),
  question_id uuid not null references public.question_bank(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete cascade,
  times_seen integer not null default 0,
  times_attempted integer not null default 0,
  times_correct integer not null default 0,
  times_partial integer not null default 0,
  last_seen timestamptz,
  last_attempted timestamptz,
  last_result text,
  best_result text,
  last_hint_count integer not null default 0,
  mastery_evidence real not null default 0,
  next_review date,
  used_in_exam boolean not null default false,
  last_exam_at timestamptz,
  last_response_time_ms integer,
  updated_at timestamptz not null default now(),
  primary key (owner_id, question_id),
  check (times_seen >= 0 and times_attempted >= 0 and times_correct >= 0 and times_partial >= 0),
  check (last_hint_count >= 0),
  check (mastery_evidence between 0 and 1),
  check (last_result is null or last_result in ('independent','hinted','not_yet')),
  check (best_result is null or best_result in ('independent','hinted','not_yet'))
);

create index if not exists question_user_state_course_topic_idx
  on public.question_user_state(owner_id, course_id, topic_id, updated_at desc);
create index if not exists question_user_state_review_idx
  on public.question_user_state(owner_id, next_review, mastery_evidence);

alter table public.question_user_state enable row level security;
drop policy if exists owner_all_question_user_state on public.question_user_state;
create policy owner_all_question_user_state
  on public.question_user_state
  for all
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

grant select,insert,update,delete on public.question_user_state to authenticated;
grant select,insert,update,delete on public.question_user_state to service_role;

create or replace function public.mark_question_seen(p_question_id uuid)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_question public.question_bank%rowtype;
begin
  if v_owner is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  select * into v_question
  from public.question_bank
  where id = p_question_id and owner_id = v_owner;

  if not found then
    raise exception 'Question not found' using errcode = 'P0002';
  end if;

  insert into public.question_user_state(
    owner_id,question_id,course_id,topic_id,times_seen,last_seen,updated_at
  ) values (
    v_owner,v_question.id,v_question.course_id,v_question.topic_id,1,now(),now()
  )
  on conflict (owner_id,question_id) do update set
    times_seen = public.question_user_state.times_seen + 1,
    last_seen = now(),
    updated_at = now();
end;
$$;

revoke all on function public.mark_question_seen(uuid) from public, anon;
grant execute on function public.mark_question_seen(uuid) to authenticated, service_role;

create or replace function public.record_adaptive_practice_attempt(
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
  p_operation_id uuid default null,
  p_question_bank_id uuid default null
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_owner uuid := auth.uid();
  v_attempt_id uuid;
  v_learning_type text;
  v_evidence real;
  v_next_review date;
  v_best text;
begin
  if v_owner is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;

  if p_attempt_type not in (
    'free_recall','short_answer','calculation','application','multiple_choice',
    'matching','explanation','ordering','error_detection','simulation','recognition'
  ) then
    raise exception 'Invalid attempt type' using errcode = '22023';
  end if;

  if p_question_bank_id is not null then
    perform 1
    from public.question_bank
    where id = p_question_bank_id
      and owner_id = v_owner
      and course_id = p_course_id
      and (topic_id is null or topic_id = p_topic_id);
    if not found then
      raise exception 'Question does not belong to this course/topic' using errcode = '22023';
    end if;
  end if;

  -- Matching is its own presentation/task type, while the existing mastery
  -- model can safely treat it as recognition evidence.
  v_learning_type := case when p_attempt_type = 'matching' then 'recognition' else p_attempt_type end;

  select public.record_practice_attempt(
    p_course_id,p_topic_id,p_date,v_learning_type,p_prompt,p_response,
    p_difficulty,p_result,p_confidence,p_hint_used,p_hints_used,
    p_response_time_ms,p_source,p_skills,p_expected_concepts,
    p_question_payload,p_operation_id
  ) into v_attempt_id;

  if p_attempt_type = 'matching' then
    update public.practice_attempts
    set attempt_type = 'matching'
    where id = v_attempt_id and owner_id = v_owner;
  end if;

  if p_question_bank_id is not null then
    update public.practice_attempts
    set question_bank_id = p_question_bank_id
    where id = v_attempt_id and owner_id = v_owner;

    select evidence_quality into v_evidence
    from public.practice_attempts
    where id = v_attempt_id and owner_id = v_owner;

    select next_review into v_next_review
    from public.topics
    where id = p_topic_id and owner_id = v_owner;

    v_best := case p_result
      when 'independent' then 'independent'
      when 'hinted' then 'hinted'
      else 'not_yet'
    end;

    insert into public.question_user_state(
      owner_id,question_id,course_id,topic_id,
      times_seen,times_attempted,times_correct,times_partial,
      last_seen,last_attempted,last_result,best_result,last_hint_count,
      mastery_evidence,next_review,used_in_exam,last_exam_at,
      last_response_time_ms,updated_at
    ) values (
      v_owner,p_question_bank_id,p_course_id,p_topic_id,
      1,1,
      case when p_result='independent' then 1 else 0 end,
      case when p_result='hinted' then 1 else 0 end,
      now(),now(),p_result,v_best,greatest(0,coalesce(p_hints_used,0)),
      greatest(0,least(1,coalesce(v_evidence,0))),
      v_next_review,
      p_source='exam',
      case when p_source='exam' then now() else null end,
      p_response_time_ms,now()
    )
    on conflict (owner_id,question_id) do update set
      times_attempted = public.question_user_state.times_attempted + 1,
      times_correct = public.question_user_state.times_correct + case when p_result='independent' then 1 else 0 end,
      times_partial = public.question_user_state.times_partial + case when p_result='hinted' then 1 else 0 end,
      last_seen = coalesce(public.question_user_state.last_seen,now()),
      last_attempted = now(),
      last_result = p_result,
      best_result = case
        when public.question_user_state.best_result='independent' or p_result='independent' then 'independent'
        when public.question_user_state.best_result='hinted' or p_result='hinted' then 'hinted'
        else 'not_yet'
      end,
      last_hint_count = greatest(0,coalesce(p_hints_used,0)),
      mastery_evidence = greatest(
        public.question_user_state.mastery_evidence * 0.85,
        greatest(0,least(1,coalesce(v_evidence,0)))
      ),
      next_review = v_next_review,
      used_in_exam = public.question_user_state.used_in_exam or p_source='exam',
      last_exam_at = case when p_source='exam' then now() else public.question_user_state.last_exam_at end,
      last_response_time_ms = p_response_time_ms,
      updated_at = now();
  end if;

  return v_attempt_id;
end;
$$;

revoke all on function public.record_adaptive_practice_attempt(
  uuid,uuid,date,text,text,text,integer,text,integer,boolean,
  integer,integer,text,text[],text[],jsonb,uuid,uuid
) from public, anon;
grant execute on function public.record_adaptive_practice_attempt(
  uuid,uuid,date,text,text,text,integer,text,integer,boolean,
  integer,integer,text,text[],text[],jsonb,uuid,uuid
) to authenticated, service_role;
