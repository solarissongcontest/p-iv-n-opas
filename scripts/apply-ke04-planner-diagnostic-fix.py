from pathlib import Path
import re


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one match, found {count}")
    return text.replace(old, new, 1)


# --- Practice: topic-scoped diagnostic -------------------------------------
practice_path = Path("src/features/practice/PracticeView.tsx")
practice = practice_path.read_text()

practice = replace_once(
    practice,
    '  const [diagnosticMode, setDiagnosticMode] = useState(false);\n',
    '  const [diagnosticMode, setDiagnosticMode] = useState(false);\n  const [diagnosticTopicId, setDiagnosticTopicId] = useState<string | null>(null);\n',
    "diagnostic topic state",
)

practice = replace_once(
    practice,
    '''  const diagnosticLimit = Math.min(10, courseTopics.length);\n  const diagnosticDone = diagnosticMode && attemptIndex >= diagnosticLimit;\n  const effectiveTopicId = diagnosticMode\n    ? courseTopics[attemptIndex % Math.max(1, courseTopics.length)]?.id ?? topicId\n    : topicId;\n''',
    '''  // A topic diagnostic measures the topic the user explicitly selected.\n  // Never rotate through the course by attempt index: that made question 2 of\n  // a 1.1 diagnostic silently become a 1.2 question.\n  const diagnosticLimit = 5;\n  const diagnosticDone = diagnosticMode && attemptIndex >= diagnosticLimit;\n  const effectiveTopicId = diagnosticMode ? (diagnosticTopicId ?? topicId) : topicId;\n\n  useEffect(() => {\n    if (!diagnosticMode || !diagnosticTopicId) return;\n    if (courseTopics.some((candidate) => candidate.id === diagnosticTopicId)) return;\n    setDiagnosticMode(false);\n    setDiagnosticTopicId(null);\n    setAttemptIndex(0);\n  }, [courseTopics, diagnosticMode, diagnosticTopicId]);\n''',
    "diagnostic effective topic",
)

practice = replace_once(
    practice,
    '''  const confusionSet = useMemo(\n    () => selectedTopic\n      ? confusionSetsV5({\n          topics: courseTopics,\n          dependencies: dependencies.data ?? [],\n          attempts,\n        }).find((set) => set.topicIds.includes(selectedTopic.id) && set.priority >= .55) ?? null\n      : null,\n    [attempts, courseTopics, dependencies.data, selectedTopic],\n  );\n''',
    '''  const confusionSet = useMemo(\n    () => diagnosticMode\n      ? null\n      : selectedTopic\n        ? confusionSetsV5({\n            topics: courseTopics,\n            dependencies: dependencies.data ?? [],\n            attempts,\n          }).find((set) => set.topicIds.includes(selectedTopic.id) && set.priority >= .55) ?? null\n        : null,\n    [attempts, courseTopics, dependencies.data, diagnosticMode, selectedTopic],\n  );\n''',
    "diagnostic confusion isolation",
)

practice = replace_once(
    practice,
    '''  const interleaveMode =\n    confusionSet\n      ? "interleaved" as const\n      : diagnosticMode || interleavingVariant === null\n        ? "auto" as const\n        : interleavingVariant === "A"\n          ? "blocked" as const\n          : "interleaved" as const;\n''',
    '''  const interleaveMode =\n    diagnosticMode\n      ? "blocked" as const\n      : confusionSet\n        ? "interleaved" as const\n        : interleavingVariant === null\n          ? "auto" as const\n          : interleavingVariant === "A"\n            ? "blocked" as const\n            : "interleaved" as const;\n''',
    "diagnostic interleaving isolation",
)

practice = replace_once(
    practice,
    '''  const selectionTopics = confusionSet\n    ? courseTopics.filter((candidate)=>confusionSet.topicIds.includes(candidate.id))\n    : courseTopics;\n''',
    '''  const selectionTopics = diagnosticMode && effectiveTopicId\n    ? courseTopics.filter((candidate) => candidate.id === effectiveTopicId)\n    : confusionSet\n      ? courseTopics.filter((candidate)=>confusionSet.topicIds.includes(candidate.id))\n      : courseTopics;\n''',
    "diagnostic selection scope",
)

