/** LOS! 1 German TTS transcript preparation. These are browser-synthesis hints,
 * not an acoustic or independent native-speaker pronunciation certification. */
export type LosSpeechBlock = {
  readonly kind: "prose" | "stage" | "break";
  readonly text?: string;
};
export type LosSpeechSegment = {
  readonly text: string;
  readonly speaker: string;
  /** One turn after a request to speak more slowly is read slower. */
  readonly rateFactor: number;
};
export type LosSpeechVoice = {
  readonly name: string;
  readonly lang: string;
  readonly localService?: boolean;
};

export function losGermanVoices<T extends LosSpeechVoice>(voices: readonly T[]): T[] {
  return [...voices]
    .filter(voice => /^de(?:-|_|$)/i.test(voice.lang))
    .sort((a,b) =>
      Number(Boolean(b.localService)) - Number(Boolean(a.localService)) ||
      Number(/^de[-_]DE$/i.test(b.lang)) - Number(/^de[-_]DE$/i.test(a.lang)) ||
      a.name.localeCompare(b.name, "de"));
}
export function losSpeakerSlot(speaker: string, count: number): number {
  if (count < 1) return 0;
  const normalized = speaker.toLocaleLowerCase("de").trim();
  const known: readonly string[] = [
    "aino", "leon", "frau berger", "nora", "selma", "herr weber", "mila", "sofia",
  ];
  const index = known.findIndex(name => normalized === name || normalized.startsWith(name+" "));
  if (index >= 0) return index % count;
  let hash = 0;
  for (const codePoint of normalized) hash = (hash*33 + codePoint.codePointAt(0)!) >>> 0;
  return hash % count;
}

/** Split an already-cleaned German speech turn for individual sentence replay.
 * Preserve short spelling chains and avoid interpreting a speaker's name as a new sentence.
 * A turn remains available as an exact fallback even if punctuation is absent.
 */
export function losSpeechSentenceSegments(text:string):string[]{
 const normalized=text.replace(/\s+/g," ").trim();
 if(!normalized)return [];
 return normalized.split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ„«])/u).map(part=>part.trim()).filter(Boolean);
}

function cleanSpokenText(value: string): string {
  return value
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    /* Spell German letter chains one letter at a time; leave E-Mail intact. */
    .replace(/(?:[A-ZÄÖÜ]\s*[-–]\s*){2,}[A-ZÄÖÜ]/g, match => match.replace(/\s*[-–]\s*/g,", "))
    .replace(/\s+/g," ")
    .trim();
}

export function losSpeechSegments(
  blocks: readonly LosSpeechBlock[],
  chapterId: string,
  kind: "A" | "B" | "C",
): LosSpeechSegment[] {
  const segments: LosSpeechSegment[] = [];
  let nextSlow = false;
  const readLabels = kind === "B" && ["03","06","07","09","10"].includes(chapterId);
  for (const block of blocks) {
    if (block.kind !== "prose" || !block.text?.trim()) continue;
    const raw = block.text.trim();
    const match = /^\*\*([^*]+):\*\*\s*(.*)$/s.exec(raw);
    const speaker = match?.[1]?.trim() ?? "Erzähler";
    const spoken = match ? (readLabels ? speaker+": "+(match[2]??"") : (match[2]??"")) : raw;
    const text = cleanSpokenText(spoken);
    if (!text) continue;
    const isSlow = nextSlow && /^Frau Berger$/.test(speaker);
    segments.push({speaker,text,rateFactor:isSlow?0.72:1});
    if (isSlow) nextSlow = false;
    if (/Bitte langsamer!/i.test(raw)) nextSlow = true;
  }
  return segments;
}
