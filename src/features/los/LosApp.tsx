import { useLocation } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, List, RotateCcw, Sparkles } from "lucide-react";
import { LOS_BASE_PATH, LOS_BOOKS, bookPath, findLosBook } from "./books";
import type { Book, Chapter, ContentBlock } from "./model";
import { Reader, type ReaderNote } from "./Reader";
import { useLosRecord, losSyncMessage } from "./data/useLosRecord";
import { LessonRunner } from "./LessonRunner";
import { ExerciseEngine } from "./exercises/ExerciseEngine";

type NavItem = { segment: string; title: string };
const sections: readonly NavItem[] = [
  { segment: "", title: "Etusivu" },
  { segment: "sisalto", title: "Sisällysluettelo" },
  { segment: "opetuspolku", title: "Opetuspolku" },
  { segment: "kertaus", title: "Kertaa" },
  { segment: "sanastot", title: "Sanastot" },
  { segment: "kielioppi", title: "Kielioppi" },
  { segment: "sanakirja", title: "Sanakirja" },
  { segment: "muistiinpanot", title: "Muistiinpanot" },
  { segment: "osaaminen", title: "Osaaminen" },
  { segment: "kokeet", title: "Kokeet" },
  { segment: "mediat", title: "Mediat" },
  { segment: "lahteet", title: "Lähteet" },
];

