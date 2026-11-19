import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L012_TEACHER } from "../src/features/los/teacher/lessonL012.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { emptyTeacherSession, moveTeacherScene, submitTeacherAnswer, confirmTeacherActivity, teacherCanFinish, independentTeacherEvidence, markTeacherHelp } from "../src/features/los/teacher/engine.ts";
const lesson=LOS1_L012_TEACHER,at="2026-11-13T10:30:00.000Z";
test("L012 teaches first country vocabulary without premature grammar production",()=>{
 assert.deepEqual(validateTeacherLesson(lesson),[]);
 assert.equal(lesson.bookId,1);
 assert.equal(lesson.chapterId,"03");
 assert.equal(lesson.scenes.length,12);
 const prose=lesson.scenes.flatMap(s=>s.paragraphs).join(" ");
 for(const word of ["Finnland","Deutschland","Österreich","die Schweiz"])assert.ok(prose.includes(word),word);
 assert.match(prose,/datiivia/);
 const questions=lesson.scenes.filter(s=>s.question).map(s=>s.question!);
 assert.ok(questions.every(q=>!q.prompt.includes("Taivuta aus der Schweiz")));
 assert.deepEqual(lesson.requiredPracticeIds,["C03-EX-03","C03-EX-04","C03-EX-05"]);
});
test("L012 shares real C03 vocabulary exercises and culture reference",()=>{
 const bank=losExercisesFor("03");
 assert.ok(lesson.requiredPracticeIds.every(id=>bank.some(item=>item.id===id)));
 const links=lesson.scenes.flatMap(s=>s.bookLinks??[]);
 for(const section of ["vocabulary","practice","culture"])assert.ok(links.some(l=>l.chapterId==="03"&&l.section===section));
});
test("L012 does not count hinted answers as independent and requires actual study work",()=>{
 let s=emptyTeacherSession(lesson,at);
 for(const scene of lesson.scenes){
   s=moveTeacherScene(s,lesson,scene.id,at);
   if(scene.question){const q=scene.question;s=submitTeacherAnswer(s,lesson,scene.id,q.type==="choice"?q.correctOption!:q.accepted![0]!,at);}
 }
 s=confirmTeacherActivity(s,lesson,"culture-reviewed",at);
 const answers={"C03-EX-03":"Finnland","C03-EX-04":"Deutschland","C03-EX-05":"Österreich"};
 assert.equal(teacherCanFinish(s,lesson,answers),true);
 assert.equal(teacherCanFinish(s,lesson,{"C03-EX-03":"Finnland"}),false);
 assert.equal(independentTeacherEvidence(s,lesson),3);
 const helped=markTeacherHelp(emptyTeacherSession(lesson,at),"independent",at);
 const next=submitTeacherAnswer(helped,lesson,"independent","Finnland",at);
 assert.equal(independentTeacherEvidence(next,lesson),0);
});
