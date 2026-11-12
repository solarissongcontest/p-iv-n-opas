import { LOS1_C01_GLOSS } from "./los1C01.ts";

/**
 * C06 reuses the complete, previously integrated M-COM-01 source to identify
 * the numbers 19 and 20 and the fixed age question. This does not constitute
 * a new C06 primary Text A: sourceRegistry C06 primarySourceId stays null.
 */
export const LOS1_C06_REVIEW_SOURCE_ID = "M-COM-01";
export const LOS1_C06_REVIEW_VERSION = "1.0.0";
export const LOS1_C06_REVIEW_GLOSS: Readonly<Record<string,string>> = {
  ...LOS1_C01_GLOSS,
  alt: "vanha; Wie alt bist du? = Kuinka vanha olet?",
  bin: "olen; Ich bin neunzehn Jahre alt. = Olen 19-vuotias.",
  bist: "olet; Wie alt bist du? = Kuinka vanha olet?",
  neunzehn: "yhdeksäntoista (19)",
  zwanzig: "kaksikymmentä (20)",
  jahre: "vuotta; Jahre alt = vuotta vanha",
};
export const LOS1_C06_REVIEW_QUESTIONS = [
  {
    id:"C06-SOURCE-Q01",prompt:"Kuinka vanha Franz sanoo olevansa?",
    answers:[{id:"a",text:"18-vuotias"},{id:"b",text:"19-vuotias"},{id:"c",text:"20-vuotias"}],
    correctId:"b",explanation:"Franz sanoo Ich bin neunzehn Jahre alt. Neunzehn tarkoittaa 19.",
  },
  {
    id:"C06-SOURCE-Q02",prompt:"Kuinka vanha Jörg sanoo olevansa?",
    answers:[{id:"a",text:"19-vuotias"},{id:"b",text:"21-vuotias"},{id:"c",text:"20-vuotias"}],
    correctId:"c",explanation:"Jörg vastaa Ich bin zwanzig. Zwanzig tarkoittaa 20.",
  },
  {
    id:"C06-SOURCE-Q03",prompt:"Kuka esittää kysymyksen Wie alt bist du?",
    answers:[{id:"a",text:"Jörg"},{id:"b",text:"Franz"},{id:"c",text:"Greta"}],
    correctId:"a",explanation:"Jörg kysyy Franzilta ikää keskustelun neljännessä puheenvuorossa.",
  },
  {
    id:"C06-SOURCE-Q04",prompt:"Mikä alkuperäistekstin lause kertoo 19 vuoden iän?",
    answers:[{id:"a",text:"Ich heiße Franz."},{id:"b",text:"Ich bin neunzehn Jahre alt, und du?"},{id:"c",text:"Gut. Bis später!"}],
    correctId:"b",explanation:"Ich bin neunzehn Jahre alt tarkoittaa Olen 19-vuotias. Ikä kerrotaan sein-verbin bin-muodolla.",
  },
] as const;
export const LOS1_C06_REVIEW_EVIDENCE_ID = "C06-SOURCE-EVIDENCE-01";
export const LOS1_C06_REVIEW_EVIDENCE_CORRECT = "u05";
