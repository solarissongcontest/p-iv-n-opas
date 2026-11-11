import { useEffect, useRef, useState } from "react";
import { Mic, Square, Trash2, Download } from "lucide-react";

const MAX_RECORDING_MS = 45_000;

function supportedAudioType(): string | undefined {
  const preferred = ["audio/mp4", "audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus"];
  if (typeof MediaRecorder === "undefined") return undefined;
  return preferred.find(type => MediaRecorder.isTypeSupported(type));
}
function extensionFor(mime: string): string {
  if (mime.includes("mp4")) return "m4a";
  if (mime.includes("ogg")) return "ogg";
  return "webm";
}
function stopTracks(stream: MediaStream | null) {
  stream?.getTracks().forEach(track => track.stop());
}

/** Audio is opt-in, kept only in this page's memory, and never inserted into
 * useLosRecord, the offline sync queue or Supabase. The learner explicitly
 * downloads a local copy if they want to keep it after leaving this page.
 */
export function SpeechRecorder({ title = "Oma puheharjoitus", exampleDe = "Hallo! Guten Morgen! Bis später!" }: { title?: string; exampleDe?: string }) {
  const [recording, setRecording] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [clipUrl, setClipUrl] = useState<string | null>(null);
  const [clipMime, setClipMime] = useState<string>("audio/webm");
  const [message, setMessage] = useState("");
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const fileUrl = useRef<string | null>(null);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(true);
  const requestNumber = useRef(0);

  const clearClip = () => {
    if (fileUrl.current) URL.revokeObjectURL(fileUrl.current);
    fileUrl.current = null;
    setClipUrl(null);
  };
  const clearTimer = () => {
    if (stopTimer.current !== null) clearTimeout(stopTimer.current);
    stopTimer.current = null;
  };
  const stop = () => {
    clearTimer();
    const current = recorder.current;
    if (current?.state === "recording") current.stop();
    stopTracks(stream.current);
    stream.current = null;
    setRecording(false);
  };
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      requestNumber.current++;
      clearTimer();
      const current = recorder.current;
      if (current?.state === "recording") current.stop();
      recorder.current = null;
      stopTracks(stream.current);
      stream.current = null;
      if (fileUrl.current) URL.revokeObjectURL(fileUrl.current);
      fileUrl.current = null;
    };
  }, []);

  const start = async () => {
    if (recording || requesting) return;
    setMessage("");
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined") {
      setMessage("Tämä selain tai suojaamaton yhteys ei tarjoa äänitystä. Voit silti puhua ääneen ja tehdä itsearvioinnin.");
      return;
    }
    const thisRequest = ++requestNumber.current;
    setRequesting(true);
    try {
      // The permission dialog opens only in response to this button click.
      const permitted = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      if (!mounted.current || thisRequest !== requestNumber.current) {
        stopTracks(permitted); return;
      }
      stream.current = permitted;
      clearClip();
      const type = supportedAudioType();
      const instance = type ? new MediaRecorder(permitted, { mimeType: type }) : new MediaRecorder(permitted);
      const chunks: Blob[] = [];
      instance.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      instance.onerror = () => {
        if (mounted.current) setMessage("Äänitys epäonnistui. Voit kokeilla uudelleen tai tehdä vain itsearvioinnin.");
      };
      instance.onstop = () => {
        stopTracks(permitted);
        if (stream.current === permitted) stream.current = null;
        if (!mounted.current || !chunks.length) return;
        const mime = instance.mimeType || type || "audio/webm";
        const blob = new Blob(chunks, { type: mime });
        if (!blob.size) {
          setMessage("Äänitteestä ei syntynyt toistettavaa tiedostoa. Kokeile uudestaan.");
          return;
        }
        const url = URL.createObjectURL(blob);
        if (fileUrl.current) URL.revokeObjectURL(fileUrl.current);
        fileUrl.current = url;
        setClipUrl(url);
        setClipMime(mime);
        setMessage("Äänitys valmis. Kuuntele itse tai tallenna tiedosto omalle laitteellesi.");
      };
      recorder.current = instance;
      instance.start();
      setRecording(true);
      setMessage("Äänitys käynnissä. Puhu selkeästi ja lopeta itse, viimeistään 45 sekunnin kuluttua.");
      stopTimer.current = setTimeout(stop, MAX_RECORDING_MS);
    } catch {
      stopTracks(stream.current);
      stream.current = null;
      setMessage("Mikrofonia ei voitu avata. Tarkista selaimen käyttöoikeus. Puheen itsearvioinnin voi tehdä ilman äänitystä.");
    } finally {
      if (mounted.current && thisRequest === requestNumber.current) setRequesting(false);
    }
  };

  return <section className="los-speech-recorder" aria-label={title}>
    <h4><Mic size={18}/> {title}</h4>
    <p className="los-support">
      Lausu esimerkiksi <span lang="de">{exampleDe}</span> ja kuuntele omaa puhettasi.
      Ääni tallentuu vain väliaikaiseen selaimen muistiin, ei palvelimelle, oppimismerkintöihin tai pilvisynkronointiin.
      Voit halutessasi ladata tiedoston itse. Äänite katoaa, kun poistut sivulta.
    </p>
    <div className="los-speech-actions">
      {recording ?
        <button type="button" className="los-button los-button-secondary" onClick={stop}>
          <Square size={16}/> Lopeta äänitys
        </button> :
        <button type="button" className="los-button los-button-primary"
          disabled={requesting} onClick={() => { void start(); }}>
          <Mic size={17}/> {requesting ? "Pyydetään mikrofonilupaa…" : "Aloita oma äänitys"}
        </button>}
    </div>
    {message && <p className="los-support" role="status">{message}</p>}
    {clipUrl && <div className="los-speech-preview">
      <audio controls preload="metadata" src={clipUrl} aria-label="Kuuntele omaa puhetta"/>
      <div className="los-speech-actions">
        <a className="los-button los-button-secondary" href={clipUrl}
          download={"los-oma-puhe." + extensionFor(clipMime)}>
          <Download size={16}/> Tallenna laitteelle
        </a>
        <button type="button" className="los-button los-button-secondary" onClick={() => {
          clearClip(); setMessage("Äänite poistettu selaimen väliaikaisesta muistista.");
        }}><Trash2 size={16}/> Poista äänite</button>
      </div>
    </div>}
  </section>;
}
