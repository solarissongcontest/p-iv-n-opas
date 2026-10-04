import type { SupabaseClient } from "@supabase/supabase-js";

type AdminClient = SupabaseClient<any>;
type Row = Record<string, any>;

const OWNER_TABLES = [
  "study_sessions",
  "exams",
  "plan_items",
  "mistakes",
  "practice_tests",
  "progress_events",
  "practice_attempts",
  "mastery_evidence",
  "learning_events",
  "error_observations",
  "study_materials",
  "ai_interactions",
  "question_bank",
] as const;

export function isUuid(value: unknown): value is string {
  return typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function ensureOk(error: { message?: string } | null, context: string) {
  if (error) throw new Error(context + ": " + (error.message ?? "tuntematon tietokantavirhe"));
}

function newer(a: Row | null | undefined, b: Row | null | undefined) {
  const stamp = (row: Row | null | undefined) =>
    String(row?.["updated_at"] ?? row?.["learning_state_updated_at"] ?? row?.["created_at"] ?? "");
  return stamp(a) > stamp(b);
}

function omit(row: Row, keys: string[]) {
  const copy: Row = { ...row };
  for (const key of keys) delete copy[key];
  return copy;
}

function maxNumber(a: unknown, b: unknown) {
  const aa = typeof a === "number" && Number.isFinite(a) ? a : 0;
  const bb = typeof b === "number" && Number.isFinite(b) ? b : 0;
  return Math.max(aa, bb);
}

function latestDate(a: unknown, b: unknown) {
  const aa = typeof a === "string" ? a : "";
  const bb = typeof b === "string" ? b : "";
  return aa >= bb ? (aa || null) : (bb || null);
}

function earliestDate(a: unknown, b: unknown) {
  const values = [a, b].filter((value): value is string => typeof value === "string" && value.length > 0);
  return values.length ? [...values].sort()[0] ?? null : null;
}

function remapId(value: unknown, map: Map<string, string>) {
  return typeof value === "string" ? (map.get(value) ?? value) : value;
}

function remapIds(value: unknown, map: Map<string, string>) {
  if (!Array.isArray(value)) return value;
  return [...new Set(value.map((item) => remapId(item, map)).filter((item): item is string => typeof item === "string"))];
}

async function ownerRows(admin: AdminClient, table: string, ownerId: string) {
  const { data, error } = await admin.from(table).select("*").eq("owner_id", ownerId);
  ensureOk(error, "Taulun " + table + " lukeminen epäonnistui");
  return (data ?? []) as Row[];
}

const MEANINGFUL_STUDY_TABLES = [
  "study_sessions",
  "practice_attempts",
  "practice_tests",
  "mistakes",
  "weekly_checkins",
  "mastery_evidence",
  "progress_events",
  "exam_simulations",
  "pretest_attempts",
  "active_study_sessions",
] as const;

async function ownerHasMeaningfulStudyData(admin: AdminClient, ownerId: string) {
  for (const table of MEANINGFUL_STUDY_TABLES) {
    const { data, error } = await admin
      .from(table)
      .select("id")
      .eq("owner_id", ownerId)
      .limit(1);
    ensureOk(error, "Taulun " + table + " aktiivisuuden tarkistus epäonnistui");
    if ((data ?? []).length > 0) return true;
  }
  return false;
}

async function mergeUpdatedSingleton(
  admin: AdminClient,
  table: "user_preferences" | "notification_settings",
  fromOwner: string,
  toOwner: string,
) {
  const sourceRows = await ownerRows(admin, table, fromOwner);
  const targetRows = await ownerRows(admin, table, toOwner);
  const source = sourceRows[0];
  if (!source) return;
  const target = targetRows[0];

  if (!target) {
    const { error } = await admin.from(table).update({ owner_id: toOwner }).eq("owner_id", fromOwner);
    ensureOk(error, "Taulun " + table + " omistajan siirto epäonnistui");
    return;
  }

  if (newer(source, target)) {
    const patch = omit(source, ["id", "owner_id", "created_at", "updated_at"]);
    const { error } = await admin.from(table).update(patch).eq("owner_id", toOwner);
    ensureOk(error, "Taulun " + table + " uusimpien asetusten yhdistäminen epäonnistui");
  }

  const { error } = await admin.from(table).delete().eq("owner_id", fromOwner);
  ensureOk(error, "Taulun " + table + " vanhan omistajarivin poisto epäonnistui");
}

async function mergeWeeklyCheckins(
  admin: AdminClient,
  fromOwner: string,
  toOwner: string,
  topicMap: Map<string, string>,
) {
  const source = await ownerRows(admin, "weekly_checkins", fromOwner);
  const target = await ownerRows(admin, "weekly_checkins", toOwner);
  const targetByWeek = new Map(target.map((row) => [String(row["week_start"]), row]));
  const toMove: Row[] = [];
  const toDelete: string[] = [];

  for (const row of source) {
    const key = String(row["week_start"]);
    const existing = targetByWeek.get(key);
    const mapped = {
      ...row,
      owner_id: toOwner,
      hardest_topic_id: remapId(row["hardest_topic_id"], topicMap),
    };

    if (!existing) {
      toMove.push(mapped);
      continue;
    }

    if (newer(mapped, existing)) {
      const patch = omit(mapped, ["id", "owner_id", "created_at", "updated_at"]);
      const { error } = await admin.from("weekly_checkins").update(patch).eq("id", existing["id"]);
      ensureOk(error, "Viikkokatsauksen yhdistäminen epäonnistui");
    }
    if (typeof row["id"] === "string") toDelete.push(row["id"]);
  }

  if (toMove.length) {
    const { error } = await admin.from("weekly_checkins").upsert(toMove, { onConflict: "id" });
    ensureOk(error, "Viikkokatsausten siirto epäonnistui");
  }
  if (toDelete.length) {
    const { error } = await admin.from("weekly_checkins").delete().in("id", toDelete);
    ensureOk(error, "Vanhojen viikkokatsausten poisto epäonnistui");
  }
}

async function mergeUniqueOwnerRows(
  admin: AdminClient,
  table: "push_subscriptions" | "push_deliveries",
  uniqueKey: "endpoint" | "delivery_key",
  fromOwner: string,
  toOwner: string,
) {
  const source = await ownerRows(admin, table, fromOwner);
  const target = await ownerRows(admin, table, toOwner);
  const targetByKey = new Map(target.map((row) => [String(row[uniqueKey]), row]));
  const toMove: Row[] = [];
  const toDelete: string[] = [];

  for (const row of source) {
    const existing = targetByKey.get(String(row[uniqueKey]));
    if (!existing) {
      toMove.push({ ...row, owner_id: toOwner });
      continue;
    }
    if (newer(row, existing)) {
      const patch = omit(row, ["id", "owner_id", "created_at", "updated_at"]);
      const { error } = await admin.from(table).update(patch).eq("id", existing["id"]);
      ensureOk(error, "Taulun " + table + " rivien yhdistäminen epäonnistui");
    }
    if (typeof row["id"] === "string") toDelete.push(row["id"]);
  }

  if (toMove.length) {
    const { error } = await admin.from(table).upsert(toMove, { onConflict: "id" });
    ensureOk(error, "Taulun " + table + " siirto epäonnistui");
  }
  if (toDelete.length) {
    const { error } = await admin.from(table).delete().in("id", toDelete);
    ensureOk(error, "Taulun " + table + " vanhojen rivien poisto epäonnistui");
  }
}

async function mergeCoachBudget(admin: AdminClient, fromOwner: string, toOwner: string) {
  const source = (await ownerRows(admin, "coach_budget", fromOwner))[0];
  if (!source) return;
  const target = (await ownerRows(admin, "coach_budget", toOwner))[0];

  if (!target) {
    const { error } = await admin.from("coach_budget").update({ owner_id: toOwner }).eq("owner_id", fromOwner);
    ensureOk(error, "AI-budjetin omistajan siirto epäonnistui");
    return;
  }

  const patch: Row = {};
  if (source["day_start"] === target["day_start"]) {
    patch["day_count"] = maxNumber(source["day_count"], target["day_count"]);
  }
  if (source["window_start"] === target["window_start"]) {
    patch["window_count"] = maxNumber(source["window_count"], target["window_count"]);
  }
  if (Object.keys(patch).length) {
    const { error } = await admin.from("coach_budget").update(patch).eq("owner_id", toOwner);
    ensureOk(error, "AI-budjettien yhdistäminen epäonnistui");
  }
  const { error } = await admin.from("coach_budget").delete().eq("owner_id", fromOwner);
  ensureOk(error, "Vanhan AI-budjetin poisto epäonnistui");
}

async function mergeExperiments(admin: AdminClient, fromOwner: string, toOwner: string) {
  const source = await ownerRows(admin, "learning_experiments", fromOwner);
  const target = await ownerRows(admin, "learning_experiments", toOwner);
  const targetByKey = new Map(target.map((row) => [String(row["experiment_key"]), row]));
  const toMove: Row[] = [];
  const toDelete: string[] = [];

  for (const row of source) {
    const existing = targetByKey.get(String(row["experiment_key"]));
    if (!existing) {
      toMove.push({ ...row, owner_id: toOwner });
      continue;
    }

    const observations = [
      ...(Array.isArray(existing["observations"]) ? existing["observations"] : []),
      ...(Array.isArray(row["observations"]) ? row["observations"] : []),
    ];
    const uniqueObservations = Array.from(
      new Map(observations.map((item) => [JSON.stringify(item), item])).values(),
    );
    const base = newer(row, existing) ? row : existing;
    const patch = {
      ...omit(base, ["id", "owner_id", "created_at", "updated_at", "observations"]),
      observations: uniqueObservations,
    };
    const { error } = await admin.from("learning_experiments").update(patch).eq("id", existing["id"]);
    ensureOk(error, "Oppimiskokeiden yhdistäminen epäonnistui");
    if (typeof row["id"] === "string") toDelete.push(row["id"]);
  }

  if (toMove.length) {
    const { error } = await admin.from("learning_experiments").upsert(toMove, { onConflict: "id" });
    ensureOk(error, "Oppimiskokeiden siirto epäonnistui");
  }
  if (toDelete.length) {
    const { error } = await admin.from("learning_experiments").delete().in("id", toDelete);
    ensureOk(error, "Vanhojen oppimiskokeiden poisto epäonnistui");
  }
}

function mergeTopic(source: Row, target: Row, topicMap: Map<string, string>) {
  const patch: Row = {};
  const maxKeys = [
    "weight",
    "importance",
    "progress",
    "self_level",
    "verified_level",
    "basic_successes",
    "exam_successes",
    "delayed_successes",
    "study_minutes",
  ];
  for (const key of maxKeys) patch[key] = maxNumber(source[key], target[key]);

  patch["school_covered"] = Boolean(source["school_covered"] || target["school_covered"]);
  patch["last_review"] = latestDate(source["last_review"], target["last_review"]);
  patch["next_review"] = earliestDate(source["next_review"], target["next_review"]);
  patch["materials"] = target["materials"] || source["materials"] || null;
  patch["dependencies"] = remapIds(
    [
      ...(Array.isArray(target["dependencies"]) ? target["dependencies"] : []),
      ...(Array.isArray(source["dependencies"]) ? source["dependencies"] : []),
    ],
    topicMap,
  );

  const advancedKeys = [
    "mastery_confidence",
    "evidence_count",
    "strong_evidence_count",
    "recall_strength",
    "application_strength",
    "retention_strength",
    "forgetting_risk",
    "exam_relevance",
    "learning_state_updated_at",
    "understanding_strength",
    "fluency_strength",
    "calibration_strength",
    "blind_spot",
  ];
  const advancedSource = newer(source, target) ? source : target;
  for (const key of advancedKeys) {
    if (key in advancedSource) patch[key] = advancedSource[key];
  }

  return patch;
}

async function dedupePracticeAttempts(admin: AdminClient, fromOwner: string, toOwner: string) {
  const source = await ownerRows(admin, "practice_attempts", fromOwner);
  const target = await ownerRows(admin, "practice_attempts", toOwner);
  const targetOps = new Set(
    target.map((row) => row["operation_id"]).filter((value): value is string => typeof value === "string"),
  );
  const duplicateIds = source
    .filter((row) => typeof row["operation_id"] === "string" && targetOps.has(row["operation_id"]))
    .map((row) => row["id"])
    .filter((value): value is string => typeof value === "string");
  if (duplicateIds.length) {
    const { error } = await admin.from("practice_attempts").delete().in("id", duplicateIds);
    ensureOk(error, "Päällekkäisten harjoitusyritysten yhdistäminen epäonnistui");
  }
}

async function dedupeMasteryEvidence(admin: AdminClient, fromOwner: string, toOwner: string) {
  const source = await ownerRows(admin, "mastery_evidence", fromOwner);
  const target = await ownerRows(admin, "mastery_evidence", toOwner);
  const targetAttempts = new Set(
    target.map((row) => row["attempt_id"]).filter((value): value is string => typeof value === "string"),
  );
  const duplicateIds = source
    .filter((row) => typeof row["attempt_id"] === "string" && targetAttempts.has(row["attempt_id"]))
    .map((row) => row["id"])
    .filter((value): value is string => typeof value === "string");
  if (duplicateIds.length) {
    const { error } = await admin.from("mastery_evidence").delete().in("id", duplicateIds);
    ensureOk(error, "Päällekkäisen osaamisnäytön yhdistäminen epäonnistui");
  }
}

async function moveOwnerTable(
  admin: AdminClient,
  table: (typeof OWNER_TABLES)[number],
  fromOwner: string,
  toOwner: string,
  courseMap: Map<string, string>,
  topicMap: Map<string, string>,
) {
  const rows = await ownerRows(admin, table, fromOwner);
  if (!rows.length) return;

  const mapped = rows.map((row) => ({
    ...row,
    owner_id: toOwner,
    course_id: remapId(row["course_id"], courseMap),
    topic_id: remapId(row["topic_id"], topicMap),
    topic_ids: table === "study_materials" ? remapIds(row["topic_ids"], topicMap) : row["topic_ids"],
  }));

  const { error } = await admin.from(table).upsert(mapped, { onConflict: "id" });
  ensureOk(error, "Taulun " + table + " siirto epäonnistui");
}

async function moveTopicDependencies(
  admin: AdminClient,
  fromOwner: string,
  toOwner: string,
  topicMap: Map<string, string>,
) {
  const source = await ownerRows(admin, "topic_dependencies", fromOwner);
  if (!source.length) return;
  const target = await ownerRows(admin, "topic_dependencies", toOwner);
  const targetKeys = new Set(
    target.map((row) =>
      [
        String(row["topic_id"]),
        String(row["depends_on_topic_id"]),
        String(row["relation_type"]),
      ].join("|"),
    ),
  );

  const toMove: Row[] = [];
  const toDelete: string[] = [];
  for (const row of source) {
    const topicId = remapId(row["topic_id"], topicMap);
    const dependsId = remapId(row["depends_on_topic_id"], topicMap);
    if (typeof topicId !== "string" || typeof dependsId !== "string" || topicId === dependsId) {
      if (typeof row["id"] === "string") toDelete.push(row["id"]);
      continue;
    }
    const key = [topicId, dependsId, String(row["relation_type"])].join("|");
    if (targetKeys.has(key)) {
      if (typeof row["id"] === "string") toDelete.push(row["id"]);
      continue;
    }
    targetKeys.add(key);
    toMove.push({
      ...row,
      owner_id: toOwner,
      topic_id: topicId,
      depends_on_topic_id: dependsId,
    });
  }

  if (toMove.length) {
    const { error } = await admin.from("topic_dependencies").upsert(toMove, { onConflict: "id" });
    ensureOk(error, "Aiheiden riippuvuuksien siirto epäonnistui");
  }
  if (toDelete.length) {
    const { error } = await admin.from("topic_dependencies").delete().in("id", toDelete);
    ensureOk(error, "Päällekkäisten aiheriippuvuuksien poisto epäonnistui");
  }
}

export async function resolveArthurOwner(admin: AdminClient, legacyOwnerId?: string | null) {
  const { data: preferences, error: preferencesError } = await admin
    .from("user_preferences")
    .select("owner_id,display_name,created_at,updated_at")
    .eq("display_name", "Arthur")
    .not("owner_id", "is", null)
    .order("updated_at", { ascending: false })
    .limit(1);
  ensureOk(preferencesError, "Kanonisen Arthur-profiilin haku epäonnistui");

  const preferenceOwner = preferences?.[0]?.owner_id;
  if (isUuid(preferenceOwner)) return preferenceOwner;

  const { data: courses, error: coursesError } = await admin
    .from("courses")
    .select("owner_id,updated_at")
    .eq("code", "KE04")
    .not("owner_id", "is", null)
    .order("updated_at", { ascending: false })
    .limit(1);
  ensureOk(coursesError, "Kanonisen Arthur-kurssin haku epäonnistui");

  const courseOwner = courses?.[0]?.owner_id;
  if (isUuid(courseOwner)) return courseOwner;
  return isUuid(legacyOwnerId) ? legacyOwnerId : null;
}

export async function reconcileLegacyOwner(
  admin: AdminClient,
  fromOwner: string,
  toOwner: string,
) {
  if (fromOwner === toOwner) return;
  if (!isUuid(fromOwner) || !isUuid(toOwner)) throw new Error("Virheellinen omistajatunniste.");

  // Fresh device identities created before canonical-owner sync contain only
  // seeded defaults. Merging those rows would duplicate Planner items and the
  // curated KE04 bank. In that case only move device-level settings and push
  // subscriptions, then let the canonical Arthur profile remain authoritative.
  if (!(await ownerHasMeaningfulStudyData(admin, fromOwner))) {
    await mergeUpdatedSingleton(admin, "notification_settings", fromOwner, toOwner);
    await mergeUpdatedSingleton(admin, "user_preferences", fromOwner, toOwner);
    await mergeUniqueOwnerRows(admin, "push_subscriptions", "endpoint", fromOwner, toOwner);
    await mergeUniqueOwnerRows(admin, "push_deliveries", "delivery_key", fromOwner, toOwner);
    await mergeCoachBudget(admin, fromOwner, toOwner);
    return;
  }

  const [sourceCourses, targetCourses, sourceTopics, targetTopics] = await Promise.all([
    ownerRows(admin, "courses", fromOwner),
    ownerRows(admin, "courses", toOwner),
    ownerRows(admin, "topics", fromOwner),
    ownerRows(admin, "topics", toOwner),
  ]);

  const targetCourseByCode = new Map(
    targetCourses.map((row) => [String(row["code"]).trim().toLowerCase(), row]),
  );
  const courseMap = new Map<string, string>();
  const duplicateCourseIds: string[] = [];

  for (const source of sourceCourses) {
    const sourceId = String(source["id"]);
    const existing = targetCourseByCode.get(String(source["code"]).trim().toLowerCase());
    if (!existing) {
      courseMap.set(sourceId, sourceId);
      continue;
    }

    courseMap.set(sourceId, String(existing["id"]));
    duplicateCourseIds.push(sourceId);
    if (newer(source, existing)) {
      const patch = omit(source, ["id", "owner_id", "created_at", "updated_at"]);
      const { error } = await admin.from("courses").update(patch).eq("id", existing["id"]);
      ensureOk(error, "Kurssitietojen yhdistäminen epäonnistui");
    }
  }

  const targetTopicByKey = new Map(
    targetTopics.map((row) => [
      String(row["course_id"]) + "|" + String(row["name"]).trim().toLowerCase(),
      row,
    ]),
  );
  const topicMap = new Map<string, string>();
  const duplicateTopicIds: string[] = [];
  const mergedTargetTopics: Row[] = [];

  for (const source of sourceTopics) {
    const sourceId = String(source["id"]);
    const targetCourseId = String(courseMap.get(String(source["course_id"])) ?? source["course_id"]);
    const key = targetCourseId + "|" + String(source["name"]).trim().toLowerCase();
    const existing = targetTopicByKey.get(key);
    if (!existing) {
      topicMap.set(sourceId, sourceId);
      continue;
    }
    topicMap.set(sourceId, String(existing["id"]));
    duplicateTopicIds.push(sourceId);
  }

  for (const source of sourceTopics) {
    const mappedId = topicMap.get(String(source["id"]));
    if (!mappedId || mappedId === String(source["id"])) continue;
    const existing = targetTopics.find((row) => String(row["id"]) === mappedId);
    if (!existing) continue;
    mergedTargetTopics.push({
      ...existing,
      ...mergeTopic(source, existing, topicMap),
    });
  }

  await dedupePracticeAttempts(admin, fromOwner, toOwner);
  await dedupeMasteryEvidence(admin, fromOwner, toOwner);

  for (const table of OWNER_TABLES) {
    await moveOwnerTable(admin, table, fromOwner, toOwner, courseMap, topicMap);
  }

  await moveTopicDependencies(admin, fromOwner, toOwner, topicMap);
  await mergeWeeklyCheckins(admin, fromOwner, toOwner, topicMap);
  await mergeUpdatedSingleton(admin, "notification_settings", fromOwner, toOwner);
  await mergeUpdatedSingleton(admin, "user_preferences", fromOwner, toOwner);
  await mergeUniqueOwnerRows(admin, "push_subscriptions", "endpoint", fromOwner, toOwner);
  await mergeUniqueOwnerRows(admin, "push_deliveries", "delivery_key", fromOwner, toOwner);
  await mergeExperiments(admin, fromOwner, toOwner);
  await mergeCoachBudget(admin, fromOwner, toOwner);

  const movableCourses = sourceCourses
    .map((row) => String(row["id"]))
    .filter((id) => !duplicateCourseIds.includes(id));
  if (movableCourses.length) {
    const { error } = await admin.from("courses").update({ owner_id: toOwner }).in("id", movableCourses);
    ensureOk(error, "Kurssien omistajan siirto epäonnistui");
  }

  const movableTopics = sourceTopics
    .filter((row) => !duplicateTopicIds.includes(String(row["id"])))
    .map((row) => ({
      ...row,
      owner_id: toOwner,
      course_id: remapId(row["course_id"], courseMap),
      dependencies: remapIds(row["dependencies"], topicMap),
    }));

  const topicsToWrite = [...movableTopics, ...mergedTargetTopics];
  if (topicsToWrite.length) {
    const { error } = await admin.from("topics").upsert(topicsToWrite, { onConflict: "id" });
    ensureOk(error, "Aiheiden yhdistäminen epäonnistui");
  }

  if (duplicateTopicIds.length) {
    const { error } = await admin.from("topics").delete().in("id", duplicateTopicIds);
    ensureOk(error, "Päällekkäisten aiheiden poisto epäonnistui");
  }
  if (duplicateCourseIds.length) {
    const { error } = await admin.from("courses").delete().in("id", duplicateCourseIds);
    ensureOk(error, "Päällekkäisten kurssien poisto epäonnistui");
  }
}
