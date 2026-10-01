import { useEffect, useRef, useState } from "react";
import { Check, FileText, LoaderCircle, Pause, Play, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { LiquidGlass } from "@/components/LiquidGlass";
import { AbittiAnswerEditor, answerHasContent } from "@/components/AbittiAnswerEditor";
import {
  useCreateCourse,
  useLogSession,
  useCreateExam,
  useCreateMistake,
  useCreatePracticeTest,
  useUpdateCourse,
  useUpdateTopic,
  useCreateTopic,
  usePreferences,
  useUpsertPlanItem,
} from "@/lib/data";
import type { Course, Exam, PlanItem, PracticeAttempt, Session, Topic } from "@/lib/domain";
import { TARGET_SYSTEMS } from "@/lib/domain";
import { shortDate, today } from "@/lib/fi";
import { experimentVariantV4, sessionFatigueV4 } from "@/lib/learning-os-v4";
import { COURSE_TEMPLATES, parseTopicImport, topicsToImportText } from "@/lib/courseTemplates";
import { getDeviceAccessToken } from "@/lib/deviceSession";
import { relationLabel } from "@/lib/ui-fi";

import { Dialog, button, input, secondary } from "@/features/shared/DialogPrimitives";

export function SessionForm({item,courses,topics,sessions=[],attempts=[],presentation="dialog",onClose}:{item:PlanItem|null;courses:Course[];topics:Topic[];sessions?:Session[];attempts?:PracticeAttempt[];presentation?:"dialog"|"focus";onClose:()=>void}) {
 const initialCourse=item?.course_id??courses[0]?.id??"";
 const initialTopic=item?.topic_id??"";
 const [guided,setGuided]=useState(!!item);
 const [step,setStep]=useState(0);
 const [courseId,setCourseId]=useState(initialCourse),[topicId,setTopicId]=useState(initialTopic);
 const [seconds,setSeconds]=useState(0),[running,setRunning]=useState(false);
 const [timerMode,setTimerMode]=useState<"none"|"20"|"30"|"custom">(item?.target_minutes===20?"20":item?.target_minutes===30?"30":"none");
 const [customMinutes,setCustomMinutes]=useState(item?.target_minutes??30),[actualMinutes,setActualMinutes]=useState(item?.target_minutes??30);
 const [objective,setObjective]=useState(item?.title||""),[recall,setRecall]=useState(""),[retrievalCheck,setRetrievalCheck]=useState("");
 const [retrievalResult,setRetrievalResult]=useState<"independent"|"hinted"|"not_yet"|null>(null);
 const [retrievalConfidence,setRetrievalConfidence]=useState<number|null>(null);
 const [outcome,setOutcome]=useState<"yes"|"partial"|"not_yet"|null>(null);
 const [competence,setCompetence]=useState(3),[did,setDid]=useState(""),[unclear,setUnclear]=useState(""),[note,setNote]=useState("");
 const [method,setMethod]=useState("tehtävät"),[tasks,setTasks]=useState("");
 const log=useLogSession();
 const preferences=usePreferences();
 const experimentApplied=useRef(false);
 const course=courses.find(c=>c.id===courseId),topic=topics.find(t=>t.id===topicId);
 const fatigue=sessionFatigueV4(sessions,attempts);
 const sessionVariant=experimentVariantV4("session_length",today(),courseId+":"+(topicId||"general"));
 const experimentMinutes=sessionVariant==="A"?25:40;
 const targetMinutes=timerMode==="20"?20:timerMode==="30"?30:timerMode==="custom"?customMinutes:actualMinutes;
 const phaseGoal=item?.phase==="review"
   ?"Palauta ydinasia muistista ilman materiaalia."
   :item?.phase==="practice"
     ?"Ratkaise koetasoinen tehtävä ilman malliratkaisua."
     :"Pysty opiskelukerran jälkeen selittämään tai ratkaisemaan tavoite ilman mallia.";
 const retrievalPrompt=topic
   ? `Sulje materiaalit. Selitä tai ratkaise omin sanoin, mitä osaat nyt aiheesta “${topic.name}”.`
   : "Sulje materiaalit. Kirjoita tärkeimmät asiat, jotka pystyt nyt palauttamaan muistista.";

 useEffect(()=>{
   if(experimentApplied.current||preferences.data?.personal_experiments_enabled!==true)return;
   if(item?.target_minutes&&item.target_minutes<15)return;
   setTimerMode("custom");
   setCustomMinutes(experimentMinutes);
   experimentApplied.current=true;
 },[experimentMinutes,item?.target_minutes,preferences.data?.personal_experiments_enabled]);

 useEffect(()=>{if(!running)return;const id=window.setInterval(()=>setSeconds(v=>v+1),1000);return()=>window.clearInterval(id);},[running]);
 const timerTargetSeconds =
   timerMode==="20" ? 20*60 :
   timerMode==="30" ? 30*60 :
   timerMode==="custom" ? Math.max(1,customMinutes)*60 :
   null;
 const timerReached = timerTargetSeconds != null && seconds >= timerTargetSeconds;
 const fatigueThresholdMinutes=fatigue.preferredSessionMinutes??35;
 const liveFatigueNudge=
   running&&fatigue.level!=="none"&&seconds>=fatigueThresholdMinutes*60;

 function changeMode(next:boolean){
   setGuided(next);
   setStep(0);
   setRunning(false);
 }

 async function submitManual(e:React.FormEvent){
   e.preventDefault();if(!courseId)return;
   try{
     const result=await log.mutateAsync({
       course_id:courseId,topic_id:topicId||null,
       minutes:Math.max(1,actualMinutes),
       planned_minutes:item?.target_minutes??actualMinutes,
       kind:item?.kind==="review"?"review":item?.kind==="test"?"test":"study",
       competence,did,unclear,note,focus:null,energy:null,method,tasks,
       plan_item_id:item?.id??null
     });
     toast.success(result==="queued"?"Tallennettu paikallisesti · synkataan myöhemmin.":"Opiskelu kirjattu.");
     onClose();
   }catch{toast.error("Tallennus epäonnistui. Tiedot eivät katoa, jos yhteys katkesi.");}
 }

 async function submitGuided(){
   if(!courseId||!objective.trim()||!retrievalCheck.trim()||!retrievalResult||!outcome){
     toast.error("Täytä tavoite, muistista palauttamisen tarkistus ja lopputulos ennen tallennusta.");
     return;
   }
   const minutesUsed=timerMode==="none"
     ?Math.max(1,actualMinutes)
     :Math.max(1,Math.ceil(seconds/60));
   try{
     const result=await log.mutateAsync({
       course_id:courseId,topic_id:topicId||null,
       minutes:minutesUsed,
       planned_minutes:item?.target_minutes??targetMinutes,
       kind:item?.kind==="review"?"review":item?.kind==="test"?"test":"study",
       competence,did,unclear,note,focus:null,energy:null,
       method:method||"ohjattu opiskelukerta",tasks,
       plan_item_id:item?.id??null,
       objective:objective.trim(),
       recall:recall.trim()||null,
       retrieval_check:retrievalCheck.trim(),
       retrieval_result:retrievalResult,
       retrieval_confidence:retrievalConfidence,
       outcome,
     });
     toast.success(result==="queued"?"Opiskelukerta tallennettu paikallisesti.":"Opiskelukerta tallennettu.");
     onClose();
   }catch{toast.error("Opiskelukertaa ei voitu tallentaa. Tiedot eivät katoa, jos yhteys katkesi.");}
 }

 const timerDisplay=`${String(Math.floor(seconds/3600)).padStart(2,"0")}:${String(Math.floor(seconds/60)%60).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`;

 const body = <>
   {presentation==="dialog"&&<div className="mb-5 flex rounded-xl bg-muted p-1">
     <button type="button" onClick={()=>changeMode(true)} className={`min-h-10 flex-1 rounded-lg px-3 text-sm ${guided?"bg-surface font-semibold shadow-sm":""}`}>Ohjattu opiskelukerta</button>
     <button type="button" onClick={()=>changeMode(false)} className={`min-h-10 flex-1 rounded-lg px-3 text-sm ${!guided?"bg-surface font-semibold shadow-sm":""}`}>Nopea kirjaus</button>
   </div>}

   {!guided?<form onSubmit={submitManual} className="space-y-4">
     <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-medium">Kurssi<select className={input} value={courseId} onChange={e=>{setCourseId(e.target.value);setTopicId("");}}>{courses.map(c=><option key={c.id} value={c.id}>{c.code} · {c.name}</option>)}</select></label><label className="text-sm font-medium">Aihe<select className={input} value={topicId} onChange={e=>setTopicId(e.target.value)}><option value="">Yleinen opiskelu</option>{topics.filter(t=>t.course_id===courseId).map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></label></div>
     <label className="block text-sm font-medium">Todellinen kesto minuutteina<input type="number" min="1" max="1440" required value={actualMinutes} onChange={e=>setActualMinutes(Number(e.target.value))} className={input}/></label>
     <label className="block text-sm font-medium">Mitä teit?<textarea className={input} rows={2} value={did} onChange={e=>setDid(e.target.value)}/></label>
     <fieldset><legend className="mb-2 text-sm font-medium">Oma arvio osaamisesta 1–5 <span className="font-normal text-muted-foreground">(ei nosta osaamistasoa)</span></legend><div className="flex gap-2">{[1,2,3,4,5].map(n=><button type="button" key={n} aria-pressed={competence===n} onClick={()=>setCompetence(n)} className={`grid size-11 place-items-center rounded-xl border ${competence===n?"border-primary bg-accent font-semibold":"border-border"}`}>{n}</button>)}</div></fieldset>
     <label className="block text-sm font-medium">Mikä jäi epäselväksi?<textarea className={input} rows={2} value={unclear} onChange={e=>setUnclear(e.target.value)}/></label>
     <details className="rounded-2xl border border-border p-4"><summary className="cursor-pointer text-sm font-medium">Lisätiedot</summary><div className="mt-4 space-y-4"><label className="block text-sm font-medium">Menetelmä<select className={input} value={method} onChange={e=>setMethod(e.target.value)}><option value="tehtävät">Tehtävät</option><option value="aktiivinen palautus">Aktiivinen palautus</option><option value="muistiinpanot">Muistiinpanot</option><option value="lukeminen">Lukeminen</option><option value="harjoituskoe">Harjoituskoe</option><option value="muu">Muu</option></select></label><label className="block text-sm font-medium">Tehtävät<input className={input} value={tasks} onChange={e=>setTasks(e.target.value)}/></label><label className="block text-sm font-medium">Muistiinpano<textarea className={input} rows={3} value={note} onChange={e=>setNote(e.target.value)}/></label></div></details>
     <button type="submit" disabled={log.isPending} className={button+" w-full"}><Check size={18}/>{log.isPending?"Tallennetaan…":"Tallenna"}</button>
   </form>:<div className="space-y-5">
     <div className="flex items-center gap-2" aria-label="Opiskelukerran vaiheet">{["Tavoite","Muistelu","Harjoittelu","Palautus","Yhteenveto"].map((label,index)=><div key={label} className="flex-1"><div className={`h-1.5 rounded-full ${index<=step?"bg-primary":"bg-muted"}`}/><span className="mt-1 hidden text-[10px] text-muted-foreground sm:block">{label}</span></div>)}</div>

     {step===0&&<>
       {item&&<div className="rounded-2xl bg-muted/60 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-primary">{course?.code} · {item.target_minutes} min</p><h3 className="mt-1 text-lg font-semibold">{item.title||topic?.name||"Opiskelu"}</h3><p className="mt-1 text-sm text-muted-foreground">{phaseGoal}</p></div>}
       <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-medium">Kurssi<select disabled={!!item} className={input} value={courseId} onChange={e=>{setCourseId(e.target.value);setTopicId("");}}>{courses.map(c=><option key={c.id} value={c.id}>{c.code} · {c.name}</option>)}</select></label><label className="text-sm font-medium">Aihe<select disabled={!!item?.topic_id} className={input} value={topicId} onChange={e=>setTopicId(e.target.value)}><option value="">Yleinen opiskelu</option>{topics.filter(t=>t.course_id===courseId).map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></label></div>
       <label className="block text-sm font-medium">Opiskelukerran tavoite<textarea rows={2} className={input} value={objective} onChange={e=>setObjective(e.target.value)} placeholder={phaseGoal}/></label>
       <div><p className="mb-2 text-sm font-medium">Ajastin</p><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{([["none","Ei ajastinta"],["20","20 min"],["30","30 min"],["custom","Oma aika"]] as const).map(([value,label])=><button type="button" key={value} aria-pressed={timerMode===value} onClick={()=>setTimerMode(value)} className={timerMode===value?button:secondary}>{label}</button>)}</div>{timerMode==="custom"&&<label className="mt-3 block text-sm font-medium">Oma aika<input type="number" min="5" max="240" className={input} value={customMinutes} onChange={e=>setCustomMinutes(Number(e.target.value))}/></label>}</div>
     </>}

     {step===1&&<div className="space-y-4"><div><p className="text-sm font-medium text-primary">Muistelu alkuun</p><h3 className="mt-1 text-xl font-semibold">Ennen kuin avaat materiaalin</h3><p className="mt-2 text-sm text-muted-foreground">Kirjoita 2–3 asiaa, jotka muistat aiheesta jo nyt. Tyhjäkin kohta on hyödyllinen havainto, ei epäonnistuminen.</p></div><AbittiAnswerEditor autoFocus label="Muistista palautus" value={recall} onChange={setRecall} placeholder="Mitä muistat ilman muistiinpanoja?" minHeight={170}/></div>}

     {step===2&&<div className="space-y-4"><div><p className="text-sm font-medium text-primary">Opiskele ja harjoittele</p><h3 className="mt-1 text-xl font-semibold">{objective||phaseGoal}</h3><p className="mt-2 text-sm text-muted-foreground">Opiskele, ratkaise tehtäviä ja käytä materiaalia normaalisti. Ajastin on vain apuväline.</p></div>{timerMode!=="none"?<div className="rounded-2xl bg-muted p-5 text-center"><p role="timer" className="text-5xl font-semibold tabular-nums">{timerDisplay}</p><p className="mt-2 text-sm text-muted-foreground">Tavoite {timerMode==="custom"?customMinutes:Number(timerMode)} min{timerReached?" · tavoiteaika täynnä, voit jatkaa":""}</p>{preferences.data?.personal_experiments_enabled&&timerMode==="custom"&&customMinutes===experimentMinutes&&<p className="mt-1 text-xs text-muted-foreground">Oppimiskokeilu · tämän päivän vaihtoehto {experimentMinutes} min</p>}{liveFatigueNudge&&<div className="mt-4 rounded-xl border border-border bg-surface p-3 text-left text-sm"><b>Hyvä kohta tauolle tai muistista palauttamisen tarkistukseen.</b><p className="mt-1 text-muted-foreground">{fatigue.reason}</p>{fatigue.suggestedBreakMinutes>0&&<small className="mt-1 block text-muted-foreground">Ehdotettu tauko noin {fatigue.suggestedBreakMinutes} min.</small>}</div>}<button type="button" className={secondary+" mt-4"} onClick={()=>setRunning(v=>!v)}>{running?<><Pause size={17}/>Tauko</>:<><Play size={17}/>Aloita / jatka</>}</button></div>:<label className="block text-sm font-medium">Todellinen kesto minuutteina<input type="number" min="1" max="240" className={input} value={actualMinutes} onChange={e=>setActualMinutes(Number(e.target.value))}/></label>}<label className="block text-sm font-medium">Mitä teit?<textarea rows={3} className={input} value={did} onChange={e=>setDid(e.target.value)} placeholder="Esim. tehtävät 4.12–4.18"/></label></div>}

     {step===3&&<div className="space-y-4"><div><p className="text-sm font-medium text-primary">Muistista palauttamisen tarkistus</p><h3 className="mt-1 text-xl font-semibold">Sulje materiaali</h3><p className="mt-2 text-sm text-muted-foreground">{retrievalPrompt}</p></div><AbittiAnswerEditor autoFocus label="Vastaus muistista" value={retrievalCheck} onChange={setRetrievalCheck} placeholder="Vastaa muistista…" minHeight={170}/><p className="text-xs text-muted-foreground">Älä arvioi vielä omaa varmuuttasi. Tee ensin yritys, sitten merkitse miten se onnistui.</p></div>}

     {step===4&&<div className="space-y-5"><div><p className="text-sm font-medium text-primary">Yhteenveto</p><h3 className="mt-1 text-xl font-semibold">Mitä tästä opiskelukerrasta jäi käteen?</h3></div>
       <fieldset><legend className="mb-2 text-sm font-medium">Muistista palauttamisen tarkistus onnistui</legend><div className="grid gap-2 sm:grid-cols-3">{([["independent","Itsenäisesti"],["hinted","Vihjeellä"],["not_yet","Ei vielä"]] as const).map(([value,label])=><button type="button" key={value} aria-pressed={retrievalResult===value} onClick={()=>setRetrievalResult(value)} className={retrievalResult===value?button:secondary}>{label}</button>)}</div></fieldset>
       <fieldset><legend className="mb-2 text-sm font-medium">Kuinka varma olit? <span className="font-normal text-muted-foreground">(kalibrointia, ei osaamispisteitä)</span></legend><div className="grid grid-cols-3 gap-2">{[[1,"Epävarma"],[2,"Melko varma"],[3,"Varma"]].map(([value,label])=><button type="button" key={value} aria-pressed={retrievalConfidence===value} onClick={()=>setRetrievalConfidence(Number(value))} className={retrievalConfidence===value?button:secondary}>{label}</button>)}</div></fieldset>
       <fieldset><legend className="mb-2 text-sm font-medium">Tavoite saavutettu?</legend><div className="grid grid-cols-3 gap-2">{([["yes","Kyllä"],["partial","Osittain"],["not_yet","Ei vielä"]] as const).map(([value,label])=><button type="button" key={value} aria-pressed={outcome===value} onClick={()=>setOutcome(value)} className={outcome===value?button:secondary}>{label}</button>)}</div></fieldset>
       <fieldset><legend className="mb-2 text-sm font-medium">Oma yleisarvio 1–5 <span className="font-normal text-muted-foreground">(vain kalibrointiin)</span></legend><div className="flex gap-2">{[1,2,3,4,5].map(n=><button type="button" key={n} aria-pressed={competence===n} onClick={()=>setCompetence(n)} className={`grid size-11 place-items-center rounded-xl border ${competence===n?"border-primary bg-accent font-semibold":"border-border"}`}>{n}</button>)}</div></fieldset>
       <label className="block text-sm font-medium">Mikä jäi epäselväksi?<textarea rows={2} className={input} value={unclear} onChange={e=>setUnclear(e.target.value)}/></label>
       <button type="button" disabled={log.isPending||!retrievalResult||!outcome||!answerHasContent(retrievalCheck)} className={button+" w-full"} onClick={()=>void submitGuided()}><Check size={18}/>{log.isPending?"Tallennetaan…":"Lopeta ja tallenna"}</button>
     </div>}

     <div className="flex items-center justify-between gap-3 border-t border-border pt-4">{step>0?<button type="button" className={secondary} onClick={()=>{setRunning(false);setStep(v=>Math.max(0,v-1));}}>Takaisin</button>:<span/>}{step<4&&<button type="button" className={button} disabled={step===0&&!objective.trim()||step===3&&!answerHasContent(retrievalCheck)} onClick={()=>{setRunning(false);setStep(v=>Math.min(4,v+1));}}>Jatka</button>}</div>
   </div>}
 </>;
 const title=guided?"Ohjattu opiskelukerta":"Kirjaa opiskelu";
 if(presentation==="focus"){
   return <div className="study-session-focus" role="dialog" aria-modal="true" aria-label={title}>
     <header className="study-session-focus-header">
       <div className="min-w-0">
         <p className="text-xs font-semibold uppercase tracking-wide text-primary">{course?.code??"Opiskelukerta"}</p>
         <h1 className="mt-1 truncate text-xl font-semibold">{item?.title||topic?.name||title}</h1>
       </div>
       <button type="button" className={secondary+" shrink-0"} onClick={()=>{setRunning(false);onClose();}}><X size={17}/>Lopeta opiskelukerta</button>
     </header>
     <main className="study-session-focus-main">{body}</main>
   </div>;
 }
 return <Dialog title={title} onClose={onClose}>{body}</Dialog>;
}
