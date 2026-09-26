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

/* No clock, no state, no browser APIs — this one stays a server component. */
export default function TimelinePage() {
  const grouped = groupByYear(INCIDENTS);

  return (
    <main className="min-h-[calc(100vh-3.5rem)] px-4 pt-16 pb-20 sm:px-6 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <TbTimeline
            aria-hidden
            className="block text-5xl mb-3 mx-auto text-[#c94a1a]"
          />
          <h1 className="font-display font-black text-4xl text-[#c94a1a] mb-2">
            Incident Timeline
          </h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#c4916a] mb-2">
            {BRIDGE.name} · {BRIDGE.location}
          </p>
          <p className="text-[#a0673a] text-sm">
            {SUMMARY}
          </p>
        </div>

        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-[4.5rem] sm:left-[6rem] top-0 bottom-0 w-0.5 bg-[#f5d4b0]" />

          {grouped.map(([year, incidents]) => (
            <section key={year} className="mb-10">
              <div className="relative flex items-center mb-5">
                <div className="w-[4.5rem] sm:w-[6rem] pr-3 text-right">
                  <h2 className="font-display font-black text-xl text-[#ff6b35]">
                    {year}
                  </h2>
                </div>
                <div className="absolute left-[4.5rem] sm:left-[6rem] w-4 h-4 bg-[#ff6b35] rounded-full -translate-x-1/2 ring-4 ring-[#fef3e8]" />
                <div className="ml-6 text-xs font-bold text-[#c4916a] bg-[#fde0c8] px-2.5 py-0.5 rounded-full">
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
            <div className="absolute left-[4.5rem] sm:left-[6rem] w-3 h-3 bg-[#f5d4b0] rounded-full -translate-x-1/2" />
            <div className="ml-6 text-xs text-[#c4916a] italic">
              Plus ~{RECORDED_STRIKES.total - INCIDENTS.length} earlier strikes
              since {RECORDED_STRIKES.sinceYear}. Remember one?{" "}
              <ReportButton className="not-italic font-semibold text-[#ff6b35] hover:text-[#c94a1a] hover:underline">
                Report it
              </ReportButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
