import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L031_TEACHER } from "../src/features/los/teacher/lessonL031.ts";
import { LOS1_L032_TEACHER } from "../src/features/los/teacher/lessonL032.ts";
import { LOS1_L033_TEACHER } from "../src/features/los/teacher/lessonL033.ts";
import { LOS1_L034_TEACHER } from "../src/features/los/teacher/lessonL034.ts";
import { LOS1_L035_TEACHER } from "../src/features/los/teacher/lessonL035.ts";
import { LOS1_L036_TEACHER } from "../src/features/los/teacher/lessonL036.ts";
import { LOS1_L037_TEACHER } from "../src/features/los/teacher/lessonL037.ts";
import { LOS1_L038_TEACHER } from "../src/features/los/teacher/lessonL038.ts";
import { LOS1_L039_TEACHER } from "../src/features/los/teacher/lessonL039.ts";
import { LOS1_L040_TEACHER } from "../src/features/los/teacher/lessonL040.ts";
import { LOS1_C08_TEACHER_LESSONS } from "../src/features/los/teacher/lessonC08.ts";
import { LOS1_C09_TEACHER } from "../src/features/los/teacher/lessonC09.ts";
import { LOS1_C10_TEACHER_LESSONS } from "../src/features/los/teacher/lessonC10.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonRegistry.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { emptyTeacherSession, teacherCanFinish, teacherBuiltNumberCount, confirmTeacherActivity, setTeacherAnswerDraft } from "../src/features/los/teacher/engine.ts";
import { germanCompositeNumber } from "../src/features/los/teacher/germanNumbers.ts";

const c06=[LOS1_L031_TEACHER,LOS1_L032_TEACHER,LOS1_L033_TEACHER,LOS1_L034_TEACHER,LOS1_L035_TEACHER];
const c07=[LOS1_L036_TEACHER,LOS1_L037_TEACHER,LOS1_L038_TEACHER,LOS1_L039_TEACHER,LOS1_L040_TEACHER];
const chapters=[c06,c07,LOS1_C08_TEACHER_LESSONS,LOS1_C09_TEACHER,LOS1_C10_TEACHER_LESSONS] as const;
const lessons=chapters.flatMap(group=>[...group]);

test("C06–C10 coexist in the same canonical twenty-five-lesson Teacher 2.0 registry",()=>{
 assert.deepEqual(lessons.map(l=>l.id),Array.from({length:25},(_,i)=>"L"+String(31+i).padStart(3,"0")));
 for(const l of lessons){
  assert.equal(getLosTeacherLesson(l.id),l,l.id);
  assert.deepEqual(validateTeacherLesson(l),[],l.id);
  assert.equal(l.bookId,1);
  assert.equal(l.chapterId,String(6+Math.floor((Number(l.id.slice(1))-31)/5)).padStart(2,"0"));
 }
});
test("C06–C10 keep independently checked book IDs, sources and confirmation identifiers",()=>{
 for(let i=0;i<chapters.length;i++)for(let j=i+1;j<chapters.length;j++)
  for(const key of ["requiredPracticeIds","requiredCheckedIds","requiredActivityIds"] as const){
   const used=new Set(chapters[i]!.flatMap(l=>l[key]??[]));
   for(const id of chapters[j]!.flatMap(l=>l[key]??[]))assert.ok(!used.has(id),key+": "+id);
  }
});
test("C06 number board requires four different compound numbers even alongside C07 form and C10 media safeguards",()=>{
 assert.equal(germanCompositeNumber(32),"zweiunddreißig");
 assert.equal(germanCompositeNumber(47),"siebenundvierzig");
 const lesson=LOS1_L033_TEACHER;
 let s=emptyTeacherSession(lesson,"2026-11-13T15:00:00.000Z");
 s=setTeacherAnswerDraft(s,"number-builder-history","20,30,40,100","2026-11-13T15:01:00.000Z");
 assert.equal(teacherBuiltNumberCount(s,"number-builder"),0);
 assert.equal(confirmTeacherActivity(s,lesson,"builder-used","2026-11-13T15:02:00.000Z").activityIds.includes("builder-used"),false);
 s=setTeacherAnswerDraft(s,"number-builder-history","21,32,47,71","2026-11-13T15:03:00.000Z");
 assert.equal(teacherBuiltNumberCount(s,"number-builder"),4);
 assert.equal(confirmTeacherActivity(s,lesson,"builder-used","2026-11-13T15:04:00.000Z").activityIds.includes("builder-used"),true);
 assert.equal(teacherCanFinish(emptyTeacherSession(lesson,"2026-11-13T15:00:00.000Z"),lesson,{},[]),false);
 const c10=LOS1_C10_TEACHER_LESSONS.find(l=>l.id==="L052")!;
 assert.equal(c10.mediaGate?.approved,false);
 assert.equal(teacherCanFinish(emptyTeacherSession(c10,"2026-11-13T15:00:00.000Z"),c10,{},[]),false);
});
