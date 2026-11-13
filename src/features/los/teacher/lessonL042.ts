import type { TeacherLesson } from "./engine.ts";
/** C08 Teacher preview. Existing textbook evidence only; no listening or advanced grammar scores. */
export const LOS1_L042_TEACHER: TeacherLesson = {
  "id": "L042",
  "bookId": 1,
  "chapterId": "08",
  "version": "2.0.0-preview.1",
  "title": "Luokkatilanteen alkuperäisteksti",
  "objective": "Luen kokonaisen 26 tekstiyksikön M-WB-08-koulukohtauksen, löydän kouluaineet ja tervehdyksen sekä tarkistan kolme aitoa kysymystä ja tekstikohdan.",
  "estimatedMinutes": 30,
  "requiredQuestionIds": [
    "recall",
    "guided",
    "independent",
    "application",
    "exit"
  ],
  "requiredActivityIds": [
    "c08-teacher-L042"
  ],
  "requiredPracticeIds": [],
  "requiredCheckedIds": [
    "C08-SCHOOL-Q01",
    "C08-SCHOOL-Q02",
    "C08-SCHOOL-Q03",
    "C08-SOURCE-EVIDENCE-01"
  ],
  "scenes": [
    {
      "id": "welcome",
      "kind": "introduction",
      "phase": "Aloitus",
      "title": "Lähdeteksti saa olla vaikeampi kuin oma saksasi",
      "paragraphs": [
        "C08:n oikea Text A on Wikibooksin German/Level I/Schule -luokkakohtaus M-WB-08. Kirjan lukija sisältää sen kaikki 26 tekstiyksikköä, myös kertojan selitteet ja Florianin taululle kirjoitetut laskut.",
        "Tämä on autenttiseen julkaistuun tekstiin perustuva lukuharjoitus, mutta teksti sisältää A1:n tuottamistavoitetta selvästi vaikeampaa kieltä. Sinun tulee tunnistaa vain muutama tuttu sana ja kohtauksen pääpiirteet.",
        "Tekstin lähteeseen liittyvät saksantason toimituksellinen tarkistus ja audiojulkaisu eivät ole vielä hyväksyttyjä. Mikään tässä tunnissa ei edellytä videon katsomista tai äänitteen kuuntelemista."
      ]
    },
    {
      "id": "recall",
      "kind": "question",
      "phase": "Muistelu",
      "title": "Luokassa tunnetaan jo yksi tervehdys",
      "paragraphs": [
        "Ennen Text A:n lukemista muista C01:n aamun tervehdys."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-08",
        "evidenceRole": "practice",
        "prompt": "Miten saksaksi sanotaan Hyvää huomenta?",
        "options": [
          {
            "id": "a",
            "label": "Guten Abend!",
            "wrongFeedback": "Guten Abend! sopii iltaan, ei aamuun."
          },
          {
            "id": "b",
            "label": "Gute Nacht!",
            "wrongFeedback": "Gute Nacht! toivottaa hyvää yötä."
          },
          {
            "id": "c",
            "label": "Guten Morgen!"
          }
        ],
        "correctOption": "c",
        "success": "Guten Morgen! on aamun tervehdys.",
        "hint": "Morgen tarkoittaa aamua.",
        "reteach": "Guten Morgen! on aamun tervehdys. Morgen tarkoittaa aamua.",
        "genericWrong": "Tarkista tilanteen tavoite ja fraasin merkitys. Morgen tarkoittaa aamua."
      }
    },
    {
      "id": "explain",
      "kind": "explanation",
      "phase": "Opettajan selitys",
      "title": "Koulupäivän kolme tunnistettavaa osaa",
      "paragraphs": [
        "Kohtaus alkaa Silken ja Torstenin matematiikantunnista: Jetzt haben wir Mathe. Sana Mathe tarkoittaa matematiikkaa.",
        "Opettaja tulee luokkaan ja sanoo Guten Morgen!, ja luokka vastaa samalla tavalla. Florian menee taululle ja laskee neljä laskua, joiden numerot ovat suoraan näkyvissä.",
        "Opettaja sanoo Florianille Sehr gut, Florian!. Myöhemmin kellon soidessa Silke ja Torsten siirtyvät musiikkiin: Wir müssen zu Musik.",
        "Kohtaus etenee myöhemmin myös musiikintunnin jälkeiseen tilanteeseen ja sisältää vaikeampia muotoja sekä kouluun liittyvää tarinaa. Lue ne kokonaisina suomennosten avulla, mutta älä opettele taivuttamaan esimerkiksi müssen- tai möchten-verbejä.",
        "Lue lähde sen oikeassa järjestyksessä. Kun kysymys pyytää tiettyä tekstikohtaa, vastaa juuri siihen repliikkiin, älä päättele vain koulusanan perusteella."
      ],
      "help": [
        {
          "title": "Mitä Mathe tarkoittaa?",
          "body": "Mathe on lyhyt arkinen nimitys matematiikalle. Silke kertoo alussa, että nyt on matematiikkaa."
        },
        {
          "title": "Mitä taululla tehdään?",
          "body": "Florian kirjoittaa laskut 5+8, 8−5, 3×8 ja 24÷12. Niitä käytetään tekstissä tilanteen tunnistamiseen, ei uutena matematiikan kurssina."
        },
        {
          "title": "Miksi alkuperäisessä tekstissä on paljon vaikeaa kieltä?",
          "body": "Teksti on kokonainen julkaistu lähde. Tässä L042:n taitotavoite on lukea ja tunnistaa tuttuja sanoja. Et joudu vielä tuottamaan kaikkia vaikeita verbirakenteita."
        },
        {
          "title": "Voinko tehdä tämän ilman kuuntelua?",
          "body": "Kyllä. Kaikki 26 tekstiyksikköä ja suomennokset ovat kirjan omassa Text A -lukijassa. Äänen toimivuutta ei ole vahvistettu."
        }
      ]
    },
    {
      "id": "board",
      "kind": "board",
      "phase": "Opetustaulu",
      "title": "Tunnista viisi hetkeä koulupäivästä",
      "paragraphs": [
        "Tämä taulu on opetuksen suomenkielinen rakenneapu. Se ei korvaa lähdetekstin kaikkia 26 yksikköä."
      ],
      "board": [
        {
          "label": "1 · Ensin matematiikkaa",
          "german": "Jetzt haben wir Mathe.",
          "meaning": "Silke kertoo oppiaineen."
        },
        {
          "label": "2 · Opettaja saapuu",
          "german": "Guten Morgen!",
          "meaning": "Luokka tervehtii takaisin."
        },
        {
          "label": "3 · Taululle laskemaan",
          "german": "Florian geht zur Tafel.",
          "meaning": "Florian menee taululle."
        },
        {
          "label": "4 · Opettajan kehu",
          "german": "Sehr gut, Florian!",
          "meaning": "Opettaja kiittää suorituksesta."
        },
        {
          "label": "5 · Seuraava tunti",
          "german": "Wir müssen zu Musik!",
          "meaning": "Oppilaat siirtyvät musiikkiin."
        },
        {
          "label": "6 · Kokonainen kohtaus",
          "german": "26 alkuperäistä tekstiyksikköä",
          "meaning": "Kertojan tekstit ja laskut ovat osa lähdettä."
        }
      ]
    },
    {
      "id": "guided",
      "kind": "question",
      "phase": "Ohjattu harjoitus",
      "title": "Missä aineessa kohtaaminen alkaa?",
      "paragraphs": [
        "Palaa ensimmäiseen puheenvuoroon, jossa Silke käyttää oppiaineen lyhyttä nimeä."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-08",
        "evidenceRole": "practice",
        "prompt": "Mitä Silke ja Torsten opiskelevat alussa?",
        "options": [
          {
            "id": "a",
            "label": "Matematiikkaa"
          },
          {
            "id": "b",
            "label": "Historiaa",
            "wrongFeedback": "Historia tulee esiin vasta myöhemmin, ei tekstin alussa."
          },
          {
            "id": "c",
            "label": "Musiikkia",
            "wrongFeedback": "Musiikki on seuraava oppiaine, ei ensimmäinen."
          }
        ],
        "correctOption": "a",
        "success": "Mathe tarkoittaa matematiikkaa.",
        "hint": "Kohtauksen ensimmäinen lause alkaa Jetzt haben wir ...",
        "reteach": "Mathe tarkoittaa matematiikkaa. Kohtauksen ensimmäinen lause alkaa Jetzt haben wir ...",
        "genericWrong": "Tarkista tilanteen tavoite ja fraasin merkitys. Kohtauksen ensimmäinen lause alkaa Jetzt haben wir ..."
      }
    },
    {
      "id": "source",
      "kind": "book",
      "phase": "Kirjan lähde",
      "title": "Lue kaikki 26 oikeaa lähdeyksikköä",
      "paragraphs": [
        "Avaa C08:n Text A. Lue järjestyksessä Silken ja Torstenin vuorosanat, kertojan tekstit, opettajan ja luokan tervehdykset, Florianin neljä laskua sekä musiikkituntiin siirtyminen.",
        "Napauta tarvittaessa vaikeita sanoja tai avaa ymmärtämissivulta koko tekstin suomennos. Ulkoista lukusivua ei tarvita."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "text",
          "label": "C08 · Koko Schule-kohtaus, 26 tekstiyksikköä",
          "instruction": "Lue kokonainen julkaistu lähdeteksti alusta loppuun."
        }
      ]
    },
    {
      "id": "checked",
      "kind": "book",
      "phase": "Luetun ymmärtäminen",
      "title": "Tarkista kolme oikeaa sisältökysymystä",
      "paragraphs": [
        "Avaa kirjan Ymmärrä-sivu ja tee C08-SCHOOL-Q01, C08-SCHOOL-Q02 ja C08-SCHOOL-Q03. Ne kysyvät alun matematiikkaa, aamun tervehdystä ja musiikkituntiin siirtymistä.",
        "Vastaa jokaiseen ja paina Tarkista vastaus erikseen. Tarkistettu vääräkin yritys on rehellinen harjoittelumerkintä, mutta ei automaattinen osaamisen todistus."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "understand",
          "label": "C08 · Schule-lähteen kysymykset 1–3",
          "instruction": "Vastaa ja tarkista kolme oikeaa tekstikysymystä."
        }
      ]
    },
    {
      "id": "evidence",
      "kind": "book",
      "phase": "Tekstikohta",
      "title": "Valitse oikea tekstikohta, ei vain merkitystä",
      "paragraphs": [
        "Ymmärrä-sivun lopussa on oikea tekstikohdan tehtävä C08-SOURCE-EVIDENCE-01. Valitse alkuperäisistä 26 yksiköstä juuri se, jossa opettaja sanoo Sehr gut, Florian!.",
        "Oikea kohta on opettajan puheenvuoro, ei Florianin laskun kirjoittaminen. Paina Tarkista tekstikohta.",
        "Tämä vaatimus perustuu lähdetekstiin, mutta ääntä ei vaadita."
      ],
      "bookLinks": [
        {
          "chapterId": "08",
          "section": "understand",
          "label": "C08 · Todellinen tekstikohtatehtävä",
          "instruction": "Valitse ja tarkista C08-SOURCE-EVIDENCE-01."
        }
      ]
    },
    {
      "id": "independent",
      "kind": "question",
      "phase": "Itsenäinen harjoitus",
      "title": "Muista opettajan kehut",
      "paragraphs": [
        "Sulje ensin Text A ja kirjoita yksi lyhyt tuttu fraasi lähteestä."
      ],
      "question": {
        "type": "text",
        "skillId": "L1-READ-08",
        "evidenceRole": "independent",
        "prompt": "Kirjoita saksaksi: Erittäin hyvä! (alkuperäisen opettajan käyttämä lyhyt ilmaus)",
        "accepted": [
          "Sehr gut!",
          "Sehr gut"
        ],
        "success": "Sehr gut! on oikein.",
        "hint": "Sehr tarkoittaa erittäin ja gut hyvää.",
        "reteach": "Sehr gut! on oikein. Sehr tarkoittaa erittäin ja gut hyvää.",
        "genericWrong": "Kertaa koko ilmaus oikeassa sanajärjestyksessä. Sehr tarkoittaa erittäin ja gut hyvää.",
        "wrongAnswers": {
          "guten morgen": "Guten Morgen! on tervehdys, ei kehu.",
          "gut morgen": "Muistat kaksi eri fraasia. Kehuminen on Sehr gut!"
        }
      }
    },
    {
      "id": "application",
      "kind": "question",
      "phase": "Soveltaminen",
      "title": "Miten selviät vaikeasta alkuperäislauseesta?",
      "paragraphs": [
        "Et ymmärrä kaikkia alkuperäistekstin pitkiä rakenteita. Valitse oppimistapa, joka vastaa tämän tunnin tavoitetta."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-STRAT-08",
        "evidenceRole": "application",
        "prompt": "Mikä on sopiva toimintatapa?",
        "options": [
          {
            "id": "a",
            "label": "Väittää ymmärtäneensä jokaisen kielioppirakenteen.",
            "wrongFeedback": "Tekstin vaikeita rakenteita ei vaadita tuottamaan tässä vaiheessa."
          },
          {
            "id": "b",
            "label": "Etsiä Mathe, Guten Morgen ja Musik sekä käyttää suomennoksia oman lukuyrityksen jälkeen."
          },
          {
            "id": "c",
            "label": "Merkitä kuuntelusuoritus, vaikka äänitettä ei ole käytettävissä.",
            "wrongFeedback": "Tekstin lukeminen ei ole todiste kuullun ymmärtämisestä."
          }
        ],
        "correctOption": "b",
        "success": "Tuttujen sanojen tunnistaminen kokonaisessa tekstissä on oikea tavoite.",
        "hint": "Lue itse ensin ja käytä tarvittaessa suomennoksia.",
        "reteach": "Tuttujen sanojen tunnistaminen kokonaisessa tekstissä on oikea tavoite. Lue itse ensin ja käytä tarvittaessa suomennoksia.",
        "genericWrong": "Tarkista tilanteen tavoite ja fraasin merkitys. Lue itse ensin ja käytä tarvittaessa suomennoksia."
      }
    },
    {
      "id": "activity",
      "kind": "activity",
      "phase": "Oma harjoittelu",
      "title": "Kirjoita yksi havainto vaikeasta tekstistä",
      "paragraphs": [
        "Kirjoita omaan muistikirjaasi yksi tuttu sana ja yksi vielä epäselvä ilmaus koko kohtauksesta. Halutessasi sano tunnistamasi fraasi ääneen.",
        "Vahvista vasta sen jälkeen, että kävit koko lähteen läpi. Tämä on oma opiskeluteko, ei automaattinen ääntämisen arvio."
      ],
      "activityId": "c08-teacher-L042",
      "activityLabel": "Luin koko 26-yksikköisen lähteen ja tein oman havaintoni"
    },
    {
      "id": "exit",
      "kind": "question",
      "phase": "Lopputarkistus",
      "title": "Mihin luokka siirtyy myöhemmin?",
      "paragraphs": [
        "Kertaa vielä yksi tapahtuma ilman lähteen avaamista."
      ],
      "question": {
        "type": "choice",
        "skillId": "L1-READ-08",
        "evidenceRole": "exit",
        "prompt": "Mihin oppiaineeseen Silke ja Torsten menevät kellon soitua?",
        "options": [
          {
            "id": "a",
            "label": "Fysiikkaan",
            "wrongFeedback": "Tekstissä ei mainita fysiikkaa seuraavana oppiaineena."
          },
          {
            "id": "b",
            "label": "Matematiikkaan",
            "wrongFeedback": "Matematiikka oli ensimmäinen oppiaine."
          },
          {
            "id": "c",
            "label": "Musiikkiin"
          }
        ],
        "correctOption": "c",
        "success": "Musik on musiikki, jonne oppilaat siirtyvät.",
        "hint": "Seuraava tunti ilmaistaan sanalla Musik.",
        "reteach": "Musik on musiikki, jonne oppilaat siirtyvät. Seuraava tunti ilmaistaan sanalla Musik.",
        "genericWrong": "Tarkista tilanteen tavoite ja fraasin merkitys. Seuraava tunti ilmaistaan sanalla Musik."
      }
    },
    {
      "id": "summary",
      "kind": "summary",
      "phase": "Yhteenveto",
      "title": "Luettu 26 tekstiyksikköä, ei tekaistua kuuntelua",
      "paragraphs": [
        "Luit C08:n koko Schule-kohtauksen, tunnistit kolme tutun sanaston asiaa ja tarkistit kirjan kolme oikeaa kysymystä sekä erillisen tekstikohdan.",
        "Kouluympäristön autenttinen tekstimateriaali voi olla A1-tasoa vaikeampaa. Tekstin avaaminen ja lukeminen ei vielä todista puheen ymmärtämistä tai vaikeiden rakenteiden tuottamista.",
        "L043:ssa harjoittelet avunpyyntöjä ja tutustut toiseen kokonaan kirjoitettuun, mutta äänettömään haastattelutekstiin vain tarvittavien tuttujen sanojen tasolla."
      ]
    }
  ]
};
