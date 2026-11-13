import type {TeacherLesson,TeacherScene,TeacherQuestion} from "./engine.ts";

/**
 * LOS! 1 L056–L060: Teacher 2.0 review, final assessment and summary.
 *
 * Review II (15 checked practice items), EX-FINAL (50 objectively scored items
 * plus separate unscored writing/recording) and the ten-goal summary already
 * exist in the textbook. The Teacher must link to those canonical pages and
 * NEVER invent extra points, official CEFR levels, recordings or listening.
 * All teaching explanations/dialogues here are original teacher scaffolding.
 */
const version="2.0.0-preview.1";
const start=(title:string,...paragraphs:string[]):TeacherScene=>({
  id:"welcome",phase:"Aloitus",kind:"introduction",title,paragraphs});
const explain=(id:string,title:string,...paragraphs:string[]):TeacherScene=>({
  id,phase:"Opettajan selitys",kind:"explanation",title,paragraphs});
const board=(id:string,title:string,paragraphs:string[],
  items:NonNullable<TeacherScene["board"]>):TeacherScene=>({
    id,phase:"Mallisuoritus",kind:"board",title,paragraphs,board:items});
const choice=(id:string,title:string,intro:string,prompt:string,
  options:[string,string,string],right:"a"|"b"|"c",success:string,why:string,
  role:TeacherQuestion["evidenceRole"]="practice"):TeacherScene=>({
    id,phase:id==="exit"?"Lopputarkistus":"Harjoittele ja päättele",
    kind:"question",title,paragraphs:[intro],
    question:{
      type:"choice",skillId:"L1-INT-10",prompt,
      options:options.map((label,i)=>({id:(["a","b","c"] as const)[i]!,label})),
      correctOption:right,success,
      hint:"Mieti, mitä viestin vastaanottaja ymmärtää ja mitä olet jo oppinut aiemmissa kappaleissa.",
      reteach:why,genericWrong:why,evidenceRole:role,
    },
  });
const writing=(id:string,title:string,paragraphs:string[],prompt:string,
  placeholder:string,minLength:number,activityId?:string,activityLabel?:string):TeacherScene=>({
    id,phase:"Oma harjoittelu",kind:"reflection",title,paragraphs,
    reflection:{prompt,placeholder,minLength},
    ...(activityId?{activityId,...(activityLabel?{activityLabel}:{})}:{})
  });
const visit=(id:string,title:string,paragraphs:string[],links:
  NonNullable<TeacherScene["bookLinks"]>,activityId?:string,activityLabel?:string):TeacherScene=>({
  id,phase:"Kirjan tehtävät",kind:"book",title,paragraphs,bookLinks:links,
  ...(activityId?{activityId,...(activityLabel?{activityLabel}:{})}:{})
});
const done=(title:string,...paragraphs:string[]):TeacherScene=>({
  id:"summary",phase:"Yhteenveto",kind:"summary",title,paragraphs});
const link=(chapterId:string,section:string,label:string,instruction:string)=>({
  chapterId,section,label,instruction
});
const reviewLink=link("92","review-ii","Avaa Kertaus II",
  "Valitse oman oppituntisi L056, L057 tai L058 -osio. Vastaa kaikkiin viiteen kysymykseen, tarkista jokainen ja kirjaa oma arvio.");

