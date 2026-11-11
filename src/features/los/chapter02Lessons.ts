import type {FirstLesson} from './firstLessons';

export const chapter02Lessons:readonly FirstLesson[]=[
 {id:'L007',title:'Miten kysyn nimen?',requiredIds:['C02-X01','C02-X16'],steps:[
  {id:'L007-S1',kind:'recall',title:'Muista tervehdys',minutes:4,instructionFi:'Palauta mieleesi kaksi eri tervehdystä ja yksi hyvästely C01:stä. Avaa sanasto vasta oman yrityksen jälkeen.'},
  {id:'L007-S2',kind:'instruction',title:'Ensimmäinen nimikysymys',minutes:7,instructionFi:'Opi kokonainen kysymys Wie heißt du? ja vastaus Ich heiße … . Huomaa heiße ja heißt: minä ja sinä ovat eri verbimuotoja. Sana wer tarkoittaa kuka, mutta kysymystä Wer ist das? käytetään eri tilanteessa.',chapterId:'C02'},
  {id:'L007-S3',kind:'read',title:'Tapaa Franz ja Greta',minutes:7,instructionFi:'Lue Franzin ja Gretan alkuperäinen kuuden repliikin dialogi LOS!:n lukijassa. Ensimmäisellä kerralla etsi vain nimet ja tervehdykset. Kennst du den Lehrer? on tässä tukilause, ei opittava taivutus.',chapterId:'C02'},
  {id:'L007-S4',kind:'practice',title:'Tarkista kaksi kysymystä',minutes:9,instructionFi:'Valitse oikea nimikysymys ja se, miten kysytään kolmannesta henkilöstä. Palauta molemmat harjoitukset.',chapterId:'C02',exerciseIds:['C02-X01','C02-X16']},
  {id:'L007-S5',kind:'check',title:'Lopputarkistus',minutes:3,instructionFi:'Sano ääneen Wie heißt du? ja vastaa kokonaisella Ich heiße … -lauseella käyttäen mitä tahansa kuvitteellista nimeä.'}
 ]},
 {id:'L008',title:'Franz ja Greta: kokonainen dialogi',requiredIds:['C02-E03','C02-X11','C02-X13'],steps:[
  {id:'L008-S1',kind:'recall',title:'Vastaa nimeen muistista',minutes:4,instructionFi:'Miten kysytään nimesi? Miten vastaaja kertoo sen? Yritä ilman näkyvää mallia.'},
  {id:'L008-S2',kind:'read',title:'Lue kaikki kuusi repliikkiä',minutes:9,instructionFi:'Lue Text A kokonaan. Avaa suomennokset tarvittaessa. Greta käyttää fraasia Wie geht’s? voinnin kysymiseen. Tarkempi rakenne tulee C05:ssä.',chapterId:'C02'},
  {id:'L008-S3',kind:'vocabulary',title:'Nimien ja ihmisten sanat',minutes:5,instructionFi:'Kertaa heißen, ich heiße, du heißt, der Name ja das ist. Piilota merkitykset ja kerro ne itse.',chapterId:'C02'},
  {id:'L008-S4',kind:'practice',title:'Kolme lähdetekstiin sidottua tehtävää',minutes:9,instructionFi:'Korosta Gretan oma nimen kertova repliikki ja tunnista, kuka puhuu missäkin vuorossa. Vastaukset tarkistetaan alkuperäisestä kuuden repliikin tekstistä.',chapterId:'C02',exerciseIds:['C02-E03','C02-X11','C02-X13']},
  {id:'L008-S5',kind:'check',title:'Lopputarkistus',minutes:3,instructionFi:'Kerro omin sanoin: kuka kysyy nimeä, kuka kertoo opettajan nimen ja miten keskustelu loppuu.'}
 ]},
 {id:'L009',title:'Heißen ja sein minä–sinä',requiredIds:['C02-E01','C02-E02','C02-E04','C02-X10'],steps:[
  {id:'L009-S1',kind:'recall',title:'Ensin ilman mallia',minutes:4,instructionFi:'Kirjoita mielessäsi Ich heiße ja Wie heißt du? ennen kuin luet taulukon.'},
  {id:'L009-S2',kind:'grammar',title:'Verbin muoto muuttuu',minutes:8,instructionFi:'Opiskele heiße–heißt ja bin–bist. Sano kokonaisina esimerkkeinä Ich heiße Lea, Du heißt Sam, Ich bin Lea ja Du bist Sam. Kolmannen persoonan muodot ovat vasta tunnistuksen tukena.',chapterId:'C02'},
  {id:'L009-S3',kind:'instruction',title:'Nimen kysymys vai vastaus?',minutes:5,instructionFi:'Erottele kysymys Wie heißt du? ja vastaus Ich heiße ... . Älä tee virhettä Ich heißt. Verbin muodon oppii toistamalla valmiita oikeita pareja.',chapterId:'C02'},
  {id:'L009-S4',kind:'practice',title:'Neljä verbimuototehtävää',minutes:10,instructionFi:'Tee kaksi täydennystä, valitse oikea sein-lause ja täytä neljä persoonamuotoa. Jokaisesta tehtävästä palautetaan yritys.',chapterId:'C02',exerciseIds:['C02-E01','C02-E02','C02-E04','C02-X10']},
  {id:'L009-S5',kind:'check',title:'Lopputarkistus',minutes:3,instructionFi:'Sano muistista kaksi paria: ich heiße / du heißt ja ich bin / du bist.'}
 ]},
 {id:'L010',title:'Kuuntele ja esittele henkilö',requiredIds:['C02-X14','C02-X15','C02-X18'],requiredMediaIds:['M-COM-02'],steps:[
  {id:'L010-S1',kind:'recall',title:'Ennusta puheen aihe',minutes:3,instructionFi:'Ennen kuuntelua muista kysymys Wie heißt du? ja vastaus Ich heiße ... .'},
  {id:'L010-S2',kind:'listen',title:'Ich bin Peter: alkuperäinen puhe',minutes:8,instructionFi:'Kuuntele ihmisen äänittämä nelirepliikkinen keskustelu kokonaan. Lukijassa on koko saksankielinen transcripti ja erikseen avattavat suomennokset. Puheessa mainitaan myös lähtömaat, jotka opetellaan vasta C03:ssa.',chapterId:'C02'},
  {id:'L010-S3',kind:'practice',title:'Kaksi kuuntelutehtävää',minutes:9,instructionFi:'Kuuntele vielä: tunnista Peterin esittelijä ja kirjoita ensimmäinen nimikysymys. Jos ääni ei toimi, voit harjoitella litteraatin avulla, mutta tehtävä ei silloin ole kuuntelunäyttö.',chapterId:'C02',exerciseIds:['C02-X14','C02-X15']},
  {id:'L010-S4',kind:'practice',title:'Kirjoita oma lyhyt dialogi',minutes:7,instructionFi:'Kirjoita kolmen repliikin keskustelu, jossa toinen tervehtii ja kysyy nimeä, toinen vastaa ja ensimmäinen esittäytyy. Tarkista itsearviointimalli.',chapterId:'C02',exerciseIds:['C02-X18']},
  {id:'L010-S5',kind:'check',title:'Lopputarkistus',minutes:3,instructionFi:'Ymmärsitkö kuuntelusta, kuka esitteli Peterin? Kuuntelu on merkitty kuulluksi vasta, kun alkuperäinen ääni on tosiasiassa päättynyt.'}
 ]},
 {id:'L011',title:'Harjoittele ja testaa C02',requiredIds:['EX-C02'],requiredMediaIds:['M-COM-02'],steps:[
  {id:'L011-S1',kind:'recall',title:'Nimi ja verbimuodot muistista',minutes:4,instructionFi:'Kirjoita mielessäsi neljä muotoa: ich heiße, du heißt, ich bin ja du bist. Muista myös nimikysymys.'},
  {id:'L011-S2',kind:'vocabulary',title:'Kertaa vaikeimmat sanat',minutes:5,instructionFi:'Kertaa nimet, pronominit ja kysymykset. Älä lue koevastauksia etukäteen; oppikirjan harjoituksissa vihjeitä saa edelleen käyttää.',chapterId:'C02'},
  {id:'L011-S3',kind:'practice',title:'Riippumaton C02-kappaletesti',minutes:13,instructionFi:'Tee kokonainen uusi 15 kysymyksen kappaletesti. Ratkaisut näytetään vasta koko testin palautuksen jälkeen.',chapterId:'C02',exerciseIds:['EX-C02']},
  {id:'L011-S4',kind:'reflection',title:'Osaamisen itsearviointi',minutes:5,instructionFi:'Kirjoita suomeksi, osaatko kysyä nimeä ja vastata oikein. Kerro yksi vielä harjoiteltava verbi.'},
  {id:'L011-S5',kind:'check',title:'Lopputarkistus',minutes:3,instructionFi:'Lopputulos on harjoituskoetulos, ei virallinen kielitaitotodistus. Kertaa väärin menneet muodot huomenna.'}
 ]}
];
