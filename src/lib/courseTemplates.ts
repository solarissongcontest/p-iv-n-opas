import { BI05_COURSE, BI05_IIRIS5_TOPICS } from "./bi05-iiris5";

export type ImportedTopic = {
  name: string;
  weight: number;
  importance: number;
  materials?: string | null;
};

export type CourseTemplate = {
  id: "blank" | "BI05" | "KE06";
  label: string;
  code: string;
  name: string;
  subject: string;
  study_mode: string;
  color: string;
  weekly_minutes: number;
  target_system: string;
  target_value: string;
  topics: ImportedTopic[];
};

export const COURSE_TEMPLATES: CourseTemplate[] = [
  {
    id: "blank",
    label: "Tyhjä kurssi",
    code: "",
    name: "",
    subject: "",
    study_mode: "course",
    color: "sage",
    weekly_minutes: 180,
    target_system: "school",
    target_value: "10",
    topics: [],
  },
  {
    id: "BI05",
    label: "BI05 · Ihmisen biologia",
    code: BI05_COURSE.code,
    name: BI05_COURSE.name,
    subject: BI05_COURSE.subject,
    study_mode: "course",
    color: "forest",
    weekly_minutes: BI05_COURSE.weeklyMinutes,
    target_system: BI05_COURSE.targetSystem,
    target_value: BI05_COURSE.targetValue,
    topics: BI05_IIRIS5_TOPICS.map(({ name, weight, importance, materials }) => ({
      name,
      weight,
      importance,
      materials,
    })),
  },
  {
    id: "KE06",
    label: "KE06 · Kemiallinen tasapaino",
    code: "KE06",
    name: "Kemiallinen tasapaino",
    subject: "Kemia",
    study_mode: "course",
    color: "blue",
    weekly_minutes: 180,
    target_system: "school",
    target_value: "10",
    topics: [
      "Reaktionopeus",
      "Kemiallinen tasapaino",
      "Tasapainovakio",
      "Tasapainon siirtyminen",
      "Happo-emästasapaino",
      "pH ja happovakiot",
      "Puskuriliuokset",
      "Liukoisuustasapaino",
      "Tasapainolaskut ja soveltaminen",
    ].map((name) => ({ name, weight: 1, importance: 3 })),
  },
];

export function normalizeTopicWeights(topics: ImportedTopic[]): ImportedTopic[] {
  if (!topics.length) return [];
  const raw = topics.map((t) => Math.max(0, Number(t.weight) || 0));
  const total = raw.reduce((sum, value) => sum + value, 0);
  const basis = total > 0 ? raw : topics.map(() => 1);
  const basisTotal = basis.reduce((sum, value) => sum + value, 0);

  let used = 0;
  return topics.map((topic, index) => {
    const weight =
      index === topics.length - 1
        ? Math.max(0, 100 - used)
        : Math.round((((basis[index] ?? 0) / basisTotal) * 100));
    used += weight;
    return { ...topic, weight };
  });
}

export function parseTopicImport(raw: string): ImportedTopic[] {
  const parsed = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [namePart, weightPart, importancePart, ...materialParts] = line
        .split("|")
        .map((part) => part.trim());
      const name = namePart ?? "";
      const weight = weightPart ? Number(weightPart.replace(",", ".")) : 1;
      const importance = importancePart ? Number(importancePart) : 3;
      const materials = materialParts.join(" | ").trim() || null;
      return {
        name,
        weight: Number.isFinite(weight) && weight >= 0 ? weight : 1,
        importance:
          Number.isFinite(importance) && importance >= 1 && importance <= 5
            ? Math.round(importance)
            : 3,
        materials,
      };
    })
    .filter((topic) => topic.name);

  return normalizeTopicWeights(parsed);
}

export function topicsToImportText(topics: ImportedTopic[]) {
  return topics
    .map(
      (topic) =>
        `${topic.name} | ${topic.weight} | ${topic.importance} | ${topic.materials ?? ""}`,
    )
    .join("\n");
}
