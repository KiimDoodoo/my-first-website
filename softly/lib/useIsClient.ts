"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * False during SSR and hydration, true on the client afterwards.
 * Lets pages read localStorage without hydration mismatches.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
