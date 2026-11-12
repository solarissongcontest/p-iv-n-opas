import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Headphones, List, Menu, Search, X } from "lucide-react";
import { readCachedDeviceUser } from "@/lib/deviceSession";
import { LOS_BOOKS, type LosBookDefinition, type LosChapter } from "./catalog";
import { getLosChapterSourceGate } from "./content/sourceRegistry";
import { LosAuthenticAudio, LosDictionary, LosIndexSearch, LosLearningPath, type LosDestination } from "./LosReferenceTools";
import { LosChapterGrammar } from "./LosGrammarChapters";
import { LosC01GrammarGuide } from "./LosC01GrammarGuide";
import { LosC01AuthenticText } from "./LosC01AuthenticText";
import { LosC02AuthenticText } from "./LosC02AuthenticText";
import { LosC02Understanding } from "./LosC02Understanding";
import { LosC06AgeReview, LosC06AgeUnderstanding } from "./LosC06AgeReview";
import { LosOpenTextPage, LosOpenTextUnderstanding } from "./LosOpenSourcePages";
import { getLosOpenDialogue } from "./content/los1OpenDialogues";
import { LosNotebook, LosWorkbook } from "./LosWorkbook";
import { LosBackups } from "./LosBackups";
import { LosBookStartAction } from "./LosBookStartAction";
import { LosDictionaryCard } from "./LosDictionaryCard";
import { LosContentTree } from "./LosContentTree";
import { isLosContentTask, type LosContentTask } from "./contentTreeModel";
import { getLosPronunciation } from "./pronunciation";
import { inspectLosVocabularyQA } from "./pronunciationPublication";
import { Los1FacsimilePilot } from "./facsimile/los1/Los1FacsimilePilot";
import { Los1C02FacsimilePilot } from "./facsimile/los1/Los1C02FacsimilePilot";
import { Los1C03FacsimilePilot } from "./facsimile/los1/Los1C03FacsimilePilot";
import { Los1C04FacsimilePilot } from "./facsimile/los1/Los1C04FacsimilePilot";
import { Los1ChapterImage } from "./Los1ChapterImage";
import { Los1VisualLearning } from "./Los1VisualLearning";
import { Los1PdfReader } from "./facsimile/los1/Los1PdfReader";
import { LosMidtermExam } from "./LosMidtermExam";
import { LosStudyProgress } from "./LosStudyProgress";
import { LosRecallCards } from "./LosRecallCards";
import { LosReviewI } from "./LosReviewI";
import { LosReviewII } from "./LosReviewII";
import { LosFinalExam,LosFinalSummary } from "./LosFinalExam";
import { LosApplication, LosCulture, LosTextB, LosUnderstanding } from "./LosSupplementalSections";
import "./los-book.css";
import "./los-appendix.css";
import "./los-workbook.css";
import "./los-cloud.css";
import "./los-backups.css";
import "./los-u3-content-tree.css";
import "./los-u3-split.css";

