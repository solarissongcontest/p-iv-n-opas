import type { LosLessonBlueprint } from "./lessonEngine";

/**
 * L052: canonical planned title is "Kuuntele Haraldin haastattelu".
 * Until the media file's reuse rights and playback are tested, this first
 * executable run is READING / text-comprehension only. Completing this does
 * not assert that the interview was heard or that C10 has passed publish QA.
 * Evidence is saved only in the existing chapter-10 draft and JSON backup.
 */
export const LOS1_C10_HARALD_READING_LESSON: LosLessonBlueprint = {
  id:"L052",title:"Kuuntele Haraldin haastattelu",
  objective:"Tunnistan koko autenttisen Harald-haastattelun tekstistä nimen, lähtöpaikan, ikäilmauksen ja lempivärin. Kuuntelun osaamista ei toistaiseksi arvioida.",
  estimatedMinutes:30,contentVersion:"1.0.0",
  steps:[
    {id:"read",label:"Lue kaikki Haraldin 14 puheenvuoroa",
      instruction:"Avaa C10:n Text A ja lue koko COERLL:n alkuperäinen 14-repliikkinen Harald Becker -haastattelu. Napauta sanoja vain tarvittaessa. Etsi ilmaukset Ich heiße, Ich komme aus, Wie alt bist du? ja Lieblingsfarbe. Alkuperäisen äänen käyttöoikeutta tai toistoa ei ole vielä varmennettu, joten tämä on tekstiharjoitus, ei todistettu kuuntelutehtävä.",
      chapter:"10",section:"text",minutes:11},
    {id:"comprehend",label:"Vastaa neljään lähdetekstin kysymykseen",
      instruction:"Avaa C10:n Ymmärrä-osio. Vastaa kysymyksiin C10-HARALD-Q01–Q04 ja paina jokaisessa Tarkista vastaus. Kysymykset perustuvat koko haastattelun alkuperäiseen sanamuotoon, eivät teetettyyn mallidialogiin. Väärä vastaus ei estä suoritusmerkintää, mutta se kannattaa kerrata.",
      chapter:"10",section:"understand",minutes:11},
    {id:"evidence",label:"Tarkista täsmällinen tekstikohta ja kertaa",
      instruction:"Valitse ymmärtämissivulla, missä alkuperäisessä repliikissä Harald kertoo ikänsä, ja tarkista tekstikohta. Selitä sen jälkeen itse suomeksi nimen, kotipaikan, iän ja lempivärin tiedot. Älä käytä alkuperäisessä haastattelussa lausuttua puhelinnumeron lukusarjaa oikeana yhteystietona.",
      chapter:"10",section:"understand",minutes:4},
  ],
  evidence:[
    {kind:"checked-source",ids:["C10-HARALD-Q01","C10-HARALD-Q02","C10-HARALD-Q03","C10-HARALD-Q04","C10-SOURCE-EVIDENCE-01"],
      label:"Neljä Haraldin koko alkuperäistekstin tehtävää ja yksi tekstikohta tarkistettu. Ei todennettua kuuntelunäyttöä."},
  ],
  check:{
    question:"Mikä lause vastaa kysymykseen Woher kommst du? Haraldin alkuperäisessä haastattelussa?",
    answers:[
      {id:"a",text:"Ich bin jetzt so um die fünfzig."},
      {id:"b",text:"Ich komme ursprünglich aus München."},
      {id:"c",text:"Blau."},
    ],
    correctId:"b",explanation:"Harald kertoo lähtöpaikkansa lauseella Ich komme ursprünglich aus München. Kuuntelua ei arvioida automaattisesti eikä oppitunnin suoritus kerro todistetusta äänen ymmärtämisestä.",
  },
};
