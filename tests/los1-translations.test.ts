import assert from 'node:assert/strict';
import test from 'node:test';
import {chapters} from '../src/features/los/content.ts';
import {translationFi,lookupGloss} from '../src/features/los/translations.ts';

test('every imported original dialogue block has complete Finnish pedagogical translation',()=>{
 const published=chapters.filter(c=>c.status==='text-reviewed');
 assert.ok(published.length>=6);
 for(const c of published){
  assert.ok(c.blocks.length>0);
  for(const b of c.blocks)assert.ok(translationFi[b.id]?.trim().length>=4,'Missing Finnish translation '+b.id);
 }
});
test('word lookup avoids partial-phrase wrong matches and preserves ß',()=>{
 assert.equal(lookupGloss('heißt')?.lemma,'heißen');
 assert.equal(lookupGloss('Tschüss!')?.fi,'hei hei!');
 assert.equal(lookupGloss('Wiedersehen!')?.fi,'uudelleen näkeminen; näkemiin (fraasissa)');
 assert.equal(lookupGloss('heisse'),null);
});
