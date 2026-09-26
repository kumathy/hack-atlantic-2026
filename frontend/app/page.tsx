"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReportModal from "@/components/report-modal";
import TruckRain from "@/components/truck-rain";
import { formatLongDate } from "@/lib/dates";
import {
  INCIDENTS,
  LAST_INCIDENT_DATE,
  ZERO_DAY_PHOTOS,
} from "@/lib/incidents";
import { useDaysSince } from "@/lib/use-days-since";

export default function HomePage() {
  const days = useDaysSince(LAST_INCIDENT_DATE);
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <main className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden">
      {days === null ? (
        <CounterSkeleton />
      ) : days === 0 ? (
        <ZeroDayView onOpenReport={() => setIsReportOpen(true)} />
      ) : (
        <NormalDayView days={days} onOpenReport={() => setIsReportOpen(true)} />
      )}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </main>
  );
}

/* Placeholder while the day count is computed client-side. */
function CounterSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
      <div className="text-6xl mb-4 opacity-40">🌉</div>
      <div className="h-[clamp(6rem,22vw,15rem)] w-64 rounded-3xl bg-[#f5d4b0]/40 animate-pulse" />
      <span className="sr-only">Loading the counter…</span>
    </div>
  );
}

function ZeroDayView({ onOpenReport }: { onOpenReport: () => void }) {
  return (
    <>
      <TruckRain />
      <div className="relative z-10 py-12 px-4 max-w-4xl mx-auto text-center">
        <div className="bounce-in">
          <div className="inline-block bg-[#ff6b35] text-white font-bold text-xs px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            🚨 Fresh Incident
          </div>
          <h1 className="font-display font-black text-[clamp(3.5rem,14vw,9rem)] leading-none text-[#c94a1a] mb-2">
            Oh no.
          </h1>
          <p className="font-display italic text-[clamp(1.1rem,3vw,1.8rem)] text-[#a0673a] mb-2">
            They did it again.
          </p>
          <p className="text-[#c4916a] text-sm mb-10 max-w-sm mx-auto">
            A truck has hit the overpass <strong>today</strong>. The counter
            resets. The bridge laughs. We document.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {ZERO_DAY_PHOTOS.map((p, i) => (
            <div
              key={p.src}
              className="bounce-in relative bg-[#f5d4b0] overflow-hidden rounded-xl aspect-square"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/timeline"
            className="px-6 py-3 bg-[#ff6b35] text-white font-bold rounded-full hover:bg-[#e85a24] transition-colors shadow-sm"
          >
            See the Hall of Shame 🏆
          </Link>
          <button
            onClick={onOpenReport}
            className="px-6 py-3 bg-white border-2 border-[#f5d4b0] text-[#c94a1a] font-bold rounded-full hover:border-[#ff6b35] transition-colors"
          >
            File a Report 📝
          </button>
        </div>
      </div>
    </>
  );
}

function NormalDayView({
  days,
  onOpenReport,
}: {
  days: number;
  onOpenReport: () => void;
}) {
  const firstYear = new Date(
    INCIDENTS[INCIDENTS.length - 1].date + "T00:00:00",
  ).getFullYear();

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 text-center">
      <div className="text-6xl mb-4 wiggle inline-block">🌉</div>

      <p className="font-semibold uppercase tracking-[0.25em] text-[#c4916a] text-xs mb-2">
        Days without incident
      </p>

      <div
        className="font-display font-black leading-none tabular-nums text-[#c94a1a]"
        style={{ fontSize: "clamp(6rem,22vw,15rem)" }}
      >
        {days.toLocaleString()}
      </div>

      <p className="font-display italic text-[clamp(1rem,2.5vw,1.5rem)] text-[#a0673a] mt-2 mb-1">
        {days === 1 ? "glorious day" : "glorious days"} since a truck hit the
        overpass
      </p>

      <p className="text-[#c4916a] text-sm mt-2 mb-10">
        Last incident:{" "}
        <span className="font-semibold text-[#a0673a]">
          {formatLongDate(LAST_INCIDENT_DATE)}
        </span>
      </p>

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <span className="bg-white border border-[#f5d4b0] text-[#a0673a] text-xs font-semibold px-3 py-1.5 rounded-full">
          🚛 {INCIDENTS.length} total incidents
        </span>
        <span className="bg-white border border-[#f5d4b0] text-[#a0673a] text-xs font-semibold px-3 py-1.5 rounded-full">
          📅 Since {firstYear}
        </span>
        <span className="bg-white border border-[#f5d4b0] text-[#a0673a] text-xs font-semibold px-3 py-1.5 rounded-full">
          🌉 Bridge still standing
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 flex-wrap justify-center">
        <button
          onClick={onOpenReport}
          className="px-6 py-3 bg-[#ff6b35] text-white font-bold rounded-full hover:bg-[#e85a24] transition-colors shadow-sm"
        >
          Report an Incident 🚨
        </button>
        <Link
          href="/timeline"
          className="px-6 py-3 bg-white border-2 border-[#f5d4b0] text-[#c94a1a] font-bold rounded-full hover:border-[#ff6b35] transition-colors"
        >
          View Hall of Shame 🏆
        </Link>
      </div>
    </div>
  );
}
