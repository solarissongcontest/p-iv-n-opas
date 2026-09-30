-- Learning OS v5: retention budgeting, stop rules, pretesting, discrimination,
-- delayed calibration, friction-aware planning, reminder tapering and YO/Abitti simulations.
-- Additive and idempotent. Existing v4 evidence remains authoritative.

alter table public.user_preferences
  add column if not exists retention_budget_mode text not null default 'adaptive',
  add column if not exists reminder_tapering_enabled boolean not null default true,
  add column if not exists abitti_simulation_enabled boolean not null default true,
  add column if not exists learning_schema_version integer not null default 5;

alter table public.user_preferences
  drop constraint if exists user_preferences_retention_budget_mode_check,
  add constraint user_preferences_retention_budget_mode_check
    check (retention_budget_mode in ('adaptive','manual','off'));

update public.user_preferences
set learning_schema_version = greatest(coalesce(learning_schema_version,4),5);

alter table public.practice_attempts
  add column if not exists transfer_level integer not null default 0,
  add column if not exists feedback_policy text,
  add column if not exists prediction_confidence integer,
  add column if not exists discrimination_target_ids text[] not null default '{}'::text[];

alter table public.practice_attempts
  drop constraint if exists practice_attempts_transfer_level_check,
  add constraint practice_attempts_transfer_level_check check (transfer_level between 0 and 6),
  drop constraint if exists practice_attempts_prediction_confidence_check,
  add constraint practice_attempts_prediction_confidence_check
    check (prediction_confidence is null or prediction_confidence between 1 and 3),
  drop constraint if exists practice_attempts_feedback_policy_check,
  add constraint practice_attempts_feedback_policy_check
    check (feedback_policy is null or feedback_policy in (
      'immediate','after_retry','after_item','after_block'
    ));

alter table public.question_bank
  add column if not exists stimulus_package jsonb not null default '{}'::jsonb,
  add column if not exists answer_mode text not null default 'text',
  add column if not exists transfer_level integer not null default 0,
  add column if not exists confusion_topic_ids text[] not null default '{}'::text[],
  add column if not exists pretest_eligible boolean not null default true;

alter table public.question_bank
  drop constraint if exists question_bank_answer_mode_check,
  add constraint question_bank_answer_mode_check
    check (answer_mode in ('text','formula','diagram','graph','mixed')),
  drop constraint if exists question_bank_transfer_level_check,
  add constraint question_bank_transfer_level_check check (transfer_level between 0 and 6);

create table if not exists public.learning_policy_states (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid references public.courses(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete cascade,
  desired_retention real not null default 0.8,
  evidence_confidence real not null default 0,
  discrimination_strength real not null default 0,
  transfer_level integer not null default 0,
  stop_until date,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique(owner_id,topic_id),
  check (desired_retention between 0.5 and 0.99),
  check (evidence_confidence between 0 and 1),
  check (discrimination_strength between 0 and 1),
  check (transfer_level between 0 and 6)
);

create table if not exists public.pretest_attempts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  question_bank_id uuid references public.question_bank(id) on delete set null,
  prompt text not null,
  response text,
  predicted_confidence integer,
  outcome text not null,
  created_at timestamptz not null default now(),
  check (predicted_confidence is null or predicted_confidence between 1 and 3),
  check (outcome in ('correct','partial','incorrect','unknown'))
);

create table if not exists public.calibration_observations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  attempt_id uuid references public.practice_attempts(id) on delete set null,
  predicted_confidence integer not null,
  actual_outcome text not null,
  delay_hours integer not null default 0,
  observed_at timestamptz not null default now(),
  check (predicted_confidence between 1 and 3),
  check (actual_outcome in ('correct','partial','incorrect')),
  check (delay_hours >= 0)
);

create table if not exists public.study_friction_events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  event_date date not null default current_date,
  plan_item_id uuid references public.plan_items(id) on delete set null,
  course_id uuid references public.courses(id) on delete set null,
  reason text not null,
  note text,
  self_started boolean,
  reminder_used boolean,
  created_at timestamptz not null default now(),
  check (reason in (
    'no_time','forgot','too_tired','too_hard','unclear_start','plans_changed','other'
  ))
);

