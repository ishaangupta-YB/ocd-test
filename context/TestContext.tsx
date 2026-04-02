"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { ReactNode } from "react";

import { calculateResults } from "@/lib/scoring";
import {
  createInitialTestState,
  isTestReadyForResults,
  normalizeTestState,
} from "@/lib/test-state";
import type { TestState } from "@/lib/test-types";

const TEST_STORAGE_KEY = "ybocs-test-state";

type ChecklistPartKey = "partA" | "partC";
type SeverityPartKey = "partB" | "partD";

type TestAction =
  | { type: "hydrate"; payload: TestState }
  | {
      type: "setChecklistResponse";
      part: ChecklistPartKey;
      itemId: number;
      value: boolean;
    }
  | {
      type: "setSeverityResponse";
      part: SeverityPartKey;
      itemId: number;
      value: number;
    }
  | { type: "setCurrentStep"; step: number }
  | { type: "startTest" }
  | { type: "completeTest" }
  | { type: "resetTest" };

function testReducer(state: TestState, action: TestAction): TestState {
  switch (action.type) {
    case "hydrate":
      return action.payload;
    case "setChecklistResponse":
      return {
        ...state,
        [action.part]: {
          ...state[action.part],
          [action.itemId]: action.value,
        },
        completedAt: null,
      };
    case "setSeverityResponse":
      return {
        ...state,
        [action.part]: {
          ...state[action.part],
          [action.itemId]: action.value,
        },
        completedAt: null,
      };
    case "setCurrentStep":
      return {
        ...state,
        currentStep: Math.max(0, action.step),
      };
    case "startTest":
      return state.startedAt
        ? state
        : {
            ...state,
            startedAt: new Date().toISOString(),
          };
    case "completeTest":
      return {
        ...state,
        completedAt: new Date().toISOString(),
      };
    case "resetTest":
      return createInitialTestState();
    default:
      return state;
  }
}

interface TestContextValue {
  hydrated: boolean;
  state: TestState;
  results: ReturnType<typeof calculateResults>;
  canShowResults: boolean;
  startTest: () => void;
  completeTest: () => void;
  resetTest: () => void;
  setCurrentStep: (step: number) => void;
  setChecklistResponse: (
    part: ChecklistPartKey,
    itemId: number,
    value: boolean,
  ) => void;
  setSeverityResponse: (
    part: SeverityPartKey,
    itemId: number,
    value: number,
  ) => void;
}

const TestContext = createContext<TestContextValue | null>(null);

export function TestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(testReducer, undefined, createInitialTestState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedState = window.sessionStorage.getItem(TEST_STORAGE_KEY);
      dispatch({
        type: "hydrate",
        payload: normalizeTestState(
          storedState ? (JSON.parse(storedState) as Partial<TestState>) : null,
        ),
      });
    } catch {
      dispatch({
        type: "hydrate",
        payload: createInitialTestState(),
      });
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.sessionStorage.setItem(TEST_STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const value = useMemo<TestContextValue>(() => {
    const results = calculateResults(state);

    return {
      hydrated,
      state,
      results,
      canShowResults: isTestReadyForResults(state),
      startTest: () => dispatch({ type: "startTest" }),
      completeTest: () => dispatch({ type: "completeTest" }),
      resetTest: () => dispatch({ type: "resetTest" }),
      setCurrentStep: (step) => dispatch({ type: "setCurrentStep", step }),
      setChecklistResponse: (part, itemId, value) =>
        dispatch({
          type: "setChecklistResponse",
          part,
          itemId,
          value,
        }),
      setSeverityResponse: (part, itemId, value) =>
        dispatch({
          type: "setSeverityResponse",
          part,
          itemId,
          value,
        }),
    };
  }, [hydrated, state]);

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
}

export function useTestContext() {
  const context = useContext(TestContext);

  if (!context) {
    throw new Error("useTestContext must be used within a TestProvider.");
  }

  return context;
}
