"use client";

import { motion } from "framer-motion";

import { severityBenchmarks } from "@/data/scoring";
import { Card } from "@/components/ui/card";

export function ScoreGauge({ score }: { score: number }) {
  const position = Math.min(100, Math.max(0, (score / 50) * 100));

  return (
    <Card className="p-5 sm:p-6">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Visual score gauge
            </p>
            <p className="mt-1 text-base text-foreground">
              Your score plotted across the full 0 to 50 range.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">0–50</p>
        </div>
        <div className="space-y-4">
          <div className="relative pt-6">
            <div className="grid grid-cols-4 overflow-hidden rounded-full">
              {severityBenchmarks.map((benchmark) => (
                <div
                  key={benchmark.level}
                  className="h-4"
                  style={{ backgroundColor: benchmark.colorToken }}
                />
              ))}
            </div>
            <motion.div
              animate={{ left: `${position}%` }}
              className="absolute top-0 h-8 w-8 -translate-x-1/2 rounded-full border-4 border-background bg-foreground shadow-[var(--shadow-soft)]"
              initial={false}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>
          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-4">
            {severityBenchmarks.map((benchmark) => (
              <div key={benchmark.level} className="space-y-1">
                <p className="font-semibold text-foreground">
                  {benchmark.label}
                </p>
                <p>
                  {benchmark.min}–{benchmark.max}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
