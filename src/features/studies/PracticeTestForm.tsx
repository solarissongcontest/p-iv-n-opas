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
