"use client";

import { useEffect } from "react";
import { getProfile } from "@/lib/storage";
import type { Theme } from "@/lib/types";

export function applyTheme(theme: Theme | undefined) {
  if (typeof document === "undefined") return;
  if (theme && theme !== "sage") {
    document.documentElement.dataset.theme = theme;
  } else {
    delete document.documentElement.dataset.theme;
  }
}

/** Applies the saved diary theme on load. */
export default function ThemeApplier() {
  useEffect(() => {
    applyTheme(getProfile()?.theme);
  }, []);
  return null;
}
