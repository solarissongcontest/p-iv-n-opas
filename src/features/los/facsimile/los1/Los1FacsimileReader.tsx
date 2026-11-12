import {
  useEffect, useMemo, useRef, useState,
  type CSSProperties, type KeyboardEvent, type TouchEvent,
} from "react";
import {
  ArrowLeft, BookOpen, Bookmark, ChevronLeft, ChevronRight, Columns2,
  Focus, List, Maximize2, Minus, Plus, Search, X,
} from "lucide-react";
import { LOS_BOOKS } from "../../catalog";
import {
  LOS1_DRAFT_PAGES, LOS1_DRAFT_EDITION_ID,
  getDraftVisiblePageIndexes, moveDraftPage,
  type Los1DigitalTarget, type Los1DraftPage,
} from "./draftPages";
import "./facsimile.css";

type ViewChoice = "auto" | "single" | "spread" | "continuous";
type ResolvedView = "single" | "spread" | "continuous";
type SidebarTab = "contents" | "pages" | "bookmarks";
type Size = { width: number; height: number };

const SHEET_WIDTH = 440;
const SHEET_HEIGHT = 625;
const PAGE_STORAGE_KEY = "los1.facsimile.draft.lastPage";
const BOOKMARK_STORAGE_KEY = "los1.facsimile.draft.bookmarks";
const chapter01 = LOS_BOOKS.find(book => book.id === 1)?.chapters.find(ch => ch.id === "01");
const allChapters = LOS_BOOKS.find(book => book.id === 1)?.chapters ?? [];

function readStoredPageIndex(): number {
  if (typeof window === "undefined") return 0;
  const hashParts = window.location.hash.replace(/^#\\/?/, "").split("/");
  const id = hashParts[0] === "1" && hashParts[1] === "facsimile" ? hashParts[2] : undefined;
  const requestedIndex = LOS1_DRAFT_PAGES.findIndex(page => page.id === id);
  if (requestedIndex >= 0) return requestedIndex;
  try {
    const savedId = window.localStorage.getItem(PAGE_STORAGE_KEY);
    const savedIndex = LOS1_DRAFT_PAGES.findIndex(page => page.id === savedId);
    return Math.max(0, savedIndex);
  } catch {
    return 0;
  }
}

function readStoredBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(BOOKMARK_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string" && LOS1_DRAFT_PAGES.some(page => page.id === item))
      : [];
  } catch {
    return [];
  }
}

