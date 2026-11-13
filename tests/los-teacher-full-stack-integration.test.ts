import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getLosTeacherLesson } from "../src/features/los/teacher/lessonL004.ts";
import { validateTeacherLesson } from "../src/features/los/teacher/validateContent.ts";

/**
 * Stack-only CI guard: run after every L001–L060 feature branch has been
 * merged into the disposable integration worktree, never on an isolated draft.
 * Passing unit tests in separate feature branches does not prove registry
 * reachability once their lesson/player edits have been reconciled.
 */
const ranges: Array<[number,number,string]> = [
  [1,6,"01"], [7,11,"02"], [12,16,"03"], [17,21,"04"],
  [22,26,"05"], [27,30,"91"], [31,35,"06"], [36,40,"07"],
  [41,45,"08"], [46,50,"09"], [51,55,"10"],
  [56,58,"92"], [59,60,"93"],
];

test("full LOS! 1 Teacher 2.0 stack registers precisely L001–L060 with original chapter boundaries",()=>{
  const entries=ranges.flatMap(([start,end,chapter])=>
    Array.from({length:end-start+1},(_,i)=>({
      id:"L"+String(start+i).padStart(3,"0"), chapter,
    })));
  assert.equal(entries.length,60);
  assert.equal(new Set(entries.map(x=>x.id)).size,60);

  const missing:string[]=[];
  for(const {id,chapter} of entries){
    const lesson=getLosTeacherLesson(id);
    if(!lesson){missing.push(id);continue;}
    assert.equal(lesson.id,id,id+" must resolve to its own manuscript");
    assert.equal(lesson.bookId,1,id+" must stay in LOS! 1");
    assert.equal(lesson.chapterId,chapter,id+" has the wrong original chapter");
    assert.ok(lesson.scenes.length>0,id+" must contain an actual instructional sequence");
    assert.equal(new Set(lesson.scenes.map(scene=>scene.id)).size,lesson.scenes.length,
      id+" must not have duplicate scene identifiers");
    assert.deepEqual(validateTeacherLesson(lesson),[],id+" manuscript validation");
  }
  assert.deepEqual(missing,[],"Every lesson must be accessible in the canonical Teacher registry");
  assert.equal(getLosTeacherLesson("L000"),undefined);
  assert.equal(getLosTeacherLesson("L061"),undefined);
});

test("StudyOS and LOS! library expose direct links without inflating approved learning claims",()=>{
  const shell=readFileSync("src/app/AppShell.tsx","utf8");
  const library=readFileSync("src/features/los/LosBook.tsx","utf8");
  const path=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.equal((shell.match(/href="\\/los"/g)??[]).length,2,"Desktop and mobile have real LOS links");
  for(const destination of ["contents","path","dictionary","search","cards"]){
    assert.ok(library.includes('href="/los#/1/'+destination+'"'),destination+" must have a visible library shortcut");
  }
  assert.ok(library.includes("getLosTeacherLesson(lesson.id)"));
  assert.ok(path.includes("getLosTeacherLesson(lesson.id)"));
  assert.ok(library.includes("lopullinen hyväksyntä on kesken"));
});
