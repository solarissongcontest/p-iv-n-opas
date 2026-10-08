import test from "node:test";
import assert from "node:assert/strict";
import type { PracticeAttempt, Topic } from "../src/lib/domain.ts";
import { selectPracticeQuestion } from "../src/lib/learning-engine.ts";

const COURSE_ID = "11111111-1111-4111-8111-111111111111";
const SELECTED_TOPIC_ID = "22222222-2222-4222-8222-222222222222";
const OTHER_TOPIC_ID = "33333333-3333-4333-8333-333333333333";

function topic(id: string, name: string): Topic {
  return {
    id,
    course_id: COURSE_ID,
    name,
    verified_level: 3,
    self_level: 0,
    next_review: null,
    last_review: null,
    importance: 4,
    weight: 10,
    progress: 60,
    basic_successes: 0,
    exam_successes: 0,
    delayed_successes: 0,
    retrieval_attempts: 0,
    retrieval_failures: 0,
    mastery_uncertainty: 0.25,
    last_retrieval_at: null,
    last_retrieval_result: null,
    last_retrieval_confidence: null,
    last_retrieval_difficulty: null,
  } as unknown as Topic;
}

function successfulAttempt(id: string, createdAt: string): PracticeAttempt {
  return {
    id,
    course_id: COURSE_ID,
    topic_id: SELECTED_TOPIC_ID,
    date: "2026-10-08",
    attempt_type: "short_answer",
    prompt: "Aiempi 1.1-tehtävä",
    response: "vastaus",
    difficulty: 3,
    result: "independent",
    confidence: 3,
    hint_used: false,
    hints_used: 0,
    delay_days: 0,
    created_at: createdAt,
    skills: ["1.1"],
    question_payload: {},
  } as unknown as PracticeAttempt;
}

test("explicitly selected Practice topic is a hard scope even when interleaving is requested", () => {
  const selectedTopic = topic(SELECTED_TOPIC_ID, "1.1 Reaktioyhtälön kirjoittaminen");
  const otherTopic = topic(OTHER_TOPIC_ID, "1.2 Ainemääräsuhteet");
  const attempts = [
    successfulAttempt("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", "2026-10-08T10:00:00Z"),
    successfulAttempt("bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", "2026-10-08T10:10:00Z"),
    successfulAttempt("cccccccc-cccc-4ccc-8ccc-cccccccccccc", "2026-10-08T10:20:00Z"),
  ];

  const selection = selectPracticeQuestion({
    topics: [selectedTopic, otherTopic],
    attempts,
    selectedTopicId: SELECTED_TOPIC_ID,
    index: 1,
    interleaveMode: "interleaved",
    questionBank: [],
  });

  assert.ok(selection);
  assert.equal(selection!.topic.id, SELECTED_TOPIC_ID);
  assert.equal(selection!.question.topicId, SELECTED_TOPIC_ID);
  assert.equal(selection!.interleaved, false);
});
