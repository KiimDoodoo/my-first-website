import type {
  CheckInDraft,
  DailyCheckIn,
  SafetyCard,
  SelfCareDay,
  SelfCareKey,
  SelfCareLog,
  UnusualEvent,
  UserProfile,
} from "./types";

export const STORAGE_KEYS = {
  profile: "softly_user_profile",
  checkins: "softly_daily_checkins",
  events: "softly_unusual_events",
  safetyCard: "softly_safety_card",
  draft: "softly_checkin_draft",
  medCardDismissed: "softly_med_card_dismissed",
  selfCare: "softly_selfcare",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — fail quietly, the app stays usable
  }
}

function remove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// --- profile ---

export function getProfile(): UserProfile | null {
  return read<UserProfile | null>(STORAGE_KEYS.profile, null);
}

export function saveProfile(profile: UserProfile): void {
  write(STORAGE_KEYS.profile, profile);
}

// --- daily check-ins ---

export function getCheckIns(): DailyCheckIn[] {
  return read<DailyCheckIn[]>(STORAGE_KEYS.checkins, []);
}

export function getCheckInByDate(date: string): DailyCheckIn | undefined {
  return getCheckIns().find((c) => c.date === date);
}

/** Upserts by date — one record per day. */
export function saveCheckIn(checkIn: DailyCheckIn): void {
  const rest = getCheckIns().filter((c) => c.date !== checkIn.date);
  write(STORAGE_KEYS.checkins, [...rest, checkIn]);
}

// --- unusual events ---

export function getEvents(): UnusualEvent[] {
  return read<UnusualEvent[]>(STORAGE_KEYS.events, []);
}

export function getEventById(id: string): UnusualEvent | undefined {
  return getEvents().find((e) => e.id === id);
}

export function addEvent(event: UnusualEvent): void {
  write(STORAGE_KEYS.events, [...getEvents(), event]);
}

export function updateEvent(event: UnusualEvent): void {
  write(
    STORAGE_KEYS.events,
    getEvents().map((e) => (e.id === event.id ? event : e)),
  );
}

// --- safety card ---

export function getSafetyCard(): SafetyCard | null {
  return read<SafetyCard | null>(STORAGE_KEYS.safetyCard, null);
}

export function saveSafetyCard(card: SafetyCard): void {
  write(STORAGE_KEYS.safetyCard, card);
}

// --- check-in draft ---

export function getDraft(today: string): CheckInDraft | null {
  const draft = read<CheckInDraft | null>(STORAGE_KEYS.draft, null);
  if (draft && draft.date === today) return draft;
  return null;
}

export function saveDraft(draft: CheckInDraft): void {
  write(STORAGE_KEYS.draft, draft);
}

export function clearDraft(): void {
  remove(STORAGE_KEYS.draft);
}

// --- medication reminder card dismissal (per day) ---

export function getMedCardDismissedDate(): string | null {
  return read<string | null>(STORAGE_KEYS.medCardDismissed, null);
}

export function dismissMedCard(today: string): void {
  write(STORAGE_KEYS.medCardDismissed, today);
}

// --- self-care marks ---

export function getSelfCareLog(): SelfCareLog {
  return read<SelfCareLog>(STORAGE_KEYS.selfCare, {});
}

export function getSelfCareDay(date: string): SelfCareDay {
  return getSelfCareLog()[date] ?? {};
}

export function toggleSelfCare(date: string, key: SelfCareKey): SelfCareDay {
  const log = getSelfCareLog();
  const day = { ...(log[date] ?? {}), [key]: !log[date]?.[key] };
  write(STORAGE_KEYS.selfCare, { ...log, [date]: day });
  return day;
}

// --- export / clear ---

export function exportAllData(): string {
  const data = {
    profile: getProfile(),
    dailyCheckIns: getCheckIns(),
    unusualEvents: getEvents(),
    safetyCard: getSafetyCard(),
    selfCare: getSelfCareLog(),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
}

export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(remove);
}

// --- import (restore from a JSON export) ---

export interface ImportPreview {
  profile: UserProfile | null;
  dailyCheckIns: DailyCheckIn[];
  unusualEvents: UnusualEvent[];
  safetyCard: SafetyCard | null;
  selfCare: SelfCareLog | null;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Parses a Softly JSON export. Returns null when the file isn't
 * recognizably a Softly export. Malformed entries are dropped.
 */
export function parseImport(raw: string): ImportPreview | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(parsed)) return null;

  const profile =
    isRecord(parsed.profile) && typeof parsed.profile.mode === "string"
      ? (parsed.profile as unknown as UserProfile)
      : null;

  const dailyCheckIns = Array.isArray(parsed.dailyCheckIns)
    ? (parsed.dailyCheckIns.filter(
        (c) =>
          isRecord(c) &&
          typeof c.date === "string" &&
          typeof c.bodyState === "string",
      ) as unknown as DailyCheckIn[])
    : [];

  const unusualEvents = Array.isArray(parsed.unusualEvents)
    ? (parsed.unusualEvents.filter(
        (e) =>
          isRecord(e) &&
          typeof e.date === "string" &&
          typeof e.time === "string",
      ) as unknown as UnusualEvent[])
    : [];

  const safetyCard = isRecord(parsed.safetyCard)
    ? (parsed.safetyCard as SafetyCard)
    : null;

  const selfCare = isRecord(parsed.selfCare)
    ? (parsed.selfCare as SelfCareLog)
    : null;

  const hasAnything =
    profile !== null ||
    dailyCheckIns.length > 0 ||
    unusualEvents.length > 0 ||
    safetyCard !== null ||
    selfCare !== null;
  if (!hasAnything) return null;

  return { profile, dailyCheckIns, unusualEvents, safetyCard, selfCare };
}

/** Replaces this device's data with the imported export. */
export function applyImport(data: ImportPreview): void {
  if (data.profile) write(STORAGE_KEYS.profile, data.profile);
  write(STORAGE_KEYS.checkins, data.dailyCheckIns);
  write(STORAGE_KEYS.events, data.unusualEvents);
  if (data.safetyCard) write(STORAGE_KEYS.safetyCard, data.safetyCard);
  if (data.selfCare) write(STORAGE_KEYS.selfCare, data.selfCare);
  remove(STORAGE_KEYS.draft);
}
