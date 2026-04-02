"use client";

import type { ReactNode } from "react";

import { TestProvider } from "@/context/TestContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return <TestProvider>{children}</TestProvider>;
}
