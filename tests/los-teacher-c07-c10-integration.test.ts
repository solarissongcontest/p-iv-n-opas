import test from "node:test";
import assert from "node:assert/strict";
import {LOS1_L036_TEACHER} from "../src/features/los/teacher/lessonL036.ts";
import {LOS1_L037_TEACHER} from "../src/features/los/teacher/lessonL037.ts";
import {LOS1_L038_TEACHER} from "../src/features/los/teacher/lessonL038.ts";
import {LOS1_L039_TEACHER} from "../src/features/los/teacher/lessonL039.ts";
import {LOS1_L040_TEACHER} from "../src/features/los/teacher/lessonL040.ts";
import {LOS1_C08_TEACHER_LESSONS} from "../src/features/los/teacher/lessonC08.ts";
import {LOS1_C09_TEACHER} from "../src/features/los/teacher/lessonC09.ts";
import {LOS1_C10_TEACHER_LESSONS} from "../src/features/los/teacher/lessonC10.ts";
import {LOS1_L005_TEACHER} from "../src/features/los/teacher/lessonL005.ts";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonL004.ts";
import {validateTeacherLesson} from "../src/features/los/teacher/validateContent.ts";
import {emptyTeacherSession,teacherCanFinish} from "../src/features/los/teacher/engine.ts";
import {LOS1_TEXT_B_SOURCES} from "../src/features/los/content/los1TextBAdditional.ts";

const c07=[LOS1_L036_TEACHER,LOS1_L037_TEACHER,LOS1_L038_TEACHER,LOS1_L039_TEACHER,LOS1_L040_TEACHER];
const chapters=[c07,LOS1_C08_TEACHER_LESSONS,LOS1_C09_TEACHER,LOS1_C10_TEACHER_LESSONS] as const;
const all=chapters.flatMap(chapter=>[...chapter]);

test("C07-C10 Teacher resolves every L036-L055 lesson, preserving all canonical chapter IDs",()=>{
 assert.deepEqual(all.map(l=>l.id),Array.from({length:20},(_,i)=>"L"+String(i+36).padStart(3,"0")));
 for(const l of all){
  assert.equal(getLosTeacherLesson(l.id),l);
  assert.deepEqual(validateTeacherLesson(l),[],l.id);
  assert.equal(l.chapterId,String(7+Math.floor((Number(l.id.slice(1))-36)/5)).padStart(2,"0"));
  assert.equal(l.bookId,1);
 }
});
test("Cross-chapter workbook, source and activity identifiers cannot leak into another C07-C10 lesson",()=>{
 for(let i=0;i<chapters.length;i++)for(let j=i+1;j<chapters.length;j++){
  for(const key of ["requiredPracticeIds","requiredCheckedIds","requiredActivityIds"] as const){
   const seen=new Set(chapters[i]!.flatMap(l=>l[key]??[]));
   for(const id of chapters[j]!.flatMap(l=>l[key]??[]))assert.ok(!seen.has(id),key+": "+id);
  }
 }
});
test("Unfilled C07 written forms and unapproved C10 listening never cause completion",()=>{
 const lesson=c07.find(l=>l.scenes.some(s=>s.kind==="form"))!;
 const form=lesson.scenes.find(s=>s.kind==="form")!;
 assert.ok(form.form && form.form.length>=2);
 const initial=emptyTeacherSession(lesson,"2026-11-13T15:00:00.000Z");
 const visited={...initial,visitedIds:lesson.scenes.map(s=>s.id),activityIds:[...lesson.requiredActivityIds],
  attempts:lesson.requiredQuestionIds.map(sceneId=>({sceneId,answer:"a",correct:true,independent:true,at:"2026-11-13T15:00:00.000Z"}))};
 assert.equal(teacherCanFinish(visited,lesson,{},[]),false);
 const harald=LOS1_C10_TEACHER_LESSONS.find(l=>l.id==="L052")!;
 assert.equal(harald.mediaGate?.sourceId,"M-DIB-02");
 assert.equal(harald.mediaGate?.approved,false);
 assert.equal(teacherCanFinish(emptyTeacherSession(harald,"2026-11-13T15:00:00.000Z"),harald,{},[]),false);
});
test("The current L005 source stays in the one Teacher player and does not manufacture listening mastery",()=>{
 const original=LOS1_TEXT_B_SOURCES["01"];
 assert.equal(original.sourceId,"M-COM-03");
 assert.equal(original.lines.length,20);
 assert.equal(getLosTeacherLesson("L005"),LOS1_L005_TEACHER);
 const s=emptyTeacherSession(LOS1_L005_TEACHER,"2026-11-13T15:00:00.000Z");
 assert.equal(s.completedAt,null);
 assert.equal(teacherCanFinish(s,LOS1_L005_TEACHER,{},[]),false);
});
