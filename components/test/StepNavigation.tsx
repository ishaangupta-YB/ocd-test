import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function StepNavigation({
  backLabel = "Back",
  disableBack = false,
  disableNext = false,
  nextLabel = "Next",
  onBack,
  onNext,
}: {
  backLabel?: string;
  disableBack?: boolean;
  disableNext?: boolean;
  nextLabel?: string;
  onBack?: () => void;
  onNext: () => void;
}) {
  return (
    <div className="sticky bottom-3 z-20 mt-8">
      <Card className="border-border bg-[color-mix(in_oklab,var(--color-surface)_90%,transparent)] p-3 shadow-[var(--shadow-card)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            className="w-full"
            disabled={disableBack}
            onClick={onBack}
            variant="ghost"
          >
            {backLabel}
          </Button>
          <Button className="w-full" disabled={disableNext} onClick={onNext}>
            {nextLabel}
          </Button>
        </div>
      </Card>
    </div>
  );
}
