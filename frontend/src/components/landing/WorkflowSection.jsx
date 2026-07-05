import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import WorkflowStep from "./WorkflowStep";

function WorkflowSection() {
  const steps = [
    {
      icon: "👨‍🎓",
      title: "Student",
      description: "Reports a hostel maintenance issue in just a few clicks.",
    },
    {
      icon: "📝",
      title: "Complaint",
      description: "The complaint is instantly recorded with complete details.",
    },
    {
      icon: "👨‍💼",
      title: "Warden",
      description: "Reviews and assigns the complaint to the right worker.",
    },
    {
      icon: "🛠️",
      title: "Worker",
      description: "Resolves the issue and updates the complaint status.",
    },
    {
      icon: "✅",
      title: "Resolved",
      description: "The student is notified once the complaint is completed.",
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <SectionHeading
          title="How FixFlow Works"
          subtitle="A simple workflow connecting students, wardens and workers."
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-5">
          {steps.map((step, index) => (
            <WorkflowStep
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WorkflowSection;
