import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
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
import type { Course, Exam, Mistake, PlanItem, PracticeTest, Session, Topic } from "@/lib/domain";
import {
  corridor,
  corridorAdvice,
  courseBuffers,
  effectivePlanStatus,
  examMode,
  generatePlan,
  masteryMismatch,
  rankTodayTasks,
  readiness,
  reviewDebt,
  risks,
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
  useAdvanceMistake,
  useGeneratePlan,
  useMovePlanItem,
  usePlanStatus,
  usePreferences,
  useProgressEvents,
  useSettings,
  useResolveMistake,
  useUpdatePreferences,
  useUpdateSettings,
  useUpdateTopic,
  useUpsertWeeklyCheckin,
  useWeeklyCheckins,
} from "@/lib/data";
import { addDays, dateWithWeekday, diffDays, fullDate, minutes, startOfWeek, today, weekNumber } from "@/lib/fi";
import { supabase } from "@/integrations/supabase/client";
import { disableBackgroundPush, enableBackgroundPush, pushIsEnabledOnDevice, pushSupported, sendTestPush } from "@/lib/push";
import { applyTheme, storedThemeIsDark } from "@/lib/theme";
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

export function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return <section className="panel p-4 sm:p-6"><div className="mb-3 flex items-center justify-between gap-3 sm:mb-4"><h2 className="text-base font-semibold sm:text-lg">{title}</h2>{action}</div>{children}</section>;
}
function Bar({ value }: { value: number }) {
  const v=Math.max(0,Math.min(100,value));
  return <div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-primary" style={{width:`${v}%`}}/></div>;
}
type Base = {courses:Course[];topics:Topic[]};

