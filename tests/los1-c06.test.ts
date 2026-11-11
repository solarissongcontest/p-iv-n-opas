import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons,LOS_VERSION} from '../src/features/los/content.ts';
import {chapter06Lessons} from '../src/features/los/chapter06Lessons.ts';
import {guidedLessons} from '../src/features/los/guidedLessons.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {translationFi} from '../src/features/los/translations.ts';
import {c06Exam} from '../src/features/los/chapterExam.ts';
import {exams,validateLosExams} from '../src/features/los/examBank.ts';
import {gradeExercise} from '../src/features/los/engine.ts';

const c=chapters.find(x=>x.id==='C06')!;
const practice=allChapterExercises('C06',c.exercises);
const ids=new Set(practice.map(e=>e.id).concat('EX-C06'));

test('C06 newly licensed human-written source has four complete 12-turn original age dialogues',()=>{
 assert.equal(c.status,'text-reviewed');
 assert.equal(c.sourceId,'M-ZPE-01');
 assert.equal(c.sourceUrl,'https://zpe.gov.pl/a/plik-audio/DIcQL1VxT');
 assert.match(c.attribution,/Monika Janicka/);
 assert.match(c.attribution,/Transkription/);
 assert.match(c.license,/CC BY-SA 3\.0/);
 assert.equal(c.blocks.length,12);
 assert.deepEqual(c.blocks.map(x=>x.speaker?.split(' · ')[0]),[
  'Dialog 1','Dialog 1','Dialog 1','Dialog 1',
  'Dialog 2','Dialog 2','Dialog 2','Dialog 2',
  'Dialog 3','Dialog 3','Dialog 4','Dialog 4'
 ]);
 assert.equal(c.blocks[0]?.text,'Hi, wie alt bist du?');
 assert.equal(c.blocks[1]?.text,'Ich bin neun.');
 assert.equal(c.blocks[3]?.text,'Lucas.');
 assert.equal(c.blocks[7]?.text,'Ich bin schon zwölf Jahre alt.');
 assert.equal(c.blocks[9]?.text,'Wir sind 10.');
 assert.equal(c.blocks[11]?.text,'Paul? Er ist elf Jahre alt.');
 for(const block of c.blocks)assert.ok(translationFi[block.id]?.trim().length>=5,'Finnish translation absent '+block.id);
 assert.equal(translationFi['c06-a-2'],'Olen yhdeksänvuotias.');
 assert.equal(translationFi['c06-a-4'],'Lucas.');
 assert.equal(c.media,undefined,'Original ZPE audio is still not directly verified playable');
});
test('L031–L035 all have different complete five-stage 30-minute lessons and correct prerequisites',()=>{
 assert.deepEqual(chapter06Lessons.map(l=>l.id),['L031','L032','L033','L034','L035']);
 assert.equal(new Set(chapter06Lessons.map(l=>l.id)).size,5);
 for(const l of chapter06Lessons){
  assert.equal(l.steps.length,5,l.id);
  assert.equal(l.steps.reduce((sum,s)=>sum+s.minutes,0),30,l.id);
  assert.equal(new Set(l.steps.map(s=>s.id)).size,5,l.id);
  assert.ok(l.steps.some(s=>s.kind==='practice'),l.id);
  assert.ok(l.steps.every(s=>s.instructionFi.length>50),l.id);
  assert.equal(lessons.find(x=>x.id===l.id)?.status,'initial-material');
  assert.equal(guidedLessons.filter(x=>x.id===l.id).length,1);
  for(const id of l.requiredIds)assert.ok(ids.has(id),'Missing required '+id);
  for(const s of l.steps)for(const id of s.exerciseIds??[])assert.ok(ids.has(id),'Missing step exercise '+id);
 }
 assert.deepEqual(chapter06Lessons[3]?.requiredMediaIds,['review:L034:M-COM-01']);
 assert.deepEqual(chapter06Lessons[4]?.requiredIds,['EX-C06']);
});
test('all C06 new source-highlights select exact original text and version',()=>{
 for(const id of ['C06-X17','C06-X18','C06-X19']){
  const ex=practice.find(x=>x.id===id)!;
  const block=c.blocks.find(x=>x.id===ex.blockId)!;
  const offset=block.text.indexOf(ex.target!);
  assert.ok(offset>=0,id+' target absent in original');
  assert.equal(gradeExercise({...ex,sourceText:block.text},{
   blockId:block.id,start:offset,end:offset+ex.target!.length,contentVersion:LOS_VERSION
  }).status,'correct');
 }
});
test('C06 actual audio tasks reference original C01 human voice, never falsely labelled Janicka audio',()=>{
 const ids=['C06-X29','C06-X30'];
 for(const id of ids){
  const e=practice.find(x=>x.id===id)!;
  assert.equal(e.type,'listen-choice');
  assert.match(e.mediaUrl!,/commons\.wikimedia\.org/);
  assert.match(e.mediaUrl!,/Gespr%C3%A4chVorstellung\.ogg/);
  assert.equal(gradeExercise(e,e.correct!).status,'correct');
  assert.match(e.explanation,/C01|erillisen/);
 }
});
test('C06 independent chapter exam has 20 checked questions, with no pre-submit hints or reused practice IDs',()=>{
 assert.equal(c06Exam.length,20);
 assert.equal(exams['EX-C06'].questions,c06Exam);
 assert.deepEqual(validateLosExams(),[]);
 for(const q of c06Exam){
  assert.equal(q.hint,'');
  assert.equal(practice.some(p=>p.id===q.id),false);
  assert.equal(gradeExercise(q,q.correct??q.accepted?.[0]??'').status,'correct',q.id);
 }
 assert.equal(lessons.find(x=>x.id==='L035')?.status,'initial-material');
});
test('C08 remains independent missing original classroom source even after C06 import',()=>{
 assert.equal(chapters.find(x=>x.id==='C08')?.status,'source-pending');
 assert.equal(chapters.find(x=>x.id==='C08')?.blocks.length,0);
 assert.equal(lessons.find(x=>x.id==='L042')?.status,'pending');
});
