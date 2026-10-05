-- Complete the KE04 Mooli 4 cutover after the canonical subchapter migration.
-- This restores derived mastery state, merge-sensitive retention rows, outgoing
-- dependencies, generated plan titles and durable runtime provisioning.

create temporary table _ke04_hardening_topics (
  section text primary key,
  unit_no integer not null,
  name text not null
) on commit drop;

insert into _ke04_hardening_topics(section,unit_no,name) values
  ('1.1',1,'1.1 Reaktioyhtälön kirjoittaminen ja tasapainottaminen'),
  ('1.2',1,'1.2 Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto'),
  ('1.3',1,'1.3 Reaktion rajoittava tekijä'),
  ('1.4',1,'1.4 Kaasureaktioiden stoikiometria – ideaalikaasun tilanyhtälö'),
  ('2.1',2,'2.1 Reaktiotyypit'),
  ('3.1',3,'3.1 Substituutioreaktio'),
  ('3.2',3,'3.2 Additio- ja eliminaatioreaktio'),
  ('3.3',3,'3.3 Kondensaatio- ja hydrolyysireaktio'),
  ('4.1',4,'4.1 Polymeerit ja polymeroitumisreaktiot'),
  ('4.2',4,'4.2 Muovit ja tekokuidut ovat polymeerien ja lisäaineiden seoksia'),
  ('5.1',5,'5.1 Hiilihydraatit'),
  ('5.2',5,'5.2 Aminohapot ja proteiinit'),
  ('5.3',5,'5.3 Nukleiinihapot'),
  ('5.4',5,'5.4 Lipidit');

-- Preserve authoritative derived mastery fields that are not recomputed merely
-- by repointing mastery_evidence rows.
with aggregated as (
  select
    course_id,
    section,
    max(mastery_confidence) as mastery_confidence,
    sum(coalesce(evidence_count,0))::integer as evidence_count,
    sum(coalesce(strong_evidence_count,0))::integer as strong_evidence_count,
    max(recall_strength) as recall_strength,
    max(application_strength) as application_strength,
    max(retention_strength) as retention_strength,
    max(forgetting_risk) as forgetting_risk,
    max(exam_relevance) as exam_relevance,
    max(learning_state_updated_at) as learning_state_updated_at,
    max(understanding_strength) as understanding_strength,
    max(fluency_strength) as fluency_strength,
    max(calibration_strength) as calibration_strength,
    bool_or(coalesce(blind_spot,false)) as blind_spot,
    max(retention_target) as retention_target,
    max(discrimination_strength) as discrimination_strength,
    max(transfer_level) as transfer_level
  from public._ke04_mooli4_topic_state_stage
  group by course_id,section
), recent as (
  select
    course_id,
    section,
    (array_agg(last_retrieval_result order by last_retrieval_at desc nulls last, old_id)
      filter (where last_retrieval_result is not null))[1] as last_retrieval_result,
    (array_agg(last_retrieval_confidence order by last_retrieval_at desc nulls last, old_id)
      filter (where last_retrieval_confidence is not null))[1] as last_retrieval_confidence,
    (array_agg(last_retrieval_difficulty order by last_retrieval_at desc nulls last, old_id)
      filter (where last_retrieval_difficulty is not null))[1] as last_retrieval_difficulty
  from public._ke04_mooli4_topic_state_stage
  group by course_id,section
)
update public.topics target
set
  last_retrieval_result = coalesce(r.last_retrieval_result,target.last_retrieval_result),
  last_retrieval_confidence = coalesce(r.last_retrieval_confidence,target.last_retrieval_confidence),
  last_retrieval_difficulty = coalesce(r.last_retrieval_difficulty,target.last_retrieval_difficulty),
  mastery_confidence = greatest(target.mastery_confidence,a.mastery_confidence),
  evidence_count = greatest(coalesce(target.evidence_count,0),a.evidence_count),
  strong_evidence_count = greatest(coalesce(target.strong_evidence_count,0),a.strong_evidence_count),
  recall_strength = greatest(target.recall_strength,a.recall_strength),
  application_strength = greatest(target.application_strength,a.application_strength),
  retention_strength = greatest(target.retention_strength,a.retention_strength),
  forgetting_risk = greatest(target.forgetting_risk,a.forgetting_risk),
  exam_relevance = greatest(target.exam_relevance,a.exam_relevance),
  learning_state_updated_at = greatest(target.learning_state_updated_at,a.learning_state_updated_at),
  understanding_strength = greatest(target.understanding_strength,a.understanding_strength),
  fluency_strength = greatest(target.fluency_strength,a.fluency_strength),
  calibration_strength = greatest(target.calibration_strength,a.calibration_strength),
  blind_spot = coalesce(target.blind_spot,false) or coalesce(a.blind_spot,false),
  retention_target = greatest(target.retention_target,a.retention_target),
  discrimination_strength = greatest(target.discrimination_strength,a.discrimination_strength),
  transfer_level = greatest(target.transfer_level,a.transfer_level)
