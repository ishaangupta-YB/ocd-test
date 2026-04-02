import type { ChecklistItem } from "@/lib/test-types";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/Card";

export function ChecklistGroup({
  items,
  onSelect,
  responses,
}: {
  items: ChecklistItem[];
  onSelect: (itemId: number, value: boolean) => void;
  responses: Record<number, boolean | null>;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const selectedValue = responses[item.id];

        return (
          <Card key={item.id} className="p-5 sm:p-6">
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                  Item {String(item.id).padStart(2, "0")}
                </p>
                <h3 className="text-xl font-medium leading-8 text-[var(--color-foreground)]">
                  {item.prompt}
                </h3>
                {item.example ? (
                  <p className="text-base leading-7 text-[var(--color-muted-foreground)]">
                    {item.example}
                  </p>
                ) : null}
              </div>
              <div
                aria-label={`Answer item ${String(item.id).padStart(2, "0")}`}
                className="grid gap-3 sm:grid-cols-2"
                role="group"
              >
                {[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ].map((option) => {
                  const isSelected = selectedValue === option.value;

                  return (
                    <button
                      key={option.label}
                      aria-pressed={isSelected}
                      className={cn(
                        "min-h-12 rounded-full border px-5 py-3 text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
                        isSelected
                          ? "border-transparent bg-[var(--color-accent)] text-[var(--color-accent-foreground)] shadow-[var(--shadow-soft)]"
                          : "border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] hover:bg-[var(--color-surface-strong)]",
                      )}
                      onClick={() => onSelect(item.id, option.value)}
                      type="button"
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
