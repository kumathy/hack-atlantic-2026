"use client";

import { useEffect, useState } from "react";
import { INCIDENTS, type Incident } from "./incidents";
import { fetchDetectedIncidents, mergeIncidents } from "./vibrations";

const POLL_MS = 5_000;

// null until the first check with the backend finishes
export function useIncidents(): Incident[] | null {
  const [incidents, setIncidents] = useState<Incident[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const detected = await fetchDetectedIncidents();
        if (!cancelled) setIncidents(mergeIncidents(detected));
      } catch {
        if (!cancelled) setIncidents((prev) => prev ?? INCIDENTS);
      }
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
