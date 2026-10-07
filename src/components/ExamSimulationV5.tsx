import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { Course, Topic } from "@/lib/domain";
import {
  useCreateExamSimulation,
  useExams,
  useExamSimulations,
  useQuestionBank,
  usePracticeAttempts,
  useRecordPracticeAttempt,
  useUpdateExamSimulation,
} from "@/lib/data";
import {
  buildExamSimulationV5,
  reviewTaskSelectionV5,
  type ExamSimulationTaskV5,
} from "@/lib/learning-os-v5";
import { examScopeLabel, nextExamForCourse, topicsForExam, useExamTopicScopes } from "@/lib/examScopeData";
import { today } from "@/lib/fi";
import { AbittiAnswerEditor, answerHasContent, answerPlainText } from "@/components/AbittiAnswerEditor";
import { SketchAnswerCanvas } from "@/components/SketchAnswerCanvas";
import { answerModeLabel, stimulusFieldLabel } from "@/lib/ui-fi";
import { ensureKe04QuestionBankSeed } from "@/lib/ke04-question-bank-browser";

const primary="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50";
const secondary="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm disabled:opacity-50";

type AnswerState={text:string;sketch:string};
type LocalExamDraft={answers?:Record<string,AnswerState>;activeIndex?:number;startedAt?:number};

function Stimulus({value}:{value:Record<string,unknown>|null}) {
  if(!value||!Object.keys(value).length)return null;
  return <div className="rounded-2xl border border-border bg-muted/40 p-4">
    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">Aineisto</p>
    <div className="space-y-2 text-sm">{Object.entries(value).map(([key,item],index)=><div key={key}><b>{stimulusFieldLabel(key,index)}:</b>{" "}{typeof item==="string"||typeof item==="number"?String(item):<span className="text-xs text-muted-foreground">{Array.isArray(item)?item.map(String).join(", "):"Lisäaineisto"}</span>}</div>)}</div>
  </div>;
}

