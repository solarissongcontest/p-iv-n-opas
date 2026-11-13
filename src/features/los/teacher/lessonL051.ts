import type { TeacherLesson } from "./engine.ts";
/** C10 L051: original COERLL Harald 14-line reading, no phone-number or unverified audio assessment. */
export const LOS1_L051_TEACHER: TeacherLesson = {
  "id": "L051",
  "bookId": 1,
  "chapterId": "10",
  "version": "2.0.0-preview.1",
  "title": "Kokoa esittelyfraasit",
  "objective": "Kertaan nimen, alkuperän, iän ja kohteliaan puhuttelun ja tarkistan kaksi oikeaa Haraldin alkuperäishaastattelun kysymystä.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredPracticeIds": [
    "C10-EX-01",
    "C10-EX-02",
    "C10-EX-03"
  ],
  "requiredCheckedIds": [
    "C10-HARALD-Q01",
    "C10-HARALD-Q02"
  ],
  "requiredActivityIds": [
    "c10-teacher-L051"
  ],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Aloitus",
      "title": "Kaikki aikaisemmat fraasit kohtaavat",
      "paragraphs": [
        "C10 on LOS! 1:n viimeinen varsinainen kappale. Tavoitteena on kohdata toinen ihminen: tervehtiä, kysyä nimi ja alkuperä, kertoa yksinkertainen perustieto ja päättää keskustelu.",
        "Harjoittelet ensin kirjan omia alkuosan kertauskysymyksiä C10-EX-01–03. Luet sitten Haraldin oikean neljäntoista repliikin Wer bin ich? -haastattelun ensimmäiset perustiedot.",
        "Älä käytä omaa oikeaa puhelinnumeroasi tai pyri muistamaan haastattelussa sanottua lukusarjaa. Se on lähteen sisältöä, ei harjoituksen vaatimus."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Muistelu",
      "title": "Mikä fraasi kertoo nimen?",
      "paragraphs": [
        "Muista C02:ssa käytetty tapa esittäytyä. Kuvitteellisen henkilön nimi on Mia."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "practice",
        "prompt": "Mikä vastaa ilmaukseen Minun nimeni on Mia?",
        "options": [
          {
            "id": "a",
            "label": "Ich heiße Mia."
          },
          {
            "id": "b",
            "label": "Ich bist Mia.",
            "wrongFeedback": "Ich-pronominin kanssa käytetään esimerkiksi heiße tai bin, ei bist."
          },
          {
            "id": "c",
            "label": "Wie alt bist du?",
            "wrongFeedback": "Tämä kysyy ikää."
          }
        ],
        "correctOption": "a",
        "success": "Ich heiße Mia. on oikein.",
        "hint": "Aloita Ich heiße.",
        "reteach": "Ich heiße Mia. on oikein. Aloita Ich heiße.",
        "genericWrong": "Tarkista puhujan tilanne ja muoto. Aloita Ich heiße."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opetus",
      "title": "Neljä perusasiaa yhdessä kohtaamisessa",
      "paragraphs": [
        "Tervehdys voi olla Hallo! tuttujen nuorten välillä tai Guten Tag! kohteliaassa kohtaamisessa.",
        "Esittele itsesi sanomalla Ich heiße Mia. Kysy tuttavan nimeä Wie heißt du? tai kohteliaasti Wie heißen Sie?.",
        "Kerro alkuperäsi valmiilla lauseella Ich komme aus Finnland. Kysy toiselta Woher kommst du? tai Woher kommen Sie?.",
        "Ikä kysytään tutulta Wie alt bist du? ja vastataan Ich bin siebzehn Jahre alt. Harjoittelussa käytetään vain keksittyjä ihmisiä ja ikiä.",
        "Kolmannen henkilön esitteleminen alkaa Das ist Mia. Sen täydet er/sie-verbimuodot opetetaan L053:ssa. Nyt riittää, että tunnistat tuttuja lauseita.",
        "Kohteliaan Sie-pronominin ja naisesta käytettävän sie-pronominin erot ovat tärkeitä. Älä päättele pelkästään isosta kirjaimesta jokaista virkettä, vaan seuraa myös verbimuotoa ja kontekstia."
      ],
      "help": [
        {
          "title": "Miksi du ja Sie eroavat?",
          "body": "Du on tuttavallinen sinä. Sie on kohtelias teitittely. Kysymykset ovat Wie heißt du? ja Wie heißen Sie?."
        },
        {
          "title": "Miten sanon mistä olen?",
          "body": "Ich komme aus Finnland. Kysymys on Woher kommst du? tai kohteliaasti Woher kommen Sie?."
        },
        {
          "title": "Mikä on kolmas henkilö?",
          "body": "Henkilö, josta puhut: er = hän (mies), sie = hän (nainen). Das ist Mia. on helppo aloitus."
        },
        {
          "title": "Miksi en opettele haastattelun puhelinnumeroa?",
          "body": "Alkuperäislähde sisältää julkisen lukusarjan. Se ei ole opiskelijan henkilö- tai yhteystietotehtävä eikä kuulu muistettaviin perustietoihin."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetustaulu",
      "title": "Kohtaamisen kuusi perusaskelta",
      "paragraphs": [
        "Käy fraasit läpi järjestyksessä. Kuvitteellinen puhuja käyttää eri fraasia nuoren ja opettajan kanssa."
      ],
      "board": [
        {
          "label": "Aloita",
          "german": "Hallo! · Guten Tag!",
          "meaning": "Tuttavallinen ja kohtelias tervehdys."
        },
        {
          "label": "Kerro nimesi",
          "german": "Ich heiße Mia.",
          "meaning": "Minun nimeni on Mia."
        },
        {
          "label": "Kysy nimeä",
          "german": "Wie heißt du? · Wie heißen Sie?",
          "meaning": "Tuttava ja kohtelias henkilö."
        },
        {
          "label": "Kerro alkuperä",
          "german": "Ich komme aus Finnland.",
          "meaning": "Olen Suomesta."
        },
        {
          "label": "Kysy alkuperä",
          "german": "Woher kommst du? · Woher kommen Sie?",
          "meaning": "Mistä olet kotoisin?"
        },
        {
          "label": "Lopeta",
          "german": "Schön, dich kennenzulernen! · Auf Wiedersehen!",
          "meaning": "Hauska tutustua; näkemiin."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Ohjattu harjoitus",
      "title": "Kysy opettajan nimeä kohteliaasti",
      "paragraphs": [
        "Kyse on saksankielisestä opettajasta, jota puhutellaan Sie-muodolla."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "practice",
        "prompt": "Mikä kysymys on oikein?",
        "options": [
          {
            "id": "a",
            "label": "Wie heißt du?",
            "wrongFeedback": "Tämä on tuttavallinen kysymys."
          },
          {
            "id": "b",
            "label": "Wie heißen Sie?"
          },
          {
            "id": "c",
            "label": "Wie bist Sie?",
            "wrongFeedback": "Tämä ei ole oikea nimen kysymisen fraasi."
          }
        ],
        "correctOption": "b",
        "success": "Wie heißen Sie? on kohtelias kysymys.",
        "hint": "Sie kuuluu heißen-muodon kanssa.",
        "reteach": "Wie heißen Sie? on kohtelias kysymys. Sie kuuluu heißen-muodon kanssa.",
        "genericWrong": "Tarkista puhujan tilanne ja muoto. Sie kuuluu heißen-muodon kanssa."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "phase": "Alkuperäisteksti",
      "title": "Tutustu Haraldin koko alkuperäishaastatteluun",
      "paragraphs": [
        "Avaa C10:n Text A. Siellä on kokonaisuudessaan 14 alkuperäistä haastattelijan ja Haraldin puheenvuoroa. Ensimmäisissä kysytään nimeä ja kotipaikkaa, myöhemmin ikää ja lempiväriä.",
        "Haastattelun lähde on COERLL/Deutsch im Blick M-DIB-02. Litteraatti on julkaistu kirjan sisällä, mutta alkuperäisen äänen ja videon oikeus- ja laitetestaus ei ole valmis.",
        "Kirjan glossit auttavat sellaisten vaikeiden sanojen kuin ursprünglich ja zivilisierten ymmärtämisessä. Niitä ei tarvitse vielä käyttää omissa lauseissa."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "text",
          "label": "C10 · Harald, 14 repliikin koko Text A",
          "instruction": "Lue ainakin nimen, alkuperän ja iän kysymykset."
        }
      ]
    },
    {
      "id": "checked",
      "kind": "book",
      "phase": "Luetun ymmärtäminen",
      "title": "Tarkista kaksi oikeaa Haraldin esikysymystä",
      "paragraphs": [
        "Kirjan Ymmärrä-sivulla tehtävä C10-HARALD-Q01 kysyy mistä Harald sanoo olevansa alun perin. Tehtävä Q02 kysyy hänen likimääräistä ikäänsä.",
        "Vastaa molempiin ja paina kummankin Tarkista vastaus. Harald sanoo München ja so um die fünfzig, mutta sinun kannattaa valita vastaus vasta oman lukuyrityksen jälkeen.",
        "Nämä ovat luetun ymmärtämisen tehtäviä. Niiden tarkistus ei tarkoita, että ääni tai video olisi toistettu."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "understand",
          "label": "C10 · Harald Q01 ja Q02",
          "instruction": "Vastaa ja tarkista kaksi oikeaa tekstikysymystä."
        }
      ]
    },
    {
      "id": "practice",
      "kind": "book",
      "phase": "Harjoittelu kirjassa",
      "title": "Tee kolme oikeaa kertauskysymystä",
      "paragraphs": [
        "Tee C10-EX-01 (Hallo!), EX-02 (Guten Tag!) ja EX-03 (Ich heiße Mia) kirjan Harjoittele-sivulla.",
        "EX-03 on oikea täydennystehtävä. Kirjoita puuttuva heiße itse ja tarkista vasta sitten. Tallennettu yritys riittää tuntimerkintään, eikä opettaja tee erillistä koetta."
      ],
      "bookLinks": [
        {
          "chapterId": "10",
          "section": "practice",
          "label": "C10 · Harjoittele 01–03",
          "instruction": "Tallenna kolme oikeaa alkuosan kertausvastausta."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Itsenäinen harjoitus",
      "title": "Kirjoita nimi-ilmaus muistista",
      "paragraphs": [
        "Peitä opettajan malli. Kirjoita kuvitteellisen Mia-henkilön esittely."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-MEET-10",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Nimeni on Mia.",
        "accepted": [
          "Ich heiße Mia.",
          "Ich heiße Mia"
        ],
        "success": "Ich heiße Mia. on oikein.",
        "hint": "Muista heiße ja sen ß.",
        "reteach": "Ich heiße Mia. on oikein. Muista heiße ja sen ß.",
        "genericWrong": "Tarkista sanajärjestys ja persoonamuoto. Muista heiße ja sen ß.",
        "wrongAnswers": {
          "ich heisse mia": "Tässä opetellaan Saksan standardin heißt/heiße-kirjoitusasu ß:llä.",
          "du heiße mia": "Omasta nimestä kerrotaan Ich, ei Du."
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Soveltaminen",
      "title": "Valitse oikea alkuperäfraasi",
      "paragraphs": [
        "Mia esittelee itsensä ja kertoo olevansa Suomesta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "application",
        "prompt": "Mikä kuvaa Mian omaa alkuperää?",
        "options": [
          {
            "id": "a",
            "label": "Du kommst aus Finnland.",
            "wrongFeedback": "Tämä kertoo toisesta henkilöstä, ei Mian omasta minä-lauseesta."
          },
          {
            "id": "b",
            "label": "Ich komme aus Finnland."
          },
          {
            "id": "c",
            "label": "Ich kommt aus Finnland.",
            "wrongFeedback": "Ich-pronominin kanssa on komme, ei kommt."
          }
        ],
        "correctOption": "b",
        "success": "Ich komme aus Finnland. kertoo omasta alkuperästä.",
        "hint": "Ich + komme + aus.",
        "reteach": "Ich komme aus Finnland. kertoo omasta alkuperästä. Ich + komme + aus.",
        "genericWrong": "Tarkista puhujan tilanne ja muoto. Ich + komme + aus."
      }
    },
    {
      "id": "activity",
      "kind": "activity",
      "phase": "Oma harjoittelu",
      "title": "Kokoa kolme fraasia itse",
      "paragraphs": [
        "Sano tai kirjoita kuvitteellisen Mian suulla tervehdys, oma nimi ja alkuperä ilman mallia. Vertaa vasta lopuksi kirjan sanastoon.",
        "Vahvista vain oma harjoitteluyrityksesi. Tämä ei ole automaattinen ääntämis- tai kuuntelukoe."
      ],
      "activityId": "c10-teacher-L051",
      "activityLabel": "Kertasin tervehtimisen, nimen ja alkuperän muistista"
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Lopputarkistus",
      "title": "Mikä on koko kohtaamisen tarkoitus?",
      "paragraphs": [
        "Päättele jo opitun perusteella, miten kohteliaan tapaamisen voi lopettaa."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-MEET-10",
        "evidenceRole": "exit",
        "prompt": "Mikä sopii opettajan kanssa keskustelun loppuun?",
        "options": [
          {
            "id": "a",
            "label": "Wie alt bist du?",
            "wrongFeedback": "Tämä on tuttavallinen ikäkysymys, ei hyvästely."
          },
          {
            "id": "b",
            "label": "Ich heiße Mia.",
            "wrongFeedback": "Tämä on nimiesittely."
          },
          {
            "id": "c",
            "label": "Auf Wiedersehen!"
          }
        ],
        "correctOption": "c",
        "success": "Auf Wiedersehen! on kohtelias hyvästely.",
        "hint": "Valitse hyvästely, ei uusi kysymys.",
        "reteach": "Auf Wiedersehen! on kohtelias hyvästely. Valitse hyvästely, ei uusi kysymys.",
        "genericWrong": "Tarkista puhujan tilanne ja muoto. Valitse hyvästely, ei uusi kysymys."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Yhteenveto",
      "title": "Perusfraasit ovat käytettävissä",
      "paragraphs": [
        "Olet koonnut nimen, alkuperän, tervehdyksen ja hyvästelyn yhdeksi alkeistason kohtaamiseksi sekä vastannut kirjan kolmeen oikeaan kertauskysymykseen.",
        "Haraldin koko haastattelu jää luettavaksi samassa kirjassa. L052:ssa sen 14 repliikin sisältö käydään läpi tarkemmin ilman perusteettomia kuuntelupisteitä."
      ]
    }
  ]
};
