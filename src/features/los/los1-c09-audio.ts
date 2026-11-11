/** C09 authentic Wikimedia Commons 15s weekday pronunciation list.
 * Source "German Vocabulary - Days.ogg", English Wikibooks user Christoph,
 * 2007, CC BY-SA 3.0, NOT derived from COERLL M-DIB-05 or the
 * Wikibooks Sport und Zeit dialogue. Record is independently human made.
 * Original Commons description gives the COMPLETE transcript:
 * Tage: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.
 *
 * Main asset path is the standard MediaWiki MD5 Commons path for the exact
 * source filename. Mobile/browser playback has NOT been device-verified.
 * If original playback fails, a learner may read the full text, but a
 * written answer cannot stand in for verified listening ability.
 */
import type {ContentBlock,Exercise} from "./model";
import {LOS1_C09_WEEKDAYS} from "./los1-c09-content.ts";
export const LOS1_C09_AUDIO_SOURCE_ID="M-COM-08";
export const LOS1_C09_AUDIO_TRANSCRIPT=["Tage:",...LOS1_C09_WEEKDAYS] as const;
export const LOS1_C09_AUDIO_BLOCKS:ContentBlock[]=[
 {id:"los1-c09-m-com-08-audio",version:"1.0.0",kind:"media",mediaType:"audio",
  title:"Die Wochentage · 15 sekunnin alkuperäisäänite (Christoph, 2007)",
  sourceId:"M-COM-08",
  embedUrl:"https://upload.wikimedia.org/wikipedia/commons/1/15/German_Vocabulary_-_Days.ogg",
  mp3Url:"https://upload.wikimedia.org/wikipedia/commons/transcoded/1/15/German_Vocabulary_-_Days.ogg/German_Vocabulary_-_Days.ogg.mp3",
 },
 {id:"los1-c09-audio-intro",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"TEXT B:n kuuntelu: seuraa nyt toista, erillistä alkuperäistä ihmisen lausumaa 15 sekunnin äänitettä German Vocabulary – Days. Wikimedia Commons -lähde on englanninkielisen Wikibooksin Christoph-käyttäjän luoma ja julkaistu CC BY-SA 3.0 -lisenssillä. Äänite sisältää koko seitsemän viikonpäivän luettelon sekä alun Tage. Se ei ole C09:n Franz–Greta-dialogin virheellinen äänite eikä COERLL:n Die Woche -materiaali. Kuuntele ainakin kerran ennen kuin avaat alla olevan kirjoitetun litteraatin. Äänen todellinen toisto ja viive on vielä varmistettava omalla puhelimella; jos soitin ei käynnisty, lue teksti mutta älä kutsu sitä kuullunymmärtämisen pisteeksi."},
 {id:"los1-c09-m-com-08-transcript",version:"1.0.0",kind:"transcript",sourceId:"M-COM-08",
  lines:[
   {de:"Tage",fi:"päivät",noteFi:"Äänitteen lyhyt aloitus."},
   {de:"Montag",fi:"maanantai"},
   {de:"Dienstag",fi:"tiistai"},
   {de:"Mittwoch",fi:"keskiviikko"},
   {de:"Donnerstag",fi:"torstai"},
   {de:"Freitag",fi:"perjantai"},
   {de:"Samstag",fi:"lauantai"},
   {de:"Sonntag",fi:"sunnuntai"},
  ]},
 {id:"los1-c09-audio-followup",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"Tarkista alkuperäisen äänen kahdeksan sanaa vasta kuuntelun jälkeen: Tage, Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag. Jos ääni toimii laitteellasi, voit yhdistää joka sanan kuuloasun kirjoitusasuun. Jos ei toimi, harjoittele luettelon ymmärtämistä tekstinä ja merkitse itsellesi, että ääni odottaa toimivuustarkistusta. Kaikki alla olevat vastaukset löytyvät myös litteraatista, joten niitä ei pidä tulkita kuuntelukyvyn yksiselitteiseksi mittaukseksi."},
];
const base={version:"0.1.0",difficulty:"guided" as const,objectives:["L1-TIME-01","L1-READ-01"]};
const choice=(id:string,promptFi:string,options:[string,string,string],correct:0|1|2,explanationFi:string):Exercise=>({
 ...base,id:"los1-c09-audio-"+id,type:"single-choice",promptFi,
 options:options.map((label,i)=>({id:"a"+i,label})),correctOptionId:"a"+correct,explanationFi,
});
export const LOS1_C09_AUDIO_EXERCISES:Exercise[]=[
 choice("question-intro","Mikä sana aloittaa Commonsin alkuperäisen viikonpäiväluettelon ennen Montagia?",
  ["Tage","Monate","Zahlen"],0,"Äänite alkaa Tage-sanalla, jota seuraavat viikonpäivät."),
 choice("first","Mikä viikonpäivä on alkuperäisen äänitteen ensimmäinen päivä?",
  ["Sonntag","Montag","Samstag"],1,"Montag on ensimmäinen viikonpäivä luettelossa."),
 choice("third","Mikä on kolmas viikonpäivä?",
  ["Dienstag","Donnerstag","Mittwoch"],2,"Kolmas päivä on Mittwoch."),
 choice("fifth","Mikä on viides viikonpäivä?",
  ["Freitag","Dienstag","Sonntag"],0,"Viides päivä on Freitag."),
 choice("weekend","Mikä pari on kuultavan luettelon lopussa?",
  ["Montag ja Dienstag","Samstag ja Sonntag","Donnerstag ja Freitag"],1,
  "Luettelon kaksi viimeistä viikonpäivää ovat Samstag ja Sonntag."),
 choice("final","Mikä viikonpäivä päättää alkuperäisen äänitteen?",
  ["Montag","Freitag","Sonntag"],2,"Sonntag on viikonpäiväluettelon viimeinen."),
 choice("source","Mikä kuvaa äänitettä oikein?",
  ["Itsenäinen Commonsin 15 sekunnin viikonpäiväluettelo.",
   "Franzin ja Gretan virheellinen jalkapallokeskustelu.",
   "LOS!:n tuottama keinotekoinen haastattelu."],0,
  "Tämä on erillinen, itse tallennettu autenttinen Commons-äänite. Se ei ole haastattelu."),
];
