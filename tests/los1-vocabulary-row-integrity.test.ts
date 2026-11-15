import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {summarizeLosVocabularyRows} from "../src/features/los/vocabularyRowSummary.ts";

test("LOS! 1 has 173 vocabulary rows, not 173 independent lemmas",()=>{
  const book=LOS_BOOKS.find(book=>book.id===1);
  assert.ok(book);
  assert.equal(book.chapters.length,10);
  const entries=book.chapters.flatMap(chapter=>
    chapter.vocabulary.map(item=>({word:item.split(" – ")[0]??""})));
  const summary=summarizeLosVocabularyRows(entries);
  assert.equal(summary.rowCount,173);
  assert.equal(summary.distinctWrittenEntries,168,
    "Count distinct exact spellings, not unique lemmas or productive words");
  assert.deepEqual(summary.repeatedWrittenEntries
    .map(item=>item.word).sort((a,b)=>a.localeCompare(b,"de")),[
    "Auf Wiedersehen!","Das ist …","Freut mich!","Guten Tag!","noch einmal",
  ].sort((a,b)=>a.localeCompare(b,"de")));
  assert.ok(summary.repeatedWrittenEntries.every(item=>item.occurrences===2));
  const both=book.chapters.flatMap(chapter=>chapter.vocabulary);
  assert.ok(both.some(row=>row.startsWith("Sie – Te")));
  assert.ok(both.some(row=>row.startsWith("sie – hän (nainen)")));
});

test("capitalized formal Sie and lowercase feminine sie are different spellings",()=>{
  const samples=[
    {word:"Sie"},{word:"sie"},{word:"Sie"},{word:"Bis später!"},
  ];
  const summary=summarizeLosVocabularyRows(samples);
  assert.equal(summary.rowCount,4);
  assert.equal(summary.distinctWrittenEntries,3);
  assert.deepEqual(summary.repeatedWrittenEntries,[{word:"Sie",occurrences:2}]);
  assert.equal(summarizeLosVocabularyRows([]).distinctWrittenEntries,0);
  assert.equal(summarizeLosVocabularyRows([{word:" Hallo! "},{word:"Hallo!"}]).distinctWrittenEntries,1);
});

test("local dictionary labels rows and written forms without calling them active vocabulary",()=>{
  const src=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(src,/summarizeLosVocabularyRows\(entries\)/);
  assert.match(src,/sanastoriviä/);
  assert.match(src,/eri kirjoitusasua/);
  assert.match(src,/ei ole eri kantasanojen, uusien aktiivisanojen/);
  assert.doesNotMatch(src,/kappalesanaston hakusanaa/);
});

test("Frau is a courtesy title, not a claim about marital status",()=>{
  const c02=LOS_BOOKS[0]!.chapters.find(chapter=>chapter.id==="02");
  assert.ok(c02);
  assert.ok(c02.vocabulary.some(row=>row.startsWith("die Frau – nainen; puhuttelussa")
    &&row.includes("ei ilmaise siviilisäätyä")));
  assert.equal(c02.vocabulary.length,16);
});
