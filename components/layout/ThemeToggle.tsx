"use client";

import { Button } from "@/components/ui/Button";

const THEME_STORAGE_KEY = "ybocs-theme";

type ThemeMode = "light" | "dark";

function resolveInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.sessionStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
}

export function ThemeToggle() {
  return (
    <Button
      aria-label="Toggle between light and dark mode"
      className="min-h-11 min-w-[9.5rem]"
      onClick={() => {
        const currentTheme = resolveInitialTheme();
        const updatedTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(updatedTheme);
        window.sessionStorage.setItem(THEME_STORAGE_KEY, updatedTheme);
      }}
      size="md"
      variant="secondary"
    >
      Toggle theme
    </Button>
  );
}
