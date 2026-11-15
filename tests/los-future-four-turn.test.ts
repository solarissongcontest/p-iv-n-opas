import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureFourTurnTask,readLosFutureFourTurnAnswer,writeLosFutureFourTurnAnswer}
  from "../src/features/los/content/losFutureFourTurn.ts";

test("all 140 T19/R06 source scenarios require four separate dialogue turns",()=>{
  let count=0;
  for(const book of LOS_BOOKS.filter(book=>book.id>=2))for(const chapter of book.chapters){
    for(const suffix of ["T19","R06"]){
      const task=losFutureExercisesFor(book.id,chapter.id).find(x=>x.id.endsWith("-"+suffix));
      assert.ok(task);
      const plan=losFutureFourTurnTask(task);assert.ok(plan,task.id);
      assert.equal(plan.id,task.id);
      assert.equal(plan.kind,suffix==="T19"?"simulation":"dialogue-production");
      assert.equal(plan.labels.length,4);
      assert.deepEqual(readLosFutureFourTurnAnswer("",plan),["","","",""]);
      const sample=["Hallo","Guten Tag","Wie geht es dir?","Danke, gut."];
      const raw=writeLosFutureFourTurnAnswer(plan,sample);
      assert.deepEqual(readLosFutureFourTurnAnswer(raw,plan),sample);
      assert.equal(writeLosFutureFourTurnAnswer(plan,["","","",""]),"");
      assert.equal(readLosFutureFourTurnAnswer("Old free text",plan),null);
      assert.equal(readLosFutureFourTurnAnswer(raw,{...plan,prompt:"revised"}),null);
      count++;
    }
  }
  assert.equal(count,140);
});

test("four turn answers cannot silently overwrite earlier legacy or corrupted data",()=>{
  const source=losFutureExercisesFor(8,"10").find(x=>x.id.endsWith("-R06"));assert.ok(source);
  const plan=losFutureFourTurnTask(source);assert.ok(plan);
  assert.equal(readLosFutureFourTurnAnswer("not JSON",plan),null);
  assert.equal(readLosFutureFourTurnAnswer('{"version":1,"answers":[]}',plan),null);
  assert.throws(()=>writeLosFutureFourTurnAnswer(plan,["one"]),/Invalid/);
  assert.throws(()=>writeLosFutureFourTurnAnswer(plan,["x".repeat(451),"b","c","d"]),/Invalid/);
});
