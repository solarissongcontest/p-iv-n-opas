import type {Exercise} from './content';

const choice=(id:string,prompt:string,options:string[],correct:string,explanation:string):Exercise=>({
 id,type:'choice',prompt,options,correct,explanation,hint:''
});
const fill=(id:string,prompt:string,accepted:string[],explanation:string):Exercise=>({
 id,type:'fill',prompt,accepted,explanation,hint:''
});
const truth=(id:string,prompt:string,correct:'Totta'|'Tarua',explanation:string):Exercise=>({
 id,type:'true-false',prompt,options:['Totta','Tarua'],correct,explanation,hint:''
});
export const c01Exam:Exercise[]=[
 choice('EX-C01-01','Kaksi tuttavaa tapaa toisensa. Miten he voivat tervehtiä?',['Hallo!','Auf Wiedersehen!','Bis später!'],'Hallo!','Hallo! on tuttavallinen tervehdys.'),
 choice('EX-C01-02','Mikä ilmaus sopii hyvän aamun toivotukseen?',['Guten Morgen!','Guten Abend!','Gute Nacht!'],'Guten Morgen!','Guten Morgen on hyvää huomenta.'),
 choice('EX-C01-03','Kellonaika on 19.00 ja tervehdit.',['Guten Abend!','Guten Morgen!','Bis bald!'],'Guten Abend!','Guten Abend on hyvää iltaa.'),
 choice('EX-C01-04','Mikä tarkoittaa hyvää yötä?',['Gute Nacht!','Guten Tag!','Tschüss!'],'Gute Nacht!','Gute Nacht on hyvää yötä.'),
 choice('EX-C01-05','Mikä ilmaus sopii kohteliaaseen hyvästelyyn?',['Auf Wiedersehen!','Hallo!','Ja!'],'Auf Wiedersehen!','Auf Wiedersehen on muodollisempi hyvästely.'),
 choice('EX-C01-06','Mikä tarkoittaa ”nähdään myöhemmin”?',['Bis später!','Bis bald!','Guten Tag!'],'Bis später!','Später tarkoittaa myöhemmin.'),
 choice('EX-C01-07','Miten vastaat myöntävästi?',['Ja.','Nein.','Danke.'],'Ja.','Ja tarkoittaa kyllä.'),
 choice('EX-C01-08','Miten sanot kiitos?',['Danke.','Bitte.','Nein.'],'Danke.','Danke tarkoittaa kiitos.'),
 truth('EX-C01-09','Väite: Tschüss on tyypillisesti tuttavallinen hyvästely.','Totta','Tschüss sopii usein epämuodolliseen hyvästelyyn.'),
 truth('EX-C01-10','Väite: Saksan w ääntyy useimmiten kuten suomen v.','Totta','W vastaa tavallisesti suomen v-äännettä.'),
 truth('EX-C01-11','Väite: saksan kirjain z ääntyy usein kuten suomen s.','Tarua','Z ääntyy ts.'),
 choice('EX-C01-12','Mikä äännearvo vastaa yleensä yhdistelmää ei?',['ai','pitkä i','sh'],'ai','Ei ääntyy yleensä ai.'),
 choice('EX-C01-13','Mikä äännearvo vastaa yleensä yhdistelmää ie?',['pitkä i','ai','ts'],'pitkä i','Ie ääntyy pitkänä i:nä.'),
 fill('EX-C01-14','Täydennä: Guten ____! (Hyvää päivää!)',['Tag'],'Guten Tag! on hyvää päivää.'),
 fill('EX-C01-15','Täydennä: Bis ____! (Nähdään pian!)',['bald'],'Bis bald! tarkoittaa nähdään pian.')
];


