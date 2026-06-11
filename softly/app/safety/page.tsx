"use client";

import { useState } from "react";
import BigButton from "@/components/BigButton";
import Card from "@/components/Card";
import PageHeader from "@/components/PageHeader";
import { useI18n } from "@/lib/i18n";
import { getSafetyCard, saveSafetyCard } from "@/lib/storage";
import { useIsClient } from "@/lib/useIsClient";
import type { SafetyCard } from "@/lib/types";

const FIELDS = [
  "emergencyContactName",
  "emergencyContactPhone",
  "medicationNotes",
  "clinicNotes",
  "whatHelps",
  "whatNotToDo",
  "additionalNotes",
] as const;

const SINGLE_LINE: ReadonlySet<string> = new Set([
  "emergencyContactName",
  "emergencyContactPhone",
]);

export default function SafetyPage() {
  const isClient = useIsClient();
  if (!isClient) return null;
  return <Safety />;
}

function Safety() {
  const { t } = useI18n();
  const [card, setCard] = useState<SafetyCard>(() => getSafetyCard() ?? {});
  const [editing, setEditing] = useState(false);

  const hasContent = FIELDS.some((f) => card[f]?.trim());

  const save = () => {
    saveSafetyCard(card);
    setEditing(false);
  };

  if (editing) {
    return (
      <main className="flex flex-1 flex-col gap-4 fade-in">
        <PageHeader title={t.safety.title} />
        <div className="flex flex-col gap-4">
          {FIELDS.map((field) => (
            <label key={field} className="flex flex-col gap-1">
              <span className="text-sm text-warm-600 dark:text-warm-300">
                {t.safety.fields[field]}
              </span>
              {SINGLE_LINE.has(field) ? (
                <input
                  type={field === "emergencyContactPhone" ? "tel" : "text"}
                  value={card[field] ?? ""}
                  onChange={(e) =>
                    setCard({ ...card, [field]: e.target.value })
                  }
                  className="min-h-14 rounded-2xl border border-warm-200 bg-white px-4 text-base text-warm-800 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-100"
                />
              ) : (
                <textarea
                  value={card[field] ?? ""}
                  onChange={(e) =>
                    setCard({ ...card, [field]: e.target.value })
                  }
                  rows={2}
                  className="rounded-2xl border border-warm-200 bg-white px-4 py-3 text-base leading-relaxed text-warm-800 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-100"
                />
              )}
            </label>
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <BigButton variant="primary" onClick={save}>
            {t.common.save}
          </BigButton>
          <BigButton variant="quiet" onClick={() => setEditing(false)}>
            {t.common.cancel}
          </BigButton>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 fade-in">
      <PageHeader title={t.safety.title} />
      <p className="text-sm text-warm-500 dark:text-warm-400">
        {t.safety.intro}
      </p>

      {hasContent ? (
        <Card>
          <dl className="flex flex-col gap-5">
            {FIELDS.filter((f) => card[f]?.trim()).map((field) => (
              <div key={field}>
                <dt className="text-sm text-warm-500 dark:text-warm-400">
                  {t.safety.fields[field]}
                </dt>
                {/* large readable typography in view mode */}
                <dd className="mt-1 whitespace-pre-wrap text-lg font-medium leading-relaxed text-warm-900 dark:text-warm-100">
                  {card[field]}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      ) : (
        <Card>
          <p className="text-warm-600 dark:text-warm-300">
            {t.safety.emptyView}
          </p>
        </Card>
      )}

      <BigButton variant="primary" onClick={() => setEditing(true)}>
        {hasContent ? t.common.edit : t.safety.startEdit}
      </BigButton>

      <p className="mt-auto pt-6 text-center text-xs text-warm-400 dark:text-warm-500">
        {t.safety.disclaimer}
      </p>
    </main>
  );
}
