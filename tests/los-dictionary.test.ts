import assert from "node:assert/strict";
import test from "node:test";
import {readFileSync} from "node:fs";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {buildLosDictionary,normalizedSearchText,searchLosDictionary} from "../src/features/los/dictionary.ts";

const entries=buildLosDictionary(LOS_BOOKS);
test("Bilingual dictionary is generated from REAL existing in-book vocabulary, not invented word pairs",()=>{
 const input=LOS_BOOKS.flatMap(book=>book.blocks.filter(b=>b.kind==="vocabulary")
  .flatMap(b=>b.entries.map(e=>({de:e.de,fi:e.fi}))));
 assert.ok(input.length>100,"The completed LOS! 1 should have substantial vocabulary");
 assert.ok(entries.length>100);
 assert.ok(entries.length<=input.length);
 assert.ok(entries.every(x=>x.de.trim().length>0&&x.fi.trim().length>0));
 assert.ok(entries.every(x=>x.locations.length>0));
 assert.equal(new Set(entries.map(x=>x.de.toLocaleLowerCase("de-DE")+"\u0000"+
  x.fi.toLocaleLowerCase("fi-FI"))).size,entries.length);
 const sources=new Set(input.map(e=>e.de+"\u0000"+e.fi));
 for(const entry of entries)assert.ok(sources.has(entry.de+"\u0000"+entry.fi),entry.de);
 assert.ok(!entries.some(x=>/hallucinat|machine-translation/i.test(x.id)));
});
test("German-to-Finnish lookup ranks exact match above prefix, word start and partial matches",()=>{
 const source=searchLosDictionary(entries,"Montag","de-fi",100);
 assert.ok(source.total>=1);
 assert.equal(source.results[0]?.rank,0);
 assert.equal(source.results[0]?.entry.de,"Montag");
 assert.match(source.results[0]?.entry.fi??" ",/maanantai/i);
 assert.ok(source.results[0]?.entry.locations.some(x=>x.bookNumber===1&&x.chapterId==="C09"));
 const start=searchLosDictionary(entries,"mon","de-fi");
 assert.ok(start.results.some(x=>x.entry.de==="Montag"));
 const inner=searchLosDictionary(entries,"tag","de-fi");
 assert.ok(inner.results.some(x=>x.entry.de==="Montag"));
});
test("Finnish-to-German reverse lookup uses authored Finnish glosses",()=>{
 const source=searchLosDictionary(entries,"maanantai","fi-de");
 assert.ok(source.total>=1);
 assert.equal(source.results[0]?.entry.fi,"maanantai");
 assert.equal(source.results[0]?.entry.de,"Montag");
 assert.ok(searchLosDictionary(entries,"sana","fi-de").results.some(x=>x.entry.de==="das Wort"));
 const noMatch=searchLosDictionary(entries,"definitely-not-in-the-textbook-711982","fi-de");
 assert.equal(noMatch.total,0);
 assert.deepEqual(noMatch.results,[]);
});
test("Beginner typing tolerates German umlauts, eszett, case and whitespace",()=>{
 assert.equal(normalizedSearchText("  SCHÖN  "),"schon");
 assert.equal(normalizedSearchText(" Straße "),"strasse");
 assert.equal(normalizedSearchText("HeIßE"),"heisse");
 assert.equal(normalizedSearchText("  Guten   Morgen  "),"guten morgen");
 const a=searchLosDictionary(entries,"schon","de-fi");
 assert.ok(a.results.some(x=>x.entry.de.toLocaleLowerCase("de-DE")==="schön"));
 const b=searchLosDictionary(entries,"verstehe","de-fi");
 assert.ok(b.results.some(x=>x.entry.de==="Ich verstehe nicht."));
});
test("Results are bounded and stable for initial empty query, not unbounded 1000s of cards",()=>{
 const empty=searchLosDictionary(entries,"","de-fi");
 assert.equal(empty.total,entries.length);
 assert.ok(empty.results.length<=48);
 assert.deepEqual(searchLosDictionary(entries,"","de-fi").results,empty.results);
 assert.ok(searchLosDictionary(entries,"","de-fi",10).results.length<=10);
 assert.ok(searchLosDictionary(entries,"","de-fi",1000).results.length<=100);
});
test("Every visible vocabulary result links to a valid in-book chapter source, with real chapter metadata",()=>{
 for(const entry of entries){
  for(const location of entry.locations){
   const book=LOS_BOOKS.find(x=>x.id===location.bookId);
   assert.ok(book,location.bookId);
   assert.equal(book.number,location.bookNumber);
   if(location.chapterId){
    const chapter=book.chapters.find(x=>x.id===location.chapterId);
    assert.ok(chapter,location.chapterId);
    assert.equal(chapter.title,location.chapterTitle);
   }
  }
 }
});
test("The formerly empty global dictionary page now renders interactive search and a restrained scope statement",()=>{
 const ui=readFileSync("src/features/los/LosDictionaryPage.tsx","utf8");
 const route=readFileSync("src/features/los/LosApp.tsx","utf8");
 const style=readFileSync("src/styles/los.css","utf8");
 assert.match(ui,/type="search"/);
 assert.match(ui,/buildLosDictionary\(LOS_BOOKS\)/);
 assert.match(ui,/searchLosDictionary\(scoped,query,direction,60\)/);
 assert.match(ui,/Saksa → suomi/);
 assert.match(ui,/Suomi → saksa/);
 assert.match(ui,/href=\{location\.chapterId\?/);
 assert.match(ui,/ei täydellinen saksan yleissanakirja/);
 assert.match(route,/function GlobalDictionary\(\) \{ return <LosDictionaryPage\/>; \}/);
 assert.match(style,/\.los-dictionary-search-input:focus-within/);
});
