import assert from "node:assert/strict";
import test from "node:test";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {validateBook,type Exercise,type ExerciseAnswer} from "../src/features/los/model.ts";
import {evaluateExercise} from "../src/features/los/exercises/evaluate.ts";
import {LOS1_C09_WEEKDAYS,LOS1_C09_CALENDAR_ENTRIES,LOS1_C09_CONTENT_BLOCKS}
 from "../src/features/los/los1-c09-content.ts";
import {LOS1_C09_PRACTICE_EXERCISES,LOS1_C09_DAY_EXERCISES,LOS1_C09_CALENDAR_EXERCISES}
 from "../src/features/los/los1-c09-practice.ts";
import {LOS1_C09_SOURCE_EXERCISES,LOS1_C09_WB04_TEXT}
 from "../src/features/los/los1-c09-source.ts";
import {LOS1_C09_SPORT_TURNS,LOS1_C09_SPORT_TEXT,LOS1_C09_TEXT_A_BLOCKS,LOS1_C09_TEXT_A_EXERCISES}
 from "../src/features/los/los1-c09-text-a.ts";
import {LOS1_C09_EXAM_A,LOS1_C09_EXAM_B,LOS1_C09_TEST}
 from "../src/features/los/los1-c09-test.ts";
import {emptyChapterTestRecord,gradeChapterTest,selectedTestExercises,
 selectedTestExerciseIds,restartChapterTest}
 from "../src/features/los/chapterTest.ts";

