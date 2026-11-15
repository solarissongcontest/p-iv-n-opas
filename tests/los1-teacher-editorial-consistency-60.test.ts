import test from "node:test";
import assert from "node:assert/strict";
import {getLosTeacherLesson} from "../src/features/los/teacher/lessonRegistry.ts";
import {validateTeacherLesson} from "../src/features/los/teacher/validateContent.ts";
import {getLosOpenDialogue} from "../src/features/los/content/los1OpenDialogues.ts";

test("all 60 LOS! 1 Teacher 2.0 manuscripts have consistent core Finnish usage",()=>{
  const ids=new Set<string>();
  for(let n=1;n<=60;n++){
    const id="L"+String(n).padStart(3,"0");
    const lesson=getLosTeacherLesson(id);
    assert.ok(lesson,id+" must be registered");
    assert.equal(lesson.id,id);
    assert.equal(lesson.bookId,1);
    assert.deepEqual(validateTeacherLesson(lesson),[],id);
    ids.add(lesson.id);
    const translated=[
      ...lesson.scenes.flatMap(scene=>scene.paragraphs),
      ...lesson.scenes.flatMap(scene=>(scene.board??[]).map(row=>row.meaning)),
      ...lesson.scenes.flatMap(scene=>(scene.help??[]).map(item=>item.body)),
      ...lesson.scenes.flatMap(scene=>scene.question?
        [scene.question.prompt,scene.question.reteach,scene.question.hint,
         scene.question.genericWrong,scene.question.success]:[]),
    ].join("\n");
    assert.doesNotMatch(translated,/Tavatkaa, olkaa hyvä\.?|Tavaisitteko/,
      id+" uses obsolete C07 spelling-request translation");
    assert.doesNotMatch(translated,/maanantaina kello kolme(?!lta)/i,
      id+" uses a time-of-event translation without -lta");
  }
  assert.equal(ids.size,60);
});

test("C07 L036-L037 and Review II use the same polite request without changing assessed German answers",()=>{
  const l036=getLosTeacherLesson("L036");
  const l037=getLosTeacherLesson("L037");
  const l056=getLosTeacherLesson("L056");
  const l057=getLosTeacherLesson("L057");
  assert.ok(l036&&l037&&l056&&l057);
  assert.match(l036.scenes.flatMap(x=>x.paragraphs).join(" "),/Voisitteko tavata nimen, kiitos\?/);
  const apply=l037.scenes.find(scene=>scene.id==="application")?.question;
  assert.ok(apply);
  assert.match(apply.prompt,/Voisitteko tavata nimen, kiitos\?/);
  assert.deepEqual(apply.accepted,["Bitte buchstabieren Sie","Bitte buchstabieren Sie."]);
  assert.match(l056.scenes.flatMap(scene=>scene.board??[]).map(row=>row.meaning).join(" "),/Voisitteko tavata nimen/);
  const time=l057.scenes.flatMap(scene=>scene.board??[]).find(row=>row.german==="am Montag um drei Uhr");
  assert.ok(time);
  assert.equal(time.meaning,"maanantaina kello kolmelta");
  const authentic=getLosOpenDialogue("07");
  assert.ok(authentic);
  assert.equal(authentic.sourceId,"M-WB-02");
  assert.equal(authentic.originalLines.length,5);
  assert.equal(authentic.originalLines[2]?.text,"Wie schreibt man das? Bitte buchstabieren Sie.");
});

test("C10 L053 teaches context of Freund/Freundin as recognition without adding new graded answers",()=>{
  const lesson=getLosTeacherLesson("L053");
  assert.ok(lesson);
  const scene=lesson.scenes.find(scene=>scene.id==="meaning");
  assert.ok(scene);
  const explanation=scene.paragraphs.join(" ");
  assert.match(explanation,/mein Freund/);
  assert.match(explanation,/meine Freundin/);
  assert.match(explanation,/poika-\/tyttöystävää/);
  assert.match(explanation,/ein Freund von mir/);
  assert.match(explanation,/eine Freundin von mir/);
  assert.match(explanation,/ei uusien sijamuotojen taivuttaminen/);
  assert.deepEqual(lesson.requiredPracticeIds,
    ["C10-EX-06","C10-EX-07","C10-EX-08","C10-EX-10"]);
  const source=getLosOpenDialogue("10");
  assert.ok(source);
  assert.equal(source.sourceId,"M-DIB-02");
  assert.equal(source.originalLines.length,14);
});
