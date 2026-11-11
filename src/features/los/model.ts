/** LOS! contents are versioned publication data. Learner data is separate. */
import type { ChapterTestDefinition } from "./chapterTest";
export type ModuleCode = "SAB31" | "SAB32" | "SAB33" | "SAB34" | "SAB35" | "SAB36" | "SAB37" | "SAB38";
export type BookId = "los-1" | "los-2" | "los-3" | "los-4" | "los-5" | "los-6" | "los-7" | "los-8";

export interface SourceAttribution {
  id: string;
  title: string;
  publisher: string;
  author?: string;
  originalUrl?: string;
  licenseOrBasis: string;
  licenseUrl?: string;
  verifiedAt: string;
  modification?: string;
  permittedMode: "hosted" | "embed" | "pending";
  readiness?: "research" | "text-cleared" | "media-pending" | "blocked";
  publicationNoteFi?: string;
}
export type ChapterSectionId =
  | "aloita" | "teksti-a" | "ymmarra" | "sanasto" | "kielioppi"
  | "teksti-b" | "harjoittele" | "kayta" | "kulttuuri" | "tarkista";
export interface ChapterSection {
  id: ChapterSectionId; title: string;
  blockIds: string[]; exerciseIds: string[];
  publicationStatus: "planned" | "preview" | "published";
}
export interface Chapter {
  id: string; version: string; sequence: number; title: string;
  introductionFi: string; objectives: string[]; blockIds: string[]; exerciseIds: string[];
  publicationStatus?: "planned" | "preview" | "published"; plannedSourceIds?: string[];
  sections?: ChapterSection[];
}
export interface Lesson {
  id: string; version: string; bookId: BookId; chapterId?: string;
  sequence: number; title: string; estimatedMinutes: number; objectives: string[];
  model: "text" | "vocabulary" | "grammar" | "application" | "review";
  publicationStatus?: "planned" | "preview" | "published";
  steps: { id: string; title: string; required: boolean; blockId?: string; exerciseId?: string; chapterTestId?: string; reflectionPromptFi?: string }[];
}
export type ContentBlock =
  | { id: string; version: string; kind: "heading"; level: 2 | 3; text: string }
  | { id: string; version: string; kind: "paragraph" | "authenticText"; text: string; language: "de" | "fi"; sourceId?: string }
  | { id: string; version: string; kind: "dialogue"; turns: { speaker: string; text: string; translationFi?: string }[]; sourceId: string }
  | { id: string; version: string; kind: "transcript"; lines: { de: string; fi: string; noteFi?: string }[]; sourceId: string }
  | { id: string; version: string; kind: "grammar"; title: string; explanationFi: string; examples: { de: string; fi: string }[] }
  | { id: string; version: string; kind: "table"; headers: string[]; rows: string[][] }
  | { id: string; version: string; kind: "image"; src: string; alt: string; caption: string; sourceId: string }
  | { id: string; version: string; kind: "vocabulary"; entries: { id: string; de: string; fi: string; note?: string }[] }
  | { id: string; version: string; kind: "production"; titleFi: string; promptFi: string; modelDe: string; modelFi: string; criteriaFi: string[] }
  | { id: string; version: string; kind: "geo-schematic"; titleFi: string; instructionsFi: string }
  | { id: string; version: string; kind: "media"; mediaType: "audio" | "video"; title: string; embedUrl: string; mp3Url?: string; sourceId: string };

