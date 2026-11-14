import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureSpanGenreTask,readLosFutureSpanGenreAnswer,writeLosFutureSpanGenreAnswer,
  losFutureExcerptInTurn,losFutureSpanGenreComplete}
  from "../src/features/los/content/losFutureSpanGenre.ts";
test("70 T04 and 70 T14 tasks have exact source lines, safe models and two saved answers",()=>{
  let total=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const manuscript=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];assert.ok(manuscript);
    const tasks=losFutureExercisesFor(book.id,chapter.id);
    for(const kind of ["T04","T14"]){
      const item=tasks.find(x=>x.id.endsWith("-"+kind));assert.ok(item);
      const form=losFutureSpanGenreTask(item);assert.ok(form,item.id);
      assert.deepEqual(form.dialogue,manuscript.dialogue);
      assert.equal(form.textB,kind==="T04"?"":manuscript.textB);
      assert.equal(form.kind,kind==="T04"?"span":"genre");
      const empty=readLosFutureSpanGenreAnswer("",form);assert.ok(empty);
      assert.deepEqual(empty.answers,["",""]);
      assert.equal(losFutureSpanGenreComplete(form,empty),false);
      const index=kind==="T04"?0:null;
      const words=[kind==="T04"?manuscript.dialogue[0]!.slice(0,5):"Eri vastaanottajat",
        "Perustelen erot suomeksi."];
      const saved=writeLosFutureSpanGenreAnswer(form,index,words);
      assert.ok(saved.length<4700);
      const parsed=readLosFutureSpanGenreAnswer(saved,form);assert.ok(parsed);
      assert.deepEqual(parsed.answers,words);
      assert.equal(losFutureSpanGenreComplete(form,parsed),true);
      assert.equal(readLosFutureSpanGenreAnswer("Earlier student's prose",form),null);
      assert.equal(readLosFutureSpanGenreAnswer(saved,{...form,prompt:"Edited"}),null);
      if(kind==="T04"){
        assert.ok(losFutureExcerptInTurn(form,parsed));
        assert.equal(losFutureSpanGenreComplete(form,
          {...parsed,answers:["phrase not found",words[1]!]}),false);
      }
      total++;
    }
  }
  assert.equal(total,140);
});
test("tampering and forged grades cannot be imported as a structured answer",()=>{
  const item=losFutureExercisesFor(2,"01").find(x=>x.id.endsWith("-T04"));assert.ok(item);
  const form=losFutureSpanGenreTask(item);assert.ok(form);
  const raw=writeLosFutureSpanGenreAnswer(form,0,["Hallo","Perustelu"]);
  const data=JSON.parse(raw);
  assert.equal(readLosFutureSpanGenreAnswer(JSON.stringify({...data,score:9}),form),null);
  assert.equal(readLosFutureSpanGenreAnswer(JSON.stringify({...data,selection:999}),form),null);
  assert.throws(()=>writeLosFutureSpanGenreAnswer(form,999,["Hallo","Perustelu"]),/Invalid/);
  assert.throws(()=>writeLosFutureSpanGenreAnswer(form,0,["x".repeat(501),""]),/Invalid/);
});
