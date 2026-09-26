import Image from "next/image";
import bridgePhoto from "@/public/images/bridge.webp";
import { BRIDGE } from "@/lib/incidents";

export default function BridgeBanner() {
  return (
    <figure className="w-full">
      <div className="relative h-[16vh] overflow-hidden rounded-2xl">
        <Image
          src={bridgePhoto}
          alt={BRIDGE.name}
          placeholder="blur"
          loading="eager"
          fetchPriority="high"
          fill
          sizes="(min-width: 768px) 720px, 100vw"
          className="object-cover object-[50%_67%]"
        />
      </div>
      {/* w-0 min-w-full keeps the caption from widening the image past the title */}
      <figcaption className="mt-1.5 w-0 min-w-full text-center text-xs italic text-subtle">
        <span aria-hidden className="not-italic">📍</span> The {BRIDGE.name} over Waterloo Row, Fredericton.
      </figcaption>
    </figure>
  );
}
