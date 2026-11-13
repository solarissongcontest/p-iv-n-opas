import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L046_TEACHER as L046 } from "../src/features/los/teacher/lessonL046.ts";
import { LOS1_L047_TEACHER as L047 } from "../src/features/los/teacher/lessonL047.ts";
import { LOS1_L048_TEACHER as L048 } from "../src/features/los/teacher/lessonL048.ts";
import { LOS1_L049_TEACHER as L049 } from "../src/features/los/teacher/lessonL049.ts";
import { LOS1_L050_TEACHER as L050 } from "../src/features/los/teacher/lessonL050.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";
import { losExercisesFor, losScore } from "../src/features/los/exerciseBank.ts";
import { losArchiveChapterExam, losChapterExamHistory } from "../src/features/los/losWorkbookPersistence.ts";
import { parseLosDraft } from "../src/features/los/studyState.ts";
import { emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, confirmTeacherActivity,
 markTeacherHelp, independentTeacherEvidence, teacherWrongFeedback, teacherCanFinish,
 teacherChapterAssessmentStatus, validTeacherSession, toggleTeacherPause
} from "../src/features/los/teacher/engine.ts";

const lessons=[L046,L047,L048,L049,L050] as const;
const date="2026-11-13T18:00:00.000Z";
const bank=losExercisesFor("09");
const correct=Object.fromEntries(bank.map(q=>[q.id,q.correct]));
const dayChecks:Record<string,string>={
 "C09-TEXTB-Q01":"a","C09-TEXTB-Q02":"b",
 "C09-TEXTB-Q03":"c","C09-TEXTB-Q04":"a",
 "C09-SOURCE-Q01":"a","C09-SOURCE-Q02":"b","C09-SOURCE-Q03":"a"
};
const week=[
 "Montag – um drei Uhr","Dienstag – um vier Uhr",
 "Mittwoch – um fünf Uhr","Donnerstag – um zwei Uhr",
 "Freitag – um sechs Uhr","Samstag – um zehn Uhr","Sonntag – um elf Uhr",
 "Mia: Wann?","Max: Am Montag um drei Uhr.","Mia: Gut, bis Montag!"
].join("\n");
const exam={testAnswers:correct,testSubmittedAt:date,applicationDraft:week,
 selfAssessment:"Osaan am Montag ja um drei Uhr, mutta Donnerstag vaatii vielä kertausta."};
