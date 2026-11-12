-- LOS! U2 staging schema: separate dictionary sources, no user progress changes.
-- Requires explicit approval per source before any public read. Manual production
-- application only after DB backup and RLS review; this migration imports 0 rows.
BEGIN;

CREATE TABLE IF NOT EXISTS public.los_dictionary_sources (
  source_id TEXT PRIMARY KEY CHECK (length(source_id) BETWEEN 3 AND 150),
  kind TEXT NOT NULL CHECK (kind IN ('freedict', 'kaikki', 'commons')),
  direction TEXT NOT NULL CHECK (direction IN ('de-fi', 'fi-de', 'de')),
  source_url TEXT NOT NULL,
  source_sha512 TEXT NOT NULL CHECK (length(source_sha512)=128),
  processed_sha512 TEXT NOT NULL CHECK (length(processed_sha512)=128),
  license_code TEXT NOT NULL,
  license_url TEXT NOT NULL,
  rights_evidence_url TEXT NOT NULL,
  rights_reviewed_by TEXT NOT NULL,
  rights_reviewed_at TIMESTAMPTZ NOT NULL,
  imported_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source_entry_count INTEGER NOT NULL DEFAULT 0 CHECK (source_entry_count >= 0),
  source_translation_count INTEGER NOT NULL DEFAULT 0 CHECK (source_translation_count >= 0),
  publication_reviewed BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  CHECK (published_at IS NULL OR publication_reviewed)
);

CREATE TABLE IF NOT EXISTS public.los_dictionary_lexemes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES public.los_dictionary_sources(source_id),
  source_entry_id TEXT NOT NULL,
  source_row INTEGER NOT NULL CHECK (source_row > 0),
  language TEXT NOT NULL CHECK (language IN ('de','fi')),
  lemma TEXT NOT NULL CHECK (length(lemma) BETWEEN 1 AND 180),
  lemma_normalized TEXT NOT NULL CHECK (length(lemma_normalized) BETWEEN 1 AND 180),
  search_aliases TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  part_of_speech TEXT,
  grammatical_gender TEXT,
  UNIQUE (source_id, source_entry_id)
);

CREATE TABLE IF NOT EXISTS public.los_dictionary_senses (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lexeme_id BIGINT NOT NULL REFERENCES public.los_dictionary_lexemes(id),
  source_index INTEGER NOT NULL CHECK (source_index > 0),
  gloss TEXT,
  gloss_language TEXT CHECK (gloss_language IN ('de','fi','en','source','unknown')),
  UNIQUE (lexeme_id, source_index)
);

CREATE TABLE IF NOT EXISTS public.los_dictionary_translations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sense_id BIGINT NOT NULL REFERENCES public.los_dictionary_senses(id),
  language TEXT NOT NULL CHECK (language IN ('de','fi')),
  translation TEXT NOT NULL CHECK (length(translation) BETWEEN 1 AND 2000),
  is_reviewed BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.los_dictionary_forms (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lexeme_id BIGINT NOT NULL REFERENCES public.los_dictionary_lexemes(id),
  form TEXT NOT NULL CHECK (length(form) BETWEEN 1 AND 180),
  form_normalized TEXT NOT NULL,
  form_tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  UNIQUE(lexeme_id, form)
);

CREATE TABLE IF NOT EXISTS public.los_dictionary_pronunciations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lexeme_id BIGINT NOT NULL REFERENCES public.los_dictionary_lexemes(id),
  source_id TEXT NOT NULL REFERENCES public.los_dictionary_sources(source_id),
  ipa TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'de-DE',
  review_status TEXT NOT NULL DEFAULT 'candidate'
    CHECK (review_status IN ('candidate','source-verified','reviewed')),
  review_note TEXT
);

