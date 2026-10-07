-- BI05 · Ihmisen biologia / Iiris 5
-- Canonical course structure: 63 textbook subchapters.
-- The two exam scopes are explicitly confidence-labelled. Chapter 5 is
-- teacher/user-confirmed outside both exams; all other split rows are only a
-- provisional planning estimate until the teacher confirms the exact scopes.

create table if not exists public.exam_topic_scopes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  status text not null check (status in ('included','excluded')),
  confidence text not null check (confidence in ('confirmed','provisional')),
  source text not null default 'manual',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (exam_id, topic_id)
);

create index if not exists exam_topic_scopes_owner_exam_idx
  on public.exam_topic_scopes(owner_id, exam_id);
create index if not exists exam_topic_scopes_owner_topic_idx
  on public.exam_topic_scopes(owner_id, topic_id);

alter table public.exam_topic_scopes enable row level security;

drop policy if exists "personal exam topic scopes" on public.exam_topic_scopes;
create policy "personal exam topic scopes"
on public.exam_topic_scopes
for all
to authenticated
using (
  owner_id = (select auth.uid())
  and exists (
    select 1 from public.exams e
    where e.id = exam_topic_scopes.exam_id
      and e.owner_id = (select auth.uid())
  )
)
with check (
  owner_id = (select auth.uid())
  and exists (
    select 1 from public.exams e
    where e.id = exam_topic_scopes.exam_id
      and e.owner_id = (select auth.uid())
  )
  and exists (
    select 1 from public.topics t
    where t.id = exam_topic_scopes.topic_id
      and t.owner_id = (select auth.uid())
  )
);

revoke all on table public.exam_topic_scopes from anon;
grant select, insert, update, delete on table public.exam_topic_scopes to authenticated;
grant all on table public.exam_topic_scopes to service_role;

create temporary table _bi05_topics (
  code text primary key,
  chapter integer not null,
  position integer not null,
  name text not null,
  weight numeric not null,
  importance integer not null,
  materials text not null,
  school_covered boolean not null,
  exam_eligible boolean not null
) on commit drop;

