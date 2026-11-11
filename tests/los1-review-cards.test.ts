import assert from 'node:assert/strict';
import test from 'node:test';
import {allWords} from '../src/features/los/content.ts';
import {reviewCardInfo} from '../src/features/los/reviewCards.ts';
import {readReviewEntry,reviewIsDue} from '../src/features/los/reviewSchedule.ts';

test('review cards for automatic practice show the real question and correct source answer',()=>{
 const card=reviewCardInfo('review:C08-X19');
 assert.equal(card.kind,'exercise');
 assert.match(card.title,/Timwin alkuperäinen/);
 assert.match(card.solution,/Ich verstehe nicht/);
 assert.doesNotMatch(card.title,/^C08-X19$/);
});
test('review cards from cumulative lessons retain their complete independent question',()=>{
 const review=reviewCardInfo('review:REV2-01');
 assert.equal(review.kind,'exercise');
 assert.match(review.title,/16/);
 assert.match(review.solution,/sechzehn/);
});
test('vocabulary review cards continue to show words and their Finnish glosses',()=>{
 const w=allWords[0]!;
 const card=reviewCardInfo('review:'+w.de);
 assert.equal(card.kind,'word');
 assert.equal(card.title,w.de);
 assert.equal(card.solution,w.fi);
});
test('a missing old task does not masquerade as an authentic source exercise',()=>{
 const card=reviewCardInfo('review:deleted-task-v1');
 assert.equal(card.kind,'missing');
 assert.match(card.solution,/ei ole enää saatavilla/);
});
test('previously activated date-only cards can still be located by due review lists',()=>{
 const old={date:'2026-11-11',stage:1};
 assert.equal(readReviewEntry(old)?.due,'2026-11-11');
 assert.equal(reviewIsDue(old,new Date('2026-11-11T19:00:00Z')),true);
});
