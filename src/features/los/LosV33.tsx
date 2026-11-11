import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronRight, Search, X } from "lucide-react";
import type { LosBookDefinition } from "./catalog";
import { losExercisesFor } from "./exerciseBank";
import type { LosDestination } from "./LosReferenceTools";

type SectionLink = { id: LosDestination; label: string };

/** Reuses the approved banner file. Never crops or invents replacement artwork. */
export function LosBookBanner({ book }: { book: LosBookDefinition }) {
  const [missing, setMissing] = useState(false);
  useEffect(() => setMissing(false), [book.id]);
  return <div className={"los-v33-banner" + (missing ? " is-pending" : "")}>
    {missing
      ? <div className="los-v33-banner-pending" role="note">
          <strong>LOS! {book.id}</strong>
          <span>Kirjan hyväksytty banneri lisätään tähän.</span>
          <small>16:9-kuva näytetään kokonaisena. Tämä on väliaikainen aineistomerkintä, ei uusi kansikuva.</small>
        </div>
      : <img src={book.id === 1 ? "/los/los-1-banner.jpeg" : "/los/los-" + book.id + "-banner.webp"}
          alt={"LOS! " + book.id + ": kirjan bannerikuva"}
          loading="eager" onError={() => setMissing(true)} />}
  </div>;
}

