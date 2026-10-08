-- Repair BI05 V2 questions whose source definition names the very concept the
-- learner is supposed to identify. Keep intentional concept names in recall,
-- comparison, synthesis and concept-map tasks untouched.

create or replace function public._opintopaivakirja_mask_bi05_term(
  input_text text,
  term text
)
returns text
language plpgsql
immutable
set search_path = public
as $$
declare
  pattern text;
begin
  if input_text is null or term is null or char_length(btrim(term)) < 3 then
    return input_text;
  end if;

  -- Iiris 5 canonical concept names use letters, numbers, spaces and hyphens.
  -- Refuse an unexpected value instead of treating it as a regular expression.
  if btrim(term) !~ '^[[:alnum:]åäöÅÄÖ -]+$' then
    return input_text;
  end if;

  pattern := '(^|[^[:alnum:]åäöÅÄÖ])(' || btrim(term) || ')([^[:alnum:]åäöÅÄÖ]|$)';
  return regexp_replace(input_text, pattern, E'\\1[haettava käsite]\\3', 'gi');
end
$$;

create or replace function public._opintopaivakirja_mask_bi05_terms(
  input_text text,
  terms text[]
)
returns text
language plpgsql
immutable
set search_path = public
as $$
declare
  result text := input_text;
  term text;
begin
  if result is null then
    return null;
  end if;

  foreach term in array coalesce(terms, '{}'::text[])
  loop
    result := public._opintopaivakirja_mask_bi05_term(result, term);
  end loop;
  return result;
end
$$;

-- Recognition and multiple-choice tasks: the requested term must not appear in
-- the definition shown in the prompt.
update public.question_bank q
set prompt = public._opintopaivakirja_mask_bi05_term(q.prompt, q.correct_answer),
    metadata = coalesce(q.metadata, '{}'::jsonb) || jsonb_build_object('answerLeakGuard', 'v1'),
    updated_at = now()
where q.module_code = 'BI05'
  and q.seed_version = 'bi05-v2'
  and q.status = 'active'
  and (q.content_id like 'BI05-IIRIS5-V2-%-recognition'
       or q.content_id like 'BI05-IIRIS5-V2-%-multiple_choice')
  and q.prompt <> public._opintopaivakirja_mask_bi05_term(q.prompt, q.correct_answer);

-- Error-detection tasks intentionally name c1, but d2 must not name c2 because
-- that would hand the correction to the learner.
update public.question_bank q
set prompt = public._opintopaivakirja_mask_bi05_term(q.prompt, q.expected_concepts[2]),
    metadata = coalesce(q.metadata, '{}'::jsonb) || jsonb_build_object('answerLeakGuard', 'v1'),
    updated_at = now()
where q.module_code = 'BI05'
  and q.seed_version = 'bi05-v2'
  and q.status = 'active'
  and q.content_id like 'BI05-IIRIS5-V2-%-error_detection'
  and q.prompt <> public._opintopaivakirja_mask_bi05_term(q.prompt, q.expected_concepts[2]);

-- Matching shows the concept names on the left on purpose. Only sanitize the
-- definition side so a definition cannot contain its own matching label.
update public.question_bank q
set options = coalesce((
      select jsonb_agg(
        to_jsonb(public._opintopaivakirja_mask_bi05_terms(value, q.expected_concepts))
        order by ordinality
      )
      from jsonb_array_elements_text(q.options) with ordinality as option_row(value, ordinality)
    ), q.options),
    matching_pairs = coalesce((
      select jsonb_agg(
        jsonb_set(
          pair,
          '{right}',
          to_jsonb(public._opintopaivakirja_mask_bi05_terms(pair->>'right', q.expected_concepts)),
          false
        )
        order by ordinality
      )
      from jsonb_array_elements(q.matching_pairs) with ordinality as pair_row(pair, ordinality)
    ), q.matching_pairs),
    metadata = coalesce(q.metadata, '{}'::jsonb) || jsonb_build_object('answerLeakGuard', 'v1'),
    updated_at = now()
