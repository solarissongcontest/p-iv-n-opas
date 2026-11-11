import type {Exercise} from './content';
import {c01Exam,c02Exam,c03Exam,c04Exam,c05Exam,c07Exam,c09Exam,c10Exam} from './chapterExam.ts';
// The assessment banks are independent of chapter practice IDs. No answer key
// is rendered in ExamSession until the learner submits the whole paper.
type Item=Exercise;
const q=(id:string,prompt:string,correct:string,wrong1:string,wrong2:string,why:string):Item=>
 ({id,type:'choice',prompt,options:[correct,wrong1,wrong2],correct,explanation:why,hint:''});
const f=(id:string,prompt:string,answer:string,why:string):Item=>
 ({id,type:'fill',prompt,accepted:[answer],explanation:why,hint:''});
const t=(id:string,prompt:string,answer:string,why:string):Item=>
 ({id,type:'translate',prompt,accepted:[answer],explanation:why,hint:''});
const b=(id:string,prompt:string,correct:'Totta'|'Tarua',why:string):Item=>
 ({id,type:'true-false',prompt,options:['Totta','Tarua'],correct,explanation:why,hint:''});
const o=(id:string,prompt:string,words:string[],why:string):Item=>
 ({id,type:'ordering',prompt,order:words,explanation:why,hint:''});

export const midExam:Item[]=[
 q('EX-M01','Kaveri tulee vastaan. Millä tervehdit?','Hallo!','Auf Wiedersehen!','Gute Nacht!','Hallo on tuttu tervehdys.'),
 q('EX-M02','Aamulla tervehdit opettajaa.','Guten Morgen!','Guten Abend!','Tschüss!','Guten Morgen on hyvää huomenta.'),
 q('EX-M03','Mitä tarkoittaa Bis bald?','Nähdään pian!','Kiitos paljon!','Hyvää päivää!','Bis bald on hyvästely.'),
 f('EX-M04','Täydennä: Guten ____! (Hyvää iltaa.)','Abend','Guten Abend on iltatervehdys.'),
 b('EX-M05','Väite: sch lausutaan tavallisesti kuten suomen s.','Tarua','Sch vastaa š-äännettä.'),
 q('EX-M06','Mikä on saksan kirjain w:n tavallinen ääntämys?','v','ts','sh','W ääntyy yleensä v:n tavoin.'),
 f('EX-M07','Täydennä: Ich ____ Mila.','heiße','Ich heiße kertoo nimen.'),
 f('EX-M08','Täydennä: Du ____ Finn.','heißt','Heißen-verbin du-muoto on heißt.'),
 q('EX-M09','Kumpi kysymys pyytää kaverin nimeä?','Wie heißt du?','Wie alt bist du?','Woher kommst du?','Wie heißt du kysyy nimeä.'),
 o('EX-M10','Järjestä: Olen nimeltäni Ben.',['Ich','heiße','Ben.'],'Ich heiße Ben.'),
 q('EX-M11','Mikä on sein-verbin minä-muoto?','bin','bist','ist','Ich bin on minä olen.'),
 f('EX-M12','Täydennä: ____ bin Mia.','Ich','Ich bin Mia.'),
 q('EX-M13','Mikä on lauseen ”Minä tulen Suomesta” saksankielinen vastine?','Ich komme aus Finnland.','Ich kommt aus Finnland.','Ich bin aus Freitag.','Ich komme aus Finnland.'),
 f('EX-M14','Täydennä kysymys: Woher ____ du?','kommst','Du kommst.'),
 q('EX-M15','Mikä tarkoittaa ”mistä”?','woher','wo','wann','Woher kysyy lähtöpaikkaa.'),
 q('EX-M16','Sveitsistä: valitse oikea ilmaus.','aus der Schweiz','aus Schweiz','aus die Schweiz','Aus der Schweiz on opetettu fraasi.'),
 t('EX-M17','Kirjoita saksaksi ”Olen Itävallasta.”','Ich komme aus Österreich.','Ich komme aus Österreich.'),
 b('EX-M18','Väite: Woher kommst du? kysyy lähtöpaikkaa.','Totta','Kyllä, woher kysyy mistä.'),
 q('EX-M19','Puhuttelet tuntematonta aikuista kohteliaasti.','Sie','du','er','Kohtelias Sie kirjoitetaan isolla.'),
 f('EX-M20','Täydennä kohteliaasti: Wie ____ Sie?','heißen','Wie heißen Sie?'),
 o('EX-M21','Järjestä kohtelias kysymys: Mistä olette kotoisin?',['Woher','kommen','Sie?'],'Woher kommen Sie?'),
 q('EX-M22','Mikä on asiallinen hyvästely?','Auf Wiedersehen!','Wie geht es dir?','Ich heiße Alex.','Auf Wiedersehen on näkemiin.'),
 q('EX-M23','Vastaat vointikysymykseen että menee hyvin.','Mir geht es gut.','Woher kommst du?','Ich komme aus Montag.','Mir geht es gut.'),
 f('EX-M24','Täydennä: Nicht so ____ (ei kovin hyvin).','gut','Nicht so gut tarkoittaa ei kovin hyvin.'),
 t('EX-M25','Kirjoita saksaksi ”Mitä sinulle kuuluu?”','Wie geht es dir?','Wie geht es dir?'),
];

