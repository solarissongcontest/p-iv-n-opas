import assert from 'node:assert/strict';
import test from 'node:test';
import {guidedLessons} from '../src/features/los/guidedLessons.ts';
import {firstLessons} from '../src/features/los/firstLessons.ts';
import {lessonAudioProof,lessonRequiresReflection,validateGuidedLessons} from '../src/features/los/lessonProofs.ts';

test('all sixty guided lessons have complete five-step, thirty-minute structures and audio requirements',()=>{
 assert.equal(guidedLessons.length,60);
 assert.deepEqual(validateGuidedLessons(guidedLessons),[]);
});
test('the first four listening sessions have their own source-specific playback receipts',()=>{
 assert.deepEqual(firstLessons.filter(p=>p.requiredMediaIds?.length).map(p=>p.id),['L001','L002','L003','L005']);
 for(const lessonId of ['L001','L002','L003']){
  assert.deepEqual(guidedLessons.find(p=>p.id===lessonId)?.requiredMediaIds,[lessonAudioProof(lessonId,'M-COM-01')]);
 }
 assert.deepEqual(guidedLessons.find(p=>p.id==='L005')?.requiredMediaIds,[lessonAudioProof('L005','M-COM-03')]);
 assert.notEqual(lessonAudioProof('L001','M-COM-01'),lessonAudioProof('L003','M-COM-01'));
 assert.notEqual(lessonAudioProof('L005','M-COM-03'),lessonAudioProof('L003','M-COM-01'));
});
test('reflections are derived from the actual authored stages, never a list of lesson IDs',()=>{
 const needs=guidedLessons.filter(lessonRequiresReflection);
 assert.ok(needs.length>=20,'too few guided reflection stages');
 const without=guidedLessons.filter(x=>!lessonRequiresReflection(x));
 assert.ok(without.length>0);
 for(const plan of guidedLessons)assert.equal(lessonRequiresReflection(plan),plan.steps.some(step=>step.kind==='reflection'),plan.id);
 assert.equal(lessonRequiresReflection(guidedLessons.find(l=>l.id==='L060')!),true);
 assert.equal(lessonRequiresReflection(guidedLessons.find(l=>l.id==='L042')!),false);
});
test('catalog validation refuses missing sessions, malformed steps and unsourced listens',()=>{
 const plan=guidedLessons.find(l=>l.id==='L001')!;
 assert.ok(validateGuidedLessons(guidedLessons.filter(x=>x.id!=='L001')).includes('Oppitunti puuttuu: L001'));
 assert.ok(validateGuidedLessons([...guidedLessons,plan]).includes('Duplikaatti oppitunti: L001'));
 const bad={...plan,requiredMediaIds:[]};
 assert.ok(validateGuidedLessons(guidedLessons.map(x=>x.id==='L001'?bad:x)).includes('Kuuntelutunti ilman todellista mediaehtoa: L001'));
});
