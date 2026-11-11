import assert from "node:assert/strict";
import test from "node:test";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {validateBook,type Exercise,type ExerciseAnswer} from "../src/features/los/model.ts";
import {evaluateExercise} from "../src/features/los/exercises/evaluate.ts";
import {LOS1_C08_CONTENT_BLOCKS} from "../src/features/los/los1-c08-content.ts";
import {LOS1_C08_PRACTICE_EXERCISES} from "../src/features/los/los1-c08-practice.ts";
import {LOS1_C08_EXAM_A,LOS1_C08_EXAM_B,LOS1_C08_TEST} from "../src/features/los/los1-c08-test.ts";
import {
 emptyChapterTestRecord,gradeChapterTest,selectedTestExercises,
 selectedTestExerciseIds,restartChapterTest,
} from "../src/features/los/chapterTest.ts";

const book=LOS_BOOKS[0];
if(!book)throw Error("LOS! 1 missing");
const chapter=book.chapters.find(row=>row.id==="C08");
if(!chapter)throw Error("C08 missing");
const definition=book.chapterTests.find(t=>t.id===LOS1_C08_TEST.id);
if(!definition)throw Error("C08 chapter test missing");

function correctAnswer(ex:Exercise):ExerciseAnswer {
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
function complete(attempt=0) {
 return {
  ...emptyChapterTestRecord(definition),
  attemptNumber:attempt,
  answers:Object.fromEntries(selectedTestExercises(definition,book.exercises,attempt)
    .map(ex=>[ex.id,correctAnswer(ex)])),
  selfAssessment:Object.fromEntries(definition.speechCriteria.map(x=>[x.id,"onnistui" as const])),
 };
}
test("C08 is ten routable sections with genuine published-source gates",()=>{
 assert.deepEqual(validateBook(book),[]);
 assert.equal(chapter.publicationStatus,"preview");
 assert.equal(chapter.sections?.length,10);
 assert.ok(chapter.sections?.every(x=>x.publicationStatus==="preview"));
 assert.equal(LOS1_C08_CONTENT_BLOCKS.length,14);
 assert.equal(LOS1_C08_PRACTICE_EXERCISES.length,26);
 assert.equal(chapter.exerciseIds.length,38);
 assert.equal(new Set(chapter.exerciseIds).size,38);
 const sections=chapter.sections??[];
 assert.deepEqual(sections.map(x=>x.id),[
  "aloita","teksti-a","ymmarra","sanasto","kielioppi",
  "teksti-b","harjoittele","kayta","kulttuuri","tarkista",
 ]);
 const allBlocks=new Set(sections.flatMap(x=>x.blockIds));
 const allExercises=new Set(sections.flatMap(x=>x.exerciseIds));
 assert.ok(chapter.blockIds.every(id=>allBlocks.has(id)));
 assert.ok(chapter.exerciseIds.every(id=>allExercises.has(id)));
 assert.deepEqual(sections.find(x=>x.id==="teksti-a")?.blockIds,
   ["los1-c08-text-a-pending"]);
 assert.deepEqual(sections.find(x=>x.id==="teksti-b")?.blockIds,
   ["los1-c08-text-b-pending"]);
 const owned=book.blocks.filter(x=>x.id.startsWith("los1-c08-"));
 assert.ok(owned.every(x=>x.kind!=="authenticText"&&x.kind!=="dialogue"&&x.kind!=="transcript"&&x.kind!=="media"));
 assert.ok(!owned.some(x=>"sourceId" in x&&Boolean(x.sourceId)),
   "Do not mark LOS!-authored examples as sourced original");
 const source=book.sources.find(x=>x.id==="M-DIB-04");
 assert.ok(source);
 assert.ok(source.permittedMode==="pending"||source.readiness==="research");
});
test("C08 vocabulary and teaching are explicit and source-honest",()=>{
 const words=book.blocks.find(x=>x.id==="los1-c08-words");
 assert.ok(words&&words.kind==="vocabulary");
 assert.equal(words.entries.length,17);
 assert.ok(words.entries.some(x=>x.de==="Ich verstehe nicht."));
 assert.ok(words.entries.some(x=>x.de==="auf Deutsch"));
 const phrases=book.blocks.find(x=>x.id==="los1-c08-phrases");
 assert.ok(phrases&&phrases.kind==="grammar");
 assert.ok(phrases.explanationFi.includes("kaikkia sen kielioppisääntöjä"));
 const a=book.blocks.find(x=>x.id==="los1-c08-text-a-pending");
 assert.ok(a&&a.kind==="paragraph"&&a.text.includes("ODOTTAA"));
 const b=book.blocks.find(x=>x.id==="los1-c08-text-b-pending");
 assert.ok(b&&b.kind==="paragraph"&&b.text.includes("tarkistamatta"));
});
test("All C08 exercises have deterministic solutions and non-fake feedback",()=>{
 for(const ex of [...LOS1_C08_PRACTICE_EXERCISES,...LOS1_C08_EXAM_A,...LOS1_C08_EXAM_B]){
  assert.equal(evaluateExercise(ex,correctAnswer(ex))?.correct,true,ex.id);
  if(ex.type==="single-choice")
   assert.equal(new Set(ex.options.map(o=>o.label)).size,ex.options.length,ex.id);
  assert.ok(!/(äänitteestä kuultiin|videossa sanottiin|lähdetekstin repliikki)/iu.test(ex.promptFi),
   "Exercises may not claim to verify pending source comprehension");
 }
});
test("Three C08 lesson previews are available; original-source ones stay blocked",()=>{
 assert.deepEqual(book.lessons.filter(l=>l.chapterId==="C08"&&l.publicationStatus==="preview")
  .map(l=>l.id),["L041","L043","L045"]);
 for(const id of ["L042","L044"]){
  const lesson=book.lessons.find(l=>l.id===id);
  assert.ok(lesson&&lesson.publicationStatus==="planned");
  assert.deepEqual(lesson.steps,[]);
 }
 assert.ok(book.lessons.find(l=>l.id==="L045")?.steps.some(x=>x.chapterTestId===definition.id));
});
test("C08 distinct 12-question retakes keep score history and speech ungraded",()=>{
 assert.equal(definition.exerciseIds.length,12);
 assert.equal(definition.alternativeExerciseIds?.length,12);
 assert.equal(new Set([...definition.exerciseIds,...(definition.alternativeExerciseIds??[])]).size,24);
 assert.equal(definition.selfAssessmentMode,"speech");
 assert.equal(definition.speechCriteria.length,4);
 for(let i=0;i<12;i++)assert.notEqual(LOS1_C08_EXAM_A[i]!.promptFi,LOS1_C08_EXAM_B[i]!.promptFi);
 const a=gradeChapterTest(definition,selectedTestExercises(definition,book.exercises,0),complete(),
  "2026-11-11T15:00:00Z");
 assert.equal(a?.score,12);
 assert.equal(a?.maximum,12);
 const incomplete=complete();
 delete incomplete.selfAssessment[definition.speechCriteria[0]!.id];
 assert.equal(gradeChapterTest(definition,selectedTestExercises(definition,book.exercises,0),incomplete,
  "2026-11-11T15:00:00Z"),null);
 const retry=restartChapterTest({...complete(),submission:a!});
 assert.equal(retry.previousResults.length,1);
 assert.equal(retry.previousResults[0]?.score,12);
 assert.notDeepEqual(selectedTestExerciseIds(definition,1),definition.exerciseIds);
 const b=gradeChapterTest(definition,selectedTestExercises(definition,book.exercises,1),complete(1),
  "2026-11-12T15:00:00Z");
 assert.equal(b?.score,12);
 assert.equal(b?.maximum,12);
});