export const c02Exam:Exercise[]=[
 choice('EX-C02-01','Mikä kysymys tarkoittaa ”Mikä sinun nimesi on?”',['Wie heißt du?','Woher kommst du?','Wie alt bist du?'],'Wie heißt du?','Wie heißt du kysyy nimeä.'),
 fill('EX-C02-02','Täydennä: Ich ____ Elisa.',['heiße'],'Ich heiße Elisa. Oikeassa muodossa on ß.'),
 fill('EX-C02-03','Täydennä: Du ____ Lukas.',['heißt'],'Heißen-verbin du-muoto on heißt.'),
 choice('EX-C02-04','Mikä on oikea lause?',['Ich bin Emma.','Ich bist Emma.','Ich ist Emma.'],'Ich bin Emma.','Ich bin tarkoittaa minä olen.'),
 choice('EX-C02-05','Miten sanot ”Sinä olet Ben”?',['Du bist Ben.','Du bin Ben.','Du ist Ben.'],'Du bist Ben.','Du bist on sein-verbin du-muoto.'),
 truth('EX-C02-06','Väite: Saksan kielessä ”Ich heißt” on oikein.','Tarua','Minä-muoto on ich heiße, ei ich heißt.'),
 choice('EX-C02-07','Mikä on heißen-verbin minä-muoto?',['heiße','heißt','heißen'],'heiße','Ich heiße on minä olen nimeltäni.'),
 fill('EX-C02-08','Täydennä: ____ ist das? (Kuka tuo on?)',['Wer'],'Wer tarkoittaa kuka.'),
 choice('EX-C02-09','Miten esittelet kaverisi nimeltä Nora?',['Das ist Nora.','Das bist Nora.','Das bin Nora.'],'Das ist Nora.','Das ist ... tarkoittaa Tämä on ... .'),
 choice('EX-C02-10','Miten aloitat tuttavallisen nimen kysymisen?',['Hallo!','Auf Wiedersehen!','Gute Nacht!'],'Hallo!','Hallo on sopiva tuttavallinen tervehdys.'),
 fill('EX-C02-11','Täydennä: Wie ____ du?',['heißt'],'Kysyessäsi nimen käytät muotoa heißt.'),
 choice('EX-C02-12','Kuka kertoo Text A:ssa opettajan nimen Herr Weiß?',['Greta','Franz','Peter'],'Greta','Greta sanoo Ja, er heißt Herr Weiß.'),
 choice('EX-C02-13','Miten sanot oman nimesi vaihtoehtoisella sein-verbin fraasilla?',['Ich bin Mika.','Ich bist Mika.','Du bin Mika.'],'Ich bin Mika.','Ich bin on myös luonteva tapa esitellä itsensä.'),
 fill('EX-C02-14','Kirjoita lauseen puuttuva verbi: Ich ____ Mira. (Olen nimeltäni Mira.)',['heiße'],'Heißen-verbin minä-muoto on heiße.'),
 choice('EX-C02-15','Mikä kysymys on oikein kirjoitettu?',['Wie heißt du?','Wie heiße du?','Wie heißen du?'],'Wie heißt du?','Du-persoona käyttää muotoa heißt.')
];


