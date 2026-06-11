interface DotsProps {
  total: number;
  current: number; // 0-based
}

/** Soft progress dots — never a percentage or countdown. */
export default function Dots({ total, current }: DotsProps) {
  return (
    <div className="flex justify-center gap-2" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full transition-colors duration-200 ${
            i <= current
              ? "bg-sage-400 dark:bg-sage-400"
              : "bg-warm-200 dark:bg-warm-800"
          }`}
        />
      ))}
    </div>
  );
}
