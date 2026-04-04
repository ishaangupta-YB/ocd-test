import { ArrowLeft, ArrowRight } from "lucide-react";
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
        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            className="w-full gap-2"
            disabled={disableBack}
            onClick={onBack}
            variant="ghost"
            size="lg"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Button>
          <Button className="w-full gap-2" disabled={disableNext} onClick={onNext} size="lg">
            {nextLabel}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
