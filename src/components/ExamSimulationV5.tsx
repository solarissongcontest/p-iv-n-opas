import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { Course, Topic } from "@/lib/domain";
import {
  useCreateExamSimulation,
  useQuestionBank,
  useUpdateExamSimulation,
} from "@/lib/data";
import {
  buildExamSimulationV5,
  reviewTaskSelectionV5,
  type ExamSimulationTaskV5,
} from "@/lib/learning-os-v5";
import { AbittiAnswerEditor } from "@/components/AbittiAnswerEditor";
import { SketchAnswerCanvas } from "@/components/SketchAnswerCanvas";

const primary="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50";
const secondary="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm disabled:opacity-50";

type AnswerState={text:string;sketch:string};

function Stimulus({value}:{value:Record<string,unknown>|null}) {
  if(!value||!Object.keys(value).length)return null;
  return <div className="rounded-2xl border border-border bg-muted/40 p-4">
    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">Aineisto</p>
    <div className="space-y-2 text-sm">{Object.entries(value).map(([key,item])=><div key={key}><b>{key.replaceAll("_"," ")}:</b>{" "}{typeof item==="string"||typeof item==="number"?String(item):<code className="text-xs">{JSON.stringify(item)}</code>}</div>)}</div>
  </div>;
}

export function ExamSimulationV5({courses,topics}:{courses:Course[];topics:Topic[]}) {
  const bank=useQuestionBank();
  const create=useCreateExamSimulation();
  const update=useUpdateExamSimulation();
  const [courseId,setCourseId]=useState(courses.find(c=>!c.archived)?.id??courses[0]?.id??"");
  const [mode,setMode]=useState<"practice"|"full">("full");
  const [selected,setSelected]=useState<string[]>([]);
  const [phase,setPhase]=useState<"select"|"running"|"review"|"done">("select");
  const [rowId,setRowId]=useState<string|null>(null);
  const [activeIndex,setActiveIndex]=useState(0);
  const [answers,setAnswers]=useState<Record<string,AnswerState>>({});
  const [scores,setScores]=useState<Record<string,number>>({});
  const [startedAt,setStartedAt]=useState<number|null>(null);
  const [elapsed,setElapsed]=useState(0);

  const course=courses.find(c=>c.id===courseId)??null;
  const simulation=useMemo(()=>course?buildExamSimulationV5({
    course,
    topics:topics.filter(t=>t.course_id===course.id),
    questions:bank.data??[],
    mode,
  }):null,[course,topics,bank.data,mode]);

  useEffect(()=>{
    if(!simulation||phase!=="select")return;
    setSelected(current=>current.filter(id=>simulation.tasks.some(t=>t.id===id)).slice(0,simulation.maxSelected));
  },[simulation,phase]);

  useEffect(()=>{
    if(phase!=="running"||startedAt===null)return;
    const tick=()=>setElapsed(Math.max(0,Math.floor((Date.now()-startedAt)/1000)));
    tick();
    const timer=window.setInterval(tick,1000);
    return()=>window.clearInterval(timer);
  },[phase,startedAt]);

  const selectedTasks=(simulation?.tasks??[]).filter(task=>selected.includes(task.id));
  const activeTask=selectedTasks[activeIndex]??null;

  function toggle(id:string){
    if(phase!=="select"||!simulation)return;
    setSelected(current=>current.includes(id)?current.filter(x=>x!==id):current.length>=simulation.maxSelected?current:[...current,id]);
  }

  async function start(){
    if(!simulation||!course||selected.length===0)return;
    try{
      const id=await create.mutateAsync({
        course_id:course.id,
        mode,
        task_ids:simulation.tasks.map(task=>task.id),
        selected_task_ids:selected,
        duration_minutes:simulation.durationMinutes,
      });
      setRowId(id);
      setStartedAt(Date.now());
      setElapsed(0);
      setActiveIndex(0);
      setPhase("running");
    }catch{toast.error("Koetilaa ei voitu käynnistää.");}
  }

  function changeAnswer(task:ExamSimulationTaskV5,patch:Partial<AnswerState>){
    setAnswers(current=>({
      ...current,
      [task.id]:{text:"",sketch:"",...(current[task.id]??{}),...patch},
    }));
  }

  function next(){
    if(activeIndex+1<selectedTasks.length){setActiveIndex(i=>i+1);return;}
    setPhase("review");
  }

  async function finishReview(){
    if(!simulation||!rowId)return;
    const review=reviewTaskSelectionV5({
      simulation,
      selectedTaskIds:selected,
      completedTaskIds:selected,
      scores,
    });
    try{
      await update.mutateAsync({
        id:rowId,
        completed_task_ids:selected,
        scores,
        answers,
        completed_at:new Date().toISOString(),
        task_selection_note:review.note,
      });
      setPhase("done");
      toast.success("Koetyylinen simulaatio tallennettu.");
    }catch{toast.error("Koetulosta ei voitu tallentaa.");}
  }

  function reset(){
    setSelected([]);setPhase("select");setRowId(null);setActiveIndex(0);setAnswers({});setScores({});setStartedAt(null);setElapsed(0);
  }

  if(!course)return <section className="panel p-4"><p className="text-sm text-muted-foreground">Lisää kurssi ennen koesimulaatiota.</p></section>;

  return <section className="panel p-4 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div><h2 className="text-base font-semibold sm:text-lg">YO / Abitti 2 -simulaatio</h2><p className="mt-1 text-sm text-muted-foreground">Tehtävävalinta, suljettu palaute, kaavat sekä piirros- ja kuvaajavastaukset samassa harjoituksessa.</p></div>
      {phase==="running"&&simulation&&<div className="rounded-xl bg-muted px-3 py-2 text-sm"><b>{Math.floor(elapsed/60)}:{String(elapsed%60).padStart(2,"0")}</b> / {simulation.durationMinutes} min</div>}
    </div>

    {phase==="select"&&<>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">Kurssi<select className="mt-1 w-full rounded-xl border bg-surface p-3" value={courseId} onChange={e=>{setCourseId(e.target.value);setSelected([]);}}>{courses.filter(c=>!c.archived).map(c=><option key={c.id} value={c.id}>{c.code} · {c.name}</option>)}</select></label>
        <label className="text-sm font-medium">Tila<select className="mt-1 w-full rounded-xl border bg-surface p-3" value={mode} onChange={e=>{setMode(e.target.value as "practice"|"full");setSelected([]);}}><option value="full">Täysi koesimulaatio</option><option value="practice">Lyhyempi harjoitus</option></select></label>
      </div>
      {simulation?<div className="mt-5">
        <div className="rounded-xl bg-accent/50 p-3 text-sm">Tarjolla {simulation.maxTasks} tehtävää · valitse enintään {simulation.maxSelected} · enintään {simulation.maxPoints} p · {simulation.durationMinutes} min. Vihjeitä tai mastery-näkymää ei näytetä kesken suorituksen.</div>
        <div className="mt-3 space-y-2">{simulation.tasks.map(task=><button type="button" key={task.id} aria-pressed={selected.includes(task.id)} onClick={()=>toggle(task.id)} className={"flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border p-3 text-left "+(selected.includes(task.id)?"border-primary bg-accent":"border-border bg-surface")}><span><b>{task.title}</b><small className="mt-1 block text-muted-foreground">{task.answerMode} · {task.stimulus?"aineistotehtävä":"ei erillistä aineistoa"}</small></span><span className="font-semibold">{task.points} p</span></button>)}</div>
        <button disabled={!selected.length||create.isPending} className={primary+" mt-4"} onClick={()=>void start()}>Aloita valitut {selected.length} tehtävää</button>
      </div>:<p className="mt-4 text-sm text-muted-foreground">Tehtäväpankissa ei ole vielä tähän kurssiin soveltuvia tehtäviä.</p>}
    </>}

    {phase==="running"&&activeTask&&<>
      <div className="mt-5 rounded-2xl bg-muted/50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-primary">Tehtävä {activeIndex+1}/{selectedTasks.length} · {activeTask.points} p · {activeTask.answerMode}</p><p className="mt-2 text-sm text-muted-foreground">Palaute ja oikeat vastaukset pysyvät piilossa koko tehtäväblokin ajan.</p></div>
      <div className="mt-4">
        <Stimulus value={activeTask.stimulus}/>
        <p className="mt-4 text-lg font-semibold">{(bank.data??[]).find(q=>q.id===activeTask.id)?.prompt??activeTask.title}</p>
      </div>
      {(activeTask.answerMode==="text"||activeTask.answerMode==="formula"||activeTask.answerMode==="mixed")&&<div className="mt-4"><AbittiAnswerEditor label="Vastaus" value={answers[activeTask.id]?.text??""} onChange={value=>changeAnswer(activeTask,{text:value})} minHeight={220}/></div>}
      {(activeTask.answerMode==="diagram"||activeTask.answerMode==="graph"||activeTask.answerMode==="mixed")&&<div className="mt-4"><SketchAnswerCanvas mode={activeTask.answerMode==="graph"?"graph":"diagram"} value={answers[activeTask.id]?.sketch??""} onChange={value=>changeAnswer(activeTask,{sketch:value})}/></div>}
      <div className="mt-5 flex flex-wrap gap-2">
        {activeIndex>0&&<button className={secondary} onClick={()=>setActiveIndex(i=>Math.max(0,i-1))}>Edellinen</button>}
        <button className={primary} onClick={next}>{activeIndex+1===selectedTasks.length?"Päätä tehtäväblokki":"Seuraava tehtävä"}</button>
      </div>
    </>}

    {phase==="review"&&simulation&&<>
      <div className="mt-5 rounded-2xl bg-accent/50 p-4"><h3 className="font-semibold">Palaute avautuu vasta nyt</h3><p className="mt-1 text-sm text-muted-foreground">Arvioi pisteet tehtävä kerrallaan vasta koko blokin jälkeen. Tämä vaihe ei muuta alkuperäisiä vastauksia.</p></div>
      <div className="mt-4 space-y-4">{selectedTasks.map(task=>{const item=(bank.data??[]).find(q=>q.id===task.id);return <div key={task.id} className="rounded-2xl border border-border p-4">
        <div className="flex justify-between gap-3"><b>{task.title}</b><span>{task.points} p</span></div>
        <p className="mt-2 text-sm">{item?.prompt}</p>
        <details className="mt-3 rounded-xl bg-muted/50 p-3 text-sm"><summary className="cursor-pointer font-medium">Näytä mallipalaute</summary>{item?.correct_answer&&<p className="mt-2"><b>Oikea vastaus:</b> {item.correct_answer}</p>}<p className="mt-2 text-muted-foreground">{item?.explanation||"Ei erillistä mallipalautetta."}</p></details>
        <label className="mt-3 block text-sm font-medium">Pisteet<input type="number" min="0" max={task.points} className="mt-1 w-28 rounded-xl border bg-surface p-2" value={scores[task.id]??0} onChange={e=>setScores(current=>({...current,[task.id]:Math.max(0,Math.min(task.points,Number(e.target.value)||0))}))}/></label>
      </div>})}</div>
      <button disabled={update.isPending} className={primary+" mt-4"} onClick={()=>void finishReview()}>Tallenna simulaatio</button>
    </>}

    {phase==="done"&&simulation&&<div className="mt-5"><div className="rounded-2xl bg-accent p-4"><h3 className="font-semibold">Simulaatio valmis</h3><p className="mt-2 text-sm text-muted-foreground">Pisteet {Object.values(scores).reduce((a,b)=>a+b,0)} / {selectedTasks.reduce((a,b)=>a+b.points,0)}. Tätä käytetään koetason näyttönä, ei automaattisena arvosanaennusteena.</p></div><button className={secondary+" mt-4"} onClick={reset}>Uusi simulaatio</button></div>}
  </section>;
}
