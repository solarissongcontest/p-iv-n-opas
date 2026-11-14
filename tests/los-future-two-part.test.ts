import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {losFutureTwoPartTask,readLosFutureTwoPartAnswer,writeLosFutureTwoPartAnswer}
  from "../src/features/los/content/losFutureTwoPart.ts";

test("all 140 source T10/T13 manuscript prompts have an exact two-operation learning interaction",()=>{
  let count=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const source=losFutureExercisesFor(book.id,chapter.id);
    for(const suffix of ["T10","T13"]){
      const item=source.find(task=>task.id.endsWith("-"+suffix));
      assert.ok(item);
      const two=losFutureTwoPartTask(item);
      assert.ok(two,item.id);
      assert.equal(two.kind,suffix==="T10"?"correction":"text-b");
      assert.equal(typeof two.styleOnly,"boolean");
      assert.ok(two.sourceText.length>10);
      assert.ok(two.sourceText.length<=400);
      assert.ok(two.readingText.length>0);
      if(two.kind==="correction")assert.equal(two.readingText,two.sourceText);
      assert.equal(two.questions.length,2);
      assert.notEqual(two.questions[0],two.questions[1]);
      assert.equal(two.languages[1],"fi");
      assert.deepEqual(readLosFutureTwoPartAnswer("",two),["",""]);
      const partial=writeLosFutureTwoPartAnswer(two,["Ich lerne Deutsch.",""]);
      assert.deepEqual(readLosFutureTwoPartAnswer(partial,two),["Ich lerne Deutsch.",""]);
      assert.equal(writeLosFutureTwoPartAnswer(two,["",""]),"");
      assert.equal(readLosFutureTwoPartAnswer("Legacy handwritten answer",two),null);
      assert.equal(losFutureTwoPartTask(source.find(task=>task.id.endsWith("-T11"))!),null);
      count++;
    }
  }
  assert.equal(count,140);
});

test("old T10/T13 written work and source revisions are never overwritten",()=>{
  for(const [bookId,chapterId,suffix] of [[2,"01","T10"],[7,"10","T13"]] as const){
    const item=losFutureExercisesFor(bookId,chapterId).find(x=>x.id.endsWith(suffix));
    assert.ok(item);
    const original=losFutureTwoPartTask(item);assert.ok(original);
    for(const prior of ["A long old free-text answer.","{}",'{"version":1,"answers":[]}',"[]"])
      assert.equal(readLosFutureTwoPartAnswer(prior,original),null);
    const raw=writeLosFutureTwoPartAnswer(original,["Beispiel","Perustelu"]);
    assert.deepEqual(readLosFutureTwoPartAnswer(raw,original),["Beispiel","Perustelu"]);
    assert.equal(readLosFutureTwoPartAnswer(raw,{...original,sourceText:"Revised manuscript"}),null);
    assert.throws(()=>writeLosFutureTwoPartAnswer(original,[""]),/Invalid/);
    assert.throws(()=>writeLosFutureTwoPartAnswer(original,["x".repeat(601),""]),/Invalid/);
  }
});


test("all 70 Text B responses provide two chapter-specific Finnish model observations",()=>{
  let count=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const task=losFutureExercisesFor(book.id,chapter.id).find(t=>t.id.endsWith("-T13"));
    assert.ok(task);
    assert.ok(task.prompt.includes("Kirjoita kaksi havaintoa suomeksi."),task.id);
    assert.match(task.answerKey,/^Mallihavainnot: 1\. .+ 2\. .+ Myös muut Text B:stä perusteltavat havainnot voivat olla oikein\.$/u,task.id);
    assert.doesNotMatch(task.answerKey,/Alkuperäinen Text B:|Mallin hyväksyntä riippuu/u,task.id);
    const parsed=losFutureTwoPartTask(task);assert.ok(parsed);
    assert.equal(parsed.kind,"text-b");
    const manuscript=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];assert.ok(manuscript);
    const oldSource="Lue Text B: "+manuscript.textB+". Etsi siitä kaksi konkreettista asiaa";
    const extracted=oldSource.slice("Lue Text B: ".length,oldSource.indexOf(". Etsi siitä")+1).trim();
    assert.equal(parsed.sourceText,extracted,"prompt revision must preserve source identity");
    assert.equal(parsed.readingText,manuscript.textB,"render the actual manuscript, not the delimiter period");
    assert.equal(parsed.sourceText,manuscript.textB+".","old draft source identity stays unchanged");
    const oldSaved=JSON.stringify({version:1,kind:"text-b",sourceText:parsed.sourceText,
      answers:["Aiempi tekstihavainto","Aiempi tulkinta"]});
    assert.deepEqual(readLosFutureTwoPartAnswer(oldSaved,parsed),
      ["Aiempi tekstihavainto","Aiempi tulkinta"]);
    if(book.id===5&&chapter.id==="06")assert.match(task.answerKey,/pieni|kävely/iu);
    if(book.id===8&&chapter.id==="05")assert.match(task.answerKey,/lähdettä ei ilmoiteta/iu);
    count++;
  }
  assert.equal(count,70);
});