export const c04Exam:Exercise[]=[
 choice('EX-C04-01','Mikä puhuttelusana on kohtelias te?',['Sie','du','er'],'Sie','Kohtelias te on Sie isolla.'),
 choice('EX-C04-02','Mikä kysymys sopii kohteliaaseen nimen kysymiseen?',['Wie heißen Sie?','Wie heißt Sie?','Wie heißen du?'],'Wie heißen Sie?','Kohteliaan Sie-muodon verbi on heißen.'),
 fill('EX-C04-03','Täydennä kohteliaasti: Woher ____ Sie?',['kommen'],'Woher kommen Sie? kysyy lähtöpaikkaa.'),
 truth('EX-C04-04','Väite: kohtelias Sie kirjoitetaan isolla myös lauseen keskellä.','Totta','Kohtelias Sie kirjoitetaan isolla.'),
 choice('EX-C04-05','Mikä on luonteva puhuttelu läheiselle kaverille?',['du','Sie','Ihnen'],'du','Tuttavaan käytetään yleensä du-muotoa.'),
 choice('EX-C04-06','Mikä on asiallinen tervehdys virallisessa tapaamisessa?',['Guten Tag!','Tschüss!','Gute Nacht!'],'Guten Tag!','Guten Tag sopii asialliseen tervehtimiseen.'),
 fill('EX-C04-07','Täydennä kohtelias nimikysymys: Wie ____ Sie?',['heißen'],'Wie heißen Sie? on oikea kysymys.'),
 choice('EX-C04-08','Kumpi kysymys on tuttavallinen?',['Wie heißt du?','Wie heißen Sie?','Wie geht es Ihnen?'],'Wie heißt du?','Du kertoo tuttavallisesta puhuttelusta.'),
 truth('EX-C04-09','Väite: kaikissa maissa jokaiselle vanhemmalle henkilölle täytyy sanoa Sie.','Tarua','Puhuttelu riippuu myös tilanteesta ja puhujien suhteesta.'),
 choice('EX-C04-10','Miten kysyt kohteliaasti Mitä teille kuuluu?',['Wie geht es Ihnen?','Wie geht es dir?','Wer ist das?'],'Wie geht es Ihnen?','Ihnen on vointikysymyksen kohtelias muoto.'),
 choice('EX-C04-11','Kuka alkuperäisessä Die Geschäftsmänner -dialogissa sanoo Nicht so gut?',['Herr Schmidt','Herr Standish','Karl'],'Herr Schmidt','Herr Schmidt kertoo olevansa väsynyt.'),
 choice('EX-C04-12','Miten Herr Schmidt ja Herr Standish hyvästelevät toisensa?',['Auf Wiedersehen!','Guten Morgen!','Wie heißt du?'],'Auf Wiedersehen!','Molemmat käyttävät kohteliasta hyvästelyä Auf Wiedersehen.'),
 fill('EX-C04-13','Täydennä: Guten ____! (Hyvää päivää!)',['Tag'],'Guten Tag on asiallinen päivätervehdys.'),
 choice('EX-C04-14','Mikä lause on oikein?',['Sie heißen Petra.','Sie heißt Petra.','Sie heiße Petra.'],'Sie heißen Petra.','Kohteliaassa puhuttelussa Sie heißen.'),
 truth('EX-C04-15','Väite: pieni sie voi tarkoittaa hän (naisesta) tai he.','Totta','Pienellä kirjoitettu sie ja kohtelias Sie pitää erottaa kontekstissa.')
];
export const c05Exam:Exercise[]=[
 choice('EX-C05-01','Mikä kysymys tarkoittaa Mitä sinulle kuuluu?',['Wie geht es dir?','Wie heißen Sie?','Wie alt bist du?'],'Wie geht es dir?','Wie geht es dir on tuttavallinen vointikysymys.'),
 choice('EX-C05-02','Mikä sopii vastaukseksi kun voit hyvin?',['Mir geht es gut.','Woher kommst du?','Guten Abend.'],'Mir geht es gut.','Mir geht es gut tarkoittaa että kuuluu hyvää.'),
 fill('EX-C05-03','Täydennä: Mir geht es ____.',['gut'],'Vointifraasissa käytetään gut.'),
 choice('EX-C05-04','Mitä nicht so gut tarkoittaa?',['ei kovin hyvin','erittäin hyvin','hyvää yötä'],'ei kovin hyvin','Nicht kieltää fraasissa nicht so gut.'),
 choice('EX-C05-05','Mikä on kohtelias vointikysymys?',['Wie geht es Ihnen?','Wie geht es dir?','Wer ist das?'],'Wie geht es Ihnen?','Ihnen kuuluu kohteliaaseen vointikysymykseen.'),
 fill('EX-C05-06','Täydennä: Wie geht es ____? (kohtelias)',['Ihnen'],'Kohteliaasti Wie geht es Ihnen?'),
 fill('EX-C05-07','Täydennä: Wie geht es ____? (tuttavallinen)',['dir'],'Tuttavallisesti Wie geht es dir?'),
 choice('EX-C05-08','Miten vastaat ei kovin hyvin?',['Nicht so gut.','Guten Morgen!','Danke schön.'],'Nicht so gut.','Nicht so gut on lyhyt vointivastaus.'),
 truth('EX-C05-09','Väite: sehr vahvistaa ilmaisua, esimerkiksi sehr gut.','Totta','Sehr gut tarkoittaa erittäin hyvin.'),
 choice('EX-C05-10','Mitä Ich bin müde tarkoittaa?',['Olen väsynyt.','Olen iloinen.','Olen suomalainen.'],'Olen väsynyt.','Müde tarkoittaa väsynyt.'),
 choice('EX-C05-11','Mitä tarkoittaa Und dir?',['Entä sinulle?','Nähdään pian!','Miten nimesi kirjoitetaan?'],'Entä sinulle?','Und dir on tuttavallinen vastakysymys.'),
 choice('EX-C05-12','Mitä tarkoittaa Und Ihnen?',['Entä teille?','Entä minulle?','Mistä olette kotoisin?'],'Entä teille?','Und Ihnen on kohtelias vastakysymys.'),
 truth('EX-C05-13','Väite: mir-, dir- ja Ihnen-muotojen koko sijataivutus vaaditaan jo tässä kappaleessa.','Tarua','Tässä opiskellaan käyttövalmiit vointifraasit.'),
 choice('EX-C05-14','Miten alkuperäinen Heinrichin ja Karlin keskustelu päättyy?',['Auf Wiedersehen!','Wie alt bist du?','Woher kommen Sie?'],'Auf Wiedersehen!','Molemmat hyvästelevät sanoilla Auf Wiedersehen.'),
 fill('EX-C05-15','Täydennä: Sehr ____! (Erittäin hyvin!)',['gut'],'Sehr gut on erittäin hyvin.')
];


