import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 L011 · C02 5/5: final chapter review.
 * Uses the REAL C02 applicationDraft, testSubmittedAt and selfAssessment
 * fields in the chapter book; no duplicate grade/test/mastery data.
 * Text A / Text B source dialogue remains fully embedded in the LOS book.
 * Names Mia/Max are fictional. Editorial review, physical devices and
 * actual measured lesson duration remain open.
 */
export const LOS1_L011_TEACHER: TeacherLesson = {
  id:"L011",bookId:1,chapterId:"02",version:"2.0.0-preview.1",
  title:"Harjoittele ja testaa C02",
  objective:"Kysyn nimen ja esittäydyn keksityllä nimellä, kirjoitan kirjaan oman esittelyn, palautan C02-kappaletestin ja arvioin osaamistani.",
  estimatedMinutes:30,
  requiredQuestionIds:["pre-name","pre-form","guided","scenario","transfer","exit"],
  requiredActivityIds:["sources-compared","application-reviewed"],
  requiredPracticeIds:[],
  requiredChapterEvidence:["application-written","test-submitted","self-assessment"],
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"Toisen kappaleen kertaus: esittele itsesi ja testaa opittu",
      paragraphs:[
        "Olet harjoitellut toisen nimen kysymistä, omalla tai kuvitteellisella nimellä esittäytymistä ja kahden aidon esittelydialogin ymmärtämistä. Nyt kokoat nämä yhteen.",
        "Tällä tunnilla teet kolme oikeaa kirjatyötä: kirjoitat C02:n Käytä saksaa -sivulle kuvitteellisen esittelyn, palautat C02:n kappaletestin ja täytät testin jälkeisen itsearvioinnin.",
        "Tehtävät tallentuvat kirjan olemassa oleviin C02-kenttiin. Opettajanäkymään ei luoda toista testitulosta eikä kirjata alkuperäiseen L001–L060-opintopolkuun tekaistua vanhaa suoritusta.",
        "Palautettu testi ja läpikäyty tunti kertovat opiskelutyöstä. Ne eivät yksin todista pysyvää kielitaitoa, puheäänen laatua tai kuullun ymmärtämistä.",
      ],
    },
    {
      id:"pre-name",phase:"Muistelu 1/2",kind:"question",
      title:"Muistatko nimikysymyksen?",
      paragraphs:["Kokeile ilman näkyvää kirjaa. Ennakkokysymys paljastaa, pitääkö nimifraasia vielä kerrata; vastaus ei ole erillinen itsenäisen osaamisen näyttö."],
      question:{
        type:"choice",skillId:"L2-NAME-01",
        prompt:"Miten kysyt tuttavalta: Mikä sinun nimesi on?",
        options:[
          {id:"a",label:"Wie heißt du?"},
          {id:"b",label:"Wie geht's?",wrongFeedback:"Wie geht's? kysyy kuulumisia, ei nimeä."},
          {id:"c",label:"Wer ist Peter?",wrongFeedback:"Tämä kysyisi, kuka Peter on. Se ei ole toisen oman nimen kysyminen."},
        ],
        correctOption:"a",success:"Oikein. Wie heißt du? on tuttavallinen nimikysymys.",
        hint:"Se sisältää heißt-verbin du-muodon.",
        reteach:"Wie heißt du? = Mikä sinun nimesi on? Wie geht's? = Mitä kuuluu?",
        genericWrong:"Erota nimikysymys kuulumisten kysymisestä.",
      },
    },
    {
      id:"pre-form",phase:"Muistelu 2/2",kind:"question",
      title:"Kumpi on sein-verbin minämuoto?",
      paragraphs:["Verbi sein tarkoittaa olla. Palauta muistista yksi sen tärkeistä epäsäännöllisistä muodoista."],
      question:{
        type:"choice",skillId:"L1-GRA-01",
        prompt:"Täydennä: Ich ____ Mia. (sein)",
        options:[
          {id:"a",label:"bist",wrongFeedback:"Bist on sinämuoto: du bist."},
          {id:"b",label:"bin"},
          {id:"c",label:"heißt",wrongFeedback:"Heißt on heißen-verbin sinämuoto, ei sein-verbin minämuoto."},
        ],
        correctOption:"b",success:"Oikein. Ich bin Mia. kertoo, kuka puhuja on.",
        hint:"Sein-pari: ich bin, du bist.",
        reteach:"Sein: ich bin = minä olen; du bist = sinä olet.",
        genericWrong:"Etsi juuri sein-verbin minämuoto.",
      },
    },
    {
      id:"explain",phase:"Opettajan selitys",kind:"explanation",
      title:"Neljä perusmuotoa ja kaksi erilaista esittelyä",
      paragraphs:[
        "Heißen tarkoittaa tässä olla nimeltään. Sen kaksi opittua muotoa ovat ich heiße ja du heißt. Nimikysymyksessä Wie heißt du? käytetään sinämuotoa heißt.",
        "Sein tarkoittaa olla. Sen kaksi opittua muotoa ovat ich bin ja du bist. Ich bin Mia. ja Ich heiße Mia. sopivat molemmat omaan esittäytymiseen, mutta niitä ei rakenneta sekoittamalla kahta verbiä.",
        "Esitellessäsi toisen henkilön voit sanoa Das ist Peter. Se tarkoittaa Tämä on Peter, ei Minä olen Peter. Tämä ilmaus oli Thomasin ja Takashin Text B -keskustelussa.",
        "Franzin ja Gretan Text A:ssa kysytään myös kuulumisia: Wie geht's? Se ei ole nimikysymys. Tekstien erottaminen auttaa tulkitsemaan tilanteen oikein.",
      ],
      help:[
        {title:"Miksi du heißt, ei du heißst?",body:"Heißen-verbin sinämuoto kirjoitetaan du heißt. Muotoon ei lisätä ylimääräistä s-kirjainta ß:n jälkeen."},
        {title:"Voinko käyttää oikeaa nimeäni?",body:"Tässä kirjatehtävässä käytetään kuvitteellisia Mia- ja Max-nimiä. Omaa nimeä tai muita henkilökohtaisia tietoja ei tarvitse kirjoittaa."},
      ],
    },
    {
      id:"board",phase:"Opetustaulu",kind:"board",
      title:"Rakenna pieni nimikeskustelu muistista",
      paragraphs:[
        "Katso seuraavat vaiheet yksi kerrallaan. Mieti ensin suomeksi, kuka kysyy ja kuka vastaa. Kokeile sanoa ilmaus ennen kuin luet selityksen.",
        "Nimet ovat keksittyjä. Kappaletestissä sinun täytyy osata tunnistaa tarkoitus ja oikea muoto myös silloin, kun nimi vaihtuu.",
      ],
      board:[
        {label:"1 · Aloitus",german:"Hallo!",meaning:"Hei! · keskustelu alkaa"},
        {label:"2 · Nimikysymys",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on? · du heißt"},
        {label:"3 · Nimivastaus",german:"Ich heiße Mia.",meaning:"Minun nimeni on Mia. · ich heiße"},
        {label:"4 · Toinen esittäytyminen",german:"Ich bin Max.",meaning:"Olen Max. · ich bin"},
        {label:"5 · Esittele joku muu",german:"Das ist Peter.",meaning:"Tämä on Peter. · ei oma nimesi"},
        {label:"6 · Lopetus",german:"Tschüss!",meaning:"Moikka! · tavallinen tuttavallinen hyvästely"},
      ],
    },
    {
      id:"guided",phase:"Ohjattu harjoittelu",kind:"question",
      title:"Miten esittelet itsesi?",
      paragraphs:["Kuvittele olevasi Max ja kertovasi nimesi. Vastaa niin, että verbi on heißen eikä sein."],
      question:{
        type:"choice",skillId:"L2-NAME-02",
        prompt:"Täydennä: ____ Max. (Olen nimeltäni Max.)",
        options:[
          {id:"a",label:"Ich heiße"},
          {id:"b",label:"Du heißt",wrongFeedback:"Du heißt kertoo toisesta, ei omasta nimestä."},
          {id:"c",label:"Ich bist",wrongFeedback:"Ich bist sekoittaa sein-verbin minä- ja sinämuodot."},
        ],
        correctOption:"a",success:"Oikein. Ich heiße Max. kertoo puhujan nimen.",
        hint:"Ich = minä ja heißen-verbin minämuoto on heiße.",
        reteach:"Ich heiße Max. = Minun nimeni on Max. Du heißt Max. = Sinun nimesi on Max.",
        genericWrong:"Valitse muoto, joka kertoo puhujan oman nimen.",
      },
    },
    {
      id:"sources",phase:"Alkuperäiset keskustelut",kind:"book",
      title:"Vertaa Franzin ja Gretan sekä Thomasin ja Takashin esittäytymisiä",
      paragraphs:[
        "Avaa C02:n Text A ja etsi nimikysymys Wie heißt du? sekä Gretan vastaus Ich heiße Greta. Lue myös, mitä Wie geht's? tarkoittaa.",
        "Vertaa sitten C02:n Text B:ssä Thomasin sanoja Ich bin Thomas. ja Das ist Peter. Näissä ilmauksissa esitellään ensin puhuja ja sitten toinen ihminen.",
        "Text B:n koko nelirepliikkinen alkuperäisteksti on kirjassa. Jos ihmisen äänittämä Commons-ääni toimii, voit kuunnella sen, mutta se ei ole välttämätöntä tämän kertauksen suorittamiseen.",
        "Vahvista harjoittelu vasta, kun olet oikeasti verrannut tekstejä. Tämä on oma vahvistuksesi, ei automaattisesti arvioitu kuuntelu- tai puhetaitotesti.",
      ],
      bookLinks:[
        {label:"Avaa C02 · Text A",chapterId:"02",section:"text",instruction:"Etsi Franzin ja Gretan nimikysymys, nimivastaus ja Wie geht's?."},
        {label:"Avaa C02 · Text B",chapterId:"02",section:"text-b",instruction:"Vertaa Thomasin Ich bin ja Das ist Peter -lauseita."},
      ],
      activityId:"sources-compared",activityLabel:"Vertasin itse C02:n kahden lähdetekstin esittelyjä",
    },
    {
      id:"scenario",phase:"Soveltava valinta",kind:"question",
      title:"Puhutko itsestäsi vai toisesta henkilöstä?",
      paragraphs:["Uudessa tilanteessa kuvitteellinen Mia esittelee ystävänsä Peterin. Valitse ilmaus, joka kertoo nimenomaan tästä toisesta ihmisestä."],
      question:{
        type:"choice",skillId:"L2-COM-02",evidenceRole:"application",
        prompt:"Mia osoittaa ystäväänsä ja sanoo: Tämä on Peter. Mitä hän sanoo saksaksi?",
        options:[
          {id:"a",label:"Ich bin Peter.",wrongFeedback:"Ich bin Peter. tarkoittaisi, että Mia väittää itse olevansa Peter."},
          {id:"b",label:"Das ist Peter."},
          {id:"c",label:"Wie heißt Peter?",wrongFeedback:"Tämä kysyisi Peterin nimeä, ei esittelisi häntä."},
        ],
        correctOption:"b",success:"Oikein. Das ist Peter. esittelee toisen ihmisen.",
        hint:"Rakenteen alku on Das ist.",
        reteach:"Ich bin = minä olen. Das ist = tämä on.",
        genericWrong:"Tarkista, onko kyse puhujasta vai toisesta ihmisestä.",
      },
    },
    {
      id:"transfer",phase:"Itsenäinen tuottaminen",kind:"question",
      title:"Kysy keksityn henkilön nimi ilman mallia",
      paragraphs:["Sulje aiemmat fraasit ja kirjoita nimikysymys kokonaisena. Muista kysymysmerkki ja ß-kirjain; opettaja ei korvaa virheellistä kirjoitusasua automaattisesti."],
      question:{
        type:"text",skillId:"L2-NAME-01",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi: Mikä sinun nimesi on? (tuttavallisesti)",
        accepted:["Wie heißt du?"],
        success:"Oikein. Wie heißt du? on kokonainen nimikysymys.",
        hint:"Alussa Wie, keskellä heißt ja lopussa du?",
        reteach:"Wie heißt du? on tutun ihmisen nimikysymys. Muista ß: heißt.",
        genericWrong:"Tarkista sanajärjestys, ß ja kysymysmerkki.",
        wrongAnswers:{"wie heisst du":"Kirjan mukainen kirjoitusasu on Wie heißt du? Käytä ß-kirjainta.",
          "wie geht's":"Wie geht's? kysyy kuulumisia, ei nimeä."},
      },
    },
    {
      id:"application",phase:"Käytä saksaa",kind:"book",
      title:"Kirjoita oikeaan kirjaan oma kuvitteellinen esittäytyminen",
      paragraphs:[
        "Avaa C02:n Käytä saksaa -sivu. Kirjan soveltamistehtävä pyytää kahta lausetta: kerro kuvitteellinen nimesi ja kysy toisen nimi. Käytä esimerkiksi nimiä Mia ja Max.",
        "Kirjoita vastaus kirjan omaan tekstikenttään. Voit aloittaa muodolla Ich heiße Mia. ja jatkaa kysymyksellä Wie heißt du? Tee ensin oma yritys ennen mallin näyttämistä.",
        "Tarkista, että nimivastaus alkaa ich-muodolla ja kysymyksessä on du heißt. Älä tallenna omaa oikeaa nimeäsi tai muitakaan henkilötietojasi.",
        "Tekstin tallentuminen on soveltamistehtävän suoritusnäyttö, ei automaattisesti pisteytetty saksan kirjoitelma. Vahvista tarkistaminen vasta oman työn jälkeen.",
      ],
      bookLinks:[{label:"Avaa C02 · Käytä saksaa",chapterId:"02",section:"apply",instruction:"Kirjoita kaksi esittäytymislausetta kuvitteellisilla Mia- ja Max-nimillä."}],
      activityId:"application-reviewed",activityLabel:"Kirjoitin C02:n esittäytymisen ja tarkistin itse ilmaisut",
    },
    {
      id:"exam-intro",phase:"Koekertauksen ohje",kind:"explanation",
      title:"Tee testi ilman mallia, lue palautteet vasta lopuksi",
      paragraphs:[
        "C02:n kappaletesti koostuu kirjan omista alkeiden nimien, esittäytymisen ja verbimuotojen harjoituksista. Valitse tai kirjoita jokaiseen osatehtävään oma vastaus.",
        "Vastaa ilman näkyvää sanastoa tai malliratkaisuja. Palauta testi vasta, kun kaikki osatehtävät on täytetty. Kirja näyttää pisteet ja tehtäväkohtaiset perustelut palautuksen jälkeen.",
        "Tulos ei ole puhe-, kuuntelu- eikä virallisen kielitaidon arvio. Jos kirjoitat johonkin kohtaan virheellisen vastauksen, saat palautteesta tietoa kertauksen tarpeesta.",
        "Opettajan suoritusvaatimus tarkistaa nimenomaan kirjan testSubmittedAt-palautusmerkinnän. Pelkkä vastauksien kirjoittaminen testiluonnokseen ei täytä vaatimusta.",
      ],
    },
    {
      id:"chapter-test",phase:"Oikea kappaletesti",kind:"book",
      title:"Vastaa ja palauta C02:n oikea kappaletesti",
      paragraphs:[
        "Avaa C02:n Kappaletesti. Vastaa kaikkiin kirjan tehtäviin ja paina sen jälkeen Palauta testi -painiketta.",
        "Kirjan testiluonnos ja palautettu testi ovat eri asioita. Jos lähdet takaisin oppitunnille ennen palautusta, L011 näkyy edelleen kesken.",
        "Jos jokin vastaus jäi vääräksi, käy myöhemmin kyseisen tehtävän perustelu läpi. Testiä ei tarvitse saada täydellisesti oikein, jotta sen palauttamista voidaan käsitellä opiskelusuorituksena.",
      ],
      bookLinks:[{label:"Avaa C02 · Kappaletesti",chapterId:"02",section:"test",instruction:"Vastaa kaikkiin tehtäviin ja paina Palauta testi."}],
    },
    {
      id:"self-assess",phase:"Testin jälkeinen itsearviointi",kind:"book",
      title:"Arvioi, miten esittäytyminen sujui muistista",
      paragraphs:[
        "Kun C02:n testi on palautettu, sen alle avautuu itsearviointikenttä. Kirjan oma ohje pyytää kuvittelemaan esittäytymisen uudelle henkilölle: kerro nimi ja kysy hänen nimeään ilman valmista tekstiä.",
        "Kirjoita itsearviointiin lyhyesti, mitkä muodot onnistuivat ilman apua. Kerro myös ainakin yksi asia, jota haluat kerrata, esimerkiksi heißen- ja sein-verbien ero.",
        "Itsearviointi tallentuu saman C02-kappaleen kenttään. Sovellus ei väitä analysoivansa avointa kirjoitustasi automaattisesti eikä tulkitse itsearviota kielitaitotasoksi.",
      ],
      bookLinks:[{label:"Avaa C02:n palautettu testi ja itsearviointi",chapterId:"02",section:"test",instruction:"Kirjoita palautuksen jälkeen kenttään mitä osasit ja mitä vielä harjoittelet."}],
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Valitse oikea du-muoto uudessa nimikysymyksessä",
      paragraphs:["Viimeinen tarkistus tehdään ilman mallia. Kiinnitä huomiota siihen, että kysyt toiselta hänen nimeään."],
      question:{
        type:"choice",skillId:"L1-GRA-01",evidenceRole:"exit",
        prompt:"Täydennä: Wie ___ du? (Mikä sinun nimesi on?)",
        options:[
          {id:"a",label:"heiße",wrongFeedback:"Heiße on ich-muoto: Ich heiße Mia."},
          {id:"b",label:"heißt"},
          {id:"c",label:"bist",wrongFeedback:"Bist on sein-verbin du-muoto, ei tähän kysymykseen kuuluva heißen-muoto."},
        ],
        correctOption:"b",success:"Oikein. Wie heißt du? käyttää heißen-verbin sinämuotoa.",
        hint:"Du-muoto on heißt, ei heiße.",
        reteach:"Heißen: ich heiße, du heißt. Nimikysymys on Wie heißt du?",
        genericWrong:"Etsi heißen-verbin du-muoto.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Toisen kappaleen kertaustyöt on käsitelty",
      paragraphs:[
        "Kertasit nimikysymyksen, ich heiße / du heißt ja ich bin / du bist -muodot sekä toisen henkilön esittelyn Das ist Peter.",
        "L011 voidaan merkitä läpikäydyksi vasta, kun oman kirjan C02-soveltamisteksti on tallentunut, C02-kappaletesti on oikeasti palautettu ja testin jälkeinen itsearviointi on kirjoitettu. Lisäksi kaikki tunnin ohjatut vaiheet pitää käydä läpi.",
        "Suoritusmerkintä ei ole sama asia kuin itsenäinen kielitaidon hallinta. Ensimmäisen yrityksen oikeat itsenäiset ratkaisut kirjataan erillisinä näyttöinä, eikä virheellistä tai vihjeellä tuettua yritystä muuteta oikeaksi.",
        "Seuraava oppitunti L012 aloittaa C03-kappaleen. Siellä harjoitellaan maiden ja paikkojen nimiä sekä asuin- ja kotipaikan kertomisen alkeita.",
      ],
    },
  ],
};
