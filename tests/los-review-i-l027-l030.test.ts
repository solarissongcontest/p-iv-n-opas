import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS_1_LESSONS} from "../src/features/los/learningPath.ts";
import {LOS1_REVIEW_I_QUESTIONS, LOS1_REVIEW_I_GROUPS, losReviewIQuestionsFor, losReviewIReflectionId,validateLosReviewIQuestions} from "../src/features/los/content/los1ReviewI.ts";
import {LOS1_REVIEW_I_LESSONS} from "../src/features/los/lessonEngineReviewI.ts";
import {LOS1_EXECUTABLE_LESSONS,isLos1ExecutableLesson,los1LessonDraftChapter} from "../src/features/los/guidedLessons.ts";
import {emptyLosLessonProgress,losLessonMarkStep,losLessonSubmitCheck,losLessonCanComplete,losLessonEvidenceMet,losLessonFinish,validateLosLessonProgressMap} from "../src/features/los/lessonEngine.ts";
import {validateLosCloudDraft} from "../src/features/los/cloudContract.ts";
const now="2026-11-12T09:20:00.000Z";
const draft=()=>({
  version:1 as const,note:"Älä poista",applicationDraft:"",bookmarked:true,
  practiceAnswers:{} as Record<string,string>,practiceChecked:[] as string[],
  testAnswers:{} as Record<string,string>,testSubmittedAt:null as string|null,
  selfAssessment:"",updatedAt:now,
});
test("review I maps exactly to L027-L030 and 49 executable lessons",()=>{
  assert.equal(LOS_1_LESSONS.length,60);
  assert.equal(LOS1_REVIEW_I_LESSONS.length,4);
  assert.equal(LOS1_EXECUTABLE_LESSONS.length,49);
  for(const [i,lesson] of LOS1_REVIEW_I_LESSONS.entries()){
    const id="L"+String(i+27).padStart(3,"0");
    assert.equal(lesson.id,id);
    assert.equal(lesson.title,LOS_1_LESSONS[i+26]?.title);
    assert.equal(los1LessonDraftChapter(id),"91");
    assert.equal(isLos1ExecutableLesson(id),true);
    assert.equal(lesson.estimatedMinutes,30);
    assert.equal(lesson.steps.length,3);
    assert.ok(lesson.steps.every(step=>step.minutes>0&&step.instruction.length>50));
    assert.ok(lesson.check.answers.some(answer=>answer.id===lesson.check.correctId));
  }
  assert.equal(isLos1ExecutableLesson("L041"),true);
  assert.equal(isLos1ExecutableLesson("L051"),true);
  assert.equal(isLos1ExecutableLesson("L059"),false);
});
test("three review sets have 5 original questions and separate ungraded reflection IDs",()=>{
  assert.deepEqual(validateLosReviewIQuestions(),[]);
  assert.equal(LOS1_REVIEW_I_QUESTIONS.length,15);
  assert.equal(new Set(LOS1_REVIEW_I_QUESTIONS.map(q=>q.id)).size,15);
  assert.deepEqual(LOS1_REVIEW_I_GROUPS.map(g=>g.id),["L027","L028","L029"]);
  assert.equal(losReviewIReflectionId("L027"),"EX-REV1-SELF-027");
  for(const group of LOS1_REVIEW_I_GROUPS){
    const qs=losReviewIQuestionsFor(group.id);
    assert.equal(qs.length,5);
    const lesson=LOS1_REVIEW_I_LESSONS.find(l=>l.id===group.id)!;
    assert.deepEqual(lesson.evidence[0]?.ids,qs.map(q=>q.id));
    assert.deepEqual(lesson.evidence[1]?.ids,[losReviewIReflectionId(group.id)]);
    assert.ok(qs.every(q=>q.answers.length===3&&q.answers.some(a=>a.id===q.correctId)));
  }
  assert.equal(LOS1_REVIEW_I_LESSONS[3]?.evidence[0]?.kind,"chapter-test");
  assert.deepEqual(LOS1_REVIEW_I_LESSONS[3]?.evidence[1]?.ids,["EX-MID-DIALOGUE-SELF"]);
});
test("review lessons cannot complete with unchecked answers or absent self reflection",()=>{
  for(const lesson of LOS1_REVIEW_I_LESSONS.slice(0,3)){
    const d=draft();let progress=emptyLosLessonProgress();
    for(const step of lesson.steps)progress=losLessonMarkStep(lesson,progress,step.id,now);
    progress=losLessonSubmitCheck(lesson,progress,lesson.check.correctId,now);
    for(const id of lesson.evidence[0]!.ids??[])d.practiceAnswers[id]="a";
    assert.equal(losLessonCanComplete(lesson,progress,d),false);
    for(const id of lesson.evidence[0]!.ids??[])d.practiceChecked.push(id);
    assert.equal(losLessonEvidenceMet(lesson,d),false);
    d.practiceAnswers[lesson.evidence[1]!.ids![0]!]="some";
    assert.equal(losLessonCanComplete(lesson,progress,d),true);
    assert.equal(losLessonFinish(lesson,progress,d,now).completedAt,now);
  }
});
test("L030 needs both submitted EX-MID and actual self-reflection; both live in slot 91",()=>{
  const d=draft(),lesson=LOS1_REVIEW_I_LESSONS[3]!;
  let p=emptyLosLessonProgress();
  for(const step of lesson.steps)p=losLessonMarkStep(lesson,p,step.id,now);
  p=losLessonSubmitCheck(lesson,p,lesson.check.correctId,now);
  assert.equal(losLessonCanComplete(lesson,p,d),false);
  d.testSubmittedAt=now;
  assert.equal(losLessonCanComplete(lesson,p,d),false);
  d.practiceAnswers["EX-MID-DIALOGUE-SELF"]="again";
  assert.equal(losLessonCanComplete(lesson,p,d),true);
  assert.equal(losLessonFinish(lesson,p,d,now).completedAt,now);
  const state={L027:emptyLosLessonProgress(),L030:emptyLosLessonProgress()};
  assert.equal(validateLosLessonProgressMap(state),true);
  assert.equal(validateLosCloudDraft({...d,lessonProgress:state}),true);
});
test("real review navigation and manual source-audio fallback do not fake listening",()=>{
  const index=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  const runner=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
  const view=readFileSync("src/features/los/LosReviewI.tsx","utf8");
  const midterm=readFileSync("src/features/los/LosMidtermExam.tsx","utf8");
  assert.match(index,/\\| "review"/);
  assert.match(book,/section === "review" && book\.id===1 \? <LosReviewI move=\{move\}/);
  assert.match(runner,/useLosChapterDraft\(1, "91"\)/);
  assert.match(runner,/Kertaus I \+ EX-MID/);
  assert.match(view,/useLosChapterDraft\(1,LOS1_MIDTERM_DRAFT_CHAPTER\)/);
  assert.match(view,/Tekstin lukemista ei merkitä automaattisesti kuunteluksi/);
  assert.match(view,/practiceChecked:Array\.from/);
  assert.match(midterm,/EX-MID-DIALOGUE-SELF/);
  assert.match(midterm,/Palauta välikoe/);
});
