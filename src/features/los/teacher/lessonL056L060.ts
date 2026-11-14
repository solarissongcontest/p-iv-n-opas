import type { TeacherLesson, TeacherQuestion } from "./engine.ts";

/**
 * LOS! 1 session 10/10. These manuscripts orchestrate the EXISTING Review II,
 * EX-FINAL and summary pages; no second assessment bank or response store.
 * Authorial explanations are Finnish; independent checks are distinct from
 * guided book activities. 92 and 93 are existing reserved draft slots.
 */
const situationalQuestion: TeacherQuestion = {
  type: "choice", skillId: "L1-STRAT-01", evidenceRole: "application",
  prompt: "Vieraan aikuisen nimi pitää tavata ja tapaaminen on maanantaina. Mikä kokonaisuus on luonteva?",
  options: [
    {id:"a",label:"Bitte buchstabieren Sie. Am Montag.",wrongFeedback:""},
    {id:"b",label:"Wie alt bist du? Um Montag.",wrongFeedback:"Ikäkysymys ei pyydä tavaamista, eikä viikonpäivä käytä sanaa um."},
    {id:"c",label:"Tschüss! In Montag.",wrongFeedback:"Tschüss on hyvästely eikä pyydä tavaamista. Viikonpäivä on am Montag."},
  ],
  correctOption:"a",
  success:"Bitte buchstabieren Sie on kohtelias tavaamispyyntö ja am Montag tarkoittaa maanantaina.",
  hint:"Tavaaminen = buchstabieren, viikonpäivä = am + päivä.",
  reteach:"Vertaa kahta eri tarvetta: Bitte buchstabieren Sie. = Voisitteko tavata nimen, kiitos? Am Montag. = maanantaina.",
  genericWrong:"Valitse sekä kohtelias tavaamispyyntö että oikea viikonpäivän ilmaus.",
};
export const LOS1_L056_TEACHER: TeacherLesson = {
  id:"L056",bookId:1,chapterId:"92",version:"2.0.0-preview.1",
  title:"Luvut, tavaaminen ja viikonpäivät",
  objective:"Palautan C06–C09:n lukusanat, iän, tavaamisen, viikonpäivät ja ajanilmaukset mieleen ilman täydellisen pistemäärän vaatimusta.",
  estimatedMinutes:30,externalCheck:"review-ii",
  requiredQuestionIds:["combined-transfer"],requiredActivityIds:[],requiredPracticeIds:[],
  scenes:[
    {id:"start",phase:"Kertaus",kind:"introduction",title:"Mitä kaikkea muistat ilman sanalistaa?",paragraphs:[
      "Tänään yhdistät jo opitut numerot, iän, tavauksen ja viikonpäivät. Aloita sulkemalla sanasto ja yritä palauttaa ilmaukset muistista.",
      "Harjoittelet viittä aiemmin tallennettuun Kertaus II -tehtäväpankkiin kuuluvaa tarkistusta sekä yhtä uutta soveltavaa tilannetta. Oikeaa vastausta ei vaadita jokaiseen tehtävään, mutta kaikki yritykset tarkistetaan.",
      "Vastausten tarkistaminen ja vihjeet auttavat oppimista. Vain alusta asti ilman apua oikein vastattu itsenäinen tehtävä kirjataan itsenäiseksi näytöksi."
    ]},
    {id:"numbers",phase:"Muistista palauttaminen",kind:"explanation",title:"Miksi 16, 17 ja 21 ovat eri tavoin hankalia?",paragraphs:[
      "Sano tai kirjoita ensin muistista 16, 17, 21 ja 32 saksaksi. Älä katso vielä alla olevia selityksiä, jos haluat mitata omaa muistamistasi.",
      "Sechzehn (16) ei sisällä sanan sechs lopun s-kirjainta. Siebzehn (17) lyhentää sanan sieben loppua. Einundzwanzig (21) ja zweiunddreißig (32) kertovat ensin ykköset ja sitten kymmenet.",
      "Kun kerrot ikäsi, käytä ich bin ... Jahre alt. Kun kysyt toisen ikää, käytä Wie alt bist du?"
    ]},
    {id:"calendar",phase:"Kertaava opetustaulu",kind:"board",title:"Tavaamispyyntö ja tapaamispäivä samassa tilanteessa",paragraphs:[
      "Vertaa kirjoitusasua, puheen tavoitetta ja aikailmausta. Viikonpäivän eteen tulee am, kellonajan eteen um. Molemmat ovat aiemmin opittuja ilmauksia.",
      "Tavaamispyynnössä kohteliaan Sie-muodon tunnistaa myös verbistä. Nimen tavaaminen ei ole sama asia kuin iän tai alkuperän kysyminen."
    ],board:[
      {label:"1 · Luku",german:"sechzehn / siebzehn",meaning:"16 / 17: erikoiset lyhennetyt kirjoitusasut"},
      {label:"2 · Luku",german:"einundzwanzig / zweiunddreißig",meaning:"21 / 32: ykköset ennen kymmeniä"},
      {label:"3 · Tavaus",german:"Bitte buchstabieren Sie.",meaning:"Voisitteko tavata nimen, kiitos? Kohtelias pyyntö."},
      {label:"4 · Viikonpäivä",german:"am Montag / am Mittwoch",meaning:"maanantaina / keskiviikkona"},
      {label:"5 · Kellonaika",german:"um drei Uhr",meaning:"kello kolmelta"}
    ]},
    {id:"combined-transfer",phase:"Soveltaminen",kind:"question",title:"Yhdistä kaksi aiemmin opetettua taitoa",paragraphs:[
      "Vastaa ilman sanalistaa. Tämä on yksi itsenäisesti arvioitava siirtotilanne aiempien viiden koetehtävän rinnalla."
    ],question:situationalQuestion},
    {id:"review",phase:"Oikeat kertauskysymykset",kind:"book",title:"Tee ja tarkista L056:n viisi tallennettua tehtävää",paragraphs:[
      "Avaa Kertaus II. Tee L056-osion viisi kysymystä omana yrityksenäsi ja paina kunkin kohdalla Tarkista vastaus. Merkitse sen jälkeen sivulla oma arviosi.",
      "Kertaus II:n tehtävät ja vastaukset tallennetaan suoraan olemassa olevaan paikkaan 92. Opetustila ei kopioi niitä eikä vaadi viittä oikeaa vastausta viidestä."
    ],bookLinks:[
      {label:"Kertaus II · L056",chapterId:"92",section:"review-ii",instruction:"Viisi kysymystä, tarkistukset ja oma muistamisen arvio."},
      {label:"C07 · Tavaaminen",chapterId:"07",section:"vocabulary",instruction:"Kertaa aakkoset vasta oman yrityksen jälkeen."},
      {label:"C09 · Viikonpäivät",chapterId:"09",section:"vocabulary",instruction:"Palaa päivä- ja aika-ilmauksiin tarvittaessa."}
    ]},
    {id:"summary",phase:"Lopputarkistus",kind:"summary",title:"Mitä tarvitsee vielä kerrata?",paragraphs:[
      "Tarkista ensin kaikki viisi kirjan tehtävää ja kirjaa itsearvio. Katso erityisesti kirjoitusvirheitä, aakkosten ja numeroiden eroa sekä am/um-ilmauksia.",
      "Jos jokin meni väärin, paluu harjoitteluun on oikea jatko. Oppitunti ei ole täydellisen pistemäärän kilpailu."
    ]}
  ]
};

