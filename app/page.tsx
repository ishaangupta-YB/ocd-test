import Link from "next/link";

import { Disclaimer } from "@/components/shared/Disclaimer";
import { PrivacyNotice } from "@/components/shared/PrivacyNotice";
import { buttonClassName } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const expectationCards = [
  {
    title: "Part A",
    description:
      "A checklist of obsession-related thoughts, images, sensations, and urges from the past 30 days.",
  },
  {
    title: "Part B",
    description:
      "Five severity questions about how much time, distress, and interference those thoughts create.",
  },
  {
    title: "Part C",
    description:
      "A checklist of compulsions, rituals, and avoidance behaviors that may be used to reduce distress.",
  },
  {
    title: "Part D",
    description:
      "Five follow-up questions about the time, control, distress, and impact related to those behaviors.",
  },
];

const highlightCards = [
  {
    title: "Warm, non-clinical guidance",
    description:
      "The experience is designed to feel spacious and supportive, with calm language and step-by-step pacing.",
  },
  {
    title: "About 10 to 15 minutes",
    description:
      "Most people can complete the screener in one sitting, with grouped checklists and one-question severity screens.",
  },
  {
    title: "Session-only privacy",
    description:
      "Your responses stay in this browser session and are never stored in a database or sent anywhere.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full bg-[color-mix(in_oklab,var(--color-surface-strong)_80%,transparent)] px-4 py-2 text-sm font-medium text-[var(--color-muted-foreground)] shadow-[var(--shadow-soft)]">
            Guided OCD self-report screening
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl font-serif text-5xl leading-tight text-[var(--color-foreground)] sm:text-6xl lg:text-7xl">
              Y-BOCS-II Self-Report OCD Screener
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--color-muted-foreground)] sm:text-xl">
              A validated self-report screening tool for obsessive-compulsive
              symptoms, presented in a calm, private experience that helps you
              move through each section at your own pace.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/test"
              className={buttonClassName({ size: "lg", className: "sm:min-w-[14rem]" })}
            >
              Begin Screening
            </Link>
            <Link
              href="/about"
              className={buttonClassName({
                variant: "secondary",
                size: "lg",
                className: "sm:min-w-[14rem]",
              })}
            >
              Learn About the Scale
            </Link>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted-foreground)]">
            Based on the Yale-Brown Obsessive-Compulsive Scale — Second
            Edition, Self-Report Version (Y-BOCS-II-SR). © Goodman, Rasmussen,
            Price, & Storch, 2006.
          </p>
        </div>
        <div className="space-y-4">
          <PrivacyNotice />
          <Card className="overflow-hidden p-6 sm:p-7">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                What this tool offers
              </p>
              <div className="grid gap-4">
                {highlightCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl bg-[color-mix(in_oklab,var(--color-surface-strong)_78%,transparent)] p-4"
                  >
                    <h2 className="font-serif text-2xl text-[var(--color-foreground)]">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-base leading-7 text-[var(--color-muted-foreground)]">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            Gold-standard assessment
          </p>
          <p className="mt-3 text-base leading-7 text-[var(--color-foreground)]">
            The Y-BOCS-II is widely regarded as the gold-standard assessment for
            measuring OCD symptom severity.
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            Four-part structure
          </p>
          <p className="mt-3 text-base leading-7 text-[var(--color-foreground)]">
            You&apos;ll complete symptom checklists first, then brief severity
            ratings that help contextualize how intrusive thoughts and rituals
            affect day-to-day life.
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            Thoughtful pacing
          </p>
          <p className="mt-3 text-base leading-7 text-[var(--color-foreground)]">
            Expect roughly 10 to 15 minutes, with generous spacing, clear
            progress feedback, and no need to rush.
          </p>
        </Card>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
        <Card className="p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
            What is the Y-BOCS-II?
          </p>
          <div className="mt-4 space-y-4 text-base leading-8 text-[var(--color-foreground)]">
            <p>
              The Yale-Brown Obsessive-Compulsive Scale, Second Edition
              (Y-BOCS-II), is the gold-standard assessment tool for measuring OCD
              symptom severity. It was developed by Goodman, Rasmussen, Price,
              and Storch to help identify the presence and impact of
              obsession-related thoughts and compulsion-related behaviors.
            </p>
            <p>
              This self-report version lets you move through the same core
              symptom structure independently, while keeping your responses local
              to this browser session.
            </p>
          </div>
        </Card>

        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
              What to Expect
            </p>
            <h2 className="font-serif text-4xl text-[var(--color-foreground)]">
              A four-part screening flow
            </h2>
            <p className="max-w-3xl text-base leading-8 text-[var(--color-muted-foreground)]">
              The screener is organized into symptom identification and severity
              questions. You can move backward to review responses, and the test
              adapts if you do not endorse symptoms in a section.
            </p>
          </div>
          <div className="grid gap-4">
            {expectationCards.map((card) => (
              <Card key={card.title} className="p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-serif text-2xl text-[var(--color-foreground)]">
                      {card.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--color-muted-foreground)]">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}
