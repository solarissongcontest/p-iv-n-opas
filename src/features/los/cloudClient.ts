import { getDeviceAccessToken, getDeviceOwnerId } from "@/lib/deviceSession";
import type { LosChapterDraft } from "./studyState";
import { validateLosCloudDraft, type LosCloudRecord } from "./cloudContract";

let passphrase: string | null=null;
/** Secret stays in module memory only, never in persistent browser storage. */
export function hasLosSyncPassphrase(){return Boolean(passphrase);}
export function setLosSyncPassphrase(value:string|null){passphrase=value;}

export class LosCloudError extends Error {
  constructor(message:string,public readonly status:number,public readonly record:LosCloudRecord|null=null){super(message);}
}
function parseRecord(raw:unknown):LosCloudRecord|null {
  if(raw===null)return null;
  if(!raw||typeof raw!=="object")throw new LosCloudError("Pilvitiedon rakenne ei kelpaa. Sitä ei tuotu laitteelle.",502);
  const rec=raw as Partial<LosCloudRecord>;
  if(!Number.isSafeInteger(rec.revision)||!rec.revision||rec.revision<1||
    !validateLosCloudDraft(rec.payload)||typeof rec.updated_at!=="string") {
    throw new LosCloudError("Pilvitiedon rakenne ei kelpaa. Sitä ei tuotu laitteelle.",502);
  }
  return {revision:rec.revision,payload:rec.payload,updated_at:rec.updated_at};
}
async function requestCloud(method:"GET"|"PUT",book:number,chapter:string,body?:{
  expected_revision:number;payload:LosChapterDraft;
},providedPassphrase?:string) {
  const token=getDeviceAccessToken();
  const secret=providedPassphrase??passphrase;
  if(!secret)throw new LosCloudError("Anna pilvitallennuksen salasana.",401);
  if(!token)throw new LosCloudError("Laitetunnistus on vanhentunut. Avaa Opintopäiväkirja verkkoyhteydellä ja palaa kirjaan.",401);
  const url=`/api/los-sync?book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}`;
  let response:Response;
  try{response=await fetch(url,{
    method,cache:"no-store",credentials:"same-origin",
    headers:{"Authorization":`Bearer ${token}`,"X-LOS-Sync-Key":secret,...(body?{"Content-Type":"application/json"}:{})},
    ...(body?{body:JSON.stringify({book_id:book,chapter_id:chapter,...body})}:{}),
  });}
  catch{throw new LosCloudError("Verkkoyhteys ei toimi. Paikallinen teksti säilyy.",0);}
  const data=await response.json().catch(()=>({})) as {record?:unknown;error?:string};
  let record:LosCloudRecord|null=null;
  if(data.record!==undefined)record=parseRecord(data.record);
  if(!response.ok)throw new LosCloudError(
    typeof data.error==="string"?data.error:"Pilvitallennus epäonnistui.",
    response.status,record
  );
  return record;
}
export function fetchLosCloud(book:number,chapter:string,providedPassphrase?:string){
  return requestCloud("GET",book,chapter,undefined,providedPassphrase);
}
export function uploadLosCloud(book:number,chapter:string,payload:LosChapterDraft,expected_revision:number){
  return requestCloud("PUT",book,chapter,{payload,expected_revision});
}
export type LosCloudMetadata={revision:number;fingerprint:string};
export function losDraftFingerprint(draft:LosChapterDraft){
  // A successful cloud write alters only timestamps. Content is authoritative.
  return JSON.stringify({...draft,updatedAt:""});
}
function metaKey(book:number,chapter:string){
  const owner=getDeviceOwnerId();
  return owner?`los.cloud.v1.${owner}.${book}.${chapter}`:null;
}
export function loadLosCloudMeta(book:number,chapter:string):LosCloudMetadata|null{
  const key=metaKey(book,chapter);
  if(!key||typeof localStorage==="undefined")return null;
  try{
    const raw=localStorage.getItem(key);
    if(!raw)return null;
    const data=JSON.parse(raw) as Partial<LosCloudMetadata>;
    return Number.isSafeInteger(data.revision)&&Number(data.revision)>0&&typeof data.fingerprint==="string"?
      {revision:data.revision as number,fingerprint:data.fingerprint}:null;
  }catch{return null;}
}
export function storeLosCloudMeta(book:number,chapter:string,record:LosCloudRecord){
  const key=metaKey(book,chapter);
  if(!key||typeof localStorage==="undefined")return;
  try{localStorage.setItem(key,JSON.stringify({revision:record.revision,fingerprint:losDraftFingerprint(record.payload)}));}
  catch{/* If metadata cannot be stored, next sync defaults to safe conflict flow. */}
}
export function backupLosLocalDraft(book:number,chapter:string,payload:LosChapterDraft){
  const blob=new Blob([JSON.stringify({format:"los-local-backup-v1",book,chapter,payload,exportedAt:new Date().toISOString()},null,2)],{type:"application/json;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const link=document.createElement("a");
  link.href=url;link.download=`LOS-${book}-kappale-${chapter}-varmuuskopio.json`;
  document.body.appendChild(link);link.click();link.remove();
  window.setTimeout(()=>URL.revokeObjectURL(url),30_000);
}
