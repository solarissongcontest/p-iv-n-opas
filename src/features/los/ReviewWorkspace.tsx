import { useState, type FormEvent } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import type { Book } from "./model";
import { useLosRecord, losSyncMessage } from "./data/useLosRecord";
import {
  bookReviewCards, localDay, nextReview, reviewCounts, reviewQueue,
  reviewedAnswerCorrect, type ReviewLedger,
} from "./spacedReview";

/** Retrieval practice, not a certificate, CEFR metric, or artificial streak.
 * Only vocabulary explicitly authored in a book is eligible.
 */
export function ReviewWorkspace({ book }: { book: Book }) {
  const { value: ledger, update: updateLedger, status } = useLosRecord<ReviewLedger>(
    book.id, "review", "vocabulary", book.contentVersion, {},
  );
  const [reviewedHere, setReviewedHere] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [feedback, setFeedback] = useState<{ id: string; correct: boolean; typed: string } | null>(null);
  const today = localDay(new Date());
  const cards = bookReviewCards(book);
  const counts = reviewCounts(cards, ledger, today);
  const remaining = reviewQueue(cards, ledger, today, 8).filter(card => !reviewedHere.includes(card.id));
  const current = activeId && feedback ? cards.find(card => card.id === activeId) : remaining[0];

  const finish = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!current || !draft.trim() || feedback || status === "loading") return;
    const correct = reviewedAnswerCorrect(draft, current);
    updateLedger(previous => ({
      ...previous,
      [current.id]: nextReview(previous[current.id], current, correct, today),
    }));
    setActiveId(current.id);
    setReviewedHere(previous => previous.includes(current.id) ? previous : [...previous, current.id]);
    setFeedback({ id: current.id, correct, typed: draft });
  };
  const next = () => { setActiveId(null); setFeedback(null); setDraft(""); };
  return <section className="los-reviews">
    <p className="los-eyebrow">HAJAUTETTU KERTAUS</p>
    <h1>Kertaa sanastoa</h1>
    <p className="los-intro">Palauta saksankielinen ilmaus mieleen suomenkielisestä vihjeestä ennen vastauksen näyttämistä. LOS!:n alkuväleinä ovat 1, 3, 7, 14 ja 30 päivää. Väärän vastauksen jälkeen sana palaa harjoiteltavaksi aiemmin.</p>
    <div className="los-review-summary" aria-label="Sanaston kertaustilanne">
      <div><strong>{counts.due}</strong><span>Kerrattavaa tänään</span></div>
      <div><strong>{counts.fresh}</strong><span>Uusia kortteja</span></div>
      <div><strong>{counts.upcoming}</strong><span>Tulevia kertauksia</span></div>
    </div>
    <p className="los-storage-state" role="status">{losSyncMessage(status)}</p>
    {status === "loading" ? <div className="los-empty"><h2>Haetaan omia kertauksia</h2><p>Kertaus ei ala ennen kuin tallenteet on ladattu.</p></div> :
      !cards.length ? <div className="los-empty"><h2>Ei vielä kerrattavaa sanastoa</h2><p>Kun kirjassa julkaistaan tarkistettuja sanastoja, ne löytyvät tästä. Tyhjistä oppitunneista ei luoda sanoja.</p></div> :
      !current ? <div className="los-empty"><h2>Harjoitteluerä valmis</h2>
        <p>Tässä erässä käsittelit {reviewedHere.length} korttia. Kertaukset ajoitettiin vastaustesi mukaan. Voit myöhemmin palata harjoittelemaan tai lukea kappaleen alkuperäistekstiä.</p>
      </div> :
        <div className="los-review-card">
          <div className="los-review-card-head">
            <span><RotateCcw size={17}/> Kortti {reviewedHere.length + (feedback ? 0 : 1)} / enintään 8</span>
            <span>{ledger[current.id] ? "Kertaus" : "Uusi sana"}</span>
          </div>
          <p className="los-eyebrow">SUOMI → DEUTSCH</p>
          <p className="los-review-question" lang="fi">{current.fi}</p>
          {current.note && <p className="los-support">{current.note}</p>}
          <form onSubmit={finish}>
            <label htmlFor="los-review-answer">Kirjoita saksankielinen sana tai ilmaus</label>
            <input id="los-review-answer" type="text" lang="de" autoComplete="off" autoCapitalize="none"
              spellCheck={false} value={draft} disabled={Boolean(feedback)} onChange={event => setDraft(event.target.value)}/>
            {!feedback && <div className="los-umlauts" aria-label="Saksan erikoismerkit">
              {["ä","ö","ü","ß"].map(letter => <button type="button" key={letter}
                onClick={() => setDraft(value => value + letter)}>{letter}</button>)}
            </div>}
            {!feedback && <button type="submit" className="los-button los-button-primary"
              disabled={!draft.trim()}>Tarkista muistista</button>}
          </form>
          {feedback?.id === current.id && <div className={"los-review-feedback " + (feedback.correct ? "is-correct" : "is-incorrect")} role="status">
            <strong>{feedback.correct ? "Muistit oikein" : "Kerrataan vielä"}</strong>
            <p><span>Oikea ilmaus: </span><b lang="de">{current.de}</b></p>
            {!feedback.correct && <p>Kirjoitit: <span lang="de">{feedback.typed}</span></p>}
            <p>{feedback.correct ? "Seuraava kertaus siirtyy myöhemmäksi." : "Sana tulee uudelleen harjoiteltavaksi lähiaikoina. Tämä ei ole rangaistus."}</p>
            <button className="los-button los-button-primary" type="button" onClick={next}>
              Seuraava sana <ArrowRight size={17}/>
            </button>
          </div>}
        </div>}
    <p className="los-support">Kertaus mittaa vain tässä tehtyjen yksittäisten sanavastausten onnistumista. Se ei yksin osoita laajaa kielitaitoa eikä vastaa virallista koetta. Päiväkohtaisia väliin jääneitä harjoituksia ei kerrytetä velaksi.</p>
  </section>;
}
