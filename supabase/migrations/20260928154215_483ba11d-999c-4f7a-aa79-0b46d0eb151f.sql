
-- =========================================================
-- Opintopäiväkirja schema (single-user mode, auth-ready)
-- =========================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

-- ---------- courses ----------
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  code text NOT NULL,
  name text NOT NULL,
  subject text,
  start_date date,
  exam_date date,
  study_mode text NOT NULL DEFAULT 'course',
  target_system text NOT NULL DEFAULT 'school',
  target_value text,
  color text NOT NULL DEFAULT 'sage',
  archived boolean NOT NULL DEFAULT false,
  weekly_minutes integer NOT NULL DEFAULT 180,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  name text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  weight numeric NOT NULL DEFAULT 0,
  importance integer NOT NULL DEFAULT 3,
  dependencies uuid[] NOT NULL DEFAULT '{}',
  materials text,
  progress integer NOT NULL DEFAULT 0,
  school_covered boolean NOT NULL DEFAULT false,
  self_level integer NOT NULL DEFAULT 0,
  verified_level integer NOT NULL DEFAULT 0,
  last_review date,
  next_review date,
  basic_successes integer NOT NULL DEFAULT 0,
  exam_successes integer NOT NULL DEFAULT 0,
  delayed_successes integer NOT NULL DEFAULT 0,
  study_minutes integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.study_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES public.topics(id) ON DELETE SET NULL,
  date date NOT NULL DEFAULT current_date,
  minutes integer NOT NULL DEFAULT 0,
  planned_minutes integer,
  kind text NOT NULL DEFAULT 'study',
  competence integer,
  unclear text,
  did text,
  focus integer,
  method text,
  energy integer,
  tasks text,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  name text NOT NULL,
  date date NOT NULL,
  target_system text NOT NULL DEFAULT 'school',
  target_value text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.plan_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES public.topics(id) ON DELETE SET NULL,
  date date NOT NULL,
  start_time time,
  phase text NOT NULL DEFAULT 'content',
  kind text NOT NULL DEFAULT 'study',
  title text,
  min_minutes integer NOT NULL DEFAULT 20,
  target_minutes integer NOT NULL DEFAULT 45,
  extra_minutes integer NOT NULL DEFAULT 15,
  status text NOT NULL DEFAULT 'planned',
  moved_from date,
  session_id uuid REFERENCES public.study_sessions(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.mistakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES public.topics(id) ON DELETE SET NULL,
  error text NOT NULL,
  type text,
  explanation text,
  status text NOT NULL DEFAULT 'open',
  retry_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.practice_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT current_date,
  score numeric,
  max_score numeric,
  duration_minutes integer,
  error_count integer,
  topic_results jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.weekly_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  week_start date NOT NULL,
  note text,
  planned_minutes integer,
  actual_minutes integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.progress_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES public.topics(id) ON DELETE SET NULL,
  kind text NOT NULL,
  from_value numeric,
  to_value numeric,
  detail text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.notification_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  study_sessions boolean NOT NULL DEFAULT true,
  exams boolean NOT NULL DEFAULT true,
  plan_changes boolean NOT NULL DEFAULT true,
  weekly_summary boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------- grants ----------
GRANT SELECT, INSERT, UPDATE, DELETE ON public.courses, public.topics, public.study_sessions,
  public.exams, public.plan_items, public.mistakes, public.practice_tests,
  public.weekly_checkins, public.progress_events, public.notification_settings TO anon, authenticated;
GRANT ALL ON public.courses, public.topics, public.study_sessions, public.exams,
  public.plan_items, public.mistakes, public.practice_tests, public.weekly_checkins,
  public.progress_events, public.notification_settings TO service_role;

-- ---------- RLS (single-user mode: open access, owner column ready for auth) ----------
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "single user access" ON public.courses FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single user access" ON public.topics FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single user access" ON public.study_sessions FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single user access" ON public.exams FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single user access" ON public.plan_items FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single user access" ON public.mistakes FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single user access" ON public.practice_tests FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single user access" ON public.weekly_checkins FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single user access" ON public.progress_events FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "single user access" ON public.notification_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TRIGGER courses_updated BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER topics_updated BEFORE UPDATE ON public.topics FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER plan_items_updated BEFORE UPDATE ON public.plan_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER mistakes_updated BEFORE UPDATE ON public.mistakes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_topics_course ON public.topics(course_id, position);
CREATE INDEX idx_sessions_course_date ON public.study_sessions(course_id, date);
CREATE INDEX idx_plan_date ON public.plan_items(date);

-- ---------- seed: KE04 ----------
INSERT INTO public.courses (id, code, name, subject, start_date, exam_date, target_system, target_value, color, weekly_minutes)
VALUES ('11111111-1111-4111-8111-111111111111', 'KE04', 'Kemialliset reaktiot', 'Kemia',
        '2026-10-05', '2026-11-23', 'school', '10', 'sage', 195);

INSERT INTO public.topics (course_id, name, position, weight, importance, materials) VALUES
('11111111-1111-4111-8111-111111111111','Reaktioyhtälöt ja tasapainotus',1,8,5,'s. 14–25'),
('11111111-1111-4111-8111-111111111111','Stoikiometria',2,10,5,'s. 14–35'),
('11111111-1111-4111-8111-111111111111','Reaktion saanto',3,8,4,'s. 27–35'),
('11111111-1111-4111-8111-111111111111','Rajoittava tekijä',4,9,5,'s. 38–44'),
('11111111-1111-4111-8111-111111111111','Ideaalikaasu ja kaasustoikiometria',5,8,4,'s. 46–54'),
('11111111-1111-4111-8111-111111111111','Saostumis- ja hajoamisreaktiot',6,5,3,'s. 61–88'),
('11111111-1111-4111-8111-111111111111','Protoninsiirto, neutraloituminen ja titraus',7,8,5,'s. 92–100'),
('11111111-1111-4111-8111-111111111111','Palamisreaktiot',8,4,3,'s. 103–111'),
('11111111-1111-4111-8111-111111111111','Substituutioreaktiot',9,5,3,'s. 114–122'),
('11111111-1111-4111-8111-111111111111','Additioreaktiot',10,5,3,'s. 132–161'),
('11111111-1111-4111-8111-111111111111','Eliminaatioreaktiot',11,5,3,'s. 132–161'),
('11111111-1111-4111-8111-111111111111','Kondensaatioreaktiot',12,5,3,'s. 162–210'),
('11111111-1111-4111-8111-111111111111','Hydrolyysireaktiot',13,5,3,'s. 162–210'),
('11111111-1111-4111-8111-111111111111','Polymeroituminen ja polymeerit',14,8,4,'s. 162–210'),
('11111111-1111-4111-8111-111111111111','Biomolekyylit',15,7,4,'s. 162–210');

INSERT INTO public.exams (course_id, name, date, target_system, target_value)
VALUES ('11111111-1111-4111-8111-111111111111','KE04 kurssikoe','2026-11-23','school','10');

INSERT INTO public.notification_settings (owner_id) VALUES (NULL);
