import type { Course, PlanItem, Topic } from "@/lib/domain";
import { effectivePlanStatus } from "@/lib/domain";
import { dateWithWeekday, fullDate, minutes, today } from "@/lib/fi";
import { planPhaseLabel } from "@/lib/ui-fi";

const secondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm hover:bg-muted";

const statusLabel: Record<string,string> = {
  planned:"Suunniteltu",
  completed:"Valmis",
  skipped:"Ohitettu",
  in_progress:"Käynnissä",
  overdue:"Myöhässä",
};
const statusIcon: Record<string,string> = {
  planned:"○",
  completed:"✓",
  skipped:"–",
  in_progress:"◐",
  overdue:"!",
};
const statusClass: Record<string,string> = {
  planned:"text-muted-foreground",
  completed:"text-primary",
  skipped:"text-muted-foreground",
  in_progress:"text-primary",
  overdue:"text-destructive",
};

type Props = {
  mode: "päivä"|"viikko"|"kuukausi";
  days: string[];
  plan: PlanItem[];
  courses: Course[];
  topics: Topic[];
  onStart: (id: string) => void;
  onMove: (item: PlanItem, date: string) => void;
  onShift: (item: PlanItem) => void;
  onSkip: (item: PlanItem) => void;
};

export function PlannerCalendar(props: Props) {
  if (props.mode === "päivä") return <PlannerDay {...props} />;
  if (props.mode === "kuukausi") return <PlannerMonth {...props} />;
  return <PlannerWeek {...props} />;
}

function PlannerDay(props: Props) {
  const date = props.days[0] ?? today();
  const items = itemsFor(props.plan, date);

  return (
    <section className="planner-day-agenda" aria-label={"Päivä " + fullDate(date)}>
      <header className="planner-period-header">
        <p className="text-sm text-muted-foreground">Päivän agenda</p>
        <h2 className="mt-1 text-xl font-semibold capitalize">{dateWithWeekday(date)}</h2>
      </header>
      <div className="planner-agenda-list">
        {items.length ? items.map((item) => (
          <AgendaItem key={item.id} {...props} item={item} date={date} />
        )) : (
          <p className="planner-empty-day">Ei suunniteltuja tehtäviä. Tyhjä päivä saa olla tyhjä.</p>
        )}
      </div>
    </section>
  );
}

