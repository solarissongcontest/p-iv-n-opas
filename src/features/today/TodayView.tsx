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

export function TodayView({courses,topics,sessions,exams,plan,tests,attempts,mistakes,capacity,onStart,onGo,onPractice}:Base&{
  sessions:Session[];exams:Exam[];plan:PlanItem[];tests:PracticeTest[];attempts:PracticeAttempt[];mistakes:Mistake[];capacity:CapacityProfile;
  onStart:(id:string)=>void;onGo:(page:"plan"|"exams"|"practice")=>void;onPractice?:(courseId:string,topicId?:string)=>void
}) {
  const now=today();
  const move=useMovePlanItem(),upsert=useUpsertPlanItem();
  const graph=useTopicDependencies(),friction=useCreateFrictionEvent(),frictionEvents=useFrictionEvents(),intentions=useImplementationIntentions();
  const [taskIndex,setTaskIndex]=useState(0);
  const [loadMode,setLoadMode]=useState<"minimum"|"recommended"|"extra">("recommended");
  const [localTime,setLocalTime]=useState("00:00");
  useEffect(()=>{
    const update=()=>setLocalTime(new Date().toLocaleTimeString("fi-FI",{hour:"2-digit",minute:"2-digit",hour12:false}));
    update();
    const timer=window.setInterval(update,60_000);
    return()=>window.clearInterval(timer);
  },[]);
  const adaptiveDay=adaptiveDayPlanV5({
    courses,topics,plan,attempts,mistakes,capacity,dependencies:graph.data??[],now,
    intentions:intentions.data??[],sessions,frictionEvents:frictionEvents.data??[],localTime,
  });
  const actions=adaptiveDay[loadMode];
  useEffect(()=>{if(taskIndex>=actions.length)setTaskIndex(0);},[actions.length,taskIndex]);
  const nextAction=actions[taskIndex]??actions[0];
  const next=nextAction?.planItem??null;
  const later=actions.filter(action=>action.id!==nextAction?.id).slice(0,2);
  const upcoming=exams.filter(e=>e.date>=now).sort((a,b)=>a.date.localeCompare(b.date))[0];
  const goal=courses.reduce((a,c)=>a+c.weekly_minutes,0),done=weekMinutes(sessions,now),last=sessions.find(s=>s.note||s.unclear);
  const recovery=buildRecoveryQueue({topics,attempts,courses,now,capacityMinutes:Math.min(20,capacityForDateV3(capacity,now)),maxItems:3});
  const comeback=returnFromBreak({sessions,topics,now,days:7});
  const todayMinutes=actions.reduce((sum,item)=>sum+item.minutes,0);
  const examCourse=upcoming?courses.find(c=>c.id===upcoming.course_id):undefined;
  const mode=examMode(upcoming?.date??null,now);
  const examTopics=examCourse?topics.filter(t=>t.course_id===examCourse.id):[];
  const examPrep=examCourse?examStage({topics:examTopics,attempts:attempts.filter(a=>a.course_id===examCourse.id),tests:tests.filter(t=>t.course_id===examCourse.id),mistakes:mistakes.filter(m=>m.course_id===examCourse.id),course:examCourse}):null;
  const openMistakes=examCourse?mistakes.filter(m=>m.course_id===examCourse.id&&m.status!=="mastered").length:0;
  const reason=nextAction?.reason??"";

  function askFrictionReason(){
    const raw=window.prompt("Miksi tämä ei onnistu tänään? 1 = ei aikaa, 2 = unohdin, 3 = liian väsynyt, 4 = liian vaikea, 5 = en tiedä mistä aloittaa, 6 = suunnitelmat muuttuivat","1");
    const map:Record<string,"no_time"|"forgot"|"too_tired"|"too_hard"|"unclear_start"|"plans_changed"|"other">={"1":"no_time","2":"forgot","3":"too_tired","4":"too_hard","5":"unclear_start","6":"plans_changed"};
    return map[raw??""]??"other";
  }
  function startChosen(action:(typeof actions)[number]){
    const params=new URLSearchParams(window.location.search);
    const fromReminder=params.get("source")==="push";
    void friction.mutateAsync({
      date:now,
      plan_item_id:action.planItem?.id??null,
      course_id:action.course.id,
      reason:"started",
      note:fromReminder?"session_start_from_push":"session_start",
      self_started:!fromReminder,
      reminder_used:fromReminder,
    }).catch(()=>undefined);
    if(fromReminder){
      params.delete("source");
      const query=params.toString();
      window.history.replaceState(null,"",window.location.pathname+(query?"?"+query:""));
    }
    if(action.planItem)onStart(action.planItem.id);else if(onPractice)onPractice(action.course.id,action.topic?.id);else onGo("practice");
  }

  async function makeLight(){
    if(!next)return;
    const light=Math.max(5,next.min_minutes||Math.round(next.target_minutes*0.5));
    try{
      await upsert.mutateAsync({id:next.id,course_id:next.course_id,date:next.date,target_minutes:light,extra_minutes:0});
      toast.success(`Päivää kevennettiin: tämä tehtävä on nyt ${minutes(light)}.`);
    }catch{toast.error("Tehtävää ei voitu keventää.");}
  }

  async function cannotToday(){
    if(!next)return;
    const frictionReason=askFrictionReason();
    const course=courses.find(candidate=>candidate.id===next.course_id);
    const date=findNextStudyDate({
      plan,fromISO:now,studyWeekdays:capacity.studyWeekdays,minutes:next.target_minutes,ignoreItemId:next.id,latestDate:course?.exam_date??null,capacity,
    });
    if(!date){
      toast.error("En löytänyt ennen koetta järkevää vapaata opiskelupäivää. Avaa suunnitelma ja valitse päivä.");
      onGo("plan");
      return;
    }
    try{
      await move.mutateAsync({id:next.id,date,from:next.date});
      setTaskIndex(0);
      void friction.mutateAsync({date:now,plan_item_id:next.id,course_id:next.course_id,reason:frictionReason,self_started:false,reminder_used:false}).catch(()=>undefined);
      toast.success(`Tehtävä siirrettiin päivälle ${fullDate(date)}. Tälle päivälle ei synny lisävelkaa.`);
    }catch{toast.error("Tehtävää ei voitu siirtää.");}
  }

  return <ActionDashboardLayout className="today-view flex flex-col gap-5">
    {comeback&&<Panel className="today-context" title="Tervetuloa takaisin">
      <p className="text-sm text-muted-foreground">Edellisestä opiskelumerkinnästä on {comeback.awayDays} päivää. Kaikkea väliin jäänyttä ei tuoda kerralla tälle päivälle.</p>
      <p className="mt-2 font-medium">Aloitetaan {comeback.items.length} tärkeimmästä asiasta · noin {minutes(comeback.estimatedMinutes)}.</p>
      <div className="mt-3 space-y-2">{comeback.items.map(t=><div key={t.id} className="rounded-xl bg-muted/60 p-3 text-sm"><b>{courses.find(c=>c.id===t.course_id)?.code}</b> · {t.name}</div>)}</div>
      <div className="mt-4 flex flex-wrap gap-2"><button className={button} onClick={()=>onGo("practice")}>Tee kevyt paluu</button><button className={secondary} onClick={()=>onGo("plan")}>Tarkista suunnitelma</button></div>
    </Panel>}
    {mode.active&&examCourse&&<Panel className="today-context" title={mode.finalStretch?"Koemoodi · loppusuora":"Koemoodi · 14 päivää"}>
      <div className="grid gap-4 sm:grid-cols-3">
        <div><p className="text-sm text-muted-foreground">{examCourse.code}</p><p className="text-2xl font-semibold">{mode.days} pv</p><p className="text-sm text-muted-foreground">kokeeseen</p></div>
        <div><p className="text-sm text-muted-foreground">Valmistautumisvaihe</p><p className="text-xl font-semibold">{examPrep?.stages[examPrep.index]?.label??"—"}</p><p className="mt-1 text-xs text-muted-foreground">{examPrep?`Vaihe ${examPrep.index+1}/6`:"Ei vaihetta"} · ei arvosanaennuste</p></div>
        <div><p className="text-sm text-muted-foreground">Avoimet virheet</p><p className="text-2xl font-semibold">{openMistakes}</p><p className="text-sm text-muted-foreground">{mode.finalStretch?"Pidä kuorma kevyenä.":"Painota koetason tehtäviä ja kertausta."}</p></div>
      </div>
    </Panel>}

    {adaptiveDay.runtimeIntentions.triggeredRuleIds.length>0&&<Panel className="today-context" title="Jos–niin-sääntö aktiivinen">
      <p className="text-sm text-muted-foreground">{adaptiveDay.runtimeIntentions.notes.join(" ")||"Tämän päivän kuormaa mukautettiin automaattisesti aktiivisen säännön perusteella."}</p>
      <p className="mt-2 text-sm">{
        adaptiveDay.runtimeIntentions.replaceWithRetrieval
          ? "Raskas työ vaihdettiin kevyeen muistista palauttamiseen."
          : adaptiveDay.runtimeIntentions.dropExtra
            ? "Lisäharjoittelu jätetään pois tältä päivältä."
            : "Päivän kuormaa kevennettiin."
      }{adaptiveDay.runtimeIntentions.maxMinutes ? " Yhden tehtävän yläraja on nyt "+minutes(adaptiveDay.runtimeIntentions.maxMinutes)+"." : ""}</p>
    </Panel>}

    <Panel className="today-primary" title="Tärkein tänään" action={
      <div className="flex rounded-xl bg-muted p-1 text-xs">
        <button className={"min-h-9 rounded-lg px-2 "+(loadMode==="minimum"?"bg-surface shadow-sm":"")} onClick={()=>{setLoadMode("minimum");setTaskIndex(0);}}>Kevyt · {adaptiveDay.minimumMinutes} min</button>
        <button className={"min-h-9 rounded-lg px-2 "+(loadMode==="recommended"?"bg-surface shadow-sm":"")} onClick={()=>{setLoadMode("recommended");setTaskIndex(0);}}>Suositus · {adaptiveDay.recommendedMinutes} min</button>
        <button className={"min-h-9 rounded-lg px-2 "+(loadMode==="extra"?"bg-surface shadow-sm":"")} onClick={()=>{setLoadMode("extra");setTaskIndex(0);}}>Lisä · {adaptiveDay.extraMinutes} min</button>
      </div>
    }>{nextAction?<>
      <p className="text-sm font-medium text-primary">{nextAction.course.code} · {minutes(nextAction.minutes)}</p>
      <h3 className="mt-2 text-2xl font-semibold">{nextAction.title}</h3>
      <details className="mt-3 text-sm text-muted-foreground"><summary className="cursor-pointer font-medium text-foreground">Miksi nämä?</summary><p className="mt-2">Koska {reason}.</p><p className="mt-2"><b>Suosituksen varmuus:</b> {confidenceLabel(nextAction.confidence.level)} · {nextAction.confidence.text}</p><p className="mt-1 text-xs">Näyttö: {nextAction.confidence.evidence.evidenceCount} yritystä · {nextAction.confidence.evidence.distinctDays} eri päivää · {nextAction.confidence.evidence.distinctTypes} tehtävätyyppiä.</p>{adaptiveDay.stoppedForLowMarginalGain&&<p className="mt-2">Suositus loppuu tähän, koska seuraavan tehtävän arvioitu oppimishyöty per minuutti laskee selvästi.</p>}</details>
      <p className="mt-3 text-xs text-muted-foreground">Tämän vaihtoehdon kokonaiskuorma on noin {minutes(todayMinutes)}. Lisäharjoittelusta ei synny myöhemmin korvattavaa velkaa.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button className={button} onClick={()=>startChosen(nextAction)}>Aloita</button>
        {actions.length>1&&<button className={secondary} onClick={()=>setTaskIndex(i=>(i+1)%actions.length)}>Seuraava ehdotus</button>}
        {loadMode!=="minimum"&&<button className={secondary} onClick={()=>{setLoadMode("minimum");setTaskIndex(0);}}>Kevyt päivä</button>}
        {next&&<button disabled={move.isPending} className={secondary} onClick={()=>void cannotToday()}>En ehdi tänään</button>}
      </div>
      {later.length>0&&<div className="mt-5 border-t border-border pt-3"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Sen jälkeen</p>{later.map(action=><button key={action.id} className="mt-2 flex min-h-11 w-full items-center justify-between rounded-xl bg-muted/50 px-3 text-left" onClick={()=>startChosen(action)}><span><b className="mr-2 text-primary">{action.course.code}</b>{action.title}</span><span className="text-sm text-muted-foreground">{minutes(action.minutes)}</span></button>)}</div>}
    </>:<>
      <p className="font-medium">Ei pakollista itsenäistä opiskelua tänään.</p>
      <p className="mt-2 text-sm text-muted-foreground">Tämän päivän tärkeimmät oppimistarpeet ovat hallinnassa. Tyhjä päivä ei ole järjestelmävirhe.</p>
      <button className={secondary+" mt-4"} onClick={()=>onGo("plan")}>Avaa suunnitelma</button>
    </>}</Panel>

    {recovery.items.length>0&&<Panel className="today-support-section" title="Kertaa seuraavaksi" action={<span className="text-sm font-medium text-muted-foreground">noin {minutes(recovery.estimatedMinutes)}</span>}>
      <div className="space-y-2">{recovery.items.map(row=><div key={row.topic.id} className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 p-3"><span><b>{courses.find(c=>c.id===row.topic.course_id)?.code}</b> · {row.topic.name}<small className="mt-1 block text-muted-foreground">{row.reason}</small></span><span className="text-xs text-muted-foreground">{row.state.masteryLabel}</span></div>)}</div>
      <p className="mt-3 text-sm text-muted-foreground">{recovery.hiddenCount>0?`Näytetään vain tämän päivän kapasiteettiin sopivat tärkeimmät kertaukset. ${recovery.hiddenCount} muuta on jätetty myöhempään vuoroon.`:"Nämä ovat ajankohtaisimmat kertaukset. Tee mieluummin lyhyt onnistunut palautus kuin pitkä läpiluku."}</p>
      <button className={secondary+" mt-3"} onClick={()=>onGo("practice")}>Avaa Harjoittelu</button>
    </Panel>}


    <div className="today-summary-grid grid grid-cols-2 gap-3 lg:grid-cols-2 lg:gap-5">
      <Panel title="Viikon rytmi"><p className="mb-2 text-xl font-semibold sm:mb-3 sm:text-2xl">{minutes(done)} <span className="text-sm font-normal text-muted-foreground sm:text-base">/ noin {minutes(goal)}</span></p><Bar value={goal?done/goal*100:0}/><p className="mt-2 text-xs leading-5 text-muted-foreground sm:mt-3 sm:text-sm">Aika on kuormituksen mitta, ei osaamistodistus.</p></Panel>
      <Panel title="Tärkeää">{upcoming?<><p className="text-sm font-medium sm:text-base">{courses.find(c=>c.id===upcoming.course_id)?.code} · {upcoming.name}</p><p className="mt-1 text-xs leading-5 text-muted-foreground sm:mt-2 sm:text-base">{fullDate(upcoming.date)} · {diffDays(upcoming.date,now)} pv</p><button className="mt-2 text-xs font-medium text-primary underline sm:mt-3 sm:text-sm" onClick={()=>onGo("exams")}>Katso kokeet</button></>:<p className="text-sm text-muted-foreground">Ei lähestyviä kokeita.</p>}</Panel>
    </div>
    {last&&<Panel className="today-support-section" title="Viimeisin huomio"><p className="text-muted-foreground">{last.note||last.unclear}</p><p className="mt-3 text-xs text-muted-foreground">{fullDate(last.date)} · {courses.find(c=>c.id===last.course_id)?.code}</p></Panel>}
  </ActionDashboardLayout>;
}
