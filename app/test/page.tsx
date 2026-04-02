import type { Metadata } from "next";

import { TestWizard } from "@/components/test/TestWizard";

export const metadata: Metadata = {
  title: "Take the Y-BOCS-II Self-Report",
  description:
    "Complete the Y-BOCS-II Self-Report OCD screener in a calm, guided, session-only experience.",
};

export default function TestPage() {
  return <TestWizard />;
}
