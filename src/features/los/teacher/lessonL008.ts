import type { TeacherLesson } from "./engine.ts";

/**
 * C02 Text A reading: original six-turn Wikibooks conversation is displayed
 * in the existing reader, not copied to a second task database.
 * The original is cited in los1C02.ts; human language and source QA remain open.
 */
export const LOS1_L008_TEACHER: TeacherLesson = {
  id:"L008",bookId:1,chapterId:"02",version:"2.0.0-preview.1",
  title:"Franz ja Greta: kokonainen dialogi",
  objective:"Ymmärrän kuuden repliikin keskustelun, erotan nimikysymyksen ja esittäytymisen sekä tunnistan tekstin keskeiset henkilöt.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["source-read"],
  requiredPracticeIds:[],
  requiredCheckedIds:["C02-SOURCE-Q01","C02-SOURCE-Q02","C02-SOURCE-Q03","C02-SOURCE-Q04"],
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"Lue kokonainen keskustelu, mutta älä arvaa kaikkea ulkoa",
      paragraphs:[
        "L007:ssä opit kysymään ja kertomaan nimen. Tässä oppitunnissa luet Franzin ja Gretan koko kuuden repliikin alkuperäisen keskustelun LOS!-kirjassa.",
        "Aloita tunnistamalla puhujat ja nimifraasit. Saat lukea loputkin repliikit, vaikka niiden kielioppi ei vielä kuulu itsenäisesti tuotettavaan alkeistasoiseen sisältöön.",
        "Luettu teksti, tarkistetut ymmärtämistehtävät ja oma vastaus tallentuvat saman C02-kappaleen tietoihin. Äänen kuuntelua ei väitetä tapahtuneeksi, jos lähdeääni ei ole käytössä.",
      ],
    },
    {
      id:"recall",phase:"Esitietojen aktivointi",kind:"question",
      title:"Muista L007:n nimikysymys",
      paragraphs:["Kokeile ensin muistista. Minkä kysymyksen sanoisit samaa ikää olevalle uudelle tuttavalle?"],
      question:{
        type:"choice",skillId:"L1-INT-02",
        prompt:"Mikä ilmaus kysyy tutun henkilön nimeä?",
        options:[
          {id:"a",label:"Wie heißt du?"},
          {id:"b",label:"Wie alt bist du?",wrongFeedback:"Tämä kysyy ikää, ei nimeä."},
          {id:"c",label:"Gute Nacht!",wrongFeedback:"Tämä toivottaa hyvää yötä."},
        ],
        correctOption:"a",success:"Oikein. Wie heißt du? kysyy nimen.",
        hint:"Muistatko L007:stä kolme sanaa: Wie, heißt ja du?",
        reteach:"Saksaksi nimen kysymiseen käytetään heißen-verbiä: Wie heißt du?",
        genericWrong:"Valitse nimen kysymiseen käytettävä ilmaus.",
      },
    },
    {
      id:"strategy",phase:"Opetus",kind:"explanation",
      title:"Näin ymmärrät lyhyen alkuperäistekstin",
      paragraphs:[
        "Ensimmäiseksi katson, ketkä puhuvat. Tässä he ovat Franz ja Greta. Toiseksi luen repliikit järjestyksessä ja etsin aiemmin opitun nimikysymyksen.",
        "Kolmanneksi etsin vastauksen: Greta sanoo Ich heiße Greta. Vertaan sitä Franzin alun esittäytymiseen ich bin Franz. Molemmat ovat oikeita tapoja kertoa oma nimi.",
        "Jos tekstissä tulee vastaan Kennst du den Lehrer? tai Es geht mir gut, katson kirjan sanaselityksen tai suomennoksen. Älä opettele näiden uusien rakenteiden taivutusta vielä ulkoa.",
        "Neljänneksi luen loppuun asti: Franz sanoo Bis dann! ja Greta vastaa Wiedersehen!. Molemmat ovat hyvästelyjä.",
      ],
      help:[
        {title:"Mitä jos en ymmärrä jotakin repliikkiä?",body:"Lue koko kuuden repliikin keskustelu kerran ja avaa vaikean sanan selitys. Keskity nimien ja hyvästelyjen merkityksiin. Esimerkiksi Kennst du den Lehrer? on vielä ymmärtämisen tukitekstiä."},
        {title:"Onko Wiedersehen! yksin oikein?",body:"Alkuperäistekstissä Greta sanoo Wiedersehen! Se on lyhyempi hyvästely. Jo opetettu Auf Wiedersehen! on tavallinen kokonainen kohtelias ilmaus."},
      ],
    },
    {
      id:"board",phase:"Mallisuoritus",kind:"board",
      title:"Näin opettaja löytää vastauksen tekstistä",
      paragraphs:[
        "Opetustaulussa tekstin tärkeät merkityskohdat tulevat näkyviin yksi kerrallaan. Vertaa puhujia ja sitä, kuka kertoo oman nimensä.",
        "Taulu auttaa ymmärtämään lukemista, mutta tehtävien omat vastaukset tarkistetaan vasta kirjan Ymmärrä-osiossa.",
      ],
      board:[
        {label:"1 · Franz aloittaa",german:"Hallo, ich bin Franz.",meaning:"Hei, minä olen Franz. Franz kertoo nimensä ich bin -rakenteella."},
        {label:"2 · Franz kysyy",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on?"},
        {label:"3 · Greta vastaa",german:"Ich heiße Greta.",meaning:"Nimeni on Greta. Greta käyttää heißen-verbiä."},
        {label:"4 · Greta kertoo opettajasta",german:"Er heißt Herr Weiß.",meaning:"Kyllä, häntä kutsutaan herra Weißiksi. Er heißt riittää tässä tunnistaa; Herr on puhuttelu, ei etunimi."},
        {label:"5 · Franz hyvästelee",german:"Bis dann!",meaning:"Nähdään!"},
        {label:"6 · Greta hyvästelee",german:"Wiedersehen!",meaning:"Näkemiin!"},
      ],
    },
    {
      id:"source",phase:"Oikea oppikirjan teksti",kind:"book",
      title:"Lue Franzin ja Gretan kaikki kuusi repliikkiä",
      paragraphs:[
        "Avaa C02:n Text A, jossa alkuperäiset kuusi repliikkiä näkyvät kokonaisina. Lue ne järjestyksessä, älä pelkästään tässä opetustaulussa näkyviä otteita.",
        "Kokeile ensin ilman suomennosta, avaa sitten vaikeiden sanojen selitykset. Havaitse, kuka sanoo ich bin ja kuka sanoo ich heiße.",
        "Vahvista lukeneesi tekstin. Lukemisen vahvistus ei vielä todista ymmärtämistä; sitä varten on seuraava kysymys ja kirjan neljä tarkistettavaa tehtävää.",
      ],
      bookLinks:[{label:"C02 · Text A (kuusi repliikkiä)",chapterId:"02",section:"text",instruction:"Lue koko Franzin ja Gretan keskustelu ja paikanna nimifraasit."}],
      activityId:"source-read",activityLabel:"Luin C02:n kaikki kuusi repliikkiä",
    },
    {
      id:"guided",phase:"Ohjattu harjoitus",kind:"question",
      title:"Tunnista, kumpi puhuja kertoo nimensä",
      paragraphs:["Vastaa keskustelun perusteella. Katsotaan yhdessä yhden repliikin merkitys."],
      question:{
        type:"choice",skillId:"L1-READ-01",
        prompt:"Kuka sanoo Ich heiße Greta.?",
        options:[
          {id:"a",label:"Franz",wrongFeedback:"Franz aloittaa sanomalla ich bin Franz. Greta vastaa oman nimensä."},
          {id:"b",label:"Greta"},
          {id:"c",label:"Herr Weiß",wrongFeedback:"Herr Weiß on opettajan nimi, josta keskustelussa kerrotaan. Hän ei puhu siinä."},
        ],
        correctOption:"b",success:"Oikein. Greta esittäytyy Ich heiße Greta. -lauseella.",
        hint:"Katso, kenen nimi esiintyy heiße-sanan jälkeen.",
        reteach:"Franz sanoo ich bin Franz, Greta sanoo Ich heiße Greta. Molemmat kertovat puhujan nimen.",
        genericWrong:"Etsi heiße-repliikki ja sitä vastaava puhuja.",
      },
    },
    {
      id:"recognition",phase:"Opetus",kind:"explanation",
      title:"Vaikeita rakenteita saa tunnistaa ilman taivutuskokeita",
      paragraphs:[
        "Kolmannessa repliikissä Franz sanoo Es geht mir gut. Kennst du den Lehrer? Saat ymmärtää ne kokonaisina ilmauksina: Minulle kuuluu hyvää. Tunnetko opettajan?",
        "Neljännessä repliikissä Greta sanoo Ja, er heißt Herr Weiß. Opettajan sukunimi on Weiß. Er heißt on tässä tunnistettava, ei vielä itsenäisesti taivutettava muoto.",
        "Näiden rakenteiden esiintyminen alkuperäistekstissä ei tarkoita, että niistä saisi tehdä vaikeampaa kielioppikoetta ennen varsinaista opetusta.",
        "Harjoitukset voivat kysyä, kuka sanoo mitä tai mikä nimi tekstissä mainitaan. Niissä vastaus perustuu luettuun sisältöön.",
      ],
      help:[{title:"Mitä er heißt tarkoittaa?",body:"Er = hän (mies) ja heißt = on nimeltään. Tässä se tarkoittaa hänen nimensä on. Kokonaista verbin taivutusta ei tarvitse vielä hallita."}],
    },
    {
      id:"questions",phase:"Kirjan ymmärtämistehtävät",kind:"book",
      title:"Tee ja tarkista neljä oikeaa lähdetekstikysymystä",
      paragraphs:[
        "Avaa C02:n Ymmärrä. Tee kysymykset C02-SOURCE-Q01–Q04. Niissä kysytään nimilauseesta, Franzin kysymyksestä, opettajan sukunimestä ja hyvästelystä.",
        "Valitse jokaiseen vastaus ja paina Tarkista vastaus. Pelkkä vastausvalinnan tekeminen ei merkitse tarkistetuksi.",
        "Tämä oppitunti käyttää samoja alkuperäisen tekstin kysymystunnisteita ja samoja tallennettuja vastauksia. Opettaja ei kirjoita niitä uudelleen toiseen järjestelmään.",
      ],
      bookLinks:[{label:"C02 · Ymmärrä (kysymykset 1–4)",chapterId:"02",section:"understand",instruction:"Tee ja tarkista C02-SOURCE-Q01, Q02, Q03 ja Q04."}],
    },
    {
      id:"independent",phase:"Itsenäinen muistista palauttaminen",kind:"question",
      title:"Muista tekstin nimikysymys ilman näkyvää mallia",
      paragraphs:["Sulje tarvittaessa oppikirjan tekstivälilehti. Kirjoita Franzin käyttämä nimikysymys itse."],
      question:{
        type:"text",skillId:"L1-INT-02",evidenceRole:"independent",
        prompt:"Miten Franz kysyy Gretan nimen? Kirjoita saksankielinen kysymys.",
        accepted:["Wie heißt du?"],
        success:"Oikein. Franz kysyy Wie heißt du?",
        hint:"Kysymyksen sanat ovat Wie + heißt + du.",
        reteach:"Franz sanoo: Hallo, ich bin Franz. Wie heißt du? Nimilauseen jälkeen tulee nimikysymys.",
        genericWrong:"Tarkista kysymyssana Wie ja heißen-verbin sinämuoto heißt.",
        wrongAnswers:{"wie heisse du":"Du tarvitsee heißt, ei heiße.","wie heißt er":"Tämä kysyy hänen nimeään. Franz kysyy suoraan Gretalta, joten tarvitset du."},
      },
    },
    {
      id:"application",phase:"Soveltaminen",kind:"question",
      title:"Kenen nimi tekstissä on Weiß?",
      paragraphs:["Tunnista opettajan nimi tekstin neljännen repliikin merkityksestä. Sinun ei tarvitse tuottaa uutta er heißt -lausetta."],
      question:{
        type:"choice",skillId:"L1-READ-01",evidenceRole:"application",
        prompt:"Mitä lause Ja, er heißt Herr Weiß. kertoo?",
        options:[
          {id:"a",label:"Greta on nimeltään Weiß.", "lang": "fi",wrongFeedback:"Greta kertoo opettajasta, ei omasta nimestään."},
          {id:"b",label:"Opettajan sukunimi on Weiß.", "lang": "fi"},
          {id:"c",label:"Franzin sukunimi on Weiß.", "lang": "fi",wrongFeedback:"Franz kysyy opettajasta. Weiß on opettajan sukunimi."},
        ],
        correctOption:"b",success:"Oikein. Herr Weiß on opettajan nimi.",
        hint:"Herr tarkoittaa herraa. Ketä neljännen repliikin er tarkoittaa?",
        reteach:"Franz kysyy opettajasta. Greta vastaa Ja, er heißt Herr Weiß. Kyseessä on opettajan nimi.",
        genericWrong:"Etsi, kenestä Franz juuri kysyi ja kuka on Herr Weiß.",
      },
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Miten keskustelu päättyy?",
      paragraphs:["Palauta lopuksi mieleen Franzin hyvästely. Vastauksen näkee tarvittaessa kirjan koko tekstistä myöhemmin."],
      question:{
        type:"choice",skillId:"L1-READ-01",evidenceRole:"exit",
        prompt:"Minkä ilmauksen Franz sanoo juuri ennen Gretan viimeistä repliikkiä?",
        options:[
          {id:"a",label:"Bis dann!"},
          {id:"b",label:"Gute Nacht!",wrongFeedback:"Tätä hyvän yön toivotusta ei ole Franzin viimeisessä repliikissä."},
          {id:"c",label:"Wie heißt du?",wrongFeedback:"Franz kysyy nimen keskustelun alussa, ei lopussa."},
        ],
        correctOption:"a",success:"Oikein. Franz sanoo Bis dann! ja Greta vastaa Wiedersehen!",
        hint:"Se tarkoittaa Nähdään! ja alkaa Bis-sanalla.",
        reteach:"Franz sanoo lopuksi Oh, danke, Greta. Bis dann! Greta päättää keskustelun sanomalla Wiedersehen!",
        genericWrong:"Etsi Franzin repliikin viimeinen hyvästely ennen Gretan vastausta.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Olet lukenut ensimmäisen nimidialogin",
      paragraphs:[
        "Tutustuit Franzin ja Gretan koko keskusteluun, tunnistit nimikysymyksen ja kaksi esittäytymistapaa sekä vastasit kirjan todellisiin lähdetekstikysymyksiin.",
        "Opettajajohtoisen lukemisen, itsenäisen vastauksen ja myöhemmin vahvistetun osaamisen merkinnät pysyvät erillisinä. Vihjeellinen vastaus on harjoittelua.",
        "L009:ssa harjoitellaan heißen- ja sein-verbien minä- ja sinämuotoja yksityiskohtaisemmin. Alkuperäisen tekstin muut kielioppirakenteet eivät vielä kuulu itsenäiseen taivutuskokeeseen.",
      ],
    },
  ],
};
