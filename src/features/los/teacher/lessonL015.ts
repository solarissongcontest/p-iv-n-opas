import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 L015: four-turn Ariser M-COM-02 source reused in C03.
 * Reading, map interpretation and authentic book question evidence.
 * No unverified audio playback, invented transcript or listening marks.
 * Recognition of "wir kommen" is NOT production of an untaught plural form.
 */
export const LOS1_L015_TEACHER: TeacherLesson = {
  id:"L015",bookId:1,chapterId:"03",version:"2.0.0-preview.1",
  title:"Alkuperä ja karttatehtävät",
  objective:"Ymmärrän Thomasin ja Takashin neljästä alkuperäisestä puheenvuorosta, kuka on mistäkin kaupungista, ja erotan lähteen tiedot kartan maiden nimistä.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["source-compared","place-map-reviewed"],
  requiredPracticeIds:[],
  requiredCheckedIds:["C03-MCOM02-Q02","C03-MCOM02-Q03"],
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"Yksi oikea keskustelu, kaksi eri lähtökaupunkia",
      paragraphs:[
        "Olet jo opetellut Woher kommst du? ja Ich komme aus Finnland. Nyt tarvitset tarkkaa tekstinymmärtämistä: kahdessa puheenvuorossa kerrotaan eri henkilöiden lähtöpaikat.",
        "C03:n Text B sisältää ihmispuheena julkaistun M-COM-02-lähteen neljä puheenvuoroa sekä saman tekstin kirjoitettuna. Äänen toimivuutta oikeilla laitteilla ei ole vielä hyväksytty.",
        "Jos kuuntelet toimivaa alkuperäisäänitettä, harjoittelet kuullun ymmärtämistä. Jos luet vain tekstin, harjoittelet luetun ymmärtämistä. Kummastakaan ei synny automaattista kuuntelutaitomerkintää.",
      ],
    },
    {
      id:"recall",phase:"Muistelu",kind:"question",
      title:"Mitä woher kysyy?",
      paragraphs:["Kertaa ensin L014:n kysymyssana. Tämä on muistia aktivoiva harjoitus, ei uusi näyttö."],
      question:{
        type:"choice",skillId:"L1-INT-03",
        prompt:"Mitä tarkoittaa kysymys Woher kommst du?",
        options:[
          {id:"a",label:"Mistä olet kotoisin?", "lang": "fi"},
          {id:"b",label:"Mikä sinun nimesi on?", "lang": "fi",wrongFeedback:"Nimeä kysytään Wie heißt du? -ilmauksella."},
          {id:"c",label:"Mitä kuuluu?", "lang": "fi",wrongFeedback:"Mitä kuuluu? ei ole lähtömaakysymys."},
        ],
        correctOption:"a",success:"Oikein. Woher kysyy alkuperää.",
        hint:"Muista L014:n woher = mistä.",
        reteach:"Woher kommst du? = Mistä olet kotoisin? Wie heißt du? = Mikä sinun nimesi on?",
        genericWrong:"Erota nimi ja alkuperä toisistaan.",
      },
    },
    {
      id:"method",phase:"Opettajan selitys",kind:"explanation",
      title:"Miten luen keskustelun, jossa on monta ihmistä?",
      paragraphs:[
        "Ensimmäisessä repliikissä Thomas kysyy Takashin nimeä. Toisessa Takashi esittäytyy. Kolmannessa Thomas sanoo oman nimensä, esittelee Peterin ja kertoo heidän lähtöpaikkansa. Neljännessä Takashi kertoo omastaan.",
        "Lukemisen vaikein kohta on pronomini wir: se tarkoittaa me. Thomasin lause Wir kommen aus Berlin. viittaa Thomasiin ja hänen esittelemäänsä Peteriin.",
        "Sinun ei tarvitse osata vielä tuottaa kommen-verbin monikon muotoa. Riittää, että tunnistat kokonaisen alkuperäislauseen merkityksen.",
        "Takashin lause Ich komme aus Kyoto. käyttää samaa ich komme aus -rakennetta, jonka opit L014:ssa. Tässä vain paikan nimi vaihtuu.",
      ],
      help:[
        {title:"Selitä yksinkertaisemmin",body:"Thomas ja Peter ovat Berliinistä. Takashi on Kiotosta. Kolmas ja neljäs repliikki kertovat tämän."},
        {title:"Kertaa aiempi asia",body:"L014:ssa opit Ich komme aus Finnland. Kun loppuun vaihdetaan Kyoto, merkitys muuttuu: Olen kotoisin Kiotosta."},
      ],
    },
    {
      id:"board",phase:"Vaiheittainen lähdetaulu",kind:"board",
      title:"Yhdistä puhuja, ilmaus ja paikka",
      paragraphs:[
        "Opettaja etsii ensin, kenen puheenvuoro on kyseessä, sitten lähtöpaikkaa ilmaisevan ilmauksen ja vasta lopuksi karttapaikan.",
        "Paina seuraavaa vaihetta. Huomaa, ettei nimen arvaaminen kerro vielä mitään alkuperästä.",
      ],
      board:[
        {label:"1 · Thomas kysyy",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on?"},
        {label:"2 · Takashi vastaa",german:"Ich heiße Takashi.",meaning:"Minun nimeni on Takashi."},
        {label:"3 · Thomas esittelee",german:"Ich bin Thomas. Das ist Peter.",meaning:"Thomas esittelee myös Peterin."},
        {label:"4 · Kaksi henkilöä",german:"Wir kommen aus Berlin.",meaning:"Thomas ja Peter tulevat Berliinistä. Wir = me, tunnistettava muoto."},
        {label:"5 · Yksi henkilö",german:"Ich komme aus Kyoto.",meaning:"Takashi on Kiotosta."},
        {label:"6 · Eri kaupungit",german:"Berlin · Kyoto",meaning:"Berliini on Saksassa; Kioto on Japanissa."},
      ],
    },
    {
      id:"guided",phase:"Ohjattu harjoittelu",kind:"question",
      title:"Kuka sanoo Wir kommen aus Berlin?",
      paragraphs:["Käytä taulua apuna. Tässä ei kysytä monikon kielioppipäätettä."],
      question:{
        type:"choice",skillId:"L1-READ-01",
        prompt:"Kuka sanoo alkuperäisessä dialogissa Wir kommen aus Berlin?",
        options:[
          {id:"a",label:"Thomas"},
          {id:"b",label:"Takashi",wrongFeedback:"Takashi kertoo erikseen tulevansa Kiotosta."},
          {id:"c",label:"Peter",wrongFeedback:"Peter esitellään, mutta hänellä ei ole omaa repliikkiä tässä tekstissä."},
        ],
        correctOption:"a",success:"Oikein. Thomas sanoo lauseen ja viittaa myös Peteriin.",
        hint:"Etsi kolmas puheenvuoro, jossa lukee myös Das ist Peter.",
        reteach:"Thomas sanoo Ich bin Thomas. Das ist Peter. Wir kommen aus Berlin.",
        genericWrong:"Katso kolmannen puheenvuoron puhujan nimi.",
      },
    },
    {
      id:"read",phase:"Alkuperäisteksti",kind:"book",
      title:"Tutki neljän repliikin Text B",
      paragraphs:[
        "Avaa C03:n Text B ja lue kaikki neljä julkaistua puheenvuoroa. Kuuntele halutessasi alkuperäistä Ariserin ihmisten äänittämää OGG-tiedostoa, jos se toimii selaimessasi.",
        "Jos äänite ei toimi, tekstin ja suomennosten avulla voi silti tehdä oikean lukutehtävän. Älä valitse tai vahvista kuuntelusuoritusta, jota et tehnyt.",
        "Vertaa kolmannen ja neljännen vuoron komme/kommen-muotoja vain ymmärtämistä varten. Tämän tunnin itsenäiset kysymykset eivät vaadi wir-verbin taivutuksen tuottamista.",
      ],
      bookLinks:[{label:"C03 · Text B, M-COM-02",chapterId:"03",section:"text-b",instruction:"Lue kaikki neljä repliikkiä ja kuuntele vain, jos oikea äänite toimii."}],
      activityId:"source-compared",activityLabel:"Vertasin alkuperäisen Text B:n paikkatiedot",
    },
    {
      id:"questions",phase:"Kirjan tarkistettavat kysymykset",kind:"book",
      title:"Tee oikeat Q02 ja Q03",
      paragraphs:[
        "Text B:n lähdetehtävä C03-MCOM02-Q02 kysyy Thomasin ja Peterin alkuperää. C03-MCOM02-Q03 kysyy Takashin alkuperää.",
        "Valitse kummankin vastaus ja paina Tarkista vastaus kirjan omassa tehtävänäkymässä. Tarkistusmerkintä ja vastaukset säilyvät C03:n nykyisessä tallennuksessa.",
        "Oikean kysymyksen avaaminen ei ole vastaus. Ainoastaan kirjan tallennetut vastaukset ja tarkistusmerkinnät täyttävät nämä kaksi opetuspolun vaatimusta.",
      ],
      bookLinks:[{label:"C03 · Text B, kysymykset 2 ja 3",chapterId:"03",section:"text-b",instruction:"Vastaa ja tarkista C03-MCOM02-Q02 sekä C03-MCOM02-Q03."}],
    },
    {
      id:"map",phase:"Kulttuuri ja kartta",kind:"explanation",
      title:"Kaupunki ei automaattisesti tarkoita lähtömaata",
      paragraphs:[
        "Berlin eli Berliini sijaitsee Saksassa, Deutschland. Kyoto eli Kioto sijaitsee Japanissa. Bern puolestaan sijaitsee Sveitsissä.",
        "Kun alkuperäisteksti sanoo aus Berlin, kyseessä on kaupunki. Kun sanot aus Deutschland, kyseessä on maa. Samaa aus-sanaa voi käyttää molemmissa tässä opetetuissa esimerkeissä.",
        "Päättele ensin henkilö ja paikka itse tekstistä. Kartta ja kulttuurisivu auttavat vasta sen jälkeen sijoittamaan kaupungin oikeaan maahan.",
      ],
      help:[{title:"Miksi Berlin ei ole sama kuin Deutschland?",body:"Berlin on yksi Saksan kaupungeista. Deutschland tarkoittaa koko maata. Sama ero koskee Kyoto/Japan ja Bern/Sveitsi."}],
    },
    {
      id:"culture",phase:"Karttaharjoittelu",kind:"book",
      title:"Paikanna kaupungit oppikirjan kulttuuriosasta",
      paragraphs:[
        "Avaa C03:n Kulttuuri ja tarkista, miten saksankieliset maat sijoittuvat Euroopassa. Vertaa kaupungin ja maan käsitteitä.",
        "Berliini ja Bern alkavat samankaltaisesti, mutta eivät ole sama kaupunki. Kioto on Japanissa eikä kuulu saksankielisiin maihin.",
        "Tämä on lähteen täydentävää maantieteellistä ymmärtämistä. Valinnaisen ulkoisen videon katsominen ei ole oppitunnin suoritusvaatimus.",
      ],
      bookLinks:[{label:"C03 · Kulttuuri",chapterId:"03",section:"culture",instruction:"Erota Berliini, Bern ja Kioto toisistaan."}],
      activityId:"place-map-reviewed",activityLabel:"Tarkistin kartta- ja maavertailun",
    },
    {
      id:"independent",phase:"Itsenäinen lukutaito",kind:"question",
      title:"Kirjoita Takashin lähtökaupunki",
      paragraphs:["Sulje lähdeteksti ja palauttele sen viimeinen repliikki mieleen. Älä tuota vielä uuden persoonan verbimuotoa."],
      question:{
        type:"text",skillId:"L1-READ-01",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi sen kaupungin nimi, josta Takashi kertoo tulevansa.",
        accepted:["Kyoto"],
        success:"Oikein. Takashi sanoo Ich komme aus Kyoto.",
        hint:"Se on Japanissa sijaitseva kaupunki, jonka nimi alkaa K-kirjaimella.",
        reteach:"Thomas ja Peter ovat Berliinistä, mutta Takashi kertoo tulleensa Kiotosta eli Kyoto.",
        genericWrong:"Kertaa neljäs puheenvuoro ja sen kaupungin nimi.",
        wrongAnswers:{"berlin":"Berlin on Thomasin ja Peterin lähtökaupunki.","bern":"Bern on Lisan asuinkaupunki C03:n Text A:ssa."},
      },
    },
    {
      id:"application",phase:"Soveltaminen",kind:"question",
      title:"Päättele kaksi lähtöpaikkaa",
      paragraphs:["Vertaa kahta lähteen henkilöryhmää. Tämä on uusi muistin perusteella tehtävä yhdistämistehtävä."],
      question:{
        type:"choice",skillId:"L1-READ-01",evidenceRole:"application",
        prompt:"Mikä yhdistelmä vastaa alkuperäistä M-COM-02-keskustelua?",
        options:[
          {id:"a",label:"Thomas ja Peter: Berlin · Takashi: Kyoto", "lang": "fi"},
          {id:"b",label:"Thomas ja Peter: Kyoto · Takashi: Berlin", "lang": "fi",wrongFeedback:"Kaupunkien henkilöt ovat menneet ristiin."},
          {id:"c",label:"Thomas ja Peter: Bern · Takashi: Österreich", "lang": "fi",wrongFeedback:"Bern liittyy Lisan toiseen tekstiin ja Österreich on maa, ei Takashin lähteen kaupunki."},
        ],
        correctOption:"a",success:"Oikein. Kolmas ja neljäs repliikki kertovat nämä paikat.",
        hint:"Löydät Thomasin tiedon kolmannesta ja Takashin neljännestä repliikistä.",
        reteach:"Thomas sanoo Wir kommen aus Berlin. Takashi sanoo Ich komme aus Kyoto.",
        genericWrong:"Etsi kumpikin lähtöpaikka erikseen lähdetekstistä.",
      },
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Älä sekoita lukemista kuuntelemiseen",
      paragraphs:["Lopuksi varmista yksi keskustelun todellinen lähdetieto. Äänitteen kuuntelua ei vaadita eikä pisteytetä."],
      question:{
        type:"choice",skillId:"L1-READ-01",evidenceRole:"exit",
        prompt:"Mikä näistä henkilöistä esitellään tekstissä mutta ei puhu omalla vuorollaan?",
        options:[
          {id:"a",label:"Peter"},
          {id:"b",label:"Takashi",wrongFeedback:"Takashi vastaa kahdessa repliikissä."},
          {id:"c",label:"Thomas",wrongFeedback:"Thomas kysyy nimen ja kertoo itsestään sekä Peteristä."},
        ],
        correctOption:"a",success:"Oikein. Peter mainitaan, mutta hän ei puhu lähteen neljässä repliikissä.",
        hint:"Hänet esitellään sanoilla Das ist ...",
        reteach:"Thomas sanoo Das ist Peter. Peterin nimi mainitaan, mutta omaa repliikkiä ei ole.",
        genericWrong:"Kertaa puhujat: Thomas, Takashi, Thomas, Takashi.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Ymmärrät kahden keskustelun paikkatiedot",
      paragraphs:[
        "Luit Thomasin ja Takashin neljä alkuperäistä repliikkiä, selvitit Thomasin ja Peterin sekä Takashin lähtökaupungit ja erotit kaupungit maista.",
        "Jos kuuntelit oikean ihmisäänitteen, se oli harjoittelua. Tämän oppitunnin arvioitavat vastaukset eivät väitä todistavansa kuullun ymmärtämistä ilman varmistettua kuuntelua.",
        "Seuraava L016 kertaa C03:n opitut taidot ja käyttää kirjan omaa kappaletestiä. Sie-muotojen itsenäinen kielioppituottaminen kuuluu vasta myöhemmälle tunnille.",
      ],
    },
  ],
};
