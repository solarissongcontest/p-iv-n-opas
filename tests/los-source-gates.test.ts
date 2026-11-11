import assert from "node:assert/strict";
import test from "node:test";
import {LOS_BOOKS} from "../src/features/los/books.ts";
import {validateBook} from "../src/features/los/model.ts";

const book=LOS_BOOKS[0];
if(!book)throw Error("LOS! 1 not found");
const primary=book.blocks.filter(block=>
  block.kind==="authenticText" || block.kind==="dialogue" || block.kind==="transcript");
const multimedia=book.blocks.filter(block=>block.kind==="media");

test("All visible original texts and recordings have resolved source entries and aren't unapproved",()=>{
 assert.deepEqual(validateBook(book),[]);
 assert.ok(primary.length>=20,"The reader must contain substantive full original material");
 assert.ok(multimedia.length>=8,"Existing original course audio must remain available");
 for(const block of primary){
  if(!("sourceId" in block))throw Error("Source ID omitted");
  assert.ok(block.sourceId,"Unattributed primary text "+block.id);
  const source=book.sources.find(x=>x.id===block.sourceId);
  assert.ok(source,"Missing source "+block.sourceId);
  assert.notEqual(source.permittedMode,"pending","Uncleared source "+block.id);
  assert.ok(source.licenseOrBasis.trim().length>4,"Missing license/basis "+source.id);
  assert.ok(source.verifiedAt,"Missing source verification date "+source.id);
 }
 for(const block of multimedia){
  if(block.kind!=="media")throw Error("Unreachable");
  const source=book.sources.find(x=>x.id===block.sourceId);
  assert.ok(source);
  assert.notEqual(source.permittedMode,"pending","Uncleared recording "+block.id);
 }
});
test("Source honesty gate rejects modified preview material that would silently publish pending sources",()=>{
 const wip=structuredClone(book);
 const pending=wip.sources.find(x=>x.permittedMode==="pending");
 assert.ok(pending,"Need a real blocked reference to test this safety gate");
 const original=wip.blocks.find(x=>x.kind==="dialogue"&&x.sourceId==="M-COM-01");
 assert.ok(original&&original.kind==="dialogue");
 original.sourceId=pending.id;
 assert.match(validateBook(wip).join("\n"),/Uncleared original text/);
 const altered=structuredClone(book);
 const media=altered.blocks.find(x=>x.kind==="media"&&x.sourceId==="M-COM-01");
 const target=altered.sources.find(x=>x.permittedMode==="pending");
 assert.ok(media&&media.kind==="media"&&target);
 media.sourceId=target.id;
 assert.match(validateBook(altered).join("\n"),/Uncleared visible media/);
});
test("An unattributed full original cannot be disguised as published source content",()=>{
 const invalid=structuredClone(book);
 const original=invalid.blocks.find(x=>x.kind==="authenticText"&&x.sourceId);
 assert.ok(original&&original.kind==="authenticText");
 delete original.sourceId;
 assert.match(validateBook(invalid).join("\n"),/Unattributed original text/);
});
test("The visibly reused sources are separately identified; no fake Harald video is in the reader",()=>{
 const sourceIds=new Set(book.sources.map(s=>s.id));
 for(const id of ["M-WB-03","M-WB-04","M-WB-07","M-WB-08","M-DIB-01","M-DIB-02","M-COM-01"]){
  assert.ok(sourceIds.has(id),"Missing source "+id);
 }
 for(const id of ["M-WB-03","M-WB-08"]){
  const source=book.sources.find(s=>s.id===id);
  assert.equal(source?.permittedMode,"hosted");
  assert.equal(source?.licenseUrl,"https://creativecommons.org/licenses/by-sa/4.0/");
  assert.ok(source?.originalUrl?.includes("oldid="));
 }
 assert.ok(!book.blocks.some(b=>b.kind==="media"&&b.sourceId==="M-DIB-02"));
 assert.ok(book.blocks.some(b=>b.kind==="dialogue"&&b.sourceId==="M-DIB-02"));
});
