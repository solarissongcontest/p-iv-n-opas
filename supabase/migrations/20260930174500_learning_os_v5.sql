-- Learning OS v5
-- Memory optimization, adaptive instruction, discrimination practice,
-- metacognitive calibration, friction-aware planning and YO simulation.
-- Additive migration: v4 data remains valid.

alter table public.user_preferences
  add column if not exists retention_budget_enabled boolean not null default true,
  add column if not exists reminder_taper_enabled boolean not null default true,
  add column if not exists friction_learning_enabled boolean not null default true;

update public.user_preferences
set learning_schema_version = greatest(coalesce(learning_schema_version, 4), 5);

alter table public.topics
  add column if not exists retention_target real not null default 0.8,
  add column if not exists discrimination_strength real not null default 0,
  add column if not exists transfer_level smallint not null default 0;

alter table public.topics
  drop constraint if exists topics_retention_target_check,
  add constraint topics_retention_target_check check (retention_target between 0.5 and 0.99),
  drop constraint if exists topics_discrimination_strength_check,
  add constraint topics_discrimination_strength_check check (discrimination_strength between 0 and 1),
  drop constraint if exists topics_transfer_level_check,
  add constraint topics_transfer_level_check check (transfer_level between 0 and 6);

alter table public.practice_attempts
  add column if not exists is_pretest boolean not null default false,
  add column if not exists transfer_level smallint,
  add column if not exists discrimination_topic_ids uuid[] not null default '{}'::uuid[],
  add column if not exists feedback_timing text,
  add column if not exists confidence_delay_hours integer;

alter table public.practice_attempts
  drop constraint if exists practice_attempts_transfer_level_check,
  add constraint practice_attempts_transfer_level_check
    check (transfer_level is null or transfer_level between 0 and 6),
  drop constraint if exists practice_attempts_feedback_timing_check,
  add constraint practice_attempts_feedback_timing_check
    check (feedback_timing is null or feedback_timing in ('immediate','after_retry','after_item','after_block')),
  drop constraint if exists practice_attempts_confidence_delay_hours_check,
  add constraint practice_attempts_confidence_delay_hours_check
    check (confidence_delay_hours is null or confidence_delay_hours between 0 and 8760);

alter table public.question_bank
  add column if not exists stimulus_package jsonb not null default '{}'::jsonb,
  add column if not exists answer_mode text not null default 'text',
  add column if not exists points smallint;

alter table public.question_bank
  drop constraint if exists question_bank_answer_mode_check,
  add constraint question_bank_answer_mode_check
    check (answer_mode in ('text','formula','diagram','graph','mixed')),
  drop constraint if exists question_bank_points_check,
  add constraint question_bank_points_check
    check (points is null or points between 1 and 30);

alter table public.mistakes
  add column if not exists first_divergence text,
  add column if not exists correct_principle text,
  add column if not exists repair_response text,
  add column if not exists delayed_verification_due date;

create table if not exists public.learning_policy_states (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid references public.courses(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  desired_retention real not null default 0.8,
  current_retention real not null default 0,
  recommended_minutes integer not null default 0,
  stop_today boolean not null default false,
  next_useful_date date,
  recommendation_confidence real not null default 0,
  recommendation_reason text,
  model_version integer not null default 5,
  updated_at timestamptz not null default now(),
  unique(owner_id, topic_id),
  check (desired_retention between 0.5 and 0.99),
  check (current_retention between 0 and 1),
  check (recommended_minutes between 0 and 720),
  check (recommendation_confidence between 0 and 1)
);

create table if not exists public.calibration_observations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid references public.courses(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  attempt_id uuid references public.practice_attempts(id) on delete set null,
  predicted_confidence smallint not null,
  actual_outcome text not null,
  delay_hours integer not null default 0,
  observed_at timestamptz not null default now(),
  check (predicted_confidence between 1 and 3),
  check (actual_outcome in ('correct','partial','incorrect')),
  check (delay_hours between 0 and 8760)
);

create index if not exists calibration_observations_owner_topic_idx
  on public.calibration_observations(owner_id, topic_id, observed_at desc);

create table if not exists public.study_friction_events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  event_date date not null default current_date,
  plan_item_id uuid references public.plan_items(id) on delete set null,
  course_id uuid references public.courses(id) on delete cascade,
  reason text not null,
  note text,
  self_started boolean,
  reminder_used boolean,
  created_at timestamptz not null default now(),
  check (reason in ('no_time','forgot','too_tired','too_hard','unclear_start','plans_changed','started','other'))
);

create index if not exists study_friction_events_owner_date_idx
  on public.study_friction_events(owner_id, event_date desc);

create table if not exists public.implementation_intentions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  trigger_type text not null,
  trigger_value text not null,
  action_type text not null,
  action_value text not null,
  enabled boolean not null default true,
  suggested boolean not null default false,
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (trigger_type in ('late_home','low_energy','missed_days','busy_day','custom')),
  check (action_type in ('lighten','move','replace_with_retrieval','protect_rest','custom'))
);

