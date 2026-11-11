/** LOS! 1 C01: twelve independently gradable original editorial questions.
 * Unlike Text A and Text B these are LOS!-authored tasks, not copied source.
 * Only the beginner greeting / phonetics material taught in C01 is examined.
 */
import type { Exercise } from "./model";

const stem = {
  version: "0.1.0",
  objectives: ["L1-INT-01", "L1-PHON-01"],
  difficulty: "basic" as const,
};
const choice = (
  id: number, promptFi: string, labels: [string, string, string],
  correctIndex: 0 | 1 | 2, explanationFi: string,
): Exercise => ({
  ...stem, id: "los1-c01-exam-" + String(id).padStart(2, "0"), type: "single-choice",
  promptFi, explanationFi,
  options: labels.map((label, index) => ({ id: "option-" + (index + 1), label })),
  correctOptionId: "option-" + (correctIndex + 1),
});
const gap = (
  id: number, promptFi: string, before: string, after: string,
  accepted: string[], explanationFi: string,
): Exercise => ({
  ...stem, id: "los1-c01-exam-" + String(id).padStart(2, "0"), type: "gap-fill",
  promptFi, explanationFi, sentenceBefore: before, sentenceAfter: after,
  acceptedAnswers: accepted,
});

export const LOS1_C01_EXAM_EXERCISES: Exercise[] = [
  choice(1, "Miten tervehdit saksaksi aamulla?", ["Gute Nacht!", "Guten Morgen!", "Tschüss!"], 1,
    "Guten Morgen! on aamulla käytettävä tervehdys."),
  choice(2, "Mikä on tavallinen päiväsaikaan sopiva tervehdys?", ["Guten Tag!", "Bis später!", "Gute Nacht!"], 0,
    "Guten Tag tarkoittaa 'hyvää päivää'."),
  choice(3, "Miten sanot saksaksi 'hyvää iltaa'?", ["Gute Nacht!", "Guten Abend!", "Guten Morgen!"], 1,
    "Guten Abend! on iltatervehdys. Gute Nacht liittyy yleensä nukkumaanmenoon."),
  choice(4, "Mitä sanot, kun toivotat jollekulle hyvää yötä?", ["Guten Tag!", "Auf Wiedersehen!", "Gute Nacht!"], 2,
    "Gute Nacht! vastaa ilmaisua 'hyvää yötä'."),
  choice(5, "Mikä sopii tavalliseksi epämuodolliseksi hyvästelyksi?", ["Tschüss!", "Guten Morgen!", "Guten Abend!"], 0,
    "Tschüss! on arkinen hyvästely."),
  choice(6, "Mikä hyvästely on muodollisempi kuin Tschüss?", ["Hallo!", "Auf Wiedersehen!", "Guten Tag!"], 1,
    "Auf Wiedersehen! tarkoittaa 'näkemiin'."),
  choice(7, "Millä sanalla Franz aloittaa alkuperäisen Text A -keskustelun?", ["Hallo", "Bitte", "Danke"], 0,
    "Franz aloittaa dialogin sanalla Hallo. Tämän huomaa alkuperäisestä kahdeksan repliikin tekstistä."),
  choice(8, "Millä sanalla Jörg lopettaa saman keskustelun?", ["Tag!", "Tschüss!", "Morgen!"], 1,
    "Jörg hyvästelee sanalla Tschüss!."),
  choice(9, "Miten saksan sch-kirjainyhdistelmä yleensä ääntyy?", ["Suomen s-kirjaimen tavoin", "Suomen š-äänteen tavoin", "Suomen k-kirjaimen tavoin"], 1,
    "Sch vastaa yleensä š-äännettä, esimerkiksi sanassa schön."),
  choice(10, "Miten saksan z-kirjain yleensä ääntyy?", ["ts", "s", "v"], 0,
    "Saksan z vastaa yleensä ts-äänneyhdistelmää, esimerkiksi sanassa zehn."),
  gap(11, "Täydennä aamun tervehdys saksaksi yhdellä sanalla.", "Guten", "!", ["Morgen"],
    "Guten Morgen! tarkoittaa 'hyvää huomenta'."),
  gap(12, "Täydennä Text A:ssa esiintyvä hyvästely yhdellä sanalla.", "Bis", "!", ["später"],
    "Franz sanoo Bis später!, 'nähdään myöhemmin'."),
];

export const LOS1_C01_SPEECH_CRITERIA = [
  { id: "greeting", title: "Sanoin ääneen yhden tervehdyksen, esimerkiksi Hallo! tai Guten Tag!." },
  { id: "parting", title: "Sanoin ääneen yhden hyvästelyn, esimerkiksi Tschüss!." },
  { id: "situation", title: "Pystyn valitsemaan aamun ja illan tervehdyksen käyttötilanteen perusteella." },
] as const;

export const LOS1_C01_TEST = {
  id: "los1-c01-chapter-test",
  version: "0.1.0",
  title: "C01 · Hallo! · Kappaletesti",
  introductoryFi: "Vastaa ilman tehtäväkohtaisia vihjeitä ja palauta kaikki 12 osatehtävää kerralla. "
    + "Tarkat ratkaisut ja pisteet näkyvät vasta palautuksen jälkeen. "
    + "Tee myös puheen itsearviointi, joka ei vaikuta automaattisiin pisteisiin.",
  exerciseIds: LOS1_C01_EXAM_EXERCISES.map(exercise => exercise.id),
  speechCriteria: LOS1_C01_SPEECH_CRITERIA,
} as const;