practice = replace_once(
    practice,
    '''                  onChange={(event) => {\n                    setCourseId(event.target.value);\n                    setTopicId("");\n                    setAttemptIndex(0);\n                  }}\n''',
    '''                  onChange={(event) => {\n                    setCourseId(event.target.value);\n                    setTopicId("");\n                    setDiagnosticMode(false);\n                    setDiagnosticTopicId(null);\n                    setAttemptIndex(0);\n                  }}\n''',
    "course change diagnostic reset",
)

practice = replace_once(
    practice,
    '''                  onChange={(event) => {\n                    setTopicId(event.target.value);\n                    setAttemptIndex(0);\n                  }}\n''',
    '''                  onChange={(event) => {\n                    const nextTopicId = event.target.value;\n                    setTopicId(nextTopicId);\n                    if (diagnosticMode) setDiagnosticTopicId(nextTopicId);\n                    setAttemptIndex(0);\n                  }}\n''',
    "topic change diagnostic reset",
)

practice = replace_once(
    practice,
    '''                onClick={() => { setDiagnosticMode((value) => !value); setAttemptIndex(0); }}\n              >\n                {diagnosticMode ? "Lopeta lähtötason kartoitus" : "Kartoita lähtötaso"}\n''',
    '''                onClick={() => {\n                  if (diagnosticMode) {\n                    setDiagnosticMode(false);\n                    setDiagnosticTopicId(null);\n                  } else {\n                    setDiagnosticTopicId(topicId || courseTopics[0]?.id || null);\n                    setDiagnosticMode(true);\n                  }\n                  setAttemptIndex(0);\n                }}\n              >\n                {diagnosticMode ? "Lopeta lähtötason kartoitus" : "Kartoita tämän kappaleen lähtötaso"}\n''',
    "diagnostic toggle",
)

summary_pattern = re.compile(
    r'''            <p className="mt-2 text-sm text-muted-foreground">\n              \{diagnosticLimit\} eri aiheen muistista palauttamisen näyttö on tallennettu\. Tulokset eivät yksin ratkaise osaamistasoa, vaan parantavat suositusten luotettavuutta\.\n            </p>\n            <div className="mt-3 space-y-2">\n              \{courseTopics\.slice\(0, diagnosticLimit\)\.map\(\(candidate\) => \{.*?              \}\)\}\n            </div>\n''',
    re.S,
)
summary_replacement = '''            <p className="mt-2 text-sm text-muted-foreground">\n              {diagnosticLimit} kysymyksen näyttö aiheesta {selectedTopic?.name ?? "valittu aihe"} on tallennettu. Kartoitus vaikuttaa vain tämän aiheen suosituksiin ja osaamisnäyttöön.\n            </p>\n            {selectedTopic && (() => {\n              const model = masteryModelV4(selectedTopic, attempts, { examDate: course?.exam_date ?? null });\n              const missingPrerequisite = (selectedTopic.dependencies ?? []).some((id) => {\n                const dependency = courseTopics.find((topic) => topic.id === id);\n                return dependency ? masteryModelV4(dependency, attempts, { examDate: course?.exam_date ?? null }).level <= 1 : false;\n              });\n              const classification = missingPrerequisite\n                ? "missing_prerequisite"\n                : model.evidenceCount === 0\n                  ? "new_material"\n                  : model.level >= 4\n                    ? "already_mastered"\n                    : "needs_review";\n              return <div className="mt-3 flex items-center justify-between rounded-xl bg-surface/70 p-3 text-sm"><span>{selectedTopic.name}</span><span className="text-xs font-medium text-muted-foreground">{diagnosticLabel[classification] ?? "Tarvitsee harjoittelua"}</span></div>;\n            })()}\n'''
practice, summary_count = summary_pattern.subn(summary_replacement, practice, count=1)
if summary_count != 1:
    raise SystemExit(f"diagnostic summary: expected exactly one match, found {summary_count}")

