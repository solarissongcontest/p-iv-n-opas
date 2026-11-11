import assert from "node:assert/strict";
import test from "node:test";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {validateBook,type Exercise,type ExerciseAnswer} from "../src/features/los/model.ts";
import {evaluateExercise} from "../src/features/los/exercises/evaluate.ts";
import {
  emptyChapterTestRecord,gradeChapterTest,selectedTestExercises,restartChapterTest,
} from "../src/features/los/chapterTest.ts";
import {LOS1_C05_AUTHENTIC_TURNS,LOS1_C05_AUTHENTIC_TEXT}
  from "../src/features/los/los1-c05-source.ts";
import {LOS1_C05_DIB_FEELING_LINES} from "../src/features/los/los1-c05-content.ts";
import {LOS1_C05_PRACTICE_EXERCISES} from "../src/features/los/los1-c05-practice.ts";

const book=LOS_BOOKS[0];
if(!book)throw Error("LOS! 1 absent");
const chapter=book.chapters.find(row=>row.id==="C05");
const definition=book.chapterTests.find(row=>row.chapterId==="C05");
if(!chapter||!definition)throw Error("C05 missing");
const questions=selectedTestExercises(definition,book.exercises);
function key(ex:Exercise):ExerciseAnswer {
  switch(ex.type){
    case "single-choice":return ex.correctOptionId;
    case "multiple-choice":return [...ex.correctOptionIds];
    case "true-false":return String(ex.correctValue);
    case "gap-fill":return ex.acceptedAnswers[0]??"";
    case "matching":return Object.fromEntries(ex.pairs.map(pair=>[pair.leftId,pair.rightId]));
    case "word-order":return [...ex.correctOrder];
    case "categorize":return Object.fromEntries(ex.assignments.map(pair=>[pair.itemId,pair.categoryId]));
    case "highlight":return ex.acceptedRanges[0]??null;
  }
}
const completeRecord=()=>({
  ...emptyChapterTestRecord(definition),
  answers:Object.fromEntries(questions.map(ex=>[ex.id,key(ex)])),
  selfAssessment:Object.fromEntries(definition.speechCriteria.map(item=>[item.id,"onnistui" as const])),
});

