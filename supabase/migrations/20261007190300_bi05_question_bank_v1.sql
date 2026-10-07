-- BI05 V1: 630 deterministic, source-grounded questions.
-- Each of the 63 Iiris 5 subchapters is assigned three curated core concepts.
-- Definitions come from public.course_concepts, seeded from the user-provided Iiris 5 glossary.
-- V1 is retained as a migration prerequisite for V2. V2 retires these rows after
-- deriving its curated concept mapping.

create temporary table _bi05_core_map(
  code text not null,
  canonical_name text not null,
  primary key(code,canonical_name)
) on commit drop;

insert into _bi05_core_map(code,canonical_name) values
('1.1','kudos'),('1.1','epiteelikudos'),('1.1','side- ja tukikudos'),
('1.2','elin'),('1.2','elimistö'),('1.2','rauhanen'),
('1.3','kantasolu'),('1.3','erilaistuminen'),('1.3','pluripotentti'),
('1.4','reseptori'),('1.4','vaste'),('1.4','kudoshormoni'),
('1.5','syöpä'),('1.5','kasvain'),('1.5','karsinogeeni'),
('2.1','elimistön säätelyjärjestelmä'),('2.1','homeostasia'),('2.1','hypotalamus'),
('2.2','rasvaliukoinen hormoni'),('2.2','vesiliukoinen hormoni'),('2.2','toisiolähetti'),
('2.3','palautesäätely'),('2.3','hormoni'),('2.3','aivolisäke'),
('2.4','homeostasia'),('2.4','insuliini'),('2.4','glukagoni'),
('2.5','melatoniini'),('2.5','käpyrauhanen'),('2.5','vireystila'),
('3.1','hermosolu'),('3.1','tuojahaarake'),('3.1','viejähaarake'),
('3.2','toimintajännite'),('3.2','lepojännite'),('3.2','natrium-kaliumpumppu'),
('3.3','synapsi'),('3.3','välittäjäaine'),('3.3','synapsirako'),
('4.1','keskushermosto'),('4.1','ääreishermosto'),('4.1','autonominen hermosto'),
('4.2','isoaivot'),('4.2','pikkuaivot'),('4.2','aivorunko'),
('5.1','aistirata'),('5.1','aistinreseptori'),('5.1','aistinsolu'),
('5.2','makusilmu'),('5.2','makuhermo'),('5.2','aistinsolu'),
('5.3','hajuepiteeli'),('5.3','hajukäämi'),('5.3','hajuhermo'),
('5.4','verkkokalvo'),('5.4','sauvasolu'),('5.4','tappisolu'),
('5.5','tärykalvo'),('5.5','kuuloluut'),('5.5','simpukka'),
('5.6','tasapainoelin'),('5.6','kaarikäytävät'),('5.6','soikea rakkula'),
('6.1','orvaskesi'),('6.1','verinahka'),('6.1','ihonalaiskerros'),
('6.2','tuntoaistinsolu'),('6.2','vapaa hermopääte'),('6.2','aistinreseptori'),
('6.3','hikirauhanen'),('6.3','karvankohottajalihas'),('6.3','homeostasia'),
('7.1','punasolu'),('7.1','valkosolu'),('7.1','verihiutale'),
('7.2','sydän'),('7.2','eteinen'),('7.2','kammio'),
('7.3','valtimo'),('7.3','laskimo'),('7.3','hiussuoni'),
('7.4','imusuonisto'),('7.4','imusolmuke'),('7.4','imuneste'),
('7.5','pieni verenkierto'),('7.5','suuri verenkierto'),('7.5','aortta'),
('7.6','verenpaine'),('7.6','supistumisvaihe'),('7.6','lepovaihe'),
('7.7','adrenaliini'),('7.7','reniini'),('7.7','angiotensiini'),
('8.1','hengityselimistö'),('8.1','henkitorvi'),('8.1','keuhkorakkula'),
('8.2','sisäänhengitys'),('8.2','uloshengitys'),('8.2','kaasujenvaihto'),
('8.3','hengityskeskus'),('8.3','ydinjatke'),('8.3','homeostasia'),
('9.1','ruuansulatuselimistö'),('9.1','ruuansulatuskanava'),('9.1','haima'),
('9.2','ruuansulatusentsyymi'),('9.2','amylaasientsyymi'),('9.2','lipaasientsyymi'),
('9.3','nukkalisäke'),('9.3','mikrovillus'),('9.3','porttilaskimo'),
('9.4','nälkäkeskus'),('9.4','kylläisyyskeskus'),('9.4','hypotalamus'),
('10.1','maksa'),('10.1','bilirubiini'),('10.1','urea'),
('10.2','munuainen'),('10.2','erityselimistö'),('10.2','virtsanerityselimistö'),
('10.3','nefroni'),('10.3','munuaiskeränen'),('10.3','takaisinimeytyminen'),
('10.4','virtsanjohdin'),('10.4','virtsarakko'),('10.4','virtsaputki'),
('11.1','luukudos'),('11.1','tiivisluu'),('11.1','hohkaluu'),
('11.2','nivel'),('11.2','nivelside'),('11.2','nivelrusto'),
('11.3','luustolihas'),('11.3','lihassolu'),('11.3','jänne'),
('11.4','sarkomeeri'),('11.4','aktiini'),('11.4','myosiini'),
('12.1','mikrobi'),('12.1','infektio'),('12.1','normaalikasvusto'),
('12.2','antigeeni'),('12.2','vasta-aine'),('12.2','immuunivaste'),
('12.3','synnynnäinen puolustus'),('12.3','neutrofiili'),('12.3','tulehdusreaktio'),
('12.4','hankittu puolustus'),('12.4','B-solu'),('12.4','T-auttajasolu'),
('12.5','allergia'),('12.5','allergeeni'),('12.5','histamiini'),
('12.6','ABO-veriryhmäjärjestelmä'),('12.6','Rh-järjestelmä'),('12.6','reesustekijä'),
('12.7','rokotus'),('12.7','passiivinen immunisaatio'),('12.7','muistisolu'),
('13.1','kivekset'),('13.1','lisäkives'),('13.1','siemenjohdin'),
('13.2','munasarja'),('13.2','munanjohdin'),('13.2','kohtu'),
('13.3','kuukautiskierto'),('13.3','ovulaatio'),('13.3','keltarauhanen'),
('13.4','murrosikä'),('13.4','primaarinen sukupuoliominaisuus'),('13.4','sekundaarinen sukupuoliominaisuus'),
('14.1','hedelmöitys'),('14.1','tsygootti'),('14.1','gonadi'),
('14.2','morula'),('14.2','alkiorakkula'),('14.2','gastrulaatio'),
('14.3','istukka'),('14.3','napanuora'),('14.3','lapsivesi'),
('14.4','NIPT-tutkimus'),('14.4','ultraäänitutkimus'),('14.4','lapsivesitutkimus'),
('14.5','avautumisvaihe'),('14.5','ponnistusvaihe'),('14.5','jälkeisvaihe'),
('14.6','keskenmeno'),('14.6','keskonen'),('14.6','lapsettomuus');

