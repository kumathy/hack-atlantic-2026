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
import { LAST_INCIDENT_DATE } from "@/lib/incidents";
import { useDaysSince } from "@/lib/use-days-since";

/* The first screen: fills the viewport below the nav, content centered. */
const HERO_CLASS =
  "relative flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 pt-12 pb-24";

/* Reading the URL (?view=) needs a Suspense boundary for static prerendering. */
export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main>
          <section className={HERO_CLASS}>
            <CounterPlaceholder />
          </section>
        </main>
      }
    >
      <Home />
    </Suspense>
  );
}

/**
 * Dev-only: `?view=incident` forces the live-incident view so it can be
 * worked on without editing LAST_INCIDENT_DATE. Ignored in production.
 */
function usePreviewDays(days: number | null): number | null {
  const view = useSearchParams().get("view");
  if (process.env.NODE_ENV !== "development" || days === null) return days;
  return view === "incident" ? 0 : days;
}

function Home() {
  const days = usePreviewDays(useDaysSince(LAST_INCIDENT_DATE));
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const isIncident = days === 0;

  return (
    <main>
      <section className={HERO_CLASS}>
        {days === null ? (
          <CounterPlaceholder />
        ) : isIncident ? (
          <CounterIncidentView />
        ) : (
          <NormalDayView days={days} />
        )}
        <div className="flex flex-row flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsAlertsOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#f5d4b0] text-[#c94a1a] font-bold rounded-full hover:border-[#ff6b35] transition-colors"
          >
            <TbBell aria-hidden />
            Get Alerts
          </button>
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

        {isIncident && (
          <a
            href="#detours"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-1 text-xs font-semibold uppercase tracking-widest text-[#8a5530] hover:text-[#c94a1a] transition-colors"
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
