-- Preserve all legacy KE04 state before the Mooli 4 subchapter cutover.
-- This staging data survives across migration files and is removed by the
-- hardening migration immediately after the cutover completes.

 drop table if exists public._ke04_mooli4_topic_state_stage;
 create table public._ke04_mooli4_topic_state_stage (
   old_id uuid primary key,
   owner_id uuid not null,
   course_id uuid not null,
   old_name text not null,
   section text not null,
   dependencies uuid[] not null default '{}',
   last_retrieval_result text,
   last_retrieval_confidence smallint,
   last_retrieval_difficulty smallint,
   last_retrieval_at date,
   mastery_confidence real,
   evidence_count integer,
   strong_evidence_count integer,
   recall_strength real,
   application_strength real,
   retention_strength real,
   forgetting_risk real,
   exam_relevance real,
   learning_state_updated_at timestamptz,
   understanding_strength real,
   fluency_strength real,
   calibration_strength real,
   blind_spot boolean,
   retention_target real,
   discrimination_strength real,
   transfer_level smallint
 );

 insert into public._ke04_mooli4_topic_state_stage (
   old_id, owner_id, course_id, old_name, section, dependencies,
   last_retrieval_result, last_retrieval_confidence, last_retrieval_difficulty,
   last_retrieval_at, mastery_confidence, evidence_count, strong_evidence_count,
   recall_strength, application_strength, retention_strength, forgetting_risk,
   exam_relevance, learning_state_updated_at, understanding_strength,
   fluency_strength, calibration_strength, blind_spot, retention_target,
   discrimination_strength, transfer_level
 )
 select
   t.id,
   t.owner_id,
   t.course_id,
   t.name,
   case t.name
     when 'Reaktioyhtälöt ja tasapainotus' then '1.1'
     when 'Stoikiometria' then '1.2'
     when 'Reaktion saanto' then '1.2'
     when 'Rajoittava tekijä' then '1.3'
     when 'Ideaalikaasu ja kaasustoikiometria' then '1.4'
     when 'Saostumis- ja hajoamisreaktiot' then '2.1'
     when 'Protoninsiirto, neutraloituminen ja titraus' then '2.1'
     when 'Palamisreaktiot' then '2.1'
     when 'Substituutioreaktiot' then '3.1'
     when 'Additioreaktiot' then '3.2'
     when 'Eliminaatioreaktiot' then '3.2'
     when 'Kondensaatioreaktiot' then '3.3'
     when 'Hydrolyysireaktiot' then '3.3'
     when 'Polymeroituminen ja polymeerit' then '4.1'
     when 'Biomolekyylit' then '5.1'
   end,
   coalesce(t.dependencies, '{}'::uuid[]),
   t.last_retrieval_result,
   t.last_retrieval_confidence,
   t.last_retrieval_difficulty,
   t.last_retrieval_at,
   t.mastery_confidence,
   t.evidence_count,
   t.strong_evidence_count,
   t.recall_strength,
   t.application_strength,
   t.retention_strength,
   t.forgetting_risk,
   t.exam_relevance,
   t.learning_state_updated_at,
   t.understanding_strength,
   t.fluency_strength,
   t.calibration_strength,
   t.blind_spot,
   t.retention_target,
   t.discrimination_strength,
   t.transfer_level
 from public.topics t
 join public.courses c on c.id = t.course_id and upper(c.code) = 'KE04'
 where t.name in (
   'Reaktioyhtälöt ja tasapainotus',
   'Stoikiometria',
   'Reaktion saanto',
   'Rajoittava tekijä',
   'Ideaalikaasu ja kaasustoikiometria',
   'Saostumis- ja hajoamisreaktiot',
   'Protoninsiirto, neutraloituminen ja titraus',
   'Palamisreaktiot',
   'Substituutioreaktiot',
   'Additioreaktiot',
   'Eliminaatioreaktiot',
   'Kondensaatioreaktiot',
   'Hydrolyysireaktiot',
   'Polymeroituminen ja polymeerit',
   'Biomolekyylit'
 );

 drop table if exists public._ke04_mooli4_plan_stage;
 create table public._ke04_mooli4_plan_stage (
   plan_item_id uuid primary key,
   old_name text not null,
   section text not null
 );

 insert into public._ke04_mooli4_plan_stage(plan_item_id, old_name, section)
 select
   p.id,
   t.name,
   s.section
 from public.plan_items p
 join public.topics t on t.id = p.topic_id
 join public._ke04_mooli4_topic_state_stage s on s.old_id = t.id;

-- The cutover can temporarily collapse multiple legacy retention rows onto the
-- same canonical subchapter/date. Remove the unique guard for exactly that
-- migration window; the hardening migration merges rows and restores it.
 alter table public.retention_targets
   drop constraint if exists retention_targets_owner_id_topic_id_calculated_for_key;