with mapped as (
  select c.owner_id,c.id as course_id,t.id as topic_id,t.name as topic_name,
    split_part(m.code,'.',1)::integer as chapter,m.code,v.canonical_name,v.aliases,v.definition
  from public.courses c
  join public.topics t on t.course_id=c.id
  join _bi05_core_map m on t.name like m.code || ' %'
  join public.course_concepts v on v.course_id=c.id and v.canonical_name=m.canonical_name
  where upper(c.code)='BI05'
), variants as (
  select mapped.*,x.variant,x.question_type,x.difficulty,x.estimated_seconds,x.points
  from mapped cross join (values
    ('define','free_recall',1,60,1),
    ('recognize','recognition',2,60,1),
    ('explain','explanation',3,120,2)
  ) as x(variant,question_type,difficulty,estimated_seconds,points)
)
insert into public.question_bank(
  owner_id,course_id,topic_id,curriculum,module_code,question_type,prompt,
  options,correct_answer,explanation,hints,skills,expected_concepts,
  difficulty,estimated_seconds,status,source_type,content_id,
  prerequisites,common_errors,scoring_guide,exam_eligible,reserve_for_exam,
  validated,points,answer_mode,matching_pairs,seed_version,metadata
)
select owner_id,course_id,topic_id,'LOPS21','BI05',question_type,
  case variant
    when 'define' then 'Määrittele Iiris 5:n mukainen käsite: ' || canonical_name || '.'
    when 'recognize' then 'Mikä käsite vastaa kuvausta: ' || definition
    else 'Selitä omin sanoin, mitä käsite ' || canonical_name || ' tarkoittaa. Kuvaa myös sen keskeinen biologinen tehtävä tai merkitys silloin, kun se käy määritelmästä ilmi.'
  end,
  '[]'::jsonb,definition,
  'Iiris 5: ' || canonical_name || ' = ' || definition,
  case variant
    when 'define' then jsonb_build_array('Mieti ensin, mihin elimistön rakenteeseen tai toimintoon käsite liittyy.','Muotoile määritelmä rakenteen ja tehtävän kautta.')
    when 'recognize' then jsonb_build_array('Etsi kuvauksesta rakenteen tai toiminnan tunnuspiirre.','Nimeä täsmällinen Iiris 5 -käsite.')
    else jsonb_build_array('Aloita käsitteen määritelmästä.','Lisää sen jälkeen määritelmässä kuvattu tehtävä, sijainti tai vaikutus.')
  end,
  array[topic_name,canonical_name]::text[],array_prepend(canonical_name,aliases)::text[],
  difficulty,estimated_seconds,'active','seed',
  'BI05-IIRIS5-' || replace(code,'.','') || '-' || lower(regexp_replace(canonical_name,'[^a-zA-Z0-9åäöÅÄÖ]+','-','g')) || '-' || variant,
  '{}'::text[],'{}'::text[],
  'Hyvä vastaus vastaa Iiris 5 -käsiteluettelon määritelmää. Hyväksy kanoninen nimi ja tallennetut rinnakkaisnimet.',
  chapter<>5,false,true,points,'text','[]'::jsonb,'bi05-v1',
  jsonb_build_object('generator','deterministic-iiris5-vocabulary','sourceScope','Iiris 5 käsiteluettelo','mapping','curated-subchapter-core','scopeValidated',true,'chapter',chapter,'subchapter',code)
