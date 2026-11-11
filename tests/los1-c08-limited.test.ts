import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons} from '../src/features/los/content.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {chapter08PartialLessons} from '../src/features/los/chapter08PartialLessons.ts';
import {guidedLessons} from '../src/features/los/guidedLessons.ts';
import {gradeExercise} from '../src/features/los/engine.ts';

const chapter=chapters.find(c=>c.id==='C08')!;
const tasks=allChapterExercises('C08',chapter.exercises);
const taskIds=new Set(tasks.map(x=>x.id));
test('C08 explicitly remains blocked: no fabricated full Im Unterricht interview or video',()=>{
 assert.equal(chapter.status,'source-pending');
 assert.equal(chapter.sourceId,'M-DIB-04');
 assert.deepEqual(chapter.blocks,[]);
 assert.equal(chapter.media,undefined);
 assert.ok(chapter.attribution.includes('ei ole valittu'));
 assert.ok(chapter.sourceUrl.includes('toc.php?k=2'));
});
test('C08 L041 and L043 are fully written source-limited 30-minute phrase lessons',()=>{
 assert.deepEqual(chapter08PartialLessons.map(p=>p.id),['L041','L043']);
 for(const plan of chapter08PartialLessons){
  assert.equal(plan.steps.length,5);
  assert.equal(plan.steps.reduce((n,s)=>n+s.minutes,0),30);
  assert.equal(new Set(plan.steps.map(s=>s.id)).size,5);
  assert.ok(plan.steps.every(s=>s.instructionFi.length>70),plan.id);
  assert.ok(plan.steps.some(s=>s.kind==='practice'));
  assert.equal(plan.steps.some(s=>s.kind==='listen'||s.kind==='read'),false,
   'Do not pretend the missing source has an authentic listening/reading stage');
  assert.equal(plan.requiredMediaIds,undefined);
  for(const id of plan.requiredIds)assert.ok(taskIds.has(id),'Missing '+id);
  for(const step of plan.steps)for(const id of step.exerciseIds??[])assert.ok(taskIds.has(id),'Missing '+id);
  assert.equal(lessons.find(l=>l.id===plan.id)?.status,'initial-material');
  assert.equal(guidedLessons.filter(l=>l.id===plan.id).length,1);
 }
});
test('C08 phrase practice is graded only on taught A1 expressions with self-assessed writing',()=>{
 for(const plan of chapter08PartialLessons)for(const id of plan.requiredIds){
  const ex=tasks.find(x=>x.id===id)!;
  assert.ok(ex.prompt.trim().length>=15);
  assert.ok(ex.explanation.trim().length>=10);
  const status=gradeExercise(ex,ex.correct??ex.accepted?.[0]??ex.order?.join(' | ')??'').status;
  assert.equal(status,ex.type==='writing'?'self-review':'correct',id);
 }
});
test('C08 authentic-source-dependent lessons and chapter exam remain missing',()=>{
 for(const id of ['L042','L044','L045']){
  assert.equal(lessons.find(l=>l.id===id)?.status,'pending');
  assert.equal(guidedLessons.some(l=>l.id===id),false);
 }
});
