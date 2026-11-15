import {test} from "node:test";
import assert from "node:assert/strict";
import {LOS_FUTURE_EXERCISES} from "../src/features/los/content/losFutureExercises.ts";
import {LOS_FUTURE_MANUSCRIPTS} from "../src/features/los/content/losFutureManuscripts.ts";

/** Text A-specific editorial corrections from 14 November 2026.
 * Older T02 questions referred to people found only in separate support
 * dialogues rather than the Text A that this exercise asks the learner to read.
 * Lock these corrected prompt/model pairs against stale manuscript reimports.
 * This is NOT an independent German-language or didactics approval. */
const EXPECTED: Record<number, Record<string, [string,string]>> = {
  "2": {
    "10": [
      "Mitä Mira tekee sunnuntaina?",
      "Hän jää kotiin, lukee ja soittaa perheelleen."
    ],
    "01": [
      "Missä Mira tapaa Jonaksen?",
      "Saksan kurssilla Bonnissa."
    ],
    "02": [
      "Kuinka monta sisarusta Lenalla on?",
      "Kaksi: pikkuveli Max ja isosisko Emma."
    ],
    "03": [
      "Mitä kodinkoneita Nicon keittiössä on?",
      "Jääkaappi ja liesi. Astianpesukonetta hänellä ei ole."
    ],
    "04": [
      "Minkä värisen tuolin Anna haluaa ostaa?",
      "Sinisen."
    ],
    "05": [
      "Mihin aikaan Paul lähtee bussilla kouluun?",
      "Kahdeksalta."
    ],
    "06": [
      "Mitä Greta syö mieluummin kuin pastaa?",
      "Pizzaa."
    ],
    "07": [
      "Mitä Mara ja Finn tilaavat kahvilassa?",
      "Mara tilaa teetä ja kakkua, Finn kahvia ja täytetyn sämpylän."
    ],
    "08": [
      "Minkä ostoslistalla olleen tuotteen Sofia unohtaa?",
      "Juuston."
    ],
    "09": [
      "Mihin Tom kysyy kulkuohjeita?",
      "Kirjastoon."
    ]
  },
  "3": {
    "10": [
      "Mihin luokka lopulta päättää lähteä retkelle?",
      "Järvelle."
    ],
    "01": [
      "Missä neljä ystävää lopulta tapaavat?",
      "Puistossa."
    ],
    "02": [
      "Mitä soitinta Noah harjoittelee?",
      "Kitaraa."
    ],
    "03": [
      "Mitä Jule osaa tehdä hyvin?",
      "Uida."
    ],
    "04": [
      "Millaisen elokuvan Sara ja Ben valitsevat?",
      "Matkasta kertovan elokuvan."
    ],
    "05": [
      "Miten Leonie ehdottaa yhteistä kokeeseen valmistautumista?",
      "Harjoittelemalla yhdessä verkossa illalla."
    ],
    "06": [
      "Milloin Paulilla on saksaa?",
      "Tiistaina kello kymmenen."
    ],
    "07": [
      "Mitä Jana tekee ennen kotiin menemistä?",
      "Hän hakee sisarensa."
    ],
    "08": [
      "Miksi ystävät muuttavat tapaamissuunnitelmaansa?",
      "Koska alkaa sataa."
    ],
    "09": [
      "Millä Emma ja Jonas matkustavat Dresdeniin?",
      "Junalla."
    ]
  },
  "4": {
    "10": [
      "Mitkä kolme kaupunkia Leo esittelee?",
      "Berliinin, Wienin ja Baselin."
    ],
    "01": [
      "Mainitse kaksi maata, joissa puhutaan saksaa.",
      "Esimerkiksi Saksa ja Itävalta. Myös Sveitsi ja Liechtenstein käyvät."
    ],
    "02": [
      "Missä kaupungissa Lena vierailee?",
      "Berliinissä."
    ],
    "03": [
      "Mistä kaupungista Timo lähettää postikortin?",
      "Wienistä."
    ],
    "04": [
      "Miksi Sveitsissä ei puhuta vain yhtä kieltä?",
      "Sveitsissä on useita kansalliskieliä."
    ],
    "05": [
      "Mitkä kaksi Suomen kansalliskieltä Sofia mainitsee?",
      "Suomen ja ruotsin."
    ],
    "06": [
      "Miten Davidin perhe viettää usein sunnuntaita?",
      "Tekemällä retken."
    ],
    "07": [
      "Millä Tom matkusti Hampuriin?",
      "Junalla."
    ],
    "08": [
      "Ovatko kaikkien Saksassa asuvien perinteet samanlaisia?",
      "Eivät."
    ],
    "09": [
      "Millä toisessa matkaraportissa mainittu henkilö kulkee yleensä?",
      "Bussilla."
    ]
  },
  "5": {
    "10": [
      "Mitä Ben suosittelee pitkän opiskelun jälkeen?",
      "Kävelylenkkiä."
    ],
    "01": [
      "Miksi Mila on hermostunut?",
      "Hänellä on huomenna koe."
    ],
    "02": [
      "Mihin Jonasta sattuu juoksemisen jälkeen?",
      "Jalkaan ja erityisesti polveen."
    ],
    "03": [
      "Mitä oireita Lenalla on?",
      "Kurkkukipua ja yskää."
    ],
    "04": [
      "Miksi Emma haluaa valmistaa ruokaa itse?",
      "Hän haluaa päättää itse, mitä ruoassa on."
    ],
    "05": [
      "Mitä Nora muuttaa iltatottumuksissaan viikon kokeilun ajaksi?",
      "Hän laittaa puhelimen pois ennen nukkumaanmenoa."
    ],
    "06": [
      "Millä David kulkee useammin kouluun?",
      "Polkupyörällä."
    ],
    "07": [
      "Mikä auttaa Lisaa vähentämään stressiä?",
      "Tehtävien jakaminen pieniin vaiheisiin."
    ],
    "08": [
      "Mitä Paul oppi kahdeksanvuotiaana?",
      "Pyöräilemään."
    ],
    "09": [
      "Miten Emman isoäiti sopi tapaamisia nuoruudessaan?",
      "Usein kasvotusten."
    ]
  },
  "6": {
    "10": [
      "Mikä on Mian kulttuuriprojektin aihe?",
      "Musiikki hänen omassa kaupungissaan."
    ],
    "01": [
      "Mitä Sara mainitsee esimerkkeinä kulttuurista?",
      "Ruoan ja juhlat."
    ],
    "02": [
      "Mitä kahta musiikkityyliä Nina kuuntelee?",
      "Poppia ja jazzia."
    ],
    "03": [
      "Minkä kadonneen tavaran Benin lukeman tarinan henkilö löytää?",
      "Reppunsa."
    ],
    "04": [
      "Miten Lian mielestä sarjan tarina muuttuu?",
      "Se muuttuu myöhemmin jännittävämmäksi."
    ],
    "05": [
      "Mitä Mia huomaa maalauksessa?",
      "Pienen koiran maalauksen kulmassa."
    ],
    "06": [
      "Mitä kahta rautatieasemaa esittävää kuvaa ryhmä vertaa?",
      "Vanhaa valokuvaa ja nykyistä kuvaa."
    ],
    "07": [
      "Miksi Amir piti kulttuurijuhlan musiikista?",
      "Se oli monipuolista."
    ],
    "08": [
      "Missä kaupungissa Lea viettää viikonlopun?",
      "Hampurissa."
    ],
    "09": [
      "Mitä opettaja pyytää tarkistamaan käytetyistä teksteistä?",
      "Kirjoittajan ja julkaisuajankohdan."
    ]
  },
  "7": {
    "10": [
      "Mitä Karim harkitsee tekevänsä koulun jälkeen?",
      "Ammatillisen koulutuksen aloittamista."
    ],
    "01": [
      "Missä asiassa Lina on hyvä?",
      "Järjestämisessä."
    ],
    "02": [
      "Miksi Sofia pitää biologiasta?",
      "Koska siinä tehdään kokeita."
    ],
    "03": [
      "Miten Tom jaksottaa kokeeseen lukemistaan?",
      "Hän opiskelee päivittäin pienen aiheen ja kertaa vanhoja tehtäviä."
    ],
    "04": [
      "Mitä Paul haluaisi tehdä ennen mahdollisia jatko-opintoja?",
      "Harjoittelun."
    ],
    "05": [
      "Mihin työpaikkaan Mia tutustuu projektiviikolla?",
      "Kirjastoon."
    ],
    "06": [
      "Milloin kahvilan kesätyöntekijän pitää olla käytettävissä?",
      "Viikonloppuisin."
    ],
    "07": [
      "Mitä Nora tarkistaa ennen hakemusviestin lähettämistä?",
      "Yrityksen nimen ja omat yhteystietonsa."
    ],
    "08": [
      "Mitä Paul sanoo, kun hän ei ymmärrä haastattelukysymystä?",
      "Hän pyytää kysymyksen toistamista kohteliaasti."
    ],
    "09": [
      "Missä Mia on harjoittelussa?",
      "Kirjakaupassa."
    ]
  },
  "8": {
    "10": [
      "Mikä on Leon lopputyön aihe?",
      "Koulumatka."
    ],
    "01": [
      "Mitä Mira tekee, jos uutisen päivämäärä puuttuu?",
      "Hän etsii lisätietoja viralliselta sivulta."
    ],
    "02": [
      "Mitä Paul tekee aamuisin puhelimellaan?",
      "Lukee uutisia."
    ],
    "03": [
      "Miksi kahta samasta tapahtumasta kirjoitettua otsikkoa voi tulkita eri tavoin?",
      "Koska niiden sanavalinnat ovat erilaiset."
    ],
    "04": [
      "Mikä puistoa koskeva väite on mielipide?",
      "Väite, että puisto on kaupungin kaunein."
    ],
    "05": [
      "Miksi Lina ei jaa somessa näkemäänsä väitettä?",
      "Väitteen lähdettä ja alkuperäistä julkaisua ei löydy."
    ],
    "06": [
      "Mitä koulu yrittää vähentää?",
      "Jätteen määrää."
    ],
    "07": [
      "Millä tavoin Emman isoisä piti aiemmin yhteyttä ystäviinsä?",
      "Lankapuhelimella ja kirjeillä."
    ],
    "08": [
      "Mitä Ben toivoo nuorten yhteiseen tilaan?",
      "Rauhallista opiskelutilaa."
    ],
    "09": [
      "Mihin ensimmäinen kahdesta tapahtuma-artikkelista keskittyy?",
      "Tapahtumaan osallistuneiden ihmisten määrään."
    ]
  }
};

