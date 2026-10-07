-- BI05 V2: replace the recall-heavy V1 bank with a balanced 630-item bank.
-- V2 remains deterministic and grounded only in the user-provided Iiris 5
-- vocabulary definitions and canonical Iiris 5 subchapter structure.

create temporary table _bi05_v2_core on commit drop as
select
  q.owner_id,
  q.course_id,
  q.topic_id,
  t.name as topic_name,
  (q.metadata->>'chapter')::integer as chapter,
  q.metadata->>'subchapter' as code,
  cc.canonical_name,
  cc.definition,
  row_number() over (
    partition by q.course_id,q.topic_id
    order by cc.canonical_name
  ) as rn
from public.question_bank q
join public.topics t on t.id=q.topic_id
join public.course_concepts cc
  on cc.course_id=q.course_id
 and cc.canonical_name=q.expected_concepts[1]
where q.module_code='BI05'
  and q.seed_version='bi05-v1'
  and q.question_type='free_recall'
  and q.status='active';

create temporary table _bi05_v2_grouped on commit drop as
select
  owner_id,course_id,topic_id,topic_name,chapter,code,
  max(canonical_name) filter(where rn=1) as c1,
  max(definition) filter(where rn=1) as d1,
  max(canonical_name) filter(where rn=2) as c2,
  max(definition) filter(where rn=2) as d2,
  max(canonical_name) filter(where rn=3) as c3,
  max(definition) filter(where rn=3) as d3
from _bi05_v2_core
group by owner_id,course_id,topic_id,topic_name,chapter,code;

do $$
declare r record;
begin
  for r in
    select c.id,
      (select count(*) from public.topics t where t.course_id=c.id) as topic_count,
      (select count(*) from _bi05_v2_core x where x.course_id=c.id) as core_count,
      (select count(*) from _bi05_v2_grouped x where x.course_id=c.id) as grouped_count
    from public.courses c where upper(c.code)='BI05'
  loop
    if r.topic_count<>63 or r.core_count<>189 or r.grouped_count<>63 then
      raise exception 'BI05 V2 source invariant failed: topics %, core %, grouped %',r.topic_count,r.core_count,r.grouped_count;
    end if;
  end loop;
end
$$;

-- Keep the migration history reproducible, but only V2 is active at runtime.
update public.question_bank
set status='retired',updated_at=now()
where module_code='BI05' and seed_version='bi05-v1' and status<>'retired';

