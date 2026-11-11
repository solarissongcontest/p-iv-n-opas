/** LOS! 1, C08 · authentic Text B, COMPLETE original Am Telefon #112,
 * Wikibooks, Deutschkurs für Anfänger / Lektion 003 (oldid=4382117).
 * https://en.wikibooks.org/w/index.php?title=Deutschkurs_f%C3%BCr_Anf%C3%A4nger%2FLektion_003&oldid=4382117
 * Four consecutive turns exactly as published, including the author's
 * approximate pronunciation hint in square brackets. CC BY-SA 4.0.
 * German original unchanged; translations, scaffolding and exercises are
 * new adaptations. This is WRITTEN dialogue; it has no verified recording.
 * The separate C07 Timwi alphabet audio is not the Otto dialogue audio.
 */
import type {ContentBlock, Exercise} from "./model";

export const LOS1_C08_OTTO_TURNS=[
  {speaker:"a",text:"Wie ist Ihr Name?",translationFi:"Mikä Teidän nimenne on?"},
  {speaker:"b",text:"Mein Name ist Otto.",translationFi:"Nimeni on Otto."},
  {speaker:"a",text:"Wie bitte? Noch einmal, bitte langsam.",translationFi:"Anteeksi mitä? Vielä kerran, hitaasti, kiitos."},
  {speaker:"b",text:"O-T-T-O ([Oo-Te-Te-Oo])",translationFi:"O–T–T–O (lähteen oma, suuntaa antava kirjainten lausuntatapa)."},
] as const;
export const LOS1_C08_OTTO_TEXT=LOS1_C08_OTTO_TURNS.map(turn=>turn.text).join("\n");

