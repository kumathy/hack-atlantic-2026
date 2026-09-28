"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBridgeCircleExclamation } from "react-icons/fa6";
import { TbBrandGithub, TbHome, TbTimeline } from "react-icons/tb";
import ThemeToggle from "@/components/theme-toggle";
import DemoSwitch from "@/components/demo-switch";
import { DEMO_MODE } from "@/lib/demo-mode";

const LINKS = [
  { href: "/", label: "Home", Icon: TbHome },
  { href: "/timeline", label: "Timeline", Icon: TbTimeline },
];

export default function Nav() {
  const pathname = usePathname().replace(/(.)\/$/, "$1");

  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-line">
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
                  inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 rounded-full text-xs font-bold transition-all
                  ${
                    isActive
                      ? "bg-nav-fill text-white shadow-sm"
                      : "text-muted hover:bg-tint hover:text-nav"
                  }
                `}
              >
                <Icon aria-hidden className="text-base sm:text-sm" />
                <span className="sr-only sm:not-sr-only">{label}</span>
              </Link>
            );
          })}
          <span aria-hidden className="mx-1 h-5 w-px bg-line" />
          <a
            href="https://github.com/kumathy/thorpe-watch"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base text-muted transition-colors hover:bg-tint hover:text-nav"
          >
            <TbBrandGithub aria-hidden />
          </a>
          <ThemeToggle />
        </div>
      </div>
      {DEMO_MODE && <DemoSwitch />}
    </nav>
  );
}
