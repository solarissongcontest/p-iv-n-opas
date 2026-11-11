import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,lessons} from '../src/features/los/content.ts';
import {germanNumber,numberAnswerAccepted,numberDrillResult,NUMBER_DRILL,NUMBER_SESSIONS} from '../src/features/los/germanNumbers.ts';

test('every German number 0–100 exists and uses lowercase standard written form',()=>{
 const words=new Set<string>();
 for(let n=0;n<=100;n++){
  const text=germanNumber(n);
  assert.ok(text.length>=3,'Empty word '+n);
  assert.match(text,/^[a-zäöüß]+$/u,'Invalid German numeral '+n+': '+text);
  assert.ok(!words.has(text),'Duplicate numeral '+n+': '+text);
  words.add(text);
  assert.ok(numberAnswerAccepted(n,text));
 }
 assert.equal(words.size,101);
});
test('non-obvious German forms are linguistically correct and do not use the wrong 21 order',()=>{
 const cases=[
  [0,'null'],[1,'eins'],[10,'zehn'],[11,'elf'],[12,'zwölf'],
  [13,'dreizehn'],[15,'fünfzehn'],[16,'sechzehn'],[17,'siebzehn'],
  [19,'neunzehn'],[20,'zwanzig'],[21,'einundzwanzig'],
  [22,'zweiundzwanzig'],[27,'siebenundzwanzig'],
  [30,'dreißig'],[31,'einunddreißig'],[32,'zweiunddreißig'],
  [40,'vierzig'],[45,'fünfundvierzig'],[50,'fünfzig'],
  [60,'sechzig'],[67,'siebenundsechzig'],[70,'siebzig'],
  [71,'einundsiebzig'],[80,'achtzig'],[90,'neunzig'],
  [99,'neunundneunzig'],[100,'einhundert']
 ] as const;
 for(const [n,expected] of cases)assert.equal(germanNumber(n),expected,n+' spelling');
 assert.equal(numberAnswerAccepted(21,'einsundzwanzig'),false);
 assert.equal(numberAnswerAccepted(16,'sechszehn'),false);
 assert.equal(numberAnswerAccepted(17,'siebenzehn'),false);
 assert.equal(numberAnswerAccepted(70,'siebenzig'),false);
 assert.equal(numberAnswerAccepted(30,'dreissig'),false,'Preserve ß in the normal model');
 assert.equal(numberAnswerAccepted(100,'hundert'),true);
 assert.equal(numberAnswerAccepted(100,'ein hundert'),false);
});
test('bounded numeral generation rejects decimals, strings, negative values and numbers over 100',()=>{
 for(const n of [-1,101,1.5,Number.NaN,Number.POSITIVE_INFINITY])assert.throws(()=>germanNumber(n),RangeError);
 for(const n of [-1,101,1.5])assert.equal(numberAnswerAccepted(n,'eins'),false);
 assert.equal(numberAnswerAccepted(23,'DREIUNDZWANZIG'),true);
 assert.equal(numberAnswerAccepted(12,'  zwölf  '),true);
});
test('two written drills contain at least twenty two authentic numerals and grade every key',()=>{
 const ids=new Set<string>();
 let count=0;
 for(const session of NUMBER_SESSIONS){
  assert.ok(!ids.has(session.id));
  ids.add(session.id);
  assert.ok(session.numbers.length>=11);
  const response=Object.fromEntries(session.numbers.map(n=>[String(n),germanNumber(n)]));
  const score=numberDrillResult(session.numbers,response);
  assert.deepEqual(score,{correct:session.numbers.length,total:session.numbers.length,errors:[]});
  count+=session.numbers.length;
  assert.equal(numberDrillResult(session.numbers,{}).correct,0);
 }
 assert.ok(count>=22);
 assert.ok(NUMBER_DRILL.includes(16));
 assert.ok(NUMBER_DRILL.includes(17));
 assert.ok(NUMBER_DRILL.includes(99));
});
test('C06 now contains a separate real human-written age-dialogue unit, with no verified embedded ZPE audio',()=>{
 const chapter=chapters.find(c=>c.id==='C06')!;
 assert.equal(chapter.status,'text-reviewed');
 assert.equal(chapter.blocks.length,12);
 assert.equal(chapter.media,undefined,'The original Polish audio has not been verified as in-app playable');
 assert.equal(lessons.find(l=>l.id==='L031')?.status,'initial-material');
 assert.equal(lessons.find(l=>l.id==='L035')?.status,'initial-material');
});
