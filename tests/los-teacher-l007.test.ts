import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L007_TEACHER } from "../src/features/los/teacher/lessonL007.ts";
import { LOS1_C02_LINES, LOS1_C02_QUESTIONS } from "../src/features/los/content/los1C02.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { emptyTeacherSession, markTeacherHelp, submitTeacherAnswer, independentTeacherEvidence } from "../src/features/los/teacher/engine.ts";
const lesson=LOS1_L007_TEACHER;
const at="2026-11-13T09:00:00.000Z";

test("L007 teaches proper C02 beginner naming phrases before testing",()=>{
 assert.deepEqual(validateTeacherLesson(lesson),[]);
 assert.equal(lesson.chapterId,"02");
 assert.equal(lesson.bookId,1);
 assert.equal(lesson.scenes.length,12);
 const prose=lesson.scenes.flatMap(scene=>scene.paragraphs).join(" ");
 assert.match(prose,/Ich heiße Mia/);
 assert.match(prose,/Wie heißt du/);
 assert.match(prose,/Ich bin Mia/);
 assert.match(prose,/molemmat.*oikein|Molemmat sopivat/);
 const model=lesson.scenes.find(scene=>scene.id==="board")?.board??[];
 assert.ok(model.some(step=>step.german==="Wie heißt du?"));
 assert.ok(model.some(step=>step.german==="Ich heiße Mia."));
 assert.ok(lesson.scenes.find(s=>s.id==="guided")!.question);
 assert.ok(lesson.scenes.find(s=>s.id==="exit")!.question);
});
test("L007 points to real six-line source and existing C02 practice IDs",()=>{
 assert.equal(LOS1_C02_LINES.length,6);
 assert.ok(LOS1_C02_LINES[0]?.text.includes("Wie heißt du?"));
 assert.ok(LOS1_C02_LINES[1]?.text.includes("Ich heiße Greta."));
 assert.equal(LOS1_C02_QUESTIONS.length,4);
 assert.deepEqual(lesson.requiredPracticeIds,["C02-EX-01","C02-EX-02"]);
 const chapters=lesson.scenes.flatMap(scene=>scene.bookLinks??[]);
 assert.ok(chapters.length>=4);
 assert.ok(chapters.every(link=>link.chapterId==="02"));
 for(const section of ["text","vocabulary","grammar","practice"]){
  assert.ok(chapters.some(link=>link.section===section),section);
 }
});
test("L007 independent evidence only counts correct unaided production and application",()=>{
 let session=emptyTeacherSession(lesson,at);
 const independent=lesson.scenes.find(x=>x.id==="independent")!.question!;
 assert.deepEqual(independent.accepted,["Ich heiße Mia."]);
 session=submitTeacherAnswer(session,lesson,"independent","Ich heiße Mia!",at);
 assert.equal(independentTeacherEvidence(session,lesson),1);
 const aided=markTeacherHelp(emptyTeacherSession(lesson,at),"independent",at);
 const correctWithHint=submitTeacherAnswer(aided,lesson,"independent","Ich heiße Mia.",at);
 assert.equal(independentTeacherEvidence(correctWithHint,lesson),0);
 const wrong=submitTeacherAnswer(emptyTeacherSession(lesson,at),lesson,"independent","Ich bin Mia.",at);
 assert.equal(wrong.attempts[0]?.correct,false);
});