export const c03Exam:Exercise[]=[
 choice('EX-C03-01','Mikä tarkoittaa mistä?',['woher','wo','wer'],'woher','Woher tarkoittaa mistä, wo missä.'),
 choice('EX-C03-02','Mikä kysymys tarkoittaa Mistä olet kotoisin?',['Woher kommst du?','Wie heißt du?','Wie geht es dir?'],'Woher kommst du?','Woher kommst du kysyy lähtöpaikkaa.'),
 fill('EX-C03-03','Täydennä: Ich ____ aus Finnland.',['komme'],'Ich komme on tulla-verbin minä-muoto.'),
 fill('EX-C03-04','Täydennä: Woher ____ du?',['kommst'],'Du kommst on kommen-verbin sinä-muoto.'),
 choice('EX-C03-05','Mikä on Saksa saksaksi?',['Deutschland','Schweden','Österreich'],'Deutschland','Deutschland tarkoittaa Saksaa.'),
 choice('EX-C03-06','Mikä on Itävalta saksaksi?',['Österreich','Finnland','Estland'],'Österreich','Österreich on Itävalta.'),
 choice('EX-C03-07','Mikä ilmaus on oikein Sveitsistä?',['aus der Schweiz','aus die Schweiz','aus Schweiz'],'aus der Schweiz','Sveitsi tarvitsee tässä fraasin aus der Schweiz.'),
 truth('EX-C03-08','Väite: wo ja woher tarkoittavat samaa asiaa.','Tarua','Wo on missä, woher mistä.'),
 choice('EX-C03-09','Minkä maan Berna mainitsee alkuperäisessä haastattelussa?',['Deutschland','Österreich','Schweden'],'Deutschland','Berna sanoo Ich komme aus Deutschland.'),
 choice('EX-C03-10','Mistä kaupungista Berna kertoo olevansa?',['Kiel','Berlin','Hamburg'],'Kiel','Berna sanoo Ich komme aus Kiel.'),
 choice('EX-C03-11','Mikä on Ruotsi saksaksi?',['Schweden','Finnland','Deutschland'],'Schweden','Schweden tarkoittaa Ruotsia.'),
 fill('EX-C03-12','Täydennä: Ich komme ____ Deutschland.',['aus'],'Aus ilmaisee lähtöpaikan: Ich komme aus Deutschland.'),
 choice('EX-C03-13','Mikä lause on oikein?',['Ich komme aus Finnland.','Ich kommst aus Finnland.','Ich kommt aus Finnland.'],'Ich komme aus Finnland.','Ich komme käyttää kommen-verbin minä-muotoa.'),
 truth('EX-C03-14','Väite: saksa ja suomi ovat saman maan nimiä.','Tarua','Deutschland tarkoittaa Saksaa ja Finnland Suomea.'),
 fill('EX-C03-15','Täydennä: Woher kommst ____?',['du'],'Woher kommst du? on tuttavallinen lähtöpaikkakysymys.')
];


export const c07Exam:Exercise[]=[
 choice('EX-C07-01','Mikä ilmaus kysyy kirjoitusasua?',['Wie schreibt man das?','Wie geht es dir?','Woher kommst du?'],'Wie schreibt man das?','Wie schreibt man das? tarkoittaa Miten se kirjoitetaan?'),
 choice('EX-C07-02','Mikä on kohtelias tavaamispyyntö?',['Bitte buchstabieren Sie.','Wie alt bist du?','Ich bin müde.'],'Bitte buchstabieren Sie.','Bitte buchstabieren Sie. on kohtelias pyyntö.'),
 fill('EX-C07-03','Täydennä: Bitte ____ Sie.',['buchstabieren'],'Kohtelias tavaamispyyntö kuuluu Bitte buchstabieren Sie.'),
 choice('EX-C07-04','Miten voit kirjoittaa ä-kirjaimen teknisenä korvausmerkintänä?',['ae','aa','ea'],'ae','Tekninen korvike ä → ae.'),
 choice('EX-C07-05','Miten voit kirjoittaa ö-kirjaimen teknisenä korvausmerkintänä?',['oe','eo','oo'],'oe','Tekninen korvike ö → oe.'),
 choice('EX-C07-06','Miten voit kirjoittaa ü-kirjaimen teknisenä korvausmerkintänä?',['ue','eu','uu'],'ue','Tekninen korvike ü → ue.'),
 truth('EX-C07-07','Väite: ß ja B ovat sama kirjain saksassa.','Tarua','ß (Eszett) vastaa s-äännettä, ei B-kirjainta.'),
 choice('EX-C07-08','Kuka pyytää alkuperäisessä numeropalvelun tekstissä Franzia tavaamaan?',['Auskunft','Franz','Claudia'],'Auskunft','Auskunft sanoo Bitte buchstabieren Sie.'),
 choice('EX-C07-09','Mikä on alkuperäisessä puheludialogissa mainittu nimi?',['Claudia Bolliger','Greta Schmidt','Berna Standish'],'Claudia Bolliger','Franz kysyy Frau Claudia Bolligerin numeroa; oikeaa numeroa ei tässä käsitellä.'),
 fill('EX-C07-10','Täydennä kohtelias kysymys: Wie ____ man das?',['schreibt'],'Wie schreibt man das? kysyy kirjoitusasua.'),
 choice('EX-C07-11','Mikä tarkoittaa twice eli kahdesti?',['zweimal','wiedersehen','gestern'],'zweimal','Zweimal tarkoittaa kahdesti.'),
 choice('EX-C07-12','Mikä on jo opetetun sanan Frau artikkeli perusmuodossa?',['die','der','das'],'die','Opitun substantiivin muoto on die Frau.'),
 choice('EX-C07-13','Mikä on opitun sanan Name sanakirja-artikkeli?',['der','die','das'],'der','Der Name on nimi.'),
 truth('EX-C07-14','Väite: alkuperäisen nimen tavaamisharjoituksen yhteydessä opiskelijan pitää antaa oma oikea puhelinnumeronsa.','Tarua','Oppikirjassa käytetään kuvitteellisia nimiä, eikä henkilökohtaisia puhelinnumeroita kerätä.'),
 fill('EX-C07-15','Täydennä: Noch einmal, ____! (Vielä kerran, kiitos!)',['bitte'],'Noch einmal, bitte! on valmis kohtelias toistopyyntö.')
];


