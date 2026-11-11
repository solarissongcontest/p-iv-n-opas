/** LOS! 1 · C08 authentic human-written Text A.
 * Complete exercise 562 (the self-contained "noch einmal" source list) from:
 * Wikibooks / Deutschkurs für Anfänger / Lektion 012, oldid=3823563.
 * https://en.wikibooks.org/w/index.php?title=Deutschkurs_für_Anfänger/Lektion_012&oldid=3823563
 * Community-authored book text CC BY-SA 4.0. All 15 German list entries
 * are reproduced in their original order, unchanged. This is a phrase
 * collection, NOT a four-turn conversation, lesson-wide full text or audio.
 * Finnish teaching notes and assessment prompts are new LOS! additions.
 */
import type {ContentBlock,Exercise} from "./model";
export const LOS1_C08_WB07_LINES=[
 "noch einmal",
 "Noch einmal, bitte!",
 "Lesen Sie noch einmal!",
 "Lesen Sie das Wort bitte noch einmal!",
 "Lies das Wort bitte noch einmal!",
 "Kannst du das Wort bitte noch einmal lesen?",
 "Können Sie das Wort bitte noch einmal lesen?",
 "Kannst du den Satz bitte noch einmal lesen?",
 "Können Sie den Satz bitte noch einmal lesen?",
 "Kannst du die Übung bitte noch einmal lesen?",
 "Können Sie die Übung bitte noch einmal lesen?",
 "Kannst du die Frage bitte noch einmal lesen?",
 "Können Sie die Frage bitte noch einmal lesen?",
 "Kannst du die Antwort bitte noch einmal lesen?",
 "Können Sie die Antwort bitte noch einmal lesen?",
] as const;
export const LOS1_C08_WB07_FULL_TEXT=LOS1_C08_WB07_LINES.join("\n");

