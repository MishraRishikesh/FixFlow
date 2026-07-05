import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import StatCard from "./StatCard";

function StatsSection() {
  const stats = [
    {
      value: "500+",
      label: "Students",
    },
    {
      value: "3,200+",
      label: "Complaints Resolved",
    },
    {
      value: "98%",
      label: "Resolution Rate",
    },
    {
      value: "2.3 Days",
      label: "Average Resolution",
    },
  ];

  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading
          title="Trusted by Modern Hostels"
          subtitle="Designed to simplify maintenance management for modern hostels."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map(stat => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default StatsSection;
