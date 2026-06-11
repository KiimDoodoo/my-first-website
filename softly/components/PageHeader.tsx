"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

interface PageHeaderProps {
  title: string;
  backHref?: string;
}

export default function PageHeader({ title, backHref = "/" }: PageHeaderProps) {
  const { t } = useI18n();
  return (
    <header className="no-print mb-6 flex items-center gap-3 pt-6">
      <Link
        href={backHref}
        className="flex min-h-12 min-w-12 items-center justify-center rounded-full text-warm-500 active:bg-warm-100 dark:text-warm-400 dark:active:bg-warm-800"
        aria-label={t.common.back}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 5l-7 7 7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      <h1 className="text-xl font-semibold">{title}</h1>
    </header>
  );
}
