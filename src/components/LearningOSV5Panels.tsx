import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { CapacityProfile, Course, PlanItem, PracticeAttempt, Topic } from "@/lib/domain";
import {
  useCalibrationObservations,
  useFrictionEvents,
  useImplementationIntentions,
  usePreferences,
  useUpdatePreferences,
  useUpsertImplementationIntention,
  useUpsertReminderAdaptation,
  useUpsertSubjectTaskParameters,
} from "@/lib/data";
import {
  delayedCalibrationV5,
  frictionInsightV5,
  reminderTaperV5,
  retentionBudgetV5,
  subjectTaskProfilesV5,
  whatIfPlannerV5,
  whatIfStudySimulatorV5,
} from "@/lib/learning-os-v5";
import { attemptTypeLabel, confidenceLabel, marginalValueLabel, riskLabel } from "@/lib/ui-fi";

const button="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50";
const secondary="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm disabled:opacity-50";
const pct=(value:number)=>Math.round(value*100)+" %";

function Panel({title,children,action}:{title:string;children:React.ReactNode;action?:React.ReactNode}) {
  return <section className="panel p-4 sm:p-6">
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-base font-semibold sm:text-lg">{title}</h2>{action}</div>
    {children}
  </section>;
}

export function V5PlannerPanel({
  courses,topics,attempts,capacity,plan=[],
}:{
  courses:Course[];
  topics:Topic[];
  attempts:PracticeAttempt[];
  capacity:CapacityProfile;
  plan?:PlanItem[];
}) {
  const budget=useMemo(()=>retentionBudgetV5({courses,topics,attempts,capacity}),[courses,topics,attempts,capacity]);
  const scenarios=useMemo(()=>whatIfPlannerV5({courses,topics,attempts,capacity}),[courses,topics,attempts,capacity]);
  const names=new Map(topics.map(t=>[t.id,t.name]));
  const [dailyMinutes,setDailyMinutes]=useState(40);
  const [dayOff,setDayOff]=useState<number|null>(null);
  const [scenarioCourseId,setScenarioCourseId]=useState(courses[0]?.id??"");
  const currentScenarioCourse=courses.find(course=>course.id===scenarioCourseId)??courses[0]??null;
  const [scenarioExamDate,setScenarioExamDate]=useState(currentScenarioCourse?.exam_date??"");
  const plannedItems=useMemo(()=>plan.filter(item=>item.kind!=="exam"&&item.status==="planned").sort((a,b)=>a.date.localeCompare(b.date)),[plan]);
  const [moveItemId,setMoveItemId]=useState("");
  const [moveTargetDate,setMoveTargetDate]=useState("");
  const weekdays=[
    {value:1,label:"maanantai"},{value:2,label:"tiistai"},{value:3,label:"keskiviikko"},
    {value:4,label:"torstai"},{value:5,label:"perjantai"},{value:6,label:"lauantai"},{value:0,label:"sunnuntai"},
  ];

  const customCourses=useMemo(()=>courses.map(course=>
    course.id===scenarioCourseId&&scenarioExamDate
      ? {...course,exam_date:scenarioExamDate}
      : course
  ),[courses,scenarioCourseId,scenarioExamDate]);
  const customScenario=useMemo(()=>whatIfStudySimulatorV5({
    courses:customCourses,
    topics,
    attempts,
    scenarios:[{
      id:"custom",
      label:"Oma vaihtoehto",
      dailyMinutes,
      skipWeekdays:dayOff===null?[]:[dayOff],
    }],
  })[0],[customCourses,topics,attempts,dailyMinutes,dayOff]);

  const moveImpact=useMemo(()=>{
    const item=plannedItems.find(candidate=>candidate.id===moveItemId);
    if(!item||!moveTargetDate||moveTargetDate===item.date)return null;
    const targetBefore=plannedItems
      .filter(candidate=>candidate.id!==item.id&&candidate.date===moveTargetDate)
      .reduce((sum,candidate)=>sum+candidate.target_minutes,0);
    const targetAfter=targetBefore+item.target_minutes;
    const targetWeekday=new Date(moveTargetDate+"T12:00:00Z").getUTCDay();
    const targetCapacity=targetWeekday===0||targetWeekday===6?capacity.weekendMinutes:capacity.weekdayMinutes;
    return {
      item,
      targetBefore,
      targetAfter,
      targetCapacity,
      risk:targetAfter>targetCapacity*1.25?"high":targetAfter>targetCapacity?"medium":"low",
    } as const;
  },[plannedItems,moveItemId,moveTargetDate,capacity]);

  return <div className="grid gap-4 lg:grid-cols-2">
    <Panel title="Mukautuva kertausbudjetti">
      <div className="grid grid-cols-3 gap-2">
        {[["Minimi",budget.minimumMinutes],["Suositus",budget.recommendedMinutes],["Lisä",budget.extraMinutes]].map(([label,value])=><div key={String(label)} className="rounded-xl bg-muted/50 p-3"><small className="text-muted-foreground">{label}</small><p className="mt-1 text-xl font-semibold">{value} min</p></div>)}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Budjetti optimoi säilymistä suhteessa käytettävissä olevaan aikaan, ei ruutuajan määrää.</p>
      <div className="mt-4 space-y-2">{budget.targets.filter(r=>r.recommendedMinutes>0).slice(0,6).map(row=><div key={row.topicId} className="rounded-xl border border-border p-3 text-sm">
        <div className="flex justify-between gap-3"><b>{names.get(row.topicId)??"Aihe"}</b><span>{row.recommendedMinutes} min</span></div>
        <p className="mt-1 text-xs text-muted-foreground">säilyminen {pct(row.currentRetention)} → tavoite {pct(row.desiredRetention)} · varmuus {confidenceLabel(row.confidence.label)}</p>
        <p className="mt-1 text-xs text-muted-foreground">{row.reason}</p>
      </div>)}</div>
      <p className="mt-3 text-xs text-muted-foreground">Rajahyöty alkaa pienentyä noin {budget.marginalGainLowAfterMinutes} minuutin jälkeen. Lisäharjoittelu ei muutu velaksi.</p>
    </Panel>

    <Panel title="Vaihtoehtojen vertailu">
      <p className="mb-3 text-sm text-muted-foreground">Vertaa vaihtoehtoja ennen suunnitelman muuttamista. Tämä ei ole arvosanaennuste eikä muuta kalenteria itsestään.</p>
      <div className="space-y-2">{scenarios.map(s=><div key={s.id} className="rounded-xl border border-border p-3">
        <div className="flex justify-between gap-3"><b>{s.label}</b><span className="text-sm">{s.weeklyCapacity} min / vko</span></div>
        <p className="mt-2 text-xs text-muted-foreground">muistamisen suoja {pct(s.protectedRetentionShare)} · kertausjono {s.projectedBacklogMinutes} min · ylikuormitusriski {riskLabel(s.overloadRisk)} · rajahyöty {marginalValueLabel(s.marginalValue)}</p>
        <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>
      </div>)}</div>

      <div className="mt-5 rounded-2xl bg-muted/45 p-4">
        <p className="font-semibold">Rakenna oma skenaario</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">Minuuttia / päivä
            <input aria-label="Vaihtoehdon minuuttimäärä päivässä" type="number" min="10" max="180" step="5" value={dailyMinutes} onChange={e=>setDailyMinutes(Math.max(10,Math.min(180,Number(e.target.value)||40)))} className="mt-1 min-h-11 w-full rounded-xl border bg-surface px-3"/>
          </label>
          <label className="text-sm">Pidä päivä vapaana
            <select aria-label="Vaihtoehdon vapaapäivä" value={dayOff??""} onChange={e=>setDayOff(e.target.value===""?null:Number(e.target.value))} className="mt-1 min-h-11 w-full rounded-xl border bg-surface px-3">
              <option value="">Ei erillistä vapaapäivää</option>
              {weekdays.map(day=><option key={day.value} value={day.value}>{day.label}</option>)}
            </select>
          </label>
          <label className="text-sm">Jos koepäivä muuttuu
            <select value={scenarioCourseId} onChange={e=>{const id=e.target.value;setScenarioCourseId(id);setScenarioExamDate(courses.find(course=>course.id===id)?.exam_date??"");}} className="mt-1 min-h-11 w-full rounded-xl border bg-surface px-3">
              {courses.map(course=><option key={course.id} value={course.id}>{course.code}</option>)}
            </select>
          </label>
          <label className="text-sm">Uusi koepäivä
            <input aria-label="Vaihtoehdon koepäivä" type="date" value={scenarioExamDate} onChange={e=>setScenarioExamDate(e.target.value)} className="mt-1 min-h-11 w-full rounded-xl border bg-surface px-3"/>
          </label>
          <label className="text-sm">Siirrä tämä suunniteltu työ
            <select aria-label="Siirrä tämä työ" value={moveItemId} onChange={e=>{const id=e.target.value;setMoveItemId(id);const item=plannedItems.find(row=>row.id===id);setMoveTargetDate(item?.date??"");}} className="mt-1 min-h-11 w-full rounded-xl border bg-surface px-3">
              <option value="">Ei siirtoa</option>
              {plannedItems.slice(0,30).map(item=><option key={item.id} value={item.id}>{item.date} · {item.title||courses.find(course=>course.id===item.course_id)?.code||"Opiskelu"} · {item.target_minutes} min</option>)}
            </select>
          </label>
          <label className="text-sm">Uudelle päivälle
            <input aria-label="Siirrä työ päivälle" type="date" value={moveTargetDate} onChange={e=>setMoveTargetDate(e.target.value)} disabled={!moveItemId} className="mt-1 min-h-11 w-full rounded-xl border bg-surface px-3 disabled:opacity-50"/>
          </label>
        </div>

        {customScenario&&<div className="mt-4 rounded-xl border border-border bg-surface p-3 text-sm">
          <div className="flex flex-wrap justify-between gap-2"><b>Oman skenaarion vaikutus</b><span>{customScenario.weeklyMinutes} min / vko</span></div>
          <p className="mt-2 text-muted-foreground">vakaita aiheita {customScenario.stableTopics} · riskissä {customScenario.atRiskTopics} · kertausjono {customScenario.estimatedReviewBacklog} · ylikuormitus {pct(customScenario.overloadRisk)}</p>
          <p className="mt-2 text-muted-foreground">{customScenario.note}</p>
        </div>}
        {moveImpact&&<div className="mt-3 rounded-xl border border-border bg-surface p-3 text-sm">
          <b>Työn siirron kuormitus</b>
          <p className="mt-1 text-muted-foreground">{moveImpact.item.title||"Valittu tehtävä"} · {moveImpact.item.target_minutes} min siirtyisi päivältä {moveImpact.item.date} päivälle {moveTargetDate}.</p>
          <p className="mt-1 text-muted-foreground">Kohdepäivän kuorma {moveImpact.targetBefore} → {moveImpact.targetAfter} min, kapasiteetti noin {moveImpact.targetCapacity} min.</p>
          <p className="mt-1">Ylikuormitusriski: <b>{riskLabel(moveImpact.risk)}</b>.</p>
        </div>}
      </div>
    </Panel>
  </div>;
}

