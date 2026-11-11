import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons,LOS_VERSION} from '../src/features/los/content.ts';
import {chapter03Lessons} from '../src/features/los/chapter03Lessons.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {translationFi} from '../src/features/los/translations.ts';
import {c03Exam} from '../src/features/los/chapterExam.ts';
import {exams,validateLosExams} from '../src/features/los/examBank.ts';
import {gradeExercise} from '../src/features/los/engine.ts';
test('C03 original Berna interview is complete, attributed to the CC BY OER and translated line by line',()=>{
 const c=chapters[2]!;
 assert.equal(c.id,'C03');
 assert.equal(c.status,'text-reviewed');
 assert.equal(c.sourceId,'M-DIB-01');
 assert.equal(c.blocks.length,12);
 assert.match(c.attribution,/COERLL/);
 assert.match(c.license,/CC BY 4\.0/);
 assert.match(c.sourceUrl,/coerll\.utexas\.edu\/dib\/vidt\.php/);
 assert.equal(c.blocks[0]!.text,'Wie heißt du?');
 assert.equal(c.blocks[2]!.text,'Woher kommst du?');
 assert.equal(c.blocks[3]!.text,'Ich komme aus Deutschland.');
 assert.ok(c.blocks[5]!.text.includes('Ich komme aus Kiel.'));
 assert.equal(c.blocks[11]!.text.startsWith('Meine Lieblingsfarbe ist, glaube ich, rot.'),true);
 for(const b of c.blocks)assert.ok(translationFi[b.id]?.length,'Missing Finnish translation '+b.id);
});
test('C03 Text B is actually recorded original Ariser dialogue with licensed transcript in reader',()=>{
 const media=chapters[2]!.media!;
 assert.equal(media.sourceId,'M-COM-02');
 assert.equal(media.license,'CC BY-SA 3.0');
 assert.equal(media.transcript?.length,4);
 assert.equal(media.transcript![2]!.text,'Ich bin Thomas. Das ist Peter. Wir kommen aus Berlin.');
 assert.equal(media.transcript![3]!.text,'Ich komme aus Kyoto. Ich bin Japaner.');
 assert.ok(media.sourceUrl?.includes('commons.wikimedia.org/wiki/File:'));
 for(const b of media.transcript!)assert.ok(translationFi[b.id]);
});
test('L012–L016 each contain five distinct 30-minute teaching steps, required exercises, and the separate exam',()=>{
 const ids=new Set(allChapterExercises('C03',chapters[2]!.exercises).map(x=>x.id).concat('EX-C03'));
 assert.deepEqual(chapter03Lessons.map(l=>l.id),['L012','L013','L014','L015','L016']);
 for(const l of chapter03Lessons){
  assert.equal(l.steps.length,5,l.id);
  assert.equal(l.steps.reduce((total,s)=>total+s.minutes,0),30,l.id);
  assert.equal(new Set(l.steps.map(s=>s.id)).size,5,l.id);
  for(const e of l.requiredIds)assert.ok(ids.has(e),'Missing required '+e);
  for(const s of l.steps){
   assert.ok(s.instructionFi.length>35,s.id);
   for(const e of s.exerciseIds??[])assert.ok(ids.has(e),'Missing step '+e);
  }
  assert.equal(lessons.find(x=>x.id===l.id)?.status,'initial-material');
 }
 assert.deepEqual(chapter03Lessons[3]?.requiredMediaIds,['C03:M-COM-02']);
 assert.deepEqual(chapter03Lessons[4]?.requiredIds,['EX-C03']);
});
test('Berna source-highlight grading is exact, versioned, and blocks are not fabricated',()=>{
 const c=chapters[2]!;
 for(const exId of ['C03-X12','C03-X13']){
  const ex=allChapterExercises('C03',c.exercises).find(x=>x.id===exId)!;
  const block=c.blocks.find(x=>x.id===ex.blockId)!;
  const start=block.text.indexOf(ex.target!);
  assert.ok(start>=0);
  assert.equal(gradeExercise({...ex,sourceText:block.text},{
   blockId:block.id,start,end:start+ex.target!.length,contentVersion:LOS_VERSION
  }).status,'correct');
 }
 const list=allChapterExercises('C03',c.exercises);
 assert.equal(gradeExercise(list.find(e=>e.id==='C03-X17')!,'Berlin').status,'correct');
 assert.equal(gradeExercise(list.find(e=>e.id==='C03-X18')!,'Ich komme aus Kyoto.').status,'correct');
 assert.ok(list.every(e=>!e.prompt.toLowerCase().includes('oma puhelinnumerosi')),'No asking learner for real phone number');
});
test('C03 has 15 independent chapter-exam items with checked answer keys',()=>{
 assert.equal(c03Exam.length,15);
 assert.equal(exams['EX-C03'].questions,c03Exam);
 assert.deepEqual(validateLosExams(),[]);
 const practiceIds=new Set(allChapterExercises('C03',chapters[2]!.exercises).map(x=>x.id));
 for(const e of c03Exam){
  assert.ok(!practiceIds.has(e.id)&&!e.hint);
  assert.equal(gradeExercise(e,e.correct??e.accepted?.[0]??'').status,'correct',e.id);
 }
});
