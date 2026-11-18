import type {LosExercise} from "./exerciseBank.ts";
import {losExercisesFor,losIsCorrect} from "./exerciseBank.ts";
/** Distinct transfer-assessment bank: practice questions are NOT reused as exams.
 * The legacy Cxx-EX tests remain readable after upgrades, including partial
 * drafts and archived re-takes. New unanswered chapter tests use V2.
 */
type Pair=[prompt:string,correct:string,wrong1:string,wrong2:string,explanation:string];
type Fill=[prompt:string,correct:string,explanation:string];
type Data={choice:readonly Pair[];fill:readonly Fill[]};
const data:Readonly<Record<string,Data>>={
"01":{choice:[
["Kello on 7.45. Mitä sanot koulun opettajalle?","Guten Morgen!","Guten Abend!","Gute Nacht!","Aamulla käytetään Guten Morgen."],
["Saavut kurssille kello 19. Mikä tervehdys sopii?","Guten Abend!","Guten Morgen!","Auf Wiedersehen!","Guten Abend on illan tervehdys."],
["Vieras saapuu vastaanottoon keskipäivällä.","Guten Tag!","Gute Nacht!","Tschüss!","Kohtelias päivätervehdys on Guten Tag."],
["Tapaat läheisen kaverin. Mikä on rento tervehdys?","Hallo!","Auf Wiedersehen!","Gute Nacht!","Hallo sopii ystävälle."],
["Poistut virallisesta tapaamisesta. Mikä hyvästely sopii?","Auf Wiedersehen!","Guten Tag!","Guten Morgen!","Auf Wiedersehen on kohteliaampi hyvästely."],
["Lähdet kaverin luota. Mitä sanot?","Tschüss!","Guten Abend!","Guten Tag!","Tschüss on rento hyvästely."],
["Ystävä menee nukkumaan. Mitä toivotat?","Gute Nacht!","Guten Tag!","Hallo!","Gute Nacht tarkoittaa hyvää yötä."],
["Tapaat henkilön varmasti huomenna. Mitä voit sanoa erotessa?","Bis morgen!","Gute Nacht!","Guten Tag!","Bis morgen tarkoittaa huomiseen."],
["Mitä Danke! tarkoittaa?","Kiitos!","Anteeksi!","Näkemiin!","Danke on kiitos."],
["Mitä sanot, kun joku kiittää sinua?","Bitte!","Gute Nacht!","Woher?","Bitte sopii vastaukseksi kiitokseen."],
],fill:[
["Täydennä: Guten ____! (hyvää päivää)","Tag","Päivätervehdyksessä sanotaan Guten Tag."],
["Täydennä: Auf ____! (näkemiin)","Wiedersehen","Kohtelias hyvästely on Auf Wiedersehen."],
]},
"02":{choice:[
["Uusi opiskelija kysyy nimeäsi. Mikä on oikea vastausrakenne?","Ich heiße Leon.","Du heißt Leon.","Ich bist Leon.","Ich heiße on minämuoto."],
["Mikä kysymys selvittää uuden ystävän nimen?","Wie heißt du?","Wo wohnst du?","Wie alt bist du?","Wie heißt du kysyy nimen."],
["Täydennä ajatuksena: Sinun nimesi on Selma.","Du heißt Selma.","Ich heißt Selma.","Du heiße Selma.","Du-sanan kanssa käytetään heißt."],
["Kerro olevasi Aino.","Ich bin Aino.","Du bin Aino.","Ich bist Aino.","Sein-verbin ich-muoto on bin."],
["Kerro, että toinen on Nora.","Du bist Nora.","Ich bin Nora.","Du bin Nora.","Sein-verbin du-muoto on bist."],
["Näet luokkakuvassa uuden henkilön. Kysy kuka se on.","Wer ist das?","Wann ist das?","Woher ist das?","Wer kysyy kuka."],
["Esittele Leon toiselle henkilölle.","Das ist Leon.","Ich heißt Leon.","Wer Leon ist?","Das ist Leon on toisen henkilön esittely."],
["Mitä Freut mich! tarkoittaa tässä?","Hauska tutustua!","Hyvää yötä!","Mistä olet?","Freut mich sopii uuden tuttavuuden tapaamiseen."],
["Valitse oikein kirjoitettu du-muoto.","du heißt","du heißst","du heiße","Heißt kirjoitetaan ß ja t."],
["Mikä muoto sopii ilmaisun Ich ____ Nora alkuun?","bin","bist","ist","Ich bin tarkoittaa minä olen."],
],fill:[
["Täydennä: Wie ____ du?","heißt","Nimikysymyksessä du:n verbi on heißt."],
["Täydennä: Ich ____ Aino.","heiße","Minän esittäytymisessä käytetään heiße."],
]},
"03":{choice:[
["Aino kertoo olevansa Suomesta. Minkä maan hän mainitsee?","Finnland","Schweden","Österreich","Finnland on Suomi."],
["Selma on Ruotsista. Mikä maan nimi on saksaksi?","Schweden","Schweiz","Estland","Schweden on Ruotsi."],
["Herr Weber on Wienistä. Missä maassa kaupunki sijaitsee?","Österreich","Finnland","Estland","Wien sijaitsee Itävallassa."],
["Mikä kysymys selvittää kotimaan?","Woher kommst du?","Wie alt bist du?","Wie heißt du?","Woher kysyy mistä olet kotoisin."],
["Mikä kysymys selvittää asuinkaupungin?","Wo wohnst du?","Wie heißt du?","Wie geht's?","Wo wohnst du kysyy missä asut."],
["Mikä ilmaus vastaa 'Olen kotoisin Saksasta'?","Ich komme aus Deutschland.","Ich bin aus Berlin alt.","Ich heiße Deutschland.","Komme aus ilmaisee lähtömaata."],
["Mikä sana tarkoittaa 'myös'?","auch","aus","wo","Auch on myös."],
["Mikä on oikea ilmaus Sveitsistä tulemisesta?","aus der Schweiz","aus Schweiz","aus die Schweiz","Sveitsin yhteydessä käytetään aus der Schweiz."],
["Miten Viro sanotaan saksaksi?","Estland","Schweden","Finnland","Estland on Viro."],
["Mikä tarkoittaa kaupunkia?","die Stadt","das Land","die Nacht","Stadt on kaupunki."],
],fill:[
["Täydennä: Ich komme ____ Finnland.","aus","Aus ilmaisee lähtömaan."],
["Täydennä: Woher ____ du?","kommst","Kommen-verbin du-muoto on kommst."],
]},
"04":{choice:[
["Tervehdit ensi kertaa virallista vierasta. Mikä puhuttelu?","Sie","du","ich","Kohteliaassa tilanteessa Sie sopii."],
["Puhut kurssin läheiselle kaverille. Mikä puhuttelu?","du","Sie","wir","Ystävää yleensä sinutellaan."],
["Kysy vieraalta kohteliaasti hänen nimeään.","Wie heißen Sie?","Wie heißt du?","Wie heiße Sie?","Sie vaatii muodon heißen."],
["Mikä sana kirjoitetaan kohteliaana Te-pronominina isolla?","Sie","sie","du","Kohtelias Sie kirjoitetaan isolla."],
["Täydennä kohteliaan kysymyksen ajatus: Woher ____ Sie?","kommen","kommst","komme","Kohtelias Sie käyttää muotoa kommen."],
["Miten lopetat muodollisen sähköpostin?","Mit freundlichen Grüßen","Tschüss, du!","Gute Nacht!","Mit freundlichen Grüßen on vakiintunut kirjallinen lopetus."],
["Mikä sana tarkoittaa rouvaa tai naista?","Frau","Herr","Freund","Frau on naisesta käytettävä titteli."],
["Mikä on miehen kohtelias titteli?","Herr","Frau","Freundin","Herr tarkoittaa herraa."],
["Mikä ilmaisumuoto kuuluu lähinnä puheessa hyvästelyyn?","Auf Wiedersehen!","Mit freundlichen Grüßen","Ich komme aus","Auf Wiedersehen sanotaan puhuttuna."],
["Mikä lause on muodollinen nimikysymys?","Wie heißen Sie?","Wie heißt du?","Was bist Sie?","Muodollinen Sie erottuu du:sta."],
],fill:[
["Täydennä: Wie heißen ____?","Sie","Teitittelypronomini on Sie."],
["Täydennä: Guten Tag, ____ Weber!","Herr","Miehestä käytetään puhuttelussa Herr."],
]},
"05":{choice:[
["Kysyt kaverin kuulumisia. Mikä sopii?","Wie geht's?","Wie heißt du?","Woher kommst du?","Wie geht's on kuulumiskysymys."],
["Kaveri on väsynyt. Mikä vastaus sopii?","Nicht so gut.","Sehr gut!","Prima!","Nicht so gut kertoo huonommasta voinnista."],
["Miten sanot olevasi väsynyt?","Ich bin müde.","Ich heiße müde.","Du bist müde.","Ich bin müde on olen väsynyt."],
["Mikä vastaa 'minulle kuuluu hyvää'?","Mir geht's gut.","Du heißt gut.","Ich komme gut.","Mir geht's gut on kuulumisvastaus."],
["Mikä tarkoittaa 'erittäin hyvää'?","sehr gut","nicht so gut","schlecht","Sehr vahvistaa gut-ilmausta."],
["Mikä tarkoittaa 'ei'?","nicht","sehr","auch","Nicht on kieltoilmaus."],
["Mikä ilmaus kääntyy 'Entä sinulle?'?","Und dir?","Und Sie?","Und mich?","Und dir on sinuttelun vastakysymys."],
["Miten kuulumisia kysytään kohteliaasti?","Wie geht es Ihnen?","Wie geht es dir?","Wie heißen Sie?","Ihnen on kohteliaan kuulumiskysymyksen muoto."],
["Mitä prima tarkoittaa tässä aiheessa?","mainiosti","huonosti","huomenna","Prima ilmaisee erittäin hyvää vointia."],
["Mikä on sopiva vastaus kysymykseen Wie geht's?","Gut, danke.","Ich komme aus Berlin.","Wie heißt du?","Gut, danke kertoo voinnista."],
],fill:[
["Täydennä: Ich bin ____. (väsynyt)","müde","Müde tarkoittaa väsynyttä."],
["Täydennä: Mir geht's ____. (hyvää)","gut","Mir geht's gut kertoo hyvää vointia."],
]},
"06":{choice:[
["Kuinka sanot luvun 16 saksaksi?","sechzehn","sechszehn","sechs","Sechzehn ei sisällä loppus-s:ää."],
["Mikä on saksaksi 17?","siebzehn","siebenzehn","sieben","Siebzehn on 17."],
["Miten sanot luvun 18?","achtzehn","achtzig","acht","Achtzehn on 18."],
["Mikä luku on zwanzig?","20","12","30","Zwanzig on kaksikymmentä."],
["Mikä luku on einundzwanzig?","21","12","31","Luku 21 muodostuu ein-und-zwanzig."],
["Mikä luku on dreißig?","30","13","40","Dreißig on kolmekymmentä."],
["Mitä sieben tarkoittaa?","seitsemän","kuusi","yhdeksän","Sieben on seitsemän."],
["Mitä hundert tarkoittaa?","sata","kymmenen","tuhat","Hundert on sata."],
["Kysy toiselta hänen ikäänsä.","Wie alt bist du?","Wie heißt du?","Wie geht's?","Wie alt bist du kysyy ikää."],
["Miten sanot olevasi 17-vuotias?","Ich bin siebzehn Jahre alt.","Ich habe siebzehn Jahre.","Ich bin siebzehn Uhr.","Ikä kerrotaan sein-verbin avulla."],
],fill:[
["Täydennä: Ich bin ____ Jahre alt. (16)","sechzehn","Sechzehn on kuusitoista."],
["Täydennä: Ich bin ____ Jahre alt. (18)","achtzehn","Achtzehn on kahdeksantoista."],
]},
"07":{choice:[
["Mikä tavattu kirjainjono vastaa nimeä Aino?","A-I-N-O","E-I-N-O","A-N-I-O","Aino alkaa A-kirjaimella."],
["Mikä tavattu kirjainjono vastaa nimeä Nora?","N-O-R-A","N-O-A-R","M-O-R-A","Nora tavataan N-O-R-A."],
["Mikä on oikea kirjoitusasu kaupungille München?","München","Munchen","Münchan","Münchenissä on ü-kirjain."],
["Mikä on oikea kirjoitusasu verbille heißen?","heißen","heissen","heißsen","Saksan standardimuodossa on ß."],
["Mitä tarkoittaa Wie schreibt man das?","Miten se kirjoitetaan?","Mitä kuuluu?","Mistä olet?","Schreiben tarkoittaa kirjoittamista."],
["Millä pyynnöllä joku saa sinut tavaamaan kohteliaasti?","Bitte buchstabieren Sie.","Wie alt bist du?","Bis morgen!","Buchstabieren tarkoittaa tavaamista."],
["Mikä ilmaus pyytää toistoa?","Noch einmal, bitte!","Guten Morgen!","Ich bin Aino.","Noch einmal pyytää toistamaan."],
["Mikä tarkoittaa hitaammin?","langsamer","schnell","prima","Langsamer on hitaammin."],
["Mikä kirjain vastaa suomenkin y-kaltaista saksan umlautia?","ü","ß","z","Ü on saksan umlaut-kirjain."],
["Mikä on oikein tavattu sukunimi Beck?","B-E-C-K","B-E-K-C","P-E-C-K","Beck kirjoitetaan B-E-C-K."],
],fill:[
["Täydennä: L-A-I-N-E muodostaa nimen ____.","Laine","Ainon sukunimi on Laine."],
["Täydennä: Wie ____ man das?","schreibt","Wie schreibt man das tarkoittaa miten se kirjoitetaan."],
]},
"08":{choice:[
["Et ymmärrä opetusta. Mitä sanot?","Ich verstehe nicht.","Ich bin siebzehn.","Bis Donnerstag!","Ich verstehe nicht kertoo ymmärtämättömyydestä."],
["Opettaja puhuu liian nopeasti. Mitä pyydät?","Bitte langsamer!","Guten Abend!","Sehr gut!","Langsamer tarkoittaa hitaammin."],
["Haluat saman lauseen uudelleen. Mikä sopii?","Noch einmal, bitte!","Ich heiße Aino.","Ich komme aus Finnland.","Noch einmal pyytää toistoa."],
["Mitä kysyt, kun sana on tuntematon?","Was bedeutet das?","Wie alt bist du?","Wer ist das?","Bedeuten tarkoittaa merkitä/tarkoittaa."],
["Mitä sana schnell tarkoittaa?","nopeasti","hitaasti","huomenna","Schnell on nopeasti tai nopea."],
["Mitä sana langsam tarkoittaa?","hitaasti","nopeasti","eilen","Langsam on hitaasti tai hidas."],
["Mikä kysymys on kohtelias toistopyyntö?","Können Sie das bitte wiederholen?","Woher kommen Sie?","Wie heißen Sie?","Wiederholen on toistaa."],
["Mikä ilmaus tarkoittaa en ymmärrä?","Ich verstehe nicht.","Ich bin nicht.","Ich heiße nicht.","Verstehen tarkoittaa ymmärtää."],
["Mitä Wort tarkoittaa?","sana","viikko","nimi","Wort on sana."],
["Mitä Satz tarkoittaa?","lause","päivä","vuosi","Satz on lause."],
],fill:[
["Täydennä: Bitte ____. (hitaammin)","langsamer","Langsamer on hitaammin."],
["Täydennä: Was ____ das? (mitä tämä tarkoittaa)","bedeutet","Was bedeutet das kysyy merkitystä."],
]},
"09":{choice:[
["Mikä ilmaus tarkoittaa tiistaina?","am Dienstag","um Dienstag","aus Dienstag","Am ilmaisee viikonpäivän."],
["Mikä ilmaus tarkoittaa kello kolmelta?","um drei Uhr","am drei Uhr","aus drei Uhr","Um ilmaisee kellonajan."],
["Mitä Mittwoch tarkoittaa?","keskiviikko","torstai","maanantai","Mittwoch on keskiviikko."],
["Mitä Donnerstag tarkoittaa?","torstai","tiistai","sunnuntai","Donnerstag on torstai."],
["Mitä Freitag tarkoittaa?","perjantai","maanantai","lauantai","Freitag on perjantai."],
["Mikä sana kysyy milloin?","wann","wo","wer","Wann kysyy aikaa."],
["Mikä ilmaus tarkoittaa huomenna?","morgen","gestern","heute","Morgen pienellä on huomenna."],
["Mikä ilmaus tarkoittaa eilen?","gestern","heute","morgen","Gestern on eilen."],
["Miten sanot maanantaina kello neljältä?","am Montag um vier Uhr","um Montag am vier Uhr","am vier um Montag","Viikonpäivä am, kellonaika um."],
["Miten sanot 'sunnuntaina'?","am Sonntag","um Sonntag","aus Sonntag","Am Sonntag tarkoittaa sunnuntaina."],
],fill:[
["Täydennä: ____ Freitag (perjantaina)","am","Am on viikonpäivän edellä."],
["Täydennä: ____ neun Uhr (kello yhdeksältä)","um","Um on kellonajan edellä."],
]},
"10":{choice:[
["Uusi opiskelija sanoo Wie heißt du? Vastaa omasta nimestä.","Ich heiße Aino.","Du heißt Aino.","Ich bin aus Aino.","Ich heiße kertoo oman nimen."],
["Kysy uuden henkilön kotimaata.","Woher kommst du?","Wann hast du Zeit?","Wie geht's?","Woher kertoo mistä henkilö on kotoisin."],
["Kysy tapaamisaikaa.","Wann hast du Zeit?","Woher kommst du?","Wie heißt du?","Wann hast du Zeit kysyy milloin on aikaa."],
["Kerro, että ystäväsi on Saksasta.","Sie kommt aus Deutschland.","Sie komme aus Deutschland.","Du kommt aus Deutschland.","Sie kommt on hän tulee."],
["Kerro oma ikäsi 17 vuotta.","Ich bin siebzehn Jahre alt.","Ich habe siebzehn Jahre.","Du bin siebzehn.","Ikä ilmaistaan bin ... Jahre alt."],
["Tervehdit vierasta kohteliaasti.","Guten Tag!","Gute Nacht!","Tschüss!","Guten Tag on kohtelias päivätervehdys."],
["Miten pyydät hidastamaan?","Bitte langsamer!","Guten Morgen!","Ich komme aus Berlin.","Bitte langsamer pyytää hitaampaa puhetta."],
["Mikä on kohtelias nimikysymys?","Wie heißen Sie?","Wie heißt du?","Wie heiße Sie?","Sie vaatii verbin heißen."],
["Miten hyvästelet ystävän torstaihin asti?","Bis Donnerstag!","Gute Nacht!","Hallo!","Bis Donnerstag tarkoittaa torstaihin."],
["Mikä ilmaus on luonteva tutustumisen jälkeen?","Schön, dich kennenzulernen!","Bitte langsamer!","Guten Morgen!","Schön, dich kennenzulernen tarkoittaa hauska tutustua."],
],fill:[
["Täydennä: Ich ____ aus Finnland.","komme","Ich komme aus ilmaisee alkuperää."],
["Täydennä: Das ____ Mila. (Tämä on Mila.)","ist","Das ist ilmaisee esittelyä."],
]},
};
const skills:Record<string,LosExercise["skill"]>={
 "01":"tervehtiminen","02":"esittäytyminen","03":"alkuperä","04":"puhuttelu",
 "05":"kuulumiset","06":"numerot","07":"tavaaminen","08":"selviytyminen",
 "09":"ajanilmaukset","10":"kertaus",
};
export const LOS1_CHAPTER_TESTS_V2:readonly LosExercise[]=Object.entries(data).flatMap(([chapterId,bank])=>{
  const skill=skills[chapterId]??"kertaus";
  const items:LosExercise[]=[];
  for(const [i,[prompt,correct,wrong1,wrong2,explanation]] of bank.choice.entries()){
    items.push({id:"C"+chapterId+"-TEST-V2-"+String(i+1).padStart(2,"0"),chapterId,skill,
      kind:"choice",instruction:"Valitse oikea vastaus uuteen tilanteeseen.",prompt,
      options:[wrong1,correct,wrong2],correct,accepted:[correct],explanation});
  }
  for(const [i,[prompt,correct,explanation]] of bank.fill.entries()){
    items.push({id:"C"+chapterId+"-TEST-V2-"+String(bank.choice.length+i+1).padStart(2,"0"),chapterId,skill,
      kind:"fill",instruction:"Kirjoita vastaus ilman vaihtoehtoja.",prompt,
      correct,accepted:[correct],explanation});
  }
  return items;
});
export function losChapterExamExercises(chapterId:string,existingAnswers:Readonly<Record<string,string>>={}):readonly LosExercise[]{
  // Existing v1 incomplete or submitted tests must keep the original answer IDs.
  const legacy=Object.keys(existingAnswers).some(id=>id.startsWith("C"+chapterId+"-EX-"));
  if(legacy)return losExercisesFor(chapterId);
  return LOS1_CHAPTER_TESTS_V2.filter(item=>item.chapterId===chapterId);
}
export function losChapterExamScore(chapterId:string,answers:Readonly<Record<string,string>>){
  const exercises=losChapterExamExercises(chapterId,answers);
  return {correct:exercises.filter(item=>losIsCorrect(item,answers[item.id]??"")).length,total:exercises.length};
}
export function validateLosChapterExams():string[]{
 const issues:string[]=[];
 const ids=new Set<string>();
 for(let n=1;n<=10;n++){
   const chapter=String(n).padStart(2,"0");
   const questions=losChapterExamExercises(chapter);
   if(questions.length!==12)issues.push(chapter+": odotettiin 12 tehtävää.");
   for(const q of questions){
     if(ids.has(q.id))issues.push("Toistuva koetunniste "+q.id);
     ids.add(q.id);
     if(q.options && (new Set(q.options).size!==q.options.length||!q.options.includes(q.correct)))
       issues.push(q.id+": virheellinen vaihtoehto.");
     if(!q.prompt.trim()||q.explanation.length<10)issues.push(q.id+": puutteelliset tehtävätiedot.");
     if(!losIsCorrect(q,q.correct))issues.push(q.id+": oikeaa vastausta ei hyväksytä.");
   }
 }
 if(ids.size!==120)issues.push("Erillisiä koetehtäviä oli "+ids.size+", tavoite 120.");
 return issues;
}
