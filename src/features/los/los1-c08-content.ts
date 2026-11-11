/** LOS! 1 C08 · classroom survival. Authored pedagogy and a complete
 * human-written Wikibooks phrase list are separated from still-pending
 * original COERLL audio/video. Never pretend print text is audio.
 */
import type {ContentBlock} from "./model";

export const LOS1_C08_CONTENT_BLOCKS:ContentBlock[]=[
  {id:"los1-c08-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Osaat jo esitellä itsesi ja pyytää toistamaan nimen. Nyt harjoittelet, miten selviät saksankielisessä opetustilanteessa, vaikka et ymmärtäisi kaikkea. Tässä kappaleessa riittää viiden käyttövalmiin fraasin ymmärtäminen ja tarkoituksenmukainen käyttäminen. Vaikeaa kielioppia ei tarvitse päätellä näiden fraasien perusteella."},
  {id:"los1-c08-goals",version:"0.1.0",kind:"table",
    headers:["Tilanne","Osaan sanoa saksaksi","Tavoite"],
    rows:[
      ["En ymmärrä","Ich verstehe nicht.","Kerro ymmärtämisen vaikeudesta."],
      ["En kuullut","Noch einmal, bitte.","Pyydä uudelleen."],
      ["Puhutaan liian nopeasti","Bitte langsamer.","Pyydä hitaammin."],
      ["Haluan kohteliaan toiston","Können Sie das bitte wiederholen?","Käytä opettajalle sopivaa pyyntöä."],
      ["En tiedä sanan merkitystä","Was bedeutet das?","Kysy selitystä."],
      ["Haluan saksankielisen ilmauksen","Wie sagt man das auf Deutsch?","Kysy, miten jokin sanotaan."]
    ]},
  {id:"los1-c08-text-a-bridge",version:"0.2.0",kind:"paragraph",language:"fi",
    text:"TEXT A on nyt Wikibooksin oikeiden ihmisten kirjoittaman Deutschkurs für Anfänger -kirjan kokonainen harjoituksen 562 toistopyyntöjen luettelo. Se on aito alkuperäinen 15 fraasin sarja, ei kuviteltu keskustelu eikä äänen litteraatti. Voit lukea koko valitun lähdetekstin ja kaikki 15 suomenkielistä selitystä tässä oppikirjassa. Aiemmin suunniteltu COERLL:n Im Unterricht -haastattelu (M-DIB-04) on edelleen yksilöimättä eikä ole tätä lähdettä. Video- ja äänilähteet varmistetaan erikseen."},
  {id:"los1-c08-reading-strategy",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Lue ensin julkaistun Wikibooks-alkuperäisluettelon kaikki 15 riviä. Etsi tuttu Noch einmal, bitte! ja vertaa sinuttelevaa Kannst du -alkua kohteliaaseen Können Sie -alkuun. Merkitse halutessasi suomenkielisten tukisanojen avulla sana Wort (sana), Satz (lause), Frage (kysymys) ja Antwort (vastaus). Tekstiin liittyvät ymmärtämistehtävät ovat nyt käytössä, koska koko valittu lähde on luettavissa tässä. Tämä on lukemista, ei kuullunymmärtämistä."},
  {id:"los1-c08-words",version:"0.1.0",kind:"vocabulary",entries:[
    {id:"los1-c08-word-01",de:"verstehen",fi:"ymmärtää",note:"Ich verstehe nicht."},
    {id:"los1-c08-word-02",de:"Ich verstehe nicht.",fi:"En ymmärrä.",note:"Käyttövalmis ilmaus."},
    {id:"los1-c08-word-03",de:"wiederholen",fi:"toistaa",note:"Können Sie das bitte wiederholen?"},
    {id:"los1-c08-word-04",de:"Können Sie …?",fi:"Voitteko Te …?",note:"Opetellaan kiinteänä kohteliaana pyyntönä."},
    {id:"los1-c08-word-05",de:"noch einmal",fi:"vielä kerran",note:"Kertaus C07:stä."},
    {id:"los1-c08-word-06",de:"langsamer",fi:"hitaammin",note:"Vertaile: langsam = hitaasti."},
    {id:"los1-c08-word-07",de:"das Wort",fi:"sana",note:"Monikko die Wörter / die Worte eri yhteyksissä; ei vielä opeteta."},
    {id:"los1-c08-word-08",de:"der Satz",fi:"lause",note:"Monikko die Sätze."},
    {id:"los1-c08-word-09",de:"Was bedeutet das?",fi:"Mitä se tarkoittaa?",note:"Käyttövalmis kysymys."},
    {id:"los1-c08-word-10",de:"Deutsch",fi:"saksan kieli",note:"Kielten nimet isolla kirjaimella substantiiveina."},
    {id:"los1-c08-word-11",de:"auf Deutsch",fi:"saksaksi"},
    {id:"los1-c08-word-12",de:"auf Finnisch",fi:"suomeksi"},
    {id:"los1-c08-word-13",de:"sagen",fi:"sanoa"},
    {id:"los1-c08-word-14",de:"die Frage",fi:"kysymys"},
    {id:"los1-c08-word-15",de:"die Antwort",fi:"vastaus"},
    {id:"los1-c08-word-16",de:"die Aufgabe",fi:"tehtävä"},
    {id:"los1-c08-word-17",de:"die Schule",fi:"koulu"}
  ]},
  {id:"los1-c08-phrases",version:"0.1.0",kind:"grammar",
    title:"Fünf Rettungssätze · Viisi selviytymisfraasia",
    explanationFi:"Fraasi tarkoittaa valmista ilmaisua, jonka voi käyttää opettelematta vielä kaikkia sen kielioppisääntöjä. Kun et ymmärrä, sano Ich verstehe nicht. Kun haluat kuulla uudelleen, Noch einmal, bitte. tai kohteliaammin Können Sie das bitte wiederholen? Jos puhe on liian nopeaa, sano Bitte langsamer. Kun merkitys on epäselvä, Was bedeutet das? Pidemmässä kohteliaassa toistopyynnössä on können-verbi. Sen koko taivutusta tai lauseen sijamuotoja ei vielä vaadita.",
    examples:[
      {de:"Ich verstehe nicht.",fi:"En ymmärrä."},
      {de:"Noch einmal, bitte.",fi:"Vielä kerran, kiitos."},
      {de:"Bitte langsamer.",fi:"Hitaammin, kiitos."},
      {de:"Können Sie das bitte wiederholen?",fi:"Voitteko toistaa sen, olkaa hyvä?"},
      {de:"Was bedeutet das?",fi:"Mitä se tarkoittaa?"},
      {de:"Wie sagt man das auf Deutsch?",fi:"Miten tämä sanotaan saksaksi?"}
    ]},
  {id:"los1-c08-distinction",version:"0.1.0",kind:"grammar",
    title:"Miten valitsen sopivan pyynnön?",
    explanationFi:"Nicht ilmaisee tässä kieltoa: Ich verstehe nicht. Langsam tarkoittaa hitaasti, langsamer hitaammin. Wiederholen on toistaa. Bitte tekee lyhyestäkin pyynnöstä kohteliaamman. Isolla kirjoitettu Sie on teitittelypronomini. Ilmauksen Können Sie das bitte wiederholen? alku on kohtelias kysymys. Huomaa ero: Was bedeutet das? kysyy merkitystä, Wie sagt man das auf Deutsch? pyytää saksankielistä ilmaisua. Opettele nämä kokonaisina. Kun puhut vertaiselle, voit silti käyttää lyhyttä pyyntöä Noch einmal, bitte.",
    examples:[
      {de:"langsam → langsamer",fi:"hitaasti → hitaammin"},
      {de:"Was bedeutet das?",fi:"Mitä tämä tarkoittaa?"},
      {de:"Wie sagt man das auf Deutsch?",fi:"Miten tämä sanotaan saksaksi?"},
      {de:"Bitte langsamer.",fi:"Pyydät puhumaan hitaammin."}
    ]},
  {id:"los1-c08-tutorial-scenarios",version:"0.1.0",kind:"table",
    headers:["LOS!:n itse kirjoittama harjoitustilanne","Sopiva repliikki","Miksi"],
    rows:[
      ["Opettajan ohje menee ohi.","Ich verstehe nicht.","Kerro ettet ymmärtänyt."],
      ["Kuulit vain osan lauseesta.","Können Sie das bitte wiederholen?","Pyydä opettajaa toistamaan."],
      ["Puhe on liian nopeaa.","Bitte langsamer.","Pyydä hidastamista."],
      ["Taululla on tuntematon sana.","Was bedeutet das?","Kysy merkitystä."],
      ["Haluat saksankielisen ilmauksen.","Wie sagt man das auf Deutsch?","Kysy käännöstapaa."],
      ["Tarvitset vielä yhden toiston.","Noch einmal, bitte.","Pyydä uudelleen."]
    ]},
  {id:"los1-c08-text-b-pending",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Text B -aineistoa ei vielä julkaista. Suunnitelmassa on M-DIB-03:n Evan opiskelu- ja asumishaastattelu ja V-DIB-01:n Studentenausweis-video. Niiden tarkka käyttöoikeus, puheen vaikeusaste ja toistuminen LOS!:n sisällä ovat tarkistamatta. Nämä eivät ole tämän sivun omaa ääntä, eikä kuuntelutaitoa saa pisteyttää pelkkien kirjoitettujen lauseiden avulla."},
  {id:"los1-c08-practice-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Harjoittele kuutta tuttua luokkahuonetilannetta. Valitse fraasi, kokoa sanajärjestys ja muista kysyä merkitystä oikealla kysymyksellä. Nämä ovat LOS!:n omia opetustilanteita. Eri osion Text A -luetunymmärtämistehtävät ja tekstikohtainen korostusharjoitus perustuvat puolestaan Wikibooksin oikeaan julkaistuun lähteeseen. Kuunteluharjoitus lisätään vasta, kun alkuperäinen äänite on hyväksytty ja laitetestattu."},
  {id:"los1-c08-production-ask",version:"0.1.0",kind:"production",
    titleFi:"Kirjoita kolme omaa selviytymistilannetta",
    promptFi:"Kirjoita kolme erillistä yhden tai kahden repliikin kuvitteellista tilannetta: (1) et ymmärrä opettajan ohjetta, (2) tarvitset uuden, hitaamman toiston, (3) et tiedä sanan merkitystä. Älä kopioi ensin mallia. Käytä opittuja käyttöfraaseja. Tämä on LOS!:n oma kirjoitusharjoitus, ei alkuperäislähteen litteraatti.",
    modelDe:"Ich verstehe nicht.\nKönnen Sie das bitte wiederholen? Bitte langsamer.\nWas bedeutet das?",
    modelFi:"En ymmärrä.\nVoitteko toistaa sen? Hitaammin, kiitos.\nMitä se tarkoittaa?",
    criteriaFi:["Kirjoitin kolme toisistaan erilaista avunpyyntöä.","Toistopyynnössä oli bitte tai kohtelias Sie.","Hidastamista pyysin sanalla langsamer.","Kirjoitin saksan erikoismerkit oikein.","Osaan kertoa, mitä fraasit tarkoittavat."]
  },
  {id:"los1-c08-production-speak",version:"0.1.0",kind:"production",
    titleFi:"Harjoittele ääneen ilman pisteitä",
    promptFi:"Lue omat kolme avunpyyntöä ääneen. Pidä tauko jokaisen välillä. Vertaa sitten malliin. Äänen tallentaminen on vapaaehtoista ja toimii vain laitteella, jos selaimesi sallii sen. Ääntämistä ei pisteytetä automaattisesti.",
    modelDe:"Ich verstehe nicht.\nNoch einmal, bitte.\nBitte langsamer.\nWas bedeutet das?",
    modelFi:"En ymmärrä.\nVielä kerran, kiitos.\nHitaammin, kiitos.\nMitä se tarkoittaa?",
    criteriaFi:["Uskalsin sanoa kaikki neljä pyyntöä ääneen.","Valitsin tilanteeseen sopivan fraasin.","Tunnistan Sie-teitittelyn.","Tiedän, mitä pitää vielä harjoitella."]
  },
  {id:"los1-c08-culture",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Oppimistilanteessa kysyminen ja toiston pyytäminen ovat tavallisia tapoja varmistaa ymmärtäminen. Saksankielisissä kouluissa ja maissa opettajan puhuttelukäytännöt voivat vaihdella; yhden muodon esittäminen kaikkialla pakollisena ei olisi oikein. Harjoittelemme kohteliasta Sie-kysymystä, koska se on turvallinen ja helposti tunnistettava alkeiden malli. Jos et tiedä mitä sanoa, Noch einmal, bitte. toimii monessa tilanteessa. Tämä on LOS!:n oma kulttuuri- ja kielikäyttöselitys, ei lainattu haastattelukatkelma."},
  {id:"los1-c08-test-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"C08:n kappaletesti mittaa vain tässä opetetun fraasikielen tuntemista. 12 tarkistettavaa kysymystä ja erillinen pisteyttämätön itsearviointi. Tekstin ymmärtämis-, kuuntelu- ja ääntämispisteitä ei merkitä ansaituiksi ennen autenttisen lähteen ja toimivan median hyväksymistä. Vastaukset näytetään vasta kokeen palautuksen jälkeen."},
];
