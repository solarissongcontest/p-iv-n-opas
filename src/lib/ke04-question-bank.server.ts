import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { KE04_QUESTION_BANK, KE04_QUESTION_BANK_VERSION } from "@/data/ke04-question-bank";
import { verifyArthurDeviceToken } from "./deviceAuth.server";

const noStore = { "Cache-Control": "no-store" };

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: noStore });
}

function questionRow(
  ownerId: string,
  courseId: string,
  topicId: string,
  question: (typeof KE04_QUESTION_BANK)[number],
) {
  return {
    owner_id: ownerId,
    course_id: courseId,
    topic_id: topicId,
    curriculum: "LOPS21",
    module_code: "KE04",
    content_id: question.contentId,
    question_type: question.questionType,
    prompt: question.prompt,
    options: question.options,
    correct_answer: question.correctAnswer,
    explanation: question.explanation,
    hints: question.hints,
    skills: question.skills,
    expected_concepts: question.expectedConcepts,
    prerequisites: question.prerequisites,
    common_errors: question.commonErrors,
    difficulty: question.difficulty,
    estimated_seconds: question.estimatedSeconds,
    status: "active",
    source_type: "seed",
    source_ref: question.seedKey,
    validated: question.validated,
    exam_eligible: question.examEligible,
    reserve_for_exam: question.reserveForExam,
    matching_pairs: question.matchingPairs,
    scoring_guide: question.scoring,
    seed_version: KE04_QUESTION_BANK_VERSION,
    answer_mode: question.answerMode,
    points: Math.max(1, Math.min(30, Math.round(question.points))),
    transfer_level: question.difficulty >= 5 ? 5 : question.difficulty >= 4 ? 4 : question.difficulty >= 3 ? 3 : 1,
    pretest_eligible: !question.reserveForExam,
    stimulus_package: {},
    metadata: {
      curated: true,
      contentId: question.contentId,
      chapter: question.chapter,
      topicName: question.topicName,
      subtopic: question.subtopic,
      originalType: question.originalType,
      scoring: question.scoring,
      seedVersion: KE04_QUESTION_BANK_VERSION,
      reserveForExam: question.reserveForExam,
      examEligible: question.examEligible,
    },
  };
}

export async function handleKe04QuestionBankSeed(request: Request): Promise<Response> {
  if (request.method !== "POST") return json({ error: "Menetelmä ei ole sallittu." }, 405);

  let ownerId = "";
  try {
    const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!token) return json({ error: "Kirjautuminen puuttuu." }, 401);
    ownerId = verifyArthurDeviceToken(token).sub;
  } catch {
    return json({ error: "Kirjautuminen on vanhentunut." }, 401);
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ error: "Virheellinen alkuperä." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "Pyyntö ei ole JSON-muotoinen." }, 415);
  }

  let body: { courseId?: unknown };
  try {
    const raw = await request.text();
    if (raw.length > 4000) return json({ error: "Pyyntö on liian pitkä." }, 413);
    body = JSON.parse(raw) as { courseId?: unknown };
  } catch {
    return json({ error: "Virheellinen pyyntö." }, 400);
  }

  if (typeof body.courseId !== "string" || !/^[0-9a-f-]{36}$/i.test(body.courseId)) {
    return json({ error: "KE04-kurssin tunniste puuttuu." }, 400);
  }

  if (KE04_QUESTION_BANK.length !== 780) {
    return json({ error: "KE04 V3 -seed ei läpäissyt sisäistä määrätarkistusta." }, 500);
  }
  const reserveCount = KE04_QUESTION_BANK.filter((question) => question.reserveForExam).length;
  if (reserveCount !== 45) {
    return json({ error: "KE04 V3 -koereservi ei läpäissyt sisäistä tarkistusta." }, 500);
  }

  const [courseResult, topicsResult] = await Promise.all([
    (supabaseAdmin as any)
      .from("courses")
      .select("id,code,name")
      .eq("owner_id", ownerId)
      .eq("id", body.courseId)
      .maybeSingle(),
    (supabaseAdmin as any)
      .from("topics")
      .select("id,name,course_id")
      .eq("owner_id", ownerId)
      .eq("course_id", body.courseId)
      .order("position"),
  ]);

  if (courseResult.error || topicsResult.error) {
    return json({ error: "KE04-kurssin tietoja ei voitu lukea." }, 503);
  }
  if (!courseResult.data || String(courseResult.data.code).toUpperCase() !== "KE04") {
    return json({ error: "Valittu kurssi ei ole KE04." }, 400);
  }

  const topicByName = new Map<string, string>(
    (topicsResult.data ?? []).map((topic: { id: string; name: string }) => [topic.name, topic.id]),
  );
  const missingTopics = [...new Set(
    KE04_QUESTION_BANK
      .map((question) => question.topicName)
      .filter((name) => !topicByName.has(name)),
  )];
  if (missingTopics.length) {
    return json({
      error: "KE04:n aihejako ei vastaa kuratoitua tehtäväpankkia.",
      missingTopics,
    }, 409);
  }

  const rows = KE04_QUESTION_BANK.map((question) =>
    questionRow(ownerId, body.courseId as string, topicByName.get(question.topicName)!, question)
  );

  for (let index = 0; index < rows.length; index += 100) {
    const result = await (supabaseAdmin as any)
      .from("question_bank")
      .upsert(rows.slice(index, index + 100), { onConflict: "owner_id,source_ref" });
    if (result.error) {
      console.error("[KE04 seed] upsert failed", result.error);
      return json({ error: "KE04-tehtäväpankkia ei voitu tallentaa." }, 503);
    }
  }

  const verify = await (supabaseAdmin as any)
    .from("question_bank")
    .select("id,reserve_for_exam,validated", { count: "exact", head: false })
    .eq("owner_id", ownerId)
    .eq("course_id", body.courseId)
    .eq("source_type", "seed")
    .eq("seed_version", KE04_QUESTION_BANK_VERSION)
    .limit(1000);

  if (verify.error) return json({ error: "KE04-tehtäväpankin varmennus epäonnistui." }, 503);
  const seededRows = verify.data ?? [];
  const seededReserve = seededRows.filter((row: any) => row.reserve_for_exam).length;
  const valid = seededRows.length === 780 && seededReserve === 45 && seededRows.every((row: any) => row.validated === true);

  if (!valid) {
    return json({
      error: "KE04-tehtäväpankki tallentui vain osittain.",
      created: seededRows.length,
      reserve: seededReserve,
    }, 500);
  }

  return json({
    ok: true,
    version: KE04_QUESTION_BANK_VERSION,
    questions: seededRows.length,
    reserve: seededReserve,
  });
}
