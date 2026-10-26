import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BookOpen,
  Brain,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  FlaskConical,
  Map,
  Plus,
  Search,
  Settings2,
  Sparkles,
  X,
} from "lucide-react";
import {
  desktopPrimaryNav,
  mobilePrimaryNav,
  type StudyPage,
} from "@/app/navigation";

type AppShellProps = {
  page: StudyPage;
  pageTitle: string;
  pageEyebrow: string;
  moreOpen: boolean;
  onMoreOpenChange: (open: boolean) => void;
  onNavigate: (page: StudyPage) => void;
  onLog: () => void;
  onSearch: () => void;
  contextualAction?: ReactNode;
  children: ReactNode;
};

const secondaryDestinations: Array<{
  id: StudyPage;
  label: string;
  description: string;
  Icon: typeof BookOpen;
}> = [
  { id: "courses", label: "Opinnot", description: "Kurssit, aiheet ja oppimispolut", Icon: BookOpen },
  { id: "practice", label: "Harjoittelu", description: "Vapaa mieleenpalautus- ja kertausharjoittelu", Icon: Brain },
  { id: "exams", label: "Kokeet", description: "Koealueet ja harjoituskokeet", Icon: FlaskConical },
  { id: "progress", label: "Kehitys", description: "Osaamisnäyttö ja oppimisrytmi", Icon: ChartNoAxesCombined },
  { id: "settings", label: "Asetukset", description: "Kuormitus, ilmoitukset ja sovellus", Icon: Settings2 },
];

const desktopCoreDestinations = desktopPrimaryNav
  .map(({ id }) => id)
  .filter((id) => id === "today" || id === "plan");

const mobileCoreDestinations = mobilePrimaryNav
  .map(({ id }) => id)
  .filter((id) => id === "today" || id === "plan");

function isCorePage(page: StudyPage) {
  return page === "today" || page === "plan";
}

function coreLabel(page: StudyPage) {
  return page === "today" ? "Flow" : "Map";
}

function CoreIcon({ page, size }: { page: StudyPage; size: number }) {
  return page === "today" ? <Sparkles size={size} /> : <Map size={size} />;
}

export function AppShell({
  page,
  pageTitle,
  pageEyebrow,
  moreOpen,
  onMoreOpenChange,
  onNavigate,
  onLog,
  onSearch,
  contextualAction,
  children,
}: AppShellProps) {
  return (
    <div className="studyos-shell">
      <SystemBar
        page={page}
        pageTitle={pageTitle}
        moreOpen={moreOpen}
        onMoreOpenChange={onMoreOpenChange}
        onNavigate={onNavigate}
        onLog={onLog}
        onSearch={onSearch}
      />

      <main
        id="main-content"
        tabIndex={-1}
        className={"studyos-main " + (contextualAction ? "app-main-has-context-action" : "")}
      >
        {!isCorePage(page) && (
          <header className="studyos-context-header">
            <p>{pageEyebrow}</p>
            <h1>{pageTitle}</h1>
          </header>
        )}
        {children}
      </main>

      <BottomInteractionZone
        page={page}
        contextualAction={contextualAction}
        onNavigate={onNavigate}
        onSearch={onSearch}
      />

      <MoreMenu
        page={page}
        open={moreOpen}
        onClose={() => onMoreOpenChange(false)}
        onNavigate={onNavigate}
        onLog={onLog}
        onSearch={onSearch}
      />
    </div>
  );
}

