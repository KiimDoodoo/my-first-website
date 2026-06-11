# Softly · 소프틀리

하루를 가볍게 들여다보는 작은 기록 공간.

Softly is a **low-stimulation wellness check-in app**. A small helper character
gently asks one or two questions a day, and answers become simple daily records
the user can reflect on over time.

> Softly는 웰니스 체크인 및 개인 기록 앱입니다. 의료 조언, 진단, 치료, 예방,
> 예측을 제공하지 않습니다.

## Run locally

```bash
cd softly
npm install
npm run dev
```

Open http://localhost:3000 — the layout is mobile-first, so a narrow window or
your browser's device emulation gives the intended experience.

Production build:

```bash
npm run build
npm start
```

## What's inside

| Screen | Path |
| --- | --- |
| Landing / home (helper greeting) | `/` |
| Onboarding (worker / parent / student mode) | `/onboarding` |
| Daily check-in (conversational, one question per screen) | `/checkin` |
| Today summary | `/today` |
| 7-day rhythm summary | `/summary` |
| Quick unusual-event record | `/event` |
| Record viewer / text export / print view | `/records` |
| Safety card | `/safety` |
| Settings (mode, language, JSON export, clear data) | `/settings` |

## Tech notes

- **Next.js (App Router) + TypeScript + Tailwind CSS**, mobile-first.
- **All data stays on the device** in `localStorage` — no auth, backend, or
  external API. Typed storage helpers with SSR guards live in `lib/storage.ts`.
- **i18n**: all UI strings live in locale dictionaries (`lib/i18n/ko.ts`,
  `lib/i18n/en.ts`); Korean is the default language.
- **Helper character**: rule-based relational greetings and a pool of gentle
  post-check-in responses in `lib/messages.ts` — no AI.
- **PWA-ready**: `public/manifest.webmanifest`, PNG/SVG icons
  (`scripts/generate-icons.mjs` regenerates them), and a service worker
  (`public/sw.js`) so the app opens offline once visited. No push
  notifications.
- **Photosensitivity-safe by design**: fade-only transitions (≥200 ms), no
  flashing or blinking, no saturated red, muted sage/warm-neutral palette,
  `prefers-reduced-motion` respected, dark mode follows the system preference.

## Data

localStorage keys: `softly_user_profile`, `softly_daily_checkins`,
`softly_unusual_events`, `softly_safety_card`, `softly_checkin_draft`.
Settings offers a JSON export, a JSON import (restore from an export, with a
confirm step), and a confirm-guarded "clear all data".
