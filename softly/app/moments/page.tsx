"use client";

import { useMemo } from "react";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import Sticker from "@/components/Sticker";
import { useI18n } from "@/lib/i18n";
import { formatDateDisplay, todayStr } from "@/lib/date";
import { getCheckIns } from "@/lib/storage";
import { useIsClient } from "@/lib/useIsClient";

export default function MomentsPage() {
  const isClient = useIsClient();
  if (!isClient) return null;
  return <Moments />;
}

function Moments() {
  const { t, lang } = useI18n();
  const checkIns = useMemo(() => getCheckIns(), []);

  const notes = useMemo(
    () =>
      checkIns
        .filter((c) => c.note?.trim())
        .sort((a, b) => b.date.localeCompare(a.date)),
    [checkIns],
  );

  // Current month grid: days with any record grow a sprout (Lemory-style
  // gentle accumulation — visual only, never a score).
  const today = todayStr();
  const ym = today.slice(0, 7); // YYYY-MM
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7));
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const monthDates = Array.from({ length: daysInMonth }, (_, i) => {
    const date = `${ym}-${`${i + 1}`.padStart(2, "0")}`;
    const record = checkIns.find((c) => c.date === date);
    return {
      day: i + 1,
      hasRecord: Boolean(record),
      sticker: record?.sticker,
    };
  });
  const monthLabel = new Date(`${ym}-01T00:00:00`).toLocaleDateString(
    lang === "ko" ? "ko-KR" : "en-US",
    { year: "numeric", month: "long" },
  );

  return (
    <main className="flex flex-1 flex-col gap-4 fade-in">
      <PageHeader title={t.moments.title} />
      <p className="text-sm text-warm-500 dark:text-warm-400">
        {t.moments.intro}
      </p>

      <Card>
        <h2 className="font-medium text-warm-800 dark:text-warm-100">
          {monthLabel}
        </h2>
        <div className="mt-3 grid grid-cols-7 gap-y-2">
          {Array.from({ length: firstWeekday }, (_, i) => (
            <span key={`pad-${i}`} />
          ))}
          {monthDates.map(({ day, hasRecord, sticker }) => (
            <span key={day} className="flex flex-col items-center gap-0.5">
              <span className="flex h-5 items-center justify-center">
                {hasRecord ? (
                  <Sticker id={sticker ?? "sprout"} size={16} />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-warm-200 dark:bg-warm-800" />
                )}
              </span>
              <span className="text-[10px] text-warm-400 dark:text-warm-500">
                {day}
              </span>
            </span>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-warm-400 dark:text-warm-500">
          <Sticker id="sprout" size={16} />
          {t.moments.calendarLegend}
        </p>
      </Card>

      {notes.length === 0 ? (
        <Card>
          <p className="text-warm-600 dark:text-warm-300">{t.moments.empty}</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {notes.map((c) => (
            <Card key={c.id}>
              <p className="flex items-center justify-between text-xs text-warm-400 dark:text-warm-500">
                {formatDateDisplay(c.date, lang)}
                {c.sticker && <Sticker id={c.sticker} size={18} />}
              </p>
              <p className="mt-1 text-lg leading-relaxed text-warm-800 dark:text-warm-100">
                {c.note}
              </p>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
