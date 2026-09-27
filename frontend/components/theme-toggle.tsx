"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { TbMoon, TbSun } from "react-icons/tb";

const subscribe = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base text-muted transition-colors hover:bg-tint hover:text-nav"
    >
      {mounted && (isDark ? <TbSun aria-hidden /> : <TbMoon aria-hidden />)}
    </button>
  );
}
