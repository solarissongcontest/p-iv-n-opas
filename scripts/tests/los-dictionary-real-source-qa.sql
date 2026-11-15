-- DISPOSABLE PostgreSQL 17 CI service ONLY: physical FreeDict relational staging.
-- Real parsed data stays unpublished. Never use this script on production.
\set ON_ERROR_STOP on
BEGIN;

INSERT INTO public.los_dictionary_sources
 (source_id,source_kind,source_lang,target_lang,dataset_version,
  original_url,original_sha512,output_sha512,license_code,license_url,
  evidence_url,reviewed_by,reviewed_at,imported_source_rows,published)
SELECT d->>'sourceId','freedict',split_part(d->>'direction','-',1),
 split_part(d->>'direction','-',2),'2025.11.23',d->>'sourceUrl',
 d->>'sourceSha512',d->>'outputSha512',d->>'licenseCode',
 d->>'licenseUrl',d->>'evidenceUrl',d->>'reviewedBy',
 (d->>'reviewedAt')::date,(d->>'importedSourceRows')::bigint,false
FROM (SELECT payload AS d FROM public.los_dict_qa_sources) staged_sources;

INSERT INTO public.los_dictionary_lexemes
 (source_id,source_entry_id,source_row,language,target_language,
  lemma,lemma_key,search_keys,part_of_speech,gender)
SELECT q.source_id,q.payload->>'sourceEntryId',(q.payload->>'row')::bigint,
 q.payload->>'language',q.payload->>'targetLanguage',q.payload->>'lemma',
 lower(normalize(btrim(q.payload->>'lemma'),NFC)),
 ARRAY(SELECT jsonb_array_elements_text(q.payload->'searchKeys')),
 q.payload->>'partOfSpeech',q.payload->>'gender'
FROM public.los_dict_qa_entries q;

INSERT INTO public.los_dictionary_senses
 (source_id,source_entry_id,sense_index,source_glosses,gloss_language,form_of_candidates)
SELECT q.source_id,q.payload->>'sourceEntryId',
 coalesce((s.elem->>'index')::integer,s.n::integer),
 coalesce(s.elem->'glosses','[]'::jsonb),s.elem->>'glossLanguage',
 coalesce(s.elem->'formOfCandidates','[]'::jsonb)
FROM public.los_dict_qa_entries q
CROSS JOIN LATERAL jsonb_array_elements(coalesce(q.payload->'senses','[]'::jsonb))
 WITH ORDINALITY AS s(elem,n);

INSERT INTO public.los_dictionary_translations
 (source_id,source_entry_id,sense_index,translation_index,language,value,value_key)
SELECT q.source_id,q.payload->>'sourceEntryId',
 coalesce((s.elem->>'index')::integer,s.n::integer),
 t.n::integer,s.elem->>'translationLanguage',
 t.term,lower(normalize(btrim(t.term),NFC))
FROM public.los_dict_qa_entries q
CROSS JOIN LATERAL jsonb_array_elements(coalesce(q.payload->'senses','[]'::jsonb))
 WITH ORDINALITY AS s(elem,n)
CROSS JOIN LATERAL jsonb_array_elements_text(coalesce(s.elem->'translations','[]'::jsonb))
 WITH ORDINALITY AS t(term,n);

INSERT INTO public.los_dictionary_forms
 (source_id,source_entry_id,form_index,written_form,form_key,form_search_keys,grammar)
SELECT q.source_id,q.payload->>'sourceEntryId',f.n::integer,f.term,
 norm.key,
 CASE WHEN q.payload->>'language'='de' THEN ARRAY(
    SELECT DISTINCT k.variant FROM (VALUES
      (norm.key),
      (replace(norm.key,'ß','ss')),
      (replace(replace(replace(norm.key,'ä','ae'),'ö','oe'),'ü','ue')),
      (replace(replace(replace(replace(norm.key,'ß','ss'),'ä','ae'),'ö','oe'),'ü','ue'))
    ) AS k(variant)
 ) ELSE ARRAY[norm.key] END,
 '{}'::jsonb
