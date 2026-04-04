"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Disclaimer } from "@/components/shared/Disclaimer";
import { PrivacyNotice } from "@/components/shared/PrivacyNotice";
import { ChecklistGroup } from "@/components/test/ChecklistGroup";
import { SeverityQuestionCard } from "@/components/test/SeverityQuestionCard";
import { StepNavigation } from "@/components/test/StepNavigation";
import { TestProgress } from "@/components/test/TestProgress";
import { Card } from "@/components/ui/card";
import { useTestContext } from "@/context/TestContext";
import { generalInstructions, partAInstructions, partAItems } from "@/data/partA";
import { partBInstructions, partBQuestions } from "@/data/partB";
import { partCInstructions, partCItems } from "@/data/partC";
import { partDInstructions, partDQuestions } from "@/data/partD";
import {
  hasAnyChecklistYes,
  isChecklistRecordComplete,
} from "@/lib/test-state";
import type {
  ChecklistItem,
  SeverityQuestion,
  TestState,
} from "@/lib/test-types";

const CHECKLIST_GROUP_SIZE = 6;

type WizardStep =
  | {
      kind: "intro";
      key: string;
      partLabel: string;
      progressCount: number;
      progressTotal: number;
    }
  | {
      kind: "checklist";
      key: string;
      heading: string;
      helperText: string;
      items: ChecklistItem[];
      part: "partA" | "partC";
      partLabel: string;
      progressCount: number;
      progressTotal: number;
      rangeLabel: string;
    }
  | {
      kind: "transition";
      key: string;
      body: string[];
      heading: string;
      nextLabel: string;
      partLabel: string;
      progressCount: number;
      progressTotal: number;
    }
  | {
      kind: "skip";
      key: string;
      heading: string;
      message: string;
      nextLabel: string;
      partLabel: string;
      progressCount: number;
      progressTotal: number;
    }
  | {
      kind: "severity";
      key: string;
      heading: string;
      part: "partB" | "partD";
      partLabel: string;
      progressCount: number;
      progressTotal: number;
      question: SeverityQuestion;
      questionNumber: number;
      totalQuestions: number;
    };

function groupItems<T>(items: T[], size: number) {
  const groups: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    groups.push(items.slice(index, index + size));
  }

  return groups;
}

