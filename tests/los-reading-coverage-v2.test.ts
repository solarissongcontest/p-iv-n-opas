import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
  losReadingQuestions,losReadingQuestionCorrect,validateLos1ReadingBank
} from "../src/features/los/content/los1ReadingBank.ts";
import {LOS1_REVISED_AB} from "../src/features/los/content/los1RevisedAB.ts";
import {LOS1_REVISED_C} from "../src/features/los/content/los1RevisedC.ts";

const chapters=Array.from({length:10},(_,i)=>String(i+1).padStart(2,"0"));

test("All 150 A/B/C questions exist with exact source evidence and unique stable IDs",()=>{
  assert.deepEqual(validateLos1ReadingBank(),[]);
  const ids=new Set<string>();
  for(const chapter of chapters){
    assert.equal(losReadingQuestions(chapter,"A").length,8,chapter+" Text A");
    assert.equal(losReadingQuestions(chapter,"B").length,5,chapter+" Text B");
    assert.equal(losReadingQuestions(chapter,"C").length,2,chapter+" Text C");
    for(const text of ["A","B","C"] as const){
      for(const question of losReadingQuestions(chapter,text)){
        assert.ok(question.id.startsWith("LOS1-READ-V2-C"+chapter+"-"+text+"-"));
        assert.ok(!ids.has(question.id),question.id);
        ids.add(question.id);
        assert.ok(question.explanation.length>=10);
      }
    }
  }
  assert.equal(ids.size,150);
});

test("Only deterministic multiple choice is autograded; open writing is self checked",()=>{
  for(const chapter of chapters){
    for(const text of ["A","B","C"] as const){
      for(const question of losReadingQuestions(chapter,text)){
        if(question.kind==="open"){
          assert.equal(losReadingQuestionCorrect(question,question.modelAnswer),null);
        }else{
          assert.equal(losReadingQuestionCorrect(question,question.options[question.answerIndex]??""),true);
          for(const [i,option] of question.options.entries()){
            if(i!==question.answerIndex)assert.equal(losReadingQuestionCorrect(question,option),false);
          }
        }
      }
    }
  }
});

test("Editorial corrections avoid the teacher-name paradox and support the C07 spelling story",()=>{
  const c10=LOS1_REVISED_AB.chapters.find(ch=>ch.chapterId==="C10");
  assert.ok(c10);
  const script=c10.textA.blocks.map(block=>block.text??"").join(" ");
  assert.doesNotMatch(script,/wie heißt Ihre Lehrerin\?/i);
  assert.match(script,/Sag einfach: „Noch einmal, bitte!“/);
  const c07=LOS1_REVISED_AB.chapters.find(ch=>ch.chapterId==="C07");
  assert.ok(c07);
  const spelling=c07.textA.blocks.map(block=>block.text??"").join(" ");
  assert.match(spelling,/E-I-N-O\? Richtig\?/);
  assert.match(spelling,/Nein! A-I-N-O. Mit A!/);
  const c09=LOS1_REVISED_AB.chapters.find(ch=>ch.chapterId==="C09");
  assert.ok(c09);
  assert.ok(c09.textB.blocks.some(block=>block.text==="**Dienstag:** kein Deutschkurs"));
  assert.equal(LOS1_REVISED_C.chapters.length,10);
});

test("The new A/B/C tasks preserve original tasks and share the existing learner draft",()=>{
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  const reader=readFileSync("src/features/los/LosRevisedTextPages.tsx","utf8");
  const ui=readFileSync("src/features/los/LosReadingExercises.tsx","utf8");
  assert.match(book,/LosRevisedUnderstanding chapterId=\{chapter.id\}/);
  assert.match(book,/OriginalTextPage chapter=\{chapter\}/);
  assert.match(reader,/LosReadingExercises chapterId=\{chapterId\} text=\{kind\}/);
  assert.match(reader,/LosReadingExercises chapterId=\{chapterId\} text="C"/);
  assert.match(ui,/useLosChapterDraft\(1,chapterId\)/);
  assert.match(ui,/practiceAnswers/);
  assert.match(ui,/practiceChecked/);
  assert.match(ui,/role="status"/);
  assert.match(reader,/Mallivastaus\|Mallirunko/);
});