export function ExamSimulationV5({courses,topics}:{courses:Course[];topics:Topic[]}) {
  const bank=useQuestionBank();
  const attempts=usePracticeAttempts();
  const create=useCreateExamSimulation();
  const update=useUpdateExamSimulation();
  const simulations=useExamSimulations();
  const recordAttempt=useRecordPracticeAttempt();
  const exams=useExams();
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
  const [finishing,setFinishing]=useState(false);
  const [seedingKe04,setSeedingKe04]=useState(false);
  const seededCourseRef=useRef(new Set<string>());
  const answersRef=useRef<Record<string,AnswerState>>({});
  const autosaveTimer=useRef<number|null>(null);

  const course=courses.find(c=>c.id===courseId)??null;
  const nextExam=course?nextExamForCourse(exams.data??[],course.id,today()):null;
  const scopeQ=useExamTopicScopes(nextExam?.id);
  const scopedTopics=useMemo(()=>course
    ?topicsForExam(topics.filter(t=>t.course_id===course.id),scopeQ.data??[])
    :[],[course,topics,scopeQ.data]);

  useEffect(()=>{
    if(!course||course.code.toUpperCase()!=="KE04"||bank.isLoading)return;
    const seeded=(bank.data??[]).filter(item=>
      item.course_id===course.id&&item.module_code==="KE04"&&item.source_type==="seed"&&item.seed_version==="v3"
    ).length;
    if(seeded>=780||seededCourseRef.current.has(course.id))return;
    seededCourseRef.current.add(course.id);
    setSeedingKe04(true);
    void ensureKe04QuestionBankSeed(course.id)
      .then(()=>bank.refetch())
      .catch(()=>seededCourseRef.current.delete(course.id))
      .finally(()=>setSeedingKe04(false));
  },[course,bank.data,bank.isLoading]);

  const simulation=useMemo(()=>course&&!scopeQ.isLoading?buildExamSimulationV5({
    course,
    topics:scopedTopics,
    questions:bank.data??[],
    attempts:attempts.data??[],
    mode,
  }):null,[course,scopedTopics,bank.data,attempts.data,mode,scopeQ.isLoading]);
  const resumable=useMemo(()=>(simulations.data??[]).find(row=>
    row.course_id===courseId&&row.mode===mode&&!row.completed_at
  )??null,[simulations.data,courseId,mode]);

  useEffect(()=>{
    if(!simulation||phase!=="select")return;
    setSelected(current=>current.filter(id=>simulation.tasks.some(t=>t.id===id)).slice(0,simulation.maxSelected));
  },[simulation,phase]);

  useEffect(()=>()=>{if(autosaveTimer.current!==null)window.clearTimeout(autosaveTimer.current);},[]);

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
    setSelected(current=>{
      if(current.includes(id))return current.filter(x=>x!==id);
      if(current.length>=simulation.maxSelected){
        toast.error("Tehtävien enimmäismäärä on jo valittu.");
        return current;
      }
      const task=simulation.tasks.find(candidate=>candidate.id===id);
      const currentPoints=simulation.tasks.filter(candidate=>current.includes(candidate.id)).reduce((sum,candidate)=>sum+candidate.points,0);
      if(!task||currentPoints+task.points>simulation.maxPoints){
        toast.error(`Valittujen tehtävien yhteispisteet eivät voi ylittää ${simulation.maxPoints} pistettä.`);
        return current;
      }
      return [...current,id];
    });
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
      const started=Date.now();
      setRowId(id);
      setStartedAt(started);
      setElapsed(0);
      setActiveIndex(0);
      setAnswers({});
      answersRef.current={};
      localStorage.setItem("opk.exam-simulation:"+id,JSON.stringify({answers:{},selected,activeIndex:0,startedAt:started}));
      setPhase("running");
    }catch{toast.error("Koetilaa ei voitu käynnistää.");}
  }

  function changeAnswer(task:ExamSimulationTaskV5,patch:Partial<AnswerState>){
    const next={
      ...answersRef.current,
      [task.id]:{text:"",sketch:"",...(answersRef.current[task.id]??{}),...patch},
    };
    answersRef.current=next;
    setAnswers(next);
    if(!rowId)return;
    localStorage.setItem("opk.exam-simulation:"+rowId,JSON.stringify({answers:next,selected,activeIndex,startedAt}));
    if(autosaveTimer.current!==null)window.clearTimeout(autosaveTimer.current);
    autosaveTimer.current=window.setTimeout(()=>{
      update.mutate({id:rowId,answers:next});
      autosaveTimer.current=null;
    },800);
  }

  function answerCompleted(taskId:string){
    const answer=answersRef.current[taskId]??answers[taskId];
    return Boolean(answer?.sketch)||answerHasContent(answer?.text??"");
  }

  function resumeSimulation(){
    if(!resumable)return;
    const localKey="opk.exam-simulation:"+resumable.id;
    let local:LocalExamDraft|null=null;
    try{local=JSON.parse(localStorage.getItem(localKey)??"null") as LocalExamDraft|null;}catch{local=null;}
    const persisted=(resumable.answers??{}) as Record<string,AnswerState>;
    const restored={...persisted,...(local?.answers??{})};
    const chosen=resumable.selected_task_ids??[];
    const tasks=(simulation?.tasks??[]).filter(task=>chosen.includes(task.id));
    const firstUnanswered=tasks.findIndex(task=>{
      const answer=restored[task.id];
      return !(Boolean(answer?.sketch)||answerHasContent(answer?.text??""));
    });
    const resumeIndex=firstUnanswered>=0?firstUnanswered:0;
    setRowId(resumable.id);
    setSelected(chosen);
    setAnswers(restored);
    answersRef.current=restored;
    setStartedAt(local?.startedAt??(resumable.started_at?Date.parse(resumable.started_at):Date.now()));
    setActiveIndex(local?.activeIndex??resumeIndex);
    setPhase("running");
  }

  function next(){
    if(rowId)localStorage.setItem("opk.exam-simulation:"+rowId,JSON.stringify({answers:answersRef.current,selected,activeIndex:Math.min(activeIndex+1,selectedTasks.length-1),startedAt}));
    if(activeIndex+1<selectedTasks.length){setActiveIndex(i=>i+1);return;}
    setPhase("review");
  }

  async function finishReview(){
    if(!simulation||!rowId||finishing)return;
    const completedTaskIds=selected.filter(answerCompleted);
    const review=reviewTaskSelectionV5({
      simulation,
      selectedTaskIds:selected,
      completedTaskIds,
      scores,
    });
    setFinishing(true);
    try{
      await update.mutateAsync({
        id:rowId,
        completed_task_ids:completedTaskIds,
        scores,
        answers:answersRef.current,
        completed_at:new Date().toISOString(),
        task_selection_note:review.note,
      });
      for(const task of selectedTasks.filter(task=>completedTaskIds.includes(task.id))){
        const item=(bank.data??[]).find(question=>question.id===task.id);
        if(!item||!task.topicId)continue;
        const earned=Math.max(0,Math.min(task.points,Number(scores[task.id]??0)));
        const ratio=task.points>0?earned/task.points:0;
        const answer=answersRef.current[task.id]??{text:"",sketch:""};
        await recordAttempt.mutateAsync({
          course_id:courseId,
          topic_id:task.topicId,
          attempt_type:"simulation",
          prompt:item.prompt,
          response:answerHasContent(answer.text)?answerPlainText(answer.text):answer.sketch?"[piirrosvastaus]":null,
          difficulty:item.difficulty,
          result:ratio>=.7?"independent":ratio>0?"hinted":"not_yet",
          confidence:null,
          hint_used:false,
          hints_used:0,
          source:"exam",
          skills:item.skills,
          expected_concepts:item.expected_concepts,
          question_bank_id:item.id,
          question_payload:{
            examSimulationId:rowId,
            questionBankId:item.id,
            examTransfer:true,
            transferLevel:6,
            pointsEarned:earned,
            pointsPossible:task.points,
            feedbackTiming:"after_block",
          },
        });
      }
      localStorage.removeItem("opk.exam-simulation:"+rowId);
      setPhase("done");
      toast.success("Koeharjoitus tallennettiin ja koetason osaamisnäyttö päivitettiin.");
    }catch{
      toast.error("Koetulosta ei voitu tallentaa kokonaan. Luonnos säilytettiin jatkamista varten.");
    }finally{setFinishing(false);}
  }

  function pauseExam(){
    if(rowId){
      localStorage.setItem("opk.exam-simulation:"+rowId,JSON.stringify({
        answers:answersRef.current,
        selected,
        activeIndex,
        startedAt,
      }));
      update.mutate({id:rowId,answers:answersRef.current});
    }
    setPhase("select");
  }

  function reset(){
    if(rowId)localStorage.removeItem("opk.exam-simulation:"+rowId);
    setSelected([]);setPhase("select");setRowId(null);setActiveIndex(0);setAnswers({});answersRef.current={};setScores({});setStartedAt(null);setElapsed(0);setFinishing(false);
  }

  if(!course)return <section className="panel p-4"><p className="text-sm text-muted-foreground">Lisää kurssi ennen koeharjoitusta.</p></section>;

  return <section className={"exam-simulation exam-simulation-"+phase+" panel p-4 sm:p-6"}>
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div><h2 className="text-base font-semibold sm:text-lg">YO / Abitti 2 -koeharjoitus</h2><p className="mt-1 text-sm text-muted-foreground">Tehtävävalinta, suljettu palaute, kaavat sekä piirros- ja kuvaajavastaukset samassa harjoituksessa.</p></div>
      {phase==="running"&&simulation&&<div className="flex items-center gap-2">
        <div className="rounded-xl bg-muted px-3 py-2 text-sm"><b>{Math.floor(elapsed/60)}:{String(elapsed%60).padStart(2,"0")}</b> / {simulation.durationMinutes} min</div>
        <button type="button" className={secondary} onClick={pauseExam}>Lopeta koe</button>
      </div>}
    </div>

    {phase==="select"&&<>
      {resumable&&<div className="mt-5 rounded-2xl border border-primary/30 bg-accent/50 p-4">
        <b>Kesken oleva koeharjoitus löytyi</b>
        <p className="mt-1 text-sm text-muted-foreground">Vastaukset tallennetaan automaattisesti. Voit jatkaa samasta kohdasta ilman, että luonnos katoaa.</p>
        <button className={primary+" mt-3"} onClick={resumeSimulation}>Jatka kesken jäänyttä koeharjoitusta</button>
      </div>}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">Kurssi<select className="mt-1 w-full rounded-xl border bg-surface p-3" value={courseId} onChange={e=>{setCourseId(e.target.value);setSelected([]);}}>{courses.filter(c=>!c.archived).map(c=><option key={c.id} value={c.id}>{c.code} · {c.name}</option>)}</select></label>
        <label className="text-sm font-medium">Tila<select className="mt-1 w-full rounded-xl border bg-surface p-3" value={mode} onChange={e=>{setMode(e.target.value as "practice"|"full");setSelected([]);}}><option value="full">Täysi koeharjoitus</option><option value="practice">Lyhyempi harjoitus</option></select></label>
      </div>
      {nextExam&&<div className="mt-4 rounded-xl border border-border bg-muted/40 p-3 text-sm"><b>{nextExam.name}</b> · {nextExam.date} · {examScopeLabel(scopeQ.data??[])}{scopeQ.data?.some(scope=>scope.confidence==="provisional")?" (ei vielä opettajan vahvistama)":""}. Koeharjoitus käyttää vain tämän alueen aiheita.</div>}
      {seedingKe04&&course?.code.toUpperCase()==="KE04"&&<div className="mt-5 rounded-xl bg-accent/50 p-3 text-sm">KE04:n kuratoitua V3-tehtäväpankkia alustetaan koeharjoitusta varten…</div>}
      {simulation?<div className="mt-5">
        <div className="rounded-xl bg-accent/50 p-3 text-sm">Tarjolla {simulation.maxTasks} tehtävää · valitse enintään {simulation.maxSelected} · enintään {simulation.maxPoints} p · {simulation.durationMinutes} min. Vihjeitä tai osaamisnäkymää ei näytetä kesken suorituksen.</div>
        <div className="mt-3 space-y-2">{simulation.tasks.map(task=><button type="button" key={task.id} aria-pressed={selected.includes(task.id)} onClick={()=>toggle(task.id)} className={"flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border p-3 text-left "+(selected.includes(task.id)?"border-primary bg-accent":"border-border bg-surface")}><span><b>{task.title}</b><small className="mt-1 block text-muted-foreground">{answerModeLabel(task.answerMode)} · {task.stimulus?"aineistotehtävä":"ei erillistä aineistoa"}</small></span><span className="font-semibold">{task.points} p</span></button>)}</div>
        <button disabled={!selected.length||create.isPending} className={primary+" mt-4"} onClick={()=>void start()}>Aloita valitut {selected.length} tehtävää</button>
      </div>:<p className="mt-4 text-sm text-muted-foreground">Tehtäväpankissa ei ole vielä tähän kurssiin soveltuvia tehtäviä.</p>}
    </>}

    {phase==="running"&&activeTask&&<>
      <div className="mt-5 rounded-2xl bg-muted/50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-primary">Tehtävä {activeIndex+1}/{selectedTasks.length} · {activeTask.points} p · {answerModeLabel(activeTask.answerMode)}</p><p className="mt-2 text-sm text-muted-foreground">Palaute ja oikeat vastaukset pysyvät piilossa koko valitun tehtäväkokonaisuuden ajan.</p></div>
      <div className="mt-4">
        <Stimulus value={activeTask.stimulus}/>
        <p className="mt-4 text-lg font-semibold">{(bank.data??[]).find(q=>q.id===activeTask.id)?.prompt??activeTask.title}</p>
      </div>
      {(activeTask.answerMode==="text"||activeTask.answerMode==="formula"||activeTask.answerMode==="mixed")&&<div className="mt-4"><AbittiAnswerEditor label="Vastaus" value={answers[activeTask.id]?.text??""} onChange={value=>changeAnswer(activeTask,{text:value})} minHeight={220}/></div>}
      {(activeTask.answerMode==="diagram"||activeTask.answerMode==="graph"||activeTask.answerMode==="mixed")&&<div className="mt-4"><SketchAnswerCanvas key={activeTask.id} mode={activeTask.answerMode==="graph"?"graph":"diagram"} value={answers[activeTask.id]?.sketch??""} onChange={value=>changeAnswer(activeTask,{sketch:value})}/></div>}
      <div className="mt-5 flex flex-wrap gap-2">
        {activeIndex>0&&<button className={secondary} onClick={()=>setActiveIndex(i=>Math.max(0,i-1))}>Edellinen</button>}
        <button className={primary} onClick={next}>{activeIndex+1===selectedTasks.length?"Päätä tehtäväkokonaisuus":"Seuraava tehtävä"}</button>
      </div>
    </>}

    {phase==="review"&&simulation&&<>
      <div className="mt-5 rounded-2xl bg-accent/50 p-4"><h3 className="font-semibold">Palaute avautuu vasta nyt</h3><p className="mt-1 text-sm text-muted-foreground">Arvioi pisteet tehtävä kerrallaan vasta koko tehtäväkokonaisuuden jälkeen. Tämä vaihe ei muuta alkuperäisiä vastauksia.</p></div>
      <div className="mt-4 space-y-4">{selectedTasks.map(task=>{const item=(bank.data??[]).find(q=>q.id===task.id);return <div key={task.id} className="rounded-2xl border border-border p-4">
        <div className="flex justify-between gap-3"><b>{task.title}</b><span>{task.points} p</span></div>
        <p className="mt-2 text-sm">{item?.prompt}</p>
        <div className="mt-3 rounded-xl border border-border bg-surface p-3 text-sm">
          <b>Oma vastauksesi</b>
          {answerHasContent(answers[task.id]?.text??"")&&<pre className="mt-2 whitespace-pre-wrap font-sans text-sm">{answerPlainText(answers[task.id]!.text)}</pre>}
          {answers[task.id]?.sketch&&<img src={answers[task.id]!.sketch} alt="Oma piirrosvastaus" className="mt-2 max-h-80 rounded-lg border border-border bg-white object-contain"/>}
          {!answerCompleted(task.id)&&<p className="mt-2 text-muted-foreground">Ei vastausta.</p>}
        </div>
        <details className="mt-3 rounded-xl bg-muted/50 p-3 text-sm"><summary className="cursor-pointer font-medium">Näytä mallipalaute</summary>{item?.correct_answer&&<p className="mt-2"><b>Oikea vastaus:</b> {item.correct_answer}</p>}<p className="mt-2 text-muted-foreground">{item?.explanation||"Ei erillistä mallipalautetta."}</p></details>
        <label className="mt-3 block text-sm font-medium">Pisteet<input type="number" min="0" max={task.points} className="mt-1 w-28 rounded-xl border bg-surface p-2" value={scores[task.id]??0} onChange={e=>setScores(current=>({...current,[task.id]:Math.max(0,Math.min(task.points,Number(e.target.value)||0))}))}/></label>
      </div>})}</div>
      <button disabled={update.isPending||recordAttempt.isPending||finishing} className={primary+" mt-4"} onClick={()=>void finishReview()}>{finishing?"Tallennetaan…":"Tallenna koeharjoitus"}</button>
    </>}

    {phase==="done"&&simulation&&<div className="mt-5"><div className="rounded-2xl bg-accent p-4"><h3 className="font-semibold">Koeharjoitus valmis</h3><p className="mt-2 text-sm text-muted-foreground">Pisteet {Object.values(scores).reduce((a,b)=>a+b,0)} / {selectedTasks.reduce((a,b)=>a+b.points,0)}. Vastatut tehtävät on tallennettu koetason osaamisnäytöksi. Tätä ei käytetä automaattisena arvosanaennusteena.</p></div><button className={secondary+" mt-4"} onClick={reset}>Uusi koeharjoitus</button></div>}
  </section>;
}