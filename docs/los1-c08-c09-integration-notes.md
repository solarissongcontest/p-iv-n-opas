# LOS! 1 · Teacher 2.0 · C08 + C09 yhteensopivuuskokeilu

**Tila:** erillinen Draft-integraatio, ei päähaaraan julkaistava työ eikä oikean laitteen koe.

Pohja on C09:n hyväksytty Draft-PR #226 (L046–L050), johon yhdistetään C08:n Draft-PR #227 (L041–L045). Kummankaan lähdehaaran sisältöjä ei ylikirjoiteta; tämän haaran tarkoitus on todistaa niiden toiminta **yhtä aikaa**.

- Molemmat Teacher-ryhmät rekisteröidään samassa `getLosTeacherLesson`-funktiossa.
- C08:n `C08-SCHOOL-Qxx`-tunnisteet hyväksytään C09:n kehittämän lähteiden ja kalenteriharjoitusten validaattorin **lisäksi**, ei sen sijasta.
- C08 ja C09 käyttävät omien lukujensa harjoitustunnisteita ja tallentavat suorituksen kirjan alkuperäisiin `teacherSessions`-rakenteisiin; toisen luvun testin palautus ei täytä toisen luvun vaatimuksia.
- Opetuspolun 60 oppitunnin navigointiregressio hyväksyy Teacher 2.0 -oppitunnit L001–L016 ja L041–L050, mutta säilyttää vielä muut vanhat tuntireitit.
- Kummankin lähteen alkuperäisteksti ja oikeusmerkintä on säilytetty omissa lähdetiedostoissaan; ks. `docs/los1-c08-teacher-source-review.md` ja `docs/los1-c09-teacher-source-review.md`.
- Erillinen CI tarkistaa yksikkötestit, TypeScriptin, buildin, molemmat Chromium/WebKit-harjoitussarjat ja koko kirjan regressiot samasta commitista.

**Avoimet julkaisuportit:** riippumaton saksan kielen ja kielitason pedagoginen tarkistus, muokkaushistorian/tekijäoikeuksien täydellinen auditointi, alkuperäisten äänitteiden toiminta oikeilla laitteilla sekä oikean opiskelijan saavutettavuus- ja aikakoe. Selaintestien läpäisy ei ole näyttö äänikuuntelusta tai pysyvästä kielitaidosta.
