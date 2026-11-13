import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 · L013, C03 authentic source-reading lesson.
 * M-WB-07 replaces M-DIB-01 by the documented privacy decision of 11 Nov 2026.
 * The original eight turns are displayed in the digital textbook, not
 * duplicated as a second source/answer store. German rights, editorial and
 * real-device acceptance remain publication gates.
 *
 * Sie questions, wohnen and kommen plural are recognition support here:
 * independent production of woher/kommen is taught at L014.
 */
export const LOS1_L013_TEACHER: TeacherLesson = {
  id:"L013", bookId:1, chapterId:"03", version:"2.0.0-preview.1",
  title:"Lisa Müllerin alkuperäkeskustelu",
  objective:"Luen kahdeksan alkuperäistä puheenvuoroa, löydän Lisan lähtömaan ja asuinkaupungin sekä erotan tekstissä tunnistettavat kohteliaat kysymykset.",
  estimatedMinutes:30,
  requiredQuestionIds:["recall","guided","independent","application","exit"],
  requiredActivityIds:["read-eight-turns","compare-origin-residence"],
  requiredPracticeIds:[],
  requiredCheckedIds:["C03-SOURCE-Q01","C03-SOURCE-Q02","C03-SOURCE-Q03"],
  scenes:[
    {
      id:"welcome",phase:"Johdanto",kind:"introduction",
      title:"Sama henkilö voi asua eri maassa kuin mistä hän on kotoisin",
      paragraphs:[
        "L012:ssa opit Finnland, Deutschland, Österreich ja die Schweiz sekä sen, että Bern on kaupunki. Nyt luemme aidosti julkaistun kahdeksan puheenvuoron keskustelun Lisa Mülleristä.",
        "Sinun ei tarvitse osata keskustelun kaikkia kielioppimuotoja. Tavoitteena on saada selville kuka puhuu, mistä Lisa tulee ja missä hän asuu.",
        "Kappaleen pääteksti on M-WB-07, Wikibooks BLL German / A1 / Lesson 2. Sen lähdeversio ja lisenssi näkyvät oppikirjassa. Alkuperäistä haastattelua ei ole keksitty eikä korvattu opettajan omalla dialogilla.",
      ],
      help:[{title:"Miten aloitan, kun en ymmärrä kaikkea?",body:"Etsi ensin nimet sekä jo tutut maat. Sen jälkeen erottele kysymykset ja vastaukset. Älä yritä kääntää jokaista sanaa ensimmäisellä lukukerralla."}],
    },
    {
      id:"recall",phase:"Aktivointi",kind:"question",
      title:"Muista, mikä nimi on maa",
      paragraphs:["Palauta L012:n tieto mieleen, ennen kuin kohtaat alkuperäistekstin."],
      question:{
        type:"choice",skillId:"L1-CULT-01",
        prompt:"Mikä on maa eikä kaupunki?",
        options:[
          {id:"a",label:"Bern",wrongFeedback:"Bern on kaupunki Sveitsissä."},
          {id:"b",label:"Deutschland"},
          {id:"c",label:"Berlin",wrongFeedback:"Berlin on Saksan kaupunki."},
        ],
        correctOption:"b",success:"Oikein. Deutschland on Saksa, maa.",
        hint:"Maan nimi tarkoittaa saksaksi Saksaa.",
        reteach:"Deutschland = Saksa, Berlin = Berliini ja Bern on Sveitsissä sijaitseva kaupunki.",
        genericWrong:"Kertaa L012:n ero maan ja kaupungin välillä.",
      },
    },
    {
      id:"reading-strategy",phase:"Opettajan selitys",kind:"explanation",
      title:"Mitä keskustelussa tapahtuu?",
      paragraphs:[
        "Kaksi vierasta tulee paikalle etsimään Lisa Müller -nimistä henkilöä. He kysyvät puhujan nimeä ja alkuperää. Dialogissa äänessä ovat ensimmäinen vieras, Lisa ja toinen vieras.",
        "Lutz Schmidt ja Christine Schmidt esittäytyvät kumpikin vuorollaan. Lisan oma nimi on jo tiedossa, mutta vieraat eivät vielä tiedä, onko hän etsimänsä henkilö.",
        "Lisan viimeinen vastaus sisältää kaksi eri tietoa. Ich komme aus Deutschland kertoo lähtömaan ja ich wohne hier in Bern kertoo nykyisen asuinkaupungin.",
        "Kokonaisen lähdetekstin ymmärtäminen ei vaadi, että osaat käyttää kaikkia sen lauseita itse. Wo wohnen Sie? ja Woher kommen Sie? käsitellään nyt tunnistettavina ilmauksina.",
      ],
      help:[
        {title:"Selitä yksinkertaisemmin",body:"Lisa on kotoisin Saksasta. Hän asuu Bernissä. Lähtömaa ja asuinkaupunki eivät ole sama tieto."},
        {title:"Miksi lähdetekstissä on vaikeita muotoja?",body:"Oikean, aiemmin julkaistun keskustelun kaikki puheenvuorot säilytetään. Opetamme nyt sen ymmärtämistä. Sie-puhuttelun tuottaminen tulee myöhemmin C04:ssä."},
      ],
    },
    {
      id:"turn-map",phase:"Vaiheittainen opetustaulu",kind:"board",
      title:"Kahdeksan puheenvuoron kartta",
      paragraphs:[
        "Katso, kuinka kysymys ja vastaus seuraavat toisiaan. Taulu etenee alkuperäisen tekstin tapahtumajärjestyksessä, mutta koko alkuperäisteksti luetaan kirjasta.",
        "Erota erityisesti loppupuolella kysymys henkilön asuinpaikasta ja kysymys henkilön lähtömaasta.",
      ],
      board:[
        {label:"1 · Ensimmäinen vieras",german:"Sind Sie Lisa Müller?",meaning:"Vieras kysyy, onko puhuteltava Lisa Müller. Sie on tässä kohtelias te."},
        {label:"2 · Lisa",german:"Wie heißen Sie?",meaning:"Lisa kysyy vieraan nimeä. Tämä on tunnistettava Sie-kysymys."},
        {label:"3 · Ensimmäinen vieras",german:"Ich heiße Lutz Schmidt.",meaning:"Lutz kertoo oman nimensä, tuttu ich heiße -rakenne."},
        {label:"4 · Toinen vieras",german:"Ich heiße Christine Schmidt.",meaning:"Christine kertoo oman nimensä samalla rakenteella."},
        {label:"5 · Lisa",german:"Angenehm.",meaning:"Lisa sanoo hauska tutustua."},
        {label:"6 · Ensimmäinen vieras",german:"Wo wohnen Sie?",meaning:"Kysymys koskee asuinpaikkaa, ei lähtömaata."},
        {label:"7 · Toinen vieras",german:"Woher kommen Sie?",meaning:"Kysymys koskee alkuperää; Sie-muoto on vain tunnistettava."},
        {label:"8 · Lisa",german:"Ich komme aus Deutschland ... in Bern.",meaning:"Lopussa Lisa kertoo tulevansa Saksasta ja asuvansa Bernissä. Lue koko virke kirjasta."},
      ],
    },
    {
      id:"model",phase:"Opetettu malliesimerkki",kind:"explanation",
      title:"Näin erotan lähtömaan ja asuinkaupungin",
      paragraphs:[
        "Etsin vastauksen Lisan viimeisestä puheenvuorosta, en päättele sitä nimestä Müller tai sen perusteella, missä keskustelu käydään.",
        "Ensin etsin sanoja ich komme aus. Niiden jälkeen lukee Deutschland. Siksi lähdemaa on Saksa.",
        "Seuraavaksi etsin sanoja ich wohne hier in. Niiden jälkeen lukee Bern. Bern on kaupunki, joten asuinkaupunki on Bern.",
        "Yleinen virhe olisi vastata lähtömaakysymykseen Bern, koska se on Lisan viimeisessä lauseessa. Korjaus: lähtömaa Deutschland, asuinpaikka Bern.",
      ],
      help:[
        {title:"Mistä löydän oikean kohdan?",body:"Viimeisessä eli kahdeksannessa puheenvuorossa on molemmat tiedot peräkkäin: ensin komme aus Deutschland, sitten wohne hier in Bern."},
        {title:"Miksi sama lause sisältää kaksi paikkaa?",body:"Ihminen voi muuttaa maasta toiseen. Saksa vastaa kysymykseen mistä Lisa on, Bern kysymykseen missä hän nyt asuu."},
      ],
    },
    {
      id:"guided",phase:"Ohjattu harjoittelu",kind:"question",
      title:"Etsi lähdemaan merkitys",
      paragraphs:["Voit käyttää vielä opettajan juuri näyttämää esimerkkiä."],
      question:{
        type:"choice",skillId:"L1-READ-01",
        prompt:"Mitä Ich komme aus Deutschland kertoo Lisasta?",
        options:[
          {id:"a",label:"Hän on kotoisin Saksasta."},
          {id:"b",label:"Hän asuu Itävallassa.",wrongFeedback:"Österreich on Itävalta, mutta Lisa kieltää tulevansa sieltä."},
          {id:"c",label:"Hänen nimensä on Deutschland.",wrongFeedback:"Deutschland on maa eikä henkilön nimi."},
        ],
        correctOption:"a",success:"Oikein. Komme aus kertoo tässä Lisan lähtömaan.",
        hint:"Deutschland tarkoittaa Saksaa, ja komme aus liittyy lähtöpaikkaan.",
        reteach:"Ich komme aus Deutschland = Olen kotoisin Saksasta. Ich wohne in Bern = Asun Bernissä.",
        genericWrong:"Etsi lauseesta maa ja muista, mitä lähtöpaikasta kertominen tarkoittaa.",
      },
    },
    {
      id:"source",phase:"Autenttisen tekstin lukeminen",kind:"book",
      title:"Lue kirjan Text A kokonaan",
      paragraphs:[
        "Avaa C03:n Text A. Lue kaikki kahdeksan alkuperäistä puheenvuoroa, myös vieraita ja kohteliasta Sie-puhuttelua sisältävät kohdat. Suomennokset ja sanaselitykset ovat erillistä opetustukea.",
        "Tunnista tekstistä Lisa Müller, Lutz Schmidt, Christine Schmidt, Deutschland, Österreich ja Bern. Lähdeteksti on kirjan sisällä, eikä sinun tarvitse poistua ulkoiseen verkkopalveluun.",
        "Lähteelle ei ole tässä oppitunnissa hyväksyttyä synkronoitua ihmisäänitettä. Älä pidä tekstin lukemista kuuntelusuorituksena.",
      ],
      bookLinks:[{label:"C03 · Text A, M-WB-07",chapterId:"03",section:"text",instruction:"Lue kaikki kahdeksan repliikkiä, tarkista puhujat ja viimeinen vastaus."}],
      activityId:"read-eight-turns",activityLabel:"Luin kaikki kahdeksan alkuperäistä puheenvuoroa",
    },
    {
      id:"question-guide",phase:"Kirjan ymmärtämistehtävät",kind:"book",
      title:"Vastaa ja tarkista kolme oikeaa lähdekysymystä",
      paragraphs:[
        "Avaa C03:n Ymmärrä-osio. Vastaa kirjan omiin C03-SOURCE-Q01-, C03-SOURCE-Q02- ja C03-SOURCE-Q03-kysymyksiin. Ensimmäinen koskee lähtömaata, toinen asuinkaupunkia ja kolmas woher-kysymyksen tunnistamista.",
        "Paina kaikissa kolmessa kirjan Tarkista vastaus -toimintoa. Pelkkä vastauksen valitseminen tai tekstisivun avaaminen ei täytä tarkistettua lähdetehtävää.",
        "Vastaukset jäävät kirjan omaan tallennukseen. Tässä opetusmoottorissa tarkistetaan vain olemassa olevat vastaus- ja tarkistusmerkinnät, ei luoda toista tehtäväkantaa.",
      ],
      bookLinks:[{label:"C03 · Ymmärrä, Q01–Q03",chapterId:"03",section:"understand",instruction:"Vastaa ja tarkista C03-SOURCE-Q01, C03-SOURCE-Q02 sekä C03-SOURCE-Q03."}],
    },
    {
      id:"language-support",phase:"Tunnistava kielituki",kind:"explanation",
      title:"Wo ja woher eivät kysy samaa asiaa",
      paragraphs:[
        "Wo tarkoittaa missä. Wo wohnen Sie? kysyy kohteliaasti missä toinen asuu. Woher tarkoittaa mistä. Woher kommen Sie? kysyy mistä toinen on kotoisin.",
        "Jos lähdetekstissä on lause Kommen Sie aus Österreich?, ymmärrä se kysymyksenä Oletteko Itävallasta? Lisa vastaa Nein ja kertoo oikeaksi lähtömaaksi Deutschland.",
        "Älä vielä yritä itse muodostaa kaikkia näitä Sie-kysymyksiä. Seuraava L014 opettaa sinuttelun Woher kommst du? sekä vastauksen Ich komme aus Finnland.",
      ],
      help:[
        {title:"Miksi woher eikä wo?",body:"Wo = missä juuri nyt tai missä jokin on. Woher = mistä joku tulee tai on kotoisin. Eri kysymys vaatii eri tiedon."},
        {title:"Miksi tekstissä on Sie eikä du?",body:"Vieraat puhuttelevat toisiaan kohteliaasti. Saksan kohtelias Sie on eri puhuttelutapa kuin tutun sinuttelu du. Aktiivisen taivutuksen harjoittelu kuuluu C04:ään."},
      ],
    },
    {
      id:"independent",phase:"Itsenäinen muistista palauttaminen",kind:"question",
      title:"Kirjoita lähdemaa ilman tekstiä",
      paragraphs:["Sulje Text A ja muistele, mikä maa mainittiin Lisan omassa vastauksessa. Tässä ei tuoteta uutta kysymysrakennetta."],
      question:{
        type:"text",skillId:"L1-READ-01",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi maan nimi, josta Lisa Müller on kotoisin.",
        accepted:["Deutschland"],
        success:"Oikein. Lisa sanoo Ich komme aus Deutschland.",
        hint:"Muista L012:n opetettu Saksan nimi, joka alkaa Deutsch-.",
        reteach:"Teksti kertoo: Lisa on Saksasta, joka on Deutschland. Bern puolestaan on kaupunki, jossa hän asuu.",
        genericWrong:"Kertaa Lisan viimeinen vastaus ja erota maan nimi kaupungin nimestä.",
        wrongAnswers:{"bern":"Bern on hänen asuinkaupunkinsa, ei lähtömaansa.","österreich":"Lisa vastaa Nein Itävaltaa koskevaan kysymykseen."},
      },
    },
    {
      id:"compare",phase:"Soveltava selitys",kind:"explanation",
      title:"Sama henkilö, kaksi eri paikkatietoa",
      paragraphs:[
        "Kun joku muuttaa, hänen lähtömaansa ja asuinkaupunkinsa voivat olla eri paikoissa. Lisan tapauksessa Saksa on maa, Bern on Sveitsissä sijaitseva kaupunki.",
        "Kaksi avainrakennetta näyttävät eron: komme aus + lähtömaa ja wohne in + asuinpaikka. Nyt tunnistat ne tekstistä. Kieliopillinen oma tuottaminen alkaa L014:ssa vain jo opetetuilla esimerkeillä.",
        "Palaa halutessasi alkuperäiseen repliikkiin ja vertaa alkuperäisiä sanoja erillisiin suomennoksiin. Älä muuta lähdetekstin alkuperäisiä lauseita.",
      ],
      activityId:"compare-origin-residence",activityLabel:"Vertasin Lisan lähtömaan ja asuinkaupungin tekstikohdat",
    },
    {
      id:"application",phase:"Soveltaminen",kind:"question",
      title:"Mitä tiedot kertovat?",
      paragraphs:["Kuvitteellisen henkilön tiedot on kirjattu samaan tapaan kuin Lisan: lähtömaa ja asuinkaupunki erikseen. Vastaa vain merkityksestä."],
      question:{
        type:"choice",skillId:"L1-READ-01",evidenceRole:"application",
        prompt:"Henkilön lähtömaaksi on merkitty Finnland ja asuinkaupungiksi Wien. Mikä tulkinta on oikea?",
        options:[
          {id:"a",label:"Henkilö on kotoisin Suomesta ja asuu Wienissä."},
          {id:"b",label:"Henkilö on kotoisin Wienistä ja asuu Suomessa.",wrongFeedback:"Finnland on maa Suomi, Wien kaupunki Itävallassa. Näiden roolit menivät ristiin."},
          {id:"c",label:"Molemmat ovat Saksan kaupunkeja.",wrongFeedback:"Finnland on maa, Wien on kaupunki."},
        ],
        correctOption:"a",success:"Oikein. Lähtömaa ja nykyinen asuinkaupunki pysyvät erillisinä tietoina.",
        hint:"Finnland on maa Suomi, Wien on kaupunki.",
        reteach:"Lähtömaa Finnland = Suomi. Asuinkaupunki Wien = Wien. Älä käännä tietojen järjestystä.",
        genericWrong:"Tarkista, mikä nimi on maa ja mikä kaupunki.",
      },
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Kenen puheenvuorossa ratkaisu on?",
      paragraphs:["Tunnista alkuperäisen kahdeksan puheenvuoron rakenne ilman uutta kieliopin tuottamistehtävää."],
      question:{
        type:"choice",skillId:"L1-READ-01",evidenceRole:"exit",
        prompt:"Kuka sanoo alkuperäisessä keskustelussa olevansa Saksasta ja asuvansa Bernissä?",
        options:[
          {id:"a",label:"Lutz Schmidt",wrongFeedback:"Lutz esittelee oman nimensä, mutta ei kerro viimeisen vastauksen kahta paikkatietoa."},
          {id:"b",label:"Lisa Müller"},
          {id:"c",label:"Christine Schmidt",wrongFeedback:"Christine esittäytyy ja kysyy alkuperää. Lisa vastaa."},
        ],
        correctOption:"b",success:"Oikein. Lisan kahdeksannessa puheenvuorossa ovat molemmat tiedot.",
        hint:"Etsi se puhuja, jolta vieraat kysyvät mistä hän on kotoisin.",
        reteach:"Lutz ja Christine esittäytyvät, mutta Lisa vastaa lopussa Nein, ich komme aus Deutschland ... in Bern.",
        genericWrong:"Kertaa viimeisen puheenvuoron puhuja.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Ymmärsit autenttisen keskustelun ydintiedot",
      paragraphs:[
        "Luit kaikki kahdeksan puheenvuoroa, tunnistit Lisan sekä kahden vieraan roolit ja erotit hänen lähtömaansa asuinkaupungistaan.",
        "Kirjan Q01, Q02 ja Q03 ovat erikseen tarkistettavia lähdetehtäviä. Opetustilan läpikäynti, omalla vahvistuksella tehty lukeminen ja oikea itsenäinen vastaus ovat eri asioita.",
        "L014:ssa opit muodostamaan vasta omat sinuttelumuotoiset lähtömaakysymykset ja vastaukset. M-WB-07:n riippumaton kieli-, oikeus- ja pedagoginen hyväksyntä on edelleen avoin.",
      ],
    },
  ],
};
