-- Final production hardening for the Vercel/Supabase deployment.

-- Remove the old anonymous demo seed. The app now creates the canonical KE04
-- for the authenticated Arthur account, preserving proper RLS ownership.
DELETE FROM public.courses WHERE owner_id IS NULL;
DELETE FROM public.notification_settings WHERE owner_id IS NULL;
DELETE FROM public.weekly_checkins WHERE owner_id IS NULL;
DELETE FROM public.progress_events WHERE owner_id IS NULL;

-- Prevent accidental duplicates while keeping the historical nullable schema
-- compatible with old migrations.
CREATE UNIQUE INDEX IF NOT EXISTS courses_owner_code_unique
  ON public.courses(owner_id, code)
  WHERE owner_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS weekly_checkins_owner_week_unique
  ON public.weekly_checkins(owner_id, week_start)
  WHERE owner_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS notification_settings_owner_unique
  ON public.notification_settings(owner_id)
  WHERE owner_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS topics_next_review_idx
  ON public.topics(owner_id, next_review)
  WHERE next_review IS NOT NULL;

-- Child records must always point at a course owned by the same authenticated
-- user, not merely carry a matching owner_id themselves.
DROP POLICY IF EXISTS "personal study data" ON public.mistakes;
CREATE POLICY "personal study data" ON public.mistakes
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

DROP POLICY IF EXISTS "personal study data" ON public.practice_tests;
CREATE POLICY "personal study data" ON public.practice_tests
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
