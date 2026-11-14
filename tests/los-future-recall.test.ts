import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureRecallPairs,readLosFutureRecallAnswer,writeLosFutureRecallAnswer}
  from "../src/features/los/content/losFutureRecall.ts";

test("all 70 T06 manuscript vocabulary tasks become six independent recall entries",()=>{
  let total=0;
  for(const book of LOS_BOOKS.filter(item=>item.id>=2))for(const chapter of book.chapters){
    const task=losFutureExercisesFor(book.id,chapter.id).find(item=>item.id.endsWith("-T06"));
    assert.ok(task);
    const pairs=losFutureRecallPairs(task);
    assert.ok(pairs,task.id);
    assert.equal(pairs.length,6);
    assert.deepEqual(readLosFutureRecallAnswer("",pairs),["","","","","",""]);
    const first=[pairs[0]!.de,"","","","",""];
    const saved=writeLosFutureRecallAnswer(pairs,first);
    assert.deepEqual(readLosFutureRecallAnswer(saved,pairs),first);
    assert.ok(!saved.includes(pairs[1]!.de),"unanswered words are not written into learner drafts");
    assert.equal(writeLosFutureRecallAnswer(pairs,["","","","","",""]),"");
    assert.equal(readLosFutureRecallAnswer("my older free-form draft",pairs),null);
    assert.equal(readLosFutureRecallAnswer(JSON.stringify({version:1,meanings:["changed"],answers:first}),pairs),null);
    total++;
  }
  assert.equal(total,70);
});

test("unrelated tasks and corrupt data never overwrite learner draft text",()=>{
  const exercises=losFutureExercisesFor(2,"01");
  const t06=exercises.find(task=>task.id.endsWith("-T06"));
  assert.ok(t06);
  const pairs=losFutureRecallPairs(t06);
  assert.ok(pairs);
  assert.equal(losFutureRecallPairs(exercises.find(task=>task.id.endsWith("-T05"))!),null);
  for(const old of ["Saksan kirjoitukseni!",'{"version":1,"answers":[]}',"null","[]"])
    assert.equal(readLosFutureRecallAnswer(old,pairs),null);
  const answer=writeLosFutureRecallAnswer(pairs,["Mein Versuch","","","","",""]);
  assert.deepEqual(readLosFutureRecallAnswer(answer,pairs)?.[0],"Mein Versuch");
});
