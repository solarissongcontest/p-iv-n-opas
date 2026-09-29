import { useMemo, useState } from "react";
import { FileText, Link2, LoaderCircle, Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import type { Course, Topic } from "@/lib/domain";
import {
  useCreateStudyMaterial,
  useDeleteTopicDependency,
  useStudyMaterials,
  useTopicDependencies,
  useUpdateTopic,
  useUpsertTopicDependency,
  type TopicDependency,
} from "@/lib/data";
import { getDeviceAccessToken } from "@/lib/deviceSession";

const secondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm hover:bg-muted disabled:opacity-50";
const primary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50";

type MaterialLink = {
  topicId: string;
  confidence: number;
  reason: string;
  pageHint?: string | null;
};

type QuestionSuggestion = {
  topicId: string;
  prompt: string;
  type: string;
  difficulty: number;
};

export function KnowledgeGraphEditor({
  course,
  courses,
  topics,
}: {
  course: Course;
  courses: Course[];
  topics: Topic[];
}) {
  const query = useTopicDependencies();
  const upsert = useUpsertTopicDependency();
  const remove = useDeleteTopicDependency();
  const courseTopics = topics.filter((topic) => topic.course_id === course.id);
  const [topicId, setTopicId] = useState(courseTopics[0]?.id ?? "");
  const [dependsOn, setDependsOn] = useState("");
  const [relation, setRelation] = useState<TopicDependency["relation_type"]>("prerequisite");
  const rows = (query.data ?? []).filter((row) => row.topic_id === topicId);

  const candidates = topics.filter((topic) => topic.id !== topicId);
  const selectedTopic = topics.find((topic) => topic.id === topicId);

  async function add() {
    if (!topicId || !dependsOn) return;
    try {
      await upsert.mutateAsync({
        topic_id: topicId,
        depends_on_topic_id: dependsOn,
        relation_type: relation,
      });
      setDependsOn("");
      toast.success("Knowledge Graph päivitetty.");
    } catch {
      toast.error("Riippuvuutta ei voitu tallentaa.");
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-muted/30 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">Knowledge Graph</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Määritä esitiedot, jatkumot ja helposti sekoittuvat aiheet. Planner käyttää niitä juurisyyn löytämiseen.
          </p>
        </div>
        <Link2 size={18} className="text-muted-foreground" />
      </div>

      <label className="block text-sm font-medium">
        Aihe
        <select className="mt-1 w-full rounded-xl border bg-surface p-3" value={topicId} onChange={(event) => setTopicId(event.target.value)}>
          {courseTopics.map((topic) => <option key={topic.id} value={topic.id}>{topic.name}</option>)}
        </select>
      </label>

      <div className="mt-3 grid gap-2 md:grid-cols-[1fr_180px_auto]">
        <select className="min-h-11 rounded-xl border bg-surface px-3" value={dependsOn} onChange={(event) => setDependsOn(event.target.value)}>
          <option value="">Valitse liittyvä aihe…</option>
          {candidates.map((topic) => {
            const parent = courses.find((item) => item.id === topic.course_id);
            return <option key={topic.id} value={topic.id}>{parent?.code ?? "?"} · {topic.name}</option>;
          })}
        </select>
        <select className="min-h-11 rounded-xl border bg-surface px-3" value={relation} onChange={(event) => setRelation(event.target.value as TopicDependency["relation_type"])}>
          <option value="prerequisite">prerequisite</option>
          <option value="depends_on">depends_on</option>
          <option value="builds_on">builds_on</option>
          <option value="related_to">related_to</option>
          <option value="commonly_confused_with">commonly_confused_with</option>
        </select>
        <button className={secondary} disabled={!dependsOn || upsert.isPending} onClick={() => void add()}><Plus size={16} />Lisää</button>
      </div>

      <div className="mt-4 space-y-2">
        {rows.length ? rows.map((row) => {
          const target = topics.find((topic) => topic.id === row.depends_on_topic_id);
          const targetCourse = target ? courses.find((item) => item.id === target.course_id) : null;
          return (
            <div key={row.id} className="flex min-h-12 items-center justify-between gap-3 rounded-xl bg-surface px-3 text-sm">
              <span>
                <b>{selectedTopic?.name}</b> <span className="text-muted-foreground">{row.relation_type}</span>{" "}
                <b>{targetCourse?.code} · {target?.name ?? "Poistettu aihe"}</b>
              </span>
              <button aria-label="Poista riippuvuus" className="grid size-10 place-items-center rounded-lg hover:bg-muted" onClick={() => void remove.mutateAsync(row.id).catch(() => toast.error("Riippuvuutta ei voitu poistaa."))}>
                <Trash2 size={15} />
              </button>
            </div>
          );
        }) : <p className="text-sm text-muted-foreground">Tälle aiheelle ei ole vielä relation-tyyppisiä riippuvuuksia.</p>}
      </div>
    </section>
  );
}

export function MaterialImporter({
  course,
  topics,
}: {
  course: Course;
  topics: Topic[];
}) {
  const create = useCreateStudyMaterial();
  const updateTopic = useUpdateTopic();
  const materials = useStudyMaterials();
  const courseTopics = topics.filter((topic) => topic.course_id === course.id);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [provider, setProvider] = useState("");
  const [links, setLinks] = useState<MaterialLink[]>([]);
  const [questions, setQuestions] = useState<QuestionSuggestion[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const current = useMemo(
    () => (materials.data ?? []).filter((material) => material.course_id === course.id),
    [course.id, materials.data],
  );

  async function analyze() {
    if (!file && !text.trim()) return;
    const token = getDeviceAccessToken();
    if (!token) {
      toast.error("Kirjautuminen on vanhentunut. Avaa sovellus uudelleen.");
      return;
    }

    setBusy(true);
    try {
      let fileData: string | undefined;
      let mimeType: string | undefined;
      let materialText = text.trim();

      if (file) {
        mimeType = file.type || (file.name.toLowerCase().endsWith(".pdf") ? "application/pdf" : "text/plain");
        if (mimeType === "application/pdf") {
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result ?? ""));
            reader.onerror = () => reject(reader.error ?? new Error("Tiedostoa ei voitu lukea."));
            reader.readAsDataURL(file);
          });
          fileData = dataUrl.split(",")[1];
        } else {
          materialText = [materialText, await file.text()].filter(Boolean).join("\n\n");
        }
      }

      const response = await fetch("/api/ai/material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          courseId: course.id,
          name: name.trim() || file?.name || "Kurssimateriaali",
          text: materialText,
          mimeType,
          fileData,
        }),
      });
      const payload = await response.json() as {
        links?: MaterialLink[];
        suggestedQuestions?: QuestionSuggestion[];
        provider?: string;
        error?: string;
      };
      if (!response.ok) throw new Error(payload.error ?? "Materiaalia ei voitu analysoida.");
      const nextLinks = payload.links ?? [];
      setLinks(nextLinks);
      setQuestions(payload.suggestedQuestions ?? []);
      setSelected(nextLinks.filter((row) => row.confidence >= 0.3).map((row) => row.topicId));
      setProvider(payload.provider ?? "local");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Materiaalia ei voitu analysoida.");
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    if (!selected.length) return;
    const materialName = name.trim() || file?.name || "Kurssimateriaali";
    try {
      await create.mutateAsync({
        course_id: course.id,
        name: materialName,
        kind: file?.name.toLowerCase().endsWith(".pdf") ? "pdf" : file ? "notes" : "text",
        topic_ids: selected,
        page_hint: null,
        text_preview: text.trim().slice(0,1800) || null,
        metadata: {
          provider,
          questionSuggestions: questions,
          linkEvidence: links.filter((row) => selected.includes(row.topicId)),
        },
      });

      await Promise.all(selected.map(async (topicId) => {
        const topic = courseTopics.find((candidate) => candidate.id === topicId);
        if (!topic) return;
        const link = links.find((row) => row.topicId === topicId);
        const marker = [materialName, link?.pageHint].filter(Boolean).join(" · ");
        const existing = topic.materials ?? "";
        if (existing.includes(marker)) return;
        await updateTopic.mutateAsync({
          id: topicId,
          materials: [existing, marker].filter(Boolean).join(" · "),
        });
      }));

      toast.success("Materiaali linkitettiin osaamiskarttaan.");
      setName("");
      setText("");
      setFile(null);
      setLinks([]);
      setQuestions([]);
      setSelected([]);
    } catch {
      toast.error("Materiaalin linkitystä ei voitu tallentaa.");
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-muted/30 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">Materiaalit → osaamiskartta</p>
          <p className="mt-1 text-xs text-muted-foreground">Tuo PDF, teksti tai muistiinpanot. Linkit ovat ehdotuksia, jotka hyväksyt itse.</p>
        </div>
        <Upload size={18} className="text-muted-foreground" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">Nimi<input className="mt-1 w-full rounded-xl border bg-surface p-3" value={name} onChange={(event) => setName(event.target.value)} placeholder="Esim. FY04 luvut 3–5" /></label>
        <label className="text-sm font-medium">Tiedosto<input className="mt-1 block min-h-11 w-full rounded-xl border bg-surface p-2" type="file" accept=".pdf,.txt,.md,application/pdf,text/plain" onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></label>
      </div>
      <label className="mt-3 block text-sm font-medium">Tai liitä teksti<textarea rows={5} className="mt-1 w-full rounded-xl border bg-surface p-3" value={text} onChange={(event) => setText(event.target.value)} placeholder="Sisältöluettelo, muistiinpanot tai materiaalin teksti…" /></label>
      <button className={secondary+" mt-3"} disabled={busy || (!file && !text.trim())} onClick={() => void analyze()}>
        {busy ? <LoaderCircle className="animate-spin" size={16} /> : <FileText size={16} />}
        Analysoi materiaali
      </button>

      {links.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold">Ehdotetut linkit · {provider === "gemini" ? "Gemini" : "paikallinen fallback"}</p>
          <div className="mt-2 space-y-2">
            {links.map((link) => {
              const topic = courseTopics.find((candidate) => candidate.id === link.topicId);
              if (!topic) return null;
              const checked = selected.includes(link.topicId);
              return (
                <label key={link.topicId} className="grid min-h-14 grid-cols-[auto_1fr_auto] items-start gap-3 rounded-xl bg-surface p-3">
                  <input className="mt-1 size-4 accent-primary" type="checkbox" checked={checked} onChange={() => setSelected((current) => checked ? current.filter((id) => id !== link.topicId) : [...current, link.topicId])} />
                  <span><b>{topic.name}</b><small className="mt-1 block text-muted-foreground">{link.reason}{link.pageHint ? " · " + link.pageHint : ""}</small></span>
                  <span className="text-xs font-semibold">{Math.round(link.confidence * 100)} %</span>
                </label>
              );
            })}
          </div>
          <button className={primary+" mt-3"} disabled={!selected.length || create.isPending} onClick={() => void save()}>Tallenna linkitys</button>
        </div>
      )}

      {current.length > 0 && (
        <div className="mt-5 border-t border-border pt-3">
          <p className="text-sm font-semibold">Kurssin materiaalit</p>
          {current.slice(0,8).map((material) => <div key={material.id} className="mt-2 flex items-center justify-between rounded-xl bg-surface px-3 py-2 text-sm"><span><b>{material.name}</b><small className="block text-muted-foreground">{material.kind.toUpperCase()} · {material.topic_ids.length} aihetta</small></span></div>)}
        </div>
      )}
    </section>
  );
}
