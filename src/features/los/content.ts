// LOS! 1 content is separate from personal study data. This is a partial, versioned
// editorial release, not a claim that all ten chapters have passed publication gates.
export const LOS_VERSION = '0.1.0';
export type ChapterId = 'C01'|'C02'|'C03'|'C04'|'C05'|'C06'|'C07'|'C08'|'C09'|'C10';
export type Block = {id:string; speaker?:string; text:string};
export type Word = {de:string; fi:string; tier:'ydin'|'tunnista'|'tuki'; note?:string};
export type Exercise = {
  id:string; type:'choice'|'true-false'|'fill'|'matching'|'ordering'|'translate'|'highlight'|'find-text'|'listen-choice'|'listen-write'|'video'|'article-sort'|'conjugation'|'error-correction'|'writing'|'speech';
  prompt:string; options?:string[]; accepted?:string[]; correct?:string;
  hint:string; explanation:string; blockId?:string; target?:string; order?:string[];
  pairs?:[string,string][]; mediaUrl?:string; videoId?:string; reviewedMedia?:boolean;
};
export type Chapter = {
  id:ChapterId; name:string; goal:string; sourceId:string; sourceUrl:string;
  attribution:string; license:string; status:'text-reviewed'|'source-pending';
  sections:readonly string[]; blocks:Block[]; vocab:Word[]; teaching:string[];
  grammar:{title:string; explanation:string; examples:[string,string][]};
  culture:string; media?:{sourceId:string;title:string;url:string;license:string;sourceUrl?:string;attribution?:string;transcript?:Block[];durationSeconds?:number};
  exercises:Exercise[];
};
export const sections = ['Aloita','Teksti A','Ymmärrä','Sanasto','Kielioppi','Teksti B','Harjoittele','Käytä saksaa','Kulttuuri','Kappaletesti'] as const;

