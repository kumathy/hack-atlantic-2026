"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TbAlertTriangle, TbBell, TbChevronDown } from "react-icons/tb";
import ReportModal from "@/components/report-modal";
import SubscribeModal from "@/components/subscribe-modal";
import CounterPlaceholder from "@/components/counter-placeholder";
import CounterIncidentView from "@/components/counter-incident-view";
import ClosureMap from "@/components/closure-map";
import IncidentDetails from "@/components/incident-details";
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
  const incidents = useIncidents();
  const latest = incidents?.[0];
  const lastIncidentDate = latest?.date ?? null;
  const days = usePreviewDays(useDaysSince(lastIncidentDate));
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const isIncident = days === 0;

  const view = days === null ? null : isIncident ? "incident" : "counter";
  const [prevView, setPrevView] = useState(view);
  const [viewChanged, setViewChanged] = useState(false);
  if (view !== prevView) {
    setPrevView(view);
    setViewChanged(true);
  }
  const fade = viewChanged ? "page-in" : "";

  const actions = (
    <div className="flex flex-row flex-wrap items-center justify-center gap-3">
      <button
        onClick={() => setIsAlertsOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border-2 border-line text-brand font-bold rounded-full hover:border-brand transition-colors"
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
      <section
        key={isIncident ? "incident" : "counter"}
        className={`relative ${fade}`}
      >
        {days === null ? (
          <CounterPlaceholder />
        ) : isIncident ? (
          <CounterIncidentView time={latest?.time}>{actions}</CounterIncidentView>
        ) : (
          <NormalDayView days={days} lastIncidentDate={lastIncidentDate!}>
            {actions}
          </NormalDayView>
        )}

        {isIncident && (
          <a
            href="#detours"
            onClick={(e) => {
              e.preventDefault();
              const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
              ).matches;
              document.getElementById("detours")?.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
              });
            }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted hover:text-brand transition-colors"
          >
            Road closures &amp; details
            <TbChevronDown
              aria-hidden
              className="text-2xl animate-bounce motion-reduce:animate-none"
            />
          </a>
        )}
      </section>

      {isIncident && (
        <section id="detours" className={`flex min-h-[calc(100svh-var(--nav-h))] scroll-mt-[var(--nav-h)] flex-col pt-12 pb-12 ${fade}`}>
          <ClosureMap />
          {incidents && <IncidentDetails incidents={incidents} />}
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
