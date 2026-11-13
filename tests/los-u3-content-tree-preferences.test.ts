import {strict as assert} from "node:assert";
import {test} from "node:test";
import {
  emptyLosContentTreePreferences,losContentTreePrefsKey,
  parseLosContentTreePreferences,
} from "../src/features/los/contentTreePreferences.ts";

const chapters=["01","02","03"] as const;

test("U3: navigation preferences are separate from los.local.v1 student data",()=>{
  assert.equal(losContentTreePrefsKey("device-a",1),"los.navigation.u1.device-a.1");
  assert.notEqual(losContentTreePrefsKey("device-a",1),losContentTreePrefsKey("device-b",1));
  assert.notEqual(losContentTreePrefsKey("device-a",1),losContentTreePrefsKey("device-a",2));
  assert.deepEqual(parseLosContentTreePreferences(null,chapters),emptyLosContentTreePreferences());
});

test("U3: explicit false chapter state survives reload parsing",()=>{
  const original={version:1,expandedChapters:{"01":false,"02":true},
    expandedTaskGroups:{"01-practice":true,"01-test":false}};
  assert.deepEqual(parseLosContentTreePreferences(JSON.stringify(original),chapters),original);
});

test("U3: stale/nonexistent exercises, other chapters and foreign keys are not restored",()=>{
  const preferences={version:1,
    expandedChapters:{"01":true,"99":true,prototype:true,"02":"oops"},
    expandedTaskGroups:{"01-practice":true,"99-test":true,"02-unknown":true}};
  const parsed=parseLosContentTreePreferences(JSON.stringify(preferences),chapters);
  assert.deepEqual(parsed.expandedChapters,{"01":true});
  assert.deepEqual(parsed.expandedTaskGroups,{"01-practice":true});
});

test("U3: malformed, giant or future preference data cannot clear existing draft answers",()=>{
  const oldDraft='{"version":1,"practiceAnswers":{"C01-EX-01":"Guten Morgen!"}}';
  for(const corrupt of ["{broken","[]","{}",JSON.stringify({version:2}),
    "a".repeat(12001)]) {
    assert.deepEqual(parseLosContentTreePreferences(corrupt,chapters),
      emptyLosContentTreePreferences());
  }
  assert.match(oldDraft,/C01-EX-01/);
});
