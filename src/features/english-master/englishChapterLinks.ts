import type {Lesson} from "./EnglishMasterBook";

/** Exact English Master printed chapter identifiers and the two currently
 * implemented A-series entry points. A01-A07 are NOT silently invented pages.
 */
export function resolveEnglishBookRef(reference:string):string|null{
  const match=reference.match(/^(A00|A08|[GVWRLSMY][0-9]{1,3})(?=$|[/:.#-])/i);
  return match?.[1]?.toUpperCase()??null;
}

/** A00 and A08 are defined as onboarding content in the masterplan but have
 * no chapter entry in Alpha 0.8. Link to the real existing native home/path
 * views instead of navigating to a nonexistent #/book/A00 page.
 */
export function englishReaderHashForRef(ref:string):string{
  if(ref==="A00")return "#/home";
  if(ref==="A08")return "#/path";
  return "#/book/"+encodeURIComponent(ref);
}

/** Reverse-link authored lesson references so a chapter is still discoverable
 * when its draft linked_lesson_ids field is empty. This changes navigation,
 * never completion, evidence, or the original manuscript.
 */
export function relatedEnglishLessonIds(
  chapterId:string,
  explicitIds:readonly string[],
  lessons:readonly Pick<Lesson,"content_id"|"book_refs">[],
):string[]{
  const known=new Set(lessons.map(item=>item.content_id));
  const result=new Set(explicitIds.filter(id=>known.has(id)));
  for(const lesson of lessons){
    if((lesson.book_refs??[]).some(ref=>resolveEnglishBookRef(ref)===chapterId)){
      result.add(lesson.content_id);
    }
  }
  return [...result];
}
