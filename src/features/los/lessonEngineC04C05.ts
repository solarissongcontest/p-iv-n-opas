import type { LosLessonBlueprint } from "./lessonEngine";

/**
 * C04–C05 learning activities use original human-authored Wikibooks
 * dialogue text and the existing LOS! exercise engine. No external audio is
 * claimed to exist or to have been device-tested. The historical path titles
 * are updated where they described a different source or unsupported media.
 */
export const LOS1_C04_C05_LESSONS: readonly LosLessonBlueprint[] = [
  {
    id:"L017",title:"Milloin du tai Sie?",objective:"Erotan epämuodollisen du-puhuttelun kohteliaasta Sie-puhuttelusta.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"intro",label:"Lue kohteliaasta puhuttelusta",instruction:"Avaa C04:n kielioppisivu ja opiskele du ja isolla kirjoitettu Sie. Pohdi, miksi valintaan vaikuttaa tilanne eikä yksin henkilön ikä.",chapter:"04",section:"grammar",minutes:10},
      {id:"compare",label:"Lue puhuttelun kulttuuritaustasta",instruction:"Lue C04:n kulttuuriosio ja vertaa tuttavan sinuttelua sekä virallista kohtaamista. Sie ei tarkoita automaattisesti kaikkien aikuisten puhuttelua.",chapter:"04",section:"culture",minutes:10},
      {id:"examples",label:"Etsi kohteliaat ilmaukset oikeasta tekstistä",instruction:"Avaa herra Schmidtin ja herra Standishin alkuperäinen C04-dialogi. Etsi Ihnen ja kohtelias hyvästely; haastava muu sanasto saa jäädä tunnistustasolle.",chapter:"04",section:"text",minutes:6},
    ],evidence:[],check:{
      question:"Mikä kirjoitusasu tarkoittaa kohteliasta Te-puhuttelua?",
      answers:[{id:"a",text:"Sie"},{id:"b",text:"sie"},{id:"c",text:"du"}],correctId:"a",
      explanation:"Kohteliaassa puhuttelussa käytetään isolla kirjoitettua Sie. Pienellä kirjoitetulla sie-sanalla on muita merkityksiä.",
    },
  },
  {
    id:"L018",title:"Herr Schmidt ja Herr Standish: koko dialogi",
    objective:"Tunnistan alkuperäistekstin kohteliaan vointikysymyksen ja puhujat.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"read",label:"Lue alkuperäiset kahdeksan puheenvuoroa",instruction:"Avaa C04:n Text A, jossa herra Schmidt ja herra Standish keskustelevat töistä ja voinnista. Lue kaikki repliikit, käytä tarvittaessa sanaselityksiä.",chapter:"04",section:"text",minutes:11},
      {id:"questions",label:"Tarkista kaksi ymmärtämiskysymystä",instruction:"Tee C04-SOURCE-Q01 ja C04-SOURCE-Q02 ymmärtämissivulla. Tunnista Sie/Ihnen ja se, miksi Schmidt on väsynyt. Palauta tarkistukset.",chapter:"04",section:"understand",minutes:11},
      {id:"recall",label:"Muista muodollinen fraasi",instruction:"Sulje hetkeksi teksti. Yritä muistaa kohtelias vointikysymys ja tarkista ilmauksen merkitys ilman koko verbijärjestelmän opettelua.",chapter:"04",section:"text",minutes:4},
    ],evidence:[{kind:"checked-source",ids:["C04-SOURCE-Q01","C04-SOURCE-Q02"],label:"C04:n alkuperäiskeskustelun kaksi kysymystä vastattu ja tarkistettu."}],check:{
      question:"Miten Herr Schmidt kysyy vointia kohteliaasti?",
      answers:[{id:"a",text:"Wie heißt du?"},{id:"b",text:"Wie geht es Ihnen?"},{id:"c",text:"Woher kommst du?"}],correctId:"b",
      explanation:"Alkuperäisen C04-dialogin vointikysymys on Wie geht es Ihnen?; opettele se tässä vaiheessa kokonaisena fraasina.",
    },
  },
  {
    id:"L019",title:"Kohtelias verbinmuoto",objective:"Täydennän Sie-kysymyksen verbeillä heißen ja kommen.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"forms",label:"Opiskele Sie ja verbin muoto",instruction:"Lue C04:n kielioppisivulta Wie heißen Sie? ja Woher kommen Sie? Vertaa kysymyksiä tuttavalliseen du-muotoon.",chapter:"04",section:"grammar",minutes:11},
      {id:"answers",label:"Tee Sie-verbin kaksi täydennystä",instruction:"Vastaa harjoituksiin C04-EX-05 ja C04-EX-06. Molemmissa kohtelias Sie edellyttää monikon kaltaista verbimuotoa.",chapter:"04",section:"practice",minutes:10},
      {id:"usage",label:"Harjoittele kokonaisia kysymyksiä",instruction:"Tee C04-EX-07 ja C04-EX-08. Mieti, miksi sanajärjestys ja verbimuoto ovat erilaisia kuin du-kysymyksissä.",chapter:"04",section:"practice",minutes:5},
    ],evidence:[{kind:"answered-practice",ids:["C04-EX-05","C04-EX-06","C04-EX-07","C04-EX-08"],label:"Neljä C04:n Sie-puhuttelutehtävää vastattu."}],check:{
      question:"Mikä on kohtelias nimikysymys?",
      answers:[{id:"a",text:"Wie heißt Sie?"},{id:"b",text:"Wie heißen Sie?"},{id:"c",text:"Wie heiße Sie?"}],correctId:"b",
      explanation:"Sie-puhuttelun kanssa käytetään verbiä heißen, joten sanotaan Wie heißen Sie?",
    },
  },
  {
    id:"L020",title:"Käytä kohteliaisuusfraaseja",objective:"Valitsen oikean puhuttelun arkisessa ja muodollisessa tilanteessa.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"formal",label:"Palaa muodolliseen dialogiin",instruction:"Lue C04:n alkuperäistekstistä Herr Schmidt ja Herr Standish sekä heidän hyvästelynsä. Tätä dialogia ei väitetä omaksi äänitetyksi Text B -kuunteluksi.",chapter:"04",section:"text",minutes:9},
      {id:"choice",label:"Vertaile du- ja Sie-tilanteita",instruction:"Tee C04-EX-01, C04-EX-02 ja C04-EX-03. Tarkista oikeat ilmaukset kappaleen harjoitussivulla.",chapter:"04",section:"practice",minutes:12},
      {id:"application",label:"Kirjoita kaksi tervehdystilannetta",instruction:"Kirjoita C04:n soveltamissivulle ensin ystävän kanssa käytävä keskustelu ja sitten kohtelias keskustelu. Kirjoitus arvioidaan tarkistuslistalla, ei tekaistulla konearvosanalla.",chapter:"04",section:"apply",minutes:5},
    ],evidence:[{kind:"answered-practice",ids:["C04-EX-01","C04-EX-02","C04-EX-03"],label:"Kolme kohteliaisuustilannetta ratkaistu."}],check:{
      question:"Millä ilmauksella hyvästelet kohteliaasti virallisessa tilanteessa?",
      answers:[{id:"a",text:"Auf Wiedersehen!"},{id:"b",text:"Gute Nacht!"},{id:"c",text:"Hallo!"}],correctId:"a",
      explanation:"Auf Wiedersehen! on yleinen kohtelias hyvästely. Tässä oppitunnissa ei väitetä puhetta tai kuuntelua automaattisesti arvioiduksi.",
    },
  },
  {
    id:"L021",title:"Harjoittele ja testaa C04",objective:"Sovellan kohteliaan puhuttelun perusteita ja palautan kappaletestin.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"review",label:"Tarkista du- ja Sie-eron ymmärtäminen",instruction:"Kertaa C04:n sanat, kysymykset ja kohteliaisuuskäytännöt. Yritä ensin vastata ilman mallia.",chapter:"04",section:"vocabulary",minutes:8},
      {id:"production",label:"Tee oma soveltava keskustelu",instruction:"Kirjoita kaksi eri kohtaamista C04:n soveltamistehtävään. Käytä kuvitteellisia nimiä; oman henkilötiedon tallentaminen ei ole tarpeen.",chapter:"04",section:"apply",minutes:8},
      {id:"test",label:"Palauta kappaletesti",instruction:"Palauta C04:n kappaletesti kokonaisuudessaan. Oppituntimerkintä ei yksin todista osaamista, vaan osoittaa tehdyt vaiheet.",chapter:"04",section:"test",minutes:10},
    ],evidence:[{kind:"chapter-test",label:"C04:n kappaletesti palautettu."}],check:{
      question:"Mikä pari vastaa oikein du- ja Sie-puhuttelua?",
      answers:[{id:"a",text:"Wie heißen du? / Wie heißt Sie?"},{id:"b",text:"Wie heißt du? / Wie heißen Sie?"},{id:"c",text:"Wie heiße du? / Wie heiße Sie?"}],correctId:"b",
      explanation:"Du käyttää heißt ja kohtelias Sie käyttää heißen. Konteksti määrää, kumpi puhuttelu sopii.",
    },
  },
  {
    id:"L022",title:"Mitä kuuluu?",objective:"Kysyn kuulumisia ja ymmärrän yksinkertaisen vastauksen.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"phrases",label:"Tutustu vointifraaseihin",instruction:"Avaa C05:n sanasto. Kertaa Wie geht's?, Gut, danke. ja Nicht so gut. Fraasit opitaan ensin kokonaisuuksina.",chapter:"05",section:"vocabulary",minutes:10},
      {id:"context",label:"Lue vointikysymyksen käyttötapoja",instruction:"Lue C05:n kulttuuriosio ja erota tuttavallinen Und dir? kohteliaasta Und Ihnen? -vastakysymyksestä.",chapter:"05",section:"culture",minutes:10},
      {id:"model",label:"Tunnista vointikysymys tekstistä",instruction:"Avaa Heinrichin ja Karlin alkuperäinen neljän repliikin keskustelu. Etsi kysymys Wie geht es dir? ja Karlilta vastaus.",chapter:"05",section:"text",minutes:6},
    ],evidence:[],check:{
      question:"Mitä kysymys Wie geht's? tarkoittaa?",
      answers:[{id:"a",text:"Mikä nimesi on?"},{id:"b",text:"Mitä kuuluu?"},{id:"c",text:"Mistä olet kotoisin?"}],correctId:"b",
      explanation:"Wie geht's? tarkoittaa Mitä kuuluu? Se on yleinen arjen kuulumiskysymys.",
    },
  },
  {
    id:"L023",title:"Lue vointidialogi",objective:"Ymmärrän Heinrichin ja Karlin neljä alkuperäistä puheenvuoroa.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"read",label:"Lue ihmisten laatima keskustelu kokonaan",instruction:"Lue Wikibooksin Heinrich–Karl-dialogin kaikki neljä repliikkiä. Avaa tarvittaessa sanaselitykset ja huomaa lause Wie geht es dir?",chapter:"05",section:"text",minutes:10},
      {id:"questions",label:"Tarkista tekstin kaksi ensimmäistä tehtävää",instruction:"Vastaa ja tarkista C05-SOURCE-Q01 sekä C05-SOURCE-Q02. Etsi lähdetekstistä kysymys ja siihen annettu vastaus.",chapter:"05",section:"understand",minutes:12},
      {id:"memory",label:"Muista vastakysymys",instruction:"Peitä hetkeksi teksti ja yritä sanoa Und dir? sekä Gut, danke. Tarkista vasta sen jälkeen alkuperäinen kirjoitusasu.",chapter:"05",section:"text",minutes:4},
    ],evidence:[{kind:"checked-source",ids:["C05-SOURCE-Q01","C05-SOURCE-Q02"],label:"C05:n alkuperäiskeskustelun vointikysymykset vastattu ja tarkistettu."}],check:{
      question:"Mitä Karl sanoo voinnistaan?",
      answers:[{id:"a",text:"Mir geht es gut."},{id:"b",text:"Ich komme aus Berlin."},{id:"c",text:"Ich heiße Heinrich."}],correctId:"a",
      explanation:"Mir geht es gut tarkoittaa, että minulle kuuluu hyvää. Karl sanoo sen alkuperäisessä dialogissa.",
    },
  },
  {
    id:"L024",title:"Vointifraasit ja nicht",objective:"Valitsen ilmaukset gut, sehr gut ja nicht so gut eri vointitilanteisiin.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"grammar",label:"Tutustu kieltosanaan nicht",instruction:"Lue C05:n kieliopista kielteinen Nicht so gut sekä vahvistava sehr gut. Opettele fraasit kokonaisina ennen rakenteen laajentamista.",chapter:"05",section:"grammar",minutes:10},
      {id:"recognition",label:"Harjoittele kuulumisia",instruction:"Tee harjoitukset C05-EX-02, C05-EX-03 ja C05-EX-04. Pohdi, miten myönteinen ja kielteinen vastaus eroavat.",chapter:"05",section:"practice",minutes:11},
      {id:"transfer",label:"Harjoittele kohtelias vastakysymys",instruction:"Tee harjoitukset C05-EX-06 ja C05-EX-07. Kertaa, miten Und dir? ja Und Ihnen? eroavat toisistaan.",chapter:"05",section:"practice",minutes:5},
    ],evidence:[{kind:"answered-practice",ids:["C05-EX-02","C05-EX-03","C05-EX-04","C05-EX-06","C05-EX-07"],label:"Viisi C05:n vointifraasi- ja puhutteluharjoitusta vastattu."}],check:{
      question:"Mikä ilmaus tarkoittaa Ei kovin hyvää?",
      answers:[{id:"a",text:"Sehr gut."},{id:"b",text:"Nicht so gut."},{id:"c",text:"Guten Tag."}],correctId:"b",
      explanation:"Nicht so gut tarkoittaa ei kovin hyvää. Sehr gut tarkoittaa erittäin hyvää.",
    },
  },
  {
    id:"L025",title:"Vertaa vointidialogeja ja vastaa",objective:"Vertaan tuttavallista ja kohteliasta kuulumiskysymystä kahdessa alkuperäisessä tekstissä.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"friends",label:"Kertaa ystävien keskustelu",instruction:"Lue C05:n Heinrichin ja Karlin dialogi. Kuunteluun suunniteltu erillinen äänite on vielä vahvistamatta; teksti on aidon ihmiskirjoittajan kokonainen dialogi.",chapter:"05",section:"text",minutes:10},
      {id:"compare",label:"Vertaa aiempaan muodolliseen keskusteluun",instruction:"Avaa C04:n herra Schmidtin ja herra Standishin alkuperäinen dialogi ja vertaa Wie geht es Ihnen? sekä Wie geht es dir?. Älä merkitse kuuntelua tehdyksi pelkän tekstin perusteella.",chapter:"04",section:"text",minutes:10},
      {id:"answer",label:"Harjoittele uutta vointitilannetta",instruction:"Tee C05:n harjoituksista C05-EX-01 ja C05-EX-12; vastaa lisäksi ääneen kuvitteellisen ystävän kuulumiskysymykseen. Puhetta ei pisteytetä automaattisesti.",chapter:"05",section:"practice",minutes:6},
    ],evidence:[{kind:"answered-practice",ids:["C05-EX-01","C05-EX-12"],label:"Kaksi C05:n vointitilannetehtävää vastattu."}],check:{
      question:"Mikä vastakysymys sopii tutulle ystävälle?",
      answers:[{id:"a",text:"Und dir?"},{id:"b",text:"Und Ihnen?"},{id:"c",text:"Wie heißen Sie?"}],correctId:"a",
      explanation:"Ystävien kesken Und dir? on tuttavallinen vastakysymys. Virallisessa kohteliaassa tilanteessa käytetään Und Ihnen?.",
    },
  },
  {
    id:"L026",title:"Harjoittele ja testaa C05",objective:"Käytän tavallisia vointifraaseja ja palautan C05:n kappaletestin.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"review",label:"Kertaa kuulumisfraasit muistista",instruction:"Avaa C05:n sanasto ja yritä vastata kysymykseen Wie geht's? ilman suomennosta. Kertaa myös ei kovin hyvää kuvaava ilmaus.",chapter:"05",section:"vocabulary",minutes:8},
      {id:"apply",label:"Kirjoita lyhyt vointikeskustelu",instruction:"Kirjoita C05:n soveltamistehtävään lyhyt kysymys ja vastaus. Mallivastaus avataan vasta oman yrityksen jälkeen, eikä tekstiä pisteytetä koneellisesti.",chapter:"05",section:"apply",minutes:8},
      {id:"test",label:"Palauta kappaletesti",instruction:"Tee C05:n kappaletesti ja palauta vastaukset. Tunti merkitään suoritetuksi vasta tehtävien ja lopputarkistuksen jälkeen.",chapter:"05",section:"test",minutes:10},
    ],evidence:[{kind:"chapter-test",label:"C05:n kappaletesti palautettu."}],check:{
      question:"Mikä on luonteva vastaus kysymykseen Wie geht's?",
      answers:[{id:"a",text:"Woher kommst du?"},{id:"b",text:"Gut, danke."},{id:"c",text:"Wie heißt du?"}],correctId:"b",
      explanation:"Gut, danke. on tavallinen lyhyt vastaus kuulumiskysymykseen. Vastausta voi jatkaa kysymällä Und dir?",
    },
  },
];
