import test from "node:test";
import assert from "node:assert/strict";
import { evaluatePracticeResponse } from "../src/lib/practice-rubric.ts";
import { feedbackPolicyV5 } from "../src/lib/learning-os-v5/instruction.ts";

test("rubric evaluator rewards a complete reasoned answer over a fragment", () => {
  const question = {
    type: "explanation" as const,
    expectedConcepts: ["voima", "massa", "kiihtyvyys"],
  };

  const strong = evaluatePracticeResponse(
    question,
    "Voima aiheuttaa massalle kiihtyvyyden, joten samalla voimalla suurempi massa kiihtyy vähemmän. Yhteys voidaan kuvata yhtälöllä F = ma.",
  );
  const weak = evaluatePracticeResponse(question, "Voima ja massa.");

  assert.ok(strong.score > weak.score);
  assert.ok(strong.dimensions.find((row) => row.key === "reasoning")!.score >
    weak.dimensions.find((row) => row.key === "reasoning")!.score);
});

test("rubric evaluator never reveals missing concept names", () => {
  const hidden = ["impulssi", "liikemäärä", "voima"];
  const result = evaluatePracticeResponse(
    { type: "explanation", expectedConcepts: hidden },
    "Tässä pitäisi perustella yhteys tarkemmin.",
  );
  const serialized = JSON.stringify(result).toLocaleLowerCase("fi-FI");

  for (const concept of hidden) {
    assert.equal(serialized.includes(concept), false);
  }
});

test("rubric evaluator is low confidence without a concept rubric", () => {
  const result = evaluatePracticeResponse(
    { type: "short_answer", expectedConcepts: [] },
    "Lyhyt vastaus.",
  );
  assert.equal(result.confidence, "low");
});

test("calculation rubric recognizes shown calculation structure", () => {
  const structured = evaluatePracticeResponse(
    { type: "calculation", expectedConcepts: ["voima", "massa", "kiihtyvyys"] },
    "F = ma, joten a = F / m = 10 N / 2 kg = 5 m/s².",
  );
  const proseOnly = evaluatePracticeResponse(
    { type: "calculation", expectedConcepts: ["voima", "massa", "kiihtyvyys"] },
    "Tässä käytetään sopivaa kaavaa.",
  );

  assert.ok(
    structured.dimensions.find((row) => row.key === "task_fit")!.score >
      proseOnly.dimensions.find((row) => row.key === "task_fit")!.score,
  );
});

test("rubric output is advisory and contains no mastery mutation", () => {
  const result = evaluatePracticeResponse(
    { type: "application", expectedConcepts: ["energia", "työ"] },
    "Työ muuttaa systeemin energiaa, joten tilanteessa pitää tarkastella energian siirtymistä.",
  );

  assert.ok(["independent", "hinted", "not_yet"].includes(result.suggestedResult));
  assert.equal("mastery" in result, false);
  assert.equal("verifiedLevel" in result, false);
});

test("balanced chemistry equation is recognized as correct in unicode and LaTeX forms", () => {
  const question = {
    type: "short_answer" as const,
    expectedConcepts: ["tasapainotus"],
    prompt: "Tasapainota H₂ + Cl₂ → HCl.",
    explanation: "H₂ + Cl₂ → 2HCl.",
  };

  const unicode = evaluatePracticeResponse(question, "H₂ + Cl₂ → 2HCl");
  const latex = evaluatePracticeResponse(question, "H_2+Cl_2\\rightarrow 2HCl");
  const wrong = evaluatePracticeResponse(question, "H₂ + Cl₂ → HCl");

  assert.equal(unicode.suggestedResult, "independent");
  assert.equal(unicode.score, 100);
  assert.equal(unicode.confidence, "high");
  assert.equal(latex.suggestedResult, "independent");
  assert.equal(latex.score, 100);
  assert.equal(wrong.suggestedResult, "not_yet");
});

test("correct retrieval feedback never asks for a pointless retry", () => {
  const correct = feedbackPolicyV5({
    mode: "retrieval",
    result: "correct",
    stage: "independent",
  });
  const incorrect = feedbackPolicyV5({
    mode: "retrieval",
    result: "incorrect",
    stage: "independent",
  });

  assert.equal(correct.timing, "immediate");
  assert.equal(correct.retriesBeforeReveal, 0);
  assert.equal(incorrect.timing, "after_retry");
});
