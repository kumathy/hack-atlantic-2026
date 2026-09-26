"use client";

import Link from "next/link";
import { useState } from "react";
import { TbAlertTriangle, TbTimeline } from "react-icons/tb";
import ReportModal from "@/components/report-modal";
import CounterPlaceholder from "@/components/counter-placeholder";
import CounterIncidentView from "@/components/counter-incident-view";
import DetourList from "@/components/detour-list";
import NormalDayView from "@/components/counter-normal-day";
import { LAST_INCIDENT_DATE } from "@/lib/incidents";
import { useDaysSince } from "@/lib/use-days-since";

export default function HomePage() {
  const days = useDaysSince(LAST_INCIDENT_DATE);
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <main className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
      {days === null ? (
        <CounterPlaceholder />
      ) : days === 0 ? (
        <>
          <CounterIncidentView />
          <DetourList />
        </>
      ) : (
        <NormalDayView days={days} />
      )}
      <div className="flex flex-row flex-wrap items-center justify-center gap-3 pb-8">
        <Link
          href="/timeline"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#f5d4b0] text-[#c94a1a] font-bold rounded-full hover:border-[#ff6b35] transition-colors"
        >
          <TbTimeline aria-hidden />
          See Incident Timeline
        </Link>
        {days !== null && days > 0 && (
          <button
            onClick={() => setIsReportOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ff6b35] text-white font-bold rounded-full hover:bg-[#e85a24] transition-colors shadow-sm"
          >
            <TbAlertTriangle aria-hidden />
            Report an Incident
          </button>
        )}
      </div>
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </main>
  );
}
