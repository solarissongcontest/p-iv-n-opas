import { useEffect, useRef, useState } from "react";
import { Check, Pause, Play, X } from "lucide-react";
import { toast } from "sonner";
import { LiquidGlass } from "@/components/LiquidGlass";
import {
  useCreateCourse,
  useLogSession,
  useCreateExam,
  useCreateMistake,
  useCreatePracticeTest,
  useUpdateCourse,
  useUpdateTopic,
  useCreateTopic,
  useUpsertPlanItem,
} from "@/lib/data";
import type { Course, Exam, PlanItem, Session, Topic } from "@/lib/domain";
import { TARGET_SYSTEMS } from "@/lib/domain";
import { shortDate, today } from "@/lib/fi";
import { COURSE_TEMPLATES, parseTopicImport, topicsToImportText } from "@/lib/courseTemplates";

const input = "mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ring";
const button = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-primary-foreground disabled:opacity-50";
const secondary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4";
function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
 const ref = useRef<HTMLDivElement>(null);
 const close = useRef(onClose);
 close.current = onClose;
 useEffect(() => {
   const previous = document.activeElement as HTMLElement | null;
   const focusable = () => [...(ref.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])];
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
export function SessionForm({item,courses,topics,onClose}:{item:PlanItem|null;courses:Course[];topics:Topic[];onClose:()=>void}) {
 const [courseId,setCourseId]=useState(item?.course_id??courses[0]?.id??""),[topicId,setTopicId]=useState(item?.topic_id??"");
 const [guided,setGuided]=useState(!!item),[step,setStep]=useState(0);
 const [objective,setObjective]=useState(item?.title??""),[recall,setRecall]=useState(""),[retrievalCheck,setRetrievalCheck]=useState("");
 const [retrievalResult,setRetrievalResult]=useState<"independent"|"hinted"|"not_yet">("independent"),[confidence,setConfidence]=useState(2),[outcome,setOutcome]=useState<"yes"|"partial"|"not_yet">("partial");
 const [seconds,setSeconds]=useState(0),[running,setRunning]=useState(false),[timer,setTimer]=useState(!!item);
 const [amount,setAmount]=useState(item?.target_minutes??30),[competence,setCompetence]=useState(3),[did,setDid]=useState(""),[unclear,setUnclear]=useState(""),[note,setNote]=useState("");
 const [focus,setFocus]=useState(3),[energy,setEnergy]=useState(3),[method,setMethod]=useState("tehtävät"),[tasks,setTasks]=useState("");
 const log=useLogSession();
 const course=courses.find(c=>c.id===courseId),topic=topics.find(t=>t.id===topicId);
 const sessionKind=item?.kind==="review"?"review":item?.kind==="test"?"test":"study";
 const competenceForSave=guided?(outcome==="yes"?4:outcome==="partial"?3:2):competence;
 useEffect(()=>{if(!running)return;const id=window.setInterval(()=>setSeconds(v=>v+1),1000);return()=>window.clearInterval(id);},[running]);
 async function submit(e:React.FormEvent) {
   e.preventDefault();if(!courseId)return;
   if(guided&&objective.trim().length<3){toast.error("Kirjaa ensin session tavoite.");setStep(0);return;}
   if(guided&&retrievalCheck.trim().length<3){toast.error("Tee lopuksi retrieval check ilman materiaalia.");setStep(3);return;}
   try{
     const result=await log.mutateAsync({
       course_id:courseId,topic_id:topicId||null,
       minutes:timer?Math.max(1,Math.ceil(seconds/60)):amount,
       planned_minutes:item?.target_minutes??amount,
       kind:sessionKind,
       competence:competenceForSave,did,unclear,note,focus,energy,method,tasks,
       plan_item_id:item?.id??null,
       objective:guided?objective.trim():null,
       recall:guided?recall.trim():null,
       retrieval_check:guided?retrievalCheck.trim():null,
       retrieval_result:guided?retrievalResult:null,
       retrieval_confidence:guided?confidence:null,
       outcome:guided?outcome:null
     });
     toast.success(result==="queued"?"Tallennettu paikallisesti · synkataan myöhemmin.":guided?"Sessio tallennettu ja oppimisnäyttö päivitetty.":"Opiskelu kirjattu.");
     onClose();
   }catch{toast.error("Tallennus epäonnistui. Tiedot eivät katoa, jos yhteys katkesi.");}
 }
 const selectors=<div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-medium">Kurssi<select className={input} value={courseId} onChange={e=>{setCourseId(e.target.value);setTopicId("");}}>{courses.map(c=><option key={c.id} value={c.id}>{c.code} · {c.name}</option>)}</select></label><label className="text-sm font-medium">Aihe<select className={input} value={topicId} onChange={e=>{setTopicId(e.target.value);if(!objective.trim())setObjective(topics.find(t=>t.id===e.target.value)?.name??"");}}><option value="">Yleinen opiskelu</option>{topics.filter(t=>t.course_id===courseId).map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></label></div>;
 const timeControls=<><div className="flex flex-wrap gap-2"><button type="button" className={!timer?button:secondary} onClick={()=>{setTimer(false);setRunning(false);}}>Ei ajastinta</button><button type="button" className={timer&&amount===20?button:secondary} onClick={()=>{setAmount(20);setTimer(true);}}>20 min</button><button type="button" className={timer&&amount===30?button:secondary} onClick={()=>{setAmount(30);setTimer(true);}}>30 min</button><button type="button" className={timer&&amount!=="20"&&amount!=="30"?secondary:secondary} onClick={()=>{setAmount(item?.target_minutes??45);setTimer(true);}}>Oma aika</button></div>{timer?<div className="rounded-2xl bg-muted p-5 text-center"><p role="timer" className="text-5xl font-semibold tabular-nums">{String(Math.floor(seconds/3600)).padStart(2,"0")}:{String(Math.floor(seconds/60)%60).padStart(2,"0")}:{String(seconds%60).padStart(2,"0")}</p><p className="mt-2 text-sm text-muted-foreground">Suunniteltu noin {amount} min. Ajastin on apuväline, ei onnistumisen mittari.</p><button type="button" className={secondary+" mt-4"} onClick={()=>setRunning(v=>!v)}>{running?<><Pause size={17}/>Tauko</>:<><Play size={17}/>Aloita / jatka</>}</button></div>:<label className="block text-sm font-medium">Todellinen kesto minuutteina<input type="number" min="1" max="1440" required value={amount} onChange={e=>setAmount(Number(e.target.value))} className={input}/></label>}</>;
 const extra=<details className="rounded-2xl border border-border p-4"><summary className="cursor-pointer text-sm font-medium">Lisätiedot</summary><div className="mt-4 space-y-4"><div className="grid grid-cols-2 gap-3"><label className="text-sm font-medium">Keskittyminen 1–5<input type="number" min="1" max="5" className={input} value={focus} onChange={e=>setFocus(Number(e.target.value))}/></label><label className="text-sm font-medium">Energia 1–5<input type="number" min="1" max="5" className={input} value={energy} onChange={e=>setEnergy(Number(e.target.value))}/></label></div><label className="block text-sm font-medium">Tehtävänumerot / tehtävät<input className={input} value={tasks} onChange={e=>setTasks(e.target.value)} placeholder="esim. 4.12–4.18"/></label><label className="block text-sm font-medium">Pidempi muistiinpano<textarea className={input} rows={3} value={note} onChange={e=>setNote(e.target.value)}/></label></div></details>;
 return <Dialog title={guided?"Ohjattu opiskelusessio":"Kirjaa opiskelu"} onClose={onClose}><form onSubmit={submit} className="space-y-4">
   <div className="flex flex-wrap gap-2"><button type="button" className={guided?button:secondary} onClick={()=>{setGuided(true);setStep(0);}}>Ohjattu sessio</button><button type="button" className={!guided?button:secondary} onClick={()=>{setGuided(false);setRunning(false);}}>Nopea kirjaus</button></div>
   {guided?<>
     <div className="grid grid-cols-5 gap-1" aria-label={`Vaihe ${step+1} / 5`}>{[0,1,2,3,4].map(n=><div key={n} className={`h-1.5 rounded-full ${n<=step?"bg-primary":"bg-muted"}`}/>)}</div>
     {step===0&&<>
       {item&&<div className="rounded-2xl bg-muted/60 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-primary">{course?.code} · noin {item.target_minutes} min</p><h3 className="mt-1 text-lg font-semibold">{item.title||topic?.name||"Opiskelu"}</h3></div>}
       {selectors}
       <label className="block text-sm font-medium">1. Tavoite<textarea className={input} rows={2} value={objective} onChange={e=>setObjective(e.target.value)} placeholder="Mitä osaat tämän session jälkeen tehdä, ratkaista tai selittää?"/></label>
       <p className="text-xs text-muted-foreground">Muotoile tavoite osaamisena, ei aikana. Esimerkiksi “osaan soveltaa Newtonin II lakia kahteen uuteen tilanteeseen”.</p>
       <button type="button" disabled={objective.trim().length<3} className={button+" w-full"} onClick={()=>setStep(1)}>Jatka muistista palautukseen</button>
     </>}
     {step===1&&<>
       <div className="rounded-2xl bg-muted/60 p-4"><p className="font-medium">2. Palauta mieleen ennen materiaalia</p><p className="mt-2 text-sm text-muted-foreground">Pidä kirja ja muistiinpanot kiinni. Mitä muistat aiheesta? Mikä sääntö, käsite tai menetelmä tähän liittyy?</p></div>
       <label className="block text-sm font-medium">Kirjoita 1–3 asiaa muistista<textarea autoFocus className={input} rows={4} value={recall} onChange={e=>setRecall(e.target.value)} placeholder="En muista vielä… on myös kelvollinen lähtökohta."/></label>
       <div className="flex gap-2"><button type="button" className={secondary} onClick={()=>setStep(0)}>Takaisin</button><button type="button" disabled={!recall.trim()} className={button+" flex-1"} onClick={()=>setStep(2)}>Jatka harjoitteluun</button></div>
     </>}
     {step===2&&<>
       <div className="rounded-2xl bg-muted/60 p-4"><p className="font-medium">3. Harjoittele</p><p className="mt-2 text-sm text-muted-foreground">Työskentele tavoitteen parissa. Ajastin on vapaaehtoinen; tärkeintä on mitä pystyt tekemään session jälkeen.</p></div>
       {timeControls}
       <label className="block text-sm font-medium">Menetelmä<select className={input} value={method} onChange={e=>setMethod(e.target.value)}><option value="tehtävät">Tehtävät</option><option value="aktiivinen palautus">Aktiivinen palautus</option><option value="muistiinpanot">Muistiinpanot</option><option value="lukeminen">Lukeminen</option><option value="harjoituskoe">Harjoituskoe</option><option value="muu">Muu</option></select></label>
       <label className="block text-sm font-medium">Mitä teit?<textarea className={input} rows={3} value={did} onChange={e=>setDid(e.target.value)} placeholder="Tehtävät, selittäminen, käsitekartta…"/></label>
       <div className="flex gap-2"><button type="button" className={secondary} onClick={()=>setStep(1)}>Takaisin</button><button type="button" className={button+" flex-1"} onClick={()=>{setRunning(false);setStep(3);}}>Siirry lopputarkistukseen</button></div>
     </>}
     {step===3&&<>
       <div className="rounded-2xl bg-muted/60 p-4"><p className="font-medium">4. Retrieval check</p><p className="mt-2 text-sm text-muted-foreground">Sulje materiaali uudelleen. Selitä {topic?.name??"aiheen"} pääidea omin sanoin ja kuvaa, miten aloittaisit yhden uuden tehtävän. Tarkista vasta yrityksen jälkeen materiaalista.</p></div>
       <label className="block text-sm font-medium">Yrityksesi ilman materiaalia<textarea autoFocus className={input} rows={4} value={retrievalCheck} onChange={e=>setRetrievalCheck(e.target.value)} placeholder="Kirjoita selitys, laskun ensimmäiset vaiheet tai muistamasi rakenne."/></label>
       <fieldset><legend className="mb-2 text-sm font-medium">Miten onnistui tarkistuksen jälkeen?</legend><div className="grid gap-2 sm:grid-cols-3">{[["independent","Itsenäisesti"],["hinted","Vihjeellä"],["not_yet","Ei vielä"]].map(([value,label])=><button type="button" key={value} aria-pressed={retrievalResult===value} onClick={()=>setRetrievalResult(value as "independent"|"hinted"|"not_yet")} className={`min-h-11 rounded-xl border px-3 ${retrievalResult===value?"border-primary bg-accent font-semibold":"border-border"}`}>{label}</button>)}</div></fieldset>
       <fieldset><legend className="mb-2 text-sm font-medium">Kuinka varma olit ennen tarkistusta?</legend><div className="grid grid-cols-3 gap-2">{[[1,"Epävarma"],[2,"Melko varma"],[3,"Varma"]].map(([value,label])=><button type="button" key={value} aria-pressed={confidence===value} onClick={()=>setConfidence(value as number)} className={`min-h-11 rounded-xl border px-2 text-sm ${confidence===value?"border-primary bg-accent font-semibold":"border-border"}`}>{label}</button>)}</div></fieldset>
       <p className="text-xs text-muted-foreground">Vain retrieval checkin tulos voi tuottaa harjoitusnäyttöä. Varmuus on kalibrointitietoa, ei mastery-piste.</p>
       <div className="flex gap-2"><button type="button" className={secondary} onClick={()=>setStep(2)}>Takaisin</button><button type="button" disabled={retrievalCheck.trim().length<3} className={button+" flex-1"} onClick={()=>setStep(4)}>Jatka yhteenvetoon</button></div>
     </>}
     {step===4&&<>
       <div className="rounded-2xl bg-muted/60 p-4"><p className="font-medium">5. Lopeta sessio</p><p className="mt-2 text-sm text-muted-foreground">Tavoite: {objective}</p></div>
       <fieldset><legend className="mb-2 text-sm font-medium">Tavoite saavutettu?</legend><div className="grid grid-cols-3 gap-2">{[["yes","Kyllä"],["partial","Osittain"],["not_yet","Ei vielä"]].map(([value,label])=><button type="button" key={value} aria-pressed={outcome===value} onClick={()=>setOutcome(value as "yes"|"partial"|"not_yet")} className={`min-h-11 rounded-xl border px-2 text-sm ${outcome===value?"border-primary bg-accent font-semibold":"border-border"}`}>{label}</button>)}</div></fieldset>
       <label className="block text-sm font-medium">Mikä jäi epäselväksi?<textarea className={input} rows={3} value={unclear} onChange={e=>setUnclear(e.target.value)} placeholder="Jätä tyhjäksi, jos mitään olennaista ei jäänyt epäselväksi."/></label>
       {extra}
       <p className="rounded-xl bg-accent p-3 text-sm">{retrievalResult==="independent"?"Itsenäinen retrieval check kirjataan harjoitusnäytöksi.":retrievalResult==="hinted"?"Vihjeellä onnistuminen ei vielä nosta masteryä; aihe palaa pian kertaukseen.":"Tämä ei ole epäonnistuminen. Aihe palaa lyhyellä välillä uudelleen harjoiteltavaksi."}</p>
       <div className="flex gap-2"><button type="button" className={secondary} onClick={()=>setStep(3)}>Takaisin</button><button type="submit" disabled={log.isPending} className={button+" flex-1"}><Check size={18}/>{log.isPending?"Tallennetaan…":"Lopeta ja tallenna"}</button></div>
     </>}
   </>:<>
     {selectors}
     {timeControls}
     <fieldset><legend className="mb-2 text-sm font-medium">Oma fiilis osaamisesta 1–5</legend><div className="flex gap-2">{[1,2,3,4,5].map(n=><button type="button" key={n} aria-pressed={competence===n} onClick={()=>setCompetence(n)} className={`grid size-11 place-items-center rounded-xl border ${competence===n?"border-primary bg-accent font-semibold":"border-border"}`}>{n}</button>)}</div><p className="mt-2 text-xs text-muted-foreground">Tämä on itsearvio kalibrointia varten eikä yksin nosta osaamistasoa.</p></fieldset>
     <label className="block text-sm font-medium">Mitä teit?<textarea className={input} rows={2} value={did} onChange={e=>setDid(e.target.value)}/></label>
     <label className="block text-sm font-medium">Mikä jäi epäselväksi?<textarea className={input} rows={2} value={unclear} onChange={e=>setUnclear(e.target.value)}/></label>
     <label className="block text-sm font-medium">Menetelmä<select className={input} value={method} onChange={e=>setMethod(e.target.value)}><option value="tehtävät">Tehtävät</option><option value="aktiivinen palautus">Aktiivinen palautus</option><option value="muistiinpanot">Muistiinpanot</option><option value="lukeminen">Lukeminen</option><option value="harjoituskoe">Harjoituskoe</option><option value="muu">Muu</option></select></label>
     {extra}
     <button type="submit" disabled={log.isPending||(!timer&&amount<1)} className={button+" w-full"}><Check size={18}/>{log.isPending?"Tallennetaan…":"Tallenna kirjaus"}</button>
   </>}
 </form></Dialog>;
}

export function CourseForm({onClose}:{onClose:()=>void}) {
 const [templateId,setTemplateId]=useState("blank"),[code,setCode]=useState(""),[name,setName]=useState(""),[subject,setSubject]=useState(""),[start,setStart]=useState(today()),[exam,setExam]=useState(""),[weekly,setWeekly]=useState(180),[targetSystem,setTargetSystem]=useState("school"),[targetValue,setTargetValue]=useState("10"),[color,setColor]=useState("sage"),[studyMode,setStudyMode]=useState("course"),[raw,setRaw]=useState("");
 const create=useCreateCourse();
 function applyTemplate(id:string){
   const t=COURSE_TEMPLATES.find(x=>x.id===id)??COURSE_TEMPLATES[0];
   if(!t)return;
   setTemplateId(id);setCode(t.code);setName(t.name);setSubject(t.subject);setWeekly(t.weekly_minutes);setTargetSystem(t.target_system);setTargetValue(t.target_value);setColor(t.color);setStudyMode(t.study_mode);setRaw(topicsToImportText(t.topics));
 }
 return <Dialog title="Lisää kurssi" onClose={onClose}><form className="space-y-4" onSubmit={async e=>{e.preventDefault();try{const parsed=parseTopicImport(raw);await create.mutateAsync({code:code.trim(),name:name.trim(),subject:subject.trim(),start_date:start||null,exam_date:exam||null,weekly_minutes:weekly,target_system:targetSystem,target_value:targetValue||null,color,study_mode:studyMode,topics:parsed});toast.success("Kurssi lisätty.");onClose();}catch{toast.error("Kurssia ei voitu tallentaa.");}}}>
 <div><p className="mb-2 text-sm font-medium">Pohja</p><div className="grid gap-2 sm:grid-cols-3">{COURSE_TEMPLATES.map(t=><button type="button" key={t.id} aria-pressed={templateId===t.id} onClick={()=>applyTemplate(t.id)} className={`min-h-11 rounded-xl border px-3 text-left text-sm ${templateId===t.id?"border-primary bg-accent":"border-border"}`}>{t.label}</button>)}</div></div>
 <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium">Kurssikoodi<input className={input} required value={code} onChange={e=>setCode(e.target.value)} placeholder="esim. FY04"/></label><label className="block text-sm font-medium">Oppiaine<input className={input} value={subject} onChange={e=>setSubject(e.target.value)}/></label></div>
 <label className="block text-sm font-medium">Kurssin nimi<input className={input} required value={name} onChange={e=>setName(e.target.value)}/></label>
 <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium">Aloituspäivä<input type="date" className={input} value={start} onChange={e=>setStart(e.target.value)}/></label><label className="block text-sm font-medium">Koepäivä<input type="date" className={input} value={exam} onChange={e=>setExam(e.target.value)}/></label></div>
 <div className="grid gap-3 sm:grid-cols-3"><label className="block text-sm font-medium">Viikkotavoite (min)<input type="number" min="0" step="15" className={input} value={weekly} onChange={e=>setWeekly(Number(e.target.value))}/></label><label className="block text-sm font-medium">Väri<select className={input} value={color} onChange={e=>setColor(e.target.value)}><option value="sage">Salvia</option><option value="forest">Metsä</option><option value="blue">Sininen</option><option value="violet">Violetti</option><option value="amber">Meripihka</option></select></label><label className="block text-sm font-medium">Opiskelutapa<select className={input} value={studyMode} onChange={e=>setStudyMode(e.target.value)}><option value="course">Kurssi</option><option value="exam">Koepainotteinen</option><option value="self">Itsenäinen</option></select></label></div>
 <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium">Tavoite<select className={input} value={targetSystem} onChange={e=>setTargetSystem(e.target.value)}>{TARGET_SYSTEMS.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select></label><label className="block text-sm font-medium">Tavoitearvo<input className={input} value={targetValue} onChange={e=>setTargetValue(e.target.value)} placeholder="esim. L tai 10"/></label></div>
 <label className="block text-sm font-medium">Aiheet nopeasti<textarea rows={8} className={input} value={raw} onChange={e=>setRaw(e.target.value)} placeholder={"Aihe | paino | tärkeys | materiaali\nStoikiometria | 10 | 5 | s. 14–35"}/><span className="mt-1 block text-xs text-muted-foreground">Muoto: Aihe | paino | tärkeys | materiaali. Painot normalisoidaan automaattisesti 100 pisteeseen.</span></label>
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
 return <Dialog title="Haku ja pikatoiminnot" onClose={onClose}><input autoFocus className={input} aria-label="Hae" placeholder="Hae kurssia, aihetta, sessiota, muistiinpanoa tai koetta…" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==="ArrowDown"){e.preventDefault();moveFocus(1);}else if(e.key==="ArrowUp"){e.preventDefault();moveFocus(-1);}}}/><div ref={listRef} className="mt-4 max-h-96 space-y-1 overflow-y-auto" onKeyDown={e=>{if(e.key==="ArrowDown"){e.preventDefault();moveFocus(1);}else if(e.key==="ArrowUp"){e.preventDefault();moveFocus(-1);}}}>
 <button {...commandProps} className="block min-h-11 w-full rounded-xl px-3 text-left hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring" onClick={onLog}>+ Kirjaa opiskelu</button>
 {[["today","Tänään"],["plan","Suunnitelma"],["courses","Kurssit"],["exams","Kokeet"],["progress","Kehitys"]].map(([id,label])=><button {...commandProps} key={id} className="block min-h-11 w-full rounded-xl px-3 text-left hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring" onClick={()=>onNavigate(id ?? "today")}>{label}</button>)}
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
 <label className="block text-sm font-medium">Oikea ratkaisutapa<textarea rows={3} className={input} value={solution} onChange={e=>setSolution(e.target.value)}/></label>
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
