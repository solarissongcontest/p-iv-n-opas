import assert from "node:assert/strict";
import test from "node:test";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {validateBook,type Exercise,type ExerciseAnswer} from "../src/features/los/model.ts";
import {evaluateExercise} from "../src/features/los/exercises/evaluate.ts";
import {germanCardinal,C06_ZERO_TO_TWENTY,C06_TENS} from "../src/features/los/numbers.ts";
import {LOS1_C01_DIALOGUE_TURNS} from "../src/features/los/los1-c01-source.ts";
import {LOS1_C06_HARALD_TURNS,LOS1_C06_HARALD_TEXT}
  from "../src/features/los/los1-c06-source.ts";
import {LOS1_C06_AUTHENTIC_NUMBER_LIST} from "../src/features/los/los1-c06-content.ts";
import {
  LOS1_C06_PRACTICE_EXERCISES,LOS1_C06_NUMBER_0_TO_20,LOS1_C06_NUMBER_21_TO_99,LOS1_C06_TENS,
} from "../src/features/los/los1-c06-practice.ts";
import {emptyChapterTestRecord,gradeChapterTest,selectedTestExercises,restartChapterTest}
  from "../src/features/los/chapterTest.ts";

const book=LOS_BOOKS[0];
if(!book)throw Error("LOS! 1 missing");
const chapter=book.chapters.find(ch=>ch.id==="C06");
const definition=book.chapterTests.find(t=>t.chapterId==="C06");
if(!chapter||!definition)throw Error("C06 missing");
const questions=selectedTestExercises(definition,book.exercises);

