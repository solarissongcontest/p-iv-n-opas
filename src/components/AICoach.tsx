import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RotateCcw, Send, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { LiquidGlass } from "./LiquidGlass";
import { AbittiAnswerEditor, answerHasContent, answerPlainText } from "./AbittiAnswerEditor";
import { useUpsertPlanItem } from "@/lib/data";
import { getDeviceAccessToken } from "@/lib/deviceSession";
import { today } from "@/lib/fi";
import {
  buildCoachContext,
  type StudySnapshot,
} from "@/lib/coach/context";
import {
  localCoachDecision,
  renderCoachResponse,
  type CoachRequest,
  type CoachResponse,
} from "@/lib/coach/policy";

type CoachMessage = CoachResponse & { id: string };

const MODES: { id: CoachRequest["mode"]; label: string }[] = [
  { id: "help", label: "Auta tehtävässä" },
  { id: "practice", label: "Testaa minua" },
  { id: "next", label: "Mitä seuraavaksi?" },
  { id: "exam", label: "Valmistaudu kokeeseen" },
  { id: "progress", label: "Viikon havainnot" },
  { id: "plan", label: "Ehdota kertausta" },
];

const buttonClass =
  "min-h-11 rounded-xl border border-border px-3 py-2 text-sm disabled:opacity-50";

function coachFallbackReason(message: CoachMessage) {
  if (message.status === "quota") {
    return message.diagnostic === "budget"
      ? "Opiskeluohjaajan oma käyttöraja tuli vastaan."
      : "Geminin käyttöraja tuli vastaan.";
  }

  switch (message.diagnostic) {
    case "auth":
      return "Gemini-avain hylättiin tai yhteydellä ei ole käyttöoikeutta.";
    case "request":
      return "Gemini hylkäsi yhteyspyynnön. Pyynnön asetukset pitää tarkistaa.";
    case "model":
      return "Valittu Gemini-malli ei ole käytettävissä tälle projektille.";
    case "provider":
      return "Gemini-palvelu palautti virheen.";
    case "timeout":
      return "Gemini ei vastannut ajoissa.";
    case "network":
      return "Yhteys Gemini-palveluun katkesi.";
    case "budget":
      return "Opiskeluohjaajan käyttörajan tarkistus epäonnistui.";
    case "invalid_output":
      return "Geminin vastaus ei läpäissyt vastaussuodatinta.";
    default:
      return "Gemini-vastausta ei voitu käyttää.";
  }
}