const w=(pairs:[string,string][],tier:Word['tier']='ydin'):Word[]=>pairs.map(([de,fi])=>({de,fi,tier}));
export const chapters:Chapter[] = [
{
 id:'C01',name:'Hallo!',goal:'Tunnistan tervehdyksiä, osaan tervehtiä ja hyvästellä.',
 sourceId:'M-COM-01',sourceUrl:'https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg',
 attribution:'Xzapro4 ja Erkan Yilmaz, GesprächVorstellung (2008). Alkuperäinen teksti ja ääni; ei muutoksia saksankielisiin repliikkeihin.',
 license:'CC BY-SA 3.0',status:'text-reviewed',sections,
 blocks:[
  {id:'c01-a-1',speaker:'Franz',text:'Hallo, wie heißt du?'},
  {id:'c01-a-2',speaker:'Jörg',text:'Hallo, ich heiße Jörg. Und du?'},
  {id:'c01-a-3',speaker:'Franz',text:'Ich heiße Franz.'},
  {id:'c01-a-4',speaker:'Jörg',text:'Wie alt bist du?'},
  {id:'c01-a-5',speaker:'Franz',text:'Ich bin neunzehn Jahre alt, und du?'},
  {id:'c01-a-6',speaker:'Jörg',text:'Ich bin zwanzig.'},
  {id:'c01-a-7',speaker:'Franz',text:'Gut. Bis später!'},
  {id:'c01-a-8',speaker:'Jörg',text:'Tschüss!'}
 ],
 vocab:w([['Hallo!','Hei!'],['Guten Morgen!','Hyvää huomenta!'],['Guten Tag!','Hyvää päivää!'],['Guten Abend!','Hyvää iltaa!'],['Gute Nacht!','Hyvää yötä!'],['Tschüss!','Hei hei!'],['Auf Wiedersehen!','Näkemiin!'],['Bis bald!','Nähdään pian!'],['Bis später!','Nähdään myöhemmin!'],['danke','kiitos'],['bitte','ole hyvä; pyydettäessä: kiitos'],['ja','kyllä'],['nein','ei'],['ich','minä'],['du','sinä'],['wie','miten; kuinka']]).concat(w([['heißen','olla nimeltään'],['alt','vanha; iäkäs'],['Jahre','vuotta (monikko sanasta das Jahr)'],['neunzehn','yhdeksäntoista'],['zwanzig','kaksikymmentä']],'tuki')),
 teaching:[
  'Saksan alussa riittää, että tunnistat muutaman tervehdyksen. Et tarvitse vielä tietoa verbin taivutuksesta tai substantiivin suvusta.',
  'Saksassa w lausutaan kuten suomen v. Kirjain z on ts-äänne. Yhdistelmä ei lausutaan ai ja ie pitkänä i:nä. Sch vastaa suomen š-äännettä (sh). Merkki ß tarkoittaa s-äännettä.',
  'Ä, ö ja ü ovat omia kirjainmuotojaan. Ü:n ääntämistä voi harjoitella muotoilemalla huulet u:lle ja yrittämällä sanoa i. Saksan substantiivit aloitetaan isolla kirjaimella, esimerkiksi das Jahr.',
  'Hallo sopii tuttavalliseen tervehtimiseen. Guten Tag on yleiskäyttöinen asiallinen tervehdys. Tschüss on tuttavallinen hyvästely; Auf Wiedersehen muodollisempi.',
  'Tekstissä mainitaan myös ikä. Sinun ei tarvitse vielä osata ilmausta Wie alt bist du? tai numeroita. Opit ne kappaleessa 6.'
 ],
 grammar:{title:'Ensimmäiset kokonaiset fraasit ja ääntäminen',
  explanation:'Fraasi on käyttövalmis ilmaus. Aloita muistamalla esimerkiksi Hallo! ja Tschüss! kokonaisina. Ich tarkoittaa minä, du sinä. Verbejä aletaan taivuttaa vasta kappaleessa 2. Saksan kirjoitus ja ääntäminen eivät aina vastaa yksi yhteen suomea.',
  examples:[['Hallo!','Hei!'],['Bis später!','Nähdään myöhemmin!'],['Auf Wiedersehen!','Näkemiin!']]},
 culture:'Saksankielisillä alueilla kuulee myös sanoja Moin ja Servus. Moin yhdistetään erityisesti Pohjois-Saksaan, Servus muun muassa Etelä-Saksaan ja Itävaltaan. Näitä riittää tässä vaiheessa tunnistaa.',
 media:{sourceId:'M-COM-03',title:'German Vocabulary – Greetings (28 s)',url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/German_Vocabulary_-_Greetings.ogg',license:'Public domain'},
 exercises:[
 {id:'C01-E01',type:'choice',prompt:'Mikä ilmaus vastaa tuttavallista tervehdystä ”Hei!”?',options:['Hallo!','Gute Nacht!','Danke!'],correct:'Hallo!',hint:'Sama sana esiintyy ensimmäisessä repliikissä.',explanation:'Hallo! tarkoittaa hei ja sopii tuttavalliseen tilanteeseen.'},
 {id:'C01-E02',type:'highlight',prompt:'Etsi ja korosta tekstistä ilmaus ”Hei hei!”',blockId:'c01-a-8',target:'Tschüss!',hint:'Katso viimeistä repliikkiä.',explanation:'Jörg hyvästelee sanomalla Tschüss!'},
 {id:'C01-E03',type:'highlight',prompt:'Korosta lause ”Minun nimeni on Franz.”',blockId:'c01-a-3',target:'Ich heiße Franz.',hint:'Lause on Franzin toisessa vuorossa.',explanation:'Ich heiße Franz tarkoittaa Olen nimeltäni Franz.'},
 {id:'C01-E04',type:'true-false',prompt:'Väite: Guten Abend tarkoittaa hyvää huomenta.',options:['Totta','Tarua'],correct:'Tarua',hint:'Abend tarkoittaa iltaa.',explanation:'Guten Abend = hyvää iltaa, Guten Morgen = hyvää huomenta.'},
 {id:'C01-E05',type:'fill',prompt:'Täydennä hyvästely ”Bis ____!” (Nähdään myöhemmin!)',accepted:['später'],hint:'Sana alkaa kirjaimilla sp.',explanation:'Bis später! on tavallinen hyvästely, joka tarkoittaa nähdään myöhemmin.'},
 {id:'C01-E06',type:'ordering',prompt:'Järjestä kahden sanan tervehdys: Hyvää päivää!',order:['Guten','Tag!'],hint:'Tervehdyksessä adjektiivi tulee ensin.',explanation:'Oikea sanajärjestys on Guten Tag!'},
 {id:'C01-E07',type:'translate',prompt:'Kirjoita saksaksi ”Kiitos!”',accepted:['Danke!','Danke'],hint:'Sana alkaa d-kirjaimella.',explanation:'Danke! on kiitos. Lauseen lopun huutomerkin puuttuminen ei muuta sanaston oikeellisuutta.'},
 {id:'C01-E08',type:'choice',prompt:'Miten saksan kirjain z yleensä ääntyy?',options:['ts','suomen s','suomen z englannin tapaan'],correct:'ts',hint:'Mieti nimeä Franz.',explanation:'Kirjain z lausutaan useimmiten ts, kuten Franz-nimessä.'},
 {id:'C01-E09',type:'choice',prompt:'Valitse kohteliaampi hyvästely tuntemattomalle aikuiselle.',options:['Auf Wiedersehen!','Bis später!','Hallo!'],correct:'Auf Wiedersehen!',hint:'Valitse asiallisempi hyvästely.',explanation:'Auf Wiedersehen sopii selvästi muodollisempaan tilanteeseen kuin Tschüss.'},
 {id:'C01-E10',type:'choice',prompt:'Mikä ääntämissääntö on oikein?',options:['ie = pitkä i','ei = pitkä i','w = suomalainen w-äänne'],correct:'ie = pitkä i',hint:'Vertaa wie ja mein.',explanation:'ie ääntyy pitkänä i:nä, ei taas ai:na ja w kuten v.'},
 {id:'C01-E11',type:'translate',prompt:'Kirjoita saksaksi ”Hei!”',accepted:['Hallo!','Hallo'],hint:'Olet nähnyt tämän jo monta kertaa.',explanation:'Hallo on tervehdys.'},
 {id:'C01-E12',type:'fill',prompt:'Täydennä: Guten ____! (Hyvää huomenta!)',accepted:['Morgen'],hint:'Aamu on saksaksi Morgen.',explanation:'Guten Morgen! on hyvää huomenta. Morgen on substantiivi ja kirjoitetaan isolla.'},
 {id:'C01-E13',type:'speech',prompt:'Sano ääneen ja halutessasi äänitä: Hallo! Guten Tag! Tschüss!',hint:'Harjoittele rauhassa.',explanation:'Arvioi itse: kuuluuko H selvästi, ja ääntyvätkö kaikki kolme ilmausta sujuvasti?'}
 ]
},
{
 id:'C02',name:'Ich heiße …',goal:'Kysyn nimen ja osaan esitellä itseni.',
 sourceId:'M-WB-01',sourceUrl:'https://en.wikibooks.org/wiki/German/Level_I/Wie_hei%C3%9Ft_du',
 attribution:'Wikibooks-yhteisö, German/Level I/Wie heißt du? (1. Teil), Dialog. Katso sivun muokkaushistoria. Alkuperäisiä vuorosanoja ei muokattu.',license:'CC BY-SA (tarkka sivuversio vahvistettava)',status:'text-reviewed',sections,
 blocks:[
 {id:'c02-a-1',speaker:'Franz',text:'Hallo, ich bin Franz. Wie heißt du?'},
 {id:'c02-a-2',speaker:'Greta',text:"Hallo, Franz. Ich heiße Greta. Wie geht's?"},
 {id:'c02-a-3',speaker:'Franz',text:'Es geht mir gut. Kennst du den Lehrer?'},
 {id:'c02-a-4',speaker:'Greta',text:'Ja, er heißt Herr Weiß.'},
 {id:'c02-a-5',speaker:'Franz',text:'Oh, danke, Greta. Bis dann!'},
 {id:'c02-a-6',speaker:'Greta',text:'Wiedersehen!'}
 ],
 vocab:w([['heißen','olla nimeltään'],['ich heiße','minun nimeni on'],['du heißt','sinun nimesi on'],['Wie heißt du?','Mikä sinun nimesi on?'],['mein Name','minun nimeni'],['der Name','nimi'],['ich bin','minä olen'],['du bist','sinä olet'],['er ist','hän on (mies)'],['und','ja; entä'],['wer','kuka'],['Wer ist das?','Kuka tuo on?'],['freut mich','hauska tutustua'],['der Herr','herra'],['die Frau','rouva; nainen'],['das ist','tämä on']]).concat(w([['Kennst du den Lehrer?','Tunnetko opettajan?'],['er heißt','hänen nimensä on']],'tuki')),
 teaching:['Kysy toisen nimeä kysymyksellä Wie heißt du? Vastaa Ich heiße ... tai Ich bin ... .', 'Verbin muoto muuttuu puhujan mukaan: ich heiße, du heißt. Ich bin ja du bist ovat sein-verbin muotoja. Tässä riittää opetella nämä muodot.', 'Lauseessa Ich heiße Greta tekijä ich tulee ennen verbiä heiße. Kysymyssana Wie aloittaa kysymyksen Wie heißt du?'],
 grammar:{title:'Heißen ja sein: ich ja du',explanation:'Saksan verbin muoto muuttuu persoonan mukaan. Heißen = olla nimeltään: ich heiße, du heißt. Sein = olla: ich bin, du bist. Älä käytä muotoa ich heißt.',examples:[['Ich heiße Greta.','Olen nimeltäni Greta.'],['Wie heißt du?','Mikä sinun nimesi on?'],['Ich bin Franz.','Minä olen Franz.']]},
 culture:'Etunimellä puhuttelu on tavallista tuttavallisissa tilanteissa. Herr ja Frau esiintyvät sukunimen yhteydessä kohteliaassa puhuttelussa.',
 media:{
  sourceId:'M-COM-02',title:'Deutsch Dialog. Ich bin Peter (12 s)',
  url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsch_Dialog_._Ich_bin_Peter.ogg',
  sourceUrl:'https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg',
  license:'CC BY-SA 3.0',durationSeconds:12,
  attribution:'Ariser (2011), alkuperäinen nelirepliikkinen äänitetty esittelydialogi. Ei muutoksia saksankielisiin repliikkeihin.',
  transcript:[
   {id:'c02-b-1',speaker:'Thomas',text:'Wie heißt du?'},
   {id:'c02-b-2',speaker:'Takashi',text:'Ich heiße Takashi. Und du?'},
   {id:'c02-b-3',speaker:'Thomas',text:'Ich bin Thomas. Das ist Peter. Wir kommen aus Berlin.'},
   {id:'c02-b-4',speaker:'Takashi',text:'Ich komme aus Kyoto. Ich bin Japaner.'}
  ]
 },
 exercises:[
 {id:'C02-E01',type:'fill',prompt:'Täydennä: Ich ____ Greta.',accepted:['heiße'],hint:'Verbi on heißen.',explanation:'Ich heiße on oikea minä-muoto.'},
 {id:'C02-E02',type:'fill',prompt:'Täydennä: Wie ____ du?',accepted:['heißt'],hint:'Du-persoona päättyy tässä -t.',explanation:'Du heißt, joten kysymys on Wie heißt du?'},
 {id:'C02-E03',type:'highlight',prompt:'Korosta Greta-nimisen henkilön esittäytyminen.',blockId:'c02-a-2',target:'Ich heiße Greta.',hint:'Greta kertoo nimensä.',explanation:'Greta sanoo Ich heiße Greta.'},
 {id:'C02-E04',type:'choice',prompt:'Mikä on oikein?',options:['Ich bin Franz.','Ich bist Franz.','Ich ist Franz.'],correct:'Ich bin Franz.',hint:'Ich ja bin kuuluvat yhteen.',explanation:'Sein-verbin minä-muoto on bin.'},
 {id:'C02-E05',type:'writing',prompt:'Kirjoita kaksi lausetta: tervehdys ja oma esittäytyminen. Voit käyttää kuvitteellista nimeä.',hint:'Hallo! Ich heiße ...',explanation:'Mallivastaus: Hallo! Ich heiße Alex. Tarkista tervehdys, ich heiße ja iso alkukirjain.'}
 ]
},
{
 id:'C03',name:'Woher kommst du?',goal:'Kysyn ja kerron kotimaan tai kotikaupungin.',
 sourceId:'M-DIB-01',sourceUrl:'https://coerll.utexas.edu/dib/vidt.php?f=01_15_int_bg_who',
 attribution:'COERLL, University of Texas at Austin / Deutsch im Blick, Kapitel 1, Berna: Wer bin ich?. Alkuperäinen kahdentoista vuoron saksankielinen litteraatti. CC BY 4.0 -lisenssilähde: https://coerll.utexas.edu/dib/pdfs/DeutschImBlick-textbook.pdf. Saksankieliseen tekstiin ei ole tehty muutoksia.',
 license:'CC BY 4.0 (litteraatin OER-teksti; video erikseen tarkistamatta)',status:'text-reviewed',sections,
 blocks:[
 {id:'c03-a-1',speaker:'Haastattelija',text:'Wie heißt du?'},
 {id:'c03-a-2',speaker:'Berna',text:'Ich heiße Berna.'},
 {id:'c03-a-3',speaker:'Haastattelija',text:'Woher kommst du?'},
 {id:'c03-a-4',speaker:'Berna',text:'Ich komme aus Deutschland.'},
 {id:'c03-a-5',speaker:'Haastattelija',text:'Und wo in Deutschland?'},
 {id:'c03-a-6',speaker:'Berna',text:'Ich komme aus Kiel. Das ist in Schleswig-Holstein, ganz im Norden.'},
 {id:'c03-a-7',speaker:'Haastattelija',text:'Wie alt bist du?'},
 {id:'c03-a-8',speaker:'Berna',text:'Ich bin 30 Jahre alt.'},
 {id:'c03-a-9',speaker:'Haastattelija',text:'Was ist deine Telefonnummer?'},
 {id:'c03-a-10',speaker:'Berna',text:'Meine Telefonnummer 512-749-8940'},
 {id:'c03-a-11',speaker:'Haastattelija',text:'Was ist deine Lieblingsfarbe und warum?'},
 {id:'c03-a-12',speaker:'Berna',text:'Meine Lieblingsfarbe ist, glaube ich, rot. Und rot, weil... [das] ist halt eine sehr temperamentvolle Farbe und hat viel Feuer und Leidenschaft.'}
 ],
 vocab:w([['Kiel','Kiel (Saksan kaupunki)'],['der Norden','pohjoinen'],['woher','mistä'],['kommen','tulla'],['kommst','tulet'],['aus','-sta/-stä'],['Finnland','Suomi'],['Deutschland','Saksa'],['Österreich','Itävalta'],['die Schweiz','Sveitsi'],['Schweden','Ruotsi'],['Estland','Viro'],['wo','missä'],['die Stadt','kaupunki'],['das Land','maa'],['hier','täällä'],['auch','myös']]),
 teaching:['Woher kysyy lähtöpaikkaa: Woher kommst du? eli Mistä tulet?','Ich komme aus Finnland tarkoittaa Olen Suomesta. Huomaa poikkeava muoto aus der Schweiz.'],
 grammar:{title:'Kommen ja woher',explanation:'Ich komme, du kommst, er/sie kommt. Woher tarkoittaa mistä, wo tarkoittaa missä. Maan nimissä on yksittäisiä artikkelipoikkeuksia.',examples:[['Woher kommst du?','Mistä olet kotoisin?'],['Ich komme aus Finnland.','Olen Suomesta.']]},
 culture:'Saksa, Itävalta ja Sveitsi ovat tärkeimpiä saksankielisiä maita. Saksaa puhutaan myös muun muassa Liechtensteinissa.',
 media:{sourceId:'M-COM-02',title:'Ich bin Peter – esittäytyminen ja kotipaikka (12 s)',
  url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsch_Dialog_._Ich_bin_Peter.ogg',
  sourceUrl:'https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg',
  license:'CC BY-SA 3.0',durationSeconds:12,
  attribution:'Ariser (2011), alkuperäinen nelirepliikkinen saksankielinen ihmisen äänittämä keskustelu. C02:ssa käytetty sama äänite, tässä harjoitellaan maita ja paikkoja. Ei muutoksia.',
  transcript:[
   {id:'c03-b-1',speaker:'Thomas',text:'Wie heißt du?'},
   {id:'c03-b-2',speaker:'Takashi',text:'Ich heiße Takashi. Und du?'},
   {id:'c03-b-3',speaker:'Thomas',text:'Ich bin Thomas. Das ist Peter. Wir kommen aus Berlin.'},
   {id:'c03-b-4',speaker:'Takashi',text:'Ich komme aus Kyoto. Ich bin Japaner.'}
  ]},
 exercises:[]
},
{
 id:'C04',name:'Du oder Sie?',goal:'Tunnistan sinuttelun ja teitittelyn.',
 sourceId:'M-WB-06',sourceUrl:'https://en.wikibooks.org/wiki/German/Lesson_2',attribution:'Wikibooks-yhteisö, German/Lesson 2, Gespräch 2-2 Die Geschäftsmänner, 8 alkuperäistä repliikkiä. Lähdesivun versio 3823654 (2.4.2021). Ei muokkauksia saksankielisiin vuoroihin.',license:'CC BY-SA (sivun tekstilisenssi; media erikseen)',status:'text-reviewed',sections,
 blocks:[
 {id:'c04-a-1',speaker:'Herr Schmidt',text:'Guten Morgen, Herr Standish! Wie geht es Ihnen?'},
 {id:'c04-a-2',speaker:'Herr Standish',text:'Danke sehr, es geht mir gut. Und Ihnen?'},
 {id:'c04-a-3',speaker:'Herr Schmidt',text:'Nicht so gut. Ich bin müde.'},
 {id:'c04-a-4',speaker:'Herr Standish',text:'Wie bitte? Müde? Warum?'},
 {id:'c04-a-5',speaker:'Herr Schmidt',text:'Ich habe so viel Arbeit.'},
 {id:'c04-a-6',speaker:'Herr Standish',text:'Das kann ich verstehen. Zu viel ist zu viel.'},
 {id:'c04-a-7',speaker:'Herr Schmidt',text:'Das ist richtig. Auf Wiedersehen, Herr Standish!'},
 {id:'c04-a-8',speaker:'Herr Standish',text:'Auf Wiedersehen, bis morgen.'}
 ],
 vocab:w([['Sie','te (kohtelias)'],['Wie heißen Sie?','Mikä teidän nimenne on?'],['Kommen Sie ...?','Tuletteko ...?'],['Entschuldigung','anteeksi'],['bitte schön','olkaa hyvä'],['danke schön','paljon kiitoksia'],['vielen Dank','paljon kiitoksia'],['gern','mielelläni'],['mein','minun'],['Ihr Name','teidän nimenne'],['die Lehrerin','naisopettaja'],['der Lehrer','miesopettaja']]),
 teaching:['Du on tuttavallinen sinä. Sie kirjoitetaan isolla ja tarkoittaa kohteliasta te-puhuttelua.', 'Kysy muodollisesti Wie heißen Sie? tai Woher kommen Sie?'],
 grammar:{title:'Kohtelias Sie',explanation:'Sie-teitittelyssä verbi on monikon kaltaisessa muodossa: Sie heißen, Sie kommen. Pieni sie voi tarkoittaa hän (naisesta) tai he.',examples:[['Wie heißen Sie?','Mikä teidän nimenne on?'],['Woher kommen Sie?','Mistä olette kotoisin?']]},
 culture:'Puhuttelu riippuu tilanteesta, suhteesta ja paikallisesta tavasta. Pelkkä ikä ei määritä sinuttelua.',
 media:{sourceId:'M-COM-04',title:'Wie geht es Ihnen? – kohtelias vointikysymys (2 s)',
  url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/De-wie_geht_es_Ihnen.ogg',
  sourceUrl:'https://commons.wikimedia.org/wiki/File:De-wie_geht_es_Ihnen.ogg',
  license:'CC BY-SA 4.0',durationSeconds:2,
  attribution:'Jeuwre (7.5.2017), saksalaisen syntyperäisen puhujan alkuperäinen ihmisen äänittämä vointifraasi. Ei muutoksia äänitteeseen.',
  transcript:[{id:'c04-b-1',speaker:'Puhuja',text:'Wie geht es Ihnen?'}]},
 exercises:[
 {id:'C04-E01',type:'highlight',prompt:'Korosta keskustelusta kohtelias ilmaus ”Mitä teille kuuluu?”',blockId:'c04-a-1',target:'Wie geht es Ihnen?',hint:'Ensimmäisen puhujan lopussa.',explanation:'Wie geht es Ihnen? käyttää kohteliasta Ihnen-pronominia.'},
 {id:'C04-E02',type:'choice',prompt:'Mikä on kohtelias kysymys tuntemattomalle aikuiselle?',options:['Wie heißen Sie?','Wie heißt du?','Du heißen?'],correct:'Wie heißen Sie?',hint:'Kohtelias te kirjoitetaan isolla.',explanation:'Wie heißen Sie? on kohtelias. Du-puhuttelussa kysytään Wie heißt du?'},
 {id:'C04-E03',type:'fill',prompt:'Täydennä kohteliaasti: Woher ____ Sie?',accepted:['kommen'],hint:'Sie-muodossa verbi on kommen.',explanation:'Woher kommen Sie? = Mistä olette kotoisin?'},
 {id:'C04-E04',type:'true-false',prompt:'Väite: Kohtelias Sie kirjoitetaan isolla alkukirjaimella myös lauseen keskellä.',options:['Totta','Tarua'],correct:'Totta',hint:'Vertaa du ja Sie.',explanation:'Kohtelias Sie ja sen taivutusmuodot kirjoitetaan isolla.'},
 {id:'C04-E05',type:'translate',prompt:'Kirjoita kohtelias tervehdys ”Hyvää päivää!”',accepted:['Guten Tag!','Guten Tag'],hint:'Olet jo opiskellut tämän C01:ssä.',explanation:'Guten Tag! sopii sekä yleiseen että asialliseen tervehtimiseen.'},
 {id:'C04-E06',type:'writing',prompt:'Kirjoita kuvitteellinen kaksi lausetta sisältävä kohtelias esittäytyminen.',hint:'Guten Tag! Ich heiße ...',explanation:'Mallivastaus: Guten Tag! Ich heiße Alex. Wie heißen Sie? Tarkista Sie-kirjain ja kysymysmerkki.'}
 ]
},
{
 id:'C05',name:'Wie geht’s?',goal:'Kysyn vointia ja vastaan lyhyesti.',
 sourceId:'M-WB-05',sourceUrl:'https://en.wikibooks.org/wiki/German/Lesson_1',
 attribution:'Wikibooks-yhteisö, German/Lesson 1, Gespräch 1-1 Die Freunde. Muuttamattomat repliikit.',license:'CC BY-SA (sivuversio tarkistettava)',status:'text-reviewed',sections,
 blocks:[
 {id:'c05-a-1',speaker:'Heinrich',text:'Guten Tag, Karl. Wie geht es dir?'},
 {id:'c05-a-2',speaker:'Karl',text:'Guten Tag. Danke, mir geht es gut. Und dir?'},
 {id:'c05-a-3',speaker:'Heinrich',text:'Danke, mir geht es gut. Auf Wiedersehen.'},
 {id:'c05-a-4',speaker:'Karl',text:'Auf Wiedersehen!'}
 ],
 vocab:w([["Wie geht's?",'Mitä kuuluu?'],['Wie geht es dir?','Mitä sinulle kuuluu?'],['Wie geht es Ihnen?','Mitä teille kuuluu?'],['es geht','menee (vointifraasissa)'],['mir','minulle (fraasissa)'],['gut','hyvin'],['sehr gut','erittäin hyvin'],['nicht','ei'],['nicht so gut','ei kovin hyvin'],['schlecht','huonosti'],['müde','väsynyt'],['prima','loistavaa'],['toll','hienoa'],['Und dir?','Entä sinulle?'],['Und Ihnen?','Entä teille?']]),
 teaching:['Wie geht es dir? tarkoittaa Mitä kuuluu? Vastaa esimerkiksi Mir geht es gut.', 'Mir, dir ja Ihnen opetellaan tässä kiinteinä fraaseina. Datiivin kielioppia ei tarvitse vielä osata.','Nicht kieltää: nicht so gut = ei kovin hyvin.'],
 grammar:{title:'Vointifraasit ja nicht',explanation:'Opettele kokonaiset fraasit. Mir geht es gut vastaa suomen Ilmaukselle minulle kuuluu hyvää. Sehr vahvistaa, nicht kieltää.',examples:[['Wie geht es dir?','Mitä sinulle kuuluu?'],['Danke, mir geht es gut.','Kiitos, hyvää kuuluu.'],['Nicht so gut.','Ei kovin hyvin.']]},
 culture:'Vointikysymykseen voi vastata lyhyesti tai pidemmin riippuen tilanteesta ja siitä, kuinka tuttu toinen henkilö on.',
 media:{sourceId:'M-COM-05',title:'Wie geht es dir? – tuttavallinen vointikysymys (2 s)',
  url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/De-wie_geht_es_dir.ogg',
  sourceUrl:'https://commons.wikimedia.org/wiki/File:De-wie_geht_es_dir.ogg',
  license:'CC BY-SA 4.0',durationSeconds:2,
  attribution:'Jeuwre (7.5.2017), saksalaisen syntyperäisen puhujan alkuperäinen ihmisen äänittämä vointifraasi. Ei muutoksia äänitteeseen.',
  transcript:[{id:'c05-b-1',speaker:'Puhuja',text:'Wie geht es dir?'}]},
 exercises:[
 {id:'C05-E01',type:'highlight',prompt:'Korosta Karl-nimisen henkilön vastaus siitä, että hänelle kuuluu hyvää.',blockId:'c05-a-2',target:'mir geht es gut',hint:'Etsi ilmaus danke-sanan jälkeen.',explanation:'Karl vastaa mir geht es gut.'},
 {id:'C05-E02',type:'choice',prompt:'Miten vastaat, jos ei kuulu kovin hyvää?',options:['Nicht so gut.','Guten Morgen.','Wie heißt du?'],correct:'Nicht so gut.',hint:'Nicht kieltää.',explanation:'Nicht so gut tarkoittaa ei kovin hyvin.'},
 {id:'C05-E03',type:'fill',prompt:'Täydennä: Mir geht es ____.',accepted:['gut'],hint:'Sana tarkoittaa hyvin.',explanation:'Mir geht es gut on tavallinen lyhyt vointivastaus.'}
 ]
},
{
 id:'C06',name:'Wie alt bist du?',goal:'Ymmärrän numerot ja kerron iän.',sourceId:'BLOCK-03',
 sourceUrl:'',attribution:'Uusi ihmisen kirjoittama ikädialogi puuttuu; C01:n kertaus ei kelpaa uudeksi päätekstiksi.',license:'Ei vielä valittua lähdettä',status:'source-pending',sections,blocks:[],
 vocab:w([['null','nolla'],['eins','yksi'],['zwei','kaksi'],['drei','kolme'],['vier','neljä'],['fünf','viisi'],['sechs','kuusi'],['sieben','seitsemän'],['acht','kahdeksan'],['neun','yhdeksän'],['zehn','kymmenen'],['elf','yksitoista'],['zwölf','kaksitoista'],['dreizehn','kolmetoista'],['vierzehn','neljätoista'],['fünfzehn','viisitoista'],['sechzehn','kuusitoista'],['siebzehn','seitsemäntoista'],['achtzehn','kahdeksantoista'],['neunzehn','yhdeksäntoista'],['zwanzig','kaksikymmentä'],['alt','vanha'],['das Jahr','vuosi'],['die Jahre','vuodet']]),
 teaching:['Ikä ilmaistaan sein-verbin avulla: Ich bin siebzehn Jahre alt.', 'Lukujen 21–99 järjestys on ykköset ja kymmenet: einundzwanzig = 21. Sechzehn ja siebzehn ovat poikkeavia.'],
 grammar:{title:'Ikä ja numerot',explanation:'Wie alt bist du? = Kuinka vanha olet? Ich bin ... Jahre alt. Kohteliaasti Wie alt sind Sie?',examples:[['Ich bin siebzehn Jahre alt.','Olen 17-vuotias.']]},culture:'Ikää ei ole tarpeen kysyä kaikissa ensikohtaamisissa.',exercises:[]
},
{
 id:'C07',name:'Wie schreibt man das?',goal:'Osaan tavata nimen ja pyytää kirjoittamaan sen.',
 sourceId:'M-WB-02',sourceUrl:'https://en.wikibooks.org/wiki/German/Level_I/Bitte_buchstabieren_Sie',
 attribution:'Wikibooks-yhteisö, German/Level I/Bitte buchstabieren Sie, Fernsprechauskunft. Julkaistu keskustelu.',license:'CC BY-SA (sivuversio tarkistettava)',status:'text-reviewed',sections,
 blocks:[
 {id:'c07-a-1',speaker:'Auskunft',text:'Auskunft, guten Tag.'},
 {id:'c07-a-2',speaker:'Franz',text:'Guten Tag. Ich hätte gerne die Telefonnummer von Frau Claudia Bolliger aus Bern.'},
 {id:'c07-a-3',speaker:'Auskunft',text:'Wie schreibt man das? Bitte buchstabieren Sie.'},
 {id:'c07-a-4',speaker:'Franz',text:'Natürlich. Claudia: C wie Cäsar, L wie Ludwig, A wie Anton, U wie Ursula, D wie Dora, I wie Ida, A wie Anton. Bolliger: B wie Berta, O wie Otto, zweimal L wie Ludwig, I wie Ida, G wie Gustav, E wie Emil und R wie Richard.'},
 {id:'c07-a-5',speaker:'Auskunft',text:'Danke. Die Nummer lautet ...'}
 ],
 vocab:w([['schreiben','kirjoittaa'],['Wie schreibt man das?','Miten se kirjoitetaan?'],['buchstabieren','tavata'],['Bitte buchstabieren Sie.','Tavatkaa, olkaa hyvä.'],['noch einmal','vielä kerran'],['langsam','hitaasti'],['der Buchstabe','kirjain'],['die Nummer','numero'],['die Telefonnummer','puhelinnumero'],['die Adresse','osoite'],['das Handy','matkapuhelin'],['die E-Mail-Adresse','sähköpostiosoite'],['richtig','oikein']]),
 teaching:['Saksan kirjainten nimet eivät aina vastaa suomen kirjainten nimiä. Erota nimi ja äänne.', 'Wie schreibt man das? on hyödyllinen kiinteä fraasi. Bitte buchstabieren Sie on kohtelias tavaamispyyntö.', 'Saksan substantiiveilla on sanakirjassa artikkeli der, die tai das. Artikkeli opitaan yleensä sanan mukana: der Name (nimi), die Frau (rouva tai nainen), das Jahr (vuosi). Artikkeli ei tarkoita suomenkielistä sukupuolta. Tässä riittää näiden kolmen opitun sanan tunnistaminen, ei sijamuotojen opiskelu.'],
 grammar:{title:'Tavaaminen',explanation:'Käytä fraaseja vielä kokonaisina. Ääkkösten korvausmuotoja voi käyttää teknisesti (ä → ae), mutta oikea kirjoitusasu ei katoa.',examples:[['Wie schreibt man das?','Miten tämä kirjoitetaan?'],['Noch einmal, bitte!','Vielä kerran, kiitos!']]},
 culture:'Puhelimessa käytetään joskus kirjainten selventämiseen esimerkkisanoja. Kirjainten sanoilla selittäminen auttaa, kun yhteys on huono tai nimien kirjoitusasut ovat vieraita.',
 media:{sourceId:'M-COM-07-BUCH',title:'buchstabieren – tavata kirjaimet (2,2 s)',url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/De-buchstabieren.ogg',
 sourceUrl:'https://commons.wikimedia.org/wiki/File:De-buchstabieren.ogg',license:'CC BY-SA 4.0',
 attribution:'Jeuwre (2014), syntyperäisen saksankielisen puhujan alkuperäinen ääntämisnäyte. Muokkaamaton.',
 durationSeconds:2.2,transcript:[{id:'c07-b-1',speaker:'Ääntämisnäyte',text:'buchstabieren'}]},
 exercises:[]
},
{
 id:'C08',name:'Noch einmal, bitte!',goal:'Pyydän toistoa ja selvennystä.',sourceId:'M-DIB-04',sourceUrl:'https://coerll.utexas.edu/dib/toc.php?k=2',
 attribution:'COERLL:n luettelosta ei ole valittu yksittäistä tarkistettua haastattelua.',license:'Avoin',status:'source-pending',sections,blocks:[],
 vocab:w([['Ich verstehe nicht.','En ymmärrä.'],['Noch einmal, bitte!','Vielä kerran, kiitos!'],['Bitte langsamer.','Hitaammin, kiitos.'],['Was bedeutet das?','Mitä se tarkoittaa?'],['Wie sagt man ... auf Deutsch?','Miten sanotaan ... saksaksi?'],['Können Sie das bitte wiederholen?','Voisitteko toistaa sen?']]),
 teaching:['Selviytymisfraasit kannattaa opetella ulkoa. Niitä voi käyttää, vaikka niiden kaikkia kielioppiosia ei vielä ymmärrä.'],
 grammar:{title:'Pyydä selvennystä',explanation:'Können Sie das bitte wiederholen? on kohtelias valmis fraasi. Modaaliverbin taivutusta ei vielä opetella.',examples:[['Ich verstehe nicht.','En ymmärrä.'],['Bitte langsamer.','Hitaammin, kiitos.']]},culture:'Selvennyksen pyytäminen on tavallinen ja hyödyllinen osa vuorovaikutusta.',exercises:[]
},
{
 id:'C09',name:'Am Montag um drei.',goal:'Ymmärrän viikonpäivät ja yksinkertaisen tapaamisajan.',
 sourceId:'M-WB-03',sourceUrl:'https://en.wikibooks.org/wiki/German/Level_I/Freizeit',
 attribution:'Wikibooks-yhteisö, German/Level I/Freizeit, Sport und Zeit. Alkuperäinen 7-repliikkinen dialogi.',license:'CC BY-SA (sivuversio tarkistettava)',status:'text-reviewed',sections,
 blocks:[
 {id:'c09-a-1',speaker:'Franz',text:'Hallo, Greta! Wie spät ist es?'},
 {id:'c09-a-2',speaker:'Greta',text:'Es ist Viertel vor drei.'},
 {id:'c09-a-3',speaker:'Franz',text:'Wirklich? Ich spiele um drei Fußball. Machst du Sport, Greta?'},
 {id:'c09-a-4',speaker:'Greta',text:'Nein, ich bin faul. Ich gehe jetzt nach Hause.'},
 {id:'c09-a-5',speaker:'Franz',text:'Fußball macht aber Spaß!'},
 {id:'c09-a-6',speaker:'Greta',text:'Bis dann.'},
 {id:'c09-a-7',speaker:'Franz',text:'Wiedersehen!'}
 ],
 vocab:w([['der Montag','maanantai'],['der Dienstag','tiistai'],['der Mittwoch','keskiviikko'],['der Donnerstag','torstai'],['der Freitag','perjantai'],['der Samstag','lauantai'],['der Sonntag','sunnuntai'],['am Montag','maanantaina'],['um drei Uhr','kello kolme'],['wann','milloin'],['die Woche','viikko'],['heute','tänään'],['morgen','huomenna']]),
 teaching:['Päivän nimen edessä käytetään am: am Montag. Kellonajan edessä käytetään um: um drei Uhr.', 'Viertel vor drei tarkoittaa varttia vaille kolme. Muu dialogin verbisanasto on tukea, ei vielä opeteltavaa taivutusta.'],
 grammar:{title:'Am + viikonpäivä, um + kellonaika',explanation:'Am Montag um drei tarkoittaa maanantaina kello kolme. Viikonpäivät ovat saksan substantiiveja ja alkavat isolla.',examples:[['Am Montag um drei Uhr.','Maanantaina kello kolme.']]},culture:'Saksassa kalenterin arkiviikko alkaa maanantaista, kuten Suomessa.',
 media:{sourceId:'M-COM-09-DAYS',title:'Tage: Montag bis Sonntag (15 s)',
  url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/German_Vocabulary_-_Days.ogg',
  sourceUrl:'https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Days.ogg',
  license:'CC BY-SA 3.0',durationSeconds:15,
  attribution:'Christoph (2007), englanninkielisestä Wikibooksista Wikimedia Commonsiin siirretty alkuperäinen ihmisen äänittämä viikonpäiväluettelo. Ei muutoksia.',
  transcript:[{id:'c09-b-1',speaker:'Viikonpäivien ääni',text:'Tage: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.'}]},
 exercises:[]
},
{
 id:'C10',name:'Schön, dich kennenzulernen!',goal:'Yhdistän opitut asiat lyhyeen esittelyyn.',sourceId:'M-DIB-02',
 sourceUrl:'https://coerll.utexas.edu/dib/vidt.php?f=01_22_int_hb_who',
 attribution:'COERLL / University of Texas at Austin, Deutsch im Blick: Harald Becker, Kapitel 1 / Wer bin ich? Kokonainen 14-vuoroinen julkinen saksankielinen haastattelulitteraatti, muokkaamattomat saksankieliset repliikit. Avoimen 2017 oppikirjan CC BY 4.0 -lähde: https://coerll.utexas.edu/dib/pdfs/DeutschImBlick-textbook.pdf. Videon tiedostokohtaisia oikeuksia ei vielä ole vahvistettu.',
 license:'CC BY 4.0 (OER-opetusmateriaali, alkuperäisvideon käyttöoikeudet erikseen)',status:'text-reviewed',sections,
 blocks:[
 {id:'c10-a-1',speaker:'Haastattelija',text:'Wie heißt du?'},
 {id:'c10-a-2',speaker:'Harald',text:'Ich heiße Harald Becker.'},
 {id:'c10-a-3',speaker:'Haastattelija',text:'Woher kommst du?'},
 {id:'c10-a-4',speaker:'Harald',text:'Ich komme ursprünglich aus München.'},
 {id:'c10-a-5',speaker:'Haastattelija',text:'Aha, wo ist München?'},
 {id:'c10-a-6',speaker:'Harald',text:'München ist im zivilisierten Teil Deutschlands, also in Süddeutschland.'},
 {id:'c10-a-7',speaker:'Haastattelija',text:'Aha. Wie alt bist du?'},
 {id:'c10-a-8',speaker:'Harald',text:'Ich bin jetzt so um die fünfzig.'},
 {id:'c10-a-9',speaker:'Haastattelija',text:'Um die fünfzig... Was ist deine Telefonnumer?'},
 {id:'c10-a-10',speaker:'Harald',text:'Ah, das ist nicht so einfach. Neun, eins, zwei, eins, fünf, sechs, sechs.'},
 {id:'c10-a-11',speaker:'Haastattelija',text:'Hmh. Und was ist deine Lieblingsfarbe?'},
 {id:'c10-a-12',speaker:'Harald',text:'Blau.'},
 {id:'c10-a-13',speaker:'Haastattelija',text:'Warum Blau?'},
 {id:'c10-a-14',speaker:'Harald',text:'Ahmh, das ist eine gute Frage. Vielleicht wegen Bayern, das ist auch eine der Farben Bayerns. Wegen dem bayerischen Himmel. Der Himmel ist blau.'}
 ],
 vocab:w([['Schön, dich kennenzulernen!','Hauska tutustua!'],['Das ist ...','Tämä on ...'],['Er heißt ...','Hänen nimensä on (mies)'],['Sie heißt ...','Hänen nimensä on (nainen)'],['Er kommt aus ...','Hän on kotoisin (mies)'],['Sie kommt aus ...','Hän on kotoisin (nainen)'],['Vielen Dank!','Paljon kiitoksia!'],['der Freund','ystävä (mies)'],['die Freundin','ystävä (nainen)'],['blau','sininen'],['ungefähr / um die','noin; suunnilleen'],['kennenlernen','tutustua']]),
 teaching:['Kokoa tervehdys, nimi, kotipaikka, vointi ja hyvästely lyhyeksi keskusteluksi. Kolmannen henkilön esitteleminen onnistuu fraasilla Das ist ... .'],
 grammar:{title:'Esittele toinen henkilö',explanation:'Das ist ... = Tämä on ... . Er heißt ... ja Sie heißt ... tarkoittavat Hän on nimeltään ... . Muista ero kohteliaaseen isolla kirjoitettavaan Sie-sanaan.',examples:[['Das ist Alex.','Tämä on Alex.'],['Er heißt Ben.','Hänen nimensä on Ben.']]},culture:'Tutustumiskäytännöt vaihtelevat tilanteen ja puhuttelusuhteen mukaan. Haraldin lähdetekstissä on leikkisä ja alueellisesti arvottava puheenvuoro Münchenistä: sitä tarkastellaan puhujan mielipiteenä, ei yleispätevänä tosiasiana.',exercises:[]
}
];
export const lessons = [
'Miten LOS! 1:llä opiskellaan?',
'Aloita saksan ääntämisestä','Lue Franzin ja Jörgin keskustelu','Tervehdykset muistista','Kuuntele ja valitse tervehdys','Harjoittele ja testaa C01',
'Miten kysyn nimen?','Franz ja Greta: kokonainen dialogi','Heißen ja sein minä–sinä','Kuuntele ja esittele henkilö','Harjoittele ja testaa C02',
'Maat ja paikat','Berna: alkuperän tunnistaminen','Kommen ja woher','Nicon alkuperä ja karttatehtävät','Harjoittele ja testaa C03',
'Milloin du tai Sie?','Hakemistopuhelun kokonainen teksti','Kohtelias verbinmuoto','Käytä kohteliaisuusfraaseja','Harjoittele ja testaa C04',
'Mitä kuuluu?','Lue vointidialogi','Vointifraasit ja nicht','Kuuntele mieliala ja vastaa','Harjoittele ja testaa C05',
'Muistanko tervehtimisen ja esittäytymisen?','Voinnin ja kohteliaisuuden taitosekoitus','Autenttisen keskustelun kertauskuuntelu','Välikoe: kappaleet 1–5',
'Numerot 0–12','Numerot 13–20 ja ikä','Numerot 21–100: rakenne','Kuuntele ikähaastattelu','Harjoittele ja testaa C06',
'Aakkosten ja nimen kertaus','Lue tavaamiskeskustelu','Tavaa ja ymmärrä numeroita','Kuuntele ja täytä lomake','Harjoittele ja testaa C07',
'Selviytymisfraasit','Luokkatilanteen alkuperäisteksti','Kuuntelustrategiat ja selityspyynnöt','Harjoittele vuorovaikutusta','Harjoittele ja testaa C08',
'Viikonpäivät','Lue Sport und Zeit','Am Montag, um drei Uhr','Kuuntele ja merkitse kalenteriin','Harjoittele ja testaa C09',
'Kokoa esittelyfraasit','Kuuntele Haraldin haastattelu','Esittele kolmas henkilö','Rakenna kaksi keskustelua','Harjoittele ja testaa C10',
'Luvut, tavaaminen ja viikonpäivät','Kaikkien 10 kappaleen taitosekoitus','Täydellinen esittelyharjoitus ilman vihjeitä','Koko kirjan loppukoe','Mitä osaan nyt saksaksi?'
].map((name,index)=>{
 const n=index+1,chapterIndex=n>=2&&n<=26?Math.floor((n-2)/5):n>=31&&n<=55?Math.floor((n-31)/5)+5:-1;
 return {id:'L'+String(n).padStart(3,'0'),name,chapterId:chapterIndex>=0?chapters[chapterIndex]!.id:null,estimate:30,
  section:n===1?'Aloitus':n===30?'Välikoe':n===59?'Loppukoe':n===60?'Yhteenveto':n>=27&&n<=29?'Kertaus I':n>=56&&n<=58?'Kertaus II':chapters[chapterIndex]?.name??'',
  status:n<=30||n===41||n===43||(n>=36&&n<=40)||(n>=46&&n<=56)||n===58||n===60?'initial-material': 'pending' as const};
});
export const allWords=chapters.flatMap(c=>c.vocab.map(word=>({...word,chapterId:c.id})));
export function validateLosContent() {
 const ids=new Set<string>(); const issues:string[]=[];
 for(const chapter of chapters){
  for(const block of chapter.blocks){if(ids.has(block.id))issues.push('Päällekkäinen lohko '+block.id);ids.add(block.id)}
  for(const e of chapter.exercises){if(ids.has(e.id))issues.push('Päällekkäinen tehtävä '+e.id);ids.add(e.id);
    if((e.type==='highlight'||e.type==='find-text')&&!chapter.blocks.some(b=>b.id===e.blockId&&b.text.includes(e.target??'')))issues.push('Virheellinen korostus '+e.id);}
  if(chapter.status==='text-reviewed'&&!chapter.blocks.length)issues.push('Puuttuva teksti '+chapter.id);
 }
 if(lessons.length!==60)issues.push('Oppitunteja ei ole 60');
 return issues;
}
