import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Course, Mistake, Topic } from "@/lib/domain";
import {
  useQuestionBank,
  useRecordPracticeAttempt,
  useUpdateMistakeRepair,
} from "@/lib/data";
import {
  AbittiAnswerEditor,
  answerHasContent,
  answerPlainText,
} from "@/components/AbittiAnswerEditor";
import { contrastiveRepairPlanV5 } from "@/lib/learning-os-v5";

const primary =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50";
const secondary =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm disabled:opacity-50";

export function ContrastiveErrorLab({
  courses,
  topics,
  mistakes,
}: {
  courses: Course[];
  topics: Topic[];
  mistakes: Mistake[];
}) {
  const open = useMemo(
    () => mistakes.filter((mistake) => mistake.status !== "mastered").slice(0, 8),
    [mistakes],
  );
  const [selectedId, setSelectedId] = useState(open[0]?.id ?? "");
  const selected = open.find((mistake) => mistake.id === selectedId) ?? open[0] ?? null;
  const [divergence, setDivergence] = useState("");
  const [principle, setPrinciple] = useState("");
  const [repair, setRepair] = useState("");
  const [parallelResponse, setParallelResponse] = useState("");
  const [parallelSubmitted, setParallelSubmitted] = useState(false);
  const update = useUpdateMistakeRepair();
  const bank = useQuestionBank();
  const recordAttempt = useRecordPracticeAttempt();

  if (!selected) {
    return (
      <section className="panel p-4 sm:p-6">
        <h2 className="text-base font-semibold sm:text-lg">Virheen korjaus</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Ei avoimia virheitä. Harvinainen mutta miellyttävä tilanne.
        </p>
      </section>
    );
  }

  const activeMistake = selected;
  const topic = topics.find((candidate) => candidate.id === activeMistake.topic_id);
  const course = courses.find((candidate) => candidate.id === activeMistake.course_id);
  const plan = contrastiveRepairPlanV5(activeMistake);
  const candidateQuestions = (bank.data ?? []).filter((question) =>
    question.course_id === activeMistake.course_id &&
    (activeMistake.topic_id ? question.topic_id === activeMistake.topic_id : true) &&
    !activeMistake.error.toLowerCase().includes(question.prompt.toLowerCase().slice(0, 40)) &&
    !(activeMistake.what_happened ?? "").toLowerCase().includes(question.prompt.toLowerCase().slice(0, 40))
  );
  const parallelTask = candidateQuestions
    .sort((a, b) => Math.abs(a.difficulty - 3) - Math.abs(b.difficulty - 3))[0] ?? null;

  async function save(status: "corrected" | "retested") {
    try {
      await update.mutateAsync({
        id: activeMistake.id,
        first_divergence: divergence.trim() || activeMistake.first_divergence || null,
        correct_principle: principle.trim() || activeMistake.correct_principle || null,
        repair_response: repair.trim() || activeMistake.repair_response || null,
        delayed_verification_due:
          activeMistake.delayed_verification_due ??
          new Date(Date.now() + 3 * 86_400_000).toISOString().slice(0, 10),
        status,
      });
      toast.success(status === "corrected" ? "Virhekorjaus tallennettu." : "Rinnakkaisyritys tallennettu.");
    } catch {
      toast.error("Virhekorjausta ei voitu tallentaa.");
    }
  }

  async function submitParallel(result: "independent" | "hinted" | "not_yet") {
    if (!answerHasContent(parallelResponse)) {
      toast.error("Kirjoita rinnakkaistehtävään vastaus ensin.");
      return;
    }
    const prompt = parallelTask?.prompt ??
      `Ratkaise uusi soveltava esimerkki aiheesta ${topic?.name ?? "tämä aihe"}. Näytä ratkaisuperiaate ja perustele, miksi sama aiempi virhe ei toistu.`;
    const attemptTopicId=activeMistake.topic_id ?? parallelTask?.topic_id ?? null;
    if(!attemptTopicId){
      toast.error("Rinnakkaistehtävä tarvitsee aiheen ennen kuin yritys voidaan tallentaa.");
      return;
    }
    try {
      await recordAttempt.mutateAsync({
        course_id: activeMistake.course_id,
        topic_id: attemptTopicId,
        attempt_type: parallelTask?.question_type ?? "application",
        prompt,
        response: answerPlainText(parallelResponse),
        difficulty: parallelTask?.difficulty ?? 3,
        result,
        confidence: null,
        hint_used: false,
        hints_used: 0,
        source: "mistake_repair",
        skills: parallelTask?.skills ?? [],
        expected_concepts: parallelTask?.expected_concepts ?? [],
        question_payload: {
          mistakeId: activeMistake.id,
          contrastiveRepair: true,
          parallelTask: true,
          questionBankId: parallelTask?.id ?? null,
          delayedVerificationRequired: true,
        },
      });
      await update.mutateAsync({
        id: activeMistake.id,
        status: result === "not_yet" ? "corrected" : "retested",
        first_divergence: divergence.trim() || activeMistake.first_divergence || null,
        correct_principle: principle.trim() || activeMistake.correct_principle || null,
        repair_response: repair.trim() || activeMistake.repair_response || null,
        delayed_verification_due:
          activeMistake.delayed_verification_due ??
          new Date(Date.now() + 3 * 86_400_000).toISOString().slice(0, 10),
      });
      setParallelSubmitted(true);
      toast.success(
        result === "independent"
          ? "Rinnakkaistehtävä varmennettiin itsenäisesti. Viivevarmistus jäi jonoon."
          : result === "hinted"
            ? "Rinnakkaistehtävä tallennettiin, mutta itsenäinen viivevarmistus tarvitaan vielä."
            : "Virhe tarvitsee vielä uuden korjauskierroksen.",
      );
    } catch {
      toast.error("Rinnakkaistehtävää ei voitu tallentaa.");
    }
  }

  return (
    <section className="panel p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold sm:text-lg">Virheen korjaus</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Virhettä ei vain kuitata vääräksi. Paikannetaan ensimmäinen kohta, jossa ajattelu erkani oikeasta periaatteesta, ja testataan korjaus uudella tehtävällä.
          </p>
        </div>
        <select
          className="min-h-11 rounded-xl border border-border bg-surface px-3 text-sm"
          value={activeMistake.id}
          onChange={(event) => {
            setSelectedId(event.target.value);
            setDivergence("");
            setPrinciple("");
            setRepair("");
            setParallelResponse("");
            setParallelSubmitted(false);
          }}
        >
          {open.map((mistake) => (
            <option key={mistake.id} value={mistake.id}>
              {courses.find((candidate) => candidate.id === mistake.course_id)?.code ?? "Kurssi"} · {mistake.error.slice(0, 55)}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 rounded-2xl bg-muted/50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {course?.code} · {topic?.name ?? "Yleinen virhe"}
        </p>
        <p className="mt-2 font-medium">{activeMistake.error}</p>
        {activeMistake.what_happened && <p className="mt-2 text-sm text-muted-foreground">Oma ratkaisu / tapahtuma: {activeMistake.what_happened}</p>}
        {activeMistake.solution && <p className="mt-2 text-sm text-muted-foreground">Aiempi korjaus: {activeMistake.solution}</p>}
      </div>

      <ol className="mt-4 space-y-2 text-sm">
        {plan.stages.map((stage, index) => (
          <li key={stage} className="rounded-xl border border-border p-3">
            <b>{index + 1}.</b> {stage}
          </li>
        ))}
      </ol>

      <div className="mt-5 grid gap-4">
        <label className="text-sm font-medium">
          Missä kohtaa ratkaisut erkaneavat ensimmäisen kerran?
          <textarea
            className="mt-1 min-h-24 w-full rounded-xl border border-border bg-surface p-3"
            value={divergence}
            onChange={(event) => setDivergence(event.target.value)}
            placeholder={activeMistake.first_divergence ?? "Kirjoita täsmällinen vaihe, ei vain 'laskuvirhe'."}
          />
        </label>
        <label className="text-sm font-medium">
          Mikä oikea periaate tässä kohdassa ratkaisee asian?
          <textarea
            className="mt-1 min-h-24 w-full rounded-xl border border-border bg-surface p-3"
            value={principle}
            onChange={(event) => setPrinciple(event.target.value)}
            placeholder={activeMistake.correct_principle ?? "Selitä periaate omin sanoin."}
          />
        </label>
        <label className="text-sm font-medium">
          Korjaa ratkaisu tästä kohdasta eteenpäin
          <textarea
            className="mt-1 min-h-32 w-full rounded-xl border border-border bg-surface p-3"
            value={repair}
            onChange={(event) => setRepair(event.target.value)}
            placeholder={activeMistake.repair_response ?? "Kirjoita korjattu ratkaisupolku."}
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button disabled={update.isPending} className={primary} onClick={() => void save("corrected")}>
          Tallenna korjaus
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-border p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Uusi rinnakkaistehtävä</p>
        <p className="mt-2 font-medium">
          {parallelTask?.prompt ??
            `Ratkaise uusi soveltava esimerkki aiheesta ${topic?.name ?? "tämä aihe"}. Näytä ratkaisuperiaate ja perustele, miksi sama aiempi virhe ei toistu.`}
        </p>
        {parallelTask?.stimulus_package && Object.keys(parallelTask.stimulus_package).length > 0 && (
          <pre className="mt-3 overflow-x-auto rounded-xl bg-muted/60 p-3 text-xs">
            {JSON.stringify(parallelTask.stimulus_package, null, 2)}
          </pre>
        )}
        <div className="mt-4">
          <AbittiAnswerEditor
            value={parallelResponse}
            onChange={setParallelResponse}
            label="Rinnakkaistehtävän vastaus"
            placeholder="Ratkaise ilman malliratkaisua. Ctrl/Cmd+E avaa kaavaeditorin."
            minHeight={180}
            disabled={parallelSubmitted}
          />
        </div>
        {!parallelSubmitted ? (
          <div className="mt-4">
            <p className="mb-2 text-sm text-muted-foreground">Arvioi yritys vasta kun olet tehnyt sen loppuun:</p>
            <div className="flex flex-wrap gap-2">
              <button disabled={recordAttempt.isPending} className={primary} onClick={() => void submitParallel("independent")}>Itsenäisesti oikein</button>
              <button disabled={recordAttempt.isPending} className={secondary} onClick={() => void submitParallel("hinted")}>Osittain / epävarma</button>
              <button disabled={recordAttempt.isPending} className={secondary} onClick={() => void submitParallel("not_yet")}>Ei vielä</button>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-xl bg-muted/60 p-3 text-sm">
            <b>Rinnakkaistehtävä tallennettu.</b>
            {parallelTask?.explanation && <p className="mt-2 text-muted-foreground">{parallelTask.explanation}</p>}
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Seuraava vaihe: {plan.next} Viivevarmistus ajoitetaan automaattisesti muutaman päivän päähän.
      </p>
    </section>
  );
}
