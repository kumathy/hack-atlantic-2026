import CounterLayout from "@/components/counter-layout";

export default function CounterPlaceholder() {
  return (
    <CounterLayout
      top={
        <h1 className="font-display font-black text-[clamp(2.25rem,7vw,3.75rem)] leading-tight text-ink">
          Thorpe Watch
        </h1>
      }
      middle={
        <>
          <div className="h-[clamp(6rem,22vw,15rem)] w-64 rounded-3xl bg-line/40" />
          <span className="sr-only">Loading the counter…</span>
        </>
      }
      bottom={null}
    />
  );
}
