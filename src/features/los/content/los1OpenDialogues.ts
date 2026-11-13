/**
 * LOS! 1 authentic source dialogues from CC BY-SA 4.0 Wikibooks.
 * Each dialogue is an unabridged, unchanged human-authored published unit.
 * The Finnish glosses, translations and original LOS! questions are separate
 * derivative instructional aids. Attribution must stay visible in the reader.
 * Media files listed on the source pages are NOT imported or assumed licensed.
 * These are editorial previews awaiting German review and device testing.
 */
import type { LosOriginalLine } from "../LosOriginalDialogue";

export type LosOpenQuestion = {
  id: string;
  prompt: string;
  answers: readonly {id:string;text:string}[];
  correctId: string;
  explanation: string;
};
export type LosOpenText = {
  chapterId: "03"|"04"|"05"|"06"|"07"|"08"|"09"|"10";
  author?:string;
  licenseCode?:string;
  licenseUrl?:string;
  sourceDetail?:string;
  sourceId: string;
  revision: string;
  sourceUrl: string;
  title: string;
  heading: string;
  guidance: string;
  originalLines: readonly LosOriginalLine[];
  glossary: Readonly<Record<string,string>>;
  questions: readonly LosOpenQuestion[];
  evidenceLineId: string;
  evidenceQuestion: string;
  evidenceExplanation: string;
};
const common: Record<string,string> = {
  guten:"Hyvää; osa tervehdystä Guten Morgen/Tag.",
  morgen:"aamu; Guten Morgen = hyvää huomenta / bis morgen = huomiseen",
  tag:"päivä; Guten Tag = hyvää päivää",
  herr:"herra, sukunimen edellä kohtelias puhuttelusana",
  auf:"päällä/kohti; Auf Wiedersehen on kokonainen hyvästely",
  wiedersehen:"näkemiin; Auf Wiedersehen = näkemiin",
  danke:"kiitos",
  wie:"miten/kuinka; kysymyssana",
  geht:"menee tai sujuu; Es geht mir gut = minulle kuuluu hyvää",
  es:"se; tässä vointifraasin osa",
  mir:"minulle; opettele vointifraasi kokonaisena",
  gut:"hyvä/hyvin",
  und:"ja; Und dir/Ihnen? = entä sinulle?",
  ich:"minä",
  bin:"olen; sein-verbin ich-muoto",
  du:"sinä",
  dir:"sinulle; tuttavallinen vastauskysymys Und dir?",
  nicht:"ei; kielto",
  so:"niin / niin kovin",
  bis:"asti; hyvästelyissä Bis dann! / Bis morgen!",
  ja:"kyllä",
  nein:"ei; vastauksessa",
  ist:"on; sein-verbin hän/se-muoto",
  das:"se/tämä; myös artikkeli asiayhteyden mukaan",
  jetzt:"nyt",
  die:"määräinen artikkeli, tässä vain tunnistettava",
  der:"määräinen artikkeli, tässä vain tunnistettava",
  von:"joltakulta/jostakin, tässä osana puhelinilmausta",
};

const c03: LosOpenText = {
  chapterId:"03",sourceId:"M-WB-07",revision:"4581896",
  sourceUrl:"https://en.wikibooks.org/w/index.php?title=BLL_German/A1/Lesson_2&oldid=4581896",
  title:"BLL German / A1 / Lesson 2 · Text",
  heading:"Lisa Müller kertoo, mistä hän on",
  guidance:"Wikibooksin kahdeksan repliikin alkuperäiskohtaus. Siinä kaksi vierasta kysyy Lisa Mülleriltä, mistä hän on ja missä hän asuu. Muodollinen Sie näkyy alkuperäisessä tekstissä, mutta sen aktiivinen opetus tulee C04:ssä. Opettele nyt ensisijaisesti Woher? ja komme aus.",
  originalLines:[
    {id:"u01",speaker:"Stranger 1",text:"Guten Tag! Ich suche Lisa Müller. Sind Sie Lisa Müller?",meaning:"Hyvää päivää! Etsin Lisa Mülleriä. Oletteko te Lisa Müller?"},
    {id:"u02",speaker:"Lisa",text:"Ja, und Sie? Wie heißen Sie?",meaning:"Kyllä, entä te? Mikä teidän nimenne on?"},
    {id:"u03",speaker:"Stranger 1",text:"Ich heiße Lutz Schmidt.",meaning:"Minun nimeni on Lutz Schmidt."},
    {id:"u04",speaker:"Stranger 2",text:"Ich heiße Christine Schmidt.",meaning:"Minun nimeni on Christine Schmidt."},
    {id:"u05",speaker:"Lisa",text:"Angenehm.",meaning:"Hauska tutustua."},
    {id:"u06",speaker:"Stranger 1",text:"Wo wohnen Sie?",meaning:"Missä te asutte?"},
    {id:"u07",speaker:"Stranger 2",text:"Woher kommen Sie? Kommen Sie aus Österreich?",meaning:"Mistä te olette kotoisin? Oletteko te Itävallasta?"},
    {id:"u08",speaker:"Lisa",text:"Nein, ich komme aus Deutschland und ich wohne hier in Bern.",meaning:"En, olen kotoisin Saksasta ja asun täällä Bernissä."},
  ],
  glossary:{...common,
    suche:"etsin; suchen-verbin minä-muoto, tunnistettava tukisana",
    lisa:"Lisa, etunimi",
    müller:"Müller, sukunimi",
    sind:"olette; sein-verbin kohteliaan Sie-puhuttelun muoto, tunnistettava",
    sie:"te, kohtelias puhuttelusana; Sie kirjoitetaan isolla",
    heißen:"olette nimeltänne; Wie heißen Sie? = mikä teidän nimenne on?",
    heiße:"olen nimeltäni; Ich heiße = nimeni on",
    lutz:"Lutz, etunimi",
    schmidt:"Schmidt, sukunimi",
    christine:"Christine, etunimi",
    angenehm:"hauska tutustua; kokonainen kohtelias ilmaus",
    wo:"missä",
    wohnen:"asua; Wo wohnen Sie? = missä asutte?",
    woher:"mistä; Woher kommen Sie? = mistä olette kotoisin?",
    kommen:"tulla, tulla kotoisin; kommen Sie = tulette",
    österreich:"Itävalta",
    komme:"tulen; ich komme = minä tulen / olen kotoisin",
    aus:"-sta/-stä; ich komme aus Deutschland",
    deutschland:"Saksa",
    wohne:"asun; ich wohne = minä asun",
    hier:"täällä",
    in:"-ssa/-ssä, jossakin paikassa",
    bern:"Bern, Sveitsin kaupunki",
  },
  questions:[
    {id:"C03-SOURCE-Q01",prompt:"Mistä maasta Lisa Müller on kotoisin?",
      answers:[{id:"a",text:"Saksasta"},{id:"b",text:"Itävallasta"},{id:"c",text:"Sveitsistä"}],correctId:"a",
      explanation:"Lisa vastaa Ich komme aus Deutschland. Bern on hänen asuinpaikkansa, ei tekstissä ilmoitettu lähtömaa."},
    {id:"C03-SOURCE-Q02",prompt:"Missä kaupungissa Lisa kertoo asuvansa?",
      answers:[{id:"a",text:"Berliinissä"},{id:"b",text:"Bernissä"},{id:"c",text:"Wienissä"}],correctId:"b",
      explanation:"Ich wohne hier in Bern tarkoittaa asun täällä Bernissä."},
    {id:"C03-SOURCE-Q03",prompt:"Mikä tekstin kysymys tarkoittaa Mistä olette kotoisin?",
      answers:[{id:"a",text:"Wie heißen Sie?"},{id:"b",text:"Wo wohnen Sie?"},{id:"c",text:"Woher kommen Sie?"}],correctId:"c",
      explanation:"Woher kysyy mistä, kommen Sie on muodollisen Sie-puhuttelun muoto."},
    {id:"C03-SOURCE-Q04",prompt:"Mikä kohta kertoo, että keskustelijat teitittelevät?",
      answers:[{id:"a",text:"Sie kirjoitetaan isolla alkukirjaimella puhuttelussa."},{id:"b",text:"Kaikki puhujat sanovat du."},{id:"c",text:"Kukaan ei käytä nimeä."}],correctId:"a",
      explanation:"Tekstissä esiintyy esimerkiksi Wie heißen Sie? Kohtelias Sie käsitellään aktiivisesti C04:ssä."},
  ],
  evidenceLineId:"u08",evidenceQuestion:"Missä puheenvuorossa Lisa sanoo Ich komme aus Deutschland?",
  evidenceExplanation:"Lisan viimeisessä eli kahdeksannessa puheenvuorossa kerrotaan alkuperä.",
};

