interface CharacterProps {
  size?: number;
  float?: boolean;
}

/** Softly's helper character: a soft sage blob with a gentle face. */
export default function Character({ size = 96, float = true }: CharacterProps) {
  return (
    <div className={float ? "float-gently" : undefined} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        role="img"
      >
        <path
          d="M60 10c26 0 48 18 48 46 0 30-18 52-48 52S12 86 12 56C12 28 34 10 60 10Z"
          className="fill-sage-200 dark:fill-sage-700"
        />
        <path
          d="M60 18c21 0 40 14 40 38 0 25-15 44-40 44S20 81 20 56c0-24 19-38 40-38Z"
          className="fill-sage-100 dark:fill-sage-600"
        />
        <circle cx="46" cy="58" r="4.5" className="fill-warm-800 dark:fill-warm-100" />
        <circle cx="74" cy="58" r="4.5" className="fill-warm-800 dark:fill-warm-100" />
        <path
          d="M50 74c3.5 4 6.5 5 10 5s6.5-1 10-5"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          className="stroke-warm-800 dark:stroke-warm-100"
        />
        <circle cx="36" cy="68" r="5" className="fill-sage-200 dark:fill-sage-500" opacity="0.7" />
        <circle cx="84" cy="68" r="5" className="fill-sage-200 dark:fill-sage-500" opacity="0.7" />
      </svg>
    </div>
  );
}
