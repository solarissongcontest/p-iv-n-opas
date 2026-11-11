import assert from "node:assert/strict";
import test from "node:test";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {validateBook,type Exercise,type ExerciseAnswer} from "../src/features/los/model.ts";
import {evaluateExercise} from "../src/features/los/exercises/evaluate.ts";
import {LOS1_C07_AUTHENTIC_TURNS,LOS1_C07_AUTHENTIC_TEXT,LOS1_C07_SOURCE_EXERCISES}
  from "../src/features/los/los1-c07-source.ts";
import {
  LOS1_C07_COERLL_ALPHABET,LOS1_C07_STANDARD_ALPHABET,
  LOS1_C07_FICTIONAL_NAMES,LOS1_C07_FICTIONAL_NUMBERS,
} from "../src/features/los/los1-c07-content.ts";
import {
  LOS1_C07_PRACTICE_EXERCISES,LOS1_C07_NAME_EXERCISES,LOS1_C07_NUMBER_EXERCISES,
} from "../src/features/los/los1-c07-practice.ts";
import {LOS1_C07_EXAM_A,LOS1_C07_EXAM_B} from "../src/features/los/los1-c07-test.ts";
import {
  emptyChapterTestRecord,gradeChapterTest,selectedTestExercises,
  selectedTestExerciseIds,restartChapterTest,
} from "../src/features/los/chapterTest.ts";

