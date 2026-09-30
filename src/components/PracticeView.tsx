import { useEffect, useMemo, useRef, useState } from "react";
import { Brain, CheckCircle2, Lightbulb, Sparkles } from "lucide-react";
import { AbittiAnswerEditor, answerHasContent, answerPlainText } from "@/components/AbittiAnswerEditor";
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
import { addDays, fullDate, today } from "@/lib/fi";
import { confidenceLabel } from "@/lib/ui-fi";
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
  const [selectedOption, setSelectedOption] = useState("");
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackPolicy, setFeedbackPolicy] = useState<FeedbackPolicyV5 | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [delayedPrediction, setDelayedPrediction] = useState<number | null>(null);
  const [rubricEvaluation, setRubricEvaluation] = useState<PracticeRubricEvaluation | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [diagnosticMode, setDiagnosticMode] = useState(false);
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
          label:"Virheen viivevarmistus",
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
    () => selectedTopic
      ? confusionSetsV5({
          topics: courseTopics,
          dependencies: dependencies.data ?? [],
          attempts,
        }).find((set) => set.topicIds.includes(selectedTopic.id) && set.priority >= .55) ?? null
      : null,
    [attempts, courseTopics, dependencies.data, selectedTopic],
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
    confusionSet
      ? "interleaved" as const
      : diagnosticMode || interleavingVariant === null
        ? "auto" as const
        : interleavingVariant === "A"
          ? "blocked" as const
          : "interleaved" as const;

  const preferredTypes: LearningAttemptType[] | undefined =
    activePath?.stage === "pretest"
      ? ["recognition", "multiple_choice", "short_answer"]
      : activePath?.stage === "worked_example" || activePath?.stage === "self_explanation"
        ? ["explanation", "short_answer"]
        : activePath?.stage === "completion" || activePath?.stage === "guided"
          ? ["calculation", "short_answer", "ordering"]
          : activePath?.stage === "varied_context"
            ? ["application", "recognition", "error_detection"]
            : activePath?.stage === "transfer"
              ? ["application", "simulation", "error_detection"]
              : activePath?.stage === "delayed_verification"
                ? ["free_recall", "application"]
                : ["free_recall", "short_answer", "calculation"];

  const selectionTopics = confusionSet
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
  },[courseId,effectiveTopicId,diagnosticMode,activePath?.stage]);

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
    setHintLevel(activePath?.stage === "completion" ? 1 : 0);
    setConfidence(null);
    setDelayedPrediction(null);
    setFeedback("");
    setFeedbackPolicy(null);
    setRetryCount(0);
    setRubricEvaluation(null);
    setShowExplanation(false);
  }, [activePath?.stage, selection?.question.id, selection?.topic.id]);

  async function save(requestedResult: PracticeAttempt["result"]) {
    if (!selection || feedback) return;
    const isMultipleChoice =
      selection.question.type === "multiple_choice" &&
      Boolean(selection.question.options?.length);
    if (isMultipleChoice && !selectedOption) {
      toast.error("Valitse ensin vaihtoehto.");
      return;
    }
    if (!isMultipleChoice && requestedResult !== "not_yet" && !answerHasContent(response)) {
      toast.error("Kirjoita ensin oma yrityksesi.");
      return;
    }

    const autoResult: PracticeAttempt["result"] =
      isMultipleChoice && selection.question.correctAnswer
        ? selectedOption === selection.question.correctAnswer
          ? hintLevel > 0 ? "hinted" : "independent"
          : "not_yet"
        : requestedResult;
    const storedResponse = [
      selectedOption ? "Valinta: " + selectedOption : "",
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

    if(baseFeedbackPolicy.timing==="after_retry"&&retryCount<baseFeedbackPolicy.retriesBeforeReveal){
      setPinnedSelection(selection);
    }
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
        question_payload: {
          explanation: selection.question.explanation,
          questionBankId: selection.question.bankId ?? null,
          questionSource: selection.question.source ?? "template",
          curriculum: "LOPS21",
          answerContentFormat: "abitti-rich-text",
          selectedOption: selectedOption || null,
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
        toast.success("Virheen viivevarmistus onnistui. Virhe on nyt varmennettu hallituksi.");
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
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Tehtävien luonti epäonnistui.");
    } finally {
      setGeneratingQuestions(false);
    }
  }

  return (
    <div className="space-y-5">
      <Card
        title="Harjoittelutila"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={secondary}
              disabled={generatingQuestions || !courseId}
              onClick={() => void generateQuestionBatch()}
              title="Luo valittuun aiheeseen kahdeksan LOPS21-rajattua tehtävää"
            >
              <Sparkles size={16} />
              {generatingQuestions ? "Luodaan…" : "Luo tehtäviä"}
            </button>
            <span className="text-xs text-muted-foreground">
              Pankissa {(questionBank.data ?? []).filter((item) => item.course_id === courseId).length}
            </span>
            <button
              type="button"
              className={diagnosticMode ? primary : secondary}
              onClick={() => { setDiagnosticMode((value) => !value); setAttemptIndex(0); }}
            >
              {diagnosticMode ? "Lopeta lähtötason kartoitus" : "Kartoita lähtötaso"}
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
              {diagnosticLimit} eri aiheen muistista palauttamisen näyttö on tallennettu. Tulokset eivät yksin ratkaise osaamistasoa, vaan parantavat suositusten luotettavuutta.
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
                return <div key={candidate.id} className="flex items-center justify-between rounded-xl bg-surface/70 p-3 text-sm"><span>{candidate.name}</span><span className="text-xs font-medium text-muted-foreground">{diagnosticLabel[classification] ?? "Tarvitsee harjoittelua"}</span></div>;
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
                <span>· {selection.question.source === "bank" ? "LOPS21-tehtäväpankki" : "varatehtävä"}</span>
                {selection.interleaved && <span>· limitetty harjoittelu</span>}
                {confusionSet && <span>· sekoittuvien käsitteiden erottelu</span>}
                {activePath?.stage === "pretest" && <span>· ei vaikuta osaamistasoon</span>}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {courses.find((item) => item.id === selection.topic.course_id)?.code} · {confusionSet ? "Erottele: " + confusionSet.labels.join(" ja ") : selection.topic.name}
              </p>
              <p className="mt-2 text-lg font-semibold">{selection.question.prompt}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {activePath?.reason ?? "Moottori valitsee kysymystyypin osaamisnäytön, unohtumisriskin ja koevaiheen perusteella."}
                {" "}Opiskeluaikaa ei käytetä osaamisen mittarina.
              </p>
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
                <p className="mb-3 text-xs text-muted-foreground">Edellisestä saman aiheen yrityksestä on noin {delayedHours} h. Tämä myöhempää muistamista ennakoiva varmuusarvio annetaan ennen palautetta.</p>
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
                  <span className="font-normal text-muted-foreground">(varmuusarvion osuvuuden seurantaa varten)</span>
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
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">
                {selection.question.options?.length ? "Tarkista vastaus" : "Miten yritys onnistui?"}
              </p>
              {selection.question.options?.length ? (
                <button
                  disabled={record.isPending || Boolean(feedback) || !selectedOption}
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
                    <button type="button" className={primary+" !min-h-9"} onClick={() => {
                      setRetryCount((value) => value + 1);
                      setFeedback("");
                      setFeedbackPolicy(null);
                      setResponse("");
                      setSelectedOption("");
                      setRubricEvaluation(null);
                      startedAt.current = Date.now();
                    }}>
                      Yritä uudelleen ennen selitystä
                    </button>
                  ) : (
                    <>
                      {feedbackPolicy?.reveal !== "none" && <button type="button" className={secondary+" !min-h-9"} onClick={() => setShowExplanation((value) => !value)}>
                        {showExplanation ? "Piilota selitys" : "Näytä täysi selitys"}
                      </button>}
                      {showExplanation && <p className="mt-2 rounded-lg bg-surface/70 p-3">{selection.question.explanation}</p>}
                      <button type="button" className={primary+" mt-3 !min-h-9"} onClick={() => {setPinnedSelection(null);setAttemptIndex((value) => value + 1);}}>
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
                  {typeLabel[attempt.attempt_type] ?? attempt.attempt_type.replaceAll("_", " ")}
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

        <Card title="Viivevarmistukset">
          {dueMistakeVerifications.length>0&&<div className="mb-3 space-y-2">
            {dueMistakeVerifications.slice(0,4).map(mistake=>{const topic=courseTopics.find(candidate=>candidate.id===mistake.topic_id);return topic?<button
              key={"mistake:"+mistake.id}
              className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-primary/25 bg-accent/50 px-3 text-left"
              onClick={()=>{setTopicId(topic.id);setAttemptIndex(0);setPinnedSelection(null);}}
            ><span><b>{topic.name} · virheen viivevarmistus</b><small className="mt-1 block text-muted-foreground">Tee uusi tehtävä ilman vihjeitä. Korjaus ei ole valmis ennen tätä näyttöä.</small></span></button>:null})}
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
    </div>
  );
}
