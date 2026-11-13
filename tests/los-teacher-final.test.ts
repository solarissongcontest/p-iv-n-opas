import test from "node:test";
import assert from "node:assert/strict";
import {LOS1_FINAL_TEACHER_LESSONS} from "../src/features/los/teacher/lessonFinal.ts";
import {validateTeacherLesson} from "../src/features/los/teacher/validateContent.ts";
import {teacherBookEvidenceStatus, type TeacherBookEvidenceInput} from "../src/features/los/teacher/finalEvidence.ts";
import {
  emptyTeacherSession,moveTeacherScene,submitTeacherAnswer,
  setTeacherAnswerDraft,confirmTeacherActivity,teacherCanFinish,finishTeacherSession,
} from "../src/features/los/teacher/engine.ts";
import {LOS1_REVIEW_II_QUESTIONS,losReviewIIReflectionId,LOS1_REVIEW_II_WRITING_ID} from "../src/features/los/content/los1ReviewII.ts";
import {
  LOS1_FINAL_QUESTIONS,LOS1_FINAL_AUDIO_SOURCES,LOS1_FINAL_WRITING_CHECK,
  LOS1_FINAL_VOICE_CHECK,LOS1_SUMMARY_GOAL,LOS1_SUMMARY_CARDS,
  LOS1_SUMMARY_REFLECTION,
} from "../src/features/los/content/los1FinalExam.ts";

const now="2026-11-13T12:00:00.000Z";
const empty=():TeacherBookEvidenceInput=>({
 practiceAnswers:{},practiceChecked:[],testAnswers:{},
 testSubmittedAt:null,applicationDraft:"",selfAssessment:"",
});
function review(id:"L056"|"L057"|"L058"){
 const draft=empty();
 const qs=LOS1_REVIEW_II_QUESTIONS.filter(q=>q.group===id);
 draft.practiceAnswers=Object.fromEntries([...qs.map(q=>[q.id,q.correctId]),
  [losReviewIIReflectionId(id),"some"],
  ...(id==="L058"?[[LOS1_REVIEW_II_WRITING_ID,
   "Hallo! Ich heiße Mia. Ich komme aus Finnland. Ich bin siebzehn Jahre alt. Das ist Leo. Er ist mein Freund. Bis morgen!"]]:[]),
 ]);
 draft.practiceChecked=qs.map(q=>q.id);
 return draft;
}
function finalExam(){
 const d=empty();
 d.testAnswers=Object.fromEntries(LOS1_FINAL_QUESTIONS.map(q=>[q.id,q.correctId]));
 d.testSubmittedAt=now;
 d.applicationDraft=[
 "Hallo! Ich heiße Mia.","Ich komme aus Finnland.",
 "Ich bin siebzehn Jahre alt.","Das ist mein Freund Leo.",
 "Wir treffen uns am Montag um drei Uhr.","Bis morgen!",
 ].join("\n");
 d.practiceAnswers={
 ...Object.fromEntries(LOS1_FINAL_AUDIO_SOURCES.map(src=>["EX-FINAL-AUDIO-"+src.id,now])),
 [LOS1_FINAL_WRITING_CHECK]:"written-and-reviewed",
 [LOS1_FINAL_VOICE_CHECK]:"audio-download-started",
 "EX-FINAL-DIALOGUE-SELF":"some",
 };
 d.selfAssessment="Tarkistin ääntämisen itse ja palaan lukusanoihin.";
 return d;
}
function summary(){
 const d=empty();
 d.practiceAnswers={
 ...Object.fromEntries(Array.from({length:10},(_,i)=>["EX-SUMMARY-C"+String(i+1).padStart(2,"0"),"reviewed"])),
 [LOS1_SUMMARY_CARDS]:"reviewed-5",
 [LOS1_SUMMARY_GOAL]:"Harjoittelen viisi lukusanaa ja yhtä alkeisdialogia joka viikko.",
 "EX-SUMMARY-GOAL-OK":"confirmed",
 [LOS1_SUMMARY_REFLECTION]:"again",
 };
 return d;
}
function teacherReady(id:string){
 const lesson=LOS1_FINAL_TEACHER_LESSONS.find(x=>x.id===id)!;
 let s=emptyTeacherSession(lesson,now);
 for(const scene of lesson.scenes){
  s=moveTeacherScene(s,lesson,scene.id,now);
  if(scene.reflection)s=setTeacherAnswerDraft(s,scene.id,"X".repeat(scene.reflection.minLength+3),now);
 }
 for(const id of lesson.requiredQuestionIds){
  const scene=lesson.scenes.find(x=>x.id===id)!;
  const answer=scene.question?.type==="choice"?scene.question.correctOption!:scene.question?.accepted?.[0]??"";
  s=submitTeacherAnswer(s,lesson,id,answer,now);
 }
 for(const id of lesson.requiredActivityIds)s=confirmTeacherActivity(s,lesson,id,now);
 return {lesson,s};
}

