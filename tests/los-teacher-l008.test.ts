import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L008_TEACHER } from "../src/features/los/teacher/lessonL008.ts";
import { LOS1_C02_LINES, LOS1_C02_QUESTIONS } from "../src/features/los/content/los1C02.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { emptyTeacherSession, moveTeacherScene, confirmTeacherActivity, submitTeacherAnswer, teacherCanFinish, independentTeacherEvidence } from "../src/features/los/teacher/engine.ts";
const lesson=LOS1_L008_TEACHER;const at="2026-11-13T09:00:00.000Z";
const ids=LOS1_C02_QUESTIONS.map(q=>q.id);
test("L008 uses exactly the four real C02 source IDs and a full original-text reader reference",()=>{
 assert.deepEqual(validateTeacherLesson(lesson),[]);
 assert.equal(LOS1_C02_LINES.length,6);
 assert.deepEqual(lesson.requiredCheckedIds,ids);
 assert.ok(lesson.scenes.some(s=>s.bookLinks?.some(link=>link.chapterId==="02"&&link.section==="text")));
 assert.ok(lesson.scenes.some(s=>s.bookLinks?.some(link=>link.chapterId==="02"&&link.section==="understand")));
 assert.ok(lesson.scenes.flatMap(s=>s.paragraphs).join(" ").includes("Kennst du den Lehrer?"));
 assert.equal(lesson.scenes.length,12);
});
test("L008 demands checked real book answers rather than only visited/selected answers",()=>{
 let s=emptyTeacherSession(lesson,at);
 for(const scene of lesson.scenes){
  s=moveTeacherScene(s,lesson,scene.id,at);
  if(scene.question){const q=scene.question;s=submitTeacherAnswer(s,lesson,scene.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,at);}
 }
 s=confirmTeacherActivity(s,lesson,"source-read",at);
 const answers=Object.fromEntries(ids.map(id=>[id,"a"]));
 assert.equal(teacherCanFinish(s,lesson,answers,[]),false);
 assert.equal(teacherCanFinish(s,lesson,answers,ids.slice(0,3)),false);
 assert.equal(teacherCanFinish(s,lesson,answers,ids),true);
 assert.equal(independentTeacherEvidence(s,lesson),3);
});
test("L008 does not turn advanced source forms into production grammar",()=>{
 const prose=lesson.scenes.flatMap(s=>s.paragraphs).join(" ");
 assert.match(prose,/er heißt/);
 assert.match(prose,/tunnistettava/);
 const questions=lesson.scenes.filter(s=>s.question);
 for(const scene of questions)assert.notEqual(scene.question?.prompt,"Taivuta er heißt kaikissa persoonissa.");
});
