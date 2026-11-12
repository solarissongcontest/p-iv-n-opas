import type { LosLessonBlueprint } from "./lessonEngine";

/**
 * Five real chapter 7 and five real chapter 9 guided lessons.
 * These are intentionally non-contiguous in the 60-lesson sequence because
 * chapters C06 and C08 still lack publication-ready primary sources.
 * No pending audio is treated as finished listening evidence.
 */
export const LOS1_C07_C09_LESSONS: readonly LosLessonBlueprint[] = [
  {
    id:"L036",title:"Aakkosten ja nimen kertaus",objective:"Tunnistan tavallisimmat saksan kirjaimet ja osaan tavata helpon nimen.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"letters",label:"Kertaa erikoiskirjaimet",instruction:"Avaa C07:n sanasto ja etsi ü, ß ja W. Muista, että kirjaimen nimi ja sen ääntämys sanassa eivät aina ole samat.",chapter:"07",section:"vocabulary",minutes:10},
      {id:"names",label:"Tavaa kolme kuvitteellista nimeä",instruction:"Tee harjoitukset C07-EX-05, C07-EX-06 ja C07-EX-07. Tavaa Mia, Lena ja Uwe ensin ääneen, sitten tarkista kirjoitusasut.",chapter:"07",section:"practice",minutes:10},
      {id:"read",label:"Etsi tavaamispyyntö aidosta keskustelusta",instruction:"Avaa C07:n alkuperäinen Wikibooks-puhelinpalvelun dialogi ja etsi lause Bitte buchstabieren Sie. Vaikeita muotoja ei tarvitse vielä tuottaa itse.",chapter:"07",section:"text",minutes:6},
    ],evidence:[{kind:"answered-practice",ids:["C07-EX-05","C07-EX-06","C07-EX-07"],label:"Kolmen nimen kirjainten tunnistustehtävät vastattu."}],
    check:{question:"Miten kirjoitat saksalaisen nimen Uwe kirjaimittain?",answers:[{id:"a",text:"U-W-E"},{id:"b",text:"U-V-E"},{id:"c",text:"U-W-I"}],correctId:"a",explanation:"Uwe kirjoitetaan U–W–E. Saksan W-kirjain ääntyy tavallisissa sanoissa yleensä suomen v:n tavoin."},
  },
  {
    id:"L037",title:"Lue tavaamiskeskustelu",objective:"Ymmärrän alkuperäisen puhelinpalveludialogin keskeiset pyynnöt.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"text",label:"Lue viisi alkuperäistä puheenvuoroa",instruction:"Lue numerotiedustelun ja Franzin koko Wikibooks-keskustelu. Nimen kirjaimia käytetään harjoituksessa, mutta oikeita yhteystietoja ei kysytä.",chapter:"07",section:"text",minutes:11},
      {id:"questions",label:"Tarkista kaksi tekstikysymystä",instruction:"Tee C07-SOURCE-Q01 ja C07-SOURCE-Q02. Etsi keskustelusta kysymys Wie schreibt man das? ja tunnista, kuka pyytää tavaamista.",chapter:"07",section:"understand",minutes:11},
      {id:"repeat",label:"Harjoittele kohteliasta tavaamispyyntöä",instruction:"Yritä sanoa Bitte buchstabieren Sie ilman sanalistaa. Palaa sen jälkeen lähdetekstiin tarkistamaan oikea kirjoitusasu.",chapter:"07",section:"text",minutes:4},
    ],evidence:[{kind:"checked-source",ids:["C07-SOURCE-Q01","C07-SOURCE-Q02"],label:"Kaksi alkuperäistekstin tavaamiskysymystä vastattu ja tarkistettu."}],
    check:{question:"Mitä Bitte buchstabieren Sie tarkoittaa?",answers:[{id:"a",text:"Tavatkaa, olkaa hyvä."},{id:"b",text:"Kertokaa ikänne."},{id:"c",text:"Mistä olette kotoisin?"}],correctId:"a",explanation:"Buchstabieren tarkoittaa tavaamista. Sie on tässä kohteliaan puhuttelun muoto."},
  },
  {
    id:"L038",title:"Tavaa ja ymmärrä numeroita",objective:"Tavaan nimiä ja erotan kirjoitusta sekä numeron tunnistamista koskevat fraasit.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"grammar",label:"Kertaa ääntämisen ja kirjoitusasun ero",instruction:"Opiskele C07:n kielioppi- ja sanastosivuilta, kuinka Wie schreibt man das? ja Bitte buchstabieren Sie liittyvät nimen kirjoittamiseen.",chapter:"07",section:"grammar",minutes:10},
      {id:"spelling",label:"Tee kahden nimen kirjaimittainen tehtävä",instruction:"Vastaa C07-EX-08 ja C07-EX-09. Huomaa saksan ß-kirjaimen paikka sanassa heißt.",chapter:"07",section:"practice",minutes:10},
      {id:"form",label:"Täydennä kohtelias pyyntö",instruction:"Vastaa C07-EX-14 ja C07-EX-15. Yritä muistaa buchstabieren ja einmal ilman näkyvää mallia.",chapter:"07",section:"practice",minutes:6},
    ],evidence:[{kind:"answered-practice",ids:["C07-EX-08","C07-EX-09","C07-EX-14","C07-EX-15"],label:"Neljä kirjoitusasu- ja selviytymisfraasitehtävää vastattu."}],
    check:{question:"Mikä sanan heißt oikea kirjoitusasu?",answers:[{id:"a",text:"heißt"},{id:"b",text:"heisst"},{id:"c",text:"heißst"}],correctId:"a",explanation:"Tässä saksan sanassa käytetään ß-kirjainta: du heißt."},
  },
  {
    id:"L039",title:"Tavaa ja täytä harjoituslomake",objective:"Kirjoitan kuvitteellisia nimiä ja numerosarjoja tavauksen perusteella.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"wordlist",label:"Kertaa nimien kirjoitusasut",instruction:"Avaa C07:n sanasto, muista Buchstabe, buchstabieren, Nummer ja bitte. Tavaa nimet Anna, Emil ja Greta ääneen.",chapter:"07",section:"vocabulary",minutes:9},
      {id:"model",label:"Lue alkuperäinen tavaamismalli",instruction:"Avaa C07:n Franzin puhelinpalveludialogi. Hän luettelee kirjaimet esimerkkisanoina; sitä ei saa esittää todennettuna erillisenä äänitteenä.",chapter:"07",section:"text",minutes:10},
      {id:"write",label:"Täytä itse kuvitteellinen lomake",instruction:"Tee C07:n soveltamistehtävä, jossa tavataan nimiä ja kirjoitetaan neljä erillistä numerosarjaa. Ne eivät ole oikeita puhelinnumeroita. Äänitettä ei vaadita.",chapter:"07",section:"apply",minutes:7},
    ],evidence:[],check:{question:"Millä fraasilla pyydät kohteliaasti tavaamaan?",answers:[{id:"a",text:"Bitte buchstabieren Sie."},{id:"b",text:"Wie alt sind Sie?"},{id:"c",text:"Guten Morgen."}],correctId:"a",explanation:"Bitte buchstabieren Sie tarkoittaa Tavatkaa, olkaa hyvä. Todellista ääneenlukua ei arvioida koneellisesti."},
  },
  {
    id:"L040",title:"Harjoittele ja testaa C07",objective:"Palautan tavaamisen ja kirjoitusasun kappaletestin.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"repeat",label:"Kertaa fraasit ilman vihjettä",instruction:"Tarkista C07:n sanastosta Bitte buchstabieren Sie, Wie schreibt man das? ja Noch einmal, bitte. Peitä sen jälkeen suomennokset.",chapter:"07",section:"vocabulary",minutes:8},
      {id:"application",label:"Kirjoita oma tavaamistehtävä",instruction:"Tee C07:n soveltamissivun kuvitteellisten nimien ja numerosarjojen tehtävä; älä tallenna oikeita yhteystietoja.",chapter:"07",section:"apply",minutes:8},
      {id:"test",label:"Palauta kappaletesti",instruction:"Tee C07:n kappaletesti ja palauta vastaukset. Tunnin suoritus edellyttää myös lopputarkistusta mutta ei täydellisiä pisteitä.",chapter:"07",section:"test",minutes:10},
    ],evidence:[{kind:"chapter-test",label:"C07:n kappaletesti palautettu."}],
    check:{question:"Mitä Wie schreibt man das? kysyy?",answers:[{id:"a",text:"Paljonko kello on?"},{id:"b",text:"Miten tämä kirjoitetaan?"},{id:"c",text:"Mitä kuuluu?"}],correctId:"b",explanation:"Wie schreibt man das? tarkoittaa Miten se kirjoitetaan?"},
  },
  {
    id:"L046",title:"Viikonpäivät",objective:"Tunnistan saksan seitsemän viikonpäivää ja pystyn sanomaan maanantaina.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"week",label:"Opiskele viikonpäivät",instruction:"Avaa C09:n sanasto ja opettele viikonpäivät Montagista Sonntagiin. Muista saksan substantiivien isot alkukirjaimet.",chapter:"09",section:"vocabulary",minutes:11},
      {id:"practice",label:"Tunnista viikonpäivät",instruction:"Tee C09-EX-01, C09-EX-02 ja C09-EX-03. Tarkista erikseen maanantai, tiistai ja keskiviikko.",chapter:"09",section:"practice",minutes:9},
      {id:"timing",label:"Tutustu am-ilmaukseen",instruction:"Lue C09:n kieliopista am Montag = maanantaina. Älä sekoita sitä kellonajan um-rakenteeseen.",chapter:"09",section:"grammar",minutes:6},
    ],evidence:[{kind:"answered-practice",ids:["C09-EX-01","C09-EX-02","C09-EX-03"],label:"Kolme viikonpäivien tunnistustehtävää vastattu."}],
    check:{question:"Mikä tarkoittaa maanantaina?",answers:[{id:"a",text:"am Montag"},{id:"b",text:"um Montag"},{id:"c",text:"in Montag"}],correctId:"a",explanation:"Am Montag tarkoittaa maanantaina. Kellonajan kanssa käytetään um."},
  },
  {
    id:"L047",title:"Lue Sport und Zeit",objective:"Löydän Franzin ja Gretan alkuperäisestä keskustelusta kaksi kellonaikaa.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"read",label:"Lue seitsemän alkuperäistä puheenvuoroa",instruction:"Avaa C09:n kokonainen Wikibooks Sport und Zeit -dialogi. Tunnista Wie spät ist es? ja um drei; vaikeampaa Viertel vor drei -muotoa tarvitsee vain ymmärtää.",chapter:"09",section:"text",minutes:11},
      {id:"questions",label:"Tarkista kaksi aikakysymystä",instruction:"Tee C09-SOURCE-Q01 ja C09-SOURCE-Q02. Etsi, mitä kellonaikaa Greta sanoo ja mihin aikaan Franz pelaa jalkapalloa.",chapter:"09",section:"understand",minutes:11},
      {id:"recall",label:"Muista tapaamisen kellonaika",instruction:"Peitä keskustelu ja yritä sanoa Franzin jalkapalloaika saksaksi. Palaa sen jälkeen alkuperäiseen tekstiin.",chapter:"09",section:"text",minutes:4},
    ],evidence:[{kind:"checked-source",ids:["C09-SOURCE-Q01","C09-SOURCE-Q02"],label:"Kaksi alkuperäisdialogin aikaan liittyvää kysymystä tarkistettu."}],
    check:{question:"Mihin kellonaikaan Franz kertoo pelaavansa jalkapalloa?",answers:[{id:"a",text:"um drei"},{id:"b",text:"um vier"},{id:"c",text:"um fünf"}],correctId:"a",explanation:"Franz sanoo Ich spiele um drei Fußball. Um drei tarkoittaa kolmelta."},
  },
  {
    id:"L048",title:"Am Montag, um drei Uhr",objective:"Erotan viikonpäivän am-ilmauksen kellonajan um-ilmauksesta.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"grammar",label:"Opiskele am ja um",instruction:"Avaa C09:n kielioppi ja vertaa am Montag = maanantaina sekä um drei Uhr = kello kolmelta.",chapter:"09",section:"grammar",minutes:11},
      {id:"practice",label:"Harjoittele ajanilmausten tunnistusta",instruction:"Tee C09-EX-08, C09-EX-09 ja C09-EX-10. Kiinnitä huomiota siihen, mikä sana ilmaisee viikonpäivän ja mikä kellonajan.",chapter:"09",section:"practice",minutes:11},
      {id:"fill",label:"Täydennä kaksi puuttuvaa sanaa",instruction:"Vastaa C09-EX-13 ja C09-EX-14 ilman näkyvää taulukkoa. Kertaa am ja um vasta yrityksen jälkeen.",chapter:"09",section:"practice",minutes:4},
    ],evidence:[{kind:"answered-practice",ids:["C09-EX-08","C09-EX-09","C09-EX-10","C09-EX-13","C09-EX-14"],label:"Viisi viikonpäivä- ja kellonaikaharjoitusta vastattu."}],
    check:{question:"Miten sanot maanantaina kello kolmelta?",answers:[{id:"a",text:"am Montag um drei Uhr"},{id:"b",text:"um Montag am drei Uhr"},{id:"c",text:"in Montag um drei Uhr"}],correctId:"a",explanation:"Viikonpäivän yhteydessä on am ja kellonajan yhteydessä um: am Montag um drei Uhr."},
  },
  {
    id:"L049",title:"Lue ja merkitse kalenteriin",objective:"Ymmärrän kirjallisesta aikailmauksesta päivän ja kellonajan.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"text",label:"Palaa Franzin ja Gretan keskusteluun",instruction:"Lue C09:n Sport und Zeit -teksti ja etsi alkuperäiset ajanilmaukset. Julkaisijan erillistä kuunteluäänitettä ei ole varmennettu, joten tämä on lukutehtävä.",chapter:"09",section:"text",minutes:11},
      {id:"calendar",label:"Tee ajanilmausten tehtävät",instruction:"Vastaa C09-EX-04, C09-EX-05 ja C09-EX-06 viikonpäivistä. Kirjoita sitten kuvitteelliseen viikkokalenteriin maanantai klo 15.",chapter:"09",section:"practice",minutes:11},
      {id:"review",label:"Tarkista oikea päivä ja kellonaika",instruction:"Tarkista kielioppisivulta am Montag ja um drei Uhr. Vastaa lopuksi itse ääneen, mutta puhetta ei konepisteytetä.",chapter:"09",section:"grammar",minutes:4},
    ],evidence:[{kind:"answered-practice",ids:["C09-EX-04","C09-EX-05","C09-EX-06"],label:"Kolme viikonpäivän tunnistustehtävää vastattu."}],
    check:{question:"Mikä tarkoittaa perjantaina?",answers:[{id:"a",text:"am Freitag"},{id:"b",text:"um Freitag"},{id:"c",text:"am Sonntag"}],correctId:"a",explanation:"Am Freitag tarkoittaa perjantaina. Varsinaista äänitettä ei vaadita tämän tunnin suoritukseksi."},
  },
  {
    id:"L050",title:"Harjoittele ja testaa C09",objective:"Sovellan viikonpäivien ja tavallisten kellonaikojen perusteita ja palautan kappaletestin.",
    estimatedMinutes:30,contentVersion:"1.0.0",steps:[
      {id:"review",label:"Kertaa viikonpäivät ja ajanilmaukset",instruction:"Avaa C09:n sanasto ja kertaile viikonpäivät ilman käännöstä. Vertaa niitä kellonaikoihin um drei Uhr ja um vier Uhr.",chapter:"09",section:"vocabulary",minutes:8},
      {id:"production",label:"Sovella ajanilmausta",instruction:"Tee C09:n oma kirjoitustehtävä kalenteria tai kuvitteellista tapaamista käyttäen. Vertaa oman yrityksen jälkeen esimerkkivastaukseen.",chapter:"09",section:"apply",minutes:8},
      {id:"test",label:"Palauta kappaletesti",instruction:"Palauta C09:n kappaletesti. Järjestelmä merkitsee tunnin suoritetuksi vasta vaiheitten, kokeen ja lopputarkistuksen jälkeen.",chapter:"09",section:"test",minutes:10},
    ],evidence:[{kind:"chapter-test",label:"C09:n kappaletesti palautettu."}],
    check:{question:"Mikä sana sopii lauseeseen Wir treffen uns ___ Montag?",answers:[{id:"a",text:"am"},{id:"b",text:"um"},{id:"c",text:"bei"}],correctId:"a",explanation:"Viikonpäivän kanssa käytetään am. Esimerkissä Wir treffen uns am Montag tarkoittaa tapaamme maanantaina."},
  },
];
