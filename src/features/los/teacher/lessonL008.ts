import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 / L008 · C02 2/5. A full six-reply reading lesson.
 * Source: Wikibooks German/Level I/Wie heißt du?, revision 4430449,
 * imported verbatim into LOS! 1 C02 Text A (M-WB-01).
 *
 * Never claim that this source dialogue has a verified recording.
 * All six original replies are in the canonical in-app book, not repeated
 * as an invented voice-over. Editorial German and pedagogy QA pending.
 */
export const LOS1_L008_TEACHER: TeacherLesson = {
  id:"L008",bookId:1,chapterId:"02",version:"2.0.0-preview.1",
  title:"Franz ja Greta: kokonainen dialogi",
  objective:"Ymmärrän Franzin ja Gretan kuuden puheenvuoron pääsisällön ja erotan nimikysymyksen, vointiin liittyvät fraasit sekä hyvästelyn.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","speaker","independent","exit"],
  requiredActivityIds:["read-all-six","replies-mapped","retell-rehearsed"],
  requiredPracticeIds:[],
  // These three existing original-text checks are required in this lesson.
  // Q01 was already required in L007; no duplicate answer store is created.
  requiredCheckedIds:["C02-SOURCE-Q02","C02-SOURCE-Q03","C02-SOURCE-Q04"],
  scenes:[
    {
      id:"welcome",kind:"introduction",phase:"Aloitus",
      title:"Franzin ja Gretan koko keskustelu alkaa nyt avautua",
      paragraphs:[
        "L007-tunnilla opit kysymään nimeä: Wie heißt du? ja vastaamaan Ich heiße Greta. Nyt luet saman alkuperäisen keskustelun kokonaan ja selvität, mitä ihmiset tekevät kuudessa puheenvuorossa.",
        "Tekstissä Franz ja Greta tervehtivät, esittäytyvät, puhuvat voinnista, mainitsevat opettajan ja hyvästelevät toisensa. Kaikkia uusia verbimuotoja ei tarvitse osata itse käyttää.",
        "Oppikirjan Text A sisältää alkuperäisen kuusirepliikkisen Wikibooks-dialogin kokonaisena saksaksi ja sanaselityksineen. Et tarvitse ulkopuolista sivua ymmärtääksesi tekstiä.",
        "Tavoite on luetun ymmärtäminen, ei kuunteluarvosana: tälle juuri samalle Franzin ja Gretan tekstille ei ole varmennettu omaa äänitettä.",
      ],
    },
    {
      id:"recall",kind:"question",phase:"Muistista kertaus",
      title:"Miten kysyt nimen tutulta?",
      paragraphs:[
        "Aloita edellisen tunnin ydinkysymyksestä ilman kirjaa. Kertaus auttaa liittämään uuden dialogin vanhaan tietoon; tätä kysymystä ei lasketa itsenäiseksi uudeksi näytöksi.",
      ],
      question:{
        type:"choice",skillId:"L2-READ-01",
        prompt:"Franz haluaa tietää Gretan nimen. Mitä hän kysyy?",
        options:[
          {id:"a",label:"Wie heißt du?"},
          {id:"b",label:"Wie geht's?",wrongFeedback:"Wie geht's? kysyy kuulumisia, ei nimeä."},
          {id:"c",label:"Bis dann!",wrongFeedback:"Bis dann! on hyvästely, ei nimikysymys."},
        ],
        correctOption:"a",success:"Oikein. Wie heißt du? kysyy tutun ihmisen nimeä.",
        hint:"Nimikysymys sisältää sanan heißt.",
        reteach:"Wie heißt du? tarkoittaa Mikä sinun nimesi on? Wie geht's? tarkoittaa Mitä kuuluu?",
        genericWrong:"Valitse kysymys, jossa kysytään nimeä.",
      },
    },
    {
      id:"orientation",kind:"explanation",phase:"Opettajan selitys",
      title:"Lue keskustelusta ensin tarkoitus, vasta sitten yksityiskohdat",
      paragraphs:[
        "Hyvä tapa lukea vieraskielinen keskustelu on löytää ensin puhuja, sitten puheenvuoron tarkoitus. Kysyykö hän nimeä, vastaa, kysyy vointia, puhuu kolmannesta henkilöstä vai sanoo näkemiin?",
        "Franz aloittaa kertomalla oman nimensä ja kysyy toisen nimeä. Greta vastaa nimellään mutta jatkaa keskustelua kysymällä Wie geht's? eli Mitä kuuluu?",
        "Myöhemmin Franz kysyy opettajasta. Greta mainitsee nimen Herr Weiß. Sana Herr tarkoittaa tässä kohteliasta herra-puhuttelua ja Weiß on sukunimi, ei uusi etunimi.",
        "Lopuksi kaksi eri hyväästelyä on tärkeä erottaa: Franz sanoo Bis dann! ja Greta vastaa Wiedersehen! Alkuperäistekstissä jälkimmäisessä ei ole sanaa Auf. Älä muuta lähteen repliikkiä muistinvaraisesti.",
      ],
      help:[
        {title:"Mitä jos en ymmärrä jokaista sanaa?",body:"Sinun ei tarvitse vielä taivuttaa kennst-, geht- tai heißt-muotoja kokonaan. Tässä tunnissa riittää, että tunnistat puheenvuoron tarkoituksen. Lukijan sanaselitykset auttavat."},
        {title:"Mitä merkitsee Herr Weiß?",body:"Herr on kohtelias puhuttelu ennen sukunimeä; Weiß on opettajan sukunimi. Teksti ei kerro, että Herr olisi hänen etunimensä."},
      ],
    },
    {
      id:"book-text",kind:"book",phase:"Alkuperäinen teksti A",
      title:"Lue kaikki kuusi alkuperäistä repliikkiä",
      paragraphs:[
        "Avaa C02:n Text A. Lue rauhassa Franzin ja Gretan kuusi vuoroa alusta loppuun. Voit hyödyntää lukijan suomenkielisiä merkityksiä ja sanaselityksiä.",
        "Ensimmäisellä lukukerralla merkitse mielessäsi, missä kohdin nimi kysytään ja kerrotaan. Toisella lukukerralla etsi ilmaus Wie geht's? sekä keskustelun kaksi viimeistä hyvästelyä.",
        "Vahvista lukeminen vasta, kun olet todella käsitellyt kaikki kuusi vuoroa. Pelkkä lukijan avaaminen ei ole riittävä lukusuoritus.",
      ],
      bookLinks:[{label:"Avaa C02:n kokonainen Franz–Greta-dialogi",chapterId:"02",section:"text",instruction:"Lue kaikki kuusi repliikkiä, aluksi kokonaisuus ja sitten puheenvuorojen merkitykset."}],
      activityId:"read-all-six",activityLabel:"Luin Text A:n kaikki kuusi alkuperäistä puheenvuoroa",
    },
    {
      id:"board",kind:"board",phase:"Opetustaulu",
      title:"Keskustelun kuusi vuoroa: kuka tekee mitä?",
      paragraphs:[
        "Taulu jäsentää koko tekstin kuuteen puheenvuoroon. Se ei korvaa kirjan koko alkuperäistekstiä, joka luetaan Text A:ssa.",
        "Avaa aina ensin yksi vuoro ja tunnista sen tarkoitus. Kohdat 3 ja 4 sisältävät tukifraaseja, jotka riittää tässä vaiheessa ymmärtää.",
      ],
      board:[
        {label:"1 · Franz esittäytyy ja kysyy nimen",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on? · ensin myös Ich bin Franz"},
        {label:"2 · Greta kertoo nimen ja kysyy vointia",german:"Ich heiße Greta. Wie geht's?",meaning:"Olen nimeltäni Greta. Mitä kuuluu?"},
        {label:"3 · Franz vastaa ja kysyy opettajasta",german:"Es geht mir gut.",meaning:"Minulle kuuluu hyvää · myös kysymys opettajan tuntemisesta"},
        {label:"4 · Greta kertoo opettajan nimen",german:"Er heißt Herr Weiß.",meaning:"Hänen nimensä on herra Weiß · Herr = herra, Weiß = sukunimi"},
        {label:"5 · Franz kiittää ja hyvästelee",german:"Bis dann!",meaning:"Nähdään! · Franzin viimeinen ilmaus"},
        {label:"6 · Greta hyvästelee",german:"Wiedersehen!",meaning:"Näkemiin! · Gretan viimeinen repliikki täsmälleen lähteen mukaisesti"},
      ],
    },
    {
      id:"guided",kind:"question",phase:"Ohjattu ymmärtäminen",
      title:"Nimikysymys vai kuulumiskysymys?",
      paragraphs:[
        "Franzin ja Gretan keskustelu ei jää pelkkiin nimiin. Greta kertoo nimensä ja kysyy heti toisen kuulumisia.",
      ],
      question:{
        type:"choice",skillId:"L2-READ-02",
        prompt:"Mitä Greta tarkoittaa ilmauksella Wie geht's?",
        options:[
          {id:"a",label:"Mikä sinun nimesi on?",wrongFeedback:"Se olisi Wie heißt du?."},
          {id:"b",label:"Mitä kuuluu?"},
          {id:"c",label:"Näkemiin!",wrongFeedback:"Se on hyvästely, mutta Greta kysyy tässä vointia."},
        ],
        correctOption:"b",success:"Oikein. Wie geht's? on tavallinen kuulumisten kysymys.",
        hint:"Etsi keskustelun vointiin liittyvä kysymys.",
        reteach:"Wie heißt du? = Mikä sinun nimesi on? Wie geht's? = Mitä kuuluu? Nämä kaksi kysymystä eivät tarkoita samaa.",
        genericWrong:"Vertaa Wie geht's? ja Wie heißt du? merkityksiä.",
      },
    },
    {
      id:"speaker",kind:"question",phase:"Puhujien tunnistaminen",
      title:"Kuka kertoo opettajan sukunimen?",
      paragraphs:[
        "Tekstin neljännessä puheenvuorossa on uusi sukunimi. Kiinnitä huomiota siihen, kuka tiedon sanoo ja kenestä hän puhuu.",
      ],
      question:{
        type:"choice",skillId:"L2-READ-03",
        prompt:"Kuka sanoo, että opettajan sukunimi on Weiß?",
        options:[
          {id:"a",label:"Franz",wrongFeedback:"Franz kysyy opettajasta, mutta toinen puhuja kertoo hänen nimensä."},
          {id:"b",label:"Greta"},
          {id:"c",label:"Herr Weiß",wrongFeedback:"Herr Weiß on keskustelussa mainittu opettaja, ei yksi kahdesta puhuvasta henkilöstä."},
        ],
        correctOption:"b",success:"Oikein. Greta kertoo opettajan sukunimen Weiß.",
        hint:"Katso, kumpi puhuja aloittaa vastauksensa sanalla Ja.",
        reteach:"Greta sanoo: Ja, er heißt Herr Weiß. Franz esitti edellä opettajaa koskevan kysymyksen.",
        genericWrong:"Tarkista Text A:n neljännen repliikin puhujan nimi.",
      },
    },
    {
      id:"book-check",kind:"book",phase:"Alkuperäisen tekstin tehtävät",
      title:"Tarkista kolme kirjan omaa ymmärtämistehtävää",
      paragraphs:[
        "Avaa C02:n Ymmärrä-sivu. Vastaa siellä kysymyksiin 2, 3 ja 4. Ne käsittelevät Franzin nimikysymystä, opettajan sukunimeä sekä Franzin hyvästelyä.",
        "Paina jokaisen vastauksen jälkeen sen omaa Tarkista vastaus -painiketta. Vain oikeasti tallennettu ja tarkistettu kirjan tehtävä täyttää oppitunnin suoritusvaatimuksen.",
        "Kysymys 1 kuului jo L007-oppituntiin. Nyt tarvitset kolme muuta lähdetehtävää, koska LOS! 1:n L008-suunnitelmassa on kolme ymmärtämistarkistusta.",
      ],
      bookLinks:[{label:"Avaa C02:n alkuperäistehtävät 2–4",chapterId:"02",section:"understand",instruction:"Vastaa C02-SOURCE-Q02, Q03 ja Q04, ja paina jokaisessa Tarkista vastaus."}],
    },
    {
      id:"meanings",kind:"explanation",phase:"Opettajan lisäselitys",
      title:"Kaikkea tekstissä esiintyvää kielioppia ei vielä tarvitse osata",
      paragraphs:[
        "Es geht mir gut. merkitsee tässä Minulle kuuluu hyvää. Opettele se aluksi kokonaisena vointifraasina. Saksan sijamuotoja ei tarvitse vielä purkaa osiin.",
        "Kennst du den Lehrer? tarkoittaa Tunnetko opettajan? Se on tekstin ymmärtämisen tukifraasi, ei tämän oppitunnin uusi vaadittu verbitaivutus.",
        "Ja, er heißt Herr Weiß. kertoo kolmannen henkilön nimen. Huomaa Herr-puhuttelu ja Weiß-sukunimen ß-kirjain; älä sekoita sitä samaan kirjoitusasuun liittyviin muihin sanamerkityksiin.",
        "Franz lopettaa sanomalla Bis dann! Greta vastaa Wiedersehen! Ne molemmat toimivat hyvästelyinä, vaikka ne eivät ole saman sanan tarkkoja kopioita. Toisen henkilön viimeinen sana ei automaattisesti ole Franzin viimeinen sana.",
      ],
    },
    {
      id:"mapping",kind:"activity",phase:"Kokonaisuuden jäsentäminen",
      title:"Kerro kuuden vuoron tapahtumat suomeksi",
      paragraphs:[
        "Sulje mallitaulu. Yritä palauttaa muistista keskustelun tapahtumat järjestyksessä: esittely, nimivastaus ja vointikysymys, kuulumisvastaus ja opettajakysymys, opettajan nimi, Franzin hyvästely, Gretan hyvästely.",
        "Voit sanoa tapahtumat ääneen tai kirjoittaa ne omaan paperiin. Palaa tarvittaessa Text A:han tarkistamaan järjestys.",
        "Oma vahvistus tallentaa, että teit tämän lukemisharjoituksen. Se ei ole automaattinen kuullun ymmärtämisen eikä suomenkielisen tuotoksen laadun arvio.",
      ],
      activityId:"replies-mapped",activityLabel:"Kerroin kuuden puheenvuoron tapahtumat järjestyksessä",
    },
    {
      id:"independent",kind:"question",phase:"Itsenäinen soveltaminen",
      title:"Muistatko Franzin oman hyvästelyn?",
      paragraphs:[
        "Kirjoita ilman kirjan näkyvää mallia Franzin oma viimeinen hyvästely. Tarkista samalla, ettet sekoita Franzin ja Gretan eri repliikkejä.",
      ],
      question:{
        type:"text",skillId:"L2-READ-04",evidenceRole:"independent",
        prompt:"Minkä saksankielisen ilmauksen Franz sanoo ennen kuin Greta vastaa 'Wiedersehen!'? Kirjoita hyvästely.",
        accepted:["Bis dann!"],success:"Oikein. Franzin oma viimeinen ilmaus on Bis dann!",
        hint:"Se alkaa sanalla Bis.",
        reteach:"Franz sanoo Bis dann!, johon Greta vastaa Wiedersehen!. Puhujilla on kaksi eri hyvästelyä.",
        genericWrong:"Tarkista Franzin viides puheenvuoro. Kirjoita siinä esiintyvä lyhyt kahden sanan hyvästely.",
        wrongAnswers:{"wiedersehen":"Wiedersehen! on Gretan viimeinen repliikki, ei Franzin hyvästely.",
          "tschüss":"Tschüss! on tuttu arkinen hyvästely, mutta Franz käyttää juuri tässä toisesta ilmauksesta koostuvaa hyvästelyä."},
      },
    },
    {
      id:"rehearsal",kind:"activity",phase:"Oma kertausharjoitus",
      title:"Lue tekstin keskeiset fraasit vielä kerran",
      paragraphs:[
        "Palaa halutessasi C02:n Text A:han. Lue mielessäsi tai ääneen Wie heißt du?, Ich heiße Greta., Wie geht's?, Es geht mir gut., Bis dann! ja Wiedersehen! Kiinnitä huomiota, mihin puheenvuoroon kukin ilmaus kuuluu.",
        "Ääneen lukeminen on vapaaehtoista. Voit tehdä tämän myös täysin äänettömästi; sovellus ei tallenna ääntä eikä arvioi ääntämistä.",
        "Äänitteen puuttuminen ei estä tekstin lukemista tai kirjallisten tehtävien tekemistä.",
      ],
      bookLinks:[{label:"Palaa alkuperäiseen C02-dialogiin",chapterId:"02",section:"text",instruction:"Vertaa vielä nimikysymystä, vointifraasia ja molempia hyvästelyjä."}],
      activityId:"retell-rehearsed",activityLabel:"Kertasin tekstin keskeiset fraasit omalla tavallani",
    },
    {
      id:"exit",kind:"question",phase:"Lopputarkistus",
      title:"Kuka sanoo keskustelun viimeisen sanan?",
      paragraphs:[
        "Vastaa ilman näkyvää mallia. Erota puhuja, puheenvuoron järjestys ja Franzin oma hyvästely.",
      ],
      question:{
        type:"choice",skillId:"L2-READ-04",evidenceRole:"exit",
        prompt:"Mikä on koko kuusirepliikkisen keskustelun viimeinen saksankielinen hyvästely?",
        options:[
          {id:"a",label:"Bis dann!",wrongFeedback:"Bis dann! on Franzin hyvästely viidennessä vuorossa, ei dialogin viimeinen repliikki."},
          {id:"b",label:"Wiedersehen!"},
          {id:"c",label:"Gute Nacht!",wrongFeedback:"Gute Nacht! ei ole Franzin ja Gretan keskustelun viimeinen ilmaus."},
        ],
        correctOption:"b",success:"Oikein. Greta sanoo viimeisenä Wiedersehen!",
        hint:"Franz sanoo ensin Bis dann! ja Greta vastaa seuraavassa repliikissä.",
        reteach:"Viides vuoro: Franz, Bis dann! Kuudes vuoro: Greta, Wiedersehen! Jälkimmäinen on dialogin viimeinen hyvästely.",
        genericWrong:"Valitse viimeisen eli kuudennen repliikin ilmaus.",
      },
    },
    {
      id:"summary",kind:"summary",phase:"Yhteenveto",
      title:"Ymmärrät Franzin ja Gretan keskustelun rakenteen",
      paragraphs:[
        "Luit alkuperäisen kuusivuoroisen keskustelun kokonaan ja harjoittelit erottamaan nimikysymyksen, kuulumiskysymyksen, opettajan sukunimen ja hyvästelyt.",
        "Oppitunnin läpikäynti edellyttää, että teit kaikki vaiheet ja kirjan kolme lähdetehtävää C02-SOURCE-Q02, Q03 ja Q04 ovat sekä vastattuina että tarkistettuina. Pelkkä linkkien avaaminen ei riitä.",
        "Kaikki vastaukset pysyvät C02:n omissa tiedoissa myös myöhempää kertausta varten. Suoritettu tunti ei ole automaattinen todistus pysyvästä tekstinymmärtämisestä.",
        "Seuraavalla tunnilla L009 opit harjoittelemaan nimifraasien kahta yleistä verbiä: heißen ja sein minä- ja sinämuodossa.",
      ],
    },
  ],
};
