-- Learning OS v5 compatibility extension.
-- Runs after 20260930174500_learning_os_v5.sql and deliberately extends its
-- canonical column/table shapes instead of redefining them incompatibly.

alter table public.user_preferences
  add column if not exists pretest_enabled boolean not null default true,
  add column if not exists feedback_policy_enabled boolean not null default true,
  add column if not exists abitti_simulation_enabled boolean not null default true;

update public.user_preferences
set learning_schema_version = greatest(coalesce(learning_schema_version,4),5);

alter table public.question_bank
  add column if not exists transfer_level smallint not null default 0,
  add column if not exists confusion_topic_ids uuid[] not null default '{}'::uuid[],
  add column if not exists pretest_eligible boolean not null default true;

alter table public.question_bank
  drop constraint if exists question_bank_transfer_level_check,
  add constraint question_bank_transfer_level_check check (transfer_level between 0 and 6);

-- Preview Challenge attempts live outside practice_attempts. This is intentional:
-- a pretest must be diagnostic only and can never leak into mastery/review RPC aggregates.
create table if not exists public.pretest_attempts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  question_bank_id uuid references public.question_bank(id) on delete set null,
  prompt text not null,
  response text,
  predicted_confidence smallint,
  outcome text not null default 'unknown',
  created_at timestamptz not null default now(),
  check (predicted_confidence is null or predicted_confidence between 1 and 3),
  check (outcome in ('correct','partial','incorrect','unknown'))
);

create index if not exists pretest_attempts_owner_topic_idx
  on public.pretest_attempts(owner_id,topic_id,created_at desc);

alter table public.study_friction_events
  drop constraint if exists study_friction_events_reason_check,
  add constraint study_friction_events_reason_check
    check (reason in (
      'started','no_time','forgot','too_tired','too_hard','unclear_start','plans_changed','other'
    ));


create table if not exists public.retention_targets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  target_retention real not null,
  estimated_retention real not null,
  recommended_minutes integer not null default 0,
  minimum_minutes integer not null default 0,
  marginal_value real not null default 0,
  reason text,
  evidence_confidence text not null default 'very_low',
  calculated_for date not null default current_date,
  created_at timestamptz not null default now(),
  unique(owner_id,topic_id,calculated_for),
  check (target_retention between 0 and 1),
  check (estimated_retention between 0 and 1),
  check (recommended_minutes >= 0),
  check (minimum_minutes >= 0),
  check (marginal_value >= 0),
  check (evidence_confidence in ('very_low','low','medium','high'))
);

create table if not exists public.stop_rule_events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  session_date date not null default current_date,
  stop_recommended boolean not null,
  reason text not null,
  marginal_gain_per_minute real not null default 0,
  next_useful_review date,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists stop_rule_events_owner_topic_idx
  on public.stop_rule_events(owner_id,topic_id,session_date desc);

create table if not exists public.reminder_adaptation (
  owner_id uuid primary key default auth.uid(),
  recommended_level text not null default 'normal',
  independent_start_rate real,
  sample_size integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  check (recommended_level in ('none','light','normal')),
  check (independent_start_rate is null or independent_start_rate between 0 and 1),
  check (sample_size >= 0)
);

create table if not exists public.learning_policy_snapshots (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  snapshot_date date not null default current_date,
  primary_action jsonb,
  alternatives jsonb not null default '[]'::jsonb,
  retention_budget jsonb not null default '{}'::jsonb,
  recommendation_confidence text,
  policy_version integer not null default 5,
  created_at timestamptz not null default now(),
  unique(owner_id,snapshot_date),
  check (policy_version >= 5),
  check (recommendation_confidence is null or recommendation_confidence in ('very_low','low','medium','high'))
);

create table if not exists public.subject_task_parameters (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  subject text not null,
  attempt_type text not null,
  observations integer not null default 0,
  success_rate real not null default 0,
  mean_delay_days real not null default 0,
  preferred_spacing_days integer not null default 2,
  confidence text not null default 'very_low',
  active boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(owner_id,subject,attempt_type),
  check (observations >= 0),
  check (success_rate between 0 and 1),
  check (mean_delay_days >= 0),
  check (preferred_spacing_days between 1 and 60),
  check (confidence in ('very_low','low','medium','high'))
);

-- Expand the canonical 17:45 exam_simulations table for high-fidelity
-- task selection and answer persistence without changing its existing mode enum.
alter table public.exam_simulations
  add column if not exists exam_id uuid references public.exams(id) on delete set null,
  add column if not exists answers jsonb not null default '{}'::jsonb,
  add column if not exists metadata jsonb not null default '{}'::jsonb,
  add column if not exists task_selection_minutes integer,
  add column if not exists feedback_released boolean not null default false,
  add column if not exists no_hints boolean not null default true;

