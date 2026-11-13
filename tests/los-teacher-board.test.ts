import {test} from "node:test";
import {strict as assert} from "node:assert";
import {L004_BOARDS,L004_MODEL_BOARD,L004_RULE_BOARD} from "../src/features/los/teacher/content/l004Boards.ts";
import {initialBoardView,nextBoardStep,previousBoardStep,revealBoard,visibleBoardSteps,validateTeacherBoard,
  type TeacherBoard} from "../src/features/los/teacher/boards/boardModel.ts";

test("the two L004 boards contain five authored deterministic stages each",()=>{
  for(const board of Object.values(L004_BOARDS)){
    assert.equal(board.review,"draft");
    assert.deepEqual(validateTeacherBoard(board),[]);
    assert.equal(board.steps.length,5);
    assert.equal(new Set(board.steps.map(s=>s.id)).size,5);
  }
  assert.equal(L004_RULE_BOARD.steps[1]?.parts[0]?.text,"Guten Abend!");
  assert.equal(L004_RULE_BOARD.steps[3]?.parts[0]?.text,"Gute Nacht!");
  assert.equal(L004_MODEL_BOARD.steps[3]?.parts[0]?.text,"Guten Morgen, Frau Müller!");
});
test("step-by-step board exposes only current and prior authored steps",()=>{
  const board=L004_MODEL_BOARD;
  let view=initialBoardView();
  assert.deepEqual(visibleBoardSteps(board,view).map(s=>s.id),["situation"]);
  assert.equal(previousBoardStep(board,view),view);
  view=nextBoardStep(board,view);
  assert.deepEqual(visibleBoardSteps(board,view).map(s=>s.id),["situation","meeting"]);
  view=nextBoardStep(board,view);
  assert.deepEqual(visibleBoardSteps(board,view).map(s=>s.id),["situation","meeting","morning"]);
  view=previousBoardStep(board,view);
  assert.equal(view.index,1);
});
test("reveal-all, reverse and restart remain deterministic without timers or grading",()=>{
  const board=L004_RULE_BOARD,initial=initialBoardView();
  const shown=revealBoard(board,initial);
  assert.equal(shown.showAll,true);
  assert.equal(shown.index,4);
  assert.equal(visibleBoardSteps(board,shown).length,5);
  assert.equal(revealBoard(board,shown),shown);
  const back=previousBoardStep(board,shown);
  assert.deepEqual(back,{index:3,showAll:false});
  assert.equal(visibleBoardSteps(board,back).length,4);
  assert.deepEqual(initialBoardView(),initial);
  let end=initial;
  for(let i=0;i<10;i++)end=nextBoardStep(board,end);
  assert.equal(end.index,4);
  assert.equal(nextBoardStep(board,end),end);
});
test("board schema rejects duplicated or incomplete explanation steps",()=>{
  const original=L004_RULE_BOARD;
  const duplicate:TeacherBoard={...original,steps:[original.steps[0]!,original.steps[0]!,...original.steps.slice(2)]};
  assert.ok(validateTeacherBoard(duplicate).includes("duplicate board steps"));
  const empty:TeacherBoard={...original,steps:[{...original.steps[0]!,explanation:"x"},...original.steps.slice(1)]};
  assert.equal(validateTeacherBoard(empty).length,1);
});
