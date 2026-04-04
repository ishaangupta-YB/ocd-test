import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";

import { Disclaimer } from "@/components/shared/Disclaimer";
import { PrivacyNotice } from "@/components/shared/PrivacyNotice";
import { buttonVariants } from "@/lib/button-variants";
import { Card } from "@/components/ui/card";
import { resourceLinks } from "@/data/scoring";

export const metadata: Metadata = {
  title: "About the Y-BOCS-II Screener",
  description:
    "Learn what OCD is, how the Y-BOCS-II works, how this self-report tool is scored, and why it should not be used as a diagnosis.",
};

const sections = [
  {
    title: "What is OCD?",
    body: [
      "Obsessive-compulsive disorder (OCD) is a chronic condition characterized by intrusive, unwanted thoughts, images, sensations, or urges and repetitive behaviors or mental acts that a person may feel driven to perform in order to reduce distress.",
      "OCD can affect work, school, relationships, and daily routines. It is not a character flaw, and it is not defined by how well someone appears to be coping on the outside. It affects approximately 1–2% of the population worldwide.",
    ],
  },
  {
    title: "What is the Y-BOCS-II?",
    body: [
      "The Yale-Brown Obsessive-Compulsive Scale (Y-BOCS) is the gold-standard clinical assessment for measuring OCD symptom severity. The Second Edition (Y-BOCS-II) was developed by Wayne K. Goodman, Steven A. Rasmussen, Lawrence H. Price, and Eric A. Storch in 2006 to improve sensitivity, especially for severe cases, and to better capture avoidance behaviors.",
      "This website uses the self-report version, which allows an individual to complete the assessment independently while preserving the structure of the original instrument.",
    ],
  },
  {
    title: "How is it scored?",
    body: [
      "The screener has four parts. Parts A and C identify symptom themes: obsessions first, then compulsions and avoidance behaviors. Parts B and D are the severity sections, with five questions each rated from 0 to 5.",
      "The total severity score is the sum of Part B and Part D, with a possible range from 0 to 50. Checklist endorsements are shown as counts to help contextualize the score, but they are not added numerically.",
    ],
  },
  {
    title: "Limitations",
    body: [
      "Self-report screening is not the same as a clinician-administered evaluation. Cultural context, reading interpretation, current stress, and co-occurring conditions can affect how a person answers and how a score should be understood.",
      "This tool is best used as a structured starting point for reflection and discussion, not as a substitute for diagnosis, treatment planning, or emergency support.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <Card className="p-6 sm:p-8">
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              About this website
            </p>
            <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
              Understanding the Y-BOCS-II self-report screener
            </h1>
          </div>
          <p className="max-w-4xl text-lg leading-8 text-muted-foreground">
            This website presents the Y-BOCS-II Self-Report Version in a calm,
            session-only experience so you can explore obsession and compulsion
            symptoms without creating a permanent record in the browser.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/test" className={buttonVariants({ size: "lg" })}>
              Begin the Screening
            </Link>
            <Link
              href="/results"
              className={buttonVariants({
                size: "lg",
                variant: "secondary",
              })}
            >
              View Results Page
            </Link>
            <a
              href="https://pandasnetwork.org/wp-content/uploads/2018/11/y-bocs-w-checklist.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "gap-2",
              })}
            >
              <FileText className="h-4 w-4" />
              Official Screener PDF
            </a>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title} className="p-6 sm:p-7">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl text-foreground">
                {section.title}
              </h2>
              <div className="space-y-3 text-base leading-8 text-foreground">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <Card className="p-6 sm:p-7">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Attribution
            </p>
            <h2 className="font-serif text-3xl text-foreground">
              Scale attribution and website scope
            </h2>
            <p className="text-base leading-8 text-foreground">
              This tool is based on the Y-BOCS-II Self-Report Version. ©
              Goodman, Rasmussen, Price, & Storch, 2006. This website is not
              affiliated with or endorsed by the scale&apos;s authors.
            </p>
            <p className="text-base leading-8 text-muted-foreground">
              If you want help interpreting a score, finding ERP-focused care,
              or deciding whether further evaluation makes sense, the following
              resources can help:
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {resourceLinks.map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  rel="noreferrer"
                  target="_blank"
                  className="rounded-[1.15rem] border border-border bg-background p-4 text-base font-medium text-foreground transition-colors hover:bg-[var(--color-surface-strong)]"
                >
                  {resource.label}
                </a>
              ))}
            </div>
          </div>
        </Card>
        <PrivacyNotice />
      </div>

      <Disclaimer />
    </div>
  );
}
