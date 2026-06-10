"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Language } from "../types";
import { getProfile, saveProfile } from "../storage";
import { useIsClient } from "../useIsClient";
import { ko, type Dict } from "./ko";
import { en } from "./en";

const dicts: Record<Language, Dict> = { ko, en };

interface I18nContextValue {
  lang: Language;
  t: Dict;
  setLang: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "ko",
  t: ko,
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const isClient = useIsClient();
  const [override, setOverride] = useState<Language | null>(null);

  const lang: Language =
    override ?? (isClient ? (getProfile()?.language ?? "ko") : "ko");

  const setLang = useCallback((next: Language) => {
    setOverride(next);
    const profile = getProfile();
    if (profile) saveProfile({ ...profile, language: next });
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t: dicts[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
