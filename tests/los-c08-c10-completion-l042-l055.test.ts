import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_C08_TEXT,LOS1_C10_TEXT,getLosOpenDialogue} from "../src/features/los/content/los1OpenDialogues.ts";
import {LOS1_C08_C10_COMPLETION_LESSONS} from "../src/features/los/lessonEngineC08C10Completion.ts";
import {LOS_1_LESSONS} from "../src/features/los/learningPath.ts";
import {LOS1_EXECUTABLE_LESSONS,isLos1ExecutableLesson,los1LessonDraftChapter} from "../src/features/los/guidedLessons.ts";
import {getLosChapterSourceGate,findLosSource,validateLosSourceRegistry} from "../src/features/los/content/sourceRegistry.ts";
import {losExercisesFor} from "../src/features/los/exerciseBank.ts";
import {
 emptyLosLessonProgress,losLessonMarkStep,losLessonSubmitCheck,
 losLessonEvidenceMet,losLessonCanComplete,losLessonFinish,validateLosLessonProgressMap,
} from "../src/features/los/lessonEngine.ts";
import {validateLosCloudDraft} from "../src/features/los/cloudContract.ts";

const now="2026-11-12T13:00:00.000Z";
const draft=()=>({version:1 as const,note:"old student note",applicationDraft:"",bookmarked:true,
 practiceAnswers:{} as Record<string,string>,practiceChecked:[] as string[],
 testAnswers:{} as Record<string,string>,testSubmittedAt:null as string|null,
 selfAssessment:"",updatedAt:now});
