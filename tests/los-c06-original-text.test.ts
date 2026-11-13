import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_C06_TEXT,getLosOpenDialogue,LOS1_OPEN_DIALOGUES} from "../src/features/los/content/los1OpenDialogues.ts";
import {findLosSource,getLosChapterSourceGate,validateLosSourceRegistry} from "../src/features/los/content/sourceRegistry.ts";
import {LOS1_C06_REVIEW_SOURCE_ID,LOS1_C06_REVIEW_QUESTIONS} from "../src/features/los/content/los1C06Review.ts";
import {LOS1_C01_SOURCE_ID} from "../src/features/los/content/los1C01.ts";
import {losReaderMarkKey} from "../src/features/los/content/readerAnnotations.ts";

const originalText=[
  "Hi, wie alt bist du?","Ich bin neun.","Und wie heißt du?","Lucas.",
  "Hallo, ich bin Fabian. Und wie heißt du?","Ich bin Larissa.",
  "Bist du schon elf?","Ich bin schon zwölf Jahre alt.",
  "Wie alt seid ihr?","Wir sind 10.",
  "Wie alt ist er?","Paul? Er ist elf Jahre alt.",
] as const;

test("C06 includes the newest indexed four-dialogue transcript without shortening",()=>{
  const text=getLosOpenDialogue("06");
  assert.equal(text,LOS1_C06_TEXT);
  assert.equal(text?.chapterId,"06");
  assert.equal(text?.sourceId,"M-ZPE-01");
  assert.deepEqual(text?.originalLines.map(line=>line.text),originalText);
  assert.deepEqual(text?.originalLines.map(line=>line.speaker),
    ["Fabian","Lucas","Fabian","Lucas","Fabian","Larissa","Fabian","Larissa","Fabian","Tim und Mia","Fabian","Felix"]);
  assert.deepEqual(text?.originalLines.filter(line=>line.sectionTitle).map(line=>line.sectionTitle),
    ["Dialog 1","Dialog 2","Dialog 3","Dialog 4"]);
  assert.equal(new Set(text?.originalLines.map(line=>line.id)).size,12);
  assert.ok(text?.originalLines.every(line=>line.meaning.length>2));
  assert.equal(text?.evidenceLineId,"u08");
  assert.equal(text?.questions.length,4);
  for(const q of text?.questions??[]) {
    assert.ok(q.id.startsWith("C06-ZPE-Q"));
    assert.equal(q.answers.length,3);
    assert.ok(q.answers.some(a=>a.id===q.correctId));
    assert.ok(q.explanation.length>20);
  }
});

test("C06 original speaker text uses site-attributed CC BY-SA 3.0 rather than Wikibooks' 4.0",()=>{
  const source=findLosSource("M-ZPE-01");
  const text=getLosOpenDialogue("06");
  assert.ok(source);
  assert.ok(text);
  assert.equal(source.sourceUrl,"https://zpe.gov.pl/a/plik-audio/DIcQL1VxT");
  assert.equal(source.licenseCode,"CC BY-SA 3.0");
  assert.equal(text.licenseCode,"CC BY-SA 3.0");
  assert.equal(text.author,"Monika Janicka");
  assert.equal(source.licenseEvidenceUrl,source.sourceUrl);
  assert.equal(source.stage,"rights-verified");
  assert.equal(source.integrated,true);
  assert.equal(source.languageReviewed,false);
  assert.equal(source.mediaTested,false);
  assert.equal(source.deviceTested,false);
  assert.equal(source.published,false);
  assert.equal(getLosChapterSourceGate("06").ready,false);
  assert.equal(getLosChapterSourceGate("06").sourceId,source.id);
  assert.deepEqual(validateLosSourceRegistry(),[]);
});

test("source-specific attribution and separate subtitles preserve original reading and old annotations",()=>{
  const sourceUI=readFileSync("src/features/los/LosOpenSourcePages.tsx","utf8");
  const reader=readFileSync("src/features/los/LosOriginalDialogue.tsx","utf8");
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  assert.match(sourceUI,/author=\{text\.author \?\?/);
  assert.match(sourceUI,/license=\{text\.licenseCode \?\?/);
  assert.match(reader,/line\.sectionTitle/);
  assert.match(reader,/losReaderMarkKey\(chapterId,sourceId,line\.id\)/);
  assert.match(book,/LosOpenTextPage chapterId="06"/);
  assert.match(book,/LosOpenTextUnderstanding chapterId="06"/);
  assert.match(book,/LosC06AgeReview/);
  assert.match(book,/LosC06AgeUnderstanding/);
  assert.notEqual(losReaderMarkKey("06","M-ZPE-01","u01"),losReaderMarkKey("06","M-COM-01","u01"));
  assert.equal(LOS1_C06_REVIEW_SOURCE_ID,LOS1_C01_SOURCE_ID);
  assert.equal(LOS1_C06_REVIEW_QUESTIONS.length,4);
  assert.equal(LOS1_OPEN_DIALOGUES.length,5,"The older five Wikibooks texts stay untouched");
});
