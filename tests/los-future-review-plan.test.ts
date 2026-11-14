import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureReviewPlan,losFutureReviewDraftKeys,LOS_FUTURE_REVIEW_NUMBERS}
  from "../src/features/los/losFutureReviewPlan.ts";
import {getLosFutureLesson} from "../src/features/los/content/losFutureLessons.ts";

test("all 56 non-exam LOS! 2–8 review sessions use source-bound, valid book/chapter tasks",()=>{
  let count=0;
  assert.deepEqual([...LOS_FUTURE_REVIEW_NUMBERS],[1,27,28,29,56,57,58,60]);
  for(const book of LOS_BOOKS.filter(book=>book.id>=2))for(const n of LOS_FUTURE_REVIEW_NUMBERS){
    const plan=losFutureReviewPlan(book.id,n);
    assert.ok(plan,`LOS${book.id}-L${n}`);
    assert.equal(plan.id,`LOS${book.id}-L${String(n).padStart(3,"0")}`);
    assert.equal(getLosFutureLesson(book.id,n)?.kind,"review");
    assert.ok(plan.chapter.objective);
    assert.ok(plan.chapter.grammarExplanation.length>100);
    assert.ok(plan.chapter.textB.length>10);
    assert.ok(plan.chapter.vocabulary.length>=4);
    assert.ok(plan.objective);
    const exercises=losFutureExercisesFor(book.id,plan.chapterId);
    assert.equal(plan.taskIds.length,2);
    for(const id of plan.taskIds){
      assert.ok(id.startsWith(`LOS${book.id}-C${plan.chapterId}-`));
      assert.ok(exercises.some(task=>task.id===id),`No manuscript task ${id}`);
    }
    const keys=Object.values(plan.keys);
    assert.equal(new Set(keys).size,4);
    assert.ok(keys.every(key=>key.startsWith(plan.id+":review:")));
    assert.ok(["01","05","10"].includes(plan.chapterId));
    if(n===60)assert.ok(!plan.chapter.title.includes("LOS! "+(book.id+1)));
    count++;
  }
  assert.equal(count,56);
});

test("14 unapproved book exams must never be converted to practice or importable scores",()=>{
  for(let bookId=2;bookId<=8;bookId++)for(const exam of [30,59]){
    assert.equal(losFutureReviewPlan(bookId,exam),null);
    assert.equal(getLosFutureLesson(bookId,exam)?.kind,"review");
  }
  assert.equal(losFutureReviewPlan(1,27),null);
  assert.equal(losFutureReviewPlan(9,27),null);
  assert.equal(losFutureReviewPlan(3,12),null);
  const ids=losFutureReviewDraftKeys("LOS3-L027");
  assert.equal(ids.stage,"LOS3-L027:review:stage");
  assert.equal(ids.transfer,"LOS3-L027:review:transfer");
});
