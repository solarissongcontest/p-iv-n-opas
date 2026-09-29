-- Learning OS v4: multidimensional mastery evidence, typed knowledge graph,
-- auditable learning events, experiments and material links.
-- Additive and idempotent: existing v3 data and RPCs remain valid.

alter table public.user_preferences
  add column if not exists planner_mode text not null default 'assisted',
  add column if not exists personal_experiments_enabled boolean not null default true,
  add column if not exists quiet_hours_start time,
  add column if not exists quiet_hours_end time;

alter table public.user_preferences
  drop constraint if exists user_preferences_planner_mode_check,
  add constraint user_preferences_planner_mode_check
    check (planner_mode in ('manual','assisted','autopilot'));

update public.user_preferences
set learning_schema_version = greatest(coalesce(learning_schema_version,3),4);

alter table public.practice_attempts
  add column if not exists scaffold_stage text not null default 'independent',
  add column if not exists error_category text,
  add column if not exists assisted boolean not null default false,
  add column if not exists dimension_weights jsonb not null default '{}'::jsonb,
  add column if not exists independent_verification_required boolean not null default false;

alter table public.practice_attempts
  drop constraint if exists practice_attempts_scaffold_stage_check,
  add constraint practice_attempts_scaffold_stage_check
    check (scaffold_stage in (
      'worked_example','explanation','partial_completion','guided',
      'independent','mixed','transfer','delayed_verification'
    )),
  drop constraint if exists practice_attempts_error_category_check,
  add constraint practice_attempts_error_category_check
    check (error_category is null or error_category in (
      'concept_error','recall_error','formula_error','algebra_error','unit_error',
      'interpretation_error','strategy_error','careless_error',
      'incomplete_reasoning','prerequisite_gap'
    ));

alter table public.topics
  add column if not exists understanding_strength real not null default 0,
  add column if not exists fluency_strength real not null default 0,
  add column if not exists calibration_strength real not null default 0.5,
  add column if not exists blind_spot boolean not null default false;

alter table public.topics
  drop constraint if exists topics_understanding_strength_check,
  add constraint topics_understanding_strength_check check (understanding_strength between 0 and 1),
  drop constraint if exists topics_fluency_strength_check,
  add constraint topics_fluency_strength_check check (fluency_strength between 0 and 1),
  drop constraint if exists topics_calibration_strength_check,
  add constraint topics_calibration_strength_check check (calibration_strength between 0 and 1);

create table if not exists public.topic_dependencies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  topic_id uuid not null references public.topics(id) on delete cascade,
  depends_on_topic_id uuid not null references public.topics(id) on delete cascade,
  relation_type text not null default 'prerequisite',
  created_at timestamptz not null default now(),
  unique(owner_id, topic_id, depends_on_topic_id, relation_type),
  check (topic_id <> depends_on_topic_id),
  check (relation_type in (
    'prerequisite','depends_on','related_to','builds_on','commonly_confused_with'
  ))
);

create table if not exists public.mastery_evidence (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  attempt_id uuid references public.practice_attempts(id) on delete cascade,
  event_date date not null default current_date,
  source text not null default 'practice',
  outcome text not null,
  evidence_quality real not null default 0,
  assisted boolean not null default false,
  scaffold_stage text not null default 'independent',
  dimension_weights jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(owner_id, attempt_id),
  check (outcome in ('correct','partial','incorrect')),
  check (evidence_quality between 0 and 1)
);

create table if not exists public.learning_events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  event_type text not null,
  course_id uuid references public.courses(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete cascade,
  attempt_id uuid references public.practice_attempts(id) on delete set null,
  event_date date not null default current_date,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists learning_events_owner_date_idx
  on public.learning_events(owner_id,event_date desc);
create index if not exists mastery_evidence_owner_topic_idx
  on public.mastery_evidence(owner_id,topic_id,event_date desc);
create index if not exists topic_dependencies_owner_topic_idx
  on public.topic_dependencies(owner_id,topic_id);

create table if not exists public.error_observations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete cascade,
  attempt_id uuid references public.practice_attempts(id) on delete set null,
  category text not null,
  corrected_category text,
  note text,
  observed_at timestamptz not null default now(),
  check (category in (
    'concept_error','recall_error','formula_error','algebra_error','unit_error',
    'interpretation_error','strategy_error','careless_error',
    'incomplete_reasoning','prerequisite_gap'
  )),
  check (corrected_category is null or corrected_category in (
    'concept_error','recall_error','formula_error','algebra_error','unit_error',
    'interpretation_error','strategy_error','careless_error',
    'incomplete_reasoning','prerequisite_gap'
  ))
);

