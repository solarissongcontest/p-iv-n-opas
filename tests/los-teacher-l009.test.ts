import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L009_TEACHER } from "../src/features/los/teacher/lessonL009.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { emptyTeacherSession, submitTeacherAnswer, markTeacherHelp, independentTeacherEvidence, evaluateTeacherAnswer } from "../src/features/los/teacher/engine.ts";
const lesson=LOS1_L009_TEACHER;const at="2026-11-13T09:00:00.000Z";
test("L009 teaches four correct active forms and does not demand six-person paradigms",()=>{
 assert.deepEqual(validateTeacherLesson(lesson),[]);
 assert.equal(lesson.id,"L009");assert.equal(lesson.chapterId,"02");
 const prose=lesson.scenes.flatMap(s=>s.paragraphs).join(" ");
 for(const form of ["ich heiße","du heißt","ich bin","du bist"])assert.ok(prose.includes(form),form);
 assert.match(prose,/ei tarvitse vielä osata.*koko kuuden persoonan/);
 const board=lesson.scenes.find(s=>s.id==="board")!.board??[];
 for(const phrase of ["Ich heiße Mia.","Du heißt Mia.","Ich bin Mia.","Du bist Mia."])assert.ok(board.some(b=>b.german===phrase),phrase);
 assert.equal(lesson.scenes.length,12);
});
test("L009 shares existing four exercise IDs without cloning their evaluation",()=>{
 const items=losExercisesFor("02");
 assert.deepEqual(lesson.requiredPracticeIds,["C02-EX-03","C02-EX-04","C02-EX-05","C02-EX-06"]);
 for(const id of lesson.requiredPracticeIds)assert.ok(items.some(x=>x.id===id));
 const chapterLinks=lesson.scenes.flatMap(s=>s.bookLinks??[]);
 assert.ok(chapterLinks.some(x=>x.section==="grammar"));
 assert.ok(chapterLinks.some(x=>x.section==="practice"));
 assert.ok(chapterLinks.every(x=>x.chapterId==="02"));
});
test("L009 does not count hinted or non-matching verb forms as independent evidence",()=>{
 let s=emptyTeacherSession(lesson,at);
 const q=lesson.scenes.find(x=>x.id==="independent")!.question!;
 assert.equal(evaluateTeacherAnswer(q,"heißt"),true);
 assert.equal(evaluateTeacherAnswer(q,"heiße"),false);
 s=markTeacherHelp(s,"independent",at);
 s=submitTeacherAnswer(s,lesson,"independent","heißt",at);
 assert.equal(independentTeacherEvidence(s,lesson),0);
 const app=lesson.scenes.find(x=>x.id==="application")!.question!;
 assert.equal(evaluateTeacherAnswer(app,"Ich bin Mia."),true);
 assert.equal(evaluateTeacherAnswer(app,"Ich heiße Mia."),false);
});