export function V5LearningHealthPanel({courses,attempts}:{courses:Course[];topics:Topic[];attempts:PracticeAttempt[]}) {
  const calibration=useCalibrationObservations();
  const friction=useFrictionEvents();
  const intentions=useImplementationIntentions();
  const preferences=usePreferences();
  const saveIntention=useUpsertImplementationIntention();
  const updatePreferences=useUpdatePreferences();
  const saveReminder=useUpsertReminderAdaptation();
  const saveSubjectParameters=useUpsertSubjectTaskParameters();
  const lastReminderSignature=useRef("");
  const lastProfileSignature=useRef("");
  const calibrationState=delayedCalibrationV5(calibration.data??[]);
  const frictionState=frictionInsightV5(friction.data??[]);
  const reminder=reminderTaperV5(friction.data??[]);
  const profiles=useMemo(()=>subjectTaskProfilesV5(attempts,id=>courses.find(c=>c.id===id)?.subject??"Muu"),[attempts,courses]);

  useEffect(()=>{
    if(!(preferences.data?.reminder_taper_enabled??true)||reminder.sampleSize<5)return;
    const recommended_level =
      reminder.mode==="minimal" ? "none" as const :
      reminder.mode==="taper" ? "light" as const :
      "normal" as const;
    const signature=[recommended_level,reminder.sampleSize,reminder.selfStartRate??"null"].join(":");
    if(lastReminderSignature.current===signature)return;
    lastReminderSignature.current=signature;
    saveReminder.mutate({
      recommended_level,
      independent_start_rate:reminder.selfStartRate,
      sample_size:reminder.sampleSize,
      metadata:{mode:reminder.mode,recommendation:reminder.recommendation,source:"learning-health-v5"},
    });
  },[preferences.data?.reminder_taper_enabled,reminder.mode,reminder.sampleSize,reminder.selfStartRate,reminder.recommendation]);

  useEffect(()=>{
    const rows=profiles.slice(0,30).map(profile=>{
      const evidence=attempts.filter(attempt=>{
        const subject=courses.find(course=>course.id===attempt.course_id)?.subject??"Muu";
        return subject===profile.subject&&attempt.attempt_type===profile.attemptType&&!attempt.is_pretest;
      });
      const delays=evidence.map(attempt=>Number(attempt.delay_days??0)).filter(days=>days>0);
      return {
        subject:profile.subject,
        attempt_type:profile.attemptType,
        observations:profile.observations,
        success_rate:profile.successRate,
        mean_delay_days:delays.length?delays.reduce((sum,value)=>sum+value,0)/delays.length:0,
        preferred_spacing_days:Math.max(1,Math.min(60,Math.round(4*profile.spacingMultiplier))),
        confidence:profile.reliability.label,
        active:profile.observations>=8&&profile.reliability.label!=="low",
      };
    });
    if(!rows.length)return;
    const signature=JSON.stringify(rows);
    if(lastProfileSignature.current===signature)return;
    lastProfileSignature.current=signature;
    saveSubjectParameters.mutate(rows);
  },[profiles,attempts,courses]);

  async function accept(){
    if(!frictionState.suggestion)return;
    const suggestion=frictionState.suggestion;
    const existing=(intentions.data??[]).find(rule=>
      rule.trigger_type===suggestion.trigger_type&&
      rule.trigger_value===suggestion.trigger_value&&
      rule.action_type===suggestion.action_type&&
      rule.action_value===suggestion.action_value
    );
    try{
      await saveIntention.mutateAsync({...suggestion,...(existing?.id?{id:existing.id}:{}),enabled:true});
      toast.success(existing?"Jos–niin-sääntö aktivoitiin uudelleen.":"Jos–niin-sääntö otettiin käyttöön.");
    }catch{toast.error("Sääntöä ei voitu tallentaa.");}
  }

  return <div className="space-y-4">
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title="Viivästetty varmuusarvio">
        <p className="text-xl font-semibold">{calibrationState.status==="well_calibrated"?"Hyvin kalibroitu":calibrationState.status==="overconfident"?"Liikaa varmuutta":calibrationState.status==="underconfident"?"Liikaa epävarmuutta":"Kerätään näyttöä"}</p>
        <p className="mt-2 text-sm text-muted-foreground">{calibrationState.recommendation}</p>
        <p className="mt-3 text-xs text-muted-foreground">{calibrationState.observations} havaintoa{calibrationState.delayedAccuracy==null?"":" · myöhempien arvioiden osumatarkkuus "+pct(calibrationState.delayedAccuracy)}</p>
      </Panel>
      <Panel title="Opiskelun esteiden tunnistus">
        <p className="text-lg font-semibold">{frictionState.summary}</p>
        {frictionState.suggestion?<><p className="mt-2 text-sm text-muted-foreground">{frictionState.suggestion.reason}</p><button className={button+" mt-4"} disabled={saveIntention.isPending} onClick={()=>void accept()}>Käytä ehdotettua jos–niin-sääntöä</button></>:<p className="mt-2 text-sm text-muted-foreground">Järjestelmä ei muuta suunnitelmaa yhden huonon päivän perusteella.</p>}
        {(intentions.data??[]).filter(x=>x.enabled).length>0&&<p className="mt-3 text-xs text-muted-foreground">{(intentions.data??[]).filter(x=>x.enabled).length} aktiivista jos–niin-sääntöä.</p>}
      </Panel>
      <Panel title="Muistutusten vähentäminen" action={<button className={secondary+" !min-h-9 !px-3"} onClick={()=>void updatePreferences.mutateAsync({reminder_taper_enabled:!(preferences.data?.reminder_taper_enabled??true)})}>{(preferences.data?.reminder_taper_enabled??true)?"Päällä":"Pois"}</button>}>
        <p className="text-lg font-semibold">{reminder.mode==="minimal"?"Vain kriittiset":reminder.mode==="taper"?"Vähennä asteittain":reminder.mode==="restore"?"Palauta yksi muistutus":"Nykyinen taso"}</p>
        <p className="mt-2 text-sm text-muted-foreground">{reminder.recommendation}</p>
        <p className="mt-3 text-xs text-muted-foreground">{reminder.sampleSize} aloitushavaintoa{reminder.selfStartRate==null?"":" · itsenäisiä "+pct(reminder.selfStartRate)}</p>
      </Panel>
    </div>
    <Panel title="Oppiaine- ja tehtävätyyppikohtainen mukautus">
      <p className="mb-3 text-sm text-muted-foreground">Mukautuksia tehdään vasta, kun havaintoja on tarpeeksi. Vähäisestä havaintomäärästä ei muodosteta näennäisen tarkkaa profiilia.</p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{profiles.slice(0,9).map(p=><div key={p.key} className="rounded-xl bg-muted/50 p-3 text-sm"><b>{p.subject} · {attemptTypeLabel(p.attemptType)}</b><p className="mt-1 text-xs text-muted-foreground">{p.observations} havaintoa · onnistuminen {pct(p.successRate)}</p><p className="mt-1 text-xs text-muted-foreground">kertausvälin mukautus × {p.spacingMultiplier.toFixed(2)} · näytön varmuus {confidenceLabel(p.reliability.label)}</p></div>)}{!profiles.length&&<p className="text-sm text-muted-foreground">Havaintoja ei ole vielä tarpeeksi.</p>}</div>
    </Panel>
  </div>;
}