where q.module_code = 'BI05'
  and q.seed_version = 'bi05-v2'
  and q.status = 'active'
  and q.content_id like 'BI05-IIRIS5-V2-%-matching';

-- Source-analysis tasks hide their three target terms only inside the source
-- snippets. The post-answer explanation is deliberately left complete.
update public.question_bank q
set stimulus_package = jsonb_set(
      jsonb_set(
        jsonb_set(
          coalesce(q.stimulus_package, '{}'::jsonb),
          '{aineistoA}',
          to_jsonb(public._opintopaivakirja_mask_bi05_terms(q.stimulus_package->>'aineistoA', q.expected_concepts)),
          true
        ),
        '{aineistoB}',
        to_jsonb(public._opintopaivakirja_mask_bi05_terms(q.stimulus_package->>'aineistoB', q.expected_concepts)),
        true
      ),
      '{aineistoC}',
      to_jsonb(public._opintopaivakirja_mask_bi05_terms(q.stimulus_package->>'aineistoC', q.expected_concepts)),
      true
    ),
    metadata = coalesce(q.metadata, '{}'::jsonb) || jsonb_build_object('answerLeakGuard', 'v1'),
    updated_at = now()
where q.module_code = 'BI05'
  and q.seed_version = 'bi05-v2'
  and q.status = 'active'
  and q.content_id like 'BI05-IIRIS5-V2-%-source_analysis';

-- Fail the migration rather than silently leaving the same defect behind.
do $$
declare
  leaked integer;
begin
  select count(*) into leaked
  from public.question_bank q
  where q.module_code = 'BI05'
    and q.seed_version = 'bi05-v2'
    and q.status = 'active'
    and (q.content_id like 'BI05-IIRIS5-V2-%-recognition'
         or q.content_id like 'BI05-IIRIS5-V2-%-multiple_choice')
    and q.prompt <> public._opintopaivakirja_mask_bi05_term(q.prompt, q.correct_answer);
  if leaked <> 0 then
    raise exception 'BI05 answer-leak repair failed for % identification prompts', leaked;
  end if;

  select count(*) into leaked
  from public.question_bank q
  where q.module_code = 'BI05'
    and q.seed_version = 'bi05-v2'
    and q.status = 'active'
    and q.content_id like 'BI05-IIRIS5-V2-%-error_detection'
    and q.prompt <> public._opintopaivakirja_mask_bi05_term(q.prompt, q.expected_concepts[2]);
  if leaked <> 0 then
    raise exception 'BI05 answer-leak repair failed for % error-detection prompts', leaked;
  end if;

  select count(*) into leaked
  from public.question_bank q
  cross join lateral jsonb_array_elements_text(q.options) as option_row(value)
  where q.module_code = 'BI05'
    and q.seed_version = 'bi05-v2'
    and q.status = 'active'
    and q.content_id like 'BI05-IIRIS5-V2-%-matching'
    and option_row.value <> public._opintopaivakirja_mask_bi05_terms(option_row.value, q.expected_concepts);
  if leaked <> 0 then
    raise exception 'BI05 answer-leak repair failed for % matching definitions', leaked;
  end if;

  select count(*) into leaked
  from public.question_bank q
  cross join lateral jsonb_each_text(coalesce(q.stimulus_package, '{}'::jsonb)) as source_row(key, value)
  where q.module_code = 'BI05'
    and q.seed_version = 'bi05-v2'
    and q.status = 'active'
    and q.content_id like 'BI05-IIRIS5-V2-%-source_analysis'
    and source_row.key in ('aineistoA', 'aineistoB', 'aineistoC')
    and source_row.value <> public._opintopaivakirja_mask_bi05_terms(source_row.value, q.expected_concepts);
  if leaked <> 0 then
    raise exception 'BI05 answer-leak repair failed for % source-analysis snippets', leaked;
  end if;
end
$$;

drop function public._opintopaivakirja_mask_bi05_terms(text, text[]);
drop function public._opintopaivakirja_mask_bi05_term(text, text);