const greetingAndOrigin: TeacherQuestion = {
  type:"text",skillId:"L1-INT-03",evidenceRole:"application",
  prompt:"Kirjoita saksaksi samaan vastaukseen kolme viestiä: Hei! Nimeni on Mia. Olen kotoisin Suomesta. Tervehdyksen voi erottaa huutomerkillä tai pilkulla.",
  accepted:["Hallo! Ich heiße Mia. Ich komme aus Finnland.","Hallo, ich heiße Mia. Ich komme aus Finnland."],
  success:"Yhdistit tervehdyksen, nimen ja lähtömaan oikeisiin minämuotoihin.",
  hint:"Hallo aloittaa. Ich heiße kertoo nimen ja ich komme aus kertoo alkuperän.",
  reteach:"Kolme tuttua rakennetta ovat Hallo! / Ich heiße Mia. / Ich komme aus Finnland.",
  genericWrong:"Sisällytä tervehdys, nimi ja lähtömaa. Tarkista heiße, komme, aus ja Finnland. Tervehdyksen voi erottaa huutomerkillä tai pilkulla.",
};
export const LOS1_L057_TEACHER: TeacherLesson = {
  id:"L057",bookId:1,chapterId:"92",version:"2.0.0-preview.1",
  title:"Kaikkien 10 kappaleen taitosekoitus",
  objective:"Yhdistän C01–C10:n tervehdykset, esittelyn, alkuperän, kohteliaisuuden, voinnin, luvut, tavaamisen, luokkafraasit ja ajan.",
  estimatedMinutes:30,externalCheck:"review-ii",
  requiredQuestionIds:["transfer"],requiredActivityIds:[],requiredPracticeIds:[],
  scenes:[
    {id:"welcome",phase:"Kertaus",kind:"introduction",title:"Kymmenen kappaletta, yksi luonteva tapaaminen",paragraphs:[
      "Kertauksen tarkoitus on tunnistaa, mikä ilmaus toimii missäkin tilanteessa. Et opiskele uutta kielioppia, vaan vaihdat jo oppimiesi fraasien välillä.",
      "Kuuntelemisen, puhumisen ja kirjoittamisen laatua ei arvata monivalinnan pisteistä. Kuuntelun erillinen näyttö kuuluu myöhempään loppukokeeseen."
    ]},
    {id:"skill-map",phase:"Opettajan yhteenveto",kind:"board",title:"Valitse ilmaus tilanteen eikä ulkoa opitun järjestyksen mukaan",paragraphs:[
      "Tarkista joka kohdasta, mitä haluat saada aikaan. Kokeile ensin sanoa vastaus muistista ja avaa sitten seuraava rivi.",
      "Kysymykset du- ja Sie-muodoissa eroavat. Nimeä, ikää, kuulumisia ja alkuperää ei kysytä samalla kysymyssanalla."
    ],board:[
      {label:"C01 · tervehdys",german:"Hallo! / Tschüss!",meaning:"Kohtaamisen alku ja loppu"},
      {label:"C02 · nimi",german:"Wie heißt du? / Ich heiße Mia.",meaning:"Nimen kysyminen ja kertominen"},
      {label:"C03 · alkuperä",german:"Woher kommst du? / Ich komme aus Finnland.",meaning:"Mistä olet kotoisin?"},
      {label:"C04 · kohteliaisuus",german:"Wie heißen Sie?",meaning:"Kohtelias nimikysymys"},
      {label:"C05 · vointi",german:"Wie geht es dir? / Gut, danke.",meaning:"Kuulumisten kysyminen"},
      {label:"C06 · ikä",german:"Ich bin siebzehn Jahre alt.",meaning:"Olen seitsemäntoistavuotias"},
      {label:"C07 · tavataan",german:"Bitte buchstabieren Sie.",meaning:"Voisitteko tavata nimen, kiitos?"},
      {label:"C08 · selviytyminen",german:"Noch einmal, bitte. / Bitte langsamer.",meaning:"Toiston tai hidastamisen pyytäminen"},
      {label:"C09 · aika",german:"am Montag um drei Uhr",meaning:"maanantaina kello kolmelta"},
      {label:"C10 · kolmas henkilö",german:"Das ist Mia. Sie heißt Mia.",meaning:"Tuttavan esittely"}
    ]},
    {id:"transfer",phase:"Itsenäinen soveltaminen",kind:"question",title:"Yhdistä tervehdys, nimi ja lähtömaa ilman sanastoa",paragraphs:[
      "Kuvittele olevasi uusi oppilas. Tervehdi ja kerro oma kuvitteellinen nimesi sekä lähtömaasi. Ei oikeita henkilötietoja.",
      "Kokeile ennen vihjettä. Vihjeen käyttö kirjautuu avustetuksi harjoitteluksi."
    ],question:greetingAndOrigin},
    {id:"book",phase:"Tallennettu taitosekoitus",kind:"book",title:"Tarkista viisi Kertaus II -tilannetta",paragraphs:[
      "Kertaus II:n L057-osiossa ovat viikonpäivät, am/um, toiston pyytäminen ja tavaamispyyntö. Vastaa kaikkiin viiteen ja tarkista. Kirjaa muistamisen arvio.",
      "Tämän tunnin opetustaulussa kertautuivat myös C01–C06 ja C10. Jos yksittäinen aihe tuntuu epävarmalta, käytä kirjan täsmäviitteitä. Täydet pisteet eivät ole suorittamisen edellytys."
    ],bookLinks:[
      {label:"L057 · viisi kertauksen tehtävää",chapterId:"92",section:"review-ii",instruction:"Tarkista L057:n viisi kysymystä ja itsearvio."},
      {label:"C05 · kuulumiset",chapterId:"05",section:"grammar",instruction:"Kertaa kuulumisten kysyminen ja vastaaminen."},
      {label:"C08 · luokkafraasit",chapterId:"08",section:"vocabulary",instruction:"Kertaa toiston ja hidastamisen pyytäminen."},
      {label:"C10 · kolmannen henkilön esittely",chapterId:"10",section:"grammar",instruction:"Vertaa ich ja er/sie -rakenteita."}
    ]},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"Mitkä fraasit toimivat jo ilman mallia?",paragraphs:[
      "Tarkistetut tehtävät antavat palautetta juuri näistä kysymyksistä. Ne eivät todista, että hallitset kaikki kymmenen kappaletta.",
      "L058:ssa yhdistät fraasit kokonaiseksi omaksi tekstiksi ja keskusteluksi. Tee se ensin ilman mallia."
    ]}
  ]
};

