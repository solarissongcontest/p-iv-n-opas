import { useMemo, useState } from "react";
import { BellRing, BookOpen, CalendarDays, Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { Course, PlanItem, Topic } from "@/lib/domain";
import { generatePlan } from "@/lib/domain";
import {
  useGeneratePlan,
  useUpdateCourse,
  useUpdatePreferences,
  type UserPreferences,
} from "@/lib/data";
import { enableBackgroundPush, pushSupported } from "@/lib/push";
import { fullDate, minutes } from "@/lib/fi";

const primary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-medium text-primary-foreground disabled:opacity-50";
const secondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 font-medium hover:bg-muted";

const weekdays = [
  [1, "Ma"],
  [2, "Ti"],
  [3, "Ke"],
  [4, "To"],
  [5, "Pe"],
  [6, "La"],
  [7, "Su"],
] as const;

export function Onboarding({
  course,
  topics,
  plan,
  preferences,
  onComplete,
}: {
  course: Course;
  topics: Topic[];
  plan: PlanItem[];
  preferences: UserPreferences;
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);
  const [target, setTarget] = useState(course.target_value ?? "10");
  const [studyWeekdays, setStudyWeekdays] = useState<number[]>(
    preferences.study_weekdays?.length ? preferences.study_weekdays : [1, 2, 3, 4, 5],
  );
  const [notifications, setNotifications] = useState(preferences.notifications_enabled);
  const [pushBusy, setPushBusy] = useState(false);
  const [finishing, setFinishing] = useState(false);

  const updatePreferences = useUpdatePreferences();
  const updateCourse = useUpdateCourse();
  const generate = useGeneratePlan();

  const totalWeekly = course.weekly_minutes;
  const minutesPerDay = Math.max(20, Math.round(totalWeekly / Math.max(1, studyWeekdays.length)));
  const hasPlan = plan.some((item) => item.course_id === course.id);

  const progress = Math.round(((step + 1) / 6) * 100);
  const timezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Helsinki",
    [],
  );

  async function enablePush() {
    setPushBusy(true);
    try {
      await enableBackgroundPush();
      setNotifications(true);
      toast.success("Taustamuistutukset ovat käytössä.");
    } catch (error) {
      setNotifications(false);
      toast.error(error instanceof Error ? error.message : "Ilmoituksia ei voitu ottaa käyttöön.");
    } finally {
      setPushBusy(false);
    }
  }

  async function finish() {
    setFinishing(true);
    try {
      if (course.target_value !== target || course.target_system !== "school") {
        await updateCourse.mutateAsync({
          id: course.id,
          target_system: "school",
          target_value: target,
        });
      }

      await updatePreferences.mutateAsync({
        display_name: "Arthur",
        study_weekdays: studyWeekdays,
        notifications_enabled: notifications,
        timezone,
        onboarding_completed: true,
      });

      if (!hasPlan && course.exam_date) {
        const drafts = generatePlan({
          course: { ...course, target_system: "school", target_value: target },
          topics,
          examDate: course.exam_date,
          studyWeekdays,
          weeklyMinutes: course.weekly_minutes,
        });
        if (drafts.length) {
          await generate.mutateAsync({ courseId: course.id, drafts });
        }
      }

      onComplete();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Käyttöönottoa ei voitu viimeistellä.");
    } finally {
      setFinishing(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:grid sm:place-items-center">
      <section className="panel mx-auto w-full max-w-2xl overflow-hidden">
        <div className="border-b border-border px-6 py-5 sm:px-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                <BookOpen size={20} />
              </span>
              <div>
                <p className="font-semibold">Opintopäiväkirja</p>
                <p className="text-xs text-muted-foreground">Ensimmäinen käyttöönotto</p>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">{step + 1} / 6</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="min-h-[420px] p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-5">
              <span className="grid size-14 place-items-center rounded-2xl bg-accent text-primary">
                <Sparkles />
              </span>
              <div>
                <h1 className="text-3xl font-semibold">Tervetuloa, Arthur.</h1>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Tehdään Opintopäiväkirjasta valmis sinun opiskelurytmillesi. KE04 on jo lisätty,
                  joten tässä määritetään vain tavoite, opiskelupäivät ja muistutukset.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Suunnitelma", "Mukautuu osaamiseen ja kokeeseen."],
                  ["Kertaus", "Nostaa erääntyvät aiheet automaattisesti."],
                  ["Koemoodi", "Painotus vaihtuu 14 päivää ennen koetta."],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl bg-muted/60 p-4">
                    <p className="font-medium">{title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-primary">Tavoite</p>
                <h1 className="mt-1 text-3xl font-semibold">Mitä tavoittelet KE04:stä?</h1>
                <p className="mt-3 text-muted-foreground">
                  Tavoite vaikuttaa analytiikkaan ja osaamisriskin laskentaan. Se ei ole arvosanaennuste.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {["10", "9", "8", "7", "6", "5", "4"].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={target === value}
                    onClick={() => setTarget(value)}
                    className={`min-h-14 rounded-2xl border text-lg font-semibold transition ${target === value ? "border-primary bg-accent text-primary" : "border-border bg-surface hover:bg-muted"}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <p className="rounded-2xl bg-muted/60 p-4 text-sm">
                Nykyinen tavoite: <b>{target}</b>. Valmistautumisen prosentti pysyy silti erillisenä mittarina,
                eikä sovellus väitä tietävänsä tulevaa koearvosanaa.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-primary">Opiskelurytmi</p>
                <h1 className="mt-1 text-3xl font-semibold">Minä päivinä opiskelet yleensä?</h1>
                <p className="mt-3 text-muted-foreground">
                  Adaptiivinen suunnitelma käyttää näitä päiviä. Voit siirtää yksittäisiä tehtäviä myöhemmin vapaasti.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {weekdays.map(([value, label]) => {
                  const selected = studyWeekdays.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        setStudyWeekdays((current) =>
                          selected
                            ? current.length > 1
                              ? current.filter((day) => day !== value)
                              : current
                            : [...current, value].sort(),
                        )
                      }
                      className={`min-h-14 rounded-2xl border font-semibold transition ${selected ? "border-primary bg-accent text-primary" : "border-border bg-surface hover:bg-muted"}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <div className="rounded-2xl bg-muted/60 p-4">
                <p className="font-medium">{studyWeekdays.length} opiskelupäivää viikossa</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {minutes(totalWeekly)} viikkotavoite tarkoittaa noin {minutes(minutesPerDay)} per valittu päivä.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-primary">Kurssit</p>
                <h1 className="mt-1 text-3xl font-semibold">Ensimmäinen kurssi on valmis.</h1>
              </div>
              <div className="rounded-3xl border border-border bg-surface p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-primary">{course.code}</p>
                    <h2 className="mt-1 text-2xl font-semibold">{course.name}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{course.subject}</p>
                  </div>
                  <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-primary">
                    Tavoite {target}
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-muted/60 p-4">
                    <p className="text-sm text-muted-foreground">Aiheet</p>
                    <p className="mt-1 text-xl font-semibold">{topics.length}</p>
                  </div>
                  <div className="rounded-2xl bg-muted/60 p-4">
                    <p className="text-sm text-muted-foreground">Viikkotavoite</p>
                    <p className="mt-1 text-xl font-semibold">{minutes(course.weekly_minutes)}</p>
                  </div>
                  <div className="rounded-2xl bg-muted/60 p-4">
                    <p className="text-sm text-muted-foreground">Koe</p>
                    <p className="mt-1 text-xl font-semibold">{course.exam_date ? fullDate(course.exam_date) : "—"}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Lisää kursseja voi tehdä myöhemmin Kurssit-näkymästä. KE04:n suunnitelma luodaan vasta viimeisessä vaiheessa valitsemillasi opiskelupäivillä.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-primary">Taustamuistutukset</p>
                <h1 className="mt-1 text-3xl font-semibold">Haluatko aamumuistutukset?</h1>
                <p className="mt-3 text-muted-foreground">
                  Web Push toimii myös silloin, kun Opintopäiväkirja ei ole auki. Muistutus lähetetään
                  valittuina opiskelupäivinä aamulla, jos päivälle on tehtäviä, erääntyviä kertauksia tai koe on aivan lähellä.
                </p>
              </div>
              {!pushSupported() ? (
                <div className="rounded-2xl border border-border bg-muted/60 p-4 text-sm">
                  Tämä selain ei tue Web Push -ilmoituksia. Voit silti käyttää kaikkea muuta normaalisti.
                </div>
              ) : (
                <div className="rounded-3xl border border-border p-5">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent text-primary">
                      <BellRing size={20} />
                    </span>
                    <div>
                      <p className="font-semibold">{notifications ? "Muistutukset käytössä" : "Taustamuistutukset pois"}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {notifications
                          ? "Tämä selain on tilattu Opintopäiväkirjan push-ilmoituksiin."
                          : "Selain pyytää luvan vain kerran. Valinnan voi muuttaa myöhemmin asetuksista."}
                      </p>
                    </div>
                  </div>
                  {!notifications && (
                    <button disabled={pushBusy} className={primary + " mt-5"} onClick={() => void enablePush()}>
                      <BellRing size={17} />{pushBusy ? "Otetaan käyttöön…" : "Ota muistutukset käyttöön"}
                    </button>
                  )}
                </div>
              )}
              <button type="button" className="text-sm text-muted-foreground underline" onClick={() => setNotifications(false)}>
                Jatka ilman muistutuksia
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <span className="grid size-14 place-items-center rounded-2xl bg-accent text-primary">
                <Check />
              </span>
              <div>
                <p className="text-sm font-medium text-primary">Valmis</p>
                <h1 className="mt-1 text-3xl font-semibold">Study OS on käyttövalmis.</h1>
                <p className="mt-3 text-muted-foreground">
                  KE04 saa nyt suunnitelman valitsemillesi päiville. Järjestelmä alkaa päivittää osaamista,
                  kertausvelkaa, riskejä ja koemoodia opiskelumerkintöjesi perusteella.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-muted/60 p-4"><p className="text-sm text-muted-foreground">Tavoite</p><p className="mt-1 text-xl font-semibold">{target}</p></div>
                <div className="rounded-2xl bg-muted/60 p-4"><p className="text-sm text-muted-foreground">Opiskelupäiviä</p><p className="mt-1 text-xl font-semibold">{studyWeekdays.length} / vko</p></div>
                <div className="rounded-2xl bg-muted/60 p-4"><p className="text-sm text-muted-foreground">Push</p><p className="mt-1 text-xl font-semibold">{notifications ? "Päällä" : "Pois"}</p></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-5 sm:px-8">
          <button
            type="button"
            className={secondary}
            disabled={step === 0 || finishing}
            onClick={() => setStep((value) => Math.max(0, value - 1))}
          >
            <ChevronLeft size={17} />Takaisin
          </button>

          {step < 5 ? (
            <button type="button" className={primary} onClick={() => setStep((value) => value + 1)}>
              Jatka<ChevronRight size={17} />
            </button>
          ) : (
            <button type="button" disabled={finishing} className={primary} onClick={() => void finish()}>
              <CalendarDays size={17} />{finishing ? "Viimeistellään…" : "Avaa Opintopäiväkirja"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
