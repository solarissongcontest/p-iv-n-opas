import {LOS1_C01_LINES,LOS1_C01_GLOSS} from "./los1C01.ts";
import {LOS1_M_COM_02_LINES,LOS1_M_COM_02_GLOSS} from "./los1MCom02.ts";
import {LOS1_C02_LINES,LOS1_C02_GLOSS} from "./los1C02.ts";

export type LosTextBChapter="01"|"04"|"05"|"06"|"07"|"08"|"09"|"10";
type Question={id:string;prompt:string;options:readonly {id:"a"|"b"|"c";text:string}[];correctId:"a"|"b"|"c";explanation:string};
const question=(ch:LosTextBChapter,n:number,prompt:string,choices:[string,string,string],correctId:"a"|"b"|"c",explanation:string):Question=>({
 id:"C"+ch+"-TEXTB-Q"+String(n).padStart(2,"0"),prompt,
 options:choices.map((text,i)=>({id:(["a","b","c"] as const)[i]!,text})),correctId,explanation,
});
/**
 * Text B must be an ENTIRE verified human-made audio/text resource and NOT
 * another AI-made faux-authentic dialogue. Original transcripts are from the
 * publishers. Alphabet learner aid is explicitly NOT a verbatim transcript.
 *
 * These older resources are deliberately reused in a new learning context,
 * which is disclosed to the student; reuse is not a new distinct source.
 * None has undergone iOS/desktop playback QA.
 */
