import { strict as assert } from "node:assert";
import { test } from "node:test";
import { LOS_BOOKS } from "../src/features/los/catalog.ts";
import { losContentTasks, isLosContentTask } from "../src/features/los/contentTreeModel.ts";

test("U3: every real C01-C10 workbook question has one stable deep link", () => {
  const chapters=LOS_BOOKS[0]?.chapters ?? [];
  assert.equal(chapters.length,10);
  const practice=chapters.flatMap(ch=>losContentTasks(ch.id,"practice"));
  const testTasks=chapters.flatMap(ch=>losContentTasks(ch.id,"test"));
  assert.equal(testTasks.length,147);
  assert.equal(practice.length,147+16);
  assert.equal(new Set(testTasks.map(t=>t.id)).size,testTasks.length);
  assert.equal(new Set(practice.map(t=>t.id)).size,practice.length);
  assert.equal(losContentTasks("01","test")[0]?.id,"C01-EX-01");
  assert.ok(practice.some(t=>t.id==="RICH-C01-DICTATION"&&t.chapterId==="01"));
});

test("U3: deep links must resolve to actual exercise in correct chapter and mode", () => {
  assert.equal(isLosContentTask("01","practice","C01-EX-01"),true);
  assert.equal(isLosContentTask("01","test","C01-EX-01"),true);
  assert.equal(isLosContentTask("01","practice","RICH-C01-CHOICE"),true);
  assert.equal(isLosContentTask("01","test","RICH-C01-CHOICE"),false);
  assert.equal(isLosContentTask("02","practice","C01-EX-01"),false);
  assert.equal(isLosContentTask("01","practice","NOT-A-REAL-ID"),false);
});
