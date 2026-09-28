/** Finnish formatting + date helpers (week starts Monday). */

const WEEKDAYS = [
  "sunnuntai",
  "maanantai",
  "tiistai",
  "keskiviikko",
  "torstai",
  "perjantai",
  "lauantai",
];
const WEEKDAYS_SHORT = ["su", "ma", "ti", "ke", "to", "pe", "la"];
const MONTHS = [
  "tammikuuta",
  "helmikuuta",
  "maaliskuuta",
  "huhtikuuta",
  "toukokuuta",
  "kesäkuuta",
  "heinäkuuta",
  "elokuuta",
  "syyskuuta",
  "lokakuuta",
  "marraskuuta",
  "joulukuuta",
];
const MONTHS_NOM = [
  "tammikuu",
  "helmikuu",
  "maaliskuu",
  "huhtikuu",
  "toukokuu",
  "kesäkuu",
  "heinäkuu",
  "elokuu",
  "syyskuu",
  "lokakuu",
  "marraskuu",
  "joulukuu",
];

export function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseISO(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function today(): string {
  return toISO(new Date());
}

export function addDays(iso: string, n: number): string {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
}

export function diffDays(a: string, b: string): number {
  return Math.round((parseISO(a).getTime() - parseISO(b).getTime()) / 86400000);
}

export function startOfWeek(iso: string): string {
  const d = parseISO(iso);
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  return toISO(d);
}

export function weekNumber(iso: string): number {
  const d = parseISO(iso);
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dayNr = (target.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const firstDayNr = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDayNr + 3);
  return 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 86400000));
}

export function longDate(iso: string): string {
  const d = parseISO(iso);
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function shortDate(iso: string): string {
  const d = parseISO(iso);
  return `${d.getDate()}.${d.getMonth() + 1}.`;
}

export function dateWithWeekday(iso: string): string {
  const d = parseISO(iso);
  return `${WEEKDAYS_SHORT[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}.`;
}

export function weekdayShort(iso: string): string {
  return WEEKDAYS_SHORT[parseISO(iso).getDay()];
}

export function monthName(iso: string): string {
  return MONTHS_NOM[parseISO(iso).getMonth()];
}

export function fullDate(iso: string): string {
  const d = parseISO(iso);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}

/** 95 -> "1 h 35 min", 40 -> "40 min" */
export function minutes(total: number): string {
  const m = Math.max(0, Math.round(total));
  const h = Math.floor(m / 60);
  const rest = m % 60;
  if (h === 0) return `${rest} min`;
  if (rest === 0) return `${h} h`;
  return `${h} h ${rest} min`;
}

export function signedMinutes(total: number): string {
  const sign = total >= 0 ? "+" : "−";
  return `${sign}${minutes(Math.abs(total))}`;
}

export function num(n: number, digits = 0): string {
  return n.toLocaleString("fi-FI", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function greeting(d = new Date()): string {
  const h = d.getHours();
  if (h < 5) return "Hyvää yötä";
  if (h < 10) return "Hyvää aamua";
  if (h < 17) return "Hyvää päivää";
  if (h < 22) return "Hyvää iltaa";
  return "Hyvää yötä";
}

export function daysLeftLabel(days: number): string {
  if (days < 0) return `${Math.abs(days)} päivää sitten`;
  if (days === 0) return "tänään";
  if (days === 1) return "huomenna";
  return `${days} päivän päästä`;
}
