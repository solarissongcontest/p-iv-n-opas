import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureTwoPartTask,readLosFutureTwoPartAnswer,writeLosFutureTwoPartAnswer}
  from "../src/features/los/content/losFutureTwoPart.ts";

test("all 140 source T10/T13 manuscript prompts have an exact two-operation learning interaction",()=>{
  let count=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const source=losFutureExercisesFor(book.id,chapter.id);
    for(const suffix of ["T10","T13"]){
      const item=source.find(task=>task.id.endsWith("-"+suffix));
      assert.ok(item);
      const two=losFutureTwoPartTask(item);
      assert.ok(two,item.id);
      assert.equal(two.kind,suffix==="T10"?"correction":"text-b");
      assert.ok(two.sourceText.length>10);
      assert.ok(two.sourceText.length<=400);
      assert.equal(two.questions.length,2);
      assert.notEqual(two.questions[0],two.questions[1]);
      assert.equal(two.languages[1],"fi");
      assert.deepEqual(readLosFutureTwoPartAnswer("",two),["",""]);
      const partial=writeLosFutureTwoPartAnswer(two,["Ich lerne Deutsch.",""]);
      assert.deepEqual(readLosFutureTwoPartAnswer(partial,two),["Ich lerne Deutsch.",""]);
      assert.equal(writeLosFutureTwoPartAnswer(two,["",""]),"");
      assert.equal(readLosFutureTwoPartAnswer("Legacy handwritten answer",two),null);
      assert.equal(losFutureTwoPartTask(source.find(task=>task.id.endsWith("-T11"))!),null);
      count++;
    }
  }
  assert.equal(count,140);
});

test("old T10/T13 written work and source revisions are never overwritten",()=>{
  for(const [bookId,chapterId,suffix] of [[2,"01","T10"],[7,"10","T13"]] as const){
    const item=losFutureExercisesFor(bookId,chapterId).find(x=>x.id.endsWith(suffix));
    assert.ok(item);
    const original=losFutureTwoPartTask(item);assert.ok(original);
    for(const prior of ["A long old free-text answer.","{}",'{"version":1,"answers":[]}',"[]"])
      assert.equal(readLosFutureTwoPartAnswer(prior,original),null);
    const raw=writeLosFutureTwoPartAnswer(original,["Beispiel","Perustelu"]);
    assert.deepEqual(readLosFutureTwoPartAnswer(raw,original),["Beispiel","Perustelu"]);
    assert.equal(readLosFutureTwoPartAnswer(raw,{...original,sourceText:"Revised manuscript"}),null);
    assert.throws(()=>writeLosFutureTwoPartAnswer(original,[""]),/Invalid/);
    assert.throws(()=>writeLosFutureTwoPartAnswer(original,["x".repeat(601),""]),/Invalid/);
  }
});
