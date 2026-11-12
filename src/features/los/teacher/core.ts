/** LOS Teacher Experience 2.0: deterministic, authored scenes. No AI or TTS. */
export const TEACHER_VERSION="2.0.0" as const;
export type TeacherPhase="activation"|"introduction"|"explanation"|"worked-example"|"guided"|"independent"|"application"|"exit"|"summary";
export type TeacherChoice={id:string;label:string;feedback:string};
export type TeacherQuestion={prompt:string;choices:readonly TeacherChoice[];correctId:string;success:string;alternative:string};
export type TeacherScene={
 id:string;phase:TeacherPhase;title:string;explanation:readonly string[];
 example?:{german:string;finnish:string;why:string};
 question?:TeacherQuestion;hint?:string;
};
export type TeacherLesson={id:string;version:typeof TEACHER_VERSION;review:"draft"|"approved";objective:string;scenes:readonly TeacherScene[]};
export type TeacherAttempt={answer:string;count:number;correct:boolean;independent:boolean;revealed:boolean;at:string};
export type TeacherProgress={version:typeof TEACHER_VERSION;scene:string;visited:string[];hints:string[];answers:Record<string,TeacherAttempt>;paused:boolean};
const isObj=(x:unknown):x is Record<string,unknown>=>Boolean(x&&typeof x==="object"&&!Array.isArray(x));
const validId=(x:unknown)=>typeof x==="string"&&/^[a-z0-9-]{1,48}$/i.test(x);
const validIds=(x:unknown,max:number)=>Array.isArray(x)&&x.length<=max&&
  new Set(x).size===x.length&&x.every(validId);
const validIso=(x:unknown)=>typeof x==="string"&&x.length<=40&&/^\d{4}-\d{2}-\d{2}T/.test(x)&&Number.isFinite(Date.parse(x));
export function validTeacherProgress(x:unknown):x is TeacherProgress{
 if(!isObj(x)||x['version']!==TEACHER_VERSION||!validId(x['scene'])||
    !validIds(x['visited'],25)||!validIds(x['hints'],25)||typeof x['paused']!=="boolean"||
    !isObj(x['answers'])||Object.keys(x['answers']).length>20)return false;
 return Object.entries(x['answers']).every(([id,a])=>validId(id)&&isObj(a)&&
    typeof a['answer']==="string"&&a['answer'].length<=40&&Number.isInteger(a['count'])&&
    Number(a['count'])>=0&&Number(a['count'])<=10&&typeof a['correct']==="boolean"&&
    typeof a['independent']==="boolean"&&typeof a['revealed']==="boolean"&&validIso(a['at']));
}
export function validTeacherLesson(lesson:TeacherLesson):string[]{
 const errors:string[]=[];
 if(!/^L\d{3}$/.test(lesson.id)||lesson.scenes.length<5||lesson.scenes.length>20)errors.push("invalid lesson scope");
 const ids=lesson.scenes.map(x=>x.id);
 if(new Set(ids).size!==ids.length)errors.push("duplicate scenes");
 for(const phase of ["explanation","worked-example","independent","summary"] as const)
  if(!lesson.scenes.some(s=>s.phase===phase))errors.push("missing phase "+phase);
 for(const s of lesson.scenes){
  if(!validId(s.id)||s.title.trim().length<4||!s.explanation.length||
     s.explanation.some(p=>p.trim().length<20))errors.push("empty teaching: "+s.id);
  if(s.question){
   const q=s.question;
   if(q.choices.length<2||q.choices.length>5||new Set(q.choices.map(x=>x.id)).size!==q.choices.length||
      !q.choices.some(x=>x.id===q.correctId)||q.choices.some(x=>!x.feedback.trim())||
      !q.alternative.trim())errors.push("invalid scripted feedback: "+s.id);
  }
 }
 return errors;
}
export function initialTeacherProgress(lesson:TeacherLesson):TeacherProgress{
 return {version:TEACHER_VERSION,scene:lesson.scenes[0]?.id??"intro",visited:[],hints:[],answers:{},paused:false};
}
export function selectTeacherScene(lesson:TeacherLesson,p:TeacherProgress,id:string):TeacherProgress{
 if(!lesson.scenes.some(s=>s.id===id))return p;
 return {...p,scene:id,paused:false,visited:[...new Set([...p.visited,id])]};
}
export function pauseTeacher(p:TeacherProgress):TeacherProgress{return {...p,paused:true};}
export function hintTeacher(lesson:TeacherLesson,p:TeacherProgress):TeacherProgress{
 const scene=lesson.scenes.find(s=>s.id===p.scene);
 if(p.paused||!scene?.hint)return p;
 return {...p,hints:[...new Set([...p.hints,p.scene])]};
}
export function answerTeacher(lesson:TeacherLesson,p:TeacherProgress,answer:string,at:string):TeacherProgress{
 const scene=lesson.scenes.find(s=>s.id===p.scene);
 const q=scene?.question,prev=p.answers[p.scene];
 if(p.paused||!validIso(at)||!q||!q.choices.some(x=>x.id===answer)||prev?.correct||prev?.revealed||((prev?.count??0)>=10))return p;
 const count=(prev?.count??0)+1,correct=answer===q.correctId;
 return {...p,answers:{...p.answers,[p.scene]:{answer,count,correct,
    independent:correct&&count===1&&!p.hints.includes(p.scene)&&
     (scene.phase==="independent"||scene.phase==="application"||scene.phase==="exit"),
    revealed:false,at}}};
}
export function revealTeacher(lesson:TeacherLesson,p:TeacherProgress,at:string):TeacherProgress{
 const scene=lesson.scenes.find(s=>s.id===p.scene),prev=p.answers[p.scene];
 if(p.paused||!validIso(at)||!scene?.question||prev?.correct)return p;
 return {...p,answers:{...p.answers,[p.scene]:{answer:prev?.answer??"",count:prev?.count??0,
   correct:false,independent:false,revealed:true,at}}};
}
/** Evidence only: never a claim of mastery or CEFR level. */
export function teacherEvidence(lesson:TeacherLesson,p:TeacherProgress){
 const prompts=lesson.scenes.filter(s=>s.question&&["independent","application","exit"].includes(s.phase));
 return {independent:prompts.filter(s=>p.answers[s.id]?.independent).map(s=>s.id),
  required:prompts.length,visited:p.visited.length};
}
