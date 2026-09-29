import { z } from "zod";

export const COACH_MODES = ["help", "practice", "feedback", "next", "exam", "progress", "plan"] as const;
export const COACH_TACTICS = [
  "start",
  "recall",
  "givens",
  "relationship",
  "units",
  "diagram",
  "compare",
  "explain",
  "check_step",
  "evidence",
  "counterexample",
] as const;

export const COACH_DIAGNOSTICS = [
  "auth",
  "request",
  "model",
  "provider",
  "network",
  "timeout",
  "budget",
  "invalid_output",
] as const;

export const coachRequestSchema = z.object({
  mode: z.enum(COACH_MODES),
  message: z.string().trim().max(4000).default(""),
  attempt: z.string().trim().max(4000).default(""),
  courseId: z.string().uuid().optional(),
  topicId: z.string().uuid().optional(),
  hintLevel: z.number().int().min(0).max(3).default(0),
  practiceIndex: z.number().int().min(0).max(100).default(0),
  remoteConsent: z.boolean().default(false),
}).strict();

export type CoachRequest = z.infer<typeof coachRequestSchema>;
export const coachDecisionSchema = z.object({ tactic: z.enum(COACH_TACTICS) }).strict();
export type CoachDecision = z.infer<typeof coachDecisionSchema>;

export type CoachTopicContext = {
  id: string;
  name: string;
  level: number;
  selfLevel: number;
  due: boolean;
  importance: number;
};

export type CoachContext = {
  courseId: string;
  courseCode: string;
  topics: CoachTopicContext[];
  selectedTopicId?: string;
  daysToExam: number | null;
  activeMistakes: number;
  recentSessions: number;
  recentMinutes: number;
  dueCount: number;
  today: string;
  suggestedDate: string;
};

export type CoachDiagnostic = (typeof COACH_DIAGNOSTICS)[number];

export type CoachResponse = {
  message: string;
  source: "local" | "gemini";
  status: "local" | "ready" | "quota" | "unavailable" | "invalid_output";
  diagnostic?: CoachDiagnostic;
  kind: "hint" | "question" | "feedback" | "insight" | "proposal";
  hintLevel: number;
  proposal?: {
    id: string;
    courseId: string;
    topicId: string;
    title: string;
    date: string;
    minutes: number;
  };
};

/**
 * Answer firewall:
 * Remote AI output is accepted only as one closed strategy identifier.
 * Provider prose, solutions, markup, tool calls and extra fields are discarded.
 */
