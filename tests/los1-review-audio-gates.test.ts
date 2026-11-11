import assert from 'node:assert/strict';
import test from 'node:test';
import {readReviewEntry,createReviewEntry,scheduleReviewEntry,reviewIsDue} from '../src/features/los/reviewSchedule.ts';
import {canSubmitExerciseAttempt,exerciseAudioProof} from '../src/features/los/exerciseAttempt.ts';
import {chapters} from '../src/features/los/content.ts';
import {allChapterExercises} from '../src/features/los/practiceExtras.ts';

const now=new Date('2026-11-11T12:00:00.000Z');
test('flashcards activated from L060 are due immediately with the canonical due field',()=>{
 const card=createReviewEntry(now);
 assert.deepEqual(card,{due:'2026-11-11',stage:0});
 assert.equal(reviewIsDue(card,now),true);
 assert.equal(reviewIsDue(card,new Date('2026-11-10T12:00:00Z')),false);
 assert.deepEqual(createReviewEntry(now,'C08'),{due:'2026-11-11',stage:0,source:'C08'});
});
test('old date-field cards remain visible and keep their stage without resetting spaced repetition',()=>{
 const legacy={date:'2026-11-09',stage:2,source:'C06'};
 assert.deepEqual(readReviewEntry(legacy),{due:'2026-11-09',stage:2,source:'C06'});
 assert.equal(reviewIsDue(legacy,now),true);
 const next=scheduleReviewEntry(legacy,true,now);
 assert.deepEqual(next,{due:'2026-11-18',stage:3,source:'C06'});
 assert.equal('date' in next,false,'new cards always use due, not date');
});
test('review dates remain readable after marking cards correct or wrong',()=>{
 const initial=createReviewEntry(now);
 const correct=scheduleReviewEntry(initial,true,now);
 assert.deepEqual(correct,{due:'2026-11-12',stage:1});
 assert.equal(reviewIsDue(correct,now),false);
 assert.equal(reviewIsDue(correct,new Date('2026-11-12T12:00:00Z')),true);
 const again=scheduleReviewEntry(correct,true,new Date('2026-11-12T12:00:00Z'));
 assert.deepEqual(again,{due:'2026-11-15',stage:2});
 const forgot=scheduleReviewEntry(again,false,new Date('2026-11-15T12:00:00Z'));
 assert.deepEqual(forgot,{due:'2026-11-16',stage:0});
});
test('malformed or impossible dates and stages never generate ghost due cards',()=>{
 for(const value of [null,false,0,[],{},'2026-11-11',{due:'tomorrow',stage:2},{due:'2026-02-30',stage:2}]){
  assert.equal(readReviewEntry(value),null);
  assert.equal(reviewIsDue(value,now),false);
 }
 assert.deepEqual(readReviewEntry({due:'2026-11-11',stage:999}),{due:'2026-11-11',stage:4});
 assert.deepEqual(readReviewEntry({due:'2026-11-11',stage:-5}),{due:'2026-11-11',stage:0});
});
test('listening exercise requires a playback receipt after native audio ended',()=>{
 const c=chapters.find(c=>c.id==='C08')!;
 const listening=allChapterExercises('C08',c.exercises).find(e=>e.id==='C08-X19')!;
 assert.equal(listening.type,'listen-choice');
 assert.equal(exerciseAudioProof(listening.id),'media:completed:exercise:C08-X19');
 assert.equal(canSubmitExerciseAttempt(listening,listening.correct!,null,false,false),false);
 assert.equal(canSubmitExerciseAttempt(listening,listening.correct!,null,false,true),true);
 assert.equal(canSubmitExerciseAttempt(listening,'wrong option',null,false,true),false);
});
test('listening writing also requires an authentic completed recording, while normal writing does not',()=>{
 const c=chapters.find(c=>c.id==='C08')!;
 const ex=allChapterExercises('C08',c.exercises);
 const listenWrite=ex.find(e=>e.id==='C08-X20')!;
 const writing=ex.find(e=>e.id==='C08-X23')!;
 assert.equal(listenWrite.type,'listen-write');
 assert.equal(canSubmitExerciseAttempt(listenWrite,'Ich verstehe nicht.',null,false,false),false);
 assert.equal(canSubmitExerciseAttempt(listenWrite,'Ich verstehe nicht.',null,false,true),true);
 assert.equal(canSubmitExerciseAttempt(writing,'Ich verstehe nicht. Noch einmal, bitte!',null,false,false),true);
});
