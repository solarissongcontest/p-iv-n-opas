import type {ChapterId} from './content';

export type FirstLessonStep={
 id:string;
 kind:'guide'|'recall'|'instruction'|'read'|'vocabulary'|'grammar'|'listen'|'practice'|'goal'|'reflection'|'check';
 title:string;minutes:number;instructionFi:string;
 chapterId?:ChapterId;exerciseIds?:readonly string[];
};
export type FirstLesson={
 id:string;title:string;steps:readonly FirstLessonStep[];
 requiredIds:readonly string[];
 requiredMediaIds?:readonly string[];
};
export const firstLessons:readonly FirstLesson[]=[
 {id:'L001',title:'Miten LOS! 1:llä opiskellaan?',requiredIds:[],requiredMediaIds:['lesson:L001:M-COM-01'],steps:[
  {id:'L001-S1',kind:'guide',title:'Tutustu oppikirjaan',minutes:5,instructionFi:'Opiskelet ensimmäisessä moduulissa tervehtimistä, nimiä ja lyhyitä saksankielisiä kohtaamisia. Et tarvitse ennakkotietoja. Voit avata kirjan muut sivut ilman opetuspolkua. Kappaleen pääteksti luetaan tässä kirjassa, ei erillisellä verkkosivulla.'},
  {id:'L001-S2',kind:'goal',title:'Kirjaa oma tavoitteesi',minutes:5,instructionFi:'Kirjoita vähintään yksi taito, jonka haluat oppia, esimerkiksi tervehdys tai oma esittäytyminen.'},
  {id:'L001-S3',kind:'read',title:'Kokeile saksankielistä lukijaa',minutes:7,instructionFi:'Lue alkuperäinen Franzin ja Jörgin keskustelu. Napauta sanaa: sen merkitys näkyy sanakortissa. Tunnista Hallo ja Tschüss. Älä huolehdi vielä ikää tarkoittavista ilmauksista.',chapterId:'C01'},
  {id:'L001-S4',kind:'listen',title:'Testaa alkuperäisäänite',minutes:7,instructionFi:'Paina äänisoittimen toistopainiketta ja kuuntele. Jos ääni ei avaudu, lukija on edelleen käytettävissä. Älä merkitse toistoa toimivaksi, jos se ei toiminut.',chapterId:'C01'},
  {id:'L001-S5',kind:'check',title:'Muista kolme perusasiaa',minutes:6,instructionFi:'1. Tässä kirjassa luetaan koko alkuperäinen teksti. 2. Tehtävän oikea vastaus näkyy harjoituksessa vasta tarkistamisen jälkeen. 3. Kertaus ja muistiinpanot tallennetaan samaan Opintopäiväkirjaan; ennen viimeistelyä odota vahvistusta palvelimelta.'}
 ]},
 {id:'L002',title:'Aloita saksan ääntämisestä',requiredIds:['C01-E08','C01-E10'],requiredMediaIds:['lesson:L002:M-COM-01'],steps:[
  {id:'L002-S1',kind:'recall',title:'Palauta mieleen',minutes:4,instructionFi:'Mitä muistat sanoista Hallo ja Tschüss? Yritä vastata ennen kuin avaat sanaston.'},
  {id:'L002-S2',kind:'instruction',title:'Saksan ensimmäiset äänteet',minutes:8,instructionFi:'Harjoittele w = v, z = ts, ei = ai, ie = pitkä i, sch = š ja ß = s. Ch voi ääntyä kevyesti ich-sanassa ja kurkumpana Bach-sanassa. Näiden ch-äänteiden tuottamista ei vielä arvioida.',chapterId:'C01'},
  {id:'L002-S3',kind:'listen',title:'Kuuntele oikeaa puhetta',minutes:5,instructionFi:'Kuuntele aito lyhyt keskustelu. Seuraa lukijasta samalla tuttuja sanoja. Älä vielä opettele ikäkysymyksen rakennetta.',chapterId:'C01'},
  {id:'L002-S4',kind:'practice',title:'Tarkista ääntäminen',minutes:9,instructionFi:'Tee kaksi ääntämissääntöjä koskevaa tehtävää. Yritä ensin itse, vasta sen jälkeen käytä vihjettä.',chapterId:'C01',exerciseIds:['C01-E08','C01-E10']},
  {id:'L002-S5',kind:'check',title:'Lopputarkistus',minutes:4,instructionFi:'Osaatko selittää suomeksi, mitä saksan w, z, ei, ie ja sch yleensä tarkoittavat ääntämisessä?'},
 ]},
 {id:'L003',title:'Lue Franzin ja Jörgin keskustelu',requiredIds:['C01-E02','C01-E03','C01-X04'],requiredMediaIds:['lesson:L003:M-COM-01'],steps:[
  {id:'L003-S1',kind:'recall',title:'Muista tervehdykset',minutes:4,instructionFi:'Sano mielessäsi hei ja hei hei saksaksi, ennen kuin palaat tekstiin.'},
  {id:'L003-S2',kind:'read',title:'Lue Text A alusta loppuun',minutes:9,instructionFi:'Lue kaikki kahdeksan repliikkiä. Tuntemattomat ikämuodot ovat tässä tukisanoja, eivät vielä kokeen aihe.',chapterId:'C01'},
  {id:'L003-S3',kind:'listen',title:'Kuuntele puheen rytmi',minutes:5,instructionFi:'Kuuntele alkuperäinen sama dialogi ja seuraa puhujia. Huomaa, missä vuorot vaihtuvat.',chapterId:'C01'},
  {id:'L003-S4',kind:'practice',title:'Kolme ymmärtämistehtävää',minutes:9,instructionFi:'Etsi pyydetyt kohdat alkuperäisestä tekstistä läpikuultavalla korostustussilla ja vastaa lopuksi siihen, kuka hyvästelee.',chapterId:'C01',exerciseIds:['C01-E02','C01-E03','C01-X04']},
  {id:'L003-S5',kind:'check',title:'Lopputarkistus',minutes:3,instructionFi:'Osaatko kertoa suomeksi, ketkä dialogissa keskustelevat ja miten he lopettavat sen?'},
 ]},
 {id:'L004',title:'Tervehdykset muistista',requiredIds:['C01-E01','C01-E04','C01-E05','C01-E07'],steps:[
  {id:'L004-S1',kind:'recall',title:'Kertaa ilman mallia',minutes:4,instructionFi:'Kirjoita mielessäsi kolme tervehdystä ja yksi hyvästely. Avaa sanasto vasta sitten.'},
  {id:'L004-S2',kind:'vocabulary',title:'Tervehdysten sanasto',minutes:8,instructionFi:'Lue ydinilmaisut, piilota suomennokset ja palauta ne muistista.',chapterId:'C01'},
  {id:'L004-S3',kind:'grammar',title:'Tervehdyksen tilanne',minutes:5,instructionFi:'Opettele erot tuttavallisten ja kohteliaampien hyvästelyjen välillä.',chapterId:'C01'},
  {id:'L004-S4',kind:'practice',title:'Neljä muistitehtävää',minutes:10,instructionFi:'Harjoittele merkityksiä, aukkotehtävää ja kiitoksen käännöstä.',chapterId:'C01',exerciseIds:['C01-E01','C01-E04','C01-E05','C01-E07']},
  {id:'L004-S5',kind:'check',title:'Lopputarkistus',minutes:3,instructionFi:'Mikä on sopivin tervehdys aamulla? Miten tervehdit ystävää?'}
 ]},
 {id:'L005',title:'Kuuntele ja valitse tervehdys',requiredIds:['C01-X02','C01-X03'],requiredMediaIds:['lesson:L005:M-COM-03'],steps:[
  {id:'L005-S1',kind:'recall',title:'Muistista palautus',minutes:4,instructionFi:'Tervehdi mielessäsi tuttavaa ja hyvästele hänet kahdella tavalla.'},
  {id:'L005-S2',kind:'listen',title:'Text B: kuuntele tervehdyksiä',minutes:10,instructionFi:'Kuuntele ihmisen lukema tervehdyslista. Jos se ei toimi, jatka varamateriaalina Text A:n dialogia.',chapterId:'C01'},
  {id:'L005-S3',kind:'practice',title:'Kuuntelun tunnistaminen',minutes:9,instructionFi:'Kuuntele ja tunnista dialogin aloitus ja lopetus. Vastaukset perustuvat alkuperäiseen äänitteeseen.',chapterId:'C01',exerciseIds:['C01-X02','C01-X03']},
  {id:'L005-S4',kind:'instruction',title:'Tilanteen soveltaminen',minutes:4,instructionFi:'Sano ääneen Guten Morgen, Guten Tag ja Auf Wiedersehen. Anna kummallekin tilanteeseen sopiva merkitys.',chapterId:'C01'},
  {id:'L005-S5',kind:'check',title:'Lopputarkistus',minutes:3,instructionFi:'Missä kohtaa keskustelua sanottiin Tschüss? Osaatko itse sanoa sen ääneen?'}
 ]},
 {id:'L006',title:'Harjoittele ja testaa C01',requiredIds:['EX-C01'],steps:[
  {id:'L006-S1',kind:'recall',title:'Kertaa ennen koetta',minutes:4,instructionFi:'Palauta mieleen tervehdykset, hyvästelyt ja ääntämisen ensimmäiset erot ilman sanastoa.'},
  {id:'L006-S2',kind:'vocabulary',title:'Tarkista vaikeat ilmaisut',minutes:5,instructionFi:'Katso sanastosta ne sanat, jotka eivät vielä muistu mieleen. Kokeessa vihjeet eivät ole käytössä.',chapterId:'C01'},
  {id:'L006-S3',kind:'practice',title:'Kappaletesti ilman vihjeitä',minutes:13,instructionFi:'Palauta koko C01-kappaletesti. Vastaukset ja selitykset avautuvat vasta palautuksen jälkeen.',chapterId:'C01',exerciseIds:['EX-C01']},
  {id:'L006-S4',kind:'reflection',title:'Oma itsearviointi',minutes:5,instructionFi:'Kirjoita suomeksi mikä jo onnistuu ja mikä vaatii vielä kertausta.'},
  {id:'L006-S5',kind:'check',title:'Tunnin yhteenveto',minutes:3,instructionFi:'Voit aina palata kappaleen tekstiin. Suoritettu oppitunti ei tarkoita, että kaikki sanat pitäisi muistaa täydellisesti.'}
 ]}
];
export function validateFirstLessons(){
 const errors:string[]=[];
 for(const l of firstLessons){
  if(l.steps.length!==5)errors.push(l.id+' should have 5 steps');
  if(l.steps.reduce((sum,s)=>sum+s.minutes,0)!==30)errors.push(l.id+' should total ~30 min');
  if(new Set(l.steps.map(s=>s.id)).size!==5)errors.push(l.id+' duplicate step ID');
  if(!l.title||l.steps.some(s=>!s.instructionFi||!s.title))errors.push(l.id+' missing teaching');
 }
 if(firstLessons.length!==6)errors.push('Missing first lessons');
 return errors;
}
