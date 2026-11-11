import type {FirstLesson} from './firstLessons';

/** Final two original LOS! teaching plans. They provide guided use of already
 * existing independent review and exam banks. A passing app build does NOT
 * constitute editorial, audio, accessibility or production-data approval.
 */
export const finalLessons:readonly FirstLesson[]=[
 {id:'L057',title:'Kaikkien 10 kappaleen taitosekoitus',requiredIds:['REV2-15','REV2-16','REV2-17','REV2-18','REV2-19','REV2-20'],steps:[
  {id:'L057-S1',kind:'recall',title:'Kertaa kymmenen taitoa ilman mallia',minutes:4,instructionFi:'Yritä palauttaa mieleen tervehdys, nimikysymys, kotimaa, Sie-puhuttelu, vointi, ikä, tavaus, selvennyspyyntö, viikonpäivä ja toisen henkilön esittely. Tässä vaiheessa ei vaadita, että osaat alkuperäistekstien kaikkia vaikeita sivulauseita. Ne ovat lukemisen tukia.'},
  {id:'L057-S2',kind:'practice',title:'Neljä nopeaa yhdistely- ja muistitehtävää',minutes:9,instructionFi:'Tee uudet itsenäiset tehtävät tervehtimisestä C01:ssä, ymmärtämisfraasista C08:ssa, Larissan oikeasta iästä C06:n Monika Janickan tekstissä ja kohteliaasta tavaamisesta C07:ssä. Aiemmat kappalevastaukset eivät kuittaa näitä uusiksi yrityksiksi.',chapterId:'C08',exerciseIds:['REV2-15','REV2-16','REV2-17','REV2-18']},
  {id:'L057-S3',kind:'practice',title:'Tapaamisaika ja kokoava keskusteluteksti',minutes:9,instructionFi:'Yhdistä torstai ja kellonaika oikeaksi fraasiksi. Kirjoita sen jälkeen kuvitteellinen 8–10 repliikin keskustelu, johon kokoat vähintään viisi jo opittua taitoa kymmenestä. Kirjoitustehtävä on itsearvioitava, eikä automaattinen tarkistus arvioi tekstin kokonaislaatua.',chapterId:'C10',exerciseIds:['REV2-19','REV2-20']},
  {id:'L057-S4',kind:'reflection',title:'Tunnista taito, jonka osaat jo ilman vihjettä',minutes:5,instructionFi:'Kirjoita suomeksi, mikä kymmenestä osaamisesta onnistui parhaiten, mitä jouduit tarkistamaan ja miten harjoittelet sitä uudelleen. Erottele oman osaamisesi arvio alkuperäistekstien julkaisun lopullisista G1–G8-porttien hyväksynnöistä.'},
  {id:'L057-S5',kind:'check',title:'Loppukoe on erillinen suoritus',minutes:3,instructionFi:'Varmista kuusi uutta palautettua tehtävää ja oma tallennettu pohdinta. L057:n suoritus ei kuittaa L059:n erillistä viidenkymmenen tehtävän loppukoetta, C06:n ja C08:n mediatoistotestejä eikä koko kirjan julkaisuvalmiutta.'}
 ]},
 {id:'L059',title:'Koko kirjan loppukoe',requiredIds:['EX-FINAL'],steps:[
  {id:'L059-S1',kind:'recall',title:'Varaa aikaa itsenäiseen loppukokeeseen',minutes:3,instructionFi:'Muista, että LOS! 1:n loppukoe on kirjoitetun oppimateriaalin itsenäinen harjoituskoe, ei virallinen lukion kurssikoe tai todistus eurooppalaisesta kielitaitotasosta. Älä katso sanastoa juuri ennen kuin aloitat, jos haluat arvioida omaa muistamistasi.'},
  {id:'L059-S2',kind:'vocabulary',title:'Kertauksen viimeinen katsaus',minutes:3,instructionFi:'Kertaa lyhyesti kymmenen kappaleen tärkeimmät käyttöfraasit: tervehdykset, nimet, alkuperä, du/Sie, vointi, ikä, tavaaminen, selvennykset, viikonpäivät ja kolmannen henkilön esittely. Kokeen aikana vastaukset eivät näy ennen lopullista palautusta.',chapterId:'C10'},
  {id:'L059-S3',kind:'practice',title:'Loppukoe: 50 automaattisesti tarkistettavaa tehtävää',minutes:20,instructionFi:'Tee EX-FINAL-koepankin kaikki 50 tehtävää yhdellä lopullisella palautuksella. Kokeessa on kymmenen kappaleen alkeistaitoja ja erillinen vähintään noin kolmen lauseen saksankielinen itsearvioitava kirjoitus- tai dialoginäyte, jonka pituuden oppitunti tarkistaa. Ajat ovat vain suosituksia, joten voit käyttää kokeeseen reilusti enemmän aikaa.',chapterId:'C10',exerciseIds:['EX-FINAL']},
  {id:'L059-S4',kind:'reflection',title:'Mitä opit ja mitä harjoittelet?',minutes:3,instructionFi:'Kirjoita suomeksi lyhyt rehellinen arvio kokeen jälkeen. Nimeä ainakin yksi vahvuus ja yksi opittu sääntö, johon palaat. Oikein menneiden monivalintojen määrä ei kerro yksin kielen suullisesta hallinnasta.'},
  {id:'L059-S5',kind:'check',title:'Palautuksen ja tallennuksen vahvistus',minutes:1,instructionFi:'Koko viidenkymmenen tehtävän paperin ja kirjoitusnäytteen sekä oma pohdinta on tallennettava. Kokeen palautus avaa oikeat ratkaisut, mutta ei todista, että kaikki CC-lisenssit, mediatiedostojen mobiilitoisto, kuvat, tietokantasynkronointi tai esteettömyys ovat hyväksyttyjä.'}
 ]}
];