create table if not exists public.implementation_intentions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  trigger_type text not null,
  trigger_value text not null,
  action_type text not null,
  action_value text not null,
  enabled boolean not null default true,
  source text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (trigger_type in ('late_home','low_energy','missed_days','busy_day','custom')),
  check (action_type in ('lighten','move','replace_with_retrieval','protect_rest','custom')),
  check (source in ('user','suggested'))
);

create table if not exists public.reminder_adaptation (
  owner_id uuid primary key default auth.uid(),
  mode text not null default 'normal',
  self_start_rate real,
  sample_size integer not null default 0,
  last_changed_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  check (mode in ('normal','taper','minimal','restore')),
  check (self_start_rate is null or self_start_rate between 0 and 1),
  check (sample_size >= 0)
);

create table if not exists public.contrastive_repairs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  mistake_id uuid not null references public.mistakes(id) on delete cascade,
  divergence_note text,
  explanation text,
  repaired_solution text,
  followup_attempt_id uuid references public.practice_attempts(id) on delete set null,
  status text not null default 'locate_divergence',
  updated_at timestamptz not null default now(),
  unique(owner_id,mistake_id),
  check (status in (
    'locate_divergence','explain','repair','parallel_problem','delayed_verification','mastered'
  ))
);

create table if not exists public.exam_simulations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  exam_id uuid references public.exams(id) on delete set null,
  mode text not null default 'full',
  selected_task_ids text[] not null default '{}'::text[],
  completed_task_ids text[] not null default '{}'::text[],
  scores jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  duration_minutes integer,
  metadata jsonb not null default '{}'::jsonb,
  check (mode in ('practice','full')),
  check (duration_minutes is null or duration_minutes >= 0)
);

create table if not exists public.subject_task_parameters (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  subject text not null,
  attempt_type text not null,
  observations integer not null default 0,
  success_rate real not null default 0,
  delayed_success_rate real,
  spacing_multiplier real not null default 1,
  difficulty_bias real not null default 0,
  reliability real not null default 0,
  updated_at timestamptz not null default now(),
  unique(owner_id,subject,attempt_type),
  check (observations >= 0),
  check (success_rate between 0 and 1),
  check (delayed_success_rate is null or delayed_success_rate between 0 and 1),
  check (spacing_multiplier between 0.5 and 1.75),
  check (difficulty_bias between -1 and 1),
  check (reliability between 0 and 1)
);

create index if not exists calibration_observations_owner_topic_idx
  on public.calibration_observations(owner_id,topic_id,observed_at desc);
create index if not exists study_friction_events_owner_date_idx
  on public.study_friction_events(owner_id,event_date desc);
create index if not exists pretest_attempts_owner_topic_idx
  on public.pretest_attempts(owner_id,topic_id,created_at desc);
create index if not exists exam_simulations_owner_course_idx
  on public.exam_simulations(owner_id,course_id,started_at desc);

-- Derive v5 metadata from the existing question_payload without requiring a breaking RPC signature.
create or replace function public.learning_os_v5_prepare_attempt()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_transfer integer := 0;
  v_prediction integer := null;
