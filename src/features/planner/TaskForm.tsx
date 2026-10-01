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
