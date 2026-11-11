import assert from 'node:assert/strict';
import test from 'node:test';
import {reviewOneLessons} from '../src/features/los/reviewOneLessons.ts';
import {reviewOneItems} from '../src/features/los/reviewOneItems.ts';
import {chapters,lessons} from '../src/features/los/content.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {gradeExercise} from '../src/features/los/engine.ts';

test('L027–L029 have their own 30-minute five-step review plans and reflections',()=>{
 assert.deepEqual(reviewOneLessons.map(l=>l.id),['L027','L028','L029']);
 for(const l of reviewOneLessons){
  assert.equal(l.steps.length,5,l.id);
  assert.equal(l.steps.reduce((sum,step)=>sum+step.minutes,0),30,l.id);
  assert.equal(new Set(l.steps.map(s=>s.id)).size,5);
  assert.ok(l.steps.some(s=>s.kind==='recall'));
  assert.ok(l.steps.some(s=>s.kind==='reflection'));
  assert.ok(l.steps.some(s=>s.kind==='practice'));
  assert.ok(l.steps.every(s=>s.instructionFi.length>=40));
  assert.equal(lessons.find(x=>x.id===l.id)?.status,'initial-material');
 }
 assert.equal(lessons.find(l=>l.id==='L030')?.status,'pending');
 assert.deepEqual(reviewOneLessons[2]?.requiredMediaIds,['review:L029:M-COM-02']);
});
test('new mixed-review IDs cannot be auto-satisfied by earlier chapter answers',()=>{
 const ids=new Set<string>();
 const old=new Set(chapters.flatMap(c=>allChapterExercises(c.id,c.exercises).map(e=>e.id)));
 for(const {chapterId,exercise} of reviewOneItems){
  assert.ok(chapters.some(c=>c.id===chapterId),'unknown chapter');
  assert.ok(!ids.has(exercise.id),'duplicate review exercise');
  assert.ok(!old.has(exercise.id),'review task reuses original ID');
  ids.add(exercise.id);
  assert.ok(exercise.prompt&&exercise.explanation&&exercise.hint);
  const ans=exercise.correct??exercise.accepted?.[0]??'';
  assert.equal(gradeExercise(exercise,ans).status,'correct',exercise.id);
 }
 assert.equal(reviewOneItems.length,12);
 for(const l of reviewOneLessons){
  assert.equal(l.requiredIds.length,4);
  for(const id of l.requiredIds)assert.ok(ids.has(id),'unavailable review task: '+id);
  for(const st of l.steps)for(const id of st.exerciseIds??[])assert.ok(ids.has(id));
 }
});
test('L029 replays an actual existing four-line human-recorded original, not an invented voice',()=>{
 const c=chapters[1]!;
 assert.equal(c.media?.sourceId,'M-COM-02');
 assert.equal(c.media?.transcript?.length,4);
 const questions=reviewOneItems.filter(item=>item.exercise.id>='REV1-09');
 assert.equal(questions.length,4);
 assert.ok(questions.every(q=>q.exercise.mediaUrl?.includes('Deutsch_Dialog_._Ich_bin_Peter.ogg')));
 assert.ok(c.media!.transcript!.some(b=>b.text.includes('Ich bin Thomas.')));
 assert.ok(c.media!.transcript!.some(b=>b.text.includes('Ich komme aus Kyoto.')));
});
