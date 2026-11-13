import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L031_TEACHER as L031 } from "../src/features/los/teacher/lessonL031.ts";
import { LOS1_L032_TEACHER as L032 } from "../src/features/los/teacher/lessonL032.ts";
import { LOS1_L033_TEACHER as L033 } from "../src/features/los/teacher/lessonL033.ts";
import { LOS1_L034_TEACHER as L034 } from "../src/features/los/teacher/lessonL034.ts";
import { LOS1_L035_TEACHER as L035 } from "../src/features/los/teacher/lessonL035.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_C01_LINES } from "../src/features/los/content/los1C01.ts";
import { LOS1_C06_REVIEW_QUESTIONS } from "../src/features/los/content/los1C06Review.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";
import { losExercisesFor, losScore } from "../src/features/los/exerciseBank.ts";
import { losArchiveChapterExam, losChapterExamHistory } from "../src/features/los/losWorkbookPersistence.ts";
import { parseLosDraft } from "../src/features/los/studyState.ts";
import {
 emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, confirmTeacherActivity,
 teacherCanFinish, teacherChapterAssessmentStatus, toggleTeacherPause,
 independentTeacherEvidence, validTeacherSession, teacherWrongFeedback, markTeacherHelp
} from "../src/features/los/teacher/engine.ts";

