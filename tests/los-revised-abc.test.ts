import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS1_REVISED_AB } from "../src/features/los/content/los1RevisedAB.ts";
import { LOS1_REVISED_C } from "../src/features/los/content/los1RevisedC.ts";

test("LOS! 1 contains exactly ten updated A, B and C reading units", () => {
  assert.equal(LOS1_REVISED_AB.chapters.length, 10);
  assert.equal(LOS1_REVISED_C.chapters.length, 10);
  for (let number = 1; number <= 10; number++) {
    const id = String(number).padStart(2, "0");
    const aAndB = LOS1_REVISED_AB.chapters.find(chapter => chapter.chapterId === "C" + id);
    const c = LOS1_REVISED_C.chapters.find(chapter => chapter.chapterId === id);
    assert.ok(aAndB, "A/B missing for " + id);
    assert.ok(c, "C missing for " + id);
    assert.equal(aAndB.textA.id, "los1-c" + id + "-text-a");
    assert.equal(aAndB.textB.id, "los1-c" + id + "-text-b");
    assert.ok(aAndB.textA.blocks.length > 5);
    assert.ok(aAndB.textB.blocks.length > 2);
    assert.ok(c.contentMarkdown.length > 300);
    assert.equal(c.supportOnly, true);
  }
});

test("new A/B teaching text drafts never masquerade as verified authentic transcripts", () => {
  assert.equal(LOS1_REVISED_AB.reviewedByNativeGermanSpeaker, false);
  assert.equal(LOS1_REVISED_AB.audioProduced, false);
  for (const chapter of LOS1_REVISED_AB.chapters) {
    assert.equal(chapter.textA.audio.generated, false);
    assert.equal(chapter.textB.audio.generated, false);
  }
});

test("all revised chapter sections are routed without replacing original source data", () => {
  const book = readFileSync("src/features/los/LosBook.tsx", "utf8");
  const supplemental = readFileSync("src/features/los/LosSupplementalSections.tsx", "utf8");
  const component = readFileSync("src/features/los/LosRevisedTextPages.tsx", "utf8");
  assert.match(book, /id:"text-c", label:"Text C · Tukiteksti"/);
  assert.match(book, /LosHilfstextPage chapterId=\{chapter.id\}/);
  assert.match(book, /LosRevisedTextPage chapterId=\{chapter.id\} kind="A"/);
  assert.match(book, /OriginalTextPage chapter=\{chapter\}/);
  assert.match(supplemental, /LosRevisedTextPage chapterId=\{chapter.id\} kind="B"/);
  assert.match(supplemental, /LosAdditionalTextB chapterId=\{chapter.id\}/);
  assert.match(component, /LosRevisedUnderstanding/);
  assert.match(component, /window\.speechSynthesis/);
});
