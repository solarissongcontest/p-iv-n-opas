/** LOS! 1 C04 authentic human Text A.
 * Wikibooks German/Lesson 2, Gespräch 2-2 "Die Geschäftsmänner",
 * Herr Schmidt–Herr Standish. Eight full German turns in original order.
 * https://en.wikibooks.org/wiki/German/Lesson_2
 * Community contributors: CC BY-SA 4.0 (and GFDL).
 * https://en.wikibooks.org/wiki/Wikibooks:Copyrights
 * No source lines have been shortened or modernized. Finnish translations,
 * bridge explanations and test tasks are new LOS! editorial contributions.
 * The source does not identify a licensed associated audio file. None is
 * fabricated, copied or advertised as part of Text A.
 */
import type { ContentBlock, Exercise } from "./model";

export const LOS1_C04_AUTHENTIC_TURNS = [
  { speaker:"Herr Schmidt", text:"Guten Morgen, Herr Standish! Wie geht es Ihnen?", translationFi:"Hyvää huomenta, herra Standish! Mitä teille kuuluu?" },
  { speaker:"Herr Standish", text:"Danke sehr, es geht mir gut. Und Ihnen?", translationFi:"Paljon kiitoksia, minulle kuuluu hyvää. Entä teille?" },
  { speaker:"Herr Schmidt", text:"Nicht so gut. Ich bin müde.", translationFi:"Ei kovin hyvää. Olen väsynyt." },
  { speaker:"Herr Standish", text:"Wie bitte? Müde? Warum?", translationFi:"Anteeksi kuinka? Väsynyt? Miksi?" },
  { speaker:"Herr Schmidt", text:"Ich habe so viel Arbeit.", translationFi:"Minulla on niin paljon töitä." },
  { speaker:"Herr Standish", text:"Das kann ich verstehen. Zu viel ist zu viel.", translationFi:"Voin ymmärtää sen. Liika on liikaa." },
  { speaker:"Herr Schmidt", text:"Das ist richtig. Auf Wiedersehen, Herr Standish!", translationFi:"Se on totta. Näkemiin, herra Standish!" },
  { speaker:"Herr Standish", text:"Auf Wiedersehen, bis morgen.", translationFi:"Näkemiin, huomiseen." },
] as const;
export const LOS1_C04_AUTHENTIC_TEXT = LOS1_C04_AUTHENTIC_TURNS.map(line=>line.text).join("\n");
const quote="Wie geht es Ihnen?";
const start=LOS1_C04_AUTHENTIC_TEXT.indexOf(quote);

export const LOS1_C04_SOURCE_BLOCKS:ContentBlock[]=[
  {
    id:"los1-c04-text-a-guide",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Tässä on Wikibooksin julkaistu, oikeiden ihmisten kirjoittama kahdeksan repliikin keskustelu. "
      +"Lue koko saksankielinen alkuperäisteksti LOS!:ssa ja avaa suomennokset tarpeen mukaan. "
      +"Puhujat ovat Herr Schmidt ja Herr Standish, ja keskustelu käydään työpaikalla. "
      +"Tässä kappaleessa tehtävänäsi on tunnistaa kohtelias puhuttelu, Guten Morgen, "
      +"Wie geht es Ihnen? ja Auf Wiedersehen. Työasioiden vaikeita verbirakenteita "
      +"Ich habe so viel Arbeit ja Das kann ich verstehen ei vielä tarvitse osata tuottaa. "
      +"Lähteen vieressä näytetään tekijäyhteisö, CC BY-SA -lisenssi ja lähdeosoite.",
  },
  {
    id:"los1-c04-wb-06-dialogue",version:"1.0.0",kind:"dialogue",
    sourceId:"M-WB-06",turns:LOS1_C04_AUTHENTIC_TURNS.map(line=>({...line})),
  },
  {
    id:"los1-c04-text-a-followup",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Molemmat puhujat käyttävät kohteliasta puhuttelua, esimerkiksi Und Ihnen? "
      +"Ihnen tarkoittaa tässä 'teille' eikä ole vielä itsenäisesti taivutettava uusi pronomini. "
      +"Sen voi opetella fraasina Wie geht es Ihnen?. "
      +"Keskustelun loppu Auf Wiedersehen, bis morgen. sisältää jo C01:ssa "
      +"opittua hyvästelyä. Kertaa tuttu fraasi, vaikka et ymmärtäisi kaikkea työstä puhumista.",
  },
];

const base={version:"0.1.0",difficulty:"guided" as const,objectives:["L1-INT-04","L1-CULT-01"]};
export const LOS1_C04_SOURCE_EXERCISES:Exercise[]=[
  {
    ...base,id:"los1-c04-source-pair",type:"single-choice",
    promptFi:"Ketkä ovat koko Text A -lähdedialogin puhujat?",
    options:[{id:"business",label:"Herr Schmidt ja Herr Standish"},{id:"friends",label:"Franz ja Greta"},{id:"other",label:"Lena ja Ben"}],
    correctOptionId:"business",explanationFi:"Keskustelu käydään herra Schmidtin ja herra Standishin kesken.",
  },
  {
    ...base,id:"los1-c04-source-formal",type:"single-choice",
    promptFi:"Mikä ilmaus osoittaa kohteliasta puhuttelua Text A:ssa?",
    options:[{id:"formal",label:"Wie geht es Ihnen?"},{id:"hi",label:"Hallo!"},{id:"informal",label:"Wie geht's dir?"}],
    correctOptionId:"formal",explanationFi:"Wie geht es Ihnen? on kohtelias vointikysymys.",
  },
  {
    ...base,id:"los1-c04-source-tired",type:"single-choice",
    promptFi:"Mitä Herr Schmidt kertoo voinnistaan?",
    options:[{id:"tired",label:"Hän on väsynyt."},{id:"hungry",label:"Hän on nälkäinen."},{id:"happy",label:"Hän on erittäin iloinen."}],
    correctOptionId:"tired",explanationFi:"Schmidt sanoo Ich bin müde. Tähän riittää repliikin tunnistaminen.",
  },
  {
    ...base,id:"los1-c04-source-goodbye",type:"single-choice",
    promptFi:"Millä ilmauksella keskustelu päättyy?",
    options:[{id:"tomorrow",label:"Auf Wiedersehen, bis morgen."},{id:"night",label:"Gute Nacht!"},{id:"morning",label:"Guten Morgen!"}],
    correctOptionId:"tomorrow",explanationFi:"Standish päättää keskustelun hyvästelyyn Auf Wiedersehen, bis morgen.",
  },
  {
    ...base,id:"los1-c04-source-highlight",type:"highlight",
    blockId:"los1-c04-wb-06-dialogue",
    promptFi:"Korosta alkuperäislähteestä ensimmäinen kohtelias kysymys Wie geht es Ihnen?.",
    text:LOS1_C04_AUTHENTIC_TEXT,
    acceptedRanges:[{start,end:start+quote.length}],
    explanationFi:"Ensimmäisessä repliikissä Herr Schmidt kysyy Wie geht es Ihnen?.",
  },
];
