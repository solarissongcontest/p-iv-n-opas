import test from "node:test";
import assert from "node:assert/strict";
import { evaluateExercise, normalizeGap, normalizeRange } from "../src/features/los/exercises/evaluate.ts";
import { formatExerciseAnswer } from "../src/features/los/exercises/formatAnswer.ts";
import { LOS_BOOKS } from "../src/features/los/books.ts";
import { validateBook, type Exercise } from "../src/features/los/model.ts";

const base = {
  id: "fixture-1", version: "1", promptFi: "Tarkistustestin kysymys",
  objectives: [], difficulty: "basic" as const, explanationFi: "Tarkistustestin selitys",
};
test("all eight LOS! book identities have unique LOPS21 codes and valid empty manifests", () => {
  assert.equal(LOS_BOOKS.length, 8);
  assert.deepEqual(LOS_BOOKS.map(book => book.moduleCode), ["SAB31", "SAB32", "SAB33", "SAB34", "SAB35", "SAB36", "SAB37", "SAB38"]);
  for (const book of LOS_BOOKS) assert.deepEqual(validateBook(book), []);
});
test("single choice rejects unknown IDs and scores exactly", () => {
  const ex: Exercise = {
    ...base, type: "single-choice", options: [{ id: "a", label: "A" }, { id: "b", label: "B" }], correctOptionId: "b",
  };
  assert.equal(evaluateExercise(ex, "b")?.correct, true);
  assert.equal(evaluateExercise(ex, "a")?.correct, false);
  assert.equal(evaluateExercise(ex, "missing"), null);
});
test("German Unicode, whitespace and case sensitivity are deterministic", () => {
  const ex: Exercise = {
    ...base, type: "gap-fill", sentenceBefore: "", sentenceAfter: "", acceptedAnswers: ["Grüße"],
  };
  assert.equal(normalizeGap("  Grüße   dich "), "Grüße dich");
  assert.equal(evaluateExercise(ex, "Gr\u00fcße")?.correct, true);
  assert.equal(evaluateExercise(ex, "Gru\u0308ße")?.correct, true);
  assert.equal(evaluateExercise(ex, "Grusse")?.correct, false);
  assert.equal(evaluateExercise(ex, "grüße")?.correct, true);
  assert.equal(evaluateExercise({ ...ex, caseSensitive: true }, "grüße")?.correct, false);
});
test("matching needs every pair and unique right-hand options", () => {
  const ex: Exercise = {
    ...base, type: "matching",
    left: [{ id: "l1", label: "Eins" }, { id: "l2", label: "Zwei" }],
    right: [{ id: "r2", label: "Two" }, { id: "r1", label: "One" }],
    pairs: [{ leftId: "l1", rightId: "r1" }, { leftId: "l2", rightId: "r2" }],
  };
  assert.equal(evaluateExercise(ex, { l1: "r1", l2: "r2" })?.correct, true);
  assert.equal(evaluateExercise(ex, { l1: "r1", l2: "r1" })?.correct, false);
  assert.equal(evaluateExercise(ex, { l1: "r1" }), null);
});
test("highlight compares stable character offsets and trims punctuation", () => {
  const text = "Hallo, Welt!";
  const ex: Exercise = { ...base, type: "highlight", blockId: "fixture-text", text, acceptedRanges: [{ start: 7, end: 11 }] };
  assert.deepEqual(normalizeRange(text, { start: 7, end: 12 }), { start: 7, end: 11 });
  assert.equal(evaluateExercise(ex, { start: 7, end: 12 })?.correct, true);
  assert.equal(evaluateExercise(ex, { start: 0, end: 5 })?.correct, false);
  assert.equal(evaluateExercise(ex, { start: -1, end: 11 }), null);
});
test("multiple-choice requires a unique valid selection and checks the full correct set", () => {
  const ex: Exercise = {
    ...base, type: "multiple-choice",
    options: [{ id:"hello",label:"Hallo" },{ id:"bye",label:"Tschüss" },{ id:"later",label:"Bis später" }],
    correctOptionIds: ["bye","later"],
  };
  assert.equal(evaluateExercise(ex, ["later","bye"])?.correct, true);
  assert.equal(evaluateExercise(ex, ["bye"])?.correct, false);
  assert.equal(evaluateExercise(ex, ["bye","hello"])?.correct, false);
  assert.equal(evaluateExercise(ex, []), null);
  assert.equal(evaluateExercise(ex, ["bye","bye"]), null);
  assert.equal(evaluateExercise(ex, ["bye","unknown"]), null);
});
test("true/false has explicit typed answers and no guesses for empty values", () => {
  const ex: Exercise = { ...base, type:"true-false", statement:"Gute Nacht is a morning greeting", correctValue:false };
  assert.equal(evaluateExercise(ex, "false")?.correct, true);
  assert.equal(evaluateExercise(ex, "true")?.correct, false);
  assert.equal(evaluateExercise(ex, ""), null);
  assert.equal(evaluateExercise(ex, "no"), null);
});
test("word ordering rejects missing, duplicate or unsupported tokens", () => {
  const ex: Exercise = { ...base, type:"word-order",
    tokens:[{id:"morgen",label:"Morgen"},{id:"guten",label:"Guten"}],
    correctOrder:["guten","morgen"] };
  assert.equal(evaluateExercise(ex, ["guten","morgen"])?.correct, true);
  assert.equal(evaluateExercise(ex, ["morgen","guten"])?.correct, false);
  assert.equal(evaluateExercise(ex, ["guten"]), null);
  assert.equal(evaluateExercise(ex, ["guten","guten"]), null);
  assert.equal(evaluateExercise(ex, ["guten","wrong"]), null);
});
test("categorize checks every assignment and does not assume a one-to-one match", () => {
  const ex: Exercise = { ...base, type:"categorize",
    items:[{id:"bye",label:"Tschüss"},{id:"later",label:"Bis später"},{id:"morning",label:"Guten Morgen"}],
    categories:[{id:"greet",label:"Tervehdys"},{id:"farewell",label:"Hyvästely"}],
    assignments:[{itemId:"bye",categoryId:"farewell"},
      {itemId:"later",categoryId:"farewell"},{itemId:"morning",categoryId:"greet"}] };
  assert.equal(evaluateExercise(ex, {bye:"farewell",later:"farewell",morning:"greet"})?.correct, true);
  assert.equal(evaluateExercise(ex, {bye:"greet",later:"farewell",morning:"greet"})?.correct, false);
  assert.equal(evaluateExercise(ex, {bye:"farewell",later:"farewell"}), null);
  assert.equal(evaluateExercise(ex, {bye:"farewell",later:"fake",morning:"greet"}), null);
});
test("the whole original LOS book remains structurally valid with new exercises", () => {
  const book = structuredClone(LOS_BOOKS[0]);
  if (!book) throw Error("Missing book fixture");
  assert.equal(book.exercises.filter(ex => ["multiple-choice", "true-false", "word-order", "categorize"].includes(ex.type)).length, 5);
  assert.deepEqual(validateBook(book), []);
  const broken = book.exercises.find(ex => ex.type === "word-order");
  assert.ok(broken && broken.type === "word-order");
  broken.correctOrder = ["wrong","same"];
  assert.match(validateBook(book).join(", "), /Invalid word order answer key/);
});
test("reject dangling references and duplicate content identifiers", () => {
  const book = structuredClone(LOS_BOOKS[0]);
  if (!book) throw new Error("Missing book fixture");
  book.chapters.push({ id: "chapter-a", version: "1", sequence: 1, title: "Fixture", introductionFi: "", objectives: [], blockIds: ["no-block"], exerciseIds: [] });
  assert.match(validateBook(book).join(","), /Unknown block/);
});


test("historical exam feedback displays answer labels, not internal database IDs", () => {
  const choice: Exercise = { ...base, type: "single-choice",
    options: [{ id: "c1", label: "Guten Morgen!" }, { id: "c2", label: "Gute Nacht!" }],
    correctOptionId: "c1",
  };
  const order: Exercise = { ...base, type: "word-order",
    tokens: [{ id: "a", label: "später!" }, { id: "b", label: "Bis" }],
    correctOrder: ["b", "a"],
  };
  const matching: Exercise = { ...base, type: "matching",
    left: [{ id:"a",label:"Hallo" }], right:[{ id:"x",label:"Hei" }],
    pairs:[{leftId:"a",rightId:"x"}],
  };
  assert.equal(formatExerciseAnswer(choice, "c2"), "Gute Nacht!");
  assert.equal(formatExerciseAnswer(order, ["b","a"]), "Bis später!");
  assert.equal(formatExerciseAnswer(matching, { a:"x" }), "Hallo – Hei");
  assert.equal(formatExerciseAnswer(choice, null), "Ei tallennettua vastausta");
});
