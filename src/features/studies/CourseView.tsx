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

export type CourseTab = "Yleiskuva"|"Sisältö"|"Historia"|"Analyysi";

export function CourseView({courses,topics,sessions,exams,plan,tests,mistakes,selected,onSelect,onAdd,onStart,initialTab="Yleiskuva",onTabChange}:Base&{sessions:Session[];exams:Exam[];plan:PlanItem[];tests:PracticeTest[];mistakes:Mistake[];selected:string|null;onSelect:(id:string|null)=>void;onAdd:()=>void;onStart:()=>void;initialTab?:CourseTab | undefined;onTabChange?:(tab:CourseTab)=>void}) {
  const [tab,setTab]=useState<CourseTab>(initialTab),[form,setForm]=useState<"mistake"|"test"|"course"|"newTopic"|null>(null),[editingTopic,setEditingTopic]=useState<Topic|null>(null);
  useEffect(()=>setTab(initialTab),[initialTab]);
  const changeTab=(next:CourseTab)=>{setTab(next);onTabChange?.(next);};
  const archiveCourse=useArchiveCourse(),updateTopic=useUpdateTopic(),advanceMistake=useAdvanceMistake();
  const c=courses.find(x=>x.id===selected);
  if(!c)return <LibraryDetailLayout className="course-list">
    <div className="course-library-header">
      <div>
        <p className="text-sm text-muted-foreground">Kurssit ja niiden osaaminen</p>
        <h2 className="mt-1 text-xl font-semibold">Käynnissä olevat opinnot</h2>
      </div>
      <button className={button} onClick={onAdd}>+ Lisää kurssi</button>
    </div>
    <div className="course-library-rows">{courses.map(course=>{const ts=topics.filter(t=>t.course_id===course.id),ss=sessions.filter(s=>s.course_id===course.id),next=plan.find(p=>p.course_id===course.id&&p.status==="planned"&&p.date>=today());return <button key={course.id} onClick={()=>onSelect(course.id)} className="course-row panel block w-full p-4 text-left hover:ring-1 hover:ring-primary sm:p-5"><div className="flex justify-between gap-3"><div className="min-w-0"><b className="text-primary">{course.code}</b><h2 className="mt-1 truncate text-lg font-semibold sm:text-xl">{course.name}</h2><p className="mt-1 text-sm text-muted-foreground">{minutes(ss.reduce((a,s)=>a+s.minutes,0))} · {next?.title||ts.find(t=>t.progress<100)?.name||"Ei seuraavaa aihetta"}</p></div><b>{weightedCoverage(ts)} %</b></div><div className="mt-3"><Bar value={weightedCoverage(ts)}/></div></button>})}</div></LibraryDetailLayout>;

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

  return <LibraryDetailLayout className="course-detail course-detail-split">
    <aside className="course-detail-sidebar" aria-label="Kurssit">
      <div className="course-detail-sidebar-title">Opinnot</div>
      {courses.map(course=>{
        const courseTopics=topics.filter(topic=>topic.course_id===course.id);
        return <button key={course.id} className={"course-detail-sidebar-row "+(course.id===c.id?"course-detail-sidebar-row-active":"")} onClick={()=>onSelect(course.id)}>
          <span><b>{course.code}</b><small>{course.name}</small></span>
          <span>{weightedCoverage(courseTopics)} %</span>
        </button>;
      })}
    </aside>
    <div className="course-detail-main space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-2"><button className={secondary} onClick={()=>onSelect(null)}><ChevronLeft size={17}/>Kaikki kurssit</button><div className="flex gap-2"><button className={secondary} onClick={()=>setForm("course")}><Pencil size={16}/>Muokkaa</button><button className={secondary} onClick={async()=>{if(!window.confirm("Arkistoidaanko tämä kurssi?"))return;try{await archiveCourse.mutateAsync({id:c.id,archived:true});toast.success("Kurssi arkistoitu.");onSelect(null);}catch{toast.error("Arkistointi epäonnistui.");}}}><Archive size={16}/>Arkistoi</button></div></div>
    <section className="course-hero">
      <div>
        <p className="text-sm font-semibold text-primary">{c.code}</p>
        <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">{c.name}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{mastery.label} · {weightedCoverage(ts)} % sisällöstä käsitelty</p>
      </div>
      <button className={button} onClick={onStart}>Jatka opiskelua</button>
    </section>
    <div role="tablist" aria-label="Kurssin osiot" className="flex gap-1 overflow-x-auto rounded-xl bg-muted p-1">{(["Yleiskuva","Sisältö","Historia","Analyysi"] as CourseTab[]).map(name=><button key={name} role="tab" aria-selected={tab===name} onClick={()=>changeTab(name)} className={`min-h-11 min-w-max flex-1 rounded-lg px-3 text-sm ${tab===name?"bg-surface font-medium shadow-sm":""}`}>{name}</button>)}</div>

    {tab==="Yleiskuva"&&<div className="course-overview grid gap-4 lg:grid-cols-2">
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
    </div>
  </LibraryDetailLayout>;
}
