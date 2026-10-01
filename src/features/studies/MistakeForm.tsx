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
