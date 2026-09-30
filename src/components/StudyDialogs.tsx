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

const input = "mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring";
const button = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-primary-foreground disabled:opacity-50";
const secondary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4";
function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
 const ref = useRef<HTMLDivElement>(null);
 const close = useRef(onClose);
 close.current = onClose;
 useEffect(() => {
   const previous = document.activeElement as HTMLElement | null;
   const focusable = () => [...(ref.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]') ?? [])];
   focusable()[0]?.focus();
   function trap(e: KeyboardEvent) {
     if (e.key === "Escape") { e.stopPropagation(); close.current(); }
     if (e.key !== "Tab") return;
     const elements = focusable(), first = elements[0], last = elements[elements.length - 1];
     if (!first || !last) return;
     if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
     else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
   }
   document.addEventListener("keydown", trap);
   return () => { document.removeEventListener("keydown", trap); previous?.focus(); };
 }, []);
 return <div ref={ref} className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
  <LiquidGlass lensing variant="thick" role="dialog" aria-modal="true" aria-label={title} className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl p-5 shadow-2xl sm:rounded-3xl sm:p-7">
   <div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-semibold">{title}</h2><button type="button" aria-label="Sulje" className={secondary+" !size-11 !p-0"} onClick={onClose}><X size={18}/></button></div>{children}
  </LiquidGlass>
 </div>;
}
export function SessionForm({item,courses,topics,sessions=[],attempts=[],onClose}:{item:PlanItem|null;courses:Course[];topics:Topic[];sessions?:Session[];attempts?:PracticeAttempt[];onClose:()=>void}) {
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

 return <Dialog title={guided?"Ohjattu opiskelukerta":"Kirjaa opiskelu"} onClose={onClose}>
   <div className="mb-5 flex rounded-xl bg-muted p-1">
     <button type="button" onClick={()=>changeMode(true)} className={`min-h-10 flex-1 rounded-lg px-3 text-sm ${guided?"bg-surface font-semibold shadow-sm":""}`}>Ohjattu opiskelukerta</button>
     <button type="button" onClick={()=>changeMode(false)} className={`min-h-10 flex-1 rounded-lg px-3 text-sm ${!guided?"bg-surface font-semibold shadow-sm":""}`}>Nopea kirjaus</button>
   </div>

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
 </Dialog>;
}

