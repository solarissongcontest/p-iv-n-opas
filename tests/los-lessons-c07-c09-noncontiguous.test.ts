import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_1_LESSONS } from "../src/features/los/learningPath.ts";
import { LOS1_C07_C09_LESSONS } from "../src/features/los/lessonEngineC07C09.ts";
import { LOS1_EXECUTABLE_LESSONS, isLos1ExecutableLesson, los1LessonDraftChapter } from "../src/features/los/guidedLessons.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { emptyLosLessonProgress, losLessonMarkStep, losLessonSubmitCheck,
  losLessonCanComplete, losLessonEvidenceMet, losLessonFinish, validateLosLessonProgressMap } from "../src/features/los/lessonEngine.ts";
import { validateLosCloudDraft } from "../src/features/los/cloudContract.ts";

const time="2026-11-12T08:00:00.000Z";
const draft=()=>({
  version:1 as const,note:"Vanha muistiinpano",applicationDraft:"",
  bookmarked:true,practiceAnswers:{} as Record<string,string>,
  practiceChecked:[] as string[],testAnswers:{} as Record<string,string>,
  testSubmittedAt:null as string|null,selfAssessment:"",updatedAt:time,
});
test("canonical readiness is explicit: 52 actual lessons, not a fabricated contiguous 1–50 series",()=>{
 assert.equal(LOS_1_LESSONS.length,60);
 assert.equal(LOS1_EXECUTABLE_LESSONS.length,52);
 assert.equal(LOS1_C07_C09_LESSONS.length,10);
 assert.equal(new Set(LOS1_EXECUTABLE_LESSONS.map(l=>l.id)).size,52);
 for(let n=1;n<=26;n++)assert.equal(isLos1ExecutableLesson("L"+String(n).padStart(3,"0")),true);
 for(let n=27;n<=30;n++)assert.equal(isLos1ExecutableLesson("L"+String(n).padStart(3,"0")),true);
 for(let n=31;n<=35;n++)assert.equal(isLos1ExecutableLesson("L"+String(n).padStart(3,"0")),true);
 for(let n=36;n<=40;n++)assert.equal(isLos1ExecutableLesson("L"+String(n).padStart(3,"0")),true);
 for(let n=41;n<=45;n++)assert.equal(isLos1ExecutableLesson("L"+String(n).padStart(3,"0")),n===41||n===43);
 for(let n=46;n<=50;n++)assert.equal(isLos1ExecutableLesson("L"+String(n).padStart(3,"0")),true);
 for(let n=51;n<=60;n++)assert.equal(isLos1ExecutableLesson("L"+String(n).padStart(3,"0")),n===51||n===53||(n>=56&&n<=58));
 assert.equal(los1LessonDraftChapter("L031"),"06");
 assert.equal(los1LessonDraftChapter("L030"),"91");
 assert.equal(los1LessonDraftChapter("L036"),"07");
 assert.equal(los1LessonDraftChapter("L049"),"09");
 assert.equal(los1LessonDraftChapter("L025"),"05");
});
test("C07 and C09 lesson plans use original source dialogue and valid real question IDs",()=>{
 const c07=getLosOpenDialogue("07");
 const c09=getLosOpenDialogue("09");
 assert.equal(c07?.sourceId,"M-WB-02");
 assert.equal(c09?.sourceId,"M-WB-03");
 assert.equal(c07?.originalLines.length,5);
 assert.equal(c09?.originalLines.length,7);
 const sourceIds = new Set([...(c07?.questions??[]),...(c09?.questions??[])].map(q=>q.id));
 const practiceIds = new Set([...losExercisesFor("07"),...losExercisesFor("09")].map(q=>q.id));
 for(const item of LOS1_C07_C09_LESSONS){
   const n=Number(item.id.slice(1));
   assert.ok(n>=36 && n<=40 || n>=46 && n<=50);
   assert.equal(item.title,LOS_1_LESSONS[n-1]?.title);
   assert.equal(item.estimatedMinutes,30);
   assert.ok(item.steps.length>=3);
   assert.ok(item.steps.every(s=>s.instruction.length>48 && s.minutes>0));
   assert.ok(item.check.answers.some(a=>a.id===item.check.correctId));
   for(const evidence of item.evidence){
     if(evidence.kind==="checked-source")assert.ok(evidence.ids?.every(id=>sourceIds.has(id)));
     if(evidence.kind==="answered-practice")assert.ok(evidence.ids?.every(id=>practiceIds.has(id)));
   }
 }
});
test("C07/C09 lesson completion requires exercises or chapter test, not a text visit",()=>{
 for(const lesson of LOS1_C07_C09_LESSONS){
   const d=draft();
   let state=emptyLosLessonProgress();
   assert.equal(losLessonCanComplete(lesson,state,d),false);
   for(const step of lesson.steps)state=losLessonMarkStep(lesson,state,step.id,time);
   assert.equal(losLessonCanComplete(lesson,state,d),false);
   state=losLessonSubmitCheck(lesson,state,lesson.check.correctId,time);
   if(lesson.evidence.length>0)assert.equal(losLessonCanComplete(lesson,state,d),false);
   for(const req of lesson.evidence){
     if(req.kind==="chapter-test")d.testSubmittedAt=time;
     else for(const id of req.ids??[]){
       d.practiceAnswers[id]="a";
       if(req.kind==="checked-source")d.practiceChecked.push(id);
     }
   }
   assert.equal(losLessonEvidenceMet(lesson,d),true);
   assert.equal(losLessonCanComplete(lesson,state,d),true);
   assert.equal(losLessonFinish(lesson,state,d,time).completedAt,time);
 }
});
test("C07 and C09 progress remains safe in optional v1 backup and cloud draft",()=>{
 const data={L036:emptyLosLessonProgress(),L047:emptyLosLessonProgress()};
 assert.equal(validateLosLessonProgressMap(data),true);
 assert.equal(validateLosCloudDraft({...draft(),lessonProgress:data}),true);
});
test("source-neutral titles and actual readiness are visible in book navigation",()=>{
 const path=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
 const runner=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
 const catalog=readFileSync("src/features/los/learningPath.ts","utf8");
 assert.match(path,/isLos1ExecutableLesson/);
 assert.match(path,/LOS1_EXECUTABLE_LESSONS\.length/);
 assert.match(runner,/useLosChapterDraft\(1, "07"\)/);
 assert.match(runner,/useLosChapterDraft\(1, "09"\)/);
 assert.match(catalog,/Tavaa ja täytä harjoituslomake/);
 assert.match(catalog,/Lue ja merkitse kalenteriin/);
 assert.ok(!catalog.includes("Kuuntele ja täytä lomake"));
 assert.ok(!catalog.includes("Kuuntele ja merkitse kalenteriin"));
});
