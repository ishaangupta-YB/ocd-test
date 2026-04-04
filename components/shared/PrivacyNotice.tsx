import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PrivacyNotice({ className }: { className?: string }) {
  return (
    <Card className={cn("p-5 sm:p-6", className)}>
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Privacy notice
        </p>
        <p className="text-base leading-7 text-foreground">
          Your responses are completely private. No data is stored or sent to
          any server, and your answers remain available only in this browser
          session while the tab stays open.
        </p>
      </div>
    </Card>
  );
}