test("strict T10/T13 draft decoding rejects forged fields, malformed types and oversized JSON",()=>{
  for(const [bookId,chapterId,suffix] of [[2,"01","T10"],[8,"05","T13"]] as const){
    const task=losFutureExercisesFor(bookId,chapterId).find(item=>item.id.endsWith("-"+suffix));
    assert.ok(task);
    const parsed=losFutureTwoPartTask(task);assert.ok(parsed);
    const oldSaved=writeLosFutureTwoPartAnswer(parsed,["Oma vastaukseni","Oma perusteluni"]);
    const model=JSON.parse(oldSaved);
    assert.deepEqual(readLosFutureTwoPartAnswer(oldSaved,parsed),
      ["Oma vastaukseni","Oma perusteluni"]);
    for(const forged of [
      {...model,score:10},{...model,isCorrect:true},
      {...model,questionId:"LOS8-C10-T13"},
      {...model,sourceText:parsed.sourceText+" muuta"},
      {...model,version:2},{...model,kind:"other"},
      {...model,answers:["Yksi"]},{...model,answers:["a",4]},
      {...model,answers:["a".repeat(601),"b"]},
    ])assert.equal(readLosFutureTwoPartAnswer(JSON.stringify(forged),parsed),null);
    assert.equal(readLosFutureTwoPartAnswer(" ".repeat(5001),parsed),null);
    assert.equal(readLosFutureTwoPartAnswer('{"__proto__":true}',parsed),null);
  }
});


test("four stylistic T10 exercises do not falsely mark allowable German as categorical errors",()=>{
  const styleCases=new Map([
    ["LOS7-C03-T10","Ich muss lernen für die Prüfung."],
    ["LOS7-C06-T10","Sie müssen arbeiten am Wochenende."],
    ["LOS7-C09-T10","Gestern habe ich gearbeitet im Café."],
    ["LOS8-C02-T10","Ich lese Nachrichten oft jeden Tag."],
  ]);
  let corrected=0,remaining=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const task=losFutureExercisesFor(book.id,chapter.id).find(t=>t.id.endsWith("-T10"));
    assert.ok(task);
    const two=losFutureTwoPartTask(task);assert.ok(two);
    assert.equal(two.kind,"correction");
    assert.equal(two.readingText,two.sourceText);
    if(styleCases.has(task.id)){
      assert.equal(two.styleOnly,true,task.id);
      assert.equal(two.sourceText,styleCases.get(task.id));
      assert.equal(task.title,"Hio ilmaus yleiskieliseksi");
      assert.ok(!task.prompt.includes("Korjaa virheellinen lause"));
      assert.ok(!task.answerKey.includes("Korjauksen perustelu:"));
      assert.match(task.answerKey,/Yleiskielinen malli:|Täsmällisempi ja luontevampi malli:/u);
      corrected++;
    }else{
      assert.equal(two.styleOnly,false,task.id);
      assert.equal(task.title,"Korjaa oppijan kielivirhe");
      remaining++;
    }
    const oldSave=JSON.stringify({version:1,kind:"correction",sourceText:two.sourceText,
      answers:["Vanha korjaus saksaksi","Vanha perustelu suomeksi"]});
    assert.deepEqual(readLosFutureTwoPartAnswer(oldSave,two),
      ["Vanha korjaus saksaksi","Vanha perustelu suomeksi"],
      task.id+" must retain the original source identity");
  }
  assert.equal(corrected,4);
  assert.equal(remaining,66);
});
