import { BRIDGE } from "@/lib/incidents";

/* Same layout as NormalDayView, with the road status in the counter's place. */
export default function CounterIncidentView() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="text-6xl mb-4 wiggle inline-block">🌉</div>

      <h1 className="font-display font-black text-[clamp(1.75rem,5vw,3rem)] leading-tight text-[#3d2314] mb-4">
        {BRIDGE.name}
      </h1>

      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#c94a1a] mb-2">
        <span aria-hidden className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#c94a1a] opacity-75 animate-ping motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#c94a1a]" />
        </span>
        Live incident
      </p>

      <p className="font-counter font-black leading-none whitespace-nowrap text-[clamp(3rem,13vw,10rem)] text-[#c94a1a]">
        Road Closed
      </p>

      <p className="text-[#c4916a] text-sm mt-4 mb-10">
        A truck hit the overpass on Waterloo Row{" "}
        <strong className="text-[#a0673a]">today</strong>.
      </p>
    </div>
  );
}
