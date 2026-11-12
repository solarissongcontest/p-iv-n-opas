import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_CULTURE,LOS1_CULTURE_CHAPTERS,LOS1_CULTURE_QUESTION_COUNT,validateLosCulture} from "../src/features/los/content/los1Culture.ts";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {validateLosCloudDraft} from "../src/features/los/cloudContract.ts";

test("C01-C10 culture material has three fully answered source-grounded check questions each",()=>{
 assert.deepEqual(validateLosCulture(),[]);
 assert.deepEqual(LOS1_CULTURE_CHAPTERS,["01","02","03","04","05","06","07","08","09","10"]);
 assert.equal(LOS1_CULTURE_QUESTION_COUNT,30);
 const book=LOS_BOOKS.find(book=>book.id===1);
 assert.ok(book);
 assert.equal(book.chapters.length,10);
 const ids=new Set<string>();
 for(const chapter of book.chapters){
  const resource=LOS1_CULTURE[chapter.id as keyof typeof LOS1_CULTURE];
  assert.ok(resource,chapter.id);
  assert.ok(resource.note.length>=80,chapter.id);
  assert.ok(resource.sourceUrl.startsWith("https://"),chapter.id);
  assert.ok(resource.sourceTitle.length>10,chapter.id);
  assert.equal(resource.questions.length,3,chapter.id);
  for(const q of resource.questions){
   assert.match(q.id,new RegExp("^C"+chapter.id+"-CULT-Q0[1-3]$"));
   assert.ok(q.prompt.length>18,q.id);
   assert.ok(q.explanation.length>20,q.id);
   assert.equal(q.options.length,3,q.id);
   assert.ok(q.options.some(x=>x.id===q.correctId),q.id);
   assert.ok(!ids.has(q.id),q.id);
   ids.add(q.id);
  }
 }
 assert.equal(ids.size,30);
});
test("C03 DACH, C04 du/Sie, C08 German federal education and C09 time exercises remain appropriate for beginners",()=>{
 assert.match(LOS1_CULTURE["03"].sourceUrl,/make-it-in-germany\.com/);
 assert.match(LOS1_CULTURE["03"].note,/Liechtenstein/);
 assert.match(LOS1_CULTURE["04"].sourceUrl,/duden\.de/);
 assert.match(LOS1_CULTURE["04"].note,/duzen/);
 assert.match(LOS1_CULTURE["08"].sourceUrl,/kmk\.org/);
 assert.match(LOS1_CULTURE["08"].note,/16 osavaltiota/);
 assert.match(LOS1_CULTURE["09"].note,/um drei Uhr/);
 assert.match(LOS1_CULTURE["07"].note,/teknisiä korvausasuja/);
});
test("culture pages display the missing C02 narrative, original cultural comparison artwork, visible citations and real saved answers",()=>{
 const ui=readFileSync("src/features/los/LosCultureChecks.tsx","utf8");
 const sections=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
 const style=readFileSync("src/features/los/los-culture-questions.css","utf8");
 assert.match(sections,/chapter.id==="02"\?<\>/);
 assert.match(sections,/Herr Weiß · Frau Müller/);
 assert.match(sections,/LosCultureChecks chapterId=\{chapter.id\}/);
 assert.match(ui,/source.sourceUrl/);
 assert.match(ui,/practiceChecked:Array\.from/);
 assert.match(ui,/practiceAnswers:\{\.\.\.current.practiceAnswers/);
 assert.match(ui,/svg viewBox="0 0 660 115"/);
 assert.match(style,/@media\(max-width:560px\)/);
 assert.doesNotMatch(sections,/Oikeuksiltaan hyväksytty karttakuva lisätään myöhemmin/);
 assert.doesNotMatch(sections,/Kuvat ja lähteet<\/strong><p>Tämän sivun kuvallinen oppimateriaali/);
 const record={version:1,note:"Oma opiskelumuistio",applicationDraft:"",bookmarked:false,
  practiceAnswers:{"C02-CULT-Q01":"b"},practiceChecked:["C02-CULT-Q01"],
  testAnswers:{},testSubmittedAt:null,selfAssessment:"",updatedAt:"2026-11-12T11:00:00.000Z"};
 assert.equal(validateLosCloudDraft(record),true);
});
