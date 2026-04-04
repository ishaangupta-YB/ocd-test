import { Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PrivacyNotice({ className }: { className?: string }) {
  return (
    <Card className={cn("border-primary/15", className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Lock className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="font-serif text-lg">Privacy notice</CardTitle>
        </div>
        <CardDescription className="text-base leading-7">
          Your responses are completely private. No data is stored or sent to
          any server, and your answers remain available only in this browser
          session while the tab stays open.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
