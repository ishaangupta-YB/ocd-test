import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";

import { AppProviders } from "@/components/layout/AppProviders";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const normalizeSiteUrl = (value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }

  const candidate = value.trim();

  if (!candidate) {
    return undefined;
  }

  const withProtocol = /^https?:\/\//i.test(candidate)
    ? candidate
    : `https://${candidate}`;

  try {
    return new URL(withProtocol).toString();
  } catch {
    return undefined;
  }
};

const metadataBaseUrl =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  normalizeSiteUrl(process.env.VERCEL_URL) ??
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: {
    default: "Y-BOCS-II OCD Screener — Free Online Self-Report Tool",
    template: "%s | Y-BOCS-II OCD Screener",
  },
  description:
    "A private, client-side Y-BOCS-II Self-Report OCD screener that helps you explore obsession and compulsion symptoms with a calm, guided experience.",
  applicationName: "Y-BOCS-II OCD Screener",
  keywords: [
    "OCD screener",
    "Y-BOCS-II",
    "obsessive compulsive disorder",
    "self-report screening tool",
    "OCD assessment",
  ],
  openGraph: {
    title: "Y-BOCS-II OCD Screener — Free Online Self-Report Tool",
    description:
      "Take a private, client-side Y-BOCS-II Self-Report screening experience with clear disclaimers, session-only storage, and supportive next steps.",
    type: "website",
    siteName: "Y-BOCS-II OCD Screener",
  },
  twitter: {
    card: "summary",
    title: "Y-BOCS-II OCD Screener — Free Online Self-Report Tool",
    description:
      "A calm, private Y-BOCS-II Self-Report screening experience for exploring OCD symptoms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn("h-full", "scroll-smooth", "antialiased", playfairDisplay.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full bg-background text-foreground">
        <TooltipProvider>
          <AppProviders>
            <div className="relative flex min-h-screen flex-col">
              <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(134,171,165,0.26),_transparent_48%),radial-gradient(circle_at_top_right,_rgba(194,174,140,0.18),_transparent_45%),linear-gradient(180deg,rgba(250,247,240,0.96),rgba(250,247,240,0.88))] dark:bg-[radial-gradient(circle_at_top_left,_rgba(80,115,111,0.28),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(123,160,150,0.14),_transparent_42%),linear-gradient(180deg,rgba(13,23,27,0.95),rgba(13,23,27,0.88))]" />
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </AppProviders>
        </TooltipProvider>
      </body>
    </html>
  );
}
