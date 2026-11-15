/** Käsikirjoituksen v1.0 ohjattu oppitunti. Aineisto on kielellisesti tarkistamaton
 * luonnos. Opettajan ohjaus on kirjoitettu valmiiksi tässä tietueessa; tästä
 * yksin ei voi johtaa suoritusta, kielitaitotasoa tai koearvosanaa. */
export type LosFutureLessonContent = {
  id:string;
  number:number;
  title:string;
  kind:"chapter"|"review";
  objective:string;
  intro:string;
  resource:string;
  model:string;
  guidance:string;
  attempt:string;
  timings:{minutes:number;activity:string}[];
  exerciseIds:string[];
  teacherTip:string;
  exitCheck:string;
  extra:string;
  reviewTeaching:string;
  reviewTask:string;
  reviewTiming:string;
  reviewRule:string;
};
