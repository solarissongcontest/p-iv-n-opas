import {test} from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {readFileSync,existsSync} from "node:fs";
import {LOS1_CHAPTER_PHOTOS} from "../src/features/los/los1ChapterPhotos.ts";
import {LOS1_CULTURE_PHOTOS,validateLos1CulturePhotos}
  from "../src/features/los/los1CulturePhotos.ts";
import {LOS1_VISUAL_LESSONS,getLos1VisualPhrases}
  from "../src/features/los/los1VisualLearning.ts";

test("C01, C03 and C08 have four different source-attributed cultural photographs",()=>{
 assert.deepEqual(validateLos1CulturePhotos(),[]);
 assert.deepEqual(Object.keys(LOS1_CULTURE_PHOTOS).sort(),["01","03","08"]);
 assert.deepEqual(Object.values(LOS1_CULTURE_PHOTOS).map(x=>x.length),[1,2,1]);
 const heroIds=new Set(Object.values(LOS1_CHAPTER_PHOTOS).map(p=>p.photoId));
 for(const photo of Object.values(LOS1_CULTURE_PHOTOS).flat()){
   assert.equal(heroIds.has(photo.photoId),false,"Culture photo must differ from chapter hero");
   assert.equal(photo.licenseUrl,"https://www.pexels.com/license/");
   assert.ok(photo.photographer&&photo.alt&&photo.caption);
   assert.equal(photo.sourceUrl.endsWith("-"+photo.photoId+"/"),true);
 }
 assert.equal(LOS1_CULTURE_PHOTOS["08"][0].locationVerified,false);
 assert.match(LOS1_CULTURE_PHOTOS["08"][0].caption,/ei ole lähteessä paikannettu Saksaan/);
});
test("eight optimized WebP files exist and match provenance, sizes and hashes",()=>{
 const manifest=JSON.parse(readFileSync("public/los/culture/sources-manifest.json","utf8")) as {
  images:Array<{
   chapterId:string;photoId:number;photographer:string;sourcePageUrl:string;
   variants:Record<"desktop"|"mobile",{
     path:string;sha256:string;bytes:number;width:number;height:number;
   }>;
  }>;
 };
 assert.equal(manifest.images.length,4);
 for(const item of manifest.images){
  const photo=LOS1_CULTURE_PHOTOS[item.chapterId]?.find(x=>x.photoId===item.photoId);
  assert.ok(photo);
  assert.equal(item.sourcePageUrl,photo.sourceUrl);
  assert.equal(item.photographer,photo.photographer);
  for(const variant of ["desktop","mobile"] as const){
   const record=item.variants[variant];
   assert.ok(record);
   const filename="public"+record.path;
   assert.equal(existsSync(filename),true,"Missing "+filename);
   const bytes=readFileSync(filename);
   assert.equal(bytes.toString("ascii",0,4),"RIFF");
   assert.equal(bytes.toString("ascii",8,12),"WEBP");
   assert.equal(bytes.length,record.bytes);
   assert.equal(createHash("sha256").update(bytes).digest("hex"),record.sha256);
   assert.deepEqual([record.width,record.height],
      variant==="desktop"?[1024,640]:[720,540]);
   assert.ok(bytes.length>10000&&bytes.length<400*1024);
   assert.equal(record.path,variant==="desktop"?photo.desktopSrc:photo.mobileSrc);
  }
 }
});
test("DACH visual practice references Austrian and Swiss images, not re-used Berlin hero",()=>{
 const lesson=LOS1_VISUAL_LESSONS["03"];
 assert.equal(lesson.placement,"culture");
 assert.match(lesson.question,/Wienin ja Sveitsin kuvia/);
 assert.deepEqual([...lesson.phraseKeys],["Österreich","die Schweiz","die Stadt"]);
 assert.deepEqual(getLos1VisualPhrases("03").map(x=>x.de),
   ["Österreich","die Schweiz","die Stadt"]);
 const practice=readFileSync("src/features/los/Los1VisualLearning.tsx","utf8");
 assert.match(practice,/galleryReferenced/);
 assert.match(practice,/!galleryReferenced&&<Los1ChapterImage/);
 const cultures=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
 assert.match(cultures,/bookId===1&&<Los1CultureGallery/);
 const gallery=readFileSync("src/features/los/Los1CultureGallery.tsx","utf8");
 assert.match(gallery,/loading="lazy"/);
 assert.match(gallery,/Pexels/);
 assert.doesNotMatch(gallery,/setExerciseAnswer|markComplete|saveScore/);
});
