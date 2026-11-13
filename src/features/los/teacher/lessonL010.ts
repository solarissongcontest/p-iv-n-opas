import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 L010 · C02 4/5: Thomas/Takashi four-turn Commons text M-COM-02.
 * Canonical entire dialogue, human-recorded OGG and four book questions live
 * on the in-app C02 Text B page. Audio is OPTIONAL and playback unverified;
 * transcript use must never be counted as demonstrated listening ability.
 * Educational / language review remains open.
 */
export const LOS1_L010_TEACHER: TeacherLesson = {
  id:"L010",bookId:1,chapterId:"02",version:"2.0.0-preview.1",
  title:"Kuuntele ja esittele henkilö",
  objective:"Tunnistan lyhyestä alkuperäisestä esittäytymiskeskustelusta nimet, henkilön esittelyn ja kaupungit tekstin tai mahdollisen äänen avulla.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided-city","guided-person","independent","application","exit"],
  requiredActivityIds:["audio-or-text","dialogues-compared","meaning-recalled"],
  requiredPracticeIds:[],
  requiredCheckedIds:["C02-MCOM02-Q01","C02-MCOM02-Q02"],
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"Uusi keskustelu: Thomas, Takashi ja Peter",
      paragraphs:[
        "Osaat jo kysyä toisen nimeä ja kertoa oman tai keksityn nimen. Nyt tutustut toiseen oikeaan saksankieliseen keskusteluun, jossa puhutaan myös muista ihmisistä ja kaupungeista.",
        "LOS! 1:n C02 Text B sisältää Thomasin ja Takashin neljän puheenvuoron alkuperäisen Commons-tallenteen. Koko saksankielinen keskustelu ja suomennokset ovat oppikirjassa, eivät erillisen linkin takana.",
        "Äänitteen käyttö on suositeltavaa, jos toisto toimii, mutta sitä ei ole vielä testattu fyysisillä puhelimilla. Voit suorittaa tämän lukemalla tekstivastineen, jolloin kyseessä on lukuharjoitus eikä todennettu kuullun ymmärtämisen näyttö.",
        "Tavoite on tunnistaa tekijät, heidän nimensä ja kaupunkinsa. Kommen-verbin taivutus opiskellaan aktiivisesti seuraavassa kappaleessa C03, eikä sitä tarvitse nyt itse muodostaa.",
      ],
      help:[{title:"Onko ääni pakollinen?",body:"Ei. Koko alkuperäinen neljän vuoron teksti ja siihen liittyvät kysymykset ovat LOSin Text B -sivulla. Jos ääni ei toimi, lue teksti. Suoritus ei silti todista kuullun ymmärtämistä."}],
    },
    {
      id:"recall",phase:"Aiemman opitun muistelu",kind:"question",
      title:"Mikä kertoo puhujan oman nimen?",
      paragraphs:["Kokeile ensin muistista. Tämän aloituskysymyksen tarkoitus on aktivoida L007–L009:n fraasit, eikä sitä lasketa itsenäiseksi uudeksi osaamisnäytöksi."],
      question:{
        type:"choice",skillId:"L2-NAME-02",
        prompt:"Mikä ilmaus tarkoittaa 'Minä olen Thomas'?",
        options:[
          {id:"a",label:"Du bist Thomas.",wrongFeedback:"Du bist Thomas. tarkoittaa sinä olet Thomas. Nyt puhuja esittelee itsensä."},
          {id:"b",label:"Ich bin Thomas."},
          {id:"c",label:"Wie heißt Thomas?",wrongFeedback:"Wie heißt Thomas? on kysymys, ei puhujan oman nimen kertominen."},
        ],
        correctOption:"b",success:"Oikein. Ich bin Thomas. kertoo puhujan oman nimen.",
        hint:"Ich = minä. Sein-verbin minämuoto on bin.",
        reteach:"Ich bin Thomas. = Minä olen Thomas. Ich heiße Thomas. = Minun nimeni on Thomas.",
        genericWrong:"Etsi minämuotoinen vastaus, ei sinämuotoa tai kysymystä.",
      },
    },
    {
      id:"guide",phase:"Opettajan johdanto",kind:"explanation",
      title:"Erota puhuja, mainittu henkilö ja lähtöpaikka",
      paragraphs:[
        "Thomas ja Takashi puhuvat keskenään. Keskustelussa mainitaan lisäksi Peter, mutta Peterillä ei ole omaa puheenvuoroa. Tämä ero auttaa ymmärtämään, kuka sanoo mitä.",
        "Thomas esittäytyy lauseella Ich bin Thomas. Se tarkoittaa Olen Thomas. Hän sanoo myös Das ist Peter. eli Tämä on Peter. Ilmaus das ist esittelee toisen henkilön, ei puhujaa itseään.",
        "Thomas sanoo Wir kommen aus Berlin. Wir tarkoittaa me. Takashi puolestaan sanoo Ich komme aus Kyoto. Ich tarkoittaa minä. Kaupungit ovat Berliini ja Kioto.",
        "Myös Ich bin Japaner. esiintyy lähteessä. Se tarkoittaa Olen japanilainen (miespuhujan käyttämä muoto). Tässä voit ymmärtää kokonaisen ilmauksen, vaikka et vielä itse tuottaisi kaikkia kansallisuuksia.",
      ],
      help:[
        {title:"Miten 'Ich bin' eroaa 'Das ist' -rakenteesta?",body:"Ich bin kertoo puhujasta: Olen Thomas. Das ist kertoo toisesta ihmisestä: Tämä on Peter."},
        {title:"Miksi Berlin ja Kyoto ovat tekstissä?",body:"Ne ovat puhujien mainitsemia kaupunkeja. Wir kommen aus Berlin. = Me tulemme Berliinistä. Ich komme aus Kyoto. = Minä tulen Kiotosta. Tämä on tunnistusharjoitus."},
      ],
    },
    {
      id:"source",phase:"Alkuperäinen Text B",kind:"book",
      title:"Kuuntele alkuperäinen ääni tai lue koko tekstivastine",
      paragraphs:[
        "Avaa kirjan C02 · Text B. Sivulla on ihmisen äänittämä alkuperäinen Commons-OGG sekä neljä puheenvuoroa kokonaisina kirjoitettuna. Tarvittaessa näet sanojen merkityksiä ja koko keskustelun suomennoksen.",
        "Yritä ensin ilman suomennosta tunnistaa sanat Thomas, Takashi ja Peter. Etsi sitten Berlin ja Kyoto. Vertaile vasta lopuksi merkityksiä.",
        "Jos ääni ei lataudu tai et voi käyttää ääntä, koko oppitunnin voi tehdä tekstin perusteella. Älä merkitse kuuntelua tehdyksi, jos käytit vain tekstiä. Tämä toiminto kirjaa lähteen opiskelun, ei kuullun ymmärtämisen tulosta.",
      ],
      bookLinks:[{label:"Avaa C02:n alkuperäinen Text B",chapterId:"02",section:"text-b",instruction:"Kuuntele jos mahdollista tai lue kaikki neljä alkuperäistä vuoroa. Koko teksti on kirjassa."}],
      activityId:"audio-or-text",activityLabel:"Tutkin kaikki neljä Text B:n puheenvuoroa äänen tai tekstin avulla",
    },
    {
      id:"board",phase:"Opetustaulu",kind:"board",
      title:"Neljä vuoroa, kolme nimeä ja kaksi kaupunkia",
      paragraphs:[
        "Opetustaulu tekee keskustelun rakenteesta näkyvän. Lähteen kaikki alkuperäiset repliikit ovat oppikirjassa; tämä taulu näyttää vain ydinrakenteet ja merkitykset.",
        "Kerro jokaiseen kohtaan ensin suomeksi, kuka puhuu ja kenestä hän puhuu. Älä sekoita Peteriä kolmanteen puhujaan.",
      ],
      board:[
        {label:"1 · Thomas kysyy",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on? · Thomas kysyy Takashin nimeä"},
        {label:"2 · Takashi vastaa",german:"Ich heiße Takashi. Und du?",meaning:"Minun nimeni on Takashi. Entä sinä?"},
        {label:"3 · Thomas esittelee itsensä ja Peterin",german:"Ich bin Thomas. Das ist Peter.",meaning:"Olen Thomas. Tämä on Peter."},
        {label:"3 · Thomas kertoo heidän kaupungistaan",german:"Wir kommen aus Berlin.",meaning:"Me tulemme Berliinistä."},
        {label:"4 · Takashi kertoo kaupungistaan",german:"Ich komme aus Kyoto.",meaning:"Minä tulen Kiotosta."},
        {label:"4 · Takashi kertoo kansallisuudestaan",german:"Ich bin Japaner.",meaning:"Olen japanilainen (miespuhuja)."},
      ],
    },
    {
      id:"guided-city",phase:"Ohjattu harjoittelu",kind:"question",
      title:"Mistä Thomas ja Peter ovat?",
      paragraphs:["Thomas käyttää ilmausta Wir kommen aus Berlin. Lue koko lause ja huomaa, että wir tarkoittaa tässä heistä kahta, joista Thomas puhuu."],
      question:{
        type:"choice",skillId:"L2-COM-02",
        prompt:"Mitä Thomas tarkoittaa ilmauksella Wir kommen aus Berlin.?",
        options:[
          {id:"a",label:"Me tulemme Berliinistä."},
          {id:"b",label:"Minä tulen Kiotosta.",wrongFeedback:"Kioton mainitsee Takashi, ei Thomas."},
          {id:"c",label:"Minun nimeni on Berlin.",wrongFeedback:"Berlin on tässä kaupunki, jota edeltää aus."},
        ],
        correctOption:"a",success:"Oikein. Thomasin ja Peterin kaupungiksi mainitaan Berliini.",
        hint:"Wir = me ja Berlin = Berliini.",
        reteach:"Wir kommen aus Berlin. = Me tulemme Berliinistä. Ich komme aus Kyoto. = Minä tulen Kiotosta.",
        genericWrong:"Etsi lauseen kaupunki ja pronominin wir merkitys.",
      },
    },
    {
      id:"questions",phase:"Kirjan tarkistettavat tehtävät",kind:"book",
      title:"Vastaa kirjan kahteen oikeaan Text B -kysymykseen",
      paragraphs:[
        "Kirjan Text B -sivulla on neljä alkuperäisen tekstin ymmärtämiskysymystä. Tee ainakin kaksi ensimmäistä: C02-MCOM02-Q01 (Takashin nimi) ja C02-MCOM02-Q02 (Thomasin ja Peterin kotikaupunki).",
        "Valitse vastaus ja paina kummankin kysymyksen omaa Tarkista vastaus -painiketta. Vastauksen pelkkä valinta ei vielä riitä tähän oppituntiin.",
        "Kysymykset 3 ja 4 ovat vapaaehtoista lisäharjoittelua. Kahden ensimmäisen vastaus ja tarkistus tallentuvat C02-kirjan oikeisiin kenttiin, joita opettaja käyttää ilman erillistä kopiointia.",
        "Tehtävät voi ratkaista myös lukemalla alkuperäisen tekstin. Silloin tulos kuvaa luetun ymmärtämisen harjoittelua, ei varmistettua kuulemista.",
      ],
      bookLinks:[{label:"Avaa Text B:n kysymykset 1 ja 2",chapterId:"02",section:"text-b",instruction:"Vastaa C02-MCOM02-Q01 ja Q02 ja paina kummassakin Tarkista vastaus."}],
    },
    {
      id:"compare",phase:"Vertaa aiempaan tekstiin",kind:"book",
      title:"Vertaa Franzin ja Gretan sekä Thomasin ja Takashin esittelyjä",
      paragraphs:[
        "Avaa C02:n Text A ja palaa Franzin ja Gretan keskustelun alkuun. Greta sanoo Ich heiße Greta. Thomas puolestaan sanoo Text B:ssä Ich bin Thomas.",
        "Molemmilla kerrotaan oma nimi. Ich heiße korostaa nimeä; ich bin tarkoittaa minä olen. Molemmat ovat alkeiden esittelytilanteessa mahdollisia.",
        "Älä sekoita kahta alkuperäistä lähdettä: Franzin ja Gretan Text A ei ole Thomasin ja Takashin Commons-äänitteen ääniraita. Niitä käsitellään erillisinä teksteinä.",
      ],
      bookLinks:[{label:"Vertaa C02:n alkuperäiseen Text A:han",chapterId:"02",section:"text",instruction:"Etsi Gretan Ich heiße Greta. ja vertaa Thomasin Ich bin Thomas. -lauseeseen."}],
      activityId:"dialogues-compared",activityLabel:"Vertasin Text A:n ja Text B:n esittäytymisiä",
    },
    {
      id:"person",phase:"Opettajan selitys",kind:"explanation",
      title:"Das ist Peter ei tarkoita 'Minä olen Peter'",
      paragraphs:[
        "Kuvittele, että seisot ystäväsi vieressä. Jos kerrot oman nimesi, voit sanoa Ich bin Thomas. Kun osoitat ystävääsi, voit sanoa Das ist Peter. eli Tämä on Peter.",
        "Tämä on tämän tunnin kolmas tärkeä ajatus: puhuja Thomas, hänen mainitsemansa Peter ja heistä molemmista käytetty wir eivät tarkoita samaa asiaa.",
        "Kun Takashi vastaa Ich komme aus Kyoto., hän kertoo vain omasta kaupungistaan. Kyoton ja Berliinin muistaminen auttaa tehtävässä, mutta kommen-verbin kokonainen taivutus tulee myöhemmässä C03:ssa.",
      ],
    },
    {
      id:"guided-person",phase:"Ohjattu tunnistus",kind:"question",
      title:"Miten Thomas esittelee Peterin?",
      paragraphs:["Takashi puhuu Thomasin kanssa. Thomas kertoo myös lähellään olevan kolmannen henkilön nimen."],
      question:{
        type:"choice",skillId:"L2-COM-02",
        prompt:"Mikä ilmauksista tarkoittaa 'Tämä on Peter'?",
        options:[
          {id:"a",label:"Ich bin Peter.",wrongFeedback:"Tämä tarkoittaa Minä olen Peter. Se olisi Peterin oma esittäytyminen."},
          {id:"b",label:"Das ist Peter."},
          {id:"c",label:"Wie heißt Peter?",wrongFeedback:"Tämä on kysymys Peterin nimestä, ei esittely."},
        ],
        correctOption:"b",success:"Oikein. Das ist Peter. esittelee kolmannen henkilön.",
        hint:"Das ist = tämä on.",
        reteach:"Ich bin Thomas. = Olen Thomas. Das ist Peter. = Tämä on Peter.",
        genericWrong:"Etsi ilmaus, jolla puhuja esittelee jonkun muun.",
      },
    },
    {
      id:"independent",phase:"Itsenäinen soveltaminen",kind:"question",
      title:"Esittele Peter muistista",
      paragraphs:["Sulje mallitaulu ja kirjoita kokonainen saksankielinen lause. Tässä tarvitset vain jo opetellun rakenteen, et omia henkilötietoja."],
      question:{
        type:"text",skillId:"L2-COM-02",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi: Tämä on Peter.",
        accepted:["Das ist Peter."],success:"Oikein. Das ist Peter. kertoo toisesta henkilöstä.",
        hint:"Aloita sanoilla Das ist.",
        reteach:"Kun esittelet toisen ihmisen, sano Das ist Peter. Kun puhut itsestäsi, Ich bin Thomas. käy esittelyyn.",
        genericWrong:"Tarkista kolmen sanan ilmaus Das ist Peter.",
        wrongAnswers:{"ich bin peter":"Ich bin Peter. tarkoittaa Olen Peter, ei Tämä on Peter.",
          "du bist peter":"Du bist Peter. tarkoittaa Sinä olet Peter."},
      },
    },
    {
      id:"application",phase:"Uusi soveltava tilanne",kind:"question",
      title:"Kenen kaupungista keskustelussa puhutaan?",
      paragraphs:["Käytä nyt tekstin merkitystä uudessa kysymyksessä. Älä yritä päätellä vastausta vain puhujan nimestä."],
      question:{
        type:"choice",skillId:"L2-COM-02",evidenceRole:"application",
        prompt:"Kumpi henkilö sanoo tulevansa Kiotosta?",
        options:[
          {id:"a",label:"Thomas",wrongFeedback:"Thomas kertoo heidän tulevan Berliinistä."},
          {id:"b",label:"Peter",wrongFeedback:"Peter mainitaan, mutta hänellä ei ole omaa repliikkiä."},
          {id:"c",label:"Takashi"},
        ],
        correctOption:"c",success:"Oikein. Takashi sanoo Ich komme aus Kyoto.",
        hint:"Etsi Ich komme aus Kyoto. ja tarkista sen puhuja.",
        reteach:"Thomas: Wir kommen aus Berlin. Takashi: Ich komme aus Kyoto. Peter ei puhu.",
        genericWrong:"Etsi se henkilö, joka puhuu ensimmäisessä persoonassa Kiotosta.",
      },
    },
    {
      id:"replay",phase:"Kertaus ja muistelu",kind:"activity",
      title:"Palauta neljä puheenvuoroa muistiin",
      paragraphs:[
        "Sulje alkuperäinen teksti. Kerro mielessäsi tai ääneen: ensin Thomas kysyy Takashin nimeä, sitten Takashi vastaa ja kysyy takaisin, Thomas esittelee itsensä ja Peterin sekä kertoo Berliinistä, lopuksi Takashi kertoo Kiotosta ja kansallisuudestaan.",
        "Jos järjestys ei muistunut oikein, avaa kirjan Text B ja tarkista se. Lue tarvittaessa kaikki neljä alkuperäistä vuoroa uudelleen.",
        "Tämän harjoittelun vahvistus ei mittaa ääntämistä, audion toistoa tai sitä, pystytkö myöhemmin ymmärtämään kuulemiasi uusia keskusteluja.",
      ],
      bookLinks:[{label:"Tarkista tarvittaessa koko alkuperäinen Text B",chapterId:"02",section:"text-b",instruction:"Lue vielä kerran kaikki neljä puheenvuoroa ja vertaa puhuja–nimi–kaupunki -tietoja."}],
      activityId:"meaning-recalled",activityLabel:"Palautin neljän vuoron pääsisällön ja tarkistin tarvittaessa kirjasta",
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Tunnistatko koko keskustelun henkilöt?",
      paragraphs:["Viimeinen kysymys yhdistää tekstin keskeiset tiedot. Se on rajattu ymmärtämistarkistus, ei automaattinen kuulotaitonäyttö."],
      question:{
        type:"choice",skillId:"L2-COM-02",evidenceRole:"exit",
        prompt:"Mikä kuvaus vastaa Text B:n alkuperäistä keskustelua?",
        options:[
          {id:"a",label:"Thomas ja Peter tulevat Berliinistä, Takashi kertoo tulevansa Kiotosta."},
          {id:"b",label:"Thomas ja Peter tulevat Kiotosta, Takashi kertoo tulevansa Berliinistä.",wrongFeedback:"Kaupungit ovat menneet vaihtoon."},
          {id:"c",label:"Peter esittäytyy ensimmäisenä, ja Thomas kertoo olevansa japanilainen.",wrongFeedback:"Peter ei ole keskustelun puhuja. Takashi sanoo Ich bin Japaner."},
        ],
        correctOption:"a",success:"Oikein. Thomas ja Peter ovat Berliinistä, Takashi kertoo tulevansa Kiotosta.",
        hint:"Muista kaksi alkuperäistä virkettä: Wir kommen aus Berlin. ja Ich komme aus Kyoto.",
        reteach:"Thomas esittelee Peterin ja mainitsee Berliinin. Takashi kertoo Kiotosta ja sanoo olevansa japanilainen.",
        genericWrong:"Varmista, kumpi sanoo Berlin ja kumpi Kyoto.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Tunnistat nyt kaksi erilaista esittäytymiskeskustelua",
      paragraphs:[
        "Käsittelit Thomasin ja Takashin alkuperäisen neljän puheenvuoron keskustelun. Tunnistit nimet Thomas, Takashi ja Peter sekä kaupungit Berliini ja Kioto.",
        "Erottelit Ich heiße Takashi., Ich bin Thomas. ja Das ist Peter. -rakenteet. Teit kirjan kaksi tarkistettua kysymystä C02-MCOM02-Q01 ja Q02 sekä vertasit Text A:n erilaista esittäytymistä.",
        "Jos käytit vain tekstivastinetta, oppiminen oli kirjallista ymmärtämistä. Jos ääni toimi ja kuuntelit, sait lisäksi kuunteluharjoittelua. Kumpaakaan ei pisteytetä automaattisesti todistetuksi kuunteluosaamiseksi.",
        "L011 kertaa koko C02-kappaleen, jossa kirjoitat oman lyhyen esittäytymisen ja palautat oikean kappaletestin itsearviointeineen.",
      ],
    },
  ],
};
