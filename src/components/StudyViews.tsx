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
import {
  CourseEditForm,
  ExamForm,
  MistakeForm,
  PracticeTestForm,
  TaskForm,
  TopicForm,
} from "@/components/StudyDialogs";

const button = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50";
const secondary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm hover:bg-muted";
const statusLabel: Record<string,string> = { planned:"Suunniteltu",completed:"Valmis",skipped:"Ohitettu",in_progress:"Käynnissä",overdue:"Myöhässä" };
const statusIcon: Record<string,string> = { planned:"○",completed:"✓",skipped:"–",in_progress:"◐",overdue:"!" };
const statusClass: Record<string,string> = { planned:"text-muted-foreground",completed:"text-primary",skipped:"text-muted-foreground",in_progress:"text-primary",overdue:"text-destructive" };

export function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return <section className="panel p-4 sm:p-6"><div className="mb-3 flex items-center justify-between gap-3 sm:mb-4"><h2 className="text-base font-semibold sm:text-lg">{title}</h2>{action}</div>{children}</section>;
}
function Bar({ value }: { value: number }) {
  const v=Math.max(0,Math.min(100,value));
  return <div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-primary" style={{width:`${v}%`}}/></div>;
}
type Base = {courses:Course[];topics:Topic[]};

export function TodayView({courses,topics,sessions,exams,plan,tests,attempts,mistakes,capacity,onStart,onGo}:Base&{
  sessions:Session[];exams:Exam[];plan:PlanItem[];tests:PracticeTest[];attempts:PracticeAttempt[];mistakes:Mistake[];capacity:CapacityProfile;
  onStart:(id:string)=>void;onGo:(page:"plan"|"exams"|"practice")=>void
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
    if(action.planItem)onStart(action.planItem.id);else onGo("practice");
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

  return <div className="space-y-3 sm:space-y-5">
    {comeback&&<Panel title="Tervetuloa takaisin">
      <p className="text-sm text-muted-foreground">Edellisestä opiskelumerkinnästä on {comeback.awayDays} päivää. Kaikkea väliin jäänyttä ei tuoda kerralla tälle päivälle.</p>
      <p className="mt-2 font-medium">Aloitetaan {comeback.items.length} tärkeimmästä asiasta · noin {minutes(comeback.estimatedMinutes)}.</p>
      <div className="mt-3 space-y-2">{comeback.items.map(t=><div key={t.id} className="rounded-xl bg-muted/60 p-3 text-sm"><b>{courses.find(c=>c.id===t.course_id)?.code}</b> · {t.name}</div>)}</div>
      <div className="mt-4 flex flex-wrap gap-2"><button className={button} onClick={()=>onGo("practice")}>Tee kevyt paluu</button><button className={secondary} onClick={()=>onGo("plan")}>Tarkista suunnitelma</button></div>
    </Panel>}
    {mode.active&&examCourse&&<Panel title={mode.finalStretch?"Koemoodi · loppusuora":"Koemoodi · 14 päivää"}>
      <div className="grid gap-4 sm:grid-cols-3">
        <div><p className="text-sm text-muted-foreground">{examCourse.code}</p><p className="text-2xl font-semibold">{mode.days} pv</p><p className="text-sm text-muted-foreground">kokeeseen</p></div>
        <div><p className="text-sm text-muted-foreground">Valmistautumisvaihe</p><p className="text-xl font-semibold">{examPrep?.stages[examPrep.index]?.label??"—"}</p><p className="mt-1 text-xs text-muted-foreground">{examPrep?`Vaihe ${examPrep.index+1}/6`:"Ei vaihetta"} · ei arvosanaennuste</p></div>
        <div><p className="text-sm text-muted-foreground">Avoimet virheet</p><p className="text-2xl font-semibold">{openMistakes}</p><p className="text-sm text-muted-foreground">{mode.finalStretch?"Pidä kuorma kevyenä.":"Painota koetason tehtäviä ja kertausta."}</p></div>
      </div>
    </Panel>}

    {adaptiveDay.runtimeIntentions.triggeredRuleIds.length>0&&<Panel title="Jos–niin-sääntö aktiivinen">
      <p className="text-sm text-muted-foreground">{adaptiveDay.runtimeIntentions.notes.join(" ")||"Tämän päivän kuormaa mukautettiin automaattisesti aktiivisen säännön perusteella."}</p>
      <p className="mt-2 text-sm">{
        adaptiveDay.runtimeIntentions.replaceWithRetrieval
          ? "Raskas työ vaihdettiin kevyeen muistista palauttamiseen."
          : adaptiveDay.runtimeIntentions.dropExtra
            ? "Lisäharjoittelu jätetään pois tältä päivältä."
            : "Päivän kuormaa kevennettiin."
      }{adaptiveDay.runtimeIntentions.maxMinutes ? " Yhden tehtävän yläraja on nyt "+minutes(adaptiveDay.runtimeIntentions.maxMinutes)+"." : ""}</p>
    </Panel>}

    <Panel title="Tärkein tänään" action={
      <div className="flex rounded-xl bg-muted p-1 text-xs">
        <button className={"min-h-9 rounded-lg px-2 "+(loadMode==="minimum"?"bg-surface shadow-sm":"")} onClick={()=>{setLoadMode("minimum");setTaskIndex(0);}}>Kevyt · {adaptiveDay.minimumMinutes} min</button>
        <button className={"min-h-9 rounded-lg px-2 "+(loadMode==="recommended"?"bg-surface shadow-sm":"")} onClick={()=>{setLoadMode("recommended");setTaskIndex(0);}}>Suositus · {adaptiveDay.recommendedMinutes} min</button>
        <button className={"min-h-9 rounded-lg px-2 "+(loadMode==="extra"?"bg-surface shadow-sm":"")} onClick={()=>{setLoadMode("extra");setTaskIndex(0);}}>Lisä · {adaptiveDay.extraMinutes} min</button>
      </div>
    }>{nextAction?<>
      <p className="text-sm font-medium text-primary">{nextAction.course.code} · {minutes(nextAction.minutes)}</p>
      <h3 className="mt-2 text-2xl font-semibold">{nextAction.title}</h3>
      <details className="mt-3 text-sm text-muted-foreground"><summary className="cursor-pointer font-medium text-foreground">Miksi nämä?</summary><p className="mt-2">Koska {reason}.</p><p className="mt-2"><b>Suosituksen varmuus:</b> {confidenceLabel(nextAction.confidence.level)} · {nextAction.confidence.text}</p><p className="mt-1 text-xs">Näyttö: {nextAction.confidence.evidence.evidenceCount} yritystä · {nextAction.confidence.evidence.distinctDays} eri päivää · {nextAction.confidence.evidence.distinctTypes} tehtävätyyppiä.</p>{adaptiveDay.stoppedForLowMarginalGain&&<p className="mt-2">Suositus loppuu tähän, koska seuraavan tehtävän arvioitu oppimishyöty per minuutti laskee selvästi.</p>}</details>
      <p className="mt-3 text-xs text-muted-foreground">Tämän vaihtoehdon kokonaiskuorma on noin {minutes(todayMinutes)}. Lisäharjoittelu ei muutu opiskelusakoksi.</p>
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

    {recovery.items.length>0&&<Panel title="Kertaa seuraavaksi" action={<span className="text-sm font-medium text-muted-foreground">noin {minutes(recovery.estimatedMinutes)}</span>}>
      <div className="space-y-2">{recovery.items.map(row=><div key={row.topic.id} className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 p-3"><span><b>{courses.find(c=>c.id===row.topic.course_id)?.code}</b> · {row.topic.name}<small className="mt-1 block text-muted-foreground">{row.reason}</small></span><span className="text-xs text-muted-foreground">{row.state.masteryLabel}</span></div>)}</div>
      <p className="mt-3 text-sm text-muted-foreground">{recovery.hiddenCount>0?`Näytetään vain tämän päivän kapasiteettiin sopivat tärkeimmät kertaukset. ${recovery.hiddenCount} muuta on jätetty myöhempään vuoroon.`:"Nämä ovat ajankohtaisimmat kertaukset. Tee mieluummin lyhyt onnistunut palautus kuin pitkä läpiluku."}</p>
      <button className={secondary+" mt-3"} onClick={()=>onGo("practice")}>Avaa Harjoittelu</button>
    </Panel>}


    <div className="grid grid-cols-2 gap-3 lg:grid-cols-2 lg:gap-5">
      <Panel title="Viikon rytmi"><p className="mb-2 text-xl font-semibold sm:mb-3 sm:text-2xl">{minutes(done)} <span className="text-sm font-normal text-muted-foreground sm:text-base">/ noin {minutes(goal)}</span></p><Bar value={goal?done/goal*100:0}/><p className="mt-2 text-xs leading-5 text-muted-foreground sm:mt-3 sm:text-sm">Aika on kuormituksen mitta, ei osaamistodistus.</p></Panel>
      <Panel title="Tärkeää">{upcoming?<><p className="text-sm font-medium sm:text-base">{courses.find(c=>c.id===upcoming.course_id)?.code} · {upcoming.name}</p><p className="mt-1 text-xs leading-5 text-muted-foreground sm:mt-2 sm:text-base">{fullDate(upcoming.date)} · {diffDays(upcoming.date,now)} pv</p><button className="mt-2 text-xs font-medium text-primary underline sm:mt-3 sm:text-sm" onClick={()=>onGo("exams")}>Katso kokeet</button></>:<p className="text-sm text-muted-foreground">Ei lähestyviä kokeita.</p>}</Panel>
    </div>
    {last&&<Panel title="Viimeisin huomio"><p className="text-muted-foreground">{last.note||last.unclear}</p><p className="mt-3 text-xs text-muted-foreground">{fullDate(last.date)} · {courses.find(c=>c.id===last.course_id)?.code}</p></Panel>}
  </div>;
}

export function PlanView({courses,topics,plan,tests,mistakes,attempts,capacity,onStart}:Base&{plan:PlanItem[];tests:PracticeTest[];mistakes:Mistake[];attempts:PracticeAttempt[];capacity:CapacityProfile;onStart:(id:string)=>void}) {
  const preferences=usePreferences();
  const intentions=useImplementationIntentions();
  const frictionHistory=useFrictionEvents();
  const plannerMode=preferences.data?.planner_mode??"assisted";
  const [mode,setMode]=useState<"päivä"|"viikko"|"kuukausi">("viikko"),[anchor,setAnchor]=useState(today()),[creating,setCreating]=useState(false),[adding,setAdding]=useState(false),[choice,setChoice]=useState(courses[0]?.id??"");
  const [proposal,setProposal]=useState<PlanDraft[]|null>(null),[editingProposal,setEditingProposal]=useState(false);
  const move=useMovePlanItem(),status=usePlanStatus(),generate=useGeneratePlan(),friction=useCreateFrictionEvent();
  const first=mode==="viikko"?startOfWeek(anchor):mode==="kuukausi"?anchor.slice(0,7)+"-01":anchor;
  const last=mode==="viikko"?addDays(first,6):mode==="kuukausi"?addDays(addDays(first,32).slice(0,7)+"-01",-1):anchor;
  const days=Array.from({length:Math.max(1,diffDays(last,first)+1)},(_,i)=>addDays(first,i));
  const selectedCourse=courses.find(x=>x.id===choice);
  const selectedMode=examMode(selectedCourse?.exam_date??null);

  async function shift(p:PlanItem){const date=prompt("Uusi päivä (VVVV-KK-PP)",p.date);if(!date||!/^\d{4}-\d{2}-\d{2}$/.test(date))return;try{await move.mutateAsync({id:p.id,date,from:p.date});toast.success("Tehtävä siirretty.");}catch{toast.error("Siirto epäonnistui.");}}
  async function skipWithReason(p:PlanItem){
    const raw=window.prompt("Miksi ohitat tämän? 1 = ei aikaa, 2 = unohdin, 3 = liian väsynyt, 4 = liian vaikea, 5 = epäselvä aloitus, 6 = suunnitelmat muuttuivat","1");
    const map:Record<string,"no_time"|"forgot"|"too_tired"|"too_hard"|"unclear_start"|"plans_changed"|"other">={"1":"no_time","2":"forgot","3":"too_tired","4":"too_hard","5":"unclear_start","6":"plans_changed"};
    try{
      await status.mutateAsync({id:p.id,status:"skipped"});
      void friction.mutateAsync({date:today(),plan_item_id:p.id,course_id:p.course_id,reason:map[raw??""]??"other",self_started:false,reminder_used:false}).catch(()=>undefined);
      toast.success("Tehtävä ohitettu. Syytä käytetään suunnitelman parantamiseen, eikä ohituksesta muodosteta lisävelkaa.");
    }catch{toast.error("Muutos epäonnistui.");}
  }

  async function makeProposal(){
    const c=courses.find(x=>x.id===choice);
    if(!c?.exam_date){toast.error("Kurssilla ei ole koepäivää.");return;}
    const baseDrafts=generatePlan({
      course:c,
      topics:topics.filter(t=>t.course_id===c.id),
      examDate:c.exam_date,
      studyWeekdays:capacity.studyWeekdays,
      weeklyMinutes:c.weekly_minutes,
      mistakes:mistakes.filter(m=>m.course_id===c.id),
      tests:tests.filter(t=>t.course_id===c.id),
      capacity,
    });
    const adapted=applyImplementationIntentionsV5(baseDrafts,intentions.data??[],frictionHistory.data??[]);
    const drafts=adapted.drafts;
    if(!drafts.length){toast.error("Koe on jo mennyt.");return;}
    if(adapted.applied.length){
      const count=adapted.applied.reduce((sum,row)=>sum+row.count,0);
      toast.info(`Jos–niin-säännöt kevensivät tai mukauttivat ${count} ehdotettua opiskelukertaa.`);
    }
    if(plannerMode==="autopilot"){
      try{
        await generate.mutateAsync({courseId:c.id,drafts,capacity});
        setCreating(false);
        toast.success("Automaattinen tila päivitti suunnitelman kapasiteetin, koetilanteen ja aktiivisten jos–niin-sääntöjen perusteella.");
      }catch{toast.error("Automaattinen tila ei voinut päivittää suunnitelmaa.");}
      return;
    }
    setProposal(drafts);setEditingProposal(false);
  }

  async function acceptProposal(){
    const c=courses.find(x=>x.id===choice);
    if(!c||!proposal?.length)return;
    try{
      await generate.mutateAsync({courseId:c.id,drafts:proposal,capacity});
      setProposal(null);setEditingProposal(false);setCreating(false);
      toast.success("Suunnitelma hyväksytty.");
    }catch{toast.error("Suunnitelmaa ei voitu tallentaa.");}
  }

  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-1"><button className={secondary+" !px-3"} aria-label="Edellinen" onClick={()=>setAnchor(addDays(anchor,mode==="päivä"?-1:mode==="viikko"?-7:-30))}><ChevronLeft size={18}/></button><span className="min-w-28 text-center text-sm">{fullDate(first)}{first!==last&&` – ${fullDate(last)}`}</span><button className={secondary+" !px-3"} aria-label="Seuraava" onClick={()=>setAnchor(addDays(anchor,mode==="päivä"?1:mode==="viikko"?7:30))}><ChevronRight size={18}/></button></div><div className="flex gap-1 rounded-xl bg-muted p-1">{(["päivä","viikko","kuukausi"] as const).map(m=><button key={m} aria-pressed={mode===m} onClick={()=>setMode(m)} className={`min-h-10 rounded-lg px-3 capitalize ${mode===m?"bg-surface shadow-sm":""}`}>{m}</button>)}</div></div>
    <div className="flex flex-wrap gap-2"><button className={secondary} onClick={()=>setCreating(v=>!v)}><Plus size={17}/>Luo suunnitelma</button><button className={secondary} onClick={()=>setAdding(true)}>Lisää tehtävä</button></div>
    <V5PlannerPanel courses={courses} topics={topics} attempts={attempts} capacity={capacity} plan={plan}/>
    {adding&&<TaskForm courses={courses} topics={topics} date={anchor} onClose={()=>setAdding(false)}/>}
    {creating&&<Panel title="Adaptiivinen suunnitelma koetta varten">
      <p className="mb-3 text-sm text-muted-foreground">Suunnitelma huomioi tärkeyden, esitiedot, varmistetun osaamisen, ajankohtaiset kertaukset, virhepankin, koulun etenemisen, 14 päivän koemoodin ja muiden kurssien saman päivän kuorman. Tila: <b>{plannerModeLabel(plannerMode)}</b>. Lisäharjoittelu on vapaaehtoista eikä muutu velaksi.</p>
      <select aria-label="Kurssi" value={choice} onChange={e=>setChoice(e.target.value)} className="w-full rounded-xl border bg-surface p-3">{courses.map(c=><option key={c.id} value={c.id}>{c.code} · {c.name}</option>)}</select>
      {selectedMode.active&&<p className="mt-3 rounded-xl bg-accent p-3 text-sm">Koemoodi on aktiivinen: {selectedMode.days} päivää kokeeseen. Uusi sisältö väistyy koetason harjoittelun, virheiden ja kertauksen tieltä.</p>}
      <button disabled={generate.isPending} className={button+" mt-3"} onClick={()=>void makeProposal()}>{plannerMode==="autopilot"?"Mukauta suunnitelma nyt":"Luo ehdotus"}</button>
      {proposal&&<div className="mt-4 rounded-2xl border border-border p-4">
        <div className="flex items-center justify-between gap-3"><div><p className="font-semibold">Ehdotan muutosta suunnitelmaan</p><p className="text-sm text-muted-foreground">Mikään ei muutu ennen hyväksyntää. Kapasiteettirajat pidetään voimassa myös muokkauksen jälkeen.</p></div><span className="text-sm">{proposal.filter(p=>p.kind!=="exam").length} opiskelukertaa</span></div>
        <div className="mt-3 max-h-72 space-y-2 overflow-y-auto">{proposal.filter(p=>p.kind!=="exam").slice(0,18).map((p,i)=><div key={i} className="grid gap-2 rounded-xl bg-muted/60 p-3 text-sm sm:grid-cols-[1fr_auto_auto] sm:items-center"><span>{p.title}</span>{editingProposal?<><input aria-label={"Päivä: "+p.title} type="date" className="min-h-10 rounded-lg border bg-surface px-2" value={p.date} onChange={e=>setProposal(current=>current?.map(item=>item===p?{...item,date:e.target.value}:item)??null)}/><input aria-label={"Minuutit: "+p.title} type="number" min={p.min_minutes} max="240" step="5" className="min-h-10 w-24 rounded-lg border bg-surface px-2" value={p.target_minutes} onChange={e=>setProposal(current=>current?.map(item=>item===p?{...item,target_minutes:Math.max(item.min_minutes,Number(e.target.value)||item.min_minutes)}:item)??null)}/></>:<><span>{fullDate(p.date)}</span><span className="whitespace-nowrap text-muted-foreground">{minutes(p.target_minutes)}</span></>}</div>)}</div>
        <div className="mt-4 flex flex-wrap gap-2"><button disabled={generate.isPending} className={button} onClick={()=>void acceptProposal()}>Hyväksy</button><button className={secondary} onClick={()=>setEditingProposal(value=>!value)}>{editingProposal?"Valmis muokkauksesta":"Muokkaa"}</button><button className={secondary} onClick={()=>{setProposal(null);setEditingProposal(false);}}>Pidä nykyinen</button></div>
      </div>}
    </Panel>}
    {plan.length===0&&<Panel title="Ei tehtäviä vielä"><p className="text-muted-foreground">Luo ensimmäinen suunnitelma tai lisää tehtävä itse.</p></Panel>}
    <div className={mode==="kuukausi"?"grid grid-cols-2 gap-2 sm:grid-cols-7":"space-y-3"}>{days.map(date=><section className={`panel p-4 ${date===today()?"ring-1 ring-primary/50":""}`} key={date} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const id=e.dataTransfer.getData("text/plain");const item=plan.find(p=>p.id===id);if(item&&item.date!==date)void move.mutateAsync({id,date,from:item.date}).then(()=>toast.success("Tehtävä siirretty.")).catch(()=>toast.error("Siirto epäonnistui."));}}><h2 className="mb-3 text-sm font-semibold capitalize">{dateWithWeekday(date)}</h2>{plan.filter(p=>p.date===date).length===0?<p className="text-sm text-muted-foreground">Ei tehtäviä</p>:plan.filter(p=>p.date===date).map(p=><div key={p.id} draggable={mode!=="kuukausi"&&p.kind!=="exam"} onDragStart={e=>e.dataTransfer.setData("text/plain",p.id)} className="mb-2 rounded-xl bg-muted/60 p-3"><p className="text-xs font-semibold text-primary">{courses.find(c=>c.id===p.course_id)?.code} · {p.start_time?.slice(0,5)||minutes(p.target_minutes)}</p><p className="mt-1 text-sm font-medium">{p.title||topics.find(t=>t.id===p.topic_id)?.name||"Opiskelu"}</p><p className={`mt-1 text-xs ${statusClass[effectivePlanStatus(p)]}`}><span aria-hidden="true">{statusIcon[effectivePlanStatus(p)]} </span>{statusLabel[effectivePlanStatus(p)]} · {planPhaseLabel(p.phase)}</p>{mode!=="kuukausi"&&p.kind!=="exam"&&<div className="mt-3 flex flex-wrap items-center gap-1"><button className={secondary+" !min-h-9 !px-2"} onClick={()=>onStart(p.id)}>Aloita</button><details className="relative"><summary className={secondary+" list-none !min-h-9 !px-3"} aria-label="Tehtävän toiminnot">•••</summary><div className="absolute right-0 z-10 mt-1 min-w-36 rounded-xl border border-border bg-surface p-1 shadow-lg"><button className="block min-h-10 w-full rounded-lg px-3 text-left text-sm hover:bg-muted" onClick={()=>void shift(p)}>Siirrä</button>{p.status==="planned"&&<button className="block min-h-10 w-full rounded-lg px-3 text-left text-sm hover:bg-muted" onClick={()=>void skipWithReason(p)}>Ohita</button>}</div></details></div>}</div>)}</section>)}</div>
  </div>;
}

export function CourseView({courses,topics,sessions,exams,plan,tests,mistakes,selected,onSelect,onAdd,onStart}:Base&{sessions:Session[];exams:Exam[];plan:PlanItem[];tests:PracticeTest[];mistakes:Mistake[];selected:string|null;onSelect:(id:string|null)=>void;onAdd:()=>void;onStart:()=>void}) {
  const [tab,setTab]=useState("Yleiskuva"),[form,setForm]=useState<"mistake"|"test"|"course"|"newTopic"|null>(null),[editingTopic,setEditingTopic]=useState<Topic|null>(null);
  const archiveCourse=useArchiveCourse(),updateTopic=useUpdateTopic(),advanceMistake=useAdvanceMistake();
  const c=courses.find(x=>x.id===selected);
  if(!c)return <div className="space-y-3"><button className={button} onClick={onAdd}>+ Lisää kurssi</button>{courses.map(course=>{const ts=topics.filter(t=>t.course_id===course.id),ss=sessions.filter(s=>s.course_id===course.id),next=plan.find(p=>p.course_id===course.id&&p.status==="planned"&&p.date>=today());return <button key={course.id} onClick={()=>{onSelect(course.id);setTab("Yleiskuva");}} className="panel block w-full p-4 text-left hover:ring-1 hover:ring-primary sm:p-5"><div className="flex justify-between gap-3"><div className="min-w-0"><b className="text-primary">{course.code}</b><h2 className="mt-1 truncate text-lg font-semibold sm:text-xl">{course.name}</h2><p className="mt-1 text-sm text-muted-foreground">{minutes(ss.reduce((a,s)=>a+s.minutes,0))} · {next?.title||ts.find(t=>t.progress<100)?.name||"Ei seuraavaa aihetta"}</p></div><b>{weightedCoverage(ts)} %</b></div><div className="mt-3"><Bar value={weightedCoverage(ts)}/></div></button>})}</div>;

  const ts=topics.filter(t=>t.course_id===c.id),ss=sessions.filter(s=>s.course_id===c.id),ee=exams.filter(e=>e.course_id===c.id),pp=plan.filter(p=>p.course_id===c.id),mm=mistakes.filter(m=>m.course_id===c.id),tt=tests.filter(t=>t.course_id===c.id);
  const recovery=recoveryQueue(ts,today(),3);
  const mastery=masterySummary(ts);
  const riskItems=risks({course:c,topics:ts,plan:pp,examDate:c.exam_date});
  const points=c.start_date&&c.exam_date?corridor({start:c.start_date,exam:c.exam_date,sessions:ss,topics:ts,targetLevel:targetMastery(c.target_system,c.target_value)}):[];
  const currentPoint=[...points].reverse().find(p=>p.date<=today());
  const advice=corridorAdvice(weightedCoverage(ts),currentPoint);
  const buffer=courseBuffers({course:c,topics:ts,plan:pp,examDate:c.exam_date});
  const weekStart=startOfWeek(today()),weekEnd=addDays(weekStart,6);
  const weekStudy=ss.filter(s=>s.date>=weekStart&&s.date<=weekEnd).reduce((sum,s)=>sum+s.minutes,0);
  const latestSelf=ss.find(s=>s.competence!=null)?.competence??null;
  const hard=[...ts].sort((a,b)=>a.verified_level-b.verified_level||b.importance-a.importance).slice(0,5);
  const activeErrors=mm.filter(m=>m.status!=="mastered");
  const testSeries=tt.filter(t=>t.score!=null&&t.max_score).map(t=>({date:shortDate(t.date),percent:Math.round(Number(t.score)/Math.max(1,Number(t.max_score))*100)}));
  const latestTest=[...tt].sort((a,b)=>b.date.localeCompare(a.date))[0];
  const latestBreakdown=Array.isArray(latestTest?.topic_results)?latestTest.topic_results as Array<{topic_id?:string;name?:string;score?:number;max_score?:number}>:[];
  const statusText:Record<string,string>={open:"Avoin",corrected:"Korjattu",retested:"Uudelleen testattu",mastered:"Hallittu"};
  const nextStatus=(status:string):"corrected"|"retested"|"mastered"|null=>status==="open"?"corrected":status==="corrected"?"retested":status==="retested"?"mastered":null;
  const nextLabel=(status:string)=>status==="open"?"Merkitse korjatuksi":status==="corrected"?"Merkitse uudelleen testatuksi":status==="retested"?"Merkitse hallituksi":"Hallittu";

  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-2"><button className={secondary} onClick={()=>onSelect(null)}><ChevronLeft size={17}/>Kaikki kurssit</button><div className="flex gap-2"><button className={secondary} onClick={()=>setForm("course")}><Pencil size={16}/>Muokkaa</button><button className={secondary} onClick={async()=>{if(!window.confirm("Arkistoidaanko tämä kurssi?"))return;try{await archiveCourse.mutateAsync({id:c.id,archived:true});toast.success("Kurssi arkistoitu.");onSelect(null);}catch{toast.error("Arkistointi epäonnistui.");}}}><Archive size={16}/>Arkistoi</button></div></div>
    <p className="text-muted-foreground">{c.name}</p>
    <div role="tablist" aria-label="Kurssin osiot" className="flex gap-1 overflow-x-auto rounded-xl bg-muted p-1">{["Yleiskuva","Sisältö","Historia","Analyysi"].map(name=><button key={name} role="tab" aria-selected={tab===name} onClick={()=>setTab(name)} className={`min-h-11 min-w-max flex-1 rounded-lg px-3 text-sm ${tab===name?"bg-surface font-medium shadow-sm":""}`}>{name}</button>)}</div>

    {tab==="Yleiskuva"&&<div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Seuraava aihe"><p>{pp.find(p=>p.date>=today()&&p.status==="planned")?.title||ts.find(t=>t.progress<100)?.name||"Ei suunniteltua aihetta"}</p><button className={button+" mt-4"} onClick={onStart}>Kirjaa opiskelu</button></Panel>
      <Panel title="Edistyminen"><div className="grid grid-cols-3 gap-3"><div><p className="text-sm text-muted-foreground">Sisältö</p><p className="text-2xl font-semibold">{weightedCoverage(ts)} %</p></div><div><p className="text-sm text-muted-foreground">Osaaminen</p><p className="text-xl font-semibold">{mastery.label}</p><p className="mt-1 text-xs text-muted-foreground">{mastery.strong.length} vahvaa aihetta</p></div><div><p className="text-sm text-muted-foreground">Koulussa</p><p className="text-2xl font-semibold">{schoolCoverage(ts)} %</p></div></div><div className="mt-4"><Bar value={weightedCoverage(ts)}/></div></Panel>
      <Panel title="Tämän viikon työ"><p className="text-2xl font-semibold">{minutes(weekStudy)}</p><p className="mt-2 text-sm text-muted-foreground">Viikkotavoite {minutes(c.weekly_minutes)} · viimeisin itsearvio {latestSelf??"—"}/5</p></Panel>
      <Panel title="Koe">{ee[0]?<><p>{fullDate(ee[0].date)}</p><p className="mt-2 text-sm text-muted-foreground">{diffDays(ee[0].date,today())} päivää jäljellä.</p></>:"Koetta ei ole merkitty."}</Panel>
      <Panel title="Kertaukset"><p className="text-2xl font-semibold">{recovery.items.length?`${recovery.items.length} seuraavaa`:"Ei juuri nyt"}</p><p className="mt-2 text-sm text-muted-foreground">{recovery.items.length?"Näytetään vain tärkeimmät ajankohtaiset kertaukset. Koko jonoa ei muuteta velkalistaksi.":"Seuraava kertaus ilmestyy, kun siitä on oikeasti hyötyä."}</p></Panel>
      <Panel title="Harjoittele seuraavaksi">{hard.length?hard.map(t=><p key={t.id} className="py-1 text-sm">{t.name} · <span className="text-muted-foreground">{MASTERY_LABELS[t.verified_level]}</span></p>):<p className="text-sm text-muted-foreground">Ei vielä aiheita.</p>}</Panel>
    </div>}

    {tab==="Sisältö"&&<div className="space-y-4">
      <MaterialImporter course={c} topics={topics}/>
      <KnowledgeGraphEditor course={c} courses={courses} topics={topics}/>
      <Panel title="Aiheet" action={<button className={secondary+" !min-h-9"} onClick={()=>setForm("newTopic")}><Plus size={15}/>Lisää aihe</button>}>
      {ts.length?ts.map(t=>{const topicSessions=ss.filter(s=>s.topic_id===t.id),lastSession=topicSessions[0],mismatch=masteryMismatch(t);return <div key={t.id} className="border-b border-border py-4">
        <div className="flex justify-between gap-3"><div className="min-w-0"><p className="font-medium"><span aria-hidden="true">{t.progress>=100?"✓":t.progress>0?"◐":"○"} </span>{t.name}</p><p className="mt-1 text-sm text-muted-foreground">Sisältö {t.progress} % · osaaminen <b className="font-medium text-foreground">{MASTERY_LABELS[t.verified_level]}</b> · {minutes(t.study_minutes)}{t.materials?` · ${t.materials}`:""}</p><p className="mt-1 text-xs text-muted-foreground">{masteryEvidence(t)} · Viimeisin opiskelu {lastSession?fullDate(lastSession.date):"—"} · viimeisin kertaus {t.last_review?fullDate(t.last_review):"—"} · seuraava kertaus {t.next_review?fullDate(t.next_review):"—"}{lastSession?.tasks?` · tehtävät ${lastSession.tasks}`:""}</p>{mismatch&&<p className="mt-2 rounded-xl bg-accent p-2 text-xs">{mismatch.message}</p>}</div><div className="flex items-start gap-2"><button aria-label="Muokkaa aihetta" className="rounded-lg p-2 hover:bg-muted" onClick={()=>setEditingTopic(t)}><Pencil size={15}/></button></div></div>
        <div className="my-2"><Bar value={t.progress}/></div>
        <label className="flex min-h-10 items-center gap-2 text-sm"><input type="checkbox" className="size-4 accent-primary" checked={t.school_covered} onChange={e=>void updateTopic.mutateAsync({id:t.id,school_covered:e.target.checked}).catch(()=>toast.error("Koulun etenemistä ei voitu päivittää."))}/>Käsitelty koulussa</label>
      </div>}):<p className="text-muted-foreground">Lisää aiheita kurssille.</p>}
    </Panel>
    </div>}

    {tab==="Historia"&&<div className="space-y-4"><Panel title="Opiskeluhistoria">{ss.length?ss.map(s=><div className="border-b border-border py-3" key={s.id}><p className="font-medium">{fullDate(s.date)} · {minutes(s.minutes)} · {ts.find(t=>t.id===s.topic_id)?.name||c.code}</p><p className="mt-1 text-xs text-muted-foreground">{s.method||"menetelmä ei kirjattu"}{s.focus?` · keskittyminen ${s.focus}/5`:""}{s.energy?` · energia ${s.energy}/5`:""}</p>{(s.note||s.unclear)&&<p className="mt-1 text-sm text-muted-foreground">{s.note||s.unclear}</p>}</div>):<p className="text-muted-foreground">Et ole vielä kirjannut opiskelua tälle kurssille.</p>}</Panel><Panel title="Reflektiot">{ss.filter(s=>s.note||s.unclear).slice(0,8).map(s=><p key={s.id} className="border-b border-border py-2 text-sm">{fullDate(s.date)} · {s.note||s.unclear}</p>)}</Panel></div>}

    {tab==="Analyysi"&&<div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Valmistautuminen"><p className="text-2xl font-semibold">{readiness({topics:ts,tests:tt,mistakes:mm})} %</p><p className="mt-2 text-sm text-muted-foreground">Yhdistää todennetun osaamisen, kattavuuden, harjoituskokeet, kertauksen tuoreuden ja hallitut virheet. Ei arvosanaennuste.</p></Panel>
        <Panel title="Riskit">{riskItems.map(r=><div key={r.key} className="mb-4"><div className="mb-2 flex justify-between gap-3 text-sm"><b>{r.label}</b><span>{r.level} %</span></div><Bar value={r.level}/><p className="mt-1 text-xs text-muted-foreground">{r.note}</p></div>)}</Panel>
        <Panel title="Puskurit"><div className="grid grid-cols-3 gap-3"><div><p className="text-xs text-muted-foreground">Aikapuskuri</p><p className="text-xl font-semibold">{buffer.timeDays>=0?"+":""}{buffer.timeDays} pv</p></div><div><p className="text-xs text-muted-foreground">Työpuskuri</p><p className="text-xl font-semibold">{buffer.workSessions} opiskelukertaa</p></div><div><p className="text-xs text-muted-foreground">Korjausvara</p><p className="text-xl font-semibold">{buffer.recoverySessions}</p><p className="text-xs text-muted-foreground">{minutes(buffer.recoveryMinutes)}</p></div></div></Panel>
        <Panel title="Koulu vs. oma eteneminen"><p className="text-2xl font-semibold">{schoolCoverage(ts)} % <span className="text-sm font-normal text-muted-foreground">koulussa</span></p><p className="mt-1 text-2xl font-semibold">{weightedCoverage(ts)} % <span className="text-sm font-normal text-muted-foreground">itse</span></p><p className="mt-2 text-sm text-muted-foreground">{weightedCoverage(ts)-schoolCoverage(ts)>=15?"Olet selvästi koulua edellä. Uuden sisällön sijaan suunnitelma suosii kertausta ja syventämistä.":"Oma ja koulun eteneminen ovat lähellä toisiaan."}</p></Panel>
        <Panel title="Virhepankki"><button className={secondary+" mb-3"} onClick={()=>setForm("mistake")}>+ Kirjaa virhe</button>{mm.length?mm.map(m=>{const next=nextStatus(m.status);return <div className="border-t border-border py-3" key={m.id}><div className="flex items-start justify-between gap-3"><p className="font-medium">{m.error}</p><span className="rounded-full bg-muted px-2 py-1 text-xs">{statusText[m.status]??m.status}</span></div>{m.what_happened&&<p className="mt-1 text-sm text-muted-foreground">Mitä tapahtui: {m.what_happened}</p>}{(m.solution||m.explanation)&&<p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">Ratkaisutapa: {answerPlainText((m.solution||m.explanation) ?? "")}</p>}{m.retry_date&&<p className="mt-1 text-xs text-muted-foreground">Uusinta {fullDate(m.retry_date)}</p>}{next&&<button className="mt-2 text-sm text-primary underline" onClick={()=>void advanceMistake.mutateAsync({id:m.id,status:next}).then(()=>toast.success(next==="mastered"?"Virhe hallittu.":"Virheen tila päivitetty.")).catch(()=>toast.error("Merkintää ei voitu päivittää."))}>{nextLabel(m.status)}</button>}</div>}):<p className="text-sm text-muted-foreground">Ei kirjattuja virheitä.</p>}<p className="mt-3 text-xs text-muted-foreground">Aktiivinen virhevelka: {activeErrors.length}. Vasta Hallittu poistuu riskilaskennasta.</p></Panel>
        <Panel title="Harjoituskokeet"><button className={secondary+" mb-3"} onClick={()=>setForm("test")}>+ Kirjaa harjoituskoe</button>{testSeries.length>1&&<div className="mb-4 h-40"><ResponsiveContainer width="100%" height="100%"><ComposedChart data={testSeries}><CartesianGrid vertical={false}/><XAxis dataKey="date"/><YAxis domain={[0,100]} width={30}/><Tooltip/><Line dataKey="percent" stroke="currentColor" strokeWidth={2}/></ComposedChart></ResponsiveContainer></div>}{latestTest&&<p className="text-sm font-medium">Viimeisin {fullDate(latestTest.date)} · {latestTest.score}/{latestTest.max_score} p{latestTest.duration_minutes?` · ${latestTest.duration_minutes} min`:""}{latestTest.error_count!=null?` · ${latestTest.error_count} virhettä`:""}</p>}{latestBreakdown.length>0&&<div className="mt-3 space-y-1">{latestBreakdown.map((r,i)=><p key={r.topic_id??i} className="text-xs text-muted-foreground">{r.name||ts.find(t=>t.id===r.topic_id)?.name||"Aihe"} · {r.score??0}/{r.max_score??0}</p>)}</div>}</Panel>
      </div>
      {points.length>0&&<Panel title="Etenemiskäytävä ja ennuste">
        <div className="h-72 w-full"><ResponsiveContainer width="100%" height="100%"><ComposedChart data={points}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="label"/><YAxis domain={[0,100]} width={32}/><Tooltip/><Area dataKey="upper" stroke="none" fill="currentColor" fillOpacity={0.08}/><Line type="monotone" dataKey="lower" stroke="currentColor" strokeOpacity={0.25} dot={false}/><Line type="monotone" dataKey="target" stroke="currentColor" strokeDasharray="5 5" dot={false}/><Line type="monotone" dataKey="actual" stroke="currentColor" strokeWidth={3} connectNulls={false}/><Line type="monotone" dataKey="forecast" stroke="currentColor" strokeWidth={2} strokeDasharray="3 3" connectNulls={false}/></ComposedChart></ResponsiveContainer></div>
        <p className="mt-3 text-sm text-muted-foreground">{advice}</p>
      </Panel>}
    </div>}

    {form==="mistake"&&<MistakeForm courseId={c.id} topics={ts} onClose={()=>setForm(null)}/>}
    {form==="test"&&<PracticeTestForm courseId={c.id} topics={ts} onClose={()=>setForm(null)}/>}
    {form==="course"&&<CourseEditForm course={c} onClose={()=>setForm(null)}/>}
    {form==="newTopic"&&<TopicForm courseId={c.id} onClose={()=>setForm(null)}/>}
    {editingTopic&&<TopicForm courseId={c.id} topic={editingTopic} onClose={()=>setEditingTopic(null)}/>}
  </div>;
}

export function ExamsView({courses,topics,exams,tests,attempts,mistakes,sessions,plan,onCourse}:Base&{exams:Exam[];tests:PracticeTest[];attempts:PracticeAttempt[];mistakes:Mistake[];sessions:Session[];plan:PlanItem[];onCourse:(id:string)=>void}) {
  const [adding,setAdding]=useState(false),[selectedExam,setSelectedExam]=useState<string|null>(null);
  const yo=yoOverviewV4(courses,topics,attempts);
  const selected=exams.find(e=>e.id===selectedExam);
  if(selected){
    const course=courses.find(c=>c.id===selected.course_id);
    const ts=topics.filter(t=>t.course_id===selected.course_id);
    const tt=tests.filter(t=>t.course_id===selected.course_id);
    const aa=attempts.filter(a=>a.course_id===selected.course_id);
    const mm=mistakes.filter(m=>m.course_id===selected.course_id);
    const ss=sessions.filter(s=>s.course_id===selected.course_id);
    const pp=plan.filter(p=>p.course_id===selected.course_id&&p.date>=today()&&p.date<=selected.date&&p.status==="planned");
    const prep=examStage({topics:ts,attempts:aa,tests:tt,mistakes:mm,course:course??null});
    const buffer=course?.exam_date?examBuffer({examDate:course.exam_date,topics:ts,attempts:aa,capacity:{studyWeekdays:[1,2,3,4,5],weekdayMinutes:60,weekendMinutes:90,busyDates:[]}}):null;
    const topicStates=ts.map(topic=>({topic,state:deriveTopicLearningState(topic,aa,{examDate:course?.exam_date??null})}));
    const missing=topicStates.filter(row=>row.topic.progress<100||row.state.masteryLevel<3).sort((a,b)=>a.state.masteryLevel-b.state.masteryLevel||b.topic.importance-a.topic.importance);
    const reviews=buildRecoveryQueue({topics:ts,attempts:aa,courses:course?[course]:[],now:today(),capacityMinutes:60,maxItems:10}).items;
    const studyMinutes=ss.reduce((sum,s)=>sum+s.minutes,0);
    const v4TopicStates=ts.map(topic=>({topic,model:masteryModelV4(topic,aa,{examDate:selected.date})}))
      .sort((a,b)=>b.topic.importance-a.topic.importance||a.model.level-b.model.level);
    const finalTwoDays=diffDays(selected.date,today())<=2;
    return <div className="space-y-5">
      <button className={secondary} onClick={()=>setSelectedExam(null)}><ChevronLeft size={17}/>Kaikki kokeet</button>
      <Panel title={selected.name}>
        <p className="text-sm text-muted-foreground">{course?.code} · {fullDate(selected.date)} · {diffDays(selected.date,today())} päivää</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div><p className="text-xs text-muted-foreground">Tavoite</p><p className="text-xl font-semibold">{selected.target_value||course?.target_value||"—"}</p></div>
          <div><p className="text-xs text-muted-foreground">Sisältö</p><p className="text-xl font-semibold">{weightedCoverage(ts)} %</p></div>
          <div><p className="text-xs text-muted-foreground">Nykyinen vaihe</p><p className="text-xl font-semibold">{prep.stages[prep.index]?.label??"—"}</p></div>
          <div><p className="text-xs text-muted-foreground">Opiskeltu</p><p className="text-xl font-semibold">{minutes(studyMinutes)}</p></div>
        </div>
        <p className="mt-5 text-3xl font-semibold">Vaihe {prep.index+1}/6 <span className="text-sm font-normal text-muted-foreground">valmistautuminen · ei arvosanaennuste</span></p>
      </Panel>
      <Panel title="Koemoodin vaiheet">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{prep.stages.map((phase,index)=><div key={phase.key} className={`rounded-xl p-3 ${index===prep.index?"bg-accent ring-1 ring-primary/40":"bg-muted/60"}`}><div className="flex items-center justify-between gap-2"><p className="font-medium">{index+1}. {phase.label}</p><span className={`text-xs font-semibold ${phase.done?"text-primary":"text-muted-foreground"}`}>{phase.done?"Valmis":index===prep.index?"Nyt":"Tulossa"}</span></div><p className="mt-1 text-xs text-muted-foreground">{phase.description}</p></div>)}</div>
        <p className="mt-3 text-xs text-muted-foreground">Järjestys ei ole jäykkä lukko. Harjoittelutila mukauttaa kysymystyypit tähän vaiheeseen.</p>{buffer&&<div className="mt-4 rounded-xl border border-border p-3 text-sm"><b>Koetta edeltävä aikataulu</b><p className="mt-1 text-muted-foreground">Sisältökierros viimeistään {fullDate(buffer.contentDeadline)} · vaihteleva harjoittelu {fullDate(buffer.mixedDate)} · simulaatio {fullDate(buffer.simulationDate)} · virheiden korjaus {fullDate(buffer.repairDate)} · kevyt päivä {fullDate(buffer.lightDate)}</p></div>}
      </Panel>
      <Panel title="Kokeen osaamiskartta">
        {finalTwoDays&&<div className="mb-4 rounded-xl bg-accent p-3 text-sm"><b>Viimeiset 2 päivää:</b> pidä kuorma kevyenä. Priorisoi muistista palauttaminen, virhelista ja lyhyet itsenäiset varmistukset. Uutta raskasta sisältöä ei työnnetä vain kalenterin täytteeksi.</div>}
        <div className="divide-y divide-border">
          {v4TopicStates.slice(0,12).map(({topic,model})=><div key={topic.id} className="flex items-center justify-between gap-3 py-3 text-sm"><span><b>{topic.name}</b><small className="mt-1 block text-muted-foreground">Tärkeys {topic.importance}/5 · näytön varmuus {Math.round(model.confidence*100)} % · unohtumisriski {Math.round(model.forgettingRisk*100)} %</small></span><span className="text-right"><b>{masteryLabelFi(model.label)}</b><small className="block text-muted-foreground">{model.score} %</small></span></div>)}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Osaamiskartta ei ole arvosanaennuste. Se priorisoi koeaikaa sen perusteella, missä on tärkein osaamisaukko tai unohtumisriski.</p>
      </Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Harjoittele ennen koetta">{missing.length?missing.slice(0,10).map(row=><div key={row.topic.id} className="flex items-center justify-between gap-3 border-b border-border py-2 text-sm"><span>{row.topic.name}</span><span className="text-right text-muted-foreground">{row.topic.progress}% sisältö · {row.state.masteryLabel}</span></div>):<p className="text-muted-foreground">Kaikista aiheista on jo vahvaa näyttöä tai sisältö on käsitelty.</p>}</Panel>
        <Panel title="Kertausohjelma">{reviews.length?reviews.slice(0,10).map(row=><div key={row.topic.id} className="flex items-center justify-between gap-3 border-b border-border py-2 text-sm"><span><b>{row.topic.name}</b><small className="mt-1 block text-muted-foreground">{row.reason}</small></span><span className="text-muted-foreground">{row.topic.next_review?fullDate(row.topic.next_review):"—"}</span></div>):<p className="text-muted-foreground">Ei erääntyviä kertauksia ennen koetta.</p>}</Panel>
        <Panel title="Harjoituskokeet">{tt.length?tt.map(t=><div key={t.id} className="border-b border-border py-2 text-sm"><p className="font-medium">{fullDate(t.date)} · {t.score}/{t.max_score} p</p><p className="text-xs text-muted-foreground">{t.duration_minutes?`${t.duration_minutes} min · `:""}{t.error_count!=null?`${t.error_count} virhettä`:""}</p></div>):<p className="text-muted-foreground">Harjoituskokeita ei ole vielä kirjattu.</p>}</Panel>
        <Panel title="Suunniteltu ennen koetta">{pp.length?pp.slice(0,12).map(p=><div key={p.id} className="flex items-center justify-between border-b border-border py-2 text-sm"><span>{fullDate(p.date)} · {p.title}</span><span className="text-muted-foreground">{minutes(p.target_minutes)}</span></div>):<p className="text-muted-foreground">Ei avoimia tehtäviä ennen koetta.</p>}</Panel>
      </div>
      <ExamSimulationV5 courses={course?[course]:[]} topics={ts}/>
      <button className={secondary} onClick={()=>onCourse(selected.course_id)}>Avaa kurssi</button>
    </div>;
  }
  return <div className="space-y-4">
  {yo.enabled&&<Panel title="YO-tila">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><div><small className="text-muted-foreground">Vaihe</small><p className="font-semibold">{yoPhaseLabel(yo.phase)}</p></div><div><small className="text-muted-foreground">Vakaat</small><p className="text-xl font-semibold">{yo.stable}</p></div><div><small className="text-muted-foreground">Riskissä</small><p className="text-xl font-semibold">{yo.atRisk}</p></div><div><small className="text-muted-foreground">Arvioimatta</small><p className="text-xl font-semibold">{yo.unassessed}</p></div></div>
    {yo.daysToNearestExam!==null&&<p className="mt-3 text-sm text-muted-foreground">{yo.daysToNearestExam} päivää lähimpään YO-kokeeseen. Kurssikoe- ja YO-logiikka pidetään erillään.</p>}
    <div className="mt-3 space-y-2">{yo.priorities.slice(0,5).map(row=><button key={row.course.id+row.topic.id} className="flex min-h-12 w-full items-center justify-between rounded-xl bg-muted/60 px-3 text-left" onClick={()=>onCourse(row.course.id)}><span><b>{row.course.code} · {row.topic.name}</b><small className="mt-1 block text-muted-foreground">{row.reason}</small></span></button>)}</div>
  </Panel>}
  <ExamSimulationV5 courses={courses} topics={topics}/>
  <button className={button} onClick={()=>setAdding(true)}>+ Lisää koe</button>{adding&&<ExamForm courses={courses} onClose={()=>setAdding(false)}/>}
  {exams.length===0?<Panel title="Ei kokeita vielä"><p className="text-muted-foreground">Lisää ensimmäinen koe painamalla Lisää koe.</p></Panel>:exams.map(e=>{const course=courses.find(c=>c.id===e.course_id);const ts=topics.filter(t=>t.course_id===e.course_id);const prep=examStage({topics:ts,attempts:attempts.filter(a=>a.course_id===e.course_id),tests:tests.filter(t=>t.course_id===e.course_id),mistakes:mistakes.filter(m=>m.course_id===e.course_id),course:course??null});const mode=examMode(e.date);return <button key={e.id} onClick={()=>setSelectedExam(e.id)} className="panel block w-full p-4 text-left sm:p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-primary">{course?.code}</p><h2 className="mt-1 text-lg font-semibold">{e.name}</h2><p className="mt-1 text-sm text-muted-foreground">{fullDate(e.date)} · {diffDays(e.date,today())} päivää</p></div><span className="text-right"><b className="block">{prep.stages[prep.index]?.label}</b><small className="text-muted-foreground">vaihe {prep.index+1}/6</small></span></div>{mode.active&&<p className="mt-2 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold">Koemoodi aktiivinen</p>}<p className="mt-2 text-xs text-muted-foreground">Ei arvosanaennuste · avaa kokeen yksityiskohdat</p></button>})}</div>;
}

export function ProgressView({courses,topics,attempts,sessions,plan,exams,mistakes,capacity,onPlan}:Base&{attempts:PracticeAttempt[];sessions:Session[];plan:PlanItem[];exams:Exam[];mistakes:Mistake[];capacity:CapacityProfile;onPlan:()=>void}) {
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

  return <div className="space-y-5">
    <p className="text-sm text-muted-foreground">Oppimisnäyttö ensin · aika ja käyttömäärä ovat alempana kuormitustietoa.</p>
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <div className="panel p-4"><p className="text-sm text-muted-foreground">Vahvat / vakaat aiheet</p><p className="mt-2 text-2xl font-semibold">{v4Groups.strong.length+v4Groups.secure.length}/{topics.length}</p><p className="mt-1 text-xs text-muted-foreground">{v4Rows.filter(row=>row.model.evidenceCount>0).length} aiheesta on näyttöä</p></div>
      <div className="panel p-4"><p className="text-sm text-muted-foreground">Tärkeät opiskelukerrat</p><p className="mt-2 text-2xl font-semibold">{review.completed}/{review.planned}</p><p className="mt-1 text-xs text-muted-foreground">tähän päivään mennessä</p></div>
      <div className="panel p-4"><p className="text-sm text-muted-foreground">Opiskelurytmi</p><p className="mt-2 text-2xl font-semibold">{new Set(recent.map(s=>s.date)).size}</p><p className="mt-1 text-xs text-muted-foreground">opiskelupäivää / 30 pv</p></div>
      <div className="panel p-4"><p className="text-sm text-muted-foreground">Aikaa kirjattu</p><p className="mt-2 text-2xl font-semibold">{minutes(recentMinutes)}</p><p className="mt-1 text-xs text-muted-foreground">kuormitustieto, ei osaamispiste</p></div>
    </div>

    <V5LearningHealthPanel courses={courses} topics={topics} attempts={attempts}/>
    <ContrastiveErrorLab courses={courses} topics={topics} mistakes={mistakes}/>

    <Panel title="Osaamiskartta v4">
      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {[
          ["Not assessed",v4Groups.unassessed],
          ["Harjoittele",v4Groups.learning],
          ["Developing",v4Groups.developing],
          ["Melko varma",v4Groups.secure],
          ["Vahva",v4Groups.strong],
          ["At risk",v4Groups.atRisk],
        ].map(([label,rows])=><div key={label as string} className="rounded-xl bg-muted/50 p-3"><p className="text-xs font-semibold">{label as string}</p><p className="mt-1 text-2xl font-semibold">{(rows as typeof v4Rows).length}</p></div>)}
      </div>
      <div className="mt-4 divide-y divide-border">
        {[...v4Rows].sort((a,b)=>a.model.level-b.model.level||b.model.uncertainty-a.model.uncertainty).slice(0,16).map(({topic,model})=><details key={topic.id} className="py-3"><summary className="cursor-pointer list-none"><div className="flex min-h-11 items-center justify-between gap-3"><span><b>{courses.find(course=>course.id===topic.course_id)?.code} · {topic.name}</b><small className="mt-1 block text-muted-foreground">{masteryLabelFi(model.label)} · näytön varmuus {Math.round(model.confidence*100)} %{model.blindSpot?" · mahdollinen sokea piste":""}</small></span><span className="text-sm font-semibold">{model.score} %</span></div></summary><div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-muted/50 p-3 text-xs sm:grid-cols-3"><span>Muistista palautus <b>{model.dimensions.recall.score}%</b></span><span>Ymmärrys <b>{model.dimensions.understanding.score}%</b></span><span>Soveltaminen <b>{model.dimensions.application.score}%</b></span><span>Sujuvuus <b>{model.dimensions.fluency.score}%</b></span><span>Säilyminen <b>{model.dimensions.retention.score}%</b></span><span>Oman arvion tarkkuus <b>{model.dimensions.calibration.score}%</b></span><p className="col-span-full text-muted-foreground">Heikoin osa-alue: {dimensionLabel(model.weakestDimension)}. Tarkat prosentit ovat näyttöön perustuvia arvioita, eivät todistuksen numeroita.</p></div></details>)}
      </div>
    </Panel>

    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Virheprofiili · 30 pv">
        {errors30.length?errors30.slice(0,6).map(row=><div key={row.category} className="flex items-center justify-between border-b border-border py-2 text-sm"><span>{errorCategoryLabel(row.category)}</span><b>{Math.round(row.share*100)} %</b></div>):<p className="text-sm text-muted-foreground">Virhehavaintoja ei ole vielä tarpeeksi.</p>}
      </Panel>
      <Panel title="Opiskelukerran kuormitus">
        <p className="text-lg font-semibold">{fatigue.level==="high"?"Tauko- ja pituussignaali on selvä":fatigue.level==="watch"?"Pieni väsymissignaali":"Ei selvää väsymissignaalia"}</p>
        <p className="mt-2 text-sm text-muted-foreground">{fatigue.reason}</p>
        {fatigue.preferredSessionMinutes&&<p className="mt-3 text-sm">Nykyisissä havainnoissa noin <b>{fatigue.preferredSessionMinutes} min</b> opiskelukerrat näyttävät toimivan parhaiten.</p>}
      </Panel>
    </div>

    <div className="grid gap-4 lg:grid-cols-2">
      <Panel title="Henkilökohtainen oppimisprofiili">
        {learningProfile.observations.length?learningProfile.observations.map((row,index)=><div key={index} className="border-b border-border py-3"><p className="font-medium">{row.label}</p><p className="mt-1 text-xs text-muted-foreground">{row.evidence} · näytön varmuus {confidenceLabel(row.confidence)}</p></div>):<p className="text-sm text-muted-foreground">Profiili rakentuu käytöstä. Sovellus ei arvaa “oppimistyyliä” tyhjästä.</p>}
      </Panel>
      <Panel title="Henkilökohtaiset oppimiskokeilut">
        {experimentInsights.map(row=><div key={row.key} className="border-b border-border py-3"><div className="flex items-center justify-between gap-3"><b>{row.label}</b><span className="text-xs text-muted-foreground">{experimentStatusLabel(row.status)}</span></div><p className="mt-1 text-sm text-muted-foreground">{row.description}</p><p className="mt-1 text-xs text-muted-foreground">A: {row.sampleA} havaintoa · B: {row.sampleB} havaintoa</p></div>)}
        <p className="mt-3 text-xs text-muted-foreground">Johtopäätös tehdään myöhemmästä osaamisnäytöstä, ei siitä miltä opiskelukerta tuntui.</p>
      </Panel>
    </div>

    <Panel title="Osaamisen virstanpylväät">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map(item=><div key={item.id} className={"rounded-xl border p-3 "+(item.earned?"border-primary/40 bg-accent/50":"border-border bg-muted/40")}><div className="flex items-center justify-between gap-2"><b>{item.title}</b><span aria-label={item.earned?"saavutettu":"kesken"}>{item.earned?"✓":"○"}</span></div><p className="mt-1 text-xs text-muted-foreground">{item.body}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{width:Math.min(100,item.progress)+"%"}}/></div></div>)}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Ei kokemuspisteitä, tulostauluja tai päiväputkirangaistuksia. Edistyminen tarkoittaa osaamisen vahvistumista ja virheistä oppimista.</p>
    </Panel>

    <Panel title="Oppimismittarit">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          ["Viivepalautus",productMetrics.delayedRecallRate===null?"—":Math.round(productMetrics.delayedRecallRate*100)+" %"],
          ["Itsenäinen onnistuminen",productMetrics.independentSuccessRate===null?"—":Math.round(productMetrics.independentSuccessRate*100)+" %"],
          ["Osaamisen vakaus",productMetrics.masteryStability===null?"—":Math.round(productMetrics.masteryStability*100)+" %"],
          ["Virheistä palautuminen",productMetrics.recoverySuccessRate===null?"—":Math.round(productMetrics.recoverySuccessRate*100)+" %"],
          ["Vakaata / tunti",productMetrics.studyEfficiency===null?"—":(Math.round(productMetrics.studyEfficiency*10)/10).toString()],
        ].map(([label,value])=><div key={label} className="rounded-xl bg-muted/50 p-3"><small className="text-muted-foreground">{label}</small><p className="mt-1 text-xl font-semibold">{value}</p></div>)}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Ruutuaikaa ei palkita. Nämä mittarit kertovat muistamisesta, vakaudesta, recoveryistä ja oppimisen tehokkuudesta.</p>
    </Panel>

    <details className="panel p-4 sm:p-5">
      <summary className="cursor-pointer font-semibold">Järjestelmän toiminnan tarkistus · 60 päivän simulaatio</summary>
      <div className="mt-4 space-y-2">{selfChecks.map(check=><p key={check.id} className="text-sm">{check.ok?"✓":"⚠"} {check.message}</p>)}</div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">{simulations.map(sim=><div key={sim.profile} className="rounded-xl bg-muted/50 p-3 text-sm"><b>{simulationProfileLabel(sim.profile)}</b><p className="mt-2">Osaaminen {sim.meanMastery} · varmuus {sim.meanConfidence}</p><p className="text-xs text-muted-foreground">{sim.completed} toimintoa · {sim.skipped} ohitettua · {sim.overloadDays} ylikuormapäivää</p></div>)}</div>
    </details>

    <Panel title="Osaamiskartta">
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

    <Panel title={"Viikkosi · viikko "+weekNumber(now)}>
      <div className="grid gap-4 lg:grid-cols-3">
        <div><p className="text-sm font-semibold">Vahvistui</p>{review.strengthened.length?review.strengthened.map(row=><p key={row.topic.id} className="mt-2 text-sm">{courses.find(c=>c.id===row.topic.course_id)?.code} · {row.topic.name}</p>):<p className="mt-2 text-sm text-muted-foreground">Ei vielä riittävästi uutta näyttöä tällä viikolla.</p>}</div>
        <div><p className="text-sm font-semibold">Tarvitsee vielä kierroksen</p>{review.needsRound.length?review.needsRound.map(row=><p key={row.topic.id} className="mt-2 text-sm">{courses.find(c=>c.id===row.topic.course_id)?.code} · {row.topic.name}</p>):<p className="mt-2 text-sm text-muted-foreground">Kertausjono on tällä hetkellä hallinnassa.</p>}</div>
        <div><p className="text-sm font-semibold">Suunnitelma</p><p className="mt-2 text-2xl font-semibold">{review.completed}/{review.planned}</p><p className="text-xs text-muted-foreground">tärkeästä tähän päivään mennessä toteutui</p></div>
      </div>
      <div className="mt-5 rounded-2xl bg-muted/50 p-4"><p className="text-sm font-semibold">Ensi viikolle ehdotan</p>{nextWeekSuggestions.map((suggestion,index)=><p key={index} className="mt-2 text-sm">{suggestion}</p>)}</div>
      <button className={button+" mt-4"} onClick={onPlan}>Tarkista ja hyväksy suunnitelma</button>
    </Panel>

    {forecast&&forecastCourse&&<Panel title="Forecast">
      <p className="text-sm text-muted-foreground">{forecastCourse.code} · ensimmäinen sisältökierros</p>
      <p className="mt-2 text-2xl font-semibold">{fullDate(forecast.earliest)}–{fullDate(forecast.latest)}</p>
      {forecastCourse.exam_date&&<p className="mt-1 text-sm">Tavoite / koe {fullDate(forecastCourse.exam_date)} · {forecast.latest<=forecastCourse.exam_date?"aikataulussa":"vaatii suunnitelman tarkistuksen"}</p>}
      <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="rounded-xl bg-muted/50 p-3"><small className="text-muted-foreground">Opiskelukertoja / vko</small><p className="font-semibold">{forecast.sessionsPerWeek.toFixed(1)}</p></div><div className="rounded-xl bg-muted/50 p-3"><small className="text-muted-foreground">Toteutumisaste</small><p className="font-semibold">{Math.round(forecast.adherence*100)} %</p></div><div className="rounded-xl bg-muted/50 p-3"><small className="text-muted-foreground">Sisältö</small><p className="font-semibold">{Math.round(forecast.coverage)} %</p></div></div>
      <p className="mt-3 text-xs text-muted-foreground">{forecast.note}</p>
    </Panel>}

    {calibrationData&&<Panel title="Varmuusarvion osumatarkkuus">
      <p className="text-lg font-semibold">{calibrationData.label}</p>
      <p className="mt-2 text-sm text-muted-foreground">Perustuu {calibrationData.count} harjoitusyritykseen, joissa annoit varmuusarvion ennen palautetta. Tämä ei ole pisteytys eikä sijoituslista.</p>
    </Panel>}

    <Panel title="Opiskelurytmi · 5 viikkoa"><div className="grid grid-cols-7 gap-1.5">{heat.map(cell=>{const intensity=cell.mins===0?0:cell.mins<30?0.25:cell.mins<60?0.5:cell.mins<90?0.75:1;return <div key={cell.date} title={fullDate(cell.date)+" · "+minutes(cell.mins)} className="aspect-square rounded-[6px] border border-border bg-primary" style={{opacity:intensity===0?0.07:intensity}}/>})}</div><p className="mt-3 text-xs text-muted-foreground">Tummempi ruutu tarkoittaa enemmän opiskelua. Päiväputkia ei käytetä painostamiseen.</p></Panel>

    <Panel title="Viikoittainen suunniteltu vs. toteutunut">
      <div className="h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={weekly}><CartesianGrid vertical={false}/><XAxis dataKey="week"/><YAxis width={34}/><Tooltip formatter={(value)=>minutes(Number(value))}/><RechartsBar dataKey="planned" fill="currentColor" fillOpacity={0.18}/><RechartsBar dataKey="actual" fill="currentColor" fillOpacity={0.75}/></BarChart></ResponsiveContainer></div>
      <p className="mt-2 text-xs text-muted-foreground">Tämä kertoo kuormasta ja suunnitelman toteutumisesta, ei siitä kuinka “hyvä opiskelija” olit.</p>
    </Panel>

    <Panel title={"Viikko "+weekNumber(now)+" · reflektio"}>
      <div className="grid gap-3 sm:grid-cols-3"><div><p className="text-sm text-muted-foreground">Tavoite</p><input type="number" min="0" step="15" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={planned} onChange={e=>setPlanned(Number(e.target.value))}/></div><div><p className="text-sm text-muted-foreground">Toteutunut</p><p className="mt-2 text-xl font-semibold">{minutes(actual)}</p></div><div><p className="text-sm text-muted-foreground">Opiskelupäivät</p><p className="mt-2 text-xl font-semibold">{studyDaysInWeek(sessions)}</p></div></div>
      <fieldset className="mt-4"><legend className="mb-2 text-sm font-medium">Suunnitelmassa pysyminen 1–5</legend><div className="flex gap-2">{[1,2,3,4,5].map(n=><button key={n} type="button" aria-pressed={adherence===n} onClick={()=>setAdherence(n)} className={"grid size-11 place-items-center rounded-xl border "+(adherence===n?"border-primary bg-accent":"border-border")}>{n}</button>)}</div></fieldset>
      <div className="mt-4 grid gap-3 sm:grid-cols-2"><label className="text-sm font-medium">Vaikein aihe<select className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={hardest} onChange={e=>setHardest(e.target.value)}><option value="">Ei valintaa</option>{topics.map(t=><option key={t.id} value={t.id}>{courses.find(c=>c.id===t.course_id)?.code} · {t.name}</option>)}</select></label><label className="text-sm font-medium">Kuormitus<select className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={load} onChange={e=>setLoad(e.target.value as "light"|"good"|"heavy")}><option value="light">Liian kevyt</option><option value="good">Sopiva</option><option value="heavy">Liian raskas</option></select></label></div>
      <label className="mt-4 block text-sm font-medium">Mikä meni hyvin?<textarea rows={2} className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={wentWell} onChange={e=>setWentWell(e.target.value)}/></label>
      <label className="mt-4 block text-sm font-medium">Seuraavan viikon fokus<textarea rows={2} className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={nextFocus} onChange={e=>setNextFocus(e.target.value)}/></label>
      <label className="mt-4 block text-sm font-medium">Muut huomiot<textarea rows={3} className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={note} onChange={e=>setNote(e.target.value)}/></label>
      <div className="mt-3 flex flex-wrap gap-2"><button className={button} disabled={saveCheckin.isPending} onClick={()=>void saveCheckin.mutateAsync({week_start:week,note:note.trim()||null,planned_minutes:planned,actual_minutes:actual,adherence,hardest_topic_id:hardest||null,went_well:wentWell.trim()||null,next_focus:nextFocus.trim()||null,load_rating:load}).then(result=>toast.success(result==="queued"?"Reflektio tallennettu paikallisesti.":"Viikkoreflektointi tallennettu.")).catch(()=>toast.error("Tallennus epäonnistui."))}>Tallenna reflektio</button><button className={secondary} onClick={onPlan}>Avaa ensi viikon suunnitelma</button></div>
    </Panel>

    <Panel title="Osaamisen tapahtumat">{events.data?.length?events.data.slice(0,12).map(e=><div key={e.id} className="border-b border-border py-3"><p className="font-medium">{e.detail??eventKindLabel(e.kind)}</p><p className="text-sm text-muted-foreground">{e.kind==="mastery"&&e.from_value!=null&&e.to_value!=null?"Osaaminen "+e.from_value+" → "+e.to_value:eventKindLabel(e.kind)} · {new Date(e.created_at).toLocaleDateString("fi-FI")}</p></div>):<p className="text-muted-foreground">Osaamisen muutokset ilmestyvät tähän harjoittelun myötä.</p>}</Panel>
  </div>;
}

export function SettingsView({user:_user}:{user:DeviceUser}) {
  const [dark,setDark]=useState(typeof window!=="undefined"?storedThemeIsDark():false);
  const [pushEnabled,setPushEnabled]=useState(false);
  const [pushBusy,setPushBusy]=useState(false);
  const preferences=usePreferences(),prefs=preferences.data,updatePreferences=useUpdatePreferences();
  const [weekdayMinCapacity,setWeekdayMinCapacity]=useState(30),[weekdayCapacity,setWeekdayCapacity]=useState(60),[weekendMinCapacity,setWeekendMinCapacity]=useState(60),[weekendCapacity,setWeekendCapacity]=useState(120),[busyDate,setBusyDate]=useState("");
  const settingsQ=useSettings(),settings=settingsQ.data,updateSettings=useUpdateSettings();
  const allCourses=useCourses(),archiveCourse=useArchiveCourse();
  const archived=(allCourses.data??[]).filter(c=>c.archived);
  const weekdayOptions=[[1,"Ma"],[2,"Ti"],[3,"Ke"],[4,"To"],[5,"Pe"],[6,"La"],[7,"Su"]] as const;
  const notificationOptions=[
    ["study_sessions","Opiskelukerrat","Päivän suunnitellut opiskelut ja erääntyvät kertaukset"],
    ["exams","Kokeet","Lähestyvät kokeet"],
    ["plan_changes","Suunnitelmamuutokset","Myöhässä oleva työ ja tarve mukauttaa suunnitelmaa"],
    ["weekly_summary","Viikkoyhteenveto","Rauhallinen yhteenveto viikon opiskelusta"],
  ] as const;

  useEffect(()=>{
    let active=true;
    void pushIsEnabledOnDevice().then(enabled=>{if(active)setPushEnabled(enabled);}).catch(()=>{if(active)setPushEnabled(false);});
    return()=>{active=false;};
  },[]);
  useEffect(()=>{
    if(!prefs)return;
    setWeekdayMinCapacity(prefs.weekday_capacity_min_minutes??30);
    setWeekdayCapacity(prefs.weekday_capacity_minutes??60);
    setWeekendMinCapacity(prefs.weekend_capacity_min_minutes??60);
    setWeekendCapacity(prefs.weekend_capacity_minutes??120);
  },[prefs?.weekday_capacity_min_minutes,prefs?.weekday_capacity_minutes,prefs?.weekend_capacity_min_minutes,prefs?.weekend_capacity_minutes]);

  async function togglePush(){
    setPushBusy(true);
    try{
      if(pushEnabled){
        await disableBackgroundPush();
        await updatePreferences.mutateAsync({notifications_enabled:false});
        setPushEnabled(false);
        toast.success("Taustamuistutukset poistettu käytöstä.");
      }else{
        await enableBackgroundPush();
        await updatePreferences.mutateAsync({notifications_enabled:true});
        setPushEnabled(true);
        toast.success("Taustamuistutukset käytössä.");
      }
    }catch(error){
      toast.error(error instanceof Error?error.message:"Ilmoitusasetusta ei voitu muuttaa.");
    }finally{
      setPushBusy(false);
    }
  }

  async function toggleWeekday(day:number){
    if(!prefs)return;
    const current=prefs.study_weekdays?.length?prefs.study_weekdays:[1,2,3,4,5];
    const selected=current.includes(day);
    if(selected&&current.length===1){toast.error("Valitse vähintään yksi opiskelupäivä.");return;}
    const next=(selected?current.filter(x=>x!==day):[...current,day]).sort((a,b)=>a-b);
    try{await updatePreferences.mutateAsync({study_weekdays:next});}
    catch{toast.error("Opiskelupäiviä ei voitu tallentaa.");}
  }

  return <div className="space-y-5">
    <Panel title="Profiili"><p className="text-2xl font-semibold">{prefs?.display_name||"Arthur"}</p><p className="mt-2 text-sm text-muted-foreground">Tämä laite on yhdistetty Opintopäiväkirja-tiliisi.</p></Panel>

    <Panel title="Opiskelurytmi ja kapasiteetti">
      <p className="mb-3 text-sm text-muted-foreground">Suunnittelutoiminto käyttää näitä rajoina. Väliin jäänyttä työmäärää ei työnnetä seuraavan päivän kapasiteetin yli.</p>
      <div className="flex flex-wrap gap-2">{weekdayOptions.map(([day,label])=>{const active=(prefs?.study_weekdays??[1,2,3,4,5]).includes(day);return <button key={day} type="button" aria-pressed={active} onClick={()=>void toggleWeekday(day)} className={`grid size-11 place-items-center rounded-xl border text-sm font-semibold ${active?"border-primary bg-accent text-primary":"border-border bg-surface"}`}>{label}</button>;})}</div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><label className="text-sm font-medium">Arki min<input type="number" min="0" max="360" step="10" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2.5" value={weekdayMinCapacity} onChange={e=>setWeekdayMinCapacity(Number(e.target.value))}/></label><label className="text-sm font-medium">Arki max<input type="number" min="15" max="360" step="10" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2.5" value={weekdayCapacity} onChange={e=>setWeekdayCapacity(Number(e.target.value))}/></label><label className="text-sm font-medium">Viikonloppu min<input type="number" min="0" max="480" step="10" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2.5" value={weekendMinCapacity} onChange={e=>setWeekendMinCapacity(Number(e.target.value))}/></label><label className="text-sm font-medium">Viikonloppu max<input type="number" min="15" max="480" step="10" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2.5" value={weekendCapacity} onChange={e=>setWeekendCapacity(Number(e.target.value))}/></label></div>
      <p className="mt-2 text-xs text-muted-foreground">Esimerkiksi arki 30–60 min tarkoittaa: suunnittelutoiminto voi tehdä kevyen 30 min päivän, mutta ei täytä päivää yli 60 minuutin.</p>
      <button className={secondary+" mt-3"} disabled={!prefs||updatePreferences.isPending} onClick={()=>{if(weekdayMinCapacity>weekdayCapacity||weekendMinCapacity>weekendCapacity){toast.error("Minimikapasiteetti ei voi olla maksimia suurempi.");return;}void updatePreferences.mutateAsync({weekday_capacity_min_minutes:Math.max(0,weekdayMinCapacity),weekday_capacity_minutes:Math.max(15,weekdayCapacity),weekend_capacity_min_minutes:Math.max(0,weekendMinCapacity),weekend_capacity_minutes:Math.max(15,weekendCapacity)}).then(()=>toast.success("Kapasiteettivälit tallennettu.")).catch(()=>toast.error("Kapasiteettia ei voitu tallentaa."));}}>Tallenna kapasiteetti</button>
      <div className="mt-5 border-t border-border pt-4"><p className="text-sm font-medium">Kiireiset päivät</p><p className="mt-1 text-xs text-muted-foreground">Kiireisenä päivänä suunnittelutoiminto varaa vain kevyen ylläpitokuorman.</p><div className="mt-3 flex flex-wrap gap-2"><input type="date" className="min-h-11 rounded-xl border bg-surface px-3" value={busyDate} onChange={e=>setBusyDate(e.target.value)}/><button className={secondary} disabled={!prefs||!busyDate} onClick={()=>{if(!prefs||!busyDate)return;const next=[...new Set([...(prefs.busy_dates??[]),busyDate])].sort();void updatePreferences.mutateAsync({busy_dates:next}).then(()=>{setBusyDate("");toast.success("Kiireinen päivä lisätty.");}).catch(()=>toast.error("Päivää ei voitu tallentaa."));}}>Merkitse kiireiseksi</button></div><div className="mt-3 flex flex-wrap gap-2">{(prefs?.busy_dates??[]).filter(d=>d>=today()).slice(0,12).map(date=><button key={date} className="rounded-full bg-muted px-3 py-1 text-xs" title="Poista kiireinen päivä" onClick={()=>prefs&&void updatePreferences.mutateAsync({busy_dates:prefs.busy_dates.filter(d=>d!==date)})}>{fullDate(date)} ×</button>)}</div></div>
    </Panel>

    <Panel title="Mukautuva opiskelu">
      <p className="text-sm text-muted-foreground">Valitse, kuinka paljon suunnittelutoiminto saa tehdä puolestasi. Oppimismoottori saa ehdottaa kaikissa tiloissa, mutta kalenterin muuttaminen noudattaa tätä asetusta.</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {(["manual","assisted","autopilot"] as const).map(mode=><button key={mode} className={(prefs?.planner_mode??"assisted")===mode?button:secondary} onClick={()=>void updatePreferences.mutateAsync({planner_mode:mode}).catch(()=>toast.error("Suunnittelutilaa ei voitu tallentaa."))}>{plannerModeLabel(mode)}</button>)}
      </div>
      <label className="mt-4 flex min-h-12 items-center justify-between gap-4 border-t border-border pt-3"><span><b>Henkilökohtaiset oppimiskokeilut</b><small className="block text-muted-foreground">Vertaa pieniä turvallisia variaatioita vasta myöhemmän muistissa säilymisen perusteella.</small></span><input type="checkbox" className="size-5 accent-primary" checked={prefs?.personal_experiments_enabled??true} onChange={e=>void updatePreferences.mutateAsync({personal_experiments_enabled:e.target.checked}).catch(()=>toast.error("Kokeiluasetusta ei voitu tallentaa."))}/></label>
      <div className="mt-4 divide-y divide-border border-t border-border">
        {([
          ["retention_budget_enabled","Mukautuva kertausbudjetti","Suojaa tärkein muistaminen käytettävissä olevan ajan sisällä."],
          ["pretest_enabled","Ennakkotesti","Kartoita uusi aihe ennakkotestillä, joka ei muuta osaamistasoa."],
          ["feedback_policy_enabled","Mukautuva palaute","Ajoita palaute eri tavalla uuden oppimisen, muistista palauttamisen ja koeharjoituksen mukaan."],
          ["friction_learning_enabled","Opiskelun esteiden tunnistus","Tunnista, miksi opiskelukertoja jää väliin, ja ehdota kevyitä jos–niin-sääntöjä."],
          ["reminder_taper_enabled","Muistutusten vähentäminen","Vähennä tavallisia muistutuksia, kun opiskelu käynnistyy jo itsenäisesti."],
          ["abitti_simulation_enabled","YO / Abitti 2 -vastaavuus","Käytä tehtävävalintaa, lähdeaineistoa, piirrosvastauksia ja viivästettyä palautetta koesimulaatioissa."],
        ] as const).map(([key,label,description])=><label key={key} className="flex min-h-14 items-center justify-between gap-4 py-3"><span><b>{label}</b><small className="block text-muted-foreground">{description}</small></span><input type="checkbox" className="size-5 accent-primary" checked={prefs?.[key]??true} onChange={e=>void updatePreferences.mutateAsync({[key]:e.target.checked}).catch(()=>toast.error("Mukautuva opiskelun asetusta ei voitu tallentaa."))}/></label>)}
      </div>
      <div className="mt-4 grid gap-3 border-t border-border pt-3 sm:grid-cols-2">
        <label className="text-sm font-medium">Hiljaiset tunnit alkavat<input type="time" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2.5" value={prefs?.quiet_hours_start?.slice(0,5)??"21:30"} onChange={e=>void updatePreferences.mutateAsync({quiet_hours_start:e.target.value}).catch(()=>toast.error("Hiljaisia tunteja ei voitu tallentaa."))}/></label>
        <label className="text-sm font-medium">Hiljaiset tunnit päättyvät<input type="time" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2.5" value={prefs?.quiet_hours_end?.slice(0,5)??"07:00"} onChange={e=>void updatePreferences.mutateAsync({quiet_hours_end:e.target.value}).catch(()=>toast.error("Hiljaisia tunteja ei voitu tallentaa."))}/></label>
      </div>
    </Panel>

    <Panel title="Taustamuistutukset" action={<button disabled={pushBusy||!pushSupported()} className={secondary+" !min-h-9"} onClick={()=>void togglePush()}><Bell size={15}/>{pushBusy?"Päivitetään…":pushEnabled?"Poista käytöstä":"Ota käyttöön"}</button>}>
      <p className="text-sm text-muted-foreground">{pushSupported()?pushEnabled?"Taustailmoitukset ovat käytössä tällä laitteella. Muistutukset voivat saapua myös sovelluksen ollessa suljettu.":"Ota taustailmoitukset käyttöön, jos haluat muistutuksia sovelluksen ollessa suljettu.":"Tämä selain ei tue taustailmoituksia."}</p>
      {settings?<div className="mt-4 divide-y divide-border">{notificationOptions.map(([key,label,description])=><label key={key} className="flex min-h-14 items-center justify-between gap-4 py-2"><span><span className="block text-sm font-medium">{label}</span><span className="block text-xs text-muted-foreground">{description}</span></span><input type="checkbox" className="size-5 accent-primary" checked={settings[key]} onChange={e=>void updateSettings.mutateAsync({id:settings.id,[key]:e.target.checked}).catch(()=>toast.error("Ilmoitusasetusta ei voitu tallentaa."))}/></label>)}</div>:<p className="mt-4 text-sm text-muted-foreground">Ilmoitusasetuksia ladataan…</p>}
      <p className="mt-3 text-xs text-muted-foreground">Muistutukset ovat tarkoituksella rauhallisia. Saman aiheen turhaa pommitusta ei lähetetä.</p>
      {pushEnabled&&<button className={secondary+" mt-4 !min-h-9"} onClick={()=>void sendTestPush().then(()=>toast.success("Testimuistutus lähetettiin palvelimelta.")).catch(error=>toast.error(error instanceof Error?error.message:"Testimuistutus epäonnistui."))}>Lähetä testimuistutus</button>}
    </Panel>

    <Panel title="Ulkoasu"><label className="flex min-h-11 items-center justify-between">Tumma tila<input type="checkbox" className="size-5 accent-primary" checked={dark} onChange={e=>{const next=e.target.checked;setDark(next);localStorage.setItem("opk.theme",next?"dark":"light");applyTheme(next);}}/></label></Panel>

    {archived.length>0&&<Panel title="Arkistoidut kurssit">{archived.map(c=><div key={c.id} className="flex min-h-12 items-center justify-between gap-3 border-b border-border"><span><b>{c.code}</b> · {c.name}</span><button className={secondary+" !min-h-9"} onClick={()=>void archiveCourse.mutateAsync({id:c.id,archived:false}).then(()=>toast.success("Kurssi palautettu.")).catch(()=>toast.error("Palautus epäonnistui."))}>Palauta</button></div>)}</Panel>}

    <Panel title="Laite"><p className="mb-3 text-sm text-muted-foreground">Normaalisti kirjautumista ei enää kysytä tällä selaimella. Tämän painikkeen käyttö poistaa muistamisen ja paikallisen istunnon, mutta Arthur-tili ja opiskelutiedot säilyvät palvelimella.</p><button className={secondary} onClick={async()=>{if(!window.confirm("Unohdetaanko tämä laite?"))return;clearDeviceSession();location.reload();}}><RotateCcw size={16}/>Unohda tämä laite</button></Panel>
  </div>;
}