begin
  begin
    if new.question_payload ? 'transferLevel' then
      v_transfer := greatest(0,least(6,(new.question_payload->>'transferLevel')::integer));
    elsif new.scaffold_stage = 'transfer' then
      v_transfer := 5;
    elsif new.source = 'exam' or new.attempt_type = 'simulation' then
      v_transfer := 6;
    elsif new.attempt_type = 'application' then
      v_transfer := 3;
    elsif new.attempt_type = 'calculation' then
      v_transfer := 2;
    elsif new.attempt_type = 'explanation' then
      v_transfer := 1;
    end if;
  exception when others then
    v_transfer := 0;
  end;

  begin
    if new.question_payload ? 'preRetrievalConfidence' then
      v_prediction := greatest(1,least(3,(new.question_payload->>'preRetrievalConfidence')::integer));
    end if;
  exception when others then
    v_prediction := null;
  end;

  new.transfer_level := v_transfer;
  new.prediction_confidence := v_prediction;

  if new.question_payload ? 'feedbackTiming' then
    new.feedback_policy := nullif(new.question_payload->>'feedbackTiming','');
  end if;

  if jsonb_typeof(new.question_payload->'discriminationTopicIds') = 'array' then
    new.discrimination_target_ids := array(
      select value
      from jsonb_array_elements_text(new.question_payload->'discriminationTopicIds') as value
    );
  end if;

  return new;
end;
$$;

drop trigger if exists learning_os_v5_prepare_attempt on public.practice_attempts;
create trigger learning_os_v5_prepare_attempt
before insert or update of question_payload,scaffold_stage,source,attempt_type
on public.practice_attempts
for each row execute function public.learning_os_v5_prepare_attempt();

create or replace function public.learning_os_v5_capture_calibration()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_outcome text;
  v_delay_hours integer := 0;
begin
  if new.prediction_confidence is null then
    return new;
  end if;
  v_outcome := coalesce(
    new.outcome,
    case new.result when 'independent' then 'correct' when 'hinted' then 'partial' else 'incorrect' end
  );
  begin
    v_delay_hours := greatest(0,coalesce((new.question_payload->>'predictionDelayHours')::integer,0));
  exception when others then
    v_delay_hours := 0;
  end;
  insert into public.calibration_observations(
    owner_id,course_id,topic_id,attempt_id,predicted_confidence,actual_outcome,delay_hours
  ) values (
    new.owner_id,new.course_id,new.topic_id,new.id,new.prediction_confidence,v_outcome,v_delay_hours
  );
  insert into public.learning_events(
    owner_id,event_type,course_id,topic_id,attempt_id,event_date,payload
  ) values (
    new.owner_id,'CALIBRATION_CHECK_COMPLETED',new.course_id,new.topic_id,new.id,new.date,
    jsonb_build_object(
      'predictedConfidence',new.prediction_confidence,
      'actualOutcome',v_outcome,
      'delayHours',v_delay_hours
    )
  );
  return new;
end;
$$;

drop trigger if exists learning_os_v5_capture_calibration on public.practice_attempts;
create trigger learning_os_v5_capture_calibration
after insert on public.practice_attempts
for each row execute function public.learning_os_v5_capture_calibration();

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
    'learning_policy_states','pretest_attempts','calibration_observations',
    'study_friction_events','implementation_intentions','reminder_adaptation',
    'contrastive_repairs','exam_simulations','subject_task_parameters'
  ]
  loop
    execute format('alter table public.%I enable row level security',t);
    execute format('drop policy if exists %I on public.%I','owner_all_'||t,t);
    execute format(
      'create policy %I on public.%I for all using (owner_id = auth.uid()) with check (owner_id = auth.uid())',
      'owner_all_'||t,t
    );
  end loop;
end
$$;

grant select,insert,update,delete on public.learning_policy_states to authenticated;
grant select,insert,update,delete on public.pretest_attempts to authenticated;
grant select,insert,update,delete on public.calibration_observations to authenticated;
grant select,insert,update,delete on public.study_friction_events to authenticated;
grant select,insert,update,delete on public.implementation_intentions to authenticated;
grant select,insert,update,delete on public.reminder_adaptation to authenticated;
grant select,insert,update,delete on public.contrastive_repairs to authenticated;
grant select,insert,update,delete on public.exam_simulations to authenticated;
grant select,insert,update,delete on public.subject_task_parameters to authenticated;

grant execute on function public.learning_os_v5_prepare_attempt() to authenticated,service_role;
grant execute on function public.learning_os_v5_capture_calibration() to authenticated,service_role;
grant execute on function public.learning_os_v5_capture_pretest_event() to authenticated,service_role;
