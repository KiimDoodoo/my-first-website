"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import { useI18n } from "@/lib/i18n";
import { checkInSummaryLine, eventSummaryLine } from "@/lib/format";
import { dateStrDaysAgo, formatDateDisplay, todayStr } from "@/lib/date";
import { getCheckIns, getEvents } from "@/lib/storage";
import { useIsClient } from "@/lib/useIsClient";

type Range = "7" | "30" | "custom";

export default function RecordsPage() {
  const isClient = useIsClient();
  if (!isClient) return null;
  return <Records />;
}

function Records() {
  const { t, lang } = useI18n();
  const checkIns = useMemo(() => getCheckIns(), []);
  const events = useMemo(() => getEvents(), []);
  const [range, setRange] = useState<Range>("7");
  const [customFrom, setCustomFrom] = useState(dateStrDaysAgo(6));
  const [customTo, setCustomTo] = useState(todayStr());
  const [copied, setCopied] = useState(false);

  const [from, to] =
    range === "7"
      ? [dateStrDaysAgo(6), todayStr()]
      : range === "30"
        ? [dateStrDaysAgo(29), todayStr()]
        : [customFrom, customTo];

  const grouped = useMemo(() => {
    const inRange = (d: string) => d >= from && d <= to;
    const dates = new Set<string>();
    checkIns.forEach((c) => inRange(c.date) && dates.add(c.date));
    events.forEach((e) => inRange(e.date) && dates.add(e.date));
    return [...dates].sort().reverse().map((date) => ({
      date,
      checkIn: checkIns.find((c) => c.date === date),
      dayEvents: events
        .filter((e) => e.date === date)
        .sort((a, b) => a.time.localeCompare(b.time)),
    }));
  }, [checkIns, events, from, to]);

  // Human-readable plain-text export — records only, no interpretation.
  const buildExportText = (): string => {
    const lines: string[] = [t.records.exportTitle(from, to), ""];
    [...grouped].reverse().forEach(({ date, checkIn, dayEvents }) => {
      lines.push(formatDateDisplay(date, lang) + ` (${date})`);
      if (checkIn) {
        lines.push(`- ${t.records.checkinLabel}: ${checkInSummaryLine(checkIn, t)}`);
      }
      dayEvents.forEach((e) => {
        lines.push(`- ${t.records.eventLabel}: ${eventSummaryLine(e, t)}`);
      });
      lines.push("");
    });
    lines.push(t.common.recordDisclaimer);
    return lines.join("\n");
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(buildExportText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — quietly ignore
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 fade-in">
      <PageHeader title={t.records.title} />

      <div className="no-print flex gap-2">
        {(
          [
            ["7", t.records.range7],
            ["30", t.records.range30],
            ["custom", t.records.rangeCustom],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setRange(value)}
            className={`min-h-12 flex-1 rounded-2xl border text-sm transition-colors duration-200 ${
              range === value
                ? "border-sage-400 bg-sage-100 text-sage-800 dark:border-sage-500 dark:bg-sage-800 dark:text-sage-100"
                : "border-warm-200 bg-white text-warm-600 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {range === "custom" && (
        <div className="no-print flex gap-3">
          <label className="flex flex-1 flex-col gap-1 text-xs text-warm-500 dark:text-warm-400">
            {t.records.from}
            <input
              type="date"
              value={customFrom}
              max={customTo}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="min-h-12 rounded-2xl border border-warm-200 bg-white px-3 text-base text-warm-800 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-100"
            />
          </label>
          <label className="flex flex-1 flex-col gap-1 text-xs text-warm-500 dark:text-warm-400">
            {t.records.to}
            <input
              type="date"
              value={customTo}
              min={customFrom}
              onChange={(e) => setCustomTo(e.target.value)}
              className="min-h-12 rounded-2xl border border-warm-200 bg-white px-3 text-base text-warm-800 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-100"
            />
          </label>
        </div>
      )}

      <div className="no-print flex gap-2">
        <button
          type="button"
          onClick={copyText}
          className="min-h-12 flex-1 rounded-2xl bg-sage-600 px-4 text-sm font-medium text-sage-50 active:bg-sage-700 dark:bg-sage-500 dark:text-warm-950"
        >
          {copied ? t.records.copied : t.records.copyText}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="min-h-12 flex-1 rounded-2xl border border-warm-200 bg-white px-4 text-sm text-warm-700 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-200"
        >
          {t.records.print}
        </button>
      </div>

      {grouped.length === 0 ? (
        <Card>
          <p className="text-warm-600 dark:text-warm-300">{t.records.empty}</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {grouped.map(({ date, checkIn, dayEvents }) => (
            <Card key={date}>
              <h2 className="font-semibold text-warm-800 dark:text-warm-100">
                {formatDateDisplay(date, lang)}
              </h2>
              {checkIn && (
                <p className="mt-2 text-sm text-warm-700 dark:text-warm-200">
                  <span className="text-warm-400 dark:text-warm-500">
                    {t.records.checkinLabel} ·{" "}
                  </span>
                  {checkInSummaryLine(checkIn, t)}
                </p>
              )}
              {dayEvents.map((e) => (
                <p key={e.id} className="mt-2 text-sm text-warm-700 dark:text-warm-200">
                  <span className="text-warm-400 dark:text-warm-500">
                    {t.records.eventLabel} ·{" "}
                  </span>
                  {eventSummaryLine(e, t)}
                  <Link
                    href={`/event?id=${e.id}`}
                    className="no-print ml-2 text-sage-600 underline underline-offset-4 dark:text-sage-300"
                  >
                    {t.common.edit}
                  </Link>
                </p>
              ))}
            </Card>
          ))}
        </div>
      )}

      <p className="mt-auto pt-6 text-center text-xs text-warm-400 dark:text-warm-500">
        {t.common.recordDisclaimer}
      </p>
    </main>
  );
}
