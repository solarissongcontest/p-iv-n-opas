import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureExitTicket,readLosFutureExitAnswer,writeLosFutureExitAnswer}
  from "../src/features/los/content/losFutureExitTicket.ts";

test("all 70 source T20 questions contain two truly separate self-check prompts",()=>{
  let count=0;
  for(const book of LOS_BOOKS.filter(item=>item.id>=2))for(const chapter of book.chapters){
    const tasks=losFutureExercisesFor(book.id,chapter.id);
    const item=tasks.find(task=>task.id.endsWith("-T20"));
    assert.ok(item);
    const ticket=losFutureExitTicket(item);
    assert.ok(ticket,item.id);
    assert.equal(ticket.questions.length,2);
    assert.notEqual(ticket.questions[0],ticket.questions[1]);
    assert.deepEqual(readLosFutureExitAnswer("",ticket),["",""]);
    const partial=writeLosFutureExitAnswer(ticket,["Ich lerne Deutsch.",""]);
    assert.deepEqual(readLosFutureExitAnswer(partial,ticket),["Ich lerne Deutsch.",""]);
    assert.deepEqual(JSON.parse(partial).answers,["Ich lerne Deutsch.",""]);
    assert.equal(writeLosFutureExitAnswer(ticket,["",""]),"");
    assert.equal(readLosFutureExitAnswer("previous handwritten essay",ticket),null);
    assert.equal(losFutureExitTicket(tasks.find(task=>task.id.endsWith("-T19"))!),null);
    const revised={questions:[ticket.questions[0],"Edited second prompt"] as const};
    assert.equal(readLosFutureExitAnswer(partial,revised),null);
    count++;
  }
  assert.equal(count,70);
});

test("an unrelated or malformed backup answer cannot be silently rewritten",()=>{
  const item=losFutureExercisesFor(7,"01").find(task=>task.id.endsWith("-T20"));
  assert.ok(item);
  const ticket=losFutureExitTicket(item);
  assert.ok(ticket);
  for(const text of ["an older answer", "{}", "[]", "null", '{"version":1,"answers":[]}'])
    assert.equal(readLosFutureExitAnswer(text,ticket),null);
  assert.throws(()=>writeLosFutureExitAnswer(ticket,[""]),/Invalid LOS exit ticket/);
  assert.throws(()=>writeLosFutureExitAnswer(ticket,["".padEnd(401,"x"),""]),/Invalid LOS exit ticket/);
});
