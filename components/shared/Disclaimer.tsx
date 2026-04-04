import { TriangleAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
        "border-[var(--color-warning-border)] bg-[var(--color-warning-surface)]",
        className,
      )}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-warning-border)]/20">
            <TriangleAlert className="h-4 w-4 text-[var(--color-warning-border)]" />
          </div>
          <CardTitle className="font-serif text-lg">
            Important Disclaimer
          </CardTitle>
        </div>
        <CardDescription className={cn("text-foreground leading-7", compact ? "text-sm leading-6" : "text-base")}>
          {disclaimerText}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export { disclaimerText };