from variants
where not exists (
  select 1 from public.question_bank q
  where q.course_id=variants.course_id
    and q.content_id='BI05-IIRIS5-' || replace(variants.code,'.','') || '-' || lower(regexp_replace(variants.canonical_name,'[^a-zA-Z0-9åäöÅÄÖ]+','-','g')) || '-' || variants.variant
);

with core as (
  select c.owner_id,c.id as course_id,t.id as topic_id,t.name as topic_name,
    split_part(m.code,'.',1)::integer as chapter,m.code,v.canonical_name,v.definition,
    row_number() over(partition by c.id,m.code order by v.canonical_name) as rn
  from public.courses c
  join public.topics t on t.course_id=c.id
  join _bi05_core_map m on t.name like m.code || ' %'
  join public.course_concepts v on v.course_id=c.id and v.canonical_name=m.canonical_name
  where upper(c.code)='BI05'
), grouped as (
  select owner_id,course_id,topic_id,topic_name,chapter,code,
    max(canonical_name) filter(where rn=1) as correct,
    max(definition) filter(where rn=1) as definition,
    max(canonical_name) filter(where rn=2) as distractor_1,
    max(canonical_name) filter(where rn=3) as distractor_2
  from core group by owner_id,course_id,topic_id,topic_name,chapter,code
)
insert into public.question_bank(
  owner_id,course_id,topic_id,curriculum,module_code,question_type,prompt,
  options,correct_answer,explanation,hints,skills,expected_concepts,
  difficulty,estimated_seconds,status,source_type,content_id,
  prerequisites,common_errors,scoring_guide,exam_eligible,reserve_for_exam,
  validated,points,answer_mode,matching_pairs,seed_version,metadata
)
select g.owner_id,g.course_id,g.topic_id,'LOPS21','BI05','multiple_choice',
  'Mikä käsite vastaa Iiris 5:n kuvausta: ' || g.definition,
  jsonb_build_array(g.correct,g.distractor_1,g.distractor_2,
    (select cc.canonical_name from public.course_concepts cc
     where cc.course_id=g.course_id and cc.canonical_name not in (g.correct,g.distractor_1,g.distractor_2)
     order by md5(cc.canonical_name || g.topic_id::text) limit 1)),
  g.correct,'Oikea käsite on ' || g.correct || '. ' || g.definition,
  jsonb_build_array('Etsi kuvauksesta rakenteen tai toiminnan erottava tuntomerkki.','Rajaa vaihtoehdot sen perusteella, mihin elimistön kokonaisuuteen kuvaus kuuluu.'),
  array[g.topic_name,g.correct]::text[],array[g.correct]::text[],
  2,60,'active','seed','BI05-IIRIS5-' || replace(g.code,'.','') || '-mc-core',
  '{}'::text[],'{}'::text[],'1 p oikeasta Iiris 5 -käsitteestä.',
  g.chapter<>5,g.chapter<>5,true,1,'text','[]'::jsonb,'bi05-v1',
  jsonb_build_object('generator','deterministic-iiris5-vocabulary','sourceScope','Iiris 5 käsiteluettelo','mapping','curated-subchapter-core','scopeValidated',true,'chapter',g.chapter,'subchapter',g.code,'reservedForExam',g.chapter<>5)
from grouped g
where not exists (
  select 1 from public.question_bank q
  where q.course_id=g.course_id and q.content_id='BI05-IIRIS5-' || replace(g.code,'.','') || '-mc-core'
);

do $$
declare course_row record; question_count integer; concept_count integer; chapter5_exam_count integer;
begin
  for course_row in select id from public.courses where upper(code)='BI05'
  loop
    select count(*) into concept_count from public.course_concepts where course_id=course_row.id;
    if concept_count<>183 then raise exception 'BI05 vocabulary invariant failed: expected 183, got %',concept_count; end if;
    select count(*) into question_count from public.question_bank where course_id=course_row.id and seed_version='bi05-v1';
    if question_count<>630 then raise exception 'BI05 question bank invariant failed: expected 630, got %',question_count; end if;
    select count(*) into chapter5_exam_count
    from public.question_bank q join public.topics t on t.id=q.topic_id
    where q.course_id=course_row.id and q.seed_version='bi05-v1'
      and split_part(t.name,'.',1)::integer=5 and (q.exam_eligible or q.reserve_for_exam);
    if chapter5_exam_count<>0 then raise exception 'BI05 chapter 5 leaked into exam-eligible question bank: %',chapter5_exam_count; end if;
  end loop;
end
$$;