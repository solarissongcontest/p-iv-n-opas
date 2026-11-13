/** LOS Teacher Experience 2.0: deterministic, authored scenes. No AI or TTS. */
export const TEACHER_VERSION="2.0.0" as const;
export type TeacherPhase="activation"|"introduction"|"explanation"|"worked-example"|"guided"|"independent"|"application"|"exit"|"summary";
export type TeacherChoice={id:string;label:string;feedback:string};
export type TeacherHelpOption={id:string;label:string;paragraphs:readonly string[]};
export type TeacherQuestion={prompt:string;choices:readonly TeacherChoice[];correctId:string;success:string;alternative:string};
/** Exact, authored answers only. No AI scoring, fuzzy matches, or claimed pronunciation assessment. */
export type TeacherWrittenQuestion={
 prompt:string;accepted:readonly string[];success:string;alternative:string;
 wrongFeedback:string;mistakes?:readonly {answer:string;feedback:string}[];
};
export type TeacherScene={
 id:string;phase:TeacherPhase;title:string;explanation:readonly string[];
 example?:{german:string;finnish:string;why:string};
 question?:TeacherQuestion;written?:TeacherWrittenQuestion;hint?:string;help?:readonly TeacherHelpOption[];
};
export type TeacherLesson={id:string;version:typeof TEACHER_VERSION;review:"draft"|"approved";contentRevision?:string;objective:string;scenes:readonly TeacherScene[]};
export type TeacherAttempt={answer:string;count:number;correct:boolean;independent:boolean;revealed:boolean;at:string};
export type TeacherProgress={version:typeof TEACHER_VERSION;scene:string;visited:string[];hints:string[];answers:Record<string,TeacherAttempt>;paused:boolean;completedAt?:string|null;helpSelections?:Record<string,string>;writtenDrafts?:Record<string,string>;completedContentRevision?:string;completedRevisionAt?:string};
const isObj=(x:unknown):x is Record<string,unknown>=>Boolean(x&&typeof x==="object"&&!Array.isArray(x));
const validId=(x:unknown)=>typeof x==="string"&&/^[a-z0-9-]{1,48}$/i.test(x);
const validIds=(x:unknown,max:number)=>Array.isArray(x)&&x.length<=max&&
  new Set(x).size===x.length&&x.every(validId);
const validHelpSelections=(x:unknown)=>x===undefined||
 (isObj(x)&&Object.keys(x).length<=20&&Object.entries(x).every(([id,option])=>
   validId(id)&&validId(option)));
const validWrittenDrafts=(x:unknown)=>x===undefined||
 (isObj(x)&&Object.keys(x).length<=20&&Object.entries(x).every(([id,value])=>
   validId(id)&&typeof value==="string"&&value.length<=40));
