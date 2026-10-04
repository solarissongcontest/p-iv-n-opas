import test from "node:test";
import assert from "node:assert/strict";
import {
  KE04_QUESTION_BANK,
  KE04_QUESTION_COUNT,
  KE04_RESERVE_COUNT,
} from "../src/data/ke04-question-bank/index.ts";

const EXPECTED_BY_CHAPTER: Record<number, number> = {
  1: 58, 2: 58, 3: 53, 4: 58, 5: 53,
  6: 48, 7: 58, 8: 48, 9: 48, 10: 48,
  11: 48, 12: 48, 13: 48, 14: 53, 15: 53,
};

test("KE04 V3 bank has the audited canonical size and topic coverage", () => {
  assert.equal(KE04_QUESTION_COUNT, 780);
  assert.equal(KE04_RESERVE_COUNT, 45);
  assert.equal(new Set(KE04_QUESTION_BANK.map((question) => question.chapter)).size, 15);

  for (const [chapter, expected] of Object.entries(EXPECTED_BY_CHAPTER)) {
    const rows = KE04_QUESTION_BANK.filter((question) => question.chapter === Number(chapter));
    assert.equal(rows.length, expected, `chapter ${chapter}`);
    assert.equal(rows.filter((question) => question.reserveForExam).length, 3, `chapter ${chapter} reserve`);
    assert.deepEqual(
      [...new Set(rows.map((question) => question.difficulty))].sort(),
      [1, 2, 3, 4, 5],
      `chapter ${chapter} difficulty coverage`,
    );
  }
});

test("KE04 V3 bank has stable unique ids and complete pedagogical metadata", () => {
  assert.equal(new Set(KE04_QUESTION_BANK.map((question) => question.seedKey)).size, 780);
  assert.equal(new Set(KE04_QUESTION_BANK.map((question) => question.contentId)).size, 780);

  for (const question of KE04_QUESTION_BANK) {
    assert.equal(question.seedKey, `ke04-v3:${question.contentId}`);
    assert.ok(question.prompt.trim().length >= 8, question.contentId);
    assert.ok(question.explanation.trim().length >= 2, question.contentId);
    assert.ok(question.scoring.trim().length >= 2, question.contentId);
    assert.ok(question.hints.length >= 2, question.contentId);
    assert.ok(question.skills.length >= 1, question.contentId);
    assert.ok(question.difficulty >= 1 && question.difficulty <= 5, question.contentId);
    assert.equal(question.validated, true, question.contentId);
    if (question.reserveForExam) assert.equal(question.examEligible, true, question.contentId);
  }
});

test("structured multiple choice and matching questions are executable", () => {
  const multipleChoice = KE04_QUESTION_BANK.filter((question) => question.questionType === "multiple_choice");
  const matching = KE04_QUESTION_BANK.filter((question) => question.questionType === "matching");

  assert.equal(multipleChoice.length, 73);
  assert.equal(matching.length, 37);

  for (const question of multipleChoice) {
    assert.equal(question.options.length, 4, question.contentId);
    assert.ok(question.correctAnswer, question.contentId);
    assert.ok(question.options.includes(question.correctAnswer!), question.contentId);
  }
  for (const question of matching) {
    assert.ok(question.matchingPairs.length >= 2, question.contentId);
    assert.equal(question.answerMode, "matching", question.contentId);
    const left = new Set(question.matchingPairs.map((pair) => pair.left));
    const right = new Set(question.matchingPairs.map((pair) => pair.right));
    assert.equal(left.size, question.matchingPairs.length, question.contentId);
    assert.equal(right.size, question.matchingPairs.length, question.contentId);
  }
});

test("exam reserve is small, balanced and kept unseen by design", () => {
  const reserve = KE04_QUESTION_BANK.filter((question) => question.reserveForExam);
  assert.equal(reserve.length, 45);
  assert.ok(reserve.every((question) => question.difficulty >= 4), "reserve should be koetason material");
  assert.ok(reserve.every((question) => question.hints.length >= 3), "reserve keeps hints for post-exam learning only");
});
