/** C05 main instructional chapter: feeling and reacting, at true zero-entry level.
 * Text B is COERLL/University of Texas, Deutsch im Blick Kapitel 1,
 * the complete "Wie geht's?" SOURCE CATEGORY including formal question,
 * positive and negative original human-authored response expressions.
 * https://coerll.utexas.edu/dib/voc.php?k=1&s=1
 * Text source is CC BY 4.0; LOS! supplies original Finnish translations.
 * No unverified COERLL recordings are embedded here.
 *
 * Separate actual native-speaker audio M-COM-05 is by Jeuwre (Berlin),
 * Commons "De-wie geht es dir.ogg", dated 2017-05-07, CC BY-SA 4.0.
 * It is a SHORT pronunciation clip, not the Text B word-list recording.
 */
import type {ContentBlock} from "./model";

export const LOS1_C05_DIB_FEELING_LINES=[
  {de:"Wie geht es Ihnen?",fi:"Mitä teille kuuluu?",noteFi:"Kohtelias C04:stä tuttu muoto."},
  {de:"Sehr gut, danke!",fi:"Oikein hyvää, kiitos!"},
  {de:"Es geht mir gut.",fi:"Minulle kuuluu hyvää."},
  {de:"Ausgezeichnet!",fi:"Erinomaista!",noteFi:"Tunnistettava vahva myönteinen reaktio."},
  {de:"Toll!",fi:"Mahtavaa!"},
  {de:"Wunderbar!",fi:"Ihanaa! / Hienoa!",noteFi:"Tunnistamista varten."},
  {de:"Was ist los?",fi:"Mikä hätänä? / Mitä on tapahtunut?",noteFi:"Ei pakollinen tuottamistavoite C05:ssa."},
  {de:"Es geht mir nicht so gut.",fi:"Minulle ei kuulu kovin hyvää."},
  {de:"Es geht mir schlecht.",fi:"Minulle kuuluu huonoa."},
  {de:"Ich fühle mich schlecht.",fi:"Voin huonosti.",noteFi:"Vaikeampi rakenne, vain tunnistamista varten."},
  {de:"Ich bin müde.",fi:"Olen väsynyt."},
  {de:"Ich bin krank.",fi:"Olen sairas.",noteFi:"Tunnista, ei terveystietojen kysymistä."},
  {de:"Ich habe Kopfschmerzen.",fi:"Minulla on päänsärky.",noteFi:"Tunnista; haben-verbin taivutus opetetaan myöhemmin."},
] as const;

