-- Synthetic QA ONLY: never execute on the production database.
INSERT INTO public.los_dictionary_sources
(source_id,source_kind,source_lang,target_lang,dataset_version,original_url,
 original_sha512,output_sha512,license_code,license_url,evidence_url,reviewed_by,
 reviewed_at,imported_source_rows,actual_loaded_rows,published)
VALUES
('fixture-de-fi','freedict','de','fi','fixture','https://example.org/de-fi',
 repeat('a',128),repeat('b',128),'test-only','https://example.org/license',
 'https://example.org/rights','synthetic-test','2026-11-12',4,4,false),
('fixture-fi-de','freedict','fi','de','fixture','https://example.org/fi-de',
 repeat('c',128),repeat('d',128),'test-only','https://example.org/license',
 'https://example.org/rights','synthetic-test','2026-11-12',1,1,false);

INSERT INTO public.los_dictionary_lexemes
(source_id,source_entry_id,source_row,language,target_language,lemma,lemma_key,
 search_keys,part_of_speech,gender)
VALUES
('fixture-de-fi','house',1,'de','fi','Haus','haus',ARRAY['haus'],'noun','n'),
('fixture-de-fi','bank-1',2,'de','fi','Bank','bank',ARRAY['bank'],'noun','f'),
('fixture-de-fi','bank-2',3,'de','fi','Bank','bank',ARRAY['bank'],'noun','f'),
('fixture-de-fi','houses',4,'de','fi','Häuser','häuser',ARRAY['häuser'],'noun',null),
('fixture-fi-de','house',1,'fi','de','talo','talo',ARRAY['talo'],'noun',null);

INSERT INTO public.los_dictionary_senses
(source_id,source_entry_id,sense_index)
VALUES
('fixture-de-fi','house',1),
('fixture-de-fi','bank-1',1),
('fixture-de-fi','bank-2',1),
('fixture-de-fi','houses',1),
('fixture-fi-de','house',1);

UPDATE public.los_dictionary_senses
SET form_of_candidates='["Haus"]'::jsonb,gloss_language='en',
    source_glosses='["plural of Haus"]'::jsonb
WHERE source_id='fixture-de-fi' AND source_entry_id='houses';

INSERT INTO public.los_dictionary_translations
(source_id,source_entry_id,sense_index,translation_index,language,value,value_key)
VALUES
('fixture-de-fi','house',1,1,'fi','talo','talo'),
('fixture-de-fi','bank-1',1,1,'fi','penkki','penkki'),
('fixture-de-fi','bank-2',1,1,'fi','pankki','pankki'),
('fixture-fi-de','house',1,1,'de','Haus','haus');

INSERT INTO public.los_dictionary_forms
(source_id,source_entry_id,form_index,written_form,form_key,form_search_keys,grammar)
VALUES ('fixture-de-fi','house',1,'Häuser','häuser',ARRAY['häuser','haeuser'],'{"tags":["plural"]}');
INSERT INTO public.los_dictionary_pronunciations
(source_id,source_entry_id,pronunciation_index,ipa,ipa_status,region)
VALUES ('fixture-de-fi','house',1,'haʊ̯s','candidate','de-DE');

DO $$
BEGIN
 IF (SELECT count(*) FROM public.los_dictionary_search('Haus','de-fi',20)) <> 0 THEN
   RAISE EXCEPTION 'UNPUBLISHED source leaked through dictionary search';
 END IF;
 IF has_table_privilege('anon','public.los_dictionary_lexemes','SELECT')
    OR has_table_privilege('authenticated','public.los_dictionary_lexemes','SELECT') THEN
   RAISE EXCEPTION 'Direct public or authenticated lexeme read permission leaked';
 END IF;
 IF has_function_privilege('anon','public.los_dictionary_search(text,text,integer)','EXECUTE') THEN
   RAISE EXCEPTION 'Anonymous user can execute restricted dictionary RPC';
 END IF;
END $$;

-- A staged source must not become searchable without explicit legal review.
DO $$
BEGIN
 BEGIN
  UPDATE public.los_dictionary_sources
  SET published=true,published_at=now()
  WHERE source_id='fixture-de-fi';
  RAISE EXCEPTION 'UNREVIEWED source could be published';
 EXCEPTION WHEN check_violation THEN
  NULL; -- expected database-level publication safety gate
 END;
END $$;

UPDATE public.los_dictionary_sources
SET legal_review_approved=true,legal_review_at=now(),
    legal_review_by='fixture only test reviewer',
    published=true,published_at=now()
WHERE source_id IN ('fixture-de-fi','fixture-fi-de');

DO $$
BEGIN
 IF (SELECT count(*) FROM public.los_dictionary_search('Haus','de-fi',20)) <> 1 THEN
  RAISE EXCEPTION 'Exact German search failed';
 END IF;
 IF (SELECT count(*) FROM public.los_dictionary_search('Häuser','de-fi',20)
       WHERE match_type='form') <> 1 THEN
  RAISE EXCEPTION 'Inflected-form search failed';
 END IF;
 IF (SELECT count(*) FROM public.los_dictionary_search('Haeuser','de-fi',20)
       WHERE match_type='form') <> 1 THEN
  RAISE EXCEPTION 'Umlaut transliteration should match inflected German form';
 END IF;
 IF (SELECT count(*) FROM public.los_dictionary_search('Bank','de-fi',20)) <> 2 THEN
  RAISE EXCEPTION 'Homonyms incorrectly collapsed';
 END IF;
 IF (SELECT count(*) FROM public.los_dictionary_search('Häuser','de-fi',20)
   WHERE senses @> '[{"formOfCandidates":["Haus"]}]'::jsonb) <> 1 THEN
  RAISE EXCEPTION 'Source form-of candidate metadata lost in query';
 END IF;
 IF (SELECT count(*) FROM public.los_dictionary_search('talo','fi-de',20)) <> 1 THEN
  RAISE EXCEPTION 'Finnish to German search failed';
 END IF;
 IF (SELECT count(*) FROM public.los_dictionary_search('foo','de-fi',20)) <> 0 THEN
  RAISE EXCEPTION 'Nonexistent word produced a false result';
 END IF;
 IF (SELECT count(*) FROM public.los_dictionary_search('Bank','de-fi',0)) <> 0 THEN
  RAISE EXCEPTION 'Invalid search limit was not rejected';
 END IF;
END $$;

SELECT 'LOS U2 local Postgres search/RLS smoke: PASS' AS test_result;
