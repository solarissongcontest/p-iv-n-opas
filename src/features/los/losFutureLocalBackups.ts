import { LOS_BOOKS } from "./catalog.ts";
import type { LosChapterDraft } from "./studyState.ts";
import { losFutureExercisesFor } from "./content/losFutureExercises.ts";
import { losFutureLessonOutline } from "./losFutureLessonOutline.ts";
import { LOS_FUTURE_STAGE_IDS,losFuturePracticeDraftKey } from "./losFuturePracticeProgress.ts";

export const LOS_FUTURE_BACKUP_FORMAT="los-future-book-backup-v1";
export const LOS_FUTURE_BACKUP_MAX_BYTES=5_000_000;
export type LosFutureBookBackup={
  format:typeof LOS_FUTURE_BACKUP_FORMAT;
  bookId:number;
  exportedAt:string;
  chapters:Record<string,LosChapterDraft>;
};
export type LosFutureBackupStorage=Pick<Storage,"getItem"|"setItem"|"removeItem">;
const chapters=Array.from({length:10},(_,n)=>String(n+1).padStart(2,"0"));
const isObject=(v:unknown):v is Record<string,unknown>=>v!==null&&typeof v==="object"&&!Array.isArray(v);
const textUnder=(v:unknown,max:number)=>typeof v==="string"&&v.length<=max;
const strMap=(v:unknown,maxKeys:number,maxLength:number)=>{
  return isObject(v)&&Object.keys(v).length<=maxKeys&&Object.entries(v).every(([key,value])=>
    key.length<=110&&textUnder(value,maxLength));
};
function validBook(bookId:unknown):bookId is number{
  return typeof bookId==="number"&&Number.isInteger(bookId)&&bookId>=2&&bookId<=8;
}
const validDate=(date:unknown):date is string=>typeof date==="string"&&date.length<=40&&
  /^\d{4}-\d{2}-\d{2}T/.test(date)&&Number.isFinite(Date.parse(date));

