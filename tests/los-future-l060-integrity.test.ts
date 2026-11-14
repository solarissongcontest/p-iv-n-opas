import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {LOS_FUTURE_LESSONS,getLosFutureLesson} from "../src/features/los/content/losFutureLessons.ts";

test("seven LOS! L060 final summaries are grounded in the SAME book, never next module C01",()=>{
  for(let bookId=2;bookId<=8;bookId++){
    const source=LOS_FUTURE_MANUSCRIPTS[bookId]?.["10"];
    assert.ok(source,`Missing LOS! ${bookId} C10`);
    const summary=getLosFutureLesson(bookId,60);
    assert.ok(summary);
    assert.equal(summary.id,`LOS${bookId}-L060`);
    assert.equal(summary.kind,"review");
    assert.equal(summary.objective,source.objective);
    assert.equal(summary.resource.includes(`LOS! ${bookId}`),true);
    assert.equal(summary.resource.includes(`LOS${bookId+1}-C01`),false);
    assert.equal(summary.model,source.dialogue.slice(0,2).join("\n"));
    assert.equal(summary.guidance,source.grammarExplanation);
    assert.ok(summary.reviewTeaching.includes(source.grammarTopic));
    assert.ok(summary.reviewTask.includes(`LOS! ${bookId}`));
    assert.doesNotMatch([summary.model,summary.guidance,summary.resource,summary.reviewTeaching,summary.reviewTask].join(" "),new RegExp(`LOS${bookId+1}-C01`));
    assert.ok(summary.reviewRule.includes("älä näytä koevastauksia"));
    assert.equal(getLosFutureLesson(bookId,59)?.kind,"review");
    assert.notEqual(getLosFutureLesson(bookId,59)?.reviewTeaching,summary.reviewTeaching);
    assert.equal(getLosFutureLesson(bookId,58),LOS_FUTURE_LESSONS[bookId]?.["058"],
      "other lesson source manuscripts must remain immutable");
  }
});
