import type { TeacherLesson } from "./engine.ts";

/**
 * LOS! 1 L009 · C02 3/5. Explicit beginner teaching of four forms.
 * Grounded in C02 grammar and canonical workbook IDs C02-EX-03..06.
 * Only ich/du are productive at this stage; er/sie forms are not assessed.
 * Workbook answers live exclusively in the real C02 chapter draft.
 * Editorial German and pedagogical review pending.
 */
export const LOS1_L009_TEACHER: TeacherLesson = {
  id:"L009",bookId:1,chapterId:"02",version:"2.0.0-preview.1",
  title:"Heißen ja sein minä–sinä",
  objective:"Valitsen heißen- ja sein-verbien oikeat ich- ja du-muodot ja ymmärrän, miksi nimilauseessa voidaan käyttää kumpaakin verbiä.",
  estimatedMinutes:30,
  requiredQuestionIds:["pre-heissen","pre-sein","guided-heissen","guided-sein","transfer","exit"],
  requiredActivityIds:["grammar-reviewed","practice-reviewed","own-dialogue"],
  requiredPracticeIds:["C02-EX-03","C02-EX-04","C02-EX-05","C02-EX-06"],
  scenes:[
    {
      id:"welcome",phase:"Aloitus",kind:"introduction",
      title:"Sama nimi, kaksi verbiä ja neljä muotoa",
      paragraphs:[
        "Edellisillä tunneilla opit kysymään nimeä ja lukemaan Franzin ja Gretan esittäytymiskeskustelun. Nyt opit itse muodostamaan kaksi tärkeää rakennetta oikein.",
        "Nämä ovat tunnin neljä aktiivisesti opeteltavaa muotoa: ich heiße, du heißt, ich bin ja du bist. Sinun ei tarvitse vielä taivuttaa kaikkia verbien persoonia tai opiskella sijamuotoja.",
        "Ensin kokeilet kahta ennakkokysymystä. Sitten opettaja näyttää säännön, harjoittelet yhdessä, teet neljä oikeaa kirjatehtävää ja lopuksi kokeilet tuottamista ilman mallia.",
        "Voit käyttää kuvitteellisia nimiä, esimerkiksi Mia ja Max. Omaa nimeä tai muita henkilötietoja ei tarvitse tallentaa.",
      ],
    },
    {
      id:"pre-heissen",phase:"Ennakkotarkistus 1/2",kind:"question",
      title:"Mikä muoto seuraa ich-pronominia?",
      paragraphs:[
        "Kokeile ilman sanastoa. Tämä on alkutilanteen kartoittamista, ei itsenäinen kielitaitonäyttö. Saat opetuksen riippumatta siitä, miten vastaat.",
      ],
      question:{
        type:"choice",skillId:"L1-GRA-01",
        prompt:"Täydennä: Ich ____ Mia. (heißen)",
        options:[
          {id:"a",label:"heißt",wrongFeedback:"Heißt kuuluu tässä du-muotoon. Ich tarvitsee eri päätteen."},
          {id:"b",label:"heiße"},
          {id:"c",label:"bist",wrongFeedback:"Bist on sein-verbin sinämuoto, ei heißen-verbin minämuoto."},
        ],
        correctOption:"b",success:"Oikein. Ich heiße Mia. tarkoittaa Nimeni on Mia.",
        hint:"Heißen-verbin minämuoto päättyy -e.",
        reteach:"Heißen: ich heiße, du heißt. Kun puhuja on ich, valitse heiße.",
        genericWrong:"Erota heißen-verbin minämuoto sen sinämuodosta.",
      },
    },
    {
      id:"pre-sein",phase:"Ennakkotarkistus 2/2",kind:"question",
      title:"Onko sein-verbin muoto jo tuttu?",
      paragraphs:[
        "Sein tarkoittaa olla. Sen kaksi alkeismuotoa pitää opetella erikseen, sillä ne eivät näytä aivan perusmuodoltaan.",
      ],
      question:{
        type:"choice",skillId:"L1-GRA-01",
        prompt:"Täydennä: Du ____ Max. (sein)",
        options:[
          {id:"a",label:"bin",wrongFeedback:"Bin kuuluu minämuotoon ich bin."},
          {id:"b",label:"bist"},
          {id:"c",label:"heißt",wrongFeedback:"Heißt kuuluu heißen-verbiin. Nyt haetaan olla-verbiä."},
        ],
        correctOption:"b",success:"Oikein. Du bist Max. tarkoittaa Sinä olet Max.",
        hint:"Sinämuoto on nelikirjaiminen ja alkaa bi-.",
        reteach:"Sein: ich bin, du bist. Näitä ei muodosteta lisäämällä tavallista päätettä sanan sein loppuun.",
        genericWrong:"Valitse sein-verbin sinämuoto, ei heißen-verbin muotoa.",
      },
    },
    {
      id:"explain",phase:"Opettajan selitys",kind:"explanation",
      title:"Heißen kertoo nimen, sein kertoo kuka olet",
      paragraphs:[
        "Heißen tarkoittaa tässä olla nimeltään. Ich heiße Mia. = Nimeni on Mia. Du heißt Max. = Sinun nimesi on Max. Kysymyksessä Wie heißt du? verbi on samassa sinämuodossa heißt.",
        "Sein tarkoittaa olla. Ich bin Mia. = Olen Mia. Du bist Max. = Olet Max. Molemmat Ich heiße Mia. ja Ich bin Mia. toimivat tavallisena esittäytymisenä, mutta niiden verbit ovat eri verbejä.",
        "Vaihda ensin vain tekijää: ich on minä ja du on sinä. Heißen muuttuu ich heiße → du heißt. Sein muuttuu ich bin → du bist.",
        "Älä yhdistele muotoja mielivaltaisesti. Ich bist ja du bin ovat vääriä. Myös du heißst on väärin: oikea kirjoitusasu on du heißt, jossa on ß ja lopussa t.",
      ],
      help:[
        {title:"Miksi ich heiße mutta du heißt?",body:"Heiß-en on perusmuoto heißen. Näissä kahdessa opeteltavassa persoonassa käytetään ich heiße ja du heißt. Merkittävä tarkistuskohta on du heißt, ei du heißst."},
        {title:"Miksi sein ei muutu sääntöjen mukaan?",body:"Sein on epäsäännöllinen verbi. Alussa opettelet sen kaksi muotoa suoraan: ich bin ja du bist. Muita persoonia ei tarvitse vielä tuottaa."},
        {title:"Voinko sanoa Ich bin Max ja Ich heiße Max?",body:"Kyllä. Esittäytyessä molemmat ovat oikein. Ensimmäinen tarkoittaa 'Olen Max', jälkimmäinen 'Nimeni on Max'."},
      ],
    },
    {
      id:"board",phase:"Opetustaulu",kind:"board",
      title:"Opi neljä muotoa pareina",
      paragraphs:[
        "Avaa taulusta ensin heißen-verbin kaksi muotoa ja sitten sein-verbin kaksi muotoa. Sano jokaisen mallin jälkeen uusi lause kuvitteellisella nimellä.",
        "Taulun tavoite on ymmärtää ero. Se ei automaattisesti pisteytä omaa ääntämistäsi eikä korvaa kirjan neljää varsinaista tehtävää.",
      ],
      board:[
        {label:"heißen · ich",german:"Ich heiße Mia.",meaning:"Nimeni on Mia. · heiße kuuluu ich-persoonaan"},
        {label:"heißen · du",german:"Du heißt Max.",meaning:"Sinun nimesi on Max. · heißt kuuluu du-persoonaan"},
        {label:"sein · ich",german:"Ich bin Mia.",meaning:"Olen Mia. · bin kuuluu ich-persoonaan"},
        {label:"sein · du",german:"Du bist Max.",meaning:"Olet Max. · bist kuuluu du-persoonaan"},
        {label:"Kysy nimi",german:"Wie heißt du?",meaning:"Mikä sinun nimesi on? · kysymyksessä du heißt"},
      ],
    },
    {
      id:"book-grammar",phase:"Oppikirjan kielioppi",kind:"book",
      title:"Tutki C02:n kielioppi ja vertaa verbipareja",
      paragraphs:[
        "Avaa C02:n Kielioppi-sivu ja etsi taulukosta neljä muotoa: ich heiße, du heißt, ich bin ja du bist.",
        "Tarkista erityisesti heißen-verbin ß-kirjain ja sinämuodon -t. Vertaa sen jälkeen sein-verbin epäsäännöllisiä muotoja bin ja bist.",
        "Lue myös tekstin esimerkki Wie heißt du? Tässä tunnissa käsitellään vain minä- ja sinämuodot aktiivisesti, ei koko saksan verbintaivutusta.",
      ],
      bookLinks:[{label:"Avaa C02:n kielioppisivu",chapterId:"02",section:"grammar",instruction:"Vertaa kahta verbiparia sekä kysymysmuotoa Wie heißt du?."}],
      activityId:"grammar-reviewed",activityLabel:"Vertasin kirjan kieliopista neljää opittavaa muotoa",
    },
    {
      id:"guided-heissen",phase:"Ohjattu harjoittelu",kind:"question",
      title:"Valitse heißen-verbin oikea sinämuoto",
      paragraphs:[
        "Yritä käyttää opittua sääntöä. Muista, että heiße sopii ich-persoonaan ja heißt du-persoonaan.",
      ],
      question:{
        type:"choice",skillId:"L1-GRA-01",
        prompt:"Täydennä: Du ____ Mia. (heißen)",
        options:[
          {id:"a",label:"heiße",wrongFeedback:"Heiße kuuluu minämuotoon ich heiße."},
          {id:"b",label:"heißt"},
          {id:"c",label:"heißst",wrongFeedback:"Yleinen kirjoitusvirhe: oikea du-muoto on heißt, ei heißst."},
        ],
        correctOption:"b",success:"Oikein. Du heißt Mia. sisältää muodon heißt.",
        hint:"Kirjoita mielessäsi ensin ich heiße, sitten du heißt.",
        reteach:"Ich heiße, du heißt. Älä kirjoita ylimääräistä s-kirjainta muotoon du heißt.",
        genericWrong:"Vertaa opetustaulun heißen-paria.",
      },
    },
    {
      id:"workbook-heissen",phase:"Oppikirjan harjoittelu 1/2",kind:"book",
      title:"Täydennä oikeat heißen-muodot kirjaan",
      paragraphs:[
        "Avaa C02:n Harjoitukset-sivu. Tee tehtävät C02-EX-03 (Ich ____ Max.) ja C02-EX-04 (Du ____ Mia.) omiin vastauskenttiinsä.",
        "Kirjoita pelkkä puuttuva verbi. Tarkista tehtävien selitykset oman yrityksesi jälkeen kirjan Tarkista vastatut -toiminnolla.",
        "Näiden tehtävien vastaukset säilyvät samassa C02:n kirjatallennuksessa. Pelkkä linkin avaaminen tai Teacher-oppitunnin vastausten kopiointi ei luo kirjan tehtäväsuoritusta.",
      ],
      bookLinks:[{label:"Avaa C02:n harjoitukset 3 ja 4",chapterId:"02",section:"practice",instruction:"Kirjoita C02-EX-03 ja C02-EX-04 kirjaan ennen malliselitysten avaamista."}],
    },
    {
      id:"mistakes",phase:"Korjaava selitys",kind:"explanation",
      title:"Kolme virhettä, jotka kannattaa huomata ajoissa",
      paragraphs:[
        "Ensimmäinen: Du heiße Mia. olisi väärä, sillä heiße on minämuoto. Oikein on Du heißt Mia.",
        "Toinen: Du heißst Mia. sisältää ylimääräisen s-kirjaimen. Oikeassa muodossa ß:n jälkeen tulee t: heißt.",
        "Kolmas: Ich bist Mia. sekoittaa persoonan ja sein-verbin muodon. Oikein on Ich bin Mia. Vastaavasti Du bist Max.",
        "Jos virhe tulee, korjaa oma vastaus ja yritä toisella nimellä. Virhe on palautetta harjoittelun tarpeesta, ei syy väärentää osaamismerkintää.",
      ],
    },
    {
      id:"guided-sein",phase:"Ohjattu harjoittelu",kind:"question",
      title:"Mikä sein-verbin muoto sopii?",
      paragraphs:[
        "Sein on olla-verbi. Kokeile nyt erottaa sen muodot heißen-verbin muodoista.",
      ],
      question:{
        type:"choice",skillId:"L1-GRA-01",
        prompt:"Täydennä: Ich ____ Greta. (sein)",
        options:[
          {id:"a",label:"bist",wrongFeedback:"Bist kuuluu sinämuotoon du bist."},
          {id:"b",label:"bin"},
          {id:"c",label:"heiße",wrongFeedback:"Ich heiße Greta. olisi mahdollinen eri lause, mutta tehtävässä pyydetään sein-verbin muotoa."},
        ],
        correctOption:"b",success:"Oikein. Ich bin Greta. on sein-verbin minämuotoinen lause.",
        hint:"Sein: ich bin ja du bist.",
        reteach:"Sein-verbin muodoissa ich bin ja du bist ovat omat erilliset muodot.",
        genericWrong:"Varmista, että käytät juuri sein-verbin minämuotoa.",
      },
    },
    {
      id:"workbook-sein",phase:"Oppikirjan harjoittelu 2/2",kind:"book",
      title:"Täydennä sein-muodot ja tutki kaikki neljä perustelua",
      paragraphs:[
        "Palaa C02:n Harjoitukset-sivulle. Täydennä C02-EX-05 (Ich ____ Greta.) ja C02-EX-06 (Du ____ Max.).",
        "Kun olet vastannut tehtäviin 3–6, valitse kirjan Tarkista vastatut ja lue näiden neljän tehtävän perustelut. Jos jokin vastaus oli väärä, voit korjata vastauksesi ja yrittää vielä itse.",
        "Teacher tarkistaa neljän oikean kirjan tehtävän vastauskenttien täyttymisen. Erillinen vahvistus kertoo, että luit palautteen. Pelkkä vastauskentän täyttyminen ei todista, että kaikki vastaukset ovat oikein.",
      ],
      bookLinks:[{label:"Avaa C02:n harjoitukset 5 ja 6",chapterId:"02",section:"practice",instruction:"Täytä C02-EX-05 ja C02-EX-06. Vertaa sitten kaikkien neljän tehtävän perusteluja."}],
      activityId:"practice-reviewed",activityLabel:"Tarkistin itse harjoitusten 3–6 perustelut",
    },
    {
      id:"transfer",phase:"Itsenäinen soveltaminen",kind:"question",
      title:"Kirjoita sein-verbin sinämuotoinen lause muistista",
      paragraphs:[
        "Sulje mallit. Kirjoita koko lause saksaksi, kun puhut kuvitteelliselle Maxille. Jos tarvitset vihjettä, yritys on arvokasta harjoittelua mutta ei täysin itsenäinen ensimmäisen yrityksen näyttö.",
      ],
      question:{
        type:"text",skillId:"L1-GRA-01",evidenceRole:"independent",
        prompt:"Kirjoita saksaksi: Sinä olet Max. (sein-verbi)",
        accepted:["Du bist Max."],success:"Oikein. Du bist Max. käyttää sein-verbin du-muotoa.",
        hint:"Aloita Du ja käytä sanaa bist.",
        reteach:"Sein-verbin du-muoto on bist. Täydellinen lause on Du bist Max.",
        genericWrong:"Tarkista pronomini du, verbimuoto bist ja kuvitteellinen nimi Max.",
        wrongAnswers:{"du bin max":"Ich bin mutta du bist. Sinämuoto on bist.",
          "du heißt max":"Du heißt Max. kertoo nimeämisestä heißen-verbillä. Tässä pyydettiin olla-verbiä sein.",
          "du ist max":"Ist ei ole du-muoto. Du bist Max."},
      },
    },
    {
      id:"own-dialogue",phase:"Oma sovellus",kind:"activity",
      title:"Kokeile kahden henkilön esittäytymistä",
      paragraphs:[
        "Kuvittele Mia ja Max. Mia kysyy Wie heißt du?, Max vastaa Ich heiße Max. Sen jälkeen Mia voi sanoa Ich bin Mia.",
        "Rakenna itse pieni kolmen repliikin kohtaaminen vaihtamalla nimet tai pronominit. Voit sanoa sen hiljaa mielessäsi, ääneen tai kirjoittaa omaan paperiin. Äänitallennetta ei tehdä eikä ääntämistä pisteytetä.",
        "Vertaa lopuksi, että ich heiße ja ich bin ovat minämuotoja ja du heißt sekä du bist sinämuotoja. Tämä on oma harjoitteluvahvistus, ei automaattinen puhetaidon todistus.",
      ],
      activityId:"own-dialogue",activityLabel:"Kokeilin itse lyhyen esittäytymiskeskustelun",
    },
    {
      id:"exit",phase:"Lopputarkistus",kind:"question",
      title:"Erota kahden verbin oikeat parit",
      paragraphs:[
        "Lopuksi tarkistat ilman mallia sein-verbin kaksi muotoa kokonaisena parina. Oppitunnin suoritus ja pysyvä osaaminen ovat edelleen eri asioita.",
      ],
      question:{
        type:"choice",skillId:"L1-GRA-01",evidenceRole:"exit",
        prompt:"Mikä pari täydentää: Ich ___ Max. Du ___ Mia. (sein)",
        options:[
          {id:"a",label:"bist / bin",wrongFeedback:"Persoonat menivät ristiin. Ich tarvitsee bin ja du tarvitsee bist."},
          {id:"b",label:"bin / bist"},
          {id:"c",label:"heiße / heißt",wrongFeedback:"Tämä on heißen-verbin pari. Kysymys koskee olla-verbiä sein."},
        ],
        correctOption:"b",success:"Oikein. Ich bin Max. Du bist Mia.",
        hint:"Sein: ich bin, du bist.",
        reteach:"Lue muodot pareina: ich heiße / du heißt; ich bin / du bist. Tässä kysyttiin jälkimmäistä paria.",
        genericWrong:"Valitse olla-verbin minä- ja sinämuodot oikeassa järjestyksessä.",
      },
    },
    {
      id:"summary",phase:"Yhteenveto",kind:"summary",
      title:"Osaat erottaa neljä tärkeintä nimifraasin verbimuotoa",
      paragraphs:[
        "Opiskelit kahden verbin neljä muotoa: ich heiße, du heißt, ich bin ja du bist. Teit ohjattuja tarkistuksia ja yhden itsenäisen kirjoitusyrityksen.",
        "Oppitunnin läpikäynti edellyttää, että oikean C02-kirjan neljä harjoitusta C02-EX-03–06 ovat vastattuina. Lisäksi olet käynyt opetuksen vaiheet ja vahvistanut oman harjoittelusi. Pelkkä sivun avaaminen ei riitä.",
        "Kirjan vastaukset eivät ole sama asia kuin automaattisesti todennettu kielitaito. Jos jokin neljästä tehtävästä on väärin, tehtävän oma selitys auttaa kertaamaan ennen seuraavaa tuntia.",
        "Seuraavassa oppitunnissa L010 tarkastelet Thomasin ja Takashin esittäytymiskeskustelua tekstin ja mahdollisen alkuperäisen äänen avulla.",
      ],
    },
  ],
};