export const LOS1_C05_BLOCKS:ContentBlock[]=[
  {
    id:"los1-c05-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Olet jo oppinut tervehtimään, kysymään nimeä ja kertomaan lähtöpaikan. "
      +"Nyt opit kysymään vointia ja vastaamaan siihen lyhyesti. "
      +"C05:n tärkeimmät muistista käytettävät fraasit ovat Wie geht's?, Wie geht es dir?, "
      +"Mir geht's gut., Gut, danke., Nicht so gut. ja Und dir?. "
      +"Kohteliaassa tilanteessa käytät jo tuttua kysymystä Wie geht es Ihnen? ja vastaat Und Ihnen?. "
      +"Tämä on lyhyt arkinen keskustelu, ei lääketieteellinen arvio omasta terveydestäsi.",
  },
  {
    id:"los1-c05-grammar-how",version:"0.1.0",kind:"grammar",
    title:"Wie geht's? · Mitä kuuluu?",
    explanationFi:"Wie geht's? on lyhyt tavallinen kysymys 'Mitä kuuluu?'. "
      +"Pidempi tuttavallinen muoto on Wie geht es dir? (Mitä sinulle kuuluu?). "
      +"Kohtelias C04:stä tuttu muoto on Wie geht es Ihnen? (Mitä teille kuuluu?). "
      +"Apostrofi lyhenteessä geht's vastaa pois jäänyttä e-kirjainta sanasta es. "
      +"Opettele nämä kokonaisina kysymyksinä. Tässä kirjassa ei vielä tarvitse "
      +"osata selittää, miksi dir ja Ihnen ovat juuri näissä muodoissa.",
    examples:[
      {de:"Wie geht's?",fi:"Mitä kuuluu? · tuttavallinen lyhyt"},
      {de:"Wie geht es dir?",fi:"Mitä sinulle kuuluu? · tuttu"},
      {de:"Wie geht es Ihnen?",fi:"Mitä teille kuuluu? · kohtelias"},
      {de:"Und dir?",fi:"Entä sinulle? · tuttu"},
      {de:"Und Ihnen?",fi:"Entä teille? · kohtelias"},
    ],
  },
  {
    id:"los1-c05-grammar-reply",version:"0.1.0",kind:"grammar",
    title:"Mir geht's gut. · Vastaa lyhyesti ja rehellisesti",
    explanationFi:"Voit vastata Gut, danke. (Hyvää, kiitos.) tai "
      +"Mir geht's gut. (Minulle kuuluu hyvää.). "
      +"Hyvä vastaus voi olla myös Sehr gut, danke! (Oikein hyvää, kiitos!). "
      +"Jos vointisi ei ole hyvä, voit sanoa Nicht so gut. (Ei kovin hyvää.) "
      +"tai Es geht mir nicht so gut. (Minulle ei kuulu kovin hyvää.). "
      +"Muutkin vastaukset kuin 'hyvin' ovat täysin oikeita: kyse ei ole testissä "
      +"omien tunteiden paljastamisesta. "
      +"Lauseessa es geht mir gut on kolme sanaa, joiden tarkkaa sanasanaista "
      +"suomennosta ei pidä pakottaa suomen lauserakenteeseen. Opettele fraasi kokonaisena.",
    examples:[
      {de:"Gut, danke.",fi:"Hyvää, kiitos."},
      {de:"Mir geht's gut.",fi:"Minulle kuuluu hyvää."},
      {de:"Es geht mir gut.",fi:"Minulle kuuluu hyvää."},
      {de:"Sehr gut, danke!",fi:"Oikein hyvää, kiitos!"},
      {de:"Nicht so gut.",fi:"Ei kovin hyvää."},
      {de:"Es geht mir nicht so gut.",fi:"Minulle ei kuulu kovin hyvää."},
    ],
  },
  {
    id:"los1-c05-grammar-negation",version:"0.1.0",kind:"grammar",
    title:"nicht ja sehr · Pieni sana muuttaa merkitystä",
    explanationFi:"Nicht ilmaisee kieltoa tai vastakohtaa. "
      +"Sehr vahvistaa merkitystä: sehr gut tarkoittaa 'erittäin hyvää'. "
      +"Nicht so gut taas tarkoittaa 'ei kovin hyvää'. "
      +"Tässä kappaleessa käytät niitä osana valmiita vointifraaseja. "
      +"Älä vielä opettele nicht-sanan paikkaa kaikissa saksan lauserakenteissa. "
      +"Vertaa Es geht mir gut. (minulle kuuluu hyvää) ja "
      +"Es geht mir nicht so gut. (minulle ei kuulu kovin hyvää).",
    examples:[
      {de:"gut",fi:"hyvin / hyvä"},
      {de:"sehr gut",fi:"erittäin hyvin"},
      {de:"nicht so gut",fi:"ei kovin hyvin"},
      {de:"Es geht mir gut.",fi:"Minulle kuuluu hyvää."},
      {de:"Es geht mir nicht so gut.",fi:"Minulle ei kuulu kovin hyvää."},
    ],
  },
  {
    id:"los1-c05-grammar-compare",version:"0.1.0",kind:"table",
    headers:["Kysymys","Lyhyt vastaus","Kysymys takaisin"],
    rows:[
      ["Wie geht's?","Gut, danke.","Und dir?"],
      ["Wie geht es dir?","Mir geht's gut.","Und dir?"],
      ["Wie geht es Ihnen?","Es geht mir gut.","Und Ihnen?"],
      ["Wie geht es dir?","Nicht so gut.","Und dir?"],
    ],
  },
  {
    id:"los1-c05-words",version:"0.1.0",kind:"vocabulary",
    entries:([
      ["Wie geht's?","mitä kuuluu?","tuttavallinen lyhyt kysymys"],
      ["Wie geht es dir?","mitä sinulle kuuluu?","tuttavallinen"],
      ["Wie geht es Ihnen?","mitä teille kuuluu?","kohtelias, C04:n kertausmerkitys"],
      ["es geht","menee / sujuu (fraasissa)","opettele kokonaisena"],
      ["mir","minulle","vain vointifraaseissa"],
      ["dir","sinulle","vain vointifraaseissa"],
      ["gut","hyvin / hyvä","perusvastaus"],
      ["sehr gut","erittäin hyvin","erittäin myönteinen vastaus"],
      ["nicht","ei","kielto fraasissa"],
      ["nicht so gut","ei kovin hyvin","vointivastaus"],
      ["schlecht","huonosti / huono","vointia kuvaava"],
      ["müde","väsynyt","esimerkiksi Ich bin müde."],
      ["prima","mainiosti","myönteinen arkinen vastaus"],
      ["toll","mahtavaa","vahva myönteinen vastaus"],
      ["und dir?","entä sinulle?","kysymys takaisin"],
      ["und Ihnen?","entä teille?","kohtelias kysymys takaisin"],
      ["mir geht's gut","minulle kuuluu hyvää","yleinen valmis fraasi"],
    ] as [string,string,string][]).map(([de,fi,note],i)=>({
      id:"los1-c05-word-"+String(i+1).padStart(2,"0"),de,fi,note,
    })),
  },
  {
    id:"los1-c05-text-b-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Text B on Texasin yliopiston COERLL:n avoimeen Deutsch im Blick -materiaaliin kuuluva "
      +"kokonainen 'Wie geht’s?' -sanasto-osio, tässä alkuperäisessä järjestyksessä. "
      +"Lähde on oikeiden ihmisten tuottama sanasto positiivisista ja negatiivisista vointivastauksista. "
      +"Se ei ole dialogi eikä tässä vaiheessa toimivaksi varmennettu äänite. "
      +"Kaikki kolmetoista saksankielistä ilmausta ovat kirjoitettuina LOS!:iin "
      +"niiden suomennosten kanssa. Tarkoitus on tunnistaa sävyjä, "
      +"mutta vain opetetut perusfraasit kuuluvat aktiiviseen testiin.",
  },
  {
    id:"los1-c05-dib-05-lines",version:"1.0.0",kind:"transcript",
    sourceId:"M-DIB-05",lines:LOS1_C05_DIB_FEELING_LINES.map(row=>({...row})),
  },
  {
    id:"los1-c05-text-b-followup",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Huomaa ero: Sehr gut, danke! ja Toll! kuvaavat myönteistä vointia. "
      +"Es geht mir nicht so gut. ja Es geht mir schlecht. taas viittaavat huonoon vointiin. "
      +"Erityisen pitkiä tai terveydentilaa kuvaavia sanoja ei tarvitse vielä itse käyttää. "
      +"Deutsch im Blick -sivulla on myös sanastoääntä, mutta sen "
      +"yksilöllistä suoraa mediaosoitetta ja oikeuksia ei ole vielä vahvistettu LOS!:n soittimeen. "
      +"Äänitettä ei väitetä lisätyksi tähän versioon.",
  },
  {
    id:"los1-c05-audio-guide",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Kuuntele nyt oikean saksaa äidinkielenään puhuvan Jeuwren lausuma "
      +"Wie geht es dir?. Kyse on lyhyestä noin kahden sekunnin "
      +"ääntämisesimerkistä, ei Heinrichin ja Karlin dialogin äänityksestä "
      +"eikä COERLL:n sanastoluettelon ääniversiosta. "
      +"Sano fraasi perässä kaksi kertaa. Jos laite ei toista ääntä, "
      +"voit lukea kysymyksen saksaksi ja äänittää omasi erillisessä puheharjoituksessa.",
  },
  {
    id:"los1-c05-m-com-05-pronunciation",version:"0.1.0",kind:"media",mediaType:"audio",
    sourceId:"M-COM-05",title:"Wie geht es dir? · aito äidinkielisen saksanpuhujan ääntämisnäyte",
    embedUrl:"https://upload.wikimedia.org/wikipedia/commons/3/32/De-wie_geht_es_dir.ogg",
    mp3Url:"https://upload.wikimedia.org/wikipedia/commons/transcoded/3/32/De-wie_geht_es_dir.ogg/De-wie_geht_es_dir.ogg.mp3",
  },
  {
    id:"los1-c05-application-intro",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Kirjoita lyhyt oma keskustelusi. Tervehdi, kysy vointia, anna realistinen "
      +"vastaus ja kysy takaisin. Voit kirjoittaa hyvän, neutraalin tai huonon voinnin "
      +"tai keksiä henkilöhahmon. Sinun ei tarvitse kertoa oikeasta mielialastasi. "
      +"Vertaa sen jälkeen omaa tekstiä LOS!:n malliin. "
      +"Kirjoituksen oikeellisuutta ei automaattisesti pisteytetä.",
  },
  {
    id:"los1-c05-production",version:"0.1.0",kind:"production",
    titleFi:"Kysy vointia ja reagoi",
    promptFi:"Kirjoita lyhyt keskustelu, jossa on tervehdys, Wie geht's? tai Wie geht es dir?, "
      +"vastaus, esimerkiksi Gut, danke. tai Nicht so gut., sekä Und dir?.",
    modelDe:"A: Hallo! Wie geht's?\nB: Gut, danke. Und dir?\nA: Mir geht's gut. Bis später!",
    modelFi:"A: Hei! Mitä kuuluu?\nB: Hyvää, kiitos. Entä sinulle?\nA: Minulle kuuluu hyvää. Nähdään myöhemmin!",
    criteriaFi:[
      "Aloitin tervehdyksellä ja kysyin vointia.",
      "Kirjoitin ymmärrettävän, tilanteeseen sopivan vastauksen.",
      "Muistin kysyä takaisin Und dir? tai Und Ihnen?.",
      "Varmistin, etten sekoittanut tuttua dir ja kohteliasta Ihnen.",
    ],
  },
  {
    id:"los1-c05-culture",version:"0.1.0",kind:"paragraph",language:"fi",
    text:"Vointikysymys voi olla saksankielisessäkin arjessa lyhyt kohtelias "
      +"aloitus, eikä siihen aina liity pitkää keskustelua. "
      +"Ystävien välillä voidaan toisaalta kertoa enemmän. "
      +"Suhde ja tilanne vaikuttavat siihen, miten pitkä tai henkilökohtainen "
      +"vastaus tuntuu sopivalta. Ei ole olemassa yhtä sääntöä, "
      +"jonka mukaan kaikki saksankieliset vastaisivat aina samalla tavalla. "
      +"Harjoittele lyhyttä kohteliasta vastausta ja toisen kuuntelemista.",
  },
  {
    id:"los1-c05-culture-table",version:"0.1.0",kind:"table",
    headers:["Tilanne","Mahdollinen kysymys","Mahdollinen vastaus"],
    rows:[
      ["Tuttu samanikäinen","Wie geht's?","Gut, danke. Und dir?"],
      ["Ystävä kertoo huonosta päivästä","Wie geht es dir?","Nicht so gut."],
      ["Muodollinen tervehdys","Wie geht es Ihnen?","Es geht mir gut. Und Ihnen?"],
      ["Tuttu voi erinomaisesti","Wie geht's?","Sehr gut, danke!"],
    ],
  },
];
