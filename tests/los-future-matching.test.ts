import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureMatchingPairs,readLosFutureMatchingAnswer,writeLosFutureMatchingAnswer} from "../src/features/los/content/losFutureMatching.ts";

test("70 source matching tasks use one deterministic reusable option set, ambiguous pairs remain ungraded text",()=>{
  let total=0,interactive=0,ambiguous=0;
  for(const book of LOS_BOOKS.filter(book=>book.id>=2))for(const ch of book.chapters){
    const task=losFutureExercisesFor(book.id,ch.id).find(t=>t.id.endsWith("-T05"));
    assert.ok(task);
    total++;
    const pairs=losFutureMatchingPairs(task);
    if(!pairs){
      ambiguous++;
      assert.ok(task.answerKey.includes(" = "));
      continue;
    }
    interactive++;
    assert.equal(pairs.length,4);
    assert.deepEqual(readLosFutureMatchingAnswer("",pairs),["","","",""]);
    const partial=writeLosFutureMatchingAnswer(pairs,[pairs[1]!.fi,"","",""]);
    assert.deepEqual(readLosFutureMatchingAnswer(partial,pairs),[pairs[1]!.fi,"","",""]);
    assert.equal(readLosFutureMatchingAnswer("old learner prose that must not be lost",pairs),null);
    const complete=writeLosFutureMatchingAnswer(pairs,pairs.map(x=>x.fi));
    assert.deepEqual(readLosFutureMatchingAnswer(complete,pairs),pairs.map(x=>x.fi));
    assert.equal(writeLosFutureMatchingAnswer(pairs,["","","",""]),"");
  }
  assert.equal(total,70);
  assert.equal(interactive,66);
  assert.equal(ambiguous,4);
});

test("matching interface keeps existing chapter-draft persistence and has no scoring",()=>{
  const ui=readFileSync("src/features/los/LosFutureExercises.tsx","utf8");
  assert.match(ui,/useLosChapterDraft\(bookId,chapterId\)/);
  assert.match(ui,/writeLosFutureMatchingAnswer\(matchingPairs,next\)/);
  assert.match(ui,/Yhdistä saksan sana ja sen merkitys/);
  assert.match(ui,/matchingPairs && matchingSelection/);
  assert.doesNotMatch(ui,/testSubmittedAt:\s*new Date/);
});