const c04: LosOpenText = {
  chapterId:"04",sourceId:"M-WB-06",revision:"3823654",
  sourceUrl:"https://en.wikibooks.org/w/index.php?title=German/Lesson_2&oldid=3823654",
  title:"Gespräch 2-2 ~ Die Geschäftsmänner",
  heading:"Herr Schmidt ja Herr Standish",
  guidance:"Tämä työpaikalla käytävä keskustelu on alkuperäisessä muodossaan A1.1-tasoa vaikeampi. Etsi erityisesti muodollinen puhuttelu Ihnen ja kohteliaat hyvästelyt. Muu sanasto on tunnistustukea, ei ulkoa opeteltavaa kielioppia.",
  originalLines:[
    {id:"u01",speaker:"Herr Schmidt",text:"Guten Morgen, Herr Standish! Wie geht es Ihnen?",meaning:"Hyvää huomenta, herra Standish! Mitä teille kuuluu?"},
    {id:"u02",speaker:"Herr Standish",text:"Danke sehr, es geht mir gut. Und Ihnen?",meaning:"Paljon kiitoksia, minulle kuuluu hyvää. Entä teille?"},
    {id:"u03",speaker:"Herr Schmidt",text:"Nicht so gut. Ich bin müde.",meaning:"Ei kovin hyvää. Olen väsynyt."},
    {id:"u04",speaker:"Herr Standish",text:"Wie bitte? Müde? Warum?",meaning:"Anteeksi mitä? Väsynyt? Miksi?"},
    {id:"u05",speaker:"Herr Schmidt",text:"Ich habe so viel Arbeit.",meaning:"Minulla on niin paljon töitä."},
    {id:"u06",speaker:"Herr Standish",text:"Das kann ich verstehen. Zu viel ist zu viel.",meaning:"Voin ymmärtää sen. Liika on liikaa."},
    {id:"u07",speaker:"Herr Schmidt",text:"Das ist richtig. Auf Wiedersehen, Herr Standish!",meaning:"Se on totta. Näkemiin, herra Standish!"},
    {id:"u08",speaker:"Herr Standish",text:"Auf Wiedersehen, bis morgen.",meaning:"Näkemiin, huomiseen."},
  ],
  glossary:{...common,
    standish:"Standish, sukunimi",schmidt:"Schmidt, sukunimi",
    ihnen:"teille/teitä; kohteliaan puhuttelun muoto (vain tunnistettavaksi)",
    sehr:"erittäin/paljon; Danke sehr = kiitos paljon",
    müde:"väsynyt",warum:"miksi",
    bitte:"ole hyvä/anteeksi; Wie bitte? = anteeksi mitä?",
    habe:"minulla on; haben-verbin minä-muoto, ei aktiivisen C04-kieliopin vaatimus",
    viel:"paljon",arbeit:"työ; Arbeit = työ",
    kann:"voin; tässä vain tunnistettava apuverbi",
    verstehen:"ymmärtää; Das kann ich verstehen = ymmärrän sen",
    zu:"liikaa-kontekstissa zu viel = liikaa",
    richtig:"oikein; Das ist richtig = se on oikein/totta",
  },
  questions:[
    {id:"C04-SOURCE-Q01",prompt:"Minkä puhuttelumuodon henkilöt käyttävät vointikysymyksessä?",
      answers:[{id:"a",text:"du/dir"},{id:"b",text:"Sie/Ihnen"},{id:"c",text:"ihr/euch"}],correctId:"b",
      explanation:"Wie geht es Ihnen? on kohtelias vointikysymys. Opettele ensin koko ilmaus."},
    {id:"C04-SOURCE-Q02",prompt:"Miksi Herr Schmidtillä ei mene erityisen hyvin?",
      answers:[{id:"a",text:"Hän on väsynyt ja hänellä on paljon töitä."},{id:"b",text:"Hän on myöhässä junasta."},{id:"c",text:"Hän on unohtanut nimen."}],correctId:"a",
      explanation:"Schmidt sanoo Ich bin müde ja Ich habe so viel Arbeit. Vaikeammat muodot ovat tässä tukitekstiä."},
    {id:"C04-SOURCE-Q03",prompt:"Mikä on keskustelun viimeinen hyvästely?",
      answers:[{id:"a",text:"Tschüss!"},{id:"b",text:"Gute Nacht!"},{id:"c",text:"Auf Wiedersehen, bis morgen."}],correctId:"c",
      explanation:"Standish lopettaa sanoihin Auf Wiedersehen, bis morgen, eli näkemiin, huomiseen."},
    {id:"C04-SOURCE-Q04",prompt:"Ketkä keskustelevat?",
      answers:[{id:"a",text:"Franz ja Greta"},{id:"b",text:"Herr Schmidt ja Herr Standish"},{id:"c",text:"Heinrich ja Karl"}],correctId:"b",
      explanation:"Puhujat ovat herra Schmidt ja herra Standish. Herr esiintyy sukunimen edessä."},
  ],
  evidenceLineId:"u01",evidenceQuestion:"Minkä repliikin lopussa kysytään Wie geht es Ihnen?",
  evidenceExplanation:"Ensimmäisessä repliikissä Herr Schmidt käyttää kohteliasta vointikysymystä.",
};