export const c09Exam:Exercise[]=[
 choice('EX-C09-01','Miten sanot maanantai saksaksi?',['Montag','Mittwoch','Sonntag'],'Montag','Montag tarkoittaa maanantaita.'),
 choice('EX-C09-02','Mikä viikonpäivä on Donnerstag?',['torstai','tiistai','sunnuntai'],'torstai','Donnerstag on torstai.'),
 choice('EX-C09-03','Mikä viikonpäivä on Sonntag?',['sunnuntai','lauantai','maanantai'],'sunnuntai','Sonntag tarkoittaa sunnuntaita.'),
 choice('EX-C09-04','Miten sanot keskiviikko saksaksi?',['Mittwoch','Donnerstag','Freitag'],'Mittwoch','Mittwoch on keskiviikko.'),
 fill('EX-C09-05','Täydennä: ____ Montag. (Maanantaina.)',['am'],'Am Montag on viikonpäivän ilmaus.'),
 fill('EX-C09-06','Täydennä: ____ drei Uhr. (Kello kolme.)',['um'],'Um kolme Uhr ei ole saksaa; sanotaan um drei Uhr.'),
 choice('EX-C09-07','Mikä tarkoittaa perjantaina?',['am Freitag','um Freitag','auf Freitag'],'am Freitag','Am Freitag on perjantaina.'),
 choice('EX-C09-08','Miten sanot kello neljä?',['um vier Uhr','am vier Uhr','am Donnerstag'],'um vier Uhr','Um vier Uhr on kello neljä.'),
 choice('EX-C09-09','Miten yhdistät maanantain ja kello kolme?',['Am Montag um drei Uhr.','Um Montag am drei Uhr.','Am drei um Montag.'],'Am Montag um drei Uhr.','Am + viikonpäivä, um + kellonaika.'),
 choice('EX-C09-10','Mikä on saksan sana huomenna?',['morgen','heute','wann'],'morgen','Morgen on tässä huomenna; heute on tänään.'),
 choice('EX-C09-11','Mikä on saksan sana milloin?',['wann','wo','wie'],'wann','Wann? kysyy aikaa.'),
 truth('EX-C09-12','Väite: viikonpäivät kirjoitetaan saksassa substantiiveina isolla alkukirjaimella.','Totta','Montag, Dienstag ja muut viikonpäivät kirjoitetaan isolla.'),
 choice('EX-C09-13','Mitä tarkoittaa Viertel vor drei, jonka Greta sanoo?',['varttia vaille kolme','varttia yli kolme','tasaltaan kolme'],'varttia vaille kolme','Lähdetekstin Viertel vor drei tarkoittaa 14.45. Tämä on tunnistuskysymys, ei koko varttiaikalukujen tuottaminen.'),
 choice('EX-C09-14','Kuka kertoo alkuperäisessä Franz–Greta-dialogissa pelaavansa kolmelta jalkapalloa?',['Franz','Greta','Jörg'],'Franz','Franz sanoo Ich spiele um drei Fußball.'),
 fill('EX-C09-15','Täydennä: Am Dienstag ____ vier Uhr.',['um'],'Am Dienstag um vier Uhr. on tiistaina kello neljä.')
];


/** Twenty new auto-graded questions. These are not lifted from the earlier
 * midterm/final banks; no answer keys are shown before whole-paper submit.
 */
