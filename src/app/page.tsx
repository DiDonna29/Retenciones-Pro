
import { DashboardHeader } from "@/components/dashboard-header";
import { TaxCalculator } from "@/components/tax-calculator";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Globe2 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Welcome Banner */}
          <section className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Optimize your <span className="text-primary underline decoration-primary/30 underline-offset-8">Freelance</span> Earnings.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Retenciones Pro helps you calculate exact net amounts after tax retentions in seconds. Accurate, fast, and secure.
            </p>
          </section>

          {/* Main App */}
          <TaxCalculator />

          {/* Feature Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6" />} 
              title="Secure" 
              description="No data is stored. All calculations happen in your browser."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />} 
              title="Instant" 
              description="Real-time updates as you type your gross amount."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6" />} 
              title="Visual" 
              description="Clear charts show where every dollar of your tax goes."
            />
            <FeatureCard 
              icon={<Globe2 className="w-6 h-6" />} 
              title="Multilingual" 
              description="Available in both English and Spanish for global reach."
            />
          </section>

        </div>
      </main>

      <footer className="border-t py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Retenciones Pro. All rights reserved. Designed for independent professionals.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border-none bg-card/40 hover:bg-card/60 transition-colors">
      <CardContent className="pt-6">
        <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 text-primary">
          {icon}
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