insert into _bi05_topics(code,chapter,position,name,weight,importance,materials,school_covered,exam_eligible) values
  ('1.1',1,1,'1.1 Kudokset',1.400000,4,'Iiris 5 · luku 1: Ihminen koostuu soluista · työmääräarvio 25 min',true,true),
  ('1.2',1,2,'1.2 Elimet ja elimistöt',1.400000,4,'Iiris 5 · luku 1: Ihminen koostuu soluista · työmääräarvio 25 min',false,true),
  ('1.3',1,3,'1.3 Kantasolut',1.400000,4,'Iiris 5 · luku 1: Ihminen koostuu soluista · työmääräarvio 25 min',false,true),
  ('1.4',1,4,'1.4 Solujen välinen yhteistyö',1.400000,4,'Iiris 5 · luku 1: Ihminen koostuu soluista · työmääräarvio 25 min',false,true),
  ('1.5',1,5,'1.5 Syöpä',1.400000,4,'Iiris 5 · luku 1: Ihminen koostuu soluista · työmääräarvio 35 min',false,true),
  ('2.1',2,6,'2.1 Elimistön säätelyjärjestelmä',1.600000,5,'Iiris 5 · luku 2: Hormonit välittävät viestejä · työmääräarvio 30 min',false,true),
  ('2.2',2,7,'2.2 Rasva- ja vesiliukoiset hormonit',1.600000,5,'Iiris 5 · luku 2: Hormonit välittävät viestejä · työmääräarvio 35 min',false,true),
  ('2.3',2,8,'2.3 Hormonierityksen säätely',1.600000,5,'Iiris 5 · luku 2: Hormonit välittävät viestejä · työmääräarvio 35 min',false,true),
  ('2.4',2,9,'2.4 Homeostasian säätely',1.600000,5,'Iiris 5 · luku 2: Hormonit välittävät viestejä · työmääräarvio 35 min',false,true),
  ('2.5',2,10,'2.5 Vuorokausirytmin säätely',1.600000,5,'Iiris 5 · luku 2: Hormonit välittävät viestejä · työmääräarvio 25 min',false,true),
  ('3.1',3,11,'3.1 Hermosolun rakenne',2.666667,5,'Iiris 5 · luku 3: Hermosolussa viesti kulkee nopeasti · työmääräarvio 30 min',false,true),
  ('3.2',3,12,'3.2 Hermoimpulssin kulku',2.666667,5,'Iiris 5 · luku 3: Hermosolussa viesti kulkee nopeasti · työmääräarvio 45 min',false,true),
  ('3.3',3,13,'3.3 Synapsien toiminta',2.666667,5,'Iiris 5 · luku 3: Hermosolussa viesti kulkee nopeasti · työmääräarvio 40 min',false,true),
  ('4.1',4,14,'4.1 Hermoston rakenne',3.500000,4,'Iiris 5 · luku 4: Aivot ohjaavat elimistöä · työmääräarvio 35 min',false,true),
  ('4.2',4,15,'4.2 Aivojen rakenne ja toiminta',3.500000,4,'Iiris 5 · luku 4: Aivot ohjaavat elimistöä · työmääräarvio 50 min',false,true),
  ('5.1',5,16,'5.1 Aistirata',1.333333,4,'Iiris 5 · luku 5: Aistit vastaanottavat informaatiota · työmääräarvio 25 min',false,false),
  ('5.2',5,17,'5.2 Makuaisti',1.333333,4,'Iiris 5 · luku 5: Aistit vastaanottavat informaatiota · työmääräarvio 20 min',false,false),
  ('5.3',5,18,'5.3 Hajuaisti',1.333333,4,'Iiris 5 · luku 5: Aistit vastaanottavat informaatiota · työmääräarvio 20 min',false,false),
  ('5.4',5,19,'5.4 Näköaisti',1.333333,4,'Iiris 5 · luku 5: Aistit vastaanottavat informaatiota · työmääräarvio 45 min',false,false),
  ('5.5',5,20,'5.5 Kuuloaisti',1.333333,4,'Iiris 5 · luku 5: Aistit vastaanottavat informaatiota · työmääräarvio 45 min',false,false),
  ('5.6',5,21,'5.6 Asento-, liike- ja tasapainoaisti',1.333333,4,'Iiris 5 · luku 5: Aistit vastaanottavat informaatiota · työmääräarvio 30 min',false,false),
  ('6.1',6,22,'6.1 Ihon rakenne',1.666667,3,'Iiris 5 · luku 6: Iho on elimistön suurin elin · työmääräarvio 30 min',false,true),
  ('6.2',6,23,'6.2 Ihon aistit',1.666667,3,'Iiris 5 · luku 6: Iho on elimistön suurin elin · työmääräarvio 25 min',false,true),
  ('6.3',6,24,'6.3 Iho ja lämmönsäätely',1.666667,3,'Iiris 5 · luku 6: Iho on elimistön suurin elin · työmääräarvio 35 min',false,true),
  ('7.1',7,25,'7.1 Veri',1.428571,5,'Iiris 5 · luku 7: Verenkiertoelimistö huoltaa kehoa · työmääräarvio 35 min',false,true),
  ('7.2',7,26,'7.2 Sydän',1.428571,5,'Iiris 5 · luku 7: Verenkiertoelimistö huoltaa kehoa · työmääräarvio 40 min',false,true),
  ('7.3',7,27,'7.3 Verisuonet',1.428571,5,'Iiris 5 · luku 7: Verenkiertoelimistö huoltaa kehoa · työmääräarvio 30 min',false,true),
  ('7.4',7,28,'7.4 Imusuonisto',1.428571,5,'Iiris 5 · luku 7: Verenkiertoelimistö huoltaa kehoa · työmääräarvio 25 min',false,true),
  ('7.5',7,29,'7.5 Pieni ja suuri verenkierto',1.428571,5,'Iiris 5 · luku 7: Verenkiertoelimistö huoltaa kehoa · työmääräarvio 35 min',false,true),
  ('7.6',7,30,'7.6 Verenpaine',1.428571,5,'Iiris 5 · luku 7: Verenkiertoelimistö huoltaa kehoa · työmääräarvio 30 min',false,true),
  ('7.7',7,31,'7.7 Verenkierron ja verenpaineen säätely',1.428571,5,'Iiris 5 · luku 7: Verenkiertoelimistö huoltaa kehoa · työmääräarvio 35 min',false,true),
  ('8.1',8,32,'8.1 Hengityselimistö',2.333333,4,'Iiris 5 · luku 8: Hengitystä tarvitaan energian vapauttamiseen · työmääräarvio 35 min',false,true),
  ('8.2',8,33,'8.2 Hengitys',2.333333,4,'Iiris 5 · luku 8: Hengitystä tarvitaan energian vapauttamiseen · työmääräarvio 40 min',false,true),
  ('8.3',8,34,'8.3 Hengityksen säätely',2.333333,4,'Iiris 5 · luku 8: Hengitystä tarvitaan energian vapauttamiseen · työmääräarvio 35 min',false,true),
  ('9.1',9,35,'9.1 Ruuansulatuselimistö',1.750000,4,'Iiris 5 · luku 9: Elimistöä ravitseva ruuansulatus · työmääräarvio 35 min',false,true),
  ('9.2',9,36,'9.2 Ravintoaineiden hajoaminen',1.750000,4,'Iiris 5 · luku 9: Elimistöä ravitseva ruuansulatus · työmääräarvio 40 min',false,true),
  ('9.3',9,37,'9.3 Ravintoaineiden imeytyminen',1.750000,4,'Iiris 5 · luku 9: Elimistöä ravitseva ruuansulatus · työmääräarvio 35 min',false,true),
  ('9.4',9,38,'9.4 Ruuansulatuksen ja ruokahalun säätely',1.750000,4,'Iiris 5 · luku 9: Elimistöä ravitseva ruuansulatus · työmääräarvio 30 min',false,true),
  ('10.1',10,39,'10.1 Maksan tehtävät ja toiminta',1.750000,5,'Iiris 5 · luku 10: Munuaiset ja maksa ovat tärkeitä erityselimiä · työmääräarvio 35 min',false,true),
  ('10.2',10,40,'10.2 Munuaisten tehtävät',1.750000,5,'Iiris 5 · luku 10: Munuaiset ja maksa ovat tärkeitä erityselimiä · työmääräarvio 25 min',false,true),
  ('10.3',10,41,'10.3 Munuaisten toiminta',1.750000,5,'Iiris 5 · luku 10: Munuaiset ja maksa ovat tärkeitä erityselimiä · työmääräarvio 45 min',false,true),
  ('10.4',10,42,'10.4 Virtsatiet',1.750000,5,'Iiris 5 · luku 10: Munuaiset ja maksa ovat tärkeitä erityselimiä · työmääräarvio 25 min',false,true),
  ('11.1',11,43,'11.1 Luuston tehtävät ja rakenne',1.500000,4,'Iiris 5 · luku 11: Ihminen liikkuu luiden ja lihasten avulla · työmääräarvio 30 min',false,true),
  ('11.2',11,44,'11.2 Luiden väliset liitokset',1.500000,4,'Iiris 5 · luku 11: Ihminen liikkuu luiden ja lihasten avulla · työmääräarvio 25 min',false,true),
  ('11.3',11,45,'11.3 Lihasten tehtävät ja rakenne',1.500000,4,'Iiris 5 · luku 11: Ihminen liikkuu luiden ja lihasten avulla · työmääräarvio 30 min',false,true),
  ('11.4',11,46,'11.4 Luustolihaksen toiminta',1.500000,4,'Iiris 5 · luku 11: Ihminen liikkuu luiden ja lihasten avulla · työmääräarvio 40 min',false,true),
  ('12.1',12,47,'12.1 Mikrobit',1.285714,5,'Iiris 5 · luku 12: Puolustusjärjestelmä suojaa elimistöä · työmääräarvio 25 min',false,true),
  ('12.2',12,48,'12.2 Vieraiden rakenteiden tunnistaminen',1.285714,5,'Iiris 5 · luku 12: Puolustusjärjestelmä suojaa elimistöä · työmääräarvio 30 min',false,true),
  ('12.3',12,49,'12.3 Synnynnäinen puolustus',1.285714,5,'Iiris 5 · luku 12: Puolustusjärjestelmä suojaa elimistöä · työmääräarvio 35 min',false,true),
  ('12.4',12,50,'12.4 Hankittu puolustus',1.285714,5,'Iiris 5 · luku 12: Puolustusjärjestelmä suojaa elimistöä · työmääräarvio 45 min',false,true),
  ('12.5',12,51,'12.5 Allergia',1.285714,5,'Iiris 5 · luku 12: Puolustusjärjestelmä suojaa elimistöä · työmääräarvio 25 min',false,true),
  ('12.6',12,52,'12.6 Veriryhmät',1.285714,5,'Iiris 5 · luku 12: Puolustusjärjestelmä suojaa elimistöä · työmääräarvio 30 min',false,true),
  ('12.7',12,53,'12.7 Aktiivinen ja passiivinen immunisaatio',1.285714,5,'Iiris 5 · luku 12: Puolustusjärjestelmä suojaa elimistöä · työmääräarvio 30 min',false,true),
  ('13.1',13,54,'13.1 Miehen sukuelimet',1.250000,4,'Iiris 5 · luku 13: Sukuelimet ja sukupuolen kehitys · työmääräarvio 30 min',false,true),
  ('13.2',13,55,'13.2 Naisen sukuelimet',1.250000,4,'Iiris 5 · luku 13: Sukuelimet ja sukupuolen kehitys · työmääräarvio 30 min',false,true),
  ('13.3',13,56,'13.3 Kuukautiskierto',1.250000,4,'Iiris 5 · luku 13: Sukuelimet ja sukupuolen kehitys · työmääräarvio 45 min',false,true),
  ('13.4',13,57,'13.4 Sukupuoliominaisuuksien muutokset elinkierron aikana',1.250000,4,'Iiris 5 · luku 13: Sukuelimet ja sukupuolen kehitys · työmääräarvio 30 min',false,true),
  ('14.1',14,58,'14.1 Hedelmöitys',1.000000,4,'Iiris 5 · luku 14: Yksilönkehityksen ratkaisevat alkuvaiheet · työmääräarvio 30 min',false,true),
  ('14.2',14,59,'14.2 Raskauden vaiheet',1.000000,4,'Iiris 5 · luku 14: Yksilönkehityksen ratkaisevat alkuvaiheet · työmääräarvio 35 min',false,true),
  ('14.3',14,60,'14.3 Istukka',1.000000,4,'Iiris 5 · luku 14: Yksilönkehityksen ratkaisevat alkuvaiheet · työmääräarvio 25 min',false,true),
  ('14.4',14,61,'14.4 Sikiönkehityksen seuranta',1.000000,4,'Iiris 5 · luku 14: Yksilönkehityksen ratkaisevat alkuvaiheet · työmääräarvio 30 min',false,true),
  ('14.5',14,62,'14.5 Synnytys',1.000000,4,'Iiris 5 · luku 14: Yksilönkehityksen ratkaisevat alkuvaiheet · työmääräarvio 30 min',false,true),
  ('14.6',14,63,'14.6 Raskauteen liittyviä ongelmia',1.000000,4,'Iiris 5 · luku 14: Yksilönkehityksen ratkaisevat alkuvaiheet · työmääräarvio 25 min',false,true);