export const c10Exam:Exercise[]=[
 choice('EX-C10-01','Miten tervehdit tuttavaa?',['Hallo!','Auf Wiedersehen!','Gute Nacht!'],'Hallo!','Hallo! on tavallinen tuttavallinen tervehdys.'),
 choice('EX-C10-02','Miten kysyt ystäväsi nimeä?',['Wie heißt du?','Woher kommen Sie?','Wie spät ist es?'],'Wie heißt du?','Wie heißt du kysyy nimeä.'),
 choice('EX-C10-03','Mikä on alkuperäisen C10-haastattelun päähenkilön nimi?',['Harald Becker','Jörg Müller','Karl Standish'],'Harald Becker','Harald vastaa Ich heiße Harald Becker.'),
 choice('EX-C10-04','Mistä kaupungista Harald sanoo olevansa alun perin?',['München','Kiel','Wien'],'München','Harald sanoo Ich komme ursprünglich aus München.'),
 choice('EX-C10-05','Mikä on Haraldin alkuperäisessä haastattelussa mainittu lempiväri?',['blau','rot','grün'],'blau','Harald vastaa Blau.'),
 choice('EX-C10-06','Miten Harald ilmaisee ikänsä haastattelussa?',['noin viisikymmentä','täsmälleen kolmekymmentä','täsmälleen kaksikymmentä'],'noin viisikymmentä','So um die fünfzig on suunnilleen viisikymmentä.'),
 choice('EX-C10-07','Mistä kaupungista Berna kertoo olevansa?',['Kiel','München','Hamburg'],'Kiel','Bernan alkuperäinen haastattelu kertoo Ich komme aus Kiel.'),
 choice('EX-C10-08','Mikä on Bernan alkuperäisessä haastattelussa mainittu lempiväri?',['rot','blau','gelb'],'rot','Berna kertoo värin rot, kun taas Haraldin lempiväri on blau.'),
 choice('EX-C10-09','Mikä on kohtelias nimikysymys?',['Wie heißen Sie?','Wie heißt du?','Du heißen Sie?'],'Wie heißen Sie?','Kohtelias Sie vaatii muodon heißen.'),
 choice('EX-C10-10','Miten kysyt tutulta vointia?',['Wie geht es dir?','Wie heißen Sie?','Woher kommst du?'],'Wie geht es dir?','Wie geht es dir on tuttavallinen vointikysymys.'),
 choice('EX-C10-11','Miten esittelet henkilön, jonka nimi on Ben?',['Das ist Ben.','Ich ist Ben.','Sie komme Ben.'],'Das ist Ben.','Das ist Ben. esittelee kolmannen henkilön.'),
 fill('EX-C10-12','Täydennä: Er ____ Olli. (Hän on nimeltään Olli.)',['heißt'],'Er heißt kertoo kolmannen henkilön nimen.'),
 fill('EX-C10-13','Täydennä: Sie ____ aus Finnland. (Hän tulee Suomesta.)',['kommt'],'Sie kommt aus Finnland.'),
 truth('EX-C10-14','Väite: kohtelias Sie kirjoitetaan isolla alkukirjaimella myös keskellä virkettä.','Totta','Kohtelias Sie erotetaan pienellä kirjoitetusta sie-sanasta.'),
 choice('EX-C10-15','Mikä tarkoittaa ”Hauska tutustua!”?',['Schön, dich kennenzulernen!','Gute Nacht!','Es ist spät.'],'Schön, dich kennenzulernen!','Schön, dich kennenzulernen on opittu käyttöfraasi, ei suora sitaatti Haraldin haastattelusta.'),
 choice('EX-C10-16','Miten sanot maanantaina kello kolme?',['Am Montag um drei Uhr.','Um Montag am drei Uhr.','Am drei Uhr Montag.'],'Am Montag um drei Uhr.','Am kertoo viikonpäivän, um kertoo kellonajan.'),
 fill('EX-C10-17','Täydennä: Wie ____ man das? (Miten se kirjoitetaan?)',['schreibt'],'Wie schreibt man das on kirjoitusasun kysymys.'),
 choice('EX-C10-18','Mitä Haraldin oma kommentti Münchenin ”sivistyneestä osasta” ilmaisee?',['puhujan leikillisen mielipiteen','kaikkien saksalaisten yhteisen faktan','ettei München sijaitse Saksassa'],'puhujan leikillisen mielipiteen','Haastattelijan alueellinen heitto ei ole yleispätevä väite muista alueista.'),
 truth('EX-C10-19','Väite: Bernan ja Haraldin alkuperäiset haastattelut ovat eri puhujien tekstejä.','Totta','C03:n Berna ja C10:n Harald ovat kaksi eri henkilöä.'),
 choice('EX-C10-20','Mikä sopii kohteliaaksi hyvästelyksi uuden opettajan kanssa?',['Auf Wiedersehen!','Wie alt bist du?','Ich komme aus Wien.'],'Auf Wiedersehen!','Auf Wiedersehen on kohtelias hyvästely.')
];


