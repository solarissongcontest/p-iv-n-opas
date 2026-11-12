import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS1_CHAPTER_PHOTOS} from "../src/features/los/los1ChapterPhotos.ts";
import {
  LOS1_VISUAL_LESSONS,getLos1VisualPhrases,validateLos1VisualLessons,
} from "../src/features/los/los1VisualLearning.ts";

test("C01–C10 picture-based learning prompts use exactly the approved active vocabulary",()=>{
  assert.deepEqual(validateLos1VisualLessons(),[]);
  const book=LOS_BOOKS.find(b=>b.id===1);
  assert.ok(book);
  assert.equal(book.chapters.length,10);
  assert.equal(Object.keys(LOS1_VISUAL_LESSONS).length,10);
  const placements=Object.values(LOS1_VISUAL_LESSONS).reduce(
    (counts,lesson)=>({...counts,[lesson.placement]:counts[lesson.placement]+1}),
    {culture:0,vocabulary:0},
  );
  assert.deepEqual(placements,{culture:4,vocabulary:6});
  for(const chapter of book.chapters){
    const lesson=LOS1_VISUAL_LESSONS[chapter.id];
    assert.ok(lesson,"Missing image-led learning activity for "+chapter.id);
    const photo=LOS1_CHAPTER_PHOTOS[chapter.id];
    assert.ok(photo,"Missing existing licensed-source photo for "+chapter.id);
    assert.ok(photo.src.startsWith("/los/chapters/"));
    assert.ok(photo.mobileSrc.startsWith("/los/chapters/"));
    const actual=getLos1VisualPhrases(chapter.id);
    assert.equal(actual.length,3,chapter.id+" has exactly 3 phrases");
    for(const phrase of actual){
      assert.ok(phrase.fi.trim(),chapter.id+" has a Finnish meaning for "+phrase.de);
      assert.ok(chapter.vocabulary.some(v=>v===phrase.de+" – "+phrase.fi),
        chapter.id+" doesn't use fabricated German or translations");
    }
    assert.ok(lesson.note.length>30);
  }
});
test("picture prompts explicitly avoid guessing people's ages, names, wellbeing or nationality",()=>{
  const all=Object.values(LOS1_VISUAL_LESSONS);
  assert.match(LOS1_VISUAL_LESSONS["02"]!.note,/nimi ei ole tiedossa/);
  assert.match(LOS1_VISUAL_LESSONS["03"]!.note,/ei esitä koko DACH/);
  assert.match(LOS1_VISUAL_LESSONS["05"]!.note,/ei voi päätellä/);
  assert.match(LOS1_VISUAL_LESSONS["06"]!.note,/ikiä ei päätellä/);
  assert.match(LOS1_VISUAL_LESSONS["10"]!.note,/eivät ole kirjan lähdetekstin henkilöitä/);
  assert.equal(new Set(all.map(x=>x.chapterId)).size,10);
});
test("actual vocabulary and culture routes contain visual learning with no grading",()=>{
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  const culture=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
  const ui=readFileSync("src/features/los/Los1VisualLearning.tsx","utf8");
  assert.match(book,/placement="vocabulary"/);
  assert.match(culture,/placement="culture"/);
  assert.match(ui,/aria-expanded=\{showExamples\}/);
  assert.match(ui,/getLos1VisualPhrases/);
  assert.match(ui,/variant="learning"/);
  assert.match(ui,/Ei pisteytystä/);
  assert.doesNotMatch(ui,/useLosChapterDraft|saveScore|markComplete|localStorage|setExerciseAnswer/);
});
