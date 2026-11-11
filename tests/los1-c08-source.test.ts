import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons,LOS_VERSION} from '../src/features/los/content.ts';
import {chapter08SourceLessons} from '../src/features/los/chapter08SourceLessons.ts';
import {guidedLessons} from '../src/features/los/guidedLessons.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {translationFi} from '../src/features/los/translations.ts';
import {c08Exam} from '../src/features/los/chapterExam.ts';
import {exams,validateLosExams} from '../src/features/los/examBank.ts';
import {gradeExercise} from '../src/features/los/engine.ts';

const c=chapters.find(x=>x.id==='C08')!;
const practice=allChapterExercises('C08',c.exercises);
const ids=new Set(practice.map(x=>x.id).concat('EX-C08'));

test('C08 12-turn independent Polish school chat has real author, URL, license and every Finnish translation',()=>{
 assert.equal(c.id,'C08');
 assert.equal(c.status,'text-reviewed');
 assert.equal(c.sourceId,'M-ZPE-02');
 assert.equal(c.blocks.length,12);
 assert.match(c.sourceUrl,/zpe\.gov\.pl\/a\/przeczytaj\/DOdbZ7KLX/);
 assert.match(c.attribution,/Magdalena Sieradz/);
 assert.match(c.attribution,/COERLL/);
 assert.match(c.license,/CC BY-SA 3\.0/);
 assert.equal(c.blocks[0]!.text,'Hallo Fabian, wie geht es dir?');
 assert.equal(c.blocks[6]!.text,'Nein. Die Dialoge sind leicht.');
 assert.equal(c.blocks[9]!.text,'Schreibt ihr auch Texte?');
 assert.equal(c.blocks[11]!.text,'Das klingt alles sehr spannend.');
 assert.ok(c.blocks[8]!.text.includes('Die Lehrerin prüft, ob wir die Wörter richtig aussprechen.'));
 assert.ok(c.blocks[10]!.text.includes('Tablets und Smartphones'));
 for(const block of c.blocks)assert.ok(translationFi[block.id]?.trim().length>10,'Missing complete Finnish pedagogy: '+block.id);
});
test('C08 audio is independently licensed, one spoken phrase, and does not pretend to narrate the written chat',()=>{
 assert.equal(c.media?.sourceId,'M-COM-08-ICH');
 assert.equal(c.media?.license,'Public domain');
 assert.match(c.media?.sourceUrl??'',/De-Ich_verstehe_nicht\.oga/);
 assert.match(c.media?.attribution??'',/Timwi/);
 assert.deepEqual(c.media?.transcript?.map(b=>b.text),['Ich verstehe nicht.']);
 assert.equal(translationFi['c08-b-1'],'En ymmärrä.');
 const second='https://commons.wikimedia.org/wiki/File:De-wiederholen2.ogg';
 assert.match(second,/De-wiederholen2\.ogg/);
 assert.notEqual(c.sourceUrl,c.media?.sourceUrl);
});
test('C08 L042 L044 and L045 have thirty-minute five-stage lessons, source anchors and both audio receipts',()=>{
 assert.deepEqual(chapter08SourceLessons.map(p=>p.id),['L042','L044','L045']);
 for(const plan of chapter08SourceLessons){
  assert.equal(plan.steps.length,5,plan.id);
  assert.equal(plan.steps.reduce((n,s)=>n+s.minutes,0),30,plan.id);
  assert.equal(new Set(plan.steps.map(s=>s.id)).size,5);
  assert.ok(plan.steps.every(s=>s.instructionFi.length>65),plan.id);
  assert.ok(plan.steps.some(s=>s.kind==='practice'),plan.id);
  for(const id of plan.requiredIds)assert.ok(ids.has(id),'Missing required task '+id);
  for(const step of plan.steps)for(const id of step.exerciseIds??[])assert.ok(ids.has(id),'Missing step task '+id);
  assert.equal(lessons.find(l=>l.id===plan.id)?.status,'initial-material');
  assert.equal(guidedLessons.filter(p=>p.id===plan.id).length,1);
 }
 assert.deepEqual(chapter08SourceLessons[1]?.requiredMediaIds,['M-COM-08-ICH','M-COM-08-WIED']);
 assert.deepEqual(chapter08SourceLessons[2]?.requiredIds,['EX-C08']);
});
test('C08 source-linked highlights exactly use stable block and version while audio tasks cite actual other recordings',()=>{
 for(const id of ['C08-X10','C08-X11','C08-X12']){
  const e=practice.find(x=>x.id===id)!;
  const block=c.blocks.find(b=>b.id===e.blockId)!;
  assert.ok(block);
  const start=block.text.indexOf(e.target!);
  assert.ok(start>=0,id+' text not found in original');
  assert.equal(gradeExercise({...e,sourceText:block.text},{
   blockId:block.id,start,end:start+e.target!.length,contentVersion:LOS_VERSION
  }).status,'correct',id);
 }
 for(const id of ['C08-X19','C08-X20']){
  const e=practice.find(x=>x.id===id)!;
  assert.equal(e.mediaUrl,c.media?.url);
  assert.equal(gradeExercise(e,e.correct??e.accepted?.[0]??'').status,'correct',id);
 }
 for(const id of ['C08-X21','C08-X22']){
  const e=practice.find(x=>x.id===id)!;
  assert.match(e.mediaUrl??'',/De-wiederholen2\.ogg/);
  assert.equal(gradeExercise(e,e.correct??e.accepted?.[0]??'').status,'correct',id);
 }
});
test('C08 15-item independent chapter assessment is valid and separated from practice',()=>{
 assert.equal(c08Exam.length,15);
 assert.equal(exams['EX-C08'].questions,c08Exam);
 assert.deepEqual(validateLosExams(),[]);
 for(const e of c08Exam){
  assert.equal(e.hint,'');
  assert.equal(practice.some(p=>p.id===e.id),false);
  assert.equal(gradeExercise(e,e.correct??e.accepted?.[0]??'').status,'correct',e.id);
 }
});
