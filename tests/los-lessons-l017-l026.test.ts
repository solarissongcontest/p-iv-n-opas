import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_1_LESSONS } from "../src/features/los/learningPath.ts";
import { LOS1_C04_C05_LESSONS } from "../src/features/los/lessonEngineC04C05.ts";
import { LOS1_C01_LESSON_BLUEPRINTS, emptyLosLessonProgress,
  losLessonMarkStep, losLessonSubmitCheck, losLessonCanComplete,
  losLessonEvidenceMet, losLessonFinish, validateLosLessonProgressMap } from "../src/features/los/lessonEngine.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { validateLosCloudDraft } from "../src/features/los/cloudContract.ts";

const stamp = "2026-11-12T07:30:00.000Z";
const blank = () => ({
 version:1 as const,note:"Tärkeä vanha muistiinpano",applicationDraft:"",
 bookmarked:true,practiceAnswers:{} as Record<string,string>,practiceChecked:[] as string[],
 testAnswers:{} as Record<string,string>,testSubmittedAt:null as string|null,
 selfAssessment:"",updatedAt:stamp,
});
test("L017-L026 correspond to chapter 4 and 5 of the exact canonical 60-lesson path",()=>{
 assert.equal(LOS_1_LESSONS.length,60);
 assert.equal(LOS1_C04_C05_LESSONS.length,10);
 assert.equal(LOS1_C01_LESSON_BLUEPRINTS.length,6);
 LOS1_C04_C05_LESSONS.forEach((lesson,i)=>{
   assert.equal(lesson.id,"L"+String(i+17).padStart(3,"0"));
   assert.equal(lesson.title,LOS_1_LESSONS[i+16]?.title);
   assert.equal(lesson.contentVersion,"1.0.0");
   assert.equal(lesson.estimatedMinutes,30);
   assert.equal(lesson.steps.length,3);
   assert.equal(new Set(lesson.steps.map(s=>s.id)).size,3);
   assert.ok(lesson.steps.every(s=>s.minutes>0 && s.instruction.length>45));
   assert.ok(lesson.check.answers.some(a=>a.id===lesson.check.correctId));
   assert.equal(lesson.check.answers.length,3);
 });
});
test("C04 and C05 reader references are authentic recorded source units and questions actually exist",()=>{
 const c04=getLosOpenDialogue("04"),c05=getLosOpenDialogue("05");
 assert.equal(c04?.sourceId,"M-WB-06");
 assert.equal(c05?.sourceId,"M-WB-05");
 assert.equal(c04?.originalLines.length,8);
 assert.equal(c05?.originalLines.length,4);
 const sourceQuestions = new Set([...(c04?.questions??[]),...(c05?.questions??[])].map(q=>q.id));
 const exerciseIds=new Set([...losExercisesFor("04"),...losExercisesFor("05")].map(q=>q.id));
 for(const lesson of LOS1_C04_C05_LESSONS)for(const item of lesson.evidence){
   if(item.kind==="checked-source") assert.ok(item.ids?.every(id=>sourceQuestions.has(id)));
   if(item.kind==="answered-practice") assert.ok(item.ids?.every(id=>exerciseIds.has(id)));
 }
 assert.ok(!LOS1_C04_C05_LESSONS[8]!.steps.some(s=>s.section==="text-b"),"C05 audio remains unverified and is not a lesson completion gate");
 assert.ok(LOS1_C04_C05_LESSONS[8]!.steps.some(s=>s.instruction.includes("ei väitetä")||s.instruction.includes("vahvistamatta")));
});
test("all ten guided lessons need real, chapter-local evidence, not page visits or C03 answers",()=>{
 for(const lesson of LOS1_C04_C05_LESSONS){
   const d=blank();
   d.practiceAnswers["C03-SOURCE-Q01"]="a";d.practiceChecked.push("C03-SOURCE-Q01");
   let progress=emptyLosLessonProgress();
   assert.equal(losLessonCanComplete(lesson,progress,d),false);
   for(const step of lesson.steps)progress=losLessonMarkStep(lesson,progress,step.id,stamp);
   assert.equal(losLessonCanComplete(lesson,progress,d),false);
   progress=losLessonSubmitCheck(lesson,progress,lesson.check.correctId,stamp);
   if(lesson.evidence.length)assert.equal(losLessonCanComplete(lesson,progress,d),false);
   for(const req of lesson.evidence){
     if(req.kind==="chapter-test")d.testSubmittedAt=stamp;
     else for(const id of req.ids??[]){
       d.practiceAnswers[id]="a";
       if(req.kind==="checked-source")d.practiceChecked.push(id);
     }
   }
   assert.equal(losLessonEvidenceMet(lesson,d),true);
   assert.equal(losLessonCanComplete(lesson,progress,d),true);
   assert.equal(losLessonFinish(lesson,progress,d,stamp).completedAt,stamp);
 }
});
test("new optional lesson evidence fits existing version-one backups",()=>{
 assert.equal(validateLosLessonProgressMap({L017:emptyLosLessonProgress(),L022:emptyLosLessonProgress()}),true);
 assert.equal(validateLosCloudDraft({...blank(),lessonProgress:{L017:emptyLosLessonProgress()}}),true);
});
test("26 lessons use real C01 through C05 chapter drafts and preserve incomplete label",()=>{
 const runner=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
 const index=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
 const lessonMap=readFileSync("src/features/los/learningPath.ts","utf8");
 assert.match(runner,/useLosChapterDraft\(1, "04"\)/);
 assert.match(runner,/useLosChapterDraft\(1, "05"\)/);
 assert.match(runner,/LOS1_EXECUTABLE_LESSONS/);
 assert.match(index,/isLos1ExecutableLesson/);
 assert.match(index,/LOS1_EXECUTABLE_LESSONS\.length/);
 assert.ok(lessonMap.includes("Herr Schmidt ja Herr Standish: koko dialogi"));
 assert.ok(lessonMap.includes("Vertaa vointidialogeja ja vastaa"));
 assert.ok(!lessonMap.includes("Kuuntele mieliala ja vastaa"));
});
