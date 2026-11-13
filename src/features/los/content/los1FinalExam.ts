/**
 * EX-FINAL: 50 original LOS! 1 self-study questions.
 * Allocation is fixed to 12 listening + 10 reading + 10 vocabulary +
 * 10 grammar + 8 everyday situations; no fake auto-scored speaking.
 * M-COM-01 and M-COM-02 audio must play to the end in the student's browser
 * before the listening-based result may be submitted. German original texts
 * stay with their source attribution in the book and the exam reader.
 */
export type LosFinalSection="listening"|"reading"|"vocabulary"|"grammar"|"situations";
export type LosFinalSource="M-COM-01"|"M-COM-02"|"M-ZPE-01"|"M-WB-08"|"M-DIB-02";
export type LosFinalQuestion={
 id:string;section:LosFinalSection;prompt:string;choices:readonly {id:"a"|"b"|"c";text:string}[];
 correctId:"a"|"b"|"c";explanation:string;sourceId?:LosFinalSource;
};
export const LOS1_FINAL_DRAFT_CHAPTER="93"; // assessment storage, not an eleventh chapter
export const LOS1_FINAL_SECTION_TITLES:Record<LosFinalSection,string>={
 listening:"Kuullun ymmärtäminen",reading:"Luetun ymmärtäminen",
 vocabulary:"Sanasto",grammar:"Kielioppi ja muodot",situations:"Arjen tilanteet",
};
export const LOS1_FINAL_AUDIO_SOURCES=[
 {id:"M-COM-01" as const,title:"Franz ja Jörg · kokonainen esittäytyminen",
  url:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Gespr%C3%A4chVorstellung.ogg",
  attributionUrl:"https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg",
  author:"Xzapro4 ja Erkan Yilmaz",license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/"},
 {id:"M-COM-02" as const,title:"Thomas, Takashi ja Peter · lyhyt esittäytyminen",
  url:"https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsch_Dialog_._Ich_bin_Peter.ogg",
  attributionUrl:"https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg",
  author:"Ariser",license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/"},
] as const;
const q=(section:LosFinalSection,n:number,prompt:string,options:[string,string,string],
 correctId:"a"|"b"|"c",explanation:string,sourceId?:LosFinalSource):LosFinalQuestion=>({
 id:"EX-FINAL-Q"+String(n).padStart(2,"0"),section,prompt,
 choices:options.map((text,i)=>({id:(["a","b","c"] as const)[i]!,text})),
 correctId,explanation,...(sourceId?{sourceId}:{}),
});
export const LOS1_FINAL_QUESTIONS:readonly LosFinalQuestion[]=[
  q("listening",1,"Mikä tervehdys aloittaa Franzin ja Jörgin keskustelun?",["Guten Abend!","Hallo!","Bis morgen!"],"b","Franz aloittaa sanalla Hallo.","M-COM-01"),
  q("listening",2,"Mitä Franz kysyy Jörgiltä keskustelun alussa?",["Tämän nimeä","Tämän ikää","Tämän lähtömaata"],"a","Franz kysyy Wie heißt du?","M-COM-01"),
  q("listening",3,"Minkä nimen ensimmäinen vastaaja sanoo?",["Peter","Takashi","Jörg"],"c","Jörg kertoo olevansa nimeltään Jörg.","M-COM-01"),
  q("listening",4,"Minkä ikäinen Franz on?",["17","19","20"],"b","Franz kertoo olevansa neunzehn Jahre alt.","M-COM-01"),
  q("listening",5,"Minkä ikäinen Jörg on?",["20","19","21"],"a","Jörg vastaa Ich bin zwanzig.","M-COM-01"),
  q("listening",6,"Miten alkuperäisen keskustelun viimeinen puhuja hyvästelee?",["Gute Nacht!","Auf Wiedersehen!","Tschüss!"],"c","Viimeinen repliikki on Jörgin Tschüss!","M-COM-01"),
  q("listening",7,"Kuka esittää ensimmäisen kysymyksen?",["Takashi","Thomas","Peter"],"b","Thomas kysyy Wie heißt du?","M-COM-02"),
  q("listening",8,"Minkä nimen kysymykseen vastaava henkilö kertoo?",["Takashi","Thomas","Jörg"],"a","Takashi vastaa Ich heiße Takashi.","M-COM-02"),
  q("listening",9,"Minkä nimen Thomas antaa omakseen?",["Peter","Franz","Thomas"],"c","Thomas sanoo Ich bin Thomas.","M-COM-02"),
  q("listening",10,"Kenet Thomas esittelee toiselle henkilölle?",["Franzin","Peterin","Jörgin"],"b","Das ist Peter on Thomasin esittely.","M-COM-02"),
  q("listening",11,"Mistä Thomas ja Peter kertovat tulevansa?",["Berliinistä","Kiotosta","Wienistä"],"a","Wir kommen aus Berlin on Thomasin ilmaus.","M-COM-02"),
  q("listening",12,"Mistä Takashi kertoo tulevansa?",["Berliinistä","Hampurista","Kiotosta"],"c","Ich komme aus Kyoto kuuluu viimeiseen repliikkiin.","M-COM-02"),
  q("reading",13,"Minkä ikäinen Oskar on ensimmäisessä dialogissa?",["6","5","10"],"b","Oskar vastaa Ich bin fünf.","M-ZPE-01"),
  q("reading",14,"Kuka kertoo olevansa kaksitoistavuotias?",["Larissa","Fabian","Paul"],"a","Larissa sanoo Ich bin schon zwölf Jahre alt.","M-ZPE-01"),
  q("reading",15,"Minkä ikäinen Paul on neljännen dialogin mukaan?",["10","12","11"],"c","Tekstissä on Er ist elf Jahre alt.","M-ZPE-01"),
  q("reading",16,"Mikä oppiaine mainitaan luokkakohtauksen ensimmäisessä repliikissä?",["Musiikki","Matematiikka","Historia"],"b","Jetzt haben wir Mathe tarkoittaa, että on matematiikkaa.","M-WB-08"),
  q("reading",17,"Missä Torsten sanoo tehneensä tehtävät?",["Bussissa","Kotona","Luokassa"],"a","Hän vastaa Ja, im Bus.","M-WB-08"),
  q("reading",18,"Kenen opettaja lähettää taululle?",["Silken","Torstenin","Florianin"],"c","Opettaja kysyy Florian? ja kertoja kertoo hänen menevän taululle.","M-WB-08"),
  q("reading",19,"Mihin aineeseen siirrytään välitunnin jälkeen?",["Historiaan","Musiikkiin","Matematiikkaan"],"b","Silke sanoo wir müssen zu Musik.","M-WB-08"),
  q("reading",20,"Mistä kaupungista Harald sanoo olevansa alun perin?",["Münchenistä","Berliinistä","Kiotosta"],"a","Ich komme ursprünglich aus München kertoo lähtöpaikan.","M-DIB-02"),
  q("reading",21,"Minkä ikäinen Harald on suunnilleen?",["30","40","50"],"c","Hän sanoo so um die fünfzig.","M-DIB-02"),
  q("reading",22,"Mikä väri on Haraldin lempiväri?",["Punainen","Sininen","Keltainen"],"b","Harald vastaa Blau.","M-DIB-02"),
  q("vocabulary",23,"Mikä on der Buchstabe suomeksi?",["Kirjain","Kirja","Kaupunki"],"a","Der Buchstabe tarkoittaa kirjainta."),
  q("vocabulary",24,"Mitä sechzehn tarkoittaa?",["60","17","16"],"c","Sechzehn on kuusitoista."),
  q("vocabulary",25,"Mikä viikonpäivä on Donnerstag?",["Tiistai","Torstai","Sunnuntai"],"b","Donnerstag on torstai."),
  q("vocabulary",26,"Mitä ilmaus Jahre alt kertoo?",["Iän","Viikonpäivän","Kotimaan"],"a","Jahre alt käytetään iän kertomisessa."),
  q("vocabulary",27,"Mikä lukusana on einundzwanzig?",["12","20","21"],"c","Ein-und-zwanzig on 21."),
  q("vocabulary",28,"Mikä on die Schule?",["Kauppa","Koulu","Katu"],"b","Schule on koulu."),
  q("vocabulary",29,"Mitä sana Montag tarkoittaa?",["Maanantai","Perjantai","Lauantai"],"a","Montag on maanantai."),
  q("vocabulary",30,"Mitä sanalla Farbe tarkoitetaan?",["Numeroa","Kieltä","Väriä"],"c","Die Farbe tarkoittaa väriä."),
  q("vocabulary",31,"Mikä tarkoittaa myöhemmin?",["morgen","später","gestern"],"b","Später tarkoittaa myöhemmin."),
  q("vocabulary",32,"Mikä tarkoittaa keskiviikkoa?",["Mittwoch","Freitag","Sonntag"],"a","Mittwoch tarkoittaa keskiviikkoa."),
  q("grammar",33,"Täydennä: Ich ___ aus Finnland.",["kommt","kommst","komme"],"c","Ich + komme."),
  q("grammar",34,"Täydennä: Du ___ siebzehn Jahre alt.",["bist","bin","ist"],"a","Du + bist."),
  q("grammar",35,"Täydennä: Sie ___ Mia. (hän on nimeltään Mia)",["heiße","heißt","heißen"],"b","Sie heißt Mia on kolmannen persoonan muoto."),
  q("grammar",36,"Täydennä: Er ___ aus Deutschland.",["kommen","kommst","kommt"],"c","Er + kommt."),
  q("grammar",37,"Täydennä: Woher ___ Sie?",["kommen","kommst","komme"],"a","Kohteliaan Sie-pronominin kanssa käytetään kommen."),
  q("grammar",38,"Täydennä: Ich ___ Leo.",["heißt","heiße","heißen"],"b","Ich heiße Leo."),
  q("grammar",39,"Valitse oikea viikonpäivän ilmaus.",["um Montag","in Montag","am Montag"],"c","Am Montag tarkoittaa maanantaina."),
  q("grammar",40,"Valitse kello kolmelta.",["um drei Uhr","am drei Uhr","im drei Uhr"],"a","Kellonajan edessä käytetään um."),
  q("grammar",41,"Täydennä: Wir ___ aus Berlin.",["kommt","kommen","kommst"],"b","Wir kommen tarkoittaa me tulemme."),
  q("grammar",42,"Täydennä: ___ alt bist du?",["Woher","Was","Wie"],"c","Wie alt bist du? kysyy ikää."),
  q("situations",43,"Et ymmärtänyt opettajan ohjetta. Mitä sanot?",["Ich verstehe nicht.","Ich heiße Mia.","Bis morgen."],"a","Ich verstehe nicht kertoo, ettet ymmärrä."),
  q("situations",44,"Pyydät samaa lausetta toistettavaksi. Mikä sopii?",["Guten Tag!","Noch einmal, bitte.","Ich bin zwölf."],"b","Noch einmal, bitte. tarkoittaa vielä kerran, kiitos."),
  q("situations",45,"Haluat tietää vieraan sanan merkityksen.",["Wie alt bist du?","Woher kommst du?","Was bedeutet das?"],"c","Was bedeutet das? kysyy merkitystä."),
  q("situations",46,"Kysyt kohteliaasti vieraan aikuisen nimeä.",["Wie heißen Sie?","Wie heißt du?","Wie heißen wir?"],"a","Tuntemattomalle aikuiselle voi käyttää Sie-muotoa."),
  q("situations",47,"Puhe etenee liian nopeasti. Mitä pyydät?",["Danke, gut.","Bitte langsamer.","Ich komme aus Finnland."],"b","Bitte langsamer pyytää hidastamaan."),
  q("situations",48,"Tarvitset nimen tavattuna. Miten pyydät?",["Bis morgen!","Wie geht's?","Bitte buchstabieren Sie."],"c","Bitte buchstabieren Sie. on kohtelias tavaamispyyntö."),
  q("situations",49,"Sovitte tapaamisen maanantaina kello kolmelta.",["Am Montag um drei Uhr.","Im Montag am drei Uhr.","Um Montag in drei Uhr."],"a","Am Montag ilmaisee viikonpäivän ja um drei Uhr kellonajan."),
  q("situations",50,"Hyvästelet ystävän ja tarkoitat 'huomiseen'.",["Wie heißt du?","Bis morgen!","Gute Nacht!"],"b","Bis morgen tarkoittaa huomiseen."),
];
export const LOS1_FINAL_WRITING_CHECK="EX-FINAL-WRITING-CHECK";
export const LOS1_FINAL_WRITING_MODEL_OPENED="EX-FINAL-WRITING-MODEL-OPENED";
export const LOS1_FINAL_WRITING_ASSISTED="EX-FINAL-WRITING-ASSISTED";
export const LOS1_FINAL_VOICE_CHECK="EX-FINAL-VOICE-CHECK";
export const LOS1_SUMMARY_GOAL="EX-SUMMARY-GOAL";
export const LOS1_SUMMARY_CARDS="EX-SUMMARY-CARDS";
export const LOS1_SUMMARY_REFLECTION="EX-SUMMARY-REFLECTION";
export function losFinalReadyToSubmit(answers:Readonly<Record<string,string>>){
 return LOS1_FINAL_QUESTIONS.every(q=>q.choices.some(c=>c.id===answers[q.id]));
}
export function losFinalScore(answers:Readonly<Record<string,string>>){
 const perSection=(Object.keys(LOS1_FINAL_SECTION_TITLES) as LosFinalSection[]).map(section=>{
  const questions=LOS1_FINAL_QUESTIONS.filter(q=>q.section===section);
  return {section,title:LOS1_FINAL_SECTION_TITLES[section],total:questions.length,
   correct:questions.filter(q=>answers[q.id]===q.correctId).length};
 });
 return {correct:perSection.reduce((sum,section)=>sum+section.correct,0),total:LOS1_FINAL_QUESTIONS.length,perSection};
}
export function validateLosFinalBank():string[]{
 const errors:string[]=[];
 if(LOS1_FINAL_QUESTIONS.length!==50)errors.push("EX-FINAL on täsmälleen 50 tehtävää.");
 const expected:Record<LosFinalSection,number>={listening:12,reading:10,vocabulary:10,grammar:10,situations:8};
 for(const [section,count]of Object.entries(expected))
  if(LOS1_FINAL_QUESTIONS.filter(q=>q.section===section).length!==count)
   errors.push("Väärä osiopituus: "+section);
 if(new Set(LOS1_FINAL_QUESTIONS.map(q=>q.id)).size!==50)errors.push("Toistuva tehtävätunnus.");
 for(const question of LOS1_FINAL_QUESTIONS){
  if(question.choices.length!==3||new Set(question.choices.map(c=>c.id)).size!==3||
   !question.choices.some(c=>c.id===question.correctId)||!question.prompt||!question.explanation)
    errors.push("Virheellinen tehtävä: "+question.id);
  if((question.section==="listening"||question.section==="reading")&&!question.sourceId)
    errors.push("Lähdetunnus puuttuu: "+question.id);
 }
 return errors;
}
