# LOS! 1 / C01 Hallo! — sisällön QA-raportti, U1.0

**Tila 12.11.2026:** toiminnallinen lähdepohjainen sisältöesikatselu, **EI hyväksytty valmis kappale**.
Dokumentti kuvaa erillisen U1/U3/U4-kehityshaaran `feat/los-u1-pronunciation-foundation-20261112` todellista koodia. Se ei ole todistus opetusaineiston ulkoisesta kielentarkastuksesta.

## Sisältöketju

| Vaatimus | Nykyinen toteutus | Julkaisuportti |
| --- | --- | --- |
| Nollasta aloittava johdanto | `LosBook.tsx` C01 kappaleavaus määrittää ymmärrettävän opiskelujärjestyksen ja sanoo äänen/kielen keskeneräisyydestä | Pedagoginen henkilöarvio avoin |
| Alkuperäinen pääteksti | `content/los1C01.ts`: M-COM-01 Franz–Jörg 8 vuoron julkaistun litteraatin esikatselu, CC BY-SA 3.0, alkuperäiset puhuja-/rivitunnisteet `u01`–`u08` | Oikeuksien kirjaus tehty lähteeseen, mutta päätekstin kielellinen hyväksyntä avoin |
| Suomenkielinen tekstin tuki | `LosOriginalDialogue.tsx` sanakohtaiset `LOS1_C01_GLOSS`-merkitykset, kontekstikortti | Natiivikielinen tai asiantuntijan teksti-QA avoin |
| IPA | `pronunciation.ts`: 8 perussanan eri kappaleissa käyttökelpoiset lähdetiedot; C01-opetuksessa ich, wie, Tschüss ja muut yksittäiset | Kaikkien 16 aktiivisen sanastorivin täsmällinen IPA puuttuu; fraaseja ei muodosteta arvaamalla |
| Ääni | C01 alkuperäisen Commons-äänitteen HTML-soitin sekä `LosPronunciationButton` de-DE TTS-esikatselu 4 harjoitusesimerkissä | Fyysinen iOS Safari/Chromium -äänentoisto ja tarvittava ihmisäänen laatuarvio puuttuvat |
| Kielioppi | `LosC01GrammarGuide.tsx`: suomenkielinen nollatasolta etenevä tervehdys-/tekstinlukutaito-/ääntämisopetus; myöhemmät kieliopit rajattu tunnistamiseen | Kieli- ja didaktinen pätevä tarkistus avoin |
| Kappalesanasto | `catalog.ts` 16 alkuperäistä sanastoriviä, uusi `Vocabulary`-näkymä IPA/pending-merkinnöillä | Kaikkien sanojen tarkistetut lemma, IPA, taivutus, ihmis-/syntetiikkaääni ja lähdetiedot eivät valmiita |
| Ymmärtäminen | `content/los1C01.ts` C01-SOURCE-Q01–Q04 sidottu oikeaan lähteeseen | Toimituksellinen hyväksyntä avoin |
| Tuottaminen | Nykyinen `LosApplication`, `LosWorkbook` ja `LosVoicePractice` sisältävät viestintäharjoituksia ja vapaaehtoisen äänityksen | Puheen oikeellisuutta ei automaattisesti pisteytetä |
| Testi ja tallennus | `LosWorkbook mode="test"` käyttää vanhoja C01-EX-ID:itä, vastaukset samassa `studyState.ts`-avaimessa; kokeen ratkaisut näytetään vasta palautuksen jälkeen | Regressio- ja palautuksen tuotantotestaus vielä avoin |
| Kertaus | Nykyiset `LosRecallCards`, opetuspolku ja `recallEngine` | Kokonaisen U1-muistetun oppimisen laaduntarkistus avoin |
| Saavutettavuus | U3: tehtäväkohtainen syvälinkki, sanakortin Escape/focus ja rinnakkaisnäkymän perusnäppäimistöpolku | WCAG 2.2 AA / fyysinen laitetesti / audion kuuntelu avoin |

## Pedagogiset riippuvuudet

1. `Wie heißt du?` ja `Ich heiße …` näytetään C01:ssä merkityksinä; verbin taivutus opetetaan vasta C02:ssa.
2. `Wie alt bist du?`, ikä ja numerot ovat C01:n alkuperäistekstissä tunnistamista varten; aktiivinen osaaminen tulee C06:ssa.
3. Tässä ei luoda AI-dialogia autenttiseksi lähteeksi eikä muuteta alkuperäisen tekstin rivitunnisteita.
4. Yhdellekään opiskelijan vain avaamalle sivulle ei myönnetä valmistumismerkintää tai pisteitä.

## Todellisten testien rajat

U1/U3-tekniselle haaralle on lisätty yksikkötestit `tests/los-u1-pronunciation.test.ts` ja `tests/los-u3-content-tree.test.ts`; E2E: `e2e/los-full-book.spec.ts` kattaa nollatasokieliopin näkyvyyden, tehtävän vastauksen säilymisen rinnakkaistilasta ja responsiivisuuden. Näiden tarkka viimeisen commitin testitulos tarkistetaan GitHub Actionsista, eikä tätä raporttia käytetä sen sijaisena.

**Julkaisupäätös:** C01 ei ole valmis R1–R12-julkaisuporteissa. Työn arvo on oikea, versionhallittu sisältöparannus, ei tekaistu hyväksymismerkintä.
