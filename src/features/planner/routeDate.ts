export function isoWeekFromDate(dateISO: string) {
  const date = new Date(dateISO + "T12:00:00Z");
  const target = new Date(date);
  const day = (date.getUTCDay() + 6) % 7;
  target.setUTCDate(date.getUTCDate() - day + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const firstDay = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDay + 3);
  const week = 1 + Math.round((target.getTime() - firstThursday.getTime()) / 604800000);
  return `${target.getUTCFullYear()}-W${String(week).padStart(2,"0")}`;
}

export function dateFromIsoWeek(value: string) {
  const match = /^(\d{4})-W(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const week = Number(match[2]);
  if (week < 1 || week > 53) return null;
  const fourthJan = new Date(Date.UTC(year, 0, 4));
  const day = (fourthJan.getUTCDay() + 6) % 7;
  const monday = new Date(fourthJan);
  monday.setUTCDate(fourthJan.getUTCDate() - day + (week - 1) * 7);
  const result = monday.toISOString().slice(0,10);
  return isoWeekFromDate(result) === value ? result : null;
}
