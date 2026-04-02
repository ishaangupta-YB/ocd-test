import { severityBenchmarks } from "@/data/scoring";
import type { SeverityLevel, TestResults, TestState } from "@/lib/test-types";

export function countYesResponses(
  responses: Record<number, boolean | null>,
): number {
  return Object.values(responses).filter((value) => value === true).length;
}

export function sumSeverityResponses(
  responses: Record<number, number | null>,
): number {
  return Object.values(responses).reduce<number>(
    (sum, value) => sum + (value ?? 0),
    0,
  );
}

export function hasAnyYesResponse(
  responses: Record<number, boolean | null>,
): boolean {
  return Object.values(responses).some((value) => value === true);
}

export function getSeverityLevel(totalScore: number): SeverityLevel {
  return (
    severityBenchmarks.find(
      (benchmark) => totalScore >= benchmark.min && totalScore <= benchmark.max,
    )?.level ?? "sub-clinical"
  );
}

export function getSeverityBenchmark(totalScore: number) {
  return (
    severityBenchmarks.find(
      (benchmark) => totalScore >= benchmark.min && totalScore <= benchmark.max,
    ) ?? severityBenchmarks[0]
  );
}

export function calculateResults(
  state: Pick<TestState, "partA" | "partB" | "partC" | "partD">,
): TestResults {
  const obsessionCount = countYesResponses(state.partA);
  const compulsionCount = countYesResponses(state.partC);
  const obsessionSubtotal =
    obsessionCount > 0 ? sumSeverityResponses(state.partB) : 0;
  const compulsionSubtotal =
    compulsionCount > 0 ? sumSeverityResponses(state.partD) : 0;
  const totalScore = obsessionSubtotal + compulsionSubtotal;

  return {
    obsessionCount,
    compulsionCount,
    obsessionSubtotal,
    compulsionSubtotal,
    totalScore,
    severityLevel: getSeverityLevel(totalScore),
  };
}
