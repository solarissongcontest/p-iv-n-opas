import test from "node:test";
import assert from "node:assert/strict";
import type { Course, PracticeAttempt, QuestionBankItem, Topic } from "../src/lib/domain.ts";
import { selectPracticeQuestion } from "../src/lib/learning-engine.ts";
import { buildExamSimulationV5 } from "../src/lib/learning-os-v5.ts";

const COURSE_ID = "11111111-1111-4111-8111-111111111111";
const TOPIC_ID = "22222222-2222-4222-8222-222222222222";

function topic(): Topic {
  return {
    id: TOPIC_ID,
    course_id: COURSE_ID,
    name: "Stoikiometria",
    verified_level: 2,
    self_level: 0,
    next_review: null,
    last_review: null,
    importance: 5,
    weight: 10,
    progress: 40,
    basic_successes: 0,
    exam_successes: 0,
    delayed_successes: 0,
    retrieval_attempts: 0,
    retrieval_failures: 0,
    mastery_uncertainty: 0.5,
    last_retrieval_at: null,
    last_retrieval_result: null,
    last_retrieval_confidence: null,
    last_retrieval_difficulty: null,
  } as unknown as Topic;
}

function course(): Course {
  return {
    id: COURSE_ID,
    code: "KE04",
    name: "Kemialliset reaktiot",
    subject: "Kemia",
    exam_date: "2026-11-23",
  } as unknown as Course;
}

function bank(id: string, overrides: Partial<QuestionBankItem> = {}): QuestionBankItem {
  return {
    id,
    owner_id: "33333333-3333-4333-8333-333333333333",
    course_id: COURSE_ID,
    topic_id: TOPIC_ID,
    curriculum: "LOPS21",
    module_code: "KE04",
    question_type: "calculation",
    prompt: "Laske tehtävä vaiheittain.",
    options: [],
    correct_answer: null,
    explanation: "Malliratkaisu.",
    hints: ["Vihje 1", "Vihje 2"],
    skills: ["stoichiometry"],
    expected_concepts: ["ainemääräsuhde"],
    difficulty: 2,
    estimated_seconds: 120,
    status: "active",
    source_type: "seed",
    source_ref: "seed:" + id,
    metadata: {},
    created_at: "2026-10-04T00:00:00Z",
    updated_at: "2026-10-04T00:00:00Z",
    validated: true,
    exam_eligible: true,
    reserve_for_exam: false,
    ...overrides,
  } as QuestionBankItem;
}

function attempt(questionId: string, overrides: Partial<PracticeAttempt> = {}): PracticeAttempt {
  return {
    id: crypto.randomUUID(),
    course_id: COURSE_ID,
    topic_id: TOPIC_ID,
    date: "2026-10-04",
    attempt_type: "calculation",
    prompt: "Aiempi tehtävä",
    response: "vastaus",
    difficulty: 2,
    result: "independent",
    confidence: 3,
    hint_used: false,
    delay_days: 0,
    created_at: "2026-10-04T09:00:00Z",
    question_payload: { questionBankId: questionId },
    skills: ["stoichiometry"],
    ...overrides,
  } as unknown as PracticeAttempt;
}

test("normal Practice Mode never leaks exam-reserve questions", () => {
  const ordinary = bank("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa");
  const reserve = bank("bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", {
    reserve_for_exam: true,
    difficulty: 5,
    question_type: "simulation",
  });
  const selected = selectPracticeQuestion({
    topics: [topic()],
    attempts: [],
    selectedTopicId: TOPIC_ID,
    course: course(),
    index: 0,
    questionBank: [reserve, ordinary],
  });
  assert.ok(selected);
  assert.equal(selected!.question.bankId, ordinary.id);
  assert.equal(selected!.question.reserveForExam, false);
});

test("Practice Mode prefers a suitable unseen item over a just-used item", () => {
  const seen = bank("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa");
  const unseen = bank("bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb");
  const selected = selectPracticeQuestion({
    topics: [topic()],
    attempts: [attempt(seen.id)],
    selectedTopicId: TOPIC_ID,
    course: course(),
    index: 0,
    questionBank: [seen, unseen],
  });
  assert.ok(selected);
  assert.equal(selected!.question.bankId, unseen.id);
});

test("Exam Mode prioritizes unseen reserve questions before seen ordinary ones", () => {
  const reserve = bank("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", {
    reserve_for_exam: true,
    difficulty: 5,
    question_type: "simulation",
    points: 10,
  });
  const unseen = bank("bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", { difficulty: 4, points: 8 });
  const seen = bank("cccccccc-cccc-4ccc-8ccc-cccccccccccc", { difficulty: 5, points: 10 });
  const simulation = buildExamSimulationV5({
    course: course(),
    topics: [topic()],
    questions: [seen, unseen, reserve],
    attempts: [attempt(seen.id)],
    mode: "practice",
  });
  assert.equal(simulation.tasks[0]?.id, reserve.id);
  assert.ok(simulation.tasks.some((task) => task.id === unseen.id));
});
