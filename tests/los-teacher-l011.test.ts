import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L011_TEACHER } from "../src/features/los/teacher/lessonL011.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import {
 emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, confirmTeacherActivity,
 teacherCanFinish, finishTeacherSession, teacherChapterAssessmentStatus,
 independentTeacherEvidence, evaluateTeacherAnswer,
} from "../src/features/los/teacher/engine.ts";
const lesson=LOS1_L011_TEACHER,at="2026-11-13T10:30:00.000Z";
const ids=losExercisesFor("02").map(item=>item.id);
const answers=Object.fromEntries(ids.map(id=>[id,"attempted"]));
const complete={
 testAnswers:answers,testSubmittedAt:at,
 applicationDraft:"Ich heiße Mia.\nWie heißt du?",
 selfAssessment:"Osaan kysyä nimen, mutta haluan harjoitella vielä sein-verbin muotoja.",
};
function prepared(){
 let s=emptyTeacherSession(lesson,at);
 for(const scene of lesson.scenes){
  s=moveTeacherScene(s,lesson,scene.id,at);
  if(scene.question){
   const q=scene.question;
   s=submitTeacherAnswer(s,lesson,scene.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,at);
  }
 }
 return confirmTeacherActivity(s,lesson,"sources-reviewed",at);
}
test("L011 reuses exactly the 15 C02 workbook test IDs and source text references",()=>{
 assert.deepEqual(validateTeacherLesson(lesson),[]);
 assert.equal(lesson.scenes.length,15);
 assert.equal(ids.length,15);
 assert.deepEqual(lesson.chapterAssessment?.requiredTestIds,ids);
 assert.equal(lesson.requiredPracticeIds.length,0);
 const links=lesson.scenes.flatMap(s=>s.bookLinks??[]);
 for(const section of ["text","text-b","practice","apply","test"]){
  assert.ok(links.some(x=>x.chapterId==="02"&&x.section===section),section);
 }
});
test("L011 only permits completion from real submitted exam and saved student work",()=>{
 const s=prepared();
 assert.equal(teacherCanFinish(s,lesson,{},[],undefined),false);
 assert.equal(teacherCanFinish(s,lesson,{},[],{...complete,testSubmittedAt:null}),false);
 assert.equal(teacherCanFinish(s,lesson,{},[],{...complete,testAnswers:{...answers,[ids[0]!]:""}}),false);
 assert.equal(teacherCanFinish(s,lesson,{},[],{...complete,applicationDraft:""}),false);
 assert.equal(teacherCanFinish(s,lesson,{},[],{...complete,selfAssessment:""}),false);
 assert.equal(teacherCanFinish(s,lesson,{},[],{...complete,testSubmittedAt:"invalid"}),false);
 assert.equal(finishTeacherSession(s,lesson,{},at,[],{...complete,testSubmittedAt:null}).completedAt,null);
 assert.equal(teacherCanFinish(s,lesson,{},[],complete),true);
 assert.equal(finishTeacherSession(s,lesson,{},at,[],complete).completedAt,at);
 assert.equal(independentTeacherEvidence(s,lesson),3);
});
test("L011 accepts both honest beginner naming alternatives without inventing a test grade",()=>{
 const q=lesson.scenes.find(s=>s.id==="independent")?.question;
 assert.ok(q);
 assert.equal(evaluateTeacherAnswer(q,"Ich heiße Mia!"),true);
 assert.equal(evaluateTeacherAnswer(q,"Ich bin Mia."),true);
 assert.equal(evaluateTeacherAnswer(q,"Du heißt Mia."),false);
 assert.deepEqual(teacherChapterAssessmentStatus(lesson,complete),{
 answered:15,expected:15,submitted:true,applicationDone:true,reflectionDone:true,ready:true,
 });
 const wrong={...complete,testAnswers:Object.fromEntries(ids.map(id=>[id,"incorrect"]))};
 assert.equal(teacherChapterAssessmentStatus(lesson,wrong).ready,true);
 // Completion means the exam was submitted; it does NOT mean the answers were correct.
});
