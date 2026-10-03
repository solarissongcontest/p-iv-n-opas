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
     console.error("[Opintopäiväkirja] Course material parsing failed",error);toast.error("Materiaalia ei voitu jäsentää. Voit silti lisätä kurssin tiedot käsin.");
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
   <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold">Materiaalin automaattinen jäsennys</p><p className="mt-1 text-xs text-muted-foreground">Liitä teksti yllä tai valitse PDF- tai tekstitiedosto. Ehdotus ei tallennu ennen kuin hyväksyt koko kurssin.</p></div><Upload size={17} className="text-muted-foreground"/></div>
   <input type="file" accept=".pdf,.txt,.md,application/pdf,text/plain" className="mt-3 block min-h-11 w-full rounded-xl border bg-surface p-2 text-sm" onChange={e=>setStructureFile(e.target.files?.[0]??null)}/>
   <button type="button" className={secondary+" mt-3"} disabled={structureBusy||(!raw.trim()&&!structureFile)} onClick={()=>void analyzeCourseStructure()}>{structureBusy?<LoaderCircle className="animate-spin" size={16}/>:<FileText size={16}/>}Ehdota aiheet ja niiden yhteydet</button>
   {structureProvider&&<p className="mt-2 text-xs text-muted-foreground">Ehdotus: {structureProvider==="gemini"?"Gemini":"paikallinen varamenetelmä"} · {dependencySuggestions.length} aiheyhteyttä. Tarkista aihelista yllä.</p>}
   {dependencySuggestions.length>0&&<details className="mt-3 rounded-xl bg-surface p-3 text-sm"><summary className="cursor-pointer font-medium">Aiheyhteysehdotukset ({dependencySuggestions.length})</summary><div className="mt-2 space-y-1">{dependencySuggestions.slice(0,20).map((row,index)=><p key={index} className="text-xs text-muted-foreground">{row.sourceName} <b>{relationLabel(row.relationType)}</b> {row.targetName}</p>)}</div></details>}
 </section>
 <button className={button+" w-full"} disabled={create.isPending}>Tallenna kurssi</button></form></Dialog>;
}
