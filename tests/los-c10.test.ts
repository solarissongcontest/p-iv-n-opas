import assert from "node:assert/strict";
import test from "node:test";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {validateBook,type Exercise,type ExerciseAnswer} from "../src/features/los/model.ts";
import {evaluateExercise} from "../src/features/los/exercises/evaluate.ts";
import {LOS1_C10_SOURCE_BLOCKS,LOS1_C10_SOURCE_EXERCISES}
 from "../src/features/los/los1-c10-source.ts";
import {LOS1_C03_BERNA_TURNS} from "../src/features/los/los1-c03-source.ts";
import {LOS1_C06_HARALD_TURNS} from "../src/features/los/los1-c06-source.ts";
import {LOS1_C10_PRACTICE_EXERCISES} from "../src/features/los/los1-c10-practice.ts";
import {LOS1_C10_EXAM_A,LOS1_C10_EXAM_B,LOS1_C10_TEST}
 from "../src/features/los/los1-c10-test.ts";
import {emptyChapterTestRecord,gradeChapterTest,
 selectedTestExercises,selectedTestExerciseIds,restartChapterTest}
 from "../src/features/los/chapterTest.ts";

const book=LOS_BOOKS[0];
if(!book)throw Error("missing LOS! 1");
const chapter=book.chapters.find(row=>row.id==="C10");
const definition=book.chapterTests.find(row=>row.id===LOS1_C10_TEST.id);
if(!chapter||!definition)throw Error("C10 missing");
function answer(ex:Exercise):ExerciseAnswer{
 switch(ex.type){
  case "single-choice":return ex.correctOptionId;
  case "multiple-choice":return [...ex.correctOptionIds];
  case "true-false":return String(ex.correctValue);
  case "gap-fill":return ex.acceptedAnswers[0]??"";
  case "matching":return Object.fromEntries(ex.pairs.map(p=>[p.leftId,p.rightId]));
  case "word-order":return [...ex.correctOrder];
  case "categorize":return Object.fromEntries(ex.assignments.map(p=>[p.itemId,p.categoryId]));
  case "highlight":return ex.acceptedRanges[0]??null;
 }
}
function complete(attempt=0){
 return {...emptyChapterTestRecord(definition),attemptNumber:attempt,
  answers:Object.fromEntries(selectedTestExercises(definition,book.exercises,attempt)
    .map(ex=>[ex.id,answer(ex)])),
  selfAssessment:Object.fromEntries(definition.speechCriteria.map(c=>[c.id,"onnistui" as const])),
  writtenResponse:"Er heißt Harald Becker.\nEr kommt aus München.\nSie heißt Berna.\nSie kommt aus Kiel.",
 };
}
test("C10 has ten complete preview sections and 64 independent routable questions",()=>{
 assert.deepEqual(validateBook(book),[]);
 assert.equal(book.chapters.length,10);
 assert.equal(chapter.publicationStatus,"preview");
 assert.equal(chapter.sections?.length,10);
 assert.ok(chapter.sections?.every(s=>s.publicationStatus==="preview"));
 assert.equal(LOS1_C10_SOURCE_EXERCISES.length,12);
 assert.equal(LOS1_C10_PRACTICE_EXERCISES.length,32);
 assert.equal(LOS1_C10_EXAM_A.length,20);
 assert.equal(chapter.exerciseIds.length,64);
 const ids=new Set(chapter.sections?.flatMap(section=>section.exerciseIds));
 const blockIds=new Set(chapter.sections?.flatMap(section=>section.blockIds));
 assert.ok(chapter.exerciseIds.every(id=>ids.has(id)));
 assert.ok(chapter.blockIds.every(id=>blockIds.has(id)));
 assert.equal(new Set(chapter.exerciseIds).size,64);
});
test("C10 repeats complete actual Harald and Berna human-authored interviews, without new synthetic dialogues",()=>{
 const harald=LOS1_C10_SOURCE_BLOCKS.find(x=>x.id==="los1-c10-m-dib-02-harald");
 const berna=LOS1_C10_SOURCE_BLOCKS.find(x=>x.id==="los1-c10-m-dib-01-berna");
 assert.ok(harald&&harald.kind==="dialogue");
 assert.ok(berna&&berna.kind==="dialogue");
 assert.equal(harald.sourceId,"M-DIB-02");
 assert.equal(berna.sourceId,"M-DIB-01");
 assert.deepEqual(harald.turns.map(row=>row.text),LOS1_C06_HARALD_TURNS.map(row=>row.text));
 assert.deepEqual(berna.turns.map(row=>row.text),LOS1_C03_BERNA_TURNS.map(row=>row.text));
 assert.equal(harald.turns.length,14);
 assert.equal(berna.turns.length,12);
 assert.ok(harald.turns.some(x=>x.text.includes("Datenschutzgründen entfernt")));
 assert.ok(berna.turns.some(x=>x.text.includes("Datenschutzgründen entfernt")));
 assert.ok(LOS1_C10_SOURCE_EXERCISES.some(x=>x.type==="highlight"));
 assert.ok(book.sources.some(s=>s.id==="M-DIB-02"&&s.permittedMode==="hosted"));
 assert.ok(book.sources.some(s=>s.id==="M-DIB-01"&&s.permittedMode==="hosted"));
 assert.ok(LOS1_C10_SOURCE_BLOCKS.every(b=>b.kind!=="media"));
});
test("C10's real-source and all original practice items have checkable answers",()=>{
 for(const ex of [...LOS1_C10_SOURCE_EXERCISES,...LOS1_C10_PRACTICE_EXERCISES]){
  assert.equal(evaluateExercise(ex,answer(ex))?.correct,true,ex.id);
  if(ex.type==="single-choice")
   assert.equal(new Set(ex.options.map(o=>o.label)).size,ex.options.length,ex.id);
 }
});
test("C10 preview lessons permit reading and two-conversation production, while excluding unverified Harald listening",()=>{
 assert.deepEqual(book.lessons.filter(l=>l.chapterId==="C10"&&l.publicationStatus==="preview")
  .map(l=>l.id),["L051","L053","L054","L055"]);
 for(const id of ["L052"]){
  const lesson=book.lessons.find(l=>l.id===id);
  assert.ok(lesson&&lesson.publicationStatus==="planned"&&lesson.steps.length===0);
 }
 assert.ok(book.lessons.find(l=>l.id==="L055")?.steps.some(s=>s.chapterTestId===definition.id));
});
test("Twenty genuinely alternative C10 exam questions and four-line writing are not auto-mixed",()=>{
 assert.equal(definition.exerciseIds.length,20);
 assert.equal(definition.alternativeExerciseIds?.length,20);
 assert.equal(new Set([...definition.exerciseIds,...(definition.alternativeExerciseIds??[])]).size,40);
 assert.equal(definition.selfAssessmentMode,"writing");
 assert.equal(definition.requiredWritingLines,4);
 assert.equal(definition.maximumWritingLines,4);
 assert.ok(definition.speechPromptFi);
 for(const form of [LOS1_C10_EXAM_A,LOS1_C10_EXAM_B]){
  assert.equal(form.length,20);
  for(const ex of form)assert.equal(evaluateExercise(ex,answer(ex))?.correct,true,ex.id);
 }
 for(let i=0;i<20;i++)assert.notEqual(LOS1_C10_EXAM_A[i]!.promptFi,LOS1_C10_EXAM_B[i]!.promptFi);
 const a=gradeChapterTest(definition,selectedTestExercises(definition,book.exercises,0),complete(),"2026-11-11T18:00:00Z");
 assert.equal(a?.score,20);
 assert.equal(a?.maximum,20);
 assert.equal(a?.writtenResponse,complete().writtenResponse);
 const short={...complete(),writtenResponse:"Er heißt Harald."};
 assert.equal(gradeChapterTest(definition,selectedTestExercises(definition,book.exercises,0),short,"2026-11-11T18:00:00Z"),null);
 const retake=restartChapterTest({...complete(),submission:a!});
 assert.equal(retake.previousResults.length,1);
 assert.equal(retake.previousResults[0]?.writtenResponse,a?.writtenResponse);
 assert.notDeepEqual(selectedTestExerciseIds(definition,1),definition.exerciseIds);
 const b=gradeChapterTest(definition,selectedTestExercises(definition,book.exercises,1),complete(1),"2026-11-12T18:00:00Z");
 assert.equal(b?.score,20);
});
