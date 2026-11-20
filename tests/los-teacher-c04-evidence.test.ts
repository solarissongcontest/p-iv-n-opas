import test from "node:test";
import assert from "node:assert/strict";
import {
  emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, markTeacherHelp,
  confirmTeacherActivity, teacherCanFinish, finishTeacherSession,
  independentTeacherEvidence, teacherChapterAssessmentStatus, teacherWrongFeedback,
} from "../src/features/los/teacher/engine.ts";
import { LOS1_L017_TEACHER } from "../src/features/los/teacher/lessonL017.ts";
import { LOS1_L018_TEACHER } from "../src/features/los/teacher/lessonL018.ts";
import { LOS1_L019_TEACHER } from "../src/features/los/teacher/lessonL019.ts";
import { LOS1_L020_TEACHER } from "../src/features/los/teacher/lessonL020.ts";
import { LOS1_L021_TEACHER } from "../src/features/los/teacher/lessonL021.ts";
import type { TeacherLesson, TeacherChapterAssessmentInput } from "../src/features/los/teacher/engine.ts";

const at="2026-11-13T12:00:00.000Z";
const lessons=[LOS1_L017_TEACHER,LOS1_L018_TEACHER,LOS1_L019_TEACHER,LOS1_L020_TEACHER,LOS1_L021_TEACHER];

function allAnswered(lesson:TeacherLesson){
  let session=emptyTeacherSession(lesson,at);
  for(const scene of lesson.scenes){
    session=moveTeacherScene(session,lesson,scene.id,at);
    if(scene.question){
      const q=scene.question;
      session=submitTeacherAnswer(session,lesson,scene.id,
        q.type==="choice"?q.correctOption!:q.accepted![0]!,at);
    }
  }
  for(const id of lesson.requiredActivityIds)
    session=confirmTeacherActivity(session,lesson,id,at);
  return session;
}
function realBookPractice(lesson:TeacherLesson){
  const answers:Record<string,string>={};
  for (const id of [...lesson.requiredPracticeIds,...(lesson.requiredCheckedIds??[])])
    answers[id]="a";
  return answers;
}
function assessment(lesson:TeacherLesson):TeacherChapterAssessmentInput{
  return {
    testAnswers:Object.fromEntries(lesson.chapterAssessment?.requiredTestIds.map(id=>[id,"a"])??[]),
    testSubmittedAt:at,applicationDraft:"Wie heißt du? Wie heißen Sie?",
    selfAssessment:"Osaan erottaa puhuttelun ja kertaan verbinmuotoja.",
  };
}

test("all five can complete using the existing deterministic Teacher session and book evidence",()=>{
 for(const lesson of lessons){
   const session=allAnswered(lesson);
   const answers=realBookPractice(lesson);
   const checked=lesson.requiredCheckedIds??[];
   const chapter=lesson.chapterAssessment?assessment(lesson):undefined;
   assert.equal(independentTeacherEvidence(session,lesson),3,lesson.id);
   assert.equal(teacherCanFinish(session,lesson,answers,checked,chapter),true,lesson.id);
   const finished=finishTeacherSession(session,lesson,answers,at,checked,chapter);
   assert.equal(finished.completedAt,at,lesson.id);
   assert.equal(finished.lessonId,lesson.id);
 }
});

test("reading a book link never fakes missing C04 tasks, confirmations or checked sources",()=>{
 for(const lesson of [LOS1_L017_TEACHER,LOS1_L018_TEACHER,LOS1_L019_TEACHER,LOS1_L020_TEACHER]){
   const s=allAnswered(lesson);
   const answers=realBookPractice(lesson);
   if (lesson.requiredPracticeIds.length) {
     const missing={...answers};delete missing[lesson.requiredPracticeIds[0]!];
     assert.equal(teacherCanFinish(s,lesson,missing,lesson.requiredCheckedIds??[]),false,lesson.id);
   }
   if (lesson.requiredCheckedIds?.length){
     assert.equal(teacherCanFinish(s,lesson,answers,[]),false,lesson.id+" missing explicit review");
   }
   if(lesson.requiredActivityIds.length){
     const blank=emptyTeacherSession(lesson,at);
     let incomplete=blank;
     for(const scene of lesson.scenes){
       incomplete=moveTeacherScene(incomplete,lesson,scene.id,at);
       if(scene.question){
         const q=scene.question;
         incomplete=submitTeacherAnswer(incomplete,lesson,scene.id,
           q.type==="choice"?q.correctOption!:q.accepted![0]!,at);
       }
     }
     assert.equal(teacherCanFinish(incomplete,lesson,answers,lesson.requiredCheckedIds??[]),false);
   }
 }
});

