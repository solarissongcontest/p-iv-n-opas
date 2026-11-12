import { useEffect, useMemo, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/** Browser voices are capabilities, not evidence of a reviewed pronunciation. */
export function findLosGermanVoice(voices: readonly SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const german = voices.filter(voice => /^de(?:-|$)/i.test(voice.lang));
  return german.find(voice => /^de-DE$/i.test(voice.lang)) ?? german[0] ?? null;
}

export function LosPronunciationButton({ text }: { text: string }) {
  const [voices, setVoices] = useState<readonly SpeechSynthesisVoice[]>([]);
  const [status, setStatus] = useState<"checking" | "ready" | "playing" | "error" | "unavailable">("checking");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) ||
      typeof SpeechSynthesisUtterance === "undefined") {
      setStatus("unavailable");
      return;
    }
    const synth = window.speechSynthesis;
    const refresh = () => {
      const available = synth.getVoices();
      setVoices(available);
      setStatus(current => current === "playing" ? current : findLosGermanVoice(available) ? "ready" : "unavailable");
    };
    refresh();
    synth.addEventListener?.("voiceschanged", refresh);
    return () => {
      synth.removeEventListener?.("voiceschanged", refresh);
      synth.cancel();
    };
  }, []);

  const voice = useMemo(() => findLosGermanVoice(voices), [voices]);
  const speak = () => {
    if (!voice || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = 0.85;
    utterance.onstart = () => { setStatus("playing"); setError(""); };
    utterance.onend = () => setStatus("ready");
    utterance.onerror = event => {
      if (event.error === "canceled" || event.error === "interrupted") return;
      setStatus("error");
      setError("Saksankielisen puhesynteesin toisto epäonnistui tällä laitteella.");
    };
    try { synth.speak(utterance); }
    catch {
      setStatus("error");
      setError("Puheääntä ei voitu käynnistää.");
    }
  };
  return <span className="los-pronunciation-control">
    <button type="button" className="los-pronunciation-button" disabled={!voice}
      onClick={speak} aria-label={voice
        ? `Kuuntele ${text}, synteettinen saksankielinen esikatselu`
        : `Ääntämismallia sanalle ${text} ei ole saatavilla tällä laitteella`}>
      {voice ? <Volume2 size={17} aria-hidden="true"/> : <VolumeX size={17} aria-hidden="true"/>}
      {status === "playing" ? "Toistetaan…" : voice ? "Kuuntele (synteettinen)" : "Ääni ei saatavilla"}
    </button>
    <small className="los-pronunciation-disclaimer">
      {voice ? "Laitteen saksankielinen TTS. Äänen laatua ei ole laitetestattu." :
        "Saksankielistä TTS-ääntä ei löytynyt. Virheellistä vieraskielistä ääntä ei käytetä."}
    </small>
    {error && <span role="alert" className="los-audio-error">{error}</span>}
  </span>;
}
