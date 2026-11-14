import {test} from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS1_C02_LINES, LOS1_C02_SOURCE_ID} from "../src/features/los/content/los1C02.ts";
import {getLosOpenDialogue} from "../src/features/los/content/los1OpenDialogues.ts";
import {LOS1_L032_TEACHER} from "../src/features/los/teacher/lessonL032.ts";
import {LOS1_L035_TEACHER} from "../src/features/los/teacher/lessonL035.ts";
import {LOS1_MIDTERM_QUESTIONS} from "../src/features/los/content/los1Exams.ts";
import {LOS1_FINAL_QUESTIONS} from "../src/features/los/content/los1FinalExam.ts";
import {losExercisesFor, losIsCorrect, losScore} from "../src/features/los/exerciseBank.ts";

const chapter=(id:string)=>{
  const result=LOS_BOOKS.find(b=>b.id===1)?.chapters.find(c=>c.id===id);
  assert.ok(result,"LOS! 1 chapter "+id+" missing");
  return result;
};

test("editorial vocabulary fixes preserve ten chapters and original 173 entry count",()=>{
  const book=LOS_BOOKS.find(b=>b.id===1);
  assert.ok(book);
  assert.equal(book.chapters.length,10);
  assert.equal(book.chapters.reduce((n,c)=>n+c.vocabulary.length,0),173);
  assert.ok(chapter("01").vocabulary.some(v=>v.startsWith("Bitte! – ")&&v.includes("Eipä kestä!")));
  assert.ok(chapter("06").vocabulary.some(v=>v.startsWith("Jahre – vuotta")&&v.includes("die Jahre = vuodet")));
  assert.ok(chapter("07").vocabulary.includes("Bitte buchstabieren Sie. – Voisitteko tavata nimen, kiitos?"));
  assert.ok(chapter("09").vocabulary.includes("um drei Uhr – kello kolmelta"));
  assert.ok(!chapter("09").vocabulary.includes("um drei Uhr – kello kolme"));
});

test("C02 Finnish meaning changed without modifying source dialogue or token identities",()=>{
  assert.equal(LOS1_C02_SOURCE_ID,"M-WB-01");
  assert.equal(LOS1_C02_LINES.length,6);
  const u04=LOS1_C02_LINES.find(l=>l.id==="u04");
  assert.ok(u04);
  assert.equal(u04.text,"Ja, er heißt Herr Weiß.");
  assert.equal(u04.meaning,"Kyllä, häntä kutsutaan herra Weißiksi.");
});

test("C07 and C08 editorial questions are faithful to the original German lines",()=>{
  const c07=getLosOpenDialogue("07");
  const c08=getLosOpenDialogue("08");
  assert.ok(c07);
  assert.ok(c08);
  assert.equal(c07.sourceId,"M-WB-02");
  assert.equal(c08.sourceId,"M-WB-08");
  assert.match(c07.originalLines.find(l=>l.id==="u02")?.text??"",/Frau Claudia Bolliger/);
  const frauq=c07.questions.find(q=>q.id==="C07-SOURCE-Q04");
  assert.ok(frauq);
  assert.equal(frauq.prompt,"Mitä Frau tarkoittaa henkilön nimen edellä?");
  const mathq=c08.questions.find(q=>q.id==="C08-SCHOOL-Q01");
  assert.ok(mathq);
  assert.equal(mathq.prompt,"Mikä oppiaine Silkellä ja Torstenilla on kohtauksen alussa?");
  assert.equal(mathq.correctId,"a");
  assert.match(c08.originalLines[0]?.text??"",/Jetzt haben wir Mathe\./);
});

test("C01 teaching makes greeting vs farewell and Bitte meanings self-checkable",()=>{
  const src=readFileSync("src/features/los/LosC01GrammarGuide.tsx","utf8");
  assert.match(src,/Ein Wasser, bitte/);
  assert.match(src,/ei tavallinen saapumistervehdys/);
  assert.match(src,/Saavut kello 20 kylään/);
  assert.match(src,/kello 23 hyvää yötä/);
  assert.match(src,/<details className="los-c01-self-check">/);
  assert.match(src,/Tämä on itsearvioitava opetusharjoitus, ei pisteytetty kappaletesti/);
});

test("C06 age transfer uses fictitious teenage examples without overwriting lesson IDs",()=>{
  assert.equal(LOS1_L032_TEACHER.id,"L032");
  assert.equal(LOS1_L035_TEACHER.id,"L035");
  const board=LOS1_L032_TEACHER.scenes.find(s=>s.id==="age-board");
  assert.ok(board);
  const pairs=board.board??[];
  for(const [age,word] of [[16,"sechzehn"],[17,"siebzehn"],[18,"achtzehn"],[19,"neunzehn"]] as const){
    assert.ok(pairs.some(row=>row.german==="Ich bin "+word+" Jahre alt."),
      "Missing fictional age example "+age);
  }
  const apply=LOS1_L035_TEACHER.scenes.find(s=>s.id==="application-book");
  assert.ok(apply);
  assert.match(apply.paragraphs.join(" "),/kuvitteellisista 16-, 17-, 18- ja 19-vuotiaista/);
  assert.equal(LOS1_MIDTERM_QUESTIONS.length,25);
  assert.equal(LOS1_FINAL_QUESTIONS.length,50);
});

test("C07 instructional pages and source translation use clear Finnish spelling request",()=>{
  const grammar=readFileSync("src/features/los/LosGrammarChapters.tsx","utf8");
  assert.match(grammar,/Voisitteko tavata nimen, kiitos/);
  assert.doesNotMatch(grammar,/Tavatkaa, olkaa hyvä/);
  const c07=getLosOpenDialogue("07");
  assert.ok(c07);
  assert.match(c07.originalLines.find(l=>l.id==="u03")?.meaning??"",/Voisitteko tavata nimen, kiitos/);
  assert.match(c07.originalLines.find(l=>l.id==="u03")?.text??"",/Bitte buchstabieren Sie/);
});

test("C09 corrected scored choice accepts saved legacy response without regrading",()=>{
  const q=losExercisesFor("09").find(x=>x.id==="C09-EX-09");
  assert.ok(q);
  assert.equal(q.correct,"kello kolmelta");
  assert.deepEqual(q.options,["kolmen tunnin ajan","kello kolmelta","kolmantena päivänä"]);
  assert.ok(q.accepted.includes("kello kolme"),"historical answer must remain valid");
  assert.equal(losIsCorrect(q,"kello kolme"),true);
  assert.equal(losIsCorrect(q,"kello kolmelta"),true);
  assert.equal(losScore("09",{"C09-EX-09":"kello kolme"}).correct,1);
  const grammar=readFileSync("src/features/los/LosGrammarChapters.tsx","utf8");
  assert.match(grammar,/Maanantaina kello kolmelta/);
  const workbook=readFileSync("src/features/los/LosWorkbook.tsx","utf8");
  assert.match(workbook,/Aiemmin tallennettu vaihtoehto/);
  assert.match(workbook,/Palautettu vastauksesi säilyy ennallaan/);
});