FROM public.los_dict_qa_entries q
CROSS JOIN LATERAL jsonb_array_elements_text(coalesce(q.payload->'forms','[]'::jsonb))
 WITH ORDINALITY AS f(term,n)
CROSS JOIN LATERAL (SELECT lower(normalize(btrim(f.term),NFC)) AS key) norm;

INSERT INTO public.los_dictionary_pronunciations
 (source_id,source_entry_id,pronunciation_index,target_type,ipa,ipa_status,region)
SELECT q.source_id,q.payload->>'sourceEntryId',p.n::integer,
 'lemma',p.term,'candidate','unspecified'
FROM public.los_dict_qa_entries q
CROSS JOIN LATERAL jsonb_array_elements_text(coalesce(q.payload->'ipaCandidates','[]'::jsonb))
 WITH ORDINALITY AS p(term,n);

UPDATE public.los_dictionary_sources src
SET actual_loaded_rows=(
 SELECT count(*) FROM public.los_dictionary_lexemes x WHERE x.source_id=src.source_id
);

DO $$
DECLARE rec record;
BEGIN
 FOR rec IN
  SELECT src.source_id,
   (meta.payload->>'importedSourceRows')::bigint AS expected_lexemes,
   (meta.payload->>'translationVariants')::bigint AS expected_translations,
   (SELECT count(*) FROM public.los_dictionary_lexemes l
    WHERE l.source_id=src.source_id) AS actual_lexemes,
   (SELECT count(*) FROM public.los_dictionary_translations t
    WHERE t.source_id=src.source_id) AS actual_translations
  FROM public.los_dictionary_sources src
  JOIN public.los_dict_qa_sources meta ON meta.payload->>'sourceId'=src.source_id
 LOOP
  IF rec.actual_lexemes<>rec.expected_lexemes OR
     rec.actual_translations<>rec.expected_translations
  THEN RAISE EXCEPTION 'Physical staged FreeDict counts mismatch for %',rec.source_id;
  END IF;
 END LOOP;
 IF (SELECT count(*) FROM public.los_dictionary_sources)<>2 OR
    (SELECT count(*) FROM public.los_dictionary_lexemes)<>25130 OR
    (SELECT count(*) FROM public.los_dictionary_translations)<>33670
 THEN RAISE EXCEPTION 'Unexpected total FreeDict source counts in disposable database';
 END IF;
 IF EXISTS(SELECT 1 FROM public.los_dictionary_sources
           WHERE published OR legal_review_approved OR published_at IS NOT NULL)
 THEN RAISE EXCEPTION 'Staged FreeDict was incorrectly published';
 END IF;
 IF EXISTS(SELECT 1 FROM public.los_dictionary_search('Haus','de-fi',20)) OR
    EXISTS(SELECT 1 FROM public.los_dictionary_search('talo','fi-de',20))
 THEN RAISE EXCEPTION 'Unpublished dictionary data leaked into the search RPC';
 END IF;
 IF has_table_privilege('anon','public.los_dictionary_lexemes','SELECT') OR
    has_table_privilege('authenticated','public.los_dictionary_lexemes','SELECT')
 THEN RAISE EXCEPTION 'Client roles can read staged raw dictionary data';
 END IF;
END $$;

ANALYZE public.los_dictionary_lexemes;
ANALYZE public.los_dictionary_forms;
ANALYZE public.los_dictionary_translations;

-- Query plans and actual elapsed times, without claiming production latency.
EXPLAIN (ANALYZE,BUFFERS)
 SELECT lemma FROM public.los_dictionary_lexemes
 WHERE language='de' AND search_keys @> ARRAY['haus'] ORDER BY lemma LIMIT 20;
EXPLAIN (ANALYZE,BUFFERS)
 SELECT lemma FROM public.los_dictionary_lexemes
 WHERE language='fi' AND search_keys @> ARRAY['talo'] ORDER BY lemma LIMIT 20;

SELECT source_id,imported_source_rows,actual_loaded_rows,published
 FROM public.los_dictionary_sources ORDER BY source_id;
COMMIT;
