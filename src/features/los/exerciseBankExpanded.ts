import type { LosExercise } from "./exerciseBank";

/**
 * LOS! 1 C03–C06: itse laaditut opiskelu- ja kertauskysymykset.
 * Perustuvat kirjakohtaisen masterplanin 3.4–3.7 aktiivisiin taitoihin.
 * Eivät väitä olevansa vielä Berna-/Wikibooks-tekstien ymmärtämistehtäviä
 * tai autenttisten kuuntelujen suoritusnäyttöjä.
 */
type Skill = LosExercise["skill"];
function choice(chapterId:string,num:number,skill:Skill,prompt:string,options:string[],correct:string,explanation:string):LosExercise {
  if(!options.includes(correct))throw new Error(`Correct choice missing: ${chapterId}/${num}`);
  return {id:`C${chapterId}-EX-${String(num).padStart(2,"0")}`,chapterId,skill,kind:"choice",
    instruction:"Valitse oikea vaihtoehto.",prompt,options,correct,accepted:[correct],explanation};
}
function fill(chapterId:string,num:number,skill:Skill,prompt:string,correct:string,explanation:string,accepted:string[]=[correct]):LosExercise {
  return {id:`C${chapterId}-EX-${String(num).padStart(2,"0")}`,chapterId,skill,kind:"fill",
    instruction:"Täydennä yksi puuttuva sana tai ilmaus ilman vaihtoehtoja.",prompt,correct,accepted,explanation};
}
export const LOS_C03_C06_EXERCISES:ReadonlyArray<LosExercise>=[
  // C03 · woher / kommen / aus + lähtömaa · 15 automaattista
  choice("03",1,"alkuperä","Mitä Woher kommst du? tarkoittaa?",["Missä olet?","Mistä olet kotoisin?","Mikä nimesi on?"],"Mistä olet kotoisin?","Woher kysyy lähtöpaikkaa, ja kommst on kommen-verbin du-muoto."),
  choice("03",2,"alkuperä","Miten vastaat: Olen kotoisin Suomesta?",["Ich bin aus Deutsch.","Ich komme aus Finnland.","Du kommst Finnland."],"Ich komme aus Finnland.","Rakenne on Ich komme aus + maa, tässä Finnland."),
  choice("03",3,"sanasto","Mikä on Suomen saksankielinen nimi?",["Deutschland","Finnland","Schweden"],"Finnland","Finnland tarkoittaa Suomea."),
  choice("03",4,"sanasto","Mikä on Saksan saksankielinen nimi?",["Österreich","Estland","Deutschland"],"Deutschland","Deutschland tarkoittaa Saksaa."),
  choice("03",5,"sanasto","Mikä on Itävallan saksankielinen nimi?",["Österreich","Finnland","Schweden"],"Österreich","Österreich tarkoittaa Itävaltaa."),
  fill("03",6,"kielioppi","Ich ____ aus Finnland.","komme","Ich-persoonassa kommen-verbin muoto on komme."),
  fill("03",7,"kielioppi","Du ____ aus Deutschland.","kommst","Du-persoonassa kommen-verbin muoto on kommst."),
  choice("03",8,"alkuperä","Mikä kysymyssana kysyy 'mistä'?",["wo","wer","woher"],"woher","Woher? = mistä? Wo? = missä?"),
  choice("03",9,"kielioppi","Valitse oikein muodostettu kysymys.",["Woher du kommst?","Woher kommst du?","Woher kommen ich?"],"Woher kommst du?","Kysymyssana ensin, sitten kommst ja lopuksi du."),
  fill("03",10,"kielioppi","Ich komme ____ Finnland.","aus","Aus ilmaisee tässä lähtömaata."),
  choice("03",11,"alkuperä","Miten sanot 'Olen kotoisin Sveitsistä'?",["Ich komme aus Schweiz.","Ich komme aus die Schweiz.","Ich komme aus der Schweiz."],"Ich komme aus der Schweiz.","Sveitsin yhteydessä sanotaan aus der Schweiz. Sijamuotoa ei tarvitse vielä muodostaa itse."),
  choice("03",12,"alkuperä","Mikä ilmaus on oikein USA:n kohdalla?",["aus USA","aus den USA","aus der USA"],"aus den USA","USA:sta käytetään tunnistettavaa ilmausta aus den USA."),
  fill("03",13,"kielioppi","Woher ____ du?","kommst","Kysyessäsi toiselta käytät du kommst."),
  choice("03",14,"sanasto","Mikä ilmaus tarkoittaa kaupunkia?",["das Land","die Stadt","auch"],"die Stadt","Die Stadt = kaupunki. Das Land voi tarkoittaa maata."),
  choice("03",15,"kielioppi","Mikä sanajärjestys sopii väitelauseeseen?",["Aus Finnland ich komme.","Ich komme aus Finnland.","Komme ich aus Finnland."],"Ich komme aus Finnland.","Tavallisessa väitelauseessa subjekti ich on ensin ja taivutettu verbi komme toisena."),

  // C04 · du / Sie, kohteliaat verbimuodot · 12 automaattista
  choice("04",1,"puhuttelu","Kysyt tutulta samanikäiseltä ystävältä hänen nimeään.",["Wie heißen Sie?","Wie heißt du?","Woher kommen Sie?"],"Wie heißt du?","Ystävien kesken du-puhuttelu on tavallinen."),
  choice("04",2,"puhuttelu","Kysyt nimeä kohteliaasti ensimmäistä kertaa virallisessa asioinnissa.",["Wie heißt du?","Wie heißen Sie?","Du heißt wie?"],"Wie heißen Sie?","Kohtelias kysymys käyttää Sie ja heißen."),
  choice("04",3,"puhuttelu","Mikä on kohteliaan puhuttelupronominin oikea kirjoitusasu?",["sie","Sie","du"],"Sie","Kohtelias Te kirjoitetaan saksaksi isolla S-kirjaimella."),
  choice("04",4,"puhuttelu","Kuka kuuluu tässä esimerkissä du-puhutteluun?",["tuttu ystävä","tuntematon viranomainen virallisessa asioinnissa","kohteliaasti teititeltävä asiakas"],"tuttu ystävä","Du on tavallinen tuttujen ja ystävien kesken. Muissa tilanteissa tapa riippuu ympäristöstä."),
  fill("04",5,"kielioppi","Wie ____ Sie? (Mikä Teidän nimenne on?)","heißen","Sie-puhuttelun yhteydessä käytetään heißen-muotoa."),
  fill("04",6,"kielioppi","Woher ____ Sie? (Mistä olette kotoisin?)","kommen","Kohteliaassa kysymyksessä käytetään Sie kommen."),
  choice("04",7,"kielioppi","Kumpi kokonainen lause on oikein?",["Wie heiße Sie?","Wie heißen Sie?","Wie heißt Sie?"],"Wie heißen Sie?","Sie-puhuttelun verbimuoto on heißen."),
  choice("04",8,"kielioppi","Kumpi kokonainen kysymys on oikein?",["Woher kommst Sie?","Woher kommt Sie?","Woher kommen Sie?"],"Woher kommen Sie?","Sie käyttää muotoa kommen."),
  fill("04",9,"puhuttelu","Guten ____! (Hyvää päivää!)","Tag","Guten Tag! sopii myös kohteliaaseen tervehdykseen."),
  choice("04",10,"puhuttelu","Mitä Entschuldigung tarkoittaa?",["Anteeksi","Kiitos","Hyvää yötä"],"Anteeksi","Entschuldigung on anteeksipyyntö tai huomion herättävä ilmaus."),
  choice("04",11,"puhuttelu","Milloin valinta du tai Sie määräytyy?",["Aina vain henkilön iästä","Tilanteen ja keskinäisten käytäntöjen mukaan","Aina satunnaisesti"],"Tilanteen ja keskinäisten käytäntöjen mukaan","Puhuttelutapa riippuu suhteesta, ympäristöstä ja sovitusta käytännöstä."),
  choice("04",12,"kielioppi","Valitse kohteliaan esittäytymisen yhteydessä oikea kysymys.",["Wie heißt du?","Wie heißen Sie?","Wie heißen du?"],"Wie heißen Sie?","Kysymyksessä Sie on kohtelias teitittelymuoto ja verbi heißen."),

  // C05 · voinnin kiinteät fraasit + nicht / sehr · 12 automaattista
  choice("05",1,"kuulumiset","Mitä Wie geht's? tarkoittaa?",["Mitä kuuluu?","Mikä nimesi on?","Mistä tulet?"],"Mitä kuuluu?","Wie geht's? on arkinen kuulumiskysymys."),
  choice("05",2,"kuulumiset","Mikä on tavallinen myönteinen vastaus kuulumiskysymykseen?",["Mir geht's gut.","Ich komme aus Finnland.","Auf Wiedersehen."],"Mir geht's gut.","Mir geht's gut. tarkoittaa, että minulle kuuluu hyvää."),
  choice("05",3,"kuulumiset","Miten voit vastata, kun kaikki ei ole hyvin?",["Nicht so gut.","Guten Morgen.","Wie heißen Sie?"],"Nicht so gut.","Nicht so gut. tarkoittaa ei kovin hyvää."),
  choice("05",4,"kielioppi","Mikä sana tarkoittaa kielteistä 'ei'-ilmausta?",["sehr","nicht","toll"],"nicht","Nicht on tavallinen kieltoilmaus."),
  choice("05",5,"kielioppi","Mitä sehr gut tarkoittaa?",["Ei kovin hyvää","Erittäin hyvää","Hyvää yötä"],"Erittäin hyvää","Sehr vahvistaa adjektiivin gut merkitystä."),
  choice("05",6,"kuulumiset","Kysyt ystävältä takaisin 'Entä sinulle?'.",["Und dir?","Und Ihnen?","Woher?"],"Und dir?","Und dir? on tuttavallinen vastakysymys."),
  choice("05",7,"kuulumiset","Kysyt kohteliaasti 'Entä Teille?'.",["Und dir?","Und Ihnen?","Und ich?"],"Und Ihnen?","Und Ihnen? liittyy kohteliaaseen puhutteluun."),
  choice("05",8,"sanasto","Mitä müde tarkoittaa?",["väsynyt","iloinen","vanha"],"väsynyt","Müde tarkoittaa väsynyttä."),
  choice("05",9,"sanasto","Mitä schlecht tarkoittaa?",["hyvä","huono","kiitos"],"huono","Schlecht tarkoittaa huonoa."),
  fill("05",10,"kielioppi","Mir geht's ____ . (Minulle kuuluu hyvää.)","gut","Gut tarkoittaa hyvää."),
  fill("05",11,"kielioppi","____ so gut. (Ei kovin hyvää.)","Nicht","Nicht kieltää tai rajaa ilmaisua."),
  choice("05",12,"kuulumiset","Mikä on luonteva kysymys–vastauspari?",["Wie geht's? – Gut, danke.","Woher kommst du? – Nicht so gut.","Wie heißt du? – Sehr gut."],"Wie geht's? – Gut, danke.","Gut, danke. on luonteva vastaus kuulumiskysymykseen."),

  // C06 · 0–20 / 21–99 / ikä · 20 osatehtävää, ilman teeskenneltyä kuuntelua
  choice("06",1,"numerot","Mikä on saksaksi nolla?",["null","neun","neu"],"null","Null tarkoittaa nollaa."),
  choice("06",2,"numerot","Mikä on saksaksi yksi?",["ein","eins","zwei"],"eins","Itsenäinen luku yksi on eins; yhdyssanassa nähdään usein ein."),
  choice("06",3,"numerot","Mikä on saksaksi kaksi?",["drei","zehn","zwei"],"zwei","Zwei = kaksi."),
  choice("06",4,"numerot","Mikä on saksaksi kolme?",["fünf","drei","vier"],"drei","Drei = kolme."),
  choice("06",5,"numerot","Mikä on saksaksi kuusi?",["sechs","sieben","acht"],"sechs","Sechs = kuusi."),
  choice("06",6,"numerot","Mikä on saksaksi kahdeksan?",["neun","acht","sieben"],"acht","Acht = kahdeksan."),
  choice("06",7,"numerot","Mikä on saksaksi yksitoista?",["zwölf","elf","zehn"],"elf","Elf tarkoittaa lukua 11."),
  choice("06",8,"numerot","Mikä on saksaksi kaksitoista?",["zwölf","zweizehn","zweiundzehn"],"zwölf","Luku 12 on zwölf, ei säännöllisesti rakennettu yhdyssana."),
  choice("06",9,"numerot","Mikä on luvun 16 oikea kirjoitusasu?",["sechszehn","sechzehn","sechzig"],"sechzehn","Luvusta 16 jätetään s pois: sechzehn."),
  choice("06",10,"numerot","Mikä on luvun 17 oikea kirjoitusasu?",["siebenzehn","siebzehn","siebzig"],"siebzehn","Luvussa 17 sanasta sieben jää en pois: siebzehn."),
  fill("06",11,"numerot","13 kirjoitetaan saksaksi ____ .","dreizehn","Dreizehn = kolmetoista."),
  fill("06",12,"numerot","20 kirjoitetaan saksaksi ____ .","zwanzig","Zwanzig = kaksikymmentä."),
  choice("06",13,"numerot","Mikä on 21?",["einsundzwanzig","einundzwanzig","zwanzigeins"],"einundzwanzig","Yhteen kirjoitettu ein + und + zwanzig muodostaa luvun 21."),
  choice("06",14,"numerot","Mikä on 27?",["siebenundzwanzig","zwanzigsieben","siebzig"],"siebenundzwanzig","Ensin ykköset sieben, sitten und ja kymmenet zwanzig."),
  choice("06",15,"numerot","Mikä on 32?",["dreiundzwanzig","zweiunddreißig","dreißigzwei"],"zweiunddreißig","Kaksi ja kolmekymmentä: zweiunddreißig."),
  choice("06",16,"numerot","Mikä on 30?",["dreizig","dreißig","dreiß"],"dreißig","Poikkeava kirjoitusasu on dreißig."),
  choice("06",17,"numerot","Mikä on 40?",["vierzig","vierßig","vierzehn"],"vierzig","Vierzig on neljäkymmentä."),
  choice("06",18,"numerot","Mikä on 70?",["siebenzig","siebzig","siebzehn"],"siebzig","Sieben lyhenee muotoon sieb- luvussa siebzig."),
  choice("06",19,"numerot","Mikä on 90 saksaksi?",["neunzig","neunzehn","neunundzwanzig"],"neunzig","Neunzig tarkoittaa yhdeksääkymmentä."),
  choice("06",20,"numerot","Mikä on 100 saksaksi?",["zehnhundert","hundert","zehnzig"],"hundert","Hundert tarkoittaa sataa. Myös einhundert on oikea vaihtoehtoinen kirjoitusasu."),
];
