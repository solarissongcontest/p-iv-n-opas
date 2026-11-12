import { getDeviceOwnerId } from "@/lib/deviceSession";
import { validLosChapter, validateLosCloudDraft, draftIsEmpty } from "./cloudContract";
import { losDraftKey, parseLosDraft, type LosChapterDraft } from "./studyState";

export const LOS_BACKUP_FORMAT="los-book-backup-v1";
export type LosBookBackup={
  format:typeof LOS_BACKUP_FORMAT;
  bookId:number;
  exportedAt:string;
  chapters:Record<string,LosChapterDraft>;
};
function chapterRange(bookId:number){
  // Book 1 has ten actual chapters plus reserved storage slot 91 for the
  // independently scored EX-MID. 91 is NOT a fictional chapter or lesson.
  const chapters=Array.from({length:10},(_,i)=>String(i+1).padStart(2,"0"));
  return bookId===1?[...chapters,"91"]:[];
}
export function createLosBookBackup(bookId=1):LosBookBackup{
  const chapters:Record<string,LosChapterDraft>={};
  const ownerId=getDeviceOwnerId();
  if(!ownerId)throw new Error("Laitteen omistajatunnus puuttuu.");
  for(const chapter of chapterRange(bookId)){
    let draft:LosChapterDraft;
    try{draft=parseLosDraft(localStorage.getItem(losDraftKey(bookId,chapter,ownerId)));}
    catch{continue;}
    if(!draftIsEmpty(draft))chapters[chapter]=draft;
  }
  return {format:LOS_BACKUP_FORMAT,bookId,exportedAt:new Date().toISOString(),chapters};
}
export function parseLosBookBackup(value:string):LosBookBackup{
  if(new TextEncoder().encode(value).length>1_000_000)throw new Error("Varmuuskopiotiedosto on liian suuri.");
  let obj:unknown;
  try{obj=JSON.parse(value);}catch{throw new Error("Tiedosto ei ole kelvollista JSON-muotoa.");}
  if(!obj || typeof obj!=="object" || Array.isArray(obj))throw new Error("Varmuuskopion rakenne on virheellinen.");
  const data=obj as Partial<LosBookBackup>;
  if(data.format!==LOS_BACKUP_FORMAT || data.bookId!==1 ||
    typeof data.exportedAt!=="string" || !Number.isFinite(Date.parse(data.exportedAt)) ||
    !data.chapters || typeof data.chapters!=="object" || Array.isArray(data.chapters)){
    throw new Error("Tiedosto ei ole LOS! 1:n varmuuskopio.");
  }
  const entries=Object.entries(data.chapters);
  if(entries.length>chapterRange(1).length)throw new Error("Varmuuskopiossa on liian monta tallennuskohdetta.");
  const chapters:Record<string,LosChapterDraft>={};
  for(const [id,draft] of entries){
    if(!validLosChapter(1,id)||!chapterRange(1).includes(id)||!validateLosCloudDraft(draft))
      throw new Error(`Varmuuskopion kappale ${id} sisältää virheellisiä tietoja.`);
    chapters[id]=draft;
  }
  return {format:LOS_BACKUP_FORMAT,bookId:1,exportedAt:data.exportedAt,chapters};
}
export function planLosBookImport(backup:LosBookBackup,existing:LosBookBackup){
  const incoming=Object.keys(backup.chapters);
  const conflicts=incoming.filter(id=>!draftIsEmpty(existing.chapters[id]??{
    version:1,note:"",applicationDraft:"",bookmarked:false,practiceAnswers:{},
    practiceChecked:[],testAnswers:{},testSubmittedAt:null,selfAssessment:"",updatedAt:""
  }));
  return {incoming,conflicts,newChapters:incoming.filter(id=>!conflicts.includes(id))};
}
export function importLosBookBackup(backup:LosBookBackup,mode:"missing-only"|"replace"){
  const ownerId=getDeviceOwnerId();
  if(!ownerId)throw new Error("Laitteen omistajatunnus puuttuu.");
  const current=createLosBookBackup(backup.bookId);
  const plan=planLosBookImport(backup,current);
  const chosen=mode==="missing-only"?plan.newChapters:plan.incoming;
  let imported=0;
  for(const chapter of chosen){
    const draft=backup.chapters[chapter];
    if(!draft)continue;
    const key=losDraftKey(backup.bookId,chapter,ownerId);
    try{
      localStorage.setItem(key,JSON.stringify(draft));
      window.dispatchEvent(new CustomEvent("los:draft-change",{detail:{key,draft}}));
      imported++;
    }catch{throw new Error(`Tallennustila täyttyi. Tuotiin ${imported}/${chosen.length} kappaletta, ja vanha varmuuskopio on edelleen ladattavissa.`);}
  }
  return {imported,skipped:plan.incoming.length-imported};
}
export function downloadLosBookBackup(backup:LosBookBackup,name?:string){
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const link=document.createElement("a");
  link.href=url;
  link.download=name??`LOS-${backup.bookId}-varmuuskopio-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(link);link.click();link.remove();
  window.setTimeout(()=>URL.revokeObjectURL(url),30_000);
}
