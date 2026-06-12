"use client";

import { useMemo } from "react";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import { useI18n } from "@/lib/i18n";
import { lastNDates } from "@/lib/date";
import { getCheckIns, getEvents, getSelfCareLog } from "@/lib/storage";
import { useIsClient } from "@/lib/useIsClient";

export default function SummaryPage() {
  const isClient = useIsClient();
  if (!isClient) return null;
  return <Summary />;
}

function Summary() {
  const { t, lang } = useI18n();
  const checkIns = useMemo(() => getCheckIns(), []);
  const events = useMemo(() => getEvents(), []);
  const selfCareLog = useMemo(() => getSelfCareLog(), []);

  const days = lastNDates(7);
  const week = checkIns.filter((c) => days.includes(c.date));
  const weekEvents = events.filter((e) => days.includes(e.date));

  const counts = {
    checkins: week.length,
    overloaded: week.filter((c) => c.bodyState === "overloaded").length,
    shortSleep: week.filter((c) => c.sleep === "short" || c.sleep === "barely")
      .length,
    highFatigue: week.filter((c) => c.fatigue === "high").length,
    highStress: week.filter((c) => c.stress === "high").length,
    medication: week.filter((c) => c.medication === "done").length,
    events: weekEvents.length,
    selfCare: days.reduce(
      (sum, d) =>
        sum + Object.values(selfCareLog[d] ?? {}).filter(Boolean).length,
      0,
    ),
  };

  // Side-by-side timeline rows: shown together, never interpreted (no causal copy).
  const rows: { label: string; marks: boolean[] }[] = [
    {
      label: t.summary.timelineRows.checkin,
      marks: days.map((d) => week.some((c) => c.date === d)),
    },
    {
      label: t.summary.timelineRows.overloaded,
      marks: days.map((d) =>
        week.some((c) => c.date === d && c.bodyState === "overloaded"),
      ),
    },
    {
      label: t.summary.timelineRows.shortSleep,
      marks: days.map((d) =>
        week.some(
          (c) => c.date === d && (c.sleep === "short" || c.sleep === "barely"),
        ),
      ),
    },
    {
      label: t.summary.timelineRows.event,
      marks: days.map((d) => weekEvents.some((e) => e.date === d)),
    },
  ];

  const lines = [
    t.summary.lines.overloaded(counts.overloaded),
    t.summary.lines.shortSleep(counts.shortSleep),
    t.summary.lines.highFatigue(counts.highFatigue),
    t.summary.lines.highStress(counts.highStress),
    t.summary.lines.medication(counts.medication),
    t.summary.lines.events(counts.events),
    t.summary.lines.selfCare(counts.selfCare),
  ];

  const dayLabel = (dateStr: string) =>
    new Date(`${dateStr}T00:00:00`).toLocaleDateString(
      lang === "ko" ? "ko-KR" : "en-US",
      { weekday: "narrow" },
    );

  return (
    <main className="flex flex-1 flex-col gap-4 fade-in">
      <PageHeader title={t.summary.title} />

      <Card className="bg-sage-50 border-sage-100 dark:bg-sage-900 dark:border-sage-800">
        <p className="text-lg font-medium text-sage-800 dark:text-sage-100">
          {t.summary.selfCare(counts.checkins)}
        </p>
        {counts.checkins < 3 && (
          <p className="mt-2 text-sm text-sage-700 dark:text-sage-200">
            {t.summary.earlyHint}
          </p>
        )}
      </Card>

      <Card>
        <ul className="flex flex-col gap-2">
          {lines.map((line) => (
            <li key={line} className="text-warm-700 dark:text-warm-200">
              {line}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <p className="mb-4 text-sm text-warm-500 dark:text-warm-400">
          {t.summary.sideBySideNote}
        </p>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-[5.5rem_repeat(7,1fr)] items-center gap-1">
            <span />
            {days.map((d) => (
              <span
                key={d}
                className="text-center text-xs text-warm-400 dark:text-warm-500"
              >
                {dayLabel(d)}
              </span>
            ))}
          </div>
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[5.5rem_repeat(7,1fr)] items-center gap-1"
            >
              <span className="text-xs text-warm-600 dark:text-warm-300">
                {row.label}
              </span>
              {row.marks.map((on, i) => (
                <span key={i} className="flex justify-center">
                  <span
                    className={`h-3.5 w-3.5 rounded-full ${
                      on
                        ? "bg-sage-400 dark:bg-sage-400"
                        : "bg-warm-100 dark:bg-warm-800"
                    }`}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </Card>

      <p className="mt-auto pt-6 text-center text-xs text-warm-400 dark:text-warm-500">
        {t.common.recordDisclaimer}
      </p>
    </main>
  );
}