function PreviewSheet({ page }: { page: Los1DraftPage }) {
  const vocabulary = chapter01?.vocabulary.slice(0, 10).map(entry => {
    const breakAt = entry.indexOf(" – ");
    return breakAt >= 0 ? [entry.slice(0, breakAt), entry.slice(breakAt + 3)] : [entry, ""];
  }) ?? [];

  return <article className={`los1-facsimile-page los1-facsimile-page--${page.kind}`} aria-label={page.title}>
    {page.kind === "cover" ? (
      <img className="los1-facsimile-original-cover" src="/los/los-1-cover.jpeg" alt="LOS! 1:n alkuperäinen hyväksytty kansi" />
    ) : page.kind === "inside-cover" ? (
      <div className="los1-facsimile-inside-cover"><span>Etukannen sisäpuoli</span></div>
    ) : (
      <>
        <div className="los1-facsimile-topline">
          <span>LOS! 1</span>
          <span>TAITON ESIMAKU · EI JULKAISTU PAINOS</span>
        </div>
        {page.kind === "title" && <div className="los1-facsimile-title-page">
          <div className="los1-facsimile-title-mark">LOS! <span>1</span></div>
          <div>
            <p className="los1-facsimile-red-label">SAKSA B3 · LOPS21 · SAB31</p>
            <h1>Tutustu ja ihastu saksan kieleen</h1>
            <p>Perustason alkeet 1 · 2 op</p>
          </div>
          <p className="los1-facsimile-muted">Nimiölehden taittomalli. Julkaisutiedot ja alkuperäinen logo viimeistellään painoksen aineistosta.</p>
        </div>}
        {page.kind === "welcome" && <div className="los1-facsimile-body">
          <p className="los1-facsimile-red-label">WILLKOMMEN</p>
          <h1>Tervetuloa LOS! 1:een!</h1>
          <p>Aloitat saksan opiskelun ensimmäisistä arjen ilmauksista. Opit tervehtimään, esittäytymään ja ymmärtämään yksinkertaisia kohtaamisia.</p>
          <div className="los1-facsimile-note"><strong>Näin käytät kirjaa</strong><p>Lue ensin uusi teksti, tutustu sanastoon ja harjoittele opittuja ilmauksia. Äänitteet ja interaktiiviset vastaukset ovat LOS!-digikirjassa.</p></div>
          <p>Tämä sivu havainnollistaa tulevan alkutekstin taittoa. Lopullinen teksti ja kuvat tarkistetaan erikseen.</p>
        </div>}
        {page.kind === "contents" && <div className="los1-facsimile-body los1-facsimile-contents">
          <p className="los1-facsimile-red-label">INHALT</p>
          <h1>Sisällysluettelo</h1>
          <p className="los1-facsimile-muted">Painetut sivunumerot määräytyvät vasta lopullisessa taitossa.</p>
          <ol>{allChapters.map(ch => <li key={ch.id}><span>{ch.id}</span><div><strong lang="de">{ch.title}</strong><small>{ch.subtitle}</small></div></li>)}</ol>
        </div>}
        {page.kind === "chapter-photo" && <div className="los1-facsimile-chapter-photo">
          <span className="los1-facsimile-chapter-number">01</span>
          <div className="los1-facsimile-photo-space"><BookOpen size={34} strokeWidth={1.3} aria-hidden="true" /><span>Hyväksytty avausvalokuva lisätään tähän, kun kuvan oikeudet on tarkistettu.</span></div>
          <h1 lang="de">Hallo!</h1>
          <p>Ensimmäiset tervehdykset</p>
        </div>}
        {page.kind === "chapter-goals" && <div className="los1-facsimile-body los1-facsimile-chapter-goals">
          <p className="los1-facsimile-red-label">KAPITEL 01</p>
          <h1 lang="de">Hallo!</h1>
          <p className="los1-facsimile-lead">Aloitat tutustumalla tavallisiin tervehdyksiin ja ensimmäisiin saksan äänteisiin.</p>
          <div className="los1-facsimile-rule" />
          <h2>Tässä kappaleessa opit</h2>
          <ul>{chapter01?.objectives.map(goal => <li key={goal}>{goal}</li>)}</ul>
          <div className="los1-facsimile-note"><strong>Aloita tästä</strong><p>Kuuntele ensin tervehdyksiä ja huomaa, missä tilanteissa niitä käytetään.</p></div>
        </div>}
        {page.kind === "vocabulary" && <div className="los1-facsimile-body los1-facsimile-vocabulary">
          <p className="los1-facsimile-red-label">KAPITEL 01 · WORTSCHATZ</p>
          <h1>Ensimmäiset sanat</h1>
          <p className="los1-facsimile-muted">Ote nykyisestä suunnittelusanastosta. Sanat ja ilmaukset tarkistetaan ennen painosta.</p>
          <table><thead><tr><th>Deutsch</th><th>Suomi</th></tr></thead><tbody>
            {vocabulary.map(([de, fi]) => <tr key={de}><td lang="de">{de}</td><td>{fi}</td></tr>)}
          </tbody></table>
          <div className="los1-facsimile-note"><strong>Harjoitus</strong><p>Valitse listasta tilanteeseen sopiva tervehdys ja sano se ääneen.</p></div>
        </div>}
        {page.kind === "grammar" && <div className="los1-facsimile-body los1-facsimile-grammar">
          <p className="los1-facsimile-red-label">KAPITEL 01 · GRAMMATIK</p>
          <h1>Ääntäminen ja tervehdykset</h1>
          <p>Tutustu ensin tervehdyksiin kokonaisina ilmauksina. Niitä voit käyttää, vaikka et vielä osaisi taivuttaa verbejä.</p>
          <div className="los1-facsimile-example"><strong lang="de">Guten Morgen!</strong><span>Hyvää huomenta!</span></div>
          <div className="los1-facsimile-example"><strong lang="de">Guten Tag!</strong><span>Hyvää päivää!</span></div>
          <div className="los1-facsimile-example"><strong lang="de">Guten Abend!</strong><span>Hyvää iltaa!</span></div>
          <div className="los1-facsimile-note"><strong>Muista!</strong><p>Opettele ääntämistä myös kuuntelemalla. Varsinaiset IPA-esimerkit ja lähteistetyt äänitteet tulevat tarkistetusta opetusaineistosta.</p></div>
        </div>}
        <div className="los1-facsimile-page-foot"><span>LOS! 1 · Taittopilotti</span><span>{page.title}</span></div>
      </>
    )}
  </article>;
}

