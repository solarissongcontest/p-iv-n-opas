import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons,LOS_VERSION} from '../src/features/los/content.ts';
import {chapter07Lessons} from '../src/features/los/chapter07Lessons.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {translationFi} from '../src/features/los/translations.ts';
import {c07Exam} from '../src/features/los/chapterExam.ts';
import {exams,validateLosExams} from '../src/features/los/examBank.ts';
import {gradeExercise} from '../src/features/los/engine.ts';

const chapter=chapters.find(c=>c.id==='C07')!;
const extras=allChapterExercises('C07',chapter.exercises);
const idSet=new Set(extras.map(ex=>ex.id).concat('EX-C07'));
test('C07 original human-written phone directory dialogue is complete, source-linked and translated without fake numbers',()=>{
 assert.equal(chapter.status,'text-reviewed');
 assert.equal(chapter.blocks.length,5);
 assert.match(chapter.sourceUrl,/Bitte_buchstabieren_Sie/);
 assert.match(chapter.license,/CC BY-SA/);
 assert.ok(chapter.blocks[1]!.text.includes('Claudia Bolliger aus Bern'));
 assert.ok(chapter.blocks[3]!.text.includes('zweimal L wie Ludwig'));
 for(const block of chapter.blocks)assert.ok(translationFi[block.id]?.trim().length>3,'Missing '+block.id);
 assert.ok(!chapter.exercises.some(ex=>ex.prompt.includes('oma puhelinnumero')));
});
test('C07 two real independent human recordings are properly distinguished from original dialogue',()=>{
 assert.equal(chapter.media?.sourceId,'M-COM-07-BUCH');
 assert.equal(chapter.media?.license,'CC BY-SA 4.0');
 assert.equal(chapter.media?.transcript?.length,1);
 assert.equal(chapter.media!.transcript![0]!.text,'buchstabieren');
 assert.equal(translationFi['c07-b-1'],'tavata kirjaimet ääneen');
 assert.match(chapter.media!.sourceUrl!,/De-buchstabieren/);
 // Separate alphabet recording in Reader, not misrepresented as the recording of the phone call.
 const alphabet={sourceUrl:'https://commons.wikimedia.org/wiki/File:German_Grammar_-_The_Alphabet.ogg',
  license:'CC BY-SA 3.0',sourceId:'M-COM-07-ABC'};
 assert.match(alphabet.sourceUrl,/German_Grammar/);
 assert.equal(alphabet.license,'CC BY-SA 3.0');
});
test('L036–L040 have five substantive steps summing to 30min, exact prerequisites and two playback events',()=>{
 assert.deepEqual(chapter07Lessons.map(l=>l.id),['L036','L037','L038','L039','L040']);
 for(const lesson of chapter07Lessons){
  assert.equal(lesson.steps.length,5,lesson.id);
  assert.equal(lesson.steps.reduce((sum,step)=>sum+step.minutes,0),30,lesson.id);
  assert.equal(new Set(lesson.steps.map(step=>step.id)).size,5,lesson.id);
  assert.ok(lesson.steps.every(step=>step.instructionFi.length>50),lesson.id);
  assert.ok(lesson.steps.some(step=>step.kind==='practice'),lesson.id);
  for(const id of lesson.requiredIds)assert.ok(idSet.has(id),id);
  for(const step of lesson.steps)for(const id of step.exerciseIds??[])assert.ok(idSet.has(id),id);
  assert.equal(lessons.find(l=>l.id===lesson.id)?.status,'initial-material');
 }
 assert.deepEqual(chapter07Lessons[3]!.requiredMediaIds,['M-COM-07-BUCH','M-COM-07-ABC']);
 assert.deepEqual(chapter07Lessons[4]!.requiredIds,['EX-C07']);
 assert.equal(lessons.find(l=>l.id==='L035')?.status,'initial-material');
 assert.equal(lessons.find(l=>l.id==='L041')?.status,'initial-material');
 assert.equal(lessons.find(l=>l.id==='L042')?.status,'pending');
});
test('C07 source anchors and one-word human audio prompts are not misleading or fabricated',()=>{
 const word=extras.find(e=>e.id==='C07-X19')!;
 const spell=extras.find(e=>e.id==='C07-X20')!;
 assert.equal(word.mediaUrl,chapter.media?.url);
 assert.equal(spell.mediaUrl,chapter.media?.url);
 assert.equal(gradeExercise(word,'buchstabieren').status,'correct');
 assert.equal(gradeExercise(spell,'buchstabieren').status,'correct');
 for(const id of ['C07-X14','C07-X15']){
  const ex=extras.find(e=>e.id===id)!;
  const block=chapter.blocks.find(b=>b.id===ex.blockId)!;
  const start=block.text.indexOf(ex.target!);
  assert.ok(start>=0,id+' not in source');
  assert.equal(gradeExercise({...ex,sourceText:block.text},{
   blockId:block.id,start,end:start+ex.target!.length,contentVersion:LOS_VERSION
  }).status,'correct');
 }
});
test('C07 chapter test has fifteen separate, accurately graded questions and no pre-submit hints',()=>{
 assert.equal(c07Exam.length,15);
 assert.equal(exams['EX-C07'].questions,c07Exam);
 assert.deepEqual(validateLosExams(),[]);
 for(const ex of c07Exam){
  assert.ok(!idSet.has(ex.id));
  assert.equal(ex.hint,'');
  const answer=ex.correct??ex.accepted?.[0]??'';
  assert.equal(gradeExercise(ex,answer).status,'correct',ex.id);
 }
});
