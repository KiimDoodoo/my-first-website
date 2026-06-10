import type { Dict } from "./i18n/ko";
import type { CheckInDraft, DailyCheckIn, Mode } from "./types";
import { dateStrDaysAgo, dayOfYear, daysBetween } from "./date";

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Rule-based relational greeting: the character references the last
 * few days of records. Never guilt-tripping, never judging.
 */
export function getGreeting(
  checkIns: DailyCheckIn[],
  today: string,
  t: Dict,
): string {
  const g = t.home.greetings;

  if (checkIns.some((c) => c.date === today)) {
    return pick(g.checkedInToday);
  }

  const yesterday = checkIns.find((c) => c.date === dateStrDaysAgo(1));
  if (yesterday?.bodyState === "overloaded") {
    return g.yesterdayOverloaded;
  }

  if (checkIns.length > 0) {
    const lastDate = checkIns
      .map((c) => c.date)
      .sort()
      .at(-1)!;
    if (daysBetween(lastDate, today) >= 2) {
      return g.longGap;
    }
  }

  return pick(g.default);
}

/**
 * Post-check-in response, varied by today's answers so reactions
 * don't feel canned. Candidates from the matching pools plus the
 * generic pool; one is picked at random.
 */
export function pickResponse(
  answers: CheckInDraft["answers"],
  t: Dict,
): string {
  const r = t.checkin.responses;
  const candidates: string[] = [...r.generic];

  if (answers.bodyState === "okay") candidates.push(...r.okay);
  if (answers.bodyState === "normal") candidates.push(...r.normal);
  if (answers.bodyState === "overloaded") candidates.push(...r.overloaded);
  if (answers.fatigue === "high" || answers.stress === "high") {
    candidates.push(...r.heavyLoad);
  }

  return pick(candidates);
}

export type ModeQuestionId = keyof Dict["checkin"]["modeQuestions"];

const MODE_QUESTION_IDS: Record<Mode, ModeQuestionId[]> = {
  worker: ["worker_schedule", "worker_energy", "worker_drain"],
  parent: ["parent_night", "parent_solo", "parent_fatigue"],
  student: ["student_school", "student_drain", "student_screen"],
};

/** One mode-specific question per day, rotating with the date. */
export function modeQuestionIdForDate(mode: Mode, date: string): ModeQuestionId {
  const ids = MODE_QUESTION_IDS[mode];
  return ids[dayOfYear(date) % ids.length];
}

/** Encode a mode-question answer for the `mainDrain` field. */
export function encodeMainDrain(qid: ModeQuestionId, value: string): string {
  return `${qid}:${value}`;
}

/** Resolve a stored `mainDrain` value into readable question/answer text. */
export function decodeMainDrain(
  mainDrain: string,
  t: Dict,
): { question: string; answer: string } | null {
  const sep = mainDrain.indexOf(":");
  if (sep === -1) return null;
  const qid = mainDrain.slice(0, sep) as ModeQuestionId;
  const value = mainDrain.slice(sep + 1);
  const q = t.checkin.modeQuestions[qid];
  if (!q) return null;
  const answer = (q.options as Record<string, string>)[value];
  return { question: q.text, answer: answer ?? value };
}
