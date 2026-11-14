import test from "node:test";
import assert from "node:assert/strict";
import { LOS_BOOKS } from "../src/features/los/catalog.ts";
import { losFutureExercisesFor } from "../src/features/los/content/losFutureExercises.ts";
import { losFutureGapParts } from "../src/features/los/content/losFutureGap.ts";

test("all 70 sourced T07 tasks have exactly one rendered blank with their original answer IDs",()=>{
  let count=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const exercises=losFutureExercisesFor(book.id,chapter.id);
    const gap=exercises.find(t=>t.id.endsWith("-T07"));
    assert.ok(gap,book.id+":"+chapter.id);
    const parsed=losFutureGapParts(gap);
    assert.ok(parsed,gap.id);
    assert.equal(parsed.before.includes("_____"),false);
    assert.equal(parsed.after.includes("_____"),false);
    assert.equal(parsed.before+gap.answerKey+parsed.after,gap.prompt.slice("Täydennä puuttuva sana: ".length));
    assert.equal(losFutureGapParts(exercises.find(t=>t.id.endsWith("-T08"))!),null);
    count++;
  }
  assert.equal(count,70);
});
test("a required comma in a manuscript gap is preserved, never silently sanitized",()=>{
  const row=losFutureExercisesFor(5,"07").find(t=>t.id==="LOS5-C07-T07");
  assert.ok(row);
  assert.equal(row.answerKey,"denke,");
  assert.deepEqual(losFutureGapParts(row),{before:"Ich ",after:" dass Pausen wichtig sind."});
});
