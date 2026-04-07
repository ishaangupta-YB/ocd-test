"use client";

import { animate } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Disclaimer } from "@/components/shared/Disclaimer";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTestContext } from "@/context/TestContext";
import {
  interpretationBySeverity,
  nextSteps,
  resourceLinks,
  scoringSourceLabel,
  severityBenchmarks,
} from "@/data/scoring";
import { disclaimerText } from "@/components/shared/Disclaimer";
import { ScoreGauge } from "@/components/results/ScoreGauge";
import { getSeverityBenchmark } from "@/lib/scoring";

export function ResultsClient() {
  const router = useRouter();
  const { canShowResults, hydrated, resetTest, results, state } = useTestContext();
  const [copied, setCopied] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!canShowResults) {
      return;
    }

    const controls = animate(0, results.totalScore, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (value) => setDisplayScore(Math.round(value)),
    });

    return () => controls.stop();
  }, [canShowResults, results.totalScore]);

  const summaryText = useMemo(() => {
    const severityLabel = getSeverityBenchmark(results.totalScore).label;

    return [
      "Y-BOCS-II Self-Report OCD Screener Results",
      `Total Score: ${results.totalScore} / 50`,
      `Severity: ${severityLabel}`,
      `Obsession Severity Subtotal: ${results.obsessionSubtotal} / 25`,
      `Compulsion Severity Subtotal: ${results.compulsionSubtotal} / 25`,
      `Obsession types endorsed: ${results.obsessionCount} / 29`,
      `Compulsion or avoidance types endorsed: ${results.compulsionCount} / 38`,
      "",
      `Interpretation: ${interpretationBySeverity[results.severityLevel]}`,
      "",
      `Disclaimer: ${disclaimerText}`,
    ].join("\n");
  }, [results]);

  if (!hydrated) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-10">
          <p className="text-lg text-foreground">
            Loading your results…
          </p>
        </Card>
      </div>
    );
  }

  if (!canShowResults) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-10">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Results unavailable
              </p>
              <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
                We couldn&apos;t find a completed screening session.
              </h1>
            </div>
            <p className="text-base leading-8 text-muted-foreground">
              Complete the screener first to view a score summary and
              interpretation. If you already started, you can return to the test
              and continue where you left off in this browser session.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/test" className={buttonVariants({ size: "lg" })}>
                Go to the Screening
              </Link>
              <Link
                href="/about"
                className={buttonVariants({
                  size: "lg",
                  variant: "secondary",
                })}
              >
                Learn More First
              </Link>
            </div>
          </div>
        </Card>
        <Disclaimer />
      </div>
    );
  }

  const severityBenchmark =
    severityBenchmarks.find(
      (benchmark) => benchmark.level === results.severityLevel,
    ) ?? getSeverityBenchmark(results.totalScore);
  const obsessionWidth = `${(results.obsessionSubtotal / 25) * 100}%`;
  const compulsionWidth = `${(results.compulsionSubtotal / 25) * 100}%`;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <Card className="overflow-hidden p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Your results
              </p>
              <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
                Y-BOCS-II Self-Report score summary
              </h1> 
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
                {displayScore}
              </div>
              <div
                className="rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  backgroundColor: severityBenchmark.colorToken,
                  color:
                    results.severityLevel === "sub-clinical" ||
                    results.severityLevel === "mild"
                      ? "var(--primary-foreground)"
                      : "#ffffff",
                }}
              >
                {severityBenchmark.label}
              </div>
            </div>
          </div>
          <div className="space-y-4 rounded-[1.5rem] bg-[color-mix(in_oklab,var(--color-surface-strong)_82%,transparent)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Recorded in session
            </p>
            <div className="space-y-3 text-sm text-foreground">
              <p>
                Started:{" "}
                {state.startedAt
                  ? new Date(state.startedAt).toLocaleString()
                  : "Not available"}
              </p>
              <p>
                Completed:{" "}
                {state.completedAt
                  ? new Date(state.completedAt).toLocaleString()
                  : "This session"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <ScoreGauge score={results.totalScore} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 sm:p-7">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Subscale breakdown
              </p>
              <h2 className="font-serif text-3xl text-foreground">
                Obsessions vs. compulsions
              </h2>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-base font-medium text-foreground">
                    Obsession Severity Subtotal
                  </p>
                  <p className="text-base text-muted-foreground">
                    {results.obsessionSubtotal} / 25
                  </p>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[var(--color-surface-strong)]">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: obsessionWidth }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-base font-medium text-foreground">
                    Compulsion Severity Subtotal
                  </p>
                  <p className="text-base text-muted-foreground">
                    {results.compulsionSubtotal} / 25
                  </p>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[var(--color-surface-strong)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-orange)]"
                    style={{ width: compulsionWidth }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-7">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Symptom count summary
              </p>
              <h2 className="font-serif text-3xl text-foreground">
                Endorsed symptom types
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.25rem] bg-[color-mix(in_oklab,var(--color-surface-strong)_82%,transparent)] p-4">
                <p className="text-sm text-muted-foreground">
                  Obsessions
                </p>
                <p className="mt-2 text-3xl font-semibold text-foreground">
                  {results.obsessionCount} / 29
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-[color-mix(in_oklab,var(--color-surface-strong)_82%,transparent)] p-4">
                <p className="text-sm text-muted-foreground">
                  Compulsions/Avoidance
                </p>
                <p className="mt-2 text-3xl font-semibold text-foreground">
                  {results.compulsionCount} / 38
                </p>
              </div>
            </div>
            <p className="text-base leading-7 text-muted-foreground">
              These counts describe how many symptom types you endorsed. They
              are not added to the severity score.
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6 sm:p-7">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Interpretation
          </p>
          <h2 className="font-serif text-3xl text-foreground">
            What this score may suggest
          </h2>
          <p className="text-base leading-8 text-foreground">
            {interpretationBySeverity[results.severityLevel]}
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            {scoringSourceLabel}
          </p>
        </div>
      </Card>

      <Card className="p-6 sm:p-7">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What you can do next
            </p>
            <h2 className="font-serif text-3xl text-foreground">
              Supportive next steps
            </h2>
          </div>
          <ul className="space-y-3 text-base leading-7 text-foreground">
            {nextSteps.map((step) => (
              <li key={step} className="rounded-[1.15rem] bg-[color-mix(in_oklab,var(--color-surface-strong)_82%,transparent)] p-4">
                {step}
              </li>
            ))}
          </ul>
          <div className="grid gap-3 sm:grid-cols-3">
            {resourceLinks.map((link) => (
              <a
                key={link.href}
                className="rounded-[1.15rem] border border-border bg-background p-4 text-base font-medium text-foreground transition-colors hover:bg-[var(--color-surface-strong)]"
                href={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 sm:p-7">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Share or download
              </p>
              <h2 className="font-serif text-3xl text-foreground">
                Screenshot or copy a clean summary
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => {
                  resetTest();
                  router.push("/test");
                }}
                variant="secondary"
              >
                Retake Test
              </Button>
              <Button
                onClick={async () => {
                  await navigator.clipboard.writeText(summaryText);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 2500);
                }}
              >
                Share / Download Results
              </Button>
            </div>
          </div>
          {copied ? (
            <p className="text-sm text-[var(--color-success)]">
              Results summary copied to your clipboard.
            </p>
          ) : null}
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-[1.25rem] bg-[color-mix(in_oklab,var(--color-surface-strong)_82%,transparent)] p-4 text-sm leading-7 text-foreground">
            {summaryText}
          </pre>
        </div>
      </Card>

      <Disclaimer />
    </div>
  );
}