export const LOS1_C08_SOURCE_BLOCKS:ContentBlock[]=[
 {id:"los1-c08-source-intro",version:"1.0.0",kind:"paragraph",language:"fi",
  text:"TEXT A · Tämä on Wikibooksin saksankielisen Deutschkurs für Anfänger -oppikirjan harjoituksen 562 KOKO 15-rivinen alkuperäinen fraasiluettelo, ei LOS!:n keksimä dialogi. Fraasit on kirjoitettu aidossa oppimateriaalissa, ja koko valittu lista on luettavissa tässä sovelluksessa. Lähde: Lektion 012, versio 3823563, CC BY-SA 4.0. Tarkoitus on tunnistaa, miten pyydät opettajaa tai opiskelukaveria lukemaan jotain uudelleen. Jos rivillä on vieraita sanoja, avaa alla oleva suomenkielinen tuki. Koko verbitaivutusta ei tarvitse opetella tässä."},
 {id:"los1-c08-wb-07-repeat-phrases",version:"1.0.0",kind:"authenticText",language:"de",sourceId:"M-WB-07",
  text:LOS1_C08_WB07_FULL_TEXT},
 {id:"los1-c08-source-gloss",version:"1.0.0",kind:"table",
  headers:["Alkuperäinen lähdeilmaus","Suomenkielinen selitys","Oppimistavoite"],
  rows:[
   ["noch einmal","uudelleen, vielä kerran","osaa tunnistaa"],
   ["Noch einmal, bitte!","Vielä kerran, kiitos!","osaa käyttää"],
   ["Lesen Sie noch einmal!","Lukekaa uudelleen (teitittely).","osaa tunnistaa"],
   ["Lesen Sie das Wort bitte noch einmal!","Lukekaa sana uudelleen, olkaa hyvä.","osaa tunnistaa"],
   ["Lies das Wort bitte noch einmal!","Lue sana uudelleen, kiitos (sinuttelu).","tunnista du-/Sie-ero"],
   ["Kannst du das Wort bitte noch einmal lesen?","Voitko lukea sanan vielä kerran? (sinuttelu)","vain lukeminen"],
   ["Können Sie das Wort bitte noch einmal lesen?","Voitteko lukea sanan vielä kerran? (teitittely)","vain lukeminen"],
   ["Kannst du den Satz bitte noch einmal lesen?","Voitko lukea lauseen vielä kerran?","vain lukeminen"],
   ["Können Sie den Satz bitte noch einmal lesen?","Voitteko lukea lauseen vielä kerran?","vain lukeminen"],
   ["Kannst du die Übung bitte noch einmal lesen?","Voitko lukea harjoituksen vielä kerran?","vain lukeminen"],
   ["Können Sie die Übung bitte noch einmal lesen?","Voitteko lukea harjoituksen vielä kerran?","vain lukeminen"],
   ["Kannst du die Frage bitte noch einmal lesen?","Voitko lukea kysymyksen vielä kerran?","vain lukeminen"],
   ["Können Sie die Frage bitte noch einmal lesen?","Voitteko lukea kysymyksen vielä kerran?","vain lukeminen"],
   ["Kannst du die Antwort bitte noch einmal lesen?","Voitko lukea vastauksen vielä kerran?","vain lukeminen"],
   ["Können Sie die Antwort bitte noch einmal lesen?","Voitteko lukea vastauksen vielä kerran?","vain lukeminen"],
  ]},
 {id:"los1-c08-source-explanation",version:"1.0.0",kind:"grammar",
  title:"Mitä alkuperäisestä tekstistä pitää ymmärtää?",
  explanationFi:"Lähteessä esiintyy kaksi tapaa pyytää samaa asiaa. Käytä valmista kohteliasta ilmaisua Noch einmal, bitte! silloin, kun tarvitset toiston. Kun haluat opettajan lukevan nimenomaan sanan uudelleen, voit sanoa Können Sie das Wort bitte noch einmal lesen? Samassa alkuperäisessä listassa on sinuttelu Kannst du …? ja teitittely Können Sie …? Tunnista ero, mutta älä vielä opettele können-verbin kaikkia muotoja. Wort on sana, Satz lause, Übung harjoitus, Frage kysymys ja Antwort vastaus. Lähde on kirjoitettu ilmauslista, ei ihmisen lausuma äänite.",
  examples:[
    {de:"Noch einmal, bitte!",fi:"Vielä kerran, kiitos!"},
    {de:"Kannst du das Wort bitte noch einmal lesen?",fi:"Voitko lukea sanan vielä kerran? (sinuttelu)"},
    {de:"Können Sie das Wort bitte noch einmal lesen?",fi:"Voitteko lukea sanan vielä kerran? (teitittely)"},
    {de:"das Wort · der Satz · die Frage · die Antwort",fi:"sana · lause · kysymys · vastaus"},
  ]},
 {id:"los1-c08-source-outro",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"Olet nyt lukenut kaikki 15 lähteen alkuperäistä ilmausta. Vertaa ensimmäisen yksinkertaisen Noch einmal, bitte! -pyynnön merkitystä viimeisiin pidempiin kohteliaisiin kysymyksiin. Tämän Teksti A:n oikeat luetunymmärtämistehtävät tarkistetaan tekstistä; niitä ei saa kutsua äänitestiksi. C08:n alkuperäinen erillinen kuuntelu- ja videomateriaali odottaa yhä lähdekohtaista tarkistusta, joten oppitunti L044 pysyy suunnitelmavaiheessa."},
];
const base={version:"0.1.0",difficulty:"guided" as const,objectives:["L1-STRAT-01","L1-READ-01"]};
const choice=(id:string,promptFi:string,options:[string,string,string],correct:0|1|2,explanationFi:string):Exercise=>({
 ...base,id:"los1-c08-source-"+id,type:"single-choice",promptFi,
 options:options.map((label,i)=>({id:"o"+i,label})),
 correctOptionId:"o"+correct,explanationFi,
});
const highlight=(id:string,phrase:string,promptFi:string,explanationFi:string):Exercise=>{
 const start=LOS1_C08_WB07_FULL_TEXT.indexOf(phrase);
 if(start<0)throw Error("Missing original phrase: "+phrase);
 return {...base,id:"los1-c08-source-"+id,type:"highlight",
  blockId:"los1-c08-wb-07-repeat-phrases",text:LOS1_C08_WB07_FULL_TEXT,
  promptFi,acceptedRanges:[{start,end:start+phrase.length}],explanationFi};
};
export const LOS1_C08_SOURCE_EXERCISES:Exercise[]=[
 choice("type","Mikä tämä Wikibooksin lähde tarkasti on?",
  ["Oikeiden ihmisten kirjoittama 15 ilmauksen luettelo.","Neljäntoista vuoron keksitty puhelindialogi.","Videon alkuperäinen transkriptio."],0,
  "Käytämme koko alkuperäistä harjoituksen 562 fraasiluetteloa, emme haastattelua."),
 choice("first","Mikä ilmaus tulee heti sanan noch einmal jälkeen lähteessä?",
  ["Gute Nacht!","Noch einmal, bitte!","Wie alt bist du?"],1,
  "Toinen rivi on Noch einmal, bitte!"),
 choice("word","Mikä alkuperäisessä tekstissä tarkoittaa sanaa?",
  ["die Antwort","der Satz","das Wort"],2,
  "Das Wort tarkoittaa sanaa."),
 choice("question","Mikä alkuperäisessä listassa tarkoittaa kysymystä?",
  ["die Frage","die Woche","die Schule"],0,
  "Die Frage = kysymys."),
 choice("answer","Mikä alkuperäisen tekstin sana tarkoittaa vastausta?",
  ["die Übung","die Antwort","der Satz"],1,
  "Die Antwort = vastaus."),
 choice("formal","Minkä alkuperäisen lähdeilmauksen alussa on kohtelias Können Sie?",
  ["Kannst du die Frage bitte noch einmal lesen?",
   "Lies das Wort bitte noch einmal!",
   "Können Sie die Frage bitte noch einmal lesen?"],2,
  "Können Sie -muoto on kohtelias, kun pyydät lukemaan kysymyksen."),
 choice("informal","Mikä ilmaus on alun perusteella sinuttelua?",
  ["Kannst du das Wort bitte noch einmal lesen?",
   "Können Sie das Wort bitte noch einmal lesen?",
   "Lesen Sie noch einmal!"],0,
  "Kannst du on tuttavallinen sinuttelun muoto."),
 choice("last","Mitä viimeinen lähderivi pyytää lukemaan?",
  ["Sanan.","Vastauksen.","Viikonpäivän."],1,
  "Viimeinen rivi sisältää die Antwort."),
 choice("spoken","Mikä väite lähteestä on tosi?",
  ["Se on tarkistettu äänitallenne.","Se on LOS!:n itsensä kirjoittama.",
   "Se on kirjoitettu alkuperäinen ilmauslista ilman tässä hyväksyttyä äänitettä."],2,
  "Aito kirjoitettu oppimateriaali ei tarkoita automaattisesti kuunneltavaa äänitettä."),
 choice("meaning","Mitä Noch einmal, bitte! tarkoittaa?",
  ["Vielä kerran, kiitos!","Olen kotoisin Saksasta.","Onko nyt maanantai?"],0,
  "Fraasi pyytää toistoa."),
 highlight("highlight-once","Noch einmal, bitte!",
  "Korosta alkuperäisluettelosta kokonainen lyhyt toistopyyntö.",
  "Toisella rivillä on Noch einmal, bitte!"),
 highlight("highlight-formal","Können Sie das Wort bitte noch einmal lesen?",
  "Korosta lähdetekstistä kokonainen teitittelevä pyyntö lukea sana vielä kerran.",
  "Teitittelevä Können Sie -fraasi pyytää lukemaan sanan uudelleen."),
];
