import Image from "next/image";
import bridgePhoto from "@/public/images/bridge.webp";

export default function BridgeBanner() {
  return (
    <div className="relative h-[16vh] w-full overflow-hidden rounded-2xl">
      <Image
        src={bridgePhoto}
        alt=""
        placeholder="blur"
        loading="eager"
        fetchPriority="high"
        fill
        sizes="(min-width: 768px) 720px, 100vw"
        className="object-cover object-[50%_67%]"
      />
    </div>
  );
}
