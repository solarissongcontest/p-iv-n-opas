import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS1_SYNTHETIC_IPA} from "../src/features/los/los1GeneratedIPA.ts";
import {los1TokenIPADetail} from "../src/features/los/los1CourseGlossary.ts";
import {los1SupplementalSourceAudit,LOS1_CORE_SOURCE_POLICY} from "../src/features/los/los1SupplementalAudit.ts";
test("every 173 LOS! 1 vocabulary item has transparently attributed IPA or a machine candidate",()=>{
 const words=LOS_BOOKS[0]?.chapters.flatMap(ch=>ch.vocabulary.map(entry=>entry.split(" – ")[0]??""))??[];
 assert.equal(words.length,173);
 assert.ok(Object.keys(LOS1_SYNTHETIC_IPA).length>=230);
 const missing=words.filter(word=>!los1TokenIPADetail(word));
 assert.deepEqual(missing,[]);
 assert.equal(los1TokenIPADetail("Hallo!")?.source,"editorial");
 assert.equal(los1TokenIPADetail("Guten Morgen!")?.source,"espeak-candidate");
 assert.equal(los1TokenIPADetail("nicht vorhandenes Wort"),null);
});
test("all source stages are reported honestly without inventing publication gates",()=>{
 const report=los1SupplementalSourceAudit();
 assert.equal(report.total,31);
 assert.equal(report.published,report.pending.filter(x=>x.ready).length);
 assert.equal(report.pending.filter(x=>!x.ready).length,report.total-report.published);
 assert.ok(report.pending.every(x=>x.ready||x.issues.length>0));
 assert.equal(LOS1_CORE_SOURCE_POLICY,"canonical-teaching-texts-first-supplemental-authentic-sources-optional");
});
