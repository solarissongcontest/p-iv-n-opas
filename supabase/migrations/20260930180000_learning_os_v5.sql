-- Learning OS v5: memory efficiency, metacognition, behavior and exam simulation.
-- Additive. v4 remains the evidence foundation and all v5 records are owner-scoped.

alter table public.user_preferences
  add column if not exists retention_budget_enabled boolean not null default true,
  add column if not exists reminder_tapering_enabled boolean not null default true,
  add column if not exists pretest_enabled boolean not null default true,
  add column if not exists feedback_policy_enabled boolean not null default true;

update public.user_preferences
set learning_schema_version = greatest(coalesce(learning_schema_version,4),5);

alter table public.practice_attempts
  add column if not exists pretest boolean not null default false,
  add column if not exists feedback_mode text,
  add column if not exists transfer_level text,
  add column if not exists discrimination_set_id text;

alter table public.practice_attempts
  drop constraint if exists practice_attempts_feedback_mode_check,
  add constraint practice_attempts_feedback_mode_check check (
    feedback_mode is null or feedback_mode in (
      'new_learning','worked_example','retrieval','pretest','exam_simulation','error_repair'
    )
  ),
  drop constraint if exists practice_attempts_transfer_level_check,
  add constraint practice_attempts_transfer_level_check check (
    transfer_level is null or transfer_level in (
      'recall','same_context','varied_context','different_representation',
      'unfamiliar_scenario','mixed_topic','exam_transfer'
    )
  );

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

create table if not exists public.calibration_observations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  attempt_id uuid references public.practice_attempts(id) on delete set null,
  predicted_confidence real not null,
  actual_score real not null,
  delay_days integer not null default 0,
  calibration_error real not null,
  status text not null,
  observed_on date not null default current_date,
  created_at timestamptz not null default now(),
  unique(owner_id,attempt_id),
  check (predicted_confidence between 0 and 1),
  check (actual_score between 0 and 1),
  check (calibration_error between 0 and 1),
  check (delay_days >= 0),
  check (status in ('well_calibrated','overconfident','underconfident','insufficient'))
);

create table if not exists public.study_friction_events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  event_date date not null default current_date,
  weekday integer not null,
  reason text not null,
  planned_minutes integer not null default 0,
  course_id uuid references public.courses(id) on delete set null,
  plan_item_id uuid references public.plan_items(id) on delete set null,
  created_at timestamptz not null default now(),
  check (weekday between 0 and 6),
  check (planned_minutes >= 0),
  check (reason in ('no_time','forgot','too_tired','too_large','unclear_start','plans_changed'))
);

create table if not exists public.implementation_intentions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  trigger_type text not null,
  action_type text not null,
  parameter integer not null default 0,
  label text not null,
  enabled boolean not null default true,
  source text not null default 'manual',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (trigger_type in ('late_home','low_energy','two_missed_days','busy_day','review_backlog')),
  check (action_type in ('shorten_session','switch_to_retrieval','move_heavy_work','protect_minimum','drop_extra')),
  check (source in ('manual','suggested'))
);

create table if not exists public.reminder_adaptation (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  period_start date not null,
  period_end date not null,
  planned_starts integer not null default 0,
  independent_starts integer not null default 0,
  missed_starts integer not null default 0,
  recommended_level text not null default 'normal',
  created_at timestamptz not null default now(),
  unique(owner_id,period_start,period_end),
  check (planned_starts >= 0 and independent_starts >= 0 and missed_starts >= 0),
  check (recommended_level in ('none','light','normal'))
);

create table if not exists public.exam_simulations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  exam_id uuid references public.exams(id) on delete set null,
  mode text not null default 'yo',
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  duration_minutes integer,
  task_selection_minutes integer,
  selected_task_ids text[] not null default '{}'::text[],
  task_results jsonb not null default '[]'::jsonb,
  task_selection_analysis jsonb not null default '{}'::jsonb,
  feedback_released boolean not null default false,
  no_hints boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  check (mode in ('yo','course_exam','diagnostic')),
  check (duration_minutes is null or duration_minutes >= 0),
  check (task_selection_minutes is null or task_selection_minutes >= 0)
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

create index if not exists retention_targets_owner_date_idx
  on public.retention_targets(owner_id,calculated_for desc);
create index if not exists calibration_observations_owner_topic_idx
  on public.calibration_observations(owner_id,topic_id,observed_on desc);
create index if not exists study_friction_events_owner_date_idx
  on public.study_friction_events(owner_id,event_date desc);
create index if not exists stop_rule_events_owner_topic_idx
  on public.stop_rule_events(owner_id,topic_id,session_date desc);
create index if not exists exam_simulations_owner_course_idx
  on public.exam_simulations(owner_id,course_id,started_at desc);

-- Pretests are useful preview evidence but must never lower or raise verified mastery.
create or replace function public.learning_os_v5_prepare_pretest()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if coalesce(new.pretest,false) then
    new.evidence_quality := 0;
    new.independent_verification_required := false;
    new.feedback_mode := 'pretest';
    new.dimension_weights := '{}'::jsonb;
  end if;
  return new;
end;
$$;

