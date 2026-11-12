import type { LosLessonBlueprint } from "./lessonEngine";

/**
 * LOS! 1 / C06 lessons L031–L035: numbers and ages.
 * Real source M-COM-01 is revisited IN FULL from C01, with independently
 * checked C06 age comprehension. It is not a new standalone C06 primary text.
 * Audio is optional and has NOT passed device checks. A separate source M-ZPE-01
 * is now a C06 Text A preview, with language/device/overall publication gates open.
 */
export const LOS1_C06_LESSON_BLUEPRINTS: readonly LosLessonBlueprint[] = [
  {
    id:"L031",title:"Numerot 0–12",
    objective:"Tunnistan tavallisimmat saksan lukusanat nollasta kahteentoista.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"learn",label:"Opiskele 0–12",instruction:"Avaa kappaleen 6 sanasto. Etsi lukusanat null, eins, zwei, drei, zehn, elf ja zwölf. Opettele erityisesti poikkeavat luvut 11 ja 12.",chapter:"06",section:"vocabulary",minutes:11},
      {id:"numbers",label:"Tee ensimmäiset lukusanatehtävät",instruction:"Vastaa C06-EX-01, C06-EX-02, C06-EX-03 ja C06-EX-04 ilman näkyvää mallia. Tarkista saksan kirjoitusasu jokaisen yrityksen jälkeen.",chapter:"06",section:"practice",minutes:11},
      {id:"exceptions",label:"Kertaa luvut 11 ja 12",instruction:"Kertaa C06:n lukusanasivulta elf ja zwölf ja yritä muistaa ne ilman mallia. Tee lopuksi C06-EX-07 ja C06-EX-08.",chapter:"06",section:"practice",minutes:4},
    ],
    evidence:[{kind:"answered-practice",ids:["C06-EX-01","C06-EX-02","C06-EX-07","C06-EX-08"],label:"Neljä lukujen 0–12 tunnistustehtävää vastattu."}],
    check:{
      question:"Mikä on saksaksi kaksitoista?",
      answers:[{id:"a",text:"zweizehn"},{id:"b",text:"zwölf"},{id:"c",text:"zweiundzehn"}],
      correctId:"b",explanation:"Luku 12 on zwölf. Sen muotoa ei rakenneta suoraan zwei + zehn -mallilla.",
    },
  },
  {
    id:"L032",title:"Numerot 13–20 ja ikä",
    objective:"Kirjoitan lukujen 13–20 perusmuotoja ja tunnistan saksan ikäkysymyksen.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"teens",label:"Tutustu 13–20-lukuihin",instruction:"Avaa C06:n sanasto ja huomaa muodot dreizehn, sechzehn, siebzehn ja zwanzig. Luvuissa 16 ja 17 kirjoitusasu lyhenee poikkeuksellisesti.",chapter:"06",section:"vocabulary",minutes:10},
      {id:"grammar",label:"Harjoittele ikärakennetta",instruction:"Lue C06:n kielioppisivulta Wie alt bist du? ja Ich bin ... Jahre alt. Ikä kerrotaan sein-verbin muodolla bin, ei haben-verbillä.",chapter:"06",section:"grammar",minutes:9},
      {id:"practice",label:"Tunnista ja kirjoita neljä lukua",instruction:"Vastaa C06-EX-09, C06-EX-10, C06-EX-11 ja C06-EX-12. Tarkista erityisesti sechzehn ja siebzehn sekä sana zwanzig.",chapter:"06",section:"practice",minutes:7},
    ],
    evidence:[{kind:"answered-practice",ids:["C06-EX-09","C06-EX-10","C06-EX-11","C06-EX-12"],label:"Lukujen 13–20 neljä tehtävää vastattu."}],
    check:{
      question:"Mikä lause kertoo oikein iän 17 vuotta?",
      answers:[{id:"a",text:"Ich habe siebzehn Jahre alt."},{id:"b",text:"Ich bin siebzehn Jahre alt."},{id:"c",text:"Du bin siebzehn."}],
      correctId:"b",explanation:"Saksaksi käytetään sein-verbiä: Ich bin siebzehn Jahre alt.",
    },
  },
  {
    id:"L033",title:"Numerot 21–100: rakenne",
    objective:"Ymmärrän kymmenien ja ykkösten järjestyksen saksalaisissa lukusanoissa.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"pattern",label:"Opiskele ykköset ennen kymmeniä",instruction:"Lue C06:n numerokielioppi ja tutki sanan einundzwanzig rakennetta. 21 ilmaistaan suoraan sanottuna yksi-ja-kaksikymmentä.",chapter:"06",section:"grammar",minutes:11},
      {id:"numbers",label:"Harjoittele lukusanat 21, 27 ja 32",instruction:"Vastaa C06-EX-13, C06-EX-14 ja C06-EX-15 ilman sanastotaulukkoa. Huomaa muodot einundzwanzig ja zweiunddreißig.",chapter:"06",section:"practice",minutes:11},
      {id:"tens",label:"Kertaa 30, 90 ja 100",instruction:"Vastaa C06-EX-16, C06-EX-19 ja C06-EX-20. Muista kirjoitusasu dreißig sekä saksan hundert-sana.",chapter:"06",section:"practice",minutes:4},
    ],
    evidence:[{kind:"answered-practice",ids:["C06-EX-13","C06-EX-14","C06-EX-15","C06-EX-16","C06-EX-19","C06-EX-20"],label:"Kuusi lukujen 21–100 rakenneharjoitusta vastattu."}],
    check:{
      question:"Mikä on luvun 21 oikea saksankielinen kirjoitusasu?",
      answers:[{id:"a",text:"einsundzwanzig"},{id:"b",text:"zwanzigeins"},{id:"c",text:"einundzwanzig"}],
      correctId:"c",explanation:"Einundzwanzig on ein + und + zwanzig. Luvun yhteen kirjoitettu muoto ei sisällä s-kirjainta sanan ein lopussa.",
    },
  },
  {
    id:"L034",title:"Kertaa aiempi Franz–Jörg-ikäkeskustelu",
    objective:"Poimin alkuperäisestä Franz–Jörg-keskustelusta molempien henkilöiden iät.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"source",label:"Lue koko autenttinen aiempi keskustelu",instruction:"Avaa C06:n tekstisivu ja laajenna sen lopussa kohta Kertaa aiempi Franzin ja Jörgin keskustelu. C01:n alkuperäinen kahdeksanrepliikkinen Franz–Jörg-keskustelu on siellä kokonaan. Äänite on vapaaehtoinen, laitetestaamaton, eikä tämä kertaus ole C06:n uusi Text A.",chapter:"06",section:"text",minutes:11},
      {id:"questions",label:"Tarkista alkuperäiskeskustelun kaksi ikätehtävää",instruction:"Avaa C06:n ymmärtämissivun alaosasta C01:n ikäkertauksen vanhat ymmärtämistehtävät. Vastaa C06-SOURCE-Q01 ja C06-SOURCE-Q02 ja tarkista Franzin ja Jörgin iät.",chapter:"06",section:"understand",minutes:11},
      {id:"repeat",label:"Kertaa ikäfraasit ääneen",instruction:"Palaa keskustelun neljänteen, viidenteen ja kuudenteen puheenvuoroon. Sano Wie alt bist du? ja vastaa keksityllä iällä ilman oikeiden henkilötietojen antamista.",chapter:"06",section:"text",minutes:4},
    ],
    evidence:[{kind:"checked-source",ids:["C06-SOURCE-Q01","C06-SOURCE-Q02"],label:"Aiemman autenttisen keskustelun kaksi ikätehtävää tarkistettu C06:ssa."}],
    check:{
      question:"Minkä ikäinen Jörg on alkuperäisessä keskustelussa?",
      answers:[{id:"a",text:"19-vuotias"},{id:"b",text:"20-vuotias"},{id:"c",text:"21-vuotias"}],
      correctId:"b",explanation:"Jörg vastaa Ich bin zwanzig. Hän on kaksikymmentävuotias. Franz puolestaan kertoo olevansa 19-vuotias.",
    },
  },
  {
    id:"L035",title:"Harjoittele ja testaa C06",
    objective:"Tuotan yksinkertaisen ikäkeskustelun kuvitteellisilla tiedoilla ja palautan lukusanojen kappaletestin.",
    estimatedMinutes:30,contentVersion:"1.0.0",
    steps:[
      {id:"rehearse",label:"Kertaa lukusarjat ja ikäfraasit",instruction:"Kertaa C06:n sanasto. Kirjoita muistista dreißig, siebzehn, zwanzig ja einundzwanzig ja tarkista saksan erikoiskirjaimet.",chapter:"06",section:"vocabulary",minutes:8},
      {id:"apply",label:"Kirjoita kaksi kuvitteellista ikäkeskustelua",instruction:"Avaa C06:n soveltamistehtävä. Kirjoita kaksi lyhyttä keskustelua 17- ja 20-vuotiaista kuvitteellisista henkilöistä, äläkä käytä oikeita syntymäpäiviä.",chapter:"06",section:"apply",minutes:8},
      {id:"test",label:"Palauta C06:n kappaletesti",instruction:"Vastaa kaikkiin C06:n kappaletestin tehtäviin ja palauta testi. Oppitunnin merkintä ei tarkoita, että koko kappaleen itsenäisen päätekstin julkaisuehdot täyttyisivät.",chapter:"06",section:"test",minutes:10},
    ],
    evidence:[{kind:"chapter-test",label:"C06:n lukusana- ja ikäkappaletesti palautettu."}],
    check:{
      question:"Mikä kysymys tarkoittaa Kuinka vanha olet?",
      answers:[{id:"a",text:"Wie heißt du?"},{id:"b",text:"Wie alt bist du?"},{id:"c",text:"Woher kommst du?"}],
      correctId:"b",explanation:"Wie alt bist du? kysyy ikää. Vastauksen voi muodostaa Ich bin ... Jahre alt -rakenteella.",
    },
  },
];
