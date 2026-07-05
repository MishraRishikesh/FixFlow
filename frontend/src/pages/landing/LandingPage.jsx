import Navbar from "../../components/landing/Navbar";
import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";

function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </>
  );
}

export default LandingPage;
