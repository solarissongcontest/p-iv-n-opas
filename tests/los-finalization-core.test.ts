import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_EXECUTABLE_LESSONS} from "../src/features/los/guidedLessons.ts";
import {los1CanonicalLines,los1CanonicalText,validateLos1Canonical,LOS1_CANONICAL_VERSION} from "../src/features/los/los1Canonical.ts";
import {validateLos1CanonicalLessons} from "../src/features/los/los1CanonicalLessons.ts";
import {losChapterExamExercises,LOS1_CHAPTER_TESTS_V2,validateLosChapterExams,losChapterExamScore} from "../src/features/los/los1ChapterExams.ts";
import {losExercisesFor} from "../src/features/los/exerciseBank.ts";
import {los1CourseGlossary,los1TokenMeaning,los1TokenIPA} from "../src/features/los/los1CourseGlossary.ts";

test("Canonical A/B/C chapters and stable reader identifiers are complete",()=>{
  assert.deepEqual(validateLos1Canonical(),[]);
  assert.match(LOS1_CANONICAL_VERSION,/^\d{4}-\d{2}-\d{2}/);
  for(let n=1;n<=10;n++){
    const id=String(n).padStart(2,"0");
    assert.ok(los1CanonicalText(id,"A"));
    assert.ok(los1CanonicalText(id,"B"));
    assert.ok(los1CanonicalText(id,"C"));
    for(const kind of ["A","B"] as const){
      const lines=los1CanonicalLines(id,kind);
      assert.ok(lines.length>=3);
      assert.ok(lines.every(x=>/^b\d{3}$/.test(x.id)));
      assert.ok(lines.every(x=>x.text.length>0));
    }
  }
});
test("Exactly sixty lessons refer to new canonical texts and source evidence",()=>{
  assert.deepEqual(validateLos1CanonicalLessons(LOS1_EXECUTABLE_LESSONS),[]);
  const reading=new Set([3,8,13,18,23,32,37,42,47,52]);
  for(const l of LOS1_EXECUTABLE_LESSONS){
    if(!reading.has(Number(l.id.slice(1))))continue;
    assert.equal(l.steps[0]?.section,"text",l.id);
    assert.equal(l.steps[1]?.section,"understand",l.id);
    assert.equal(l.steps[2]?.section,"text-c",l.id);
    assert.ok(l.evidence.some(x=>x.kind==="checked-source"&&(x.ids??[]).some(id=>id.startsWith("LOS1-READ-V2-"))),l.id);
  }
});
test("120 wholly separate exam problems are valid and old drafts keep original bank",()=>{
  assert.deepEqual(validateLosChapterExams(),[]);
  assert.equal(LOS1_CHAPTER_TESTS_V2.length,120);
  for(let n=1;n<=10;n++){
    const id=String(n).padStart(2,"0");
    const exam=losChapterExamExercises(id);
    const old=losExercisesFor(id);
    assert.equal(exam.length,12);
    assert.ok(exam.every(q=>!old.some(x=>x.id===q.id)));
    assert.ok(old.length>=12);
    const perfect=Object.fromEntries(exam.map(x=>[x.id,x.correct]));
    assert.deepEqual(losChapterExamScore(id,perfect),{correct:12,total:12});
    const oldStarted=Object.fromEntries([[old[0]!.id,old[0]!.correct]]);
    assert.deepEqual(losChapterExamExercises(id,oldStarted).map(x=>x.id),old.map(x=>x.id));
    assert.deepEqual(losChapterExamScore(id,{}),{correct:0,total:12});
  }
});
test("Reader glossary uses course material and exposes missing IPA explicitly",()=>{
  assert.match(los1TokenMeaning("01","Hallo!")??"",/hei/i);
  assert.match(los1TokenMeaning("02","heiße")??"",/nimeltäni|nimi/i);
  assert.match(los1TokenMeaning("09","Donnerstag")??"",/torstai/i);
  assert.ok(los1CourseGlossary("05")["nicht"]);
  assert.equal(los1TokenIPA("Hallo"),"/haˈloː/");
  assert.equal(los1TokenIPA("Unbekannt"),null);
});
test("Original annotations and prior learner storage are preserved in the new reader",()=>{
  const original=readFileSync("src/features/los/LosOriginalDialogue.tsx","utf8");
  const revised=readFileSync("src/features/los/LosRevisedTextPages.tsx","utf8");
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  const workbook=readFileSync("src/features/los/LosWorkbook.tsx","utf8");
  assert.match(original,/losReaderMarkKey/);
  assert.match(original,/readerMarks/);
  assert.match(original,/isOwnText/);
  assert.match(revised,/LosOriginalDialogue/);
  assert.match(revised,/los1CanonicalLines/);
  assert.match(book,/LosLegacySourcePanel/);
  assert.match(workbook,/losChapterExamExercises/);
});
test("Book search indexes current A/B/C texts, not only older extras",()=>{
  const search=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(search,/LOS1_REVISED_AB/);
  assert.match(search,/LOS1_REVISED_C/);
  assert.match(search,/LOS!-teksti/);
});
