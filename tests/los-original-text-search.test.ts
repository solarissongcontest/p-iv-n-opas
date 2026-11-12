import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
 LOS1_SEARCHABLE_SOURCE_LINES,LOS1_SEARCHED_TEXT_CHAPTERS,
 searchLos1OriginalTexts,validateLos1TextSearch,
} from "../src/features/los/content/los1TextSearch.ts";

test("all ten complete original Text A chapter sources are searchable inside the textbook",()=>{
 assert.deepEqual(validateLos1TextSearch(),[]);
 assert.deepEqual(LOS1_SEARCHED_TEXT_CHAPTERS,["01","02","03","04","05","06","07","08","09","10"]);
 assert.ok(LOS1_SEARCHABLE_SOURCE_LINES.length>80);
 assert.equal(new Set(LOS1_SEARCHABLE_SOURCE_LINES.map(x=>x.id)).size,LOS1_SEARCHABLE_SOURCE_LINES.length);
 for(const ch of LOS1_SEARCHED_TEXT_CHAPTERS){
  assert.ok(LOS1_SEARCHABLE_SOURCE_LINES.some(row=>row.chapterId===ch&&row.section==="text"),ch);
 }
});
test("real German wording and Finnish translations lead to the proper in-app source reader",()=>{
 const c01=searchLos1OriginalTexts("Hallo, wie heißt du?");
 assert.ok(c01.some(x=>x.chapterId==="01"&&x.section==="text"&&x.sourceId==="M-COM-01"));
 const c02b=searchLos1OriginalTexts("Ich komme aus Kyoto");
 assert.ok(c02b.some(x=>x.chapterId==="02"&&x.section==="text-b"&&x.sourceId==="M-COM-02"));
 const c08=searchLos1OriginalTexts("Was studierst du?");
 assert.ok(c08.some(x=>x.chapterId==="08"&&x.section==="text-b"));
 const fi=searchLos1OriginalTexts("mikä sinun nimesi on");
 assert.ok(fi.some(x=>x.chapterId==="01"||x.chapterId==="02"));
});
test("repeated sources retain chapter-specific Text B links without invented or unauthorized audio transcription",()=>{
 const source=LOS1_SEARCHABLE_SOURCE_LINES;
 const mcom=source.filter(x=>x.sourceId==="M-COM-02");
 assert.ok(mcom.some(x=>x.chapterId==="02"&&x.section==="text-b"));
 assert.ok(mcom.some(x=>x.chapterId==="03"&&x.section==="text-b"));
 assert.equal(source.some(x=>x.chapterId==="07"&&x.section==="text-b"),false,
  "C07 is an honest separate learner-authored alphabet aid, not exact original audio text");
 assert.equal(searchLos1OriginalTexts(""),[].length?1:0); 
 assert.equal(searchLos1OriginalTexts("Hallo",3).length<=3,true);
 assert.deepEqual(searchLos1OriginalTexts("Hallo",0),[]);
});
test("the actual book search can navigate original text matches without external links",()=>{
 const ui=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
 assert.match(ui,/searchLos1OriginalTexts\(q,55\)/);
 assert.match(ui,/kind:"Alkuperäisteksti"/);
 assert.match(ui,/section:line.section/);
 assert.match(ui,/move\(hit.chapter,hit.section\)/);
 assert.doesNotMatch(ui,/Varsinaiset lähdetekstit lisätään hakuun, kun ne on julkaistu/);
});
