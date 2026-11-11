import type {FirstLesson} from './firstLessons';

// New, separate review exercise IDs prevent a previous chapter attempt from
// automatically satisfying a later review lesson.
export const reviewOneLessons:readonly FirstLesson[]=[
 {id:'L027',title:'Muistanko tervehtimisen ja esittäytymisen?',requiredIds:['REV1-01','REV1-02','REV1-03','REV1-04'],steps:[
  {id:'L027-S1',kind:'recall',title:'Kokeile ennen sanastoa',minutes:4,instructionFi:'Sulje ensin muistiinpanot. Muistista palauta aamun tervehdys, kohtelias hyvästely, Ich heiße ... ja nimikysymys.'},
  {id:'L027-S2',kind:'practice',title:'Tervehdi ja hyvästele uudestaan',minutes:9,instructionFi:'Tee kaksi uutta C01-osaamista palauttavaa tehtävää ilman mallia. Toisessa on tilanteeseen sopiva tervehdys ja toisessa saksankielinen hyvästely.',chapterId:'C01',exerciseIds:['REV1-01','REV1-02']},
  {id:'L027-S3',kind:'practice',title:'Palauta nimi mieleen',minutes:9,instructionFi:'Harjoittele C02:n minä-verbin muotoa ja kaverin nimikysymystä kahdella uudella tehtävällä.',chapterId:'C02',exerciseIds:['REV1-03','REV1-04']},
  {id:'L027-S4',kind:'reflection',title:'Mitä muistat ilman mallia?',minutes:5,instructionFi:'Kirjoita suomeksi, kumpi muistui paremmin: tervehdykset vai nimen kysyminen. Kirjoita myös yksi vaikea muoto, johon palaat huomenna.'},
  {id:'L027-S5',kind:'check',title:'Kertauksen yhteenveto',minutes:3,instructionFi:'Uusien kertaustehtävien yritykset ovat erillisiä alkuperäisten kappaleiden tehtävistä. Niitä ei merkitä oikein vain siksi, että olet vastannut samankaltaiseen tehtävään aiemmin.'}
 ]},
 {id:'L028',title:'Voinnin ja kohteliaisuuden taitosekoitus',requiredIds:['REV1-05','REV1-06','REV1-07','REV1-08'],steps:[
  {id:'L028-S1',kind:'recall',title:'Du vai Sie?',minutes:4,instructionFi:'Muista itsenäisesti Wie heißen Sie? ja Wie geht es dir?. Kerro itsellesi, kummassa on kohtelias puhuttelu.'},
  {id:'L028-S2',kind:'practice',title:'Kohtelias kysymys uudelleen',minutes:9,instructionFi:'Tee C04:n kahden uuden tehtävän sekoitus: tunnista kohtelias nimi ja täydennä kohteliaan kommen-kysymyksen verbimuoto.',chapterId:'C04',exerciseIds:['REV1-05','REV1-06']},
  {id:'L028-S3',kind:'practice',title:'Vointiin vastaaminen muistista',minutes:9,instructionFi:'Tee kaksi C05:n uutta tehtävää: ei kovin hyvin -vastaus ja tuttavallinen vointikysymys saksaksi.',chapterId:'C05',exerciseIds:['REV1-07','REV1-08']},
  {id:'L028-S4',kind:'reflection',title:'Arvioi taitosekoituksen vaikeus',minutes:5,instructionFi:'Kirjoita suomeksi, olivatko puhuttelu, verbit vai vointifraasit vaikeimpia. Kirjoita yksi fraasi, jonka muistit ilman mallia.'},
  {id:'L028-S5',kind:'check',title:'Valitse oma kertauskohde',minutes:3,instructionFi:'Kertaa huomisen alussa se fraasi, joka oli vaikein. Älä tulkitse yhden muistamiskerran tulosta täydelliseksi osaamiseksi.'}
 ]},
 {id:'L029',title:'Autenttisen keskustelun kertauskuuntelu',requiredIds:['REV1-09','REV1-10','REV1-11','REV1-12'],requiredMediaIds:['review:L029:M-COM-02'],steps:[
  {id:'L029-S1',kind:'recall',title:'Muista kuuntelun ennakkosanat',minutes:4,instructionFi:'Palauta mieleen Wie heißt du?, Ich heiße … ja Ich komme aus … . Ennusta, missä kohtaa keskustelua ne kuullaan.'},
  {id:'L029-S2',kind:'listen',title:'Kuuntele koko Ich bin Peter -dialogi',minutes:8,instructionFi:'Kuuntele Ariserin alkuperäinen 12 sekunnin, nelirepliikkinen ihmisäänite uudestaan. Pyri erottamaan Thomasin ja Takashin nimet sekä Berlin ja Kyoto. Kuuntele ensin ilman näkyvää litteraattia ja sitten sen kanssa.',chapterId:'C02'},
  {id:'L029-S3',kind:'practice',title:'Neljä uutta lähdekuuntelun tehtävää',minutes:9,instructionFi:'Tunnista puhujat, kirjoita alkuperäinen nimikysymys ja erottele Berliini sekä Kioto. Tehtävät ovat uusia; aiemmat C02/C03-vastaukset eivät kuittaa niitä valmiiksi.',chapterId:'C02',exerciseIds:['REV1-09','REV1-10','REV1-11','REV1-12']},
  {id:'L029-S4',kind:'reflection',title:'Kerro miten kuuntelu sujui',minutes:6,instructionFi:'Kirjoita suomeksi, mitkä sanat kuulit varmasti ja missä kohdassa piti käyttää litteraattia. Muista, että kuulemisen harjoittelu ei ole sama asia kuin pelkkä tekstin tunnistaminen.'},
  {id:'L029-S5',kind:'check',title:'Kertauksen päätös',minutes:3,instructionFi:'Kuuntelu kirjautuu vasta, kun toistat alkuperäisen äänitteen loppuun tässä kertaustunnissa. Välikoe on tästä erillinen eikä valmiiksi väitetty pelkän kertauksen perusteella.'}
 ]}
];