create table if not exists public.exam_simulations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  mode text not null default 'practice',
  task_ids uuid[] not null default '{}'::uuid[],
  selected_task_ids uuid[] not null default '{}'::uuid[],
  completed_task_ids uuid[] not null default '{}'::uuid[],
  scores jsonb not null default '{}'::jsonb,
  answers jsonb not null default '{}'::jsonb,
  duration_minutes integer not null default 90,
  started_at timestamptz,
  completed_at timestamptz,
  task_selection_note text,
  created_at timestamptz not null default now(),
  check (mode in ('practice','full')),
  check (duration_minutes between 1 and 480)
);

create index if not exists exam_simulations_owner_course_idx
  on public.exam_simulations(owner_id, course_id, created_at desc);

-- Capture v5 metadata from the question payload while keeping older clients valid.
create or replace function public.learning_os_v5_prepare_attempt()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_transfer integer;
  v_ids uuid[];
begin
  new.is_pretest := coalesce(
    (new.question_payload->>'pretest')::boolean,
    new.is_pretest,
    false
  );

  v_transfer := nullif(new.question_payload->>'transferLevel','')::integer;
  if v_transfer is not null then
    new.transfer_level := greatest(0, least(6, v_transfer));
  end if;

  if jsonb_typeof(new.question_payload->'discriminationTopicIds') = 'array' then
    select coalesce(array_agg(value::uuid), '{}'::uuid[])
    into v_ids
    from jsonb_array_elements_text(new.question_payload->'discriminationTopicIds');
    new.discrimination_topic_ids := v_ids;
  end if;

  if nullif(new.question_payload->>'feedbackTiming','') is not null then
    new.feedback_timing := new.question_payload->>'feedbackTiming';
  end if;

  if nullif(new.question_payload->>'confidenceDelayHours','') is not null then
    new.confidence_delay_hours := greatest(
      0,
      least(8760, (new.question_payload->>'confidenceDelayHours')::integer)
    );
  end if;

  return new;
exception
  when invalid_text_representation then
    return new;
end;
$$;

drop trigger if exists learning_os_v5_prepare_attempt on public.practice_attempts;
create trigger learning_os_v5_prepare_attempt
before insert or update of question_payload
on public.practice_attempts
for each row execute function public.learning_os_v5_prepare_attempt();

-- Pretests are diagnostic previews, not negative mastery evidence.
create or replace function public.learning_os_v5_pretest_evidence_guard()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.is_pretest then
    new.evidence_quality := 0;
    new.dimension_weights := '{}'::jsonb;
    new.independent_verification_required := false;
  end if;
  return new;
end;
$$;

drop trigger if exists learning_os_v5_pretest_evidence_guard on public.practice_attempts;
create trigger learning_os_v5_pretest_evidence_guard
before insert or update of is_pretest
on public.practice_attempts
for each row execute function public.learning_os_v5_pretest_evidence_guard();

-- Keep derived v5 topic fields conservative and auditable.
create or replace function public.learning_os_v5_capture_attempt()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_outcome text;
  v_strength real;
begin
  v_outcome := coalesce(
    new.outcome,
    case new.result when 'independent' then 'correct' when 'hinted' then 'partial' else 'incorrect' end
  );

  if new.is_pretest then
    insert into public.learning_events(
      owner_id,event_type,course_id,topic_id,attempt_id,event_date,payload
    ) values (
      new.owner_id,'PRETEST_COMPLETED',new.course_id,new.topic_id,new.id,new.date,
      jsonb_build_object('outcome',v_outcome,'masteryNeutral',true)
    );
    return new;
  end if;

  if new.transfer_level is not null and v_outcome = 'correct'
     and coalesce(new.assisted,false) = false then
    update public.topics
    set transfer_level = greatest(transfer_level, new.transfer_level)
    where id = new.topic_id and owner_id = new.owner_id;
  end if;

  if cardinality(new.discrimination_topic_ids) >= 2 then
    v_strength := case v_outcome when 'correct' then 1 when 'partial' then 0.5 else 0 end;
    update public.topics
    set discrimination_strength =
      greatest(0, least(1, discrimination_strength * 0.75 + v_strength * 0.25))
    where id = new.topic_id and owner_id = new.owner_id;

    insert into public.learning_events(
      owner_id,event_type,course_id,topic_id,attempt_id,event_date,payload
    ) values (
      new.owner_id,'DISCRIMINATION_ATTEMPT_COMPLETED',new.course_id,new.topic_id,new.id,new.date,
      jsonb_build_object(
        'topicIds',new.discrimination_topic_ids,
        'outcome',v_outcome
      )
    );
  end if;

  return new;
end;
$$;

