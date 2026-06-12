interface CharacterProps {
  size?: number;
  float?: boolean;
}

/**
 * Softly's helper character — same sprout-headed friend as the app icon,
 * so the icon on the home screen and the character in the app match.
 */
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
          d="M60 26V16"
          strokeWidth="4"
          strokeLinecap="round"
          className="stroke-sage-700 dark:stroke-sage-300"
        />
        <path
          d="M60 16c0-8 6-12 15-12 0 8-6 12-15 12Z"
          className="fill-sage-300 dark:fill-sage-400"
        />
        <path
          d="M60 106c23 0 41-15.5 41-40 0-23.5-18.5-39-41-39S19 42.5 19 66c0 24.5 18 40 41 40Z"
          className="fill-sage-200 dark:fill-sage-700"
        />
        <path
          d="M60 99c19.5 0 34-13 34-33.5C94 45.5 78.5 33 60 33S26 45.5 26 65.5C26 86 40.5 99 60 99Z"
          className="fill-sage-100 dark:fill-sage-600"
        />
        <circle cx="47" cy="64" r="4.6" className="fill-warm-800 dark:fill-warm-100" />
        <circle cx="73" cy="64" r="4.6" className="fill-warm-800 dark:fill-warm-100" />
        <path
          d="M51 77c3.4 4 6.2 5 9 5s5.6-1 9-5"
          strokeWidth="3.6"
          strokeLinecap="round"
          fill="none"
          className="stroke-warm-800 dark:stroke-warm-100"
        />
        <circle cx="37" cy="72" r="5" className="fill-sage-200 dark:fill-sage-500" opacity="0.8" />
        <circle cx="83" cy="72" r="5" className="fill-sage-200 dark:fill-sage-500" opacity="0.8" />
      </svg>
    </div>
  );
}
