import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Headphones, List, Menu, Search, X } from "lucide-react";
import { readCachedDeviceUser } from "@/lib/deviceSession";
import { LOS_BOOKS, type LosBookDefinition, type LosChapter } from "./catalog";
import {losExercisesFor} from "./exerciseBank";
import {losReadingQuestions} from "./content/los1ReadingBank";
import { getLosChapterSourceGate } from "./content/sourceRegistry";
import {los1SupplementalSourceAudit} from "./los1SupplementalAudit";
import {LosVoiceDiagnostics} from "./LosVoiceDiagnostics";
import {LosVocabularyAudio} from "./LosVocabularyAudio";
import {LosReaderDisplayControls,readLosReaderSettings} from "./LosReaderDisplayControls";
import {LosSelectionAudio} from "./LosSelectionAudio";
import {los1AudioInventory,los1IPAAudit} from "./los1QualityAudit";
import {los1TokenIPADetail} from "./los1CourseGlossary";
import { LosAuthenticAudio, LosDictionary, LosIndexSearch, LosLearningPath, type LosDestination } from "./LosReferenceTools";
import { LosChapterGrammar } from "./LosGrammarChapters";
import { LosC01AuthenticText } from "./LosC01AuthenticText";
import { LosC02AuthenticText } from "./LosC02AuthenticText";
import { LosC02Understanding } from "./LosC02Understanding";
import { LosC06AgeReview, LosC06AgeUnderstanding } from "./LosC06AgeReview";
import { LosOpenTextPage, LosOpenTextUnderstanding } from "./LosOpenSourcePages";
import { getLosOpenDialogue } from "./content/los1OpenDialogues";
import { LosNotebook, LosWorkbook } from "./LosWorkbook";
import { LosBackups } from "./LosBackups";
import { LosBookStartAction } from "./LosBookStartAction";
import { Los1ChapterImage } from "./Los1ChapterImage";
import { Los1VisualLearning } from "./Los1VisualLearning";
import { LosMidtermExam } from "./LosMidtermExam";
import { LosStudyProgress } from "./LosStudyProgress";
import { LosRecallCards } from "./LosRecallCards";
import { LosReviewI } from "./LosReviewI";
import { LosReviewII } from "./LosReviewII";
import { LosFinalExam,LosFinalSummary } from "./LosFinalExam";
import { LosApplication, LosCulture, LosTextB, LosUnderstanding } from "./LosSupplementalSections";
import { LosHilfstextPage, LosLegacySourcePanel, LosRevisedTextPage, LosRevisedUnderstanding } from "./LosRevisedTextPages";
import "./los-book.css";
import "./los-appendix.css";
import "./los-workbook.css";
import "./los-cloud.css";
import "./los-backups.css";
import "./los-design-quality.css";