const c05: LosOpenText = {
  chapterId:"05",sourceId:"M-WB-05",revision:"3823655",
  sourceUrl:"https://en.wikibooks.org/w/index.php?title=German/Lesson_1&oldid=3823655",
  title:"Gespräch 1-1 ~ Die Freunde",
  heading:"Heinrich ja Karl kohtaavat",
  guidance:"Neljä repliikkiä ystävien lyhyestä tapaamisesta. Lue ja etsi kaksi vointifraasia: Wie geht es dir? ja mir geht es gut. Niiden taustalla olevia sijamuotoja ei tarvitse osata.",
  originalLines:[
    {id:"u01",speaker:"Heinrich",text:"Guten Tag, Karl. Wie geht es dir?",meaning:"Hyvää päivää, Karl. Mitä sinulle kuuluu?"},
    {id:"u02",speaker:"Karl",text:"Guten Tag. Danke, mir geht es gut. Und dir?",meaning:"Hyvää päivää. Kiitos, minulle kuuluu hyvää. Entä sinulle?"},
    {id:"u03",speaker:"Heinrich",text:"Danke, mir geht es gut. Auf Wiedersehen.",meaning:"Kiitos, minulle kuuluu hyvää. Näkemiin."},
    {id:"u04",speaker:"Karl",text:"Auf Wiedersehen!",meaning:"Näkemiin!"},
  ],
  glossary:{...common,heinrich:"Heinrich, etunimi",karl:"Karl, etunimi"},
  questions:[
    {id:"C05-SOURCE-Q01",prompt:"Mitä Heinrich kysyy Karlilta?",
      answers:[{id:"a",text:"Mitä sinulle kuuluu?"},{id:"b",text:"Mistä olet kotoisin?"},{id:"c",text:"Mikä sinun nimesi on?"}],correctId:"a",
      explanation:"Wie geht es dir? on tuttavallinen vointikysymys."},
    {id:"C05-SOURCE-Q02",prompt:"Mitä Karl vastaa kuulumisistaan?",
      answers:[{id:"a",text:"Nicht so gut."},{id:"b",text:"Mir geht es gut."},{id:"c",text:"Ich bin müde."}],correctId:"b",
      explanation:"Mir geht es gut tarkoittaa minulle kuuluu hyvää."},
    {id:"C05-SOURCE-Q03",prompt:"Millä ilmauksella molemmat hyvästelevät?",
      answers:[{id:"a",text:"Auf Wiedersehen."},{id:"b",text:"Guten Morgen."},{id:"c",text:"Bis später."}],correctId:"a",
      explanation:"Kumpikin käyttää ilmausta Auf Wiedersehen, näkemiin."},
    {id:"C05-SOURCE-Q04",prompt:"Mikä ilmaus tarkoittaa tässä Entä sinulle?",
      answers:[{id:"a",text:"Danke."},{id:"b",text:"Guten Tag."},{id:"c",text:"Und dir?"}],correctId:"c",
      explanation:"Und dir? on tuttavallinen tapa kysyä kuulumiset takaisin."},
  ],
  evidenceLineId:"u02",evidenceQuestion:"Missä repliikissä Karl sanoo Und dir?",
  evidenceExplanation:"Karl esittää vastakysymyksen toisessa repliikissä.",
};

const c07: LosOpenText = {
  chapterId:"07",sourceId:"M-WB-02",revision:"3504939",
  sourceUrl:"https://en.wikibooks.org/w/index.php?title=German/Level_I/Bitte_buchstabieren_Sie&oldid=3504939",
  title:"Fernsprechauskunft",
  heading:"Bitte buchstabieren Sie",
  guidance:"Alkuperäinen viiden puheenvuoron puhelinpalvelukeskustelu. Lue koko teksti, mutta harjoittele erityisesti fraaseja Wie schreibt man das? ja Bitte buchstabieren Sie. Kirjainnimiesimerkit eivät tarkoita samaa kuin kirjainten ääntäminen sanoissa.",
  originalLines:[
    {id:"u01",speaker:"Auskunft",text:"Auskunft, guten Tag.",meaning:"Numerotiedustelu, hyvää päivää."},
    {id:"u02",speaker:"Franz",text:"Guten Tag. Ich hätte gerne die Telefonnummer von Frau Claudia Bolliger aus Bern.",meaning:"Hyvää päivää. Haluaisin rouva Claudia Bolligerin puhelinnumeron Bernistä."},
    {id:"u03",speaker:"Auskunft",text:"Wie schreibt man das? Bitte buchstabieren Sie.",meaning:"Miten se kirjoitetaan? Tavatkaa, olkaa hyvä."},
    {id:"u04",speaker:"Franz",text:"Natürlich. Claudia: C wie Cäsar, L wie Ludwig, A wie Anton, U wie Ursula, D wie Dora, I wie Ida, A wie Anton. Bolliger: B wie Berta, O wie Otto, zweimal L wie Ludwig, I wie Ida, G wie Gustav, E wie Emil und R wie Richard.",meaning:"Tietysti. Franz tavaa etu- ja sukunimen käyttämällä joka kirjaimen yhteydessä esimerkkisanaa."},
    {id:"u05",speaker:"Auskunft",text:"Danke. Die Nummer lautet ...",meaning:"Kiitos. Numero on..."},
  ],
  glossary:{...common,
    auskunft:"numerotiedustelu",
    hätte:"haluaisin; vain kokonaisessa fraasissa Ich hätte gerne",
    gerne:"mielelläni; Ich hätte gerne = haluaisin",
    telefonnummer:"puhelinnumero",
    frau:"rouva; Frau + sukunimi",
    claudia:"Claudia, henkilön etunimi",
    bolliger:"Bolliger, henkilön sukunimi",
    aus:"-sta/-stä; aus Bern = Bernistä",
    bern:"Bern, sveitsiläinen kaupunki",
    schreibt:"kirjoittaa (hän); Wie schreibt man das? = miten tämä kirjoitetaan?",
    man:"passiivin kaltaisen ilmauksen yleistekijä; vain tukisana",
    bitte:"ole hyvä; tässä kohtelias pyyntö",
    buchstabieren:"tavata, sanoa kirjaimet yksi kerrallaan",
    sie:"te; tässä kohtelias puhuttelu",
    natürlich:"tietysti",
    cäsar:"Cäsar, kirjaimen C esimerkkisana",
    ludwig:"Ludwig, kirjaimen L esimerkkisana",
    anton:"Anton, kirjaimen A esimerkkisana",
    ursula:"Ursula, kirjaimen U esimerkkisana",
    dora:"Dora, kirjaimen D esimerkkisana",
    ida:"Ida, kirjaimen I esimerkkisana",
    berta:"Berta, kirjaimen B esimerkkisana",
    otto:"Otto, kirjaimen O esimerkkisana",
    zweimal:"kaksi kertaa",
    gustav:"Gustav, kirjaimen G esimerkkisana",
    emil:"Emil, kirjaimen E esimerkkisana",
    richard:"Richard, kirjaimen R esimerkkisana",
    nummer:"numero",
    lautet:"kuuluu/on ilmoitettuna; Die Nummer lautet = numero on",
  },
  questions:[
    {id:"C07-SOURCE-Q01",prompt:"Mitä lause Wie schreibt man das? tarkoittaa tässä?",
      answers:[{id:"a",text:"Paljonko kello on?"},{id:"b",text:"Miten se kirjoitetaan?"},{id:"c",text:"Mistä olet?"}],correctId:"b",
      explanation:"Puhelinpalvelun työntekijä pyytää nimen kirjoitusasua."},
    {id:"C07-SOURCE-Q02",prompt:"Kuka pyytää nimen tavaamista?",
      answers:[{id:"a",text:"Franz"},{id:"b",text:"Claudia"},{id:"c",text:"Auskunft (numerotiedustelu)"}],correctId:"c",
      explanation:"Auskunft sanoo Bitte buchstabieren Sie. Se tarkoittaa: tavatkaa, olkaa hyvä."},
    {id:"C07-SOURCE-Q03",prompt:"Mitä zweimal tarkoittaa nimessä Bolliger?",
      answers:[{id:"a",text:"Kaksi kertaa"},{id:"b",text:"Uusi nimi"},{id:"c",text:"Kymmenen"}],correctId:"a",
      explanation:"Franz sanoo zweimal L eli L-kirjain kahdesti."},
    {id:"C07-SOURCE-Q04",prompt:"Mitä Frau tarkoittaa sukunimen edellä?",
      answers:[{id:"a",text:"herra"},{id:"b",text:"rouva"},{id:"c",text:"opettaja"}],correctId:"b",
      explanation:"Frau on kohtelias puhuttelusana esimerkiksi sukunimen edellä."},
  ],
  evidenceLineId:"u03",evidenceQuestion:"Mikä puheenvuoro sisältää pyynnön Bitte buchstabieren Sie?",
  evidenceExplanation:"Numerotiedustelun kolmas repliikki sisältää selkeän tavaamispyynnön.",
};

