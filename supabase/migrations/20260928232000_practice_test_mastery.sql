-- Practice-test recording updates topic evidence and mastery atomically.

CREATE OR REPLACE FUNCTION public.record_practice_test(
  p_course_id uuid,
  p_date date,
  p_score numeric,
  p_max_score numeric,
  p_duration_minutes integer,
  p_error_count integer,
  p_topic_results jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_owner uuid := auth.uid();
  v_test_id uuid;
  v_item jsonb;
  v_topic public.topics%ROWTYPE;
  v_exam integer;
  v_verified integer;
  v_ratio numeric;
BEGIN
  IF v_owner IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;

  PERFORM 1 FROM public.courses
  WHERE id = p_course_id AND owner_id = v_owner;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Course not found' USING ERRCODE = 'P0002';
  END IF;

  IF p_max_score IS NULL OR p_max_score <= 0 OR p_score < 0 OR p_score > p_max_score THEN
    RAISE EXCEPTION 'Invalid practice test score' USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.practice_tests (
    owner_id, course_id, date, score, max_score, duration_minutes, error_count, topic_results
  )
  VALUES (
    v_owner, p_course_id, COALESCE(p_date, current_date), p_score, p_max_score,
    p_duration_minutes, p_error_count, COALESCE(p_topic_results, '[]'::jsonb)
  )
  RETURNING id INTO v_test_id;

  FOR v_item IN SELECT * FROM jsonb_array_elements(COALESCE(p_topic_results, '[]'::jsonb))
  LOOP
    IF COALESCE((v_item->>'max_score')::numeric, 0) <= 0 THEN
      CONTINUE;
    END IF;

    SELECT * INTO v_topic
    FROM public.topics
    WHERE id = (v_item->>'topic_id')::uuid
      AND course_id = p_course_id
      AND owner_id = v_owner
    FOR UPDATE;

    IF NOT FOUND THEN
      CONTINUE;
    END IF;

    v_ratio := COALESCE((v_item->>'score')::numeric, 0) /
      NULLIF((v_item->>'max_score')::numeric, 0);

    v_exam := v_topic.exam_successes + CASE WHEN v_ratio >= 0.70 THEN 1 ELSE 0 END;

    v_verified := 0;
    IF v_topic.progress >= 25 THEN v_verified := 1; END IF;
    IF v_topic.progress >= 60 AND v_topic.basic_successes >= 1 THEN v_verified := 2; END IF;
    IF v_topic.basic_successes >= 2 THEN v_verified := 3; END IF;
    IF v_exam >= 1 AND v_topic.basic_successes >= 2 THEN v_verified := 4; END IF;
    IF v_exam >= 2 AND v_topic.delayed_successes >= 1 THEN v_verified := 5; END IF;

    UPDATE public.topics
    SET exam_successes = v_exam,
        verified_level = GREATEST(verified_level, v_verified)
    WHERE id = v_topic.id AND owner_id = v_owner;

    IF GREATEST(v_topic.verified_level, v_verified) <> v_topic.verified_level THEN
      INSERT INTO public.progress_events (
        owner_id, course_id, topic_id, kind, from_value, to_value, detail
      ) VALUES (
        v_owner, p_course_id, v_topic.id, 'mastery',
        v_topic.verified_level, GREATEST(v_topic.verified_level, v_verified),
        v_topic.name || ' · harjoituskoe'
      );
    END IF;
  END LOOP;

  RETURN v_test_id;
END;
$$;

REVOKE ALL ON FUNCTION public.record_practice_test(
  uuid, date, numeric, numeric, integer, integer, jsonb
) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.record_practice_test(
  uuid, date, numeric, numeric, integer, integer, jsonb
) TO authenticated;
