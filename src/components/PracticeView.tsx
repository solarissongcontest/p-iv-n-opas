import { useEffect, useMemo, useRef, useState } from "react";
import { Brain, CheckCircle2, Lightbulb, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { Course, Mistake, PracticeAttempt, PracticeTest, Topic } from "@/lib/domain";
import {
  buildRecoveryQueue,
  evidenceSummary,
  examStage,
  hintAt,
  selectPracticeQuestion,
} from "@/lib/learning-engine";
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

const typeLabel: Record<string, string> = {
  free_recall: "Vapaa palautus",
  short_answer: "Lyhyt vastaus",
  calculation: "Lasku / ratkaisurunko",
  application: "Soveltaminen",
  multiple_choice: "Monivalinta + perustelu",
  explanation: "Käsitteen selitys",
  ordering: "Järjestäminen",
  error_detection: "Virheen tunnistaminen",
  simulation: "Koetyylinen tehtävä",
  recognition: "Menetelmän tunnistaminen",
};

export function PracticeView({
  courses,
  topics,
  attempts,
  tests = [],
  mistakes = [],
}: {
  courses: Course[];
  topics: Topic[];
  attempts: PracticeAttempt[];
  tests?: PracticeTest[];
  mistakes?: Mistake[];
}) {
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [topicId, setTopicId] = useState("");
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [hintLevel, setHintLevel] = useState(0);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const startedAt = useRef<number>(Date.now());
  const record = useRecordPracticeAttempt();

  const course = courses.find((candidate) => candidate.id === courseId) ?? null;
  const courseTopics = useMemo(
    () => topics.filter((topic) => topic.course_id === courseId),
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

  const stage = examStage({
    topics: courseTopics,
    attempts,
    tests: tests.filter((test) => test.course_id === courseId),
    mistakes: mistakes.filter((mistake) => mistake.course_id === courseId),
    course,
  });

  const selection = useMemo(
    () =>
      selectPracticeQuestion({
        topics: courseTopics,
        attempts,
        selectedTopicId: topicId,
        course,
        examStage: stage.key,
        index: attemptIndex,
      }),
    [attemptIndex, attempts, course, courseTopics, stage.key, topicId],
  );

  const recovery = buildRecoveryQueue({
    topics: courseTopics,
    attempts,
    courses,
    now: today(),
    capacityMinutes: 20,
    maxItems: 3,
  });

  const recent = attempts
    .filter((attempt) => attempt.topic_id === (selection?.topic.id ?? topicId))
    .slice(0, 6);

  useEffect(() => {
    startedAt.current = Date.now();
    setResponse("");
    setHintLevel(0);
    setConfidence(null);
    setFeedback("");
  }, [selection?.question.id, selection?.topic.id]);

  async function save(result: PracticeAttempt["result"]) {
    if (!selection) return;
    if (result !== "not_yet" && response.trim().length < 2) {
      toast.error("Kirjoita ensin oma yrityksesi.");
      return;
    }

    const responseTime = Math.max(0, Date.now() - startedAt.current);
    const source = recovery.items.some((item) => item.topic.id === selection.topic.id)
      ? "review"
      : stage.key === "repair"
        ? "mistake_repair"
        : "practice";

    try {
      await record.mutateAsync({
        course_id: selection.topic.course_id,
        topic_id: selection.topic.id,
        attempt_type: selection.question.type,
        prompt: selection.question.prompt,
        response: response.trim() || null,
        difficulty: selection.question.difficulty,
        result,
        confidence,
        hint_used: hintLevel > 0,
        hints_used: hintLevel,
        response_time_ms: responseTime,
        source,
        skills: selection.question.skills,
        expected_concepts: selection.question.expectedConcepts,
        question_payload: {
          explanation: selection.question.explanation,
          interleaved: selection.interleaved,
          examStage: stage.key,
        },
      });

      setFeedback(
        result === "independent"
          ? `Hyvä itsenäinen näyttö. ${selection.question.explanation}`
          : result === "hinted"
            ? `Vihje auttoi, joten näyttö painaa vähemmän masteryssa. ${selection.question.explanation}`
            : `Tämä tarvitsee uuden kierroksen pian. ${selection.question.explanation}`,
      );
      setAttemptIndex((value) => value + 1);
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
            {stage.stages[stage.index]?.label ?? "Harjoittelu"}
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
              }}
            >
              {courses.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.code} · {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium">
            Aloitusaihe
            <select
              className="mt-1 w-full rounded-xl border bg-surface p-3"
              value={topicId}
              onChange={(event) => {
                setTopicId(event.target.value);
                setAttemptIndex(0);
              }}
            >
              {courseTopics.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {selection ? (
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-muted/60 p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <span>{typeLabel[selection.question.type]}</span>
                <span>· vaikeus {selection.question.difficulty}/5</span>
                {selection.interleaved && <span>· interleaved</span>}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {courses.find((item) => item.id === selection.topic.course_id)?.code} · {selection.topic.name}
              </p>
              <p className="mt-2 text-lg font-semibold">{selection.question.prompt}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Moottori valitsee kysymystyypin osaamisnäytön, unohtumisriskin ja koevaiheen perusteella.
                Aikaa ei lasketa osaamiseksi. Maailma jatkaa pyörimistään.
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

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className={secondary}
                onClick={() => setHintLevel((value) => Math.min(3, value + 1))}
                disabled={hintLevel >= selection.question.hints.length}
              >
                <Lightbulb size={17} />
                {hintLevel === 0 ? "Tarvitsen vihjeen" : "Seuraava vihje"}
              </button>
              <span className="text-xs text-muted-foreground">
                {hintLevel}/3 vihjettä käytetty
              </span>
            </div>

            {hintLevel > 0 && (
              <div className="space-y-2">
                {Array.from({ length: hintLevel }, (_, index) => (
                  <div key={index} className="rounded-xl border border-border bg-accent/50 p-3 text-sm">
                    <b>Vihje {index + 1}:</b> {hintAt(selection.question, index + 1)}
                  </div>
                ))}
              </div>
            )}

            {attemptIndex % 2 === 1 && (
              <fieldset>
                <legend className="mb-2 text-sm font-medium">
                  Kuinka varma olet ennen tarkistusta?{" "}
                  <span className="font-normal text-muted-foreground">(kalibrointia varten)</span>
                </legend>
                <div className="flex flex-wrap gap-2">
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
                <button disabled={record.isPending} className={primary} onClick={() => void save("independent")}>
                  <CheckCircle2 size={17} />
                  Itsenäisesti
                </button>
                <button disabled={record.isPending} className={secondary} onClick={() => void save("hinted")}>
                  Vihjeellä / osittain
                </button>
                <button disabled={record.isPending} className={secondary} onClick={() => void save("not_yet")}>
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

            <p className="text-xs text-muted-foreground">
              {evidenceSummary(selection.state, selection.topic, attempts)}
            </p>
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
                  key={item.topic.id}
                  className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl bg-muted/60 px-3 text-left"
                  onClick={() => {
                    setTopicId(item.topic.id);
                    setAttemptIndex(0);
                  }}
                >
                  <span>
                    <b>{item.topic.name}</b>
                    <small className="mt-1 block text-muted-foreground">{item.reason}</small>
                  </span>
                  <span className="text-xs text-muted-foreground">{item.minutes} min</span>
                </button>
              ))}
              {recovery.hiddenCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  {recovery.hiddenCount} muuta kertausta on jätetty myöhempään vuoroon. Niitä ei tarvitse kantaa naamalla punaisena velkalukuna.
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Ei juuri nyt korkealle priorisoituja kertauksia. Voit silti harjoitella valittua aihetta.
            </p>
          )}
        </Card>

        <Card title="Viimeisimmät yritykset">
          {recent.length ? (
            recent.map((attempt) => (
              <div key={attempt.id} className="border-b border-border py-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <b>{resultText[attempt.result]}</b>
                  <span className="text-xs text-muted-foreground">{fullDate(attempt.date)}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {typeLabel[attempt.attempt_type] ?? attempt.attempt_type.replaceAll("_", " ")}
                  {" · "}vaikeus {attempt.difficulty}/5
                  {attempt.delay_days != null ? ` · viive ${attempt.delay_days} pv` : ""}
                  {typeof attempt.hints_used === "number" ? ` · ${attempt.hints_used} vihjettä` : ""}
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
