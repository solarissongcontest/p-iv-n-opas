import { LOS1_READING_QUESTIONS_PART1 } from "./los1ReadingQuestionsPart1.ts";
import { LOS1_READING_QUESTIONS_PART2 } from "./los1ReadingQuestionsPart2.ts";
import { LOS1_REVISED_AB } from "./los1RevisedAB.ts";
import { LOS1_REVISED_C } from "./los1RevisedC.ts";

export type LosReadingText = "A" | "B" | "C";
export type LosReadingSkill = "detail" | "evidence" | "inference" | "transfer";
export type LosReadingChoice = {
  readonly kind: "choice";
  readonly prompt: string;
  readonly options: readonly string[];
  readonly answerIndex: number;
  readonly evidence: string;
  readonly explanation: string;
  readonly skill: LosReadingSkill;
};
export type LosReadingOpen = {
  readonly kind: "open";
  readonly prompt: string;
  readonly modelAnswer: string;
  readonly evidence: string;
  readonly explanation: string;
  readonly skill: LosReadingSkill;
};
export type LosReadingItem = (LosReadingChoice | LosReadingOpen) & {
  readonly id: string;
  readonly chapterId: string;
  readonly text: LosReadingText;
};
type RawReadingItem = LosReadingChoice | LosReadingOpen;
type SourceReadingGroup = { readonly A: readonly RawReadingItem[]; readonly B: readonly RawReadingItem[]; readonly C: readonly RawReadingItem[] };
const rawBank: Readonly<Record<string, SourceReadingGroup>> = {
  ...LOS1_READING_QUESTIONS_PART1,
  ...LOS1_READING_QUESTIONS_PART2,
};
const TEXTS = ["A", "B", "C"] as const;
function pad(index: number): string { return String(index + 1).padStart(2, "0"); }
export const LOS1_READING_BANK: Readonly<Record<string, Readonly<Record<LosReadingText, readonly LosReadingItem[]>>>> =
  Object.fromEntries(Object.entries(rawBank).map(([chapterId, group]) => [
    chapterId,
    Object.fromEntries(TEXTS.map(text => [
      text,
      group[text].map((question, index) => ({
        ...question,
        id: "LOS1-READ-V2-C" + chapterId + "-" + text + "-" + pad(index),
        chapterId,
        text,
      })),
    ])),
  ])) as unknown as Record<string, Readonly<Record<LosReadingText, readonly LosReadingItem[]>>>;

export function losReadingQuestions(chapterId: string, text: LosReadingText): readonly LosReadingItem[] {
  return LOS1_READING_BANK[chapterId]?.[text] ?? [];
}

/** A historical choice may still be saved under the stable question ID after
 * options are edited. Never reinterpret that old answer as a wrong attempt. */
export function losReadingChoiceNeedsReview(question: LosReadingItem, response: string): boolean {
  return question.kind === "choice" && response.trim().length > 0 && !question.options.includes(response);
}

/** Preserve the original answer after an explicit new selection. This stays
 * inside the existing chapter-draft practiceAnswers and JSON backup. */
export function losReadingLegacyAnswerKey(questionId: string): string {
  return "LOS1-READ-LEGACY-" + questionId;
}

export function losReadingQuestionCorrect(question: LosReadingItem, response: string): boolean | null {
  if (question.kind === "open" || losReadingChoiceNeedsReview(question,response)) return null;
  return question.options[question.answerIndex] === response;
}

function normalizeEvidence(value: string): string {
  return value.replace(/\*\*/g, "").replace(/\*/g, "").replace(/\s+/g, " ").toLocaleLowerCase("de").trim();
}
export function validateLos1ReadingBank(): string[] {
  const issues: string[] = [];
  const ids = new Set<string>();
  if (Object.keys(rawBank).length !== 10) issues.push("Kappaleita ei ole kymmentä.");
  for (let n = 1; n <= 10; n++) {
    const chapterId = String(n).padStart(2, "0");
    const sourceAB = LOS1_REVISED_AB.chapters.find(ch => ch.chapterId === "C" + chapterId);
    const sourceC = LOS1_REVISED_C.chapters.find(ch => ch.chapterId === chapterId);
    if (!sourceAB || !sourceC) { issues.push("Teksti puuttuu kappaleesta " + chapterId); continue; }
    for (const text of TEXTS) {
      const questions = losReadingQuestions(chapterId, text);
      const expected = text === "A" ? 8 : text === "B" ? 5 : 2;
      if (questions.length !== expected) issues.push(chapterId + text + ": tehtävien määrä " + questions.length);
      const source = text === "C" ? sourceC.contentMarkdown :
        (text === "A" ? sourceAB.textA : sourceAB.textB).blocks.map(block => ("text" in block ? block.text : "")).join(" ");
      const normalizedSource = normalizeEvidence(source);
      const actualKinds = new Set<string>();
      for (const item of questions) {
        if (ids.has(item.id)) issues.push("Tunniste esiintyy kahdesti: " + item.id);
        ids.add(item.id);
        actualKinds.add(item.kind);
        if (!item.prompt.trim() || !item.explanation.trim() || item.evidence.trim().length < 3)
          issues.push(item.id + " sisältää tyhjän tehtäväkentän.");
        if (!normalizedSource.includes(normalizeEvidence(item.evidence)))
          issues.push(item.id + " viittaa puuttuvaan tekstikohtaan: " + item.evidence);
        if (item.kind === "choice") {
          if (item.answerIndex < 0 || item.answerIndex >= item.options.length || item.options.length < 3 ||
            new Set(item.options).size !== item.options.length)
            issues.push(item.id + " sisältää virheelliset vaihtoehdot.");
        } else if (!item.modelAnswer.trim()) issues.push(item.id + " mallivastaus puuttuu.");
      }
      if (!actualKinds.has("choice") || !actualKinds.has("open"))
        issues.push(chapterId + text + " ei sisällä molempia tehtävälajeja.");
    }
  }
  if (ids.size !== 150) issues.push("Tehtäviä odotettiin 150, saatiin " + ids.size + ".");
  return issues;
}
