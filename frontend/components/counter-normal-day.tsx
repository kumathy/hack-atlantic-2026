import { BRIDGE, LAST_INCIDENT_DATE } from "@/lib/incidents";
import { formatLongDate } from "@/lib/dates";

export default function NormalDayView({ days }: { days: number }) {

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 pb-8 text-center">
      <div className="text-6xl my-4 wiggle inline-block">🌉</div>

      <p className="font-semibold uppercase tracking-[0.25em] text-[#c4916a] text-xs mb-2">
        {BRIDGE.name}
      </p>

      <div
        className="font-display font-black leading-none tabular-nums text-[#c94a1a]"
        style={{ fontSize: "clamp(6rem,22vw,15rem)" }}
      >
        {days.toLocaleString()}
      </div>

      <p className="font-display italic text-[clamp(1rem,2.5vw,1.5rem)] text-[#a0673a] mt-2 mb-1">
        {days === 1 ? "day" : "days"} since a truck hit the
        overpass on Waterloo Row
      </p>

      <p className="text-[#c4916a] text-sm mt-2 mb-10">
        Last incident:{" "}
        <span className="font-semibold text-[#a0673a]">
          {formatLongDate(LAST_INCIDENT_DATE)}
        </span>
      </p>

    </div>
  );
}
