from pathlib import Path


def replace_once(path: str, old: str, new: str):
    p = Path(path)
    text = p.read_text()
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected exactly one replacement, found {count}: {old[:90]!r}")
    p.write_text(text.replace(old, new, 1))


# Data layer: multi-topic logging, full bank load, exam-bound simulations.
path = "src/lib/data.ts"
replace_once(
    path,
    'export type ExamSimulationRow = {\n  id: string;\n  owner_id: string;\n  course_id: string;\n  mode:',
    'export type ExamSimulationRow = {\n  id: string;\n  owner_id: string;\n  course_id: string;\n  exam_id: string | null;\n  mode:',
)
replace_once(
    path,
    '.order("difficulty")\n    .order("created_at", { ascending: false })\n    .limit(2000);',
    '.order("difficulty")\n    .order("created_at", { ascending: false })\n    .limit(5000);',
)
replace_once(
    path,
    'export type LogSessionInput = {\n  course_id: string;\n  topic_id: string | null;\n  minutes:',
    'export type LogSessionInput = {\n  course_id: string;\n  topic_id: string | null;\n  topic_ids?: string[];\n  minutes:',
)

old = '''  const common = {
    p_request_id: operationId,
    p_course_id: input.course_id,
    p_topic_id: input.topic_id,
    p_date: date,
    p_minutes: input.minutes,
    p_planned_minutes: input.planned_minutes ?? null,
    p_kind: input.kind,
    p_competence: input.competence ?? null,
    p_unclear: input.unclear ?? null,
    p_did: input.did ?? null,
    p_focus: input.focus ?? null,
    p_method: input.method ?? null,
    p_energy: input.energy ?? null,
    p_tasks: input.tasks ?? null,
    p_note: input.note ?? null,
    p_plan_item_id: input.plan_item_id ?? null,
  };

  const result = input.retrieval_result
    ? await untypedSupabase.rpc("log_guided_study_session", {
        ...common,
        p_objective: input.objective ?? null,
        p_recall: input.recall ?? null,
        p_retrieval_check: input.retrieval_check ?? null,
        p_retrieval_result: input.retrieval_result,
        p_retrieval_confidence: input.retrieval_confidence ?? null,
        p_outcome: input.outcome ?? null,
      })
    : await untypedSupabase.rpc("log_study_session", common);'''
new = '''  const baseCommon = {
    p_request_id: operationId,
    p_course_id: input.course_id,
    p_date: date,
    p_minutes: input.minutes,
    p_planned_minutes: input.planned_minutes ?? null,
    p_kind: input.kind,
    p_competence: input.competence ?? null,
    p_unclear: input.unclear ?? null,
    p_did: input.did ?? null,
    p_focus: input.focus ?? null,
    p_method: input.method ?? null,
    p_energy: input.energy ?? null,
    p_tasks: input.tasks ?? null,
    p_note: input.note ?? null,
    p_plan_item_id: input.plan_item_id ?? null,
  };
  const singleTopicCommon = { ...baseCommon, p_topic_id: input.topic_id };
  const multiTopicIds = [...new Set(input.topic_ids ?? [])].filter(Boolean);

  const result = input.retrieval_result
    ? await untypedSupabase.rpc("log_guided_study_session", {
        ...singleTopicCommon,
        p_objective: input.objective ?? null,
        p_recall: input.recall ?? null,
        p_retrieval_check: input.retrieval_check ?? null,
        p_retrieval_result: input.retrieval_result,
        p_retrieval_confidence: input.retrieval_confidence ?? null,
        p_outcome: input.outcome ?? null,
      })
    : multiTopicIds.length > 1
      ? await untypedSupabase.rpc("log_multi_topic_study_session", {
          ...baseCommon,
          p_topic_ids: multiTopicIds,
        })
      : await untypedSupabase.rpc("log_study_session", singleTopicCommon);'''
replace_once(path, old, new)

