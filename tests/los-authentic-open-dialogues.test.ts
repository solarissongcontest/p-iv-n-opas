import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOS1_OPEN_DIALOGUES, getLosOpenDialogue } from "../src/features/los/content/los1OpenDialogues.ts";
import { findLosSource, getLosChapterSourceGate } from "../src/features/los/content/sourceRegistry.ts";
import { losReaderMarkKey } from "../src/features/los/content/readerAnnotations.ts";

const original:Record<string,readonly string[]> = {
  "03":[
    "Guten Tag! Ich suche Lisa Müller. Sind Sie Lisa Müller?",
    "Ja, und Sie? Wie heißen Sie?",
    "Ich heiße Lutz Schmidt.",
    "Ich heiße Christine Schmidt.",
    "Angenehm.",
    "Wo wohnen Sie?",
    "Woher kommen Sie? Kommen Sie aus Österreich?",
    "Nein, ich komme aus Deutschland und ich wohne hier in Bern.",
  ],
  "04":[
    "Guten Morgen, Herr Standish! Wie geht es Ihnen?",
    "Danke sehr, es geht mir gut. Und Ihnen?",
    "Nicht so gut. Ich bin müde.",
    "Wie bitte? Müde? Warum?",
    "Ich habe so viel Arbeit.",
    "Das kann ich verstehen. Zu viel ist zu viel.",
    "Das ist richtig. Auf Wiedersehen, Herr Standish!",
    "Auf Wiedersehen, bis morgen.",
  ],
  "05":[
    "Guten Tag, Karl. Wie geht es dir?",
    "Guten Tag. Danke, mir geht es gut. Und dir?",
    "Danke, mir geht es gut. Auf Wiedersehen.",
    "Auf Wiedersehen!",
  ],
  "07":[
    "Auskunft, guten Tag.",
    "Guten Tag. Ich hätte gerne die Telefonnummer von Frau Claudia Bolliger aus Bern.",
    "Wie schreibt man das? Bitte buchstabieren Sie.",
    "Natürlich. Claudia: C wie Cäsar, L wie Ludwig, A wie Anton, U wie Ursula, D wie Dora, I wie Ida, A wie Anton. Bolliger: B wie Berta, O wie Otto, zweimal L wie Ludwig, I wie Ida, G wie Gustav, E wie Emil und R wie Richard.",
    "Danke. Die Nummer lautet ...",
  ],
  "09":[
    "Hallo, Greta! Wie spät ist es?",
    "Es ist Viertel vor drei.",
    "Wirklich? Ich spiele um drei Fußball. Machst du Sport, Greta?",
    "Nein, ich bin faul. Ich gehe jetzt nach Hause.",
    "Fußball macht aber Spaß!",
    "Bis dann.",
    "Wiedersehen!",
  ],
};
test("C03, C04, C05, C07 and C09 contain five distinct published, whole original dialogues",()=>{
  assert.equal(LOS1_OPEN_DIALOGUES.length,5);
  assert.deepEqual(LOS1_OPEN_DIALOGUES.map(x=>x.chapterId),["03","04","05","07","09"]);
  assert.deepEqual(LOS1_OPEN_DIALOGUES.map(x=>x.originalLines.length),[8,8,4,5,7]);
  assert.equal(new Set(LOS1_OPEN_DIALOGUES.map(x=>x.sourceId)).size,5);
  for(const text of LOS1_OPEN_DIALOGUES){
    assert.deepEqual(text.originalLines.map(line=>line.text),original[text.chapterId]);
    assert.ok(text.originalLines.every(line=>line.meaning.trim().length>1));
    assert.ok(text.sourceUrl.startsWith("https://en.wikibooks.org/w/index.php?"));
    assert.equal(new Set(text.originalLines.map(line=>line.id)).size,text.originalLines.length);
    assert.ok(text.guidance.length>=70);
  }
});
test("source-based comprehension is finite, keyed to actual text and isolated from other chapter drafts",()=>{
  const allIds=new Set<string>();
  const markKeys=new Set<string>();
  for(const text of LOS1_OPEN_DIALOGUES){
    assert.equal(getLosOpenDialogue(text.chapterId),text);
    assert.equal(text.questions.length,4);
    assert.ok(text.originalLines.some(line=>line.id===text.evidenceLineId));
    assert.ok(text.evidenceQuestion.length>10);
    assert.ok(text.evidenceExplanation.length>15);
    for(const q of text.questions){
      assert.ok(q.id.startsWith("C"+text.chapterId+"-SOURCE-Q"));
      assert.ok(!allIds.has(q.id)); allIds.add(q.id);
      assert.ok(q.answers.some(a=>a.id===q.correctId));
      assert.ok(q.explanation.length>12);
    }
    const mark=losReaderMarkKey(text.chapterId,text.sourceId,"u01");
    assert.ok(!markKeys.has(mark));markKeys.add(mark);
  }
});
test("all five text rights are verified while language, media and device QA remain pending",()=>{
  for(const text of LOS1_OPEN_DIALOGUES){
    const source=findLosSource(text.sourceId);
    assert.ok(source);
    assert.equal(source.stage,"rights-verified");
    assert.equal(source.licenseCode,"CC BY-SA 4.0");
    assert.equal(source.licenseUrl,"https://creativecommons.org/licenses/by-sa/4.0/");
    assert.equal(source.integrated,true);
    assert.equal(source.mediaTested,false);
    assert.equal(source.languageReviewed,false);
    assert.equal(source.deviceTested,false);
    assert.equal(source.published,false);
    assert.equal(getLosChapterSourceGate(text.chapterId).ready,false);
  }
});
test("one reusable reader and exercise page serves all verified original dialogues",()=>{
  const reader=readFileSync("src/features/los/LosOpenSourcePages.tsx","utf8");
  const book=readFileSync("src/features/los/LosBook.tsx","utf8");
  assert.match(reader,/LosOriginalDialogue/);
  assert.match(reader,/useLosChapterDraft\(1,text\.chapterId\)/);
  assert.match(reader,/C"\+text\.chapterId\+"-SOURCE-EVIDENCE-01"/);
  assert.match(book,/getLosOpenDialogue\(chapter\.id\)/);
  assert.match(book,/LosOpenTextUnderstanding/);
  assert.match(book,/LosOpenTextPage/);
});
