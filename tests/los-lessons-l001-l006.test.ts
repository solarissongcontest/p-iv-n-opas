import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_1_LESSONS } from "../src/features/los/learningPath.ts";
import {
  LOS1_C01_LESSON_BLUEPRINTS, emptyLosLessonProgress,
  losLessonMarkStep, losLessonSubmitCheck, losLessonFinish,
  losLessonCanComplete, losLessonEvidenceMet,
  parseLosLessonProgressMap, validateLosLessonProgressMap,
} from "../src/features/los/lessonEngine.ts";
import { validateLosCloudDraft, draftIsEmpty } from "../src/features/los/cloudContract.ts";

const now = "2026-11-11T21:00:00.000Z";
const blankDraft = () => ({
  version: 1 as const, note: "", applicationDraft: "", bookmarked: false,
  practiceAnswers: {} as Record<string, string>, practiceChecked: [] as string[],
  testAnswers: {} as Record<string, string>, testSubmittedAt: null as string | null,
  selfAssessment: "", updatedAt: "",
});
test("L001-L006 align with the real first six lessons of the 60 lesson path", () => {
  assert.equal(LOS_1_LESSONS.length, 60);
  assert.equal(LOS1_C01_LESSON_BLUEPRINTS.length, 6);
  LOS1_C01_LESSON_BLUEPRINTS.forEach((lesson, i) => {
    assert.equal(lesson.id, "L" + String(i + 1).padStart(3, "0"));
    assert.equal(lesson.title, LOS_1_LESSONS[i]?.title);
    assert.equal(lesson.contentVersion, "1.0.0");
    assert.equal(lesson.estimatedMinutes, 30);
    assert.ok(lesson.steps.length >= 3);
    assert.equal(new Set(lesson.steps.map(x => x.id)).size, lesson.steps.length);
    assert.ok(lesson.steps.every(s => s.label && s.instruction && s.minutes > 0));
    assert.ok(lesson.check.answers.some(a => a.id === lesson.check.correctId));
    assert.ok(lesson.check.explanation.length > 20);
  });
});
test("reading a page is never sufficient: explicit steps and an exit submission are required", () => {
  const lesson = LOS1_C01_LESSON_BLUEPRINTS[0]!;
  const draft = blankDraft();
  const empty = emptyLosLessonProgress();
  assert.equal(losLessonCanComplete(lesson, empty, draft), false);
  assert.equal(losLessonFinish(lesson, empty, draft, now).completedAt, null);
  const opened = losLessonMarkStep(lesson, empty, "not-a-real-step", now);
  assert.deepEqual(opened, empty);
  const oneStep = losLessonMarkStep(lesson, empty, lesson.steps[0]!.id, now);
  assert.equal(oneStep.startedAt, now);
  assert.equal(oneStep.completedStepIds.length, 1);
  assert.equal(losLessonCanComplete(lesson, oneStep, draft), false);
  let p = oneStep;
  for (const step of lesson.steps.slice(1)) p = losLessonMarkStep(lesson, p, step.id, now);
  assert.equal(losLessonCanComplete(lesson, p, draft), false);
  p = losLessonSubmitCheck(lesson, p, "a", now);
  assert.equal(losLessonCanComplete(lesson, p, draft), true);
  const finished = losLessonFinish(lesson, p, draft, now);
  assert.equal(finished.completedAt, now);
  assert.deepEqual(losLessonMarkStep(lesson, finished, "reader", now), finished);
});
test("lesson completion allows a wrong exit answer after feedback, but not an unsubmitted answer", () => {
  const lesson = LOS1_C01_LESSON_BLUEPRINTS[1]!;
  const draft = blankDraft();
  let p = emptyLosLessonProgress();
  for (const step of lesson.steps) p = losLessonMarkStep(lesson, p, step.id, now);
  assert.equal(losLessonCanComplete(lesson, p, draft), false);
  p = losLessonSubmitCheck(lesson, p, "a", now);
  assert.equal(losLessonCanComplete(lesson, p, draft), true);
  assert.equal(losLessonFinish(lesson, p, draft, now).completedAt, now);
});
test("L003 and L005 require real checked source answers, not clicks", () => {
  for (const lessonId of ["L003", "L005"]) {
    const lesson = LOS1_C01_LESSON_BLUEPRINTS.find(x => x.id === lessonId)!;
    const draft = blankDraft();
    let p = emptyLosLessonProgress();
    for (const step of lesson.steps) p = losLessonMarkStep(lesson, p, step.id, now);
    p = losLessonSubmitCheck(lesson, p, lesson.check.correctId, now);
    assert.equal(losLessonEvidenceMet(lesson, draft), false);
    assert.equal(losLessonCanComplete(lesson, p, draft), false);
    for (const requirement of lesson.evidence) {
      for (const id of requirement.ids ?? []) {
        draft.practiceAnswers[id] = "a";
        draft.practiceChecked.push(id);
      }
    }
    assert.equal(losLessonEvidenceMet(lesson, draft), true);
    assert.equal(losLessonCanComplete(lesson, p, draft), true);
  }
});
test("L004 requires two stored practice answers and L006 requires an actual submitted test", () => {
  const draft = blankDraft();
  const l4 = LOS1_C01_LESSON_BLUEPRINTS[3]!;
  assert.equal(losLessonEvidenceMet(l4, draft), false);
  draft.practiceAnswers["C01-EX-01"] = "Guten Morgen!";
  assert.equal(losLessonEvidenceMet(l4, draft), false);
  draft.practiceAnswers["C01-EX-04"] = "Tschüss!";
  assert.equal(losLessonEvidenceMet(l4, draft), true);
  const l6 = LOS1_C01_LESSON_BLUEPRINTS[5]!;
  assert.equal(losLessonEvidenceMet(l6, draft), false);
  draft.testSubmittedAt = now;
  assert.equal(losLessonEvidenceMet(l6, draft), true);
});
test("v1 local/cloud/backup draft supports optional six lessons without losing old data", () => {
  const draft = blankDraft();
  assert.equal(validateLosCloudDraft(draft), true);
  assert.equal(draftIsEmpty(draft), true);
  const p = losLessonMarkStep(LOS1_C01_LESSON_BLUEPRINTS[0]!, emptyLosLessonProgress(), "guide", now);
  const map = { L001: p };
  assert.equal(validateLosLessonProgressMap(map), true);
  assert.deepEqual(parseLosLessonProgressMap(map), map);
  const withLessons = { ...draft, lessonProgress: map };
  assert.equal(validateLosCloudDraft(withLessons), true);
  assert.equal(draftIsEmpty(withLessons), false);
  assert.equal(validateLosCloudDraft({ ...draft, lessonProgress: { L001: { ...p, completedStepIds: [9] } } }), false);
  assert.equal(validateLosCloudDraft({ ...draft, lessonProgress: { fake: p } }), false);
  assert.equal(validateLosLessonProgressMap(Object.fromEntries(Array.from({length:61}, (_,i) => ["L" + String(i).padStart(3,"0"), p]))), false);
});
test("the learning path renders the shared lesson runner and persists in chapter draft", () => {
  const index = readFileSync("src/features/los/LosReferenceTools.tsx", "utf8");
  const runner = readFileSync("src/features/los/LosFirstLessons.tsx", "utf8");
  const storage = readFileSync("src/features/los/studyState.ts", "utf8");
  const backups = readFileSync("src/features/los/localBackups.ts", "utf8");
  assert.match(index, /LosFirstLessons/);
  assert.match(index, /lesson\.number\s*<=\s*6/);
  assert.match(runner, /useLosChapterDraft\(1, "01"\)/);
  assert.match(runner, /losLessonFinish/);
  assert.match(storage, /parseLosLessonProgressMap/);
  assert.match(backups, /draftIsEmpty/);
});
