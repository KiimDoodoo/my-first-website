"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import BigButton from "@/components/BigButton";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import { useI18n } from "@/lib/i18n";
import {
  clearAllData,
  exportAllData,
  getProfile,
  saveProfile,
} from "@/lib/storage";
import { useIsClient } from "@/lib/useIsClient";
import type { Language, Mode, UserProfile } from "@/lib/types";

const MODES: Mode[] = ["worker", "parent", "student"];
const LANGS: Language[] = ["ko", "en"];

export default function SettingsPage() {
  const isClient = useIsClient();
  if (!isClient) return null;
  return <Settings />;
}

function Settings() {
  const { t, setLang } = useI18n();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(() =>
    getProfile(),
  );
  const [exported, setExported] = useState(false);
  const [confirmingClear, setConfirmingClear] = useState(false);

  const setMode = (mode: Mode) => {
    if (!profile) return;
    const next = { ...profile, mode };
    saveProfile(next);
    setProfile(next);
  };

  const setLanguage = (language: Language) => {
    if (!profile) return;
    setLang(language); // persists to the profile too
    setProfile({ ...profile, language });
  };

  const exportJson = async () => {
    const json = exportAllData();
    try {
      await navigator.clipboard.writeText(json);
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    } catch {
      // fall back to a file download when the clipboard is unavailable
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "softly-export.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const clearAll = () => {
    clearAllData();
    router.push("/");
  };

  const optionButton = (selected: boolean) =>
    `min-h-12 flex-1 rounded-2xl border text-sm transition-colors duration-200 ${
      selected
        ? "border-sage-400 bg-sage-100 text-sage-800 dark:border-sage-500 dark:bg-sage-800 dark:text-sage-100"
        : "border-warm-200 bg-white text-warm-600 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-300"
    }`;

  return (
    <main className="flex flex-1 flex-col gap-4 fade-in">
      <PageHeader title={t.settings.title} />

      <Card>
        <h2 className="text-sm text-warm-500 dark:text-warm-400">
          {t.settings.mode}
        </h2>
        <div className="mt-2 flex gap-2">
          {MODES.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setMode(mode)}
              className={optionButton(profile?.mode === mode)}
            >
              {t.onboarding.modes[mode].label}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-sm text-warm-500 dark:text-warm-400">
          {t.settings.language}
        </h2>
        <div className="mt-2 flex gap-2">
          {LANGS.map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => setLanguage(language)}
              className={optionButton(profile?.language === language)}
            >
              {t.settings.languages[language]}
            </button>
          ))}
        </div>
      </Card>

      <BigButton onClick={exportJson}>
        {exported ? t.settings.exportDone : t.settings.exportJson}
      </BigButton>

      {confirmingClear ? (
        <Card className="bg-warm-100 border-warm-200 dark:bg-warm-800 dark:border-warm-700">
          <p className="text-warm-800 dark:text-warm-100">
            {t.settings.clearConfirm}
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <BigButton onClick={clearAll}>{t.settings.clearYes}</BigButton>
            <BigButton
              variant="quiet"
              onClick={() => setConfirmingClear(false)}
            >
              {t.common.cancel}
            </BigButton>
          </div>
        </Card>
      ) : (
        <BigButton onClick={() => setConfirmingClear(true)}>
          {t.settings.clearData}
        </BigButton>
      )}

      <p className="mt-auto pt-6 text-sm leading-relaxed text-warm-500 dark:text-warm-400">
        {t.settings.fullDisclaimer}
      </p>
    </main>
  );
}