export const finalExam:Item[]=[
 q('EX-F01','Aikaisin aamulla sanot kohteliaasti:','Guten Morgen!','Guten Abend!','Tschüss!','Guten Morgen on aamuterveyhdys.'),
 q('EX-F02','Myöhään illalla toivotat hyvää yötä:','Gute Nacht!','Guten Morgen!','Bis später!','Gute Nacht on hyvän yön toivotus.'),
 t('EX-F03','Kirjoita saksaksi ”Hei!”','Hallo!','Hallo!'),
 q('EX-F04','Mitä tarkoittaa Auf Wiedersehen?','Näkemiin!','Hauska tutustua!','Mistä tulet?','Auf Wiedersehen on näkemiin.'),
 b('EX-F05','Väite: saksan kirjain z ääntyy yleensä ts.','Totta','Z ääntyy ts, esimerkiksi Franz.'),
 q('EX-F06','Mikä vokaaliyhdistelmä ääntyy pitkänä i:nä?','ie','ei','eu','ie ääntyy pitkänä i:nä.'),
 f('EX-F07','Täydennä: Ich ____ Nina.','heiße','Ich heiße Nina.'),
 f('EX-F08','Täydennä: Wie ____ du?','heißt','Wie heißt du kysyy nimen.'),
 t('EX-F09','Kirjoita saksaksi ”Minä olen Leo.”','Ich bin Leo.','Ich bin Leo.'),
 q('EX-F10','Mikä tarkoittaa ”Kuka tuo on?”','Wer ist das?','Wie alt bist du?','Was bedeutet das?','Wer ist das?'),
 o('EX-F11','Järjestä: Tämä on Bea.',['Das','ist','Bea.'],'Das ist Bea.'),
 q('EX-F12','Mikä on kolmannen persoonan muoto?','Er heißt Paul.','Er heißen Paul.','Er heiße Paul.','Er heißt on hän on nimeltään.'),
 f('EX-F13','Täydennä: Ich ____ aus Finnland.','komme','Ich komme aus Finnland.'),
 f('EX-F14','Täydennä: Du ____ aus Deutschland.','kommst','Du kommst aus Deutschland.'),
 q('EX-F15','Kumpi kysymys pyytää alkuperää?','Woher kommst du?','Wo heißt du?','Wann bist du?','Woher kommst du?'),
 q('EX-F16','Mikä on saksankielinen nimi Ruotsille?','Schweden','Finnland','Österreich','Schweden tarkoittaa Ruotsia.'),
 q('EX-F17','Mikä on oikein Sveitsistä tultaessa?','aus der Schweiz','aus Schweiz','aus das Schweiz','Aus der Schweiz on oikea fraasi.'),
 t('EX-F18','Kirjoita saksaksi ”Olen Saksasta.”','Ich komme aus Deutschland.','Ich komme aus Deutschland.'),
 b('EX-F19','Väite: Wo ja woher kysyvät täsmälleen samaa asiaa.','Tarua','Wo on missä, woher on mistä.'),
 q('EX-F20','Kysyt kohteliaasti vieraan henkilön nimeä:','Wie heißen Sie?','Wie heißt du?','Wie Sie heißt?','Wie heißen Sie?'),
 f('EX-F21','Täydennä: Woher ____ Sie?','kommen','Woher kommen Sie?'),
 b('EX-F22','Väite: Kohtelias Sie kirjoitetaan isolla keskellä lausetta.','Totta','Kohtelias Sie on isolla keskelläkin lausetta.'),
 o('EX-F23','Järjestä: Hyvää päivää, herra Schmidt.',['Guten','Tag,','Herr','Schmidt.'],'Guten Tag, Herr Schmidt.'),
 q('EX-F24','Tuntemattomalle aikuiselle yleinen asiallinen hyvästely:','Auf Wiedersehen!','Hallo!','Und dir?','Auf Wiedersehen on asiallinen hyvästely.'),
 q('EX-F25','Miten vastaat kun sinulle kuuluu hyvää?','Mir geht es gut.','Ich ist gut.','Woher gut?','Mir geht es gut.'),
 f('EX-F26','Täydennä: Mir geht es ____.','gut','Mir geht es gut.'),
 q('EX-F27','”Ei kovin hyvin” on:','Nicht so gut.','Sehr gut.','Guten Tag.','Nicht so gut.'),
 f('EX-F28','Täydennä kohteliaasti: Wie geht es ____?','Ihnen','Wie geht es Ihnen?'),
 t('EX-F29','Kirjoita saksaksi ”Mitä sinulle kuuluu?”','Wie geht es dir?','Wie geht es dir?'),
 b('EX-F30','Väite: Nicht toimii esimerkiksi fraasissa nicht so gut kieltosanana.','Totta','Nicht on kieltosana.'),
 q('EX-F31','Mikä luku on achtzehn?','18','8','80','Achtzehn on kahdeksantoista.'),
 q('EX-F32','Mikä luku on siebzehn?','17','7','70','Siebzehn on seitsemäntoista.'),
 f('EX-F33','Kirjoita numero 16 saksaksi.','sechzehn','Sechzehn kirjoitetaan ilman toista s:ää.'),
 f('EX-F34','Täydennä: Ich ____ zwanzig Jahre alt.','bin','Ikä ilmaistaan sein-verbillä.'),
 q('EX-F35','Miten kysyt ikää tuttavallisesti?','Wie alt bist du?','Wie heißt du?','Woher kommst du?','Wie alt bist du?'),
 q('EX-F36','Miten kirjoitetaan numero 21?','einundzwanzig','zwanzigeins','einszwanzig','Einundzwanzig.'),
 q('EX-F37','Miten kirjoitetaan 32?','zweiunddreißig','dreißigzwei','dreiundzwanzig','Zweiunddreißig.'),
 b('EX-F38','Väite: saksaksi ikä ilmaistaan muodolla Ich habe ... Jahre.','Tarua','Ikä ilmaistaan Ich bin ... Jahre alt.'),
 q('EX-F39','Miten pyydät nimen tavaamista?','Bitte buchstabieren Sie.','Woher kommen Sie?','Wie geht es Ihnen?','Bitte buchstabieren Sie.'),
 t('EX-F40','Kirjoita saksaksi ”Miten se kirjoitetaan?”','Wie schreibt man das?','Wie schreibt man das?'),
 q('EX-F41','Mikä on ü-kirjaimen tavallinen tekninen korvausmerkintä?','ue','uu','eu','ü korvataan joskus ue:lla.'),
 b('EX-F42','Väite: saksan ß tarkoittaa samaa ääntä kuin s, ei b.','Totta','Eszett ß on s-äänne.'),
 q('EX-F43','Mitä sanot kun et ymmärrä?','Ich verstehe nicht.','Ich bin neunzehn.','Guten Morgen.','Ich verstehe nicht.'),
 t('EX-F44','Kirjoita saksaksi ”Vielä kerran, kiitos!”','Noch einmal, bitte!','Noch einmal, bitte!'),
 q('EX-F45','Miten pyydät hitaampaa puhetta?','Bitte langsamer.','Wie alt bist du?','Guten Tag.','Bitte langsamer.'),
 q('EX-F46','Miten sanotaan keskiviikko?','Mittwoch','Montag','Sonntag','Mittwoch on keskiviikko.'),
 q('EX-F47','Miten sanotaan lauantai?','Samstag','Dienstag','Freitag','Samstag on lauantai.'),
 q('EX-F48','Miten sanotaan torstaina?','am Donnerstag','um Donnerstag','in Donnerstag','Am + viikonpäivä.'),
 t('EX-F49','Kirjoita saksaksi ”Maanantaina kello kolme.”','Am Montag um drei Uhr.','Am Montag um drei Uhr.'),
 q('EX-F50','Mitä tarkoittaa Schön, dich kennenzulernen?','Hauska tutustua!','Hyvää yötä!','Kiitos!','Schön, dich kennenzulernen = hauska tutustua.'),
];
export const exams={
 'EX-C01':{title:'Kappaletesti · C01 Hallo!',questions:c01Exam,scope:'C01'},
 'EX-C02':{title:'Kappaletesti · C02 Ich heiße …',questions:c02Exam,scope:'C02'},
 'EX-C03':{title:'Kappaletesti · C03 Woher kommst du?',questions:c03Exam,scope:'C03'},
 'EX-C04':{title:'Kappaletesti · C04 Du oder Sie?',questions:c04Exam,scope:'C04'},
 'EX-C05':{title:'Kappaletesti · C05 Wie geht’s?',questions:c05Exam,scope:'C05'},
 'EX-C07':{title:'Kappaletesti · C07 Wie schreibt man das?',questions:c07Exam,scope:'C07'},
 'EX-C09':{title:'Kappaletesti · C09 Am Montag um drei',questions:c09Exam,scope:'C09'},
 'EX-C10':{title:'Kappaletesti · C10 Schön, dich kennenzulernen!',questions:c10Exam,scope:'C10'},
 'EX-MID':{title:'Välikoe · kappaleet 1–5',questions:midExam,scope:'C01–C05'},
 'EX-FINAL':{title:'Loppukoe · LOS! 1',questions:finalExam,scope:'C01–C10'},
} as const;
export type ExamId=keyof typeof exams;
export const selfAssessment={
 'EX-C01':{
 prompt:'Tervehdi kuviteltua tuttavaa, kerro kohtelias hyvästely ja sano mitä ääntämisen sääntöä käytit.',
 model:'Hallo! Guten Tag! Tschüss! Auf Wiedersehen!',
 criteria:'Valitsit kaksi erilaista tervehdys- tai hyvästelytilannetta, ja erotit ne toisistaan. Ääntäminen arvioidaan itse.'
 },
 'EX-C02':{
 prompt:'Kirjoita itse lyhyt esittelyvuoropuhelu. Tervehdi, kysy toisen nimeä, vastaa omaan nimeesi ja hyvästele.',
 model:'A: Hallo! Wie heißt du? B: Ich heiße Mia. Und du? A: Ich bin Leo. B: Tschüss!',
 criteria:'Tervehdit, kysyit Wie heißt du?, käytit minä-muotoa heiße/bin ja hyvästelit. Arvioi kirjoitus itse.'
 },
 'EX-C03':{
 prompt:'Kirjoita kaksi kuvitteellista esittäytymistä, joissa kerrot nimen ja kotimaan.',
 model:'Ich heiße Lina. Ich komme aus Finnland. Ich heiße Leo. Ich komme aus Österreich.',
 criteria:'Kummassakin on nimi ja oikein muodostettu Ich komme aus ... -lause. Voit käyttää keksittyjä nimiä.'
 },
 'EX-C04':{
 prompt:'Kirjoita tai sano lyhyt kohtelias kohtaaminen kuvitteellisessa palvelutilanteessa.',
 model:'Guten Tag! Wie heißen Sie? Ich heiße Mira. Auf Wiedersehen!',
 criteria:'Tervehdit tilanteeseen sopivasti, käytit kohteliasta Sie-puhuttelua ja hyvästelit.'
 },
 'EX-C05':{
 prompt:'Kirjoita kaksi lyhyttä vointikeskustelua, toinen tuttavallinen ja toinen kohtelias.',
 model:'A: Wie geht es dir? B: Mir geht es gut. Und dir? A: Sehr gut! C: Wie geht es Ihnen? D: Nicht so gut.',
 criteria:'Kysyt vointia ainakin kahdella puhuttelutavalla ja vastaat sopivalla fraasilla.'
 },
 'EX-C07':{
 prompt:'Kirjoita kuvitteellisen henkilön nimi ja kohtelias tapa kysyä, miten se kirjoitetaan.',
 model:'A: Wie schreibt man das? B: Bitte buchstabieren Sie. A: L – E – A.',
 criteria:'Osaat käyttää kysymystä Wie schreibt man das?, kohteliasta pyyntöä sekä tavata kuvitteellisen nimen. Oikeaa puhelinnumeroa ei vaadita.'
 },
 'EX-C09':{
 prompt:'Kirjoita kahdelle kuvitteelliselle päivälle tapaamisaika saksaksi.',
 model:'Am Montag um drei Uhr. Am Donnerstag um vier Uhr.',
 criteria:'Kummassakin käytät muotoja am + isolla alkava viikonpäivä ja um + kellonaika.'
 },
 'EX-C10':{
 prompt:'Kirjoita kaksi lyhyttä kuvitteellista kohtaamista, joista toisessa käytetään du-muotoa ja toisessa kohteliasta Sie-muotoa. Esittele myös kolmas henkilö.',
 model:'A: Hallo! Wie heißt du? B: Ich heiße Mia. Und du? A: Ich bin Leo. B: Schön, dich kennenzulernen! C: Guten Tag! Wie heißen Sie? D: Ich heiße Herr Weber. C: Das ist Lea. Sie kommt aus Finnland. D: Auf Wiedersehen!',
 criteria:'Erotat du- ja Sie-muodot, esittelet nimet ja kolmannen henkilön, ja käytät sopivia tervehdyksiä ja hyvästelyjä. Tämä on itsearvioitava tuotos.'
 },
 'EX-MID':{
 prompt:'Esittäydy 3–4 lauseella kuvitteellisena henkilönä.',
 model:'Guten Tag! Ich heiße Mira. Ich komme aus Finnland. Mir geht es gut.',
 criteria:'Tervehdys, nimi, alkuperä ja vointi löytyvät. Nimen ja kotimaan muodot ovat oikein.'
 },
 'EX-FINAL':{
 prompt:'Kirjoita tai puhu 5–7 lyhyttä lausetta kuvitteellisesta ensikohtaamisesta.',
 model:'Hallo! Ich heiße Olli. Ich komme aus Finnland. Ich bin siebzehn Jahre alt. Mir geht es gut. Schön, dich kennenzulernen! Tschüss!',
 criteria:'Tervehdys, nimi, kotimaa, ikä, vointi, tutustuminen ja hyvästely. Itsearviointi ei vaikuta automaattisiin pisteisiin.'
 }
} as const;
export function validateLosExams():string[]{
 const issues:string[]=[];const ids=new Set<string>();
 for(const [name,questions] of [['EX-C01',c01Exam],['EX-C02',c02Exam],['EX-C03',c03Exam],['EX-C04',c04Exam],['EX-C05',c05Exam],['EX-C07',c07Exam],['EX-C09',c09Exam],['EX-C10',c10Exam],['EX-MID',midExam],['EX-FINAL',finalExam]] as const){
  if(questions.length!==(name==='EX-MID'?25:name==='EX-C10'?20:name.startsWith('EX-C')?15:50))issues.push(name+' väärä tehtävämäärä');
  for(const e of questions){
   if(ids.has(e.id))issues.push('Duplikaatti '+e.id);
   ids.add(e.id);
   if(!e.explanation||!e.prompt)issues.push('Tyhjä '+e.id);
   if(e.type==='choice'&&(!e.correct||!e.options?.includes(e.correct)))issues.push('Virheellinen avain '+e.id);
   if((e.type==='fill'||e.type==='translate')&&!e.accepted?.length)issues.push('Puuttuva avain '+e.id);
   if(e.type==='ordering'&&!e.order?.length)issues.push('Puuttuva järjestys '+e.id);
  }
 }
 return issues;
}
