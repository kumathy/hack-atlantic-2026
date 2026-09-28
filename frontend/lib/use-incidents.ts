"use client";

import { useEffect, useMemo, useState } from "react";
import { useDemoLiveSince } from "./demo";
import { DEMO_MODE } from "./demo-mode";
import { INCIDENTS, type Incident } from "./incidents";
import {
  detectedIncident,
  fetchDetectedIncidents,
  mergeIncidents,
} from "./vibrations";

const POLL_MS = 5_000;

let cached: Incident[] | null = null;

// null until the first check with the backend finishes
function useLiveIncidents(): Incident[] | null {
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

function useDemoIncidents(): Incident[] {
  const liveSince = useDemoLiveSince();
  return useMemo(
    () =>
      liveSince === null
        ? INCIDENTS
        : mergeIncidents([detectedIncident(new Date(liveSince))]),
    [liveSince],
  );
}

export const useIncidents: () => Incident[] | null = DEMO_MODE
  ? useDemoIncidents
  : useLiveIncidents;
