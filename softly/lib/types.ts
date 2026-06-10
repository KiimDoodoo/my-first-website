export type Mode = "worker" | "parent" | "student";

export type Language = "ko" | "en";

export interface UserProfile {
  mode: Mode;
  language: Language;
  createdAt: string;
}

export type BodyState = "okay" | "normal" | "overloaded";
export type SleepState = "enough" | "short" | "barely";
export type Level = "low" | "medium" | "high";
export type MedicationState = "done" | "not_yet" | "not_applicable";
export type UnusualState = "none" | "yes";

export interface DailyCheckIn {
  id: string;
  date: string; // YYYY-MM-DD
  mode: Mode;
  bodyState: BodyState;
  sleep?: SleepState;
  fatigue?: Level;
  stress?: Level;
  medication?: MedicationState;
  unusualEvent?: UnusualState;
  mainDrain?: string; // "<questionId>:<optionValue>"
  note?: string;
  createdAt: string;
}

export interface UnusualEvent {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  shortNote?: string;
  duration?: string;
  beforeContext?: string;
  afterContext?: string;
  createdAt: string;
}

export interface SafetyCard {
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  medicationNotes?: string;
  clinicNotes?: string;
  whatHelps?: string;
  whatNotToDo?: string;
  additionalNotes?: string;
}

export interface CheckInDraft {
  date: string; // YYYY-MM-DD — only restored on the same day
  answers: Partial<
    Pick<
      DailyCheckIn,
      | "bodyState"
      | "sleep"
      | "fatigue"
      | "stress"
      | "medication"
      | "unusualEvent"
      | "mainDrain"
    >
  >;
  step: number;
}
