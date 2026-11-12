/**
 * LOS! 1 L001-L006: independent lesson completion evidence.
 * Lesson progress is stored in the existing C01 chapter draft, so owner-scoped
 * local storage, JSON backups and optional manual sync share the same data.
 * Completion is not a claim of mastery, and opening a link is not completion.
 */
import type { LosChapterDraft } from "./studyState";

export type LosLessonSection =
  "overview" | "contents" | "text" | "understand" | "vocabulary" | "review" | "review-ii" | "midterm" |
  "grammar" | "text-b" | "practice" | "apply" | "culture" | "test" | "final" | "summary";
export type LosLessonStep = {
  id: string;
  label: string;
  instruction: string;
  chapter: string | null;
  section: LosLessonSection;
  minutes: number;
};
export type LosEvidenceRequirement = {
  kind: "checked-source" | "answered-practice" | "chapter-test" | "written-application" | "self-assessment";
  ids?: readonly string[];
  label: string;
};
export type LosLessonBlueprint = {
  id: string;
  title: string;
  objective: string;
  estimatedMinutes: number;
  contentVersion: "1.0.0";
  steps: readonly LosLessonStep[];
  evidence: readonly LosEvidenceRequirement[];
  check: {
    question: string;
    answers: readonly { id: string; text: string }[];
    correctId: string;
    explanation: string;
  };
};
export type LosLessonProgress = {
  contentVersion: "1.0.0";
  startedAt: string | null;
  completedStepIds: string[];
  exitAnswer: string | null;
  exitCheckedAt: string | null;
  completedAt: string | null;
};

