import type { ReactNode } from "react";

/**
 * Diary stickers — 8 calm SVG marks in the muted palette.
 * Colors use theme tokens, so they follow the selected theme.
 */
export const STICKER_IDS = [
  "sprout",
  "pebble",
  "moon",
  "cloud",
  "teacup",
  "leaf",
  "wave",
  "star",
] as const;

export type StickerId = (typeof STICKER_IDS)[number];

interface StickerProps {
  id: string;
  size?: number;
}

export default function Sticker({ id, size = 22 }: StickerProps) {
  const shape = SHAPES[id as StickerId];
  if (!shape) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {shape}
    </svg>
  );
}

const SHAPES: Record<StickerId, ReactNode> = {
  sprout: (
    <>
      <path
        d="M12 20v-8"
        strokeWidth="2"
        strokeLinecap="round"
        className="stroke-sage-600 dark:stroke-sage-300"
        fill="none"
      />
      <path
        d="M12 13c0-4.5-3.2-6.5-6.8-6.5C5.2 11 8.4 13 12 13Z"
        className="fill-sage-500 dark:fill-sage-300"
      />
      <path
        d="M12 10c0-3.4 2.4-4.8 5.4-4.8 0 3.4-2.4 4.8-5.4 4.8Z"
        className="fill-sage-300 dark:fill-sage-500"
      />
    </>
  ),
  pebble: (
    <>
      <ellipse cx="12" cy="16.5" rx="7.5" ry="4" className="fill-warm-300 dark:fill-warm-500" />
      <ellipse cx="12" cy="9.5" rx="5" ry="3.2" className="fill-sage-400 dark:fill-sage-400" />
    </>
  ),
  moon: (
    <path
      d="M15 3.5a8.5 8.5 0 1 0 5.5 13A7.2 7.2 0 0 1 15 3.5Z"
      className="fill-sage-400 dark:fill-sage-300"
    />
  ),
  cloud: (
    <path
      d="M7.5 17.5a4 4 0 0 1-.5-8 5 5 0 0 1 9.6-1.2A3.8 3.8 0 0 1 16.8 16z M7.5 17.5h9.3"
      strokeLinecap="round"
      className="fill-warm-200 stroke-warm-400 dark:fill-warm-700 dark:stroke-warm-400"
      strokeWidth="1.4"
    />
  ),
  teacup: (
    <>
      <path
        d="M5.5 8h11v4.5a5.5 5.5 0 0 1-11 0Z"
        className="fill-sage-200 stroke-sage-500 dark:fill-sage-700 dark:stroke-sage-300"
        strokeWidth="1.6"
      />
      <path
        d="M16.5 9.5h1.6a2.2 2.2 0 0 1 0 4.4h-2"
        fill="none"
        className="stroke-sage-500 dark:stroke-sage-300"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6.5 20h10"
        className="stroke-warm-400 dark:stroke-warm-400"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  leaf: (
    <>
      <path
        d="M18.5 5.5C11 5.5 6.5 10 6.2 17.8c7.8-.3 12.3-4.8 12.3-12.3Z"
        className="fill-sage-300 dark:fill-sage-500"
      />
      <path
        d="M7.5 16.5C10 13 13 10.5 16.5 8"
        fill="none"
        className="stroke-sage-600 dark:stroke-sage-200"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </>
  ),
  wave: (
    <>
      <path
        d="M4 10.5c2.7 2 5.3 2 8 0s5.3-2 8 0"
        fill="none"
        className="stroke-sage-500 dark:stroke-sage-300"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 15.5c2.7 2 5.3 2 8 0s5.3-2 8 0"
        fill="none"
        className="stroke-sage-300 dark:stroke-sage-500"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
  star: (
    <path
      d="M12 3.5c.9 3.8 2.7 5.6 6.5 6.5-3.8.9-5.6 2.7-6.5 6.5-.9-3.8-2.7-5.6-6.5-6.5 3.8-.9 5.6-2.7 6.5-6.5Z"
      className="fill-warm-300 dark:fill-warm-400"
    />
  ),
};
