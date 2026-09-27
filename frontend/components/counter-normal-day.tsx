import { formatLongDate } from "@/lib/dates";
import CounterLayout from "@/components/counter-layout";

export default function NormalDayView({
  days,
  lastIncidentDate,
  children,
}: {
  days: number;
  lastIncidentDate: string;
  children?: React.ReactNode;
}) {
  return (
    <CounterLayout
      top={
        <h1 className="font-display font-black text-[clamp(2.25rem,7vw,3.75rem)] leading-tight text-ink">
          Thorpe Watch
        </h1>
      }
      middle={
        <div className="flex items-baseline gap-[clamp(0.5rem,1.75vw,1.25rem)] font-counter font-black leading-none text-counter">
          <span
            className="tabular-nums"
            style={{ fontSize: "clamp(5rem,19vw,12.75rem)" }}
          >
            {days.toLocaleString()}
          </span>
          <span className="text-[clamp(1.5rem,5vw,3.5rem)]">
            {days === 1 ? "day" : "days"}
          </span>
        </div>
      }
      bottom={
        <>
          <p className="font-display italic text-[clamp(1rem,2.5vw,1.5rem)] text-muted mb-1">
            since a truck hit the overpass on Waterloo Row
          </p>
          <p className="text-subtle text-sm mt-2 mb-8">
            Last incident:{" "}
            <span className="font-semibold text-muted">
              {formatLongDate(lastIncidentDate)}
            </span>
          </p>
          {children}
        </>
      }
    />
  );
}
