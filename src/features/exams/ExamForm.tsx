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

export function ExamForm({courses,onClose}:{courses:Course[];onClose:()=>void}) {
 const [courseId,setCourseId]=useState(courses[0]?.id??""),[name,setName]=useState(""),[date,setDate]=useState("");const create=useCreateExam();
 return <Dialog title="Lisää koe" onClose={onClose}><form className="space-y-4" onSubmit={async e=>{e.preventDefault();try{await create.mutateAsync({course_id:courseId,name:name.trim(),date});toast.success("Koe lisätty.");onClose();}catch{toast.error("Koetta ei voitu tallentaa.");}}}><label className="block text-sm font-medium">Kurssi<select className={input} value={courseId} onChange={e=>setCourseId(e.target.value)}>{courses.map(c=><option key={c.id} value={c.id}>{c.code} · {c.name}</option>)}</select></label><label className="block text-sm font-medium">Kokeen nimi<input className={input} required value={name} onChange={e=>setName(e.target.value)} placeholder="Kurssikoe"/></label><label className="block text-sm font-medium">Päivämäärä<input type="date" className={input} required value={date} onChange={e=>setDate(e.target.value)}/></label><button className={button+" w-full"} disabled={create.isPending}>Tallenna koe</button></form></Dialog>;
}
