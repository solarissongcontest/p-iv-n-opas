import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
 LOS_RICH_TYPES,LOS1_RICH_TASKS,gradeLosRichTask,losRichTasksFor,validateLosRichBank,
} from "../src/features/los/content/los1RichExercises.ts";
import {validateLosCloudDraft} from "../src/features/los/cloudContract.ts";

const get=(type:string)=>{const task=LOS1_RICH_TASKS.find(item=>item.type===type);assert.ok(task,type);return task;};
test("every one of the 16 canonical types is represented by a stable chapter-scoped teaching exercise",()=>{
 assert.deepEqual(validateLosRichBank(),[]);
 assert.equal(LOS_RICH_TYPES.length,16);
 assert.equal(LOS1_RICH_TASKS.length,16);
 assert.equal(new Set(LOS1_RICH_TASKS.map(x=>x.id)).size,16);
 assert.deepEqual(new Set(LOS1_RICH_TASKS.map(x=>x.type)),new Set(LOS_RICH_TYPES));
 for(const task of LOS1_RICH_TASKS){
  assert.match(task.id,/^RICH-C\d{2}-[A-Z]+/);
  assert.ok(Number(task.chapterId)>=1&&Number(task.chapterId)<=10);
  assert.equal(losRichTasksFor(task.chapterId).some(q=>q.id===task.id),true);
 }
});
test("highlight, choice, truth, inflection, order, translation and evidence are genuinely evaluated",()=>{
 assert.equal(gradeLosRichTask(get("highlight-span"),"u01-t03"),"right");
 assert.equal(gradeLosRichTask(get("highlight-span"),"u01-t02"),"wrong");
 assert.equal(gradeLosRichTask(get("single-choice"),"b"),"right");
 assert.equal(gradeLosRichTask(get("true-false"),"true"),"right");
 assert.equal(gradeLosRichTask(get("true-false"),"false"),"wrong");
 assert.equal(gradeLosRichTask(get("fill-gap"),"komme"),"right");
 assert.equal(gradeLosRichTask(get("fill-gap"),"kommst"),"wrong");
 assert.equal(gradeLosRichTask(get("translation-restricted"),"Ich komme aus Finnland."),"right");
 assert.equal(gradeLosRichTask(get("translation-restricted"),"ich komme aus Finnland."),"wrong");
 assert.equal(gradeLosRichTask(get("word-order"),"Wie heißen Sie?"),"right");
 assert.equal(gradeLosRichTask(get("word-order"),"Wie Sie heißen?"),"wrong");
 assert.equal(gradeLosRichTask(get("correct-error"),"Es geht mir gut."),"right");
 assert.equal(gradeLosRichTask(get("correct-error"),"Mir geht ich gut."),"wrong");
 assert.equal(gradeLosRichTask(get("locate-evidence"),"u08"),"right");
 assert.equal(gradeLosRichTask(get("locate-evidence"),"u02"),"wrong");
});
test("match pairs, article sorting and inflection grids require ALL rows, never partial credit without explanation",()=>{
 const examples=[
  {type:"match-pairs",correct:{a:"Mikä sinun nimesi on?",b:"Minun nimeni on Mia.",c:"Tämä on Leo."}},
  {type:"article-sort",correct:{b:"der",n:"die",h:"das"}},
  {type:"inflection-grid",correct:{ich:"komme",du:"kommst",er:"kommt"}},
 ];
 for(const item of examples){
  const task=get(item.type);
  assert.equal(gradeLosRichTask(task,""),"unanswered");
  assert.equal(gradeLosRichTask(task,JSON.stringify(item.correct)),"right",item.type);
  const wrong={...item.correct,[Object.keys(item.correct)[0]!]:"wrong"};
  assert.equal(gradeLosRichTask(task,JSON.stringify(wrong)),"wrong",item.type);
  assert.equal(gradeLosRichTask(task,"{invalid"),"unanswered",item.type);
 }
});
test("listening remains blocked until real audio ends and video cannot silently claim verified playback",()=>{
 for(const type of ["listen-select","listen-type"]){
  const task=get(type);
  const answer=type==="listen-select"?"b":"Hallo!";
  assert.ok(task.audio?.src.includes("Special:Redirect/file/"));
  assert.ok(task.audio?.sourceUrl.startsWith("https://commons.wikimedia.org/"));
  assert.equal(gradeLosRichTask(task,answer),"requires-audio");
  assert.equal(gradeLosRichTask(task,answer,{audioFinished:true}),"right");
 }
 const video=get("video-comprehension");
 assert.equal(video.video?.verified,false);
 assert.equal(gradeLosRichTask(video,"b"),"media-unavailable");
 assert.equal(video.sourceId,"V-DIB-01");
});
test("free writing and recorded speaking are self-reviewed, NOT fake automatic grades",()=>{
 const write=get("guided-writing");
 const voice=get("record-and-reflect");
 const draft="Ich heiße Leo. Ich komme aus Finnland. Ich bin siebzehn Jahre alt. Wir treffen uns am Montag.";
 assert.ok(draft.length>=80);
 assert.equal(gradeLosRichTask(write,draft),"unanswered");
 assert.equal(gradeLosRichTask(write,draft,{selfReviewed:true}),"self-assessed");
 assert.equal(gradeLosRichTask(voice,"Harjoittelin lausumista huolellisesti.",{selfReviewed:true}),"unanswered");
 assert.equal(gradeLosRichTask(voice,"Harjoittelin lausumista huolellisesti.",
  {selfReviewed:true,recordDownloadStarted:true}),"self-assessed");
});
test("rich examples keep the existing workbook and JSON/cloud draft protocol",()=>{
 const ui=readFileSync("src/features/los/LosRichExercises.tsx","utf8");
 const workbook=readFileSync("src/features/los/LosWorkbook.tsx","utf8");
 const voice=readFileSync("src/features/los/LosVoicePractice.tsx","utf8");
 assert.match(workbook,/mode==="practice"&&<LosRichExercises chapterId=\{chapter.id\}\/>/);
 assert.match(ui,/practiceChecked:Array.from/);
 assert.match(ui,/onEnded=\{\(\)=>setFlag\("AUDIO","played"\)\}/);
 assert.match(ui,/LosVoicePractice chapterId="10" onDownloaded/);
 assert.match(ui,/video-comprehension/);
 assert.match(ui,/media-unavailable/);
 assert.match(voice,/navigator.mediaDevices/);
 const practiceAnswers={
  "RICH-C01-CHOICE":"b","RICH-C01-HIGHLIGHT":"u01-t03",
  "RICH-C10-WRITE":"Ich heiße Leo. Ich komme aus Finnland.",
  "RICH-C10-WRITE-SELF":"reviewed",
 };
 assert.equal(validateLosCloudDraft({
  version:1,note:"",applicationDraft:"",bookmarked:false,
  practiceAnswers,practiceChecked:["RICH-C01-CHOICE","RICH-C01-HIGHLIGHT"],
  testAnswers:{},testSubmittedAt:null,selfAssessment:"",updatedAt:"2026-11-12T16:00:00.000Z",
 }),true);
});
