-- Align KE04 study topics with the real Mooli 4 (LOPS21) textbook subchapters.
-- The 15 broad question-bank skill buckets remain in question metadata, while
-- school progress, Planner and study sessions use the 14 numbered subchapters.

create temporary table _ke04_textbook_topics (
  section text primary key,
  unit_no integer not null,
  position integer not null,
  name text not null,
  weight numeric not null,
  importance integer not null,
  materials text not null
) on commit drop;

insert into _ke04_textbook_topics(section,unit_no,position,name,weight,importance,materials) values
  ('1.1',1,1,'1.1 Reaktioyhtälön kirjoittaminen ja tasapainottaminen',8,5,'Mooli 4 s. 14–26'),
  ('1.2',1,2,'1.2 Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto',18,5,'Mooli 4 s. 27–37'),
  ('1.3',1,3,'1.3 Reaktion rajoittava tekijä',9,5,'Mooli 4 s. 38–45'),
  ('1.4',1,4,'1.4 Kaasureaktioiden stoikiometria – ideaalikaasun tilanyhtälö',8,4,'Mooli 4 s. 46–57'),
  ('2.1',2,5,'2.1 Reaktiotyypit',17,5,'Mooli 4 s. 63–86'),
  ('3.1',3,6,'3.1 Substituutioreaktio',5,3,'Mooli 4 s. 92–102'),
  ('3.2',3,7,'3.2 Additio- ja eliminaatioreaktio',10,4,'Mooli 4 s. 103–113'),
  ('3.3',3,8,'3.3 Kondensaatio- ja hydrolyysireaktio',10,4,'Mooli 4 s. 114–127'),
  ('4.1',4,9,'4.1 Polymeerit ja polymeroitumisreaktiot',5,4,'Mooli 4 s. 134–147'),
  ('4.2',4,10,'4.2 Muovit ja tekokuidut ovat polymeerien ja lisäaineiden seoksia',3,3,'Mooli 4 s. 148–158'),
  ('5.1',5,11,'5.1 Hiilihydraatit',2,3,'Mooli 4 s. 164–176'),
  ('5.2',5,12,'5.2 Aminohapot ja proteiinit',2,4,'Mooli 4 s. 177–188'),
  ('5.3',5,13,'5.3 Nukleiinihapot',1,3,'Mooli 4 s. 189–196'),
  ('5.4',5,14,'5.4 Lipidit',2,3,'Mooli 4 s. 197–207');

create temporary table _ke04_old_topic_map (
  old_name text primary key,
  section text not null references _ke04_textbook_topics(section)
) on commit drop;

insert into _ke04_old_topic_map(old_name,section) values
  ('Reaktioyhtälöt ja tasapainotus','1.1'),
  ('Stoikiometria','1.2'),
  ('Reaktion saanto','1.2'),
  ('Rajoittava tekijä','1.3'),
  ('Ideaalikaasu ja kaasustoikiometria','1.4'),
  ('Saostumis- ja hajoamisreaktiot','2.1'),
  ('Protoninsiirto, neutraloituminen ja titraus','2.1'),
  ('Palamisreaktiot','2.1'),
  ('Substituutioreaktiot','3.1'),
  ('Additioreaktiot','3.2'),
  ('Eliminaatioreaktiot','3.2'),
  ('Kondensaatioreaktiot','3.3'),
  ('Hydrolyysireaktiot','3.3'),
  ('Polymeroituminen ja polymeerit','4.1'),
  ('Biomolekyylit','5.1');

-- Ensure the 14 canonical textbook topics exist for every KE04 course.
insert into public.topics(
  owner_id, course_id, name, position, weight, importance, materials
)
select c.owner_id, c.id, k.name, k.position, k.weight, k.importance, k.materials
from public.courses c
cross join _ke04_textbook_topics k
where upper(c.code) = 'KE04'
  and not exists (
    select 1 from public.topics t
    where t.course_id = c.id and t.name = k.name
  );

update public.topics t
set owner_id = c.owner_id,
    position = k.position,
    weight = k.weight,
    importance = k.importance,
    materials = k.materials
from public.courses c, _ke04_textbook_topics k
where upper(c.code) = 'KE04'
  and t.course_id = c.id
  and t.name = k.name;

