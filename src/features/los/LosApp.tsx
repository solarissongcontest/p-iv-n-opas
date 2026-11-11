import { useLocation } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, List, RotateCcw, Sparkles } from "lucide-react";
import { LOS_BASE_PATH, LOS_BOOKS, bookPath, findLosBook } from "./books";
import { emptyChapterSections } from "./chapterSections";
import type { Book, Chapter, ContentBlock, ResumeBookmark } from "./model";
import { Reader, type ReaderNote } from "./Reader";
import { useLosRecord, losSyncMessage } from "./data/useLosRecord";
import { LessonRunner } from "./LessonRunner";
import { ReviewWorkspace, ReviewEvidence } from "./ReviewWorkspace";
import { VocabularyIndex } from "./VocabularyIndex";
import { ExerciseEngine } from "./exercises/ExerciseEngine";
import { ChapterTestWorkspace } from "./ChapterTestWorkspace";

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
        <span className="los-card-status">{book.chapters.some(chapter => chapter.publicationStatus === "preview") ? "Ensimmäinen kappale · harjoitusversio" : "Sisältöä valmistellaan"}</span>
      </a>)}</div>
    <p className="los-library-footnote">Kansikuvia ja varsinaista logoa ei ole vielä toimitettu. LOS! 1:n ensimmäisiä, lähdeviittein merkittyjä oppisisältöjä voi jo avata harjoitusversioina.</p>
  </div>;
}
function BookHome({ book }: { book: Book }) {
  const { value: bookmark, status: bookmarkStatus } = useLosRecord<ResumeBookmark | null>(
    book.id, "bookmark", "resume-lesson", book.contentVersion, null,
  );
  const resumedLesson = bookmark ? book.lessons.find(lesson =>
    lesson.id === bookmark.lessonId && lesson.version === bookmark.lessonVersion && lesson.steps.length > 0) : undefined;
  const firstLesson = book.lessons.find(lesson => lesson.steps.length > 0);
  const startPath = resumedLesson ? "oppitunti/" + resumedLesson.id.slice(1) :
    firstLesson ? "oppitunti/" + firstLesson.id.slice(1) : "sisalto";
  return <div className="los-landing">
    <p className="los-eyebrow">LOS! {book.number} · {book.moduleCode} · {book.credits} OP</p>
    {book.bannerAsset && <img className="los-banner" alt={"LOS! " + book.number + " -kirjan banneri"} src={book.bannerAsset}/>}
    <div className="los-book-hero"><BookCover book={book}/>
      <div><p className="los-eyebrow">{book.moduleTitle}</p><h1>{book.title}</h1>
        <p>{book.description}</p>
        <a className="los-button los-button-primary" href={bookPath(book, startPath)}>
          {resumedLesson ? "Jatka oppituntia " + resumedLesson.id : firstLesson ? "Aloita nollasta · " + firstLesson.id : "Avaa sisällysluettelo"} <ArrowRight size={17}/>
        </a>
        {resumedLesson && <p className="los-storage-state" role="status">
          Viimeksi käsitelty: {resumedLesson.title}. {losSyncMessage(bookmarkStatus)}
        </p>}
      </div>
    </div>
    {book.lessons.some(lesson => lesson.publicationStatus === "preview") ?
      <p className="los-notice" role="status">LOS! 1:n kuudessa ensimmäisessä kappaleessa on esikatselusisältöä ja yhteensä 31 ohjattua oppituntia. Oppitunnit L027–L030 on varattu erilliselle kertaukselle ja välikokeelle, eikä niitä ole vielä toteutettu. C01:n kaksi alkuperäisäänitettä ja niiden tekstit, C02:n Wikibooksin koko alkuperäinen Franz–Greta-pääteksti, sen 20 sekunnin äänite, LOS!:n oma lisäkeskustelu sekä Ariserin koko nelirepliikkinen dialogi ovat luettavissa. C03:n oikean saksankielisen puhujan alkuperäinen Bernan haastattelu on kokonaisena lukuun ottamatta näkyvästi poistettua puhelinnumeroa. Kappaletestit ovat käytettävissä, mutta lähteiden lopullinen toimitus, äänitteiden laitetestaus ja muiden kappaleiden sisällöt ovat vielä kesken.</p> :
      <p className="los-notice" role="status">Oppituntien sisältöä ei ole vielä julkaistu. Etenemistä ei lasketa ennen kuin oikeita opintosuorituksia on saatavilla.</p>}
    <h2 className="los-section-title">Tutustu kirjaan</h2>
    <div className="los-path-cards">
      <a href={bookPath(book, "sisalto")}><List size={20}/><b>Sisällysluettelo</b><span>Selaa tekstejä ja kappaleita.</span></a>
      <a href={bookPath(book, "opetuspolku")}><Sparkles size={20}/><b>Opetuspolku</b><span>Noin 30 minuutin ohjatut oppitunnit.</span></a>
      <a href={bookPath(book, "kertaus")}><RotateCcw size={20}/><b>Kertaa</b><span>Palauta aiemmin opittua mieleen.</span></a>
    </div>
    <h2 className="los-section-title">Kirjan työkalut</h2>
    <div className="los-tool-links">{sections.slice(4).map(section => <a key={section.segment} href={section.segment === "sanakirja" ? LOS_BASE_PATH + "/sanakirja" : bookPath(book, section.segment)}>{section.title} <ArrowRight size={16}/></a>)}</div>
  </div>;
}
function Contents({ book }: { book: Book }) {
  return <section><h1>Sisällysluettelo</h1><p className="los-intro">{book.moduleCode} · {book.chapters.length} suunniteltua kappaletta · {book.chapters.filter(chapter => chapter.publicationStatus === "published").length} julkaistua</p>
    {!book.chapters.length ? <Empty title="Kappaleita ei ole vielä lisätty">Tähän ilmestyvät kirjan varsinaiset tekstit, kieliopit, sanastot ja tehtävät. Mitään tekaistua oppimateriaalia ei näytetä.</Empty> :
      <ol className="los-chapter-list">{book.chapters.map(chapter =>
        <li key={chapter.id}><details><summary><span className="los-chapter-number">{String(chapter.sequence).padStart(2, "0")}</span>
          <span><b>{chapter.title}</b><small>{chapter.introductionFi}</small></span><span>{chapter.publicationStatus === "published" ? "Katso sisältö" : chapter.publicationStatus === "preview" ? "Lue ja harjoittele · luonnos" : "Sisältö tulossa"}</span></summary>
          <div className="los-chapter-inner"><a href={bookPath(book, "kappale/" + encodeURIComponent(chapter.id.slice(1)))}>Avaa kappale <ArrowRight size={16}/></a>
            {(chapter.sections ?? emptyChapterSections()).map(item =>
              <a key={item.id} href={bookPath(book, "kappale/" + chapter.id.slice(1) + "/" + item.id)}>
                {item.title} {item.publicationStatus === "planned" ? "· tulossa" : "· harjoitusversio"}
              </a>)}
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
    {book.lessons.length > 0 &&
      <p className="los-notice">Polussa on {book.lessons.length} nimettyä oppituntia. Näistä {book.lessons.filter(lesson => lesson.publicationStatus === "preview").length} on avattu harjoitusversioiksi. Keskeneräisen tunnin otsikko ei tarkoita, että sen sisältö olisi jo julkaistu.</p>}
    {!book.lessons.length ? <Empty title="Oppitunteja ei ole vielä julkaistu">Opetuspolun sisältö lisätään tarkistettuina sisältöpaketteina.</Empty> :
      groups.map(group => <section key={group.id} className="los-lesson-group">
        <h2>{group.title}</h2>
        <ol className="los-lesson-list">{group.items.map(lesson =>
          <li key={lesson.id}><a href={bookPath(book, "oppitunti/" + encodeURIComponent(lesson.id.slice(1)))}>
            <span className="los-chapter-number">{String(lesson.sequence).padStart(3, "0")}</span>
            <span><b>{lesson.title}</b><small>{lesson.objectives.join(" · ") || "Opetussisällön suunnitelma"}</small></span>
            <span>{lesson.publicationStatus === "preview" ? "Harjoitusversio" : lesson.steps.length ? "n. " + lesson.estimatedMinutes + " min" : "Sisältö tulossa"} <ArrowRight size={17}/></span>
          </a></li>)}</ol>
      </section>)}
  </section>;
}
function ChapterPage({ book, chapter, subsection }: { book: Book; chapter: Chapter; subsection: string | undefined }) {
  const sections = chapter.sections ?? emptyChapterSections();
  const selected = subsection ? sections.find(section => section.id === subsection) : undefined;
  const chapterHref = bookPath(book, "kappale/" + chapter.id.slice(1));
  const blockIds = selected?.blockIds ?? [];
  const exerciseIds = selected?.exerciseIds ?? [];
  const blocks = blockIds.map(id => book.blocks.find(block => block.id === id)).filter((block): block is ContentBlock => !!block);
  const exercises = exerciseIds.map(id => book.exercises.find(exercise => exercise.id === id)).filter(item => item !== undefined);
  return <section className="los-chapter">
    <p className="los-eyebrow">KAPPALE {String(chapter.sequence).padStart(2, "0")}</p>
    <h1>{chapter.title}</h1>
    <p className="los-intro">{chapter.introductionFi}</p>
    {!!chapter.objectives.length && <div className="los-objectives">
      <b>Tämän kappaleen osaamistavoitteet</b>
      <ul>{chapter.objectives.map(goal => <li key={goal}>{goal}</li>)}</ul>
    </div>}
    {chapter.publicationStatus !== "published" && <p className="los-notice">
      {chapter.publicationStatus === "preview" ?
        chapter.id === "C01" ?
        "C01 on harjoitusversio: Text A:n 8-repliikkinen alkuperäisdialogi, Text B:n 20 ilmauksen ääniteluettelo sekä 12 tehtävän kappaletesti ovat käytettävissä. Äänitoiston laitetestaus ja lopullinen toimitus ovat kesken." :
        chapter.id === "C02" ?
        "C02 on harjoitusversio: Wikibooksin aito Franz–Greta-pääteksti on kokonaan sisällä kuutena repliikkinä ja sen 20 sekunnin public domain -äänite on soitettavissa. LOS!:n oma lisädialogi, Ariserin nelirepliikkinen alkuperäislähde, 16 ydinsanaa ja 15 kysymyksen kappaletesti täydentävät kokonaisuutta. Alkuperäisäänten laitetoisto ja loppulaaduntarkistus ovat vielä kesken." :
        chapter.id === "C03" ?
        "C03 on harjoitusversio: Bernan koko alkuperäishaastattelun 12 repliikkiä ovat luettavissa yhtä näkyvästi poistettua puhelinnumeroa lukuun ottamatta. Lisäksi käytössä ovat 17 ydinsanaa, tulla-verbin opetusta, maantieteellinen sijaintikaavio, Ariserin nelirepliikkinen alkuperäisäänite ja 15 tehtävän testi. COERLL-videon upotus, todellinen laitetestaus ja koko kappaleen toimituksellinen laaduntarkistus ovat kesken." :
        chapter.id === "C04" ?
        "C04 on harjoitusversio: Wikibooksin Herr Schmidt–Herr Standish -dialogin kaikki kahdeksan alkuperäisrepliikkiä, COERLL:n kuuden kysymyksen alkuperäinen kohteliaisuuslista, tervehdyksien aito lisäkuuntelu, 14 uutta sanastokorttia, du/Sie-kielioppi sekä 12 tehtävän kappaletesti ovat käytettävissä. Kaksi kirjoitustilannetta itsearvioidaan. Äänitoiston laitetestaus ja lopullinen toimituksellinen tarkistus ovat vielä kesken." :
        chapter.id === "C05" ?
        "C05 on harjoitusversio: Wikibooksin Heinrichin ja Karlin aito neljän repliikin vointidialogi on kokonaan mukana suomennoksineen, COERLL:n koko 13 ilmauksen alkuperäinen vointisanasto näkyy LOS!:ssa, ja erillinen äidinkielisen saksanpuhujan lyhyt ääntämisnäyte kuuluu kuunteluosioon. Mukana ovat 17 sanastokorttia, nicht/sehr-kielioppi, omat harjoitukset ja 12 tehtävän kappaletesti, jonka puheosuuden opiskelija arvioi itse. COERLL:n sanastoäänen tarkka tiedosto ja laitetoiston varmistus ovat vielä kesken." :
        chapter.id === "C06" ?
        "C06 on numerot ja ikä -kappaleen harjoitusversio. Teksti A käyttää C01:n alkuperäistä Franz–Jörg-dialogia uudelleen eikä ole erillinen uusi pääteksti. Teksti B sisältää Haraldin alkuperäisen haastattelun kaikkine kysymys–vastauspareineen mutta näkyvästi poistettua puhelinnumeroa lukuun ottamatta. Koko Human Robotin public domain -numerolitteraatti ja 37 sekunnin ääni on lisätty. Mukana ovat numerot 0–100, 26 sanastokorttia ja 20 pisteytettävää koetehtävää sekä kaksi itsearvioitavaa ikädialogia. Ennen lopullista julkaisua tarvitaan vielä erillinen uusi ihmisen kirjoittama pääteksti sekä Haraldin video- ja numeroäänten laitetestaus." :
        "Kappale on harjoitusversio, mutta kaikki lähteet ja oppisisällöt eivät ole vielä toimitettuja." :
        "Tämän kappaleen 10 osion rakenne on valmis, mutta aineistoja ei ole vielä julkaistu."}
    </p>}
    <nav className="los-chapter-sections" aria-label={"Kappaleen " + chapter.sequence + " osiot"}>
      <a href={chapterHref} aria-current={!subsection ? "page" : undefined}>Yleiskuva</a>
      {sections.map(section => <a key={section.id} href={chapterHref + "/" + section.id}
        aria-current={selected?.id === section.id ? "page" : undefined}>
        <span>{section.title}</span>
        {section.publicationStatus !== "planned" && <small>Harjoitusversio</small>}
      </a>)}
    </nav>
    {!subsection ? <div className="los-chapter-overview">
      <h2>Sisältö</h2>
      <p>Valitse yllä kappaleen osio. Teksti A, suomenkielinen opetus ja harjoitukset ovat käytettävissä myös erillään opetuspolusta. Tyhjät osiot eivät sisällä näennäisiä tekstejä tai oppimistuloksia.</p>
      {sections.some(section => section.publicationStatus !== "planned") &&
        <a className="los-button los-button-primary" href={chapterHref + "/teksti-a"}>
          Avaa Text A <ArrowRight size={16}/>
        </a>}
    </div> : !selected ? <Empty title="Osiota ei löytynyt">Avaa jokin kappaleen kymmenestä osasta.</Empty> :
      <div className="los-chapter-section">
        <h2>{selected.title}</h2>
        {selected.id === "tarkista" ?
          book.chapterTests.find(test => test.chapterId === chapter.id) ?
            <ChapterTestWorkspace book={book} definition={book.chapterTests.find(test => test.chapterId === chapter.id)!}/> :
            <Empty title="Kappaletesti on vielä kesken">Tähän kappaleeseen ei ole vielä julkaistu arvioitavaa tehtäväpakettia.</Empty> :
          !blocks.length && !exercises.length ?
            <Empty title="Tämän osion aineisto on vielä kesken">Varsinaista ihmisen kirjoittamaa oppimateriaalia tai toimitettuja tehtäviä ei vielä ole lisätty tähän osioon.</Empty> :
            <>
              {!!blocks.length && <Reader book={book} blocks={blocks} title={selected.title}/>}
              {!!exercises.length && <section className="los-chapter-exercises">
                <h3>Harjoitukset</h3>
                {exercises.map(exercise => <ExerciseEngine key={exercise.id} bookId={book.id} exercise={exercise}/>)}
              </section>}
            </>}
      </div>}
  </section>;
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
  if (segment === "kertaus") return <ReviewWorkspace book={book}/>;
  if (segment === "osaaminen") return <ReviewEvidence book={book}/>;
  if (segment === "sanastot") return <VocabularyIndex book={book}/>;
  if (segment === "muistiinpanot") return <NotesIndex book={book}/>;
  if (segment === "kielioppi") {
    const blocks = book.blocks.filter(block => block.kind === "grammar");
    return blocks.length ? <Reader book={book} blocks={blocks} title="Kielioppi" headingLevel={1}/> :
      <section><h1>Kielioppi</h1><Empty title="Kielioppilukuja ei ole vielä julkaistu">Tähän avautuvat varsinaiset, perusteelliset opetussivut.</Empty></section>;
  }
  if (segment === "kokeet") {
    return <section className="los-exams-index">
      <h1>Kokeet ja kappaletestit</h1>
      <p className="los-intro">Kokeet palautetaan kokonaisuutena ennen ratkaisujen ja pisteiden näyttämistä. Puheen itsearviointi on erillinen, eikä pisteitä keksitä.</p>
      {book.chapterTests.length === 0 ? <Empty title="Kokeita ei vielä saatavilla">Tämän kirjan koetehtävät valmistellaan oppikirjan sisältöjen mukana.</Empty> :
        <ul className="los-exams-list">{book.chapters.map(chapter => {
          const test = book.chapterTests.find(item => item.chapterId === chapter.id);
          return <li key={chapter.id}>
            <div><strong>{chapter.id} · {chapter.title}</strong><small>{test ? test.exerciseIds.length + " tarkistettavaa tehtävää + itsearviointi · harjoitusversio" : "Ei julkaistua kappaletestiä"}</small></div>
            {test ? <a className="los-button los-button-secondary" href={bookPath(book, "kappale/" + chapter.id.slice(1) + "/tarkista")}>
              Avaa testi <ArrowRight size={16}/></a> : <span className="los-exams-wait">Tulossa</span>}
          </li>;
        })}</ul>}
    </section>;
  }
  if (segment === "mediat") {
    const blocks = book.blocks.filter(block => block.kind === "media");
    return blocks.length
      ? <Reader book={book} blocks={blocks} title="Mediat" headingLevel={1}/>
      : <section><h1>Mediat</h1><Empty title="Ei julkaistua mediaa">Äänitteet ja videot lisätään lähdetietoineen vasta, kun käyttöoikeudet on varmennettu.</Empty></section>;
  }
  if (segment === "lahteet") return <section><h1>Lähteet</h1>{book.sources.length ?
    <ul className="los-source-list">{book.sources.map(source => <li key={source.id}><b>{source.title}</b> · {source.publisher}
      <span>{source.licenseOrBasis}</span><span><b>Tila:</b> {source.permittedMode === "embed" ? "Lähde ja käyttöoikeus tarkistettu · toisto ja sisältöjen viimeinen julkaisukatselmus kesken" : source.readiness === "blocked" ? "Julkaisu estetty" : source.readiness === "text-cleared" ? "Tekstiehdokas tunnistettu · julkaisu-QA kesken" : source.readiness === "media-pending" ? "Mediatarkistus kesken" : "Lisenssi- tai lähdetarkistus kesken"}</span>{source.publicationNoteFi && <span>{source.publicationNoteFi}</span>}{source.originalUrl && <a href={source.originalUrl} target="_blank" rel="noopener noreferrer">Alkuperäinen lähde</a>}</li>)}</ul> :
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
      section === "kappale" ? chapter ? <ChapterPage book={book} chapter={chapter} subsection={segments[3]}/> : <Empty title="Kappaletta ei löytynyt">Sisältöä ei ole vielä julkaistu.</Empty> :
      section === "oppitunti" ? lesson ? <LessonRunner book={book} lesson={lesson}/> : <Empty title="Oppituntia ei löytynyt">Tätä tuntia ei ole julkaistu.</Empty> :
      section === "teksti" ? selectedBlock ? <Reader book={book} blocks={[selectedBlock]} title="Oppimateriaali" headingLevel={1}/> : <Empty title="Tekstiä ei löytynyt">Tätä aineistoa ei ole julkaistu.</Empty> :
      <GenericSection book={book} segment={section}/>}
  </BookShell>;
}
