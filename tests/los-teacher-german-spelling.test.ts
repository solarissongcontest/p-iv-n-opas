import test from "node:test";
import assert from "node:assert/strict";
import { LOS1_L001_TEACHER } from "../src/features/los/teacher/lessonL001.ts";
import { LOS1_L004_TEACHER } from "../src/features/los/teacher/lessonL004.ts";

test("beginner teacher accurately distinguishes Tschüss (ss) from ß", () => {
  const beginnerHelp=LOS1_L001_TEACHER.scenes.flatMap(s => s.help ?? []).find(h => h.title.includes("Tschüss"));
  assert.ok(beginnerHelp);
  assert.match(beginnerHelp.body, /kahdella s-kirjaimella/);
  assert.match(beginnerHelp.body, /ß on eri kirjain/);
  const exit=LOS1_L004_TEACHER.scenes.find(s => s.id==="exit")?.question;
  assert.ok(exit);
  assert.match(exit.hint,/kahteen s-kirjaimeen/);
  assert.ok(!exit.hint.includes("ß-kirjain"));
  assert.equal(exit.options?.find(o => o.id===exit.correctOption)?.label,"Tschüss!");
});

test("L004 models when greeting changes and explicitly teaches every tested farewell", () => {
  const scenes=LOS1_L004_TEACHER.scenes;
  const situation=scenes.find(s=>s.id==="situations");
  assert.ok(situation);
  assert.match(situation.paragraphs.join(" "),/Auf Wiedersehen!/);
  const board=scenes.find(s=>s.id==="board")?.board??[];
  assert.ok(board.length>=7);
  for(const phrase of ["Hallo!","Guten Morgen!","Guten Tag!","Guten Abend!","Gute Nacht!","Tschüss!","Auf Wiedersehen!"]){
    assert.ok(board.some(s=>s.german===phrase),phrase+" missing from guided model");
  }
});
