import assert from "node:assert/strict";
import test from "node:test";
import {readFileSync} from "node:fs";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {validateBook,type Exercise,type ExerciseAnswer} from "../src/features/los/model.ts";
import {evaluateExercise} from "../src/features/los/exercises/evaluate.ts";
import {LOS1_FINAL_FORM_A,LOS1_FINAL_FORM_B,LOS1_FINAL_TEST,LOS1_FINAL_BLOCKS}
 from "../src/features/los/los1-final-exam.ts";
import {
 emptyChapterTestRecord,gradeChapterTest,examScoreGroups,
 selectedTestExercises,selectedTestExerciseIds,restartChapterTest,
} from "../src/features/los/chapterTest.ts";

const book=LOS_BOOKS[0];
if(!book)throw Error("LOS! 1 missing");
const definition=book.chapterTests.find(x=>x.id===LOS1_FINAL_TEST.id);
if(!definition)throw Error("LOS! 1 final test missing");
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
const message=[
 "Ich heiße Lena.","Ich komme aus Finnland.","Mir geht es gut.",
 "Das ist Ben.","Er kommt aus Deutschland.",
 "Am Freitag um vier Uhr?","Bis Freitag!",
].join("\n");
const dialogue=[
 "Mia: Guten Tag! Ich heiße Mia. Wie heißt du?",
 "Paul: Hallo! Ich heiße Paul.",
 "Mia: Woher kommst du?",
 "Paul: Ich komme aus Finnland. Und du?",
 "Mia: Aus Deutschland. Wie geht es dir?",
 "Paul: Gut, danke. Am Montag um drei Uhr?",
 "Mia: Noch einmal, bitte. Am Montag um drei?",
 "Paul: Ja! Bis Montag!",
].join("\n");
function complete(attempt=0){
 return {
  ...emptyChapterTestRecord(definition),
  attemptNumber:attempt,
  answers:Object.fromEntries(selectedTestExercises(definition,book.exercises,attempt)
   .map(ex=>[ex.id,answer(ex)])),
  selfAssessment:Object.fromEntries(definition.speechCriteria.map(x=>[x.id,"onnistui" as const])),
  writtenResponse:message,secondWrittenResponse:dialogue,listeningSelfReported:true,
 };
}
test("Book has 50-point standalone EX-FINAL, all sixty canonical lessons, ten preview chapters",()=>{
 assert.deepEqual(validateBook(book),[]);
 assert.equal(book.chapters.length,10);
 assert.equal(book.lessons.length,60);
 assert.equal(book.chapters.filter(x=>x.publicationStatus==="preview").length,10);
 assert.equal(book.lessons.filter(x=>x.publicationStatus==="preview").length,60);
 assert.equal(book.lessons.filter(x=>x.publicationStatus==="published").length,0);
 assert.equal(book.chapterTests.filter(x=>x.examType==="final").length,1);
 assert.equal(definition.chapterId,"EX-FINAL");
 assert.equal(definition.examType,"final");
 const lesson=book.lessons.find(x=>x.id==="L059");
 assert.ok(lesson&&lesson.publicationStatus==="preview");
 assert.ok(lesson.steps.some(x=>x.chapterTestId===definition.id));
 assert.ok(lesson.steps.some(x=>x.blockId==="los1-final-intro"));
 assert.equal(LOS1_FINAL_BLOCKS.length,1);
});
test("Two individually authored 50-question forms cover exactly 12/10/10/10/8 domains",()=>{
 assert.equal(LOS1_FINAL_FORM_A.length,50);
 assert.equal(LOS1_FINAL_FORM_B.length,50);
 assert.equal(definition.exerciseIds.length,50);
 assert.equal(definition.alternativeExerciseIds?.length,50);
 assert.equal(new Set([...definition.exerciseIds,...(definition.alternativeExerciseIds??[])]).size,100);
 assert.deepEqual(definition.scoreGroups?.map(g=>[g.id,g.exerciseIds.length]),[
  ["listening",12],["reading",10],["vocabulary",10],
  ["grammar",10],["situations",8],
 ]);
 const all=[...LOS1_FINAL_FORM_A,...LOS1_FINAL_FORM_B];
 for(const ex of all)assert.equal(evaluateExercise(ex,answer(ex))?.correct,true,ex.id);
 for(let slot=0;slot<50;slot++){
  const a=LOS1_FINAL_FORM_A[slot],b=LOS1_FINAL_FORM_B[slot];
  assert.ok(a&&b);
  assert.notEqual(a.promptFi,b.promptFi,"Each retake slot has distinct authored wording");
  if(a.type==="single-choice")assert.equal(new Set(a.options.map(x=>x.label)).size,3);
  if(b.type==="single-choice")assert.equal(new Set(b.options.map(x=>x.label)).size,3);
 }
 assert.notDeepEqual(selectedTestExerciseIds(definition,1),definition.exerciseIds);
});
test("Listening has four source-authorized in-app human audio players, never invented clips",()=>{
 assert.deepEqual(definition.listeningBlockIds,[
  "los1-c01-m-com-01-audio","los1-c01-m-com-03-audio",
  "los1-c02-wb-original-audio","los1-c06-m-com-06-numbers-audio",
 ]);
 for(const id of definition.listeningBlockIds??[]){
  const block=book.blocks.find(b=>b.id===id);
  assert.ok(block&&block.kind==="media"&&block.mediaType==="audio");
  const source=book.sources.find(s=>s.id===block.sourceId);
  assert.equal(source?.permittedMode,"embed");
  assert.ok(block.embedUrl.startsWith("https://upload.wikimedia.org/wikipedia/commons/"));
 }
 const broken=structuredClone(book);
 const final=broken.chapterTests.find(x=>x.id===definition.id);
 assert.ok(final);
 final.listeningBlockIds=["made-up-audio-source"];
 assert.match(validateBook(broken).join(", "),/Unapproved listening media/);
});
test("Both separate writing outputs are mandatory, privately stored, and never machine-scored",()=>{
 assert.equal(definition.selfAssessmentMode,"writing");
 assert.equal(definition.requiredWritingLines,5);
 assert.equal(definition.maximumWritingLines,7);
 assert.equal(definition.requiredSecondWritingLines,6);
 assert.equal(definition.maximumSecondWritingLines,8);
 assert.equal(definition.speechCriteria.length,4);
 assert.ok(definition.secondWritingPromptFi);
 assert.equal(message.split("\n").length,7);
 assert.equal(dialogue.split("\n").length,8);
 const chosen=selectedTestExercises(definition,book.exercises,0);
 const a=gradeChapterTest(definition,chosen,complete(),"2026-11-11T18:45:00Z");
 assert.equal(a?.score,50);
 assert.equal(a?.maximum,50);
 assert.equal(a?.writtenResponse,message);
 assert.equal(a?.secondWrittenResponse,dialogue);
 assert.equal(a?.listeningSelfReported,true);
 assert.deepEqual(examScoreGroups(definition,a).map(g=>[g.id,g.score,g.maximum]),[
  ["listening",12,12],["reading",10,10],["vocabulary",10,10],
  ["grammar",10,10],["situations",8,8],
 ]);
 const missingAttestation={...complete(),listeningSelfReported:false};
 assert.equal(gradeChapterTest(definition,chosen,missingAttestation,"2026-11-11T18:45:00Z"),null);
 const missingSecond={...complete(),secondWrittenResponse:""};
 assert.equal(gradeChapterTest(definition,chosen,missingSecond,"2026-11-11T18:45:00Z"),null);
 const tooShortMessage={...complete(),writtenResponse:"Ich heiße Mia.\nHallo."};
 assert.equal(gradeChapterTest(definition,chosen,tooShortMessage,"2026-11-11T18:45:00Z"),null);
 const tooLongMessage={...complete(),writtenResponse:message+"\nNoch einmal!"};
 assert.equal(gradeChapterTest(definition,chosen,tooLongMessage,"2026-11-11T18:45:00Z"),null);
 const tooShortDialogue={...complete(),secondWrittenResponse:dialogue.split("\n").slice(0,5).join("\n")};
 assert.equal(gradeChapterTest(definition,chosen,tooShortDialogue,"2026-11-11T18:45:00Z"),null);
 const tooLongDialogue={...complete(),secondWrittenResponse:dialogue+"\nPaul: Tschüss!"};
 assert.equal(gradeChapterTest(definition,chosen,tooLongDialogue,"2026-11-11T18:45:00Z"),null);
 const missingAssessment={...complete(),selfAssessment:{}};
 assert.equal(gradeChapterTest(definition,chosen,missingAssessment,"2026-11-11T18:45:00Z"),null);
 const previous=restartChapterTest({...complete(),submission:a!});
 assert.equal(previous.previousResults.length,1);
 assert.equal(previous.previousResults[0]?.writtenResponse,message);
 assert.equal(previous.previousResults[0]?.secondWrittenResponse,dialogue);
 assert.equal(previous.previousResults[0]?.listeningSelfReported,true);
 assert.equal(previous.listeningSelfReported,false);
 assert.equal(previous.secondWrittenResponse,"");
 const b=gradeChapterTest(definition,selectedTestExercises(definition,book.exercises,1),
  complete(1),"2026-11-12T18:45:00Z");
 assert.equal(b?.score,50);
 assert.equal(b?.maximum,50);
 assert.equal(b?.secondWrittenResponse,dialogue);
});
test("In-app final UI displays and retains both answers and uses existing safe Reader media",()=>{
 const workspace=readFileSync("src/features/los/ChapterTestWorkspace.tsx","utf8");
 assert.match(workspace,/secondWritingPromptFi/);
 assert.match(workspace,/secondWrittenResponse/);
 assert.match(workspace,/listeningBlockIds/);
 assert.match(workspace,/<Reader book=\{book\} blocks=\{listeningBlocks\}/);
 assert.match(workspace,/SpeechRecorder/);
 assert.match(workspace,/onMediaStarted/);
 assert.match(workspace,/listeningSelfReported/);
 assert.match(workspace,/unplayed\.length > 0/);
 const reader=readFileSync("src/features/los/Reader.tsx","utf8");
 assert.match(reader,/onPlaying/);
 assert.match(reader,/onMediaStarted/);
 const model=readFileSync("src/features/los/model.ts","utf8");
 assert.match(model,/Invalid second exam writing contract/);
 const grader=readFileSync("src/features/los/chapterTest.ts","utf8");
 assert.match(grader,/secondWrittenResponse/);
 assert.match(grader,/listeningSelfReported/);
});
