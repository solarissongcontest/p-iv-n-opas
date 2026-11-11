/** C07 authentic, complete human-written Text A, an actual phone call.
 * Source (whole original five turns, no additions or omissions):
 * Wikibooks German/Level I/Bitte buchstabieren Sie, revision oldid=3504939
 * https://en.wikibooks.org/w/index.php?title=German/Level_I/Bitte_buchstabieren_Sie&oldid=3504939
 * German text: Wikibooks contributors, CC BY-SA 4.0.
 * Finnish translation is original LOS! teaching apparatus, not a source quote.
 * The telephone number in the source ends with literal ellipsis. We do not
 * add a fictitious real person's number, or pretend the audio is verified.
 */
import type {ContentBlock,Exercise} from "./model";

export const LOS1_C07_AUTHENTIC_TURNS=[
  {speaker:"Auskunft",text:"Auskunft, guten Tag.",translationFi:"Numerotiedustelu, hyvää päivää."},
  {speaker:"Franz",text:"Guten Tag. Ich hätte gerne die Telefonnummer von Frau Claudia Bolliger aus Bern.",
    translationFi:"Hyvää päivää. Haluaisin Bernissä asuvan rouva Claudia Bolligerin puhelinnumeron."},
  {speaker:"Auskunft",text:"Wie schreibt man das? Bitte buchstabieren Sie.",
    translationFi:"Miten se kirjoitetaan? Tavatkaa, olkaa hyvä."},
  {speaker:"Franz",text:"Natürlich. Claudia: C wie Cäsar, L wie Ludwig, A wie Anton, U wie Ursula, D wie Dora, I wie Ida, A wie Anton. Bolliger: B wie Berta, O wie Otto, zweimal L wie Ludwig, I wie Ida, G wie Gustav, E wie Emil und R wie Richard.",
    translationFi:"Totta kai. Claudia: C kuten Cäsar, L kuten Ludwig, A kuten Anton, U kuten Ursula, D kuten Dora, I kuten Ida, A kuten Anton. Bolliger: B kuten Berta, O kuten Otto, kahdesti L kuten Ludwig, I kuten Ida, G kuten Gustav, E kuten Emil ja R kuten Richard."},
  {speaker:"Auskunft",text:"Danke. Die Nummer lautet ...",
    translationFi:"Kiitos. Numero on ... (alkuperäinen teksti päättyy tähän, numeroa ei kerrota)."},
] as const;
export const LOS1_C07_AUTHENTIC_TEXT=LOS1_C07_AUTHENTIC_TURNS.map(x=>x.text).join("\n");
const SPELL="Bitte buchstabieren Sie.";
const index=LOS1_C07_AUTHENTIC_TEXT.indexOf(SPELL);
const surname="Bolliger:";
const surnameIndex=LOS1_C07_AUTHENTIC_TEXT.indexOf(surname);
if(index<0 || surnameIndex<0)throw new Error("C07 source range mismatch");

const base={version:"0.1.0",difficulty:"guided" as const,
  objectives:["L1-PHON-01","L1-STRAT-01"]};

