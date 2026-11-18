import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {los1LessonTeachingNote,validateLos1TeachingNotes} from "../src/features/los/los1TeachingNotes.ts";
import {LOS_1_LESSONS} from "../src/features/los/learningPath.ts";

test("All 50 chapter lessons contain actual Finnish teaching and German usage",()=>{
 assert.deepEqual(validateLos1TeachingNotes(),[]);
 const chapterLessons=LOS_1_LESSONS.filter(x=>x.section.startsWith("Kappale"));
 assert.equal(chapterLessons.length,50);
 const notes=chapterLessons.map(lesson=>los1LessonTeachingNote("L"+String(lesson.number).padStart(3,"0")));
 assert.equal(notes.filter(Boolean).length,50);
 for(const note of notes){
  assert.ok(note);
  assert.ok(note.explanation.length>65);
  assert.ok(note.example.length>3);
  assert.ok(note.translation.length>3);
  assert.ok(note.pitfall.length>20);
  assert.ok(note.recall.length>5);
  assert.ok(note.model.length>0);
 }
});

test("Guided lesson reader displays teaching without altering saved completion requirements",()=>{
 const runner=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
 assert.match(runner,/los1LessonTeachingNote/);
 assert.match(runner,/los-lesson-teaching-note/);
 assert.match(runner,/teachingNote\.example/);
 assert.match(runner,/teachingNote\.translation/);
 assert.match(runner,/teachingNote\.pitfall/);
 assert.match(runner,/teachingNote\.model/);
 assert.match(runner,/losLessonFinish/);
});
