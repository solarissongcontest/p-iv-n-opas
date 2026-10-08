import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("guided study retrieval uses real topic questions instead of a single generic answer box", () => {
  const adapter = read("src/components/AbittiAnswerEditor.tsx");
  const guided = read("src/features/session/GuidedRetrievalAnswerEditor.tsx");
  const session = read("src/features/session/SessionForm.tsx");

  assert.ok(session.includes('label="Vastaus muistista"'));
  assert.ok(adapter.includes('props.label === "Vastaus muistista"'));
  assert.ok(adapter.includes("GUIDED_RETRIEVAL_PARTIAL_PREFIX"));

  for (const token of [
    "useQuestionBank",
    "selectPracticeQuestion",
    "ensureKe04QuestionBankSeed",
    "QUESTION_COUNT = 3",
    'interleaveMode: "blocked"',
    'question.source === "bank"',
    "Näytä vihje",
    "Seuraava kysymys",
    "Vastattu",
  ]) {
    assert.ok(guided.includes(token), "Missing guided retrieval integration: " + token);
  }

  assert.ok(guided.includes("topic_id === topic?.id"));
  assert.ok(guided.includes("baseAnswerHasContent(currentAnswer)"));
});

test("partial guided answers cannot unlock the parent Continue button", () => {
  const adapter = read("src/components/AbittiAnswerEditor.tsx");
  const guided = read("src/features/session/GuidedRetrievalAnswerEditor.tsx");

  assert.ok(guided.includes("GUIDED_RETRIEVAL_PARTIAL_PREFIX"));
  assert.ok(guided.includes("GUIDED_RETRIEVAL_COMPLETE_PREFIX"));
  assert.ok(adapter.includes("value.startsWith(GUIDED_RETRIEVAL_PARTIAL_PREFIX)"));
  assert.ok(adapter.includes("return false"));
});
