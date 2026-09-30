import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Course, Mistake, Topic } from "@/lib/domain";
import { useUpdateMistakeRepair } from "@/lib/data";
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
  const update = useUpdateMistakeRepair();

  if (!selected) {
    return (
      <section className="panel p-4 sm:p-6">
        <h2 className="text-base font-semibold sm:text-lg">Contrastive Error Lab</h2>
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
      toast.success(status === "corrected" ? "Virhekorjaus tallennettu." : "Uusi rinnakkaisyritys tallennettu.");
    } catch {
      toast.error("Virhekorjausta ei voitu tallentaa.");
    }
  }

  return (
    <section className="panel p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold sm:text-lg">Contrastive Error Lab</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Virhettä ei vain kuitata vääräksi. Paikannetaan ensimmäinen kohta, jossa ajattelu erkani oikeasta periaatteesta.
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
        <p className="mt-2 font-medium">{selected.error}</p>
        {selected.what_happened && <p className="mt-2 text-sm text-muted-foreground">Oma ratkaisu / tapahtuma: {selected.what_happened}</p>}
        {selected.solution && <p className="mt-2 text-sm text-muted-foreground">Aiempi korjaus: {selected.solution}</p>}
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
          Missä kohtaa ratkaisut erkanevat ensimmäisen kerran?
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
        <button disabled={update.isPending} className={secondary} onClick={() => void save("retested")}>
          Merkitse rinnakkaistehtävä tehdyksi
        </button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Seuraava vaihe: {plan.next} Viivevarmistus ajoitetaan automaattisesti muutaman päivän päähän.
      </p>
    </section>
  );
}
