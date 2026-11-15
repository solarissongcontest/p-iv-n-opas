import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureRemainingTask,readLosFutureRemainingAnswer,writeLosFutureRemainingAnswer}
  from "../src/features/los/content/losFutureRemaining.ts";

/** Hand-checked content anchors, not automated German proofreading. */
const ANCHORS:Record<number,readonly string[]>={
  2:["Mira","Lena","Nico","Anna","Paul","Greta","Mara","Sofia","Tom","Mira"],
  3:["Mia","Noah","Sportverein","Sara","Leonie","Paul","Jana","Kino","Dresden","Klasse"],
  4:["Deutsch","Lena","Timo","Mara","Sofia","Anna","Tom","Mara","Mia","Leo"],
  5:["Mila","Jonas","Lena","Ali","Nora","David","Lisa","Paul","Emma","Jugendlichen"],
  6:["Kultur","Nina","Ben","Lia","Gemälde","Ausstellung","Amir","Lea","Quellen","Mia"],
  7:["Lina","Sofia","Tom","Anna","Jugendlichen","Emma","Nora","Paul","Mia","Karim"],
  8:["Mira","Paul","Klasse","Park","Lina","Schule","Emma","Jugendgruppe","Klasse","Leo"],
};
const PREFIX="Saksankielinen malliluonnos (2 virkettä; ei vielä kielentarkistettu):";
const RUBRIC="Tarkista oman vastauksesi pääasia ja kappaleen kielioppirakenne. Myös muut lähdetekstiin perustuvat muotoilut voivat olla oikein.";

test("all 70 R05 summaries provide two chapter-specific German model sentences and an honest rubric",()=>{
  const unique=new Set<string>();
  let count=0;
  for(const book of LOS_BOOKS.filter(x=>x.id>=2))for(const chapter of book.chapters){
    const item=losFutureExercisesFor(book.id,chapter.id).find(x=>x.id.endsWith("-R05"));
    const manuscript=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];
    assert.ok(item);assert.ok(manuscript);
    const lines=item.answerKey.split("\n");
    assert.equal(lines.length,3,item.id);
    assert.equal(lines[0],PREFIX,item.id);
    assert.equal(lines[2],RUBRIC,item.id);
    const german=lines[1]!;
    const sentences=german.match(/[^.!?]+[.!?](?:\s|$)/gu)??[];
    assert.equal(sentences.length,2,item.id);
    assert.ok(german.length>=65&&german.length<=480,item.id);
    const anchor=ANCHORS[book.id]?.[Number(chapter.id)-1];
    assert.ok(anchor,item.id);
    assert.ok(manuscript.textA.includes(anchor),item.id+" anchor missing from Text A");
    assert.ok(german.includes(anchor),item.id+" topic anchor missing from model");
    assert.ok(!unique.has(german),"A single generic summary must not be reused across chapters");
    unique.add(german);
    const task=losFutureRemainingTask(item);assert.ok(task);
    assert.equal(task.kind,"summary");
    assert.equal(task.sourceText,manuscript.textA);
    const own=["Ich beschreibe die Geschichte.","Ich nenne das Wichtigste.","","Ich prüfe meine Sätze."];
    const raw=writeLosFutureRemainingAnswer(task,own);
    const saved=readLosFutureRemainingAnswer(raw,task);assert.ok(saved);
    assert.deepEqual(saved.answers,own,"New answer models must never overwrite local student prose");
    count++;
  }
  assert.equal(count,70);
  assert.equal(unique.size,70);
});