-- Carry aggregate state from old broad topics into their school-facing section.
with old_state as (
  select
    t.course_id,
    m.section,
    round(
      sum(t.progress * greatest(coalesce(t.weight,0),1)) /
      nullif(sum(greatest(coalesce(t.weight,0),1)),0)
    )::integer as progress,
    bool_and(t.school_covered) as school_covered,
    floor(avg(t.self_level))::integer as self_level,
    floor(avg(t.verified_level))::integer as verified_level,
    max(t.last_review) as last_review,
    min(t.next_review) as next_review,
    sum(t.basic_successes)::integer as basic_successes,
    sum(t.exam_successes)::integer as exam_successes,
    sum(t.delayed_successes)::integer as delayed_successes,
    sum(t.study_minutes)::integer as study_minutes,
    sum(t.retrieval_attempts)::integer as retrieval_attempts,
    sum(t.retrieval_failures)::integer as retrieval_failures,
    max(t.mastery_uncertainty) as mastery_uncertainty,
    max(t.last_retrieval_at) as last_retrieval_at
  from public.topics t
  join public.courses c on c.id = t.course_id and upper(c.code) = 'KE04'
  join _ke04_old_topic_map m on m.old_name = t.name
  group by t.course_id,m.section
)
update public.topics target
set progress = greatest(target.progress,s.progress),
    school_covered = target.school_covered or s.school_covered,
    self_level = greatest(target.self_level,s.self_level),
    verified_level = greatest(target.verified_level,s.verified_level),
    last_review = greatest(target.last_review,s.last_review),
    next_review = case
      when target.next_review is null then s.next_review
      when s.next_review is null then target.next_review
      else least(target.next_review,s.next_review)
    end,
    basic_successes = target.basic_successes + s.basic_successes,
    exam_successes = target.exam_successes + s.exam_successes,
    delayed_successes = target.delayed_successes + s.delayed_successes,
    study_minutes = target.study_minutes + s.study_minutes,
    retrieval_attempts = target.retrieval_attempts + s.retrieval_attempts,
    retrieval_failures = target.retrieval_failures + s.retrieval_failures,
    mastery_uncertainty = greatest(target.mastery_uncertainty,s.mastery_uncertainty),
    last_retrieval_at = greatest(target.last_retrieval_at,s.last_retrieval_at)
from old_state s
join _ke04_textbook_topics k on k.section = s.section
where target.course_id = s.course_id
  and target.name = k.name;

create temporary table _ke04_topic_replacements (
  old_id uuid primary key,
  new_id uuid not null
) on commit drop;

insert into _ke04_topic_replacements(old_id,new_id)
select old.id,canonical.id
from public.topics old
join public.courses c on c.id = old.course_id and upper(c.code) = 'KE04'
join _ke04_old_topic_map m on m.old_name = old.name
join _ke04_textbook_topics k on k.section = m.section
join public.topics canonical
  on canonical.course_id = old.course_id
 and canonical.name = k.name;

-- Merge-safe handling for normalized dependency rows.
insert into public.topic_dependencies(
  owner_id,topic_id,depends_on_topic_id,relation_type,created_at
)
select distinct on (x.owner_id,x.mapped_topic,x.mapped_dependency,x.relation_type)
  x.owner_id,x.mapped_topic,x.mapped_dependency,x.relation_type,x.created_at
from (
  select
    d.owner_id,
    coalesce(rt.new_id,d.topic_id) as mapped_topic,
    coalesce(rd.new_id,d.depends_on_topic_id) as mapped_dependency,
    d.relation_type,
    d.created_at
  from public.topic_dependencies d
  left join _ke04_topic_replacements rt on rt.old_id = d.topic_id
  left join _ke04_topic_replacements rd on rd.old_id = d.depends_on_topic_id
  where rt.old_id is not null or rd.old_id is not null
) x
where x.mapped_topic <> x.mapped_dependency
order by x.owner_id,x.mapped_topic,x.mapped_dependency,x.relation_type,x.created_at
on conflict (owner_id,topic_id,depends_on_topic_id,relation_type) do nothing;

delete from public.topic_dependencies d
where exists (
  select 1 from _ke04_topic_replacements r
  where r.old_id = d.topic_id or r.old_id = d.depends_on_topic_id
);

