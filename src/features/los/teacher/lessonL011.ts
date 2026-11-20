import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";

/**
 * L011 closes C02 using the one existing 15-item chapter exam.
 * No alternate answer store or invented skill score. Workbook submission,
 * application writing and student self-assessment are separate evidences.
 * Human language review and real-device/audio QA remain unpublished gates.
 */
const C02_TEST_IDS = losExercisesFor("02").map(item=>item.id);
export const LOS1_L011_TEACHER: TeacherLesson = {
  id:"L011", bookId:1, chapterId:"02", version:"2.0.0-preview.1",
  title:"Harjoittele ja testaa C02",
  objective:"Kysyn ja kerron nimen, käytän opetettuja heißen- ja sein-verbin minä- ja sinämuotoja sekä palautan C02:n kappaletestin ja itsearvioinnin.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["sources-reviewed"],
  requiredPracticeIds:[],
  chapterAssessment:{
    requiredTestIds:C02_TEST_IDS,
    requireApplicationDraft:true,
    minSelfAssessmentLength:15,
  },
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"C02:n viimeinen kertaus",
      paragraphs:[
        "Olet oppinut jo nimikysymyksen Wie heißt du?, esittäytymisen Ich heiße Mia. ja Ich bin Mia. sekä kaksi minä–sinämuotoparia.",
        "Kertaamme opettajan kanssa tärkeimmät erot, harjoittelemme uudessa tilanteessa ja teemme C02:n oikean 15 osatehtävän kappaletestin kirjassa.",
        "Kirjoitat myös oman kahden lauseen esittäytymisen kuvitteellisilla nimillä ja kirjaat itsearvioinnin. Opetustilan tunnin suorittaminen ei ole kielitaitotodistus eikä kokeen pisteytyksen korvike.",
      ],
    },
    {
      id:"recall",phase:"Muistelu",kind:"question",
      title:"Mikä lause kysyy nimen?",
      paragraphs:["Vastaa ensin muistin perusteella. Saat kohdennetun selityksen, jos valitset väärin."],
      question:{
        type:"choice",skillId:"L1-INT-02",
        prompt:"Haluat kysyä uuden tutun nimeä. Mitä sanot?",
        options:[
          {id:"a",label:"Wie heißt du?"},
          {id:"b",label:"Ich heiße Mia.",wrongFeedback:"Tämä on vastaus omaan nimeen, ei kysymys toisen nimestä."},
          {id:"c",label:"Guten Tag!",wrongFeedback:"Tämä on päivätervehdys, ei nimikysymys."},
        ],
        correctOption:"a",success:"Oikein. Wie heißt du? kysyy nimen.",
        hint:"Kysymys alkaa sanalla Wie.",
        reteach:"Wie heißt du? kysyy nimen. Ich heiße Mia. kertoo sen. Verbin du-muoto on heißt.",
        genericWrong:"Etsi kysymys, jossa on Wie ja du.",
      },
    },
    {
      id:"rule",phase:"Opetus",kind:"explanation",
      title:"Kertaa ensin kysyminen ja vastaaminen",
      paragraphs:[
        "Kun esittäydyn itse, voin sanoa Ich heiße Mia. tai Ich bin Mia. Molemmat ovat tässä tilanteessa oikein. Jos tehtävä vaatii nimenomaan heißen-verbiä, käytän Ich heiße Mia.",
        "Kun puhun sinusta, sanon du heißt tai du bist. Älä vaihda ich- ja du-pronominia keskenään.",
        "Saksan heiße ja heißt sisältävät ß-kirjaimen. Sana Tschüss on eri sana ja kirjoitetaan kahdella s-kirjaimella.",
        "Nimen kysymiseen sopii Wie heißt du? Vielä ei tarvitse osata koko heißen- tai sein-verbin kuuden persoonan taivutusta.",
      ],
      help:[
        {title:"Saanko vastata myös Ich bin Mia?",body:"Kyllä, kun pyydetään kertomaan oma nimi. Jos tehtävä kuitenkin nimenomaisesti käskee käyttää heißen-verbiä, siinä harjoiteltu vastaus on Ich heiße Mia."},
        {title:"Miksi du heißt eikä du heiße?",body:"Saksan verbi muuttuu persoonan mukaan: ich heiße, du heißt. Tämä pari kannattaa opetella kahdessa kokonaisessa lauseessa."},
      ],
    },
    {
      id:"board",phase:"Mallisuoritus",kind:"board",
      title:"Näin syntyy pieni esittäytymiskeskustelu",
      paragraphs:[
        "Opettaja muodostaa ensin kysymyksen, sitten esittelyn. Vertaa verbiä eri persoonamuotoihin.",
        "Kun opit osat, voit yhdistää ne itse uudessa tilanteessa.",
      ],
      board:[
        {label:"1 · Tervehdys",german:"Hallo!",meaning:"Hei. Kohtaaminen alkaa."},
        {label:"2 · Nimeni",german:"Ich heiße Mia.",meaning:"Nimeni on Mia. Ich tarvitsee heiße-muodon."},
        {label:"3 · Nimikysymys",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on? Du tarvitsee heißt-muodon."},
        {label:"4 · Toinen esittelytapa",german:"Ich bin Max.",meaning:"Minä olen Max. Bin on sein-verbin ich-muoto."},
        {label:"5 · Sinä olet",german:"Du bist Max.",meaning:"Sinä olet Max. Bist on sein-verbin du-muoto."},
        {label:"6 · Hyvästely",german:"Tschüss!",meaning:"Moikka. Kohtaaminen päättyy."},
      ],
    },
    {
      id:"guided",phase:"Ohjattu harjoitus",kind:"question",
      title:"Valitse oikein kaksi verbimuotoa",
      paragraphs:["Kokeile ensin opettajan mallin perusteella. Myöhemmin saat saman ilmiön ilman näkyvää mallia."],
      question:{
        type:"choice",skillId:"L1-GRAM-01",
        prompt:"Mitkä muodot täydentävät: Ich ___ Mia. Du ___ Max. (sein-verbi)?",
        options:[
          {id:"a",label:"bist / bin",wrongFeedback:"Nämä ovat oikeita muotoja mutta väärässä järjestyksessä. Ich tarvitsee bin."},
          {id:"b",label:"bin / bist"},
          {id:"c",label:"bin / ist",wrongFeedback:"Ist kuuluu er/sie/es-muotoon, ei du-lauseeseen."},
        ],
        correctOption:"b",success:"Oikein. Ich bin Mia. Du bist Max.",
        hint:"Ich = bin, du = bist.",
        reteach:"Sein-verbin minämuoto on bin ja sinämuoto bist. Koko taivutusta ei vielä tarvita.",
        genericWrong:"Vertaa jokaista pronominia sille kuuluvaan muotoon.",
      },
    },
    {
      id:"sources",phase:"Tekstin vertailu",kind:"book",
      title:"Tunnista kaksi tapaa kahdesta alkuperäistekstistä",
      paragraphs:[
        "Avaa ensin Franzin ja Gretan Text A ja etsi ich bin Franz sekä Ich heiße Greta. Avaa sitten Text B ja etsi Ich bin Thomas sekä Ich heiße Takashi.",
        "Tunnista myös Das ist Peter. Se on tässä vielä tunnistettava tapa esitellä toinen ihminen, ei koko uuden kieliopin koe.",
        "Jos kuuntelit Text B:n ihmisäänitettä, sait kuunteluharjoittelua. Tekstivastineen lukeminen ei itsessään osoita kuullun ymmärtämistä.",
      ],
      bookLinks:[
        {label:"C02 · Text A",chapterId:"02",section:"text",instruction:"Etsi Franzin ja Gretan kaksi nimifraasia."},
        {label:"C02 · Text B",chapterId:"02",section:"text-b",instruction:"Vertaa Thomasin ja Takashin nimifraaseja."},
      ],
      activityId:"sources-reviewed",activityLabel:"Vertasin molempien tekstien nimifraaseja",
    },
    {
      id:"practice",phase:"Harjoittelu",kind:"book",
      title:"Harjoittele oikeilla kirjan tehtävillä",
      paragraphs:[
        "Avaa C02:n Harjoittele. Tee ensin opetetut nimisanaston tehtävät C02-EX-01 ja C02-EX-02, ja sen jälkeen minä–sinämuotoparien harjoitukset C02-EX-03–06.",
        "Jos jokin muoto ei onnistu, avaa perustelu ja palaa opettajan malliin. Näissä harjoituksissa saa käyttää selityksiä.",
        "Kirjan harjoituksia ei kopioida tähän opetusnäkymään eikä niiden vastauksia muuteta kokeen vastauksiksi.",
      ],
      bookLinks:[{label:"C02 · Harjoittele",chapterId:"02",section:"practice",instruction:"Kertaa etenkin C02-EX-01–06 ja käytä perustelut oppimiseen."}],
      help:[{title:"Mitä teen, jos sekoitan heißen ja sein?",body:"Katso mallitaulun kolme paria: ich heiße / du heißt, ich bin / du bist sekä Wie heißt du?. Harjoittele kutakin ensin kokonaisena lauseena."}],
    },
    {
      id:"independent",phase:"Itsenäinen tuottaminen",kind:"question",
      title:"Kerro keksitty nimi ilman näkyvää mallia",
      paragraphs:["Sulje kirjan vastaukset. Tässä tehtävässä kumpikin luonteva esittäytymistapa hyväksytään."],
      question:{
        type:"text",skillId:"L1-INT-02",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi: Nimeni on Mia. (kumpikin opetettu tapa käy)",
        accepted:["Ich heiße Mia.","Ich bin Mia."],
        success:"Oikein. Sekä Ich heiße Mia. että Ich bin Mia. ovat luontevia nimiesittelyjä.",
        hint:"Voit aloittaa Ich ja valita heiße tai bin.",
        reteach:"Voit kertoa nimesi muodossa Ich heiße Mia. tai Ich bin Mia. Molemmat ovat oikein.",
        genericWrong:"Tarkista minäpronomini Ich, opetettu verbi ja nimi Mia.",
        wrongAnswers:{"du heißt mia":"Du heißt Mia. kertoo toisen henkilön nimen, ei omaasi."},
      },
    },
    {
      id:"application-book",phase:"Oma esittäytyminen",kind:"book",
      title:"Kirjoita kirjaan kaksi omaa lausetta",
      paragraphs:[
        "Avaa C02:n Käytä saksaa -osio. Kirjoita ensin kuvitteellisesta itsestäsi käyttäen nimeä Mia ja kysy sen jälkeen toisen nimeä.",
        "Älä tallenna oikeita henkilötietoja. Kirjan tarkistuslista auttaa arvioimaan, käytitkö ich- ja du-muotoja sekä ß-kirjainta oikein.",
        "Oman tekstin tallennus osoittaa vain, että olet tehnyt tehtävän. Järjestelmä ei pisteytä vapaata kirjoittamista automaattisesti.",
      ],
      bookLinks:[{label:"C02 · Käytä saksaa",chapterId:"02",section:"apply",instruction:"Kirjoita kaksi lausetta ja tarkista ne omalla tarkistuslistalla."}],
    },
    {
      id:"application",phase:"Soveltaminen",kind:"question",
      title:"Mitä kysyt kuvitteelliselta Maxilta?",
      paragraphs:["Tapaat samanikäisen Maxin, jonka nimeä et vielä tiedä. Tässä kysytään, ei vastata."],
      question:{
        type:"choice",skillId:"L1-INT-02",evidenceRole:"application",
        prompt:"Mikä näistä kysyy Maxin nimeä sinutellen?",
        options:[
          {id:"a",label:"Wie heißt du?"},
          {id:"b",label:"Ich heiße Max.",wrongFeedback:"Tämä kertoo puhujan oman nimen. Haluat kysyä toisen nimeä."},
          {id:"c",label:"Du bist Max.",wrongFeedback:"Tämä on väite toisen nimestä, ei kysymys."},
        ],
        correctOption:"a",success:"Oikein. Wie heißt du? sopii tuttavan nimen kysymiseen.",
        hint:"Kysymys alkaa sanalla Wie.",
        reteach:"Wie heißt du? kysyy nimen. Ich heiße Max. kertoo sen.",
        genericWrong:"Etsi kysymys, älä nimilause.",
      },
    },
    {
      id:"exam-method",phase:"Kokeen ohje",kind:"explanation",
      title:"C02:n testi tehdään ilman näkyviä vihjeitä",
      paragraphs:[
        "Kirjassa on 15 varsinaista C02:n kappaletestin osatehtävää. Ne mittaavat tällä tasolla opetettuja nimifraaseja ja heißen- sekä sein-verbien minä- ja sinämuotoja.",
        "Vastaa kaikkiin tehtäviin ilman mallivastausta. Ratkaisut ja perustelut tulevat näkyviin vasta, kun painat kirjan Palauta testi -painiketta.",
        "Jos vastasit väärin, käytä palautetta myöhempään harjoitteluun. Uusinnassa sama tehtäväpankki tulee toistaiseksi uudelleen, joten uusi pistemäärä ei yksin todista myöhemmin vahvistettua osaamista.",
        "Kappaletestin pisteet eivät automaattisesti arvioi puhumista, luetun ymmärtämisen kaikkia osa-alueita tai virallista CEFR-tasoa.",
      ],
      help:[{title:"Pitääkö minun saada 15/15?",body:"Ei. Tunnin läpikäynti vaatii oikeasti palautetun kokeen, ei täydellistä pistemäärää. Palaute ohjaa kertausta."}],
    },
    {
      id:"exam",phase:"Kappaletesti",kind:"book",
      title:"Palauta oikea C02:n kappaletesti",
      paragraphs:[
        "Avaa kirjan Kappaletesti ja vastaa kaikkiin 15 osatehtävään. Paina Palauta testi vasta, kun olet yrittänyt tehtäviä itsenäisesti.",
        "Pelkkä sivun avaaminen, vaihtoehdon valitseminen tai testin täyttäminen ilman palautusta ei riitä. Palaa tänne vasta palautuksen jälkeen.",
        "Opetusmoottori lukee palautusajan ja vastaukset nykyisestä C02:n oppikirjatallennuksesta. Se ei luo rinnakkaista koekopiota tai uutta osaamispistemäärää.",
      ],
      bookLinks:[{label:"C02 · Kappaletesti",chapterId:"02",section:"test",instruction:"Tee 15 osatehtävää ja paina Palauta testi."}],
    },
    {
      id:"reflection",phase:"Itsearviointi",kind:"book",
      title:"Mitä osaat nyt tehdä ilman mallia?",
      paragraphs:[
        "Palautetun kappaletestin alapuolella on oma itsearviointi. Harjoittele esimerkiksi kysymään keksityn Maxin nimeä ja kertomaan oma kuvitteellinen nimesi.",
        "Kirjoita kenttään vähintään yksi oikea havainto siitä, mikä sujui ja mikä kaipaa vielä harjoitusta. Tekstin pituusvaatimus on vain tallennuksen varmistus, ei kielen oikeellisuuden arvio.",
        "Oman äänen nauhoittaminen ei ole pakollista. Ääntämistä ei arvioida koneellisesti.",
      ],
      bookLinks:[{label:"C02 · Kappaletestin itsearviointi",chapterId:"02",section:"test",instruction:"Kirjoita, mikä onnistui ja mitä kertaa seuraavaksi."}],
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Valitse oikea heißen-verbin muoto",
      paragraphs:["Viimeinen pieni tarkistus liittyy opetettuun sinämuotoon. Älä käytä kirjan mallia."],
      question:{
        type:"text",skillId:"L1-GRAM-01",evidenceRole:"exit",
        prompt:"Täydennä sanalla: Du ___ Mia. (heißen-verbi)",
        accepted:["heißt"],
        success:"Oikein. Du heißt Mia. sisältää heißen-verbin sinämuodon.",
        hint:"Du-muoto päättyy -t ja sisältää ß-kirjaimen.",
        reteach:"Ich heiße Mia. mutta Du heißt Mia. Sinämuoto on heißt.",
        genericWrong:"Tarkista ß-kirjain ja yksikön toisen persoonan pääte.",
        wrongAnswers:{"heiße":"Heiße on ich-muoto. Du tarvitsee heißt.","heißst":"Oikea muoto kirjoitetaan heißt, ei heißst."},
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"C02:n harjoitukset ja testi on tehty",
      paragraphs:[
        "Kertasit nimikysymyksen, esittäytymisen kaksi oikeaa tapaa sekä heißen- ja sein-verbien minä–sinämuodot.",
        "Tunnin läpikäynti edellyttää C02:n kirjaan palautettua kappaletestiä, omaa lyhyttä esittelyä ja itsearviointia. Pelkät käynnit sivuilla eivät ole osaamisen näyttöjä.",
        "Seuraavaksi C03:ssa harjoitellaan kertomaan, mistä maasta tai kaupungista henkilö on kotoisin. Siellä uusina sisältöinä opetetaan woher ja aus.",
      ],
    },
  ],
};
