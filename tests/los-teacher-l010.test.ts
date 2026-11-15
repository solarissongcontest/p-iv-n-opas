import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L010_TEACHER } from "../src/features/los/teacher/lessonL010.ts";
import { LOS1_M_COM_02_LINES, LOS1_M_COM_02_QUESTIONS } from "../src/features/los/content/los1MCom02.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, confirmTeacherActivity, teacherCanFinish, independentTeacherEvidence } from "../src/features/los/teacher/engine.ts";
const lesson=LOS1_L010_TEACHER, at="2026-11-13T10:30:00.000Z";
test("L010 contains the real four-turn source, exactly two checked Text B questions and no parallel task engine",()=>{
 assert.equal(LOS1_M_COM_02_LINES.length,4);
 assert.deepEqual(lesson.requiredCheckedIds,LOS1_M_COM_02_QUESTIONS.slice(0,2).map(x=>x.id));
 assert.deepEqual(validateTeacherLesson(lesson),[]);
 assert.equal(lesson.chapterId,"02");
 assert.equal(lesson.scenes.length,13);
 assert.equal(lesson.requiredPracticeIds.length,0);
 assert.ok(lesson.scenes.some(s=>s.bookLinks?.some(x=>x.section==="text-b"&&x.chapterId==="02")));
 assert.ok(lesson.scenes.some(s=>s.bookLinks?.some(x=>x.section==="text"&&x.chapterId==="02")));
});
test("L010 cannot finish until its two actual textbook questions are checked",()=>{
 let s=emptyTeacherSession(lesson,at);
 for(const scene of lesson.scenes){
   s=moveTeacherScene(s,lesson,scene.id,at);
   if(scene.question){const q=scene.question;s=submitTeacherAnswer(s,lesson,scene.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,at);}
 }
 for(const id of lesson.requiredActivityIds)s=confirmTeacherActivity(s,lesson,id,at);
 const answers={"C02-MCOM02-Q01":"a","C02-MCOM02-Q02":"b"};
 assert.equal(teacherCanFinish(s,lesson,answers,[]),false);
 assert.equal(teacherCanFinish(s,lesson,answers,["C02-MCOM02-Q01"]),false);
 assert.equal(teacherCanFinish(s,lesson,answers,lesson.requiredCheckedIds),true);
 assert.equal(independentTeacherEvidence(s,lesson),3);
});
test("L010 never mislabels reading the fallback as independently demonstrated listening",()=>{
 const all=lesson.scenes.flatMap(s=>s.paragraphs).join(" ");
 assert.match(all,/tekstivastine/);
 assert.match(all,/kuuntel/);
 assert.match(all,/ei merkitse tekstin lukemista/);
 assert.ok(lesson.scenes.every(s=>!s.question || s.question.skillId!=="L1-MED-01"));
 assert.ok(lesson.scenes.some(s=>s.paragraphs.join(" ").includes("C03:ssa")));
});
test("L010 answer keys match the original Thomas/Takashi/Peter dialogue",()=>{
 assert.equal(LOS1_M_COM_02_LINES[0]?.speaker,"Thomas");
 assert.equal(LOS1_M_COM_02_LINES[1]?.speaker,"Takashi");
 assert.ok(LOS1_M_COM_02_LINES[2]?.text.includes("Das ist Peter"));
 assert.equal(LOS1_M_COM_02_QUESTIONS[0]?.correctId,"a");
 assert.equal(LOS1_M_COM_02_QUESTIONS[1]?.correctId,"b");
});