function answerFor(ex:Exercise):ExerciseAnswer {
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
function finished(response="A: Wie alt bist du? B: Ich bin siebzehn Jahre alt.\nA: Wie alt sind Sie? B: Ich bin dreißig Jahre alt."){
  return {
    ...emptyChapterTestRecord(definition),
    answers:Object.fromEntries(questions.map(item=>[item.id,answerFor(item)])),
    selfAssessment:Object.fromEntries(definition.speechCriteria.map(item=>[item.id,"onnistui" as const])),
    writtenResponse:response,
  };
}
test("German cardinal conversion exactly 0–100 and irregular spellings",()=>{
  const words=Array.from({length:101},(_,i)=>germanCardinal(i));
  assert.equal(new Set(words).size,101);
  const expected:[[number,string],...Array<[number,string]>]=[
    [0,"null"],[1,"eins"],[11,"elf"],[12,"zwölf"],[13,"dreizehn"],
    [16,"sechzehn"],[17,"siebzehn"],[19,"neunzehn"],[20,"zwanzig"],
    [21,"einundzwanzig"],[27,"siebenundzwanzig"],[30,"dreißig"],
    [32,"zweiunddreißig"],[46,"sechsundvierzig"],[60,"sechzig"],
    [70,"siebzig"],[71,"einundsiebzig"],[80,"achtzig"],[90,"neunzig"],
    [99,"neunundneunzig"],[100,"hundert"],
  ];
  for(const [n,de] of expected)assert.equal(germanCardinal(n),de,String(n));
  assert.equal(C06_ZERO_TO_TWENTY.length,21);
  assert.equal(C06_TENS.length,9);
  for(const wrong of [-1,101,1.2,NaN,Infinity])assert.throws(()=>germanCardinal(wrong),RangeError);
  assert.ok(words.every(word=>!word.includes("einsund")));
  assert.ok(words.every(word=>!word.includes("siebenzehn")&&!word.includes("sechszehn")));
});
test("sixth chapter sections and L031–L035 coexist with working L027–L030 review and midterm",()=>{
  assert.deepEqual(validateBook(book),[]);
  assert.equal(chapter.publicationStatus,"preview");
  assert.equal(chapter.sections?.length,10);
  assert.ok(chapter.sections?.every(s=>s.publicationStatus==="preview"));
  assert.deepEqual(book.lessons.filter(l=>l.chapterId==="C06"&&l.publicationStatus==="preview").map(l=>l.id),
    ["L031","L032","L033","L034","L035"]);
  assert.ok(["L027","L028","L029","L030"].every(id=>book.lessons.find(l=>l.id===id)?.publicationStatus==="preview"));
  assert.ok(["L027","L028","L029","L030"].every(id=>(book.lessons.find(l=>l.id===id)?.steps.length??0)>0));
  assert.equal(chapter.exerciseIds.length,96);
  assert.equal(new Set(chapter.exerciseIds).size,96);
  const allRefs=new Set(chapter.sections?.flatMap(s=>s.exerciseIds));
  assert.ok(chapter.exerciseIds.every(id=>allRefs.has(id)),"No C06 exercise is hidden away in chapter registry");
  assert.ok(chapter.sections?.find(s=>s.id==="teksti-a")?.blockIds.includes("los1-c06-m-com-01-dialogue"));
  assert.ok(chapter.sections?.find(s=>s.id==="teksti-b")?.blockIds.includes("los1-c06-m-dib-02-dialogue"));
  assert.ok(chapter.sections?.find(s=>s.id==="tarkista")?.exerciseIds.includes("los1-c06-exam-20"));
});
test("Text A is transparently a second learning pass over the same genuine CC BY-SA source",()=>{
  const original=book.blocks.find(b=>b.id==="los1-c06-m-com-01-dialogue");
  assert.ok(original&&original.kind==="dialogue");
  assert.equal(original.sourceId,"M-COM-01");
  assert.deepEqual(original.turns.map(t=>t.text),LOS1_C01_DIALOGUE_TURNS.map(t=>t.text));
  const source=book.sources.find(s=>s.id==="M-COM-01");
  assert.equal(source?.permittedMode,"embed");
  const guide=book.blocks.find(b=>b.id==="los1-c06-text-a-intro");
  assert.ok(guide&&guide.kind==="paragraph");
  assert.match(guide.text,/EI ole toinen itsenäinen pääteksti/);
  assert.ok(chapter.plannedSourceIds?.includes("M-DIB-02"));
});
test("Harald interview has complete seven Q&A positions except clearly redacted phone digits",()=>{
  assert.equal(LOS1_C06_HARALD_TURNS.length,14);
  assert.equal(LOS1_C06_HARALD_TEXT.split("\n").length,14);
  assert.ok(LOS1_C06_HARALD_TURNS.every(line=>Boolean(line.translationFi)));
  assert.ok(LOS1_C06_HARALD_TEXT.includes("Ich bin jetzt so um die fünfzig."));
  assert.ok(LOS1_C06_HARALD_TEXT.includes("[Telefonnummer aus Datenschutzgründen entfernt.]"));
  assert.ok(!LOS1_C06_HARALD_TEXT.includes("Neun, eins, zwei, eins, fünf, sechs, sechs."));
  const source=book.sources.find(s=>s.id==="M-DIB-02");
  assert.equal(source?.permittedMode,"hosted");
  assert.equal(source?.licenseUrl,"https://creativecommons.org/licenses/by/4.0/");
  assert.match(source?.modification??"",/puhelinnumero on poistettu/);
  assert.ok(book.blocks.every(b=>b.kind!=="media"||b.sourceId!=="M-DIB-02"),
    "No unverified COERLL Harald video claimed");
  const sourceText=book.blocks.find(b=>b.id==="los1-c06-m-dib-02-dialogue");
  assert.ok(sourceText&&sourceText.kind==="dialogue");
  assert.equal(sourceText.sourceId,"M-DIB-02");
  assert.deepEqual(sourceText.turns.map(x=>x.text),LOS1_C06_HARALD_TURNS.map(x=>x.text));
});
test("a human PD number list is completely included and never falsely called COERLL audio",()=>{
  const audio=book.blocks.find(b=>b.id==="los1-c06-m-com-06-numbers-audio");
  assert.ok(audio&&audio.kind==="media");
  assert.equal(audio.sourceId,"M-COM-06");
  assert.equal(audio.embedUrl,"https://upload.wikimedia.org/wikipedia/commons/5/56/German_Vocabulary_-_Numbers.ogg");
  assert.ok(audio.mp3Url?.endsWith("/German_Vocabulary_-_Numbers.ogg.mp3"));
  const transcript=book.blocks.find(b=>b.id==="los1-c06-m-com-06-transcript");
  assert.ok(transcript&&transcript.kind==="transcript");
  assert.equal(transcript.sourceId,"M-COM-06");
  assert.deepEqual(transcript.lines.map(x=>x.de),LOS1_C06_AUTHENTIC_NUMBER_LIST);
  assert.equal(transcript.lines.length,27);
  for(const forbidden of ["null","achtzig","neunzig"])
    assert.ok(!transcript.lines.some(l=>l.de===forbidden));
  const source=book.sources.find(s=>s.id==="M-COM-06");
  assert.equal(source?.permittedMode,"embed");
  assert.ok(source?.licenseOrBasis.toLowerCase().includes("public domain"));
  assert.ok(source?.publicationNoteFi?.includes("muokattu"));
});
test("C06 active word bank tracks 0–20 once, plus grammar phrases, and all practice answers are valid",()=>{
  const vocab=book.blocks.find(b=>b.id==="los1-c06-vocabulary");
  assert.ok(vocab&&vocab.kind==="vocabulary");
  assert.equal(vocab.entries.length,26);
  assert.equal(new Set(vocab.entries.map(x=>x.id)).size,26);
  assert.equal(LOS1_C06_NUMBER_0_TO_20.length,21);
  assert.equal(LOS1_C06_NUMBER_21_TO_99.length,9);
  assert.equal(LOS1_C06_TENS.length,8);
  for (const task of LOS1_C06_TENS) {
    assert.equal(task.type, "single-choice", task.id);
    if(task.type==="single-choice")
      assert.equal(new Set(task.options.map(option=>option.label)).size, task.options.length, "Distinct distractors required: "+task.id);
  }
  assert.equal(LOS1_C06_PRACTICE_EXERCISES.length,67);
  for(const item of LOS1_C06_PRACTICE_EXERCISES)
    assert.equal(evaluateExercise(item,answerFor(item))?.correct,true,item.id);
  const practice=book.exercises.find(x=>x.id==="los1-c06-digit-16");
  assert.ok(practice&&practice.type==="gap-fill");
  assert.equal(evaluateExercise(practice,"sechszehn")?.correct,false);
  assert.equal(evaluateExercise(practice,"sechzehn")?.correct,true);
  const compound=book.exercises.find(x=>x.id==="los1-c06-compound-21");
  assert.ok(compound&&compound.type==="gap-fill");
  assert.equal(evaluateExercise(compound,"einsundzwanzig")?.correct,false);
  assert.equal(evaluateExercise(compound,"einundzwanzig")?.correct,true);
});
test("C06 20-point test keeps two real writing lines unscored and preserves history",()=>{
  assert.equal(questions.length,20);
  assert.equal(definition.selfAssessmentMode,"writing");
  assert.equal(definition.requiredWritingLines,2);
  assert.equal(definition.speechCriteria.length,4);
  assert.ok(questions.every(item=>evaluateExercise(item,answerFor(item))?.correct));
  const record=finished();
  const graded=gradeChapterTest(definition,questions,record,"2026-11-11T12:00:00Z");
  assert.equal(graded?.score,20);
  assert.equal(graded?.maximum,20);
  assert.equal(graded?.writtenResponse,record.writtenResponse);
  assert.equal(gradeChapterTest(definition,questions,finished("Eine einzige Zeile."),"2026-11-11T12:00:00Z"),null);
  const incomplete=finished();
  delete incomplete.answers[questions[0]!.id];
  assert.equal(gradeChapterTest(definition,questions,incomplete,"2026-11-11T12:00:00Z"),null);
  assert.ok(graded);
  const again=restartChapterTest({...record,submission:graded});
  assert.equal(again.previousResults[0]?.score,20);
  assert.equal(again.previousResults[0]?.writtenResponse,record.writtenResponse);
  assert.equal(again.writtenResponse,"");
});
