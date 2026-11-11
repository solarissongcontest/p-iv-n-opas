import assert from 'node:assert/strict';
import test from 'node:test';
import {firstLessons,validateFirstLessons} from '../src/features/los/firstLessons.ts';
import {chapters} from '../src/features/los/content.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';
import {c01Exam} from '../src/features/los/chapterExam.ts';
import {drainLosPending} from '../src/features/los/syncQueue.ts';
test('L001–L006 have five real, individually referenced 30-minute lesson steps',()=>{
 assert.deepEqual(validateFirstLessons(),[]);
 assert.deepEqual(firstLessons.map(x=>x.id),['L001','L002','L003','L004','L005','L006']);
 assert.equal(firstLessons[0]?.steps[0]?.kind,'guide');
 for(const lesson of firstLessons){
  assert.equal(lesson.steps.length,5);
  assert.equal(lesson.steps.reduce((n,step)=>n+step.minutes,0),30);
 }
 const ids=new Set(allChapterExercises('C01',chapters[0]!.exercises).map(x=>x.id).concat('EX-C01'));
 for(const lesson of firstLessons)for(const id of lesson.requiredIds)assert.ok(ids.has(id),'Unknown task '+id);
 for(const e of c01Exam)assert.ok(e.prompt&&!e.hint&&e.explanation);
 assert.equal(c01Exam.length,15);
});
test('queue can commit an edit that arrives while another one is being saved',async()=>{
 const queue={current:{note:'before'} as Record<string,unknown>};
 const written:[string,unknown][]=[];
 const snapshots:string[]=[];
 const drained=await drainLosPending(queue,async(key,value)=>{
  written.push([key,value]);
  if(written.length===1)queue.current[key]='after';
 },()=>snapshots.push(JSON.stringify(queue.current)));
 assert.equal(drained,true);
 assert.deepEqual(written,[['note','before'],['note','after']]);
 assert.deepEqual(queue.current,{});
 assert.equal(snapshots.length,1);
});
test('failed network writes stay in the queue and are retryable',async()=>{
 const queue={current:{'draft:A':'answer'} as Record<string,unknown>};
 await assert.rejects(()=>drainLosPending(queue,async()=>{throw new Error('offline')},()=>{}));
 assert.deepEqual(queue.current,{'draft:A':'answer'});
 const written:string[]=[];
 assert.equal(await drainLosPending(queue,async(key)=>{written.push(key)},()=>{}),true);
 assert.deepEqual(written,['draft:A']);
});
test('new keys added during write are drained in the same transaction cycle',async()=>{
 const queue={current:{a:1} as Record<string,unknown>};
 const sent:string[]=[];
 await drainLosPending(queue,async(key)=>{
  sent.push(key);
  if(key==='a')queue.current.b=2;
 },()=>{});
 assert.deepEqual(sent,['a','b']);
 assert.deepEqual(queue.current,{});
});
