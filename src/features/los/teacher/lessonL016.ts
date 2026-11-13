import { losExercisesFor } from "../exerciseBank.ts";
import type { TeacherLesson } from "./engine.ts";

/**
 * L016 · C03 completion uses the SAME 15-item chapter workbook test as the
 * textbook; Teacher never stores a second score, grants automatic mastery,
 * or marks an unsubmitted test complete.
 */
const C03_TEST_IDS = losExercisesFor("03").map(item => item.id);
export const LOS1_L016_TEACHER: TeacherLesson = {
  id:"L016",bookId:1,chapterId:"03",version:"2.0.0-preview.1",
  title:"Harjoittele ja testaa C03",
  objective:"Muodostan alkuperäkysymyksen ja vastauksen, ratkaisen C03:n oikean kappaletestin sekä kirjaan soveltavan tekstin ja rehellisen itsearvioinnin.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["source-rehearsed"],
  requiredPracticeIds:["C03-EX-01","C03-EX-02","C03-EX-09","C03-EX-15"],
  chapterAssessment:{
    requiredTestIds:C03_TEST_IDS,
    requireApplicationDraft:true,
    minSelfAssessmentLength:15,
  },
  scenes:[
    {id:"welcome",phase:"Aloitus",kind:"introduction",title:"Kappaleen 3 harjoittelu ja oikea testi",
     paragraphs:[
      "Olet tutustunut saksankielisiin maihin, lukenut Lisan keskustelun ja Thomasin ja Takashin Text B:n sekä muodostanut ensimmäiset woher-kysymykset.",
      "Tänään palautat asioita muistista, harjoittelet ilman valmista ratkaisua ja teet oikean C03:n kappaletestin kirjassa. Teacher ei rakenna toista testiä tai muuta sen tuloksia.",
      "Tunti voidaan merkitä läpikäydyksi vasta, kun olet vastannut ja oikeasti palauttanut kirjan kaikki 15 testiosatehtävää, kirjoittanut oman sovelluksen sekä itsearvioinnin.",
      "Virheet eivät estä harjoittelun suorittamista. Tulos auttaa valitsemaan, mitä kannattaa kerrata. Aitoa kielitaitoa ei päätellä läpikäynnistä yksin."
     ],help:[{title:"Miksi pitää palauttaa testi?",body:"Pelkkä testisivun avaaminen tai vastausten täyttäminen ei kerro, että palautit suorituksen. Palautuspäivä tallentuu kirjaan erikseen."}]},
    {id:"recall",phase:"Aktivointi",kind:"question",title:"Mitä kysyt tutulta?",
     paragraphs:["Palauta mieleen L014:n keskeinen kysymys ilman kirjaa."],
     question:{type:"choice",skillId:"L1-INT-03",prompt:"Mikä kysyy mistä toinen on kotoisin?",
      options:[{id:"a",label:"Wie heißt du?",wrongFeedback:"Tämä kysyy nimen."},
       {id:"b",label:"Woher kommst du?"},{id:"c",label:"Wo wohnst du?",wrongFeedback:"Tämä kysyy, missä toinen asuu."}],
      correctOption:"b",success:"Oikein. Woher kommst du? kysyy alkuperää.",
      hint:"Mistä = woher.",reteach:"Woher kommst du? = Mistä olet kotoisin? Wo wohnst du? = Missä asut?",
      genericWrong:"Erota alkuperä, nykyinen asuinpaikka ja nimi."}},
    {id:"review",phase:"Opettajan kertaus",kind:"explanation",title:"Kolme rakennetta, yksi selkeä ero",
     paragraphs:[
      "Nimi: Ich heiße Mia. / Wie heißt du? Nämä kysyvät ja kertovat henkilön nimen, eivät alkuperää.",
      "Alkuperä: Ich komme aus Finnland. / Woher kommst du? Näissä kommen-verbi muuttuu persoonan mukaan: ich komme, du kommst.",
      "Asuinpaikka: Ich wohne in Bern. / Wo wohnst du? Näissä on kyse nykyisestä sijainnista eikä lähtömaasta.",
      "Muista myös vieras teksti: Lisa sanoo tulevansa Saksasta ja asuvansa Bernissä. Thomas ja Peter kertovat tulevansa Berliinistä, Takashi Kiotosta."
     ],help:[{title:"Mistä aloitan kertaamisen?",body:"Kysy itseltäsi yksi asia: onko tarkoitus selvittää nimi, lähtömaa vai asuinpaikka? Valitse vasta sitten wie, woher tai wo."}]},
    {id:"board",phase:"Näytetty mallisuoritus",kind:"board",title:"Rakenna kolme eri vastausta",
     paragraphs:["Paina Seuraava ja katso, miten kysymys määrää vastauksessa tarvittavan tiedon."],
     board:[
      {label:"1 · Nimi",german:"Wie heißt du? → Ich heiße Mia.",meaning:"kysymys ja vastaus nimestä"},
      {label:"2 · Alkuperä",german:"Woher kommst du? → Ich komme aus Finnland.",meaning:"kysymys ja vastaus mistä"},
      {label:"3 · Asuinpaikka",german:"Wo wohnst du? → Ich wohne in Bern.",meaning:"kysymys ja vastaus missä"},
      {label:"4 · Väärä muoto",german:"Ich kommst aus Finnland. ✗",meaning:"ich ei saa du-persoonan -st-päätettä"},
      {label:"5 · Korjattu muoto",german:"Ich komme aus Finnland. ✓",meaning:"ich → komme, aus → lähtömaa"}
     ]},
    {id:"guided",phase:"Ohjattu harjoittelu",kind:"question",title:"Kumman muodon valitset?",
     paragraphs:["Voit vilkaista mallitaulua. Valitse du-persoonan muoto."],
     question:{type:"choice",skillId:"L1-GRA-01",prompt:"Du ___ aus Deutschland.",
      options:[{id:"a",label:"komme",wrongFeedback:"Komme on ich-muoto."},{id:"b",label:"kommst"},
       {id:"c",label:"kommen",wrongFeedback:"Kommen on verbin perusmuoto, ei du-muoto."}],
      correctOption:"b",success:"Oikein. Du kommst.",
      hint:"Du lisää vartaloon -st.",
      reteach:"Kommen → komm-; ich komme, du kommst.",
      genericWrong:"Kertaa verbin persoona ja pääte."}},
    {id:"practice",phase:"Kirjan harjoitukset",kind:"book",title:"Ratkaise neljä C03:n oikeaa harjoitusta",
     paragraphs:[
      "Avaa C03:n Harjoittele-osio. Tee C03-EX-01 (woher-kysymyksen merkitys), EX-02 (vastaus), EX-09 (kysymyksen sanajärjestys) ja EX-15 (väitelauseen sanajärjestys).",
      "Yritä ensin ilman sanastoa. Tarkista sen jälkeen kirjasta ja lue selite, jos vastaus on väärin. Nämä ovat oikeita oppikirjaharjoituksia, eivät Teacherin kopioita.",
      "Tehtävämerkinnät luetaan samaan käyttäjäkohtaiseen C03:n tallennukseen. Tehtävän avaus yksin ei riitä."
     ],bookLinks:[{label:"C03 · Harjoittele",chapterId:"03",section:"practice",instruction:"Tee C03-EX-01, 02, 09 ja 15 omilla vastauksilla."}]},
    {id:"independent",phase:"Itsenäinen harjoittelu",kind:"question",title:"Kirjoita kokonainen vastaus ilman mallia",
     paragraphs:["Laita harjoitukset hetkeksi piiloon. Kuvitteellinen kysyjä haluaa tietää, mistä olet kotoisin. Lähtömaa on tässä Itävalta."],
     question:{type:"text",skillId:"L1-INT-03",evidenceRole:"independent",prompt:"Kirjoita saksaksi: Olen kotoisin Itävallasta.",
      accepted:["Ich komme aus Österreich."],
      success:"Oikein. Ich komme aus Österreich.",
      hint:"Aloita Ich komme, lisää aus ja kirjoita maa isolla Ö:llä.",
      reteach:"Lähtömaa: ich + komme + aus + Österreich.",
      genericWrong:"Tarkista ich-muoto, aus ja Itävallan kirjoitusasu.",
      wrongAnswers:{"ich kommst aus österreich":"Kommst on du-muoto. Ich tarvitsee komme.","ich komme in österreich":"Lähtömaasta käytetään tässä aus, ei in.","ich komme aus deutschland":"Deutschland on Saksa, ei Itävalta."}}},
    {id:"apply",phase:"Kirjan soveltamistehtävä",kind:"book",title:"Kirjoita oma lyhyt vuoropuhelu",
     paragraphs:[
      "Avaa C03:n Käytä saksaa -osio. Kirjoita siellä lyhyt kuvitteellinen kohtaaminen, jossa henkilö kysyy Woher kommst du? ja toinen vastaa Ich komme aus ... .",
      "Voit käyttää nimiä Mia ja Leo sekä maita Finnland tai Deutschland. Älä kirjoita oikeita henkilötietoja tai yhteystietoja.",
      "Tämä teksti tallentuu kirjan applicationDraft-kenttään. Teacher tarkistaa vain, että opiskelutyö on tallennettu. Vapaata kirjoittamista ei arvostella tekaistulla automaattisella pisteellä."
     ],bookLinks:[{label:"C03 · Käytä saksaa",chapterId:"03",section:"apply",instruction:"Tallenna oma kuvitteellinen alkuperäkeskustelu."}]},
    {id:"application",phase:"Soveltaminen",kind:"question",title:"Havaitse väärä tulkinta",
     paragraphs:["Kuvitteellinen Leo sanoo Ich komme aus Deutschland. Hän ei kerro mitään siitä, missä nyt asuu."],
     question:{type:"choice",skillId:"L1-INT-03",evidenceRole:"application",prompt:"Mikä seuraavista on ainoa varmasti oikea päätelmä?",
      options:[{id:"a",label:"Leo on kotoisin Saksasta."},
       {id:"b",label:"Leo asuu nyt Berliinissä.",wrongFeedback:"Kommen aus Deutschland ei ilmoita nykyistä kaupunkia."},
       {id:"c",label:"Leon nimi on Deutschland.",wrongFeedback:"Deutschland on maa eikä henkilön nimi."}],
      correctOption:"a",success:"Oikein. Aus Deutschland kertoo lähtömaan, ei nykyistä asuinpaikkaa.",
      hint:"Erota alkuperä ja asuinpaikka.",
      reteach:"Komme aus kertoo mistä; wohne in kertoo missä asun.",
      genericWrong:"Teksti ei kerro Leon asuinpaikkaa."}},
    {id:"source-replay",phase:"Lukemisen kertaus",kind:"activity",title:"Kertaa kahden lähdetekstin avainlauseet",
     paragraphs:[
      "Lue vielä muistinvaraisesti Lisan Ich komme aus Deutschland. ja Takashin Ich komme aus Kyoto. Vertaile, mistä kummassakin henkilö kertoo tulevansa.",
      "Tarkista tarvittaessa Text A ja Text B kirjan kautta. Aitoa kuuntelua ei pidetä suoritettuna, ellet ole kuullut ja todennut äänitettä erikseen.",
      "Vahvista vasta, kun olet tehnyt kertauksen. Tämä on oma merkintäsi, ei automaattinen kielitaidon arvio."
     ],bookLinks:[{label:"C03 · Text A",chapterId:"03",section:"text",instruction:"Kertaa Lisan viimeinen repliikki."},
      {label:"C03 · Text B",chapterId:"03",section:"text-b",instruction:"Kertaa Takashin viimeinen repliikki."}],
     activityId:"source-rehearsed",activityLabel:"Kertaan molempien lähdetekstien alkuperäilmaukset"},
    {id:"exam-intro",phase:"Kappaletestin ohje",kind:"explanation",title:"Näin oikea kappaletesti toimii",
     paragraphs:[
      "Kirjan C03:n Kappaletesti käyttää samaa 15 tehtävän harjoituspankkia koetilassa. Siellä ratkaisujen selitykset pysyvät piilossa, kunnes palautat testin.",
      "Opetuspolun eteneminen vaatii, että testAnswers sisältää vastaukset kaikkiin 15 tehtävään ja testSubmittedAt on kelvollinen palautusaika. Pelkkä vastausten täyttäminen ei riitä.",
      "Testin pistemäärän ei tarvitse olla täydellinen, jotta voit kirjata oppitunnin läpikäydyksi. Sen sijaan katso palautteen jälkeen, mitä todella osaat ja mitä pitää harjoitella.",
      "Jos aloitat testin uusinnan, edellinen yritys arkistoidaan ja tämänhetkinen palautus poistuu näkyvistä. Uusi palautus tarvitaan tunnin keskeneräiseen suoritukseen."
     ],help:[{title:"Pitääkö saada kaikki oikein?",body:"Ei. Testin palauttaminen osoittaa yrityksen, ei automaattisesti osaamista. Erilliset oikein vastatut itsenäiset tehtävät kirjataan omana näyttönään."}]},
    {id:"exam",phase:"Kappaletesti",kind:"book",title:"Palauta kirjan oikea C03:n kappaletesti",
     paragraphs:[
      "Avaa C03:n Kappaletesti. Vastaa kaikkiin viiteentoista osatehtävään. Kun Palauta testi -painike aktivoituu, palauta testi todella.",
      "Palaa Teacheriin ja tarkista, että tilassa näkyy 15/15 vastattu ja Palautettu. Pelkkä testin avaaminen tai kaikkien vaihtoehtojen valitseminen ei riitä.",
      "Testin tulos sekä palautusaika tallentuvat nykyiseen C03:n käyttäjäkohtaiseen oppikirjaluonnokseen, eivät Teacherin keksimään toiseen kokeeseen."
     ],bookLinks:[{label:"C03 · Kappaletesti",chapterId:"03",section:"test",instruction:"Täytä 15 tehtävää ja paina Palauta testi."}]},
    {id:"reflection",phase:"Itsearviointi",kind:"book",title:"Kirjaa, mikä onnistui ja mitä kertaat",
     paragraphs:[
      "Palauttamisen jälkeen kirjan testisivulla avautuu itsearviointikenttä. Vastaa siellä suomeksi tai saksaksi: osasitko kysyä woher, käyttää ich komme ja du kommst sekä erottaa aus- ja in-rakenteet?",
      "Kirjoita vähintään 15 merkkiä oikeaa omaa havaintoasi. Pituusraja varmistaa, että kenttään todella kirjoitettiin jotakin, mutta se ei arvioi tekstin laatua.",
      "Voit harjoitella kysymyksen ääneen ilman nauhoitusta. Ääntämistä ei pisteytetä automaattisesti."
     ],bookLinks:[{label:"C03 · Kappaletestin itsearviointi",chapterId:"03",section:"test",instruction:"Kirjoita mikä onnistui, mikä tuntui vaikealta ja mitä kertaa seuraavaksi."}]},
    {id:"exit",phase:"Lopputarkistus",kind:"question",title:"Päätä sanajärjestys oikein",
     paragraphs:["Vastaa ilman näkyvää taulua. Opitun mallin pitää toimia myös uudessa kysymyksessä."],
     question:{type:"text",skillId:"L1-GRA-01",evidenceRole:"exit",prompt:"Järjestä sanat oikeaksi kysymykseksi: du / kommst / woher",
      accepted:["Woher kommst du?"],
      success:"Oikein. Kysymyssana + verbi + du.",
      hint:"Aloita woher-sanalla.",
      reteach:"Woher kommst du? = kysymyssana woher, taivutettu verbi kommst, tekijä du.",
      genericWrong:"Tarkista kysymyssanan paikka ja kommst-muoto.",
      wrongAnswers:{"woher du kommst":"Kysymyksessä kommst tulee ennen du-sanaa.","woher kommen du":"Du tarvitsee muodon kommst, ei kommen."}}},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"C03:n testi ja oma arviointi ovat osa opetuspolkua",
     paragraphs:[
      "Kertasit woher-, wo-, kommen- ja aus-rakenteet, vastasit Teacherin omiin tarkistuksiin ja harjoittelit oikeilla C03:n tehtävillä.",
      "Tunnin valmistuminen vaatii oikean 15 tehtävän palautetun kappaletestin, kirjaan tallennetun oman sovelluksen ja itsearvioinnin. Pistemäärä ei muutu Teacherissa erilliseksi arvosanaksi.",
      "Seuraavaksi C04:ssa opit käyttämään du- ja Sie-puhuttelua tilanteeseen sopivasti. Kieli- ja oikeushyväksyntä sekä oikeiden laitteiden testaus pysyvät avoimina, kunnes ne on todennettu."
     ]}
  ]
};