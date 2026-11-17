import { useEffect, useState, type ReactNode } from "react";
import { BookOpen, Headphones, Square, Volume2 } from "lucide-react";
import { LOS1_REVISED_AB } from "./content/los1RevisedAB";
import { LOS1_REVISED_C } from "./content/los1RevisedC";
import { LosReadingExercises, LosReadingUnderstanding } from "./LosReadingExercises";
import "./los-revised-texts.css";

/** These pages show LOS!-authored drafts. They are NOT authentic source transcripts. */
type ReaderBlock = { readonly kind: "stage" | "break" | "prose"; readonly text?: string };

function inlineContent(value: string): ReactNode[] {
  return value.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index} lang="de">{part.slice(1, -1)}</em>;
    return <span key={index}>{part}</span>;
  });
}
function dialogueLine(value: string): { speaker: string; words: string } | null {
  const match = /^\*\*([^*]+):\*\*\s*(.*)$/.exec(value);
  return match ? { speaker: match[1] ?? "", words: match[2] ?? "" } : null;
}
function voiceIndex(speaker: string, voiceCount: number): number {
  if (!voiceCount) return 0;
  let hash = 0;
  for (const character of speaker) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return hash % voiceCount;
}
function TextSpeech({ blocks }: { blocks: readonly ReaderBlock[] }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState("1");
  const [message, setMessage] = useState("");
  useEffect(() => () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, [blocks]);
  const stop = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };
  const start = () => {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setMessage("Tämä selain ei tue laitteen puhesynteesiä.");
      return;
    }
    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices().filter(voice => /^de([_-]|$)/i.test(voice.lang));
    const utterances = blocks.filter(block => block.kind === "prose" && block.text?.trim()).map(block => {
      const raw = block.text ?? "";
      const dialogue = dialogueLine(raw);
      const words = (dialogue?.words ?? raw).replace(/\*\*/g, "").replace(/\*/g, "")
        .replace(/\b(?:[A-ZÄÖÜ]\s*[-–]\s*){2,}[A-ZÄÖÜ]\b/g,
          letters => letters.replace(/\s*[-–]\s*/g, ", "))
        .trim();
      const utterance = new SpeechSynthesisUtterance(words);
      utterance.lang = "de-DE";
      utterance.rate = Number(rate);
      if (voices.length) utterance.voice = voices[voiceIndex(dialogue?.speaker ?? "", voices.length)] ?? null;
      return utterance;
    }).filter(utterance => utterance.text.length > 0);
    if (!utterances.length) {
      setMessage("Tässä tekstissä ei ole luettavia saksankielisiä puheenvuoroja.");
      return;
    }
    const last = utterances[utterances.length - 1];
    if (last) {
      last.onend = () => setIsSpeaking(false);
      last.onerror = () => { setIsSpeaking(false); setMessage("Puheentoisto keskeytyi. Tarkista laitteen saksan puheääni."); };
    }
    utterances.forEach(utterance => window.speechSynthesis.speak(utterance));
    setIsSpeaking(true);
    setMessage(voices.length ? "Toistetaan laitteen saksankielisillä synteettisillä äänillä." : "Laite valitsee äänen. Saksankielisen äänen saatavuus vaihtelee laitteittain.");
  };
  return <div className="los-revised-speech">
    <div className="los-revised-speech-controls">
      <Headphones size={18} aria-hidden="true" />
      <button type="button" className="los-outline-button" onClick={isSpeaking ? stop : start}>
        {isSpeaking ? <><Square size={15} aria-hidden="true" /> Pysäytä</> : <><Volume2 size={16} aria-hidden="true" /> Kuuntele teksti</>}
      </button>
      <label>Toistonopeus
        <select value={rate} onChange={event => setRate(event.target.value)} aria-label="Puhenopeus">
          <option value="0.75">0,75×</option><option value="1">1×</option><option value="1.25">1,25×</option>
        </select>
      </label>
    </div>
    <p className="los-revised-muted" role="status">{message || "Laitteen puhesynteesi (TTS). Varsinaista toimituksellisesti hyväksyttyä äänitettä ei ole vielä tuotettu."}</p>
  </div>;
}

function ReaderLines({ blocks }: { blocks: readonly ReaderBlock[] }) {
  return <div className="los-revised-dialogue">
    {blocks.map((block, index) => {
      if (block.kind === "break") return <hr key={index} className="los-revised-pause" />;
      const value = block.text ?? "";
      if (block.kind === "stage") return <p key={index} className="los-revised-stage">{inlineContent(value)}</p>;
      const line = dialogueLine(value);
      if (line) return <div className="los-revised-line" key={index}>
        <strong className="los-revised-speaker">{line.speaker}</strong>
        <p lang="de">{inlineContent(line.words)}</p>
      </div>;
      return <p key={index} lang="de" className="los-revised-prose">{inlineContent(value)}</p>;
    })}
  </div>;
}

