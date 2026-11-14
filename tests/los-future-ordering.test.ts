import test from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {losFutureOrderingTiles,readLosFutureOrderingAnswer,writeLosFutureOrderingAnswer} from "../src/features/los/content/losFutureOrdering.ts";

test("all 70 manuscript T08 tasks map uniquely to keyed model words without unverified scoring",()=>{
  let count=0;
  for(const book of LOS_BOOKS.filter(x=>x.id>=2))for(const chapter of book.chapters){
    const source=losFutureExercisesFor(book.id,chapter.id);
    const task=source.find(t=>t.id.endsWith("-T08"));
    assert.ok(task);
    const tiles=losFutureOrderingTiles(task);
    assert.ok(tiles,task.id);
    assert.ok(tiles.length>=3);
    assert.equal(new Set(tiles.map(t=>t.index)).size,tiles.length);
    const selected=readLosFutureOrderingAnswer(task.answerKey,tiles);
    assert.ok(selected,task.id);
    assert.equal(selected.length,tiles.length);
    assert.equal(writeLosFutureOrderingAnswer(tiles,selected),task.answerKey);
    assert.deepEqual(readLosFutureOrderingAnswer("",tiles),[]);
    assert.equal(readLosFutureOrderingAnswer("Unrelated older handwritten answer.",tiles),null);
    assert.equal(losFutureOrderingTiles(source.find(t=>t.id.endsWith("-T07"))!),null);
    count++;
  }
  assert.equal(count,70);
});
test("punctuation on supplied unsorted tiles is replaced only by their own source-model spelling",()=>{
  const source=losFutureExercisesFor(8,"10").find(t=>t.id==="LOS8-C10-T08");
  assert.ok(source);
  const tiles=losFutureOrderingTiles(source);
  assert.ok(tiles);
  assert.equal(tiles.find(t=>t.index===5)?.word,"Ich");
  assert.equal(tiles.find(t=>t.index===4)?.word,"denke,");
  assert.equal(tiles.find(t=>t.index===0)?.word,"ist.");
});

test("all 70 R02 reading tasks hide their originally exposed full model and use actual shuffled word tiles",()=>{
  let count=0;
  for(const book of LOS_BOOKS.filter(x=>x.id>=2))for(const chapter of book.chapters){
    const task=losFutureExercisesFor(book.id,chapter.id).find(x=>x.id.endsWith("-R02"));
    assert.ok(task);
    const tiles=losFutureOrderingTiles(task);
    assert.ok(tiles,task.id);
    assert.notEqual(tiles.map(t=>t.word).join(" "),task.answerKey,"Words must actually be shuffled");
    const ordered=readLosFutureOrderingAnswer(task.answerKey,tiles);
    assert.ok(ordered,task.id);
    assert.equal(ordered.length,tiles.length);
    assert.equal(writeLosFutureOrderingAnswer(tiles,ordered),task.answerKey);
    count++;
  }
  assert.equal(count,70);
});

test("all 70 R02 reading puzzles contain one usable source-backed sentence, including 13 corrected models",()=>{
  const revised:Record<string,string>={
    "LOS3-C03-R02": "Karim kann gut Fahrrad fahren.",
    "LOS4-C08-R02": "Sara erinnert sich an ein Sommerfest in ihrem Viertel.",
    "LOS4-C10-R02": "Er möchte keine Behauptungen erfinden.",
    "LOS5-C02-R02": "Seine Schwester bringt ihm Wasser.",
    "LOS5-C04-R02": "Emma schlägt Reis mit Gemüse vor.",
    "LOS5-C07-R02": "Einige nennen Bewegung, andere Pausen oder Gespräche.",
    "LOS5-C09-R02": "Beide finden die Unterschiede interessant.",
    "LOS5-C10-R02": "Ben empfiehlt einen Spaziergang nach langem Lernen.",
    "LOS6-C05-R02": "Ben erkennt drei Personen.",
    "LOS6-C10-R02": "Vor dem Vortrag übt sie laut.",
    "LOS7-C08-R02": "Die Lehrerin lobt diese Reaktion.",
    "LOS8-C02-R02": "Seine Schwester sieht lieber kurze Videos.",
    "LOS8-C10-R02": "Seine Meinung kennzeichnet er klar.",
  };
  let total=0,modified=0;
  for(const book of LOS_BOOKS.filter(x=>x.id>=2))for(const chapter of book.chapters){
    const manuscript=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];
    assert.ok(manuscript);
    const item=losFutureExercisesFor(book.id,chapter.id).find(t=>t.id.endsWith("-R02"));
    assert.ok(item);
    assert.ok(manuscript.textA.includes(item.answerKey),item.id);
    assert.ok(item.answerKey.endsWith("."),item.id);
    assert.ok(item.answerKey.length<=105,item.id);
    assert.ok(!/[.!?] [A-ZÄÖÜ]/u.test(item.answerKey),item.id);
    if(revised[item.id]){
      modified++;
      assert.equal(item.answerKey,revised[item.id]);
      const tiles=losFutureOrderingTiles(item);assert.ok(tiles);
      assert.notEqual(readLosFutureOrderingAnswer(
        "This cannot be represented by the new sentence.",tiles),[]);
      assert.equal(readLosFutureOrderingAnswer(
        "This cannot be represented by the new sentence.",tiles),null);
    }
    total++;
  }
  assert.equal(total,70);
  assert.equal(modified,13);
});
