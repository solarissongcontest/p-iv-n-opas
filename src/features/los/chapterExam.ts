import type {Exercise} from './content';

const choice=(id:string,prompt:string,options:string[],correct:string,explanation:string):Exercise=>({
 id,type:'choice',prompt,options,correct,explanation,hint:''
});
const fill=(id:string,prompt:string,accepted:string[],explanation:string):Exercise=>({
 id,type:'fill',prompt,accepted,explanation,hint:''
});
const truth=(id:string,prompt:string,correct:'Totta'|'Tarua',explanation:string):Exercise=>({
 id,type:'true-false',prompt,options:['Totta','Tarua'],correct,explanation,hint:''
});
export const c01Exam:Exercise[]=[
 choice('EX-C01-01','Kaksi tuttavaa tapaa toisensa. Miten he voivat tervehtiä?',['Hallo!','Auf Wiedersehen!','Bis später!'],'Hallo!','Hallo! on tuttavallinen tervehdys.'),
 choice('EX-C01-02','Mikä ilmaus sopii hyvän aamun toivotukseen?',['Guten Morgen!','Guten Abend!','Gute Nacht!'],'Guten Morgen!','Guten Morgen on hyvää huomenta.'),
 choice('EX-C01-03','Kellonaika on 19.00 ja tervehdit.',['Guten Abend!','Guten Morgen!','Bis bald!'],'Guten Abend!','Guten Abend on hyvää iltaa.'),
 choice('EX-C01-04','Mikä tarkoittaa hyvää yötä?',['Gute Nacht!','Guten Tag!','Tschüss!'],'Gute Nacht!','Gute Nacht on hyvää yötä.'),
 choice('EX-C01-05','Mikä ilmaus sopii kohteliaaseen hyvästelyyn?',['Auf Wiedersehen!','Hallo!','Ja!'],'Auf Wiedersehen!','Auf Wiedersehen on muodollisempi hyvästely.'),
 choice('EX-C01-06','Mikä tarkoittaa ”nähdään myöhemmin”?',['Bis später!','Bis bald!','Guten Tag!'],'Bis später!','Später tarkoittaa myöhemmin.'),
 choice('EX-C01-07','Miten vastaat myöntävästi?',['Ja.','Nein.','Danke.'],'Ja.','Ja tarkoittaa kyllä.'),
 choice('EX-C01-08','Miten sanot kiitos?',['Danke.','Bitte.','Nein.'],'Danke.','Danke tarkoittaa kiitos.'),
 truth('EX-C01-09','Väite: Tschüss on tyypillisesti tuttavallinen hyvästely.','Totta','Tschüss sopii usein epämuodolliseen hyvästelyyn.'),
 truth('EX-C01-10','Väite: Saksan w ääntyy useimmiten kuten suomen v.','Totta','W vastaa tavallisesti suomen v-äännettä.'),
 truth('EX-C01-11','Väite: saksan kirjain z ääntyy usein kuten suomen s.','Tarua','Z ääntyy ts.'),
 choice('EX-C01-12','Mikä äännearvo vastaa yleensä yhdistelmää ei?',['ai','pitkä i','sh'],'ai','Ei ääntyy yleensä ai.'),
 choice('EX-C01-13','Mikä äännearvo vastaa yleensä yhdistelmää ie?',['pitkä i','ai','ts'],'pitkä i','Ie ääntyy pitkänä i:nä.'),
 fill('EX-C01-14','Täydennä: Guten ____! (Hyvää päivää!)',['Tag'],'Guten Tag! on hyvää päivää.'),
 fill('EX-C01-15','Täydennä: Bis ____! (Nähdään pian!)',['bald'],'Bis bald! tarkoittaa nähdään pian.')
];


export const c02Exam:Exercise[]=[
 choice('EX-C02-01','Mikä kysymys tarkoittaa ”Mikä sinun nimesi on?”',['Wie heißt du?','Woher kommst du?','Wie alt bist du?'],'Wie heißt du?','Wie heißt du kysyy nimeä.'),
 fill('EX-C02-02','Täydennä: Ich ____ Elisa.',['heiße'],'Ich heiße Elisa. Oikeassa muodossa on ß.'),
 fill('EX-C02-03','Täydennä: Du ____ Lukas.',['heißt'],'Heißen-verbin du-muoto on heißt.'),
 choice('EX-C02-04','Mikä on oikea lause?',['Ich bin Emma.','Ich bist Emma.','Ich ist Emma.'],'Ich bin Emma.','Ich bin tarkoittaa minä olen.'),
 choice('EX-C02-05','Miten sanot ”Sinä olet Ben”?',['Du bist Ben.','Du bin Ben.','Du ist Ben.'],'Du bist Ben.','Du bist on sein-verbin du-muoto.'),
 truth('EX-C02-06','Väite: Saksan kielessä ”Ich heißt” on oikein.','Tarua','Minä-muoto on ich heiße, ei ich heißt.'),
 choice('EX-C02-07','Mikä on heißen-verbin minä-muoto?',['heiße','heißt','heißen'],'heiße','Ich heiße on minä olen nimeltäni.'),
 fill('EX-C02-08','Täydennä: ____ ist das? (Kuka tuo on?)',['Wer'],'Wer tarkoittaa kuka.'),
 choice('EX-C02-09','Miten esittelet kaverisi nimeltä Nora?',['Das ist Nora.','Das bist Nora.','Das bin Nora.'],'Das ist Nora.','Das ist ... tarkoittaa Tämä on ... .'),
 choice('EX-C02-10','Miten aloitat tuttavallisen nimen kysymisen?',['Hallo!','Auf Wiedersehen!','Gute Nacht!'],'Hallo!','Hallo on sopiva tuttavallinen tervehdys.'),
 fill('EX-C02-11','Täydennä: Wie ____ du?',['heißt'],'Kysyessäsi nimen käytät muotoa heißt.'),
 choice('EX-C02-12','Kuka kertoo Text A:ssa opettajan nimen Herr Weiß?',['Greta','Franz','Peter'],'Greta','Greta sanoo Ja, er heißt Herr Weiß.'),
 choice('EX-C02-13','Miten sanot oman nimesi vaihtoehtoisella sein-verbin fraasilla?',['Ich bin Mika.','Ich bist Mika.','Du bin Mika.'],'Ich bin Mika.','Ich bin on myös luonteva tapa esitellä itsensä.'),
 fill('EX-C02-14','Kirjoita lauseen puuttuva verbi: Ich ____ Mira. (Olen nimeltäni Mira.)',['heiße'],'Heißen-verbin minä-muoto on heiße.'),
 choice('EX-C02-15','Mikä kysymys on oikein kirjoitettu?',['Wie heißt du?','Wie heiße du?','Wie heißen du?'],'Wie heißt du?','Du-persoona käyttää muotoa heißt.')
];