const book=LOS_BOOKS[0];
if(!book)throw Error("LOS! 1 missing");
const chapter=book.chapters.find(x=>x.id==="C09");
const testDef=book.chapterTests.find(x=>x.id===LOS1_C09_TEST.id);
if(!chapter||!testDef)throw Error("C09 is missing");
function answer(ex:Exercise):ExerciseAnswer {
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
function complete(attempt=0){
 return {...emptyChapterTestRecord(testDef),
  attemptNumber:attempt,
  answers:Object.fromEntries(selectedTestExercises(testDef,book.exercises,attempt)
   .map(ex=>[ex.id,answer(ex)])),
  selfAssessment:Object.fromEntries(testDef.speechCriteria.map(item=>[item.id,"onnistui" as const])),
  writtenResponse:"Hallo Mia!\nAm Montag um drei Uhr?\nBis Montag!",
 };
}
test("C09 has ten independently routable preview sections and valid model",()=>{
 assert.deepEqual(validateBook(book),[]);
 assert.equal(chapter.publicationStatus,"preview");
 assert.equal(chapter.sections?.length,10);
 assert.equal(LOS1_C09_CONTENT_BLOCKS.length,18);
 assert.equal(LOS1_C09_SOURCE_EXERCISES.length,4);
 assert.equal(LOS1_C09_PRACTICE_EXERCISES.length,39);
 assert.equal(LOS1_C09_EXAM_A.length,14);
 assert.equal(chapter.exerciseIds.length,67);
 assert.equal(new Set(chapter.exerciseIds).size,67);
 const sections=chapter.sections??[];
 assert.ok(sections.every(s=>s.publicationStatus==="preview"));
 assert.deepEqual(sections.map(s=>s.id),[
  "aloita","teksti-a","ymmarra","sanasto","kielioppi",
  "teksti-b","harjoittele","kayta","kulttuuri","tarkista",
 ]);
 const referencedBlocks=new Set(sections.flatMap(s=>s.blockIds));
 const referencedExercises=new Set(sections.flatMap(s=>s.exerciseIds));
 assert.ok(chapter.blockIds.every(id=>referencedBlocks.has(id)));
 assert.ok(chapter.exerciseIds.every(id=>referencedExercises.has(id)));
});
test("Real Wikibooks weekday list is complete and precisely attributed",()=>{
 assert.deepEqual(LOS1_C09_WEEKDAYS,[
  "Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag",
 ]);
 assert.equal(LOS1_C09_WB04_TEXT,LOS1_C09_WEEKDAYS.join(", "));
 const content=book.blocks.find(b=>b.id==="los1-c09-wb-04-days");
 assert.ok(content&&content.kind==="authenticText");
 assert.equal(content.sourceId,"M-WB-04");
 assert.equal(content.text,LOS1_C09_WB04_TEXT);
 const metadata=book.sources.find(s=>s.id==="M-WB-04");
 assert.equal(metadata?.permittedMode,"hosted");
 assert.equal(metadata?.licenseUrl,"https://creativecommons.org/licenses/by-sa/4.0/");
 assert.ok(metadata?.originalUrl?.includes("oldid=4408402"));
 const sourceHighlight=LOS1_C09_SOURCE_EXERCISES.find(e=>e.type==="highlight");
 assert.ok(sourceHighlight&&sourceHighlight.type==="highlight");
 assert.equal(sourceHighlight.blockId,"los1-c09-wb-04-days");
 assert.equal(sourceHighlight.text,LOS1_C09_WB04_TEXT);
 assert.equal(evaluateExercise(sourceHighlight,sourceHighlight.acceptedRanges[0]??null)?.correct,true);
});
test("Main Sport und Zeit text is complete, sourced, and authentic audio remains blocked",()=>{
 const metadata=book.sources.find(x=>x.id==="M-WB-03");
 assert.ok(metadata);
 assert.equal(metadata.permittedMode,"hosted");
 assert.equal(metadata.licenseUrl,"https://creativecommons.org/licenses/by-sa/4.0/");
 assert.ok(metadata.originalUrl?.includes("oldid=4003622"));
 assert.ok(metadata.publicationNoteFi?.includes("artikkelivirheestä"));
 const original=[
  "Hallo, Greta! Wie spät ist es?",
  "Es ist Viertel vor drei.",
  "Wirklich? Ich spiele um drei Fußball. Machst du Sport, Greta?",
  "Nein, ich bin faul. Ich gehe jetzt nach Hause.",
  "Fußball macht aber Spaß!",
  "Bis dann.",
  "Wiedersehen!",
 ];
 assert.deepEqual(LOS1_C09_SPORT_TURNS.map(x=>x.text),original);
 assert.equal(LOS1_C09_SPORT_TURNS.length,7);
 assert.equal(LOS1_C09_SPORT_TEXT,original.join("\n"));
 const source=book.blocks.find(b=>b.id==="los1-c09-wb-03-dialogue");
 assert.ok(source&&source.kind==="dialogue");
 assert.equal(source.sourceId,"M-WB-03");
 assert.deepEqual(source.turns.map(x=>x.text),original);
 assert.ok(source.turns.every(x=>x.translationFi));
 assert.equal(LOS1_C09_TEXT_A_BLOCKS.length,3);
 assert.equal(LOS1_C09_TEXT_A_EXERCISES.length,10);
 for(const ex of LOS1_C09_TEXT_A_EXERCISES){
  assert.equal(evaluateExercise(ex,answer(ex))?.correct,true,ex.id);
 }
 const highlights=LOS1_C09_TEXT_A_EXERCISES.filter(ex=>ex.type==="highlight");
 assert.equal(highlights.length,2);
 assert.ok(highlights.every(ex=>ex.type==="highlight"&&ex.blockId==="los1-c09-wb-03-dialogue"&&ex.text===LOS1_C09_SPORT_TEXT));
 const media=book.blocks.find(b=>b.id==="los1-c09-text-b-media-pending");
 assert.ok(media&&media.kind==="paragraph"&&media.text.includes("vielä"));
 assert.ok(book.blocks.filter(b=>b.id.startsWith("los1-c09-")).every(b=>b.kind!=="media"));
 assert.ok(book.blocks.filter(b=>b.id.startsWith("los1-c09-")&&b.kind==="authenticText").every(b=>b.sourceId==="M-WB-04"));
});
test("Seven fictional days, seven safe calendar prompts, and 17 glossary units",()=>{
 const words=book.blocks.find(b=>b.id==="los1-c09-words");
 assert.ok(words&&words.kind==="vocabulary");
 assert.equal(words.entries.length,17);
 assert.equal(LOS1_C09_DAY_EXERCISES.length,7);
 assert.equal(LOS1_C09_CALENDAR_EXERCISES.length,7);
 assert.equal(LOS1_C09_CALENDAR_ENTRIES.length,7);
 const dayRows=book.blocks.find(b=>b.id==="los1-c09-calendar-table");
 assert.ok(dayRows&&dayRows.kind==="table");
 assert.equal(dayRows.rows.length,7);
 assert.ok(dayRows.rows[0]?.[2].includes("am Montag um drei Uhr"));
 assert.ok(LOS1_C09_PRACTICE_EXERCISES.some(x=>x.type==="word-order"));
 assert.ok(LOS1_C09_PRACTICE_EXERCISES.some(x=>x.type==="categorize"));
 assert.ok(LOS1_C09_SOURCE_EXERCISES.some(x=>x.type==="multiple-choice"));
 for(const ex of [...LOS1_C09_PRACTICE_EXERCISES,...LOS1_C09_SOURCE_EXERCISES]){
  assert.equal(evaluateExercise(ex,answer(ex))?.correct,true,ex.id);
  if(ex.type==="single-choice")assert.equal(new Set(ex.options.map(x=>x.label)).size,ex.options.length,ex.id);
 }
 const grammar=book.blocks.find(b=>b.id==="los1-c09-am-um");
 assert.ok(grammar&&grammar.kind==="grammar");
 assert.ok(grammar.explanationFi.includes("am + viikonpäivä"));
 assert.ok(grammar.explanationFi.includes("um + lukusana"));
});
test("Four C09 lessons are preview; only unverified media listening stays planned",()=>{
 assert.deepEqual(book.lessons.filter(l=>l.chapterId==="C09"&&l.publicationStatus==="preview")
  .map(l=>l.id),["L046","L047","L048","L050"]);
 const sourceLesson=book.lessons.find(x=>x.id==="L047");
 assert.ok(sourceLesson?.steps.some(x=>x.blockId==="los1-c09-wb-03-dialogue"));
 assert.ok(sourceLesson?.steps.some(x=>x.exerciseId==="los1-c09-sport-quarter"));
 for(const id of ["L049"]){
  const l=book.lessons.find(x=>x.id===id);
  assert.ok(l&&l.publicationStatus==="planned"&&l.steps.length===0);
 }
 assert.ok(book.lessons.find(l=>l.id==="L050")?.steps.some(x=>x.chapterTestId===LOS1_C09_TEST.id));
});
test("Fourteen-point A/B test requires 2–4 written lines, preserves retake answers",()=>{
 assert.equal(testDef.exerciseIds.length,14);
 assert.equal(testDef.alternativeExerciseIds?.length,14);
 assert.equal(new Set([...testDef.exerciseIds,...(testDef.alternativeExerciseIds??[])]).size,28);
 assert.equal(testDef.selfAssessmentMode,"writing");
 assert.equal(testDef.requiredWritingLines,2);
 assert.equal(testDef.maximumWritingLines,4);
 assert.equal(testDef.speechCriteria.length,4);
 for(let i=0;i<14;i++)assert.notEqual(LOS1_C09_EXAM_A[i]!.promptFi,LOS1_C09_EXAM_B[i]!.promptFi);
 for(const ex of [...LOS1_C09_EXAM_A,...LOS1_C09_EXAM_B]){
  assert.equal(evaluateExercise(ex,answer(ex))?.correct,true,ex.id);
 }
 const a=gradeChapterTest(testDef,selectedTestExercises(testDef,book.exercises,0),complete(),
  "2026-11-11T16:00:00Z");
 assert.equal(a?.score,14);
 assert.equal(a?.maximum,14);
 assert.equal(a?.writtenResponse,"Hallo Mia!\nAm Montag um drei Uhr?\nBis Montag!");
 const tooShort={...complete(),writtenResponse:"am Montag um drei Uhr"};
 assert.equal(gradeChapterTest(testDef,selectedTestExercises(testDef,book.exercises,0),tooShort,
  "2026-11-11T16:00:00Z"),null);
 const tooLong={...complete(),writtenResponse:"A\nB\nC\nD\nE"};
 assert.equal(gradeChapterTest(testDef,selectedTestExercises(testDef,book.exercises,0),tooLong,
  "2026-11-11T16:00:00Z"),null);
 const missing={...complete(),selfAssessment:{}};
 assert.equal(gradeChapterTest(testDef,selectedTestExercises(testDef,book.exercises,0),missing,
  "2026-11-11T16:00:00Z"),null);
 const retry=restartChapterTest({...complete(),submission:a!});
 assert.equal(retry.previousResults.length,1);
 assert.equal(retry.previousResults[0]?.writtenResponse,a?.writtenResponse);
 assert.notDeepEqual(selectedTestExerciseIds(testDef,1),testDef.exerciseIds);
 const b=gradeChapterTest(testDef,selectedTestExercises(testDef,book.exercises,1),complete(1),
  "2026-11-12T16:00:00Z");
 assert.equal(b?.score,14);
 assert.equal(b?.maximum,14);
});
