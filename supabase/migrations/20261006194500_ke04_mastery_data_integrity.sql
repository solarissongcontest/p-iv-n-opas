-- KE04 mastery-data integrity repair.
--
-- 1) Remove the four known development/smoke practice attempts that were
--    accidentally written into the real KE04 1.2 learning history on
--    2026-10-05.
-- 2) Reset only that untouched 1.2 topic's derived mastery state after the
--    bad evidence is gone.
-- 3) Prevent duplicate topic rows inside the same course.
--
-- The repair intentionally identifies the polluted rows by their semantic
-- course/topic/prompt/time signature rather than generated UUIDs.

begin;

-- There are currently no duplicate (course_id, name) rows. Make that an
-- invariant so repeated/concurrent seeding cannot silently create two copies
-- of the same canonical topic inside one course.
create unique index if not exists topics_course_name_unique_idx
  on public.topics(course_id, name);

-- learning_events uses ON DELETE SET NULL for attempt_id. These four entries
-- are development artefacts, so remove them before deleting the attempts
-- instead of leaving anonymous fake history behind.
delete from public.learning_events le
where le.attempt_id in (
  select pa.id
  from public.practice_attempts pa
  join public.topics t on t.id = pa.topic_id
  join public.courses c on c.id = pa.course_id
  where c.code = 'KE04'
    and t.name = '1.2 Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto'
    and t.progress = 0
    and t.study_minutes = 0
    and pa.source = 'practice'
    and pa.created_at >= timestamptz '2026-10-05 09:06:00+00'
    and pa.created_at <  timestamptz '2026-10-05 09:09:00+00'
    and (
      (
        pa.attempt_type = 'short_answer'
        and pa.prompt = 'Kirjoita liuoksen ainemäärän kaava pitoisuuden c ja tilavuuden V avulla.'
      )
      or
      (
        pa.attempt_type = 'calculation'
        and pa.prompt = 'A→B suhteessa 1:1. A:ta reagoi 0,500 mol. Teoreettinen B-määrä?'
      )
    )
);

-- mastery_evidence is removed automatically through its ON DELETE CASCADE
-- relationship to practice_attempts.
delete from public.practice_attempts pa
using public.topics t, public.courses c
where t.id = pa.topic_id
  and c.id = pa.course_id
  and c.code = 'KE04'
  and t.name = '1.2 Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto'
  and t.progress = 0
  and t.study_minutes = 0
  and pa.source = 'practice'
  and pa.created_at >= timestamptz '2026-10-05 09:06:00+00'
  and pa.created_at <  timestamptz '2026-10-05 09:09:00+00'
  and (
    (
      pa.attempt_type = 'short_answer'
      and pa.prompt = 'Kirjoita liuoksen ainemäärän kaava pitoisuuden c ja tilavuuden V avulla.'
    )
    or
    (
      pa.attempt_type = 'calculation'
      and pa.prompt = 'A→B suhteessa 1:1. A:ta reagoi 0,500 mol. Teoreettinen B-määrä?'
    )
  );

-- Reset derived learning-state fields only when the topic now has no real
-- practice evidence and was never actually studied. This prevents the cleanup
-- from touching legitimate 1.2 work if any appeared between diagnosis and
-- migration execution.
update public.topics t
set
  verified_level = 0,
  basic_successes = 0,
  exam_successes = 0,
  delayed_successes = 0,
  last_review = null,
  next_review = null,
  retrieval_attempts = 0,
  retrieval_failures = 0,
  mastery_uncertainty = 1,
  mastery_confidence = 0,
  evidence_count = 0,
  strong_evidence_count = 0,
  recall_strength = 0,
  application_strength = 0,
  retention_strength = 0,
  understanding_strength = 0,
  fluency_strength = 0,
  calibration_strength = 0.5,
  blind_spot = false,
  discrimination_strength = 0,
  transfer_level = 0,
  learning_state_updated_at = null,
  last_retrieval_at = null,
  last_retrieval_result = null,
  last_retrieval_confidence = null,
  last_retrieval_difficulty = null,
  updated_at = now()
from public.courses c
where c.id = t.course_id
  and c.code = 'KE04'
  and t.name = '1.2 Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto'
  and t.progress = 0
  and t.study_minutes = 0
  and not exists (
    select 1
    from public.practice_attempts pa
    where pa.topic_id = t.id
      and coalesce(pa.is_pretest, false) = false
  );

commit;
