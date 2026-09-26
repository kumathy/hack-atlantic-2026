"use client";

import { useSyncExternalStore } from "react";
import { daysSince } from "./dates";

/* Re-check once a minute so the counter ticks over at midnight. */
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

/**
 * Days since `dateStr`, computed in the browser's timezone.
 * Returns null during server render so the markup doesn't mismatch on hydration.
 */
export function useDaysSince(dateStr: string): number | null {
  return useSyncExternalStore(
    subscribe,
    () => daysSince(dateStr),
    () => null,
  );
}
