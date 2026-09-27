"use client";

import { useSyncExternalStore } from "react";
import { daysSince } from "./dates";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

// null on the server to avoid a hydration mismatch
export function useDaysSince(dateStr: string | null): number | null {
  return useSyncExternalStore(
    subscribe,
    () => (dateStr ? daysSince(dateStr) : null),
    () => null,
  );
}