export function CourseForm({onClose}:{onClose:()=>void}) {
 const [templateId,setTemplateId]=useState("blank"),[code,setCode]=useState(""),[name,setName]=useState(""),[subject,setSubject]=useState(""),[start,setStart]=useState(today()),[exam,setExam]=useState(""),[weekly,setWeekly]=useState(180),[targetSystem,setTargetSystem]=useState("school"),[targetValue,setTargetValue]=useState("10"),[color,setColor]=useState("sage"),[studyMode,setStudyMode]=useState("course"),[raw,setRaw]=useState("");
 const [structureFile,setStructureFile]=useState<File|null>(null),[structureBusy,setStructureBusy]=useState(false),[structureProvider,setStructureProvider]=useState("");
 const [dependencySuggestions,setDependencySuggestions]=useState<Array<{sourceName:string;targetName:string;relationType:"prerequisite"|"depends_on"|"builds_on"|"related_to"|"commonly_confused_with"}>>([]);
 const create=useCreateCourse();
 async function analyzeCourseStructure(){
   if(!raw.trim()&&!structureFile)return;
   const token=getDeviceAccessToken();
   if(!token){toast.error("Kirjautuminen on vanhentunut. Avaa sovellus uudelleen.");return;}
   setStructureBusy(true);
   try{
     let fileData:string|undefined,mimeType:string|undefined,text=raw.trim();
     if(structureFile){
       mimeType=structureFile.type||(structureFile.name.toLowerCase().endsWith(".pdf")?"application/pdf":"text/plain");
       if(mimeType==="application/pdf"){
         const dataUrl=await new Promise<string>((resolve,reject)=>{
           const reader=new FileReader();
           reader.onload=()=>resolve(String(reader.result??""));
           reader.onerror=()=>reject(reader.error??new Error("Tiedostoa ei voitu lukea."));
           reader.readAsDataURL(structureFile);
         });
         fileData=dataUrl.split(",")[1];
       }else{
         text=[text,await structureFile.text()].filter(Boolean).join("\n\n");
       }
     }
     const response=await fetch("/api/ai/course-structure",{
       method:"POST",
       headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},
       body:JSON.stringify({code,name,subject,text,mimeType,fileData}),
     });
     const payload=await response.json() as {
       topics?:Array<{name:string;weight:number;importance:number;materials:string|null}>;
       dependencies?:Array<{sourceName:string;targetName:string;relationType:"prerequisite"|"depends_on"|"builds_on"|"related_to"|"commonly_confused_with"}>;
       provider?:string;
       error?:string;
     };
     if(!response.ok)throw new Error(payload.error??"Materiaalia ei voitu jäsentää.");
     if(!payload.topics?.length)throw new Error("Materiaalista ei löytynyt vielä hyväksyttävää aihelistaa.");
     setRaw(topicsToImportText(payload.topics));
     setDependencySuggestions(payload.dependencies??[]);
     setStructureProvider(payload.provider??"local");
     toast.success("Aihe- ja dependency-ehdotus valmis. Tarkista se ennen tallennusta.");
   }catch(error){
     toast.error(error instanceof Error?error.message:"Materiaalia ei voitu jäsentää.");
   }finally{setStructureBusy(false);}
 }

 function applyTemplate(id:string){
   const t=COURSE_TEMPLATES.find(x=>x.id===id)??COURSE_TEMPLATES[0];
   if(!t)return;
   setTemplateId(id);setCode(t.code);setName(t.name);setSubject(t.subject);setWeekly(t.weekly_minutes);setTargetSystem(t.target_system);setTargetValue(t.target_value);setColor(t.color);setStudyMode(t.study_mode);setRaw(topicsToImportText(t.topics));
 }
 return <Dialog title="Lisää kurssi" onClose={onClose}><form className="space-y-4" onSubmit={async e=>{e.preventDefault();try{const parsed=parseTopicImport(raw);await create.mutateAsync({code:code.trim(),name:name.trim(),subject:subject.trim(),start_date:start||null,exam_date:exam||null,weekly_minutes:weekly,target_system:targetSystem,target_value:targetValue||null,color,study_mode:studyMode,topics:parsed,dependency_suggestions:dependencySuggestions.map(row=>({source_name:row.sourceName,target_name:row.targetName,relation_type:row.relationType}))});toast.success("Kurssi lisätty.");onClose();}catch{toast.error("Kurssia ei voitu tallentaa.");}}}>
 <div><p className="mb-2 text-sm font-medium">Pohja</p><div className="grid gap-2 sm:grid-cols-3">{COURSE_TEMPLATES.map(t=><button type="button" key={t.id} aria-pressed={templateId===t.id} onClick={()=>applyTemplate(t.id)} className={`min-h-11 rounded-xl border px-3 text-left text-sm ${templateId===t.id?"border-primary bg-accent":"border-border"}`}>{t.label}</button>)}</div></div>
 <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium">Kurssikoodi<input className={input} required value={code} onChange={e=>setCode(e.target.value)} placeholder="esim. FY04"/></label><label className="block text-sm font-medium">Oppiaine<input className={input} value={subject} onChange={e=>setSubject(e.target.value)}/></label></div>
 <label className="block text-sm font-medium">Kurssin nimi<input className={input} required value={name} onChange={e=>setName(e.target.value)}/></label>
 <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium">Aloituspäivä<input type="date" className={input} value={start} onChange={e=>setStart(e.target.value)}/></label><label className="block text-sm font-medium">Koepäivä<input type="date" className={input} value={exam} onChange={e=>setExam(e.target.value)}/></label></div>
 <div className="grid gap-3 sm:grid-cols-3"><label className="block text-sm font-medium">Viikkotavoite (min)<input type="number" min="0" step="15" className={input} value={weekly} onChange={e=>setWeekly(Number(e.target.value))}/></label><label className="block text-sm font-medium">Väri<select className={input} value={color} onChange={e=>setColor(e.target.value)}><option value="sage">Salvia</option><option value="forest">Metsä</option><option value="blue">Sininen</option><option value="violet">Violetti</option><option value="amber">Meripihka</option></select></label><label className="block text-sm font-medium">Opiskelutapa<select className={input} value={studyMode} onChange={e=>setStudyMode(e.target.value)}><option value="course">Kurssi</option><option value="exam">Koepainotteinen</option><option value="self">Itsenäinen</option></select></label></div>
 <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium">Tavoite<select className={input} value={targetSystem} onChange={e=>setTargetSystem(e.target.value)}>{TARGET_SYSTEMS.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select></label><label className="block text-sm font-medium">Tavoitearvo<input className={input} value={targetValue} onChange={e=>setTargetValue(e.target.value)} placeholder="esim. L tai 10"/></label></div>
 <label className="block text-sm font-medium">Aiheet nopeasti<textarea rows={8} className={input} value={raw} onChange={e=>{setRaw(e.target.value);setDependencySuggestions([]);setStructureProvider("");}} placeholder={"Aihe | paino | tärkeys | materiaali\nStoikiometria | 10 | 5 | s. 14–35"}/><span className="mt-1 block text-xs text-muted-foreground">Muoto: Aihe | paino | tärkeys | materiaali. Painot normalisoidaan automaattisesti 100 pisteeseen.</span></label>
 <section className="rounded-2xl border border-border bg-muted/40 p-4">
   <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold">Materiaalin automaattinen jäsennys</p><p className="mt-1 text-xs text-muted-foreground">Liitä raakateksti yllä tai valitse PDF/txt. Ehdotus ei tallennu ennen kuin hyväksyt koko kurssin.</p></div><Upload size={17} className="text-muted-foreground"/></div>
   <input type="file" accept=".pdf,.txt,.md,application/pdf,text/plain" className="mt-3 block min-h-11 w-full rounded-xl border bg-surface p-2 text-sm" onChange={e=>setStructureFile(e.target.files?.[0]??null)}/>
   <button type="button" className={secondary+" mt-3"} disabled={structureBusy||(!raw.trim()&&!structureFile)} onClick={()=>void analyzeCourseStructure()}>{structureBusy?<LoaderCircle className="animate-spin" size={16}/>:<FileText size={16}/>}Ehdota aiheet ja niiden yhteydet</button>
   {structureProvider&&<p className="mt-2 text-xs text-muted-foreground">Ehdotus: {structureProvider==="gemini"?"Gemini":"paikallinen varamenetelmä"} · {dependencySuggestions.length} aiheyhteyttä. Tarkista aihelista yllä.</p>}
   {dependencySuggestions.length>0&&<details className="mt-3 rounded-xl bg-surface p-3 text-sm"><summary className="cursor-pointer font-medium">Dependency-ehdotukset ({dependencySuggestions.length})</summary><div className="mt-2 space-y-1">{dependencySuggestions.slice(0,20).map((row,index)=><p key={index} className="text-xs text-muted-foreground">{row.sourceName} <b>{row.relationType}</b> {row.targetName}</p>)}</div></details>}
 </section>
 <button className={button+" w-full"} disabled={create.isPending}>Tallenna kurssi</button></form></Dialog>;
}

