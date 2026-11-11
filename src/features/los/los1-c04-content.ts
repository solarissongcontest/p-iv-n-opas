/** C04 structured original LOS! teaching content, with licensed separate Text B.
 * M-DIB-07 Text B uses ONLY six human-authored German source question
 * phrases from Deutsch im Blick 2017 Kapitel 1 PDF p.20/484 (PDF page 6).
 * The exact source item is a printed LIST of questions, NOT a fictional
 * dialogue or recording. No actual phone number is reproduced.
 * Source: https://coerll.utexas.edu/dib/pdfs/k_01.pdf
 * Original PDF content licensed CC BY 4.0; LOS! translations are additions.
 */
import type {ContentBlock,Exercise} from "./model";

export const LOS1_C04_DIB_FORMAL_QUESTIONS=[
  {de:"Wie heißen Sie?",fi:"Mikä teidän nimenne on?",noteFi:"C04:n tärkein aktiivinen kysymys."},
  {de:"Woher kommen Sie?",fi:"Mistä te olette kotoisin?",noteFi:"C03:n kysymyksen kohtelias versio."},
  {de:"Wie alt sind Sie?",fi:"Kuinka vanha te olette?",noteFi:"Tunnista, ikärakenteet opiskellaan C06:ssa."},
  {de:"Wie lautet Ihre Telefonnummer?",fi:"Mikä teidän puhelinnumeronne on?",noteFi:"Tunnistamista varten. Älä kirjoita oikeita henkilökohtaisia puhelinnumeroita."},
  {de:"Was ist Ihre Lieblingsfarbe?",fi:"Mikä on teidän lempivärinne?",noteFi:"Tunnista, tämän rakenteen itsenäistä käyttöä ei vaadita."},
  {de:"Warum?",fi:"Miksi?",noteFi:"Tunnista kysymyssana; ei vielä aktiivinen testitavoite."},
] as const;
export const LOS1_C04_BLOCKS:ContentBlock[]=[
  {
    id:"los1-c04-orientation",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Osaat jo kysyä nimen ja kotipaikan sinutellen. Nyt tunnistat ja käytät kohteliasta puhuttelua: "
      +"du on tuttavallinen 'sinä' ja Sie on kohtelias 'te'. Saksassa puhuttelumuoto riippuu "
      +"tilanteesta, suhteen läheisyydestä ja joskus myös paikallisesta tavasta. "
      +"Pelkkä ikä ei ratkaise, käytetäänkö du vai Sie. "
      +"Harjoittele erityisesti Wie heißen Sie? ja Woher kommen Sie?.",
  },
  {
    id:"los1-c04-grammar-pronouns",version:"0.1.0",kind:"grammar",
    title:"du ja Sie · Tuttavallinen vai kohtelias?",
    explanationFi:"Du on tuttavallinen yksikön 'sinä'. Sie isolla S:llä on kohtelias teitittelymuoto, "
      +"jota voidaan käyttää yhdelle tai useammalle henkilölle. "
      +"Sie kirjoitetaan teitittelyssä isolla alkukirjaimella myös lauseen keskellä. "
      +"Tuttavalliset du ja ihr kirjoitetaan tavallisesti pienellä, paitsi virkkeen alussa. "
      +"Sana sie pienellä voi tarkoittaa 'hän' naisesta tai 'he'. "
      +"Pelkkä iso alkukirjain virkkeen alussa ei siksi aina yksin ratkaise merkitystä, "
      +"vaan myös verbi ja asiayhteys auttavat. "
      +"Uudelle aikuiselle vieraalle tai muodollisessa asiakastilanteessa Sie on usein "
      +"turvallinen lähtökohta. Nuorten välillä du on yleinen, mutta käytäntö vaihtelee.",
    examples:[
      {de:"Wie heißt du?",fi:"Mikä sinun nimesi on? · tuttu"},
      {de:"Wie heißen Sie?",fi:"Mikä teidän nimenne on? · kohtelias"},
      {de:"Woher kommst du?",fi:"Mistä sinä olet kotoisin? · tuttu"},
      {de:"Woher kommen Sie?",fi:"Mistä te olette kotoisin? · kohtelias"},
      {de:"Er heißt Ben.",fi:"Hänen nimensä on Ben. · kolmas persoona"},
      {de:"Sie ist Lena.",fi:"Hän on Lena. Virkkeen alun Sie tarkoittaa tässä 'hän'."},
    ],
  },
  {
    id:"los1-c04-grammar-verbs",version:"0.1.0",kind:"grammar",
    title:"heißen ja kommen · Kohtelias verbimuoto",
    explanationFi:"C02:ssa opit du heißt ja C03:ssa du kommst. "
      +"Kohteliaassa muodossa verbi on heißen ja kommen -verbien kohdalla "
      +"samanmuotoinen kuin perusmuoto: Sie heißen, Sie kommen. "
      +"Kysymyksissä käytetään Wie heißen Sie? ja Woher kommen Sie?. "
      +"Älä kirjoita Sie heißt tai Sie kommst teitittelyyn. "
      +"Kohtelias vastaus itsestäsi pysyy ennallaan: Ich heiße … ja Ich komme aus … "
      +"Tavallisessa kysymyksessä verbi tulee ennen Sie-pronominia.",
    examples:[
      {de:"Du heißt Greta. → Sie heißen Greta.",fi:"Sinun nimesi on Greta. → Teidän nimenne on Greta."},
      {de:"Du kommst aus Kiel. → Sie kommen aus Kiel.",fi:"Sinä tulet Kielistä. → Te tulette Kielistä."},
      {de:"Wie heißen Sie?",fi:"Mikä teidän nimenne on?"},
      {de:"Woher kommen Sie?",fi:"Mistä te olette kotoisin?"},
      {de:"Ich heiße Greta.",fi:"Minun nimeni on Greta."},
    ],
  },
  {
    id:"los1-c04-grammar-table",version:"0.1.0",kind:"table",
    headers:["Tuttu (du)","Kohtelias (Sie)","Suomeksi"],
    rows:[
      ["Wie heißt du?","Wie heißen Sie?","Mikä nimesi / nimenne on?"],
      ["Woher kommst du?","Woher kommen Sie?","Mistä olet / olette kotoisin?"],
      ["Du kommst aus Finnland.","Sie kommen aus Finnland.","Tulet / tulette Suomesta."],
      ["Du heißt Lena.","Sie heißen Lena.","Nimesi / nimenne on Lena."],
    ],
  },
  {
    id:"los1-c04-grammar-ihnen",version:"0.1.0",kind:"grammar",
    title:"Wie geht es Ihnen? · Kokonainen kohteliaisuusfraasi",
    explanationFi:"Wikibooksin alkuperäistekstissä molemmat puhujat kysyvät vointia "
      +"ilmauksella Wie geht es Ihnen? ('Mitä teille kuuluu?'). "
      +"Ihnen tarkoittaa tässä 'teille' tai 'teidän' ilmaisun rakenteesta riippuen; "
      +"sen sijamuototaivutusta ei vielä tarvitse hallita. "
      +"Kohtelias vastaus voi olla Danke, gut. tai Es geht mir gut. "
      +"Lisää vointifraaseja opetellaan C05:ssa.",
    examples:[
      {de:"Wie geht es Ihnen?",fi:"Mitä teille kuuluu?"},
      {de:"Danke, gut.",fi:"Kiitos, hyvää."},
      {de:"Und Ihnen?",fi:"Entä teille?"},
      {de:"Auf Wiedersehen!",fi:"Näkemiin!"},
    ],
  },
  {
    id:"los1-c04-vocabulary",version:"0.1.0",kind:"vocabulary",
    entries:([
      ["Sie","te (kohtelias)","aina iso S teitittelyssä"],
      ["wie heißen Sie?","mikä teidän nimenne on?","virkkeessä ensimmäinen kirjain iso"],
      ["Woher kommen Sie?","mistä te olette kotoisin?","verbin muoto kommen"],
      ["Entschuldigung!","anteeksi","huomion herättämiseen"],
      ["bitte schön","olkaa hyvä","kohteliaisuusfraasi"],
      ["danke schön","kiitos paljon","kohteliaisuusfraasi"],
      ["vielen Dank","paljon kiitoksia","kohteliaisuusfraasi"],
      ["gern","mielelläni","tunnistettava fraasissa"],
      ["die Entschuldigung","anteeksipyyntö","substantiivi, iso alkukirjain"],
      ["mein","minun","ensimmäinen omistusmuoto"],
      ["Ihr","teidän (kohtelias)","esim. Ihr Name"],
      ["Ihr Name","teidän nimenne","kohtelias ilmaus"],
      ["die Lehrerin","opettaja (nainen)","tunnistamiseksi"],
      ["der Lehrer","opettaja (mies)","tunnistamiseksi"],
    ] as [string,string,string][]).map(([de,fi,note],i)=>({
      id:"los1-c04-word-"+String(i+1).padStart(2,"0"),de,fi,note,
    })),
  },
  {
    id:"los1-c04-review-words",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Guten Tag! ja Auf Wiedersehen! ovat tuttuja jo C01:stä. "
      +"Niitä käytetään C04:ssa uudelleen kohteliaissa tilanteissa, "
      +"mutta niitä ei lasketa uusiksi sanastokorteiksi. "
      +"Sanastoharjoituksessa mukana on nyt 14 aidosti uutta ydinkorttia.",
  },
  {
    id:"los1-c04-text-b-guide",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Text B sisältää toisen ihmisten kirjoittaman alkuperäislähteen: "
      +"Texasin yliopiston Deutsch im Blick -oppimateriaalin kuusi muodollista kysymystä. "
      +"Tämä on painetun harjoituksen kysymyslista, ei keksitty keskustelu eikä äänilitteraatti. "
      +"Listan ensimmäiset kaksi kysymystä kuuluvat C04:n aktiivisiin tavoitteisiin; "
      +"ikää, puhelinnumeroa ja lempiväriä koskevat kysymykset ovat vain tunnistamista varten. "
      +"Kysymyksiä ei tarvitse vastata omilla oikeilla henkilötiedoilla. "
      +"Koko kuuden ilmauksen saksankielinen lista on kirjoitettu LOS!:iin.",
  },
  {
    id:"los1-c04-dib-07-list",version:"1.0.0",kind:"transcript",sourceId:"M-DIB-07",
    lines:LOS1_C04_DIB_FORMAL_QUESTIONS.map(line=>({...line})),
  },
  {
    id:"los1-c04-greetings-audio-guide",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Kuuntele lisäksi C01:stä tuttu alkuperäinen tervehdyksien ääniluettelo. "
      +"Se on oikean ihmisen nauhoittama public domain -äänite ja sisältää myös kohteliaan "
      +"hyvästelyn Auf Wiedersehen. Se ei ole Text B:n kysymyslistan ääniversio. "
      +"Jos et voi soittaa ääntä, voit lukea kaikki sen 20 ilmausta alkuperäistekstinä.",
  },
  {
    id:"los1-c04-greetings-audio",version:"1.0.0",kind:"media",mediaType:"audio",
    sourceId:"M-COM-03",title:"Tervehdysten ja hyvästelyjen alkuperäinen ääni (28 s)",
    embedUrl:"https://upload.wikimedia.org/wikipedia/commons/b/bb/German_Vocabulary_-_Greetings.ogg",
    mp3Url:"https://upload.wikimedia.org/wikipedia/commons/transcoded/b/bb/German_Vocabulary_-_Greetings.ogg/German_Vocabulary_-_Greetings.ogg.mp3",
  },
  {
    id:"los1-c04-greetings-raw",version:"1.0.0",kind:"transcript",sourceId:"M-COM-03",
    lines:[
      {de:"Hallo!",fi:"Hei!"},{de:"Servus!",fi:"Hei!"},{de:"Moin!",fi:"Moi!"},
      {de:"Moin Moin!",fi:"Moi moi!"},{de:"Guten Morgen!",fi:"Hyvää huomenta!"},
      {de:"Morgen!",fi:"Huomenta!"},{de:"Guten Tag!",fi:"Päivää!"},{de:"Tag!",fi:"Päivää!"},
      {de:"Guten Abend!",fi:"Hyvää iltaa!"},{de:"Grüß Gott!",fi:"Päivää!"},
      {de:"Auf Wiedersehen!",fi:"Näkemiin!"},{de:"Wiedersehen!",fi:"Näkemiin!"},
      {de:"Tschüss!",fi:"Hei hei!"},{de:"Tschau!",fi:"Moikka!"},
      {de:"Servus!",fi:"Hei hei!"},{de:"Bis später!",fi:"Nähdään myöhemmin!"},
      {de:"Bis dann!",fi:"Nähdään sitten!"},{de:"Bis bald!",fi:"Nähdään pian!"},
      {de:"Bis gleich!",fi:"Nähdään kohta!"},{de:"Gute Nacht!",fi:"Hyvää yötä!"},
    ],
  },
  {
    id:"los1-c04-application-guide",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Käytä nyt saksaa itse. Kirjoita kaksi erillistä lyhyttä kohtaamista: "
      +"yksi tutulle nuorelle du-muodossa ja toinen vieraalle aikuiselle Sie-muodossa. "
      +"Käytä samoja kysymyksiä molemmissa ja huomaa verbin muuttuminen. "
      +"Älä kirjoita oikean henkilön yhteystietoja tai muita tunnistetietoja. "
      +"Avaa mallivastaus vasta, kun olet kirjoittanut omat tekstisi.",
  },
  {
    id:"los1-c04-production-du",version:"0.1.0",kind:"production",
    titleFi:"Tuttavallinen kohtaaminen",
    promptFi:"Kirjoita lyhyt dialogi tuttavalle. Tervehdi, kysy nimi ja kysy lähtöpaikka du-muodossa.",
    modelDe:"Hallo! Wie heißt du? Woher kommst du? Bis später!",
    modelFi:"Hei! Mikä sinun nimesi on? Mistä olet kotoisin? Nähdään myöhemmin!",
    criteriaFi:[
      "Aloitin arkisella tervehdyksellä.",
      "Käytin kysymyksissä muotoja heißt du ja kommst du.",
      "Tarkistin kysymysmerkit ja sanajärjestyksen.",
    ],
  },
  {
    id:"los1-c04-production-sie",version:"0.1.0",kind:"production",
    titleFi:"Kohtelias kohtaaminen",
    promptFi:"Kirjoita kohtelias dialogi vieraalle aikuiselle. Tervehdi, kysy nimi ja lähtöpaikka Sie-muodossa.",
    modelDe:"Guten Tag! Wie heißen Sie? Woher kommen Sie? Auf Wiedersehen!",
    modelFi:"Hyvää päivää! Mikä teidän nimenne on? Mistä olette kotoisin? Näkemiin!",
    criteriaFi:[
      "Aloitin kohteliaalla tervehdyksellä.",
      "Kirjoitin Sie isolla ja käytin muotoja heißen Sie ja kommen Sie.",
      "Lopetin kohteliaaseen hyvästelyyn.",
    ],
  },
  {
    id:"los1-c04-culture",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Saksankielisillä alueilla du- ja Sie-muotojen valintaan vaikuttavat "
      +"tilanne, suhteen läheisyys, työ- tai oppilaitoskulttuuri ja joskus paikalliset tavat. "
      +"Monet nuoret sinuttelevat toisiaan, mutta koulussa tai asiakaspalvelussa "
      +"käytäntöä ei voi aina päätellä henkilön iästä. "
      +"Kohtelias Sie on tavallinen silloin, kun et tunne aikuista puhuteltavaa ja tilanne on muodollinen. "
      +"Puhetapa voi muuttua tuttavuuden myötä; muodollisemman suhteen muuttumista "
      +"sinutteluksi ei kuitenkaan tarvitse automaattisesti olettaa. "
      +"Keskity tässä kappaleessa valitsemaan tilanteeseen sopiva turvallinen aloitus, "
      +"älä yleistämään jokaisesta saksankielisestä ihmisestä samaa sääntöä.",
  },
  {
    id:"los1-c04-culture-summary",version:"0.1.0",kind:"table",
    headers:["Tilanne (esimerkki)","Mahdollinen puhuttelu","Miksi?"],
    rows:[
      ["Keskustelet tutun samanikäisen kanssa","du","Tuttavallinen suhde"],
      ["Kysyt palvelua vieraalta aikuiselta","Sie","Kohtelias, muodollinen aloitus"],
      ["Tapaat uuden esimiehen töissä","Usein Sie, mutta työpaikasta riippuu","Organisaation käytännöt vaihtelevat"],
      ["Keskustelet opettajan kanssa","Vaihtelee ympäristön ja käytännön mukaan","Koulun toimintatavat eivät ole kaikkialla samanlaisia"],
    ],
  },
];
