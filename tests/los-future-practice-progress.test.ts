import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {calculateLosFutureBookPractice,losFuturePracticeDraftKey,parseLosFuturePracticeEvidence} from "../src/features/los/losFuturePracticeProgress.ts";
import {readFileSync} from "node:fs";
import {losFutureLessonCursorKey,losFutureStageCursorKey} from "../src/features/los/losFutureSessionKeys.ts";

type Draft={version:1;practiceChecked:string[];practiceAnswers:Record<string,string>;testAnswers:Record<string,string>};
const emptyPracticeDraft=():Draft=>({version:1,practiceChecked:[],practiceAnswers:{},testAnswers:{}});

/** No browser storage or user data required to validate the aggregation. */
const owner="7fbb216d-607c-47d6-8a2d-a92b5bbca24d";
const book=LOS_BOOKS[1]!;
test("empty practice evidence reports no completed/graded lessons and a safe first step",()=>{
  const progress=calculateLosFutureBookPractice(book,owner,()=>null);
  assert.equal(progress.bookId,2);
  assert.equal(progress.chapters.length,10);
  assert.equal(progress.chapterLessons.length,50);
  assert.equal(progress.totalStages,300);
  assert.equal(progress.totalExercises,260);
  assert.equal(progress.attemptedStages,0);
  assert.equal(progress.lessonsTouched,0);
  assert.equal(progress.lessonsAllStagesTried,0);
  assert.equal(progress.answeredTasks,0);
  assert.equal(progress.comparedTasks,0);
  assert.deepEqual(progress.resume,{number:2,stageIndex:0});
  assert.ok(progress.chapters.every(c=>c.stagesTried===0&&c.answers===0));
});

test("six stage markers and task answers report only practice, and resume starts at first unchecked stage",()=>{
  const draft=emptyPracticeDraft();
  draft.practiceChecked=[
    "los.future.guided:LOS2-L002:start",
    "los.future.guided:LOS2-L002:model",
    "LOS2-C01-T01",
    "LOS2-C01-T01",
    "los.future.guided:LOS2-L002:start",
  ];
  draft.practiceAnswers={"LOS2-C01-T01":"   ein Satz   ","LOS2-C01-T02":" ", "LOS2-L002:own-reflection":"Noch üben."};
  const raw=JSON.stringify(draft);
  const read=(key:string)=>key===losFuturePracticeDraftKey(2,"01",owner)?raw:null;
  const progress=calculateLosFutureBookPractice(book,owner,read);
  assert.equal(progress.attemptedStages,2);
  assert.equal(progress.lessonsTouched,1);
  assert.equal(progress.lessonsAllStagesTried,0);
  assert.equal(progress.answeredTasks,1);
  assert.equal(progress.comparedTasks,1);
  assert.deepEqual(progress.resume,{number:2,stageIndex:2});
  assert.equal(progress.chapters[0]?.stagesTried,2);
  assert.equal(progress.chapters[0]?.answers,1);
  assert.equal(progress.chapters[0]?.compared,1);
  const lesson=progress.chapterLessons.find(l=>l.number===2)!;
  assert.equal(lesson.hasReflection,true);
  assert.equal(lesson.answeredTasks,1);
});

test("book and owner namespaces prevent reading another book's answers",()=>{
  const draft=emptyPracticeDraft();
  draft.practiceChecked=["los.future.guided:LOS3-L002:start"];
  draft.practiceAnswers={"LOS3-C01-T01":"bonjour"};
  const read=(key:string)=>key===losFuturePracticeDraftKey(3,"01",owner)?JSON.stringify(draft):null;
  assert.equal(calculateLosFutureBookPractice(book,owner,read).attemptedStages,0);
  assert.equal(calculateLosFutureBookPractice(LOS_BOOKS[2]!,owner,read).attemptedStages,1);
  assert.equal(calculateLosFutureBookPractice(LOS_BOOKS[2]!,"other-user",read).attemptedStages,0);
  assert.equal(calculateLosFutureBookPractice(LOS_BOOKS[2]!,null,read).attemptedStages,0);
});

