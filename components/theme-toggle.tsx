"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

/**
 * Day / Night theme toggle. Renders a compact pill that swaps between
 * the bright "sunny Calgary" day theme and the deep navy night theme.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch — only render the real state after mount.
  React.useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      title={isDark ? "Switch to day mode" : "Switch to night mode"}
      className={`group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground/80 transition-all duration-300 hover:bg-surface-hover hover:text-foreground ${className}`}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        {mounted && isDark ? (
          <Moon className="h-4 w-4 text-[#7dd3fc]" />
        ) : (
          <Sun className="h-4 w-4 text-[#0284c7] dark:text-[#7dd3fc]" />
        )}
      </span>
      <span className="hidden sm:inline">{mounted && isDark ? "Night" : "Day"}</span>
    </button>
  );
}