const c09: LosOpenText = {
  chapterId:"09",sourceId:"M-WB-03",revision:"4003622",
  sourceUrl:"https://en.wikibooks.org/w/index.php?title=German/Level_I/Freizeit&oldid=4003622",
  title:"Sport und Zeit",
  heading:"Franzin ja Gretan tapaaminen",
  guidance:"Lue seitsemän repliikin alkuperäinen teksti. Tunnista kellonaikaan liittyvät ilmaisut ja tapaamisten kulku. Viertel vor drei tarkoittaa varttia vaille kolme, mutta sen tuottamista ei vielä vaadita.",
  originalLines:[
    {id:"u01",speaker:"Franz",text:"Hallo, Greta! Wie spät ist es?",meaning:"Hei, Greta! Paljonko kello on?"},
    {id:"u02",speaker:"Greta",text:"Es ist Viertel vor drei.",meaning:"Kello on varttia vaille kolme."},
    {id:"u03",speaker:"Franz",text:"Wirklich? Ich spiele um drei Fußball. Machst du Sport, Greta?",meaning:"Todellako? Pelaan jalkapalloa kolmelta. Harrastatko urheilua, Greta?"},
    {id:"u04",speaker:"Greta",text:"Nein, ich bin faul. Ich gehe jetzt nach Hause.",meaning:"En, olen laiska. Menen nyt kotiin."},
    {id:"u05",speaker:"Franz",text:"Fußball macht aber Spaß!",meaning:"Jalkapallo on kuitenkin hauskaa!"},
    {id:"u06",speaker:"Greta",text:"Bis dann.",meaning:"Nähdään!"},
    {id:"u07",speaker:"Franz",text:"Wiedersehen!",meaning:"Näkemiin!"},
  ],
  glossary:{...common,
    hallo:"hei",greta:"Greta, etunimi",franz:"Franz, etunimi",
    spät:"myöhäinen; Wie spät ist es? = paljonko kello on?",
    viertel:"neljännes/vartti; Viertel vor drei = varttia vaille kolme",
    vor:"ennen/vaille; kellonajassa vor kolme = vaille kolme",
    drei:"kolme",
    wirklich:"todellako?",
    spiele:"pelaan; spielen-verbin minä-muoto",
    um:"kello johonkin aikaan; um drei = kolmelta",
    fußball:"jalkapallo (der Fußball)",
    machst:"teet; Machst du Sport? = harrastatko urheilua?",
    sport:"urheilu (der Sport)",
    faul:"laiska",
    gehe:"menen; gehen-verbin minä-muoto, vain tunnistustasolla",
    nach:"kohti; nach Hause = kotiin",
    hause:"koti, tässä kiinteä ilmaus nach Hause",
    macht:"tekee; Fußball macht Spaß! = jalkapallo on hauskaa",
    aber:"mutta/kuitenkin",
    spaß:"hauskuus; Spaß machen = olla hauskaa",
    dann:"sitten; Bis dann = nähdään",
  },
  questions:[
    {id:"C09-SOURCE-Q01",prompt:"Mikä kellonaika Gretan vastauksessa mainitaan?",
      answers:[{id:"a",text:"14.45"},{id:"b",text:"15.00"},{id:"c",text:"15.15"}],correctId:"a",
      explanation:"Viertel vor drei tarkoittaa varttia vaille kolme eli 14.45. Ilmauksen aktiivinen tuottaminen ei vielä ole vaatimuksena."},
    {id:"C09-SOURCE-Q02",prompt:"Mihin aikaan Franz aikoo pelata jalkapalloa?",
      answers:[{id:"a",text:"Kello kaksi"},{id:"b",text:"Kello kolme"},{id:"c",text:"Kello neljä"}],correctId:"b",
      explanation:"Franz sanoo Ich spiele um drei Fußball. Um drei tarkoittaa kolmelta."},
    {id:"C09-SOURCE-Q03",prompt:"Mitä Greta sanoo tekevänsä seuraavaksi?",
      answers:[{id:"a",text:"Menevänsä kotiin"},{id:"b",text:"Pelaavansa jalkapalloa"},{id:"c",text:"Menevänsä kouluun"}],correctId:"a",
      explanation:"Greta sanoo Ich gehe jetzt nach Hause eli menen nyt kotiin."},
    {id:"C09-SOURCE-Q04",prompt:"Miten Greta hyvästelee Franzin?",
      answers:[{id:"a",text:"Guten Morgen."},{id:"b",text:"Wie spät ist es?"},{id:"c",text:"Bis dann."}],correctId:"c",
      explanation:"Bis dann. on hyvästely ja tarkoittaa nähdään."},
  ],
  evidenceLineId:"u03",evidenceQuestion:"Missä repliikissä esiintyy ilmaus um drei?",
  evidenceExplanation:"Kolmannessa repliikissä Franz kertoo pelaavansa jalkapalloa kolmelta.",
};


