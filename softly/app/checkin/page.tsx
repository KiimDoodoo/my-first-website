"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import BigButton from "@/components/BigButton";
import Character from "@/components/Character";
import Dots from "@/components/Dots";
import Sticker, { STICKER_IDS } from "@/components/Sticker";
import { useI18n } from "@/lib/i18n";
import { formatDateDisplay } from "@/lib/date";

import {
  encodeMainDrain,
  modeQuestionIdForDate,
  pickResponse,
} from "@/lib/messages";
import { todayStr } from "@/lib/date";
import { useIsClient } from "@/lib/useIsClient";
import {
  clearDraft,
  getCheckInByDate,
  getDraft,
  getProfile,
  newId,
  saveCheckIn,
  saveDraft,
} from "@/lib/storage";
import type { CheckInDraft } from "@/lib/types";

type Answers = CheckInDraft["answers"];

// step 0: body (3-second check-in) · step 1: gate · steps 2-7: optional 10-second part
const STEPS = [
  "body",
  "gate",
  "sleep",
  "fatigue",
  "stress",
  "medication",
  "unusual",
  "modeQ",
] as const;

const DOT_INDEX: Record<string, number> = {
  body: 0,
  gate: 0,
  sleep: 1,
  fatigue: 2,
  stress: 3,
  medication: 4,
  unusual: 5,
  modeQ: 6,
};

function initialFlowState(today: string): { answers: Answers; step: number } {
  const draft = getDraft(today);
  if (draft) {
    return {
      answers: draft.answers,
      step: Math.min(draft.step, STEPS.length - 1),
    };
  }
  // Editing today's existing record starts from its answers
  const existing = getCheckInByDate(today);
  if (existing) {
    return {
      answers: {
        bodyState: existing.bodyState,
        sleep: existing.sleep,
        fatigue: existing.fatigue,
        stress: existing.stress,
        medication: existing.medication,
        unusualEvent: existing.unusualEvent,
        mainDrain: existing.mainDrain,
      },
      step: 0,
    };
  }
  return { answers: {}, step: 0 };
}

export default function CheckInPage() {
  const isClient = useIsClient();
  if (!isClient) return null;
  return <CheckInFlow />;
}

