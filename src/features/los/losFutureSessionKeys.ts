/** Non-authoritative UI cursor keys; answer and progress records are stored
 * separately through the owner-scoped studyState draft. Do not store the cursor
 * for an unknown device owner and never confuse a cursor with a lesson credit. */
export function losFutureLessonCursorKey(ownerId:string|null,bookId:number):string|null{
  if(!ownerId||!Number.isInteger(bookId)||bookId<2||bookId>8)return null;
  return `los.future.reader.${ownerId}.book${bookId}.lesson`;
}
export function losFutureStageCursorKey(ownerId:string|null,scriptId:string):string|null{
  if(!ownerId||!/^LOS[2-8]-L\d{3}$/.test(scriptId))return null;
  return `los.future.reader.${ownerId}.${scriptId}.stage`;
}
