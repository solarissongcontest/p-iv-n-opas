import type { TeacherLesson } from "./engine.ts";

/**
 * C04 Text B reuses the real M-COM-03 twenty-item human greetings list
 * already stored in LOS1_TEXT_B_SOURCES. Playback is not a prerequisite:
 * device-level audio approval is still open, so text is fully usable.
 */
export const LOS1_L020_TEACHER: TeacherLesson = {
  id:"L020",bookId:1,chapterId:"04",version:"2.0.0-preview.1",
  title:"Käytä kohteliaisuusfraaseja",
  objective:"Tulkitsen C04:n aidon tervehdysluettelon ja vaihdan tilanteen mukaan tuttavallisia ja kohteliaita ilmauksia.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["text-b-read"],
  requiredPracticeIds:["C04-EX-01","C04-EX-02","C04-EX-03"],
  requiredCheckedIds:["C04-TEXTB-Q01","C04-TEXTB-Q02"],
  scenes:[
    {id:"welcome",phase:"Aloitus",kind:"introduction",title:"Sama tervehdys ei sovi kaikkiin tilanteisiin",
      paragraphs:[
        "Tällä tunnilla harjoittelemme tosielämän puhuttelua ja kohteliaisuusfraaseja. Saat valita ilmauksen sen mukaan, aloitetaanko kohtaaminen vai hyvästelläänkö ja ovatko puhujat tuttuja.",
        "C04:n oikea Text B on German Men92:n 20 ilmauksen autenttinen tervehdys- ja hyvästelyluettelo, M-COM-03. Se ei ole kahden ihmisen keskustelu. Sama lähde esiintyy myös C01:ssä, mutta nyt tarkastelemme kohteliaisuusastetta.",
        "Koko kirjoitettu luettelo kuuluu LOSiin ja toimii myös ilman äänentoistoa. Äänitteen laitehyväksyntää ei ole osoitettu; kuunteleminen on vapaaehtoista eikä tekstitarkistus ole kuullunymmärtämispiste."
      ]},
    {id:"recall",phase:"Aktivointi",kind:"question",title:"Kumpi on kohtelias?",
      paragraphs:["Palauta mieleen C04:n Text A:ssakin käytetty kohtelias hyvästely."],
      question:{type:"choice",skillId:"L1-INT-04",prompt:"Mikä on tavallinen kohtelias hyvästely?",
        options:[{id:"a",label:"Hallo!",wrongFeedback:"Hallo! on tervehdys saapuessa."},{id:"b",label:"Auf Wiedersehen!"},{id:"c",label:"Gute Nacht!",wrongFeedback:"Gute Nacht! on hyvän yön toivotus, ei yleinen hyvästely kaikissa tilanteissa."}],
        correctOption:"b",success:"Oikein. Auf Wiedersehen! sopii hyvin kohteliaaseen hyvästelyyn.",
        hint:"Muista, mitä Schmidt ja Standish sanoivat keskustelun lopussa.",
        reteach:"Auf Wiedersehen! on kohtelias näkemiin. Tschüss! on usein arkisempi hyvästely.",
        genericWrong:"Etsi hyvästely, jota voi käyttää virallisessa tilanteessa."}},
    {id:"read",phase:"Text B",kind:"book",title:"Lue koko 20 ilmauksen alkuperäisluettelo",
      paragraphs:[
        "Avaa C04:n Text B ja lue kaikki 20 tervehdystä ja hyvästelyä alkuperäisessä järjestyksessä. Etsi erityisesti Guten Tag!, Guten Abend!, Auf Wiedersehen!, Tschüss!, Bis bald! ja Gute Nacht!. Myös alueellisia ilmauksia esiintyy.",
        "Tekstivaihtoehto on täysimääräinen harjoitusreitti silloin, kun oikeaa äänitettä ei ole hyväksytty tai se ei toimi omalla laitteellasi. Älä väitä kuunnelleesi, jos vain luit.",
        "Vahvista lukeminen vasta, kun olet käynyt koko luettelon läpi. Vahvistus kertoo opiskeluteosta, ei ääntämisen automaattisesta arviosta."
      ],
      bookLinks:[{label:"C04 · Text B · M-COM-03",chapterId:"04",section:"text-b",instruction:"Lue kaikki 20 ihmisen laatimaan äänilähteeseen kuuluvaa ilmausta tekstinä."}],
      activityId:"text-b-read",activityLabel:"Luin koko C04:n Text B -luettelon"},
    {id:"rule",phase:"Opettajan selitys",kind:"explanation",title:"Kolme valintaa: suhde, hetki ja tarkoitus",
      paragraphs:[
        "Kun valitset fraasin, selvitä ensin puhujien suhde. Ystäville Tschüss! on tavallinen arkinen hyvästely. Virallisessa kohtaamisessa Auf Wiedersehen! on turvallinen kohtelias valinta. Nämä eivät kuitenkaan ole muuttumattomia sääntöjä kaikilla saksankielisillä alueilla.",
        "Toiseksi katso, tervehditkö vai lähdetkö. Guten Tag! tai Guten Abend! aloittavat kohtaamisen. Auf Wiedersehen! päättää sen. Gute Nacht! puolestaan toivotetaan yleensä nukkumaan mentäessä, ei yleiseksi illan aloitustervehdykseksi.",
        "Kolmanneksi huomioi alue ja yhteinen tapa. Moin ja Servus voivat esiintyä tietyillä alueilla ja erilaisissa tuttavallisissa tilanteissa. Pelkkä sanan löytäminen luettelosta ei tarkoita, että se olisi aina paras vastaus kaikkialla.",
        "Bis bald! tarkoittaa nähdään pian, Bis später! nähdään myöhemmin ja Bis gleich! nähdään kohta. Ajankohtaan viittaava ilmaus ei yksin kerro puhuttelusuhdetta.",
        "Mallisuoritus: aloitat päiväsaikaan virallisen asioinnin. Ensimmäiseksi suhde on muodollinen, toiseksi kohtaaminen vasta alkaa, joten Guten Tag! sopii. Kun poistut, vaihdat Auf Wiedersehen! -ilmaukseen."
      ],
      help:[
        {title:"Eikö Guten Tag! sovi myös tuttavalle?",body:"Sopii monessa yhteydessä. Tehtävissä valitaan kontekstin paras vaihtoehto, ei väitetä tervehdyksiä absoluuttisesti kielletyiksi muiden seurassa."},
        {title:"Mikä ero on Guten Abend! ja Gute Nacht!?",body:"Guten Abend! on illan tervehdys tavatessa. Gute Nacht! on hyvän yön toivotus esimerkiksi ennen nukkumaanmenoa."},
        {title:"Onko tämä kuuntelutunti?",body:"Aito lähde on ihmisen ääntämä luettelo, mutta äänentoiston toimivuutta ei ole hyväksytty kaikilla laitteilla. Voit opiskella ja tarkistaa tekstit; sitä ei merkitä kuullun ymmärtämiseksi."}
      ]},
    {id:"board",phase:"Opetettu malliesimerkki",kind:"board",title:"Vaihda ilmaus tilanteen mukana",
      paragraphs:["Opettaja näyttää saman päivän erilaiset kohtaamishetket. Jokaisella rivillä muutos perustuu tarkoitukseen tai tuttavallisuuteen, ei satunnaiseen fraasin arvaukseen."],
      board:[
        {label:"1 · Päivällä saavun",german:"Guten Tag!",meaning:"Kohtelias päivätervehdys."},
        {label:"2 · Lähden tapaamisesta",german:"Auf Wiedersehen!",meaning:"Näkemiin. Muodollinen hyvästely."},
        {label:"3 · Näen ystävän",german:"Hallo!",meaning:"Ystävällinen aloitustervehdys."},
        {label:"4 · Hyvästelen ystävän",german:"Tschüss!",meaning:"Arkinen moikka."},
        {label:"5 · Sovimme näkevämme pian",german:"Bis bald!",meaning:"Nähdään pian. Ajankohta on olennainen."},
        {label:"6 · Illalla saavun",german:"Guten Abend!",meaning:"Hyvää iltaa, ei vielä hyvää yötä."},
        {label:"7 · Menen nukkumaan",german:"Gute Nacht!",meaning:"Hyvää yötä. Tarkoitus vaihtui."}
      ]},
    {id:"guided",phase:"Ohjattu harjoitus",kind:"question",title:"Keskustelu vasta alkaa",
      paragraphs:["Tapaat tuntemattoman asiakaspalvelijan päivällä. Keskustelu ei ole vielä päättymässä."],
      question:{type:"choice",skillId:"L1-INT-04",prompt:"Mikä Text B:n ilmaus sopii tilanteen aloitukseen?",
        options:[{id:"a",label:"Gute Nacht!",wrongFeedback:"Tämä toivotetaan yleensä nukkumaan mennessä, ei päiväsaikaan tervehtiessä."},{id:"b",label:"Guten Tag!"},{id:"c",label:"Auf Wiedersehen!",wrongFeedback:"Auf Wiedersehen! on hyvästely, vaikka tilanne on vasta alkamassa."}],
        correctOption:"b",success:"Oikein. Guten Tag! on sopiva kohtelias päivätervehdys.",
        hint:"Aloitamme kohtaamisen päivällä.",
        reteach:"Tervehdys aloittaa ja hyvästely päättää. Päivällä Guten Tag!, lähtiessä Auf Wiedersehen!.",
        genericWrong:"Tarkista ensin, onko tarkoitus saapua vai poistua."}},
    {id:"source-checks",phase:"Tekstin ymmärtäminen",kind:"book",title:"Tee kaksi Text B:n tarkistusta",
      paragraphs:[
        "Tee ja tarkista C04-TEXTB-Q01 ja C04-TEXTB-Q02 suoraan kirjan Text B -sivulla. Ne kysyvät kohteliasta tervehdyksen ja hyvästelyn merkitystä.",
        "Tee lisäksi C04-EX-01, C04-EX-02 ja C04-EX-03 kirjan Harjoittele-sivulla. Käytät samoja vanhoja tehtävätunnisteita, et rinnakkaista tehtäväkantaa."
      ],
      bookLinks:[
        {label:"C04 · Text B",chapterId:"04",section:"text-b",instruction:"Vastaa ja tarkista C04-TEXTB-Q01 ja Q02."},
        {label:"C04 · Harjoittele",chapterId:"04",section:"practice",instruction:"Tee C04-EX-01–03 ja vertaa tuttua ja muodollista tilannetta."}
      ]},
    {id:"independent",phase:"Soveltava harjoitus 1/2",kind:"question",title:"Virallinen kohtaaminen päättyy",
      paragraphs:["Palauta mieleen, miten sanot goodbye virallisen asioinnin lopussa, ilman mallitaulua."],
      question:{type:"choice",skillId:"L1-INT-04",evidenceRole:"independent",prompt:"Olet päättänyt virallisen tapaamisen. Mikä on kohtelias hyvästely?",
        options:[{id:"a",label:"Hallo!",wrongFeedback:"Hallo! on saapuessa käytettävä tervehdys."},{id:"b",label:"Auf Wiedersehen!"},{id:"c",label:"Guten Abend!",wrongFeedback:"Guten Abend! on illan tervehdys eikä tapaamisen päättämisen yleinen fraasi."}],
        correctOption:"b",success:"Oikein. Auf Wiedersehen! päättää muodollisen tapaamisen.",
        hint:"Tarvitset näkemiin-ilmauksen.",
        reteach:"Kun muodollinen tapaaminen päättyy, sano Auf Wiedersehen! Ystävälle voi sopia Tschüss!.",
        genericWrong:"Tarkista tarkoitus: hyvästely, ei saapuminen."}},
    {id:"application",phase:"Soveltava harjoitus 2/2",kind:"question",title:"Tilanne muuttuu ystävälliseksi",
      paragraphs:["Olet lähtenyt virallisesta tapaamisesta. Pihalla kohtaat läheisen ystäväsi ja hyvästelet hänet hetken juteltuanne."],
      question:{type:"choice",skillId:"L1-INT-04",evidenceRole:"application",prompt:"Mikä Text B:n ilmaus sopii nyt rennosti ystävän hyvästelyyn?",
        options:[{id:"a",label:"Tschüss!"},{id:"b",label:"Gute Nacht!",wrongFeedback:"Kyse ei ole nukkumaanmenosta; arkinen hyvästely sopii paremmin."},{id:"c",label:"Guten Tag!",wrongFeedback:"Tämä aloittaa kohtaamisen, ei päätä sitä."}],
        correctOption:"a",success:"Oikein. Tschüss! sopii ystävän arkiseen hyvästelyyn.",
        hint:"Ystävien moikka on lyhyt Tsch-alkuinen ilmaus.",
        reteach:"Virallinen hyvästely: Auf Wiedersehen! Arkinen hyvästely: Tschüss! Molemmat ovat kelvollisia omassa tilanteessaan.",
        genericWrong:"Muista, että puhujien suhde vaihtui tuttavalliseksi."}},
    {id:"exit",phase:"Lopputarkistus",kind:"question",title:"Aloitustervehdys vai hyvää yötä?",
      paragraphs:["Tee vielä yksi uusi tilanne ilman näkyvää mallia."],
      question:{type:"choice",skillId:"L1-INT-04",evidenceRole:"exit",prompt:"Kello on 19 ja saavut illalliselle. Mikä on tavallinen illan tervehdys?",
        options:[{id:"a",label:"Gute Nacht!",wrongFeedback:"Gute Nacht! sopii yleensä nukkumaanmenon yhteyteen, ei illalliselle saapuessa."},{id:"b",label:"Bis bald!",wrongFeedback:"Bis bald! tarkoittaa nähdään pian, ei illan saapumistervehdystä."},{id:"c",label:"Guten Abend!"}],
        correctOption:"c",success:"Oikein. Guten Abend! tervehtii illalla.",
        hint:"Abend tarkoittaa iltaa.",reteach:"Guten Abend! = hyvää iltaa, Gute Nacht! = hyvää yötä.",
        genericWrong:"Erota illan aloittaminen nukkumaanmenon toivotuksesta."}},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"Osaat vaihtaa fraasia tilanteen mukaan",
      paragraphs:[
        "Tulkitsit alkuperäistä 20 kohdan Text B:tä, teit kaksi uutta tilannesovellusta ja erotit muodollisen hyvästelyn arkisesta. Kappaleen omat teksti- ja tehtävävastaukset säilyvät yhdessä paikassa.",
        "Ääntä ei pisteytetä, koska laitteen ja lähdemedian hyväksyntä on avoin. L021:ssa kertaamme ja palautamme nykyisen C04-kappaletestin."
      ]}
  ]
};