const lessons=[L031,L032,L033,L034,L035] as const;
const now="2026-11-13T16:00:00.000Z";
const bank=losExercisesFor("06");
const correctAnswers=Object.fromEntries(bank.map(item=>[item.id,item.correct]));
const assessment={
 testAnswers:correctAnswers,testSubmittedAt:now,
 applicationDraft:"Mia: Wie alt bist du?\\nMax: Ich bin siebzehn Jahre alt.\\n\\nLena: Wie alt bist du?\\nJonas: Ich bin zwanzig Jahre alt.",
 selfAssessment:"Osaan sanoa kaksi kuvitteellista ikää. Minun pitää vielä kerrata 30 ja 70.",
};
function completed(lesson:typeof L031){
 let session=emptyTeacherSession(lesson,now);
 for(const scene of lesson.scenes){
  session=moveTeacherScene(session,lesson,scene.id,now);
  if(scene.question){
   const q=scene.question;
   session=submitTeacherAnswer(session,lesson,scene.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,now);
  }
 }
 for(const id of lesson.requiredActivityIds){
  session=confirmTeacherActivity(session,lesson,id,now);
 }
 return session;
}
test("C06 uses the real 12-turn M-ZPE-01 original plus separately credited 8-turn C01 source",()=>{
 const primary=getLosOpenDialogue("06");
 assert.ok(primary);
 assert.equal(primary.sourceId,"M-ZPE-01");
 assert.equal(primary.originalLines.length,12);
 assert.deepEqual(primary.originalLines.filter(x=>x.sectionTitle).map(x=>x.sectionTitle),
  ["Dialog 1","Dialog 2","Dialog 3","Dialog 4"]);
 assert.deepEqual(primary.questions.map(q=>q.id),
  ["C06-ZPE-Q01","C06-ZPE-Q02","C06-ZPE-Q03","C06-ZPE-Q04"]);
 assert.equal(primary.originalLines[1]?.text,"Ich bin fünf.");
 assert.equal(primary.originalLines[7]?.text,"Ich bin schon zwölf Jahre alt.");
 assert.equal(LOS1_C01_LINES.length,8);
 assert.equal(LOS1_TEXT_B_SOURCES["06"].sourceId,"M-COM-01");
 assert.equal(LOS1_TEXT_B_SOURCES["06"].lines.length,8);
 assert.deepEqual(LOS1_C06_REVIEW_QUESTIONS.map(q=>q.id),
  ["C06-SOURCE-Q01","C06-SOURCE-Q02","C06-SOURCE-Q03","C06-SOURCE-Q04"]);
});
test("five C06 Teacher scripts register cleanly and have source-specific help, lesson stages and real exercise IDs",()=>{
 assert.equal(bank.length,20);
 for(const [index,lesson] of lessons.entries()){
  assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
  assert.equal(lesson.id,"L"+String(index+31).padStart(3,"0"));
  assert.equal(getLosTeacherLesson(lesson.id),lesson);
  assert.equal(lesson.bookId,1);
  assert.equal(lesson.chapterId,"06");
  assert.ok(lesson.scenes.length>=12);
  assert.equal(new Set(lesson.scenes.map(scene=>scene.id)).size,lesson.scenes.length);
  assert.ok(lesson.scenes.some(scene=>scene.kind==="board"),lesson.id);
  assert.ok(lesson.scenes.some(scene=>scene.kind==="explanation"),lesson.id);
  assert.ok(lesson.scenes.some(scene=>scene.kind==="summary"),lesson.id);
  assert.ok(lesson.scenes.some(scene=>scene.help?.length),lesson.id);
  assert.ok(lesson.scenes.flatMap(scene=>scene.bookLinks??[]).some(link=>link.chapterId==="06"),lesson.id);
  assert.ok(lesson.requiredQuestionIds.length>=5);
  assert.ok(lesson.requiredQuestionIds.every(id=>lesson.scenes.some(scene=>scene.id===id&&scene.question)));
  assert.ok(lesson.requiredPracticeIds.every(id=>bank.some(item=>item.id===id)));
  assert.ok(lesson.requiredActivityIds.every(id=>lesson.scenes.some(scene=>scene.activityId===id)));
 }
});
test("L031 actually teaches exceptions 11/12 and L032 explicitly corrects 16/17 without making age into personal data",()=>{
 assert.deepEqual(L031.requiredPracticeIds,["C06-EX-01","C06-EX-02","C06-EX-03","C06-EX-04","C06-EX-07","C06-EX-08"]);
 const l031=L031.scenes.flatMap(scene=>scene.board??[]).map(item=>item.german).join(" | ");
 assert.match(l031,/elf/);
 assert.match(l031,/zwölf/);
 const independent=L031.scenes.find(scene=>scene.id==="independent")!;
 assert.match(teacherWrongFeedback(independent,"zwölf"),/12|kahtatoista/i);
 assert.deepEqual(L032.requiredPracticeIds,["C06-EX-09","C06-EX-10","C06-EX-11","C06-EX-12"]);
 const l032=L032.scenes.flatMap(scene=>scene.board??[]).map(item=>item.german).join(" | ");
 assert.match(l032,/sechzehn/);
 assert.match(l032,/siebzehn/);
 assert.match(l032,/Wie alt bist du/);
 const wrong=L032.scenes.find(scene=>scene.id==="independent")!;
 assert.match(teacherWrongFeedback(wrong,"siebenzehn"),/siebzehn/);
 for(const lesson of [L031,L032])assert.match(lesson.scenes.flatMap(x=>x.paragraphs).join(" "),/kuvitteell/i);
});
test("L033 forms 21–100 and preserves the exact six existing numeric questions",()=>{
 assert.deepEqual(L033.requiredPracticeIds,
 ["C06-EX-13","C06-EX-14","C06-EX-15","C06-EX-16","C06-EX-19","C06-EX-20"]);
 const text=L033.scenes.flatMap(s=>s.paragraphs).join(" ");
 for(const part of ["einundzwanzig","zweiunddreißig","dreißig","hundert"]) assert.ok(text.includes(part),part);
 assert.match(teacherWrongFeedback(L033.scenes.find(s=>s.id==="independent")!,"zweiunddreissig"),/ß/);
});
test("L034 requires actual checked tasks from both the new M-ZPE-01 and reused C01 texts",()=>{
 const required=["C06-ZPE-Q01","C06-ZPE-Q02","C06-SOURCE-Q01","C06-SOURCE-Q02"];
 assert.deepEqual(L034.requiredCheckedIds,required);
 const source=getLosOpenDialogue("06")!;
 assert.ok(required.slice(0,2).every(id=>source.questions.some(q=>q.id===id)));
 assert.ok(required.slice(2).every(id=>LOS1_C06_REVIEW_QUESTIONS.some(q=>q.id===id)));
 assert.ok(L034.scenes.some(s=>s.id==="checked"&&s.bookLinks?.some(l=>l.section==="understand")));
 assert.ok(L034.scenes.some(s=>s.id==="original"&&s.bookLinks?.some(l=>l.section==="text")));
 assert.ok(L034.scenes.some(s=>s.id==="revisit"&&s.bookLinks?.some(l=>l.section==="text")));
 const prose=L034.scenes.flatMap(s=>s.paragraphs).join(" ");
 assert.match(prose,/12 repliikk|12 alkuperäist/i);
 assert.match(prose,/kahdeksan|8 repliikki/i);
 assert.match(prose,/ääni|kuuntel/i);
});
test("L035 reuses all 20 real C06 chapter exam IDs and refuses incomplete test or self-assessment",()=>{
 assert.deepEqual(L035.chapterAssessment?.requiredTestIds,bank.map(item=>item.id));
 assert.equal(L035.chapterAssessment?.requireApplicationDraft,true);
 assert.equal(L035.chapterAssessment?.minSelfAssessmentLength,15);
 assert.deepEqual(losScore("06",correctAnswers),{correct:20,total:20});
 assert.deepEqual(teacherChapterAssessmentStatus(L035,assessment),{
  answered:20,expected:20,submitted:true,applicationDone:true,reflectionDone:true,ready:true
 });
 const links=new Set(L035.scenes.flatMap(s=>s.bookLinks??[]).map(l=>l.section));
 for(const section of ["text","understand","practice","apply","test"])assert.ok(links.has(section),section);
 const session=completed(L035);
 assert.equal(teacherCanFinish(session,L035,{},[],assessment),true);
 assert.equal(teacherCanFinish(session,L035,{},[],{...assessment,testSubmittedAt:null}),false);
 assert.equal(teacherCanFinish(session,L035,{},[],{...assessment,testAnswers:{...correctAnswers,[bank[0]!.id]:""}}),false);
 assert.equal(teacherCanFinish(session,L035,{},[],{...assessment,applicationDraft:""}),false);
 assert.equal(teacherCanFinish(session,L035,{},[],{...assessment,selfAssessment:""}),false);
});
test("all five C06 lessons keep pause/reload evidence, and Teacher never fabricates scored exercises",()=>{
 for(const lesson of lessons){
  const s=completed(lesson);
  const practiceAnswers=Object.fromEntries(lesson.requiredPracticeIds.map(id=>[id,"attempted"]));
  const sourceAnswers=Object.fromEntries((lesson.requiredCheckedIds??[]).map(id=>[id,"a"]));
  const answers={...practiceAnswers,...sourceAnswers};
  const checks=[...(lesson.requiredCheckedIds??[])];
  const chapter=lesson===L035?assessment:undefined;
  assert.equal(teacherCanFinish(s,lesson,answers,checks,chapter),true,lesson.id);
  if(lesson.requiredCheckedIds?.length)assert.equal(teacherCanFinish(s,lesson,answers,[],chapter),false);
  if(lesson.requiredPracticeIds.length)assert.equal(teacherCanFinish(s,lesson,{},checks,chapter),false);
  const paused=toggleTeacherPause(s,now);
  assert.equal(moveTeacherScene(paused,lesson,lesson.scenes[0]!.id,now),paused);
  assert.equal(teacherCanFinish(paused,lesson,answers,checks,chapter),false);
  assert.equal(validTeacherSession(JSON.parse(JSON.stringify(paused))),true);
  assert.ok(independentTeacherEvidence(s,lesson)>=2);
  const independent=lesson.scenes.find(x=>x.id==="independent")!;
  const helped=markTeacherHelp(emptyTeacherSession(lesson,now),independent.id,now);
  const q=independent.question!;
  const attempted=submitTeacherAnswer(helped,lesson,independent.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,now);
  assert.equal(independentTeacherEvidence(attempted,lesson),0);
 }
});
test("C06 archives actual 19/20 then 20/20 attempts without erasing earlier answers or Teacher lesson progress",()=>{
 const previous={...correctAnswers,[bank[0]!.id]:"incorrect on purpose"};
 const archived=losArchiveChapterExam({},"06",bank,previous,now);
 assert.deepEqual(losChapterExamHistory(archived,"06").map(x=>x.correct),[19]);
 const raw={
  version:1,note:"Omat muistiinpanot",applicationDraft:assessment.applicationDraft,bookmarked:false,
  practiceAnswers:{...archived,"C06-EX-11":"dreizehn"},practiceChecked:[],
  testAnswers:correctAnswers,testSubmittedAt:now,selfAssessment:assessment.selfAssessment,
  teacherSessions:{L035:completed(L035)},updatedAt:now,
 };
 const draft=parseLosDraft(JSON.stringify(raw));
 assert.equal(draft.practiceAnswers["C06-EX-11"],"dreizehn");
 assert.equal(draft.teacherSessions?.L035?.lessonId,"L035");
 assert.deepEqual(draft.testAnswers,correctAnswers);
 assert.equal(draft.testSubmittedAt,now);
 assert.equal(draft.applicationDraft,raw.applicationDraft);
 assert.equal(draft.selfAssessment,raw.selfAssessment);
 const after=losArchiveChapterExam(draft.practiceAnswers,"06",bank,draft.testAnswers,now);
 const history=losChapterExamHistory(after,"06");
 assert.deepEqual(history.map(x=>x.correct),[19,20]);
 assert.equal(history[0]!.answers.find(x=>x.id===bank[0]!.id)?.answer,"incorrect on purpose");
});
