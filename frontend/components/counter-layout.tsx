import BridgeBanner from "@/components/bridge-banner";

export default function CounterLayout({
  top,
  middle,
  bottom,
  reserveBottom = false,
}: {
  top: React.ReactNode;
  middle: React.ReactNode;
  bottom: React.ReactNode;
  reserveBottom?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center px-4 pt-6 text-center ${
        reserveBottom ? "pb-[5.75rem]" : "pb-6"
      }`}
    >
      <div className="flex w-fit max-w-full flex-col gap-8 pb-4">
        <BridgeBanner />
        <div>{top}</div>
      </div>
      <div className="flex flex-col items-center">{middle}</div>
      <div className="flex flex-col items-center pt-2">{bottom}</div>
    </div>
  );
}
