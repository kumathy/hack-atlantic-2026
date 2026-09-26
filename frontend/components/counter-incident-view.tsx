import { BRIDGE } from "@/lib/incidents";

export default function CounterIncidentView() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="bounce-in">
          <h1 className="font-display font-black text-[clamp(3.5rem,14vw,9rem)] leading-none text-[#c94a1a] mb-2">
            Live Incident!
          </h1>
          <p className="font-display italic text-[clamp(1.1rem,3vw,1.8rem)] text-[#a0673a] mb-2">
            Refer to the detour routes.
          </p>
          <p className="text-[#c4916a] text-sm mb-10 max-w-sm mx-auto">
            A truck has hit the {BRIDGE.name} overpass{" "}
            <strong>today</strong>.
          </p>
        </div>
    </div>
  );
}
