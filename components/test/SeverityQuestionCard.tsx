import { motion } from "framer-motion";
import type { SeverityQuestion } from "@/lib/test-types";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

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
    <Card className="p-5 sm:p-6 transition-shadow duration-300 hover:shadow-md">
      <fieldset className="space-y-5">
        <legend className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {question.name}
          </p>
          <h2 className="text-2xl font-medium leading-9 text-foreground sm:text-3xl">
            {question.prompt}
          </h2>
        </legend>
        <motion.div 
          className="grid gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {question.options.map((option) => {
            const isSelected = selectedValue === option.value;

            return (
              <motion.label
                key={option.value}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  "flex cursor-pointer gap-4 rounded-[1.15rem] border p-4 transition-all duration-200",
                  isSelected
                    ? "border-transparent bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--color-primary),0.3)]"
                    : "border-border bg-background text-foreground hover:bg-[var(--color-surface-strong)] hover:border-primary/30",
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
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-semibold transition-colors duration-200",
                    isSelected
                      ? "bg-[color-mix(in_oklab,var(--color-primary-foreground)_16%,transparent)]"
                      : "bg-[var(--color-surface-strong)]",
                  )}
                >
                  {option.value}
                </div>
                <p className="text-base leading-7">{option.label}</p>
              </motion.label>
            );
          })}
        </motion.div>
      </fieldset>
    </Card>
  );
}
