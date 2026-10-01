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

export function TopicForm({courseId,topic,onClose}:{courseId:string;topic?:Topic;onClose:()=>void}) {
 const [name,setName]=useState(topic?.name??""),[materials,setMaterials]=useState(topic?.materials??""),[importance,setImportance]=useState(topic?.importance??3),[weight,setWeight]=useState(Number(topic?.weight??1));
 const update=useUpdateTopic(),create=useCreateTopic();
 return <Dialog title={topic?"Muokkaa aihetta":"Lisää aihe"} onClose={onClose}><form className="space-y-4" onSubmit={async e=>{e.preventDefault();try{if(topic)await update.mutateAsync({id:topic.id,name:name.trim(),materials:materials.trim()||null,importance,weight});else await create.mutateAsync({course_id:courseId,name:name.trim(),materials:materials.trim()||null,importance,weight});toast.success(topic?"Aihe päivitetty.":"Aihe lisätty.");onClose();}catch{toast.error("Aihetta ei voitu tallentaa.");}}}>
 <label className="block text-sm font-medium">Aiheen nimi<input className={input} required value={name} onChange={e=>setName(e.target.value)}/></label>
 <label className="block text-sm font-medium">Materiaali / sivut<input className={input} value={materials} onChange={e=>setMaterials(e.target.value)}/></label>
 <div className="grid grid-cols-2 gap-3"><label className="block text-sm font-medium">Tärkeys 1–5<input type="number" min="1" max="5" className={input} value={importance} onChange={e=>setImportance(Number(e.target.value))}/></label><label className="block text-sm font-medium">Paino<input type="number" min="0" step="0.5" className={input} value={weight} onChange={e=>setWeight(Number(e.target.value))}/></label></div>
 <button className={button+" w-full"} disabled={update.isPending||create.isPending}>Tallenna</button></form></Dialog>;
}
