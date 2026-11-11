import assert from "node:assert/strict";
import test from "node:test";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {validateBook,type Exercise,type ExerciseAnswer} from "../src/features/los/model.ts";
import {evaluateExercise} from "../src/features/los/exercises/evaluate.ts";
import {LOS1_REVIEW_TWO_BLOCKS,LOS1_REVIEW_TWO_EXERCISES}
 from "../src/features/los/los1-review-two.ts";

const book=LOS_BOOKS[0];
if(!book)throw Error("missing LOS! 1");
function answer(ex:Exercise):ExerciseAnswer{
 switch(ex.type){
  case "single-choice":return ex.correctOptionId;
  case "multiple-choice":return [...ex.correctOptionIds];
  case "true-false":return String(ex.correctValue);
  case "word-order":return [...ex.correctOrder];
  case "categorize":return Object.fromEntries(ex.assignments.map(p=>[p.itemId,p.categoryId]));
  case "gap-fill":return ex.acceptedAnswers[0]??"";
  case "matching":return Object.fromEntries(ex.pairs.map(p=>[p.leftId,p.rightId]));
  case "highlight":return ex.acceptedRanges[0]??null;
 }
}
test("Three genuine mixed revision lessons and final personal course reflection are routable",()=>{
 assert.deepEqual(validateBook(book),[]);
 assert.equal(LOS1_REVIEW_TWO_BLOCKS.length,10);
 assert.equal(LOS1_REVIEW_TWO_EXERCISES.length,18);
 assert.equal(new Set(LOS1_REVIEW_TWO_EXERCISES.map(x=>x.id)).size,18);
 for(const lessonId of ["L056","L057","L058"]){
  const lesson=book.lessons.find(x=>x.id===lessonId);
  assert.ok(lesson&&lesson.publicationStatus==="preview");
  assert.ok(lesson.steps.length>=7);
  const ids=lesson.steps.filter(s=>s.exerciseId).map(s=>s.exerciseId);
  assert.equal(ids.length,6);
  assert.ok(ids.every(id=>LOS1_REVIEW_TWO_EXERCISES.some(x=>x.id===id)));
  assert.ok(lesson.steps.some(s=>s.blockId?.includes("production-")));
 }
 const last=book.lessons.find(x=>x.id==="L060");
 assert.ok(last&&last.publicationStatus==="preview");
 assert.equal(last.steps.length,4);
 assert.ok(last.steps.some(x=>x.reflectionPromptFi));
 assert.ok(last.steps.some(x=>x.blockId==="los1-summary-checklist"));
});
test("All 18 revision tasks are scored independently, not copied from final exam IDs",()=>{
 const final=book.chapterTests.find(x=>x.examType==="final");
 assert.ok(final);
 const finalIds=new Set([...final.exerciseIds,...(final.alternativeExerciseIds??[])]);
 for(const ex of LOS1_REVIEW_TWO_EXERCISES){
  assert.equal(evaluateExercise(ex,answer(ex))?.correct,true,ex.id);
  assert.ok(!finalIds.has(ex.id));
 }
 const intro=LOS1_REVIEW_TWO_BLOCKS.find(b=>b.id==="los1-review2-intro-c");
 assert.ok(intro&&intro.kind==="paragraph"&&intro.text.includes("ilman vihjeitä"));
 const production=LOS1_REVIEW_TWO_BLOCKS.find(b=>b.id==="los1-review2-production-c");
 assert.ok(production&&production.kind==="production");
 assert.equal(production.modelDe.split("\n").length,8);
});
