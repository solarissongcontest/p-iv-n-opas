import { getLosOpenDialogue } from "../content/los1OpenDialogues.ts";
import type { TeacherLesson } from "./engine.ts";
const original = getLosOpenDialogue("04");
if (!original || original.sourceId !== "M-WB-06" || original.originalLines.length !== 8) throw new Error("C04 must retain its complete eight-turn M-WB-06 source");
/** The authored German source comes from the book registry; the teacher does not rewrite it. */
export const LOS1_L018_TEACHER: TeacherLesson = {
  "id": "L018",
  "bookId": 1,
  "chapterId": "04",
  "version": "2.0.0-preview.1",
  "title": "Lue kohtelias alkuperäiskeskustelu",
  "objective": "Luen kaikki kahdeksan Herr Schmidt–Herr Standish -puheenvuoroa, erotan kohteliaan vointikysymyksen ja löydän syyn Schmidtin väsymykselle.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "eight-turns-reviewed"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [
    "C04-SOURCE-Q01",
    "C04-SOURCE-Q02",
    "C04-SOURCE-Q03"
  ],
  "scenes": [
    {
      "id": "welcome",
      "phase": "Aloitus",
      "kind": "introduction",
      "title": "Kahden liikemiehen alkuperäinen kohtaaminen",
      "paragraphs": [
        "C04:n Text A on Wikibooksin M-WB-06, Gespräch 2-2 ~ Die Geschäftsmänner, revision 3823654. Herr Schmidt ja Herr Standish vaihtavat kahdeksan puheenvuoroa. Alkuperäinen saksankielinen keskustelu luetaan kokonaan LOS!:n sisällä.",
        "L017:ssa opit, että du ja Sie valitaan tilanteen mukaan. Nyt tutkit, miten muodollinen puhuttelu ja hyvästely esiintyvät yhdessä aidossa julkaistussa dialogissa.",
        "Keskustelussa on opetusjärjestyksessä vaikeita ilmauksia, kuten Ich habe so viel Arbeit. ja Das kann ich verstehen. Niitä autetaan ymmärtämään, mutta niiden kielioppia ei vaadita tuottamaan."
      ]
    },
    {
      "id": "recall",
      "phase": "Muistelu",
      "kind": "question",
      "title": "Miten kohtelias puhuttelu kirjoitetaan?",
      "paragraphs": [
        "Aloita L017:n tärkeimmästä havainnosta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "prompt": "Mikä kirjoitusasu tarkoittaa saksan kohteliasta Te-puhuttelua keskellä lausetta?",
        "options": [
          {
            "id": "a",
            "label": "sie",
            "wrongFeedback": "Pienellä aloitettu sie ei ole kohtelias puhuttelu keskellä lausetta."
          },
          {
            "id": "b",
            "label": "Sie"
          },
          {
            "id": "c",
            "label": "du",
            "wrongFeedback": "Du on tuttavallinen sinä."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Kohtelias Sie kirjoitetaan isolla.",
        "hint": "Muista iso alkukirjain.",
        "reteach": "Sie isolla alkukirjaimella on kohtelias puhuttelu; sie pienellä voi tarkoittaa hän tai he.",
        "genericWrong": "Palaa puhujan vuoroon ja etsi saksankieliset avainsanat. Sano sitten, mikä vaihtoehto kuvaa niitä."
      }
    },
    {
      "id": "context",
      "phase": "Opettajan selitys",
      "kind": "explanation",
      "title": "Ketkä puhuvat ja miten keskustelu etenee?",
      "paragraphs": [
        "Herr tarkoittaa tässä herraa, ja sitä käytetään sukunimen edellä. Herr Schmidt tervehtii Herr Standishia ja kysyy tämän vointia: Wie geht es Ihnen?",
        "Herr Standish vastaa kohteliaasti Danke sehr, es geht mir gut. Und Ihnen? eli kiitos, minulle kuuluu hyvää, entä teille. Sana Ihnen on kohteliaan kysymyksen osa, jonka opit tässä kokonaisena fraasina.",
        "Herr Schmidt puolestaan kertoo voivansa huonommin, olevansa väsynyt ja että hänellä on paljon töitä. Mitä seuraa, on lyhyt ymmärtävä vastaus. Kummankaan ei tarvitse vielä osata muodostaa habe- tai kann-muotoa.",
        "Lopuksi Schmidt sanoo Auf Wiedersehen, Herr Standish! ja Standish vastaa Auf Wiedersehen, bis morgen. Näkemiin ja huomiseen on eri tehtävä kuin keskustelun alun tervehdys."
      ],
      "help": [
        {
          "title": "Selitä yksinkertaisemmin",
          "body": "Ensimmäinen mies kysyy kuulumisia kohteliaasti. Toinen voi hyvin, ensimmäinen on väsynyt töistä. Lopuksi he hyvästelevät."
        },
        {
          "title": "Miksi tekstissä on liian vaikeita lauseita?",
          "body": "Tämä on alkuperäinen julkaistu tekstikohtaus. Se säilyy kokonaisena. Tässä oppitunnissa vaikeammat rakenteet selitetään merkitykseltään, mutta niitä ei testata aktiivisena kielioppina."
        },
        {
          "title": "Mitä tarkoittaa Ihnen?",
          "body": "Wie geht es Ihnen? tarkoittaa Mitä Teille kuuluu? Opettelemme nyt koko ilmauksen, emme pronominien sijataivutusta."
        }
      ]
    },
    {
      "id": "original",
      "phase": "Lähdeteksti kokonaisena",
      "kind": "board",
      "title": "Alkuperäiset kahdeksan puheenvuoroa",
      "paragraphs": [
        "Opetustaulu näyttää kaikki kahdeksan alkuperäistä repliikkiä ja kirjan toimitukselliset suomenkieliset merkitystuet samasta lähdeaineistosta. Tekstiä ei keksitä eikä kopioida toiseen, poikkeavaan vastausvarastoon.",
        "Lue ensin saksankielinen repliikki. Paljasta suomennos vasta, kun olet yrittänyt päätellä sisällön. Seuraa erityisesti kohteliasta vointikysymystä ja lopun hyvästelyä."
      ],
      "board": original.originalLines.map((line, i) => ({label: `${i+1} · ${line.speaker}`,german:line.text,meaning:line.meaning}))
    },
    {
      "id": "phrase",
      "phase": "Tunnista fraasit",
      "kind": "explanation",
      "title": "Ihnen, müde ja Auf Wiedersehen",
      "paragraphs": [
        "Wie geht es Ihnen? on kohtelias kuulumiskysymys. Se tarkoittaa Mitä Teille kuuluu? Sitä ei tarvitse vielä purkaa kieliopillisesti sanoiksi.",
        "Ich bin müde. tarkoittaa Olen väsynyt. Tässä opit vain fraasin merkityksen. Ich habe so viel Arbeit. selittää, että Schmidtillä on paljon töitä. Henkilön väsymys ei johdu siitä, että hän olisi unohtanut nimet.",
        "Auf Wiedersehen! on tuttu kohtelias hyvästely. Bis morgen tarkoittaa huomiseen. Se ei ole puhelinnumero eikä erillinen uusi keskustelutilanne.",
        "Wie bitte? on tarkennuspyyntö: anteeksi mitä? Sen huomaat, kun Standish hämmästyy sanasta müde."
      ]
    },
    {
      "id": "guided",
      "phase": "Ohjattu ymmärtäminen",
      "kind": "question",
      "title": "Miksi Schmidt on väsynyt?",
      "paragraphs": [
        "Lue alkuperäisen tekstin viides repliikki ja käytä opettajan suomenkielistä apua."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "prompt": "Miksi Herr Schmidt ei voi kovin hyvin?",
        "options": [
          {
            "id": "a",
            "label": "Hänellä on paljon töitä."
          },
          {
            "id": "b",
            "label": "Hän odottaa junaa.",
            "wrongFeedback": "Tekstissä ei puhuta junasta."
          },
          {
            "id": "c",
            "label": "Hän ei muista Herr Standishin nimeä.",
            "wrongFeedback": "Molemmat käyttävät toistensa sukunimiä."
          }
        ],
        "correctOption": "a",
        "success": "Oikein. Ich habe so viel Arbeit. kertoo työmäärästä.",
        "hint": "Etsi Arbeit = työ.",
        "reteach": "Schmidt sanoo Ich bin müde. ja selittää Ich habe so viel Arbeit.",
        "genericWrong": "Palaa puhujan vuoroon ja etsi saksankieliset avainsanat. Sano sitten, mikä vaihtoehto kuvaa niitä."
      }
    },
    {
      "id": "book",
      "phase": "Oppikirja ja alkuperäistehtävät",
      "kind": "book",
      "title": "Lue koko Text A ja tarkista lähdetehtävät",
      "paragraphs": [
        "Avaa C04:n Text A kirjassa ja lue kaikki kahdeksan vuoroa yhtenä keskusteluna. Lähteen tarkka versio, tekijät ja lisenssi ovat kirjassa.",
        "Siirry C04:n Ymmärrä-osioon. Vastaa tehtäviin C04-SOURCE-Q01, Q02 ja Q03 sekä paina kunkin tarkistusta. Opettajan tunti hyväksyy vain oikeassa kirjassa vastatut ja tarkistetut tehtävät. Pelkkä lukijan avaaminen ei merkitse ymmärtämistä."
      ],
      "bookLinks": [
        {
          "label": "C04 · Text A, M-WB-06",
          "chapterId": "04",
          "section": "text",
          "instruction": "Lue koko alkuperäinen kahdeksan vuoron keskustelu."
        },
        {
          "label": "C04 · Ymmärrä",
          "chapterId": "04",
          "section": "understand",
          "instruction": "Vastaa ja tarkista C04-SOURCE-Q01–Q03."
        }
      ],
      "activityId": "eight-turns-reviewed",
      "activityLabel": "Luin kaikki kahdeksan alkuperäistä puheenvuoroa"
    },
    {
      "id": "independent",
      "phase": "Itsenäinen ymmärtäminen",
      "kind": "question",
      "title": "Muista kuka sanoo mitä",
      "paragraphs": [
        "Peitä tekstin suomenkielinen tuki ennen vastausta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "evidenceRole": "independent",
        "prompt": "Kumpi sanoo Nicht so gut. Ich bin müde.?",
        "options": [
          {
            "id": "a",
            "label": "Herr Standish",
            "wrongFeedback": "Standish sanoo, että hänelle kuuluu hyvää."
          },
          {
            "id": "b",
            "label": "Herr Schmidt"
          },
          {
            "id": "c",
            "label": "Molemmat yhtä aikaa",
            "wrongFeedback": "Kyseessä on Schmidtin oma vuoro."
          }
        ],
        "correctOption": "b",
        "success": "Oikein. Schmidt kertoo olevansa väsynyt.",
        "hint": "Kertaa kolmannen repliikin puhujan nimi.",
        "reteach": "Herr Schmidt sanoo Nicht so gut. Ich bin müde.",
        "genericWrong": "Palaa puhujan vuoroon ja etsi saksankieliset avainsanat. Sano sitten, mikä vaihtoehto kuvaa niitä."
      }
    },
    {
      "id": "application",
      "phase": "Soveltaminen",
      "kind": "question",
      "title": "Tunnista kohtelias fraasi uudessa tilanteessa",
      "paragraphs": [
        "Kuvittele kohtelias keskustelu kirjaston asiakaspalvelijan kanssa. Haluat kysyä kuulumisia."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-INT-04",
        "evidenceRole": "application",
        "prompt": "Mikä fraasi sopii kohteliaaksi kuulumiskysymykseksi?",
        "options": [
          {
            "id": "a",
            "label": "Wie geht es Ihnen?"
          },
          {
            "id": "b",
            "label": "Woher kommst du?",
            "wrongFeedback": "Tämä kysyy tuttavalta alkuperää."
          },
          {
            "id": "c",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä kysyy tutun nimeä."
          }
        ],
        "correctOption": "a",
        "success": "Kyllä. Wie geht es Ihnen? on kohtelias fraasi.",
        "hint": "Lähdetekstin alussa on tähän sopiva kysymys.",
        "reteach": "Opettele kokonaisena Wie geht es Ihnen?; sijamuotoja ei vielä johdeta.",
        "genericWrong": "Palaa puhujan vuoroon ja etsi saksankieliset avainsanat. Sano sitten, mikä vaihtoehto kuvaa niitä."
      }
    },
    {
      "id": "exit",
      "phase": "Lopputarkistus",
      "kind": "question",
      "title": "Miten keskustelu päättyy?",
      "paragraphs": [
        "Viimeinen puheenvuoro ei ole enää kuulumiskysymys."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-01",
        "evidenceRole": "exit",
        "prompt": "Mikä on Herr Standishin viimeisen puheenvuoron merkitys?",
        "options": [
          {
            "id": "a",
            "label": "Hyvää yötä, nähdään ensi viikolla.",
            "wrongFeedback": "Alkuperäisessä repliikissä ei toivoteta hyvää yötä."
          },
          {
            "id": "b",
            "label": "Näkemiin, huomiseen."
          },
          {
            "id": "c",
            "label": "Hei, mikä sinun nimesi on?",
            "wrongFeedback": "Keskustelu on päättymässä."
          }
        ],
        "correctOption": "b",
        "success": "Kyllä. Auf Wiedersehen, bis morgen. = Näkemiin, huomiseen.",
        "hint": "Bis morgen kertoo, milloin tavataan seuraavan kerran.",
        "reteach": "Keskustelu päättyy Auf Wiedersehen, bis morgen.",
        "genericWrong": "Palaa puhujan vuoroon ja etsi saksankieliset avainsanat. Sano sitten, mikä vaihtoehto kuvaa niitä."
      }
    },
    {
      "id": "summary",
      "phase": "Yhteenveto",
      "kind": "summary",
      "title": "Luit alkuperäisen muodollisen keskustelun",
      "paragraphs": [
        "Luit M-WB-06:n kaikki kahdeksan vuoroa ja tunnistit, miten saksassa kysytään vointia kohteliaasti sekä miksi Schmidt on väsynyt.",
        "C04-SOURCE-Q01–Q03 on vastattava ja tarkistettava oikeassa kirjassa. L019:ssa opit muodostamaan kohteliaan Sie-kysymyksen itse, mutta habe- ja kann-muodot jäävät vielä vain tekstin ymmärtämiseksi."
      ]
    }
  ]
};