/** Independently authored age/numeral assessment, grounded in Janicka's
 * four published dialogs and the A1 numeral model. The ZPE recording itself
 * has not been verified for in-app playback, so this exam has no audio claims.
 */
export const c06Exam:Exercise[]=[
 choice('EX-C06-01','Miten kysyt tuttavan ikää saksaksi?',['Wie alt bist du?','Wie heißt du?','Woher kommst du?'],'Wie alt bist du?','Wie alt bist du? kysyy ikää.'),
 fill('EX-C06-02','Täydennä ikälause: Ich ____ sechzehn Jahre alt.',['bin'],'Ikä ilmaistaan sein-verbillä: Ich bin ... Jahre alt.'),
 choice('EX-C06-03','Mikä saksan luku tarkoittaa 12?',['zwölf','zwei','zwanzig'],'zwölf','Zwölf on kaksitoista.'),
 fill('EX-C06-04','Kirjoita 16 saksaksi yhtenä sanana.',['sechzehn'],'Sechzehn kirjoitetaan ilman kuuden pitkää loppua.'),
 fill('EX-C06-05','Kirjoita 17 saksaksi yhtenä sanana.',['siebzehn'],'Siebzehn ei ole siebenzehn.'),
 choice('EX-C06-06','Mikä vastaa lukua 19?',['neunzehn','neunzig','neun'],'neunzehn','Neunzehn on yhdeksäntoista.'),
 choice('EX-C06-07','Mikä vastaa lukua 20?',['zwanzig','zwölf','zwei'],'zwanzig','Zwanzig on kaksikymmentä.'),
 fill('EX-C06-08','Kirjoita 21 saksaksi.',['einundzwanzig'],'Ykköset ja und ennen kymmeniä; eins lyhenee ein.'),
 choice('EX-C06-09','Mikä on 30 saksaksi?',['dreißig','dreizehn','dreiundzwanzig'],'dreißig','Dreißig kirjoitetaan ß-kirjaimella.'),
 fill('EX-C06-10','Kirjoita 32 saksaksi.',['zweiunddreißig'],'Zweiunddreißig: zwei + und + dreißig.'),
 choice('EX-C06-11','Mikä on 60 saksaksi?',['sechzig','sechszehn','sechzehn'],'sechzig','Sechzig on kuusikymmentä.'),
 choice('EX-C06-12','Mikä on 70 saksaksi?',['siebzig','siebenzig','siebzehn'],'siebzig','Siebzig on seitsemänkymmentä.'),
 truth('EX-C06-13','Väite: saksaksi voi sanoa iän muodolla Ich habe zwölf Jahre alt.','Tarua','Oikea ikälause on Ich bin zwölf Jahre alt.'),
 choice('EX-C06-14','Kuka on Janickan tekstin toisen alkuperäisen minidialogin 12-vuotias henkilö?',['Larissa','Oskar','Fabian'],'Larissa','Larissa vastaa Ich bin schon zwölf Jahre alt.'),
 choice('EX-C06-15','Mikä on ensimmäisessä alkuperäisessä minidialogissa näkyvän Oskarin ikä?',['fünf','neun','zwölf'],'fünf','Lähdesivun Transkription-versiossa ensimmäinen vastaaja sanoo Ich bin fünf.'),
 choice('EX-C06-16','Miten kolmannen alkuperäisen minidialogin kaksi puhujaa ilmaisevat ikänsä?',['Wir sind 10.','Ich bin zwölf.','Er ist fünf.'],'Wir sind 10.','Julkaistun dialogin vastaaja B+C sanoo Wir sind 10.'),
 choice('EX-C06-17','Miten neljännen alkuperäisen minidialogin Paulin ikä ilmoitetaan?',['Er ist elf Jahre alt.','Er ist neun Jahre alt.','Er bin elf Jahre alt.'],'Er ist elf Jahre alt.','Viimeisessä dialogissa vastataan Paul? Er ist elf Jahre alt.'),
 fill('EX-C06-18','Täydennä tutun monikon kysymys: Wie alt ____ ihr?',['seid'],'Saksan ihr-pronominin sein-muoto on seid.'),
 choice('EX-C06-19','Mikä on 100 saksaksi?',['einhundert','einhundertund','einhunderteins'],'einhundert','Einhundert on sata. Sana hundert sopii myös itsenäisesti.'),
 truth('EX-C06-20','Väite: Janickan C06-lähdeteksti koostuu neljästä erillisestä julkaistusta ikäminidialogista.','Totta','ZPE:n Sag mal, wie alt bist du? -tekstin Transkription-osassa on neljä minidialogia.')
];


