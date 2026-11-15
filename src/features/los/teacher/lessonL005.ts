import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 L005: human-recorded greeting list M-COM-03 + full in-book transcript.
 * Reading the transcript is NOT proof of listening comprehension. Do not infer
 * playback, audio quality or pronunciation from a completed lesson.
 * Editorial/pedagogical preview; language and hardware QA still required.
 */
export const LOS1_L005_TEACHER: TeacherLesson = {
  id:"L005", bookId:1, chapterId:"01", version:"2.0.0-preview.1",
  title:"Kuuntele ja valitse tervehdys",
  objective:"Erotan tilanteeseen sopivan tervehdyksen ja hyvästelyn aidosta ilmausluettelosta tai sen tekstivastineesta.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","situations","independent","exit"],
  requiredActivityIds:["source-studied","audio-or-text","dialogue-compared"],
  requiredPracticeIds:[],
  // Both source texts already save these exact question IDs in C01's chapter draft.
  // A visited link, a selected radio, or an unchecked answer cannot unlock completion.
  requiredCheckedIds:["C01-TEXTB-Q01","C01-TEXTB-Q02","C01-SOURCE-Q03","C01-SOURCE-Q04"],
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"Tervehdykset kuuluvat oikeisiin tilanteisiin",
      paragraphs:[
        "Tänään tutustut ihmisen äänittämään saksankielisten tervehdysten ja hyvästelyjen luetteloon. Alkuperäisessä 28 sekunnin tallenteessa lausutaan 20 ilmausta. Sama koko luettelo on kirjoitettuna LOSin Text B -lukijaan.",
        "Äänite on ilmausluettelo, ei kahden henkilön keskustelu. Kun harjoittelet kuuntelemalla, etsi tuttuja sanoja ja vertaa niitä vasta jälkeenpäin kirjoitusasuihin.",
        "Jos äänite ei lataudu tai et voi käyttää ääntä, koko oppitunnin voi käydä läpi tässä opetustilanteessa avattavalla tekstivastineella. Silloin harjoittelet lukemista ja tilannevalintoja, et todistettua kuullun ymmärtämistä.",
      ],
      help:[{title:"Tarvitsenko kuulokkeet?",body:"Et. Tekstivastine ja tehtävät löytyvät kokonaan kirjasta. Äänen kuunteleminen on suositeltua silloin, kun toisto toimii ja voit käyttää ääntä."}],
    },
    {
      id:"recall",phase:"Muistelu",kind:"question",
      title:"Tunnistatko jo tervehdyksen ja hyvästelyn eron?",
      paragraphs:["Kokeile ensin ilman näkyvää sanastoa. Muista, että sama sana ei yleensä sovi sekä tapaamisen alkuun että sen loppuun."],
      question:{
        type:"choice",skillId:"L1-INT-01",
        prompt:"Mikä ilmaus sopii ystävälle sanottavaksi, kun olet juuri lähdössä?",
        options:[
          {id:"a",label:"Guten Morgen!",wrongFeedback:"Guten Morgen! on aamulla käytettävä tervehdys, ei tavallinen hyvästely."},
          {id:"b",label:"Tschüss!"},
          {id:"c",label:"Guten Tag!",wrongFeedback:"Guten Tag! on päiväsaikainen tervehdys. Tilanteessa olet jo lähdössä."},
        ],
        correctOption:"b",success:"Oikein. Tschüss! on arkinen hyvästely.",
        hint:"Etsi se lyhyt ilmaus, jolla sanot suomeksi moikka lähtiessä.",
        reteach:"Hallo! ja Guten Tag! aloittavat kohtaamisen. Tschüss! päättää sen.",
        genericWrong:"Valitse hyvästely, älä tapaamisen alun tervehdystä.",
      },
    },
    {
      id:"method",phase:"Kuuntelustrategia",kind:"explanation",
      title:"Näin harjoittelet lyhyen aidon äänitteen kanssa",
      paragraphs:[
        "Ensimmäisellä kuuntelukerralla keskity siihen, kuulostaako jokin ilmaus jo tutulta. Älä yritä kirjoittaa kaikkia kahtakymmentä ilmausta muistiin.",
        "Toisella kerralla pysäytä äänite oman tahtisi mukaan ja ryhmittele tunnistamiasi sanoja: alkutervehdykset, hyvästelyt ja hyvän yön toivotukset.",
        "Avaa vasta sitten Text B:n kirjoitettu luettelo ja vertaa ääntä sanaan. Jos ääni ei toimi, lue vastaava kokonainen luettelo ensin itsenäisesti ja tee samat luokittelut kirjoitusasun perusteella.",
        "Tarkka kuullun ymmärtämisen tulos vaatisi erillisen äänipohjaisen testin, jonka toisto on varmistettu. Tämän tunnin kirjalliset tarkistukset eivät ole sellainen testi.",
      ],
      help:[
        {title:"Miksi en muista koko listaa?",body:"Et tarvitse kaikkia alueellisia tervehdyksiä aktiiviseen käyttöön. Keskity ensin ilmauksiin Hallo, Guten Morgen, Guten Tag, Guten Abend, Tschüss ja Bis später."},
        {title:"Mitä jos ääni ei toimi?",body:"Lue Text B:n 20 ihmisen lausumaa ilmausta kokonaan kirjasta. Voit suorittaa tekstin ymmärtämisen, mutta merkintä ei tarkoita, että olisit kuullut äänitteen."},
      ],
    },
    {
      id:"board",phase:"Opetus",kind:"board",
      title:"Rakenna tervehdyskartta tilanteen mukaan",
      paragraphs:[
        "Käy opettajan taulu läpi yksi ilmaus kerrallaan. Kiinnitä huomiota siihen, alkaako vai päättyykö kohtaaminen.",
        "Gute Nacht! ei ole sama kuin Guten Abend!: ensimmäinen on tavallinen hyvän yön toivotus, toinen illan tervehdys.",
      ],
      board:[
        {label:"Yleinen alkutervehdys",german:"Hallo!",meaning:"Hei!"},
        {label:"Aamulla",german:"Guten Morgen!",meaning:"Hyvää huomenta!"},
        {label:"Illalla",german:"Guten Abend!",meaning:"Hyvää iltaa!"},
        {label:"Rentona hyvästelynä",german:"Tschüss!",meaning:"Moikka!"},
        {label:"Nähdään myöhemmin",german:"Bis später!",meaning:"Nähdään myöhemmin!"},
        {label:"Nukkumaan mennessä",german:"Gute Nacht!",meaning:"Hyvää yötä!"},
      ],
    },
    {
      id:"source-list",phase:"Aito Text B",kind:"book",
      title:"Avaa koko alkuperäinen tervehdysluettelo",
      paragraphs:[
        "Kokeile ensin tässä opetustilanteessa olevaa German Men92:n alkuperäistä 28 sekunnin äänitettä, jos se toimii. Voit halutessasi avata kaikki 20 ilmausta ja suomennokset suoraan alta. Äänitettä ei ole vielä varmennettu oikealla iPhonella tai koulun Linux-laitteella.",
        "Lue myös kaikki 20 ilmausta ja suomennokset tämän opetussoittimen tekstivastineesta tai C01:n Text B -sivulta. Listassa on alueellisia tervehdyksiä, kuten Moin ja Servus, joita ei vielä tarvitse osata tuottaa.",
        "Vastaa Text B:n kysymyksiin 1 ja 2 ja paina molemmissa Tarkista vastaus. Vastaus tallentuu samaan oppikirjan luonnokseen, ei opettajan erilliseen kopioon.",
      ],
      bookLinks:[{label:"Avaa C01 · Text B ja alkuperäinen tervehdysäänite",chapterId:"01",section:"text-b",instruction:"Kokeile ääntä tai lue kaikki 20 ilmausta, tee ja tarkista C01-TEXTB-Q01/Q02."}],
      activityId:"source-studied",activityLabel:"Tutustuin koko 20 ilmauksen luetteloon",
    },
    {
      id:"guided",phase:"Ohjattu harjoitus",kind:"question",
      title:"Erotetaan aamun ja illan tervehdykset",
      paragraphs:["Kirjassa on ilmaisut Guten Morgen! ja Guten Abend!. Mieti ensin, kumpaa vuorokaudenaikaa kysytään."],
      question:{
        type:"choice",skillId:"L1-INT-01",
        prompt:"Tapaat opettajan illalla. Mikä seuraavista on iltatervehdys?",
        options:[
          {id:"a",label:"Gute Nacht!",wrongFeedback:"Gute Nacht! toivottaa hyvää yötä, yleensä kohtaamisen päättyessä tai nukkumaan mentäessä."},
          {id:"b",label:"Guten Abend!"},
          {id:"c",label:"Guten Morgen!",wrongFeedback:"Morgen tarkoittaa aamua. Illalla tarvitset Abend-sanan."},
        ],
        correctOption:"b",success:"Oikein. Guten Abend! on illan tervehdys.",
        hint:"Illan saksankielinen sana on Abend.",
        reteach:"Morgen = aamu, Abend = ilta ja Nacht = yö. Guten Abend! on illan tervehdys; Gute Nacht! on hyvän yön toivotus.",
        genericWrong:"Pohdi, onko tilanne illalla tervehtimistä vai hyvästelyä.",
      },
    },
    {
      id:"dialogue",phase:"Vertailu Teksti A:han",kind:"book",
      title:"Vertaa ilmausluetteloa Franzin ja Jörgin keskusteluun",
      paragraphs:[
        "Ilmausluettelossa kuulet tai luet erillisiä sanoja. Oikeassa keskustelussa sama ilmaus saa tarkoituksen: ihminen aloittaa kohtaamisen tai jättää hyvästit.",
        "Avaa Franzin ja Jörgin koko kahdeksan puheenvuoron keskustelu Teksti A:ssa. Franz sanoo Bis später! ennen Jörgin viimeistä Tschüss!-repliikkiä.",
        "Tee Ymmärrä-sivun kysymykset 3 ja 4 ja paina Tarkista vastaus kummankin kohdalla. Näiden kysymysten näyttö perustuu lähdetekstiin, ei siihen, että ääni on varmasti kuunneltu.",
      ],
      bookLinks:[
        {label:"Avaa C01 · Teksti A: Franz ja Jörg",chapterId:"01",section:"text",instruction:"Etsi keskustelun lopun kaksi hyvästelyilmausta."},
        {label:"Avaa C01 · Ymmärrä, kysymykset 3 ja 4",chapterId:"01",section:"understand",instruction:"Vastaa ja tarkista C01-SOURCE-Q03 ja C01-SOURCE-Q04."},
      ],
      activityId:"dialogue-compared",activityLabel:"Vertasin luetteloa koko keskustelun loppuun",
    },
    {
      id:"situations",phase:"Soveltaminen",kind:"question",
      title:"Mitä ystävän viimeinen lause tarkoittaa?",
      paragraphs:["Ystäväsi lähtee, mutta sanoo tapaavansa sinut myöhemmin. Valitse ilmaus, joka ilmaisee juuri tämän."],
      question:{
        type:"choice",skillId:"L1-INT-01",evidenceRole:"application",
        prompt:"Mikä ilmaus sopii, kun ystäväsi sanoo 'Nähdään myöhemmin!'?",
        options:[
          {id:"a",label:"Bis später!"},
          {id:"b",label:"Guten Abend!",wrongFeedback:"Guten Abend! sopii tervehtimiseen illalla. Se ei tarkoita myöhempää tapaamista."},
          {id:"c",label:"Gute Nacht!",wrongFeedback:"Gute Nacht! toivottaa hyvää yötä, eikä tarkoita nähdään myöhemmin."},
        ],
        correctOption:"a",success:"Oikein. Bis später! tarkoittaa nähdään myöhemmin.",
        hint:"Saksan später tarkoittaa myöhemmin.",
        reteach:"Bis später! on hyvästely, jossa viitataan myöhempään tapaamiseen. Guten Abend! taas aloittaa kohtaamisen illalla.",
        genericWrong:"Etsi ilmaus, joka viittaa tapaamiseen myöhemmin.",
      },
    },
    {
      id:"independent",phase:"Itsenäinen tuottaminen",kind:"question",
      title:"Kirjoita uusi hyvästely muistista",
      paragraphs:["Sulje Text B:n luettelo ennen vastaamista. Kirjoita kokonainen lyhyt ilmaus ilman mallia; välimerkkiä ei tarvitse lisätä."],
      question:{
        type:"text",skillId:"L1-INT-01",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi: Nähdään myöhemmin!",
        accepted:["Bis später!"],success:"Oikein. Kirjoitit kokonaisen hyvästelyn muistista.",
        hint:"Fraasi alkaa sanalla Bis, ja myöhemmin on später.",
        reteach:"Ilmaus on Bis später! Tässä myöhempi tapaaminen ilmaistaan lyhyellä hyvästelyllä.",
        genericWrong:"Muista kaksi sanaa: ensimmäinen on Bis ja toinen viittaa myöhempään aikaan.",
        wrongAnswers:{"tschüss":"Tschüss! on moikka. Tässä pyydettiin tarkemmin ilmauksen 'Nähdään myöhemmin!' käännöstä.",
          "gute nacht":"Gute Nacht! tarkoittaa hyvää yötä."},
      },
    },
    {
      id:"audio-choice",phase:"Oma harjoittelu",kind:"activity",
      title:"Valitse ääni tai luettavan tekstin varaversio",
      paragraphs:[
        "Jos alkuperäinen äänite toimi, kuuntele vielä kerran ja toista halutessasi kaksi tuttua ilmausta ääneen. Voit myös vain kuunnella. Ääntämistäsi ei pisteytetä.",
        "Jos äänite ei toiminut, palaa Text B:n kirjoitettuun luetteloon ja lue ääneen tai hiljaa kaksi tervehdystä ja yksi hyvästely.",
        "Vahvista vain, että teit jommankumman harjoittelutavan. Tämä merkintä ei kerro, kumpaa käytit, eikä todista kuultua ymmärtämistä.",
      ],
      bookLinks:[{label:"Palaa Text B:n ääneen tai tekstivastineeseen",chapterId:"01",section:"text-b",instruction:"Valitse toimiva harjoittelutapa. Kuuntelu ei ole pakollinen."}],
      activityId:"audio-or-text",activityLabel:"Harjoittelin äänitteen tai koko tekstivastineen avulla",
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Lopputarkistus uudessa tilanteessa",
      paragraphs:["Tässä tilanteessa ei haeta tekstin kopiota vaan sopivaa ilmausta. Vastaa ensin ilman sanalistaa."],
      question:{
        type:"choice",skillId:"L1-INT-01",evidenceRole:"exit",
        prompt:"Ystäväsi on menossa nukkumaan. Mitä voit toivottaa?",
        options:[
          {id:"a",label:"Guten Abend!",wrongFeedback:"Guten Abend! on illan tervehdys. Nyt toivotetaan hyvää yötä."},
          {id:"b",label:"Gute Nacht!"},
          {id:"c",label:"Guten Morgen!",wrongFeedback:"Guten Morgen! toivottaa hyvää huomenta, ei hyvää yötä."},
        ],
        correctOption:"b",success:"Oikein. Gute Nacht! toivottaa hyvää yötä.",
        hint:"Yö on saksaksi Nacht.",
        reteach:"Guten Abend! = hyvää iltaa. Gute Nacht! = hyvää yötä. Ilmauksia käytetään eri tilanteissa.",
        genericWrong:"Valitse hyvän yön toivotus, ei aamun tai illan alkutervehdystä.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Osaat valita tervehdyksen tilanteen perusteella",
      paragraphs:[
        "Käsittelit aidon 20 ilmauksen tervehdysluettelon, vertasit ilmausvalintoja oikeaan keskusteluun ja käytit tekstien omia tarkistettuja tehtäviä.",
        "Jos ääni oli käytettävissä, sait lisäksi kuunteluharjoittelua. Jos käytit tekstivastinetta, kyseessä oli lukemisen ja kielenkäytön harjoitus. Näitä kahta ei yhdistetä samaksi kuuntelutulokseksi.",
        "Oppitunnin läpikäynti ei tarkoita, että osaisit kaiken pysyvästi. Seuraavaksi harjoittelet tervehdyksiä ja koko C01:n keskeisiä asioita uudessa tilanteessa.",
      ],
    },
  ],
};