export const LOS1_C01_LESSON_BLUEPRINTS: readonly LosLessonBlueprint[] = [
  {
    id: "L001", title: "Miten LOS! 1:llä opiskellaan?",
    objective: "Osaan löytää oppikirjan tekstin, tehtävät ja sanaselitykset.",
    estimatedMinutes: 30, contentVersion: "1.0.0",
    steps: [
      { id: "guide", label: "Tutustu kirjaan", instruction: "Lue aloitussivun tavoite ja päätä, mitä haluat oppia ensimmäiseksi.", chapter: null, section: "overview", minutes: 8 },
      { id: "contents", label: "Avaa sisällysluettelo", instruction: "Etsi kappale 1, sen sanasto ja tekstiosio. Opetuspolku on vapaaehtoinen.", chapter: null, section: "contents", minutes: 8 },
      { id: "reader", label: "Kokeile sanaselitystä", instruction: "Avaa C01:n oikea teksti ja napauta yhtä saksankielistä sanaa. Tekstin ymmärtäminen kokonaan ei ole vielä tavoitteena.", chapter: "01", section: "text", minutes: 10 },
    ], evidence: [],
    check: {
      question: "Miten LOS!:ssa saat selville vieraan saksankielisen sanan merkityksen?",
      answers: [{ id: "a", text: "Napautan sanaa lukijassa." }, { id: "b", text: "Minun on poistuttava ulkoiselle sivulle." }, { id: "c", text: "Minun on osattava sana jo ennestään." }],
      correctId: "a", explanation: "LOS!:n lukijassa sana avaa kontekstiin sopivan suomenkielisen selityksen.",
    },
  },
  {
    id: "L002", title: "Aloita saksan ääntämisestä",
    objective: "Tunnistan w-, z-, ei-, ie- ja sch-kirjoitusasujen ensimmäisiä ääntämissääntöjä.",
    estimatedMinutes: 30, contentVersion: "1.0.0",
    steps: [
      { id: "sounds", label: "Opiskele ääntämissäännöt", instruction: "Lue kielioppisivun ääntämistaulukko. Sano esimerkit ääneen.", chapter: "01", section: "grammar", minutes: 10 },
      { id: "words", label: "Tutustu sanastoon", instruction: "Etsi sanastosta tuttu tervehdys ja kertaa sen kirjoitusasu.", chapter: "01", section: "vocabulary", minutes: 7 },
      { id: "audio", label: "Kuuntele aitoa keskustelua", instruction: "Kuuntele Franzin ja Jörgin alkuperäisäänite, jos toisto onnistuu. Äänitteen toimivuus on vielä laitetestauksen piirissä; ongelmatilanteessa lue repliikit itse ääneen.", chapter: "01", section: "text", minutes: 9 },
    ], evidence: [],
    check: {
      question: "Miten saksan kirjainyhdistelmä ei yleensä ääntyy?",
      answers: [{ id: "a", text: "Kuten suomen pitkä i" }, { id: "b", text: "Suunnilleen ai" }, { id: "c", text: "Kuten suomen ei" }],
      correctId: "b", explanation: "Saksassa ei ääntyy yleensä ai, esimerkiksi sanassa mein. Yhdistelmä ie puolestaan tarkoittaa tavallisesti pitkää i-äännettä.",
    },
  },
  {
    id: "L003", title: "Lue Franzin ja Jörgin keskustelu",
    objective: "Löydän alkuperäisestä keskustelusta puhujat ja tervehdyksen.",
    estimatedMinutes: 30, contentVersion: "1.0.0",
    steps: [
      { id: "read", label: "Lue koko kahdeksan repliikin teksti", instruction: "Kuuntele, lue ja kokeile sanaselityksiä. Nimeä kaksi puhujaa.", chapter: "01", section: "text", minutes: 10 },
      { id: "understand", label: "Vastaa lähdekysymyksiin", instruction: "Tarkista ymmärtämissivun tehtävät 1 ja 2. Vastaus ja tarkistus tallentuvat samaan kappaleluonnokseen.", chapter: "01", section: "understand", minutes: 12 },
      { id: "highlight", label: "Merkitse keskeinen ilmaus", instruction: "Kokeile neliväristä korostustussia tekstissä ja kertaa yksi tervehdys ilman käännöstä.", chapter: "01", section: "text", minutes: 4 },
    ],
    evidence: [{ kind: "checked-source", ids: ["C01-SOURCE-Q01", "C01-SOURCE-Q02"], label: "Ymmärtämistehtävät 1 ja 2 on vastattu ja tarkistettu." }],
    check: {
      question: "Ketkä puhuvat alkuperäisessä C01-keskustelussa?",
      answers: [{ id: "a", text: "Franz ja Jörg" }, { id: "b", text: "Heinrich ja Karl" }, { id: "c", text: "Franz ja Greta" }],
      correctId: "a", explanation: "Puhujien nimet näkyvät alkuperäisen keskustelun kahdeksan repliikin edessä.",
    },
  },
  {
    id: "L004", title: "Tervehdykset muistista",
    objective: "Valitsen aamuun sopivan tervehdyksen ja arkisen hyvästelyn.",
    estimatedMinutes: 30, contentVersion: "1.0.0",
    steps: [
      { id: "review", label: "Peitä suomennokset", instruction: "Kertaa aamun, päivän ja illan tervehdykset sanastosivulta. Tarkista vasta sitten suomennokset.", chapter: "01", section: "vocabulary", minutes: 8 },
      { id: "practice", label: "Harjoittele ilman mallia", instruction: "Vastaa vähintään harjoitustehtäviin C01-EX-01 ja C01-EX-04. Voit tarkistaa ja korjata vastaukset.", chapter: "01", section: "practice", minutes: 15 },
      { id: "repeat", label: "Sano ilmaukset ääneen", instruction: "Toista Guten Morgen! ja Tschüss! ääneen ilman näkyvää mallia. Puhetta ei automaattisesti pisteytetä.", chapter: "01", section: "practice", minutes: 3 },
    ],
    evidence: [{ kind: "answered-practice", ids: ["C01-EX-01", "C01-EX-04"], label: "Harjoituksiin C01-EX-01 ja C01-EX-04 on tallennettu vastaukset." }],
    check: {
      question: "Miten hyvästelet tutun ystävän rennosti?",
      answers: [{ id: "a", text: "Guten Morgen!" }, { id: "b", text: "Tschüss!" }, { id: "c", text: "Guten Tag!" }],
      correctId: "b", explanation: "Tschüss! on tavallinen epämuodollinen hyvästely.",
    },
  },
  {
    id: "L005", title: "Kuuntele ja valitse tervehdys",
    objective: "Tunnistan tervehdyksen ja hyvästelyn autenttisesta puheesta.",
    estimatedMinutes: 30, contentVersion: "1.0.0",
    steps: [
      { id: "greetings", label: "Kuuntele tervehdysluettelo", instruction: "Avaa Text B:n ihmisen lukema tervehdysäänite. Jos toisto ei ole saatavilla, tee luku- ja tekstitehtävät eikä äänitettä väitetä kuulluksi.", chapter: "01", section: "text-b", minutes: 9 },
      { id: "dialogue", label: "Vertaa dialogiin", instruction: "Palaa C01:n alkuperäiseen keskusteluun. Etsi alun ja lopun tervehdykset.", chapter: "01", section: "text", minutes: 9 },
      { id: "questions", label: "Tarkista kaksi lähdekysymystä", instruction: "Tee ymmärtämistehtävät 3 ja 4 sekä tarkista vastauksesi.", chapter: "01", section: "understand", minutes: 8 },
    ],
    evidence: [{ kind: "checked-source", ids: ["C01-SOURCE-Q03", "C01-SOURCE-Q04"], label: "Ymmärtämistehtävät 3 ja 4 on vastattu ja tarkistettu." }],
    check: {
      question: "Mikä Franzin ilmaus tarkoittaa nähdään myöhemmin?",
      answers: [{ id: "a", text: "Bis später!" }, { id: "b", text: "Guten Morgen!" }, { id: "c", text: "Wie alt bist du?" }],
      correctId: "a", explanation: "Bis später! tarkoittaa nähdään myöhemmin. Äänitteen kuulemista ei arvioida automaattisesti.",
    },
  },
  {
    id: "L006", title: "Harjoittele ja testaa C01",
    objective: "Sovellan tervehdysfraaseja ja palautan ensimmäisen kappaletestin.",
    estimatedMinutes: 30, contentVersion: "1.0.0",
    steps: [
      { id: "apply", label: "Kirjoita oma kohtaaminen", instruction: "Kirjoita C01:n soveltamissivulla kaksi tervehdystä ja hyvästely. Kirjoitusta ei pisteytetä koneellisesti.", chapter: "01", section: "apply", minutes: 8 },
      { id: "culture", label: "Lue tervehdyksistä", instruction: "Tutustu Moin!- ja Servus!-esimerkkeihin. Ne ovat tunnistamissanastoa.", chapter: "01", section: "culture", minutes: 5 },
      { id: "test", label: "Palauta kappaletesti", instruction: "Vastaa kaikkiin C01:n rajattuihin muoto- ja fraasitehtäviin ja palauta testi. Tulos ei yksin ole koko kielitaidon arvio.", chapter: "01", section: "test", minutes: 13 },
    ],
    evidence: [{ kind: "chapter-test", label: "C01:n kappaletesti on palautettu." }],
    check: {
      question: "Mikä ilmaus sopii toivotettaessa hyvää yötä nukkumaan menevälle?",
      answers: [{ id: "a", text: "Guten Tag!" }, { id: "b", text: "Guten Abend!" }, { id: "c", text: "Gute Nacht!" }],
      correctId: "c", explanation: "Gute Nacht! on hyvän yön toivotus. Guten Abend! on illan tervehdys.",
    },
  },
];