drop trigger if exists learning_os_v5_capture_attempt on public.practice_attempts;
create trigger learning_os_v5_capture_attempt
after insert on public.practice_attempts
for each row execute function public.learning_os_v5_capture_attempt();

do $$
declare
  t text;
begin
  foreach t in array array[
    'learning_policy_states',
    'calibration_observations',
    'study_friction_events',
    'implementation_intentions',
    'exam_simulations'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists %I on public.%I', 'owner_select_'||t, t);
    execute format(
      'create policy %I on public.%I for select to authenticated using ((select auth.uid()) = owner_id)',
      'owner_select_'||t, t
    );

    execute format('drop policy if exists %I on public.%I', 'owner_insert_'||t, t);
    execute format(
      'create policy %I on public.%I for insert to authenticated with check ((select auth.uid()) = owner_id)',
      'owner_insert_'||t, t
    );

    execute format('drop policy if exists %I on public.%I', 'owner_update_'||t, t);
    execute format(
      'create policy %I on public.%I for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id)',
      'owner_update_'||t, t
    );

    execute format('drop policy if exists %I on public.%I', 'owner_delete_'||t, t);
    execute format(
      'create policy %I on public.%I for delete to authenticated using ((select auth.uid()) = owner_id)',
      'owner_delete_'||t, t
    );
  end loop;
end
$$;

-- Explicit grants are required for the Data API as Supabase moves away from
-- automatic exposure of newly created public tables.
grant select,insert,update,delete on public.learning_policy_states to authenticated;
grant select,insert,update,delete on public.calibration_observations to authenticated;
grant select,insert,update,delete on public.study_friction_events to authenticated;
grant select,insert,update,delete on public.implementation_intentions to authenticated;
grant select,insert,update,delete on public.exam_simulations to authenticated;

grant select,insert,update,delete on public.learning_policy_states to service_role;
grant select,insert,update,delete on public.calibration_observations to service_role;
grant select,insert,update,delete on public.study_friction_events to service_role;
grant select,insert,update,delete on public.implementation_intentions to service_role;
grant select,insert,update,delete on public.exam_simulations to service_role;

grant execute on function public.learning_os_v5_prepare_attempt() to authenticated,service_role;
grant execute on function public.learning_os_v5_pretest_evidence_guard() to authenticated,service_role;
grant execute on function public.learning_os_v5_capture_attempt() to authenticated,service_role;


-- v5 auxiliary state used by Preview Challenge, notification independence
-- and cautious subject x task personalization.
alter table public.user_preferences
  add column if not exists pretest_enabled boolean not null default true,
  add column if not exists feedback_policy_enabled boolean not null default true,
  add column if not exists abitti_simulation_enabled boolean not null default true;

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
  on public.pretest_attempts(owner_id, topic_id, created_at desc);

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

create table if not exists public.subject_task_parameters (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  subject text not null,
  attempt_type text not null,
  observations integer not null default 0,
  success_rate real not null default 0,
  mean_delay_days real not null default 0,
  preferred_spacing_days real not null default 4,
  confidence text not null default 'very_low',
  active boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(owner_id, subject, attempt_type),
  check (observations >= 0),
  check (success_rate between 0 and 1),
  check (mean_delay_days >= 0),
  check (preferred_spacing_days between 1 and 60),
  check (confidence in ('very_low','low','medium','high'))
);

do $$
declare
  t text;
begin
  foreach t in array array[
    'pretest_attempts',
    'reminder_adaptation',
    'subject_task_parameters'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists %I on public.%I', 'owner_select_'||t, t);
    execute format(
      'create policy %I on public.%I for select to authenticated using ((select auth.uid()) = owner_id)',
      'owner_select_'||t, t
    );

    execute format('drop policy if exists %I on public.%I', 'owner_insert_'||t, t);
    execute format(
      'create policy %I on public.%I for insert to authenticated with check ((select auth.uid()) = owner_id)',
      'owner_insert_'||t, t
    );

    execute format('drop policy if exists %I on public.%I', 'owner_update_'||t, t);
    execute format(
      'create policy %I on public.%I for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id)',
      'owner_update_'||t, t
    );

    execute format('drop policy if exists %I on public.%I', 'owner_delete_'||t, t);
    execute format(
      'create policy %I on public.%I for delete to authenticated using ((select auth.uid()) = owner_id)',
      'owner_delete_'||t, t
    );
  end loop;
end
$$;

grant select,insert,update,delete on public.pretest_attempts to authenticated;
grant select,insert,update,delete on public.reminder_adaptation to authenticated;
grant select,insert,update,delete on public.subject_task_parameters to authenticated;
grant select,insert,update,delete on public.pretest_attempts to service_role;
grant select,insert,update,delete on public.reminder_adaptation to service_role;
grant select,insert,update,delete on public.subject_task_parameters to service_role;
