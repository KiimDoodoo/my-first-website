"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import BigButton from "@/components/BigButton";
import Card from "@/components/Card";
import Character from "@/components/Character";
import { useI18n } from "@/lib/i18n";
import { getGreeting } from "@/lib/messages";
import { dateStrDaysAgo, nowTimeStr, todayStr } from "@/lib/date";
import { useIsClient } from "@/lib/useIsClient";
import {
  addEvent,
  dismissMedCard,
  getCheckIns,
  getMedCardDismissedDate,
  getProfile,
  getSelfCareDay,
  newId,
  toggleSelfCare,
} from "@/lib/storage";
import type { SelfCareKey } from "@/lib/types";

const SELF_CARE_KEYS: SelfCareKey[] = ["water", "walk", "window"];

export default function HomePage() {
  const isClient = useIsClient();
  if (!isClient) return null;
  return <Home />;
}

function Home() {
  const { t } = useI18n();
  const router = useRouter();
  const [medCardDismissed, setMedCardDismissed] = useState(
    () => getMedCardDismissedDate() === todayStr(),
  );
  const [selfCare, setSelfCare] = useState(() => getSelfCareDay(todayStr()));

  const profile = useMemo(() => getProfile(), []);
  const checkIns = useMemo(() => getCheckIns(), []);
  const today = todayStr();
  const greeting = useMemo(
    () => (profile ? getGreeting(checkIns, today, t) : ""),
    [profile, checkIns, today, t],
  );

  // Landing / welcome for first-time visitors
  if (!profile) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-6 text-center fade-in">
        <Character size={120} />
        <div>
          <h1 className="text-3xl font-bold text-sage-700 dark:text-sage-300">
            {t.common.appName}
          </h1>
          <p className="mt-2 text-warm-700 dark:text-warm-300">
            {t.landing.subtitle}
          </p>
        </div>
        <p className="text-warm-700 dark:text-warm-300">
          {t.landing.description}
        </p>
        <p className="text-sm text-warm-500 dark:text-warm-400">
          {t.landing.note}
        </p>
        <BigButton variant="primary" onClick={() => router.push("/onboarding")}>
          {t.landing.start}
        </BigButton>
      </main>
    );
  }

  const todayRecord = checkIns.find((c) => c.date === today);
  const yesterday = checkIns.find((c) => c.date === dateStrDaysAgo(1));
  const showMedCard =
    yesterday?.medication === "not_yet" &&
    todayRecord?.medication !== "done" &&
    !medCardDismissed;

  const recordEventNow = () => {
    const id = newId();
    addEvent({
      id,
      date: todayStr(),
      time: nowTimeStr(),
      createdAt: new Date().toISOString(),
    });
    router.push(`/event?id=${id}`);
  };

  return (
    <main className="flex flex-1 flex-col gap-5 pt-10 fade-in">
      <div className="flex flex-col items-center gap-4 text-center">
        <Character size={104} />
        <p className="text-lg text-warm-800 dark:text-warm-100">{greeting}</p>
      </div>

      {showMedCard && (
        <Card className="bg-warm-100 border-warm-200 dark:bg-warm-800 dark:border-warm-700">
          <p className="text-warm-800 dark:text-warm-100">{t.home.medCard}</p>
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              className="min-h-10 rounded-xl px-4 text-sm text-warm-500 underline underline-offset-4 dark:text-warm-300"
              onClick={() => {
                dismissMedCard(todayStr());
                setMedCardDismissed(true);
              }}
            >
              {t.home.medCardDismiss}
            </button>
          </div>
        </Card>
      )}

      {todayRecord ? (
        <div className="flex flex-col gap-3">
          <p className="text-center text-sm text-sage-600 dark:text-sage-300">
            {t.home.checkinDone}
          </p>
          <BigButton variant="primary" onClick={() => router.push("/today")}>
            {t.home.viewToday}
          </BigButton>
          <BigButton variant="quiet" onClick={() => router.push("/checkin")}>
            {t.home.redoCheckin}
          </BigButton>
        </div>
      ) : (
        <BigButton variant="primary" onClick={() => router.push("/checkin")}>
          {t.home.checkinCta}
        </BigButton>
      )}

      <BigButton onClick={recordEventNow}>{t.home.unusualEventButton}</BigButton>

      <Card>
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-medium text-warm-800 dark:text-warm-100">
            {t.home.selfCare.title}
          </h2>
          <span className="text-xs text-warm-400 dark:text-warm-500">
            {t.home.selfCare.hint}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {SELF_CARE_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={Boolean(selfCare[key])}
              onClick={() => setSelfCare(toggleSelfCare(todayStr(), key))}
              className={`min-h-12 rounded-2xl border px-4 text-sm transition-colors duration-200 ${
                selfCare[key]
                  ? "border-sage-400 bg-sage-100 text-sage-800 dark:border-sage-500 dark:bg-sage-800 dark:text-sage-100"
                  : "border-warm-200 bg-white text-warm-600 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-300"
              }`}
            >
              {t.home.selfCare.items[key]}
            </button>
          ))}
        </div>
      </Card>

      <nav className="mt-2 grid grid-cols-2 gap-3">
        <Link
          href="/breathe"
          className="col-span-2 flex min-h-14 items-center justify-center rounded-2xl border border-sage-200 bg-sage-50 text-sage-700 shadow-sm active:bg-sage-100 dark:border-sage-700 dark:bg-sage-900 dark:text-sage-200 dark:active:bg-sage-800"
        >
          {t.home.nav.breathe}
        </Link>
        {(
          [
            ["/summary", t.home.nav.summary],
            ["/records", t.home.nav.records],
            ["/safety", t.home.nav.safety],
            ["/settings", t.home.nav.settings],
          ] as const
        ).map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="flex min-h-14 items-center justify-center rounded-2xl border border-warm-200 bg-white text-warm-700 shadow-sm active:bg-sage-50 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-200 dark:active:bg-warm-800"
          >
            {label}
          </Link>
        ))}
      </nav>

      <p className="mt-auto pt-6 text-center text-xs text-warm-400 dark:text-warm-500">
        {t.common.recordDisclaimer}
      </p>
    </main>
  );
}