export function AICoach({
  data,
  selectedCourseId,
  weekdays,
  triggerLabel = "Ohjaaja",
  onLog,
  onPractice,
}: {
  data: StudySnapshot;
  selectedCourseId: string | null;
  weekdays: number[];
  triggerLabel?: string;
  onLog: () => void;
  onPractice: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [task, setTask] = useState("");
  const [attempt, setAttempt] = useState("");
  const [hintLevel, setHintLevel] = useState(0);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [remoteConsent, setRemoteConsent] = useState(false);
  const [remoteConfigured, setRemoteConfigured] = useState(false);
  const [providerChecked, setProviderChecked] = useState(false);
  const [accepted, setAccepted] = useState<string[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const requestLock = useRef(false);
  const savePlanItem = useUpsertPlanItem();

  const context = useMemo(
    () =>
      buildCoachContext(
        data,
        {
          ...(courseId ? { courseId } : {}),
          ...(topicId ? { topicId } : {}),
        },
        today(),
        weekdays,
      ),
    [courseId, data, topicId, weekdays],
  );

  const effectiveCourseId = courseId || context?.courseId || "";
  const topicChoices = data.topics.filter(
    (topic) => topic.course_id === effectiveCourseId,
  );
  const geminiActive = messages.some(
    (message) => message.source === "gemini" && message.status === "ready",
  );

  const resetConversation = () => {
    abortRef.current?.abort();
    requestLock.current = false;
    setBusy(false);
    setMessages([]);
    setTask("");
    setAttempt("");
    setHintLevel(0);
    setPracticeIndex(0);
    setError("");
    setAccepted([]);
  };

  useEffect(() => {
    if (!open) {
      abortRef.current?.abort();
      requestLock.current = false;
      setBusy(false);
      return;
    }

    setCourseId((current) => current || selectedCourseId || "");
    setProviderChecked(false);

    const controller = new AbortController();
    const token = getDeviceAccessToken();

    if (!token) {
      setRemoteConfigured(false);
      setProviderChecked(true);
      return () => controller.abort();
    }

    void fetch("/api/ai/coach", {
      headers: { Authorization: "Bearer " + token },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("status");
        return (await response.json()) as { remoteConfigured?: boolean };
      })
      .then((status) => {
        setRemoteConfigured(status.remoteConfigured === true);
        setProviderChecked(true);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setRemoteConfigured(false);
          setProviderChecked(true);
        }
      });

    return () => controller.abort();
  }, [open, selectedCourseId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "auto",
    });
  }, [messages, busy]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(mode: CoachRequest["mode"], forceLocal = false) {
    if (requestLock.current || !context) return;

    if (mode === "feedback" && !attempt.trim()) {
      setError("Kirjoita ensin oma yrityksesi.");
      return;
    }

    requestLock.current = true;
    setBusy(true);
    setError("");

    const input: CoachRequest = {
      mode,
      message: task,
      attempt: answerPlainText(attempt),
      courseId: context.courseId,
      ...(topicId ? { topicId } : {}),
      hintLevel,
      practiceIndex,
      remoteConsent,
    };

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      let response: CoachResponse;
      const useRemote =
        !forceLocal &&
        remoteConsent &&
        remoteConfigured &&
        navigator.onLine &&
        ["help", "feedback"].includes(mode);

      if (!useRemote) {
        response = renderCoachResponse(
          input,
          context,
          localCoachDecision(input),
        );
      } else {
        const token = getDeviceAccessToken();
        if (!token) throw new Error("Kirjautuminen on vanhentunut.");

        const timeout = window.setTimeout(() => controller.abort(), 18_000);
        try {
          const result = await fetch("/api/ai/coach", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(input),
            signal: controller.signal,
          });
          const payload = (await result.json()) as CoachResponse & {
            error?: string;
          };
          if (!result.ok) {
            throw new Error(payload.error ?? "Opiskeluohjaaja ei vastannut.");
          }
          response = payload;
        } finally {
          window.clearTimeout(timeout);
        }
      }

      if (controller.signal.aborted) return;

      setMessages((current) => [
        ...current.slice(-9),
        { ...response, id: crypto.randomUUID() },
      ]);

      if (mode === "help") {
        setHintLevel((current) => Math.min(3, current + 1));
      }

      if (mode === "practice") {
        setPracticeIndex((current) => (current + 1) % 100);
        setTask(response.message);
        setAttempt("");
        setHintLevel(0);
      }
    } catch (caught) {
      if (controller.signal.aborted) {
        setError("Pyyntö keskeytyi. Paikallinen ohjaus toimii edelleen.");
      } else {
        setError(
          caught instanceof Error ? caught.message : "Yhteys katkesi.",
        );
      }
    } finally {
      if (abortRef.current === controller) {
        requestLock.current = false;
        setBusy(false);
      }
    }
  }

  async function acceptProposal(message: CoachMessage, date: string) {
    const proposal = message.proposal;
    if (!proposal || accepted.includes(proposal.id) || savePlanItem.isPending) {
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < today()) {
      toast.error("Valitse tämä päivä tai tuleva päivä.");
      return;
    }

    const courseExists = data.courses.some(
      (course) => course.id === proposal.courseId && !course.archived,
    );
    const topicExists = data.topics.some(
      (topic) =>
        topic.id === proposal.topicId &&
        topic.course_id === proposal.courseId,
    );

    if (!courseExists || !topicExists) {
      toast.error("Kurssi tai aihe muuttui. Pyydä uusi ehdotus.");
      return;
    }

    const duplicate = data.plan.some(
      (item) =>
        item.course_id === proposal.courseId &&
        item.topic_id === proposal.topicId &&
        item.date === date &&
        !["completed", "skipped"].includes(item.status),
    );

    if (duplicate) {
      toast.error("Tälle aiheelle on jo suunnitelma samalle päivälle.");
      return;
    }

    try {
      await savePlanItem.mutateAsync({
        course_id: proposal.courseId,
        topic_id: proposal.topicId,
        date,
        title: proposal.title,
        target_minutes: proposal.minutes,
        min_minutes: 5,
        extra_minutes: 0,
        phase: "review",
        kind: "review",
        status: "planned",
      });
      setAccepted((current) => [...current, proposal.id]);
      toast.success("Kertaus lisättiin suunnitelmaan.");
    } catch {
      toast.error("Tallennus epäonnistui. Ehdotus säilyy tässä.");
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (value) {
          setCourseId(selectedCourseId ?? "");
          setTopicId("");
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="coach-trigger glass-base glass-specular glass-interactive"
          aria-label={triggerLabel === "Ohjaaja" ? "Avaa opiskeluohjaaja" : triggerLabel}
        >
          <Sparkles size={19} />
          <span>{triggerLabel}</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/35" />
        <Dialog.Content
          className="coach-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            document.querySelector<HTMLButtonElement>(".coach-trigger")?.focus();
          }}
        >
          <LiquidGlass
            variant="thick"
            lensing
            className="shrink-0 border-b border-border px-5 pb-4 pt-5"
          >
            <div className="flex items-center justify-between gap-3">
              <Dialog.Title className="flex items-center gap-2 text-xl font-semibold">
                <Sparkles size={20} />
                Opiskeluohjaaja
              </Dialog.Title>
              <div className="flex gap-1">
                <button
                  className="grid size-11 place-items-center rounded-xl"
                  aria-label="Tyhjennä keskustelu"
                  onClick={resetConversation}
                >
                  <RotateCcw size={18} />
                </button>
                <Dialog.Close
                  className="grid size-11 place-items-center rounded-xl"
                  aria-label="Sulje opiskeluohjaaja"
                >
                  <X size={20} />
                </Dialog.Close>
              </div>
            </div>
            <Dialog.Description className="text-sm text-muted-foreground">
              Yksi askel kerrallaan. Ratkaiset tehtävän itse.
            </Dialog.Description>
            <p className="mt-2 text-xs text-muted-foreground" role="status">
              {!providerChecked
                ? "Tarkistetaan yhteyttä…"
                : geminiActive
                  ? "Gemini käytössä · vastaussuodatin käytössä"
                  : remoteConfigured
                    ? "Gemini-yhteys määritetty · käyttö vapaaehtoista"
                    : "Paikallinen ohjaus · kielimallia ei ole yhdistetty"}
            </p>
          </LiquidGlass>

          <div
            ref={scrollRef}
            className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-5"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="text-sm">
                Kurssi
                <select
                  className="mt-1 w-full rounded-xl border bg-surface p-3"
                  value={effectiveCourseId}
                  disabled={busy}
                  onChange={(event) => {
                    resetConversation();
                    setCourseId(event.target.value);
                    setTopicId("");
                  }}
                >
                  {data.courses
                    .filter((course) => !course.archived)
                    .map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.code}
                      </option>
                    ))}
                </select>
              </label>

              <label className="text-sm">
                Aihe
                <select
                  className="mt-1 w-full rounded-xl border bg-surface p-3"
                  value={topicId}
                  disabled={busy}
                  onChange={(event) => {
                    resetConversation();
                    setTopicId(event.target.value);
                  }}
                >
                  <option value="">Ajankohtaisin aihe</option>
                  {topicChoices.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {!context && (
              <p className="text-sm">
                Lisää ensin kurssi ja sen aiheet.
              </p>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Dialog.Close asChild>
                <button
                  className={buttonClass + " col-span-2 flex items-center justify-center gap-2 bg-accent font-medium"}
                  onClick={onPractice}
                >
                  <Sparkles size={16} />
                  Avaa Harjoittelu
                </button>
              </Dialog.Close>
              {MODES.map((mode) => (
                <button
                  key={mode.id}
                  className={buttonClass + " text-left"}
                  disabled={busy || !context}
                  onClick={() => void send(mode.id)}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <details className="rounded-xl border p-3 text-sm">
              <summary className="cursor-pointer font-medium">
                Tietosuoja ja tekoäly
              </summary>
              <p className="mt-2 text-muted-foreground">
                Paikallinen ohjaus toimii ilman ulkoista tekoälypalvelua. Jos otat
                tekoälyn käyttöön, tehtäväsi, oma yrityksesi ja rajatut
                osaamistiedot lähetetään Google Geminille vain seuraavan
                ohjausaskeleen valintaa varten. Profiilia, virhepankin tekstejä
                tai keskusteluhistoriaa ei lähetetä. Geminin ilmaisella
                käyttörajalla Google voi käyttää lähetettyä sisältöä tuotteidensa
                parantamiseen. Älä kirjoita henkilötietoja; automaattinen
                peittäminen ei tunnista kaikkea.
              </p>
              <label className="mt-3 flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 size-4"
                  checked={remoteConsent}
                  disabled={!remoteConfigured || busy}
                  onChange={(event) => setRemoteConsent(event.target.checked)}
                />
                <span>Salli tekoäly tämän istunnon aikana</span>
              </label>
            </details>

            <div
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              className="space-y-4"
            >
              {messages.map((message) => (
                <article
                  key={message.id}
                  className="rounded-2xl bg-muted/50 p-4"
                >
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    {message.source === "gemini"
                      ? "Tekoälyn valitsema ohjaus"
                      : "Paikallinen ohjaus"}
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-6">
                    {message.message}
                  </p>

                  {["quota", "unavailable", "invalid_output"].includes(
                    message.status,
                  ) && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {coachFallbackReason(message)} Paikallinen ohjaus jatkuu.
                    </p>
                  )}

                  {message.proposal && (
                    <ProposalCard
                      message={message}
                      accepted={accepted.includes(message.proposal.id)}
                      busy={savePlanItem.isPending}
                      onAccept={(date) =>
                        void acceptProposal(message, date)
                      }
                    />
                  )}
                </article>
              ))}
            </div>

            {busy && (
              <p role="status" className="text-sm text-muted-foreground">
                Valitaan seuraavaa askelta…
              </p>
            )}

            <label className="block text-sm font-medium">
              Tehtävä tai kysymys
              <textarea
                className="mt-1 min-h-24 w-full resize-y rounded-xl border bg-surface p-3 font-normal"
                maxLength={4000}
                value={task}
                disabled={busy}
                onChange={(event) => {
                  setTask(event.target.value);
                  setHintLevel(0);
                }}
                placeholder="Kirjoita tehtävänanto tai kysy, miten pääsisit alkuun."
              />
            </label>

            <AbittiAnswerEditor
              label="Oma yritys"
              value={attempt}
              disabled={busy}
              onChange={setAttempt}
              placeholder="Mitä olet jo ajatellut tai laskenut?"
              minHeight={120}
            />

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-destructive/30 p-3 text-sm"
              >
                <p>{error}</p>
                <button
                  className="mt-2 underline"
                  onClick={() => void send("help", true)}
                >
                  Jatka paikallisella ohjauksella
                </button>
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              Opiskeluohjaaja ei anna mallivastausta eikä muuta osaamistasoa.
              Keskustelu ei itsessään ole osaamisnäyttö.
            </p>

            <button
              className="text-sm text-primary underline"
              onClick={() => {
                setOpen(false);
                onLog();
              }}
            >
              Kirjaa harjoittelu
            </button>
          </div>

          <div className="coach-composer flex shrink-0 gap-2 border-t bg-surface p-4">
            <button
              className={
                buttonClass +
                " flex flex-1 items-center justify-center gap-2 bg-primary text-primary-foreground"
              }
              disabled={busy || !context}
              onClick={() => void send("help")}
            >
              <Send size={16} />
              {hintLevel ? "Seuraava vihje" : "Auta alkuun"}
            </button>
            <button
              className={buttonClass + " flex-1"}
              disabled={busy || !answerHasContent(attempt) || !context}
              onClick={() => void send("feedback")}
            >
              Palaute yrityksestä
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ProposalCard({
  message,
  accepted,
  busy,
  onAccept,
}: {
  message: CoachMessage;
  accepted: boolean;
  busy: boolean;
  onAccept: (date: string) => void;
}) {
  const proposal = message.proposal!;
  const [date, setDate] = useState(proposal.date);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return <p className="mt-3 text-xs">Ehdotus ohitettu.</p>;
  }

  if (accepted) {
    return (
      <p role="status" className="mt-3 text-sm font-medium">
        Lisätty suunnitelmaan.
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-2 border-t pt-3">
      <p className="text-sm font-medium">
        Ehdotus · {proposal.minutes} min
      </p>
      <label className="block text-sm">
        Päivä
        <input
          type="date"
          className="mt-1 block w-full rounded-lg border bg-surface p-2"
          value={date}
          min={today()}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <div className="flex gap-2">
        <button
          className={buttonClass}
          disabled={busy}
          onClick={() => onAccept(date)}
        >
          Hyväksy
        </button>
        <button
          className={buttonClass}
          disabled={busy}
          onClick={() => setDismissed(true)}
        >
          Ei nyt
        </button>
      </div>
    </div>
  );
}