function PageSlot({ page, index, scale }: { page: Los1DraftPage; index: number; scale: number }) {
  return <div className="los1-facsimile-page-slot" data-facsimile-index={index}
    style={{ width: SHEET_WIDTH * scale, height: SHEET_HEIGHT * scale } as CSSProperties}>
    <div className="los1-facsimile-page-scaled" style={{ transform: `scale(${scale})` }}>
      <PreviewSheet page={page} />
    </div>
  </div>;
}

export function Los1FacsimileReader({
  onBack, onOpenDigital,
}: {
  onBack: () => void;
  onOpenDigital: (target: Los1DigitalTarget) => void;
}) {
  const [pageIndex, setPageIndex] = useState(readStoredPageIndex);
  const [requestedView, setRequestedView] = useState<ViewChoice>("auto");
  const [zoom, setZoom] = useState(1);
  const [size, setSize] = useState<Size>({ width: 960, height: 700 });
  const [sidebar, setSidebar] = useState<SidebarTab | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [jump, setJump] = useState("");
  const [jumpError, setJumpError] = useState("");
  const [bookmarks, setBookmarks] = useState(readStoredBookmarks);
  const [focusMode, setFocusMode] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const observe = new ResizeObserver(() => setSize({ width: element.clientWidth, height: element.clientHeight }));
    observe.observe(element);
    setSize({ width: element.clientWidth, height: element.clientHeight });
    return () => observe.disconnect();
  }, []);

  const actualView: ResolvedView = requestedView === "continuous" ? "continuous" :
    requestedView === "single" ? "single" :
      requestedView === "spread" ? (size.width >= 690 ? "spread" : "single") :
        size.width >= 960 && size.height >= 540 ? "spread" : "single";
  const visible = useMemo(() =>
    actualView === "continuous"
      ? LOS1_DRAFT_PAGES.map((_, index) => index)
      : getDraftVisiblePageIndexes(LOS1_DRAFT_PAGES, pageIndex, actualView),
  [actualView, pageIndex]);
  const currentPage = LOS1_DRAFT_PAGES[pageIndex] ?? LOS1_DRAFT_PAGES[0]!;
  const navigationMode = actualView === "spread" ? "spread" : "single";
  const navVisible = getDraftVisiblePageIndexes(LOS1_DRAFT_PAGES, pageIndex, navigationMode);
  const canPrevious = (navVisible[0] ?? 0) > 0;
  const canNext = (navVisible[navVisible.length - 1] ?? 0) < LOS1_DRAFT_PAGES.length - 1;
  const scale = Math.max(0.28, Math.min(
    (size.width - 52) / (SHEET_WIDTH * (actualView === "spread" ? 2 : 1) + (actualView === "spread" ? 6 : 0)),
    (size.height - 40) / SHEET_HEIGHT,
    1.5,
  ) * zoom);

  useEffect(() => {
    try {
      window.localStorage.setItem(PAGE_STORAGE_KEY, currentPage.id);
      const hash = `#/1/facsimile/${currentPage.id}`;
      if (window.location.hash !== hash) {
        window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}${hash}`);
      }
    } catch { /* Local preview navigation still works without storage. */ }
  }, [currentPage.id]);

  useEffect(() => {
    try { window.localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks)); }
    catch { /* Bookmarks remain usable in memory. */ }
  }, [bookmarks]);

  useEffect(() => {
    if (actualView === "continuous") {
      const element = viewportRef.current?.querySelector<HTMLElement>(`[data-facsimile-index="${pageIndex}"]`);
      element?.scrollIntoView({ block: "nearest", behavior: "instant" });
    } else viewportRef.current?.scrollTo({ top: 0, left: 0 });
  }, [actualView, pageIndex]);

  const go = (direction: -1 | 1) => {
    setPageIndex(index => moveDraftPage(LOS1_DRAFT_PAGES, index, navigationMode, direction));
  };
  const selectPage = (index: number) => {
    if (index < 0 || index >= LOS1_DRAFT_PAGES.length) return;
    setPageIndex(index);
    setSidebar(null);
    setSearchOpen(false);
  };
  const isBookmarked = bookmarks.includes(currentPage.id);
  const toggleBookmark = () => setBookmarks(old => isBookmarked
    ? old.filter(id => id !== currentPage.id)
    : [...old, currentPage.id]);
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("input, select, textarea, button, a, [contenteditable=true]")) return;
    if (event.key === "ArrowRight" || event.key === "PageDown") { event.preventDefault(); go(1); }
    else if (event.key === "ArrowLeft" || event.key === "PageUp") { event.preventDefault(); go(-1); }
    else if (event.key === "Home") { event.preventDefault(); selectPage(0); }
    else if (event.key === "End") { event.preventDefault(); selectPage(LOS1_DRAFT_PAGES.length - 1); }
    else if (event.key === "Escape") { setSidebar(null); setSearchOpen(false); setFocusMode(false); }
    else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") { event.preventDefault(); setSearchOpen(true); }
  };
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (actualView === "continuous" || zoom !== 1 || event.touches.length !== 1 ||
        (event.target as HTMLElement).closest("button, a, input, select")) {
      touchStart.current = null; return;
    }
    const finger = event.touches[0];
    touchStart.current = finger ? { x: finger.clientX, y: finger.clientY } : null;
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    const end = event.changedTouches[0];
    if (!start || !end || actualView === "continuous" || zoom !== 1) return;
    const dx = end.clientX - start.x;
    const dy = end.clientY - start.y;
    if (Math.abs(dx) >= 65 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  };
  const searchResults = LOS1_DRAFT_PAGES.flatMap((page, index) => {
    const haystack = [page.title, page.kind === "contents" ? allChapters.map(ch => ch.title).join(" ") : "",
      page.kind === "vocabulary" ? chapter01?.vocabulary.join(" ") : ""].join(" ").toLocaleLowerCase("fi");
    return query.trim() && haystack.includes(query.trim().toLocaleLowerCase("fi")) ? [{ page, index }] : [];
  });
  const jumpToIndex = () => {
    const value = Number(jump);
    if (!Number.isInteger(value) || value < 1 || value > LOS1_DRAFT_PAGES.length) {
      setJumpError("Anna olemassa oleva luonnossivun järjestysnumero."); return;
    }
    setJumpError(""); selectPage(value - 1); setJump("");
  };

  return <div className={`los1-facsimile-reader ${focusMode ? "is-focused" : ""}`} onKeyDown={onKeyDown}>
    <header className="los1-facsimile-toolbar">
      <button type="button" className="los1-facsimile-icon-button" aria-label="Palaa LOS! 1:n etusivulle" onClick={onBack}><ArrowLeft size={20}/></button>
      <div className="los1-facsimile-identity">
        <strong>LOS! 1 · Näköiskirja</strong>
        <span>Taittopohjan esikatselu</span>
      </div>
      <span className="los1-facsimile-draft-pill">LUONNOS</span>
      <div className="los1-facsimile-toolbar-actions">
        <button type="button" className="los1-facsimile-icon-button" aria-label="Hae näköiskirjan luonnoksesta" aria-pressed={searchOpen} onClick={() => { setSearchOpen(value => !value); setSidebar(null); }}><Search size={19}/></button>
        <button type="button" className="los1-facsimile-icon-button" aria-label={isBookmarked ? "Poista kirjanmerkki" : "Lisää kirjanmerkki"} aria-pressed={isBookmarked} onClick={toggleBookmark}><Bookmark size={19} fill={isBookmarked ? "currentColor" : "none"}/></button>
        <button type="button" className="los1-facsimile-icon-button" aria-label={focusMode ? "Poistu keskittymistilasta" : "Keskittymistila"} aria-pressed={focusMode} onClick={() => setFocusMode(value => !value)}><Focus size={19}/></button>
      </div>
    </header>
    <div className="los1-facsimile-notice" role="status">
      <strong>Rakenteen pilotti.</strong> Kansi on alkuperäinen. Sisäsivut ovat B5-taiton harjoitusversioita, eivät julkaistua oppikirjaa.
      PDF, autenttiset tekstisivut ja painetut sivunumerot tulevat tarkistuksen jälkeen.
    </div>
    {searchOpen && <section className="los1-facsimile-search" aria-label="Hae näköiskirjan taittopilotista">
      <label htmlFor="los1-facsimile-query">Hae luonnossivuilta</label>
      <div className="los1-facsimile-search-row"><input id="los1-facsimile-query" autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Esim. Hallo, sanasto…" /><button type="button" onClick={() => setSearchOpen(false)} aria-label="Sulje haku"><X size={18}/></button></div>
      {query.trim() && <div className="los1-facsimile-search-results">{searchResults.length ? searchResults.map(result =>
        <button key={result.page.id} type="button" onClick={() => selectPage(result.index)}>{result.page.title}<small>Luonnossivu {result.index + 1}</small></button>
      ) : <p>Ei osumia nykyisessä taittopilotissa.</p>}</div>}
    </section>}
    <div className="los1-facsimile-content">
      {sidebar && <>
        <button type="button" className="los1-facsimile-sidebar-backdrop" aria-label="Sulje sisältöpaneeli" onClick={() => setSidebar(null)}/>
        <aside className="los1-facsimile-sidebar" aria-label="Näköiskirjan navigointi">
          <div className="los1-facsimile-sidebar-head"><strong>Navigointi</strong><button type="button" onClick={() => setSidebar(null)} aria-label="Sulje navigointi"><X size={18}/></button></div>
          <div className="los1-facsimile-sidebar-tabs">
            {([["contents", "Sisällys"], ["pages", "Sivut"], ["bookmarks", "Merkit"]] as const).map(([id,label]) =>
              <button type="button" key={id} aria-pressed={sidebar === id} className={sidebar === id ? "is-active" : ""} onClick={() => setSidebar(id)}>{label}</button>)}
          </div>
          {sidebar === "contents" && <nav className="los1-facsimile-sidebar-list" aria-label="Taittopilotin osiot">
            {LOS1_DRAFT_PAGES.filter((_, i) => i === 0 || i === 2 || i === 3 || i === 4 || i === 5 || i === 7 || i === 8).map(page => {
              const index = LOS1_DRAFT_PAGES.indexOf(page);
              return <button type="button" key={page.id} aria-current={pageIndex === index ? "page" : undefined} onClick={() => selectPage(index)}>{page.title}<span>{index + 1}</span></button>;
            })}
          </nav>}
          {sidebar === "pages" && <div className="los1-facsimile-thumbnails">{LOS1_DRAFT_PAGES.map((page, index) =>
            <button key={page.id} type="button" className={pageIndex === index ? "is-active" : ""} aria-label={`Avaa luonnossivu ${index + 1}: ${page.title}`} onClick={() => selectPage(index)}>
              <span className={`los1-facsimile-thumb los1-facsimile-thumb--${page.kind}`}>{page.kind === "cover" ? <img src="/los/los-1-cover.jpeg" alt=""/> : <span>{page.title}</span>}</span>
              <small>{index + 1}</small>
            </button>)}</div>}
          {sidebar === "bookmarks" && <div className="los1-facsimile-sidebar-list">{bookmarks.length ? bookmarks.map(id => {
            const index = LOS1_DRAFT_PAGES.findIndex(page => page.id === id);
            return <button type="button" key={id} onClick={() => selectPage(index)}>{LOS1_DRAFT_PAGES[index]?.title ?? id}<span>{index + 1}</span></button>;
          }) : <p>Ei vielä kirjanmerkkejä tällä laitteella.</p>}</div>}
          <p className="los1-facsimile-sidebar-note">Sivunumerot tarkoittavat vain yhdeksää esikatselusivua. Lopullista painettua numerointia ei vielä ole.</p>
        </aside>
      </>}
      <div className="los1-facsimile-viewport" ref={viewportRef} tabIndex={0}
        role="region" aria-label="Painettujen sivujen taittopilotti"
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className={`los1-facsimile-pages los1-facsimile-pages--${actualView}`}>
          {visible.map(index => {
            const page = LOS1_DRAFT_PAGES[index]!;
            return <PageSlot key={page.id} index={index} page={page} scale={scale}/>;
          })}
        </div>
      </div>
    </div>
    <footer className="los1-facsimile-bottom">
      <button type="button" className="los1-facsimile-control" onClick={() => setSidebar(old => old ? null : "contents")} aria-expanded={sidebar !== null} aria-label="Avaa sisällys ja sivukuvat"><List size={19}/><span>Sisällys</span></button>
      <div className="los1-facsimile-page-controls">
        <button type="button" className="los1-facsimile-icon-button" onClick={() => go(-1)} disabled={!canPrevious} aria-label="Edellinen sivu tai aukeama"><ChevronLeft size={20}/></button>
        <form onSubmit={event => { event.preventDefault(); jumpToIndex(); }} className="los1-facsimile-jump">
          <label className="sr-only" htmlFor="los1-facsimile-page-number">Siirry luonnossivulle, 1–{LOS1_DRAFT_PAGES.length}</label>
          <input id="los1-facsimile-page-number" inputMode="numeric" pattern="[0-9]*" value={jump} onChange={event => { setJump(event.target.value); setJumpError(""); }} placeholder={`${pageIndex + 1} / ${LOS1_DRAFT_PAGES.length}`}/>
          <button type="submit" className="sr-only">Siirry</button>
        </form>
        <button type="button" className="los1-facsimile-icon-button" onClick={() => go(1)} disabled={!canNext} aria-label="Seuraava sivu tai aukeama"><ChevronRight size={20}/></button>
      </div>
      <div className="los1-facsimile-view-controls">
        <label className="sr-only" htmlFor="los1-facsimile-view">Sivun näyttötapa</label>
        <select id="los1-facsimile-view" value={requestedView} onChange={event => setRequestedView(event.target.value as ViewChoice)}>
          <option value="auto">Automaattinen</option>
          <option value="single">Yksi sivu</option>
          <option value="spread">Aukeama</option>
          <option value="continuous">Jatkuva</option>
        </select>
        <button type="button" className="los1-facsimile-icon-button" aria-label="Pienennä" disabled={zoom <= .5} onClick={() => setZoom(value => Math.max(.5, +(value - .25).toFixed(2)))}><Minus size={18}/></button>
        <button type="button" className="los1-facsimile-zoom" onClick={() => setZoom(1)} aria-label="Palauta sivun sovitus">{Math.round(zoom * 100)} %</button>
        <button type="button" className="los1-facsimile-icon-button" aria-label="Suurenna" disabled={zoom >= 4} onClick={() => setZoom(value => Math.min(4, +(value + .25).toFixed(2)))}><Plus size={18}/></button>
      </div>
      {jumpError && <span className="los1-facsimile-input-error" role="alert">{jumpError}</span>}
    </footer>
    <div className="los1-facsimile-context">
      <div><Columns2 size={17} aria-hidden="true"/><span>{currentPage.title}</span></div>
      {currentPage.digitalTarget && <button type="button" onClick={() => onOpenDigital(currentPage.digitalTarget!)}>Avaa tämä osio digikirjassa <Maximize2 size={15}/></button>}
    </div>
    <span className="sr-only">Painosversio: {LOS1_DRAFT_EDITION_ID}. Ei painettavaksi hyväksytty julkaisu.</span>
  </div>;
}
