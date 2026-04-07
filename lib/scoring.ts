import { partBQuestions } from "@/data/partB";
import { partDQuestions } from "@/data/partD";
import { severityBenchmarks } from "@/data/scoring";
import type {
  ItemValidationStatus,
  ScoringResult,
  SeverityLevel,
  TestResults,
  TestState,
} from "@/lib/test-types";

// ---------------------------------------------------------------------------
// Checklist helpers (Part A / Part C)
// ---------------------------------------------------------------------------

export function countYesResponses(
  responses: Record<number, boolean | null>,
): number {
  return Object.values(responses).filter((value) => value === true).length;
}

export function hasAnyYesResponse(
  responses: Record<number, boolean | null>,
): boolean {
  return Object.values(responses).some((value) => value === true);
}

// ---------------------------------------------------------------------------
// Severity-benchmark look-ups
// ---------------------------------------------------------------------------

export function getSeverityLevel(totalScore: number): SeverityLevel {
  return (
    severityBenchmarks.find(
      (b) => totalScore >= b.min && totalScore <= b.max,
    )?.level ?? "sub-clinical"
  );
}

export function getSeverityBenchmark(totalScore: number) {
  return (
    severityBenchmarks.find(
      (b) => totalScore >= b.min && totalScore <= b.max,
    ) ?? severityBenchmarks[0]
  );
}

// ---------------------------------------------------------------------------
// Validated Y-BOCS-II Self-Report scoring
//
// Only Part B (obsession severity) and Part D (compulsion severity) are
// scored.  Each part has 5 items rated 0–5, giving subtotals of 0–25 and
// a combined total of 0–50.
//
// Part A and Part C are symptom checklists and are NEVER included in the
// total score.
// ---------------------------------------------------------------------------

function isValidSeverityValue(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    value <= 5
  );
}

function describeSeverityError(value: unknown): string {
  if (value === null || value === undefined) return "Missing response";
  if (typeof value !== "number")
    return `Expected a number, got ${typeof value}`;
  if (!Number.isInteger(value)) return `Expected an integer, got ${value}`;
  if (value < 0 || value > 5)
    return `Value ${value} is out of range (must be 0–5)`;
  return "Unknown validation error";
}

function validateSeverityPart(
  responses: Record<number, number | null>,
  questions: ReadonlyArray<{ id: number; name: string }>,
  partLabel: string,
): {
  items: ItemValidationStatus[];
  subtotal: number | null;
  errors: string[];
} {
  const items: ItemValidationStatus[] = [];
  const errors: string[] = [];
  let subtotal = 0;
  let allValid = true;

  for (const question of questions) {
    const raw: unknown = responses[question.id];

    if (isValidSeverityValue(raw)) {
      items.push({
        id: question.id,
        name: question.name,
        valid: true,
        value: raw,
      });
      subtotal += raw;
    } else {
      allValid = false;
      const msg = describeSeverityError(raw);
      items.push({
        id: question.id,
        name: question.name,
        valid: false,
        value: null,
        error: msg,
      });
      errors.push(
        `${partLabel} item ${question.id} ("${question.name}"): ${msg}`,
      );
    }
  }

  return { items, subtotal: allValid ? subtotal : null, errors };
}

/**
 * Strict, validated scoring for the Y-BOCS-II Self-Report.
 *
 * Accepts only Part B and Part D severity responses.  Every scored field
 * must be an integer 0–5.  If any field is missing or invalid the result
 * is marked invalid with a list of per-item errors.
 *
 * Part A and Part C are not accepted and cannot influence the score.
 */
export function validateAndScore(
  partBResponses: Record<number, number | null>,
  partDResponses: Record<number, number | null>,
): ScoringResult {
  const partB = validateSeverityPart(
    partBResponses,
    partBQuestions,
    "Part B",
  );
  const partD = validateSeverityPart(
    partDResponses,
    partDQuestions,
    "Part D",
  );

  const errors = [...partB.errors, ...partD.errors];
  const valid = errors.length === 0;

  return {
    valid,
    partBSubtotal: partB.subtotal,
    partDSubtotal: partD.subtotal,
    totalScore:
      valid ? (partB.subtotal as number) + (partD.subtotal as number) : null,
    maxScore: 50,
    errors,
    itemValidation: {
      partB: partB.items,
      partD: partD.items,
    },
  };
}

// ---------------------------------------------------------------------------
// UI-facing result calculation
//
// Wraps validateAndScore for the application layer.  When the wizard skips
// Part B or Part D (no symptoms endorsed in Part A / Part C), severity
// responses remain null.  In that case the subtotal falls back to 0.
// ---------------------------------------------------------------------------

export function calculateResults(
  state: Pick<TestState, "partA" | "partB" | "partC" | "partD">,
): TestResults {
  const obsessionCount = countYesResponses(state.partA);
  const compulsionCount = countYesResponses(state.partC);

  const scoring = validateAndScore(state.partB, state.partD);

  const obsessionSubtotal = scoring.partBSubtotal ?? 0;
  const compulsionSubtotal = scoring.partDSubtotal ?? 0;
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
