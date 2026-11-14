import type { TeacherLesson } from "./engine.ts";

/**
 * L012 C03 first beginner lesson: countries and cities, not premature
 * production of woher, aus der Schweiz, or dative. C03 Text A's source
 * replacement (Berna M-DIB-01 -> Lisa M-WB-07) is documented in the repository.
 * Reconcile the older compiled master source and obtain human rights/language QA.
 * This manuscript uses only verified chapter vocabulary and country names.
 */
export const LOS1_L012_TEACHER: TeacherLesson = {
  id:"L012",bookId:1,chapterId:"03",version:"2.0.0-preview.1",
  title:"Maat ja paikat",
  objective:"Tunnistan maiden nimet Deutschland, Finnland, Österreich ja die Schweiz sekä erotan maan ja kaupungin.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["culture-reviewed"],
  requiredPracticeIds:["C03-EX-03","C03-EX-04","C03-EX-05"],
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"Nimestä lähtömaahan",
      paragraphs:[
        "C02:ssa opit kysymään nimen ja esittelemään itsesi. Nyt aloitat C03:n oppimalla muutaman tärkeän maan nimen saksaksi.",
        "Tällä tunnilla tunnistat maiden ja kaupunkien nimet sekä harjoittelet niiden kirjoitusasua. Lähtöpaikan kysymys Woher kommst du? ja kommen-verbin taivutus opetetaan aktiivisesti myöhemmällä C03-tunnilla.",
        "Aloita saksan maantieteellisistä sanoista. Sinun ei tarvitse vielä muodostaa aus der Schweiz -rakennetta tai osata datiivia.",
      ],
    },
    {
      id:"recall",phase:"Esitiedot",kind:"question",
      title:"Muistatko oman nimen kertomisen?",
      paragraphs:["Ennen uutta sisältöä palauta mieleen edellisessä kappaleessa opittu ilmaus."],
      question:{
        type:"choice",skillId:"L1-INT-02",
        prompt:"Millä lauseella voit kertoa kuvitteellisen nimesi olevan Mia?",
        options:[
          {id:"a",label:"Ich heiße Mia."},
          {id:"b",label:"Du heißt Mia.",wrongFeedback:"Du heißt Mia. kertoo toisen henkilön nimen, ei puhujan omaa nimeä."},
          {id:"c",label:"Wie heißt du?",wrongFeedback:"Tämä kysyy toisen nimeä eikä kerro omaasi."},
        ],
        correctOption:"a",success:"Oikein. Ich heiße Mia. on esittäytyminen. Myös Ich bin Mia. olisi oikein.",
        hint:"Muista ich, joka tarkoittaa minä.",
        reteach:"Ich heiße Mia. ja Ich bin Mia. kertovat puhujan oman nimen. Wie heißt du? kysyy toisen nimeä.",
        genericWrong:"Etsi minämuotoinen lause, joka kertoo nimen.",
      },
    },
    {
      id:"meaning",phase:"Opetus",kind:"explanation",
      title:"Neljä maata, neljä saksankielistä nimeä",
      paragraphs:[
        "Suomi on saksaksi Finnland. Saksa on Deutschland. Itävalta on Österreich ja Sveitsi on die Schweiz.",
        "Saksassa maiden nimet kirjoitetaan isolla alkukirjaimella. Österreich sisältää Ö-kirjaimen. Sanassa Schweiz on substantiivin edellä artikkeli die, joka kuuluu sen opittuun sanakirjamuotoon.",
        "Maiden nimet ovat erisnimiä. Älä sekoita niitä kaupunkien nimiin: Berlin on kaupunki, Deutschland on maa. Bern on kaupunki Sveitsissä, joka on saksaksi die Schweiz.",
        "Tällä tunnilla riittää, että tunnistat ja kirjoitat nimet. Rakennetta aus der Schweiz ei vielä muodosteta itsenäisesti.",
      ],
      help:[
        {title:"Onko Berlin maa?",body:"Ei. Berlin eli Berliini on kaupunki Saksassa. Saksa on saksaksi Deutschland."},
        {title:"Miksi sanotaan die Schweiz?",body:"Schweiz on yksi maiden nimistä, joiden kanssa käytetään artikkelia. Opit tässä koko nimen die Schweiz. Lähtöpaikan rakenteita opetellaan myöhemmin."},
        {title:"Miten Ö kirjoitetaan?",body:"Saksan Österreich alkaa isolla Ö-kirjaimella. Voit käyttää näppäimistön pitkää painallusta tai saksan näppäimistöasettelua."},
      ],
    },
    {
      id:"board",phase:"Mallisuoritus",kind:"board",
      title:"Erota maa ja kaupunki vaihe vaiheelta",
      paragraphs:[
        "Opettaja näyttää ensin saksankielisen nimen, sitten sen suomenkielisen merkityksen. Katso, mikä on maa ja mikä kaupunki.",
        "Lopuksi näet kaksi maan ja kaupungin paria, jotka eivät tarkoita samaa asiaa.",
      ],
      board:[
        {label:"1 · Maa",german:"Finnland",meaning:"Suomi, maa"},
        {label:"2 · Maa",german:"Deutschland",meaning:"Saksa, maa"},
        {label:"3 · Maa",german:"Österreich",meaning:"Itävalta, maa"},
        {label:"4 · Maa",german:"die Schweiz",meaning:"Sveitsi, maa"},
        {label:"5 · Kaupunki ja maa",german:"Berlin · Deutschland",meaning:"Berliini on kaupunki Saksassa"},
        {label:"6 · Kaupunki ja maa",german:"Bern · die Schweiz",meaning:"Bern on kaupunki Sveitsissä"},
      ],
    },
    {
      id:"guided",phase:"Ohjattu harjoitus",kind:"question",
      title:"Mikä maista on Saksa?",
      paragraphs:["Vertaile nimiä opetustaulun avulla. Tämä on harjoittelua, joten saat selityksen tarvittaessa."],
      question:{
        type:"choice",skillId:"L1-INT-03",
        prompt:"Mikä saksankielinen nimi tarkoittaa Saksaa?",
        options:[
          {id:"a",label:"Finnland",wrongFeedback:"Finnland on Suomi, ei Saksa."},
          {id:"b",label:"Deutschland"},
          {id:"c",label:"Österreich",wrongFeedback:"Österreich tarkoittaa Itävaltaa."},
        ],
        correctOption:"b",success:"Oikein. Deutschland = Saksa.",
        hint:"Saksan nimi alkaa Deutsch-.",
        reteach:"Deutschland = Saksa. Finnland = Suomi. Österreich = Itävalta.",
        genericWrong:"Kertaa maiden kolme ensimmäistä nimeä opetustaulusta.",
      },
    },
    {
      id:"country-vs-city",phase:"Opetus",kind:"explanation",
      title:"Maan nimi ja kaupungin nimi kertovat eri asioita",
      paragraphs:[
        "Deutschland tarkoittaa maata Saksa. Berlin tarkoittaa Berliinin kaupunkia. Molemmat ovat paikannimiä, mutta eri tasolla.",
        "Österreich tarkoittaa Itävaltaa ja Finnland tarkoittaa Suomea. Näiden nimien avulla pystyt myöhemmin kertomaan, mistä henkilö on kotoisin.",
        "Saksankielisiin alueisiin kuuluvat Saksan ja Itävallan lisäksi esimerkiksi Sveitsin saksankieliset osat. Sveitsissä käytetään myös muita kieliä.",
        "Lähtöpaikan kysymyssana woher tarkoittaa mistä. Sen ja wo-sanan eron opettelemme yksityiskohtaisesti myöhemmin C03:ssa.",
      ],
    },
    {
      id:"vocabulary",phase:"Oppikirjan sanasto",kind:"book",
      title:"Harjoittele maiden nimet kirjassa",
      paragraphs:[
        "Avaa C03:n Sanasto. Etsi Deutschland, Finnland, Österreich ja die Schweiz. Lue niiden merkitykset ja huomaa kirjoitusasu.",
        "Tee kirjan oikeat tehtävät C03-EX-03, C03-EX-04 ja C03-EX-05 harjoittelusivulla. Niissä tunnistetaan Suomen, Saksan ja Itävallan nimet.",
        "Harjoitusten vastaukset tallentuvat samaan C03-kappaleen kirjatallennukseen. Oikean vaihtoehdon katsominen ei yksin merkitse itsenäistä osaamista.",
      ],
      bookLinks:[
        {label:"C03 · Sanasto",chapterId:"03",section:"vocabulary",instruction:"Opettele neljä maan nimeä ja tunnista isot alkukirjaimet."},
        {label:"C03 · Harjoittele",chapterId:"03",section:"practice",instruction:"Tee C03-EX-03, C03-EX-04 ja C03-EX-05."},
      ],
    },
    {
      id:"independent",phase:"Itsenäinen yritys",kind:"question",
      title:"Kirjoita Suomen nimi muistista",
      paragraphs:["Sulje näkyvä sanasto ennen vastaamista. Kirjoita maan nimi kokonaan itse."],
      question:{
        type:"text",skillId:"L1-INT-03",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi: Suomi",
        accepted:["Finnland"],
        success:"Oikein. Suomi on Finnland.",
        hint:"Muista alun Finn- ja lopun -land. Kirjoita maan nimi isolla.",
        reteach:"Finnland tarkoittaa Suomea. Se kirjoitetaan yhtenä sanana.",
        genericWrong:"Tarkista Finnland-sanan kirjoitusasu ja alkukirjain.",
        wrongAnswers:{"deutschland":"Deutschland tarkoittaa Saksaa.","österreich":"Österreich tarkoittaa Itävaltaa."},
      },
    },
    {
      id:"culture",phase:"Kulttuuri",kind:"book",
      title:"Tutustu saksankielisiin maihin ja alueisiin",
      paragraphs:[
        "Avaa C03:n Kulttuuri-sivu. Katso maiden nimet ja kuvat. Tunnista Saksa, Itävalta ja Sveitsi sekä niiden mahdolliset kaupungit.",
        "Saksaa puhutaan näiden maiden alueilla eri tavoin. On tärkeää olla väittämättä, että jokainen Sveitsissä asuva puhuu vain saksaa.",
        "Tämä on tutustuminen, ei itsenäinen kuuntelukoe tai aukoton maantiedon testi. Vahvista lukeminen vain, kun olet oikeasti tarkistanut sisällön.",
      ],
      bookLinks:[{label:"C03 · Kulttuuri",chapterId:"03",section:"culture",instruction:"Erota saksankieliset maat, alueet ja kaupungit."}],
      activityId:"culture-reviewed",activityLabel:"Tutustuin C03:n kulttuurisisältöön",
    },
    {
      id:"application",phase:"Soveltaminen",kind:"question",
      title:"Valitse oikea maa ja kaupunki",
      paragraphs:["Sovella nyt kahta aiemmin opetettua maantieteellistä nimeä yhteen."],
      question:{
        type:"choice",skillId:"L1-INT-03",evidenceRole:"application",
        prompt:"Mikä pari kertoo ensin kaupungin ja sitten sen maan oikein?",
        options:[
          {id:"a",label:"Berlin · Deutschland"},
          {id:"b",label:"Berlin · Finnland",wrongFeedback:"Berlin on Saksan kaupunki, ei Suomessa."},
          {id:"c",label:"Deutschland · Berlin",wrongFeedback:"Tässä maa tulee ensin ja kaupunki toisena, vaikka pyydettiin kaupunki ensin."},
        ],
        correctOption:"a",success:"Oikein. Berlin on kaupunki Saksassa eli Saksassa.",
        hint:"Muista, että Berlin on kaupunki ja Deutschland on maa.",
        reteach:"Berlin = Berliini, Deutschland = Saksa. Parissa kirjoitetaan kaupunki ensin ja maa toisena.",
        genericWrong:"Tarkista ensin pyydetty järjestys: kaupunki, maa.",
      },
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Tunnista Itävalta ilman sanastoa",
      paragraphs:["Vastaa ensin ilman näkyvää mallia. Tässä ei kysytä aus-rakenteen taivutusta."],
      question:{
        type:"choice",skillId:"L1-INT-03",evidenceRole:"exit",
        prompt:"Mikä näistä tarkoittaa Itävaltaa?",
        options:[
          {id:"a",label:"Deutschland",wrongFeedback:"Deutschland tarkoittaa Saksaa."},
          {id:"b",label:"Österreich"},
          {id:"c",label:"Finnland",wrongFeedback:"Finnland tarkoittaa Suomea."},
        ],
        correctOption:"b",success:"Oikein. Österreich tarkoittaa Itävaltaa.",
        hint:"Itävallan saksankielinen nimi alkaa Ö-kirjaimella.",
        reteach:"Österreich on Itävalta. Deutschland on Saksa ja Finnland Suomi.",
        genericWrong:"Vertaa kolme nimeä aiempaan opetukseen.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Nyt tunnistat ensimmäiset maat",
      paragraphs:[
        "Opit tunnistamaan Finnlandin, Deutschlandin, Österreichin ja die Schweiz -nimen sekä erottamaan maan ja kaupungin.",
        "Itsenäinen onnistuminen näkyy erikseen ohjatuista harjoituksista. Tunnin läpikäynti ei itsessään todista kaikkia taitoja pysyvästi hallituiksi.",
        "L013:ssa harjoitellaan lukemaan nykyiseksi päätekstiksi dokumentoidusti valittua Lisa Müllerin dialogia lähtömaan ja asuinpaikan tunnistamiseksi. Riippumaton kielen, oikeuksien, tekstin kokonaisuuden ja vastausavainten tarkistus on edelleen avoin.",
      ],
    },
  ],
};
