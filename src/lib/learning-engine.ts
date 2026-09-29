import type {
  CapacityProfile,
  Course,
  Mistake,
  PlanItem,
  PracticeAttempt,
  PracticeTest,
  Session,
  Topic,
} from "./domain.ts";
import { addDays, diffDays, parseISO, startOfWeek, today } from "./fi.ts";

export const LEARNING_SCHEMA_VERSION = 3;

export type LearningOutcome = "correct" | "partial" | "incorrect";
export type LearningAttemptType =
  | "free_recall"
  | "short_answer"
  | "calculation"
  | "application"
  | "multiple_choice"
  | "explanation"
  | "ordering"
  | "error_detection"
  | "simulation"
  | "recognition";

export type LearningSource =
  | "practice"
  | "review"
  | "study_session"
  | "exam"
  | "mistake_repair";

export type TopicLearningState = {
  topicId: string;
  masteryLevel: number;
  masteryLabel: "Ei vielä arvioitu" | "Aloita tästä" | "Harjoittele" | "Kehittyvä" | "Melko varma" | "Vahva";
  masteryConfidence: number;
  evidenceCount: number;
  strongEvidenceCount: number;
  recallStrength: number;
  applicationStrength: number;
  retentionStrength: number;
  lastRetrieval: string | null;
  lastSuccessfulRetrieval: string | null;
  nextReview: string | null;
  forgettingRisk: number;
  examRelevance: number;
  uncertainty: number;
};

export type RichLearningAttempt = PracticeAttempt & {
  schema_version?: number;
  outcome?: LearningOutcome | null;
  hints_used?: number;
  response_time_ms?: number | null;
  source?: LearningSource;
  evidence_quality?: number;
  skills?: string[];
  expected_concepts?: string[];
  question_payload?: Record<string, unknown>;
};

export type PracticeQuestion = {
  id: string;
  topicId: string;
  type: LearningAttemptType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  hints: string[];
  skills: string[];
  expectedConcepts: string[];
  explanation: string;
};

export type RecoveryItem = {
  topic: Topic;
  state: TopicLearningState;
  priority: number;
  reason: string;
  minutes: number;
};

export type RecoveryQueue = {
  items: RecoveryItem[];
  hiddenCount: number;
  total: number;
  estimatedMinutes: number;
};

export type ExamStageKey = "coverage" | "retrieval" | "mixed" | "transfer" | "simulation" | "repair";