-- Seed BI05 for the current canonical study profile(s). The app is personal,
-- and onboarding_completed identifies the active reconciled Arthur profile.
insert into public.courses(
  owner_id, code, name, subject, start_date, exam_date,
  target_system, target_value, color, weekly_minutes
)
select
  p.owner_id, 'BI05', 'Ihmisen biologia', 'Biologia', '2026-10-06'::date,
  '2026-10-29'::date, 'school', '10', 'forest', 180
from public.user_preferences p
where p.onboarding_completed = true
  and not exists (
    select 1 from public.courses c
    where c.owner_id = p.owner_id and upper(c.code) = 'BI05'
  );

update public.courses c
set name = 'Ihmisen biologia',
    subject = 'Biologia',
    start_date = '2026-10-06'::date,
    exam_date = '2026-10-29'::date,
    target_system = 'school',
    target_value = '10',
    color = 'forest',
    weekly_minutes = 180
where upper(c.code) = 'BI05'
  and exists (
    select 1 from public.user_preferences p
    where p.owner_id = c.owner_id and p.onboarding_completed = true
  );

insert into public.topics(
  owner_id, course_id, name, position, weight, importance, materials, school_covered, exam_relevance
)
select
  c.owner_id, c.id, b.name, b.position, b.weight, b.importance, b.materials,
  b.school_covered,
  case when b.exam_eligible then 1 else 0 end
