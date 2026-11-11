import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_BOOKS } from "../src/features/los/catalog.ts";

test("LOS! contains eight distinct LOPS21 B3 book definitions", () => {
  assert.equal(LOS_BOOKS.length, 8);
  assert.deepEqual(LOS_BOOKS.map(book => book.code), ["SAB31", "SAB32", "SAB33", "SAB34", "SAB35", "SAB36", "SAB37", "SAB38"]);
  assert.equal(new Set(LOS_BOOKS.map(book => book.accent)).size, 8);
});

test("LOS! 1 contains the ten approved chapter-outline headings", () => {
  const first = LOS_BOOKS[0];
  assert.ok(first);
  assert.equal(first.chapters.length, 10);
  assert.deepEqual(first.chapters.map(ch => ch.id), ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]);
  assert.equal(first.chapters[0]?.title, "Hallo!");
  assert.equal(first.chapters[9]?.title, "Schön, dich kennenzulernen!");
  for (const chapter of first.chapters) {
    assert.ok(chapter.objectives.length >= 3);
    assert.ok(chapter.vocabulary.length > 0);
  }
});

test("LOS! reader is visually isolated from StudyOS dashboard shell", () => {
  const component = readFileSync("src/features/los/LosBook.tsx", "utf8");
  const css = readFileSync("src/features/los/los-book.css", "utf8");
  assert.ok(component.includes("los-book-workspace"));
  assert.ok(component.includes("los-book-paper"));
  assert.ok(component.includes("Alkuperäistekstiä valmistellaan"));
  assert.doesNotMatch(component, /<AppShell|studyos-shell|studyos-main|className="panel"/);
  assert.ok(css.includes(".los-opening-number"));
  assert.ok(css.includes("@media (max-width:760px)"));
});
