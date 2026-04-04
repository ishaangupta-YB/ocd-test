"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      aria-label="Toggle between light and dark mode"
      className="min-h-11 min-w-[9.5rem]"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      variant="secondary"
      size="sm"
    >
      Toggle theme
    </Button>
  );
}
