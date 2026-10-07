-- The topic-progress function is trigger-only. SECURITY DEFINER is needed so
-- the trigger can update the derived topic coverage, but clients must never be
-- able to invoke the function directly through PostgREST RPC.
REVOKE ALL ON FUNCTION public.refresh_course_exercise_topic_progress() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.refresh_course_exercise_topic_progress() FROM anon;
REVOKE ALL ON FUNCTION public.refresh_course_exercise_topic_progress() FROM authenticated;
