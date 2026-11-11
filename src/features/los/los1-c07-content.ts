/** C07: alphabet, spelling and private fictional form data.
 * Human-authored Text B: the unabridged 30-character German alphabet index
 * from COERLL Deutsch im Blick, Kapitel 1 "Das Alphabet", CC BY 4.0,
 * https://coerll.utexas.edu/dib/pho.php?k=1
 * Its individual media files are NOT embedded or represented as approved.
 * Timwi's separate complete 28s German alphabet audio is public domain:
 * https://commons.wikimedia.org/wiki/File:German_alphabet-2.ogg
 * A 28-second whole alphabet recording is not six distinct spoken names.
 */
import type {ContentBlock} from "./model";

export const LOS1_C07_COERLL_ALPHABET=[
  "A","Ä","B","C","D","E","F","G","H","I","J","K","L","M","N","O",
  "Ö","P","Q","R","S","ß","T","U","Ü","V","W","X","Y","Z",
] as const;
export const LOS1_C07_STANDARD_ALPHABET=[
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O",
  "P","Q","R","S","T","U","V","W","X","Y","Z",
] as const;
export const LOS1_C07_FICTIONAL_NAMES=["Lena","Mila","Paul","Timo","Emma","Nora","Ben","Lukas"] as const;
export const LOS1_C07_FICTIONAL_NUMBERS=["010 23","040 57","050 16","020 84"] as const;

