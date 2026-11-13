import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L036_TEACHER as L036 } from "../src/features/los/teacher/lessonL036.ts";
import { LOS1_L037_TEACHER as L037 } from "../src/features/los/teacher/lessonL037.ts";
import { LOS1_L038_TEACHER as L038 } from "../src/features/los/teacher/lessonL038.ts";
import { LOS1_L039_TEACHER as L039 } from "../src/features/los/teacher/lessonL039.ts";
import { LOS1_L040_TEACHER as L040 } from "../src/features/los/teacher/lessonL040.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";
import { losExercisesFor, losScore } from "../src/features/los/exerciseBank.ts";
import { losArchiveChapterExam, losChapterExamHistory } from "../src/features/los/losWorkbookPersistence.ts";
import { parseLosDraft } from "../src/features/los/studyState.ts";
import {
 emptyTeacherSession, moveTeacherScene, submitTeacherAnswer,
 confirmTeacherActivity, markTeacherHelp, teacherWrongFeedback,
 independentTeacherEvidence, teacherCanFinish, teacherChapterAssessmentStatus,
 validTeacherSession, toggleTeacherPause
} from "../src/features/los/teacher/engine.ts";

const lessons=[L036,L037,L038,L039,L040] as const;
const at="2026-11-13T17:00:00.000Z";
const bank=losExercisesFor("07");
const rightExam=Object.fromEntries(bank.map(q=>[q.id,q.correct]));
const sourceChoices:Record<string,string>={
 "C07-SOURCE-Q01":"b","C07-SOURCE-Q02":"c",
 "C07-SOURCE-Q03":"a","C07-SOURCE-Q04":"b",
 "C07-TEXTB-Q01":"b","C07-TEXTB-Q04":"b",
};
const application=[
 "Mia: M – I – A","Lena: L – E – N – A",
 "Uwe: U – W – E","Leo: L – E – O",
 "Anna: A – N – N – A","Emil: E – M – I – L",
 "Greta: G – R – E – T – A","Jonas: J – O – N – A – S",
 "Name: Lena","Zahlenfolgen: 1–0–2–3 / 4–0–6–7 / 8–1–5–9 / 2–7–0–4",
 "Wie schreibt man das? Bitte buchstabieren Sie.",
].join("\n");
const assessment={testAnswers:rightExam,testSubmittedAt:at,applicationDraft:application,
 selfAssessment:"Harjoittelin kirjainrivejä, mutta ß ja ü vaativat vielä kertausta."};
