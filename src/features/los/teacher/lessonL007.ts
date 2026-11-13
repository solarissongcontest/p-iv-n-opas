import type { TeacherLesson } from "./engine.ts";

/** L007 C02 intro. Original Finnish teaching text, not yet human language-reviewed.
 * C02 Text A is read in its entirety in the textbook; unfamiliar grammar is
 * explicitly recognition-only until later lessons. No generative feedback.
 */
export const LOS1_L007_TEACHER: TeacherLesson = {
  id:"L007",bookId:1,chapterId:"02",version:"2.0.0-preview.1",
  title:"Miten kysyn nimen?",
  objective:"Kysyn tutun henkilön nimen ja esittelen kuvitteellisen itseni käyttäen ich heiße, Wie heißt du? ja ich bin -ilmauksia.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["text-explored"],
  requiredPracticeIds:["C02-EX-01","C02-EX-02"],
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"Tänään opit kysymään ja kertomaan nimen",
      paragraphs:[
        "Osaat jo sanoa Hallo! ja hyvästellä tuttavan. Nyt opimme seuraavan asian: miten sanot oman nimesi ja kysyt toisen nimen.",
        "Harjoittelemme ensin kahden sanan muodostamista ja sitten yksinkertaista nimikysymystä. Etenemme minä- ja sinämuodoista, emme koko verbitaulukosta.",
        "Käytä kaikissa omissa esimerkeissä keksittyjä nimiä. Sinun ei tarvitse tallentaa oikeaa nimeäsi oppikirjaan.",
      ],
    },
    {
      id:"recall",phase:"Muistelu",kind:"question",
      title:"Aloitetaan jo osaamastasi tervehdyksestä",
      paragraphs:["Olet tapaamassa tuttua. Mikä L001–L006:ssa opetettu ilmaus aloittaa keskustelun?"],
      question:{
        type:"choice",skillId:"L1-INT-01",
        prompt:"Miten aloitat tavallisen keskustelun tuttavan kanssa?",
        options:[{id:"a",label:"Tschüss!",wrongFeedback:"Tschüss! päättää keskustelun. Nyt keskustelu on alkamassa."},
          {id:"b",label:"Hallo!"},{id:"c",label:"Gute Nacht!",wrongFeedback:"Gute Nacht! sopii hyvän yön toivotukseksi."}],
        correctOption:"b",success:"Oikein. Hallo! aloittaa kohtaamisen.",
        hint:"Valitse lyhyt hei-tervehdys.",
        reteach:"Hallo! aloittaa keskustelun, Tschüss! päättää sen.",
        genericWrong:"Mieti, onko kohtaaminen alkamassa vai päättymässä.",
      },
    },
    {
      id:"meaning",phase:"Opetus",kind:"explanation",
      title:"Ich heiße Mia tarkoittaa: nimeni on Mia",
      paragraphs:[
        "Saksan verbi heißen kertoo, mikä jonkun nimi on. Kun minä kerron nimeni, sanon Ich heiße Mia. Suomenkielinen merkitys on Nimeni on Mia.",
        "Jos kysyt sinuttelemasi henkilön nimeä, sanot Wie heißt du? Sana du tarkoittaa sinä. Kysymyksen alussa on Wie ja sen jälkeen heißt.",
        "Huomaa ero: ich heiße, mutta du heißt. Verbi muuttuu sen mukaan, puhummeko minästä vai sinästä. Tässä vaiheessa opettelet vain nämä kaksi muotoa.",
        "Sanaa ß käytetään sanassa heiße ja heißt. Tschüss on eri sana, jossa on kaksi s-kirjainta eikä ß:ää.",
      ],
      help:[
        {title:"Miksi heiße mutta heißt?",body:"Nämä ovat saman heißen-verbin eri persoonamuodot: ich heiße (minä olen nimeltäni), du heißt (sinä olet nimeltäsi). Opettele pari ensin valmiina."},
        {title:"Miksi Wie heißt du? ei tarkoita sanatarkasti Mikä on nimesi?",body:"Saksassa nimen kysymiseen käytetään heißen-verbiä. Koko ilmaus Wie heißt du? vastaa luontevasti kysymystä Mikä sinun nimesi on?"},
      ],
    },
    {
      id:"board",phase:"Mallisuoritus",kind:"board",
      title:"Rakenna nimilause vaiheittain",
      paragraphs:[
        "Katsotaan ensin, miten sanon itse nimeni, ja vasta sen jälkeen, miten kysyn toisen nimeä.",
        "Opetustaulu näyttää osat yksi kerrallaan. Voit palata edelliseen vaiheeseen tai aloittaa alusta.",
      ],
      board:[
        {label:"1 · Minä",german:"ich",meaning:"minä, lauseen alussa isolla: Ich"},
        {label:"2 · Verbin minämuoto",german:"heiße",meaning:"olen nimeltäni; heiße kuuluu ich-pronominille"},
        {label:"3 · Kokonainen nimilause",german:"Ich heiße Mia.",meaning:"Nimeni on Mia."},
        {label:"4 · Kysymyssana",german:"Wie",meaning:"miten; tässä nimikysymyksen alku"},
        {label:"5 · Verbin sinämuoto",german:"heißt",meaning:"olet nimeltäsi; heißt kuuluu du-pronominille"},
        {label:"6 · Koko kysymys",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on?"},
      ],
    },
    {
      id:"guided",phase:"Ohjattu harjoitus",kind:"question",
      title:"Valitse nimikysymys",
      paragraphs:["Ajattele, että tapaat samanikäisen henkilön ja haluat tietää hänen nimensä. Valitse nimen kysymiseen sopiva ilmaus."],
      question:{
        type:"choice",skillId:"L1-INT-02",
        prompt:"Miten kysyt tutulta hänen nimeään saksaksi?",
        options:[
          {id:"a",label:"Wie heißt du?"},
          {id:"b",label:"Wie geht's?",wrongFeedback:"Wie geht's? kysyy kuulumisia. Opettelemme sen tarkemmin myöhemmin."},
          {id:"c",label:"Guten Abend!",wrongFeedback:"Tämä on illan tervehdys. Nimen kysymiseen tarvitset heißen-verbiä."},
        ],
        correctOption:"a",success:"Oikein. Wie heißt du? kysyy sinuteltavan henkilön nimeä.",
        hint:"Muista kokonainen fraasi: Wie + heißt + du?",
        reteach:"Wie heißt du? on nimikysymys. Ich heiße Mia. on vastaus, jossa kerron oman nimeni.",
        genericWrong:"Valitse kysymys, jossa esiintyvät Wie, heißt ja du.",
      },
    },
    {
      id:"alternatives",phase:"Opetus",kind:"explanation",
      title:"Myös Ich bin Mia on oikea tapa esitellä itsensä",
      paragraphs:[
        "Saksaksi voit kertoa nimesi ainakin kahdella yksinkertaisella tavalla: Ich heiße Mia. tai Ich bin Mia. Molemmat sopivat tavalliseen esittäytymiseen.",
        "Ich bin tarkoittaa minä olen. Bin on sein-verbin minämuoto. Du bist tarkoittaa sinä olet. Niiden tarkempi harjoittelu tulee L009-tunnilla.",
        "Jos tehtävä kysyy nimen kertomista yleisesti, molemmat ilmaukset ovat mahdollisia. Jos se nimenomaan käskee käyttämään heißen-verbiä, kirjoita Ich heiße Mia.",
        "Tämän kappaleen alkuperäisessä Franzin ja Gretan keskustelussa Franz sanoo ich bin Franz ja Greta vastaa Ich heiße Greta. Myös muut tekstissä esiintyvät vointi- ja opettajafraasit saat nyt lukea suomennoksen avulla, eikä niitä vielä testata itsenäisenä kielioppina.",
      ],
      help:[{title:"Onko Ich bin Mia väärin?",body:"Ei. Se on oikeaa saksaa ja luonteva esittäytyminen. Ich heiße Mia käyttää eri verbiä, mutta kertoo saman nimen."}],
    },
    {
      id:"book-vocabulary",phase:"Oppikirja",kind:"book",
      title:"Etsi nimifraasit kirjan sanastosta ja kieliopista",
      paragraphs:[
        "Avaa C02:n Sanasto ja Kielioppi. Etsi Ich heiße, du heißt, Wie heißt du?, Ich bin ja du bist.",
        "Lue selitys siitä, miksi kaksi verbiä ovat eri muodoissa. Tee kirjan harjoitukset C02-EX-01 ja C02-EX-02. Opettaja näkee vain saman kirjan tallennetut vastaukset.",
        "Kirjan avaaminen tai oikean vaihtoehdon paljastaminen ei muutu itsenäiseksi osaamisnäytöksi.",
      ],
      bookLinks:[
        {label:"C02 · Sanasto",chapterId:"02",section:"vocabulary",instruction:"Etsi kaksi nimifraasia ja minä/sinä-muodot."},
        {label:"C02 · Kielioppi",chapterId:"02",section:"grammar",instruction:"Vertaa ich heiße / du heißt ja ich bin / du bist."},
        {label:"C02 · Harjoittele",chapterId:"02",section:"practice",instruction:"Vastaa C02-EX-01 ja C02-EX-02 kirjan omilla tehtävillä."},
      ],
    },
    {
      id:"independent",phase:"Itsenäinen vastaus",kind:"question",
      title:"Kirjoita nimilause muistista",
      paragraphs:["Peitä kirjan sanalista. Käytä tässä tehtävässä nimenomaan heißen-verbiä ja kuvitteellista nimeä Mia."],
      question:{
        type:"text",skillId:"L1-INT-02",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi heißen-verbillä: Nimeni on Mia.",
        accepted:["Ich heiße Mia."],
        success:"Oikein. Kirjoitit ich heiße -rakenteen ilman mallivastausta.",
        hint:"Aloita Ich ja käytä heißen-verbin minämuotoa heiße.",
        reteach:"Nimilause on Ich heiße Mia. Ich on minä ja heiße on verbin minämuoto.",
        genericWrong:"Tarkista Ich, heiße ja nimi Mia. ß ei ole sama kuin ss.",
        wrongAnswers:{"ich bin mia":"Ich bin Mia. on myös oikein esittäytyessä, mutta tässä pyydettiin heißen-verbiä.","du heißt mia":"Du heißt Mia. tarkoittaa Sinun nimesi on Mia, ei Nimeni on Mia."},
      },
    },
    {
      id:"source",phase:"Tekstin esikatselu",kind:"book",
      title:"Tutustu Franzin ja Gretan koko keskusteluun",
      paragraphs:[
        "Avaa C02:n alkuperäinen kuuden puheenvuoron Text A. Franz aloittaa: Hallo, ich bin Franz. Wie heißt du? Greta vastaa kertomalla nimensä: Ich heiße Greta.",
        "Lue koko keskustelu. Siinä esiintyvät myös Wie geht's?, Kennst du den Lehrer? ja er heißt Herr Weiß. Ne kuuluvat alkuperäistekstiin, mutta uusia rakenteita ei tarvitse vielä tuottaa ulkoa.",
        "Avaa tarvittaessa sanan suomennos kirjan omasta lukijasta. Vahvista lukeneesi tekstin. Tämä ei vielä tarkoita, että olisit osoittanut tekstin ymmärtämisen ilman tukea; sitä harjoitellaan L008:ssa.",
      ],
      bookLinks:[{label:"C02 · Text A: Franz ja Greta",chapterId:"02",section:"text",instruction:"Lue kaikki kuusi repliikkiä ja etsi kaksi erilaista nimiesittelyä."}],
      activityId:"text-explored",activityLabel:"Luin kuusi repliikkiä ja etsin kaksi nimifraasia",
    },
    {
      id:"application",phase:"Soveltaminen",kind:"question",
      title:"Vastaa tavalliseen nimikysymykseen",
      paragraphs:["Kuvittele, että toinen nuori kysyy sinulta: Wie heißt du? Sinun kuvitteellinen nimesi on Greta."],
      question:{
        type:"choice",skillId:"L1-INT-02",evidenceRole:"application",
        prompt:"Mikä vaihtoehto vastaa kysymykseen Wie heißt du?",
        options:[
          {id:"a",label:"Ich heiße Greta."},
          {id:"b",label:"Du heißt Greta.",wrongFeedback:"Du heißt Greta. kertoo toisen ihmisen nimen, ei omaasi."},
          {id:"c",label:"Wie heißt Greta?",wrongFeedback:"Tämä on kysymys, ei vastaus omasta nimestä."},
        ],
        correctOption:"a",success:"Oikein. Ich heiße Greta. kertoo puhujan oman nimen.",
        hint:"Vastaat itsestäsi, joten käytä ich-pronominia.",
        reteach:"Wie heißt du? kysyy toisen nimeä. Ich heiße Greta. kertoo oman nimen.",
        genericWrong:"Vastaa kysymykseen minämuodossa, älä kysy uutta kysymystä.",
      },
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Kysy nimi ilman mallia",
      paragraphs:["Viimeiseksi kirjoita nimikysymys itse. Olet sinuttelevaan tilanteeseen sopivassa kohtaamisessa."],
      question:{
        type:"text",skillId:"L1-INT-02",evidenceRole:"exit",
        prompt:"Kirjoita saksaksi: Mikä sinun nimesi on? (sinuttelu)",
        accepted:["Wie heißt du?"],
        success:"Oikein. Kysymys on Wie heißt du?",
        hint:"Järjestys on Wie, heißt, du. Muista myös kysymysmerkki, vaikka sitä ei vaadita tarkistuksessa.",
        reteach:"Saksaksi nimen kysymiseen käytetään heißen-verbiä: Wie heißt du?",
        genericWrong:"Tarkista kysymyksen kolme osaa ja heißen-verbin sinämuoto.",
        wrongAnswers:{"wie heisse du":"Tässä on väärä verbimuoto. Du tarvitsee heißt, ei heiße.","wie heißt ich":"Ich tarkoittaa minä. Tässä kysytään sinuteltavalta henkilöltä, joten lopussa on du."},
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Nyt osaat aloittaa esittäytymisen",
      paragraphs:[
        "Harjoittelit kahta nimeen liittyvää virkettä: Ich heiße Mia. ja Ich bin Mia. Opit myös kysymyksen Wie heißt du?.",
        "Oikea vastaus vihjeen jälkeen on onnistunutta harjoittelua, mutta ei automaattisesti itsenäistä osaamisnäyttöä. Toisen nimen kysyminen on eri asia kuin kaikkien persoonamuotojen taivuttaminen.",
        "L008:ssa palaamme Franzin ja Gretan koko keskusteluun ja tarkistamme sen ymmärtämisen kirjan oikeilla tehtävillä.",
      ],
    },
  ],
};
