-- Practice rubric evaluator evidence policy.
-- The evaluator is advisory. If the learner views evaluation before saving,
-- the attempt is treated as assisted evidence and requires later independent verification.

create or replace function public.learning_os_v4_prepare_attempt()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_stage text;
  v_outcome text;
  v_rubric_used boolean;
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

  v_rubric_used := coalesce(
    (new.question_payload->>'rubricEvaluatorUsed')::boolean,
    false
  );

  new.scaffold_stage := v_stage;
  new.assisted := (
    coalesce(new.hints_used,0) > 0
    or coalesce(new.hint_used,false)
    or coalesce((new.question_payload->>'coachUsed')::boolean,false)
    or v_rubric_used
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
      'rubricEvaluatorUsed',coalesce((new.question_payload->>'rubricEvaluatorUsed')::boolean,false),
      'rubricScore',new.question_payload #>> '{rubricEvaluation,score}',
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

grant execute on function public.learning_os_v4_prepare_attempt() to authenticated,service_role;
grant execute on function public.learning_os_v4_capture_attempt() to authenticated,service_role;
