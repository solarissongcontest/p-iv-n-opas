import type { LosFutureExerciseDraft } from "./losFutureExerciseTypes";

export type LosFutureExerciseMode = "understand"|"practice"|"apply";

export function losFutureTaskNumber(task:LosFutureExerciseDraft):number {
  return Number(task.id.match(/(?:T|R)(\d{2})$/)?.[1] ?? 0);
}

/** Masterplanin kappalejaot: 20 T-tehtävää + 6 R-lukutehtävää.
 * Sama ID saa esiintyä tasan yhdessä kappaleosiossa. */
export function losFutureExercisesForSection(items:LosFutureExerciseDraft[],mode:LosFutureExerciseMode):LosFutureExerciseDraft[] {
  return items.filter(item=>{
    const number=losFutureTaskNumber(item);
    if(mode==="understand")return (item.group==="T"&&number>=1&&number<=6)||(item.group==="R"&&number>=1&&number<=3);
    if(mode==="practice")return (item.group==="T"&&number>=7&&number<=17)||(item.group==="R"&&number>=4&&number<=6);
    return item.group==="T"&&number>=18&&number<=20;
  });
}
