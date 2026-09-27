import CounterLayout from "@/components/counter-layout";

export default function CounterPlaceholder() {
  return (
    <>
      <div className="invisible">
        <CounterLayout
          top={
            <h1 className="font-display font-black text-[clamp(2.25rem,7vw,3.75rem)] leading-tight text-ink">
              Thorpe Watch
            </h1>
          }
          middle={<div className="h-[clamp(6rem,22vw,15rem)] w-64" />}
          bottom={null}
        />
      </div>
      <span className="sr-only">Loading the counter…</span>
    </>
  );
}