/** C08 source-specific final review: Magdalena Sieradz's human-written 12-turn
 * German-class chat. Two independent human-recorded pronunciation samples
 * are NOT misrepresented as an audio version of this written chat.
 */
export const c08Exam:Exercise[]=[
 choice('EX-C08-01','Miten sanot ”En ymmärrä” saksaksi?',['Ich verstehe nicht.','Ich heiße nicht.','Ich komme nicht.'],'Ich verstehe nicht.','Ich verstehe nicht on opittu erillinen selviytymisfraasi.'),
 choice('EX-C08-02','Miten pyydät kuulemaan asian vielä kerran?',['Noch einmal, bitte!','Wie alt bist du?','Gute Nacht!'],'Noch einmal, bitte!','Noch einmal, bitte! on valmis toistopyyntö.'),
 choice('EX-C08-03','Miten pyydät hitaampaa puhetta?',['Bitte langsamer.','Bitte schneller.','Wie heißt du?'],'Bitte langsamer.','Bitte langsamer tarkoittaa hitaammin, kiitos.'),
 choice('EX-C08-04','Millä kysymyksellä pyydät sanan merkitystä?',['Was bedeutet das?','Wann kommen Sie?','Wie alt seid ihr?'],'Was bedeutet das?','Was bedeutet das? on Mitä se tarkoittaa?'),
 choice('EX-C08-05','Mikä on kohtelias toistopyyntö?',['Können Sie das bitte wiederholen?','Du kann das wiederholen?','Wie heißt du?'],'Können Sie das bitte wiederholen?','Können Sie ...? käyttää kohteliasta puhuttelua.'),
 fill('EX-C08-06','Täydennä fraasi: Ich verstehe ____.',['nicht'],'Ich verstehe nicht = En ymmärrä.'),
 fill('EX-C08-07','Täydennä: Noch ____, bitte!',['einmal'],'Noch einmal, bitte! = Vielä kerran, kiitos.'),
 choice('EX-C08-08','Kumpi kertoo alkuperäisessä Sieradzin chatissa saksantunnin olleen hieno?',['Leo','Fabian','Larissa'],'Leo','Leo kertoo Ich hatte heute wieder Deutschunterricht und es war toll!'),
 choice('EX-C08-09','Mitä Fabian kertoo koulukeskustelussa opiskelevansa samoin menetelmin?',['Englisch','Spanisch','Schwedisch'],'Englisch','Fabian mainitsee Englischunterricht.'),
 choice('EX-C08-10','Mikä alkuperäisen chatin lause kertoo, että dialogit ovat helppoja?',['Die Dialoge sind leicht.','Die Dialoge sind schwierig.','Die Dialoge sind blau.'],'Die Dialoge sind leicht.','Leo sanoo suoraan Die Dialoge sind leicht.'),
 truth('EX-C08-11','Väite: alkuperäisessä kouluchatissa oppilaat vain kuuntelevat, eivät kirjoita tekstejä.','Tarua','Leo kertoo myös lyhyiden tekstien kirjoittamisesta ja ääneen lukemisesta.'),
 choice('EX-C08-12','Minkä tarkistamisesta Leo kertoo opettajan huolehtivan?',['sanojen oikeasta ääntämisestä','oppilaiden puhelinnumeroista','lippujen hinnoista'],'sanojen oikeasta ääntämisestä','Die Lehrerin prüft, ob wir die Wörter richtig aussprechen.'),
 choice('EX-C08-13','Mitkä laitteet mainitaan alkuperäisen chatin interaktiivisissa tehtävissä?',['Tablets und Smartphones','Fernseher und Radios','Autos und Fahrräder'],'Tablets und Smartphones','Tekstissä mainitaan tabletit ja älypuhelimet.'),
 fill('EX-C08-14','Täydennä kertausverbi: Können Sie das bitte ____?',['wiederholen'],'Wiederholen tarkoittaa toistaa. Tässä sitä käytetään kokonaisena kohteliaana fraasina.'),
 truth('EX-C08-15','Väite: Sieradzin alkuperäinen chat-teksti ja erillinen Timwin Ich verstehe nicht -äänite ovat saman keskustelun teksti ja äänitys.','Tarua','Ne ovat eri julkaisijoiden aineistoja. Äänite on erillinen yhden fraasin ääntämisnäyte.')
];
