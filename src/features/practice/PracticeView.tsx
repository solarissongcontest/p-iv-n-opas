import { useEffect, useMemo, useRef, useState } from "react";
import { Brain, CheckCircle2, ChevronLeft, Lightbulb, Sparkles } from "lucide-react";
import { AbittiAnswerEditor, answerHasContent, answerPlainText } from "@/components/AbittiAnswerEditor";
import { FocusLayout } from "@/layouts";
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
} from "@/lib/learning-os-v4";
import {
  confusionSetsV5,
  feedbackPolicyV5,
  instructionDecisionV5,
  pretestPlanV5,
  retentionTargetV5,
  stopRuleV5,
  subjectTaskProfilesV5,
  transferStateV5,
  type FeedbackPolicyV5,
} from "@/lib/learning-os-v5/index";
import {
  useAdvanceMistake,
  useCalibrationObservations,
  usePreferences,
  usePretestAttempts,
  useQuestionBank,
  useCreatePretestAttempt,
  useRecordPracticeAttempt,
  useTopicDependencies,
  useUpdateTopic,
  useUpsertLearningPolicyState,
} from "@/lib/data";
import { getDeviceAccessToken } from "@/lib/deviceSession";
import { ensureKe04QuestionBankSeed } from "@/lib/ke04-question-bank-browser";
import { addDays, fullDate, today } from "@/lib/fi";
import { attemptTypeLabel, confidenceLabel } from "@/lib/ui-fi";
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
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel p-4 sm:p-6 ${className}`}>
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

const diagnosticLabel: Record<string,string> = {
  missing_prerequisite: "Esitieto puuttuu",
  new_material: "Uusi aihe",
  already_mastered: "Vahva osaaminen",
  needs_review: "Tarvitsee kertausta",
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
  matching: "Yhdistely",
};

export function PracticeView({
  courses,
  topics,
  attempts,
  tests = [],
  mistakes = [],
  initialCourseId,
  initialTopicId,
  onExit,
}: {
  courses: Course[];
  topics: Topic[];
  attempts: PracticeAttempt[];
  tests?: PracticeTest[];
  mistakes?: Mistake[];
  initialCourseId?: string | undefined;
  initialTopicId?: string | undefined;
  onExit?: (() => void) | undefined;
}) {
  const [courseId, setCourseId] = useState(initialCourseId ?? courses[0]?.id ?? "");
  const [topicId, setTopicId] = useState(initialTopicId ?? "");
  const [sessionState, setSessionState] = useState<"setup"|"active"|"summary">("setup");
  const [completedCount, setCompletedCount] = useState(0);
  const sessionStartedAt = useRef<number>(Date.now());
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [matchingAnswers, setMatchingAnswers] = useState<Record<string, string>>({});
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [seedingKe04, setSeedingKe04] = useState(false);
  const seedAttemptedRef = useRef(new Set<string>());
  const [hintLevel, setHintLevel] = useState(0);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackPolicy, setFeedbackPolicy] = useState<FeedbackPolicyV5 | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [delayedPrediction, setDelayedPrediction] = useState<number | null>(null);
  const [rubricEvaluation, setRubricEvaluation] = useState<PracticeRubricEvaluation | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [feedbackExplanation, setFeedbackExplanation] = useState("");
  const [diagnosticMode, setDiagnosticMode] = useState(false);
  const [diagnosticTopicId, setDiagnosticTopicId] = useState<string | null>(null);
  const startedAt = useRef<number>(Date.now());
  const record = useRecordPracticeAttempt();
  const advanceMistake = useAdvanceMistake();
  const recordPretest = useCreatePretestAttempt();
  const pretestAttempts = usePretestAttempts();
  const updateTopic = useUpdateTopic();
  const preferences = usePreferences();
  const questionBank = useQuestionBank();
  const dependencies = useTopicDependencies();
  const calibrationObservations = useCalibrationObservations();
  const syncPolicyState = useUpsertLearningPolicyState();
  const experimentsEnabled = preferences.data?.personal_experiments_enabled ?? true;

  useEffect(() => {
    if (initialCourseId && initialCourseId !== courseId) {
      setCourseId(initialCourseId);
      setAttemptIndex(0);
    }
  }, [initialCourseId]);

  useEffect(() => {
    if (initialTopicId && initialTopicId !== topicId) {
      setTopicId(initialTopicId);
      setAttemptIndex(0);
    }
  }, [initialTopicId]);

  const course = courses.find((candidate) => candidate.id === courseId) ?? null;

  useEffect(() => {
    if (!course || course.code.toUpperCase() !== "KE04" || questionBank.isLoading) return;
    const seeded = (questionBank.data ?? []).filter((item) =>
      item.course_id === course.id &&
      item.module_code === "KE04" &&
      item.source_type === "seed" &&
      item.seed_version === "v3"
    ).length;
    if (seeded >= 780 || seedAttemptedRef.current.has(course.id)) return;

    seedAttemptedRef.current.add(course.id);
    setSeedingKe04(true);
    void ensureKe04QuestionBankSeed(course.id)
      .then(async (status) => {
        await questionBank.refetch();
        setAttemptIndex(0);
        toast.success(`KE04 V3 -tehtäväpankki valmis: ${status.questions} tehtävää.`);
      })
      .catch((error: unknown) => {
        seedAttemptedRef.current.delete(course.id);
        const message = error instanceof Error ? error.message : "KE04-tehtäväpankkia ei voitu alustaa.";
        toast.error(message);
      })
      .finally(() => setSeedingKe04(false));
  }, [course, questionBank.data, questionBank.isLoading]);

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

  // A topic diagnostic measures the topic the user explicitly selected.
  // Never rotate through the course by attempt index: that made question 2 of
  // a 1.1 diagnostic silently become a 1.2 question.
  const diagnosticLimit = 5;
  const diagnosticDone = diagnosticMode && attemptIndex >= diagnosticLimit;
  const effectiveTopicId = diagnosticMode ? (diagnosticTopicId ?? topicId) : topicId;

  useEffect(() => {
    if (!diagnosticMode || !diagnosticTopicId) return;
    if (courseTopics.some((candidate) => candidate.id === diagnosticTopicId)) return;
    setDiagnosticMode(false);
    setDiagnosticTopicId(null);
    setAttemptIndex(0);
  }, [courseTopics, diagnosticMode, diagnosticTopicId]);
  const selectedTopic = courseTopics.find((candidate) => candidate.id === effectiveTopicId) ?? courseTopics[0] ?? null;
  const dueMistakeVerification = selectedTopic
    ? mistakes.find(mistake =>
        mistake.topic_id===selectedTopic.id &&
        mistake.status!=="mastered" &&
        Boolean(mistake.delayed_verification_due) &&
        String(mistake.delayed_verification_due)<=today()
      ) ?? null
    : null;
  const selectedInstruction = selectedTopic
    ? instructionDecisionV5(selectedTopic, attempts, { examDate: course?.exam_date ?? null })
    : null;
  const previewPlan = selectedTopic ? pretestPlanV5(selectedTopic, attempts) : null;
  const topicPretests = selectedTopic
    ? (pretestAttempts.data ?? [])
        .filter((row) => row.topic_id === selectedTopic.id)
        .sort((a,b)=>b.created_at.localeCompare(a.created_at))
    : [];
  const completedPretests = topicPretests.length;
  const requiredPretests = previewPlan?.questionCount ?? 0;
  const previewActive =
    !diagnosticMode &&
    (preferences.data?.pretest_enabled ?? true) &&
    Boolean(previewPlan?.enabled) &&
    completedPretests < requiredPretests;
  const pretestOutcomeScore = completedPretests
    ? topicPretests.slice(0,Math.max(1,requiredPretests)).reduce((sum,row)=>
        sum+(row.outcome==="correct"?1:row.outcome==="partial"?.5:0),0
      )/Math.min(completedPretests,Math.max(1,requiredPretests))
    : 0;
  const activePath = diagnosticMode && selectedInstruction
    ? {
        ...selectedInstruction,
        stage: "independent" as const,
        label: "Diagnostiikka",
        reason: "Lähtötaso mitataan ilman vihjeitä, jotta harjoittelu ei ala arvailusta.",
        revealWorkedSolution: false,
        maxHints: 0,
        requiresIndependentFollowup: false,
      }
    : dueMistakeVerification && selectedInstruction
      ? {
          ...selectedInstruction,
          stage:"delayed_verification" as const,
          label:"Virheen myöhempi varmistus",
          reason:"Korjattu virhe on nyt testattava uudelleen ilman vihjeitä ennen kuin se voidaan merkitä hallituksi.",
          revealWorkedSolution:false,
          maxHints:0,
          requiresIndependentFollowup:false,
        }
      : previewActive && selectedInstruction
      ? {
          ...selectedInstruction,
          stage: "pretest" as const,
          label: "Ennakkotesti",
          reason: previewPlan?.reason ?? "Ennakkotesti kartoittaa esitiedot ilman, että väärä vastaus heikentää osaamistasoa.",
          revealWorkedSolution: false,
          maxHints: 0,
          requiresIndependentFollowup: false,
        }
      : selectedInstruction?.stage === "pretest"
        ? pretestOutcomeScore >= .75
          ? {
              ...selectedInstruction,
              stage: "independent" as const,
              label: "Itsenäinen tarkistus",
              reason: "Ennakkotesti osoitti vahvat esitiedot. Osaaminen varmistetaan seuraavaksi itsenäisellä tehtävällä.",
              revealWorkedSolution: false,
              maxHints: 0,
              requiresIndependentFollowup: false,
            }
          : pretestOutcomeScore >= .4
            ? {
                ...selectedInstruction,
                stage: "completion" as const,
                label: "Täydennä ratkaisu",
                reason: "Ennakkotesti osoitti osittaiset esitiedot. Aloitetaan kevyesti tuetulla tehtävällä ilman täyttä malliratkaisua.",
                revealWorkedSolution: false,
                maxHints: 2,
                requiresIndependentFollowup: true,
              }
            : {
                ...selectedInstruction,
                stage: "worked_example" as const,
                label: "Malliesimerkki",
                reason: "Ennakkotesti osoitti, että perusteita kannattaa vahvistaa malliesimerkillä ennen itsenäistä harjoittelua.",
                revealWorkedSolution: true,
                maxHints: Math.max(2, selectedInstruction.maxHints),
                requiresIndependentFollowup: true,
              }
        : selectedInstruction;
  const stopDecision = selectedTopic ? stopRuleV5(selectedTopic, attempts) : null;
  const transferState = selectedTopic ? transferStateV5(selectedTopic, attempts) : null;
  const confusionSet = useMemo(
    () => diagnosticMode
      ? null
      : selectedTopic
        ? confusionSetsV5({
            topics: courseTopics,
            dependencies: dependencies.data ?? [],
            attempts,
          }).find((set) => set.topicIds.includes(selectedTopic.id) && set.priority >= .55) ?? null
        : null,
    [attempts, courseTopics, dependencies.data, diagnosticMode, selectedTopic],
  );
  const interleavingVariant =
    experimentsEnabled && selectedTopic
      ? experimentVariantV4("interleaving", today(), courseId + ":" + selectedTopic.id)
      : null;
  const spacingVariant =
    experimentsEnabled && selectedTopic
      ? experimentVariantV4("spacing_window", today(), courseId + ":" + selectedTopic.id)
      : null;
  const subjectProfiles = useMemo(
    () => subjectTaskProfilesV5(attempts, (id) => courses.find((candidate) => candidate.id === id)?.subject ?? "Muu"),
    [attempts, courses],
  );
  const interleaveMode =
    diagnosticMode
      ? "blocked" as const
      : confusionSet
        ? "interleaved" as const
        : interleavingVariant === null
          ? "auto" as const
          : interleavingVariant === "A"
            ? "blocked" as const
            : "interleaved" as const;

  const preferredTypes: LearningAttemptType[] | undefined =
    activePath?.stage === "pretest"
      ? ["recognition", "matching", "multiple_choice", "short_answer"]
      : activePath?.stage === "worked_example" || activePath?.stage === "self_explanation"
        ? ["explanation", "short_answer"]
        : activePath?.stage === "completion" || activePath?.stage === "guided"
          ? ["calculation", "short_answer", "ordering"]
          : activePath?.stage === "varied_context"
            ? ["application", "recognition", "matching", "error_detection"]
            : activePath?.stage === "transfer"
              ? ["application", "simulation", "error_detection"]
              : activePath?.stage === "delayed_verification"
                ? ["free_recall", "application"]
                : ["free_recall", "short_answer", "calculation"];

  const selectionTopics = diagnosticMode && effectiveTopicId
    ? courseTopics.filter((candidate) => candidate.id === effectiveTopicId)
    : confusionSet
      ? courseTopics.filter((candidate)=>confusionSet.topicIds.includes(candidate.id))
      : courseTopics;
  const selectionCandidate = useMemo(
    () =>
      diagnosticDone
        ? null
        : selectPracticeQuestion({
            topics: selectionTopics,
            attempts,
            selectedTopicId: effectiveTopicId,
            course,
            examStage: stage.key,
            index: attemptIndex,
            preferredTypes,
            interleaveMode,
            questionBank: questionBank.data ?? [],
          }),
    [attemptIndex, attempts, course, selectionTopics, diagnosticDone, effectiveTopicId, interleaveMode, preferredTypes, questionBank.data, stage.key],
  );
  const [pinnedSelection,setPinnedSelection]=useState<typeof selectionCandidate>(null);
  const selection=pinnedSelection??selectionCandidate;

  useEffect(()=>{
    setPinnedSelection(null);
  },[courseId,effectiveTopicId,diagnosticMode]);

  const dueMistakeVerifications=mistakes.filter(mistake=>
    mistake.course_id===courseId &&
    mistake.topic_id &&
    mistake.status!=="mastered" &&
    Boolean(mistake.delayed_verification_due) &&
    String(mistake.delayed_verification_due)<=today()
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

  const latestPriorAttempt = selectedTopic
    ? attempts
        .filter((attempt) => attempt.topic_id === selectedTopic.id)
        .sort((a, b) => b.created_at.localeCompare(a.created_at))[0] ?? null
    : null;
  const delayedHours = latestPriorAttempt
    ? Math.max(0, Math.floor((Date.now() - Date.parse(latestPriorAttempt.created_at)) / 3_600_000))
    : 0;
  const shouldAskDelayedPrediction =
    !diagnosticMode &&
    delayedHours >= 12 &&
    Boolean(selectedTopic) &&
    !(calibrationObservations.data ?? []).some((row) =>
      row.topic_id === selectedTopic?.id &&
      row.observed_at &&
      Date.parse(row.observed_at) > Date.now() - 6 * 60 * 60 * 1000
    );

  useEffect(() => {
    startedAt.current = Date.now();
    setResponse("");
    setSelectedOption("");
    setMatchingAnswers({});
    setHintLevel(activePath?.stage === "completion" ? 1 : 0);
    setConfidence(null);
    setDelayedPrediction(null);
    setFeedback("");
    setFeedbackPolicy(null);
    setRetryCount(0);
    setRubricEvaluation(null);
    setShowExplanation(false);
    setFeedbackExplanation("");
  }, [selection?.question.id, selection?.topic.id]);

  async function save(requestedResult: PracticeAttempt["result"]) {
    if (!selection || feedback) return;
    const isMultipleChoice =
      selection.question.type === "multiple_choice" &&
      Boolean(selection.question.options?.length);
    const matchingPairs = selection.question.matchingPairs ?? [];
    const isMatching = selection.question.type === "matching" && matchingPairs.length > 0;
    const matchingComplete = isMatching && matchingPairs.every((pair) => Boolean(matchingAnswers[pair.left]));
    const matchingCorrect = isMatching && matchingPairs.every((pair) => matchingAnswers[pair.left] === pair.right);

    if (isMultipleChoice && !selectedOption) {
      toast.error("Valitse ensin vaihtoehto.");
      return;
    }
    if (isMatching && !matchingComplete) {
      toast.error("Yhdistä ensin kaikki parit.");
      return;
    }
    if (!isMultipleChoice && !isMatching && requestedResult !== "not_yet" && !answerHasContent(response)) {
      toast.error("Kirjoita ensin oma yrityksesi.");
      return;
    }

    // Recording an attempt can update the adaptive attempt list before the user
    // presses "Seuraava tehtävä". Keep the visible question and explanation
    // attached to the exact item that was just answered until then.
    setPinnedSelection(selection);
    setFeedbackExplanation(selection.question.explanation);

    const autoResult: PracticeAttempt["result"] =
      isMultipleChoice && selection.question.correctAnswer
        ? selectedOption === selection.question.correctAnswer
          ? hintLevel > 0 ? "hinted" : "independent"
          : "not_yet"
        : isMatching
          ? matchingCorrect
            ? hintLevel > 0 ? "hinted" : "independent"
            : "not_yet"
          : requestedResult;
    const storedResponse = [
      selectedOption ? "Valinta: " + selectedOption : "",
      isMatching
        ? matchingPairs.map((pair) => `${pair.left} → ${matchingAnswers[pair.left] ?? "—"}`).join("\n")
        : "",
      answerHasContent(response) ? response.trim() : "",
    ].filter(Boolean).join("\n");

    const responseTime = Math.max(0, Date.now() - startedAt.current);
    const source = recovery.items.some((item) => item.topic.id === selection.topic.id)
      ? "review"
      : stage.key === "repair"
        ? "mistake_repair"
        : "practice";

    const resultOutcome = autoResult === "independent" ? "correct" : autoResult === "hinted" ? "partial" : "incorrect";
    const adaptiveFeedbackEnabled=preferences.data?.feedback_policy_enabled??true;
    const baseFeedbackPolicy:FeedbackPolicyV5 = adaptiveFeedbackEnabled
      ? feedbackPolicyV5({
          mode: activePath?.stage === "pretest"
            ? "pretest"
            : stage.key === "repair"
              ? "error_repair"
              : ["worked_example","self_explanation","completion","guided"].includes(activePath?.stage ?? "")
                ? "learning"
                : "retrieval",
          result: resultOutcome,
          ...(activePath?.stage ? { stage: activePath.stage } : {}),
        })
      : {
          timing:"after_item",
          reveal:activePath?.stage==="worked_example"?"worked_solution":"principle",
          retriesBeforeReveal:0,
          explanation:"Mukautuva palautteen ajoitus on pois päältä, joten palaute näytetään heti yrityksen jälkeen.",
        };
    const effectiveFeedbackPolicy = retryCount >= baseFeedbackPolicy.retriesBeforeReveal && baseFeedbackPolicy.timing === "after_retry"
      ? { ...baseFeedbackPolicy, timing: "after_item" as const }
      : baseFeedbackPolicy;
    const scaffoldStage =
      activePath?.stage === "worked_example" ? "worked_example" :
      activePath?.stage === "self_explanation" ? "explanation" :
      activePath?.stage === "completion" ? "partial_completion" :
      activePath?.stage === "guided" ? "guided" :
      activePath?.stage === "varied_context" ? "mixed" :
      activePath?.stage === "transfer" ? "transfer" :
      activePath?.stage === "delayed_verification" ? "delayed_verification" :
      "independent";
    const automaticAssistance = ["worked_example","self_explanation","completion","guided"].includes(activePath?.stage ?? "");
    const transferLevel =
      activePath?.stage === "transfer" ? Math.max(5, transferState?.nextLevel ?? 5) :
      activePath?.stage === "varied_context" ? Math.max(3, transferState?.nextLevel ?? 3) :
      activePath?.stage === "independent" ? Math.max(2, transferState?.level ?? 2) :
      activePath?.stage === "self_explanation" ? 1 : 0;

    try {
      if (activePath?.stage === "pretest") {
        await recordPretest.mutateAsync({
          course_id: selection.topic.course_id,
          topic_id: selection.topic.id,
          question_bank_id: typeof selection.question.bankId === "string" ? selection.question.bankId : null,
          prompt: selection.question.prompt,
          response: storedResponse || null,
          predicted_confidence: confidence,
          outcome: resultOutcome === "correct" ? "correct" : resultOutcome === "partial" ? "partial" : "incorrect",
        });
        setFeedbackPolicy(effectiveFeedbackPolicy);
        const answerReveal =
          isMultipleChoice && selection.question.correctAnswer
            ? " Oikea vastaus: " + selection.question.correctAnswer + "."
            : "";
        setFeedback(
          "Ennakkotesti tallennettiin havaintona, joka ei muuta osaamistasoa." +
          answerReveal +
          " " + selection.question.explanation,
        );
        return;
      }

      const recordedAttemptId = await record.mutateAsync({
        course_id: selection.topic.course_id,
        topic_id: selection.topic.id,
        attempt_type: selection.question.type,
        prompt: selection.question.prompt,
        response: storedResponse || null,
        difficulty: selection.question.difficulty,
        result: autoResult,
        confidence,
        hint_used: hintLevel > 0 || automaticAssistance,
        hints_used: Math.max(hintLevel, automaticAssistance ? 1 : 0),
        response_time_ms: responseTime,
        source,
        skills: selection.question.skills,
        expected_concepts: selection.question.expectedConcepts,
        question_bank_id: selection.question.bankId ?? null,
        question_payload: {
          explanation: selection.question.explanation,
          questionBankId: selection.question.bankId ?? null,
          questionSource: selection.question.source ?? "template",
          curriculum: "LOPS21",
          answerContentFormat: "abitti-rich-text",
          selectedOption: selectedOption || null,
          matchingAnswers: selection.question.type === "matching" ? matchingAnswers : null,
          prerequisites: selection.question.prerequisites ?? [],
          commonErrors: selection.question.commonErrors ?? [],
          reserveForExam: selection.question.reserveForExam ?? false,
          interleaved: selection.interleaved,
          examStage: stage.key,
          scaffoldStage,
          instructionStage: activePath?.stage ?? "independent",
          pretest: false,
          masteryNeutral: false,
          transferLevel,
          discriminationTopicIds: confusionSet?.topicIds.includes(selection.topic.id) ? confusionSet.topicIds : [],
          feedbackTiming: effectiveFeedbackPolicy.timing,
          preRetrievalConfidence: delayedPrediction,
          confidenceDelayHours: delayedPrediction ? delayedHours : null,
          assisted: hintLevel > 0 || automaticAssistance,
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

      if (course) {
        const retention = retentionTargetV5(selection.topic, course, attempts);
        const stop = stopRuleV5(selection.topic, attempts);
        void syncPolicyState.mutateAsync({
          course_id: course.id,
          topic_id: selection.topic.id,
          desired_retention: retention.desiredRetention,
          current_retention: retention.currentRetention,
          recommended_minutes: retention.recommendedMinutes,
          stop_today: stop.stopToday,
          next_useful_date: stop.nextUsefulDate,
          recommendation_confidence: retention.confidence.score,
          recommendation_reason: retention.reason,
          model_version: 5,
        }).catch(() => undefined);
      }

      if (
        autoResult === "independent" &&
        dueMistakeVerification &&
        activePath?.stage === "delayed_verification"
      ) {
        await advanceMistake.mutateAsync({id:dueMistakeVerification.id,status:"mastered"});
        toast.success("Virheen myöhempi varmistus onnistui. Virhe on nyt varmennettu hallituksi.");
      }

      if (autoResult === "independent") {
        const profile = subjectProfiles.find((row) =>
          row.subject === (course?.subject ?? "Muu") &&
          row.attemptType === selection.question.type &&
          row.reliability.label !== "low"
        );
        const experimentalDays = spacingVariant === "A" ? 3 : spacingVariant === "B" ? 5 : null;
        const baseDays = experimentalDays ?? 4;
        const personalizedDays = profile
          ? Math.max(1, Math.min(14, Math.round(baseDays * profile.spacingMultiplier)))
          : baseDays;
        if ((experimentsEnabled && spacingVariant) || profile) {
          await updateTopic.mutateAsync({
            id: selection.topic.id,
            // Personalization changes only the next review suggestion, never mastery itself.
            next_review: addDays(today(), personalizedDays),
          } as Parameters<typeof updateTopic.mutateAsync>[0]);
        }
      }

      setFeedbackPolicy(effectiveFeedbackPolicy);
      const canReveal = effectiveFeedbackPolicy.timing !== "after_retry";
      const answerReveal =
        canReveal && isMultipleChoice && selection.question.correctAnswer
          ? " Oikea vastaus: " + selection.question.correctAnswer + "."
          : "";
      const explanationReveal =
        canReveal && ["principle","worked_solution","next_step"].includes(effectiveFeedbackPolicy.reveal)
          ? " " + selection.question.explanation
          : "";
      setFeedback(
        effectiveFeedbackPolicy.timing === "after_retry"
          ? "Älä katso ratkaisua vielä. Tee yksi uusi yritys samalla periaatteella ennen palautetta."
          : autoResult === "independent"
            ? `Hyvä itsenäinen näyttö.${answerReveal}${explanationReveal}`
            : autoResult === "hinted"
              ? `Vihje auttoi, joten tämä yritys painaa osaamisarviossa vähemmän.${answerReveal}${explanationReveal}`
              : `Tämä tarvitsee uuden kierroksen.${answerReveal}${explanationReveal}`,
      );
    } catch {
      setPinnedSelection(null);
      setFeedbackExplanation("");
      toast.error("Harjoitusyritystä ei voitu tallentaa.");
    }
  }

  async function generateQuestionBatch() {
    if (!courseId) return;
    const token = getDeviceAccessToken();
    if (!token) {
      toast.error("Kirjautuminen on vanhentunut. Avaa sovellus uudelleen.");
      return;
    }
    setGeneratingQuestions(true);
    try {
      const response = await fetch("/api/ai/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          courseId,
          topicId: topicId || undefined,
          count: 8,
        }),
      });
      const payload = await response.json().catch(() => ({})) as {
        created?: number;
        error?: string;
      };
      if (!response.ok) throw new Error(payload.error ?? "Tehtävien luonti epäonnistui.");
      await questionBank.refetch();
      setAttemptIndex(0);
      toast.success((payload.created ?? 0) + " LOPS21-tehtävää lisättiin tehtäväpankkiin.");
    } catch {
      toast.error("Tehtäviä ei voitu luoda. Tarkista yhteys ja yritä uudelleen.");
    } finally {
      setGeneratingQuestions(false);
    }
  }

  return (
    <FocusLayout className={"practice-view practice-session-"+sessionState+" space-y-8"}>
      <Card
        className="practice-primary-surface"
        title="Harjoittelutila"
        action={
          <span className="practice-stage-chip">
            <Brain size={15} />
            {diagnosticMode ? `${Math.min(attemptIndex, diagnosticLimit)}/${diagnosticLimit}` : stage.stages[stage.index]?.label ?? "Harjoittelu"}
          </span>
        }
      >
        {sessionState==="setup" && <details open className="practice-config">
          <summary className="practice-config-summary">
            <span className="min-w-0">
              <b>{course?.code ?? "Valitse kurssi"}{selectedTopic ? ` · ${selectedTopic.name}` : ""}</b>
              <small>Vaihda kurssia, aihetta tai harjoittelutilaa</small>
            </span>
            <span className="practice-config-action">Asetukset</span>
          </summary>
          <div className="practice-config-body">
            <div className="practice-setup-grid grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Kurssi
                <select
                  className="mt-1 w-full rounded-xl border bg-surface p-3"
                  value={courseId}
                  onChange={(event) => {
                    setCourseId(event.target.value);
                    setTopicId("");
                    setDiagnosticMode(false);
                    setDiagnosticTopicId(null);
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
                    const nextTopicId = event.target.value;
                    setTopicId(nextTopicId);
                    if (diagnosticMode) setDiagnosticTopicId(nextTopicId);
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

            <div className="practice-utility-row mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                className={secondary+" practice-utility-button"}
                disabled={generatingQuestions || !courseId}
                onClick={() => void generateQuestionBatch()}
                title="Luo valittuun aiheeseen kahdeksan LOPS21-rajattua tehtävää"
              >
                <Sparkles size={16} />
                {generatingQuestions ? "Luodaan…" : "Luo tehtäviä"}
              </button>
              <span className="text-xs text-muted-foreground">
                {seedingKe04
                  ? "KE04-pankkia alustetaan…"
                  : `Pankissa ${(questionBank.data ?? []).filter((item) => item.course_id === courseId).length} tehtävää`}
              </span>
              <button
                type="button"
                className={(diagnosticMode ? primary : secondary)+" practice-utility-button"}
                onClick={() => {
                  if (diagnosticMode) {
                    setDiagnosticMode(false);
                    setDiagnosticTopicId(null);
                  } else {
                    setDiagnosticTopicId(topicId || courseTopics[0]?.id || null);
                    setDiagnosticMode(true);
                  }
                  setAttemptIndex(0);
                }}
              >
                {diagnosticMode ? "Lopeta lähtötason kartoitus" : "Kartoita tämän kappaleen lähtötaso"}
              </button>
            </div>
          </div>
        </details>}

        {sessionState==="setup" && <div className="practice-start-panel"><button type="button" className={primary} disabled={!courseId || !selectedTopic} onClick={()=>{sessionStartedAt.current=Date.now();setCompletedCount(0);setSessionState("active");}}>Aloita harjoittelu</button><p className="mt-2 text-xs text-muted-foreground">Harjoituksen aikana asetukset ja tukipaneelit väistyvät tehtävän tieltä.</p></div>}

        {sessionState==="active" && <div className="practice-focus-toolbar"><button type="button" className={secondary+" !min-h-11"} onClick={()=>setSessionState("summary")}><ChevronLeft size={16}/>Lopeta</button><span className="text-sm text-muted-foreground">{completedCount} tehtävää tehty</span></div>}



        {sessionState==="summary" ? (
          <div className="practice-summary">
            <p className="text-sm font-semibold text-primary">Harjoittelu valmis tältä erää</p>
            <h3 className="mt-2 text-3xl font-semibold">{completedCount} tehtävää</h3>
            <p className="mt-2 text-sm text-muted-foreground">Kesto noin {Math.max(1,Math.ceil((Date.now()-sessionStartedAt.current)/60000))} min. Oppimismoottori käyttää vain tallennettuja yrityksiä osaamisnäyttönä.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" className={primary} onClick={()=>{sessionStartedAt.current=Date.now();setSessionState("active");}}>Jatka harjoittelua</button>
              <button type="button" className={secondary} onClick={()=>{setSessionState("setup");onExit?.();}}>Valmis</button>
            </div>
          </div>
        ) : sessionState==="active" ? diagnosticDone ? (
          <div className="mt-5 rounded-2xl bg-accent p-4">
            <h3 className="font-semibold">Lähtötason tarkistus valmis.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {diagnosticLimit} kysymyksen näyttö aiheesta {selectedTopic?.name ?? "valittu aihe"} on tallennettu. Kartoitus vaikuttaa vain tämän aiheen suosituksiin ja osaamisnäyttöön.
            </p>
            {selectedTopic && (() => {
              const model = masteryModelV4(selectedTopic, attempts, { examDate: course?.exam_date ?? null });
              const missingPrerequisite = (selectedTopic.dependencies ?? []).some((id) => {
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
              return <div className="mt-3 flex items-center justify-between rounded-xl bg-surface/70 p-3 text-sm"><span>{selectedTopic.name}</span><span className="text-xs font-medium text-muted-foreground">{diagnosticLabel[classification] ?? "Tarvitsee harjoittelua"}</span></div>;
            })()}
            <button className={secondary+" mt-4"} onClick={() => { setDiagnosticMode(false); setDiagnosticTopicId(null); setAttemptIndex(0); }}>Palaa normaaliin harjoitteluun</button>
          </div>
        ) : selection ? (
          <div className="practice-question-flow mt-6 space-y-5">
            <div className="practice-question-context">
              <div className="practice-question-meta flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
                <span className="font-semibold text-primary">{activePath?.label ?? typeLabel[selection.question.type]}</span>
                <span>· {typeLabel[selection.question.type]}</span>
                <span>· vaikeus {selection.question.difficulty}/5</span>
                <span>· {selection.question.source === "bank" ? "LOPS21-tehtäväpankki" : "varatehtävä"}</span>
                {selection.interleaved && <span>· vaihteleva harjoittelu</span>}
                {confusionSet && <span>· sekoittuvien käsitteiden erottelu</span>}
                {activePath?.stage === "pretest" && <span>· ei vaikuta osaamistasoon</span>}
              </div>
              <p className="practice-topic mt-2 text-sm text-muted-foreground">
                {courses.find((item) => item.id === selection.topic.course_id)?.code} · {confusionSet ? "Erottele: " + confusionSet.labels.join(" ja ") : selection.topic.name}
              </p>
              <p className="practice-prompt mt-3">{selection.question.prompt}</p>
              <details className="practice-rationale mt-3 text-sm text-muted-foreground">
                <summary className="cursor-pointer font-medium text-foreground">Miksi tämä tehtävä?</summary>
                <p className="mt-2">
                  {activePath?.reason ?? "Moottori valitsee kysymystyypin osaamisnäytön, unohtumisriskin ja koevaiheen perusteella."}
                  {" "}Opiskeluaikaa ei käytetä osaamisen mittarina.
                </p>
              </details>
            </div>

            {stopDecision?.stopToday && !diagnosticMode && (
              <div className="rounded-xl border border-primary/30 bg-accent/60 p-3 text-sm">
                <b>Tästä aiheesta riittää tältä päivältä.</b>
                <p className="mt-1 text-muted-foreground">{stopDecision.reason} Seuraava hyödyllinen palautus: {fullDate(stopDecision.nextUsefulDate)}.</p>
              </div>
            )}

            {activePath?.stage === "worked_example" && (
              <div className="rounded-2xl border border-border bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Malliesimerkki</p>
                <p className="mt-2 text-sm">{selection.question.explanation}</p>
                <p className="mt-2 text-xs text-muted-foreground">Tutki rakennetta. Seuraavassa vaiheessa tuki häivytetään eikä tätä ratkaisua enää näytetä.</p>
              </div>
            )}

            {shouldAskDelayedPrediction && (
              <fieldset className="rounded-2xl border border-border p-4">
                <legend className="px-1 text-sm font-medium">Ennen tehtävää: jos sinut testataan nyt, kuinka varma olet?</legend>
                <p className="mb-3 text-xs text-muted-foreground">Edellisestä saman aiheen yrityksestä on noin {delayedHours} h. Tämä viive-ennuste mitataan ennen palautetta.</p>
                <div className="flex flex-wrap gap-2">{[[1,"Epävarma"],[2,"Melko varma"],[3,"Varma"]].map(([value,label])=><button key={value} type="button" aria-pressed={delayedPrediction===value} className={delayedPrediction===value?primary:secondary} onClick={()=>setDelayedPrediction(Number(value))}>{label}</button>)}</div>
              </fieldset>
            )}

            {selection.question.options?.length ? (
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Valitse vastaus</legend>
                {selection.question.options.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    disabled={Boolean(feedback)}
                    aria-pressed={selectedOption === option}
                    onClick={() => {
                      setSelectedOption(option);
                      setRubricEvaluation(null);
                    }}
                    className={
                      "flex min-h-12 w-full items-start gap-3 rounded-xl border p-3 text-left " +
                      (selectedOption === option ? "border-primary bg-accent" : "border-border bg-surface")
                    }
                  >
                    <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </button>
                ))}
              </fieldset>
            ) : null}

            {selection.question.type === "matching" && (selection.question.matchingPairs?.length ?? 0) > 0 ? (
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium">Yhdistä parit</legend>
                {(selection.question.matchingPairs ?? []).map((pair) => {
                  const choices = [...new Set((selection.question.matchingPairs ?? []).map((candidate) => candidate.right))].sort();
                  return (
                    <label key={pair.left} className="grid gap-2 rounded-xl border border-border bg-surface p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
                      <span className="font-medium">{pair.left}</span>
                      <select
                        className="min-h-11 rounded-xl border border-border bg-background px-3"
                        value={matchingAnswers[pair.left] ?? ""}
                        disabled={Boolean(feedback)}
                        onChange={(event) => {
                          setMatchingAnswers((current) => ({ ...current, [pair.left]: event.target.value }));
                          setRubricEvaluation(null);
                        }}
                      >
                        <option value="">Valitse pari…</option>
                        {choices.map((choice) => <option key={choice} value={choice}>{choice}</option>)}
                      </select>
                    </label>
                  );
                })}
              </fieldset>
            ) : null}

            {selection.question.type !== "matching" && (
              <AbittiAnswerEditor
                key={selection.question.id}
                label={selection.question.options?.length ? "Perustelu / ratkaisutapa" : "Oma vastaus / ratkaisutapa"}
                value={response}
                disabled={Boolean(feedback)}
                onChange={(next) => {
                  setResponse(next);
                  setRubricEvaluation(null);
                }}
                placeholder="Kirjoita muistista ennen materiaalin avaamista…"
                minHeight={160}
              />
            )}

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className={secondary}
                onClick={() => setHintLevel((value) => Math.min(activePath?.maxHints ?? 3, value + 1))}
                disabled={(activePath?.maxHints ?? 3) === 0 || hintLevel >= Math.min(activePath?.maxHints ?? 3, selection.question.hints.length)}
              >
                <Lightbulb size={17} />
                {hintLevel === 0 ? "Tarvitsen vihjeen" : "Seuraava vihje"}
              </button>
              <span className="text-xs text-muted-foreground">
                {activePath?.maxHints === 0 ? "Tämä vaihe tehdään ilman vihjeitä." : `${hintLevel}/${activePath?.maxHints ?? 3} vihjetasoa käytetty`}
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

            {selection.question.type !== "matching" && <div className="practice-self-review rounded-2xl border border-border bg-muted/25 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">Vastauksen oma-arviointi</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Arvio on ohjeellinen eikä muuta osaamistasoa automaattisesti. Se ei näytä mallivastausta tai paljasta puuttuvia käsitteitä ennen omaa yritystä.
                  </p>
                </div>
                <button
                  type="button"
                  className={secondary}
                  disabled={!answerHasContent(response)}
                  onClick={() => {
                    if (!selection) return;
                    setRubricEvaluation(
                      evaluatePracticeResponse(selection.question, answerPlainText(response)),
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
                        · arvio {rubricEvaluation.score}/100
                        · arvion varmuus {confidenceLabel(rubricEvaluation.confidence)}
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
                    Koska sait arviointipalautetta ennen tallennusta, tämä yritys merkitään avustetuksi näytöksi ja myöhemmin tarvitaan itsenäinen varmistus.
                  </p>
                </div>
              )}
            </div>}

            <div>
              <p className="mb-2 text-sm font-medium">
                {selection.question.options?.length || selection.question.type === "matching" ? "Tarkista vastaus" : "Miten yritys onnistui?"}
              </p>
              {selection.question.options?.length || selection.question.type === "matching" ? (
                <button
                  disabled={
                    record.isPending ||
                    Boolean(feedback) ||
                    (selection.question.type === "matching"
                      ? !(selection.question.matchingPairs ?? []).every((pair) => Boolean(matchingAnswers[pair.left]))
                      : !selectedOption)
                  }
                  className={primary}
                  onClick={() => void save("independent")}
                >
                  <CheckCircle2 size={17} />
                  Tarkista ja tallenna
                </button>
              ) : (
                <div className="grid gap-2 sm:grid-cols-3">
                  <button disabled={record.isPending || Boolean(feedback)} className={primary} onClick={() => void save("independent")}>
                    <CheckCircle2 size={17} />
                    Itsenäisesti
                  </button>
                  <button disabled={record.isPending || Boolean(feedback)} className={secondary} onClick={() => void save("hinted")}>
                    Vihjeellä / osittain
                  </button>
                  <button disabled={record.isPending || Boolean(feedback)} className={secondary} onClick={() => void save("not_yet")}>
                    Ei vielä
                  </button>
                </div>
              )}
            </div>

            {feedback && (
              <div className="rounded-xl bg-accent p-3 text-sm">
                <Sparkles className="mr-2 inline" size={16} />
                {feedback}
                <div className="mt-3">
                  {feedbackPolicy?.timing === "after_retry" ? (
                    <button type="button" className={primary+" !min-h-11"} onClick={() => {
                      setRetryCount((value) => value + 1);
                      setFeedback("");
                      setFeedbackPolicy(null);
                      setResponse("");
                      setSelectedOption("");
                      setMatchingAnswers({});
                      setRubricEvaluation(null);
                      startedAt.current = Date.now();
                    }}>
                      Yritä uudelleen ennen selitystä
                    </button>
                  ) : (
                    <>
                      {feedbackPolicy?.reveal !== "none" && <button type="button" className={secondary+" !min-h-11"} onClick={() => setShowExplanation((value) => !value)}>
                        {showExplanation ? "Piilota selitys" : "Näytä täysi selitys"}
                      </button>}
                      {showExplanation && <p className="mt-2 rounded-lg bg-surface/70 p-3">{feedbackExplanation || selection.question.explanation}</p>}
                      <button type="button" className={primary+" mt-3 !min-h-11"} onClick={() => {setPinnedSelection(null);setFeedbackExplanation("");setCompletedCount((value)=>value+1);setAttemptIndex((value) => value + 1);}}>
                        Seuraava tehtävä
                      </button>
                    </>
                  )}
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
        ) : null}
      </Card>

      <div className="practice-support-grid grid gap-4 lg:grid-cols-2" aria-hidden={sessionState==="active"}>
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
                  {recovery.hiddenCount} muuta kertausta on jätetty myöhempään vuoroon. Ne ajoitetaan myöhemmille päiville käytettävissä olevan ajan mukaan.
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
                  {typeLabel[attempt.attempt_type] ?? attemptTypeLabel(attempt.attempt_type)}
                  {" · "}vaikeus {attempt.difficulty}/5
                  {attempt.delay_days != null ? ` · viive ${attempt.delay_days} pv` : ""}
                  {typeof attempt.hints_used === "number" ? ` · ${attempt.hints_used} vihjettä` : ""}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Ensimmäinen yritys muodostaa ensimmäisen muistista palauttamisen havainnon.
            </p>
          )}
        </Card>

        <Card title="Myöhemmät varmistukset">
          {dueMistakeVerifications.length>0&&<div className="mb-3 space-y-2">
            {dueMistakeVerifications.slice(0,4).map(mistake=>{const topic=courseTopics.find(candidate=>candidate.id===mistake.topic_id);return topic?<button
              key={"mistake:"+mistake.id}
              className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-primary/25 bg-accent/50 px-3 text-left"
              onClick={()=>{setTopicId(topic.id);setAttemptIndex(0);setPinnedSelection(null);}}
            ><span><b>{topic.name} · virheen myöhempi varmistus</b><small className="mt-1 block text-muted-foreground">Tee uusi tehtävä ilman vihjeitä. Korjaus ei ole valmis ennen tätä näyttöä.</small></span></button>:null})}
          </div>}
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
          ) : dueMistakeVerifications.length===0 ? <p className="text-sm text-muted-foreground">Ei juuri nyt erääntyviä itsenäisiä viivevarmistuksia.</p> : null}
        </Card>
      </div>
    </FocusLayout>
  );
}
