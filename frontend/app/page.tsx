"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TbAlertTriangle, TbBell, TbChevronDown } from "react-icons/tb";
import ReportModal from "@/components/report-modal";
import SubscribeModal from "@/components/subscribe-modal";
import CounterPlaceholder from "@/components/counter-placeholder";
import CounterIncidentView from "@/components/counter-incident-view";
import ClosureMap from "@/components/closure-map";
import NormalDayView from "@/components/counter-normal-day";
import { useDaysSince } from "@/lib/use-days-since";
import { useIncidents } from "@/lib/use-incidents";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main>
          <CounterPlaceholder />
        </main>
      }
    >
      <Home />
    </Suspense>
  );
}

// Dev only: ?view=incident forces the incident view.
function usePreviewDays(days: number | null): number | null {
  const view = useSearchParams().get("view");
  if (process.env.NODE_ENV !== "development" || days === null) return days;
  return view === "incident" ? 0 : days;
}

function Home() {
  const lastIncidentDate = useIncidents()?.[0]?.date ?? null;
  const days = usePreviewDays(useDaysSince(lastIncidentDate));
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const isIncident = days === 0;

  const actions = (
    <div className="flex flex-row flex-wrap items-center justify-center gap-3">
      <button
        onClick={() => setIsAlertsOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-line text-brand font-bold rounded-full hover:border-accent transition-colors"
      >
        <TbBell aria-hidden />
        Get Alerts
      </button>
      {days !== null && days > 0 && (
        <button
          onClick={() => setIsReportOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-bold rounded-full hover:bg-accent-hover transition-colors shadow-sm"
        >
          <TbAlertTriangle aria-hidden />
          Report an Incident
        </button>
      )}
    </div>
  );

  return (
    <main>
      <section className="relative">
        {days === null ? (
          <CounterPlaceholder />
        ) : isIncident ? (
          <CounterIncidentView>{actions}</CounterIncidentView>
        ) : (
          <NormalDayView days={days} lastIncidentDate={lastIncidentDate!}>
            {actions}
          </NormalDayView>
        )}

        {isIncident && (
          <a
            href="#detours"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted hover:text-brand transition-colors"
          >
            Road closure map
            <TbChevronDown
              aria-hidden
              className="text-2xl animate-bounce motion-reduce:animate-none"
            />
          </a>
        )}
      </section>

      {isIncident && (
        <section id="detours" className="scroll-mt-16 pb-16">
          <ClosureMap />
        </section>
      )}

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
      <SubscribeModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
      />
    </main>
  );
}