const book=LOS_BOOKS[0];
if(!book)throw Error("LOS! 1 missing");
const chapter=book.chapters.find(row=>row.id==="C07");
const definition=book.chapterTests.find(row=>row.chapterId==="C07");
if(!chapter||!definition)throw Error("C07 missing");
function answerFor(ex:Exercise):ExerciseAnswer {
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
const full=(attempt=0)=>({
  ...emptyChapterTestRecord(definition),
  attemptNumber:attempt,
  answers:Object.fromEntries(selectedTestExercises(definition,book.exercises,attempt)
    .map(ex=>[ex.id,answerFor(ex)])),
  selfAssessment:Object.fromEntries(definition.speechCriteria.map(x=>[x.id,"onnistui" as const])),
});
test("C07 is ten real preview sections and exactly L036–L040 sessions",()=>{
  assert.deepEqual(validateBook(book),[]);
  assert.equal(chapter.publicationStatus,"preview");
  assert.equal(chapter.sections?.length,10);
  assert.ok(chapter.sections?.every(row=>row.publicationStatus==="preview"));
  assert.deepEqual(book.lessons.filter(row=>row.chapterId==="C07"&&row.publicationStatus==="preview")
    .map(row=>row.id),["L036","L037","L038","L039","L040"]);
  assert.equal(LOS1_C07_SOURCE_EXERCISES.length,8);
  assert.equal(LOS1_C07_PRACTICE_EXERCISES.length,40);
  assert.equal(LOS1_C07_EXAM_A.length,15);
  assert.equal(chapter.exerciseIds.length,63);
  assert.equal(new Set(chapter.exerciseIds).size,63);
  const seen=new Set(chapter.sections?.flatMap(row=>row.exerciseIds));
  assert.ok(chapter.exerciseIds.every(id=>seen.has(id)),"Every C07 chapter task should be routable");
  assert.ok(chapter.sections?.find(s=>s.id==="teksti-a")?.blockIds.includes("los1-c07-wb-02-dialogue"));
  assert.ok(chapter.sections?.find(s=>s.id==="teksti-b")?.blockIds.includes("los1-c07-dib-06-alphabet"));
  assert.ok(chapter.sections?.find(s=>s.id==="teksti-b")?.blockIds.includes("los1-c07-m-com-07-alphabet-audio"));
  assert.ok(chapter.sections?.find(s=>s.id==="tarkista")?.exerciseIds.includes("los1-c07-exam-a-15"));
  const finalLesson=book.lessons.find(x=>x.id==="L040");
  assert.ok(finalLesson?.steps.some(s=>s.chapterTestId===definition.id));
});
test("Authentic full Wikibooks phone call is unchanged at five speaker turns",()=>{
  const expected=[
    "Auskunft, guten Tag.",
    "Guten Tag. Ich hätte gerne die Telefonnummer von Frau Claudia Bolliger aus Bern.",
    "Wie schreibt man das? Bitte buchstabieren Sie.",
    "Natürlich. Claudia: C wie Cäsar, L wie Ludwig, A wie Anton, U wie Ursula, D wie Dora, I wie Ida, A wie Anton. Bolliger: B wie Berta, O wie Otto, zweimal L wie Ludwig, I wie Ida, G wie Gustav, E wie Emil und R wie Richard.",
    "Danke. Die Nummer lautet ...",
  ];
  assert.deepEqual(LOS1_C07_AUTHENTIC_TURNS.map(x=>x.text),expected);
  assert.equal(LOS1_C07_AUTHENTIC_TEXT,expected.join("\n"));
  assert.ok(LOS1_C07_AUTHENTIC_TURNS.every(x=>Boolean(x.translationFi)));
  assert.deepEqual(LOS1_C07_AUTHENTIC_TURNS.map(x=>x.speaker),
    ["Auskunft","Franz","Auskunft","Franz","Auskunft"]);
  const block=book.blocks.find(x=>x.id==="los1-c07-wb-02-dialogue");
  assert.ok(block&&block.kind==="dialogue");
  assert.equal(block.sourceId,"M-WB-02");
  assert.deepEqual(block.turns.map(x=>x.text),expected);
  const source=book.sources.find(x=>x.id==="M-WB-02");
  assert.equal(source?.permittedMode,"hosted");
  assert.equal(source?.licenseUrl,"https://creativecommons.org/licenses/by-sa/4.0/");
  assert.ok(source?.originalUrl?.includes("oldid=3504939"));
  assert.ok(LOS1_C07_AUTHENTIC_TEXT.endsWith("Die Nummer lautet ..."));
  assert.ok(!/\d{5,}/u.test(LOS1_C07_AUTHENTIC_TEXT),"No fake source phone number");
});
test("COERLL has all 30 original sorted letters, not an unverified audio transcript",()=>{
  assert.equal(LOS1_C07_STANDARD_ALPHABET.length,26);
  assert.equal(LOS1_C07_COERLL_ALPHABET.length,30);
  assert.deepEqual(LOS1_C07_COERLL_ALPHABET,[
    "A","Ä","B","C","D","E","F","G","H","I","J","K","L","M","N","O",
    "Ö","P","Q","R","S","ß","T","U","Ü","V","W","X","Y","Z",
  ]);
  const b=book.blocks.find(x=>x.id==="los1-c07-dib-06-alphabet");
  assert.ok(b&&b.kind==="authenticText");
  assert.equal(b.sourceId,"M-DIB-06");
  assert.equal(b.text,LOS1_C07_COERLL_ALPHABET.join(", "));
  const source=book.sources.find(x=>x.id==="M-DIB-06");
  assert.equal(source?.permittedMode,"hosted");
  assert.equal(source?.licenseUrl,"https://creativecommons.org/licenses/by/4.0/");
  assert.ok(book.blocks.every(x=>x.kind!=="media"||x.sourceId!=="M-DIB-06"),
    "No unverified COERLL media should appear as playable");
});
test("Independent real human alphabet recording is Timwi's 28s public domain original",()=>{
  const audio=book.blocks.find(b=>b.id==="los1-c07-m-com-07-alphabet-audio");
  assert.ok(audio&&audio.kind==="media");
  assert.equal(audio.sourceId,"M-COM-07");
  assert.equal(audio.embedUrl,"https://upload.wikimedia.org/wikipedia/commons/9/92/German_alphabet-2.ogg");
  assert.equal(audio.mp3Url,"https://upload.wikimedia.org/wikipedia/commons/transcoded/9/92/German_alphabet-2.ogg/German_alphabet-2.ogg.mp3");
  const source=book.sources.find(x=>x.id==="M-COM-07");
  assert.equal(source?.permittedMode,"embed");
  assert.ok(source?.licenseOrBasis.includes("Public domain"));
  assert.equal(source?.author,"Timwi");
  assert.ok(source?.publicationNoteFi?.includes("28"));
});
test("Sixteen C07 vocabulary cards; eight fictional names and four not-for-dialing sequences",()=>{
  const block=book.blocks.find(x=>x.id==="los1-c07-words");
  assert.ok(block&&block.kind==="vocabulary");
  assert.equal(block.entries.length,16);
  assert.ok(block.entries.every(x=>x.id.startsWith("los1-c07-word-")));
  assert.equal(LOS1_C07_FICTIONAL_NAMES.length,8);
  assert.equal(LOS1_C07_FICTIONAL_NUMBERS.length,4);
  assert.equal(LOS1_C07_NAME_EXERCISES.length,8);
  assert.equal(LOS1_C07_NUMBER_EXERCISES.length,4);
  for(const ex of [...LOS1_C07_SOURCE_EXERCISES,...LOS1_C07_PRACTICE_EXERCISES]){
    assert.equal(evaluateExercise(ex,answerFor(ex))?.correct,true,ex.id);
    if(ex.type==="single-choice")
      assert.equal(new Set(ex.options.map(o=>o.label)).size,ex.options.length,ex.id);
  }
  const n=LOS1_C07_NUMBER_EXERCISES[0];
  assert.ok(n&&n.type==="gap-fill");
  assert.equal(evaluateExercise(n,"01023")?.correct,true);
  assert.equal(evaluateExercise(n,"010 23")?.correct,true);
  assert.equal(evaluateExercise(n,"01923")?.correct,false);
});
test("Fifteen-item exam has authored second version and self-assessed, not auto-scored, speech",()=>{
  assert.equal(definition.exerciseIds.length,15);
  assert.equal(definition.alternativeExerciseIds?.length,15);
  assert.equal(new Set([...definition.exerciseIds,...(definition.alternativeExerciseIds??[])]).size,30);
  assert.equal(definition.selfAssessmentMode,"speech");
  assert.equal(definition.speechCriteria.length,4);
  assert.ok(definition.speechExampleDe?.includes("L – E – N – A"));
  for(const questions of [LOS1_C07_EXAM_A,LOS1_C07_EXAM_B]){
    assert.ok(questions.every(q=>evaluateExercise(q,answerFor(q))?.correct));
  }
  for(const [a,b] of LOS1_C07_EXAM_A.map((x,i)=>[x,LOS1_C07_EXAM_B[i]!] as const))
    assert.notEqual(a.promptFi,b.promptFi,a.id);
  const chosen=selectedTestExercises(definition,book.exercises,0);
  const result=gradeChapterTest(definition,chosen,full(),"2026-11-11T14:00:00Z");
  assert.equal(result?.score,15);
  assert.equal(result?.maximum,15);
  const missing=full();
  delete missing.selfAssessment[definition.speechCriteria[0]!.id];
  assert.equal(gradeChapterTest(definition,chosen,missing,"2026-11-11T14:00:00Z"),null);
  const retry=restartChapterTest({...full(),submission:result!});
  assert.equal(retry.previousResults.length,1);
  assert.equal(retry.previousResults[0]?.score,15);
  assert.equal(retry.submission,null);
  const picked=selectedTestExerciseIds(definition,1);
  assert.ok(picked.some((id,i)=>id!==definition.exerciseIds[i]));
  assert.ok(picked.every((id,i)=>id===definition.exerciseIds[i]||id===definition.alternativeExerciseIds?.[i]));
  const again=gradeChapterTest(definition,selectedTestExercises(definition,book.exercises,1),full(1),"2026-11-12T14:00:00Z");
  assert.equal(again?.score,15);
  assert.equal(again?.maximum,15);
});
