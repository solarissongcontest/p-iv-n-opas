import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_TEXT_B_SOURCES,isLosTextBChapter,validateLosTextB} from "../src/features/los/content/los1TextBAdditional.ts";
import {LOS1_C01_LINES} from "../src/features/los/content/los1C01.ts";
import {LOS1_M_COM_02_LINES} from "../src/features/los/content/los1MCom02.ts";
import {findLosSource,validateLosSourceRegistry} from "../src/features/los/content/sourceRegistry.ts";
import {validateLosCloudDraft} from "../src/features/los/cloudContract.ts";

test("six added Text B pages use actual full published German source artifacts and 4 unique tasks each",()=>{
 assert.deepEqual(validateLosTextB(),[]);
 assert.deepEqual(Object.keys(LOS1_TEXT_B_SOURCES).sort(),["04","05","06","07","09","10"]);
 assert.equal(isLosTextBChapter("04"),true);
 assert.equal(isLosTextBChapter("07"),true);
 assert.equal(isLosTextBChapter("09"),true);
 for(const [id,source]of Object.entries(LOS1_TEXT_B_SOURCES)){
  assert.equal(source.questions.length,4,id);
  assert.ok(source.questions.every(q=>q.id.startsWith("C"+id+"-TEXTB-Q")&&q.explanation.length>10));
  assert.equal(new Set(source.questions.map(q=>q.id)).size,4);
  assert.ok(source.attribution.url.startsWith("https://commons.wikimedia.org/wiki/File:"));
  assert.ok(source.attribution.author.length>3);
  assert.ok(source.attribution.license.length>3);
  assert.ok(source.sourceId.startsWith("M-COM-"));
 }
 assert.equal(LOS1_TEXT_B_SOURCES["04"].lines.length,20);
 assert.deepEqual(LOS1_TEXT_B_SOURCES["04"].lines.map(l=>l.text),[
  "Hallo!","Servus!","Moin!","Moin Moin!","Guten Morgen!","Morgen!",
  "Guten Tag!","Tag!","Guten Abend!","Grüß Gott!","Auf Wiedersehen!",
  "Wiedersehen!","Tschüss!","Tschau!","Servus!","Bis später!",
  "Bis dann!","Bis bald!","Bis gleich!","Gute Nacht!",
 ]);
 assert.deepEqual(LOS1_TEXT_B_SOURCES["06"].lines,LOS1_C01_LINES);
 assert.equal(LOS1_TEXT_B_SOURCES["05"].lines.length,6);
 assert.equal(LOS1_TEXT_B_SOURCES["05"].attribution.license,"Public domain");
 assert.deepEqual(LOS1_TEXT_B_SOURCES["10"].lines,LOS1_M_COM_02_LINES);
 assert.equal(LOS1_TEXT_B_SOURCES["07"].transcriptIsExact,false,
  "The alphabet aid must not be mislabeled as the recorder's transcript");
 assert.equal(LOS1_TEXT_B_SOURCES["07"].lines.length,0);
 assert.equal(LOS1_TEXT_B_SOURCES["09"].lines.length,1);
 assert.equal(LOS1_TEXT_B_SOURCES["09"].lines[0]?.text,"Tage: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.");
});
test("all audio resources have checked rights but retain unverified hardware and language gates",()=>{
 for(const chapter of ["04","05","06","07","09","10"] as const){
  const packet=LOS1_TEXT_B_SOURCES[chapter];
  const source=findLosSource(packet.sourceId);
  assert.ok(source);
  assert.equal(source.sourceUrl,packet.attribution.url);
  assert.equal(source.stage,"rights-verified");
  assert.equal(source.integrated,true);
  assert.equal(source.mediaTested,false);
  assert.equal(source.deviceTested,false);
  assert.equal(source.published,false);
  assert.equal(source.licenseEvidenceUrl,packet.attribution.url);
 }
 assert.equal(findLosSource("M-COM-06")?.licenseCode,"CC BY-SA 3.0");
 assert.equal(findLosSource("M-COM-07")?.licenseCode,"CC BY-SA 3.0");
 assert.deepEqual(validateLosSourceRegistry(),[]);
});
test("secondary pages render full text, actual audio player, four answer checks and explain source reuse",()=>{
 const ui=readFileSync("src/features/los/LosAdditionalTextB.tsx","utf8");
 const nav=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
 const audio=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
 assert.match(nav,/\["04","05","06","07","09","10"\]\.includes\(chapter.id\)/);
 assert.match(ui,/LosOriginalDialogue/);
 assert.match(ui,/usageLabel="ORIGINALTEXT · TEXT B"/);
 assert.match(ui,/LosAuthenticAudio chapterId=\{chapterId\} source="B"/);
 assert.match(ui,/practiceChecked:Array\.from/);
 assert.match(ui,/Lähdelinkki on attribuutio/);
 assert.match(ui,/ei.*sanatarkka transkriptio/);
 assert.match(audio,/chapterId==="07"/);
 assert.match(audio,/id:"M-COM-06"/);
 assert.match(audio,/chapterId==="04"/);
 assert.match(audio,/chapterId==="10"/);
 assert.match(audio,/chapterId==="09"/);
 assert.match(audio,/id:"M-COM-08"/);
 assert.equal(findLosSource("M-COM-08")?.licenseCode,"public-domain");
 const draft={version:1,bookmarked:false,note:"",applicationDraft:"",selfAssessment:"",
  practiceAnswers:{"C07-TEXTB-Q01":"b"},practiceChecked:["C07-TEXTB-Q01"],
  testAnswers:{},testSubmittedAt:null,updatedAt:"2026-11-12T10:00:00.000Z"};
 assert.equal(validateLosCloudDraft(draft),true);
});
