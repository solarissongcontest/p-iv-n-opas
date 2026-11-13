import {useState} from "react";
import {type TeacherBoard,initialBoardView,nextBoardStep,
  previousBoardStep,revealBoard,visibleBoardSteps} from "./boardModel.ts";
import "./teaching-board.css";

/** Reusable LOS! teaching board. Every reveal is a deterministic authored step.
 * It deliberately writes no score or progress and makes no AI/audio claims. */
export function LosTeachingBoard({board}:{board:TeacherBoard}){
  const [view,setView]=useState(initialBoardView);
  const visible=visibleBoardSteps(board,view);
  const finished=view.showAll;
  return <section className="los-teaching-board" aria-label={"Opetustaulu: "+board.title}>
    <div className="los-teaching-board-heading">
      <div>
        <p className="los-teaching-board-kicker">OPETTAJAN TAULU · VAIHEITTAIN</p>
        <h6>{board.title}</h6>
        <p>{board.objective}</p>
      </div>
      <span className="los-teaching-board-count" role="status" aria-live="polite">
        Vaihe {visible.length}/{board.steps.length}
      </span>
    </div>
    <ol className="los-teaching-board-stages" aria-label="Näytetyt opetustaulun vaiheet">
      {visible.map((step,i)=><li key={step.id}
        className={"los-teaching-board-stage"+(i===visible.length-1?" is-current":"")}>
        <div className="los-teaching-board-stage-head">
          <span className="los-teaching-board-number">{i+1}</span>
          <strong>{step.heading}</strong>
        </div>
        <p>{step.explanation}</p>
        <div className="los-teaching-board-parts">
          {step.parts.map((part,j)=><div key={j}
            className={"los-teaching-board-part"+(part.emphasis?" is-emphasized":"")}>
            <span className="los-teaching-board-part-label">{part.label}</span>
            <span lang={part.language}>{part.text}</span>
          </div>)}
        </div>
      </li>)}
    </ol>
    {finished&&<p className="los-teaching-board-takeaway" role="note">
      <strong>Muista:</strong> {board.takeaway}
    </p>}
    <div className="los-teaching-board-controls" role="group" aria-label="Opetustaulun ohjaus">
      <button type="button" onClick={()=>setView(old=>previousBoardStep(board,old))}
        disabled={view.index===0&&!view.showAll}>Edellinen vaihe</button>
      <button type="button" onClick={()=>setView(old=>nextBoardStep(board,old))}
        disabled={view.showAll||view.index===board.steps.length-1}>Seuraava vaihe</button>
      <button type="button" onClick={()=>setView(old=>revealBoard(board,old))}
        disabled={view.showAll}>Näytä kaikki vaiheet</button>
      <button type="button" onClick={()=>setView(initialBoardView())}
        disabled={view.index===0&&!view.showAll}>Toista alusta</button>
    </div>
    <p className="los-teaching-board-note">Voit edetä ilman animaatioita ja palata aiempiin vaiheisiin.
      Opetustaulun katsominen ei merkitse tehtävää suoritetuksi.</p>
  </section>;
}
