import type { TeacherLesson } from "./engine.ts";

/** LOS! 1 L001. Original Finnish instructional content; no generated runtime AI.
 * The real textbook's text, audio and dictionary remain in the existing book.
 * Audio availability is never falsely recorded as listening mastery.
 */
export const LOS1_L001_TEACHER: TeacherLesson = {
  id: "L001",
  bookId: 1,
  chapterId: "01",
  version: "2.0.0-preview.1",
  title: "Miten LOS! 1:llä opiskellaan?",
  objective: "Osaan käyttää oppituntia ja oppikirjaa sekä löydän tekstin, sanaselitykset, harjoitukset ja oman oppimistavoitteeni.",
  estimatedMinutes: 30,
  requiredQuestionIds: ["greeting-check", "exit"],
  requiredActivityIds: ["reader-tried", "audio-tried", "goal-written"],
  requiredPracticeIds: [],
  scenes: [
    {
      id: "welcome",
      phase: "Aloitus",
      kind: "introduction",
      title: "Tervetuloa ensimmäiselle saksantunnillesi",
      paragraphs: [
        "Et tarvitse mitään aikaisempaa saksan taitoa. Aloitamme aivan alusta, rauhassa ja selittäen. Tässä oppitunnissa opit käyttämään LOSia samalla, kun tapaat ensimmäiset saksankieliset ilmaukset.",
        "Tässä näkymässä opettaja näyttää, selittää ja kysyy. Oppikirjassa voit lukea kokonaiset tekstit, avata sanojen merkityksiä ja tehdä harjoituksia. Molemmat kuuluvat samaan opiskeluun.",
        "Saat pysähtyä, palata taakse ja pyytää lisäselityksen. Et menetä oppituntiasi, vaikka kävisit välissä kirjassa tai sulkisit sivun.",
      ],
    },
    {
      id: "first-words",
      phase: "Ensimmäinen opetus",
      kind: "explanation",
      title: "Ensimmäiset kolme sanaasi ja ilmaustasi",
      paragraphs: [
        "Saksaksi Hallo! tarkoittaa hei. Se on yleinen tervehdys, jonka voit sanoa esimerkiksi tutulle ihmiselle.",
        "Danke! tarkoittaa kiitos. Tschüss! on puolestaan rento hyvästely, jonka voit sanoa, kun lähdet.",
        "Huomaa ero: Hallo! aloittaa kohtaamisen ja Tschüss! päättää sen. Emme opettele vielä vaikeaa kielioppia. Tarkoitus on ymmärtää, mitä sanat tekevät oikeassa tilanteessa.",
      ],
      help: [
        { title: "Miksi sanat päättyvät huutomerkkiin?", body: "Huutomerkki korostaa tässä puheenvuoroa. Voit tervehtiä normaalilla äänellä, eikä huutomerkki tarkoita huutamista." },
        { title: "Mitä ß tarkoittaa sanassa Tschüss?", body: "ß on saksan kirjoitusjärjestelmän kirjain. Se liittyy s-äänteeseen. Opettelemme sen käyttöä myöhemmin; nyt riittää, että tunnistat ilmauksen oikein." },
      ],
    },
    {
      id: "words-board",
      phase: "Opetustaulu",
      kind: "board",
      title: "Näin pieni saksankielinen kohtaaminen etenee",
      paragraphs: [
        "Katsotaan kolme lyhyttä ilmausta vaiheittain. Paina Näytä seuraava, kun olet lukenut ja ymmärtänyt edellisen.",
        "Sano jokainen ilmaus halutessasi ääneen. Tässä ei ole automaattista ääntämisen arviointia.",
      ],
      board: [
        { label: "Kun tapaat", german: "Hallo!", meaning: "Hei!" },
        { label: "Kun kiität", german: "Danke!", meaning: "Kiitos!" },
        { label: "Kun lähdet", german: "Tschüss!", meaning: "Moikka! (hyvästeltäessä)" },
      ],
    },
    {
      id: "greeting-check",
      phase: "Ymmärtämisen tarkistus",
      kind: "question",
      title: "Ymmärsitkö tervehdyksen ja hyvästelyn eron?",
      paragraphs: [
        "Kokeile seuraavaa kysymystä ilman, että palaat heti opetustauluun. Tarkoitus on palauttaa sana muistista.",
      ],
      question: {
        type: "choice",
        skillId: "L1-FIRST-WORDS",
        prompt: "Tapaat ystävän ja haluat sanoa hei. Minkä ilmauksen valitset?",
        options: [
          { id: "a", label: "Hallo!" },
          { id: "b", label: "Danke!", wrongFeedback: "Danke! tarkoittaa kiitos. Sitä käytetään kiittämiseen, ei varsinaisena tervehdyksenä." },
          { id: "c", label: "Tschüss!", wrongFeedback: "Tschüss! sopii, kun hyvästelet jonkun. Tässä vasta tapaat ystävän." },
        ],
        correctOption: "a",
        success: "Oikein. Hallo! on tervehdys. Voit jo sanoa yhden oikean saksankielisen ilmauksen.",
        hint: "Mieti, haluatko aloittaa vai päättää kohtaamisen.",
        reteach: "Hallo! = hei alussa. Danke! = kiitos. Tschüss! = moikka lopussa. Muista, että tilanne ratkaisee.",
        genericWrong: "Tämä ei ollut tähän tilanteeseen sopiva tervehdys. Mieti, aloitatko vai lopetatko keskustelun.",
      },
    },
    {
      id: "book-navigation",
      phase: "Oppikirjan käyttö",
      kind: "book",
      title: "Oppitunti ja oppikirja tekevät eri asiat",
      paragraphs: [
        "Opettaja kertoo tässä, miten asiat toimivat. Oppikirjassa ne ovat kokonaisina tekstien, sanastojen ja harjoitusten yhteydessä.",
        "Avaa ensimmäisen kappaleen Teksti A. Etsi saksankielinen sana ja napauta sitä. Kirjan sisäinen lukija näyttää sanaselityksiä. Kokeile myös korostustyökalua, jos se on näkymässä käytettävissä.",
        "Kirja avautuu erilliseen välilehteen ja tämä oppitunti jää tänne. Jos käytät puhelimella vain yhtä välilehteä, kirjassa näkyy Palaa oppitunnille -linkki.",
      ],
      bookLinks: [
        { label: "Kappale 1 · Teksti A", chapterId: "01", section: "text", instruction: "Kokeile sanan avaamista ja tekstin korostamista." },
        { label: "Kappale 1 · Sanasto", chapterId: "01", section: "vocabulary", instruction: "Löydä Hallo!, Danke! ja Tschüss! sanastosta." },
      ],
      activityId: "reader-tried",
      activityLabel: "Kokeilin sanaselitystä ja lukijan käyttöä kirjassa",
    },
    {
      id: "book-search",
      phase: "Oppikirjan käyttö",
      kind: "explanation",
      title: "Mistä löydät uuden sanan merkityksen?",
      paragraphs: [
        "Kirjan lukijassa voit napauttaa sanaa nähdäksesi selityksen. Sanastosivulla ovat kappaleeseen kuuluvat keskeiset ilmaukset suomeksi selitettyinä.",
        "Lisäksi LOSissa on oma sanakirja, jota voit käyttää myös silloin, kun sanan merkitys ei vielä avaudu asiayhteydestä.",
        "Jos sanalle ei ole tarkistettua selitystä, järjestelmä ei saa keksiä sitä. Tällöin voit tutkia sen merkitystä kirjan muista hyväksytyistä materiaaleista.",
      ],
      bookLinks: [
        { label: "Avaa LOSin sanakirja", chapterId: "01", section: "dictionary", instruction: "Kokeile hakua sanalla Hallo tai Danke." },
      ],
      help: [
        { title: "Entä jos sanan napauttaminen ei avaa mitään?", body: "Varmista ensin, että olet avannut varsinaisen Teksti A -lukijan. Sanastosivulla sana voi näkyä tavallisena luettelomerkintänä. Jos selitys puuttuu, se ei ole oma virheesi vaan keskeneräinen tai puuttuva sisältö." },
      ],
    },
    {
      id: "audio",
      phase: "Äänen kokeileminen",
      kind: "activity",
      title: "Kokeile aitoa saksankielistä ääntä",
      paragraphs: [
        "Palaa kirjan Teksti A -sivulle ja kokeile, käynnistyykö sen saatavilla oleva alkuperäinen äänite. Kuuntelu auttaa vähitellen tunnistamaan saksan sanoja oikeasta puheesta.",
        "Äänitteen oikeudet ja toimivuus voivat olla vielä erikseen tarkistettavia. Jos äänite ei toimi tai ei ole saatavilla, merkitse vain kokeilu tehdyksi. LOS ei silloin väitä, että kuulit tai ymmärsit puheen.",
        "Opettajan tekstiselitykset ja tämä aloitustunti toimivat ilman ääntä.",
      ],
      bookLinks: [
        { label: "Avaa äänite ja tekstin lukija", chapterId: "01", section: "text", instruction: "Kokeile äänitoistoa ilman, että joudut poistumaan LOSista." },
      ],
      activityId: "audio-tried",
      activityLabel: "Kokeilin äänentoistoa tai totesin, ettei äänite ollut saatavilla",
    },
    {
      id: "your-goal",
      phase: "Oma oppimistavoite",
      kind: "reflection",
      title: "Mitä haluat osata ensimmäiseksi?",
      paragraphs: [
        "Hyvä opettaja tietää, mitä kohti oppilas pyrkii. Kirjoita alle yksi pieni ja konkreettinen saksanoppimisen tavoite.",
        "Esimerkiksi: Haluan osata tervehtiä ja kertoa nimeni saksaksi. Tarkoitus ei ole kirjoittaa täydellistä suunnitelmaa. Yksi ymmärrettävä tavoite riittää.",
        "Tavoite tallennetaan tämän oppitunnin opiskelutietoihin. Se ei ole pisteytettävä kieliharjoitus.",
      ],
      reflection: {
        prompt: "Kirjoita oma oppimistavoitteesi suomeksi.",
        placeholder: "Haluan oppia ...",
        minLength: 15,
      },
      activityId: "goal-written",
      activityLabel: "Tallenna oma oppimistavoitteeni",
    },
    {
      id: "exit",
      phase: "Lopputarkistus",
      kind: "question",
      title: "Viimeinen tarkistus: osaatko käyttää lukijaa?",
      paragraphs: [
        "Palautetaan mieleen tärkein kirjan käyttötaito. Sen jälkeen olet valmis varsinaisiin kappaleen oppitunteihin.",
      ],
      question: {
        type: "choice",
        skillId: "L1-BOOK-READER",
        prompt: "Miten LOSissa saat selville vieraan saksankielisen sanan merkityksen?",
        options: [
          { id: "a", label: "Napautan sanaa lukijassa." },
          { id: "b", label: "Minun täytyy poistua ulkoiselle sivulle.", wrongFeedback: "LOSin oikea lukija näyttää sanaselitykset itse kirjassa. Ulkoinen sivu ei ole edellytys." },
          { id: "c", label: "Minun täytyy osata sana jo valmiiksi.", wrongFeedback: "Kirja on tarkoitettu aloittelijalle. Sanojen merkityksiä voi selvittää opiskellessa." },
        ],
        correctOption: "a",
        success: "Oikein. Lukijan sanaa napauttamalla löydät käytettävissä olevan selityksen suoraan LOSista.",
        hint: "Muistatko, mitä tapahtuu, kun avaat saksankielisen sanan kirjan Teksti A -lukijassa?",
        reteach: "Lukija on LOSin sisäinen tekstiympäristö. Sen sanojen selitykset avautuvat samassa sovelluksessa. Sanastoa ja sanakirjaa voi käyttää lisäksi.",
        genericWrong: "Tavoitteena ei ole osata kaikkia sanoja etukäteen. Kokeile kirjan sisäistä sanaa napauttamalla.",
      },
    },
    {
      id: "summary",
      phase: "Yhteenveto",
      kind: "summary",
      title: "Olet valmis aloittamaan saksan alkeet",
      paragraphs: [
        "Tiedät nyt, miten LOSin opettaja ja oppikirja toimivat yhdessä. Osaat avata lukijan, etsiä sanan merkityksen ja palata turvallisesti samaan oppituntiin.",
        "Tapasit ensimmäiset ilmaukset: Hallo!, Danke! ja Tschüss!. Niitä harjoitellaan lisää myöhemmillä tunneilla. Yksittäinen oikea vastaus ei vielä todista pitkäaikaista osaamista.",
        "Seuraavaksi opit vähitellen saksan ääntämistä ja pääset oikean keskustelun pariin. Voit palata tähän aloitukseen koska tahansa.",
      ],
    },
  ],
};