const expectedIds=["L042","L044","L045","L054","L055"];
test("C08 full source carries separate lawful provenance and remains gated after integration",()=>{
 assert.equal(LOS1_C08_TEXT.chapterId,"08");
 assert.equal(LOS1_C08_TEXT.sourceId,"M-WB-08");
 assert.equal(LOS1_C08_TEXT.originalLines.length,26);
 assert.equal(LOS1_C08_TEXT.originalLines[0]?.text,"Jetzt haben wir Mathe.");
 assert.equal(LOS1_C08_TEXT.originalLines[6]?.text,"Guten Morgen!");
 assert.equal(LOS1_C08_TEXT.originalLines.at(-1)?.text,"Schon wieder!");
 assert.equal(LOS1_C08_TEXT.originalLines[14]?.text,"Sehr gut, Florian!");
 assert.equal(LOS1_C08_TEXT.questions.length,4);
 assert.equal(LOS1_C08_TEXT.evidenceLineId,"u15");
 assert.equal(LOS1_C08_TEXT.licenseCode,"CC BY-SA 4.0");
 const c08=findLosSource("M-WB-08");
 assert.ok(c08);
 assert.equal(c08.integrated,true);
 assert.equal(c08.stage,"rights-verified");
 assert.equal(c08.languageReviewed,false);
 assert.equal(c08.mediaTested,false);
 assert.equal(c08.deviceTested,false);
 assert.equal(c08.published,false);
 assert.equal(getLosChapterSourceGate("08").sourceId,"M-WB-08");
 assert.equal(getLosChapterSourceGate("08").ready,false);
 assert.equal(LOS1_C10_TEXT.originalLines.length,14);
 assert.equal(getLosOpenDialogue("08"),LOS1_C08_TEXT);
 assert.deepEqual(validateLosSourceRegistry(),[]);
});
test("the five added C08/C10 lesson IDs are canonical, unique, 30 minutes and supported by actual chapter views",()=>{
 assert.deepEqual(LOS1_C08_C10_COMPLETION_LESSONS.map(x=>x.id),expectedIds);
 assert.equal(LOS_1_LESSONS.length,60);
 assert.equal(LOS1_EXECUTABLE_LESSONS.length,58);
 assert.equal(new Set(LOS1_EXECUTABLE_LESSONS.map(x=>x.id)).size,58);
 for(const lesson of LOS1_C08_C10_COMPLETION_LESSONS){
  const number=Number(lesson.id.slice(1));
  assert.equal(lesson.title,LOS_1_LESSONS[number-1]?.title);
  assert.equal(lesson.estimatedMinutes,30);
  assert.equal(lesson.contentVersion,"1.0.0");
  assert.equal(lesson.steps.length,3);
  assert.ok(lesson.steps.every(step=>step.instruction.length>=100 && step.minutes>0));
  assert.equal(isLos1ExecutableLesson(lesson.id),true);
  const expectedChapter=number<50?"08":"10";
  assert.equal(los1LessonDraftChapter(lesson.id),expectedChapter);
  const practiceIds=new Set(losExercisesFor(expectedChapter).map(x=>x.id));
  for(const requirement of lesson.evidence){
   if(requirement.kind==="answered-practice")
    assert.ok(requirement.ids?.every(id=>practiceIds.has(id)),"missing real practice question "+lesson.id);
   if(requirement.kind==="checked-source") {
    const sourceQuestions=new Set(LOS1_C08_TEXT.questions.map(x=>x.id));
    sourceQuestions.add("C08-SOURCE-EVIDENCE-01");
    assert.ok(requirement.ids?.every(id=>sourceQuestions.has(id)),"missing real source question "+lesson.id);
   }
  }
 }
 for(const id of ["L059","L060"])assert.equal(isLos1ExecutableLesson(id),false);
});
test("reading, written application, and reflection cannot be completed by clicks or single characters",()=>{
 for(const lesson of LOS1_C08_C10_COMPLETION_LESSONS){
  const d=draft();
  let progress=emptyLosLessonProgress();
  assert.equal(losLessonCanComplete(lesson,progress,d),false);
  for(const step of lesson.steps)progress=losLessonMarkStep(lesson,progress,step.id,now);
  progress=losLessonSubmitCheck(lesson,progress,lesson.check.correctId,now);
  assert.equal(losLessonCanComplete(lesson,progress,d),false);
  for(const requirement of lesson.evidence){
   if(requirement.kind==="checked-source"){
    for(const id of requirement.ids??[]) d.practiceAnswers[id]="a";
   }else if(requirement.kind==="answered-practice"){
    for(const id of requirement.ids??[])d.practiceAnswers[id]="a";
   }else if(requirement.kind==="written-application"){
    d.applicationDraft="a";
   }else if(requirement.kind==="self-assessment"){
    d.selfAssessment="a";
   }else if(requirement.kind==="chapter-test")d.testSubmittedAt=now;
  }
  assert.equal(losLessonCanComplete(lesson,progress,d),false,lesson.id+": unfinished evidence must block");
  for(const requirement of lesson.evidence){
   if(requirement.kind==="checked-source"){
    for(const id of requirement.ids??[])d.practiceChecked.push(id);
   }else if(requirement.kind==="written-application"){
    d.applicationDraft="A: Ich verstehe nicht. Können Sie das bitte wiederholen?\nB: Noch einmal, bitte. Was bedeutet das?\nC: Bitte langsamer.";
   }else if(requirement.kind==="self-assessment"){
    d.selfAssessment="Kertasimme kysymykset ja tarvitsen vielä harjoitusta.";
   }
  }
  assert.equal(losLessonEvidenceMet(lesson,d),true,lesson.id);
  assert.equal(losLessonCanComplete(lesson,progress,d),true,lesson.id);
  const saved=losLessonFinish(lesson,progress,d,now);
  assert.equal(saved.completedAt,now);
  assert.equal(validateLosLessonProgressMap({[lesson.id]:saved}),true);
  assert.equal(validateLosCloudDraft({...d,lessonProgress:{[lesson.id]:saved}}),true);
 }
});
test("C08 source and five new lessons are wired to existing reader, test and saved writing",()=>{
 const book=readFileSync("src/features/los/LosBook.tsx","utf8");
 const ui=readFileSync("src/features/los/LosOpenSourcePages.tsx","utf8");
 const application=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
 const workbook=readFileSync("src/features/los/LosWorkbook.tsx","utf8");
 const guided=readFileSync("src/features/los/guidedLessons.ts","utf8");
 assert.match(book,/getLosOpenDialogue\(chapter\.id\)/);
 assert.match(ui,/useLosChapterDraft\(1,text\.chapterId\)/);
 assert.match(application,/applicationDraft:event\.target\.value/);
 assert.match(workbook,/testSubmittedAt:new Date\(\)\.toISOString\(\)/);
 assert.match(workbook,/selfAssessment:e\.target\.value/);
 assert.match(guided,/LOS1_C08_C10_COMPLETION_LESSONS/);
});