practice = replace_once(
    practice,
    '            <button className={secondary+" mt-4"} onClick={() => { setDiagnosticMode(false); setAttemptIndex(0); }}>Palaa normaaliin harjoitteluun</button>\n',
    '            <button className={secondary+" mt-4"} onClick={() => { setDiagnosticMode(false); setDiagnosticTopicId(null); setAttemptIndex(0); }}>Palaa normaaliin harjoitteluun</button>\n',
    "diagnostic summary exit",
)

practice_path.write_text(practice)


# --- Planner: future-state simulation + coverage guarantee ------------------
domain_path = Path("src/lib/domain.ts")
domain = domain_path.read_text()
start_marker = "export function generatePlan(opts: {"
end_marker = "/** ---------- decision support / balancing ---------- */"
start = domain.find(start_marker)
end = domain.find(end_marker, start)
if start < 0 or end < 0:
    raise SystemExit("generatePlan markers not found")

new_generate_plan = r'''export function generatePlan(opts: {
  course: Course;
  topics: Topic[];
  examDate: string;
  studyWeekdays: number[]; // 1 = Monday ... 7 = Sunday
  weeklyMinutes: number;
  fromISO?: string;
  mistakes?: Mistake[];
  tests?: PracticeTest[];
  capacity?: CapacityProfile;
}): PlanDraft[] {
  const startISO =
    opts.fromISO ??
    (opts.course.start_date && opts.course.start_date > today() ? opts.course.start_date : today());
  const totalDays = diffDays(opts.examDate, startISO);
  if (totalDays <= 0) return [];

  const dates: string[] = [];
  for (let i = 0; i < totalDays; i += 1) {
    const iso = addDays(startISO, i);
    const weekday = ((parseISO(iso).getDay() + 6) % 7) + 1;
    if (!opts.studyWeekdays.includes(weekday)) continue;
    if (opts.capacity && capacityForDate(opts.capacity, iso) <= 0) continue;
    dates.push(iso);
  }
  if (dates.length === 0) return [];

  const perDay = Math.max(
    20,
    Math.round(opts.weeklyMinutes / Math.max(1, opts.studyWeekdays.length)),
  );
  const ordered = [...opts.topics].sort((a, b) => a.position - b.position);
  if (ordered.length === 0) return [];

  const activeMistakeTopics = new Set(
    (opts.mistakes ?? [])
      .filter((mistake) => mistake.status !== "mastered" && mistake.topic_id)
      .map((mistake) => mistake.topic_id!),
  );
  const ownAheadOfSchool = weightedCoverage(opts.topics) - schoolCoverage(opts.topics) >= 15;
  const averageWeight =
    ordered.reduce((sum, topic) => sum + Math.max(1, Number(topic.weight || 1)), 0) /
    Math.max(1, ordered.length);

  type SimulatedTopic = {
    progress: number;
    nextReview: string | null;
    plannedContent: number;
    plannedReviews: number;
    plannedApplications: number;
    lastPlanned: string | null;
  };

  const simulated = new Map<string, SimulatedTopic>(
    ordered.map((topic) => [
      topic.id,
      {
        progress: Math.max(0, Math.min(100, Number(topic.progress || 0))),
        nextReview: topic.next_review,
        plannedContent: 0,
        plannedReviews: 0,
        plannedApplications: 0,
        lastPlanned: null,
      },
    ]),
  );

  // Weight controls how many first-pass content sessions a large topic gets.
  // Every unfinished topic still gets at least one session, so small chapters
  // cannot disappear just because a high-weight chapter exists.
  const contentTargets = new Map<string, number>(
    ordered.map((topic) => {
      const remainingShare = Math.max(0, 100 - Number(topic.progress || 0)) / 100;
      if (remainingShare <= 0) return [topic.id, 0];
      const weightUnits = Math.max(
        1,
        Math.round(Math.max(1, Number(topic.weight || 1)) / Math.max(1, averageWeight)),
      );
      return [topic.id, Math.max(1, Math.ceil(weightUnits * remainingShare))];
    }),
  );

  const stateFor = (topic: Topic) => simulated.get(topic.id)!;
  const targetFor = (topic: Topic) => contentTargets.get(topic.id) ?? 0;
  const dependenciesMet = (topic: Topic) =>
    (topic.dependencies ?? []).every((id) => (simulated.get(id)?.progress ?? 0) >= 60);

  const remainingContentUnits = () =>
    ordered.reduce(
      (sum, topic) => sum + Math.max(0, targetFor(topic) - stateFor(topic).plannedContent),
      0,
    );

  const remainingFirstPassTopics = () =>
    ordered.filter(
      (topic) =>
        targetFor(topic) > 0 &&
        stateFor(topic).plannedContent === 0 &&
        Number(topic.progress || 0) <= 0,
    );

  const chooseContent = () => {
    const candidates = ordered.filter(
      (topic) =>
        stateFor(topic).plannedContent < targetFor(topic) &&
        dependenciesMet(topic),
    );
    if (!candidates.length) return undefined;

    // First cover untouched material in textbook order. Only after every
    // untouched topic has had a first encounter do heavy chapters receive
    // their additional weighted sessions.
    const untouched = candidates.filter(
      (topic) => Number(topic.progress || 0) <= 0 && stateFor(topic).plannedContent === 0,
    );
    const pool = untouched.length ? untouched : candidates;
    return [...pool].sort((a, b) => {
      if (untouched.length) return a.position - b.position;
      const aTarget = Math.max(1, targetFor(a));
      const bTarget = Math.max(1, targetFor(b));
      const aShare = stateFor(a).plannedContent / aTarget;
      const bShare = stateFor(b).plannedContent / bTarget;
      return aShare - bShare || a.position - b.position;
    })[0];
  };

  let lastTopicId: string | null = null;

  const dueTopics = (date: string) =>
    ordered
      .filter((topic) => {
        const nextReview = stateFor(topic).nextReview;
        return Boolean(nextReview && nextReview <= date);
      })
      .sort((a, b) => {
        const score = (topic: Topic) => {
          const state = stateFor(topic);
          const overdueDays = state.nextReview ? Math.max(0, diffDays(date, state.nextReview)) : 0;
          return (
            overdueDays * 3 +
            Number(topic.importance || 3) * 3 +
            (activeMistakeTopics.has(topic.id) ? 12 : 0) +
            Math.max(0, 4 - Number(topic.verified_level || 0)) * 2 -
            state.plannedReviews * 3 -
            (lastTopicId === topic.id ? 16 : 0)
          );
        };
        return score(b) - score(a) || a.position - b.position;
      });

  const chooseGeneralPriority = (date: string) =>
    [...ordered].sort((a, b) => {
      const score = (topic: Topic) => {
        const state = stateFor(topic);
        const dueBoost = state.nextReview && state.nextReview <= date ? 7 : 0;
        return (
          Number(topic.importance || 3) * 4 +
          Math.max(1, Number(topic.weight || 1)) / Math.max(1, averageWeight) * 3 +
          Math.max(0, 5 - Number(topic.verified_level || 0)) * 2 +
          Math.max(0, 100 - state.progress) / 25 +
          dueBoost +
          (activeMistakeTopics.has(topic.id) ? 10 : 0) -
          state.plannedApplications * 5 -
          state.plannedReviews * 2 -
          (lastTopicId === topic.id ? 18 : 0)
        );
      };
      return score(b) - score(a) || a.position - b.position;
    })[0];

  const markContent = (topic: Topic, date: string) => {
    const state = stateFor(topic);
    state.plannedContent += 1;
    const target = Math.max(1, targetFor(topic));
    const startProgress = Math.max(0, Math.min(100, Number(topic.progress || 0)));
    state.progress = Math.min(
      100,
      Math.max(
        state.progress,
        startProgress + Math.ceil((100 - startProgress) * (state.plannedContent / target)),
      ),
    );
    state.lastPlanned = date;
    state.nextReview = addDays(date, Number(topic.verified_level || 0) >= 3 ? 3 : 2);
    lastTopicId = topic.id;
  };

  const markReview = (topic: Topic, date: string) => {
    const state = stateFor(topic);
    state.plannedReviews += 1;
    const mastery = Math.max(0, Math.min(5, Number(topic.verified_level || 0)));
    const baseGap = [3, 3, 4, 5, 7, 10][mastery] ?? 3;
    const growth = [0, 2, 4, 7, 10][Math.min(4, state.plannedReviews - 1)] ?? 10;
    let gap = baseGap + growth;
    if (activeMistakeTopics.has(topic.id)) gap = Math.min(gap, 3);
    const daysToExam = diffDays(opts.examDate, date);
    if (daysToExam <= 14) gap = Math.min(gap, 4);
    state.nextReview = addDays(date, Math.max(2, gap));
    state.lastPlanned = date;
    lastTopicId = topic.id;
  };

  const markApplication = (topic: Topic, date: string) => {
    const state = stateFor(topic);
    state.plannedApplications += 1;
    state.lastPlanned = date;
    // A scheduled application/test is also a future exposure. If the current
    // DB next_review is already due, advance the simulated date so it cannot
    // monopolise every later planner slot.
    if (state.nextReview && state.nextReview <= date) {
      state.nextReview = addDays(date, 3);
    }
    lastTopicId = topic.id;
  };

  const drafts: PlanDraft[] = [];
  const pushDraft = (
    date: string,
    phase: PlanPhase,
    kind: string,
    title: string,
    topic: Topic | undefined,
    light = false,
  ) => {
    const dailyCapacity = opts.capacity ? capacityForDate(opts.capacity, date) : perDay;
    const targetMinutes = light
      ? Math.min(20, dailyCapacity)
      : Math.max(15, Math.min(perDay, dailyCapacity));
    drafts.push({
      course_id: opts.course.id,
      topic_id: topic?.id ?? null,
      date,
      phase,
      kind,
      title,
      min_minutes: Math.min(
        targetMinutes,
        light ? 10 : Math.max(10, Math.round(targetMinutes * 0.55)),
      ),
      target_minutes: targetMinutes,
      extra_minutes: light
        ? 0
        : Math.max(0, Math.min(Math.round(targetMinutes * 0.35), dailyCapacity - targetMinutes)),
      start_time: null,
    });
  };

  let examModeIndex = 0;

  dates.forEach((date, i) => {
    const daysToExam = diffDays(opts.examDate, date);
    const inExamMode = daysToExam <= 14;
    const finalStretch = daysToExam <= 2;
    const due = dueTopics(date);

    if (finalStretch) {
      const topic = due[0] ?? chooseGeneralPriority(date);
      if (topic) markReview(topic, date);
      pushDraft(
        date,
        "light",
        "review",
        topic ? `${topic.name} – kevyt palautus` : "Kevyt palautus: virhelista, käsitteet ja kaavat",
        topic,
        true,
      );
      return;
    }

    if (!inExamMode) {
      const preExamSlotsLeft = dates
        .slice(i)
        .filter((candidate) => diffDays(opts.examDate, candidate) > 14).length;
      const contentLeft = remainingContentUnits();
      const contentTopic = chooseContent();
      // Keep a small reserve for reviews/applications, but never let those
      // consume the slots required to cover unfinished content before exam mode.
      const mustProtectCoverage =
        Boolean(contentTopic) && contentLeft >= Math.max(1, preExamSlotsLeft - 4);
      const reviewSlot =
        due.length > 0 && (i === 0 || i % 4 === 3 || (ownAheadOfSchool && i % 3 === 2));

      if (contentTopic && (mustProtectCoverage || !reviewSlot)) {
        markContent(contentTopic, date);
        pushDraft(date, "content", "study", contentTopic.name, contentTopic);
        return;
      }

      if (due.length) {
        const topic = due[0]!;
        markReview(topic, date);
        pushDraft(date, "review", "review", `${topic.name} – ajastettu kertaus`, topic);
        return;
      }

      if (contentTopic) {
        markContent(contentTopic, date);
        pushDraft(date, "content", "study", contentTopic.name, contentTopic);
        return;
      }

      const topic = chooseGeneralPriority(date);
      if (topic) markApplication(topic, date);
      pushDraft(
        date,
        "application",
        "study",
        topic ? `${topic.name} – soveltavat tehtävät` : "Soveltavat tehtävät",
        topic,
      );
      return;
    }

    // If earlier interruptions left genuinely untouched content, exam mode may
    // still finish the first pass. It does not blindly switch to simulations
    // while chapters have never been studied.
    const firstPassLeft = remainingFirstPassTopics();
    const studySlotsLeft = dates.slice(i).filter((candidate) => diffDays(opts.examDate, candidate) > 2).length;
    if (firstPassLeft.length && studySlotsLeft <= firstPassLeft.length + 4) {
      const topic = chooseContent();
      if (topic) {
        markContent(topic, date);
        pushDraft(date, "content", "study", topic.name, topic);
        examModeIndex += 1;
        return;
      }
    }

    const cycle = examModeIndex % 6;
    examModeIndex += 1;
    if (cycle === 0) {
      const topic = due[0] ?? chooseGeneralPriority(date);
      if (topic) markReview(topic, date);
      pushDraft(
        date,
        "review",
        "review",
        topic ? `${topic.name} – muistista palautus ilman materiaalia` : "Palauta koealue muistista",
        topic,
      );
    } else if (cycle === 1) {
      const topic = chooseGeneralPriority(date);
      if (topic) markApplication(topic, date);
      pushDraft(
        date,
        "application",
        "study",
        topic ? `${topic.name} – vaihtelevat tehtävät` : "Vaihtelevat tehtävät: valitse oikea menetelmä",
        topic,
      );
    } else if (cycle === 2) {
      const topic = chooseGeneralPriority(date);
      if (topic) markApplication(topic, date);
      pushDraft(
        date,
        "application",
        "study",
        topic ? `${topic.name} – soveltava tehtävä` : "Sovella osaamista uuteen tilanteeseen",
        topic,
      );
    } else if (cycle === 3) {
      const topic = chooseGeneralPriority(date);
      if (topic) markApplication(topic, date);
      pushDraft(date, "practice", "test", "Koesimulaatio", topic);
    } else if (cycle === 4) {
      const topic = due[0] ?? chooseGeneralPriority(date);
      if (topic) markReview(topic, date);
      pushDraft(
        date,
        "review",
        "review",
        topic ? `${topic.name} – korjaa virheet` : "Korjaa harjoituskokeen virheet",
        topic,
      );
    } else {
      const topic = due[0] ?? chooseGeneralPriority(date);
      if (topic) markReview(topic, date);
      pushDraft(
        date,
        "light",
        "review",
        topic ? `${topic.name} – kevyt varmistus` : "Kevyt varmistus ja palautuminen",
        topic,
      );
    }
  });

  drafts.push({
    course_id: opts.course.id,
    topic_id: null,
    date: opts.examDate,
    phase: "exam",
    kind: "exam",
    title: `${opts.course.code} koe`,
    min_minutes: 0,
    target_minutes: 0,
    extra_minutes: 0,
    start_time: null,
  });

  return drafts;
}

'''