from public.courses c
cross join _bi05_topics b
where upper(c.code) = 'BI05'
  and exists (
    select 1 from public.user_preferences p
    where p.owner_id = c.owner_id and p.onboarding_completed = true
  )
  and not exists (
    select 1 from public.topics t where t.course_id = c.id and t.name = b.name
  );

update public.topics t
set owner_id = c.owner_id,
    position = b.position,
    weight = b.weight,
    importance = b.importance,
    materials = b.materials,
    school_covered = case when b.code = '1.1' then true else t.school_covered end,
    exam_relevance = case when b.exam_eligible then 1 else 0 end
from public.courses c, _bi05_topics b
where t.course_id = c.id
  and upper(c.code) = 'BI05'
  and t.name = b.name;

insert into public.exams(owner_id, course_id, name, date, target_system, target_value)
select c.owner_id, c.id, e.name, e.date, 'school', '10'
from public.courses c
cross join (values
  ('BI05 koe 1','2026-10-29'::date),
  ('BI05 koe 2','2026-11-20'::date)
) e(name,date)
where upper(c.code) = 'BI05'
  and exists (
    select 1 from public.user_preferences p
    where p.owner_id = c.owner_id and p.onboarding_completed = true
  )
  and not exists (
    select 1 from public.exams x
    where x.course_id = c.id and x.name = e.name
  );