/**
 * C06 Text A: four distinct complete human-authored mini-dialogues.
 * The official source has changed since an older cached transcription: the
 * newest indexed rendering names speakers and uses Lucas/neun, while the
 * older one said Oskar/fünf. Confirm audio alignment before publication.
 *
 * Source: Monika Janicka, Sag mal, wie alt bist du?,
 * https://zpe.gov.pl/a/plik-audio/DIcQL1VxT
 * The transcription explicitly credits the author and CC BY-SA 3.0.
 * The audio stream has not been integrated or device-tested.
 * Finnish translations and questions are independent LOS! aids.
 */
const c06:LosOpenText={
  chapterId:"06",sourceId:"M-ZPE-01",revision:"text-collated-latest-index-2026-11-13",
  sourceUrl:"https://zpe.gov.pl/a/plik-audio/DIcQL1VxT",
  author:"Monika Janicka",
  licenseCode:"CC BY-SA 3.0",
  licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/",
  sourceDetail:"Monika Janickan Sag mal, wie alt bist du? sisältää neljä julkaistua ikädialogia (CC BY-SA 3.0). Vanhemmassa välimuistissa puhuja on Oskar ja ikä viisi; uudemmassa indeksoidussa litteraatissa puhuja on Lucas ja ikä yhdeksän, ja henkilöiden nimet näkyvät repliikeissä. Tämä esikatselu käyttää uudempaa tekstiversiota. Äänitteen vastaavuus ja toisto on varmennettava erikseen ennen julkaisua. Suomenkieliset tukiselitykset ovat LOS!:n toimitusta.",
  title:"Sag mal, wie alt bist du?",
  heading:"Neljä keskustelua iästä",
  guidance:"Lue kaikki neljä alkuperäistä lyhyttä dialogia. Etsi ensin vain nimet ja ikälukusanat. Lapsille suunnatussa tekstissä esiintyy myös vielä opettamattomia muotoja kuten seid ihr, wir sind ja ist er; ne ovat tässä vain tunnistettavia tukirakenteita. Aineisto on vielä kieli- ja laitetarkistusta odottava esikatselu.",
  originalLines:[
    {id:"u01",sectionTitle:"Dialog 1",speaker:"Fabian",text:"Hi, wie alt bist du?",meaning:"Hei, kuinka vanha olet?"},
    {id:"u02",speaker:"Lucas",text:"Ich bin neun.",meaning:"Olen yhdeksän."},
    {id:"u03",speaker:"Fabian",text:"Und wie heißt du?",meaning:"Ja mikä sinun nimesi on?"},
    {id:"u04",speaker:"Lucas",text:"Lucas.",meaning:"Lucas."},
    {id:"u05",sectionTitle:"Dialog 2",speaker:"Fabian",text:"Hallo, ich bin Fabian. Und wie heißt du?",meaning:"Hei, olen Fabian. Ja mikä sinun nimesi on?"},
    {id:"u06",speaker:"Larissa",text:"Ich bin Larissa.",meaning:"Olen Larissa."},
    {id:"u07",speaker:"Fabian",text:"Bist du schon elf?",meaning:"Oletko jo yksitoista?"},
    {id:"u08",speaker:"Larissa",text:"Ich bin schon zwölf Jahre alt.",meaning:"Olen jo kaksitoista vuotta vanha."},
    {id:"u09",sectionTitle:"Dialog 3",speaker:"Fabian",text:"Wie alt seid ihr?",meaning:"Kuinka vanhoja te olette?"},
    {id:"u10",speaker:"Tim und Mia",text:"Wir sind 10.",meaning:"Olemme kymmenen."},
    {id:"u11",sectionTitle:"Dialog 4",speaker:"Fabian",text:"Wie alt ist er?",meaning:"Kuinka vanha hän on?"},
    {id:"u12",speaker:"Felix",text:"Paul? Er ist elf Jahre alt.",meaning:"Paul? Hän on yksitoistavuotias."},
  ],
  glossary:{...common,
    hi:"hei, tuttavallinen tervehdys",alt:"vanha; Wie alt bist du? = kuinka vanha olet?",
    heißt:"on nimeltään; Wie heißt du? = mikä sinun nimesi on?",
    neun:"yhdeksän",schon:"jo",elf:"yksitoista",zwölf:"kaksitoista",
    zehn:"kymmenen",jahre:"vuotta; Jahre alt = vuotta vanha",
    bist:"olet; sein-verbin du-muoto",seid:"olette; sein-verbin ihr-muoto, vain tunnistettava",
    ihr:"te (tuttavallinen monikon puhuttelu), vain tunnistettava",wir:"me",
    sind:"olemme/olette/ovat; sein-verbin monikkomuoto, vain tunnistettava",
    er:"hän (miespuolinen), vain tunnistettava",lucas:"Lucas, etunimi",
    fabian:"Fabian, etunimi",larissa:"Larissa, etunimi",
    paul:"Paul, etunimi",
  },
  questions:[
    {id:"C06-ZPE-Q01",prompt:"Kuinka vanha Lucas sanoo olevansa ensimmäisessä keskustelussa?",
      answers:[{id:"a",text:"9-vuotias"},{id:"b",text:"11-vuotias"},{id:"c",text:"12-vuotias"}],correctId:"a",
      explanation:"Ich bin neun. on ensimmäisen keskustelun vastaus. Neun on yhdeksän."},
    {id:"C06-ZPE-Q02",prompt:"Kuinka vanha Larissa sanoo olevansa?",
      answers:[{id:"a",text:"11-vuotias"},{id:"b",text:"12-vuotias"},{id:"c",text:"10-vuotias"}],correctId:"b",
      explanation:"Larissa vastaa Ich bin schon zwölf Jahre alt. Zwölf on kaksitoista."},
    {id:"C06-ZPE-Q03",prompt:"Minkä ikäisiä kolmannen dialogin kaksi puhujaa sanovat olevansa?",
      answers:[{id:"a",text:"12-vuotiaita"},{id:"b",text:"11-vuotiaita"},{id:"c",text:"10-vuotiaita"}],correctId:"c",
      explanation:"Wir sind 10 tarkoittaa Olemme kymmenen. Tässä luku on alkuperäisessä tekstissä numerona."},
    {id:"C06-ZPE-Q04",prompt:"Kenen ikä kerrotaan neljännessä dialogissa?",
      answers:[{id:"a",text:"Paulin (11 vuotta)"},{id:"b",text:"Fabianin (12 vuotta)"},{id:"c",text:"Lucasin (9 vuotta)"}],correctId:"a",
      explanation:"Paul? Er ist elf Jahre alt. kertoo Paulin olevan yksitoistavuotias."},
  ],
  evidenceLineId:"u08",
  evidenceQuestion:"Missä repliikissä Larissa kertoo olevansa 12-vuotias?",
  evidenceExplanation:"Toisen dialogin viimeinen repliikki kuuluu Ich bin schon zwölf Jahre alt.",
};


