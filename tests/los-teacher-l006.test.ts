import test from "node:test";
import assert from "node:assert/strict";
import {
  confirmTeacherActivity, emptyTeacherSession, finishTeacherSession,
  independentTeacherEvidence, moveTeacherScene, submitTeacherAnswer, teacherCanFinish,
} from "../src/features/los/teacher/engine.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { LOS1_L006_TEACHER } from "../src/features/los/teacher/lessonL006.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";

const lesson=LOS1_L006_TEACHER;
const now="2026-11-13T09:20:00.000Z";
const chapter={
  applicationDraft:"Guten Morgen!\nTschüss!",
  testSubmittedAt:"2026-11-13T09:15:00.000Z",
  selfAssessment:"Osasin tervehtiä aamulla. Kertaan kohteliaan hyvästelyn.",
};

function prepared(){
  let s=emptyTeacherSession(lesson,now);
  for(const scene of lesson.scenes){
    s=moveTeacherScene(s,lesson,scene.id,now);
    if(scene.question){
      const q=scene.question;
      s=submitTeacherAnswer(s,lesson,scene.id,
        q.type==="choice"?q.correctOption!:q.accepted![0]!,now);
    }
  }
  for(const id of lesson.requiredActivityIds)s=confirmTeacherActivity(s,lesson,id,now);
  return s;
}

test("L006 is the canonical 13-scene Teacher 2.0 lesson with genuine C01 source actions",()=>{
  assert.equal(getLosTeacherLesson("L006"),lesson);
  assert.equal(lesson.id,"L006");
  assert.equal(lesson.scenes.length,13);
  assert.deepEqual(validateTeacherLesson(lesson),[]);
  assert.deepEqual(lesson.requiredChapterEvidence,
    ["application-written","test-submitted","self-assessment"]);
  assert.deepEqual(lesson.requiredPracticeIds,[]);
  const bookSections=lesson.scenes.flatMap(s=>s.bookLinks??[]).map(link=>link.section);
  for(const section of ["culture","apply","test"])assert.ok(bookSections.includes(section));
  assert.ok(losExercisesFor("01").length>=8);
  assert.equal(lesson.estimatedMinutes,30);
});

test("L006 refuses an unsubmitted chapter test and unreviewed writing/self-assessment",()=>{
  const s=prepared();
  assert.equal(teacherCanFinish(s,lesson,{},[],{}),false);
  assert.equal(teacherCanFinish(s,lesson,{},[],{...chapter,testSubmittedAt:null}),false);
  assert.equal(teacherCanFinish(s,lesson,{},[],{...chapter,applicationDraft:""}),false);
  assert.equal(teacherCanFinish(s,lesson,{},[],{...chapter,selfAssessment:""}),false);
  assert.equal(teacherCanFinish(s,lesson,{},[],{...chapter,testSubmittedAt:"not-a-timestamp"}),false);
  assert.equal(finishTeacherSession(s,lesson,{},now,[],{...chapter,testSubmittedAt:null}).completedAt,null);
  assert.equal(teacherCanFinish(s,lesson,{},[],chapter),true);
  assert.equal(finishTeacherSession(s,lesson,{},now,[],chapter).completedAt,now);
});

test("L006 stays safe when book answers were entered but the real chapter test was not submitted",()=>{
  const s=prepared();
  const unfinished={...chapter,testSubmittedAt:null};
  const someTestAnswers=Object.fromEntries(losExercisesFor("01").map(x=>[x.id,x.correct]));
  // The workbook writes unanswered/draft test values to a DIFFERENT field;
  // even if somebody copied them here the teacher still needs testSubmittedAt.
  assert.equal(teacherCanFinish(s,lesson,someTestAnswers,[],unfinished),false);
  assert.equal(independentTeacherEvidence(s,lesson),2);
});

test("L006 completion is not a mastery claim after guided/helped or wrong answers",()=>{
  const session=prepared();
  assert.equal(session.completedAt,null);
  assert.equal(independentTeacherEvidence(session,lesson),2);
  const required=lesson.requiredQuestionIds;
  assert.deepEqual(required,["recall","guided","transfer","exit"]);
  assert.ok(lesson.scenes.filter(x=>x.question?.evidenceRole==="independent").length===1);
  const original=finishTeacherSession(session,lesson,{},now,[],chapter);
  assert.ok(original.completedAt);
  assert.equal(original.attempts.length,4);
});

test("validator rejects duplicated or alien chapter evidence rules",()=>{
  for(const invalid of [
    ["test-submitted","test-submitted"],
    ["finished-all-audio"],
  ]){
    const issues=validateTeacherLesson({...lesson,
      requiredChapterEvidence:invalid as typeof lesson.requiredChapterEvidence});
    assert.ok(issues.some(issue=>issue.location==="requiredChapterEvidence"));
  }
});
