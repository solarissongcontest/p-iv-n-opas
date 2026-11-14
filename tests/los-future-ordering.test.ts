import test from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
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