-- Merge-safe handling for v5 recommendation state, which is unique per topic.
with merged as (
  select
    s.owner_id,
    max(s.course_id::text)::uuid as course_id,
    r.new_id as topic_id,
    max(s.desired_retention) as desired_retention,
    max(s.current_retention) as current_retention,
    max(s.recommended_minutes) as recommended_minutes,
    bool_or(s.stop_today) as stop_today,
    min(s.next_useful_date) as next_useful_date,
    max(s.recommendation_confidence) as recommendation_confidence,
    max(s.recommendation_reason) as recommendation_reason,
    max(s.model_version) as model_version,
    max(s.updated_at) as updated_at
  from public.learning_policy_states s
  join _ke04_topic_replacements r on r.old_id = s.topic_id
  group by s.owner_id,r.new_id
)
insert into public.learning_policy_states(
  owner_id,course_id,topic_id,desired_retention,current_retention,
  recommended_minutes,stop_today,next_useful_date,
  recommendation_confidence,recommendation_reason,model_version,updated_at
)
select
  owner_id,course_id,topic_id,desired_retention,current_retention,
  recommended_minutes,stop_today,next_useful_date,
  recommendation_confidence,recommendation_reason,model_version,updated_at
from merged
on conflict (owner_id,topic_id) do update set
  desired_retention = greatest(public.learning_policy_states.desired_retention,excluded.desired_retention),
  current_retention = greatest(public.learning_policy_states.current_retention,excluded.current_retention),
  recommended_minutes = greatest(public.learning_policy_states.recommended_minutes,excluded.recommended_minutes),
  stop_today = public.learning_policy_states.stop_today or excluded.stop_today,
  next_useful_date = case
    when public.learning_policy_states.next_useful_date is null then excluded.next_useful_date
    when excluded.next_useful_date is null then public.learning_policy_states.next_useful_date
    else least(public.learning_policy_states.next_useful_date,excluded.next_useful_date)
  end,
  recommendation_confidence = greatest(public.learning_policy_states.recommendation_confidence,excluded.recommendation_confidence),
  recommendation_reason = coalesce(excluded.recommendation_reason,public.learning_policy_states.recommendation_reason),
  model_version = greatest(public.learning_policy_states.model_version,excluded.model_version),
  updated_at = greatest(public.learning_policy_states.updated_at,excluded.updated_at);

delete from public.learning_policy_states s
where exists (select 1 from _ke04_topic_replacements r where r.old_id = s.topic_id);

-- UUID-array references are not foreign keys and must be rewritten explicitly.
update public.study_materials sm
set topic_ids = (
  select coalesce(array_agg(distinct coalesce(r.new_id,value)), '{}'::uuid[])
  from unnest(sm.topic_ids) value
  left join _ke04_topic_replacements r on r.old_id = value
)
where exists (
  select 1
  from unnest(sm.topic_ids) value
  join _ke04_topic_replacements r on r.old_id = value
);

update public.practice_attempts a
set discrimination_topic_ids = (
  select coalesce(array_agg(distinct coalesce(r.new_id,value)), '{}'::uuid[])
  from unnest(a.discrimination_topic_ids) value
  left join _ke04_topic_replacements r on r.old_id = value
)
where exists (
  select 1
  from unnest(a.discrimination_topic_ids) value
  join _ke04_topic_replacements r on r.old_id = value
);

update public.topics t
set dependencies = (
  select coalesce(array_agg(distinct coalesce(r.new_id,value)), '{}'::uuid[])
  from unnest(t.dependencies) value
  left join _ke04_topic_replacements r on r.old_id = value
)
where not exists (select 1 from _ke04_topic_replacements own where own.old_id = t.id)
  and exists (
    select 1
    from unnest(t.dependencies) value
    join _ke04_topic_replacements r on r.old_id = value
  );

-- Repoint all remaining simple topic foreign keys. Merge-sensitive tables were
-- handled above to avoid unique-constraint collisions.
do $$
declare
  fk record;
