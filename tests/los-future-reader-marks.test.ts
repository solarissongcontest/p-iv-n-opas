import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {
 losFutureReaderText,losFutureReaderMarkKey,losFutureReaderTextVersion,
 losFutureReaderWords,losFutureReaderAppend,losFutureReaderColor,
 losFutureReaderBeginUpdatedText,validLosFutureReaderMarks,
} from "../src/features/los/losFutureReaderMarks.ts";

test("70 chapters have stable distinct Text A, B, dialogue annotation namespaces",()=>{
  const seen=new Set<string>();
  let count=0;
  for(const book of LOS_BOOKS.filter(x=>x.id>=2))for(const chapter of book.chapters){
    for(const source of ["text-a","text-b","dialogue"] as const){
      const id=losFutureReaderMarkKey(book.id,chapter.id,source);
      assert.ok(!seen.has(id),id);seen.add(id);
      const text=losFutureReaderText(book.id,chapter.id,source);
      assert.ok(text.length>15,id);
      assert.match(losFutureReaderTextVersion(text),/^source-[0-9a-f]{8}-\d+$/);
      assert.ok(losFutureReaderWords(text).filter(x=>x.index!==null).length>1);
    }
    count++;
  }
  assert.equal(count,70);
  assert.equal(seen.size,210);
});
test("two-token highlight persists without misaligning after source revision",()=>{
  const id=losFutureReaderMarkKey(2,"01","text-a");
  const text=losFutureReaderText(2,"01","text-a");
  const raw=losFutureReaderAppend(undefined,text,0,1,"yellow");assert.ok(raw);
  assert.equal(losFutureReaderColor(raw,text,0),"yellow");
  assert.equal(losFutureReaderColor(raw,text,1),"yellow");
  assert.equal(losFutureReaderColor(raw,text,2),null);
  assert.equal(losFutureReaderColor(raw,text+" NEW WORDS",0),null);
  assert.equal(losFutureReaderAppend(raw,text+" NEW WORDS",0,1,"pink"),null);
  assert.ok(validLosFutureReaderMarks({[id]:raw},2,"01"));
  assert.equal(validLosFutureReaderMarks({[id]:raw},3,"01"),false);
  assert.equal(validLosFutureReaderMarks({[id]:JSON.stringify({...JSON.parse(raw),grade:10})},2,"01"),false);
  assert.equal(validLosFutureReaderMarks({[id]:JSON.stringify({contentVersion:"fake",ranges:[]})},2,"01"),false);
  assert.throws(()=>losFutureReaderMarkKey(1,"01","text-a"),/Invalid/);
});


test("revised texts retain earlier highlights in isolated backup-safe archives",()=>{
  const bookId=2,chapterId="01",source="text-a";
  const key=losFutureReaderMarkKey(bookId,chapterId,source);
  const text=losFutureReaderText(bookId,chapterId,source);
  const old=losFutureReaderAppend(undefined,text,0,2,"green");
  assert.ok(old);
  const revised=text+" Extra Satz.";
  const updated=losFutureReaderBeginUpdatedText({[key]:old},bookId,chapterId,source,revised);
  const historyKey=key+"@"+losFutureReaderTextVersion(text);
  assert.equal(updated[historyKey],old,"historical annotations are still exportable");
  assert.equal(losFutureReaderColor(updated[key],revised,0),null);
  const newMark=losFutureReaderAppend(updated[key],revised,1,2,"blue");
  assert.ok(newMark);
  updated[key]=newMark;
  assert.equal(updated[historyKey],old,"new highlight does not overwrite history");
  assert.ok(validLosFutureReaderMarks(updated,bookId,chapterId));
  assert.deepEqual(losFutureReaderBeginUpdatedText(updated,bookId,chapterId,source,revised)[historyKey],old);
  assert.equal(validLosFutureReaderMarks(updated,3,chapterId),false);
  assert.equal(validLosFutureReaderMarks({...updated,[key+"@fake"]:old},bookId,chapterId),false);
  assert.equal(validLosFutureReaderMarks({...updated,[key+"@"+losFutureReaderTextVersion(revised)]:old},bookId,chapterId),false);
  const canonical=losFutureReaderAppend(undefined,text,1,2,"blue");
  assert.ok(canonical);
  const altered=JSON.parse(canonical) as {contentVersion:string;ranges:{startToken:number;endToken:number;color:string}[]};
  altered.ranges[0]!.endToken=3000;
  assert.equal(validLosFutureReaderMarks({...updated,[key]:JSON.stringify(altered)},bookId,chapterId),false,
    "current source token ranges must remain inside the actual text");
});
