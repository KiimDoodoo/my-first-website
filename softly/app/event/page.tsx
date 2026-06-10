"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import BigButton from "@/components/BigButton";
import Card from "@/components/Card";
import Character from "@/components/Character";
import PageHeader from "@/components/PageHeader";
import { useI18n } from "@/lib/i18n";
import { nowTimeStr, todayStr } from "@/lib/date";
import { useIsClient } from "@/lib/useIsClient";
import {
  addEvent,
  getEventById,
  newId,
  updateEvent,
} from "@/lib/storage";
import type { UnusualEvent } from "@/lib/types";

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-12 rounded-2xl border px-4 text-sm transition-colors duration-200 ${
        selected
          ? "border-sage-400 bg-sage-100 text-sage-800 dark:border-sage-500 dark:bg-sage-800 dark:text-sage-100"
          : "border-warm-200 bg-white text-warm-700 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-200"
      }`}
    >
      {label}
    </button>
  );
}

function EventPageInner() {
  const { t } = useI18n();
  const router = useRouter();
  const params = useSearchParams();
  const eventId = params.get("id");

  const [event, setEvent] = useState<UnusualEvent | null>(() =>
    eventId ? (getEventById(eventId) ?? null) : null,
  );

  // One tap saves date + time immediately — a complete record on its own.
  const recordNow = () => {
    const created: UnusualEvent = {
      id: newId(),
      date: todayStr(),
      time: nowTimeStr(),
      createdAt: new Date().toISOString(),
    };
    addEvent(created);
    setEvent(created);
    router.replace(`/event?id=${created.id}`);
  };

  if (!event) {
    return (
      <main className="flex flex-1 flex-col fade-in">
        <PageHeader title={t.event.title} />
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <Character size={96} />
          <BigButton variant="primary" onClick={recordNow}>
            {t.event.recordNow}
          </BigButton>
        </div>
      </main>
    );
  }

  const patch = (changes: Partial<UnusualEvent>) => {
    const next = { ...event, ...changes };
    setEvent(next);
    updateEvent(next);
  };

  const toggle = (field: "duration" | "beforeContext" | "afterContext", value: string) =>
    patch({ [field]: event[field] === value ? undefined : value });

  return (
    <main className="flex flex-1 flex-col gap-4 fade-in">
      <PageHeader title={t.event.title} />

      <Card>
        <p className="font-medium text-warm-800 dark:text-warm-100">
          {t.event.recordedAt(event.date, event.time)}
        </p>
        <p className="mt-1 text-sm text-warm-500 dark:text-warm-400">
          {t.event.savedNote}
        </p>
      </Card>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm text-warm-600 dark:text-warm-300">
          {t.event.duration.label}
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(t.event.duration.options).map(([v, label]) => (
            <Chip
              key={v}
              label={label}
              selected={event.duration === v}
              onClick={() => toggle("duration", v)}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm text-warm-600 dark:text-warm-300">
          {t.event.before.label}
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(t.event.before.options).map(([v, label]) => (
            <Chip
              key={v}
              label={label}
              selected={event.beforeContext === v}
              onClick={() => toggle("beforeContext", v)}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm text-warm-600 dark:text-warm-300">
          {t.event.after.label}
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(t.event.after.options).map(([v, label]) => (
            <Chip
              key={v}
              label={label}
              selected={event.afterContext === v}
              onClick={() => toggle("afterContext", v)}
            />
          ))}
        </div>
      </section>

      <input
        type="text"
        value={event.shortNote ?? ""}
        onChange={(e) => patch({ shortNote: e.target.value || undefined })}
        placeholder={t.event.notePlaceholder}
        className="min-h-14 rounded-2xl border border-warm-200 bg-white px-4 text-base text-warm-800 placeholder:text-warm-400 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-100"
      />

      <div className="mt-2 flex flex-col gap-2">
        <BigButton variant="primary" onClick={() => router.push("/")}>
          {t.event.saveDetails}
        </BigButton>
        <BigButton variant="quiet" onClick={() => router.push("/")}>
          {t.common.skip}
        </BigButton>
      </div>
    </main>
  );
}

export default function EventPage() {
  const isClient = useIsClient();
  if (!isClient) return null;
  return (
    <Suspense>
      <EventPageInner />
    </Suspense>
  );
}
