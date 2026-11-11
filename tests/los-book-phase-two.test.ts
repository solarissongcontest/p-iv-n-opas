import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_1_LESSONS } from "../src/features/los/learningPath.ts";
import { LOS_BOOKS } from "../src/features/los/catalog.ts";

test("LOS! 1 has exactly 60 lessons in locked manifest sequence", () => {
  assert.equal(LOS_1_LESSONS.length,60);
  assert.deepEqual(LOS_1_LESSONS.map(x=>x.number), Array.from({length:60},(_,i)=>i+1));
  assert.equal(LOS_1_LESSONS[0]?.title,"Miten LOS! 1:llä opiskellaan?");
  assert.equal(LOS_1_LESSONS[29]?.title,"Välikoe: kappaleet 1–5");
  assert.equal(LOS_1_LESSONS[58]?.title,"Koko kirjan loppukoe");
  assert.equal(LOS_1_LESSONS[59]?.title,"Mitä osaan nyt saksaksi?");
  assert.equal(LOS_1_LESSONS.filter(x=>x.chapter !== null).length,56);
});

test("guided lessons point to known chapter pages or the book's appendix", () => {
  const chapters = new Set(LOS_BOOKS[0]?.chapters.map(ch=>ch.id));
  const known = new Set(["chapter","text","vocabulary","grammar","practice","appendix"]);
  for (const lesson of LOS_1_LESSONS) {
    assert.ok(lesson.chapter === null || chapters.has(lesson.chapter));
    assert.ok(known.has(lesson.destination));
  }
});

test("publisher style is maintained in navigational adjuncts", () => {
  const tools=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  const grammar=readFileSync("src/features/los/LosGrammarChapters.tsx","utf8");
  const reader=readFileSync("src/features/los/LosBook.tsx","utf8");
  assert.ok(tools.includes("LosLearningPath"));
  assert.ok(tools.includes("LosDictionary"));
  assert.ok(tools.includes("LosIndexSearch"));
  assert.ok(tools.includes("M-COM-01"));
  assert.ok(tools.includes("M-COM-03"));
  assert.ok(grammar.includes("Kommen-verbin kaksi muotoa"));
  assert.ok(reader.includes("LosAuthenticAudio"));
  assert.doesNotMatch(tools,/studyos-shell|<AppShell|className="panel"/);
});

test("SAB32–SAB38 cannot inherit SAB31's guided lesson plan", () => {
  const tools = readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(tools,/book\.id !== 1/);
  assert.match(tools,/LOS! 1:n oppitunteja ei käytetä tässä kirjassa/);
});
