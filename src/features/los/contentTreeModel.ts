/** Canonical exercise links for LOS! U3. Keep persisted task IDs unchanged. */
import { losExercisesFor } from "./exerciseBank.ts";
import { losRichTasksFor } from "./content/los1RichExercises.ts";

export type LosContentTask = { id:string; chapterId:string; section:"practice"|"test"; label:string };
/** Build task links from the same IDs as the existing renderer, never display invented exercises. */
export function losContentTasks(chapterId:string, mode:"practice"|"test"):LosContentTask[] {
  const core=losExercisesFor(chapterId).map((task,index)=>({
    id:task.id,chapterId,section:mode,label:`${index+1}. ${task.prompt}`,
  }));
  return mode==="test"?core:[
    ...core,
    ...losRichTasksFor(chapterId).map(task=>({
      id:task.id,chapterId,section:"practice" as const,label:task.prompt,
    })),
  ];
}
export function isLosContentTask(chapterId:string, mode:"practice"|"test", id:string):boolean {
  return losContentTasks(chapterId,mode).some(task=>task.id===id);
}
