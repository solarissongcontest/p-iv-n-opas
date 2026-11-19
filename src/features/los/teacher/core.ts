/** LOS Teacher Experience 2.0: small deterministic core, no AI calls.
 * Session state is separate from legacy lessonProgress. Completing an instruction
 * sequence never certifies German proficiency.
 */
export type TeacherPhase =
  "introducing"|"teaching"|"practicing"|"feedback"|"remediating"|"applying"|"reviewing"|"completed"|"paused";
export type TeacherError = "TIME_OF_DAY"|"GOODBYE_VS_GREETING"|"RECALL"|"OTHER";
export type TeacherTask = {
  kind:"choice"|"short";
  prompt:string;
  options?:readonly {id:string;label:string}[];
  answer:string;
  hint:string;
  remedial:string;
  correctFeedback:string;
  wrongFeedback:string;
  wrongTypes?:Readonly<Record<string,TeacherError>>;
};
export type TeacherBoard = {steps:readonly {heading:string;german:string;finnish:string;explanation:string}[]};
export type TeacherScene = {
  id:string;phase:Exclude<TeacherPhase,"feedback"|"remediating"|"completed"|"paused">;
  title:string;kicker:string;intro:string;explanation?:string;
  example?:{german:string;finnish:string;reason:string};
  simple?:string;comparison?:string;board?:TeacherBoard;task?:TeacherTask;
  book?:{label:string;hash:string};
};
export type TeacherAttempt = {
  count:number;answer:string;correct:boolean;helped:boolean;error:TeacherError|null;checkedAt:string;
};
export type TeacherSession = {
  version:1;script:"L004@2.0.0";scene:number;boardStep:number;
  attempts:Record<string,TeacherAttempt>;
  helpUsed:Record<string,number>;
  completedAt:string|null;updatedAt:string;
};
export const TEACHER_L004_SCRIPT="L004@2.0.0" as const;
const safeStamp=(value:unknown):value is string=>
  typeof value==="string"&&value.length<=40&&/^\\d{4}-\\d{2}-\\d{2}T/.test(value)&&Number.isFinite(Date.parse(value));
export function emptyTeacherSession():TeacherSession {
  return {version:1,script:TEACHER_L004_SCRIPT,scene:0,boardStep:0,attempts:{},helpUsed:{},completedAt:null,updatedAt:""};
}
export function parseTeacherSessions(value:unknown):Record<string,TeacherSession>{
  if(!value||typeof value!=="object"||Array.isArray(value))return {};
  const entries=Object.entries(value);
  if(entries.length>10)return {};
  const result:Record<string,TeacherSession>={};
  for(const [id,raw] of entries){
    if(id!=="L004"||!raw||typeof raw!=="object"||Array.isArray(raw))continue;
    const v=raw as Partial<TeacherSession>;
    if(v.version!==1||v.script!==TEACHER_L004_SCRIPT||!Number.isInteger(v.scene)||v.scene!<0||v.scene!>20||
       !Number.isInteger(v.boardStep)||v.boardStep!<0||v.boardStep!>20)continue;
    const attempts:Record<string,TeacherAttempt>={};
    for(const [key,item] of Object.entries(v.attempts??{}).slice(0,20)){
      if(!/^[a-z0-9-]{1,40}$/.test(key)||!item||typeof item!=="object")continue;
      const a=item as TeacherAttempt;
      if(!Number.isInteger(a.count)||a.count<1||a.count>100||typeof a.answer!=="string"||
         a.answer.length>160||typeof a.correct!=="boolean"||typeof a.helped!=="boolean"||
         ![null,"TIME_OF_DAY","GOODBYE_VS_GREETING","RECALL","OTHER"].includes(a.error)||
         !safeStamp(a.checkedAt))continue;
      attempts[key]={count:a.count,answer:a.answer,correct:a.correct,helped:a.helped,error:a.error,checkedAt:a.checkedAt};
    }
    const helpUsed:Record<string,number>={};
    for(const [key,count] of Object.entries(v.helpUsed??{}).slice(0,30))
      if(/^[a-z0-9-]{1,40}$/.test(key)&&Number.isInteger(count)&&count>=0&&count<=100)helpUsed[key]=count;
    result[id]={version:1,script:TEACHER_L004_SCRIPT,scene:v.scene!,boardStep:v.boardStep!,
      attempts,helpUsed,completedAt:v.completedAt===null||safeStamp(v.completedAt)?v.completedAt:null,
      updatedAt:safeStamp(v.updatedAt)?v.updatedAt:""};
  }
  return result;
}
export function normalizeGermanAnswer(text:string):string {
  return text.trim().replace(/\\s+/g," ").replace(/[.!?]+$/g,"").trim().toLocaleLowerCase("de");
}
export function checkTeacherAnswer(task:TeacherTask,answer:string):boolean{
  return task.kind==="choice"?answer===task.answer:
    normalizeGermanAnswer(answer)===normalizeGermanAnswer(task.answer);
}
export function submitTeacherAnswer(session:TeacherSession,scene:TeacherScene,answer:string,now:string):TeacherSession{
  if(!scene.task||!answer.trim())return session;
  const prev=session.attempts[scene.id];
  const correct=checkTeacherAnswer(scene.task,answer);
  const error:TeacherError|null=correct?null:
    scene.task.kind==="choice"?(scene.task.wrongTypes?.[answer]??"OTHER"):"RECALL";
  return {...session,updatedAt:now,attempts:{...session.attempts,[scene.id]:{
    count:Math.min(100,(prev?.count??0)+1),answer,correct,helped:Boolean(session.helpUsed[scene.id]),
    error,checkedAt:now
  }}};
}
export function markTeacherHelp(session:TeacherSession,sceneId:string,now:string):TeacherSession {
  return {...session,updatedAt:now,helpUsed:{...session.helpUsed,[sceneId]:Math.min(100,(session.helpUsed[sceneId]??0)+1)}};
}
export function teacherNext(session:TeacherSession,sceneCount:number,now:string):TeacherSession{
  return {...session,scene:Math.min(sceneCount-1,session.scene+1),boardStep:0,updatedAt:now};
}
export function teacherPrevious(session:TeacherSession,now:string):TeacherSession{
  return {...session,scene:Math.max(0,session.scene-1),boardStep:0,updatedAt:now};
}
export function teacherPhase(scene:TeacherScene,attempt?:TeacherAttempt):TeacherPhase {
  if(attempt&&!attempt.correct)return attempt.count>=2?"remediating":"feedback";
  if(attempt?.correct)return "feedback";
  return scene.phase;
}
export function finishTeacherSession(session:TeacherSession,now:string):TeacherSession {
  // Reaching the final scene alone never creates a completion timestamp.
  return {...session,completedAt:now,updatedAt:now};
}
export function teacherEvidenceSummary(session:TeacherSession){
  const entries=Object.values(session.attempts);
  return {
    attempted:entries.length,correct:entries.filter(a=>a.correct).length,
    independent:entries.filter(a=>a.correct&&!a.helped&&a.count===1).length,
    needsPractice:entries.filter(a=>!a.correct).length
  };
}
