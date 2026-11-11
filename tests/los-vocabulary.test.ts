import assert from "node:assert/strict";
import test from "node:test";
import { LOS_BOOKS } from "../src/features/los/books.ts";
import { bookVocabularyRows, filterBookVocabulary } from "../src/features/los/vocabularyIndex.ts";

const book = LOS_BOOKS[0];
if (!book) throw new Error("Missing LOS! 1");
const words = bookVocabularyRows(book);

test("book vocabulary shows only actual content and links each word back to a chapter", () => {
  assert.ok(words.length >= 10);
  assert.ok(words.every(item => ["C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09"].includes(item.chapterId)));
  assert.equal(words.filter(item => item.chapterId === "C01").length, 16);
  assert.equal(words.filter(item => item.chapterId === "C02").length, 16);
  assert.equal(words.filter(item => item.chapterId === "C03").length, 17);
  assert.equal(words.filter(item => item.chapterId === "C04").length, 14);
  assert.equal(words.filter(item => item.chapterId === "C05").length, 17);
  assert.equal(words.filter(item => item.chapterId === "C06").length, 26);
  assert.equal(words.filter(item => item.chapterId === "C07").length, 16);
  assert.equal(words.filter(item => item.chapterId === "C08").length, 17);
  assert.equal(words.filter(item => item.chapterId === "C09").length, 17);
  assert.equal(new Set(words.map(item => item.id)).size, words.length);
  assert.deepEqual(bookVocabularyRows(LOS_BOOKS[1]!), []);
  const sorted = [...words].sort((a, b) => a.de.localeCompare(b.de, "de-DE") || a.id.localeCompare(b.id));
  assert.deepEqual(words.map(row => row.id), sorted.map(row => row.id));
});

test("Finnish and German searches are both case-insensitive, Unicode-aware", () => {
  const guten = filterBookVocabulary(words, "GUTEN");
  assert.ok(guten.some(row => /guten Morgen/i.test(row.de)));
  assert.ok(filterBookVocabulary(words, "huomenta").some(row => /guten Morgen/i.test(row.de)));
  assert.ok(filterBookVocabulary(words, "hyvää").length >= 3);
  assert.deepEqual(filterBookVocabulary(words, "oletettu-sana-jota-ei-ole"), []);
  assert.equal(filterBookVocabulary(words, "").length, words.length);
});

test("own word list filters selected identities without collapsing different meanings", () => {
  const first = words[0]!;
  const selected = filterBookVocabulary(words, "", true, [first.id]);
  assert.deepEqual(selected.map(row => row.id), [first.id]);
  assert.deepEqual(filterBookVocabulary(words, "zzzz", true, [first.id]), []);
  assert.deepEqual(filterBookVocabulary(words, "", true, ["made-up-id"]), []);
});