function PlannerWeek(props: Props) {
  return (
    <section className="planner-week" aria-label="Viikkosuunnitelma">
      <div className="planner-week-grid">
        {props.days.map((date) => {
          const items = itemsFor(props.plan, date);
          return (
            <section
              className={"planner-week-day " + (date === today() ? "planner-week-day-today" : "")}
              key={date}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const id = event.dataTransfer.getData("text/plain");
                const item = props.plan.find((candidate) => candidate.id === id);
                if (item && item.date !== date) props.onMove(item, date);
              }}
            >
              <header className="planner-week-day-header">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{dateWithWeekday(date).split(" ")[0]}</p>
                <p className="mt-1 font-semibold">{fullDate(date).replace(/\s+\d{4}$/,"")}</p>
              </header>
              <div className="planner-week-day-items">
                {items.length ? items.map((item) => (
                  <CompactItem key={item.id} {...props} item={item} date={date} />
                )) : <span className="planner-week-empty">Vapaa</span>}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

function PlannerMonth(props: Props) {
  return (
    <section className="planner-month" aria-label="Kuukausisuunnitelma">
      <div className="planner-month-grid">
        {props.days.map((date) => {
          const items = itemsFor(props.plan, date);
          const important = items.find((item) => item.kind === "exam") ?? items[0];
          return (
            <section
              key={date}
              className={"planner-month-day " + (date === today() ? "planner-month-day-today" : "")}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const id = event.dataTransfer.getData("text/plain");
                const item = props.plan.find((candidate) => candidate.id === id);
                if (item && item.date !== date) props.onMove(item, date);
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{Number(date.slice(-2))}</span>
                {items.length > 0 && <span className="text-xs text-muted-foreground">{items.length}</span>}
              </div>
              {important ? (
                <button
                  className="planner-month-primary"
                  disabled={important.kind === "exam"}
                  onClick={() => important.kind !== "exam" && props.onStart(important.id)}
                >
                  <b>{props.courses.find((course) => course.id === important.course_id)?.code}</b>
                  <span>{important.title || props.topics.find((topic) => topic.id === important.topic_id)?.name || (important.kind === "exam" ? "Koe" : "Opiskelu")}</span>
                </button>
              ) : <span className="planner-month-empty">—</span>}
            </section>
          );
        })}
      </div>
    </section>
  );
}

function AgendaItem(props: Props & { item: PlanItem; date: string }) {
  const { item } = props;
  const status = effectivePlanStatus(item);
  const title = item.title || props.topics.find((topic) => topic.id === item.topic_id)?.name || "Opiskelu";
  const code = props.courses.find((course) => course.id === item.course_id)?.code;
  return (
    <article className="planner-agenda-item">
      <div className="planner-agenda-time">
        {item.start_time?.slice(0,5) || minutes(item.target_minutes)}
      </div>
      <div className="planner-agenda-body">
        <p className="text-sm font-semibold text-primary">{code}</p>
        <h3 className="mt-0.5 font-semibold">{title}</h3>
        <p className={"mt-1 text-xs " + statusClass[status]}>
          <span aria-hidden="true">{statusIcon[status]} </span>
          {statusLabel[status]} · {planPhaseLabel(item.phase)}
        </p>
        {item.kind !== "exam" && (
          <div className="mt-3 flex flex-wrap gap-1">
            <button className={secondary+" !min-h-9 !px-2"} onClick={() => props.onStart(item.id)}>Aloita</button>
            <TaskMenu item={item} onShift={props.onShift} onSkip={props.onSkip} />
          </div>
        )}
      </div>
    </article>
  );
}

function CompactItem(props: Props & { item: PlanItem; date: string }) {
  const { item } = props;
  const status = effectivePlanStatus(item);
  const title = item.title || props.topics.find((topic) => topic.id === item.topic_id)?.name || "Opiskelu";
  return (
    <article
      draggable={item.kind !== "exam"}
      onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)}
      className="planner-compact-item"
    >
      <p className="text-xs font-semibold text-primary">
        {props.courses.find((course) => course.id === item.course_id)?.code} · {item.start_time?.slice(0,5) || minutes(item.target_minutes)}
      </p>
      <p className="mt-1 line-clamp-2 text-sm font-medium">{title}</p>
      <p className={"mt-1 text-xs " + statusClass[status]}>
        <span aria-hidden="true">{statusIcon[status]} </span>{statusLabel[status]}
      </p>
      {item.kind !== "exam" && (
        <div className="mt-2 flex flex-wrap gap-1">
          <button className={secondary+" !min-h-9 !px-2"} onClick={() => props.onStart(item.id)}>Aloita</button>
          <TaskMenu item={item} onShift={props.onShift} onSkip={props.onSkip} />
        </div>
      )}
    </article>
  );
}

function TaskMenu({
  item,
  onShift,
  onSkip,
}: {
  item: PlanItem;
  onShift: (item: PlanItem) => void;
  onSkip: (item: PlanItem) => void;
}) {
  return (
    <details className="relative">
      <summary className={secondary+" list-none !min-h-9 !px-3"} aria-label="Tehtävän toiminnot">•••</summary>
      <div className="absolute right-0 z-20 mt-1 min-w-36 rounded-xl border border-border bg-surface p-1 shadow-lg">
        <button className="block min-h-10 w-full rounded-lg px-3 text-left text-sm hover:bg-muted" onClick={() => onShift(item)}>Siirrä</button>
        {item.status === "planned" && <button className="block min-h-10 w-full rounded-lg px-3 text-left text-sm hover:bg-muted" onClick={() => onSkip(item)}>Ohita</button>}
      </div>
    </details>
  );
}

function itemsFor(plan: PlanItem[], date: string) {
  return plan
    .filter((item) => item.date === date)
    .sort((a,b) => (a.start_time ?? "99:99").localeCompare(b.start_time ?? "99:99"));
}
