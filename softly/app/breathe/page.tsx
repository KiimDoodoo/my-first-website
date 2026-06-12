"use client";

import { useEffect, useRef, useState } from "react";
import BigButton from "@/components/BigButton";
import Character from "@/components/Character";
import PageHeader from "@/components/PageHeader";
import { useI18n } from "@/lib/i18n";

const CYCLE_MS = 8000; // one slow breath: 4s in, 4s out
const SESSION_MS = 60_000;

type Phase = "idle" | "running" | "done";

export default function BreathePage() {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>("idle");
  const [inhaling, setInhaling] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const start = () => {
    clearTimers();
    setPhase("running");
    setInhaling(true);
    // flip the guide text every half cycle
    for (let tMs = CYCLE_MS / 2; tMs < SESSION_MS; tMs += CYCLE_MS / 2) {
      const isInhale = (tMs / (CYCLE_MS / 2)) % 2 === 0;
      timers.current.push(setTimeout(() => setInhaling(isInhale), tMs));
    }
    timers.current.push(setTimeout(() => setPhase("done"), SESSION_MS));
  };

  return (
    <main className="flex flex-1 flex-col fade-in">
      <PageHeader title={t.breathe.title} />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 pb-16">
        {phase === "idle" && (
          <>
            <Character size={96} />
            <p className="text-center text-warm-700 dark:text-warm-200">
              {t.breathe.intro}
            </p>
            <BigButton variant="primary" onClick={start}>
              {t.breathe.start}
            </BigButton>
          </>
        )}

        {phase === "running" && (
          <>
            <div className="flex h-56 w-56 items-center justify-center">
              <div
                className="breathe-circle h-40 w-40 rounded-full bg-sage-200 dark:bg-sage-700"
                aria-hidden="true"
              />
            </div>
            <p
              className="text-lg text-warm-700 dark:text-warm-200"
              aria-live="polite"
            >
              {inhaling ? t.breathe.inhale : t.breathe.exhale}
            </p>
            <p className="text-sm text-warm-400 dark:text-warm-500">
              {t.breathe.note}
            </p>
          </>
        )}

        {phase === "done" && (
          <>
            <Character size={96} />
            <p className="text-center text-lg text-warm-800 dark:text-warm-100">
              {t.breathe.done}
            </p>
            <BigButton onClick={start}>{t.breathe.again}</BigButton>
          </>
        )}
      </div>
    </main>
  );
}
