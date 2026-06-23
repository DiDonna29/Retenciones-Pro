
"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/language-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  ArrowRight, 
  TrendingDown, 
  TrendingUp, 
  Wallet,
  PieChart as PieChartIcon,
  Info
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  Legend
} from "recharts";

export function TaxCalculator() {
  const { t } = useLanguage();
  const [grossAmount, setGrossAmount] = useState<string>("");

  const calculations = useMemo(() => {
    const amount = parseFloat(grossAmount) || 0;
    const baseTaxRate = 0.16;
    // Typical retention scenario (e.g. Mexico Freelance): 
    // 10% ISR Retention + (2/3 of 16% VAT) = ~10.66% VAT Retention
    // For simplicity in the prompt "calculate base tax (e.g. 16%) and the applicable retention"
    // We'll use 16% Base and a 10% combined retention rate as standard demo
    const baseTax = amount * baseTaxRate;
    const retentionRate = 0.10;
    const retentionAmount = amount * retentionRate;
    const netAmount = amount + baseTax - retentionAmount;

    return {
      gross: amount,
      baseTax,
      retention: retentionAmount,
      net: netAmount,
      totalDeductions: retentionAmount,
    };
  }, [grossAmount]);

  const chartData = [
    { name: t("netPayable"), value: calculations.net, color: "hsl(var(--primary))" },
    { name: t("baseTax_val"), value: calculations.baseTax, color: "hsl(var(--accent))" },
    { name: t("retention_val"), value: calculations.retention, color: "hsl(var(--destructive))" },
  ].filter(d => d.value > 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Input Section */}
      <Card className="lg:col-span-1 border-none shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl">{t("calculate")}</CardTitle>
          </div>
          <CardDescription>
            {t("subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="gross-amount" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t("grossAmount")}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
              <Input
                id="gross-amount"
                type="number"
                placeholder="0.00"
                className="pl-8 h-12 text-lg font-semibold focus-visible:ring-primary/50"
                value={grossAmount}
                onChange={(e) => setGrossAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Info className="w-3 h-3" /> {t("baseTax")}
              </span>
              <span className="font-medium">{formatCurrency(calculations.baseTax)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1 text-destructive">
                <TrendingDown className="w-3 h-3" /> {t("retention")}
              </span>
              <span className="font-medium text-destructive">-{formatCurrency(calculations.retention)}</span>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground italic leading-tight">
            {t("disclaimers")}
          </p>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-none shadow-lg overflow-hidden bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium opacity-80 uppercase tracking-widest">{t("netPayable")}</p>
                  <h2 className="text-3xl font-bold mt-1 tabular-nums">
                    {formatCurrency(calculations.net)}
                  </h2>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                  <Wallet className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium bg-white/10 w-fit px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span>+16% VAT Incl.</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-card/50">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{t("deductions")}</p>
                  <h2 className="text-3xl font-bold mt-1 tabular-nums text-destructive">
                    {formatCurrency(calculations.retention)}
                  </h2>
                </div>
                <div className="p-3 bg-destructive/10 rounded-xl">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                {t("retention_val")} (ISR/VAT)
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-primary" />
                {t("taxBreakdown")}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[250px]">
              {calculations.gross > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <div className="p-4 bg-muted rounded-full mb-3">
                    <PieChartIcon className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="text-sm">{t("placeholderAmount")}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary" />
                {t("summary")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SummaryItem label={t("gross_earnings")} value={formatCurrency(calculations.gross)} />
                <SummaryItem label={t("baseTax_val")} value={formatCurrency(calculations.baseTax)} accent />
                <SummaryItem label={t("retention_val")} value={formatCurrency(calculations.retention)} negative />
                <div className="pt-4 border-t border-dashed border-border flex justify-between items-center">
                  <span className="font-bold text-lg">{t("netAmount")}</span>
                  <span className="font-bold text-2xl text-primary">{formatCurrency(calculations.net)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, accent, negative }: { label: string; value: string; accent?: boolean; negative?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className={`text-base font-semibold ${accent ? 'text-primary' : negative ? 'text-destructive' : ''}`}>
        {negative ? '-' : ''}{value}
      </span>
    </div>
  );
}
