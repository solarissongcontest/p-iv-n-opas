import {LOS_BOOKS} from "./catalog.ts";

/** Finite, editorially controllable course glossary. A missing entry is shown
 * as unreviewed rather than silently making up a dictionary translation. */
const common:Readonly<Record<string,string>>={
 "hallo":"hei","ja":"kyllä","nein":"ei","danke":"kiitos","bitte":"ole hyvä / kohtelias pyyntö",
 "guten":"hyvää (tervehdyksessä)",
 "tag":"päivä","abend":"ilta","nacht":"yö","tschüss":"moikka","auf":"-lla / -lle (kiinteässä ilmauksessa)",
 "wiedersehen":"näkemiin (Auf Wiedersehen)","bis":"asti / kunnes; Bis morgen = huomiseen",
 "ich":"minä","du":"sinä","sie":"hän/he / kohtelias Te (isolla Sie)",
 "er":"hän (mies)","ihr":"te / hänen","mich":"minua",
 "bin":"olen","bist":"olet","ist":"on","sind":"ovat / olette","heiße":"olen nimeltäni",
 "heißt":"on nimeltään / olet nimeltäsi","heißen":"olla nimeltään","wie":"miten / kuinka",
 "wer":"kuka","was":"mikä / mitä","wo":"missä","woher":"mistä","wann":"milloin",
 "kommst":"tulet","komme":"tulen / olen kotoisin","kommt":"tulee","kommen":"tulla",
 "aus":"-sta / -stä","in":"-ssa / -ssä","hier":"täällä","da":"tuolla / siinä",
 "und":"ja","oder":"tai","aber":"mutta","auch":"myös","noch":"vielä",
 "nicht":"ei","so":"niin / sillä tavalla","sehr":"erittäin","gut":"hyvä / hyvin",
 "müde":"väsynyt","prima":"mainiosti","super":"hienoa",
 "deutsch":"saksa / saksalainen","deutschkurs":"saksan kurssi","lehrerin":"naisopettaja",
 "lehrer":"opettaja","kurs":"kurssi","frau":"rouva / nainen","herr":"herra",
 "name":"nimi","freund":"ystävä (mies)","freundin":"ystävä (nainen)",
 "alt":"vanha / iäkäs","jahre":"vuotta","jahr":"vuosi","zeit":"aika",
 "montag":"maanantai","dienstag":"tiistai","mittwoch":"keskiviikko",
 "donnerstag":"torstai","freitag":"perjantai","samstag":"lauantai","sonntag":"sunnuntai",
 "uhr":"kellonaika / kello","am":"viikonpäivän edellä (am Montag = maanantaina)",
 "um":"kellonajan edellä (um vier Uhr = kello neljältä)",
 "heute":"tänään","morgen":"huomenna / aamu (isolla Morgen)",
 "frei":"vapaa","treffen":"tapaaminen / tavata","wir":"me","uns":"meitä / meidät",
 "verstehe":"ymmärrän","verstehen":"ymmärtää","bedeutet":"tarkoittaa",
 "schnell":"nopea / nopeasti","langsam":"hidas / hitaasti","langsamer":"hitaammin",
 "wiederholen":"toistaa","können":"voida / osata","entschuldigung":"anteeksi",
 "schreibt":"kirjoittaa / kirjoitetaan","schreiben":"kirjoittaa",
 "buchstabieren":"tavata kirjain kerrallaan",
 "finnland":"Suomi","deutschland":"Saksa","österreich":"Itävalta",
 "schweden":"Ruotsi","estland":"Viro","schweiz":"Sveitsi",
 "berlin":"Berliini","stockholm":"Tukholma","wien":"Wien",
 "tallinn":"Tallinna","bern":"Bern","helsinki":"Helsinki",
 "eins":"yksi","zwei":"kaksi","drei":"kolme","vier":"neljä","fünf":"viisi",
 "sechs":"kuusi","sieben":"seitsemän","acht":"kahdeksan","neun":"yhdeksän",
 "zehn":"kymmenen","elf":"yksitoista","zwölf":"kaksitoista",
 "dreizehn":"kolmetoista","vierzehn":"neljätoista","fünfzehn":"viisitoista",
 "sechzehn":"kuusitoista","siebzehn":"seitsemäntoista","achtzehn":"kahdeksantoista",
 "neunzehn":"yhdeksäntoista","zwanzig":"kaksikymmentä",
 "einundzwanzig":"kaksikymmentäyksi","dreißig":"kolmekymmentä",
 "vierzig":"neljäkymmentä","hundert":"sata",
};
const chapterGlossaries:Readonly<Record<string,Readonly<Record<string,string>>>>=
  Object.fromEntries((LOS_BOOKS[0]?.chapters??[]).map((ch)=>{
    const map:Record<string,string>={};
    for(const entry of ch.vocabulary){
      const divider=entry.indexOf(" – ");
      if(divider<0)continue;
      const word=entry.slice(0,divider).trim().toLocaleLowerCase("de");
      const meaning=entry.slice(divider+3).trim();
      if(word && meaning)map[word]=meaning;
    }
    return [ch.id,map];
  }));
export function los1TokenMeaning(chapterId:string,display:string):string|null {
  const word=display.trim().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,"").toLocaleLowerCase("de");
  if(!word)return null;
  const number=Number(chapterId);
  // Previously taught phrases/words are available in subsequent chapters.
  for(let i=number;i>=1;i--){
    const chapter=chapterGlossaries[String(i).padStart(2,"0")];
    if(chapter?.[word])return chapter[word];
  }
  return common[word]??null;
}
export function los1CourseGlossary(chapterId:string):Readonly<Record<string,string>>{
  const words:Record<string,string>={...common};
  for(let i=1;i<=Number(chapterId);i++){
    Object.assign(words,chapterGlossaries[String(i).padStart(2,"0")]??{});
  }
  return words;
}
/** Deliberately small reviewed subset, never manufacture an IPA fallback. */
const firstIPA:Readonly<Record<string,string>>={
 "hallo":"/haˈloː/","guten":"/ˈɡuːtn̩/","morgen":"/ˈmɔʁɡn̩/",
 "tag":"/taːk/","abend":"/ˈaːbn̩t/","tschüss":"/tʃʏs/",
 "ich":"/ɪç/","du":"/duː/","wie":"/viː/","heiße":"/ˈhaɪ̯sə/",
 "heißen":"/ˈhaɪ̯sn̩/","aus":"/aʊ̯s/","komme":"/ˈkɔmə/",
 "bitte":"/ˈbɪtə/","danke":"/ˈdaŋkə/","nicht":"/nɪçt/",
};
export function los1TokenIPA(token:string):string|null{
 return firstIPA[token.toLocaleLowerCase("de").replace(/^[^\p{L}]+|[^\p{L}]+$/gu,"")]??null;
}
