import { useEffect, useRef, useState, type ReactNode } from "react";
import { BookOpen, Brain, CalendarDays, Ellipsis, FlaskConical, Plus, Search, Settings2, X } from "lucide-react";
import { LiquidGlass } from "@/components/LiquidGlass";
import { desktopPlanningNav, primaryStudyNav, type StudyPage } from "@/app/navigation";

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
    <div className="min-h-screen">
      <DesktopSidebar
        page={page}
        onNavigate={onNavigate}
        onLog={onLog}
        onSearch={onSearch}
      />

      <main id="main-content" tabIndex={-1} className={"app-main app-desktop-main px-4 "+(contextualAction?"app-main-has-context-action":"")}>
        <PageHeader
          title={pageTitle}
          eyebrow={pageEyebrow}
          onSearch={onSearch}
        />
        {children}
      </main>

      <BottomInteractionZone contextualAction={contextualAction}>
        <MobileTabBar
          page={page}
          moreOpen={moreOpen}
          onNavigate={onNavigate}
          onMore={() => onMoreOpenChange(!moreOpen)}
        />
      </BottomInteractionZone>

      <MoreSheet
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

function DesktopSidebar({
  page,
  onNavigate,
  onLog,
  onSearch,
}: {
  page: StudyPage;
  onNavigate: (page: StudyPage) => void;
  onLog: () => void;
  onSearch: () => void;
}) {
  const [searchShortcut, setSearchShortcut] = useState("Ctrl K");
  useEffect(() => {
    const platform = navigator.platform || "";
    setSearchShortcut(/Mac|iPhone|iPad/i.test(platform) ? "⌘ K" : "Ctrl K");
  }, []);

  return (
    <LiquidGlass
      lensing
      as="aside"
      className="desktop-sidebar fixed inset-y-4 left-4 z-20 hidden w-60 flex-col rounded-3xl p-4 md:flex"
    >
      <div className="mb-8 flex items-center gap-3 px-2 pt-2 font-semibold">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          <BookOpen size={20} />
        </span>
        <span className="sidebar-label">Opintopäiväkirja</span>
      </div>

      <nav aria-label="Päänavigaatio" className="space-y-1">
        {primaryStudyNav.map(({ id, label, Icon }) => (
          <button
            key={id}
            aria-label={label}
            aria-current={page === id ? "page" : undefined}
            data-tooltip={label}
            onClick={() => onNavigate(id)}
            className={
              "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm " +
              (page === id ? "bg-accent font-semibold" : "hover:bg-muted")
            }
          >
            <Icon className="shrink-0" size={19} />
            <span className="sidebar-label">{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-label mt-6 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Suunnittelu
      </div>
      <nav aria-label="Suunnittelu" className="mt-2 space-y-1">
        {desktopPlanningNav.map(({ id, label, Icon }) => (
          <button
            key={id}
            aria-label={label}
            aria-current={page === id ? "page" : undefined}
            data-tooltip={label}
            onClick={() => onNavigate(id)}
            className={
              "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm " +
              (page === id ? "bg-accent font-semibold" : "hover:bg-muted")
            }
          >
            <Icon className="shrink-0" size={19} />
            <span className="sidebar-label">{label}</span>
          </button>
        ))}
      </nav>

      <button
        aria-label="Kirjaa opiskelu"
        data-tooltip="Kirjaa opiskelu"
        className="mt-6 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-3 text-primary-foreground"
        onClick={onLog}
      >
        <Plus size={18} />
        <span className="sidebar-label">Kirjaa opiskelu</span>
      </button>

      <div className="mt-auto space-y-1">
        <button
          aria-label="Haku"
          data-tooltip="Haku"
          className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 hover:bg-muted"
          onClick={onSearch}
        >
          <Search className="shrink-0" size={19} />
          <span className="sidebar-label">Haku</span>
          <kbd className="sidebar-label ml-auto text-xs">{searchShortcut}</kbd>
        </button>
        <button
          aria-label="Asetukset"
          data-tooltip="Asetukset"
          className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 hover:bg-muted"
          onClick={() => onNavigate("settings")}
        >
          <Settings2 className="shrink-0" size={19} />
          <span className="sidebar-label">Asetukset</span>
        </button>
      </div>
    </LiquidGlass>
  );
}

function PageHeader({
  title,
  eyebrow,
  onSearch,
}: {
  title: string;
  eyebrow: string;
  onSearch: () => void;
}) {
  return (
    <>
      <header className="page-desktop-header mb-8 hidden items-end justify-between pt-7 md:flex">
        <div>
          <p className="text-sm text-muted-foreground">{eyebrow}</p>
          <h1 className="mt-1 text-3xl font-semibold">{title}</h1>
        </div>
      </header>

      <LiquidGlass lensing as="header" className="app-mobile-header md:hidden">
        <div className="min-w-0">
          <p className="truncate text-[12px] font-medium text-muted-foreground">{eyebrow}</p>
          <h1 className="mt-0.5 truncate text-[28px] font-semibold leading-tight">{title}</h1>
        </div>
        <div className="flex gap-1">
          <button aria-label="Haku" onClick={onSearch} className="app-icon-button glass-interactive">
            <Search size={20} />
          </button>
        </div>
      </LiquidGlass>
    </>
  );
}

function BottomInteractionZone({
  children,
  contextualAction,
}: {
  children: ReactNode;
  contextualAction?: ReactNode;
}) {
  return (
    <div className="bottom-interaction-zone">
      <div className="bottom-context-action">{contextualAction}</div>
      {children}
    </div>
  );
}

function MobileTabBar({
  page,
  moreOpen,
  onNavigate,
  onMore,
}: {
  page: StudyPage;
  moreOpen: boolean;
  onNavigate: (page: StudyPage) => void;
  onMore: () => void;
}) {
  return (
    <LiquidGlass lensing as="nav" aria-label="Mobiilinavigaatio" className="app-tabbar md:hidden">
      {primaryStudyNav.map(({ id, label, Icon }) => (
        <button
          key={id}
          aria-label={label}
          aria-current={page === id ? "page" : undefined}
          onClick={() => onNavigate(id)}
          className={"app-tab " + (page === id ? "app-tab-active" : "")}
        >
          <Icon size={21} />
          <span>{label}</span>
        </button>
      ))}
      <button
        aria-label="Lisää"
        aria-expanded={moreOpen}
        onClick={onMore}
        className={"app-tab " + (moreOpen || page === "plan" || page === "exams" || page === "settings" ? "app-tab-active" : "")}
      >
        <Ellipsis size={21} />
        <span>Lisää</span>
      </button>
    </LiquidGlass>
  );
}

function MoreSheet({
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
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
      const first = items[0], last = items[items.length - 1];
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

  return (
    <div ref={rootRef} className="app-sheet-backdrop md:hidden" role="presentation" onClick={onClose}>
      <LiquidGlass
        lensing
        as="aside"
        role="dialog"
        aria-modal="true"
        aria-label="Lisää toimintoja"
        className="app-sheet"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Opintopäiväkirja</p>
            <h2 className="text-xl font-semibold">Lisää</h2>
          </div>
          <button className="app-icon-button" aria-label="Sulje" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-2">
          <button
            className={"app-sheet-action " + (page === "plan" ? "app-sheet-action-active" : "")}
            onClick={() => onNavigate("plan")}
          >
            <CalendarDays size={22} />
            <span><b>Suunnitelma</b><small>Katso tulevat päivät</small></span>
          </button>
          <button
            className={"app-sheet-action " + (page === "practice" ? "app-sheet-action-active" : "")}
            onClick={() => onNavigate("practice")}
          >
            <Brain size={22} />
            <span><b>Harjoittelu</b><small>Tehtävät ja kertaus</small></span>
          </button>
          <button
            className={"app-sheet-action " + (page === "exams" ? "app-sheet-action-active" : "")}
            onClick={() => onNavigate("exams")}
          >
            <FlaskConical size={22} />
            <span><b>Kokeet</b><small>Koetila ja valmius</small></span>
          </button>
          <button className="app-sheet-action" onClick={onLog}>
            <Plus size={22} />
            <span><b>Kirjaa opiskelu</b><small>Nopea jälkikirjaus</small></span>
          </button>
          <button className="app-sheet-action" onClick={onSearch}>
            <Search size={22} />
            <span><b>Haku</b><small>Kurssit, aiheet ja toiminnot</small></span>
          </button>
          <button
            className={"app-sheet-action " + (page === "settings" ? "app-sheet-action-active" : "")}
            onClick={() => onNavigate("settings")}
          >
            <Settings2 size={22} />
            <span><b>Asetukset</b><small>Kapasiteetti ja muistutukset</small></span>
          </button>
        </div>
      </LiquidGlass>
    </div>
  );
}
