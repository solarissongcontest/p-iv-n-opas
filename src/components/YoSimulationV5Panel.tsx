
import { useState } from "react";
import { toast } from "sonner";
import { AbittiAnswerEditor } from "@/components/AbittiAnswerEditor";
import type { Course, Exam } from "@/lib/domain";
import {
  analyzeTaskSelectionV5,
  yoExamBlueprintV5,
} from "@/lib/learning-os-v5";
import {
  useCreateExamSimulation,
  useExamSimulations,
  useQuestionBank,
  useUpdateExamSimulation,
} from "@/lib/data";

const primary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50";
const secondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm hover:bg-muted disabled:opacity-50";

function stimulusText(stimulus: Record<string, unknown> | undefined) {
  if (!stimulus || !Object.keys(stimulus).length) return null;
  for (const key of ["text","title","description","source","caption"]) {
    if (typeof stimulus[key] === "string") return String(stimulus[key]);
  }
  return Object.entries(stimulus)
    .map(([key,value]) => key + ": " + (typeof value === "string" ? value : JSON.stringify(value)))
    .join("\n");
}

function SketchPad({
  value,
  onChange,
  disabled,
}: {
  value: number[][][];
  onChange:(value:number[][][])=>void;
  disabled?:boolean;
}) {
  const [drawing,setDrawing]=useState(false);
  const point=(event:React.PointerEvent<SVGSVGElement>)=>{
    const box=event.currentTarget.getBoundingClientRect();
    return [
      (event.clientX-box.left)/box.width*600,
      (event.clientY-box.top)/box.height*300,
    ] as [number,number];
  };
  return <div>
    <svg
      viewBox="0 0 600 300"
      className="h-56 w-full touch-none rounded-xl border border-border bg-surface"
      onPointerDown={event=>{
        if(disabled)return;
        const [x,y]=point(event);
        setDrawing(true);
        onChange([...value,[[x,y]]]);
      }}
      onPointerMove={event=>{
        if(disabled||!drawing||!value.length)return;
        const [x,y]=point(event);
        const next=value.map(stroke=>stroke.map(pair=>[...pair]));
        next[next.length-1]!.push([x,y]);
        onChange(next);
      }}
      onPointerUp={()=>setDrawing(false)}
      onPointerLeave={()=>setDrawing(false)}
    >
      {value.map((stroke,index)=><polyline
        key={index}
        points={stroke.map(pair=>pair.join(",")).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />)}
    </svg>
    {!disabled&&<button type="button" className={secondary+" mt-2 !min-h-9"} onClick={()=>onChange([])}>Tyhjennä piirros</button>}
  </div>;
}

export function YoSimulationV5Panel({
  course,
  exam,
}: {
  course: Course;
  exam?: Exam | null;
}) {
  const bank=useQuestionBank();
  const simulations=useExamSimulations();
  const create=useCreateExamSimulation();
  const update=useUpdateExamSimulation();
  const blueprint=yoExamBlueprintV5(course.subject);
  const tasks=(bank.data??[]).filter(question=>question.course_id===course.id).slice(0,blueprint.totalTasks);
  const [selected,setSelected]=useState<string[]>([]);
  const [activeId,setActiveId]=useState<string|null>(null);
  const [answers,setAnswers]=useState<Record<string,unknown>>({});
  const [finished,setFinished]=useState(false);
  const active=activeId?(simulations.data??[]).find(row=>row.id===activeId):null;
  const selectedTasks=tasks.filter(task=>selected.includes(task.id));
  const analysis=analyzeTaskSelectionV5(tasks.map(task=>({
    taskId:task.id,
    estimatedMinutes:Math.max(8,Math.round((task.estimated_seconds??1200)/60)),
    expectedPoints:Number(task.points??task.metadata?.["points"]??12),
    confidence:.7,
    selected:selected.includes(task.id),
  })),blueprint);

  async function start(){
    if(!selected.length){toast.error("Valitse ensin tehtävät.");return;}
    const id=await create.mutateAsync({
      course_id:course.id,
      mode:"full",
      task_ids:tasks.map(task=>task.id),
      selected_task_ids:selected,
      duration_minutes:blueprint.durationMinutes,
    });
    setActiveId(id);
    setFinished(false);
    toast.success("YO/Abitti-simulaatio aloitettu. Vihjeet ja välitön palaute ovat pois käytöstä.");
  }

  async function finish(){
    if(!activeId)return;
    await update.mutateAsync({
      id:activeId,
      completed_task_ids:selected,
      answers,
      completed_at:new Date().toISOString(),
      task_selection_note:analysis.note,
    });
    setFinished(true);
  }

  if(activeId&&!finished){
    return <section className="panel p-4 sm:p-6">
      <h2 className="text-lg font-semibold">YO / Abitti 2 -simulaatio</h2>
      <div className="mt-3 rounded-xl bg-accent p-3 text-sm">
        <b>Koetila:</b> ei vihjeitä, ei mastery-näkymää eikä palautetta ennen lopetusta.
        Valittuna {selected.length}/{blueprint.maxAnswers} tehtävää.
        {exam&&<span> · {exam.name}</span>}
      </div>
      <div className="mt-4 space-y-5">
        {selectedTasks.map((task,index)=>{
          const mode=task.answer_mode??"text";
          const stimulus=stimulusText(task.stimulus_package);
          const sketch=(answers[task.id] as number[][][]|undefined)??[];
          return <section key={task.id} className="rounded-2xl border border-border p-4">
            <div className="flex justify-between gap-3">
              <b>Tehtävä {index+1}</b>
              <span className="text-sm text-muted-foreground">{task.points??task.metadata?.["points"]??"—"} p · {mode}</span>
            </div>
            {stimulus&&<pre className="mt-3 whitespace-pre-wrap rounded-xl bg-muted/50 p-3 text-sm">{stimulus}</pre>}
            <p className="mt-3 font-medium">{task.prompt}</p>
            {mode==="diagram"||mode==="graph"
              ? <div className="mt-3"><SketchPad value={sketch} onChange={value=>setAnswers(current=>({...current,[task.id]:value}))}/></div>
              : <div className="mt-3"><AbittiAnswerEditor label="Vastaus" value={String(answers[task.id]??"")} onChange={value=>setAnswers(current=>({...current,[task.id]:value}))} minHeight={180}/></div>}
          </section>;
        })}
      </div>
      <button className={primary+" mt-5"} disabled={update.isPending} onClick={()=>void finish()}>
        Lopeta simulaatio ja vapauta palaute
      </button>
      {active&&<p className="mt-2 text-xs text-muted-foreground">Simulaatio tallennettu · {active.id.slice(0,8)}…</p>}
    </section>;
  }

  return <section className="panel p-4 sm:p-6">
    <h2 className="text-lg font-semibold">YO / Abitti 2 -fidelity mode</h2>
    <p className="mt-2 text-sm text-muted-foreground">
      Blueprint: enintään {blueprint.maxAnswers}/{blueprint.totalTasks} tehtävää · {blueprint.maxPoints} p · {blueprint.durationMinutes} min.
      Tehtävävalinta on osa harjoittelua.
    </p>
    {!tasks.length
      ? <p className="mt-3 text-sm text-muted-foreground">Kurssin tehtäväpankissa ei ole vielä riittävästi LOPS21-tehtäviä simulaatiota varten.</p>
      : <div className="mt-4 grid gap-2 sm:grid-cols-2">{tasks.map((task,index)=>{
          const chosen=selected.includes(task.id);
          return <button
            key={task.id}
            type="button"
            aria-pressed={chosen}
            onClick={()=>setSelected(current=>chosen
              ? current.filter(id=>id!==task.id)
              : current.length<blueprint.maxAnswers?[...current,task.id]:current)}
            className={"min-h-16 rounded-xl border p-3 text-left "+(chosen?"border-primary bg-accent":"border-border bg-surface")}
          >
            <b>{index+1}. {task.question_type.replaceAll("_"," ")}</b>
            <small className="mt-1 block text-muted-foreground">
              {task.answer_mode??"text"} · vaikeus {task.difficulty}/5 · {task.points??task.metadata?.["points"]??"—"} p
            </small>
          </button>;
        })}</div>}
    <div className="mt-4 rounded-xl bg-muted/50 p-3 text-sm">
      <b>Tehtävävalinnan analyysi</b>
      <p className="mt-1 text-muted-foreground">
        {analysis.selectedCount}/{blueprint.maxAnswers} · arviolta {analysis.estimatedMinutes} min · {analysis.note}
      </p>
    </div>
    <button className={primary+" mt-4"} disabled={!selected.length||create.isPending} onClick={()=>void start()}>
      Aloita koesimulaatio
    </button>
    {finished&&<div className="mt-5 rounded-xl border border-border p-3">
      <b>Palaute vapautettu</b>
      <p className="mt-1 text-sm text-muted-foreground">{analysis.note}</p>
      {selectedTasks.map(task=><details key={task.id} className="border-t border-border py-2">
        <summary className="cursor-pointer text-sm font-medium">{task.prompt}</summary>
        <p className="mt-2 text-sm">{task.explanation}</p>
      </details>)}
    </div>}
  </section>;
}
