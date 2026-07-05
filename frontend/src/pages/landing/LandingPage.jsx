import Navbar from "../../components/landing/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import WorkflowSection from "../../components/landing/WorkflowSection";
import StatsSection from "../../components/landing/StatsSection";

function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <StatsSection />
      </main>
    </>
  );
}

export default LandingPage;
