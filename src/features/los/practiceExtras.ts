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
 C01:[
 {id:'C01-X01',type:'matching',prompt:'Yhdistä kolme saksankielistä fraasia oikeaan suomennokseen.',pairs:[['Hallo!','Hei!'],['danke','kiitos'],['Tschüss!','Hei hei!']],hint:'Tarkista ensin kappaleen ensimmäinen ja viimeinen repliikki.',explanation:'Hallo = hei, danke = kiitos ja Tschüss = hei hei.'},
 {id:'C01-X02',type:'listen-choice',prompt:'Kuuntele alkuperäistä Franzin ja Jörgin keskustelua. Millä ilmauksella Franz aloittaa keskustelun?',mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Gespr%C3%A4chVorstellung.ogg',options:['Hallo','Guten Morgen','Auf Wiedersehen'],correct:'Hallo',hint:'Kuuntele aivan ensimmäistä sanaa.',explanation:'Franz aloittaa sanomalla Hallo. Tässä ei vielä tarvitse osata ikäkysymyksiä.'},
 {id:'C01-X03',type:'listen-write',prompt:'Kuuntele alkuperäinen lyhyt keskustelu. Kirjoita viimeinen hyvästely saksaksi.',mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Gespr%C3%A4chVorstellung.ogg',accepted:['Tschüss!','Tschüss'],hint:'Kuuntele Jörgin viimeistä vuoroa.',explanation:'Jörg sanoo lopuksi Tschüss!'},
 {id:'C01-X04',type:'choice',prompt:'Kuka sanoo keskustelun viimeisen hyvästelyn Tschüss!?',options:['Jörg','Franz','Greta'],correct:'Jörg',hint:'Katso Text A:n viimeistä puhujariviä.',explanation:'Viimeisen repliikin puhuja on Jörg. Hän sanoo Tschüss!'}
 ],
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
  {id:'C02-X10',type:'conjugation',prompt:'Täytä heiße- ja sein-verbien opitut minä–sinä-muodot.',pairs:[['ich (heißen)','heiße'],['du (heißen)','heißt'],['ich (sein)','bin'],['du (sein)','bist']],hint:'Kertaa ich heiße / du heißt / ich bin / du bist.',explanation:'Heißen: ich heiße, du heißt. Sein: ich bin, du bist.'},

  {id:'C02-X11',type:'choice',prompt:'Kuka esittää Franzille vointikysymyksen alkuperäisessä Text A:ssa?',options:['Greta','Franz','Herr Weiß'],correct:'Greta',hint:'Toinen puhuja sanoo Wie geht’s?',explanation:'Greta kysyy Franzilta Wie geht’s? Tässä kysymyksen merkitys annetaan lukemisen tukena.'},
  {id:'C02-X12',type:'highlight',prompt:'Korosta ensimmäisestä repliikistä nimen kysymys kokonaisena.',blockId:'c02-a-1',target:'Wie heißt du?',hint:'Franz kysyy sinun nimeäsi.',explanation:'Wie heißt du? tarkoittaa Mikä sinun nimesi on?'},
  {id:'C02-X13',type:'choice',prompt:'Kuka kertoo, että opettajan nimi on Herr Weiß?',options:['Greta','Franz','Herr Schmidt'],correct:'Greta',hint:'Katso keskustelun neljäs repliikki.',explanation:'Greta sanoo Ja, er heißt Herr Weiß. Vaikeampi pronomini er on tässä vain tunnistusta.'},
  {id:'C02-X14',type:'listen-choice',prompt:'Kuuntele alkuperäinen Ich bin Peter -äänite. Kuka esittelee Peterin?',options:['Thomas','Takashi','Franz'],correct:'Thomas',mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsch_Dialog_._Ich_bin_Peter.ogg',hint:'Katso, kuka sanoo Das ist Peter.',explanation:'Thomas sanoo Das ist Peter. Sama puhe ja koko litteraatti ovat C02:n Teksti B:ssä.'},
  {id:'C02-X15',type:'listen-write',prompt:'Kuuntele Ich bin Peter -äänitteen ensimmäinen kysymys ja kirjoita se saksaksi.',accepted:['Wie heißt du?','Wie heißt du'],mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsch_Dialog_._Ich_bin_Peter.ogg',hint:'Kysymys alkaa Wie ja tarkoittaa Mikä nimesi on?',explanation:'Thomas kysyy aluksi Wie heißt du?'},
  {id:'C02-X16',type:'choice',prompt:'Miten voisit kysyä, kuka toinen esitelty henkilö on?',options:['Wer ist das?','Wie bist das?','Wie du heißt?'],correct:'Wer ist das?',hint:'Wer = kuka. Ist on sein-verbin hän-muoto.',explanation:'Wer ist das? tarkoittaa Kuka tuo on?'},
  {id:'C02-X17',type:'highlight',prompt:'Korosta ensimmäisestä Text A:sta Franzin oma nimen ilmoitus.',blockId:'c02-a-1',target:'ich bin Franz.',hint:'Tämä on ensimmäisen puhujan alussa.',explanation:'Franz sanoo ich bin Franz osana lausetta Hallo, ich bin Franz. Tässä ei vaadita tekstin muuttamista.'},
  {id:'C02-X18',type:'writing',prompt:'Kirjoita kuvitteellinen minidialogi: tervehdi, kysy nimi ja vastaa nimellä. Vähintään 3 repliikkiä.',hint:'A: Hallo! Wie heißt du? B: Ich heiße ...',explanation:'Itsearviointimalli: A: Hallo! Wie heißt du? B: Ich heiße Lena. Und du? A: Ich bin Ben.'},

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
  {id:'C03-X11',type:'matching',prompt:'Yhdistä maat niiden suomenkielisiin nimiin.',pairs:[['Finnland','Suomi'],['Deutschland','Saksa'],['Österreich','Itävalta'],['Schweden','Ruotsi']],hint:'Käytä kappaleen sanastoa.',explanation:'Finnland = Suomi, Deutschland = Saksa, Österreich = Itävalta, Schweden = Ruotsi.'},

  {id:'C03-X12',type:'highlight',prompt:'Korosta Bernan alkuperäisestä haastattelusta koko ilmaus ”Olen Saksasta.”',blockId:'c03-a-4',target:'Ich komme aus Deutschland.',hint:'Katso Bernan vastausta kysymykseen Woher kommst du?',explanation:'Berna sanoo Ich komme aus Deutschland.'},
  {id:'C03-X13',type:'highlight',prompt:'Korosta Bernan alkuperäisestä haastattelusta lause, jossa hän kertoo kotikaupunkinsa.',blockId:'c03-a-6',target:'Ich komme aus Kiel.',hint:'Etsi kuudennesta repliikistä Kiel.',explanation:'Berna vastaa Ich komme aus Kiel. Hän kertoo myös kaupungin alueesta ja pohjoisesta sijainnista.'},
  {id:'C03-X14',type:'choice',prompt:'Mistä maasta Berna kertoo olevansa kotoisin alkuperäisessä haastattelussa?',options:['Deutschland','Österreich','Finnland'],correct:'Deutschland',hint:'Etsi lause Ich komme aus … .',explanation:'Berna sanoo Ich komme aus Deutschland eli hän on Saksasta.'},
  {id:'C03-X15',type:'choice',prompt:'Minkä kaupungin Berna mainitsee kotipaikkanaan?',options:['Kiel','Berlin','Hamburg'],correct:'Kiel',hint:'Lue Bernan vastaus And wo in Deutschland? -kysymykseen.',explanation:'Berna sanoo Ich komme aus Kiel. Kiel on Saksan pohjoisosassa.'},
  {id:'C03-X16',type:'choice',prompt:'Mikä kysymys kysyy keskustelukumppanin alkuperää?',options:['Woher kommst du?','Wie heißt du?','Wie geht es dir?'],correct:'Woher kommst du?',hint:'Woher tarkoittaa mistä.',explanation:'Woher kommst du? tarkoittaa Mistä olet kotoisin?'},
  {id:'C03-X17',type:'listen-choice',prompt:'Kuuntele alkuperäinen Ich bin Peter -dialogi. Mistä kaupungista Thomas kertoo heidän tulevan?',options:['Berlin','Kyoto','Kiel'],correct:'Berlin',mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsch_Dialog_._Ich_bin_Peter.ogg',hint:'Thomas sanoo Wir kommen aus ... .',explanation:'Thomas sanoo Wir kommen aus Berlin. Tässä Wir kommen tunnistetaan kokonaisena fraasina.'},
  {id:'C03-X18',type:'listen-write',prompt:'Kirjoita Takashin kuulema kotipaikkalause kokonaan saksaksi.',accepted:['Ich komme aus Kyoto.','Ich komme aus Kyoto'],mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Deutsch_Dialog_._Ich_bin_Peter.ogg',hint:'Lause alkaa Ich komme aus.',explanation:'Takashi sanoo Ich komme aus Kyoto. Älä sekoita Thomasin Berliini-vastaukseen.'},
  {id:'C03-X19',type:'choice',prompt:'Minkä maan kaupunki Berlin on?',options:['Deutschland','Österreich','Schweden'],correct:'Deutschland',hint:'Berlin on Saksan pääkaupunki.',explanation:'Berlin sijaitsee Saksassa (Deutschland).'},
  {id:'C03-X20',type:'choice',prompt:'Minkä värin Berna mainitsee alkuperäisen haastattelun lopussa?',options:['rot','blau','grün'],correct:'rot',hint:'Lopun edistynyt kieli on tunnistustukea, ei opittava kielioppirakenne.',explanation:'Berna mainitsee värin rot, punainen. Loppuperustelun kielioppia ei tässä vaadita.'},
  {id:'C03-X21',type:'choice',prompt:'Millä ilmaisulla Berna kertoo Kielin olevan pohjoisessa?',options:['ganz im Norden','ganz im Süden','in Berlin'],correct:'ganz im Norden',hint:'Norden tarkoittaa pohjoista.',explanation:'Berna kertoo Kielin olevan ganz im Norden, aivan pohjoisessa.'},
  write('C03-X22','Kirjoita kuvitteellinen lyhyt tutustumiskeskustelu, jossa toinen kysyy kotipaikkaa ja toinen kertoo olevansa Suomesta.','A: Woher kommst du? B: Ich komme aus Finnland.','Tarkista Woher kommst du? ja Ich komme aus Finnland. Älä kerro omia yksityisiä yhteystietoja.'),
  {id:'C03-X23',type:'matching',prompt:'Yhdistä paikannimet oikeisiin maihin.',pairs:[['Kiel','Deutschland'],['Berlin','Deutschland'],['Helsinki','Finnland'],['Wien','Österreich']],hint:'Wien on Itävallan pääkaupunki.',explanation:'Kiel ja Berlin Saksassa, Helsinki Suomessa ja Wien Itävallassa.'},

 ],
 C04:[
  pick('C04-X01','Kumpi pronomini on kohtelias puhuttelu?',['Sie','du','sie (pienellä)'],'Sie','Kohtelias te = Sie aina isolla.'),
  fill('C04-X02','Täydennä: Wie ____ Sie? (Mikä Teidän nimenne on?)',['heißen'],'Sie heißen. Saksan ß säilyy.'),
  truth('C04-X03','Väite: pelkkä ikä määrittää kaikissa tilanteissa sinutellaanko vai teititelläänkö.','Tarua','Puhuttelu määräytyy myös tilanteesta, suhteesta ja paikallisesta tavasta.'),
  order('C04-X04','Järjestä kohtelias kysymys: Mistä olette kotoisin?',['Woher','kommen','Sie?'],'Woher kommen Sie?'),
  pick('C04-X05','Mikä ilmaus sopii kohteliaaseen hyvästelyyn?',['Auf Wiedersehen!','Na ja?','Wie heißt du?'],'Auf Wiedersehen!','Auf Wiedersehen on muodollinen hyvästely.'),
  write('C04-X06','Kirjoita kaksi vastakkaista nimen kysymistä: ensin tuttavallisesti, sitten kohteliaasti.','Wie heißt du? Wie heißen Sie?','Onko du-muoto heißt ja Sie-muoto heißen?'),
  {id:'C04-X07',type:'listen-choice',prompt:'Kuuntele alkuperäisen puhujan vointikysymys. Onko se tuttavallinen vai kohtelias?',options:['kohtelias','tuttavallinen','ei kumpikaan'],correct:'kohtelias',mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/De-wie_geht_es_Ihnen.ogg',hint:'Kuuntele erityisesti viimeistä sanaa Ihnen.',explanation:'Wie geht es Ihnen? on kohtelias vointikysymys.'},
  {id:'C04-X08',type:'listen-write',prompt:'Kirjoita kuultu kohtelias vointikysymys kokonaan saksaksi.',accepted:['Wie geht es Ihnen?','Wie geht es Ihnen'],mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/De-wie_geht_es_Ihnen.ogg',hint:'Lause alkaa Wie geht es ja loppuu isolla alkavaan kohteliaaseen pronominiin.',explanation:'Puhuja sanoo Wie geht es Ihnen?'},
  {id:'C04-X09',type:'highlight',prompt:'Korosta koko muodollisen keskustelun lopussa lausuttu ensimmäinen hyvästely ”Auf Wiedersehen”.',blockId:'c04-a-7',target:'Auf Wiedersehen',hint:'Etsi Herr Schmidtin viimeisestä puheenvuorosta.',explanation:'Herr Schmidt lopettaa muodollisen keskustelun sanoilla Auf Wiedersehen.'},
  {id:'C04-X10',type:'choice',prompt:'Kuka kertoo ettei hänelle kuulu kovin hyvää alkuperäisessä Text A:ssa?',options:['Herr Schmidt','Herr Standish','Franz'],correct:'Herr Schmidt',hint:'Etsi lause Nicht so gut.',explanation:'Herr Schmidt sanoo Nicht so gut. Ich bin müde.'},
  {id:'C04-X11',type:'choice',prompt:'Mikä on Herr Standishin ensimmäinen vastaus vointikysymykseen?',options:['Danke sehr, es geht mir gut.','Ich bin müde.','Wie heißen Sie?'],correct:'Danke sehr, es geht mir gut.',hint:'Katso tekstin toista repliikkiä.',explanation:'Herr Standish vastaa kiittäen, että hänelle kuuluu hyvää.'},
  {id:'C04-X12',type:'matching',prompt:'Yhdistä puhuttelutilanteet tuttavalliseen tai kohteliaaseen muotoon.',pairs:[['uusi asiakas palvelutiskillä','Sie'],['läheinen koulukaveri','du'],['tuntematon henkilö virallisessa tapaamisessa','Sie'],['oma tuttu ystävä','du']],hint:'Tarkastele suhdetta ja tilanteen muodollisuutta, älä yksin ikää.',explanation:'Usein tuttaville du ja muodollisissa tilanteissa Sie. Tavat vaihtelevat.'},
  {id:'C04-X13',type:'error-correction',prompt:'Korjaa: ”Wie heisst sie?” kun puhuttelemasi henkilö on vieras aikuinen ja kysyt hänen nimeään suoraan.',accepted:['Wie heißen Sie?','Wie heißen Sie'],hint:'Kohtelias Sie kirjoitetaan isolla, ja verbi on heißen.',explanation:'Wie heißen Sie? kysyy nimeä kohteliaasti. Tarkista ß ja iso Sie.'},
  write('C04-X14','Kirjoita kuvitteellinen kolmen repliikin muodollinen kohtaaminen, jossa kysyt toiselta nimeä ja hyvästelet.','A: Guten Tag! Wie heißen Sie? B: Ich heiße Paula. A: Auf Wiedersehen!','Tarkista tervehdyksen tilanne, Sie + heißen ja lopun hyvästely.'),
  {id:'C04-X15',type:'choice',prompt:'Mikä on oikein kohteliaassa puhuttelussa keskellä lausetta?',options:['Woher kommen Sie?','Woher kommen sie?','Woher kommst Sie?'],correct:'Woher kommen Sie?',hint:'Verbin muoto on kommen ja kohtelias pronomini isolla.',explanation:'Kohtelias kysymys Woher kommen Sie? eroaa tutusta Woher kommst du? -kysymyksestä.'},
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
  {id:'C05-X11',type:'error-correction',prompt:'Korjaa virhe tässä lauseessa: ”Mir geht es guten.”',accepted:['Mir geht es gut.','Mir geht es gut'],hint:'Vointifraasissa käytetään sanaa gut.',explanation:'Oikea fraasi on Mir geht es gut. Guten kuuluu esimerkiksi tervehdykseen Guten Tag.'},
  {id:'C05-X12',type:'find-text',prompt:'Etsi ja korosta Karl-nimisen puhujan vastakysymys ”Entä sinulle?”',blockId:'c05-a-2',target:'Und dir?',hint:'Karlin repliikin lopussa.',explanation:'Und dir? = Entä sinulle? Se on tuttavallinen, ei kohtelias puhuttelu.'},
  {id:'C05-X13',type:'listen-choice',prompt:'Kuuntele ihmisen lukema lyhyt vointifraasi. Keneltä kysymys on tarkoitettu?',options:['tutulta (du)','teititeltävältä (Sie)','keneltä tahansa ilman puhuttelua'],correct:'tutulta (du)',mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/De-wie_geht_es_dir.ogg',hint:'Lopussa kuulet dir.',explanation:'Wie geht es dir? on tuttavallisen du-puhuttelun vointikysymys.'},
  {id:'C05-X14',type:'listen-write',prompt:'Kirjoita alkuperäisestä äänitteestä kuulemasi vointikysymys.',accepted:['Wie geht es dir?','Wie geht es dir'],mediaUrl:'https://commons.wikimedia.org/wiki/Special:Redirect/file/De-wie_geht_es_dir.ogg',hint:'Neljä sanaa ja lopussa dir.',explanation:'Syntyperäinen puhuja sanoo Wie geht es dir?'},
  {id:'C05-X15',type:'choice',prompt:'Mitä Karl vastaa Heinrichille alkuperäisen tekstin toisessa repliikissä?',options:['Danke, mir geht es gut.','Nicht so gut.','Ich bin müde.'],correct:'Danke, mir geht es gut.',hint:'Lue Karl-nimen jälkeinen repliikki.',explanation:'Karl sanoo, että hänelle kuuluu hyvää, ja kysyy Und dir?'},
  {id:'C05-X16',type:'choice',prompt:'Kuka aloittaa alkuperäisen Die Freunde -dialogin?',options:['Heinrich','Karl','Franz'],correct:'Heinrich',hint:'Ensimmäisen repliikin edessä on puhujan nimi.',explanation:'Heinrich tervehtii ensin Karlia ja kysyy vointia.'},
  {id:'C05-X17',type:'highlight',prompt:'Korosta alkuperäisen dialogin ensimmäisestä repliikistä koko tuttavallinen vointikysymys.',blockId:'c05-a-1',target:'Wie geht es dir?',hint:'Heinrichin ensimmäisen repliikin lopussa.',explanation:'Heinrich kysyy Wie geht es dir?'},
  {id:'C05-X18',type:'matching',prompt:'Yhdistä vointiin liittyvät ilmaisut suomenkielisiin merkityksiin.',pairs:[['sehr gut','erittäin hyvin'],['nicht so gut','ei kovin hyvin'],['müde','väsynyt'],['Wie geht es dir?','Mitä sinulle kuuluu?']],hint:'Sehr vahvistaa ja nicht kieltää.',explanation:'Sehr gut = erittäin hyvin, nicht so gut = ei kovin hyvin.'},
  write('C05-X19','Vastaa kahdelle eri kuvitteelliselle henkilölle vointikysymykseen: toiselle kuuluu hyvää, toiselle ei kovin hyvää.','A: Mir geht es gut. B: Nicht so gut.','Tarkista kummankin tilanteen ilmaus ja asianmukainen vastaus.'),
  {id:'C05-X20',type:'choice',prompt:'Mitä tarkoittaa Und Ihnen? tilanteessa, jossa puhutellaan kohteliaasti?',options:['Entä teille?','Mitä hän tekee?','Olen Saksasta.'],correct:'Entä teille?',hint:'Vertaa tuttavalliseen Und dir? -fraasiin.',explanation:'Und Ihnen? on kohtelias vastakysymys ja Und dir? tuttavallinen.'},
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
  {id:'C07-X12',type:'article-sort',prompt:'Valitse näiden jo opetettujen substantiivien sanakirja-artikkelit.',pairs:[['Name','der'],['Frau','die'],['Jahr','das']],hint:'Nämä artikkelit on esitelty kappalesanastoissa.',explanation:'Der Name, die Frau ja das Jahr ovat sanojen sanakirjamuodot. Tämä ei vielä edellytä sijamuotojen osaamista.'},
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
