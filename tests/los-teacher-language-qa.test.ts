import {test} from "node:test";
import {strict as assert} from "node:assert";
import {TEACHER_L004} from "../src/features/los/teacher/content/l004.ts";
import {L004_MODEL_BOARD,L004_RULE_BOARD} from "../src/features/los/teacher/content/l004Boards.ts";
import {validTeacherLesson} from "../src/features/los/teacher/core.ts";
import {validateTeacherBoard} from "../src/features/los/teacher/boards/boardModel.ts";

const byId=(id:string)=>{
 const scene=TEACHER_L004.scenes.find(scene=>scene.id===id);
 assert.ok(scene,"Missing pedagogical scene "+id);
 return scene;
};
test("L004 greeting assessments keep the distinct source-backed situation/answer mapping",()=>{
 const reference=[
  ["activation","Tschüss!"],
  ["guided","Guten Morgen!"],
  ["independent","Guten Abend!"],
  ["application","Auf Wiedersehen!"],
  ["exit","Gute Nacht!"]
 ] as const;
 for(const [id,expression] of reference){
  const question=byId(id).question;
  assert.ok(question,"Scripted question missing at "+id);
  const correct=question.choices.filter(c=>c.id===question.correctId);
  assert.equal(correct.length,1,id);
  assert.equal(correct[0]?.label,expression,id);
  assert.ok(correct[0]?.feedback.includes(expression),id);
  assert.ok(question.success.includes(expression),id);
 }
});
test("independent evening prompt does not imply Guten Abend is the only greeting",()=>{
 const scene=byId("independent");
 assert.match(scene.question?.prompt??"",/vaihtoehdoista/i);
 assert.match(scene.question?.alternative??"",/Hallo!/);
 assert.match(scene.question?.choices.find(c=>c.id===scene.question?.correctId)?.feedback??"",/Hallo!/);
 assert.ok(scene.help?.some(h=>h.paragraphs.some(p=>p.includes("Hallo!"))));
 assert.ok(byId("introduction").explanation.some(p=>p.includes("Hallo!")));
 assert.ok(byId("summary").explanation.some(p=>p.includes("Hallo!")));
});
test("bedtime and evening distinction has an aligned Finnish/German contrast board",()=>{
 const partText=(board:typeof L004_RULE_BOARD)=>board.steps.flatMap(s=>s.parts.map(p=>p.text));
 const contrast=partText(L004_RULE_BOARD);
 assert.ok(contrast.includes("Guten Abend!"));
 assert.ok(contrast.includes("Gute Nacht!"));
 assert.ok(contrast.includes("Hyvää iltaa!"));
 assert.ok(contrast.includes("Hyvää yötä!"));
 assert.match(L004_RULE_BOARD.steps.at(-1)?.explanation??"",/tilan|tervehditäänkö/i);
 assert.equal(L004_RULE_BOARD.review,"draft");
});
test("morning model aligns with the narrated teacher example",()=>{
 const german=byId("model").example?.german;
 const finnish=byId("model").example?.finnish;
 assert.equal(german,"Guten Morgen, Frau Müller!");
 assert.equal(finnish,"Hyvää huomenta, rouva Müller!");
 assert.ok(L004_MODEL_BOARD.steps.some(s=>s.parts.some(p=>p.text===german)));
 assert.ok(L004_MODEL_BOARD.steps.some(s=>s.parts.some(p=>p.text===finnish)));
});
test("all nine scenes and eighteen help texts retain draft status and valid authored structure",()=>{
 assert.equal(TEACHER_L004.review,"draft");
 assert.equal(TEACHER_L004.scenes.length,9);
 assert.equal(TEACHER_L004.scenes.reduce((n,s)=>n+(s.help?.length??0),0),18);
 assert.deepEqual(validTeacherLesson(TEACHER_L004),[]);
 assert.deepEqual(validateTeacherBoard(L004_RULE_BOARD),[]);
 assert.deepEqual(validateTeacherBoard(L004_MODEL_BOARD),[]);
 for(const scene of TEACHER_L004.scenes){
  assert.ok(scene.help?.every(h=>h.paragraphs.every(p=>p.length>=25)),scene.id);
  assert.ok(scene.explanation.every(p=>!p.includes("Guten Morgen!, en")),scene.id);
 }
});
