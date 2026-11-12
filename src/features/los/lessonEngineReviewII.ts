import type { LosLessonBlueprint } from "./lessonEngine";

/**
 * L056–L058 are source-INDEPENDENT Review II lessons using already taught
 * forms, original authored checks and an ungraded personal writing attempt.
 * The missing C06/C08/C10 independent primary text gates remain open.
 * Review II lives in reserved draft slot 92 (not chapter C92).
 */
export const LOS1_REVIEW_II_LESSONS:readonly LosLessonBlueprint[]=[
  {
    id:"L056",title:"Luvut, tavaaminen ja viikonpäivät",
    objective:"Palautan muistista ikä- ja lukuilmauksia ja huomaan lukusanojen kirjoitusvirheet.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"recall",label:"Muista lukusanat ilman mallia",
        instruction:"Kirjoita ensin muistista sechzehn, siebzehn, einundzwanzig ja zweiunddreißig. Avaa vasta oman yrityksen jälkeen C06:n sanasto ja tarkista kirjoitusasut.",
        chapter:"06",section:"vocabulary",minutes:9},
      {id:"review",label:"Tarkista viisi numerotehtävää",
        instruction:"Avaa Kertaus II:n L056-osio. Vastaa viiteen ikään ja lukuihin liittyvään kysymykseen ja tarkista ne yksitellen.",
        chapter:null,section:"review",minutes:13},
      {id:"reflect",label:"Arvioi numeromuistiasi",
        instruction:"Merkitse L056-osion oma itsearvio. Väärä vastaus ei estä tunnin suorittamista, mutta kertoo kertaustarpeesta.",
        chapter:null,section:"review",minutes:4},
    ],
    evidence:[
      {kind:"checked-source",ids:["EX-REV2-Q01","EX-REV2-Q02","EX-REV2-Q03","EX-REV2-Q04","EX-REV2-Q05"],
        label:"Viisi L056:n kertaustehtävää tarkistettu."},
      {kind:"answered-practice",ids:["EX-REV2-SELF-056"],label:"Oma muistamisen arvio kirjattu."},
    ],
    check:{
      question:"Miten luku 32 kirjoitetaan saksaksi?",
      answers:[{id:"a",text:"zweiunddreißig"},{id:"b",text:"dreizwei"},{id:"c",text:"dreißigundzwei"}],
      correctId:"a",explanation:"Luku 32 on zweiunddreißig. Saksassa ykköset tulevat ennen kymmeniä.",
    },
  },
  {
    id:"L057",title:"Kaikkien 10 kappaleen taitosekoitus",
    objective:"Kertaan viikonpäivän, kellonajan, tavaamispyynnön ja oppimistilanteen selviytymisfraasin.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"time",label:"Palauta mieleen viikonpäivät ja kellonajat",
        instruction:"Kertaa C09:n sanastosta am Montag ja um drei Uhr sekä C07:n tavaamispyyntö. C08:n uuden päätekstin puuttuminen ei estä näiden erillisten käyttöfraasien harjoittelua.",
        chapter:"09",section:"vocabulary",minutes:9},
      {id:"tasks",label:"Tarkista viisi ajan ja tavaamisen tehtävää",
        instruction:"Avaa Kertaus II ja tee L057-osion viisi alkuperäistä harjoituskysymystä. Vastaa ensin ilman näkyvää sanastoa.",
        chapter:null,section:"review",minutes:13},
      {id:"reflect",label:"Arvioi selviytymisfraaseja",
        instruction:"Kirjaa L057-osion itsearvio. Jos pyysit mallia, valitse sitä vastaava arvio, älä pelkästään oikeiden vastausten prosenttia.",
        chapter:null,section:"review",minutes:4},
    ],
    evidence:[
      {kind:"checked-source",ids:["EX-REV2-Q06","EX-REV2-Q07","EX-REV2-Q08","EX-REV2-Q09","EX-REV2-Q10"],
        label:"Viisi L057:n kertaustehtävää tarkistettu."},
      {kind:"answered-practice",ids:["EX-REV2-SELF-057"],label:"Oma selviytymisfraasien arvio kirjattu."},
    ],
    check:{
      question:"Millä ilmauksella aloitat kellonajan kello kolme?",
      answers:[{id:"a",text:"am drei Uhr"},{id:"b",text:"um drei Uhr"},{id:"c",text:"in drei Uhr"}],
      correctId:"b",explanation:"Um ilmaisee kellonajan, am puolestaan esimerkiksi viikonpäivän: am Montag.",
    },
  },
  {
    id:"L058",title:"Täydellinen esittelyharjoitus ilman vihjeitä",
    objective:"Tuotan 5–7 lauseen kuvitteellisen esittelyn ja arvioin alkeisvuorovaikutustani rehellisesti.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"recall",label:"Kokoa tapaamisen perusfraasit",
        instruction:"Kertaa muistista Hallo, Ich heiße, Ich bin ... Jahre alt, Ich komme aus, Das ist ... ja Bis morgen. Kirjoita sen jälkeen 5–7 lausetta omasta kuvitteellisesta henkilöstä.",
        chapter:"10",section:"grammar",minutes:9},
      {id:"practice",label:"Tarkista viisi yhdistelmäkysymystä",
        instruction:"Avaa Kertaus II:n L058-osio ja tarkista kaikki viisi tilanteisiin liittyvää kysymystä.",
        chapter:null,section:"review",minutes:9},
      {id:"write",label:"Kirjoita kuvitteellinen esittely ja oma arvio",
        instruction:"Kirjoita Kertaus II:n L058-osioon vähintään yksi oma, usean lauseen esittelyyritys ja kirjaa sen jälkeen itsearvio. Tekstiä ei arvioida automaattisesti. Älä kirjoita oikeita yhteystietoja.",
        chapter:null,section:"review",minutes:8},
    ],
    evidence:[
      {kind:"checked-source",ids:["EX-REV2-Q11","EX-REV2-Q12","EX-REV2-Q13","EX-REV2-Q14","EX-REV2-Q15"],
        label:"Viisi L058:n tilanteisiin liittyvää kysymystä tarkistettu."},
      {kind:"answered-practice",ids:["EX-REV2-WRITING-058"],
        label:"Oma kirjoitusyritys tallennettu (ei kieliopin konepisteytystä)."},
      {kind:"answered-practice",ids:["EX-REV2-SELF-058"],label:"Oma esittelyn itsearvio kirjattu."},
    ],
    check:{
      question:"Kumpi lause kertoo, että kuvitteellisen ystäväsi nimi on Mia?",
      answers:[{id:"a",text:"Sie heiße Mia."},{id:"b",text:"Du heißt Mia."},{id:"c",text:"Sie heißt Mia."}],
      correctId:"c",explanation:"Sie heißt Mia. tarkoittaa Hänen nimensä on Mia. Heiße kuuluu ich-muotoon.",
    },
  },
];
