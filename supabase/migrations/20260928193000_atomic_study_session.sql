-- Make session logging atomic and safe to retry after a lost network response.
-- One RPC now inserts the session, updates mastery evidence, records a mastery
-- event when needed, and completes the linked plan item in a single transaction.

ALTER TABLE public.study_sessions
  ADD COLUMN IF NOT EXISTS request_id uuid;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.study_sessions'::regclass
      AND conname = 'study_sessions_owner_request_key'
  ) THEN
    ALTER TABLE public.study_sessions
      ADD CONSTRAINT study_sessions_owner_request_key UNIQUE (owner_id, request_id);
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION public.log_study_session(
  p_request_id uuid,
  p_course_id uuid,
  p_topic_id uuid,
  p_date date,
  p_minutes integer,
  p_planned_minutes integer,
  p_kind text,
  p_competence integer,
  p_unclear text,
  p_did text,
  p_focus integer,
  p_method text,
  p_energy integer,
  p_tasks text,
  p_note text,
  p_plan_item_id uuid
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_owner uuid := auth.uid();
  v_session_id uuid;
  v_topic public.topics%ROWTYPE;
  v_progress integer;
  v_basic integer;
  v_exam integer;
  v_delayed integer;
  v_verified integer;
  v_step integer;
  v_review_gap integer;
BEGIN
  IF v_owner IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;

  IF p_request_id IS NULL THEN
    RAISE EXCEPTION 'request_id is required' USING ERRCODE = '22023';
  END IF;

  IF p_minutes < 0 OR p_minutes > 1440 THEN
    RAISE EXCEPTION 'minutes must be between 0 and 1440' USING ERRCODE = '22023';
  END IF;

  IF p_competence IS NOT NULL AND (p_competence < 0 OR p_competence > 5) THEN
    RAISE EXCEPTION 'competence must be between 0 and 5' USING ERRCODE = '22023';
  END IF;

  PERFORM 1
  FROM public.courses
  WHERE id = p_course_id
    AND owner_id = v_owner;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Course not found' USING ERRCODE = 'P0002';
  END IF;

  SELECT id
  INTO v_session_id
  FROM public.study_sessions
  WHERE owner_id = v_owner
    AND request_id = p_request_id;

  IF FOUND THEN
    RETURN v_session_id;
  END IF;

  INSERT INTO public.study_sessions (
    owner_id, request_id, course_id, topic_id, date, minutes,
    planned_minutes, kind, competence, unclear, did, focus,
    method, energy, tasks, note
  )
  VALUES (
    v_owner, p_request_id, p_course_id, p_topic_id, p_date, p_minutes,
    p_planned_minutes, p_kind, p_competence, p_unclear, p_did, p_focus,
    p_method, p_energy, p_tasks, p_note
  )
  ON CONFLICT (owner_id, request_id) DO NOTHING
  RETURNING id INTO v_session_id;

  IF v_session_id IS NULL THEN
    SELECT id
    INTO v_session_id
    FROM public.study_sessions
    WHERE owner_id = v_owner
      AND request_id = p_request_id;

    RETURN v_session_id;
  END IF;

  IF p_topic_id IS NOT NULL THEN
    SELECT *
    INTO v_topic
    FROM public.topics
    WHERE id = p_topic_id
      AND course_id = p_course_id
      AND owner_id = v_owner
    FOR UPDATE;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Topic not found for course' USING ERRCODE = 'P0002';
    END IF;

    v_step := CASE
      WHEN p_kind = 'study' THEN LEAST(30, ROUND(p_minutes / 3.0)::integer)
      ELSE 5
    END;

    v_progress := LEAST(100, v_topic.progress + v_step);
    v_basic := v_topic.basic_successes
      + CASE WHEN COALESCE(p_competence, 0) >= 3 AND p_kind <> 'test' THEN 1 ELSE 0 END;
    v_exam := v_topic.exam_successes
      + CASE WHEN COALESCE(p_competence, 0) >= 4 AND p_kind = 'test' THEN 1 ELSE 0 END;
    v_delayed := v_topic.delayed_successes
      + CASE WHEN COALESCE(p_competence, 0) >= 3 AND p_kind = 'review' THEN 1 ELSE 0 END;

    v_verified := 0;
    IF v_progress >= 25 THEN v_verified := 1; END IF;
    IF v_progress >= 60 AND v_basic >= 1 THEN v_verified := 2; END IF;
    IF v_basic >= 2 THEN v_verified := 3; END IF;
    IF v_exam >= 1 AND v_basic >= 2 THEN v_verified := 4; END IF;
    IF v_exam >= 2 AND v_delayed >= 1 THEN v_verified := 5; END IF;

    v_review_gap := CASE v_verified
      WHEN 0 THEN 1
      WHEN 1 THEN 2
      WHEN 2 THEN 4
      WHEN 3 THEN 7
      WHEN 4 THEN 14
      ELSE 28
    END;

    UPDATE public.topics
    SET
      progress = v_progress,
      basic_successes = v_basic,
      exam_successes = v_exam,
      delayed_successes = v_delayed,
      self_level = COALESCE(p_competence, v_topic.self_level),
      verified_level = v_verified,
      study_minutes = v_topic.study_minutes + p_minutes,
      last_review = p_date,
      next_review = p_date + v_review_gap
    WHERE id = v_topic.id
      AND owner_id = v_owner;

    IF v_verified <> v_topic.verified_level THEN
      INSERT INTO public.progress_events (
        owner_id, course_id, topic_id, kind, from_value, to_value, detail
      )
      VALUES (
        v_owner, p_course_id, v_topic.id, 'mastery',
        v_topic.verified_level, v_verified, v_topic.name
      );
    END IF;
  END IF;

  IF p_plan_item_id IS NOT NULL THEN
    UPDATE public.plan_items
    SET status = 'completed',
        session_id = v_session_id
    WHERE id = p_plan_item_id
      AND course_id = p_course_id
      AND owner_id = v_owner;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Plan item not found for course' USING ERRCODE = 'P0002';
    END IF;
  END IF;

  RETURN v_session_id;
END;
$$;

REVOKE ALL ON FUNCTION public.log_study_session(
  uuid, uuid, uuid, date, integer, integer, text, integer,
  text, text, integer, text, integer, text, text, uuid
) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.log_study_session(
  uuid, uuid, uuid, date, integer, integer, text, integer,
  text, text, integer, text, integer, text, text, uuid
) TO authenticated;
