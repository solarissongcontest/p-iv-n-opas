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
