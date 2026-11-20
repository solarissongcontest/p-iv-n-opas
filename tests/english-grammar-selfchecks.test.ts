import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {gunzipSync} from "node:zlib";
import {join} from "node:path";
import {
  GRAMMAR_SELF_CHECKS,GRAMMAR_SELF_CHECK_VERSION,
  gradeGrammarSelfCheck,grammarSelfCheckStorageKey,
} from "../src/features/english-master/englishGrammarSelfChecks.ts";

const root=join(process.cwd(),"public","english-master");
const manifest=JSON.parse(readFileSync(join(root,"content.manifest.json"),"utf8")) as {
  sha256:string;parts:Array<{file:string}>;
};
const zip=Buffer.concat(manifest.parts.map(p=>readFileSync(join(root,p.file))));
const pack=JSON.parse(gunzipSync(zip).toString("utf8")) as {
  chapters:Record<string,{title:string;payload:{sections:Array<{section_id:string;title:string;theory_fi:string;self_check?:unknown}>}}>;
};

test("all 47 actual G01–G10 Alpha 0.8 subsections have two original, real and explanatory self-check questions",()=>{
  assert.equal(createHash("sha256").update(zip).digest("hex"),manifest.sha256);
  const chapterIds=Array.from({length:10},(_,index)=>"G"+String(index+1).padStart(2,"0"));
  const sectionIds=chapterIds.flatMap(id=>pack.chapters[id]?.payload.sections.map(x=>x.section_id)??[]);
  assert.equal(sectionIds.length,47,"Only the real 19+28 subsections may have supplemental practice");
  assert.equal(Object.keys(GRAMMAR_SELF_CHECKS).length,47);
  assert.equal(sectionIds.length*2,94);
  assert.deepEqual(Object.keys(GRAMMAR_SELF_CHECKS).sort(),[...sectionIds].sort(),
    "No chapter subsection may be silently skipped, invented or orphaned");
  for(const id of sectionIds){
    const source=pack.chapters[id.slice(0,3)].payload.sections.find(x=>x.section_id===id)!;
    const tasks=GRAMMAR_SELF_CHECKS[id];
    assert.equal(source.self_check??null,null,"The supplemental checks do not pretend to be original Alpha 0.8 content");
    assert.equal(tasks.length,2);
    const prompts=new Set<string>();
    for(const [prompt,options,correct,explanation] of tasks){
      assert.ok(prompt.trim().length>=40,id+" has a too short question");
      assert.ok(explanation.trim().length>=70,id+" has a too short pedagogical justification");
      assert.equal(options.length,3);
      assert.equal(new Set(options).size,3,id+" has duplicate answers");
      assert.ok(correct>=0&&correct<3,id+" correct option missing");
      assert.ok(options.every(x=>x.trim().length>=2),id+" option missing");
      assert.ok(!prompts.has(prompt),id+" duplicate prompt");
      prompts.add(prompt);
    }
    assert.equal(gradeGrammarSelfCheck(tasks,[null,null]).correct,0);
    assert.equal(gradeGrammarSelfCheck(tasks,[null,null]).answered,0);
    assert.equal(gradeGrammarSelfCheck(tasks,tasks.map(x=>x[2])).correct,2);
    assert.equal(gradeGrammarSelfCheck(tasks,[2,2]).total,2);
  }
});

test("G05–G10 grammar checks respect genuinely distinct interpretation and formal usage",()=>{
  const checks=[
    ["G05.1",0,"a university"],
    ["G05.2",0,"The notebook was expensive."],
    ["G06.1",0,"Would you like some tea?"],
    ["G06.3",1,"Neither option is suitable."],
    ["G07.4",0,"The colleagues encouraged each other."],
    ["G08.4",0,"At least one person did not support the proposal."],
    ["G09.3",0,"The building whose roof was damaged was repaired."],
    ["G09.4",1,"Helsinki, which is the capital of Finland, lies on the coast."],
    ["G10.3",0,"The researchers, three of whom had worked abroad, spoke."],
    ["G10.4",1,"The colleague I spoke to replied."],
    ["G10.5",0,"What she discovered surprised us."],
    ["G10.6",1,"The scientists revised the method."],
  ] as const;
  for(const [section,index,expected] of checks){
    const item=GRAMMAR_SELF_CHECKS[section][index];
    assert.equal(item[1][item[2]],expected,section+" requires the correct contextual answer");
    assert.equal(gradeGrammarSelfCheck([item],[item[2]]).correct,1);
  }
});

test("answer checks reject incomplete and unrelated selections without inventing Teacher mastery",()=>{
  const tasks=GRAMMAR_SELF_CHECKS["G01.1"];
  assert.deepEqual(gradeGrammarSelfCheck(tasks,[null,0]),{total:2,answered:1,correct:1});
  assert.deepEqual(gradeGrammarSelfCheck(tasks,[99,-1]),{total:2,answered:0,correct:0});
});

test("practice keys are owner-scoped, versioned and separate from Teacher 2.0 sessions",()=>{
  const a=grammarSelfCheckStorageKey("student-a","G01.1");
  const b=grammarSelfCheckStorageKey("student-b","G01.1");
  const c=grammarSelfCheckStorageKey("student-a","G02.1");
  assert.notEqual(a,b);
  assert.notEqual(a,c);
  assert.ok(a.includes(GRAMMAR_SELF_CHECK_VERSION));
  assert.ok(a.startsWith("em-grammar-selfcheck:"));
  assert.ok(!a.includes("los-teacher"));
});