/**
 * COMPLETE original human-speaker transcript from COERLL's Deutsch im Blick,
 * Kapitel 1, Harald Becker: "Wer bin ich?", QR 1.22.
 * https://coerll.utexas.edu/dib/vidt.php?f=01_22_int_hb_who
 * Language is deliberately NOT simplified or edited; support definitions
 * and Finnish translations are independent LOS! instructional aids.
 *
 * Textbook © 2017 COERLL, University of Texas at Austin, CC BY 4.0;
 * separate audio/video file rights and device functionality remain unchecked.
 * A public seven-digit numeric string appears in the original recording:
 * it is a source quotation only, never an instruction to collect real numbers.
 */
const c10:LosOpenText={
  chapterId:"10",sourceId:"M-DIB-02",revision:"COERLL-QR-1.22-checked-2026-11-12",
  sourceUrl:"https://coerll.utexas.edu/dib/vidt.php?f=01_22_int_hb_who",
  title:"Deutsch im Blick · Harald · Wer bin ich?",
  heading:"Harald esittäytyy: Wer bin ich?",
  author:"COERLL, The University of Texas at Austin (2017); Harald Becker (haastateltava)",
  licenseCode:"CC BY 4.0",
  licenseUrl:"https://creativecommons.org/licenses/by/4.0/",
  sourceDetail:"Deutsch im Blick, Kapitel 1, videolitteraatti 1.22. Saksankielinen puhe on toistettu kirjoitettuna ilman kielellisiä muutoksia. Suomessa käytettävät glossit ja kysymykset ovat LOS!:n laatimia. Alkuperäisen ääni-/videotiedoston erillinen lupa ja tekninen toisto odottavat tarkistusta. Puhelinnumeron lukusarja on ainoastaan julkaistun lähteen osa eikä sitä pidä opetella tai käyttää yhteystietona.",
  guidance:"Lue koko Haraldin alkuperäinen haastattelu rauhassa. Tunnista nimen, lähtöpaikan, iän ja lempivärin kysymykset. Puheessa esiintyy alkeistason ylittäviä rakenteita (ursprünglich, zivilisierten, wegen, vielleicht), jotka ovat lukemisen tukisanoja, eivät uuden kieliopin oppimistavoitteita. Äänitteen kuulumista ja videon toistoa ei ole vahvistettu. Lähde sisältää numeroina lausutun esimerkin, jota ei saa käyttää oikeana yhteystietona.",
  originalLines:[
    {id:"u01",speaker:"Haastattelija",text:"Wie heißt du?",meaning:"Mikä sinun nimesi on?"},
    {id:"u02",speaker:"Harald",text:"Ich heiße Harald Becker.",meaning:"Minun nimeni on Harald Becker."},
    {id:"u03",speaker:"Haastattelija",text:"Woher kommst du?",meaning:"Mistä olet kotoisin?"},
    {id:"u04",speaker:"Harald",text:"Ich komme ursprünglich aus München.",meaning:"Olen alun perin Münchenistä."},
    {id:"u05",speaker:"Haastattelija",text:"Aha, wo ist München?",meaning:"Ahaa, missä München on?"},
    {id:"u06",speaker:"Harald",text:"München ist im zivilisierten Teil Deutschlands, also in Süddeutschland.",meaning:"München on Saksan sivistyneessä osassa, siis Etelä-Saksassa. Tämä on puhujan humoristinen mielipide, ei oppikirjan väite."},
    {id:"u07",speaker:"Haastattelija",text:"Aha. Wie alt bist du?",meaning:"Ahaa. Kuinka vanha olet?"},
    {id:"u08",speaker:"Harald",text:"Ich bin jetzt so um die fünfzig.",meaning:"Olen nyt suunnilleen viisikymmentä."},
    {id:"u09",speaker:"Haastattelija",text:"Um die fünfzig... Was ist deine Telefonnumer?",meaning:"Viidenkymmenen paikkeilla... Mikä on puhelinnumerosi? Alkuperäisen litteraatin kirjoitusasu on säilytetty."},
    {id:"u10",speaker:"Harald",text:"Ah, das ist nicht so einfach. Neun, eins, zwei, eins, fünf, sechs, sechs.",meaning:"Se ei ole ihan yksinkertaista. Yhdeksän, yksi, kaksi, yksi, viisi, kuusi, kuusi. Lukusarja vain tekstinymmärtämistä varten."},
    {id:"u11",speaker:"Haastattelija",text:"Hmh. Und was ist deine Lieblingsfarbe?",meaning:"Hmm. Ja mikä on lempivärisi?"},
    {id:"u12",speaker:"Harald",text:"Blau.",meaning:"Sininen."},
    {id:"u13",speaker:"Haastattelija",text:"Warum Blau?",meaning:"Miksi sininen?"},
    {id:"u14",speaker:"Harald",text:"Ahmh, das ist eine gute Frage. Vielleicht wegen Bayern, das ist auch eine der Farben Bayerns. Wegen dem bayerischen Himmel. Der Himmel ist blau.",meaning:"Se on hyvä kysymys. Ehkä Baijerin takia, koska se on myös yksi Baijerin väreistä. Baijerin taivaan vuoksi. Taivas on sininen."},
  ],
  glossary:{...common,
    heißt:"on nimeltään; Ich heiße = nimeni on",
    ursprünglich:"alun perin (tunnistettava)",
    münchen:"München, kaupunki Etelä-Saksassa",
    also:"siis; tässä puhuttu siirtymä",
    zivilisierten:"sivistyneessä; puhujan humoristinen mielipide, ei opeteltava rakenne",
    teil:"osa (der Teil)",deutschlands:"Saksan; genetiivi vain ymmärtämiseen",
    süddeutschland:"Etelä-Saksa",alt:"vanha; Wie alt bist du? = kuinka vanha olet?",
    jetzt:"nyt",um:"noin; um die fünfzig = noin viisikymmentä",
    fünfzig:"viisikymmentä",telefonnummer:"puhelinnumero; alkuperäisessä litteraatissa on kirjoitusvirhe Telefonnumer",
    telefonnumer:"alkuperäislitteraatin kirjoitusasu; yleiskielen kirjoitusasu Telefonnummer",
    neun:"yhdeksän",eins:"yksi",zwei:"kaksi",fünf:"viisi",sechs:"kuusi",
    einfach:"helppo/yksinkertainen",so:"niin; tässä so um die fünfzig = noin 50",
    lieblingsfarbe:"lempiväri (die Lieblingsfarbe)",
    blau:"sininen",warum:"miksi",gute:"hyvä; eine gute Frage = hyvä kysymys",
    frage:"kysymys (die Frage)",vielleicht:"ehkä",wegen:"jonkin vuoksi; vain tunnistettava",
    bayern:"Baijeri",farben:"värit (die Farben)",bayerischen:"baijerilaisen; vain tunnistettava",
    himmel:"taivas (der Himmel)",auch:"myös",
  },
  questions:[
    {id:"C10-HARALD-Q01",prompt:"Mistä Harald sanoo olevansa alun perin?",
      answers:[{id:"a",text:"Münchenistä"},{id:"b",text:"Berliinistä"},{id:"c",text:"Wienistä"}],
      correctId:"a",explanation:"Ich komme ursprünglich aus München. on alkuperää kuvaava lause."},
    {id:"C10-HARALD-Q02",prompt:"Kuinka vanha Harald sanoo suunnilleen olevansa?",
      answers:[{id:"a",text:"20-vuotias"},{id:"b",text:"50-vuotias"},{id:"c",text:"70-vuotias"}],
      correctId:"b",explanation:"Um die fünfzig tarkoittaa suunnilleen viisikymmentä."},
    {id:"C10-HARALD-Q03",prompt:"Mikä Haraldin lempiväri on?",
      answers:[{id:"a",text:"Punainen"},{id:"b",text:"Vihreä"},{id:"c",text:"Sininen"}],
      correctId:"c",explanation:"Harald vastaa kysymykseen Und was ist deine Lieblingsfarbe? sanalla Blau."},
    {id:"C10-HARALD-Q04",prompt:"Mihin Harald yhdistää lempivärinsä?",
      answers:[{id:"a",text:"Baijeriin ja sen taivaaseen"},{id:"b",text:"Saksan lippuun"},{id:"c",text:"Hänen kouluunsa"}],
      correctId:"a",explanation:"Harald mainitsee Bayern ja den bayerischen Himmel, eli Baijerin taivaan."},
  ],
  evidenceLineId:"u08",
  evidenceQuestion:"Missä Haraldin puheenvuorossa kerrotaan hänen ikänsä?",
  evidenceExplanation:"Kahdeksannessa puheenvuorossa Harald sanoo Ich bin jetzt so um die fünfzig.",
};


