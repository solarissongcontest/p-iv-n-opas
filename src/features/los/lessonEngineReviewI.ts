import type { LosLessonBlueprint } from "./lessonEngine";

/** Revision I, L027-L030. The three review lessons use review questions
 * in the reserved exam draft 91; L030 uses the actual EX-MID submission.
 * No invented chapter C91 or shadow answers in C01-C05.
 */
export const LOS1_REVIEW_I_LESSONS:readonly LosLessonBlueprint[]=[
  {
    id:"L027",title:"Muistanko tervehtimisen ja esittäytymisen?",
    objective:"Kertaan C01–C02:n tervehdykset, esittäytymisen ja kaksi tavallista verbimuotoa.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"recall",label:"Muista tervehdykset ja nimet",instruction:"Kertaa muistista Guten Morgen, Tschüss, Ich heiße ja Wie heißt du? Käytä vasta oman yrityksen jälkeen kappaleiden 1 ja 2 sanastoja.",chapter:"01",section:"vocabulary",minutes:9},
      {id:"review",label:"Tee viisi sekoitettua kertaustehtävää",instruction:"Avaa Kertaus I ja tarkista L027-osion viisi kysymystä. Tarkistukset tallentuvat kertaus- ja koetietoihin erilleen varsinaisesta välikokeesta.",chapter:null,section:"review",minutes:13},
      {id:"reflect",label:"Arvioi muistamistasi",instruction:"Merkitse L027-osioon, osasitko pääosin ilman mallia, osittain vai tarvitsetko lisäharjoittelua. Kertauksen onnistuminen ei vaadi täysiä pisteitä.",chapter:null,section:"review",minutes:4},
    ],
    evidence:[
      {kind:"checked-source",ids:["EX-REV1-Q01","EX-REV1-Q02","EX-REV1-Q03","EX-REV1-Q04","EX-REV1-Q05"],label:"Viisi alkuvaiheen taitoja yhdistelevää kertaustehtävää tarkistettu."},
      {kind:"answered-practice",ids:["EX-REV1-SELF-027"],label:"Oma muistamisen itsearvio kirjattu."},
    ],
    check:{
      question:"Miten sanot saksaksi Minä olen Leo?",
      answers:[{id:"a",text:"Ich bin Leo."},{id:"b",text:"Du bist Leo."},{id:"c",text:"Ich bist Leo."}],correctId:"a",
      explanation:"Ich bin Leo kertoo oman kuvitteellisen nimen. Voit myös sanoa Ich heiße Leo.",
    },
  },
  {
    id:"L028",title:"Voinnin ja kohteliaisuuden taitosekoitus",
    objective:"Erotan du- ja Sie-puhuttelun kuulumisissa ja nimikysymyksissä.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"read",label:"Palaa kohteliaaseen vointifraasiin",instruction:"Avaa C04:n Herr Schmidt–Herr Standish -keskustelu ja etsi fraasi Wie geht es Ihnen? Vertaa siihen C05:n tuttavallista Wie geht es dir? -kysymystä.",chapter:"04",section:"text",minutes:10},
      {id:"tasks",label:"Tarkista viisi taitosekoituskysymystä",instruction:"Avaa Kertaus I ja vastaa L028-osion viiteen kysymykseen. Tarkista kaikki vastaukset erikseen ja kertaa mahdolliset erehdykset.",chapter:null,section:"review",minutes:12},
      {id:"reflect",label:"Arvioi kohteliaisuuden muistamista",instruction:"Kirjaa oma muistamisen itsearvio L028-osioon. Jos käytät Sie-puhuttelua aina, se ei ole automaattisesti oikea valinta ystävän kanssa.",chapter:null,section:"review",minutes:4},
    ],
    evidence:[
      {kind:"checked-source",ids:["EX-REV1-Q06","EX-REV1-Q07","EX-REV1-Q08","EX-REV1-Q09","EX-REV1-Q10"],label:"Viisi du/Sie- ja vointikysymystä tarkistettu."},
      {kind:"answered-practice",ids:["EX-REV1-SELF-028"],label:"Oma kohteliaisuuden itsearvio kirjattu."},
    ],
    check:{
      question:"Miten kysyt kohteliaasti vointia?",
      answers:[{id:"a",text:"Wie heißt du?"},{id:"b",text:"Wie geht es Ihnen?"},{id:"c",text:"Woher kommst du?"}],correctId:"b",
      explanation:"Wie geht es Ihnen? on kohtelias kuulumiskysymys.",
    },
  },
  {
    id:"L029",title:"Autenttisen keskustelun kertaus (kuuntelu valinnainen)",
    objective:"Ymmärrän aiemman autenttisen Franz–Jörg-dialogin ja muistan keskeiset tiedot.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"text",label:"Avaa koko alkuperäinen kahdeksanrepliikkinen keskustelu",instruction:"Lue C01:n Franzin ja Jörgin kaikki kahdeksan puheenvuoroa. Kuuntele sama alkuperäinen äänite, jos se toimii; toimivuutta ei ole todennettu kaikilla laitteilla eikä kuuntelua merkitä automaattisesti.",chapter:"01",section:"text",minutes:10},
      {id:"questions",label:"Tarkista viisi alkuperäiskeskustelun kysymystä",instruction:"Vastaa Kertaus I:n L029-osiossa viiteen puhujiin, ikään ja hyvästelyyn liittyvään kysymykseen. Harjoittelu onnistuu myös kokonaisen tekstiversion avulla.",chapter:null,section:"review",minutes:12},
      {id:"reflect",label:"Arvioi tekstin ymmärtämistä",instruction:"Merkitse oma muistamisen itsearvio L029-osioon. Jos ääni ei toiminut, arvioi vain lukemisen ymmärtämistä. Älä väitä kuullunymmärtämistä testatuksi.",chapter:null,section:"review",minutes:4},
    ],
    evidence:[
      {kind:"checked-source",ids:["EX-REV1-Q11","EX-REV1-Q12","EX-REV1-Q13","EX-REV1-Q14","EX-REV1-Q15"],label:"Viisi alkuperäiseen keskusteluun liittyvää kertaustehtävää tarkistettu."},
      {kind:"answered-practice",ids:["EX-REV1-SELF-029"],label:"Oma tekstinymmärtämisen itsearvio kirjattu."},
    ],
    check:{
      question:"Minkä ikäinen Franz on kahdeksan puheenvuoron alkuperäiskeskustelussa?",
      answers:[{id:"a",text:"18-vuotias"},{id:"b",text:"20-vuotias"},{id:"c",text:"19-vuotias"}],correctId:"c",
      explanation:"Franz sanoo Ich bin neunzehn Jahre alt. Tämä kertaus perustuu koko alkuperäiseen C01-tekstiin.",
    },
  },
  {
    id:"L030",title:"Välikoe: kappaleet 1–5",
    objective:"Teen 25 pisteytettävän osatehtävän välikokeen ja arvioin omaa viestintääni.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"instructions",label:"Tutustu välikokeen sääntöihin",instruction:"Avaa LOS! 1:n välikoe EX-MID. Siinä on täsmälleen 25 monivalintatehtävää viidestä taitoalueesta. Oikeat ratkaisut näkyvät vasta palautuksen jälkeen.",chapter:null,section:"midterm",minutes:4},
      {id:"submit",label:"Vastaa kaikkiin 25 tehtävään ja palauta",instruction:"Täytä koko välikoe ilman sanakirjaa tai valmiita mallivastauksia. Palauta kokeesi ja tutki vasta sen jälkeen osa-aluekohtaiset pisteet ja perustelut.",chapter:null,section:"midterm",minutes:18},
      {id:"dialogue",label:"Tee 4–6 repliikin itsearvioitu dialogi",instruction:"Tee välikokeen erillinen lyhyt keskustelu ääneen tai kirjoittaen ja arvioi se tarkistuslistalla. Puhetta ei pisteytetä koneellisesti, eikä sillä kasvateta 25 pisteen tulosta.",chapter:null,section:"midterm",minutes:4},
    ],
    evidence:[{kind:"chapter-test",label:"Erillinen EX-MID-välikoe on palautettu."}],
    check:{
      question:"Miten välikokeen itsearvioitu keskustelu vaikuttaa automaattiseen 25 pisteen tulokseen?",
      answers:[{id:"a",text:"Se lisää viisi pistettä."},{id:"b",text:"Sitä ei pisteytetä automaattisesti."},{id:"c",text:"Se korvaa monivalintatehtävät."}],correctId:"b",
      explanation:"Välikokeessa on 25 objektiivisesti pisteytettävää osatehtävää. Puhe ja vapaa kirjoitus arvioidaan erillisen tarkistuslistan avulla.",
    },
  },
];
