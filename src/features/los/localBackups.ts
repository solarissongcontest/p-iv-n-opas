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
  // Book 1 has ten real chapters and three reserved assessment slots:
  // 91 = Kertaus I / EX-MID; 92 = Kertaus II; 93 = EX-FINAL / L060 summary.
  // None is an eleventh chapter. Older backups remain accepted.
  const chapters=Array.from({length:10},(_,i)=>String(i+1).padStart(2,"0"));
  return bookId===1?[...chapters,"91","92","93"]:[];
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

  // Validate and serialize every chapter, then snapshot all target keys,
  // before the first write. No existing storage key/ID is renamed.
  const pending=chosen.map(chapter=>{
    const draft=backup.chapters[chapter];
    if(!draft||!validateLosCloudDraft(draft))
      throw new Error("Varmuuskopion kappale "+chapter+" ei ole kelvollinen.");
    const key=losDraftKey(backup.bookId,chapter,ownerId);
    let previous:string|null;
    try{previous=localStorage.getItem(key);}
    catch{throw new Error("Nykyisten tallennusten varmistaminen epäonnistui. Tietoja ei muutettu.");}
    return {key,draft,previous,serialized:JSON.stringify(draft)};
  });

  const written:typeof pending=[];
  try{
    for(const item of pending){
      localStorage.setItem(item.key,item.serialized);
      written.push(item);
    }
  }catch{
    // Web Storage does not support multi-key transactions. Best-effort
    // reverse rollback prevents the usual quota-error partial restore.
    let rollbackFailed=false;
    for(const item of written.reverse()){
      try{
        if(item.previous===null)localStorage.removeItem(item.key);
        else localStorage.setItem(item.key,item.previous);
      }catch{rollbackFailed=true;}
    }
    if(rollbackFailed)throw new Error(
      "Tuonti keskeytyi, eikä kaikkia paikallisia tallennuksia voitu palauttaa. "+
      "Säilytä varmuuskopiot ja tarkista kappaleet ennen uutta yritystä.");
    throw new Error("Tuonti keskeytyi. Aiemmat paikalliset tallennukset palautettiin.");
  }
  // The current tab receives no partial success events before all writes pass.
  for(const item of pending)
    window.dispatchEvent(new CustomEvent("los:draft-change",{
      detail:{key:item.key,draft:item.draft},
    }));
  return {imported:pending.length,skipped:plan.incoming.length-pending.length};
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
