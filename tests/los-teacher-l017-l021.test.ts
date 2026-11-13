import test from "node:test";
import assert from "node:assert/strict";
import {LOS1_L017_TEACHER} from "../src/features/los/teacher/lessonL017.ts";
import {LOS1_L018_TEACHER} from "../src/features/los/teacher/lessonL018.ts";
import {LOS1_L019_TEACHER} from "../src/features/los/teacher/lessonL019.ts";
import {LOS1_L020_TEACHER} from "../src/features/los/teacher/lessonL020.ts";
import {LOS1_L021_TEACHER} from "../src/features/los/teacher/lessonL021.ts";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonL004.ts";
import {validateTeacherLesson} from "../src/features/los/teacher/validateContent.ts";
import {losExercisesFor} from "../src/features/los/exerciseBank.ts";
import {getLosOpenDialogue} from "../src/features/los/content/los1OpenDialogues.ts";
import {LOS1_TEXT_B_SOURCES} from "../src/features/los/content/los1TextBAdditional.ts";
import {
 emptyTeacherSession,moveTeacherScene,submitTeacherAnswer,markTeacherHelp,
 independentTeacherEvidence,confirmTeacherActivity,teacherCanFinish,
 teacherChapterAssessmentStatus,finishTeacherSession,toggleTeacherPause,
 parseTeacherSessions, type TeacherLesson, type TeacherSession,
} from "../src/features/los/teacher/engine.ts";

const lessons=[LOS1_L017_TEACHER,LOS1_L018_TEACHER,LOS1_L019_TEACHER,LOS1_L020_TEACHER,LOS1_L021_TEACHER];
const date="2026-11-13T17:00:00.000Z";
const allExercises=losExercisesFor("04");
const ids=new Set(allExercises.map(x=>x.id));
const complete=(lesson:TeacherLesson):TeacherSession=>{
 let s=emptyTeacherSession(lesson,date);
 for(const scene of lesson.scenes){
   s=moveTeacherScene(s,lesson,scene.id,date);
   const q=scene.question;
   if(q)s=submitTeacherAnswer(s,lesson,scene.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,date);
   if(scene.activityId)s=confirmTeacherActivity(s,lesson,scene.activityId,date);
 }
 return s;
};
const answers=(lesson:TeacherLesson)=>Object.fromEntries(
 [...lesson.requiredPracticeIds,...(lesson.requiredCheckedIds??[])].map(id=>[id,"a"]));

test("C04 is five registered, valid, distinct Teacher lessons using canonical IDs",()=>{
 assert.deepEqual(lessons.map(l=>l.id),["L017","L018","L019","L020","L021"]);
 for(const l of lessons){
   assert.equal(getLosTeacherLesson(l.id),l,l.id);
   assert.equal(l.bookId,1); assert.equal(l.chapterId,"04");
   assert.deepEqual(validateTeacherLesson(l),[],l.id);
   assert.ok(l.scenes.length>=10,l.id);
   assert.ok(l.scenes.some(s=>s.kind==="board"),l.id);
   assert.ok(l.scenes.some(s=>s.kind==="explanation"),l.id);
   assert.ok(l.scenes.some(s=>s.kind==="summary"),l.id);
   assert.ok(l.requiredQuestionIds.length>=5,l.id);
   assert.ok(l.requiredPracticeIds.every(id=>ids.has(id)),l.id);
   assert.ok(l.scenes.flatMap(s=>s.bookLinks??[]).every(link=>link.chapterId==="04"),l.id);
 }
});

test("L017 teaches contextual du/Sie without a strict age rule and uses four actual exercises",()=>{
 const l=LOS1_L017_TEACHER;
 assert.deepEqual(l.requiredPracticeIds,["C04-EX-01","C04-EX-02","C04-EX-03","C04-EX-04"]);
 const p=l.scenes.flatMap(s=>s.paragraphs).join(" ");
 assert.match(p,/iästä/); assert.match(p,/suhteesta|suhteen|suhde/);
 assert.match(p,/Sie/);
 assert.ok(l.scenes.some(s=>s.board?.some(x=>x.german==="Wie heißen Sie?")));
});

test("L018 uses eight authentic M-WB-06 turns, not author-invented substitute",()=>{
 const s=getLosOpenDialogue("04")!;
 assert.equal(s.sourceId,"M-WB-06"); assert.equal(s.revision,"3823654");
 assert.equal(s.originalLines.length,8);
 assert.deepEqual(LOS1_L018_TEACHER.scenes.find(x=>x.id==="original")!.board!.map(x=>x.german),
  s.originalLines.map(x=>x.text));
 assert.deepEqual(LOS1_L018_TEACHER.scenes.find(x=>x.id==="original")!.board!.map(x=>x.meaning),
  s.originalLines.map(x=>x.meaning));
 assert.deepEqual(LOS1_L018_TEACHER.requiredCheckedIds,
  ["C04-SOURCE-Q01","C04-SOURCE-Q02","C04-SOURCE-Q03"]);
 assert.ok(LOS1_L018_TEACHER.requiredCheckedIds!.every(id=>s.questions.some(q=>q.id===id)));
 const c=complete(LOS1_L018_TEACHER),a=answers(LOS1_L018_TEACHER);
 assert.equal(teacherCanFinish(c,LOS1_L018_TEACHER,a,[]),false);
 assert.equal(teacherCanFinish(c,LOS1_L018_TEACHER,a,LOS1_L018_TEACHER.requiredCheckedIds!),true);
});

