"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/test", label: "Screening" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex flex-wrap items-center gap-2">
      {navigationItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === item.href
            : pathname?.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "bg-[var(--color-surface-strong)] text-foreground"
                : "text-muted-foreground hover:bg-[var(--color-surface-strong)] hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
