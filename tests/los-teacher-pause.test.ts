import test from "node:test";
import assert from "node:assert/strict";
import { emptyTeacherSession, submitTeacherAnswer, toggleTeacherPause, teacherCanFinish, validTeacherSession } from "../src/features/los/teacher/engine.ts";
import { LOS1_L004_TEACHER } from "../src/features/los/teacher/lessonL004.ts";
const at = "2026-11-13T07:00:00.000Z";
test("pausing preserves session, blocks answer evidence, and resumes safely", () => {
  let s = emptyTeacherSession(LOS1_L004_TEACHER, at);
  s = toggleTeacherPause(s, at);
  assert.equal(s.paused, true);
  assert.equal(validTeacherSession(JSON.parse(JSON.stringify(s))), true);
  assert.equal(submitTeacherAnswer(s, LOS1_L004_TEACHER, "recall", "b", at).attempts.length, 0);
  assert.equal(teacherCanFinish(s, LOS1_L004_TEACHER, {}), false);
  s = toggleTeacherPause(s, at);
  assert.equal(s.paused, false);
  s = submitTeacherAnswer(s, LOS1_L004_TEACHER, "recall", "b", at);
  assert.equal(s.attempts.length, 1);
  assert.equal(s.attempts[0]?.correct, true);
});
