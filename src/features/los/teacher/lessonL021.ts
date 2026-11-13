import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";

/**
 * C04 L021 uses the existing chapter test exactly as LosWorkbook renders it.
 * Never duplicate test answers, scoring or historical attempts in Teacher.
 */
const C04_TEST_IDS = losExercisesFor("04").map(item => item.id);

export const LOS1_L021_TEACHER: TeacherLesson = {
  id:"L021",bookId:1,chapterId:"04",version:"2.0.0-preview.1",
  title:"Harjoittele ja testaa C04",
  objective:"Kertaan du/Sie-eron, teen itsenäiset tarkistukset ja palautan kirjan nykyisen C04-kappaletestin sekä itsearvioinnin.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["review-done"],
  requiredPracticeIds:[],
  chapterAssessment:{
    requiredTestIds:C04_TEST_IDS,
    requireApplicationDraft:true,
    minSelfAssessmentLength:15,
  },
  scenes:[
    {id:"welcome",phase:"Aloitus",kind:"introduction",title:"C04:n opitut taidot yhdistyvät",
      paragraphs:[
        "Olet harjoitellut puhujien suhteen mukaan valittavaa du/Sie-puhuttelua, kohteliaan verbinmuodon, C04:n kahdeksan repliikin Text A:n ja aidon tervehdysluettelon Text B:n.",
        "Nyt kertaamme tärkeimmät erot opettajan kanssa. Teet myös uuden itsenäisen lopputarkistuksen ja palautat C04:n nykyisen kappaletestin kirjassa. Koko testi pisteytetään vain alkuperäisellä tehtävämoottorilla.",
        "Älä kirjoita oikeita henkilötietoja omaan soveltavaan keskusteluun. Kuvitteelliset nimet riittävät. Vapaa kirjoittaminen ja puhe arvioidaan omalla tarkistuslistalla, ei automaattisella kielitaitoprosentilla."
      ]},
    {id:"recall",phase:"Muistelu",kind:"question",title:"Muistatko puhuttelutavan?",
      paragraphs:["Aloita C04:n ydinasialla: kuka on vastaanottaja?" ],
      question:{type:"choice",skillId:"L1-INT-04",prompt:"Kysyt virallisessa tapaamisessa vieraan nimeä. Mikä kysymys sopii?",
        options:[{id:"a",label:"Wie heißt du?",wrongFeedback:"Tämä on tavallinen sinuttelukysymys tutulle."},{id:"b",label:"Wie heißen Sie?"},{id:"c",label:"Ich heiße Mia.",wrongFeedback:"Tämä esittelee puhujan, eikä kysy vieraan nimeä."}],
        correctOption:"b",success:"Oikein. Virallisessa tapaamisessa Wie heißen Sie? on kohtelias nimikysymys.",
        hint:"Kohtelias Sie tarvitsee heißen-muodon.",
        reteach:"Tutulle Wie heißt du? ja kohteliaasti Wie heißen Sie?.",
        genericWrong:"Valitse puhujan suhteeseen sopiva kysymys, ei esittely."}},
    {id:"rule",phase:"Kertaava opettajan selitys",kind:"explanation",title:"Miten tunnistat ja tarkistat muodon?",
      paragraphs:[
        "Tunnista ensin puhujien suhde. Tuttu ystävä käyttää yleensä du-muotoa. Virallisessa ensikohtaamisessa Sie on usein luonteva valinta. Yhteisestä sopimuksesta voidaan myös sinutella.",
        "Seuraavaksi valitse verbimuoto: du heißt, Sie heißen, du kommst, Sie kommen. Kohteliasta Sie-pronominia seuraa tässä -en-muotoinen verbi. Älä kirjoita Wie heißt Sie? tai Woher kommst Sie?, sillä niissä pronomini ja verbi eivät vastaa toisiaan.",
        "Text A:n Wie geht es Ihnen? on kohtelias vointifraasi. Opit sen kokonaisena, vaikka Ihnen-sanan sijamuotoa ei vielä opeteta. Text B:n Guten Tag! on päivätervehdys, Tschüss! arkinen hyvästely ja Auf Wiedersehen! kohteliaampi hyvästely.",
        "Opettajan malliratkaisu: tuntematon asiakas kysyy nimeä. Tilanne on muodollinen, joten valitsen Sie. Verbi heißen saa Sie-muodon heißen. Näin syntyy Wie heißen Sie?.",
        "Lopuksi tarkista sekä merkitys että kirjoitusasu. Koko kirjan kappaletesti tarkistaa useita rajattuja asioita, mutta pelkkä oikea testivastaus ei todista automaattisesti ääntämisen tai vapaan keskustelun hallintaa."
      ],help:[
        {title:"Miksi du heißt ja Sie heißen?",body:"Pronomini määrää verbinmuodon. Du on sinä ja tarvitsee heißt. Kohtelias Sie tarvitsee heißen. Samoin du kommst ja Sie kommen."},
        {title:"Mitä jos kohtaaminen muuttuu?",body:"Jos vieraat sopivat sinuttelusta, voi vaihtaa du-muotoon. Sen jälkeen myös verbi vaihtuu: Wie heißt du?"},
        {title:"Miten testi ja osaaminen eroavat?",body:"Kirja pisteyttää rajatut C04:n tehtävät. Opettajan itsenäinen näyttö syntyy vain ensimmäisestä ilman apua oikein ratkaistusta loppukysymyksestä. Kirjoitusta ei pisteytetä automaattisesti."}
      ]},
    {id:"board",phase:"Opetettu malliesimerkki",kind:"board",title:"Neljä perusmuotoa rinnakkain",
      paragraphs:["Seuraa, miten puhuttelun valinta siirtyy koko kysymykseen ja lopulta tervehdykseen."],
      board:[
        {label:"1 · Tuttava, nimi",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on? Du + heißt."},
        {label:"2 · Kohtelias, nimi",german:"Wie heißen Sie?",meaning:"Mikä teidän nimenne on? Sie + heißen."},
        {label:"3 · Tuttava, lähtömaa",german:"Woher kommst du?",meaning:"Mistä olet kotoisin? Du + kommst."},
        {label:"4 · Kohtelias, lähtömaa",german:"Woher kommen Sie?",meaning:"Mistä olette kotoisin? Sie + kommen."},
        {label:"5 · Kohtelias vointi",german:"Wie geht es Ihnen?",meaning:"Mitä teille kuuluu? C04 Text A:n kokonainen fraasi."},
        {label:"6 · Tapaaminen päättyy",german:"Auf Wiedersehen!",meaning:"Kohtelias hyvästely."}
      ]},
    {id:"guided",phase:"Ohjattu harjoittelu",kind:"question",title:"Tarkista korjattava muoto",
      paragraphs:["Kokeile vielä opettajan mallia vasten yhtä tavallista virhettä."],
      question:{type:"choice",skillId:"L1-INT-04",prompt:"Mikä korjaa lauseen Woher kommst Sie?",
        options:[{id:"a",label:"Woher kommen Sie?"},{id:"b",label:"Woher kommst du Sie?",wrongFeedback:"Kysymykseen ei tarvita sekä du että Sie. Valitse yksi puhuttelu ja sen verbimuoto."},{id:"c",label:"Woher kommt Sie?",wrongFeedback:"Kommt ei ole kohteliaan Sie-puhuttelun oikea muoto."}],
        correctOption:"a",success:"Oikein. Sie tarvitsee kommen-muodon.",
        hint:"Kohtelias Sie + kommen.",reteach:"Du kommst mutta Sie kommen. Kysy Woher kommen Sie?",
        genericWrong:"Älä yhdistä du-muotoa ja kohteliasta Sie-pronominia."}},
    {id:"review",phase:"Kirjan kertaus",kind:"book",title:"Palaa tarvittaessa oikeaan oppimateriaaliin",
      paragraphs:[
        "Avaa C04:n Kielioppi, Text A ja Text B vain niiltä osin, joita tarvitset. Palaa sitten tähän itsenäisiin tarkistuksiin.",
        "Kappaleen alkuperäiset tekstit ja kaikki kulttuurikuvat pysyvät oppikirjassa. Älä korvaa vanhoja vastauksia uusilla pelkän opetuspolun vuoksi.",
        "Vahvista lukeminen vasta, kun olet oikeasti kerrannut heikon kohdan. Se on oma opiskelumerkintä, ei todistus virheettömästä osaamisesta."
      ],bookLinks:[
        {label:"C04 · Kielioppi",chapterId:"04",section:"grammar",instruction:"Kertaa du / Sie sekä heißen ja kommen."},
        {label:"C04 · Text A",chapterId:"04",section:"text",instruction:"Palaa Herr Schmidtin ja Herr Standishin kokonaiseen dialogiin."},
        {label:"C04 · Text B",chapterId:"04",section:"text-b",instruction:"Kertaa kohteliaat ja arkiset tervehdykset."}
      ],activityId:"review-done",activityLabel:"Kertasin tarvittavat C04:n sisällöt"},
    {id:"independent",phase:"Itsenäinen tarkistus",kind:"question",title:"Kirjoita kohtelias nimikysymys",
      paragraphs:["Peitä mallit. Kirjoita kokonainen saksankielinen kysymys."],
      question:{type:"text",skillId:"L1-INT-04",evidenceRole:"independent",prompt:"Miten kysyt kohteliaasti: Mikä teidän nimenne on?",
        accepted:["Wie heißen Sie?"],success:"Oikein. Wie heißen Sie? on kohtelias nimikysymys.",
        hint:"Wie + heißen + Sie.",reteach:"Sie heißen. Kysymyksessä Wie heißen Sie?",
        genericWrong:"Tarkista Wie, -en-muotoinen heißen ja kohtelias Sie.",
        wrongAnswers:{"wie heißt sie":"Heißt kuuluu du-muotoon, joten kysymys ei vastaa Sie-puhuttelua.","wie heiße sie":"Heiße on ich-muoto. Sie tarvitsee heißen."}}},
    {id:"application",phase:"Soveltaminen",kind:"question",title:"Puhuttelu vaihtuu keskustelussa",
      paragraphs:["Uusi työkaveri ehdottaa sinuttelua. Kerro hänen lähtömaastaan kysymällä nyt tuttavallisesti."],
      question:{type:"text",skillId:"L1-INT-04",evidenceRole:"application",prompt:"Kirjoita sinutellen: Mistä olet kotoisin?",
        accepted:["Woher kommst du?"],success:"Oikein. Woher kommst du? käyttää juuri sovittua puhuttelua.",
        hint:"Woher + kommst + du.",reteach:"Sie kommen → Woher kommen Sie?; du kommst → Woher kommst du?",
        genericWrong:"Tarkista, että pronomini on du ja verbi kommst.",
        wrongAnswers:{"woher kommen du":"Kommen kuuluu Sie-muotoon, ei du-pronominin yhteyteen."}}},
    {id:"test",phase:"Oikea kappaletesti",kind:"book",title:"Palauta C04:n nykyinen testi ja oma sovellus",
      paragraphs:[
        "Avaa C04:n Kappaletesti ja tee kaikki nykyiset osatehtävät ilman harjoitusvihjeitä. Tämän kirjan testit käyttävät samoja C04-EX-tunnisteita, mutta testAnswers on erillinen harjoitusten practiceAnswers-kentästä.",
        "Paina kirjan Palauta testi -painiketta vasta kaikkien osatehtävien jälkeen. Vastaukset eivät näy ennen palautusta. Teacher Player katsoo vain palautustiedon ja täytetyt tunnisteet, eikä luo toista testiä.",
        "Avaa myös C04:n Käytä saksaa. Kirjoita kuvitteellisilla nimillä kaksi lyhyttä kohtaamista: tuttu ja virallinen. Tästä kirjoituksesta annetaan itsearviointi, ei konepisteitä.",
        "Palauttamisen jälkeen kirjoita kirjan itsearviointiin vähintään yksi konkreettinen havainto omasta osaamisestasi ja seuraava harjoittelutavoite. Uusintakerralla kirjan nykyinen arkistointi säilyttää vanhat yritykset."
      ],
      bookLinks:[
        {label:"C04 · Kappaletesti",chapterId:"04",section:"test",instruction:"Vastaa kaikkiin osatehtäviin ja palauta nykyinen testi."},
        {label:"C04 · Käytä saksaa",chapterId:"04",section:"apply",instruction:"Kirjoita tuttavallinen ja kohtelias kohtaaminen kuvitteellisilla nimillä."}
      ]},
    {id:"exit",phase:"Lopputarkistus",kind:"question",title:"Viimeinen uusi tilanne",
      paragraphs:["Vastaa ilman mallia. Tämä on eri tilanne kuin kirjan muistamisharjoitukset."],
      question:{type:"choice",skillId:"L1-INT-04",evidenceRole:"exit",prompt:"Kysyt tuttavan nimeä ja hyvästelet hänet rennosti. Mikä pari sopii?",
        options:[{id:"a",label:"Wie heißen Sie? / Auf Wiedersehen!",wrongFeedback:"Tämä pari on kohtelias, mutta tilanteessa puhutaan läheisestä tutusta."},{id:"b",label:"Wie heißt du? / Tschüss!"},{id:"c",label:"Wie heißt Sie? / Guten Tag!",wrongFeedback:"Heißt ei sovi Sie-pronominiin, ja Guten Tag! on tervehdys eikä hyvästely."}],
        correctOption:"b",success:"Oikein. Du-muoto ja arkinen Tschüss! sopivat yhteen.",
        hint:"Tuttu: du; rento hyvästely: Tschüss!.",
        reteach:"Du + heißt, Sie + heißen. Tschüss! on arkinen hyvästely; Auf Wiedersehen! kohteliaampi.",
        genericWrong:"Erota puhuttelun suhde ja se, onko kyse alkutervehdyksestä vai hyvästelystä."}},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"C04:n harjoittelu ja testi ovat eri näyttöjä",
      paragraphs:[
        "Kertasit C04:n ydinsäännöt, vastasit itsenäisiin kysymyksiin ja käytit kirjan alkuperäistä kappaletestiä. Opetustila lukee vanhasta testitallennuksesta oikean palautushetken.",
        "Kirjan testipisteet ja omat kirjoitushavainnot ovat eri asioita. Myös vihjeellä korjattu oppituntikysymys lasketaan harjoitteluksi, ei jälkikäteen itsenäiseksi onnistumiseksi.",
        "Tuntimerkintä tarkoittaa läpikäytyä opetusta, ei pysyvän kielitaidon todistusta. Seuraavaksi C05:ssa harjoitellaan kuulumisia."
      ]}
  ]
};