export const EXAM_STAGES: Array<{ key: ExamStageKey; label: string; description: string }> = [
  { key: "coverage", label: "Coverage", description: "Käsittele kaikki koealueen aiheet ainakin kerran." },
  { key: "retrieval", label: "Retrieval", description: "Palauta asiat mieleen ilman materiaalia." },
  { key: "mixed", label: "Mixed Practice", description: "Tunnista ensin, mitä menetelmää tehtävä vaatii." },
  { key: "transfer", label: "Transfer", description: "Sovella osaamista uusiin tilanteisiin." },
  { key: "simulation", label: "Simulation", description: "Tee koetta muistuttava kokonaisuus." },
  { key: "repair", label: "Repair", description: "Korjaa harjoituskokeessa löytyneet aukot." },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function legacyOutcome(attempt: PracticeAttempt): LearningOutcome {
  const rich = attempt as RichLearningAttempt;
  if (rich.outcome === "correct" || rich.outcome === "partial" || rich.outcome === "incorrect") return rich.outcome;
  if (attempt.result === "independent") return "correct";
  if (attempt.result === "hinted") return "partial";
  return "incorrect";
}

function hintsUsed(attempt: PracticeAttempt): number {
  const rich = attempt as RichLearningAttempt;
  if (typeof rich.hints_used === "number") return Math.max(0, rich.hints_used);
  return attempt.hint_used ? 1 : 0;
}

function attemptType(attempt: PracticeAttempt): LearningAttemptType {
  const value = attempt.attempt_type as LearningAttemptType;
  return value;
}

function attemptQuality(attempt: PracticeAttempt): number {
  const rich = attempt as RichLearningAttempt;
  if (typeof rich.evidence_quality === "number") return clamp(rich.evidence_quality);
  const outcome = legacyOutcome(attempt);
  const result = outcome === "correct" ? 1 : outcome === "partial" ? 0.55 : 0.15;
  const difficulty = clamp((Number(attempt.difficulty || 1) - 1) / 4, 0, 1);
  const delay = clamp((Number(attempt.delay_days || 0)) / 14, 0, 1);
  const hintPenalty = Math.min(0.45, hintsUsed(attempt) * 0.15);
  const confidencePenalty =
    attempt.confidence == null ? 0 :
    outcome === "correct" && attempt.confidence <= 1 ? 0.07 :
    outcome === "incorrect" && attempt.confidence >= 3 ? 0.05 :
    0;
  return clamp(result * (0.72 + difficulty * 0.18 + delay * 0.18) - hintPenalty - confidencePenalty);
}

function isApplication(type: LearningAttemptType) {
  return ["application", "calculation", "simulation", "error_detection"].includes(type);
}

function evidenceRows(topic: Topic, attempts: PracticeAttempt[]) {
  return attempts
    .filter((attempt) => attempt.topic_id === topic.id)
    .sort((a, b) => (a.created_at ?? a.date).localeCompare(b.created_at ?? b.date));
}

export function deriveTopicLearningState(
  topic: Topic,
  attempts: PracticeAttempt[],
  options: { now?: string; examDate?: string | null } = {},
): TopicLearningState {
  const now = options.now ?? today();
  const rows = evidenceRows(topic, attempts);
  const qualities = rows.map(attemptQuality);
  const weighted = rows.map((attempt, index) => {
    const recency = rows.length <= 1 ? 1 : 0.65 + 0.35 * ((index + 1) / rows.length);
    return attemptQuality(attempt) * recency;
  });
  const evidenceCount = rows.length || Number(topic.retrieval_attempts || 0);
  const strongEvidenceCount = rows.filter((attempt) => attemptQuality(attempt) >= 0.68).length
    || Number(topic.basic_successes || 0) + Number(topic.exam_successes || 0) + Number(topic.delayed_successes || 0);

  const mean = weighted.length ? weighted.reduce((sum, value) => sum + value, 0) / weighted.length : 0;
  const correctness = rows.length
    ? rows.reduce((sum, attempt) => sum + (legacyOutcome(attempt) === "correct" ? 1 : legacyOutcome(attempt) === "partial" ? 0.45 : 0), 0) / rows.length
    : Math.min(1, Number(topic.verified_level || 0) / 5);

  const recallRows = rows.filter((attempt) => ["free_recall", "short_answer", "explanation", "recognition"].includes(attemptType(attempt)));
  const appRows = rows.filter((attempt) => isApplication(attemptType(attempt)));
  const delayedRows = rows.filter((attempt) => Number(attempt.delay_days || 0) >= 3);

  const strength = (subset: PracticeAttempt[], fallback: number) =>
    subset.length
      ? subset.reduce((sum, attempt) => sum + attemptQuality(attempt), 0) / subset.length
      : fallback;

  const recallStrength = strength(recallRows, mean);
  const applicationStrength = strength(appRows, mean * 0.8);
  const retentionStrength = strength(delayedRows, mean * 0.7);

  const last = rows.at(-1);
  const successful = [...rows].reverse().find((attempt) => legacyOutcome(attempt) === "correct");
  const lastDate = last?.date ?? topic.last_retrieval_at ?? topic.last_review ?? null;
  const lastSuccess = successful?.date ?? (topic.delayed_successes > 0 ? topic.last_review : null);

  const age = lastDate ? Math.max(0, diffDays(now, lastDate)) : 30;
  const evidenceUncertainty = 1 / Math.sqrt(Math.max(1, evidenceCount + strongEvidenceCount));
  const disagreement = rows.length >= 2
    ? Math.abs(correctness - mean)
    : Number(topic.mastery_uncertainty ?? 1) * 0.35;
  const uncertainty = clamp(
    Number.isFinite(Number(topic.mastery_uncertainty))
      ? Math.min(Number(topic.mastery_uncertainty), evidenceUncertainty + disagreement)
      : evidenceUncertainty + disagreement,
    0.08,
    1,
  );
  const masteryConfidence = clamp(1 - uncertainty);

  const blended = clamp(
    mean * 0.42 +
      recallStrength * 0.2 +
      applicationStrength * 0.2 +
      retentionStrength * 0.18,
  );

  let masteryLevel = 0;
  if (evidenceCount > 0 || topic.progress >= 20) masteryLevel = 1;
  if (evidenceCount >= 1 && blended >= 0.38) masteryLevel = 2;
  if (strongEvidenceCount >= 2 && blended >= 0.52) masteryLevel = 3;
  if (strongEvidenceCount >= 3 && applicationStrength >= 0.58 && blended >= 0.64) masteryLevel = 4;
  if (strongEvidenceCount >= 5 && retentionStrength >= 0.65 && applicationStrength >= 0.67 && blended >= 0.74) masteryLevel = 5;

  const masteryLabel: TopicLearningState["masteryLabel"] =
    evidenceCount === 0 && topic.progress < 20 ? "Ei vielä arvioitu" :
    masteryLevel <= 1 ? "Aloita tästä" :
    masteryLevel === 2 ? "Harjoittele" :
    masteryLevel === 3 ? "Kehittyvä" :
    masteryLevel === 4 ? "Melko varma" :
    "Vahva";

  const baseHalfLife = [1, 2, 4, 8, 16, 30][masteryLevel] ?? 1;
  const forgettingRisk = clamp((age / Math.max(1, baseHalfLife)) * (0.55 + uncertainty * 0.75));

  const daysToExam = options.examDate ? diffDays(options.examDate, now) : null;
  const examRelevance = daysToExam == null || daysToExam < 0
    ? 0
    : clamp(1 - Math.min(45, daysToExam) / 45);

  return {
    topicId: topic.id,
    masteryLevel,
    masteryLabel,
    masteryConfidence,
    evidenceCount,
    strongEvidenceCount,
    recallStrength,
    applicationStrength,
    retentionStrength,
    lastRetrieval: lastDate,
    lastSuccessfulRetrieval: lastSuccess,
    nextReview: topic.next_review,
    forgettingRisk,
    examRelevance,
    uncertainty,
  };
}

export function evidenceSummary(state: TopicLearningState, topic: Topic, attempts: PracticeAttempt[]) {
  const rows = evidenceRows(topic, attempts);
  const independent = rows.filter((attempt) => legacyOutcome(attempt) === "correct" && hintsUsed(attempt) === 0).length;
  const applications = rows.filter((attempt) => legacyOutcome(attempt) === "correct" && isApplication(attemptType(attempt))).length;
  const delayed = rows.filter((attempt) => legacyOutcome(attempt) === "correct" && Number(attempt.delay_days || 0) >= 3).length;
  const parts = [
    independent ? `${independent} itsenäistä onnistumista` : null,
    applications ? `${applications} onnistunutta soveltavaa tehtävää` : null,
    delayed ? `${delayed} onnistunutta viivästettyä palautusta` : null,
    state.masteryConfidence < 0.45 ? "näyttöä vielä vähän" : null,
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : "Ei vielä tarpeeksi näyttöä.";
}

export function nextReviewDateV3(
  state: TopicLearningState,
  lastAttempt: PracticeAttempt | null,
  options: { now?: string; examDate?: string | null; importance?: number } = {},
) {
  const now = options.now ?? today();
  if (!lastAttempt) return addDays(now, 1);
  const outcome = legacyOutcome(lastAttempt);
  const quality = attemptQuality(lastAttempt);
  const hints = hintsUsed(lastAttempt);
  const confidence = lastAttempt.confidence ?? null;

  let gap = [1, 2, 3, 6, 12, 24][state.masteryLevel] ?? 1;
  if (outcome === "incorrect") gap = 1;
  else if (outcome === "partial") gap = Math.min(gap, 2);
  else {
    if (quality >= 0.8) gap = Math.round(gap * 1.6);
    else if (quality >= 0.65) gap = Math.round(gap * 1.25);
    if (Number(lastAttempt.delay_days || 0) >= 7) gap = Math.round(gap * 1.35);
    if (hints >= 2) gap = Math.min(gap, 2);
    else if (hints === 1) gap = Math.min(gap, 4);
    if (confidence === 1) gap = Math.min(gap, 3);
  }

  if (state.uncertainty >= 0.65) gap = Math.min(gap, 2);
  else if (state.uncertainty >= 0.45) gap = Math.min(gap, 4);

  if ((options.importance ?? 3) >= 5) gap = Math.min(gap, Math.max(2, Math.round(gap * 0.85)));

  if (options.examDate) {
    const days = diffDays(options.examDate, now);
    if (days >= 0 && days <= 7) gap = Math.min(gap, 2);
    else if (days <= 14) gap = Math.min(gap, 4);
  }
  return addDays(now, Math.max(1, Math.min(60, gap)));
}

function reviewReason(topic: Topic, state: TopicLearningState, now: string, examDate?: string | null, failed = false) {
  const reasons: string[] = [];
  if (failed) reasons.push("viimeisin yritys tarvitsee korjauksen");
  if (topic.next_review && topic.next_review <= now) reasons.push("kertaus on ajankohtainen");
  if (state.forgettingRisk >= 0.75) reasons.push("unohtumisriski on korkea");
  if (state.uncertainty >= 0.6) reasons.push("osaamisnäyttö on vielä epävarmaa");
  if (examDate) {
    const days = diffDays(examDate, now);
    if (days >= 0 && days <= 14) reasons.push(`koe on ${days} päivän päästä`);
  }
  return reasons.slice(0, 2).join(" ja ") || "lyhyt kertaus vahvistaa muistijälkeä";
}

export function buildRecoveryQueue(input: {
  topics: Topic[];
  attempts: PracticeAttempt[];
  courses?: Course[];
  now?: string;
  capacityMinutes?: number;
  maxItems?: number;
}): RecoveryQueue {
  const now = input.now ?? today();
  const maxItems = input.maxItems ?? 3;
  const latestByTopic = new Map<string, PracticeAttempt>();
  for (const attempt of input.attempts) {
    const previous = latestByTopic.get(attempt.topic_id);
    if (!previous || (previous.created_at ?? previous.date) < (attempt.created_at ?? attempt.date)) {
      latestByTopic.set(attempt.topic_id, attempt);
    }
  }

  const ranked = input.topics
    .filter((topic) => topic.verified_level > 0 || topic.retrieval_attempts > 0)
    .map((topic) => {
      const course = input.courses?.find((candidate) => candidate.id === topic.course_id);
      const state = deriveTopicLearningState(topic, input.attempts, { now, examDate: course?.exam_date ?? null });
      const latest = latestByTopic.get(topic.id);
      const failed = latest ? legacyOutcome(latest) === "incorrect" : false;
      const due = !!topic.next_review && topic.next_review <= now;
      const overdueDays = due ? Math.max(0, diffDays(now, topic.next_review!)) : 0;
      const priority =
        state.forgettingRisk * 35 +
        state.examRelevance * 22 +
        (Number(topic.importance || 3) / 5) * 18 +
        state.uncertainty * 17 +
        (failed ? 18 : 0) +
        Math.min(10, overdueDays);
      const minutes = failed || state.masteryLevel <= 2 ? 7 : 5;
      return {
        topic,
        state,
        priority,
        reason: reviewReason(topic, state, now, course?.exam_date ?? null, failed),
        minutes,
        due: due || failed || state.forgettingRisk >= 0.62,
      };
    })
    .filter((row) => row.due)
    .sort((a, b) => b.priority - a.priority);

  const capacity = Math.max(5, input.capacityMinutes ?? 20);
  const items: RecoveryItem[] = [];
  let minutes = 0;
  for (const row of ranked) {
    if (items.length >= maxItems) break;
    if (items.length > 0 && minutes + row.minutes > capacity) break;
    items.push(row);
    minutes += row.minutes;
  }
  if (!items.length && ranked[0]) {
    items.push(ranked[0]);
    minutes = ranked[0].minutes;
  }
  return {
    items,
    total: ranked.length,
    hiddenCount: Math.max(0, ranked.length - items.length),
    estimatedMinutes: minutes,
  };
}

const genericHints: Record<LearningAttemptType, string[]> = {
  free_recall: [
    "Nimeä ensin 2–3 keskeistä käsitettä muistista.",
    "Yhdistä käsitteet syy–seuraus- tai osa–kokonaisuus-suhteella.",
    "Tarkista materiaalista vain se kohta, joka jäi aukoksi, ja sulje materiaali uudelleen.",
  ],
  short_answer: [
    "Muotoile ensin yksi ydinväite.",
    "Lisää väitteelle yksi perustelu tai mekanismi.",
    "Vertaa vastaustasi oppimateriaalin käsitteisiin, älä kopioi lausetta.",
  ],
  calculation: [
    "Kirjaa mitä tiedetään ja mitä kysytään.",
    "Valitse periaate tai kaava ennen lukujen sijoittamista.",
    "Tarkista yksiköt ja arvioi, onko tuloksen suuruusluokka järkevä.",
  ],
  application: [
    "Tunnista ensin mikä tuttu periaate uudessa tilanteessa säilyy samana.",
    "Erota pintatiedot olennaisesta rakenteesta.",
    "Ratkaise yksi välivaihe ja perustele, miksi se seuraa edellisestä.",
  ],
  multiple_choice: [
    "Perustele ensin, miksi yksi vaihtoehto voisi olla oikea.",
    "Sulje pois vaihtoehdot yhden käsitteellisen virheen perusteella.",
    "Palaa kysymyksen täsmälliseen sanamuotoon ennen valintaa.",
  ],
  explanation: [
    "Aloita ilmiöstä: mitä tapahtuu?",
    "Lisää mekanismi: miksi se tapahtuu?",
    "Lisää seuraus tai esimerkki, joka osoittaa että ymmärrät yhteyden.",
  ],
  ordering: [
    "Etsi tapahtuma, jonka täytyy olla ensimmäinen.",
    "Tunnista riippuvuudet: mikä vaihe edellyttää edellistä?",
    "Tarkista järjestys kulkemalla ketju lopusta alkuun.",
  ],
  error_detection: [
    "Etsi ensimmäinen kohta, jossa perustelu tai yksikkö voi muuttua vääräksi.",
    "Tarkista käytetty sääntö ennen laskutoimitusta.",
    "Korjaa vain ensimmäinen virhe ja katso, muuttuuko loppuratkaisu.",
  ],
  simulation: [
    "Merkitse tehtävät joihin palaat myöhemmin, älä jää jumiin.",
    "Perustele menetelmän valinta ennen laskua tai vastausta.",
    "Käy lopuksi epävarmat vastaukset läpi ilman uuden materiaalin avaamista.",
  ],
  recognition: [
    "Nimeä kaksi tuntomerkkiä, jotka erottavat tämän aiheen lähiaiheesta.",
    "Kysy itseltäsi: mikä menetelmä toimisi, jos tehtävän numerot vaihdettaisiin?",
    "Etsi yksi harhaanjohtava tuntomerkki ja selitä miksi se ei ratkaise menetelmää.",
  ],
};

function questionTemplate(topic: Topic, type: LearningAttemptType, difficulty: number): PracticeQuestion {
  const id = `${topic.id}:${type}:${difficulty}`;
  const name = topic.name;
  const templates: Record<LearningAttemptType, { prompt: string; concepts: string[]; explanation: string }> = {
    free_recall: {
      prompt: `Palauta ilman muistiinpanoja kaikki olennainen aiheesta “${name}”. Rakenna vastaus käsitteistä ja niiden suhteista.`,
      concepts: ["keskeiset käsitteet", "yhteydet"],
      explanation: "Hyvä vapaa palautus sisältää ydinkäsitteet ja niiden väliset suhteet ilman materiaalin tunnistusapua.",
    },
    short_answer: {
      prompt: `Selitä omin sanoin aiheen “${name}” tärkein idea yhdellä väitteellä ja perustelulla.`,
      concepts: ["ydinväite", "perustelu"],
      explanation: "Lyhyt vastaus testaa, pystytkö tuottamaan käsitteen omin sanoin eikä vain tunnistamaan sitä.",
    },
    calculation: {
      prompt: `Tee aiheesta “${name}” tyypillinen lasku tai vaiheittainen ratkaisurunko. Nimeä annetut tiedot, menetelmä ja tarkistus.`,
      concepts: ["annetut tiedot", "menetelmä", "tarkistus"],
      explanation: "Ratkaisurungon pitää näyttää, että osaat valita menetelmän etkä vain toistaa kaavaa.",
    },
    application: {
      prompt: `Keksi uusi tilanne, jossa aihetta “${name}” pitää soveltaa. Selitä, mikä periaate siirtyy tuttuun tilanteeseen ja ratkaise ydinkohta.`,
      concepts: ["periaate", "soveltaminen"],
      explanation: "Soveltaminen mittaa siirtovaikutusta: tunnistatko saman rakenteen uudessa tilanteessa.",
    },
    multiple_choice: {
      prompt: `Muodosta aiheesta “${name}” neljä mahdollista väitettä. Valitse niistä todennäköisesti oikea ja perustele, millä käsitteellä suljet muut pois.`,
      concepts: ["valinta", "poissulku", "perustelu"],
      explanation: "Monivalinta on hyödyllinen vasta, kun perustelu pakottaa erottamaan samankaltaiset vaihtoehdot.",
    },
    explanation: {
      prompt: `Selitä aihe “${name}” muodossa mitä tapahtuu → miksi → mitä siitä seuraa.`,
      concepts: ["ilmiö", "mekanismi", "seuraus"],
      explanation: "Selittäminen pakottaa muodostamaan syy–seurausrakenteen eikä vain muistamaan irrallisia sanoja.",
    },
    ordering: {
      prompt: `Jos aiheessa “${name}” on vaiheita tai riippuvuuksia, järjestä ne loogiseen järjestykseen ja perustele kaksi siirtymää.`,
      concepts: ["järjestys", "riippuvuus"],
      explanation: "Järjestämistehtävä testaa prosessin rakennetta ja vaiheiden välisiä riippuvuuksia.",
    },
    error_detection: {
      prompt: `Kuvaa yksi uskottava virhe aiheessa “${name}”. Tunnista missä ajattelu menee ensimmäisen kerran väärin ja korjaa juuri se vaihe.`,
      concepts: ["virhe", "korjaus"],
      explanation: "Virheen tunnistaminen tekee väärinkäsityksestä näkyvän ja vahvistaa oikeaa menetelmää.",
    },
    simulation: {
      prompt: `Tee aiheesta “${name}” koetyylinen tehtävä ajastetusti ilman materiaalia. Kirjaa lopuksi kohta, josta olit epävarmin.`,
      concepts: ["koesuoritus", "itsenäisyys"],
      explanation: "Simulaatio yhdistää osaamisen, menetelmän valinnan ja työskentelyn ilman ulkoista tukea.",
    },
    recognition: {
      prompt: `Mistä tunnistat tehtävän, jossa aihe “${name}” on relevantti? Anna kaksi tuntomerkkiä ja yksi harhaanjohtava tuntomerkki.`,
      concepts: ["tuntomerkki", "erottelu"],
      explanation: "Tunnistamistehtävä harjoittaa menetelmän valintaa, kun lähiaiheet muistuttavat toisiaan.",
    },
  };
  const template = templates[type];
  return {
    id,
    topicId: topic.id,
    type,
    difficulty: Math.max(1, Math.min(5, difficulty)) as PracticeQuestion["difficulty"],
    prompt: template.prompt,
    hints: genericHints[type],
    skills: [topic.name],
    expectedConcepts: template.concepts,
    explanation: template.explanation,
  };
}

function desiredTypes(state: TopicLearningState, examStage?: ExamStageKey): LearningAttemptType[] {
  if (examStage === "retrieval") return ["free_recall", "short_answer", "explanation"];
  if (examStage === "mixed") return ["recognition", "calculation", "short_answer", "error_detection"];
  if (examStage === "transfer") return ["application", "error_detection", "explanation"];
  if (examStage === "simulation") return ["simulation", "application", "calculation"];
  if (examStage === "repair") return ["error_detection", "short_answer", "free_recall"];
  if (state.masteryLevel <= 1) return ["free_recall", "short_answer", "explanation"];
  if (state.masteryLevel === 2) return ["short_answer", "calculation", "free_recall", "recognition"];
  if (state.masteryLevel === 3) return ["calculation", "application", "recognition", "error_detection"];
  return ["application", "error_detection", "simulation", "recognition"];
}

export function selectPracticeQuestion(input: {
  topics: Topic[];
  attempts: PracticeAttempt[];
  selectedTopicId?: string | null;
  course?: Course | null;
  examStage?: ExamStageKey;
  index?: number;
  preferredTypes?: LearningAttemptType[];
}): { topic: Topic; state: TopicLearningState; question: PracticeQuestion; interleaved: boolean } | null {
  if (!input.topics.length) return null;
  const now = today();
  const states = input.topics.map((topic) => ({
    topic,
    state: deriveTopicLearningState(topic, input.attempts, { now, examDate: input.course?.exam_date ?? null }),
  }));
  const selected = states.find((row) => row.topic.id === input.selectedTopicId) ?? states[0]!;
  const selectedRecent = input.attempts.filter((attempt) => attempt.topic_id === selected.topic.id).slice(0, 3);

  let row = selected;
  let interleaved = false;
  const canInterleave = selected.state.masteryLevel >= 2 && states.length > 1;
  if (canInterleave && (input.index ?? 0) > 0) {
    const recentIds = new Set(input.attempts.slice(0, 4).map((attempt) => attempt.topic_id));
    const alternatives = states
      .filter((candidate) => candidate.topic.id !== selected.topic.id)
      .sort((a, b) => {
        const aRecent = recentIds.has(a.topic.id) ? 1 : 0;
        const bRecent = recentIds.has(b.topic.id) ? 1 : 0;
        return aRecent - bRecent || b.state.forgettingRisk - a.state.forgettingRisk || b.state.uncertainty - a.state.uncertainty;
      });
    if ((input.index ?? 0) % 3 === 1 && alternatives[0]) {
      row = alternatives[0];
      interleaved = true;
    }
  }

  const types = input.preferredTypes?.length ? input.preferredTypes : desiredTypes(row.state, input.examStage);
  const lastTypes = selectedRecent.map((attempt) => attemptType(attempt));
  const type = types.find((candidate) => !lastTypes.includes(candidate)) ?? types[(input.index ?? 0) % types.length]!;
  const difficulty =
    row.state.masteryLevel <= 1 ? 1 :
    row.state.masteryLevel === 2 ? 2 :
    row.state.masteryLevel === 3 ? 3 :
    row.state.masteryLevel === 4 ? 4 : 5;
  return { topic: row.topic, state: row.state, question: questionTemplate(row.topic, type, difficulty), interleaved };
}

export function hintAt(question: PracticeQuestion, level: number) {
  return question.hints[Math.max(0, Math.min(question.hints.length - 1, level - 1))] ?? question.hints.at(-1) ?? "";
}

export function examStage(input: {
  topics: Topic[];
  attempts: PracticeAttempt[];
  tests: PracticeTest[];
  mistakes: Mistake[];
  course?: Course | null;
}): { key: ExamStageKey; index: number; stages: Array<{ key: ExamStageKey; label: string; description: string; done: boolean }> } {
  const states = input.topics.map((topic) =>
    deriveTopicLearningState(topic, input.attempts, { examDate: input.course?.exam_date ?? null }),
  );
  const coverage = input.topics.length
    ? input.topics.reduce((sum, topic) => sum + Math.min(1, topic.progress / 100), 0) / input.topics.length
    : 0;
  const retrieval = states.length ? states.filter((state) => state.recallStrength >= 0.48).length / states.length : 0;
  const mixedEvidence = input.attempts.filter((attempt) => ["recognition", "calculation", "error_detection"].includes(attemptType(attempt)) && legacyOutcome(attempt) === "correct").length;
  const transferEvidence = input.attempts.filter((attempt) => ["application", "simulation"].includes(attemptType(attempt)) && legacyOutcome(attempt) === "correct").length;
  const simulated = input.tests.some((test) => test.max_score && test.score != null);
  const openMistakes = input.mistakes.filter((mistake) => mistake.status !== "mastered").length;

  const done = {
    coverage: coverage >= 0.9,
    retrieval: retrieval >= 0.65,
    mixed: mixedEvidence >= Math.max(2, Math.ceil(input.topics.length * 0.4)),
    transfer: transferEvidence >= Math.max(1, Math.ceil(input.topics.length * 0.25)),
    simulation: simulated,
    repair: simulated && openMistakes === 0,
  } satisfies Record<ExamStageKey, boolean>;
  const currentIndex = EXAM_STAGES.findIndex((stage) => !done[stage.key]);
  const index = currentIndex < 0 ? EXAM_STAGES.length - 1 : currentIndex;
  return {
    key: EXAM_STAGES[index]!.key,
    index,
    stages: EXAM_STAGES.map((stage) => ({ ...stage, done: done[stage.key] })),
  };
}

export function examBuffer(input: {
  examDate: string;
  topics: Topic[];
  attempts: PracticeAttempt[];
  capacity: CapacityProfile;
  now?: string;
}) {
  const now = input.now ?? today();
  const days = Math.max(0, diffDays(input.examDate, now));
  const weak = input.topics.filter((topic) => deriveTopicLearningState(topic, input.attempts, { now, examDate: input.examDate }).masteryLevel <= 2).length;
  const size = Math.max(2, Math.min(7, Math.round(2 + input.topics.length / 6 + weak / 4)));
  const contentDeadline = addDays(input.examDate, -Math.min(size + 3, Math.max(3, days)));
  return {
    bufferDays: size,
    contentDeadline,
    mixedDate: addDays(input.examDate, -Math.max(4, size)),
    simulationDate: addDays(input.examDate, -Math.max(3, size - 1)),
    repairDate: addDays(input.examDate, -2),
    lightDate: addDays(input.examDate, -1),
  };
}

export function calibration(input: { attempts: PracticeAttempt[]; window?: number }) {
  const rows = input.attempts.filter((attempt) => attempt.confidence != null).slice(0, input.window ?? 30);
  if (rows.length < 3) return null;
  const observed = rows.map((attempt) => ({
    confidence: (Number(attempt.confidence) - 1) / 2,
    result: legacyOutcome(attempt) === "correct" ? 1 : legacyOutcome(attempt) === "partial" ? 0.5 : 0,
  }));
  const gap = observed.reduce((sum, row) => sum + row.confidence - row.result, 0) / observed.length;
  const label =
    Math.abs(gap) <= 0.12 ? "Arvioit osaamistasi melko realistisesti." :
    gap > 0 ? "Oma varmuusarviosi on usein tulosta korkeampi." :
    "Osaat tulosten perusteella usein enemmän kuin itse arvioit.";
  return { gap, count: rows.length, label };
}

export function learningForecast(input: {
  course: Course;
  topics: Topic[];
  attempts: PracticeAttempt[];
  sessions: Session[];
  plan: PlanItem[];
  now?: string;
}) {
  const now = input.now ?? today();
  const recentStart = addDays(now, -28);
  const recentSessions = input.sessions.filter((session) => session.course_id === input.course.id && session.date >= recentStart && session.date <= now);
  const recentPlan = input.plan.filter((item) => item.course_id === input.course.id && item.date >= recentStart && item.date <= now && item.kind !== "exam");
  const completed = recentPlan.filter((item) => item.status === "completed").length;
  const adherence = recentPlan.length ? completed / recentPlan.length : recentSessions.length ? 0.75 : 0.5;
  const states = input.topics.map((topic) => deriveTopicLearningState(topic, input.attempts, { now, examDate: input.course.exam_date }));
  const coverage = input.topics.length ? input.topics.reduce((sum, topic) => sum + topic.progress, 0) / input.topics.length : 0;
  const mastery = states.length ? states.reduce((sum, state) => sum + state.masteryLevel / 5, 0) / states.length : 0;
  const weeklySessions = Math.max(0.5, recentSessions.length / 4);
  const remaining = Math.max(0, 100 - coverage);
  const pace = Math.max(1.5, weeklySessions * 4.5 * Math.max(0.45, adherence));
  const centralWeeks = remaining / pace;
  const uncertainty = 0.22 + (1 - adherence) * 0.35 + (1 - mastery) * 0.15;
  const earliest = addDays(now, Math.max(1, Math.round(centralWeeks * 7 * (1 - uncertainty))));
  const latest = addDays(now, Math.max(1, Math.round(centralWeeks * 7 * (1 + uncertainty))));
  return {
    earliest,
    latest,
    adherence,
    sessionsPerWeek: weeklySessions,
    coverage,
    mastery,
    note: "Ennuste muuttuu opiskelurytmin ja uuden osaamisnäytön mukana.",
  };
}

export function weeklyLearningReview(input: {
  courses: Course[];
  topics: Topic[];
  attempts: PracticeAttempt[];
  sessions: Session[];
  plan: PlanItem[];
  now?: string;
}) {
  const now = input.now ?? today();
  const start = startOfWeek(now);
  const weekAttempts = input.attempts.filter((attempt) => attempt.date >= start && attempt.date <= now);
  const weekPlan = input.plan.filter((item) => item.date >= start && item.date <= now && item.kind !== "exam");
  const completed = weekPlan.filter((item) => item.status === "completed").length;
  const strengthened = input.topics
    .map((topic) => {
      const rows = weekAttempts.filter((attempt) => attempt.topic_id === topic.id);
      const score = rows.reduce((sum, attempt) => sum + attemptQuality(attempt), 0);
      return { topic, score, attempts: rows.length };
    })
    .filter((row) => row.attempts > 0 && row.score / row.attempts >= 0.6)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  const needsRound = input.topics
    .map((topic) => {
      const state = deriveTopicLearningState(topic, input.attempts, { now, examDate: input.courses.find((course) => course.id === topic.course_id)?.exam_date ?? null });
      return { topic, state };
    })
    .filter((row) => row.state.forgettingRisk >= 0.55 || row.state.uncertainty >= 0.6)
    .sort((a, b) => b.state.forgettingRisk + b.state.uncertainty - (a.state.forgettingRisk + a.state.uncertainty))
    .slice(0, 4);
  return {
    strengthened,
    needsRound,
    completed,
    planned: weekPlan.length,
    adherence: weekPlan.length ? completed / weekPlan.length : 1,
  };
}

export function todayPriority(input: {
  item: PlanItem;
  courses: Course[];
  topics: Topic[];
  attempts: PracticeAttempt[];
  mistakes: Mistake[];
  now?: string;
}) {
  const now = input.now ?? today();
  const topic = input.topics.find((candidate) => candidate.id === input.item.topic_id);
  const course = input.courses.find((candidate) => candidate.id === input.item.course_id);
  if (!topic) {
    return { score: 10, reason: "Tämä on tämän päivän suunnitelmassa." };
  }
  const state = deriveTopicLearningState(topic, input.attempts, { now, examDate: course?.exam_date ?? null });
  const openMistake = input.mistakes.some((mistake) => mistake.topic_id === topic.id && mistake.status !== "mastered");
  const score =
    state.forgettingRisk * 35 +
    state.examRelevance * 25 +
    state.uncertainty * 18 +
    (topic.importance / 5) * 15 +
    (openMistake ? 12 : 0);
  const reasons = [
    state.forgettingRisk >= 0.65 ? "unohtumisriski on noussut" : null,
    state.examRelevance >= 0.7 ? "koe lähestyy" : null,
    state.uncertainty >= 0.6 ? "osaamisnäyttöä on vielä vähän" : null,
    openMistake ? "aiheessa on avoin virhe" : null,
  ].filter(Boolean);
  return { score, reason: reasons.slice(0, 2).join(" ja ") || "tämä on päivän tärkeimpiä oppimistarpeita" };
}

export function capacityForDateV3(profile: CapacityProfile, iso: string) {
  if (profile.busyDates.includes(iso)) return Math.max(10, Math.min(20, profile.weekdayMinutes));
  const weekday = parseISO(iso).getDay();
  const weekend = weekday === 0 || weekday === 6;
  return weekend ? profile.weekendMinutes : profile.weekdayMinutes;
}
