import type { SeverityLevel } from "@/lib/test-types";

export const severityBenchmarks: Array<{
  level: SeverityLevel;
  label: string;
  min: number;
  max: number;
  colorToken: string;
}> = [
  {
    level: "sub-clinical",
    label: "Sub-clinical (Non-clinical)",
    min: 0,
    max: 14,
    colorToken: "var(--color-success)",
  },
  {
    level: "mild",
    label: "Mild",
    min: 15,
    max: 21,
    colorToken: "var(--color-amber)",
  },
  {
    level: "moderate",
    label: "Moderate",
    min: 22,
    max: 34,
    colorToken: "var(--color-orange)",
  },
  {
    level: "severe",
    label: "Severe",
    min: 35,
    max: 50,
    colorToken: "var(--color-severe)",
  },
];

export const interpretationBySeverity: Record<SeverityLevel, string> = {
  "sub-clinical":
    "Your responses suggest that obsessive-compulsive symptoms are not significantly impacting your daily life at this time. This score falls within the sub-clinical range, meaning the symptoms you may experience are within normal limits and are unlikely to require clinical intervention. If you are still concerned, consider speaking with a mental health professional.",
  mild:
    "Your responses suggest mild obsessive-compulsive symptoms. You may be experiencing some intrusive thoughts or repetitive behaviors that cause mild distress or take up some of your time, but they are generally manageable. Speaking with a mental health professional could help you develop strategies to manage these symptoms before they escalate.",
  moderate:
    "Your responses suggest moderate obsessive-compulsive symptoms. These symptoms are likely causing noticeable distress and may be interfering with your daily activities, work, or relationships. It is recommended that you consult with a mental health professional who specializes in OCD. Evidence-based treatments like Exposure and Response Prevention (ERP) therapy and/or medication can be highly effective.",
  severe:
    "Your responses suggest severe obsessive-compulsive symptoms that are likely causing significant distress and substantially interfering with your daily functioning. It is strongly recommended that you seek help from a mental health professional experienced in treating OCD as soon as possible. Effective treatments are available, including specialized therapy (ERP) and medication, and you do not have to face this alone.",
};

export const nextSteps = [
  "Consult a licensed mental health professional for a fuller evaluation of your symptoms.",
  "Exposure and Response Prevention (ERP) is the gold-standard therapy for OCD.",
  "Medication, including SSRIs, can also be effective for many people with OCD.",
];

export const resourceLinks = [
  {
    label: "International OCD Foundation",
    href: "https://iocdf.org/",
  },
  {
    label: "NOCD",
    href: "https://www.nocd.com/",
  },
  {
    label: "Psychology Today therapist finder",
    href: "https://www.psychologytoday.com/us/therapists/ocd",
  },
];

export const scoringSourceLabel =
  "Severity benchmarks are based on Cervin et al., 2025 — “Benchmarking empirical severity for the Yale-Brown Obsessive Compulsive Scale-Second Edition” in the Journal of Affective Disorders.";
