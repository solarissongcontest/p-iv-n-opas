import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_BOOKS} from "../src/features/los/catalog.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";
import {losFutureExercisesFor} from "../src/features/los/content/losFutureExercises.ts";
import {losFutureSpanGenreTask,readLosFutureSpanGenreAnswer,writeLosFutureSpanGenreAnswer,
  losFutureExcerptInTurn,losFutureSpanGenreComplete}
  from "../src/features/los/content/losFutureSpanGenre.ts";
test("70 T04 and 70 T14 tasks have exact source lines, safe models and two saved answers",()=>{
  let total=0;
  for(const book of LOS_BOOKS.filter(b=>b.id>=2))for(const chapter of book.chapters){
    const manuscript=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];assert.ok(manuscript);
    const tasks=losFutureExercisesFor(book.id,chapter.id);
    for(const kind of ["T04","T14"]){
      const item=tasks.find(x=>x.id.endsWith("-"+kind));assert.ok(item);
      const form=losFutureSpanGenreTask(item);assert.ok(form,item.id);
      if(kind==="T14")assert.equal(item.prompt,"Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.");
      assert.deepEqual(form.dialogue,manuscript.dialogue);
      assert.equal(form.textB,kind==="T04"?"":manuscript.textB);
      assert.equal(form.kind,kind==="T04"?"span":"genre");
      const empty=readLosFutureSpanGenreAnswer("",form);assert.ok(empty);
      assert.deepEqual(empty.answers,["",""]);
      assert.equal(losFutureSpanGenreComplete(form,empty),false);
      const index=kind==="T04"?0:null;
      const words=[kind==="T04"?manuscript.dialogue[0]!.slice(0,5):"Eri vastaanottajat",
        "Perustelen erot suomeksi."];
      const saved=writeLosFutureSpanGenreAnswer(form,index,words);
      assert.ok(saved.length<4700);
      const parsed=readLosFutureSpanGenreAnswer(saved,form);assert.ok(parsed);
      assert.deepEqual(parsed.answers,words);
      assert.equal(losFutureSpanGenreComplete(form,parsed),true);
      assert.equal(readLosFutureSpanGenreAnswer("Earlier student's prose",form),null);
      assert.equal(readLosFutureSpanGenreAnswer(saved,{...form,prompt:"Edited"}),null);
      if(kind==="T04"){
        assert.ok(losFutureExcerptInTurn(form,parsed));
        assert.equal(losFutureSpanGenreComplete(form,
          {...parsed,answers:["phrase not found",words[1]!]}),false);
      }
      total++;
    }
  }
  assert.equal(total,140);
});
test("tampering and forged grades cannot be imported as a structured answer",()=>{
  const item=losFutureExercisesFor(2,"01").find(x=>x.id.endsWith("-T04"));assert.ok(item);
  const form=losFutureSpanGenreTask(item);assert.ok(form);
  const raw=writeLosFutureSpanGenreAnswer(form,0,["Hallo","Perustelu"]);
  const data=JSON.parse(raw);
  assert.equal(readLosFutureSpanGenreAnswer(JSON.stringify({...data,score:9}),form),null);
  assert.equal(readLosFutureSpanGenreAnswer(JSON.stringify({...data,selection:999}),form),null);
  assert.throws(()=>writeLosFutureSpanGenreAnswer(form,999,["Hallo","Perustelu"]),/Invalid/);
  assert.throws(()=>writeLosFutureSpanGenreAnswer(form,0,["x".repeat(501),""]),/Invalid/);
});

test("all 70 T04 answer models cite an exact German phrase from their own source dialogue",()=>{
  let checked=0;
  for(const book of LOS_BOOKS.filter(book=>book.id>=2))for(const chapter of book.chapters){
    const item=losFutureExercisesFor(book.id,chapter.id).find(t=>t.id.endsWith("-T04"));
    const manuscript=LOS_FUTURE_MANUSCRIPTS[book.id]?.[chapter.id];
    assert.ok(item);assert.ok(manuscript);
    const match=item.answerKey.match(/^Tarkka saksankielinen ilmaus: ([^\n]+)\nMalliselitys: ([^\n]+)\n/);
    assert.ok(match,`${item.id}: saksankielinen tekstinäyttö tai malliselitys puuttuu`);
    assert.ok(manuscript.dialogue.some(line=>line.includes(match[1]!)),
      `${item.id}: mallissa siteerattua ilmausta ei ole tukidialogissa`);
    assert.ok(match[2]!.trim().length>=3);
    assert.ok(!item.answerKey.includes("Tokenikohdistus lisättävä"));
    checked++;
  }
  assert.equal(checked,70);
});

