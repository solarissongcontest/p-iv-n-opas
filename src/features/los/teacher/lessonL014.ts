import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 · L014, C03 beginner grammar production.
 * The first ACTIVE woher + kommen lesson follows L013 reading-only support.
 * Introduces ich komme / du kommst and aus + Finnland/Deutschland/Österreich;
 * deliberately does not test aus der Schweiz, Sie conjugation or dative.
 * Workbook answers stay in the canonical C03 chapter draft.
 */
export const LOS1_L014_TEACHER: TeacherLesson = {
  id:"L014",bookId:1,chapterId:"03",version:"2.0.0-preview.1",
  title:"Kommen ja woher",
  objective:"Kysyn tutulta Woher kommst du? ja vastaan Ich komme aus Finnland. sekä valitsen oikeat ich/du-verbimuodot.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","stem-check","guided","independent","application","exit"],
  requiredActivityIds:["grammar-followed"],
  requiredPracticeIds:["C03-EX-06","C03-EX-07","C03-EX-10","C03-EX-13"],
  scenes:[
    {
      id:"welcome",phase:"Johdanto",kind:"introduction",
      title:"Opit nyt kysymään itse, mistä toinen on kotoisin",
      paragraphs:[
        "L012:ssa tutustuit maiden nimiin. L013:ssa tunnistit Lisan lähdetekstistä fraasin ich komme aus Deutschland. Nyt opetellaan muodostamaan ensimmäinen oma lähtömaakysymys ja vastaus.",
        "Tämä on ensimmäinen aktiivinen kommen-verbin ja woher-kysymyksen kielioppituntisi. Harjoittelemme vain tuttuja ich- ja du-muotoja, emme vielä kohteliasta Sie-puhuttelua.",
        "Kun lauseen osat ovat tutut, kirjoitat uusia vastauksia ja teet C03:n oikeat harjoitukset oppikirjassa.",
      ],
    },
    {
      id:"recall",phase:"Muistelu",kind:"question",
      title:"Mikä kertoo alkuperän eikä nimeä?",
      paragraphs:["Erota ensin kaksi aikaisemmin opittua sisältöä."],
      question:{
        type:"choice",skillId:"L1-INT-03",
        prompt:"Mikä näistä tarkoittaa Saksaa?",
        options:[
          {id:"a",label:"Deutschland"},
          {id:"b",label:"Finnland",wrongFeedback:"Finnland tarkoittaa Suomea."},
          {id:"c",label:"Bern",wrongFeedback:"Bern on Sveitsissä sijaitseva kaupunki, ei Saksa."},
        ],
        correctOption:"a",success:"Oikein. Deutschland on Saksa. Se sopii kohta lähtömaavastaukseen.",
        hint:"Maan nimi alkaa Deutsch-.",
        reteach:"Deutschland = Saksa. Finnland = Suomi. Bern = kaupunki.",
        genericWrong:"Kertaa L012:n maiden nimet.",
      },
    },
    {
      id:"purpose",phase:"Opettajan selitys",kind:"explanation",
      title:"Miksi tarvitaan woher ja kommen?",
      paragraphs:[
        "Kun haluat tietää toisen nimen, kysyt Wie heißt du? Mutta jos haluat tietää, mistä hän on kotoisin, nimi ei riitä. Tarvitset uuden kysymyssanan woher, joka tarkoittaa mistä.",
        "Kommen tarkoittaa perusmuodossaan tulla. Lause Ich komme aus Finnland. tarkoittaa tässä Olen kotoisin Suomesta. Suomen -sta/-stä ilmaistaan tässä saksan sanalla aus.",
        "Saksan verbi muuttuu sen mukaan, puhutaanko minästä (ich) vai sinusta (du). Siksi et voi vaihtaa ich-sanaa du-sanaksi muuttamatta myös verbiä.",
        "Tällä tunnilla aus liitetään tuttuihin maihin Finnland, Deutschland ja Österreich. Älä muodosta vielä aus der Schweiz -rakennetta. Sen kielioppia ei ole opetettu.",
      ],
      help:[
        {title:"Selitä yksinkertaisemmin",body:"Woher = mistä. Kommst = tulet (sinä). Ich komme = minä tulen. Aus Finnland = Suomesta."},
        {title:"Miksi käytetään sanaa aus?",body:"Suomessa sanotaan Suomesta: paikan loppuun tulee -sta. Saksassa saman lähtöpaikan merkityksen ilmaisee tässä erillinen sana aus ennen maan nimeä."},
        {title:"Kertaa aiempi asia",body:"L012 opetti Finnland = Suomi, Deutschland = Saksa ja Österreich = Itävalta. L013 opetti tunnistamaan, että Lisa tulee Saksasta mutta asuu Bernissä."},
      ],
    },
    {
      id:"verb-form",phase:"Kieliopin opetus",kind:"explanation",
      title:"Näin muodostetaan oikea kommen-verbin muoto",
      paragraphs:[
        "Verbin sanakirjamuoto on kommen. Sen loppu on -en. Poista se: kommen → komm-. Tätä jäljelle jäävää osaa kutsutaan verbin vartaloksi.",
        "Kun tekijä on ich eli minä, liitämme vartaloon -e: komm + e = komme. Kun tekijä on du eli sinä, liitämme -st: komm + st = kommst.",
        "Näin syntyvät ich komme ja du kommst. Ne eivät ole mielivaltaisia muotoja: pääte muuttuu persoonan mukaan, kuten aiemmin ich heiße ja du heißt.",
        "Virhe Ich kommst aus Finnland. sekoittaa minäpronominin ja sinämuodon. Oikea muoto on Ich komme aus Finnland. Virhe Du komme aus Finnland. korjataan muotoon Du kommst aus Finnland.",
      ],
      help:[
        {title:"Vaihe vaiheelta: ich",body:"1) kommen 2) poista -en → komm 3) lisää ich-muodon -e → komme 4) Ich komme aus Finnland."},
        {title:"Vaihe vaiheelta: du",body:"1) kommen 2) poista -en → komm 3) lisää du-muodon -st → kommst 4) Du kommst aus Finnland."},
        {title:"Näytä toinen esimerkki",body:"Ich komme aus Deutschland. = Olen Saksasta. Du kommst aus Österreich. = Sinä olet Itävallasta."},
      ],
    },
    {
      id:"construction-board",phase:"Vaiheittainen opetustaulu",kind:"board",
      title:"Rakenna kysymys ja vastaus osa osalta",
      paragraphs:[
        "Ensiksi vaihdamme tekijän mukaan verbin päätteen. Sen jälkeen sijoitamme sanat oikeaan järjestykseen.",
        "Tavallisessa vastauksessa aloitetaan Ich ja seuraavaksi tulee komme. Kysymyksessä woher tulee alkuun, kommst sen jälkeen ja du verbin perään.",
        "Seuraa vaiheita ja sulje malli ennen myöhempää itsenäistä vastausta.",
      ],
      board:[
        {label:"1 · Verbin perusmuoto",german:"kommen",meaning:"Tulla; poista perusmuodon loppu -en."},
        {label:"2 · Vartalo",german:"komm-",meaning:"Vartalo säilyy kummassakin persoonassa."},
        {label:"3 · Minän pääte",german:"komm + e = komme",meaning:"Ich tarvitsee -e-päätteen."},
        {label:"4 · Sinän pääte",german:"komm + st = kommst",meaning:"Du tarvitsee -st-päätteen."},
        {label:"5 · Vastauksen alku",german:"Ich komme",meaning:"Ich ensin, taivutettu verbi toisena."},
        {label:"6 · Lähtömaa",german:"Ich komme aus Finnland.",meaning:"Aus + Finnland ilmoittaa lähtöpaikan."},
        {label:"7 · Kysymyssana",german:"Woher",meaning:"Mistä?" },
        {label:"8 · Koko kysymys",german:"Woher kommst du?",meaning:"Kysymyssana + taivutettu verbi + du."},
      ],
    },
    {
      id:"stem-check",phase:"Välikysymys",kind:"question",
      title:"Valitse oikea verbin pääte",
      paragraphs:["Opettajan malli on vielä käytettävissä. Tässä tarkistetaan vain pääte, ei kaikkea lauserakennetta."],
      question:{
        type:"choice",skillId:"L1-GRA-01",
        prompt:"Mitä tulee vartalon komm- perään, kun tekijä on du?",
        options:[
          {id:"a",label:"-e",wrongFeedback:"-e kuuluu tässä ich-muotoon: ich komme."},
          {id:"b",label:"-st"},
          {id:"c",label:"-en",wrongFeedback:"-en on perusmuodossa kommen, ei tässä opetetussa du-muodossa."},
        ],
        correctOption:"b",success:"Oikein. Komm + st = kommst.",
        hint:"Muista aiempi du heißt: myös kommen tarvitsee du-muodon päätteen.",
        reteach:"Ich komme mutta du kommst. Vartalo komm- ei muutu, pääte muuttuu.",
        genericWrong:"Kertaa opetustaulun vaiheet 3 ja 4.",
      },
    },
    {
      id:"guided",phase:"Ohjattu harjoittelu",kind:"question",
      title:"Täydennä vastaus mallin avulla",
      paragraphs:["Näet aiemmin opetetun mallin. Valitse oikea minämuoto."],
      question:{
        type:"choice",skillId:"L1-GRA-01",
        prompt:"Mikä sopii: Ich ___ aus Finnland.",
        options:[
          {id:"a",label:"komme"},
          {id:"b",label:"kommst",wrongFeedback:"Kommst kuuluu du-muotoon, mutta lauseen tekijä on ich."},
          {id:"c",label:"kommen",wrongFeedback:"Kommen on verbin perusmuoto. Ich tarvitsee taivutetun muodon komme."},
        ],
        correctOption:"a",success:"Oikein. Ich komme aus Finnland.",
        hint:"Ich ottaa tässä päätteen -e.",
        reteach:"Kommen → komm- → ich komme. Du kommst on toinen muoto.",
        genericWrong:"Katso lauseen ensimmäinen sana ja valitse samaan persoonaan sopiva verbi.",
      },
    },
    {
      id:"word-order",phase:"Sanajärjestyksen opetus",kind:"explanation",
      title:"Miksi kysymyksessä on Woher kommst du?",
      paragraphs:[
        "Vastaus on Ich komme aus Finnland. Sen ensimmäinen osa on tekijä ich, toinen on taivutettu verbi komme. Lopuksi tulee aus Finnland.",
        "Kysymys Woher kommst du? alkaa sanalla woher, koska kysytään mistä. Sen jälkeen tulee du-muodon verbi kommst ja vasta sitten du. Kysymyssanan jälkeinen taivutettu verbi on siis tässä toisena osana.",
        "Älä kirjoita Woher du kommst? tässä tavallisena itsenäisenä suorana kysymyksenä. Korjaa järjestys: Woher kommst du?",
        "Wo wohnst du? kysyisi missä asut. Se ei tarkoita samaa kuin Woher kommst du? Tämä ero auttaa sinua välttämään Lisan lähtömaan sekoittamisen hänen asuinpaikkaansa.",
      ],
      help:[
        {title:"Selitä vaihe vaiheelta",body:"1) Mitä kysytään? Mistä → Woher. 2) Keneltä? Sinulta → du. 3) Mikä verbimuoto? kommst. 4) Rakenna: Woher + kommst + du?"},
        {title:"Miksi sanajärjestys muuttuu?",body:"Saksan suorassa woher-kysymyksessä kysymyssana on ensin ja taivutettu verbi heti sen jälkeen: Woher kommst du?"},
      ],
    },
    {
      id:"textbook",phase:"Kirjan harjoittelu",kind:"book",
      title:"Tee kirjan neljä alkuperäistä harjoitusta",
      paragraphs:[
        "Avaa C03:n Kielioppi. Vertaa ensin ich komme ja du kommst sekä kysymystä Woher kommst du?. Lue selitys, kunnes pystyt muodostamaan oman esimerkin.",
        "Siirry C03:n Harjoittele-osioon. Tee oikeat kirjan harjoitukset C03-EX-06 (komme), C03-EX-07 (kommst), C03-EX-10 (aus) ja C03-EX-13 (kommst).",
        "Vastaukset tallentuvat kirjan nykyiseen tehtäväjärjestelmään, eivät opettajan rinnakkaiseen vastauskantaan. Pelkkä sivun avaus ei täytä tehtäväehtoa; kirjan vastaukset tulee oikeasti kirjoittaa.",
      ],
      bookLinks:[
        {label:"C03 · Kielioppi",chapterId:"03",section:"grammar",instruction:"Tarkista kommen-verbin ich- ja du-muoto sekä woher-kysymyksen rakenne."},
        {label:"C03 · Harjoittele",chapterId:"03",section:"practice",instruction:"Kirjoita C03-EX-06, 07, 10 ja 13. Tarkista ne kirjassa."},
      ],
      activityId:"grammar-followed",activityLabel:"Kävin läpi kielioppimallin ja harjoittelin sitä",
    },
    {
      id:"independent",phase:"Itsenäinen tuottaminen",kind:"question",
      title:"Muodosta kysymys ilman näkyvää mallia",
      paragraphs:["Sulje oppikirjan kielioppitaulu. Kirjoita nyt uusi kysymys kokonaan itse. Voit katsoa vihjeen tarvittaessa, mutta silloin vastaus ei ole itsenäinen näyttö."],
      question:{
        type:"text",skillId:"L1-INT-03",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi tutulle: Mistä olet kotoisin?",
        accepted:["Woher kommst du?"],
        success:"Oikein. Woher kommst du? on kokonainen suora kysymys.",
        hint:"Woher ensin, sitten kommst, lopuksi du.",
        reteach:"Kysymyssana woher + taivutettu verbi kommst + tekijä du: Woher kommst du?",
        genericWrong:"Tarkista sekä kommst-muodon pääte että sanojen järjestys.",
        wrongAnswers:{
          "woher komme du":"Du-muoto on kommst, ei komme.",
          "woher du kommst":"Suorassa kysymyksessä sanajärjestys on Woher kommst du?",
          "wo kommst du":"Wo tarkoittaa missä, mutta lähtöpaikkaa kysytään woher-sanalla.",
        },
      },
    },
    {
      id:"apply-model",phase:"Soveltamisen opetus",kind:"explanation",
      title:"Vaihda lähtömaa mutta säilytä sääntö",
      paragraphs:[
        "Kysymys pysyy samana riippumatta siitä, tuleeko henkilö Suomesta vai Saksasta: Woher kommst du?",
        "Kun vastaat omasta lähtöpaikastasi, alkuosa pysyy muodossa Ich komme aus. Vain lopun maa vaihtuu: Finnland, Deutschland tai Österreich.",
        "Esimerkiksi Ich komme aus Deutschland. ja Ich komme aus Österreich. ovat oikein. Älä muodosta vielä Sveitsistä monimutkaisempaa aus der Schweiz -rakennetta omin päin.",
        "Tässä harjoitellaan kuvitteellisia henkilöitä. Oikeaa nimeä, kotiosoitetta tai puhelinnumeroa ei tarvitse syöttää.",
      ],
    },
    {
      id:"application",phase:"Soveltaminen",kind:"question",
      title:"Kerro uusi lähtömaa",
      paragraphs:["Kuvitteellinen henkilö sanoo olevansa Itävallasta. Sinun tehtäväsi on muodostaa tutulla ich-muodolla itsenäinen vastaus."],
      question:{
        type:"text",skillId:"L1-INT-03",evidenceRole:"application",
        prompt:"Kirjoita saksaksi: Olen kotoisin Itävallasta.",
        accepted:["Ich komme aus Österreich."],
        success:"Oikein. Ich komme aus Österreich. vaihtaa vain tutun maan nimen.",
        hint:"Aloita Ich komme aus ja muista Itävallan Ö.",
        reteach:"Minä = ich, tulen/olen kotoisin = komme, -sta = aus, Itävalta = Österreich.",
        genericWrong:"Tarkista pronomini, kommen-verbin ich-pääte sekä maan nimi.",
        wrongAnswers:{
          "ich kommst aus österreich":"Ich tarvitsee komme, ei kommst.",
          "ich komme österreich":"Lähtömaan edellä tarvitaan aus.",
          "ich komme aus deutschland":"Deutschland on Saksa, mutta pyydettiin Itävaltaa.",
        },
      },
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Erota kysymys ja vastaus uudessa tilanteessa",
      paragraphs:["Ystävä kysyy kuvitteellisen Ainon lähtömaata. Valitse jo opetettu oikea kysymys, älä kohteliasta Sie-muotoa."],
      question:{
        type:"choice",skillId:"L1-INT-03",evidenceRole:"exit",
        prompt:"Mitä sanot tutulle, kun haluat kysyä hänen lähtömaansa?",
        options:[
          {id:"a",label:"Woher kommst du?"},
          {id:"b",label:"Woher komme ich?",wrongFeedback:"Tämä kysyy mistä minä olen, ei mistä sinä olet."},
          {id:"c",label:"Wie heißt du?",wrongFeedback:"Tämä kysyy nimeä, ei lähtömaata."},
        ],
        correctOption:"a",success:"Oikein. Woher kommst du? kysyy tutun lähtömaan.",
        hint:"Tarvitset woher-sanan ja du-muodon kommst.",
        reteach:"Woher = mistä, kommst = tulet, du = sinä. Kysymys: Woher kommst du?",
        genericWrong:"Kysytään lähtömaata, ei nimeä eikä omaa alkuperää.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Nyt voit kysyä ja kertoa alkuperän",
      paragraphs:[
        "Opit, miten kommen → komm- → komme tai kommst. Ymmärrät suoran kysymyksen sanajärjestyksen Woher kommst du? ja vastauksen Ich komme aus Finnland.",
        "Kirjan neljän harjoituksen vastaukset tallennetaan edelleen oppikirjaan. Ensimmäisellä yrityksellä ilman apua oikein ratkaistut opettajan uudet tehtävät näkyvät erillisenä itsenäisenä näyttönä; neuvoa saanut suoritus on harjoittelua.",
        "L015:ssa tunnistetaan lähtöpaikkoja toisessa julkaistussa dialogissa ja tehdään niitä koskevat kirjan lähdetehtävät. Sie-muodon aktiivinen opetus ja aus der Schweiz -rakenne eivät kuulu tähän tuntiin.",
      ],
    },
  ],
};
