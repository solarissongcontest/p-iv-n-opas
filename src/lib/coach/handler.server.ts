import { verifyArthurDeviceToken } from "../deviceAuth.server.ts";
import { addDays } from "../fi.ts";
import { supabaseAdmin } from "../../integrations/supabase/client.server.ts";
import { buildCoachContext, type StudySnapshot } from "./context.ts";
import {
  coachRequestSchema,
  localCoachDecision,
  renderCoachResponse,
} from "./policy.ts";
import {
  GeminiCoachProvider,
  remoteCoachConfigured,
} from "./provider.server.ts";

const NO_STORE_HEADERS = { "Cache-Control": "no-store" };

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: NO_STORE_HEADERS });
}

function helsinkiToday() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Helsinki",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return get("year") + "-" + get("month") + "-" + get("day");
}

async function auditCoachInteraction(input: {
  ownerId: string;
  courseId: string;
  topicId?: string | undefined;
  mode: string;
  tactic?: string | undefined;
  hintLevel: number;
  remoteUsed: boolean;
  providerStatus: string;
  answerFirewallBlocked?: boolean | undefined;
}) {
  try {
    await (supabaseAdmin as any).from("ai_interactions").insert({
      owner_id: input.ownerId,
      course_id: input.courseId,
      topic_id: input.topicId ?? null,
      mode: input.mode,
      tactic: input.tactic ?? null,
      hint_level: input.hintLevel,
      remote_used: input.remoteUsed,
      provider_status: input.providerStatus,
      answer_firewall_blocked: input.answerFirewallBlocked ?? false,
    });
  } catch {
    // Audit logging must never break tutoring.
  }
}

async function readLimitedBody(request: Request, limit = 20_000) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > limit) {
    throw new Error("too_large");
  }

  const reader = request.body?.getReader();
  if (!reader) return "";

  const decoder = new TextDecoder();
  let size = 0;
  let raw = "";

  while (true) {
    const part = await reader.read();
    if (part.done) break;
    size += part.value.byteLength;
    if (size > limit) {
      await reader.cancel();
      throw new Error("too_large");
    }
    raw += decoder.decode(part.value, { stream: true });
  }

  raw += decoder.decode();
  return raw;
}

