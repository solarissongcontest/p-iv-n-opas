import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import {
  AbittiAnswerEditor as BaseAbittiAnswerEditor,
  answerHasContent as baseAnswerHasContent,
} from "@/components/AbittiAnswerEditorBase";
import {
  useActiveStudySession,
  useCourses,
  usePracticeAttempts,
  useQuestionBank,
  useTopics,
} from "@/lib/data";
import { ensureKe04QuestionBankSeed } from "@/lib/ke04-question-bank-browser";
import {
  hintAt,
  selectPracticeQuestion,
  type LearningAttemptType,
  type PracticeQuestion,
} from "@/lib/learning-engine";

export const GUIDED_RETRIEVAL_PARTIAL_PREFIX = "[[OPK_GUIDED_RETRIEVAL_PARTIAL_V1]]";
export const GUIDED_RETRIEVAL_COMPLETE_PREFIX = "[[OPK_GUIDED_RETRIEVAL_V1]]";

const QUESTION_COUNT = 3;
const GUIDED_TYPES: LearningAttemptType[] = [
  "recognition",
  "short_answer",
  "calculation",
  "explanation",
  "application",
  "free_recall",
  "error_detection",
];

const TYPE_LABEL: Partial<Record<LearningAttemptType, string>> = {
  recognition: "Tunnistaminen",
  short_answer: "Lyhyt vastaus",
  calculation: "Lasku / ratkaisurunko",
  explanation: "Selittäminen",
  application: "Soveltaminen",
  free_recall: "Muistista palautus",
  error_detection: "Virheen tunnistaminen",
};

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: number;
  autoFocus?: boolean;
  className?: string;
};

type StoredItem = {
  questionId: string;
  prompt: string;
  answer: string;
  hintLevel: number;
};

type StoredSnapshot = {
  version: 1;
  topicId: string;
  items: StoredItem[];
};

function decodeSnapshot(value: string): StoredSnapshot | null {
  if (!value.startsWith(GUIDED_RETRIEVAL_PARTIAL_PREFIX) && !value.startsWith(GUIDED_RETRIEVAL_COMPLETE_PREFIX)) {
    return null;
  }
  const newline = value.indexOf("\n");
  if (newline < 0) return null;
  try {
    const parsed = JSON.parse(value.slice(newline + 1)) as Partial<StoredSnapshot>;
    if (parsed.version !== 1 || typeof parsed.topicId !== "string" || !Array.isArray(parsed.items)) return null;
    return parsed as StoredSnapshot;
  } catch {
    return null;
  }
}

function encodeSnapshot(
  topicId: string,
  questions: PracticeQuestion[],
  answers: Record<string, string>,
  hintLevels: Record<string, number>,
) {
  const complete = questions.length >= QUESTION_COUNT && questions.every((question) => baseAnswerHasContent(answers[question.id] ?? ""));
  const snapshot: StoredSnapshot = {
    version: 1,
    topicId,
    items: questions.map((question) => ({
      questionId: question.id,
      prompt: question.prompt,
      answer: answers[question.id] ?? "",
      hintLevel: Math.max(0, hintLevels[question.id] ?? 0),
    })),
  };
  return `${complete ? GUIDED_RETRIEVAL_COMPLETE_PREFIX : GUIDED_RETRIEVAL_PARTIAL_PREFIX}\n${JSON.stringify(snapshot)}`;
}

function firstUnansweredIndex(questions: PracticeQuestion[], answers: Record<string, string>) {
  const index = questions.findIndex((question) => !baseAnswerHasContent(answers[question.id] ?? ""));
  return index < 0 ? Math.max(0, questions.length - 1) : index;
}