const validIso=(x:unknown)=>typeof x==="string"&&x.length<=40&&/^\d{4}-\d{2}-\d{2}T/.test(x)&&Number.isFinite(Date.parse(x));
export function validTeacherProgress(x:unknown):x is TeacherProgress{
 if(!isObj(x)||x['version']!==TEACHER_VERSION||!validId(x['scene'])||
    !validIds(x['visited'],25)||!validIds(x['hints'],25)||typeof x['paused']!=="boolean"||
    !isObj(x['answers'])||Object.keys(x['answers']).length>20||
    (x['completedAt']!==undefined&&x['completedAt']!==null&&!validIso(x['completedAt']))||
    !validHelpSelections(x['helpSelections'])||!validWrittenDrafts(x['writtenDrafts'])||
    (x['completedContentRevision']!==undefined&&!validId(x['completedContentRevision']))||
    (x['completedRevisionAt']!==undefined&&!validIso(x['completedRevisionAt']))||
    ((x['completedContentRevision']===undefined)!==(x['completedRevisionAt']===undefined))||
    (x['completedContentRevision']!==undefined&&!validIso(x['completedAt'])))return false;
 return Object.entries(x['answers']).every(([id,a])=>validId(id)&&isObj(a)&&
    typeof a['answer']==="string"&&a['answer'].length<=40&&Number.isInteger(a['count'])&&
    Number(a['count'])>=0&&Number(a['count'])<=10&&typeof a['correct']==="boolean"&&
    typeof a['independent']==="boolean"&&typeof a['revealed']==="boolean"&&validIso(a['at']));
}
export function validTeacherLesson(lesson:TeacherLesson):string[]{
 const errors:string[]=[];
 if(!/^L\d{3}$/.test(lesson.id)||lesson.scenes.length<5||lesson.scenes.length>20)errors.push("invalid lesson scope");
 if(lesson.contentRevision!==undefined&&!validId(lesson.contentRevision))errors.push("invalid content revision");
 const ids=lesson.scenes.map(x=>x.id);
 if(new Set(ids).size!==ids.length)errors.push("duplicate scenes");
 for(const phase of ["explanation","worked-example","independent","summary"] as const)
  if(!lesson.scenes.some(s=>s.phase===phase))errors.push("missing phase "+phase);
 for(const s of lesson.scenes){
  if(!validId(s.id)||s.title.trim().length<4||!s.explanation.length||
     s.explanation.some(p=>p.trim().length<20))errors.push("empty teaching: "+s.id);
  const options=s.help??[];
  if(options.length<2||options.length>6||
     new Set(options.map(x=>x.id)).size!==options.length||
     options.some(x=>!validId(x.id)||x.label.trim().length<6||
       !x.paragraphs.length||x.paragraphs.some(p=>p.trim().length<25)))
   errors.push("missing or invalid contextual help: "+s.id);
  if(s.written){
   const w=s.written;
   if(w.prompt.trim().length<20||w.accepted.length<1||w.accepted.length>6||
      new Set(w.accepted.map(normalizeTeacherWritten)).size!==w.accepted.length||
      w.accepted.some(a=>!a.trim()||a.length>40)||
      !w.success.trim()||!w.alternative.trim()||!w.wrongFeedback.trim()||
      w.mistakes?.some(m=>!m.answer.trim()||!m.feedback.trim()))
     errors.push("invalid written exercise: "+s.id);
  }
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
 return {version:TEACHER_VERSION,scene:lesson.scenes[0]?.id??"intro",
  visited:lesson.scenes[0]?[lesson.scenes[0].id]:[],hints:[],answers:{},paused:false,completedAt:null};
}
export function selectTeacherScene(lesson:TeacherLesson,p:TeacherProgress,id:string):TeacherProgress{
 if(!lesson.scenes.some(s=>s.id===id))return p;
 return {...p,scene:id,paused:false,visited:[...new Set([...p.visited,p.scene,id])]};
}
export function pauseTeacher(p:TeacherProgress):TeacherProgress{return {...p,paused:true};}
export function hintTeacher(lesson:TeacherLesson,p:TeacherProgress):TeacherProgress{
 const scene=lesson.scenes.find(s=>s.id===p.scene);
 if(p.paused||!scene?.hint)return p;
 return {...p,hints:[...new Set([...p.hints,p.scene])]};
}
/** Selecting authored help is a hint on any unanswered question. Merely
 * opening the help menu does not consume a hint or change learning evidence.
 * Previously earned independent first-try evidence is never changed. */
export function openTeacherHelp(lesson:TeacherLesson,p:TeacherProgress,helpId:string):TeacherProgress{
 const scene=lesson.scenes.find(s=>s.id===p.scene);
 if(p.paused||!scene?.help?.some(item=>item.id===helpId)||
    p.helpSelections?.[p.scene]===helpId)return p;
 const attempted=p.answers[p.scene];
 const written=p.answers[p.scene+"-written"];
 const consumesHint=Boolean(
   (scene.question&&!attempted?.correct&&!attempted?.revealed)||
   (scene.written&&!written?.correct&&!written?.revealed));
 return {...p,
   helpSelections:{...p.helpSelections,[p.scene]:helpId},
   hints:consumesHint?[...new Set([...p.hints,p.scene])]:p.hints};
}
/** Allow case, extra spaces and an optional final punctuation mark; never guess synonyms. */
export function normalizeTeacherWritten(text:string):string{
 return text.trim().replace(/\s+/g," ").replace(/[!.?]+$/u,"").trim().toLocaleLowerCase("de");
}
export function draftTeacherWritten(lesson:TeacherLesson,p:TeacherProgress,text:string):TeacherProgress{
 const scene=lesson.scenes.find(s=>s.id===p.scene);
 if(p.paused||!scene?.written||text.length>40||
    p.answers[p.scene+"-written"]?.correct||p.answers[p.scene+"-written"]?.revealed)return p;
 return {...p,writtenDrafts:{...p.writtenDrafts,[p.scene]:text}};
}
export function answerTeacherWritten(lesson:TeacherLesson,p:TeacherProgress,text:string,at:string):TeacherProgress{
 const scene=lesson.scenes.find(s=>s.id===p.scene),previous=p.answers[p.scene+"-written"];
 if(p.paused||!scene?.written||!validIso(at)||text.length>40||
    !normalizeTeacherWritten(text)||previous?.correct||previous?.revealed||(previous?.count??0)>=10)return p;
 const count=(previous?.count??0)+1;
 const normalized=normalizeTeacherWritten(text);
 const correct=scene.written.accepted.some(a=>normalizeTeacherWritten(a)===normalized);
 // A prior multiple-choice response may already have exposed the answer.
 const priorChoiceAttempt=Boolean(p.answers[p.scene]);
 return {...p,answers:{...p.answers,[p.scene+"-written"]:{
   answer:text,count,correct,independent:correct&&count===1&&!p.hints.includes(p.scene)&&
     !priorChoiceAttempt&&["independent","application","exit"].includes(scene.phase),revealed:false,at
 }}};
}
export function revealTeacherWritten(lesson:TeacherLesson,p:TeacherProgress,at:string):TeacherProgress{
 const scene=lesson.scenes.find(s=>s.id===p.scene),previous=p.answers[p.scene+"-written"];
 if(p.paused||!scene?.written||!validIso(at)||previous?.correct)return p;
 return {...p,answers:{...p.answers,[p.scene+"-written"]:{
   answer:previous?.answer??"",count:previous?.count??0,correct:false,
   independent:false,revealed:true,at
 }}};
}
export function answerTeacher(lesson:TeacherLesson,p:TeacherProgress,answer:string,at:string):TeacherProgress{
 const scene=lesson.scenes.find(s=>s.id===p.scene);
 const q=scene?.question,prev=p.answers[p.scene];
 if(p.paused||!validIso(at)||!q||!q.choices.some(x=>x.id===answer)||prev?.correct||prev?.revealed||((prev?.count??0)>=10))return p;
 const count=(prev?.count??0)+1,correct=answer===q.correctId;
 // After a written attempt, the learner has already seen the answer/feedback.
 // Keep historical MC-only evidence, but do not count the follow-up choice
 // as a second independent first-try demonstration of the same expression.
 const hasWrittenAttempt=Boolean(p.answers[p.scene+"-written"]);
 return {...p,answers:{...p.answers,[p.scene]:{answer,count,correct,
    independent:correct&&count===1&&!p.hints.includes(p.scene)&&!hasWrittenAttempt&&
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
  required:prompts.length,
  writtenIndependent:lesson.scenes.filter(s=>s.written&&p.answers[s.id+"-written"]?.independent).map(s=>s.id),
  writtenRequired:lesson.scenes.filter(s=>s.written).length,
  visited:p.visited.length};
}

/**
 * Lesson teaching completed is distinct from evidence of independent mastery.
 * Require every scripted scene to have been visited and every scripted question
 * to have an attempted or voluntarily revealed answer. Incorrect answers do
 * not trap the learner in an endless remediation loop.
 */
export function teacherCanComplete(lesson:TeacherLesson,p:TeacherProgress):boolean{
 if(p.paused||!lesson.scenes.length)return false;
 return lesson.scenes.every(scene=>p.visited.includes(scene.id)&&
   (!scene.question||Boolean(p.answers[scene.id]&&
     (p.answers[scene.id]!.count>0||p.answers[scene.id]!.revealed)))&&
   (!scene.written||Boolean(p.answers[scene.id+"-written"]&&
     (p.answers[scene.id+"-written"]!.count>0||p.answers[scene.id+"-written"]!.revealed))));
}
/** Historical completions remain; each material teaching revision is
 * acknowledged only after its own exercises have been attempted. */
export function teacherCurrentCompletion(lesson:TeacherLesson,p:TeacherProgress):boolean{
 return Boolean(p.completedAt&&(!lesson.contentRevision||
   (p.completedContentRevision===lesson.contentRevision&&Boolean(p.completedRevisionAt))));
}
export function finishTeacher(lesson:TeacherLesson,p:TeacherProgress,at:string):TeacherProgress{
 if(!validIso(at)||!teacherCanComplete(lesson,p)||teacherCurrentCompletion(lesson,p))return p;
 return {...p,completedAt:p.completedAt??at,
   ...(lesson.contentRevision?{completedContentRevision:lesson.contentRevision,completedRevisionAt:at}:{})};
}