domain = domain[:start] + new_generate_plan + domain[end:]
domain_path.write_text(domain)


# --- Plan persistence: preserve completed/in-progress dates -----------------
data_path = Path("src/lib/data.ts")
data = data_path.read_text()
data_start = data.find("export function useGeneratePlan() {")
data_end = data.find("export function useUpsertPlanItem()", data_start)
if data_start < 0 or data_end < 0:
    raise SystemExit("useGeneratePlan markers not found")

new_use_generate = r'''export function useGeneratePlan() {
  const invalidate = useInvalidateAll();
  return useMutation({
    mutationFn: async (input: { courseId: string; drafts: PlanDraft[]; capacity?: CapacityProfile }) => {
      const [{ data: existing, error: readError }, { data: otherPlan, error: otherError }] = await Promise.all([
        supabase.from("plan_items").select("id,status,date,kind").eq("course_id", input.courseId),
        supabase.from("plan_items").select("*").neq("course_id", input.courseId).eq("status", "planned"),
      ]);
      if (readError) throw readError;
      if (otherError) throw otherError;

      const current = existing ?? [];
      const replaceableIds = current.filter((item) => item.status === "planned").map((item) => item.id);
      const protectedStudyDates = new Set(
        current
          .filter((item) => ["completed", "in_progress"].includes(item.status) && item.kind !== "exam")
          .map((item) => item.date),
      );
      const protectedExamDates = new Set(
        current
          .filter((item) => item.kind === "exam" && item.status !== "planned")
          .map((item) => item.date),
      );

      // Re-planning is allowed to replace future planned rows, never completed
      // history. If today already has a completed/in-progress session, don't
      // generate a second phantom task for the same course/date.
      const safeDrafts = input.drafts.filter((draft) =>
        draft.kind === "exam"
          ? !protectedExamDates.has(draft.date)
          : !protectedStudyDates.has(draft.date),
      );
      const balancedDrafts = balanceDraftsAgainstPlan(safeDrafts, otherPlan ?? [], 120, input.capacity);

      let created: Array<{ id: string }> = [];
      if (balancedDrafts.length) {
        const { data: inserted, error } = await supabase.from("plan_items").insert(balancedDrafts).select("id");
        if (error) throw error;
        created = inserted ?? [];
      }

      if (replaceableIds.length) {
        const { error: deleteError } = await supabase.from("plan_items").delete().in("id", replaceableIds);
        if (deleteError) {
          if (created.length) await supabase.from("plan_items").delete().in("id", created.map((item) => item.id));
          throw deleteError;
        }
      }
    },
    onSuccess: invalidate,
  });
}

'''

