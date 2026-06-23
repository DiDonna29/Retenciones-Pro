"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calculator, 
  ArrowRight, 
  TrendingDown, 
  TrendingUp, 
  Wallet,
  ChartPie as PieChartIcon,
  Info,
  DollarSign
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
} from "recharts";

export function TaxCalculator() {
  const { t, language } = useLanguage();
  const [grossAmount, setGrossAmount] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculations = useMemo(() => {
    const amount = parseFloat(grossAmount) || 0;
    const baseTaxRate = 0.16;
    const retentionRate = 0.1066; // Standard MEX Freelance (approx 2/3 VAT + 10% ISR)
    const baseTax = amount * baseTaxRate;
    const retentionAmount = amount * retentionRate;
    const netAmount = amount + baseTax - retentionAmount;

    return {
      gross: amount,
      baseTax,
      retention: retentionAmount,
      net: netAmount,
    };
  }, [grossAmount]);

  const chartData = useMemo(() => [
    { name: t("netPayable"), value: calculations.net, color: "hsl(var(--primary))" },
    { name: t("baseTax_val"), value: calculations.baseTax, color: "hsl(var(--accent))" },
    { name: t("retention_val"), value: calculations.retention, color: "hsl(var(--destructive))" },
  ].filter(d => d.value > 0), [calculations, t]);

  const formatCurrency = (val: number) => {
    if (!mounted) {
      // Return a stable format for server-side rendering to prevent hydration mismatch
      return `$${val.toFixed(2)}`;
    }
    // Use the specific language locale to keep formatting consistent between server-guess and client
    const locale = language === "es" ? "es-MX" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full max-w-full">
      {/* Input Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-4"
      >
        <Card className="glass-card overflow-hidden border-none shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-2xl font-black tracking-tight">{t("calculate")}</CardTitle>
            </div>
            <CardDescription className="font-medium">
              {t("subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            <div className="space-y-3">
              <Label htmlFor="gross-amount" className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
                {t("grossAmount")}
              </Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <DollarSign className="w-5 h-5" />
                </div>
                <Input
                  id="gross-amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-12 h-16 text-2xl font-bold bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
                  value={grossAmount}
                  onChange={(e) => setGrossAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-dashed space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Info className="w-4 h-4" /> {t("baseTax")}
                </span>
                <span className="font-bold tabular-nums">{formatCurrency(calculations.baseTax)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-destructive flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" /> {t("retention")}
                </span>
                <span className="font-bold text-destructive tabular-nums">-{formatCurrency(calculations.retention)}</span>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
              <p className="text-[11px] text-primary font-bold leading-normal uppercase tracking-wide">
                {t("disclaimers")}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Section */}
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 h-fit">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card className="border-none shadow-2xl bg-primary text-primary-foreground overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <CardContent className="p-8 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-black opacity-80 uppercase tracking-[0.2em]">{t("netPayable")}</p>
                  <h2 className="text-4xl md:text-5xl font-black mt-2 tabular-nums tracking-tighter">
                    {formatCurrency(calculations.net)}
                  </h2>
                </div>
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                  <Wallet className="w-7 h-7" />
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold bg-white/10 w-fit px-4 py-2 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span>VAT INCLUDED (16%)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-card/60 backdrop-blur-xl group overflow-hidden">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{t("deductions")}</p>
                  <h2 className="text-4xl md:text-5xl font-black mt-2 tabular-nums text-destructive tracking-tighter">
                    {formatCurrency(calculations.retention)}
                  </h2>
                </div>
                <div className="p-4 bg-destructive/5 rounded-2xl group-hover:bg-destructive/10 transition-colors">
                  <TrendingDown className="w-7 h-7 text-destructive" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-bold italic">
                {t("retention_val")} (ISR/VAT Combined)
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-1"
        >
          <Card className="border-none shadow-xl glass-card h-full min-h-[400px]">
            <CardHeader>
              <CardTitle className="text-lg font-black flex items-center gap-3 tracking-tight">
                <PieChartIcon className="w-5 h-5 text-primary" />
                {t("taxBreakdown")}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[280px]">
              {calculations.gross > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ 
                        borderRadius: '20px', 
                        border: 'none', 
                        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        padding: '12px 16px'
                      }}
                      itemStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                  <div className="p-6 bg-muted/50 rounded-full">
                    <PieChartIcon className="w-10 h-10 opacity-20" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-40">{t("placeholderAmount")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-1"
        >
          <Card className="border-none shadow-xl glass-card h-full min-h-[400px]">
            <CardHeader>
              <CardTitle className="text-lg font-black flex items-center gap-3 tracking-tight">
                <ArrowRight className="w-5 h-5 text-primary" />
                {t("summary")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <SummaryItem label={t("gross_earnings")} value={formatCurrency(calculations.gross)} />
              <SummaryItem label={t("baseTax_val")} value={formatCurrency(calculations.baseTax)} accent />
              <SummaryItem label={t("retention_val")} value={formatCurrency(calculations.retention)} negative />
              <div className="pt-8 border-t-2 border-primary/10 flex flex-col gap-2">
                <span className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{t("netAmount")}</span>
                <span className="font-black text-4xl text-primary tracking-tighter tabular-nums leading-none">
                  {formatCurrency(calculations.net)}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, accent, negative }: { label: string; value: string; accent?: boolean; negative?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 group">
      <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
      <span className={`text-base font-black tabular-nums ${accent ? 'text-primary' : negative ? 'text-destructive' : ''}`}>
        {negative ? '-' : ''}{value}
      </span>
    </div>
  );
}
