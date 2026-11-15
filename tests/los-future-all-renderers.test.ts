import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureExercisesForSection} from "../src/features/los/content/losFutureExerciseSections.ts";
import {losFutureMatchingPairs} from "../src/features/los/content/losFutureMatching.ts";
import {losFutureGapParts} from "../src/features/los/content/losFutureGap.ts";
import {losFutureRecallPairs} from "../src/features/los/content/losFutureRecall.ts";
import {losFutureExitTicket} from "../src/features/los/content/losFutureExitTicket.ts";
import {losFutureShortAnswer} from "../src/features/los/content/losFutureShortAnswer.ts";
import {losFutureOrderingTiles} from "../src/features/los/content/losFutureOrdering.ts";
import {losFutureEvidenceTask} from "../src/features/los/content/losFutureEvidence.ts";
import {losFutureTwoPartTask} from "../src/features/los/content/losFutureTwoPart.ts";
import {losFutureReasoningTask} from "../src/features/los/content/losFutureReasoning.ts";
import {losFutureFourTurnTask} from "../src/features/los/content/losFutureFourTurn.ts";
import {losFutureSpanGenreTask} from "../src/features/los/content/losFutureSpanGenre.ts";
import {losFutureRemainingTask} from "../src/features/los/content/losFutureRemaining.ts";

const parsers=[
  ["matching",losFutureMatchingPairs],["gap",losFutureGapParts],
  ["recall",losFutureRecallPairs],["exit-ticket",losFutureExitTicket],
  ["short-answer",losFutureShortAnswer],["ordering",losFutureOrderingTiles],
  ["evidence",losFutureEvidenceTask],["two-part",losFutureTwoPartTask],
  ["reasoning",losFutureReasoningTask],["four-turn",losFutureFourTurnTask],
  ["span-genre",losFutureSpanGenreTask],["remaining",losFutureRemainingTask],
] as const;
const expected:Record<string,number>={
  matching:70,gap:70,recall:70,"exit-ticket":70,
  "short-answer":210,ordering:140,evidence:140,"two-part":140,
  reasoning:140,"four-turn":140,"span-genre":140,remaining:490,
};
test("exactly one source-authored interactive renderer covers every one of 1820 LOS! 2–8 exercises",()=>{
  const counts:Record<string,number>=Object.fromEntries(parsers.map(([name])=>[name,0]));
  const all=new Set<string>();
  let chapters=0,total=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const tasks=losFutureExercisesFor(book.id,chapter.id);
    assert.equal(tasks.length,26,book.id+"-"+chapter.id);
    const sourceModes=["understand","practice","apply"] as const;
    assert.deepEqual(sourceModes.map(mode=>
      losFutureExercisesForSection(tasks,mode).length),[9,14,3]);
    for(const task of tasks){
      assert.ok(!all.has(task.id),"Duplicate source id "+task.id);
      all.add(task.id);
      const matches=parsers.filter(([,parser])=>parser(task)!==null).map(([name])=>name);
      assert.deepEqual(matches.length,1,"Uncovered or ambiguous task "+task.id+" "+matches.join(", "));
      counts[matches[0]!]=(counts[matches[0]!]??0)+1;
      total++;
    }
    chapters++;
  }
  assert.equal(chapters,70);
  assert.equal(total,1820);
  assert.deepEqual(counts,expected);
});
test("all 70 T15 oral-reading exercises show only German source lines, never pretend to supply audio",()=>{
  for(let bookId=2;bookId<=8;bookId++)for(let index=1;index<=10;index++){
    const ch=String(index).padStart(2,"0");
    const source=losFutureExercisesFor(bookId,ch).find(t=>t.id.endsWith("-T15"));
    assert.ok(source);
    const plan=losFutureRemainingTask(source);assert.ok(plan);
    assert.equal(plan.kind,"pronunciation");
    assert.equal(plan.sourceText.split("\n").length,2);
    assert.ok(!plan.sourceText.includes("Ääntämisen mallia"));
    assert.ok(plan.sourceText.includes(" "));
  }
});
