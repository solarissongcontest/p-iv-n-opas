import assert from "node:assert/strict";
import test from "node:test";
import {readFileSync} from "node:fs";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {buildExamNavigationGroups} from "../src/features/los/examNavigation.ts";
import {selectedTestExercises} from "../src/features/los/chapterTest.ts";

const book=LOS_BOOKS[0];
if(!book)throw Error("LOS! 1 missing");
const definition=book.chapterTests.find(d=>d.id==="los1-final-exam");
if(!definition)throw Error("LOS! 1 final exam missing");
const expected=[
 ["listening",12],["reading",10],["vocabulary",10],
 ["grammar",10],["situations",8],
];
test("The 50-question exam is divided into five complete and nonoverlapping sections",()=>{
 const selected=selectedTestExercises(definition,book.exercises,0);
 const groups=buildExamNavigationGroups(definition,selected,{});
 assert.deepEqual(groups.map(group=>[group.id,group.total]),expected);
 assert.deepEqual(groups.map(g=>g.answered),[0,0,0,0,0]);
 assert.equal(groups.reduce((sum,g)=>sum+g.total,0),50);
 assert.equal(new Set(groups.flatMap(g=>g.slots)).size,50);
 assert.deepEqual(groups.flatMap(g=>g.slots),Array.from({length:50},(_,i)=>i));
});
test("Retakes keep the same correct sections without looking up original IDs in the alternative form",()=>{
 for(const attempt of [1,2,7,19,250]){
  const selected=selectedTestExercises(definition,book.exercises,attempt);
  const groups=buildExamNavigationGroups(definition,selected,{});
  assert.deepEqual(groups.map(g=>[g.id,g.total]),expected);
  assert.equal(new Set(groups.flatMap(g=>g.slots)).size,50);
  assert.deepEqual(groups.flatMap(g=>g.slots),Array.from({length:50},(_,i)=>i));
 }
});
test("Answer counts reflect valid answers including incorrect choices but never leak answer correctness",()=>{
 const selected=selectedTestExercises(definition,book.exercises,1);
 const first=selected[0];
 const thirteenth=selected[12];
 const final=selected[49];
 assert.ok(first&&first.type==="single-choice");
 assert.ok(thirteenth&&thirteenth.type==="single-choice");
 assert.ok(final&&final.type==="single-choice");
 const wrong=first.options.find(o=>o.id!==first.correctOptionId);
 assert.ok(wrong);
 const groups=buildExamNavigationGroups(definition,selected,{
  [first.id]:wrong.id,
  [thirteenth.id]:thirteenth.correctOptionId,
  [final.id]:final.correctOptionId,
 });
 assert.deepEqual(groups.map(g=>g.answered),[1,1,0,0,1]);
 assert.deepEqual(Object.keys(groups[0]!).sort(),["answered","id","slots","titleFi","total"]);
 assert.ok(!JSON.stringify(groups).includes("correctOptionId"));
});
test("Malformed score-group coverage cannot hide any questions from a learner",()=>{
 const selected=selectedTestExercises(definition,book.exercises,0);
 assert.deepEqual(buildExamNavigationGroups({...definition,scoreGroups:[]},selected,{}),[]);
 const duplicate={...definition,scoreGroups:[
  ...(definition.scoreGroups??[]),
  {id:"duplicate",titleFi:"Duplikaatti",exerciseIds:[definition.exerciseIds[0]!]},
 ]};
 assert.deepEqual(buildExamNavigationGroups(duplicate,selected,{}),[]);
 const incomplete={...definition,scoreGroups:definition.scoreGroups?.slice(1)};
 assert.deepEqual(buildExamNavigationGroups(incomplete,selected,{}),[]);
 const missing={...definition,scoreGroups:[
  {id:"broken",titleFi:"Tuntematon tehtävä",exerciseIds:["unknown"]},
 ]};
 assert.deepEqual(buildExamNavigationGroups(missing,selected,{}),[]);
 assert.deepEqual(buildExamNavigationGroups(definition,selected.slice(1),{}),[]);
});
test("Exam UI keeps the answer form reachable, navigable on mobile, and never forces grading by section",()=>{
 const workspace=readFileSync("src/features/los/ChapterTestWorkspace.tsx","utf8");
 const css=readFileSync("src/styles/los.css","utf8");
 assert.match(workspace,/buildExamNavigationGroups/);
 assert.match(workspace,/Siirry kokeen osa-alueeseen/);
 assert.match(workspace,/aria-current=\{activeGroupIndex === index \? "step" : undefined\}/);
 assert.match(workspace,/displayedQuestions\.map/);
 assert.match(workspace,/isFinalGroup && <section className="los-exam-speech"/);
 assert.match(workspace,/isFinalGroup && <button type="submit"/);
 assert.match(workspace,/Seuraava osa-alue/);
 assert.match(workspace,/Edellinen osa-alue/);
 assert.match(css,/\.los-exam-section-tabs/);
 assert.match(css,/@media \(max-width: 639px\)/);
});
