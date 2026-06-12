"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Character from "@/components/Character";
import { useI18n } from "@/lib/i18n";
import { getProfile, saveProfile } from "@/lib/storage";
import type { CheckinMoment, Mode } from "@/lib/types";

const MODES: Mode[] = ["worker", "parent", "student"];
const MOMENTS: CheckinMoment[] = ["night", "morning", "medication", "anytime"];

export default function OnboardingPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [mode, setMode] = useState<Mode | null>(null);

  const finish = (moment: CheckinMoment) => {
    if (!mode) return;
    const existing = getProfile();
    saveProfile({
      mode,
      language: existing?.language ?? lang,
      checkinMoment: moment,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    });
    router.push("/");
  };

  // step 2 — when to check in (habit stacking, never used for nagging)
  if (mode) {
    return (
      <main key="moment" className="flex flex-1 flex-col items-center justify-center gap-6 fade-in">
        <Character size={104} />
        <div className="text-center">
          <h1 className="text-xl font-semibold leading-relaxed">
            {t.onboarding.momentQuestion}
          </h1>
          <p className="mt-2 text-sm text-warm-500 dark:text-warm-400">
            {t.onboarding.momentHint}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          {MOMENTS.map((moment) => (
            <button
              key={moment}
              type="button"
              onClick={() => finish(moment)}
              className="w-full min-h-14 rounded-2xl border border-warm-200 bg-white px-5 py-4 text-center font-medium text-warm-800 shadow-sm transition-colors duration-200 active:bg-sage-50 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-100 dark:active:bg-warm-800"
            >
              {t.onboarding.moments[moment]}
            </button>
          ))}
        </div>
      </main>
    );
  }

  // step 1 — which kind of day
  return (
    <main key="mode" className="flex flex-1 flex-col items-center justify-center gap-6 fade-in">
      <Character size={104} />
      <h1 className="text-center text-xl font-semibold leading-relaxed">
        {t.onboarding.question}
      </h1>
      <div className="flex w-full flex-col gap-3">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className="w-full min-h-14 rounded-2xl border border-warm-200 bg-white px-5 py-4 text-left shadow-sm transition-colors duration-200 active:bg-sage-50 dark:border-warm-800 dark:bg-warm-900 dark:active:bg-warm-800"
          >
            <span className="block font-medium text-warm-800 dark:text-warm-100">
              {t.onboarding.modes[m].label}
            </span>
            <span className="block text-sm text-warm-500 dark:text-warm-400">
              {t.onboarding.modes[m].desc}
            </span>
          </button>
        ))}
      </div>
      <p className="text-sm text-warm-400 dark:text-warm-500">
        {t.onboarding.hint}
      </p>
    </main>
  );
}
