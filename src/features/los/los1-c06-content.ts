/** C06 original Finnish pedagogy + complete human-recorded PD number list.
 * 37-second Commons German Vocabulary - Numbers.ogg, Human Robot,
 * https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Numbers.ogg
 * Public domain, 23 July 2006, original human-created with a slightly
 * altered voice. It is a NUMBER LIST, not a roleplay or COERLL recording.
 * The audio transcript does not contain "null", "achtzig" or "neunzig".
 * Those words are covered in independently authored tables instead.
 */
import type {ContentBlock} from "./model";
import {C06_ZERO_TO_TWENTY,C06_TENS,C06_EXAMPLE_COMPOUNDS} from "./numbers.ts";

const recordedNumbers=[
  ...C06_ZERO_TO_TWENTY.slice(1).map(entry=>entry.de),
  "dreißig","vierzig","fünfzig","sechzig","siebzig","hundert","tausend",
];
export const LOS1_C06_AUTHENTIC_NUMBER_LIST=recordedNumbers as readonly string[];
export const LOS1_C06_CONTENT_BLOCKS:ContentBlock[]=[
  {
    id:"los1-c06-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Tervetuloa numerokappaleeseen. Osaat jo kertoa nimesi, kotipaikkasi ja vointisi. "
      +"Nyt harjoittelet laskemista nollasta kahteenkymmeneen ja opit kertomaan "
      +"kuvitteellisen hahmon iän. Opettele numerot 0–20 aktiivisesti, "
      +"kymmenluvut 30–100 tunnistettavasti sekä 21–99-lukujen sanajärjestys. "
      +"C06 hyödyntää C01:n aitoa ikädialogia uudestaan ja vertailee sitä "
      +"Haraldin erilliseen autenttiseen haastatteluun. "
      +"Sinun ei tarvitse kertoa omaa oikeaa ikääsi tai henkilötietojasi.",
  },
  {
    id:"los1-c06-intro-zeros",version:"0.1.0",kind:"grammar",
    title:"Zahlen · Numerot 0–12",
    explanationFi:"Opettele ensin nolla ja yksinumeroiset luvut. Saksaksi "
      +"null on nolla ja eins on yksi. Vieraita kirjoitusasuja ovat esimerkiksi "
      +"zwei, fünf ja zwölf. Kymmenen on zehn, yksitoista elf ja kaksitoista zwölf. "
      +"Kuuntele alkuperäinen ihmisen lausuma numerosarja ja seuraa taulukkoa. "
      +"Älä yritä yhdistellä numeroita vapaasti ennen 21–99-säännön opettelua.",
    examples:[
      {de:"null",fi:"0 · nolla"},
      {de:"eins",fi:"1 · yksi"},
      {de:"zwei",fi:"2 · kaksi"},
      {de:"fünf",fi:"5 · viisi"},
      {de:"zehn",fi:"10 · kymmenen"},
      {de:"elf",fi:"11 · yksitoista"},
      {de:"zwölf",fi:"12 · kaksitoista"},
    ],
  },
  {
    id:"los1-c06-zero-twelve-table",version:"0.1.0",kind:"table",
    headers:["Numero","Saksaksi","Suomeksi"],
    rows:C06_ZERO_TO_TWENTY.slice(0,13).map(({n,de})=>[String(n),de,
      ["nolla","yksi","kaksi","kolme","neljä","viisi","kuusi","seitsemän","kahdeksan","yhdeksän",
       "kymmenen","yksitoista","kaksitoista"][n]!]),
  },
  {
    id:"los1-c06-teen-grammar",version:"0.1.0",kind:"grammar",
    title:"Dreizehn … zwanzig · Numerot 13–20",
    explanationFi:"13–19 muodostetaan pääosin luvun alkuosasta ja sanasta zehn: "
      +"dreizehn (13), vierzehn (14), fünfzehn (15). "
      +"Kaksi tärkeää poikkeusta ovat sechzehn (16), ei sechszehn, "
      +"ja siebzehn (17), ei siebenzehn. "
      +"18 on achtzehn, 19 neunzehn ja 20 zwanzig. "
      +"Luvut kirjoitetaan yhtenä sanana. "
      +"Opettele nämä muistista, koska niiden pohjalta muodostetaan myöhemmin myös kymmenlukuja.",
    examples:[
      {de:"dreizehn",fi:"13"},
      {de:"vierzehn",fi:"14"},
      {de:"fünfzehn",fi:"15"},
      {de:"sechzehn",fi:"16 · ei sechszehn"},
      {de:"siebzehn",fi:"17 · ei siebenzehn"},
      {de:"achtzehn",fi:"18"},
      {de:"neunzehn",fi:"19"},
      {de:"zwanzig",fi:"20"},
    ],
  },
  {
    id:"los1-c06-teens-table",version:"0.1.0",kind:"table",
    headers:["Numero","Kirjoitusasu"],
    rows:C06_ZERO_TO_TWENTY.slice(13).map(({n,de})=>[String(n),de]),
  },
  {
    id:"los1-c06-age-grammar",version:"0.1.0",kind:"grammar",
    title:"Wie alt bist du? · Kuinka vanha olet?",
    explanationFi:"Wie alt bist du? kysyy ikää tuttavallisesti. "
      +"Kohtelias muoto on Wie alt sind Sie?, sillä teitittelyn verbimuoto on sind. "
      +"Ikä kerrotaan saksassa olla-verbillä: Ich bin neunzehn Jahre alt. "
      +"Jahr tarkoittaa yhtä vuotta ja Jahre monikkoa. "
      +"Yleensä myös Ich bin neunzehn. ymmärretään, jos keskustelun aihe on ikä. "
      +"Älä muodosta lausetta Ich habe neunzehn Jahre, joka ei ole tässä "
      +"saksan vakiomuotoinen ikäilmaus. Käytä harjoituksissa keksittyjä nimiä ja ikiä.",
    examples:[
      {de:"Wie alt bist du?",fi:"Kuinka vanha olet? · tuttavallinen"},
      {de:"Wie alt sind Sie?",fi:"Kuinka vanha olette? · kohtelias"},
      {de:"Ich bin neunzehn Jahre alt.",fi:"Olen 19-vuotias."},
      {de:"Ich bin zwanzig.",fi:"Olen kaksikymmentävuotias."},
      {de:"Er ist sieben Jahre alt.",fi:"Hän on seitsemänvuotias (miehestä)."},
      {de:"Sie ist achtzehn Jahre alt.",fi:"Hän on 18-vuotias (naisesta)."},
    ],
  },
  {
    id:"los1-c06-compare-age",version:"0.1.0",kind:"table",
    headers:["Kuka?","Kysymys","Esimerkkivastaus"],
    rows:[
      ["Tuttava","Wie alt bist du?","Ich bin siebzehn Jahre alt."],
      ["Kohtelias","Wie alt sind Sie?","Ich bin dreißig Jahre alt."],
      ["Kolmas henkilö","Wie alt ist er / sie?","Er / sie ist zwölf Jahre alt."],
    ],
  },
  {
    id:"los1-c06-compound-grammar",version:"0.1.0",kind:"grammar",
    title:"Einundzwanzig · Luvut 21–100",
    explanationFi:"Saksan yhdyssanat ovat suomeen nähden erikoisessa järjestyksessä: "
      +"ykköset + und + kymmenet. 21 on einundzwanzig, "
      +"27 siebenundzwanzig ja 32 zweiunddreißig. "
      +"21–99 kirjoitetaan yhteen ilman välilyöntejä. "
      +"Yhden alussa eins menettää s-kirjaimen: einundzwanzig, ei einsundzwanzig. "
      +"30 on dreißig (ß), 60 sechzig (ei sechszig) ja 70 siebzig (ei siebenzig). "
      +"Täysi 100 on hundert tai einhundert. "
      +"Tässä kappaleessa kymmenluvut 30–100 ovat pääasiassa tunnistamista varten; "
      +"21–99:n muodostusmallia harjoitellaan lyhyillä esimerkeillä.",
    examples:[
      {de:"einundzwanzig",fi:"21 · yksi ja kaksikymmentä"},
      {de:"siebenundzwanzig",fi:"27"},
      {de:"zweiunddreißig",fi:"32"},
      {de:"sechsundvierzig",fi:"46"},
      {de:"einundsiebzig",fi:"71"},
      {de:"neunundneunzig",fi:"99"},
      {de:"hundert",fi:"100"},
    ],
  },
  {
    id:"los1-c06-tens-table",version:"0.1.0",kind:"table",
    headers:["Numero","Saksan kymmenluku","Opiskelu"],
    rows:C06_TENS.map(({n,de})=>[String(n),de,n===20?"Aktiivinen":"Tunnistettava"]),
  },
  {
    id:"los1-c06-compound-table",version:"0.1.0",kind:"table",
    headers:["Numero","Saksan yhdyssana"],
    rows:C06_EXAMPLE_COMPOUNDS.map(({n,de})=>[String(n),de]),
  },
  {
    id:"los1-c06-vocabulary",version:"0.1.0",kind:"vocabulary",
    entries:[
      ...C06_ZERO_TO_TWENTY.map(({n,de})=>({
        id:"los1-c06-word-"+String(n).padStart(2,"0"),
        de,fi:String(n)+" (numero)",note:"Numero 0–20, muista kirjoitusasu.",
      })),
      {id:"los1-c06-word-alt",de:"alt",fi:"vanha / iältään",note:"Wie alt bist du?"},
      {id:"los1-c06-word-jahr",de:"das Jahr",fi:"vuosi",note:"Yksikkö, esimerkiksi ein Jahr."},
      {id:"los1-c06-word-jahre",de:"die Jahre",fi:"vuodet",note:"Monikko, esimerkiksi neunzehn Jahre."},
      {id:"los1-c06-word-age",de:"Wie alt bist du?",fi:"kuinka vanha olet?",note:"Tuttavallinen kysymys."},
      {id:"los1-c06-word-ageformal",de:"Wie alt sind Sie?",fi:"kuinka vanha olette?",note:"Kohtelias kysymys."},
    ],
  },
  {
    id:"los1-c06-audio-guide",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Human Robotin vuoden 2006 public domain -äänitteessä luetellaan "
      +"numerot 1–20 ja sen jälkeen 30, 40, 50, 60, 70, 100 ja 1000. "
      +"Ääni on ihmisen tekemä mutta tekijän mukaan hieman muokattu: "
      +"sitä ei pidä markkinoida vahvistettuna natiivipuhujan muuttamattomana äänenä. "
      +"Äänitteessä EI lausuta nollaa, kahdeksaakymmentä eikä yhdeksääkymmentä. "
      +"Ne opetetaan taulukoissa erikseen. "
      +"Kuuntele kokonainen 37 sekunnin numerosarja ja seuraa alla olevaa alkuperäistä litteraattia. "
      +"Yksittäisille numeroille ei ole vielä leikattu omia hyväksyttyjä äänisegmenttejä, "
      +"joten niitä ei esitetä erillisiksi kuuntelutesteiksi.",
  },
  {
    id:"los1-c06-m-com-06-numbers-audio",version:"1.0.0",kind:"media",mediaType:"audio",
    title:"Zahlen 1–20, 30–70, 100, 1000 · alkuperäinen luettelo (37 s)",
    sourceId:"M-COM-06",
    embedUrl:"https://upload.wikimedia.org/wikipedia/commons/5/56/German_Vocabulary_-_Numbers.ogg",
    mp3Url:"https://upload.wikimedia.org/wikipedia/commons/transcoded/5/56/German_Vocabulary_-_Numbers.ogg/German_Vocabulary_-_Numbers.ogg.mp3",
  },
  {
    id:"los1-c06-m-com-06-transcript",version:"1.0.0",kind:"transcript",
    sourceId:"M-COM-06",
    lines:recordedNumbers.map((de,index)=>({de,fi:index<20?String(index+1):String([30,40,50,60,70,100,1000][index-20]!)})),
  },
  {
    id:"los1-c06-profile-guide",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Yhdistä ikä henkilöön. Alla olevat profiilit ovat LOS!:n itse keksimiä "
      +"kieliharjoituksia, eivät oikeiden ihmisten henkilötietoja. "
      +"Ikäilmausten harjoitusta varten kaikki iät ovat tarkoituksella "
      +"väliltä 0–100. Pidä erillään nimi, lähtöpaikka ja ikä.",
  },
  {
    id:"los1-c06-profile-table",version:"0.1.0",kind:"table",
    headers:["Kuvitteellinen henkilö","Ikä","Saksaksi"],
    rows:[
      ["Lena", "16","Lena ist sechzehn Jahre alt."],
      ["Ben", "18","Ben ist achtzehn Jahre alt."],
      ["Mila", "7","Mila ist sieben Jahre alt."],
      ["Paul", "27","Paul ist siebenundzwanzig Jahre alt."],
      ["Eva", "30","Eva ist dreißig Jahre alt."],
      ["Jonas", "21","Jonas ist einundzwanzig Jahre alt."],
    ],
  },
  {
    id:"los1-c06-apply-guide",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Kirjoita kaksi lyhyttä ikätilannetta: tuttu nuori kysyy toisen keksityn iän, "
      +"ja toinen henkilö kysyy ikää kohteliaasti. "
      +"Älä kirjoita oikeaa syntymäaikaasi, henkilötunnusta tai puhelinnumeroa. "
      +"Voit keksiä kaikki nimet ja numerot. "
      +"Tämän kirjoitusharjoituksen tarkistus on itsearvio, ei automaattinen kielitodistus.",
  },
  {
    id:"los1-c06-production-du",version:"0.1.0",kind:"production",
    titleFi:"Keksi tuttavallinen ikäkeskustelu",
    promptFi:"Kirjoita kaksi repliikkiä keksityistä henkilöistä: Wie alt bist du? ja Ich bin … Jahre alt.",
    modelDe:"A: Wie alt bist du?\nB: Ich bin siebzehn Jahre alt.",
    modelFi:"A: Kuinka vanha olet?\nB: Olen seitsemäntoistavuotias.",
    criteriaFi:["Käytin kysymystä Wie alt bist du?.","Kirjoitin saksan luvun oikein.","Kerroin iän bin-verbillä, en haben-verbillä."],
  },
  {
    id:"los1-c06-production-sie",version:"0.1.0",kind:"production",
    titleFi:"Kohtelias ikäkysymys keksityssä tilanteessa",
    promptFi:"Kirjoita kaksi repliikkiä keksityssä muodollisessa tilanteessa: Wie alt sind Sie? ja kuvitteellinen vastaus.",
    modelDe:"A: Wie alt sind Sie?\nB: Ich bin dreißig Jahre alt.",
    modelFi:"A: Kuinka vanha olette?\nB: Olen kolmekymmentävuotias.",
    criteriaFi:["Käytin kohteliaassa kysymyksessä sind Sie.","Kirjoitin Sie isolla alkukirjaimella.","Vastaus alkoi Ich bin."],
  },
  {
    id:"los1-c06-culture",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Ikää kysyessä on hyvä huomioida tilanne. Opetuskirjan kuvitteellisessa "
      +"keskustelussa Wie alt bist du? on kielioppiharjoitus, mutta oikeassa "
      +"elämässä ikää ei aina ole tarpeen kysyä eikä siihen tarvitse vastata. "
      +"Myös saksankielisillä alueilla yksityisyydestä ja kohteliaisuudesta "
      +"ajatellaan eri tavoin. Älä pyydä sovelluksessa oikean ihmisen "
      +"syntymäaikaa tai puhelinnumeroa. "
      +"Numerot tulevat myöhemmin vastaan myös kellonajoissa ja hinnoissa, "
      +"joten niitä kannattaa harjoitella ilman henkilökohtaisia tietoja.",
  },
  {
    id:"los1-c06-culture-table",version:"0.1.0",kind:"table",
    headers:["Tilanne","Hyvä valinta","Huomio"],
    rows:[
      ["Keksityn hahmon ikä", "Wie alt bist du?", "Harjoittelee sinuttelua."],
      ["Keksityn kohtelias ikäkysymys", "Wie alt sind Sie?", "Harjoittelee teitittelyä."],
      ["Oikea tuntematon henkilö", "Kysy ensin, onko ikätieto tarpeellinen", "Ikä voi olla yksityinen tieto."],
    ],
  },
];
