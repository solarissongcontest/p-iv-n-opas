import { createHash } from "node:crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { KE04_QUESTION_BANK, KE04_QUESTION_BANK_VERSION } from "@/data/ke04-question-bank";
import { ke04TextbookTopicForQuestion } from "./ke04-textbook-topics";
import { verifyArthurDeviceToken } from "./deviceAuth.server";

const noStore = { "Cache-Control": "no-store" };

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: noStore });
}

function deterministicUuid(value: string) {
  const bytes = Buffer.from(createHash("sha256").update(value).digest().subarray(0, 16));
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x50;
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/**
 * The production database can temporarily lag application migrations.
 * Keep the curated bank writable using the original LOPS21 question_bank
 * contract and place richer V3 fields in metadata. The bank's own skill
 * taxonomy remains intact while the stored topic_id follows the actual Mooli
 * 4 subchapter that is taught at school.
 */
function questionRow(
  ownerId: string,
  courseId: string,
  topicId: string,
  question: (typeof KE04_QUESTION_BANK)[number],
) {
  const storedQuestionType = question.questionType === "matching" ? "recognition" : question.questionType;
  const textbookTopic = ke04TextbookTopicForQuestion(question);
  return {
    id: deterministicUuid(`ke04-v3:${ownerId}:${question.seedKey}`),
    owner_id: ownerId,
    course_id: courseId,
    topic_id: topicId,
    curriculum: "LOPS21",
    module_code: "KE04",
    question_type: storedQuestionType,
    prompt: question.prompt,
    options: question.options,
    correct_answer: question.correctAnswer,
    explanation: question.explanation,
    hints: question.hints,
    skills: question.skills,
    expected_concepts: question.expectedConcepts,
    difficulty: question.difficulty,
    estimated_seconds: question.estimatedSeconds,
    status: "active",
    source_type: "seed",
    source_ref: question.seedKey,
    metadata: {
      curated: true,
      contentId: question.contentId,
      chapter: question.chapter,
      // Keep the original question-bank classification for adaptive skill work.
      topicName: question.topicName,
      subtopic: question.subtopic,
      textbookSection: textbookTopic.section,
      textbookUnit: textbookTopic.unit,
      textbookTopicName: textbookTopic.name,
      originalType: question.originalType,
      questionType: question.questionType,
      prerequisites: question.prerequisites,
      commonErrors: question.commonErrors,
      scoringGuide: question.scoring,
      seedVersion: KE04_QUESTION_BANK_VERSION,
      reserveForExam: question.reserveForExam,
      examEligible: question.examEligible,
      validated: question.validated,
      matchingPairs: question.matchingPairs,
      answerMode: question.answerMode,
      points: Math.max(1, Math.min(30, Math.round(question.points))),
      transferLevel: question.difficulty >= 5 ? 5 : question.difficulty >= 4 ? 4 : question.difficulty >= 3 ? 3 : 1,
      pretestEligible: !question.reserveForExam,
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
  const requiredTopicNames = [...new Set(
    KE04_QUESTION_BANK.map((question) => ke04TextbookTopicForQuestion(question).name),
  )];
  const missingTopics = requiredTopicNames.filter((name) => !topicByName.has(name));
  if (missingTopics.length) {
    return json({
      error: "KE04:n aihejako ei vastaa Mooli 4:n alalukuja.",
      missingTopics,
    }, 409);
  }

  const rows = KE04_QUESTION_BANK.map((question) => {
    const textbookTopic = ke04TextbookTopicForQuestion(question);
    return questionRow(
      ownerId,
      body.courseId as string,
      topicByName.get(textbookTopic.name)!,
      question,
    );
  });

  for (let index = 0; index < rows.length; index += 100) {
    const result = await (supabaseAdmin as any)
      .from("question_bank")
      .upsert(rows.slice(index, index + 100), { onConflict: "id" });
    if (result.error) {
      console.error("[KE04 seed] upsert failed", result.error);
      return json({
        error: "KE04-tehtäväpankkia ei voitu tallentaa.",
        detail: process.env["NODE_ENV"] === "production" ? undefined : String(result.error.message ?? ""),
      }, 503);
    }
  }

  const verify = await (supabaseAdmin as any)
    .from("question_bank")
    .select("id,topic_id,source_ref,metadata")
    .eq("owner_id", ownerId)
    .eq("course_id", body.courseId)
    .eq("source_type", "seed")
    .limit(1000);

  if (verify.error) return json({ error: "KE04-tehtäväpankin varmennus epäonnistui." }, 503);
  const seededRows = (verify.data ?? []).filter(
    (row: any) => row.metadata?.seedVersion === KE04_QUESTION_BANK_VERSION,
  );
  const seededReserve = seededRows.filter((row: any) => row.metadata?.reserveForExam === true).length;
  const valid =
    seededRows.length === 780 &&
    seededReserve === 45 &&
    seededRows.every((row: any) => row.metadata?.validated === true) &&
    seededRows.every((row: any) => typeof row.metadata?.textbookSection === "string");

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
    storage: "compatible",
    topicStructure: "Mooli 4 subchapters",
  });
}
