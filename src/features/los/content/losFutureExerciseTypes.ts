/** LOS! 2–8:n käsikirjoituksiin perustuva tehtäväluonnos.
 * Julkaisustatus: DRAFT, ei tarkistettua automaattista oikeellisuusarviota. */
export type LosFutureExerciseDraft = {
  id:string;
  chapterId:string;
  group:"T"|"R";
  title:string;
  question:string;
  suggestedAnswer:string;
  feedback:string;
  assessment:string;
};