export function parseCoachDecision(raw: unknown): CoachDecision | null {
  try {
    const value = typeof raw === "string" ? JSON.parse(raw) : raw;
    const result = coachDecisionSchema.safeParse(value);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function localCoachDecision(input: CoachRequest): CoachDecision {
  if (!input.attempt && input.hintLevel === 0) return { tactic: "start" };
  if (/yksik|unit/i.test(input.message)) return { tactic: "units" };
  if (/kuvio|piirr|diagram|voima/i.test(input.message)) return { tactic: "diagram" };
  if (input.mode === "feedback") return { tactic: "check_step" };
  const fallback: CoachDecision["tactic"][] = ["givens", "relationship", "explain", "check_step"];
  return { tactic: fallback[input.hintLevel] ?? "explain" };
}

const GUIDANCE: Record<CoachDecision["tactic"], string> = {
  start: "Kirjoita ensin, mitä tehtävässä kysytään ja mitä olet jo kokeillut. Yksi keskeneräinen ajatus riittää.",
  recall: "Sulje muistiinpanot hetkeksi. Mitä muistat aiheesta omin sanoin? Merkitse myös kohta, josta olet epävarma.",
  givens: "Erottele tehtävästä annetut tiedot ja etsittävä asia. Mikä tieto auttaa sinua ottamaan ensimmäisen askeleen?",
  relationship: "Mikä periaate, käsite tai laki voisi yhdistää annetut tiedot kysyttyyn asiaan? Perustele valintasi ennen laskemista.",
  units: "Tarkista lähtöarvojen yksiköt ja mahdolliset muunnokset. Mitä yksikköä lopputulokselta odotetaan?",
  diagram: "Piirrä tilanteesta yksinkertainen kuva tai käsitekartta. Merkitse siihen olennaiset osat ja niiden väliset suhteet.",
  compare: "Mitä yhteistä ja mitä eroa vertailtavissa asioissa on? Valitse ensin yksi vertailuperuste.",
  explain: "Selitä yksi välivaihe omin sanoin: miksi juuri tämä askel seuraa edellisestä? Älä vielä kiirehdi lopputulokseen.",
  check_step: "Valitse yrityksestäsi ensimmäinen kohta, josta olet epävarma. Millä säännöllä, yksiköllä tai lähteen kohdalla voisit tarkistaa sen? En vahvista vastausta oikeaksi tämän perusteella.",
  evidence: "Mihin havaintoon tai perusteluun väitteesi nojaa? Erottele oma päätelmäsi siitä, mitä tehtävän aineisto kertoo.",
  counterexample: "Missä tilanteessa ehdottamasi sääntö ei toimisi? Kokeile ajatella yhtä poikkeusta ja tarkenna perusteluasi.",
};

export function renderCoachResponse(
  input: CoachRequest,
  context: CoachContext,
  decision: CoachDecision,
): CoachResponse {
  const topic =
    context.topics.find((candidate) => candidate.id === context.selectedTopicId) ??
    context.topics[0];

  const base = {
    source: "local" as const,
    status: "local" as const,
    hintLevel: input.hintLevel,
  };

  if (!topic) {
    return {
      ...base,
      kind: "insight",
      message: "Lisää kurssille aihe, jotta voin kohdistaa harjoittelun siihen. Voit silti kuvata tehtävää ja omaa yritystäsi.",
    };
  }

  if (input.mode === "practice") {
    const questions = [
      "Selitä aihe " + topic.name + " omin sanoin ilman muistiinpanoja. Nimeä keskeiset käsitteet ja kerro, miten ne liittyvät toisiinsa.",
      "Keksi aiheesta " + topic.name + " oma esimerkki. Perustele, miksi se sopii tähän aiheeseen.",
      "Mikä aiheessa " + topic.name + " menee helposti sekaisin? Kuvaa yksi mahdollinen virhe ja miten huomaisit sen.",
      "Sovella aihetta " + topic.name + " uuteen tilanteeseen. Mitä oletuksia tarvitset, ja milloin ne eivät enää päde?",
    ];
    const index = (input.practiceIndex + (topic.level >= 4 ? 1 : 0)) % questions.length;
    return { ...base, kind: "question", message: questions[index] ?? questions[0]! };
  }

  if (input.mode === "next" || input.mode === "exam" || input.mode === "plan") {
    const reason = topic.due
      ? "Tämän aiheen kertaus on ajankohtainen."
      : "Aiheen kirjattu osaamistaso on " + topic.level + "/5.";
    const exam =
      input.mode === "exam"
        ? context.daysToExam === null
          ? " Tulevaa koepäivää ei ole merkitty."
          : " Kokeeseen on " + context.daysToExam + " päivää. Tämä ei ole arvosanaennuste."
        : "";
    const message =
      context.courseCode +
      ": " +
      topic.name +
      ". " +
      reason +
      exam +
      " Ehdotan 15 minuutin kertausta: palauta ensin mieleen ilman materiaalia, kokeile tehtävää ja tarkista lopuksi oppimateriaalista.";

    if (input.mode !== "plan") return { ...base, kind: "insight", message };

    return {
      ...base,
      kind: "proposal",
      message,
      proposal: {
        id: crypto.randomUUID(),
        courseId: context.courseId,
        topicId: topic.id,
        title: "Kertaus: " + topic.name,
        date: context.suggestedDate,
        minutes: 15,
      },
    };
  }

  if (input.mode === "progress") {
    const mismatch = context.topics.filter(
      (candidate) => candidate.selfLevel > candidate.level + 1,
    ).length;
    const mismatchText = mismatch
      ? " " +
        mismatch +
        " aiheessa itsearvio ylittää kirjatun osaamistason yli yhdellä tasolla. Kokeile niissä tehtävää ilman apua."
      : " Seuraava itsenäinen harjoitus antaa lisää näyttöä osaamisesta.";
    return {
      ...base,
      kind: "insight",
      message:
        "Viimeisen seitsemän päivän aikana tällä kurssilla on " +
        context.recentSessions +
        " opiskelukirjausta ja " +
        context.recentMinutes +
        " minuuttia. Kertausta odottaa " +
        context.dueCount +
        " aihetta, ja avoimia virheitä on " +
        context.activeMistakes +
        "." +
        mismatchText,
    };
  }

  if (input.mode === "feedback" && !input.attempt) {
    return {
      ...base,
      kind: "hint",
      message:
        "Kirjoita oma yrityksesi ennen palautetta. En anna valmista vastausta tai arvioi osaamista pelkän keskustelun perusteella.",
    };
  }

  return {
    ...base,
    kind: input.mode === "feedback" ? "feedback" : "hint",
    message: GUIDANCE[decision.tactic],
  };
}
