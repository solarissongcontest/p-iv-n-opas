import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons,LOS_VERSION} from '../src/features/los/content.ts';
import {chapter09Lessons} from '../src/features/los/chapter09Lessons.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {c09Exam} from '../src/features/los/chapterExam.ts';
import {exams,validateLosExams} from '../src/features/los/examBank.ts';
import {translationFi,lookupGloss} from '../src/features/los/translations.ts';
import {gradeExercise} from '../src/features/los/engine.ts';
import {WEEK_DAYS,TIME_OPTIONS,getWeeklyPlan,completedWeek} from '../src/features/los/weekCalendarModel.ts';

const c=chapters.find(ch=>ch.id==='C09')!;
const practice=allChapterExercises('C09',c.exercises);
const ids=new Set(practice.map(x=>x.id).concat('EX-C09','C09-SCHEDULE'));
test('C09 source dialogue has all seven unchanged human-written dialogue turns and translations',()=>{
 assert.equal(c.status,'text-reviewed');
 assert.equal(c.blocks.length,7);
 assert.ok(c.sourceUrl.includes('Wikibooks')||c.sourceUrl.includes('wikibooks'));
 for(const b of c.blocks)assert.ok(translationFi[b.id]?.trim().length>=8,'Missing translation '+b.id);
 assert.equal(c.blocks[1]!.text,'Es ist Viertel vor drei.');
 assert.equal(c.blocks[2]!.text.includes('um drei Fußball'),true);
});
test('C09 human spoken weekday recording includes exactly sourced, transcribed 7 days',()=>{
 assert.equal(c.media?.sourceId,'M-COM-09-DAYS');
 assert.equal(c.media?.license,'CC BY-SA 3.0');
 assert.equal(c.media?.transcript?.length,1);
 assert.equal(c.media!.transcript![0]!.text,'Tage: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.');
 assert.equal(c.media?.durationSeconds,15);
 assert.match(c.media!.sourceUrl!,/German_Vocabulary_-_Days/);
 assert.ok(translationFi['c09-b-1']?.startsWith('Päivät:'));
 for(const d of WEEK_DAYS)assert.ok(lookupGloss(d.de)?.fi,d.de+' missing glossary');
});
test('L046–L050 are five fully authored flexible 30-minute lesson sequences',()=>{
 assert.deepEqual(chapter09Lessons.map(x=>x.id),['L046','L047','L048','L049','L050']);
 for(const lesson of chapter09Lessons){
  assert.equal(lesson.steps.length,5,lesson.id);
  assert.equal(lesson.steps.reduce((sum,s)=>sum+s.minutes,0),30,lesson.id);
  assert.equal(new Set(lesson.steps.map(s=>s.id)).size,5);
  assert.ok(lesson.steps.every(s=>s.instructionFi.length>=40),lesson.id);
  assert.ok(lesson.steps.some(s=>s.kind==='practice'),lesson.id);
  for(const id of lesson.requiredIds)assert.ok(ids.has(id),'Unknown task '+id);
  for(const s of lesson.steps)for(const id of s.exerciseIds??[])assert.ok(ids.has(id),id);
  assert.equal(lessons.find(x=>x.id===lesson.id)?.status,'initial-material');
 }
 assert.deepEqual(chapter09Lessons[3]!.requiredMediaIds,['M-COM-09-DAYS']);
 assert.deepEqual(chapter09Lessons[3]!.requiredIds,['C09-X19','C09-X20','C09-SCHEDULE']);
 assert.deepEqual(chapter09Lessons[4]!.requiredIds,['EX-C09']);
 assert.equal(lessons.find(x=>x.id==='L045')?.status,'pending');
 assert.equal(lessons.find(x=>x.id==='L051')?.status,'pending');
});
test('C09 time and audio questions are sourced exactly; transcription is never a made-up appointment recording',()=>{
 for(const id of ['C09-X19','C09-X20','C09-X21']){
  const ex=practice.find(e=>e.id===id)!;
  assert.equal(ex.mediaUrl,c.media?.url);
  assert.equal(gradeExercise(ex,ex.correct??ex.accepted?.[0]??'').status,'correct',id);
 }
 for(const id of ['C09-X14','C09-X15']){
  const e=practice.find(x=>x.id===id)!;
  const block=c.blocks.find(b=>b.id===e.blockId)!;
  const start=block.text.indexOf(e.target!);
  assert.ok(start>=0,id);
  assert.equal(gradeExercise({...e,sourceText:block.text},{blockId:block.id,start,end:start+e.target!.length,contentVersion:LOS_VERSION}).status,'correct');
 }
});
test('fictional seven-day calendar accepts only taught times, ignores malformed input and requires all 7 days',()=>{
 assert.equal(WEEK_DAYS.length,7);
 assert.deepEqual(TIME_OPTIONS,['um drei Uhr','um vier Uhr','um fünf Uhr']);
 assert.equal(completedWeek({}),false);
 assert.equal(completedWeek(null),false);
 const plan=Object.fromEntries(WEEK_DAYS.map((d,i)=>[d.de,TIME_OPTIONS[i%TIME_OPTIONS.length]]));
 assert.equal(completedWeek(plan),true);
 assert.equal(completedWeek({...plan,Freitag:''}),false);
 assert.equal(completedWeek({...plan,Mittwoch:'um neun Uhr'}),false);
 assert.equal(getWeeklyPlan({...plan,Mittwoch:'um neun Uhr'}).Mittwoch,'');
 assert.deepEqual(getWeeklyPlan('invalid'),{});
});
test('C09 independent 15-item chapter exam has no hints or reused chapter practice IDs',()=>{
 assert.equal(c09Exam.length,15);
 assert.equal(exams['EX-C09'].questions,c09Exam);
 assert.deepEqual(validateLosExams(),[]);
 for(const q of c09Exam){
  assert.equal(q.hint,'');
  assert.equal(ids.has(q.id),false);
  assert.equal(gradeExercise(q,q.correct??q.accepted?.[0]??'').status,'correct',q.id);
 }
});
