import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Headphones, List, Menu, Search, X } from "lucide-react";
import { readCachedDeviceUser } from "@/lib/deviceSession";
import { LOS_BOOKS, type LosBookDefinition, type LosChapter } from "./catalog";
import { LosAuthenticAudio, LosDictionary, LosIndexSearch, LosLearningPath, type LosDestination } from "./LosReferenceTools";
import { LosChapterGrammar } from "./LosGrammarChapters";
import "./los-book.css";
import "./los-appendix.css";

type LosSection = LosDestination;
type LosLocation = { book: number | null; chapter: string | null; section: LosSection };
const sections: { id: LosSection; label: string }[] = [
  { id: "chapter", label: "Aloitus" }, { id: "text", label: "Lue" }, { id: "vocabulary", label: "Sanasto" },
  { id: "grammar", label: "Kielioppi" }, { id: "practice", label: "Harjoitukset" },
];
const bookStyle = (book: LosBookDefinition): CSSProperties => ({
  "--los-book-accent": book.accent,
  "--los-book-tint": book.tint,
} as CSSProperties);
const strip = (text: string) => text.split(" – ");
function readLocation(): LosLocation {
  if (typeof window === "undefined") return { book: null, chapter: null, section: "overview" };
  const parts = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const parsedBook = Number(parts[0]);
  const book = Number.isInteger(parsedBook) && parsedBook >= 1 && parsedBook <= 8 ? parsedBook : null;
  const chapter = book === 1 && /^\d{2}$/.test(parts[1] ?? "") ? (parts[1] ?? null) : null;
  const token = parts[chapter ? 2 : 1];
  const section = (["overview", "contents", "chapter", "text", "vocabulary", "grammar", "practice", "appendix", "dictionary", "path", "search"].includes(token ?? "") ? token : chapter ? "chapter" : "overview") as LosSection;
  return { book, chapter, section };
}
function linkTo(book?: number, chapter?: string, section: LosSection = "overview") {
  return !book ? "#/" : chapter ? `#/${book}/${chapter}/${section}` : `#/${book}/${section}`;
}
function BookCover({ book, large = false }: { book: LosBookDefinition; large?: boolean }) {
  const [assetFailed, setAssetFailed] = useState(false);
  return (
    <span className={`los-cover ${large ? "los-cover-large" : ""}`} style={bookStyle(book)}>
      {!assetFailed ? (
        <img
          src={`/los/los-${book.id}-cover.webp`}
          alt={`LOS! ${book.id}: ${book.title}, kansikuva`}
          loading={large ? "eager" : "lazy"}
          onError={() => setAssetFailed(true)}
        />
      ) : (
        <span className="los-cover-fallback" aria-label={`LOS! ${book.id}: kannen typografinen väliaikaisesitys`}>
          <span className="los-cover-series">SAKSA B3 · OPPIKIRJASARJA</span>
          <span className="los-cover-mark">LOS<span aria-hidden="true">!</span></span>
          <span className="los-cover-number">{String(book.id).padStart(2, "0")}</span>
          <span className="los-cover-title">{book.title}</span>
          <span className="los-cover-foot">{book.code} · 2 op</span>
        </span>
      )}
    </span>
  );
}
function Brand({ compact = false }: { compact?: boolean }) {
  const [missing, setMissing] = useState(false);
  return <span className={`los-logo ${compact ? "los-logo-compact" : ""}`} aria-label="LOS!">{missing ? <>LOS<span>!</span></> : <img src="/los/los-logo.svg" alt="LOS!" onError={() => setMissing(true)} />}</span>;
}
function AccessGate() {
  return <main className="los-access">
    <Brand />
    <h1>Oppikirjasto kuuluu omaan opiskelutilaasi.</h1>
    <p>Avaa ensin Opintopäiväkirja tällä laitteella, niin pääset LOS!-oppikirjoihin.</p>
    <a href="/today" className="los-primary">Avaa Opintopäiväkirja <ArrowRight size={18} /></a>
  </main>;
}
function SeriesView({ openBook }: { openBook: (id: number) => void }) {
  return <div className="los-library">
    <header className="los-library-heading">
      <p className="los-eyebrow">KIELTEN OPPIKIRJASTO / SAKSA B3</p>
      <Brand />
      <h1>Kahdeksan kirjaa. Yksi uusi kieli.</h1>
      <p>LOS! on oma digitaalinen saksan oppikirjasarjasi. Avaa kirja, selaa sen sisällysluetteloa ja lue samalla tavalla kuin oikeaa oppikirjaa.</p>
    </header>
    <div className="los-rule-heading"><h2>Kirjasarja</h2><span>SAB31–SAB38 · LOPS21</span></div>
    <div className="los-library-shelf">
      {LOS_BOOKS.map(book => <button type="button" key={book.id} className="los-shelf-book" onClick={() => openBook(book.id)}>
        <BookCover book={book} />
        <strong>LOS! {book.id}</strong>
        <span>{book.title}</span>
        <small>{book.code} · {book.module}</small>
      </button>)}
    </div>
    <p className="los-library-footnote">Kirjasarjan taitto on käytössä. LOS! 1:n sisällysluettelon runko on tuotu suunnitelmasta; varsinaiset alkuperäistekstit ja äänitteet julkaistaan vain oikeus- ja laatutarkistuksen jälkeen. Kannet näyttävät hyväksytyt kuvat, kun ne lisätään sovelluksen kuvatiedostoihin.</p>
  </div>;
}
function BookFront({ book, move }: { book: LosBookDefinition; move: (chapter: string | null, section: LosSection) => void }) {
  return <>
    <div className="los-front">
      <div className="los-front-cover"><BookCover book={book} large /></div>
      <div className="los-front-copy">
        <p className="los-eyebrow">LOS! {book.id} / {book.code} / 2 op</p>
        <h1>{book.title}</h1>
        <div className="los-front-rule" />
        <p className="los-front-lead">{book.summary}</p>
        <p className="los-front-meta">{book.module} · LOPS21 · Saksa B3</p>
        <button className="los-primary" onClick={() => move(null, "contents")}>Avaa sisällysluettelo <ArrowRight size={18} /></button>
        {book.chapters.length > 0 && <button className="los-text-link" onClick={() => move("01", "chapter")}>Aloita kappaleesta 1 <ChevronRight size={17} /></button>}
      </div>
    </div>
    <div className="los-front-after">
      <p className="los-eyebrow">TÄSTÄ KIRJASTA</p>
      <h2>{book.theme}</h2>
      <p>{book.id === 1 ? "Opiskelet aluksi saksan ääntämistä ja tervehdyksiä. Sen jälkeen etenet oman nimen ja kotipaikan kertomiseen, numeroihin ja ensimmäisiin oikeisiin keskusteluihin." : book.summary}</p>
      <div className="los-front-links">
        <button onClick={() => move(null, "contents")}><List size={18} /> Sisällysluettelo</button>
        <button onClick={() => move(null, "path")}><BookOpen size={18} /> Opetuspolku</button>
        <button onClick={() => move(null, "dictionary")}><BookOpen size={18} /> Sanakirja</button>
        <button onClick={() => move(null, "appendix")}><BookOpen size={18} /> Kirjan liitteet</button>
      </div>
    </div>
  </>;
}
function Contents({ book, move }: { book: LosBookDefinition; move: (chapter: string | null, section: LosSection) => void }) {
  return <section className="los-inner-page">
    <p className="los-eyebrow">LOS! {book.id} · {book.code}</p>
    <h1>Sisällysluettelo</h1>
    <p className="los-page-intro">{book.module}. Kirjan kaikki kappaleet kuuluvat yhteen etenevään kokonaisuuteen.</p>
    {book.chapters.length ? <ol className="los-contents-list">
      {book.chapters.map(ch => <li key={ch.id}>
        <button onClick={() => move(ch.id, "chapter")}>
          <span className="los-content-number">{ch.id}</span>
          <span className="los-content-copy"><strong lang="de">{ch.title}</strong><small>{ch.subtitle}</small></span>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </li>)}
    </ol> : <div className="los-editorial-note"><h2>Kappalesuunnitelma viimeistellään</h2><p>Tälle kirjalle on vahvistettu moduuli, teema ja kansi-identiteetti. Tarkkaa kappalejakoa ei vielä ole hyväksytty, joten sitä ei näytetä keksittynä sisällysluettelona.</p></div>}
    <div className="los-contents-appendix">
      <button onClick={() => move(null, "path")}>Opetuspolku: 60 oppitunnin lukujärjestys <ArrowRight size={16} /></button>
      <button onClick={() => move(null, "dictionary")}>Kirjan sanakirja <ArrowRight size={16} /></button>
      <button onClick={() => move(null, "appendix")}>Liitteet ja kirjan tietoja <ArrowRight size={16} /></button>
    </div>
  </section>;
}
function ChapterOpening({ chapter, book, move }: { chapter: LosChapter; book: LosBookDefinition; move: (chapter: string | null, section: LosSection) => void }) {
  return <section className="los-opening">
    <p className="los-eyebrow">KAPITEL {Number(chapter.id)} / {book.chapters.length}</p>
    <div className="los-opening-head"><span className="los-opening-number">{chapter.id}</span><div><h1 lang="de">{chapter.title}</h1><p>{chapter.subtitle}</p></div></div>
    <div className="los-opening-bottom">
      <div>
        <p className="los-overline">TÄSSÄ KAPPALEESSA</p>
        <h2>Opit käyttämään saksaa</h2>
        <p className="los-opening-lead">Aloita uusi aihe sen keskeisistä sanoista ja rakenteista. Lähdeaineistot avataan samaan kirjaan, kun niiden tarkistus on valmis.</p>
      </div>
      <aside className="los-goals"><h3>Kappaleen tavoitteet</h3><ul>{chapter.objectives.map(goal => <li key={goal}>{goal}</li>)}</ul></aside>
    </div>
    <nav className="los-chapter-links" aria-label="Kappaleen osiot">
      {sections.slice(1).map(item => <button key={item.id} onClick={() => move(chapter.id, item.id)}><span>{item.label}</span><ArrowRight size={17} /></button>)}
    </nav>
  </section>;
}
function TextPage({ chapter }: { chapter: LosChapter }) {
  return <section className="los-inner-page los-reading-page">
    <p className="los-eyebrow">KAPPALE {chapter.id} / TEKSTI A</p>
    <h1>Lue ja kuuntele</h1>
    <p className="los-page-intro">Kappaleen alkuperäinen saksankielinen teksti luetaan tässä oppikirjassa, ei ulkopuolisella sivulla.</p>
    <div className="los-source-pending" role="status">
      <Headphones size={24} />
      <div><h2>Alkuperäistekstin julkaisu on kesken</h2>
        <p>Tekstin koko litteraatti ja kuuntelun tukiselitykset lisätään samaan lukijaan toimitus- ja käyttöoikeustarkistuksen jälkeen. Tässä ei käytetä keksittyä dialogia täytteenä.</p>
      </div>
    </div>
    <LosAuthenticAudio chapterId={chapter.id} />
    <div className="los-reader-sample">
      <p className="los-overline">KIELEN HAVAINTO · OPETUSESIMERKKI</p>
      <blockquote lang="de">Guten Tag!</blockquote>
      <p>Yksinkertainen tervehdys, jota käytetään päivällä. Tämä on opetusesimerkki, ei puuttuvan alkuperäistekstin korvike.</p>
    </div>
  </section>;
}
function Grammar({ chapter }: { chapter: LosChapter }) {
  const first = chapter.id === "01";
  return <section className="los-inner-page los-grammar-page">
    <p className="los-eyebrow">GRAMMATIK / KAPITEL {Number(chapter.id)}</p>
    <h1>Kielioppi</h1>
    <h2>{chapter.grammar}</h2>
    {first ? <>
      <p>Saksan opiskelun alussa kannattaa opetella muutama tervehdys kokonaisena ilmauksena. Ne ovat käytännöllisiä, vaikka et vielä tunne sanojen kielioppia.</p>
      <div className="los-example"><p lang="de">Guten Morgen!</p><span>Hyvää huomenta!</span></div>
      <div className="los-example"><p lang="de">Guten Tag!</p><span>Hyvää päivää!</span></div>
      <p><strong>Guten Morgen</strong> on aamun tervehdys. <strong>Guten Tag</strong> sopii päivään. Illalla sanotaan <strong>Guten Abend</strong>. Nämä ilmaukset kannattaa tässä vaiheessa opetella sellaisinaan.</p>
      <h3>Ensimmäiset ääntämissäännöt</h3>
      <table className="los-grammar-table"><thead><tr><th>Kirjain / yhdistelmä</th><th>Ääntäminen</th><th>Esimerkki</th></tr></thead><tbody>
        <tr><td>w</td><td>yleensä kuten suomen v</td><td lang="de">wie</td></tr>
        <tr><td>z</td><td>ts</td><td lang="de">zehn</td></tr>
        <tr><td>ei</td><td>ai</td><td lang="de">mein</td></tr>
        <tr><td>ie</td><td>pitkä i</td><td lang="de">wie</td></tr>
        <tr><td>sch</td><td>š-äänne</td><td lang="de">Schule</td></tr>
      </tbody></table>
      <aside className="los-grammar-aside"><strong>Huomaa</strong><p>Saksan substantiivit kirjoitetaan isolla alkukirjaimella. Kirjaimet ä, ö, ü ja ß tulevat tutuiksi vähitellen.</p></aside>
    </> : <LosChapterGrammar chapterId={chapter.id} />}
  </section>;
}
function Vocabulary({ chapter }: { chapter: LosChapter }) {
  const [query, setQuery] = useState("");
  const [showTranslations, setShowTranslations] = useState(true);
  const words = useMemo(() => chapter.vocabulary.map(strip).filter(parts => parts.join(" ").toLowerCase().includes(query.trim().toLowerCase())), [chapter, query]);
  return <section className="los-inner-page los-vocabulary-page">
    <p className="los-eyebrow">WORTSCHATZ / KAPITEL {Number(chapter.id)}</p>
    <h1>Sanasto</h1>
    <p className="los-page-intro">Kappaleen opetettavia sanoja ja ilmauksia. Tämä on tarkistettava ennakkoluettelo, ei vielä lopullinen sanakirjatietokanta.</p>
    <div className="los-vocabulary-tools">
      <label><Search size={17} /><span className="sr-only">Etsi sanastosta</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Etsi sanaa…" /></label>
      <button aria-pressed={!showTranslations} onClick={() => setShowTranslations(v => !v)}>{showTranslations ? "Piilota suomennokset" : "Näytä suomennokset"}</button>
    </div>
    <table className="los-word-table"><thead><tr><th>Deutsch</th><th>Suomi</th></tr></thead><tbody>
      {words.map((parts, i) => <tr key={i}><td lang="de">{parts[0]}</td><td>{showTranslations ? parts[1] ?? "" : <span className="los-hidden-translation">Piilotettu</span>}</td></tr>)}
    </tbody></table>
    {!words.length && <p>Sanastosta ei löytynyt hakua vastaavaa sanaa.</p>}
  </section>;
}
const practiceQuestions = [
  { question: "Mikä tervehdys sopii aamuun?", options: ["Guten Morgen!", "Guten Abend!", "Tschüss!"], correct: 0, why: "Morgen tarkoittaa aamua." },
  { question: "Mitä tarkoittaa Auf Wiedersehen?", options: ["Kiitos", "Näkemiin", "Hyvää huomenta"], correct: 1, why: "Auf Wiedersehen on tavallinen hyvästely." },
  { question: "Miten sanot saksaksi 'Hyvää päivää'?", options: ["Guten Tag!", "Gute Nacht!", "Bitte!"], correct: 0, why: "Guten Tag on päiväsaikaan käytettävä tervehdys." },
];
function Exercises({ chapter }: { chapter: LosChapter }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return <section className="los-inner-page los-exercise-page">
    <p className="los-eyebrow">ÜBEN / KAPITEL {Number(chapter.id)}</p>
    <h1>Harjoitukset</h1>
    {chapter.id === "01" ? <>
      <p className="los-page-intro">Harjoittele ensin tervehdyksiä. Nämä ovat erillisiä alkeiden malliharjoituksia, eivät vielä kappaleen varsinainen arvioiva testi.</p>
      {practiceQuestions.map((task, i) => <article className="los-exercise" key={task.question}>
        <div className="los-exercise-header"><span>{Number(chapter.id)}.{i + 1}</span><span>Valitse oikea vastaus</span></div>
        <h2>{task.question}</h2>
        <div className="los-answer-list" role="radiogroup" aria-label={task.question}>
          {task.options.map((option, j) => <label key={option} className={answers[i] === j ? "is-selected" : ""}><input type="radio" name={`los-ex-${i}`} checked={answers[i] === j} onChange={() => {setAnswers(prev => ({...prev, [i]: j}));setChecked(prev => ({...prev, [i]: false}));}} /><span lang="de">{option}</span></label>)}
        </div>
        <button className="los-exercise-check" disabled={answers[i] === undefined} onClick={() => setChecked(prev => ({...prev, [i]: true}))}>Tarkista vastaus</button>
        {checked[i] && <p role="status" className={answers[i] === task.correct ? "los-answer-right" : "los-answer-wrong"}>{answers[i] === task.correct ? "Oikein. " : "Ei aivan. "}{task.why}{answers[i] !== task.correct ? ` Oikea vastaus: ${task.options[task.correct]}` : ""}</p>}
      </article>)}
    </> : <div className="los-editorial-note"><h2>Tehtävät ovat toimituksessa</h2><p>Kappaleen tehtävätyypit ja arviointitavoitteet on määritelty sisältösuunnitelmassa. Valmiiksi merkitään vain todelliset, tarkistetut tehtävät.</p></div>}
  </section>;
}
function Appendix({ book }: { book: LosBookDefinition }) {
  return <section className="los-inner-page los-appendix">
    <p className="los-eyebrow">LOS! {book.id} / LIITTEET</p>
    <h1>Kirjan liitteet</h1>
    <div className="los-appendix-section"><h2>Kirjan tiedot</h2><dl><div><dt>Moduuli</dt><dd>{book.code} · {book.module}</dd></div><div><dt>Laajuus</dt><dd>2 op</dd></div><div><dt>Oppimäärä</dt><dd>Saksa B3 · LOPS21</dd></div></dl></div>
    <div className="los-appendix-section"><h2>Lähteet ja materiaalit</h2><p>Alkuperäistekstit, puheäänitteet ja videot kirjataan tähän lähde- ja lisenssitietoineen vasta tarkistuksen jälkeen. LOS! 1:n aineistokatalogi on lähdesuunnitelma, ei valmis julkaistu materiaalipaketti.</p></div>
    <div className="los-appendix-section"><h2>Opetuspolku, sanakirja ja kokeet</h2><p>Opetuspolun lukujärjestys ja sanakirjahakemisto löytyvät nyt kirjan omasta valikosta. Kertausten, kokeiden arvioinnin ja pilvisynkronoidun edistymisen toteutus on vielä kesken.</p></div>
  </section>;
}
function LosBookWorkspace({ book, location, move, goLibrary, openBook }: { book: LosBookDefinition; location: LosLocation; move: (chapter: string | null, section: LosSection) => void; goLibrary: () => void; openBook: (id: number) => void }) {
  const chapter = book.chapters.find(c => c.id === location.chapter) ?? null;
  const [tocOpen, setTocOpen] = useState(false);
  useEffect(() => setTocOpen(false), [location]);
  const openChapter = (ch: LosChapter) => move(ch.id, "chapter");
  const previousIndex = chapter ? book.chapters.findIndex(c => c.id === chapter.id) : -1;
  const next = previousIndex >= 0 ? book.chapters[previousIndex + 1] : null;
  const previous = previousIndex > 0 ? book.chapters[previousIndex - 1] : null;
  const section = chapter ? location.section : ["contents", "appendix", "dictionary", "path", "search"].includes(location.section) ? location.section : "overview";
  return <div className="los-book-workspace" style={bookStyle(book)}>
    <header className="los-book-topbar">
      <button className="los-back-library" onClick={goLibrary} aria-label="Takaisin kirjasarjaan"><ChevronLeft size={19} /> <span>Kirjasarja</span></button>
      <button className="los-top-title" onClick={() => move(null, "overview")}><Brand compact /><span> / {book.id} <span className="los-top-separator">·</span> {book.code}</span></button>
      <div className="los-top-actions"><button className="los-top-search" onClick={() => move(null, "search")} aria-label="Hae oppikirjasta"><Search size={19}/></button><button className="los-top-toc" onClick={() => setTocOpen(v => !v)} aria-expanded={tocOpen} aria-controls="los-mobile-toc">{tocOpen ? <X size={19} /> : <Menu size={19} />}<span>Sisältö</span></button></div>
    </header>
    <div className="los-book-layout">
      <aside className={`los-book-sidebar ${tocOpen ? "is-open" : ""}`} id="los-mobile-toc" aria-label="Kirjan sisällysluettelo">
        <button className="los-sidebar-book" onClick={() => move(null, "overview")}><BookCover book={book} /><span><b>LOS! {book.id}</b><small>{book.title}</small></span></button>
        <div className="los-sidebar-heading">KIRJAN SIVUT</div>
        <nav>
          <button className={section === "contents" ? "is-active" : ""} onClick={() => move(null, "contents")}>Sisällysluettelo</button>
          {book.chapters.map(ch => <button key={ch.id} className={chapter?.id === ch.id ? "is-active" : ""} onClick={() => openChapter(ch)}><span className="los-sidebar-num">{ch.id}</span><span lang="de">{ch.title}</span></button>)}
          <div className="los-sidebar-heading">HAKEMISTOT</div>
          <button className={section === "path" ? "is-active" : ""} onClick={() => move(null, "path")}>Ohjattu opetuspolku</button>
          <button className={section === "dictionary" ? "is-active" : ""} onClick={() => move(null, "dictionary")}>Sanakirja</button>
          <button className={section === "search" ? "is-active" : ""} onClick={() => move(null, "search")}>Hae kirjasta</button>
          <button className={section === "appendix" ? "is-active" : ""} onClick={() => move(null, "appendix")}>Kirjan liitteet</button>
        </nav>
        <a className="los-sidebar-exit" href="/studies">Palaa Opintopäiväkirjaan <ArrowRight size={15} /></a>
      </aside>
      <main className="los-book-main" id="main-content" tabIndex={-1}>
        <div className="los-main-breadcrumb"><button onClick={() => move(null, "overview")}>LOS! {book.id}</button>{chapter ? <><ChevronRight size={12} /><button onClick={() => openChapter(chapter)}>Kappale {Number(chapter.id)}</button></> : null}{chapter && section !== "chapter" ? <><ChevronRight size={12} /><span>{sections.find(s => s.id === section)?.label}</span></> : null}</div>
        {chapter && section !== "overview" && section !== "contents" && section !== "appendix" && <nav className="los-section-nav" aria-label="Kappaleen osiot">
          {sections.map(item => <button key={item.id} className={section === item.id ? "is-active" : ""} onClick={() => move(chapter.id, item.id)}>{item.label}</button>)}
        </nav>}
        <div className="los-book-paper">
          {!chapter && section === "overview" ? <BookFront book={book} move={move} /> :
            section === "contents" ? <Contents book={book} move={move} /> :
            section === "appendix" ? <Appendix book={book} /> :
            section === "path" ? <LosLearningPath book={book} move={move} /> :
            section === "dictionary" ? <LosDictionary book={book} move={move} openBook={openBook} /> :
            section === "search" ? <LosIndexSearch book={book} move={move} /> :
            chapter ? (
              section === "text" ? <TextPage chapter={chapter} /> :
              section === "vocabulary" ? <Vocabulary key={chapter.id} chapter={chapter} /> :
              section === "grammar" ? <Grammar chapter={chapter} /> :
              section === "practice" ? <Exercises key={chapter.id} chapter={chapter} /> :
              <ChapterOpening book={book} chapter={chapter} move={move} />
            ) : <Contents book={book} move={move} />}
        </div>
        {chapter && <div className="los-pagination">
          {previous ? <button onClick={() => openChapter(previous)}><ChevronLeft size={18} /><span>Edellinen kappale<small lang="de">{previous.title}</small></span></button> : <span />}
          {next ? <button onClick={() => openChapter(next)}><span>Seuraava kappale<small lang="de">{next.title}</small></span><ChevronRight size={18} /></button> : <button onClick={() => move(null, "appendix")}>Kirjan liitteet <ChevronRight size={18} /></button>}
        </div>}
        <footer className="los-page-footer">LOS! · {book.code} · {book.module} <span>Oppikirjan visuaalinen ensimmäinen toteutus</span></footer>
      </main>
    </div>
    {tocOpen && <button className="los-toc-backdrop" aria-label="Sulje sisällysluettelo" onClick={() => setTocOpen(false)} />}
  </div>;
}
export function LosBook() {
  const [canOpen, setCanOpen] = useState<boolean | null>(null);
  const [location, setLocation] = useState<LosLocation>({ book: null, chapter: null, section: "overview" });
  useEffect(() => {
    setCanOpen(Boolean(readCachedDeviceUser()));
    const sync = () => { setLocation(readLocation()); window.scrollTo(0, 0); };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const move = (book: number | null, chapter: string | null = null, section: LosSection = "overview") => {
    const hash = linkTo(book ?? undefined, chapter ?? undefined, section);
    if (window.location.hash === hash) { setLocation(readLocation()); window.scrollTo(0, 0); }
    else window.location.hash = hash;
  };
  useEffect(() => {
    const title = location.book ? `LOS! ${location.book} · Saksan oppikirja` : "LOS! · Saksan oppikirjasarja";
    document.title = title;
    return () => { document.title = "StudyOS"; };
  }, [location.book]);
  if (canOpen === null) return <div className="los-loading" role="status">Avataan LOS!-oppikirjastoa…</div>;
  if (!canOpen) return <AccessGate />;
  const book = LOS_BOOKS.find(b => b.id === location.book);
  return <div className="los-app">
    {book ? <LosBookWorkspace book={book} location={location} move={(chapter, section) => move(book.id, chapter, section)} goLibrary={() => move(null)} openBook={id => move(id)} /> :
      <><div className="los-series-top"><a href="/studies"><ArrowLeft size={17} /> Opintopäiväkirjaan</a><span>LOS! · Saksa B3</span></div><SeriesView openBook={id => move(id)} /></>}
  </div>;
}
