/** C09's editorial fictional calendar, separate from the original weekday audio. */
export const WEEK_DAYS=[
 {de:'Montag',fi:'maanantai'},
 {de:'Dienstag',fi:'tiistai'},
 {de:'Mittwoch',fi:'keskiviikko'},
 {de:'Donnerstag',fi:'torstai'},
 {de:'Freitag',fi:'perjantai'},
 {de:'Samstag',fi:'lauantai'},
 {de:'Sonntag',fi:'sunnuntai'}
] as const;
export const TIME_OPTIONS=['um drei Uhr','um vier Uhr','um fünf Uhr'] as const;
export type WeeklyPlan=Record<string,string>;
export function getWeeklyPlan(value:unknown):WeeklyPlan {
 if(value===null||typeof value!=='object'||Array.isArray(value))return {};
 const input=value as Record<string,unknown>;
 return Object.fromEntries(WEEK_DAYS.map(day=>{
  const candidate=input[day.de];
  return [day.de,typeof candidate==='string'&&TIME_OPTIONS.some(v=>v===candidate)?candidate:''] as const;
 }));
}
export function completedWeek(value:unknown):boolean {
 const plan=getWeeklyPlan(value);
 return WEEK_DAYS.every(day=>TIME_OPTIONS.some(time=>time===plan[day.de]));
}
