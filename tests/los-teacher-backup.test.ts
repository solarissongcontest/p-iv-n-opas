import test from "node:test";
import assert from "node:assert/strict";
import { draftIsEmpty, validateLosCloudDraft } from "../src/features/los/cloudContract.ts";
import { emptyTeacherSession } from "../src/features/los/teacher/engine.ts";
import { LOS1_L004_TEACHER } from "../src/features/los/teacher/lessonL004.ts";

const emptyDraft = () => ({
  version: 1 as const, note: "", applicationDraft: "", bookmarked: false,
  practiceAnswers: {}, practiceChecked: [], testAnswers: {},
  testSubmittedAt: null, selfAssessment: "", updatedAt: "",
});

test("a chapter containing only Teacher 2.0 activity is not omitted from backups", () => {
  const session = emptyTeacherSession(LOS1_L004_TEACHER, "2026-11-12T20:00:00.000Z");
  const draft = { ...emptyDraft(), teacherSessions: { L004: session } };
  assert.equal(draftIsEmpty(draft), false);
  assert.equal(validateLosCloudDraft(draft), true);
});

test("cloud and import validation reject malformed Teacher 2.0 progress", () => {
  const session = emptyTeacherSession(LOS1_L004_TEACHER, "2026-11-12T20:00:00.000Z");
  assert.equal(validateLosCloudDraft({ ...emptyDraft(), teacherSessions: { L004: session } }), true);
  assert.equal(validateLosCloudDraft({ ...emptyDraft(), teacherSessions: {
    L004: { ...session, lessonId: "L999" },
  } }), false);
  assert.equal(validateLosCloudDraft({ ...emptyDraft(), teacherSessions: { L004: {
    ...session, attempts: [{ sceneId: "guided", answer: "x", correct: "yes", independent: false, at: "2026-11-12T20:00:00.000Z" }],
  } } }), false);
});
