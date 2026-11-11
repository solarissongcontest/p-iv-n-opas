/** Authentic C09 Text A: complete seven-turn Franz–Greta Sport und Zeit
 * directly transcribed from the 4003622 Wikibooks original page revision.
 * https://en.wikibooks.org/w/index.php?title=German/Level_I/Freizeit&oldid=4003622
 * Wikibooks community contributors: CC BY-SA 4.0.
 * All seven German turns exactly reproduce the source without omissions.
 * Original page warns its AUDIO says "das Fußball" instead of "der Fußball".
 * This source's audio is NOT offered, imitated, or called a verified clip.
 * Finnish translations/explanations were independently written for LOS!.
 */
import type {ContentBlock,Exercise} from "./model";
export const LOS1_C09_SPORT_TURNS=[
 {speaker:"Franz",text:"Hallo, Greta! Wie spät ist es?",translationFi:"Hei, Greta! Paljonko kello on?"},
 {speaker:"Greta",text:"Es ist Viertel vor drei.",translationFi:"Kello on varttia vaille kolme (2.45)."},
 {speaker:"Franz",text:"Wirklich? Ich spiele um drei Fußball. Machst du Sport, Greta?",translationFi:"Ihanko totta? Pelaan jalkapalloa kolmelta. Harrastatko urheilua, Greta?"},
 {speaker:"Greta",text:"Nein, ich bin faul. Ich gehe jetzt nach Hause.",translationFi:"En, olen laiska. Menen nyt kotiin."},
 {speaker:"Franz",text:"Fußball macht aber Spaß!",translationFi:"Mutta jalkapallo on hauskaa!"},
 {speaker:"Greta",text:"Bis dann.",translationFi:"Nähdään sitten."},
 {speaker:"Franz",text:"Wiedersehen!",translationFi:"Näkemiin!"},
] as const;
export const LOS1_C09_SPORT_TEXT=LOS1_C09_SPORT_TURNS.map(row=>row.text).join("\n");
const base={version:"0.1.0",difficulty:"guided" as const,objectives:["L1-TIME-01","L1-READ-01"]};
const choice=(id:string,promptFi:string,labels:[string,string,string],right:0|1|2,explanationFi:string):Exercise=>({
 ...base,id:"los1-c09-sport-"+id,type:"single-choice",
 promptFi,options:labels.map((label,i)=>({id:"c"+i,label})),
 correctOptionId:"c"+right,explanationFi,
});
const highlight=(id:string,fragment:string,promptFi:string,explanationFi:string):Exercise=>{
 const start=LOS1_C09_SPORT_TEXT.indexOf(fragment);
 if(start<0)throw Error("C09 original quote missing: "+fragment);
 return {...base,id:"los1-c09-sport-"+id,type:"highlight",
  blockId:"los1-c09-wb-03-dialogue",text:LOS1_C09_SPORT_TEXT,
  acceptedRanges:[{start,end:start+fragment.length}],promptFi,explanationFi};
};
export const LOS1_C09_TEXT_A_BLOCKS:ContentBlock[]=[
 {id:"los1-c09-wb-03-dialogue",version:"1.0.0",kind:"dialogue",sourceId:"M-WB-03",
  turns:LOS1_C09_SPORT_TURNS.map(turn=>({...turn}))},
 {id:"los1-c09-sport-followup",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"Lähteen ensimmäinen kysymys Wie spät ist es? tarkoittaa paljonko kello on. Greta vastaa Es ist Viertel vor drei, eli 2.45. Franz puolestaan kertoo Ich spiele um drei Fußball, eli hän pelaa jalkapalloa tasan kolmelta. Nämä eivät ole sama kellonaika. Tässä kappaleessa harjoittelet itse tuottamaan vain tasatunnin muodon um drei Uhr. Viertel vor kolme on alkuperäisen keskustelun tunnistettava lisäilmaus. Gretaa kuvaava sana faul ja muu harrastuksiin liittyvä kielioppi ovat lisäymmärrystä, eivät uuden verbitaivutuksen vaatimuksia. Alkuperäisen tekstin kielioppi on erotettu lähteen mahdollisesti virheellisestä äänitteestä."},
 {id:"los1-c09-sport-source-note",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"Lähde on Wikibooksin käyttäjien oikeasti kirjoittama seitsemän vuoron Sport und Zeit -keskustelu, CC BY-SA 4.0, sivuversio 4003622. Kaikki alkuperäiset saksankieliset repliikit ja omat suomennokset ovat luettavissa tässä kirjan sisällä. Käytämme tekstiä lukemisen harjoitukseen; alkuperäissivun erillisestä äänitteestä puuttuu tarkistettu, virheetön käyttöversio. Siksi tähän ei liitetä eikä pisteytetä alkuperäisäänitettä."},
];
export const LOS1_C09_TEXT_A_EXERCISES:Exercise[]=[
 choice("speakers","Ketkä ovat tämän kokonaisen alkuperäiskeskustelun henkilöt?",
  ["Franz ja Greta","Franz ja Jörg","Heinrich ja Karl"],0,
  "Lähdetekstin puhujat ovat Franz ja Greta."),
 choice("first-question","Mitä Franz kysyy heti alussa?",
  ["Mikä on nimesi?","Paljonko kello on?","Mistä olet kotoisin?"],1,
  "Wie spät ist es? tarkoittaa paljonko kello on."),
 choice("quarter","Mikä on Gretan ilmoittama kellonaika?",
  ["3.15","3.00","2.45"],2,
  "Viertel vor drei tarkoittaa varttia vaille kolme eli 2.45."),
 choice("franz-time","Mihin aikaan Franz kertoo pelaavansa jalkapalloa?",
  ["kello 3.00","kello 2.45","kello 4.00"],0,
  "Franz sanoo Ich spiele um drei Fußball."),
 choice("activity","Mitä Franz kertoo harrastavansa?",
  ["Tennistä","Jalkapalloa","Uimista"],1,
  "Fußball tarkoittaa jalkapalloa."),
 choice("greta","Mitä Greta kertoo omasta tekemisestään?",
  ["Hän pelaa jalkapalloa.","Hän jää ulos odottamaan.","Hän lähtee kotiin."],2,
  "Ich gehe jetzt nach Hause tarkoittaa menen nyt kotiin."),
 choice("goodbye","Minkä hyvästelyn Greta sanoo?",
  ["Bis dann.","Guten Morgen!","Gute Nacht!"],0,
  "Greta sanoo Bis dann."),
 choice("audio-honesty","Miksi tämän lähteen alkuperäistä ääntä ei pidä käsitellä valmiina mallinauhoitteena?",
  ["Koska sitä ei ole olemassa.","Lähdesivu kertoo äänitteen käyttävän väärää artikkelia Fußball-sanan edellä.",
   "Koska ääni kuuluu eri henkilöille kuin tekstissä."],1,
  "Wikibooksin lähdesivu kertoo, että äänitteessä sanotaan das eikä oikea der (Fußball)."),
 highlight("highlight-quarter","Es ist Viertel vor drei.",
  "Korosta saksankielisestä alkuperäiskeskustelusta koko Gretan ajanilmaus.",
  "Viertel vor drei = 2.45."),
 highlight("highlight-full-hour","Ich spiele um drei Fußball.",
  "Korosta alkuperäisestä keskustelusta Franzin tarkka lause, jossa hän kertoo pelaavansa kolmelta.",
  "Um drei ilmaisee tasakolmea ja eroaa sanasta Viertel vor drei."),
];
