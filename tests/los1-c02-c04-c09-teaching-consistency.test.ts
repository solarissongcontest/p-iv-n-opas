import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS1_C02_SOURCE_ID,LOS1_C02_LINES} from "../src/features/los/content/los1C02.ts";
import {getLosOpenDialogue} from "../src/features/los/content/los1OpenDialogues.ts";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";

const grammar=()=>readFileSync("src/features/los/LosGrammarChapters.tsx","utf8");
const applications=()=>readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");

test("C02 grammar models ich/du from zero and checks independent answers after the attempt",()=>{
  const g=grammar();
  assert.match(g,/1\. Valitse tekijäksi/);
  assert.match(g,/2\. Valitse verbiksi/);
  assert.match(g,/3\. Käytä minämuotoa/);
  assert.match(g,/4\. Lisää kuvitteellinen nimi/);
  assert.match(g,/<details className="los-grammar-self-check">/);
  assert.match(g,/Katso mallivastaukset oman yrityksen jälkeen/);
  assert.match(g,/Wie heißt du\?/);
  assert.match(g,/Ich heiße Leo\./);
  assert.match(g,/ei uusi pisteytetty tehtävä/);
});

test("C02 exact original German six-turn transcript and Herr Weiss translation survive",()=>{
  assert.equal(LOS1_C02_SOURCE_ID,"M-WB-01");
  assert.equal(LOS1_C02_LINES.length,6);
  assert.equal(LOS1_C02_LINES.find(x=>x.id==="u04")?.text,"Ja, er heißt Herr Weiß.");
  const teacher=readFileSync("src/features/los/teacher/lessonL008.ts","utf8");
  assert.match(teacher,/häntä kutsutaan herra Weißiksi/);
  assert.doesNotMatch(teacher,/Hänen nimensä on herra Weiß/);
});

test("C03 location and origin are distinct and first-person application matches model",()=>{
  const g=grammar(),app=applications();
  assert.match(g,/Woher kommst du\?/);
  assert.match(g,/Wo wohnst du\?/);
  assert.match(g,/asuinpaikan, joka ei välttämättä ole sama kuin kotimaa/);
  assert.match(g,/Sie.*aktiivinen käyttö opetetaan seuraavassa kappaleessa/s);
  assert.match(app,/Kuvittele, että olet uusi opiskelija, joka on kotoisin Suomesta/);
  assert.match(app,/Ich komme aus Finnland\.\\nWoher kommst du\?/);
  assert.doesNotMatch(app,/Esittele kuvitteellinen henkilö, jonka kotimaa on Suomi/);
});

test("C04 keeps du vs Sie culturally contextual without assigning all adults one form",()=>{
  const g=grammar();
  assert.match(g,/Ikä ei yksin ratkaise puhuttelua/);
  assert.match(g,/opettajaa, joka on erikseen pyytänyt sinuttelemaan/);
  assert.match(g,/Wie heißen Sie\?/);
  assert.match(g,/Wie geht es Ihnen\?/);
  assert.match(g,/eivät vielä kuulu kappaleen itsenäiseen tuottamistavoitteeseen/);
  const source=getLosOpenDialogue("04");
  assert.ok(source);
  assert.equal(source.sourceId,"M-WB-06");
  assert.equal(source.originalLines.length,8);
  assert.equal(source.originalLines[0]?.text,"Guten Morgen, Herr Standish! Wie geht es Ihnen?");
});

test("C09 event-time grammar, day names, and AM/PM ambiguity are internally consistent",()=>{
  const g=grammar();
  assert.match(g,/Am Montag um drei Uhr\." fi="Maanantaina kello kolmelta/);
  assert.match(g,/Am Freitag um vier Uhr\." fi="Perjantaina kello neljältä/);
  assert.doesNotMatch(g,/fi="Perjantaina kello neljä\."/);
  assert.match(g,/Es ist drei Uhr/);
  assert.match(g,/Wir treffen uns um drei Uhr/);
  assert.match(g,/03\.00 vai 15\.00/);
  assert.match(g,/viikonpäivän edellä on/);
  const ch=LOS_BOOKS.find(b=>b.id===1)?.chapters.find(c=>c.id==="09");
  assert.ok(ch);
  assert.ok(ch.vocabulary.includes("um drei Uhr – kello kolmelta"));
  const source=getLosOpenDialogue("09");
  assert.ok(source);
  assert.equal(source.sourceId,"M-WB-03");
});
