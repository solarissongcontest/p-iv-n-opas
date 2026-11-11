import type {FirstLesson} from './firstLessons';

export const chapter09Lessons:readonly FirstLesson[]=[
 {id:'L046',title:'Viikonpäivät',requiredIds:['C09-X01','C09-X03'],steps:[
  {id:'L046-S1',kind:'recall',title:'Muista tutut aika- ja numerosanat',minutes:4,instructionFi:'Muista kolme aiemmin esiintynyttä numeroa: zwei, drei ja vier. Kokeile, muistatko saksan sanan tänään ja huomenna.'},
  {id:'L046-S2',kind:'instruction',title:'Viikon seitsemän päivää',minutes:8,instructionFi:'Opiskele Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag ja Sonntag. Saksan viikonpäivät ovat substantiiveja ja kirjoitetaan isolla. Tässä opetellaan myös kellonajassa tarvittavat drei, vier ja fünf sekä Uhr.',chapterId:'C09'},
  {id:'L046-S3',kind:'read',title:'Franz ja Greta lukijassa',minutes:6,instructionFi:'Lue alkuperäinen Franzin ja Gretan lyhyt Sport und Zeit -dialogi. Etsi jo tunnistettavat sanat Hallo ja um drei. Viertel vor drei on tässä tekstin ymmärtämisen tukifraasi, eikä sitä vaadita itsenäiseksi kellonajan tuotannoksi.',chapterId:'C09'},
  {id:'L046-S4',kind:'practice',title:'Kaksi ensimmäistä viikonpäivää',minutes:9,instructionFi:'Valitse maanantain ja sunnuntain saksankieliset nimet. Yritä ensin muistista ja avaa sanasto vasta tarvittaessa.',chapterId:'C09',exerciseIds:['C09-X01','C09-X03']},
  {id:'L046-S5',kind:'check',title:'Muista viikko järjestyksessä',minutes:3,instructionFi:'Sano viikon seitsemän päivää ääneen maanantaista sunnuntaihin. Voit tarkistaa kirjasta ja yrittää uudelleen.'}
 ]},
 {id:'L047',title:'Lue Sport und Zeit',requiredIds:['C09-X14','C09-X15','C09-X16'],steps:[
  {id:'L047-S1',kind:'recall',title:'Muista kellonajat',minutes:4,instructionFi:'Palauta mieleen am Montag ja um drei Uhr. Pyri löytämään tekstistä näille tuttu käyttötapa.'},
  {id:'L047-S2',kind:'read',title:'Lue koko alkuperäinen Sport und Zeit',minutes:9,instructionFi:'Lue alkuperäinen seitsemän repliikin Sport und Zeit -keskustelu alusta loppuun. Franz pelaa jalkapalloa, Greta kysyy kellonajasta ja keskustelu päättyy hyvästelyyn. Näytä suomennokset vain silloin kun tarvitset niitä.',chapterId:'C09'},
  {id:'L047-S3',kind:'vocabulary',title:'Etsi aktiivisanat',minutes:5,instructionFi:'Kertaa um drei Uhr, wann, am Montag, die Woche, heute ja morgen. Huomaa, että es ist Viertel vor drei on tässä vaativampi tukimuoto, ei koko kellonaikakielen oppimistavoite.',chapterId:'C09'},
  {id:'L047-S4',kind:'practice',title:'Kolme lähdetekstiin sidottua tehtävää',minutes:9,instructionFi:'Korosta kaksi tarkkaa aika-ilmausta alkuperäisestä dialogista ja vastaa, kuka kertoo pelaavansa kolmelta jalkapalloa.',chapterId:'C09',exerciseIds:['C09-X14','C09-X15','C09-X16']},
  {id:'L047-S5',kind:'check',title:'Kerro keskustelu omin sanoin',minutes:3,instructionFi:'Kuka sanoo Viertel vor drei ja kuka kertoo harrastuksesta? Mikä merkitys on ilmauksella um drei?'}
 ]},
 {id:'L048',title:'Am Montag, um drei Uhr',requiredIds:['C09-X04','C09-X05','C09-X08','C09-X10'],steps:[
  {id:'L048-S1',kind:'recall',title:'Päivä vai kellonaika?',minutes:4,instructionFi:'Mieti kumpi on oikein: am Montag vai um Montag? Miten sanoisit kello kolme ilman viikonpäivää?'},
  {id:'L048-S2',kind:'grammar',title:'Am + päivä ja um + aika',minutes:8,instructionFi:'Opettele kaksi kiinteää mallia: am Montag, am Dienstag ja um drei Uhr, um vier Uhr, um fünf Uhr. Yhdistä ne: Am Montag um drei Uhr. Älä yleistä am- ja um-muotoja muihin prepositioihin vielä.',chapterId:'C09'},
  {id:'L048-S3',kind:'instruction',title:'Iso alkukirjain ja numero',minutes:5,instructionFi:'Viikonpäivä alkaa isolla myös keskellä lausetta: am Freitag. Opettele kolme harjoitusajoissa tarvittavaa numeroa drei, vier ja fünf. 24 tunnin kellonajan yksityiskohdat sekä vartin yli ja puoli tunnin ilmaukset eivät kuulu tähän kokeen aktiiviosaan.',chapterId:'C09'},
  {id:'L048-S4',kind:'practice',title:'Neljä täsmällistä ajanmuodostustehtävää',minutes:10,instructionFi:'Täydennä am ja um, järjestä kokonainen aika ja tunnista viikonpäivän iso alkukirjain. Palauta jokainen neljästä tehtävästä erikseen.',chapterId:'C09',exerciseIds:['C09-X04','C09-X05','C09-X08','C09-X10']},
  {id:'L048-S5',kind:'check',title:'Puhu yksi tapaaminen',minutes:3,instructionFi:'Sano ääneen Am Montag um drei Uhr. Vaihda sen jälkeen maanantai tiistaiksi ja kello kolme neljäksi.'}
 ]},
 {id:'L049',title:'Kuuntele ja merkitse kalenteriin',requiredIds:['C09-X19','C09-X20','C09-SCHEDULE'],requiredMediaIds:['M-COM-09-DAYS'],steps:[
  {id:'L049-S1',kind:'recall',title:'Viikonpäivät muistista',minutes:4,instructionFi:'Yritä sanoa kaikki seitsemän viikonpäivää saksaksi ennen kuuntelua. Muista myös viikonpäivän ison alkukirjaimen sääntö.'},
  {id:'L049-S2',kind:'listen',title:'Christophin alkuperäinen viikonpäivä-äänite',minutes:8,instructionFi:'Kuuntele ihmisen alun perin Wikibooksiin nauhoittama noin 15 sekunnin äänite, jossa sanotaan Tage ja viikonpäivät Montagista Sonntagiin. Alkuperäinen koko litteraatti näkyy LOS!:ssa, ja suomennos voidaan avata. Äänitteessä ei ole tapaamisaikoja.',chapterId:'C09'},
  {id:'L049-S3',kind:'practice',title:'Tunnista aloitus ja keskiviikko',minutes:9,instructionFi:'Kuuntele aito alkuperäinen äänite tarvittaessa uudelleen. Valitse millä päivällä luettelo alkaa ja kirjoita sen keskiviikko saksaksi. Tarkista harjoitukset vasta vastattuasi.',chapterId:'C09',exerciseIds:['C09-X19','C09-X20']},
  {id:'L049-S4',kind:'practice',title:'Täytä seitsemän päivän kuvitteellinen kalenteri',minutes:6,instructionFi:'Valitse jokaiselle viikonpäivälle harjoiteltu tapaamisaika (um drei, vier tai fünf Uhr). Tämä on LOS!:n itse laadittu kuvitteellinen kalenteriharjoitus, ei kuuntelutiedostosta poimittava henkilökohtainen aikataulu.',chapterId:'C09',exerciseIds:['C09-SCHEDULE']},
  {id:'L049-S5',kind:'check',title:'Tarkista kalenteri ja kuuntelu',minutes:3,instructionFi:'Seitsemän päivän merkintöjen on oltava täytetty ja palautettu erikseen. Äänitteen on myös pitänyt oikeasti toistua loppuun; pelkän litteraatin lukeminen ei riitä kuuntelun suoritusmerkinnäksi.'}
 ]},
 {id:'L050',title:'Harjoittele ja testaa C09',requiredIds:['EX-C09'],steps:[
  {id:'L050-S1',kind:'recall',title:'Viikonpäivät ilman sanastoa',minutes:4,instructionFi:'Palauta mieleen kaikki seitsemän viikonpäivää sekä am Montag ja um drei Uhr. Näistä tulee myös kokeen kysymyksiä.'},
  {id:'L050-S2',kind:'vocabulary',title:'Tarkista viimeiset ajankohdat',minutes:5,instructionFi:'Kertaa am + viikonpäivä, um + kellonaika, heute, morgen ja wann. Kokeessa ratkaisut näytetään vasta koko paperin palauttamisen jälkeen.',chapterId:'C09'},
  {id:'L050-S3',kind:'practice',title:'Riippumaton kappaletesti C09',minutes:13,instructionFi:'Tee 15 kysymyksen erillinen kappaletesti yhdellä palautuksella. Oikeat vastaukset ja perustelut avautuvat vasta lopussa; tätä ei korvata aiemmilla harjoituksilla.',chapterId:'C09',exerciseIds:['EX-C09']},
  {id:'L050-S4',kind:'reflection',title:'Arvioi omat aikatietosi',minutes:5,instructionFi:'Kirjoita suomeksi, muistatko viikonpäivät ja erotatko am ja um. Kerro myös yksi pieni tavoite seuraavalle opiskelukerralle.'},
  {id:'L050-S5',kind:'check',title:'Jatkotavoite',minutes:3,instructionFi:'Kertaa tarvittaessa vaikeat päivänimet. LOS! 1:n loppukoe ei vielä ole lopullisesti julkaistava, vaikka tämä kappaletesti on harjoiteltavissa.'}
 ]}
];