type LosSection = LosDestination | "facsimile-pdf" | "facsimile-c02" | "facsimile-c03" | "facsimile-c04";
type LosLocation = { book: number | null; chapter: string | null; section: LosSection; taskId: string | null };
/** Kymmenen näkyvää kappaleosiota LOS! 1:n kirjakohtaisen masterplanin mukaan. */
const sections: { id: LosSection; label: string }[] = [
  { id:"chapter", label:"Aloita" },
  { id:"text", label:"Teksti A" },
  { id:"understand", label:"Ymmärrä" },
  { id:"vocabulary", label:"Sanasto" },
  { id:"grammar", label:"Kielioppi" },
  { id:"text-b", label:"Teksti B" },
  { id:"practice", label:"Harjoittele" },
  { id:"apply", label:"Käytä saksaa" },
  { id:"culture", label:"Kulttuuri" },
  { id:"test", label:"Kappaletesti" },
];
const bookStyle = (book: LosBookDefinition): CSSProperties => ({
  "--los-book-accent": book.accent,
  "--los-book-tint": book.tint,
} as CSSProperties);
const strip = (text: string) => text.split(" – ");
function readLocation(): LosLocation {
  if (typeof window === "undefined") return { book: null, chapter: null, section: "overview", taskId: null };
  const parts = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const parsedBook = Number(parts[0]);
  const book = Number.isInteger(parsedBook) && parsedBook >= 1 && parsedBook <= 8 ? parsedBook : null;
  const chapter = book === 1 && /^\d{2}$/.test(parts[1] ?? "") ? (parts[1] ?? null) : null;
  const token = parts[chapter ? 2 : 1];
  const section = (["overview", "contents", "chapter", "text", "vocabulary", "grammar", "practice", "appendix", "dictionary", "path", "search", "midterm", "review", "review-ii", "cards", "progress", "final", "summary", "understand", "text-b", "apply", "culture", "test", "facsimile", "facsimile-pdf", "facsimile-c02", "facsimile-c03", "facsimile-c04"].includes(token ?? "") ? token : chapter ? "chapter" : "overview") as LosSection;
  const requestedTaskId = parts[3] ?? "";
  const taskId = chapter && (section === "practice" || section === "test") &&
    /^[A-Za-z0-9][A-Za-z0-9-]{1,90}$/.test(requestedTaskId) &&
    isLosContentTask(chapter, section, requestedTaskId) ? requestedTaskId : null;
  return { book, chapter, section, taskId };
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
          src={book.id === 1 ? "/los/los-1-cover.jpeg" : `/los/los-${book.id}-cover.webp`}
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
  return <span className={`los-logo ${compact ? "los-logo-compact" : ""}`} aria-label="LOS!">LOS!</span>;
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
    <p className="los-library-footnote">LOS! 1:n kaikki kymmenen kappaletta ja 60 ohjattua oppituntia ovat nyt opiskeltavissa oppikirjan sisällä. Alkuperäistekstit ja käytössä olevat äänilähteet näkyvät asianmukaisin lähdemerkinnöin. Lopullinen saksan kielen, äänentoiston ja tuotantojulkaisun laadunvarmistus on silti vielä kesken. Muut LOS!-sarjan kirjat ovat suunnitteluvaiheessa.</p>
  </div>;
}
function BookFront({ book, move }: { book: LosBookDefinition; move: (chapter: string | null, section: LosSection) => void }) {
  return <>
    <div className={`los-front ${book.id === 1 ? "los-front-has-banner" : ""}`}>
      {book.id === 1 ? (
        <div className="los-front-banner">
          <img src="/los/los-1-banner.jpeg" alt="LOS! 1 -kirjan kuvallinen banneri" loading="eager" />
        </div>
      ) : (
        <div className="los-front-cover"><BookCover book={book} large /></div>
      )}
      <div className="los-front-copy">
        {book.id === 1 && <div className="los-front-mini-cover"><BookCover book={book} /></div>}
        <p className="los-eyebrow">LOS! {book.id} / {book.code} / 2 op</p>
        <h1>{book.title}</h1>
        <div className="los-front-rule" />
        <p className="los-front-lead">{book.summary}</p>
        <p className="los-front-meta">{book.module} · LOPS21 · Saksa B3</p>
        {book.id===1?<LosBookStartAction move={move}/>:
          <button className="los-primary" onClick={() => move(null, "contents")}>Avaa sisällysluettelo <ArrowRight size={18} /></button>}
        {book.id===1&&<button className="los-text-link" onClick={()=>move(null,"facsimile")}>Selaa näköiskirjaa · C01-pilotti <BookOpen size={17}/></button>}
        {book.chapters.length > 0 && <button className="los-text-link"
          onClick={() => book.id===1?move(null,"contents"):move("01","chapter")}>
          {book.id===1?"Selaa sisällysluetteloa":"Aloita kappaleesta 1"} <ChevronRight size={17}/>
        </button>}
      </div>
    </div>
    <div className="los-front-after">
      <p className="los-eyebrow">TÄSTÄ KIRJASTA</p>
      <h2>{book.theme}</h2>
      <p>{book.id === 1 ? "Opiskelet aluksi saksan ääntämistä ja tervehdyksiä. Sen jälkeen etenet oman nimen ja kotipaikan kertomiseen, numeroihin ja ensimmäisiin oikeisiin keskusteluihin." : book.summary}</p>
      <div className="los-front-links">
        <button onClick={() => move(null, "contents")}><List size={18} /> Sisällysluettelo</button>
        {book.id === 1 && <button onClick={() => move(null, "path")}><BookOpen size={18} /> Opetuspolku</button>}
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
    {book.id===1&&<Los1ChapterImage key={chapter.id} chapterId={chapter.id}/>}
    <div className="los-opening-bottom">
      <div>
        <p className="los-overline">TÄSSÄ KAPPALEESSA</p>
        <h2>Opit käyttämään saksaa</h2>
        <p className="los-opening-lead">{chapter.id==="01" ? "Aloitat saksan aivan nollasta. Harjoittele ensin tervehdykset, lue Franzin ja Jörgin kokonainen alkuperäiskeskustelu, tutki sanoja ja vasta sitten tee tehtävät. Tekstin kielellinen ja audion laitetarkistus ovat vielä kesken." : "Tutustu kappaleen tavoitteisiin ja lue tekstin lähdetiedot. Opetussisällön sekä äänen julkaisu- ja laitetarkistus voivat vielä olla kesken."}</p>
      </div>
      <aside className="los-goals"><h3>Kappaleen tavoitteet</h3><ul>{chapter.objectives.map(goal => <li key={goal}>{goal}</li>)}</ul></aside>
    </div>
    <nav className="los-chapter-links" aria-label="Kappaleen osiot">
      {sections.slice(1).map(item => <button key={item.id} onClick={() => move(chapter.id, item.id)}><span>{item.label}</span><ArrowRight size={17} /></button>)}
    </nav>
  </section>;
}
const sampleByChapter:Record<string,string>={
  "07":"Wie schreibt man das?",
  "08":"Ich verstehe nicht.",
  "09":"Am Montag um drei Uhr.",
  "10":"Das ist Mia.",
};
function TextPage({ chapter }: { chapter: LosChapter }) {
  const sourceGate=getLosChapterSourceGate(chapter.id);
  if(chapter.id==="01")return <section className="los-inner-page los-reading-page">
    <p className="los-eyebrow">KAPPALE 01 / TEXT A</p>
    <h1>Lue ja kuuntele</h1>
    <p className="los-page-intro">Franzin ja Jörgin autenttinen keskustelu on tässä kokonaisena. Kuuntele alkuperäinen äänite ja napauta sanoja saadaksesi suomenkielisiä selityksiä. Tussilla voit tehdä omia korostuksia.</p>
    <LosAuthenticAudio chapterId="01" source="A" />
    <LosC01AuthenticText />
    {!sourceGate.ready && <div className="los-editorial-note" role="status">
      <h2>Sisällön tarkistus kesken</h2>
      <p>{sourceGate.issues.join(" ")} Tämä on oikeuksiltaan tarkistettu sisältöesikatselu, ei vielä hyväksytty valmis kappale.</p>
    </div>}
  </section>;
  if(chapter.id==="02")return <section className="los-inner-page los-reading-page">
    <p className="los-eyebrow">KAPPALE 02 / TEXT A</p>
    <h1>Lue ja ymmärrä</h1>
    <p className="los-page-intro">Franzin ja Gretan alkuperäinen kuuden repliikin keskustelu on luettavissa tässä kirjassa. Voit napauttaa sanoja, avata suomennokset ymmärtämissivulla ja tallentaa omia korostuksia. Lähteen äänitiedostojen erillisiä käyttöoikeuksia ei ole vielä varmistettu.</p>
    <LosC02AuthenticText />
    {!sourceGate.ready && <div className="los-editorial-note" role="status">
      <h2>Sisällön tarkistus kesken</h2>
      <p>{sourceGate.issues.join(" ")} Tämä on avoimeen julkaistuun aineistoon perustuva tekstiesikatselu, ei vielä valmis kappale.</p>
    </div>}
  </section>;
  if(chapter.id==="06")return <section className="los-inner-page los-reading-page">
    <p className="los-eyebrow">KAPPALE 06 / TEXT A / M-ZPE-01</p>
    <h1>Neljä alkuperäistä ikäkeskustelua</h1>
    <p className="los-page-intro">Monika Janickan neljä lyhyttä julkaistua dialogia ovat nyt kokonaan LOS!:n sisällä, ilman ulkoista lukulinkkiä. Harjoittele sanan avaamista ja tekstin korostamista. Uuden tekstin äänitettä ei ole vielä todennettu LOS!:ssa; aiempi C01-äänite on vain erillinen kertaus.</p>
    <LosOpenTextPage chapterId="06"/>
    <details className="los-editorial-note">
      <summary>Kertaa aiempi Franzin ja Jörgin keskustelu (C01, äänite)</summary>
      <LosC06AgeReview/>
    </details>
    {!sourceGate.ready && <div className="los-editorial-note" role="status">
      <h2>C06:n sisällön hyväksyntä on yhä kesken</h2>
      <p>{sourceGate.issues.join(" ")} Täysi uusi Text A on käytettävissä lähteeseen perustuvana esikatseluna; audiota, kielentarkistusta tai mobiili-/desktop-toistoa ei ilmoiteta valmiiksi.</p>
    </div>}
  </section>;
  if(chapter.id==="10")return <section className="los-inner-page los-reading-page">
    <p className="los-eyebrow">KAPPALE 10 / TEXT A / M-DIB-02</p>
    <h1>Haraldin kokonainen esittelyhaastattelu</h1>
    <p className="los-page-intro">Harald Beckerin julkaistu autenttinen haastattelu on nyt luettavissa kokonaisena suoraan LOS!:ssa. Lukija sisältää sanaselitykset ja tallennettavat korostukset. Lue kaikki 14 puheenvuoroa ja etsi nimen, kotipaikan, iän ja lempivärin ilmaukset. Puheäänen toistoa ei ole vielä testattu eikä sitä lasketa kuullunymmärtämiseksi.</p>
    <LosOpenTextPage chapterId="10"/>
    {!sourceGate.ready&&<div className="los-editorial-note" role="status">
      <h2>C10:n toimituksellinen tarkistus kesken</h2>
      <p>{sourceGate.issues.join(" ")} Lähteen monimutkaisemmat puhekielen rakenteet ovat vain tunnistamista varten. Alkuperäistekstiin sisältyvää julkista puhelinnumeron lukusarjaa ei saa käyttää yhteystietona eikä sitä tarvitse muistaa.</p>
    </div>}
  </section>;
  if(getLosOpenDialogue(chapter.id))return <section className="los-inner-page los-reading-page">
    <p className="los-eyebrow">KAPPALE {chapter.id} / TEXT A</p>
    <h1>Lue alkuperäinen keskustelu</h1>
    <p className="los-page-intro">Kokonainen julkaistu saksankielinen teksti on luettavissa tässä oppikirjassa. Sanoja voi avata, suomenkieliset tukiselitykset auttaa lukemista ja korostukset tallennetaan. Alkuperäisen mahdollisen äänitteen oikeus ja tekninen toisto tarkistetaan erikseen.</p>
    <LosOpenTextPage chapterId={chapter.id}/>
    {!sourceGate.ready && <div className="los-editorial-note" role="status">
      <h2>Sisällön tarkistus kesken</h2>
      <p>{sourceGate.issues.join(" ")} Tämä teksti on lähteeseen perustuva esikatselu, ei vielä hyväksytty valmis kappale.</p>
    </div>}
  </section>;
  const sample=sampleByChapter[chapter.id]??"Guten Tag!";
  return <section className="los-inner-page los-reading-page">
    <p className="los-eyebrow">KAPPALE {chapter.id} / TEKSTI A</p>
    <h1>Lue ja kuuntele</h1>
    <p className="los-page-intro">Tämän kappaleen koko saksankielinen alkuperäisteksti julkaistaan samaan oppikirjalukijaan, ei pelkkänä ulkopuolisena linkkinä. Teksti ei ole vielä julkaisuvalmis.</p>
    <div className="los-source-pending" role="status">
      <Headphones size={24} />
      <div><h2>Alkuperäistekstin julkaisu on kesken</h2>
        <p>Tekstin koko litteraatti ja kuuntelun tukiselitykset lisätään samaan lukijaan toimitus- ja käyttöoikeustarkistuksen jälkeen. Tässä ei käytetä keksittyä dialogia täytteenä.</p>
        {sourceGate.sourceId && <p><strong>Suunniteltu lähde: {sourceGate.sourceId}.</strong>{" "}
          {sourceGate.sourceUrl && <a href={sourceGate.sourceUrl} target="_blank" rel="noopener noreferrer">Lähdetiedot ja lisenssi</a>}.
          {" "}Linkki on lähdeviite, ei kirjan lukutekstin korvike.</p>}
        <p><strong>Julkaisuportit:</strong> {sourceGate.issues.join(" ")}</p>
      </div>
    </div>
    <LosAuthenticAudio chapterId={chapter.id} source="A" />
    <div className="los-reader-sample">
      <p className="los-overline">KIELEN HAVAINTO · OPETUSESIMERKKI</p>
      <blockquote lang="de">{sample}</blockquote>
      <p>Tämä on LOS!:n itse kirjoittama lyhyt kielioppiesimerkki. Se ei ole lähdetekstin sitaatti eikä korvaa puuttuvaa kokonaista alkuperäistekstiä.</p>
    </div>
  </section>;
}
function Grammar({ chapter }: { chapter: LosChapter }) {
  const first = chapter.id === "01";
  return <section className="los-inner-page los-grammar-page">
    <p className="los-eyebrow">GRAMMATIK / KAPITEL {Number(chapter.id)}</p>
    <h1>Kielioppi</h1>
    <h2>{chapter.grammar}</h2>
    {first ? <LosC01GrammarGuide /> : <LosChapterGrammar chapterId={chapter.id} />}
  </section>;
}
function Vocabulary({ chapter, bookId, move }: { chapter: LosChapter; bookId:number; move: (chapter:string|null,section:LosSection)=>void }) {
  const [query, setQuery] = useState("");
  const [showTranslations, setShowTranslations] = useState(true);
  const coverage = useMemo(() => inspectLosVocabularyQA(bookId,chapter.id), [bookId,chapter.id]);
  const [activeWord, setActiveWord] = useState<{word:string;meaning:string}|null>(null);
  const words = useMemo(() => chapter.vocabulary.map(strip).filter(parts => parts.join(" ").toLowerCase().includes(query.trim().toLowerCase())), [chapter, query]);
  return <section className="los-inner-page los-vocabulary-page">
    <p className="los-eyebrow">WORTSCHATZ / KAPITEL {Number(chapter.id)}</p>
    <h1>Sanasto</h1>
    <p className="los-page-intro">Kappaleen opetettavia sanoja ja ilmauksia. Tämä on tarkistettava ennakkoluettelo, ei vielä lopullinen sanakirjatietokanta.</p>
    <p className="los-vocabulary-qa" role="status">IPA:n lähde löytynyt {coverage.ipaSourced}/{coverage.total} riville; asiantuntijan hyväksymä IPA {coverage.ipaHumanReviewed}/{coverage.total}, hyväksytty sanaääni {coverage.audioApproved}/{coverage.total}. Julkaisuportti on vielä avoin.</p>
    {bookId===1&&<Los1VisualLearning key={chapter.id} chapterId={chapter.id} placement="vocabulary"/>}
    <button type="button" className="los-outline-button" onClick={() => move(chapter.id,"cards")}>Kertaa sanastoa korteilla</button>
    <div className="los-vocabulary-tools">
      <label><Search size={17} /><span className="sr-only">Etsi sanastosta</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Etsi sanaa…" /></label>
      <button aria-pressed={!showTranslations} onClick={() => setShowTranslations(v => !v)}>{showTranslations ? "Piilota suomennokset" : "Näytä suomennokset"}</button>
    </div>
    <table className="los-word-table"><thead><tr><th>Deutsch</th><th>IPA</th><th>Suomi</th></tr></thead><tbody>
      {words.map((parts, i) => {
        const word = parts[0] ?? "";
        const pronunciation = getLosPronunciation(word);
        return <tr key={i}>
          <td><button className="los-word-open" type="button" lang="de"
            onClick={() => setActiveWord({word,meaning:parts[1]??"Kontekstimerkitys tarkistamatta"})}
            aria-label={`Avaa sanan ${word} ääntäminen ja selitys`}>{word}</button></td>
          <td lang="de">{pronunciation?.ipa ? <span title="Lähteen sanamuoto tarkistettu; asiantuntija-arvio puuttuu">[{pronunciation.ipa}]</span> :
            <span className="los-ipa-pending">Tarkistamatta</span>}</td>
          <td>{showTranslations ? parts[1] ?? "" : <span className="los-hidden-translation">Piilotettu</span>}</td>
        </tr>;
      })}
    </tbody></table>
    {activeWord && <LosDictionaryCard word={activeWord.word} contextMeaning={activeWord.meaning}
      onClose={() => setActiveWord(null)} />}
    {!words.length && <p>Sanastosta ei löytynyt hakua vastaavaa sanaa.</p>}
  </section>;
}
function Appendix({ book }: { book: LosBookDefinition }) {
  return <section className="los-inner-page los-appendix">
    <p className="los-eyebrow">LOS! {book.id} / LIITTEET</p>
    <h1>Kirjan liitteet</h1>
    <div className="los-appendix-section"><h2>Kirjan tiedot</h2><dl><div><dt>Moduuli</dt><dd>{book.code} · {book.module}</dd></div><div><dt>Laajuus</dt><dd>2 op</dd></div><div><dt>Oppimäärä</dt><dd>Saksa B3 · LOPS21</dd></div></dl></div>
    <div className="los-appendix-section"><h2>Lähteet ja materiaalit</h2><p>Kymmenen kappaleen päätekstit, avointen lähteiden sisään kirjoitetut Text B -sisällöt ja käytössä olevat äänitteet ovat kirjan lukijoissa. Lähteiden oikeus-, kielitason, kuuntelun ja laitetestien portit pysyvät erillisinä. Pelkkä sisältöön integrointi ei merkitse materiaalia lopullisesti julkaisutestattavaksi.</p></div>
    <div className="los-appendix-section"><h2>Opetuspolku, sanakirja ja kappaletestit</h2><p>Opetuspolku ja sanakirja löytyvät kirjan valikosta. LOS! 1:n kaikissa kymmenessä kappaleessa on rajattu automaattisesti tarkistettava alkeistesti, yhteensä 147 osatehtävää. Kymmenen kappaleen lisäksi EX-MID (25 pistettä) ja EX-FINAL (50 pistettä) ovat käytettävissä; loppukokeessa oikeiden alkuperäisäänitteiden on toimittava ennen palautusta. Kuuntelun laitetestaus sekä puheen ja kirjoituksen ihmisen tekemä laadunarviointi ovat vielä erillisiä julkaisuvaatimuksia. LOS! 1:n oma välikoe sisältää 25 pisteytettävää tehtävää ja erillisen itsearvioitavan dialogin. Kappalekohtaisissa muistiinpanoissa on erillinen, salasanalla suojattu manuaalinen pilvisynkronointi, joka vaatii palvelimen käyttöönoton.</p></div>
    <LosBackups bookId={book.id} />
  </section>;
}
function LosBookWorkspace({ book, location, move, goLibrary, openBook }: { book: LosBookDefinition; location: LosLocation; move: (chapter: string | null, section: LosSection) => void; goLibrary: () => void; openBook: (id: number) => void }) {
  const chapter = book.chapters.find(c => c.id === location.chapter) ?? null;
  const [tocOpen, setTocOpen] = useState(false);
  const [splitOpen, setSplitOpen] = useState(false);
  const [splitInline, setSplitInline] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const splitTriggerRef = useRef<HTMLButtonElement>(null);
  const splitCloseRef = useRef<HTMLButtonElement>(null);
  useEffect(() => setTocOpen(false), [location]);
  useEffect(() => setSplitOpen(false), [book.id, location.chapter]);
  useEffect(() => {
    const element = mainRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const resize = () => {
      const style = window.getComputedStyle(element);
      const inside = element.clientWidth - parseFloat(style.paddingLeft || "0")
        - parseFloat(style.paddingRight || "0");
      setSplitInline(inside >= 1050);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!splitOpen) return;
    if (!splitInline) splitCloseRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSplitOpen(false);
        splitTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [splitOpen, splitInline]);
  useEffect(() => {
    if (!location.taskId) return;
    document.getElementById(location.taskId)?.scrollIntoView({block:"start"});
  }, [location.taskId,location.section,location.chapter]);
  const openTask = (task:LosContentTask) => {
    window.location.hash = `#/${book.id}/${task.chapterId}/${task.section}/${task.id}`;
  };
  const openChapter = (ch: LosChapter) => move(ch.id, "chapter");
  const previousIndex = chapter ? book.chapters.findIndex(c => c.id === chapter.id) : -1;
  const next = previousIndex >= 0 ? book.chapters[previousIndex + 1] : null;
  const previous = previousIndex > 0 ? book.chapters[previousIndex - 1] : null;
  const section = chapter ? location.section : ["contents", "appendix", "dictionary", "path", "search", "midterm", "review", "review-ii", "progress", "final", "summary","facsimile","facsimile-pdf","facsimile-c02","facsimile-c03","facsimile-c04"].includes(location.section) ? location.section : "overview";
  const sectionIndex = chapter ? sections.findIndex(item => item.id===section) : -1;
  const previousSection = chapter && sectionIndex>0 ? sections[sectionIndex-1] : null;
  const followingSection = chapter && sectionIndex>=0 && sectionIndex<sections.length-1
    ? sections[sectionIndex+1] : null;
  const splitEligible = Boolean(chapter && ["text", "understand", "grammar", "text-b"].includes(section));
  const splitVisible = splitOpen && splitEligible;
  const closeSplit = () => {
    setSplitOpen(false);
    splitTriggerRef.current?.focus();
  };
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
          <LosContentTree book={book} chapterId={chapter?.id??null} section={section === "facsimile-pdf" || section === "facsimile-c02" || section === "facsimile-c03" || section === "facsimile-c04" ? "facsimile" : section}
            activeTaskId={location.taskId} move={move} openTask={openTask} openBook={openBook} />
          <div className="los-sidebar-heading">HAKEMISTOT</div>
          <button className={section === "path" ? "is-active" : ""} onClick={() => move(null, "path")}>Ohjattu opetuspolku</button>
          {book.id===1&&<><button className={section==="facsimile"?"is-active":""} onClick={()=>move(null,"facsimile")}>Näköiskirja · C01-pilotti</button><button className={section==="facsimile-c02"?"is-active":""} onClick={()=>move(null,"facsimile-c02")}>Näköiskirja · C02-pilotti</button><button className={section==="facsimile-c03"?"is-active":""} onClick={()=>move(null,"facsimile-c03")}>Näköiskirja · C03-pilotti</button><button className={section==="facsimile-c04"?"is-active":""} onClick={()=>move(null,"facsimile-c04")}>Näköiskirja · C04-pilotti</button><button className={section==="facsimile-pdf"?"is-active":""} onClick={()=>move(null,"facsimile-pdf")}>PDF.js · paikallinen luonnos</button></>}
          {book.id===1&&<button className={section === "progress" ? "is-active" : ""} onClick={() => move(null, "progress")}>Osaaminen ja eteneminen</button>}
          {book.id===1&&<><button className={section === "review" ? "is-active" : ""} onClick={() => move(null, "review")}>Kertaus I · L027–L029</button><button className={section === "midterm" ? "is-active" : ""} onClick={() => move(null, "midterm")}>Välikoe · C01–C05</button><button className={section === "review-ii" ? "is-active" : ""} onClick={() => move(null, "review-ii")}>Kertaus II · L056–L058</button><button className={section === "final" ? "is-active" : ""} onClick={() => move(null, "final")}>Loppukoe · EX-FINAL</button><button className={section === "summary" ? "is-active" : ""} onClick={() => move(null, "summary")}>Yhteenveto · L060</button></>}
          <button className={section === "dictionary" ? "is-active" : ""} onClick={() => move(null, "dictionary")}>Sanakirja</button>
          <button className={section === "search" ? "is-active" : ""} onClick={() => move(null, "search")}>Hae kirjasta</button>
          <button className={section === "appendix" ? "is-active" : ""} onClick={() => move(null, "appendix")}>Kirjan liitteet</button>
        </nav>
        <a className="los-sidebar-exit" href="/studies">Palaa Opintopäiväkirjaan <ArrowRight size={15} /></a>
      </aside>
      <main className="los-book-main" ref={mainRef} id="main-content" tabIndex={-1}>
        <div className="los-main-breadcrumb"><button onClick={() => move(null, "overview")}>LOS! {book.id}</button>{chapter ? <><ChevronRight size={12} /><button onClick={() => openChapter(chapter)}>Kappale {Number(chapter.id)}</button></> : null}{chapter && section !== "chapter" ? <><ChevronRight size={12} /><span>{section==="cards" ? "Kertauskortit" : sections.find(s => s.id === section)?.label}</span></> : null}</div>
        {splitEligible && <div className="los-split-controls">
          <button type="button" ref={splitTriggerRef} aria-pressed={splitVisible}
            aria-controls="los-split-workbook" onClick={() => setSplitOpen(value => !value)}>
            {splitVisible ? "Sulje rinnakkaistehtävät" : "Kirja + tehtävät"}
          </button>
          <span>Vapaaehtoinen näkymä käyttää samoja tallennettuja vastauksia.</span>
        </div>}
        <div className={"los-reader-workarea"+(splitVisible ? splitInline ? " is-split" : " is-overlay" : "")}>
        <div className={"los-book-paper"+(section==="facsimile"||section==="facsimile-c02"||section==="facsimile-c03"||section==="facsimile-c04"?" los-book-paper-facsimile":section==="facsimile-pdf"?" los-book-paper-facsimile-pdf":"")}>
          {!chapter && section === "overview" ? <BookFront book={book} move={move} /> :
            section === "facsimile" && book.id===1 ? <Los1FacsimilePilot onOpenDigital={section=>move(section==="overview"||section==="appendix"?null:"01",section)} onOpenPdf={()=>move(null,"facsimile-pdf")} onOpenC02={()=>move(null,"facsimile-c02")}/> :
            section === "facsimile-c02" && book.id===1 ? <Los1C02FacsimilePilot onBack={()=>move(null,"facsimile")} onOpenC03={()=>move(null,"facsimile-c03")} onOpenDigital={section=>move(section==="appendix"?null:"02",section==="text-b-understand"?"text-b":section)} /> :
            section === "facsimile-c03" && book.id===1 ? <Los1C03FacsimilePilot onBack={()=>move(null,"facsimile-c02")} onOpenC04={()=>move(null,"facsimile-c04")} onOpenDigital={section=>move(section==="appendix"?null:"03",section==="text-b-understand"?"text-b":section)} /> :
            section === "facsimile-c04" && book.id===1 ? <Los1C04FacsimilePilot onBack={()=>move(null,"facsimile-c03")} onOpenDigital={section=>move(section==="appendix"?null:"04",section==="text-b-understand"?"text-b":section==="grammar-comparison"?"grammar":section)} /> :
            section === "facsimile-pdf" && book.id===1 ? <Los1PdfReader onBack={()=>move(null,"facsimile")} onOpenDigital={(section,chapterId)=>move(section==="overview"||section==="appendix"?null:(chapterId??"01"),section)} /> :
            section === "contents" ? <Contents book={book} move={move} /> :
            section === "appendix" ? <Appendix book={book} /> :
            section === "path" ? <LosLearningPath book={book} move={move} /> :
            section === "progress" && book.id===1 ? <LosStudyProgress book={book} move={move} /> :
            section === "midterm" && book.id===1 ? <LosMidtermExam /> :
            section === "review" && book.id===1 ? <LosReviewI move={move} /> :
            section === "review-ii" && book.id===1 ? <LosReviewII move={move} /> :
            section === "final" && book.id===1 ? <LosFinalExam move={move} /> :
            section === "summary" && book.id===1 ? <LosFinalSummary move={move} /> :
            section === "dictionary" ? <LosDictionary book={book} move={move} openBook={openBook} /> :
            section === "search" ? <LosIndexSearch book={book} move={move} /> :
            chapter ? (
              section === "text" ? <TextPage chapter={chapter} /> :
              section === "understand" ? (chapter.id==="02" ? <LosC02Understanding goToText={() => move(chapter.id,"text")}/> : chapter.id==="06" ? <><LosOpenTextUnderstanding chapterId="06" goToText={() => move(chapter.id,"text")}/><details className="los-editorial-note"><summary>C01:n ikäkertauksen vanhat ymmärtämistehtävät (L034)</summary><LosC06AgeUnderstanding goToText={() => move(chapter.id,"text")}/></details></> : getLosOpenDialogue(chapter.id) ? <LosOpenTextUnderstanding chapterId={chapter.id} goToText={() => move(chapter.id,"text")}/> : <LosUnderstanding chapter={chapter} goToText={() => move(chapter.id, "text")} />) :
              section === "vocabulary" ? <Vocabulary key={chapter.id} chapter={chapter} bookId={book.id} move={move} /> :
              section === "cards" ? <LosRecallCards key={chapter.id} chapter={chapter} onBack={()=>move(chapter.id,"vocabulary")} /> :
              section === "grammar" ? <Grammar chapter={chapter} /> :
              section === "text-b" ? <LosTextB chapter={chapter} /> :
              section === "practice" ? <LosWorkbook key={`practice-${chapter.id}`} chapter={chapter} mode="practice" /> :
              section === "apply" ? <LosApplication key={chapter.id} chapter={chapter} /> :
              section === "culture" ? <LosCulture chapter={chapter} bookId={book.id} /> :
              section === "test" ? <LosWorkbook key={`test-${chapter.id}`} chapter={chapter} mode="test" /> :
              <ChapterOpening book={book} chapter={chapter} move={move} />
            ) : <Contents book={book} move={move} />}
        </div>
        {splitVisible && chapter && <>
          {!splitInline && <button type="button" className="los-split-backdrop"
            aria-label="Sulje rinnakkaistehtävät" onClick={closeSplit} />}
          <aside id="los-split-workbook" className="los-split-workbook"
            role={splitInline ? "complementary" : "dialog"}
            aria-modal={splitInline ? undefined : true}
            aria-label="Rinnakkaiset harjoitukset"
            onKeyDown={event => {
              if (splitInline || event.key !== "Tab") return;
              const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
                "a[href],button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled)"
              )).filter(element => element.getClientRects().length > 0);
              const first = focusable[0], last = focusable[focusable.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); last?.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first?.focus();
              }
            }}>
            <div className="los-split-panel-top">
              <strong>Harjoitukset · {chapter.title}</strong>
              <button type="button" ref={splitCloseRef} onClick={closeSplit}>
                <X size={18} aria-hidden="true"/> Sulje
              </button>
            </div>
            <LosWorkbook key={"split-practice-"+chapter.id} chapter={chapter} mode="practice"/>
          </aside>
        </>}
        </div>
        {chapter && <LosNotebook key={`notes-${chapter.id}`} chapter={chapter} />}
        {chapter && sectionIndex>=0 && <nav className="los-section-pager"
          aria-label="Siirry kappaleen edelliseen tai seuraavaan osioon">
          {previousSection ? <button type="button"
            onClick={() => move(chapter.id,previousSection.id)}>
            <ChevronLeft size={17} aria-hidden="true"/>
            <span>Edellinen osio <strong>{previousSection.label}</strong></span>
          </button> : <span aria-hidden="true"/>}
          {followingSection ? <button type="button"
            onClick={() => move(chapter.id,followingSection.id)}>
            <span>Seuraava osio <strong>{followingSection.label}</strong></span>
            <ChevronRight size={17} aria-hidden="true"/>
          </button> : <span aria-hidden="true"/>}
        </nav>}
        {chapter && <div className="los-pagination">
          {previous ? <button onClick={() => openChapter(previous)}><ChevronLeft size={18} /><span>Edellinen kappale<small lang="de">{previous.title}</small></span></button> : <span />}
          {next ? <button onClick={() => openChapter(next)}><span>Seuraava kappale<small lang="de">{next.title}</small></span><ChevronRight size={18} /></button> : <button onClick={() => move(null, "appendix")}>Kirjan liitteet <ChevronRight size={18} /></button>}
        </div>}
        <footer className="los-page-footer">LOS! · {book.code} · {book.module} <span>Kappaleiden varmistettuja aineistoja täydennetään</span></footer>
      </main>
    </div>
    {tocOpen && <button className="los-toc-backdrop" aria-label="Sulje sisällysluettelo" onClick={() => setTocOpen(false)} />}
  </div>;
}
export function LosBook() {
  const [canOpen, setCanOpen] = useState<boolean | null>(null);
  const [location, setLocation] = useState<LosLocation>({ book: null, chapter: null, section: "overview", taskId: null });
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
