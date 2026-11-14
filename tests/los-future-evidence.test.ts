import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureEvidenceTask,losFutureEvidenceExcerptInSource,readLosFutureEvidenceAnswer,writeLosFutureEvidenceAnswer}
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


test("all 70 R01 excerpt fields check only exact Text A location, not response correctness",()=>{
  let tested=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const item=losFutureExercisesFor(book.id,chapter.id).find(t=>t.id.endsWith("-R01"));assert.ok(item);
    const task=losFutureEvidenceTask(item);assert.ok(task);
    const text=task.sourceText;
    const excerpt=text.slice(0,Math.min(30,text.length)).trim();
    assert.equal(losFutureEvidenceExcerptInSource(task,excerpt),true,item.id);
    // Lowercasing preserves the original ß character. Uppercasing expands ß
    // to SS (e.g. Großmutter -> GROSSMUTTER) and is not an exact excerpt.
    assert.equal(losFutureEvidenceExcerptInSource(task,excerpt.toLocaleLowerCase("de")),true,item.id);
    assert.equal(losFutureEvidenceExcerptInSource(task,""),false,item.id);
    assert.equal(losFutureEvidenceExcerptInSource(task,"Joku virke, joka ei varmasti ole lähteessä 99999."),false,item.id);
    const dialogue=losFutureExercisesFor(book.id,chapter.id).find(t=>t.id.endsWith("-T03"));assert.ok(dialogue);
    const dialogueTask=losFutureEvidenceTask(dialogue);assert.ok(dialogueTask);
    assert.equal(losFutureEvidenceExcerptInSource(dialogueTask,dialogueTask.sourceText.slice(0,20)),false);
    tested++;
  }
  assert.equal(tested,70);
});
test("evidence JSON is strictly scoped and keeps legitimate two-part learner answers",()=>{
  const item=losFutureExercisesFor(6,"04").find(t=>t.id.endsWith("-R01"));assert.ok(item);
  const task=losFutureEvidenceTask(item);assert.ok(task);
  const raw=writeLosFutureEvidenceAnswer(task,["Saksankielinen lainaukseni","Suomenkielinen perustelu"]);
  const parsed=JSON.parse(raw);
  assert.deepEqual(readLosFutureEvidenceAnswer(raw,task),["Saksankielinen lainaukseni","Suomenkielinen perustelu"]);
  for(const bad of [
    {...parsed,score:10},{...parsed,isCorrect:true},
    {...parsed,chapterId:"99"},{...parsed,sourceText:"other text"},
    {...parsed,version:2},{...parsed,id:"LOS8-C04-R01"},
    {...parsed,answers:["a",5]},{...parsed,answers:["x".repeat(701),"y"]},
  ])assert.equal(readLosFutureEvidenceAnswer(JSON.stringify(bad),task),null);
  assert.equal(readLosFutureEvidenceAnswer(" ".repeat(7001),task),null);
  assert.equal(readLosFutureEvidenceAnswer('{"__proto__":{"isCorrect":true}}',task),null);
});


test("all 70 T03 self-review models quote the first turn of each source speaker",()=>{
  let total=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const task=losFutureExercisesFor(book.id,chapter.id).find(item=>item.id.endsWith("-T03"));
    const manuscript=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];
    assert.ok(task);assert.ok(manuscript);
    const seen=new Set<string>(),firstTurns:string[]=[];
    for(const line of manuscript.dialogue){
      const speaker=line.split(":")[0]!;
      if(!seen.has(speaker)){seen.add(speaker);firstTurns.push(line);}
    }
    assert.equal(firstTurns.length,2,task.id);
    assert.match(task.answerKey,new RegExp("^"+manuscript.dialogue.length+" puheenvuoroa\\."));
    for(const first of firstTurns)assert.ok(task.answerKey.includes(first),
      task.id+" must quote the first turn of "+first.split(":")[0]);
    assert.ok(task.answerKey.includes("Suomenkielinen tulkinta:"),task.id);
    assert.ok(!task.answerKey.includes("Huomaa, että jos sama puhuja palaa"),task.id);
    assert.ok(task.answerKey.length>140,task.id);
    total++;
  }
  assert.equal(total,70);
});
