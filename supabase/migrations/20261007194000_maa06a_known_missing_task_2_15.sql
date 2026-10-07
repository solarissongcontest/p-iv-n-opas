-- The teacher's "Tukea tehtävien valintaan" table is a selection aid, not a
-- complete inventory of every textbook exercise. 2.15 is a real chapter-2
-- exercise and must be loggable even though it is not present in that table.
INSERT INTO public.course_exercises (
  owner_id,
  course_id,
  topic_id,
  code,
  source,
  source_group,
  section_code,
  chapter,
  level,
  teacher_recommended,
  counts_toward_goal,
  estimated_load,
  sort_order,
  metadata
)
SELECT
  c.owner_id,
  c.id,
  t.id,
  '2.15',
  'textbook',
  'chapter',
  'OSA 1',
  2,
  NULL,
  false,
  true,
  1.3,
  52015,
  '{"knownMissingFromSelectionTable":true}'::jsonb
FROM public.courses c
LEFT JOIN LATERAL (
  SELECT id
  FROM public.topics
  WHERE course_id = c.id
    AND name = 'Raja-arvon laskeminen'
  ORDER BY position
  LIMIT 1
) t ON true
WHERE c.code = 'MAA06A'
ON CONFLICT (owner_id, course_id, source, code) DO NOTHING;