replace_once(
    path,
    'mutationFn: async (input: {\n      course_id: string;\n      mode: "practice" | "full";',
    'mutationFn: async (input: {\n      course_id: string;\n      exam_id?: string | null;\n      mode: "practice" | "full";',
)
replace_once(
    path,
    'owner_id: requireDeviceOwnerId(),\n        course_id: input.course_id,\n        mode: input.mode,',
    'owner_id: requireDeviceOwnerId(),\n        course_id: input.course_id,\n        exam_id: input.exam_id ?? null,\n        mode: input.mode,',
)

# Quick logging UI: multiple topics in one session.
path = "src/features/session/SessionForm.tsx"
replace_once(
    path,
    '  const [courseId, setCourseId] = useState(initialCourse);\n  const [topicId, setTopicId] = useState(initialTopic);',
    '  const [courseId, setCourseId] = useState(initialCourse);\n  const [topicId, setTopicId] = useState(initialTopic);\n  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>(initialTopic ? [initialTopic] : []);',
)
replace_once(
    path,
    '        course_id: selectedCourseId,\n        topic_id: resolvedTopicId(selectedCourseId),\n        minutes: Math.max(1, actualMinutes),',
    '        course_id: selectedCourseId,\n        topic_id: selectedTopicIds[0] ?? null,\n        topic_ids: selectedTopicIds,\n        minutes: Math.max(1, actualMinutes),',
)
replace_once(
    path,
    '<select className={input} value={courseId} onChange={(e) => { setCourseId(e.target.value); setTopicId(""); }}>',
    '<select className={input} value={courseId} onChange={(e) => { setCourseId(e.target.value); setTopicId(""); setSelectedTopicIds([]); }}>',
)
old = '''        <label className="text-sm font-medium">Aihe
          <select className={input} value={topicId} onChange={(e) => setTopicId(e.target.value)}>
            <option value="">Yleinen opiskelu</option>
            {topics.filter((candidate) => candidate.course_id === courseId).map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}
          </select>
        </label>'''
new = '''        <fieldset className="text-sm font-medium sm:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <legend>Kappaleet <span className="font-normal text-muted-foreground">({selectedTopicIds.length} valittu)</span></legend>
            {selectedTopicIds.length > 0 && <button type="button" className="text-xs font-normal text-primary" onClick={() => setSelectedTopicIds([])}>Tyhjennä</button>}
          </div>
          <div className="mt-1 max-h-64 space-y-1 overflow-y-auto rounded-xl border border-border bg-surface p-2">
            {topics.filter((candidate) => candidate.course_id === courseId).map((candidate) => {
              const checked = selectedTopicIds.includes(candidate.id);
              return <label key={candidate.id} className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 ${checked ? "bg-accent" : "hover:bg-muted/50"}`}>
                <input type="checkbox" checked={checked} onChange={() => setSelectedTopicIds((current) => checked ? current.filter((id) => id !== candidate.id) : [...current, candidate.id])} className="size-4"/>
                <span>{candidate.name}</span>
              </label>;
            })}
            {!topics.some((candidate) => candidate.course_id === courseId) && <p className="px-2 py-3 font-normal text-muted-foreground">Kurssilla ei ole vielä kappaleita.</p>}
          </div>
          <p className="mt-1 text-xs font-normal text-muted-foreground">Voit valita useita kappaleita. Opiskeluaika kirjataan vain kerran ja jaetaan valittujen kappaleiden kesken.</p>
        </fieldset>'''
replace_once(path, old, new)

# Exam Mode: never resume a draft from another exam.
path = "src/components/ExamSimulationV5.tsx"
replace_once(
    path,
    '  const resumable=useMemo(()=>(simulations.data??[]).find(row=>\n    row.course_id===courseId&&row.mode===mode&&!row.completed_at\n  )??null,[simulations.data,courseId,mode]);',
    '  const resumable=useMemo(()=>(simulations.data??[]).find(row=>\n    row.course_id===courseId&&row.exam_id===(nextExam?.id??null)&&row.mode===mode&&!row.completed_at\n  )??null,[simulations.data,courseId,nextExam?.id,mode]);',
)
replace_once(
    path,
    '        course_id:course.id,\n        mode,',
    '        course_id:course.id,\n        exam_id:nextExam?.id??null,\n        mode,',
)

