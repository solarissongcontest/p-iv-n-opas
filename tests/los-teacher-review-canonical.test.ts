import test from "node:test";
import assert from "node:assert/strict";
import {getLosTeacherLesson,getOriginalLosTeacherLesson} from "../src/features/los/teacher/lessonRegistry.ts";
import {validateTeacherLesson} from "../src/features/los/teacher/validateContent.ts";
import {validateCanonicalTeacherLesson,LOS1_TEACHER_CANONICAL_VERSION} from "../src/features/los/teacher/canonicalTeacherLessons.ts";
import {losReadingQuestions} from "../src/features/los/content/los1ReadingBank.ts";
import {emptyTeacherSession,teacherSessionNeedsReview} from "../src/features/los/teacher/engine.ts";

test("Review I L027-L029 retain original authored source and expose updated current-text lessons",()=>{
 for(const id of ["L027","L028","L029"]){
  const historic=getOriginalLosTeacherLesson(id)!;
  const live=getLosTeacherLesson(id)!;
  assert.ok(historic,"historic "+id);
  assert.ok(live,"live "+id);
  assert.equal(historic.version,"2.0.0-preview.1");
  assert.equal(live.version,LOS1_TEACHER_CANONICAL_VERSION);
  assert.equal(live.chapterId,"91");
  assert.notStrictEqual(live,historic);
  assert.deepEqual(validateTeacherLesson(live),[],id+" teaching script must validate");
  assert.deepEqual(validateCanonicalTeacherLesson(live),[],id+" must not require retired source");
  const previous=emptyTeacherSession(historic,"2026-11-18T14:00:00.000Z");
  assert.equal(teacherSessionNeedsReview(previous,live),true);
 }
});
test("updated Review I book support includes all three current text types but no borrowed C01-C05 completion gate",()=>{
 const l027=getLosTeacherLesson("L027")!;
 const l028=getLosTeacherLesson("L028")!;
 const a=l027.scenes.find(s=>s.id==="source")!;
 const b=l028.scenes.find(s=>s.id==="book")!;
 assert.deepEqual(new Set(a.bookLinks?.map(x=>x.chapterId)),new Set(["01","02","03"]));
 assert.deepEqual(new Set(b.bookLinks?.map(x=>x.chapterId)),new Set(["04","05"]));
 for(const scene of [a,b]){
  for(const destination of ["text","text-b","text-c"])
   assert.ok(scene.bookLinks?.some(link=>link.section===destination));
  assert.equal(scene.kind,"book");
 }
 for(const lesson of [l027,l028]){
  assert.deepEqual(lesson.requiredCheckedIds??[],[]);
  assert.ok(lesson.requiredQuestionIds.length>=5);
 }
});
test("L029 verifies five current Text A/B/C reading-bank questions, never presents removed audio as proof",()=>{
 const lesson=getLosTeacherLesson("L029")!;
 assert.match(lesson.title,/keskustelujen kertaus/i);
 assert.doesNotMatch(lesson.objective,/kuuntelun/i);
 assert.equal(lesson.mediaGate,undefined);
 const expected=[
  {id:"speakers",ch:"01",kind:"A"},
  {id:"first",ch:"01",kind:"B"},
  {id:"question",ch:"01",kind:"C"},
  {id:"answer",ch:"02",kind:"A"},
  {id:"ending",ch:"03",kind:"C"}
 ] as const;
 for(const entry of expected){
  const scene=lesson.scenes.find(x=>x.id==="canonical-review-"+entry.id);
  assert.ok(scene?.question,entry.id);
  assert.equal(scene.kind,"question");
  const current=losReadingQuestions(entry.ch,entry.kind).find(x=>x.kind==="choice");
  assert.ok(current,"bank choice "+entry.ch+entry.kind);
  assert.equal(scene.question?.prompt,current.prompt);
  assert.ok(scene.bookLinks?.some(link=>link.chapterId===entry.ch&&
    link.section===({A:"text",B:"text-b",C:"text-c"} as const)[entry.kind]));
  assert.equal(scene.question?.evidenceRole,"practice");
 }
 assert.equal(lesson.requiredQuestionIds.length,5);
 assert.deepEqual(lesson.requiredCheckedIds??[],[]);
 assert.ok(lesson.scenes.some(x=>x.bookLinks?.some(link=>link.section==="text-c")));
});
