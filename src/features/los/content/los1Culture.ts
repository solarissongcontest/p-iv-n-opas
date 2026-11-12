/**
 * LOS! 1 cultural context: 30 human-authored beginner-level comprehension
 * questions. They do not claim an automatic assessment of intercultural
 * competence; every source URL is a visible reference for cultural facts.
 * Factual text remains original Finnish explanation written for LOS!, not a
 * copy of a publisher's external article. No photographs are relicensed.
 */
export type LosCultureChapter="01"|"02"|"03"|"04"|"05"|"06"|"07"|"08"|"09"|"10";
export type LosCultureQuestion={
 id:string;prompt:string;
 options:readonly {id:"a"|"b"|"c";text:string}[];
 correctId:"a"|"b"|"c";explanation:string;
};
export type LosCultureResource={
 note:string;sourceTitle:string;sourceUrl:string;sourceNote:string;
 questions:readonly LosCultureQuestion[];
};
const q=(chapter:LosCultureChapter,n:number,prompt:string,choices:[string,string,string],
 correctId:"a"|"b"|"c",explanation:string):LosCultureQuestion=>({
 id:"C"+chapter+"-CULT-Q"+String(n).padStart(2,"0"),prompt,
 options:choices.map((text,i)=>({id:(["a","b","c"] as const)[i]!,text})),
 correctId,explanation,
});
export const LOS1_CULTURE:Record<LosCultureChapter,LosCultureResource>={
 "01":{
  note:"Tervehdys riippuu tilanteesta ja alueesta. Moin voi kuulua Pohjois-Saksaan ja Servus Etelä-Saksaan tai Itävaltaan, mutta alkeissa riittää yleisten tervehdysten tunnistaminen.",
  sourceTitle:"German Vocabulary - Greetings · koko alkuperäisäänite",
  sourceUrl:"https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Greetings.ogg",
  sourceNote:"German Men92:n public domain -tervehdysluettelo tukee juuri näiden ilmausten tunnistamista, ei kerro kaikkien alueiden kaikista tavoista.",
  questions:[
   q("01",1,"Tapahtuu aamulla ja haluat sanoa hyvää huomenta. Minkä valitset?",
    ["Gute Nacht!","Guten Morgen!","Bis später!"],"b","Guten Morgen! on aamun tervehdys."),
   q("01",2,"Mihin alueeseen Moin-tervehdys yhdistetään tavallisesti?",
    ["Pohjois-Saksaan","Etelä-Amerikkaan","Ainoastaan Sveitsin ranskankieliseen osaan"],"a","Moin on tuttu erityisesti Pohjois-Saksassa."),
   q("01",3,"Mikä tulkinta Servus-sanasta on turvallinen?",
    ["Sitä käytetään vain kaikilla virallisilla kirjeillä","Se tarkoittaa vain yötä","Se voi olla tuttavallinen tervehdys tai hyvästely tietyillä alueilla"],"c","Servus on alueellinen tervehdys- ja hyvästelyilmaus."),
  ],
 },
 "02":{
  note:"Herr ja Frau ovat saksassa tavallisia puhutteluja sukunimen yhteydessä. Esimerkiksi Herr Weiß ja Frau Müller ovat henkilön puhuttelua, eivät osa hänen etunimeään. Nimen kysymiseen sopii tilanteen mukaan Wie heißt du? tai Wie heißen Sie?",
  sourceTitle:"Duden: Herr",
  sourceUrl:"https://www.duden.de/rechtschreibung/Herr",
  sourceNote:"Dudenin hakusana osoittaa Herr-sanan käytön kohteliaana puhutteluna; myös Frau on vastaava puhuttelusana. Ihmisen omaa toivomaa puhuttelua kannattaa kunnioittaa.",
  questions:[
   q("02",1,"Mitä Herr tarkoittaa ilmauksessa Herr Weiß?",
    ["Henkilön etunimeä","Kohteliasta puhuttelua","Opiskelupaikkaa"],"b","Herr on tässä sukunimen edellä käytettävä puhuttelusana."),
   q("02",2,"Mikä on luonteva puhuttelumuoto sukunimen kanssa?",
    ["Frau Müller","Müller Frau","Frau ist Müller"],"a","Frau Müller on tavallinen puhuttelu."),
   q("02",3,"Minkä kysymyksen voi esittää uudelle samanikäiselle tuttavalle?",
    ["Ich bin Peter?","Wo ist Herr?","Wie heißt du?"],"c","Wie heißt du? on tuttavallinen nimikysymys."),
  ],
 },
 "03":{
  note:"Saksan virallinen asema ei rajoitu Saksaan: se on virallinen kieli myös muun muassa Itävallassa, Sveitsissä ja Liechtensteinissa. Sveitsissä ja Belgiassa on myös muita kielialueita. DACH on opetuskäytössä yleinen Saksa–Itävalta–Sveitsi-lyhenne, ei väite yhtenäisestä kulttuurista.",
  sourceTitle:"Make it in Germany: Language classes",
  sourceUrl:"https://www.make-it-in-germany.com/en/arriving-living/learn-german-integration/language-classes",
  sourceNote:"Saksan virallinen asema eri maissa on lähteen ilmoittama; kaikkien asukkaiden äidinkieltä siitä ei voi päätellä.",
  questions:[
   q("03",1,"Mitkä kolme maata muodostavat DACH-lyhenteen?",
    ["Saksa, Itävalta ja Sveitsi","Saksa, Tanska ja Hollanti","Saksa, Ranska ja Italia"],"a","D = Deutschland, A = Austria/Österreich ja CH = Confoederatio Helvetica (Sveitsi)."),
   q("03",2,"Mikä ilmaus tarkoittaa Sveitsistä?",
    ["aus Schweiz","von der Schweiz aus","aus der Schweiz"],"c","Schweiz käyttää die-artikkelia ja lähtöpaikkailmauksessa muotoa aus der Schweiz."),
   q("03",3,"Mikä kuvaa parhaiten Sveitsin kielitilannetta?",
    ["Kaikkien äidinkieli on saksa","Saksalla on virallinen asema, mutta maassa on muitakin kielialueita","Saksa ei kuulu Sveitsin kieliin"],"b","Sveitsissä puhutaan muun muassa saksaa, ranskaa, italiaa ja retoromaania."),
  ],
 },
 "04":{
  note:"Duzen tarkoittaa sinuttelua ja siezen teitittelyä. Saksankielisessä asioinnissa sinuttelu ja teitittely eivät jakaudu mekaanisesti iän mukaan; turvallista on tunnistaa suhde ja kysyä toive tarvittaessa.",
  sourceTitle:"Duden: Duzen oder Siezen?",
  sourceUrl:"https://www.duden.de/sprachwissen/sprachratgeber/Duzen-oder-Siezen",
  sourceNote:"Dudenin artikkelissa käsitellään puhuttelun tilanteista vaihtelua, erityisesti uusia kontakteja ja työympäristöjä.",
  questions:[
   q("04",1,"Kysyt tutulta ystävältä hänen nimeään. Mikä on tavallinen muoto?",
    ["Wie heißen Sie?","Wie heißt du?","Wie heiße ich?"],"b","Ystävälle voi käyttää du-muotoa."),
   q("04",2,"Kysyt tuntemattomalta aikuiselta kohteliaasti. Mikä on turvallinen aloitus?",
    ["Wie heißen Sie?","Wie heißt du?","Du heißt?"],"a","Sie-muoto on tavallinen kohtelias valinta."),
   q("04",3,"Mikä väite on tarkin?",
    ["Jokainen saksankielinen sinuttelee kaikkia","Nuorikin joutuu aina teitittelemään ystäväänsä","Puhuttelu riippuu tilanteesta ja yhteisesti omaksutusta käytännöstä"],"c","Tilanteita ja yksilöllisiä mieltymyksiä on erilaisia."),
  ],
 },
 "05":{
  note:"Wie geht's? on lyhentynyt kuulumiskysymys. Tuttavallisessa tilanteessa voi sanoa Gut, danke. ja kysyä vastavuoroisesti Und dir? Puhuttelumuoto kannattaa sovittaa keskustelukumppaniin.",
  sourceTitle:"Wikibooks: Wie heißt du? (kokonainen Franz–Greta-dialogi)",
  sourceUrl:"https://en.wikibooks.org/wiki/German/Level_I/Wie_heißt_du",
  sourceNote:"Wikibooksin alkuperäinen dialogi sisältää Wie geht's? ja Es geht mir gut -fraasit. Sen pohjalta opetetaan tilanteinen esimerkkivastaus, ei yleispätevää sosiaalista sääntöä.",
  questions:[
   q("05",1,"Mikä on luonteva vastaus kysymykseen Wie geht's?",
    ["Ich bin Montag.","Gut, danke.","Wie heißen Sie?"],"b","Gut, danke. vastaa lyhyesti myönteiseen kuulumiseen."),
   q("05",2,"Mitä Und dir? tarkoittaa?",
    ["Entä sinulle?","Missä asut?","Kuinka vanha olet?"],"a","Und dir? palauttaa kuulumiskysymyksen tutulle."),
   q("05",3,"Mikä valinta sopii kohteliaaseen teitittelytilanteeseen?",
    ["Und dir?","Du bist gut?","Und Ihnen?"],"c","Und Ihnen? käyttää kohteliasta puhuttelua."),
  ],
 },
 "06":{
  note:"Ikä voidaan ilmaista sein-verbillä: Ich bin siebzehn Jahre alt. Ikä ei silti kuulu jokaiseen esittäytymiseen, ja harjoitus on hyvä tehdä kuvitteellisilla henkilöillä ilman todellisten syntymäaikojen keräämistä.",
  sourceTitle:"Zintegrowana Platforma Edukacyjna: alkuperäiset ikädialogit",
  sourceUrl:"https://zpe.gov.pl/a/plik-audio/DIcQL1VxT",
  sourceNote:"ZPE:n alkuperäisistä ikädialogeista harjoitellaan ikäilmauksia; oppikirjan tietosuojasääntö on LOS!:n pedagoginen ratkaisu.",
  questions:[
   q("06",1,"Mikä on oikea lause: Olen 17-vuotias?",
    ["Ich habe siebzehn alt.","Ich bin siebzehn Jahre alt.","Ich ist siebzehn Jahre alt."],"b","Ikä ilmaistaan tässä sein-verbin bin-muodolla."),
   q("06",2,"Mikä on paras tapa täyttää kuvitteellinen ikäharjoitus?",
    ["Käyttää kuvitteellisen henkilön tietoja","Kirjoittaa kaikkien kavereiden syntymäajat","Julkaista oma henkilötunnus"],"a","Taito ei edellytä oikeiden henkilötietojen tallentamista."),
   q("06",3,"Mitä kysytään lauseella Wie alt bist du?",
    ["Nimeä","Kotimaata","Ikää"],"c","Wie alt bist du? tarkoittaa kuinka vanha olet."),
  ],
 },
 "07":{
  note:"Saksan oikeinkirjoituksessa ä, ö, ü ja ß ovat merkityksellisiä. Näppäimistön puuttuessa käytetään toisinaan teknisiä korvausasuja ae, oe, ue ja ss, mutta niitä ei saa automaattisesti vaihtaa jokaiseen sanaan, sillä oikeinkirjoitus voi muuttua.",
  sourceTitle:"Wikimedia Commons: German Grammar - The Alphabet",
  sourceUrl:"https://commons.wikimedia.org/wiki/File:German_Grammar_-_The_Alphabet.ogg",
  sourceNote:"Alkuperäinen ihmisäänite tukee kirjainnimiä; varakirjoituksia käsitellään LOS!:n omana varoituksena, ei äänitteen sanatarkkana tekstinä.",
  questions:[
   q("07",1,"Mikä voi olla ä-kirjaimen tekninen korvausasu?",
    ["ae","aa","ai"],"a","Jos ä ei ole käytettävissä, ae esiintyy joissakin teknisissä yhteyksissä."),
   q("07",2,"Mikä koskee ß-kirjainta?",
    ["Se on sama kuin b","Sen voi aina korvata z:lla","Teknisessä korvaamisessa käytetään usein ss, mutta oikeinkirjoitussäännöt ratkaisevat"],"c","ss ei ole kaikissa tilanteissa mielivaltainen synonyymi ß:lle."),
   q("07",3,"Miksi kirjaimien nimet on harjoiteltava äänen kanssa?",
    ["Saksassa ei käytetä kirjaimia","Kirjaimen nimi voi erota sen äänteestä sanassa","Tavaaminen on kiellettyä puhelimessa"],"b","Kirjaimen nimi ei aina vastaa tavallista äännettä."),
  ],
 },
 "08":{
  note:"Saksassa koulutuspolitiikasta vastaa pääosin 16 osavaltiota, joten koulukäytännöt vaihtelevat. Vieraskielisessä luokassa opiskelija voi pyytää selitystä tai toistoa; tätä ei pidä sekoittaa kaikkialla samanlaiseen opetusjärjestelmään.",
  sourceTitle:"Kultusministerkonferenz: Allgemeinbildende Schulen",
  sourceUrl:"https://www.kmk.org/bildungsministerkonferenz/bildungsthemen/allgemeinbildende-schulen.html",
  sourceNote:"Saksan osavaltioiden koulujärjestelmävastuu perustuu KMK:n viralliseen kuvaukseen. Fraasit ovat LOS!:n alkeisopetusta.",
  questions:[
   q("08",1,"Miksi ei pidä väittää, että jokaisessa Saksan koulussa on samat käytännöt?",
    ["Koulutus on ensisijaisesti 16 osavaltion vastuulla","Saksassa ei ole kouluja","Kaikkien luokkien kieli on latina"],"a","Osavaltiot suunnittelevat koulutusjärjestelmänsä ja tekevät yhteistyötä."),
   q("08",2,"Et ymmärtänyt opettajan lausetta. Mitä pyydät?",
    ["Ich heiße Mia.","Noch einmal, bitte.","Bis morgen!"],"b","Noch einmal, bitte. pyytää toistamaan."),
   q("08",3,"Mikä on kohtelias täysi toistamispyyntö?",
    ["Wie alt bist du?","Gute Nacht!","Können Sie das bitte wiederholen?"],"c","Kohtelias pyyntö voidaan opetella kokonaisena."),
  ],
 },
 "09":{
  note:"Saksan viikonpäivien nimet ovat substantiiveja ja alkavat isolla kirjaimella. Alkeisharjoituksissa am Montag kertoo päivän ja um drei Uhr kellonajan. Viikonpäiväluettelo on autenttisen äänitteen sisällä.",
  sourceTitle:"Wikimedia Commons: German Vocabulary - Days",
  sourceUrl:"https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Days.ogg",
  sourceNote:"Julkaisijan alkuperäinen seitsemän päivän lista tukee viikonpäivien sanoja; tehtävän kalenteriesimerkit ovat LOS!:n itse laatimia.",
  questions:[
   q("09",1,"Mitä ilmaus am Montag kertoo?",
    ["Kellonajan","Viikonpäivän","Iän"],"b","Am Montag tarkoittaa maanantaina."),
   q("09",2,"Mikä on luettelon viimeinen viikonpäivä?",
    ["Sonntag","Freitag","Dienstag"],"a","Seitsemän päivän lista päättyy sanaan Sonntag."),
   q("09",3,"Miten kirjoitat oikein kello kolmelta?",
    ["am drei Uhr","in drei Uhr","um drei Uhr"],"c","Kellonajan alkeisilmaus on um drei Uhr."),
  ],
 },
 "10":{
  note:"Saksalaisessa esittelyssä nimi, kotipaikka, kuulumiset ja kolmannen henkilön esittely voidaan yhdistää, mutta puhuttelu on aina tilanteinen. Er ja sie ovat kolmannen persoonan pronomineja, kohtelias Sie kirjoitetaan isolla alkukirjaimella.",
  sourceTitle:"Duden: Duzen oder Siezen?",
  sourceUrl:"https://www.duden.de/sprachwissen/sprachratgeber/Duzen-oder-Siezen",
  sourceNote:"Lähde tukee puhuttelurekisterien eroa; kolmannen persoonan kielioppifraasit ovat LOS!:n oman opetuksen kertausta.",
  questions:[
   q("10",1,"Mitä tarkoittaa Das ist Leo?",
    ["Tämä on Leo","Minun nimeni on Leo","Kuka on Leo?"],"a","Das ist Leo. esittelee kolmannen henkilön."),
   q("10",2,"Mikä on oikea kolmannen persoonan lause?",
    ["Er komme aus Deutschland.","Er kommt aus Deutschland.","Er kommen aus Deutschland."],"b","Er/sie käyttää tässä kommen-verbin kommt-muotoa."),
   q("10",3,"Mikä on kohtelias nimikysymys?",
    ["Wie heißt du?","Ich heiße Max.","Wie heißen Sie?"],"c","Wie heißen Sie? käyttää kohteliasta Sie-pronominia."),
  ],
 },
};
export const LOS1_CULTURE_CHAPTERS=Object.keys(LOS1_CULTURE).sort() as LosCultureChapter[];
export const LOS1_CULTURE_QUESTION_COUNT=LOS1_CULTURE_CHAPTERS.reduce((n,id)=>n+LOS1_CULTURE[id].questions.length,0);
export function validateLosCulture():string[]{
 const errors:string[]=[];
 if(LOS1_CULTURE_CHAPTERS.length!==10)errors.push("Kulttuuriosioita ei ole 10.");
 if(LOS1_CULTURE_QUESTION_COUNT!==30)errors.push("Kulttuuritehtäviä ei ole 30.");
 const ids=new Set<string>();
 for(const chapter of LOS1_CULTURE_CHAPTERS){
  const resource=LOS1_CULTURE[chapter];
  if(!resource.note||!resource.sourceUrl.startsWith("https://")||!resource.sourceTitle)errors.push("Lähdetiedot puuttuvat C"+chapter);
  if(resource.questions.length!==3)errors.push("Kysymysmäärä C"+chapter);
  for(const item of resource.questions){
   if(ids.has(item.id))errors.push("Toistuva ID "+item.id);
   ids.add(item.id);
   if(item.options.length!==3||new Set(item.options.map(x=>x.id)).size!==3||
      !item.options.some(x=>x.id===item.correctId)||!item.explanation)errors.push(item.id);
  }
 }
 return errors;
}
