/**
 * LOS! 2–8:n C01-kappaleiden ensimmäiset kokonaiset tekstiluonnokset.
 * Kopioitu 12.11.2026 kirjakohtaisista v1.0-käsikirjoituksista.
 *
 * Nämä ovat LOS!:n omia harjoitustekstejä, EIVÄT ulkopuolisten
 * saksankielisten kirjoittamia autenttisia päätekstejä. Älä merkitse
 * niitä julkaisuvalmiiksi, tarkastetuiksi tai kuunnelluiksi.
 */
export type FutureChapterDraft = {
  textA: string;
  textB: string;
  dialogue: string[];
  question: string;
  answer: string;
  vocabulary: [string, string][];
};
export const LOS_FUTURE_FIRST_CHAPTERS: Record<number, FutureChapterDraft> = {
  2: {
    textA: "Mira ist neu in Bonn. Am Montag trifft sie Jonas in einem Deutschkurs. „Hallo, ich heiße Mira. Und du?“, fragt sie. „Ich bin Jonas. Ich wohne hier und lerne Deutsch“, antwortet Jonas. Mira kommt aus Finnland. Sie wohnt jetzt bei ihrer Tante. Jonas hat zwei Freunde im Kurs. Sie heißen Nora und Tim. „Wir lernen heute zusammen“, sagt Nora. „Und morgen?“, fragt Mira. „Morgen lernen wir zu Hause“, antwortet Tim. Die vier sprechen noch nicht viel Deutsch. Aber sie hören zu, wiederholen die neuen Wörter und lachen zusammen. Am Ende sagt Mira: „Bis morgen!“",
    textB: "Hallo Mira! Wir lernen am Dienstag zusammen Deutsch. Bis bald! Jonas",
    dialogue: ["Mira: Hallo, ich bin Mira.", "Jonas: Ich heiße Jonas. Wir lernen Deutsch.", "Mira: Wo wohnst du?", "Jonas: Ich wohne in Bonn. Meine Freunde wohnen auch hier."],
    question: "Mitä Jonas ja Mira tekevät yhdessä?", answer: "He opiskelevat saksaa.",
    vocabulary: [["der Freund", "ystävä"], ["die Freundin", "ystävä (naispuolinen)"], ["zusammen", "yhdessä"], ["wir", "me"], ["ihr", "te"], ["sie", "he"]],
  },
  3: {
    textA: "Was machst du gern in deiner Freizeit? Im Deutschkurs gibt es viele Antworten. Mia liest Bücher und hört Musik. Lukas spielt Basketball. Fatima fotografiert gern die Stadt. Tim sieht am Abend Serien. Am Freitag sprechen die vier über das Wochenende. „Ich habe am Samstag Zeit“, sagt Mia. „Wollen wir etwas zusammen machen?“ Lukas möchte Sport treiben, aber Fatima möchte zuerst in ein Museum gehen. Sie überlegen zusammen. Schließlich treffen sie sich am Nachmittag im Park. Jeder darf etwas vorschlagen. „Wir müssen nicht alle das Gleiche mögen“, sagt Mia. „Wir können trotzdem zusammen Spaß haben.“",
    textB: "Freizeit: Lesen, Fußball, Musik hören. Neue Gruppe am Freitag.",
    dialogue: ["Nora: Was machst du gern?", "Finn: Ich lese gern und spiele Fußball.", "Nora: Liest du jeden Tag?", "Finn: Nein, nur am Wochenende."],
    question: "Mitä Finn tekee mielellään?", answer: "Hän lukee ja pelaa jalkapalloa.",
    vocabulary: [["die Freizeit", "vapaa-aika"], ["das Hobby", "harrastus"], ["spielen", "pelata"], ["lesen", "lukea"], ["hören", "kuunnella"], ["malen", "maalata"]],
  },
  4: {
    textA: "In welchen Ländern spricht man Deutsch? Im Unterricht hängt eine Karte von Europa. Die Lehrerin zeigt Deutschland, Österreich, die Schweiz und Liechtenstein. Sie erklärt, dass Deutsch in mehreren Ländern und Regionen gesprochen wird. Auch in Teilen Belgiens und Italiens gibt es deutschsprachige Gemeinschaften. Paul hat eine Frage: „Sprechen alle Menschen genau gleich?“ Die Lehrerin antwortet: „Nein. Es gibt verschiedene Dialekte, Ausdrücke und Ausspracheweisen.“ Die Klasse hört kurze Beispiele und versucht, Unterschiede zu erkennen. Mia findet das interessant. Sie schreibt in ihr Heft: Eine Sprache kann viele Varianten haben. Alle gehören zur Sprachwelt.",
    textB: "Sprachenkarte: Deutsch ist in mehreren Ländern Amtssprache oder eine Amtssprache.",
    dialogue: ["Mia: Wo spricht man Deutsch?", "Tariq: In Deutschland, Österreich und in der Schweiz.", "Mia: Spricht man dort nur Deutsch?", "Tariq: Nein, nicht überall."],
    question: "Puhutaanko saksaa vain yhdessä maassa?", answer: "Ei, useissa maissa.",
    vocabulary: [["die Sprache", "kieli"], ["sprechen", "puhua"], ["das Land", "maa"], ["Österreich", "Itävalta"], ["die Schweiz", "Sveitsi"], ["die Region", "alue"]],
  },
  5: {
    textA: "Mila sitzt mit ihrer Freundin in der Pause. „Wie geht es dir wirklich?“, fragt Hanna. Mila denkt kurz nach. „Ich bin heute müde und ein bisschen nervös“, antwortet sie. Morgen schreibt sie einen Test. Hanna hört zu und fragt: „Möchtest du darüber sprechen?“ Mila nickt. Sie erzählt, dass sie am Wochenende nicht gut geschlafen hat. Hanna schlägt vor, nach der Schule einen Spaziergang zu machen. „Das klingt gut“, sagt Mila. „Ich möchte heute nicht allein lernen.“ Beide wissen: Es ist in Ordnung, unterschiedliche Gefühle zu haben. Am Ende der Pause fühlt sich Mila etwas ruhiger.",
    textB: "Nachricht: Heute mache ich langsam. Morgen habe ich mehr Zeit.",
    dialogue: ["Nora: Wie fühlst du dich heute?", "Lea: Ich bin müde, aber es geht mir gut.", "Nora: Möchtest du eine Pause?", "Lea: Ja, gern."],
    question: "Miltä Leasta tuntuu?", answer: "Hän on väsynyt, mutta hänelle kuuluu hyvää.",
    vocabulary: [["die Stimmung", "mieliala"], ["glücklich", "onnellinen"], ["traurig", "surullinen"], ["müde", "väsynyt"], ["ruhig", "rauhallinen"], ["nervös", "hermostunut"]],
  },
  6: {
    textA: "Was bedeutet Kultur? Im Sprachkurs sammeln die Jugendlichen Ideen. Paul denkt zuerst an Museen und Musik. Sara nennt Essen und Feste. Malik sagt, dass auch Sprache und Alltag zur Kultur gehören. Die Lehrerin bittet um Beispiele aus dem eigenen Leben. Sara erzählt von einem Fest in ihrer Nachbarschaft. Malik beschreibt eine Musikveranstaltung. Paul erinnert sich an einen Museumsbesuch. Sie sehen, dass Kultur nicht nur aus berühmten Kunstwerken besteht. „Ich finde kulturelle Unterschiede interessant“, sagt Sara, „weil man dabei Neues lernt.“ Zum Schluss entscheiden alle, welches Thema sie in den nächsten Wochen genauer kennenlernen möchten.",
    textB: "Umfrage: Musik, Sprache, Feste, Kunst und Alltag gehören für viele Menschen zur Kultur.",
    dialogue: ["Mira: Was bedeutet Kultur für dich?", "Tom: Musik, Filme und auch Essen.", "Mira: Und für mich sind Bücher wichtig.", "Tom: Ja, Kultur ist vielfältig."],
    question: "Mitä kulttuuri merkitsee Miralle erityisesti?", answer: "Kirjoja.",
    vocabulary: [["die Kultur", "kulttuuri"], ["das Museum", "museo"], ["die Kunst", "taide"], ["die Musik", "musiikki"], ["das Theater", "teatteri"], ["das Kino", "elokuvateatteri"]],
  },
  7: {
    textA: "Im Deutschkurs stellen sich die Jugendlichen die Frage: „Was kann ich gut?“ Lina sagt, dass sie gern organisiert. Karim kann gut mit Menschen sprechen. Ben ist geduldig und erklärt schwierige Dinge. Die Lehrerin erinnert die Gruppe daran, dass Stärken nicht nur Schulnoten sind. Jeder schreibt drei Fähigkeiten auf und nennt ein Beispiel dazu. Lina erzählt, dass sie für einen Verein Veranstaltungen geplant hat. Karim hilft oft neuen Schülerinnen und Schülern. Ben unterstützt seinen kleinen Bruder bei den Hausaufgaben. Anschließend geben sich die Jugendlichen gegenseitig freundliches, konkretes Feedback. Sie üben dabei die Wendung „Du kannst gut …“.",
    textB: "Profil: Stärken: Teamarbeit, Sprachen. Ziel: mehr Erfahrung.",
    dialogue: ["Mira: Was kannst du gut?", "Jonas: Ich kann gut erklären und organisieren.", "Mira: Und was möchtest du lernen?", "Jonas: Noch besser Deutsch sprechen."],
    question: "Mitä Jonas haluaa oppia paremmin?", answer: "Puhumaan saksaa.",
    vocabulary: [["die Stärke", "vahvuus"], ["die Fähigkeit", "taito"], ["gut", "hyvä"], ["geduldig", "kärsivällinen"], ["freundlich", "ystävällinen"], ["kreativ", "luova"]],
  },
  8: {
    textA: "Heute liest Mira drei kurze Meldungen. In der ersten geht es um eine neue Buslinie. In der zweiten wird ein Konzert angekündigt. In der dritten berichtet eine Schule über ein Projekt. Mira fragt bei jeder Meldung: Wer macht etwas? Was ist passiert? Wo und wann? Dann vergleicht sie die Überschriften mit dem eigentlichen Text. Bei einer Meldung fehlen genaue Angaben zum Datum. Mira markiert die Stelle und sucht auf der offiziellen Seite nach weiteren Informationen. Sie merkt, dass eine interessante Überschrift nicht automatisch eine vollständige Nachricht ist. Am Ende schreibt sie eine sachliche Zusammenfassung in drei Sätzen.",
    textB: "Lokalnachricht: Neuer Park öffnet am Samstag. Adresse: Marktstraße 10.",
    dialogue: ["Mira: Was ist heute passiert?", "Leo: Die Stadt eröffnet einen neuen Park.", "Mira: Wann?", "Leo: Am Samstag."],
    question: "Mitä kaupungissa avataan?", answer: "Uusi puisto.",
    vocabulary: [["die Nachricht", "uutinen"], ["die Zeitung", "sanomalehti"], ["der Bericht", "raportti"], ["die Überschrift", "otsikko"], ["die Frage", "kysymys"], ["wer", "kuka"]],
  },
};
