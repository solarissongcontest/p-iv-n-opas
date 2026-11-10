import { useState } from "react";
import { BookOpen, Highlighter, NotebookPen, Settings2 } from "lucide-react";
import type { Book, ContentBlock } from "./model";
import { useLosRecord, losSyncMessage } from "./data/useLosRecord";

export type ReaderMark = { blockId: string; version: string; start: number; end: number; color: "yellow" };
export type ReaderNote = { blockId: string; version: string; text: string; updatedAt: string };
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
      : block.mediaType === "audio" && /^\/los\/media\/[a-z0-9_-]+\.(ogg|mp3|m4a)$/i.test(block.embedUrl)
        ? <audio controls preload="none" src={block.embedUrl} aria-label={block.title}>Äänitoistoa ei tueta selaimessasi.</audio>
        : <p className="los-notice">Mediaa ei ole vielä hyväksytty tai sitä ei voi upottaa turvallisesti.</p>}
  </figure>;
}
function RenderBlock({ block, marked, highlighterEnabled, onSelection, onNote }: {
  block: ContentBlock;
  marked: ReaderMark | undefined;
  highlighterEnabled: boolean;
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
      <p lang={block.language} onMouseUp={highlighterEnabled ? event => select(event, block.text) : undefined} onTouchEnd={highlighterEnabled ? event => select(event, block.text) : undefined}>{markedText(block.text)}</p>
      {highlighterEnabled && <div className="los-token-picker" role="group" aria-label="Korosta sana tai ilmaus"><p className="los-support">Valitse sana näppäimistöllä tai napauttamalla. Peräkkäiset valinnat muodostavat kokonaisen ilmauksen.</p><div className="los-tokens">{Array.from(block.text.matchAll(/\S+/gu), match => ({ word: match[0], start: match.index, end: match.index + match[0].length })).map(token => <button type="button" key={token.start} lang={block.language} className="los-token" aria-pressed={!!marked && token.start >= marked.start && token.end <= marked.end} onClick={() => { const start = marked ? Math.min(marked.start, token.start) : token.start; const end = marked ? Math.max(marked.end, token.end) : token.end; onSelection(block, start, end); }}>{token.word}</button>)}</div></div>}
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

export function Reader({ book, blocks, title, headingLevel = 2 }: { book: Book; blocks: ContentBlock[]; title: string; headingLevel?: 1 | 2 }) {
  const { value: readerPreferences, update: updateReaderPreferences } = useLosRecord(
    book.id, "preferences", "reader-settings", "1.0.0", { fontSize: 18, lineHeight: 1.75 },
  );
  const { fontSize, lineHeight } = readerPreferences;
  const [readingMode, setReadingMode] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [highlighter, setHighlighter] = useState(false);
  const { value: marks, update: setMarks, status: marksStatus } = useLosRecord<ReaderMark[]>(book.id, "marks", "reader", book.contentVersion, []);
  const { value: notes, update: setNotes, status: notesStatus } = useLosRecord<ReaderNote[]>(book.id, "notes", "reader", book.contentVersion, []);
  const [activeNote, setActiveNote] = useState<ContentBlock | null>(null);
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
    <div className="los-reader-top"><div><p className="los-eyebrow">LUE JA OPI</p>{headingLevel === 1 ? <h1>{title}</h1> : <h2>{title}</h2>}</div>
      <div className="los-reader-tools" role="toolbar" aria-label="Lukijan työkalut">
        <button className="los-button los-button-secondary" type="button" aria-pressed={highlighter} onClick={() => setHighlighter(v => !v)}><Highlighter size={17} /> Korosta</button>
        <button className="los-button los-button-secondary" type="button" aria-pressed={readingMode} onClick={() => setReadingMode(v => !v)}><BookOpen size={17} /> {readingMode ? "Opiskele" : "Lukutila"}</button>
        <button className="los-button los-button-secondary" type="button" aria-expanded={toolsOpen} onClick={() => setToolsOpen(v => !v)}><Settings2 size={17} /> Teksti</button>
      </div>
    </div>
    {toolsOpen && <div className="los-reader-settings">
      <label>Tekstin koko {fontSize} px <input aria-label="Tekstin koko" type="range" min="16" max="24" step="1" value={fontSize} onChange={event => updateReaderPreferences(previous => ({ ...previous, fontSize: Number(event.target.value) }))} /></label>
      <label>Riviväli {lineHeight.toFixed(2)} <input aria-label="Riviväli" type="range" min="1.4" max="1.9" step=".05" value={lineHeight} onChange={event => updateReaderPreferences(previous => ({ ...previous, lineHeight: Number(event.target.value) }))}/></label>
    </div>}
    {highlighter && <p className="los-notice">Valitse hiirellä tai kosketuksella teksti maalattavaksi. Merkinnät tallentuvat ensin laitteelle ja synkronoituvat palvelimelle, kun yhteys ja tietokanta ovat saatavilla.</p>}
    <p className="los-storage-state" role="status">{losSyncMessage(marksStatus)}</p>
    <div className="los-reading-body">{blocks.map(block => <RenderBlock
      key={block.id + ":" + block.version} block={block}
      highlighterEnabled={highlighter}
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
      <p className="los-storage-state">{losSyncMessage(notesStatus)}</p>
    </section>}
  </article>;
}
