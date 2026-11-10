import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons,sections,validateLosContent,LOS_VERSION} from '../src/features/los/content.ts';
import {gradeExercise,tokenOffsets,normalizeAnswer,dueDate} from '../src/features/los/engine.ts';

test('LOS! 1 preserves canonical ten chapters and sixty lessons',()=>{
 assert.deepEqual(chapters.map(c=>c.id),Array.from({length:10},(_,i)=>'C'+String(i+1).padStart(2,'0')));
 assert.equal(lessons.length,60);
 assert.equal(lessons[0]?.id,'L001');
 assert.equal(lessons[29]?.id,'L030');
 assert.equal(lessons[58]?.id,'L059');
 assert.equal(lessons[59]?.id,'L060');
 assert.equal(lessons.filter(l=>l.chapterId!==null).length,50);
 assert.equal(sections.length,10);
 assert.deepEqual(validateLosContent(),[]);
});
test('C01 keeps complete eight-replica authentic dialogue in stable blocks',()=>{
 const c=chapters[0]!;
 assert.equal(c.sourceId,'M-COM-01');
 assert.equal(c.blocks.length,8);
 assert.equal(c.blocks[0]?.text,'Hallo, wie heißt du?');
 assert.equal(c.blocks[7]?.text,'Tschüss!');
 assert.equal(c.license,'CC BY-SA 3.0');
 assert.ok(c.exercises.length>=13);
});
test('source-pending chapters are not disguised as complete texts',()=>{
 for(const id of ['C03','C06','C08','C10']){
  const chapter=chapters.find(c=>c.id===id)!;
  assert.equal(chapter.status,'source-pending');
  assert.equal(chapter.blocks.length,0);
 }
});
test('grammar spelling normalization accepts Unicode NFC, never substitutes ß with ss',()=>{
 assert.equal(normalizeAnswer(' heiße '),'heiße');
 const e=chapters[1]!.exercises.find(e=>e.id==='C02-E01')!;
 assert.equal(gradeExercise(e,'heiße').status,'correct');
 assert.equal(gradeExercise(e,'heisse').status,'incorrect');
 assert.equal(gradeExercise(e,'heißt').status,'incorrect');
});
test('exact highlight source anchors, version and block are all checked',()=>{
 const chapter=chapters[0]!,e=chapter.exercises.find(e=>e.id==='C01-E02')!;
 const sourceText=chapter.blocks.find(b=>b.id===e.blockId)!.text;
 const enriched={...e,sourceText};
 assert.equal(gradeExercise(enriched,{blockId:e.blockId!,start:0,end:sourceText.length,contentVersion:LOS_VERSION}).status,'correct');
 assert.equal(gradeExercise(enriched,{blockId:'c01-a-1',start:0,end:sourceText.length,contentVersion:LOS_VERSION}).status,'incorrect');
 assert.equal(gradeExercise(enriched,{blockId:e.blockId!,start:0,end:sourceText.length,contentVersion:'old'}).status,'incorrect');
 const tokens=tokenOffsets(sourceText);
 assert.equal(tokens[0]?.text,'Tschüss!');
 assert.equal(tokens[0]?.start,0);
});
test('ordering requires exact token order and hints are not treated as answers',()=>{
 const e=chapters[0]!.exercises.find(e=>e.id==='C01-E06')!;
 assert.equal(gradeExercise(e,'Guten | Tag!').status,'correct');
 assert.equal(gradeExercise(e,'Tag! | Guten').status,'incorrect');
 assert.equal(gradeExercise(e,'').status,'incorrect');
});
test('review schedule is delayed and not an XP/streak score',()=>{
 const date=new Date('2026-11-10T12:00:00Z');
 assert.deepEqual(dueDate(date,false,2),{date:'2026-11-11',stage:0});
 assert.deepEqual(dueDate(date,true,0),{date:'2026-11-13',stage:1});
});
