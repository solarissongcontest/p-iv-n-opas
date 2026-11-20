import type { TeacherLesson } from "./engine.ts";

/**
 * L009: first active grammar pairs in C02. More advanced er/sie and full
 * present-tense paradigms remain outside the independent A1.1 check.
 * Four required textbook exercises are shared, not duplicated.
 */
export const LOS1_L009_TEACHER: TeacherLesson = {
  id:"L009",bookId:1,chapterId:"02",version:"2.0.0-preview.1",
  title:"Heißen ja sein minä–sinä",
  objective:"Valitsen oikeat verbimuodot ich heiße, du heißt, ich bin ja du bist ja käytän niitä lyhyessä esittäytymisessä.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["source-compared"],
  requiredPracticeIds:["C02-EX-03","C02-EX-04","C02-EX-05","C02-EX-06"],
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"Sama asia, kaksi verbiä",
      paragraphs:[
        "Osaat nyt kysyä nimen ja kertoa sen. Tänään opit, miksi saksaksi sanotaan Ich heiße Mia, Du heißt Mia, Ich bin Mia ja Du bist Mia.",
        "Käytämme vain minä- ja sinämuotoja. Sinun ei tarvitse vielä osata heißen- tai sein-verbin koko kuuden persoonan taulukkoa.",
        "Opettaja näyttää muodot vaiheittain. Sen jälkeen harjoittelet niitä kirjan oikeissa tehtävissä, tuotat itse muutaman lauseen ja tarkistat osaamisen ilman vihjeitä.",
      ],
    },
    {
      id:"recall",phase:"Muistelu",kind:"question",
      title:"Mikä on tuttu nimikysymys?",
      paragraphs:["Kertaa L007:n asiaa ennen uuden kieliopin aloittamista."],
      question:{
        type:"choice",skillId:"L1-INT-02",
        prompt:"Miten kysyt tutun ihmisen nimeä?",
        options:[{id:"a",label:"Wie heißt du?"},{id:"b",label:"Ich heiße Mia.",wrongFeedback:"Tämä kertoo oman nimen, ei kysy toisen nimeä."},{id:"c",label:"Guten Abend!",wrongFeedback:"Tämä on illan tervehdys."}],
        correctOption:"a",success:"Oikein. Wie heißt du? on nimikysymys.",
        hint:"Kysymys alkaa sanalla Wie.",
        reteach:"Wie heißt du? kysyy nimen; Ich heiße Mia. on vastaus.",
        genericWrong:"Etsi kysymys, jossa käytetään heißen-verbin du-muotoa.",
      },
    },
    {
      id:"heissen",phase:"Opetus",kind:"explanation",
      title:"Heißen: ich heiße, mutta du heißt",
      paragraphs:[
        "Ich tarkoittaa minä ja du sinä. Verbin muoto vaihtuu persoonan mukana: ich heiße, du heißt.",
        "Esimerkiksi Ich heiße Mia. kertoo minun nimeni. Du heißt Mia. kertoo, että sinun nimesi on Mia.",
        "Kysymyksessä Wie heißt du? verbi heißt tulee ennen du-pronominia. Myös siinä käytetään samaa sinämuotoa.",
        "Huomaa kirjoitusasu: heiße sisältää ß-kirjaimen. Du heißt kirjoitetaan ß:n jälkeen t, ei *heißst. Älä sekoita sanaan Tschüss, jossa on kaksi s-kirjainta.",
      ],
      help:[
        {title:"Miksi du heißt eikä du heiße?",body:"Saksassa verbi muuttuu persoonan mukaan. Ich tarvitsee muodon heiße, du muodon heißt. Opettele nämä kaksi yhdessä esimerkin kanssa."},
        {title:"Miksi ei kirjoiteta heisst?",body:"Näissä saksan yleiskielen muodoissa kirjoitetaan ß: heiße ja heißt. Muoto heisst on sveitsinsaksassa tavallinen kirjoitusasu, mutta LOS! 1 harjoittelee tässä Saksan yleiskielen ß-muotoja."},
      ],
    },
    {
      id:"board",phase:"Mallisuoritus",kind:"board",
      title:"Yhdistä pronomini oikeaan verbiin",
      paragraphs:[
        "Katso opettajan malli yksi vaihe kerrallaan. Älä vaihda minä- ja sinämuotoja keskenään.",
        "Esimerkin lopussa näkyvät molemmat verbit. Vertaa niitä, ennen kuin jatkat omaan harjoitukseesi.",
      ],
      board:[
        {label:"1 · Pronomini",german:"ich",meaning:"minä; lauseen alussa Ich"},
        {label:"2 · Heißen minämuoto",german:"ich heiße",meaning:"olen nimeltäni"},
        {label:"3 · Kokonainen lause",german:"Ich heiße Mia.",meaning:"Nimeni on Mia."},
        {label:"4 · Heißen sinämuoto",german:"Du heißt Mia.",meaning:"Sinun nimesi on Mia."},
        {label:"5 · Sein minämuoto",german:"Ich bin Mia.",meaning:"Minä olen Mia."},
        {label:"6 · Sein sinämuoto",german:"Du bist Mia.",meaning:"Sinä olet Mia."},
        {label:"7 · Nimikysymys",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on?"},
      ],
    },
    {
      id:"guided",phase:"Ohjattu harjoitus",kind:"question",
      title:"Valitse oikea heißen-muoto",
      paragraphs:["Ajattele ensin, onko lauseen tekijä ich vai du. Vastaa sitten."],
      question:{
        type:"choice",skillId:"L1-GRA-01",
        prompt:"Miten täydennät lauseen: Du ___ Max. (heißen)?",
        options:[{id:"a",label:"heiße",wrongFeedback:"Heiße kuuluu ich-pronominille. Nyt tarvitset du-muodon."},{id:"b",label:"heißt"},{id:"c",label:"bin",wrongFeedback:"Bin kuuluu sein-verbin minämuotoon, ei heißen-verbin sinämuotoon."}],
        correctOption:"b",success:"Oikein. Du heißt Max.",
        hint:"Du-muoto on heißt. Siinä on ß ja lopussa t.",
        reteach:"Ich heiße Max. ja Du heißt Max. käyttävät eri persoonamuotoja.",
        genericWrong:"Etsi heißen-verbin du-muoto, jonka lopussa on t.",
      },
    },
    {
      id:"sein",phase:"Opetus",kind:"explanation",
      title:"Sein: ich bin, mutta du bist",
      paragraphs:[
        "Sein tarkoittaa olla. Sen kaksi tärkeää alkeismuotoa ovat ich bin ja du bist.",
        "Ich bin Greta. tarkoittaa Minä olen Greta. Du bist Max. tarkoittaa Sinä olet Max.",
        "Älä kirjoita *ich bist tai *du bin. Sein on epäsäännöllinen verbi, joten näitä muotoja ei voi päätellä vain yhden päätteen perusteella.",
        "Ich heiße Greta. ja Ich bin Greta. ovat molemmat oikeita nimiesittelyjä. Täsmätehtävässä kuitenkin noudatetaan annettua verbiä: heißen vaatii heiße/heißt ja sein bin/bist.",
      ],
      help:[{title:"Miksi bin ja bist ovat niin erilaisia?",body:"Sein on epäsäännöllinen. Tässä vaiheessa muistat kaksi muotoa valmiina: ich bin = minä olen, du bist = sinä olet. Muita persoonia opetellaan myöhemmin."}],
    },
    {
      id:"book",phase:"Oppikirjan tehtävät",kind:"book",
      title:"Tee neljä oikeaa C02:n verbiharjoitusta",
      paragraphs:[
        "Avaa C02:n Kielioppi ja Harjoittele. Kertaa ensin kaksi muotoparia ja tee tehtävät C02-EX-03, C02-EX-04, C02-EX-05 ja C02-EX-06.",
        "Nämä neljä tehtävää täydennetään kirjan omiin kenttiin. Jos tarvitset mallia, palaa kielioppitaulukkoon ennen uutta yritystä.",
        "Opettaja näkee, onko harjoitusvastaus kirjoitettu. Pelkkä tallennettu teksti ei vielä todista, että vastaus olisi oikein tai että osaisit sen myöhemmin muistista.",
      ],
      bookLinks:[
        {label:"C02 · Kielioppi",chapterId:"02",section:"grammar",instruction:"Vertaa ich heiße / du heißt sekä ich bin / du bist."},
        {label:"C02 · Harjoittele",chapterId:"02",section:"practice",instruction:"Vastaa olemassa oleviin C02-EX-03–C02-EX-06-tehtäviin."},
      ],
    },
    {
      id:"independent",phase:"Itsenäinen tuottaminen",kind:"question",
      title:"Täydennä itse sinämuoto",
      paragraphs:["Sulje mallitaulukko ja kirjoita vain puuttuva sana. Tässä pyydetään heißen-verbiä."],
      question:{
        type:"text",skillId:"L1-GRA-01",evidenceRole:"independent",
        prompt:"Täydennä: Du ___ Mia. (heißen)",
        accepted:["heißt"],success:"Oikein. Du heißt Mia.",
        hint:"Muoto alkaa heiß- ja loppuu t-kirjaimeen.",
        reteach:"Heißen taipuu näin: ich heiße, du heißt. Du-sanan jälkeen tässä on heißt.",
        genericWrong:"Tarkista, että käytät heißen-verbin du-muotoa.",
        wrongAnswers:{"heiße":"Heiße kuuluu ich-pronominille. Du tarvitsee heißt.","bist":"Bist kuuluu sein-verbiin. Tässä pyydettiin heißen-verbiä."},
      },
    },
    {
      id:"source",phase:"Tekstin soveltaminen",kind:"book",
      title:"Vertaa muotoja Franzin ja Gretan alkuperäistekstissä",
      paragraphs:[
        "Palaa C02:n kuuteen alkuperäiseen repliikkiin. Franz sanoo ich bin Franz ja Greta sanoo Ich heiße Greta. Molemmat ovat oikeita nimen kertomisen tapoja.",
        "Näytä itsellesi ero: toisessa käytetään sein-verbiä ja toisessa heißen-verbiä. Sinun ei tarvitse analysoida muita tekstiin kuuluvia mutta vasta myöhemmin opetettavia rakenteita.",
        "Vahvista tehneesi vertailun. Tämä on lukemisen harjoittelumerkintä, ei arvio erillisen kuullun ymmärtämisen taidosta.",
      ],
      bookLinks:[{label:"C02 · Teksti A, Franz ja Greta",chapterId:"02",section:"text",instruction:"Etsi Franzin Ich bin ja Gretan Ich heiße."}],
      activityId:"source-compared",activityLabel:"Vertasin kahta nimiesittelyä alkuperäistekstissä",
    },
    {
      id:"application",phase:"Soveltaminen",kind:"question",
      title:"Kirjoita sein-verbin minämuoto",
      paragraphs:["Kuvittele esittäytyväsi uudelle tuttavalle. Käytä tässä tehtävässä sein-verbiä ja kuvitteellista nimeä Mia."],
      question:{
        type:"text",skillId:"L1-GRA-01",evidenceRole:"application",
        prompt:"Kirjoita saksaksi sein-verbillä: Minä olen Mia.",
        accepted:["Ich bin Mia."],success:"Oikein. Ich bin Mia.",
        hint:"Sein-verbin ich-muoto on bin.",
        reteach:"Ich bin Mia. on oikein. Myös Ich heiße Mia. voi kertoa nimen, mutta tässä pyydettiin sein-verbiä.",
        genericWrong:"Tarkista pronomini Ich ja verbi bin.",
        wrongAnswers:{"ich heiße mia":"Ich heiße Mia. on oikein toisena nimiesittelynä, mutta tässä pyydettiin sein-verbiä.","ich bist mia":"Bist kuuluu du-pronominille. Ich tarvitsee bin."},
      },
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Valitse ilman apua oikea muotopari",
      paragraphs:["Kokeile ensin ilman taulukkoa. Tämän jälkeen näet, mitkä harjoitukset olet tehnyt ja mitä pitää kerrata."],
      question:{
        type:"choice",skillId:"L1-GRA-01",evidenceRole:"exit",
        prompt:"Mikä pari on oikein (sein): Ich ___ Mia. Du ___ Max.?",
        options:[
          {id:"a",label:"bist / bin",wrongFeedback:"Muodot ovat väärässä järjestyksessä. Ich tarvitsee bin."},
          {id:"b",label:"bin / bist"},
          {id:"c",label:"bin / ist",wrongFeedback:"Ist liittyy hän-muotoon, ei tähän du-lauseeseen."},
        ],
        correctOption:"b",success:"Oikein. Ich bin Mia. Du bist Max.",
        hint:"Sinämuoto päättyy -st: bist.",
        reteach:"Sein: ich bin, du bist. Opettele tämä pari yhdessä. Muita persoonia ei vielä vaadita.",
        genericWrong:"Tarkista molemmat persoonamuodot: ich ja du.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Osaat nyt kaksi minä–sinämuotoparia",
      paragraphs:[
        "Kertaa nämä neljä muotoa: ich heiße, du heißt, ich bin, du bist. Näistä voit jo muodostaa yksinkertaisen nimilauseen.",
        "Harjoitustunnin läpikäynti ei ole sama asia kuin itsenäinen tai myöhemmin vahvistettu osaaminen. Oikea vastaus vihjeellä on edelleen harjoittelua.",
        "Seuraavalla tunnilla L010 vertaamme lyhyitä esittelykeskusteluja ja harjoittelemme henkilöiden nimien tunnistamista.",
      ],
    },
  ],
};