# BI05 source truth corrections. Iiris 5 has research-task sections in chapters
# 4, 5, 6, 7, 9, 10 and 11, which span 30 subchapters.
path = "supabase/migrations/20261007190400_bi05_question_bank_v2.sql"
p = Path(path)
text = p.read_text()
old_research = "array[5,6,7,8,9,11]"
if text.count(old_research) != 3:
    raise SystemExit(f"BI05 V2: expected three old research chapter lists, got {text.count(old_research)}")
text = text.replace(old_research, "array[4,5,6,7,9,10,11]")
text = text.replace("research_count<>27", "research_count<>30")
p.write_text(text)

path = "tests/bi05-question-bank-v2.test.ts"
p = Path(path)
text = p.read_text()
text = text.replace(r"array\[5,6,7,8,9,11\]", r"array\[4,5,6,7,9,10,11\]")
text = text.replace("research_count<>27", "research_count<>30")
p.write_text(text)

# Fresh installs must respect topics.exam_relevance CHECK 0..1.
path = "supabase/migrations/20261007184500_bi05_iiris5_multi_exam.sql"
p = Path(path)
text = p.read_text()
old_relevance = "case when b.exam_eligible then greatest(1, b.importance) else 0 end"
if text.count(old_relevance) != 2:
    raise SystemExit(f"BI05 course migration: expected 2 exam_relevance expressions, got {text.count(old_relevance)}")
p.write_text(text.replace(old_relevance, "case when b.exam_eligible then 1 else 0 end"))

# Regression tests for the new defect classes.
Path("tests/multi-topic-study-session.test.ts").write_text('''import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration = readFileSync(new URL("../supabase/migrations/20261007195500_multi_topic_study_sessions.sql", import.meta.url), "utf8");
const data = readFileSync(new URL("../src/lib/data.ts", import.meta.url), "utf8");
const form = readFileSync(new URL("../src/features/session/SessionForm.tsx", import.meta.url), "utf8");
const exam = readFileSync(new URL("../src/components/ExamSimulationV5.tsx", import.meta.url), "utf8");
const bi05 = readFileSync(new URL("../supabase/migrations/20261007184500_bi05_iiris5_multi_exam.sql", import.meta.url), "utf8");

test("one study session can link to multiple topics without duplicating session minutes", () => {
  assert.match(migration, /create table if not exists public\\.study_session_topics/i);
  assert.match(migration, /create or replace function public\\.log_multi_topic_study_session/i);
  assert.match(migration, /v_base_minutes := p_minutes \\/ v_topic_count/);
  assert.match(migration, /v_remainder := p_minutes % v_topic_count/);
  assert.match(migration, /study_minutes = v_topic\\.study_minutes \\+ v_allocated/);
  assert.doesNotMatch(migration, /study_minutes = v_topic\\.study_minutes \\+ p_minutes/);
});

test("quick study logging exposes and submits a multi-topic selection", () => {
  assert.match(data, /topic_ids\\?: string\\[\\]/);
  assert.match(data, /log_multi_topic_study_session/);
  assert.match(data, /p_topic_ids: multiTopicIds/);
  assert.match(form, /selectedTopicIds/);
  assert.match(form, /type="checkbox"/);
  assert.match(form, /topic_ids: selectedTopicIds/);
  assert.match(form, /Opiskeluaika kirjataan vain kerran ja jaetaan valittujen kappaleiden kesken/);
});

test("question bank loading is large enough for KE04 and BI05 together", () => {
  assert.match(data, /\\.limit\\(5000\\)/);
});

test("exam simulation drafts are bound to the exact exam", () => {
  assert.match(data, /exam_id: string \\| null/);
  assert.match(data, /exam_id: input\\.exam_id \\?\\? null/);
  assert.match(exam, /row\\.exam_id===\\(nextExam\\?\\.id\\?\\?null\\)/);
  assert.match(exam, /exam_id:nextExam\\?\\.id\\?\\?null/);
});

test("BI05 exam relevance remains within the database 0..1 contract", () => {
  const matches = bi05.match(/case when b\\.exam_eligible then 1 else 0 end/g) ?? [];
  assert.equal(matches.length, 2);
  assert.doesNotMatch(bi05, /greatest\\(1, b\\.importance\\)/);
});
''')
