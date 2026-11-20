import type { TeacherLesson } from "./engine.ts";

/**
 * C04 L019: finite verb agreement with du / polite Sie.
 * Four real workbook tasks C04-EX-05..08; no new exercise answer store.
 */
export const LOS1_L019_TEACHER: TeacherLesson = {
  id:"L019",bookId:1,chapterId:"04",version:"2.0.0-preview.1",
  title:"Kohtelias verbinmuoto",
  objective:"Muodostan Wie heißt du? / Wie heißen Sie? ja Woher kommst du? / Woher kommen Sie? sekä korjaan tavallisia muotovirheitä.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","correct-name","correct-origin","independent","application","exit"],
  requiredActivityIds:[],
  requiredPracticeIds:["C04-EX-05","C04-EX-06","C04-EX-07","C04-EX-08"],
  scenes:[
    {id:"welcome",phase:"Aloitus",kind:"introduction",title:"Puhuttelu muuttaa myös verbiä",
      paragraphs:[
        "L017:ssa valitsit, puhutko tutulle du vai kohteliaasti Sie. Nyt opit, miksi saksaksi ei riitä pronominin vaihtaminen. Myös verbinmuoto vaihtuu.",
        "Opettelemme kaksi jo aiemmista kappaleista tuttua verbiä: heißen (olla nimeltään) ja kommen (tulla, olla kotoisin). Näin uusi asia ei huku laajaan sanastoon.",
        "Tunnin neljä oppikirjaharjoitusta ovat C04-EX-05–08. Opettaja selittää säännön ja korjaa virheitä täällä, mutta harjoitusvastaukset säilyvät kirjassa."
      ]},
    {id:"recall",phase:"Esitiedot",kind:"question",title:"Muistatko sinämuodon?",
      paragraphs:["Palauta mieleen aiempi C02:n nimikysymys."],
      question:{type:"choice",skillId:"L1-GRA-01",prompt:"Täydennä tuttu kysymys: Wie ___ du?",
        options:[{id:"a",label:"heißen",wrongFeedback:"Heißen liittyy kohteliaaseen Sie-muotoon, ei du-pronominiin."},{id:"b",label:"heißt"},{id:"c",label:"heiße",wrongFeedback:"Heiße on ich-persoonan muoto."}],
        correctOption:"b",success:"Oikein: Wie heißt du? tarkoittaa Mikä nimesi on?",
        hint:"Du tarvitsee muodossa heißen päätteen, joka kuuluu muotoon heißt.",
        reteach:"ich heiße, du heißt, Sie heißen. Kolme puhuteltavaa muotoa ovat erillisiä.",
        genericWrong:"Tunnista ensin du ja etsi sille kuuluva verbimuoto."}},
    {id:"rule",phase:"Opettajan selitys",kind:"explanation",title:"Sie + monikon kaltainen -en-muoto",
      paragraphs:[
        "Saksan preesensissä verbi taipuu sen mukaan, kuka tekee tai kenestä kysytään. Tuttavallinen du käyttää näissä verbeissä muotoja heißt ja kommst. Kohteliaan Sie-pronominin kanssa käytetään heißen ja kommen, jotka ovat verbien perusmuotojen näköisiä.",
        "Heiß-en sisältää vartalon heiß- ja päätteen -en. Kohteliaan Sie-puhuttelun kanssa sanot Sie heißen. Kun kysymyssana wie tulee alkuun, sanajärjestys on Wie heißen Sie?",
        "Kommen-verbin vartalo on komm-. Du kommst, mutta Sie kommen. Lähtömaan kysymyksessä käytetään Woher kommst du? tai Woher kommen Sie?.",
        "Sanan Sie iso alkukirjain erottaa kohteliaan puhuttelun pienellä kirjoitetusta sie-sanasta. Tämä on kirjoitussääntö, ei lupa päätellä verbin muotoa pelkästä kirjaimen koosta muissa yhteyksissä.",
        "Tärkeä ero: Wie geht es Ihnen? on valmis kohtelias vointifraasi, mutta tässä ei vielä opetella Ihnen-sanan sijamuotoa. Harjoiteltavat uudet verbimuodot ovat heißen ja kommen."
      ],
      help:[
        {title:"Miksi Sie heißen eikä Sie heißt?",body:"Du tarvitsee yksikön sinämuodon heißt. Kohtelias Sie tarvitsee muodon heißen. Se muistuttaa perusmuotoa ja kirjoitetaan tässä -en-päätteisenä."},
        {title:"Miksi du kommst eikä du kommen?",body:"Du-muodossa kommen-verbin vartaloon komm- lisätään -st. Siis du kommst. Sie-muoto on kommen."},
        {title:"Mitä jos nimi kysytään?",body:"Kysy tutulta Wie heißt du? ja kohteliaasti Wie heißen Sie? Näiden molempien merkitys liittyy nimeen."}
      ]},
    {id:"board",phase:"Vaiheittainen taivutustaulu",kind:"board",title:"Rakenna muodot rinnakkain",
      paragraphs:[
        "Opettaja aloittaa pronominista, lisää siihen oikean verbimuodon ja vasta lopuksi rakentaa kysymyksen. Näytä vaiheet yksi kerrallaan.",
        "Vertaile myös, miten kaksi eri verbiä taipuu samalla puhuttelutavalla. Sie ei tarkoita, että kaikissa lauseissa verbi olisi aina samalla sanapaikalla; kysymyssana muuttaa rakenteen."
      ],
      board:[
        {label:"1 · Tekijä du",german:"du",meaning:"Yksi tuttu ihminen, sinä."},
        {label:"2 · Verbi heißen, du",german:"du heißt",meaning:"Du + heißt, ei heißen."},
        {label:"3 · Nimikysymys, du",german:"Wie heißt du?",meaning:"Wie + heißt + du."},
        {label:"4 · Tekijä Sie",german:"Sie",meaning:"Kohtelias puhuttelu, iso S."},
        {label:"5 · Verbi heißen, Sie",german:"Sie heißen",meaning:"Sie + heißen, -en-pääte."},
        {label:"6 · Nimikysymys, Sie",german:"Wie heißen Sie?",meaning:"Wie + heißen + Sie."},
        {label:"7 · Verbi kommen, du",german:"du kommst",meaning:"komm- + -st."},
        {label:"8 · Verbi kommen, Sie",german:"Sie kommen",meaning:"komm- + -en."},
        {label:"9 · Lähtömaa, du",german:"Woher kommst du?",meaning:"Mistä olet kotoisin? Tuttavallinen kysymys."},
        {label:"10 · Lähtömaa, Sie",german:"Woher kommen Sie?",meaning:"Mistä olette kotoisin? Kohtelias kysymys."}
      ]},
    {id:"guided",phase:"Ohjattu harjoitus",kind:"question",title:"Vaihda puhuttelu säilyttäen merkitys",
      paragraphs:["Malli: Wie heißt du? tarkoittaa samaa nimikysymystä kuin Wie heißen Sie?, mutta puhuttelu muuttuu."],
      question:{type:"choice",skillId:"L1-INT-04",prompt:"Mikä on Wie heißt du? -kysymyksen kohtelias muoto?",
        options:[{id:"a",label:"Wie heißt Sie?",wrongFeedback:"Sie ei käytä du-muotoa heißt vaan muotoa heißen."},{id:"b",label:"Wie heißen Sie?"},{id:"c",label:"Wie heiße Sie?",wrongFeedback:"Heiße kuuluu ich-muotoon, ei Sie-pronominin yhteyteen."}],
        correctOption:"b",success:"Oikein. Wie heißen Sie? on kohtelias nimikysymys.",
        hint:"Sie + heißen.",reteach:"Vaihtoehto du heißt muuttuu muotoon Sie heißen. Kysymyksessä järjestys on Wie heißen Sie?",
        genericWrong:"Pidä kysymys Wie, mutta valitse kohteliaan Sie-pronominin verbimuoto."}},
    {id:"correction",phase:"Opettajan mallikorjaus",kind:"explanation",title:"Virheellinen lause ei korjaannu vain pronominilla",
      paragraphs:[
        "Virheellinen malli 1: Wie heißt Sie? Syy: heißt kuuluu du-muotoon. Korjaus: Wie heißen Sie? Vaihdoimme samalla sekä puhuttelun että sille sopivan verbimuodon.",
        "Virheellinen malli 2: Woher kommen du? Syy: kommen kuuluu tässä Sie-muotoon. Korjaus: Woher kommst du?",
        "Korjaa aina järjestyksessä: tunnista pronomini, etsi verbin vartalo ja valitse sille oikea persoona. Tarkista lopuksi, että kysymyssana on alussa ja taivutettu verbi sen jälkeen.",
        "Nämä ovat opetettuja virheitä. Seuraavaksi sinä teet vastaavat korjaukset ilman valmista korjattua lausetta."
      ]},
    {id:"correct-name",phase:"Korjaa virhe 1/2",kind:"question",title:"Korjaa Sie-nimikysymys",
      paragraphs:["Kirjoita koko korjattu kysymys, älä vain verbiä."],
      question:{type:"text",skillId:"L1-INT-04",prompt:"Korjaa: Wie heißt Sie?",
        accepted:["Wie heißen Sie?"],success:"Oikein. Kohteliaan Sie-muodon verbi on heißen.",
        hint:"Korvaa heißt muodolla, jonka lopussa on -en.",
        reteach:"Sie heißen → Wie heißen Sie? Du heißt → Wie heißt du?.",
        genericWrong:"Tarkista, että kysymyksessä on sekä oikea verbi että Sie." ,
        wrongAnswers:{"wie heißt sie":"Heißt on du-muoto. Tarvitaan heißen.","wie heiße sie":"Heiße on ich-muoto, joten se ei sovi Sie-pronominiin."}}},
    {id:"correct-origin",phase:"Korjaa virhe 2/2",kind:"question",title:"Korjaa du-lähtömaakysymys",
      paragraphs:["Vaihda vain väärä verbimuoto, mutta kirjoita koko kysymys."],
      question:{type:"text",skillId:"L1-INT-04",prompt:"Korjaa: Woher kommen du?",
        accepted:["Woher kommst du?"],success:"Oikein. Du kommst on tuttu sinämuoto.",
        hint:"Du + kommst.",reteach:"Du kommst → Woher kommst du? Sie kommen → Woher kommen Sie?",
        genericWrong:"Tarkista, että du-kysymys käyttää kommst eikä kommen.",
        wrongAnswers:{"woher kommen du":"Kommen on Sie-muoto. Du tarvitsee kommst.","woher kommt du":"Kommt ei ole du-muoto tässä. Oikea du-muoto on kommst."}}},
    {id:"book",phase:"Oppikirjan neljä harjoitusta",kind:"book",title:"Harjoittele samoilla C04-tehtävillä",
      paragraphs:[
        "Tee nykyiset C04-EX-05 (heißen), C04-EX-06 (kommen), C04-EX-07 (koko nimikysymys) ja C04-EX-08 (koko lähtömaakysymys) kirjan Harjoittele-sivulla.",
        "Vastaukset tallentuvat C04:n yhteiseen harjoitustietoon. Älä korvaa niitä tässä oppitunnissa uudella pistetietokannalla. Opetustilan lopputarkistukset mittaavat erikseen ilman vihjettä tehtyä osaamista."
      ],
      bookLinks:[{label:"C04 · Harjoittele",chapterId:"04",section:"practice",instruction:"Tee C04-EX-05, -06, -07 ja -08 ja tarkista kirjan perustelut."}]},
    {id:"independent",phase:"Itsenäinen yritys",kind:"question",title:"Muuta lähtömaakysymys kohteliaaksi",
      paragraphs:["Peitä taulu ennen vastaamista. Tässä et saa valmista verbimuotoa."],
      question:{type:"text",skillId:"L1-INT-04",evidenceRole:"independent",prompt:"Kirjoita kohteliaasti: Mistä olette kotoisin?",
        accepted:["Woher kommen Sie?"],success:"Oikein. Woher kommen Sie? sisältää kohteliaan muodon.",
        hint:"Woher + kommen + Sie.",reteach:"Lähtömaan kysymys: du kommst / Sie kommen. Kysymys alkaa Woher-sanalla.",
        genericWrong:"Muista sekä kysymyssana Woher että verbin Sie-muoto kommen.",
        wrongAnswers:{"woher kommst sie":"Kommst kuuluu du-muotoon. Sie tarvitsee kommen.","woher kommt sie":"Kommt ei ole kohteliaan Sie-pronominin muoto."}}},
    {id:"application",phase:"Soveltaminen",kind:"question",title:"Kaveri kysyy nimen",
      paragraphs:["Vaihda seuraavaksi toisesta puhuttelutavasta takaisin du-muotoon. Tämä on uusi tilanne."],
      question:{type:"text",skillId:"L1-INT-04",evidenceRole:"application",prompt:"Kirjoita tuttavallisesti: Mikä sinun nimesi on?",
        accepted:["Wie heißt du?"],success:"Oikein. Wie heißt du? sopii tuttavalliseen tilanteeseen.",
        hint:"Wie + heißt + du.",reteach:"Sie heißen mutta du heißt. Säilytä kysymyssana Wie.",
        genericWrong:"Tarkista du-pronomini ja muoto heißt.",
        wrongAnswers:{"wie heißen du":"Heißen on Sie-muoto. Du tarvitsee heißt.","wie heiße du":"Heiße on ich-muoto, ei du."}}},
    {id:"exit",phase:"Lopputarkistus",kind:"question",title:"Tarkista kaksi muotoa eri verbeistä",
      paragraphs:["Tämä on uusi taivutusyhdistelmä ilman näyttämäämme mallia."],
      question:{type:"choice",skillId:"L1-INT-04",evidenceRole:"exit",prompt:"Mikä pari on oikein: du ___ (kommen) ja Sie ___ (heißen)?",
        options:[{id:"a",label:"kommst / heißen"},{id:"b",label:"kommen / heißt",wrongFeedback:"Nämä muodot kuuluvat väärille puhutteluille."},{id:"c",label:"kommt / heiße",wrongFeedback:"Kumpikaan muoto ei vastaa annettua du / Sie -paria."}],
        correctOption:"a",success:"Oikein. Du kommst, Sie heißen.",
        hint:"Du + kommst, Sie + heißen.",
        reteach:"Du tarvitsee -st-muodon kommen-verbistä. Kohtelias Sie käyttää heißen-verbin -en-muotoa.",
        genericWrong:"Tarkista molemmat verbiparit erikseen."}},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"Osaat yhdistää puhuttelun ja verbin",
      paragraphs:[
        "Harjoittelit vaiheittain du heißt / Sie heißen ja du kommst / Sie kommen. Korjasit kaksi väärää mallilausetta ja teit neljä nykyistä C04:n kielioppiharjoitusta.",
        "Ilman vihjettä oikein vastatut lopun kysymykset näytetään erillisinä näyttöinä. L020:ssa sovellamme kohteliaita fraaseja oikean Text B:n ja muuttuvien tilanteiden avulla."
      ]}
  ]
};
