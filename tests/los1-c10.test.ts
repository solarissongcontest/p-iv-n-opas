import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons,LOS_VERSION} from '../src/features/los/content.ts';
import {chapter10Lessons} from '../src/features/los/chapter10Lessons.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {translationFi} from '../src/features/los/translations.ts';
import {c10Exam} from '../src/features/los/chapterExam.ts';
import {exams,validateLosExams} from '../src/features/los/examBank.ts';
import {gradeExercise} from '../src/features/los/engine.ts';

const chapter=chapters.find(c=>c.id==='C10')!;
const exercises=allChapterExercises('C10',chapter.exercises);
const exerciseIds=new Set(exercises.map(e=>e.id).concat('EX-C10'));

test('C10 displays the full 14-turn authentic COERLL Harald interview with full original text',()=>{
 assert.equal(chapter.status,'text-reviewed');
 assert.equal(chapter.sourceId,'M-DIB-02');
 assert.equal(chapter.blocks.length,14);
 assert.match(chapter.sourceUrl,/01_22_int_hb_who/);
 assert.match(chapter.license,/CC BY 4\.0/);
 assert.match(chapter.attribution,/COERLL/);
 assert.equal(chapter.blocks[1]?.text,'Ich heiße Harald Becker.');
 assert.equal(chapter.blocks[3]?.text,'Ich komme ursprünglich aus München.');
 assert.equal(chapter.blocks[7]?.text,'Ich bin jetzt so um die fünfzig.');
 assert.equal(chapter.blocks[11]?.text,'Blau.');
 assert.equal(chapter.blocks[13]?.text.startsWith('Ahmh, das ist eine gute Frage.'),true);
 for(const b of chapter.blocks)assert.ok(translationFi[b.id]?.trim().length>=8,'Untranslated original turn: '+b.id);
 assert.equal(chapter.media,undefined,'The unverified video may not be attached as verified audio');
});
test('C10 independent comparison source is the actual original 12-line Berna interview',()=>{
 const berna=chapters.find(c=>c.id==='C03')!;
 assert.equal(berna.status,'text-reviewed');
 assert.equal(berna.blocks.length,12);
 assert.equal(berna.blocks[3]?.text,'Ich komme aus Deutschland.');
 assert.ok(berna.blocks[5]?.text.includes('Ich komme aus Kiel.'));
 assert.ok(berna.blocks[11]?.text.includes('rot.'));
 assert.ok(chapter.blocks[3]?.text.includes('München'));
 const comparison=exercises.find(e=>e.id==='C10-X19')!;
 assert.equal(gradeExercise(comparison,'Harald tulee Münchenistä ja Berna Kielistä.').status,'correct');
});
test('five C10 guided lessons have five stages and true 30min goals',()=>{
 assert.deepEqual(chapter10Lessons.map(l=>l.id),['L051','L052','L053','L054','L055']);
 for(const lesson of chapter10Lessons){
  assert.equal(lesson.steps.length,5,lesson.id);
  assert.equal(lesson.steps.reduce((total,s)=>total+s.minutes,0),30,lesson.id);
  assert.equal(new Set(lesson.steps.map(s=>s.id)).size,5,lesson.id);
  assert.ok(lesson.steps.every(s=>s.instructionFi.length>55),lesson.id);
  assert.ok(lesson.steps.some(s=>s.kind==='practice'),lesson.id);
  for(const id of lesson.requiredIds)assert.ok(exerciseIds.has(id),'Unavailable exercise '+id);
  for(const step of lesson.steps)for(const id of step.exerciseIds??[])assert.ok(exerciseIds.has(id),'Unavailable step exercise '+id);
  assert.equal(lessons.find(l=>l.id===lesson.id)?.status,'initial-material');
 }
 assert.deepEqual(chapter10Lessons[3]?.requiredMediaIds,['review:L054:M-COM-01']);
 assert.deepEqual(chapter10Lessons[4]?.requiredIds,['EX-C10']);
 assert.equal(lessons.find(l=>l.id==='L056')?.status,'initial-material');
});
test('all C10 primary-source highlight ranges refer to exact source characters and are versioned',()=>{
 for(const id of ['C10-X11','C10-X12','C10-X13']){
  const ex=exercises.find(e=>e.id===id)!;
  const text=chapter.blocks.find(b=>b.id===ex.blockId)!.text;
  const start=text.indexOf(ex.target!);
  assert.ok(start>=0,id+' target was invented');
  assert.equal(gradeExercise({...ex,sourceText:text},{
   blockId:ex.blockId!,start,end:start+ex.target!.length,contentVersion:LOS_VERSION
  }).status,'correct');
 }
});
test('C10 has independently graded 20-item no-hint exam distinct from full-book final',()=>{
 assert.equal(c10Exam.length,20);
 assert.equal(exams['EX-C10'].questions,c10Exam);
 assert.deepEqual(validateLosExams(),[]);
 const ids=new Set(exercises.map(e=>e.id));
 for(const q of c10Exam){
  assert.equal(ids.has(q.id),false,'reused exercise: '+q.id);
  assert.equal(q.hint,'');
  const correct=q.correct??q.accepted?.[0]??'';
  assert.equal(gradeExercise(q,correct).status,'correct',q.id);
 }
 assert.notEqual(exams['EX-FINAL'].questions,c10Exam);
});
test('two separately authored applications require writing, not fake speech recognition',()=>{
 for(const id of ['C10-X26','C10-X27','C10-X28']){
  const ex=exercises.find(e=>e.id===id)!;
  assert.equal(ex.type,'writing');
  assert.equal(gradeExercise(ex,'Ich heiße Lea.').status,'self-review');
 }
 const voice=exercises.find(e=>e.id==='C10-X29')!;
 assert.equal(voice.type,'speech');
 assert.equal(gradeExercise(voice,'').status,'self-review');
});
