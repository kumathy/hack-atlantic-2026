import type { Incident } from "./incidents";

function parseIncidentDate(dateStr: string): Date {
  return /^\d{4}$/.test(dateStr)
    ? new Date(Number(dateStr), 0, 1)
    : new Date(dateStr + "T00:00:00");
}

/** Whole days between `dateStr` (local midnight) and today. */
export function daysSince(dateStr: string): number {
  const last = parseIncidentDate(dateStr);
  const now = new Date();
  last.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
}

export function groupByYear(incidents: Incident[]): [number, Incident[]][] {
  const map = new Map<number, Incident[]>();
  for (const inc of incidents) {
    const yr = parseIncidentDate(inc.date).getFullYear();
    if (!map.has(yr)) map.set(yr, []);
    map.get(yr)!.push(inc);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

export function formatLongDate(dateStr: string): string {
  if (/^\d{4}$/.test(dateStr)) return dateStr;
  return parseIncidentDate(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatMonthDay(dateStr: string): string {
  if (/^\d{4}$/.test(dateStr)) return dateStr;
  return parseIncidentDate(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function daysBetween(from: string, to: string): number {
  const a = parseIncidentDate(from);
  const b = parseIncidentDate(to);
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}