test("all 70 later-book T02 reading checks have their corrected Text A question and model",()=>{
  let count=0;
  for(let bookId=2;bookId<=8;bookId++){
    for(let i=1;i<=10;i++){
      const chapterId=String(i).padStart(2,"0");
      const text=LOS_FUTURE_MANUSCRIPTS[bookId]?.[chapterId]?.textA;
      assert.ok(text && text.length>100,`Missing Text A ${bookId}/${chapterId}`);
      const expected=EXPECTED[bookId]?.[chapterId];
      assert.ok(expected,`Missing editorial pair ${bookId}/${chapterId}`);
      const tasks=LOS_FUTURE_EXERCISES[bookId]?.[chapterId]??[];
      const matches=tasks.filter(task=>task.id===`LOS${bookId}-C${chapterId}-T02`);
      assert.equal(matches.length,1,`Expected exactly one T02 ${bookId}/${chapterId}`);
      const task=matches[0]!;
      assert.equal(task.title,"Tekstin tarkka ydinkysymys");
      assert.equal(task.prompt,expected[0]);
      assert.equal(task.answerKey,expected[1]);
      assert.equal(task.group,"T");
      assert.ok(task.prompt.endsWith("?")||task.prompt.endsWith("."));
      assert.ok(task.answerKey.length>=4);
      count++;
    }
  }
  assert.equal(count,70);
});