export function LosContentsTree({
  book, chapterId, section, sections, cover, isOpen, close, navigate, navigateExercise,
}: {
  book: LosBookDefinition;
  chapterId: string | null;
  section: LosDestination;
  sections: SectionLink[];
  cover: ReactNode;
  isOpen: boolean;
  close: () => void;
  navigate: (chapter: string | null, section: LosDestination) => void;
  navigateExercise: (chapterId: string, exerciseId: string) => void;
}) {
  const asideRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState<string[]>([]);
  useEffect(() => { setFilter(""); setExpanded([]); }, [book.id]);
  useEffect(() => {
    if (chapterId) setExpanded(previous => previous.includes(chapterId) ? previous : [...previous, chapterId]);
  }, [chapterId]);
  useEffect(() => {
    if (!isOpen || !window.matchMedia("(max-width: 760px)").matches) return;
    const drawer = asideRef.current;
    if (!drawer) return;
    const focused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawer.querySelector<HTMLButtonElement>(".los-v33-close")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); return; }
      if (event.key !== "Tab") return;
      const controls = Array.from(drawer.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input:not([disabled])"))
        .filter(el => el.getClientRects().length > 0);
      if (!controls.length) return;
      const first = controls[0]!, last = controls[controls.length - 1]!;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      focused?.focus();
    };
  }, [isOpen, close]);
  const chapters = book.chapters.filter(ch =>
    (ch.id + " " + ch.title + " " + ch.subtitle).toLocaleLowerCase("fi")
      .includes(filter.trim().toLocaleLowerCase("fi")));
  return <aside ref={asideRef} className={"los-book-sidebar los-v33-sidebar" + (isOpen ? " is-open" : "")}
      id="los-mobile-toc" role={isOpen ? "dialog" : undefined} aria-modal={isOpen ? true : undefined}
      aria-label="Kirjan sisällysluettelo">
    <div className="los-v33-toc-title">
      <strong>Sisällysluettelo</strong>
      <button type="button" className="los-v33-close" onClick={close} aria-label="Sulje sisällysluettelo"><X size={18} /></button>
    </div>
    <button type="button" className="los-sidebar-book" onClick={() => navigate(null, "overview")}>
      {cover}<span><b>LOS! {book.id}</b><small>{book.title}</small></span>
    </button>
    <label className="los-v33-toc-search">
      <Search size={17} />
      <span className="sr-only">Suodata kappaleita</span>
      <input type="search" placeholder="Hae kappaletta…" value={filter} onChange={event => setFilter(event.target.value)} />
    </label>
    {!!book.chapters.length && <div className="los-v33-toc-bulk">
      <button type="button" onClick={() => setExpanded(book.chapters.map(ch => ch.id))}>Avaa kaikki</button>
      <button type="button" onClick={() => setExpanded([])}>Sulje kaikki</button>
    </div>}
    <nav aria-label="Kappaleiden ja sivujen navigaatio">
      <button type="button" className={!chapterId && section === "overview" ? "is-active" : ""}
        onClick={() => navigate(null, "overview")}>Kirjan etusivu</button>
      <button type="button" className={section === "contents" ? "is-active" : ""}
        onClick={() => navigate(null, "contents")}>Koko sisällysluettelo</button>
      {!!book.chapters.length && <div className="los-sidebar-heading">KAPPALEET</div>}
      {chapters.map(ch => <div className="los-v33-toc-chapter" key={ch.id}>
        <div className="los-v33-toc-row">
          <button type="button" className={"los-v33-chapter-link" + (chapterId === ch.id && section === "chapter" ? " is-active" : "")}
            aria-current={chapterId === ch.id && section === "chapter" ? "page" : undefined}
            onClick={() => navigate(ch.id, "chapter")}>
            <span className="los-sidebar-num">{ch.id}</span><span lang="de">{ch.title}</span>
          </button>
          <button type="button" className="los-v33-expand" aria-expanded={expanded.includes(ch.id) || Boolean(filter)}
            aria-controls={"los-toc-chapter-" + ch.id}
            aria-label={(expanded.includes(ch.id) ? "Sulje " : "Avaa ") + "kappaleen " + ch.id + " alaosiot"}
            onClick={() => setExpanded(previous => previous.includes(ch.id) ? previous.filter(id => id !== ch.id) : [...previous, ch.id])}>
            <ChevronRight size={17} className={expanded.includes(ch.id) || Boolean(filter) ? "is-expanded" : ""} />
          </button>
        </div>
        <div id={"los-toc-chapter-" + ch.id} className="los-v33-toc-children" hidden={!(expanded.includes(ch.id) || Boolean(filter))}>
          {sections.filter(item => item.id !== "chapter").map(item =>
            <button type="button" key={item.id}
              className={chapterId === ch.id && section === item.id ? "is-active" : ""}
              aria-current={chapterId === ch.id && section === item.id ? "page" : undefined}
              onClick={() => navigate(ch.id, item.id)}>{item.label}</button>)}
          {losExercisesFor(ch.id).length > 0 && <div className="los-v33-task-group">
            <div className="los-v33-task-group-label">Yksittäiset tehtävät</div>
            {losExercisesFor(ch.id).map((exercise, index) => <button type="button" key={exercise.id}
              className="los-v33-task-link" title={exercise.prompt}
              onClick={() => navigateExercise(ch.id, exercise.id)}>
              <span className="los-v33-task-number">{Number(ch.id)}.{index + 1}</span>
              <span>{exercise.instruction}</span>
            </button>)}
          </div>}
        </div>
      </div>)}
      {!chapters.length && !!book.chapters.length && <p className="los-v33-toc-empty">Hakua vastaavia kappaleita ei löytynyt.</p>}
      <div className="los-sidebar-heading">HAKEMISTOT JA TYÖKALUT</div>
      <button type="button" className={section === "path" ? "is-active" : ""} onClick={() => navigate(null, "path")}>Ohjattu opetuspolku</button>
      <button type="button" className={section === "dictionary" ? "is-active" : ""} onClick={() => navigate(null, "dictionary")}>Sanakirja</button>
      <button type="button" className={section === "search" ? "is-active" : ""} onClick={() => navigate(null, "search")}>Hae koko kirjasta</button>
      <button type="button" className={section === "appendix" ? "is-active" : ""} onClick={() => navigate(null, "appendix")}>Kirjan liitteet</button>
    </nav>
    <a className="los-sidebar-exit" href="/studies">Palaa Opintopäiväkirjaan <ChevronRight size={16} /></a>
  </aside>;
}