import {useState} from "react";
import {LOS1_TEXT_B_SOURCES} from "../content/los1TextBAdditional.ts";
import "./greeting-media.css";

/**
 * L005's source is the already-attributed 28-second public-domain greeting
 * recording M-COM-03. Render its full, existing C01 transcript within Teacher
 * 2.0 rather than sending the learner out to read the teaching material.
 *
 * Playing/ending an HTML audio element is *not* proof of hearing or
 * understanding. No synthetic score, AI speech or tracking is performed.
 */
const SOURCE=LOS1_TEXT_B_SOURCES["01"];
const AUDIO_URL="https://commons.wikimedia.org/wiki/Special:Redirect/file/German_Vocabulary_-_Greetings.ogg";

export function LosTeacherGreetingMedia(){
 const [showText,setShowText]=useState(false);
 const [failed,setFailed]=useState(false);
 return <section className="los-teacher-greeting-media" aria-label="L005:n alkuperäinen kuuntelu ja koko tekstivastine">
   <h3>Kuuntele alkuperäistä saksaa</h3>
   <p>German Men92:n alkuperäinen noin 28 sekunnin äänite sisältää
    20 erillistä tervehdystä ja hyvästelyä. Se on ilmausluettelo, ei keskustelu.</p>
   <audio controls preload="none" src={AUDIO_URL}
    aria-label="Saksankieliset tervehdykset ja hyvästelyt, koko alkuperäisäänite"
    onError={()=>setFailed(true)}
    onCanPlay={()=>setFailed(false)}>
    Selaimesi ei tue äänitteen toistamista. Koko teksti löytyy alta.
   </audio>
   {failed&&<p role="alert">Äänite ei latautunut tai toisto ei ole tässä selaimessa tuettu.
     Voit jatkaa koko kirjoitetun luettelon avulla, mutta se ei ole kuullun ymmärtämisen näyttö.</p>}
   <p className="los-teacher-greeting-notice">Äänen toiston käynnistyminen tai päättyminen
    ei todista, että kuulit tai ymmärsit sen. Kirjallisia tehtäviä ei merkitä kuullun ymmärtämisen tuloksiksi.</p>
   <button type="button" aria-controls="los-teacher-greeting-transcript"
    aria-expanded={showText} onClick={()=>setShowText(value=>!value)}>
    {showText?"Piilota kirjoitettu luettelo":"Näytä kaikki 20 ilmausta ja suomennokset"}
   </button>
   <div className="los-teacher-greeting-transcript" id="los-teacher-greeting-transcript" hidden={!showText}>
     <p>Kaikki alkuperäisen luettelon ilmaukset löytyvät alta.
      Tätä voi käyttää myös, jos ääni ei toimi. Tekstin lukeminen ei ole kuuntelunäyttö.</p>
     <ol>{SOURCE.lines.map(line=><li key={line.id}>
       <span lang="de">{line.text}</span>
       <span>{line.meaning}</span>
     </li>)}</ol>
   </div>}
   <p className="los-teacher-greeting-source">Lähde:
    <a href={SOURCE.attribution.url} target="_blank" rel="noopener noreferrer">
     {SOURCE.attribution.title}</a>, {SOURCE.attribution.author},
    {" "}<a href={SOURCE.attribution.licenseUrl} target="_blank" rel="noopener noreferrer">
     {SOURCE.attribution.license}</a>.
    Linkit ovat tekijä- ja lisenssitietoja varten; opiskeltava teksti on kokonaan LOS!:ssa.</p>
 </section>;
}