test("L019 distinguishes verbs, punctuation and Sie capitalization without false free-text evidence",()=>{
 const l=LOS1_L019_TEACHER;
 assert.deepEqual(l.requiredPracticeIds,["C04-EX-05","C04-EX-06","C04-EX-07","C04-EX-08","C04-EX-12"]);
 assert.ok(l.scenes.find(s=>s.id==="capital-check")!.question!.options!.some(o=>o.label==="Wie heißen Sie?"));
 assert.ok(l.scenes.find(s=>s.id==="difference")!.paragraphs.some(p=>p.includes("ei tällä hetkellä arvioi")));
 assert.ok(l.scenes.find(s=>s.id==="independent")!.question!.accepted!.includes("Wie heißen Sie?"));
 assert.ok(l.scenes.find(s=>s.id==="application")!.question!.accepted!.includes("Woher kommen Sie?"));
 const board=l.scenes.find(s=>s.id==="construction")!.board!.map(x=>x.german);
 for(const text of ["Wie heißt du?","Wie heißen Sie?","Woher kommst du?","Woher kommen Sie?"])
   assert.ok(board.includes(text));
});

test("L020 uses ALL twenty actual M-COM-03 greetings, explicitly no invented dialogue or listening score",()=>{
 const source=LOS1_TEXT_B_SOURCES["04"];
 assert.equal(source.sourceId,"M-COM-03");assert.equal(source.lines.length,20);
 assert.equal(source.transcriptIsExact,true);
 assert.deepEqual(LOS1_L020_TEACHER.scenes.find(s=>s.id==="original")!.board!.map(x=>x.german),
 source.lines.map(x=>x.text));
 assert.deepEqual(LOS1_L020_TEACHER.requiredCheckedIds,
 ["C04-TEXTB-Q01","C04-TEXTB-Q02","C04-TEXTB-Q03","C04-TEXTB-Q04"]);
 assert.deepEqual(LOS1_L020_TEACHER.requiredPracticeIds,
 ["C04-EX-09","C04-EX-10","C04-EX-11"]);
 const prose=LOS1_L020_TEACHER.scenes.flatMap(s=>s.paragraphs).join(" ");
 assert.match(prose,/ei.*dialogi|ei keskustelua/i);
 assert.match(prose,/kuullun ymmärtämis|kuuntelutai/i);
 assert.match(prose,/M-DIB-07/);
});

test("L021 requires all 12 real C04 exam answers, actual submission, application and reflection",()=>{
 const l=LOS1_L021_TEACHER;
 assert.deepEqual(l.chapterAssessment!.requiredTestIds,allExercises.map(x=>x.id));
 assert.equal(allExercises.length,12);
 const good={testAnswers:Object.fromEntries(allExercises.map(x=>[x.id,"a"])),
 testSubmittedAt:date,applicationDraft:"Guten Tag! Wie heißen Sie?",
 selfAssessment:"Muistan Sie-muodon, mutta haluan kerrata sitä vielä."};
 assert.equal(teacherChapterAssessmentStatus(l,good).ready,true);
 assert.equal(teacherChapterAssessmentStatus(l,{...good,testSubmittedAt:null}).ready,false);
 assert.equal(teacherChapterAssessmentStatus(l,{...good,applicationDraft:""}).ready,false);
 assert.equal(teacherChapterAssessmentStatus(l,{...good,selfAssessment:""}).ready,false);
 let s=complete(l);
 assert.equal(teacherCanFinish(s,l,{},[],good),true);
 assert.equal(teacherCanFinish(s,l,{},[],{...good,testSubmittedAt:null}),false);
 s=finishTeacherSession(s,l,{},date,[],good);
 assert.equal(s.completedAt,date);
});

test("C04 teacher pause, reload and helped answers do not fabricate independent mastery",()=>{
 const l=LOS1_L017_TEACHER,s=complete(l);
 assert.equal(teacherCanFinish(s,l,answers(l)),true);
 assert.equal(independentTeacherEvidence(s,l),3);
 const paused=toggleTeacherPause(s,date);
 assert.equal(paused.paused,true);
 assert.equal(teacherCanFinish(paused,l,answers(l)),false);
 assert.equal(parseTeacherSessions({L017:paused}).L017.paused,true);
 let helped=emptyTeacherSession(l,date);
 helped=markTeacherHelp(helped,"independent",date);
 const option=l.scenes.find(x=>x.id==="independent")!.question!.correctOption!;
 helped=submitTeacherAnswer(helped,l,"independent",option,date);
 assert.equal(independentTeacherEvidence(helped,l),0);
});
