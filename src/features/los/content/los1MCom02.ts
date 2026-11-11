/**
 * Commons M-COM-02, original complete four-turn transcript by Ariser (2011).
 * Source: https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg
 * Text and OGG file: CC BY-SA 3.0 (author file page).
 * The audio is externally streamed, not re-uploaded. Media playback unverified.
 */
export const LOS1_M_COM_02_VERSION="1.0.0";
export const LOS1_M_COM_02_ID="M-COM-02";
export const LOS1_M_COM_02_LINES=[
  {id:"u01",speaker:"Thomas",text:"Wie heißt du?",meaning:"Mikä sinun nimesi on?"},
  {id:"u02",speaker:"Takashi",text:"Ich heiße Takashi. Und du?",meaning:"Minun nimeni on Takashi. Entä sinun?"},
  {id:"u03",speaker:"Thomas",text:"Ich bin Thomas. Das ist Peter. Wir kommen aus Berlin.",meaning:"Minä olen Thomas. Tämä on Peter. Me tulemme Berliinistä."},
  {id:"u04",speaker:"Takashi",text:"Ich komme aus Kyoto. Ich bin Japaner.",meaning:"Minä tulen Kiotosta. Olen japanilainen."},
] as const;
export const LOS1_M_COM_02_GLOSS:Readonly<Record<string,string>>={
  wie:"miten; Wie heißt du? = Mikä sinun nimesi on?",
  heißt:"olet nimeltäsi; heißen-verbin du-muoto",
  du:"sinä",
  ich:"minä",
  heiße:"nimeni on; ich heiße",
  takashi:"Takashi, etunimi",
  und:"ja; tässä Und du? = Entä sinä?",
  bin:"olen; ich bin",
  thomas:"Thomas, etunimi",
  das:"tämä; Das ist Peter = Tämä on Peter",
  ist:"on; sein-verbin hän/se-muoto",
  peter:"Peter, etunimi",
  wir:"me",
  kommen:"tulemme; wir kommen = me tulemme",
  aus:"-sta/-stä; aus Berlin = Berliinistä",
  berlin:"Berliini",
  komme:"tulen; ich komme",
  kyoto:"Kioto, kaupunki Japanissa",
  japaner:"japanilainen (mies), substantiivi; naisesta Japanerin",
};
export type LosSecondaryQuestion={
  id:string;
  question:string;
  options:readonly {id:string;text:string}[];
  correctId:string;
  feedback:string;
};
export const LOS1_M_COM_02_QUESTIONS:readonly LosSecondaryQuestion[]=[
  {id:"C02-MCOM02-Q01",question:"Mikä Takashin nimi on?",
   options:[{id:"a",text:"Takashi"},{id:"b",text:"Thomas"},{id:"c",text:"Franz"}],
   correctId:"a",feedback:"Takashi sanoo Ich heiße Takashi."},
  {id:"C02-MCOM02-Q02",question:"Mistä Thomas ja Peter ovat?",
   options:[{id:"a",text:"Kiotosta"},{id:"b",text:"Berliinistä"},{id:"c",text:"Wienistä"}],
   correctId:"b",feedback:"Thomas sanoo Wir kommen aus Berlin. Wir tarkoittaa me."},
  {id:"C02-MCOM02-Q03",question:"Mistä Takashi on?",
   options:[{id:"a",text:"Kölnistä"},{id:"b",text:"Berliinistä"},{id:"c",text:"Kiotosta"}],
   correctId:"c",feedback:"Ich komme aus Kyoto tarkoittaa tulen Kiotosta."},
  {id:"C02-MCOM02-Q04",question:"Millä ilmauksella Thomas esittelee Peterin?",
   options:[{id:"a",text:"Das ist Peter."},{id:"b",text:"Wie heißt Peter?"},{id:"c",text:"Bis später, Peter."}],
   correctId:"a",feedback:"Das ist Peter tarkoittaa tämä on Peter."},
];
