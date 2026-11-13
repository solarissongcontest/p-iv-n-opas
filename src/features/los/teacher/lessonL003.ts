import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 L003. The complete eight-turn human-authored text stays in the
 * licensed book reader (M-COM-01); this teacher script introduces strategies
 * and uses the existing C01-SOURCE-Q01/Q02 checked answers as evidence.
 */
export const LOS1_L003_TEACHER: TeacherLesson = {
  id:"L003",bookId:1,chapterId:"01",version:"2.0.0-preview.1",
  title:"Lue Franzin ja Jörgin keskustelu",
  objective:"Löydän oikeasta kahdeksan repliikin keskustelusta puhujat, tervehdyksen ja hyvästelyn.",
  estimatedMinutes:30,
  requiredQuestionIds:["first-word","farewell-speaker","exit"],
  requiredActivityIds:["text-read","highlight-tried"],
  requiredPracticeIds:[],
  requiredCheckedIds:["C01-SOURCE-Q01","C01-SOURCE-Q02"],
  scenes:[
    {
      id:"welcome",kind:"introduction",phase:"Aloitus",title:"Ensimmäinen oikea saksankielinen keskustelusi",
      paragraphs:[
        "Nyt luet kokonaisen saksankielisen keskustelun. Se ei ole opettajan keksimä mallidialogi, vaan LOSin kirjassa julkaistu alkuperäinen kahdeksan puheenvuoron teksti.",
        "Keskustelussa puhuvat Franz ja Jörg. Tällä oppitunnilla tarkoituksesi ei vielä ole ymmärtää jokaista verbiä, ikää tai kysymysmuotoa.",
        "Tavoitteena on tunnistaa, kuka puhuu, miten keskustelu alkaa ja miten se päättyy. Vaikeammat rakenteet opetellaan myöhemmillä tunneilla.",
      ],
    },
    {
      id:"strategy",kind:"explanation",phase:"Lukustrategia",title:"Näin luet tekstiä, jonka kaikkia sanoja et vielä tunne",
      paragraphs:[
        "Ensimmäisellä lukukerralla katso puhujien nimiä ja tuttuja sanoja. Älä pysähdy jokaisen uuden sanan kohdalla.",
        "Toisella lukukerralla avaa tekstissä muutama tärkeä sana ja katso sen suomenkielinen selitys. Tärkeä kysymys on: mitä pystyn jo päättelemään?",
        "Kolmannella lukukerralla etsi selkeä aloitustervehdys ja viimeinen hyvästely. Sinun ei tarvitse osata keskustelun ikään liittyviä rakenteita vielä.",
        "Jos alkuperäinen äänite toimii, voit kuunnella sen. Jos ei, luettu teksti ja sanaselitykset riittävät tämän tunnin lukemistavoitteeseen. Kuuntelutaitoa ei silloin väitetä mitatuksi.",
      ],
      help:[
        {title:"Miksi en opettele jokaista sanaa heti?",body:"Tekstin ymmärtäminen ja sanojen ulkoa muistaminen ovat eri tehtäviä. Alussa tärkeää on löytää kokonaisuuden merkitys ja tunnistaa jo opetetut ilmaukset."},
        {title:"Mitä tarkoittaa repliikki?",body:"Repliikki on yhden puhujan puheenvuoro. Tämän alkuperäisen tekstin kahdeksan repliikkiä ovat kirjan lukijassa kokonaisina."},
      ],
    },
    {
      id:"first-word",kind:"question",phase:"Ennakkotarkistus",title:"Mikä tuttu sana voisi aloittaa keskustelun?",
      paragraphs:["Valitse aloitustervehdys. Olet nähnyt sen jo ensimmäisellä oppitunnilla."],
      question:{
        type:"choice",skillId:"L1-READ-01",prompt:"Mikä sana on tavallinen arkinen tervehdys?",
        options:[
          {id:"a",label:"Danke!",wrongFeedback:"Danke tarkoittaa kiitos. Se ei ole tavallinen keskustelun aloitustervehdys."},
          {id:"b",label:"Hallo!"},
          {id:"c",label:"Tschüss!",wrongFeedback:"Tschüss on arkinen hyvästely, joka sopii keskustelun loppuun."},
        ],
        correctOption:"b",
        success:"Oikein. Hallo! tarkoittaa hei. Se esiintyy myös Franzin ja Jörgin keskustelun alussa.",
        hint:"Mieti, mitä sanot kun vasta saavut tapaamaan ystävää.",
        reteach:"Hallo aloittaa kohtaamisen. Danke kiittää. Tschüss hyvästelee.",
        genericWrong:"Yritä etsiä ilmaus, jolla keskustelu alkaa.",
      },
    },
    {
      id:"read-text",kind:"book",phase:"Alkuperäisteksti",title:"Lue kaikki kahdeksan puheenvuoroa",
      paragraphs:[
        "Avaa nyt kirjan kappaleen 1 Teksti A. Lue keskustelu alusta loppuun vähintään kerran. Katso puhujien nimilappuja ja tunnista ainakin Hallo ja Tschüss.",
        "Seuraavalla lukukerralla avaa tarvittaessa sanaselitys painamalla vierasta sanaa. Voit kuunnella lähteen ihmisäänitteen, jos sen toisto onnistuu.",
        "Lue koko teksti oppikirjassa. Opettajan lyhyet esimerkit eivät korvaa alkuperäistä keskustelua.",
      ],
      bookLinks:[
        {label:"Avaa Franzin ja Jörgin koko keskustelu",chapterId:"01",section:"text",instruction:"Lue kaikki kahdeksan repliikkiä. Tarvittaessa käytä sanaselityksiä."},
      ],
      activityId:"text-read",activityLabel:"Luin koko kahdeksan repliikin keskustelun",
    },
    {
      id:"board",kind:"board",phase:"Havainnollistus",title:"Etsi keskustelun alku ja loppu",
      paragraphs:[
        "Tässä on kolme olennaista ilmausta. Vertaa niitä keskustelun ensimmäisiin ja viimeisiin puheenvuoroihin.",
        "Huomaa, että Bis später! tarkoittaa nähdään myöhemmin ja Tschüss! on rento hyvästely.",
      ],
      board:[
        {label:"Alussa",german:"Hallo!",meaning:"Hei! · keskustelun aloitus"},
        {label:"Lopussa",german:"Bis später!",meaning:"Nähdään myöhemmin!"},
        {label:"Viimeiseksi",german:"Tschüss!",meaning:"Moikka! · viimeinen hyvästely"},
      ],
    },
    {
      id:"understanding",kind:"book",phase:"Ymmärtäminen",title:"Tee kirjan kaksi oikeaa ymmärtämistehtävää",
      paragraphs:[
        "Nyt tarkistetaan tekstin ymmärtämistä kirjan omilla tehtävillä. Avaa C01:n Ymmärrä-sivu ja vastaa tehtäviin 1 ja 2.",
        "Tärkeää: älä vain valitse vaihtoehtoja, vaan paina kummankin tehtävän Tarkista vastaus -painiketta. LOS seuraa sekä tallennettua vastausta että tarkistusmerkintää.",
        "Väärän vastauksen jälkeen voit palata alkuperäiseen tekstiin ja yrittää uudelleen. Pelkkää sivun avaamista ei lasketa vastaukseksi.",
      ],
      bookLinks:[
        {label:"Avaa C01:n ymmärtämistehtävät",chapterId:"01",section:"understand",instruction:"Tee ja tarkista C01-SOURCE-Q01 sekä C01-SOURCE-Q02."},
        {label:"Palaa alkuperäiseen tekstiin",chapterId:"01",section:"text",instruction:"Tarkista puhujien nimet ja keskustelun ensimmäinen ilmaus."},
      ],
    },
    {
      id:"highlight",kind:"activity",phase:"Lukijan työkalut",title:"Korosta yksi tärkeä ilmaus tekstistä",
      paragraphs:[
        "Palaa alkuperäiseen Teksti A -lukijaan. Kokeile korostustyökalua ja merkitse esimerkiksi Hallo tai Bis später! omalla tussivärilläsi.",
        "Korostus auttaa sinua löytämään saman ilmauksen myöhemmin. Tämä harjoitus on oman opiskelutavan kokeilemista, ei arvio siitä, osaatko kieliopin.",
      ],
      bookLinks:[
        {label:"Avaa teksti korostamista varten",chapterId:"01",section:"text",instruction:"Kokeile kirjan sisäistä korostustussia."},
      ],
      activityId:"highlight-tried",activityLabel:"Kokeilin lukijan korostusta",
    },
    {
      id:"farewell-speaker",kind:"question",phase:"Tekstin soveltaminen",title:"Kuka sanoo keskustelun viimeisen hyvästelyn?",
      paragraphs:["Mieti, missä puheenvuorossa Tschüss esiintyy ja kuka sen sanoo. Voit tarkistaa lukijasta ennen vastaamista."],
      question:{
        type:"choice",skillId:"L1-READ-01",evidenceRole:"application",prompt:"Kuka sanoo keskustelun viimeisen Tschüss!-repliikin?",
        options:[
          {id:"a",label:"Franz",wrongFeedback:"Franz sanoo ennen viimeistä repliikkiä Bis später! Viimeinen Tschüss kuuluu toiselle puhujalle."},
          {id:"b",label:"Jörg"},
          {id:"c",label:"Greta",wrongFeedback:"Greta ei ole tämän C01:n alkuperäisen keskustelun puhuja."},
        ],
        correctOption:"b",
        success:"Oikein. Jörg sanoo viimeisenä Tschüss!",
        hint:"Katso, kenen nimi näkyy kahdeksannen repliikin edessä.",
        reteach:"Franz sanoo ennen loppua Bis später! Jörg vastaa viimeisessä repliikissä Tschüss!",
        genericWrong:"Palaa tekstiin ja etsi viimeisen repliikin puhujan nimi.",
      },
    },
    {
      id:"exit",kind:"question",phase:"Lopputarkistus",title:"Osaatko tunnistaa keskustelun puhujat?",
      paragraphs:["Lopuksi yksi tärkeä kysymys koko alkuperäistekstistä."],
      question:{
        type:"choice",skillId:"L1-READ-01",evidenceRole:"exit",prompt:"Ketkä puhuvat alkuperäisessä C01-keskustelussa?",
        options:[
          {id:"a",label:"Franz ja Jörg"},
          {id:"b",label:"Heinrich ja Karl",wrongFeedback:"Nämä eivät ole C01:n alkuperäisen kahdeksan repliikin dialogin puhujia."},
          {id:"c",label:"Franz ja Greta",wrongFeedback:"Franz esiintyy keskustelussa, mutta toinen puhuja on Jörg."},
        ],
        correctOption:"a",
        success:"Oikein. Alkuperäisessä keskustelussa puhuvat Franz ja Jörg.",
        hint:"Puhujien nimet näkyvät kirjan tekstin repliikkien edessä.",
        reteach:"Koko C01:n alkuperäisessä dialogissa on kaksi puhujaa: Franz ja Jörg.",
        genericWrong:"Avaa tarvittaessa Teksti A ja tarkista repliikkien edessä olevat nimet.",
      },
    },
    {
      id:"summary",kind:"summary",phase:"Yhteenveto",title:"Osaat löytää tietoa oikeasta saksankielisestä keskustelusta",
      paragraphs:[
        "Olet lukenut kahdeksan repliikin alkuperäisen keskustelun, tunnistanut sen puhujat sekä harjoitellut tervehdyksen ja hyvästelyn paikantamista.",
        "Lisäksi olet käyttänyt lukijan sanaselityksiä, korostuksia ja kirjan omia tarkistettavia ymmärtämistehtäviä.",
        "Seuraavalla tunnilla harjoittelet samoja tervehdyksiä muistista. Vastaus voi tuntua jo helpolta, mutta itsenäinen käyttö tarvitsee vielä harjoitusta.",
      ],
    },
  ],
};
