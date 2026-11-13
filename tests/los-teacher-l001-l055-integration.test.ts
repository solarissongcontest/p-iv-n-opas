import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonRegistry.ts";
import {validateTeacherLesson} from "../src/features/los/teacher/validateContent.ts";
import {emptyTeacherSession,isCorrectCalendarEntry,teacherCanFinish,teacherMidtermAssessmentStatus} from "../src/features/los/teacher/engine.ts";
const now="2026-11-13T16:00:00.000Z";

test("all 55 sequential LOS 1 Teacher lessons use the single validated engine",()=>{
 for(let i=1;i<=55;i++){
   const id="L"+String(i).padStart(3,"0");
   const l=getLosTeacherLesson(id);
   assert.ok(l,id+" missing");
   assert.deepEqual(validateTeacherLesson(l),[],id);
   assert.equal(l.bookId,1);
 }
 assert.equal(getLosTeacherLesson("L056"),undefined);
});
test("C09 saved calendar correctness and C10 unapproved media gate retain independent evidence",()=>{
 const c09=getLosTeacherLesson("L048")!;
 const calendar=c09.scenes.find(scene=>scene.calendar);
 assert.ok(calendar);
 const expected=calendar.calendar!.day+"|"+calendar.calendar!.time;
 assert.equal(isCorrectCalendarEntry(calendar,expected),true);
 assert.equal(isCorrectCalendarEntry(calendar,"Montag|09:00") && expected!=="Montag|09:00",false);
 const c10=getLosTeacherLesson("L052")!;
 assert.equal(c10.mediaGate?.sourceId,"M-DIB-02");
 assert.equal(c10.mediaGate?.approved,false);
 assert.equal(teacherCanFinish(emptyTeacherSession(c10,now),c10,{}),false);
 assert.equal(teacherMidtermAssessmentStatus(getLosTeacherLesson("L030")!).expected,25);
});
test("integrated C01 to C10 player retains media ethics, number builder, form and dialogue transfer",()=>{
 const p=readFileSync("src/features/los/teacher/LosTeacherPlayer.tsx","utf8");
 for(const word of ["LosTeacherGreetingMedia","LosTeacherNumberBuilder","TeacherTimeCalendar",
   "los-teacher-form-fields","teacherMidtermAssessmentStatus","composeLosC10Dialogues",
   "storeLosC10Dialogues","TeacherSource"]){
     assert.ok(p.includes(word),word+" missing from shared Teacher Player");
   }
 const route=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
 assert.match(route,/getLosTeacherLesson.*lessonRegistry/);
 const books=readFileSync("src/features/los/LosBook.tsx","utf8");
 assert.match(books,/L001–L055/);
});