export const LOS1_C07_SOURCE_BLOCKS:ContentBlock[]=[
  {id:"los1-c07-text-a-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Text A on Wikibooksin kokonainen, ihmisten kirjoittama alkuperäinen viiden repliikin "
      +"puhelinkeskustelu. Puhelinpalvelun työntekijä vastaa puhelimeen ja Franz pyytää "
      +"Claudia Bolligerin puhelinnumeroa Bernistä. Työntekijä pyytää tavaamaan nimen. "
      +"Teksti on saksaksi kokonaan tässä oppikirjassa; suomennokset ovat LOS!:n omia. "
      +"Huomaa, että alkuperäinen keskustelu päättyy kolmeen pisteeseen: siinä EI anneta "
      +"varsinaista puhelinnumeroa. Vaikeammat muodot Ich hätte gerne ja die Nummer lautet "
      +"opetellaan tässä vain valmiina tunnistettavina ilmauksina."},
  {id:"los1-c07-wb-02-dialogue",version:"1.0.0",kind:"dialogue",sourceId:"M-WB-02",
    turns:LOS1_C07_AUTHENTIC_TURNS.map(turn=>({...turn}))},
  {id:"los1-c07-text-a-support",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Nimi Claudia tavataan seitsemänä kirjaimena: C-L-A-U-D-I-A. "
      +"Sukunimessä Bolliger on kahdeksan kirjainta: B-O-L-L-I-G-E-R. "
      +"Sana zweimal tarkoittaa kaksi kertaa. Kirjain voidaan selventää sanomalla "
      +"C wie Cäsar tai L wie Ludwig. Nämä ovat nimenomaan lähteen käyttämää "
      +"vanhempaa aakkostusmallia, eivät yleispätevä nykyinen virallinen "
      +"saksankielinen standarditavauslista. "
      +"Muista: Bitte buchstabieren Sie. on kohtelias pyyntö; "
      +"kaverille sanot Bitte buchstabiere. tai Buchstabiere bitte."},
  {id:"los1-c07-text-a-spelling-table",version:"0.1.0",kind:"table",
    headers:["Alkuperäisen tekstin nimi","Kirjaimet","Lähteestä tunnistettava rakenne"],
    rows:[
      ["Claudia","C · L · A · U · D · I · A","C wie Cäsar"],
      ["Bolliger","B · O · L · L · I · G · E · R","zweimal L wie Ludwig"],
    ]},
];
export const LOS1_C07_SOURCE_EXERCISES:Exercise[]=[
  {...base,id:"los1-c07-source-call",type:"single-choice",
    promptFi:"Millaisessa tilanteessa Wikibooksin Text A:n henkilöt keskustelevat?",
    options:[{id:"info",label:"Puhelinnumerotiedustelussa"},{id:"cafe",label:"Kahvilassa"},{id:"station",label:"Juna-asemalla"}],
    correctOptionId:"info",explanationFi:"Auskunft kertoo, että kyseessä on puhelintiedustelu."},
  {...base,id:"los1-c07-source-name",type:"single-choice",
    promptFi:"Minkä henkilön nimen Franz haluaa tarkistaa puhelintiedustelussa?",
    options:[{id:"claudia",label:"Claudia Bolliger"},{id:"greta",label:"Greta Schneider"},{id:"harald",label:"Harald Becker"}],
    correctOptionId:"claudia",explanationFi:"Franz pyytää Frau Claudia Bolligerin puhelinnumeroa."},
  {...base,id:"los1-c07-source-city",type:"single-choice",
    promptFi:"Minkä kaupungin Franz mainitsee?",
    options:[{id:"bern",label:"Bern"},{id:"berlin",label:"Berlin"},{id:"bonn",label:"Bonn"}],
    correctOptionId:"bern",explanationFi:"Hän sanoo: aus Bern."},
  {...base,id:"los1-c07-source-request",type:"single-choice",
    promptFi:"Mitä puhelinpalvelun työntekijä tarkoittaa lauseella Bitte buchstabieren Sie.?",
    options:[{id:"spell",label:"Tavatkaa nimi, olkaa hyvä."},{id:"slow",label:"Puhukaa hiljempaa."},{id:"again",label:"Soittakaa huomenna."}],
    correctOptionId:"spell",explanationFi:"Buchstabieren tarkoittaa tavata kirjaimittain."},
  {...base,id:"los1-c07-source-repeat",type:"single-choice",
    promptFi:"Mitä zweimal L wie Ludwig tarkoittaa?",
    options:[{id:"twice",label:"L-kirjain kahdesti."},{id:"one",label:"Vain yksi L."},{id:"two",label:"Kaksi D-kirjainta."}],
    correctOptionId:"twice",explanationFi:"Zweimal tarkoittaa kahdesti, ja Bolliger sisältää kaksi peräkkäistä L-kirjainta."},
  {...base,id:"los1-c07-source-phone",type:"true-false",
    promptFi:"Totta vai tarua?",statement:"Alkuperäinen Text A kertoo Claudia Bolligerin tarkan puhelinnumeron.",
    correctValue:false,explanationFi:"Lopussa on vain 'Die Nummer lautet ...', ei varsinaista puhelinnumeroa."},
  {...base,id:"los1-c07-source-highlight",type:"highlight",
    blockId:"los1-c07-wb-02-dialogue",promptFi:"Korosta alkuperäisestä puhelindialogista kohtelias tavaamispyyntö.",
    text:LOS1_C07_AUTHENTIC_TEXT,acceptedRanges:[{start:index,end:index+SPELL.length}],
    explanationFi:"Bitte buchstabieren Sie. on työntekijän esittämä kohtelias tavaamispyyntö."},
  {...base,id:"los1-c07-source-highlight-name",type:"highlight",
    blockId:"los1-c07-wb-02-dialogue",promptFi:"Korosta alkuperäisestä tekstistä tavattavan sukunimen otsikko Bolliger:.",
    text:LOS1_C07_AUTHENTIC_TEXT,acceptedRanges:[{start:surnameIndex,end:surnameIndex+surname.length}],
    explanationFi:"Bolliger: aloittaa sukunimen tavaamisen."},
];
