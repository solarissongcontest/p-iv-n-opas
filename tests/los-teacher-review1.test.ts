import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L027_TEACHER as L027 } from "../src/features/los/teacher/lessonL027.ts";
import { LOS1_L028_TEACHER as L028 } from "../src/features/los/teacher/lessonL028.ts";
import { LOS1_L029_TEACHER as L029 } from "../src/features/los/teacher/lessonL029.ts";
import { LOS1_L030_TEACHER as L030 } from "../src/features/los/teacher/lessonL030.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { LOS1_REVIEW_I_QUESTIONS, losReviewIQuestionsFor, losReviewIReflectionId } from "../src/features/los/content/los1ReviewI.ts";
import { LOS1_MIDTERM_QUESTIONS, LOS1_MIDTERM_DRAFT_CHAPTER, losExamScore } from "../src/features/los/content/los1Exams.ts";
import { losArchiveExamAttempt, losArchivedExamHistory } from "../src/features/los/content/los1ExamArchive.ts";
import { parseLosDraft } from "../src/features/los/studyState.ts";
import { emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, confirmTeacherActivity,
 teacherCanFinish, teacherChapterAssessmentStatus, toggleTeacherPause,
 validTeacherSession, independentTeacherEvidence } from "../src/features/los/teacher/engine.ts";

