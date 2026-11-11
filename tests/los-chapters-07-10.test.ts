import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_BOOKS } from "../src/features/los/catalog.ts";
import { LOS_EXERCISES, losExercisesFor, losIsCorrect, losScore } from "../src/features/los/exerciseBank.ts";

const counts:Record<string,number>={"07":15,"08":12,"09":14,"10":20};
const vocabCounts:Record<string,number>={"07":16,"08":17,"09":17,"10":16};

test("C07–C10 have precisely 61 deterministic, keyed, scored tasks",()=>{
  assert.equal(LOS_EXERCISES.length,147);
  assert.equal(new Set(LOS_EXERCISES.map(item=>item.id)).size,147);
  assert.equal(Object.values(counts).reduce((total,n)=>total+n,0),61);
  for(const [id,count] of Object.entries(counts)){
    const items=losExercisesFor(id);
    assert.equal(items.length,count,id);
    assert.ok(items.some(item=>item.kind==="fill"),id);
    for(const item of items) {
      assert.match(item.id,new RegExp("^C"+id+"-EX-[0-9]{2}$"));
      assert.equal(item.chapterId,id);
      assert.ok(item.prompt.length>10,item.id);
      assert.ok(item.explanation.length>=15,item.id);
      assert.ok(item.accepted.includes(item.correct),item.id);
      assert.equal(losIsCorrect(item,item.correct),true,item.id);
      if(item.kind==="choice"){
        assert.equal(item.options?.length,3,item.id);
        assert.equal(new Set(item.options).size,3,item.id);
        assert.ok(item.options?.includes(item.correct),item.id);
      }
    }
    const full=Object.fromEntries(items.map(item=>[item.id,item.correct]));
    assert.deepEqual(losScore(id,full),{correct:count,total:count});
    assert.deepEqual(losScore(id,{}),{correct:0,total:count});
  }
});

test("C07–C10 glossary count follows the per-book specification",()=>{
  const book=LOS_BOOKS.find(item=>item.id===1);
  assert.ok(book);
  for(const [id,count] of Object.entries(vocabCounts)){
    const chapter=book.chapters.find(item=>item.id===id);
    assert.ok(chapter);
    assert.equal(chapter.vocabulary.length,count,id);
    for(const entry of chapter.vocabulary){
      const delimiter=entry.indexOf(" – ");
      assert.ok(delimiter>0 && delimiter<entry.length-4,entry);
    }
  }
});

test("German spellings, school phrases, times and conjugations do not accept wrong forms",()=>{
  const get=(id:string)=>{
    const item=LOS_EXERCISES.find(item=>item.id===id);
    assert.ok(item,id);
    return item;
  };
  assert.equal(losIsCorrect(get("C07-EX-09"),"heißt"),true);
  assert.equal(losIsCorrect(get("C07-EX-09"),"heisst"),false);
  assert.equal(losIsCorrect(get("C07-EX-14"),"buchstabieren"),true);
  assert.equal(losIsCorrect(get("C07-EX-14"),"buchstabier"),false);
  assert.equal(losIsCorrect(get("C08-EX-11"),"verstehe"),true);
  assert.equal(losIsCorrect(get("C08-EX-11"),"versteht"),false);
  assert.equal(losIsCorrect(get("C09-EX-13"),"am"),true);
  assert.equal(losIsCorrect(get("C09-EX-13"),"um"),false);
  assert.equal(losIsCorrect(get("C09-EX-14"),"um"),true);
  assert.equal(losIsCorrect(get("C09-EX-14"),"am"),false);
  assert.equal(losIsCorrect(get("C10-EX-03"),"heiße"),true);
  assert.equal(losIsCorrect(get("C10-EX-03"),"heisse"),false);
  assert.equal(losIsCorrect(get("C10-EX-10"),"kommt"),true);
  assert.equal(losIsCorrect(get("C10-EX-10"),"kommst"),false);
});

test("C07–C10 unscored production requires meaningful separate efforts",()=>{
  const supplement=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
  const workbook=readFileSync("src/features/los/LosWorkbook.tsx","utf8");
  assert.match(supplement,/kahdeksan kuvitteellista etunimeä/);
  assert.match(supplement,/neljä erillistä NUMEROJONOA/);
  assert.match(supplement,/kolme lyhyttä itse kirjoitettua luokkahuonedialogia/);
  assert.match(supplement,/seitsemän kuvitteellista kalenterimerkintää/);
  assert.match(supplement,/kaksi ERILLISTÄ 6–8 repliikin kohtaamista/);
  assert.match(supplement,/neljän helpon virkkeen esittely/);
  for(const chapter of Object.keys(counts))assert.match(workbook,new RegExp('"'+chapter+'":'));
  assert.match(supplement,/Näitä kysymyksiä ei vielä pisteytetä/);
  assert.match(workbook,/Kappaletesti/);
});

test("final grammar only combines learned persons and fixed frames",()=>{
  const grammar=readFileSync("src/features/los/LosGrammarChapters.tsx","utf8");
  assert.match(grammar,/Sie \(kohtelias\)/);
  assert.match(grammar,/Wie sagt man das auf Deutsch/);
  assert.match(grammar,/Tasatunnit ja am\/um/);
  assert.match(grammar,/ei ole kirjan loppukoe/);
});
