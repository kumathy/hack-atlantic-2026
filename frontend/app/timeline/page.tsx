import type { Metadata } from "next";
import IncidentCard from "@/components/incident-card";
import ReportButton from "@/components/report-button";
import { TbTimeline } from "react-icons/tb";
import { groupByYear } from "@/lib/dates";
import { BRIDGE, INCIDENTS, RECORDED_STRIKES } from "@/lib/incidents";

// Keep in sync with the date column width in IncidentCard
const RAIL = "absolute left-[4.5rem] sm:left-[6rem] -translate-x-1/2";
const SPINE = "w-0.5 bg-line";

const SUMMARY = `${RECORDED_STRIKES.total} strikes recorded at the ${BRIDGE.name} since ${RECORDED_STRIKES.sinceYear}.`;

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
          <h1 className="font-display font-black text-4xl text-ink mb-2">
            Incident Timeline
          </h1>
          <p className="text-muted text-sm">
            {SUMMARY}
          </p>
        </div>

        <div>
          {grouped.map(([year, incidents], yearIndex) => (
            <section key={year}>
              <div className="relative flex items-start pb-5">
                <div
                  className={`${RAIL} ${SPINE} ${yearIndex === 0 ? "top-3.5" : "top-0"} bottom-0`}
                />
                <div className="w-[4.5rem] sm:w-[6rem] pr-3 text-right">
                  <h2 className="font-display font-black text-xl leading-7 text-accent">
                    {year}
                  </h2>
                </div>
                <div
                  className={`${RAIL} top-3.5 -translate-y-1/2 w-4 h-4 bg-accent rounded-full`}
                />
                <div className="ml-6 mt-1 text-xs font-bold text-subtle bg-tint px-2.5 py-0.5 rounded-full">
                  {incidents.length}{" "}
                  {incidents.length === 1 ? "incident" : "incidents"}
                </div>
              </div>

              {incidents.map((inc, i) => (
                <div
                  key={inc.date}
                  className={`relative ${i === incidents.length - 1 ? "pb-10" : "pb-3"}`}
                >
                  <div className={`${RAIL} ${SPINE} top-0 bottom-0`} />
                  <IncidentCard incident={inc} />
                </div>
              ))}
            </section>
          ))}

          {/* End cap */}
          <div className="relative flex items-start">
            <div className={`${RAIL} ${SPINE} top-0 h-2`} />
            <div className="w-[4.5rem] sm:w-[6rem] shrink-0" />
            <div
              className={`${RAIL} top-2 -translate-y-1/2 w-3 h-3 bg-line rounded-full`}
            />
            <div className="ml-6 text-xs leading-4 text-subtle italic">
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
