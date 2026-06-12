"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import BigButton from "@/components/BigButton";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import { useI18n } from "@/lib/i18n";
import {
  applyImport,
  clearAllData,
  exportAllData,
  getProfile,
  parseImport,
  saveProfile,
  type ImportPreview,
} from "@/lib/storage";
import { useIsClient } from "@/lib/useIsClient";
import { applyTheme } from "@/components/ThemeApplier";
import type {
  CheckinMoment,
  Language,
  Mode,
  Theme,
  UserProfile,
} from "@/lib/types";

const MODES: Mode[] = ["worker", "parent", "student"];
const MOMENTS: CheckinMoment[] = ["night", "morning", "medication", "anytime"];
const THEMES: Theme[] = ["sage", "warm", "lavender", "forest"];
const THEME_SWATCH: Record<Theme, string> = {
  sage: "#748e63",
  warm: "#997e5c",
  lavender: "#82779c",
  forest: "#5a8167",
};
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
  const [pendingImport, setPendingImport] = useState<ImportPreview | null>(
    null,
  );
  const [importStatus, setImportStatus] = useState<"done" | "error" | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setMode = (mode: Mode) => {
    if (!profile) return;
    const next = { ...profile, mode };
    saveProfile(next);
    setProfile(next);
  };

  const setMoment = (checkinMoment: CheckinMoment) => {
    if (!profile) return;
    const next = { ...profile, checkinMoment };
    saveProfile(next);
    setProfile(next);
  };

  const setTheme = (theme: Theme) => {
    if (!profile) return;
    const next = { ...profile, theme };
    saveProfile(next);
    setProfile(next);
    applyTheme(theme);
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

  const onImportFile = async (file: File | undefined) => {
    setImportStatus(null);
    setPendingImport(null);
    if (!file) return;
    const preview = parseImport(await file.text());
    if (preview) {
      setPendingImport(preview);
    } else {
      setImportStatus("error");
    }
  };

  const confirmImport = () => {
    if (!pendingImport) return;
    applyImport(pendingImport);
    setProfile(getProfile());
    setPendingImport(null);
    setImportStatus("done");
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
          {t.settings.moment}
        </h2>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {MOMENTS.map((moment) => (
            <button
              key={moment}
              type="button"
              onClick={() => setMoment(moment)}
              className={optionButton(profile?.checkinMoment === moment)}
            >
              {t.onboarding.moments[moment]}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-sm text-warm-500 dark:text-warm-400">
          {t.settings.theme}
        </h2>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {THEMES.map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => setTheme(theme)}
              className={`${optionButton((profile?.theme ?? "sage") === theme)} flex items-center justify-center gap-2`}
            >
              <span
                className="h-3.5 w-3.5 rounded-full"
                style={{ backgroundColor: THEME_SWATCH[theme] }}
                aria-hidden="true"
              />
              {t.settings.themes[theme]}
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

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          void onImportFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {pendingImport ? (
        <Card className="bg-warm-100 border-warm-200 dark:bg-warm-800 dark:border-warm-700">
          <p className="text-warm-800 dark:text-warm-100">
            {t.settings.importConfirm(
              pendingImport.dailyCheckIns.length,
              pendingImport.unusualEvents.length,
            )}
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <BigButton onClick={confirmImport}>
              {t.settings.importYes}
            </BigButton>
            <BigButton variant="quiet" onClick={() => setPendingImport(null)}>
              {t.common.cancel}
            </BigButton>
          </div>
        </Card>
      ) : (
        <BigButton onClick={() => fileInputRef.current?.click()}>
          {importStatus === "done"
            ? t.settings.importDone
            : t.settings.importJson}
        </BigButton>
      )}
      {importStatus === "error" && (
        <p className="text-sm text-warm-700 dark:text-warm-300">
          {t.settings.importError}
        </p>
      )}

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
