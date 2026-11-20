import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveEnglishBookRef, englishReaderHashForRef, relatedEnglishLessonIds,
} from "../src/features/english-master/englishChapterLinks.ts";
import {asTeacherLesson} from "../src/features/english-master/englishTeacherAdapter.ts";
import type {Lesson} from "../src/features/english-master/EnglishMasterBook.ts";

test("A00/A08 are real onboarding destinations, not fictitious printed chapters",()=>{
  assert.equal(resolveEnglishBookRef("A00"),"A00");
  assert.equal(resolveEnglishBookRef("A08"),"A08");
  assert.equal(resolveEnglishBookRef("A01"),null);
  assert.equal(englishReaderHashForRef("A00"),"#/home");
  assert.equal(englishReaderHashForRef("A08"),"#/path");
  assert.equal(englishReaderHashForRef("W12"),"#/book/W12");
});

test("printed references match the full chapter identifier, not similar prefixes",()=>{
  assert.equal(resolveEnglishBookRef("G01.2"),"G01");
  assert.equal(resolveEnglishBookRef("r04:reading"),"R04");
  assert.equal(resolveEnglishBookRef("G010"),"G010");
  assert.equal(resolveEnglishBookRef("G01BAD"),null);
  assert.equal(resolveEnglishBookRef("https://external.example/A00"),null);
});

test("draft chapter reader recovers only existing and precise reverse-linked lessons",()=>{
  const lessons=[
    {content_id:"a",book_refs:["G01.2"]},
    {content_id:"b",book_refs:["G010"]},
    {content_id:"c",book_refs:["G01"]},
    {content_id:"d",book_refs:["A08"]},
  ];
  assert.deepEqual(relatedEnglishLessonIds("G01",["c","unknown"],lessons),["c","a"]);
  assert.deepEqual(relatedEnglishLessonIds("G010",[],lessons),["b"]);
  assert.deepEqual(relatedEnglishLessonIds("G02",[],lessons),[]);
});

test("actual Teacher 2.0 adapter adds an A00/A08 guide stage without false skill evidence",()=>{
  const source:Lesson={
    content_id:"EM-LP-TEST",title:"Orientation",status:"draft",book_refs:["A00","A08"],
    payload:{hook_fi:"Tutustu kirjaan.",objectives_fi:["Löydä oppikirja ja opetuspolku."],tasks:[]},
  };
  const lesson=asTeacherLesson(source);
  const links=lesson.scenes.flatMap(s=>s.bookLinks??[]);
  assert.deepEqual(links.map(link=>link.chapterId),["A00","A08"]);
  assert.equal(lesson.requiredPracticeIds.length,0);
  assert.equal(lesson.requiredQuestionIds.length,0);
});
