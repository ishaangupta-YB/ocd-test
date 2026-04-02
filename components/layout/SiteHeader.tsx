import Link from "next/link";

import { Navigation } from "@/components/layout/Navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-background)_84%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="max-w-[20rem] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
                Y-BOCS-II self-report
              </div>
              <div className="mt-1 font-serif text-2xl text-[var(--color-foreground)]">
                OCD Screener
              </div>
            </Link>
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <Navigation />
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
        <p className="max-w-3xl text-sm text-[var(--color-muted-foreground)]">
          Private by design. Your responses stay in this browser session and are
          never sent to a server.
        </p>
      </div>
    </header>
  );
}