function completed(lesson:typeof L046){
 let session=emptyTeacherSession(lesson,date);
 for(const scene of lesson.scenes){
  session=moveTeacherScene(session,lesson,scene.id,date);
  if(scene.question){
   const q=scene.question;
   session=submitTeacherAnswer(session,lesson,scene.id,
    q.type==="choice"?q.correctOption!:q.accepted![0]!,date);
  }
 }
 for(const id of lesson.requiredActivityIds)session=confirmTeacherActivity(session,lesson,id,date);
 return session;
}
function evidence(lesson:typeof L046){
 const practice:Record<string,string>={};
 for(const id of lesson.requiredPracticeIds)practice[id]=correct[id]??"attempted";
 for(const id of lesson.requiredCheckedIds)practice[id]=dayChecks[id]??"a";
 return {practice,checked:[...lesson.requiredCheckedIds]};
}
test("C09 real M-WB-03 source has exactly seven original turns and honest two distinct times",()=>{
 const src=getLosOpenDialogue("09");
 assert.ok(src);
 assert.equal(src.sourceId,"M-WB-03");
 assert.equal(src.originalLines.length,7);
 assert.deepEqual(src.originalLines.map(line=>line.speaker),
  ["Franz","Greta","Franz","Greta","Franz","Greta","Franz"]);
 assert.match(src.originalLines[0]!.text,/Wie spät ist es/);
 assert.match(src.originalLines[1]!.text,/Viertel vor drei/);
 assert.match(src.originalLines[2]!.text,/um drei Fußball/);
 assert.equal(src.evidenceLineId,"u03");
 assert.deepEqual(src.questions.map(q=>q.id),[
  "C09-SOURCE-Q01","C09-SOURCE-Q02","C09-SOURCE-Q03","C09-SOURCE-Q04"
 ]);
 assert.deepEqual(src.questions.slice(0,3).map(q=>q.correctId),["a","b","a"]);
});
test("C09 current Text B is a single authentic M-COM-07 weekday list; it is not the unintegrated planned M-DIB-05",()=>{
 const b=LOS1_TEXT_B_SOURCES["09"];
 assert.equal(b.sourceId,"M-COM-07");
 assert.equal(b.transcriptIsExact,true);
 assert.equal(b.lines.length,1);
 assert.equal(b.lines[0]!.speaker,"Puhuja");
 assert.match(b.lines[0]!.text,/Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag/);
 assert.deepEqual(b.questions.map(q=>q.id),[
  "C09-TEXTB-Q01","C09-TEXTB-Q02","C09-TEXTB-Q03","C09-TEXTB-Q04"
 ]);
 assert.deepEqual(b.questions.map(q=>q.correctId),["a","b","c","a"]);
 const prose=[...L046.scenes,...L049.scenes,...L050.scenes].flatMap(s=>s.paragraphs).join(" ");
 assert.match(prose,/M-DIB-05/);
 assert.match(prose,/M-COM-07/);
 assert.match(prose,/ei.*kuuntel|kuuntel.*ei|äänentoistoa|äänen toimivuutta/i);
});
test("L046–L050 all register, validate and use only existing C09 exercises and real source sections",()=>{
 assert.equal(bank.length,14);
 for(const [i,lesson] of lessons.entries()){
  assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
  assert.equal(lesson.id,"L"+String(46+i).padStart(3,"0"));
  assert.equal(getLosTeacherLesson(lesson.id),lesson);
  assert.equal(lesson.chapterId,"09");
  assert.equal(lesson.bookId,1);
  assert.ok(lesson.scenes.length>=12);
  assert.equal(new Set(lesson.scenes.map(s=>s.id)).size,lesson.scenes.length);
  assert.ok(lesson.scenes.some(s=>s.kind==="board"),lesson.id);
  assert.ok(lesson.scenes.some(s=>s.kind==="explanation"),lesson.id);
  assert.ok(lesson.scenes.some(s=>s.kind==="summary"),lesson.id);
  assert.ok(lesson.scenes.some(s=>s.help?.length),lesson.id);
  assert.equal(lesson.requiredQuestionIds.length,5);
  assert.ok(lesson.requiredQuestionIds.every(id=>lesson.scenes.some(s=>s.id===id&&s.question)));
  assert.ok(lesson.requiredActivityIds.every(id=>lesson.scenes.some(s=>s.activityId===id)));
  assert.ok(lesson.requiredPracticeIds.every(id=>bank.some(q=>q.id===id)));
  assert.ok(lesson.scenes.flatMap(s=>s.bookLinks??[]).some(l=>l.chapterId==="09"));
 }
});
test("L046 introduces complete weekdays with two actual M-COM-07 prechecks",()=>{
 assert.deepEqual(L046.requiredPracticeIds,["C09-EX-01","C09-EX-02","C09-EX-03"]);
 assert.deepEqual(L046.requiredCheckedIds,["C09-TEXTB-Q01","C09-TEXTB-Q02"]);
 assert.ok(L046.scenes.some(s=>s.id==="source"&&s.bookLinks?.some(l=>l.section==="text-b")));
 assert.match(L046.scenes.flatMap(s=>s.paragraphs).join(" "),/viikonpäivät|viikonpäivien/);
 assert.match(teacherWrongFeedback(L046.scenes.find(s=>s.id==="independent")!,"dienstag"),/tiistai/);
});
test("L047 reads seven source turns and requires THREE genuine source questions without demanding quarter-hour production",()=>{
 assert.deepEqual(L047.requiredCheckedIds,["C09-SOURCE-Q01","C09-SOURCE-Q02","C09-SOURCE-Q03"]);
 assert.ok(L047.scenes.some(s=>s.id==="checked"&&s.bookLinks?.some(l=>l.section==="understand")));
 const text=L047.scenes.flatMap(s=>s.paragraphs).join(" ");
 assert.match(text,/Viertel vor drei/);
 assert.match(text,/14\.45/);
 assert.match(text,/15\.00/);
 assert.match(text,/ei tarvitse|vain tunnistam/);
 const session=completed(L047);
 const {practice,checked}=evidence(L047);
 assert.equal(teacherCanFinish(session,L047,practice,checked),true);
 assert.equal(teacherCanFinish(session,L047,{...practice,[checked[0]!]:"wrong"},checked),false);
 assert.equal(teacherCanFinish(session,L047,{...practice,[checked[0]!]:"c"},checked),true,
  "A checked but wrong A/B/C option is an honest attempted source task, not automatic mastery.");
});
test("L048 teaches am/um, full hours and exactly five original bank exercises",()=>{
 assert.deepEqual(L048.requiredPracticeIds,[
  "C09-EX-08","C09-EX-09","C09-EX-10","C09-EX-13","C09-EX-14"
 ]);
 const source=L048.scenes.flatMap(s=>s.paragraphs).join(" ");
 assert.match(source,/am Montag/);
 assert.match(source,/um drei Uhr/);
 assert.match(source,/morgen/);
 assert.match(source,/Viertel/);
 assert.ok(L048.scenes.some(s=>s.id==="practice"&&s.bookLinks?.some(l=>l.section==="practice")));
});
test("L049 requires TWO independent outputs in the same real 150-character C09 application and two final weekday checks",()=>{
 assert.equal(L049.applicationDraftMinLength,150);
 assert.deepEqual(L049.requiredCheckedIds,["C09-TEXTB-Q03","C09-TEXTB-Q04"]);
 assert.deepEqual(L049.requiredPracticeIds,["C09-EX-04","C09-EX-05","C09-EX-06"]);
 assert.ok(L049.scenes.some(s=>s.id==="writing"&&s.bookLinks?.some(l=>l.section==="apply")));
 assert.ok(week.length>=150);
 const session=completed(L049),{practice,checked}=evidence(L049);
 assert.equal(teacherCanFinish(session,L049,practice,checked),false);
 assert.equal(teacherCanFinish(session,L049,practice,checked,{...exam,applicationDraft:"Montag"}),false);
 assert.equal(teacherCanFinish(session,L049,practice,checked,exam),true);
 assert.equal(teacherCanFinish(session,L049,{...practice,"C09-TEXTB-Q04":"invalid"},checked,exam),false);
 assert.deepEqual(validateTeacherLesson({...L049,applicationDraftMinLength:0}).map(i=>i.location),["applicationDraftMinLength"]);
});
test("L050 uses only existing 14-item C09 test and independent >=15-character reflection",()=>{
 assert.deepEqual(L050.chapterAssessment?.requiredTestIds,bank.map(q=>q.id));
 assert.equal(L050.chapterAssessment?.requireApplicationDraft,false);
 assert.equal(L050.chapterAssessment?.minSelfAssessmentLength,15);
 assert.deepEqual(losScore("09",correct),{correct:14,total:14});
 const noWriting={...exam,applicationDraft:""};
 assert.deepEqual(teacherChapterAssessmentStatus(L050,noWriting),{
  answered:14,expected:14,submitted:true,applicationDone:true,reflectionDone:true,ready:true
 });
 const session=completed(L050);
 assert.equal(teacherCanFinish(session,L050,{},[],noWriting),true);
 assert.equal(teacherCanFinish(session,L050,{},[],{...noWriting,testSubmittedAt:null}),false);
 assert.equal(teacherCanFinish(session,L050,{},[],{...noWriting,selfAssessment:""}),false);
 assert.equal(teacherCanFinish(session,L050,{},[],{...noWriting,testAnswers:{...correct,[bank[0]!.id]:""}}),false);
});
test("C09 all five Teacher states survive pause, reload and contextual help without fake independent mastery",()=>{
 for(const lesson of lessons){
  const session=completed(lesson),{practice,checked}=evidence(lesson);
  const source=lesson===L049||lesson===L050?exam:undefined;
  assert.equal(teacherCanFinish(session,lesson,practice,checked,source),true,lesson.id);
  if(lesson.requiredPracticeIds.length)assert.equal(teacherCanFinish(session,lesson,{},checked,source),false);
  if(checked.length)assert.equal(teacherCanFinish(session,lesson,practice,[],source),false);
  const paused=toggleTeacherPause(session,date);
  assert.equal(moveTeacherScene(paused,lesson,lesson.scenes[0]!.id,date),paused);
  assert.equal(teacherCanFinish(paused,lesson,practice,checked,source),false);
  assert.equal(validTeacherSession(JSON.parse(JSON.stringify(paused))),true);
  assert.ok(independentTeacherEvidence(session,lesson)>=2);
  const alone=lesson.scenes.find(s=>s.id==="independent")!;
  const helped=markTeacherHelp(emptyTeacherSession(lesson,date),alone.id,date);
  const ans=alone.question!;
  const result=submitTeacherAnswer(helped,lesson,alone.id,ans.type==="choice"?ans.correctOption!:ans.accepted![0]!,date);
  assert.equal(independentTeacherEvidence(result,lesson),0);
 }
});
test("C09 real 13/14 attempt remains archived before 14/14 retake while Teacher and application draft persist",()=>{
 const old={...correct,[bank[0]!.id]:"wrong original response"};
 const saved=losArchiveChapterExam({},"09",bank,old,date);
 assert.deepEqual(losChapterExamHistory(saved,"09").map(x=>x.correct),[13]);
 const raw={
  version:1,note:"",applicationDraft:week,bookmarked:false,
  practiceAnswers:saved,practiceChecked:[],
  testAnswers:correct,testSubmittedAt:date,selfAssessment:exam.selfAssessment,
  teacherSessions:{L050:completed(L050)},updatedAt:date
 };
 const loaded=parseLosDraft(JSON.stringify(raw));
 assert.deepEqual(loaded.testAnswers,correct);
 assert.equal(loaded.teacherSessions?.L050?.lessonId,"L050");
 assert.equal(loaded.applicationDraft,week);
 const renewed=losArchiveChapterExam(loaded.practiceAnswers,"09",bank,loaded.testAnswers,date);
 const history=losChapterExamHistory(renewed,"09");
 assert.deepEqual(history.map(x=>x.correct),[13,14]);
 assert.equal(history[0]!.answers.find(a=>a.id===bank[0]!.id)?.answer,"wrong original response");
});