export function TodayView({courses,topics,sessions,exams,plan,tests,mistakes,onStart,onGo}:Base&{
  sessions:Session[];exams:Exam[];plan:PlanItem[];tests:PracticeTest[];mistakes:Mistake[];
  onStart:(id:string)=>void;onGo:(page:"plan"|"exams")=>void
}) {
  const now=today();
  const items=rankTodayTasks({
    items:plan.filter(p=>p.date===now&&p.status==="planned"&&p.kind!=="exam"),
    courses,topics,mistakes,tests,now,
  });
  const next=items[0];
  const upcoming=exams.filter(e=>e.date>=now).sort((a,b)=>a.date.localeCompare(b.date))[0];
  const goal=courses.reduce((a,c)=>a+c.weekly_minutes,0), done=weekMinutes(sessions,now), last=sessions.find(s=>s.note||s.unclear);
  const due=reviewDebt(topics,now);
  const examCourse=upcoming?courses.find(c=>c.id===upcoming.course_id):undefined;
  const mode=examMode(upcoming?.date??null,now);
  const examTopics=examCourse?topics.filter(t=>t.course_id===examCourse.id):[];
  const examReady=examCourse?readiness({topics:examTopics,tests:tests.filter(t=>t.course_id===examCourse.id),mistakes:mistakes.filter(m=>m.course_id===examCourse.id)}):0;
  const openMistakes=examCourse?mistakes.filter(m=>m.course_id===examCourse.id&&m.status!=="mastered").length:0;

  return <div className="space-y-3 sm:space-y-5">
    {mode.active&&examCourse&&<Panel title={mode.finalStretch?"Koemoodi · loppusuora":"Koemoodi · 14 päivää"}>
      <div className="grid gap-4 sm:grid-cols-3">
        <div><p className="text-sm text-muted-foreground">{examCourse.code}</p><p className="text-2xl font-semibold">{mode.days} pv</p><p className="text-sm text-muted-foreground">kokeeseen</p></div>
        <div><p className="text-sm text-muted-foreground">Valmistautuminen</p><p className="text-2xl font-semibold">{examReady} %</p><Bar value={examReady}/></div>
        <div><p className="text-sm text-muted-foreground">Avoimet virheet</p><p className="text-2xl font-semibold">{openMistakes}</p><p className="text-sm text-muted-foreground">{mode.finalStretch?"Pidä kuorma kevyenä.":"Painota koetason tehtäviä ja kertausta."}</p></div>
      </div>
    </Panel>}

    <Panel title="Seuraava tehtävä">{next?<><p className="text-sm font-medium text-primary">{courses.find(c=>c.id===next.course_id)?.code} · {minutes(next.target_minutes)}</p><h3 className="mt-2 text-2xl font-semibold">{next.title||topics.find(t=>t.id===next.topic_id)?.name||"Opiskelu"}</h3><p className="mt-2 text-sm text-muted-foreground">Valinta painottaa koetta, kertausvelkaa, avoimia virheitä, osaamisen tasoa ja koulun etenemistä.</p><button className={button+" mt-5"} onClick={()=>onStart(next.id)}>Aloita opiskelu</button></>:<><p className="font-medium">Ei itsenäistä opiskelua tänään.</p><p className="mt-2 text-sm text-muted-foreground">Suunnitelma ei vaadi tälle päivälle omaa sessiota. Lepo ei muutu velaksi.</p><button className={secondary+" mt-4"} onClick={()=>onGo("plan")}>Avaa suunnitelma</button></>}</Panel>

    {due.count>0&&<Panel title="Kertausvelka" action={<span className="text-sm font-semibold text-primary">{due.count} aihetta</span>}>
      <div className="space-y-2">{due.due.slice(0,5).map(t=><div key={t.id} className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 p-3"><span><b>{courses.find(c=>c.id===t.course_id)?.code}</b> · {t.name}</span><span className="text-xs text-muted-foreground">{t.next_review?fullDate(t.next_review):""}</span></div>)}</div>
      <p className="mt-3 text-sm text-muted-foreground">Kertauspaine {due.pressure} %. Adaptiivinen suunnitelma nostaa nämä aiheet automaattisesti etusijalle.</p>
    </Panel>}

    {items.length>1&&<Panel title="Myöhemmin tänään">{items.slice(1,4).map(p=><button key={p.id} onClick={()=>onStart(p.id)} className="flex min-h-14 w-full items-center justify-between border-t border-border text-left"><span><b className="mr-2 text-primary">{courses.find(c=>c.id===p.course_id)?.code}</b>{p.title}</span><span className="text-sm text-muted-foreground">{minutes(p.target_minutes)}</span></button>)}</Panel>}

    <div className="grid grid-cols-2 gap-3 lg:grid-cols-2 lg:gap-5">
      <Panel title="Viikon tavoite"><p className="mb-2 text-xl font-semibold sm:mb-3 sm:text-2xl">{minutes(done)} <span className="text-sm font-normal text-muted-foreground sm:text-base">/ {minutes(goal)}</span></p><Bar value={goal?done/goal*100:0}/><p className="mt-2 text-xs leading-5 text-muted-foreground sm:mt-3 sm:text-sm">{Math.max(0,goal-done)?`${minutes(Math.max(0,goal-done))} jäljellä.`:"Tavoite täynnä."}</p></Panel>
      <Panel title="Tärkeää">{upcoming?<><p className="text-sm font-medium sm:text-base">{courses.find(c=>c.id===upcoming.course_id)?.code} · {upcoming.name}</p><p className="mt-1 text-xs leading-5 text-muted-foreground sm:mt-2 sm:text-base">{fullDate(upcoming.date)} · {diffDays(upcoming.date,now)} pv</p><button className="mt-2 text-xs font-medium text-primary underline sm:mt-3 sm:text-sm" onClick={()=>onGo("exams")}>Katso kokeet</button></>:<p className="text-sm text-muted-foreground">Ei lähestyviä kokeita.</p>}</Panel>
    </div>
    {last&&<Panel title="Viimeisin huomio"><p className="text-muted-foreground">{last.note||last.unclear}</p><p className="mt-3 text-xs text-muted-foreground">{fullDate(last.date)} · {courses.find(c=>c.id===last.course_id)?.code}</p></Panel>}
  </div>;
}

export function PlanView({courses,topics,plan,tests,mistakes,studyWeekdays,onStart}:Base&{plan:PlanItem[];tests:PracticeTest[];mistakes:Mistake[];studyWeekdays:number[];onStart:(id:string)=>void}) {
  const [mode,setMode]=useState<"päivä"|"viikko"|"kuukausi">("viikko"),[anchor,setAnchor]=useState(today()),[creating,setCreating]=useState(false),[adding,setAdding]=useState(false),[choice,setChoice]=useState(courses[0]?.id??"");
  const move=useMovePlanItem(),status=usePlanStatus(),generate=useGeneratePlan();
  const first=mode==="viikko"?startOfWeek(anchor):mode==="kuukausi"?anchor.slice(0,7)+"-01":anchor;
  const last=mode==="viikko"?addDays(first,6):mode==="kuukausi"?addDays(addDays(first,32).slice(0,7)+"-01",-1):anchor;
  const days=Array.from({length:Math.max(1,diffDays(last,first)+1)},(_,i)=>addDays(first,i));
  const selectedCourse=courses.find(x=>x.id===choice);
  const selectedMode=examMode(selectedCourse?.exam_date??null);

  async function shift(p:PlanItem){const date=prompt("Uusi päivä (VVVV-KK-PP)",p.date);if(!date||!/^\d{4}-\d{2}-\d{2}$/.test(date))return;try{await move.mutateAsync({id:p.id,date,from:p.date});toast.success("Tehtävä siirretty.");}catch{toast.error("Siirto epäonnistui.");}}
  async function make(){
    const c=courses.find(x=>x.id===choice);
    if(!c?.exam_date){toast.error("Kurssilla ei ole koepäivää.");return;}
    const drafts=generatePlan({
      course:c,
      topics:topics.filter(t=>t.course_id===c.id),
      examDate:c.exam_date,
      studyWeekdays,
      weeklyMinutes:c.weekly_minutes,
      mistakes:mistakes.filter(m=>m.course_id===c.id),
      tests:tests.filter(t=>t.course_id===c.id),
    });
    if(!drafts.length){toast.error("Koe on jo mennyt.");return;}
    try{await generate.mutateAsync({courseId:c.id,drafts});setCreating(false);toast.success("Adaptiivinen suunnitelma luotu.");}catch{toast.error("Suunnitelmaa ei voitu tallentaa.");}
  }

  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-1"><button className={secondary+" !px-3"} aria-label="Edellinen" onClick={()=>setAnchor(addDays(anchor,mode==="päivä"?-1:mode==="viikko"?-7:-30))}><ChevronLeft size={18}/></button><span className="min-w-28 text-center text-sm">{fullDate(first)}{first!==last&&` – ${fullDate(last)}`}</span><button className={secondary+" !px-3"} aria-label="Seuraava" onClick={()=>setAnchor(addDays(anchor,mode==="päivä"?1:mode==="viikko"?7:30))}><ChevronRight size={18}/></button></div><div className="flex gap-1 rounded-xl bg-muted p-1">{(["päivä","viikko","kuukausi"] as const).map(m=><button key={m} aria-pressed={mode===m} onClick={()=>setMode(m)} className={`min-h-10 rounded-lg px-3 capitalize ${mode===m?"bg-surface shadow-sm":""}`}>{m}</button>)}</div></div>
    <div className="flex flex-wrap gap-2"><button className={secondary} onClick={()=>setCreating(v=>!v)}><Plus size={17}/>Luo suunnitelma</button><button className={secondary} onClick={()=>setAdding(true)}>Lisää tehtävä</button></div>
    {adding&&<TaskForm courses={courses} topics={topics} date={anchor} onClose={()=>setAdding(false)}/>}
    {creating&&<Panel title="Adaptiivinen suunnitelma koetta varten">
      <p className="mb-3 text-sm text-muted-foreground">Suunnitelma huomioi tärkeyden, esitiedot, varmistetun osaamisen, kertausvelan, virhepankin, koulun etenemisen, 14 päivän koemoodin ja muiden kurssien saman päivän kuorman. Extra on vapaaehtoista eikä muutu velaksi.</p>
      <select aria-label="Kurssi" value={choice} onChange={e=>setChoice(e.target.value)} className="w-full rounded-xl border bg-surface p-3">{courses.map(c=><option key={c.id} value={c.id}>{c.code} · {c.name}</option>)}</select>
      {selectedMode.active&&<p className="mt-3 rounded-xl bg-accent p-3 text-sm">Koemoodi on aktiivinen: {selectedMode.days} päivää kokeeseen. Uusi sisältö väistyy koetason harjoittelun, virheiden ja kertauksen tieltä.</p>}
      <button disabled={generate.isPending} className={button+" mt-3"} onClick={make}>Luo ehdotus</button>
    </Panel>}
    {plan.length===0&&<Panel title="Ei tehtäviä vielä"><p className="text-muted-foreground">Luo ensimmäinen suunnitelma tai lisää tehtävä itse.</p></Panel>}
    <div className={mode==="kuukausi"?"grid grid-cols-2 gap-2 sm:grid-cols-7":"space-y-3"}>{days.map(date=><section className={`panel p-4 ${date===today()?"ring-1 ring-primary/50":""}`} key={date} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const id=e.dataTransfer.getData("text/plain");const item=plan.find(p=>p.id===id);if(item&&item.date!==date)void move.mutateAsync({id,date,from:item.date}).then(()=>toast.success("Tehtävä siirretty.")).catch(()=>toast.error("Siirto epäonnistui."));}}><h2 className="mb-3 text-sm font-semibold capitalize">{dateWithWeekday(date)}</h2>{plan.filter(p=>p.date===date).length===0?<p className="text-sm text-muted-foreground">Ei tehtäviä</p>:plan.filter(p=>p.date===date).map(p=><div key={p.id} draggable={mode!=="kuukausi"&&p.kind!=="exam"} onDragStart={e=>e.dataTransfer.setData("text/plain",p.id)} className="mb-2 rounded-xl bg-muted/60 p-3"><p className="text-xs font-semibold text-primary">{courses.find(c=>c.id===p.course_id)?.code} · {p.start_time?.slice(0,5)||minutes(p.target_minutes)}</p><p className="mt-1 text-sm font-medium">{p.title||topics.find(t=>t.id===p.topic_id)?.name||"Opiskelu"}</p><p className="mt-1 text-xs text-muted-foreground">{statusLabel[effectivePlanStatus(p)]} · {p.phase}</p>{mode!=="kuukausi"&&p.kind!=="exam"&&<div className="mt-3 flex flex-wrap gap-1"><button className={secondary+" !min-h-9 !px-2"} onClick={()=>onStart(p.id)}>Aloita</button><button className={secondary+" !min-h-9 !px-2"} onClick={()=>void shift(p)}>Siirrä</button>{p.status==="planned"&&<button className={secondary+" !min-h-9 !px-2"} onClick={()=>void status.mutateAsync({id:p.id,status:"skipped"}).then(()=>toast.success("Tehtävä ohitettu.")).catch(()=>toast.error("Muutos epäonnistui."))}>Ohita</button>}</div>}</div>)}</section>)}</div>
  </div>;
}

