import type { TeacherLesson } from "./engine.ts";

/**
 * L015 · C03 Text B is M-COM-02, a complete Ariser four-turn dialogue.
 * The optional Nicos Weg video has no approved synchronized in-app transcript
 * or tested playback. Never fabricate Nico dialogue or score unverified audio.
 */
export const LOS1_L015_TEACHER: TeacherLesson = {
  id:"L015",bookId:1,chapterId:"03",version:"2.0.0-preview.1",
  title:"Alkuperä ja karttatehtävät",
  objective:"Luen Thomasin, Takashin ja Peterin aidon neljän repliikin Text B:n, tunnistan Berliinin ja Kioton alkuperäpaikoiksi ja päättelen sijainnit kartan avulla.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","source-detail","independent","application","exit"],
  requiredActivityIds:["read-complete-textb","map-reviewed"],
  requiredPracticeIds:[],
  requiredCheckedIds:["C03-MCOM02-Q02","C03-MCOM02-Q03"],
  scenes:[
    {id:"welcome",phase:"Aloitus",kind:"introduction",title:"Tutki toista oikeaa saksankielistä keskustelua",
     paragraphs:[
      "Tässä tunnissa palaat C03:n toiseen alkuperäisaineistoon, M-COM-02:een. Sen neljässä aidossa puheenvuorossa Thomas, Takashi ja Peter tulevat mainituiksi.",
      "Kirjassa näkyy koko saksankielinen teksti sekä sen sanaselitykset. Lähteellä on alkuperäinen ihmisäänite, jota voi kokeilla, mutta äänentoiston toimivuutta ei ole vahvistettu kaikilla laitteilla.",
      "Nicos Weg -videota ei käsitellä suoritettuna kuunteluna eikä Nicoa lisätä keksityksi puhujaksi tähän tekstiin. Voit tehdä koko tehtävän myös pelkästään lukemalla.",
      "Lopuksi vertaat henkilötietoja maantieteellisiin paikkoihin: maa, kaupunki ja niihin liittyvä päättely."
     ],help:[{title:"Pitääkö ääni kuulla?",body:"Ei. Autenttinen äänite on lisämahdollisuus. Varsinaiset tarkistukset perustuvat kirjan neljään näkyvään puheenvuoroon."}]},
    {id:"recall",phase:"Aktivointi",kind:"question",title:"Mitä woher kysyy?",
     paragraphs:["Ennen toista tekstiä tarkista, mitä L014:n kysymyksellä selvitetään."],
     question:{type:"choice",skillId:"L1-INT-03",prompt:"Mitä Woher kommst du? tarkoittaa?",
      options:[{id:"a",label:"Mistä olet kotoisin?"},{id:"b",label:"Missä asut?",wrongFeedback:"Missä asut? kysyy sijaintia, ei alkuperää."},
       {id:"c",label:"Mikä nimesi on?",wrongFeedback:"Nimeä kysytään Wie heißt du?"}],
      correctOption:"a",success:"Oikein. Woher = mistä.",
      hint:"Muista alkuperää ja lähtöpaikkaa koskeva kysymys.",
      reteach:"Woher kommst du? = Mistä olet kotoisin? Wo wohnst du? = Missä asut?",
      genericWrong:"Tarkista ero woher ja wo."}},
    {id:"reading",phase:"Tekstin ennakointi",kind:"explanation",title:"Etsi ensin nimet ja paikat, älä jokaista kielioppimuotoa",
     paragraphs:[
      "Lähteen neljä puheenvuoroa ovat: Thomasin kysymys Wie heißt du?, Takashin esittäytyminen, Thomasin oma esittäytyminen ja Peterin mainitseminen sekä Takashin lähtöpaikkavastaus.",
      "Kun luet, katso ensin kuka sanoo Ich komme aus Kyoto. Tämän jälkeen etsi ilmaus Wir kommen aus Berlin. Molemmat antavat lähtöpaikan.",
      "Wir tarkoittaa me. Wir kommen aus Berlin. kertoo kahdesta henkilöstä, joihin Thomas viittaa: hänestä itsestään ja Peteristä. Monikkomuoto kommen on tässä tekstin tunnistustukea.",
      "Ich bin Japaner. tarkoittaa Olen japanilainen (mies). Se ei tarkoita, että Kyoto olisi maa. Kyoto on Japanissa sijaitseva kaupunki."
     ],help:[{title:"Mikä on wir?",body:"Wir = me. Tekstissä Thomas puhuu itsestään ja Peteristä, joten hän sanoo wir kommen."},
      {title:"Onko Kyoto maa?",body:"Ei. Kyoto on kaupunki Japanissa. Berlin on kaupunki Saksassa."}]},
    {id:"source-board",phase:"Näytetty lukumalli",kind:"board",title:"Neljän alkuperäisen repliikin merkityskartta",
     paragraphs:["Paina Seuraava ja seuraa puhujia lähteen oikeassa järjestyksessä. Lue varsinainen kokonainen teksti myös kirjan Text B -sivulta."],
     board:[
      {label:"1 · Thomas kysyy",german:"Wie heißt du?",meaning:"Thomas kysyy Takashin nimeä."},
      {label:"2 · Takashi vastaa",german:"Ich heiße Takashi. Und du?",meaning:"Takashi kertoo oman nimensä ja kysyy vastavuoroisesti."},
      {label:"3 · Thomas vastaa",german:"Ich bin Thomas. Das ist Peter. Wir kommen aus Berlin.",meaning:"Thomas esittelee Peterin ja kertoo molempien tulevan Berliinistä."},
      {label:"4 · Takashi kertoo paikkansa",german:"Ich komme aus Kyoto. Ich bin Japaner.",meaning:"Takashi tulee Kiotosta ja kertoo olevansa japanilainen."}
     ]},
    {id:"model",phase:"Opetettu malliesimerkki",kind:"explanation",title:"Näin poimin paikkatiedon tekstistä",
     paragraphs:[
      "Kysymys: Mistä Thomas ja Peter tulevat? Etsin Thomasin puheenvuorosta Wir kommen aus Berlin. Wir viittaa Thomasin ja Peterin yhteiseen vastaukseen.",
      "Vastaus on siis Berliinistä, ei Kiotosta. Berlin on kaupunki Saksassa. En sano heidän olevan suoraan peräisin vain Saksasta, jos kysyttiin nimenomaan kaupunkia.",
      "Seuraava kysymys: Mistä Takashi tulee? Takashin omassa viimeisessä vastauksessa lukee Ich komme aus Kyoto. Vastaus on Kiotosta.",
      "Kaksi lähdetietoa eivät ole ristiriidassa: eri henkilöt tulevat eri paikoista."
     ]},
    {id:"guided",phase:"Ohjattu harjoittelu",kind:"question",title:"Ymmärrä wir kommen",
     paragraphs:["Palaa opettajan malliin tarvittaessa."],
     question:{type:"choice",skillId:"L1-READ-01",prompt:"Mitä Wir kommen aus Berlin. tarkoittaa lähteessä?",
      options:[{id:"a",label:"Me tulemme Berliinistä."},{id:"b",label:"Minä tulen Kiotosta.",wrongFeedback:"Ich komme aus Kyoto on Takashin erillinen vastaus."},
       {id:"c",label:"Me asumme Kiotossa.",wrongFeedback:"Kommen aus kertoo lähtöpaikan, ei missä asutaan."}],
      correctOption:"a",success:"Oikein. Wir = me ja aus Berlin = Berliinistä.",
      hint:"Tunnistatko sanan wir, me?",
      reteach:"Ich komme = minä tulen; wir kommen = me tulemme. Aus Berlin kertoo kaupungin.",
      genericWrong:"Tarkista pronomini ja paikan nimi."}},
    {id:"book",phase:"Teksti B ja valinnainen ihmisäänite",kind:"book",title:"Lue koko M-COM-02-teksti kirjasta",
     paragraphs:[
      "Avaa C03:n Text B. Lue kaikki neljä puheenvuoroa sellaisina kuin ne ovat alkuperäisessä lähteessä. Avaamalla sanoja voit tarkistaa esimerkiksi wir, kommen, Kyoto ja Japaner.",
      "Jos alkuperäinen Ariserin äänite toistuu laitteellasi, voit kuunnella sen ja lukea samanaikaisesti. Jos toisto epäonnistuu, jatka näkyvästä tekstistä. Älä vahvista kuuntelua suorituksena vain siksi, että näit soittimen.",
      "Tekstin CC BY-SA 3.0 -attribuutio on kirjassa. Äänitteen laitetestausta tai riippumatonta kielentarkistusta ei ole merkitty tehdyksi."
     ],bookLinks:[{label:"C03 · Text B (M-COM-02)",chapterId:"03",section:"text-b",instruction:"Lue Thomasin ja Takashin neljä alkuperäistä repliikkiä, halutessasi kokeile ihmisäänitettä."}],
     activityId:"read-complete-textb",activityLabel:"Luin kaikki neljä Text B -puheenvuoroa"},
    {id:"source-detail",phase:"Tekstikohtainen harjoitus",kind:"question",title:"Kuka esittelee Peterin?",
     paragraphs:["Etsi repliikki Das ist Peter. ja tunnista sen puhuja."],
     question:{type:"choice",skillId:"L1-READ-01",prompt:"Kuka kertoo keskustelussa Das ist Peter.?",
      options:[{id:"a",label:"Thomas"},{id:"b",label:"Takashi",wrongFeedback:"Takashi kertoo nimensä ja tulevansa Kiotosta."},
       {id:"c",label:"Peter",wrongFeedback:"Peter on esitelty henkilö, mutta hänellä ei ole omaa repliikkiä tässä tekstissä."}],
      correctOption:"a",success:"Oikein. Thomas esittelee Peterin.",
      hint:"Lause on lähteen kolmannessa puheenvuorossa.",
      reteach:"Thomas: Ich bin Thomas. Das ist Peter. Wir kommen aus Berlin.",
      genericWrong:"Tarkista kolmannen puheenvuoron puhuja."}},
    {id:"questions",phase:"Kirjan oikeat ymmärtämistehtävät",kind:"book",title:"Tee ja tarkista kaksi Text B:n tehtävää",
     paragraphs:[
      "Vastaa kirjan Text B:n kysymyksiin C03-MCOM02-Q02 (Thomas ja Peter) ja C03-MCOM02-Q03 (Takashi).",
      "Paina molempien kohdalla Tarkista vastaus. Teacher hyväksyy tässä vain kirjassa tallennetut vastaukset, joilla on erillinen tarkistusmerkintä.",
      "Virheellinen vastauskin kirjautuu tarkistetuksi harjoitukseksi, mutta ei ole itsenäisen osaamisen osoitus. Lue selite ja yritä uudelleen."
     ],bookLinks:[{label:"C03 · Text B -tehtävät",chapterId:"03",section:"text-b",instruction:"Vastaa ja tarkista C03-MCOM02-Q02 sekä C03-MCOM02-Q03."}]},
    {id:"geo-teaching",phase:"Karttapäättely",kind:"explanation",title:"Kaupunki ei ole sama asia kuin maa",
     paragraphs:[
      "Piirrä mielessäsi kolme tasoa: maanosat, maat ja kaupungit. Berliini on Saksassa Euroopassa. Bern on Sveitsissä Euroopassa. Kioto on Japanissa Aasiassa.",
      "Lue lähteen ilmaukset täsmälleen: Thomas ja Peter tulevat Berliinistä, Takashi Kiotosta. Lähdeteksti ei väitä, että kummankaan nykyinen asuinpaikka olisi sama kuin lähtöpaikka.",
      "L013:n Lisa asuu Bernissä mutta on kotoisin Saksasta. Tästä ei voi päätellä, että myös Thomas ja Peter asuisivat Bernissä.",
      "Kartassa maan ja kaupungin sijainti auttaa ymmärtämään alkuperää, mutta älä päättele henkilön kansalaisuutta pelkän lähtökaupungin perusteella."
     ]},
    {id:"map-board",phase:"Interaktiivinen karttataulu",kind:"board",title:"Yhdistä lähteen paikannimet kartan alueisiin",
     paragraphs:["Tämä sanallinen karttataulu ei ole uusi ulkoinen karttamedia. Siirry vaiheittain ja tarkista kaupunki, maa ja maanosa."],
     board:[
      {label:"1 · Eurooppa → Saksa",german:"Berlin → Deutschland",meaning:"Berliini, Saksa; Thomas ja Peter sanovat tulevansa Berliinistä"},
      {label:"2 · Aasia → Japani",german:"Kyoto → Japan",meaning:"Kioto, Japani; Takashi sanoo tulevansa Kiotosta"},
      {label:"3 · Eurooppa → Sveitsi",german:"Bern → die Schweiz",meaning:"Bern, Sveitsi; Lisa sanoo asuvansa siellä, mutta tulevansa Saksasta"},
      {label:"4 · Tarkista lähde",german:"Wir kommen aus Berlin. / Ich komme aus Kyoto.",meaning:"Alkuperä määräytyy puheenvuoron tekstistä, ei kartalla lähimmästä kaupungista"}
     ]},
    {id:"independent",phase:"Itsenäinen muistista palauttaminen",kind:"question",title:"Kirjoita Takashin kaupunki",
     paragraphs:["Sulje teksti hetkeksi. Vastaa vain kaupungin nimi, jonka Takashi sanoo omassa vastauksessaan."],
     question:{type:"text",skillId:"L1-READ-01",evidenceRole:"independent",prompt:"Kirjoita saksankielisessä tekstissä mainittu Takashin lähtökaupunki.",
      accepted:["Kyoto"],
      success:"Oikein. Takashi sanoo Ich komme aus Kyoto.",
      hint:"Kaupunki on Japanissa, ei Saksassa.",
      reteach:"Takashin viimeisessä repliikissä lukee Ich komme aus Kyoto.",
      genericWrong:"Älä sekoita Thomasin Berliiniä Takashin Kiotoon.",
      wrongAnswers:{"berlin":"Berlin on Thomasin ja Peterin kaupunki.","bern":"Bern on Lisan asuinkaupunki eri tekstissä.","japan":"Japan on maa, mutta kysyttiin kaupunkia."}}},
    {id:"map-activity",phase:"Soveltava karttatehtävä",kind:"activity",title:"Vertaa oikeaa kirjan kartta- ja kulttuurisisältöä",
     paragraphs:[
      "Avaa C03:n Kulttuuri. Etsi saksankieliset maat ja alueet ja vertaa niihin Berliinin sekä Bernin paikkoja. Kioto sijoittuu Euroopan ulkopuolelle Japaniin.",
      "Kerro itsellesi tai kirjoita paperille: Berlin → Deutschland; Bern → die Schweiz; Kyoto → Japan. Älä sekoita Lisan lähtömaata hänen nykyiseen kaupunkiinsa.",
      "Vahvista vain, kun olet todella tarkistanut kartan alueet tai tehnyt vastaavan vertailun. Tämä on oma harjoittelumerkintä, ei geografin arvosana."
     ],bookLinks:[{label:"C03 · Kulttuuri",chapterId:"03",section:"culture",instruction:"Vertaa Saksaa ja Sveitsiä sekä Berliinin, Bernin ja Kioton sijainteja."}],
     activityId:"map-reviewed",activityLabel:"Vertasin kaupunkeja niiden maihin ja maanosaan"},
    {id:"application",phase:"Soveltaminen",kind:"question",title:"Päättele kartasta uusi tilanne",
     paragraphs:["Kuvitteellisen matkakortin kaupunki on Berlin ja maa Deutschland. Valitse täsmällinen tulkinta, älä lisää tietoja henkilön asumisesta."],
     question:{type:"choice",skillId:"L1-CULT-01",evidenceRole:"application",prompt:"Mikä seuraavista on tekstin ja kartan perusteella oikein?",
      options:[{id:"a",label:"Berliini on Saksan kaupunki ja Thomas sekä Peter kertovat tulevansa sieltä."},
       {id:"b",label:"Berliini on Japanissa, josta myös Takashi tulee.",wrongFeedback:"Berliini on Saksassa. Takashi kertoo tulevansa Kiotosta Japanista."},
       {id:"c",label:"Thomas ja Peter varmasti asuvat Berliinissä tällä hetkellä.",wrongFeedback:"Teksti kertoo lähtöpaikan, ei heidän nykyistä asuinpaikkaansa."}],
      correctOption:"a",success:"Oikein. Kartta kertoo kaupungin maan ja puheenvuoro kertoo alkuperän.",
      hint:"Tarkista Wir kommen aus Berlin. ja sijoita Berlin oikeaan maahan.",
      reteach:"Berlin → Deutschland, Kyoto → Japan. Kommen aus kertoo mistä tullaan, ei varmuudella missä nyt asutaan.",
      genericWrong:"Erota lähteestä luettu fakta ja omat oletukset."}},
    {id:"exit",phase:"Lopputarkistus",kind:"question",title:"Kenen alkuperä selviää viimeisestä repliikistä?",
     paragraphs:["Vastaa ilman näkyvää tekstiä."],
     question:{type:"choice",skillId:"L1-READ-01",evidenceRole:"exit",prompt:"Kenen puheenvuorossa on Ich komme aus Kyoto?",
      options:[{id:"a",label:"Takashi"},{id:"b",label:"Thomas",wrongFeedback:"Thomas sanoo Wir kommen aus Berlin."},
       {id:"c",label:"Lisa Müller",wrongFeedback:"Lisa kuuluu C03:n erilliseen Text A:han."}],
      correctOption:"a",success:"Oikein. Takashi tulee Kiotosta.",
      hint:"Henkilö, joka kertoo olevansa Japaner.",
      reteach:"Takashi: Ich komme aus Kyoto. Ich bin Japaner.",
      genericWrong:"Etsi viimeisen, neljännen repliikin puhuja."}},
    {id:"summary",phase:"Yhteenveto",kind:"summary",title:"Osaat erottaa lähteen kaupungit ja maat",
     paragraphs:[
      "Luit M-COM-02:n kaikki neljä puheenvuoroa: Thomas ja Peter kertovat tulevansa Berliinistä, Takashi Kiotosta. Karttataulu sijoittaa Berliinin Saksaan ja Kioton Japaniin.",
      "Kirjan kaksi tarkistettua Text B -tehtävää on vaadittu. Kuuntelua ei ole merkitty automaattisesti onnistuneeksi eikä Nicon videolle ole luotu keksittyä transkriptiota.",
      "L016:ssa harjoittelet näitä muotoja ja palautat oikean kappaletestin."
     ]}
  ]
};