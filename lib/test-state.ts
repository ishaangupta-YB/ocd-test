import { partAItems } from "@/data/partA";
import { partBQuestions } from "@/data/partB";
import { partCItems } from "@/data/partC";
import { partDQuestions } from "@/data/partD";
import type { ChecklistItem, SeverityQuestion, TestState } from "@/lib/test-types";

function createChecklistRecord(items: ChecklistItem[]) {
  return Object.fromEntries(items.map((item) => [item.id, null])) as Record<
    number,
    boolean | null
  >;
}

function createSeverityRecord(items: SeverityQuestion[]) {
  return Object.fromEntries(items.map((item) => [item.id, null])) as Record<
    number,
    number | null
  >;
}

export function createInitialTestState(): TestState {
  return {
    partA: createChecklistRecord(partAItems),
    partB: createSeverityRecord(partBQuestions),
    partC: createChecklistRecord(partCItems),
    partD: createSeverityRecord(partDQuestions),
    currentStep: 0,
    startedAt: null,
    completedAt: null,
  };
}

export function normalizeTestState(
  state: Partial<TestState> | null | undefined,
): TestState {
  const initialState = createInitialTestState();

  if (!state) {
    return initialState;
  }

  return {
    partA: { ...initialState.partA, ...state.partA },
    partB: { ...initialState.partB, ...state.partB },
    partC: { ...initialState.partC, ...state.partC },
    partD: { ...initialState.partD, ...state.partD },
    currentStep:
      typeof state.currentStep === "number" && Number.isFinite(state.currentStep)
        ? state.currentStep
        : 0,
    startedAt:
      typeof state.startedAt === "string" || state.startedAt === null
        ? state.startedAt ?? null
        : null,
    completedAt:
      typeof state.completedAt === "string" || state.completedAt === null
        ? state.completedAt ?? null
        : null,
  };
}

export function isChecklistRecordComplete(
  record: Record<number, boolean | null>,
): boolean {
  return Object.values(record).every((value) => value !== null);
}

export function isSeverityRecordComplete(
  record: Record<number, number | null>,
): boolean {
  return Object.values(record).every(
    (value) =>
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= 0 &&
      value <= 5,
  );
}

export function hasAnyChecklistYes(
  record: Record<number, boolean | null>,
): boolean {
  return Object.values(record).some((value) => value === true);
}

export function isTestReadyForResults(
  state: Pick<TestState, "partA" | "partB" | "partC" | "partD">,
): boolean {
  const partAComplete = isChecklistRecordComplete(state.partA);
  const partCComplete = isChecklistRecordComplete(state.partC);

  if (!partAComplete || !partCComplete) {
    return false;
  }

  const needsPartB = hasAnyChecklistYes(state.partA);
  const needsPartD = hasAnyChecklistYes(state.partC);

  if (needsPartB && !isSeverityRecordComplete(state.partB)) {
    return false;
  }

  if (needsPartD && !isSeverityRecordComplete(state.partD)) {
    return false;
  }

  return true;
}
