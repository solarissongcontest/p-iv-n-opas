/** Research inventory from LOS1_SOURCE_MANIFEST_v1.0, 10 November 2026.
 * Listed does NOT mean published, imported or playable.
 */
import type { SourceAttribution } from "./model";

const planned: ReadonlyArray<readonly [
  string, string, string, string, string,
  "text-cleared" | "research" | "blocked" | "media-pending", string
]> = [
  [
    "M-COM-01",
    "GesprächVorstellung.ogg",
    "Wikimedia Commons",
    "https://commons.wikimedia.org/wiki/File:Gespr%C3%A4chVorstellung.ogg",
    "CC BY-SA 3.0, Xzapro4 ja Erkan Yilmaz",
    "text-cleared",
    "Teksti/äänite löytynyt. Äänisoittimen ja litteraatin kokonaisuuden julkaisu-QA kesken."
  ],
  [
    "M-COM-02",
    "Deutsch Dialog . Ich bin Peter.ogg",
    "Wikimedia Commons",
    "https://commons.wikimedia.org/wiki/File:Deutsch_Dialog_._Ich_bin_Peter.ogg",
    "Tiedostokohtainen lisenssi tarkistettava",
    "research",
    "Älä kopioi ääntä ennen lisenssitarkistusta."
  ],
  [
    "M-COM-03",
    "German Vocabulary - Greetings.ogg",
    "Wikimedia Commons",
    "https://commons.wikimedia.org/wiki/File:German_Vocabulary_-_Greetings.ogg",
    "Public domain, German Men92",
    "text-cleared",
    "Sanastoäänite, ei kokonainen dialogi; soitto-QA kesken."
  ],
  [
    "M-WB-01",
    "German Level I: Wie heißt du?",
    "Wikibooks",
    "https://en.wikibooks.org/wiki/German/Level_I/Wie_hei%C3%9Ft_du",
    "Wikibooks-sivuteksti CC BY-SA; tarkka versio dokumentoitava",
    "text-cleared",
    "Äänitteen oikeutta ei ole varmennettu."
  ],
  [
    "M-WB-02",
    "German Level I: Bitte buchstabieren Sie",
    "Wikibooks",
    "https://en.wikibooks.org/wiki/German/Level_I/Bitte_buchstabieren_Sie",
    "Wikibooks-sivuteksti CC BY-SA; tarkka versio dokumentoitava",
    "text-cleared",
    "Äänitteen oikeutta ei ole varmennettu."
  ],
  [
    "M-WB-03",
    "German Level I: Freizeit",
    "Wikibooks",
    "https://en.wikibooks.org/wiki/German/Level_I/Freizeit",
    "Wikibooks-sivuteksti CC BY-SA; tarkka versio dokumentoitava",
    "text-cleared",
    "Mahdollisten äänitteiden tarkistaminen erikseen."
  ],
  [
    "M-WB-04",
    "German Level I: Geburtstag",
    "Wikibooks",
    "https://en.wikibooks.org/wiki/German/Level_I/Geburtstag",
    "Wikibooks-sivuteksti CC BY-SA",
    "text-cleared",
    "Tekstilisenssi ei kata kaikkia erillisiä mediatiedostoja automaattisesti."
  ],
  [
    "M-WB-05",
    "German Lesson 1: Die Freunde",
    "Wikibooks",
    "https://en.wikibooks.org/wiki/German/Lesson_1",
    "Wikibooks-sivuteksti CC BY-SA",
    "text-cleared",
    "Alkuperäinen ääni ja tarkka versio tarkistettava."
  ],
  [
    "M-WB-06",
    "German Lesson 2: Die Geschäftsmänner",
    "Wikibooks",
    "https://en.wikibooks.org/wiki/German/Lesson_2",
    "Wikibooks-sivuteksti CC BY-SA",
    "text-cleared",
    "Äänen olemassaoloa ei oleteta."
  ],
  [
    "M-WB-07",
    "Deutschkurs für Anfänger/Lektion 012: vollständige Übung 562 · noch einmal",
    "Wikibooks / Wikimedia",
    "https://en.wikibooks.org/w/index.php?title=Deutschkurs_für_Anfänger/Lektion_012&oldid=3823563",
    "CC BY-SA 4.0 · kaikki alkuperäisen harjoituksen 562 15 saksankielistä riviä",
    "text-cleared",
    "Kokonainen valittu toistopyyntöharjoitus. Tämä ei ole haastattelu eikä äänite; suomennokset ja tehtävät LOS!:n omia."
  ],
  [
    "M-DIB-01",
    "Deutsch im Blick: Berna Wer bin ich?",
    "COERLL / University of Texas",
    "https://coerll.utexas.edu/dib/vidt.php?f=01_15_int_bg_who",
    "Deutsch im Blick: CC BY, tiedostokohtainen oikeus avoin",
    "research",
    "Litteraatin ja videon käyttöoikeus sekä mahdolliset henkilökohtaiset tiedot selvitettävä."
  ],
  [
    "M-DIB-02",
    "Deutsch im Blick: Harald Wer bin ich?",
    "COERLL / University of Texas",
    "https://coerll.utexas.edu/dib/vidt.php?f=01_22_int_hb_who",
    "Tarkka media- ja litteraattilisenssi ja URL vahvistettava",
    "blocked",
    "Haraldin suoraa tekstiä ei vielä ole vahvistettu."
  ],
  [
    "M-DIB-03",
    "Deutsch im Blick: Eva Studium & Wohnen",
    "COERLL / University of Texas",
    "https://coerll.utexas.edu/dib/vidt.php?f=01_19_int_ek_studies-home",
    "Tiedostokohtainen media- ja tekstioikeus vahvistettava",
    "research",
    "Monimutkainen kieli ei kuulu alkeiden aktiiviseen arviointiin."
  ],
  [
    "M-DIB-04",
    "Deutsch im Blick: Im Unterricht -hakemisto",
    "COERLL / University of Texas",
    "https://coerll.utexas.edu/dib/toc.php?k=2",
    "Yksilöityä tekstiyksikköä ja lisenssiä ei vielä vahvistettu",
    "blocked",
    "Linkki osoittaa hakemistoon, ei yksilöityyn haastatteluun."
  ],
  [
    "M-DIB-05",
    "Deutsch im Blick: Die Woche, Zahlen, Wie geht's?",
    "COERLL / University of Texas",
    "https://coerll.utexas.edu/dib/voc.php?k=1&s=1",
    "Audioiden oikeus tarkistettava lähdetiedostoittain",
    "research",
    "Yksittäisiä äänitesanastoja, ei teksti A."
  ],
  [
    "M-DIB-06",
    "Deutsch im Blick: Das Alphabet",
    "COERLL / University of Texas",
    "https://coerll.utexas.edu/dib/pho.php?k=1",
    "Audioiden oikeus tarkistettava lähdetiedostoittain",
    "research",
    "Tarkka audioassetti ja toiminta tarkistettava."
  ],
  [
    "M-DIB-07",
    "Deutsch im Blick: Ankunft in Würzburg, Kapitel 1",
    "COERLL / University of Texas",
    "https://coerll.utexas.edu/dib/pdfs/k_01.pdf",
    "Avoin CC BY -oppikirja; tarkka lisenssimaininta/tarkat sivut tarkistettava",
    "text-cleared",
    "Kirjan koko PDF ei ole LOS!-kappaleen pääteksti."
  ],
  [
    "M-DIB-08",
    "Deutsch im Blick: An der Uni, Kapitel 2",
    "COERLL / University of Texas",
    "https://coerll.utexas.edu/dib/toc.php?k=2",
    "Osa tekstistä CC BY, media erikseen",
    "research",
    "Valitut lohkot yksilöitävä ennen julkaisua."
  ],
  [
    "V-DW-01",
    "Nicos Weg Folge 1: Hallo!",
    "Deutsche Welle",
    "https://www.youtube.com/watch?v=dC6ZGLzdaTs",
    "Virallinen YouTube-upotus ehdollinen",
    "media-pending",
    "Upotusoikeutta ja toistoa ei ole vielä testattu."
  ],
  [
    "V-DW-02",
    "Nicos Weg Folge 4: Von A bis Z",
    "Deutsche Welle",
    "https://www.youtube.com/watch?v=-qAuGimugds",
    "Virallinen YouTube-upotus ehdollinen",
    "media-pending",
    "Upotusoikeutta ja toistoa ei ole vielä testattu."
  ],
  [
    "V-DW-03",
    "Nicos Weg Folge 7: Woher kommst du?",
    "Deutsche Welle",
    "https://www.youtube.com/watch?v=Q7ECRAQrzFc",
    "Virallinen YouTube-upotus ehdollinen",
    "media-pending",
    "Upotusoikeutta ja toistoa ei ole vielä testattu."
  ],
  [
    "V-EASY-01",
    "100 Words You Should Know When Coming to Germany",
    "Easy German",
    "https://www.youtube.com/watch?v=r8HiWsBe5ko",
    "Virallinen YouTube-upotus ehdollinen",
    "media-pending",
    "Upotusoikeutta ja toistoa ei ole vielä testattu."
  ],
  [
    "V-GOE-01",
    "Erste Wege in Deutschland",
    "Goethe-Institut",
    "https://www.goethe.de/prj/mwd/de/deu/ewd.html",
    "Täsmällinen jakso ja upotusoikeus vahvistettava",
    "media-pending",
    "Linkki ei ole valmis sisäinen videosoitin."
  ],
  [
    "V-DIB-01",
    "Der Studentenausweis",
    "COERLL / University of Texas",
    "https://www.coerll.utexas.edu/dib/vid.php?f=01_29_sik_student-id",
    "Käyttöoikeus ja upotusvahvistus puuttuvat",
    "media-pending",
    "Tarkka media ja toimiva upotus tarkistettava."
  ]
];

export const LOS1_RESEARCH_SOURCES: SourceAttribution[] = planned.map(([
  id, title, publisher, originalUrl, licenseOrBasis, readiness, publicationNoteFi,
]) => ({
  id, title, publisher, originalUrl, licenseOrBasis, readiness,
  publicationNoteFi, verifiedAt: "2026-11-10", permittedMode: "pending",
}));
