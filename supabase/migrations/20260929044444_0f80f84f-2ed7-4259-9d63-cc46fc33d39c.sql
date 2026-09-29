-- Onboarding preferences and real background Web Push support.

CREATE TABLE IF NOT EXISTS public.user_preferences (
  owner_id uuid PRIMARY KEY DEFAULT auth.uid(),
  display_name text NOT NULL DEFAULT 'Arthur',
  onboarding_completed boolean NOT NULL DEFAULT false,
  study_weekdays smallint[] NOT NULL DEFAULT ARRAY[1,2,3,4,5]::smallint[],
  notifications_enabled boolean NOT NULL DEFAULT false,
  timezone text NOT NULL DEFAULT 'Europe/Helsinki',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT study_weekdays_valid CHECK (
    study_weekdays <@ ARRAY[1,2,3,4,5,6,7]::smallint[]
    AND cardinality(study_weekdays) > 0
  )
);

CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  endpoint text NOT NULL,
  subscription jsonb NOT NULL,
  user_agent text,
  active boolean NOT NULL DEFAULT true,
  last_success_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(owner_id, endpoint)
);

CREATE TABLE IF NOT EXISTS public.push_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL,
  delivery_key text NOT NULL,
  sent_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(owner_id, delivery_key)
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_deliveries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "personal preferences" ON public.user_preferences;
CREATE POLICY "personal preferences" ON public.user_preferences
  FOR ALL TO authenticated
  USING (owner_id = (select auth.uid()))
  WITH CHECK (owner_id = (select auth.uid()));

-- Push subscription rows are written through authenticated server routes and
-- sent through the service-role cron worker. They are intentionally not
-- directly exposed to the browser.
REVOKE ALL ON public.push_subscriptions, public.push_deliveries FROM anon, authenticated;
GRANT ALL ON public.push_subscriptions, public.push_deliveries TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.user_preferences TO authenticated;
GRANT ALL ON public.user_preferences TO service_role;

DROP TRIGGER IF EXISTS user_preferences_updated ON public.user_preferences;
CREATE TRIGGER user_preferences_updated
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS push_subscriptions_owner_active_idx
  ON public.push_subscriptions(owner_id, active);

CREATE INDEX IF NOT EXISTS push_deliveries_owner_sent_idx
  ON public.push_deliveries(owner_id, sent_at DESC);

INSERT INTO public.user_preferences (owner_id)
SELECT DISTINCT owner_id
FROM public.courses
WHERE owner_id IS NOT NULL
ON CONFLICT (owner_id) DO NOTHING;