import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureRemainingTask,readLosFutureRemainingAnswer,writeLosFutureRemainingAnswer,losFutureRemainingComplete,LOS_FUTURE_WORDS_PROMPT}
  from "../src/features/los/content/losFutureRemaining.ts";

test("all 490 source T01/T15/T16/T17/T18/R04/R05 prompts have their own structured response plan",()=>{
  const expected={T01:"prediction",T15:"pronunciation",T16:"question",T17:"transform",
    T18:"writing",R04:"words",R05:"summary"};
  let count=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const manuscript=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];assert.ok(manuscript);
    const source=losFutureExercisesFor(book.id,chapter.id);
    for(const [suffix,kind] of Object.entries(expected)){
      const item=source.find(x=>x.id.endsWith("-"+suffix));assert.ok(item);
      const task=losFutureRemainingTask(item);assert.ok(task,item.id);
      assert.equal(task.kind,kind);
      assert.equal(task.id,item.id);
      assert.equal(task.prompt,item.prompt);
      assert.ok(task.sourceText.length>5);
      if(["R04","R05"].includes(suffix))assert.equal(task.sourceText,manuscript.textA);
      if(suffix==="T01")assert.equal(task.sourceText,manuscript.textA);
      assert.ok(task.fields.length>=2);
      const blank=readLosFutureRemainingAnswer("",task);assert.ok(blank);
      assert.equal(losFutureRemainingComplete(task,blank),false);
      const answers=task.fields.map(field=>field.lang==="de"?"Ich lerne Deutsch.":"Tarkistin rakenteen.");
      const stored=writeLosFutureRemainingAnswer(task,answers);
      assert.ok(stored.length<=4800,item.id+" "+stored.length);
      const restored=readLosFutureRemainingAnswer(stored,task);assert.ok(restored);
      assert.deepEqual(restored.answers,answers);
      assert.equal(losFutureRemainingComplete(task,restored),true);
      assert.equal(readLosFutureRemainingAnswer("Old handwritten student notes",task),null);
      assert.equal(readLosFutureRemainingAnswer(stored,{...task,sourceText:"revised"}),null);
      count++;
    }
  }
  assert.equal(count,490);
});

test("R05 third sentence is optional but grammar reflection and two sentences are required",()=>{
  const item=losFutureExercisesFor(8,"10").find(x=>x.id.endsWith("-R05"));assert.ok(item);
  const task=losFutureRemainingTask(item);assert.ok(task);
  assert.equal(task.fields[2]!.optional,true);
  const two=readLosFutureRemainingAnswer(
    writeLosFutureRemainingAnswer(task,["Er lernt Deutsch.","Es ist wichtig.","","Tarkistin verbin."]),task);
  assert.ok(two);assert.equal(losFutureRemainingComplete(task,two),true);
  const one=readLosFutureRemainingAnswer(
    writeLosFutureRemainingAnswer(task,["Er lernt Deutsch.","","","Tarkistin verbin."]),task);
  assert.ok(one);assert.equal(losFutureRemainingComplete(task,one),false);
});

test("malformed, cross-book, extra score fields and oversized drafts are rejected, never silently migrated",()=>{
  const item=losFutureExercisesFor(2,"01").find(x=>x.id.endsWith("-T18"));assert.ok(item);
  const task=losFutureRemainingTask(item);assert.ok(task);
  const raw=writeLosFutureRemainingAnswer(task,["Ich lerne.","Korjasin.","Ich lerne Deutsch."]);
  const data=JSON.parse(raw);
  assert.equal(readLosFutureRemainingAnswer(JSON.stringify({...data,score:100}),task),null);
  assert.equal(readLosFutureRemainingAnswer(raw,{...task,id:"LOS3-C01-T18"}),null);
  assert.throws(()=>writeLosFutureRemainingAnswer(task,["x".repeat(1701),"",""]),/Invalid/);
  assert.equal(losFutureRemainingTask(losFutureExercisesFor(2,"01").find(x=>x.id.endsWith("-T03"))!),null);
});

test("all 70 R04 tasks invite meaningful vocabulary rather than the first token, preserving legacy drafts",()=>{
  let count=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const item=losFutureExercisesFor(book.id,chapter.id).find(t=>t.id.endsWith("-R04"));
    assert.ok(item);
    assert.equal(item.prompt,LOS_FUTURE_WORDS_PROMPT);
    const task=losFutureRemainingTask(item);assert.ok(task);
    const words=task.fields.map((field,i)=>field.lang==="de"?"Freund":"Merkityksen päättely");
    const encoded=writeLosFutureRemainingAnswer(task,words);
    const previous=task.sourceText.match(/^[^\p{L}\p{N}]*([\p{L}\p{N}]+)/u)?.[1];
    assert.ok(previous);
    const oldPrompt=`Etsi päätekstistä kolme sinulle uutta sanaa. Kirjoita kukin sanayhteyteen ja selitä, mikä auttaa päättelemään merkityksen. Aloita sanasta tai ilmauksesta “${previous}” vain, jos et tunne sitä.`;
    const legacy={...JSON.parse(encoded),prompt:oldPrompt};
    const opened=readLosFutureRemainingAnswer(JSON.stringify(legacy),task);
    assert.ok(opened,item.id);
    assert.equal(opened.legacyPromptUpdated,true);
    assert.deepEqual(opened.answers,words);
    assert.equal(opened.prompt,task.prompt);
    const saved=readLosFutureRemainingAnswer(writeLosFutureRemainingAnswer(task,opened.answers),task);
    assert.ok(saved);assert.deepEqual(saved.answers,words);
    assert.equal(saved.legacyPromptUpdated,undefined);
    assert.equal(readLosFutureRemainingAnswer(
      JSON.stringify({...legacy,prompt:oldPrompt+"!"}),task),null);
    count++;
  }
  assert.equal(count,70);
});
