-- Checklist compliance: weekly reflection fields, full mistake lifecycle,
-- and canonical KE04 material ranges.

ALTER TABLE public.weekly_checkins
  ADD COLUMN IF NOT EXISTS adherence smallint,
  ADD COLUMN IF NOT EXISTS hardest_topic_id uuid REFERENCES public.topics(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS went_well text,
  ADD COLUMN IF NOT EXISTS next_focus text,
  ADD COLUMN IF NOT EXISTS load_rating text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.weekly_checkins'::regclass
      AND conname = 'weekly_checkins_adherence_check'
  ) THEN
    ALTER TABLE public.weekly_checkins
      ADD CONSTRAINT weekly_checkins_adherence_check
      CHECK (adherence IS NULL OR adherence BETWEEN 1 AND 5);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.weekly_checkins'::regclass
      AND conname = 'weekly_checkins_load_rating_check'
  ) THEN
    ALTER TABLE public.weekly_checkins
      ADD CONSTRAINT weekly_checkins_load_rating_check
      CHECK (load_rating IS NULL OR load_rating IN ('light','good','heavy'));
  END IF;
END $$;

ALTER TABLE public.mistakes
  ADD COLUMN IF NOT EXISTS what_happened text,
  ADD COLUMN IF NOT EXISTS solution text,
  ADD COLUMN IF NOT EXISTS retested_at date,
  ADD COLUMN IF NOT EXISTS mastered_at date;

UPDATE public.mistakes
SET solution = explanation
WHERE solution IS NULL AND explanation IS NOT NULL;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.mistakes'::regclass
      AND conname = 'mistakes_status_check'
  ) THEN
    ALTER TABLE public.mistakes DROP CONSTRAINT mistakes_status_check;
  END IF;

  ALTER TABLE public.mistakes
    ADD CONSTRAINT mistakes_status_check
    CHECK (status IN ('open','corrected','retested','mastered'));
END $$;

-- The checklist is the canonical source for KE04 page ranges.
UPDATE public.topics t
SET materials = CASE t.name
  WHEN 'Reaktioyhtälöt ja tasapainotus' THEN 's. 14–25'
  WHEN 'Stoikiometria' THEN 's. 14–35'
  WHEN 'Reaktion saanto' THEN 's. 27–35'
  WHEN 'Rajoittava tekijä' THEN 's. 38–44'
  WHEN 'Ideaalikaasu ja kaasustoikiometria' THEN 's. 46–54'
  WHEN 'Saostumis- ja hajoamisreaktiot' THEN 's. 61–88'
  WHEN 'Protoninsiirto, neutraloituminen ja titraus' THEN 's. 61–88'
  WHEN 'Palamisreaktiot' THEN 's. 61–88'
  WHEN 'Substituutioreaktiot' THEN 's. 92–100'
  WHEN 'Additioreaktiot' THEN 's. 103–111'
  WHEN 'Eliminaatioreaktiot' THEN 's. 103–111'
  WHEN 'Kondensaatioreaktiot' THEN 's. 114–122'
  WHEN 'Hydrolyysireaktiot' THEN 's. 114–122'
  WHEN 'Polymeroituminen ja polymeerit' THEN 's. 132–161'
  WHEN 'Biomolekyylit' THEN 's. 162–210'
  ELSE t.materials
END
FROM public.courses c
WHERE t.course_id = c.id AND c.code = 'KE04';

CREATE INDEX IF NOT EXISTS weekly_checkins_owner_week_idx
  ON public.weekly_checkins(owner_id, week_start DESC);

CREATE INDEX IF NOT EXISTS mistakes_owner_status_retry_idx
  ON public.mistakes(owner_id, status, retry_date);