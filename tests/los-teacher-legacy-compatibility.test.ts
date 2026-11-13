import test from "node:test";
import assert from "node:assert/strict";
import { emptyLosDraft, parseLosDraft } from "../src/features/los/studyState.ts";
import { emptyLosLessonProgress } from "../src/features/los/lessonEngine.ts";
import { validateLosCloudDraft } from "../src/features/los/cloudContract.ts";
import { validLegacyTeacherProgress } from "../src/features/los/teacher/legacyCompatibility.ts";
import { emptyTeacherSession, independentTeacherEvidence } from "../src/features/los/teacher/engine.ts";
import { LOS1_L004_TEACHER } from "../src/features/los/teacher/lessonL004.ts";
const at = "2026-11-12T21:00:00.000Z";
const legacy = { version: "2.0.0", scene: "summary", visited: ["activation", "summary"],
  hints: [], answers: { exit: { answer: "c", count: 1, correct: true,
    independent: true, revealed: false, at } }, paused: false, completedAt: at };
test("legacy #218 state survives parsing and cloud validation without fake new evidence", () => {
  assert.equal(validLegacyTeacherProgress(legacy), true);
  const original = { ...emptyLosDraft(), updatedAt: at,
    lessonProgress: { L004: { ...emptyLosLessonProgress(), teacher: legacy } } };
  const parsed = parseLosDraft(JSON.stringify(original));
  assert.deepEqual(parsed.lessonProgress?.L004?.teacher, legacy);
  assert.equal(validateLosCloudDraft(parsed), true);
  assert.equal(parsed.teacherSessions?.L004, undefined);
  assert.equal(independentTeacherEvidence(emptyTeacherSession(LOS1_L004_TEACHER, at), LOS1_L004_TEACHER), 0);
});
test("old and new records coexist without silently modifying one another", () => {
  const current = emptyTeacherSession(LOS1_L004_TEACHER, at);
  const original = { ...emptyLosDraft(), updatedAt: at,
    lessonProgress: { L004: { ...emptyLosLessonProgress(), teacher: legacy } },
    teacherSessions: { L004: current } };
  const parsed = parseLosDraft(JSON.stringify(original));
  assert.deepEqual(parsed.lessonProgress?.L004?.teacher, legacy);
  assert.deepEqual(parsed.teacherSessions?.L004, current);
  assert.equal(validateLosCloudDraft(parsed), true);
  assert.equal(independentTeacherEvidence(parsed.teacherSessions!.L004!, LOS1_L004_TEACHER), 0);
});
test("malformed legacy records are rejected rather than trusted", () => {
  assert.equal(validLegacyTeacherProgress({ ...legacy, paused: "false" }), false);
  assert.equal(validateLosCloudDraft({ ...emptyLosDraft(), updatedAt: at,
    lessonProgress: { L004: { ...emptyLosLessonProgress(), teacher: { ...legacy, paused: "false" } } },
  }), false);
});
