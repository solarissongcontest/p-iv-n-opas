import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons} from '../src/features/los/content.ts';
import {guidedLessons} from '../src/features/los/guidedLessons.ts';
import {reviewOneItems} from '../src/features/los/reviewOneItems.ts';
import {reviewTwoItems,reviewTwoInitialIds,reviewTwoApplicationIds} from '../src/features/los/reviewTwoItems.ts';
import {reviewTwoLessons} from '../src/features/los/reviewTwoLessons.ts';
import {FINAL_SKILLS,normalizedRatings,eligibleSummary} from '../src/features/los/summaryModel.ts';
import {gradeExercise} from '../src/features/los/engine.ts';

test('second-cycle original attempts are separate from chapter and first review IDs',()=>{
 const allOldIds=new Set(chapters.flatMap(c=>c.exercises.map(e=>e.id)).concat(reviewOneItems.map(i=>i.exercise.id)));
 const seen=new Set<string>();
 for(const row of reviewTwoItems){
  const ex=row.exercise;
  assert.match(ex.id,/^REV2-\d\d$/);
  assert.equal(allOldIds.has(ex.id),false,ex.id+' cannot reuse old attempt');
  assert.equal(seen.has(ex.id),false,ex.id);
  seen.add(ex.id);
  assert.equal(chapters.some(c=>c.id===row.chapterId),true);
  assert.ok(ex.prompt.length>25);
  assert.ok(ex.explanation.length>20);
  if(ex.type==='writing'||ex.type==='speech'){
   assert.equal(gradeExercise(ex,'Itse laadittu teksti').status,'self-review');
  }else{
   assert.equal(gradeExercise(ex,ex.correct??ex.accepted?.[0]??'').status,'correct',ex.id);
  }
 }
 assert.equal(reviewTwoItems.length,14);
});
test('L056 and L058 each have 30 minutes, distinct five-stage scripts and six new attempted tasks',()=>{
 const plans=reviewTwoLessons.filter(l=>l.id!=='L060');
 assert.deepEqual(plans.map(p=>p.id),['L056','L058']);
 assert.deepEqual(reviewTwoInitialIds,[...plans[0]!.requiredIds]);
 assert.deepEqual(reviewTwoApplicationIds,[...plans[1]!.requiredIds]);
 const ids=new Set(reviewTwoItems.map(x=>x.exercise.id));
 for(const plan of plans){
  assert.equal(plan.steps.length,5);
  assert.equal(plan.steps.reduce((total,step)=>total+step.minutes,0),30);
  assert.equal(new Set(plan.steps.map(s=>s.id)).size,5);
  assert.ok(plan.steps.every(s=>s.instructionFi.length>90));
  assert.ok(plan.steps.some(s=>s.kind==='reflection'));
  for(const e of plan.requiredIds)assert.ok(ids.has(e),e);
  for(const step of plan.steps)for(const e of step.exerciseIds??[])assert.ok(ids.has(e));
  assert.equal(lessons.find(l=>l.id===plan.id)?.status,'initial-material');
  assert.equal(guidedLessons.filter(l=>l.id===plan.id).length,1);
 }
});
test('L060 personal summary requires ten self-ratings and a concrete next goal',()=>{
 assert.equal(FINAL_SKILLS.length,10);
 assert.equal(new Set(FINAL_SKILLS.map(s=>s.id)).size,10);
 assert.deepEqual(FINAL_SKILLS.map(s=>s.id),chapters.map(c=>c.id));
 assert.deepEqual(normalizedRatings('not an object'),{});
 assert.deepEqual(normalizedRatings(['osaan']),{});
 assert.equal(eligibleSummary({},'Aion oppia lisää saksaa.'),false);
 const ratings=Object.fromEntries(FINAL_SKILLS.map(s=>[s.id,'harjoittelen']));
 assert.equal(eligibleSummary(ratings,'liian lyhyt'),false);
 assert.equal(eligibleSummary(ratings,'Seuraavaksi harjoittelen itsenäisesti saksan kellonaikoja.'),true);
 assert.equal(eligibleSummary({...ratings,C09:'invalid'},'Seuraavaksi harjoittelen itsenäisesti saksan kellonaikoja.'),false);
 const plan=reviewTwoLessons.find(l=>l.id==='L060')!;
 assert.deepEqual(plan.requiredIds,['SUMMARY-CHECK','SUMMARY-GOAL']);
 assert.equal(plan.steps.length,5);
 assert.equal(plan.steps.reduce((sum,s)=>sum+s.minutes,0),30);
 assert.equal(lessons.find(l=>l.id==='L060')?.status,'initial-material');
 assert.equal(guidedLessons.filter(l=>l.id==='L060').length,1);
});
test('honesty: full ten-chapter review L057 and final exam lesson L059 remain blocked',()=>{
 assert.equal(lessons.find(l=>l.id==='L057')?.status,'pending');
 assert.equal(lessons.find(l=>l.id==='L059')?.status,'pending');
 assert.equal(guidedLessons.some(l=>l.id==='L057'),false);
 assert.equal(guidedLessons.some(l=>l.id==='L059'),false);
 assert.equal(chapters.find(c=>c.id==='C06')?.status,'text-reviewed');
 assert.equal(chapters.find(c=>c.id==='C08')?.status,'source-pending');
});
