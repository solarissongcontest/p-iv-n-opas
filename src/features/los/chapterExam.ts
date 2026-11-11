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