-- Confirmed exclusion: Iiris chapter 5 is not in either course exam.
insert into public.exam_topic_scopes(owner_id, exam_id, topic_id, status, confidence, source)
select e.owner_id, e.id, t.id, 'excluded', 'confirmed', 'user-confirmed-2026-10-07'
from public.exams e
join public.courses c on c.id = e.course_id and upper(c.code) = 'BI05'
join public.topics t on t.course_id = c.id
where e.name in ('BI05 koe 1','BI05 koe 2')
  and split_part(t.name,'.',1)::integer = 5
on conflict (exam_id,topic_id) do update set
  status = excluded.status,
  confidence = excluded.confidence,
  source = excluded.source,
  updated_at = now();

-- Provisional half-and-half planning estimate. This is deliberately marked
-- provisional and is replaced by confirmed rows when the teacher gives scope.
insert into public.exam_topic_scopes(owner_id, exam_id, topic_id, status, confidence, source)
select e.owner_id, e.id, t.id, 'included', 'provisional', 'planning-estimate-2026-10-07'
from public.exams e
join public.courses c on c.id = e.course_id and upper(c.code) = 'BI05'
join public.topics t on t.course_id = c.id
where (
    e.name = 'BI05 koe 1'
    and split_part(t.name,'.',1)::integer = any(array[1,2,3,4,6,7,8])
  ) or (
    e.name = 'BI05 koe 2'
    and split_part(t.name,'.',1)::integer = any(array[9,10,11,12,13,14])
  )
on conflict (exam_id,topic_id) do update set
  status = case when public.exam_topic_scopes.confidence = 'confirmed' then public.exam_topic_scopes.status else excluded.status end,
  confidence = case when public.exam_topic_scopes.confidence = 'confirmed' then public.exam_topic_scopes.confidence else excluded.confidence end,
  source = case when public.exam_topic_scopes.confidence = 'confirmed' then public.exam_topic_scopes.source else excluded.source end,
  updated_at = now();

insert into public.study_materials(owner_id, course_id, name, kind, topic_ids, text_preview, metadata)
select
  c.owner_id,
  c.id,
  'Iiris 5 · Ihmisen biologia',
  'text',
  coalesce(array_agg(t.id order by t.position), '{}'::uuid[]),
  'Kanoninen BI05-rakenne perustuu käyttäjän toimittamaan Iiris 5 -sisällysluetteloon ja käsiteluetteloon. Arvioitava sisältö rajataan LOPS21 BI05 -moduuliin.',
  jsonb_build_object(
    'curriculum','LOPS21',
    'module','BI05',
    'sourceScope','Iiris 5',
    'canonical',true,
    'examScopeStatus','provisional except chapter 5 exclusion'
  )
from public.courses c
join public.topics t on t.course_id = c.id
where upper(c.code) = 'BI05'
group by c.owner_id,c.id
having not exists (
  select 1 from public.study_materials sm
  where sm.course_id = c.id and sm.name = 'Iiris 5 · Ihmisen biologia'
);
