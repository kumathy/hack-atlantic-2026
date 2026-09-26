import type { Incident } from "./incidents";

/** Whole days between `dateStr` (local midnight) and today. */
export function daysSince(dateStr: string): number {
  const last = new Date(dateStr + "T00:00:00");
  const now = new Date();
  last.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
}

export function groupByYear(incidents: Incident[]): [number, Incident[]][] {
  const map = new Map<number, Incident[]>();
  for (const inc of incidents) {
    const yr = new Date(inc.date + "T00:00:00").getFullYear();
    if (!map.has(yr)) map.set(yr, []);
    map.get(yr)!.push(inc);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

export function formatLongDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatMonthDay(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
