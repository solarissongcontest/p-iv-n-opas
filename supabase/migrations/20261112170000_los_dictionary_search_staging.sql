-- LOS! U2.0: source-separated, staged dictionary search model.
-- ADDITIVE ONLY. Does not touch los_chapter_drafts or existing student data.
-- All new source rows default to unpublished and are invisible to search.
CREATE TABLE IF NOT EXISTS public.los_dictionary_sources (
  source_id text PRIMARY KEY CHECK (length(source_id) BETWEEN 3 AND 160),
  source_kind text NOT NULL CHECK (source_kind IN ('freedict','kaikki')),
  source_lang text NOT NULL CHECK (source_lang IN ('de','fi')),
  target_lang text CHECK (target_lang IN ('de','fi')),
  dataset_version text NOT NULL,
  original_url text NOT NULL CHECK (original_url LIKE 'https://%'),
  original_sha512 text NOT NULL CHECK (original_sha512 ~ '^[0-9a-f]{128}$'),
  output_sha512 text NOT NULL CHECK (output_sha512 ~ '^[0-9a-f]{128}$'),
  license_code text NOT NULL,
  license_url text NOT NULL CHECK (license_url LIKE 'https://%'),
  evidence_url text NOT NULL CHECK (evidence_url LIKE 'https://%'),
  reviewed_by text NOT NULL,
  reviewed_at date NOT NULL,
  imported_source_rows bigint NOT NULL DEFAULT 0 CHECK (imported_source_rows >= 0),
  actual_loaded_rows bigint NOT NULL DEFAULT 0 CHECK (actual_loaded_rows >= 0),
  published boolean NOT NULL DEFAULT false,
  imported_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz,
  CONSTRAINT los_dict_published_count CHECK (
    NOT published OR (actual_loaded_rows > 0 AND published_at IS NOT NULL)
  )
);

CREATE TABLE IF NOT EXISTS public.los_dictionary_lexemes (
  source_id text NOT NULL REFERENCES public.los_dictionary_sources(source_id) ON DELETE RESTRICT,
  source_entry_id text NOT NULL CHECK (length(source_entry_id) BETWEEN 1 AND 190),
  source_row bigint NOT NULL CHECK (source_row > 0),
  language text NOT NULL CHECK (language IN ('de','fi')),
  target_language text CHECK (target_language IN ('de','fi')),
  lemma text NOT NULL CHECK (length(lemma) BETWEEN 1 AND 180),
  lemma_key text NOT NULL CHECK (length(lemma_key) BETWEEN 1 AND 180),
  search_keys text[] NOT NULL,
  part_of_speech text,
  gender text,
  PRIMARY KEY (source_id, source_entry_id)
);