export const LOS1_L056_TEACHER:TeacherLesson={
  id:"L056",bookId:1,chapterId:"92",version,
  title:"Luvut, tavaaminen ja viikonpäivät",
  objective:"Muistan lukusanat 16, 17, 21 ja 32 ja osaan kertoa iän sekä tunnistan, mitä pitää vielä harjoitella.",
  estimatedMinutes:30,
  bookEvidence:{kind:"review-ii",group:"L056"},
  requiredQuestionIds:["recall","guided","independent","exit"],
  requiredActivityIds:["number-check","review-done"],
  requiredPracticeIds:[],
  scenes:[
    start("Kertaus II alkaa muistista, ei sanakirjasta",
      "Nyt käytät jo opittua saksaa uudelleen. Et opi uutta lukusanasääntöä vaan kokeilet, mitä pystyt palauttamaan ilman mallia.",
      "Kertaus II:ssa on yhteensä 15 tarkistettavaa tehtävää. Tämä oppitunti käyttää niistä viittä ensimmäistä. Ne eivät ole loppukokeen pisteitä.",
      "Kirjaa myös se, mikä vielä tuntuu hankalalta. Kertaaminen ei ole epäonnistumisen merkki, vaan tapa saada sanat pysymään muistissa."),
    choice("recall","Muistatko 17:n?","Aloita ilman sanalistaa.",
      "Mikä on seitsemäntoista saksaksi?",
      ["siebzehn","siebenzehn","siebzig"],"a",
      "Siebzehn on oikein: sanan sieben loppu lyhenee.",
      "17 on siebzehn. Siebzig tarkoittaa seitsemääkymmentä.","independent"),
    explain("structure","Miksi 21 sanotaan eri järjestyksessä?",
      "Saksassa kaksinumeroisten lukujen 21–99 (tasakymmeniä lukuun ottamatta) ykköset sanotaan ennen kymmeniä: ein + und + zwanzig.",
      "Luvuissa 16 ja 17 on lisäksi kirjoitusasun lyhennys: sechzehn, siebzehn. Niitä ei päätellä suoraan kirjoittamalla sechszehn tai siebenzehn.",
      "Lukusanan muodon muistaminen auttaa myös C07:n numerojonoissa ja C09:n kellonajoissa."),
    board("number-board","Lukujen muodostus vaiheittain",[
      "Näytä malli yksi rivi kerrallaan. Sano joka kerta ensin saksaksi ja sitten suomeksi.",
      "Huomaa ero luvun 16 ja luvun 60 välillä: sechzehn ja sechzig eivät ole sama sana.",
    ],[
      {label:"16",german:"sechzehn",meaning:"kuusitoista · ei sechszehn"},
      {label:"17",german:"siebzehn",meaning:"seitsemäntoista · ei siebenzehn"},
      {label:"21",german:"einundzwanzig",meaning:"yksi + ja + kaksikymmentä"},
      {label:"32",german:"zweiunddreißig",meaning:"kaksi + ja + kolmekymmentä"},
      {label:"Kysymys",german:"Wie alt bist du?",meaning:"Kuinka vanha olet?"},
      {label:"Vastaus",german:"Ich bin siebzehn Jahre alt.",meaning:"Olen seitsemäntoista vuotta vanha."},
    ]),
    choice("guided","Tarkista luvun rakenne","Katso mallia tarvittaessa ja ajattele ykköset ennen kymmeniä.",
      "Mikä vaihtoehto on 32?",
      ["dreißigundzwei","zweiunddreißig","zweidreißig"],"b",
      "Zweiunddreißig on 32: kaksi ja kolmekymmentä.",
      "Kolmekymmentäkaksi rakentuu muodosta zwei + und + dreißig."),
    writing("memory","Tee oma pieni muistitesti",[
      "Sulje hetkeksi näkyvistä mallitaulu. Kirjoita muistiin neljä lukua ja yksi lyhyt ikävastaus.",
      "Tämä on oma muistiinpano. Varsinaiset viisi tarkistettavaa kertaustehtävää tehdään erikseen kirjan Kertaus II -osiossa.",
    ],"Kirjoita saksaksi 16, 17, 21, 32 ja yksi ikävastaus.", 
      "sechzehn ... Ich bin ... Jahre alt.",38,"number-check",
      "Vahvistan tarkistaneeni kaikki viisi ilmausta itse"),
    choice("independent","Sovella samaa sääntöä","Ratkaise ensin muistista.",
      "Mikä lause kysyy tutun ihmisen ikää?",
      ["Wie alt bist du?","Woher kommst du?","Wie heißt du?"],"a",
      "Wie alt bist du? kysyy ikää.",
      "Woher kysyy alkuperää ja Wie heißt du? kysyy nimeä.","independent"),
    visit("review","Tarkista viisi oikeaa kertaustehtävää",[
      "Avaa kirjan Kertaus II. Tee L056-osion tehtävät EX-REV2-Q01–Q05 ja paina jokaiseen Tarkista vastaus.",
      "Näet oikeat ratkaisut ja selitykset kirjan omassa tehtävässä. Kirjaa vielä EX-REV2-SELF-056-arviosi. Väärä vastaus sallitaan, mutta tarkistusta ei saa ohittaa.",
      "Palaa tähän välilehteen tarkistuksen jälkeen. Pelkkä kirjan sivun avaaminen ei riitä.",
    ],[link("06","vocabulary","Kertaa C06:n lukusanasto","Avaa tarvittaessa vasta oman muistiinpalautuksen jälkeen."),reviewLink],
      "review-done","Olen tehnyt ja tarkistanut viisi kirjan tehtävää"),
    choice("exit","Jäikö yksi tärkeä asia mieleen?","Tee lopuksi ilman mallia.",
      "Mikä tarkoittaa 'Olen 17-vuotias'?",
      ["Ich habe siebzehn Jahre.","Ich bin siebzehn Jahre alt.","Ich ist siebzehn Jahre."],"b",
      "Ich bin siebzehn Jahre alt. kertoo iän oikein.",
      "Iän kertomisessa käytetään ich bin ... Jahre alt, ei ich habe.","exit"),
    done("Viisi tarkistusta ja oma muistiarvio",
      "L056 valmistuu vasta, kun olet käynyt opetustilanteet, tehnyt oppitunnin harjoitukset ja kirjannut oikeat viisi tarkistusta sekä oman arvion Kertaus II -sivulle.",
      "Seuraavaksi yhdistetään viikonpäivät, kellonajat, tavaaminen ja kohteliaat avunpyynnöt."),
  ],
};
export const LOS1_L057_TEACHER:TeacherLesson={
  id:"L057",bookId:1,chapterId:"92",version,
  title:"Kaikkien 10 kappaleen taitosekoitus",
  objective:"Yhdistän viikonpäivän, kellonajan ja kohteliaat avunpyynnöt ilman että sekoitan am- ja um-rakenteita.",
  estimatedMinutes:30,bookEvidence:{kind:"review-ii",group:"L057"},
  requiredQuestionIds:["recall","guided","independent","exit"],
  requiredActivityIds:["schedule-practice","review-done"],
  requiredPracticeIds:[],
  scenes:[
    start("Tällä tunnilla fraasit tulevat eri kappaleista",
      "C07 opetti tavaamista, C08 selviytymistä oppimistilanteessa ja C09 viikonpäiviä ja kellonaikoja. Nyt käytät niitä yhdessä.",
      "Tavoitteena ei ole muistaa jokaisen kappaleen sivunumeroa. Tavoitteena on osata valita tilanteessa käyttökelpoinen lyhyt fraasi.",
      "Kertaus II:n L057-osiossa on viisi alkuperäistä harjoitustehtävää ja oma arvio."),
    choice("recall","Mitä muistat viikonpäivistä?","Yritä ilman mallia.",
      "Mikä on keskiviikko saksaksi?",["Mittwoch","Montag","Freitag"],"a",
      "Mittwoch on keskiviikko.",
      "Montag on maanantai, Freitag perjantai.","independent"),
    board("time-board","Am ja um eivät ole sama asia",[
      "Viikonpäivän edessä käytät am. Kellonajan edessä käytät um. Sama tapaaminen tarvitsee joskus molemmat.",
      "Kokeile lukea mallin lopussa oleva pieni tilanne ääneen.",
    ],[
      {label:"Viikonpäivä",german:"am Montag",meaning:"maanantaina"},
      {label:"Kellonaika",german:"um drei Uhr",meaning:"kello kolmelta"},
      {label:"Yhdistä",german:"Am Montag um drei Uhr.",meaning:"Maanantaina kello kolmelta."},
      {label:"Tapaaminen",german:"Bis Montag!",meaning:"Nähdään maanantaina!"},
      {label:"Toistopyyntö",german:"Noch einmal, bitte.",meaning:"Vielä kerran, kiitos."},
      {label:"Tavauspyyntö",german:"Bitte buchstabieren Sie.",meaning:"Tavatkaa, olkaa hyvä."},
    ]),
    choice("guided","Minkä preposition valitset?","Katso am/um-taulua tarvittaessa.",
      "Mikä sopii: Wir treffen uns ___ drei Uhr?",
      ["am","um","aus"],"b",
      "Kellonajan yhteyteen tulee um.",
      "Am liitetään viikonpäivään, um kellonaikaan."),
    explain("help-phrases","Selviät myös, kun et ymmärrä",
      "Et tarvitse pitkiä lauseita pystyäksesi jatkamaan keskustelua. Noch einmal, bitte. pyytää toistamaan ja Bitte langsamer. hidastamaan.",
      "Bitte buchstabieren Sie. pyytää tavaamaan sanan tai nimen. Sie-muoto on kohtelias puhuttelu; du-muotoa käytetään tässä kirjassa tutuille ja ikätovereille.",
      "Harjoittele valitsemaan avunpyyntö sen mukaan, mikä vaikeus tuli vastaan: et kuullut, et ehtinyt ymmärtää vai et tunne kirjaimia."),
    writing("schedule","Kirjoita pieni tapaamisdialogi",[
      "Keksi kahden tutun henkilön kohtaaminen: toinen ehdottaa aikaa, toinen kysyy kohteliaasti tarkennusta ja lopuksi sovitaan tapaaminen.",
      "Saat käyttää lyhyitä alkeisfraaseja. Tarkista itse erikseen am ja um.",
    ],"Kirjoita vähintään kolme puheenvuoroa tapaamisesta ja käytä kerran am sekä um.",
      "Mia: Am Montag?\nLeo: Um drei Uhr.\nMia: Gut, bis Montag!",60,
      "schedule-practice","Tarkistin ajanilmaukset omasta keskustelustani"),
    choice("independent","Mitä sanoisit, jos et kuule nimeä?","Tunnista kohtelias tavauksen pyyntö.",
      "Mikä ilmaus pyytää tavaamaan nimen?",[
        "Bitte buchstabieren Sie.","Wie geht's?","Ich bin zwölf."],"a",
      "Bitte buchstabieren Sie. pyytää tavaamaan.",
      "Tässä sana buchstabieren tarkoittaa tavaamista.","independent"),
    visit("review","Tee L057:n alkuperäiset viisi tehtävää",[
      "Kirjan Kertaus II:ssa L057 vastaa EX-REV2-Q06–Q10-tehtäviin. Tarkista jokainen ja valitse sen jälkeen EX-REV2-SELF-057-arvio.",
      "Näet saman tallentuneen tuloksen palatessasi tänne. Tehtävät ovat kertausta, eivät loppukokeen 50 pistettä.",
    ],[link("07","vocabulary","Kertaa C07:n tavaaminen","Tarkista tavaamiseen liittyvä sanasto."),link("09","vocabulary","Kertaa C09:n ajanilmaukset","Käy läpi viikonpäivät ja tasatunnit."),reviewLink],
      "review-done","Olen tarkistanut viisi oikeaa kertaustehtävää"),
    choice("exit","Kokoa päivä ja aika","Mieti, missä järjestyksessä prepositiot tulevat.",
      "Mikä vastaa 'maanantaina kello kolmelta'?",[
        "Um Montag am drei Uhr.","Am Montag um drei Uhr.","Am Montag in drei Uhr."],"b",
      "Am Montag um drei Uhr yhdistää päivän ja kellonajan.",
      "Viikonpäivän kanssa am, kellonajan kanssa um.","exit"),
    done("L057:n taitosekoitus tehty",
      "L057:n suoritusmerkintä edellyttää viittä kirjan tarkistusta ja omaa arviota. Pelkkä oikea monivalinta tässä opettajanäkymässä ei korvaa kirjan tehtäviä.",
      "L058:ssa teet omaa saksankielistä esittelyä ilman valmiin mallin kopiointia."),
  ],
};
export const LOS1_L058_TEACHER:TeacherLesson={
  id:"L058",bookId:1,chapterId:"92",version,
  title:"Täydellinen esittelyharjoitus ilman vihjeitä",
  objective:"Kirjoitan itse 5–7 lauseen kuvitteellisen esittelyn, tarkistan viisi kertaustehtävää ja arvioin itsenäisyyttäni.",
  estimatedMinutes:30,bookEvidence:{kind:"review-ii",group:"L058"},
  requiredQuestionIds:["recall","guided","independent","exit"],
  requiredActivityIds:["original-intro","review-done"],
  requiredPracticeIds:[],
  scenes:[
    start("Viimeinen harjoitus ennen EX-FINAL-koetta",
      "Tässä kokoat tuttuja asioita yhteen. Kirjoitat itse esittelyn, jossa on nimi, ikä, lähtömaa ja kuvitteellinen toinen henkilö.",
      "Kirjan Kertaus II:ssa L058:lla on viisi tarkistettavaa tehtävää sekä oma 5–7 lauseen kirjoitusyritys ja itsearvio.",
      "Et saa automaattista kielioppipistettä omasta tekstistäsi. Siksi tarkistat sen oppimasi taulukon ja tarkistuslistan avulla."),
    choice("recall","Mikä on kolmannen persoonan muoto?","Muista nimiin liittyvät ich, du ja sie -muodot.",
      "Miten kerrot, että kuvitteellisen ystävän nimi on Mia?",
      ["Sie heiße Mia.","Sie heißt Mia.","Sie heißen Mia."],"b",
      "Sie heißt Mia. on hän-muoto.",
      "Heiße kuuluu ich-muotoon, heißt du/er/sie-muotoon; kohtelias Sie käyttää heißen.","independent"),
    board("intro-board","Rakenna esittely askel askeleelta",[
      "Seuraavat esimerkit näyttävät, missä järjestyksessä voi edetä. Älä kopioi niitä suoraan omaan tehtävään, vaan käytä eri kuvitteellista nimeä ja taustatietoja.",
      "Tee oma versiosi 5–7 lyhyenä lauseena. Sen tarkoitus on näyttää, mitä saat jo aikaan ilman näkyvää mallia.",
    ],[
      {label:"Tervehdys",german:"Hallo!",meaning:"Tervehdin."},
      {label:"Nimi",german:"Ich heiße Lena.",meaning:"Kerron oman nimen."},
      {label:"Alkuperä",german:"Ich komme aus Finnland.",meaning:"Kerron lähtömaan."},
      {label:"Ikä",german:"Ich bin siebzehn Jahre alt.",meaning:"Kerron iän."},
      {label:"Ystävä",german:"Das ist Max. Er heißt Max.",meaning:"Esittelen toisen henkilön."},
      {label:"Lopetus",german:"Bis morgen!",meaning:"Päätän tapaamisen."},
    ]),
    choice("guided","Erota minä ja hän","Kun kertoja vaihtuu, myös verbi vaihtuu.",
      "Mikä lause on kieliopillisesti oikein?",[
        "Er komme aus Berlin.","Er kommt aus Berlin.","Er kommst aus Berlin."],"b",
      "Er kommt aus Berlin. kertoo, mistä hän on kotoisin.",
      "Kolmannessa persoonassa kommen on kommt.","practice"),
    explain("writing-plan","Mitä tarkistan omasta tekstistä?",
      "Varmista itse, että kirjoitit 5–7 omaa lausetta. Älä kirjoita oikeita nimi- tai yhteystietoja.",
      "Tarkista pronominit ja verbit: ich heiße, ich bin, ich komme, er/sie heißt, er/sie ist, er/sie kommt.",
      "Kun käytät viikonpäivää tai kellonaikaa, valitse am Montag ja um drei Uhr. Sano esittely ääneen, mutta älä tulkitse lukemista automaattiseksi puhenäytöksi."),
    choice("independent","Yhdistä iän kertominen oikein","Tämä kysymys ei ole yksi EX-FINAL:n 50 arvioitavasta tehtävästä.",
      "Mikä ilmaisee iän 17 oikein?",[
        "Er hat siebzehn Jahre.","Er sind siebzehn Jahre.","Er ist siebzehn Jahre alt."],"c",
      "Er ist siebzehn Jahre alt. on oikea esittelylause.",
      "Iän kertomiseen kuuluu sein-verbi ja Jahre alt.","independent"),
    writing("own-intro","Valmistele oma riippumaton esittely",[
      "Piilota mallitaulu ja kirjoita kuvitteelliselle henkilölle oma esittely. Tästä tekstistä jää oma harjoitusmuistiinpano.",
      "Kirjoita lopullinen 5–7 lauseen versio vielä kirjan Kertaus II -sivun L058-kenttään, sillä suoritusmerkintä tarkistaa nimenomaan sen alkuperäisen kentän.",
    ],"Kirjoita oma esittely ja tarkista siinä viisi eri asiaa: nimi, alkuperä, ikä, toinen henkilö ja sopiva lopetus.",
      "Hallo! Ich heiße ... Ich komme aus ...",80,
      "original-intro","Tarkistin oman esittelyni ilman automaattista arvosanaa"),
    visit("review","Viisi alkuperäistä kysymystä ja oma esittely",[
      "Avaa Kertaus II ja tee L058:n kysymykset EX-REV2-Q11–Q15. Tarkista kaikki viisi.",
      "Kirjoita erikseen EX-REV2-WRITING-058-kenttään oma, vähintään 80 merkin 5–7 lauseen esittely. Valitse EX-REV2-SELF-058-arviosi.",
      "Lopullinen 50 tehtävän loppukoe on erillinen. Nämä viisi kertauskysymystä eivät muutu koepisteiksi.",
    ],[link("10","grammar","Kertaa kolmannen persoonan muodot","Lue selitykset ennen lopullista itsearviota tarvittaessa."),reviewLink],
      "review-done","Tarkistin viisi tehtävää ja kirjallisen esittelyni"),
    choice("exit","Viimeinen oma tarkistus","Tiedät nyt, mitä oppikirjan loppukoe mittaa ja mitä se ei mittaa.",
      "Mikä näistä on oikea itsearvioinnin periaate?",[
        "Vapaasta kirjoituksesta saa automaattisesti A1-todistuksen.",
        "Voin merkitä esittelyn tarkistetuksi, mutta sen kielioppia ei konepisteytetä.",
        "Opettajan mallin kopiointi on itsenäinen suoritus."],"b",
      "Oma kirjallinen tuotos ja automaattisesti pisteytettävä tehtävä ovat eri asioita.",
      "Älä väitä vapaata tekstiä koneellisesti tarkistetuksi.","exit"),
    done("Kertaus II valmis, kun kolme osiota ovat oikeasti kirjassa",
      "L058 valmistuu, kun sen viisi tarkistusta, oma esittely ja itsearvio löytyvät oikeasta Kertaus II -tallennuksesta.",
      "Seuraavaksi EX-FINAL arvioi 50 tehtävää. Vapaa puhe ja kirjoittaminen tehdään erillään noista pisteistä."),
  ],
};
export const LOS1_L059_TEACHER:TeacherLesson={
  id:"L059",bookId:1,chapterId:"93",version,
  title:"Koko kirjan loppukoe",
  objective:"Teen kirjan oikean 50-kohtaisen loppukokeen, varmistan kaksi alkuperäisäänitettä ja arvioin oman kirjoitus- ja puheharjoitteluni erikseen.",
  estimatedMinutes:80,bookEvidence:{kind:"final-exam"},
  requiredQuestionIds:["recall","guided","independent","exit"],
  requiredActivityIds:["exam-plan","honest-review"],
  requiredPracticeIds:[],
  scenes:[
    start("Tämä ei ole uusi harjoitusmonivalinta vaan oikea loppukoe",
      "Kirjan EX-FINAL sisältää 50 alkuperäistä pisteytettävää tehtävää. Opettajanäkymä ohjaa niiden tekemiseen, mutta ei näytä vastausavainta tai korvaa koetta.",
      "Lisäksi kirjoitat 5–7 saksankielistä lausetta ja äänität 6–8 puheenvuoron kuvitteellisen keskustelun. Niistä ei tule koneellisia pisteitä.",
      "Varaa kokeeseen rauhallinen aika. Vastausten tallennus ja äänen toimivuus ovat tärkeämpiä kuin ajastin."),
    choice("recall","Mistä loppukokeen tulos muodostuu?","Älä sekoita kertausta ja koetta.",
      "Montako automaattisesti pisteytettävää tehtävää EX-FINAL sisältää?",
      ["15","50","60"],"b",
      "50 tehtävää on oikea määrä. Niistä jokainen antaa enintään yhden pisteen.",
      "Loppukokeessa on 12 kuuntelua, 10 lukemista, 10 sanastoa, 10 muotoa ja 8 arkitilannetta.","independent"),
    board("exam-plan-board","Miten varmistat, että teet oikean kokeen?",[
      "Kirjan koekysymysten sisältöä ei opeteta etukäteen tällä taululla. Tämä on tekninen ja opiskelutapaa koskeva tarkistuslista.",
    ],[
      {label:"Kuuntelu",german:"12 Aufgaben",meaning:"Kaksi alkuperäisäänitettä; molempien on toistuttava loppuun."},
      {label:"Lukeminen",german:"10 Aufgaben",meaning:"Lähdetekstit ovat kirjan loppukoenäkymässä."},
      {label:"Sanasto",german:"10 Aufgaben",meaning:"Omat muistista tehdyt vastaukset."},
      {label:"Kielioppi",german:"10 Aufgaben",meaning:"Persoonamuodot ja yksinkertaiset rakenteet."},
      {label:"Tilanteet",german:"8 Aufgaben",meaning:"Valitse käyttötilanteeseen sopiva ilmaus."},
      {label:"Oma viesti",german:"5–7 Sätze",meaning:"Vähintään 80 merkkiä; kirjoitusyritys vahvistetaan itse."},
      {label:"Oma puhe",german:"6–8 Sprechzüge",meaning:"Äänite ladataan omalle laitteelle; laatu itsearvioidaan."},
    ]),
    explain("media-safety","Jos ääni ei toimi, kuuntelupisteitä ei keksitä",
      "Loppukokeessa käytetään kahta oikeaa Commons-äänitettä, M-COM-01 ja M-COM-02. Molempien toiston pitää päättyä selaimessa ennen palautusta.",
      "Äänitiedostojen teknistä toimivuutta kaikilla laitteilla ei vielä ole varmistettu. Jos selain antaa virheen, keskeytä palautus ja jatka vasta toimivalla alkuperäisäänellä.",
      "Pelkkä alkuperäistekstin lukeminen ei korvaa kuuntelua. Lähde- ja julkaisuoikeuksien lopullinen auditointi on edelleen erillinen julkaisuvaatimus."),
    choice("guided","Tunnista koemerkinnän oikea periaate","Mieti, mitä selain todella pystyy todentamaan.",
      "Mikä toiminta antaa luvallisen kuuntelun suoritusmerkinnän?",[
        "Painoin play-nappia, vaikka toisto ei alkanut.",
        "Luin litteraatin ja arvasin vastaukset.",
        "Kuuntelin molemmat oikeat äänitteet loppuun ja selain tallensi päättymismerkinnät."],"c",
      "Molempien alkuperäisäänitteiden päättymismerkinnät tarvitaan.",
      "Kuullunymmärtäminen ei synny kuuntelematta; toiston loppuminen on tekninen ehto, ei ääntämisen tai ymmärtämisen laatutodistus."),
    writing("exam-plan","Valmistaudu itsenäiseen kokeeseen",[
      "Kirjoita itsellesi lyhyt toteutussuunnitelma. Varmista, että teet 50 tehtävää itsenäisesti ennen palautusta.",
      "Älä kirjoita tähän koevastauksia tai äänitteen litteraattia. Vastauskentät ovat vain kirjan EX-FINAL-sivulla.",
    ],"Kirjaa, miten varmistat äänen, tallennuksen, 50 tehtävää ja oman puhe-/kirjoitusarvion.",
      "Kuuntelen molemmat alkuperäisäänet ...",60,
      "exam-plan","Vahvistan tietäväni kokeen tekniset ehdot"),
    choice("independent","Erota automaattiset pisteet ja oma tuotos","Tämä on arviointitavan ymmärtämistä, ei koekysymys.",
      "Miten oma äänitetty keskustelu pisteytetään?",[
        "Se arvioidaan itse eikä lisätä 50 automaattiseen pisteeseen.",
        "Mikrofoni antaa automaattisesti täydet pisteet.",
        "Se antaa virallisen A1-todistuksen."],"a",
      "Puhe ja kirjoitus jäävät erikseen itse arvioitaviksi.",
      "Tallenteen tekninen lataaminen ei todista puhetaitoa eikä anna kielitasotodistusta.","independent"),
    visit("real-exam","Tee oikea EX-FINAL-koe ja vahvista omat tuotokset",[
      "Avaa kirjan erillinen Loppukoe-sivu. Palauta vasta kun 50/50 vastausta on valittu ja molemmat alkuperäisäänet on kuunneltu loppuun.",
      "Kirjoita 5–7 lausetta omille riveilleen ja vahvista kirjoitusyritys. Äänitä 6–8 puheenvuoroa, käynnistä tallenteen lataus ja tarkista itse, että se tallentui laitteeseesi.",
      "Valitse erillinen puheharjoittelun oma arvio ja kirjoita vähintään 15 merkin sanallinen itsearvio. Näitä ei lasketa kokeen 50 pisteeseen.",
      "Opettajanäkymä tarkistaa kirjasta vain suoritusmerkinnät, ei vapaata kielitaitoasi.",
    ],[link("93","final","Avaa oikea 50 tehtävän loppukoe","Kirjan EX-FINAL käyttää arviointipaikan 93 tallennusta.")],
      "honest-review","Vahvistan itse tarkistaneeni kirjoituksen ja tallenteen"),
    choice("exit","Mitä pisteet tarkoittavat?","Koetulos ja osaamismerkintä ovat eri asioita.",
      "Mikä väite on oikein?",[
        "50/50 on virallinen A1-sertifikaatti.",
        "Kokeen objektiiviset pisteet ja itsearvioitava puhe pidetään erillään.",
        "Pelkkä kirjautuminen merkitsee loppukokeen suoritetuksi."],"b",
      "Opiskelun eteneminen, objektiiviset pisteet ja oma puhe ovat eri mittareita.",
      "LOS! ei myönnä virallista A1-todistusta eikä pisteytä vapaata puhetta.","exit"),
    done("Loppukokeen todellinen suoritustilanne ratkaisee",
      "Opettajanäkymä odottaa oikean EX-FINAL:n kaikkia 50 vastausta, tallennettua palautusta, kahden alkuperäisäänen toiston päättymistä sekä erillisten kirjoitus- ja puheharjoitusten merkintöjä.",
      "Jos jokin puuttuu, oppituntia ei voi merkitä suoritetuksi. Tämä ei poista lähteiden oikeuksien, äänen laitetestauksen tai kielen asiantuntija-arvion julkaisuvaatimuksia."),
  ],
};
export const LOS1_L060_TEACHER:TeacherLesson={
  id:"L060",bookId:1,chapterId:"93",version,
  title:"Mitä osaan nyt saksaksi?",
  objective:"Käyn läpi kaikki kymmenen taitotavoitetta, vahvistan viiden sanakortin oman arvion ja kirjoitan seuraavan konkreettisen tavoitteeni.",
  estimatedMinutes:30,bookEvidence:{kind:"final-summary"},
  requiredQuestionIds:["recall","guided","independent","exit"],
  requiredActivityIds:["self-review","next-goal"],
  requiredPracticeIds:[],
  scenes:[
    start("Viimeinen oppitunti on katselmointi, ei uusi koe",
      "Olet käynyt läpi saksan perusfraaseja, lyhyitä tekstejä, kellonaikoja ja keskustelutilanteita. Nyt katsot, mitkä asiat muistuvat mieleen ja mitä haluat vahvistaa.",
      "Kirjan yhteenveto erottaa kolmen asian merkityksen: tehty työ, oikeat koepisteet ja oma muistamisen arvio.",
      "L060 ei lupaa virallista kielitasoa eikä edellytä täydellistä tulosta loppukokeesta."),
    choice("recall","Erota eteneminen ja osaaminen","Valitse väite, joka ei liioittele näyttöä.",
      "Mitä oppitunnin suoritusmerkintä kertoo?",
      ["Oppitunnin sovitut työvaiheet on tehty.","Puhe on natiivitasoa.","Kaikki sanakortit muistuvat vuoden kuluttua."],"a",
      "Suoritusmerkintä kertoo työvaiheista, ei virallisesta kielitasosta.",
      "Oma pitkäaikainen muistaminen arvioidaan erikseen viivekertauksessa.","independent"),
    board("learning-board","Kymmenen kappaleen osaamisalueet",[
      "Lue läpi, mitä olet harjoitellut. Merkitse oikealla yhteenvetosivulla jokainen tavoitteeksi katselmoiduksi, vaikka vastauksesi olisi 'tarvitsen lisää harjoitusta'.",
      "Tämä ei ole luettelo asioista, jotka sinun pitäisi jo osata täydellisesti.",
    ],[
      {label:"C01–C02",german:"Hallo! Ich heiße ...",meaning:"Tervehtiminen ja nimet"},
      {label:"C03–C04",german:"Woher kommen Sie?",meaning:"Alkuperä ja kohteliaisuus"},
      {label:"C05–C06",german:"Wie geht's? Ich bin ... Jahre alt.",meaning:"Vointi ja ikä"},
      {label:"C07",german:"Bitte buchstabieren Sie.",meaning:"Nimen tavaaminen"},
      {label:"C08",german:"Noch einmal, bitte.",meaning:"Avunpyyntö oppimistilanteessa"},
      {label:"C09",german:"Am Montag um drei Uhr.",meaning:"Viikonpäivä ja kellonaika"},
      {label:"C10",german:"Das ist Mia. Sie kommt aus ...",meaning:"Kolmannen henkilön esittely"},
    ]),
    choice("guided","Mistä oikeat koepisteet löytyvät?","Yhteenveto ei laske kaikkia itsearvioita koeprosenttiin.",
      "Mikä asia sisältyy EX-FINAL:n 50 objektiiviseen pisteeseen?",
      ["Oma itsearvio puheesta.","Koekysymysten oikein tarkistetut vaihtoehdot.","Pelkkä sanakortin avaaminen."],"b",
      "50 pistettä tulee EX-FINAL:n objektiivisista tehtävistä.",
      "Vapaa puhe, viestin kirjoittaminen ja muistamisen oma arvio ovat erillisiä."),
    explain("recall-cards","Sanakortin arvio ei ole sama kuin oikea vastaus",
      "Kertaa vähintään viisi oikeaa sanakorttisuuntaa, ja kerro jokaisen kohdalla rehellisesti, muistitko sen.",
      "Kirjan yhteenveto antaa vahvistuspainikkeen vasta, kun viidestä eri korttisuunnasta löytyy harjoitusmerkintä. Opettajanäkymä lukee olemassa olevan vahvistuksen.",
      "Viivästetty muistaminen on tärkeämpää kuin hetkellinen oikea arvaus. Myöhästyneitä kortteja ei kuitenkaan tarvitse suorittaa suurena velkana."),
    choice("independent","Mikä on hyvä seuraava tavoite?","Tavoitteen on hyvä kuvata havaittavaa tekemistä.",
      "Mikä on konkreettisin opiskelutavoite?",[
        "Opin kaiken saksan heti.",
        "Olen huono kielissä.",
        "Harjoittelen viisi lukusanaa ja 10 minuuttia kuuntelua kolme kertaa viikossa."],"c",
      "Tavoite kertoo mitä, kuinka usein ja miten harjoittelet.",
      "Hyvä tavoite on rajattu ja seurattava. Älä tee oppimisesta mahdotonta vaatimusta.","independent"),
    writing("own-review","Mistä olet tyytyväinen ja mikä vaatii kertausta?",[
      "Vertaa omaa tunnettasi siihen, mitä todella osaat palauttaa muistista. Jokainen oppija huomaa ainakin yhden vahvuuden ja yhden seuraavan tehtävän.",
      "Tämä teksti jää tähän oppituntiin. Kirjan oikean yhteenvetosivun tavoitteet ja kokonaisarvio kirjataan sinne erikseen.",
    ],"Kirjoita yksi onnistuminen ja yksi tarkka asia, jota harjoittelet seuraavaksi.",
      "Muistan jo ... Haluan seuraavaksi ...",65,
      "self-review","Kirjasin itselleni yhden vahvuuden ja yhden kehityskohteen"),
    visit("real-summary","Vahvista kirjan oikea yhteenveto",[
      "Avaa kirjan Yhteenveto. Merkitse kaikki kymmenen osaamistavoitetta katselmoiduksi.",
      "Käy sanakortteja läpi ja vahvista vähintään viiden erillisen korttisuunnan oma arvio. Näin syntyy kirjan oma 'reviewed-5' tai suurempi merkintä.",
      "Kirjoita seuraava tavoitteesi vähintään 25 merkillä ja vahvista se erillisellä painikkeella. Valitse lopuksi oma kokonaisarviosi.",
      "L060:n Teacher-merkintä käyttää vain näitä olemassa olevia tietoja eikä luo uutta koetulosta tai kielitasotodistusta.",
    ],[link("93","summary","Avaa kirjan osaamisen yhteenveto","Kymmenen tavoitetta, viisi sanakorttia ja seuraava henkilökohtainen tavoite.")],
      "next-goal","Vahvistin seuraavan tavoitteen kirjan yhteenvedossa"),
    choice("exit","Mitä LOS! 1:n yhteenveto kertoo?","Lopputarkistuksessa erotetaan tekeminen, pisteet ja oma muistaminen.",
      "Mikä tieto on osaamisen yhteenvetona rehellinen?",[
        "Kaikki oppitunnit ovat virallinen todistus A1-taidosta.",
        "Koetulos, tehty opiskelu ja muistamisen oma arvio näkyvät erillään.",
        "Viisi avattua sanakorttia tarkoittaa viittä vahvistettua taitoa."],"b",
      "Yhteenveto näyttää kolme eri ulottuvuutta eikä anna virallista todistusta.",
      "A1-tason arviointi vaatii erillistä, monipuolista kielitaidon todentamista.","exit"),
    done("LOS! 1:n oppimistavoite jatkuu seuraavaksi",
      "L060:n suoritusmerkintä vaatii oikean kirjan yhteenvetosivun kymmenen tavoitearviota, vahvistetun vähintään viiden kortin kertauksen, uuden tavoitteesi ja kokonaisarvion.",
      "Ota tästä mukaan yksi seuraava pieni harjoitus. Oppiminen jatkuu myös kirjan viimeisen oppitunnin jälkeen."),
  ],
};
export const LOS1_FINAL_TEACHER_LESSONS:readonly TeacherLesson[]=[
  LOS1_L056_TEACHER,LOS1_L057_TEACHER,LOS1_L058_TEACHER,LOS1_L059_TEACHER,LOS1_L060_TEACHER,
];
