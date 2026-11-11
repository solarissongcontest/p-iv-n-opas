import type {FirstLesson} from './firstLessons';

// C04 uses the approved M-WB-06 "Die Geschäftsmänner" dialogue.
// The canonical L018 label mentions a phone directory, which is NOT the
// current C04 primary source. Keep the canonical title but be explicit to
// the learner about the actual authentic material.
export const chapter04Lessons:readonly FirstLesson[]=[
 {id:'L017',title:'Milloin du tai Sie?',requiredIds:['C04-X01','C04-X03'],steps:[
  {id:'L017-S1',kind:'recall',title:'Palauta aiemmat tervehdykset',minutes:4,instructionFi:'Muista C01:n Hallo, Guten Tag ja Auf Wiedersehen. Mieti, missä tilanteissa käyttäisit kutakin ilmausta.'},
  {id:'L017-S2',kind:'instruction',title:'Sinuttelu ja teitittely',minutes:8,instructionFi:'Vertaa du ja Sie. Du sopii usein tuttavien kesken, Sie muodollisempiin tilanteisiin. Kohtelias Sie kirjoitetaan isolla. Tilanteesta ei voi päätellä puhuttelua pelkän iän perusteella.',chapterId:'C04'},
  {id:'L017-S3',kind:'read',title:'Lue kohteliaan keskustelun alku',minutes:6,instructionFi:'Lue alkuperäinen Herr Schmidtin ja Herr Standishin keskustelu alusta. Etsi tervehdykset ja erota kohtelias Ihnen. Älä vielä opettele vaikeita työstä kertovia lauseita.',chapterId:'C04'},
  {id:'L017-S4',kind:'practice',title:'Kaksi puhuttelukysymystä',minutes:9,instructionFi:'Valitse kohtelias pronomini ja ratkaise, voiko pelkkä ikä määrittää puhuttelun. Perustele vastaus itsellesi suomeksi.',chapterId:'C04',exerciseIds:['C04-X01','C04-X03']},
  {id:'L017-S5',kind:'check',title:'Tunnistatko eron?',minutes:3,instructionFi:'Sano ääneen kaksi ilmausta: Wie heißt du? ja Wie heißen Sie? Selitä, kumpi on kohtelias.'}
 ]},
 {id:'L018',title:'Hakemistopuhelun kokonainen teksti',requiredIds:['C04-E01','C04-X10','C04-X11'],steps:[
  {id:'L018-S1',kind:'recall',title:'Muista kohtelias Sie',minutes:4,instructionFi:'Miten kohtelias te kirjoitetaan saksaksi? Miten sitä verrataan sanaan du?'},
  {id:'L018-S2',kind:'read',title:'Lue koko Die Geschäftsmänner -dialogi',minutes:9,instructionFi:'Lue kaikki kahdeksan alkuperäistä Herr Schmidtin ja Herr Standishin vuoroa. Tekstin oikea aihe on liikemiesten muodollinen vointikeskustelu, ei hakemistopuhelu; oppitunnin kanoninen nimi on tässä toistaiseksi harhaanjohtava. Vaikeat työfraasit ovat tukisanastoa.',chapterId:'C04'},
  {id:'L018-S3',kind:'vocabulary',title:'Kohteliaan keskustelun sanat',minutes:5,instructionFi:'Kertaa Sie, Wie heißen Sie?, Guten Tag ja Auf Wiedersehen. Avaa tarvittaessa suomennokset mutta harjoittele sitten ilman niitä.',chapterId:'C04'},
  {id:'L018-S4',kind:'practice',title:'Kolme tekstin ymmärtämistehtävää',minutes:9,instructionFi:'Korosta kohtelias vointikysymys ja selvitä, kummalle kuuluu hyvin ja kummalle ei. Perusta vastauksesi alkuperäiseen lähdetekstiin.',chapterId:'C04',exerciseIds:['C04-E01','C04-X10','C04-X11']},
  {id:'L018-S5',kind:'check',title:'Lopputarkistus',minutes:3,instructionFi:'Kuka aloittaa keskustelun ja miten molemmat hyvästelevät? Mikä tekee puhuttelusta muodollisen?'}
 ]},
 {id:'L019',title:'Kohtelias verbinmuoto',requiredIds:['C04-E02','C04-E03','C04-E04','C04-X02'],steps:[
  {id:'L019-S1',kind:'recall',title:'Muistista ennen mallia',minutes:4,instructionFi:'Sano kaverin nimen kysymys ja muunna se kohteliaaksi kysymykseksi ilman mallia.'},
  {id:'L019-S2',kind:'grammar',title:'Sie heißen, Sie kommen',minutes:8,instructionFi:'Opiskele Wie heißen Sie? ja Woher kommen Sie? rinnakkain muotojen Wie heißt du? ja Woher kommst du? kanssa. Kohtelias pronomini kirjoitetaan isolla keskellä lausettakin.',chapterId:'C04'},
  {id:'L019-S3',kind:'instruction',title:'Puhuttele täsmällisesti',minutes:5,instructionFi:'Huomaa muotojen erottelussa sekä pronomini että verbi. ”Wie heißt Sie?” ei ole oikein. Tutun ja kohteliaan puhuttelun ero on lauseen rakenteessa, ei vain sävyssä.',chapterId:'C04'},
  {id:'L019-S4',kind:'practice',title:'Neljä tarkistettavaa tehtävää',minutes:10,instructionFi:'Tee kohteliaan kysymyksen valinta, kaksi verbimuodon tarkistusta ja Sie-alkukirjaimen tehtävä. Palauta kaikki neljä yritystä.',chapterId:'C04',exerciseIds:['C04-E02','C04-E03','C04-E04','C04-X02']},
  {id:'L019-S5',kind:'check',title:'Kohtelias malli muistista',minutes:3,instructionFi:'Muista kaksi paria: Wie heißt du? / Wie heißen Sie? ja Woher kommst du? / Woher kommen Sie?'}
 ]},
 {id:'L020',title:'Käytä kohteliaisuusfraaseja',requiredIds:['C04-X07','C04-X08','C04-X14'],requiredMediaIds:['M-COM-04'],steps:[
  {id:'L020-S1',kind:'recall',title:'Kertaa muodollinen tervehdys',minutes:4,instructionFi:'Valitse mielessäsi muodolliseen asiointiin sopiva tervehdys ja hyvästely.'},
  {id:'L020-S2',kind:'listen',title:'Syntyperäisen puhujan kysymys',minutes:8,instructionFi:'Kuuntele Jeuwren alkuperäinen kaksisekuntinen ihmisäänite Wie geht es Ihnen? Se on yksi kokonainen autenttinen vointifraasi, ei keskustelu. Lue ja halutessasi näytä lauseen suomennos kirjan sisällä.',chapterId:'C04'},
  {id:'L020-S3',kind:'practice',title:'Kuuntele ja kirjoita',minutes:9,instructionFi:'Kuuntele ja tunnista puhuttelu. Kirjoita sitten kuultu ilmaus saksaksi. Vastaukset liittyvät täsmällisesti juuri tähän äänitteeseen.',chapterId:'C04',exerciseIds:['C04-X07','C04-X08']},
  {id:'L020-S4',kind:'practice',title:'Kirjoita oma asiointitilanne',minutes:6,instructionFi:'Kirjoita lyhyt kohtelias kohtaaminen: tervehdi, kysy nimi Sie-muodossa, vastaa ja hyvästele. Tarkista tuottamasi lauseet itse mallin avulla.',chapterId:'C04',exerciseIds:['C04-X14']},
  {id:'L020-S5',kind:'check',title:'Varmista kuuntelu',minutes:3,instructionFi:'Puhujan alkuperäisen äänitteen on toistuttava loppuun ennen kuin tämä tunti voidaan kuitata kuuntelua sisältäväksi. Jos se ei toimi, katso litteraatti, mutta kuuntelunäyttö jää keskeneräiseksi.'}
 ]},
 {id:'L021',title:'Harjoittele ja testaa C04',requiredIds:['EX-C04'],steps:[
  {id:'L021-S1',kind:'recall',title:'Tarkista du ja Sie muistista',minutes:4,instructionFi:'Kertaa kaksi nimikysymystä ja kaksi kohteliasta tervehdystä ennen kokeen avaamista.'},
  {id:'L021-S2',kind:'vocabulary',title:'Viimeinen sanastokertaus',minutes:5,instructionFi:'Piilota sanaston suomennokset. Kokeile ilman vihjettä kysymykset Wie heißen Sie? ja Woher kommen Sie?.',chapterId:'C04'},
  {id:'L021-S3',kind:'practice',title:'Palauta riippumaton kappaletesti',minutes:13,instructionFi:'Tee C04:n 15 kysymyksen harjoituskoe yhtenä palautuksena. Oikeat vastaukset ja selitykset näkyvät vasta koko paperin palauttamisen jälkeen.',chapterId:'C04',exerciseIds:['EX-C04']},
  {id:'L021-S4',kind:'reflection',title:'Kirjoita oma itsearviointi',minutes:5,instructionFi:'Kerro suomeksi, osaatko päättää sinuttelun ja teitittelyn sopivasti sekä muodostaa kaksi kohteliasta kysymystä. Nimeä myös vaikea asia.'},
  {id:'L021-S5',kind:'check',title:'Oppimistulos',minutes:3,instructionFi:'Kirjaa tarvittaessa kertaukseen ne kysymykset, joita et vielä osaa. Harjoituskokeen tulos ei ole lukion virallinen arvosana.'}
 ]}
];