function allowedKeys(bookId:number,chapterId:string){
  const book=LOS_BOOKS[bookId-1];
  if(!book||book.id!==bookId)throw Error("Kirjan sisältörunkoa ei löydy varmuuskopion tarkistusta varten.");
  const taskIds=losFutureExercisesFor(bookId,chapterId).map(x=>x.id);
  const scripts=losFutureLessonOutline(book).filter(item=>item.chapterId===chapterId);
  const answers=new Set([...taskIds,...scripts.map(s=>s.id+":own-reflection")]);
  const marks=new Set([...taskIds,...scripts.flatMap(s=>
    LOS_FUTURE_STAGE_IDS.map(stage=>"los.future.guided:"+s.id+":"+stage))]);
  return {answers,marks};
}
function validDraft(draft:unknown,bookId:number,chapterId:string):draft is LosChapterDraft {
  if(!isObject(draft)||draft["version"]!==1||!textUnder(draft["note"],8000)
    ||!textUnder(draft["applicationDraft"],5000)||typeof draft["bookmarked"]!=="boolean"
    ||!textUnder(draft["selfAssessment"],5000)||!textUnder(draft["updatedAt"],40)
    ||(draft["updatedAt"]!==""&&!validDate(draft["updatedAt"]))
    ||!strMap(draft["practiceAnswers"],50,5000)
    ||!Array.isArray(draft["practiceChecked"])||draft["practiceChecked"].length>100
    ||!draft["practiceChecked"].every((x:unknown)=>textUnder(x,110))
    ||!isObject(draft["testAnswers"])||Object.keys(draft["testAnswers"]).length!==0
    ||draft["testSubmittedAt"]!==null)return false;
  if(draft["readerMarks"]!==undefined&&!strMap(draft["readerMarks"],200,500))return false;
  // Later-book graded exams and recall/lesson evidence are not approved yet.
  // Don't allow an imported file to invent either of them.
  if(draft["lessonProgress"]!==undefined&&(!isObject(draft["lessonProgress"])||Object.keys(draft["lessonProgress"]).length>0))return false;
  if(draft["recallCards"]!==undefined&&(!isObject(draft["recallCards"])||Object.keys(draft["recallCards"]).length>0))return false;
  const keys=allowedKeys(bookId,chapterId);
  return Object.keys(draft["practiceAnswers"] as Record<string,string>).every(k=>keys.answers.has(k))
    &&(draft["practiceChecked"] as string[]).every(k=>keys.marks.has(k))
    &&new TextEncoder().encode(JSON.stringify(draft)).length<=200_000;
}
function hasStudentData(draft:LosChapterDraft):boolean {
  return Boolean(draft.note.trim()||draft.applicationDraft.trim()||draft.bookmarked
    ||draft.selfAssessment.trim()||draft.practiceChecked.length
    ||Object.values(draft.practiceAnswers).some(v=>Boolean(v.trim()))
    ||(draft.readerMarks&&Object.values(draft.readerMarks).some(Boolean)));
}
function checkedBook(bookId:number,ownerId:string) {
  if(!validBook(bookId))throw Error("Varmuuskopion kirjanumero on virheellinen.");
  if(!ownerId)throw Error("Laitteen omistajatunnus puuttuu.");
}
function parseChapterDraft(raw:string,bookId:number,chapterId:string):LosChapterDraft {
  let data:unknown;
  try{data=JSON.parse(raw);}catch{throw Error(`Kappaleen ${chapterId} paikallinen tallennus on vioittunut.`);}
  if(!validDraft(data,bookId,chapterId))throw Error(`Kappaleen ${chapterId} tietoja ei voitu tarkistaa. Varmuuskopiota ei tehty vajavaisena.`);
  return data;
}
/** Owner ID is supplied by the trusted caller; never included in the downloaded file. */
export function createLosFutureBackup(bookId:number,ownerId:string,storage:Pick<Storage,"getItem">,now=new Date()):LosFutureBookBackup{
  checkedBook(bookId,ownerId);
  const drafts:Record<string,LosChapterDraft>=Object.create(null);
  for(const chapterId of chapters){
    const raw=storage.getItem(losFuturePracticeDraftKey(bookId,chapterId,ownerId));
    if(raw===null)continue;
    const draft=parseChapterDraft(raw,bookId,chapterId);
    if(hasStudentData(draft))drafts[chapterId]=draft;
  }
  return {format:LOS_FUTURE_BACKUP_FORMAT,bookId,exportedAt:now.toISOString(),chapters:drafts};
}
export function parseLosFutureBackup(raw:string):LosFutureBookBackup{
  if(new TextEncoder().encode(raw).length>LOS_FUTURE_BACKUP_MAX_BYTES)throw Error("Varmuuskopio on liian suuri (enintään 5 Mt).");
  let input:unknown;
  try{input=JSON.parse(raw);}catch{throw Error("Tiedosto ei ole kelvollista JSON-muotoa.");}
  if(!isObject(input)||input["format"]!==LOS_FUTURE_BACKUP_FORMAT||!validBook(input["bookId"])
    ||!validDate(input["exportedAt"])||!isObject(input["chapters"])
    ||Object.keys(input["chapters"]).length>10)throw Error("Tiedosto ei ole kelvollinen LOS! 2–8 -kirjan varmuuskopio.");
  const entries=Object.entries(input["chapters"]);
  const drafts:Record<string,LosChapterDraft>=Object.create(null);
  for(const [id,value] of entries){
    if(!chapters.includes(id)||!validDraft(value,input["bookId"],id))
      throw Error(`Varmuuskopion kappale ${id} on virheellinen tai kuuluu väärään kirjaan.`);
    drafts[id]=value;
  }
  return {format:LOS_FUTURE_BACKUP_FORMAT,bookId:input["bookId"],exportedAt:input["exportedAt"],chapters:drafts};
}
export function planLosFutureBackupImport(incoming:LosFutureBookBackup,existing:LosFutureBookBackup){
  if(incoming.bookId!==existing.bookId)throw Error("Varmuuskopio kuuluu eri LOS!-kirjaan.");
  const all=Object.keys(incoming.chapters);
  const conflicts=all.filter(ch=>Boolean(existing.chapters[ch]&&hasStudentData(existing.chapters[ch])));
  return {incoming:all,conflicts,missing:all.filter(ch=>!conflicts.includes(ch))};
}
/** Atomic best-effort rollback: no partial success is reported. Imported data
 * are only dispatched to React after every storage write has succeeded. */
export function applyLosFutureBackup(
  incoming:LosFutureBookBackup,bookId:number,ownerId:string,
  storage:LosFutureBackupStorage,mode:"missing-only"|"replace",
) {
  checkedBook(bookId,ownerId);
  if(incoming.bookId!==bookId)throw Error("Toisen kirjan varmuuskopiota ei voi tuoda tähän kirjaan.");
  const current=createLosFutureBackup(bookId,ownerId,storage);
  const plan=planLosFutureBackupImport(incoming,current);
  const selected=mode==="replace"?plan.incoming:plan.missing;
  const previous=selected.map(id=>({id,key:losFuturePracticeDraftKey(bookId,id,ownerId),
    raw:storage.getItem(losFuturePracticeDraftKey(bookId,id,ownerId))}));
  let imported=0;
  try {
    for(const {id,key} of previous){
      storage.setItem(key,JSON.stringify(incoming.chapters[id]));
      imported++;
    }
  }catch{
    let rollbackFailed=false;
    for(const {key,raw} of previous.reverse()){
      try{if(raw===null)storage.removeItem(key);else storage.setItem(key,raw);}
      catch{rollbackFailed=true;}
    }
    throw Error(rollbackFailed
      ?"Tallennus epäonnistui ja palautus saattoi jäädä kesken. Säilytä varmuuskopiotiedosto."
      :"Tallennus epäonnistui. Aiemmat paikalliset tiedot palautettiin.");
  }
  return {imported,skipped:plan.incoming.length-imported,
    changes:selected.map(id=>({key:losFuturePracticeDraftKey(bookId,id,ownerId),draft:incoming.chapters[id]}))};
}
