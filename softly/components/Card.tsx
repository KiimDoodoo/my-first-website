import type { HTMLAttributes } from "react";

/** Soft rounded card with generous padding. */
export default function Card({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl bg-white p-5 shadow-sm border border-warm-100 dark:bg-warm-900 dark:border-warm-800 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
