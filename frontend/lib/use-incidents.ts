"use client";

import { useEffect, useState } from "react";
import { INCIDENTS, type Incident } from "./incidents";
import { fetchDetectedIncidents, mergeIncidents } from "./vibrations";

const POLL_MS = 5_000;

let cached: Incident[] | null = null;

// null until the first check with the backend finishes
export function useIncidents(): Incident[] | null {
  const [incidents, setIncidents] = useState<Incident[] | null>(cached);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        cached = mergeIncidents(await fetchDetectedIncidents());
      } catch {
        cached ??= INCIDENTS;
      }
      if (!cancelled) setIncidents(cached);
    }

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return incidents;
}