data = data[:data_start] + new_use_generate + data[data_end:]
data_path.write_text(data)


# --- Regression tests -------------------------------------------------------
test_path = Path("tests/ke04-planner-diagnostic-regression.test.ts")
test_path.write_text(r'''import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type { Course, Topic } from "../src/lib/domain.ts";
import { generatePlan } from "../src/lib/domain.ts";

const COURSE_ID = "11111111-1111-4111-8111-111111111111";
const WEIGHTS = [8, 18, 9, 8, 17, 5, 10, 10, 5, 3, 2, 2, 1, 2];
const NAMES = [
  "1.1 Reaktioyhtälön kirjoittaminen ja tasapainottaminen",
  "1.2 Tasapainotetun reaktioyhtälön käyttö ja reaktion saanto",
  "1.3 Reaktion rajoittava tekijä",
  "1.4 Kaasureaktioiden stoikiometria – ideaalikaasun tilanyhtälö",
  "2.1 Reaktiotyypit",
  "3.1 Substituutioreaktio",
  "3.2 Additio- ja eliminaatioreaktio",
  "3.3 Kondensaatio- ja hydrolyysireaktio",
  "4.1 Polymeerit ja polymeroitumisreaktiot",
  "4.2 Muovit ja tekokuidut ovat polymeerien ja lisäaineiden seoksia",
  "5.1 Hiilihydraatit",
  "5.2 Aminohapot ja proteiinit",
  "5.3 Nukleiinihapot",
  "5.4 Lipidit",
];

function topic(index: number): Topic {
  return {
    id: `22222222-2222-4222-8222-${String(index + 1).padStart(12, "0")}`,
    course_id: COURSE_ID,
    name: NAMES[index],
    position: index + 1,
    weight: WEIGHTS[index],
    importance: index < 5 ? 5 : 3,
    progress: index === 0 ? 17 : 0,
    verified_level: 0,
    self_level: 0,
    next_review: index === 0 ? "2026-10-07" : null,
    last_review: index === 0 ? "2026-10-06" : null,
    school_covered: false,
    dependencies: [],
    basic_successes: 0,
    exam_successes: 0,
    delayed_successes: 0,
    retrieval_attempts: index === 0 ? 3 : 0,
    retrieval_failures: 0,
    mastery_uncertainty: 1,
    last_retrieval_at: index === 0 ? "2026-10-06" : null,
    last_retrieval_result: index === 0 ? "independent" : null,
    last_retrieval_confidence: null,
    last_retrieval_difficulty: null,
  } as unknown as Topic;
}

function course(): Course {
  return {
    id: COURSE_ID,
    code: "KE04",
    name: "Kemialliset reaktiot",
    subject: "Kemia",
    start_date: "2026-10-05",
    exam_date: "2026-11-23",
    weekly_minutes: 195,
  } as unknown as Course;
}

test("KE04 planner advances a due topic instead of repeating 1.1 every day", () => {
  const topics = NAMES.map((_, index) => topic(index));
  const plan = generatePlan({
    course: course(),
    topics,
    examDate: "2026-11-23",
    studyWeekdays: [2, 4, 5, 6, 7],
    weeklyMinutes: 195,
    fromISO: "2026-10-07",
  });
  const study = plan.filter((item) => item.kind !== "exam");
  assert.ok(study.length > 20);

  const oneOne = topics[0]!.id;
  const firstTwo = study.slice(0, 2);
  assert.equal(firstTwo[0]?.topic_id, oneOne, "the already-due 1.1 may be reviewed first");
  assert.notEqual(firstTwo[1]?.topic_id, oneOne, "1.1 must not remain due forever after its planned review");

  const oneOneCount = study.filter((item) => item.topic_id === oneOne).length;
  assert.ok(oneOneCount < study.length / 2, "one due topic must not monopolise the plan");
});

test("KE04 planner covers every textbook subchapter and gives heavy topics more content", () => {
  const topics = NAMES.map((_, index) => topic(index));
  const plan = generatePlan({
    course: course(),
    topics,
    examDate: "2026-11-23",
    studyWeekdays: [2, 4, 5, 6, 7],
    weeklyMinutes: 195,
    fromISO: "2026-10-07",
  });

  const beforeExamMode = plan.filter(
    (item) => item.kind !== "exam" && item.date <= "2026-11-08",
  );
  const covered = new Set(beforeExamMode.filter((item) => item.phase === "content").map((item) => item.topic_id));
  for (const candidate of topics.slice(1)) {
    assert.ok(covered.has(candidate.id), `${candidate.name} should receive a first-pass content session`);
  }

  const content = plan.filter((item) => item.phase === "content");
  const chapter12 = content.filter((item) => item.topic_id === topics[1]!.id).length;
  const chapter53 = content.filter((item) => item.topic_id === topics[12]!.id).length;
  assert.ok(chapter12 > chapter53, "18-point chapter 1.2 should receive more content sessions than 1-point chapter 5.3");
});

test("topic diagnostic is locked to the selected topic and disables interleaving", () => {
  const source = readFileSync(new URL("../src/features/practice/PracticeView.tsx", import.meta.url), "utf8");
  assert.match(source, /diagnosticTopicId/);
  assert.match(source, /effectiveTopicId = diagnosticMode \? \(diagnosticTopicId \?\? topicId\) : topicId/);
  assert.match(source, /diagnosticMode\s*\? "blocked" as const/);
  assert.match(source, /diagnosticMode && effectiveTopicId[\s\S]*candidate\.id === effectiveTopicId/);
  assert.doesNotMatch(source, /courseTopics\[attemptIndex % Math\.max\(1, courseTopics\.length\)\]/);
});
''')

print("KE04 planner + diagnostic patch applied")