export function CourseEditForm({course,onClose}:{course:Course;onClose:()=>void}) {
 const [code,setCode]=useState(course.code),[name,setName]=useState(course.name),[subject,setSubject]=useState(course.subject??""),[start,setStart]=useState(course.start_date??""),[exam,setExam]=useState(course.exam_date??""),[weekly,setWeekly]=useState(course.weekly_minutes),[targetSystem,setTargetSystem]=useState(course.target_system),[targetValue,setTargetValue]=useState(course.target_value??""),[color,setColor]=useState(course.color),[studyMode,setStudyMode]=useState(course.study_mode);
 const update=useUpdateCourse();
 return <Dialog title="Muokkaa kurssia" onClose={onClose}><form className="space-y-4" onSubmit={async e=>{e.preventDefault();try{await update.mutateAsync({id:course.id,code:code.trim(),name:name.trim(),subject:subject.trim()||null,start_date:start||null,exam_date:exam||null,weekly_minutes:weekly,target_system:targetSystem,target_value:targetValue||null,color,study_mode:studyMode});toast.success("Kurssi päivitetty.");onClose();}catch{toast.error("Kurssin päivitys epäonnistui.");}}}>
 <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium">Kurssikoodi<input className={input} required value={code} onChange={e=>setCode(e.target.value)}/></label><label className="block text-sm font-medium">Oppiaine<input className={input} value={subject} onChange={e=>setSubject(e.target.value)}/></label></div>
 <label className="block text-sm font-medium">Nimi<input className={input} required value={name} onChange={e=>setName(e.target.value)}/></label>
 <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium">Aloituspäivä<input type="date" className={input} value={start} onChange={e=>setStart(e.target.value)}/></label><label className="block text-sm font-medium">Koepäivä<input type="date" className={input} value={exam} onChange={e=>setExam(e.target.value)}/></label></div>
 <div className="grid gap-3 sm:grid-cols-3"><label className="block text-sm font-medium">Viikkotavoite (min)<input type="number" min="0" step="15" className={input} value={weekly} onChange={e=>setWeekly(Number(e.target.value))}/></label><label className="block text-sm font-medium">Väri<select className={input} value={color} onChange={e=>setColor(e.target.value)}><option value="sage">Salvia</option><option value="forest">Metsä</option><option value="blue">Sininen</option><option value="violet">Violetti</option><option value="amber">Meripihka</option></select></label><label className="block text-sm font-medium">Opiskelutapa<select className={input} value={studyMode} onChange={e=>setStudyMode(e.target.value)}><option value="course">Kurssi</option><option value="exam">Koepainotteinen</option><option value="self">Itsenäinen</option></select></label></div>
 <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium">Tavoite<select className={input} value={targetSystem} onChange={e=>setTargetSystem(e.target.value)}>{TARGET_SYSTEMS.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select></label><label className="block text-sm font-medium">Tavoitearvo<input className={input} value={targetValue} onChange={e=>setTargetValue(e.target.value)}/></label></div>
 <button className={button+" w-full"} disabled={update.isPending}>Tallenna muutokset</button></form></Dialog>;
}

