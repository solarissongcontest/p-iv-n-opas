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

test("all 19 actual G01–G04 Alpha 0.8 sections have two original, real and explanatory self-check questions",()=>{
  assert.equal(createHash("sha256").update(zip).digest("hex"),manifest.sha256);
  const sectionIds=["G01","G02","G03","G04"].flatMap(id=>pack.chapters[id]?.payload.sections.map(x=>x.section_id)??[]);
  assert.equal(sectionIds.length,19);
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
