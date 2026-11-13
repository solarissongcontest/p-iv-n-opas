import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_C08_TEACHER_LESSONS } from "../src/features/los/teacher/lessonC08.ts";
import { LOS1_C09_TEACHER } from "../src/features/los/teacher/lessonC09.ts";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { emptyTeacherSession, teacherCanFinish } from "../src/features/los/teacher/engine.ts";
import { losExercisesFor } from "../src/features/los/exerciseBank.ts";

test("C08 and C09 coexist in one canonical Teacher registry without shadowing",()=>{
  const combined=[...LOS1_C08_TEACHER_LESSONS,...LOS1_C09_TEACHER];
  assert.deepEqual(combined.map(l=>l.id),Array.from({length:10},(_,i)=>"L"+String(i+41).padStart(3,"0")));
  for(const lesson of combined) {
    assert.equal(getLosTeacherLesson(lesson.id),lesson,lesson.id);
    assert.deepEqual(validateTeacherLesson(lesson),[],lesson.id);
    assert.equal(lesson.chapterId,Number(lesson.id.slice(1))<=45?"08":"09");
    assert.equal(lesson.bookId,1);
  }
});
test("C08 and C09 never share workbook, checked-question or activity IDs",()=>{
  const c08=LOS1_C08_TEACHER_LESSONS;
  const c09=LOS1_C09_TEACHER;
  for(const key of ["requiredPracticeIds","requiredCheckedIds","requiredActivityIds"] as const) {
    const a=new Set(c08.flatMap(l=>l[key]??[]));
    const b=new Set(c09.flatMap(l=>l[key]??[]));
    for(const id of a)assert.ok(!b.has(id),key+" "+id);
  }
  for(const [chapter,items] of [["08",c08],["09",c09]] as const){
    const canonical=new Set(losExercisesFor(chapter).map(item=>item.id));
    for(const l of items)assert.ok(l.requiredPracticeIds.every(id=>canonical.has(id)),l.id);
  }
});
test("opening or visiting a cross-chapter Teacher cannot fabricate completion",()=>{
  for(const lesson of [...LOS1_C08_TEACHER_LESSONS,...LOS1_C09_TEACHER]){
    const start=emptyTeacherSession(lesson,"2026-11-13T12:00:00.000Z");
    assert.equal(start.completedAt,null);
    assert.equal(teacherCanFinish(start,lesson,{},[],undefined),false,lesson.id);
  }
});
