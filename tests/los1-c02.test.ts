import assert from 'node:assert/strict';
import test from 'node:test';
import {chapter02Lessons} from '../src/features/los/chapter02Lessons.ts';
import {chapters,lessons} from '../src/features/los/content.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {translationFi} from '../src/features/los/translations.ts';
import {c02Exam} from '../src/features/los/chapterExam.ts';
import {exams,validateLosExams} from '../src/features/los/examBank.ts';
import {gradeExercise} from '../src/features/los/engine.ts';

test('C02 has licensed authentic second text, original voice and every line translated',()=>{
 const c=chapters.find(x=>x.id==='C02')!;
 assert.equal(c.media?.sourceId,'M-COM-02');
 assert.equal(c.media?.license,'CC BY-SA 3.0');
 assert.equal(c.media?.transcript?.length,4);
 assert.equal(c.media?.durationSeconds,12);
 assert.match(c.media?.url??'',/Deutsch_Dialog_._Ich_bin_Peter\.ogg/);
 assert.ok((c.media?.sourceUrl??'').startsWith('https://commons.wikimedia.org/wiki/'));
 for(const block of c.media!.transcript!){
  assert.ok(translationFi[block.id]?.length,'Missing translated Text B line: '+block.id);
 }
 assert.deepEqual(c.media!.transcript!.map(b=>b.speaker),['Thomas','Takashi','Thomas','Takashi']);
 assert.ok(c.media!.transcript![0]!.text.includes('Wie heißt du?'));
});
test('C02 L007–L011 have five real steps, exact 30-minute goals and existing exercises',()=>{
 const c=chapters.find(x=>x.id==='C02')!;
 const ids=new Set(allChapterExercises('C02',c.exercises).map(e=>e.id).concat('EX-C02'));
 assert.deepEqual(chapter02Lessons.map(l=>l.id),['L007','L008','L009','L010','L011']);
 for(const lesson of chapter02Lessons){
  assert.equal(lesson.steps.length,5);
  assert.equal(lesson.steps.reduce((total,s)=>total+s.minutes,0),30,lesson.id);
  assert.ok(lesson.steps.every(s=>s.instructionFi.length>=35));
  assert.ok(lesson.steps.some(s=>s.kind==='practice'&&s.exerciseIds?.length),'No practice: '+lesson.id);
  for(const id of lesson.requiredIds)assert.ok(ids.has(id),'Unresolved exercise '+id);
  for(const step of lesson.steps)for(const id of step.exerciseIds??[])assert.ok(ids.has(id),'Missing exercise in step '+id);
  assert.equal(lessons.find(l=>l.id===lesson.id)?.status,'initial-material');
 }
 assert.deepEqual(chapter02Lessons[3]!.requiredMediaIds,['M-COM-02']);
 assert.deepEqual(chapter02Lessons[4]!.requiredMediaIds,['M-COM-02']);
});
test('C02 listening questions only assert facts actually present in the original transcript',()=>{
 const c=chapters[1]!;
 const items=allChapterExercises(c.id,c.exercises);
 const audio=items.filter(e=>e.type==='listen-choice'||e.type==='listen-write');
 assert.ok(audio.some(e=>e.id==='C02-X14'));
 assert.ok(audio.some(e=>e.id==='C02-X15'));
 for(const e of audio)assert.equal(e.mediaUrl,c.media!.url);
 assert.equal(gradeExercise(items.find(e=>e.id==='C02-X14')!,'Thomas').status,'correct');
 assert.equal(gradeExercise(items.find(e=>e.id==='C02-X15')!,'Wie heißt du?').status,'correct');
 assert.ok(c.media!.transcript!.some(t=>t.text.includes('Das ist Peter.')));
 assert.equal(c.media!.transcript![0]?.text,'Wie heißt du?');
});
test('C02 test has its own independent key and no hints shown in exam',()=>{
 assert.equal(c02Exam.length,15);
 assert.equal(exams['EX-C02'].questions,c02Exam);
 assert.deepEqual(validateLosExams(),[]);
 const practice=new Set(allChapterExercises('C02',chapters[1]!.exercises).map(x=>x.id));
 assert.ok(c02Exam.every(e=>!practice.has(e.id)&&!e.hint));
 for(const ex of c02Exam){
  const answer=ex.correct??ex.accepted?.[0]??'';
  assert.equal(gradeExercise(ex,answer).status,'correct',ex.id);
 }
});
