-- MAA06A exercise-count study model.
-- Adds a general, owner-scoped task bank so mathematics progress can be
-- measured from real textbook/worksheet exercises instead of elapsed time.

CREATE TABLE IF NOT EXISTS public.course_exercise_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL DEFAULT auth.uid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  target_count integer NOT NULL CHECK (target_count > 0),
  deadline date NOT NULL,
  buffer_days integer NOT NULL DEFAULT 0 CHECK (buffer_days >= 0 AND buffer_days <= 30),
  bonus_points numeric(5,2),
  bonus_label text,
  resource_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (owner_id, course_id)
);

CREATE TABLE IF NOT EXISTS public.course_exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL DEFAULT auth.uid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES public.topics(id) ON DELETE SET NULL,
  code text NOT NULL,
  source text NOT NULL CHECK (source IN ('textbook', 'textbook_review', 'review_worksheet')),
  source_group text NOT NULL CHECK (source_group IN ('chapter', 'K', 'A', 'B', 'worksheet')),
  section_code text,
  chapter integer CHECK (chapter IS NULL OR chapter BETWEEN 1 AND 99),
  level integer CHECK (level IS NULL OR level BETWEEN 1 AND 3),
  teacher_recommended boolean NOT NULL DEFAULT false,
  counts_toward_goal boolean NOT NULL DEFAULT true,
  estimated_load numeric NOT NULL DEFAULT 1 CHECK (estimated_load > 0),
  sort_order integer NOT NULL DEFAULT 0,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (owner_id, course_id, source, code)
);

CREATE TABLE IF NOT EXISTS public.course_exercise_attempts (
  id uuid PRIMARY KEY,
  owner_id uuid NOT NULL DEFAULT auth.uid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  exercise_id uuid NOT NULL REFERENCES public.course_exercises(id) ON DELETE CASCADE,
  result text NOT NULL CHECK (
    result IN ('independent', 'helped', 'incorrect', 'class', 'skipped', 'solution_only')
  ),
  note text,
  attempted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS course_exercises_course_sort_idx
  ON public.course_exercises(owner_id, course_id, sort_order);
CREATE INDEX IF NOT EXISTS course_exercises_recommended_idx
  ON public.course_exercises(owner_id, course_id, teacher_recommended)
  WHERE teacher_recommended;
CREATE INDEX IF NOT EXISTS course_exercise_attempts_course_time_idx
  ON public.course_exercise_attempts(owner_id, course_id, attempted_at);
CREATE INDEX IF NOT EXISTS course_exercise_attempts_exercise_idx
  ON public.course_exercise_attempts(owner_id, exercise_id, attempted_at);

ALTER TABLE public.course_exercise_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_exercise_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "personal course exercise goals" ON public.course_exercise_goals;
CREATE POLICY "personal course exercise goals"
  ON public.course_exercise_goals
  FOR ALL TO authenticated
  USING (owner_id = (select auth.uid()))
  WITH CHECK (
    owner_id = (select auth.uid())
    AND EXISTS (
      SELECT 1
      FROM public.courses c
      WHERE c.id = course_id
        AND c.owner_id = (select auth.uid())
    )
  );

DROP POLICY IF EXISTS "personal course exercises" ON public.course_exercises;
CREATE POLICY "personal course exercises"
  ON public.course_exercises
  FOR ALL TO authenticated
  USING (owner_id = (select auth.uid()))
  WITH CHECK (
    owner_id = (select auth.uid())
    AND EXISTS (
      SELECT 1
      FROM public.courses c
      WHERE c.id = course_id
        AND c.owner_id = (select auth.uid())
    )
    AND (
      topic_id IS NULL
      OR EXISTS (
        SELECT 1
        FROM public.topics t
        WHERE t.id = topic_id
          AND t.course_id = course_id
          AND t.owner_id = (select auth.uid())
      )
    )
  );

DROP POLICY IF EXISTS "personal course exercise attempts" ON public.course_exercise_attempts;
CREATE POLICY "personal course exercise attempts"
  ON public.course_exercise_attempts
  FOR ALL TO authenticated
  USING (owner_id = (select auth.uid()))
  WITH CHECK (
    owner_id = (select auth.uid())
    AND EXISTS (
      SELECT 1
      FROM public.courses c
      WHERE c.id = course_id
        AND c.owner_id = (select auth.uid())
    )
    AND EXISTS (
      SELECT 1
      FROM public.course_exercises e
      WHERE e.id = exercise_id
        AND e.course_id = course_id
        AND e.owner_id = (select auth.uid())
    )
  );

GRANT SELECT, INSERT, UPDATE, DELETE
  ON public.course_exercise_goals, public.course_exercises, public.course_exercise_attempts
  TO authenticated;
GRANT ALL
  ON public.course_exercise_goals, public.course_exercises, public.course_exercise_attempts
  TO service_role;

DROP TRIGGER IF EXISTS course_exercise_goals_updated ON public.course_exercise_goals;
CREATE TRIGGER course_exercise_goals_updated
  BEFORE UPDATE ON public.course_exercise_goals
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS course_exercises_updated ON public.course_exercises;
CREATE TRIGGER course_exercises_updated
  BEFORE UPDATE ON public.course_exercises
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Keep the existing generic course library meaningful for task-based courses:
-- a topic's coverage mirrors the share of its real exercises attempted at
-- least once with a counting result. Review-bank exercises have no topic and
-- therefore do not distort chapter coverage.
CREATE OR REPLACE FUNCTION public.refresh_course_exercise_topic_progress()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  affected_topic uuid;
BEGIN
  SELECT topic_id INTO affected_topic
  FROM public.course_exercises
  WHERE id = NEW.exercise_id;

  IF affected_topic IS NULL THEN
    RETURN NEW;
  END IF;

  UPDATE public.topics t
  SET progress = COALESCE((
    SELECT ROUND(100.0 * COUNT(*) FILTER (
      WHERE EXISTS (
        SELECT 1
        FROM public.course_exercise_attempts a
        WHERE a.exercise_id = e.id
          AND a.result IN ('independent', 'helped', 'incorrect', 'class')
      )
    ) / NULLIF(COUNT(*), 0))::integer
    FROM public.course_exercises e
    WHERE e.topic_id = affected_topic
      AND e.counts_toward_goal
  ), 0)
  WHERE t.id = affected_topic;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS course_exercise_attempt_refresh_topic ON public.course_exercise_attempts;
CREATE TRIGGER course_exercise_attempt_refresh_topic
  AFTER INSERT OR UPDATE OF result ON public.course_exercise_attempts
  FOR EACH ROW EXECUTE FUNCTION public.refresh_course_exercise_topic_progress();
