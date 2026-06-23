"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard-header";
import { TaxCalculator } from "@/components/tax-calculator";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Zap, 
  ChartBar, 
  Globe 
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-700">
      <DashboardHeader />
      
      <main className="flex-1 w-full overflow-hidden">
        <div className="container-fixed py-12 md:py-24 space-y-20">
          
          {/* Welcome Banner */}
          <motion.section 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1.5 mb-2 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
              Professional Tax Simulation
            </div>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1]">
              Precision for <span className="text-primary italic">Freelance</span> Minds.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Retenciones Pro delivers instantaneous fiscal insights with an editorial aesthetic. 
              Optimize your earnings with zero data footprints.
            </p>
          </motion.section>

          {/* Main App */}
          <section className="relative">
            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10" />
            <TaxCalculator />
          </section>

          {/* Feature Grid */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12"
          >
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6" />} 
              title="Stateless" 
              description="Full client-side computation. Your financial data never touches a server."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />} 
              title="Real-Time" 
              description="Reactive calculations that adapt to every keystroke with millisecond latency."
            />
            <FeatureCard 
              icon={<ChartBar className="w-6 h-6" />} 
              title="Analytical" 
              description="Beautifully rendered charts that break down your fiscal obligations visually."
            />
            <FeatureCard 
              icon={<Globe className="w-6 h-6" />} 
              title="Adaptive" 
              description="Fluid responsiveness and multi-language support for the global nomad."
            />
          </motion.section>

        </div>
      </main>

      <footer className="border-t py-12 bg-card/20 backdrop-blur-sm">
        <div className="container-fixed flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">RP</span>
            </div>
            <span className="font-bold tracking-tight">Retenciones Pro</span>
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} Precision Design. All rights reserved.
          </div>
          <div className="flex items-center gap-8 text-sm font-semibold text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="border-none bg-card/40 dark:bg-card/20 hover:bg-card/80 dark:hover:bg-card/30 transition-all duration-500 group h-full">
        <CardContent className="pt-8 pb-8 px-6 flex flex-col h-full">
          <div className="p-4 bg-primary/5 rounded-2xl w-fit mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
            {icon}
          </div>
          <h3 className="font-bold text-xl mb-3 tracking-tight">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed font-medium">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
