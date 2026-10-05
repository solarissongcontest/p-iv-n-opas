import type { PracticeAttempt } from "./domain.ts";
import type { LearningAttemptType, PracticeQuestion } from "./learning-engine.ts";

export type RubricConfidence = "low" | "medium" | "high";

export type RubricDimension = {
  key: "concepts" | "reasoning" | "task_fit" | "completeness";
  label: string;
  score: number;
  max: 25;
  note: string;
};

export type PracticeRubricEvaluation = {
  suggestedResult: PracticeAttempt["result"];
  confidence: RubricConfidence;
  score: number;
  dimensions: RubricDimension[];
  matchedConcepts: number;
  expectedConcepts: number;
  summary: string;
};

type RubricQuestion = Pick<PracticeQuestion, "type" | "expectedConcepts"> &
  Partial<
    Pick<
      PracticeQuestion,
      "prompt" | "explanation" | "correctAnswer" | "answerMode" | "scoringGuide"
    >
  >;

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function normalize(value: string) {
  return value
    .toLocaleLowerCase("fi-FI")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9åäö+\-*/=.%\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const subscriptDigits: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
};

function normalizeChemicalEquation(value: string) {
  let normalized = value;

  for (const [subscript, digit] of Object.entries(subscriptDigits)) {
    normalized = normalized.replaceAll(subscript, digit);
  }

  normalized = normalized
    .replace(/\\(?:longrightarrow|rightarrow|to)\b/g, "->")
    .replace(/[→⇒⟶⟹]/g, "->")
    .replace(/\\(?:mathrm|text|operatorname)\s*\{([^{}]*)\}/g, "$1")
    .replace(/\\ce\s*\{([^{}]*)\}/g, "$1")
    .replace(/_\{(\d+)\}/g, "$1")
    .replace(/_(\d+)/g, "$1")
    .replace(/\\(?:left|right)/g, "")
    .replace(/\\[,;! ]/g, "")
    .replace(/[{}]/g, "")
    .replace(/\((?:aq|s|l|g)\)/gi, "")
    .replace(/\s+/g, "")
    .replace(/[.!?;]+$/g, "");

  const [left, right, ...extra] = normalized.split("->");
  if (!left || !right || extra.length) return normalized;

  const normalizeSide = (side: string) =>
    side
      .split("+")
      .map((term) => term.replace(/^1(?=[A-ZÅÄÖ(])/u, ""))
      .join("+");

  return `${normalizeSide(left)}->${normalizeSide(right)}`;
}

function extractEquation(value: string | null | undefined) {
  if (!value) return null;
  const arrow = /(?:→|⇒|⟶|⟹|->|=>|\\(?:longrightarrow|rightarrow|to)\b)/;
  const match = arrow.exec(value);
  if (!match) return null;

  const arrowStart = match.index;
  const separators = [
    value.lastIndexOf("\n", arrowStart),
    value.lastIndexOf(";", arrowStart),
    value.lastIndexOf(":", arrowStart),
  ];
  const start = Math.max(...separators) + 1;
  const afterArrow = arrowStart + match[0].length;
  const endings = [value.indexOf("\n", afterArrow), value.indexOf(";", afterArrow), value.indexOf(".", afterArrow)]
    .filter((index) => index >= 0);
  const end = endings.length ? Math.min(...endings) : value.length;
  return value.slice(start, end).trim();
}

function exactChemistryEvaluation(
  question: RubricQuestion,
  response: string,
): PracticeRubricEvaluation | null {
  if (!question.prompt || !/\btasapainota\b/i.test(question.prompt)) return null;

  const expectedSource = question.correctAnswer || question.explanation;
  const expectedEquation = extractEquation(expectedSource);
  const responseEquation = extractEquation(response);
  if (!expectedEquation || !responseEquation) return null;

  const expected = normalizeChemicalEquation(expectedEquation);
  const actual = normalizeChemicalEquation(responseEquation);
  if (!expected || !actual) return null;

  const isExact = actual === expected;
  const score = isExact ? 100 : 20;
  const dimensionScore = isExact ? 25 : 5;
  const dimensions: RubricDimension[] = [
    {
      key: "concepts",
      label: "Ydinkäsitteiden kattavuus",
      score: dimensionScore,
      max: 25,
      note: isExact
        ? "Kemiallinen rakenne vastaa tehtävän tarkkaa ratkaisua."
        : "Kemiallinen rakenne ei vielä vastaa tehtävän tarkkaa ratkaisua.",
    },
    {
      key: "reasoning",
      label: "Perustelu ja päättely",
      score: dimensionScore,
      max: 25,
      note: isExact
        ? "Tasapainotus on pääteltävissä oikein merkityistä kertoimista."
        : "Kertoimissa tai atomitasapainossa on vielä korjattavaa.",
    },
    {
      key: "task_fit",
      label: "Tehtävätyypin vaatimus",
      score: dimensionScore,
      max: 25,
      note: isExact
        ? "Vastaus täyttää tasapainotustehtävän vaatimuksen."
        : "Vastaus ei vielä täytä tasapainotustehtävän vaatimusta.",
    },
    {
      key: "completeness",
      label: "Vastauksen riittävyys",
      score: dimensionScore,
      max: 25,
      note: isExact
        ? "Lyhyt reaktioyhtälö riittää tässä tehtävässä täydelliseksi vastaukseksi."
        : "Reaktioyhtälö on arvioitavissa, mutta tasapainotus ei täsmää.",
    },
  ];

  return {
    suggestedResult: isExact ? "independent" : "not_yet",
    confidence: "high",
    score,
    dimensions,
    matchedConcepts: isExact ? question.expectedConcepts.length : 0,
    expectedConcepts: question.expectedConcepts.length,
    summary: isExact
      ? "Vastaus vastaa tehtävän tarkkaa tasapainotusta."
      : "Vastaus ei vielä vastaa tehtävän tarkkaa tasapainotusta.",
  };
}

function words(value: string) {
  const stop = new Set([
    "ja", "tai", "että", "kun", "jos", "niin", "on", "ovat", "oli", "olla",
    "se", "tämä", "sillä", "joka", "joten", "koska", "myös",
    "the", "and", "or", "that", "is", "are", "to", "of", "in", "a", "an",
  ]);
  return normalize(value)
    .split(" ")
    .filter((word) => word.length >= 3 && !stop.has(word));
}

/**
 * Concept matching is only one rubric signal. It deliberately does not expose
 * missing concept names to the learner and it never changes mastery directly.
 */
function conceptCoverage(response: string, concepts: string[]) {
  if (!concepts.length) return { matched: 0, total: 0, ratio: 0.5 };
  const responseWords = new Set(words(response));
  let matched = 0;

  for (const concept of concepts) {
    const conceptWords = words(concept);
    if (!conceptWords.length) continue;
    const hits = conceptWords.filter((word) => responseWords.has(word)).length;
    const direct = normalize(response).includes(normalize(concept));
    if (direct || hits / conceptWords.length >= 0.6) matched += 1;
  }

  return { matched, total: concepts.length, ratio: matched / concepts.length };
}

function reasoningScore(response: string, type: LearningAttemptType) {
  const tokens = words(response);
  const causal = /\b(koska|siksi|joten|johtaa|seurauks|vuoksi|because|therefore|therefore)\b/i.test(response);
  const sequence = /\b(ensin|sitten|seuraav|lopuksi|vaihe|step|then|first)\b/i.test(response);
  const mathSteps = /[=→⇒]/.test(response) || (response.match(/[-+*/]/g)?.length ?? 0) >= 2;

  let score = clamp(tokens.length / 28) * 0.45;
  if (causal) score += 0.25;
  if (sequence) score += 0.15;
  if (mathSteps && ["calculation", "application", "simulation"].includes(type)) score += 0.25;
  if (type === "free_recall" || type === "short_answer" || type === "recognition") {
    score = Math.max(score, clamp(tokens.length / 16) * 0.7);
  }
  return clamp(score);
}

function taskFitScore(response: string, type: LearningAttemptType) {
  const tokenCount = words(response).length;
  const hasNumber = /\d/.test(response);
  const hasUnitLike = /\b(?:m\/s|m\/s²|kg|g|mol|l|ml|pa|j|w|n|v|a|c|k|%|cm|mm)\b/i.test(response);
  const hasReasoning = /\b(koska|siksi|joten|johtaa|seurauks|perust|because|therefore)\b/i.test(response);

  switch (type) {
    case "calculation":
      return clamp((hasNumber ? 0.35 : 0) + (/[=+\-*/]/.test(response) ? 0.35 : 0) + (hasUnitLike ? 0.2 : 0) + clamp(tokenCount / 18) * 0.1);
    case "explanation":
      return clamp((hasReasoning ? 0.45 : 0.15) + clamp(tokenCount / 30) * 0.55);
    case "application":
    case "simulation":
      return clamp((hasReasoning ? 0.3 : 0.1) + (hasNumber || /esimerk|tilanne|sovell/i.test(response) ? 0.2 : 0) + clamp(tokenCount / 36) * 0.5);
    case "error_detection":
      return clamp((/virhe|väär|puutt|ongel|incorrect|error/i.test(response) ? 0.4 : 0.1) + (hasReasoning ? 0.25 : 0) + clamp(tokenCount / 28) * 0.35);
    default:
      return clamp(tokenCount / 18);
  }
}

function completenessScore(response: string) {
  const trimmed = response.trim();
  if (!trimmed) return 0;
  const tokens = words(trimmed).length;
  const clauses = trimmed.split(/[.!?;\n]+/).filter((part) => part.trim().length > 3).length;
  return clamp(tokens / 26 * 0.7 + Math.min(3, clauses) / 3 * 0.3);
}

export function evaluatePracticeResponse(
  question: RubricQuestion,
  response: string,
): PracticeRubricEvaluation {
  const exactChemistry = exactChemistryEvaluation(question, response);
  if (exactChemistry) return exactChemistry;

  const concepts = conceptCoverage(response, question.expectedConcepts);
  const reasoning = reasoningScore(response, question.type);
  const taskFit = taskFitScore(response, question.type);
  const completeness = completenessScore(response);

  const conceptWeight = concepts.total ? 0.4 : 0.2;
  const remaining = 1 - conceptWeight;
  const weighted =
    concepts.ratio * conceptWeight +
    reasoning * remaining * 0.36 +
    taskFit * remaining * 0.38 +
    completeness * remaining * 0.26;

  const score = Math.round(clamp(weighted) * 100);
  const suggestedResult: PracticeAttempt["result"] =
    score >= 78 ? "independent" :
    score >= 48 ? "hinted" :
    "not_yet";

  const evidenceSignals =
    (concepts.total >= 2 ? 1 : 0) +
    (words(response).length >= 12 ? 1 : 0) +
    (question.type !== "recognition" && question.type !== "multiple_choice" ? 1 : 0);
  const confidence: RubricConfidence =
    evidenceSignals >= 3 ? "high" :
    evidenceSignals >= 2 ? "medium" :
    "low";

  const dimensions: RubricDimension[] = [
    {
      key: "concepts",
      label: "Ydinkäsitteiden kattavuus",
      score: Math.round(concepts.ratio * 25),
      max: 25,
      note: concepts.total
        ? `${concepts.matched}/${concepts.total} rubriikin ydinkohdasta näkyy vastauksessa.`
        : "Tehtävällä ei ole riittävän tarkkaa käsite-rubriikkia, joten tätä osaa painotetaan vähemmän.",
    },
    {
      key: "reasoning",
      label: "Perustelu ja päättely",
      score: Math.round(reasoning * 25),
      max: 25,
      note: reasoning >= 0.7
        ? "Ratkaisusta näkyy perustelu tai etenemisrakenne."
        : "Perustelua tai ratkaisun etenemistä kannattaa tehdä näkyvämmäksi.",
    },
    {
      key: "task_fit",
      label: "Tehtävätyypin vaatimus",
      score: Math.round(taskFit * 25),
      max: 25,
      note: taskFit >= 0.7
        ? "Vastaus vastaa hyvin tämän tehtävätyypin vaatimusta."
        : "Vastauksesta puuttuu vielä osa tämän tehtävätyypin edellyttämästä näytöstä.",
    },
    {
      key: "completeness",
      label: "Vastauksen riittävyys",
      score: Math.round(completeness * 25),
      max: 25,
      note: completeness >= 0.7
        ? "Vastaus on riittävän kokonainen arvioitavaksi."
        : "Vastaus on vielä niin lyhyt tai keskeneräinen, että arvio on epävarma.",
    },
  ];

  const summary =
    suggestedResult === "independent"
      ? "Rubriikki tukee sitä, että vastaus voi olla itsenäisesti onnistunut. Tarkista silti itse ennen tallennusta."
      : suggestedResult === "hinted"
        ? "Rubriikki näkee osittaista osaamista, mutta vastauksessa on vielä aukko tai perustelun puute."
        : "Rubriikki ei vielä näe riittävää näyttöä onnistuneesta vastauksesta.";

  return {
    suggestedResult,
    confidence,
    score,
    dimensions,
    matchedConcepts: concepts.matched,
    expectedConcepts: concepts.total,
    summary,
  };
}
