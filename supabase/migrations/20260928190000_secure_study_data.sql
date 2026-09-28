-- Personal study records require an authenticated owner. The original
-- demonstration rows remain untouched and are inaccessible to the client.
ALTER TABLE public.topics ADD COLUMN IF NOT EXISTS owner_id uuid;
ALTER TABLE public.courses ALTER COLUMN owner_id SET DEFAULT auth.uid();
ALTER TABLE public.topics ALTER COLUMN owner_id SET DEFAULT auth.uid();
ALTER TABLE public.study_sessions ALTER COLUMN owner_id SET DEFAULT auth.uid();
ALTER TABLE public.exams ALTER COLUMN owner_id SET DEFAULT auth.uid();
ALTER TABLE public.plan_items ALTER COLUMN owner_id SET DEFAULT auth.uid();
ALTER TABLE public.mistakes ALTER COLUMN owner_id SET DEFAULT auth.uid();
ALTER TABLE public.practice_tests ALTER COLUMN owner_id SET DEFAULT auth.uid();
ALTER TABLE public.weekly_checkins ALTER COLUMN owner_id SET DEFAULT auth.uid();
ALTER TABLE public.progress_events ALTER COLUMN owner_id SET DEFAULT auth.uid();
ALTER TABLE public.notification_settings ALTER COLUMN owner_id SET DEFAULT auth.uid();

REVOKE ALL ON public.courses, public.topics, public.study_sessions,
  public.exams, public.plan_items, public.mistakes, public.practice_tests,
  public.weekly_checkins, public.progress_events, public.notification_settings FROM anon;

DO $$
DECLARE tab text;
BEGIN
  FOREACH tab IN ARRAY ARRAY['courses','topics','study_sessions','exams',
    'plan_items','mistakes','practice_tests','weekly_checkins',
    'progress_events','notification_settings']
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "single user access" ON public.%I', tab);
    EXECUTE format('CREATE POLICY "personal study data" ON public.%I FOR ALL TO authenticated USING (owner_id = (select auth.uid())) WITH CHECK (owner_id = (select auth.uid()))', tab);
  END LOOP;
END $$;

-- A child record must reference a course belonging to the same user.
DROP POLICY "personal study data" ON public.topics;
CREATE POLICY "personal study data" ON public.topics FOR ALL TO authenticated
  USING (owner_id = (select auth.uid()))
  WITH CHECK (owner_id = (select auth.uid())
    AND EXISTS (SELECT 1 FROM public.courses c
      WHERE c.id = course_id AND c.owner_id = (select auth.uid())));

-- The same check applies to session, exam and plan creation; SELECT/UPDATE
-- remain restricted by each row's own owner_id.
DROP POLICY "personal study data" ON public.study_sessions;
CREATE POLICY "personal study data" ON public.study_sessions FOR ALL TO authenticated
  USING (owner_id = (select auth.uid()))
  WITH CHECK (owner_id = (select auth.uid())
    AND EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.owner_id = (select auth.uid())));
DROP POLICY "personal study data" ON public.exams;
CREATE POLICY "personal study data" ON public.exams FOR ALL TO authenticated
  USING (owner_id = (select auth.uid()))
  WITH CHECK (owner_id = (select auth.uid())
    AND EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.owner_id = (select auth.uid())));
DROP POLICY "personal study data" ON public.plan_items;
CREATE POLICY "personal study data" ON public.plan_items FOR ALL TO authenticated
  USING (owner_id = (select auth.uid()))
  WITH CHECK (owner_id = (select auth.uid())
    AND EXISTS (SELECT 1 FROM public.courses c WHERE c.id = course_id AND c.owner_id = (select auth.uid())));
