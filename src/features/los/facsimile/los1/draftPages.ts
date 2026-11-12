/**
 * LOS! 1 facsimile layout pilot. Deliberately NOT a published page map.
 * No fictitious printed page numbers, source approvals or PDF URLs.
 * Source: LOS1_FACSIMILE_MASTERPLAN v1.0.
 */
export type Los1PrintSide = "single" | "left" | "right";
export type Los1DraftPageKind =
  | "cover" | "inside-cover" | "title" | "welcome" | "contents"
  | "chapter-photo" | "chapter-goals" | "vocabulary" | "grammar";

export type Los1DigitalTarget = {
  chapterId: string | null;
  section: "overview" | "contents" | "chapter" | "vocabulary" | "grammar";
};

export type Los1DraftPage = {
  id: string;
  kind: Los1DraftPageKind;
  title: string;
  physicalSide: Los1PrintSide;
  spreadId: string | null;
  printedPageLabel: null;
  digitalTarget: Los1DigitalTarget | null;
};

/** The entire pilot is visibly a layout preview, not a publishable textbook. */
export const LOS1_DRAFT_EDITION_ID = "los1-facsimile-layout-preview-2026-11";
export const LOS1_DRAFT_PAGES: readonly Los1DraftPage[] = [
  { id: "front-cover", kind: "cover", title: "Etukansi", physicalSide: "single", spreadId: null, printedPageLabel: null, digitalTarget: { chapterId: null, section: "overview" } },
  { id: "inside-cover", kind: "inside-cover", title: "Etukannen sisäpuoli", physicalSide: "left", spreadId: "front-1", printedPageLabel: null, digitalTarget: null },
  { id: "title", kind: "title", title: "Nimiölehti", physicalSide: "right", spreadId: "front-1", printedPageLabel: null, digitalTarget: { chapterId: null, section: "overview" } },
  { id: "welcome", kind: "welcome", title: "Tervetuloa", physicalSide: "left", spreadId: "front-2", printedPageLabel: null, digitalTarget: { chapterId: null, section: "overview" } },
  { id: "contents", kind: "contents", title: "Sisällysluettelo", physicalSide: "right", spreadId: "front-2", printedPageLabel: null, digitalTarget: { chapterId: null, section: "contents" } },
  { id: "chapter-01-photo", kind: "chapter-photo", title: "01 · Hallo! · Avauskuva", physicalSide: "left", spreadId: "c01-open", printedPageLabel: null, digitalTarget: { chapterId: "01", section: "chapter" } },
  { id: "chapter-01-goals", kind: "chapter-goals", title: "01 · Hallo! · Tavoitteet", physicalSide: "right", spreadId: "c01-open", printedPageLabel: null, digitalTarget: { chapterId: "01", section: "chapter" } },
  { id: "chapter-01-vocabulary", kind: "vocabulary", title: "01 · Sanasto", physicalSide: "left", spreadId: "c01-vocab-grammar", printedPageLabel: null, digitalTarget: { chapterId: "01", section: "vocabulary" } },
  { id: "chapter-01-grammar", kind: "grammar", title: "01 · Kielioppi", physicalSide: "right", spreadId: "c01-vocab-grammar", printedPageLabel: null, digitalTarget: { chapterId: "01", section: "grammar" } },
] as const;

export function getDraftVisiblePageIndexes(
  pages: readonly Los1DraftPage[],
  index: number,
  mode: "single" | "spread",
): number[] {
  if (index < 0 || index >= pages.length) return [];
  const page = pages[index];
  if (!page) return [];
  if (mode === "single" || !page.spreadId) return [index];
  return pages.flatMap((candidate, candidateIndex) =>
    candidate.spreadId === page.spreadId ? [candidateIndex] : [],
  );
}

export function moveDraftPage(
  pages: readonly Los1DraftPage[],
  index: number,
  mode: "single" | "spread",
  direction: -1 | 1,
): number {
  if (pages.length === 0) return 0;
  const current = Math.max(0, Math.min(pages.length - 1, index));
  const visible = getDraftVisiblePageIndexes(pages, current, mode);
  const stepFrom = direction === 1 ? Math.max(...visible) : Math.min(...visible);
  return Math.max(0, Math.min(pages.length - 1, stepFrom + direction));
}

export function validateDraftPages(pages: readonly Los1DraftPage[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const spreads = new Map<string, Array<{ index: number; side: Los1PrintSide }>>();
  pages.forEach((page, index) => {
    if (ids.has(page.id)) errors.push(`Toistuva sivutunnus: ${page.id}`);
    ids.add(page.id);
    if (page.printedPageLabel !== null) errors.push(`Luonnokselle ei saa keksiä sivunumeroa: ${page.id}`);
    if (page.physicalSide === "single" && page.spreadId !== null) errors.push(`Yksittäisellä sivulla on aukeama: ${page.id}`);
    if (page.physicalSide !== "single" && !page.spreadId) errors.push(`Aukeamasivulta puuttuu aukeama-ID: ${page.id}`);
    if (page.spreadId) spreads.set(page.spreadId, [...(spreads.get(page.spreadId) ?? []), { index, side: page.physicalSide }]);
  });
  for (const [id, entries] of spreads) {
    if (entries.length !== 2 || entries[0]?.side !== "left" || entries[1]?.side !== "right" ||
        entries[1]?.index !== (entries[0]?.index ?? -1) + 1) {
      errors.push(`Virheellinen vasen–oikea-aukeama: ${id}`);
    }
  }
  return errors;
}
