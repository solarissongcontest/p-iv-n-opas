/** LOS! contents are versioned publication data. Learner data is separate. */
export type ModuleCode = "SAB31" | "SAB32" | "SAB33" | "SAB34" | "SAB35" | "SAB36" | "SAB37" | "SAB38";
export type BookId = "los-1" | "los-2" | "los-3" | "los-4" | "los-5" | "los-6" | "los-7" | "los-8";

export interface SourceAttribution {
  id: string;
  title: string;
  publisher: string;
  author?: string;
  originalUrl?: string;
  licenseOrBasis: string;
  verifiedAt: string;
  modification?: string;
  permittedMode: "hosted" | "embed";
}
export interface Chapter {
  id: string; version: string; sequence: number; title: string;
  introductionFi: string; objectives: string[]; blockIds: string[]; exerciseIds: string[];
}
export interface Lesson {
  id: string; version: string; bookId: BookId; chapterId?: string;
  sequence: number; title: string; estimatedMinutes: number; objectives: string[];
  model: "text" | "vocabulary" | "grammar" | "application" | "review";
  steps: { id: string; title: string; required: boolean; blockId?: string; exerciseId?: string }[];
}
export type ContentBlock =
  | { id: string; version: string; kind: "heading"; level: 2 | 3; text: string }
  | { id: string; version: string; kind: "paragraph" | "authenticText"; text: string; language: "de" | "fi"; sourceId?: string }
  | { id: string; version: string; kind: "dialogue"; turns: { speaker: string; text: string }[]; sourceId: string }
  | { id: string; version: string; kind: "grammar"; title: string; explanationFi: string; examples: { de: string; fi: string }[] }
  | { id: string; version: string; kind: "table"; headers: string[]; rows: string[][] }
  | { id: string; version: string; kind: "image"; src: string; alt: string; caption: string; sourceId: string }
  | { id: string; version: string; kind: "vocabulary"; entries: { id: string; de: string; fi: string; note?: string }[] }
  | { id: string; version: string; kind: "media"; mediaType: "audio" | "video"; title: string; embedUrl: string; sourceId: string };

export interface ExerciseBase {
  id: string; version: string; promptFi: string; objectives: string[];
  difficulty: "guided" | "basic" | "applied"; hintFi?: string; explanationFi: string;
}
export type Exercise =
  | (ExerciseBase & { type: "single-choice"; options: { id: string; label: string }[]; correctOptionId: string })
  | (ExerciseBase & { type: "gap-fill"; sentenceBefore: string; sentenceAfter: string; acceptedAnswers: string[]; caseSensitive?: boolean })
  | (ExerciseBase & { type: "matching"; left: { id: string; label: string }[]; right: { id: string; label: string }[]; pairs: { leftId: string; rightId: string }[] })
  | (ExerciseBase & { type: "highlight"; blockId: string; text: string; acceptedRanges: { start: number; end: number }[] });

export type HighlightRange = { start: number; end: number };
export type ExerciseAnswer = string | Record<string, string> | HighlightRange | null;
export type ExerciseAttempt = {
  id: string; exerciseId: string; exerciseVersion: string; answer: ExerciseAnswer;
  checkedAt: string | null; status: "draft" | "correct" | "incorrect"; updatedAt: string;
};
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
  exercises: Exercise[]; sources: SourceAttribution[];
}

/** Allow empty forthcoming books; reject dangling or duplicated published content. */
export function validateBook(book: Book): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  const all = [...book.chapters, ...book.lessons, ...book.blocks, ...book.exercises, ...book.sources];
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
  }
  for (const lesson of book.lessons) {
    if (lesson.bookId !== book.id) errors.push("Wrong book: " + lesson.id);
    if (lesson.chapterId && !chapters.has(lesson.chapterId)) errors.push("Unknown chapter: " + lesson.chapterId);
    const stepIds = new Set<string>();
    for (const step of lesson.steps) {
      if (stepIds.has(step.id)) errors.push("Repeated lesson step: " + step.id);
      stepIds.add(step.id);
      if (step.blockId && !blocks.has(step.blockId)) errors.push("Unknown block: " + step.blockId);
      if (step.exerciseId && !exercises.has(step.exerciseId)) errors.push("Unknown exercise: " + step.exerciseId);
    }
  }
  for (const block of book.blocks) {
    if ("sourceId" in block && block.sourceId && !sources.has(block.sourceId)) errors.push("Unknown source: " + block.sourceId);
  }
  return errors;
}
