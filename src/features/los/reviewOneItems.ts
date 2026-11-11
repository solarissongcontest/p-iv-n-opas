import type {ChapterId,Exercise} from './content';

export type MixedReviewItem={chapterId:ChapterId;exercise:Exercise};
const choice=(id:string,chapterId:ChapterId,prompt:string,options:string[],correct:string,explanation:string):MixedReviewItem=>({
 chapterId,exercise:{id,type:'choice',prompt,options,correct,hint:'Kokeile ensin muistista. Tarkista vasta sitten oppikirjan kyseinen kappale.',explanation}
});
const fill=(id:string,chapterId:ChapterId,prompt:string,accepted:string[],explanation:string):MixedReviewItem=>({
 chapterId,exercise:{id,type:'fill',prompt,accepted,hint:'Muista opittu fraasi kokonaisena.',explanation}
});
const translate=(id:string,chapterId:ChapterId,prompt:string,accepted:string[],explanation:string):MixedReviewItem=>({
 chapterId,exercise:{id,type:'translate',prompt,accepted,hint:'Käytä täsmälleen jo opetettua ilmaisua.',explanation}
});
export const reviewOneItems:readonly MixedReviewItem[]=[
 choice('REV1-01','C01','Aamulla tervehdit. Mikä on sopiva ilmaus?',['Guten Morgen!','Guten Abend!','Gute Nacht!'],'Guten Morgen!','Guten Morgen tarkoittaa hyvää huomenta.'),
 translate('REV1-02','C01','Kirjoita saksaksi ”Näkemiin!”',['Auf Wiedersehen!','Auf Wiedersehen'],'Auf Wiedersehen on kohteliaampi hyvästely.'),
 fill('REV1-03','C02','Täydennä muistista: Ich ____ Emilia.',['heiße'],'Heißen-verbin minä-muoto on heiße.'),
 choice('REV1-04','C02','Mikä kysymys pyytää tuttavan nimeä?',['Wie heißt du?','Woher kommst du?','Wie geht es Ihnen?'],'Wie heißt du?','Wie heißt du tarkoittaa mikä sinun nimesi on.'),
 choice('REV1-05','C04','Mikä on kohtelias nimikysymys?',['Wie heißen Sie?','Wie heißt du?','Wie heißt Sie?'],'Wie heißen Sie?','Kohtelias Sie vaatii heißen-verbin Sie-muodon.'),
 fill('REV1-06','C04','Täydennä kohteliaasti: Woher ____ Sie?',['kommen'],'Sie kommen on kohtelias muoto.'),
 choice('REV1-07','C05','Miten sanot, ettei sinulle kuulu kovin hyvää?',['Nicht so gut.','Guten Abend!','Bis bald!'],'Nicht so gut.','Nicht so gut on arkinen vointivastaus.'),
 translate('REV1-08','C05','Kirjoita saksaksi ”Mitä sinulle kuuluu?”',['Wie geht es dir?','Wie geht es dir'],'Wie geht es dir? on tuttavallinen vointikysymys.'),
 {chapterId:'C02',exercise:{id:'REV1-09',type:'listen-choice',prompt:'Kuuntele sama alkuperäinen Ich bin Peter -dialogi uudestaan. Kuka sanoo Ich bin Thomas?',options:['Thomas','Takashi','Peter'],correct:'Thomas',mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsch_Dialog_._Ich_bin_Peter.ogg',hint:'Kolmas repliikki alkaa puhujan omalla nimellä.',explanation:'Thomas sanoo Ich bin Thomas.'}},
 {chapterId:'C02',exercise:{id:'REV1-10',type:'listen-write',prompt:'Kirjoita keskustelun ensimmäinen nimikysymys.',accepted:['Wie heißt du?','Wie heißt du'],mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsch_Dialog_._Ich_bin_Peter.ogg',hint:'Thomas aloittaa sanomalla Wie ...?',explanation:'Keskustelu alkaa lauseella Wie heißt du?'}},
 {chapterId:'C03',exercise:{id:'REV1-11',type:'listen-choice',prompt:'Mistä kaupungista Thomas kertoo tulevansa alkuperäisessä äänitteessä?',options:['Berlin','Kyoto','Kiel'],correct:'Berlin',mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsch_Dialog_._Ich_bin_Peter.ogg',hint:'Thomas sanoo Wir kommen aus …',explanation:'Thomas sanoo Wir kommen aus Berlin.'}},
 {chapterId:'C03',exercise:{id:'REV1-12',type:'listen-choice',prompt:'Mikä kaupunki mainitaan Takashin omassa vastauksessa?',options:['Kyoto','Kiel','Hamburg'],correct:'Kyoto',mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsch_Dialog_._Ich_bin_Peter.ogg',hint:'Takashi sanoo Ich komme aus …',explanation:'Takashi kertoo olevansa Kiotosta: Ich komme aus Kyoto.'}},
];
