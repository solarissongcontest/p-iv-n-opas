import type {LosLessonBlueprint} from "./lessonEngine";

/**
 * Full chapter-specific working lessons: three for C08, two for C10.
 * All IDs are the original LOS! 1 60-lesson canon. Authentic C08 reading is
 * M-WB-08 (complete Wikibooks Schule scene); C10 reading is M-DIB-02.
 * Sources are editable previews with QA gates still open. No audio/video
 * playback is counted as observed. For free productive work, completion
 * requires an actual nontrivial draft, but does not certify language quality.
 */
export const LOS1_C08_C10_COMPLETION_LESSONS:readonly LosLessonBlueprint[]=[
 {
  id:"L042",title:"Luokkatilanteen alkuperäisteksti",
  objective:"Luen kokonaisen alkuperäisen koulukohtauksen ja tunnistan opettajan tervehdyksen, tunnit ja tilanteen pääasiat ilman vaikean kieliopin tuottamista.",
  estimatedMinutes:30,contentVersion:"1.0.0",
  steps:[
   {id:"source",label:"Lue koko alkuperäinen koulukohtaus",chapter:"08",section:"text",minutes:12,
    instruction:"Avaa C08:n Text A, Wikibooksin German/Level I/Schule -kohtaus. Lue kaikki 26 tekstiyksikköä, myös kertojan selitteet ja taululaskut. Käytä suomennoksia vasta oman yrityksesi jälkeen. Kohtauksen kieli ylittää A1-tuottamistason; keskity vain tuttuihin tervehdyksiin ja lukusanoihin."},
   {id:"reading",label:"Tarkista kolme sisällönymmärtämiskysymystä",chapter:"08",section:"understand",minutes:10,
    instruction:"Avaa C08:n ymmärtämissivu, vastaa C08-SCHOOL-Q01, Q02 ja Q03 ja paina jokaisen tehtävän Tarkista vastaus. Etsi tekstistä Mathe, Guten Morgen ja Musik. Tässä ei kuunnella testaamatonta ääntä eikä tehdä päätelmiä saksan puheenymmärtämisestä."},
   {id:"locate",label:"Löydä opettajan repliikki",chapter:"08",section:"understand",minutes:4,
    instruction:"Valitse tekstikohdan tarkistus C08-SOURCE-EVIDENCE-01 ja tarkista, missä opettaja sanoo Sehr gut, Florian! Kirjoita omiin muistiinpanoihin yksi sana, joka auttoi ymmärtämään tilanteen. Tämä on lukemisen näyttö, ei tuottamiskieliopin tai kuuntelun pisteytys."},
  ],
  evidence:[{kind:"checked-source",ids:["C08-SCHOOL-Q01","C08-SCHOOL-Q02","C08-SCHOOL-Q03","C08-SOURCE-EVIDENCE-01"],
   label:"Kolme alkuperäistekstin kysymystä ja yksi suora tekstikohta tarkistettu."}],
  check:{question:"Miten opettaja ja luokka tervehtivät toisiaan alkuperäisessä kohtauksessa?",
   answers:[{id:"a",text:"Gute Nacht!"},{id:"b",text:"Guten Morgen!"},{id:"c",text:"Bis morgen!"}],
   correctId:"b",explanation:"Sekä opettaja että oppilaat sanovat Guten Morgen! L042:n näyttö koskee luetun ymmärtämistä; erillinen kuuntelu odottaa oikeaa äänitettä."},
 },
 {
  id:"L044",title:"Harjoittele vuorovaikutusta",
  objective:"Kirjoitan kolme omaa luokkahuoneen avunpyyntöä eri tilanteisiin ja vertaan niitä tuttuihin alkuperäisfraaseihin.",
  estimatedMinutes:30,contentVersion:"1.0.0",
  steps:[
   {id:"observe",label:"Tutki luokkatilanteen esimerkkiä",chapter:"08",section:"text",minutes:8,
    instruction:"Avaa C08:n koko alkuperäisteksti. Etsi opettajan ja luokan Guten Morgen sekä opettajan Sehr gut. Lue sanat ääneen itse. Mahdollinen Text B -videolähde on vielä tarkistamatta, joten videon avaaminen ei ole pakollinen osa harjoitusta eikä sitä väitetä katsotuksi."},
   {id:"write",label:"Kirjoita kolme erilaista avunpyyntötilannetta",chapter:"08",section:"apply",minutes:12,
    instruction:"Avaa C08:n Käytä saksaa -sivu ja kirjoita omat lyhyet dialogit A, B ja C: en ymmärrä; pyydän toistamaan; pyydän selittämään sanan. Käytä Ich verstehe nicht, Noch einmal, bitte ja Was bedeutet das? tarkoituksenmukaisesti. Tallenna vähintään 80 merkkiä omaa tekstiä. Mallivastausta ei saa avata ennen omaa yritystä."},
   {id:"transfer",label:"Tarkista kaksi tilanteeseen sopivaa fraasia",chapter:"08",section:"practice",minutes:6,
    instruction:"Vastaa C08-EX-07 ja C08-EX-08 ilman fraasilistaa. Vertaa vasta sitten omaan dialogitekstiisi ja huomaa, mikä avunpyyntö sopisi nopeaan luokkatilanteeseen. Harjoitusta ei pisteytetä ääntämis- eikä kuulotestinä."},
  ],
  evidence:[
   {kind:"answered-practice",ids:["C08-EX-07","C08-EX-08"],label:"Kaksi C08:n tilannefraasitehtävää vastattu."},
   {kind:"written-application",label:"Ainakin 80 merkin oma C08-luokkadialogien teksti tallennettu; kielioppi itsearvioidaan."},
  ],
  check:{question:"Opettaja puhuu liian nopeasti. Mikä pyyntö sopii parhaiten?",
   answers:[{id:"a",text:"Bitte langsamer."},{id:"b",text:"Ich heiße Mia."},{id:"c",text:"Bis morgen."}],
   correctId:"a",explanation:"Bitte langsamer. pyytää puhumaan hitaammin. Oma puhe harjoitellaan ääneen, mutta sitä ei konepisteytetä."},
 },
 {
  id:"L045",title:"Harjoittele ja testaa C08",
  objective:"Palautan C08:n aidon kappaletestin, osoitan luetun ymmärtämisen lähdetekstistä ja kirjaan itsearvioinnin.",
  estimatedMinutes:30,contentVersion:"1.0.0",
  steps:[
   {id:"recall",label:"Palauta mieleen neljä avunpyyntöä",chapter:"08",section:"vocabulary",minutes:7,
    instruction:"Kertaa C08:n sanastosta neljä fraasia ilman näkyviä suomennoksia: Ich verstehe nicht, Noch einmal, bitte, Bitte langsamer ja Was bedeutet das? Tarkista vasta oman yrityksen jälkeen ja kirjoita yksittäiset epävarmat sanat muistiinpanoihin."},
   {id:"test",label:"Vastaa koko C08:n kappaletestiin ja palauta se",chapter:"08",section:"test",minutes:15,
    instruction:"Avaa C08:n kappaletesti ja täytä kaikki sen yksiselitteisesti pisteytettävät fraasi- ja muototehtävät ennen Palauta testi -painiketta. Pisteet mittaavat vain tunnistettua alkeissanastoa, eivät lukemisen tai autenttisen puheen kokonaisosaamista."},
   {id:"reflect",label:"Kirjaa oma puhe- ja lukuhavainto",chapter:"08",section:"test",minutes:4,
    instruction:"Palautuksen jälkeen täytä saman C08-kappaletestisivun itsearviointikenttä: minkä avunpyynnön osasit ilman mallia, mikä jäi epävarmaksi ja mitä kertailet seuraavaksi? Kirjoita vähintään 15 merkkiä omaa arviota. Avaa tarvittaessa myös C08:n alkuperäistekstin kysymykset uudelleen."},
  ],
  evidence:[
   {kind:"chapter-test",label:"Koko C08:n kappaletesti on palautettu."},
   {kind:"self-assessment",label:"Oma C08-taitojen sanallinen itsearvio (vähintään 15 merkkiä) tallennettu."},
  ],
  check:{question:"Mitä tarkoittaa Noch einmal, bitte?",
   answers:[{id:"a",text:"En tiedä."},{id:"b",text:"Vielä kerran, kiitos."},{id:"c",text:"Mikä sinun nimesi on?"}],
   correctId:"b",explanation:"Noch einmal, bitte. on toistamispyyntö, joka toimii myös silloin kun ymmärtäminen keskeytyy kesken luokkatilanteen."},
 },
 {
  id:"L054",title:"Rakenna kaksi keskustelua",
  objective:"Tuotan kaksi omia fraaseja soveltavaa du- ja Sie-kohtaamista sekä esittelen kolmannen kuvitteellisen henkilön.",
  estimatedMinutes:30,contentVersion:"1.0.0",
  steps:[
   {id:"model",label:"Lue aito kohtaamismalli",chapter:"10",section:"text",minutes:8,
    instruction:"Avaa C10:n koko Haraldin alkuperäinen esittelyhaastattelu ja etsi nimi, lähtöpaikka ja ikä. Tarkista sanat tarvittaessa sanalukijasta. Haastattelun vaikeaa kulttuurista selitystä ei tarvitse jäljitellä. Äänitettä ei ole vahvistettu, joten tämä vaihe on lukemista."},
   {id:"write",label:"Kirjoita kaksi 6–8 repliikin kohtaamista",chapter:"10",section:"apply",minutes:12,
    instruction:"Avaa C10:n Käytä saksaa. Kirjoita kaksi erillistä A- ja B-keskustelua (kumpikin 6–8 repliikkiä), ensin nuorten du-kohtaaminen ja sitten opettajan Sie-kohtaaminen. Kirjoita lisäksi neljän virkkeen kuvitteellisen kolmannen henkilön esittely. Tallenna vähintään 80 merkkiä omaa tekstiä, älä oikeita yhteystietoja."},
   {id:"grammar",label:"Kertaa er/sie ja oikeat verbimuodot",chapter:"10",section:"practice",minutes:6,
    instruction:"Tarkista C10-EX-08 ja C10-EX-10 sekä lue omat keskustelut ääneen. Varmista ensin sinuttelun ja kohteliaisuuden ero. Jos oma vastaus poikkeaa mallista, arvioi se käsin: kone ei pysty vahvistamaan improvisoitua puhetta automaattisesti."},
  ],
  evidence:[
   {kind:"answered-practice",ids:["C10-EX-08","C10-EX-10"],label:"Kaksi C10:n muoto- ja puhuttelutehtävää vastattu."},
   {kind:"written-application",label:"C10:n oma kaksi-dialogia-soveltaminen on tallennettu, vähintään 80 merkkiä; laatua arvioidaan itse."},
  ],
  check:{question:"Kysyt kohteliaasti opettajalta hänen nimeään. Miten sanot?",
   answers:[{id:"a",text:"Wie heißt du?"},{id:"b",text:"Ich heiße Mia."},{id:"c",text:"Wie heißen Sie?"}],
   correctId:"c",explanation:"Kohtelias kysymys on Wie heißen Sie? Nuorten tuttavallinen muoto on Wie heißt du?"},
 },
 {
  id:"L055",title:"Harjoittele ja testaa C10",
  objective:"Palautan kymmenennen kappaleen kokonaisen äänettömän alkeismuotojen kappaletestin ja arvioin, mitä osaan itsenäisessä esittelyssä.",
  estimatedMinutes:30,contentVersion:"1.0.0",
  steps:[
   {id:"review",label:"Kertaa nimi, alkuperä ja kolmas persoona",chapter:"10",section:"grammar",minutes:7,
    instruction:"Kertaa C10:n kieliopista ich heiße, du heißt, er/sie heißt, er/sie kommt ja er/sie ist. Lue uudelleen aiempi oma kahden keskustelun tekstisi ja varmista, että käytät sinuttelua ja kohteliaisuutta eri tilanteissa."},
   {id:"submit",label:"Palauta C10:n kappaletesti",chapter:"10",section:"test",minutes:15,
    instruction:"Tee C10:n kappaletestin kaikki monivalinta- ja täydennystehtävät ilman näkyviä vastauksia. Palauta testi vasta kaikkien osatehtävien valmistuttua. Kokeen automaattinen pisteytys ei kata Haraldin alkuperäisen äänen ymmärtämistä eikä omaa puhetta."},
   {id:"reflection",label:"Arvioi oma esittelysi",chapter:"10",section:"test",minutes:4,
    instruction:"Kappaletestin palautuksen jälkeen kirjoita C10:n itsearviointiin vähintään 15 merkkiä: mitä osasit lausua ilman mallia ja minkä persoonamuodon haluat kerrata. Vertaa itse myös C10:n Käytä saksaa -sivun kaksi-dialogia-harjoitusta mallitekstiin."},
  ],
  evidence:[
   {kind:"chapter-test",label:"C10:n kappaletesti kokonaisuudessaan palautettu."},
   {kind:"self-assessment",label:"Itse arvioitu C10:n esittely ja kielioppiosaaminen tallennettu."},
  ],
  check:{question:"Millä lauseella esittelet kolmannen henkilön, joka on kotoisin Suomesta?",
   answers:[{id:"a",text:"Sie komme aus Finnland."},{id:"b",text:"Sie kommt aus Finnland."},{id:"c",text:"Du kommt aus Finnland."}],
   correctId:"b",explanation:"Er/sie tulee kommen-verbin kommt-muodon kanssa. Tämä arvioi vain kirjoitettua muotoa, ei autenttisen puheen ymmärtämistä."},
 },
];
