import type {LosLessonBlueprint} from "./lessonEngine";
import {
 LOS1_FINAL_WRITING_CHECK,LOS1_FINAL_VOICE_CHECK,
 LOS1_SUMMARY_GOAL,LOS1_SUMMARY_CARDS,LOS1_SUMMARY_REFLECTION,
} from "./content/los1FinalExam.ts";

/**
 * Two original final lessons: EX-FINAL and the audited 10-goal summary.
 * Test is 50 original objectively scored items and 2 separate ungraded
 * production tasks. Completion is workflow evidence, not a CEFR certificate.
 * Authentic audio playback is a necessary UI submit gate; media rights and
 * real device testing remain independent publication-release gates.
 */
export const LOS1_FINAL_LESSONS:readonly LosLessonBlueprint[]=[
 {
  id:"L059",title:"Koko kirjan loppukoe",
  objective:"Teen koko kirjan 50-kohtaisen loppukokeen, kirjoitan 5–7 lauseen oman viestin ja äänitän 6–8 puheenvuoron keskustelun. Arvioin tuotokseni erillään pisteistä.",
  estimatedMinutes:80,contentVersion:"1.0.0",
  steps:[
   {id:"sources",label:"Kuuntele kaksi koko alkuperäisäänitettä ja vastaa tehtäviin",chapter:null,section:"final",minutes:48,
    instruction:"Avaa LOS! 1:n loppukoe. Kuuntele kaksi erillistä Wikimedia Commonsin alkuperäistä ihmisen puhumaa saksankielistä dialogia loppuun. Vastaa niiden pohjalta 12 kuulokysymykseen sekä muihin 38 alkuperäiseen lukemisen, sanaston, kieliopin ja arkitilanteiden tehtävään. Palauta 50 pisteen koe vain, jos molemmat alkuperäisäänitteet toimivat, kaikki vastaukset on annettu ja tallennus onnistuu. Jos äänentoisto ei toimi, älä kuvittele kuunnelleesi sitä.",
   },
   {id:"writing",label:"Kirjoita 5–7 lauseen oma viesti",chapter:null,section:"final",minutes:16,
    instruction:"Kirjoita loppukoesivulla 5–7 erillistä omaa saksankielistä virkettä kuvitteelliselle uudelle tuttavalle, yksi lause riville. Sisällytä nimi, lähtömaa, ikä ja tapaamisaika. Käytä vähintään 80 merkkiä ja vahvista oma tarkistuslista. Tekstin kielellistä laatua ei pisteytetä automaattisesti.",
   },
   {id:"record",label:"Äänitä keskustelu ja itsearvioi",chapter:null,section:"final",minutes:12,
    instruction:"Äänitä loppukoesivulla 6–8 puheenvuoron keskustelu käyttäjän luvalla ja lataa tallenne omalle laitteelle. Merkitse erillinen oma arvio well, some tai again ja kirjoita vähintään 15 merkin itsearvio. Ääni ei sisälly JSON-varmuuskopioon eikä tallennu palvelimelle. Loppukokeen pistemäärä ei sisällä puheen arviointia.",
   },
  ],
  evidence:[
   {kind:"chapter-test",label:"Kaikki 50 loppukokeen tehtävää palautettu kuuntelun toistoehtojen täytyttyä."},
   {kind:"written-application",label:"Oma vähintään 80 merkin saksankielinen viesti tallennettu."},
   {kind:"self-assessment",label:"Vapaan tuottamisen vähintään 15 merkin sanallinen itsearvio tallennettu."},
   {kind:"answered-practice",ids:[LOS1_FINAL_WRITING_CHECK,LOS1_FINAL_VOICE_CHECK,"EX-FINAL-DIALOGUE-SELF"],
    label:"5–7 lauseen kirjoitus vahvistettu, puheäänitteen lataus käynnistetty ja keskustelu itsearvioitu."},
  ],
  check:{
   question:"Miten loppukokeen omat viesti ja äänitetty keskustelu pisteytetään?",
   answers:[
    {id:"a",text:"Niistä tulee automaattisesti kielitasotodistus."},
    {id:"b",text:"Ne itsearvioidaan erikseen eikä niitä lasketa 50 objektiiviseen pisteeseen."},
    {id:"c",text:"Pelkkä mikrofoniin puhuminen antaa täydet pisteet."},
   ],
   correctId:"b",
   explanation:"EX-FINAL:n 50 pistettä perustuvat valintatehtäviin. Aitoa puhetta tai vapaata kirjoitusta ei arvioida automaattisesti. Äänitallenne säilyy vain laitteellesi lataamalla.",
  },
 },
 {
  id:"L060",title:"Mitä osaan nyt saksaksi?",
  objective:"Katselmoin jokaisen 10 kappaleen tavoitteen, arvioin vähintään viisi sanakorttia ja vahvistan seuraavan oman harjoittelutavoitteeni.",
  estimatedMinutes:30,contentVersion:"1.0.0",
  steps:[
   {id:"goals",label:"Käy läpi kaikki 10 osaamistavoitetta",chapter:null,section:"summary",minutes:10,
    instruction:"Avaa kirjan Yhteenveto. Käy läpi kappaleiden C01–C10 kymmenen tavoitetta yksi kerrallaan. Merkitse jokainen katselmoiduksi riippumatta siitä, osaatko sen vielä. Tämä on oma taitojen katselmointi, ei valheellinen A1-todistus eikä pelkkä loppukokeen pistelukema.",
   },
   {id:"recall",label:"Kertaa viisi todellista sanakorttia",chapter:null,section:"summary",minutes:12,
    instruction:"Avaa yhteenvetosivun sanakorttilinkki ja arvioi kirjan sanastossa vähintään viisi eri sanakorttisuuntaa muistamisen mukaan. Palaa yhteenvetoon ja vahvista kertaus vasta, kun vähintään viisi oikeaa arviointimerkintää näkyy tällä laitteella. Älä merkitse kortteja muistetuiksi kokeilematta niitä itse.",
   },
   {id:"goal",label:"Kirjoita oma seuraava tavoitteesi",chapter:null,section:"summary",minutes:4,
    instruction:"Kirjoita yhteenvetosivulle vähintään 25 merkin konkreettinen seuraava saksan tavoite, vahvista se erillisellä painikkeella ja valitse oma sanallinen kokonaisarviosi. Jos loppukoe on palautettu, tarkastele sen eri osioiden pisteitä erillään tavoitteistasi.",
   },
  ],
  evidence:[
   {kind:"answered-practice",
    ids:Array.from({length:10},(_,i)=>"EX-SUMMARY-C"+String(i+1).padStart(2,"0")),
    label:"Kaikki kymmenen C01–C10-taitotavoitetta katselmoitu itsearviointina."},
   {kind:"answered-practice",ids:[LOS1_SUMMARY_CARDS,LOS1_SUMMARY_GOAL,"EX-SUMMARY-GOAL-OK",LOS1_SUMMARY_REFLECTION],
    label:"Vähintään viisi sanakorttia arvioitu ja vahvistettu, seuraava tavoite sekä itsearvio kirjattu."},
  ],
  check:{
   question:"Mikä kolmesta kuvaa parhaiten LOS! 1:n osaamisen yhteenvetoa?",
   answers:[
    {id:"a",text:"Pisteet ovat oma A1-kielitaitotodistus."},
    {id:"b",text:"Oppituntien avaaminen todistaa itsenäisen puheosaamisen."},
    {id:"c",text:"Koetulos, tehdyt oppitunnit ja oma muistin arvio pidetään erillään."},
   ],
   correctId:"c",
   explanation:"Yhteenveto kokoaa erikseen oppimisen etenemisen, objektiiviset pisteet ja itse arvioidun viivästetyn muistamisen, eikä lupaa virallista kielitasoa.",
  },
 },
];
