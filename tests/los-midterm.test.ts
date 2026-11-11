import assert from "node:assert/strict";
import test from "node:test";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {validateBook,type Exercise,type ExerciseAnswer} from "../src/features/los/model.ts";
import {evaluateExercise} from "../src/features/los/exercises/evaluate.ts";
import {
  emptyChapterTestRecord,gradeChapterTest,restartChapterTest,
  selectedTestExercises,selectedTestExerciseIds,examScoreGroups,
} from "../src/features/los/chapterTest.ts";
import {LOS1_MIDTERM_FORM_A,LOS1_MIDTERM_FORM_B,LOS1_MIDTERM_TEST}
  from "../src/features/los/los1-midterm.ts";
import {LOS1_REVIEW_ONE_EXERCISES,LOS1_REVIEW_ONE_BLOCKS}
  from "../src/features/los/los1-review-one.ts";

const book=LOS_BOOKS[0];
if(!book)throw Error("LOS! 1 missing");
const definition=LOS1_MIDTERM_TEST;

function answerFor(ex:Exercise):ExerciseAnswer {
  switch(ex.type){
    case "single-choice":return ex.correctOptionId;
    case "gap-fill":return ex.acceptedAnswers[0]??"";
    case "multiple-choice":return [...ex.correctOptionIds];
    case "true-false":return String(ex.correctValue);
    case "word-order":return [...ex.correctOrder];
    case "matching":return Object.fromEntries(ex.pairs.map(pair=>[pair.leftId,pair.rightId]));
    case "categorize":return Object.fromEntries(ex.assignments.map(pair=>[pair.itemId,pair.categoryId]));
    case "highlight":return ex.acceptedRanges[0]??null;
  }
}
const DIALOGUE=[
  "A: Hallo! Wie heißt du?",
  "B: Ich heiße Lena.",
  "A: Woher kommst du?",
  "B: Ich komme aus Finnland.",
  "A: Wie geht's?",
  "B: Gut, danke. Und dir?",
].join("\n");
function ready(attempt=0,response=DIALOGUE){
  const current=selectedTestExercises(definition,book.exercises,attempt);
  return {...emptyChapterTestRecord(definition),attemptNumber:attempt,
    answers:Object.fromEntries(current.map(ex=>[ex.id,answerFor(ex)])),
    selfAssessment:Object.fromEntries(definition.speechCriteria.map(x=>[x.id,"onnistui" as const])),
    writtenResponse:response,
  };
}
test("review lessons L027–L029 have five checked questions and a saved reflection each",()=>{
  assert.deepEqual(validateBook(book),[]);
  assert.equal(LOS1_REVIEW_ONE_EXERCISES.length,15);
  assert.equal(LOS1_REVIEW_ONE_BLOCKS.length,3);
  for(const n of [27,28,29]){
    const id="L"+String(n).padStart(3,"0");
    const lesson=book.lessons.find(x=>x.id===id);
    assert.ok(lesson);
    assert.equal(lesson.publicationStatus,"preview");
    assert.equal(lesson.chapterId,undefined);
    assert.equal(lesson.steps.filter(step=>step.exerciseId).length,5);
    assert.equal(lesson.steps.filter(step=>step.reflectionPromptFi).length,1);
    assert.ok(lesson.steps.every(step=>step.required));
    assert.ok(lesson.steps.some(step=>step.blockId));
    for(const step of lesson.steps){
      if(step.exerciseId)assert.ok(book.exercises.some(x=>x.id===step.exerciseId));
    }
  }
  const audioLesson=book.lessons.find(x=>x.id==="L029");
  assert.ok(audioLesson);
  const mediaIds=audioLesson.steps.flatMap(s=>s.blockId??"").filter(id=>id.includes("audio"));
  assert.equal(mediaIds.length,4);
  for(const id of mediaIds){
    const block=book.blocks.find(x=>x.id===id);
    assert.ok(block&&block.kind==="media",id);
    const source=book.sources.find(x=>x.id===block.sourceId);
    assert.equal(source?.permittedMode,"embed",id);
  }
  for(const exercise of LOS1_REVIEW_ONE_EXERCISES)
    assert.equal(evaluateExercise(exercise,answerFor(exercise))?.correct,true,exercise.id);
});
test("one EX-MID remains a standalone exam, not falsely listed under C05",()=>{
  assert.equal(book.chapterTests.filter(t=>t.examType==="midterm").length,1);
  const exam=book.chapterTests.find(t=>t.id==="los1-midterm-exam");
  assert.equal(exam?.chapterId,"EX-MID");
  assert.equal(exam?.examType,"midterm");
  const lesson=book.lessons.find(x=>x.id==="L030");
  assert.ok(lesson);
  assert.equal(lesson.publicationStatus,"preview");
  assert.equal(lesson.steps.filter(x=>x.chapterTestId===exam?.id).length,1);
  assert.equal(lesson.steps.filter(x=>x.reflectionPromptFi).length,1);
  assert.ok(book.chapters.every(ch=>!ch.exerciseIds.includes("los1-mid-a-01")));
});
test("midterm has exact 25/25 genuinely distinct authored exam tasks",()=>{
  assert.equal(LOS1_MIDTERM_FORM_A.length,25);
  assert.equal(LOS1_MIDTERM_FORM_B.length,25);
  assert.equal(definition.exerciseIds.length,25);
  assert.equal(definition.alternativeExerciseIds?.length,25);
  assert.equal(new Set([...definition.exerciseIds,...definition.alternativeExerciseIds??[]]).size,50);
  assert.deepEqual(definition.scoreGroups?.map(g=>g.exerciseIds.length),[5,7,5,4,4]);
  assert.deepEqual(definition.scoreGroups?.map(g=>g.titleFi),
    ["Tervehdykset","Nimet ja verbit","Alkuperä","Du ja Sie","Vointi"]);
  assert.ok(LOS1_MIDTERM_FORM_A.every((x,i)=>x.id==="los1-mid-a-"+String(i+1).padStart(2,"0")));
  assert.ok(LOS1_MIDTERM_FORM_B.every((x,i)=>x.id==="los1-mid-b-"+String(i+1).padStart(2,"0")));
  for(const [a,b] of LOS1_MIDTERM_FORM_A.map((x,i)=>[x,LOS1_MIDTERM_FORM_B[i]!] as const)){
    assert.notEqual(a.promptFi,b.promptFi,"Retake must be genuinely authored anew: "+a.id);
    assert.equal(evaluateExercise(a,answerFor(a))?.correct,true,a.id);
    assert.equal(evaluateExercise(b,answerFor(b))?.correct,true,b.id);
  }
  assert.ok(LOS1_MIDTERM_FORM_A.every(x=>x.type==="single-choice"||x.type==="gap-fill"));
  assert.ok(LOS1_MIDTERM_FORM_B.every(x=>x.type==="single-choice"||x.type==="gap-fill"));
});
test("midterm answers and explanations only become outcomes after complete submission",()=>{
  const questions=selectedTestExercises(definition,book.exercises,0);
  const result=gradeChapterTest(definition,questions,ready(),"2026-11-11T14:00:00Z");
  assert.equal(result?.score,25);
  assert.equal(result?.maximum,25);
  assert.equal(result?.outcomes.length,25);
  assert.equal(result?.writtenResponse,DIALOGUE);
  const groupScores=examScoreGroups(definition,result??null);
  assert.deepEqual(groupScores.map(g=>[g.score,g.maximum]),[[5,5],[7,7],[5,5],[4,4],[4,4]]);
  assert.deepEqual(examScoreGroups(definition,null),[]);
  assert.equal(groupScores.reduce((sum,g)=>sum+g.score,0),result?.score);
  assert.equal(groupScores.reduce((sum,g)=>sum+g.maximum,0),result?.maximum);
});
test("4 to 6 lines are required and unscored, independent of exam percentage",()=>{
  const questions=selectedTestExercises(definition,book.exercises);
  for(const invalid of ["", "A: Hallo!","A: Hallo!\nB: Guten Tag!\nA: Wie heißt du?",
    DIALOGUE+"\nA: Auf Wiedersehen!"]){
    assert.equal(gradeChapterTest(definition,questions,ready(0,invalid),"2026-11-11T14:00:00Z"),null);
  }
  for(const count of [4,5,6]){
    const lines=DIALOGUE.split("\n").slice(0,count).join("\n");
    const result=gradeChapterTest(definition,questions,ready(0,lines),"2026-11-11T14:00:00Z");
    assert.equal(result?.score,25);
    assert.equal(result?.writtenResponse,lines);
  }
  const missing=ready();
  delete missing.selfAssessment[definition.speechCriteria[0]!.id];
  assert.equal(gradeChapterTest(definition,questions,missing,"2026-11-11T14:00:00Z"),null);
});
test("retakes use authorized new tasks, and grouped score follows question positions",()=>{
  const first=ready();
  const firstQuestions=selectedTestExercises(definition,book.exercises,0);
  const firstResult=gradeChapterTest(definition,firstQuestions,first,"2026-11-11T14:00:00Z");
  assert.ok(firstResult);
  const next=restartChapterTest({...first,submission:firstResult});
  assert.equal(next.attemptNumber,1);
  assert.equal(next.previousResults.length,1);
  assert.equal(next.previousResults[0]?.score,25);
  assert.equal(next.previousResults[0]?.writtenResponse,DIALOGUE);
  assert.deepEqual(next.answers,{});
  assert.deepEqual(next.selfAssessment,{});
  const picked=selectedTestExerciseIds(definition,1);
  assert.equal(picked.length,25);
  assert.ok(picked.some((id,i)=>id!==definition.exerciseIds[i]));
  assert.ok(picked.every((id,i)=>id===definition.exerciseIds[i]||id===definition.alternativeExerciseIds?.[i]));
  const retry=ready(1);
  // Get one answer intentionally wrong in 'Nimet ja verbit' section:
  const chosen=selectedTestExercises(definition,book.exercises,1);
  const name=chosen[6]!;
  if(name.type!=="single-choice")throw Error("Expected authored name choice in slot 7");
  retry.answers[name.id]=name.options.find(x=>x.id!==name.correctOptionId)!.id;
  const result=gradeChapterTest(definition,chosen,retry,"2026-11-12T14:00:00Z");
  assert.equal(result?.score,24);
  assert.deepEqual(examScoreGroups(definition,result??null).map(g=>g.score),[5,6,5,4,4]);
  assert.equal(result?.maximum,25);
});
test("validateBook rejects malformed standalone exam or incorrect section partition",()=>{
  const bad=structuredClone(book);
  const exam=bad.chapterTests.find(x=>x.id===definition.id);
  assert.ok(exam);
  exam.chapterId="MADE-UP";
  assert.match(validateBook(bad).join(";"),/Unknown test chapter/);
  exam.chapterId="EX-MID";
  if(!exam.scoreGroups)throw Error("Groups missing");
  exam.scoreGroups[0]!.exerciseIds=[...exam.scoreGroups[0]!.exerciseIds,"los1-mid-a-06"];
  assert.match(validateBook(bad).join(";"),/Invalid exam section coverage/);
});