export const LOS1_C08_OTTO_BLOCKS:ContentBlock[]=[
  {id:"los1-c08-otto-intro",version:"1.0.0",kind:"paragraph",language:"fi",
    text:"TEXT B · AITO PUHELINKESKUSTELU. Seuraava on koko Wikibooksin Deutschkurs für Anfänger -kirjan Lektion 003:n harjoituksen 112 Am Telefon. Kaikki neljä saksankielistä repliikkiä ovat alkuperäisestä ihmisten kirjoittamasta tekstistä, versio 4382117, lisenssi CC BY-SA 4.0. Suomennokset ovat LOS!:n omia. Kyseessä on kirjoitettu teksti, EI tallenne. Puhelutilanteessa henkilö a pyytää nimen toistamista hitaasti ja henkilö b tavaa Otto-nimen. Nimen tavaaminen sopii C07:n kertaamiseen."},
  {id:"los1-c08-otto-dialogue",version:"1.0.0",kind:"dialogue",sourceId:"M-WB-08",
    turns:LOS1_C08_OTTO_TURNS.map(turn=>({...turn}))},
  {id:"los1-c08-otto-grammar",version:"1.0.0",kind:"grammar",
    title:"Wie bitte? Noch einmal, bitte langsam.",
    explanationFi:"Puhelinkeskustelun Wie bitte? on lyhyt pyyntö sanoa asia uudelleen. Alkuperäislähteessä jatkuu Noch einmal, bitte langsam., siis vielä kerran ja hitaasti. Tässä kirjassa olet oppinut myös itsenäisen ilmaisun Bitte langsamer. Molemmat auttavat toiston pyytämisessä, mutta jälkimmäinen korostaa hitaampaa tahtia. Lähteen Ihr on kohtelias 'Teidän', kun taas jo opittu Wie heißen Sie? on vaihtoehtoinen teitittelevä nimikysymys. Viimeisen repliikin hakasulkeissa olevat Oo–Te–Te–Oo ovat lähteen kirjoittajan suuntaa antava lausuntavihje, eivät virallinen IPA-merkintä tai äänitetty todiste. Saksan O-kirjain on O [oː] ja T-kirjaimen nimi on Tee [teː].",
    examples:[
      {de:"Wie ist Ihr Name?",fi:"Mikä Teidän nimenne on?"},
      {de:"Mein Name ist Otto.",fi:"Nimeni on Otto."},
      {de:"Wie bitte?",fi:"Anteeksi, mitä?"},
      {de:"Noch einmal, bitte langsam.",fi:"Vielä kerran, hitaasti, kiitos."},
      {de:"O-T-T-O",fi:"O–T–T–O, neljä kirjainta."},
    ]},
  {id:"los1-c08-otto-source-note",version:"1.0.0",kind:"paragraph",language:"fi",
    text:"Lähdeviite: Wikibooks, Deutschkurs für Anfänger/Lektion 003, harjoitus 112, Am Telefon, sivuversio 4382117 (23.3.2024), CC BY-SA 4.0. Alkuperäiset neljä repliikkiä on pidetty muuttumattomina. Henkilönnimet ja tilanteet ovat alkuperäisen opetustekstin esimerkkejä, eivät LOS!:n keksimiä haastattelutietoja. Kirjan toisessa osiossa oleva C07:n erillinen aakkosäänite on Timwin äänittämä alkuperäinen kirjainluettelo; sitä ei saa kutsua tämän puheludialogin ääninäytteeksi. Lukemisen tehtävät voidaan pisteyttää ilman ääntä, mutta kuullun ymmärtämistä ei arvioida tämän tekstin perusteella."},
  {id:"los1-c08-otto-task-instructions",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Lue kaikki neljä alkuperäistä repliikkiä. Vastaa ensin siihen, mikä nimi sanotaan, kuka pyytää toistamaan ja miten Otto tavataan. Korosta sitten alkuperäisestä tekstistä pyynnön sisältävä lause. Harjoittele kirjainten nimiä C07:n hyväksytyn, erillisen alkuperäisäänitteen avulla, jos se toimii laitteellasi. Tämän lukuharjoituksen pistemäärä ei ole kuunteluarvio."},
];
const common={version:"0.1.0",difficulty:"guided" as const,objectives:["L1-READ-01","L1-STRAT-01","L1-PHON-01"]};
const choice=(id:string,promptFi:string,labels:[string,string,string],right:0|1|2,explanationFi:string):Exercise=>({
 ...common,id:"los1-c08-otto-"+id,type:"single-choice",promptFi,
 options:labels.map((label,i)=>({id:"o"+i,label})),
 correctOptionId:"o"+right,explanationFi,
});
const hilite=(id:string,fragment:string,promptFi:string,explanationFi:string):Exercise=>{
 const start=LOS1_C08_OTTO_TEXT.indexOf(fragment);
 if(start<0)throw Error("Original phone source text missing: "+fragment);
 return {...common,id:"los1-c08-otto-"+id,type:"highlight",
  blockId:"los1-c08-otto-dialogue",text:LOS1_C08_OTTO_TEXT,
  acceptedRanges:[{start,end:start+fragment.length}],promptFi,explanationFi};
};
export const LOS1_C08_OTTO_EXERCISES:Exercise[]=[
 choice("name","Mikä nimi sanotaan alkuperäisessä puhelukeskustelussa?",
  ["Otto","Berna","Franz"],0,"Henkilö b kertoo: Mein Name ist Otto."),
 choice("setting","Missä alkuperäisen tekstin tilanteessa keskustellaan?",
  ["Ruokalassa","Puhelimessa","Juna-asemalla"],1,"Alkuperäisen tekstin otsikko on Am Telefon."),
 choice("who","Kumpi pyytää asian sanomista uudelleen?",
  ["Henkilö b","Molemmat","Henkilö a"],2,"Henkilö a sanoo Wie bitte? Noch einmal, bitte langsam."),
 choice("request","Mitä alkuperäinen pyyntö tarkoittaa?",
  ["Vielä kerran, hitaasti, kiitos.","Mitä kuuluu?","Voinko mennä kotiin?"],0,
  "Puhuja pyytää toistamaan nimen hitaasti."),
 choice("spell","Miten Otto tavataan alkuperäisessä tekstissä?",
  ["O-D-D-O","O-T-T-O","O-T-O"],1,"Nimessä Otto on neljä kirjainta: O, T, T, O."),
 choice("register","Mikä lähteen ilmaus liittyy teitittelyyn?",
  ["du","heiße","Ihr"],2,"Ihr tarkoittaa tässä kohteliasta 'Teidän'."),
 choice("brackets","Mitä O-T-T-O-rivin hakasulkeet ilmaisevat?",
  ["Alkuperäisen kirjoittajan suuntaa antavan lausuntavihjeen.",
   "Automaattisen ääntämisarvosanan.",
   "Varmennetun puhelun äänitteen."],0,
  "Merkintä on kirjoitettu ääntämisvihje, ei alkuperäinen äänitiedosto."),
 choice("read-not-listen","Mikä kuvaisi tästä saatavaa tulosta oikein?",
  ["Täysi kuullunymmärtämiskoe.","Alkuperäistekstin luetun ymmärtämisen harjoitus.",
   "Oikeiden ihmisten nauhoitettu puhelu."],1,
  "Julkaistu kirjoitettu keskustelu ei ole nauhoitettu puhelu."),
 hilite("highlight-request","Wie bitte? Noch einmal, bitte langsam.",
  "Korosta alkuperäisestä keskustelusta kokonainen repliikki, jossa pyydetään toistoa.",
  "A pyytää toistoa sanoilla Wie bitte? Noch einmal, bitte langsam."),
 hilite("highlight-spelling","O-T-T-O ([Oo-Te-Te-Oo])",
  "Korosta lähdetekstin koko neljäs repliikki, jossa Otto tavataan.",
  "Viimeinen alkuperäinen repliikki sisältää tavatun nimen ja lausuntavihjeen."),
];