export function GuidedRetrievalAnswerEditor({
  value,
  onChange,
  placeholder = "Vastaa muistista…",
  disabled = false,
  minHeight = 170,
  autoFocus = false,
  className = "",
}: EditorProps) {
  const activeSession = useActiveStudySession();
  const courses = useCourses();
  const topics = useTopics();
  const attempts = usePracticeAttempts();
  const questionBank = useQuestionBank();
  const rootRef = useRef<HTMLDivElement>(null);
  const initializedQuestionSet = useRef("");
  const seedAttempted = useRef(new Set<string>());
  const [domTopicId, setDomTopicId] = useState("");
  const [domProbeDone, setDomProbeDone] = useState(false);
  const [seedResolvedCourseId, setSeedResolvedCourseId] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hintLevels, setHintLevels] = useState<Record<string, number>>({});

  const activeTopicId = activeSession.data?.topic_id ?? "";

  useEffect(() => {
    if (activeTopicId) {
      setDomProbeDone(true);
      return;
    }
    if (topics.isLoading) return;
    const root = rootRef.current;
    const scope = root?.closest<HTMLElement>('[role="dialog"], [data-focus-workspace="study-session"]');
    const text = scope?.innerText ?? "";
    const candidate = [...(topics.data ?? [])]
      .filter((topic) => topic.name && text.includes(topic.name))
      .sort((a, b) => b.name.length - a.name.length)[0];
    setDomTopicId(candidate?.id ?? "");
    setDomProbeDone(true);
  }, [activeTopicId, topics.data, topics.isLoading]);

  const topicId = activeTopicId || domTopicId;
  const topic = (topics.data ?? []).find((candidate) => candidate.id === topicId) ?? null;
  const course = topic
    ? (courses.data ?? []).find((candidate) => candidate.id === topic.course_id) ?? null
    : activeSession.data
      ? (courses.data ?? []).find((candidate) => candidate.id === activeSession.data?.course_id) ?? null
      : null;

  const topicBank = useMemo(
    () => (questionBank.data ?? []).filter((item) =>
      item.topic_id === topic?.id && GUIDED_TYPES.includes(item.question_type as LearningAttemptType)
    ),
    [questionBank.data, topic?.id],
  );

  const needsKe04Seed = Boolean(
    course &&
    course.code.toUpperCase() === "KE04" &&
    topic &&
    topicBank.length < QUESTION_COUNT,
  );

  useEffect(() => {
    if (!needsKe04Seed || !course || questionBank.isLoading) return;
    if (seedAttempted.current.has(course.id)) return;
    seedAttempted.current.add(course.id);
    setSeedResolvedCourseId(null);
    void ensureKe04QuestionBankSeed(course.id)
      .then(async () => {
        await questionBank.refetch();
      })
      .catch(() => undefined)
      .finally(() => setSeedResolvedCourseId(course.id));
  }, [course, needsKe04Seed, questionBank.isLoading, questionBank.refetch]);

  const questions = useMemo(() => {
    if (!topic) return [];
    const rows: PracticeQuestion[] = [];
    const seen = new Set<string>();
    const add = (question: PracticeQuestion | undefined) => {
      if (!question || seen.has(question.id)) return;
      if (!GUIDED_TYPES.includes(question.type)) return;
      seen.add(question.id);
      rows.push(question);
    };

    if (topicBank.length) {
      for (let index = 0; index < 12 && rows.length < QUESTION_COUNT; index += 1) {
        const selection = selectPracticeQuestion({
          topics: [topic],
          attempts: attempts.data ?? [],
          selectedTopicId: topic.id,
          course,
          examStage: "retrieval",
          index,
          preferredTypes: GUIDED_TYPES,
          interleaveMode: "blocked",
          questionBank: topicBank,
        });
        if (selection?.question.source === "bank") add(selection.question);
      }
    }

    for (const type of GUIDED_TYPES) {
      if (rows.length >= QUESTION_COUNT) break;
      const selection = selectPracticeQuestion({
        topics: [topic],
        attempts: attempts.data ?? [],
        selectedTopicId: topic.id,
        course,
        examStage: "retrieval",
        index: rows.length,
        preferredTypes: [type],
        interleaveMode: "blocked",
        questionBank: [],
      });
      add(selection?.question);
    }

    return rows.slice(0, QUESTION_COUNT);
  }, [attempts.data, course, topic, topicBank]);

  const questionSetKey = topic
    ? `${topic.id}:${questions.map((question) => question.id).join("|")}`
    : "";

  useEffect(() => {
    if (!topic || questions.length < QUESTION_COUNT || !questionSetKey) return;
    if (initializedQuestionSet.current === questionSetKey) return;
    initializedQuestionSet.current = questionSetKey;

    const restoredAnswers: Record<string, string> = {};
    const restoredHints: Record<string, number> = {};
    const snapshot = decodeSnapshot(value);

    if (snapshot?.topicId === topic.id) {
      for (const question of questions) {
        const stored = snapshot.items.find((item) => item.questionId === question.id || item.prompt === question.prompt);
        if (!stored) continue;
        restoredAnswers[question.id] = stored.answer;
        restoredHints[question.id] = Math.max(0, stored.hintLevel || 0);
      }
    } else if (baseAnswerHasContent(value)) {
      // A session started before this upgrade may contain one legacy free-form
      // retrieval answer. Keep it instead of silently throwing the work away.
      restoredAnswers[questions[0]!.id] = value;
    }

    setAnswers(restoredAnswers);
    setHintLevels(restoredHints);
    setQuestionIndex(firstUnansweredIndex(questions, restoredAnswers));
  }, [questionSetKey, questions, topic, value]);

  const waitingForContext =
    activeSession.isLoading ||
    topics.isLoading ||
    courses.isLoading ||
    attempts.isLoading ||
    questionBank.isLoading ||
    (!topic && !domProbeDone);
  const waitingForKe04Seed = needsKe04Seed && seedResolvedCourseId !== course?.id;

  if (waitingForContext || waitingForKe04Seed) {
    return (
      <div ref={rootRef} className={`rounded-2xl border border-border bg-muted/40 p-4 ${className}`} aria-live="polite">
        <p className="text-sm font-medium">Haetaan tähän aiheeseen oikeita kysymyksiä…</p>
        <p className="mt-1 text-xs text-muted-foreground">Tehtävät valitaan kurssin LOPS21-tehtäväpankista.</p>
      </div>
    );
  }

  if (!topic || questions.length < QUESTION_COUNT) {
    return (
      <div ref={rootRef} className={className}>
        <BaseAbittiAnswerEditor
          value={value}
          onChange={onChange}
          label="Vastaus muistista"
          placeholder={placeholder}
          disabled={disabled}
          minHeight={minHeight}
          autoFocus={autoFocus}
        />
      </div>
    );
  }

  const currentQuestion = questions[Math.min(questionIndex, questions.length - 1)]!;
  const currentAnswer = answers[currentQuestion.id] ?? "";
  const currentHintLevel = hintLevels[currentQuestion.id] ?? 0;
  const answeredCount = questions.filter((question) => baseAnswerHasContent(answers[question.id] ?? "")).length;
  const allAnswered = answeredCount === questions.length;

  const emit = (nextAnswers: Record<string, string>, nextHints: Record<string, number>) => {
    onChange(encodeSnapshot(topic.id, questions, nextAnswers, nextHints));
  };

  const updateAnswer = (nextValue: string) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: nextValue };
    setAnswers(nextAnswers);
    emit(nextAnswers, hintLevels);
  };

  const showNextHint = () => {
    if (!baseAnswerHasContent(currentAnswer) || currentQuestion.hints.length === 0) return;
    const nextLevel = Math.min(currentQuestion.hints.length, currentHintLevel + 1);
    const nextHints = { ...hintLevels, [currentQuestion.id]: nextLevel };
    setHintLevels(nextHints);
    emit(answers, nextHints);
  };

  return (
    <div ref={rootRef} className={`space-y-4 ${className}`} data-guided-retrieval-questions="true">
      <div className="rounded-2xl border border-border bg-muted/35 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-primary">Kysymys {questionIndex + 1} / {questions.length}</span>
          <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-muted-foreground">
            {currentQuestion.source === "bank" ? "Tehtäväpankista" : "Aihekohtainen tehtävä"}
          </span>
        </div>
        <p className="mt-3 text-base font-semibold leading-relaxed">{currentQuestion.prompt}</p>
        <p className="mt-2 text-xs text-muted-foreground">{TYPE_LABEL[currentQuestion.type] ?? "Avoin tehtävä"}</p>
      </div>

      <BaseAbittiAnswerEditor
        key={currentQuestion.id}
        value={currentAnswer}
        onChange={updateAnswer}
        label={`Vastaus kysymykseen ${questionIndex + 1}`}
        placeholder={placeholder}
        disabled={disabled}
        minHeight={minHeight}
        autoFocus={autoFocus}
      />

      <div className="rounded-xl border border-border bg-surface p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">Vastaa ensin omin avuin. Vihje avautuu vasta oman yrityksen jälkeen.</p>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm disabled:opacity-50"
            disabled={disabled || !baseAnswerHasContent(currentAnswer) || currentQuestion.hints.length === 0 || currentHintLevel >= currentQuestion.hints.length}
            onClick={showNextHint}
          >
            <Lightbulb size={16} />
            {currentHintLevel > 0 ? "Seuraava vihje" : "Näytä vihje"}
          </button>
        </div>
        {currentHintLevel > 0 && (
          <div className="mt-3 rounded-lg bg-muted px-3 py-2 text-sm" role="status">
            <b>Vihje {currentHintLevel}:</b> {hintAt(currentQuestion, currentHintLevel)}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-medium text-muted-foreground">Vastattu {answeredCount} / {questions.length}{allAnswered ? " · kaikki valmiina" : ""}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-border bg-surface px-3 text-sm disabled:opacity-50"
            disabled={questionIndex === 0}
            onClick={() => setQuestionIndex((current) => Math.max(0, current - 1))}
          >
            <ChevronLeft size={16} />Edellinen
          </button>
          {questionIndex < questions.length - 1 && (
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-1 rounded-xl bg-primary px-3 text-sm text-primary-foreground disabled:opacity-50"
              disabled={!baseAnswerHasContent(currentAnswer)}
              onClick={() => setQuestionIndex((current) => Math.min(questions.length - 1, current + 1))}
            >
              Seuraava kysymys<ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