function SystemBar({
  page,
  pageTitle,
  moreOpen,
  onMoreOpenChange,
  onNavigate,
  onLog,
  onSearch,
}: {
  page: StudyPage;
  pageTitle: string;
  moreOpen: boolean;
  onMoreOpenChange: (open: boolean) => void;
  onNavigate: (page: StudyPage) => void;
  onLog: () => void;
  onSearch: () => void;
}) {
  const [shortcut, setShortcut] = useState("Ctrl K");

  useEffect(() => {
    const platform = navigator.platform || "";
    setShortcut(/Mac|iPhone|iPad/i.test(platform) ? "⌘ K" : "Ctrl K");
  }, []);

  return (
    <header className="studyos-systembar">
      <div className="studyos-systembar-inner">
        <button className="studyos-brand" onClick={() => onNavigate("today")} aria-label="StudyOS Flow">
          <span className="studyos-brand-mark" aria-hidden="true"><Sparkles size={17} /></span>
          <span className="studyos-brand-name">StudyOS</span>
        </button>

        <nav className="studyos-primary-nav" aria-label="Päänavigaatio">
          {desktopCoreDestinations.map((target) => (
            <button
              key={target}
              aria-current={page === target ? "page" : undefined}
              className={page === target ? "is-active" : ""}
              onClick={() => onNavigate(target)}
            >
              <CoreIcon page={target} size={16} />
              {coreLabel(target)}
            </button>
          ))}
        </nav>

        <div className="studyos-systembar-spacer" />

        {!isCorePage(page) && <span className="studyos-current-context">{pageTitle}</span>}

        <button className="studyos-command" onClick={onSearch} aria-label={`Haku, ${shortcut}`}>
          <Search size={17} />
          <span>Hae</span>
          <kbd>{shortcut}</kbd>
        </button>

        <button className="studyos-icon-action studyos-log-action" onClick={onLog} aria-label="Kirjaa opiskelu">
          <Plus size={18} />
        </button>

        <button
          className={"studyos-more-trigger " + (moreOpen ? "is-active" : "")}
          onClick={() => onMoreOpenChange(!moreOpen)}
          aria-expanded={moreOpen}
          aria-label="Lisää näkymiä"
        >
          <span className="studyos-avatar">A</span>
          <ChevronDown size={15} />
          <span className="sr-only">Lisää</span>
        </button>
      </div>
    </header>
  );
}

function BottomInteractionZone({
  page,
  contextualAction,
  onNavigate,
  onSearch,
}: {
  page: StudyPage;
  contextualAction?: ReactNode;
  onNavigate: (page: StudyPage) => void;
  onSearch: () => void;
}) {
  return (
    <div className="bottom-interaction-zone">
      {contextualAction ? <div className="studyos-assistive-action bottom-context-action">{contextualAction}</div> : null}
      <MobileDock page={page} onNavigate={onNavigate} onSearch={onSearch} />
    </div>
  );
}

function MobileDock({
  page,
  onNavigate,
  onSearch,
}: {
  page: StudyPage;
  onNavigate: (page: StudyPage) => void;
  onSearch: () => void;
}) {
  return (
    <nav className="studyos-mobile-dock" aria-label="Mobiilinavigaatio">
      {mobileCoreDestinations.map((target) => (
        <button
          key={target}
          className={page === target ? "is-active" : ""}
          onClick={() => onNavigate(target)}
        >
          <CoreIcon page={target} size={20} />
          <span>{coreLabel(target)}</span>
        </button>
      ))}
      <button onClick={onSearch}>
        <Search size={20} />
        <span>Haku</span>
      </button>
    </nav>
  );
}

function DestinationLabel({ label }: { label: string }) {
  if (label === "Harjoittelu") return <b>Harjoittelu</b>;
  if (label === "Kokeet") return <b>Kokeet</b>;
  return <b>{label}</b>;
}

function MoreMenu({
  page,
  open,
  onClose,
  onNavigate,
  onLog,
  onSearch,
}: {
  page: StudyPage;
  open: boolean;
  onClose: () => void;
  onNavigate: (page: StudyPage) => void;
  onLog: () => void;
  onSearch: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const focusable = () => [...(rootRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    ) ?? [])];
    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const navigateFromSheet = (target: StudyPage) => {
    onClose();
    onNavigate(target);
  };

  const launchAfterClose = (action: () => void) => {
    onClose();
    window.setTimeout(action, 0);
  };

  return (
    <div ref={rootRef} className="studyos-menu-backdrop" role="presentation" onClick={onClose}>
      <aside
        className="studyos-more-menu"
        role="dialog"
        aria-modal="true"
        aria-label="StudyOS-valikko"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="studyos-more-head">
          <div>
            <p>StudyOS</p>
            <h2>Työtila</h2>
          </div>
          <button onClick={onClose} aria-label="Sulje"><X size={19} /></button>
        </div>

        <div className="studyos-more-grid">
          {secondaryDestinations.map(({ id, label, description, Icon }) => (
            <button key={id} className={page === id ? "is-active" : ""} onClick={() => navigateFromSheet(id)}>
              <Icon size={20} />
              <span><DestinationLabel label={label} /><small>{description}</small></span>
            </button>
          ))}
        </div>

        <div className="studyos-more-quick">
          <button onClick={() => launchAfterClose(onLog)}><Plus size={18} /> Kirjaa opiskelu</button>
          <button onClick={() => launchAfterClose(onSearch)}><Search size={18} /> Hae StudyOS:stä</button>
        </div>
      </aside>
    </div>
  );
}
