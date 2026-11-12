import type { LosLessonBlueprint } from "./lessonEngine";

/**
 * LOS! 1 / C03 lessons L012–L016.
 * Text A is the complete, human-authored Lisa Müller dialogue (M-WB-07).
 * Text B uses the already integrated M-COM-02 transcript. The optional Nicos Weg
 * video is NOT presented as verified media or counted as completed listening.
 * Exit checks assess attempted learning, not automatic language mastery.
 */
export const LOS1_C03_LESSON_BLUEPRINTS: readonly LosLessonBlueprint[] = [
  {
    id:"L012", title:"Maat ja paikat",
    objective:"Tunnistan Saksaa, Suomea ja Itävaltaa tarkoittavat saksankieliset nimet.",
    estimatedMinutes:30, contentVersion:"1.0.0",
    steps:[
      {id:"countries",label:"Opiskele maiden nimet",instruction:"Avaa kappaleen 3 sanasto. Etsi Deutschland, Finnland ja Österreich. Lue nimet ääneen ja huomaa isot alkukirjaimet.",chapter:"03",section:"vocabulary",minutes:9},
      {id:"culture",label:"Tutustu saksankielisiin alueisiin",instruction:"Lue DACH-kulttuuriosio. Erota maa ja kaupunki, esimerkiksi Deutschland ja Bern. Kaikilla Sveitsin asukkailla ei ole saksaa äidinkielenään.",chapter:"03",section:"culture",minutes:10},
      {id:"dialogue",label:"Etsi maiden nimet alkuperäistekstistä",instruction:"Lue Lisa Müllerin keskustelu ja etsi Itävallan ja Saksan nimet. Monia Sie-puhuttelun muotoja opetetaan aktiivisesti vasta seuraavassa kappaleessa.",chapter:"03",section:"text",minutes:7},
    ],evidence:[],
    check:{
      question:"Mikä saksankielinen maan nimi tarkoittaa Itävaltaa?",
      answers:[{id:"a",text:"Österreich"},{id:"b",text:"Deutschland"},{id:"c",text:"Finnland"}],
      correctId:"a",explanation:"Österreich on Itävalta, Deutschland Saksa ja Finnland Suomi.",
    },
  },
  {
    id:"L013", title:"Lisa Müllerin alkuperäkeskustelu",
    objective:"Löydän oikeasta Lisa Müller -keskustelusta lähtömaan ja asuinpaikan.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"read",label:"Lue kahdeksan puheenvuoroa",instruction:"Avaa C03:n nykyinen alkuperäisteksti Lisa Mülleristä. Se on korvannut suunnitelman epävarman Bernan aineiston. Lue kaikki kahdeksan repliikkiä.",chapter:"03",section:"text",minutes:11},
      {id:"questions",label:"Tarkista ymmärtämistehtävät 1 ja 2",instruction:"Vastaa kysymyksiin C03-SOURCE-Q01 ja C03-SOURCE-Q02. Tarkista vastaukset erikseen; niitä ei kopioida oppitunnin omaan tietokantaan.",chapter:"03",section:"understand",minutes:11},
      {id:"recall",label:"Muista lähtömaa ilman näkyvää tekstiä",instruction:"Sulje hetkeksi alkuperäisteksti. Muista, mistä maasta Lisa on ja missä kaupungissa hän kertoo asuvansa. Tarkista vasta sen jälkeen.",chapter:"03",section:"text",minutes:4},
    ],
    evidence:[{kind:"checked-source",ids:["C03-SOURCE-Q01","C03-SOURCE-Q02"],label:"Lisan lähtömaata ja asuinpaikkaa koskevat kysymykset tarkistettu."}],
    check:{
      question:"Mistä maasta Lisa Müller sanoo olevansa kotoisin?",
      answers:[{id:"a",text:"Itävallasta"},{id:"b",text:"Saksasta"},{id:"c",text:"Sveitsistä"}],
      correctId:"b",explanation:"Lisa sanoo Ich komme aus Deutschland. Hän kertoo asuvansa Bernissä, mutta lähtömaa on Saksa.",
    },
  },
  {
    id:"L014",title:"Kommen ja woher",
    objective:"Muodostan kysymyksen Woher kommst du? ja vastauksen Ich komme aus Finnland.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"grammar",label:"Opiskele kommen-verbin kaksi muotoa",instruction:"Lue C03:n kieliopista ich komme ja du kommst. Vertaa kysymyksen Woher kommst du? ja vastauksen Ich komme aus Finnland. sanajärjestystä.",chapter:"03",section:"grammar",minutes:10},
      {id:"practice",label:"Täydennä kaksi verbimuotoa",instruction:"Tee C03-EX-06 (komme) ja C03-EX-07 (kommst) kappaleen harjoitussivulla. Älä katso vastausta ennen omaa yritystä.",chapter:"03",section:"practice",minutes:11},
      {id:"apply",label:"Harjoittele aus-rakennetta",instruction:"Tee C03-EX-10 (aus) ja C03-EX-13 (kommst). Kirjoita lopuksi yhdellä lauseella kuvitteellinen lähtömaa.",chapter:"03",section:"practice",minutes:5},
    ],
    evidence:[{kind:"answered-practice",ids:["C03-EX-06","C03-EX-07","C03-EX-10","C03-EX-13"],label:"Neljä kommen/woher/aus-harjoitusta vastattu."}],
    check:{
      question:"Mikä lause on oikein?",
      answers:[{id:"a",text:"Ich kommen aus Finnland."},{id:"b",text:"Ich komme aus Finnland."},{id:"c",text:"Ich kommst aus Finnland."}],
      correctId:"b",explanation:"Ich-persoonan muoto on komme ja lähtömaata ilmaistaan rakenteella aus + maa.",
    },
  },
  {
    id:"L015",title:"Alkuperä ja karttatehtävät",
    objective:"Tunnistan lähtöpaikkailmauksia eri ihmisten alkuperäisteksteistä ja sijoitan maat sanalliseen karttaan.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"second",label:"Tutki toista aitoa esittelykeskustelua",instruction:"Avaa C03:n Text B: Thomasin, Takashin ja Peterin neljän repliikin dialogi. Ihmisäänite on valinnainen ja laitetestaamaton; koko teksti on kirjassa luettavana.",chapter:"03",section:"text-b",minutes:10},
      {id:"check",label:"Tarkista lähtöpaikkakysymykset",instruction:"Tee C03:n Text B:n kysymykset C03-MCOM02-Q02 ja C03-MCOM02-Q03. Tarkistukset toimivat myös ilman ääntä, koska tekstiversio on kokonainen.",chapter:"03",section:"text-b",minutes:12},
      {id:"geography",label:"Vertaa maita ja kaupunkeja",instruction:"Lue DACH-kulttuuriosio ja vertaile Berliiniä, Kiotoa, Berniä ja Saksaa. Nicos Weg -videon upotus ei ole vahvistettu eikä se ole tämän tunnin suoritusvaatimus.",chapter:"03",section:"culture",minutes:4},
    ],
    evidence:[{kind:"checked-source",ids:["C03-MCOM02-Q02","C03-MCOM02-Q03"],label:"Toisen lähdetekstin kaksi lähtöpaikkakysymystä tarkistettu."}],
    check:{
      question:"Mistä kaupungista Thomas kertoo heidän tulevan?",
      answers:[{id:"a",text:"Berliinistä"},{id:"b",text:"Bernistä"},{id:"c",text:"Kiotosta"}],
      correctId:"a",explanation:"Thomas sanoo Wir kommen aus Berlin. Hän kertoo itsensä ja Peterin olevan Berliinistä.",
    },
  },
  {
    id:"L016",title:"Harjoittele ja testaa C03",
    objective:"Kerron kuvitteellisen lähtömaan ja palautan C03:n kappaletestin.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"practice",label:"Kertaa nimitys ja lähtömaa",instruction:"Harjoittele C03:n kysymyksiä woher, kommen ja aus ilman sanastoa. Tarkista vasta sen jälkeen, menikö saksan sanajärjestys oikein.",chapter:"03",section:"practice",minutes:9},
      {id:"application",label:"Kirjoita oma lyhyt vastaus",instruction:"Tee C03:n soveltamistehtävä kuvitteellisella henkilöllä. Älä tallenna todellisia henkilötietoja tai yhteystietoja.",chapter:"03",section:"apply",minutes:8},
      {id:"test",label:"Palauta kappaletesti",instruction:"Avaa C03:n kappaletesti ja palauta kaikki vastaukset. Näet malliratkaisut vasta palauttamisen jälkeen. Suorituksen merkintä ei tarkoita automaattisesti asian hallintaa.",chapter:"03",section:"test",minutes:9},
    ],
    evidence:[{kind:"chapter-test",label:"C03:n kappaletesti palautettu."}],
    check:{
      question:"Millä kysymyksellä tiedustelet tutulta hänen alkuperäänsä?",
      answers:[{id:"a",text:"Wie heißt du?"},{id:"b",text:"Woher kommst du?"},{id:"c",text:"Wie alt bist du?"}],
      correctId:"b",explanation:"Woher kommst du? tarkoittaa Mistä olet kotoisin? tai Mistä tulet?",
    },
  },
];
