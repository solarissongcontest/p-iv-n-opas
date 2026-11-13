import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS_BOOKS } from "../src/features/los/catalog.ts";
import { LOS_FUTURE_MANUSCRIPTS } from "../src/features/los/content/losFutureManuscripts.ts";
import { losFutureExercisesFor } from "../src/features/los/content/losFutureExercises.ts";
import { losFutureExercisesForSection } from "../src/features/los/content/losFutureExerciseSections.ts";

test("LOS! 2–8 has 70 accurately namespaced manuscript chapters", () => {
  assert.equal(LOS_BOOKS.length,8);
  const later=LOS_BOOKS.filter(book=>book.id>=2);
  assert.equal(later.length,7);
  assert.equal(later.reduce((sum,book)=>sum+book.chapters.length,0),70);
  for(const book of later){
    assert.deepEqual(book.chapters.map(ch=>ch.id),Array.from({length:10},(_,i)=>String(i+1).padStart(2,"0")));
    assert.equal(new Set(book.chapters.map(ch=>ch.title)).size,10);
    assert.equal(Object.keys(LOS_FUTURE_MANUSCRIPTS[book.id]??{}).length,10);
  }
});

test("all 70 manuscripts carry genuine sourced draft fields, not fake audio or exams", () => {
  let textACount=0,textBCount=0,dialogueCount=0,glossaryCount=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2)){
    const drafts=LOS_FUTURE_MANUSCRIPTS[book.id];
    assert.ok(drafts);
    for(const chapter of book.chapters){
      const data=drafts[chapter.id];
      assert.ok(data,`Missing chapter ${book.id}-${chapter.id}`);
      assert.equal(chapter.title,data.title);
      assert.equal(chapter.grammar,data.grammarTopic);
      assert.deepEqual(chapter.objectives,[data.objective]);
      assert.ok(data.textA.length>=200,`Short Text A in ${book.id}-${chapter.id}`);
      assert.ok(data.textB.length>=15,`Short Text B in ${book.id}-${chapter.id}`);
      assert.ok(data.intro.length>=100);
      assert.ok(data.grammarExplanation.length>=100);
      assert.ok(data.dialogue.length>=3);
      assert.ok(data.vocabulary.length>=10);
      assert.deepEqual(chapter.vocabulary,data.vocabulary.map(({de,fi})=>de+" – "+fi));
      assert.ok(data.vocabulary.every(v=>v.de && v.fi && !(v.de==="Suomi"&&v.fi==="Huomio")));
      textACount++;textBCount++;dialogueCount++;
      glossaryCount+=data.vocabulary.length;
    }
  }
  assert.equal(textACount,70);
  assert.equal(textBCount,70);
  assert.equal(dialogueCount,70);
  assert.equal(glossaryCount,1291);
});

test("later-book routing stays isolated from book 1's saved answers and study records", () => {
  const route=readFileSync("src/features/los/LosBook.tsx","utf8");
  const preview=readFileSync("src/features/los/LosFutureBookPreview.tsx","utf8");
  assert.ok(route.includes('const chapter = book !== null && /^(0[1-9]|10)$/.test'));
  assert.ok(route.includes('book.id !== 1 ? <LosFutureBookPreview'));
  assert.ok(route.includes('chapter && book.id===1 && <LosNotebook'));
  assert.ok(preview.includes("LosFutureExercises"));
  assert.doesNotMatch(preview,/losExercisesFor|useLosChapterDraft|LosChapterGrammar|LosAuthenticAudio/);
  assert.match(preview,/LOS_FUTURE_MANUSCRIPTS/);
});

test("LOS! 2–8 searchable texts remain explicitly labelled editorial drafts", () => {
  const search=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(search,/LOS_FUTURE_MANUSCRIPTS/);
  assert.match(search,/Harjoitusteksti/);
  assert.match(search,/textA/);
  assert.match(search,/textB/);
});

test("all 1,820 manuscript tasks have distinct book-qualified IDs, prompts and answer keys", () => {
  const ids=new Set<string>();
  let total=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2)){
    for(const chapter of book.chapters){
      const tasks=losFutureExercisesFor(book.id,chapter.id);
      assert.equal(tasks.length,26,`LOS${book.id} C${chapter.id}: unexpected task count`);
      assert.deepEqual(tasks.map(x=>x.id),
        [...Array.from({length:20},(_,i)=>`LOS${book.id}-C${chapter.id}-T${String(i+1).padStart(2,"0")}`),
         ...Array.from({length:6},(_,i)=>`LOS${book.id}-C${chapter.id}-R${String(i+1).padStart(2,"0")}`)]);
      for(const task of tasks){
        assert.equal(task.chapterId,chapter.id);
        assert.match(task.id,new RegExp(`^LOS${book.id}-C${chapter.id}-[TR]\\d{2}$`));
        assert.ok(task.prompt.length>15,task.id);
        assert.ok(task.answerKey.length>1,task.id);
        assert.ok(!ids.has(task.id),`Duplicate ID ${task.id}`);
        ids.add(task.id);
        total++;
      }
      assert.deepEqual(["understand","practice","apply"].map(mode =>
        losFutureExercisesForSection(tasks,mode as "understand"|"practice"|"apply").length),[9,14,3]);
      const assigned=["understand","practice","apply"].flatMap(mode =>
        losFutureExercisesForSection(tasks,mode as "understand"|"practice"|"apply").map(t=>t.id));
      assert.equal(new Set(assigned).size,26,"A task occurs in multiple sections");
      assert.deepEqual(new Set(assigned),new Set(tasks.map(t=>t.id)));
    }
  }
  assert.equal(total,1820);
  assert.equal(losFutureExercisesFor(1,"01").length,0,"LOS! 1 must never reuse manuscript exercises");
  assert.equal(losFutureExercisesFor(2,"11").length,0,"No invalid chapter data");
});

test("LOS! 2–8 answers use existing owner + book + chapter draft storage, with no false grading", () => {
  const exerciseUI=readFileSync("src/features/los/LosFutureExercises.tsx","utf8");
  const state=readFileSync("src/features/los/studyState.ts","utf8");
  assert.match(exerciseUI,/useLosChapterDraft\(bookId,chapterId\)/);
  assert.match(exerciseUI,/practiceAnswers:\{\.\.\.current\.practiceAnswers/);
  assert.match(exerciseUI,/practiceChecked:/);
  assert.match(exerciseUI,/ei tarkistettu automaattinen arvostelu/);
  assert.doesNotMatch(exerciseUI,/losScore\(|testSubmittedAt:\s*new Date/);
  assert.ok(state.includes("${ownerId}.${bookId}.${chapterId}"));
});