drop trigger if exists learning_os_v5_prepare_pretest on public.practice_attempts;
create trigger learning_os_v5_prepare_pretest
before insert or update of pretest,evidence_quality,feedback_mode
on public.practice_attempts
for each row execute function public.learning_os_v5_prepare_pretest();

-- Capture delayed metacognitive calibration only when confidence exists.
create or replace function public.learning_os_v5_capture_calibration()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_predicted real;
  v_actual real;
  v_error real;
  v_status text;
begin
  if new.confidence is null or coalesce(new.pretest,false) then
    return new;
  end if;

  v_predicted := greatest(0,least(1,(new.confidence-1)::real/2));
  v_actual := case coalesce(new.outcome,'')
    when 'correct' then 1
    when 'partial' then 0.5
    when 'incorrect' then 0
    else case new.result when 'independent' then 1 when 'hinted' then 0.5 else 0 end
  end;
  v_error := abs(v_predicted-v_actual);
  v_status := case
    when coalesce(new.delay_days,0) < 1 then 'insufficient'
    when v_predicted-v_actual >= 0.45 then 'overconfident'
    when v_actual-v_predicted >= 0.45 then 'underconfident'
    else 'well_calibrated'
  end;

  insert into public.calibration_observations(
    owner_id,course_id,topic_id,attempt_id,predicted_confidence,actual_score,
    delay_days,calibration_error,status,observed_on
  ) values (
    new.owner_id,new.course_id,new.topic_id,new.id,v_predicted,v_actual,
    coalesce(new.delay_days,0),v_error,v_status,new.date
  )
  on conflict(owner_id,attempt_id) do update set
    predicted_confidence=excluded.predicted_confidence,
    actual_score=excluded.actual_score,
    delay_days=excluded.delay_days,
    calibration_error=excluded.calibration_error,
    status=excluded.status,
    observed_on=excluded.observed_on;
  return new;
end;
$$;

drop trigger if exists learning_os_v5_capture_calibration on public.practice_attempts;
create trigger learning_os_v5_capture_calibration
after insert or update of confidence,outcome,result,delay_days
on public.practice_attempts
for each row execute function public.learning_os_v5_capture_calibration();

-- Keep the append-only event stream aware of the new instructional context.
create or replace function public.learning_os_v5_capture_policy_attempt()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.learning_events(
    owner_id,event_type,course_id,topic_id,attempt_id,event_date,payload
  ) values (
    new.owner_id,
    case when coalesce(new.pretest,false) then 'PRETEST_ATTEMPT_COMPLETED'
         else 'V5_PRACTICE_CONTEXT_CAPTURED' end,
    new.course_id,new.topic_id,new.id,new.date,
    jsonb_build_object(
      'pretest',coalesce(new.pretest,false),
      'feedbackMode',new.feedback_mode,
      'transferLevel',new.transfer_level,
      'discriminationSetId',new.discrimination_set_id
    )
  );
  return new;
end;
$$;

drop trigger if exists learning_os_v5_capture_policy_attempt on public.practice_attempts;
create trigger learning_os_v5_capture_policy_attempt
after insert on public.practice_attempts
for each row execute function public.learning_os_v5_capture_policy_attempt();

-- All v5 tables in public are explicitly RLS protected. Policies combine the
-- authenticated role with row ownership instead of relying on role alone.
do $$
declare
  t text;
begin
  foreach t in array array[
    'retention_targets','stop_rule_events','calibration_observations',
    'study_friction_events','implementation_intentions','reminder_adaptation',
    'exam_simulations','learning_policy_snapshots'
  ]
  loop
    execute format('alter table public.%I enable row level security',t);

    execute format('drop policy if exists %I on public.%I','owner_select_'||t,t);
    execute format(
      'create policy %I on public.%I for select to authenticated using ((select auth.uid()) is not null and (select auth.uid()) = owner_id)',
      'owner_select_'||t,t
    );

    execute format('drop policy if exists %I on public.%I','owner_insert_'||t,t);
    execute format(
      'create policy %I on public.%I for insert to authenticated with check ((select auth.uid()) is not null and (select auth.uid()) = owner_id)',
      'owner_insert_'||t,t
    );

    execute format('drop policy if exists %I on public.%I','owner_update_'||t,t);
    execute format(
      'create policy %I on public.%I for update to authenticated using ((select auth.uid()) is not null and (select auth.uid()) = owner_id) with check ((select auth.uid()) is not null and (select auth.uid()) = owner_id)',
      'owner_update_'||t,t
    );

    execute format('drop policy if exists %I on public.%I','owner_delete_'||t,t);
    execute format(
      'create policy %I on public.%I for delete to authenticated using ((select auth.uid()) is not null and (select auth.uid()) = owner_id)',
      'owner_delete_'||t,t
    );

    execute format('grant select,insert,update,delete on public.%I to authenticated',t);
  end loop;
end
$$;

grant execute on function public.learning_os_v5_prepare_pretest() to authenticated,service_role;
grant execute on function public.learning_os_v5_capture_calibration() to authenticated,service_role;
grant execute on function public.learning_os_v5_capture_policy_attempt() to authenticated,service_role;