export const LOS1_L058_TEACHER: TeacherLesson = {
  id:"L058",bookId:1,chapterId:"92",version:"2.0.0-preview.1",
  title:"Täydellinen esittelyharjoitus ilman vihjeitä",
  objective:"Tuotan itse 5–7 lauseen kuvitteellisen esittelyn ja soveltavan 6–8 repliikin keskustelun; tunnistan, oliko suoritus avustettu.",
  estimatedMinutes:30,externalCheck:"review-ii",
  requiredQuestionIds:[],requiredActivityIds:["dialogue-tried"],requiredPracticeIds:[],
  scenes:[
    {id:"welcome",phase:"Itsenäinen tuottaminen",kind:"introduction",title:"Nyt sinä muodostat koko esittelyn",paragraphs:[
      "Sulje sanasto ja aikaisemmat mallit. Kirjoita 5–7 omaa saksankielistä lausetta kuvitteellisesta henkilöstä: tervehdys, nimi, lähtömaa, ikä, ystävä, tarvittaessa tapaamisaika ja hyvästely.",
      "Kirjoita jokainen virke omalle rivilleen Kertaus II:n L058-tekstikenttään. Tee tämä ennen kuin avaat mallivastauksen. Voit jatkaa, vaikka osa lauseista jäisi puutteellisiksi.",
      "Vihjeen tai mallin avaaminen merkitään erikseen. Avustettu teksti ei muutu jälkikäteen itsenäisesti tarkistetuksi kielioppinäytöksi."
    ]},
    {id:"dialogue",phase:"Soveltava vuoropuhelu",kind:"activity",title:"Vaihda nyt näkökulmaa keskusteluun",paragraphs:[
      "Kuvittele, että kaksi vierasta nuorta tapaa. Suunnittele ja sano ääneen tai kirjoita 6–8 repliikkiä: tervehdys, molempien nimet, vähintään yksi kysymys alkuperästä tai voinnista ja hyvästely.",
      "Vaihda puhuttelu kohteliaaksi, jos valitset keskusteluun tuntemattoman aikuisen. Voit käyttää kuvitteellisia tietoja, älä kirjoita oikeita yhteystietoja.",
      "Vahvista vain, että todella kokeilit keskustelua. Tämä ei ole automaattisesti tarkistettu puhenäyttö."
    ],activityId:"dialogue-tried",activityLabel:"Harjoittelin soveltavan 6–8 repliikin keskustelun"},
    {id:"review",phase:"Oma teksti ja tarkistukset",kind:"book",title:"Tallenna esittelysi suoraan kirjan Kertaus II -sivulle",paragraphs:[
      "Kirjoita L058-osioon 5–7 omaa virkettä, tarkista viisi tilanteisiin liittyvää kysymystä ja merkitse oma arvio. Vastaukset tallentuvat samaan kirjan luonnokseen kuin ennenkin.",
      "Tarkistusmalli avataan vasta yrityksen jälkeen. Jos avaat mallin, LOS merkitsee mallin käytön erikseen eikä anna sille itsenäisen näytön leimaa."
    ],bookLinks:[
      {label:"L058 · esittely ja viisi kysymystä",chapterId:"92",section:"review-ii",instruction:"Kirjoita ensin ilman mallia, sitten tarkista ja itsearvioi."}
    ]},
    {id:"reflect",phase:"Itsearviointi",kind:"reflection",title:"Minkä teit itse ja mihin tarvitsit apua?",paragraphs:[
      "Kirjoita lyhyesti, pystyitkö tuottamaan omat lauseet ilman mallia, ja mitkä muodot vielä epäilyttivät. Tämä on oma arvio, ei automaattinen oikeakielisyystesti."
    ],reflection:{prompt:"Mikä sujui ilman apua, mitä kerrataan?",placeholder:"Kirjoitin itse ..., mutta tarvitsin apua ...",minLength:15}},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"Valmistauduit loppukokeeseen",paragraphs:[
      "Koko esitteleminen on eri taito kuin yhden monivalinnan ratkaiseminen. Oma kirjoitus- tai puheyritys on tallennettu harjoitteluksi, ei koneellisesti vahvistetuksi puheosaamiseksi.",
      "L059:n loppukokeessa et saa vihjeitä tai ratkaisumallia ennen palautusta. Varmista ennen sitä, että osaat pyytää tarvittaessa toistoa ja kertoa itsestäsi lyhyesti."
    ]}
  ]
};

