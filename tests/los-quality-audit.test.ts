import {test} from "node:test";
import assert from "node:assert/strict";
import {los1AudioInventory,los1IPAAudit} from "../src/features/los/los1QualityAudit.ts";

test("LOS! 1 documents all thirty German speech scripts without inventing recorded assets",()=>{
 const audit=los1AudioInventory();
 assert.equal(audit.total,30);
 assert.equal(audit.withSpeech,30);
 assert.equal(audit.recorded,0);
 assert.equal(new Set(audit.items.map(x=>x.id)).size,30);
 assert.ok(audit.items.every(x=>x.segmentCount>0&&x.recordedAssetStatus==="missing"));
 assert.deepEqual(audit.items.filter(x=>x.chapterId==="01").map(x=>x.kind),["A","B","C"]);
 assert.deepEqual(audit.items.filter(x=>x.chapterId==="10").map(x=>x.kind),["A","B","C"]);
});

test("IPA coverage is classified, and unreviewed machine proposals never count as editorial",()=>{
 const audit=los1IPAAudit();
 assert.equal(audit.total,173);
 assert.equal(audit.editorial+audit.synthetic+audit.missing,audit.total);
 assert.ok(audit.editorial>0);
 assert.ok(audit.synthetic>0);
 assert.equal(audit.missing,0);
 assert.ok(audit.rows.every(r=>r.word.length>0&&r.ipa&&r.ipa.startsWith("/")&&r.ipa.endsWith("/")));
 assert.equal(audit.rows.find(r=>r.word.toLocaleLowerCase("de")==="hallo")?.status,"editorial");
});
