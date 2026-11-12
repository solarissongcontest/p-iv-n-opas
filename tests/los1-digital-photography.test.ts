import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS1_CHAPTER_PHOTOS,validateLos1ChapterPhotos}
  from "../src/features/los/los1ChapterPhotos.ts";

test("every canonical LOS! 1 chapter has an individually sourced digital photo",()=>{
 assert.deepEqual(validateLos1ChapterPhotos(),[]);
 const book=LOS_BOOKS.find(b=>b.id===1);
 assert.ok(book);
 assert.deepEqual(Object.keys(LOS1_CHAPTER_PHOTOS).sort(),book.chapters.map(ch=>ch.id).sort());
 for(const photo of Object.values(LOS1_CHAPTER_PHOTOS)){
  assert.equal(photo.source,"Pexels");
  assert.equal(photo.licenseUrl,"https://www.pexels.com/license/");
  assert.ok(photo.photographer.trim());
  assert.ok(photo.alt.length>15);
  assert.ok(photo.sourceUrl.includes(String(photo.photoId)));
  assert.ok(photo.src.includes(String(photo.photoId)));
 }
});
test("LOS! 1 user experience is digital-only without the abandoned print reader",()=>{
 const book=readFileSync("src/features/los/LosBook.tsx","utf8");
 const image=readFileSync("src/features/los/Los1ChapterImage.tsx","utf8");
 assert.match(book,/Los1ChapterImage/);
 assert.match(book,/chapter\.id===/);
 assert.doesNotMatch(book,/facsimile|Näköiskirja|PdfReader/);
 assert.match(image,/loading="lazy"/);
 assert.match(image,/Kuvituskuva/);
 assert.match(image,/onError=\{\(\)=>setFailed\(true\)\}/);
 assert.equal(existsSync("src/features/los/facsimile/los1"),false);
 assert.equal(existsSync("scripts/los1-facsimile-export.mjs"),false);
});