export function TopicForm({courseId,topic,onClose}:{courseId:string;topic?:Topic;onClose:()=>void}) {
 const [name,setName]=useState(topic?.name??""),[materials,setMaterials]=useState(topic?.materials??""),[importance,setImportance]=useState(topic?.importance??3),[weight,setWeight]=useState(Number(topic?.weight??1));
 const update=useUpdateTopic(),create=useCreateTopic();
 return <Dialog title={topic?"Muokkaa aihetta":"Lisää aihe"} onClose={onClose}><form className="space-y-4" onSubmit={async e=>{e.preventDefault();try{if(topic)await update.mutateAsync({id:topic.id,name:name.trim(),materials:materials.trim()||null,importance,weight});else await create.mutateAsync({course_id:courseId,name:name.trim(),materials:materials.trim()||null,importance,weight});toast.success(topic?"Aihe päivitetty.":"Aihe lisätty.");onClose();}catch{toast.error("Aihetta ei voitu tallentaa.");}}}>
 <label className="block text-sm font-medium">Aiheen nimi<input className={input} required value={name} onChange={e=>setName(e.target.value)}/></label>
 <label className="block text-sm font-medium">Materiaali / sivut<input className={input} value={materials} onChange={e=>setMaterials(e.target.value)}/></label>
 <div className="grid grid-cols-2 gap-3"><label className="block text-sm font-medium">Tärkeys 1–5<input type="number" min="1" max="5" className={input} value={importance} onChange={e=>setImportance(Number(e.target.value))}/></label><label className="block text-sm font-medium">Paino<input type="number" min="0" step="0.5" className={input} value={weight} onChange={e=>setWeight(Number(e.target.value))}/></label></div>
 <button className={button+" w-full"} disabled={update.isPending||create.isPending}>Tallenna</button></form></Dialog>;
}

