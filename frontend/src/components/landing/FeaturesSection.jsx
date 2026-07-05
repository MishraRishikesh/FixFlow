import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import FeatureCard from "./FeatureCard";

function FeaturesSection() {
  const features = [
    {
      icon: "📋",
      title: "Complaint Management",
      description:
        "Students can easily report maintenance issues with complete details and images.",
    },
    {
      icon: "⚡",
      title: "Fast Resolution",
      description:
        "Wardens assign complaints instantly so workers can resolve them faster.",
    },
    {
      icon: "📊",
      title: "Real-time Tracking",
      description:
        "Track complaint status from submission to completion in one place.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeading
          title="Powerful Features"
          subtitle="Everything required to efficiently manage hostel maintenance."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map(feature => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default FeaturesSection;