/**
 * The entire self-contained classroom scene "Schule" from Wikibooks
 * German/Level I/Schule (permanent oldid=4520956), CC BY-SA 4.0.
 * This is a substitution for the unverified COERLL C08 interview, which
 * remains separately listed as an identified (not integrated) candidate.
 * Original German is unedited; translation, explanations and questions
 * are new teaching aids. This scene is ABOVE A1 productive grammar level.
 * Text-only, no authenticated media playback claim.
 */
const c08:LosOpenText={
  chapterId:"08",sourceId:"M-WB-08",revision:"4520956",
  sourceUrl:"https://en.wikibooks.org/w/index.php?title=German/Level_I/Schule&oldid=4520956",
  title:"German/Level I/Schule · Dialogue",
  heading:"Luokassa: Silke, Torsten ja opettaja",
  author:"Wikibooksin German/Level I/Schule -sivun kirjoittajat",
  licenseCode:"CC BY-SA 4.0",
  licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/",
  sourceDetail:"Wikibooksin Schule-oppitunnin koko luokkakohtaus. Lähdesivun teksti on keskeneräinen ja sisältää alkeistasoa vaikeampia rakenteita. LOS! ei muokkaa alkuperäistä tekstiä eikä esitä sitä A1-tason tuottamiskielen mallina. Lähteen ääniraitaa ei ole vahvistettu eikä käytetä.",
  guidance:"Lue alkuperäinen luokkakohtaus kokonaan. Tunnista ensiksi Guten Morgen, Mathe, Musik ja Sehr gut. Muu, huomattavasti vaikeampi puhe on lähteen mukana sellaisenaan mutta selitetään suomeksi; sitä ei tarvitse osata tuottaa. Aineisto on vielä saksan tasoarvion ja laitetestin odottava tekstiesikatselu. Luokkakohtaus ei ole sama kuin suunniteltu Eva/Jan-haastattelu.",
  originalLines:[
    {id:"u01",speaker:"Silke",text:"Jetzt haben wir Mathe.",meaning:"Nyt meillä on matematiikkaa."},
    {id:"u02",speaker:"Torsten",text:"Oh nein, ich habe überhaupt keine Lust dazu.",meaning:"Voi ei, ei huvita ollenkaan."},
    {id:"u03",speaker:"Silke",text:"Hast du die Aufgaben gemacht?",meaning:"Teitkö tehtävät?"},
    {id:"u04",speaker:"Torsten",text:"Ja, im Bus.",meaning:"Kyllä, bussissa."},
    {id:"u05",speaker:"Silke",text:"Super! Kann ich sie abschreiben?",meaning:"Mahtavaa! Voinko kopioida ne?"},
    {id:"u06",speaker:"Erzähler",text:"Lehrer (Betritt den Raum):",meaning:"Opettaja (astuu huoneeseen):"},
    {id:"u07",speaker:"Lehrer",text:"Guten Morgen!",meaning:"Hyvää huomenta!"},
    {id:"u08",speaker:"Klasse",text:"Guten Morgen!",meaning:"Hyvää huomenta!"},
    {id:"u09",speaker:"Lehrer",text:"Wer möchte die Aufgaben an der Tafel rechnen? Florian?",meaning:"Kuka haluaisi laskea tehtävät taululla? Florian?"},
    {id:"u10",speaker:"Erzähler",text:"Florian geht zur Tafel, schreibt an und liest vor:",meaning:"Florian menee taululle, kirjoittaa ja lukee ääneen:"},
    {id:"u11",speaker:"Florian",text:'"5 plus 8 ist gleich 13"',meaning:"5 + 8 = 13."},
    {id:"u12",speaker:"Florian",text:'"8 minus 5 ist gleich 3"',meaning:"8 − 5 = 3."},
    {id:"u13",speaker:"Florian",text:'"3 mal 8 ist gleich 24"',meaning:"3 × 8 = 24."},
    {id:"u14",speaker:"Florian",text:'"24 geteilt durch 12 ist gleich 2"',meaning:"24 ÷ 12 = 2."},
    {id:"u15",speaker:"Lehrer",text:"Sehr gut, Florian!",meaning:"Oikein hyvä, Florian!"},
    {id:"u16",speaker:"Erzähler",text:"Die Glocke läutet. Es ist Fünfminutenpause.",meaning:"Kello soi. On viiden minuutin välitunti."},
    {id:"u17",speaker:"Silke",text:"Schnell, wir müssen zu Musik!",meaning:"Nopeasti, meidän on mentävä musiikkiin!"},
    {id:"u18",speaker:"Torsten",text:"Au ja, darauf freue ich mich schon.",meaning:"Jee, odotan sitä jo innolla."},
    {id:"u19",speaker:"Silke",text:"Was machen wir heute?",meaning:"Mitä teemme tänään?"},
    {id:"u20",speaker:"Torsten",text:"Wir wollen ein Lied von Grönemeyer singen!",meaning:"Haluamme laulaa Grönemeyerin laulun!"},
    {id:"u21",speaker:"Silke",text:"Welches denn?",meaning:"Minkä niistä?"},
    {id:"u22",speaker:"Torsten",text:'"Alkohol", glaube ich.',meaning:"Luullakseni Alkohol-nimisen."},
    {id:"u23",speaker:"Erzähler",text:"Nach dem Musikunterricht:",meaning:"Musiikintunnin jälkeen:"},
    {id:"u24",speaker:"Silke",text:"Jetzt haben wir nur noch Geschichte...",meaning:"Nyt meillä on enää historiaa..."},
    {id:"u25",speaker:"Torsten",text:"Komm, wir schwänzen und gehen ins Bistro.",meaning:"Tule, lintsataan ja mennään bistroon."},
    {id:"u26",speaker:"Silke",text:"Schon wieder!",meaning:"Taas kerran!"},
  ],
  glossary:{...common,
    jetzt:"nyt",haben:"meillä on / olla, tunnistamiseen",wir:"me",mathe:"matematiikka",
    nein:"ei",überhaupt:"ollenkaan",lust:"halu; Lust haben = huvittaa",dazu:"siihen",
    hast:"sinulla on / olet tehnyt, tässä menneen ajan apuverbi",aufgaben:"tehtävät",
    gemacht:"tehty, vaikea mennyt muoto vain ymmärtämiseen",ja:"kyllä",
    im:"-ssa/-ssä, tässä im Bus = bussissa",bus:"bussi",super:"mahtavaa",
    kann:"voinko; osaan",abschreiben:"kirjoittaa toiselta, kopioida",lehrer:"opettaja",
    betritt:"astuu sisään, vain tunnistamiseen",raum:"huone",klasse:"luokka",
    wer:"kuka",möchte:"haluaisi",tafel:"taulu",rechnen:"laskea",
    geht:"menee",schreibt:"kirjoittaa",liest:"lukee",vor:"ääneen osana liest vor",
    plus:"plus",minus:"miinus",gleich:"yhtä kuin",mal:"kertaa",
    geteilt:"jaettu",durch:"jakamalla",sehr:"erittäin",gut:"hyvä",
    glocke:"kello",läutet:"soi",fünfminutenpause:"viiden minuutin välitunti",
    schnell:"nopeasti",müssen:"täytyy",musik:"musiikki",freue:"odotan innolla",
    heute:"tänään",machen:"tehdä",wollen:"haluta",lied:"laulu",
    singen:"laulaa",welches:"mikä niistä",glaube:"luulen",
    nach:"jälkeen",musikunterricht:"musiikintunti",nur:"vain",noch:"enää",
    geschichte:"historia",komm:"tule",schwänzen:"lintsata",gehen:"mennä",
    bistro:"bistro",schon:"jo",wieder:"taas",
  },
  questions:[
    {id:"C08-SCHOOL-Q01",prompt:"Mitä tuntia Silke ja Torsten sanovat alussa olevansa menossa opiskelemaan?",
      answers:[{id:"a",text:"Matematiikkaa"},{id:"b",text:"Historiaa"},{id:"c",text:"Musiikkia"}],correctId:"a",
      explanation:"Silke sanoo Jetzt haben wir Mathe. Mathe tarkoittaa matematiikkaa."},
    {id:"C08-SCHOOL-Q02",prompt:"Miten opettaja ja luokka tervehtivät toisiaan?",
      answers:[{id:"a",text:"Gute Nacht!"},{id:"b",text:"Guten Morgen!"},{id:"c",text:"Bis morgen!"}],correctId:"b",
      explanation:"Sekä opettaja että luokka sanovat Guten Morgen! eli hyvää huomenta."},
    {id:"C08-SCHOOL-Q03",prompt:"Mihin aineeseen oppilaat menevät kellon soitua?",
      answers:[{id:"a",text:"Saksaan"},{id:"b",text:"Fysiikkaan"},{id:"c",text:"Musiikkiin"}],correctId:"c",
      explanation:"Silke sanoo wir müssen zu Musik. Musiikki on seuraava tunti."},
    {id:"C08-SCHOOL-Q04",prompt:"Mistä opettaja kiittää Floriania?",
      answers:[{id:"a",text:"Taululla laskemisesta"},{id:"b",text:"Laulamisesta"},{id:"c",text:"Historiasta"}],correctId:"a",
      explanation:"Florian laskee taululla neljä laskua, ja opettaja sanoo Sehr gut, Florian!"},
  ],
  evidenceLineId:"u15",
  evidenceQuestion:"Missä opettaja sanoo Florianille Sehr gut, Florian!?",
  evidenceExplanation:"Opettaja kehuu Floriania puheenvuorossa 15 heti laskujen jälkeen.",
};

export const LOS1_C06_TEXT: LosOpenText = c06;
export const LOS1_C08_TEXT: LosOpenText = c08;
export const LOS1_C10_TEXT: LosOpenText = c10;
/** Legacy collection of the five independently sourced Wikibooks texts. C06 is a separate Polish OER source. */
export const LOS1_OPEN_DIALOGUES: readonly LosOpenText[] = [c03,c04,c05,c07,c09];
export function getLosOpenDialogue(chapterId: string): LosOpenText | undefined {
  return chapterId==="06" ? LOS1_C06_TEXT : chapterId==="08" ? LOS1_C08_TEXT : chapterId==="10" ? LOS1_C10_TEXT : LOS1_OPEN_DIALOGUES.find(text=>text.chapterId===chapterId);
}
