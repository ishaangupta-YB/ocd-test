import Link from "next/link";
import { Shield } from "lucide-react";

import { Navigation } from "@/components/layout/Navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color-mix(in_oklab,var(--color-background)_84%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Y-BOCS-II
            </div>
            <div className="font-serif text-lg leading-tight text-foreground">
              OCD Screener
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Navigation />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