test("all five final Teacher lessons validate, have independent written teaching and real book links",()=>{
 assert.deepEqual(LOS1_FINAL_TEACHER_LESSONS.map(l=>l.id),["L056","L057","L058","L059","L060"]);
 for(const lesson of LOS1_FINAL_TEACHER_LESSONS){
  assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
  assert.ok(lesson.scenes.length>=9,lesson.id);
  assert.ok(lesson.scenes.some(s=>s.kind==="board"));
  assert.ok(lesson.scenes.some(s=>s.kind==="reflection"));
  assert.ok(lesson.scenes.some(s=>s.kind==="book"));
  assert.ok(lesson.bookEvidence);
  assert.equal(lesson.requiredPracticeIds.length,0,"do not fabricate Cxx exercise duplicates");
  assert.equal(lesson.chapterId,Number(lesson.id.slice(1))<=58?"92":"93");
 }
});
test("Review II requires exactly the canonical five checked questions and own rating per lesson",()=>{
 for(const id of ["L056","L057","L058"] as const){
  const kind={kind:"review-ii" as const,group:id};
  const data=review(id);
  assert.equal(teacherBookEvidenceStatus(kind,data).ready,true);
  const withoutOne={...data,practiceChecked:data.practiceChecked.slice(1)};
  assert.equal(teacherBookEvidenceStatus(kind,withoutOne).ready,false);
  const withoutRating={...data,practiceAnswers:{...data.practiceAnswers,[losReviewIIReflectionId(id)]:""}};
  assert.equal(teacherBookEvidenceStatus(kind,withoutRating).ready,false);
  const withBadChoice={...data,practiceAnswers:{...data.practiceAnswers,
   [LOS1_REVIEW_II_QUESTIONS.find(q=>q.group===id)!.id]:"X"}};
  assert.equal(teacherBookEvidenceStatus(kind,withBadChoice).ready,false);
 }
 const d=review("L058");
 assert.equal(teacherBookEvidenceStatus({kind:"review-ii",group:"L058"},
  {...d,practiceAnswers:{...d.practiceAnswers,[LOS1_REVIEW_II_WRITING_ID]:"short"}}).ready,false);
});
test("EX-FINAL requires the 50 real choices, submission, both audio end events and separate writing/voice review",()=>{
 const kind={kind:"final-exam" as const},d=finalExam();
 const base=teacherBookEvidenceStatus(kind,d);
 assert.equal(base.ready,true);
 assert.equal(base.total,58);
 assert.equal(teacherBookEvidenceStatus(kind,{...d,testSubmittedAt:null}).ready,false);
 assert.equal(teacherBookEvidenceStatus(kind,{...d,testAnswers:{}}).ready,false);
 for(const src of LOS1_FINAL_AUDIO_SOURCES){
  const without={...d,practiceAnswers:{...d.practiceAnswers,["EX-FINAL-AUDIO-"+src.id]:""}};
  assert.equal(teacherBookEvidenceStatus(kind,without).ready,false,"no synthetic listening credit "+src.id);
 }
 assert.equal(teacherBookEvidenceStatus(kind,{...d,applicationDraft:"Ich heiße Leo."}).ready,false);
 for(const key of [LOS1_FINAL_WRITING_CHECK,LOS1_FINAL_VOICE_CHECK,"EX-FINAL-DIALOGUE-SELF"]){
  assert.equal(teacherBookEvidenceStatus(kind,{...d,practiceAnswers:{...d.practiceAnswers,[key]:""}}).ready,false,key);
 }
 assert.equal(teacherBookEvidenceStatus(kind,{...d,selfAssessment:""}).ready,false);
});
test("L060 confirms all ten individual goals, a real review receipt, next target and own summary",()=>{
 const kind={kind:"final-summary" as const},data=summary();
 assert.equal(teacherBookEvidenceStatus(kind,data).ready,true);
 assert.equal(teacherBookEvidenceStatus(kind,{...data,practiceAnswers:{...data.practiceAnswers,[LOS1_SUMMARY_CARDS]:"reviewed-4"}}).ready,false);
 assert.equal(teacherBookEvidenceStatus(kind,{...data,practiceAnswers:{...data.practiceAnswers,
  "EX-SUMMARY-C09":""}}).ready,false);
 assert.equal(teacherBookEvidenceStatus(kind,{...data,practiceAnswers:{...data.practiceAnswers,
  "EX-SUMMARY-GOAL-OK":""}}).ready,false);
 assert.equal(teacherBookEvidenceStatus(kind,{...data,practiceAnswers:{...data.practiceAnswers,
  [LOS1_SUMMARY_REFLECTION]:""}}).ready,false);
});
test("Teacher completion cannot bypass the original review and exam evidence even after every scene and answer",()=>{
 for(const id of ["L056","L057","L058","L059","L060"]){
  const {lesson,s}=teacherReady(id);
  const none=empty();
  assert.equal(teacherCanFinish(s,lesson,none.practiceAnswers,none.practiceChecked,none),false,id);
  const d=id==="L059"?finalExam():id==="L060"?summary():review(id as "L056"|"L057"|"L058");
  assert.equal(teacherCanFinish(s,lesson,d.practiceAnswers,d.practiceChecked,d),true,id);
  const finished=finishTeacherSession(s,lesson,d.practiceAnswers,now,d.practiceChecked,d);
  assert.equal(finished.completedAt,now,id);
  assert.equal(finishTeacherSession(s,lesson,none.practiceAnswers,now,none.practiceChecked,none).completedAt,null,id);
 }
});
