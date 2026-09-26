import type { Metadata } from "next";
import IncidentCard from "@/components/incident-card";
import ReportButton from "@/components/report-button";
import { TbTimeline } from "react-icons/tb";
import { groupByYear } from "@/lib/dates";
import { BRIDGE, INCIDENTS, RECORDED_STRIKES } from "@/lib/incidents";

const SUMMARY = `${RECORDED_STRIKES.total} strikes recorded since ${RECORDED_STRIKES.sinceYear}.`;

export const metadata: Metadata = {
  title: "Incident Timeline — Thorpe Watch",
  description: SUMMARY,
};

export default function TimelinePage() {
  const grouped = groupByYear(INCIDENTS);

  return (
    <main className="min-h-[calc(100vh-3.5rem)] px-4 pt-16 pb-20 sm:px-6 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <TbTimeline
            aria-hidden
            className="block text-5xl mb-3 mx-auto text-alert"
          />
          <h1 className="font-display font-black text-4xl text-alert mb-2">
            Incident Timeline
          </h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-subtle mb-2">
            {BRIDGE.name} · {BRIDGE.location}
          </p>
          <p className="text-muted text-sm">
            {SUMMARY}
          </p>
        </div>

        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-[4.5rem] sm:left-[6rem] top-0 bottom-0 w-0.5 bg-line" />

          {grouped.map(([year, incidents]) => (
            <section key={year} className="mb-10">
              <div className="relative flex items-center mb-5">
                <div className="w-[4.5rem] sm:w-[6rem] pr-3 text-right">
                  <h2 className="font-display font-black text-xl text-accent">
                    {year}
                  </h2>
                </div>
                <div className="absolute left-[4.5rem] sm:left-[6rem] w-4 h-4 bg-accent rounded-full -translate-x-1/2 ring-4 ring-surface" />
                <div className="ml-6 text-xs font-bold text-subtle bg-tint px-2.5 py-0.5 rounded-full">
                  {incidents.length}{" "}
                  {incidents.length === 1 ? "incident" : "incidents"}
                </div>
              </div>

              <div className="space-y-3">
                {incidents.map((inc) => (
                  <IncidentCard
                    key={inc.date}
                    incident={inc}
                  />
                ))}
              </div>
            </section>
          ))}

          {/* End cap */}
          <div className="relative flex items-center">
            <div className="w-[4.5rem] sm:w-[6rem]" />
            <div className="absolute left-[4.5rem] sm:left-[6rem] w-3 h-3 bg-line rounded-full -translate-x-1/2" />
            <div className="ml-6 text-xs text-subtle italic">
              Plus ~{RECORDED_STRIKES.total - INCIDENTS.length} earlier strikes
              since {RECORDED_STRIKES.sinceYear}. Remember one?{" "}
              <ReportButton className="not-italic font-semibold text-accent hover:text-accent-hover hover:underline">
                Report it
              </ReportButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
