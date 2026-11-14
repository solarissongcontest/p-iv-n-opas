import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {losFutureRecallCardsFor} from "../src/features/los/losFutureRecallCards.ts";
import {losRecallIsDue,losRecallReview,validLosRecallCardMap} from "../src/features/los/recallEngine.ts";

test("all 70 later-book vocabulary decks reuse the same two-direction recall engine as LOS! 1",()=>{
  let count=0;
  for(const book of LOS_BOOKS.filter(x=>x.id>=2))for(const chapter of book.chapters){
    const source=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];assert.ok(source);
    const cards=losFutureRecallCardsFor(book.id,chapter.id);
    const uniqueGerman=new Set(source.vocabulary.filter(w=>w.de.trim()&&w.fi.trim())
      .map(w=>w.de.trim().normalize("NFC").replace(/\s+/g," ").toLocaleLowerCase("de").slice(0,78)));
    assert.equal(cards.length,uniqueGerman.size*2,book.id+" "+chapter.id);
    assert.equal(new Set(cards.map(x=>x.id)).size,cards.length);
    assert.deepEqual(new Set(cards.map(x=>x.direction)),new Set(["de-fi","fi-de"]));
    assert.ok(cards.every(x=>x.chapterId===chapter.id&&x.german&&x.finnish));
    assert.ok(cards.every(x=>source.vocabulary.some(v=>v.de===x.german&&v.fi===x.finnish)));
    assert.equal(cards.filter(x=>x.direction==="de-fi").length,uniqueGerman.size);
    count++;
  }
  assert.equal(count,70);
  assert.deepEqual(losFutureRecallCardsFor(1,"01"),[]);
  assert.deepEqual(losFutureRecallCardsFor(3,"99"),[]);
});
test("due date and direction stay self-reported, not a mastery certificate",()=>{
  const cards=losFutureRecallCardsFor(2,"01");assert.ok(cards.length>2);
  const date="2026-11-14T14:00:00.000Z";
  const rated=losRecallReview(undefined,"remembered",date);
  assert.equal(rated.level,1);
  assert.equal(losRecallIsDue(rated,date),false);
  assert.equal(losRecallIsDue(rated,"2026-11-16T14:00:00.000Z"),true);
  assert.ok(validLosRecallCardMap({[cards[0]!.id]:rated}));
  assert.equal(cards[0]!.id===cards[1]!.id,false);
  assert.equal(losRecallReview(rated,"again",date).level,0);
});
