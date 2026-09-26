export default function CounterPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
      <div className="text-6xl mb-4 opacity-40">🌉</div>
      <div className="h-[clamp(6rem,22vw,15rem)] w-64 rounded-3xl bg-[#f5d4b0]/40 animate-pulse" />
      <span className="sr-only">Loading the counter…</span>
    </div>
  );
}
