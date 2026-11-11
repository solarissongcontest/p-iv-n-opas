import assert from "node:assert/strict";
import test from "node:test";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {validateBook,type Exercise,type ExerciseAnswer} from "../src/features/los/model.ts";
import {evaluateExercise} from "../src/features/los/exercises/evaluate.ts";
import {LOS1_C10_CONTRAST_BLOCKS,LOS1_C10_CONTRAST_EXERCISES}
 from "../src/features/los/los1-c10-listen.ts";
import {LOS1_C01_AUTHENTIC_TEXT,LOS1_C01_DIALOGUE_TURNS}
 from "../src/features/los/los1-c01-source.ts";
import {LOS1_C06_HARALD_TEXT,LOS1_C06_HARALD_TURNS}
 from "../src/features/los/los1-c06-source.ts";

const book=LOS_BOOKS[0]!;
const c10=book.chapters.find(c=>c.id==="C10")!;
const l052=book.lessons.find(l=>l.id==="L052")!;
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
test("L052 is a 30-min real practice plan but not a fake Harald video",()=>{
 assert.deepEqual(validateBook(book),[]);
 assert.equal(book.lessons.length,60);
 assert.ok(book.lessons.every(x=>x.publicationStatus==="preview"));
 assert.equal(l052.publicationStatus,"preview");
 assert.equal(l052.estimatedMinutes,30);
 assert.ok(l052.title.includes("Haraldin tekstiä"));
 assert.equal(l052.steps.length,15);
 assert.ok(l052.steps.every(x=>x.required));
 const audioId="los1-c01-m-com-01-audio";
 const genuine=book.blocks.find(b=>b.id===audioId);
 assert.ok(genuine&&genuine.kind==="media"&&genuine.mediaType==="audio");
 assert.equal(genuine.sourceId,"M-COM-01");
 assert.equal(book.sources.find(s=>s.id==="M-COM-01")?.permittedMode,"embed");
 assert.ok(l052.steps.some(s=>s.blockId===audioId));
 assert.ok(l052.steps.some(s=>s.blockId==="los1-c10-m-dib-02-harald"));
 const harald=book.blocks.find(b=>b.id==="los1-c10-m-dib-02-harald");
 assert.ok(harald&&harald.kind==="dialogue");
 assert.equal(harald.sourceId,"M-DIB-02");
 assert.deepEqual(harald.turns.map(t=>t.text),LOS1_C06_HARALD_TURNS.map(t=>t.text));
 assert.ok(!book.blocks.some(b=>b.kind==="media"&&b.sourceId==="M-DIB-02"),
  "The COERLL Harald source is real, but its direct audio/video has not been validated");
});
test("L052 transcript always matches the actual different human audio, without attribution substitution",()=>{
 const comparison=LOS1_C10_CONTRAST_BLOCKS.find(x=>x.id==="los1-c10-contrast-franz-dialogue");
 assert.ok(comparison&&comparison.kind==="dialogue");
 assert.equal(comparison.sourceId,"M-COM-01");
 assert.deepEqual(comparison.turns.map(x=>x.text),LOS1_C01_DIALOGUE_TURNS.map(x=>x.text));
 const guide=LOS1_C10_CONTRAST_BLOCKS.find(x=>x.id==="los1-c10-contrast-start");
 assert.ok(guide&&guide.kind==="paragraph");
 assert.ok(guide.text.includes("ei ole Haraldin ääni"));
 const gate=LOS1_C10_CONTRAST_BLOCKS.find(x=>x.id==="los1-c10-contrast-source-gate");
 assert.ok(gate&&gate.kind==="paragraph"&&gate.text.includes("EI ole tässä tehtävässä"));
 const source=book.sources.find(s=>s.id==="M-DIB-02");
 assert.ok(source?.originalUrl?.endsWith("01_22_int_hb_who"));
 assert.equal(source?.permittedMode,"hosted");
 assert.ok(source.publicationNoteFi?.includes("Video ei ole mukana"));
 assert.equal(LOS1_C10_CONTRAST_BLOCKS.length,8);
 assert.equal(new Set(LOS1_C10_CONTRAST_BLOCKS.map(x=>x.id)).size,8);
 const audio=LOS1_C10_CONTRAST_BLOCKS.filter(x=>x.kind==="media");
 assert.equal(audio.length,0,"The lesson references the already approved, not cloned, M-COM-01 player");
});
test("All 10 C10 distinction tasks have correct answer keys and source-anchored highlight spans",()=>{
 assert.equal(LOS1_C10_CONTRAST_EXERCISES.length,10);
 assert.equal(new Set(LOS1_C10_CONTRAST_EXERCISES.map(x=>x.id)).size,10);
 for(const exercise of LOS1_C10_CONTRAST_EXERCISES){
  assert.ok(c10.exerciseIds.includes(exercise.id));
  assert.equal(evaluateExercise(exercise,answer(exercise))?.correct,true,exercise.id);
  if(exercise.type==="single-choice")
    assert.equal(new Set(exercise.options.map(x=>x.label)).size,exercise.options.length);
  if(exercise.type==="highlight"){
    const expected=exercise.id.includes("franz")?
      LOS1_C01_AUTHENTIC_TEXT:LOS1_C06_HARALD_TEXT;
    assert.equal(exercise.text,expected);
    assert.ok(expected.slice(exercise.acceptedRanges[0]!.start,
      exercise.acceptedRanges[0]!.end).length>4);
  }
 }
 const sections=c10.sections??[];
 const reading=sections.find(x=>x.id==="ymmarra");
 assert.ok(reading&&reading.publicationStatus==="preview");
 assert.ok(reading.blockIds.includes("los1-c01-m-com-01-audio"));
 assert.ok(reading.blockIds.includes("los1-c10-contrast-source-gate"));
 assert.ok(reading.exerciseIds.includes("los1-c10-contrast-audio-age-franz"));
 assert.ok(reading.exerciseIds.includes("los1-c10-contrast-harald-origin"));
});
test("All 60 preview lessons have resolvable steps and the final exam remains only a draft",()=>{
 const stepIds=new Set<string>();
 const blockIds=new Set(book.blocks.map(x=>x.id));
 const exerciseIds=new Set(book.exercises.map(x=>x.id));
 const chapterTestIds=new Set(book.chapterTests.map(x=>x.id));
 for(const lesson of book.lessons){
  assert.ok(lesson.steps.length>0,lesson.id);
  assert.ok(lesson.estimatedMinutes>0,lesson.id);
  for(const step of lesson.steps){
   assert.ok(!stepIds.has(step.id),"Duplicate step "+step.id);
   stepIds.add(step.id);
   const links=[step.blockId,step.exerciseId,step.chapterTestId,step.reflectionPromptFi]
    .filter(Boolean);
   assert.equal(links.length,1,"Every step must have exactly one learning action: "+step.id);
   if(step.blockId)assert.ok(blockIds.has(step.blockId),step.id);
   if(step.exerciseId)assert.ok(exerciseIds.has(step.exerciseId),step.id);
   if(step.chapterTestId)assert.ok(chapterTestIds.has(step.chapterTestId),step.id);
  }
 }
 assert.equal(book.chapters.filter(x=>x.publicationStatus==="published").length,0);
 assert.equal(book.lessons.filter(x=>x.publicationStatus==="published").length,0);
});