from aggregated a
join _ke04_hardening_topics k on k.section = a.section
left join recent r on r.course_id = a.course_id and r.section = a.section
where target.course_id = a.course_id
  and target.name = k.name;

-- Merge outgoing prerequisite arrays from legacy topics into the replacement
-- subchapter. References to another removed legacy topic are translated to that
-- topic's canonical replacement before the old UUID disappears.
with dependency_values as (
  select
    s.course_id,
    s.section,
    coalesce(dep_target.id, dep_id) as mapped_dependency
  from public._ke04_mooli4_topic_state_stage s
  cross join lateral unnest(coalesce(s.dependencies,'{}'::uuid[])) dep_id
  left join public._ke04_mooli4_topic_state_stage dep_stage on dep_stage.old_id = dep_id
  left join _ke04_hardening_topics dep_kind on dep_kind.section = dep_stage.section
  left join public.topics dep_target
    on dep_target.course_id = s.course_id
   and dep_target.name = dep_kind.name
), dependency_sets as (
  select course_id,section,array_agg(distinct mapped_dependency) as dependencies
  from dependency_values
  group by course_id,section
)
update public.topics target
set dependencies = (
  select coalesce(array_agg(distinct x.id) filter (where x.id <> target.id),'{}'::uuid[])
  from (
    select unnest(coalesce(target.dependencies,'{}'::uuid[])) as id
    union
    select unnest(coalesce(d.dependencies,'{}'::uuid[])) as id
  ) x
)
from dependency_sets d
join _ke04_hardening_topics k on k.section = d.section
where target.course_id = d.course_id
  and target.name = k.name;

-- Merge retention rows that temporarily collided after multiple broad topics
-- were repointed to one subchapter, then restore the original uniqueness rule.
create temporary table _ke04_retention_merged on commit drop as
select
  min(r.id) as keep_id,
  r.owner_id,
  r.course_id,
  r.topic_id,
  r.calculated_for,
  max(r.target_retention) as target_retention,
  max(r.estimated_retention) as estimated_retention,
  max(r.recommended_minutes) as recommended_minutes,
  max(r.minimum_minutes) as minimum_minutes,
  max(r.marginal_value) as marginal_value,
  (array_agg(r.reason order by r.created_at desc, r.id) filter (where r.reason is not null))[1] as reason,
  max(case r.evidence_confidence
        when 'high' then 4 when 'medium' then 3 when 'low' then 2 else 1 end) as confidence_rank,
  min(r.created_at) as created_at
from public.retention_targets r
join public.topics t on t.id = r.topic_id
join public.courses c on c.id = t.course_id and upper(c.code) = 'KE04'
group by r.owner_id,r.course_id,r.topic_id,r.calculated_for
having count(*) > 1;

update public.retention_targets r
set
  target_retention = m.target_retention,
  estimated_retention = m.estimated_retention,
  recommended_minutes = m.recommended_minutes,
  minimum_minutes = m.minimum_minutes,
  marginal_value = m.marginal_value,
  reason = m.reason,
  evidence_confidence = case m.confidence_rank
    when 4 then 'high' when 3 then 'medium' when 2 then 'low' else 'very_low' end,
  created_at = m.created_at
from _ke04_retention_merged m
where r.id = m.keep_id;

delete from public.retention_targets r
using _ke04_retention_merged m
where r.owner_id = m.owner_id
  and r.course_id = m.course_id
  and r.topic_id = m.topic_id
  and r.calculated_for = m.calculated_for
  and r.id <> m.keep_id;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.retention_targets'::regclass
      and conname = 'retention_targets_owner_id_topic_id_calculated_for_key'
  ) then
    alter table public.retention_targets
      add constraint retention_targets_owner_id_topic_id_calculated_for_key
      unique (owner_id,topic_id,calculated_for);
  end if;
end
$$;

