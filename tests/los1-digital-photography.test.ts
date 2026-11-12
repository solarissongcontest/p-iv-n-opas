import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {createHash} from "node:crypto";
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
  assert.ok(photo.src.startsWith("/los/chapters/"));
  assert.ok(photo.mobileSrc.includes(String(photo.photoId)));
  assert.ok(photo.mobileSrc.startsWith("/los/chapters/"));
 }
});
test("LOS! 1 digital visuals remain integrated without a PDF reader",()=>{
 const book=readFileSync("src/features/los/LosBook.tsx","utf8");
 const image=readFileSync("src/features/los/Los1ChapterImage.tsx","utf8");
 assert.match(book,/Los1ChapterImage/);
 assert.match(book,/Los1VisualLearning/);
 assert.match(book,/chapterId=\{chapter\.id\}/);
 assert.doesNotMatch(book,/Los1FacsimilePilot|Los1PdfReader|facsimile-pdf|Näköiskirja/);
 assert.match(image,/loading="lazy"/);
 assert.match(image,/Kuvituskuva/);
 assert.match(image,/onError=\{\(\)=>setFailed\(true\)\}/);
 assert.equal(existsSync("src/features/los/facsimile/los1"),false);
 assert.equal(existsSync("scripts/los1-facsimile-export.mjs"),false);
});

test("all 20 self-hosted WebP assets exist and match the source provenance SHA-256 manifest",()=>{
 const manifest=JSON.parse(readFileSync("public/los/chapters/sources-manifest.json","utf8")) as {
   book:string;license:string;
   images:Array<{
     chapterId:string;photoId:number;originalPhotoPage:string;
     variants:Record<"desktop"|"mobile",{
       file:string;bytes:number;sha256:string;width:number;height:number;
     }>;
   }>;
 };
 assert.equal(manifest.book,"los-1");
 assert.equal(manifest.license,"https://www.pexels.com/license/");
 assert.equal(manifest.images.length,10);
 for(const image of manifest.images){
   const record=LOS1_CHAPTER_PHOTOS[image.chapterId];
   assert.ok(record);
   assert.equal(record.photoId,image.photoId);
   assert.equal(record.sourceUrl,image.originalPhotoPage);
   for(const variant of ["desktop","mobile"] as const){
     const asset=image.variants[variant];
     const target="public"+asset.file;
     assert.ok(existsSync(target),"Missing optimized "+variant+" photo: "+target);
     const bytes=readFileSync(target);
     assert.equal(bytes.length,asset.bytes);
     assert.equal(bytes.toString("ascii",0,4),"RIFF");
     assert.equal(bytes.toString("ascii",8,12),"WEBP");
     assert.equal(createHash("sha256").update(bytes).digest("hex"),asset.sha256);
     assert.ok(bytes.length>10000&&bytes.length<450*1024);
     assert.equal(asset.file,variant==="desktop"?record.src:record.mobileSrc);
     assert.deepEqual([asset.width,asset.height],
       variant==="desktop"?[1440,630]:[720,540]);
   }
 }
});
