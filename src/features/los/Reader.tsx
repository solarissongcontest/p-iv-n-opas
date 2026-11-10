import { useEffect, useState } from "react";
import { BookOpen, Highlighter, NotebookPen, Settings2 } from "lucide-react";
import type { Book, ContentBlock } from "./model";
import { getDeviceOwnerId } from "@/lib/deviceSession";

export type ReaderMark = { blockId: string; version: string; start: number; end: number; color: "yellow" };
export type ReaderNote = { blockId: string; version: string; text: string; updatedAt: string };
const storeKey = (book: Book, suffix: string) => {
  const owner = getDeviceOwnerId();
  return owner ? ["opk", "los", owner, book.id, suffix].join(":") : null;
};
function loadLocal<T>(key: string | null, fallback: T): T {
  try { return key ? (JSON.parse(localStorage.getItem(key) ?? "null") as T | null) ?? fallback : fallback; }
  catch { return fallback; }
}
function saveLocal<T>(key: string | null, value: T) {
  try { if (!key) return false; localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}
function SafeMedia({ block }: { block: Extract<ContentBlock, { kind: "media" }> }) {
  let valid = false;
  try {
    const url = new URL(block.embedUrl);
    valid = url.protocol === "https:" &&
      (block.mediaType === "video"
        ? ["www.youtube-nocookie.com", "www.youtube.com", "www.youtube.com"].includes(url.hostname) && url.pathname.startsWith("/embed/")
        : false);
  } catch { /* Invalid source URL is never embedded. */ }
  return <figure className="los-media">
    <figcaption>{block.title}</figcaption>
    {valid && block.mediaType === "video"
      ? <iframe title={block.title} src={block.embedUrl} loading="lazy" allowFullScreen allow="fullscreen; encrypted-media; picture-in-picture" />
      : <p className="los-notice">Mediaa ei ole vielä hyväksytty tai sitä ei voi upottaa turvallisesti.</p>}
  </figure>;
}
function RenderBlock({ block, marked, onSelection, onNote }: {
  block: ContentBlock;
  marked: ReaderMark | undefined;
  onSelection: (block: ContentBlock, start: number, end: number) => void;
  onNote: (block: ContentBlock) => void;
}) {
  const markedText = (text: string) => marked && marked.start >= 0 && marked.end <= text.length
    ? <>{text.slice(0, marked.start)}<mark className="los-marker">{text.slice(marked.start, marked.end)}</mark>{text.slice(marked.end)}</>
    : text;
  const select = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>, text: string) => {
    const container = event.currentTarget;
    const selected = window.getSelection();
    if (!selected || selected.isCollapsed || !selected.rangeCount) return;
    const range = selected.getRangeAt(0);
    if (!container.contains(range.startContainer) || !container.contains(range.endContainer)) return;
    const prefix = range.cloneRange();
    prefix.selectNodeContents(container);
    prefix.setEnd(range.startContainer, range.startOffset);
    const start = prefix.toString().length;
    const end = start + range.toString().length;
    if (start >= 0 && end <= text.length && end > start) onSelection(block, start, end);
    selected.removeAllRanges();
  };
  switch (block.kind) {
    case "heading": return block.level === 2 ? <h2>{block.text}</h2> : <h3>{block.text}</h3>;
    case "paragraph":
    case "authenticText": return <div className="los-reader-paragraph" id={block.id}>
      <p lang={block.language} onMouseUp={event => select(event, block.text)} onTouchEnd={event => select(event, block.text)}>{markedText(block.text)}</p>
      <button type="button" className="los-text-action los-note-action" onClick={() => onNote(block)}><NotebookPen size={16} /> Muistiinpano</button>
    </div>;
    case "dialogue": return <div lang="de" className="los-dialogue">{block.turns.map((turn, index) =>
      <p key={index}><b>{turn.speaker}</b> {turn.text}</p>)}</div>;
    case "grammar": return <section className="los-grammar" id={block.id}>
      <p className="los-eyebrow">KIELIOPPI</p><h2>{block.title}</h2>
      <p>{block.explanationFi}</p>
      <div className="los-examples">{block.examples.map((entry, index) =>
        <div key={index}><p lang="de">{entry.de}</p><small>{entry.fi}</small></div>)}</div>
    </section>;
    case "table": return <div className="los-table-scroll"><table><thead><tr>{block.headers.map((value, index) =>
      <th key={index} scope="col">{value}</th>)}</tr></thead><tbody>{block.rows.map((cells, rowIndex) =>
      <tr key={rowIndex}>{cells.map((value, index) => <td key={index}>{value}</td>)}</tr>)}</tbody></table></div>;
    case "image": return <figure className="los-reader-image">
      <img src={block.src} alt={block.alt} loading="lazy" /><figcaption>{block.caption}</figcaption>
    </figure>;
    case "vocabulary": return <section className="los-vocabulary" id={block.id}>
      <h2>Sanasto</h2><dl>{block.entries.map(entry => <div key={entry.id}>
        <dt lang="de">{entry.de}</dt><dd>{entry.fi}{entry.note && <small>{entry.note}</small>}</dd>
      </div>)}</dl></section>;
    case "media": return <SafeMedia block={block} />;
  }
}