export function TaskForm({courses,topics,date,onClose}:{courses:Course[];topics:Topic[];date:string;onClose:()=>void}) {
 const [courseId,setCourseId]=useState(courses[0]?.id??""),[topicId,setTopicId]=useState(""),[taskDate,setTaskDate]=useState(date),[title,setTitle]=useState(""),[minutes,setMinutes]=useState(30);
 const upsert=useUpsertPlanItem();
 return <Dialog title="Lisää opiskelutehtävä" onClose={onClose}><form className="space-y-4" onSubmit={async e=>{e.preventDefault();if(!courseId)return;try{const result=await upsert.mutateAsync({course_id:courseId,topic_id:topicId||null,date:taskDate,title:title.trim()||topics.find(t=>t.id===topicId)?.name||"Oma opiskelutehtävä",target_minutes:minutes,min_minutes:Math.max(10,Math.round(minutes*.6)),extra_minutes:Math.round(minutes*.3),kind:"study",phase:"content",start_time:null});toast.success(result==="queued"?"Tehtävä tallennettu paikallisesti · synkataan myöhemmin.":"Tehtävä lisätty.");onClose();}catch{toast.error("Tehtävää ei voitu lisätä.");}}}>
 <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium">Kurssi<select className={input} value={courseId} onChange={e=>{setCourseId(e.target.value);setTopicId("");}}>{courses.map(c=><option key={c.id} value={c.id}>{c.code} · {c.name}</option>)}</select></label><label className="block text-sm font-medium">Päivä<input type="date" className={input} value={taskDate} onChange={e=>setTaskDate(e.target.value)}/></label></div>
 <label className="block text-sm font-medium">Aihe<select className={input} value={topicId} onChange={e=>setTopicId(e.target.value)}><option value="">Ei tiettyä aihetta</option>{topics.filter(t=>t.course_id===courseId).map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></label>
 <label className="block text-sm font-medium">Tehtävän nimi<input className={input} value={title} onChange={e=>setTitle(e.target.value)} placeholder="esim. Luku 4 + tehtävät"/></label>
 <label className="block text-sm font-medium">Tavoiteaika (min)<input type="number" min="5" step="5" className={input} value={minutes} onChange={e=>setMinutes(Number(e.target.value))}/></label>
 <button className={button+" w-full"} disabled={upsert.isPending}>Lisää suunnitelmaan</button></form></Dialog>;
}

export function SearchPanel({courses,topics,exams,sessions,onClose,onNavigate,onCourse,onLog}:{courses:Course[];topics:Topic[];exams:Exam[];sessions:Session[];onClose:()=>void;onNavigate:(page:string)=>void;onCourse:(id:string)=>void;onLog:()=>void}) {
 const [q,setQ]=useState("");
 const listRef=useRef<HTMLDivElement>(null);
 const normalized=q.trim().toLowerCase();
 const sessionHits=normalized?sessions.filter(s=>[(s.note??""),(s.did??""),(s.unclear??""),(s.tasks??""),(s.method??"")].join(" ").toLowerCase().includes(normalized)).slice(0,8):[];
 function moveFocus(direction:1|-1){
   const buttons=[...(listRef.current?.querySelectorAll<HTMLButtonElement>("button[data-command-result]")??[])];
   if(!buttons.length)return;
   const index=buttons.indexOf(document.activeElement as HTMLButtonElement);
   const next=index<0?(direction===1?0:buttons.length-1):(index+direction+buttons.length)%buttons.length;
   buttons[next]?.focus();
 }
 const commandProps={ "data-command-result": true } as const;
 return <Dialog title="Haku ja pikatoiminnot" onClose={onClose}><input autoFocus className={input} aria-label="Hae" placeholder="Hae kurssia, aihetta, opiskelukertaa, muistiinpanoa tai koetta…" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==="ArrowDown"){e.preventDefault();moveFocus(1);}else if(e.key==="ArrowUp"){e.preventDefault();moveFocus(-1);}}}/><div ref={listRef} className="mt-4 max-h-96 space-y-1 overflow-y-auto" onKeyDown={e=>{if(e.key==="ArrowDown"){e.preventDefault();moveFocus(1);}else if(e.key==="ArrowUp"){e.preventDefault();moveFocus(-1);}}}>
 <button {...commandProps} className="block min-h-11 w-full rounded-xl px-3 text-left hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring" onClick={onLog}>+ Kirjaa opiskelu</button>
 {[["today","Tänään"],["plan","Suunnitelma"],["courses","Opinnot"],["practice","Harjoittelu"],["progress","Edistyminen"],["exams","Kokeet"]].map(([id,label])=><button {...commandProps} key={id} className="block min-h-11 w-full rounded-xl px-3 text-left hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring" onClick={()=>onNavigate(id ?? "today")}>{label}</button>)}
 {courses.filter(c=>(c.code+" "+c.name).toLowerCase().includes(normalized)).map(c=><button {...commandProps} key={c.id} className="block min-h-11 w-full rounded-xl px-3 text-left hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring" onClick={()=>onCourse(c.id)}>{c.code} · {c.name}</button>)}
 {normalized&&topics.filter(t=>(t.name+" "+(t.materials??"")).toLowerCase().includes(normalized)).slice(0,8).map(t=><button {...commandProps} key={t.id} className="block min-h-11 w-full rounded-xl px-3 text-left hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring" onClick={()=>onCourse(t.course_id)}>{t.name}</button>)}
 {normalized&&exams.filter(e=>e.name.toLowerCase().includes(normalized)).map(e=><button {...commandProps} key={e.id} className="block min-h-11 w-full rounded-xl px-3 text-left hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring" onClick={()=>onCourse(e.course_id)}>{e.name} · {shortDate(e.date)}</button>)}
 {sessionHits.map(s=><button {...commandProps} key={s.id} className="block min-h-11 w-full rounded-xl px-3 text-left hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring" onClick={()=>onCourse(s.course_id)}><span className="block text-sm font-medium">{shortDate(s.date)} · {courses.find(c=>c.id===s.course_id)?.code}</span><span className="block truncate text-xs text-muted-foreground">{s.note||s.did||s.unclear||s.tasks}</span></button>)}
 </div></Dialog>;
}