CREATE TABLE IF NOT EXISTS public.los_dictionary_senses (
  source_id text NOT NULL,
  source_entry_id text NOT NULL,
  sense_index integer NOT NULL CHECK (sense_index > 0),
  source_glosses jsonb NOT NULL DEFAULT '[]'::jsonb,
  gloss_language text,
  PRIMARY KEY (source_id, source_entry_id, sense_index),
  FOREIGN KEY (source_id, source_entry_id)
    REFERENCES public.los_dictionary_lexemes(source_id, source_entry_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.los_dictionary_translations (
  source_id text NOT NULL,
  source_entry_id text NOT NULL,
  sense_index integer NOT NULL,
  translation_index integer NOT NULL CHECK (translation_index > 0),
  language text NOT NULL CHECK (language IN ('fi','de')),
  value text NOT NULL CHECK (length(value) BETWEEN 1 AND 2000),
  value_key text NOT NULL,
  PRIMARY KEY (source_id, source_entry_id, sense_index, translation_index),
  FOREIGN KEY (source_id, source_entry_id, sense_index)
    REFERENCES public.los_dictionary_senses(source_id, source_entry_id, sense_index) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.los_dictionary_forms (
  source_id text NOT NULL,
  source_entry_id text NOT NULL,
  form_index integer NOT NULL CHECK (form_index > 0),
  written_form text NOT NULL CHECK (length(written_form) BETWEEN 1 AND 180),
  form_key text NOT NULL,
  grammar jsonb NOT NULL DEFAULT '{}'::jsonb,
  PRIMARY KEY (source_id, source_entry_id, form_index),
  FOREIGN KEY (source_id, source_entry_id)
    REFERENCES public.los_dictionary_lexemes(source_id, source_entry_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.los_dictionary_pronunciations (
  source_id text NOT NULL,
  source_entry_id text NOT NULL,
  pronunciation_index integer NOT NULL CHECK (pronunciation_index > 0),
  target_type text NOT NULL DEFAULT 'lemma' CHECK (target_type IN ('lemma','form','phrase')),
  ipa text NOT NULL CHECK (length(ipa) BETWEEN 1 AND 140),
  ipa_status text NOT NULL DEFAULT 'candidate' CHECK (
    ipa_status IN ('candidate','source-verified','reviewed')
  ),
  region text NOT NULL DEFAULT 'unspecified',
  PRIMARY KEY (source_id, source_entry_id, pronunciation_index),
  FOREIGN KEY (source_id, source_entry_id)
    REFERENCES public.los_dictionary_lexemes(source_id, source_entry_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.los_dictionary_audio_assets (
  source_id text NOT NULL,
  source_entry_id text NOT NULL,
  audio_id text NOT NULL,
  source_url text,
  license_code text,
  license_url text,
  speaker_type text NOT NULL CHECK (speaker_type IN ('human','synthetic')),
  playback_status text NOT NULL DEFAULT 'pending-review' CHECK (
    playback_status IN ('pending-review','ready','unavailable')
  ),
  reviewed_at timestamptz,
  PRIMARY KEY (source_id, source_entry_id, audio_id),
  FOREIGN KEY (source_id, source_entry_id)
    REFERENCES public.los_dictionary_lexemes(source_id, source_entry_id) ON DELETE CASCADE,
  CONSTRAINT los_audio_requires_review CHECK (
    playback_status <> 'ready' OR
    (reviewed_at IS NOT NULL AND source_url LIKE 'https://%'
      AND license_code IS NOT NULL AND license_url LIKE 'https://%')
  )
);

CREATE INDEX IF NOT EXISTS los_dict_lexeme_exact_idx
  ON public.los_dictionary_lexemes (language, lemma_key);
CREATE INDEX IF NOT EXISTS los_dict_lexeme_search_idx
  ON public.los_dictionary_lexemes USING gin (search_keys);
CREATE INDEX IF NOT EXISTS los_dict_lexeme_prefix_idx
  ON public.los_dictionary_lexemes (language, lemma_key text_pattern_ops);
CREATE INDEX IF NOT EXISTS los_dict_form_lookup_idx
  ON public.los_dictionary_forms (form_key);
CREATE INDEX IF NOT EXISTS los_dict_translation_lookup_idx
  ON public.los_dictionary_translations (language, value_key text_pattern_ops);

-- Database exposure is server-only. Service key is NEVER used in the browser.
DO $$
DECLARE table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'los_dictionary_sources','los_dictionary_lexemes','los_dictionary_senses',
    'los_dictionary_translations','los_dictionary_forms',
    'los_dictionary_pronunciations','los_dictionary_audio_assets'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM public, anon, authenticated', table_name);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE ON TABLE public.%I TO service_role', table_name);
  END LOOP;
END $$;

-- Server RPC exposes only reviewed/published sources; never global raw JSONL.
-- No SECURITY DEFINER: the caller (server-side service role) owns the authorization.
CREATE OR REPLACE FUNCTION public.los_dictionary_search(
  p_query text, p_direction text, p_limit integer DEFAULT 20
)
RETURNS TABLE (
  source_id text, source_entry_id text, lemma text, language text,
  part_of_speech text, gender text, source_kind text,
  license_code text, license_url text, evidence_url text,
  match_type text, senses jsonb, forms jsonb, pronunciations jsonb
)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public, pg_temp
AS $search$
  WITH param AS (
    SELECT lower(btrim(p_query)) AS q, split_part(p_direction, '-', 1) AS source_lang
    WHERE p_direction IN ('de-fi','fi-de')
      AND length(btrim(p_query)) BETWEEN 1 AND 80 AND p_limit BETWEEN 1 AND 20
  ), ranked AS (
    SELECT l.source_id, l.source_entry_id, l.lemma, l.language,
      l.part_of_speech, l.gender, s.source_kind, s.license_code,
      s.license_url, s.evidence_url,
      CASE WHEN l.lemma_key = p.q OR p.q = ANY(l.search_keys)
        THEN 0 WHEN EXISTS (
          SELECT 1 FROM public.los_dictionary_forms f
          WHERE f.source_id=l.source_id AND f.source_entry_id=l.source_entry_id
            AND f.form_key=p.q
        ) THEN 1 ELSE 2 END AS rank,
      CASE WHEN l.lemma_key=p.q OR p.q=ANY(l.search_keys) THEN 'lemma'
        WHEN EXISTS (
          SELECT 1 FROM public.los_dictionary_forms f
          WHERE f.source_id=l.source_id AND f.source_entry_id=l.source_entry_id
            AND f.form_key=p.q
        ) THEN 'form' ELSE 'prefix' END AS match_type
    FROM param p
    JOIN public.los_dictionary_lexemes l ON l.language=p.source_lang
    JOIN public.los_dictionary_sources s ON s.source_id=l.source_id AND s.published=true
    WHERE l.lemma_key=p.q OR p.q=ANY(l.search_keys) OR
      left(l.lemma_key,length(p.q))=p.q OR EXISTS (
        SELECT 1 FROM public.los_dictionary_forms f
        WHERE f.source_id=l.source_id AND f.source_entry_id=l.source_entry_id
          AND f.form_key=p.q
      )
    ORDER BY rank, length(l.lemma), l.lemma, l.source_id, l.source_entry_id
    LIMIT (SELECT p_limit FROM param)
  )
  SELECT r.source_id,r.source_entry_id,r.lemma,r.language,
    r.part_of_speech,r.gender,r.source_kind,r.license_code,
    r.license_url,r.evidence_url,r.match_type,
    COALESCE((SELECT jsonb_agg(jsonb_build_object(
      'senseIndex',n.sense_index,'glosses',n.source_glosses,
      'glossLanguage',n.gloss_language,'translations',
      COALESCE((SELECT jsonb_agg(jsonb_build_object('language',t.language,'value',t.value)
        ORDER BY t.translation_index)
        FROM public.los_dictionary_translations t
        WHERE t.source_id=n.source_id AND t.source_entry_id=n.source_entry_id
          AND t.sense_index=n.sense_index),'[]'::jsonb))
      ORDER BY n.sense_index)
      FROM public.los_dictionary_senses n
      WHERE n.source_id=r.source_id AND n.source_entry_id=r.source_entry_id),'[]'::jsonb),
    COALESCE((SELECT jsonb_agg(jsonb_build_object(
      'writtenForm',f.written_form,'grammar',f.grammar) ORDER BY f.form_index)
      FROM public.los_dictionary_forms f
      WHERE f.source_id=r.source_id AND f.source_entry_id=r.source_entry_id),'[]'::jsonb),
    COALESCE((SELECT jsonb_agg(jsonb_build_object(
      'ipa',pr.ipa,'reviewStatus',pr.ipa_status,'region',pr.region)
      ORDER BY pr.pronunciation_index)
      FROM public.los_dictionary_pronunciations pr
      WHERE pr.source_id=r.source_id AND pr.source_entry_id=r.source_entry_id),'[]'::jsonb)
  FROM ranked r
  ORDER BY r.rank,length(r.lemma),r.lemma,r.source_id,r.source_entry_id;
$search$;
REVOKE ALL ON FUNCTION public.los_dictionary_search(text,text,integer)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.los_dictionary_search(text,text,integer)
  TO service_role;

COMMENT ON FUNCTION public.los_dictionary_search(text,text,integer) IS
  'LOS U2 published-only server-side bounded search; no public direct access.';
