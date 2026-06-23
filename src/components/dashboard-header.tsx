
"use client";

import React from "react";
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
            <Calculator className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-none">{t("title")}</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-semibold">{t("subtitle")}</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 mx-8 flex-1">
          <Button variant="ghost" size="sm" className="gap-2 text-primary font-semibold bg-primary/10">
            <LayoutDashboard className="w-4 h-4" />
            {t("summary")}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            {t("settings")}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <HelpCircle className="w-4 h-4" />
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                <Languages className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "font-bold text-primary" : ""}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("es")} className={language === "es" ? "font-bold text-primary" : ""}>
                Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full w-10 h-10 transition-all duration-500 hover:rotate-12"
          >
            {theme === "light" ? (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
