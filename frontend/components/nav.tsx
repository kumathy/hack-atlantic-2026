"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbGauge, TbTimeline } from "react-icons/tb";

const LINKS = [
  { href: "/", label: "Counter", Icon: TbGauge },
  { href: "/timeline", label: "Timeline", Icon: TbTimeline },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#fef3e8]/90 backdrop-blur-sm border-b-2 border-[#f5d4b0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl wiggle inline-block">🌉</span>
          <span className="font-display font-black text-base text-[#c94a1a] tracking-tight group-hover:text-[#ff6b35] transition-colors">
            Thorpe Watch
          </span>
        </Link>

        <div className="flex gap-1">
          {LINKS.map(({ href, label, Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all
                  ${
                    isActive
                      ? "bg-[#ff6b35] text-white shadow-sm"
                      : "text-[#a0673a] hover:bg-[#fde0c8] hover:text-[#c94a1a]"
                  }
                `}
              >
                <Icon aria-hidden className="text-sm" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