type LosSection = LosDestination;
type LosLocation = { book: number | null; chapter: string | null; section: LosSection };
/** LOS! 1 includes a third support text (Text C) in every chapter. */
const sections: { id: LosSection; label: string }[] = [
  { id:"chapter", label:"Aloita" },
  { id:"text", label:"Text A" },
  { id:"understand", label:"Ymmärrä" },
  { id:"vocabulary", label:"Sanasto" },
  { id:"grammar", label:"Kielioppi" },
  { id:"text-b", label:"Text B" },
  { id:"text-c", label:"Text C · Tukiteksti" },
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
  if (typeof window === "undefined") return { book: null, chapter: null, section: "overview" };
  const parts = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const parsedBook = Number(parts[0]);
  const book = Number.isInteger(parsedBook) && parsedBook >= 1 && parsedBook <= 8 ? parsedBook : null;
  const chapter = book === 1 && /^\d{2}$/.test(parts[1] ?? "") ? (parts[1] ?? null) : null;
  const token = parts[chapter ? 2 : 1];
  const section = (["overview", "contents", "chapter", "text", "vocabulary", "grammar", "practice", "appendix", "dictionary", "path", "search", "midterm", "review", "review-ii", "cards", "progress", "final", "summary", "understand", "text-b", "text-c", "apply", "culture", "test"].includes(token ?? "") ? token : chapter ? "chapter" : "overview") as LosSection;
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
    <p className="los-library-footnote">LOS! 1 sisältää kymmenen kappaletta, 60 ohjattua oppituntia, sanastot, harjoitukset ja saksankielisen synteettisen kuuntelun. Avaa kirja ja jatka suoraan viimeisimpään oppituntiisi. Autenttiset lisämateriaalit ja niiden lähdetiedot löytyvät kirjan sisältä. Muut LOS!-sarjan kirjat ovat suunnitteluvaiheessa.</p>
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
        <p className="los-opening-lead">Aloita uusi aihe sen keskeisistä sanoista ja rakenteista. Lue uusi Text A, harjoittele Text B:llä ja käytä Text C -tukitekstiä tarvittaessa. Autenttiset lisäaineistot säilyvät erikseen avattavina.</p>
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
function OriginalTextPage({ chapter }: { chapter: LosChapter }) {
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
function TextPage({ chapter }: { chapter: LosChapter }) {
  return <section className="los-inner-page los-reading-page">
    <LosRevisedTextPage chapterId={chapter.id} kind="A" />
    <LosLegacySourcePanel key={chapter.id+"-A"} chapterId={chapter.id} kind="A">
      <OriginalTextPage chapter={chapter} />
    </LosLegacySourcePanel>
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
      <div className="los-example"><p lang="de">Guten Morgen!</p><LosVocabularyAudio word="Guten Morgen!" kind="lause"/><span>Hyvää huomenta!</span></div>
      <div className="los-example"><p lang="de">Guten Tag!</p><LosVocabularyAudio word="Guten Tag!" kind="lause"/><span>Hyvää päivää!</span></div>
      <p><strong lang="de">Guten Morgen</strong><LosVocabularyAudio word="Guten Morgen" kind="ilmaus"/> on aamun tervehdys. <strong lang="de">Guten Tag</strong><LosVocabularyAudio word="Guten Tag" kind="ilmaus"/> sopii päivään. Illalla sanotaan <strong lang="de">Guten Abend</strong><LosVocabularyAudio word="Guten Abend" kind="ilmaus"/>. Nämä ilmaukset kannattaa tässä vaiheessa opetella sellaisinaan.</p>
      <h3>Ensimmäiset ääntämissäännöt</h3>
      <table className="los-grammar-table"><thead><tr><th>Kirjain / yhdistelmä</th><th>Ääntäminen</th><th>Esimerkki</th></tr></thead><tbody>
        <tr><td>w</td><td>yleensä kuten suomen v</td><td lang="de">wie<LosVocabularyAudio word="wie"/></td></tr>
        <tr><td>z</td><td>ts</td><td lang="de">zehn<LosVocabularyAudio word="zehn"/></td></tr>
        <tr><td>ei</td><td>ai</td><td lang="de">mein<LosVocabularyAudio word="mein"/></td></tr>
        <tr><td>ie</td><td>pitkä i</td><td lang="de">wie<LosVocabularyAudio word="wie"/></td></tr>
        <tr><td>sch</td><td>š-äänne</td><td lang="de">Schule<LosVocabularyAudio word="Schule"/></td></tr>
      </tbody></table>
      <aside className="los-grammar-aside"><strong>Huomaa</strong><p>Saksan substantiivit kirjoitetaan isolla alkukirjaimella. Kirjaimet ä, ö, ü ja ß tulevat tutuiksi vähitellen.</p></aside>
    </> : <LosChapterGrammar chapterId={chapter.id} />}
  </section>;
}
function Vocabulary({ chapter, move, bookId }: { chapter: LosChapter; bookId:number; move: (chapter:string|null,section:LosSection)=>void }) {
  const [query, setQuery] = useState("");
  const [showTranslations, setShowTranslations] = useState(true);
  const words = useMemo(() => chapter.vocabulary.map(strip).filter(parts => parts.join(" ").toLowerCase().includes(query.trim().toLowerCase())), [chapter, query]);
  return <section className="los-inner-page los-vocabulary-page">
    <p className="los-eyebrow">WORTSCHATZ / KAPITEL {Number(chapter.id)}</p>
    <h1>Sanasto</h1>
    <p className="los-page-intro">Kappaleen sanat ja ilmaukset. Kuuntele ääntämistä painamalla kaiutinta ja harjoittele muistamista piilottamalla suomennokset.</p>
    <button type="button" className="los-outline-button" onClick={() => move(chapter.id,"cards")}>Kertaa sanastoa korteilla</button>
    <div className="los-vocabulary-tools">
      <label><Search size={17} /><span className="sr-only">Etsi sanastosta</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Etsi sanaa…" /></label>
      <button aria-pressed={!showTranslations} onClick={() => setShowTranslations(v => !v)}>{showTranslations ? "Piilota suomennokset" : "Näytä suomennokset"}</button>
    </div>
    <table className="los-word-table"><thead><tr><th>Deutsch</th><th>Suomi</th></tr></thead><tbody>
      {words.map((parts, i) => {
        const ipa=bookId===1?los1TokenIPADetail(parts[0]??""):null;
        return <tr key={i}><td lang="de">{parts[0]}
          {bookId===1&&<LosVocabularyAudio word={parts[0]??""}/>}
          {ipa?.source==="editorial"&&<small className="los-vocab-ipa" aria-label="Toimituksellinen IPA-merkintä">{ipa.ipa}</small>}
        </td><td>{showTranslations ? parts[1] ?? "" : <span className="los-hidden-translation">Piilotettu</span>}</td></tr>;
      })}
    </tbody></table>
    {!words.length && <p>Sanastosta ei löytynyt hakua vastaavaa sanaa.</p>}
    <details className="los-vocab-ipa-note"><summary>Tietoa ääntämismerkinnöistä</summary><p>IPA näkyy vain erikseen toimitetuissa merkinnöissä; keskeneräisiä kone-ehdotuksia ei näytetä varmoina ohjeina. Kaiutinkuuntelu käyttää laitteen saksankielistä puheääntä.</p></details>
    {bookId===1&& !query.trim() && <div className="los-vocab-picture-after-words">{bookId===1&&<Los1VisualLearning key={chapter.id} chapterId={chapter.id} placement="vocabulary"/>}</div>}
  </section>;
}
function Appendix({ book }: { book: LosBookDefinition }) {
  const supplements=los1SupplementalSourceAudit();
  const audio=book.id===1?los1AudioInventory():null;
  const ipa=book.id===1?los1IPAAudit():null;
  return <section className="los-inner-page los-appendix">
    <p className="los-eyebrow">LOS! {book.id} / LIITTEET</p>
    <h1>Kirjan liitteet</h1>
    <div className="los-appendix-section"><h2>Kirjan tiedot</h2><dl><div><dt>Moduuli</dt><dd>{book.code} · {book.module}</dd></div><div><dt>Laajuus</dt><dd>2 op</dd></div><div><dt>Oppimäärä</dt><dd>Saksa B3 · LOPS21</dd></div></dl></div>

    {book.id===1&&audio&&ipa&&<div className="los-appendix-section los-quality-audit" aria-label="LOS! 1:n ääni- ja IPA-inventaario">
      <h2>Kuuntelujen ja IPA-merkintöjen alkuperä</h2>
      <p><strong>{audio.withSpeech}/{audio.total} tekstillä on saksankielinen puhekäsikirjoitus.</strong>
       Koko tekstien ja repliikkien kuuntelu käyttää tällä hetkellä laitteen puhesynteesiä.
       <strong> Sovittu pääkuunteluratkaisu on laitteen saksankielinen TTS, ei erillinen äänitepaketti.</strong>
       Erillisiä äänitiedostoja on {audio.recorded}/{audio.total}; niitä ei vaadita tämän oman oppikirjan valmistumiseen.</p>
      <p><strong>IPA-rivejä: {ipa.total}.</strong> Toimituksellisia merkintöjä {ipa.editorial}, 
       eSpeak-ohjelman koneellisia ehdotuksia {ipa.synthetic}, puuttuvia {ipa.missing}.
       Toimituksellinenkaan merkintä ei tarkoita ulkopuolisen asiantuntijan hyväksyntää. Opiskelijan ei tarvitse osata tarkistaa IPA-merkintöjen tai saksan ääntämisen oikeellisuutta.</p>
      <details>
        <summary>Tekstien TTS- ja tallennetun äänen tilat (30 tekstiä)</summary>
        <table><thead><tr><th>Teksti</th><th>Puhejaksoja</th><th>Äänite</th></tr></thead>
        <tbody>{audio.items.map(item=><tr key={item.id}>
          <td>{item.id}</td><td>{item.segmentCount}</td><td>Selaimen saksankielinen puhesynteesi; ei erillistä äänitiedostoa</td>
        </tr>)}</tbody></table>
      </details>
      <details>
        <summary>IPA-tarkistuslista, kaikki 173 sanastoriviä</summary>
        <table><thead><tr><th>Kappale / sana</th><th>IPA</th><th>Alkuperä</th></tr></thead>
        <tbody>{ipa.rows.map((row,index)=><tr key={row.chapterId+"-"+index}>
          <td>{row.chapterId} · <span lang="de">{row.word}</span></td>
          <td>{row.ipa??"Puuttuu"}</td>
          <td>{row.status==="editorial"?"Toimituksellinen":row.status==="espeak-candidate"?"Koneellinen ehdotus":"Puuttuu"}</td>
        </tr>)}</tbody></table>
      </details>
    </div>}
    {book.id===1&&<div className="los-appendix-section">
      <h2>Synkronoinnin todellinen kahden laitteen koe</h2>
      <p>Automaattinen testi ei korvaa kahta oikeaa laitetta. Tee testi kirjautuneena
       samoilla tunnuksilla molemmilla laitteilla ja pidä tallennetuista vastauksista
       varmuuskopio ennen ristiriitatilanteen testaamista.</p>
      <ol>
       <li>Kirjoita tietokoneella kappaleen C01 muistiinpanoihin yksilöllinen testiteksti ja synkronoi se.</li>
       <li>Avaa sama kappale iPhonella, suorita synkronointi ja varmista että teksti näkyy täsmälleen.</li>
       <li>Muokkaa tekstiä iPhonella, synkronoi ja varmista muutos tietokoneella.</li>
       <li>Testaa erillinen konfliktitilanne kahdella eri muokkauksella. Varmista, ettei kumpikaan versio häviä.</li>
      </ol>
      <p>Tämä on kehityksen vapaaehtoinen tekninen tarkistuslista, ei oppilaan saksan taitoja mittaava tehtävä. Fyysisten laitteiden synkronointia ei ole tällä ohjeella todistettu.</p>
    </div>}
    {book.id===1&&<LosVoiceDiagnostics/>}
    {book.id===1&&<div className="los-appendix-section" aria-label="Autenttisten lisäaineistojen julkaisuauditointi">
      <h2>Autenttisten lisäaineistojen julkaisutilat</h2>
      <p>LOS!:n omat Text A–C -opetustekstit ovat sovitusti päätekstit. Ulkoiset ihmisten kirjoittamat aineistot ovat valinnaisia lisämateriaaleja, eivät päätekstien tai 60 oppitunnin hyväksyntäehto.</p>
      <p><strong>{supplements.total} rekisteröityä aineistoa · {supplements.published} kaikkien julkaisuehtojen mukaan hyväksyttyä.</strong> Oikeusvarmistus yksin ei riitä kieli- ja laitetestien hyväksynnäksi.</p>
      <details className="los-supplemental-audit">
        <summary>Näytä jokaisen lähteen tarkka tila</summary>
        <ul>{supplements.pending.map(item=><li key={item.id}>
          <strong>{item.id} · {item.description}</strong>
          <p>Tila: {item.stage}. {item.ready?"Julkaisuportit täyttyvät.":item.issues.join(" ")}</p>
          {item.sourceUrl&&<a href={item.sourceUrl} rel="noopener noreferrer" target="_blank">Aineiston lähdetieto</a>}
        </li>)}</ul>
      </details>
    </div>}
  </section>;
}
function LosBookWorkspace({ book, location, move, goLibrary, openBook }: { book: LosBookDefinition; location: LosLocation; move: (chapter: string | null, section: LosSection) => void; goLibrary: () => void; openBook: (id: number) => void }) {
  const chapter = book.chapters.find(c => c.id === location.chapter) ?? null;
  const [tocOpen, setTocOpen] = useState(false);
  const [readingView,setReadingView] = useState(readLosReaderSettings);
  const tocPanelRef=useRef<HTMLElement>(null);
  const tocTriggerRef=useRef<HTMLButtonElement>(null);
  const [tocSearch,setTocSearch] = useState("");
  const [expanded,setExpanded] = useState<Record<string,boolean>>({});
  const [focusTask,setFocusTask] = useState<string|null>(null);
  useEffect(() => {
    if(tocOpen && window.matchMedia("(max-width:760px)").matches){
      window.requestAnimationFrame(()=>document.getElementById("main-content")?.focus());
    }
    setTocOpen(false);
    // Route changes close the mobile menu; opening it alone must not trigger closing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  useEffect(()=>{
    if(!tocOpen || !window.matchMedia("(max-width:760px)").matches)return;
    const panel=tocPanelRef.current;
    const originalOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    const first=panel?.querySelector<HTMLElement>(".los-sidebar-close");
    first?.focus();
    const keyboard=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){
        event.preventDefault();
        setTocOpen(false);
        tocTriggerRef.current?.focus();
        return;
      }
      if(event.key!=="Tab"||!panel)return;
      const focusables=Array.from(panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]),input:not([disabled]),a[href],summary,select:not([disabled])'
      )).filter(el=>el.getClientRects().length>0);
      const start=focusables[0],end=focusables.at(-1);
      if(!start||!end)return;
      if(event.shiftKey && (document.activeElement===start||!panel.contains(document.activeElement))){
        event.preventDefault();end.focus();
      }else if(!event.shiftKey && (document.activeElement===end||!panel.contains(document.activeElement))){
        event.preventDefault();start.focus();
      }
    };
    document.addEventListener("keydown",keyboard);
    return()=>{document.removeEventListener("keydown",keyboard);document.body.style.overflow=originalOverflow;};
  },[tocOpen]);
  useEffect(()=>{
    if(!focusTask)return;
    const timer=window.setTimeout(()=>{
      const node=document.getElementById(focusTask);
      if(node){node.scrollIntoView({behavior:"smooth",block:"start"});setFocusTask(null);}
    },80);
    return ()=>window.clearTimeout(timer);
  },[focusTask,location]);
  const openTask=(ch:string,section:LosSection,taskId:string)=>{
    setFocusTask(taskId);
    move(ch,section);
  };
  const filteredChapters=book.chapters.filter(ch=>(ch.id+" "+ch.title+" "+ch.subtitle)
    .toLocaleLowerCase("fi").includes(tocSearch.trim().toLocaleLowerCase("fi")));
  const openChapter = (ch: LosChapter) => move(ch.id, "chapter");
  const previousIndex = chapter ? book.chapters.findIndex(c => c.id === chapter.id) : -1;
  const next = previousIndex >= 0 ? book.chapters[previousIndex + 1] : null;
  const previous = previousIndex > 0 ? book.chapters[previousIndex - 1] : null;
  const section = chapter ? location.section : ["contents", "appendix", "dictionary", "path", "search", "midterm", "review", "review-ii", "progress", "final", "summary"].includes(location.section) ? location.section : "overview";
  const selectedSection = section === "cards" ? "vocabulary" : section;
  const selectedSectionIndex = Math.max(0,sections.findIndex(item=>item.id===selectedSection));
  return <div className="los-book-workspace" style={bookStyle(book)} data-reading-size={readingView.size} data-reading-spacing={readingView.spacing} data-reading-measure={readingView.measure}>
    <header className="los-book-topbar">
      <button className="los-back-library" onClick={goLibrary} aria-label="Takaisin kirjasarjaan"><ChevronLeft size={19} /> <span>Kirjasarja</span></button>
      <button className="los-top-title" onClick={() => move(null, "overview")}><Brand compact /><span> / {book.id} <span className="los-top-separator">·</span> {book.code}</span></button>
      <div className="los-top-actions"><button className="los-top-search" onClick={() => move(null, "search")} aria-label="Hae oppikirjasta"><Search size={19}/></button><button ref={tocTriggerRef} className="los-top-toc" onClick={() => setTocOpen(v => !v)} aria-expanded={tocOpen} aria-controls="los-mobile-toc">{tocOpen ? <X size={19} /> : <Menu size={19} />}<span>Sisältö</span></button></div>
    </header>
    <div className="los-book-layout">
      <aside ref={tocPanelRef} className={`los-book-sidebar ${tocOpen ? "is-open" : ""}`} id="los-mobile-toc" role={tocOpen?"dialog":undefined} aria-modal={tocOpen?true:undefined} aria-label="Kirjan sisällysluettelo">
        {tocOpen&&<button className="los-sidebar-close" type="button" onClick={()=>{setTocOpen(false);tocTriggerRef.current?.focus();}}><X size={18} aria-hidden="true"/> Sulje sisällysluettelo</button>}
        <button className="los-sidebar-book" onClick={() => move(null, "overview")}><BookCover book={book} /><span><b>LOS! {book.id}</b><small>{book.title}</small></span></button>
        <div className="los-sidebar-heading">KIRJAN SIVUT</div>
        <nav>
          <button className={section === "contents" ? "is-active" : ""} onClick={() => move(null, "contents")}>Sisällysluettelo</button>
          <div className="los-sidebar-tree-controls">
             <label className="los-sidebar-tree-search"><Search size={14} aria-hidden="true"/><span className="sr-only">Suodata kappaleita</span><input
               value={tocSearch} onChange={event=>setTocSearch(event.target.value)} placeholder="Etsi kappaletta"/></label>
             <div className="los-sidebar-tree-actions">
               <button type="button" onClick={()=>setExpanded(Object.fromEntries(book.chapters.map(ch=>[ch.id,true])))}>Avaa kaikki</button>
               <button type="button" onClick={()=>setExpanded(Object.fromEntries(book.chapters.map(ch=>[ch.id,false])))}>Sulje kaikki</button>
             </div>
           </div>
           {filteredChapters.map(ch=>{
             const isExpanded=expanded[ch.id]??chapter?.id===ch.id;
             return <div className="los-sidebar-chapter-group" key={ch.id}>
               <div className="los-sidebar-chapter-head">
                 <button type="button" className={chapter?.id===ch.id?"is-active":""}
                   aria-current={chapter?.id===ch.id?"page":undefined}
                   onClick={()=>openChapter(ch)}><span className="los-sidebar-num">{ch.id}</span><span lang="de">{ch.title}</span></button>
                 <button type="button" className="los-sidebar-chapter-expand"
                   aria-label={(isExpanded?"Sulje ":"Avaa ")+ch.title+"-kappaleen alavalikko"}
                   aria-expanded={isExpanded} onClick={()=>setExpanded(prev=>({...prev,[ch.id]:!isExpanded}))}>
                   {isExpanded?"−":"+"}
                 </button>
               </div>
               {isExpanded&&<div className="los-sidebar-chapter-children" aria-label={"Kappaleen "+ch.id+" sivut"}>
                 {sections.slice(1).map(item=><div key={item.id}>
                   <button type="button" className={chapter?.id===ch.id&&section===item.id?"is-active":""}
                     aria-current={chapter?.id===ch.id&&section===item.id?"page":undefined}
                     onClick={()=>move(ch.id,item.id)}>{item.label}</button>
                   {book.id===1 && item.id==="understand" && <details className="los-sidebar-task-group">
                     <summary>Tekstitehtävät · 15</summary>
                     {(["A","B","C"] as const).map(kind=>
                       <div key={kind} className="los-sidebar-task-kind">
                         <span>Text {kind}</span>
                         {losReadingQuestions(ch.id,kind).map((item,i)=>
                           <button type="button" key={item.id} title={item.prompt}
                             onClick={()=>openTask(ch.id,kind==="A"?"text":kind==="B"?"text-b":"text-c",item.id)}>
                             Tehtävä {i+1} · {item.kind==="choice"?"Valinta":"Oma vastaus"}
                           </button>)}
                       </div>)}
                   </details>}
                   {book.id===1 && item.id==="practice" && <details className="los-sidebar-task-group">
                     <summary>Harjoitukset · {losExercisesFor(ch.id).length}</summary>
                     {losExercisesFor(ch.id).map((task,i)=><button type="button" key={task.id}
                       title={task.prompt} onClick={()=>openTask(ch.id,"practice",task.id)}>
                       Harjoitus {i+1} · {task.skill}
                     </button>)}
                   </details>}
                 </div>)}
               </div>}
             </div>;
           })}
          <div className="los-sidebar-heading">HAKEMISTOT</div>
          <button className={section === "path" ? "is-active" : ""} onClick={() => move(null, "path")}>Ohjattu opetuspolku</button>
          {book.id===1&&<button className={section === "progress" ? "is-active" : ""} onClick={() => move(null, "progress")}>Osaaminen ja eteneminen</button>}
          {book.id===1&&<><button className={section === "review" ? "is-active" : ""} onClick={() => move(null, "review")}>Kertaus I · L027–L029</button><button className={section === "midterm" ? "is-active" : ""} onClick={() => move(null, "midterm")}>Välikoe · C01–C05</button><button className={section === "review-ii" ? "is-active" : ""} onClick={() => move(null, "review-ii")}>Kertaus II · L056–L058</button><button className={section === "final" ? "is-active" : ""} onClick={() => move(null, "final")}>Loppukoe · EX-FINAL</button><button className={section === "summary" ? "is-active" : ""} onClick={() => move(null, "summary")}>Yhteenveto · L060</button></>}
          <button className={section === "dictionary" ? "is-active" : ""} onClick={() => move(null, "dictionary")}>Sanakirja</button>
          <button className={section === "search" ? "is-active" : ""} onClick={() => move(null, "search")}>Hae kirjasta</button>
          <button className={section === "appendix" ? "is-active" : ""} onClick={() => move(null, "appendix")}>Kirjan liitteet</button>
        </nav>
        <a className="los-sidebar-exit" href="/studies">Palaa Opintopäiväkirjaan <ArrowRight size={15} /></a>
      </aside>
      <main className="los-book-main" id="main-content" tabIndex={-1}>
        <div className="los-reader-context">
          <div className="los-main-breadcrumb">
            <button type="button" onClick={() => move(null, "overview")}>LOS! {book.id}</button>
            {chapter && <><ChevronRight size={12} aria-hidden="true"/><button type="button" onClick={() => openChapter(chapter)}>Kappale {Number(chapter.id)}</button></>}
            {chapter && section !== "chapter" && <><ChevronRight size={12} aria-hidden="true"/><span aria-current="page">{section==="cards" ? "Kertauskortit" : sections.find(s => s.id === section)?.label}</span></>}
          </div>
        </div>
        {book.id===1&&<LosSelectionAudio key={(chapter?.id??"book")+"-"+section}/>}
        {chapter && <nav className="los-section-nav" aria-label="Kappaleen osiot"
          style={{"--los-section-fill":`${((selectedSectionIndex+1)/sections.length)*100}%`} as CSSProperties}>
          <div className="los-section-location">
            <span className="los-section-index">KAPPALE {chapter.id} <span aria-hidden="true">·</span> OSIO {String(selectedSectionIndex+1).padStart(2,"0")} / {sections.length}</span>
            <strong>{section==="cards" ? "Kertauskortit" : sections[selectedSectionIndex]?.label}</strong>
          </div>
          <div className="los-section-actions">
            <label className="los-section-jump">
              <span className="sr-only">Valitse kappaleen osio</span>
              <select value={selectedSection} aria-label="Valitse kappaleen osio" onChange={event=>move(chapter.id,event.target.value as LosSection)}>
                {sections.map(item=><option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
            </label>
            {book.id===1 && ["text","text-b","text-c","vocabulary","grammar"].includes(section) &&
              <LosReaderDisplayControls value={readingView} onChange={setReadingView}/>}
            <button type="button" className="los-section-step" aria-label="Edellinen osio"
              disabled={selectedSectionIndex===0}
              onClick={()=>move(chapter.id,sections[Math.max(0,selectedSectionIndex-1)]!.id)}><ChevronLeft size={18}/></button>
            <button type="button" className="los-section-step" aria-label="Seuraava osio"
              disabled={selectedSectionIndex===sections.length-1}
              onClick={()=>move(chapter.id,sections[Math.min(sections.length-1,selectedSectionIndex+1)]!.id)}><ChevronRight size={18}/></button>
          </div>
        </nav>}
        <div className="los-book-paper">
          {!chapter && section === "overview" ? <BookFront book={book} move={move} /> :
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
              section === "understand" ? <section className="los-revised-understanding-host">
                 <LosRevisedUnderstanding chapterId={chapter.id} navigate={section=>move(chapter.id,section)}/>
                 <details className="los-revised-supplement">
                   <summary>Aiemman autenttisen lähdetekstin erilliset ymmärtämistehtävät</summary>
                   {(chapter.id==="02" ? <LosC02Understanding goToText={() => move(chapter.id,"text")}/> : chapter.id==="06" ? <><LosOpenTextUnderstanding chapterId="06" goToText={() => move(chapter.id,"text")}/><details className="los-editorial-note"><summary>C01:n ikäkertauksen vanhat ymmärtämistehtävät (L034)</summary><LosC06AgeUnderstanding goToText={() => move(chapter.id,"text")}/></details></> : getLosOpenDialogue(chapter.id) ? <LosOpenTextUnderstanding chapterId={chapter.id} goToText={() => move(chapter.id,"text")}/> : <LosUnderstanding chapter={chapter} goToText={() => move(chapter.id, "text")} />)}
                 </details>
               </section> :
               section === "vocabulary" ? <Vocabulary key={chapter.id} chapter={chapter} bookId={book.id} move={move} /> :
              section === "cards" ? <LosRecallCards key={chapter.id} chapter={chapter} onBack={()=>move(chapter.id,"vocabulary")} /> :
              section === "grammar" ? <Grammar chapter={chapter} /> :
              section === "text-b" ? <LosTextB chapter={chapter} /> :
               section === "text-c" ? <LosHilfstextPage chapterId={chapter.id} /> :
              section === "practice" ? <LosWorkbook key={`practice-${chapter.id}`} chapter={chapter} mode="practice" /> :
              section === "apply" ? <LosApplication key={chapter.id} chapter={chapter} /> :
              section === "culture" ? <LosCulture chapter={chapter} bookId={book.id} /> :
              section === "test" ? <LosWorkbook key={`test-${chapter.id}`} chapter={chapter} mode="test" /> :
              <ChapterOpening book={book} chapter={chapter} move={move} />
            ) : <Contents book={book} move={move} />}
        </div>
        {chapter && <LosNotebook key={`notes-${chapter.id}`} chapter={chapter} />}
        {chapter && <div className="los-pagination">
          {previous ? <button onClick={() => openChapter(previous)}><ChevronLeft size={18} /><span>Edellinen kappale<small lang="de">{previous.title}</small></span></button> : <span />}
          {next ? <button onClick={() => openChapter(next)}><span>Seuraava kappale<small lang="de">{next.title}</small></span><ChevronRight size={18} /></button> : <button onClick={() => move(null, "appendix")}>Kirjan liitteet <ChevronRight size={18} /></button>}
        </div>}
        <footer className="los-page-footer">LOS! · {book.code} · {book.module} <span>Itsenäinen opiskelu · LOPS21 · Saksa B3</span></footer>
      </main>
    </div>
    {tocOpen && <button className="los-toc-backdrop" tabIndex={-1} aria-label="Sulje sisällysluettelo" onClick={() => {setTocOpen(false);tocTriggerRef.current?.focus();}} />}
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
