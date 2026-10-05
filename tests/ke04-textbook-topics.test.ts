import test from "node:test";
import assert from "node:assert/strict";
import { KE04_QUESTION_BANK } from "../src/data/ke04-question-bank/index.ts";
import {
  KE04_TEXTBOOK_TOPICS,
  ke04TextbookTopicForQuestion,
} from "../src/lib/ke04-textbook-topics.ts";

const EXPECTED_SECTIONS = [
  "1.1", "1.2", "1.3", "1.4",
  "2.1",
  "3.1", "3.2", "3.3",
  "4.1", "4.2",
  "5.1", "5.2", "5.3", "5.4",
];

test("KE04 school-facing topics match the 14 Mooli 4 subchapters", () => {
  assert.equal(KE04_TEXTBOOK_TOPICS.length, 14);
  assert.deepEqual(KE04_TEXTBOOK_TOPICS.map((topic) => topic.section), EXPECTED_SECTIONS);
  assert.deepEqual(KE04_TEXTBOOK_TOPICS.map((topic) => topic.position), Array.from({ length: 14 }, (_, i) => i + 1));
  assert.equal(KE04_TEXTBOOK_TOPICS.reduce((sum, topic) => sum + topic.weight, 0), 100);
  assert.ok(KE04_TEXTBOOK_TOPICS.every((topic) => topic.name.startsWith(`${topic.section} `)));
  assert.ok(KE04_TEXTBOOK_TOPICS.every((topic) => topic.materials.startsWith("Mooli 4 s. ")));
});

test("every curated KE04 question maps to a real Mooli 4 subchapter", () => {
  const allowed = new Set(EXPECTED_SECTIONS);
  for (const question of KE04_QUESTION_BANK) {
    const mapped = ke04TextbookTopicForQuestion(question);
    assert.ok(allowed.has(mapped.section), `${question.contentId} -> ${mapped.section}`);
  }
});

test("question-bank skill buckets can merge without losing textbook lesson granularity", () => {
  const chapterSections = new Map<number, Set<string>>();
  for (const question of KE04_QUESTION_BANK) {
    const section = ke04TextbookTopicForQuestion(question).section;
    const set = chapterSections.get(question.chapter) ?? new Set<string>();
    set.add(section);
    chapterSections.set(question.chapter, set);
  }

  assert.deepEqual([...chapterSections.get(1)!], ["1.1"]);
  assert.deepEqual([...chapterSections.get(2)!], ["1.2"]);
  assert.deepEqual([...chapterSections.get(3)!], ["1.2"]);
  assert.deepEqual([...chapterSections.get(6)!], ["2.1"]);
  assert.deepEqual([...chapterSections.get(7)!], ["2.1"]);
  assert.deepEqual([...chapterSections.get(8)!], ["2.1"]);
  assert.deepEqual([...chapterSections.get(10)!], ["3.2"]);
  assert.deepEqual([...chapterSections.get(11)!], ["3.2"]);
  assert.deepEqual([...chapterSections.get(12)!], ["3.3"]);
  assert.deepEqual([...chapterSections.get(13)!], ["3.3"]);

  const biomoleculeSections = chapterSections.get(15)!;
  assert.ok(biomoleculeSections.has("5.1"));
  assert.ok(biomoleculeSections.has("5.2"));
  assert.ok(biomoleculeSections.has("5.3"));
  assert.ok(biomoleculeSections.has("5.4"));
});

test("inflected starch prompt beats stale nucleic-acid subtopic metadata", () => {
  const question = KE04_QUESTION_BANK.find((item) => item.contentId === "KE04-BIO-040");
  assert.ok(question, "KE04-BIO-040 must exist");
  assert.equal(ke04TextbookTopicForQuestion(question).section, "5.1");
});
