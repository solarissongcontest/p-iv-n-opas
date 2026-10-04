import { useEffect, useMemo, useState } from "react";
import { Archive, Bell, Brain, ChevronLeft, ChevronRight, Pencil, Plus, RotateCcw } from "lucide-react";
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
  isPlanSyncConflict,
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
import { Dialog } from "@/features/shared/DialogPrimitives";

const todayFrictionReasons = [
  ["no_time", "Ei aikaa"],
  ["forgot", "Unohdin"],
  ["too_tired", "Liian väsynyt"],
  ["too_hard", "Liian vaikea"],
  ["unclear_start", "En tiedä mistä aloittaa"],
  ["plans_changed", "Suunnitelmat muuttuivat"],
  ["other", "Muu syy"],
] as const;
type TodayFrictionReason = (typeof todayFrictionReasons)[number][0];

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
  const [cannotTodayOpen,setCannotTodayOpen]=useState(false);
  const [todayFrictionReason,setTodayFrictionReason]=useState<TodayFrictionReason>("no_time");
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
      await upsert.mutateAsync({id:next.id,course_id:next.course_id,date:next.date,target_minutes:light,extra_minutes:0,expected_updated_at:next.updated_at,expected_status:next.status,expected_target_minutes:next.target_minutes});
      toast.success(`Päivää kevennettiin: tämä tehtävä on nyt ${minutes(light)}.`);
    }catch(error){toast.error(isPlanSyncConflict(error)?"Tehtävää muutettiin toisella laitteella. Uusin versio ladattiin.":"Tehtävää ei voitu keventää.");}
  }

  function cannotToday(){
    if(!next)return;
    setTodayFrictionReason("no_time");
    setCannotTodayOpen(true);
  }

  async function confirmCannotToday(){
    if(!next)return;
    const course=courses.find(candidate=>candidate.id===next.course_id);
    const date=findNextStudyDate({
      plan,fromISO:now,studyWeekdays:capacity.studyWeekdays,minutes:next.target_minutes,ignoreItemId:next.id,latestDate:course?.exam_date??null,capacity,
    });
    if(!date){
      setCannotTodayOpen(false);
      toast.error("En löytänyt ennen koetta järkevää vapaata opiskelupäivää. Avaa suunnitelma ja valitse päivä.");
      onGo("plan");
      return;
    }
    try{
      await move.mutateAsync({id:next.id,date,from:next.date,expected_updated_at:next.updated_at,expected_status:next.status});
      setCannotTodayOpen(false);
      setTaskIndex(0);
      void friction.mutateAsync({date:now,plan_item_id:next.id,course_id:next.course_id,reason:todayFrictionReason,self_started:false,reminder_used:false}).catch(()=>undefined);
      toast.success(`Tehtävä siirrettiin päivälle ${fullDate(date)}. Tälle päivälle ei synny lisävelkaa.`);
    }catch(error){toast.error(isPlanSyncConflict(error)?"Tehtävää muutettiin toisella laitteella. Uusin versio ladattiin.":"Tehtävää ei voitu siirtää.");}
  }

  return <><ActionDashboardLayout className="today-view flex flex-col gap-5">
    <Panel className="today-primary" title="Seuraavaksi">{nextAction?<>
      <p className="text-sm font-medium text-primary">{nextAction.course.code} · {minutes(nextAction.minutes)}</p>
      <h3 className="mt-2 text-2xl font-semibold">{nextAction.title}</h3>
      <details className="mt-3 text-sm text-muted-foreground">
        <summary className="cursor-pointer font-medium text-foreground">Miksi tätä ehdotetaan?</summary>
        <p className="mt-2">Koska {reason}.</p>
        {adaptiveDay.stoppedForLowMarginalGain&&<p className="mt-2">Tähän on hyvä lopettaa tältä erää: seuraavasta tehtävästä arvioidaan saatavan selvästi vähemmän hyötyä käytettyyn aikaan nähden.</p>}
      </details>
      <div className="mt-5 flex flex-wrap gap-2">
        <button className={button} onClick={()=>startChosen(nextAction)}>{nextAction.planItem?"Aloita opiskelu nyt":"Aloita harjoittelu"}</button>
        {next&&<button disabled={move.isPending} className={secondary} onClick={()=>void cannotToday()}>En ehdi tänään</button>}
      </div>
      <details className="mt-4 rounded-xl border border-border bg-surface/60 p-3">
        <summary className="min-h-11 cursor-pointer list-none py-2 text-sm font-medium">Muuta tämän päivän kuormaa</summary>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <button className={"min-h-11 rounded-xl border px-3 text-sm "+(loadMode==="minimum"?"border-primary bg-accent font-semibold":"border-border bg-surface")} onClick={()=>{setLoadMode("minimum");setTaskIndex(0);}}>Kevyt päivä · {adaptiveDay.minimumMinutes} min</button>
          <button className={"min-h-11 rounded-xl border px-3 text-sm "+(loadMode==="recommended"?"border-primary bg-accent font-semibold":"border-border bg-surface")} onClick={()=>{setLoadMode("recommended");setTaskIndex(0);}}>Suositeltu · {adaptiveDay.recommendedMinutes} min</button>
          <button className={"min-h-11 rounded-xl border px-3 text-sm "+(loadMode==="extra"?"border-primary bg-accent font-semibold":"border-border bg-surface")} onClick={()=>{setLoadMode("extra");setTaskIndex(0);}}>Haluan tehdä enemmän · {adaptiveDay.extraMinutes} min</button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Nykyinen kokonaiskuorma on noin {minutes(todayMinutes)}. Lisäharjoittelusta ei synny myöhemmin korvattavaa velkaa.</p>
      </details>
      {later.length>0&&<div className="mt-5 border-t border-border pt-3"><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Myöhemmin</p>{later.map(action=><button key={action.id} className="mt-2 flex min-h-11 w-full items-center justify-between rounded-xl bg-muted/50 px-3 text-left" onClick={()=>startChosen(action)}><span><b className="mr-2 text-primary">{action.course.code}</b>{action.title}</span><span className="text-sm text-muted-foreground">{minutes(action.minutes)}</span></button>)}</div>}
    </>:<>
      <p className="font-medium">Ei pakollista itsenäistä opiskelua tänään.</p>
      <p className="mt-2 text-sm text-muted-foreground">Tämän päivän tärkeimmät oppimistarpeet ovat hallinnassa. Tyhjä päivä ei ole järjestelmävirhe.</p>
      <button className={secondary+" mt-4"} onClick={()=>onGo("plan")}>Avaa suunnitelma</button>
    </>}</Panel>

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


    <button type="button" className="today-practice-shortcut flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-4 py-3 text-left hover:bg-muted" onClick={()=>onGo("practice")}>
      <span className="flex min-w-0 items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-primary"><Brain size={19}/></span><span><b className="block">Harjoittele</b><small className="block text-muted-foreground">Lyhyt tehtäväkierros ilman erillisen suunnitelman rakentamista.</small></span></span>
      <span aria-hidden="true" className="text-muted-foreground">›</span>
    </button>

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
  </ActionDashboardLayout>
  {cannotTodayOpen&&<Dialog title="En ehdi tänään" onClose={()=>setCannotTodayOpen(false)}>
    <p className="text-sm text-muted-foreground">Valitse syy. Opintopäiväkirja siirtää tehtävän seuraavaan järkevään opiskelupäivään eikä tee siitä rästiä.</p>
    <div className="mt-4 grid gap-2">
      {todayFrictionReasons.map(([value,label])=><button key={value} type="button" aria-pressed={todayFrictionReason===value} onClick={()=>setTodayFrictionReason(value)} className={"min-h-11 rounded-xl border px-4 text-left text-sm "+(todayFrictionReason===value?"border-primary bg-accent font-semibold":"border-border bg-surface")}>{label}</button>)}
    </div>
    <div className="mt-5 flex justify-end gap-2">
      <button className={secondary} onClick={()=>setCannotTodayOpen(false)}>Peruuta</button>
      <button className={button} disabled={move.isPending} onClick={()=>void confirmCannotToday()}>{move.isPending?"Siirretään…":"Siirrä seuraavaan sopivaan päivään"}</button>
    </div>
  </Dialog>}
  </>;
}
