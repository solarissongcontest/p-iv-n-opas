/** Source-specific editorial T16 question examples for LOS! 2–8.
 * These are original German model suggestions, not objectively graded answers.
 * The canonical source task prompt and all serialized student response keys
 * remain unchanged. Six unusual source prompts use legitimate meta-questions
 * for an instruction, request, email salutation or news headline. */
export const LOS_FUTURE_T16_QUESTIONS:Record<number,Record<string,string>> =
{
  "2": {
    "10": "Wo wohnt ihr?",
    "01": "Was lernt ihr?",
    "02": "Wer ist das?",
    "03": "Was für ein Zimmer hast du?",
    "04": "Was brauchst du?",
    "05": "Wann lernst du?",
    "06": "Was isst du gern?",
    "07": "Was möchten Sie trinken?",
    "08": "Was kaufst du?",
    "09": "Was würdest du fragen, wenn du den Bahnhof suchst?"
  },
  "3": {
    "10": "Wann können wir wandern?",
    "01": "Was machst du gern?",
    "02": "Wie oft schwimmst du?",
    "03": "Was kannst du gut?",
    "04": "Welche Musik magst du?",
    "05": "Was musst du heute machen?",
    "06": "Wann hast du Deutsch?",
    "07": "Was machst du nach der Schule?",
    "08": "Was wollt ihr machen?",
    "09": "Wie fahrt ihr?"
  },
  "4": {
    "10": "Wo liegt die Stadt?",
    "01": "Wo spricht man Deutsch?",
    "02": "Wo liegt Hamburg?",
    "03": "Welche Stadt ist größer, Wien oder Salzburg?",
    "04": "Wohin fahrt ihr?",
    "05": "Was gibt es in Finnland?",
    "06": "Was macht man in vielen Familien am Abend?",
    "07": "Wen hast du besucht?",
    "08": "Was habt ihr gestern gemacht?",
    "09": "Wie groß ist die Stadt im Vergleich zu Berlin?"
  },
  "5": {
    "10": "Was würdest du einem Freund raten, der Durst hat?",
    "01": "Wie fühlst du dich?",
    "02": "Was tut dir weh?",
    "03": "Was sollte ich tun?",
    "04": "Warum isst du Obst?",
    "05": "Wann ruhst du dich aus?",
    "06": "Wie geht es dir heute?",
    "07": "Was denkst du über Pausen?",
    "08": "Wo warst du als Kind oft?",
    "09": "Was hast du früher oft gemacht?"
  },
  "6": {
    "10": "Was ist dein Thema?",
    "01": "Wie findest du diese Musik?",
    "02": "Was hast du gestern gemacht?",
    "03": "Was macht sie zuerst?",
    "04": "Wie findest du den Film?",
    "05": "Wie ist das Bild?",
    "06": "Wie war die Stadt früher?",
    "07": "Was macht ihr, wenn ihr feiert?",
    "08": "Was hast du gestern besucht?",
    "09": "Was sagt der Artikel über das Festival?"
  },
  "7": {
    "10": "Was möchtest du später machen?",
    "01": "Was kannst du gut?",
    "02": "Wann hast du Chemie?",
    "03": "Wofür musst du lernen?",
    "04": "Was würdest du gern studieren?",
    "05": "Was möchtest du werden?",
    "06": "Wen suchen Sie?",
    "07": "Wie lautet die höfliche Anrede in deiner E-Mail?",
    "08": "Was würdest du höflich fragen, wenn du etwas nicht verstanden hast?",
    "09": "Wo arbeitest du heute?"
  },
  "8": {
    "10": "Wann beginnt das Projekt laut dem Artikel?",
    "01": "Was beginnt heute?",
    "02": "Wie oft liest du Nachrichten?",
    "03": "Wie lautet die Überschrift der Nachricht?",
    "04": "Wann beginnt das Projekt laut dem Bericht?",
    "05": "Was fordert die Nachricht die Leser auf zu tun?",
    "06": "Warum gehst du zu Fuß?",
    "07": "Was wird vielleicht größer?",
    "08": "Wie findest du die Idee?",
    "09": "Wie findest du den Vorschlag?"
  }
};
export const LOS_FUTURE_T16_SPECIAL_NOTES:Record<string,string> =
{
  "2-09": "Annettu ilmaus on jo kysymys. Esimerkkikysymys pyytää kertomaan, mitä henkilö itse kysyisi. Tämä ei ole tavallinen tietokysymys aseman sijainnista.",
  "5-10": "Annettu ilmaus on käskymuotoinen neuvo. Esimerkkikysymys pyytää antamaan neuvon, ei kuvailemaan valmista tapahtumaa.",
  "7-07": "Annettu ilmaus on muodollisen sähköpostin puhuttelu, ei kokonainen vastauslause. Esimerkkikysymys tiedustelee oikeaa puhuttelua.",
  "7-08": "Annettu ilmaus on kohtelias kysymys. Esimerkkikysymys pyytää muodostamaan tilanteeseen sopivan kohteliaan kysymyksen.",
  "8-03": "Annettu ilmaus on uutisotsikko, ei väitelause. Esimerkkikysymys tiedustelee otsikon sanamuotoa.",
  "8-05": "Annettu ilmaus on lainattu kehotus. Esimerkkikysymys tiedustelee, mitä tekstissä kehotetaan tekemään, eikä vahvista kehotuksen luotettavuutta."
};

/** Visible only after the learner has attempted their own response.
 * A single model cannot enumerate all acceptable German questions. */
export function losFutureT16Model(bookId:number,chapterId:string,sourcePrompt:string):string|null {
  const question=LOS_FUTURE_T16_QUESTIONS[bookId]?.[chapterId];
  if(!question)return null;
  const start="Keksi kysymys, johon vastaus voisi olla ";
  const divider=". Varmista, että kysymys sopii tilaisuuteen ";
  if(!sourcePrompt.startsWith(start))return null;
  const end=sourcePrompt.indexOf(divider,start.length);
  if(end<start.length)return null;
  const original=sourcePrompt.slice(start.length,end).trim();
  if(!original)return null;
  const note=LOS_FUTURE_T16_SPECIAL_NOTES[`${bookId}-${chapterId}`];
  return "Toimituksellinen esimerkkikysymys (ei vielä ulkopuolisen saksanopettajan tarkistama):\n"
    +question+"\nAnnettu lähtöilmaus: "+original+"\n"
    +(note?note+"\n":"")
    +"Vertaile kysymyssanan merkitystä, persoonamuotoa, taivutetun verbin paikkaa ja vastausilmauksen sopivuutta. "
    +"Tämä on vain yksi mahdollinen esimerkki, ei automaattinen oikeellisuusarvio.";
}
