"use client";

import { TbCarCrash, TbRoad } from "react-icons/tb";
import { setDemoLive, useDemoLiveSince } from "@/lib/demo";

const OPTIONS = [
  { label: "Normal", live: false, Icon: TbRoad },
  { label: "Strike", live: true, Icon: TbCarCrash },
];

export default function DemoSwitch() {
  const isLive = useDemoLiveSince() !== null;

  function select(live: boolean) {
    if (live === isLive) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    setDemoLive(live);
  }

  return (
    <div className="border-t border-line">
      <div
        role="group"
        aria-label="Demo view"
        className="max-w-5xl mx-auto px-4 sm:px-8 flex h-9 items-center justify-center gap-1 text-xs font-bold"
      >
        <span className="text-[0.625rem] font-semibold uppercase tracking-widest text-subtle">
          Demo view
        </span>
        <span aria-hidden className="mx-2 h-4 w-px bg-line" />
        {OPTIONS.map(({ label, live, Icon }) => (
          <button
            key={label}
            type="button"
            aria-pressed={isLive === live}
            onClick={() => select(live)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${
              isLive === live
                ? "bg-nav-fill text-white"
                : "text-muted hover:bg-tint hover:text-nav"
            }`}
          >
            <Icon aria-hidden className="text-sm" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
