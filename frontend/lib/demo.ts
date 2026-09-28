"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "demo-live-since";
const listeners = new Set<() => void>();

let liveSince: number | null = readStored();

function readStored(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return value ? Number(value) : null;
  } catch {
    return null;
  }
}

export function setDemoLive(live: boolean) {
  liveSince = live ? Date.now() : null;
  try {
    if (liveSince) sessionStorage.setItem(STORAGE_KEY, String(liveSince));
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Time of the simulated strike, or null in the normal view
export function useDemoLiveSince(): number | null {
  return useSyncExternalStore(subscribe, () => liveSince, () => null);
}
