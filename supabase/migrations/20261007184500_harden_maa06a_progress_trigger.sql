-- The topic-progress function is trigger-only. SECURITY DEFINER is needed so
-- the trigger can update derived topic coverage, but clients must never invoke
-- the function directly through PostgREST RPC. The function owner still retains
-- the privileges PostgreSQL needs for trigger execution.
REVOKE ALL ON FUNCTION public.refresh_course_exercise_topic_progress() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.refresh_course_exercise_topic_progress() FROM anon;
REVOKE ALL ON FUNCTION public.refresh_course_exercise_topic_progress() FROM authenticated;
