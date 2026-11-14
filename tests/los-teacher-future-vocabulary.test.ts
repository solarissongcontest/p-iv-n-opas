import test from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {futureVocabularyPairs,futureVocabularyCheck} from "../src/features/los/teacher/futureVocabularyCheck.ts";
import {getLosFutureTeacherLesson} from "../src/features/los/teacher/futureTeacherAdapter.ts";

test("350 lesson-specific formative vocabulary checks use source-only German/Finnish meanings",()=>{
  let chapters=0,lessons=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const manuscript=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];
    assert.ok(manuscript);
    const pairs=futureVocabularyPairs(book.id,chapter.id,manuscript);
    assert.ok(pairs,`Missing unique meanings in LOS${book.id} C${chapter.id}`);
    assert.equal(pairs.length,4);
    assert.equal(new Set(pairs.map(x=>x.de)).size,4);
    assert.equal(new Set(pairs.map(x=>x.fi)).size,4);
    const original=losFutureExercisesFor(book.id,chapter.id).find(t=>t.id.endsWith("-T05"));
    assert.ok(original);
    chapters++;
  }
  assert.equal(chapters,70);
  for(const book of LOS_BOOKS.filter(b=>b.id>=2)){
    for(let number=1;number<=60;number++){
      const id=`LOS${book.id}-L${String(number).padStart(3,"0")}`;
      const lesson=getLosFutureTeacherLesson(id);
      if(!lesson)continue;
      const manuscript=LOS_FUTURE_MANUSCRIPTS[book.id]?.[lesson.chapterId];assert.ok(manuscript);
      const result=futureVocabularyCheck(book.id,lesson.chapterId,number,manuscript);
      assert.ok(result,id);
      const question=lesson.scenes.find(s=>s.id==="vocabulary-check")?.question;
      assert.deepEqual(question,result.question);
      assert.equal(question.type,"choice");
      assert.equal(question.evidenceRole,"practice");
      assert.equal(new Set(question.options?.map(o=>o.label)).size,4);
      assert.ok(question.options?.every(o=>o.lang==="fi"));
      assert.equal(question.options?.filter(o=>o.id===question.correctOption).length,1);
      assert.equal(question.options?.filter(o=>o.wrongFeedback).length,3);
      lessons++;
    }
  }
  assert.equal(lessons,350);
});

test("two identical Finnish meanings never generate ambiguous automatically checked distractors",()=>{
  for(const [bookId,chapterId] of [[5,"03"],[6,"03"],[7,"05"],[7,"09"]] as const){
    const manuscript=LOS_FUTURE_MANUSCRIPTS[bookId]?.[chapterId];assert.ok(manuscript);
    const pairs=futureVocabularyPairs(bookId,chapterId,manuscript);
    assert.ok(pairs);
    assert.equal(new Set(pairs.map(pair=>pair.fi)).size,4);
  }
});
