import assert from 'node:assert/strict';
import test from 'node:test';
import {midtermLesson} from '../src/features/los/midtermLesson.ts';
import {guidedLessons} from '../src/features/los/guidedLessons.ts';
import {exams,selfAssessment,validateLosExams} from '../src/features/los/examBank.ts';
import {chapters,lessons} from '../src/features/los/content.ts';
import {gradeExercise} from '../src/features/los/engine.ts';

test('L030 uses a real five-step 30min guided midterm, not a placeholder or a falsely completed course',()=>{
 assert.equal(midtermLesson.length,1);
 const l=midtermLesson[0]!;
 assert.equal(l.id,'L030');
 assert.deepEqual(l.requiredIds,['EX-MID']);
 assert.equal(l.steps.length,5);
 assert.equal(l.steps.reduce((sum,s)=>sum+s.minutes,0),30);
 assert.equal(new Set(l.steps.map(s=>s.id)).size,5);
 assert.ok(l.steps.some(s=>s.kind==='practice'&&s.exerciseIds?.includes('EX-MID')));
 assert.ok(l.steps.some(s=>s.kind==='reflection'));
 assert.equal(lessons.find(x=>x.id==='L030')?.status,'initial-material');
 assert.equal(guidedLessons.filter(x=>x.id==='L030').length,1);
});
test('the midterm has 25 independent C01–C05 questions with validated keys and no hints',()=>{
 const mid=exams['EX-MID'];
 assert.equal(mid.questions.length,25);
 assert.deepEqual(validateLosExams(),[]);
 assert.equal(chapters.slice(0,5).every(c=>c.status==='text-reviewed'),true);
 assert.ok(mid.questions.every(q=>!q.hint&&q.id&&q.explanation));
 for(const q of mid.questions){
  const ans=q.correct??q.accepted?.[0]??q.order?.join(' | ')??'';
  assert.equal(gradeExercise(q,ans).status,'correct',q.id);
 }
 assert.equal(selfAssessment['EX-MID'].prompt.length>20,true);
 assert.ok(selfAssessment['EX-MID'].model.includes('Ich heiße'));
});
test('midterm never approves or unlocks unavailable C06 and C08 source texts',()=>{
 assert.equal(chapters.find(c=>c.id==='C06')?.status,'source-pending');
 assert.equal(chapters.find(c=>c.id==='C08')?.status,'source-pending');
 assert.equal(lessons.find(l=>l.id==='L031')?.status,'pending');
 assert.equal(lessons.find(l=>l.id==='L041')?.status,'pending');
});
