import { motion } from "framer-motion";
import type { ChecklistItem } from "@/lib/test-types";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

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
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => {
        const selectedValue = responses[item.id];

        return (
          <motion.div key={item.id} variants={itemVariants}>
            <Card className="p-5 sm:p-6 transition-shadow duration-300 hover:shadow-md">
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Item {String(item.id).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-medium leading-8 text-foreground">
                    {item.prompt}
                  </h3>
                  {item.example ? (
                    <p className="text-base leading-7 text-muted-foreground">
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
                      <motion.button
                        key={option.label}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-pressed={isSelected}
                        className={cn(
                          "min-h-12 rounded-full border px-5 py-3 text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          isSelected
                            ? "border-transparent bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--color-primary),0.3)]"
                            : "border-border bg-background text-foreground hover:bg-[var(--color-surface-strong)] hover:border-primary/30",
                        )}
                        onClick={() => onSelect(item.id, option.value)}
                        type="button"
                      >
                        {option.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
