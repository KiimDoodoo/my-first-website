"use client";

import { useRouter } from "next/navigation";
import Character from "@/components/Character";
import { useI18n } from "@/lib/i18n";
import { getProfile, saveProfile } from "@/lib/storage";
import type { Mode } from "@/lib/types";

const MODES: Mode[] = ["worker", "parent", "student"];

export default function OnboardingPage() {
  const { t, lang } = useI18n();
  const router = useRouter();

  const choose = (mode: Mode) => {
    const existing = getProfile();
    saveProfile({
      mode,
      language: existing?.language ?? lang,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    });
    router.push("/");
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 fade-in">
      <Character size={104} />
      <h1 className="text-center text-xl font-semibold leading-relaxed">
        {t.onboarding.question}
      </h1>
      <div className="flex w-full flex-col gap-3">
        {MODES.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => choose(mode)}
            className="w-full min-h-14 rounded-2xl border border-warm-200 bg-white px-5 py-4 text-left shadow-sm transition-colors duration-200 active:bg-sage-50 dark:border-warm-800 dark:bg-warm-900 dark:active:bg-warm-800"
          >
            <span className="block font-medium text-warm-800 dark:text-warm-100">
              {t.onboarding.modes[mode].label}
            </span>
            <span className="block text-sm text-warm-500 dark:text-warm-400">
              {t.onboarding.modes[mode].desc}
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
