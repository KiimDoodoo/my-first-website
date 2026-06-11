import type {
  CheckInDraft,
  DailyCheckIn,
  SafetyCard,
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

// --- export / clear ---

export function exportAllData(): string {
  const data = {
    profile: getProfile(),
    dailyCheckIns: getCheckIns(),
    unusualEvents: getEvents(),
    safetyCard: getSafetyCard(),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
}

export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(remove);
}