export const LOS1_L059_TEACHER: TeacherLesson = {
  id:"L059",bookId:1,chapterId:"93",version:"2.0.0-preview.1",
  title:"Koko kirjan loppukoe",
  objective:"Teen olemassa olevan EX-FINAL:n kaikki 50 pisteytettävää tehtävää ilman vihjeitä ja itsearvioin erikseen oman viestin ja puheen.",
  estimatedMinutes:80,externalCheck:"final",requiredQuestionIds:[],
  requiredActivityIds:[],requiredPracticeIds:[],
  scenes:[
    {id:"welcome",phase:"Koepäivä",kind:"introduction",title:"Tässä käytetään LOS! 1:n oikeaa loppukoetta",paragraphs:[
      "Loppukoe on olemassa olevan EX-FINAL-sivun 50 pisteytettävän tehtävän kokonaisuus: 12 kuullunymmärtämistä, 10 luetunymmärtämistä, 10 sanastoa, 10 kielioppia ja 8 arkitilannetta.",
      "Tämä Teacher-näkymä ei esitä kokeen vastauksia, luo toista koepankkia eikä pisteytä puhetta tai vapaata kirjoittamista. Koesivulla vastaukset näkyvät vasta palautuksen jälkeen.",
      "Kokeen saa uusia, mutta aiemmat yritykset ja pistemäärät arkistoidaan olemassa olevaan tallennukseen. Ennen uusintaa kannattaa ottaa JSON-varmuuskopio."
    ]},
    {id:"rules",phase:"Koeohje",kind:"explanation",title:"Vihjeetön koe ja erilliset omat tuotokset",paragraphs:[
      "Kuuntele koesivun molemmat aidot lähdeäänitteet loppuun. Jos ne eivät toimi, kuuntelun pisteitä ei saa kuvitella eikä koetta palauttaa.",
      "Täytä kaikki 50 monivalintaa. Lue luetunymmärtämisen aidot tekstit itse koesivulla. Tarkistusmallit ja oikeat vastausvaihtoehdot paljastetaan vasta palauttamisen jälkeen.",
      "Kirjoita lisäksi 5–7 lauseen kuvitteellinen viesti ja harjoittele 6–8 repliikin keskustelu. Niiden oma arvio on erillinen 50 pisteestä, eikä puheen tai vapaan tekstin kielioppia arvioida koneella.",
      "Koe on aikarajaton. Keskeneräiset valinnat säilyvät tämän laitteen luonnoksessa; varmuuskopio voi siirtää ne toiselle laitteelle."
    ]},
    {id:"exam",phase:"EX-FINAL",kind:"book",title:"Avaa loppukoe ja palauta se siellä",paragraphs:[
      "Käytä alla olevaa linkkiä oikeaan loppukokeeseen. Palaa opetustilaan vasta, kun koe on palautettu ja erilliset tuottamistehtävät itsearvioitu.",
      "Jos sinulla on jo palautettu tulos, vanha yritys lasketaan tämän tunnin todelliseksi näytöksi. Opetustilan avaaminen ei luo uutta yritystä eikä muuta pisteitä."
    ],bookLinks:[
      {label:"EX-FINAL · 50 pistettä",chapterId:"93",section:"final",instruction:"Palautus, pisteet, uusinta, aiempien yritysten arkisto ja omat tuotokset."}
    ]},
    {id:"summary",phase:"Palautteen tulkinta",kind:"summary",title:"Koe mittaa osaa osaamisesta",paragraphs:[
      "Katso osioiden pisteet erikseen ja vertaa niitä aiempiin itsenäisiin harjoituksiisi. Loppukokeen kokonaispisteet eivät yksin todista, että puhut tai kirjoitat ilman tukea.",
      "Siirry L060:een. Siellä erotetaan käsitellyt asiat, itsenäiset tarkistetut vastaukset, myöhempi vahvistus, itsearviointi ja näyttöä vailla olevat taidot."
    ]}
  ]
};

