import test from "node:test";
import assert from "node:assert/strict";
import { emptyLosLessonProgress, parseLosLessonProgressMap } from "../src/features/los/lessonEngine.ts";
import { validateLosCloudDraft } from "../src/features/los/cloudContract.ts";
import { validLegacyTeacherProgress } from "../src/features/los/teacher/legacyCompatibility.ts";
import { emptyTeacherSession, parseTeacherSessions, independentTeacherEvidence } from "../src/features/los/teacher/engine.ts";
import { LOS1_L004_TEACHER } from "../src/features/los/teacher/lessonL004.ts";

const at = "2026-11-12T21:00:00.000Z";
const legacy = { version: "2.0.0", scene: "summary", visited: ["activation", "summary"],
  hints: [], answers: { exit: { answer: "c", count: 1, correct: true,
    independent: true, revealed: false, at } }, paused: false, completedAt: at };
const chapter = () => ({ version: 1, note: "", applicationDraft: "", bookmarked: false,
  practiceAnswers: {}, practiceChecked: [], testAnswers: {}, testSubmittedAt: null,
  selfAssessment: "", updatedAt: at });

test("legacy #218 state survives historical lesson progress parsing and cloud validation", () => {
  assert.equal(validLegacyTeacherProgress(legacy), true);
  const old = { ...emptyLosLessonProgress(), teacher: legacy };
  const parsed = parseLosLessonProgressMap({ L004: old });
  assert.deepEqual(parsed.L004?.teacher, legacy);
  assert.equal(validateLosCloudDraft({ ...chapter(), lessonProgress: parsed }), true);
  assert.equal(independentTeacherEvidence(emptyTeacherSession(LOS1_L004_TEACHER, at), LOS1_L004_TEACHER), 0);
});

test("old and new storage records coexist without silently modifying or upgrading evidence", () => {
  const current = emptyTeacherSession(LOS1_L004_TEACHER, at);
  const old = { ...emptyLosLessonProgress(), teacher: legacy };
  const parsedLegacy = parseLosLessonProgressMap({ L004: old });
  const parsedTeacher = parseTeacherSessions({ L004: current });
  assert.deepEqual(parsedLegacy.L004?.teacher, legacy);
  assert.deepEqual(parsedTeacher.L004, current);
  assert.equal(validateLosCloudDraft({ ...chapter(), lessonProgress: parsedLegacy, teacherSessions: parsedTeacher }), true);
  assert.equal(independentTeacherEvidence(parsedTeacher.L004!, LOS1_L004_TEACHER), 0);
});

test("malformed legacy data is rejected, not trusted as a student answer", () => {
  assert.equal(validLegacyTeacherProgress({ ...legacy, paused: "false" }), false);
  assert.equal(validateLosCloudDraft({ ...chapter(),
    lessonProgress: { L004: { ...emptyLosLessonProgress(), teacher: { ...legacy, paused: "false" } } },
  }), false);
});
