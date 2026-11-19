import test from "node:test";
import assert from "node:assert/strict";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonRegistry.ts";
import {losTeacherChapterTeaching} from "../src/features/los/teacher/chapterTeaching.ts";
import {validateCanonicalTeacherLesson,LOS1_TEACHER_CANONICAL_VERSION} from "../src/features/los/teacher/canonicalTeacherLessons.ts";
import {LOS1_REVISED_AB} from "../src/features/los/content/los1RevisedAB.ts";
import {LOS1_REVISED_C} from "../src/features/los/content/los1RevisedC.ts";
import {losReadingQuestions} from "../src/features/los/content/los1ReadingBank.ts";
import {losExercisesFor} from "../src/features/los/exerciseBank.ts";
import {emptyTeacherSession,teacherSessionNeedsReview,teacherCanFinish,teacherContentSignature} from "../src/features/los/teacher/engine.ts";

const pad=(n:number)=>String(n).padStart(3,"0");
const readingIds=["L003","L008","L013","L018","L023","L032","L037","L042","L047","L052"];
const old=/Franz|Jörg|Greta|Harald|Wikibooks|C\\d{2}-SOURCE-Q\\d{2}|M-COM-0[1-9]|autenttis|alkuperäis/i;

test("all 60 original Teacher 2.0 lessons remain available with canonical content version",()=>{
 for(let n=1;n<=60;n++){
  const lesson=getLosTeacherLesson("L"+pad(n));
  assert.ok(lesson,"L"+pad(n)+" must exist");
  assert.equal(lesson.id,"L"+pad(n));
  if(readingIds.includes(lesson.id))
   assert.equal(lesson.version,LOS1_TEACHER_CANONICAL_VERSION);
  else
   assert.ok(lesson.version===LOS1_TEACHER_CANONICAL_VERSION||lesson.version.startsWith("2.0.0"),
     lesson.id+" should preserve unmodified historical version");
  assert.ok(lesson.scenes.length>2,lesson.id+" must have authored instructional scenes");
  assert.deepEqual(validateCanonicalTeacherLesson(lesson),[],lesson.id+" has retired or broken references");
 }
});
test("revised A/B and new C are used in each chapter's Teacher reading lesson",()=>{
 const actual=LOS1_REVISED_AB.chapters.map(x=>x.chapterId);
 assert.equal(actual.length,10);
 assert.equal(LOS1_REVISED_C.chapters.length,10);
 for(let i=0;i<10;i++){
  const lesson=getLosTeacherLesson(readingIds[i]!)!;
  const chapter=String(i+1).padStart(2,"0");
  assert.equal(lesson.chapterId,chapter);
  for(const kind of ["a","b","c"] as const){
   const scene=lesson.scenes.find(x=>x.id==="canonical-text-"+kind);
   const question=lesson.scenes.find(x=>x.id==="canonical-check-"+kind);
   const expected=kind==="a"?"text":kind==="b"?"text-b":"text-c";
   assert.ok(scene,lesson.id+" missing "+kind);
   assert.ok(scene.bookLinks?.some(link=>link.section===expected&&link.chapterId===chapter));
   assert.ok(question?.question,lesson.id+" missing current "+kind+" check");
   assert.ok(lesson.requiredQuestionIds.includes("canonical-check-"+kind));
   assert.ok(lesson.requiredActivityIds.includes("canonical-read-"+kind));
   const kindUpper=kind.toUpperCase() as "A"|"B"|"C";
   assert.ok(lesson.requiredCheckedIds?.some(id=>losReadingQuestions(chapter,kindUpper).some(q=>q.id===id)));
  }
  assert.ok(lesson.scenes.some(x=>x.paragraphs.some(text=>text.includes("Text C"))));
 }
});
test("no obsolete book question ID is a requirement and new exercises stay in current bank",()=>{
 for(let n=1;n<=60;n++){
  const lesson=getLosTeacherLesson("L"+pad(n))!;
  if(!/^0[1-9]$|^10$/.test(lesson.chapterId))continue;
  const activeExercises=new Set(losExercisesFor(lesson.chapterId).map(ex=>ex.id));
  for(const id of lesson.requiredPracticeIds)assert.ok(activeExercises.has(id),lesson.id+" "+id);
  for(const id of lesson.requiredCheckedIds??[])assert.match(id,/^LOS1-READ-V2-C/);
  for(const scene of lesson.scenes){
   // Canonical reading-bank distractors may legitimately include a different
   // person's name; they are not passages from a retired source.
   const knownCurrentPrompt=scene.question&&(["A","B","C"] as const).some(kind=>
     losReadingQuestions(lesson.chapterId,kind).some(q=>q.kind==="choice"&&q.prompt===scene.question?.prompt));
   const prose=JSON.stringify({title:scene.title,paragraphs:scene.paragraphs,
     question:knownCurrentPrompt?undefined:scene.question,
     board:scene.board,links:scene.bookLinks});
   assert.doesNotMatch(prose,old,lesson.id+" scene "+scene.id+" still teaches retired material");
  }
 }
});
test("retired Harald listening media cannot block or certify the new Text A/B/C reading work",()=>{
 const l52=getLosTeacherLesson("L052")!;
 assert.equal(l52.mediaGate,undefined,"retired unapproved media must not gate current reading");
 assert.ok(l52.scenes.some(scene=>scene.id==="canonical-text-c"));
 assert.ok(!l52.title.toLowerCase().includes("harald"),"retired interview is not current book text");
 assert.ok(l52.objective.includes("Text C"));
});

test("earlier completed lessons do not become current-version mastery or completion",()=>{
 const lesson=getLosTeacherLesson("L003")!;
 const original=emptyTeacherSession(lesson,"2026-11-19T12:00:00.000Z");
 const oldSave={...original,contentVersion:"2.0.0-preview.1",contentSignature:"12345678",
   completedAt:"2026-11-18T12:00:00.000Z"};
 assert.ok(teacherContentSignature(lesson));
 assert.equal(teacherSessionNeedsReview(oldSave,lesson),true);
 assert.equal(teacherCanFinish(oldSave,lesson,{}),false);
});

test("all 10 rewritten topics teach concrete German instead of exposing edition-change notes",()=>{
 for(let n=1;n<=10;n++){
  const chapter=String(n).padStart(2,"0");
  const teaching=losTeacherChapterTeaching(chapter);
  assert.ok(teaching.goal.length>30,"C"+chapter+" learning goal");
  assert.ok(teaching.rule.length>50,"C"+chapter+" explanation");
  assert.ok(teaching.contrast.length>45,"C"+chapter+" likely misconception");
  assert.ok(teaching.apply.length>40,"C"+chapter+" learner application");
  const lessons=["L003","L008","L013","L018","L023","L032","L037","L042","L047","L052"];
  const lesson=getLosTeacherLesson(lessons[n-1]!)!;
  const intro=lesson.scenes.find(scene=>scene.id==="canonical-intro");
  assert.ok(intro?.paragraphs.some(paragraph=>paragraph===teaching.rule),"C"+chapter+" teaches topic");
  for(const scene of lesson.scenes.filter(x=>x.id.startsWith("canonical-")))
    assert.ok(!scene.paragraphs.some(p=>/vanhan painoksen|aiemman LOS-version|tämä opetustilanne on päivitetty/i.test(p)),
      lesson.id+" "+scene.id+" should teach the language instead of the product change history");
 }
});
