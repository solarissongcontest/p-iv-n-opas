/** LOS! C06 human-original age texts, with explicit reuse and rights.
 *
 * Text A is the COMPLETE unchanged eight-turn conversation from existing
 * M-COM-01 (Xzapro4 / Erkan Yilmaz, CC BY-SA 3.0) already used in C01.
 * C06 offers a different reading purpose, NOT a new primary source. A
 * genuinely distinct age primary Text A remains a chapter publication gate.
 *
 * Text B is the 14-turn Harald Becker interview from the human-written
 * COERLL/UT Deutsch im Blick original M-DIB-02:
 * https://coerll.utexas.edu/dib/vidt.php?f=01_22_int_hb_who
 * https://coerll.utexas.edu/coerll/oer/deutsch-im-blick/
 * CC BY 4.0; phone digits replaced by explicit privacy redaction.
 * Original time-dependent age is stated as "around fifty", NOT exactly fifty.
 * The regional "civilized part" remark is Harald's opinion, not a fact
 * endorsed by LOS!. The media VIDEO is NOT embedded until file-level QA.
 */
import type {ContentBlock,Exercise} from "./model";
import {LOS1_C01_DIALOGUE_TURNS,LOS1_C01_AUTHENTIC_TEXT} from "./los1-c01-source.ts";

const ageQuestion="Wie alt bist du?";
const ageAnswer="Ich bin neunzehn Jahre alt";
const qStart=LOS1_C01_AUTHENTIC_TEXT.indexOf(ageQuestion);
const aStart=LOS1_C01_AUTHENTIC_TEXT.indexOf(ageAnswer);
export const LOS1_C06_HARALD_TURNS=[
  {speaker:"Haastattelija",text:"Wie heißt du?",translationFi:"Mikä sinun nimesi on?"},
  {speaker:"Harald",text:"Ich heiße Harald Becker.",translationFi:"Minun nimeni on Harald Becker."},
  {speaker:"Haastattelija",text:"Woher kommst du?",translationFi:"Mistä olet kotoisin?"},
  {speaker:"Harald",text:"Ich komme ursprünglich aus München.",translationFi:"Olen alun perin kotoisin Münchenistä."},
  {speaker:"Haastattelija",text:"Aha, wo ist München?",translationFi:"Ahaa, missä München sijaitsee?"},
  {speaker:"Harald",text:"München ist im zivilisierten Teil Deutschlands, also in Süddeutschland.",translationFi:"München on Saksan 'sivistyneessä osassa', siis Etelä-Saksassa. Tämä on puhujan leikillinen mielipide, ei oppikirjan maantieteellinen luokittelu."},
  {speaker:"Haastattelija",text:"Aha. Wie alt bist du?",translationFi:"Ahaa. Kuinka vanha olet?"},
  {speaker:"Harald",text:"Ich bin jetzt so um die fünfzig.",translationFi:"Olen nyt suunnilleen viisikymppinen. Haastattelun aikainen arvio."},
  {speaker:"Haastattelija",text:"Um die fünfzig... Was ist deine Telefonnumer?",translationFi:"Noin viisikymmentä... Mikä on puhelinnumerosi? Lähteen kirjoitusasu Telefonnumer säilytetty."},
  {speaker:"Harald",text:"[Telefonnummer aus Datenschutzgründen entfernt.]",translationFi:"[Puhelinnumero poistettu yksityisyydensuojan vuoksi.]"},
  {speaker:"Haastattelija",text:"Hmh. Und was ist deine Lieblingsfarbe?",translationFi:"Entä mikä on lempivärisi?"},
  {speaker:"Harald",text:"Blau.",translationFi:"Sininen."},
  {speaker:"Haastattelija",text:"Warum Blau?",translationFi:"Miksi sininen?"},
  {speaker:"Harald",text:"Ahmh, das ist eine gute Frage. Vielleicht wegen Bayern, das ist auch eine der Farben Bayerns. Wegen dem bayerischen Himmel. Der Himmel ist blau.",translationFi:"Se on hyvä kysymys. Ehkä Baijerin vuoksi: sininen on yksi Baijerin väreistä. Baijerin taivaan vuoksi. Taivas on sininen."},
] as const;
export const LOS1_C06_HARALD_TEXT=LOS1_C06_HARALD_TURNS.map(x=>x.text).join("\n");
const fifty="Ich bin jetzt so um die fünfzig.";
const fiftyStart=LOS1_C06_HARALD_TEXT.indexOf(fifty);

