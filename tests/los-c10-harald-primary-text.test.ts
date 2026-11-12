import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_C10_TEXT, LOS1_OPEN_DIALOGUES, getLosOpenDialogue} from "../src/features/los/content/los1OpenDialogues.ts";
import {findLosSource,getLosChapterSourceGate,validateLosSourceRegistry} from "../src/features/los/content/sourceRegistry.ts";
import {losReaderMarkKey} from "../src/features/los/content/readerAnnotations.ts";
import {LOS1_EXECUTABLE_LESSONS,isLos1ExecutableLesson} from "../src/features/los/guidedLessons.ts";
import {validateLosCloudDraft} from "../src/features/los/cloudContract.ts";

const actual=[
  "Wie heißt du?",
  "Ich heiße Harald Becker.",
  "Woher kommst du?",
  "Ich komme ursprünglich aus München.",
  "Aha, wo ist München?",
  "München ist im zivilisierten Teil Deutschlands, also in Süddeutschland.",
  "Aha. Wie alt bist du?",
  "Ich bin jetzt so um die fünfzig.",
  "Um die fünfzig... Was ist deine Telefonnumer?",
  "Ah, das ist nicht so einfach. Neun, eins, zwei, eins, fünf, sechs, sechs.",
  "Hmh. Und was ist deine Lieblingsfarbe?",
  "Blau.",
  "Warum Blau?",
  "Ahmh, das ist eine gute Frage. Vielleicht wegen Bayern, das ist auch eine der Farben Bayerns. Wegen dem bayerischen Himmel. Der Himmel ist blau.",
] as const;

test("C10 includes complete distinct 14-turn COERLL human-spoken interview, not a composed dialogue",()=>{
  const text=getLosOpenDialogue("10");
  assert.equal(text,LOS1_C10_TEXT);
  assert.equal(text.sourceId,"M-DIB-02");
  assert.deepEqual(text.originalLines.map(x=>x.text),actual);
  assert.deepEqual(text.originalLines.map(x=>x.speaker),actual.map((_,i)=>i%2===0?"Haastattelija":"Harald"));
  assert.equal(new Set(text.originalLines.map(x=>x.id)).size,14);
  assert.ok(text.originalLines.every(x=>x.meaning.trim().length>2));
  assert.equal(text.questions.length,4);
  assert.ok(text.questions.every(q=>q.answers.length===3 && q.answers.some(x=>x.id===q.correctId)));
  assert.ok(text.originalLines.some(x=>x.id===text.evidenceLineId));
  assert.equal(text.evidenceLineId,"u08");
  assert.equal(text.author,"COERLL, The University of Texas at Austin (2017); Harald Becker (haastateltava)");
  assert.equal(text.licenseCode,"CC BY 4.0");
  assert.equal(text.licenseUrl,"https://creativecommons.org/licenses/by/4.0/");
  assert.equal(text.sourceUrl,"https://coerll.utexas.edu/dib/vidt.php?f=01_22_int_hb_who");
});

test("the source registry records rights evidence while keeping language, audio and device publication gates blocked",()=>{
  const source=findLosSource("M-DIB-02");
  assert.ok(source);
  assert.equal(source.stage,"rights-verified");
  assert.equal(source.licenseCode,"CC BY 4.0");
  assert.equal(source.licenseEvidenceUrl,"https://coerll.utexas.edu/dib/pdfs/intro.pdf");
  assert.equal(source.integrated,true);
  assert.equal(source.languageReviewed,false);
  assert.equal(source.deviceTested,false);
  assert.equal(source.mediaTested,false);
  assert.equal(source.published,false);
  assert.deepEqual(validateLosSourceRegistry(),[]);
  const gate=getLosChapterSourceGate("10");
  assert.equal(gate.sourceId,"M-DIB-02");
  assert.equal(gate.ready,false);
  assert.ok(gate.issues.some(x=>x.includes("kieli-")));
  assert.ok(gate.issues.some(x=>x.includes("mobiilissa")));
  assert.equal(getLosChapterSourceGate("08").sourceId,"M-WB-08");
  assert.equal(getLosChapterSourceGate("08").ready,false);
});

test("LOS text page and comprehension route preserve true source attribution and no fake listening",()=>{
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  const pages=readFileSync("src/features/los/LosOpenSourcePages.tsx","utf8");
  const index=readFileSync("src/features/los/LosReferenceTools.tsx","utf8");
  assert.match(book,/LosOpenTextPage chapterId="10"/);
  assert.match(book,/puheäänen toistoa/i);
  assert.match(book,/C10:n toimituksellinen tarkistus kesken/);
  assert.match(book,/getLosOpenDialogue\(chapter\.id\)/);
  assert.match(book,/LosOpenTextUnderstanding chapterId=\{chapter\.id\}/); // generic chapter routing
  assert.match(pages,/author=\{text\.author \?\?/);
  assert.match(pages,/license=\{text\.licenseCode \?\?/);
  assert.match(index,/C10:n Harald-haastattelu ovat nyt kirjan sisällä/);
  assert.equal(LOS1_EXECUTABLE_LESSONS.length,60,"Only evidence-backed reading lessons may be enabled");
  for(const id of ["L054","L055"])assert.equal(isLos1ExecutableLesson(id),true);
  assert.equal(LOS1_OPEN_DIALOGUES.length,5,"Existing five Wikibooks texts remain unchanged");
});

test("C10 original annotations and source exercises coexist with old C10 drafts and local backup",()=>{
  const d={version:1 as const,note:"säilytä",applicationDraft:"",bookmarked:true,
    practiceAnswers:{"C10-HARALD-Q01":"a"},practiceChecked:["C10-HARALD-Q01"],
    testAnswers:{"C10-EX-01":"b"},testSubmittedAt:null,selfAssessment:"",updatedAt:"2026-11-12T10:00:00.000Z"};
  assert.equal(validateLosCloudDraft(d),true);
  assert.notEqual(losReaderMarkKey("10","M-DIB-02","u01"),losReaderMarkKey("06","M-ZPE-01","u01"));
});
