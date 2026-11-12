import { test } from "node:test";
import assert from "node:assert/strict";
import {
  LOS1_SOURCE_REGISTRY, LOS1_CHAPTER_SOURCE_PLANS, findLosSource,
  getLosChapterSourceGate, isLosSourcePublishable, sourcePublicationIssues,
  validateLosSourceRegistry,
} from "../src/features/los/content/sourceRegistry.ts";

test("LOS! 1 source manifest imports 29 unique resources and ten chapters", () => {
  assert.equal(LOS1_SOURCE_REGISTRY.length, 29);
  assert.equal(LOS1_CHAPTER_SOURCE_PLANS.length, 10);
  assert.equal(new Set(LOS1_SOURCE_REGISTRY.map(source => source.id)).size, 29);
  assert.ok(findLosSource("M-WB-07"),"C03 replacement source must be present");
  assert.deepEqual(validateLosSourceRegistry(), []);
});

test("manifest readiness A never implies reviewed or published textbook content", () => {
  const dialogue = findLosSource("M-COM-01");
  const greetings = findLosSource("M-COM-03");
  assert.ok(dialogue);
  assert.ok(greetings);
  assert.equal(dialogue.stage, "rights-verified");
  assert.equal(dialogue.licenseCode, "CC BY-SA 3.0");
  assert.equal(greetings.licenseCode, "public-domain");
  assert.ok(!dialogue.deviceTested);
  assert.ok(!isLosSourcePublishable(dialogue));
  assert.equal(dialogue.integrated,true);
  assert.ok(sourcePublicationIssues(dialogue).some(issue => issue.includes("kieli-")));
  assert.ok(sourcePublicationIssues(dialogue).some(issue => issue.includes("mobiilissa")));
  assert.ok(LOS1_SOURCE_REGISTRY.every(source => !isLosSourcePublishable(source)));
});

test("C06 and C08 both have identified but unpublished primary sources", () => {
  const c06=getLosChapterSourceGate("06");
  assert.equal(c06.sourceId,"M-ZPE-01");
  assert.equal(c06.sourceStage,"rights-verified");
  assert.equal(c06.ready,false);
  assert.ok(c06.issues.some(issue=>issue.includes("kieli-")));
  assert.ok(c06.issues.some(issue=>issue.includes("mobiilissa")));
  const c08=getLosChapterSourceGate("08");
  assert.equal(c08.sourceId,"M-WB-08");
  assert.equal(c08.ready,false);
  assert.equal(c08.sourceStage,"rights-verified");
});

test("chapter source gates preserve all ten chapter IDs and never invent readiness", () => {
  for (let number = 1; number <= 10; number++) {
    const chapterId = String(number).padStart(2, "0");
    const gate = getLosChapterSourceGate(chapterId);
    assert.equal(gate.chapterId, `C${chapterId}`);
    assert.ok(gate.issues.length >= 1);
    assert.equal(gate.ready, false);
    if (gate.sourceId) {
      assert.ok(findLosSource(gate.sourceId));
      assert.ok(gate.sourceUrl?.startsWith("https://"));
    }
  }
  assert.equal(getLosChapterSourceGate("C01").sourceId, "M-COM-01");
  assert.equal(getLosChapterSourceGate("C02").sourceId, "M-WB-01");
  assert.equal(getLosChapterSourceGate("C10").sourceId, "M-DIB-02");
  assert.equal(getLosChapterSourceGate("99").ready, false);
});

test("a source can be published only when every independent gate is satisfied", () => {
  const source = findLosSource("M-COM-01");
  assert.ok(source);
  const falselyPublished = { ...source, published: true };
  assert.equal(isLosSourcePublishable(falselyPublished), false);
  const approved = {
    ...source,
    stage: "published" as const,
    languageReviewed: true,
    integrated: true,
    deviceTested: true,
    published: true,
  };
  assert.equal(isLosSourcePublishable(approved), true);
  assert.equal(isLosSourcePublishable({ ...approved, licenseEvidenceUrl: null }), false);
  assert.equal(isLosSourcePublishable({ ...approved, languageReviewed: false }), false);
  assert.equal(isLosSourcePublishable({ ...approved, deviceTested: false }), false);
});
