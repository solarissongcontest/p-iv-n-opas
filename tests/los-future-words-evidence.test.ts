import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureRemainingTask,readLosFutureRemainingAnswer,writeLosFutureRemainingAnswer}
  from "../src/features/los/content/losFutureRemaining.ts";
import {losFutureContainsSourcePhrase,losFutureWordsEvidenceStatus}
  from "../src/features/los/content/losFutureWordsEvidence.ts";

test("70 R04 chapters give literal source evidence feedback while retaining full written drafts",()=>{
  let checked=0;
  for(const book of LOS_BOOKS.filter(book=>book.id>=2))for(const chapter of book.chapters){
    const manuscript=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];
    assert.ok(manuscript);
    const item=losFutureExercisesFor(book.id,chapter.id).find(task=>task.id.endsWith("-R04"));
    assert.ok(item);
    const task=losFutureRemainingTask(item);assert.ok(task);
    const tokens=[...manuscript.textA.matchAll(/\p{L}+/gu)];
    assert.ok(tokens.length>=8,item.id);
    const chosen=tokens.slice(0,8).filter((token,i,list)=>
      list.findIndex(other=>other[0].toLocaleLowerCase("de")===token[0].toLocaleLowerCase("de"))===i
    ).slice(0,3);
    assert.equal(chosen.length,3,item.id);
    const context=manuscript.textA.slice(tokens[0]!.index!,tokens[7]!.index!+tokens[7]![0].length);
    assert.ok(context.length<=180,item.id);
    const answers=chosen.flatMap(token=>[token[0],context,"Päättelin sanan merkityksen asiayhteydestä."]);
    for(let slot=0;slot<3;slot++)
      assert.equal(losFutureWordsEvidenceStatus(task,answers,slot),"located",
        `${item.id}: sana ${slot+1} pitäisi löytyä`);
    const serialized=writeLosFutureRemainingAnswer(task,answers);
    const restored=readLosFutureRemainingAnswer(serialized,task);assert.ok(restored);
    assert.deepEqual(restored.answers,answers);
    assert.equal(losFutureWordsEvidenceStatus(task,restored.answers,1),"located");
    checked++;
  }
  assert.equal(checked,70);
});

test("R04 exact-source checks respect German letter boundaries and reject invented snippets",()=>{
  assert.equal(losFutureContainsSourcePhrase("Wir wohnen in Finnland.","in"),true);
  assert.equal(losFutureContainsSourcePhrase("Wir kennen Finnland.","in"),false,
    "A short word must not match the interior of Finnland");
  assert.equal(losFutureContainsSourcePhrase("Ich spreche Deutsch.","deutsch"),true);
  assert.equal(losFutureContainsSourcePhrase("Wir lernen Wörter.","Wort"),false);
  assert.equal(losFutureContainsSourcePhrase("Mira sagt: „Guten Tag!“","Guten\nTag"),true);
  assert.equal(losFutureContainsSourcePhrase("Ein schöner Tag.","schoner"),false,
    "German diacritics must not be silently removed");
  const item=losFutureExercisesFor(2,"01").find(task=>task.id.endsWith("-R04"));
  assert.ok(item);
  const original=losFutureRemainingTask(item);assert.ok(original);
  const task={...original,sourceText:"Mira besucht Bonn. Jonas wohnt in Bonn."};
  const complete=(word:string,excerpt:string)=>[word,excerpt,"Selitys"];
  assert.equal(losFutureWordsEvidenceStatus(task,complete("Nora","Mira besucht Bonn."),0),"word-not-found");
  assert.equal(losFutureWordsEvidenceStatus(task,complete("Mira","Mira wohnt in Bonn."),0),"excerpt-not-found");
  assert.equal(losFutureWordsEvidenceStatus(task,complete("Jonas","Mira besucht Bonn."),0),"word-outside-excerpt");
  assert.equal(losFutureWordsEvidenceStatus(task,complete("Mira","Mira besucht Bonn."),0),"located");
  const duplicated=[...complete("Mira","Mira besucht Bonn."),...complete("mira","Mira besucht Bonn."),
    ...complete("Jonas","Jonas wohnt in Bonn.")];
  assert.equal(losFutureWordsEvidenceStatus(task,duplicated,1),"duplicate-word");
  assert.equal(losFutureWordsEvidenceStatus(task,duplicated,2),"located");
  assert.equal(losFutureWordsEvidenceStatus(task,["",""],0),null);
  assert.equal(losFutureWordsEvidenceStatus(task,complete("Mira","Mira besucht Bonn."),3),null);
});
