import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_BOOKS } from "../src/features/los/catalog.ts";
import { LOS_EXERCISES, losExercisesFor, losIsCorrect, losScore } from "../src/features/los/exerciseBank.ts";

const expectedCounts:Record<string,number>={"01":12,"02":15,"03":15,"04":12,"05":12,"06":20};
const vocabularyCounts:Record<string,number>={"03":17,"04":16,"05":16,"06":26};

test("C01–C06 provide the correct book-specified number of deterministic questions",()=>{
  assert.equal(LOS_EXERCISES.filter(ex=>Number(ex.chapterId)<=6).length,86);
  assert.equal(new Set(LOS_EXERCISES.filter(ex=>Number(ex.chapterId)<=6).map(ex=>ex.id)).size,86);
  for(const [chapter,count] of Object.entries(expectedCounts)) {
    const exercises=losExercisesFor(chapter);
    assert.equal(exercises.length,count,`chapter ${chapter} task count`);
    assert.equal(exercises.filter(ex=>ex.kind==="fill").length>0,true,`chapter ${chapter} needs at least one active recall`);
    const complete=Object.fromEntries(exercises.map(ex=>[ex.id,ex.correct]));
    assert.deepEqual(losScore(chapter,complete),{correct:count,total:count});
    assert.deepEqual(losScore(chapter,{}),{correct:0,total:count});
    for(const item of exercises) {
      assert.equal(item.chapterId,chapter);
      assert.equal(item.accepted.includes(item.correct),true);
      assert.equal(losIsCorrect(item,item.correct),true);
      assert.ok(item.explanation.length>=10);
      if(item.kind==="choice"){
        assert.ok(item.options?.includes(item.correct));
        assert.equal(item.options?.length,3);
        assert.equal(new Set(item.options).size,3);
      }
    }
  }
});

test("new chapter vocabulary follows the book source plan's exact headword counts",()=>{
  const book=LOS_BOOKS.find(item=>item.id===1);
  assert.ok(book);
  for (const [chapter,count] of Object.entries(vocabularyCounts)) {
    const ch=book.chapters.find(item=>item.id===chapter);
    assert.ok(ch);
    assert.equal(ch.vocabulary.length,count);
    for(const entry of ch.vocabulary){
      const [german,translation]=entry.split(" – ");
      assert.ok(german?.trim() && translation?.trim(),`unclear vocabulary ${chapter}: ${entry}`);
    }
  }
});

test("C06 contains twenty numeral items; two age dialogues are separate self-assessed work",()=>{
  const nums=losExercisesFor("06");
  assert.equal(nums.length,20);
  assert.ok(nums.every(item=>item.skill==="numerot"));
  const supplements=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
  assert.match(supplements,/Kaksi ikäkeskustelua/);
  assert.match(supplements,/Mia: Wie alt bist du/);
  assert.match(supplements,/Kaksi erilaista kohtaamista/);
});

test("aus der Schweiz, du/Sie, nicht and numbers stay exact and unambiguous",()=>{
  const pick=(id:string)=>{const item=LOS_EXERCISES.find(x=>x.id===id);assert.ok(item,id);return item;};
  assert.equal(losIsCorrect(pick("C03-EX-11"),"Ich komme aus der Schweiz."),true);
  assert.equal(losIsCorrect(pick("C03-EX-11"),"Ich komme aus Schweiz."),false);
  assert.equal(losIsCorrect(pick("C04-EX-05"),"heißen"),true);
  assert.equal(losIsCorrect(pick("C04-EX-05"),"heissen"),false);
  assert.equal(losIsCorrect(pick("C05-EX-11"),"Nicht"),true);
  assert.equal(losIsCorrect(pick("C05-EX-11"),"sehr"),false);
  assert.equal(losIsCorrect(pick("C06-EX-09"),"sechzehn"),true);
  assert.equal(losIsCorrect(pick("C06-EX-09"),"sechszehn"),false);
  assert.equal(losIsCorrect(pick("C06-EX-16"),"dreißig"),true);
  assert.equal(losIsCorrect(pick("C06-EX-16"),"dreissig"),false);
});

test("comprehension tasks are not falsely autoscored without complete authentic source texts",()=>{
  const supplements=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
  const workbook=readFileSync("src/features/los/LosWorkbook.tsx","utf8");
  assert.match(supplements,/Näitä kysymyksiä ei vielä pisteytetä/);
  assert.match(supplements,/chapter.id==="03"/);
  assert.match(supplements,/chapter.id==="05"/);
  assert.match(workbook,/selfAssessments\[chapter.id\]/);
  assert.match(workbook,/alkuperäisen päätekstin ymmärtämistä/i);
});
