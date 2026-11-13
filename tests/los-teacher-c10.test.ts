import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L051_TEACHER as L051 } from "../src/features/los/teacher/lessonL051.ts";
import { LOS1_L052_TEACHER as L052 } from "../src/features/los/teacher/lessonL052.ts";
import { LOS1_L053_TEACHER as L053 } from "../src/features/los/teacher/lessonL053.ts";
import { LOS1_L054_TEACHER as L054 } from "../src/features/los/teacher/lessonL054.ts";
import { LOS1_L055_TEACHER as L055 } from "../src/features/los/teacher/lessonL055.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";
import { losExercisesFor, losScore } from "../src/features/los/exerciseBank.ts";
import { losArchiveChapterExam, losChapterExamHistory } from "../src/features/los/losWorkbookPersistence.ts";
import { parseLosDraft } from "../src/features/los/studyState.ts";
import {
 emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, confirmTeacherActivity,
 teacherCanFinish, teacherChapterAssessmentStatus, toggleTeacherPause, validTeacherSession,
 independentTeacherEvidence, markTeacherHelp, teacherWrongFeedback
} from "../src/features/los/teacher/engine.ts";

const lessons=[L051,L052,L053,L054,L055] as const;
const now="2026-11-14T10:00:00.000Z";
const bank=losExercisesFor("10");
const correct=Object.fromEntries(bank.map(item=>[item.id,item.correct]));
const evidenceAnswers:Record<string,string>={
 "C10-HARALD-Q01":"a","C10-HARALD-Q02":"b",
 "C10-HARALD-Q03":"c","C10-HARALD-Q04":"a",
 "C10-SOURCE-EVIDENCE-01":"u08",
 "C10-TEXTB-Q02":"b","C10-TEXTB-Q03":"c",
};
const written=[
 "A · Zwei Jugendliche",
 "Mia: Hallo! Ich heiße Mia. Wie heißt du?",
 "Leo: Hallo! Ich heiße Leo.",
 "Mia: Woher kommst du?",
 "Leo: Ich komme aus Deutschland. Und du?",
 "Mia: Ich komme aus Finnland. Wie geht's?",
 "Leo: Gut, danke!",
 "Mia: Schön, dich kennenzulernen!",
 "Leo: Bis morgen!",
 "B · Schüler und Lehrerin",
 "Mia: Guten Tag!",
 "Lehrerin: Guten Tag!",
 "Mia: Ich heiße Mia. Wie heißen Sie?",
 "Lehrerin: Ich heiße Frau Müller.",
 "Mia: Woher kommen Sie?",
 "Lehrerin: Ich komme aus Deutschland.",
 "Mia: Bitte langsamer.",
 "Lehrerin: Auf Wiedersehen!",
 "Das ist Leo. Er heißt Leo. Er kommt aus Finnland. Er ist siebzehn Jahre alt.",
].join("\n");
const assessment={
 testAnswers:correct,testSubmittedAt:now,applicationDraft:written,
 selfAssessment:"Osaan esitellä kolmannen henkilön; kohteliaat Sie-muodot tarvitsevat vielä kertausta.",
};
function ready(lesson:typeof L051){
 let x=emptyTeacherSession(lesson,now);
 for(const scene of lesson.scenes){
  x=moveTeacherScene(x,lesson,scene.id,now);
  if(scene.question){
   const q=scene.question;
   x=submitTeacherAnswer(x,lesson,scene.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,now);
  }
 }
 for(const id of lesson.requiredActivityIds)x=confirmTeacherActivity(x,lesson,id,now);
 return x;
}
function evidence(lesson:typeof L051){
 const answers:Record<string,string>={};
 for(const id of lesson.requiredPracticeIds)answers[id]=correct[id]??"attempted";
 for(const id of lesson.requiredCheckedIds??[])answers[id]=evidenceAnswers[id]??"";
 return {answers,checks:[...(lesson.requiredCheckedIds??[])]};
}
test("C10 Text A is real 14-turn Harald interview, with source disclosure and non-required contact sequence",()=>{
 const src=getLosOpenDialogue("10");
 assert.ok(src);
 assert.equal(src.chapterId,"10");
 assert.equal(src.sourceId,"M-DIB-02");
 assert.equal(src.originalLines.length,14);
 assert.equal(src.originalLines[0]?.text,"Wie heißt du?");
 assert.equal(src.originalLines[1]?.text,"Ich heiße Harald Becker.");
 assert.match(src.originalLines[3]?.text??"",/München/);
 assert.match(src.originalLines[7]?.text??"",/um die fünfzig/);
 assert.equal(src.originalLines[11]?.text,"Blau.");
 assert.equal(src.evidenceLineId,"u08");
 assert.deepEqual(src.questions.map(q=>q.id),[
  "C10-HARALD-Q01","C10-HARALD-Q02","C10-HARALD-Q03","C10-HARALD-Q04"
 ]);
 assert.deepEqual(src.questions.map(q=>q.correctId),["a","b","c","a"]);
 assert.match(src.guidance,/puhe|puhelin|videon/i);
});
test("C10 Text B remains the real *reused* complete M-COM-02 Thomas/Takashi transcript, not Berna or a fake listening result",()=>{
 const b=LOS1_TEXT_B_SOURCES["10"];
 assert.equal(b.sourceId,"M-COM-02");
 assert.equal(b.transcriptIsExact,true);
 assert.equal(b.lines.length,4);
 assert.deepEqual(b.lines.map(x=>x.speaker),["Thomas","Takashi","Thomas","Takashi"]);
 assert.match(b.lines[2]?.text??"",/Das ist Peter\. Wir kommen aus Berlin/);
 assert.deepEqual(b.questions.map(q=>q.id),[
  "C10-TEXTB-Q01","C10-TEXTB-Q02","C10-TEXTB-Q03","C10-TEXTB-Q04"
 ]);
 assert.deepEqual(b.questions.map(q=>q.correctId),["a","b","c","a"]);
 assert.match(b.summary,/C02|C03/);
});
test("all C10 five Teacher lessons are registered, fully scaffolded and match existing book IDs",()=>{
 assert.equal(bank.length,20);
 for(const [i,lesson] of lessons.entries()){
  assert.equal(lesson.id,"L"+String(51+i).padStart(3,"0"));
  assert.equal(lesson.chapterId,"10");
  assert.equal(lesson.bookId,1);
  assert.equal(getLosTeacherLesson(lesson.id),lesson);
  assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
  assert.ok(lesson.scenes.length>=12);
  assert.equal(new Set(lesson.scenes.map(s=>s.id)).size,lesson.scenes.length);
  assert.ok(lesson.scenes.some(s=>s.kind==="board"),lesson.id);
  assert.ok(lesson.scenes.some(s=>s.kind==="explanation"),lesson.id);
  assert.ok(lesson.scenes.some(s=>s.kind==="summary"),lesson.id);
  assert.ok(lesson.scenes.some(s=>s.help?.length),lesson.id);
  assert.equal(lesson.requiredQuestionIds.length,5);
  assert.ok(lesson.requiredQuestionIds.every(id=>lesson.scenes.some(s=>s.id===id&&s.question)));
  assert.ok(lesson.requiredActivityIds.every(id=>lesson.scenes.some(s=>s.activityId===id)));
  assert.ok(lesson.requiredPracticeIds.every(id=>bank.some(q=>q.id===id)),lesson.id);
  assert.ok(lesson.scenes.flatMap(s=>s.bookLinks??[]).some(l=>l.chapterId==="10"));
 }
});
test("L051 checks genuine Harald origin and approximate age, and opens authentic Text A from the book",()=>{
 assert.deepEqual(L051.requiredPracticeIds,["C10-EX-01","C10-EX-02","C10-EX-03"]);
 assert.deepEqual(L051.requiredCheckedIds,["C10-HARALD-Q01","C10-HARALD-Q02"]);
 assert.ok(L051.scenes.some(s=>s.id==="source"&&s.bookLinks?.some(l=>l.section==="text")));
 assert.ok(L051.scenes.some(s=>s.id==="checked"&&s.bookLinks?.some(l=>l.section==="understand")));
 assert.match(L051.scenes.flatMap(s=>s.paragraphs).join(" "),/puhelinnumero|puhelin/i);
 assert.match(teacherWrongFeedback(L051.scenes.find(s=>s.id==="independent")!,"du heiße mia"),/Ich|omasta/i);
});
test("L052 checks three real Harald answers and authentic u08 age source location",()=>{
 assert.deepEqual(L052.requiredCheckedIds,[
  "C10-HARALD-Q02","C10-HARALD-Q03","C10-HARALD-Q04","C10-SOURCE-EVIDENCE-01"
 ]);
 assert.ok(L052.scenes.some(s=>s.id==="evidence"&&s.bookLinks?.some(l=>l.section==="understand")));
 const session=ready(L052),{answers,checks}=evidence(L052);
 assert.equal(teacherCanFinish(session,L052,answers,checks),true);
 assert.equal(teacherCanFinish(session,L052,answers,checks.slice(0,3)),false);
 assert.equal(teacherCanFinish(session,L052,{...answers,"C10-SOURCE-EVIDENCE-01":"u15"},checks),false);
 assert.equal(teacherCanFinish(session,L052,{...answers,"C10-HARALD-Q03":"invalid"},checks),false);
 assert.equal(teacherCanFinish(session,L052,{...answers,"C10-SOURCE-EVIDENCE-01":"u07"},checks),true,
  "A valid checked wrong source-line choice is still an attempted task, not mastery.");
});
test("L053 teaches third-person er/sie heißt, ist and kommt with four actual original fill exercises",()=>{
 assert.deepEqual(L053.requiredPracticeIds,["C10-EX-06","C10-EX-08","C10-EX-10","C10-EX-11"]);
 const text=L053.scenes.flatMap(s=>s.paragraphs).join(" ");
 for(const phrase of ["er/sie heißt","er/sie ist","er/sie kommt","Wie heißen Sie?"])
  assert.ok(text.includes(phrase),phrase);
 assert.match(teacherWrongFeedback(L053.scenes.find(s=>s.id==="independent")!,"sie kommen aus finnland"),/Sie|kommt/);
});
test("L054 requires the saved two 6–8 turn fictional dialogues and four-sentence application, but does not auto-grade language",()=>{
 assert.deepEqual(L054.requiredCheckedIds,["C10-TEXTB-Q02","C10-TEXTB-Q03"]);
 assert.deepEqual(L054.requiredPracticeIds,["C10-EX-12","C10-EX-13"]);
 assert.equal(L054.applicationDraftMinLength,80);
 assert.equal(L054.chapterAssessment,undefined);
 assert.ok(L054.scenes.some(s=>s.id==="writing"&&s.bookLinks?.some(l=>l.section==="apply")));
 const state=ready(L054),{answers,checks}=evidence(L054);
 assert.equal(teacherCanFinish(state,L054,answers,checks),false);
 assert.equal(teacherCanFinish(state,L054,answers,checks,{...assessment,applicationDraft:"Mia"}),false);
 assert.equal(teacherCanFinish(state,L054,answers,checks,assessment),true);
 assert.equal(teacherCanFinish(state,L054,{...answers,"C10-TEXTB-Q02":"imported-bogus-choice"},checks,assessment),false);
 assert.deepEqual(validateTeacherLesson({...L054,applicationDraftMinLength:0}).map(i=>i.location),["applicationDraftMinLength"]);
 const prose=L054.scenes.flatMap(s=>s.paragraphs).join(" ");
 assert.match(prose,/6–8/);
 assert.match(prose,/neljä|4 virkettä/);
});
test("L055 is the original 20-question chapter test, with 7 fills, independent of the later EX-FINAL and without duplicated writing gate",()=>{
 assert.deepEqual(L055.chapterAssessment?.requiredTestIds,bank.map(x=>x.id));
 assert.equal(L055.chapterAssessment?.requireApplicationDraft,false);
 assert.equal(L055.chapterAssessment?.minSelfAssessmentLength,15);
 assert.equal(L055.applicationDraftMinLength,undefined);
 assert.deepEqual(losScore("10",correct),{correct:20,total:20});
 for(const id of ["C10-EX-03","C10-EX-05","C10-EX-06","C10-EX-08","C10-EX-09","C10-EX-10","C10-EX-11"])
  assert.ok(bank.some(q=>q.id===id));
 const noApp={...assessment,applicationDraft:""};
 assert.deepEqual(teacherChapterAssessmentStatus(L055,noApp),{
  answered:20,expected:20,submitted:true,applicationDone:true,reflectionDone:true,ready:true
 });
 const state=ready(L055);
 assert.equal(teacherCanFinish(state,L055,{},[],noApp),true);
 assert.equal(teacherCanFinish(state,L055,{},[],{...noApp,testSubmittedAt:null}),false);
 assert.equal(teacherCanFinish(state,L055,{},[],{...noApp,testAnswers:{...correct,[bank[0]!.id]:""}}),false);
 assert.equal(teacherCanFinish(state,L055,{},[],{...noApp,selfAssessment:""}),false);
 assert.match(L055.scenes.flatMap(s=>s.paragraphs).join(" "),/EX-FINAL/);
});
test("C10 Teacher pause/resume and helped versus independent answers preserve honest evidence",()=>{
 for(const lesson of lessons){
  const state=ready(lesson),{answers,checks}=evidence(lesson);
  const chapter=lesson===L054||lesson===L055?assessment:undefined;
  assert.equal(teacherCanFinish(state,lesson,answers,checks,chapter),true,lesson.id);
  if(lesson.requiredPracticeIds.length)
   assert.equal(teacherCanFinish(state,lesson,{},checks,chapter),false);
  if(checks.length)
   assert.equal(teacherCanFinish(state,lesson,answers,[],chapter),false);
  const paused=toggleTeacherPause(state,now);
  assert.equal(moveTeacherScene(paused,lesson,lesson.scenes[0]!.id,now),paused);
  assert.equal(teacherCanFinish(paused,lesson,answers,checks,chapter),false);
  assert.equal(validTeacherSession(JSON.parse(JSON.stringify(paused))),true);
  assert.ok(independentTeacherEvidence(state,lesson)>=2);
  const individual=lesson.scenes.find(s=>s.id==="independent")!;
  const helped=markTeacherHelp(emptyTeacherSession(lesson,now),individual.id,now);
  const q=individual.question!;
  const result=submitTeacherAnswer(helped,lesson,individual.id,
   q.type==="choice"?q.correctOption!:q.accepted![0]!,now);
  assert.equal(independentTeacherEvidence(result,lesson),0);
 }
});
test("C10 old 19/20 submission stays archived before 20/20 retake, with writing and Teacher progress intact",()=>{
 const old={...correct,[bank[0]!.id]:"deliberately incorrect"};
 const archived=losArchiveChapterExam({},"10",bank,old,now);
 assert.deepEqual(losChapterExamHistory(archived,"10").map(a=>a.correct),[19]);
 const stored={
  version:1,note:"",applicationDraft:written,bookmarked:false,
  practiceAnswers:archived,practiceChecked:[],
  testAnswers:correct,testSubmittedAt:now,selfAssessment:assessment.selfAssessment,
  teacherSessions:{L055:ready(L055)},updatedAt:now
 };
 const parsed=parseLosDraft(JSON.stringify(stored));
 assert.equal(parsed.applicationDraft,written);
 assert.equal(parsed.testSubmittedAt,now);
 assert.equal(parsed.teacherSessions?.L055?.lessonId,"L055");
 assert.deepEqual(parsed.testAnswers,correct);
 const next=losArchiveChapterExam(parsed.practiceAnswers,"10",bank,parsed.testAnswers,now);
 const history=losChapterExamHistory(next,"10");
 assert.deepEqual(history.map(a=>a.correct),[19,20]);
 assert.equal(history[0]!.answers.find(a=>a.id===bank[0]!.id)?.answer,"deliberately incorrect");
});
