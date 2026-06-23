
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";
import { 
  Sun, 
  Moon, 
  Languages, 
  Calculator,
  LayoutDashboard,
  Settings,
  HelpCircle
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40"
    >
      <div className="container-fixed h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30"
          >
            <Calculator className="w-7 h-7 text-primary-foreground" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none">{t("title")}</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mt-1 font-black opacity-60">{t("subtitle")}</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-2 mx-8 flex-1 justify-center">
          <Button variant="ghost" className="gap-2 font-bold px-6 rounded-full hover:bg-primary/5 transition-all">
            <LayoutDashboard className="w-4 h-4" />
            {t("summary")}
          </Button>
          <Button variant="ghost" className="gap-2 font-bold px-6 rounded-full hover:bg-primary/5 transition-all">
            <Settings className="w-4 h-4" />
            {t("settings")}
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-2xl w-12 h-12 border-none bg-muted/40 hover:bg-muted transition-all">
                <Languages className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-2xl p-2">
              <DropdownMenuItem onClick={() => setLanguage("en")} className={`rounded-xl px-4 py-3 font-bold ${language === "en" ? "bg-primary text-white" : ""}`}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("es")} className={`rounded-xl px-4 py-3 font-bold ${language === "es" ? "bg-primary text-white" : ""}`}>
                Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-2xl w-12 h-12 border-none bg-muted/40 hover:bg-muted transition-all"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <div className="lg:hidden">
            <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl">
              <HelpCircle className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
