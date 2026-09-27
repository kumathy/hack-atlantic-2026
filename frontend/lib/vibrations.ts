import { INCIDENTS, type Incident } from "./incidents";

const API_URL = "http://127.0.0.1:5000";

interface Vibration {
  id: number;
  impact_time: string | null;
}

const pad = (n: number) => String(n).padStart(2, "0");

function toLocalDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export async function fetchDetectedIncidents(): Promise<Incident[]> {
  const response = await fetch(`${API_URL}/api/vibrations`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load vibrations");
  }

  const rows: Vibration[] = await response.json();

  return rows
    .filter((row) => row.impact_time)
    .map((row) => {
      const impact = new Date(row.impact_time!);
      const time = impact.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
      return {
        date: toLocalDate(impact),
        time,
        damage: "Impact detected",
        note: `Picked up by the bridge's vibration sensor at ${time}.`,
      };
    });
}

// Newest first, one entry per day
export function mergeIncidents(detected: Incident[]): Incident[] {
  const byDate = new Map<string, Incident>();
  for (const incident of detected) {
    if (!byDate.has(incident.date)) byDate.set(incident.date, incident);
  }
  for (const incident of INCIDENTS) byDate.set(incident.date, incident);

  return [...byDate.values()].sort((a, b) => b.date.localeCompare(a.date));
}