function CheckInFlow() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const today = todayStr();

  const profile = useMemo(() => getProfile(), []);
  const [initial] = useState(() => initialFlowState(today));
  const [step, setStep] = useState(initial.step);
  const [answers, setAnswers] = useState<Answers>(initial.answers);
  const [response, setResponse] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [sticker, setSticker] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!profile) router.replace("/onboarding");
  }, [profile, router]);

  if (!profile) return null;

  const persistDraft = (nextAnswers: Answers, nextStep: number) => {
    saveDraft({ date: today, answers: nextAnswers, step: nextStep });
  };

  const answer = (patch: Answers) => {
    const nextAnswers = { ...answers, ...patch };
    const nextStep = step + 1;
    setAnswers(nextAnswers);
    if (step === STEPS.length - 1) {
      finish(nextAnswers);
    } else {
      setStep(nextStep);
      persistDraft(nextAnswers, nextStep);
    }
  };

  const finish = (finalAnswers: Answers) => {
    const existing = getCheckInByDate(today);
    saveCheckIn({
      id: existing?.id ?? newId(),
      date: today,
      mode: profile.mode,
      bodyState: finalAnswers.bodyState ?? "normal",
      sleep: finalAnswers.sleep,
      fatigue: finalAnswers.fatigue,
      stress: finalAnswers.stress,
      medication: finalAnswers.medication,
      unusualEvent: finalAnswers.unusualEvent,
      mainDrain: finalAnswers.mainDrain,
      note: existing?.note,
      sticker: existing?.sticker,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    });
    clearDraft();
    setSticker(existing?.sticker);
    setResponse(pickResponse(finalAnswers, t));
  };

  const pickSticker = (id: string) => {
    const record = getCheckInByDate(today);
    if (!record) return;
    const next = record.sticker === id ? undefined : id;
    saveCheckIn({ ...record, sticker: next });
    setSticker(next);
  };

  const goBack = () => {
    if (step === 0) {
      router.push("/");
    } else {
      const prev = step - 1;
      setStep(prev);
      persistDraft(answers, prev);
    }
  };

  const saveNote = () => {
    const existing = getCheckInByDate(today);
    if (!existing || !noteText.trim()) return;
    saveCheckIn({ ...existing, note: noteText.trim() });
    setNoteSaved(true);
  };

  // ----- completion screen -----
  if (response) {
    const heavyDay =
      answers.bodyState === "overloaded" ||
      answers.fatigue === "high" ||
      answers.stress === "high";
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-6 text-center fade-in">
        <Character size={112} />
        <p className="text-lg leading-relaxed text-warm-800 dark:text-warm-100">
          {response}
        </p>

        <div className="w-full rounded-3xl border border-warm-100 bg-white p-5 shadow-sm dark:border-warm-800 dark:bg-warm-900">
          <p className="text-sm text-warm-500 dark:text-warm-400">
            {t.checkin.complete.todayPage} · {formatDateDisplay(today, lang)}
          </p>
          <p className="mt-2 text-sm text-warm-700 dark:text-warm-200">
            {t.checkin.complete.stickerPrompt}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {STICKER_IDS.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={sticker === id}
                aria-label={t.checkin.stickers[id]}
                onClick={() => pickSticker(id)}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors duration-200 ${
                  sticker === id
                    ? "border-sage-400 bg-sage-100 dark:border-sage-500 dark:bg-sage-800"
                    : "border-warm-100 bg-warm-50 dark:border-warm-800 dark:bg-warm-950"
                }`}
              >
                <Sticker id={id} size={26} />
              </button>
            ))}
          </div>
        </div>

        {heavyDay && (
          <div className="w-full rounded-3xl border border-sage-100 bg-sage-50 p-5 dark:border-sage-800 dark:bg-sage-900">
            <p className="text-sm text-sage-800 dark:text-sage-100">
              {t.checkin.complete.breatheSuggestion}
            </p>
            <Link
              href="/breathe"
              className="mt-3 flex min-h-12 items-center justify-center rounded-2xl bg-sage-600 px-4 text-sm font-medium text-sage-50 dark:bg-sage-500 dark:text-warm-950"
            >
              {t.checkin.complete.breatheLink}
            </Link>
          </div>
        )}

        {noteSaved ? (
          <p className="text-sm text-sage-600 dark:text-sage-300">
            {t.checkin.complete.oneGoodThingSaved}
          </p>
        ) : (
          <div className="flex w-full flex-col gap-2">
            <p className="text-sm text-warm-600 dark:text-warm-300">
              {t.checkin.complete.oneGoodThing}
            </p>
            <input
              type="text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={t.checkin.complete.oneGoodThingPlaceholder}
              className="min-h-14 rounded-2xl border border-warm-200 bg-white px-4 text-center text-base text-warm-800 placeholder:text-warm-400 dark:border-warm-800 dark:bg-warm-900 dark:text-warm-100"
            />
            {noteText.trim() && (
              <BigButton onClick={saveNote}>
                {t.checkin.complete.oneGoodThingSave}
              </BigButton>
            )}
          </div>
        )}

        <div className="flex w-full flex-col gap-3">
          <BigButton variant="primary" onClick={() => router.push("/today")}>
            {t.checkin.complete.viewToday}
          </BigButton>
          {answers.unusualEvent === "yes" && (
            <Link
              href="/event"
              className="flex min-h-14 w-full items-center justify-center rounded-2xl border border-warm-200 bg-white font-medium text-warm-700 shadow-sm dark:border-warm-800 dark:bg-warm-900 dark:text-warm-200"
            >
              {t.checkin.complete.addEventDetail}
            </Link>
          )}
          <BigButton variant="quiet" onClick={() => router.push("/")}>
            {t.common.home}
          </BigButton>
        </div>
      </main>
    );
  }

  const current = STEPS[step];
  const q = t.checkin.questions;
  const modeQid = modeQuestionIdForDate(profile.mode, today);
  const modeQ = t.checkin.modeQuestions[modeQid];

  const stopHere = (
    <BigButton variant="quiet" onClick={() => finish(answers)}>
      {t.checkin.stopHere}
    </BigButton>
  );

  let question: string;
  let body: React.ReactNode;

  switch (current) {
    case "body":
      question = q.body.text;
      body = (
        <>
          {(["okay", "normal", "overloaded"] as const).map((v) => (
            <BigButton
              key={v}
              selected={answers.bodyState === v}
              onClick={() => answer({ bodyState: v })}
            >
              {q.body.options[v]}
            </BigButton>
          ))}
        </>
      );
      break;
    case "gate":
      question = q.gate.text;
      body = (
        <>
          <p className="text-center text-sm text-warm-500 dark:text-warm-400">
            {q.gate.hint}
          </p>
          <BigButton variant="primary" onClick={() => answer({})}>
            {q.gate.more}
          </BigButton>
          <BigButton onClick={() => finish(answers)}>{q.gate.stop}</BigButton>
        </>
      );
      break;
    case "sleep":
      question = q.sleep.text;
      body = (
        <>
          {(["enough", "short", "barely"] as const).map((v) => (
            <BigButton
              key={v}
              selected={answers.sleep === v}
              onClick={() => answer({ sleep: v })}
            >
              {q.sleep.options[v]}
            </BigButton>
          ))}
          {stopHere}
        </>
      );
      break;
    case "fatigue":
      question = q.fatigue.text;
      body = (
        <>
          {(["low", "medium", "high"] as const).map((v) => (
            <BigButton
              key={v}
              selected={answers.fatigue === v}
              onClick={() => answer({ fatigue: v })}
            >
              {q.fatigue.options[v]}
            </BigButton>
          ))}
          {stopHere}
        </>
      );
      break;
    case "stress":
      question = q.stress.text;
      body = (
        <>
          {(["low", "medium", "high"] as const).map((v) => (
            <BigButton
              key={v}
              selected={answers.stress === v}
              onClick={() => answer({ stress: v })}
            >
              {q.stress.options[v]}
            </BigButton>
          ))}
          {stopHere}
        </>
      );
      break;
    case "medication":
      question = q.medication.text;
      body = (
        <>
          {(["done", "not_yet", "not_applicable"] as const).map((v) => (
            <BigButton
              key={v}
              selected={answers.medication === v}
              onClick={() => answer({ medication: v })}
            >
              {q.medication.options[v]}
            </BigButton>
          ))}
          {stopHere}
        </>
      );
      break;
    case "unusual":
      question = q.unusual.text;
      body = (
        <>
          {(["none", "yes"] as const).map((v) => (
            <BigButton
              key={v}
              selected={answers.unusualEvent === v}
              onClick={() => answer({ unusualEvent: v })}
            >
              {q.unusual.options[v]}
            </BigButton>
          ))}
          {stopHere}
        </>
      );
      break;
    case "modeQ":
      question = modeQ.text;
      body = (
        <>
          {Object.entries(modeQ.options as Record<string, string>).map(
            ([v, label]) => (
              <BigButton
                key={v}
                selected={answers.mainDrain === encodeMainDrain(modeQid, v)}
                onClick={() =>
                  answer({ mainDrain: encodeMainDrain(modeQid, v) })
                }
              >
                {label}
              </BigButton>
            ),
          )}
          {stopHere}
        </>
      );
      break;
  }

  return (
    <main className="flex flex-1 flex-col pt-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
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
        </button>
        <Dots total={7} current={DOT_INDEX[current]} />
        <div className="min-w-12" />
      </div>

      <div
        key={step}
        className="flex flex-1 flex-col items-center justify-center gap-6 fade-in"
      >
        <Character size={96} />
        <h1 className="text-center text-xl font-semibold leading-relaxed">
          {question}
        </h1>
        <div className="flex w-full flex-col gap-3">{body}</div>
      </div>
    </main>
  );
}
