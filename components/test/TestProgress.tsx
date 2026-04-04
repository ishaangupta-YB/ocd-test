"use client";

import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";

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
    <Card className="p-5 sm:p-6 transition-shadow duration-300 hover:shadow-md border-primary/10">
      <div aria-live="polite" className="space-y-4" role="status">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Progress
            </p>
            <motion.p 
              key={partLabel}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-base font-medium text-foreground"
            >
              {partLabel}
            </motion.p>
          </div>
          <motion.p 
            key={percentage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm font-medium text-primary"
          >
            {percentage}% complete
          </motion.p>
        </div>
        <div
          aria-label={`Progress ${percentage}%`}
          aria-valuemax={safeTotal}
          aria-valuemin={0}
          aria-valuenow={progressCount}
          className="h-3 overflow-hidden rounded-full bg-[var(--color-surface-strong)] shadow-inner"
          role="progressbar"
        >
          <motion.div
            animate={{ width: `${percentage}%` }}
            className="h-full rounded-full bg-primary shadow-[0_0_10px_rgba(var(--color-primary),0.6)]"
            initial={false}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </Card>
  );
}
