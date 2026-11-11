import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons} from '../src/features/los/content.ts';
import {translationFi} from '../src/features/los/translations.ts';
import {chapter04Lessons} from '../src/features/los/chapter04Lessons.ts';
import {chapter05Lessons} from '../src/features/los/chapter05Lessons.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {c04Exam,c05Exam} from '../src/features/los/chapterExam.ts';
import {exams,validateLosExams} from '../src/features/los/examBank.ts';
import {gradeExercise} from '../src/features/los/engine.ts';

const book=[{id:'C04',lessons:chapter04Lessons,exam:c04Exam,media:'M-COM-04'},
 {id:'C05',lessons:chapter05Lessons,exam:c05Exam,media:'M-COM-05'}] as const;

test('C04 and C05 have actual complete human-written Text A with all lines translated',()=>{
 for(const {id} of book){
  const c=chapters.find(x=>x.id===id)!;
  assert.equal(c.status,'text-reviewed');
  assert.equal(c.blocks.length,id==='C04'?8:4);
  assert.ok(c.sourceUrl.startsWith('https://en.wikibooks.org/wiki/'));
  for(const line of c.blocks)assert.ok(translationFi[line.id]?.length,'Missing Finnish translation '+line.id);
 }
});
test('C04 and C05 Text B are distinct licensed native-human phrases, not fake full conversations',()=>{
 for(const {id,media} of book){
  const c=chapters.find(x=>x.id===id)!;
  assert.equal(c.media?.sourceId,media);
  assert.equal(c.media?.license,'CC BY-SA 4.0');
  assert.equal(c.media?.transcript?.length,1);
  assert.ok(c.media?.sourceUrl?.startsWith('https://commons.wikimedia.org/wiki/File:'));
  assert.ok(c.media?.url.includes('Special:Redirect/file/'));
  for(const line of c.media?.transcript??[])assert.ok(translationFi[line.id]);
 }
 assert.equal(chapters[3]!.media!.transcript![0]!.text,'Wie geht es Ihnen?');
 assert.equal(chapters[4]!.media!.transcript![0]!.text,'Wie geht es dir?');
});
test('L017–L026 are independently authored ~30min with required exercises and authentic playback gates',()=>{
 for(const {id,lessons:ls,media} of book){
  const chapter=chapters.find(c=>c.id===id)!;
  const ids=new Set(allChapterExercises(chapter.id,chapter.exercises).map(x=>x.id).concat('EX-'+id));
  assert.equal(ls.length,5);
  for(const lesson of ls){
   assert.equal(lesson.steps.length,5,lesson.id);
   assert.equal(lesson.steps.reduce((n,s)=>n+s.minutes,0),30,lesson.id);
   assert.equal(new Set(lesson.steps.map(s=>s.id)).size,5,lesson.id);
   assert.ok(lesson.steps.every(s=>s.instructionFi.length>35));
   assert.ok(lesson.requiredIds.length>=1);
   for(const e of lesson.requiredIds)assert.ok(ids.has(e),'Unknown required exercise '+e);
   for(const s of lesson.steps)for(const e of s.exerciseIds??[])assert.ok(ids.has(e),'Unknown step exercise '+e);
   assert.equal(lessons.find(l=>l.id===lesson.id)?.status,'initial-material');
  }
  assert.deepEqual(ls[3]?.requiredMediaIds,[media]);
  assert.deepEqual(ls[4]?.requiredIds,['EX-'+id]);
 }
 for(const l of lessons.filter(l=>l.id>='L012'&&l.id<='L016'))assert.equal(l.status,'initial-material');
});
test('C04/C05 authentic audio practice has unambiguous source recordings and right answer keys',()=>{
 const sources=new Map([['C04','De-wie_geht_es_Ihnen.ogg'],['C05','De-wie_geht_es_dir.ogg']]);
 for(const {id} of book){
  const c=chapters.find(x=>x.id===id)!;
  const es=allChapterExercises(c.id,c.exercises);
  const listen=es.filter(e=>e.type==='listen-choice'||e.type==='listen-write');
  assert.ok(listen.length>=2);
  for(const e of listen)assert.ok(e.mediaUrl?.includes(sources.get(id)!),e.id);
  for(const e of es.filter(e=>e.type==='highlight'||e.type==='find-text')){
   const block=c.blocks.find(b=>b.id===e.blockId);
   assert.ok(block?.text.includes(e.target??''),'Wrong source anchor '+e.id);
  }
 }
});
test('C04/C05 chapter tests are independent fifteen-question whole-paper assessments',()=>{
 assert.deepEqual(validateLosExams(),[]);
 for(const {id,exam} of book){
  assert.equal(exam.length,15);
  assert.equal(exams['EX-'+id as keyof typeof exams].questions,exam);
  const practiceIds=new Set(allChapterExercises(id,chapters.find(c=>c.id===id)!.exercises).map(x=>x.id));
  for(const question of exam){
   assert.ok(!practiceIds.has(question.id));
   assert.ok(!question.hint);
   const answer=question.correct??question.accepted?.[0]??'';
   assert.equal(gradeExercise(question,answer).status,'correct',question.id);
  }
 }
});