create table if not exists public.learning_experiments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  experiment_key text not null,
  enabled boolean not null default true,
  variant_a text not null,
  variant_b text not null,
  observations jsonb not null default '[]'::jsonb,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(owner_id,experiment_key),
  check (experiment_key in ('session_length','spacing_window','interleaving'))
);

create table if not exists public.study_materials (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  name text not null,
  kind text not null default 'text',
  topic_ids uuid[] not null default '{}'::uuid[],
  page_hint text,
  text_preview text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  check (kind in ('pdf','text','slides','notes','other'))
);

create table if not exists public.ai_interactions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  course_id uuid references public.courses(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete cascade,
  mode text not null,
  tactic text,
  hint_level integer,
  remote_used boolean not null default false,
  provider_status text,
  answer_firewall_blocked boolean not null default false,
  created_at timestamptz not null default now()
);

-- Derive safe evidence metadata before current v3 RPC inserts the attempt.
create or replace function public.learning_os_v4_prepare_attempt()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_stage text;
  v_outcome text;
begin
  v_stage := coalesce(
    nullif(new.question_payload->>'scaffoldStage',''),
    case when coalesce(new.hints_used,0) > 0 or new.hint_used then 'guided' else 'independent' end
  );
  if v_stage not in (
    'worked_example','explanation','partial_completion','guided',
    'independent','mixed','transfer','delayed_verification'
  ) then
    v_stage := 'independent';
  end if;

  v_outcome := coalesce(
    new.outcome,
    case new.result when 'independent' then 'correct' when 'hinted' then 'partial' else 'incorrect' end
  );

  new.scaffold_stage := v_stage;
  new.assisted := (
    coalesce(new.hints_used,0) > 0
    or coalesce(new.hint_used,false)
    or coalesce((new.question_payload->>'coachUsed')::boolean,false)
    or v_stage in ('worked_example','partial_completion','guided')
  );
  new.independent_verification_required := (
    new.assisted and v_outcome in ('correct','partial')
  );

  new.dimension_weights := case new.attempt_type
    when 'free_recall' then '{"recall":1,"understanding":0.25}'::jsonb
    when 'short_answer' then '{"recall":1,"understanding":0.25}'::jsonb
    when 'explanation' then '{"understanding":1,"recall":0.38}'::jsonb
    when 'calculation' then '{"application":0.82,"fluency":0.68,"understanding":0.3}'::jsonb
    when 'application' then '{"application":1,"understanding":0.42}'::jsonb
    when 'error_detection' then '{"understanding":0.68,"application":0.62}'::jsonb
    when 'simulation' then '{"application":1,"fluency":0.78,"recall":0.45}'::jsonb
    when 'ordering' then '{"understanding":0.72,"recall":0.38}'::jsonb
    when 'multiple_choice' then '{"recall":0.45,"understanding":0.15}'::jsonb
    else '{"recall":0.38,"application":0.22}'::jsonb
  end;

  if v_outcome <> 'correct' and new.error_category is null then
    new.error_category := case new.attempt_type
      when 'free_recall' then 'recall_error'
      when 'short_answer' then 'recall_error'
      when 'calculation' then 'strategy_error'
      when 'application' then 'strategy_error'
      when 'simulation' then 'strategy_error'
      when 'explanation' then 'concept_error'
      when 'error_detection' then 'concept_error'
      else 'incomplete_reasoning'
    end;
  end if;
  return new;
end;
$$;

drop trigger if exists learning_os_v4_prepare_attempt on public.practice_attempts;
create trigger learning_os_v4_prepare_attempt
before insert or update of question_payload,hints_used,hint_used,outcome,result,attempt_type
on public.practice_attempts
for each row execute function public.learning_os_v4_prepare_attempt();

