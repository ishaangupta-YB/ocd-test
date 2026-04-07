export interface ChecklistItem {
  id: number;
  prompt: string;
  example?: string;
}

export interface SeverityOption {
  value: number;
  label: string;
}

export interface SeverityQuestion {
  id: number;
  name: string;
  prompt: string;
  options: SeverityOption[];
}

export type SeverityLevel = "sub-clinical" | "mild" | "moderate" | "severe";

export interface TestState {
  partA: Record<number, boolean | null>;
  partB: Record<number, number | null>;
  partC: Record<number, boolean | null>;
  partD: Record<number, number | null>;
  currentStep: number;
  startedAt: string | null;
  completedAt: string | null;
}

export interface TestResults {
  obsessionCount: number;
  compulsionCount: number;
  obsessionSubtotal: number;
  compulsionSubtotal: number;
  totalScore: number;
  severityLevel: SeverityLevel;
}

export interface ItemValidationStatus {
  id: number;
  name: string;
  valid: boolean;
  value: number | null;
  error?: string;
}

export interface ScoringResult {
  valid: boolean;
  partBSubtotal: number | null;
  partDSubtotal: number | null;
  totalScore: number | null;
  maxScore: 50;
  errors: string[];
  itemValidation: {
    partB: ItemValidationStatus[];
    partD: ItemValidationStatus[];
  };
}
