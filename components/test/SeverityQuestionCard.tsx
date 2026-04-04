import type { SeverityQuestion } from "@/lib/test-types";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

export function SeverityQuestionCard({
  onSelect,
  question,
  selectedValue,
}: {
  onSelect: (value: number) => void;
  question: SeverityQuestion;
  selectedValue: number | null;
}) {
  return (
    <Card className="p-5 sm:p-6">
      <fieldset className="space-y-5">
        <legend className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {question.name}
          </p>
          <h2 className="text-2xl font-medium leading-9 text-foreground sm:text-3xl">
            {question.prompt}
          </h2>
        </legend>
        <div className="grid gap-3">
          {question.options.map((option) => {
            const isSelected = selectedValue === option.value;

            return (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer gap-4 rounded-[1.15rem] border p-4 transition-all duration-200",
                  isSelected
                    ? "border-transparent bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "border-border bg-background text-foreground hover:bg-[var(--color-surface-strong)]",
                )}
              >
                <input
                  checked={isSelected}
                  className="sr-only"
                  name={`severity-${question.id}`}
                  onChange={() => onSelect(option.value)}
                  type="radio"
                  value={option.value}
                />
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-semibold",
                    isSelected
                      ? "bg-[color-mix(in_oklab,var(--color-primary-foreground)_16%,transparent)]"
                      : "bg-[var(--color-surface-strong)]",
                  )}
                >
                  {option.value}
                </div>
                <p className="text-base leading-7">{option.label}</p>
              </label>
            );
          })}
        </div>
      </fieldset>
    </Card>
  );
}
