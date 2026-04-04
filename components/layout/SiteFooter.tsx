import Link from "next/link";
import { FileText, Shield } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[color-mix(in_oklab,var(--color-surface)_65%,transparent)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Y-BOCS-II Self-Report OCD Screener
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href="/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About this tool
            </Link>
            <Link
              href="/test"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Begin screening
            </Link>
            <a
              href="https://static1.squarespace.com/static/58cab82ff5e231f0df8d9cad/t/60945b3af4680c68037f8188/1620335418443/YBOCS-II-SR.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileText className="h-3.5 w-3.5" />
              Official PDF
            </a>
          </div>
        </div>
        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            This tool is not a substitute for professional diagnosis. Based on the
            Yale-Brown Obsessive-Compulsive Scale — Second Edition, Self-Report
            Version (Y-BOCS-II-SR). © Goodman, Rasmussen, Price, & Storch, 2006.
          </p>
        </div>
      </div>
    </footer>
  );
}
