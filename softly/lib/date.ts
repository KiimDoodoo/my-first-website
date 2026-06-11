import type { Language } from "./types";

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Local date as YYYY-MM-DD. */
export function todayStr(): string {
  return toDateStr(new Date());
}

export function dateStrDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return toDateStr(d);
}

/** Current local time as HH:MM. */
export function nowTimeStr(): string {
  const d = new Date();
  return `${`${d.getHours()}`.padStart(2, "0")}:${`${d.getMinutes()}`.padStart(2, "0")}`;
}

/** Whole days between two YYYY-MM-DD strings (b - a). */
export function daysBetween(a: string, b: string): number {
  const da = new Date(`${a}T00:00:00`);
  const db = new Date(`${b}T00:00:00`);
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}

/** The last `n` dates ending today, oldest first. */
export function lastNDates(n: number): string[] {
  return Array.from({ length: n }, (_, i) => dateStrDaysAgo(n - 1 - i));
}

export function formatDateDisplay(dateStr: string, lang: Language): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

/** Day-of-year, used to rotate the daily mode-specific question. */
export function dayOfYear(dateStr: string): number {
  const d = new Date(`${dateStr}T00:00:00`);
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86_400_000);
}
