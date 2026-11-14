import test from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureReasoningTask,readLosFutureReasoningAnswer,writeLosFutureReasoningAnswer}
  from "../src/features/los/content/losFutureReasoning.ts";

test("all 140 T11/R03 teaching prompts keep their exact book and require rule/evidence reasoning",()=>{
  let n=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const text=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];assert.ok(text);
    for(const suffix of ["T11","R03"]){
      const task=losFutureExercisesFor(book.id,chapter.id).find(t=>t.id.endsWith("-"+suffix));
      assert.ok(task);
      const structured=losFutureReasoningTask(task);assert.ok(structured,task.id);
      assert.equal(structured.id,task.id);
      assert.equal(structured.kind,suffix==="T11"?"grammar":"claims");
      assert.equal(structured.sourceText,suffix==="T11"?text.grammarTopic:text.textA);
      assert.equal(structured.parts.length,suffix==="T11"?3:6);
      assert.equal(new Set(structured.parts.map(x=>x.label)).size,structured.parts.length);
      assert.deepEqual(readLosFutureReasoningAnswer("",structured),structured.parts.map(()=>""));
      const next=structured.parts.map((_,i)=>"Own answer "+i);
      const encoded=writeLosFutureReasoningAnswer(structured,next);
      assert.deepEqual(readLosFutureReasoningAnswer(encoded,structured),next);
      assert.equal(writeLosFutureReasoningAnswer(structured,structured.parts.map(()=>"")),"");
      assert.equal(readLosFutureReasoningAnswer("legacy handwritten answer",structured),null);
      assert.equal(readLosFutureReasoningAnswer(encoded,{...structured,sourceText:"revised source"}),null);
      n++;
    }
  }
  assert.equal(n,140);
});

test("all T11 and R03 prior drafts are protected from mismatched schema and source changes",()=>{
  const task=losFutureExercisesFor(8,"05").find(x=>x.id.endsWith("-R03"));assert.ok(task);
  const source=losFutureReasoningTask(task);assert.ok(source);
  for(const old of ["null","{}","[]","previous prose"])
    assert.equal(readLosFutureReasoningAnswer(old,source),null);
  assert.throws(()=>writeLosFutureReasoningAnswer(source,["one"]),/Invalid/);
  assert.throws(()=>writeLosFutureReasoningAnswer(source,source.parts.map(()=>"x".repeat(351))),/Invalid/);
});
