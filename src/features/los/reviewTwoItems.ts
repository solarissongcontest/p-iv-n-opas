import type {ChapterId,Exercise} from './content';
import type {MixedReviewItem} from './reviewOneItems';

/**
 * All prompts and their answer keys are LOS!-authored. These are new attempt
 * IDs, not aliases for old chapter work. C06 numbers are taught by a separate
 * instructional drill but its human-written Text A is still source-pending.
 */
const choice=(id:string,chapterId:ChapterId,prompt:string,correct:string,wrong1:string,wrong2:string,why:string):MixedReviewItem=>({
 chapterId,exercise:{id,type:'choice',prompt,correct,options:[correct,wrong1,wrong2],hint:'Yritä ensin muistista ennen mallin avaamista.',explanation:why}
});
const fill=(id:string,chapterId:ChapterId,prompt:string,accepted:string[],why:string):MixedReviewItem=>({
 chapterId,exercise:{id,type:'fill',prompt,accepted,hint:'Palauta opittu fraasi tai lukusääntö mieleesi.',explanation:why}
});
const write=(id:string,chapterId:ChapterId,prompt:string,model:string,criteria:string):MixedReviewItem=>({
 chapterId,exercise:{id,type:'writing',prompt,hint:'Kirjoita ensin oma luonnos ja katso malli vasta palautuksen jälkeen.',explanation:'Itsearvioinnin malli: '+model+' Tarkistuslista: '+criteria}
});
const say=(id:string,chapterId:ChapterId,prompt:string,model:string):MixedReviewItem=>({
 chapterId,exercise:{id,type:'speech',prompt,hint:'Harjoittele rauhassa ennen mahdollista paikallista äänitystä.',explanation:'Itsearvioinnin mallifraasi: '+model+' Ääntämistä ei pisteytetä automaattisesti.'}
});
export const reviewTwoItems:readonly MixedReviewItem[]=[
 fill('REV2-01','C06','Kirjoita 16 saksaksi, ilman numeromerkintää.',['sechzehn'],'Sechzehn on kuusitoista. Huomaa, ettei se ole sechszehn.'),
 fill('REV2-02','C06','Kirjoita 17 saksaksi, ilman numeromerkintää.',['siebzehn'],'Siebzehn on seitsemäntoista, ei siebenzehn.'),
 fill('REV2-03','C06','Kirjoita numero 32 saksaksi yhteen sanaan.',['zweiunddreißig'],'Zweiunddreißig muodostetaan yksiköt + und + kymmenet.'),
 choice('REV2-04','C07','Millä ilmaisulla pyydät kohteliaasti kirjoittamaan nimen kirjaimet?','Bitte buchstabieren Sie.','Wie geht es dir?','Woher kommen Sie?','Bitte buchstabieren Sie. on kohtelias tavaamispyyntö.'),
 choice('REV2-05','C09','Mikä on viikon kolmas päivä saksaksi?','Mittwoch','Montag','Freitag','Viikonpäivät alkavat saksalaisessa kalenterissa Montag, Dienstag, Mittwoch.'),
 fill('REV2-06','C09','Täydennä: Am Dienstag ____ vier Uhr.',['um'],'Viikonpäivän edessä am ja kellonajan edessä um.'),
 choice('REV2-07','C02','Mitä tarkoittaa Wie heißt du?','Mikä sinun nimesi on?','Mistä olet kotoisin?','Mitä kuuluu?','Wie heißt du? kysyy tuttavan nimeä.'),
 fill('REV2-08','C03','Täydennä: Ich ____ aus Finnland.',['komme'],'Ich komme aus Finnland.'),
 choice('REV2-09','C04','Mikä on kohtelias nimikysymys?','Wie heißen Sie?','Wie heißt du?','Wie heißt Sie?','Kohtelias Sie on isolla ja verbi heißen.'),
 fill('REV2-10','C05','Täydennä: Mir geht es ____.',['gut'],'Mir geht es gut kertoo hyvää vointia.'),
 write('REV2-11','C10','Kirjoita 6–8 repliikin kuvitteellinen tuttavallinen ensikohtaaminen. Käytä tervehdystä, nimiä, kotipaikkaa, vointia ja hyvästelyä.','A: Hallo! Wie heißt du? B: Ich heiße Lea. Und du? A: Ich bin Leo. Woher kommst du? B: Ich komme aus Finnland. Wie geht es dir? A: Mir geht es gut. Tschüss!','Vähintään 6 repliikkiä, kumpikin puhuja, opitut fraasit ja yksi asianmukainen hyvästely.'),
 write('REV2-12','C10','Kirjoita 6–8 repliikin kohtelias ensikohtaaminen kuvitteellisen opettajan kanssa. Käytä Sie-muotoa ja nimen kysymistä.','A: Guten Tag! Wie heißen Sie? B: Guten Tag! Ich heiße Herr Weber. Und Sie? A: Ich heiße Mia. Woher kommen Sie? B: Ich komme aus Deutschland. A: Auf Wiedersehen!','Kohtelias Sie isolla, kysymyksissä heißen ja kommen sekä kohtelias hyvästely.'),
 say('REV2-13','C10','Esitä ääneen 4–6 lyhyttä virkettä kuvitteellisesta esittäytymisestä. Vertaa malliin itse, älä odota automaattista ääntämisarvosanaa.','Hallo! Ich heiße Lea. Ich komme aus Finnland. Wie heißt du? Mir geht es gut. Tschüss!'),
 choice('REV2-14','C10','Kumpi alkuperäisten COERLL-haastattelujen väite on oikea?','Berna tulee Kielistä ja Harald Münchenistä.','Molemmat tulevat Kielistä.','Molemmat tulevat Berliinistä.','Berna kertoo Ich komme aus Kiel, Harald puolestaan Ich komme ursprünglich aus München.'),

 choice('REV2-15','C01','Tervehdit uutta tuttavaa aamulla. Mikä on sopiva opittu tervehdys?','Guten Morgen!','Auf Wiedersehen!','Gute Nacht!','Guten Morgen on aamun tervehdys.'),
 choice('REV2-16','C08','Mitä voit sanoa opettajalle, kun et ymmärrä?','Ich verstehe nicht.','Ich heiße Max.','Am Montag um drei Uhr.','Ich verstehe nicht on oma opittu avunpyyntöfraasi.'),
 choice('REV2-17','C06','Minkä ikäinen Larissa on Monika Janickan toisessa alkuperäisessä minidialogissa?','zwölf','neunzehn','fünf','Larissa vastaa Ich bin schon zwölf Jahre alt.'),
 fill('REV2-18','C07','Täydennä: Bitte ____ Sie. (Pyydä tavaamaan.)',['buchstabieren'],'Bitte buchstabieren Sie on kohtelias tavaamispyyntö.'),
 choice('REV2-19','C09','Mikä ilmaus tarkoittaa torstaina kello neljä?','Am Donnerstag um vier Uhr.','Um Donnerstag am vier Uhr.','Am Donnerstag vier um.','Am + viikonpäivä, um + kellonaika.'),
 write('REV2-20','C10','Kirjoita kuvitteellinen 8–10 repliikin tutustuminen, jossa yhdistät vähintään viisi kirjan eri taitoa: tervehdys, nimi, alkuperä, ikä, kohtelias tai tuttavallinen puhuttelu, vointi, kirjoitusasun kysyminen, hitaamman puheen pyyntö tai viikonpäivä. Käytä kummallekin sopivaa hyvästelyä.','A: Hallo! Wie heißt du? B: Ich heiße Lisa. Und du? A: Ich bin Ben. Woher kommst du? B: Ich komme aus Finnland. Wie alt bist du? A: Ich bin siebzehn Jahre alt. Wie geht es dir? B: Mir geht es gut. Tschüss!','Vähintään kahdeksan repliikkiä ja viisi erilaista opittua taitoa, molempien vuorot ja tilanteeseen sopiva hyvästely. Ei oikeita henkilökohtaisia tietoja.'),

];
/** A completed task is a submitted answer, not a correct score or language grade. */
export const reviewTwoInitialIds=['REV2-01','REV2-02','REV2-03','REV2-04','REV2-05','REV2-06'] as const;
export const reviewTwoApplicationIds=['REV2-07','REV2-08','REV2-09','REV2-10','REV2-11','REV2-12'] as const;
export const reviewTwoFinalIds=['REV2-15','REV2-16','REV2-17','REV2-18','REV2-19','REV2-20'] as const;