alter table public.exam_simulations
  drop constraint if exists exam_simulations_task_selection_minutes_check,
  add constraint exam_simulations_task_selection_minutes_check
    check (task_selection_minutes is null or task_selection_minutes >= 0);

-- Existing 17:45 calibration table is canonical. Add one observation per
-- practice attempt and derive it from delayed confidence data.
create unique index if not exists calibration_observations_owner_attempt_idx
  on public.calibration_observations(owner_id,attempt_id)
  where attempt_id is not null;

create or replace function public.learning_os_v5_capture_calibration()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_outcome text;
  v_delay_hours integer;
  v_prediction integer;
begin
  if coalesce(new.is_pretest,false)
     or nullif(new.question_payload->>'preRetrievalConfidence','') is null then
    return new;
  end if;

  begin
    v_prediction := greatest(
      1,
      least(3,(new.question_payload->>'preRetrievalConfidence')::integer)
    );
  exception when invalid_text_representation then
    return new;
  end;

  v_outcome := coalesce(
    new.outcome,
    case new.result when 'independent' then 'correct' when 'hinted' then 'partial' else 'incorrect' end
  );
  v_delay_hours := greatest(
    0,
    coalesce(new.confidence_delay_hours, coalesce(new.delay_days,0) * 24)
  );

  insert into public.calibration_observations(
    owner_id,course_id,topic_id,attempt_id,predicted_confidence,
    actual_outcome,delay_hours,observed_at
  ) values (
    new.owner_id,new.course_id,new.topic_id,new.id,v_prediction,
    v_outcome,v_delay_hours,now()
  )
  on conflict(owner_id,attempt_id) where attempt_id is not null do update set
    predicted_confidence=excluded.predicted_confidence,
    actual_outcome=excluded.actual_outcome,
    delay_hours=excluded.delay_hours,
    observed_at=excluded.observed_at;
  return new;
end;
$$;

drop trigger if exists learning_os_v5_capture_calibration on public.practice_attempts;
create trigger learning_os_v5_capture_calibration
after insert or update of confidence,outcome,result,confidence_delay_hours,delay_days
on public.practice_attempts
for each row execute function public.learning_os_v5_capture_calibration();

-- Normalize a string transfer label from question_payload into the canonical
-- numeric transfer_level column used by the 17:45 migration.
create or replace function public.learning_os_v5_transfer_metadata()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_label text;
begin
  v_label := nullif(new.question_payload->>'transferLevel','');
  if v_label is not null then
    new.transfer_level := case v_label
      when 'recall' then 0
      when 'same_context' then 1
      when 'varied_context' then 2
      when 'different_representation' then 3
      when 'unfamiliar_scenario' then 4
      when 'mixed_topic' then 5
      when 'exam_transfer' then 6
      when '0' then 0
      when '1' then 1
      when '2' then 2
      when '3' then 3
      when '4' then 4
      when '5' then 5
      when '6' then 6
      else new.transfer_level
    end;
  end if;
  return new;
end;
$$;

drop trigger if exists learning_os_v5_transfer_metadata on public.practice_attempts;
create trigger learning_os_v5_transfer_metadata
before insert or update of question_payload
on public.practice_attempts
for each row execute function public.learning_os_v5_transfer_metadata();

create or replace function public.learning_os_v5_capture_pretest_event()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.learning_events(
    owner_id,event_type,course_id,topic_id,event_date,payload
  ) values (
    new.owner_id,'PRETEST_ATTEMPT_COMPLETED',new.course_id,new.topic_id,current_date,
    jsonb_build_object(
      'pretestId',new.id,
      'questionBankId',new.question_bank_id,
      'outcome',new.outcome,
      'masteryNeutral',true
    )
  );
  return new;
end;
$$;

drop trigger if exists learning_os_v5_capture_pretest_event on public.pretest_attempts;
create trigger learning_os_v5_capture_pretest_event
after insert on public.pretest_attempts
for each row execute function public.learning_os_v5_capture_pretest_event();

do $$
declare
  t text;
begin
  foreach t in array array[
    'pretest_attempts','retention_targets','stop_rule_events',
    'reminder_adaptation','learning_policy_snapshots','subject_task_parameters'
  ]
  loop
    execute format('alter table public.%I enable row level security',t);
    execute format('drop policy if exists %I on public.%I','owner_all_'||t,t);
    execute format(
      'create policy %I on public.%I for all to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id)',
      'owner_all_'||t,t
    );
    execute format('grant select,insert,update,delete on public.%I to authenticated',t);
  end loop;
end
$$;

grant execute on function public.learning_os_v5_capture_calibration() to authenticated,service_role;
grant execute on function public.learning_os_v5_transfer_metadata() to authenticated,service_role;
grant execute on function public.learning_os_v5_capture_pretest_event() to authenticated,service_role;
