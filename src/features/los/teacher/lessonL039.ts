import type { TeacherLesson } from "./engine.ts";

/**
 * C07 Text B M-COM-06 is a real human alphabet recording, but media/device
 * approval is still open and its aid is not an exact transcript. It contains
 * no verified name/telephone-number dictation. Written form practice remains
 * explicitly reading/writing, never a fabricated listening score.
 */
export const LOS1_L039_TEACHER: TeacherLesson = {
  id:"L039",bookId:1,chapterId:"07",version:"2.0.0-preview.1",
  title:"Kuuntele ja täytä lomake",
  objective:"Tunnistan Text B:n kirjainaineiston rajat ja täytän keksityn nimen ja numerosarjan lomakkeeseen kirjallisen mallin perusteella.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["textb-reviewed","form-reviewed"],
  requiredPracticeIds:[],
  requiredCheckedIds:["C07-TEXTB-Q01","C07-TEXTB-Q02"],
  scenes:[
    {id:"welcome",phase:"Aloitus",kind:"introduction",title:"Kuuntelu vain, kun aito ääni on hyväksytty",
      paragraphs:[
        "C07:n Text B perustuu todelliseen ihmisen äänittämään M-COM-06-aakkosäänitteeseen German Grammar - The Alphabet.ogg. Äänilähde on tunnistettu, mutta sen toistoa ja opetuskäyttöä ei vielä ole hyväksytty oikeilla laitteilla.",
        "Tässä versiossa ääni on estetty opetuksen arvioinnista. Oppikirjan kirjainrivi on LOS!:n oma kirjallinen apu, EI nauhoituksen sanatarkaksi vahvistettu litteraatti. Ilman varmistettua ääntä et voi saada kuuntelupisteitä.",
        "Harjoittelemme siksi tekstipohjaisesti kirjainten erottamista ja lomakkeen täyttämistä. Keksittyjen nimien ja numerokoodien käyttäminen ei edellytä omien henkilötietojen antamista.",
      ],
      help:[{title:"Voinko saada tästä kuuntelutodistuksen?",body:"Et tässä sisältöversiossa. Tekstin perusteella ratkaistut tehtävät kertovat lukemisesta tai kirjoittamisesta, eivät siitä, että olisit ymmärtänyt äänen."}]},
    {id:"recall",phase:"Muistelu",kind:"question",title:"Mitä sanoisit, jos et kuullut nimeä?",
      paragraphs:["Ennen lomaketta palautetaan mieleen toistopyyntö L038:sta."],
      question:{type:"choice",skillId:"L1-STRAT-01",prompt:"Mikä ilmaus tarkoittaa Vielä kerran, kiitos?",
        options:[{id:"a",label:"Noch einmal, bitte."},{id:"b",label:"Wie alt bist du?",wrongFeedback:"Tämä kysyy ikää."},{id:"c",label:"Guten Abend!",wrongFeedback:"Tämä tervehtii illalla."}],
        correctOption:"a",success:"Kyllä. Noch einmal, bitte. on hyödyllinen tavaamistilanteessa.",hint:"Muista sanat noch ja einmal.",reteach:"Noch einmal, bitte. pyytää toistamaan, Bitte langsam. pyytää puhumaan hitaasti.",genericWrong:"Etsi toistopyyntö."}},
    {id:"sound-gate",phase:"Lähteen käsittely",kind:"explanation",title:"Mitä M-COM-06 voi todistaa ja mitä ei?",
      paragraphs:[
        "M-COM-06 on aakkosten ääntämisen lähde, ei varmistettu henkilö- ja numerolomakkeen sanelu. Sitä ei saa esittää tallenteena, jossa joku sanoisi nimen Mia ja numerosarjan 1742.",
        "Koska mediatiedoston käyttö on vielä laitetarkistamatta, opetuksessa ei tarjota tekaistua kuuntelupainiketta eikä läpäisyprosenttia. Kun erikseen tarkistettu ihmisääni joskus on käytössä, se voidaan liittää samaan oppikirjan lähteeseen ilman toista arviointijärjestelmää.",
        "Tämän tunnin Text B -sivulta löydät kirjainten kirjallisen apulistan ja neljä kysymystä. Kysymykset voi ratkaista lukemalla, ja niiden kirjallisen ymmärtämisen tulos säilyy kirjan C07-tallennuksessa.",
      ]},
    {id:"board",phase:"Vaiheittainen esimerkki",kind:"board",title:"Kirjaimista ja numeroista kuvitteellinen lomake",
      paragraphs:[
        "Opettaja näyttää mallin vaihe vaiheelta. Tässä kaikki syötteet ovat kirjoitettuja esimerkkejä, eivät äänitteestä kuultuja sanoja.",
        "Valitse ensin Nimi-kenttään kuuluvat kirjaimet. Vasta sen jälkeen kirjoita Koodi-kenttään erilliset numerot oikeassa järjestyksessä.",
      ],
      board:[
        {label:"1 · Kentät",german:"Name · Code",meaning:"Lomakkeessa on nimi ja keksitty nelinumeroinen harjoituskoodi, ei oikea puhelinnumero."},
        {label:"2 · Kirjoitettu nimimalli",german:"M · I · A",meaning:"Kolme merkkiä yhdistyy nimeksi Mia. Älä vaihda I-kirjainta E:hen."},
        {label:"3 · Kirjoitettu numeromalli",german:"eins · sieben · vier · zwei",meaning:"Yksi, seitsemän, neljä, kaksi. Erilliset numerot muodostavat 1742."},
        {label:"4 · Täytetty mallilomake",german:"Name: Mia · Code: 1742",meaning:"Tästä mallista saa lukemisen ja kirjoittamisen harjoituksen, ei kuunteluarvosanaa."},
      ]},
    {id:"guided",phase:"Ohjattu harjoitus",kind:"question",title:"Mikä numero kirjoitetaan?",
      paragraphs:["Saat käyttää mallitaulun kolmatta kohtaa."],
      question:{type:"choice",skillId:"L1-NUM-01",prompt:"Mikä numero on sieben?",
        options:[{id:"a",label:"6",wrongFeedback:"Sechs on kuusi."},{id:"b",label:"7"},{id:"c",label:"17",wrongFeedback:"Siebzehn on seitsemäntoista, sieben seitsemän."}],
        correctOption:"b",success:"Oikein. Sieben vastaa numeroa 7.",hint:"Se tulee saksaksi sechs-sanan jälkeen.",reteach:"Sechs = 6, sieben = 7, acht = 8.",genericWrong:"Etsi seitsemän, ei seitsemäntoista."}},
    {id:"textb",phase:"Oppikirjan Text B",kind:"book",title:"Lue C07:n Text B ja tarkista kaksi kirjaintehtävää",
      paragraphs:[
        "Avaa C07:n Text B. Sen kirjainrivi on merkitty oppilaan tekstipohjaiseksi harjoittelutueksi, ei alkuperäisen äänitteen vahvistetuksi litteraatiksi.",
        "Tee ja tarkista nykyiset C07-TEXTB-Q01 ja C07-TEXTB-Q02. Ne käsittelevät erikoismerkkiä ß ja Ä:n varakirjoitusasua. Voit tehdä myös Q03:n ja Q04:n vapaaehtoisesti.",
        "Nämä ovat lähdetietojen tukemia teksti- ja kirjaintehtäviä. Niiden pisteet eivät todista todellista kuuntelua.",
      ],
      bookLinks:[{label:"C07 · Text B, M-COM-06",chapterId:"07",section:"text-b",instruction:"Käytä kirjainriviä tekstiharjoitukseen. Audio odottaa hyväksyntää."}],
      activityId:"textb-reviewed",activityLabel:"Tutkin Text B:n kirjainrivin ja median rajoituksen"},
    {id:"form",phase:"Lomaketehtävä",kind:"form",title:"Täytä kaksikenttäinen harjoituslomake",
      paragraphs:[
        "Täytä alla oleva lomake vain kirjallisesta mallista: Nimi M-I-A; harjoituskoodi eins–sieben–vier–zwei. Tämä ei ole äänestä saneltu henkilö- tai puhelinnumerotieto.",
        "Voit halutessasi harjoitella myös omaa nimeä erikseen paperille, mutta lomakkeen täyttämiseen käytetään keksittyä Mia-nimeä eikä sinun tarvitse antaa mitään oikeita henkilötietoja.",
        "Avaa mallilomake vasta oman yrityksesi jälkeen. Näin arvioit kirjoitusasua ja numeroketjua, et äänen ymmärtämistä.",
      ],
      form:[
        {id:"name",label:"Nimi (keksitty)",placeholder:"Kirjoita nimi...",sampleAnswer:"Mia"},
        {id:"code",label:"Harjoituskoodi (ei puhelinnumero)",placeholder:"4 numeroa...",sampleAnswer:"1742"},
      ],
      activityId:"form-reviewed",activityLabel:"Täytin ja tarkistin kirjallisen harjoituslomakkeen"},
    {id:"independent",phase:"Soveltava harjoitus 1/2",kind:"question",title:"Uusi kirjallinen nimitavaus",
      paragraphs:["Kirjallinen esimerkki: E-M-I-L. Älä katso mallilomakkeen nimeä vastatessasi."],
      question:{type:"text",skillId:"L1-INT-06",evidenceRole:"independent",prompt:"Mikä kuvitteellinen nimi muodostuu kirjaimista E-M-I-L?",
        accepted:["Emil"],success:"Emil on oikein. Muodostit nimen neljästä kirjaimesta.",hint:"Kirjoita kirjaimet samaan järjestykseen, ilman väliviivoja.",reteach:"E-M-I-L muodostaa nimen Emil, eikä esimerkiksi Elmi.",genericWrong:"Tarkista M:n ja I:n järjestys."}},
    {id:"application",phase:"Soveltava harjoitus 2/2",kind:"question",title:"Ymmärrä uusi numerosarja",
      paragraphs:["Kuvitteellinen kirjallinen sarja: vier – null – sechs – zwei. Vastaa ilman mallitaulua."],
      question:{type:"text",skillId:"L1-NUM-01",evidenceRole:"application",prompt:"Kirjoita numerosarja numeroina ilman välilyöntejä.",
        accepted:["4062"],success:"Oikein. Vier = 4, null = 0, sechs = 6 ja zwei = 2.",hint:"Aloita 4:stä ja muista nolla toisena.",reteach:"Vier–null–sechs–zwei = 4062. Kyse on keksitystä harjoituskoodista.",genericWrong:"Yhdistä erilliset luvut kirjoitusjärjestyksessä."}},
    {id:"exit",phase:"Lopputarkistus",kind:"question",title:"Mikä on osoitettua osaamista?",
      paragraphs:["Vastaa rehellisesti sen mukaan, mitä materiaalia tässä tunnissa oli oikeasti saatavilla."],
      question:{type:"choice",skillId:"L1-PHON-01",evidenceRole:"exit",prompt:"Mikä kirjoitusmerkki on saksan aakkosten erikoismerkki?",
        options:[{id:"a",label:"ß"},{id:"b",label:"Å",wrongFeedback:"Å ei kuulu saksan oikeinkirjoituksen tavallisiin erikoismerkkeihin."},{id:"c",label:"Ø",wrongFeedback:"Ø kuuluu muiden kielten kirjoitusasuihin, ei saksan perusaakkosten lisämerkkeihin."}],
        correctOption:"a",success:"Oikein. ß on Eszett, ja tämä tehtävä arvioi kirjainmerkin tunnistamista, ei äänen kuulemista.",hint:"Katso merkkiä sanassa heißt.",reteach:"Saksan erikoismerkkejä ovat Ä, Ö, Ü ja ß. Tämän kirjainmerkkitehtävän oikea ratkaisu ei ole kuuntelupiste.",genericWrong:"Etsi kirjainmerkki, joka esiintyy sanassa heißt."}},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"Täytit lomakkeen ilman tekaistua kuuntelua",
      paragraphs:[
        "Harjoittelit Text B:n kirjainmateriaalia, täytit kuvitteellisen nimen ja koodin kirjalliseen lomakkeeseen sekä teit kaksi uutta soveltavaa harjoitusta.",
        "C07:n M-COM-06-äänite on oikea lähde, mutta sen äänen hyväksyntä ja todellinen kuuntelutesti ovat avoimia. Tämän tunnin tekstivastineesta ei synny lainkaan kuuntelupistemäärää.",
        "Kun äänite on asianmukaisesti hyväksytty, kuuntelutaito voidaan testata erillisenä näyttönä ilman vanhan tekstitehtävän muuttamista jälkikäteen kuuntelupisteiksi.",
      ]},
  ],
};
