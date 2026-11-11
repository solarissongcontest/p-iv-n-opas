/** C05 genuine Text A: all four turns from the human-edited
 * Wikibooks German/Lesson 1 "Gespräch 1-1 ~ Die Freunde" (Heinrich & Karl).
 * Exact source page revision is https://en.wikibooks.org/w/index.php?title=German/Lesson_1&oldid=3823655
 * Wikibooks contributors publish article text CC BY-SA 4.0.
 * German turns are unchanged; Finnish line translations and teaching
 * apparatus are new LOS! contributions.
 * No fictional audio is attached to this Wikibooks dialogue.
 */
import type {ContentBlock,Exercise} from "./model";

export const LOS1_C05_AUTHENTIC_TURNS=[
  {speaker:"Heinrich",text:"Guten Tag, Karl. Wie geht es dir?",translationFi:"Hyvää päivää, Karl. Mitä sinulle kuuluu?"},
  {speaker:"Karl",text:"Guten Tag. Danke, mir geht es gut. Und dir?",translationFi:"Päivää. Kiitos, minulle kuuluu hyvää. Entä sinulle?"},
  {speaker:"Heinrich",text:"Danke, mir geht es gut. Auf Wiedersehen.",translationFi:"Kiitos, minulle kuuluu hyvää. Näkemiin."},
  {speaker:"Karl",text:"Auf Wiedersehen!",translationFi:"Näkemiin!"},
] as const;
export const LOS1_C05_AUTHENTIC_TEXT=LOS1_C05_AUTHENTIC_TURNS.map(row=>row.text).join("\n");
const phrase="Wie geht es dir?";
const start=LOS1_C05_AUTHENTIC_TEXT.indexOf(phrase);

export const LOS1_C05_SOURCE_BLOCKS:ContentBlock[]=[
  {
    id:"los1-c05-text-a-guide",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Päätekstinä on oikeiden ihmisten Wikibooksiin kirjoittama, kokonainen neljän repliikin keskustelu "
      +"Heinrichin ja Karlin välillä. Ystävät tapaavat kadulla, tervehtivät ja kysyvät vointia. "
      +"Lue saksankielinen teksti kokonaan ja avaa suomennokset vain tarvittaessa. "
      +"Poimi ensin Wie geht es dir?, mir geht es gut ja Und dir?. "
      +"Toisin kuin C04:n muodollinen työpaikkadialogi, tässä ystävykset puhuttelevat "
      +"toisiaan tutun dir-muodon avulla. Tekstin saksankieliset neljä repliikkiä "
      +"ovat alkuperäiset; selitykset ja käännökset LOS!:n omia.",
  },
  {
    id:"los1-c05-wb-05-dialogue",version:"1.0.0",kind:"dialogue",
    sourceId:"M-WB-05",turns:LOS1_C05_AUTHENTIC_TURNS.map(row=>({...row})),
  },
  {
    id:"los1-c05-text-a-support",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Heinrich kysyy Wie geht es dir?. Karl vastaa Danke, mir geht es gut. "
      +"Myös Heinrich voi hyvin. Keskustelu päättyy tuttuihin sanoihin Auf Wiedersehen. "
      +"Älä opettele mir- tai dir-sanojen koko sijataivutusta. "
      +"Riittää, että ymmärrät kokonaiset fraasit ja osaat käyttää niitä.",
  },
];
const base={version:"0.1.0",difficulty:"guided" as const,objectives:["L1-INT-05","L1-READ-01"]};
export const LOS1_C05_SOURCE_EXERCISES:Exercise[]=[
  {
    ...base,id:"los1-c05-source-people",type:"single-choice",
    promptFi:"Ketkä keskustelevat Wikibooksin alkuperäisessä Text A:ssa?",
    options:[{id:"right",label:"Heinrich ja Karl"},{id:"b",label:"Franz ja Greta"},{id:"c",label:"Herr Schmidt ja Herr Standish"}],
    correctOptionId:"right",explanationFi:"Lähteen alkuperäinen dialogi käydään Heinrichin ja Karlin välillä.",
  },
  {
    ...base,id:"los1-c05-source-question",type:"single-choice",
    promptFi:"Mitä Heinrich kysyy Karlilta ensimmäisessä repliikissä?",
    options:[{id:"name",label:"Mikä sinun nimesi on?"},{id:"mood",label:"Mitä sinulle kuuluu?"},{id:"place",label:"Mistä olet kotoisin?"}],
    correctOptionId:"mood",explanationFi:"Wie geht es dir? on tuttavallinen vointikysymys.",
  },
  {
    ...base,id:"los1-c05-source-feeling",type:"single-choice",
    promptFi:"Mitä Karl vastaa omasta voinnistaan?",
    options:[{id:"well",label:"Hän voi hyvin."},{id:"tired",label:"Hän on väsynyt."},{id:"bad",label:"Hänellä menee huonosti."}],
    correctOptionId:"well",explanationFi:"Karl vastaa: Danke, mir geht es gut.",
  },
  {
    ...base,id:"los1-c05-source-reaction",type:"single-choice",
    promptFi:"Miten Heinrich kuvaa omaa vointiaan?",
    options:[{id:"well",label:"Hän voi hyvin."},{id:"bad",label:"Hän voi huonosti."},{id:"unknown",label:"Hän ei vastaa."}],
    correctOptionId:"well",explanationFi:"Heinrich vastaa myös mir geht es gut.",
  },
  {
    ...base,id:"los1-c05-source-highlight",type:"highlight",
    blockId:"los1-c05-wb-05-dialogue",promptFi:"Korosta alkuperäisestä tekstistä ensimmäinen Wie geht es dir? -kysymys.",
    text:LOS1_C05_AUTHENTIC_TEXT,acceptedRanges:[{start,end:start+phrase.length}],
    explanationFi:"Wie geht es dir? on Heinrichin ystävälle esittämä vointikysymys.",
  },
];
