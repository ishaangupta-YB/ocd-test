import { describe, expect, it } from "vitest";

import { partBQuestions } from "@/data/partB";
import { partDQuestions } from "@/data/partD";
import { calculateResults, validateAndScore } from "@/lib/scoring";

// ── Helpers ───────────────────────────────────────────────────────────────

const PART_B_IDS = partBQuestions.map((q) => q.id); // [1,2,3,4,5]
const PART_D_IDS = partDQuestions.map((q) => q.id); // [1,2,3,4,5]

function fill(
  ids: number[],
  value: number | null,
): Record<number, number | null> {
  return Object.fromEntries(ids.map((id) => [id, value]));
}

function fillChecklist(
  ids: number[],
  value: boolean,
): Record<number, boolean | null> {
  return Object.fromEntries(ids.map((id) => [id, value]));
}

const PART_A_IDS = Array.from({ length: 29 }, (_, i) => i + 1);
const PART_C_IDS = Array.from({ length: 38 }, (_, i) => i + 30);

// ── validateAndScore ──────────────────────────────────────────────────────

describe("validateAndScore", () => {
  it("returns total 0 when all Part B and Part D answers are 0", () => {
    const result = validateAndScore(fill(PART_B_IDS, 0), fill(PART_D_IDS, 0));

    expect(result.valid).toBe(true);
    expect(result.partBSubtotal).toBe(0);
    expect(result.partDSubtotal).toBe(0);
    expect(result.totalScore).toBe(0);
    expect(result.maxScore).toBe(50);
    expect(result.errors).toHaveLength(0);
  });

  it("returns total 50 when all Part B and Part D answers are 5", () => {
    const result = validateAndScore(fill(PART_B_IDS, 5), fill(PART_D_IDS, 5));

    expect(result.valid).toBe(true);
    expect(result.partBSubtotal).toBe(25);
    expect(result.partDSubtotal).toBe(25);
    expect(result.totalScore).toBe(50);
    expect(result.maxScore).toBe(50);
    expect(result.errors).toHaveLength(0);
  });

  it("correctly sums mixed valid responses", () => {
    const partB: Record<number, number | null> = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
    };
    const partD: Record<number, number | null> = {
      1: 0,
      2: 1,
      3: 2,
      4: 3,
      5: 4,
    };

    const result = validateAndScore(partB, partD);

    expect(result.valid).toBe(true);
    expect(result.partBSubtotal).toBe(15);
    expect(result.partDSubtotal).toBe(10);
    expect(result.totalScore).toBe(25);
  });

  it("reports validation error for a missing (null) response", () => {
    const partB: Record<number, number | null> = {
      1: 3,
      2: null,
      3: 2,
      4: 1,
      5: 4,
    };

    const result = validateAndScore(partB, fill(PART_D_IDS, 0));

    expect(result.valid).toBe(false);
    expect(result.partBSubtotal).toBeNull();
    expect(result.totalScore).toBeNull();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain("Missing response");
    expect(result.errors[0]).toContain("Part B item 2");

    // Part D validates independently — its subtotal should still be computed
    expect(result.partDSubtotal).toBe(0);
  });

  it("reports validation error for out-of-range response (6)", () => {
    const partB: Record<number, number | null> = {
      1: 6 as number,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    const result = validateAndScore(partB, fill(PART_D_IDS, 0));

    expect(result.valid).toBe(false);
    expect(result.partBSubtotal).toBeNull();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain("out of range");
  });

  it("reports validation error for out-of-range response (-1)", () => {
    const partD: Record<number, number | null> = {
      1: -1 as number,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    const result = validateAndScore(fill(PART_B_IDS, 0), partD);

    expect(result.valid).toBe(false);
    expect(result.partDSubtotal).toBeNull();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain("out of range");
  });

  it("reports validation error for non-integer response (2.5)", () => {
    const partB: Record<number, number | null> = {
      1: 2.5 as number,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    const result = validateAndScore(partB, fill(PART_D_IDS, 0));

    expect(result.valid).toBe(false);
    expect(result.partBSubtotal).toBeNull();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain("integer");
  });

  it("reports validation error for non-number type (string)", () => {
    const partB = { 1: "three" as unknown, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<
      number,
      number | null
    >;

    const result = validateAndScore(partB, fill(PART_D_IDS, 0));

    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain("Expected a number");
  });

  it("collects multiple errors across both parts", () => {
    const partB: Record<number, number | null> = {
      1: null,
      2: null,
      3: 0,
      4: 0,
      5: 0,
    };
    const partD: Record<number, number | null> = {
      1: 0,
      2: 0,
      3: null,
      4: 0,
      5: 0,
    };

    const result = validateAndScore(partB, partD);

    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(3);
    expect(result.partBSubtotal).toBeNull();
    expect(result.partDSubtotal).toBeNull();
    expect(result.totalScore).toBeNull();
  });

  it("provides item-level validation status for each question", () => {
    const partB: Record<number, number | null> = {
      1: 3,
      2: null,
      3: 2,
      4: 1,
      5: 4,
    };

    const result = validateAndScore(partB, fill(PART_D_IDS, 1));

    expect(result.itemValidation.partB).toHaveLength(5);
    expect(result.itemValidation.partD).toHaveLength(5);

    expect(result.itemValidation.partB[0]).toMatchObject({
      id: 1,
      valid: true,
      value: 3,
    });
    expect(result.itemValidation.partB[1]).toMatchObject({
      id: 2,
      valid: false,
      value: null,
      error: "Missing response",
    });

    for (const item of result.itemValidation.partD) {
      expect(item.valid).toBe(true);
      expect(item.value).toBe(1);
    }
  });

  it("item names match the Part B question definitions", () => {
    const result = validateAndScore(fill(PART_B_IDS, 0), fill(PART_D_IDS, 0));

    for (let i = 0; i < partBQuestions.length; i++) {
      expect(result.itemValidation.partB[i].name).toBe(partBQuestions[i].name);
    }
  });

  it("item names match the Part D question definitions", () => {
    const result = validateAndScore(fill(PART_B_IDS, 0), fill(PART_D_IDS, 0));

    for (let i = 0; i < partDQuestions.length; i++) {
      expect(result.itemValidation.partD[i].name).toBe(partDQuestions[i].name);
    }
  });

  it("maxScore is always 50 regardless of input", () => {
    const valid = validateAndScore(fill(PART_B_IDS, 3), fill(PART_D_IDS, 2));
    const invalid = validateAndScore(
      { 1: null, 2: null, 3: null, 4: null, 5: null },
      fill(PART_D_IDS, 0),
    );

    expect(valid.maxScore).toBe(50);
    expect(invalid.maxScore).toBe(50);
  });
});

// ── calculateResults — Part A/C isolation ─────────────────────────────────

describe("calculateResults — Part A/C never affect the total score", () => {
  const partB: Record<number, number | null> = {
    1: 3,
    2: 3,
    3: 3,
    4: 3,
    5: 3,
  };
  const partD: Record<number, number | null> = {
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 2,
  };

  it("yields the same total regardless of Part A endorsements", () => {
    const allYes = calculateResults({
      partA: fillChecklist(PART_A_IDS, true),
      partB,
      partC: fillChecklist(PART_C_IDS, true),
      partD,
    });
    const allNo = calculateResults({
      partA: fillChecklist(PART_A_IDS, false),
      partB,
      partC: fillChecklist(PART_C_IDS, false),
      partD,
    });

    expect(allYes.totalScore).toBe(allNo.totalScore);
    expect(allYes.totalScore).toBe(25); // 15 + 10
    expect(allYes.obsessionSubtotal).toBe(15);
    expect(allYes.compulsionSubtotal).toBe(10);
  });

  it("reports correct counts from Part A/C without affecting score", () => {
    const results = calculateResults({
      partA: fillChecklist(PART_A_IDS, true),
      partB: fill(PART_B_IDS, 0),
      partC: fillChecklist(PART_C_IDS, false),
      partD: fill(PART_D_IDS, 0),
    });

    expect(results.obsessionCount).toBe(29);
    expect(results.compulsionCount).toBe(0);
    expect(results.totalScore).toBe(0);
  });

  it("assigns correct severity level for a total of 0", () => {
    const results = calculateResults({
      partA: fillChecklist(PART_A_IDS, false),
      partB: fill(PART_B_IDS, 0),
      partC: fillChecklist(PART_C_IDS, false),
      partD: fill(PART_D_IDS, 0),
    });

    expect(results.totalScore).toBe(0);
    expect(results.severityLevel).toBe("sub-clinical");
  });

  it("assigns correct severity level for a total of 50", () => {
    const results = calculateResults({
      partA: fillChecklist(PART_A_IDS, true),
      partB: fill(PART_B_IDS, 5),
      partC: fillChecklist(PART_C_IDS, true),
      partD: fill(PART_D_IDS, 5),
    });

    expect(results.totalScore).toBe(50);
    expect(results.severityLevel).toBe("severe");
  });
});