/** Existing v1 drafts can omit lessonProgress. Do not overwrite other draft fields. */
export function emptyLosLessonProgress(): LosLessonProgress {
  return { contentVersion: "1.0.0", startedAt: null, completedStepIds: [], exitAnswer: null, exitCheckedAt: null, completedAt: null };
}
const isIso = (s: unknown): s is string =>
  typeof s === "string" && s.length <= 40 && /^\d{4}-\d{2}-\d{2}T/.test(s) && Number.isFinite(Date.parse(s));
export function validateLosLessonProgressMap(value: unknown): value is Record<string, LosLessonProgress> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const entries = Object.entries(value);
  if (entries.length > 60) return false;
  return entries.every(([id, raw]) => {
    if (!/^L\d{3}$/.test(id) || !raw || typeof raw !== "object" || Array.isArray(raw)) return false;
    const p = raw as Partial<LosLessonProgress>;
    return p.contentVersion === "1.0.0" &&
      (p.startedAt === null || isIso(p.startedAt)) &&
      Array.isArray(p.completedStepIds) && p.completedStepIds.length <= 20 &&
      new Set(p.completedStepIds).size === p.completedStepIds.length &&
      p.completedStepIds.every(x => typeof x === "string" && x.length <= 60) &&
      (p.exitAnswer === null || (typeof p.exitAnswer === "string" && p.exitAnswer.length <= 20)) &&
      (p.exitCheckedAt === null || isIso(p.exitCheckedAt)) &&
      (p.completedAt === null || isIso(p.completedAt));
  });
}
export function parseLosLessonProgressMap(value: unknown): Record<string, LosLessonProgress> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([id, entry]) =>
    validateLosLessonProgressMap({ [id]: entry })
  ).slice(0, 60)) as Record<string, LosLessonProgress>;
}
export function losLessonEvidenceMet(lesson: LosLessonBlueprint, draft: Pick<LosChapterDraft, "practiceAnswers" | "practiceChecked" | "testSubmittedAt"> & Partial<Pick<LosChapterDraft, "applicationDraft" | "selfAssessment">>): boolean {
  return lesson.evidence.every(item => {
    if (item.kind === "chapter-test") return Boolean(draft.testSubmittedAt);
    if (item.kind === "written-application") return Boolean(draft.applicationDraft && draft.applicationDraft.trim().length >= 80);
    if (item.kind === "self-assessment") return Boolean(draft.selfAssessment && draft.selfAssessment.trim().length >= 15);
    if (item.kind === "checked-source") return (item.ids ?? []).every(id =>
      draft.practiceChecked.includes(id) && Boolean(draft.practiceAnswers[id]));
    return (item.ids ?? []).every(id => Boolean(draft.practiceAnswers[id]?.trim()));
  });
}
export function losLessonCanComplete(lesson: LosLessonBlueprint, progress: LosLessonProgress, draft: Pick<LosChapterDraft, "practiceAnswers" | "practiceChecked" | "testSubmittedAt"> & Partial<Pick<LosChapterDraft, "applicationDraft" | "selfAssessment">>): boolean {
  return lesson.steps.every(step => progress.completedStepIds.includes(step.id)) &&
    progress.exitCheckedAt !== null &&
    lesson.check.answers.some(option => option.id === progress.exitAnswer) &&
    losLessonEvidenceMet(lesson, draft);
}
export function losLessonMarkStep(lesson: LosLessonBlueprint, progress: LosLessonProgress, stepId: string, now: string): LosLessonProgress {
  if (!lesson.steps.some(step => step.id === stepId) || progress.completedAt) return progress;
  return {
    ...progress, startedAt: progress.startedAt ?? now,
    completedStepIds: Array.from(new Set([...progress.completedStepIds, stepId])),
  };
}
export function losLessonSubmitCheck(lesson: LosLessonBlueprint, progress: LosLessonProgress, answerId: string, now: string): LosLessonProgress {
  if (progress.completedAt || !lesson.check.answers.some(answer => answer.id === answerId)) return progress;
  return { ...progress, startedAt: progress.startedAt ?? now, exitAnswer: answerId, exitCheckedAt: now };
}
export function losLessonFinish(lesson: LosLessonBlueprint, progress: LosLessonProgress, draft: Pick<LosChapterDraft, "practiceAnswers" | "practiceChecked" | "testSubmittedAt"> & Partial<Pick<LosChapterDraft, "applicationDraft" | "selfAssessment">>, now: string): LosLessonProgress {
  return progress.completedAt || !losLessonCanComplete(lesson, progress, draft) ? progress : { ...progress, completedAt: now };
}