export function Reader({ book, blocks, title }: { book: Book; blocks: ContentBlock[]; title: string }) {
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.75);
  const [readingMode, setReadingMode] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [highlighter, setHighlighter] = useState(false);
  const [marks, setMarks] = useState<ReaderMark[]>([]);
  const [notes, setNotes] = useState<ReaderNote[]>([]);
  const [activeNote, setActiveNote] = useState<ContentBlock | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setMarks(loadLocal(storeKey(book, "marks"), []));
    setNotes(loadLocal(storeKey(book, "notes"), []));
    setLoaded(true);
  }, [book]);
  useEffect(() => {
    if (!loaded) return;
    const marksSaved = saveLocal(storeKey(book, "marks"), marks);
    const notesSaved = saveLocal(storeKey(book, "notes"), notes);
    setSaved(marksSaved && notesSaved);
  }, [book, marks, notes, loaded]);
  const noteValue = notes.find(note => note.blockId === activeNote?.id && note.version === activeNote.version)?.text ?? "";
  const updateNote = (text: string) => {
    if (!activeNote) return;
    setNotes(previous => [...previous.filter(note => note.blockId !== activeNote.id), {
      blockId: activeNote.id, version: activeNote.version, text, updatedAt: new Date().toISOString(),
    }]);
  };
  if (!blocks.length) return <section className="los-empty"><BookOpen size={24} /><h2>Tekstejä ei ole vielä lisätty</h2><p>Tämän kirjan lukija on valmis näyttämään myöhemmin lisättävät luvalliset kokonaiset tekstit suoraan LOS!:ssa.</p></section>;
  return <article className={"los-reader " + (readingMode ? "is-reading" : "")}
    style={{ "--los-reader-font": fontSize + "px", "--los-reader-leading": lineHeight } as React.CSSProperties}>
    <div className="los-reader-top"><div><p className="los-eyebrow">LUE JA OPI</p><h1>{title}</h1></div>
      <div className="los-reader-tools" role="toolbar" aria-label="Lukijan työkalut">
        <button className="los-button los-button-secondary" type="button" aria-pressed={highlighter} onClick={() => setHighlighter(v => !v)}><Highlighter size={17} /> Korosta</button>
        <button className="los-button los-button-secondary" type="button" aria-pressed={readingMode} onClick={() => setReadingMode(v => !v)}><BookOpen size={17} /> {readingMode ? "Opiskele" : "Lukutila"}</button>
        <button className="los-button los-button-secondary" type="button" aria-expanded={toolsOpen} onClick={() => setToolsOpen(v => !v)}><Settings2 size={17} /> Teksti</button>
      </div>
    </div>
    {toolsOpen && <div className="los-reader-settings">
      <label>Tekstin koko {fontSize} px <input aria-label="Tekstin koko" type="range" min="16" max="24" step="1" value={fontSize} onChange={event => setFontSize(Number(event.target.value))} /></label>
      <label>Riviväli {lineHeight.toFixed(2)} <input aria-label="Riviväli" type="range" min="1.4" max="1.9" step=".05" value={lineHeight} onChange={event => setLineHeight(Number(event.target.value))}/></label>
    </div>}
    {highlighter && <p className="los-notice">Valitse hiirellä tai kosketuksella teksti maalattavaksi. Merkinnät tallentuvat toistaiseksi vain tälle laitteelle.</p>}
    <div className="los-reading-body">{blocks.map(block => <RenderBlock
      key={block.id + ":" + block.version} block={block}
      marked={marks.find(mark => mark.blockId === block.id && mark.version === block.version)}
      onSelection={(source, start, end) => {
        if (!highlighter) return;
        setMarks(previous => [...previous.filter(mark => mark.blockId !== source.id), { blockId: source.id, version: source.version, start, end, color: "yellow" }]);
      }}
      onNote={setActiveNote}
    />)}</div>
    {activeNote && <section className="los-note-editor" aria-labelledby="los-note-heading">
      <div className="los-inline-head"><h2 id="los-note-heading">Muistiinpano</h2><button className="los-button los-button-secondary" onClick={() => setActiveNote(null)}>Sulje</button></div>
      <label htmlFor="los-note-input">Oma merkintä tähän tekstikohtaan</label>
      <textarea id="los-note-input" value={noteValue} onChange={event => updateNote(event.target.value)} rows={5}/>
      <p className="los-storage-state">{saved ? "Luonnos tallennettu tälle laitteelle" : "Tallennusta ei voitu vahvistaa"}</p>
    </section>}
  </article>;
}
