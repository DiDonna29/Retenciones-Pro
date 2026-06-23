"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calculator, 
  TrendingDown, 
  TrendingUp, 
  Wallet,
  ChartPie as PieChartIcon,
  DollarSign,
  ReceiptText
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
    
    // Standard MEX Professional Services Calculation
    const vatRate = 0.16;
    const vatRetentionRate = 0.106667; // 2/3 of VAT
    const isrRetentionRate = 0.10;    // 10% ISR

    const vatAmount = amount * vatRate;
    const vatRetention = amount * vatRetentionRate;
    const isrRetention = amount * isrRetentionRate;
    const totalRetentions = vatRetention + isrRetention;
    const netAmount = amount + vatAmount - totalRetentions;

    return {
      gross: amount,
      vat: vatAmount,
      vatRet: vatRetention,
      isrRet: isrRetention,
      totalRet: totalRetentions,
      net: netAmount,
    };
  }, [grossAmount]);

  const chartData = useMemo(() => [
    { name: t("netPayable"), value: calculations.net, color: "hsl(var(--primary))" },
    { name: t("vatRetention"), value: calculations.vatRet, color: "hsl(var(--destructive))" },
    { name: t("isrRetention"), value: calculations.isrRet, color: "hsl(var(--destructive))" },
    { name: t("vatAmount"), value: calculations.vat, color: "hsl(var(--accent))" },
  ].filter(d => d.value > 0), [calculations, t]);

  const formatCurrency = (val: number) => {
    if (!mounted) return `$0.00`;
    const locale = language === "es" ? "es-MX" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full overflow-hidden">
      {/* Input Section */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-5 w-full min-w-0"
      >
        <Card className="glass-card border-none shadow-2xl relative w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-black tracking-tight truncate">{t("calculate")}</CardTitle>
            </div>
            <CardDescription className="font-medium text-muted-foreground/80">
              {t("subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-6 overflow-hidden">
            <div className="space-y-4">
              <Label htmlFor="gross-amount" className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 block">
                {t("grossAmount")}
              </Label>
              <div className="relative group w-full">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-all duration-300">
                  <DollarSign className="w-6 h-6" />
                </div>
                <Input
                  id="gross-amount"
                  type="number"
                  placeholder={t("placeholderAmount")}
                  className="pl-14 h-20 text-3xl font-black bg-muted/20 border-none focus-visible:ring-4 focus-visible:ring-primary/20 rounded-3xl transition-all w-full"
                  value={grossAmount}
                  onChange={(e) => setGrossAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-8 border-t border-dashed space-y-5">
              <SummaryItemRow label={t("grossAmount")} value={formatCurrency(calculations.gross)} />
              <SummaryItemRow label={t("vatAmount")} value={formatCurrency(calculations.vat)} isPositive />
              <SummaryItemRow label={t("vatRetention")} value={formatCurrency(calculations.vatRet)} isNegative />
              <SummaryItemRow label={t("isrRetention")} value={formatCurrency(calculations.isrRet)} isNegative />
            </div>

            <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
              <p className="text-[11px] text-primary font-black leading-tight uppercase tracking-widest text-center">
                {t("disclaimers")}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Section */}
      <div className="lg:col-span-7 space-y-8 w-full min-w-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          <Card className="border-none shadow-2xl bg-primary text-primary-foreground overflow-hidden relative group md:col-span-2">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
            <CardContent className="p-10 relative z-10 overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black opacity-70 uppercase tracking-[0.3em]">{t("netPayable")}</p>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mt-3 tabular-nums tracking-tighter leading-none break-words">
                    {formatCurrency(calculations.net)}
                  </h2>
                </div>
                <div className="p-6 bg-white/15 rounded-3xl backdrop-blur-xl shrink-0">
                  <Wallet className="w-10 h-10" />
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs font-black bg-black/10 w-fit px-6 py-3 rounded-full">
                <ReceiptText className="w-4 h-4" />
                <span className="truncate">INVOICE PREVIEW READY</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl glass-card overflow-hidden group w-full">
            <CardContent className="p-8 overflow-hidden">
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{t("totalTaxes")}</p>
                  <h2 className="text-2xl md:text-3xl font-black mt-2 tabular-nums text-destructive tracking-tight break-words">
                    {formatCurrency(calculations.totalRet)}
                  </h2>
                </div>
                <div className="p-4 bg-destructive/5 rounded-2xl group-hover:bg-destructive/10 transition-colors shrink-0">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl glass-card overflow-hidden group w-full">
            <CardContent className="p-8 overflow-hidden">
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{t("vatAmount")}</p>
                  <h2 className="text-2xl md:text-3xl font-black mt-2 tabular-nums text-primary tracking-tight break-words">
                    {formatCurrency(calculations.vat)}
                  </h2>
                </div>
                <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          <Card className="border-none shadow-xl glass-card min-h-[350px] w-full overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm font-black flex items-center gap-3 tracking-widest uppercase opacity-60 truncate">
                <PieChartIcon className="w-4 h-4 text-primary" />
                {t("taxBreakdown")}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] relative w-full overflow-hidden">
              {calculations.gross > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
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
                        borderRadius: '24px', 
                        border: 'none', 
                        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                        backgroundColor: 'rgba(255,255,255,0.98)',
                        padding: '16px 20px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40 space-y-4">
                  <PieChartIcon className="w-12 h-12" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-center">{t("placeholderAmount")}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl glass-card min-h-[350px] w-full overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm font-black flex items-center gap-3 tracking-widest uppercase opacity-60 truncate">
                <ReceiptText className="w-4 h-4 text-primary" />
                {t("summary")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-2 overflow-hidden">
              <SummaryItemRow label={t("gross_earnings")} value={formatCurrency(calculations.gross)} />
              <SummaryItemRow label={t("baseTax_val")} value={formatCurrency(calculations.vat)} />
              <SummaryItemRow label={t("retention_val")} value={formatCurrency(calculations.totalRet)} isNegative />
              <div className="pt-6 border-t-2 border-primary/10 flex flex-col gap-1 w-full overflow-hidden">
                <span className="font-black text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">{t("netAmount")}</span>
                <span className="font-black text-3xl md:text-4xl text-primary tracking-tighter tabular-nums break-words">
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

function SummaryItemRow({ label, value, isPositive, isNegative }: { label: string; value: string; isPositive?: boolean; isNegative?: boolean }) {
  return (
    <div className="flex justify-between items-center group gap-4 w-full min-w-0">
      <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-widest truncate shrink-0">{label}</span>
      <span className={`text-sm font-black tabular-nums break-all ${isPositive ? 'text-primary' : isNegative ? 'text-destructive' : 'text-foreground'}`}>
        {isNegative ? '-' : isPositive ? '+' : ''}{value}
      </span>
    </div>
  );
}