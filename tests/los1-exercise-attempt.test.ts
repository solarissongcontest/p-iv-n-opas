import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,LOS_VERSION,type Exercise} from '../src/features/los/content.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {hasExerciseAttempt} from '../src/features/los/exerciseAttempt.ts';
import {gradeExercise} from '../src/features/los/engine.ts';

const all=chapters.flatMap(c=>allChapterExercises(c.id,c.exercises));
const find=(id:string)=>{const q=all.find(x=>x.id===id);assert.ok(q,id+' exists');return q};
test('no empty practice attempt may be used as an authentic submission',()=>{
 for(const ex of all){
  assert.equal(hasExerciseAttempt(ex,'',null,false),false,ex.id+' empty');
 }
});
test('a learner may submit an incorrect but nonempty choice, not a blank or unknown option',()=>{
 const ex=find('C01-E01');
 assert.equal(ex.type,'choice');
 assert.equal(hasExerciseAttempt(ex,'',null),false);
 assert.equal(hasExerciseAttempt(ex,'not-an-option',null),false);
 assert.equal(hasExerciseAttempt(ex,'Gute Nacht!',null),true);
 assert.equal(gradeExercise(ex,'Gute Nacht!').status,'incorrect');
});
test('writing stays self-evaluated but demands meaningful content before revealing its model',()=>{
 const ex=find('C10-X26');
 assert.equal(ex.type,'writing');
 assert.equal(hasExerciseAttempt(ex,'',null),false);
 assert.equal(hasExerciseAttempt(ex,'Hallo',null),false);
 assert.equal(hasExerciseAttempt(ex,'A: Hallo! B: Hallo, ich heiße Mia.',null),true);
 assert.equal(gradeExercise(ex,'A: Hallo! B: Hallo, ich heiße Mia.').status,'self-review');
});
test('speech acknowledgment does not masquerade as automatic pronunciation grading',()=>{
 const ex=find('C10-X29');
 assert.equal(ex.type,'speech');
 assert.equal(hasExerciseAttempt(ex,'',null),false);
 assert.equal(hasExerciseAttempt(ex,'',null,true),true);
 assert.equal(gradeExercise(ex,'').status,'self-review');
});
test('highlight attempts require non-empty same-block anchors, not just a click',()=>{
 const ex=find('C01-E02');
 const ok={blockId:ex.blockId!,start:0,end:2,contentVersion:LOS_VERSION};
 assert.equal(hasExerciseAttempt(ex,'',null),false);
 assert.equal(hasExerciseAttempt(ex,'',{...ok,end:0}),false);
 assert.equal(hasExerciseAttempt(ex,'',{...ok,blockId:'wrong'}),false);
 assert.equal(hasExerciseAttempt(ex,'',ok),true);
});
test('matching and word ordering require every part attempted, even when answers are incorrect',()=>{
 const mapping=all.find(x=>x.type==='matching'&&x.pairs?.length);
 assert.ok(mapping,'matching exercise');
 const pairs=mapping.pairs!;
 assert.equal(hasExerciseAttempt(mapping,'{}',null),false);
 const partial=JSON.stringify({[pairs[0]![0]]:'wrong'});
 if(pairs.length>1)assert.equal(hasExerciseAttempt(mapping,partial,null),false);
 const allWrong=Object.fromEntries(pairs.map(([key])=>[key,'not-the-answer']));
 assert.equal(hasExerciseAttempt(mapping,JSON.stringify(allWrong),null),true);
 const ordered=all.find(x=>x.type==='ordering'&&x.order&&x.order.length>=2);
 assert.ok(ordered,'ordering exercise');
 assert.equal(hasExerciseAttempt(ordered,ordered.order![0]!,null),false);
 assert.equal(hasExerciseAttempt(ordered,ordered.order!.join(' | '),null),true);
});
test('a missing or unreviewed video cannot produce an attempted submission',()=>{
 const e:Exercise={id:'NO-VIDEO',type:'video',prompt:'Quelle',options:['a','b'],correct:'a',reviewedMedia:false,hint:'',explanation:''};
 assert.equal(hasExerciseAttempt(e,'a',null),false);
 assert.equal(hasExerciseAttempt({...e,reviewedMedia:true},'a',null),true);
});
