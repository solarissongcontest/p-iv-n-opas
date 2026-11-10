import type {ChapterId,Exercise} from './content';

const pick=(id:string,prompt:string,choices:string[],correct:string,why:string,hint='Palaa kieliopin mallilauseeseen.'):Exercise=>
 ({id,type:'choice',prompt,options:choices,correct,explanation:why,hint});
const fill=(id:string,prompt:string,accepted:string[],why:string,hint='Mieti opetettua fraasia.'):Exercise=>
 ({id,type:'fill',prompt,accepted,explanation:why,hint});
const translate=(id:string,prompt:string,accepted:string[],why:string,hint='Hyödynnä kappaleen esimerkkilauseita.'):Exercise=>
 ({id,type:'translate',prompt,accepted,explanation:why,hint});
const truth=(id:string,prompt:string,correct:'Totta'|'Tarua',why:string,hint='Vertaa oppikirjan sääntöön.'):Exercise=>
 ({id,type:'true-false',prompt,options:['Totta','Tarua'],correct,explanation:why,hint});
const order=(id:string,prompt:string,words:string[],why:string,hint='Aloita opettamasi rakenteen ensimmäisestä sanasta.'):Exercise=>
 ({id,type:'ordering',prompt,order:words,explanation:why,hint});
const write=(id:string,prompt:string,model:string,criteria:string):Exercise=>
 ({id,type:'writing',prompt,explanation:'Mallisuoritus: '+model+' Itsearviointi: '+criteria,hint:'Voit katsoa sanastoa ja mallilauseita ennen kuin aloitat.'});
const say=(id:string,prompt:string,model:string):Exercise=>
 ({id,type:'speech',prompt,explanation:'Mallisuoritus: '+model+'. Kuuntele oma äänitys ja arvioi rauhallinen, ymmärrettävä ääntäminen. Automaattista arvosanaa ei anneta.',hint:'Voit toistaa fraasin useita kertoja.'});