export const LOS1_C06_SOURCE_BLOCKS:ContentBlock[]=[
  {
    id:"los1-c06-text-a-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Tämän luvun Text A on tietoinen kertaus: sama kahdeksan repliikin Franzin ja Jörgin "
      +"alkuperäinen keskustelu, jonka luit C01:ssä. Tämä EI ole toinen itsenäinen pääteksti. "
      +"Nyt keskityt ikäkysymykseen Wie alt bist du? sekä vastauksiin "
      +"Ich bin neunzehn Jahre alt ja Ich bin zwanzig. "
      +"Kaikki alkuperäiset repliikit ovat mukana suomennoksineen. "
      +"Julkaisuvalmista LOS! 1 -kirjaa varten C06 tarvitsee lisäksi toisen "
      +"ihmisen kirjoittaman erillisen uuden päätekstin.",
  },
  {
    id:"los1-c06-m-com-01-audio",version:"1.0.0",kind:"media",mediaType:"audio",
    title:"Franz ja Jörg · koko alkuperäinen 14 sekunnin dialogi",
    sourceId:"M-COM-01",
    embedUrl:"https://upload.wikimedia.org/wikipedia/commons/1/11/Gespr%C3%A4chVorstellung.ogg",
    mp3Url:"https://upload.wikimedia.org/wikipedia/commons/transcoded/1/11/Gespr%C3%A4chVorstellung.ogg/Gespr%C3%A4chVorstellung.ogg.mp3",
  },
  {
    id:"los1-c06-m-com-01-dialogue",version:"1.0.0",kind:"dialogue",
    sourceId:"M-COM-01",turns:LOS1_C01_DIALOGUE_TURNS.map(line=>({...line})),
  },
  {
    id:"los1-c06-text-a-followup",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Franz kertoo olevansa neunzehn Jahre alt eli yhdeksäntoistavuotias. "
      +"Jörg vastaa Ich bin zwanzig, joka on lyhyempi mutta oikea tapa kertoa olevansa 20-vuotias. "
      +"Lause Ich bin zwanzig Jahre alt on myös oikein. "
      +"Vastaukset kuvaavat äänitteen fiktiivisiä keskusteluhenkilöitä, "
      +"eivät tekijöiden tämänhetkisiä ikiä. Äänitteessä toinen puhujista "
      +"ei tiettävästi ole saksan natiivipuhuja; kyseessä on silti oikea "
      +"ihmisten tallentama alkuperäinen opetuskeskustelu.",
  },
  {
    id:"los1-c06-text-b-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Text B on uusi, eri ihmisen alkuperäinen haastattelu: Harald Becker esiintyy "
      +"Texasin yliopiston Deutsch im Blick -materiaalissa. "
      +"Koko lähteessä julkaistu saksankielinen kysymys–vastaussarja on luettavissa tässä. "
      +"Haastattelussa julkaistu puhelinnumero on poistettu näkyvästi. "
      +"Tekstissä on alkeistasoa vaikeampia ilmauksia, mutta vain nimi, kotipaikka ja ikä "
      +"ovat tämän kappaleen ymmärtämistavoitteita. "
      +"Harald sanoo olevansa suunnilleen viisikymppinen, EI täsmälleen 50-vuotias. "
      +"Alkuperäinen haastatteluvideo ja COERLL:n numerokuuntelut "
      +"eivät vielä ole hyväksyttyinä sisäiseen soittimeen.",
  },
  {
    id:"los1-c06-m-dib-02-dialogue",version:"1.0.0",kind:"dialogue",
    sourceId:"M-DIB-02",turns:LOS1_C06_HARALD_TURNS.map(line=>({...line})),
  },
  {
    id:"los1-c06-text-b-followup",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Harald vastaa ikäkysymykseen Ich bin jetzt so um die fünfzig. "
      +"Sanan viisikymmentä perusmuoto on fünfzig. "
      +"Ilmaus um die fünfzig kertoo arviosta, joten sen käyttö "
      +"ei tarkoita, että tiedämme haastateltavan tarkan iän. "
      +"Haraldin Müncheniä koskeva ilmaus 'Saksan sivistynyt osa' "
      +"on hänen oma humoristinen näkemyksensä. "
      +"Älä päättele siitä muiden saksalaisten asenteita.",
  },
];

