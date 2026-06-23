
"use client";

import * as React from "react";
import { LanguageProvider } from "@/context/language-context";
import { ThemeProvider } from "@/context/theme-context";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}
