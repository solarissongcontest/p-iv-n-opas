import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 L012 · C03 1/5: countries, cities and first orientation to origin.
 * Source A in the CURRENT reader is eight-turn M-WB-07 Lisa Müller,
 * replacing the earlier planned COERLL Berna source because of privacy.
 * No audio for the Lisa text is verified or implied.
 * Intro/prechecks do not count as independent language evidence.
 * Editorial German/pedagogy and real-device review remain required.
 */
export const LOS1_L012_TEACHER: TeacherLesson = {
  id:"L012",bookId:1,chapterId:"03",version:"2.0.0-preview.1",
  title:"Maat ja paikat",
  objective:"Tunnistan Saksan, Suomen, Itävallan ja Sveitsin saksankieliset nimet sekä erotan maan kaupungista ja lähtömaan asuinpaikasta.",
  estimatedMinutes:30,
  requiredQuestionIds:["pre-country","pre-place","guided","independent","exit"],
  requiredActivityIds:["vocabulary-read","culture-read","text-a-scanned"],
  requiredPracticeIds:[],
  scenes:[
    {
      id:"welcome",kind:"introduction",phase:"Aloitus",
      title:"Tänään opit maiden nimet ja erotat maan kaupungista",
      paragraphs:[
        "C02:ssa opit kysymään nimeä ja esittäytymään. Nyt C03:ssa opettelet tunnistamaan, mistä maasta ihminen kertoo olevansa ja milloin hän puhuu kaupungista.",
        "Aloitamme saksankielisistä maan nimistä Deutschland (Saksa), Finnland (Suomi), Österreich (Itävalta) ja die Schweiz (Sveitsi). Tunnistat myös Bernin kaupungin nimen.",
        "Teet kaksi ennakkokysymystä, saat vaiheittaisen selityksen ja opetustaulun sekä tutkit oikeat sanasto-, kulttuuri- ja Text A -sivut LOSin sisällä.",
        "C03:n nykyinen alkuperäisteksti kertoo Lisa Mülleristä. Siinä on kahdeksan puheenvuoroa. Älä sekoita Lisa Müllerin tekstiä aiemmassa suunnitelmassa mainittuun Bernan haastatteluun: sitä haastattelua ei ole julkaistu C03:n nykyiseksi päätekstiksi.",
      ],
    },
    {
      id:"pre-country",kind:"question",phase:"Ennakkokysymys 1/2",
      title:"Tunnistatko Itävallan saksankielisen nimen?",
      paragraphs:["Kokeile ilman sanastoa. Tämä kertoo vain alkutilanteesta eikä ole itsenäistä osaamisnäyttöä."],
      question:{
        type:"choice",skillId:"L1-INT-03",
        prompt:"Mikä saksankielisistä maan nimistä tarkoittaa Itävaltaa?",
        options:[
          {id:"a",label:"Österreich"},
          {id:"b",label:"Deutschland",wrongFeedback:"Deutschland on Saksa, ei Itävalta."},
          {id:"c",label:"Finnland",wrongFeedback:"Finnland tarkoittaa Suomea."},
        ],
        correctOption:"a",success:"Oikein. Österreich = Itävalta.",
        hint:"Tämä maan nimi alkaa Ö-kirjaimella.",
        reteach:"Deutschland = Saksa, Finnland = Suomi, Österreich = Itävalta.",
        genericWrong:"Vertaa kolmen maan saksankielisiä nimiä.",
      },
    },
    {
      id:"pre-place",kind:"question",phase:"Ennakkokysymys 2/2",
      title:"Onko Bern maa vai kaupunki?",
      paragraphs:["Kokeile vastata sen perusteella, mitä jo tiedät. Virhe ei estä jatkamista."],
      question:{
        type:"choice",skillId:"L1-READ-01",
        prompt:"Mikä kuvaa sanaa Bern oikein?",
        options:[
          {id:"a",label:"Se on Sveitsin kaupunki."},
          {id:"b",label:"Se on Saksan saksankielinen nimi.",wrongFeedback:"Saksan saksankielinen nimi on Deutschland."},
          {id:"c",label:"Se on Itävallan saksankielinen nimi.",wrongFeedback:"Itävalta on Österreich."},
        ],
        correctOption:"a",success:"Oikein. Bern on Sveitsin kaupunki, ei valtio.",
        hint:"Lisa Müllerin alkuperäistekstissä Bern on hänen asuinpaikkansa.",
        reteach:"Bern on kaupunki Sveitsissä. Schweiz tarkoittaa Sveitsiä, ja Deutschland tarkoittaa Saksaa.",
        genericWrong:"Erota paikannimestä, onko se maa vai kaupunki.",
      },
    },
    {
      id:"explain",kind:"explanation",phase:"Opettajan selitys",
      title:"Maan nimi ei ole sama asia kuin kaupungin nimi",
      paragraphs:[
        "Maa on esimerkiksi Deutschland (Saksa), Finnland (Suomi), Österreich (Itävalta) tai die Schweiz (Sveitsi). Kaupunki on esimerkiksi Bern, Berlin tai Wien.",
        "Lisa Müllerin alkuperäisessä keskustelussa esiintyy lause Ich komme aus Deutschland und ich wohne hier in Bern. Sen merkitys on: Olen kotoisin Saksasta ja asun täällä Bernissä.",
        "Tässä Deutschland kertoo Lisan lähtömaan. Bern taas kertoo kaupungin, jossa hän asuu. Ne voivat olla eri maissa, eikä asuinpaikka automaattisesti kerro syntymä- tai kansallisuustietoa.",
        "Sanat woher (mistä) ja wo (missä) ovat eri kysymyssanoja. Woher liittyy tässä alkuperään, wo asuinpaikkaan. Niitä käsitellään tarkemmin C03:n myöhemmillä tunneilla.",
        "Alussa riittää oppia päättely: aus Deutschland liittyy Saksasta tulemiseen; in Bern viittaa Bernissä olemiseen tai asumiseen.",
      ],
      help:[
        {title:"Onko Schweiz vai die Schweiz?",body:"Sveitsin nimi esitetään oppikirjassa muodossa die Schweiz. Ilmaus aus der Schweiz on poikkeavanmuotoinen verrattuna esimerkiksi aus Deutschland. Riittää, että tunnistat sen; sijamuotosääntöjä opetetaan myöhemmin."},
        {title:"Miksi Lisa on Saksasta mutta asuu Bernissä?",body:"Ihminen voi asua eri paikassa kuin mistä hän kertoo olevansa kotoisin. Teksti kertoo Lisan lähtömaaksi Saksan ja asuinkaupungiksi Bernin. Älä päättele enempää hänen henkilötiedoistaan."},
      ],
    },
    {
      id:"board",kind:"board",phase:"Opetustaulu",
      title:"Neljä maata ja kaksi kaupungin nimeä",
      paragraphs:[
        "Avaa kohdat rauhassa. Yritä ensin muistaa suomalainen vastine ennen selityksen lukemista.",
        "Österreich alkaa Ö:llä; die Schweiz sisältää artikkelin die. Näitä kirjoitusasuja ei tarvitse muuttaa suomalaisiksi lainasanoiksi.",
      ],
      board:[
        {label:"1 · Saksa",german:"Deutschland",meaning:"Maa · Saksa"},
        {label:"2 · Suomi",german:"Finnland",meaning:"Maa · Suomi"},
        {label:"3 · Itävalta",german:"Österreich",meaning:"Maa · Itävalta"},
        {label:"4 · Sveitsi",german:"die Schweiz",meaning:"Maa · Sveitsi; huomaa artikkeli die"},
        {label:"5 · Kaupunki Saksassa",german:"Berlin",meaning:"Kaupunki · Berliini"},
        {label:"6 · Kaupunki Sveitsissä",german:"Bern",meaning:"Kaupunki · Bern, ei maan nimi"},
      ],
    },
    {
      id:"vocabulary",kind:"book",phase:"Kirjan sanasto",
      title:"Etsi maiden nimet C03:n omasta sanastosta",
      paragraphs:[
        "Avaa C03:n Sanasto-sivu. Etsi Deutschland, Finnland, Österreich ja die Schweiz. Tutki myös sanat das Land (maa) ja die Stadt (kaupunki).",
        "Vertaa ääneen tai hiljaa muotoja Deutschland ja Finnland. Tutki huolellisesti Österreich-sanan Ö ja Schweiz-sanan kirjoitusasu.",
        "Sanasto on kokonaan LOSin sisällä. Vahvista harjoittelu vasta, kun olet lukenut kuusi nimettyä sanaa. Vahvistus ei automaattisesti todista ääntämisen onnistumista.",
      ],
      bookLinks:[{label:"Avaa C03:n sanasto",chapterId:"03",section:"vocabulary",instruction:"Etsi neljä maata sekä das Land ja die Stadt."}],
      activityId:"vocabulary-read",activityLabel:"Luin maiden nimet ja maa/kaupunki-sanat C03:n sanastosta",
    },
    {
      id:"guided",kind:"question",phase:"Ohjattu harjoittelu",
      title:"Valitse Suomen saksankielinen nimi",
      paragraphs:["Kokeile sanoa itsellesi ensin koko sanapari: Suomi, Finnland. Tunnista sitten oikea vaihtoehto."],
      question:{
        type:"choice",skillId:"L1-INT-03",
        prompt:"Mikä on Suomen saksankielinen nimi?",
        options:[
          {id:"a",label:"Finnland"},
          {id:"b",label:"Österreich",wrongFeedback:"Österreich tarkoittaa Itävaltaa."},
          {id:"c",label:"Schweden",wrongFeedback:"Schweden tarkoittaa Ruotsia."},
        ],
        correctOption:"a",success:"Oikein. Finnland on Suomi.",
        hint:"Se muistuttaa suomalaisesta maasta käytettyä kansainvälistä nimitystä Finland.",
        reteach:"Finnland = Suomi, Österreich = Itävalta, Schweden = Ruotsi.",
        genericWrong:"Etsi Suomen saksankielinen nimi.",
      },
    },
    {
      id:"culture",kind:"book",phase:"Kulttuuri",
      title:"Mitä DACH tarkoittaa?",
      paragraphs:[
        "Avaa C03:n Kulttuuri-sivu ja etsi DACH-lyhenne. Se viittaa Saksaan, Itävaltaan ja Sveitsiin, eli Deutschland, Österreich ja die Schweiz.",
        "Älä päättele, että kaikki sveitsiläiset puhuisivat kotikielenään saksaa. Sveitsi on monikielinen maa. DACH on tässä alueellinen muistisääntö, ei luettelo jokaisen asukkaan äidinkielestä.",
        "Etsi myös ilmaus aus der Schweiz. Se on tässä tunnistettava poikkeus, ei vielä koko saksan sijamuotojärjestelmän harjoitus.",
      ],
      bookLinks:[{label:"Avaa C03:n DACH-kulttuurisivu",chapterId:"03",section:"culture",instruction:"Erota Saksa, Itävalta, Sveitsi sekä niiden kieli- ja aluetiedot."}],
      activityId:"culture-read",activityLabel:"Tutustuin DACH-maihin ja Sveitsin monikielisyyteen",
    },
    {
      id:"geography",kind:"explanation",phase:"Tekstin ymmärtämisen tuki",
      title:"Lisan tekstissä mainitaan kaksi maata ja yksi kaupunki",
      paragraphs:[
        "Lisa Müllerin alkuperäisdialogissa vieras kysyy: Kommen Sie aus Österreich? eli Oletteko te Itävallasta? Lisa vastaa Nein, ich komme aus Deutschland und ich wohne hier in Bern.",
        "Itävalta mainitaan siis kysymyksessä, mutta Lisa ei sano olevansa Itävallasta. Hänen vastauksensa alkaa Nein, ei.",
        "Deutschland on Lisan kertoma lähtömaa. Bern on hänen asuinkaupunkinsa Sveitsissä. Nämä ovat tekstin kolme tärkeintä paikannimeä.",
        "Alkuperäistekstissä esiintyy myös muodollinen Sie-puhuttelu. Sinun ei tarvitse vielä itse käyttää sen koko verbitaivutusta; sitä opetetaan aktiivisesti C04:ssä.",
      ],
    },
    {
      id:"source",kind:"book",phase:"Alkuperäinen Text A",
      title:"Etsi Lisa Müllerin kahdeksasta repliikistä maat ja asuinkaupunki",
      paragraphs:[
        "Avaa C03:n alkuperäinen Text A. Kyseessä on Wikibooksin kahdeksan puheenvuoron julkaistu Lisa Müller -dialogi (M-WB-07), ei aiemman suunnitelman Berna-haastattelu.",
        "Lue dialogi kokonaan suomennosten avulla. Etsi seitsemännestä vuorosta Österreich ja kahdeksannesta vuorosta Deutschland sekä Bern.",
        "Kun olet lukenut tekstin, vahvista harjoittelu. Vahvistus kertoo lukutyöstä, ei kuuntelusta: Lisa Müllerin dialogille ei ole tässä kirjassa varmennettua äänitettä.",
        "Seuraava tunti L013 käsittelee saman alkuperäistekstin tarkemmin ja käyttää kirjan oikeita C03-SOURCE-ymmärryskysymyksiä. Niitä ei merkitä suoritetuiksi vain tämän linkin avaamisesta.",
      ],
      bookLinks:[{label:"Avaa C03:n koko alkuperäinen Text A",chapterId:"03",section:"text",instruction:"Lue kaikki kahdeksan repliikkiä ja etsi Österreich, Deutschland sekä Bern."}],
      activityId:"text-a-scanned",activityLabel:"Luin Lisa Müllerin kahdeksan repliikkiä ja etsin paikannimet",
    },
    {
      id:"independent",kind:"question",phase:"Itsenäinen muistaminen",
      title:"Muistatko Itävallan nimen ilman sanastoa?",
      paragraphs:["Sulje mallitaulu ja kirjan sanasto. Kirjoita sana itse. Vihjeen käyttäminen auttaa, mutta yritystä ei silloin lasketa itsenäiseksi ensiyritykseksi."],
      question:{
        type:"text",skillId:"L1-INT-03",evidenceRole:"independent",
        prompt:"Kirjoita Itävalta saksaksi. Muista sanan alkukirjain.",
        accepted:["Österreich"],
        success:"Oikein. Österreich tarkoittaa Itävaltaa.",
        hint:"Sana alkaa Ö ja loppuu reich.",
        reteach:"Österreich on Itävalta; Deutschland on Saksa. Yritä kirjoittaa Österreich uudelleen myöhemmin ilman vihjettä.",
        genericWrong:"Tarkista Ö-kirjain ja loppuosa -reich.",
        wrongAnswers:{"osterreich":"Kirjoita alkukirjain Ö: Österreich, ei Osterreich.",
          "deutschland":"Deutschland tarkoittaa Saksaa. Itävalta on Österreich."},
      },
    },
    {
      id:"application",kind:"question",phase:"Soveltava tarkistus",
      title:"Lähtömaa ei ole sama kuin asuinkaupunki",
      paragraphs:["Käytä nyt Lisa Müllerin tekstistä opittua maantieteellistä eroa. Tämä kysymys käsittelee luettua tietoa, ei hänen muita henkilötietojaan."],
      question:{
        type:"choice",skillId:"L1-READ-01",evidenceRole:"application",
        prompt:"Lisa sanoo: Ich komme aus Deutschland und ich wohne hier in Bern. Mikä tulkinta on oikea?",
        options:[
          {id:"a",label:"Hän kertoo olevansa kotoisin Saksasta ja asuvansa Bernissä."},
          {id:"b",label:"Hän kertoo olevansa kotoisin Itävallasta ja asuvansa Saksassa.",wrongFeedback:"Itävalta on vieraan kysymyksessä, jonka Lisa kieltää."},
          {id:"c",label:"Hän kertoo, että Bern on Saksan saksankielinen nimi.",wrongFeedback:"Bern on kaupunki. Saksan nimi on Deutschland."},
        ],
        correctOption:"a",success:"Oikein. Saksa on Lisan kertoma lähtömaa ja Bern asuinkaupunki.",
        hint:"Aus Deutschland = Saksasta; in Bern = Bernissä.",
        reteach:"Woher? kysyy mistä; wo? kysyy missä. Lisa sanoo olevansa Saksasta ja asuvansa Bernissä.",
        genericWrong:"Erota tekstin lähtömaa ja asuinkaupunki.",
      },
    },
    {
      id:"exit",kind:"question",phase:"Lopputarkistus",
      title:"Tunnistatko maa- ja kaupunkinimet?",
      paragraphs:["Valitse yhdistelmä ilman mallitaulua. Tämä on rajattu loppukysymys, ei koko kielitaidon koe."],
      question:{
        type:"choice",skillId:"L1-INT-03",evidenceRole:"exit",
        prompt:"Mikä pari sisältää ensin Sveitsin saksankielisen nimen ja sitten kaupungin Sveitsissä?",
        options:[
          {id:"a",label:"die Schweiz – Bern"},
          {id:"b",label:"Deutschland – Bern",wrongFeedback:"Deutschland on Saksa. Sveitsi on die Schweiz."},
          {id:"c",label:"Österreich – Berlin",wrongFeedback:"Österreich on Itävalta ja Berlin sijaitsee Saksassa."},
        ],
        correctOption:"a",success:"Oikein. die Schweiz on Sveitsi ja Bern on Sveitsin kaupunki.",
        hint:"Sveitsin nimi sisältää artikkelin die.",
        reteach:"die Schweiz = Sveitsi; Bern = kaupunki Sveitsissä. Deutschland = Saksa ja Österreich = Itävalta.",
        genericWrong:"Etsi ensin oikea maan nimi ja sitten oikea kaupunki.",
      },
    },
    {
      id:"summary",kind:"summary",phase:"Yhteenveto",
      title:"Tunnistat nyt neljä maata ja erotat Bernin kaupungiksi",
      paragraphs:[
        "Harjoittelit Deutschland, Finnland, Österreich ja die Schweiz -nimiä, DACH-alueita sekä eroa maan ja kaupungin välillä.",
        "Luit LOSin sisäisen Lisa Müller -keskustelun ja erottelit Itävallasta kysymisen, Saksasta tulemisen ja Bernissä asumisen. Työn vahvistukset ovat omia opiskelumerkintöjä, eivät väitteitä kuunteluosaamisesta.",
        "Oppitunti voidaan merkitä läpikäydyksi, kun olet vastannut opetuksen tarkistuksiin ja vahvistanut sanaston, kulttuurisivun ja koko alkuperäisen tekstin käsittelyn.",
        "Seuraavalla oppitunnilla L013 käsittelet Lisan koko dialogia yksityiskohtaisemmin ja vastaat varsinaisiin tarkistettaviin tekstinymmärtämiskysymyksiin.",
      ],
    },
  ],
};
