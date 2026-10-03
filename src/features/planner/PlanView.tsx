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
import { addDays, addMonths, dateWithWeekday, diffDays, fullDate, minutes, shortDate, startOfWeek, today, weekNumber } from "@/lib/fi";
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
import { Dialog, input as dialogInput } from "@/features/shared/DialogPrimitives";

const skipReasonOptions = [
  ["no_time", "Ei aikaa"],
  ["forgot", "Unohdin"],
  ["too_tired", "Liian väsynyt"],
  ["too_hard", "Liian vaikea"],
  ["unclear_start", "En tiennyt mistä aloittaa"],
  ["plans_changed", "Suunnitelmat muuttuivat"],
  ["other", "Muu syy"],
] as const;
type SkipReason = (typeof skipReasonOptions)[number][0];

export function PlanView({courses,topics,plan,tests,mistakes,attempts,capacity,onStart,initialMode="viikko",initialAnchor,onPeriodChange}:Base&{plan:PlanItem[];tests:PracticeTest[];mistakes:Mistake[];attempts:PracticeAttempt[];capacity:CapacityProfile;onStart:(id:string)=>void;initialMode?:("päivä"|"viikko"|"kuukausi") | undefined;initialAnchor?:string | undefined;onPeriodChange?:(mode:"päivä"|"viikko"|"kuukausi",anchor:string)=>void}) {
  const preferences=usePreferences();
  const intentions=useImplementationIntentions();
  const frictionHistory=useFrictionEvents();
  const plannerMode=preferences.data?.planner_mode??"assisted";
  const [mode,setMode]=useState<"päivä"|"viikko"|"kuukausi">(initialMode),[anchor,setAnchor]=useState(initialAnchor??today()),[creating,setCreating]=useState(false),[adding,setAdding]=useState(false),[choice,setChoice]=useState(courses[0]?.id??"");
  const [proposal,setProposal]=useState<PlanDraft[]|null>(null),[editingProposal,setEditingProposal]=useState(false);
  const [shiftTarget,setShiftTarget]=useState<PlanItem|null>(null),[shiftDate,setShiftDate]=useState("");
  const [skipTarget,setSkipTarget]=useState<PlanItem|null>(null),[skipReason,setSkipReason]=useState<SkipReason>("no_time");
  const move=useMovePlanItem(),status=usePlanStatus(),generate=useGeneratePlan(),friction=useCreateFrictionEvent();
  const first=mode==="viikko"?startOfWeek(anchor):mode==="kuukausi"?anchor.slice(0,7)+"-01":anchor;
  const last=mode==="viikko"?addDays(first,6):mode==="kuukausi"?addDays(addDays(first,32).slice(0,7)+"-01",-1):anchor;
  const days=Array.from({length:Math.max(1,diffDays(last,first)+1)},(_,i)=>addDays(first,i));
  const selectedCourse=courses.find(x=>x.id===choice);
  const selectedMode=examMode(selectedCourse?.exam_date??null);
  useEffect(()=>{setMode(initialMode);},[initialMode]);
  useEffect(()=>{if(initialAnchor)setAnchor(initialAnchor);},[initialAnchor]);
  const changePeriod=(nextMode:"päivä"|"viikko"|"kuukausi",nextAnchor:string)=>{
    setMode(nextMode);setAnchor(nextAnchor);onPeriodChange?.(nextMode,nextAnchor);
  };

  const movePeriod=(direction:-1|1)=>{
    const next=mode==="kuukausi"
      ? addMonths(anchor,direction)
      : addDays(anchor,direction*(mode==="päivä"?1:7));
    changePeriod(mode,next);
  };
  function requestShift(p:PlanItem){setShiftTarget(p);setShiftDate(p.date);}
  async function confirmShift(){
    if(!shiftTarget||!/^\d{4}-\d{2}-\d{2}$/.test(shiftDate))return;
    try{
      await move.mutateAsync({id:shiftTarget.id,date:shiftDate,from:shiftTarget.date,expected_updated_at:shiftTarget.updated_at});
      setShiftTarget(null);
      toast.success("Tehtävä siirretty.");
    }catch(error){toast.error(isPlanSyncConflict(error)?"Tehtävää muutettiin toisella laitteella. Uusin versio ladattiin.":"Siirto epäonnistui.");}
  }
  function requestSkip(p:PlanItem){setSkipTarget(p);setSkipReason("no_time");}
  async function confirmSkip(){
    if(!skipTarget)return;
    try{
      await status.mutateAsync({id:skipTarget.id,status:"skipped",expected_updated_at:skipTarget.updated_at});
      void friction.mutateAsync({date:today(),plan_item_id:skipTarget.id,course_id:skipTarget.course_id,reason:skipReason,self_started:false,reminder_used:false}).catch(()=>undefined);
      setSkipTarget(null);
      toast.success("Tehtävä ohitettu. Suunnitelma mukautuu ilman lisävelkaa.");
    }catch(error){toast.error(isPlanSyncConflict(error)?"Tehtävää muutettiin toisella laitteella. Uusin versio ladattiin.":"Muutos epäonnistui.");}
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

  return <><PlannerLayout className="planner-view flex flex-col gap-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-1"><button className={secondary+" !px-3"} aria-label="Edellinen" onClick={()=>movePeriod(-1)}><ChevronLeft size={18}/></button><span className="min-w-28 text-center text-sm">{fullDate(first)}{first!==last&&` – ${fullDate(last)}`}</span><button className={secondary+" !px-3"} aria-label="Seuraava" onClick={()=>movePeriod(1)}><ChevronRight size={18}/></button></div><div className="flex gap-1 rounded-xl bg-muted p-1">{(["päivä","viikko","kuukausi"] as const).map(m=><button key={m} aria-pressed={mode===m} onClick={()=>changePeriod(m,anchor)} className={`min-h-11 rounded-lg px-3 capitalize ${mode===m?"bg-surface shadow-sm":""}`}>{m}</button>)}</div></div>
    <div className="flex flex-wrap gap-2"><button className={secondary} onClick={()=>setCreating(v=>!v)}><Plus size={17}/>Luo suunnitelma</button><button className={secondary} onClick={()=>setAdding(true)}>Lisää tehtävä</button></div>
    <details className="planner-support panel p-4 sm:p-5">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-semibold">
        <span>Suunnittelun tila</span>
        <span className="text-xs font-normal text-muted-foreground">Perustelut ja kuormitus</span>
      </summary>
      <div className="mt-4">
        <V5PlannerPanel courses={courses} topics={topics} attempts={attempts} capacity={capacity} plan={plan}/>
      </div>
    </details>
    {adding&&<TaskForm courses={courses} topics={topics} date={anchor} onClose={()=>setAdding(false)}/>}
    {creating&&<Panel title="Adaptiivinen suunnitelma koetta varten">
      <p className="mb-3 text-sm text-muted-foreground">Suunnitelma huomioi tärkeyden, esitiedot, varmistetun osaamisen, ajankohtaiset kertaukset, virhepankin, koulun etenemisen, 14 päivän koemoodin ja muiden kurssien saman päivän kuorman. Tila: <b>{plannerModeLabel(plannerMode)}</b>. Lisäharjoittelu on vapaaehtoista eikä muutu velaksi.</p>
      <select aria-label="Kurssi" value={choice} onChange={e=>setChoice(e.target.value)} className="w-full rounded-xl border bg-surface p-3">{courses.map(c=><option key={c.id} value={c.id}>{c.code} · {c.name}</option>)}</select>
      {selectedMode.active&&<p className="mt-3 rounded-xl bg-accent p-3 text-sm">Koemoodi on aktiivinen: {selectedMode.days} päivää kokeeseen. Uusi sisältö väistyy koetason harjoittelun, virheiden ja kertauksen tieltä.</p>}
      <button disabled={generate.isPending} className={button+" mt-3"} onClick={()=>void makeProposal()}>{plannerMode==="autopilot"?"Mukauta suunnitelma nyt":"Luo ehdotus"}</button>
      {proposal&&<div className="mt-4 rounded-2xl border border-border p-4">
        <div className="flex items-center justify-between gap-3"><div><p className="font-semibold">Ehdotan muutosta suunnitelmaan</p><p className="text-sm text-muted-foreground">Mikään ei muutu ennen hyväksyntää. Kapasiteettirajat pidetään voimassa myös muokkauksen jälkeen.</p></div><span className="text-sm">{proposal.filter(p=>p.kind!=="exam").length} opiskelukertaa</span></div>
        <div className="mt-3 max-h-72 space-y-2 overflow-y-auto">{proposal.filter(p=>p.kind!=="exam").slice(0,18).map((p,i)=><div key={i} className="grid gap-2 rounded-xl bg-muted/60 p-3 text-sm sm:grid-cols-[1fr_auto_auto] sm:items-center"><span>{p.title}</span>{editingProposal?<><input aria-label={"Päivä: "+p.title} type="date" className="min-h-11 rounded-lg border bg-surface px-2" value={p.date} onChange={e=>setProposal(current=>current?.map(item=>item===p?{...item,date:e.target.value}:item)??null)}/><input aria-label={"Minuutit: "+p.title} type="number" min={p.min_minutes} max="240" step="5" className="min-h-11 w-24 rounded-lg border bg-surface px-2" value={p.target_minutes} onChange={e=>setProposal(current=>current?.map(item=>item===p?{...item,target_minutes:Math.max(item.min_minutes,Number(e.target.value)||item.min_minutes)}:item)??null)}/></>:<><span>{fullDate(p.date)}</span><span className="whitespace-nowrap text-muted-foreground">{minutes(p.target_minutes)}</span></>}</div>)}</div>
        <div className="mt-4 flex flex-wrap gap-2"><button disabled={generate.isPending} className={button} onClick={()=>void acceptProposal()}>Hyväksy</button><button className={secondary} onClick={()=>setEditingProposal(value=>!value)}>{editingProposal?"Valmis muokkauksesta":"Muokkaa"}</button><button className={secondary} onClick={()=>{setProposal(null);setEditingProposal(false);}}>Pidä nykyinen</button></div>
      </div>}
    </Panel>}
    {plan.length===0&&<Panel title="Ei tehtäviä vielä"><p className="text-muted-foreground">Luo ensimmäinen suunnitelma tai lisää tehtävä itse.</p></Panel>}
    <PlannerCalendar
      mode={mode}
      days={days}
      plan={plan}
      courses={courses}
      topics={topics}
      onStart={onStart}
      onMove={(item,date)=>void move.mutateAsync({id:item.id,date,from:item.date,expected_updated_at:item.updated_at}).then(()=>toast.success("Tehtävä siirretty.")).catch(error=>toast.error(isPlanSyncConflict(error)?"Tehtävää muutettiin toisella laitteella. Uusin versio ladattiin.":"Siirto epäonnistui."))}
      onShift={requestShift}
      onSkip={requestSkip}
    />
  </PlannerLayout>
  {shiftTarget&&<Dialog title="Siirrä tehtävä" onClose={()=>setShiftTarget(null)}>
    <label className="block text-sm font-medium">Uusi päivä
      <input type="date" value={shiftDate} onChange={event=>setShiftDate(event.target.value)} className={dialogInput}/>
    </label>
    <div className="mt-5 flex justify-end gap-2">
      <button className={secondary} onClick={()=>setShiftTarget(null)}>Peruuta</button>
      <button className={button} disabled={!/^\d{4}-\d{2}-\d{2}$/.test(shiftDate)||move.isPending} onClick={()=>void confirmShift()}>{move.isPending?"Siirretään…":"Siirrä"}</button>
    </div>
  </Dialog>}
  {skipTarget&&<Dialog title="Miksi jätät tämän väliin?" onClose={()=>setSkipTarget(null)}>
    <div className="grid gap-2">
      {skipReasonOptions.map(([value,label])=><button key={value} type="button" aria-pressed={skipReason===value} onClick={()=>setSkipReason(value)} className={"min-h-11 rounded-xl border px-4 text-left text-sm "+(skipReason===value?"border-primary bg-accent font-semibold":"border-border bg-surface")}>{label}</button>)}
    </div>
    <p className="mt-4 text-sm text-muted-foreground">Ohitus ei muutu lisävelaksi. Syy auttaa sovellusta tekemään seuraavasta suunnitelmasta realistisemman.</p>
    <div className="mt-5 flex justify-end gap-2">
      <button className={secondary} onClick={()=>setSkipTarget(null)}>Peruuta</button>
      <button className={button} disabled={status.isPending} onClick={()=>void confirmSkip()}>{status.isPending?"Tallennetaan…":"Ohita tältä päivältä"}</button>
    </div>
  </Dialog>}
  </>;
}