create or replace function public.learning_os_v4_capture_attempt()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.mastery_evidence(
    owner_id,course_id,topic_id,attempt_id,event_date,source,outcome,
    evidence_quality,assisted,scaffold_stage,dimension_weights
  ) values (
    new.owner_id,new.course_id,new.topic_id,new.id,new.date,new.source,
    coalesce(new.outcome,case new.result when 'independent' then 'correct' when 'hinted' then 'partial' else 'incorrect' end),
    new.evidence_quality,new.assisted,new.scaffold_stage,new.dimension_weights
  )
  on conflict(owner_id,attempt_id) do update set
    outcome=excluded.outcome,
    evidence_quality=excluded.evidence_quality,
    assisted=excluded.assisted,
    scaffold_stage=excluded.scaffold_stage,
    dimension_weights=excluded.dimension_weights;

  insert into public.learning_events(
    owner_id,event_type,course_id,topic_id,attempt_id,event_date,payload
  ) values (
    new.owner_id,
    case when new.source='review' then 'REVIEW_COMPLETED' else 'PRACTICE_ATTEMPT_COMPLETED' end,
    new.course_id,new.topic_id,new.id,new.date,
    jsonb_build_object(
      'attemptType',new.attempt_type,
      'outcome',coalesce(new.outcome,new.result),
      'hintsUsed',new.hints_used,
      'assisted',new.assisted,
      'scaffoldStage',new.scaffold_stage,
      'difficulty',new.difficulty
    )
  );

  if new.error_category is not null then
    insert into public.error_observations(
      owner_id,course_id,topic_id,attempt_id,category
    ) values (
      new.owner_id,new.course_id,new.topic_id,new.id,new.error_category
    );
  end if;
  return new;
end;
$$;

drop trigger if exists learning_os_v4_capture_attempt on public.practice_attempts;
create trigger learning_os_v4_capture_attempt
after insert on public.practice_attempts
for each row execute function public.learning_os_v4_capture_attempt();

-- RLS: every normalized row belongs to the current user.
do $$
declare
  t text;
