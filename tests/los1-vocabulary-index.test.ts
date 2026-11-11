import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters,allWords,LOS_VERSION} from '../src/features/los/content.ts';
import {vocabularyCandidates,vocabularyReviewSummary,vocabularySearch,normalizeGermanEntry} from '../src/features/los/vocabularyCandidates.ts';

test('German dictionary candidates merge duplicate spellings without deleting variant Finnish meanings',()=>{
 const expected=new Set(allWords.map(w=>normalizeGermanEntry(w.de)));
 assert.equal(vocabularyCandidates.length,expected.size);
 assert.equal(new Set(vocabularyCandidates.map(x=>x.entryId)).size,vocabularyCandidates.length);
 assert.ok(vocabularyCandidates.length>100);
 assert.ok(vocabularyCandidates.every(x=>x.meaningFi.length>0));
 assert.ok(vocabularyCandidates.every(x=>x.chapters.length>=1));
 assert.ok(vocabularyCandidates.every(x=>x.introducedChapterId===x.chapters[0]));
});
test('dictionary candidate fields keep the full required editorial schema and no invented German review',()=>{
 for(const w of vocabularyCandidates){
  assert.equal(w.bookId,'LOS1');
  assert.equal(w.contentVersion,LOS_VERSION);
  assert.ok(w.entryId.startsWith('LOS1:'));
  assert.ok(w.lemma.trim());
  assert.ok(w.displayForm.trim());
  assert.equal(w.reviewedBy,null);
  assert.equal(w.meaningScope,'chapter-vocabulary');
  assert.ok(w.reviewCardIds.length>=1);
  assert.ok(w.skillTags.includes(w.introducedChapterId));
  assert.ok(['active','recognition','support'].includes(w.importance));
  if(w.exampleBlockId){
   const c=chapters.find(x=>x.sourceId===w.exampleSourceId);
   assert.ok(c,'source must be a real chapter');
   assert.ok(c!.blocks.some(block=>block.id===w.exampleBlockId),'source block must exist');
   assert.equal(w.sourceAttributionId,w.exampleSourceId);
  }else{
   assert.equal(w.exampleSourceId,null);
   assert.equal(w.sourceAttributionId,null);
  }
  if(w.pronunciationAudioId){
   assert.ok(chapters.some(c=>c.media?.sourceId===w.pronunciationAudioId));
  }
 }
});
test('article and gender are inferred only when article appears explicitly in source vocabulary',()=>{
 const derName=vocabularyCandidates.find(x=>x.displayForm==='der Name');
 assert.ok(derName);
 assert.equal(derName.partOfSpeech,'noun');
 assert.equal(derName.gender,'m');
 assert.equal(derName.lemma,'Name');
 assert.equal(derName.plural,null,'no invented plurals');
 const dieFrau=vocabularyCandidates.find(x=>x.displayForm==='die Frau');
 assert.ok(dieFrau);
 assert.equal(dieFrau.gender,'f');
 const hallo=vocabularyCandidates.find(x=>x.displayForm==='Hallo!');
 assert.ok(hallo);
 assert.equal(hallo.gender,null);
});
test('dictionary search finds source-defined German and Finnish words without web lookups',()=>{
 assert.ok(vocabularySearch('Name').some(w=>w.displayForm==='der Name'));
 assert.ok(vocabularySearch('nainen').length>0);
 assert.ok(vocabularySearch('ich heiße').length>0);
 assert.deepEqual(vocabularySearch('TÄYSIN_TUNTEMATON'),[]);
 assert.ok(vocabularySearch('',3).length<=3);
});
test('candidate index cannot accidentally certify a final 160–190 word reviewed dictionary',()=>{
 const summary=vocabularyReviewSummary();
 assert.equal(summary.total,vocabularyCandidates.length);
 assert.equal(summary.reviewed,0);
 assert.ok(summary.activeCandidates>0);
 assert.ok(summary.activeCandidates<=summary.total);
 assert.ok(summary.missingSourceExample>=0);
});
