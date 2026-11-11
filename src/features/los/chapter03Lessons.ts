import type {FirstLesson} from './firstLessons';

// Source text: COERLL Deutsch im Blick, Berna Wer bin ich? (CC BY 4.0).
// Text B: Ariser (2011), CC BY-SA 3.0. No third-party video is auto-embedded.
export const chapter03Lessons:readonly FirstLesson[]=[
 {id:'L012',title:'Maat ja paikat',requiredIds:['C03-X01','C03-X04'],steps:[
  {id:'L012-S1',kind:'recall',title:'Muista nimesi sanominen',minutes:4,instructionFi:'Kertaa C02:n Ich heiße … ja Wie heißt du? Kuvittele sen jälkeen, että kysyt myös jonkun kotimaan.'},
  {id:'L012-S2',kind:'instruction',title:'Woher ja kommen',minutes:8,instructionFi:'Opiskele kysymys Woher kommst du? ja vastaus Ich komme aus Finnland. Woher kysyy mistä, wo missä. Sanat Deutschland, Österreich ja die Schweiz tarkoittavat Saksaa, Itävaltaa ja Sveitsiä.',chapterId:'C03'},
  {id:'L012-S3',kind:'read',title:'Katso Bernan alkuperäisen haastattelun alku',minutes:6,instructionFi:'Lue C03:n Teksti A. Berna kertoo nimensä sekä mistä maasta ja kaupungista hän on. Loppuosassa mainitaan ikä, vanha haastattelunumero ja lempiväri; niitä ei tarvitse opetella eikä käyttää omiin yhteystietoihisi.',chapterId:'C03'},
  {id:'L012-S4',kind:'practice',title:'Kaksi kysymystä alkuperästä',minutes:9,instructionFi:'Selvitä mitä woher tarkoittaa ja valitse se kysymys, jolla pyydät toisen kotipaikan.',chapterId:'C03',exerciseIds:['C03-X01','C03-X04']},
  {id:'L012-S5',kind:'check',title:'Kerro kotimaasta',minutes:3,instructionFi:'Sano kuvitteellisena henkilönä Ich komme aus Finnland. Kysy sitten Woher kommst du?'}
 ]},
 {id:'L013',title:'Berna: alkuperän tunnistaminen',requiredIds:['C03-X12','C03-X13','C03-X14'],steps:[
  {id:'L013-S1',kind:'recall',title:'Muista Woher',minutes:4,instructionFi:'Yritä palauttaa Woher kommst du? ja Ich komme aus Finnland. Älä katso suomennoksia heti.'},
  {id:'L013-S2',kind:'read',title:'Lue Bernan 12 repliikkiä kokonaisena',minutes:9,instructionFi:'Lue koko COERLL:n alkuperäinen 12 repliikin litteraatti tekstilukijasta. Kaikki repliikit ovat kirjassa, mutta vain nimi, maa, Kielin kaupunki ja kysymykset ovat keskeisiä. Haastattelun lopun edistynyt kieli on tunnistustukea.',chapterId:'C03'},
  {id:'L013-S3',kind:'vocabulary',title:'Kaupungit ja maat',minutes:5,instructionFi:'Kertaa Deutschland, Finnland, Österreich, Schweden, Kiel ja aus. Piilota suomennokset ja sano ne omin sanoin.',chapterId:'C03'},
  {id:'L013-S4',kind:'practice',title:'Kolme täsmällistä lukutehtävää',minutes:9,instructionFi:'Korosta alkuperäisestä tekstistä Bernan maa ja kaupunki. Vastaa sitten, mistä maasta hän kertoo olevansa.',chapterId:'C03',exerciseIds:['C03-X12','C03-X13','C03-X14']},
  {id:'L013-S5',kind:'check',title:'Osaako yhdistää paikan ja maan?',minutes:3,instructionFi:'Kerro ilman mallia, missä maassa Kiel sijaitsee. Muista, että Berna sanoo Ich komme aus Kiel.'}
 ]},
 {id:'L014',title:'Kommen ja woher',requiredIds:['C03-X02','C03-X03','C03-X05','C03-X07'],steps:[
  {id:'L014-S1',kind:'recall',title:'Kysy kotimaa muistista',minutes:4,instructionFi:'Kerro kuvitteellinen kotimaa ja kysy toisen kotipaikkaa ilman kirjaa.'},
  {id:'L014-S2',kind:'grammar',title:'Ich komme, du kommst',minutes:8,instructionFi:'Opiskele kommen-verbin minä- ja sinä-muodot: ich komme, du kommst. Yhdistä niihin fraasit Ich komme aus Deutschland ja Woher kommst du?. Muiden persoonien taivutusta ei vielä vaadita.',chapterId:'C03'},
  {id:'L014-S3',kind:'instruction',title:'Aus der Schweiz ja muut maat',minutes:5,instructionFi:'Useimpien tässä opittujen maiden kanssa sanotaan aus + nimi: aus Finnland, aus Deutschland. Sveitsi on tässä kiinteä poikkeusfraasi aus der Schweiz. Datiivia ei opetella vielä kokonaisena.',chapterId:'C03'},
  {id:'L014-S4',kind:'practice',title:'Neljä soveltavaa tehtävää',minutes:10,instructionFi:'Täydennä ich komme ja du kommst, tunnista Sveitsin fraasi ja järjestä Suomesta tulevan henkilön vastaus. Palauta jokainen.',chapterId:'C03',exerciseIds:['C03-X02','C03-X03','C03-X05','C03-X07']},
  {id:'L014-S5',kind:'check',title:'Kaksi lauseparia',minutes:3,instructionFi:'Sano Ich komme aus Österreich ja Woher kommst du? Varmista, että verbit ovat oikeassa persoonassa.'}
 ]},
 {id:'L015',title:'Nicon alkuperä ja karttatehtävät',requiredIds:['C03-X17','C03-X18','C03-X22'],requiredMediaIds:['M-COM-02'],steps:[
  {id:'L015-S1',kind:'recall',title:'Kertaa maiden nimet',minutes:4,instructionFi:'Muista englanniksi? Älä käytä englantia, vaan suomeksi: mitä Deutschland ja Finnland tarkoittavat? Miten vastaat saksaksi Ich komme ...?'},
  {id:'L015-S2',kind:'listen',title:'Thomas ja Takashi: mistä he tulevat?',minutes:8,instructionFi:'Kuuntele Ariserin alkuperäinen nelirepliikkinen Ich bin Peter -ihmisäänite. Thomas kertoo tulevansa Berliinistä ja Takashi Kiotosta. Nico-video on lähdemanifestissa, mutta se odottaa erillistä mediatarkistusta eikä sitä väitetä tässä toteutetuksi.',chapterId:'C03'},
  {id:'L015-S3',kind:'practice',title:'Kaksi oikeaa kuuntelutehtävää',minutes:9,instructionFi:'Tunnista kuulemalla, mistä Thomas ja Takashi kertovat olevansa kotoisin. Vastaukset perustuvat täsmälleen äänitettyyn neljän repliikin dialogiin.',chapterId:'C03',exerciseIds:['C03-X17','C03-X18']},
  {id:'L015-S4',kind:'practice',title:'Oma kuvitteellinen kotimaa',minutes:6,instructionFi:'Kirjoita lyhyt kuvitteellinen kysymys ja vastaus kotimaasta. Oma oikea osoite, puhelinnumero tai syntymäaika ei kuulu tehtävään.',chapterId:'C03',exerciseIds:['C03-X22']},
  {id:'L015-S5',kind:'check',title:'Varmista kuuntelun toteutuminen',minutes:3,instructionFi:'Kun alkuperäinen äänite on soinut loppuun, sitä voidaan pitää kuultuna. Lukeminen ja oikean vastauksen arvaaminen eivät korvaa oikeaa kuuntelutapahtumaa.'}
 ]},
 {id:'L016',title:'Harjoittele ja testaa C03',requiredIds:['EX-C03'],steps:[
  {id:'L016-S1',kind:'recall',title:'Vastaa ilman mallia',minutes:4,instructionFi:'Muista Woher kommst du?, Ich komme aus Finnland, Deutschland ja aus der Schweiz ennen kokeen avaamista.'},
  {id:'L016-S2',kind:'vocabulary',title:'Kertaa lähtömaan sanat',minutes:5,instructionFi:'Piilota sanojen suomennokset. Varmista, että erotat maanimet ja kaupungit. Kokeessa ei ole vihjettä ennen palautusta.',chapterId:'C03'},
  {id:'L016-S3',kind:'practice',title:'C03:n oma kappaletesti',minutes:13,instructionFi:'Tee erillisen koepankin kaikki 15 tehtävää yhtenä paperina. Vastaukset ja selitykset avautuvat vasta koko paperin palauttamisen jälkeen.',chapterId:'C03',exerciseIds:['EX-C03']},
  {id:'L016-S4',kind:'reflection',title:'Kerro, mitä opit',minutes:5,instructionFi:'Kirjoita suomeksi, mitä osaat kysyä ja vastata kotimaasta. Nimeä yksi epäselvä kohta: verbi, maa tai kysymyssana.'},
  {id:'L016-S5',kind:'check',title:'Seuraava aihe',minutes:3,instructionFi:'Palaa myöhemmin sanoihin, jotka eivät muistuneet. Seuraavaksi harjoitellaan kohteliasta puhuttelua C04:ssä.'}
 ]}
];
