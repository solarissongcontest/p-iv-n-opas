import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { KE04_QUESTION_BANK } from "../src/data/ke04-question-bank/index.ts";
import { MAA06A_EXERCISE_SEED } from "../src/data/maa06a-exercises.ts";
import {
  answerIsLeakCandidate,
  questionPromptLeaksAnswer,
} from "../src/lib/question-quality.ts";

const questionGenerator = readFileSync(
  new URL("../src/lib/question-bank.server.ts", import.meta.url),
  "utf8",
);
const bi05Repair = readFileSync(
  new URL("../supabase/migrations/20261008192500_bi05_answer_leak_guard.sql", import.meta.url),
  "utf8",
);

test("answer-leak detector catches the BI05 bug without confusing elin with elimistö", () => {
  assert.equal(answerIsLeakCandidate("elin"), true);
  assert.equal(
    questionPromptLeaksAnswer(
      "Mikä käsite vastaa kuvausta: Ruumiinosa, jolla on erilaistunut rakenne ja tehtävä. Elin muodostuu kudoksista.",
      "elin",
    ),
    true,
  );
  assert.equal(
    questionPromptLeaksAnswer(
      "Mikä käsite vastaa kuvausta: Useat elimet muodostavat yhdessä elimistön.",
      "elin",
    ),
    false,
  );
  assert.equal(questionPromptLeaksAnswer("Laske 2 + 2.", "2"), false);
});

test("all 780 curated KE04 questions pass the prompt answer-leak audit", () => {
  const leaks = KE04_QUESTION_BANK.filter((question) =>
    questionPromptLeaksAnswer(question.prompt, question.correctAnswer)
  );
  assert.deepEqual(
    leaks.map((question) => question.contentId),
    [],
    `KE04 prompt leaks: ${leaks.map((question) => question.contentId).join(", ")}`,
  );
});

test("MAA06A canonical seed is an exercise reference catalogue, not an answer-bearing question bank", () => {
  assert.ok(MAA06A_EXERCISE_SEED.length > 0);
  for (const exercise of MAA06A_EXERCISE_SEED) {
    assert.equal("prompt" in exercise, false, exercise.code);
    assert.equal("correctAnswer" in exercise, false, exercise.code);
    assert.equal("answer" in exercise, false, exercise.code);
  }
});

test("generic AI question generation rejects prompt leaks for BI05, KE04 and MAA06 practice", () => {
  assert.match(questionGenerator, /questionPromptLeaksAnswer\(row\.prompt, correctAnswer\)/);
  assert.match(questionGenerator, /answerLeakage:/);
  assert.match(questionGenerator, /Never include the correct answer verbatim in the prompt/);
});

test("BI05 repair covers every definition-as-question surface that can reveal a target term", () => {
  for (const family of [
    "recognition",
    "multiple_choice",
    "matching",
    "error_detection",
    "source_analysis",
  ]) {
    assert.match(bi05Repair, new RegExp(`BI05-IIRIS5-V2-%-${family}`));
  }
  assert.match(bi05Repair, /matching_pairs/);
  assert.match(bi05Repair, /stimulus_package/);
  assert.match(bi05Repair, /raise exception 'BI05 answer-leak repair failed/);
});
