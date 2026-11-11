import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const shell = readFileSync("src/features/los/LosBook.tsx", "utf8");
const widgets = readFileSync("src/features/los/LosV33.tsx", "utf8");
const styles = readFileSync("src/features/los/los-v33.css", "utf8");

test("LOS! v3.3 keeps the approved 16:9 banner on the book landing only", () => {
  assert.match(shell, /<LosBookBanner book=\{book\} \/>/);
  assert.match(widgets, /los-1-banner\.jpeg/);
  assert.match(widgets, /onError=\{\(\) => setMissing\(true\)\}/);
  assert.match(styles, /\.los-v33-banner\{[^}]*aspect-ratio:16\/9/);
  assert.match(styles, /\.los-v33-banner img\{[^}]*object-fit:contain/);
  assert.doesNotMatch(shell, /<BookBanner book=\{book\}/);
});

test("LOS! v3.3 keeps one hierarchical chapter navigation on desktop and mobile", () => {
  assert.match(shell, /<LosContentsTree book=\{book\}/);
  assert.match(widgets, /aria-expanded=\{expanded\.includes\(ch\.id\)/);
  assert.match(widgets, /aria-current=\{chapterId === ch\.id/);
  assert.match(widgets, /Suodata kappaleita/);
  assert.match(widgets, /Avaa kaikki/);
  assert.match(styles, /grid-template-columns:284px minmax\(0,1fr\)/);
  assert.match(styles, /@media\(max-width:760px\)/);
});

test("LOS! v3.3 split view reuses the textbook content and exercise draft", () => {
  assert.match(shell, /aria-pressed=\{splitView\}/);
  assert.match(shell, /los-v33-text-column/);
  assert.match(shell, /<TextPage chapter=\{chapter\}/);
  assert.match(shell, /<div className="los-v33-exercise-column"><LosWorkbook/);
  assert.match(shell, /mode="practice"/);
  assert.match(styles, /\.los-v33-split\{display:grid/);
  assert.match(styles, /@container \(max-width:920px\)/);
  assert.doesNotMatch(shell, /<AppShell/);
  const workbook = readFileSync("src/features/los/LosWorkbook.tsx", "utf8");
  assert.match(workbook, /draft\.practiceChecked/);
});
