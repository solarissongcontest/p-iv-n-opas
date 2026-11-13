import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";

/**
 * C03 L016 chapter review and EXISTING book exam.
 * No extra exam table or duplicate answers; uses current chapter draft.
 * A submitted test is evidence of participation, not proof of correctness,
 * independent proficiency or delayed retention.
 */
const C03_TEST_IDS = losExercisesFor("03").map(item => item.id);
export const LOS1_L016_TEACHER: TeacherLesson = {
  id:"L016",bookId:1,chapterId:"03",version:"2.0.0-preview.1",
  title:"Harjoittele ja testaa C03",
  objective:"Kertaan maiden nimet, alkuperäkysymyksen, kommen-verbin ich/du-muodot ja lähdetekstien paikat sekä palautan C03:n kirjan oman kappaletestin.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["source-review"],
  requiredPracticeIds:[],
  chapterAssessment:{
    requiredTestIds:C03_TEST_IDS,
    requireApplicationDraft:true,
    minSelfAssessmentLength:15,
  },
  scenes:[
    {
      id:"welcome",phase:"Johdanto",kind:"introduction",
      title:"Kokoa C03:n osaaminen ennen testiä",
      paragraphs:[
        "L012 opetti maiden nimet, L013 Lisan kahdeksan repliikkiä, L014 Woher kommst du? -kysymyksen ja L015 toisen alkuperäisen keskustelun lähtöpaikat.",
        "Tässä tunnissa ei opeteta uusia kielioppirakenteita kesken testin. Ensin muistelet opittua, harjoittelet ja kirjoitat uuden esimerkin. Vasta sen jälkeen palautat kirjan oikean C03-kappaletestin.",
        "Testi tallentuu samaan kappaleen nykyiseen kirjatilaan. Opettajan suoritusmerkintä ei ole automaattinen osaamisarvosana.",
      ],
    },
    {
      id:"recall",phase:"Muistelu",kind:"question",
      title:"Mistä Lisa on kotoisin?",
      paragraphs:["Kertaa L013:n lähtömaa ilman Text A:n näkyvää vastausta."],
      question:{
        type:"choice",skillId:"L1-READ-01",
        prompt:"Minkä maan Lisa ilmoittaa lähtömaakseen?",
        options:[
          {id:"a",label:"Deutschland"},
          {id:"b",label:"Österreich",wrongFeedback:"Lisa kieltää tulevansa Itävallasta."},
          {id:"c",label:"die Schweiz",wrongFeedback:"Lisa asuu Bernissä Sveitsissä, mutta kertoo olevansa kotoisin Saksasta."},
        ],
        correctOption:"a",success:"Oikein. Lisa sanoo Ich komme aus Deutschland.",
        hint:"Kertaa Lisan viimeinen puheenvuoro.",
        reteach:"Deutschland on Lisa Müllerin lähtömaa; Bern on hänen asuinkaupunkinsa.",
        genericWrong:"Tarkista, kysyttiinkö alkuperää vai asumista.",
      },
    },
    {
      id:"review-board",phase:"Opetettu kertausmalli",kind:"board",
      title:"Kertaa kuusi tuttua esimerkkiä",
      paragraphs:[
        "Aloita nimistä ja etene vasta sitten kielioppirakenteeseen. Tunnistat jokaisessa vaiheessa sekä merkityksen että sanajärjestyksen.",
        "Taulu on kertaus, ei koetilanne. Kun aloitat varsinaisen testin, sulje malli.",
      ],
      board:[
        {label:"1 · Suomi",german:"Finnland",meaning:"Maa; isolla alkukirjaimella."},
        {label:"2 · Saksa",german:"Deutschland",meaning:"Maa; Lisa on kotoisin sieltä."},
        {label:"3 · Itävalta",german:"Österreich",meaning:"Maa; alussa iso Ö."},
        {label:"4 · Minämuoto",german:"Ich komme aus Finnland.",meaning:"Komme on ich-muoto."},
        {label:"5 · Sinämuoto",german:"Du kommst aus Deutschland.",meaning:"Kommst on du-muoto."},
        {label:"6 · Kysymys",german:"Woher kommst du?",meaning:"Woher + taivutettu verbi + du."},
        {label:"7 · Lähdetekstin paikka",german:"Ich wohne hier in Bern.",meaning:"Asuinkaupunki, ei lähtömaa."},
      ],
    },
    {
      id:"guided",phase:"Ohjattu kertaus",kind:"question",
      title:"Korjaa verbin persoonamuoto",
      paragraphs:["Mieti pronominia ennen verbin loppua. Tämä on vielä opettajan tukema harjoitus."],
      question:{
        type:"choice",skillId:"L1-GRA-01",
        prompt:"Mikä on oikea lause?",
        options:[
          {id:"a",label:"Ich kommst aus Finnland.",wrongFeedback:"Ich ei saa du-muodon -st-päätettä."},
          {id:"b",label:"Ich komme aus Finnland."},
          {id:"c",label:"Ich kommen aus Finnland.",wrongFeedback:"Kommen on perusmuoto, kun taas ich tarvitsee komme-muodon."},
        ],
        correctOption:"b",success:"Oikein. Ich + komme muodostavat oikean parin.",
        hint:"Poista kommen-sanasta -en ja lisää ich-muodon -e.",
        reteach:"Kommen → komm-; ich komme, du kommst. Lauseessa on ich.",
        genericWrong:"Tarkista, että verbi vastaa tekijää.",
      },
    },
    {
      id:"text-review",phase:"Tekstien kertaus",kind:"book",
      title:"Vertaile Text A:n ja Text B:n paikkatiedot",
      paragraphs:[
        "Avaa Lisa Müllerin Text A ja lue viimeinen puheenvuoro. Vertaa lähtömaata ja asuinkaupunkia.",
        "Avaa sitten Thomasin ja Takashin Text B ja tarkista, mistä he kertovat tulevansa. Text B:n ihmisäänite on valinnainen, eikä sitä esitetä hyväksyttynä kuuntelukokeena.",
        "Näiden kahden alkuperäisaineiston omat kysymykset pysyvät kirjassa. Älä sekoita niihin nyt palautettavaa kappaletestiä.",
      ],
      bookLinks:[
        {label:"C03 · Text A",chapterId:"03",section:"text",instruction:"Muista Lisan lähtömaa ja asuinkaupunki."},
        {label:"C03 · Text B",chapterId:"03",section:"text-b",instruction:"Muista Thomasin, Peterin ja Takashin paikat."},
      ],
      activityId:"source-review",activityLabel:"Kertasin kahden lähdetekstin paikkatiedot",
    },
    {
      id:"difference",phase:"Virhekohtainen kertaus",kind:"explanation",
      title:"Kolme yleistä sekaannusta",
      paragraphs:[
        "Ensimmäinen virhe: Woher ja wo sekoitetaan. Woher kommst du? kysyy lähtöpaikkaa. Wo wohnen Sie? kysyy tässä asuinpaikkaa, mutta Sie-muotoa ei tarvitse vielä itse taivuttaa.",
        "Toinen virhe: ich kommst tai du komme. Tekijä määrää verbin päätteen: ich komme mutta du kommst.",
        "Kolmas virhe: tekstissä näkyvä Bern tulkitaan Lisan lähtömaaksi. Oikea tieto on Deutschland; Bern on hänen nykyinen asuinkaupunkinsa.",
        "Nämä kertaukset ovat opiskelutukea. Itsenäinen koevastaus tehdään vasta, kun malli on suljettu.",
      ],
      help:[
        {title:"Kertaa yksi sääntö",body:"Ich komme, du kommst. Woher kommst du? Ich komme aus Finnland."},
        {title:"Miksi asuinpaikka ja lähtömaa eroavat?",body:"Ihminen voi asua eri paikassa kuin mistä hän on kotoisin. Lisa on Saksasta mutta asuu Bernissä."},
      ],
    },
    {
      id:"independent",phase:"Itsenäinen kertaustehtävä",kind:"question",
      title:"Kirjoita oikea kysymys muistista",
      paragraphs:["Sulje kertausmalli ja kirjoita tutulle osoitettu kysymys itsenäisesti."],
      question:{
        type:"text",skillId:"L1-INT-03",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi: Mistä olet kotoisin? (sinuttelu)",
        accepted:["Woher kommst du?"],
        success:"Oikein. Woher kommst du? on tutulle esitetty alkuperäkysymys.",
        hint:"Woher ensin, kommst toisena, du lopuksi.",
        reteach:"Woher + kommst + du? Kysymyssanan jälkeen tulee verbi.",
        genericWrong:"Tarkista woher, du-muodon -st ja sanajärjestys.",
        wrongAnswers:{"woher komme du":"Du tarvitsee kommst.","woher du kommst":"Suorassa kysymyksessä verbi tulee heti woher-sanan jälkeen."},
      },
    },
    {
      id:"application",phase:"Uusi soveltamistilanne",kind:"question",
      title:"Esittäydy ja kerro lähtömaa",
      paragraphs:["Kuvitteellisen henkilön nimi on Mia, ja hän on Saksasta. Valitse kaksi opetettua lausetta oikeassa merkityksessä."],
      question:{
        type:"choice",skillId:"L1-INT-03",evidenceRole:"application",
        prompt:"Mikä pari kertoo ensin Mian nimen ja sitten hänen lähtömaansa?",
        options:[
          {id:"a",label:"Ich heiße Mia. Ich komme aus Deutschland."},
          {id:"b",label:"Du heißt Mia. Ich komme aus Deutschland.",wrongFeedback:"Ensimmäisen lauseen on kerrottava puhujan oma nimi, joten tarvitaan ich."},
          {id:"c",label:"Ich heiße Mia. Ich kommst aus Deutschland.",wrongFeedback:"Ich tarvitsee komme-muodon, ei kommst."},
        ],
        correctOption:"a",success:"Oikein. Ensimmäinen lause esittelee, toinen kertoo alkuperän.",
        hint:"Oma nimi alkaa Ich heiße ja oma lähtömaa Ich komme aus.",
        reteach:"Ich heiße Mia. = Nimeni on Mia. Ich komme aus Deutschland. = Olen Saksasta.",
        genericWrong:"Etsi molempiin lauseisiin ich-pronominille sopivat verbimuodot.",
      },
    },
    {
      id:"application-book",phase:"Oma soveltava kirjoitus",kind:"book",
      title:"Kirjoita oma lyhyt esittely kirjan tehtäväkenttään",
      paragraphs:[
        "Avaa C03:n Käytä saksaa. Kirjoita kaksi lyhyttä lausetta kuvitteellisesta itsestäsi. Voit käyttää esimerkiksi nimeä Mia ja maata Finnland, mutta muodosta lauseet itse.",
        "Soveltamisteksti tallennetaan kirjan omaan applicationDraft-kenttään. Sitä ei arvioida automaattisesti hyvän saksan arvosanaksi.",
        "Tämä on testistä erillinen työ. Pelkkä kappaletestin palautus ei kirjoita puolestasi soveltamistekstiä.",
      ],
      bookLinks:[{label:"C03 · Käytä saksaa",chapterId:"03",section:"apply",instruction:"Tallenna vähintään kaksi omaa harjoituslausetta kuvitteellisilla henkilötiedoilla."}],
    },
    {
      id:"pre-exam",phase:"Koeohje",kind:"explanation",
      title:"Koetehtävät osoittavat, mitä muistat ilman apua",
      paragraphs:[
        "C03:n kappaletestissä näkyvät kirjan omat osatehtävät. Ne on tehtävä kirjan varsinaisessa testissä, ei opetustilassa itse keksityllä lomakkeella.",
        "Tee vastaukset itsenäisesti. Jos jokin ei onnistu, voit palata opetukseen, mutta se ei automaattisesti todista samaa asiaa hallituksi.",
        "Vasta kun olet antanut vastauksesi, palauta testi kirjan omalla Palauta testi -toiminnolla. Katsottu tai keskeneräinen testi ei ole palautettu testi.",
      ],
    },
    {
      id:"exam",phase:"Kappaletesti",kind:"book",
      title:"Palauta C03:n oikea kappaletesti",
      paragraphs:[
        "Avaa C03:n Kappaletesti. Tee kaikki vaaditut osatehtävät ja paina Palauta testi. Opetusmoottori käyttää kirjan omaa palautusaikaa sekä vastauksia.",
        "Testin palautus on työskentelyn näyttö. Se ei tarkoita automaattisesti, että jokainen vastaus olisi oikein eikä korvaa kielitaidon myöhempää vahvistusta.",
        "Tässä tunnissa ei anneta uutta kielioppia kesken testin eikä lasketa äänen puuttumisesta keksittyjä kuuntelupisteitä.",
      ],
      bookLinks:[{label:"C03 · Kappaletesti",chapterId:"03",section:"test",instruction:"Täytä ja palauta nykyisen kirjan kaikki C03-testitehtävät."}],
    },
    {
      id:"reflection",phase:"Itsearviointi",kind:"book",
      title:"Kirjaa havainto onnistumisesta ja harjoittelutarpeesta",
      paragraphs:[
        "Kirjoita kappaletestin itsearviointikenttään, osaatko erottaa ich komme ja du kommst sekä maan ja kaupungin. Kerro myös yksi asia, jota haluat kerrata.",
        "Kirjaa omia havaintojasi. Pituusvaatimus varmistaa, että vastaus on todella kirjoitettu, mutta se ei tarkoita tiettyä CEFR-tasoa.",
        "Opettajan tila tarkistaa, että testi on palautettu, soveltamisteksti löytyy ja itsearviointi on tallennettu. Se ei keksi puuttuvia suorituksia.",
      ],
      bookLinks:[{label:"C03 · Testin itsearviointi",chapterId:"03",section:"test",instruction:"Kirjaa osaaminen ja kertaustarve."}],
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Tunnista lähtöpaikkakysymys",
      paragraphs:["Vastaa yhdellä tutulla ilmauksella. Tämä on opettajan pieni lopputarkistus, ei uusi kappalekoe."],
      question:{
        type:"choice",skillId:"L1-INT-03",evidenceRole:"exit",
        prompt:"Millä kysymyksellä tiedustelet tutulta hänen lähtöpaikkaansa?",
        options:[
          {id:"a",label:"Wie heißt du?",wrongFeedback:"Tämä kysyy nimeä."},
          {id:"b",label:"Woher kommst du?"},
          {id:"c",label:"Wie geht's?",wrongFeedback:"Tämä kysyy kuulumisia."},
        ],
        correctOption:"b",success:"Oikein. Woher kommst du? kysyy lähtöpaikkaa.",
        hint:"Muista mistä = woher.",
        reteach:"Woher kommst du? = Mistä olet kotoisin?",
        genericWrong:"Valitse kysymys, jossa on woher.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"C03:n opetus ja koe ovat eri suorituksia",
      paragraphs:[
        "Kertasit maiden nimet, woher-kysymyksen ja kommen-verbin ich/du-muodot sekä kahden autenttisen tekstin paikkatiedot.",
        "Tunti voidaan merkitä käsitellyksi vain oikeiden opiskelutoimintojen, talletetun soveltamistekstin, palautetun kappaletestin ja itsearvioinnin jälkeen. Varsinainen osaaminen ja myöhempi muistaminen tarkistetaan erikseen.",
        "Seuraava L017 aloittaa C04:n sinuttelun ja kohteliaan puhuttelun. L016 ei edellytä vielä uuden Sie-kieliopin itsenäistä tuottamista.",
      ],
    },
  ],
};
