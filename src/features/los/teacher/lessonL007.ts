import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 L007 · C02 1/5. First introduction to asking names, with
 * source-grounded Franz/Greta dialogue M-WB-01 in the actual textbook.
 * Wikibooks text has no approved local audio; optional Commons M-COM-02
 * listening is not scored as listening proficiency.
 * Fictional names only. Editorial language/hardware review pending.
 */
export const LOS1_L007_TEACHER: TeacherLesson = {
  id:"L007",bookId:1,chapterId:"02",version:"2.0.0-preview.1",
  title:"Miten kysyn nimen?",
  objective:"Osaan kysyä tutun ihmisen nimen ja kertoa oman tai kuvitteellisen nimen kahdella alkeisilmauksella.",
  estimatedMinutes:30,
  requiredQuestionIds:["pre-name","pre-form","guided","independent","exit"],
  requiredActivityIds:["vocabulary-read","grammar-reviewed","dialogue-read","spoken-practice"],
  requiredPracticeIds:[],
  // Real C02 textbook answer; it must be both saved and explicitly checked.
  // The next lesson revisits the dialogue instead of faking comprehension.
  requiredCheckedIds:["C02-SOURCE-Q01"],
  scenes:[
    {
      id:"welcome",kind:"introduction",phase:"Aloitus",
      title:"Tänään kysyt ensimmäisen kerran toisen nimeä",
      paragraphs:[
        "Osaat jo tervehtiä: Hallo! tai Guten Morgen! Nyt etenemme ensimmäiseen pieneen keskusteluun, jossa kysyt toisen nimeä ja vastaat omalla tai keksityllä nimellä.",
        "Tunnin tärkeimmät ilmaukset ovat Wie heißt du? (Mikä sinun nimesi on?), Ich heiße Mia. (Nimeni on Mia.) ja Ich bin Leo. (Olen Leo.). Esimerkkien Mia ja Leo ovat keksittyjä nimiä, eikä omaa henkilötietoa tarvitse kirjoittaa.",
        "Ensin kokeilet kahta ennakkokysymystä, sitten opiskelet mallin, näet sanat ja kieliopin kirjassa sekä luet alkuperäisen Franzin ja Gretan kuusirepliikkisen keskustelun.",
      ],
    },
    {
      id:"pre-name",kind:"question",phase:"Ennakkokysymys 1/2",
      title:"Tunnistatko kysymyksen jo ennen opetusta?",
      paragraphs:["Kokeile vastausta ilman sanastoa. Virhe ei haittaa, sillä asia opetetaan heti seuraavissa vaiheissa. Tämä on alkutilanteen tarkistus, ei itsenäinen kielitaitonäyttö."],
      question:{
        type:"choice",skillId:"L2-NAME-01",
        prompt:"Mikä ilmauksista kysyy tuttavalta hänen nimeään?",
        options:[
          {id:"a",label:"Wie heißt du?"},
          {id:"b",label:"Gute Nacht!",wrongFeedback:"Gute Nacht! toivottaa hyvää yötä."},
          {id:"c",label:"Tschüss!",wrongFeedback:"Tschüss! on arkinen hyvästely."},
        ],
        correctOption:"a",success:"Oikein. Wie heißt du? kysyy toisen nimeä.",
        hint:"Kysymyksessä on sana wie ja lopussa du.",
        reteach:"Wie heißt du? = Mikä sinun nimesi on? Älä sekoita nimikysymystä tervehtimiseen.",
        genericWrong:"Etsi nimikysymys, ei tervehdystä tai hyvästelyä.",
      },
    },
    {
      id:"pre-form",kind:"question",phase:"Ennakkokysymys 2/2",
      title:"Minä vai sinä?",
      paragraphs:["Voit jo tunnistaa sanan ich, vaikka muut sanat olisivat uusia. Vastaa tämänhetkisen arviosi perusteella."],
      question:{
        type:"choice",skillId:"L2-NAME-02",
        prompt:"Mikä ilmaus tarkoittaa 'Minun nimeni on Greta'?",
        options:[
          {id:"a",label:"Du heißt Greta.",wrongFeedback:"Du tarkoittaa sinä. Tämä kertoo sinun nimestäsi."},
          {id:"b",label:"Ich heiße Greta."},
          {id:"c",label:"Wie heißt Greta?",wrongFeedback:"Wie aloittaa kysymyksen. Tässä pitää kertoa oma nimi."},
        ],
        correctOption:"b",success:"Oikein. Ich heiße Greta. on minämuotoinen esittely.",
        hint:"Ich tarkoittaa minä.",
        reteach:"Ich heiße Greta. = Nimeni on Greta. Du heißt Greta. = Sinun nimesi on Greta.",
        genericWrong:"Etsi lause, jossa puhuja itse kertoo oman nimensä.",
      },
    },
    {
      id:"explanation",kind:"explanation",phase:"Opettajan selitys",
      title:"Nimen kysyminen ja kertominen ovat eri lauseita",
      paragraphs:[
        "Saksassa kysymyksen Wie heißt du? voi sanoa tuttavalle tai samanikäiselle epämuodollisessa tilanteessa. Wie tarkoittaa tässä 'mikä' tai 'miten', heißt liittyy nimeen ja du tarkoittaa sinua.",
        "Kun vastaat, vaihdat näkökulmaa: Ich heiße Mia. Ich tarkoittaa minä ja heiße on tämän verbin minämuoto. Nimen tilalle vaihdat haluamasi kuvitteellisen nimen.",
        "Voit esitellä itsesi myös sanomalla Ich bin Leo. Bin on olla-verbin minämuoto. Molemmat Ich heiße Mia. ja Ich bin Mia. kelpaavat alkeisesittelyyn, mutta niitä ei rakenneta sekoittamalla verbien muotoja.",
        "Huomaa kirjoitusasu: kysymyksessä heißt on ß, vastauksessa heiße on ß ja lopussa e. Kirjoita kirjaimet täsmällisesti; ohjelma ei arvaa automaattisesti, että ss korvaisi ß:n.",
      ],
      help:[
        {title:"Miksi 'du heißt' mutta 'ich heiße'?",body:"Saksan verbit muuttavat muotoaan sen mukaan, kuka tekee tai on jotakin. Tässä riittää kaksi muotoa: ich heiße ja du heißt. Koko taivutusta ei vielä tarvitse opetella."},
        {title:"Voinko käyttää omaa nimeäni?",body:"Voit harjoitella myös oikealla nimelläsi, mutta siihen ei ole mitään tarvetta. Käytä oppikirjan tehtävissä mieluummin kuvitteellisia nimiä, kuten Mia tai Leo."},
      ],
    },
    {
      id:"board",kind:"board",phase:"Opetustaulu",
      title:"Rakenna ensimmäinen nimikeskustelu kolmessa vuorossa",
      paragraphs:[
        "Tutki taulun repliikit yksitellen. Yritä sanoa seuraava vuoro ensin suomeksi ja sitten saksaksi.",
        "Tässä mallissa on kuvitteelliset henkilöt Mia ja Leo. Koko keskustelun tarkoitus on kysyä ja kertoa nimet; emme vielä opettele kaikkia tekstissä myöhemmin näkyviä verbimuotoja.",
      ],
      board:[
        {label:"1. Tervehdys",german:"Hallo!",meaning:"Hei! · aloita kohtaaminen"},
        {label:"2. Nimikysymys",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on? · kysy tutun nimeä"},
        {label:"3. Nimivastaus",german:"Ich heiße Mia.",meaning:"Nimeni on Mia. · kerro oma tai keksitty nimi"},
        {label:"4. Toinen tapa esitellä itsesi",german:"Ich bin Leo.",meaning:"Olen Leo. · vaihtoehtoinen esittely"},
        {label:"5. Kohtaaminen päättyy",german:"Tschüss!",meaning:"Moikka! · tuttu arkinen hyvästely"},
      ],
    },
    {
      id:"guided",kind:"question",phase:"Ohjattu harjoittelu",
      title:"Valitse sopiva vastaus",
      paragraphs:["Franz kysyy Wie heißt du? Kuvittele, että olet Greta ja haluat vastata käyttäen nimeä Greta."],
      question:{
        type:"choice",skillId:"L2-NAME-02",
        prompt:"Millä lauseella kerrot nimesi?",
        options:[
          {id:"a",label:"Ich heiße Greta."},
          {id:"b",label:"Du heißt Greta.",wrongFeedback:"Du tarkoittaa sinä, mutta nyt puhut omasta nimestäsi."},
          {id:"c",label:"Wie heißt du?",wrongFeedback:"Tällä kysyt toisen nimeä, et vastaa omasta nimestäsi."},
        ],
        correctOption:"a",success:"Oikein. Ich heiße Greta. on minämuotoinen esittely.",
        hint:"Aloita vastauksesi sanalla Ich.",
        reteach:"Kysy: Wie heißt du? Vastaa: Ich heiße Greta. Sinä-muoto du heißt ei ole sama kuin minämuoto ich heiße.",
        genericWrong:"Tarvitset myönteisen vastauksen, jossa henkilö kertoo oman nimensä.",
      },
    },
    {
      id:"vocabulary",kind:"book",phase:"Oppikirjan sanasto",
      title:"Etsi nimifraasit kirjan C02-sanastosta",
      paragraphs:[
        "Avaa C02:n sanasto. Etsi kolme ydinasiaa: Wie heißt du?, ich heiße ja ich bin. Selvitä niiden merkitys ja huomaa, missä näkyy ß.",
        "Lue ilmaukset omassa tahdissasi. Kirjan sanasto on kokonaan LOSin sisällä; sitä ei tarvitse etsiä muulta verkkosivulta.",
        "Voit vahvistaa sanastoon tutustumisen itse, mutta vahvistus tarkoittaa vain tekemistä. Se ei ole automaattinen todistus ääntämisen tai sanaston täydellisestä hallinnasta.",
      ],
      bookLinks:[{label:"Avaa C02:n sanasto",chapterId:"02",section:"vocabulary",instruction:"Etsi Wie heißt du?, ich heiße ja ich bin sekä niiden suomennokset."}],
      activityId:"vocabulary-read",activityLabel:"Tutustuin C02-sanaston nimifraaseihin",
    },
    {
      id:"grammar",kind:"book",phase:"Oppikirjan kielioppi",
      title:"Miksi heißen-verbi muuttuu?",
      paragraphs:[
        "Avaa C02:n kielioppi. Vertaa kahta paria: ich heiße / du heißt ja ich bin / du bist. Älä yritä opetella vielä koko verbitaivutusta.",
        "Kun näet ich, valitset minämuodon. Kun näet du, valitset sinämuodon. Nimikysymyksessä käytetään tässä Wie heißt du?, vastauksessa Ich heiße Mia.",
        "Käytä tarvittaessa kirjan esimerkkejä, mutta yritä lopuksi sanoa yksi oma esimerkki ilman näkyvää mallia.",
      ],
      bookLinks:[{label:"Avaa C02:n kielioppi",chapterId:"02",section:"grammar",instruction:"Tutki esimerkit ich heiße / du heißt ja ich bin / du bist."}],
      activityId:"grammar-reviewed",activityLabel:"Vertasin kirjan minä- ja sinämuodot",
    },
    {
      id:"source",kind:"book",phase:"Alkuperäinen teksti A",
      title:"Franz ja Greta kysyvät toisiltaan nimiä",
      paragraphs:[
        "Lue kirjan C02:n alkuperäinen kuuden repliikin keskustelu kokonaan. Ensimmäisessä repliikissä Franz esittäytyy ja kysyy toisen nimeä; toisessa Greta kertoo nimensä.",
        "Älä hämmenny, jos tekstissä esiintyy jo sellaisia ilmauksia kuin Wie geht's? tai Kennst du den Lehrer? Niitä ei tarvitse nyt osata tuottaa. Ne tulevat myöhemmissä opinnoissa vastaan.",
        "Kuusi alkuperäistä repliikkiä, selitykset ja lähdemerkinnät ovat suoraan LOSin lukijassa. Franzin ja Gretan Wikibooks-tekstiin ei pidä sekoittaa erillistä Thomasin ja Takashin Commons-äänitettä.",
      ],
      bookLinks:[{label:"Lue C02:n kuusirepliikkinen Text A",chapterId:"02",section:"text",instruction:"Lue Franzin ja Gretan koko teksti ja etsi Wie heißt du? ja Ich heiße Greta."}],
      activityId:"dialogue-read",activityLabel:"Luin koko Franzin ja Gretan kuuden repliikin tekstin",
    },
    {
      id:"source-check",kind:"book",phase:"Kirjan ymmärtämistehtävä",
      title:"Tarkista yksi väite oikeasta keskustelusta",
      paragraphs:[
        "Avaa C02:n Ymmärrä-osio. Vastaa ensimmäiseen alkuperäistehtävään: Miten Greta kertoo nimensä? Paina myös Tarkista vastaus -painiketta.",
        "Kirjan vastaus tallentuu C02:n tietoihin erillään ensimmäisen kappaleen vastauksista. Pelkkä tekstin avaaminen tai tarkistamattoman valinnan tallentaminen ei riitä.",
        "Sama kysymys tulee vastaan seuraavassakin opetuskokonaisuudessa, jossa luet koko dialogin yksityiskohtaisemmin. Jo tarkistettu vastaus pysyy kirjan historiassa.",
      ],
      bookLinks:[{label:"Avaa C02:n ymmärtäminen",chapterId:"02",section:"understand",instruction:"Vastaa kysymykseen 1 ja paina Tarkista vastaus."}],
    },
    {
      id:"independent",kind:"question",phase:"Itsenäinen soveltaminen",
      title:"Kysy toisen nimi muistista",
      paragraphs:[
        "Sulje kirjan sanasto ennen vastaamista. Nyt kirjoitat itse koko kysymyksen. Et tarvitse omaa nimeäsi tähän harjoitukseen.",
        "Jos pyydät vihjettä, se auttaa oppimista, mutta vastausta ei enää kirjata ensimmäisen yrityksen itsenäiseksi näytöksi.",
      ],
      question:{
        type:"text",skillId:"L2-NAME-01",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi: 'Mikä sinun nimesi on?' (tutulle henkilölle).",
        accepted:["Wie heißt du?"],
        success:"Oikein. Kirjoitit nimikysymyksen Wie heißt du? kokonaisena.",
        hint:"Kysymys alkaa Wie, päättyy du? ja keskellä on heiße-verbin sinämuoto.",
        reteach:"Wie heißt du? on tuttavallinen nimikysymys. Huomaa ß-kirjain: heißt, ei heisst.",
        genericWrong:"Tarkista sanajärjestys ja heißen-verbin sinämuoto. Kirjoita Wie heißt du?",
        wrongAnswers:{"wie heisst du":"Kirjoita lähdemateriaalin mukainen ß-kirjain: Wie heißt du?",
          "ich heiße":"Ich heiße kertoo omaa nimeä, mutta tehtävässä pitää kysyä toisen nimeä."},
      },
    },
    {
      id:"spoken",kind:"activity",phase:"Oma harjoittelu",
      title:"Sano kuvitteellinen nimikeskustelu ääneen",
      paragraphs:[
        "Kokeile sanoa kolme repliikkiä: Hallo! · Wie heißt du? · Ich heiße Mia. Vaihda lopuksi nimeksi Leo ja sano sen sijaan Ich bin Leo.",
        "Voit lausua sanat itse tai harjoitella hiljaa suun liikkeitä. Äänitallennetta ei tarvitse tehdä eikä lähettää mihinkään.",
        "C02:n Text B:ssä on lisäksi oikea Commons-puhuttu esittäytymiskeskustelu ja sen koko tekstivastine. Voit avata sen halutessasi. Sen toimivuutta iPhonella ei ole vielä varmistettu, joten kuuntelua tai ääntämistä ei automaattisesti pisteytetä.",
      ],
      bookLinks:[{label:"Vapaaehtoinen C02:n Text B ja alkuperäisääni",chapterId:"02",section:"text-b",instruction:"Voit tutkia Thomasin, Takashin ja Peterin esittäytymiskeskustelua. Ääni ei ole välttämätön."}],
      activityId:"spoken-practice",activityLabel:"Harjoittelin nimikeskustelun itse (ääneen tai äänettömästi)",
    },
    {
      id:"exit",kind:"question",phase:"Lopputarkistus",
      title:"Miten Mia kertoo oman nimensä?",
      paragraphs:["Valitse oikea ilmaus uudessa tilanteessa. Tämä on oppitunnin rajattu lopputarkistus, ei koko kielitaidon arvosana."],
      question:{
        type:"choice",skillId:"L2-NAME-02",evidenceRole:"exit",
        prompt:"Mia esittäytyy uudelle tuttavalleen. Mikä on oikea lause?",
        options:[
          {id:"a",label:"Du heißt Mia.",wrongFeedback:"Du viittaa toiseen ihmiseen. Mia kertoo nyt oman nimensä."},
          {id:"b",label:"Ich heiße Mia."},
          {id:"c",label:"Wie heißt du?",wrongFeedback:"Tämä on nimikysymys, ei vastaus oman nimen kertomiseen."},
        ],
        correctOption:"b",success:"Oikein. Ich heiße Mia. tarkoittaa, että Mia kertoo oman nimensä.",
        hint:"Aloita minämuotoisella sanalla Ich.",
        reteach:"Wie heißt du? on kysymys. Ich heiße Mia. on minämuotoinen vastaus.",
        genericWrong:"Mieti, kuka puhuu ja pitääkö hänen kysyä vai kertoa nimi.",
      },
    },
    {
      id:"summary",kind:"summary",phase:"Yhteenveto",
      title:"Tunnistat nyt ensimmäisen nimikeskustelun",
      paragraphs:[
        "Opettelit kysymyksen Wie heißt du?, vastauksen Ich heiße Mia. ja vaihtoehdon Ich bin Leo. Käytit sanastoa, kielioppia ja Franzin ja Gretan kuusirepliikkistä alkuperäistekstiä.",
        "Jos ensimmäinen kirjan ymmärtämiskysymys ei ole vielä sekä vastattu että tarkistettu, käy tekemässä se ennen tunnin merkitsemistä käsitellyksi.",
        "Käsitelty oppitunti ja erilliset ensimmäisen yrityksen oikeat vastaukset tallentuvat C02:n tietoihin. C01:n aikaisempia suorituksia ei siirretä eikä kirjoiteta uudelleen.",
        "Seuraavalla tunnilla L008 luet saman kuuden repliikin keskustelun tarkemmin. Siellä opit erottamaan nimien kysymisen, vointikysymyksen ja hyvästelyn.",
      ],
    },
  ],
};
