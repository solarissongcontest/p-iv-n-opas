/** C10 L052 · a HONEST complete 30-minute contrast activity.
 *
 * COERLL M-DIB-02 Harald's COMPLETE interview is already in the reader.
 * Its ORIGINAL MOVING VIDEO is listed by COERLL but cannot be independently
 * verified as a playable, privacy-safe, permitted direct media asset yet.
 *
 * A real human-recorded, CC BY-SA 3.0 14-second Franz/Jörg conversation
 * (M-COM-01) is used only as a clearly IDENTIFIED COMPARISON recording,
 * never as a dubbed "Harald" video. Reading questions are clearly labelled
 * as reading and do not claim to measure Harald listening.
 */
import type {ContentBlock,Exercise} from "./model";
import {LOS1_C01_DIALOGUE_TURNS,LOS1_C01_AUTHENTIC_TEXT} from "./los1-c01-source.ts";
import {LOS1_C06_HARALD_TURNS,LOS1_C06_HARALD_TEXT} from "./los1-c06-source.ts";
const basic={version:"0.1.0",difficulty:"guided" as const,objectives:["L1-PROD-01","L1-READ-01","L1-LISTEN-01"]};
const choice=(id:string,promptFi:string,labels:[string,string,string],right:0|1|2,explanationFi:string):Exercise=>({
 ...basic,id:"los1-c10-contrast-"+id,type:"single-choice",promptFi,
 options:labels.map((label,i)=>({id:"o"+i,label})),
 correctOptionId:"o"+right,explanationFi,
});
const h=(id:string,text:string,frag:string,promptFi:string,explanationFi:string):Exercise=>{
 const start=text.indexOf(frag);if(start<0)throw Error("C10 contrast missing source: "+frag);
 return {...basic,id:"los1-c10-contrast-"+id,type:"highlight",
  blockId:id.startsWith("franz")?"los1-c10-contrast-franz-dialogue":"los1-c10-m-dib-02-harald",
  text,acceptedRanges:[{start,end:start+frag.length}],promptFi,explanationFi};
};
export const LOS1_C10_CONTRAST_BLOCKS:ContentBlock[]=[
 {id:"los1-c10-contrast-start",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"L052 · Haraldin esittely ja alkuperäinen vertailukuuntelu (30 min). Tässä on kaksi EROTETTUA aineistoa. Ensin kuuntelet Franzin ja Jörgin henkilöhahmojen oikean, ihmisten äänittämän 14 sekunnin keskustelun (M-COM-01). Sen jälkeen luet Harald Beckerin oikean 14 repliikin haastattelun kokonaisena ja vertailet kolmea tuttua kysymystä. Franzin ja Jörgin äänite ei ole Haraldin ääni eikä hänen haastattelunsa. Haraldin oman COERLL-videon pysyvää, toimivaa ja yksityisyyden kannalta hyväksyttävää tiedostoa ei ole vielä pystytty varmistamaan. Siksi Haraldin lukemistehtävistä ei anneta kuuntelutaitopisteitä."},
 {id:"los1-c10-contrast-plan",version:"0.1.0",kind:"table",
  headers:["Osuus","Tee näin","Arvioitu aika"],
  rows:[
   ["Alkuvalmistelu","Lue tavoite; yritä muistaa nimet, kotipaikka ja ikä.","3 min"],
   ["Kuuntelu","Kuuntele Franzin ja Jörgin erillinen aito äänite ensin ilman tekstiä, sitten kerran tekstin kanssa.","5 min"],
   ["Luetun ymmärtäminen","Lue Haraldin autenttinen koko haastattelu ja selitä kaksi kohtaa suomeksi.","7 min"],
   ["Vertailu","Täytä alla olevat lähdepohjaiset tehtävät ja vertaa kysymyksiä.","7 min"],
   ["Oma käyttö","Kirjoita omista kuvitteellisista henkilöistä neljä lausetta; harjoittele ääneen.","6 min"],
   ["Reflektio","Merkitse, mistä tiesit vastauksen: kuulitko vai luitko?","2 min"],
  ]},
 {id:"los1-c10-contrast-human-audio-guide",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"KUUNTELU A: Franz ja Jörg (M-COM-01). Tämä ääni on oikea ihmisten nauhoittama keskustelu. Kuuntele ensin ilman transkriptiota. Yritä tunnistaa nimet Franz ja Jörg ja kysymys Wie alt bist du? Jos soitin ei toimi, käytä alla olevaa alkuperäistekstiä lukemisharjoituksena mutta älä merkitse kuuntelua onnistuneeksi. Alla olevat kuunteluvaiheen valintatehtävät ovat itseopiskelijan harjoituksia, joissa tekstivarmistus on mahdollinen; niitä ei pidä tulkita äänikokeen todistukseksi."},
 {id:"los1-c10-contrast-franz-dialogue",version:"1.0.0",kind:"dialogue",sourceId:"M-COM-01",
  turns:LOS1_C01_DIALOGUE_TURNS.map(t=>({...t}))},
 {id:"los1-c10-contrast-harald-guide",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"LUKEMINEN B: Harald Becker (M-DIB-02). Lue hänen koko alkuperäinen saksankielinen haastattelunsa C10:n Text A -osiossa. Vertaa lausetta Ich heiße Harald Becker. Franzin ja Jörgin vastaaviin ilmauksiin. Harald kertoo olevansa alun perin Münchenistä ja iältään suunnilleen viisikymppinen, ei täsmälleen 50-vuotias. Alkuperäislähteen puhelinnumeron paikalla näkyy yksityisyyden vuoksi poistomerkintä. Haraldin video ei ole tässä soittimessa; erillinen Franz–Jörg-ääni ei saa koskaan esiintyä Haraldina."},
 {id:"los1-c10-contrast-forms",version:"0.1.0",kind:"table",
  headers:["Kysymys","Franz ja Jörg (aito ääni)","Harald (aito kirjallinen lähde)"],
  rows:[
   ["Nimi","Franz ja Jörg","Harald Becker"],
   ["Ikä äänityksen/haastattelun aikaan","Franz 19 ja Jörg 20","Harald noin 50"],
   ["Alkuperämaa tai kaupunki","Ei mainita tässä äänitteessä.","München, Saksa"],
   ["Lähdemedia","Ihmisen aito äänite mukana","Alkuperäinen video vielä hyväksymättä"],
  ]},
 {id:"los1-c10-contrast-production",version:"0.1.0",kind:"production",
  titleFi:"Keksi kaksi henkilöä ja kirjoita heidän esittelynsä",
  promptFi:"Kirjoita neljä lyhyttä lausetta kahdesta kuvitteellisesta ihmisestä. Mies on Ben Saksasta ja nainen on Mia Suomesta. Käytä er heißt, er kommt, sie heißt, sie kommt. Harjoittele lopuksi sanomaan kaksi lausetta ääneen. Älä väitä sen olevan Haraldin nauhoite.",
  modelDe:"Er heißt Ben.\nEr kommt aus Deutschland.\nSie heißt Mia.\nSie kommt aus Finnland.",
  modelFi:"Hänen nimensä on Ben.\nHän on kotoisin Saksasta.\nHänen nimensä on Mia.\nHän on kotoisin Suomesta.",
  criteriaFi:["Kirjoitin molemmat nimet.","Kerroin molemmat lähtömaat.","Käytin er/sie ja heißt/kommt oikein.","Vertasin yhtä todellista äänitettä ja yhtä oikeaa haastattelutekstiä rehellisesti.","Erotan kuullun ja luetun ymmärtämisen."],
 },
 {id:"los1-c10-contrast-source-gate",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"JULKAISURAJA: COERLL:n alkuperäissivulla on Haraldin Wer bin ich? -haastattelu ja sen täydellinen saksankielinen litteraatti (vidt.php?f=01_22_int_hb_who). Teksti on jo sisällä LOS!:ssa, mutta Haraldin alkuperäistä videota tai ääniraitaa EI ole tässä tehtävässä. Videon yksittäinen tiedosto, sisäinen toisto ja alkuperäisessä äänitteessä lausuttu puhelinnumero on ratkaistava ennen varsinaisen Harald-kuuntelun merkitsemistä hyväksytyksi. Tämä esikatselutunti harjoittaa todellista kuuntelua toisesta aidosta lähteestä, mutta ei korvaa kyseistä julkaisurajaa."},
];
export const LOS1_C10_CONTRAST_EXERCISES:Exercise[]=[
 choice("audio-speakers","Kuuntele aidosta Franzin ja Jörgin äänitteestä, ketkä kaksi henkilöä keskustelevat.",
  ["Harald ja Berna","Franz ja Jörg","Franz ja Greta"],1,
  "M-COM-01: Franz ja Jörg. Ääni ei ole Haraldin haastattelu."),
 choice("audio-age-franz","Minkä ikäinen Franz sanoo äänitteessä olevansa?",
  ["19","20","50"],0,"Franz: Ich bin neunzehn Jahre alt."),
 choice("audio-age-joerg","Minkä ikäinen Jörg sanoo olevansa?",
  ["17","19","20"],2,"Jörg: Ich bin zwanzig."),
 choice("audio-farewell","Mikä on Jörgin viimeinen repliikki?",
  ["Guten Morgen!","Tschüss!","Bis morgen!"],1,
  "Franz: Gut. Bis später! Jörg: Tschüss!"),
 choice("text-harald","Kenen nimi on Haraldin alkuperäisessä kirjoitetussa haastattelussa?",
  ["Harald Becker","Harald Jörg","Herr Weiß"],0,
  "Harald sanoo Ich heiße Harald Becker."),
 choice("text-city","Mistä Harald sanoo olevansa alun perin kotoisin?",
  ["Kiel","München","Berlin"],1,
  "Ich komme ursprünglich aus München."),
 choice("text-age","Miten Harald ilmaisee haastattelussa ikänsä?",
  ["täsmälleen 50","täsmälleen 30","suunnilleen 50"],2,
  "Ich bin jetzt so um die fünfzig ilmaisee arvion."),
 choice("provenance","Mitä äänilähdettä L052:ssa kuunnellaan oikeasti?",
  ["Harald Beckerin videon ääniraita","Franzin ja Jörgin aito M-COM-01-dialogi",
   "tekoälyllä Haraldille luotu esittely"],1,
  "Aito M-COM-01-äänite on vertailuaineisto; Haraldin video jää erikseen varmistettavaksi."),
 h("franz-age",LOS1_C01_AUTHENTIC_TEXT,"Ich bin neunzehn Jahre alt",
  "Korosta Franzin ja Jörgin äänitteen kirjallisesta vastineesta Franzin ikäilmaus.",
  "Franz sanoo olevansa yhdeksäntoistavuotias. Tämä on tekstistä tehtävä korostus, ei erillinen kuulotesti."),
 h("harald-origin",LOS1_C06_HARALD_TEXT,"Ich komme ursprünglich aus München.",
  "Korosta Haraldin autenttisesta haastattelutekstistä hänen lähtökaupunkinsa.",
  "Harald ilmoittaa Münchenin lähtöpaikakseen."),
];
