import assert from "node:assert/strict";
import test from "node:test";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {validateBook,type Exercise,type ExerciseAnswer} from "../src/features/los/model.ts";
import {evaluateExercise} from "../src/features/los/exercises/evaluate.ts";
import {
  emptyChapterTestRecord,gradeChapterTest,selectedTestExercises,restartChapterTest,
} from "../src/features/los/chapterTest.ts";
import {LOS1_C04_AUTHENTIC_TURNS,LOS1_C04_AUTHENTIC_TEXT} from "../src/features/los/los1-c04-source.ts";
import {LOS1_C04_DIB_FORMAL_QUESTIONS} from "../src/features/los/los1-c04-content.ts";
import {LOS1_C04_PRACTICE_EXERCISES} from "../src/features/los/los1-c04-practice.ts";

const book=LOS_BOOKS[0];
if(!book) throw Error("LOS!1 missing");
const c04=book.chapters.find(row=>row.id==="C04");
const testDefinition=book.chapterTests.find(row=>row.chapterId==="C04");
if(!c04||!testDefinition)throw Error("C04 integration missing");
const questions=selectedTestExercises(testDefinition,book.exercises);
function key(ex:Exercise):ExerciseAnswer{
  switch(ex.type){
    case "single-choice":return ex.correctOptionId;
    case "multiple-choice":return [...ex.correctOptionIds];
    case "true-false":return String(ex.correctValue);
    case "gap-fill":return ex.acceptedAnswers[0]??"";
    case "matching":return Object.fromEntries(ex.pairs.map(pair=>[pair.leftId,pair.rightId]));
    case "categorize":return Object.fromEntries(ex.assignments.map(row=>[row.itemId,row.categoryId]));
    case "word-order":return [...ex.correctOrder];
    case "highlight":return ex.acceptedRanges[0]??null;
  }
}
const record=(text="Hallo! Wie heißt du? Woher kommst du?\nGuten Tag! Wie heißen Sie? Woher kommen Sie?")=>({
  ...emptyChapterTestRecord(testDefinition),
  answers:Object.fromEntries(questions.map(item=>[item.id,key(item)])),
  selfAssessment:Object.fromEntries(testDefinition.speechCriteria.map(item=>[item.id,"onnistui" as const])),
  writtenResponse:text,
});

test("C04 is 10 routable preview sections with five lessons and no broken references",()=>{
  assert.deepEqual(validateBook(book),[]);
  assert.equal(c04.sections?.length,10);
  assert.ok(c04.sections?.every(row=>row.publicationStatus==="preview"));
  assert.equal(c04.publicationStatus,"preview");
  assert.deepEqual(book.lessons.filter(row=>row.chapterId==="C04"&&row.publicationStatus==="preview")
    .map(row=>row.id),["L017","L018","L019","L020","L021"]);
  assert.equal(c04.exerciseIds.length,47);
  assert.equal(new Set(c04.exerciseIds).size,47);
  assert.equal(LOS1_C04_PRACTICE_EXERCISES.length,30);
  assert.ok(c04.sections?.find(row=>row.id==="teksti-a")?.blockIds.includes("los1-c04-wb-06-dialogue"));
  assert.ok(c04.sections?.find(row=>row.id==="teksti-b")?.blockIds.includes("los1-c04-dib-07-list"));
  assert.ok(c04.sections?.find(row=>row.id==="tarkista")?.exerciseIds.includes("los1-c04-exam-12"));
});

test("entire eight-turn Herr Schmidt / Standish is original Wikibooks source, with exact fixed German utterances",()=>{
  const expected=[
    "Guten Morgen, Herr Standish! Wie geht es Ihnen?",
    "Danke sehr, es geht mir gut. Und Ihnen?",
    "Nicht so gut. Ich bin müde.",
    "Wie bitte? Müde? Warum?",
    "Ich habe so viel Arbeit.",
    "Das kann ich verstehen. Zu viel ist zu viel.",
    "Das ist richtig. Auf Wiedersehen, Herr Standish!",
    "Auf Wiedersehen, bis morgen.",
  ];
  assert.equal(LOS1_C04_AUTHENTIC_TURNS.length,8);
  assert.deepEqual(LOS1_C04_AUTHENTIC_TURNS.map(row=>row.text),expected);
  assert.deepEqual(LOS1_C04_AUTHENTIC_TEXT,expected.join("\n"));
  assert.ok(LOS1_C04_AUTHENTIC_TURNS.every(row=>Boolean(row.translationFi)));
  const source=book.sources.find(row=>row.id==="M-WB-06");
  assert.equal(source?.permittedMode,"hosted");
  assert.equal(source?.licenseUrl,"https://creativecommons.org/licenses/by-sa/4.0/");
  assert.ok(source?.originalUrl?.includes("wikibooks.org/wiki/German/Lesson_2"));
  const block=book.blocks.find(row=>row.id==="los1-c04-wb-06-dialogue");
  assert.ok(block&&block.kind==="dialogue");
  assert.equal(block.sourceId,"M-WB-06");
  assert.deepEqual(block.turns.map(row=>row.text),expected);
  assert.ok(book.blocks.every(row=>row.kind!=="media"||row.sourceId!=="M-WB-06"));
});