export function ExamForm({courses,onClose}:{courses:Course[];onClose:()=>void}) {
 const [courseId,setCourseId]=useState(courses[0]?.id??""),[name,setName]=useState(""),[date,setDate]=useState("");const create=useCreateExam();
 return <Dialog title="Lisää koe" onClose={onClose}><form className="space-y-4" onSubmit={async e=>{e.preventDefault();try{await create.mutateAsync({course_id:courseId,name:name.trim(),date});toast.success("Koe lisätty.");onClose();}catch{toast.error("Koetta ei voitu tallentaa.");}}}><label className="block text-sm font-medium">Kurssi<select className={input} value={courseId} onChange={e=>setCourseId(e.target.value)}>{courses.map(c=><option key={c.id} value={c.id}>{c.code} · {c.name}</option>)}</select></label><label className="block text-sm font-medium">Kokeen nimi<input className={input} required value={name} onChange={e=>setName(e.target.value)} placeholder="Kurssikoe"/></label><label className="block text-sm font-medium">Päivämäärä<input type="date" className={input} required value={date} onChange={e=>setDate(e.target.value)}/></label><button className={button+" w-full"} disabled={create.isPending}>Tallenna koe</button></form></Dialog>;
}

export function MistakeForm({courseId,topics,onClose}:{courseId:string;topics:Topic[];onClose:()=>void}) {
 const [topicId,setTopicId]=useState(""),[type,setType]=useState("lasku"),[description,setDescription]=useState(""),[happened,setHappened]=useState(""),[solution,setSolution]=useState(""),[retry,setRetry]=useState("");
 const create=useCreateMistake();
 return <Dialog title="Kirjaa virhe" onClose={onClose}><form className="space-y-4" onSubmit={async e=>{e.preventDefault();try{await create.mutateAsync({course_id:courseId,topic_id:topicId||null,type,error:description.trim(),what_happened:happened.trim()||null,solution:solution.trim()||null,retry_date:retry||null});toast.success("Virhe kirjattu.");onClose();}catch{toast.error("Virhettä ei voitu tallentaa.");}}}>
 <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium">Aihe<select className={input} value={topicId} onChange={e=>setTopicId(e.target.value)}><option value="">Yleinen</option>{topics.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></label><label className="block text-sm font-medium">Virhetyyppi<select className={input} value={type} onChange={e=>setType(e.target.value)}><option value="lasku">Laskuvirhe</option><option value="käsite">Käsitevirhe</option><option value="menetelmä">Menetelmävirhe</option><option value="huolimattomuus">Huolimattomuus</option><option value="muu">Muu</option></select></label></div>
 <label className="block text-sm font-medium">Mikä meni väärin?<textarea required rows={2} className={input} value={description} onChange={e=>setDescription(e.target.value)}/></label>
 <label className="block text-sm font-medium">Mitä tapahtui?<textarea rows={2} className={input} value={happened} onChange={e=>setHappened(e.target.value)} placeholder="Miten päädyit väärään vastaukseen?"/></label>
 <AbittiAnswerEditor label="Oikea ratkaisutapa" value={solution} onChange={setSolution} minHeight={130}/>
 <label className="block text-sm font-medium">Uusintapäivä<input type="date" className={input} value={retry} onChange={e=>setRetry(e.target.value)}/></label>
 <button className={button+" w-full"} disabled={create.isPending}>Tallenna virhe</button></form></Dialog>;
}

