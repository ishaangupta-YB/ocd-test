import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Geist } from "next/font/google";

import { AppProviders } from "@/components/layout/AppProviders";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const themeScript = `
(() => {
  try {
    const storedTheme = sessionStorage.getItem("ybocs-theme");
    const theme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.classList.remove("dark");
    document.documentElement.dataset.theme = "light";
  }
})();
`;

const metadataBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

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
      className={cn("h-full", "scroll-smooth", "antialiased", dmSans.variable, playfairDisplay.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full bg-[var(--color-background)] text-[var(--color-foreground)]">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AppProviders>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(134,171,165,0.26),_transparent_48%),radial-gradient(circle_at_top_right,_rgba(194,174,140,0.18),_transparent_45%),linear-gradient(180deg,rgba(250,247,240,0.96),rgba(250,247,240,0.88))] dark:bg-[radial-gradient(circle_at_top_left,_rgba(80,115,111,0.28),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(123,160,150,0.14),_transparent_42%),linear-gradient(180deg,rgba(13,23,27,0.95),rgba(13,23,27,0.88))]" />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