test("hinted and corrected teacher answers count as practice, never independent evidence",()=>{
 for(const lesson of lessons){
   const candidate=lesson.scenes.find(s=>s.question?.evidenceRole==="exit")!;
   const q=candidate.question!;
   const correct=q.type==="choice"?q.correctOption!:q.accepted![0]!;
   let hinted=markTeacherHelp(emptyTeacherSession(lesson,at),candidate.id,at);
   hinted=submitTeacherAnswer(hinted,lesson,candidate.id,correct,at);
   assert.equal(hinted.attempts[0]?.correct,true);
   assert.equal(hinted.attempts[0]?.independent,false);
   assert.equal(independentTeacherEvidence(hinted,lesson),0,lesson.id);
   const wrong=q.type==="choice"?q.options!.find(o=>o.id!==q.correctOption)!.id:"väärin";
   let repaired=submitTeacherAnswer(emptyTeacherSession(lesson,at),lesson,candidate.id,wrong,at);
   repaired=submitTeacherAnswer(repaired,lesson,candidate.id,correct,at);
   assert.equal(repaired.attempts.at(-1)?.correct,true,lesson.id);
   assert.equal(repaired.attempts.at(-1)?.independent,false,lesson.id);
   assert.equal(independentTeacherEvidence(repaired,lesson),0,lesson.id);
 }
});

test("L019 explicitly identifies common wrong forms with targeted Finnish feedback",()=>{
 const lesson=LOS1_L019_TEACHER;
 for(const [sceneId,incorrect,fragment] of [
   ["correct-name","Wie heißt Sie?","du-muoto"],
   ["correct-origin","Woher kommen du?","Sie-muoto"],
 ] as const){
   const scene=lesson.scenes.find(s=>s.id===sceneId)!;
   const actual=teacherWrongFeedback(scene,incorrect);
   assert.ok(actual.includes(fragment),sceneId+": "+actual);
 }
 const m=lesson.scenes.find(s=>s.id==="independent")!;
 assert.match(teacherWrongFeedback(m,"Woher kommst Sie?"),/Kommst/);
});

test("existing C04 chapter test requires a real submitted timestamp, all test fields, own application and self-assessment",()=>{
 const lesson=LOS1_L021_TEACHER;
 const complete=assessment(lesson);
 const status=teacherChapterAssessmentStatus(lesson,complete);
 assert.equal(status.expected,12);
 assert.equal(status.answered,12);
 assert.equal(status.ready,true);
 assert.equal(teacherChapterAssessmentStatus(lesson,{...complete,testSubmittedAt:null}).ready,false);
 assert.equal(teacherChapterAssessmentStatus(lesson,{...complete,testAnswers:{}}).ready,false);
 assert.equal(teacherChapterAssessmentStatus(lesson,{...complete,applicationDraft:""}).ready,false);
 assert.equal(teacherChapterAssessmentStatus(lesson,{...complete,selfAssessment:"lyhyt"}).ready,false);
 const session=allAnswered(lesson);
 assert.equal(teacherCanFinish(session,lesson,{},[],{...complete,testSubmittedAt:null}),false);
 assert.equal(teacherCanFinish(session,lesson,{},[],complete),true);
});

test("L017 case-sensitive Sie distinction is not lost to the text-answer normalizer",()=>{
 const q=LOS1_L017_TEACHER.scenes.find(s=>s.id==="exit")!.question!;
 assert.equal(q.type,"choice");
 assert.ok(q.options?.find(o=>o.label==="sie")?.wrongFeedback);
 let s=emptyTeacherSession(LOS1_L017_TEACHER,at);
 s=submitTeacherAnswer(s,LOS1_L017_TEACHER,"exit","a",at);
 assert.equal(s.attempts[0]?.correct,false);
 s=submitTeacherAnswer(s,LOS1_L017_TEACHER,"exit","b",at);
 assert.equal(s.attempts[1]?.correct,true);
 assert.equal(independentTeacherEvidence(s,LOS1_L017_TEACHER),0,
   "correct after first wrong attempt is practice rather than independent evidence");
});
