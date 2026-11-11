import rawManifest from "./los1-sources.json";

/**
 * LOS! 1 source publication gates. A manifest readiness label (A/B/C) is not
 * permission to publish; each gate must have independently recorded evidence.
 * Keep this module independent of React so CI can catch accidental publication.
 */
export const LOS_SOURCE_STAGES = [
  "candidate", "identified", "rights-verified", "language-reviewed",
  "integrated", "device-tested", "published",
  "blocked", "replaced", "retired", "temporarily-unavailable",
] as const;
export type LosSourceStage = (typeof LOS_SOURCE_STAGES)[number];

export type LosSourceRecord = {
  id: string;
  kind: "source" | "video";
  description: string;
  sourceUrl: string;
  rightsNotes: string;
  manifestReadiness: string;
  manifestCheckedAt: string;
  mediaTested: boolean;
  stage: LosSourceStage;
  licenseCode: string | null;
  licenseUrl: string | null;
  licenseEvidenceUrl: string | null;
  languageReviewed: boolean;
  integrated: boolean;
  deviceTested: boolean;
  published: boolean;
};
export type LosChapterSourcePlan = {
  id: string;
  primarySourceId: string | null;
  textAPlan: string;
  textBPlan: string;
  publicationGate: string;
};

function parseStage(value: string): LosSourceStage {
  if (!LOS_SOURCE_STAGES.some(stage => stage === value)) {
    throw new Error(`Tuntematon LOS!-lähteen julkaisuvaihe: ${value}`);
  }
  return value as LosSourceStage;
}
export const LOS1_SOURCE_REGISTRY: readonly LosSourceRecord[] =
  rawManifest.sources.map(source => ({
    ...source,
    kind: source.kind === "video" ? "video" as const : "source" as const,
    stage: parseStage(source.stage),
  }));
export const LOS1_CHAPTER_SOURCE_PLANS: readonly LosChapterSourcePlan[] = rawManifest.chapters;

export const findLosSource = (id: string): LosSourceRecord | undefined =>
  LOS1_SOURCE_REGISTRY.find(source => source.id === id);

const ACTIVE_PUBLICATION_STAGES: readonly LosSourceStage[] = [
  "rights-verified", "language-reviewed", "integrated", "device-tested", "published",
];

/** No staged or untested source is allowed to appear as a finished textbook text. */
export function sourcePublicationIssues(source: LosSourceRecord): string[] {
  const issues: string[] = [];
  if (!ACTIVE_PUBLICATION_STAGES.includes(source.stage) ||
      !source.licenseCode || !source.licenseUrl || !source.licenseEvidenceUrl) {
    issues.push("Tekstin tai median käyttöoikeuksia ei ole vahvistettu.");
  }
  if (!source.languageReviewed) issues.push("Saksan kieli- ja tasotarkistus puuttuu.");
  if (!source.integrated) issues.push("Kokonaista aineistoa ei ole tuotu oppikirjalukijaan.");
  if (!source.deviceTested) issues.push("Aineiston toimivuutta mobiilissa ja tietokoneella ei ole testattu.");
  if (!source.published || source.stage !== "published") {
    issues.push("Aineistoa ei ole julkaistu.");
  }
  return issues;
}
export const isLosSourcePublishable = (source: LosSourceRecord): boolean =>
  sourcePublicationIssues(source).length === 0;

export type LosChapterSourceGate = {
  chapterId: string;
  sourceId: string | null;
  sourceUrl: string | null;
  sourceStage: LosSourceStage | "missing";
  ready: boolean;
  issues: readonly string[];
};
export function getLosChapterSourceGate(chapterId: string): LosChapterSourceGate {
  const normalized = /^\d{2}$/.test(chapterId) ? `C${chapterId}` : chapterId;
  const chapter = LOS1_CHAPTER_SOURCE_PLANS.find(plan => plan.id === normalized);
  const source = chapter?.primarySourceId ? findLosSource(chapter.primarySourceId) : undefined;
  const issues = !chapter
    ? ["Kappaletta ei ole lähdemanifestissa."]
    : !chapter.primarySourceId
      ? ["Kappaleelta puuttuu hyväksytty, yksilöity ensisijainen Text A -lähde."]
      : !source
        ? ["Ensisijaisen tekstin lähdetunnistetta ei löydy."]
        : source.kind !== "source"
          ? ["Ensisijainen Text A ei voi olla pelkkä videolinkki."]
          : sourcePublicationIssues(source);
  return {
    chapterId: normalized,
    sourceId: chapter?.primarySourceId ?? null,
    sourceUrl: source?.sourceUrl ?? null,
    sourceStage: source?.stage ?? "missing",
    ready: issues.length === 0,
    issues,
  };
}

/** Check stable identifiers and disallow accidentally released unfinished data. */
export function validateLosSourceRegistry(): string[] {
  const errors: string[] = [];
  if (LOS1_SOURCE_REGISTRY.length !== rawManifest.sourceCount) {
    errors.push("Lähteiden määrä ei vastaa manifestia.");
  }
  const ids = new Set<string>();
  for (const source of LOS1_SOURCE_REGISTRY) {
    if (ids.has(source.id)) errors.push(`Toistuva lähdetunniste: ${source.id}`);
    ids.add(source.id);
    if (!/^https:\/\//.test(source.sourceUrl)) errors.push(`Turvaton lähdeosoite: ${source.id}`);
    if (source.published && !isLosSourcePublishable(source)) {
      errors.push(`Lähde on virheellisesti merkitty julkaistuksi: ${source.id}`);
    }
    if (source.stage === "rights-verified" && (!source.licenseCode || !source.licenseEvidenceUrl)) {
      errors.push(`Lähteen lisenssitodiste puuttuu: ${source.id}`);
    }
  }
  if (LOS1_CHAPTER_SOURCE_PLANS.length !== 10) errors.push("LOS! 1:n kappaleita ei ole kymmentä.");
  const chapterIds = new Set<string>();
  for (const chapter of LOS1_CHAPTER_SOURCE_PLANS) {
    if (chapterIds.has(chapter.id)) errors.push(`Toistuva kappaletunniste: ${chapter.id}`);
    chapterIds.add(chapter.id);
    if (chapter.primarySourceId && !ids.has(chapter.primarySourceId)) {
      errors.push(`Tuntematon Text A -lähde: ${chapter.id} → ${chapter.primarySourceId}`);
    }
  }
  return errors;
}
