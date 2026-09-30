import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { sendWebPush, type StoredPushSubscription } from "@/lib/serverPush";

const CRON_SCHEDULE = "0 6 * * *";

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server environment variable: ${name}`);
  return value;
}

function localDateParts(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  const weekdayMap: Record<string, number> = {
    Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7,
  };

  return {
    iso: `${read("year")}-${read("month")}-${read("day")}`,
    weekday: weekdayMap[read("weekday")] ?? 1,
    hour: Number(read("hour") || 0),
    minute: Number(read("minute") || 0),
  };
}

function timeMinutes(value: string | null | undefined) {
  if (!value || !/^\d{2}:\d{2}/.test(value)) return null;
  const hours = Number(value.slice(0, 2));
  const minutes = Number(value.slice(3, 5));
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return hours * 60 + minutes;
}

function inQuietHours(current: number, start: number | null, end: number | null) {
  if (start === null || end === null || start === end) return false;
  return start < end
    ? current >= start && current < end
    : current >= start || current < end;
}

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  return Math.round(
    (new Date(`${a}T12:00:00Z`).getTime() - new Date(`${b}T12:00:00Z`).getTime()) /
      86400000,
  );
}

export const Route = createFileRoute("/api/push/cron")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          if (request.headers.get("x-vercel-cron-schedule") !== CRON_SCHEDULE) {
            return Response.json({ error: "Unauthorized." }, { status: 401 });
          }

          const admin = createClient(env("SUPABASE_URL"), env("SUPABASE_SECRET_KEY"), {
            auth: { persistSession: false, autoRefreshToken: false },
          });

          const { data: preferences, error: preferencesError } = await admin
            .from("user_preferences")
            .select("*")
            .eq("notifications_enabled", true);
          if (preferencesError) throw preferencesError;

          let sent = 0, skipped = 0, deactivated = 0;

          for (const preference of preferences ?? []) {
            const timezone = preference.timezone || "Europe/Helsinki";
            const local = localDateParts(timezone);
            const weekdays = (preference.study_weekdays ?? [1,2,3,4,5]) as number[];
            const currentMinutes = local.hour * 60 + local.minute;
            const quietStart = timeMinutes(preference.quiet_hours_start);
            const quietEnd = timeMinutes(preference.quiet_hours_end);
            if (inQuietHours(currentMinutes, quietStart, quietEnd)) {
              skipped += 1;
              continue;
            }

            const { data: notificationSettings, error: settingsError } = await admin
              .from("notification_settings")
              .select("*")
              .eq("owner_id", preference.owner_id)
              .maybeSingle();
            if (settingsError) throw settingsError;
            const settings = notificationSettings ?? {
              study_sessions: true,
              exams: true,
              plan_changes: true,
              weekly_summary: true,
            };

            // Learning OS v5 reminder tapering deliberately optimizes for
            // self-started studying, not notification clicks. It only reduces
            // ordinary study/review nudges. Exam, plan-change and weekly
            // summary notifications remain untouched.
            let studyReminderAllowed = true;
            if (preference.reminder_taper_enabled ?? true) {
              const frictionSince = addDays(local.iso, -28);
              const { data: startEvents, error: startEventError } = await admin
                .from("study_friction_events")
                .select("event_date,self_started")
                .eq("owner_id", preference.owner_id)
                .gte("event_date", frictionSince)
                .not("self_started", "is", null)
                .order("event_date", { ascending: false })
                .limit(28);
              if (startEventError) throw startEventError;

              const samples = startEvents ?? [];
              const independentStarts = samples.filter((row) => row.self_started === true).length;
              const selfStartRate = samples.length ? independentStarts / samples.length : null;
              const recent = samples.slice(0, 5);
              const recentRate = recent.length
                ? recent.filter((row) => row.self_started === true).length / recent.length
                : null;

              const taperMode =
                samples.length >= 8 && selfStartRate !== null && selfStartRate >= 0.8 && (recentRate ?? 0) >= 0.8
                  ? "minimal"
                  : samples.length >= 5 && selfStartRate !== null && selfStartRate >= 0.55
                    ? "taper"
                    : "normal";

              studyReminderAllowed =
                taperMode === "minimal"
                  ? false
                  : taperMode === "taper"
                    ? [1, 3, 5].includes(local.weekday)
                    : true;

              await admin.from("reminder_adaptation").upsert({
                owner_id: preference.owner_id,
                recommended_level: taperMode === "minimal" ? "none" : taperMode === "taper" ? "light" : "normal",
                independent_start_rate: selfStartRate,
                sample_size: samples.length,
                metadata: {
                  recentRate,
                  evaluatedFor: local.iso,
                  ordinaryStudyReminderAllowed: studyReminderAllowed,
                },
                updated_at: new Date().toISOString(),
              }, { onConflict: "owner_id" });
            }

            const deliveryKey = `morning:${local.iso}`;
            const { data: delivered, error: deliveryReadError } = await admin
              .from("push_deliveries")
              .select("id")
              .eq("owner_id", preference.owner_id)
              .eq("delivery_key", deliveryKey)
              .limit(1);
            if (deliveryReadError) throw deliveryReadError;
            if (delivered?.length) { skipped += 1; continue; }

            const weekStart = addDays(local.iso, -(local.weekday - 1));
            const weekEnd = addDays(weekStart, 6);

            const [
              { data: tasks, error: taskError },
              { data: exams, error: examError },
              { data: reviews, error: reviewError },
              { data: overdue, error: overdueError },
              { data: weekSessions, error: sessionError },
              { data: weekPlan, error: weekPlanError },
            ] = await Promise.all([
              admin.from("plan_items").select("id,title,target_minutes,course_id")
                .eq("owner_id", preference.owner_id).eq("date", local.iso)
                .eq("status", "planned").neq("kind", "exam"),
              admin.from("exams").select("id,name,date,course_id")
                .eq("owner_id", preference.owner_id).gte("date", local.iso)
                .order("date", { ascending: true }).limit(1),
              admin.from("topics").select("id,name,next_review")
                .eq("owner_id", preference.owner_id).lte("next_review", local.iso)
                .gt("verified_level", 0).limit(25),
              admin.from("plan_items").select("id")
                .eq("owner_id", preference.owner_id).eq("status", "planned")
                .lt("date", local.iso).neq("kind", "exam"),
              admin.from("study_sessions").select("minutes,course_id")
                .eq("owner_id", preference.owner_id).gte("date", weekStart).lte("date", weekEnd),
              admin.from("plan_items").select("status,target_minutes,course_id")
                .eq("owner_id", preference.owner_id).gte("date", weekStart).lte("date", weekEnd)
                .neq("kind", "exam"),
            ]);
            for (const error of [taskError,examError,reviewError,overdueError,sessionError,weekPlanError]) {
              if (error) throw error;
            }

            let title = "";
            let body = "";

            const nearestExamDays = exams?.[0] ? daysBetween(exams[0].date, local.iso) : null;
            if (settings.exams && exams?.[0] && nearestExamDays !== null && nearestExamDays <= 3) {
              title = "Koe lähestyy";
              body = `${exams[0].name}: ${nearestExamDays === 0 ? "tänään" : nearestExamDays === 1 ? "huomenna" : `${nearestExamDays} päivän päästä`}.`;
            } else if (local.weekday === 7 && settings.weekly_summary) {
              const actual = (weekSessions ?? []).reduce((sum, s) => sum + Number(s.minutes ?? 0), 0);
              const completed = (weekPlan ?? []).filter(p => p.status === "completed").length;
              const percent = weekPlan?.length ? Math.round(completed / weekPlan.length * 100) : 0;
              title = "Viikkoyhteenveto";
              body = `Tällä viikolla ${actual} min opiskelua · ${percent} % suunnitelmasta toteutui.`;
            } else if (studyReminderAllowed && weekdays.includes(local.weekday) && settings.study_sessions && tasks?.length) {
              const taskMinutes = tasks.reduce((sum, task) => sum + Number(task.target_minutes ?? 0), 0);
              title = "Tämän päivän opiskelu";
              body = `${tasks.length} tehtävää · noin ${taskMinutes} min.`;
              if (reviews?.length) body += ` Mukana ${Math.min(3, reviews.length)} tärkeintä ajankohtaista kertausta.`;
            } else if (studyReminderAllowed && weekdays.includes(local.weekday) && settings.study_sessions && reviews?.length) {
              title = "Lyhyt kertaus kannattaa tänään";
              body = `Järjestelmä nosti esiin ${Math.min(3, reviews.length)} tärkeintä ajankohtaista aihetta. Muu jono järjestellään automaattisesti.`;
            } else if (settings.plan_changes && overdue?.length) {
              title = "Suunnitelma tarvitsee pienen päivityksen";
              body = "Aiemmilta päiviltä jäi suunnitelmaa kesken. Avaa Planner: vanha kuorma järjestellään uudelleen ilman rästilistaa.";
            }

            if (!title) { skipped += 1; continue; }

            const { data: subscriptions, error: subscriptionError } = await admin
              .from("push_subscriptions").select("id,subscription")
              .eq("owner_id", preference.owner_id).eq("active", true);
            if (subscriptionError) throw subscriptionError;
            if (!subscriptions?.length) { skipped += 1; continue; }

            let deliveredToAny = false;
            for (const row of subscriptions) {
              const response = await sendWebPush(row.subscription as StoredPushSubscription, {
                title, body, url: "/?source=push", tag: deliveryKey,
              });
              if (response.ok) {
                deliveredToAny = true; sent += 1;
                await admin.from("push_subscriptions")
                  .update({ last_success_at: new Date().toISOString() }).eq("id", row.id);
              } else if (response.status === 404 || response.status === 410) {
                deactivated += 1;
                await admin.from("push_subscriptions")
                  .update({ active: false, updated_at: new Date().toISOString() }).eq("id", row.id);
              }
            }

            if (deliveredToAny) {
              const { error } = await admin.from("push_deliveries").insert({
                owner_id: preference.owner_id, delivery_key: deliveryKey,
              });
              if (error && error.code !== "23505") throw error;
            }
          }

          return Response.json({ ok: true, sent, skipped, deactivated });
        } catch (error) {
          console.error("[push/cron]", error);
          return Response.json(
            { error: error instanceof Error ? error.message : "Push-ajastus epäonnistui." },
            { status: 500 },
          );
        }
      },
    },
  },
});