with variants as (
  select * from (values
    ('recall','free_recall',1,75,1,'text',0,true,false),
    ('recognition','recognition',1,60,1,'text',0,true,false),
    ('multiple_choice','multiple_choice',2,60,1,'text',1,true,false),
    ('matching','matching',2,90,3,'matching',1,true,false),
    ('compare','explanation',3,150,3,'text',2,false,false),
    ('error_detection','error_detection',3,150,3,'text',2,false,false),
    ('source_analysis','application',4,180,4,'text',4,false,true),
    ('concept_map','explanation',4,240,4,'diagram',4,false,false),
    ('synthesis','explanation',4,240,5,'text',5,false,true),
    ('transfer_or_research','application',5,300,5,'text',6,false,true)
  ) as v(variant,question_type,difficulty,estimated_seconds,points,answer_mode,transfer_level,pretest_eligible,reserve_for_exam)
), generated as (
  select g.*,v.*,
    case v.variant
      when 'recall' then 'Palauta muistista Iiris 5:n käsite '||g.c1||': mitä se tarkoittaa?'
      when 'recognition' then 'Mikä Iiris 5:n käsite vastaa kuvausta: '||g.d2
      when 'multiple_choice' then 'Mikä käsite vastaa Iiris 5:n kuvausta: '||g.d3
      when 'matching' then 'Yhdistä alaluvun '||g.code||' kolme käsitettä niitä vastaaviin Iiris 5:n määritelmiin.'
      when 'compare' then 'Vertaile käsitteitä '||g.c1||' ja '||g.c2||' Iiris 5:n määritelmien perusteella. Kerro täsmällisesti, miten ne eroavat. Älä lisää sellaista yhtäläisyyttä tai syy-yhteyttä, jota määritelmät eivät tue.'
      when 'error_detection' then 'Opiskelija kirjoittaa: ”'||g.c1||' tarkoittaa seuraavaa: '||g.d2||'” Tunnista virhe ja korjaa väite Iiris 5:n käsitteillä.'
      when 'source_analysis' then 'Tunnista aineiston kolme käsitettä ja perustele jokainen tunnistus kuvauksen perusteella. Selitä lopuksi, miksi ne kuuluvat samaan alalukuun '||g.code||' ('||g.topic_name||').'
      when 'concept_map' then 'Laadi kaavio tai käsitekartta alaluvusta '||g.code||' ('||g.topic_name||') käyttäen käsitteitä '||g.c1||', '||g.c2||' ja '||g.c3||'. Kirjoita jokaisen käsitteen yhteyteen sen Iiris 5:n mukainen merkitys. Yhdistä käsitteet toisiinsa vain siltä osin kuin määritelmät tukevat yhteyttä.'
      when 'synthesis' then 'Selitä alaluvun '||g.code||' ('||g.topic_name||') ydinsisältö käyttäen kaikkia kolmea käsitettä '||g.c1||', '||g.c2||' ja '||g.c3||'. Erota toisistaan käsitteiden määritelmät ja niiden välinen tulkintasi.'
      else case when g.chapter=any(array[4,5,6,7,9,10,11]) then
        'Suunnittele turvallinen ja ei-invasiivinen koulututkimus, joka liittyy alalukuun '||g.code||' ('||g.topic_name||'). Muotoile testattava tutkimuskysymys, nimeä riippumaton ja riippuva muuttuja sekä kaksi vakioitavaa tekijää. Tutkimus ei saa edellyttää lääkityksen muuttamista, biologisten näytteiden ottamista tai muuta terveydellistä riskiä. Kerro lopuksi, miten ainakin yhtä käsitteistä '||g.c1||', '||g.c2||' tai '||g.c3||' käytettäisiin tulosten tulkinnassa.'
      else
        'Opiskelija väittää, että käsitteet '||g.c1||' ja '||g.c2||' tarkoittavat käytännössä samaa asiaa. Arvioi väite Iiris 5:n määritelmien perusteella, korjaa mahdollinen sekaannus ja sijoita myös käsite '||g.c3||' alaluvun kokonaisuuteen.' end
    end as prompt,
    case v.variant
      when 'multiple_choice' then jsonb_build_array(g.c3,g.c1,g.c2,
        (select cc.canonical_name from public.course_concepts cc
         where cc.course_id=g.course_id and cc.canonical_name not in (g.c1,g.c2,g.c3)
         order by md5(cc.canonical_name||g.topic_id::text) limit 1))
      when 'matching' then jsonb_build_array(g.d1,g.d2,g.d3)
      else '[]'::jsonb
    end as options,
    case v.variant
      when 'recall' then g.d1
      when 'recognition' then g.c2
      when 'multiple_choice' then g.c3
      else null::text
    end as correct_answer,
    'Iiris 5: '||g.c1||' = '||g.d1||' '||g.c2||' = '||g.d2||' '||g.c3||' = '||g.d3 as explanation,
    case v.variant
      when 'recall' then jsonb_build_array('Aloita täsmällisestä määritelmästä.','Tarkista, liittyykö määritelmä rakenteeseen, tehtävään, sijaintiin vai säätelyyn.')
      when 'recognition' then jsonb_build_array('Poimi kuvauksesta erottava rakenne tai tehtävä.','Nimeä täsmällinen Iiris 5 -käsite.')
      when 'multiple_choice' then jsonb_build_array('Vertaa jokaista vaihtoehtoa annettuun määritelmään.','Perustele mielessäsi, miksi muut vaihtoehdot eivät sovi.')
      when 'matching' then jsonb_build_array('Etsi ensin selvästi erottuva pari.','Jätä vaikein pari viimeiseksi.')
      when 'compare' then jsonb_build_array('Määrittele molemmat käsitteet erikseen.','Vertaa vasta sitten eroa.')
      when 'error_detection' then jsonb_build_array('Tarkista, kuuluuko annettu määritelmä oikeasti toiselle käsitteelle.','Kirjoita korjaukseen molempien käsitteiden oikea merkitys.')
      when 'source_analysis' then jsonb_build_array('Käsittele aineiston kuvaukset yksi kerrallaan.','Perustele tunnistus määritelmän sanoin, älä pelkällä arvauksella.')
      when 'concept_map' then jsonb_build_array('Aloita kolmesta käsitteestä erillisinä solmuina.','Lisää yhteys vain, jos pystyt perustelemaan sen määritelmillä.')
      when 'synthesis' then jsonb_build_array('Käytä kaikkia kolmea käsitettä.','Pidä määritelmä ja oma yhteenveto erillään toisistaan.')
      else jsonb_build_array('Pidä suunnitelma tai vertailu rajattuna alaluvun käsitteisiin.','Perustele ratkaisu Iiris 5:n määritelmillä.')
    end as hints,
    case
      when v.variant='recall' then array['muistaminen',g.c1]::text[]
      when v.variant='recognition' then array['tunnistaminen',g.c2]::text[]
      when v.variant='multiple_choice' then array['erottelu',g.c3]::text[]
      when v.variant='matching' then array['käsitteiden yhdistäminen','tunnistaminen']::text[]
      when v.variant='compare' then array['vertailu','käsitteellinen erottelu']::text[]
      when v.variant='error_detection' then array['virheen tunnistaminen','käsitteellinen erottelu']::text[]
      when v.variant='source_analysis' then array['aineiston tulkinta','soveltaminen']::text[]
      when v.variant='concept_map' then array['rakenteiden visualisointi','käsitekartta']::text[]
      when v.variant='synthesis' then array['mekanismien selittäminen','kokonaisuuksien yhdistäminen']::text[]
      when g.chapter=any(array[4,5,6,7,9,10,11]) then array['tutkimustaito','soveltaminen']::text[]
      else array['soveltaminen','käsitteellinen erottelu']::text[]
    end as skills,
    case when v.variant='recall' then array[g.c1]::text[]
         when v.variant='recognition' then array[g.c2]::text[]
         when v.variant='multiple_choice' then array[g.c3]::text[]
         else array[g.c1,g.c2,g.c3]::text[] end as expected_concepts,
    case v.variant
      when 'matching' then jsonb_build_array(
        jsonb_build_object('left',g.c1,'right',g.d1),
        jsonb_build_object('left',g.c2,'right',g.d2),
        jsonb_build_object('left',g.c3,'right',g.d3))
      else '[]'::jsonb
    end as matching_pairs,
    case v.variant when 'source_analysis' then jsonb_build_object(
      'aineistoA',g.d1,'aineistoB',g.d2,'aineistoC',g.d3,
      'ohje','Kaikki kuvaukset ovat käyttäjän toimittamasta Iiris 5 -käsiteluettelosta.')
      else '{}'::jsonb end as stimulus_package,
    case
      when v.variant='recall' then array['Määritelmä jää liian yleiseksi.']::text[]
      when v.variant in ('compare','error_detection','transfer_or_research') then array['Käsitteet sekoitetaan toisiinsa.','Vastaukseen lisätään lähteen tukematonta syy-yhteyttä.']::text[]
      else '{}'::text[] end as common_errors,
    case v.variant
      when 'matching' then '3 p: 1 p jokaisesta oikein yhdistetystä parista.'
      when 'compare' then '3 p: molempien käsitteiden oikea määritelmä ja niiden täsmällinen ero.'
      when 'error_detection' then '3 p: virheen tunnistus, oikea käsite ja korjattu määritelmä.'
      when 'source_analysis' then '4 p: kolme oikeaa tunnistusta sekä perusteltu yhteys alalukuun.'
      when 'concept_map' then '4 p: kaikki kolme käsitettä oikein määriteltyinä ja lähteen tukemat yhteydet näkyvissä.'
      when 'synthesis' then '5 p: kaikki kolme käsitettä oikein, selkeä kokonaisuus ja ei lähteen ulkopuolisia väitteitä.'
      when 'transfer_or_research' then '5 p: tehtävän kaikki osat, biologisesti mielekäs perustelu ja käsitteiden täsmällinen käyttö.'
      else '1 p täsmällisestä Iiris 5:n mukaisesta vastauksesta.' end as scoring_guide
  from _bi05_v2_grouped g cross join variants v
)
insert into public.question_bank(
  owner_id,course_id,topic_id,curriculum,module_code,question_type,prompt,
  options,correct_answer,explanation,hints,skills,expected_concepts,
  difficulty,estimated_seconds,status,source_type,content_id,
  prerequisites,common_errors,scoring_guide,exam_eligible,reserve_for_exam,
  validated,points,answer_mode,matching_pairs,seed_version,metadata,
  stimulus_package,transfer_level,pretest_eligible
)
select
  owner_id,course_id,topic_id,'LOPS21','BI05',question_type,prompt,
  options,correct_answer,explanation,hints,skills,expected_concepts,
  difficulty,estimated_seconds,'active','seed',
  'BI05-IIRIS5-V2-'||replace(code,'.','')||'-'||variant,
  '{}'::text[],common_errors,scoring_guide,chapter<>5,(reserve_for_exam and chapter<>5),
  true,points,answer_mode,matching_pairs,'bi05-v2',
  jsonb_build_object(
    'generator','deterministic-iiris5-v2',
    'sourceScope','Iiris 5 käsiteluettelo',
    'scopeValidated',true,
    'chapter',chapter,
    'subchapter',code,
    'questionFamily',variant,
    'researchSkill',(variant='transfer_or_research' and chapter=any(array[4,5,6,7,9,10,11])),
    'reservedForExam',(reserve_for_exam and chapter<>5)
  ),
  stimulus_package,transfer_level,pretest_eligible