export const supplementaryExercises:Partial<Record<ChapterId,Exercise[]>>={
 C02:[
  pick('C02-X01','Mikä on oikea kysymys kaverin nimestä?',['Wie heißt du?','Wie bist du?','Woher du?'],'Wie heißt du?','Nimi kysytään fraasilla Wie heißt du?'),
  fill('C02-X02','Täydennä: Du ____ Otto.', ['heißt'],'Du heißt Otto. Du-persoona saa heißen-verbissä muodon heißt.'),
  fill('C02-X03','Täydennä: Ich ____ Anna.', ['bin'],'Ich bin Anna. Sein-verbin minä-muoto on bin.'),
  pick('C02-X04','Kumpi lause esittelee toisen henkilön?',['Das ist Lena.','Ich bin Lena.','Wie heißt du?'],'Das ist Lena.','Das ist ... = Tämä on ...'),
  truth('C02-X05','Väite: Ich heißt on oikea tapa sanoa oma nimi.','Tarua','Oikea muoto on Ich heiße.'),
  order('C02-X06','Järjestä kysymys: Mikä nimesi on?',['Wie','heißt','du?'],'Wie heißt du? on sanajärjestys.'),
  translate('C02-X07','Kirjoita saksaksi ”Olen nimeltäni Max.”',['Ich heiße Max.','Ich heiße Max'],'Ich heiße Max. Huomaa ß-kirjain.'),
  fill('C02-X08','Täydennä: Du ____ mein Freund. (Sinä olet ystäväni.)',['bist'],'Du bist käyttää sein-verbin du-muotoa. Tässä harjoitellaan vain sitä muotoa.'),
  say('C02-X09','Sano tervehdyksen jälkeen ”Olen nimeltäni Alex. Mikä sinun nimesi on?”','Hallo! Ich heiße Alex. Wie heißt du?'),
 ],
 C03:[
  pick('C03-X01','Mitä woher tarkoittaa?',['mistä','missä','milloin'],'mistä','Woher kysyy alkuperää. Wo kysyy sijaintia.'),
  fill('C03-X02','Täydennä: Ich ____ aus Finnland.',['komme'],'Ich komme aus Finnland. Ich-verbinmuoto on komme.'),
  fill('C03-X03','Täydennä: Woher ____ du?',['kommst'],'Du kommst ja Woher kommst du?'),
  pick('C03-X04','Mikä kysymys tarkoittaa ”Mistä olet kotoisin?”',['Woher kommst du?','Wo bist du?','Wie heißt du?'],'Woher kommst du?','Woher kommst du? = Mistä tulet?'),
  pick('C03-X05','Mikä ilmaus on oikein Sveitsistä tultaessa?',['aus der Schweiz','aus Schweiz','aus die Schweiz'],'aus der Schweiz','Sveitsi on poikkeus: aus der Schweiz. Tässä opetellaan valmis fraasi eikä datiivin taivutusta.'),
  truth('C03-X06','Väite: Deutschland tarkoittaa Saksaa.','Totta','Deutschland on Saksa.'),
  order('C03-X07','Järjestä: ”Olen Suomesta.”',['Ich','komme','aus','Finnland.'],'Ich komme aus Finnland on oikea lause.'),
  translate('C03-X08','Kirjoita saksaksi ”Olen Itävallasta.”',['Ich komme aus Österreich.','Ich komme aus Österreich'],'Itävalta on Österreich, ja tarvitaan aus.'),
  write('C03-X09','Esittele kuvitteellinen henkilö, joka on kotoisin Berliinistä. Kerro nimi ja lähtöpaikka.','Ich heiße Lea. Ich komme aus Berlin.','Onko ich heiße -rakenne ja ich komme aus -rakenne mukana?'),
  say('C03-X10','Kysy ääneen uudelta tuttavalta, mistä hän tulee.','Woher kommst du?'),
 ],
 C04:[
  pick('C04-X01','Kumpi pronomini on kohtelias puhuttelu?',['Sie','du','sie (pienellä)'],'Sie','Kohtelias te = Sie aina isolla.'),
  fill('C04-X02','Täydennä: Wie ____ Sie? (Mikä Teidän nimenne on?)',['heißen'],'Sie heißen. Saksan ß säilyy.'),
  truth('C04-X03','Väite: pelkkä ikä määrittää kaikissa tilanteissa sinutellaanko vai teititelläänkö.','Tarua','Puhuttelu määräytyy myös tilanteesta, suhteesta ja paikallisesta tavasta.'),
  order('C04-X04','Järjestä kohtelias kysymys: Mistä olette kotoisin?',['Woher','kommen','Sie?'],'Woher kommen Sie?'),
  pick('C04-X05','Mikä ilmaus sopii kohteliaaseen hyvästelyyn?',['Auf Wiedersehen!','Na ja?','Wie heißt du?'],'Auf Wiedersehen!','Auf Wiedersehen on muodollinen hyvästely.'),
  write('C04-X06','Kirjoita kaksi vastakkaista nimen kysymistä: ensin tuttavallisesti, sitten kohteliaasti.','Wie heißt du? Wie heißen Sie?','Onko du-muoto heißt ja Sie-muoto heißen?'),
 ],
 C05:[
  pick('C05-X01','Miten voit kysyä vointia tuttavalta?',['Wie geht es dir?','Wie alt bist du?','Woher kommst du?'],'Wie geht es dir?','Wie geht es dir? tarkoittaa mitä sinulle kuuluu.'),
  fill('C05-X02','Täydennä: Mir geht es ____. (Minulle kuuluu hyvää.)',['gut'],'Mir geht es gut on yleinen vastaus.'),
  pick('C05-X03','Mitä nicht so gut tarkoittaa?',['ei kovin hyvin','hyvää päivää','iloista huomenta'],'ei kovin hyvin','Nicht kieltää ja so gut tarkoittaa niin hyvin.'),
  truth('C05-X04','Väite: Vointifraasien mir ja dir koko sijamuoto-oppi täytyy osata jo tässä vaiheessa.','Tarua','Nämä opetellaan tässä vaiheessa kokonaisina fraaseina.'),
  order('C05-X05','Järjestä: Mitä sinulle kuuluu?',['Wie','geht','es','dir?'],'Wie geht es dir? on kysymys.'),
  translate('C05-X06','Kirjoita saksaksi ”Erittäin hyvin.”',['Sehr gut.','Sehr gut'],'Sehr gut on erittäin hyvin.'),
  fill('C05-X07','Täydennä kohteliaasti: Wie geht es ____?',['Ihnen'],'Kohteliaassa vointikysymyksessä käytetään Ihnen.'),
  pick('C05-X08','Mikä vastaus kertoo, että olet väsynyt?',['Ich bin müde.','Ich heiße Max.','Guten Tag!'],'Ich bin müde.','Müde tarkoittaa väsynyt.'),
  write('C05-X09','Kirjoita lyhyt kolmen repliikin vointikeskustelu kahdelle kuvitteelliselle henkilölle.','A: Hallo! Wie geht es dir? B: Gut, danke. Und dir? A: Mir geht es gut.','Molemmat tervehtivät tai reagoivat, ja vointikysymykseen vastataan.'),
  say('C05-X10','Kysy ääneen kohteliaasti mitä toiselle kuuluu ja vastaa esimerkillä.','Wie geht es Ihnen? Mir geht es gut.'),
 ],
 C06:[
  pick('C06-X01','Mikä on numero seitsemän saksaksi?',['sieben','sechs','siebzehn'],'sieben','Sieben = 7, siebzehn = 17.'),
  fill('C06-X02','Täydennä 16 saksaksi: ____',['sechzehn'],'Sechzehn = 16, ilman toista s-kirjainta.'),
  fill('C06-X03','Täydennä 17 saksaksi: ____',['siebzehn'],'Siebzehn = 17. Sana ei ole siebenzehn.'),
  pick('C06-X04','Miten sanotaan 20?',['zwanzig','zwölf','zwei'],'zwanzig','Zwanzig on 20.'),
  pick('C06-X05','Miten sanotaan 21?',['einundzwanzig','zwanzigeins','einszwanzig'],'einundzwanzig','Saksan yhdysluvuissa ykkönen + und + kymmenet. Eins muuttuu ein-muotoon.'),
  fill('C06-X06','Kirjoita numero 13 saksaksi.',['dreizehn'],'Dreizehn on 13.'),
  fill('C06-X07','Kirjoita numero 19 saksaksi.',['neunzehn'],'Neunzehn on 19.'),
  pick('C06-X08','Miten kysyt toisen ikää tuttavallisesti?',['Wie alt bist du?','Wie heißt du?','Woher kommst du?'],'Wie alt bist du?','Wie alt bist du? = Kuinka vanha olet?'),
  fill('C06-X09','Täydennä: Ich ____ siebzehn Jahre alt.',['bin'],'Saksassa iän ilmaisu käyttää sein-verbiä: Ich bin ... Jahre alt.'),
  order('C06-X10','Järjestä: Olen 18-vuotias.',['Ich','bin','achtzehn','Jahre','alt.'],'Ich bin achtzehn Jahre alt.'),
  pick('C06-X11','Miten sanotaan 32?',['zweiunddreißig','dreiundzwanzig','dreißigzwei'],'zweiunddreißig','32 on zwei-und-dreißig.'),
  pick('C06-X12','Mikä on 40 saksaksi?',['vierzig','vierzehn','vierundzwanzig'],'vierzig','Vierzig = 40.'),
  pick('C06-X13','Mikä on 30 saksaksi?',['dreißig','dreizehn','dreiundzehn'],'dreißig','Dreißig = 30.'),
  truth('C06-X14','Väite: Saksaksi ikä sanotaan ”Ich habe siebzehn Jahre”.','Tarua','Ikä ilmaistaan sein-verbillä: Ich bin siebzehn Jahre alt.'),
  write('C06-X15','Kirjoita kuvitteellisten henkilöiden ikä: Lisa 16 ja Ben 20.','Lisa ist sechzehn Jahre alt. Ben ist zwanzig Jahre alt.','Tunnistatko sein-verbin kolmannen persoonan muodon ist? Se on aiemmin esitelty tunnistettavana.'),
  say('C06-X16','Sano ääneen numerot 0–10 saksaksi järjestyksessä.','null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn'),
 ],
 C07:[
  pick('C07-X01','Mitä ”Wie schreibt man das?” tarkoittaa?',['Miten se kirjoitetaan?','Mitä kuuluu?','Mistä olet kotoisin?'],'Miten se kirjoitetaan?','Schreiben = kirjoittaa.'),
  fill('C07-X02','Täydennä kohtelias pyyntö: Bitte ____ Sie.',['buchstabieren'],'Bitte buchstabieren Sie = Tavatkaa, olkaa hyvä.'),
  pick('C07-X03','Mitä umlaut-merkkiä sana München sisältää?',['ü','ö','ä'],'ü','München kirjoitetaan ü:llä.'),
  truth('C07-X04','Väite: ß vastaa tavallista s-äännettä eikä ole sama asia kuin kirjain B.','Totta','Eszett ß ilmaisee s-äännettä.'),
  pick('C07-X05','Mikä on yleinen tekninen korvausmerkintä kirjaimelle ä?',['ae','ea','aa'],'ae','Kun ä ei ole kirjoitettavissa, käytetään usein ae.'),
  pick('C07-X06','Mikä on yleinen tekninen korvausmerkintä kirjaimelle ü?',['ue','eu','uu'],'ue','Umlaut ü → ue teknisessä korvausmerkinnässä.'),
  translate('C07-X07','Kirjoita saksaksi ”Vielä kerran, kiitos!”',['Noch einmal, bitte!','Noch einmal, bitte'],'Noch einmal, bitte! pyytää toistoa.'),
  fill('C07-X08','Täydennä: Wie ____ man das?',['schreibt'],'Wie schreibt man das? opitaan tässä kokonaisena.'),
  order('C07-X09','Järjestä: Tavatkaa, olkaa hyvä.',['Bitte','buchstabieren','Sie.'],'Bitte buchstabieren Sie. on muodollinen pyyntö.'),
  write('C07-X10','Kirjoita kuvitteellinen nimi ja pyydä sen tavaamista kohteliaasti.','Mein Name ist Alex. Bitte buchstabieren Sie.','Pyyntö on kohtelias ja Sie isolla.'),
  say('C07-X11','Tavaa oma tai kuvitteellinen nimi ääneen selkeästi.','A – L – E – X'),
 ],
 C08:[
  pick('C08-X01','Miten kerrot, ettet ymmärrä?',['Ich verstehe nicht.','Ich komme aus Finnland.','Guten Abend.'],'Ich verstehe nicht.','Verstehe nicht = en ymmärrä.'),
  pick('C08-X02','Miten pyydät puhumaan hitaammin?',['Bitte langsamer.','Wie alt bist du?','Ich heiße Anna.'],'Bitte langsamer.','Langsamer = hitaammin.'),
  fill('C08-X03','Täydennä: Noch ____, bitte!',['einmal'],'Noch einmal, bitte! = vielä kerran.'),
  order('C08-X04','Järjestä: En ymmärrä.',['Ich','verstehe','nicht.'],'Ich verstehe nicht.'),
  translate('C08-X05','Kirjoita saksaksi ”Mitä se tarkoittaa?”',['Was bedeutet das?','Was bedeutet das'],'Was bedeutet das? pyytää sanan tai ilmauksen merkitystä.'),
  truth('C08-X06','Väite: Voit pyytää toistoa, vaikka et vielä osaisi fraasin kaikkia kielioppirakenteita.','Totta','Tässä moduulissa tarvittavat selviytymisfraasit opitaan valmiina ilmauksina.'),
  pick('C08-X07','Mikä pyyntö on erityisen kohtelias?',['Können Sie das bitte wiederholen?','Bitte langsamer.','Wie geht’s?'],'Können Sie das bitte wiederholen?','Können Sie ...? on kohtelias pyyntö.'),
  write('C08-X08','Kirjoita kaksi fraasia tilanteeseen, jossa et ymmärrä opettajan puhetta.','Ich verstehe nicht. Bitte langsamer.','Ilmaiset vaikeuden ja pyydät uutta apua.'),
  say('C08-X09','Pyydä ääneen toistoa saksaksi.','Noch einmal, bitte!'),
 ],
 C09:[
  pick('C09-X01','Miten sanotaan maanantai?',['Montag','Mittwoch','Sonntag'],'Montag','Montag = maanantai.'),
  pick('C09-X02','Miten sanotaan keskiviikko?',['Mittwoch','Montag','Freitag'],'Mittwoch','Mittwoch = keskiviikko.'),
  pick('C09-X03','Miten sanotaan sunnuntai?',['Sonntag','Samstag','Dienstag'],'Sonntag','Sonntag = sunnuntai.'),
  fill('C09-X04','Täydennä: ____ Montag. (Maanantaina.)',['Am','am'],'Am Montag. Tämän lauseen alussa Am kirjoitetaan isolla.'),
  fill('C09-X05','Täydennä: ____ drei Uhr. (Kello kolme.)',['Um','um'],'Um drei Uhr. Um kertoo tarkan kellonajan.'),
  pick('C09-X06','Kumpi on oikea tapa sanoa ”perjantaina”?',['am Freitag','um Freitag','in Freitag'],'am Freitag','Am + viikonpäivä.'),
  pick('C09-X07','Kumpi ilmaus tarkoittaa ”kello neljä”?',['um vier Uhr','am vier Uhr','bis vier Montag'],'um vier Uhr','Um + kellonaika.'),
  order('C09-X08','Järjestä: Maanantaina kello kolme.',['Am','Montag','um','drei','Uhr.'],'Am Montag um drei Uhr.'),
  translate('C09-X09','Kirjoita saksaksi ”Tiistaina kello kolme.”',['Am Dienstag um drei Uhr.','Am Dienstag um drei Uhr'],'Am Dienstag um drei Uhr.'),
  truth('C09-X10','Väite: Viikonpäivät kirjoitetaan saksaksi tavallisesti pienellä alkukirjaimella.','Tarua','Viikonpäivät ovat substantiiveja ja alkavat isolla: Montag, Dienstag ... .'),
  pick('C09-X11','Mikä ilmaus tarkoittaa ”varttia vaille kolme”?',['Viertel vor drei','Viertel nach drei','drei Uhr'],'Viertel vor drei','Viertel vor drei on 14.45.'),
  write('C09-X12','Kirjoita sopiva kuvitteellinen tapaamisaika: lauantaina kello kolme.','Am Samstag um drei Uhr.','Onko am ennen viikonpäivää ja um ennen kellonaikaa?'),
  say('C09-X13','Sano ääneen viikonpäivät maanantaista sunnuntaihin.','Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag'),
 ],
 C10:[
  pick('C10-X01','Mikä fraasi esittelee ystävän?',['Das ist Lea.','Ich bin Lea.','Woher ist du?'],'Das ist Lea.','Das ist ... = Tämä on ...'),
  fill('C10-X02','Täydennä: Er ____ Jonas.',['heißt'],'Er heißt = Hänen nimensä on.'),
  fill('C10-X03','Täydennä: Sie ____ Mara. (Hänen nimensä on Mara.)',['heißt'],'Sie heißt on kolmannen persoonan muoto naisesta.'),
  pick('C10-X04','Mitä ”Schön, dich kennenzulernen!” tarkoittaa?',['Hauska tutustua!','Hyvää yötä!','Näkemiin!'],'Hauska tutustua!','Fraasi ilmaisee tutustumisen iloa.'),
  pick('C10-X05','Mikä on oikein?',['Ich komme aus Finnland.','Ich kommen aus Finnland.','Du komme aus Finnland.'],'Ich komme aus Finnland.','Kommen taipuu ich komme, du kommst.'),
  pick('C10-X06','Mikä kysymys on kohtelias?',['Wie heißen Sie?','Wie heißt du?','Du heißt wie?'],'Wie heißen Sie?','Sie on kohtelias ja verbi saa muodon heißen.'),
  order('C10-X07','Järjestä: Tämä on Leo.',['Das','ist','Leo.'],'Das ist Leo.'),
  truth('C10-X08','Väite: Ich bin zwanzig Jahre alt. tarkoittaa Olen 20-vuotias.','Totta','Ikä ilmaistaan saksassa sein-verbillä: Ich bin ... Jahre alt.'),
  write('C10-X09','Kirjoita 5–7 lausetta kuvitteellisesta henkilöstä: tervehdi, kerro nimi, maa, ikä, vointi ja hyvästele.','Hallo! Ich heiße Lea. Ich komme aus Finnland. Ich bin siebzehn Jahre alt. Mir geht es gut. Schön, dich kennenzulernen! Tschüss!','Kaikki kuusi teemaa ovat mukana, verbien minä-muodot oikein ja tekstissä on looginen eteneminen.'),
  say('C10-X10','Esittele kuvitteellinen uusi tuttava ääneen kahdella lauseella.','Das ist Leo. Er heißt Leo.'),
 ]
};
export function allChapterExercises(id:ChapterId,original:Exercise[]):Exercise[]{
 return [...original,...(supplementaryExercises[id]??[])];
}
