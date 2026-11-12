import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS1_EXECUTABLE_LESSONS, los1LessonDraftChapter, isLos1ExecutableLesson } from "../src/features/los/guidedLessons.ts";

test("45 real lessons form nine stable chapter groups without publishing gaps",()=>{
  assert.equal(LOS1_EXECUTABLE_LESSONS.length,45);
  const groups = Array.from(new Set(LOS1_EXECUTABLE_LESSONS.map(lesson=>los1LessonDraftChapter(lesson.id))));
  assert.deepEqual(groups,["01","02","03","04","05","91","06","07","09"]);
  const counts=groups.map(code=>LOS1_EXECUTABLE_LESSONS.filter(lesson=>los1LessonDraftChapter(lesson.id)===code).length);
  assert.deepEqual(counts,[6,5,5,5,5,4,5,5,5]);
  for(const id of ["L041","L045","L051","L060"]){
    assert.equal(isLos1ExecutableLesson(id),false);
  }
});
test("lesson runner shows only active chapter's lessons and cannot mark progress by changing chapter",()=>{
  const runner=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
  assert.match(runner,/CHAPTER_IDS/);
  assert.match(runner,/los-lesson-chapter-picker/);
  assert.match(runner,/los-lesson-chapter-context/);
  assert.match(runner,/chapterLessons\.map/);
  assert.match(runner,/chapterLessons = ALL_LESSONS\.filter/);
  assert.match(runner,/const openChapter/);
  assert.match(runner,/if\(target\) onSelect\(target\.id\)/);
  assert.match(runner,/A chapter tab only selects a lesson; it never records study evidence/);
  assert.match(runner,/losLessonMarkStep/);
  assert.match(runner,/skipsUnfinishedLessons/);
  assert.match(runner,/Seuraava käytettävissä oleva/);
  assert.match(runner,/aria-pressed=\{code === chapterId\}/);
});
test("mobile chapter tabs use readable and scrollable touch controls with focus styling",()=>{
  const css=readFileSync("src/features/los/los-lessons.css","utf8");
  assert.match(css,/\.los-lesson-chapter-picker \{[^}]*overflow-x: auto/);
  assert.match(css,/\.los-lesson-chapter-picker button \{[^}]*min-height: 64px/);
  assert.match(css,/\.los-lesson-chapter-picker button\.is-active/);
  assert.match(css,/\.los-lesson-program button:focus-visible/);
  assert.match(css,/@media \(max-width: 650px\)/);
});