from generated
where not exists (
  select 1 from public.question_bank q
  where q.course_id=generated.course_id
    and q.content_id='BI05-IIRIS5-V2-'||replace(generated.code,'.','')||'-'||generated.variant
);

do $$
declare r record; active_count integer; chapter5_exam_count integer; diagram_count integer; matching_count integer; application_count integer; research_count integer;
begin
  for r in select id from public.courses where upper(code)='BI05'
  loop
    select count(*) into active_count from public.question_bank where course_id=r.id and seed_version='bi05-v2' and status='active';
    if active_count<>630 then raise exception 'BI05 V2 active bank invariant failed: expected 630, got %',active_count; end if;

    select count(*) into chapter5_exam_count
    from public.question_bank q join public.topics t on t.id=q.topic_id
    where q.course_id=r.id and q.seed_version='bi05-v2'
      and (q.metadata->>'chapter')::integer=5 and (q.exam_eligible or q.reserve_for_exam);
    if chapter5_exam_count<>0 then raise exception 'BI05 V2 chapter 5 leaked into exam bank: %',chapter5_exam_count; end if;

    select count(*) into diagram_count from public.question_bank where course_id=r.id and seed_version='bi05-v2' and answer_mode='diagram';
    select count(*) into matching_count from public.question_bank where course_id=r.id and seed_version='bi05-v2' and question_type='matching';
    select count(*) into application_count from public.question_bank where course_id=r.id and seed_version='bi05-v2' and question_type='application';
    select count(*) into research_count from public.question_bank where course_id=r.id and seed_version='bi05-v2' and metadata->>'researchSkill'='true';

    if diagram_count<>63 or matching_count<>63 or application_count<>126 or research_count<>30 then
      raise exception 'BI05 V2 mix invariant failed: diagram %, matching %, application %, research %',diagram_count,matching_count,application_count,research_count;
    end if;
  end loop;
end
$$;