test("C05 has ten substantive section routes and the planned L022–L026 guided lessons",()=>{
  assert.deepEqual(validateBook(book),[]);
  assert.equal(chapter.publicationStatus,"preview");
  assert.equal(chapter.sections?.length,10);
  assert.ok(chapter.sections?.every(row=>row.publicationStatus==="preview"));
  assert.deepEqual(book.lessons.filter(item=>item.chapterId==="C05"&&item.publicationStatus==="preview")
    .map(item=>item.id),["L022","L023","L024","L025","L026"]);
  assert.equal(LOS1_C05_PRACTICE_EXERCISES.length,30);
  assert.equal(chapter.exerciseIds.length,47);
  assert.equal(new Set(chapter.exerciseIds).size,47);
  assert.ok(chapter.sections?.find(row=>row.id==="teksti-a")?.blockIds.includes("los1-c05-wb-05-dialogue"));
  assert.ok(chapter.sections?.find(row=>row.id==="teksti-b")?.blockIds.includes("los1-c05-dib-05-lines"));
  assert.ok(chapter.sections?.find(row=>row.id==="tarkista")?.exerciseIds.includes("los1-c05-exam-12"));
});
test("C05 authentic complete four-turn Wikibooks dialogue is quoted without editorial substitution",()=>{
  const text=[
    "Guten Tag, Karl. Wie geht es dir?",
    "Guten Tag. Danke, mir geht es gut. Und dir?",
    "Danke, mir geht es gut. Auf Wiedersehen.",
    "Auf Wiedersehen!",
  ];
  assert.deepEqual(LOS1_C05_AUTHENTIC_TURNS.map(row=>row.text),text);
  assert.equal(LOS1_C05_AUTHENTIC_TEXT,text.join("\n"));
  assert.ok(LOS1_C05_AUTHENTIC_TURNS.every(row=>row.translationFi));
  const source=book.sources.find(row=>row.id==="M-WB-05");
  assert.equal(source?.permittedMode,"hosted");
  assert.equal(source?.licenseUrl,"https://creativecommons.org/licenses/by-sa/4.0/");
  assert.ok(source?.originalUrl?.includes("oldid=3823655"));
  const dialogue=book.blocks.find(row=>row.id==="los1-c05-wb-05-dialogue");
  assert.ok(dialogue&&dialogue.kind==="dialogue");
  assert.equal(dialogue.sourceId,"M-WB-05");
  assert.deepEqual(dialogue.turns.map(row=>row.text),text);
});
test("C05 authentic COERLL Text B has complete thirteen-phrase mood list and is NOT fictitious audio",()=>{
  const phrases=["Wie geht es Ihnen?","Sehr gut, danke!","Es geht mir gut.","Ausgezeichnet!",
    "Toll!","Wunderbar!","Was ist los?","Es geht mir nicht so gut.",
    "Es geht mir schlecht.","Ich fühle mich schlecht.","Ich bin müde.",
    "Ich bin krank.","Ich habe Kopfschmerzen."];
  assert.deepEqual(LOS1_C05_DIB_FEELING_LINES.map(row=>row.de),phrases);
  const source=book.sources.find(row=>row.id==="M-DIB-05");
  assert.equal(source?.permittedMode,"hosted");
  assert.equal(source?.licenseUrl,"https://creativecommons.org/licenses/by/4.0/");
  const block=book.blocks.find(row=>row.id==="los1-c05-dib-05-lines");
  assert.ok(block&&block.kind==="transcript");
  assert.equal(block.sourceId,"M-DIB-05");
  assert.deepEqual(block.lines.map(row=>row.de),phrases);
  assert.ok(book.blocks.every(row=>row.kind!=="media"||row.sourceId!=="M-DIB-05"));
});
test("C05 has a distinct actual human German speaker sample with its own license",()=>{
  const audio=book.blocks.find(row=>row.id==="los1-c05-m-com-05-pronunciation");
  assert.ok(audio&&audio.kind==="media");
  assert.equal(audio.sourceId,"M-COM-05");
  assert.equal(audio.embedUrl,
    "https://upload.wikimedia.org/wikipedia/commons/3/32/De-wie_geht_es_dir.ogg");
  assert.equal(audio.mp3Url,
    "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/32/De-wie_geht_es_dir.ogg/De-wie_geht_es_dir.ogg.mp3");
  const source=book.sources.find(row=>row.id===audio.sourceId);
  assert.equal(source?.permittedMode,"embed");
  assert.equal(source?.licenseUrl,"https://creativecommons.org/licenses/by-sa/4.0/");
  assert.ok(source?.originalUrl?.includes("commons.wikimedia.org/wiki/File:De-wie_geht_es_dir.ogg"));
});
test("17 C05 core words, not arbitrary person names, and new source reused correctly",()=>{
  const block=book.blocks.find(row=>row.id==="los1-c05-words");
  assert.ok(block&&block.kind==="vocabulary");
  assert.equal(block.entries.length,17);
  assert.ok(block.entries.some(row=>row.de==="nicht so gut"));
  assert.ok(block.entries.some(row=>row.de==="und Ihnen?"));
  assert.ok(block.entries.every(row=>row.id.startsWith("los1-c05-word-")));
  assert.ok(block.entries.every(row=>!["Karl","Heinrich"].includes(row.de)));
});
test("C05 graded score is 12, speech remains unscored and works without microphone storage",()=>{
  assert.equal(questions.length,12);
  assert.equal(definition.selfAssessmentMode,"speech");
  assert.equal(definition.speechCriteria.length,4);
  assert.ok(questions.every(row=>evaluateExercise(row,key(row))?.correct));
  const ready=completeRecord();
  const result=gradeChapterTest(definition,questions,ready,"2026-11-11T11:00:00Z");
  assert.equal(result?.score,12);
  assert.equal(result?.maximum,12);
  const missing=completeRecord();
  delete missing.selfAssessment[definition.speechCriteria[0]!.id];
  assert.equal(gradeChapterTest(definition,questions,missing,"2026-11-11T11:00:00Z"),null);
  assert.ok(result);
  const retried=restartChapterTest({...ready,submission:result});
  assert.equal(retried.previousResults[0]?.score,12);
  assert.equal(retried.submission,null);
  assert.deepEqual(retried.selfAssessment,{});
});
