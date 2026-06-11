"use client";

import type { ButtonHTMLAttributes } from "react";

interface BigButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "quiet";
  selected?: boolean;
}

/** Large one-tap answer button: full width, min height 56px, soft corners. */
export default function BigButton({
  variant = "secondary",
  selected = false,
  className = "",
  children,
  ...rest
}: BigButtonProps) {
  const base =
    "w-full min-h-14 rounded-2xl px-5 py-3 text-base font-medium transition-colors duration-200 text-center";

  const styles = {
    primary:
      "bg-sage-600 text-sage-50 active:bg-sage-700 dark:bg-sage-500 dark:text-warm-950 dark:active:bg-sage-400",
    secondary: selected
      ? "bg-sage-100 text-sage-800 border-2 border-sage-400 dark:bg-sage-800 dark:text-sage-100 dark:border-sage-500"
      : "bg-white text-warm-800 border border-warm-200 shadow-sm active:bg-sage-50 dark:bg-warm-900 dark:text-warm-100 dark:border-warm-800 dark:active:bg-warm-800",
    quiet:
      "bg-transparent text-warm-500 underline underline-offset-4 min-h-12 dark:text-warm-400",
  }[variant];

  return (
    <button type="button" className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}