test("12 corrected T04 questions migrate old student excerpts without accepting arbitrary prompts",()=>{
  const prefix="Etsi ja korosta tukidialogista kohta, joka auttaa vastaamaan kysymykseen: ";
  const revisions:[number,string,string,string][]=[
  [
    2,
    "03",
    "Mitä huoneita Benin asunnossa on?",
    "Mitä Ben kertoo asunnossa olevan keittiön lisäksi?"
  ],
  [
    2,
    "08",
    "Mitä kolme tuotetta ostoslistalla on?",
    "Mitä kahta ostettavaa Mia mainitsee ensimmäisessä puheenvuorossaan?"
  ],
  [
    3,
    "04",
    "Mistä David pitää elokuvaa enemmän?",
    "Mistä David pitää enemmän kuin elokuvasta?"
  ],
  [
    3,
    "08",
    "Missä ja milloin he tapaavat?",
    "Mihin aikaan Mila ehdottaa tapaamista?"
  ],
  [
    4,
    "03",
    "Mistä kaupungista kortti lähetetään?",
    "Mistä kaupungista Ella kysyy Nilsiltä?"
  ],
  [
    4,
    "06",
    "Onko keskustelussa kuvattu tapa kaikkien tapa?",
    "Mitä Sara kertoo itse tekevänsä sunnuntaisin?"
  ],
  [
    4,
    "07",
    "Miten Ben matkusti viikonloppuna kertomansa mukaan?",
    "Mihin Ben kertoo matkustaneensa viikonloppuna?"
  ],
  [
    4,
    "09",
    "Mitä Olli sanoo pitävänsä talvesta?",
    "Miksi Olli pitää talvesta?"
  ],
  [
    5,
    "07",
    "Miten Sara reagoi?",
    "Mitä Sara kertoo tekevänsä?"
  ],
  [
    5,
    "10",
    "Mitä Ben neuvoo?",
    "Mikä on Benin ensimmäinen neuvo Ninalle?"
  ],
  [
    6,
    "03",
    "Millainen Maxin lukema tarina on?",
    "Miten Maxin mukaan tarinan juoni kehittyy?"
  ],
  [
    7,
    "07",
    "Mitä sähköpostin aihe on?",
    "Millä tervehdyksellä muodollisen sähköpostin voi aloittaa?"
  ]
];
  assert.equal(revisions.length,12);
  for(const [book,chapter,previous,current] of revisions){
    const item=losFutureExercisesFor(book,chapter).find(t=>t.id.endsWith("-T04"));
    assert.ok(item);
    assert.equal(item.prompt,prefix+current);
    const form=losFutureSpanGenreTask(item);assert.ok(form);
    const initial=writeLosFutureSpanGenreAnswer(form,0,["Näyte","Alkuperäinen perusteluni"]);
    const old={...JSON.parse(initial),prompt:prefix+previous};
    const saved=readLosFutureSpanGenreAnswer(JSON.stringify(old),form);assert.ok(saved);
    assert.deepEqual(saved.answers,["Näyte","Alkuperäinen perusteluni"]);
    assert.equal(saved.selection,0);
    assert.equal(saved.prompt,form.prompt);
    assert.equal(saved.legacyPromptUpdated,true);
    assert.equal(readLosFutureSpanGenreAnswer(
      JSON.stringify(old),{...form,prompt:prefix+current+"!"}),null);
    const rewritten=readLosFutureSpanGenreAnswer(
      writeLosFutureSpanGenreAnswer(form,saved.selection,saved.answers),form);
    assert.ok(rewritten);
    assert.equal(rewritten.legacyPromptUpdated,undefined);
    assert.deepEqual(rewritten.answers,saved.answers);
  }
});


test("all 70 T14 text-genre exercises migrate the previously saved message-only prompt",()=>{
  const oldPrompt="Vertaa tukidialogia ja Text B -viestiä. Miten vastaanottaja, tavoite ja kielen tyyli eroavat? Kirjoita kaksi havaintoa.";
  const newPrompt="Vertaa tukidialogia ja Text B -tekstiä. Tarkastele tarkoitusta, mahdollista vastaanottajaa ja ilmaisutapaa. Kirjoita kaksi havaintoa ja perustele ne tekstistä. Kaikkien piirteiden ei tarvitse erota.";
  let migrated=0;
  for(const book of LOS_BOOKS.filter(book=>book.id>=2))for(const chapter of book.chapters){
    const task=losFutureExercisesFor(book.id,chapter.id).find(t=>t.id.endsWith("-T14"));
    assert.ok(task);
    const form=losFutureSpanGenreTask(task);assert.ok(form);
    assert.equal(form.prompt,newPrompt);
    assert.ok(form.textB.length>0);
    const answers=["Tukidialogissa on puheenvuoroja.","Text B:n tekstilaji ja tarkoitus eroavat."];
    const saved=writeLosFutureSpanGenreAnswer(form,null,answers);
    const old=JSON.stringify({...JSON.parse(saved),prompt:oldPrompt});
    const restored=readLosFutureSpanGenreAnswer(old,form);assert.ok(restored);
    assert.equal(restored.legacyPromptUpdated,true);
    assert.deepEqual(restored.answers,answers);
    assert.equal(restored.selection,null);
    assert.equal(restored.prompt,newPrompt);
    assert.equal(readLosFutureSpanGenreAnswer(JSON.stringify({...JSON.parse(old),grade:10}),form),null);
    assert.equal(readLosFutureSpanGenreAnswer(JSON.stringify({...JSON.parse(old),prompt:oldPrompt+"?"}),form),null);
    assert.equal(readLosFutureSpanGenreAnswer(
      writeLosFutureSpanGenreAnswer(form,restored.selection,restored.answers),form)?.legacyPromptUpdated,
      undefined);
    migrated++;
  }
  assert.equal(migrated,70);
});
