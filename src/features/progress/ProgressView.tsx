import { useEffect, useMemo, useState } from "react";
import { Archive, Bell, ChevronLeft, ChevronRight, Pencil, Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import {
  Area,
  Bar as RechartsBar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CapacityProfile, Course, Exam, Mistake, PlanDraft, PlanItem, PracticeAttempt, PracticeTest, Session, Topic } from "@/lib/domain";
import {
  buildRecoveryQueue,
  calibration,
  capacityForDateV3,
  deriveTopicLearningState,
  evidenceSummary,
  examBuffer,
  examStage,
  learningForecast,
  todayPriority,
  weeklyLearningReview,
} from "@/lib/learning-engine";
import {
  errorProfileV4,
  experimentInsightsV4,
  learningAchievementsV4,
  learningOsSelfCheckV4,
  masteryModelV4,
  personalLearningProfileV4,
  productMetricsV4,
  sessionFatigueV4,
  simulateLearningOsV4,
  yoOverviewV4,
} from "@/lib/learning-os-v4";
import { adaptiveDayPlanV5, applyImplementationIntentionsV5 } from "@/lib/learning-os-v5";
import {
  corridor,
  corridorAdvice,
  courseBuffers,
  effectivePlanStatus,
  examMode,
  examPhaseStatus,
  generatePlan,
  findNextStudyDate,
  masteryEvidence,
  masteryMismatch,
  masterySummary,
  MASTERY_LABELS,
  rankTodayTasks,
  readiness,
  recoveryQueue,
  returnFromBreak,
  reviewDebt,
  risks,
  todayTaskReason,
  schoolCoverage,
  targetMastery,
  weightedCoverage,
  weightedMastery,
  weekMinutes,
  studyDaysInWeek,
  studyEfficiency,
  weeklyStudySeries,
} from "@/lib/domain";
import {
  useArchiveCourse,
  useCourses,
  useCreateFrictionEvent,
  useFrictionEvents,
  useAdvanceMistake,
  useGeneratePlan,
  useImplementationIntentions,
  useMovePlanItem,
  usePlanStatus,
  usePreferences,
  useProgressEvents,
  useSettings,
  useResolveMistake,
  useTopicDependencies,
  useUpdatePreferences,
  useUpdateSettings,
  useUpdateTopic,
  useUpsertPlanItem,
  useUpsertWeeklyCheckin,
  useWeeklyCheckins,
} from "@/lib/data";
import { addDays, dateWithWeekday, diffDays, fullDate, minutes, shortDate, startOfWeek, today, weekNumber } from "@/lib/fi";
import { disableBackgroundPush, enableBackgroundPush, pushIsEnabledOnDevice, pushSupported, sendTestPush } from "@/lib/push";
import { applyTheme, storedThemeIsDark } from "@/lib/theme";
import { clearDeviceSession, type DeviceUser } from "@/lib/deviceSession";
import {
  attemptOutcomeLabel,
  attemptTypeLabel,
  confidenceLabel,
  dimensionLabel,
  eventKindLabel,
  errorCategoryLabel,
  experimentStatusLabel,
  masteryLabelFi,
  planPhaseLabel,
  plannerModeLabel,
  simulationProfileLabel,
  yoPhaseLabel,
} from "@/lib/ui-fi";
import { KnowledgeGraphEditor, MaterialImporter } from "@/components/CourseLearningTools";
import { answerPlainText } from "@/components/AbittiAnswerEditor";
import { V5LearningHealthPanel, V5PlannerPanel } from "@/components/LearningOSV5Panels";
import { ExamSimulationV5 } from "@/components/ExamSimulationV5";
import { ContrastiveErrorLab } from "@/components/ContrastiveErrorLab";
import { PlannerCalendar } from "@/features/planner/PlannerCalendar";
import { GroupedSurface } from "@/components/surfaces";
import {
  ActionDashboardLayout,
  PlannerLayout,
  LibraryDetailLayout,
  InsightLayout,
  SettingsLayout,
} from "@/layouts";
import {
  CourseEditForm,
  ExamForm,
  MistakeForm,
  PracticeTestForm,
  TaskForm,
  TopicForm,
} from "@/components/StudyDialogs";

import { Bar, Panel, button, secondary, type Base } from "@/features/shared/StudyViewPrimitives";

export type ProgressSection = "summary"|"mastery"|"analysis";

export function ProgressView({courses,topics,attempts,sessions,plan,exams,mistakes,capacity,onPlan,section="summary",onSectionChange}:Base&{attempts:PracticeAttempt[];sessions:Session[];plan:PlanItem[];exams:Exam[];mistakes:Mistake[];capacity:CapacityProfile;onPlan:()=>void;section?:ProgressSection;onSectionChange?:(section:ProgressSection)=>void}) {
  const now=today(),from=addDays(now,-29);
  const recent=sessions.filter(s=>s.date>=from&&s.date<=now);
  const due=plan.filter(p=>p.date>=from&&p.date<=now&&p.kind!=="exam");
  const completed=due.filter(p=>p.status==="completed");
  const recentMinutes=recent.reduce((a,s)=>a+s.minutes,0);
  const v4Analysis=useMemo(()=>{
    const rows=topics.map(topic=>{
      const course=courses.find(candidate=>candidate.id===topic.course_id);
      return {topic,model:masteryModelV4(topic,attempts,{now,examDate:course?.exam_date??null})};
    });
    return {
      v4Rows:rows,
      v4Groups:{
        strong:rows.filter(row=>row.model.label==="Strong"),
        secure:rows.filter(row=>row.model.label==="Secure"),
        developing:rows.filter(row=>row.model.label==="Developing"),
        learning:rows.filter(row=>row.model.label==="Learning"),
        atRisk:rows.filter(row=>row.model.label==="At risk"),
        unassessed:rows.filter(row=>row.model.label==="Not assessed"),
      },
      errors30:errorProfileV4(attempts,mistakes,{since:from}),
      fatigue:sessionFatigueV4(sessions,attempts),
      learningProfile:personalLearningProfileV4(sessions,attempts),
      experimentInsights:experimentInsightsV4(sessions,attempts),
      achievements:learningAchievementsV4(topics,attempts,mistakes,courses,now),
      productMetrics:productMetricsV4({courses,topics,attempts,mistakes,sessions,plan,now}),
      selfChecks:learningOsSelfCheckV4({courses,topics,plan,attempts,mistakes,capacity,now}),
      simulations:simulateLearningOsV4({courses,topics,plan,attempts,mistakes,capacity,days:60,start:now}),
    };
  },[attempts,capacity,courses,from,mistakes,now,plan,sessions,topics]);
  const {v4Rows,v4Groups,errors30,fatigue,learningProfile,experimentInsights,achievements,productMetrics,selfChecks,simulations}=v4Analysis;
  const learningRows=topics.map(topic=>{
    const course=courses.find(candidate=>candidate.id===topic.course_id);
    return {topic,state:deriveTopicLearningState(topic,attempts,{now,examDate:course?.exam_date??null})};
  });
  const groups={
    practice:learningRows.filter(row=>row.state.masteryLabel==="Aloita tästä"||row.state.masteryLabel==="Harjoittele"),
    developing:learningRows.filter(row=>row.state.masteryLabel==="Kehittyvä"),
    fairlySure:learningRows.filter(row=>row.state.masteryLabel==="Melko varma"),
    strong:learningRows.filter(row=>row.state.masteryLabel==="Vahva"),
    unassessed:learningRows.filter(row=>row.state.masteryLabel==="Ei vielä arvioitu"),
  };
  const checkins=useWeeklyCheckins(),events=useProgressEvents(),saveCheckin=useUpsertWeeklyCheckin();
  const week=startOfWeek(now),existing=checkins.data?.find(x=>x.week_start===week);
  const [note,setNote]=useState(""),[planned,setPlanned]=useState<number>(courses.reduce((a,c)=>a+c.weekly_minutes,0)),[adherence,setAdherence]=useState(3),[hardest,setHardest]=useState(""),[wentWell,setWentWell]=useState(""),[nextFocus,setNextFocus]=useState(""),[load,setLoad]=useState<"light"|"good"|"heavy">("good");
  useEffect(()=>{if(existing){setNote(existing.note??"");setPlanned(existing.planned_minutes??courses.reduce((a,c)=>a+c.weekly_minutes,0));setAdherence(existing.adherence??3);setHardest(existing.hardest_topic_id??"");setWentWell(existing.went_well??"");setNextFocus(existing.next_focus??"");setLoad(existing.load_rating??"good");}},[existing,courses]);
  const actual=weekMinutes(sessions);
  const weekly=weeklyStudySeries(sessions,plan,8,now);
  const heat=Array.from({length:35},(_,i)=>{const date=addDays(now,-34+i),mins=sessions.filter(s=>s.date===date).reduce((a,s)=>a+s.minutes,0);return{date,mins};});
  const review=weeklyLearningReview({courses,topics,attempts,sessions,plan,now});
  const calibrationData=calibration({attempts,window:30});
  const nextExam=exams.filter(e=>e.date>=now).sort((a,b)=>a.date.localeCompare(b.date))[0];
  const forecastCourse=nextExam?courses.find(course=>course.id===nextExam.course_id):courses[0];
  const forecast=forecastCourse?learningForecast({
    course:forecastCourse,
    topics:topics.filter(topic=>topic.course_id===forecastCourse.id),
    attempts:attempts.filter(attempt=>attempt.course_id===forecastCourse.id),
    sessions,
    plan,
    now,
  }):null;
  const currentWeekPlan=plan.filter(p=>p.date>=week&&p.date<=now&&p.kind!=="exam");
  const nextWeekSuggestions=courses.slice(0,6).map(course=>{
    const courseTopics=topics.filter(topic=>topic.course_id===course.id);
    const queue=buildRecoveryQueue({
      topics:courseTopics,
      attempts:attempts.filter(attempt=>attempt.course_id===course.id),
      courses:[course],
      now:addDays(now,7),
      capacityMinutes:20,
      maxItems:1,
    });
    const exam=exams.filter(e=>e.course_id===course.id&&e.date>=now).sort((a,b)=>a.date.localeCompare(b.date))[0];
    const strongShare=courseTopics.length?courseTopics.filter(topic=>deriveTopicLearningState(topic,attempts,{now,examDate:course.exam_date}).masteryLevel>=4).length/courseTopics.length:0;
    if(queue.items[0]) return course.code+": yksi kohdennettu muistista palauttaminen ("+queue.items[0].topic.name+")";
    if(exam&&diffDays(exam.date,now)<=21&&strongShare>=0.5) return course.code+": siirry vaihteleviin tehtäviin";
    return course.code+": suunnitelma ennallaan";
  });

  return <InsightLayout className={"progress-view progress-section-"+section+" flex flex-col gap-7"}>
    <div role="tablist" aria-label="Edistymisen osiot" className="progress-section-tabs">
      {([
        ["summary","Yhteenveto"],
        ["mastery","Osaaminen"],
        ["analysis","Analyysi"],
      ] as Array<[ProgressSection,string]>).map(([id,label])=><button key={id} role="tab" aria-selected={section===id} className={section===id?"progress-section-tab progress-section-tab-active":"progress-section-tab"} onClick={()=>onSectionChange?.(id)}>{label}</button>)}
    </div>
    <p className="progress-summary-only text-sm text-muted-foreground">Oppimisnäyttö ensin · aika ja käyttömäärä ovat alempana kuormitustietoa.</p>
    <div className="progress-summary progress-summary-only grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div className="panel p-4"><p className="text-sm text-muted-foreground">Vahvat / vakaat aiheet</p><p className="mt-2 text-2xl font-semibold">{v4Groups.strong.length+v4Groups.secure.length}/{topics.length}</p><p className="mt-1 text-xs text-muted-foreground">{v4Rows.filter(row=>row.model.evidenceCount>0).length} aiheesta on näyttöä</p></div>
      <div className="panel p-4"><p className="text-sm text-muted-foreground">Tärkeät opiskelukerrat</p><p className="mt-2 text-2xl font-semibold">{review.completed}/{review.planned}</p><p className="mt-1 text-xs text-muted-foreground">tähän päivään mennessä</p></div>
      <div className="panel p-4"><p className="text-sm text-muted-foreground">Opiskelurytmi</p><p className="mt-2 text-2xl font-semibold">{new Set(recent.map(s=>s.date)).size}</p><p className="mt-1 text-xs text-muted-foreground">opiskelupäivää / 30 pv</p></div>
      <div className="panel p-4"><p className="text-sm text-muted-foreground">Aikaa kirjattu</p><p className="mt-2 text-2xl font-semibold">{minutes(recentMinutes)}</p><p className="mt-1 text-xs text-muted-foreground">kuormitustieto, ei osaamispiste</p></div>
    </div>

    <div className="progress-mastery-only"><V5LearningHealthPanel courses={courses} topics={topics} attempts={attempts}/></div>
    <div className="progress-analysis-only"><ContrastiveErrorLab courses={courses} topics={topics} mistakes={mistakes}/></div>

    <Panel className="progress-mastery progress-mastery-only" title="Osaamiskartta · tarkempi arvio">
      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {[
          ["Ei vielä arvioitu",v4Groups.unassessed],
          ["Harjoittele",v4Groups.learning],
          ["Kehittyvä",v4Groups.developing],
          ["Melko varma",v4Groups.secure],
          ["Vahva",v4Groups.strong],
          ["Riskissä",v4Groups.atRisk],
        ].map(([label,rows])=><div key={label as string} className="rounded-xl bg-muted/50 p-3"><p className="text-xs font-semibold">{label as string}</p><p className="mt-1 text-2xl font-semibold">{(rows as typeof v4Rows).length}</p></div>)}
      </div>
      <div className="mt-4 divide-y divide-border">
        {[...v4Rows].sort((a,b)=>a.model.level-b.model.level||b.model.uncertainty-a.model.uncertainty).slice(0,16).map(({topic,model})=><details key={topic.id} className="py-3"><summary className="cursor-pointer list-none"><div className="flex min-h-11 items-center justify-between gap-3"><span><b>{courses.find(course=>course.id===topic.course_id)?.code} · {topic.name}</b><small className="mt-1 block text-muted-foreground">{masteryLabelFi(model.label)} · näytön varmuus {Math.round(model.confidence*100)} %{model.blindSpot?" · mahdollinen sokea piste":""}</small></span><span className="text-sm font-semibold">{model.score} %</span></div></summary><div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-muted/50 p-3 text-xs sm:grid-cols-3"><span>Muistista palautus <b>{model.dimensions.recall.score}%</b></span><span>Ymmärrys <b>{model.dimensions.understanding.score}%</b></span><span>Soveltaminen <b>{model.dimensions.application.score}%</b></span><span>Sujuvuus <b>{model.dimensions.fluency.score}%</b></span><span>Säilyminen <b>{model.dimensions.retention.score}%</b></span><span>Oman arvion tarkkuus <b>{model.dimensions.calibration.score}%</b></span><p className="col-span-full text-muted-foreground">Heikoin osa-alue: {dimensionLabel(model.weakestDimension)}. Tarkat prosentit ovat näyttöön perustuvia arvioita, eivät todistuksen numeroita.</p></div></details>)}
      </div>
    </Panel>

    <div className="progress-analysis-only grid gap-4 lg:grid-cols-2">
      <Panel title="Virheprofiili · 30 pv">
        {errors30.length?errors30.slice(0,6).map(row=><div key={row.category} className="flex items-center justify-between border-b border-border py-2 text-sm"><span>{errorCategoryLabel(row.category)}</span><b>{Math.round(row.share*100)} %</b></div>):<p className="text-sm text-muted-foreground">Virhehavaintoja ei ole vielä tarpeeksi.</p>}
      </Panel>
      <Panel className="progress-analysis-only" title="Opiskelukerran kuormitus">
        <p className="text-lg font-semibold">{fatigue.level==="high"?"Tauko- ja pituussignaali on selvä":fatigue.level==="watch"?"Pieni väsymissignaali":"Ei selvää väsymissignaalia"}</p>
        <p className="mt-2 text-sm text-muted-foreground">{fatigue.reason}</p>
        {fatigue.preferredSessionMinutes&&<p className="mt-3 text-sm">Nykyisissä havainnoissa noin <b>{fatigue.preferredSessionMinutes} min</b> opiskelukerrat näyttävät toimivan parhaiten.</p>}
      </Panel>
    </div>

    <div className="progress-analysis-only grid gap-4 lg:grid-cols-2">
      <Panel title="Henkilökohtainen oppimisprofiili">
        {learningProfile.observations.length?learningProfile.observations.map((row,index)=><div key={index} className="border-b border-border py-3"><p className="font-medium">{row.label}</p><p className="mt-1 text-xs text-muted-foreground">{row.evidence} · näytön varmuus {confidenceLabel(row.confidence)}</p></div>):<p className="text-sm text-muted-foreground">Profiili rakentuu käytöstä. Sovellus ei arvaa “oppimistyyliä” tyhjästä.</p>}
      </Panel>
      <Panel className="progress-analysis-only" title="Henkilökohtaiset oppimiskokeilut">
        {experimentInsights.map(row=><div key={row.key} className="border-b border-border py-3"><div className="flex items-center justify-between gap-3"><b>{row.label}</b><span className="text-xs text-muted-foreground">{experimentStatusLabel(row.status)}</span></div><p className="mt-1 text-sm text-muted-foreground">{row.description}</p><p className="mt-1 text-xs text-muted-foreground">A: {row.sampleA} havaintoa · B: {row.sampleB} havaintoa</p></div>)}
        <p className="mt-3 text-xs text-muted-foreground">Johtopäätös tehdään myöhemmästä osaamisnäytöstä, ei siitä miltä opiskelukerta tuntui.</p>
      </Panel>
    </div>

    <Panel className="progress-analysis-only" title="Osaamisen virstanpylväät">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map(item=><div key={item.id} className={"rounded-xl border p-3 "+(item.earned?"border-primary/40 bg-accent/50":"border-border bg-muted/40")}><div className="flex items-center justify-between gap-2"><b>{item.title}</b><span aria-label={item.earned?"saavutettu":"kesken"}>{item.earned?"✓":"○"}</span></div><p className="mt-1 text-xs text-muted-foreground">{item.body}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{width:Math.min(100,item.progress)+"%"}}/></div></div>)}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Ei kokemuspisteitä, tulostauluja tai päiväputkirangaistuksia. Edistyminen tarkoittaa osaamisen vahvistumista ja virheistä oppimista.</p>
    </Panel>

    <Panel className="progress-analysis-only" title="Oppimismittarit">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          ["Viivepalautus",productMetrics.delayedRecallRate===null?"—":Math.round(productMetrics.delayedRecallRate*100)+" %"],
          ["Itsenäinen onnistuminen",productMetrics.independentSuccessRate===null?"—":Math.round(productMetrics.independentSuccessRate*100)+" %"],
          ["Osaamisen vakaus",productMetrics.masteryStability===null?"—":Math.round(productMetrics.masteryStability*100)+" %"],
          ["Virheistä palautuminen",productMetrics.recoverySuccessRate===null?"—":Math.round(productMetrics.recoverySuccessRate*100)+" %"],
          ["Vakaata / tunti",productMetrics.studyEfficiency===null?"—":(Math.round(productMetrics.studyEfficiency*10)/10).toString()],
        ].map(([label,value])=><div key={label} className="rounded-xl bg-muted/50 p-3"><small className="text-muted-foreground">{label}</small><p className="mt-1 text-xl font-semibold">{value}</p></div>)}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Ruutuaikaa ei palkita. Nämä mittarit kertovat muistamisesta, osaamisen vakaudesta, virheistä palautumisesta ja oppimisen tehokkuudesta.</p>
    </Panel>

    <details className="progress-analysis-only panel p-4 sm:p-5">
      <summary className="cursor-pointer font-semibold">Järjestelmän toiminnan tarkistus · 60 päivän simulaatio</summary>
      <div className="mt-4 space-y-2">{selfChecks.map(check=><p key={check.id} className="text-sm">{check.ok?"✓":"⚠"} {check.message}</p>)}</div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">{simulations.map(sim=><div key={sim.profile} className="rounded-xl bg-muted/50 p-3 text-sm"><b>{simulationProfileLabel(sim.profile)}</b><p className="mt-2">Osaaminen {sim.meanMastery} · varmuus {sim.meanConfidence}</p><p className="text-xs text-muted-foreground">{sim.completed} toimintoa · {sim.skipped} ohitettua · {sim.overloadDays} ylikuormapäivää</p></div>)}</div>
    </details>

    <Panel className="progress-mastery-secondary progress-mastery-only" title="Osaamiskartta">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Harjoittele seuraavaksi",groups.practice],
          ["Kehittyvä",groups.developing],
          ["Melko varma",groups.fairlySure],
          ["Vahva",groups.strong],
          ["Ei vielä tarpeeksi näyttöä",groups.unassessed],
        ].map(([label,items])=><div key={label as string} className="rounded-xl bg-muted/50 p-3"><p className="text-sm font-semibold">{label as string}</p><p className="mt-1 text-2xl font-semibold">{(items as typeof learningRows).length}</p><p className="mt-1 text-xs text-muted-foreground">{(items as typeof learningRows).slice(0,3).map(row=>row.topic.name).join(", ")||"—"}</p></div>)}
      </div>
      <div className="mt-4 divide-y divide-border">
        {[...learningRows].sort((a,b)=>a.state.masteryLevel-b.state.masteryLevel||b.state.uncertainty-a.state.uncertainty).slice(0,15).map(row=><details key={row.topic.id} className="py-3"><summary className="cursor-pointer list-none"><div className="flex min-h-11 items-center justify-between gap-3"><span><b>{courses.find(course=>course.id===row.topic.course_id)?.code} · {row.topic.name}</b><small className="mt-1 block text-muted-foreground">{row.state.masteryLabel} · {row.state.masteryConfidence>=0.7?"näyttöä paljon":row.state.masteryConfidence>=0.45?"näyttöä jonkin verran":"näyttöä vielä vähän"}</small></span><span className="text-xs text-muted-foreground">Miksi?</span></div></summary><div className="mt-2 rounded-xl bg-muted/50 p-3 text-sm"><p>{evidenceSummary(row.state,row.topic,attempts)}</p><p className="mt-1 text-xs text-muted-foreground">Muistista palautus {Math.round(row.state.recallStrength*100)} · soveltaminen {Math.round(row.state.applicationStrength*100)} · säilyminen {Math.round(row.state.retentionStrength*100)} · epävarmuus {Math.round(row.state.uncertainty*100)}</p>{attempts.filter(attempt=>attempt.topic_id===row.topic.id).slice(0,4).map(attempt=><p key={attempt.id} className="mt-2 border-t border-border pt-2 text-xs">{fullDate(attempt.date)} · {attemptTypeLabel(attempt.attempt_type)} → {attemptOutcomeLabel(attempt.outcome??attempt.result)}{typeof attempt.hints_used==="number"?" · vihjeitä "+attempt.hints_used:""}</p>)}</div></details>)}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">“Ei vielä tarpeeksi näyttöä” ei tarkoita, ettet osaisi aihetta. Se tarkoittaa kirjaimellisesti sitä, ettei järjestelmän pitäisi teeskennellä tietävänsä.</p>
    </Panel>

    <Panel className="progress-weekly progress-summary-only" title={"Viikkosi · viikko "+weekNumber(now)}>
      <div className="grid gap-4 lg:grid-cols-3">
        <div><p className="text-sm font-semibold">Vahvistui</p>{review.strengthened.length?review.strengthened.map(row=><p key={row.topic.id} className="mt-2 text-sm">{courses.find(c=>c.id===row.topic.course_id)?.code} · {row.topic.name}</p>):<p className="mt-2 text-sm text-muted-foreground">Ei vielä riittävästi uutta näyttöä tällä viikolla.</p>}</div>
        <div><p className="text-sm font-semibold">Tarvitsee vielä kierroksen</p>{review.needsRound.length?review.needsRound.map(row=><p key={row.topic.id} className="mt-2 text-sm">{courses.find(c=>c.id===row.topic.course_id)?.code} · {row.topic.name}</p>):<p className="mt-2 text-sm text-muted-foreground">Kertausjono on tällä hetkellä hallinnassa.</p>}</div>
        <div><p className="text-sm font-semibold">Suunnitelma</p><p className="mt-2 text-2xl font-semibold">{review.completed}/{review.planned}</p><p className="text-xs text-muted-foreground">tärkeästä tähän päivään mennessä toteutui</p></div>
      </div>
      <div className="mt-5 rounded-2xl bg-muted/50 p-4"><p className="text-sm font-semibold">Ensi viikolle ehdotan</p>{nextWeekSuggestions.map((suggestion,index)=><p key={index} className="mt-2 text-sm">{suggestion}</p>)}</div>
      <button className={button+" mt-4"} onClick={onPlan}>Tarkista ja hyväksy suunnitelma</button>
    </Panel>

    {forecast&&forecastCourse&&<Panel className="progress-forecast progress-summary-only" title="Aikatauluennuste">
      <p className="text-sm text-muted-foreground">{forecastCourse.code} · ensimmäinen sisältökierros</p>
      <p className="mt-2 text-2xl font-semibold">{fullDate(forecast.earliest)}–{fullDate(forecast.latest)}</p>
      {forecastCourse.exam_date&&<p className="mt-1 text-sm">Tavoite / koe {fullDate(forecastCourse.exam_date)} · {forecast.latest<=forecastCourse.exam_date?"aikataulussa":"vaatii suunnitelman tarkistuksen"}</p>}
      <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="rounded-xl bg-muted/50 p-3"><small className="text-muted-foreground">Opiskelukertoja / vko</small><p className="font-semibold">{forecast.sessionsPerWeek.toFixed(1)}</p></div><div className="rounded-xl bg-muted/50 p-3"><small className="text-muted-foreground">Toteutumisaste</small><p className="font-semibold">{Math.round(forecast.adherence*100)} %</p></div><div className="rounded-xl bg-muted/50 p-3"><small className="text-muted-foreground">Sisältö</small><p className="font-semibold">{Math.round(forecast.coverage)} %</p></div></div>
      <p className="mt-3 text-xs text-muted-foreground">{forecast.note}</p>
    </Panel>}

    {calibrationData&&<Panel className="progress-analysis-only" title="Varmuusarvion osumatarkkuus">
      <p className="text-lg font-semibold">{calibrationData.label}</p>
      <p className="mt-2 text-sm text-muted-foreground">Perustuu {calibrationData.count} harjoitusyritykseen, joissa annoit varmuusarvion ennen palautetta. Tämä ei ole pisteytys eikä sijoituslista.</p>
    </Panel>}

    <Panel className="progress-analysis-only" title="Opiskelurytmi · 5 viikkoa"><div className="grid grid-cols-7 gap-1.5">{heat.map(cell=>{const intensity=cell.mins===0?0:cell.mins<30?0.25:cell.mins<60?0.5:cell.mins<90?0.75:1;return <div key={cell.date} title={fullDate(cell.date)+" · "+minutes(cell.mins)} className="aspect-square rounded-[6px] border border-border bg-primary" style={{opacity:intensity===0?0.07:intensity}}/>})}</div><p className="mt-3 text-xs text-muted-foreground">Tummempi ruutu tarkoittaa enemmän opiskelua. Päiväputkia ei käytetä painostamiseen.</p></Panel>

    <Panel className="progress-analysis-only" title="Viikoittainen suunniteltu vs. toteutunut">
      <div className="h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={weekly}><CartesianGrid vertical={false}/><XAxis dataKey="week"/><YAxis width={34}/><Tooltip formatter={(value)=>minutes(Number(value))}/><RechartsBar dataKey="planned" fill="currentColor" fillOpacity={0.18}/><RechartsBar dataKey="actual" fill="currentColor" fillOpacity={0.75}/></BarChart></ResponsiveContainer></div>
      <p className="mt-2 text-xs text-muted-foreground">Tämä kertoo kuormasta ja suunnitelman toteutumisesta, ei siitä kuinka “hyvä opiskelija” olit.</p>
    </Panel>

    <Panel className="progress-analysis-only" title={"Viikko "+weekNumber(now)+" · reflektio"}>
      <div className="grid gap-3 sm:grid-cols-3"><div><p className="text-sm text-muted-foreground">Tavoite</p><input type="number" min="0" step="15" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={planned} onChange={e=>setPlanned(Number(e.target.value))}/></div><div><p className="text-sm text-muted-foreground">Toteutunut</p><p className="mt-2 text-xl font-semibold">{minutes(actual)}</p></div><div><p className="text-sm text-muted-foreground">Opiskelupäivät</p><p className="mt-2 text-xl font-semibold">{studyDaysInWeek(sessions)}</p></div></div>
      <fieldset className="mt-4"><legend className="mb-2 text-sm font-medium">Suunnitelmassa pysyminen 1–5</legend><div className="flex gap-2">{[1,2,3,4,5].map(n=><button key={n} type="button" aria-pressed={adherence===n} onClick={()=>setAdherence(n)} className={"grid size-11 place-items-center rounded-xl border "+(adherence===n?"border-primary bg-accent":"border-border")}>{n}</button>)}</div></fieldset>
      <div className="mt-4 grid gap-3 sm:grid-cols-2"><label className="text-sm font-medium">Vaikein aihe<select className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={hardest} onChange={e=>setHardest(e.target.value)}><option value="">Ei valintaa</option>{topics.map(t=><option key={t.id} value={t.id}>{courses.find(c=>c.id===t.course_id)?.code} · {t.name}</option>)}</select></label><label className="text-sm font-medium">Kuormitus<select className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={load} onChange={e=>setLoad(e.target.value as "light"|"good"|"heavy")}><option value="light">Liian kevyt</option><option value="good">Sopiva</option><option value="heavy">Liian raskas</option></select></label></div>
      <label className="mt-4 block text-sm font-medium">Mikä meni hyvin?<textarea rows={2} className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={wentWell} onChange={e=>setWentWell(e.target.value)}/></label>
      <label className="mt-4 block text-sm font-medium">Seuraavan viikon painopiste<textarea rows={2} className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={nextFocus} onChange={e=>setNextFocus(e.target.value)}/></label>
      <label className="mt-4 block text-sm font-medium">Muut huomiot<textarea rows={3} className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={note} onChange={e=>setNote(e.target.value)}/></label>
      <div className="mt-3 flex flex-wrap gap-2"><button className={button} disabled={saveCheckin.isPending} onClick={()=>void saveCheckin.mutateAsync({week_start:week,note:note.trim()||null,planned_minutes:planned,actual_minutes:actual,adherence,hardest_topic_id:hardest||null,went_well:wentWell.trim()||null,next_focus:nextFocus.trim()||null,load_rating:load}).then(result=>toast.success(result==="queued"?"Reflektio tallennettu paikallisesti.":"Viikkoreflektointi tallennettu.")).catch(()=>toast.error("Tallennus epäonnistui."))}>Tallenna reflektio</button><button className={secondary} onClick={onPlan}>Avaa ensi viikon suunnitelma</button></div>
    </Panel>

    <Panel className="progress-analysis-only" title="Osaamisen tapahtumat">{events.data?.length?events.data.slice(0,12).map(e=><div key={e.id} className="border-b border-border py-3"><p className="font-medium">{e.detail??eventKindLabel(e.kind)}</p><p className="text-sm text-muted-foreground">{e.kind==="mastery"&&e.from_value!=null&&e.to_value!=null?"Osaaminen "+e.from_value+" → "+e.to_value:eventKindLabel(e.kind)} · {new Date(e.created_at).toLocaleDateString("fi-FI")}</p></div>):<p className="text-muted-foreground">Osaamisen muutokset ilmestyvät tähän harjoittelun myötä.</p>}</Panel>
  </InsightLayout>;
}
