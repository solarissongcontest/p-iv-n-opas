import test from "node:test";
import assert from "node:assert/strict";
import {
  confirmTeacherActivity, emptyTeacherSession, finishTeacherSession,
  moveTeacherScene, submitTeacherAnswer, teacherCanFinish,
} from "../src/features/los/teacher/engine.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { LOS1_L003_TEACHER } from "../src/features/los/teacher/lessonL003.ts";
import { LOS1_C01_QUESTIONS } from "../src/features/los/content/los1C01.ts";

const lesson=LOS1_L003_TEACHER;
const now="2026-11-13T09:20:00.000Z";

test("L003 follows the real source dialogue and validates required source tasks",()=>{
  assert.equal(lesson.id,"L003");
  assert.deepEqual(validateTeacherLesson(lesson),[]);
  assert.deepEqual(lesson.requiredCheckedIds,["C01-SOURCE-Q01","C01-SOURCE-Q02"]);
  assert.ok(lesson.scenes.some(scene=>scene.bookLinks?.some(link=>link.section==="text")));
  assert.ok(lesson.scenes.some(scene=>scene.bookLinks?.some(link=>link.section==="understand")));
  assert.deepEqual(lesson.requiredCheckedIds,LOS1_C01_QUESTIONS.slice(0,2).map(q=>q.id));
  assert.equal(lesson.scenes.find(scene=>scene.id==="exit")?.question?.correctOption,"a");
});

test("L003 cannot finish from just visiting the book or writing unchecked answers",()=>{
  let s=emptyTeacherSession(lesson,now);
  for(const scene of lesson.scenes){
    s=moveTeacherScene(s,lesson,scene.id,now);
    if(scene.question)s=submitTeacherAnswer(s,lesson,scene.id,scene.question.correctOption!,now);
  }
  for(const id of lesson.requiredActivityIds)s=confirmTeacherActivity(s,lesson,id,now);
  const answers={"C01-SOURCE-Q01":"a","C01-SOURCE-Q02":"b"};
  assert.equal(teacherCanFinish(s,lesson,{}),false);
  assert.equal(teacherCanFinish(s,lesson,answers,[]),false);
  assert.equal(teacherCanFinish(s,lesson,answers,["C01-SOURCE-Q01"]),false);
  assert.equal(teacherCanFinish(s,lesson,answers,["C01-SOURCE-Q01","C01-SOURCE-Q02"]),true);
  assert.equal(finishTeacherSession(s,lesson,answers,now,["C01-SOURCE-Q01"]).completedAt,null);
  assert.equal(finishTeacherSession(s,lesson,answers,now,["C01-SOURCE-Q01","C01-SOURCE-Q02"]).completedAt,now);
});

test("L003 refuses invalid source-check identifiers",()=>{
  const issues=validateTeacherLesson({...lesson,requiredCheckedIds:["C01-SOURCE-Q01","fake"]});
  assert.ok(issues.some(issue=>issue.location==="requiredCheckedIds"));
});