export function LosRevisedTextPage({ chapterId, kind }: { chapterId: string; kind: "A" | "B" }) {
  const chapter = LOS1_REVISED_AB.chapters.find(candidate => candidate.chapterId === "C" + chapterId);
  if (!chapter) return <div role="status">Tämän kappaleen tekstiä ei löydy sisältöaineistosta.</div>;
  const source = kind === "A" ? chapter.textA : chapter.textB;
  return <section className="los-revised-page" aria-labelledby={"los-revised-heading-" + chapterId + kind}>
    <p className="los-eyebrow">KAPPALE {chapterId} / TEXT {kind}</p>
    <h1 id={"los-revised-heading-" + chapterId + kind} lang="de">{source.title}</h1>
    <p className="los-page-intro">{kind === "A" ? "Kappaleen uusi pääteksti. Lue ensin tilanteen kuvaus ja seuraa keskustelua." : "Toinen tekstilaji. Harjoittele kappaleen ilmauksia uudessa tilanteessa."}</p>
    <TextSpeech blocks={source.blocks} />
    <ReaderLines blocks={source.blocks} />
    {kind === "B" && <LosReadingExercises chapterId={chapterId} text="B" />}
    <aside className="los-revised-disclaimer" role="note">
      <strong>LOS!:n oma opetusteksti · toimitusluonnos</strong>
      <p>Uusi teksti ei ole ulkopuolinen autenttinen lähdeteksti. Riippumaton saksan kielentarkistus ja toimitettu äänite ovat vielä kesken. Laitteen TTS ei korvaa alkuperäistä ihmisäänitettä.</p>
    </aside>
  </section>;
}

/** Retain the public component name while replacing the former three-question mock-up
 * with the 15-question evidence-grounded A/B/C exercise system. */
export function LosRevisedUnderstanding({chapterId,navigate}: {
  chapterId:string;
  navigate?: (section:"text"|"text-b"|"text-c")=>void;
}) {
  return <LosReadingUnderstanding chapterId={chapterId} {...(navigate ? {navigate} : {})}/>;
}

function splitCells(line: string): string[] {
  return line.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|").map(cell => cell.trim());
}
function isTableLine(line: string): boolean { return /^\s*\|/.test(line); }
function isTableRule(line: string): boolean { return /^\s*\|?[\s|:-]+\|?\s*$/.test(line); }

/** A deliberately restricted Markdown renderer: no HTML injection, links or scripts. */
function renderSupportMarkdown(source: string): ReactNode[] {
  const lines = source.replace(/\r/g, "").split("\n");
  const rendered: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = (lines[i] ?? "").trim();
    if (!line) { i++; continue; }
    if (line === "---") { rendered.push(<hr key={i} className="los-revised-pause" />); i++; continue; }
    if (line.startsWith("### ")) { i++; continue; } // Page heading is rendered above once.
    if (isTableLine(line) && isTableLine(lines[i + 1] ?? "") && isTableRule(lines[i + 1] ?? "")) {
      const first = i;
      const headings = splitCells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableLine(lines[i] ?? "")) { rows.push(splitCells(lines[i] ?? "")); i++; }
      rendered.push(<div className="los-revised-table-wrap" key={first}><table>
        <thead><tr>{headings.map((heading, col) => <th key={col}>{inlineContent(heading)}</th>)}</tr></thead>
        <tbody>{rows.map((cells, row) => <tr key={row}>{cells.map((cell, col) => <td key={col}>{inlineContent(cell)}</td>)}</tr>)}</tbody>
      </table></div>);
      continue;
    }
    if (/^\*\*(?:Vastaus|Mallivastaus|Mallirunko):\*\*/.test(line)) {
      rendered.push(<details className="los-revised-answer" key={i}>
        <summary>Näytä mallivastaus</summary><p>{inlineContent(line.replace(/^\*\*(?:Vastaus|Mallivastaus|Mallirunko):\*\*\s*/, ""))}</p>
      </details>);
      i++; continue;
    }
    if (line.startsWith("- ")) {
      const first = i;
      const items: string[] = [];
      while (i < lines.length && (lines[i] ?? "").trim().startsWith("- ")) { items.push((lines[i] ?? "").trim().slice(2)); i++; }
      rendered.push(<ul key={first}>{items.map((item, index) => <li key={index}>{inlineContent(item)}</li>)}</ul>);
      continue;
    }
    const first = i;
    const paragraph: string[] = [line];
    i++;
    while (i < lines.length && (lines[i] ?? "").trim() &&
      !isTableLine(lines[i] ?? "") && !/^### |^---$|^\*\*(?:Vastaus|Mallivastaus|Mallirunko):\*\*|^- /.test((lines[i] ?? "").trim())) {
      paragraph.push((lines[i] ?? "").trim()); i++;
    }
    rendered.push(<p key={first}>{paragraph.map((fragment, index) => <span key={index}>{index > 0 && <br />}{inlineContent(fragment)}</span>)}</p>);
  }
  return rendered;
}

export function LosHilfstextPage({ chapterId }: { chapterId: string }) {
  const page = LOS1_REVISED_C.chapters.find(chapter => chapter.chapterId === chapterId);
  if (!page) return <div role="status">Tämän kappaleen tukitekstiä ei löydy sisältöaineistosta.</div>;
  return <section className="los-inner-page los-revised-page los-revised-support" aria-labelledby={"los-c-heading-" + chapterId}>
    <p className="los-eyebrow">KAPPALE {chapterId} / TEXT C · HILFSTEXT</p>
    <h1 id={"los-c-heading-" + chapterId} lang="de">{page.title}</h1>
    <p className="los-page-intro">{page.purpose}. Tämä tukiteksti täydentää Text A:ta ja Text B:tä. Saat palata siihen aina tarvittaessa.</p>
    <div className="los-revised-support-content">{renderSupportMarkdown(page.contentMarkdown)}</div>
    <LosReadingExercises chapterId={chapterId} text="C" />
    <aside className="los-revised-disclaimer" role="note">
      <BookOpen size={18} aria-hidden="true" />
      <span>LOS!:n oma opetuksellinen tukiteksti · kielentarkistus kesken. Tukiteksti ei ole autenttinen ulkopuolinen lähde.</span>
    </aside>
  </section>;
}
