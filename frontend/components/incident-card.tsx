import { TbArrowUpRight } from "react-icons/tb";
import { formatMonthDay } from "@/lib/dates";
import type { Incident } from "@/lib/incidents";

export default function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <div className="relative flex">
      <div className="w-[4.5rem] sm:w-[6rem] pr-3 text-right flex-shrink-0 pt-4">
        <time
          dateTime={incident.date}
          className="text-xs text-[#c4916a] font-semibold"
        >
          {formatMonthDay(incident.date)}
        </time>
      </div>

      <div className="absolute left-[4.5rem] sm:left-[6rem] top-5 w-2.5 h-2.5 bg-[#f5d4b0] rounded-full -translate-x-1/2 border-2 border-[#e8c9a8]" />

      <div className="ml-6 flex-1 bg-white rounded-2xl border border-[#f5d4b0] p-4 hover:border-[#ff6b35]/50 hover:shadow-sm transition-all">
        <h3 className="font-display font-bold text-sm text-[#3d2314] mb-1">
          {incident.damage}
        </h3>
        <p className="text-xs text-[#a0673a] leading-relaxed">
          {incident.note}
        </p>
        <a
          href={incident.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 mt-1.5 text-xs font-semibold text-[#ff6b35] hover:text-[#c94a1a] hover:underline"
        >
          Source: {incident.source.name}
          <TbArrowUpRight aria-hidden />
        </a>
      </div>
    </div>
  );
}