const greetingTranscript=[
 "Hallo!","Servus!","Moin!","Moin Moin!","Guten Morgen!","Morgen!",
 "Guten Tag!","Tag!","Guten Abend!","Grüß Gott!","Auf Wiedersehen!",
 "Wiedersehen!","Tschüss!","Tschau!","Servus!","Bis später!",
 "Bis dann!","Bis bald!","Bis gleich!","Gute Nacht!",
] as const;
const greetingsMeaning=[
 "Hei!","Hei! (alueellinen)","Hei! (Pohjois-Saksa)","Hei hei! (Pohjois-Saksa)",
 "Hyvää huomenta!","Huomenta!","Hyvää päivää!","Päivää!","Hyvää iltaa!",
 "Hyvää päivää! (erityisesti Etelä-Saksa ja Itävalta)","Näkemiin!",
 "Näkemiin! (lyhentynyt)","Moikka!","Moikka!","Hei! (alueellinen)",
 "Nähdään myöhemmin!","Nähdään sitten!","Nähdään pian!","Nähdään kohta!","Hyvää yötä!",
] as const;
const c04Lines=greetingTranscript.map((text,i)=>({
 id:"u"+String(i+1).padStart(2,"0"),speaker:"Puhuja",text,meaning:greetingsMeaning[i]!,
}));
export const LOS1_TEXT_B_SOURCES={
 "01":{
  sourceId:"M-COM-03",title:"Koko tervehdys- ja hyvästelyäänite",
  summary:"Koko 28 sekunnin German Men92:n public domain -tervehdys- ja hyvästelylista sekä kaikki 20 ihmisen lausumaa ilmausta kirjoitettuna suoraan oppikirjassa. Tämä sama aineisto esiintyy C04:ssä eri oppimistavoitteella. Luettelo ei ole keskustelu eikä yksittäisten sanojen tunnistamista arvioida kuullun ymmärtämisen pisteinä.",
  transcriptIsExact:true,lines:c04Lines,
  glossary:{hallo:"hei",servus:"hei (alueellinen)",moin:"hei (Pohjois-Saksa)",
   guten:"hyvää",morgen:"aamu",tag:"päivä",abend:"ilta",grüß:"tervehdyksen osa",
   gott:"Jumala, tässä vakiintunut tervehdys",auf:"osa fraasia Auf Wiedersehen",
   wiedersehen:"näkemiin",tschüss:"moikka",tschau:"moikka",bis:"asti",
   später:"myöhemmin",dann:"sitten",bald:"pian",gleich:"kohta",gute:"hyvää",nacht:"yö"},
  attribution:{author:"German Men92",title:"German Vocabulary - Greetings.ogg",
   url:"https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Greetings.ogg",
   license:"Public domain",licenseUrl:"https://creativecommons.org/publicdomain/mark/1.0/"},
  questions:[
   question("01",1,"Mikä listan ilmaus tarkoittaa hyvää huomenta?",
    ["Guten Abend!","Guten Morgen!","Gute Nacht!"],"b","Guten Morgen! on aamun tervehdys."),
   question("01",2,"Mikä vaihtoehto on luettelon arkinen hyvästely?",
    ["Tschüss!","Guten Tag!","Moin!"],"a","Tschüss! tarkoittaa arkisesti moikka."),
   question("01",3,"Mikä ilmaus tarkoittaa nähdään myöhemmin?",
    ["Guten Abend!","Auf Wiedersehen!","Bis später!"],"c","Bis später! ilmaisee myöhempää tapaamista."),
   question("01",4,"Mitä luettelon ilmaus Gute Nacht! tarkoittaa?",
    ["Hyvää päivää!","Hyvää yötä!","Hyvää huomenta!"],"b","Gute Nacht! on yöhön liittyvä toivotus, ei päiväsaikainen tervehdys."),
  ],
 },
 "04":{
  sourceId:"M-COM-03",title:"Tervehdysten rekisterit eri tilanteissa",
  summary:"Koko 28 sekunnin autenttinen tervehdys- ja hyvästelylista. Sama lähde oli myös C01:n Text B:ssä, mutta tässä verrataan tuttavallista ja kohteliasta rekisteriä. Tämä ei ole kahden henkilön dialogi.",
  transcriptIsExact:true,lines:c04Lines,
  glossary:{
   hallo:"hei",servus:"hei/moikka (alueellinen)",moin:"hei (Pohjois-Saksa)",
   guten:"hyvää; esimerkiksi Guten Tag",morgen:"huomenta / aamu",tag:"päivä",
   abend:"ilta",grüß:"tervehdysmuoto",gott:"Jumala; tässä osa vakiintunutta tervehdystä",
   auf:"Auf Wiedersehen -ilmauksen osa",wiedersehen:"näkemiin",
   tschüss:"moikka",tschau:"moikka",bis:"asti; Bis später! = nähdään myöhemmin",
   später:"myöhemmin",dann:"sitten",bald:"pian",gleich:"kohta",gute:"hyvää",
   nacht:"yö",
  },
  attribution:{author:"German Men92",title:"German Vocabulary - Greetings.ogg",url:"https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Greetings.ogg",license:"Public domain",licenseUrl:"https://creativecommons.org/publicdomain/mark/1.0/"},
  questions:[
   question("04",1,"Mikä luettelon ilmaus sopii kohteliaaseen päiväsaikaiseen tervehdykseen?",["Guten Tag!","Tschüss!","Gute Nacht!"],"a","Guten Tag! on päivätervehdys. Tschüss! on hyvästely."),
   question("04",2,"Mikä luettelon ilmaus on selkeä kohtelias hyvästely?",["Moin Moin!","Auf Wiedersehen!","Guten Morgen!"],"b","Auf Wiedersehen! on tavallinen kohtelias hyvästely."),
   question("04",3,"Mikä on luettelon arkipäiväinen hyvästely?",["Guten Abend!","Grüß Gott!","Tschüss!"],"c","Tschüss! on tuttavallinen moikka."),
   question("04",4,"Mikä ilmauksista tarkoittaa nähdään pian?",["Bis bald!","Bis gleich!","Bis später!"],"a","Bis bald! = nähdään pian. Bis gleich on nähdään kohta."),
  ],
 },
 "05":{
  sourceId:"M-COM-08",title:"Franz ja Greta: Wie geht's?",
  summary:"Koko 20 sekunnin alkuperäinen kahden ihmisen puhuma Franzin ja Gretan keskustelu (Human Robot, public domain) ja erikseen lähteistetty koko kuuden repliikin Wikibooks-teksti. Sama julkaistu tekstikohtaus on tuttu C02:sta, mutta nyt opetellaan nimen sijaan Wie geht's? ja Es geht mir gut. Äänitteen ja painetun tekstin sanatarkkaa vastaavuutta ei ole auditoitu, joten tarkistettavat tehtävät perustuvat näkyvään koko tekstiin, eivät automaattiseen kuuntelupisteytykseen.",
  transcriptIsExact:true,lines:LOS1_C02_LINES,glossary:LOS1_C02_GLOSS,
  textAttribution:{author:"Wikibooks German/Level I -kirjoittajat",title:"Wie heißt du? (1. Teil), kokonainen 6-repliikkinen tekstikohtaus",
   url:"https://en.wikibooks.org/w/index.php?title=German/Level_I/Wie_heißt_du&oldid=4430449",
   license:"CC BY-SA 4.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/4.0/"},
  attribution:{author:"Human Robot (English Wikibooks, 2006)",title:"Dialogue franz greta 1.ogg",
   url:"https://commons.wikimedia.org/wiki/File:Dialogue_franz_greta_1.ogg",
   license:"Public domain",licenseUrl:"https://creativecommons.org/publicdomain/mark/1.0/"},
  questions:[
   question("05",1,"Miten Greta kysyy Franzin vointia koko dialogissa?",["Wie geht's?","Wie alt bist du?","Woher kommst du?"],"a","Greta kysyy Wie geht's? eli mitä kuuluu."),
   question("05",2,"Miten Franz vastaa kysymykseen Wie geht's?",["Ich bin Franz.","Es geht mir gut.","Ich komme aus Berlin."],"b","Es geht mir gut. tarkoittaa minulle kuuluu hyvää."),
   question("05",3,"Minkä henkilön Greta kertoo tuntevansa?",["Peterin","Thomasin","Opettajan, herra Weißin"],"c","Greta sanoo Ja, er heißt Herr Weiß. Tätä edeltää kysymys tunnetko opettajan."),
   question("05",4,"Miten Greta hyvästelee Franzin?",["Wiedersehen!","Bis morgen!","Gute Nacht!"],"a","Tekstin viimeinen repliikki on Gretan Wiedersehen!."),
  ],
 },
 "06":{
  sourceId:"M-COM-01",title:"Franz ja Jörg: ikäkeskustelun kertaus",
  summary:"Koko alkuperäinen kahdeksan repliikin keskustelu, joka nähtiin jo C01:ssä. Tässä sitä harjoitellaan eri tarkoituksessa: etsitään ikää ja numeroita. Äänitteessä ei ole kahta saksaa äidinkielenään puhuvaa henkilöä.",
  transcriptIsExact:true,lines:LOS1_C01_LINES,glossary:LOS1_C01_GLOSS,
  attribution:{author:"Xzapro4 ja Erkan Yilmaz (2008)",title:"GesprächVorstellung.ogg",url:"https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg",license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/"},
  questions:[
   question("06",1,"Kumpi kysyy: Wie alt bist du?",["Franz","Jörg","Peter"],"b","Jörg kysyy toisen ikää neljännessä repliikissä."),
   question("06",2,"Minkä ikäinen Franz on?",["19-vuotias","20-vuotias","17-vuotias"],"a","Franz sanoo neunzehn Jahre alt."),
   question("06",3,"Minkä ikäinen Jörg on?",["19-vuotias","17-vuotias","20-vuotias"],"c","Jörg vastaa Ich bin zwanzig."),
   question("06",4,"Mitä Jörg sanoo viimeiseksi?",["Tschüss!","Guten Morgen!","Gute Nacht!"],"a","Jörgin viimeinen repliikki on Tschüss!"),
  ],
 },
 "07":{
  sourceId:"M-COM-06",title:"Saksan aakkosten alkuperäinen äänite",
  summary:"Noin minuutin kokonainen ihmisen äänittämä aakkostallenne. Alla oleva kirjainrivi on LOS!:n oma harjoittelutuki, ei sanatarkaksi vahvistettu äänitteen litteraatti. Toista kirjaimet itse ääneen. Äänentoisto ja tarkka lausuntajärjestys odottavat vielä laitetarkistusta.",
  transcriptIsExact:false,lines:[] as const,glossary:{} as Readonly<Record<string,string>>,
  attribution:{author:"endymi0n (äänite); German Men92 (Wikibooks-julkaisu)",title:"German Grammar - The Alphabet.ogg",url:"https://commons.wikimedia.org/wiki/File:German_Grammar_-_The_Alphabet.ogg",license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/"},
  questions:[
   question("07",1,"Mikä kirjoitusasu kuuluu saksan aakkosiin myös erikoiskirjaimena?",["Å","ß","Ø"],"b","Saksan erikoismerkkejä ovat ä, ö, ü ja ß."),
   question("07",2,"Mikä vastaa peruskirjainta Ä, kun kaksi pistettä puuttuu näppäimistöltä?",["Ae","Ou","Ss"],"a","Ä voidaan tarvittaessa kirjoittaa Ae, erityisesti teknisissä merkintätilanteissa."),
   question("07",3,"Mikä on kirjaimen ß tavallinen varakirjoitus?",["zz","bb","ss"],"c","ß-kirjainta vastaa usein ss, mutta oikeinkirjoituksen säännöt ratkaisevat käytön."),
   question("07",4,"Mitä tarkoittaa Bitte buchstabieren Sie?",["Vielä kerran, kiitos","Olkaa hyvä ja tavatkaa","Mikä ikänne on?"],"b","Bitte buchstabieren Sie pyytää kohteliaasti tavaamaan."),
  ],
 },
 "08":{
  sourceId:"M-DIB-03",title:"Eva: Studium und Wohnen",
  summary:"COERLL:n University of Texas at Austinin kokonainen ihmisen haastattelu: Eva kertoo opinnoistaan ja siitä, miksi asuu edelleen vanhempiensa luona. Teksti ja suomennokset ovat kirjan sisällä. Alkuperäistä videota tai puheääntä EI ole tässä upotettu eikä kuullunymmärtämistä ole todistettu; opettele vain tutut kysymykset ja kouluun liittyvät sanat, ei monimutkaista puhekieltä.",
  transcriptIsExact:true,
  lines:[
   {id:"u01",speaker:"Haastattelija",text:"Was studierst du?",meaning:"Mitä opiskelet?"},
   {id:"u02",speaker:"Eva",text:"Ich studiere Englisch und Erdkunde, auf Lehramt fürs Gymnasium.",meaning:"Opiskelen englantia ja maantietoa lukionopettajaksi."},
   {id:"u03",speaker:"Haastattelija",text:"Kannst du erklären, was Erdkunde ist?",meaning:"Voitko selittää, mitä maantieto on?"},
   {id:"u04",speaker:"Eva",text:"Erdkunde ist Geographie, Länderkunde, man lernt über andere Länder, über die Entstehung der Erde, lauter solche Sachen, Kulturwissenschaften.",meaning:"Maantieto on maantiedettä ja maiden tutkimista. Siinä opitaan muista maista, maapallon synnystä ja kulttuureista."},
   {id:"u05",speaker:"Haastattelija",text:"Und wo wohnst du?",meaning:"Entä missä asut?"},
   {id:"u06",speaker:"Eva",text:"Ich wohne noch zu Hause bei meinen Eltern, in Zell am Main, einem Vorort von Würzburg.",meaning:"Asun yhä kotona vanhempieni luona Zell am Mainissa, Würzburgin esikaupungissa."},
   {id:"u07",speaker:"Haastattelija",text:"Warum wohnst du da?",meaning:"Miksi asut siellä?"},
   {id:"u08",speaker:"Eva",text:"Kein Geld, um eine eigene Wohnung hier zu zahlen. Und ich bin im Sportverein zu Hause sehr aktiv. Und im Gemeindewesen. Und möchte da auch momentan noch gar nicht weg.",meaning:"Minulla ei ole rahaa maksaa omaa asuntoa täällä. Olen myös hyvin aktiivinen kotiseutuni urheiluseurassa ja paikallisyhteisössä. En tällä hetkellä edes halua muuttaa pois."},
  ],
  glossary:{
   was:"mitä",studierst:"opiskelet",du:"sinä",ich:"minä",studiere:"opiskelen",
   englisch:"englanti",und:"ja",erdkunde:"maantieto",auf:"tässä opintosuunnan yhteydessä",
   lehramt:"opettajan koulutus",fürs:"für das, varten",gymnasium:"saksalainen oppikoulutyyppi, suomalaisessa vertailussa lukio",
   kannst:"voitko",erklären:"selittää",ist:"on",geographie:"maantiede",
   länderkunde:"maantuntemus",man:"ihmiset yleisesti",lernt:"opitaan",
   über:"-sta/-stä, jostakin",andere:"muut",länder:"maat",entstehung:"synty",
   erde:"maapallo",lauter:"kaikenlaiset",sachen:"asiat",kulturwissenschaften:"kulttuuritieteet",
   wo:"missä",wohnst:"asut",wohne:"asun",noch:"vielä",zu:"luona; zu Hause = kotona",
   hause:"koti; zu Hause = kotona",bei:"luona",meinen:"minun, monikollinen muoto",
   eltern:"vanhemmat",zell:"paikannimi",main:"joen nimi",einem:"eräs, tässä taivutettu muoto",
   vorort:"esikaupunki",von:"-n, jostakin",würzburg:"kaupunki Saksassa",
   warum:"miksi",da:"siellä",kein:"ei yhtään",geld:"raha",eine:"eräs, tässä oma",
   eigene:"oma",wohnung:"asunto",hier:"täällä",zahlen:"maksaa",
   bin:"olen",sportverein:"urheiluseura",sehr:"erittäin",aktiv:"aktiivinen",
   gemeindewesen:"paikallisyhteisö",möchte:"haluaisin",auch:"myös",
   momentan:"tällä hetkellä",gar:"lainkaan",nicht:"ei",weg:"pois",
  },
  attribution:{author:"COERLL / University of Texas at Austin (2017), Eva Kunkel",
   title:"Deutsch im Blick · Eva: Studium & Wohnen",
   url:"https://coerll.utexas.edu/dib/vidt.php?f=01_19_int_ek_studies-home",
   license:"CC BY 4.0",licenseUrl:"https://creativecommons.org/licenses/by/4.0/"},
  questions:[
   question("08",1,"Mitä kahta oppiainetta Eva sanoo opiskelevansa?",
    ["Matematiikkaa ja historiaa","Englantia ja maantietoa","Saksaa ja kemiaa"],"b","Eva sanoo Ich studiere Englisch und Erdkunde."),
   question("08",2,"Mihin ammattiin Eva opiskelee?",
    ["Lääkäriksi","Lakimieheksi","Koulun opettajaksi"],"c","Auf Lehramt fürs Gymnasium tarkoittaa opettajaksi opiskelua."),
   question("08",3,"Missä Eva kertoo asuvansa?",
    ["Vanhempiensa luona Zell am Mainissa","Yksin Berliinissä","Koulun asuntolassa Hampurissa"],"a","Hän sanoo zu Hause bei meinen Eltern ja kertoo asuvansa Zell am Mainissa."),
   question("08",4,"Miksi Eva kertoo pysyvänsä nykyisessä asuinpaikassaan?",
    ["Hän ei tunne siellä ketään","Oma asunto maksaisi liikaa ja hän viihtyy seuratoiminnassa","Hän ei osaa matkustaa junalla"],"b","Hänellä ei ole varaa omaan asuntoon, ja hän on aktiivinen urheiluseurassa ja yhteisössä."),
  ],
 },
 "09":{
  sourceId:"M-COM-07",title:"Die Wochentage · seitsemän viikonpäivää",
  summary:"Christophin itse äänittämä, noin 15 sekunnin kokonainen luettelo saksan viikonpäivistä. Tämä on aito luettu sanalista, ei tekaistu tapahtumakertomus tai dialogi. Teksti kuuluu samaan äänilähteeseen. Kirjan C09:n oma ensisijainen Text A on edelleen erillinen Sport und Zeit.",
  transcriptIsExact:true,
  lines:[{id:"u01",speaker:"Puhuja",text:"Tage: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.",
   meaning:"Päivät: maanantai, tiistai, keskiviikko, torstai, perjantai, lauantai, sunnuntai."}],
  glossary:{tage:"päivät",montag:"maanantai",dienstag:"tiistai",mittwoch:"keskiviikko",
   donnerstag:"torstai",freitag:"perjantai",samstag:"lauantai",sonntag:"sunnuntai"},
  attribution:{author:"Christoph (English Wikibooks, 2007)",title:"German Vocabulary - Days.ogg",
   url:"https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Days.ogg",
   license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/"},
  questions:[
   question("09",1,"Mikä viikonpäivä mainitaan luettelossa tiistain jälkeen?",
    ["Mittwoch","Montag","Freitag"],"a","Tage-luettelossa Dienstag seuraa Montagia ja Mittwoch tulee Dienstag-päivän jälkeen."),
   question("09",2,"Mikä vastaa torstaita?",
    ["Sonntag","Donnerstag","Dienstag"],"b","Donnerstag tarkoittaa torstaita."),
   question("09",3,"Mikä päivän nimi kuuluu ennen sunnuntaita?",
    ["Montag","Mittwoch","Samstag"],"c","Luettelon lopussa on Samstag, Sonntag."),
   question("09",4,"Mikä on saksaksi perjantai?",
    ["Freitag","Dienstag","Sonntag"],"a","Freitag on perjantai; tämä on neljäs arkipäivä maanantain jälkeen."),
  ],
 },
 "10":{
  sourceId:"M-COM-02",title:"Thomas ja Takashi: kolmannen henkilön esittely",
  summary:"Koko neljän repliikin autenttinen esittelydialogi; sitä käytettiin myös C02:ssa ja C03:ssa. Nyt etsi erityisesti Das ist Peter ja wir kommen aus -ilmaisu. Äänitteen toisto on vielä testaamatta iPhonella ja tietokoneella.",
  transcriptIsExact:true,lines:LOS1_M_COM_02_LINES,glossary:LOS1_M_COM_02_GLOSS,
  attribution:{author:"Ariser (2011)",title:"Deutsch Dialog . Ich bin Peter.ogg",url:"https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg",license:"CC BY-SA 3.0",licenseUrl:"https://creativecommons.org/licenses/by-sa/3.0/"},
  questions:[
   question("10",1,"Kuka aloittaa esittelykeskustelun?",["Thomas","Takashi","Peter"],"a","Thomas kysyy Wie heißt du?"),
   question("10",2,"Kenen Thomas esittelee sanomalla Das ist ...?",["Franzin","Peterin","Jörgin"],"b","Das ist Peter esittelee kolmannen henkilön."),
   question("10",3,"Mistä Thomas ja Peter sanovat tulevansa?",["Kyotosta","Münchenistä","Berliinistä"],"c","Thomas sanoo Wir kommen aus Berlin."),
   question("10",4,"Mistä Takashi kertoo olevansa?",["Kiotosta","Berliinistä","Kielistä"],"a","Takashi kertoo Ich komme aus Kyoto."),
  ],
 },
} as const;
export function isLosTextBChapter(id:string):id is LosTextBChapter{return id in LOS1_TEXT_B_SOURCES;}
export function validateLosTextB():string[]{
 const errors:string[]=[];
 for(const chapterId of ["01","04","05","06","07","08","09","10"] as const){
  const resource=LOS1_TEXT_B_SOURCES[chapterId];
  if(resource.questions.length!==4)errors.push("C"+chapterId+" requires four checks");
  if(new Set(resource.questions.map(q=>q.id)).size!==4)errors.push("C"+chapterId+" duplicate question IDs");
  for(const q of resource.questions)
   if(!q.options.some(a=>a.id===q.correctId)||q.options.length!==3||!q.explanation)errors.push(q.id);
  if(resource.transcriptIsExact&&!resource.lines.length)errors.push("C"+chapterId+" exact text missing");
  if(!/^https:\/\/(?:commons\.wikimedia\.org\/wiki\/File:|coerll\.utexas\.edu\/dib\/vidt\.php\?f=)/.test(resource.attribution.url))errors.push("C"+chapterId+" missing source page");
 }
 return errors;
}
