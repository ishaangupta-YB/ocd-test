import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const disclaimerText =
  "This tool is for educational and screening purposes only. It is not a diagnostic instrument and does not constitute medical advice, diagnosis, or treatment. A high score does not mean you have OCD, and a low score does not mean you don't. Only a qualified mental health professional can diagnose OCD through a comprehensive clinical evaluation. If you are experiencing distress, please consult a licensed mental health provider. If you are in crisis, please contact the 988 Suicide & Crisis Lifeline (call or text 988 in the US) or your local emergency services.";

export function Disclaimer({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Card
      className={cn(
        "border-[var(--color-warning-border)] bg-[var(--color-warning-surface)] p-5 sm:p-6",
        className,
      )}
    >
      <div className="space-y-3">
        <h2 className="font-serif text-2xl text-foreground">
          Important Disclaimer
        </h2>
        <p className={cn("text-base leading-7 text-foreground", compact && "text-sm leading-6")}>
          {disclaimerText}
        </p>
      </div>
    </Card>
  );
}

export { disclaimerText };