test("C04 Text B is the actual six printed COERLL formal questions, not fake dialogue/audio",()=>{
  const originals=["Wie heißen Sie?","Woher kommen Sie?","Wie alt sind Sie?",
    "Wie lautet Ihre Telefonnummer?","Was ist Ihre Lieblingsfarbe?","Warum?"];
  assert.deepEqual(LOS1_C04_DIB_FORMAL_QUESTIONS.map(row=>row.de),originals);
  const block=book.blocks.find(row=>row.id==="los1-c04-dib-07-list");
  assert.ok(block&&block.kind==="transcript");
  assert.equal(block.sourceId,"M-DIB-07");
  assert.deepEqual(block.lines.map(row=>row.de),originals);
  const source=book.sources.find(row=>row.id==="M-DIB-07");
  assert.equal(source?.permittedMode,"hosted");
  assert.equal(source?.licenseUrl,"https://creativecommons.org/licenses/by/4.0/");
  assert.ok(source?.modification?.includes("Kuusi alkuperäistä"));
  assert.ok(book.blocks.every(row=>row.kind!=="media"||row.sourceId!=="M-DIB-07"));
  assert.ok(c04.sections?.find(row=>row.id==="teksti-b")?.blockIds.includes("los1-c04-greetings-audio"));
});

test("fourteen genuinely new C04 cards exclude C01 greetings and keep Sie uppercase",()=>{
  const block=book.blocks.find(row=>row.id==="los1-c04-vocabulary");
  assert.ok(block&&block.kind==="vocabulary");
  assert.equal(block.entries.length,14);
  assert.ok(block.entries.some(row=>row.de==="Sie"));
  assert.ok(block.entries.some(row=>row.de==="Ihr Name"));
  assert.ok(block.entries.some(row=>row.de==="die Lehrerin"));
  assert.ok(!block.entries.some(row=>row.de==="Auf Wiedersehen!"||row.de==="Guten Tag!"));
});

test("only capitalization-specific gap tasks treat lowercase sie as wrong",()=>{
  for(const id of ["los1-c04-capital-01","los1-c04-capital-02",
    "los1-c04-capital-05","los1-c04-capital-06"]){
    const ex=book.exercises.find(row=>row.id===id);
    assert.ok(ex&&ex.type==="gap-fill");
    assert.equal(ex.caseSensitive,true);
    assert.equal(evaluateExercise(ex,key(ex))?.correct,true);
    assert.equal(evaluateExercise(ex,"sie")?.correct,false);
  }
  for(const id of ["los1-c04-capital-03","los1-c04-capital-04"]){
    const ex=book.exercises.find(row=>row.id===id);
    assert.ok(ex&&ex.type==="gap-fill");
    assert.equal(evaluateExercise(ex,"du")?.correct,true);
    assert.equal(evaluateExercise(ex,"Du")?.correct,false);
  }
});

test("chapter test 12/12 only after two written situations and four ungraded checks",()=>{
  assert.equal(questions.length,12);
  assert.equal(testDefinition.requiredWritingLines,2);
  assert.equal(testDefinition.selfAssessmentMode,"writing");
  assert.equal(testDefinition.speechCriteria.length,4);
  assert.ok(questions.every(ex=>evaluateExercise(ex,key(ex))?.correct));
  const ready=record();
  const result=gradeChapterTest(testDefinition,questions,ready,"2026-11-11T11:00:00Z");
  assert.equal(result?.score,12);
  assert.equal(result?.maximum,12);
  assert.equal(result?.writtenResponse,ready.writtenResponse);
  assert.equal(gradeChapterTest(testDefinition,questions,record("Guten Tag! Wie heißen Sie?"),"2026-11-11T11:00:00Z"),null);
  assert.equal(gradeChapterTest(testDefinition,questions,record("\n"),"2026-11-11T11:00:00Z"),null);
  const missing=record();
  delete missing.answers[questions[0]!.id];
  assert.equal(gradeChapterTest(testDefinition,questions,missing,"2026-11-11T11:00:00Z"),null);
  assert.ok(result);
  const retried=restartChapterTest({...ready,submission:result});
  assert.equal(retried.previousResults.length,1);
  assert.equal(retried.previousResults[0]?.writtenResponse,ready.writtenResponse);
  assert.equal(retried.previousResults[0]?.score,12);
  assert.equal(retried.writtenResponse,"");
  assert.equal(retried.submission,null);
});
