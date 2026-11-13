import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L017_TEACHER } from "../src/features/los/teacher/lessonL017.ts";
import { LOS1_L018_TEACHER } from "../src/features/los/teacher/lessonL018.ts";
import { LOS1_L019_TEACHER } from "../src/features/los/teacher/lessonL019.ts";
import { LOS1_L020_TEACHER } from "../src/features/los/teacher/lessonL020.ts";
import { LOS1_L021_TEACHER } from "../src/features/los/teacher/lessonL021.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { LOS1_TEXT_B_SOURCES } from "../src/features/los/content/los1TextBAdditional.ts";

const lessons=[LOS1_L017_TEACHER,LOS1_L018_TEACHER,LOS1_L019_TEACHER,LOS1_L020_TEACHER,LOS1_L021_TEACHER];
const allC04Tasks=new Set(losExercisesFor("04").map(item=>item.id));

test("L017-L021 use exactly five validated C04 manuscripts in the existing Teacher registry",()=>{
 assert.deepEqual(lessons.map(l=>l.id),["L017","L018","L019","L020","L021"]);
 for (const lesson of lessons){
   assert.equal(getLosTeacherLesson(lesson.id),lesson);
   assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
   assert.equal(lesson.bookId,1);
   assert.equal(lesson.chapterId,"04");
   assert.equal(lesson.estimatedMinutes,30);
   assert.ok(lesson.scenes.some(s=>s.kind==="explanation"),lesson.id+" must teach directly");
   assert.ok(lesson.scenes.some(s=>s.kind==="board"),lesson.id+" must model");
   assert.ok(lesson.scenes.some(s=>s.question?.evidenceRole==="exit"),lesson.id+" must independently check");
   assert.ok(lesson.scenes.some(s=>s.kind==="summary"));
   for (const id of lesson.requiredPracticeIds){
     assert.ok(allC04Tasks.has(id),lesson.id+" unknown exercise "+id);
   }
   for (const link of lesson.scenes.flatMap(s=>s.bookLinks??[]))assert.equal(link.chapterId,"04");
 }
 // Do not activate the unrelated C03 previews or change their registry entries.
 assert.equal(getLosTeacherLesson("L013"),undefined);
 assert.equal(getLosTeacherLesson("L016"),undefined);
 assert.equal(getLosTeacherLesson("L022"),undefined);
});

test("L017 uses context and relationship, not a blanket age rule",()=>{
 const script=LOS1_L017_TEACHER.scenes.flatMap(s=>s.paragraphs).join(" ");
 for(const word of ["ikä","ystävä","virallis","sinuttelusta","Sie"]){
   assert.ok(script.toLowerCase().includes(word.toLowerCase()),word);
 }
 assert.deepEqual(LOS1_L017_TEACHER.requiredPracticeIds,
   ["C04-EX-01","C04-EX-02","C04-EX-03","C04-EX-04"]);
 const exit=LOS1_L017_TEACHER.scenes.find(s=>s.id==="exit")!.question!;
 assert.equal(exit.type,"choice","the engine normalizes text case, so capitalization must use choice");
 assert.ok(exit.options?.some(o=>o.label==="sie"&&o.wrongFeedback));
 assert.ok(exit.options?.some(o=>o.label==="Sie"&&o.id===exit.correctOption));
});

test("L018 is grounded in eight genuine M-WB-06 business dialogue turns, not C07 telephone source",()=>{
 const c04=getLosOpenDialogue("04");
 assert.equal(c04?.sourceId,"M-WB-06");
 assert.equal(c04?.originalLines.length,8);
 assert.deepEqual(c04?.originalLines.map(l=>l.speaker).filter((v,i,a)=>a.indexOf(v)===i),
   ["Herr Schmidt","Herr Standish"]);
 assert.equal(getLosOpenDialogue("07")?.sourceId,"M-WB-02");
 const lesson=LOS1_L018_TEACHER;
 assert.ok(lesson.scenes.some(s=>s.bookLinks?.some(l=>l.section==="text")));
 assert.equal(lesson.scenes.find(s=>s.id==="board")?.board?.length,8);
 assert.ok(lesson.scenes.some(s=>s.activityId==="whole-text-read"));
 assert.deepEqual(lesson.requiredCheckedIds,["C04-SOURCE-Q01","C04-SOURCE-Q02","C04-SOURCE-Q03"]);
 const sourceIds=new Set(c04!.questions.map(q=>q.id));
 assert.ok(lesson.requiredCheckedIds!.every(id=>sourceIds.has(id)));
 const independent=lesson.scenes.filter(s=>["independent","application","exit"].includes(s.question?.evidenceRole??""));
 assert.equal(independent.length,3);
 assert.ok(independent.every(s=>s.question?.skillId==="L1-READ-01"));
});

test("L019 models two verbs, corrects mistakes and shares four original grammar tasks",()=>{
 const lesson=LOS1_L019_TEACHER;
 assert.deepEqual(lesson.requiredPracticeIds,["C04-EX-05","C04-EX-06","C04-EX-07","C04-EX-08"]);
 const board=lesson.scenes.find(s=>s.id==="board")?.board ?? [];
 for (const phrase of ["du heißt","Sie heißen","du kommst","Sie kommen","Wie heißt du?","Wie heißen Sie?","Woher kommst du?","Woher kommen Sie?"])
   assert.ok(board.some(step=>step.german===phrase),phrase);
 for(const id of ["correct-name","correct-origin"]){
   const scene=lesson.scenes.find(s=>s.id===id);
   assert.equal(scene?.question?.type,"text");
   assert.ok(scene?.question?.accepted?.[0]?.endsWith("?"));
 }
});

test("L020 teaches the genuine full C04 Text B list through a readable text fallback",()=>{
 const list=LOS1_TEXT_B_SOURCES["04"];
 assert.equal(list.sourceId,"M-COM-03");
 assert.equal(list.lines.length,20);
 const lesson=LOS1_L020_TEACHER;
 assert.ok(lesson.scenes.some(s=>s.bookLinks?.some(l=>l.section==="text-b")));
 const read=lesson.scenes.find(s=>s.id==="read")!;
 assert.match(read.paragraphs.join(" "),/20/);
 assert.match(read.paragraphs.join(" "),/ilman äänentoistoa|Tekstivaihtoehto/);
 assert.deepEqual(lesson.requiredCheckedIds,["C04-TEXTB-Q01","C04-TEXTB-Q02"]);
 assert.ok(lesson.requiredCheckedIds!.every(id=>list.questions.some(q=>q.id===id)));
 for(const id of ["independent","application"]){
   assert.equal(lesson.scenes.find(s=>s.id===id)?.question?.evidenceRole,id);
 }
});

test("L021 reuses the complete existing C04 exam, without creating a new answer bank",()=>{
 const lesson=LOS1_L021_TEACHER;
 assert.deepEqual(lesson.chapterAssessment?.requiredTestIds,losExercisesFor("04").map(x=>x.id));
 assert.equal(lesson.chapterAssessment?.requiredTestIds.length,12);
 assert.equal(lesson.chapterAssessment?.requireApplicationDraft,true);
 assert.ok(lesson.chapterAssessment!.minSelfAssessmentLength>=15);
 assert.deepEqual(lesson.requiredPracticeIds,[]);
 const links=lesson.scenes.flatMap(s=>s.bookLinks??[]);
 assert.ok(links.some(x=>x.section==="test"));
 assert.ok(links.some(x=>x.section==="apply"));
 assert.ok(lesson.scenes.flatMap(s=>s.paragraphs).join(" ").includes("vanhat"));
});
