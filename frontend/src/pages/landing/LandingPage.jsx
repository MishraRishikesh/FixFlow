import Navbar from "../../components/landing/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import WorkflowSection from "../../components/landing/WorkflowSection";
import StatsSection from "../../components/landing/StatsSection";
import CTASection from "../../components/landing/CTASection";
import Footer from "../../components/landing/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <StatsSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}

export default LandingPage;
