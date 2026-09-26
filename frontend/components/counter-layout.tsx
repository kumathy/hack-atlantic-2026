import BridgeBanner from "@/components/bridge-banner";

export default function CounterLayout({
  top,
  middle,
  bottom,
}: {
  top: React.ReactNode;
  middle: React.ReactNode;
  bottom: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100svh-3.5rem)] grid-rows-[1fr_auto_1fr] px-4 text-center">
      <div className="flex flex-col items-center pb-4">
        <div className="flex w-fit max-w-full flex-1 flex-col">
          <div className="flex flex-1 items-center py-4">
            <BridgeBanner />
          </div>
          <div>{top}</div>
        </div>
      </div>
      <div className="flex flex-col items-center">{middle}</div>
      <div className="flex flex-col items-center justify-start pt-2 pb-24">
        {bottom}
      </div>
    </div>
  );
}