export function CourseView({courses,topics,sessions,exams,plan,tests,mistakes,selected,onSelect,onAdd,onStart}:Base&{sessions:Session[];exams:Exam[];plan:PlanItem[];tests:PracticeTest[];mistakes:Mistake[];selected:string|null;onSelect:(id:string|null)=>void;onAdd:()=>void;onStart:()=>void}) {
  const [tab,setTab]=useState("Yleiskuva"),[form,setForm]=useState<"mistake"|"test"|"course"|"newTopic"|null>(null),[editingTopic,setEditingTopic]=useState<Topic|null>(null);
  const archiveCourse=useArchiveCourse(),updateTopic=useUpdateTopic(),advanceMistake=useAdvanceMistake();
  const c=courses.find(x=>x.id===selected);
  if(!c)return <div className="space-y-3"><button className={button} onClick={onAdd}>+ Lisää kurssi</button>{courses.map(course=>{const ts=topics.filter(t=>t.course_id===course.id),ss=sessions.filter(s=>s.course_id===course.id),next=plan.find(p=>p.course_id===course.id&&p.status==="planned"&&p.date>=today());return <button key={course.id} onClick={()=>{onSelect(course.id);setTab("Yleiskuva");}} className="panel block w-full p-4 text-left hover:ring-1 hover:ring-primary sm:p-5"><div className="flex justify-between gap-3"><div className="min-w-0"><b className="text-primary">{course.code}</b><h2 className="mt-1 truncate text-lg font-semibold sm:text-xl">{course.name}</h2><p className="mt-1 text-sm text-muted-foreground">{minutes(ss.reduce((a,s)=>a+s.minutes,0))} · {next?.title||ts.find(t=>t.progress<100)?.name||"Ei seuraavaa aihetta"}</p></div><b>{weightedCoverage(ts)} %</b></div><div className="mt-3"><Bar value={weightedCoverage(ts)}/></div></button>})}</div>;

  const ts=topics.filter(t=>t.course_id===c.id),ss=sessions.filter(s=>s.course_id===c.id),ee=exams.filter(e=>e.course_id===c.id),pp=plan.filter(p=>p.course_id===c.id),mm=mistakes.filter(m=>m.course_id===c.id),tt=tests.filter(t=>t.course_id===c.id);
  const debt=reviewDebt(ts);
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
      <Panel title="Edistyminen"><div className="grid grid-cols-3 gap-3"><div><p className="text-sm text-muted-foreground">Oma eteneminen</p><p className="text-2xl font-semibold">{weightedCoverage(ts)} %</p></div><div><p className="text-sm text-muted-foreground">Varmistettu</p><p className="text-2xl font-semibold">{weightedMastery(ts)} %</p></div><div><p className="text-sm text-muted-foreground">Koulussa</p><p className="text-2xl font-semibold">{schoolCoverage(ts)} %</p></div></div><div className="mt-4"><Bar value={weightedCoverage(ts)}/></div></Panel>
      <Panel title="Tämän viikon työ"><p className="text-2xl font-semibold">{minutes(weekStudy)}</p><p className="mt-2 text-sm text-muted-foreground">Viikkotavoite {minutes(c.weekly_minutes)} · viimeisin itsearvio {latestSelf??"—"}/5</p></Panel>
      <Panel title="Koe">{ee[0]?<><p>{fullDate(ee[0].date)}</p><p className="mt-2 text-sm text-muted-foreground">{diffDays(ee[0].date,today())} päivää jäljellä.</p></>:"Koetta ei ole merkitty."}</Panel>
      <Panel title="Kertausvelka"><p className="text-2xl font-semibold">{debt.count} aihetta</p><p className="mt-2 text-sm text-muted-foreground">Kertauspaine {debt.pressure} % · {debt.overdueDays} myöhästynyttä kertauspäivää.</p></Panel>
      <Panel title="Vaikeimmat aiheet">{hard.map(t=><p key={t.id} className="py-1 text-sm">{t.name} · {t.verified_level}/5</p>)}</Panel>
    </div>}

    {tab==="Sisältö"&&<Panel title="Aiheet" action={<button className={secondary+" !min-h-9"} onClick={()=>setForm("newTopic")}><Plus size={15}/>Lisää aihe</button>}>
      {ts.length?ts.map(t=>{const topicSessions=ss.filter(s=>s.topic_id===t.id),lastSession=topicSessions[0],mismatch=masteryMismatch(t);return <div key={t.id} className="border-b border-border py-4">
        <div className="flex justify-between gap-3"><div className="min-w-0"><p className="font-medium"><span aria-hidden="true">{t.progress>=100?"✓":t.progress>0?"◐":"○"} </span>{t.name}</p><p className="mt-1 text-sm text-muted-foreground">Sisältö {t.progress} % · osaaminen {t.verified_level}/5 · {minutes(t.study_minutes)}{t.materials?` · ${t.materials}`:""}</p><p className="mt-1 text-xs text-muted-foreground">Viimeisin opiskelu {lastSession?fullDate(lastSession.date):"—"} · viimeisin kertaus {t.last_review?fullDate(t.last_review):"—"} · seuraava kertaus {t.next_review?fullDate(t.next_review):"—"}{lastSession?.tasks?` · tehtävät ${lastSession.tasks}`:""}</p>{mismatch&&<p className="mt-2 rounded-xl bg-accent p-2 text-xs">{mismatch.message}</p>}</div><div className="flex items-start gap-2"><button aria-label="Muokkaa aihetta" className="rounded-lg p-2 hover:bg-muted" onClick={()=>setEditingTopic(t)}><Pencil size={15}/></button></div></div>
        <div className="my-2"><Bar value={t.progress}/></div>
        <label className="flex min-h-10 items-center gap-2 text-sm"><input type="checkbox" className="size-4 accent-primary" checked={t.school_covered} onChange={e=>void updateTopic.mutateAsync({id:t.id,school_covered:e.target.checked}).catch(()=>toast.error("Koulun etenemistä ei voitu päivittää."))}/>Käsitelty koulussa</label>
      </div>}):<p className="text-muted-foreground">Lisää aiheita kurssille.</p>}
    </Panel>}

    {tab==="Historia"&&<div className="space-y-4"><Panel title="Opiskeluhistoria">{ss.length?ss.map(s=><div className="border-b border-border py-3" key={s.id}><p className="font-medium">{fullDate(s.date)} · {minutes(s.minutes)} · {ts.find(t=>t.id===s.topic_id)?.name||c.code}</p><p className="mt-1 text-xs text-muted-foreground">{s.method||"menetelmä ei kirjattu"}{s.focus?` · keskittyminen ${s.focus}/5`:""}{s.energy?` · energia ${s.energy}/5`:""}</p>{(s.note||s.unclear)&&<p className="mt-1 text-sm text-muted-foreground">{s.note||s.unclear}</p>}</div>):<p className="text-muted-foreground">Et ole vielä kirjannut opiskelua tälle kurssille.</p>}</Panel><Panel title="Reflektiot">{ss.filter(s=>s.note||s.unclear).slice(0,8).map(s=><p key={s.id} className="border-b border-border py-2 text-sm">{fullDate(s.date)} · {s.note||s.unclear}</p>)}</Panel></div>}

    {tab==="Analyysi"&&<div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Valmistautuminen"><p className="text-2xl font-semibold">{readiness({topics:ts,tests:tt,mistakes:mm})} %</p><p className="mt-2 text-sm text-muted-foreground">Yhdistää todennetun osaamisen, kattavuuden, harjoituskokeet, kertauksen tuoreuden ja hallitut virheet. Ei arvosanaennuste.</p></Panel>
        <Panel title="Riskit">{riskItems.map(r=><div key={r.key} className="mb-4"><div className="mb-2 flex justify-between gap-3 text-sm"><b>{r.label}</b><span>{r.level} %</span></div><Bar value={r.level}/><p className="mt-1 text-xs text-muted-foreground">{r.note}</p></div>)}</Panel>
        <Panel title="Puskurit"><div className="grid grid-cols-3 gap-3"><div><p className="text-xs text-muted-foreground">Aikapuskuri</p><p className="text-xl font-semibold">{buffer.timeDays>=0?"+":""}{buffer.timeDays} pv</p></div><div><p className="text-xs text-muted-foreground">Työpuskuri</p><p className="text-xl font-semibold">{buffer.workSessions} sessiota</p></div><div><p className="text-xs text-muted-foreground">Recovery</p><p className="text-xl font-semibold">{buffer.recoverySessions}</p><p className="text-xs text-muted-foreground">{minutes(buffer.recoveryMinutes)}</p></div></div></Panel>
        <Panel title="Koulu vs. oma eteneminen"><p className="text-2xl font-semibold">{schoolCoverage(ts)} % <span className="text-sm font-normal text-muted-foreground">koulussa</span></p><p className="mt-1 text-2xl font-semibold">{weightedCoverage(ts)} % <span className="text-sm font-normal text-muted-foreground">itse</span></p><p className="mt-2 text-sm text-muted-foreground">{weightedCoverage(ts)-schoolCoverage(ts)>=15?"Olet selvästi koulua edellä. Uuden sisällön sijaan suunnitelma suosii kertausta ja syventämistä.":"Oma ja koulun eteneminen ovat lähellä toisiaan."}</p></Panel>
        <Panel title="Virhepankki"><button className={secondary+" mb-3"} onClick={()=>setForm("mistake")}>+ Kirjaa virhe</button>{mm.length?mm.map(m=>{const next=nextStatus(m.status);return <div className="border-t border-border py-3" key={m.id}><div className="flex items-start justify-between gap-3"><p className="font-medium">{m.error}</p><span className="rounded-full bg-muted px-2 py-1 text-xs">{statusText[m.status]??m.status}</span></div>{m.what_happened&&<p className="mt-1 text-sm text-muted-foreground">Mitä tapahtui: {m.what_happened}</p>}{(m.solution||m.explanation)&&<p className="mt-1 text-sm text-muted-foreground">Ratkaisutapa: {m.solution||m.explanation}</p>}{m.retry_date&&<p className="mt-1 text-xs text-muted-foreground">Uusinta {fullDate(m.retry_date)}</p>}{next&&<button className="mt-2 text-sm text-primary underline" onClick={()=>void advanceMistake.mutateAsync({id:m.id,status:next}).then(()=>toast.success(next==="mastered"?"Virhe hallittu.":"Virheen tila päivitetty.")).catch(()=>toast.error("Merkintää ei voitu päivittää."))}>{nextLabel(m.status)}</button>}</div>}):<p className="text-sm text-muted-foreground">Ei kirjattuja virheitä.</p>}<p className="mt-3 text-xs text-muted-foreground">Aktiivinen virhevelka: {activeErrors.length}. Vasta Hallittu poistuu riskilaskennasta.</p></Panel>
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

export function ExamsView({courses,topics,exams,tests,mistakes,sessions,plan,onCourse}:Base&{exams:Exam[];tests:PracticeTest[];mistakes:Mistake[];sessions:Session[];plan:PlanItem[];onCourse:(id:string)=>void}) {
  const [adding,setAdding]=useState(false),[selectedExam,setSelectedExam]=useState<string|null>(null);
  const selected=exams.find(e=>e.id===selectedExam);
  if(selected){
    const course=courses.find(c=>c.id===selected.course_id);
    const ts=topics.filter(t=>t.course_id===selected.course_id);
    const tt=tests.filter(t=>t.course_id===selected.course_id);
    const mm=mistakes.filter(m=>m.course_id===selected.course_id);
    const ss=sessions.filter(s=>s.course_id===selected.course_id);
    const pp=plan.filter(p=>p.course_id===selected.course_id&&p.date>=today()&&p.date<=selected.date&&p.status==="planned");
    const score=readiness({topics:ts,tests:tt,mistakes:mm});
    const missing=ts.filter(t=>t.progress<100||t.verified_level<3).sort((a,b)=>a.verified_level-b.verified_level||b.importance-a.importance);
    const reviews=ts.filter(t=>t.next_review&&t.next_review<=selected.date).sort((a,b)=>(a.next_review??"").localeCompare(b.next_review??""));
    const studyMinutes=ss.reduce((sum,s)=>sum+s.minutes,0);
    return <div className="space-y-5">
      <button className={secondary} onClick={()=>setSelectedExam(null)}><ChevronLeft size={17}/>Kaikki kokeet</button>
      <Panel title={selected.name}>
        <p className="text-sm text-muted-foreground">{course?.code} · {fullDate(selected.date)} · {diffDays(selected.date,today())} päivää</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div><p className="text-xs text-muted-foreground">Tavoite</p><p className="text-xl font-semibold">{selected.target_value||course?.target_value||"—"}</p></div>
          <div><p className="text-xs text-muted-foreground">Sisältö</p><p className="text-xl font-semibold">{weightedCoverage(ts)} %</p></div>
          <div><p className="text-xs text-muted-foreground">Osaaminen</p><p className="text-xl font-semibold">{weightedMastery(ts)} %</p></div>
          <div><p className="text-xs text-muted-foreground">Opiskeltu</p><p className="text-xl font-semibold">{minutes(studyMinutes)}</p></div>
        </div>
        <p className="mt-5 text-3xl font-semibold">{score} % <span className="text-sm font-normal text-muted-foreground">koevalmius · ei arvosanaennuste</span></p>
        <div className="mt-3"><Bar value={score}/></div>
      </Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Puuttuvat / riskiaiheet">{missing.length?missing.slice(0,10).map(t=><div key={t.id} className="flex items-center justify-between border-b border-border py-2 text-sm"><span>{t.name}</span><span className="text-muted-foreground">{t.progress}% · {t.verified_level}/5</span></div>):<p className="text-muted-foreground">Kaikki aiheet ovat kattavasti käsiteltyjä.</p>}</Panel>
        <Panel title="Kertausohjelma">{reviews.length?reviews.slice(0,10).map(t=><div key={t.id} className="flex items-center justify-between border-b border-border py-2 text-sm"><span>{t.name}</span><span className="text-muted-foreground">{t.next_review?fullDate(t.next_review):"—"}</span></div>):<p className="text-muted-foreground">Ei erääntyviä kertauksia ennen koetta.</p>}</Panel>
        <Panel title="Harjoituskokeet">{tt.length?tt.map(t=><div key={t.id} className="border-b border-border py-2 text-sm"><p className="font-medium">{fullDate(t.date)} · {t.score}/{t.max_score} p</p><p className="text-xs text-muted-foreground">{t.duration_minutes?`${t.duration_minutes} min · `:""}{t.error_count!=null?`${t.error_count} virhettä`:""}</p></div>):<p className="text-muted-foreground">Harjoituskokeita ei ole vielä kirjattu.</p>}</Panel>
        <Panel title="Suunniteltu ennen koetta">{pp.length?pp.slice(0,12).map(p=><div key={p.id} className="flex items-center justify-between border-b border-border py-2 text-sm"><span>{fullDate(p.date)} · {p.title}</span><span className="text-muted-foreground">{minutes(p.target_minutes)}</span></div>):<p className="text-muted-foreground">Ei avoimia tehtäviä ennen koetta.</p>}</Panel>
      </div>
      <button className={secondary} onClick={()=>onCourse(selected.course_id)}>Avaa kurssi</button>
    </div>;
  }
  return <div className="space-y-4"><button className={button} onClick={()=>setAdding(true)}>+ Lisää koe</button>{adding&&<ExamForm courses={courses} onClose={()=>setAdding(false)}/>}
  {exams.length===0?<Panel title="Ei kokeita vielä"><p className="text-muted-foreground">Lisää ensimmäinen koe painamalla Lisää koe.</p></Panel>:exams.map(e=>{const ts=topics.filter(t=>t.course_id===e.course_id),score=readiness({topics:ts,tests:tests.filter(t=>t.course_id===e.course_id),mistakes:mistakes.filter(m=>m.course_id===e.course_id)}),mode=examMode(e.date);return <button key={e.id} onClick={()=>setSelectedExam(e.id)} className="panel block w-full p-4 text-left sm:p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-primary">{courses.find(c=>c.id===e.course_id)?.code}</p><h2 className="mt-1 text-lg font-semibold">{e.name}</h2><p className="mt-1 text-sm text-muted-foreground">{fullDate(e.date)} · {diffDays(e.date,today())} päivää</p></div><span className="text-xl font-semibold">{score}%</span></div>{mode.active&&<p className="mt-2 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold">Koemoodi aktiivinen</p>}<div className="mt-3"><Bar value={score}/></div><p className="mt-2 text-xs text-muted-foreground">Ei arvosanaennuste · avaa kokeen yksityiskohdat</p></button>})}</div>;
}

export function ProgressView({courses,topics,sessions,plan,onPlan}:Base&{sessions:Session[];plan:PlanItem[];onPlan:()=>void}) {
  const from=addDays(today(),-29),recent=sessions.filter(s=>s.date>=from&&s.date<=today()),due=plan.filter(p=>p.date>=from&&p.date<=today()&&p.kind!=="exam"),completed=due.filter(p=>p.status==="completed"),byCourse=courses.map(c=>({course:c,mins:recent.filter(s=>s.course_id===c.id).reduce((a,s)=>a+s.minutes,0)})).sort((a,b)=>b.mins-a.mins);
  const checkins=useWeeklyCheckins(),events=useProgressEvents(),saveCheckin=useUpsertWeeklyCheckin();
  const week=startOfWeek(today()),existing=checkins.data?.find(x=>x.week_start===week);
  const [note,setNote]=useState(""),[planned,setPlanned]=useState<number>(courses.reduce((a,c)=>a+c.weekly_minutes,0));
  useEffect(()=>{if(existing){setNote(existing.note??"");setPlanned(existing.planned_minutes??courses.reduce((a,c)=>a+c.weekly_minutes,0));}},[existing,courses]);
  const actual=weekMinutes(sessions);

  return <div className="space-y-5">
    <p className="text-sm text-muted-foreground">Viimeiset 30 päivää · tallennetut merkinnät</p>
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[["Opiskeluaika",minutes(recent.reduce((a,s)=>a+s.minutes,0))],["Suunnitelmasta",due.length?`${Math.round(completed.length/due.length*100)} %`:"—"],["Opiskelupäivät",String(new Set(recent.map(s=>s.date)).size)],["Osaaminen",topics.length?`${weightedMastery(topics)} %`:"—"]].map(([label,value])=><div key={label} className="panel p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></div>)}</div>
    <Panel title="Kurssijakauma">{byCourse.filter(x=>x.mins>0).length?byCourse.filter(x=>x.mins>0).map(x=><div key={x.course.id} className="mb-4"><div className="mb-2 flex justify-between text-sm"><span>{x.course.code}</span><span>{minutes(x.mins)}</span></div><Bar value={byCourse[0]?.mins?x.mins/byCourse[0].mins*100:0}/></div>):<p className="text-muted-foreground">Kirjaa ensimmäinen sessio nähdäksesi jakauman.</p>}</Panel>
    <Panel title={`Viikko ${weekNumber(today())} · reflektio`}>
      <div className="grid gap-3 sm:grid-cols-3"><div><p className="text-sm text-muted-foreground">Tavoite</p><input type="number" min="0" step="15" className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={planned} onChange={e=>setPlanned(Number(e.target.value))}/></div><div><p className="text-sm text-muted-foreground">Toteutunut</p><p className="mt-2 text-xl font-semibold">{minutes(actual)}</p></div><div><p className="text-sm text-muted-foreground">Opiskelupäivät</p><p className="mt-2 text-xl font-semibold">{studyDaysInWeek(sessions)}</p></div></div>
      <label className="mt-4 block text-sm font-medium">Mikä toimi, mikä ei ja mitä muutan ensi viikolla?<textarea rows={4} className="mt-1 w-full rounded-xl border bg-surface px-3 py-2" value={note} onChange={e=>setNote(e.target.value)}/></label>
      <div className="mt-3 flex flex-wrap gap-2"><button className={button} disabled={saveCheckin.isPending} onClick={()=>void saveCheckin.mutateAsync({week_start:week,note:note.trim()||null,planned_minutes:planned,actual_minutes:actual}).then(()=>toast.success("Viikkoreflektointi tallennettu.")).catch(()=>toast.error("Tallennus epäonnistui."))}>Tallenna reflektio</button><button className={secondary} onClick={onPlan}>Suunnittele ensi viikko</button></div>
    </Panel>
    <Panel title="Osaamisen tapahtumat">{events.data?.length?events.data.slice(0,12).map(e=><div key={e.id} className="border-b border-border py-3"><p className="font-medium">{e.detail??e.kind}</p><p className="text-sm text-muted-foreground">{e.kind==="mastery"&&e.from_value!=null&&e.to_value!=null?`Osaaminen ${e.from_value} → ${e.to_value}`:e.kind} · {new Date(e.created_at).toLocaleDateString("fi-FI")}</p></div>):<p className="text-muted-foreground">Osaamisen muutokset ilmestyvät tähän opiskelun myötä.</p>}</Panel>
  </div>;
}

export function SettingsView({user}:{user:User}) {
  const [dark,setDark]=useState(typeof window!=="undefined"?storedThemeIsDark():false);
  const [pushEnabled,setPushEnabled]=useState(false);
  const [pushBusy,setPushBusy]=useState(false);
  const preferences=usePreferences(),prefs=preferences.data,updatePreferences=useUpdatePreferences();
  const allCourses=useCourses(),archiveCourse=useArchiveCourse();
  const archived=(allCourses.data??[]).filter(c=>c.archived);
  const weekdayOptions=[[1,"Ma"],[2,"Ti"],[3,"Ke"],[4,"To"],[5,"Pe"],[6,"La"],[7,"Su"]] as const;

  useEffect(()=>{
    let active=true;
    void pushIsEnabledOnDevice().then(enabled=>{if(active)setPushEnabled(enabled);}).catch(()=>{if(active)setPushEnabled(false);});
    return()=>{active=false;};
  },[]);

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
    <Panel title="Profiili"><p className="text-2xl font-semibold">{prefs?.display_name||"Arthur"}</p><p className="mt-2 text-sm text-muted-foreground">Pysyvä Opintopäiväkirja-tunnus · {user.id.slice(0,8)}…</p></Panel>

    <Panel title="Opiskelurytmi">
      <p className="mb-3 text-sm text-muted-foreground">Näitä päiviä käytetään uusien adaptiivisten suunnitelmien rytmitykseen ja taustamuistutuksiin.</p>
      <div className="flex flex-wrap gap-2">{weekdayOptions.map(([day,label])=>{const active=(prefs?.study_weekdays??[1,2,3,4,5]).includes(day);return <button key={day} type="button" aria-pressed={active} onClick={()=>void toggleWeekday(day)} className={`grid size-11 place-items-center rounded-xl border text-sm font-semibold ${active?"border-primary bg-accent text-primary":"border-border bg-surface"}`}>{label}</button>;})}</div>
    </Panel>

    <Panel title="Taustamuistutukset" action={<button disabled={pushBusy||!pushSupported()} className={secondary+" !min-h-9"} onClick={()=>void togglePush()}><Bell size={15}/>{pushBusy?"Päivitetään…":pushEnabled?"Poista käytöstä":"Ota käyttöön"}</button>}>
      <p className="text-sm text-muted-foreground">
        {pushSupported()
          ? pushEnabled
            ? "Web Push on käytössä tällä laitteella. Muistutukset voivat saapua myös silloin, kun Opintopäiväkirja on suljettu."
            : "Ota Web Push käyttöön, jotta päivän tehtävät, kertausvelka ja aivan lähellä olevat kokeet voivat muistuttaa myös sovelluksen ollessa suljettu."
          : "Tämä selain ei tue Web Push -ilmoituksia."}
      </p>
      <p className="mt-3 text-xs text-muted-foreground">Aamumuistutus lähetetään valittuina opiskelupäivinä noin klo 8–9 Suomen aikaa. Saman päivän muistutus lähetetään vain kerran.</p>
      {pushEnabled&&<button className={secondary+" mt-4 !min-h-9"} onClick={()=>void sendTestPush().then(()=>toast.success("Testimuistutus lähetettiin palvelimelta.")).catch(error=>toast.error(error instanceof Error?error.message:"Testimuistutus epäonnistui."))}>Lähetä testimuistutus</button>}
    </Panel>

    <Panel title="Ulkoasu"><label className="flex min-h-11 items-center justify-between">Tumma tila<input type="checkbox" className="size-5 accent-primary" checked={dark} onChange={e=>{const next=e.target.checked;setDark(next);localStorage.setItem("opk.theme",next?"dark":"light");applyTheme(next);}}/></label></Panel>

    {archived.length>0&&<Panel title="Arkistoidut kurssit">{archived.map(c=><div key={c.id} className="flex min-h-12 items-center justify-between gap-3 border-b border-border"><span><b>{c.code}</b> · {c.name}</span><button className={secondary+" !min-h-9"} onClick={()=>void archiveCourse.mutateAsync({id:c.id,archived:false}).then(()=>toast.success("Kurssi palautettu.")).catch(()=>toast.error("Palautus epäonnistui."))}>Palauta</button></div>)}</Panel>}

    <Panel title="Laite"><p className="mb-3 text-sm text-muted-foreground">Normaalisti kirjautumista ei enää kysytä tällä selaimella. Tämän painikkeen käyttö poistaa muistamisen ja paikallisen session, mutta Arthur-tili ja opiskelutiedot säilyvät palvelimella.</p><button className={secondary} onClick={async()=>{if(!window.confirm("Unohdetaanko tämä laite?"))return;localStorage.removeItem("opk.device-authorized");localStorage.removeItem("opk.owner-id");await supabase.auth.signOut();location.reload();}}><RotateCcw size={16}/>Unohda tämä laite</button></Panel>
  </div>;
}
