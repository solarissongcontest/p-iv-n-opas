import assert from 'node:assert/strict';
import test from 'node:test';
import {auditLosRelease,losReleaseEvidence,type LosReleaseEvidence} from '../src/features/los/releaseAudit.ts';
import {guidedLessons} from '../src/features/los/guidedLessons.ts';

test('LOS! release audit counts material actually implemented, not just placeholder lesson names',()=>{
 const audit=auditLosRelease();
 assert.equal(audit.lessonsTotal,60);
 assert.equal(audit.lessonsAuthored,44);
 assert.equal(guidedLessons.length,44);
 assert.equal(new Set(guidedLessons.map(l=>l.id)).size,44);
 assert.equal(audit.textsImported,8);
 assert.deepEqual(audit.blockingChapterIds,['C06','C08']);
 assert.equal(audit.chapterExams,8);
 assert.equal(audit.unauthoredLessonIds.length,16);
 assert.ok(audit.unauthoredLessonIds.includes('L030'));
 assert.ok(audit.unauthoredLessonIds.includes('L031'));
 assert.ok(audit.unauthoredLessonIds.includes('L041'));
 assert.ok(audit.unauthoredLessonIds.includes('L059'));
 assert.ok(audit.unauthoredLessonIds.includes('L060'));
 assert.ok(audit.uniqueCoreWords>0);
});
test('G1–G8 do not pass without explicit reviewed rights and actual field evidence',()=>{
 const audit=auditLosRelease();
 assert.equal(audit.ready,false);
 assert.deepEqual(audit.gates.map(g=>g.id),['G1','G2','G3','G4','G5','G6','G7','G8']);
 assert.ok(audit.gates.every(g=>!g.passed));
 assert.ok(audit.gates.every(g=>g.detail.length>60));
 assert.equal(audit.additionalBlocks.length,2);
 assert.equal(losReleaseEvidence.productionMigrationVerified,false);
 assert.equal(losReleaseEvidence.originalApprovedAssetsVerified,false);
});
test('even forged all-positive manual evidence cannot pass while chapters/lessons remain missing',()=>{
 const fake=Object.fromEntries(Object.keys(losReleaseEvidence).map(k=>[k,true])) as LosReleaseEvidence;
 const audit=auditLosRelease(fake);
 assert.equal(audit.ready,false);
 for(const id of ['G1','G2','G3','G5','G6'])assert.equal(audit.gates.find(g=>g.id===id)?.passed,false,id);
});
test('release evidence never silently flips to true on new builds or imports',()=>{
 for(const [field,value] of Object.entries(losReleaseEvidence))assert.equal(value,false,field+' must remain unverified without outside proof');
});