export function PracticeTestForm({courseId,topics,onClose}:{courseId:string;topics:Topic[];onClose:()=>void}) {
 const [date,setDate]=useState(new Date().toLocaleDateString("sv-SE")),[score,setScore]=useState(""),[maximum,setMaximum]=useState(""),[duration,setDuration]=useState(""),[errors,setErrors]=useState(""),[breakdown,setBreakdown]=useState<Record<string,{score:string;max:string}>>({});
 const create=useCreatePracticeTest();
 const topicResults=topics.map(t=>({topic_id:t.id,name:t.name,score:Number(breakdown[t.id]?.score||0),max_score:Number(breakdown[t.id]?.max||0)})).filter(x=>x.max_score>0);
 return <Dialog title="Kirjaa harjoituskoe" onClose={onClose}><form className="space-y-4" onSubmit={async e=>{e.preventDefault();if(Number(maximum)<=0||Number(score)>Number(maximum)){toast.error("Tarkista pisteet.");return;}try{await create.mutateAsync({course_id:courseId,date,score:Number(score),max_score:Number(maximum),duration_minutes:duration?Number(duration):null,error_count:errors?Number(errors):null,topic_results:topicResults});toast.success("Harjoituskoe kirjattu.");onClose();}catch{toast.error("Harjoituskoetta ei voitu tallentaa.");}}}>
 <label className="block text-sm font-medium">Päivä<input type="date" required className={input} value={date} onChange={e=>setDate(e.target.value)}/></label>
 <div className="grid grid-cols-2 gap-3"><label className="block text-sm font-medium">Saadut pisteet<input type="number" min="0" step="0.5" required className={input} value={score} onChange={e=>setScore(e.target.value)}/></label><label className="block text-sm font-medium">Enimmäispisteet<input type="number" min="0.5" step="0.5" required className={input} value={maximum} onChange={e=>setMaximum(e.target.value)}/></label></div>
 <div className="grid grid-cols-2 gap-3"><label className="block text-sm font-medium">Kesto (min)<input type="number" min="1" className={input} value={duration} onChange={e=>setDuration(e.target.value)}/></label><label className="block text-sm font-medium">Virheitä<input type="number" min="0" className={input} value={errors} onChange={e=>setErrors(e.target.value)}/></label></div>
 <details className="rounded-2xl border border-border p-4"><summary className="cursor-pointer text-sm font-medium">Aihekohtaiset tulokset</summary><div className="mt-3 space-y-3">{topics.map(t=><div key={t.id} className="grid grid-cols-[1fr_72px_72px] items-end gap-2"><span className="pb-2 text-sm">{t.name}</span><label className="text-xs text-muted-foreground">Pisteet<input type="number" min="0" step="0.5" className={input} value={breakdown[t.id]?.score??""} onChange={e=>setBreakdown(v=>({...v,[t.id]:{score:e.target.value,max:v[t.id]?.max??""}}))}/></label><label className="text-xs text-muted-foreground">Max<input type="number" min="0" step="0.5" className={input} value={breakdown[t.id]?.max??""} onChange={e=>setBreakdown(v=>({...v,[t.id]:{score:v[t.id]?.score??"",max:e.target.value}}))}/></label></div>)}</div></details>
 <button className={button+" w-full"} disabled={create.isPending}>Tallenna tulos</button></form></Dialog>;
}