function BookCover({ book, compact = false }: { book: Book; compact?: boolean }) {
  return <div className={"los-cover " + (compact ? "is-compact" : "")}>
    {book.coverAsset ? <img src={book.coverAsset} alt={"LOS! " + book.number + " -oppikirjan kansi"} loading="lazy" /> :
      <div className="los-cover-unavailable" aria-label="Kansikuvaa ei ole vielä saatavilla">
        <span>{book.moduleCode}</span><span>Kansikuva lisätään myöhemmin</span>
      </div>}
  </div>;
}
function Empty({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="los-empty" role="status"><BookOpen size={24} aria-hidden="true"/><h2>{title}</h2><p>{children}</p></section>;
}
function Navigation({ book, current }: { book: Book; current: string }) {
  return <nav aria-label={"LOS! " + book.number + " kirjan osiot"} className="los-nav">
    {sections.map(section => <a key={section.segment} href={section.segment === "sanakirja" ? LOS_BASE_PATH + "/sanakirja" : bookPath(book, section.segment)}
      aria-current={current === section.segment ? "page" : undefined}>
      {section.title}</a>)}
  </nav>;
}
function BookShell({ book, current, children }: { book: Book; current: string; children: React.ReactNode }) {
  const css = { "--los-book-accent": book.accent, "--los-book-tint": book.tint, "--los-book-accent-light": book.accent, "--los-book-accent-dark": book.accentDark } as React.CSSProperties;
  return <div className="los-app" style={css}>
    <div className="los-context"><a href={LOS_BASE_PATH}><ArrowLeft size={17}/> Kaikki kirjat</a><span>LOS! {book.number} · {book.moduleCode}</span></div>
    <div className="los-book-mobile-nav"><details><summary><List size={18}/> Kirjan valikko</summary><Navigation book={book} current={current}/></details></div>
    <div className="los-book-grid">
      <aside className="los-book-sidebar"><div className="los-sidebar-brand"><BookCover book={book} compact/><span><b>LOS! {book.number}</b><small>{book.title}</small></span></div><Navigation book={book} current={current}/></aside>
      <div className="los-main-content">{children}</div>
    </div>
  </div>;
}
function LibraryPage() {
  return <div className="los-app los-library">
    <div className="los-context"><a href="/studies"><ArrowLeft size={17}/> Opinnot</a></div>
    <header className="los-library-heading">
      <p className="los-eyebrow">OPPIKIRJASARJA · SAKSA B3</p>
      <p className="los-brand-label" aria-label="LOS!">LOS!</p>
      <h1>Saksan B3-oppikirjat</h1>
      <p>Kahdeksan itsenäistä digitaalista oppikirjaa. Voit avata kirjat vapaasti, ja opetus alkaa aivan perusteista.</p>
    </header>
    <h2 className="los-section-title">Kirjat</h2>
    <div className="los-library-grid">{LOS_BOOKS.map(book =>
      <a href={bookPath(book)} className="los-book-card" key={book.id}
        style={{ "--los-book-accent": book.accent, "--los-book-tint": book.tint, "--los-book-accent-light": book.accent, "--los-book-accent-dark": book.accentDark } as React.CSSProperties}>
        <BookCover book={book} />
        <strong>LOS! {book.number}</strong><span className="los-card-title">{book.title}</span>
        <small>{book.moduleCode} · {book.credits} op</small>
        <span className="los-card-status">Sisältöä valmistellaan</span>
      </a>)}</div>
    <p className="los-library-footnote">Kansikuvat ja varsinainen oppimateriaali lisätään vasta alkuperäisten assettien ja tarkistettujen sisältöpakettien mukana.</p>
  </div>;
}
function BookHome({ book }: { book: Book }) {
  return <div className="los-landing">
    <p className="los-eyebrow">LOS! {book.number} · {book.moduleCode} · {book.credits} OP</p>
    {book.bannerAsset && <img className="los-banner" alt={"LOS! " + book.number + " -kirjan banneri"} src={book.bannerAsset}/>}
    <div className="los-book-hero"><BookCover book={book}/>
      <div><p className="los-eyebrow">{book.moduleTitle}</p><h1>{book.title}</h1>
        <p>{book.description}</p>
        <a className="los-button los-button-primary" href={bookPath(book, book.lessons.some(lesson => lesson.steps.length > 0) ? "opetuspolku" : "sisalto")}>
          {book.lessons.some(lesson => lesson.steps.length > 0) ? "Siirry opetuspolkuun" : "Avaa sisällysluettelo"} <ArrowRight size={17}/>
        </a>
      </div>
    </div>
    {!book.lessons.some(lesson => lesson.steps.length > 0) && <p className="los-notice" role="status">Oppituntien sisältöä ei ole vielä julkaistu. Etenemistä ei lasketa ennen kuin oikeita opintosuorituksia on saatavilla.</p>}
    <h2 className="los-section-title">Tutustu kirjaan</h2>
    <div className="los-path-cards">
      <a href={bookPath(book, "sisalto")}><List size={20}/><b>Sisällysluettelo</b><span>Selaa tekstejä ja kappaleita.</span></a>
      <a href={bookPath(book, "opetuspolku")}><Sparkles size={20}/><b>Opetuspolku</b><span>Noin 30 minuutin ohjatut oppitunnit.</span></a>
      <a href={bookPath(book, "kertaus")}><RotateCcw size={20}/><b>Kertaa</b><span>Palauta aiemmin opittua mieleen.</span></a>
    </div>
    <h2 className="los-section-title">Kirjan työkalut</h2>
    <div className="los-tool-links">{sections.slice(4).map(section => <a key={section.segment} href={bookPath(book, section.segment)}>{section.title} <ArrowRight size={16}/></a>)}</div>
  </div>;
}
function Contents({ book }: { book: Book }) {
  return <section><h1>Sisällysluettelo</h1><p className="los-intro">{book.moduleCode} · {book.chapters.length} suunniteltua kappaletta · {book.chapters.filter(chapter => chapter.publicationStatus === "published").length} julkaistua</p>
    {!book.chapters.length ? <Empty title="Kappaleita ei ole vielä lisätty">Tähän ilmestyvät kirjan varsinaiset tekstit, kieliopit, sanastot ja tehtävät. Mitään tekaistua oppimateriaalia ei näytetä.</Empty> :
      <ol className="los-chapter-list">{book.chapters.map(chapter =>
        <li key={chapter.id}><details><summary><span className="los-chapter-number">{String(chapter.sequence).padStart(2, "0")}</span>
          <span><b>{chapter.title}</b><small>{chapter.introductionFi}</small></span><span>{chapter.publicationStatus === "published" ? "Katso sisältö" : "Sisältö tulossa"}</span></summary>
          <div className="los-chapter-inner"><a href={bookPath(book, "kappale/" + encodeURIComponent(chapter.id.slice(1)))}>Avaa kappale <ArrowRight size={16}/></a>
            {chapter.blockIds.map(id => <a key={id} href={bookPath(book, "teksti/" + encodeURIComponent(id))}>
              {book.blocks.find(block => block.id === id)?.kind === "grammar" ? "Kielioppi" : "Oppimateriaali"} · {id}</a>)}
          </div></details></li>)}</ol>}
  </section>;
}
function Lessons({ book }: { book: Book }) {
  const groups: { id: string; title: string; items: Book["lessons"][number][] }[] = [];
  for (const lesson of book.lessons) {
    const key = lesson.chapterId ?? (lesson.sequence === 1 ? "start" : lesson.sequence <= 30 ? "review-one" : "review-two");
    const title = lesson.chapterId
      ? book.chapters.find(chapter => chapter.id === lesson.chapterId)?.title ?? "Kappale"
      : key === "start" ? "Aloitus"
      : key === "review-one" ? "Kertaus I ja välikoe" : "Kertaus II ja loppukoe";
    const group = groups.find(item => item.id === key);
    if (group) group.items.push(lesson);
    else groups.push({ id: key, title, items: [lesson] });
  }
  return <section className="los-lessons">
    <h1>Opetuspolku</h1>
    <p className="los-intro">Vapaaehtoiset, noin 30 minuutin oppitunnit käyttävät samoja materiaaleja kuin muu oppikirja. Oppitunteja ei ole lukittu järjestyksessä.</p>
    {book.lessons.length > 0 && book.lessons.every(lesson => !lesson.steps.length) &&
      <p className="los-notice">Kaikki {book.lessons.length} suunniteltua oppituntia löytyvät alla. Varsinainen opetusmateriaali ja suoritustoiminnot eivät vielä ole julkaistuja.</p>}
    {!book.lessons.length ? <Empty title="Oppitunteja ei ole vielä julkaistu">Opetuspolun sisältö lisätään tarkistettuina sisältöpaketteina.</Empty> :
      groups.map(group => <section key={group.id} className="los-lesson-group">
        <h2>{group.title}</h2>
        <ol className="los-lesson-list">{group.items.map(lesson =>
          <li key={lesson.id}><a href={bookPath(book, "oppitunti/" + encodeURIComponent(lesson.id.slice(1)))}>
            <span className="los-chapter-number">{String(lesson.sequence).padStart(3, "0")}</span>
            <span><b>{lesson.title}</b><small>{lesson.objectives.join(" · ") || "Opetussisällön suunnitelma"}</small></span>
            <span>{lesson.steps.length ? "n. " + lesson.estimatedMinutes + " min" : "Sisältö tulossa"} <ArrowRight size={17}/></span>
          </a></li>)}</ol>
      </section>)}
  </section>;
}
function ChapterPage({ book, chapter }: { book: Book; chapter: Chapter }) {
  const blocks = chapter.blockIds.map(id => book.blocks.find(block => block.id === id)).filter((block): block is ContentBlock => !!block);
  const exercises = chapter.exerciseIds.map(id => book.exercises.find(exercise => exercise.id === id)).filter(item => item !== undefined);
  return <section><p className="los-eyebrow">KAPPALE {String(chapter.sequence).padStart(2, "0")}</p>
    <h1>{chapter.title}</h1><p className="los-intro">{chapter.introductionFi}</p>
    {!!chapter.objectives.length && <div className="los-objectives"><b>Tämän jälkeen osaat</b><ul>{chapter.objectives.map(goal => <li key={goal}>{goal}</li>)}</ul></div>}
    {chapter.publicationStatus !== "published" && <p className="los-notice">Kappaleen opetusrunko on vasta osittainen. Kokonainen ihmisen laatima Text A, lähdeääni sekä kappaletesti puuttuvat vielä. Alla olevat omat opetusesimerkit eivät korvaa alkuperäistekstiä.</p>}
    <Reader book={book} blocks={blocks} title={chapter.title}/>
    {exercises.length > 0 && <section className="los-chapter-exercises"><h2>Harjoitukset</h2>{exercises.map(exercise =>
      <ExerciseEngine key={exercise.id} bookId={book.id} exercise={exercise}/>)}</section>}
  </section>;
}
function WordIndex({ book }: { book: Book }) {
  const blocks = book.blocks.filter(block => block.kind === "vocabulary");
  return <section><h1>Sanastot</h1><p className="los-intro">Kirjakohtainen sanasto ja yhteinen sanakirja ovat eri kokonaisuuksia.</p>
    {blocks.length ? <Reader book={book} blocks={blocks} title="Sanastot"/> :
      <Empty title="Sanastoa ei vielä saatavilla">Kappaleiden tarkistetut sana- ja ilmauslistat lisätään oppimateriaalin mukana.</Empty>}</section>;
}
function GlobalDictionary() {
  return <div className="los-app">
    <div className="los-context"><a href={LOS_BASE_PATH}><ArrowLeft size={17}/> Oppikirjasto</a><span>Kaikki kahdeksan kirjaa</span></div>
    <p className="los-eyebrow">DEUTSCH ↔ SUOMI</p><h1>Saksan sanakirja</h1>
    <p className="los-intro">LOS!-sarjan yhteinen kaksisuuntainen sanakirja tulee tähän. Se on eri asia kuin kunkin kirjan itseopiskelusanasto.</p>
    <Empty title="Sanakirjakantaa ei ole vielä tuotu">Sanahaku ja ääntäminen avataan vasta, kun FreeDict-aineiston lisenssi, lähdeversio, suomennokset ja hakemiston toiminta on tarkistettu. Tällä hetkellä sanakirja ei anna näennäisiä osumia.</Empty>
  </div>;
}
function NotesIndex({ book }: { book: Book }) {
  const { value: notes, status } = useLosRecord<ReaderNote[]>(book.id, "notes", "reader", book.contentVersion, []);
  const visible = notes.filter(note => note.text.trim());
  return <section className="los-notes-index">
    <h1>Omat muistiinpanot</h1>
    <p className="los-intro">Lukijan tekstikohtaiset merkinnät säilyvät yhteydessä sisältölohkon tunnisteeseen ja versioon.</p>
    <p role="status" className="los-storage-state">{losSyncMessage(status)}</p>
    {visible.length ? <ul className="los-notes-list">{visible.map(note =>
      <li key={note.blockId + ":" + note.version}>
        <b>{book.blocks.find(block => block.id === note.blockId)?.kind === "paragraph" ? "Teksti" : "Oppimateriaalin kohta"}</b>
        <small>{note.blockId} · versio {note.version}</small>
        <p>{note.text}</p>
        {book.blocks.some(block => block.id === note.blockId && block.version === note.version)
          ? <a className="los-text-action" href={bookPath(book, "teksti/" + encodeURIComponent(note.blockId))}>Avaa tekstikohta <ArrowRight size={16}/></a>
          : <p className="los-support">Tekstikohta on poistunut nykyisestä julkaisuversiosta, mutta muistiinpano on säilytetty.</p>}
      </li>)}</ul> : <Empty title="Ei vielä muistiinpanoja">Voit lisätä muistiinpanoja lukijan tekstikohtaisilla toiminnoilla. Merkinnät kootaan tähän hakemistoon.</Empty>}
  </section>;
}
function GenericSection({ book, segment }: { book: Book; segment: string }) {
  if (segment === "sanastot") return <WordIndex book={book}/>;
  if (segment === "muistiinpanot") return <NotesIndex book={book}/>;
  if (segment === "kielioppi") {
    const blocks = book.blocks.filter(block => block.kind === "grammar");
    return blocks.length ? <Reader book={book} blocks={blocks} title="Kielioppi" headingLevel={1}/> :
      <section><h1>Kielioppi</h1><Empty title="Kielioppilukuja ei ole vielä julkaistu">Tähän avautuvat varsinaiset, perusteelliset opetussivut.</Empty></section>;
  }
  if (segment === "lahteet") return <section><h1>Lähteet</h1>{book.sources.length ?
    <ul className="los-source-list">{book.sources.map(source => <li key={source.id}><b>{source.title}</b> · {source.publisher}
      <span>{source.licenseOrBasis}</span><span><b>Tila:</b> {source.readiness === "blocked" ? "Julkaisu estetty" : source.readiness === "text-cleared" ? "Tekstiehdokas tunnistettu · julkaisu-QA kesken" : source.readiness === "media-pending" ? "Mediatarkistus kesken" : "Lisenssi- tai lähdetarkistus kesken"}</span>{source.publicationNoteFi && <span>{source.publicationNoteFi}</span>}{source.originalUrl && <a href={source.originalUrl} target="_blank" rel="noopener noreferrer">Alkuperäinen lähde</a>}</li>)}</ul> :
    <Empty title="Ei vielä lähteitä">Lähde- ja käyttöoikeustiedot julkaistaan varsinaisten materiaalien yhteydessä.</Empty>}</section>;
  const titles: Record<string, [string, string, string]> = {
    kertaus: ["Kertaa", "Ei vielä kerrattavaa", "Kertaus alkaa, kun oppimateriaalia ja luotettavia suoritustietoja on saatavilla."],
    sanakirja: ["Sanakirja", "Sanakirja-aineistoa ei ole vielä tuotu", "Hakua ei näytetä toimivana ennen kuin tarkistettu saksan ja suomen sanakirjakanta on asennettu."],
    osaaminen: ["Osaaminen", "Ei vielä osaamistietoja", "Osaamista ei päätellä avatuista sivuista eikä keksityistä pisteistä."],
    kokeet: ["Kokeet", "Ei julkaistuja kokeita", "Kokeet perustuvat myöhemmin tarkistettuihin tehtäviin."],
    mediat: ["Mediat", "Ei julkaistua mediaa", "Äänitteet ja videot lisätään lähdetietoineen ja soveltuvin upotusoikeuksin."],
  };
  const [heading, emptyTitle, explanation] = titles[segment] ?? ["Sivua ei löytynyt", "Tuntematon osio", "Palaa kirjan sisällysluetteloon."];
  return <section><h1>{heading}</h1><Empty title={emptyTitle}>{explanation}</Empty></section>;
}
export function LosApp() {
  const pathname = useLocation().pathname;
  const segments = pathname.startsWith(LOS_BASE_PATH)
    ? pathname.slice(LOS_BASE_PATH.length).split("/").filter(Boolean).map(decodeURIComponent) : [];
  const book = segments[0] ? findLosBook(segments[0]) : undefined;
  if (!segments.length) return <LibraryPage/>;
  if (segments[0] === "sanakirja") return <GlobalDictionary/>;
  if (!book) return <div className="los-app"><Empty title="Kirjaa ei löytynyt">Palaa LOS!-kirjastoon.</Empty><a href={LOS_BASE_PATH}>Kaikki kahdeksan kirjaa</a></div>;
  const section = segments[1] ?? "";
  const chapter = section === "kappale" ? book.chapters.find(item => item.id === segments[2] || item.id.slice(1) === segments[2]) : undefined;
  const lesson = section === "oppitunti" ? book.lessons.find(item => item.id === segments[2] || item.id.slice(1) === segments[2]) : undefined;
  const selectedBlock = section === "teksti" ? book.blocks.find(item => item.id === segments[2]) : undefined;
  const current = ["kappale", "teksti"].includes(section) ? "sisalto" : section === "oppitunti" ? "opetuspolku" : section;
  return <BookShell book={book} current={current}>
    {section === "" ? <BookHome book={book}/> :
      section === "sisalto" ? <Contents book={book}/> :
      section === "opetuspolku" ? <Lessons book={book}/> :
      section === "kappale" ? chapter ? <ChapterPage book={book} chapter={chapter}/> : <Empty title="Kappaletta ei löytynyt">Sisältöä ei ole vielä julkaistu.</Empty> :
      section === "oppitunti" ? lesson ? <LessonRunner book={book} lesson={lesson}/> : <Empty title="Oppituntia ei löytynyt">Tätä tuntia ei ole julkaistu.</Empty> :
      section === "teksti" ? selectedBlock ? <Reader book={book} blocks={[selectedBlock]} title="Oppimateriaali" headingLevel={1}/> : <Empty title="Tekstiä ei löytynyt">Tätä aineistoa ei ole julkaistu.</Empty> :
      <GenericSection book={book} segment={section}/>}
  </BookShell>;
}
