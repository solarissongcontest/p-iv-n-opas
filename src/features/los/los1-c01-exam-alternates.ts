/** Second approved-form candidate for the C01 self-study chapter test.
 * Distinct authored questions, not shuffled original options. Every fact
 * is taught in the C01 core grammar, Text A or complete Text B audio list.
 * These 12 examples may be interleaved across retries while preserving objectives.
 */
import type { Exercise } from "./model";
const base = {
  version: "0.1.0", objectives: ["L1-INT-01", "L1-PHON-01"],
  difficulty: "basic" as const,
};
const choice = (id: number, promptFi: string, labels: [string, string, string],
  correctIndex: 0 | 1 | 2, explanationFi: string): Exercise => ({
  ...base, id: "los1-c01-exam-alt-" + String(id).padStart(2, "0"),
  type: "single-choice", promptFi, explanationFi,
  options: labels.map((label, index) => ({ id: "choice-" + (index + 1), label })),
  correctOptionId: "choice-" + (correctIndex + 1),
});
const gap = (id: number, promptFi: string, before: string, after: string,
  acceptedAnswers: string[], explanationFi: string): Exercise => ({
  ...base, id: "los1-c01-exam-alt-" + String(id).padStart(2, "0"),
  type: "gap-fill", promptFi, explanationFi, sentenceBefore: before,
  sentenceAfter: after, acceptedAnswers,
});

export const LOS1_C01_ALTERNATE_EXAM_EXERCISES: Exercise[] = [
  choice(1, "Text B:n kuuntelussa sanotaan Guten Morgen ja lyhyt variantti. Mikä niistä on lyhyt aamun tervehdys?",
    ["Morgen!", "Gute Nacht!", "Bis bald!"], 0,
    "Morgen! on Guten Morgen! -tervehdyksen lyhyempi muoto. Molemmat kuuluvat Text B:n alkuperäiseen äänitteeseen."),
  choice(2, "Minkä lyhyen päivätervehdyksen tunnistat Text B:n alkuperäisestä ilmauslistasta?",
    ["Bis dann!", "Tag!", "Tschüss!"], 1,
    "Tag! on lyhyempi päivätervehdys kuin Guten Tag! ja esiintyy Text B:ssä."),
  choice(3, "On ilta ja saavut tapaamaan saksankielistä tuttavaa. Mikä näistä on nimenomaan iltatervehdys?",
    ["Guten Abend!", "Auf Wiedersehen!", "Gute Nacht!"], 0,
    "Guten Abend! sopii illalla tervehtimiseen. Gute Nacht! liittyy hyvän yön toivotukseen."),
  choice(4, "Ystäväsi menee nukkumaan. Mitä toivotat?",
    ["Guten Tag!", "Gute Nacht!", "Guten Abend!"], 1,
    "Gute Nacht! tarkoittaa 'hyvää yötä', ja sen voi sanoa esimerkiksi nukkumaan mennessä."),
  choice(5, "Mikä seuraavista Text B:n ilmauksista on arkinen hyvästely?",
    ["Tschau!", "Guten Morgen!", "Tag!"], 0,
    "Tschau! on arkinen hyvästely, joka esiintyy Text B:n alkuperäisessä ilmauslistassa."),
  gap(6, "Täydennä kohtelias hyvästely. Kirjoita puuttuva sana.",
    "Auf", "!", ["Wiedersehen"],
    "Auf Wiedersehen! tarkoittaa näkemiin ja on kohteliaampi kuin Tschüss!."),
  choice(7, "Mikä sama tervehdys esiintyy sekä Franzin että Jörgin ensimmäisessä repliikissä Text A:ssa?",
    ["Hallo", "Guten Abend", "Bitte"], 0,
    "Molemmat puhujat aloittavat ensimmäisen repliikkinsä sanalla Hallo."),
  choice(8, "Minkä hyvästelyn Franz sanoo juuri ennen kuin Jörg vastaa Tschüss!?",
    ["Guten Tag!", "Bis später!", "Bis bald!"], 1,
    "Franz sanoo Bis später!, joka tarkoittaa 'nähdään myöhemmin'."),
  choice(9, "Valitse oikea kirjainyhdistelmä: saksan sanassa schön alun š-ääni merkitään...",
    ["sch", "ei", "ie"], 0,
    "Sch vastaa saksan kielessä tavallisesti š-äännettä, esimerkiksi sanassa schön."),
  choice(10, "Kuuntelet sanaa zehn. Mitä suomalaiselle tuttua äänneyhdistelmää sen alkukirjain z muistuttaa?",
    ["v", "ts", "š"], 1,
    "Saksan z ääntyy yleensä ts:n tavoin, esimerkiksi sanassa zehn."),
  gap(11, "Täydennä iltatervehdys yhdellä sanalla.",
    "Guten", "!", ["Abend"],
    "Guten Abend! tarkoittaa hyvää iltaa."),
  gap(12, "Täydennä Text B:ssä kuultava ilmaus 'nähdään pian'.",
    "Bis", "!", ["bald"],
    "Bis bald! tarkoittaa 'nähdään pian' ja esiintyy Text B:n alkuperäisessä äänitteessä."),
];
