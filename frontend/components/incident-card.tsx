"use client";

import { TbArrowUpRight } from "react-icons/tb";
import { formatMonthDay } from "@/lib/dates";
import type { Incident } from "@/lib/incidents";
import { useDaysSince } from "@/lib/use-days-since";

export default function IncidentCard({ incident }: { incident: Incident }) {
  const isToday = useDaysSince(incident.date) === 0;

  return (
    <div className="relative flex">
      <div className="w-[4.5rem] sm:w-[6rem] pr-3 text-right flex-shrink-0 pt-[21px] text-xs leading-4">
        <time
          dateTime={incident.date}
          className="text-subtle font-semibold"
        >
          {isToday ? "Today" : formatMonthDay(incident.date)}
        </time>
      </div>

      <div className="absolute left-[4.5rem] sm:left-[6rem] top-[29px] w-2.5 h-2.5 bg-line rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-line-strong" />

      <div className="ml-6 flex-1 bg-card rounded-2xl border border-line p-4 hover:border-brand/50 hover:shadow-sm transition-all">
        <h3 className="font-display font-bold text-base leading-6 text-ink mb-1">
          {incident.damage}
        </h3>
        <p className="text-xs text-muted leading-relaxed">
          {incident.note}
        </p>
        {incident.source && (
          <a
            href={incident.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 mt-1.5 text-xs font-semibold text-brand hover:text-brand-hover hover:underline"
          >
            Source: {incident.source.name}
            <TbArrowUpRight aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
}
