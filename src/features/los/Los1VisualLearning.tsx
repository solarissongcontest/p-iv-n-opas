import {useId,useState} from "react";
import {Eye,EyeOff,Image as ImageIcon} from "lucide-react";
import {Los1ChapterImage} from "./Los1ChapterImage";
import {getLos1VisualPhrases,LOS1_VISUAL_LESSONS,type VisualPlacement} from "./los1VisualLearning";
import "./los1-visual-learning.css";

/** A photo-led retrieval prompt, not an exam and not a depiction of the
 * original Text A/ B speakers. This component NEVER writes study state.
 */
export function Los1VisualLearning({chapterId,placement}:{
  chapterId:string;
  placement:VisualPlacement;
}){
  const [showExamples,setShowExamples]=useState(false);
  const hintId=useId();
  const lesson=LOS1_VISUAL_LESSONS[chapterId];
  if(!lesson||lesson.placement!==placement)return null;
  const phrases=getLos1VisualPhrases(chapterId);
  return <section className="los1-visual-learning"
    aria-label={"Kappaleen "+chapterId+" kuvaan perustuva sanastoharjoitus"}>
    <div className="los1-visual-learning-header">
      <span><ImageIcon size={17} aria-hidden="true"/> BILDIMPULS · KATSO JA OIVALLA</span>
      <small>Harjoitus · Ei pisteytystä</small>
    </div>
    <div className="los1-visual-learning-layout">
      <Los1ChapterImage key={chapterId} chapterId={chapterId} variant="learning"/>
      <div className="los1-visual-learning-task">
        <h2>Katso kuvaa ja mieti saksaksi</h2>
        <p>{lesson.question}</p>
        <p className="los1-visual-learning-instruction">
          Mieti ensin itse. Saat sitten näkyviin kolme kappaleen
          sanastosta poimittua ilmausta ja niiden suomennokset.
        </p>
        <button type="button" className="los1-visual-learning-toggle"
          aria-expanded={showExamples} aria-controls={hintId}
          onClick={()=>setShowExamples(v=>!v)}>
          {showExamples?<EyeOff size={17}/>:<Eye size={17}/>}
          {showExamples?"Piilota mallifraasit":"Näytä mallifraasit"}
        </button>
        <div id={hintId}>
          {showExamples&&<ol className="los1-visual-learning-phrases">
            {phrases.map(phrase=><li key={phrase.de}>
              <strong lang="de">{phrase.de}</strong>
              <span lang="fi">{phrase.fi}</span>
            </li>)}
          </ol>}
        </div>
      </div>
    </div>
    <p className="los1-visual-learning-note">{lesson.note}</p>
  </section>;
}
