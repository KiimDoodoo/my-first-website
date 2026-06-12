"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import BigButton from "@/components/BigButton";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import Sticker from "@/components/Sticker";
import { useI18n } from "@/lib/i18n";
import { checkInFields, eventSummaryLine } from "@/lib/format";
import { formatDateDisplay, todayStr } from "@/lib/date";
import { getCheckInByDate, getEvents } from "@/lib/storage";
import { useIsClient } from "@/lib/useIsClient";

export default function TodayPage() {
  const isClient = useIsClient();
  if (!isClient) return null;
  return <Today />;
}

function Today() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const today = todayStr();
  const checkIn = useMemo(() => getCheckInByDate(today), [today]);
  const events = useMemo(
    () => getEvents().filter((e) => e.date === today),
    [today],
  );

  return (
    <main className="flex flex-1 flex-col gap-4 fade-in">
      <PageHeader title={t.today.title} />
      <p className="flex items-center gap-2 text-sm text-warm-500 dark:text-warm-400">
        {formatDateDisplay(today, lang)}
        {checkIn?.sticker && <Sticker id={checkIn.sticker} size={20} />}
      </p>

      {checkIn ? (
        <Card>
          <dl className="flex flex-col gap-3">
            {checkInFields(checkIn, t).map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-warm-500 dark:text-warm-400">
                  {f.label}
                </dt>
                <dd className="text-right font-medium text-warm-800 dark:text-warm-100">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 text-right">
            <Link
              href="/checkin"
              className="text-sm text-sage-600 underline underline-offset-4 dark:text-sage-300"
            >
              {t.common.edit}
            </Link>
          </div>
        </Card>
      ) : (
        <Card>
          <p className="text-warm-600 dark:text-warm-300">{t.today.empty}</p>
          <div className="mt-4">
            <BigButton variant="primary" onClick={() => router.push("/checkin")}>
              {t.today.goCheckin}
            </BigButton>
          </div>
        </Card>
      )}

      {events.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-base font-semibold text-warm-700 dark:text-warm-200">
            {t.today.eventsTitle}
          </h2>
          {events.map((e) => (
            <Card key={e.id} className="flex items-center justify-between gap-3">
              <p className="text-sm text-warm-700 dark:text-warm-200">
                {eventSummaryLine(e, t)}
              </p>
              <Link
                href={`/event?id=${e.id}`}
                className="shrink-0 text-sm text-sage-600 underline underline-offset-4 dark:text-sage-300"
              >
                {t.today.eventDetail}
              </Link>
            </Card>
          ))}
        </section>
      )}

      <p className="mt-auto pt-6 text-center text-xs text-warm-400 dark:text-warm-500">
        {t.common.recordDisclaimer}
      </p>
    </main>
  );
}
