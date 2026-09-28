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
  }).formatToParts(new Date());

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekdayMap: Record<string, number> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  };

  return {
    iso: `${read("year")}-${read("month")}-${read("day")}`,
    weekday: weekdayMap[read("weekday")] ?? 1,
  };
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
          // Vercel adds this header to scheduled invocations. The database
          // delivery key below also makes the operation idempotent.
          if (request.headers.get("x-vercel-cron-schedule") !== CRON_SCHEDULE) {
            return Response.json({ error: "Unauthorized." }, { status: 401 });
          }

          const admin = createClient(env("SUPABASE_URL"), env("SUPABASE_SECRET_KEY"), {
            auth: { persistSession: false, autoRefreshToken: false },
          });

          const { data: preferences, error: preferencesError } = await admin
            .from("user_preferences")
            .select("*")
            .eq("onboarding_completed", true)
            .eq("notifications_enabled", true);
          if (preferencesError) throw preferencesError;

          let sent = 0;
          let skipped = 0;
          let deactivated = 0;

          for (const preference of preferences ?? []) {
            const timezone = preference.timezone || "Europe/Helsinki";
            const local = localDateParts(timezone);
            const weekdays = (preference.study_weekdays ?? [1,2,3,4,5]) as number[];
            if (!weekdays.includes(local.weekday)) {
              skipped += 1;
              continue;
            }

            const deliveryKey = `morning:${local.iso}`;
            const { data: delivered, error: deliveryReadError } = await admin
              .from("push_deliveries")
              .select("id")
              .eq("owner_id", preference.owner_id)
              .eq("delivery_key", deliveryKey)
              .limit(1);
            if (deliveryReadError) throw deliveryReadError;
            if (delivered?.length) {
              skipped += 1;
              continue;
            }

            const [{ data: tasks, error: taskError }, { data: exams, error: examError }, { data: reviews, error: reviewError }] =
              await Promise.all([
                admin
                  .from("plan_items")
                  .select("id,title,target_minutes,course_id")
                  .eq("owner_id", preference.owner_id)
                  .eq("date", local.iso)
                  .eq("status", "planned")
                  .neq("kind", "exam"),
                admin
                  .from("exams")
                  .select("id,name,date,course_id")
                  .eq("owner_id", preference.owner_id)
                  .gte("date", local.iso)
                  .order("date", { ascending: true })
                  .limit(1),
                admin
                  .from("topics")
                  .select("id,name,next_review")
                  .eq("owner_id", preference.owner_id)
                  .lte("next_review", local.iso)
                  .gt("verified_level", 0)
                  .limit(25),
              ]);
            if (taskError) throw taskError;
            if (examError) throw examError;
            if (reviewError) throw reviewError;

            let title = "Opintopäiväkirja";
            let body = "";
            const taskMinutes = (tasks ?? []).reduce(
              (sum, task) => sum + Number(task.target_minutes ?? 0),
              0,
            );

            if (tasks?.length) {
              title = "Tämän päivän opiskelu";
              body = `${tasks.length} tehtävää · noin ${taskMinutes} min.`;
              if (reviews?.length) body += ` Kertauksia odottaa ${reviews.length}.`;
            } else if (reviews?.length) {
              title = "Kertaus odottaa";
              body = `${reviews.length} aihetta on kertausvuorossa tänään.`;
            } else if (exams?.[0]) {
              const days = daysBetween(exams[0].date, local.iso);
              if (days > 3) {
                skipped += 1;
                continue;
              }
              title = "Koe lähestyy";
              body = `${exams[0].name}: ${days === 0 ? "tänään" : days === 1 ? "huomenna" : `${days} päivän päästä`}.`;
            } else {
              skipped += 1;
              continue;
            }

            const { data: subscriptions, error: subscriptionError } = await admin
              .from("push_subscriptions")
              .select("id,subscription")
              .eq("owner_id", preference.owner_id)
              .eq("active", true);
            if (subscriptionError) throw subscriptionError;
            if (!subscriptions?.length) {
              skipped += 1;
              continue;
            }

            let deliveredToAny = false;
            for (const row of subscriptions) {
              const response = await sendWebPush(
                row.subscription as StoredPushSubscription,
                {
                  title,
                  body,
                  url: "/",
                  tag: deliveryKey,
                },
              );

              if (response.ok) {
                deliveredToAny = true;
                sent += 1;
                await admin
                  .from("push_subscriptions")
                  .update({ last_success_at: new Date().toISOString() })
                  .eq("id", row.id);
              } else if (response.status === 404 || response.status === 410) {
                deactivated += 1;
                await admin
                  .from("push_subscriptions")
                  .update({ active: false, updated_at: new Date().toISOString() })
                  .eq("id", row.id);
              } else {
                console.error("[push/cron] Push endpoint returned", response.status);
              }
            }

            if (deliveredToAny) {
              const { error } = await admin.from("push_deliveries").insert({
                owner_id: preference.owner_id,
                delivery_key: deliveryKey,
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
