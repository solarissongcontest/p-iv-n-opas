import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureShortAnswer} from "../src/features/los/content/losFutureShortAnswer.ts";

test("all 210 source T02 reading, T09 translation and T12 grammar tasks use one-line ungraded inputs",()=>{
  let reading=0,translation=0,grammar=0;
  for(const book of LOS_BOOKS.filter(item=>item.id>=2))for(const chapter of book.chapters){
    const tasks=losFutureExercisesFor(book.id,chapter.id);
    for(const suffix of ["T02","T09","T12"] as const){
      const task=tasks.find(item=>item.id.endsWith("-"+suffix));
      assert.ok(task,`Missing source ${book.id}/${chapter.id}/${suffix}`);
      const short=losFutureShortAnswer(task);
      assert.ok(short,task.id);
      assert.equal(short.prompt,task.prompt);
      assert.ok(task.answerKey.length<=150);
      if(suffix==="T02"){
        assert.equal(short.kind,"reading");
        assert.equal(short.language,"fi");
        reading++;
      }else if(suffix==="T09"){
        assert.equal(short.kind,"translation");
        assert.equal(short.language,"de");
        translation++;
      }else{
        assert.equal(short.kind,"grammar");
        assert.equal(short.language,undefined,"do not mislabel Finnish T12 answers as German");
        grammar++;
      }
    }
    const other=tasks.find(item=>item.id.endsWith("-T08"));
    assert.ok(other);
    assert.equal(losFutureShortAnswer(other),null);
  }
  assert.equal(reading,70);
  assert.equal(translation,70);
  assert.equal(grammar,70);
});

test("unknown and longer open responses do not masquerade as a closed grammar prompt",()=>{
  const source=losFutureExercisesFor(8,"01").find(item=>item.id.endsWith("-T12"));
  assert.ok(source);
  assert.equal(losFutureShortAnswer({...source,id:"LOS8-C01-T19"}),null);
  assert.equal(losFutureShortAnswer({...source,answerKey:"x".repeat(151)}),null);
  assert.equal(losFutureShortAnswer({...source,prompt:" "}),null);
});
