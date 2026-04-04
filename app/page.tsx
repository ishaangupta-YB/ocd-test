"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, ShieldCheck, Clock, Activity } from "lucide-react";

import { Disclaimer } from "@/components/shared/Disclaimer";
import { PrivacyNotice } from "@/components/shared/PrivacyNotice";
import { buttonVariants } from "@/lib/button-variants";
import { Card } from "@/components/ui/card";

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
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
  },
  {
    title: "About 10 to 15 minutes",
    description:
      "Most people can complete the screener in one sitting, with grouped checklists and one-question severity screens.",
    icon: <Clock className="h-6 w-6 text-primary" />,
  },
  {
    title: "Session-only privacy",
    description:
      "Your responses stay in this browser session and are never stored in a database or sent anywhere.",
    icon: <Activity className="h-6 w-6 text-primary" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function HomePage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-center">
        <motion.div variants={containerVariants} className="space-y-8">
          <motion.div variants={itemVariants} className="inline-flex items-center rounded-full bg-[color-mix(in_oklab,var(--color-surface-strong)_80%,transparent)] px-4 py-2 text-sm font-medium text-muted-foreground shadow-[var(--shadow-soft)]">
            Guided OCD self-report screening
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-5">
            <h1 className="max-w-4xl font-serif text-5xl leading-tight text-foreground sm:text-6xl lg:text-7xl">
              Y-BOCS-II Self-Report OCD Screener
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              A validated self-report screening tool for obsessive-compulsive
              symptoms, presented in a calm, private experience that helps you
              move through each section at your own pace.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/test"
              className={buttonVariants({ size: "lg", className: "sm:min-w-[14rem] group" })}
            >
              Begin Screening
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "sm:min-w-[14rem]",
              })}
            >
              Learn About the Scale
            </Link>
          </motion.div>
          <motion.p variants={itemVariants} className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Based on the Yale-Brown Obsessive-Compulsive Scale — Second
            Edition, Self-Report Version (Y-BOCS-II-SR). © Goodman, Rasmussen,
            Price, & Storch, 2006.
          </motion.p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-4">
          <PrivacyNotice />
          <Card className="overflow-hidden p-6 sm:p-7 border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                What this tool offers
              </p>
              <div className="grid gap-4">
                {highlightCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="group rounded-2xl bg-[color-mix(in_oklab,var(--color-surface-strong)_78%,transparent)] p-4 hover:bg-primary/5 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 rounded-full bg-background p-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        {card.icon}
                      </div>
                      <div>
                        <h2 className="font-serif text-xl text-foreground">
                          {card.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-5 md:grid-cols-3"
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full p-6 hover:border-primary/30 transition-colors duration-300">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Gold-standard assessment
            </p>
            <p className="mt-3 text-base leading-7 text-foreground">
              The Y-BOCS-II is widely regarded as the gold-standard assessment for
              measuring OCD symptom severity.
            </p>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="h-full p-6 hover:border-primary/30 transition-colors duration-300">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Four-part structure
            </p>
            <p className="mt-3 text-base leading-7 text-foreground">
              You&apos;ll complete symptom checklists first, then brief severity
              ratings that help contextualize how intrusive thoughts and rituals
              affect day-to-day life.
            </p>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="h-full p-6 hover:border-primary/30 transition-colors duration-300">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Thoughtful pacing
            </p>
            <p className="mt-3 text-base leading-7 text-foreground">
              Expect roughly 10 to 15 minutes, with generous spacing, clear
              progress feedback, and no need to rush.
            </p>
          </Card>
        </motion.div>
      </motion.section>

      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start"
      >
        <motion.div variants={itemVariants}>
          <Card className="p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What is the Y-BOCS-II?
            </p>
            <div className="mt-4 space-y-4 text-base leading-8 text-foreground">
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
              <div className="pt-4 mt-4 border-t border-border">
                <a 
                  href="https://static1.squarespace.com/static/58cab82ff5e231f0df8d9cad/t/60945b3af4680c68037f8188/1620335418443/YBOCS-II-SR.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Official Screener PDF
                </a>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="space-y-5">
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What to Expect
            </p>
            <h2 className="font-serif text-4xl text-foreground">
              A four-part screening flow
            </h2>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">
              The screener is organized into symptom identification and severity
              questions. You can move backward to review responses, and the test
              adapts if you do not endorse symptoms in a section.
            </p>
          </motion.div>
          <div className="grid gap-4">
            {expectationCards.map((card, index) => (
              <motion.div 
                key={card.title} 
                variants={itemVariants}
                custom={index}
              >
                <Card className="p-5 sm:p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-foreground flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {card.title.split(' ')[1]}
                        </span>
                        {card.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.div variants={itemVariants}>
        <Disclaimer />
      </motion.div>
    </motion.div>
  );
}
