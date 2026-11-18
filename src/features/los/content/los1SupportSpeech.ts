/** Curated native-script examples from LOS! 1 Text C support pages.
 * Finnish explanation prose is intentionally excluded from German TTS.
 * This is a speech script, not a generated/studio-approved recording. */
export const LOS1_C_AUDIO_EXAMPLES: Readonly<Record<string, readonly string[]>> = {
  "01": ["Guten Morgen!","Guten Tag!","Guten Abend!","Hallo!","Tschüss!","Auf Wiedersehen!","Bis morgen!","Gute Nacht!"],
  "02": ["Ich heiße Aino.","Ich bin Aino.","Wie heißt du?","Wer ist das?","Das ist Leon.","Freut mich!","Mein Name ist Aino."],
  "03": ["Woher kommst du?","Ich komme aus Finnland.","Wo wohnst du?","Ich wohne in Berlin.","Sie kommt aus Schweden.","Ich komme aus der Schweiz.","Ich komme aus den USA."],
  "04": ["Hallo, Leon!","Guten Tag, Herr Weber!","Wie heißt du?","Wie heißen Sie?","Und du?","Und Sie?","Tschüss!","Auf Wiedersehen!"],
  "05": ["Wie geht’s?","Wie geht es dir?","Mir geht’s gut.","Sehr gut!","Prima!","Nicht so gut.","Ich bin müde.","Und dir?","Wie geht es Ihnen?"],
  "06": ["zehn","elf","zwölf","dreizehn","sechzehn","siebzehn","achtzehn","zwanzig","einundzwanzig","dreißig","hundert","neunundneunzig","Ich bin siebzehn Jahre alt."],
  "07": ["A-I-N-O","L-A-I-N-E","B-E-C-K","Wie schreibt man das?","Bitte buchstabieren Sie.","Noch einmal, bitte!","Bitte langsam!","Richtig?","München."],
  "08": ["Ich verstehe nicht.","Noch einmal, bitte!","Bitte langsamer!","Was bedeutet das?","Können Sie das bitte wiederholen?","Schnell.","Langsam."],
  "09": ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag","am Donnerstag","um vier Uhr","am Donnerstag um vier Uhr","Bis Donnerstag!"],
  "10": ["Hallo!","Ich heiße Aino.","Wie heißt du?","Ich komme aus Finnland.","Ich bin siebzehn Jahre alt.","Wie geht’s?","Noch einmal, bitte!","Am Donnerstag um vier Uhr?","Bis Donnerstag!","Tschüss!"],
} as const;
export const LOS1_C_SPEECH_BLOCKS: Readonly<Record<string,readonly {kind:"prose";text:string}[]>> =
  Object.fromEntries(Object.entries(LOS1_C_AUDIO_EXAMPLES).map(([chapterId,lines])=>
    [chapterId,lines.map(text=>({kind:"prose" as const,text}))]));
