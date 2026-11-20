import {validTeacherSession,type TeacherSession} from "../los/teacher/engine.ts";

/** A private, owner-scoped backup of authentic Teacher 2.0 sessions.
 * LOS! and English use the same session schema and engine, but must never
 * share user keys or mix evidence from different languages.
 */
export type EnglishTeacherBackupFields={
  teacherSessions?:Record<string,TeacherSession>;
  teacherSessionHistory?:Record<string,TeacherSession[]>;
};
export type EnglishTeacherBackupWrite={key:string;value:string};
const MAX_LESSONS=192;
const MAX_ARCHIVED=8;
const MAX_JSON_BYTES=12_000_000;
export const englishTeacherStorageKey=(ownerId:string,lessonId:string)=>
  "em-teacher-core-v1-"+ownerId+"-"+lessonId;

function validSessionForLesson(data:unknown,lessonId:string):data is TeacherSession{
  return validTeacherSession(data)&&data.lessonId===lessonId;
}
function isRecord(value:unknown):value is Record<string,unknown>{
  return Boolean(value&&typeof value==="object"&&!Array.isArray(value));
}
function checkedEntries(value:unknown,allowed:Set<string>,kind:string):[string,unknown][]{
  if(value===undefined)return [];
  if(!isRecord(value))throw new Error(kind+" ei vastaa Teacher 2.0:n varmuuskopiorakennetta.");
  const entries=Object.entries(value);
  if(entries.length>MAX_LESSONS)throw new Error(kind+" sisältää liian monta oppituntia.");
  if(entries.some(([id])=>!allowed.has(id)))
    throw new Error(kind+" sisältää tuntemattoman oppitunnin.");
  return entries;
}

/** Gather only validated sessions; corrupt saves must not be exported as
 * apparently trustworthy copies. This keeps the original raw local save intact.
 */
export function collectEnglishTeacherBackup(ownerId:string,lessonIds:readonly string[]):EnglishTeacherBackupFields{
  const result:Required<EnglishTeacherBackupFields>={teacherSessions:{},teacherSessionHistory:{}};
  for(const id of lessonIds){
    const key=englishTeacherStorageKey(ownerId,id);
    const raw=localStorage.getItem(key);
    if(raw!==null){
      let data:unknown;
      try{data=JSON.parse(raw);}catch{throw new Error("Teacher 2.0 -tallenne on vioittunut: "+id);}
      if(!validSessionForLesson(data,id))
        throw new Error("Teacher 2.0 -tallenne ei läpäissyt tarkistusta: "+id);
      result.teacherSessions[id]=data;
    }
    const historyRaw=localStorage.getItem(key+"-archive");
    if(historyRaw!==null){
      let history:unknown;
      try{history=JSON.parse(historyRaw);}catch{throw new Error("Teacher 2.0 -arkisto on vioittunut: "+id);}
      if(!Array.isArray(history)||history.length>MAX_ARCHIVED||
          !history.every(session=>validSessionForLesson(session,id)))
        throw new Error("Teacher 2.0 -arkisto ei läpäissyt tarkistusta: "+id);
      result.teacherSessionHistory[id]=history;
    }
  }
  const json=JSON.stringify(result);
  if(new TextEncoder().encode(json).length>MAX_JSON_BYTES)
    throw new Error("Teacher 2.0 -varmuuskopio on liian suuri.");
  return result;
}

/** Prepare a strictly validated, non-destructive restore plan. The caller
 * performs all writes transactionally, together with book progress and notes.
 * Older backups without Teacher 2.0 fields remain accepted.
 */
export function prepareEnglishTeacherRestore(
  backup:unknown,ownerId:string,lessonIds:readonly string[],
):EnglishTeacherBackupWrite[]{
  if(!isRecord(backup))throw new Error("Virheellinen Teacher 2.0 -varmuuskopio.");
  const allowed=new Set(lessonIds);
  const sessions=checkedEntries(backup["teacherSessions"],allowed,"Teacher 2.0 -tallenteet");
  const histories=checkedEntries(backup["teacherSessionHistory"],allowed,"Teacher 2.0 -arkistot");
  const writes:EnglishTeacherBackupWrite[]=[];
  for(const [id,value] of sessions){
    if(!validSessionForLesson(value,id))throw new Error("Virheellinen Teacher 2.0 -oppitunti: "+id);
    writes.push({key:englishTeacherStorageKey(ownerId,id),value:JSON.stringify(value)});
  }
  for(const [id,value] of histories){
    if(!Array.isArray(value)||value.length>MAX_ARCHIVED||
      !value.every(session=>validSessionForLesson(session,id)))
      throw new Error("Virheellinen Teacher 2.0 -oppituntihistoria: "+id);
    writes.push({key:englishTeacherStorageKey(ownerId,id)+"-archive",value:JSON.stringify(value)});
  }
  const total=JSON.stringify(writes);
  if(new TextEncoder().encode(total).length>MAX_JSON_BYTES)
    throw new Error("Teacher 2.0 -varmuuskopio on liian suuri.");
  return writes;
}
