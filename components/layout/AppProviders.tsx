"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider"
import { TestProvider } from "@/context/TestContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <TestProvider>{children}</TestProvider>
    </ThemeProvider>
  );
}
