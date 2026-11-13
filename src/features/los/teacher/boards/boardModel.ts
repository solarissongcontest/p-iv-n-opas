/**
 * LOS! Teacher 2.0 reusable, authored teaching-board contract.
 * Display steps are presentation only; no answers, grading, or mastery state.
 */
export type TeacherBoardPart = {
  label:string;
  text:string;
  language?:"de"|"fi";
  emphasis?:boolean;
};
export type TeacherBoardStep = {
  id:string;
  heading:string;
  explanation:string;
  parts:readonly TeacherBoardPart[];
};
export type TeacherBoard = {
  id:string;
  title:string;
  objective:string;
  review:"draft"|"approved";
  steps:readonly TeacherBoardStep[];
  takeaway:string;
};
export type TeacherBoardView = {index:number;showAll:boolean};

const idValid=(value:string)=>/^[a-z][a-z0-9-]{0,47}$/.test(value);
export function validateTeacherBoard(board:TeacherBoard):string[]{
  const errors:string[]=[];
  if(!idValid(board.id)||board.title.trim().length<8||board.objective.trim().length<20||
    board.takeaway.trim().length<30||board.steps.length<3||board.steps.length>8)
    errors.push("incomplete board: "+board.id);
  if(new Set(board.steps.map(step=>step.id)).size!==board.steps.length)
    errors.push("duplicate board steps");
  board.steps.forEach(step=>{
    if(!idValid(step.id)||step.heading.trim().length<5||
      step.explanation.trim().length<20||step.parts.length<1||step.parts.length>4||
      step.parts.some(part=>part.label.trim().length<3||!part.text.trim()))
      errors.push("incomplete step: "+step.id);
  });
  return errors;
}
export function initialBoardView():TeacherBoardView{return {index:0,showAll:false};}
export function nextBoardStep(board:TeacherBoard,view:TeacherBoardView):TeacherBoardView{
  if(view.showAll||view.index>=board.steps.length-1)return view;
  return {index:view.index+1,showAll:false};
}
export function previousBoardStep(board:TeacherBoard,view:TeacherBoardView):TeacherBoardView{
  if(view.showAll)return {index:Math.max(0,board.steps.length-2),showAll:false};
  if(view.index===0)return view;
  return {index:view.index-1,showAll:false};
}
export function revealBoard(board:TeacherBoard,view:TeacherBoardView):TeacherBoardView{
  if(view.showAll)return view;
  return {index:Math.max(0,board.steps.length-1),showAll:true};
}
export function visibleBoardSteps(board:TeacherBoard,view:TeacherBoardView):readonly TeacherBoardStep[]{
  return view.showAll?board.steps:board.steps.slice(0,Math.min(board.steps.length,Math.max(0,view.index+1)));
}
