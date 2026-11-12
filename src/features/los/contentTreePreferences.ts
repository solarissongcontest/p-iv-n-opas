/**
 * LOS! V3.4 navigointipuun laitekohtaiset avausvalinnat.
 * Uusi avain on lisäys: existing los.local.v1.* chapter drafts / answers
 * remain untouched and are never used as a navigation-preferences store.
 */
export type LosContentTreePreferences = {
  version: 1;
  expandedChapters: Record<string, boolean>;
  expandedTaskGroups: Record<string, boolean>;
};

export function emptyLosContentTreePreferences(): LosContentTreePreferences {
  return {version:1,expandedChapters:{},expandedTaskGroups:{}};
}

export function losContentTreePrefsKey(ownerId: string, bookId: number): string {
  return `los.navigation.u1.${ownerId}.${bookId}`;
}

export function parseLosContentTreePreferences(
  raw: string | null,
  validChapters: readonly string[],
): LosContentTreePreferences {
  if (!raw || raw.length > 12_000) return emptyLosContentTreePreferences();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)
        || !("version" in parsed) || parsed.version !== 1) {
      return emptyLosContentTreePreferences();
    }
    const record = parsed as Record<string,unknown>;
    const allowedChapterIds = new Set(validChapters);
    const allowedGroupIds = new Set(validChapters.flatMap(id=>[
      `${id}-practice`,`${id}-test`,
    ]));
    const sanitize = (value:unknown,allowed:Set<string>):Record<string,boolean> => {
      if(!value||typeof value!=="object"||Array.isArray(value))return {};
      return Object.fromEntries(Object.entries(value).filter(([key,entry])=>
        allowed.has(key) && typeof entry === "boolean"));
    };
    return {
      version:1,
      expandedChapters:sanitize(record.expandedChapters,allowedChapterIds),
      expandedTaskGroups:sanitize(record.expandedTaskGroups,allowedGroupIds),
    };
  } catch { return emptyLosContentTreePreferences(); }
}
