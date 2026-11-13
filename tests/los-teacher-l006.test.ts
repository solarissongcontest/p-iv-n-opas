import test from "node:test";
import assert from "node:assert/strict";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { LOS1_L006_TEACHER } from "../src/features/los/teacher/lessonL006.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import {
 emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, confirmTeacherActivity,
 teacherCanFinish, finishTeacherSession, teacherChapterAssessmentStatus,
 independentTeacherEvidence, markTeacherHelp,
} from "../src/features/los/teacher/engine.ts";
const lesson=LOS1_L006_TEACHER;
const at="2026-11-13T09:00:00.000Z";
const ids=losExercisesFor("01").map(item=>item.id);
const answered=Object.fromEntries(ids.map(id=>[id,"Guten Tag!"]));
const full={testAnswers:answered,testSubmittedAt:at,applicationDraft:"Guten Morgen!\nTschüss!",selfAssessment:"Kertasimme tervehdykset. Tarvitsen lisää harjoitusta."};
function prepared(){
  let s=emptyTeacherSession(lesson,at);
  for(const scene of lesson.scenes){
    s=moveTeacherScene(s,lesson,scene.id,at);
    if(scene.question){
      const q=scene.question;
      s=submitTeacherAnswer(s,lesson,scene.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,at);
    }
  }
  return confirmTeacherActivity(s,lesson,"culture-reviewed",at);
}
test("L006 reuses the actual 12-item C01 exam and existing textbook destinations",()=>{
 assert.equal(getLosTeacherLesson("L006"),lesson);
 assert.equal(ids.length,12);
 assert.deepEqual(lesson.chapterAssessment?.requiredTestIds,ids);
 assert.deepEqual(validateTeacherLesson(lesson),[]);
 assert.equal(lesson.requiredPracticeIds.length,0);
 for(const section of ["apply","culture","test"]){
   assert.ok(lesson.scenes.some(s=>s.bookLinks?.some(link=>link.chapterId==="01"&&link.section===section)),section);
 }
});
test("L006 cannot finish from a visited page, unanswered exam or unsubmitted test",()=>{
 const s=prepared();
 assert.equal(teacherCanFinish(s,lesson,{},[],undefined),false);
 assert.equal(teacherCanFinish(s,lesson,{},[],{...full,testSubmittedAt:null}),false);
 assert.equal(teacherCanFinish(s,lesson,{},[],{...full,testAnswers:{...answered,[ids[0]!]:""}}),false);
 assert.equal(teacherCanFinish(s,lesson,{},[],{...full,selfAssessment:""}),false);
 assert.equal(teacherCanFinish(s,lesson,{},[],{...full,applicationDraft:""}),false);
 assert.equal(teacherCanFinish(s,lesson,{},[],{...full,testSubmittedAt:"not-a-time"}),false);
 assert.equal(finishTeacherSession(s,lesson,{},at,[],{...full,testSubmittedAt:null}).completedAt,null);
});
test("L006 finishes after real textbook submission, own writing, assessment and all scenes",()=>{
 const s=prepared();
 const status=teacherChapterAssessmentStatus(lesson,full);
 assert.deepEqual(status,{answered:12,expected:12,submitted:true,applicationDone:true,reflectionDone:true,ready:true});
 assert.equal(teacherCanFinish(s,lesson,{},[],full),true);
 assert.equal(finishTeacherSession(s,lesson,{},at,[],full).completedAt,at);
 assert.equal(independentTeacherEvidence(s,lesson),2);
 assert.equal(teacherCanFinish({...s,visitedIds:s.visitedIds.filter(id=>id!=="model")},lesson,{},[],full),false);
});
test("L006 does not confuse test attempt with automatic mastery or aided answers",()=>{
 let s=emptyTeacherSession(lesson,at);
 s=markTeacherHelp(s,"independent",at);
 s=submitTeacherAnswer(s,lesson,"independent","Auf Wiedersehen!",at);
 assert.equal(s.attempts[0]?.correct,true);
 assert.equal(s.attempts[0]?.independent,false);
 assert.equal(independentTeacherEvidence(s,lesson),0);
 assert.equal(teacherChapterAssessmentStatus(lesson,{...full,testAnswers:Object.fromEntries(ids.map(id=>[id,"incorrect"]))}).ready,true);
 // All answered + submitted means *completed*, not correct and not mastered.
});
test("L006 rejects wrong chapter exam IDs and unsafe fake submission requirements",()=>{
 assert.ok(validateTeacherLesson({...lesson,chapterAssessment:{...lesson.chapterAssessment!,requiredTestIds:["C02-EX-01"]}}).some(x=>x.location==="chapterAssessment"));
 assert.ok(validateTeacherLesson({...lesson,chapterAssessment:{...lesson.chapterAssessment!,minSelfAssessmentLength:-1}}).some(x=>x.location==="chapterAssessment"));
});
