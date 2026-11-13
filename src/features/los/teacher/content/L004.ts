import type {TeacherLesson,TeacherScene} from "../core.ts";

/**
 * Full scripted L004 prototype, independently written to teach the skill.
 * This teaches without routing students away from the lesson and contains
 * no generated speech, fake audio or automatic CEFR/mastery promises.
 */
const generalHelp=(simpler:string,anotherExample:string,why:string):TeacherScene["help"]=>
 ({simpler,anotherExample,why});
export const LOS1_L004_TEACHER_LESSON:TeacherLesson={
  id:"L004",bookId:1,chapterId:"01",
  title:"Tervehdykset muistista",objective:"Valitsen tilanteeseen sopivan tervehdyksen ja hyvästelyn ilman näkyvää mallia.",
  estimatedMinutes:25,contentVersion:"2.0.0-pilot-1",
  scenes:[
    {
      id:"start",phase:"introduction",heading:"Mitä tänään opitaan?",
      paragraphs:[
        "Tällä tunnilla opit valitsemaan saksankielisen tervehdyksen tilanteen mukaan. Tavoitteena ei ole vain tunnistaa sanoja, vaan osata käyttää niitä myös ilman suomennosta.",
        "Harjoittelemme aamun, päivän ja illan tervehdyksiä sekä tuttavallisen ja kohteliaan hyvästelyn eroa. Ensin kerrataan, sitten opettaja näyttää mallin ja lopuksi harjoittelet itse.",
        "Voit edetä omaan tahtiin, avata oppikirjan erikseen tai keskeyttää milloin tahansa. Tunti toimii ilman ääntä. Tässä pilottitunnissa ei käytetä tekoälyä eikä automaattista puheentunnistusta."
      ],
      help:generalHelp("Opettelemme, mitä sanot saksaksi, kun tapaat tai hyvästelet toisen ihmisen.",
        "Aamulla tervehdit eri tavalla kuin illalla. Ystävälle voit puhua rennommin.",
        "Tilanteeseen sopiva tervehdys auttaa aloittamaan keskustelun luontevasti."),
    },
    {
      id:"recall",phase:"activation",heading:"Muistatko vielä nämä?",
      paragraphs:[
        "Aiemmin olet nähnyt sanat Guten Morgen, Guten Tag ja Guten Abend. Mieti ensin, mitä niistä käyttäisit illalla.",
        "Tämä on muistelu, ei koe. Jos sanat ovat unohtuneet, opettaja näyttää oikean merkityksen."
      ],
      question:{
        id:"L004-Q-RECALL",prompt:"Kello on 19 ja tapaat tuttavan. Mikä ilmaus tarkoittaa hyvää iltaa?",
        options:[{id:"a",de:"Guten Morgen!"},{id:"b",de:"Guten Abend!"},{id:"c",de:"Tschüss!"}],
        correctId:"b",hint:"Abend tarkoittaa iltaa. Morgen tarkoittaa aamua.",
        secondExplanation:"Käy parit läpi: Morgen = aamu, Tag = päivä, Abend = ilta. Tschüss on hyvästely.",
        correctExplanation:"Guten Abend! on hyvä iltaa. Se sopii illalla tapaamiseen.",
        mode:"activation"
      },
      help:generalHelp("Valitse sana, jonka merkitys on ilta.",
        "Guten Morgen = hyvää huomenta. Guten Abend = hyvää iltaa.",
        "Vuorokaudenaika on yksi tervehdyksen valintaan vaikuttavista asioista."),
      bookRef:{bookId:1,chapterId:"01",section:"vocabulary",label:"Avaa C01:n tervehdysten sanasto"}
    },
    {
      id:"meaning",phase:"introduction",heading:"Miksi saksassa on monta tervehdystä?",
      paragraphs:[
        "Kun tapaat ihmisen, aloitat usein tervehdyksellä. Saksassa voit valita ilmauksen vuorokaudenajan ja tilanteen mukaan.",
        "Guten Morgen! tarkoittaa hyvää huomenta. Guten Tag! tarkoittaa hyvää päivää. Guten Abend! tarkoittaa hyvää iltaa.",
        "Hallo! on tavallinen tuttavallinen tervehdys, joka ei samalla tavalla riipu vuorokaudenajasta. Se ei kuitenkaan aina ole paras valinta virallisessa tilanteessa."
      ],
      example:{de:"Guten Morgen!",fi:"Hyvää huomenta!",commentary:"Valitset aamun tervehdyksen, kun aloitat tapaamisen aamulla."},
      help:generalHelp("Tapaaminen aloitetaan tervehdyksellä. Ajankohta ja tuttavuus vaikuttavat valintaan.",
        "Kaverille: Hallo! Tuntemattomalle aikuiselle päivän aikana: Guten Tag!",
        "Sama ilmaus ei aina sovi jokaiseen kohtaamiseen, siksi opetellaan erilaiset tilanteet."),
      bookRef:{bookId:1,chapterId:"01",section:"culture",label:"Avaa C01:n tervehdyskulttuurin osio"}
    },
    {
      id:"contrast",phase:"explanation",heading:"Tervehdys ei ole hyvästely",
      paragraphs:[
        "Tässä on tärkeä ero: tervehdys sanotaan, kun tapaat jonkun. Hyvästely sanotaan, kun lähdet tai keskustelu päättyy.",
        "Tschüss! on tavallinen rento hyvästely. Auf Wiedersehen! on kohteliaampi ja muodollisempi tapa sanoa näkemiin.",
        "Guten Tag! sopii moniin päiväsaikaan tapahtuviin kohteliaisiin kohtaamisiin, mutta sitä ei käytetä tässä opetuksessa lähtöhetken hyvästelynä."
      ],
      example:{de:"Tschüss!",fi:"Hei hei! / Moikka!",commentary:"Kaveri lähtee koulupäivän jälkeen. Tschüss sopii hyvästelyyn."},
      help:generalHelp("Tervehdys = tulet. Hyvästely = lähdet. Katso ensin, kumpi tilanne on.",
        "Tapaat opettajan: Guten Tag! Poistut vastaanotolta: Auf Wiedersehen!",
        "Sanavalinta kertoo sekä tilanteesta että siitä, miten tuttavallisesti puhuttelet toista."),
      bookRef:{bookId:1,chapterId:"01",section:"vocabulary",label:"Avaa tervehdysten ja hyvästelyjen sanasto"}
    },
    {
      id:"model",phase:"example",heading:"Opettajan mallisuoritus: aamulla kouluun",
      paragraphs:[
        "Kuvitellaan, että saavut koululle aamulla kello 8 ja näet opettajan. Miten valitaan sopiva ilmaus?",
        "Opettaja etenee vaiheittain. Katso, miten tilanne, vuorokaudenaika ja puhetilanne johtavat lopputulokseen."
      ],
      board:[
        {text:"Tilanne: tapaat ihmisen",note:"Koska kohtaaminen alkaa, tarvitset tervehdyksen, et hyvästelyä."},
        {text:"Ajankohta: kello 8 aamulla",note:"Saksan Morgen tarkoittaa aamua. Guten Abend ei siis sovi tähän tilanteeseen."},
        {text:"Puhut opettajalle",note:"Valitaan turvallinen kohtelias tervehdys, eikä oleteta tuttavallista puhuttelua."},
        {text:"Guten Morgen!",note:"Tämä tarkoittaa hyvää huomenta. Nyt ratkaisu on valmis."},
      ],
      example:{de:"Guten Morgen!",fi:"Hyvää huomenta!",commentary:"Kohtaaminen + aamu + kohtelias tilanne."},
      help:generalHelp("Kysy ensin: tapaanko ihmisen vai hyvästelenkö hänet? Sitten mieti vuorokaudenaikaa.",
        "Jos sama tilanne tapahtuu päivällä, Guten Tag! on luonteva vaihtoehto.",
        "Opettaja valitsee sanan sen merkityksen ja käyttötilanteen perusteella, ei arvaamalla.")
    },
    {
      id:"guided",phase:"guided",heading:"Harjoitellaan yhdessä",
      paragraphs:[
        "Nyt sinä valitset tervehdyksen. Voit käyttää tarvittaessa vihjettä. Vihjeen käyttö ei ole virhe eikä estä tunnin jatkamista.",
        "Jos vastaus on väärin, saat ensin vihjeen. Toisen virheen jälkeen opettaja selittää asian toisin."
      ],
      question:{
        id:"L004-Q-GUIDED",prompt:"Tapaat opettajan aamulla kello 8. Mitä sanot?",
        options:[{id:"a",de:"Guten Abend!"},{id:"b",de:"Tschüss!"},{id:"c",de:"Guten Morgen!"}],
        correctId:"c",hint:"Aamulla käytetään sanaa Morgen, joka tarkoittaa aamua.",
        secondExplanation:"Tapaaminen aloitetaan tervehdyksellä. Guten Abend = ilta; Tschüss = hyvästely. Aamu = Morgen.",
        correctExplanation:"Guten Morgen! on tähän tilanteeseen sopiva tervehdyksesi.",
        mode:"guided"
      },
      help:generalHelp("Valitse ilmaus, jonka yhteydessä on aamun saksankielinen sana.",
        "Jos kohtaisit saman opettajan keskellä päivää, sanoisit Guten Tag!",
        "Aamu ja tapaaminen johtavat sanoihin Guten Morgen."),
      bookRef:{bookId:1,chapterId:"01",section:"vocabulary",label:"Avaa C01:n sanasto erilliseen välilehteen"}
    },
    {
      id:"farewell",phase:"independent",heading:"Yritä nyt ilman mallia",
      paragraphs:[
        "Seuraava tilanne ei ole tervehtiminen vaan hyvästely. Vastaa ensin muistista.",
        "Mallit ja vihjeet ovat edelleen saatavilla, mutta niiden kanssa ratkaistu tehtävä kirjautuu tuetuksi harjoitteluksi, ei itsenäiseksi näytöksi."
      ],
      question:{
        id:"L004-Q-INDEPENDENT",prompt:"Kaverisi lähtee koulun jälkeen kotiin. Mikä ilmaus on rento hyvästely?",
        options:[{id:"a",de:"Tschüss!"},{id:"b",de:"Guten Morgen!"},{id:"c",de:"Guten Tag!"}],
        correctId:"a",hint:"Lähtötilanne vaatii hyvästelyn, ei uutta tervehdystä.",
        secondExplanation:"Guten Morgen ja Guten Tag sanotaan tavattaessa. Tschüss on tavallinen tuttavallinen hyvästely.",
        correctExplanation:"Tschüss! on rento ja tilanteeseen sopiva tapa hyvästellä kaveri.",
        mode:"independent"
      },
      help:generalHelp("Kun toinen lähtee, sano hyvästely. Kun toinen tulee, sano tervehdys.",
        "Tuttu kaveri lähtee: Tschüss! Virallisemmassa lähtötilanteessa: Auf Wiedersehen!",
        "Valitset nyt ilmauksen suhteen ja tilanteen perusteella."),
      bookRef:{bookId:1,chapterId:"01",section:"vocabulary",label:"Avaa kaverille sopivat ilmaukset"}
    },
    {
      id:"application",phase:"application",heading:"Sovella uudessa tilanteessa",
      paragraphs:[
        "Olet tutustumassa uuteen aikuiseen päiväsaikaan. Haluat aloittaa kohteliaasti.",
        "Mieti ensin tilanne: keskustelu alkaa ja nyt on päivä. Valitse sopivin ilmaus kolmesta vaihtoehdosta."
      ],
      question:{
        id:"L004-Q-TRANSFER",prompt:"Kello on 14. Menet vastaanottotiskille ja aloitat keskustelun tuntemattoman aikuisen kanssa.",
        options:[{id:"a",de:"Tschüss!"},{id:"b",de:"Guten Tag!"},{id:"c",de:"Guten Abend!"}],
        correctId:"b",hint:"Keskustelu alkaa päivällä, joten et tarvitse hyvästelyä etkä illan tervehdystä.",
        secondExplanation:"Tschüss on hyvästely; Guten Abend on iltatervehdys. Päiväaikaiseen kohteliaaseen aloitukseen sopii Guten Tag.",
        correctExplanation:"Guten Tag! on kohtelias päiväsaikainen tervehdys uudessa kohtaamisessa.",
        mode:"transfer"
      },
      help:generalHelp("Tapaaminen + päivä + kohtelias tilanne = Guten Tag.",
        "Jos lähtisit samalta vastaanotolta, sanoisit mieluummin Auf Wiedersehen.",
        "Tilanteen kolme osaa auttavat valitsemaan oikean ilmauksen."),
      bookRef:{bookId:1,chapterId:"01",section:"culture",label:"Avaa tervehdysten alueellinen käyttö"}
    },
    {
      id:"exit",phase:"review",heading:"Lopputarkistus uudessa tilanteessa",
      paragraphs:[
        "Viimeinen tehtävä tarkistaa, erotatko kohteliaan hyvästelyn tervehdyksistä.",
        "Muista, että yksittäinen oikea monivalinta ei vielä todista, että osaat käyttää ilmaisua itsenäisessä keskustelussa."
      ],
      question:{
        id:"L004-Q-EXIT",prompt:"Lähdet asioinnin jälkeen vastaanotolta ja hyvästelet kohteliaasti. Mitä sanot?",
        options:[{id:"a",de:"Guten Morgen!"},{id:"b",de:"Hallo!"},{id:"c",de:"Auf Wiedersehen!"}],
        correctId:"c",hint:"Tarvitset kohteliaan hyvästelyn, et uutta tervehdystä.",
        secondExplanation:"Hallo aloittaa tuttavallisen kohtaamisen ja Guten Morgen on aamun tervehdys. Auf Wiedersehen tarkoittaa näkemiin.",
        correctExplanation:"Auf Wiedersehen! on tähän tilanteeseen kohtelias hyvästely.",
        mode:"transfer"
      },
      help:generalHelp("Kohtelias lähtötilanne: sano näkemiin.",
        "Jos hyvästelet läheisen ystävän, Tschüss! käy usein paremmin.",
        "Konteksti ratkaisee: tapaatko vai lähdetkö ja onko tilanne muodollinen."),
      bookRef:{bookId:1,chapterId:"01",section:"practice",label:"Avaa C01:n harjoitukset"}
    },
    {
      id:"summary",phase:"summary",heading:"Mitä osaat tämän tunnin jälkeen?",
      paragraphs:[
        "Olet käynyt läpi tervehdyksen ja hyvästelyn eron, vuorokaudenajan merkityksen ja kohteliaisuuden vaikutuksen sanavalintaan.",
        "Tunnin lopussa näet erikseen, mitkä valintatehtävät sujuivat ilman vihjeitä. Vihjeen avulla onnistuminen on hyödyllistä harjoittelua, mutta sitä ei merkitä itsenäiseksi osaamisnäytöksi.",
        "Seuraava askel on käyttää ilmauksia itse kirjoitetussa tai ääneen esitetyssä keskustelussa. Vasta monipuolisemmat itsenäiset suoritukset voivat tukea varsinaista osaamisarviota."
      ],
      help:generalHelp("Tärkeintä on, että tunnistat milloin sanot Guten Morgen, Guten Tag, Tschüss ja Auf Wiedersehen.",
        "Kirjoita kahden repliikin kuvitteellinen keskustelu: Guten Tag! / Guten Tag!",
        "Vain todellisiin suorituksiin perustuva näyttö auttaa tietämään, mitä jo osaat."),
      bookRef:{bookId:1,chapterId:"01",section:"apply",label:"Harjoittele omaa keskustelua oppikirjassa"}
    },
  ]
};
