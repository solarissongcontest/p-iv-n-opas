import type { LosExercise } from "./exerciseBank";

/**
 * LOS! 1 C07–C10: alkuopetuksen itse laaditut, yksiselitteisesti arvioitavat
 * kieli-, fraasi-, tavaamis- ja aikaharjoitukset.
 *
 * Ei arvioi kuullun ymmärtämistä, ihmisen tekstin ymmärtämistä,
 * ääntämistä tai itsenäistä kirjoitelmaa. Ne toimitetaan erikseen.
 */
type Skill = LosExercise["skill"];

function choice(chapterId:string,n:number,skill:Skill,prompt:string,options:[string,string,string],correct:string,explanation:string,legacyAccepted:readonly string[]=[]):LosExercise{
  if(!options.includes(correct))throw new Error("LOS! tehtävän vastaus puuttuu vaihtoehdoista");
  return {
    id:"C"+chapterId+"-EX-"+String(n).padStart(2,"0"),chapterId,skill,
    kind:"choice",instruction:"Valitse oikea vaihtoehto.",prompt,options,
    correct,accepted:[correct,...legacyAccepted],explanation
  };
}
function fill(chapterId:string,n:number,skill:Skill,prompt:string,correct:string,explanation:string):LosExercise{
  return {
    id:"C"+chapterId+"-EX-"+String(n).padStart(2,"0"),chapterId,skill,
    kind:"fill",instruction:"Kirjoita puuttuva sana. Älä kopioi vastausta mallista.",
    prompt,correct,accepted:[correct],explanation
  };
}

