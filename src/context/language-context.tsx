
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
    baseTax: "Base Tax (16%)",
    retention: "Retention",
    netAmount: "Net Amount",
    calculate: "Calculate",
    summary: "Summary",
    taxBreakdown: "Tax Breakdown",
    earnings: "Total Earnings",
    totalTaxes: "Total Taxes",
    language: "Language",
    theme: "Theme",
    placeholderAmount: "Enter gross amount...",
    settings: "Settings",
    netPayable: "Net Payable",
    deductions: "Deductions",
    disclaimers: "Values are estimates based on standard 16% VAT and applicable retentions.",
    gross_earnings: "Gross Earnings",
    baseTax_val: "Base Tax",
    retention_val: "Retention Total",
    history: "Recent Calculations"
  },
  es: {
    title: "Retenciones Pro",
    subtitle: "Simulador de Impuestos Freelance",
    grossAmount: "Monto Bruto",
    baseTax: "Impuesto Base (16%)",
    retention: "Retención",
    netAmount: "Monto Neto",
    calculate: "Calcular",
    summary: "Resumen",
    taxBreakdown: "Desglose de Impuestos",
    earnings: "Ganancias Totales",
    totalTaxes: "Impuestos Totales",
    language: "Idioma",
    theme: "Tema",
    placeholderAmount: "Ingresa el monto bruto...",
    settings: "Ajustes",
    netPayable: "Neto a Pagar",
    deductions: "Deducciones",
    disclaimers: "Los valores son estimaciones basadas en el 16% de IVA y retenciones aplicables.",
    gross_earnings: "Ganancia Bruta",
    baseTax_val: "Impuesto Base",
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
