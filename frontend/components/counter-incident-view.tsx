import CounterLayout from "@/components/counter-layout";

export default function CounterIncidentView({
  time,
  children,
}: {
  time?: string;
  children?: React.ReactNode;
}) {
  return (
    <CounterLayout
      top={
        <>
          <h1 className="font-display font-black text-[clamp(2.25rem,7vw,3.75rem)] leading-tight text-ink mb-3">
            Thorpe Watch
          </h1>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-alert">
            <span aria-hidden className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-alert opacity-75 animate-ping motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-alert" />
            </span>
            Live incident
          </p>
        </>
      }
      middle={
        <p className="font-counter font-black leading-none whitespace-nowrap text-[clamp(3rem,13vw,10rem)] text-alert">
          Road Closed
        </p>
      }
      bottom={
        <>
          <p className="text-subtle text-sm mt-2 mb-8">
            A truck hit the overpass on Waterloo Row{" "}
            <strong className="text-muted">
              today{time && ` at ${time}`}
            </strong>
            .
          </p>
          {children}
        </>
      }
    />
  );
}
