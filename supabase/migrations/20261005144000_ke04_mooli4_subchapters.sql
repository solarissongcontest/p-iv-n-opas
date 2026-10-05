-- Align KE04 study topics with the real Mooli 4 (LOPS21) textbook subchapters.
--
-- The existing 15-topic question-bank taxonomy is intentionally NOT discarded:
-- it remains in question_bank.metadata.topicName/subtopic/skills for adaptive
-- practice.  topics, Planner and study sessions instead use the 14 textbook
-- subchapters that are actually covered on different lessons at school.

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

-- Old broad skill/topic labels -> the school-facing Mooli 4 subchapter.
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

-- Create all canonical textbook subchapters for every KE04 course, preserving
-- owner scoping.  Existing canonical rows are reused, making the migration
-- safe for preview/test databases that may already contain them.
insert into public.topics(
  owner_id, course_id, name, position, weight, importance, materials
)
select
  c.owner_id,
  c.id,
  k.name,
  k.position,
  k.weight,
  k.importance,
  k.materials
from public.courses c
cross join _ke04_textbook_topics k
where upper(c.code) = 'KE04'
  and not exists (
    select 1
    from public.topics t
    where t.course_id = c.id
      and t.name = k.name
  );

-- Canonical metadata is authoritative even if a row already existed.
update public.topics t
set
  owner_id = c.owner_id,
  position = k.position,
  weight = k.weight,
  importance = k.importance,
  materials = k.materials
from public.courses c, _ke04_textbook_topics k
where upper(c.code) = 'KE04'
  and t.course_id = c.id
  and t.name = k.name;

-- Carry useful aggregate learning state from the old broad topics into the new
-- school-facing topic.  Merged sections use conservative averages for mastery
-- and sum actual study/evidence counts.
with old_state as (
  select
    t.course_id,
    m.section,
    round(
      sum(t.progress * greatest(coalesce(t.weight, 0), 1)) /
      nullif(sum(greatest(coalesce(t.weight, 0), 1)), 0)
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
  group by t.course_id, m.section
)
update public.topics target
set
  progress = greatest(target.progress, s.progress),
  school_covered = target.school_covered or s.school_covered,
  self_level = greatest(target.self_level, s.self_level),
  verified_level = greatest(target.verified_level, s.verified_level),
  last_review = greatest(target.last_review, s.last_review),
  next_review = case
    when target.next_review is null then s.next_review
    when s.next_review is null then target.next_review
    else least(target.next_review, s.next_review)
  end,
  basic_successes = target.basic_successes + s.basic_successes,
  exam_successes = target.exam_successes + s.exam_successes,
  delayed_successes = target.delayed_successes + s.delayed_successes,
  study_minutes = target.study_minutes + s.study_minutes,
  retrieval_attempts = target.retrieval_attempts + s.retrieval_attempts,
  retrieval_failures = target.retrieval_failures + s.retrieval_failures,
  mastery_uncertainty = greatest(target.mastery_uncertainty, s.mastery_uncertainty),
  last_retrieval_at = greatest(target.last_retrieval_at, s.last_retrieval_at)
from old_state s
join _ke04_textbook_topics k on k.section = s.section
where target.course_id = s.course_id
  and target.name = k.name;

-- Build an ID replacement table so all foreign keys that point at an old KE04
-- topic are moved to the corresponding textbook subchapter before deletion.
create temporary table _ke04_topic_replacements (
  old_id uuid primary key,
  new_id uuid not null
) on commit drop;

insert into _ke04_topic_replacements(old_id,new_id)
select old.id, canonical.id
from public.topics old
join public.courses c on c.id = old.course_id and upper(c.code) = 'KE04'
join _ke04_old_topic_map m on m.old_name = old.name
join _ke04_textbook_topics k on k.section = m.section
join public.topics canonical
  on canonical.course_id = old.course_id
 and canonical.name = k.name;

-- Move every ordinary FK that references topics(id).  This protects study
-- sessions, planner items, mistakes, practice attempts, question state and any
-- future table that adds a simple FK to topics without having to hand-maintain
-- a brittle list here.
do $$
declare
  fk record;
begin
  for fk in
    select
      con.conrelid::regclass as table_name,
      att.attname as column_name
    from pg_constraint con
    join pg_attribute att
      on att.attrelid = con.conrelid
     and att.attnum = con.conkey[1]
    where con.contype = 'f'
      and con.confrelid = 'public.topics'::regclass
      and array_length(con.conkey, 1) = 1
      and array_length(con.confkey, 1) = 1
  loop
    execute format(
      'update %s row_to_fix set %I = replacement.new_id from _ke04_topic_replacements replacement where row_to_fix.%I = replacement.old_id',
      fk.table_name,
      fk.column_name,
      fk.column_name
    );
  end loop;
end
$$;

-- The question bank keeps its 15 skill buckets in metadata, but the actual
-- topic_id is refined to the textbook subchapter.  Biomolecule questions are
-- split across 5.1–5.4 using the content itself because the old bank stored all
-- of them under one broad 'Biomolekyylit' topic.
with question_sections as (
  select
    q.id,
    q.course_id,
    case coalesce((q.metadata->>'chapter')::integer, 0)
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
  select qs.id, qs.course_id, qs.section, k.unit_no, k.name, t.id as topic_id
  from question_sections qs
  join _ke04_textbook_topics k on k.section = qs.section
  join public.topics t on t.course_id = qs.course_id and t.name = k.name
)
update public.question_bank q
set
  topic_id = m.topic_id,
  metadata = coalesce(q.metadata, '{}'::jsonb) || jsonb_build_object(
    'textbookSection', m.section,
    'textbookUnit', m.unit_no,
    'textbookTopicName', m.name
  )
from mapped m
where q.id = m.id;

-- Keep question-level user state and attempts consistent with the remapped
-- question bank.  Attempts not originating from a bank question retain the
-- conservative old-topic replacement above.
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

-- Old broad rows are no longer school-facing topics. All simple foreign keys
-- have been repointed, so they can now be removed without losing study data.
delete from public.topics old
using _ke04_topic_replacements replacement
where old.id = replacement.old_id;

-- Final invariant: every KE04 course has exactly the canonical 14 subchapters
-- with weights totalling 100.  Raise during migration rather than shipping a
-- half-updated planner that looks plausible while being wrong.
do $$
declare
  bad_course uuid;
begin
  select c.id into bad_course
  from public.courses c
  where upper(c.code) = 'KE04'
    and (
      (select count(*) from public.topics t where t.course_id = c.id and t.name in (select name from _ke04_textbook_topics)) <> 14
      or
      (select coalesce(sum(t.weight),0) from public.topics t where t.course_id = c.id and t.name in (select name from _ke04_textbook_topics)) <> 100
    )
  limit 1;

  if bad_course is not null then
    raise exception 'KE04 Mooli 4 topic migration invariant failed for course %', bad_course;
  end if;
end
$$;