-- Rewrite only titles that are known generated old-topic titles. Custom titles
-- such as "Harjoituskoe ja virheiden läpikäynti" remain untouched.
update public.plan_items p
set title = case
  when p.title = s.old_name then k.name
  else k.name || substring(p.title from char_length(s.old_name) + 1)
end
from public._ke04_mooli4_plan_stage s
join _ke04_hardening_topics k on k.section = s.section
where p.id = s.plan_item_id
  and (
    p.title = s.old_name
    or p.title like s.old_name || ' – %'
    or p.title like s.old_name || ' - %'
  );

-- Prompt-level carbohydrate evidence must beat stale inherited subtopic metadata.
-- In particular KE04-BIO-040 starts with "Tärkkelyksestä" and belongs to 5.1.
with carbohydrate_questions as (
  select q.id,t.id as topic_id,k.section,k.unit_no,k.name
  from public.question_bank q
  join public.courses c on c.id = q.course_id and upper(c.code) = 'KE04'
  join _ke04_hardening_topics k on k.section = '5.1'
  join public.topics t on t.course_id = q.course_id and t.name = k.name
  where q.module_code = 'KE04'
    and coalesce((q.metadata->>'chapter')::integer,0) = 15
    and lower(q.prompt) ~ '(hiilihydra|glukoosi|sakkar|tärkkely|selluloosa|glykogeeni)'
)
update public.question_bank q
set topic_id = x.topic_id,
    metadata = coalesce(q.metadata,'{}'::jsonb) || jsonb_build_object(
      'textbookSection',x.section,
      'textbookUnit',x.unit_no,
      'textbookTopicName',x.name
    )
from carbohydrate_questions x
where q.id = x.id;

-- Keep all question-linked evidence aligned after the classification correction.
update public.question_user_state s
set topic_id = q.topic_id, updated_at = now()
from public.question_bank q
where s.question_id = q.id
  and q.module_code = 'KE04'
  and s.topic_id is distinct from q.topic_id;

update public.practice_attempts a
set topic_id = q.topic_id
from public.question_bank q
where a.question_bank_id = q.id
  and q.module_code = 'KE04'
  and a.topic_id is distinct from q.topic_id;

update public.pretest_attempts p
set topic_id = q.topic_id
from public.question_bank q
where p.question_bank_id = q.id
  and q.module_code = 'KE04'
  and p.topic_id is distinct from q.topic_id;

update public.mastery_evidence e
set topic_id = a.topic_id
from public.practice_attempts a
where e.attempt_id = a.id
  and e.topic_id is distinct from a.topic_id;

update public.error_observations e
set topic_id = a.topic_id
from public.practice_attempts a
where e.attempt_id = a.id
  and e.topic_id is distinct from a.topic_id;

update public.calibration_observations c
set topic_id = a.topic_id
from public.practice_attempts a
where c.attempt_id = a.id
  and c.topic_id is distinct from a.topic_id;

update public.learning_events e
set topic_id = a.topic_id
from public.practice_attempts a
where e.attempt_id = a.id
  and e.topic_id is distinct from a.topic_id;

