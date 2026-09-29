import { useEffect, useMemo, useState } from "react";
import { Brain, CheckCircle2, Lightbulb, Shuffle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  MASTERY_LABELS,
  practicePrompt,
  recoveryQueue,
  type Course,
  type PracticeAttempt,
  type Topic,
} from "@/lib/domain";
import { useRecordPracticeAttempt } from "@/lib/data";
import { fullDate, today } from "@/lib/fi";

const primary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50";
const secondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm hover:bg-muted disabled:opacity-50";

function Card({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="panel p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold sm:text-lg">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

const resultText: Record<PracticeAttempt["result"], string> = {
  independent: "Itsenäisesti",
  hinted: "Vihjeellä",
  not_yet: "Ei vielä",
};

export function PracticeView({
  courses,
  topics,
  attempts,
}: {
  courses: Course[];
  topics: Topic[];
  attempts: PracticeAttempt[];
}) {
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [topicId, setTopicId] = useState("");
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [hintShown, setHintShown] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [mixed, setMixed] = useState(false);
  const [feedback, setFeedback] = useState("");
  const record = useRecordPracticeAttempt();

  const courseTopics = useMemo(
    () =>
      topics
        .filter((topic) => topic.course_id === courseId)
        .sort((a, b) => {
          const aDue = a.next_review && a.next_review <= today() ? 1 : 0;
          const bDue = b.next_review && b.next_review <= today() ? 1 : 0;
          return (
            bDue - aDue ||
            a.verified_level - b.verified_level ||
            b.importance - a.importance
          );
        }),
    [courseId, topics],
  );

  useEffect(() => {
    if (!courseTopics.length) {
      setTopicId("");
      return;
    }
    if (!courseTopics.some((topic) => topic.id === topicId)) {
      setTopicId(courseTopics[0]!.id);
    }
  }, [courseTopics, topicId]);

  const topic = courseTopics.find((candidate) => candidate.id === topicId);
  const prompt = topic ? practicePrompt(topic, attemptIndex) : null;
  const recovery = recoveryQueue(courseTopics, today(), 3);
  const recent = attempts.filter((attempt) => attempt.topic_id === topicId).slice(0, 6);

  async function save(result: PracticeAttempt["result"]) {
    if (!topic || !prompt) return;
    if (result !== "not_yet" && response.trim().length < 2) {
      toast.error("Kirjoita ensin oma yrityksesi.");
      return;
    }

    try {
      await record.mutateAsync({
        course_id: topic.course_id,
        topic_id: topic.id,
        attempt_type: prompt.type,
        prompt: prompt.prompt,
        response: response.trim() || null,
        difficulty: prompt.difficulty,
        result,
        confidence,
        hint_used: hintShown,
      });

      setFeedback(
        result === "independent"
          ? "Hyvä retrieval-näyttö. Jos tämä onnistui viiveen jälkeen, seuraava kertaus voi siirtyä kauemmas."
          : result === "hinted"
            ? "Vihje auttoi, joten tätä ei laskettu itsenäiseksi osaamisnäytöksi. Palaa aiheeseen pian ja yritä uudelleen ilman vihjettä."
            : "Tämä ei vähennä osaamista pisteinä. Käy lyhyesti selitys tai malli läpi ja tee uusi muistista palautus pian.",
      );

      const currentIndex = courseTopics.findIndex((candidate) => candidate.id === topic.id);
      if (mixed && courseTopics.length > 1 && topic.verified_level >= 2) {
        const next = courseTopics[(currentIndex + 1) % courseTopics.length];
        if (next) setTopicId(next.id);
      }

      setAttemptIndex((value) => value + 1);
      setResponse("");
      setHintShown(false);
      setConfidence(null);
    } catch {
      toast.error("Harjoitusyritystä ei voitu tallentaa.");
    }
  }

  return (
    <div className="space-y-5">
      <Card
        title="Practice Mode"
        action={
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Brain size={15} />
            muistista ensin
          </span>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Kurssi
            <select
              className="mt-1 w-full rounded-xl border bg-surface p-3"
              value={courseId}
              onChange={(event) => {
                setCourseId(event.target.value);
                setTopicId("");
                setAttemptIndex(0);
                setFeedback("");
              }}
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} · {course.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium">
            Aihe
            <select
              className="mt-1 w-full rounded-xl border bg-surface p-3"
              value={topicId}
              onChange={(event) => {
                setTopicId(event.target.value);
                setAttemptIndex(0);
                setFeedback("");
              }}
            >
              {courseTopics.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name} · {MASTERY_LABELS[candidate.verified_level]}
                </option>
              ))}
            </select>
          </label>
        </div>

        {topic && prompt ? (
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Yritä ilman muistiinpanoja · vaikeus {prompt.difficulty}/5
              </p>
              <p className="mt-2 text-lg font-semibold">{prompt.prompt}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Tavoite on palauttaa tieto muistista. Sovellus ei päättele osaamista siitä, kuinka pitkään katsot tätä näyttöä. Ihmiskunta selviää tästä järkytyksestä.
              </p>
            </div>

            <label className="block text-sm font-medium">
              Oma vastaus / ratkaisutapa
              <textarea
                rows={5}
                className="mt-1 w-full rounded-xl border bg-surface p-3"
                value={response}
                onChange={(event) => setResponse(event.target.value)}
                placeholder="Kirjoita muistista ennen materiaalin avaamista…"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={secondary}
                onClick={() => setHintShown(true)}
                disabled={hintShown}
              >
                <Lightbulb size={17} />
                {hintShown ? "Vihje näytetty" : "Näytä vihje"}
              </button>
              {topic.verified_level >= 2 && (
                <button
                  type="button"
                  className={mixed ? primary : secondary}
                  onClick={() => setMixed((value) => !value)}
                  aria-pressed={mixed}
                >
                  <Shuffle size={17} />
                  Mixed practice
                </button>
              )}
            </div>

            {hintShown && (
              <div className="rounded-xl border border-border bg-accent/50 p-3 text-sm">
                <b>Vihje, ei vastausta:</b> {prompt.hint}
              </div>
            )}

            {attemptIndex % 2 === 1 && (
              <fieldset>
                <legend className="mb-2 text-sm font-medium">
                  Kuinka varma olit? <span className="font-normal text-muted-foreground">(kalibrointia varten)</span>
                </legend>
                <div className="flex gap-2">
                  {[
                    [1, "Epävarma"],
                    [2, "Melko varma"],
                    [3, "Varma"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={confidence === value}
                      className={confidence === value ? primary : secondary}
                      onClick={() => setConfidence(Number(value))}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div>
              <p className="mb-2 text-sm font-medium">Miten yritys onnistui?</p>
              <div className="grid gap-2 sm:grid-cols-3">
                <button
                  disabled={record.isPending}
                  className={primary}
                  onClick={() => void save("independent")}
                >
                  <CheckCircle2 size={17} />
                  Itsenäisesti
                </button>
                <button
                  disabled={record.isPending}
                  className={secondary}
                  onClick={() => void save("hinted")}
                >
                  Vihjeellä
                </button>
                <button
                  disabled={record.isPending}
                  className={secondary}
                  onClick={() => void save("not_yet")}
                >
                  Ei vielä
                </button>
              </div>
            </div>

            {feedback && (
              <div className="rounded-xl bg-accent p-3 text-sm">
                <Sparkles className="mr-2 inline" size={16} />
                {feedback}
              </div>
            )}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Lisää kurssille aiheita ennen harjoittelua.
          </p>
        )}
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Kertaa seuraavaksi">
          {recovery.items.length ? (
            <div className="space-y-2">
              {recovery.items.map((item) => (
                <button
                  key={item.id}
                  className="flex min-h-12 w-full items-center justify-between rounded-xl bg-muted/60 px-3 text-left"
                  onClick={() => {
                    setTopicId(item.id);
                    setAttemptIndex(0);
                    setFeedback("");
                  }}
                >
                  <span>{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {MASTERY_LABELS[item.verified_level]}
                  </span>
                </button>
              ))}
              {recovery.hiddenCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  {recovery.hiddenCount} muuta kertausta pysyy taustalla. Jono ei muutu rangaistuslistaksi.
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Ei juuri nyt erääntyviä kertauksia. Voit silti harjoitella valittua aihetta.
            </p>
          )}
        </Card>

        <Card title="Viimeisimmät yritykset">
          {recent.length ? (
            recent.map((attempt) => (
              <div key={attempt.id} className="border-b border-border py-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <b>{resultText[attempt.result]}</b>
                  <span className="text-xs text-muted-foreground">
                    {fullDate(attempt.date)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {attempt.attempt_type.replace("_", " ")} · vaikeus {attempt.difficulty}/5
                  {attempt.delay_days != null ? ` · viive ${attempt.delay_days} pv` : ""}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Ensimmäinen yritys muodostaa ensimmäisen oikean retrieval-havainnon.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