test("corrupted or denied local storage cannot generate imaginary practice evidence",()=>{
  let throws=0;
  const result=calculateLosFutureBookPractice(book,owner,()=>{
    throws++;if(throws===1)throw Error("Storage blocked");return "not-json";
  });
  assert.equal(result.attemptedStages,0);
  assert.equal(result.answeredTasks,0);
  assert.equal(result.comparedTasks,0);
  assert.equal(result.resume?.number,2);
});

test("only all six attempted stages qualifies for six-stage self-marked status",()=>{
  const values=new Map<string,string>();
  for(const ch of book.chapters){
    const draft=emptyPracticeDraft();
    const firstNumber=ch.id==="01"?2:ch.id==="06"?31:0;
    if(firstNumber>0){
      for(const id of ["start","model","guide","attempt","tasks","check"]){
        draft.practiceChecked.push(`los.future.guided:LOS2-L${String(firstNumber).padStart(3,"0")}:${id}`);
      }
    }
    values.set(losFuturePracticeDraftKey(2,ch.id,owner),JSON.stringify(draft));
  }
  const result=calculateLosFutureBookPractice(book,owner,key=>values.get(key)??null);
  assert.equal(result.lessonsAllStagesTried,2);
  assert.equal(result.lessonsTouched,2);
  assert.equal(result.attemptedStages,12);
  assert.deepEqual(result.resume,{number:3,stageIndex:0});
});

test("standalone practice parser rejects malformed v1 data and honors existing draft key syntax",()=>{
  const state=readFileSync("src/features/los/studyState.ts","utf8");
  assert.ok(state.includes("los.local.v1.${ownerId}.${bookId}.${chapterId}"));
  assert.equal(losFuturePracticeDraftKey(2,"01",owner),`los.local.v1.${owner}.2.01`);
  assert.deepEqual(parseLosFuturePracticeEvidence(null),{practiceAnswers:{},practiceChecked:[]});
  assert.deepEqual(parseLosFuturePracticeEvidence('{"version":1,"practiceAnswers":{"a":"ok"},"testAnswers":{},"practiceChecked":["step",123]}'),{
    practiceAnswers:{a:"ok"},practiceChecked:["step"],
  });
  assert.deepEqual(parseLosFuturePracticeEvidence('{"version":1,"practiceAnswers":{},"testAnswers":{"x":3},"practiceChecked":["step"]}'),{
    practiceAnswers:{},practiceChecked:[],
  });
});

test("temporary reader cursors stay owner and book specific, and anonymous devices do not persist them",()=>{
  assert.equal(losFutureLessonCursorKey(owner,2),`los.future.reader.${owner}.book2.lesson`);
  assert.equal(losFutureLessonCursorKey(owner,3),`los.future.reader.${owner}.book3.lesson`);
  assert.notEqual(losFutureLessonCursorKey(owner,2),losFutureLessonCursorKey("other-user",2));
  assert.equal(losFutureLessonCursorKey(null,2),null);
  assert.equal(losFutureLessonCursorKey(owner,1),null);
  assert.equal(losFutureStageCursorKey(owner,"LOS2-L002"),`los.future.reader.${owner}.LOS2-L002.stage`);
  assert.notEqual(losFutureStageCursorKey(owner,"LOS2-L002"),losFutureStageCursorKey(owner,"LOS3-L002"));
  assert.equal(losFutureStageCursorKey(null,"LOS2-L002"),null);
  assert.equal(losFutureStageCursorKey(owner,"LOS1-L002"),null);
  assert.equal(losFutureStageCursorKey(owner,"invalid"),null);
  assert.match(readFileSync("src/features/los/LosFutureLearningPath.tsx","utf8"),/losFutureStageCursorKey/);
  assert.match(readFileSync("src/features/los/LosFutureLessonRunner.tsx","utf8"),/losFutureStageCursorKey/);
});