const lessons=[L027,L028,L029,L030] as const;
const at="2026-11-13T15:00:00.000Z";
const examAnswers=Object.fromEntries(LOS1_MIDTERM_QUESTIONS.map(q=>[q.id,q.correctId]));
const examDraft={
 testAnswers:examAnswers,testSubmittedAt:at,
 applicationDraft:"", // Oral work is allowed; honest reflection + EX-MID-DIALOGUE-SELF suffice.
 selfAssessment:"Esitin 4–6 repliikin harjoituksen ääneen ja arvioin muistamista.",
};
function completedChecks(lesson:typeof L027) {
 let session=emptyTeacherSession(lesson,at);
 for(const scene of lesson.scenes){
  session=moveTeacherScene(session,lesson,scene.id,at);
  if(scene.question){
   const question=scene.question;
   session=submitTeacherAnswer(session,lesson,scene.id,
    question.type==="choice" ? question.correctOption! : question.accepted![0]!,at);
  }
 }
 for(const id of lesson.requiredActivityIds) session=confirmTeacherActivity(session,lesson,id,at);
 return session;
}
test("L027–L030 are registered, valid and use existing exam draft slot instead of a fictitious C91",()=>{
 assert.equal(LOS1_MIDTERM_DRAFT_CHAPTER,"91");
 assert.equal(LOS1_MIDTERM_QUESTIONS.length,25);
 assert.equal(LOS1_REVIEW_I_QUESTIONS.length,15);
 for(const [i,lesson] of lessons.entries()){
  assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
  assert.equal(lesson.id,"L"+String(i+27).padStart(3,"0"));
  assert.equal(lesson.bookId,1);
  assert.equal(lesson.chapterId,LOS1_MIDTERM_DRAFT_CHAPTER);
  assert.equal(getLosTeacherLesson(lesson.id),lesson);
  assert.ok(lesson.scenes.length>=10);
  assert.ok(lesson.scenes.some(scene=>scene.kind==="board"));
  assert.ok(lesson.scenes.some(scene=>scene.kind==="summary"));
  assert.ok(lesson.requiredQuestionIds.length>=5);
  assert.ok(lesson.requiredQuestionIds.every(id=>lesson.scenes.some(s=>s.id===id && s.question)));
  assert.ok(lesson.scenes.flatMap(s=>s.bookLinks??[]).every(link=>link.chapterId!=="91"));
 }
});
test("review lessons require exactly their five existing checked questions and genuine self-assessment",()=>{
 for(const lesson of [L027,L028,L029]){
  const existing=losReviewIQuestionsFor(lesson.id as "L027"|"L028"|"L029");
  assert.equal(existing.length,5);
  assert.deepEqual(lesson.requiredCheckedIds,existing.map(q=>q.id));
  assert.deepEqual(lesson.requiredPracticeIds,[losReviewIReflectionId(lesson.id as "L027"|"L028"|"L029")]);
  const base=completedChecks(lesson);
  const answers=Object.fromEntries(existing.map(q=>[q.id,q.correctId]));
  assert.equal(teacherCanFinish(base,lesson,answers,existing.map(q=>q.id)),false,"Self-assessment must be recorded.");
  assert.equal(teacherCanFinish(base,lesson,{...answers,[lesson.requiredPracticeIds[0]!]:"some"},[]),false,"The real review questions must be checked.");
  assert.equal(teacherCanFinish(base,lesson,{...answers,[lesson.requiredPracticeIds[0]!]:"some"},existing.slice(0,4).map(q=>q.id)),false);
  const full={...answers,[lesson.requiredPracticeIds[0]!]:"again"};
  assert.equal(teacherCanFinish(base,lesson,full,existing.map(q=>q.id)),true,lesson.id);
  // Completion means attempted and checked; it does not invent automatic mastery.
  const wrong={...full,[existing[0]!.id]:"a"===existing[0]!.correctId?"b":"a"};
  assert.equal(teacherCanFinish(base,lesson,wrong,existing.map(q=>q.id)),true);
  const paused=toggleTeacherPause(base,at);
  assert.equal(moveTeacherScene(paused,lesson,lesson.scenes[0]!.id,at),paused);
  assert.equal(teacherCanFinish(paused,lesson,full,existing.map(q=>q.id)),false);
  assert.equal(validTeacherSession(JSON.parse(JSON.stringify(paused))),true);
  assert.ok(independentTeacherEvidence(base,lesson)>=2);
 }
});
test("L029 uses authentic eight-turn C01 Text A without automatic listening completion",()=>{
 const source=L029.scenes.find(s=>s.id==="source")!;
 assert.ok(source.bookLinks?.some(l=>l.chapterId==="01"&&l.section==="text"));
 const prose=L029.scenes.flatMap(s=>s.paragraphs).join(" ");
 assert.match(prose,/kahdeksan/);
 assert.match(prose,/ääni|kuuntel/);
 assert.ok(L029.scenes.every(s=>!(s.activityId??"").includes("listen")));
 assert.deepEqual(L029.requiredCheckedIds,["EX-REV1-Q11","EX-REV1-Q12","EX-REV1-Q13","EX-REV1-Q14","EX-REV1-Q15"]);
});
test("L030 reads the real EX-MID exam without duplicating its 25-point score or requiring written speech",()=>{
 const required=L030.chapterAssessment!;
 assert.deepEqual(required.requiredTestIds,LOS1_MIDTERM_QUESTIONS.map(q=>q.id));
 assert.equal(required.requireApplicationDraft,false,"An oral-only dialogue must be permitted.");
 assert.ok(required.minSelfAssessmentLength>=15);
 assert.deepEqual(L030.requiredPracticeIds,["EX-MID-DIALOGUE-SELF"]);
 assert.ok(L030.scenes.flatMap(s=>s.bookLinks??[]).some(l=>l.section==="midterm"));
 assert.deepEqual(losExamScore(LOS1_MIDTERM_QUESTIONS,examAnswers).correct,25);
 assert.deepEqual(teacherChapterAssessmentStatus(L030,examDraft),{
  answered:25,expected:25,submitted:true,applicationDone:true,reflectionDone:true,ready:true,
 });
 const session=completedChecks(L030);
 const practice={"EX-MID-DIALOGUE-SELF":"some"};
 assert.equal(teacherCanFinish(session,L030,practice,[],examDraft),true);
 assert.equal(teacherCanFinish(session,L030,{},[],examDraft),false);
 assert.equal(teacherCanFinish(session,L030,practice,[],{...examDraft,testSubmittedAt:null}),false);
 assert.equal(teacherCanFinish(session,L030,practice,[],{...examDraft,testAnswers:{...examAnswers,[LOS1_MIDTERM_QUESTIONS[0]!.id]:""}}),false);
 assert.equal(teacherCanFinish(session,L030,practice,[],{...examDraft,selfAssessment:""}),false);
});
test("EX-MID previous 24/25 attempt remains immutable after a fresh 25/25 retake and Teacher-state reload",()=>{
 const first={...examAnswers,[LOS1_MIDTERM_QUESTIONS[0]!.id]:"a"};
 // The first correct answer is b. This deliberate incorrect answer earns no point.
 assert.equal(LOS1_MIDTERM_QUESTIONS[0]!.correctId,"b");
 const saved=losArchiveExamAttempt({},"EX-MID",LOS1_MIDTERM_QUESTIONS,first,at);
 assert.deepEqual(losArchivedExamHistory(saved,"EX-MID").map(x=>x.correct),[24]);
 const payload={
  version:1,note:"",applicationDraft:"",bookmarked:false,
  practiceAnswers:{...saved,"EX-MID-DIALOGUE-SELF":"well"},practiceChecked:[],
  testAnswers:examAnswers,testSubmittedAt:at,selfAssessment:examDraft.selfAssessment,
  teacherSessions:{L030:completedChecks(L030)},updatedAt:at,
 };
 const loaded=parseLosDraft(JSON.stringify(payload));
 assert.equal(loaded.teacherSessions?.L030?.lessonId,"L030");
 assert.equal(loaded.practiceAnswers["EX-MID-DIALOGUE-SELF"],"well");
 assert.deepEqual(loaded.testAnswers,examAnswers);
 assert.equal(loaded.testSubmittedAt,at);
 const after=losArchiveExamAttempt(loaded.practiceAnswers,"EX-MID",LOS1_MIDTERM_QUESTIONS,loaded.testAnswers,at);
 assert.deepEqual(losArchivedExamHistory(after,"EX-MID").map(x=>x.correct),[24,25]);
 assert.equal(losArchivedExamHistory(after,"EX-MID")[0]?.choices.length,25);
});
