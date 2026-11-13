import test from "node:test";
import assert from "node:assert/strict";
import {
  confirmTeacherActivity, emptyTeacherSession, finishTeacherSession,
  moveTeacherScene, submitTeacherAnswer, teacherCanFinish, teacherLatestAttempt,
  teacherWrongFeedback,
} from "../src/features/los/teacher/engine.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { LOS1_L002_TEACHER } from "../src/features/los/teacher/lessonL002.ts";

const lesson=LOS1_L002_TEACHER;
const now="2026-11-13T08:45:00.000Z";

test("L002 covers five pronunciation patterns with two diagnostic opening questions",()=>{
  assert.equal(lesson.id,"L002");
  assert.equal(lesson.scenes.length,11);
  assert.deepEqual(validateTeacherLesson(lesson),[]);
  assert.deepEqual(lesson.requiredQuestionIds,["pre-w","pre-ei","guided","exit"]);
  assert.equal(lesson.scenes.filter(scene=>scene.phase.startsWith("Ennakkokysymys")).length,2);
  const board=lesson.scenes.find(scene=>scene.id==="board")?.board;
  assert.deepEqual(board?.map(step=>step.label),["w → v","z → ts","ei → ai","ie → pitkä i","sch → š"]);
  assert.ok(lesson.scenes.some(scene=>scene.bookLinks?.some(link=>link.section==="grammar")));
  assert.ok(lesson.scenes.some(scene=>scene.bookLinks?.some(link=>link.section==="text")));
});

test("L002 gives precise deterministic explanations, not guessed free-form feedback",()=>{
  let s=emptyTeacherSession(lesson,now);
  s=submitTeacherAnswer(s,lesson,"pre-ei","c",now);
  assert.equal(teacherLatestAttempt(s,"pre-ei")?.correct,false);
  const scene=lesson.scenes.find(x=>x.id==="pre-ei")!;
  assert.match(teacherWrongFeedback(scene,"c"),/Suomen sanan ei/);
  s=submitTeacherAnswer(s,lesson,"pre-ei","b",now);
  assert.equal(teacherLatestAttempt(s,"pre-ei")?.correct,true);
  assert.equal(teacherLatestAttempt(s,"pre-ei")?.independent,false);
});

test("L002 cannot claim its own lesson completed until the two real book and audio actions are confirmed",()=>{
  let s=emptyTeacherSession(lesson,now);
  for(const scene of lesson.scenes){
    s=moveTeacherScene(s,lesson,scene.id,now);
    if(scene.question)s=submitTeacherAnswer(s,lesson,scene.id,scene.question.correctOption!,now);
  }
  assert.equal(teacherCanFinish(s,lesson,{}),false);
  s=confirmTeacherActivity(s,lesson,"grammar-reviewed",now);
  assert.equal(teacherCanFinish(s,lesson,{}),false);
  s=confirmTeacherActivity(s,lesson,"audio-tried",now);
  assert.equal(teacherCanFinish(s,lesson,{}),true);
  assert.equal(finishTeacherSession(s,lesson,{},now).completedAt,now);
  assert.equal(lesson.scenes.find(x=>x.id==="exit")?.question?.correctOption,"b");
});
