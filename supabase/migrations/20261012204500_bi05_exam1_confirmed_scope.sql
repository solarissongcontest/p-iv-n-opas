-- BI05 koe 1 scope confirmed from the teacher's exam information on 2026-10-12.
-- Confirmed scope: chapters 1–4 and 7. Chapter 5 remains outside both course exams;
-- chapters 6 and 8 are explicitly outside exam 1. School has already covered chapters 1–3.

update public.topics t
set school_covered = true,
    updated_at = now()
from public.courses c
where t.course_id = c.id
  and upper(c.code) = 'BI05'
  and split_part(t.name, '.', 1)::integer between 1 and 3;

update public.exam_topic_scopes s
set status = case
      when split_part(t.name, '.', 1)::integer in (1,2,3,4,7) then 'included'
      else 'excluded'
    end,
    confidence = 'confirmed',
    source = 'teacher-confirmed-2026-10-12',
    updated_at = now()
from public.exams e
join public.courses c on c.id = e.course_id
join public.topics t on t.course_id = c.id
where s.exam_id = e.id
  and s.topic_id = t.id
  and upper(c.code) = 'BI05'
  and e.date = date '2026-10-29'
  and split_part(t.name, '.', 1)::integer between 1 and 8;

-- Only untouched future plan rows are replaced. Completed work and linked sessions survive.
delete from public.plan_items p
using public.courses c
where p.course_id = c.id
  and upper(c.code) = 'BI05'
  and p.date between date '2026-10-12' and date '2026-10-29'
  and p.status = 'planned'
  and p.session_id is null
  and p.completed_at is null;

insert into public.plan_items (
  owner_id, course_id, topic_id, date, start_time, phase, kind, title,
  min_minutes, target_minutes, extra_minutes, status
)
select
  c.owner_id,
  c.id,
  case
    when v.topic_code is null then null
    else (select t.id from public.topics t where t.course_id = c.id and t.name like v.topic_code || ' %' limit 1)
  end,
  v.study_date,
  v.start_time,
  v.phase,
  v.kind,
  v.title,
  v.min_minutes,
  v.target_minutes,
  0,
  'planned'
from public.courses c
cross join (values
  (date '2026-10-13', null::time, 'content', 'study',  'Luku 4: Aivot ohjaavat elimistöä (4.1–4.2)',                                      20, 35, null::text),
  (date '2026-10-15', null::time, 'review',  'review', 'BI05 koe 1 – luvut 1–3: aktiivinen palautus + käsitteet',                              20, 30, null::text),
  (date '2026-10-16', null::time, 'review',  'review', 'BI05 koe 1 – luku 4 + luvut 1–4 sekakertaus',                                          20, 35, null::text),
  (date '2026-10-17', null::time, 'review',  'review', 'BI05 koe 1 – heikot kohdat: luvut 1–4',                                                20, 30, null::text),
  (date '2026-10-18', null::time, 'review',  'review', 'BI05 koe 1 – hermosolun rakenne + käsitteet',                                          20, 30, '3.1'),
  (date '2026-10-19', null::time, 'content', 'study',  'Syysloma · Luku 7: Verenkiertoelimistö huoltaa kehoa (7.1–7.7) + lyhyt aiemman aktiivinen palautus', 20, 55, null::text),
  (date '2026-10-20', null::time, 'review',  'review', 'Syysloma · BI05 koe 1 – luku 7: aktiivinen palautus',                                  20, 35, null::text),
  (date '2026-10-21', null::time, 'review',  'review', 'Syysloma · BI05 koe 1 – sydämen rakenne + veren kulkureitti',                          20, 40, '7.2'),
  (date '2026-10-22', null::time, 'review',  'review', 'Syysloma · BI05 koe 1 – hermosolun rakenne: nimeä osat ja yhdistä toimintaan',          20, 35, '3.1'),
  (date '2026-10-23', null::time, 'review',  'review', 'Syysloma · BI05 koe 1 – koko koealueen aktiivinen palautus: luvut 1–4 ja 7',            20, 45, null::text),
  (date '2026-10-24', null::time, 'review',  'review', 'Syysloma · BI05 koe 1 – heikot kohdat + käsitteet',                                    20, 40, null::text),
  (date '2026-10-25', null::time, 'review',  'review', 'Syysloma · BI05 koe 1 – harjoituskoe: 10 monivalintaa + 5 käsitettä + 2 × 10 p tehtävää',20, 75, null::text),
  (date '2026-10-26', null::time, 'review',  'review', 'BI05 koe 1 – harjoituskokeen virheet ja epävarmat asiat',                              20, 35, null::text),
  (date '2026-10-27', null::time, 'review',  'review', 'BI05 koe 1 – sekaharjoittelu + 5 käsitteen minikoe',                                   20, 30, null::text),
  (date '2026-10-28', null::time, 'review',  'review', 'BI05 koe 1 – kevyt viimeistely: sydän, hermosolu, käsitteet ja monivalinnat',           20, 25, null::text),
  (date '2026-10-29', time '08:00', 'exam',  'exam',   'BI05 koe 1',                                                                           0,  0, null::text)
) as v(study_date, start_time, phase, kind, title, min_minutes, target_minutes, topic_code)
where upper(c.code) = 'BI05';