export interface ExerciseBase {
  id: string; version: string; promptFi: string; objectives: string[];
  difficulty: "guided" | "basic" | "applied"; hintFi?: string; explanationFi: string;
}
export type Exercise =
  | (ExerciseBase & { type: "single-choice"; options: { id: string; label: string }[]; correctOptionId: string })
  | (ExerciseBase & { type: "multiple-choice"; options: { id: string; label: string }[]; correctOptionIds: string[] })
  | (ExerciseBase & { type: "true-false"; statement: string; correctValue: boolean })
  | (ExerciseBase & { type: "word-order"; tokens: { id: string; label: string }[]; correctOrder: string[] })
  | (ExerciseBase & { type: "categorize"; items: { id: string; label: string }[]; categories: { id: string; label: string }[]; assignments: { itemId: string; categoryId: string }[] })
  | (ExerciseBase & { type: "gap-fill"; sentenceBefore: string; sentenceAfter: string; acceptedAnswers: string[]; caseSensitive?: boolean })
  | (ExerciseBase & { type: "matching"; left: { id: string; label: string }[]; right: { id: string; label: string }[]; pairs: { leftId: string; rightId: string }[] })
  | (ExerciseBase & { type: "highlight"; blockId: string; text: string; acceptedRanges: { start: number; end: number }[] });

export type HighlightRange = { start: number; end: number };
export type ExerciseAnswer = string | string[] | Record<string, string> | HighlightRange | null;
export type ExerciseAttempt = {
  id: string; exerciseId: string; exerciseVersion: string; answer: ExerciseAnswer;
  checkedAt: string | null; status: "draft" | "correct" | "incorrect"; updatedAt: string;
};
export type ResumeBookmark = { lessonId: string; lessonVersion: string; updatedAt: string };
export type LessonProgress = {
  lessonId: string; lessonVersion: string; completedStepIds: string[];
  status: "not-started" | "in-progress" | "completed"; updatedAt: string;
};
export interface Book {
  id: BookId; number: number; moduleCode: ModuleCode; moduleTitle: string;
  title: string; description: string; credits: 2; contentVersion: string;
  accent: string; tint: string; accentDark: string;
  coverAsset: string | null; bannerAsset: string | null;
  chapters: Chapter[]; lessons: Lesson[]; blocks: ContentBlock[];
  exercises: Exercise[]; sources: SourceAttribution[]; chapterTests: ChapterTestDefinition[];
}

