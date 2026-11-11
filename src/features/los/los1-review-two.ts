/** LOS! 1 review II, 3 x ~30 minutes, 18 newly authored retrieval tasks.
 * Mixed recall is not a disguised copy of the final examination.
 * Cross-text replay uses only existing licensed media / in-app sources.
 */
import type {ContentBlock,Exercise} from "./model";
const base={version:"0.1.0",difficulty:"applied" as const,
 objectives:["L1-NUM-01","L1-PHON-01","L1-TIME-01","L1-PROD-01","L1-STRAT-01"]};
const choice=(id:string,promptFi:string,options:[string,string,string],right:0|1|2,explanationFi:string):Exercise=>({
 ...base,id:"los1-review2-"+id,type:"single-choice",promptFi,
 options:options.map((label,i)=>({id:"o"+i,label})),correctOptionId:"o"+right,explanationFi,
});
const gap=(id:string,promptFi:string,before:string,after:string,answer:string,explanationFi:string):Exercise=>({
 ...base,id:"los1-review2-"+id,type:"gap-fill",promptFi,
 sentenceBefore:before,sentenceAfter:after,acceptedAnswers:[answer],explanationFi,
});
export const LOS1_REVIEW_TWO_BLOCKS:ContentBlock[]=[
 {id:"los1-review2-intro-a",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"Kertaus II · 1/3. Sulje sanasto ja palauta mieleen ensin C06–C09:n lukusanat, aakkosten nimet ja viikonpäivät. Tämän tunnin kuusi harjoitusta eivät edellytä erillisiä äänitiedostoja, koska todellista nimen tavaamisen nauhoitetta ei ole vielä toimitettu. Voit kuunnella C07:n koko ihmisen nauhoittaman aakkoston uudelleen ja tarkistaa sen kirjoitetun muodon. Kirjoita lopuksi yksi oma keksitty kalenterimerkintä."},
 {id:"los1-review2-intro-b",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"Kertaus II · 2/3. Nyt käytät kaikkia C01–C10:n keskeisiä taitoja yhdessä: tervehdykset, nimet, alkuperä, du/Sie, vointi, ikä, tavaus, toisto, kellonaika sekä kolmannen henkilön esittely. Etene ensin ilman vihjeitä. Kuusi omaa harjoitusta eivät ole loppukokeen kysymysten kopioita. Jos epäonnistut, palaa oikeaan alkuperäistekstiin ja kertaa vain vaikea asia."},
 {id:"los1-review2-intro-c",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"Kertaus II · 3/3. Kirjoita koko pieni kuvitteellinen ensikohtaaminen muistista, yksi repliikki omalle rivilleen. Valitse lisäksi kolmannen henkilön esittely ja oma aikailmaus. Lue vasta lopuksi malliharjoitus. Äänen äänittäminen on halutessasi mahdollista C10:n puheharjoituksessa, mutta puhetta ei arvioida automaattisesti. Kun nämä 18 tehtävää ja avoimet tuotokset on tehty, voit siirtyä loppukokeen harjoitusversioon."},
 {id:"los1-review2-tools",version:"0.1.0",kind:"table",
  headers:["Unohdin...","Palaa","Tarkista"],
  rows:[
   ["0–100 luvut","C06","ikä, zwanzig, fünfzig"],
   ["Nimen tavauksen","C07","kirjaimet, Bitte buchstabieren Sie."],
   ["Ymmärtämispyynnön","C08","Noch einmal, bitte. / Bitte langsamer."],
   ["Viikonpäivän / tasatunnin","C09","am Dienstag um vier Uhr"],
   ["Kolmannen henkilön esittelyn","C10","er heißt / sie kommt"],
  ]},
 {id:"los1-review2-production-a",version:"0.1.0",kind:"production",
  titleFi:"Luo kuvitteellinen päivän ja kellonajan merkintä",
  promptFi:"Kirjoita ilman vihjettä yksi kuvitteellinen kalenterimerkintä saksaksi: viikonpäivä ja tasatunti. Tarkista sitten, että viikonpäivä alkaa isolla ja käytät am- ja um-sanoja.",
  modelDe:"am Donnerstag um vier Uhr",modelFi:"torstaina kello neljältä",
  criteriaFi:["Kirjoitin viikonpäivän oikein.","Am edeltää viikonpäivää.","Um edeltää tasatuntia.","Lopuksi on Uhr."],
 },
 {id:"los1-review2-production-b",version:"0.1.0",kind:"production",
  titleFi:"Muodosta kahdesta henkilöstä neljä omaa esittelyvirkettä",
  promptFi:"Keksi mies ja nainen. Kerro kummankin nimi ja lähtömaa er- ja sie-pronominilla. Käytä kolmannen persoonan heißt/kommt-muotoja. Älä käytä oikeiden ihmisten henkilökohtaisia tietoja.",
  modelDe:"Er heißt Ben. Er kommt aus Finnland. Sie heißt Mia. Sie kommt aus Deutschland.",
  modelFi:"Hän (mies) on Ben, Suomesta. Hän (nainen) on Mia, Saksasta.",
  criteriaFi:["Käytin er ja sie oikein.","Kirjoitin heißt ja kommt oikein.","Neljä itsenäistä virkettä."],
 },
 {id:"los1-review2-production-c",version:"0.1.0",kind:"production",
  titleFi:"Kokoa ensimmäinen kokonainen kohtaaminen",
  promptFi:"Kirjoita 6–8 repliikin kuvitteellinen tuttavallinen saksankielinen keskustelu ilman mallia. Sisällytä tervehdykset, nimien kysyminen, lähtöpaikka, voinnin kysyminen, yksi selvennyspyyntö, viikkopäivä ja tasatunti sekä hyvästely. Vertaa malliin vasta kirjoittamisen jälkeen.",
  modelDe:"Lena: Hallo! Ich heiße Lena. Wie heißt du?\nBen: Hallo! Ich heiße Ben.\nLena: Woher kommst du?\nBen: Aus Finnland. Und du?\nLena: Aus Deutschland. Wie geht's?\nBen: Gut, danke. Am Freitag um vier Uhr?\nLena: Noch einmal, bitte. Freitag um vier?\nBen: Ja! Bis Freitag!",
  modelFi:"Lena: Hei! Olen Lena. Mikä sinun nimesi on?\nBen: Hei! Olen Ben.\nLena: Mistä olet kotoisin?\nBen: Suomesta. Entä sinä?\nLena: Saksasta. Mitä kuuluu?\nBen: Hyvää, kiitos. Perjantaina neljältä?\nLena: Vielä kerran, kiitos. Perjantaina neljältä?\nBen: Kyllä! Nähdään perjantaina!",
  criteriaFi:["Kirjoitin 6–8 repliikkiä.","Tervehdys ja hyvästely mukana.","Nimi, kotimaa ja vointi mukana.","Pyysin tarvittaessa toistamaan.","Sovittiin päivä ja tasatunti."],
 },
 {id:"los1-summary-intro",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"LOS! 1:n päätöstunti. Katso C01–C10 ja omat harjoituskoetuloksesi. Osaaminen on taitoja, ei yksittäisen pistemäärän arvo: osaan tervehtiä, esittäytyä, puhua alkuperästä ja voinnista, käyttää muutamaa kohteliasta pyyntöä, tavata nimen ja kertoa päivän/tasatunnin. Osa harjoituksista odottaa vielä alkuperäisiä äänitiedostoja tai oikeuksien hyväksyntää; tämä ei ole väite täysin julkaistusta kurssista eikä virallinen todistus. Kirjoita oma seuraava tavoite ja aktivoi haluamasi kertauskortit."},
 {id:"los1-summary-checklist",version:"0.1.0",kind:"table",
  headers:["Taito","Esimerkki","Kertaa"],
  rows:[
   ["Tervehdin ja hyvästelen","Hallo! · Tschüss!","C01"],
   ["Kerron nimeni","Ich heiße Lena.","C02"],
   ["Kerron alkuperäni","Ich komme aus Finnland.","C03"],
   ["Käytän du/Sie","Wie heißen Sie?","C04"],
   ["Kerron voinnin","Gut, danke.","C05"],
   ["Kerron iän","Ich bin siebzehn.","C06"],
   ["Tavaan nimen","L – E – N – A","C07"],
   ["Pyydän toistamaan","Noch einmal, bitte.","C08"],
   ["Sovin tapaamisajan","am Montag um drei Uhr","C09"],
   ["Esittelen jonkun muun","Sie heißt Berna.","C10"],
  ]},
 {id:"los1-summary-next",version:"0.1.0",kind:"paragraph",language:"fi",
  text:"Seuraavaksi voit jatkaa LOS! 2:n SAB32-sisältöihin, kun ne on toimitettu julkaistaviksi, tai käydä läpi omat C01–C10-kertaukset. Viimeistele etenkin kolme asiaa, jotka tuntuivat vaikeimmilta. Älä tulkitse itsearviointia automaattiseksi oikeaksi kielitaitotasoksi: varmista osaaminen vielä autenttisella kuuntelulla ja omalla puhumisella. Jatkosuunnitelmaa ei luoda ilman opiskelijan omaa tavoitetta."},
];
export const LOS1_REVIEW_TWO_EXERCISES:Exercise[]=[
 // L056 6: numerals, spelling, calendar
 choice("a01","Mikä on 17 saksaksi?",["sechzehn","siebzehn","siebenundzwanzig"],1,"Siebzehn = 17."),
 gap("a02","Kirjoita numero 20 saksaksi.","", "", "zwanzig","Zwanzig = 20."),
 choice("a03","Miten saksan W-kirjain nimetään?",["We","Vau","Jott"],0,"Kirjaimen nimi on We."),
 choice("a04","Minkä nimistä kirjainta tarvitset sanan Lena ensimmäiseksi?",["M","L","R"],1,"Lena alkaa L-kirjaimella."),
 gap("a05","Täydennä ilmaisun keskiviikkona ensimmäinen sana.","","Mittwoch","am","am Mittwoch."),
 choice("a06","Kumpi on oikein 'kello neljältä'?",["am vier Uhr","um vier Uhr","um Mittwoch"],1,"Um vier Uhr."),
 // L057 6: cross-book
 choice("b01","Mikä kohtelias nimikysymys sopii tuntemattomalle aikuiselle?",["Wie heißt du?","Wie heißen Sie?","Wann?"],1,
  "Wie heißen Sie? käyttää Sie-muotoa."),
 gap("b02","Täydennä lähtöpaikkakysymys kaverille.","Woher","du?","kommst","Woher kommst du?"),
 choice("b03","Mikä on heikomman voinnin vastaus?",["Sehr gut!","Nicht so gut.","Toll!"],1,"Nicht so gut."),
 gap("b04","Täydennä kohtelias toistopyyntö.","Noch"," , bitte.","einmal","Noch einmal, bitte."),
 choice("b05","Miten kerrot Haraldista kolmannessa persoonassa?",["Er kommt aus München.","Er kommst aus München.","Ich kommt aus München."],0,
  "Er kommt aus München."),
 choice("b06","Mikä on oikea lähdehaastattelun tieto?",["Berna tulee Münchenistä.","Harald tulee Kielistä.","Berna tulee Kielistä."],2,
  "Bernan lähteen mukaan hän on kotoisin Kielistä."),
 // L058 6: independent transfer
 gap("c01","Aloita kuviteltu keskustelu tervehdyksellä.","", "!", "Hallo", "Hallo!"),
 choice("c02","Esittele kaverille kuvitteellinen nainen nimeltä Mia.",["Sie heißt Mia.","Sie heißen Mia.","Du heiße Mia."],0,
  "Sie heißt Mia. kolmannessa persoonassa."),
 gap("c03","Täydennä toinen henkilö puheeksi.","Er","Ben.","heißt","Er heißt Ben."),
 choice("c04","Kaveri pyytää toistamaan. Mikä vastaus osoittaa että ymmärsit pyynnön?",["Olet sanomatta mitään.","Toistat viestin hitaammin.","Lopetat keskustelun."],1,
  "Selvennyspyyntöön vastataan toistamalla rauhallisesti."),
 gap("c05","Täydennä tapaamisaika.","am Freitag","vier Uhr","um","Am Freitag um vier Uhr."),
 choice("c06","Päätä lyhyt ystävällinen tapaaminen.",["Tschüss!","Wie alt bist du?","Woher kommst du?"],0,
  "Tschüss! on epämuodollinen hyvästely."),
];
