import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_BOOKS } from "../src/features/los/catalog.ts";
import { LOS_FUTURE_FIRST_CHAPTERS } from "../src/features/los/content/losFutureC01Drafts.ts";

test("LOS! 2–8 includes exactly 70 separately namespaced chapter outlines", () => {
  const later = LOS_BOOKS.filter(book => book.id >= 2);
  assert.equal(later.length, 7);
  assert.equal(later.reduce((sum, book) => sum + book.chapters.length, 0), 70);
  for(const book of later) {
    assert.deepEqual(book.chapters.map(ch => ch.id), Array.from({length:10},(_,i)=>String(i+1).padStart(2,"0")));
    assert.equal(new Set(book.chapters.map(ch => ch.title)).size, 10);
    for(const ch of book.chapters){
      assert.ok(ch.title.trim());
      assert.ok(ch.objectives[0]?.trim());
      assert.ok(ch.grammar.trim());
    }
  }
});

test("LOS! 2–8 has seven honest full C01 text drafts without fake audio or mastery", () => {
  assert.deepEqual(Object.keys(LOS_FUTURE_FIRST_CHAPTERS).map(Number), [2,3,4,5,6,7,8]);
  for(let bookId=2;bookId<=8;bookId++){
    const entry=LOS_FUTURE_FIRST_CHAPTERS[bookId];
    assert.ok(entry);
    assert.ok(entry.textA.length>300);
    assert.ok(entry.textB.length>20);
    assert.equal(entry.dialogue.length,4);
    assert.ok(entry.question.length>0);
    assert.ok(entry.answer.length>0);
    assert.equal(entry.vocabulary.length,6);
    assert.deepEqual(LOS_BOOKS[bookId-1]?.chapters[0]?.vocabulary,
      entry.vocabulary.map(([de,fi])=>de+" – "+fi));
  }
});

test("later book navigation does not expose book 1 exercises, notebook or source reader", () => {
  const route=readFileSync("src/features/los/LosBook.tsx","utf8");
  const preview=readFileSync("src/features/los/LosFutureBookPreview.tsx","utf8");
  assert.match(route,/book !== null && \/\^\(0\[1-9\]\|10\)\$\//);
  assert.ok(route.includes('book.id !== 1 && section !== "chapter"'));
  assert.ok(route.includes('chapter && book.id===1 && <LosNotebook'));
  assert.ok(preview.includes("Tätä tehtävää ei vielä pisteytetä"));
  assert.doesNotMatch(preview,/losExercisesFor|useLosChapterDraft|LosChapterGrammar|LosAuthenticAudio/);
});