begin
  for fk in
    select con.conrelid::regclass as table_name,
           att.attname as column_name
    from pg_constraint con
    join pg_attribute att
      on att.attrelid = con.conrelid
     and att.attnum = con.conkey[1]
    where con.contype = 'f'
      and con.confrelid = 'public.topics'::regclass
      and array_length(con.conkey,1) = 1
      and array_length(con.confkey,1) = 1
      and con.conrelid <> 'public.topic_dependencies'::regclass
      and con.conrelid <> 'public.learning_policy_states'::regclass
  loop
    execute format(
      'update %s row_to_fix set %I = replacement.new_id from _ke04_topic_replacements replacement where row_to_fix.%I = replacement.old_id',
      fk.table_name,fk.column_name,fk.column_name
    );
  end loop;
end
$$;

-- Refine question-bank links from the broad skill taxonomy to exact textbook
-- sections. Original topicName/subtopic/skills remain untouched in metadata.
with question_sections as (
  select
    q.id,
    q.course_id,
    case coalesce((q.metadata->>'chapter')::integer,0)
      when 1 then '1.1'
      when 2 then '1.2'
      when 3 then '1.2'
      when 4 then '1.3'
      when 5 then '1.4'
      when 6 then '2.1'
      when 7 then '2.1'
      when 8 then '2.1'
      when 9 then '3.1'
      when 10 then '3.2'
      when 11 then '3.2'
      when 12 then '3.3'
      when 13 then '3.3'
      when 14 then case
        when lower(coalesce(q.metadata->>'subtopic','') || ' ' || q.prompt) ~ '(muovi|tekokuit|lisäaine)'
          then '4.2'
        else '4.1'
      end
      when 15 then case
        when lower(coalesce(q.metadata->>'subtopic','') || ' ' || q.prompt) ~ '(nuklei|nukleot|(^|[^a-z])dna([^a-z]|$)|(^|[^a-z])rna([^a-z]|$))'
          and lower(q.prompt) !~ '(tärkkelys|glukoosi|polysakkaridi)'
          then '5.3'
        when lower(coalesce(q.metadata->>'subtopic','') || ' ' || q.prompt) ~ '(aminohapp|protei|peptid|denatur)'
          then '5.2'
        when lower(coalesce(q.metadata->>'subtopic','') || ' ' || q.prompt) ~ '(rasvahapp|trigly|lipid|rasva|glyserol)'
          then '5.4'
        when lower(coalesce(q.metadata->>'subtopic','') || ' ' || q.prompt) ~ '(hiilihydra|glukoosi|sakkar|tärkkelys|selluloosa|glykogeeni)'
          then '5.1'
        when lower(coalesce(q.metadata->>'subtopic','')) like '%funktionaaliset ryhmät biomolekyyleissä%'
          then '5.1'
        else '5.4'
      end
      else null
    end as section
  from public.question_bank q
  join public.courses c on c.id = q.course_id and upper(c.code) = 'KE04'
  where q.module_code = 'KE04'
), mapped as (
  select qs.id,qs.course_id,qs.section,k.unit_no,k.name,t.id as topic_id
  from question_sections qs
  join _ke04_textbook_topics k on k.section = qs.section
  join public.topics t on t.course_id = qs.course_id and t.name = k.name
)
update public.question_bank q
set topic_id = m.topic_id,
    metadata = coalesce(q.metadata,'{}'::jsonb) || jsonb_build_object(
      'textbookSection',m.section,
      'textbookUnit',m.unit_no,
      'textbookTopicName',m.name
    )
from mapped m
where q.id = m.id;

-- Keep question-level state and attempts aligned with the refined mapping.
update public.question_user_state s
set topic_id = q.topic_id,
    updated_at = now()
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

-- Evidence attached to a practice attempt follows that attempt's final section.
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

-- Old broad rows are no longer school-facing topics.
delete from public.topics old
using _ke04_topic_replacements replacement
where old.id = replacement.old_id;

-- Fail loudly instead of accepting a plausible-looking half migration.
do $$
declare
  bad_course uuid;
begin
  select c.id into bad_course
  from public.courses c
  where upper(c.code) = 'KE04'
    and (
      (select count(*) from public.topics t
       where t.course_id = c.id
         and t.name in (select name from _ke04_textbook_topics)) <> 14
      or
      (select coalesce(sum(t.weight),0) from public.topics t
       where t.course_id = c.id
         and t.name in (select name from _ke04_textbook_topics)) <> 100
    )
  limit 1;

  if bad_course is not null then
    raise exception 'KE04 Mooli 4 topic migration invariant failed for course %',bad_course;
  end if;
end
$$;
