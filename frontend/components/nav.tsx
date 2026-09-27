"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBridgeCircleExclamation } from "react-icons/fa6";
import { TbHome, TbTimeline } from "react-icons/tb";
import ThemeToggle from "@/components/theme-toggle";

const LINKS = [
  { href: "/", label: "Home", Icon: TbHome },
  { href: "/timeline", label: "Timeline", Icon: TbTimeline },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b-2 border-line">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 group">
          <FaBridgeCircleExclamation
            aria-hidden
            className="text-2xl text-nav wiggle inline-block"
          />
          <span className="font-display font-black text-base text-nav tracking-tight group-hover:text-nav-hover transition-colors">
            Thorpe Watch
          </span>
        </Link>

        <div className="flex items-center gap-1">
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
                      ? "bg-nav-fill text-white shadow-sm"
                      : "text-muted hover:bg-tint hover:text-nav"
                  }
                `}
              >
                <Icon aria-hidden className="text-sm" />
                {label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