const e={version:"0.1.0",difficulty:"guided" as const,objectives:["L1-NUM-01","L1-INT-06"]};
export const LOS1_C06_SOURCE_EXERCISES:Exercise[]=[
  {
    ...e,id:"los1-c06-text-a-people",type:"single-choice",promptFi:"Ketkä käyvät Text A:n kertauskeskustelun?",
    options:[{id:"a",label:"Franz ja Jörg"},{id:"b",label:"Harald ja Berna"},{id:"c",label:"Franz ja Greta"}],
    correctOptionId:"a",explanationFi:"Sama Franz–Jörg-keskustelu on mukana jo C01:ssä.",
  },
  {
    ...e,id:"los1-c06-text-a-franz",type:"single-choice",promptFi:"Minkä ikäinen Franz on C01:stä tutussa alkuperäisdialogissa?",
    options:[{id:"19",label:"19"},{id:"20",label:"20"},{id:"30",label:"30"}],
    correctOptionId:"19",explanationFi:"Franz sanoo Ich bin neunzehn Jahre alt.",
  },
  {
    ...e,id:"los1-c06-text-a-joerg",type:"single-choice",promptFi:"Minkä ikäinen Jörg kertoo olevansa?",
    options:[{id:"18",label:"18"},{id:"20",label:"20"},{id:"21",label:"21"}],
    correctOptionId:"20",explanationFi:"Jörg sanoo Ich bin zwanzig.",
  },
  {
    ...e,id:"los1-c06-text-a-highlight-age",type:"highlight",
    blockId:"los1-c06-m-com-01-dialogue",
    promptFi:"Korosta Franzin ikää ilmaiseva Ich bin neunzehn Jahre alt.",
    text:LOS1_C01_AUTHENTIC_TEXT,
    acceptedRanges:[{start:aStart,end:aStart+ageAnswer.length}],
    explanationFi:"Franz ilmoittaa ikänsä sanoilla Ich bin neunzehn Jahre alt.",
  },
  {
    ...e,id:"los1-c06-text-a-highlight-question",type:"highlight",
    blockId:"los1-c06-m-com-01-dialogue",
    promptFi:"Korosta Jörgin ikäkysymys Wie alt bist du?.",
    text:LOS1_C01_AUTHENTIC_TEXT,
    acceptedRanges:[{start:qStart,end:qStart+ageQuestion.length}],
    explanationFi:"Wie alt bist du? tarkoittaa 'Kuinka vanha olet?'.",
  },
  {
    ...e,id:"los1-c06-text-b-name",type:"single-choice",
    promptFi:"Mikä on uuden Text B -haastattelun henkilön nimi?",
    options:[{id:"h",label:"Harald Becker"},{id:"b",label:"Berna"},{id:"f",label:"Franz"}],
    correctOptionId:"h",explanationFi:"Haastateltava esittelee itsensä: Ich heiße Harald Becker.",
  },
  {
    ...e,id:"los1-c06-text-b-place",type:"single-choice",
    promptFi:"Mistä kaupungista Harald sanoo olevansa alkujaan kotoisin?",
    options:[{id:"m",label:"München"},{id:"k",label:"Kiel"},{id:"l",label:"Leipzig"}],
    correctOptionId:"m",explanationFi:"Harald sanoo tulevansa alun perin Münchenistä.",
  },
  {
    ...e,id:"los1-c06-text-b-age",type:"single-choice",
    promptFi:"Mitä Haraldin ikää koskeva vastaus tarkoittaa?",
    options:[{id:"a",label:"Hän on suunnilleen 50-vuotias."},
      {id:"b",label:"Hän on tarkalleen 50-vuotias."},
      {id:"c",label:"Hän on varmasti 15-vuotias."}],
    correctOptionId:"a",explanationFi:"So um die fünfzig on likimääräinen ilmaus.",
  },
  {
    ...e,id:"los1-c06-text-b-highlight",type:"highlight",
    blockId:"los1-c06-m-dib-02-dialogue",
    promptFi:"Korosta Haraldin alkuperäisestä litteraatista koko ikää kuvaava lause.",
    text:LOS1_C06_HARALD_TEXT,
    acceptedRanges:[{start:fiftyStart,end:fiftyStart+fifty.length}],
    explanationFi:"Ich bin jetzt so um die fünfzig. tarkoittaa, että puhuja on noin 50-vuotias.",
  },
];
