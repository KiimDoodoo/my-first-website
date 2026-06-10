import type { Dict } from "./i18n/ko";
import type { DailyCheckIn, UnusualEvent } from "./types";
import { decodeMainDrain } from "./messages";

/** Label/value pairs for a check-in, in display order. Records only — no interpretation. */
export function checkInFields(
  c: DailyCheckIn,
  t: Dict,
): { label: string; value: string }[] {
  const q = t.checkin.questions;
  const f = t.today.fields;
  const fields: { label: string; value: string }[] = [
    { label: f.bodyState, value: q.body.options[c.bodyState] },
  ];
  if (c.sleep) fields.push({ label: f.sleep, value: q.sleep.options[c.sleep] });
  if (c.fatigue)
    fields.push({ label: f.fatigue, value: q.fatigue.options[c.fatigue] });
  if (c.stress)
    fields.push({ label: f.stress, value: q.stress.options[c.stress] });
  if (c.medication)
    fields.push({
      label: f.medication,
      value: q.medication.options[c.medication],
    });
  if (c.unusualEvent)
    fields.push({
      label: f.unusualEvent,
      value: q.unusual.options[c.unusualEvent],
    });
  if (c.mainDrain) {
    const decoded = decodeMainDrain(c.mainDrain, t);
    if (decoded)
      fields.push({ label: decoded.question, value: decoded.answer });
  }
  if (c.note) fields.push({ label: f.note, value: c.note });
  return fields;
}

export function checkInSummaryLine(c: DailyCheckIn, t: Dict): string {
  return checkInFields(c, t)
    .map((fld) => `${fld.label} ${fld.value}`)
    .join(" · ");
}

export function eventSummaryLine(e: UnusualEvent, t: Dict): string {
  const parts: string[] = [e.time];
  if (e.duration) {
    const v = (t.event.duration.options as Record<string, string>)[e.duration];
    parts.push(`${t.event.duration.label} ${v ?? e.duration}`);
  }
  if (e.beforeContext) {
    const v = (t.event.before.options as Record<string, string>)[
      e.beforeContext
    ];
    parts.push(`${t.event.before.label} ${v ?? e.beforeContext}`);
  }
  if (e.afterContext) {
    const v = (t.event.after.options as Record<string, string>)[
      e.afterContext
    ];
    parts.push(`${t.event.after.label} ${v ?? e.afterContext}`);
  }
  if (e.shortNote) parts.push(e.shortNote);
  return parts.join(" · ");
}
