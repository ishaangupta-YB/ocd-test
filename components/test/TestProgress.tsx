"use client";

import { motion } from "framer-motion";

import { Card } from "@/components/ui/Card";

export function TestProgress({
  partLabel,
  progressCount,
  progressTotal,
}: {
  partLabel: string;
  progressCount: number;
  progressTotal: number;
}) {
  const safeTotal = progressTotal === 0 ? 1 : progressTotal;
  const percentage = Math.round((progressCount / safeTotal) * 100);

  return (
    <Card className="p-5 sm:p-6">
      <div aria-live="polite" className="space-y-4" role="status">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
              Progress
            </p>
            <p className="mt-1 text-base font-medium text-[var(--color-foreground)]">
              {partLabel}
            </p>
          </div>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            {percentage}% complete
          </p>
        </div>
        <div
          aria-label={`Progress ${percentage}%`}
          aria-valuemax={safeTotal}
          aria-valuemin={0}
          aria-valuenow={progressCount}
          className="h-3 overflow-hidden rounded-full bg-[var(--color-surface-strong)]"
          role="progressbar"
        >
          <motion.div
            animate={{ width: `${percentage}%` }}
            className="h-full rounded-full bg-[var(--color-accent)]"
            initial={false}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      </div>
    </Card>
  );
}
