import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import DashboardSection from "@/components/DashboardSection";
import FinancialCalculator from "@/components/FinancialCalculator";
import KidsSection from "@/components/KidsSection";
import MarketIntelligence from "@/components/MarketIntelligence";
import Insights from "@/components/Insights";
import WhyFermor from "@/components/WhyFermor";
import TrustSection from "@/components/TrustSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FinancialChatbot from "@/components/FinancialChatbot";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <ProblemSection />
        <HowItWorks />
        <DashboardSection />
        <FinancialCalculator />
        <KidsSection />
        <WhyFermor />
        <MarketIntelligence />
        <Insights />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
      <FinancialChatbot />
    </>
  );
}
