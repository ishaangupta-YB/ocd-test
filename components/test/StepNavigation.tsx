import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

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
      <Card className="border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-surface)_90%,transparent)] p-3 shadow-[var(--shadow-card)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            disabled={disableBack}
            fullWidth
            onClick={onBack}
            variant="ghost"
          >
            {backLabel}
          </Button>
          <Button disabled={disableNext} fullWidth onClick={onNext}>
            {nextLabel}
          </Button>
        </div>
      </Card>
    </div>
  );
}