function buildWizardSteps(state: TestState): WizardStep[] {
  const groupedPartA = groupItems(partAItems, CHECKLIST_GROUP_SIZE);
  const groupedPartC = groupItems(partCItems, CHECKLIST_GROUP_SIZE);
  const shouldIncludePartB =
    !isChecklistRecordComplete(state.partA) || hasAnyChecklistYes(state.partA);
  const shouldIncludePartD =
    !isChecklistRecordComplete(state.partC) || hasAnyChecklistYes(state.partC);

  const totalSubstantiveSteps =
    groupedPartA.length +
    groupedPartC.length +
    (shouldIncludePartB ? partBQuestions.length : 0) +
    (shouldIncludePartD ? partDQuestions.length : 0);

  const steps: WizardStep[] = [
    {
      kind: "intro",
      key: "intro",
      partLabel: "Getting started",
      progressCount: 0,
      progressTotal: totalSubstantiveSteps,
    },
  ];

  let progressIndex = 0;

  groupedPartA.forEach((items, index) => {
    const start = items[0]?.id ?? 1;
    const end = items[items.length - 1]?.id ?? start;
    progressIndex += 1;

    steps.push({
      kind: "checklist",
      key: `partA-${index}`,
      heading: "Part A: Obsessions Checklist",
      helperText:
        "Please indicate whether you experienced each thought, image, sensation, or urge during the last 30 days.",
      items,
      part: "partA",
      partLabel: `Part A: Obsessions — Questions ${start}–${end} of ${partAItems.length}`,
      progressCount: progressIndex,
      progressTotal: totalSubstantiveSteps,
      rangeLabel: `Questions ${start}–${end} of ${partAItems.length}`,
    });
  });

  if (isChecklistRecordComplete(state.partA) && !hasAnyChecklistYes(state.partA)) {
    steps.push({
      kind: "skip",
      key: "partB-skip",
      heading: "Part B: Obsession Severity",
      message:
        "Based on your responses, you did not endorse any obsession symptoms. Moving to Part C.",
      nextLabel: "Continue to Part C",
      partLabel: "Part B: Obsession Severity",
      progressCount: progressIndex,
      progressTotal: totalSubstantiveSteps,
    });
  } else {
    steps.push({
      kind: "transition",
      key: "partB-intro",
      heading: "Part B: Obsession Severity",
      body: [partBInstructions],
      nextLabel: "Start Part B",
      partLabel: "Part B: Obsession Severity",
      progressCount: progressIndex,
      progressTotal: totalSubstantiveSteps,
    });

    partBQuestions.forEach((question, index) => {
      progressIndex += 1;

      steps.push({
        kind: "severity",
        key: `partB-${question.id}`,
        heading: "Part B: Obsession Severity",
        part: "partB",
        partLabel: `Part B: Obsession Severity — Question ${index + 1} of ${partBQuestions.length}`,
        progressCount: progressIndex,
        progressTotal: totalSubstantiveSteps,
        question,
        questionNumber: index + 1,
        totalQuestions: partBQuestions.length,
      });
    });
  }

  steps.push({
    kind: "transition",
    key: "partC-intro",
    heading: "Part C: Compulsions & Avoidance Checklist",
    body: partCInstructions,
    nextLabel: "Start Part C",
    partLabel: "Part C: Compulsions & Avoidance",
    progressCount: progressIndex,
    progressTotal: totalSubstantiveSteps,
  });

  groupedPartC.forEach((items, index) => {
    const start = items[0]?.id ?? 30;
    const end = items[items.length - 1]?.id ?? start;
    progressIndex += 1;

    steps.push({
      kind: "checklist",
      key: `partC-${index}`,
      heading: "Part C: Compulsions & Avoidance Checklist",
      helperText:
        "Please indicate whether you used any of the following behaviors or strategies during the last 30 days.",
      items,
      part: "partC",
      partLabel: `Part C: Compulsions & Avoidance — Questions ${start}–${end} of ${partCItems.length}`,
      progressCount: progressIndex,
      progressTotal: totalSubstantiveSteps,
      rangeLabel: `Questions ${start}–${end} of ${partCItems.length}`,
    });
  });

  if (isChecklistRecordComplete(state.partC) && !hasAnyChecklistYes(state.partC)) {
    steps.push({
      kind: "skip",
      key: "partD-skip",
      heading: "Part D: Compulsion/Avoidance Severity",
      message:
        "Based on your responses, you did not endorse any compulsion or avoidance symptoms. Proceeding to results.",
      nextLabel: "See Results",
      partLabel: "Part D: Compulsion/Avoidance Severity",
      progressCount: progressIndex,
      progressTotal: totalSubstantiveSteps,
    });
  } else {
    steps.push({
      kind: "transition",
      key: "partD-intro",
      heading: "Part D: Compulsion/Avoidance Severity",
      body: [partDInstructions],
      nextLabel: "Start Part D",
      partLabel: "Part D: Compulsion/Avoidance Severity",
      progressCount: progressIndex,
      progressTotal: totalSubstantiveSteps,
    });

    partDQuestions.forEach((question, index) => {
      progressIndex += 1;

      steps.push({
        kind: "severity",
        key: `partD-${question.id}`,
        heading: "Part D: Compulsion/Avoidance Severity",
        part: "partD",
        partLabel: `Part D: Compulsion/Avoidance Severity — Question ${index + 1} of ${partDQuestions.length}`,
        progressCount: progressIndex,
        progressTotal: totalSubstantiveSteps,
        question,
        questionNumber: index + 1,
        totalQuestions: partDQuestions.length,
      });
    });
  }

  return steps;
}

function scrollToTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function TestWizard() {
  const router = useRouter();
  const {
    completeTest,
    hydrated,
    setChecklistResponse,
    setCurrentStep,
    setSeverityResponse,
    startTest,
    state,
  } = useTestContext();
  const [stepError, setStepError] = useState<string | null>(null);

  const steps = useMemo(() => buildWizardSteps(state), [state]);
  const currentStep = steps[Math.min(state.currentStep, steps.length - 1)];

  useEffect(() => {
    if (hydrated) {
      startTest();
    }
  }, [hydrated, startTest]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const lastStepIndex = Math.max(0, steps.length - 1);
    if (state.currentStep > lastStepIndex) {
      setCurrentStep(lastStepIndex);
    }
  }, [hydrated, setCurrentStep, state.currentStep, steps.length]);

  if (!hydrated || !currentStep) {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Preparing your screening
            </p>
            <p className="text-lg text-foreground">
              Loading your current session…
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const goBack = () => {
    setStepError(null);
    setCurrentStep(state.currentStep - 1);
    scrollToTop();
  };

  const goForward = () => {
    const isLastStep = state.currentStep >= steps.length - 1;

    if (isLastStep) {
      setStepError(null);
      completeTest();
      router.push("/results");
      scrollToTop();
      return;
    }

    setStepError(null);
    setCurrentStep(state.currentStep + 1);
    scrollToTop();
  };

  const handleNext = () => {
    if (currentStep.kind === "checklist") {
      const unansweredItem = currentStep.items.find(
        (item) => state[currentStep.part][item.id] === null,
      );

      if (unansweredItem) {
        setStepError("Please answer every item on this screen before continuing.");
        return;
      }
    }

    if (currentStep.kind === "severity") {
      if (state[currentStep.part][currentStep.question.id] === null) {
        setStepError("Please choose one response before continuing.");
        return;
      }
    }

    goForward();
  };

  const nextLabel = (() => {
    if (currentStep.kind === "intro") return "Begin Part A";
    if (currentStep.kind === "transition" || currentStep.kind === "skip") return currentStep.nextLabel;
    if (currentStep.kind === "severity" && state.currentStep >= steps.length - 1) return "See Results";
    return "Next";
  })();

  const isFirstStep = currentStep.kind === "intro";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <TestProgress
        partLabel={currentStep.partLabel}
        progressCount={currentStep.progressCount}
        progressTotal={currentStep.progressTotal}
      />

      <AnimatePresence initial={false} mode="wait">
        <motion.section
          key={currentStep.key}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
          exit={{ opacity: 0, y: -12 }}
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {currentStep.kind === "intro" ? (
            <>
              <Card className="p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      General Instructions
                    </p>
                    <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
                      Before you begin
                    </h1>
                  </div>
                  <p className="text-lg leading-8 text-foreground">
                    {generalInstructions}
                  </p>
                  <div className="space-y-3 text-base leading-7 text-muted-foreground">
                    {partAInstructions.map((instruction) => (
                      <p key={instruction}>{instruction}</p>
                    ))}
                  </div>
                </div>
              </Card>
              <PrivacyNotice />
              <Disclaimer compact />
            </>
          ) : null}

          {currentStep.kind === "transition" ? (
            <Card className="p-6 sm:p-8">
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Section transition
                  </p>
                  <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
                    {currentStep.heading}
                  </h1>
                </div>
                <div className="space-y-4 text-base leading-8 text-foreground">
                  {currentStep.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Card>
          ) : null}

          {currentStep.kind === "skip" ? (
            <Card className="p-6 sm:p-8">
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Section update
                  </p>
                  <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
                    {currentStep.heading}
                  </h1>
                </div>
                <p className="text-lg leading-8 text-foreground">
                  {currentStep.message}
                </p>
              </div>
            </Card>
          ) : null}

          {currentStep.kind === "checklist" ? (
            <>
              <Card className="p-6 sm:p-8">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {currentStep.rangeLabel}
                  </p>
                  <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
                    {currentStep.heading}
                  </h1>
                  <p className="text-base leading-8 text-muted-foreground">
                    {currentStep.helperText}
                  </p>
                </div>
              </Card>
              <ChecklistGroup
                items={currentStep.items}
                onSelect={(itemId, value) => {
                  setStepError(null);
                  setChecklistResponse(currentStep.part, itemId, value);
                }}
                responses={state[currentStep.part]}
              />
            </>
          ) : null}

          {currentStep.kind === "severity" ? (
            <>
              <Card className="p-6 sm:p-8">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Question {currentStep.questionNumber} of {currentStep.totalQuestions}
                  </p>
                  <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
                    {currentStep.heading}
                  </h1>
                </div>
              </Card>
              <SeverityQuestionCard
                onSelect={(value) => {
                  setStepError(null);
                  setSeverityResponse(currentStep.part, currentStep.question.id, value);
                }}
                question={currentStep.question}
                selectedValue={state[currentStep.part][currentStep.question.id]}
              />
            </>
          ) : null}
        </motion.section>
      </AnimatePresence>

      {stepError ? (
        <Card className="border-[var(--color-warning-border)] bg-[var(--color-warning-surface)] p-4">
          <p className="text-sm text-foreground">
            {stepError}
          </p>
        </Card>
      ) : null}

      <StepNavigation
        nextLabel={nextLabel}
        disableBack={isFirstStep}
        onBack={isFirstStep ? () => {} : goBack}
        onNext={handleNext}
      />
    </div>
  );
}