CREATE TABLE IF NOT EXISTS public.los_dictionary_audio_assets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  pronunciation_id BIGINT NOT NULL REFERENCES public.los_dictionary_pronunciations(id),
  source_id TEXT NOT NULL REFERENCES public.los_dictionary_sources(source_id),
  audio_url TEXT NOT NULL,
  human_voice BOOLEAN NOT NULL,
  license_code TEXT NOT NULL,
  usage_status TEXT NOT NULL DEFAULT 'pending-review'
    CHECK (usage_status IN ('pending-review','ready','unavailable')),
  device_tested_at TIMESTAMPTZ,
  CHECK (usage_status <> 'ready' OR device_tested_at IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS los_lexemes_lemma_key_idx
  ON public.los_dictionary_lexemes(language, lemma_normalized);
CREATE INDEX IF NOT EXISTS los_lexemes_alias_key_idx
  ON public.los_dictionary_lexemes USING GIN(search_aliases);
CREATE INDEX IF NOT EXISTS los_lexemes_prefix_idx
  ON public.los_dictionary_lexemes(lemma_normalized text_pattern_ops);
CREATE INDEX IF NOT EXISTS los_forms_form_idx
  ON public.los_dictionary_forms(form_normalized);
CREATE INDEX IF NOT EXISTS los_senses_lexeme_idx
  ON public.los_dictionary_senses(lexeme_id);
CREATE INDEX IF NOT EXISTS los_translations_sense_idx
  ON public.los_dictionary_translations(sense_id);
CREATE INDEX IF NOT EXISTS los_translations_lookup_idx
  ON public.los_dictionary_translations(language, lower(translation));
CREATE INDEX IF NOT EXISTS los_pron_lexeme_idx
  ON public.los_dictionary_pronunciations(lexeme_id);

-- No student data in these tables. Every public result must belong to a
-- separately reviewed, published and rights-approved source. Service writes
-- use a privileged server-side connection, never an anon browser token.
ALTER TABLE public.los_dictionary_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.los_dictionary_lexemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.los_dictionary_senses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.los_dictionary_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.los_dictionary_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.los_dictionary_pronunciations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.los_dictionary_audio_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY los_dictionary_sources_read_approved
ON public.los_dictionary_sources FOR SELECT TO anon, authenticated
USING (publication_reviewed = true AND published_at IS NOT NULL);

CREATE POLICY los_dictionary_lexemes_read_approved
ON public.los_dictionary_lexemes FOR SELECT TO anon, authenticated
USING (EXISTS (
  SELECT 1 FROM public.los_dictionary_sources source
  WHERE source.source_id = los_dictionary_lexemes.source_id
    AND source.publication_reviewed AND source.published_at IS NOT NULL
));

CREATE POLICY los_dictionary_senses_read_approved
ON public.los_dictionary_senses FOR SELECT TO anon, authenticated
USING (EXISTS (
  SELECT 1 FROM public.los_dictionary_lexemes lex
  JOIN public.los_dictionary_sources source ON source.source_id = lex.source_id
  WHERE lex.id = los_dictionary_senses.lexeme_id
    AND source.publication_reviewed AND source.published_at IS NOT NULL
));

CREATE POLICY los_dictionary_translations_read_approved
ON public.los_dictionary_translations FOR SELECT TO anon, authenticated
USING (EXISTS (
  SELECT 1 FROM public.los_dictionary_senses sen
  JOIN public.los_dictionary_lexemes lex ON lex.id=sen.lexeme_id
  JOIN public.los_dictionary_sources source ON source.source_id=lex.source_id
  WHERE sen.id=los_dictionary_translations.sense_id
    AND source.publication_reviewed AND source.published_at IS NOT NULL
));

CREATE POLICY los_dictionary_forms_read_approved
ON public.los_dictionary_forms FOR SELECT TO anon, authenticated
USING (EXISTS (
  SELECT 1 FROM public.los_dictionary_lexemes lex
  JOIN public.los_dictionary_sources source ON source.source_id=lex.source_id
  WHERE lex.id=los_dictionary_forms.lexeme_id
    AND source.publication_reviewed AND source.published_at IS NOT NULL
));

CREATE POLICY los_dictionary_pronunciations_read_approved
ON public.los_dictionary_pronunciations FOR SELECT TO anon, authenticated
USING (EXISTS (
  SELECT 1 FROM public.los_dictionary_sources source
  WHERE source.source_id=los_dictionary_pronunciations.source_id
    AND source.publication_reviewed AND source.published_at IS NOT NULL
));

CREATE POLICY los_dictionary_audio_assets_read_approved
ON public.los_dictionary_audio_assets FOR SELECT TO anon, authenticated
USING (usage_status='ready' AND EXISTS (
  SELECT 1 FROM public.los_dictionary_sources source
  WHERE source.source_id=los_dictionary_audio_assets.source_id
    AND source.publication_reviewed AND source.published_at IS NOT NULL
));

COMMIT;
