import { LAST_INCIDENT_DATE } from "@/lib/incidents";
import { formatLongDate } from "@/lib/dates";
import CounterLayout from "@/components/counter-layout";

export default function NormalDayView({
  days,
  children,
}: {
  days: number;
  children?: React.ReactNode;
}) {
  return (
    <CounterLayout
      top={
        <h1 className="font-display font-black text-[clamp(2.5rem,8vw,4.5rem)] leading-tight text-ink">
          Thorpe Watch
        </h1>
      }
      middle={
        <div
          className="font-counter font-black leading-none tabular-nums text-counter"
          style={{ fontSize: "clamp(6rem,22vw,15rem)" }}
        >
          {days.toLocaleString()}
        </div>
      }
      bottom={
        <>
          <p className="font-display italic text-[clamp(1rem,2.5vw,1.5rem)] text-muted mb-1">
            {days === 1 ? "day" : "days"} since a truck hit the overpass on
            Waterloo Row
          </p>
          <p className="text-subtle text-sm mt-2 mb-8">
            Last incident:{" "}
            <span className="font-semibold text-muted">
              {formatLongDate(LAST_INCIDENT_DATE)}
            </span>
          </p>
          {children}
        </>
      }
    />
  );
}
