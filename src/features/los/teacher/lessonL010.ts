import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 L010: one Teacher 2.0 manuscript, no second audio/answer store.
 * M-COM-02's actual four-turn human-voice source is embedded in the digital
 * book; its availability on physical devices and rights sign-off remain open.
 * Text is a fallback for study, never evidence of listening proficiency.
 */
export const LOS1_L010_TEACHER: TeacherLesson = {
  id:"L010", bookId:1, chapterId:"02", version:"2.0.0-preview.1",
  title:"Kuuntele ja esittele henkilö",
  objective:"Tunnistan lyhyen esittelydialogin henkilöt ja nimifraasit sekä vertaan niitä C02:n ensimmäiseen dialogiin, ääntä tai tekstivastinetta käyttäen.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["source-studied","dialogues-compared"],
  requiredPracticeIds:[],
  requiredCheckedIds:["C02-MCOM02-Q01","C02-MCOM02-Q02"],
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"Toinen oikea esittelykeskustelu",
      paragraphs:[
        "Olet opetellut ilmaukset Ich heiße Mia., Ich bin Mia. ja Wie heißt du?. Tänään etsit niitä toisesta oikeasta saksankielisestä keskustelusta.",
        "Kirjan Text B:ssä on neljän repliikin Thomasin ja Takashin keskustelu. Ihmisäänite on lähteenä, ja kaikki repliikit voi lukea kokonaisina myös äänettömästi.",
        "Jos kuuntelet, harjoittelet äänestä tunnistamista. Jos käytät pelkkää tekstiä, harjoittelet lukemista. LOS! ei merkitse tekstin lukemista todistetuksi kuullun ymmärtämiseksi.",
      ],
      help:[{title:"Voinko opiskella ilman ääntä?",body:"Kyllä. Kirjan Text B sisältää neljä alkuperäistä repliikkiä ja sanaselitykset. Kuuntelutaitoa ei kuitenkaan väitetä osoitetuksi, jos äänitettä ei kuunneltu."}],
    },
    {
      id:"recall",phase:"Muistelu",kind:"question",
      title:"Palauta mieleen kaksi tapaa kertoa nimesi",
      paragraphs:["L007–L009 opettivat jo kummankin vaihtoehdon. Valitse nyt yksi oikea tapa."],
      question:{
        type:"choice",skillId:"L1-INT-02",
        prompt:"Mikä ilmaus tarkoittaa: Minä olen Thomas?",
        options:[
          {id:"a",label:"Ich bin Thomas."},
          {id:"b",label:"Du bist Thomas.",wrongFeedback:"Du bist tarkoittaa sinä olet. Puhuja esittelee tässä itsensä."},
          {id:"c",label:"Wie heißt Thomas?",wrongFeedback:"Tämä kysyy nimeä, eikä kerro puhujan nimeä."},
        ],
        correctOption:"a",success:"Oikein. Ich bin Thomas. on luonteva esittäytyminen.",
        hint:"Minä on ich ja olen on bin.",
        reteach:"Ich bin Thomas. ja Ich heiße Thomas. ovat molemmat tapoja kertoa oma nimi.",
        genericWrong:"Etsi minämuoto, jossa on ich.",
      },
    },
    {
      id:"strategy",phase:"Opetus",kind:"explanation",
      title:"Näin harjoittelet lyhyttä alkuperäisdialogia",
      paragraphs:[
        "Ensimmäisellä kuuntelu- tai lukukerralla etsi vain nimet. Mitkä kaksi ihmistä keskustelevat ja kenet kolmas henkilö esitellään?",
        "Toisella kerralla kiinnitä huomio fraaseihin Wie heißt du?, Ich heiße Takashi. ja Ich bin Thomas. Vertaa kysymystä ja kahta mahdollista vastausta.",
        "Kolmannella kerralla voit tunnistaa kaupunkien nimet Berlin ja Kyoto. Rakenteita Wir kommen aus Berlin. ja Ich komme aus Kyoto. käsitellään tällä tunnilla kokonaisina ilmauksina; lähtöpaikan kielioppi opetetaan C03:ssa.",
        "Jos ääni ei toimi, tee samat vaiheet lukemalla tekstivastine. Merkitse opiskelutapa itsellesi rehellisesti; tämä ei ole automaattinen ääntämis- tai kuuntelukoe.",
      ],
      help:[
        {title:"Miksi en opettele Wir kommen -rakennetta nyt?",body:"Se kuvaa lähtöpaikkaa ja käyttää me-muotoa. Tässä tunnissa tavoitteena ovat nimet ja tuttujen nimifraasien tunnistaminen. C03 opettaa lähtöpaikan ilmauksia tarkemmin."},
        {title:"Miksi äänen kuuntelulla ei ole pisteitä?",body:"Äänitteen toistoa ja kuuntelun todellista ymmärtämistä ei ole vielä varmennettu riippumattomalla testillä. Kirjan ymmärtämistehtävät voi vastata myös tekstin perusteella."},
      ],
    },
    {
      id:"board",phase:"Mallisuoritus",kind:"board",
      title:"Kuinka opettaja löytää henkilöiden nimet?",
      paragraphs:[
        "Opetustaulussa tapahtumat näkyvät järjestyksessä. Katso, kuka kysyy, kuka vastaa ja kuka esittelee kolmannen henkilön.",
        "Älä päättele kaupungin nimeä ihmisen nimestä. Tekstissä sanotaan nämä tiedot suoraan.",
      ],
      board:[
        {label:"1 · Thomas kysyy",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on?"},
        {label:"2 · Takashi esittäytyy",german:"Ich heiße Takashi.",meaning:"Nimeni on Takashi."},
        {label:"3 · Thomas esittäytyy",german:"Ich bin Thomas.",meaning:"Minä olen Thomas."},
        {label:"4 · Thomas esittelee kolmannen",german:"Das ist Peter.",meaning:"Tämä on Peter. Peter ei ole tämän neljän repliikin keskustelun toinen puhuja."},
        {label:"5 · Lähtöpaikka tunnistetaan",german:"Wir kommen aus Berlin.",meaning:"Me tulemme Berliinistä. Muotoa ei vielä tarvitse itse taivuttaa."},
        {label:"6 · Takashi kertoo paikan",german:"Ich komme aus Kyoto.",meaning:"Tulen Kiotosta. Tätä harjoitellaan aktiivisesti vasta C03:ssa."},
      ],
    },
    {
      id:"source",phase:"Teksti ja mahdollinen kuuntelu",kind:"book",
      title:"Avaa alkuperäiset neljä repliikkiä kirjan Text B:stä",
      paragraphs:[
        "Avaa C02:n Text B. Yritä halutessasi kuunnella ihmisen lausuma M-COM-02 noin 12 sekunnin keskustelu. Äänitteen toimivuutta fyysisillä iPhone- ja Linux-laitteilla ei vielä ole varmistettu.",
        "Lue kaikki neljä repliikkiä riippumatta siitä, käytitkö ääntä. Teksti ei sijaitse ulkoisen linkin takana. Tarvittaessa avaa sanojen suomennokset ja lue tekstin lähdemerkintä.",
        "Vahvista vasta todellinen perehtyminen. Pelkkä äänipainikkeen tai linkin avaaminen ei anna itsenäistä osaamisnäyttöä.",
      ],
      bookLinks:[{label:"C02 · Text B, Thomas ja Takashi",chapterId:"02",section:"text-b",instruction:"Kuuntele mahdollisuuksien mukaan ja lue koko neljän repliikin dialogi."}],
      activityId:"source-studied",activityLabel:"Tutustuin kaikkiin neljään repliikkiin",
    },
    {
      id:"guided",phase:"Ohjattu harjoitus",kind:"question",
      title:"Kuka sanoo Ich heiße Takashi?",
      paragraphs:["Käytä tekstiä tukena ja pohdi, kuka kertoo itsestään. Tämä on ohjattu harjoitus, ei lopputesti."],
      question:{
        type:"choice",skillId:"L1-READ-01",
        prompt:"Kuka esittäytyy ilmauksella Ich heiße Takashi.?",
        options:[
          {id:"a",label:"Takashi"},
          {id:"b",label:"Thomas",wrongFeedback:"Thomas käyttää lausetta Ich bin Thomas. eikä sano olevansa Takashi."},
          {id:"c",label:"Peter",wrongFeedback:"Thomas esittelee Peterin, mutta Peter ei sano tässä repliikkiä."},
        ],
        correctOption:"a",success:"Oikein. Takashi esittäytyy käyttämällä heißen-verbiä.",
        hint:"Sanan heiße jälkeen tulee puhujan oma nimi.",
        reteach:"Thomas kysyy Wie heißt du? ja Takashi vastaa Ich heiße Takashi. Thomas sanoo omaksi nimekseen Ich bin Thomas.",
        genericWrong:"Katso, kuka puhuu toisen repliikin.",
      },
    },
    {
      id:"comparison",phase:"Opetus",kind:"explanation",
      title:"Kaksi keskustelua, sama nimikysymys",
      paragraphs:[
        "Franzin ja Gretan Text A:ssa Franz sanoo ich bin Franz ja Greta sanoo Ich heiße Greta. Thomasin ja Takashin Text B:ssä Thomas sanoo Ich bin Thomas ja Takashi sanoo Ich heiße Takashi.",
        "Molemmissa lähteissä esittäytymisessä esiintyvät siis samat kaksi jo opetettua mallia. Niiden henkilönimet ovat vain esimerkkejä.",
        "Lähdetekstissä mainittu Das ist Peter. on lisäksi tapa esitellä toinen henkilö. Sen voit tässä tunnistaa. Älä vielä yritä muodostaa kaikkia mahdollisia henkilömuotoja.",
        "Text B:n paikkatiedot Berlin ja Kyoto kannattaa tunnistaa, mutta niitä ei käytetä vielä C02:n itsenäisenä aus-rakenteiden kielioppikokeena.",
      ],
    },
    {
      id:"questions",phase:"Kirjan oikeat lähdetehtävät",kind:"book",
      title:"Tee ja tarkista kaksi Text B:n ymmärtämiskysymystä",
      paragraphs:[
        "Avaa samalta Text B -sivulta kysymykset C02-MCOM02-Q01 ja C02-MCOM02-Q02. Ensimmäinen kysyy Takashin nimeä ja toinen Thomasin sekä Peterin kotikaupunkia.",
        "Valitse vastaukset ja paina molemmissa Tarkista vastaus. Tässä opetusnäkymässä käytetään kirjan samoja tallennettuja tehtävätunnisteita ja tarkistusmerkintöjä.",
        "Kolmannen ja neljännen kysymyksen voit tehdä lisäharjoitteluna. Pelkkä vastausvalinta ei korvaa Tarkista-painikkeen käyttöä.",
      ],
      bookLinks:[{label:"C02 · Text B, lähdetehtävät 1 ja 2",chapterId:"02",section:"text-b",instruction:"Tee C02-MCOM02-Q01 ja Q02 ja vahvista kummankin tarkistus."}],
    },
    {
      id:"independent",phase:"Itsenäinen nimifraasi",kind:"question",
      title:"Kirjoita kysymys muistista",
      paragraphs:["Sulje näkyvä tekstivastine ennen vastausta. Tässä halutaan jo opetettu kokonainen nimikysymys."],
      question:{
        type:"text",skillId:"L1-INT-02",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi: Mikä sinun nimesi on? (sinuttelu)",
        accepted:["Wie heißt du?"],
        success:"Oikein. Wie heißt du? kysyy toisen nimeä.",
        hint:"Aloita Wie, lisää heißt ja lopeta du.",
        reteach:"Kun kysyt tutun nimeä, käytä Wie heißt du? Sana heißt on heißen-verbin du-muoto.",
        genericWrong:"Tarkista kolmiosainen kysymys ja ß-kirjain.",
        wrongAnswers:{"wie heisse du":"Du tarvitsee heißt, ei heiße.","wie heißt sie":"Tämä kysyy hänen nimeään, ei suoraan sinun nimeäsi."},
      },
    },
    {
      id:"application",phase:"Soveltaminen",kind:"question",
      title:"Tunnista kuvitteellinen uusi tilanne",
      paragraphs:["Ystäväsi kysyy uudelta tuttavalta hänen nimeään. Uusi tuttava vastaa kertomalla oman nimensä."],
      question:{
        type:"choice",skillId:"L1-INT-02",evidenceRole:"application",
        prompt:"Mikä on luonteva vastaus kysymykseen Wie heißt du?, kun puhujan nimi on Mia?",
        options:[
          {id:"a",label:"Ich heiße Mia."},
          {id:"b",label:"Du heißt Mia.",wrongFeedback:"Du heißt kertoo toisen nimen. Puhuja vastaa itsestään."},
          {id:"c",label:"Wie heißt Mia?",wrongFeedback:"Tämä kysyy kolmannen henkilön nimeä eikä kerro omaa nimeä."},
        ],
        correctOption:"a",success:"Oikein. Myös Ich bin Mia. voisi olla oikea vastaus, mutta sitä ei ole tämän monivalinnan vaihtoehdoissa.",
        hint:"Vastaat itsestäsi. Käytä ich-pronominia.",
        reteach:"Wie heißt du? kysyy nimen. Ich heiße Mia. ja Ich bin Mia. voivat molemmat kertoa sen.",
        genericWrong:"Valitse minämuotoinen lause, jossa on nimi Mia.",
      },
    },
    {
      id:"compare-book",phase:"Tekstien vertailu",kind:"book",
      title:"Vertaa Text A:n ja Text B:n nimilauseita",
      paragraphs:[
        "Avaa myös C02:n Text A, jossa Franz ja Greta esittäytyvät. Etsi heidän kaksi erilaista tapaa kertoa oma nimi.",
        "Vertaa niitä Text B:n Thomasin ja Takashin fraaseihin. Käytä nimien eron sijasta verbimuotoja tunnistamisesi tukena.",
        "Vahvista vertailu vasta kun olet oikeasti käynyt molemmat tekstit läpi. Tämä on oma opiskelutekomerkintä, ei automaattinen arvio luetun ymmärtämisestä.",
      ],
      bookLinks:[{label:"C02 · Text A, Franz ja Greta",chapterId:"02",section:"text",instruction:"Vertaa Text A:n nimifraaseja Text B:n esimerkkeihin."}],
      activityId:"dialogues-compared",activityLabel:"Vertasin Text A:n ja Text B:n nimifraaseja",
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Kuka esittelee Peterin?",
      paragraphs:["Tarkista vielä yksi tekstin keskeinen merkitys ilman valmista mallivastausta. Lukeminen ei muutu kuuntelunäytöksi."],
      question:{
        type:"choice",skillId:"L1-READ-01",evidenceRole:"exit",
        prompt:"Kuka sanoo M-COM-02-dialogissa Das ist Peter.?",
        options:[
          {id:"a",label:"Thomas"},
          {id:"b",label:"Takashi",wrongFeedback:"Takashi kertoo oman nimensä ja kotipaikkansa. Thomas esittelee Peterin."},
          {id:"c",label:"Peter",wrongFeedback:"Peter esitellään, mutta hän ei sano lähteen neljässä repliikissä mitään."},
        ],
        correctOption:"a",success:"Oikein. Thomas sanoo Das ist Peter.",
        hint:"Etsi kolmas repliikki, jossa mainitaan Ich bin Thomas.",
        reteach:"Thomas sanoo Ich bin Thomas. Das ist Peter. Hän kertoo oman nimensä ja esittelee Peterin.",
        genericWrong:"Katso, kuka sanoo kolmannen repliikin.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Osaat tunnistaa kaksi esittäytymistapaa",
      paragraphs:[
        "Tutustuit Thomasin ja Takashin neljään repliikkiin, tunnistit kolme henkilönimeä ja vertasit niitä Franzin sekä Gretan keskusteluun.",
        "Jos kuuntelit, sait kuunteluharjoitusta. Jos käytit tekstivastinetta, harjoittelit lukemista. Kumpaakaan ei kirjata todisteeksi itsenäisesti arvioidusta kuullun ymmärtämisestä.",
        "Seuraavalla tunnilla L011 käytät nimifraaseja omassa kirjoituksessa, palautat C02:n varsinaisen kappaletestin ja kirjaat itsearvioinnin.",
      ],
    },
  ],
};