export async function handleCoach(request: Request): Promise<Response> {
  if (request.method !== "POST" && request.method !== "GET") {
    return json({ error: "Menetelmä ei ole sallittu." }, 405);
  }

  let ownerId: string;
  try {
    const token = request.headers
      .get("authorization")
      ?.replace(/^Bearer\s+/i, "");
    if (!token) {
      return json(
        { error: "Avaa Opintopäiväkirja uudelleen kirjautuaksesi." },
        401,
      );
    }
    ownerId = verifyArthurDeviceToken(token).sub;
  } catch {
    return json(
      { error: "Kirjautuminen on vanhentunut. Avaa sovellus uudelleen." },
      401,
    );
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: "Virheellinen alkuperä." }, 403);
  }

  if (request.method === "GET") {
    return json({
      provider: remoteCoachConfigured() ? "gemini" : "local",
      remoteConfigured: remoteCoachConfigured(),
    });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "Pyyntö ei ole JSON-muotoinen." }, 415);
  }

  let raw = "";
  try {
    raw = await readLimitedBody(request);
  } catch (error) {
    if (error instanceof Error && error.message === "too_large") {
      return json({ error: "Pyyntö on liian pitkä." }, 413);
    }
    return json({ error: "Pyyntöä ei voitu lukea." }, 400);
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(raw);
  } catch {
    return json({ error: "Virheellinen pyyntö." }, 400);
  }

  const parsed = coachRequestSchema.safeParse(parsedJson);
  if (!parsed.success) {
    return json(
      { error: "Tarkista aihe, tehtävä ja oman yrityksesi pituus." },
      400,
    );
  }

  const input = parsed.data;

  try {
    const now = helsinkiToday();

    const [
      coursesResult,
      topicsResult,
      sessionsResult,
      examsResult,
      mistakesResult,
      planResult,
      preferencesResult,
    ] = await Promise.all([
      supabaseAdmin
        .from("courses")
        .select("*")
        .eq("owner_id", ownerId)
        .eq("archived", false),
      supabaseAdmin.from("topics").select("*").eq("owner_id", ownerId),
      supabaseAdmin
        .from("study_sessions")
        .select("course_id,date,minutes")
        .eq("owner_id", ownerId)
        .gte("date", addDays(now, -6))
        .limit(500),
      supabaseAdmin
        .from("exams")
        .select("course_id,date")
        .eq("owner_id", ownerId)
        .gte("date", now),
      supabaseAdmin
        .from("mistakes")
        .select("course_id,status")
        .eq("owner_id", ownerId)
        .neq("status", "mastered"),
      supabaseAdmin
        .from("plan_items")
        .select("course_id,topic_id,date,status,target_minutes")
        .eq("owner_id", ownerId)
        .gte("date", now)
        .limit(500),
      (supabaseAdmin as any)
        .from("user_preferences")
        .select("study_weekdays")
        .eq("owner_id", ownerId)
        .maybeSingle(),
    ]);

    const results = [
      coursesResult,
      topicsResult,
      sessionsResult,
      examsResult,
      mistakesResult,
      planResult,
      preferencesResult,
    ];

    if (results.some((result) => result.error)) {
      return json(
        { error: "Opiskelutietoja ei voitu hakea. Yritä uudelleen." },
        503,
      );
    }

    const context = buildCoachContext(
      {
        courses: coursesResult.data,
        topics: topicsResult.data,
        sessions: sessionsResult.data,
        exams: examsResult.data,
        mistakes: mistakesResult.data,
        plan: planResult.data,
      } as unknown as StudySnapshot,
      input,
      now,
      preferencesResult.data?.study_weekdays ?? [1, 2, 3, 4, 5],
    );

    if (!context) {
      return json(
        { error: "Valitse oma kurssi ja siihen kuuluva aihe." },
        404,
      );
    }

    const localDecision = localCoachDecision(input);
    const local = renderCoachResponse(input, context, localDecision);

    // Planning, progress and practice prompts remain deterministic.
    // Remote inference is used only to choose a tutoring strategy.
    if (
      !["help", "feedback"].includes(input.mode) ||
      !input.remoteConsent ||
      !input.attempt.trim() ||
      !remoteCoachConfigured()
    ) {
      await auditCoachInteraction({
        ownerId,
        courseId: context.courseId,
        topicId: context.selectedTopicId,
        mode: input.mode,
        tactic: localDecision.tactic,
        hintLevel: input.hintLevel,
        remoteUsed: false,
        providerStatus: "local",
      });
      return json(local);
    }

    const budget = await (supabaseAdmin as any).rpc("consume_coach_budget", {
      p_owner: ownerId,
    });

    if (budget.error) {
      await auditCoachInteraction({
        ownerId,
        courseId: context.courseId,
        topicId: context.selectedTopicId,
        mode: input.mode,
        tactic: localDecision.tactic,
        hintLevel: input.hintLevel,
        remoteUsed: false,
        providerStatus: "budget-error",
      });
      return json({
        ...local,
        status: "unavailable",
        diagnostic: "budget",
      });
    }

    if (budget.data !== true) {
      await auditCoachInteraction({
        ownerId,
        courseId: context.courseId,
        topicId: context.selectedTopicId,
        mode: input.mode,
        tactic: localDecision.tactic,
        hintLevel: input.hintLevel,
        remoteUsed: false,
        providerStatus: "quota",
      });
      return json({
        ...local,
        status: "quota",
        diagnostic: "budget",
      });
    }

    const providerResult = await new GeminiCoachProvider().decide(
      input,
      context,
    );

    const rendered = renderCoachResponse(
      input,
      context,
      providerResult.decision,
    );

    await auditCoachInteraction({
      ownerId,
      courseId: context.courseId,
      topicId: context.selectedTopicId,
      mode: input.mode,
      tactic: providerResult.decision.tactic,
      hintLevel: input.hintLevel,
      remoteUsed: providerResult.source === "gemini",
      providerStatus: providerResult.status,
      answerFirewallBlocked: providerResult.status === "invalid_output",
    });

    return json({
      ...rendered,
      source: providerResult.source,
      status: providerResult.status,
      ...(providerResult.diagnostic
        ? { diagnostic: providerResult.diagnostic }
        : {}),
    });
  } catch {
    return json(
      {
        error:
          "Coach-yhteys ei juuri nyt toimi. Voit käyttää paikallista ohjausta.",
      },
      503,
    );
  }
}
