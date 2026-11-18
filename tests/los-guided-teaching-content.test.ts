import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {los1LessonTeaching,validateLos1LessonTeaching} from "../src/features/los/los1LessonTeaching.ts";
import {LOS_1_LESSONS} from "../src/features/los/learningPath.ts";
import {LOS1_EXECUTABLE_LESSONS} from "../src/features/los/guidedLessons.ts";

test("all sixty published lessons have substantial deterministic Finnish teacher guidance",()=>{
  assert.deepEqual(validateLos1LessonTeaching(),[]);
  assert.equal(LOS_1_LESSONS.length,60);
  assert.equal(LOS1_EXECUTABLE_LESSONS.length,60);
  for(let n=1;n<=60;n++){
    const id="L"+String(n).padStart(3,"0");
    const note=los1LessonTeaching(id);
    assert.ok(note,id+" is missing its teaching");
    assert.ok(note.explanation.length>=80,id);
    assert.ok(note.commonMistake.length>=30,id);
    assert.ok(note.apply.length>=30,id);
    assert.ok(note.german.length>2&&note.finnish.length>2,id);
  }
});
test("every five-lesson chapter sequence has genuinely distinct explanations",()=>{
  for(const first of [2,7,12,17,22,31,36,41,46,51]){
    const explanations=Array.from({length:5},(_,i)=>los1LessonTeaching("L"+String(first+i).padStart(3,"0"))?.explanation);
    assert.equal(new Set(explanations).size,5,"chapter starts L"+String(first).padStart(3,"0"));
  }
});
test("guided runner exposes the actual lesson note before external navigation steps",()=>{
  const view=readFileSync("src/features/los/LosFirstLessons.tsx","utf8");
  const i=view.indexOf('className="los-lesson-teaching"');
  const j=view.indexOf('className="los-lesson-steps"');
  assert.ok(i>0&&j>i,"teaching note must appear before the step list");
  assert.match(view,/lang="de">\{teaching\.german\}/);
  assert.match(view,/Yleinen väärinkäsitys/);
  assert.match(view,/Kokeile ensin itse/);
});
test("notes are authored static content, never a runtime AI or remote chat dependency",()=>{
  const text=readFileSync("src/features/los/los1LessonTeaching.ts","utf8");
  assert.doesNotMatch(text,/fetch\(|openai|anthropic|gemini|chatCompletion|prompt\(/i);
  assert.equal(los1LessonTeaching("L999"),null);
});
