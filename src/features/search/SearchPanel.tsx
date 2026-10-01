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