export const LOS1_C07_CONTENT_BLOCKS:ContentBlock[]=[
  {id:"los1-c07-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Osaat jo tervehtiä, kertoa nimesi ja kysyä toisen nimeä. Nyt harjoittelet sen "
      +"tavaamista eli kirjainten sanomista yksitellen. Saksassa kirjainten NIMET "
      +"eivät aina vastaa suomen kirjainten nimiä. "
      +"Tavoite on osata tunnistaa perusaakkosto, lukea nimi kirjaimittain, "
      +"pyytää toistamaan sekä ymmärtää lyhyitä numeroketjuja. "
      +"Käytä kaikissa nimilomakkeissa itse keksittyjä tietoja, ei oikeaa "
      +"puhelinnumeroa tai sähköpostia."},
  {id:"los1-c07-basic-alphabet",version:"0.1.0",kind:"grammar",
    title:"Das Alphabet · Saksankieliset kirjainten nimet",
    explanationFi:"Saksan aakkostossa on 26 tavallista latinalaista kirjainta A–Z. "
      +"Lisäksi saksassa käytetään ä-, ö- ja ü-kirjaimia sekä ß-merkkiä. "
      +"Ne näkyvät erikseen tämän luvun alkuperäisessä COERLL-listassa. "
      +"Erityisen tärkeitä muistaa: J:n nimi on Jott, V:n Vau (kirjaimena nimi, "
      +"ei yleinen sanan v-ääntämys), W:n We [vee], Z:n Zett [tset], "
      +"Y:n Ypsilon ja ß:n Eszett tai scharfes S. "
      +"Äänen ja kirjaimen nimen ero on oleellinen: esimerkiksi W lausutaan "
      +"monissa saksan sanoissa [v], mutta sen nimi sanotaan We. "
      +"Älä oleta, että englanninkielinen kirjainten luettelu käy saksassa.",
    examples:[
      {de:"A – Be – Ce – De – E",fi:"Ensimmäiset viisi kirjainten nimeä: A, B, C, D, E."},
      {de:"J – Jott",fi:"J-kirjaimen nimi."},
      {de:"V – Vau",fi:"V-kirjaimen nimi, ei suomen vee."},
      {de:"W – We",fi:"W:n nimi (ääntyy suunnilleen vee)."},
      {de:"Z – Zett",fi:"Z-kirjaimen nimi."},
      {de:"ß – Eszett",fi:"Saksan ß-merkki."},
    ]},
  {id:"los1-c07-alphabet-table",version:"0.1.0",kind:"table",
    headers:["Kirjain","Saksalainen kirjainnimi (ohjeellinen)","Huomaa"],
    rows:[
      ["A","A","pitkä a"],["B","Be","pitkä e"],["C","Ce","alku ts"],
      ["D","De","pitkä e"],["E","E","pitkä e"],["F","Eff","f"],
      ["G","Ge","g"],["H","Ha","pitkä a"],["I","I","pitkä i"],
      ["J","Jott","jot"],["K","Ka","pitkä a"],["L","Ell","l"],
      ["M","Emm","m"],["N","Enn","n"],["O","O","pitkä o"],
      ["P","Pe","pitkä e"],["Q","Ku","pitkä u"],["R","Err","r"],
      ["S","Ess","s"],["T","Te","pitkä e"],["U","U","pitkä u"],
      ["V","Vau","v:n nimi, ei ääntämisohje sanassa"],
      ["W","We","kirjaimen nimi; monissa sanoissa w → [v]"],
      ["X","Iks","ks"],["Y","Ypsilon","ypsilon"],["Z","Zett","ts-et"],
      ["Ä","Ä","umlaut; ei sama kuin A"],
      ["Ö","Ö","umlaut; ei sama kuin O"],
      ["Ü","Ü","umlaut; ei sama kuin U"],
      ["ß","Eszett","erikoismerkki, ei oma tavallinen A–Z-kirjain"],
    ]},
  {id:"los1-c07-spelling-grammar",version:"0.1.0",kind:"grammar",
    title:"Wie schreibt man das? · Nimen tavaaminen",
    explanationFi:"Wie schreibt man das? kysyy, miten jokin sana tai nimi kirjoitetaan. "
      +"Man on tässä yleistävä pronomini; se ei tarkoita miestä. "
      +"Kohtelias Bitte buchstabieren Sie. on 'Tavatkaa, olkaa hyvä'. "
      +"Tutulle luonteva lyhyt pyyntö on Buchstabiere bitte. "
      +"Kun et kuullut, sano Noch einmal, bitte. eli vielä kerran, kiitos. "
      +"Sana langsam tarkoittaa hitaasti, joten Langsam, bitte. on "
      +"kohtelias tarkennuspyyntö tilanteessa. "
      +"Tavaa esimerkiksi Lena: L – E – N – A. "
      +"Voit myös selventää kirjaimen esimerkkisanalla: A wie Anton. "
      +"Esimerkkisanat alkuperäisessä puheludialogissa eivät ole "
      +"uusi virallinen nykyinen DIN 5009 -tavausstandardi.",
    examples:[
      {de:"Wie schreibt man das?",fi:"Miten se kirjoitetaan?"},
      {de:"Bitte buchstabieren Sie.",fi:"Tavatkaa, olkaa hyvä. (kohtelias)"},
      {de:"Buchstabiere bitte.",fi:"Tavaa, ole hyvä. (tuttu)"},
      {de:"Noch einmal, bitte.",fi:"Vielä kerran, kiitos."},
      {de:"Langsam, bitte.",fi:"Hitaasti, kiitos."},
      {de:"Lena: L – E – N – A",fi:"Lena tavataan kirjain kirjaimelta."},
    ]},
  {id:"los1-c07-letter-vs-sound",version:"0.1.0",kind:"grammar",
    title:"Kirjaimen nimi ≠ sanan ääntämys",
    explanationFi:"Kirjaimen nimi on se, mitä sanot tavaamisessa. "
      +"Kirjainyhdistelmä ääntyy osana sanaa eri tavalla: "
      +"saksan w vastaa usein [v]:tä, z [ts]:ää, "
      +"ei yleensä [ai]:ta, ie pitkää [iː]:tä ja sch [š]-äännettä. "
      +"Esimerkiksi schreiben alkaa sch-äänteellä mutta "
      +"sen tavaamisessa sanot kirjaimet S – C – H erikseen. "
      +"Muista myös ß: se ei ole suomalaisen b-kirjaimen variantti "
      +"vaan erilainen s-merkki. "
      +"Saksalaisen kirjoituksen suuret substantiivialkukirjaimet opetellaan "
      +"tunnistamaan, ei vielä kattavaa substantiivien kielioppia.",
    examples:[
      {de:"W – We",fi:"Kirjaimen nimi on We, mutta W sanassa wie ääntyy [v]."},
      {de:"Z – Zett",fi:"Kirjaimen nimi Zett, z sanassa zehn ääntyy [ts]."},
      {de:"ei · mein",fi:"ei ääntyy tavallisesti [ai]."},
      {de:"ie · wie",fi:"ie ääntyy usein pitkänä i:nä."},
      {de:"sch · schreiben",fi:"sch ääntyy š:nä."},
      {de:"ß · Straße",fi:"ß on s-äänteen kirjoitusmerkki."},
    ]},
  {id:"los1-c07-text-b-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Text B on Texasin yliopiston Deutsch im Blick -oppimateriaalin "
      +"Das Alphabet -sivulla julkaistu koko järjestetty aakkosmerkkien luettelo. "
      +"Se sisältää 26 tavallista kirjainta sekä Ä, Ö, Ü ja ß oikeilla paikoillaan. "
      +"Tämä on ihmisten kirjoittama kirjaintaulukko, ei dialogi eikä "
      +"äänitteestä tehty sanasta sanaan litteraatti. "
      +"COERLL:n alkuperäiset yksittäiset äänitiedostot eivät ole vielä "
      +"läpikäyneet tiedostokohtaista hyväksyntää eivätkä toistu täällä. "
      +"Erillinen, oikean ihmisen tallentama public domain -aakkosäänite "
      +"on seuraavassa lohkossa. Sille ei ole keksitty aika-ankkuroituja "
      +"tavaustehtäviä."},
  {id:"los1-c07-dib-06-alphabet",version:"1.0.0",kind:"authenticText",
    language:"de",sourceId:"M-DIB-06",text:LOS1_C07_COERLL_ALPHABET.join(", ")},
  {id:"los1-c07-audio-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Timwin oma, vuonna 2004 äänittämä 28 sekunnin alkuperäinen "
      +"saksankielinen aakkosäänite on public domainissa. "
      +"Kuuntele ääni kokonaan ensin ilman kirjoitettua listaa, sitten listaa seuraten. "
      +"Tämä on itsenäinen aakkosäänite, eikä se ole COERLL:n äänite "
      +"tai Wikibooksin puhelukeskustelun audio. "
      +"Äänitteen ei väitetä sisältävän keinotekoisesti lisättyjä nimiä, "
      +"puhelinnumeroita tai jokaisen erikoiskirjaimen erillistä ääniklipppiä. "
      +"Toisto oikealla iOS- ja Android-laitteella odottaa testausta."},
  {id:"los1-c07-m-com-07-alphabet-audio",version:"1.0.0",kind:"media",mediaType:"audio",
    title:"Timwi · German alphabet-2.ogg · ihmisen nauhoittama aakkosto (28 s)",
    sourceId:"M-COM-07",
    embedUrl:"https://upload.wikimedia.org/wikipedia/commons/9/92/German_alphabet-2.ogg",
    mp3Url:"https://upload.wikimedia.org/wikipedia/commons/transcoded/9/92/German_alphabet-2.ogg/German_alphabet-2.ogg.mp3"},
  {id:"los1-c07-words",version:"0.1.0",kind:"vocabulary",entries:[
    {id:"los1-c07-word-01",de:"schreiben",fi:"kirjoittaa",note:"Wie schreibt man das?"},
    {id:"los1-c07-word-02",de:"Wie schreibt man das?",fi:"miten se kirjoitetaan?"},
    {id:"los1-c07-word-03",de:"buchstabieren",fi:"tavata kirjain kirjaimelta"},
    {id:"los1-c07-word-04",de:"Bitte buchstabieren Sie.",fi:"tavatkaa, olkaa hyvä",note:"Kohtelias pyyntö."},
    {id:"los1-c07-word-05",de:"noch einmal",fi:"vielä kerran"},
    {id:"los1-c07-word-06",de:"Noch einmal, bitte.",fi:"vielä kerran, kiitos"},
    {id:"los1-c07-word-07",de:"langsam",fi:"hitaasti"},
    {id:"los1-c07-word-08",de:"Langsam, bitte.",fi:"hitaasti, kiitos"},
    {id:"los1-c07-word-09",de:"der Buchstabe",fi:"kirjain",note:"Monikko die Buchstaben."},
    {id:"los1-c07-word-10",de:"die Nummer",fi:"numero"},
    {id:"los1-c07-word-11",de:"die Telefonnummer",fi:"puhelinnumero"},
    {id:"los1-c07-word-12",de:"Wie lautet ...?",fi:"mikä on ...?",note:"Tunnista valmiina kysymyksenä."},
    {id:"los1-c07-word-13",de:"die Adresse",fi:"osoite"},
    {id:"los1-c07-word-14",de:"das Handy",fi:"matkapuhelin"},
    {id:"los1-c07-word-15",de:"die E-Mail-Adresse",fi:"sähköpostiosoite"},
    {id:"los1-c07-word-16",de:"richtig",fi:"oikein"},
  ]},
  {id:"los1-c07-fictitious-spelling-guide",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Tavaa kahdeksan KUVITTEELLISTA harjoitusnimeä. "
      +"Nimet ovat LOS!:n omia esimerkkejä, eivät toisesta lähteestä poimittuja "
      +"oikeiden ihmisten yhteystietoja. Nimen kirjainsarja on kirjoitusharjoitus, "
      +"ei nauhoitetun nimen kuullunymmärtämiskoe. "
      +"Kuuntele aakkosäänitettä, harjoittele sitten nimien tavaamista itse."},
  {id:"los1-c07-fictional-names-table",version:"0.1.0",kind:"table",
    headers:["Kuvitteellinen nimi","Tavaa saksalaisilla kirjainten nimillä"],
    rows:LOS1_C07_FICTIONAL_NAMES.map(name=>[name,[...name.toUpperCase()].join(" · ")])},
  {id:"los1-c07-number-guide",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Tässä on neljä keksittyä numeroketjua kirjalliseen numeroiden tunnistamiseen. "
      +"ÄLÄ käsittele niitä oikeina puhelinnumeroina, älä soita niihin eikä "
      +"näihin liity autenttista puhelinnumeroäänitettä. "
      +"Tarkoitus on kerrata C06:n numerot ja opetella selkeyttävää "
      +"ryhmittelyä. Saksassa voidaan lukea numeroita usealla tavalla; "
      +"tässä käytetään yksittäisten numeroiden nimeämistä alkeisharjoituksena."},
  {id:"los1-c07-numbers-table",version:"0.1.0",kind:"table",
    headers:["Keksitty numerosarja","Kirjaimittaisen lukemisen malli"],
    rows:LOS1_C07_FICTIONAL_NUMBERS.map(sequence=>[
      sequence, [...sequence].map(c=>({0:"null",1:"eins",2:"zwei",3:"drei",4:"vier",5:"fünf",6:"sechs",7:"sieben",8:"acht",9:"neun"} as Record<string,string>)[c]??" · ").join(" · ").replace(" ·  ·  · "," | ")
    ])},
  {id:"los1-c07-form-guide",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Täytä kuvitteellinen yhteystietolomake. Käytä vain keksittyä nimeä "
      +"ja keksittyä numeroketjua, jotta et lisää sovellukseen "
      +"oikean henkilön tietoja. Lomakkeen vastauksia itsearvioidaan "
      +"esimerkkimallilla; kyse ei ole oikeasta numeropalvelusta."},
  {id:"los1-c07-production-form",version:"0.1.0",kind:"production",
    titleFi:"Täytä kuvitteellinen lomake saksaksi",
    promptFi:"Kirjoita kolme riviä: Name, Telefonnummer ja Bitte buchstabieren Sie. "
      +"Keksi nimesi ja käytä jotain tämän luvun kuvitteellisista numerosarjoista. "
      +"Tavaa nimi kirjain kirjaimelta.",
    modelDe:"Name: Lena\nTelefonnummer (erfunden): 010 23\nL – E – N – A. Noch einmal, bitte.",
    modelFi:"Nimi: Lena. Kuvitteellinen numerosarja: 010 23. L–E–N–A. Vielä kerran, kiitos.",
    criteriaFi:["Nimi on keksitty.", "Tavasin kaikki nimen kirjaimet oikeassa järjestyksessä.",
      "En kirjoittanut oikeaa puhelinnumeroa.", "Käytin tarvittaessa Noch einmal, bitte." ]},
  {id:"los1-c07-production-phone",version:"0.1.0",kind:"production",
    titleFi:"Pyydä kohteliaasti tarkennusta",
    promptFi:"Kirjoita kahden kuvitteellisen henkilön lyhyt keskustelu, "
      +"jossa toinen sanoo nimensä ja toinen pyytää tavaamaan tai toistamaan.",
    modelDe:"A: Guten Tag! Ich heiße Mila.\nB: Wie schreibt man das? Bitte buchstabieren Sie.\nA: M – I – L – A.\nB: Danke!",
    modelFi:"A: Hyvää päivää! Olen Mila. B: Miten se kirjoitetaan? "
      +"Tavatkaa, olkaa hyvä. A: M–I–L–A. B: Kiitos!",
    criteriaFi:["Käytin sopivaa tervehdystä.", "Käytin kohteliasta pyyntöä oikein.",
      "Tavasin keksityn nimen oikein.", "Dialogi ei paljasta yhteystietoja."]},
  {id:"los1-c07-culture",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Tavaamisessa erottuvat kirjoitetut sanat, yksittäisten kirjainten nimet "
      +"ja esimerkkisanat. Wikibooksin historiallisessa puheluesimerkissä "
      +"käytetään nimiä Cäsar, Ludwig ja Anton. "
      +"Älä tulkitse niitä nykyisen virallisen standardin ainoiksi oikeiksi sanoiksi. "
      +"Kirjaimet ä, ö ja ü ovat saksassa itsenäisiä ääntöasultaan erottuvia "
      +"merkkejä, ja ß ei ole sama asia kuin B. "
      +"Myös Sveitsissä kirjain ß korvataan yleensä ss-yhdistelmällä. "
      +"Saksan oikeinkirjoituksessa substantiivit alkavat isolla kirjaimella, "
      +"esimerkiksi der Buchstabe ja die Nummer. "
      +"Jos kirjoitusasu on epäselvä, pyydä mieluummin toistamaan kuin arvaamaan. "
      +"Älä kysy tai syötä oikeita yhteystietoja kieliharjoitukseen."},
];
