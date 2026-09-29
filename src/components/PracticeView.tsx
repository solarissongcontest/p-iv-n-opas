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
  type LearningAttemptType,
} from "@/lib/learning-engine";
import {
  delayedVerificationQueueV4,
  experimentVariantV4,
  masteryModelV4,
  practicePathV4,
  type PracticePath,
} from "@/lib/learning-os-v4";
import { usePreferences, useRecordPracticeAttempt, useUpdateTopic } from "@/lib/data";
import { addDays, fullDate, today } from "@/lib/fi";
import {
  evaluatePracticeResponse,
  type PracticeRubricEvaluation,
} from "@/lib/practice-rubric";

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
  const [rubricEvaluation, setRubricEvaluation] = useState<PracticeRubricEvaluation | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [diagnosticMode, setDiagnosticMode] = useState(false);
  const startedAt = useRef<number>(Date.now());
  const record = useRecordPracticeAttempt();
  const updateTopic = useUpdateTopic();
  const preferences = usePreferences();
  const experimentsEnabled = preferences.data?.personal_experiments_enabled ?? true;

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

  const diagnosticLimit = Math.min(10, courseTopics.length);
  const diagnosticDone = diagnosticMode && attemptIndex >= diagnosticLimit;
  const effectiveTopicId = diagnosticMode
    ? courseTopics[attemptIndex % Math.max(1, courseTopics.length)]?.id ?? topicId
    : topicId;
  const selectedTopic = courseTopics.find((candidate) => candidate.id === effectiveTopicId) ?? courseTopics[0] ?? null;
  const selectedPath: PracticePath | null = selectedTopic
    ? practicePathV4(selectedTopic, attempts, { examDate: course?.exam_date ?? null })
    : null;
  const activePath: PracticePath | null = diagnosticMode && selectedPath
    ? {
        stage: "independent",
        label: "Diagnostiikka",
        reason: "Lähtötaso mitataan ilman vihjeitä, jotta Planner ei aloita arvailusta.",
        hintLimit: 0,
        evidenceMultiplier: 1,
        requiresIndependentFollowup: false,
      }
    : selectedPath;
  const interleavingVariant =
    experimentsEnabled && selectedTopic
      ? experimentVariantV4("interleaving", today(), courseId + ":" + selectedTopic.id)
      : null;
  const spacingVariant =
    experimentsEnabled && selectedTopic
      ? experimentVariantV4("spacing_window", today(), courseId + ":" + selectedTopic.id)
      : null;
  const interleaveMode =
    diagnosticMode || interleavingVariant === null
      ? "auto" as const
      : interleavingVariant === "A"
        ? "blocked" as const
        : "interleaved" as const;

  const preferredTypes: LearningAttemptType[] | undefined =
    activePath?.stage === "worked_example" || activePath?.stage === "explanation"
      ? ["explanation", "short_answer"]
      : activePath?.stage === "partial_completion" || activePath?.stage === "guided"
        ? ["calculation", "short_answer", "ordering"]
        : activePath?.stage === "transfer"
          ? ["application", "simulation", "error_detection"]
          : activePath?.stage === "mixed"
            ? ["recognition", "calculation", "error_detection", "application"]
            : activePath?.stage === "delayed_verification"
              ? ["free_recall", "application"]
              : ["free_recall", "short_answer", "calculation"];

  const selection = useMemo(
    () =>
      diagnosticDone
        ? null
        : selectPracticeQuestion({
            topics: courseTopics,
            attempts,
            selectedTopicId: effectiveTopicId,
            course,
            examStage: stage.key,
            index: attemptIndex,
            preferredTypes,
            interleaveMode,
          }),
    [attemptIndex, attempts, course, courseTopics, diagnosticDone, effectiveTopicId, interleaveMode, preferredTypes, stage.key],
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
    setRubricEvaluation(null);
    setShowExplanation(false);
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
          scaffoldStage: activePath?.stage ?? "independent",
          assisted: hintLevel > 0,
          verificationRequired: activePath?.requiresIndependentFollowup ?? false,
          rubricEvaluatorUsed: rubricEvaluation !== null,
          rubricEvaluation: rubricEvaluation
            ? {
                suggestedResult: rubricEvaluation.suggestedResult,
                confidence: rubricEvaluation.confidence,
                score: rubricEvaluation.score,
                dimensions: rubricEvaluation.dimensions.map((dimension) => ({
                  key: dimension.key,
                  score: dimension.score,
                })),
              }
            : null,
          experimentVariants: {
            interleaving: interleavingVariant,
            spacing: spacingVariant,
          },
        },
      });

      if (experimentsEnabled && spacingVariant && result === "independent") {
        const days = spacingVariant === "A" ? 3 : 5;
        await updateTopic.mutateAsync({
          id: selection.topic.id,
          // Experiment controls only the next review suggestion, never mastery itself.
          next_review: addDays(today(), days),
        } as Parameters<typeof updateTopic.mutateAsync>[0]);
      }

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
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={diagnosticMode ? primary : secondary}
              onClick={() => { setDiagnosticMode((value) => !value); setAttemptIndex(0); }}
            >
              {diagnosticMode ? "Lopeta diagnostiikka" : "Diagnostic Mode"}
            </button>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Brain size={15} />
              {diagnosticMode ? `${Math.min(attemptIndex, diagnosticLimit)}/${diagnosticLimit}` : stage.stages[stage.index]?.label ?? "Harjoittelu"}
            </span>
          </div>
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

        {diagnosticDone ? (
          <div className="mt-5 rounded-2xl bg-accent p-4">
            <h3 className="font-semibold">Lähtötason tarkistus valmis.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {diagnosticLimit} eri aiheen retrieval-näyttö on tallennettu. Tulokset eivät suoraan “julista” aiheita osatuiksi, vaan parantavat Plannerin evidence confidencea.
            </p>
            <div className="mt-3 space-y-2">
              {courseTopics.slice(0, diagnosticLimit).map((candidate) => {
                const model = masteryModelV4(candidate, attempts, { examDate: course?.exam_date ?? null });
                const missingPrerequisite = (candidate.dependencies ?? []).some((id) => {
                  const dependency = courseTopics.find((topic) => topic.id === id);
                  return dependency ? masteryModelV4(dependency, attempts, { examDate: course?.exam_date ?? null }).level <= 1 : false;
                });
                const classification = missingPrerequisite
                  ? "missing_prerequisite"
                  : model.evidenceCount === 0
                    ? "new_material"
                    : model.level >= 4
                      ? "already_mastered"
                      : "needs_review";
                return <div key={candidate.id} className="flex items-center justify-between rounded-xl bg-surface/70 p-3 text-sm"><span>{candidate.name}</span><code>{classification}</code></div>;
              })}
            </div>
            <button className={secondary+" mt-4"} onClick={() => { setDiagnosticMode(false); setAttemptIndex(0); }}>Palaa normaaliin harjoitteluun</button>
          </div>
        ) : selection ? (
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-muted/60 p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                <span>{activePath?.label ?? typeLabel[selection.question.type]}</span>
                <span>· {typeLabel[selection.question.type]}</span>
                <span>· vaikeus {selection.question.difficulty}/5</span>
                {selection.interleaved && <span>· interleaved</span>}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {courses.find((item) => item.id === selection.topic.course_id)?.code} · {selection.topic.name}
              </p>
              <p className="mt-2 text-lg font-semibold">{selection.question.prompt}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {activePath?.reason ?? "Moottori valitsee kysymystyypin osaamisnäytön, unohtumisriskin ja koevaiheen perusteella."}
                {" "}Aikaa ei lasketa osaamiseksi. Maailma jatkaa pyörimistään.
              </p>
            </div>

            <label className="block text-sm font-medium">
              Oma vastaus / ratkaisutapa
              <textarea
                rows={5}
                className="mt-1 w-full rounded-xl border bg-surface p-3"
                value={response}
                onChange={(event) => {
                  setResponse(event.target.value);
                  setRubricEvaluation(null);
                }}
                placeholder="Kirjoita muistista ennen materiaalin avaamista…"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className={secondary}
                onClick={() => setHintLevel((value) => Math.min(activePath?.hintLimit ?? 3, value + 1))}
                disabled={(activePath?.hintLimit ?? 3) === 0 || hintLevel >= Math.min(activePath?.hintLimit ?? 3, selection.question.hints.length)}
              >
                <Lightbulb size={17} />
                {hintLevel === 0 ? "Tarvitsen vihjeen" : "Seuraava vihje"}
              </button>
              <span className="text-xs text-muted-foreground">
                {activePath?.hintLimit === 0 ? "Tämä vaihe tehdään ilman vihjeitä." : `${hintLevel}/${activePath?.hintLimit ?? 3} vihjetasoa käytetty`}
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

            <div className="rounded-2xl border border-border bg-muted/40 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">Concept / Rubric Evaluator</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Arvio on neuvo, ei automaattinen mastery-päätös. Se ei näytä mallivastausta tai puuttuvien käsitteiden nimiä.
                  </p>
                </div>
                <button
                  type="button"
                  className={secondary}
                  disabled={response.trim().length < 2}
                  onClick={() => {
                    if (!selection) return;
                    setRubricEvaluation(
                      evaluatePracticeResponse(selection.question, response),
                    );
                  }}
                >
                  Arvioi oma vastaus
                </button>
              </div>

              {rubricEvaluation && (
                <div className="mt-4" role="status">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span>
                      <b>
                        Ehdotus: {resultText[rubricEvaluation.suggestedResult]}
                      </b>
                      <small className="ml-2 text-muted-foreground">
                        · rubriikkipisteet {rubricEvaluation.score}/100
                        · varmuus {rubricEvaluation.confidence}
                      </small>
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {rubricEvaluation.summary}
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {rubricEvaluation.dimensions.map((dimension) => (
                      <div
                        key={dimension.key}
                        className="rounded-xl bg-surface p-3 text-sm"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <b>{dimension.label}</b>
                          <span>{dimension.score}/{dimension.max}</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {dimension.note}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Koska sait arviointipalautetta ennen tallennusta, tämä yritys merkitään avustetuksi evidenceksi ja myöhemmin tarvitaan itsenäinen varmistus.
                  </p>
                </div>
              )}
            </div>

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
                <div className="mt-3">
                  <button type="button" className={secondary+" !min-h-9"} onClick={() => setShowExplanation((value) => !value)}>
                    {showExplanation ? "Piilota selitys" : "Vihjetaso 5 · näytä täysi selitys"}
                  </button>
                  {showExplanation && <p className="mt-2 rounded-lg bg-surface/70 p-3">{selection.question.explanation}</p>}
                </div>
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

        <Card title="Viivevarmistukset">
          {delayedVerificationQueueV4(courses, courseTopics, attempts).length ? (
            <div className="space-y-2">
              {delayedVerificationQueueV4(courses, courseTopics, attempts).slice(0,4).map((row) => (
                <button
                  key={row.topic.id}
                  className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl bg-muted/60 px-3 text-left"
                  onClick={() => { setTopicId(row.topic.id); setAttemptIndex(0); }}
                >
                  <span><b>{row.topic.name}</b><small className="mt-1 block text-muted-foreground">Tee nyt ilman vihjeitä · tavoiteviive {row.delayDays} pv</small></span>
                </button>
              ))}
            </div>
          ) : <p className="text-sm text-muted-foreground">Ei juuri nyt erääntyviä itsenäisiä viivevarmistuksia.</p>}
        </Card>
      </div>
    </div>
  );
}
