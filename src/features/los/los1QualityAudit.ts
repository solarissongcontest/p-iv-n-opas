import {LOS_BOOKS} from "./catalog.ts";
import {LOS1_REVISED_AB} from "./content/los1RevisedAB.ts";
import {LOS1_C_SPEECH_BLOCKS} from "./content/los1SupportSpeech.ts";
import {los1TokenIPADetail} from "./los1CourseGlossary.ts";
import {losSpeechSegments} from "./losSpeech.ts";

/** An inventory of real source text, not a claim that recorded media exists. */
export function los1AudioInventory() {
 const items:{id:string;chapterId:string;kind:"A"|"B"|"C";segmentCount:number;recordedAssetStatus:"missing"}[]=[];
 for (let i=1;i<=10;i++) {
  const chapterId=String(i).padStart(2,"0");
  const chapter=LOS1_REVISED_AB.chapters.find(ch=>ch.chapterId==="C"+chapterId);
  const texts=[
   {kind:"A" as const,blocks:chapter?.textA.blocks??[]},
   {kind:"B" as const,blocks:chapter?.textB.blocks??[]},
   {kind:"C" as const,blocks:LOS1_C_SPEECH_BLOCKS[chapterId]??[]},
  ];
  for (const text of texts) items.push({
   id:"LOS1-C"+chapterId+"-"+text.kind,
   chapterId,kind:text.kind,
   segmentCount:losSpeechSegments(text.blocks,chapterId,text.kind).length,
   recordedAssetStatus:"missing",
  });
 }
 return {total:items.length,withSpeech:items.filter(x=>x.segmentCount>0).length,
  recorded:0,items};
}

/** Printed IPA is either editorially curated or an explicitly labelled eSpeak draft. */
export function los1IPAAudit(){
 const rows=(LOS_BOOKS[0]?.chapters??[]).flatMap(ch=>ch.vocabulary.map(raw=>{
  const word=raw.split(" – ")[0]?.trim()??"";
  const detail=los1TokenIPADetail(word);
  return {chapterId:ch.id,word,ipa:detail?.ipa??null,
   status:detail?.source??"missing"};
 }));
 return {total:rows.length,editorial:rows.filter(x=>x.status==="editorial").length,
  synthetic:rows.filter(x=>x.status==="espeak-candidate").length,
  missing:rows.filter(x=>x.status==="missing").length,rows};
}