function prepared(lesson:typeof L036){
 let s=emptyTeacherSession(lesson,at);
 for(const scene of lesson.scenes){
  s=moveTeacherScene(s,lesson,scene.id,at);
  if(scene.question){
   const q=scene.question;
   s=submitTeacherAnswer(s,lesson,scene.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,at);
  }
 }
 for(const id of lesson.requiredActivityIds)s=confirmTeacherActivity(s,lesson,id,at);
 return s;
}
function realEvidence(lesson:typeof L036){
 const practiceAnswers:Record<string,string>=Object.fromEntries(lesson.requiredPracticeIds.map(id=>[id,rightExam[id]??"attempted"]));
 const checkedIds=[...(lesson.requiredCheckedIds??[])];
 return {answers:{...practiceAnswers,...Object.fromEntries(checkedIds.map(id=>[id,sourceChoices[id]??"a"]))} as Record<string,string>,checkedIds};
}
test("C07 genuine source has exactly five original conversation turns and separate unverified alphabet media",()=>{
 const src=getLosOpenDialogue("07");
 assert.ok(src);
 assert.equal(src.sourceId,"M-WB-02");
 assert.equal(src.originalLines.length,5);
 assert.deepEqual(src.originalLines.map(l=>l.speaker),["Auskunft","Franz","Auskunft","Franz","Auskunft"]);
 assert.deepEqual(src.questions.map(q=>q.id),["C07-SOURCE-Q01","C07-SOURCE-Q02","C07-SOURCE-Q03","C07-SOURCE-Q04"]);
 assert.match(src.originalLines[2]!.text,/Wie schreibt man das\? Bitte buchstabieren Sie/);
 assert.match(src.originalLines[3]!.text,/zweimal L wie Ludwig/);
 const textB=LOS1_TEXT_B_SOURCES["07"];
 assert.equal(textB.sourceId,"M-COM-06");
 assert.equal(textB.transcriptIsExact,false);
 assert.equal(textB.lines.length,0,"Do not fake an exact human audio transcript.");
 assert.deepEqual(textB.questions.map(q=>q.id),["C07-TEXTB-Q01","C07-TEXTB-Q02","C07-TEXTB-Q03","C07-TEXTB-Q04"]);
});
test("all C07 Teacher manuscripts are real, registered, validated, with 5 checks each",()=>{
 assert.equal(bank.length,15);
 for(const [i,lesson] of lessons.entries()){
  assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
  assert.equal(lesson.id,"L"+String(i+36).padStart(3,"0"));
  assert.equal(lesson.bookId,1);
  assert.equal(lesson.chapterId,"07");
  assert.equal(getLosTeacherLesson(lesson.id),lesson);
  assert.ok(lesson.scenes.length>=12);
  assert.equal(new Set(lesson.scenes.map(x=>x.id)).size,lesson.scenes.length);
  assert.ok(lesson.scenes.some(s=>s.kind==="board"),lesson.id);
  assert.ok(lesson.scenes.some(s=>s.kind==="explanation"),lesson.id);
  assert.ok(lesson.scenes.some(s=>s.kind==="summary"),lesson.id);
  assert.ok(lesson.scenes.some(s=>s.help?.length),lesson.id);
  assert.ok(lesson.requiredQuestionIds.length>=5);
  assert.ok(lesson.requiredQuestionIds.every(id=>lesson.scenes.some(s=>s.id===id&&s.question)));
  assert.ok(lesson.requiredPracticeIds.every(id=>bank.some(q=>q.id===id)));
  assert.ok(lesson.requiredActivityIds.every(id=>lesson.scenes.some(s=>s.activityId===id)));
  assert.ok(lesson.scenes.flatMap(s=>s.bookLinks??[]).some(l=>l.chapterId==="07"),lesson.id);
 }
});
test("L036 starts with three actual fictional-name exercises and does not award speech grades",()=>{
 assert.deepEqual(L036.requiredPracticeIds,["C07-EX-05","C07-EX-06","C07-EX-07"]);
 const text=L036.scenes.flatMap(s=>s.paragraphs).join(" ");
 assert.match(text,/Mia/);
 assert.match(text,/Lena/);
 assert.match(text,/Uwe/);
 assert.match(text,/ääntämistäsi ei pisteytetä|ääntämisen tarkistus/i);
 const wrong=L036.scenes.find(s=>s.id==="independent")!;
 assert.match(teacherWrongFeedback(wrong,"uve"),/W:n V:ksi/);
});
test("L037 uses full Text A and two actual checked comprehension questions",()=>{
 assert.deepEqual(L037.requiredCheckedIds,["C07-SOURCE-Q01","C07-SOURCE-Q02"]);
 assert.ok(L037.scenes.some(s=>s.bookLinks?.some(l=>l.section==="text")));
 assert.ok(L037.scenes.some(s=>s.id==="checked"&&s.bookLinks?.some(l=>l.section==="understand")));
 const text=L037.scenes.flatMap(s=>s.paragraphs).join(" ");
 assert.match(text,/viiden repliikin|viisi puheenvuoroa|viisi aitoa repliikkiä/i);
 assert.match(text,/numerotiedustel/);
});
test("L038 uses four spelling exercises and two non-listening C07 Text B letter checks",()=>{
 assert.deepEqual(L038.requiredPracticeIds,["C07-EX-08","C07-EX-09","C07-EX-14","C07-EX-15"]);
 assert.deepEqual(L038.requiredCheckedIds,["C07-TEXTB-Q01","C07-TEXTB-Q04"]);
 assert.ok(L038.scenes.some(s=>s.id==="textb"&&s.bookLinks?.some(l=>l.section==="text-b")));
 assert.equal(L038.scenes.some(s=>s.activityId?.toLowerCase().includes("listen")),false);
 const word=L038.scenes.find(s=>s.id==="independent")!;
 assert.deepEqual(word.question?.accepted,["buchstabieren"]);
 assert.match(L038.scenes.flatMap(s=>s.paragraphs).join(" "),/sanatarkka|sanatarkaksi/);
});
test("L039 requires genuine saved multi-line application and two final source questions, with no duplicate test",()=>{
 assert.equal(L039.chapterAssessment,undefined);
 assert.equal(L039.applicationDraftMinLength,120);
 assert.deepEqual(L039.requiredCheckedIds,["C07-SOURCE-Q03","C07-SOURCE-Q04"]);
 assert.ok(L039.scenes.some(s=>s.id==="write"&&s.bookLinks?.some(l=>l.section==="apply")));
 const s=prepared(L039), {answers,checkedIds}=realEvidence(L039);
 assert.equal(teacherCanFinish(s,L039,answers,checkedIds),false,"No saved text must block completion");
 assert.equal(teacherCanFinish(s,L039,answers,checkedIds,{...assessment,applicationDraft:"Mia"}),false);
 assert.equal(teacherCanFinish(s,L039,answers,checkedIds,assessment),true);
 assert.equal(teacherCanFinish(s,L039,answers,checkedIds,{...assessment,applicationDraft:"   "}),false);
 assert.deepEqual(validateTeacherLesson({...L039,applicationDraftMinLength:-1}).map(i=>i.location),["applicationDraftMinLength"]);
});
test("L040 reads exactly the actual C07 15-item chapter test and chapter-local self-assessment",()=>{
 assert.deepEqual(L040.chapterAssessment?.requiredTestIds,bank.map(q=>q.id));
 assert.equal(L040.chapterAssessment?.requireApplicationDraft,true);
 assert.equal(L040.applicationDraftMinLength,120);
 assert.equal(L040.chapterAssessment?.minSelfAssessmentLength,15);
 assert.equal(losScore("07",rightExam).correct,15);
 assert.deepEqual(teacherChapterAssessmentStatus(L040,assessment),{
  answered:15,expected:15,submitted:true,applicationDone:true,reflectionDone:true,ready:true
 });
 const s=prepared(L040);
 assert.equal(teacherCanFinish(s,L040,{},[],assessment),true);
 assert.equal(teacherCanFinish(s,L040,{},[],{...assessment,testSubmittedAt:null}),false);
 assert.equal(teacherCanFinish(s,L040,{},[],{...assessment,testAnswers:{...rightExam,[bank[0]!.id]:""}}),false);
 assert.equal(teacherCanFinish(s,L040,{},[],{...assessment,applicationDraft:""}),false);
 assert.equal(teacherCanFinish(s,L040,{},[],{...assessment,applicationDraft:"Mia"}),false);
 assert.equal(teacherCanFinish(s,L040,{},[],{...assessment,selfAssessment:""}),false);
 const sections=new Set(L040.scenes.flatMap(s=>s.bookLinks??[]).map(l=>l.section));
 for(const section of ["text","practice","apply","test"])assert.ok(sections.has(section),section);
});
test("C07 all five sessions recover after pause and require real saved evidence",()=>{
 for(const lesson of lessons){
  const s=prepared(lesson),{answers,checkedIds}=realEvidence(lesson);
  const draft=lesson===L039||lesson===L040?assessment:undefined;
  assert.equal(teacherCanFinish(s,lesson,answers,checkedIds,draft),true,lesson.id);
  if(lesson.requiredPracticeIds.length)assert.equal(teacherCanFinish(s,lesson,{},checkedIds,draft),false);
  if(checkedIds.length){
   assert.equal(teacherCanFinish(s,lesson,answers,[],draft),false);
   assert.equal(teacherCanFinish(s,lesson,{...answers,[checkedIds[0]!]:"invalid"},checkedIds,draft),false);
  }
  const paused=toggleTeacherPause(s,at);
  assert.equal(moveTeacherScene(paused,lesson,lesson.scenes[0]!.id,at),paused);
  assert.equal(teacherCanFinish(paused,lesson,answers,checkedIds,draft),false);
  assert.equal(validTeacherSession(JSON.parse(JSON.stringify(paused))),true);
  assert.ok(independentTeacherEvidence(s,lesson)>=2);
  const independent=lesson.scenes.find(s=>s.id==="independent")!;
  const helped=markTeacherHelp(emptyTeacherSession(lesson,at),independent.id,at);
  const q=independent.question!;
  const answered=submitTeacherAnswer(helped,lesson,independent.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,at);
  assert.equal(independentTeacherEvidence(answered,lesson),0);
 }
});
test("C07 archives actual 14/15 and then 15/15 exam retake without changing the old attempt or saved L040 Teacher session",()=>{
 const previous={...rightExam,[bank[0]!.id]:"deliberately wrong"};
 const archived=losArchiveChapterExam({},"07",bank,previous,at);
 assert.deepEqual(losChapterExamHistory(archived,"07").map(h=>h.correct),[14]);
 const raw={
  version:1,note:"",applicationDraft:application,bookmarked:false,practiceAnswers:archived,
  practiceChecked:[],testAnswers:rightExam,testSubmittedAt:at,
  selfAssessment:assessment.selfAssessment,teacherSessions:{L040:prepared(L040)},updatedAt:at
 };
 const parsed=parseLosDraft(JSON.stringify(raw));
 assert.equal(parsed.applicationDraft,application);
 assert.equal(parsed.teacherSessions?.L040?.lessonId,"L040");
 assert.deepEqual(parsed.testAnswers,rightExam);
 const next=losArchiveChapterExam(parsed.practiceAnswers,"07",bank,parsed.testAnswers,at);
 const history=losChapterExamHistory(next,"07");
 assert.deepEqual(history.map(h=>h.correct),[14,15]);
 assert.equal(history[0]!.answers.find(i=>i.id===bank[0]!.id)?.answer,"deliberately wrong");
});
