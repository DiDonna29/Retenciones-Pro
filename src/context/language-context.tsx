"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    title: "Retenciones Pro",
    subtitle: "Freelance Tax Simulator",
    grossAmount: "Gross Amount",
    vatAmount: "VAT (16%)",
    vatRetention: "VAT Retention",
    isrRetention: "ISR Retention (10%)",
    netAmount: "Net Total",
    calculate: "Calculate",
    summary: "Fiscal Breakdown",
    taxBreakdown: "Tax Breakdown",
    earnings: "Total Earnings",
    totalTaxes: "Total Taxes",
    language: "Language",
    theme: "Theme",
    placeholderAmount: "0.00",
    settings: "Settings",
    netPayable: "Net to Receive",
    deductions: "Deductions",
    disclaimers: "Calculations based on standard professional service rates (MEX).",
    gross_earnings: "Gross Total",
    baseTax_val: "VAT 16%",
    retention_val: "Total Retentions",
    history: "Recent Calculations"
  },
  es: {
    title: "Retenciones Pro",
    subtitle: "Simulador de Impuestos Freelance",
    grossAmount: "Monto Bruto",
    vatAmount: "IVA (16%)",
    vatRetention: "Retención de IVA",
    isrRetention: "Retención de ISR (10%)",
    netAmount: "Total Neto a Recibir",
    calculate: "Calcular",
    summary: "Resumen Fiscal",
    taxBreakdown: "Desglose de Impuestos",
    earnings: "Ganancias Totales",
    totalTaxes: "Impuestos Totales",
    language: "Idioma",
    theme: "Tema",
    placeholderAmount: "0.00",
    settings: "Ajustes",
    netPayable: "Neto a Recibir",
    deductions: "Deducciones",
    disclaimers: "Cálculos basados en tasas estándar de servicios profesionales (MEX).",
    gross_earnings: "Monto Bruto",
    baseTax_val: "IVA 16%",
    retention_val: "Total Retenciones",
    history: "Cálculos Recientes"
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}