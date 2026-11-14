import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureEvidenceTask,readLosFutureEvidenceAnswer,writeLosFutureEvidenceAnswer}
  from "../src/features/los/content/losFutureEvidence.ts";

test("70 source dialogues and 70 source text-evidence questions are mapped to their own chapter",()=>{
  let count=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const source=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];
    assert.ok(source);
    const tasks=losFutureExercisesFor(book.id,chapter.id);
    for(const suffix of ["T03","R01"]){
      const task=tasks.find(x=>x.id.endsWith("-"+suffix));
      assert.ok(task);
      const prompt=losFutureEvidenceTask(task);
      assert.ok(prompt,task.id);
      assert.equal(prompt.id,task.id);
      assert.equal(prompt.kind,suffix==="T03"?"dialogue":"text-evidence");
      assert.equal(prompt.sourceText,suffix==="T03"?source.dialogue.join("\n"):source.textA);
      assert.ok(prompt.sourceText.length>20);
      assert.equal(prompt.questions.length,2);
      assert.notEqual(prompt.questions[0],prompt.questions[1]);
      assert.deepEqual(readLosFutureEvidenceAnswer("",prompt),["",""]);
      const partial=writeLosFutureEvidenceAnswer(prompt,["Beispiel",""]);
      assert.deepEqual(readLosFutureEvidenceAnswer(partial,prompt),["Beispiel",""]);
      assert.equal(writeLosFutureEvidenceAnswer(prompt,["",""]),"");
      assert.equal(readLosFutureEvidenceAnswer("Older paragraph",prompt),null);
      assert.equal(readLosFutureEvidenceAnswer(partial,{...prompt,sourceText:"Updated text"}),null);
      count++;
    }
    assert.equal(losFutureEvidenceTask(tasks.find(x=>x.id.endsWith("-R03"))!),null);
  }
  assert.equal(count,140);
});

test("legacy evidence submissions never disappear if source text or JSON schema changes",()=>{
  const item=losFutureExercisesFor(8,"10").find(x=>x.id.endsWith("-R01"));assert.ok(item);
  const evidence=losFutureEvidenceTask(item);assert.ok(evidence);
  for(const legacy of ["My earlier long-form answer","null","[]","{}",'{"version":1,"answers":["x"]}'])
    assert.equal(readLosFutureEvidenceAnswer(legacy,evidence),null);
  const answer=writeLosFutureEvidenceAnswer(evidence,["Das ist mein Beleg.","Tämä kertoo tilanteesta."]);
  assert.deepEqual(readLosFutureEvidenceAnswer(answer,evidence),["Das ist mein Beleg.","Tämä kertoo tilanteesta."]);
  assert.throws(()=>writeLosFutureEvidenceAnswer(evidence,[""]),/Invalid/);
  assert.throws(()=>writeLosFutureEvidenceAnswer(evidence,["x".repeat(701),"."]),/Invalid/);
});