begin
  foreach t in array array[
    'topic_dependencies','mastery_evidence','learning_events','error_observations',
    'learning_experiments','study_materials','ai_interactions'
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

grant select,insert,update,delete on public.topic_dependencies to authenticated;
grant select,insert,update,delete on public.mastery_evidence to authenticated;
grant select,insert,update,delete on public.learning_events to authenticated;
grant select,insert,update,delete on public.error_observations to authenticated;
grant select,insert,update,delete on public.learning_experiments to authenticated;
grant select,insert,update,delete on public.study_materials to authenticated;
grant select,insert on public.ai_interactions to authenticated;


-- Complete append-only event coverage for the Learning OS.

create or replace function public.learning_os_v4_capture_session()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.learning_events(
    owner_id,event_type,course_id,topic_id,event_date,payload
  ) values (
    new.owner_id,'SESSION_COMPLETED',new.course_id,new.topic_id,new.date,
    jsonb_build_object(
      'sessionId',new.id,
      'minutes',new.minutes,
      'plannedMinutes',new.planned_minutes,
      'kind',new.kind,
      'retrievalResult',new.retrieval_result,
      'retrievalConfidence',new.retrieval_confidence,
      'outcome',new.outcome
    )
  );
  return new;
end;
$$;

drop trigger if exists learning_os_v4_capture_session on public.study_sessions;
create trigger learning_os_v4_capture_session
after insert on public.study_sessions
for each row execute function public.learning_os_v4_capture_session();

create or replace function public.learning_os_v4_capture_topic_state()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.evidence_count is distinct from old.evidence_count
     and new.evidence_count > old.evidence_count then
    insert into public.learning_events(
      owner_id,event_type,course_id,topic_id,event_date,payload
    ) values (
      new.owner_id,'TOPIC_ASSESSED',new.course_id,new.id,current_date,
      jsonb_build_object(
        'evidenceCount',new.evidence_count,
        'strongEvidenceCount',new.strong_evidence_count,
        'masteryConfidence',new.mastery_confidence
      )
    );
  end if;

  if new.verified_level is distinct from old.verified_level
     or new.mastery_confidence is distinct from old.mastery_confidence
     or new.recall_strength is distinct from old.recall_strength
     or new.application_strength is distinct from old.application_strength
     or new.retention_strength is distinct from old.retention_strength
     or new.understanding_strength is distinct from old.understanding_strength
     or new.fluency_strength is distinct from old.fluency_strength then
    insert into public.learning_events(
      owner_id,event_type,course_id,topic_id,event_date,payload
    ) values (
      new.owner_id,'MASTERY_UPDATED',new.course_id,new.id,current_date,
      jsonb_build_object(
        'verifiedFrom',old.verified_level,
        'verifiedTo',new.verified_level,
        'confidenceFrom',old.mastery_confidence,
        'confidenceTo',new.mastery_confidence,
        'recall',new.recall_strength,
        'understanding',new.understanding_strength,
        'application',new.application_strength,
        'fluency',new.fluency_strength,
        'retention',new.retention_strength,
        'calibration',new.calibration_strength
      )
    );
  end if;
  return new;
end;
$$;

drop trigger if exists learning_os_v4_capture_topic_state on public.topics;
create trigger learning_os_v4_capture_topic_state
after update of
  evidence_count,strong_evidence_count,verified_level,mastery_confidence,
  recall_strength,understanding_strength,application_strength,
  fluency_strength,retention_strength,calibration_strength
on public.topics
for each row execute function public.learning_os_v4_capture_topic_state();

create or replace function public.learning_os_v4_capture_exam()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.learning_events(
    owner_id,event_type,course_id,event_date,payload
  ) values (
    new.owner_id,'EXAM_CREATED',new.course_id,new.date,
    jsonb_build_object(
      'examId',new.id,
      'name',new.name,
      'targetSystem',new.target_system,
      'targetValue',new.target_value
    )
  );
  return new;
end;
$$;

drop trigger if exists learning_os_v4_capture_exam on public.exams;
create trigger learning_os_v4_capture_exam
after insert on public.exams
for each row execute function public.learning_os_v4_capture_exam();

create or replace function public.learning_os_v4_capture_plan_item()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.learning_events(
    owner_id,event_type,course_id,topic_id,event_date,payload
  ) values (
    new.owner_id,'PLAN_REGENERATED',new.course_id,new.topic_id,new.date,
    jsonb_build_object(
      'planItemId',new.id,
      'kind',new.kind,
      'phase',new.phase,
      'targetMinutes',new.target_minutes,
      'minMinutes',new.min_minutes,
      'status',new.status
    )
  );
  return new;
end;
$$;

drop trigger if exists learning_os_v4_capture_plan_item on public.plan_items;
create trigger learning_os_v4_capture_plan_item
after insert on public.plan_items
for each row execute function public.learning_os_v4_capture_plan_item();

-- Record hint usage as its own event so assisted evidence can be audited.
create or replace function public.learning_os_v4_capture_hint_event()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if coalesce(new.hints_used,0) > 0 then
    insert into public.learning_events(
      owner_id,event_type,course_id,topic_id,attempt_id,event_date,payload
    ) values (
      new.owner_id,'HINT_USED',new.course_id,new.topic_id,new.id,new.date,
      jsonb_build_object(
        'hintsUsed',new.hints_used,
        'scaffoldStage',new.scaffold_stage,
        'source',new.source
      )
    );
  end if;
  return new;
end;
$$;

drop trigger if exists learning_os_v4_capture_hint_event on public.practice_attempts;
create trigger learning_os_v4_capture_hint_event
after insert on public.practice_attempts
for each row execute function public.learning_os_v4_capture_hint_event();

grant execute on function public.learning_os_v4_capture_session() to authenticated,service_role;
grant execute on function public.learning_os_v4_capture_topic_state() to authenticated,service_role;
grant execute on function public.learning_os_v4_capture_exam() to authenticated,service_role;
grant execute on function public.learning_os_v4_capture_plan_item() to authenticated,service_role;
grant execute on function public.learning_os_v4_capture_hint_event() to authenticated,service_role;
