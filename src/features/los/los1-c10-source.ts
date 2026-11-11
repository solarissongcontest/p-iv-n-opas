/** C10: complete existing HUMAN-authored sources, reused deliberately.
 * M-DIB-02 Harald Becker, COERLL Deutsch im Blick, CC BY 4.0:
 * https://coerll.utexas.edu/dib/vidt.php?f=01_22_int_hb_who
 * M-DIB-01 Berna, CC BY 4.0:
 * https://coerll.utexas.edu/dib/vidt.php?f=01_15_int_bg_who
 * Both interviews are already fully in LOS! C06/C03, with only published
 * telephone numbers visibly replaced for privacy. C10 does NOT claim two
 * distinct NEW chapter-unique sources or claim video has been QA-approved.
 * The originals are wholly shown again here for different reading goals.
 */
import type {ContentBlock,Exercise} from "./model";
import {LOS1_C06_HARALD_TURNS,LOS1_C06_HARALD_TEXT} from "./los1-c06-source.ts";
import {LOS1_C03_BERNA_TURNS,LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION}
 from "./los1-c03-source.ts";
const base={version:"0.1.0",difficulty:"guided" as const,objectives:["L1-PROD-01","L1-READ-01"]};
const choice=(id:string,promptFi:string,labels:[string,string,string],right:0|1|2,explanationFi:string):Exercise=>({
 ...base,id:"los1-c10-source-"+id,type:"single-choice",promptFi,
 options:labels.map((label,i)=>({id:"o"+i,label})),
 correctOptionId:"o"+right,explanationFi,
});
const hilite=(id:string,which:"harald"|"berna",fragment:string,promptFi:string,explanationFi:string):Exercise=>{
 const text=which==="harald"?LOS1_C06_HARALD_TEXT:LOS1_C03_BERNA_FULL_TRANSCRIPT_WITH_REDACTION;
 const start=text.indexOf(fragment);
 if(start<0)throw Error("C10 source excerpt missing: "+fragment);
 return {...base,id:"los1-c10-source-"+id,type:"highlight",
  blockId:which==="harald"?"los1-c10-m-dib-02-harald":"los1-c10-m-dib-01-berna",
  text,acceptedRanges:[{start,end:start+fragment.length}],promptFi,explanationFi};
};
export const LOS1_C10_SOURCE_BLOCKS:ContentBlock[]=[
 {id:"los1-c10-text-a-intro",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"Text A on Harald Beckerin kokonainen alkuperäinen 14-repliikkinen Deutsch im Blick -haastattelu (M-DIB-02, CC BY 4.0). Se luettiin C06:ssa iän näkökulmasta; nyt palataan täsmälleen samaan autenttiseen lähdetekstiin ja harjoitellaan toisesta henkilöstä kertomista: Er heißt Harald, er kommt aus München ja er ist ungefähr fünfzig. Tämä EI ole uusi itsenäinen pääteksti. Haraldin oma ilmaus kotiseudustaan kuvastaa hänen henkilökohtaista huumoriaan, ei LOS!:n kantaa. Lähteessä oleva puhelinnumero on korvattu näkyvällä yksityisyyshuomautuksella. Video ei ole tässä, koska tiedostokohtainen mediaselvitys ja laitetestaus puuttuvat."},
 {id:"los1-c10-m-dib-02-harald",version:"1.0.0",kind:"dialogue",
  sourceId:"M-DIB-02",turns:LOS1_C06_HARALD_TURNS.map(turn=>({...turn}))},
 {id:"los1-c10-harald-support",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"Katso Haraldin alkuperäisiä vastauksia: Ich heiße Harald Becker. → Er heißt Harald Becker. Ich komme ursprünglich aus München. → Er kommt aus München. Ich bin jetzt so um die fünfzig. → Er ist ungefähr fünfzig Jahre alt. Viimeiset Er-virkkeet ovat LOS!:n OMAA kielioppiharjoitusta eivätkä kuulu alkuperäiseen litteraattiin. Lähde ei kerro tarkkaa ikää. Älä opettele vaikeita värisyy- tai aluekommenttien rakenteita aktiivisesti."},
 {id:"los1-c10-text-b-intro",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"Text B on Bernan kokonainen 12-repliikkinen alkuperäishaastattelu M-DIB-01, jonka luit C03:ssa kotipaikan näkökulmasta. Tässä tehtävä on verrata Bernan ja Haraldin nimiä, lähtöpaikkoja ja iän ilmaisuja. Lähde on ihmisen kirjoittama ja julkaisema, EI LOS!:n keksimä vuoropuhelu; puhelinnumero on merkitty poistetuksi. Bernan haastattelun aikainen ikä on 30; sitä ei pidä esittää tämänhetkisenä ikänä. Video- ja kuuntelukokeita ei merkitä valmiiksi ilman alkuperäistä vahvistettua mediaa."},
 {id:"los1-c10-m-dib-01-berna",version:"1.0.0",kind:"dialogue",
  sourceId:"M-DIB-01",turns:LOS1_C03_BERNA_TURNS.map(turn=>({...turn}))},
 {id:"los1-c10-berna-support",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"Berna sanoo Ich heiße Berna ja Ich komme aus Kiel. Kun esittelet häntä kolmannessa persoonassa, voit kirjoittaa Sie heißt Berna. Sie kommt aus Kiel. Nämä kolmannen persoonan lauseet ovat LOS!:n omia opetusmuunnoksia. Isolla kirjoitettu Sie tarkoittaa tavallisesti teitittelyä, mutta lauseen alussa Sie voi myös tarkoittaa hän (naisesta). Asiayhteys ratkaisee. Bernan myöhemmät lempivärikommentit ovat luettavissa kokonaan, mutta eivät ole aktiivista oppimistavoitetta."},
 {id:"los1-c10-source-comparison",version:"0.1.0",kind:"table",
  headers:["Kysymys","Harald (alkuperäisestä)","Berna (alkuperäisestä)"],
  rows:[
   ["Nimi","Harald Becker","Berna"],
   ["Kaupunki","München","Kiel"],
   ["Alue","Süddeutschland","Schleswig-Holstein, ganz im Norden"],
   ["Ikä haastattelussa","suunnilleen 50","30"],
   ["Suosikkiväri","Blau","rot"],
   ["Aineiston muokkaus","puhelinnumero poistettu","puhelinnumero poistettu"],
  ]},
];
export const LOS1_C10_SOURCE_EXERCISES:Exercise[]=[
 choice("harald-name","Mikä Haraldin koko nimi on Text A:ssa?",
  ["Harald Becker","Harald Schmidt","Herr Standish"],0,
  "Harald sanoo Ich heiße Harald Becker."),
 choice("harald-place","Mistä kaupungista Harald kertoo olevansa alun perin kotoisin?",
  ["Kiel","München","Berlin"],1,
  "Harald: Ich komme ursprünglich aus München."),
 choice("harald-age","Millaisen ikätiedon Harald antaa?",
  ["Hän on täsmälleen 50.","Hän on 30.","Hän on suunnilleen viisikymppinen."],2,
  "Er sagt: Ich bin jetzt so um die fünfzig. Tarkkaa ikää ei kerrota."),
 choice("harald-colour","Mikä väri on Haraldin suosikki haastattelussa?",
  ["rot","Blau","grün"],1,"Harald vastaa Blau."),
 choice("berna-name","Miten Berna kertoo nimensä?",
  ["Ich heiße Berna.","Ich heiße Greta.","Ich bin Harald."],0,"Bernan vastaus on Ich heiße Berna."),
 choice("berna-city","Mikä kaupunki liittyy Bernaan?",
  ["München","Wien","Kiel"],2,"Berna sanoo Ich komme aus Kiel."),
 choice("berna-age","Kuinka vanha Berna kertoo olevansa alkuperäisessä haastattelussa?",
  ["30","17","50"],0,"Ich bin 30 Jahre alt. Tämä on haastattelun aikainen tieto."),
 choice("compare-origin","Mikä vertailu on lähteiden mukaan oikein?",
  ["Molemmat ovat Kielistä.","Harald on Münchenistä ja Berna Kielistä.","Harald on Kielistä ja Berna Münchenistä."],1,
  "Harald → München, Berna → Kiel."),
 choice("compare-forms","Mikä C10:n oma uusi lause esittelee Bernan oikein?",
  ["Er kommt aus Kiel.","Sie kommt aus Kiel.","Sie kommst aus Kiel."],1,
  "Sie kommt aus Kiel. Kolmannen persoonan tulee käyttää verbimuotoa kommt."),
 choice("privacy","Mikä väite vastaa lähteiden esitystapaa LOS!:ssa?",
  ["Puhelinnumerot ovat harjoiteltavia.","Tekstit ovat LOS!:n keksimiä.","Alkuperäiset puhelinnumerot on merkitty poistetuiksi."],2,
  "Yhteystietoja ei tarvitse käyttää; poisto on näkyvästi merkitty."),
 hilite("highlight-harald","harald","Ich heiße Harald Becker.",
  "Korosta alkuperäisestä Haraldin haastattelusta hänen nimivastauksensa.",
  "Harald esittäytyy sanoilla Ich heiße Harald Becker."),
 hilite("highlight-berna","berna","Ich komme aus Kiel.",
  "Korosta Bernan alkuperäisestä vastauksesta kotikaupungin kertova lause.",
  "Berna sanoo Ich komme aus Kiel."),
];