export const LOS1_L060_TEACHER: TeacherLesson = {
  id:"L060",bookId:1,chapterId:"93",version:"2.0.0-preview.1",
  title:"Mitä osaan nyt saksaksi?",
  objective:"Tarkastelen käsiteltyjä tavoitteita ja tosiasiallista itsenäistä näyttöä, huomaan myöhemmän vahvistuksen sekä asetan seuraavan tavoitteen.",
  estimatedMinutes:30,externalCheck:"summary",requiredQuestionIds:[],
  requiredActivityIds:[],requiredPracticeIds:[],
  scenes:[
    {id:"welcome",phase:"Loppuyhteenveto",kind:"introduction",title:"Opiskelu, osaaminen ja itsearvio ovat eri asioita",paragraphs:[
      "LOS ei arvaa kielitasoasi pelkän oppitunnin avaamisen, tehtävien pisteiden tai oman arvion perusteella. Jokaisen väitteen pitää perustua tallennettuun näyttöön.",
      "Koko kirjan oppimistavoitteet näkyvät yhteenvedossa. Osa taitojen kohdista voi vielä olla tilassa Ei tarkistettua näyttöä, vaikka olisit käsitellyt aiheen."
    ]},
    {id:"evidence",phase:"Osaamisen tulkinta",kind:"explanation",title:"Mitä on itsenäinen tai myöhemmin vahvistettu näyttö?",paragraphs:[
      "Itsenäinen tarkistus tarkoittaa oikein ratkaistua, ensimmäistä yritystä tehtävässä, jonka rooliksi on merkitty itsenäinen, soveltava tai lopputarkistus. Jos pyysit vihjettä, ratkaisit ensin väärin tai katsoit mallin, suoritus jää harjoitteluksi.",
      "Myöhempi vahvistus vaatii saman taidon uuden itsenäisen tarkistuksen eri oppitunnilla vähintään vuorokautta myöhemmin. Pelkkä saman tehtävän uudelleen klikkaaminen ei riitä.",
      "Loppukoe antaa erillisen rajatun näyttöluokan: pisteytettyjä, vihjeettömiä valintoja. Vapaa kirjoitus, puhe, sanakorttien omat arviot ja opetettujen sisältöjen läpikäynti pidetään niistä erillään."
    ]},
    {id:"summary-book",phase:"Omat tallennetut tiedot",kind:"book",title:"Tarkastele kaikkia kymmentä tavoitetta",paragraphs:[
      "Avaa kirjan Yhteenveto. Merkitse jokainen kymmenestä tavoitteesta katselmoiduksi rehellisesti riippumatta osaamisesta. Kertaa vähintään viisi oikeaa sanakorttia.",
      "Kirjoita konkreettinen seuraava oppimistavoitteesi ja merkitse oma sanallinen kokonaisarvio. Näyttöjen yhteenveto päivittyy suoraan tallennuksistasi."
    ],bookLinks:[
      {label:"L060 · oma osaamisyhteenveto",chapterId:"93",section:"summary",instruction:"Tarkista tavoitteet, muistamisen arviot ja seuraava oma tavoite."}
    ]},
    {id:"summary",phase:"Viimeinen oppitunti",kind:"summary",title:"Tässä on perusteltu osaamisesi tilanne",paragraphs:[
      "Yhteenveto näyttää vain tietoja, jotka käytettävissä olevista tallennuksista todella löytyvät. Puuttuva näyttö ei tarkoita, ettet osaisi, mutta se ei myöskään oikeuta LOSia väittämään taitoa saavutetuksi.",
      "LOS! 1:n A1.1 on opetussuunnitelman suunnittelutavoite, ei tämän sovelluksen antama virallinen CEFR-luokitus. Seuraavaan kirjaan voi edetä myös silloin, kun yksittäistä taitoa pitää vielä kerrata."
    ]}
  ]
};
