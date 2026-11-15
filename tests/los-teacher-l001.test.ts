import test from "node:test";
import assert from "node:assert/strict";
import {
  confirmTeacherActivity, emptyTeacherSession, finishTeacherSession,
  moveTeacherScene, setTeacherAnswerDraft, submitTeacherAnswer,
  teacherCanFinish, teacherLatestAttempt,
} from "../src/features/los/teacher/engine.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";
import { LOS1_L001_TEACHER } from "../src/features/los/teacher/lessonL001.ts";

const lesson=LOS1_L001_TEACHER;
const now="2026-11-13T08:00:00.000Z";

test("L001 is a complete zero-beginner lesson with book, audio check, personal goal and exact exit check", () => {
  assert.equal(lesson.id,"L001");
  assert.equal(lesson.scenes.length,10);
  assert.deepEqual(validateTeacherLesson(lesson),[]);
  assert.deepEqual(lesson.requiredQuestionIds,["greeting-check","exit"]);
  assert.equal(lesson.requiredPracticeIds.length,0);
  const reflection=lesson.scenes.find(scene=>scene.id==="your-goal");
  assert.equal(reflection?.reflection?.minLength,15);
  assert.equal(reflection?.activityId,"goal-written");
  const book=lesson.scenes.find(scene=>scene.id==="book-navigation");
  assert.ok(book?.bookLinks?.some(link=>link.section==="text"));
  assert.ok(lesson.scenes.some(scene=>scene.bookLinks?.some(link=>link.section==="dictionary")));
});

test("L001 cannot complete by simply clicking through scenes without writing its goal", () => {
  let s=emptyTeacherSession(lesson,now);
  for(const scene of lesson.scenes){
    s=moveTeacherScene(s,lesson,scene.id,now);
    if(scene.question){
      const answer=scene.question.correctOption!;
      s=submitTeacherAnswer(s,lesson,scene.id,answer,now);
    }
  }
  for(const id of lesson.requiredActivityIds)s=confirmTeacherActivity(s,lesson,id,now);
  assert.equal(teacherCanFinish(s,lesson,{}),false);
  assert.equal(finishTeacherSession(s,lesson,{},now).completedAt,null);
  s=setTeacherAnswerDraft(s,"your-goal","Haluan oppia tervehtimään saksaksi.",now);
  assert.equal(teacherCanFinish(s,lesson,{}),true);
  s=finishTeacherSession(s,lesson,{},now);
  assert.equal(s.completedAt,now);
});

test("L001 matching its legacy exit answer does not silently manufacture language mastery", () => {
  let s=emptyTeacherSession(lesson,now);
  s=submitTeacherAnswer(s,lesson,"exit","b",now);
  assert.equal(teacherLatestAttempt(s,"exit")?.correct,false);
  s=submitTeacherAnswer(s,lesson,"exit","a",now);
  assert.equal(teacherLatestAttempt(s,"exit")?.correct,true);
  assert.equal(teacherLatestAttempt(s,"exit")?.independent,false);
});

test("a malformed reflection cannot be shipped as an active teaching scene", () => {
  const scenes=lesson.scenes.map(scene=>scene.id==="your-goal"
    ? {...scene,reflection:{prompt:"",placeholder:"Tavoite",minLength:501}}:scene);
  const issues=validateTeacherLesson({...lesson,scenes});
  assert.ok(issues.some(issue=>issue.problem.includes("Kirjoitus- tai pohdintatehtävä")));
});