-- Durable compatibility guard for clients that still contain the old broad
-- KE04 provisioner. A stale insert is suppressed and the 14 canonical Mooli 4
-- subchapters are provisioned instead, so old topics can never reappear.
create or replace function public.ke04_enforce_mooli4_topics()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  course_owner uuid;
begin
  select c.owner_id into course_owner
  from public.courses c
  where c.id = new.course_id and upper(c.code) = 'KE04';

  if course_owner is null then
    return new;
  end if;

  if new.name in (
    'Reaktioyhtälöt ja tasapainotus','Stoikiometria','Reaktion saanto',
    'Rajoittava tekijä','Ideaalikaasu ja kaasustoikiometria',
    'Saostumis- ja hajoamisreaktiot','Protoninsiirto, neutraloituminen ja titraus',
    'Palamisreaktiot','Substituutioreaktiot','Additioreaktiot',
    'Eliminaatioreaktiot','Kondensaatioreaktiot','Hydrolyysireaktiot',
    'Polymeroituminen ja polymeerit','Biomolekyylit'
  ) then
    insert into public.topics(owner_id,course_id,name,position,weight,importance,materials)
    select course_owner,new.course_id,v.name,v.position,v.weight,v.importance,v.materials
    from (values
      (1,'1.1 Reaktioyhtälön kirjoittaminen ja tasapainottaminen',8::numeric,5,'Mooli 4 s. 14–26'),
      (2,'1.2 Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto',18::numeric,5,'Mooli 4 s. 27–37'),
      (3,'1.3 Reaktion rajoittava tekijä',9::numeric,5,'Mooli 4 s. 38–45'),
      (4,'1.4 Kaasureaktioiden stoikiometria – ideaalikaasun tilanyhtälö',8::numeric,4,'Mooli 4 s. 46–57'),
      (5,'2.1 Reaktiotyypit',17::numeric,5,'Mooli 4 s. 63–86'),
      (6,'3.1 Substituutioreaktio',5::numeric,3,'Mooli 4 s. 92–102'),
      (7,'3.2 Additio- ja eliminaatioreaktio',10::numeric,4,'Mooli 4 s. 103–113'),
      (8,'3.3 Kondensaatio- ja hydrolyysireaktio',10::numeric,4,'Mooli 4 s. 114–127'),
      (9,'4.1 Polymeerit ja polymeroitumisreaktiot',5::numeric,4,'Mooli 4 s. 134–147'),
      (10,'4.2 Muovit ja tekokuidut ovat polymeerien ja lisäaineiden seoksia',3::numeric,3,'Mooli 4 s. 148–158'),
      (11,'5.1 Hiilihydraatit',2::numeric,3,'Mooli 4 s. 164–176'),
      (12,'5.2 Aminohapot ja proteiinit',2::numeric,4,'Mooli 4 s. 177–188'),
      (13,'5.3 Nukleiinihapot',1::numeric,3,'Mooli 4 s. 189–196'),
      (14,'5.4 Lipidit',2::numeric,3,'Mooli 4 s. 197–207')
    ) as v(position,name,weight,importance,materials)
    where not exists (
      select 1 from public.topics t
      where t.course_id = new.course_id and t.name = v.name
    );
    return null;
  end if;

  return new;
end
$$;

drop trigger if exists ke04_enforce_mooli4_topics_before_insert on public.topics;
create trigger ke04_enforce_mooli4_topics_before_insert
before insert on public.topics
for each row execute function public.ke04_enforce_mooli4_topics();

-- Final invariants: exactly the canonical school-facing taxonomy, no legacy
-- broad rows, preserved retention uniqueness and the known starch edge case.
do $$
declare
  bad_course uuid;
  legacy_count integer;
  bad_starch integer;
begin
  select c.id into bad_course
  from public.courses c
  where upper(c.code) = 'KE04'
    and (
      (select count(*) from public.topics t
       where t.course_id = c.id and t.name in (select name from _ke04_hardening_topics)) <> 14
      or
      (select coalesce(sum(t.weight),0) from public.topics t
       where t.course_id = c.id and t.name in (select name from _ke04_hardening_topics)) <> 100
    )
  limit 1;

  if bad_course is not null then
    raise exception 'KE04 hardening invariant failed for course %',bad_course;
  end if;

  select count(*) into legacy_count
  from public.topics t
  join public.courses c on c.id = t.course_id and upper(c.code) = 'KE04'
  where t.name in (
    'Reaktioyhtälöt ja tasapainotus','Stoikiometria','Reaktion saanto',
    'Rajoittava tekijä','Ideaalikaasu ja kaasustoikiometria',
    'Saostumis- ja hajoamisreaktiot','Protoninsiirto, neutraloituminen ja titraus',
    'Palamisreaktiot','Substituutioreaktiot','Additioreaktiot',
    'Eliminaatioreaktiot','Kondensaatioreaktiot','Hydrolyysireaktiot',
    'Polymeroituminen ja polymeerit','Biomolekyylit'
  );
  if legacy_count <> 0 then
    raise exception 'KE04 legacy topics remain after hardening: %',legacy_count;
  end if;

  select count(*) into bad_starch
  from public.question_bank q
  join public.courses c on c.id = q.course_id and upper(c.code) = 'KE04'
  join public.topics t on t.id = q.topic_id
  where q.module_code = 'KE04'
    and lower(q.prompt) ~ 'tärkkely'
    and t.name <> '5.1 Hiilihydraatit';
  if bad_starch <> 0 then
    raise exception 'KE04 starch questions mapped outside 5.1: %',bad_starch;
  end if;
end
$$;

drop table if exists public._ke04_mooli4_plan_stage;
drop table if exists public._ke04_mooli4_topic_state_stage;