export const LOS_C07_C10_EXERCISES:ReadonlyArray<LosExercise>=[
  // C07, 15 tehtävää. Oikeaa äänentunnistusta ei teeskennellä.
  choice("07",1,"tavaaminen","Mitä Wie schreibt man das? tarkoittaa?",["Mitä kuuluu?","Miten se kirjoitetaan?","Mistä olet?"] ,"Miten se kirjoitetaan?","Wie schreibt man das? kysyy sanan tai nimen kirjoitusasua."),
  choice("07",2,"tavaaminen","Mitä buchstabieren tarkoittaa?",["tavata kirjaimittain","kertoa ikä","tulla jostakin"],"tavata kirjaimittain","Buchstabieren tarkoittaa nimen tai sanan tavaamista."),
  choice("07",3,"sanasto","Mikä on der Buchstabe?",["kirjain","kirja","puhelin"],"kirjain","Der Buchstabe tarkoittaa yksittäistä kirjainta."),
  choice("07",4,"sanasto","Mikä on die Telefonnummer?",["osoite","puhelinnumero","sukunimi"],"puhelinnumero","Die Telefonnummer tarkoittaa puhelinnumeroa."),
  choice("07",5,"tavaaminen","Miten kirjoitat nimen Mia kirjaimittain?",["M – E – A","M – I – A","M – I – E"],"M – I – A","Nimen Mia kolme kirjoitettua kirjainta ovat M, I ja A."),
  choice("07",6,"tavaaminen","Miten kirjoitat nimen Lena kirjaimittain?",["L – E – N – A","L – I – N – A","L – E – M – A"],"L – E – N – A","Lena muodostuu kirjaimista L, E, N ja A."),
  choice("07",7,"tavaaminen","Miten kirjoitat nimen Uwe kirjaimittain?",["U – V – E","U – W – E","U – W – I"],"U – W – E","Uwe kirjoitetaan U, W ja E. Saksan W ääntyy usein suomen v:n tavoin."),
  choice("07",8,"tavaaminen","Miten kirjoitat nimen Leo kirjaimittain?",["L – E – O","L – I – O","L – E – U"],"L – E – O","Nimi Leo koostuu kirjaimista L, E ja O."),
  choice("07",9,"tavaaminen","Mikä on sanan heißt oikea saksankielinen kirjoitusasu?",["heisst","heißt","heißst"],"heißt","Tässä muodossa käytetään ß-kirjainta: du heißt."),
  choice("07",10,"tavaaminen","Mikä on sanan München tavallinen oikeinkirjoitus?",["Munchen","München","Münshen"],"München","Kaupungin nimi kirjoitetaan München, jossa on ü."),
  choice("07",11,"sanasto","Mitä die E-Mail-Adresse tarkoittaa?",["sähköpostiosoite","osoitteen numero","puhelin"],"sähköpostiosoite","Die E-Mail-Adresse tarkoittaa sähköpostiosoitetta."),
  choice("07",12,"selviytyminen","Mitä Noch einmal, bitte. tarkoittaa?",["Puhukaa kovempaa.","Vielä kerran, kiitos.","Kiitos, näkemiin."],"Vielä kerran, kiitos.","Noch einmal, bitte. pyytää toistamaan."),
  choice("07",13,"sanasto","Mitä richtig tarkoittaa tässä yhteydessä?",["hitaasti","oikein","yhdessä"],"oikein","Richtig tarkoittaa oikeaa tai oikein."),
  fill("07",14,"tavaaminen","Bitte ____ Sie. (Voisitteko tavata nimen, kiitos?)","buchstabieren","Kohteliaassa tavaamispyynnössä käytetään muotoa buchstabieren."),
  fill("07",15,"selviytyminen","Noch ____, bitte. (Vielä kerran, kiitos.)","einmal","Noch einmal, bitte. on käyttövalmis toistopyyntö."),

  // C08, 12 tehtävää. Kokonaiset fraasit ovat tavoitteena, eivät modaaliverbitaulukot.
  choice("08",1,"selviytyminen","Mitä Ich verstehe nicht. tarkoittaa?",["En ymmärrä.","En puhu englantia.","Minä olen opiskelija."],"En ymmärrä.","Ich verstehe nicht. ilmaisee, ettei ymmärrä."),
  choice("08",2,"selviytyminen","Mikä ilmaus pyytää toistamaan kohteliaasti?",["Wie alt bist du?","Können Sie das bitte wiederholen?","Ich komme aus Finnland."],"Können Sie das bitte wiederholen?","Opettele Können Sie das bitte wiederholen? kokonaisena fraasina."),
  choice("08",3,"selviytyminen","Mikä ilmaus pyytää puhumaan hitaammin?",["Bitte langsamer.","Sehr gut.","Guten Morgen."],"Bitte langsamer.","Bitte langsamer. pyytää hidastamaan."),
  choice("08",4,"selviytyminen","Mitä Was bedeutet das? tarkoittaa?",["Miten se kirjoitetaan?","Mitä se tarkoittaa?","Mistä tulet?"],"Mitä se tarkoittaa?","Was bedeutet das? kysyy merkitystä."),
  choice("08",5,"selviytyminen","Mikä ilmaus kysyy, miten jokin sanotaan saksaksi?",["Wie sagt man das auf Deutsch?","Woher kommst du?","Wie alt bist du?"],"Wie sagt man das auf Deutsch?","Wie sagt man das auf Deutsch? kysyy saksankielistä sanontaa."),
  choice("08",6,"sanasto","Mitä das Wort tarkoittaa?",["sana","lause","tehtävä"],"sana","Das Wort on yksittäinen sana."),
  choice("08",7,"sanasto","Mitä der Satz tarkoittaa?",["osoite","lause","kirjain"],"lause","Der Satz tarkoittaa lausetta."),
  choice("08",8,"sanasto","Mitä die Frage tarkoittaa?",["vastaus","kysymys","koulu"],"kysymys","Die Frage tarkoittaa kysymystä."),
  choice("08",9,"sanasto","Mitä die Antwort tarkoittaa?",["vastaus","aakkoset","kirjain"],"vastaus","Die Antwort tarkoittaa vastausta."),
  choice("08",10,"sanasto","Mitä die Aufgabe tarkoittaa?",["puhelinnumero","kotimaa","tehtävä"],"tehtävä","Die Aufgabe tarkoittaa tehtävää."),
  fill("08",11,"selviytyminen","Ich ____ nicht. (En ymmärrä.)","verstehe","Ich verstehe nicht. on alkeiden selviytymisfraasi."),
  fill("08",12,"selviytyminen","Bitte ____. (Hitaammin, olkaa hyvä.)","langsamer","Bitte langsamer. on lyhyt ja käyttökelpoinen pyyntö."),

  // C09, 14 tehtävää. Tasatunnit ja viikonpäivät, ei puhekielen Viertel-kellonaikoja.
  choice("09",1,"ajanilmaukset","Mikä viikonpäivä on Montag?",["maanantai","tiistai","sunnuntai"],"maanantai","Montag tarkoittaa maanantaita."),
  choice("09",2,"ajanilmaukset","Mikä viikonpäivä on Dienstag?",["torstai","tiistai","keskiviikko"],"tiistai","Dienstag tarkoittaa tiistaita."),
  choice("09",3,"ajanilmaukset","Mikä viikonpäivä on Mittwoch?",["maanantai","keskiviikko","perjantai"],"keskiviikko","Mittwoch tarkoittaa keskiviikkoa."),
  choice("09",4,"ajanilmaukset","Mikä viikonpäivä on Donnerstag?",["lauantai","torstai","tiistai"],"torstai","Donnerstag tarkoittaa torstaita."),
  choice("09",5,"ajanilmaukset","Mikä viikonpäivä on Freitag?",["perjantai","lauantai","sunnuntai"],"perjantai","Freitag tarkoittaa perjantaita."),
  choice("09",6,"ajanilmaukset","Mikä viikonpäivä on Samstag?",["lauantai","sunnuntai","tiistai"],"lauantai","Samstag tarkoittaa lauantaita."),
  choice("09",7,"ajanilmaukset","Mikä viikonpäivä on Sonntag?",["maanantai","perjantai","sunnuntai"],"sunnuntai","Sonntag tarkoittaa sunnuntaita."),
  choice("09",8,"ajanilmaukset","Mitä am Montag tarkoittaa?",["maanantaina","maanantaisin aamulla","ennen maanantaita"],"maanantaina","Am Montag tarkoittaa tässä maanantaina."),
  choice("09",9,"ajanilmaukset","Mitä um drei Uhr tarkoittaa?",["kolmen tunnin ajan","kello kolmelta","kolmantena päivänä"],"kello kolmelta","Um drei Uhr tarkoittaa kello kolmelta. Ilmaus ei yksin kerro, onko kyse klo 03.00 vai 15.00.",["kello kolme"]),
  choice("09",10,"ajanilmaukset","Mitä Wann? kysyy?",["Miksi?","Milloin?","Kenen kanssa?"],"Milloin?","Wann? tarkoittaa milloin?"),
  choice("09",11,"ajanilmaukset","Mikä on morgen pienellä alkukirjaimella?",["aamu (substantiivi)","huomenna","eilen"],"huomenna","Morgen isolla on aamu, morgen pienellä tarkoittaa huomenna."),
  choice("09",12,"ajanilmaukset","Mitä heute tarkoittaa?",["eilen","tänään","huomenna"],"tänään","Heute tarkoittaa tänään."),
  fill("09",13,"ajanilmaukset","____ Freitag. (Perjantaina.)","am","Viikonpäivän yhteydessä käytetään am, kuten am Freitag."),
  fill("09",14,"ajanilmaukset","____ vier Uhr. (Kello neljä.)","um","Kellonajan edellä käytetään um, kuten um vier Uhr."),

  // C10, 20 tehtävää. Kirjan tavoitteiden kertaus, ei loppukokeen korvike.
  choice("10",1,"kertaus","Miten tervehdit tuttua ystävää?",["Hallo!","Auf Wiedersehen!","Gute Nacht!"],"Hallo!","Hallo! on tavallinen tuttavallinen tervehdys."),
  choice("10",2,"kertaus","Miten tervehdit kohteliaasti päivällä?",["Guten Tag!","Tschüss!","Bis morgen!"],"Guten Tag!","Guten Tag! sopii kohteliaaseen päivätervehdykseen."),
  fill("10",3,"kertaus","Ich ____ Mia. (Minun nimeni on Mia.)","heiße","Ich heiße on nimen kertomisen perusmuoto."),
  choice("10",4,"kertaus","Millä kysyt tutun henkilön nimeä?",["Wie heißen Sie?","Wie heißt du?","Wie alt bist du?"],"Wie heißt du?","Tuttavallisessa tilanteessa kysytään Wie heißt du?"),
  fill("10",5,"kertaus","Du ____ Max. (Sinä olet Max.)","bist","Du bist on sein-verbin oikea du-muoto."),
  fill("10",6,"kertaus","Er ____ siebzehn Jahre alt. (Hän on 17-vuotias.)","ist","Er ist on sein-verbin hän-muoto."),
  choice("10",7,"kertaus","Miten sanot 'Hän (nainen) on Greta'?",["Sie bist Greta.","Sie ist Greta.","Sie bin Greta."],"Sie ist Greta.","Sie ist tarkoittaa hän on (naisesta), kun lauseen aloittava Sie viittaa tässä yhteen henkilöön."),
  fill("10",8,"kertaus","Er ____ Jonas. (Hänen nimensä on Jonas.)","heißt","Er heißt on heißen-verbin kolmas persoona."),
  fill("10",9,"kertaus","Sie ____ Lena. (Hänen nimensä on Lena.)","heißt","Sie heißt on kolmannen persoonan nimi-ilmaus."),
  fill("10",10,"kertaus","Er ____ aus Deutschland.","kommt","Er kommt on kommen-verbin hän-muoto."),
  fill("10",11,"kertaus","Sie ____ aus Finnland.","kommt","Sie kommt on kommen-verbin hän-muoto tässä lauseessa."),
  choice("10",12,"kertaus","Mikä kysymys sopii kohteliaaseen alkuperän kysymiseen?",["Woher kommst du?","Woher kommen Sie?","Woher komme ich?"],"Woher kommen Sie?","Kohteliaan Sie-puhuttelun verbimuoto on kommen."),
  choice("10",13,"kertaus","Miten kysyt nimeä kohteliaasti?",["Wie heißen Sie?","Wie heißt du?","Wie heiße ich?"],"Wie heißen Sie?","Kohteliaan Sie-puhuttelun kanssa käytetään heißen-muotoa."),
  choice("10",14,"kertaus","Mitä Woher kommst du? tarkoittaa?",["Mistä olet kotoisin?","Kuinka vanha olet?","Miten se kirjoitetaan?"],"Mistä olet kotoisin?","Woher? on mistä, kommst du? = tuletko sinä."),
  choice("10",15,"kertaus","Mikä lause vastaa 'Olen Suomesta'?",["Ich komme Finnland.","Ich komme aus Finnland.","Ich bin aus Deutschland."],"Ich komme aus Finnland.","Kotoisin olemiseen käytetään ich komme aus Finnland."),
  choice("10",16,"kertaus","Miten kysyt tuttavan ikää?",["Wie alt bist du?","Wie heißt du?","Wie geht's?"],"Wie alt bist du?","Wie alt bist du? kysyy, kuinka vanha henkilö on."),
  choice("10",17,"kertaus","Mikä sopii vastaukseksi, kun sinulle ei kuulu kovin hyvää?",["Gut, danke.","Nicht so gut.","Schön, dich kennenzulernen!"],"Nicht so gut.","Nicht so gut. on yksinkertainen vointivastaus."),
  choice("10",18,"kertaus","Miten pyydät puhumaan hitaammin?",["Bitte langsamer.","Bitte buchstabieren Sie.","Bis morgen!"],"Bitte langsamer.","Bitte langsamer. auttaa, kun puhe on liian nopeaa."),
  choice("10",19,"kertaus","Mikä ilmaus tarkoittaa 'Maanantaina kello kolmelta'?",["Um Montag am drei Uhr.","Am Montag um drei Uhr.","Heute am drei Montag."],"Am Montag um drei Uhr.","Päivän edellä on am ja tasatunnin edellä um."),
  choice("10",20,"kertaus","Miten hyvästelet kohteliaasti?",["Guten Morgen!","Wie geht's?","Auf Wiedersehen!"],"Auf Wiedersehen!","Auf Wiedersehen! sopii kohteliaaseen hyvästelyyn.")
];
