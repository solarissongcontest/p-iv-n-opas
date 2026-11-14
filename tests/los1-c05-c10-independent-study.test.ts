import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {getLosOpenDialogue} from "../src/features/los/content/los1OpenDialogues.ts";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";

const grammar=()=>readFileSync("src/features/los/LosGrammarChapters.tsx","utf8");

test("C05 has two self-assessed situations, source text stays human-authored and unchanged",()=>{
  const source=getLosOpenDialogue("05");
  assert.ok(source);
  assert.equal(source.sourceId,"M-WB-05");
  assert.equal(source.originalLines.length,4);
  assert.equal(source.originalLines[0]?.speaker,"Heinrich");
  const g=grammar();
  assert.match(g,/Kaksi erilaista kuulumistilannetta/);
  assert.match(g,/Vertaa kahta LOS!:n omaa mallikeskustelua vasta yrityksen jälkeen/);
  assert.match(g,/Nicht so gut\. Ich bin müde/);
  assert.match(g,/Gut, danke\. Und dir/);
  assert.match(g,/eivät C05:n alkuperäistekstin rivejä/);
  assert.match(g,/Wie geht es Ihnen\?/);
  assert.match(g,/ei pidä merkitä vääräksi/);
});

test("C10 provides an ungraded six-skill check after existing 2 dialogues and third-person task",()=>{
  const source=getLosOpenDialogue("10");
  assert.ok(source);
  assert.equal(source.sourceId,"M-DIB-02");
  assert.equal(source.originalLines.length,14);
  const g=grammar();
  assert.match(g,/Oman osaamisen arviointi/);
  assert.match(g,/onnistuu itsenäisesti/);
  assert.match(g,/onnistuu mallin avulla/);
  assert.match(g,/vaatii vielä harjoittelua/);
  for(const name of ["Tervehdys ja hyvästely","Nimet ja alkuperä",
    "Sinuttelu ja teitittely","Kolmannen henkilön esittely",
    "Selviytymisfraasit","Oma suullinen harjoittelu"])
    assert.ok(g.includes(name),"missing C10 rubric skill: "+name);
  assert.match(g,/ei saa käyttää automaattisena/);
  const application=readFileSync("src/features/los/LosSupplementalSections.tsx","utf8");
  assert.match(application,/"10":\{title:"Kaksi kohtaamista ja kolmannen henkilön esittely"/);
  assert.match(application,/Kirjoita lopuksi erillinen neljän helpon virkkeen esittely/);
});

test("C10 core vocabulary does not incorrectly force Freund/Freundin to mean only platonic friend",()=>{
  const ch=LOS_BOOKS.find(b=>b.id===1)?.chapters.find(c=>c.id==="10");
  assert.ok(ch);
  assert.equal(ch.vocabulary.length,16,"chapter word count must not change");
  const masculine=ch.vocabulary.find(x=>x.startsWith("mein Freund – "));
  const feminine=ch.vocabulary.find(x=>x.startsWith("meine Freundin – "));
  assert.ok(masculine?.includes("ystäväni") && masculine.includes("poikaystäväni"));
  assert.ok(feminine?.includes("ystäväni") && feminine.includes("tyttöystäväni"));
  assert.match(grammar(),/ein Freund von mir/);
  assert.match(grammar(),/eine Freundin von mir/);
  assert.match(grammar(),/Tilanne ratkaisee/);
  assert.equal(LOS_BOOKS.find(b=>b.id===1)?.chapters.reduce((n,c)=>n+c.vocabulary.length,0),173);
});
