"use client";

import dynamic from "next/dynamic";
import { TbArrowUpRight } from "react-icons/tb";
import { CITY_ROAD_UPDATES_URL, CLOSED_STREETS } from "@/lib/closure";

const ClosureMapLeaflet = dynamic(
  () => import("@/components/closure-map-leaflet"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-line/40" />
    ),
  },
);

export default function ClosureMap() {
  return (
    <section
      aria-labelledby="closure-heading"
      className="mx-auto w-full max-w-3xl px-4"
    >
      <h2
        id="closure-heading"
        className="font-display text-xl font-bold text-ink mb-1"
      >
        Road closure
      </h2>
      <p className="text-sm text-muted mb-3">
        The following roads are closed:
      </p>
      <ul className="mb-5 grid list-inside list-disc grid-cols-2 gap-x-6 gap-y-2 marker:text-muted sm:flex sm:justify-between">
        {CLOSED_STREETS.map((street) => (
          <li key={street} className="text-sm font-semibold text-ink">
            {street}
          </li>
        ))}
      </ul>

      <div className="relative z-0 h-80 overflow-hidden rounded-2xl border border-line sm:h-[28rem]">
        <ClosureMapLeaflet />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-6 rounded-full bg-alert" />
          Road closed
        </span>
        <span>
          Drive safely and follow posted signs.{" "}
          <a
            href={CITY_ROAD_UPDATES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-semibold text-brand hover:underline"
          >
            City road updates
            <TbArrowUpRight aria-hidden />
          </a>
        </span>
      </div>
    </section>
  );
}