/** Allow empty forthcoming books; reject dangling or duplicated published content. */
export function validateBook(book: Book): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  const all = [...book.chapters, ...book.lessons, ...book.blocks, ...book.exercises, ...book.sources, ...book.chapterTests];
  for (const item of all) {
    if (!item.id || seen.has(item.id)) errors.push("Missing/duplicate ID: " + item.id);
    if ("version" in item && !item.version) errors.push("Missing version: " + item.id);
    seen.add(item.id);
  }
  const blocks = new Set(book.blocks.map(item => item.id));
  const exercises = new Set(book.exercises.map(item => item.id));
  const chapters = new Set(book.chapters.map(item => item.id));
  const sources = new Set(book.sources.map(item => item.id));
  for (const chapter of book.chapters) {
    for (const id of chapter.blockIds) if (!blocks.has(id)) errors.push("Unknown block: " + id);
    for (const id of chapter.exerciseIds) if (!exercises.has(id)) errors.push("Unknown exercise: " + id);
    if (chapter.sections) {
      const sectionIds = new Set<string>();
      for (const section of chapter.sections) {
        if (sectionIds.has(section.id)) errors.push("Duplicate chapter section: " + section.id);
        sectionIds.add(section.id);
        for (const id of section.blockIds) if (!blocks.has(id)) errors.push("Unknown section block: " + id);
        for (const id of section.exerciseIds) if (!exercises.has(id)) errors.push("Unknown section exercise: " + id);
        for (const id of section.blockIds) if (!chapter.blockIds.includes(id)) errors.push("Section block not in chapter: " + id);
        for (const id of section.exerciseIds) if (!chapter.exerciseIds.includes(id)) errors.push("Section exercise not in chapter: " + id);
      }
    }
  }
  for (const chapterTest of book.chapterTests) {
    if (!chapters.has(chapterTest.chapterId)) errors.push("Unknown test chapter: " + chapterTest.id);
    if (chapterTest.exerciseIds.length < 1) errors.push("Empty test: " + chapterTest.id);
    if (new Set(chapterTest.exerciseIds).size !== chapterTest.exerciseIds.length)
      errors.push("Duplicate test question: " + chapterTest.id);
    for (const exerciseId of chapterTest.exerciseIds)
      if (!exercises.has(exerciseId)) errors.push("Unknown test exercise: " + exerciseId);
    if (chapterTest.alternativeExerciseIds) {
      if (chapterTest.alternativeExerciseIds.length !== chapterTest.exerciseIds.length)
        errors.push("Mismatched retake question count: " + chapterTest.id);
      if (new Set(chapterTest.alternativeExerciseIds).size !== chapterTest.alternativeExerciseIds.length)
        errors.push("Repeated retake question: " + chapterTest.id);
      for (const exerciseId of chapterTest.alternativeExerciseIds) {
        if (!exercises.has(exerciseId)) errors.push("Unknown retake exercise: " + exerciseId);
        if (chapterTest.exerciseIds.includes(exerciseId)) errors.push("Retake must use a distinct authored question: " + exerciseId);
      }
    }
  }
  const tests = new Set(book.chapterTests.map(item => item.id));
  for (const lesson of book.lessons) {
    if (lesson.bookId !== book.id) errors.push("Wrong book: " + lesson.id);
    if (lesson.chapterId && !chapters.has(lesson.chapterId)) errors.push("Unknown chapter: " + lesson.chapterId);
    const stepIds = new Set<string>();
    for (const step of lesson.steps) {
      if (stepIds.has(step.id)) errors.push("Repeated lesson step: " + step.id);
      stepIds.add(step.id);
      if (step.blockId && !blocks.has(step.blockId)) errors.push("Unknown block: " + step.blockId);
      if (step.exerciseId && !exercises.has(step.exerciseId)) errors.push("Unknown exercise: " + step.exerciseId);
      if (step.chapterTestId && !tests.has(step.chapterTestId))
        errors.push("Unknown chapter test: " + step.chapterTestId);
      const references = Number(Boolean(step.blockId)) + Number(Boolean(step.exerciseId)) + Number(Boolean(step.reflectionPromptFi)) + Number(Boolean(step.chapterTestId));
      if (references !== 1) errors.push("Lesson step must reference exactly one content, exercise, chapter test or reflection: " + step.id);
    }
  }
  for (const exercise of book.exercises) {
    if (exercise.type === "multiple-choice") {
      const options = exercise.options.map(item => item.id);
      if (exercise.correctOptionIds.length < 1 ||
        new Set(exercise.correctOptionIds).size !== exercise.correctOptionIds.length ||
        exercise.correctOptionIds.some(id => !options.includes(id)) ||
        new Set(options).size !== options.length)
        errors.push("Invalid multiple-choice answer key: " + exercise.id);
    }
    if (exercise.type === "word-order") {
      const ids = exercise.tokens.map(item => item.id);
      if (ids.length < 2 || exercise.correctOrder.length !== ids.length ||
        new Set(ids).size !== ids.length ||
        new Set(exercise.correctOrder).size !== ids.length ||
        exercise.correctOrder.some(id => !ids.includes(id)))
        errors.push("Invalid word order answer key: " + exercise.id);
    }
    if (exercise.type === "categorize") {
      const ids = exercise.items.map(item => item.id);
      const categories = exercise.categories.map(item => item.id);
      const assigned = exercise.assignments.map(item => item.itemId);
      if (!ids.length || !categories.length || exercise.assignments.length !== ids.length ||
        new Set(ids).size !== ids.length || new Set(categories).size !== categories.length ||
        new Set(assigned).size !== ids.length ||
        exercise.assignments.some(item => !ids.includes(item.itemId) ||
          !categories.includes(item.categoryId)))
        errors.push("Invalid category answer key: " + exercise.id);
    }
  }
  for (const block of book.blocks) {
    if ("sourceId" in block && block.sourceId && !sources.has(block.sourceId)) errors.push("Unknown source: " + block.sourceId);
  }
  return errors;
}
