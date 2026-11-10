import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons,sections,validateLosContent,LOS_VERSION} from '../src/features/los/content.ts';
import {gradeExercise,tokenOffsets,normalizeAnswer,dueDate} from '../src/features/los/engine.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {midExam,finalExam,validateLosExams} from '../src/features/los/examBank.ts';

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
test('additional practice is differentiated across all ten chapters',()=>{
 const ids:string[]=[];
 for(const c of chapters){
  const exercises=allChapterExercises(c.id,c.exercises);
  assert.ok(exercises.length>=9,'Too few exercises in '+c.id);
  ids.push(...exercises.map(e=>e.id));
  for(const ex of exercises){assert.ok(ex.prompt.trim());assert.ok(ex.explanation.trim());assert.ok(ex.hint.trim());}
 }
 assert.equal(ids.length,new Set(ids).size);
});
test('L030 and L059 have distinct complete deterministic 25/50 question banks',()=>{
 assert.equal(midExam.length,25);
 assert.equal(finalExam.length,50);
 assert.deepEqual(validateLosExams(),[]);
 const all=[...midExam,...finalExam];
 assert.equal(new Set(all.map(x=>x.id)).size,75);
 for(const ex of all){
  const answer=ex.correct??ex.accepted?.[0]??ex.order?.join(' | ')??'';
  assert.equal(gradeExercise(ex,answer).status,'correct',ex.id);
 }
});
test('16 exercise schemas are defined, deterministic where reliable, and video cannot be falsely scored',()=>{
 const c=chapters[0]!, e=allChapterExercises(c.id,c.exercises);
 assert.equal(gradeExercise(e.find(x=>x.id==='C01-X01')!,JSON.stringify({'Hallo!':'Hei!','danke':'kiitos','Tschüss!':'Hei hei!'})).status,'correct');
 assert.equal(gradeExercise(e.find(x=>x.id==='C01-X01')!,JSON.stringify({'Hallo!':'Hei!','danke':'hei','Tschüss!':'Hei hei!'})).status,'incorrect');
 const audioChoice=e.find(x=>x.id==='C01-X02')!;
 assert.equal(audioChoice.type,'listen-choice');
 assert.ok(audioChoice.mediaUrl?.includes('commons.wikimedia.org'));
 assert.equal(gradeExercise(audioChoice,'Wie alt bist du?').status,'correct');
 assert.equal(gradeExercise(e.find(x=>x.id==='C01-X03')!,'Tschüss!').status,'correct');
 const conjugation=allChapterExercises('C02',chapters[1]!.exercises).find(x=>x.type==='conjugation')!;
 assert.equal(gradeExercise(conjugation,JSON.stringify({'ich (heißen)':'heiße','du (heißen)':'heißt','ich (sein)':'bin','du (sein)':'bist'})).status,'correct');
 const article=allChapterExercises('C07',chapters[6]!.exercises).find(x=>x.type==='article-sort')!;
 assert.equal(gradeExercise(article,JSON.stringify({Name:'der',Frau:'die',Jahr:'das'})).status,'correct');
 assert.equal(gradeExercise(article,JSON.stringify({Name:'das',Frau:'die',Jahr:'der'})).status,'incorrect');
 const correction=allChapterExercises('C05',chapters[4]!.exercises).find(x=>x.type==='error-correction')!;
 assert.equal(gradeExercise(correction,'Mir geht es gut.').status,'correct');
 const types=new Set(['highlight','choice','true-false','fill','matching','ordering','translate','find-text','listen-choice','listen-write','video','article-sort','conjugation','error-correction','writing','speech']);
 assert.equal(types.size,16);
 const unverifiedVideo={id:'test-video',type:'video' as const,prompt:'test',videoId:'unverified',hint:'',explanation:'',reviewedMedia:false,correct:'X',options:['X','Y']};
 assert.equal(gradeExercise(unverifiedVideo,'X').status,'self-review');
});
test('review schedule is delayed and not an XP/streak score',()=>{
 const date=new Date('2026-11-10T12:00:00Z');
 assert.deepEqual(dueDate(date,false,2),{date:'2026-11-11',stage:0});
 assert.deepEqual(dueDate(date,true,0),{date:'2026-11-11',stage:1});
 assert.deepEqual(dueDate(date,true,1),{date:'2026-11-13',stage:2});
});
