import test from "node:test";
import assert from "node:assert/strict";
import type { PracticeAttempt, Topic } from "../src/lib/domain.ts";
import { masteryModelV4 } from "../src/lib/learning-os-v4.ts";

const NOW = "2026-10-06";
const COURSE_ID = "11111111-1111-4111-8111-111111111111";

function topic(id: string, name: string, patch: Partial<Topic> = {}): Topic {
  return {
    id,
    owner_id: "owner",
    course_id: COURSE_ID,
    name,
    position: 1,
    weight: 1,
    importance: 5,
    dependencies: [],
    materials: null,
    progress: 0,
    school_covered: false,
    self_level: 0,
    verified_level: 0,
    basic_successes: 0,
    exam_successes: 0,
    delayed_successes: 0,
    last_review: null,
    next_review: null,
    study_minutes: 0,
    retrieval_attempts: 0,
    retrieval_failures: 0,
    mastery_uncertainty: 1,
    mastery_confidence: 0,
    evidence_count: 0,
    strong_evidence_count: 0,
    recall_strength: 0,
    application_strength: 0,
    retention_strength: 0,
    forgetting_risk: 0,
    exam_relevance: 0.5,
    learning_state_updated_at: null,
    last_retrieval_at: null,
    last_retrieval_result: null,
    last_retrieval_confidence: null,
    last_retrieval_difficulty: null,
    understanding_strength: 0,
    fluency_strength: 0,
    calibration_strength: 0.5,
    blind_spot: false,
    retention_target: 0.8,
    discrimination_strength: 0,
    transfer_level: 0,
    ...patch,
  } as unknown as Topic;
}

function attempt(id: string, topicId: string): PracticeAttempt {
  return {
    id,
    owner_id: "owner",
    course_id: COURSE_ID,
    topic_id: topicId,
    date: NOW,
    attempt_type: "short_answer",
    prompt: "Tasapainota H₂ + Cl₂ → HCl.",
    response: "H₂ + Cl₂ → 2 HCl",
    difficulty: 2,
    result: "independent",
    outcome: "correct",
    confidence: 2,
    hint_used: false,
    hints_used: 0,
    source: "practice",
    evidence_quality: 0.8,
    question_payload: {},
    operation_id: null,
    schema_version: 4,
    delay_days: 0,
    created_at: "2026-10-06T12:00:00Z",
  };
}

test("a topic with no attempts is unassessed and has exactly zero mastery", () => {
  const t = topic("ke04-1.2", "1.2 Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto", {
    // These stale/exposure fields must never manufacture mastery evidence.
    progress: 35,
    calibration_strength: 0.5,
    mastery_confidence: 0.9,
    forgetting_risk: 0.8,
  });

  const model = masteryModelV4(t, [], { now: NOW });

  assert.equal(model.label, "Not assessed");
  assert.equal(model.level, 0);
  assert.equal(model.score, 0);
  assert.equal(model.confidence, 0);
  assert.equal(model.evidenceCount, 0);
  assert.equal(model.forgettingRisk, 0);
  assert.deepEqual(
    Object.fromEntries(Object.entries(model.dimensions).map(([key, value]) => [key, value.score])),
    { recall: 0, understanding: 0, application: 0, fluency: 0, retention: 0, calibration: 0 },
  );
});

test("evidence for KE04 1.1 cannot change sibling topic 1.2", () => {
  const oneOne = topic("ke04-1.1", "1.1 Reaktioyhtälön kirjoittaminen ja tasapainottaminen");
  const oneTwo = topic("ke04-1.2", "1.2 Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto");
  const attempts = [attempt("attempt-1.1", oneOne.id)];

  const first = masteryModelV4(oneOne, attempts, { now: NOW });
  const sibling = masteryModelV4(oneTwo, attempts, { now: NOW });

  assert.ok(first.evidenceCount > 0);
  assert.ok(first.score > 0);
  assert.equal(sibling.evidenceCount, 0);
  assert.equal(sibling.score, 0);
  assert.equal(sibling.label, "Not assessed");
});
