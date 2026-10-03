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

export function ExamsView({courses,topics,exams,tests,attempts,mistakes,sessions,plan,capacity,onCourse,onPractice,initialExamId,onExamChange}:Base&{exams:Exam[];tests:PracticeTest[];attempts:PracticeAttempt[];mistakes:Mistake[];sessions:Session[];plan:PlanItem[];capacity:CapacityProfile;onCourse:(id:string)=>void;onPractice:(courseId:string,topicId?:string)=>void;initialExamId?:string | undefined;onExamChange?:(id:string|null)=>void}) {
  const [adding,setAdding]=useState(false),[selectedExam,setSelectedExam]=useState<string|null>(initialExamId??null);
  useEffect(()=>setSelectedExam(initialExamId??null),[initialExamId]);
  const chooseExam=(id:string|null)=>{setSelectedExam(id);onExamChange?.(id);};
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
    const buffer=course?.exam_date?examBuffer({examDate:course.exam_date,topics:ts,attempts:aa,capacity}):null;
    const topicStates=ts.map(topic=>({topic,state:deriveTopicLearningState(topic,aa,{examDate:course?.exam_date??null})}));
    const missing=topicStates.filter(row=>row.topic.progress<100||row.state.masteryLevel<3).sort((a,b)=>a.state.masteryLevel-b.state.masteryLevel||b.topic.importance-a.topic.importance);
    const reviews=buildRecoveryQueue({topics:ts,attempts:aa,courses:course?[course]:[],now:today(),capacityMinutes:capacityForDateV3(capacity,today()),maxItems:10}).items;
    const studyMinutes=ss.reduce((sum,s)=>sum+s.minutes,0);
    const v4TopicStates=ts.map(topic=>({topic,model:masteryModelV4(topic,aa,{examDate:selected.date})}))
      .sort((a,b)=>b.topic.importance-a.topic.importance||a.model.level-b.model.level);
    const finalTwoDays=diffDays(selected.date,today())<=2;
    const plannedTopicId=pp.find(item=>item.topic_id)?.topic_id??null;
    const plannedTopic=plannedTopicId?ts.find(topic=>topic.id===plannedTopicId)??null:null;
    const recommendedTopic=plannedTopic??reviews[0]?.topic??missing[0]?.topic??null;
    const recommendationReason=plannedTopic
      ?"Tämä aihe on seuraavana nykyisessä koesuunnitelmassa."
      :reviews[0]?.topic
        ?reviews[0].reason
        :missing[0]?.topic
          ?"Tässä aiheessa on tärkein nykyinen osaamisaukko ennen koetta."
          :"Yksittäistä selvää osaamisaukkoa ei juuri nyt ole. Seuraava hyödyllinen askel on koesimulaatio.";
    return <LibraryDetailLayout className="exams-view space-y-5">
      <button className={secondary} onClick={()=>chooseExam(null)}><ChevronLeft size={17}/>Kaikki kokeet</button>
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
      <Panel title="Seuraavaksi kannattaa tehdä">
        {recommendedTopic?<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">{course?.code} · {recommendedTopic.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{recommendationReason}</p>
          </div>
          <button className={button} onClick={()=>onPractice(selected.course_id,recommendedTopic.id)}>Harjoittele tätä</button>
        </div>:<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Tee koeharjoitus</p>
            <p className="mt-1 text-sm text-muted-foreground">{recommendationReason}</p>
          </div>
          <button className={button} onClick={()=>document.querySelector(".exam-simulation")?.scrollIntoView({behavior:"smooth",block:"start"})}>Avaa koeharjoitus</button>
        </div>}
      </Panel>
      <details className="rounded-2xl border border-border bg-surface p-4">
        <summary className="min-h-11 cursor-pointer list-none py-2 text-sm font-semibold">Näytä koemoodin vaiheet</summary>
        <div className="mt-3">
      <Panel title="Koemoodin vaiheet">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{prep.stages.map((phase,index)=><div key={phase.key} className={`rounded-xl p-3 ${index===prep.index?"bg-accent ring-1 ring-primary/40":"bg-muted/60"}`}><div className="flex items-center justify-between gap-2"><p className="font-medium">{index+1}. {phase.label}</p><span className={`text-xs font-semibold ${phase.done?"text-primary":"text-muted-foreground"}`}>{phase.done?"Valmis":index===prep.index?"Nyt":"Tulossa"}</span></div><p className="mt-1 text-xs text-muted-foreground">{phase.description}</p></div>)}</div>
        <p className="mt-3 text-xs text-muted-foreground">Järjestys ei ole jäykkä lukko. Harjoittelutila mukauttaa kysymystyypit tähän vaiheeseen.</p>{buffer&&<div className="mt-4 rounded-xl border border-border p-3 text-sm"><b>Koetta edeltävä aikataulu</b><p className="mt-1 text-muted-foreground">Sisältökierros viimeistään {fullDate(buffer.contentDeadline)} · vaihteleva harjoittelu {fullDate(buffer.mixedDate)} · simulaatio {fullDate(buffer.simulationDate)} · virheiden korjaus {fullDate(buffer.repairDate)} · kevyt päivä {fullDate(buffer.lightDate)}</p></div>}
      </Panel>
        </div>
      </details>
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
    </LibraryDetailLayout>;
  }
  return <LibraryDetailLayout className="exams-view exam-list space-y-4">
  {yo.enabled&&<Panel title="YO-tila">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><div><small className="text-muted-foreground">Vaihe</small><p className="font-semibold">{yoPhaseLabel(yo.phase)}</p></div><div><small className="text-muted-foreground">Vakaat</small><p className="text-xl font-semibold">{yo.stable}</p></div><div><small className="text-muted-foreground">Riskissä</small><p className="text-xl font-semibold">{yo.atRisk}</p></div><div><small className="text-muted-foreground">Arvioimatta</small><p className="text-xl font-semibold">{yo.unassessed}</p></div></div>
    {yo.daysToNearestExam!==null&&<p className="mt-3 text-sm text-muted-foreground">{yo.daysToNearestExam} päivää lähimpään YO-kokeeseen. Kurssikoe- ja YO-logiikka pidetään erillään.</p>}
    <div className="mt-3 space-y-2">{yo.priorities.slice(0,5).map(row=><button key={row.course.id+row.topic.id} className="flex min-h-12 w-full items-center justify-between rounded-xl bg-muted/60 px-3 text-left" onClick={()=>onCourse(row.course.id)}><span><b>{row.course.code} · {row.topic.name}</b><small className="mt-1 block text-muted-foreground">{row.reason}</small></span></button>)}</div>
  </Panel>}
  <ExamSimulationV5 courses={courses} topics={topics}/>
  <button className={button} onClick={()=>setAdding(true)}>+ Lisää koe</button>{adding&&<ExamForm courses={courses} onClose={()=>setAdding(false)}/>}
  {exams.length===0?<Panel title="Ei kokeita vielä"><p className="text-muted-foreground">Lisää ensimmäinen koe painamalla Lisää koe.</p></Panel>:exams.map(e=>{const course=courses.find(c=>c.id===e.course_id);const ts=topics.filter(t=>t.course_id===e.course_id);const prep=examStage({topics:ts,attempts:attempts.filter(a=>a.course_id===e.course_id),tests:tests.filter(t=>t.course_id===e.course_id),mistakes:mistakes.filter(m=>m.course_id===e.course_id),course:course??null});const mode=examMode(e.date);return <button key={e.id} onClick={()=>chooseExam(e.id)} className="panel block w-full p-4 text-left sm:p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-primary">{course?.code}</p><h2 className="mt-1 text-lg font-semibold">{e.name}</h2><p className="mt-1 text-sm text-muted-foreground">{fullDate(e.date)} · {diffDays(e.date,today())} päivää</p></div><span className="text-right"><b className="block">{prep.stages[prep.index]?.label}</b><small className="text-muted-foreground">vaihe {prep.index+1}/6</small></span></div>{mode.active&&<p className="mt-2 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold">Koemoodi aktiivinen</p>}<p className="mt-2 text-xs text-muted-foreground">Ei arvosanaennuste · avaa kokeen yksityiskohdat</p></button>})}</LibraryDetailLayout>;
}
