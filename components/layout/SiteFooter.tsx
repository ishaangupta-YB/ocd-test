import Link from "next/link";
import { FileText } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[color-mix(in_oklab,var(--color-surface)_65%,transparent)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <p>
            This tool is not a substitute for professional diagnosis. © 2025.
            Based on the Y-BOCS-II-SR © Goodman, Rasmussen, Price, & Storch,
            2006.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="transition-colors hover:text-foreground"
            >
              About this tool
            </Link>
            <Link
              href="/test"
              className="transition-colors hover:text-foreground"
            >
              Begin screening
            </Link>
            <a
              href="https://pandasnetwork.org/wp-content/uploads/2018/11/y-bocs-w-checklist.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center transition-colors hover:text-foreground"
            >
              <FileText className="mr-1.5 h-4 w-4" />
              Official PDF
            </a>
          </div>
        </div>
        <p>
          Based on the Yale-Brown Obsessive-Compulsive Scale — Second Edition,
          Self-Report Version (Y-BOCS-II-SR). © Goodman, Rasmussen, Price, &
          Storch, 2006.
        </p>
      </div>
    </footer>
  );
}
