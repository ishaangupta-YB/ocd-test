import type { Metadata } from "next";

import { ResultsClient } from "@/components/results/ResultsClient";

export const metadata: Metadata = {
  title: "Your Y-BOCS-II Results",
  description:
    "Review your Y-BOCS-II Self-Report severity score, symptom counts, interpretation, and next-step resources.",
};

export default function ResultsPage() {
  return <ResultsClient />;
}
