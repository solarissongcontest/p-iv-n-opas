import { useCallback, useEffect, useState } from "react";
import { getDeviceOwnerId } from "@/lib/deviceSession";

/**
 * Opiskelijakohtainen paikallinen luonnos. EI pilvisynkronointia.
 * Tiedostoon ei tallenneta nimiä, henkilötietoja tai autentikaatiotietoja.
 */
export type LosChapterDraft = {
  version: 1;
  note: string;
  bookmarked: boolean;
  practiceAnswers: Record<string,string>;
  practiceChecked: string[];
  testAnswers: Record<string,string>;
  testSubmittedAt: string | null;
  selfAssessment: string;
  updatedAt: string;
};
export function emptyLosDraft(): LosChapterDraft {
  return {version:1,note:"",bookmarked:false,practiceAnswers:{},practiceChecked:[],testAnswers:{},testSubmittedAt:null,selfAssessment:"",updatedAt:""};
}
export function losDraftKey(bookId:number,chapterId:string,ownerId:string):string {
  return `los.local.v1.${ownerId}.${bookId}.${chapterId}`;
}
function isStringRecord(value:unknown):value is Record<string,string> {
  return Boolean(value && typeof value==="object" && !Array.isArray(value) && Object.values(value).every(item=>typeof item==="string"));
}
export function parseLosDraft(value:string | null):LosChapterDraft {
  if(!value)return emptyLosDraft();
  try {
    const input=JSON.parse(value) as Partial<LosChapterDraft>;
    if(input.version!==1 || !isStringRecord(input.practiceAnswers) || !isStringRecord(input.testAnswers))return emptyLosDraft();
    return {
      version:1,
      note:typeof input.note==="string"?input.note.slice(0,8000):"",
      bookmarked:input.bookmarked===true,
      practiceAnswers:input.practiceAnswers,
      practiceChecked:Array.isArray(input.practiceChecked)?input.practiceChecked.filter((id):id is string=>typeof id==="string"):[],
      testAnswers:input.testAnswers,
      testSubmittedAt:typeof input.testSubmittedAt==="string"?input.testSubmittedAt:null,
      selfAssessment:typeof input.selfAssessment==="string"?input.selfAssessment.slice(0,5000):"",
      updatedAt:typeof input.updatedAt==="string"?input.updatedAt:"",
    };
  }catch{return emptyLosDraft();}
}
export function useLosChapterDraft(bookId:number,chapterId:string) {
  const ownerId=typeof window==="undefined"?null:getDeviceOwnerId();
  const key=ownerId?losDraftKey(bookId,chapterId,ownerId):null;
  const [draft,setDraft]=useState<LosChapterDraft>(()=> {
    if(!key || typeof localStorage==="undefined")return emptyLosDraft();
    try{return parseLosDraft(localStorage.getItem(key));}catch{return emptyLosDraft();}
  });
  const [saved,setSaved]=useState(true);
  useEffect(()=>{
    if(!key)return;
    try {setDraft(parseLosDraft(localStorage.getItem(key)));setSaved(true);}
    catch {setDraft(emptyLosDraft());setSaved(false);}
    const onStorage=(event:StorageEvent)=>{
      if(event.key===key){setDraft(parseLosDraft(event.newValue));setSaved(true);}
    };
    window.addEventListener("storage",onStorage);
    return ()=>window.removeEventListener("storage",onStorage);
  },[key]);
  const update=useCallback((modify:(current:LosChapterDraft)=>LosChapterDraft)=>{
    setDraft(current=>{
      const next:LosChapterDraft={...modify(current),version:1,updatedAt:new Date().toISOString()};
      if(key){
        try{localStorage.setItem(key,JSON.stringify(next));setSaved(true);}
        catch{setSaved(false);}
      }else{setSaved(false);}
      return next;
    });
  },[key]);
  return {draft,update,saved};
}
